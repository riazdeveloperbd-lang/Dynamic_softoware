import express from 'express';
import os from 'os';
import path from 'path';
import { build as buildVite, createServer as createViteServer } from 'vite';
import {
  ApkEntryFile,
  assembleInstallableAndroidApk,
} from './src/cloth_shop_frontend/utils/androidApkSigner';

interface StoredApkBuild {
  id: string;
  filename: string;
  appName: string;
  packageName: string;
  buffer: Buffer;
  sizeKb: number;
  createdAt: number;
}

const apkStore = new Map<string, StoredApkBuild>();

// Cached compiled standalone mobile HTML/JS/CSS bundle so the installed APK works 100% offline
let cachedStandaloneAssets: ApkEntryFile[] | null = null;

async function getCompiledStandaloneAppAssets(options: {
  appName: string;
  packageName: string;
  appLogoUri: string;
  defaultColorPreset: string;
  defaultFontPreset: string;
  defaultBottomNavVariant: string;
  defaultThemeMode: string;
  selectedVariants: Record<string, string>;
  fallbackServerOrigin: string;
}): Promise<ApkEntryFile[]> {
  try {
    if (!cachedStandaloneAssets) {
      const buildResult = await buildVite({
        configFile: path.join(process.cwd(), 'vite.config.ts'),
        logLevel: 'silent',
        build: {
          write: false,
          assetsInlineLimit: 1048576, // Inline images/assets up to 1MB directly into the bundle
          rollupOptions: {
            output: {
              manualChunks: undefined,
            },
          },
        },
      });

      const outputs = Array.isArray(buildResult) ? buildResult : [buildResult];
      const files: ApkEntryFile[] = [];

      for (const out of outputs) {
        if ('output' in out && Array.isArray(out.output)) {
          for (const item of out.output) {
            const assetPath = `assets/${item.fileName.replace(/^\/+/, '')}`;
            if (item.type === 'chunk') {
              files.push({
                name: assetPath,
                data: Buffer.from(item.code, 'utf8'),
                storeUncompressed: false,
              });
            } else if (item.type === 'asset') {
              const buf =
                typeof item.source === 'string'
                  ? Buffer.from(item.source, 'utf8')
                  : Buffer.from(item.source);
              files.push({
                name: assetPath,
                data: buf,
                storeUncompressed: false,
              });
            }
          }
        }
      }

      if (files.length > 0) {
        cachedStandaloneAssets = files;
      }
    }

    if (cachedStandaloneAssets && cachedStandaloneAssets.length > 0) {
      const bootConfigScript = `<script>
window.__APK_STANDALONE__ = true;
window.__INITIAL_APK_CONFIG__ = ${JSON.stringify({
        appName: options.appName,
        packageName: options.packageName,
        appLogoUri: options.appLogoUri,
        defaultColorPreset: options.defaultColorPreset,
        defaultFontPreset: options.defaultFontPreset,
        defaultBottomNavVariant: options.defaultBottomNavVariant,
        defaultThemeMode: options.defaultThemeMode,
        selectedVariants: options.selectedVariants,
      })};
</script>`;

      const indexEntry = cachedStandaloneAssets.find(
        (e) => e.name === 'assets/index.html'
      );
      const jsChunk = cachedStandaloneAssets.find(
        (e) => e.name.startsWith('assets/assets/') && e.name.endsWith('.js')
      );
      const cssAsset = cachedStandaloneAssets.find(
        (e) => e.name.startsWith('assets/assets/') && e.name.endsWith('.css')
      );

      if (indexEntry && jsChunk) {
        let html = indexEntry.data.toString('utf8');
        const cssCode = cssAsset
          ? cssAsset.data.toString('utf8').replace(/<\/style/gi, '<\\/style')
          : '';
        // Escape any '</script' sequence inside JS literals and use a function replacer `() => ...`
        // so JavaScript's String.prototype.replace NEVER interprets `$&`, `$'`, or `` $` `` in the minified bundle!
        const safeJsCode = jsChunk.data
          .toString('utf8')
          .replace(/<\/script/gi, '<\\/script');

        // Remove external <script type="module" crossorigin src="/assets/..."> and <link rel="stylesheet" crossorigin href="/assets/...">
        html = html
          .replace(/<script[^>]*src="\/assets\/[^"]+"[^>]*><\/script>/gi, '')
          .replace(/<link[^>]*href="\/assets\/[^"]+"[^>]*>/gi, '')
          .replace(
            '<head>',
            () =>
              `<head>\n${bootConfigScript}\n<style>html,body,#root{width:100%;height:100%;margin:0;padding:0;overflow:hidden;display:flex;flex-direction:column;}\n${cssCode}</style>`
          )
          .replace(
            '</body>',
            () => `<script type="module">\n${safeJsCode}\n</script>\n</body>`
          );

        return [
          {
            name: 'assets/index.html',
            data: Buffer.from(html, 'utf8'),
            storeUncompressed: false,
          },
        ];
      }
    }
  } catch (err) {
    console.error('Standalone Vite bundle fallback:', err);
  }

  // Fallback self-contained HTML launcher
  const fallbackHtml = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
<title>${options.appName}</title>
<style>body,html{margin:0;padding:0;width:100%;height:100%;background:#FFFFFF;overflow:hidden;}iframe{border:0;width:100%;height:100%;}</style>
</head>
<body>
<script>window.location.replace("${options.fallbackServerOrigin}/?mobile=1");</script>
</body>
</html>`;

  return [
    {
      name: 'assets/index.html',
      data: Buffer.from(fallbackHtml, 'utf8'),
      storeUncompressed: false,
    },
  ];
}

function getLanIpAddress(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

async function startServer() {
  const app = express();
  const PRIMARY_PORT = Number(process.env.PORT) || 3000;
  const VITE_DEFAULT_PORT = 5173;

  // Allow large base64 APK payloads (up to 50MB)
  app.use(express.json({ limit: '50mb' }));

  // Build and sign a valid V1+V2 Android APK with binary AXML AndroidManifest.xml, resources.arsc icon, and WebView MainActivity classes.dex
  app.post('/api/apk/build-signed', async (req, res) => {
    try {
      const {
        filename,
        appName,
        packageName,
        iconPngBase64,
        appLogoUri = '',
        defaultColorPreset = 'obsidian',
        defaultFontPreset = 'jakarta',
        defaultBottomNavVariant = 'varient_1',
        defaultThemeMode = 'light',
        selectedVariants = {},
        bundleJs,
      } = req.body || {};

      const cleanAppName = (appName || 'Define Atelier').trim();
      const cleanPackageName = (packageName || 'com.defineatelier.app')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._]/g, '');
      const safeFilename = (filename || 'define-atelier-v1.0.0.apk').replace(
        /[^a-zA-Z0-9._-]/g,
        '-'
      );

      const extraFiles: ApkEntryFile[] = [];

      if (iconPngBase64 && typeof iconPngBase64 === 'string') {
        const cleanIconB64 = iconPngBase64.replace(/^data:[^;]+;base64,/, '');
        const iconBuf = Buffer.from(cleanIconB64, 'base64');
        // Include both res/mipmap/ic_launcher.png (referenced by resources.arsc 0x7f010000) and density buckets
        const iconPaths = [
          'res/mipmap/ic_launcher.png',
          'res/mipmap-mdpi-v4/ic_launcher.png',
          'res/mipmap-hdpi-v4/ic_launcher.png',
          'res/mipmap-xhdpi-v4/ic_launcher.png',
          'res/mipmap-xxhdpi-v4/ic_launcher.png',
          'res/mipmap-xxxhdpi-v4/ic_launcher.png',
        ];
        for (const p of iconPaths) {
          extraFiles.push({
            name: p,
            data: iconBuf,
            storeUncompressed: true,
          });
        }
      }

      const lanIp = getLanIpAddress();
      const reqHost = req.headers.host || `${lanIp}:${PRIMARY_PORT}`;
      const resolvedHost = reqHost.replace(
        /^(localhost|127\.0\.0\.1|0\.0\.0\.0)/,
        lanIp
      );
      const protocol = req.secure ? 'https' : 'http';
      const fallbackOrigin = `${protocol}://${resolvedHost}`;

      const standaloneAssets = await getCompiledStandaloneAppAssets({
        appName: cleanAppName,
        packageName: cleanPackageName,
        appLogoUri: appLogoUri || iconPngBase64 || '',
        defaultColorPreset,
        defaultFontPreset,
        defaultBottomNavVariant,
        defaultThemeMode,
        selectedVariants,
        fallbackServerOrigin: fallbackOrigin,
      });

      extraFiles.push(...standaloneAssets);

      if (bundleJs && typeof bundleJs === 'string') {
        extraFiles.push({
          name: 'assets/index.android.bundle',
          data: Buffer.from(bundleJs, 'utf8'),
          storeUncompressed: false,
        });
      }

      const signedApkBuffer = assembleInstallableAndroidApk({
        packageName: cleanPackageName,
        appName: cleanAppName,
        launchUrl: 'file:///android_asset/index.html',
        extraFiles,
      });

      const id = `apk-${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 7)}`;

      const entry: StoredApkBuild = {
        id,
        filename: safeFilename,
        appName: cleanAppName,
        packageName: cleanPackageName,
        buffer: signedApkBuffer,
        sizeKb: Math.max(24, Math.round(signedApkBuffer.length / 1024)),
        createdAt: Date.now(),
      };

      apkStore.set(id, entry);
      apkStore.set('latest', entry);

      res.json({
        id,
        filename: safeFilename,
        sizeKb: entry.sizeKb,
        lanIp,
        downloadPath: `/api/apk/download/${id}`,
        apkBase64: signedApkBuffer.toString('base64'),
      });
    } catch (err) {
      console.error('Failed to build signed APK:', err);
      res.status(500).json({ error: 'Failed to build signed APK artifact' });
    }
  });

  // Return network info & LAN IP so the Live Mobile Preview QR Code always points to a reachable mobile URL
  app.get('/api/network-info', (req, res) => {
    const lanIp = getLanIpAddress();
    const port = PRIMARY_PORT;
    const reqHost = req.headers.host || `${lanIp}:${port}`;
    const resolvedHost = reqHost.replace(
      /^(localhost|127\.0\.0\.1|0\.0\.0\.0)/,
      lanIp
    );
    const protocol =
      req.secure || req.headers['x-forwarded-proto'] === 'https'
        ? 'https'
        : 'http';
    const mobilePreviewUrl = `${protocol}://${resolvedHost}/?mobile=1`;
    res.json({
      lanIp,
      port,
      mobilePreviewUrl,
    });
  });

  // Store a generated APK in memory and return its mobile download ID + LAN IP for phone QR scanning
  app.post('/api/apk/upload', (req, res) => {
    try {
      const { filename, appName, packageName, base64Data } = req.body || {};
      if (!base64Data || typeof base64Data !== 'string') {
        res.status(400).json({ error: 'Missing base64Data' });
        return;
      }

      const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, '');
      const buffer = Buffer.from(cleanBase64, 'base64');
      const id = `apk-${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 7)}`;
      const safeFilename = (filename || 'define-atelier-v1.0.0.apk').replace(
        /[^a-zA-Z0-9._-]/g,
        '-'
      );

      const entry: StoredApkBuild = {
        id,
        filename: safeFilename,
        appName: appName || 'Define Atelier',
        packageName: packageName || 'com.defineatelier.app',
        buffer,
        sizeKb: Math.max(24, Math.round(buffer.length / 1024)),
        createdAt: Date.now(),
      };

      apkStore.set(id, entry);
      apkStore.set('latest', entry);

      res.json({
        id,
        filename: safeFilename,
        sizeKb: entry.sizeKb,
        lanIp: getLanIpAddress(),
        downloadPath: `/api/apk/download/${id}`,
      });
    } catch {
      res.status(500).json({ error: 'Failed to store APK artifact' });
    }
  });

  // Direct mobile download route triggered when user scans the QR code on their phone
  app.get('/api/apk/download/:id', (req, res) => {
    const { id } = req.params;
    const item = apkStore.get(id) || apkStore.get('latest');

    if (!item) {
      res
        .status(404)
        .send(
          '<html><body style="font-family:sans-serif;text-align:center;padding:40px;"><h2>APK Build Expired or Not Found</h2><p>Please click "Generate Android .APK" in the studio to create a fresh build.</p></body></html>'
        );
      return;
    }

    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${item.filename}"`
    );
    res.setHeader('Content-Length', item.buffer.length.toString());
    res.setHeader('Cache-Control', 'no-store');
    res.send(item.buffer);
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const lanIp = getLanIpAddress();

  app.listen(PRIMARY_PORT, '0.0.0.0', () => {
    console.log(`\n  ➜  Local:   http://localhost:${PRIMARY_PORT}/`);
    console.log(`  ➜  Network: http://${lanIp}:${PRIMARY_PORT}/`);
  });

  // Also bind default Vite React port (5173) for local Windows / VS Code development convenience
  if (PRIMARY_PORT !== VITE_DEFAULT_PORT) {
    const secondaryServer = app.listen(VITE_DEFAULT_PORT, '0.0.0.0', () => {
      console.log(
        `  ➜  Vite Default Port: http://localhost:${VITE_DEFAULT_PORT}/\n`
      );
    });
    secondaryServer.on('error', () => {
      // Ignore if 5173 is already in use
    });
  }
}

startServer();
