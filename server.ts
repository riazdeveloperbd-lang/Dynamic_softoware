import express from 'express';
import os from 'os';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { build as buildVite, createServer as createViteServer } from 'vite';
import {
  ApkEntryFile,
  assembleInstallableAndroidApk,
} from './src/cloth_shop_frontend/utils/androidApkSigner';
import {
  analyzeProjectScreenRequirements,
  buildCompleteAppScreensSuite,
} from './src/utils/fullAppScreenArchitect';

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

  // Auto-fill project details using server-side Gemini API (supports multimodal design images)
  app.post('/api/projects/autofill', async (req, res) => {
    const {
      projectName = 'Mobile App',
      category = 'VPN & Cybersecurity',
      designImages = [],
    } = req.body || {};
    try {
      if (process.env.GEMINI_API_KEY) {
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const parts: any[] = [];
        if (Array.isArray(designImages)) {
          for (const dataUrl of designImages.slice(0, 4)) {
            if (typeof dataUrl === 'string' && dataUrl.startsWith('data:image/')) {
              const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
              if (match) {
                parts.push({
                  inlineData: {
                    mimeType: match[1],
                    data: match[2],
                  },
                });
              }
            }
          }
        }

        parts.push({
          text:
            parts.length > 0
              ? `Analyze the uploaded UI design mockup(s) for "${projectName}" (${category}). Write a concise, high-impact 2-sentence mobile app requirements summary describing the exact screens, color palette, typography, and interactive components visible in the uploaded design.`
              : `Write a concise, high-impact 2-sentence mobile app requirements summary for a "${category}" app named "${projectName}". Mention 4 specific mobile screens and key technical features.`,
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: parts,
        });
        if (response.text) {
          res.json({ details: response.text.trim() });
          return;
        }
      }
    } catch {
      // Fallback below
    }

    const isVpn =
      category.toLowerCase().includes('vpn') ||
      projectName.toLowerCase().includes('vpn') ||
      category.toLowerCase().includes('security');
    res.json({
      details: isVpn
        ? `${projectName} (Obsidian Cyber Shield) is a WireGuard v3 & ChaCha20-Poly1305 encrypted mobile client featuring Shield Quick Connect, Global Core Server Nodes, Traffic Telemetry & Speed Test, Fortified Security Tools (Kill Switch, Split Tunneling), and Account Hardware Fleet.`
        : `${projectName} is a specialized ${category} mobile application engineered with tailored workflows, domain-specific screens, real-time interactive tools, and biometric account management.`,
    });
  });

  // Live AI Screen Architecture & Flow Generator based on Project Name, Category & Details (NO predefined static screens)
  app.post('/api/projects/analyze-architecture', async (req, res) => {
    const {
      projectName = '',
      category = 'Mobile App',
      projectDetails = '',
      aiModelProvider = 'gemini_2_5_pro',
    } = req.body || {};

    try {
      if (process.env.GEMINI_API_KEY && projectName.trim()) {
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const prompt = `You are an elite Mobile Application Architect (${aiModelProvider}).
Analyze this specific mobile app project:
- Project Name: "${projectName}"
- Category / Industry: "${category}"
- Project Details & Requirements: "${projectDetails}"

IMPORTANT: Do NOT use generic e-commerce or predefined screens unless the app is actually an e-commerce store. Every category is different!
Design a custom 6-flow mobile screen architecture specifically tailored to "${projectName}" (${category}).
Return JSON with:
1. "domainTitle": A specific architectural title for this exact app.
2. "primaryColor": A hex color matching the brand/category (e.g. "#10B981", "#EA580C", "#0284C7", "#7C3AED", "#E11D48").
3. "modules": Exactly 6 functional flow modules. Each module MUST have:
   - "id": A unique flow ID string (e.g. "flow_1", "flow_2", "flow_3", "flow_4", "flow_5", "flow_6")
   - "name": Numbered flow title specific to "${projectName}" and "${category}" (e.g., "1. Patient Triage & Telehealth Intake (3 Screens)" or "1. Ride GPS Pickup & Fare Estimator (4 Screens)")
   - "screenCount": Number of screens in this flow (between 2 and 4)
   - "description": Comma-separated list of the exact custom screens inside this flow
   - "screens": Array of screen blueprints inside this flow, where each screen has:
     - "id": PascalCase screen ID (unique)
     - "label": Screen title (e.g. "Live ECG & Vitals Monitor" or "Multi-Track Audio Mixer")
     - "screenType": One of: "splash", "onboarding", "auth", "discover", "search", "catalog", "detail", "wishlist", "notifications", "checkout", "payment", "tracker", "analytics", "support", "profile" (pick the closest interactive UI behavior archetype)
     - "description": 1-sentence description of what the user does on this screen in "${projectName}"`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ text: prompt }],
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                domainTitle: { type: Type.STRING },
                primaryColor: { type: Type.STRING },
                modules: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      name: { type: Type.STRING },
                      screenCount: { type: Type.INTEGER },
                      description: { type: Type.STRING },
                      screens: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            id: { type: Type.STRING },
                            label: { type: Type.STRING },
                            screenType: { type: Type.STRING },
                            description: { type: Type.STRING },
                          },
                          required: ['id', 'label', 'screenType', 'description'],
                        },
                      },
                    },
                    required: ['id', 'name', 'screenCount', 'description', 'screens'],
                  },
                },
              },
              required: ['domainTitle', 'primaryColor', 'modules'],
            },
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          if (Array.isArray(parsed.modules) && parsed.modules.length > 0) {
            const totalScreens = parsed.modules.reduce(
              (sum: number, m: any) => sum + (Array.isArray(m.screens) ? m.screens.length : m.screenCount || 3),
              0
            );
            res.json({
              source: 'ai_dynamic',
              analysis: {
                domainKey: 'custom',
                domainTitle: parsed.domainTitle,
                primaryColor: parsed.primaryColor || '#4F46E5',
                totalScreens,
                totalVariants: totalScreens * 3,
                modules: parsed.modules.map((m: any) => ({
                  ...m,
                  screenCount: Array.isArray(m.screens) ? m.screens.length : m.screenCount || 3,
                })),
              },
            });
            return;
          }
        }
      }
    } catch (err) {
      console.error('AI architecture analysis fallback:', err);
    }

    const fallbackAnalysis = analyzeProjectScreenRequirements(
      projectName,
      category,
      projectDetails
    );
    res.json({
      source: 'domain_analyzer',
      analysis: fallbackAnalysis,
    });
  });

  // Generate dynamic mobile project screens & variants via server-side Gemini API (NO predefined generic screens)
  app.post('/api/projects/generate', async (req, res) => {
    const {
      projectName = 'Custom Mobile App',
      projectDetails = 'Modern mobile application',
      variantMode = 'two_variants',
      category = 'Mobile App',
      designImages = [],
      selectedModules = [],
      aiArchitectureModules = [],
    } = req.body || {};

    const baseSuite = buildCompleteAppScreensSuite(
      projectName,
      category,
      projectDetails,
      Array.isArray(designImages) ? designImages : [],
      Array.isArray(selectedModules) && selectedModules.length > 0 ? selectedModules : undefined,
      Array.isArray(aiArchitectureModules) ? aiArchitectureModules : undefined
    );

    try {
      if (process.env.GEMINI_API_KEY) {
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const parts: any[] = [];
        if (Array.isArray(designImages)) {
          for (const dataUrl of designImages.slice(0, 4)) {
            if (typeof dataUrl === 'string' && dataUrl.startsWith('data:image/')) {
              const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
              if (match) {
                parts.push({
                  inlineData: {
                    mimeType: match[1],
                    data: match[2],
                  },
                });
              }
            }
          }
        }

        // Filter AI modules by user-checked flow checkboxes
        const activeAiModules =
          Array.isArray(aiArchitectureModules) && aiArchitectureModules.length > 0
            ? aiArchitectureModules.filter(
                (m: any) =>
                  !Array.isArray(selectedModules) ||
                  selectedModules.length === 0 ||
                  selectedModules.includes(m.id)
              )
            : [];

        const requestedScreensList =
          activeAiModules.length > 0
            ? activeAiModules
                .flatMap((m: any) =>
                  (m.screens || []).map((s: any) => `- [${m.name}] ${s.label} (${s.screenType}): ${s.description}`)
                )
                .join('\n')
            : `Generate 14 to 18 domain-specific screens strictly for "${projectName}" in category "${category}" based on: "${projectDetails}". Only include flows matching selected modules: ${selectedModules.join(', ')}.`;

        const promptText = `You are a Principal Mobile Product Architect.
Create the complete, bespoke mobile screen suite for:
- App Name: "${projectName}"
- Category: "${category}"
- Product Specification: "${projectDetails}"
- Variant Mode: ${variantMode}

CRITICAL RULE: Do NOT generate generic cloth shop, fashion, or predefined screens. Every single screen title, hero banner, metric, filter pill, and interactive item card MUST be 100% authentic to "${projectName}" (${category}).

Screens to generate:
${requestedScreensList}

For each screen, provide:
- id (unique PascalCase identifier)
- label (numbered screen name, e.g., "01. Telehealth Triage Intake")
- category (uppercase module badge)
- moduleGroup (flow group name)
- description (specific functional summary)
- v1Name, v2Name, v3Name (3 distinct layout variant names)
- screenType (one of: "splash", "onboarding", "auth", "discover", "search", "catalog", "detail", "wishlist", "notifications", "checkout", "payment", "tracker", "analytics", "support", "profile")
- heroBannerTitle, heroBannerSubtitle, heroBannerBadge
- filterPills (array of 4 domain-specific filter tags)
- heroMetricLabel, heroMetricValue, heroMetricDelta
- items (array of 3 domain-specific interactive cards with title, subtitle, badge, value, rating, meta, actionLabel)`;

        parts.push({ text: promptText });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: parts,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                tagline: { type: Type.STRING },
                primaryColor: { type: Type.STRING },
                screens: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      label: { type: Type.STRING },
                      category: { type: Type.STRING },
                      moduleGroup: { type: Type.STRING },
                      description: { type: Type.STRING },
                      v1Name: { type: Type.STRING },
                      v2Name: { type: Type.STRING },
                      v3Name: { type: Type.STRING },
                      screenType: { type: Type.STRING },
                      heroBannerTitle: { type: Type.STRING },
                      heroBannerSubtitle: { type: Type.STRING },
                      heroBannerBadge: { type: Type.STRING },
                      filterPills: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      heroMetricLabel: { type: Type.STRING },
                      heroMetricValue: { type: Type.STRING },
                      heroMetricDelta: { type: Type.STRING },
                      items: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            title: { type: Type.STRING },
                            subtitle: { type: Type.STRING },
                            badge: { type: Type.STRING },
                            value: { type: Type.STRING },
                            rating: { type: Type.STRING },
                            meta: { type: Type.STRING },
                            actionLabel: { type: Type.STRING },
                          },
                          required: ['title', 'subtitle', 'badge', 'value', 'rating', 'actionLabel'],
                        },
                      },
                    },
                    required: [
                      'id',
                      'label',
                      'category',
                      'moduleGroup',
                      'description',
                      'v1Name',
                      'v2Name',
                      'screenType',
                      'heroBannerTitle',
                      'heroBannerSubtitle',
                      'heroBannerBadge',
                      'filterPills',
                      'heroMetricLabel',
                      'heroMetricValue',
                      'heroMetricDelta',
                      'items',
                    ],
                  },
                },
              },
              required: ['tagline', 'primaryColor', 'screens'],
            },
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          if (Array.isArray(parsed.screens) && parsed.screens.length > 0) {
            const fallbackPhotos = baseSuite.screens.map((s) => s.heroBannerImage);
            const fallbackItemPhotos =
              baseSuite.screens[0]?.items.map((it) => it.imageUrl) || [];

            const hydratedScreens = parsed.screens.map((scr: any, idx: number) => ({
              ...scr,
              label: `${String(idx + 1).padStart(2, '0')}. ${String(scr.label).replace(/^\d+\.\s*/, '')}`,
              heroBannerImage:
                scr.heroBannerImage && String(scr.heroBannerImage).startsWith('http')
                  ? scr.heroBannerImage
                  : fallbackPhotos[idx % fallbackPhotos.length],
              items: (scr.items || []).map((it: any, iIdx: number) => ({
                ...it,
                imageUrl:
                  it.imageUrl && String(it.imageUrl).startsWith('http')
                    ? it.imageUrl
                    : fallbackItemPhotos[iIdx % fallbackItemPhotos.length] ||
                      fallbackPhotos[(idx + iIdx) % fallbackPhotos.length],
              })),
            }));

            res.json({
              source: 'gemini_bespoke_screens',
              spec: {
                tagline: parsed.tagline || baseSuite.tagline,
                primaryColor: parsed.primaryColor || baseSuite.primaryColor,
                analysis: baseSuite.analysis,
                screens: hydratedScreens,
              },
            });
            return;
          }
        }
      }
    } catch (err) {
      console.error('Gemini project generation fallback:', err);
    }

    res.json({
      source: 'architect_domain_screens',
      spec: {
        tagline: baseSuite.tagline,
        primaryColor: baseSuite.primaryColor,
        analysis: baseSuite.analysis,
        screens: baseSuite.screens,
      },
    });
  });

  // AI Analysis & Layout Optimization for CustomProjectApp based on Project Category & Screen Type
  app.post('/api/projects/optimize-layouts', async (req, res) => {
    const {
      projectName = 'Custom Mobile App',
      category = 'Mobile App',
      projectDetails = '',
      activeScreenId = '',
      activeScreenType = 'discover',
      aiModelProvider = 'gemini_2_5_pro',
      screens = [],
    } = req.body || {};

    const safeScreens = Array.isArray(screens) ? screens : [];
    const activeScreen =
      safeScreens.find((s: any) => s.id === activeScreenId) || safeScreens[0] || null;
    const focusScreens = [
      ...(activeScreen ? [activeScreen] : []),
      ...safeScreens.filter((s: any) => s.id !== activeScreen?.id).slice(0, 5),
    ];

    try {
      if (process.env.GEMINI_API_KEY && focusScreens.length > 0) {
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const screenSummaries = focusScreens
          .map(
            (s: any, idx: number) =>
              `${idx + 1}. id="${s.id}", label="${s.label}", screenType="${s.screenType || 'discover'}", moduleGroup="${s.moduleGroup || category}", currentHero="${s.heroBannerTitle || ''}"`
          )
          .join('\n');

        const prompt = `You are a Principal Mobile UX & Conversion Architect (${aiModelProvider}).
Analyze the current screen architecture for "${projectName}" in category "${category}" (Details: "${projectDetails}").
Currently active screen ID: "${activeScreenId}" (screenType: "${activeScreenType}").
Total screens in architecture: ${safeScreens.length}.

Screens to analyze & optimize:
${screenSummaries}

Provide a deep, category-specific UX & layout optimization report in JSON with:
1. "overallScore": Integer between 88 and 98 representing the optimized architecture readiness score.
2. "architectureVerdict": 2-sentence executive analysis of how "${projectName}" (${category}) can maximize retention and task completion across its ${safeScreens.length} screens, with specific focus on the "${activeScreenType}" screen archetype.
3. "categoryBestPractices": Array of 3 specific mobile layout best practices for "${category}" apps.
4. "recommendations": Array of optimization objects (one for each screen listed above, starting with activeScreenId="${activeScreenId}"). Each item must have:
   - "screenId": Exact screen id from the list
   - "screenLabel": Screen title
   - "screenType": Screen type role
   - "recommendedVariant": Optimal variant ("v1", "v2", or "v3") based on category & screenType ("v1" for narrative/editorial flow, "v2" for high-density 2-column Bento comparison, "v3" for dark glass real-time telemetry HUD)
   - "layoutPatternName": Specific layout pattern name (e.g. "2-Column Bento Telemetry Grid" or "Sticky Biometric Action Dock")
   - "uxRationale": 1-2 sentences explaining WHY this layout and visual hierarchy improves UX for "${category}" on a "${activeScreenType}" screen
   - "expectedConversionLift": Metric badge (e.g. "+28% Task Speed" or "+34% Conversion")
   - "improvedHeroTitle": Optimized, high-converting hero headline specific to "${projectName}"
   - "improvedHeroSubtitle": Optimized hero subtitle with concrete domain value proposition
   - "improvedHeroBadge": Short uppercase badge (e.g. "AI OPTIMIZED • LIVE")
   - "improvedFilterPills": Array of 4 domain-specific quick-action filter pills
   - "improvedMetricLabel": Uppercase KPI label tailored to this screen type and category
   - "improvedMetricValue": Concrete KPI value
   - "improvedMetricDelta": Positive delta/status badge
   - "improvedV1Name": Descriptive V1 layout name
   - "improvedV2Name": Descriptive V2 Bento layout name
   - "improvedV3Name": Descriptive V3 Glass HUD layout name
5. "suggestedNewScreen": A high-impact missing screen tailored to "${projectName}" (${category}) with:
   - "id": Unique PascalCase ID
   - "label": Screen name
   - "moduleGroup": Flow group name
   - "screenType": One of "discover", "search", "catalog", "detail", "checkout", "payment", "tracker", "analytics", "support", "profile"
   - "description": Why this new screen completes the "${category}" user journey
   - "heroBannerTitle": Hero title
   - "heroBannerSubtitle": Hero subtitle
   - "heroBannerBadge": Uppercase badge
   - "filterPills": Array of 4 filter pills
   - "heroMetricLabel": Uppercase KPI label
   - "heroMetricValue": KPI value
   - "heroMetricDelta": KPI delta`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ text: prompt }],
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                overallScore: { type: Type.INTEGER },
                architectureVerdict: { type: Type.STRING },
                categoryBestPractices: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                recommendations: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      screenId: { type: Type.STRING },
                      screenLabel: { type: Type.STRING },
                      screenType: { type: Type.STRING },
                      recommendedVariant: { type: Type.STRING },
                      layoutPatternName: { type: Type.STRING },
                      uxRationale: { type: Type.STRING },
                      expectedConversionLift: { type: Type.STRING },
                      improvedHeroTitle: { type: Type.STRING },
                      improvedHeroSubtitle: { type: Type.STRING },
                      improvedHeroBadge: { type: Type.STRING },
                      improvedFilterPills: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      improvedMetricLabel: { type: Type.STRING },
                      improvedMetricValue: { type: Type.STRING },
                      improvedMetricDelta: { type: Type.STRING },
                      improvedV1Name: { type: Type.STRING },
                      improvedV2Name: { type: Type.STRING },
                      improvedV3Name: { type: Type.STRING },
                    },
                    required: [
                      'screenId',
                      'screenLabel',
                      'screenType',
                      'recommendedVariant',
                      'layoutPatternName',
                      'uxRationale',
                      'expectedConversionLift',
                      'improvedHeroTitle',
                      'improvedHeroSubtitle',
                      'improvedHeroBadge',
                      'improvedFilterPills',
                      'improvedMetricLabel',
                      'improvedMetricValue',
                      'improvedMetricDelta',
                      'improvedV1Name',
                      'improvedV2Name',
                      'improvedV3Name',
                    ],
                  },
                },
                suggestedNewScreen: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    label: { type: Type.STRING },
                    moduleGroup: { type: Type.STRING },
                    screenType: { type: Type.STRING },
                    description: { type: Type.STRING },
                    heroBannerTitle: { type: Type.STRING },
                    heroBannerSubtitle: { type: Type.STRING },
                    heroBannerBadge: { type: Type.STRING },
                    filterPills: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    heroMetricLabel: { type: Type.STRING },
                    heroMetricValue: { type: Type.STRING },
                    heroMetricDelta: { type: Type.STRING },
                  },
                  required: [
                    'id',
                    'label',
                    'moduleGroup',
                    'screenType',
                    'description',
                    'heroBannerTitle',
                    'heroBannerSubtitle',
                    'heroBannerBadge',
                    'filterPills',
                    'heroMetricLabel',
                    'heroMetricValue',
                    'heroMetricDelta',
                  ],
                },
              },
              required: [
                'overallScore',
                'architectureVerdict',
                'categoryBestPractices',
                'recommendations',
                'suggestedNewScreen',
              ],
            },
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          if (Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0) {
            res.json({
              source: 'gemini_ai_optimizer',
              optimization: parsed,
            });
            return;
          }
        }
      }
    } catch (err) {
      console.error('AI layout optimization fallback:', err);
    }

    // Domain-aware deterministic fallback based on category and screenType
    const chooseOptimalVariant = (sType: string): 'v1' | 'v2' | 'v3' => {
      const st = (sType || '').toLowerCase();
      if (['tracker', 'analytics', 'payment', 'auth'].includes(st)) return 'v3';
      if (['catalog', 'search', 'discover', 'wishlist'].includes(st)) return 'v2';
      return 'v1';
    };

    const fallbackRecommendations = focusScreens.map((s: any, idx: number) => {
      const sType = String(s.screenType || activeScreenType || 'discover').toLowerCase();
      const recVar = chooseOptimalVariant(sType);
      const cleanTitle = String(s.label || `Screen ${idx + 1}`).replace(/^\d+\.\s*/, '');
      return {
        screenId: s.id,
        screenLabel: s.label,
        screenType: sType,
        recommendedVariant: recVar,
        layoutPatternName:
          recVar === 'v3'
            ? 'V3 Dark Glass Real-Time Telemetry HUD'
            : recVar === 'v2'
            ? 'V2 High-Density 2-Column Bento Matrix'
            : 'V1 Above-the-Fold Conversion Stack',
        uxRationale: `For a ${category} app, the "${sType.toUpperCase()}" screen achieves higher thumb-zone reachability and visual scanning speed using ${
          recVar === 'v3'
            ? 'an immersive Glass HUD with live status telemetry above the fold'
            : recVar === 'v2'
            ? 'a 2-column Bento comparison grid that surfaces twice as many actionable items without scrolling'
            : 'a focused editorial hero stack with a sticky primary CTA bar'
        }.`,
        expectedConversionLift:
          recVar === 'v3'
            ? '+31% Retention Lift'
            : recVar === 'v2'
            ? '+27% Discovery Speed'
            : '+24% Action Completion',
        improvedHeroTitle: `${projectName} • ${cleanTitle} Pro`,
        improvedHeroSubtitle: `AI-optimized ${category.toLowerCase()} layout with instant 1-tap actions and live telemetry`,
        improvedHeroBadge: `AI OPTIMIZED • ${sType.toUpperCase()}`,
        improvedFilterPills: [
          `⚡ Priority ${category.split(' ')[0]}`,
          '🔥 Top Performing',
          '✨ AI Recommended',
          '📊 Live Metrics',
        ],
        improvedMetricLabel: `${sType.toUpperCase()} EFFICIENCY SCORE`,
        improvedMetricValue: '99.4% Optimal',
        improvedMetricDelta: '+26.8% UX Engagement',
        improvedV1Name: `V1: ${cleanTitle} Conversion Stack`,
        improvedV2Name: `V2: ${cleanTitle} 2-Col Bento Matrix`,
        improvedV3Name: `V3: ${cleanTitle} Live Glass HUD`,
      };
    });

    res.json({
      source: 'domain_heuristic_optimizer',
      optimization: {
        overallScore: 94,
        architectureVerdict: `Analyzed ${safeScreens.length} screens in "${projectName}" (${category}). Optimizing "${
          activeScreen?.label || activeScreenType
        }" and core workflow screens with thumb-zone filter chips, high-contrast KPI cards, and tailored V1/V2/V3 layout variants increases mobile task completion by up to 28%.`,
        categoryBestPractices: [
          `Surface real-time ${category} status metrics in the top 25% viewport above the scroll fold`,
          `Use 2-Column Bento grids (V2) for ${category} catalog/discovery screens and Glass HUD (V3) for live tracking & telemetry`,
          `Keep 4 scannable quick-filter pills pinned below the hero banner for 1-handed mobile navigation`,
        ],
        recommendations: fallbackRecommendations,
        suggestedNewScreen: {
          id: `AiSmartAutomation_${Date.now().toString(36).slice(-4)}`,
          label: `${String(safeScreens.length + 1).padStart(2, '0')}. ${projectName} Smart Automation & Insights`,
          moduleGroup: activeScreen?.moduleGroup || category,
          screenType: 'analytics',
          description: `Dedicated ${category} automation rules, predictive insights, and real-time performance telemetry hub.`,
          heroBannerTitle: `${projectName} • Smart ${category} Automation`,
          heroBannerSubtitle: `Predictive workflow rules, anomaly alerts, and 1-tap optimization for ${projectName}`,
          heroBannerBadge: 'AI ARCHITECT RECOMMENDED',
          filterPills: ['⚡ Auto-Rules', '📈 Live Insights', '🔔 Smart Alerts', '🛡 Diagnostics'],
          heroMetricLabel: 'AUTOMATION EFFICIENCY',
          heroMetricValue: '98.9% Active',
          heroMetricDelta: '+34% Time Saved Weekly',
        },
      },
    });
  });

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
