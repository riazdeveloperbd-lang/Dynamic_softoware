import JSZip from "jszip";
import { Palette, Frame, Group, Item, Theme, groupsInFrame } from "../lib/tokens";

export interface ExportM3EExpoZipOptions {
  frames: Frame[];
  groups: Group[];
  palette: Palette;
  theme?: Theme;
  appName?: string;
  packageName?: string;
  appLogoUri?: string;
  versionName?: string;
}

/**
 * Normalizes screen names to clean URL-safe slugs for Expo Router
 */
export function toScreenSlug(name: string, index: number): string {
  const clean = (name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return clean || `screen-${index + 1}`;
}

/**
 * Normalizes screen names to valid PascalCase React component names
 */
export function toComponentName(name: string, index: number): string {
  const cleaned = (name || "").replace(/[^a-zA-Z0-9]/g, " ");
  const pascal = cleaned
    .split(/\s+/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join("");
  return pascal ? `${pascal}Screen` : `Screen${index + 1}`;
}

/**
 * Maps Material symbols to MaterialCommunityIcons / Expo Vector Icons
 */
function mapIconName(icon: string | null | undefined): string {
  if (!icon) return "circle-outline";
  const norm = icon.toLowerCase().replace(/_/g, "-");
  const map: Record<string, string> = {
    "arrow-back": "arrow-left",
    "search": "magnify",
    "shopping-cart": "cart-outline",
    "shopping-bag": "shopping-outline",
    "favorite": "heart-outline",
    "favorite-border": "heart-outline",
    "person": "account-outline",
    "account-circle": "account-circle-outline",
    "settings": "cog-outline",
    "notifications": "bell-outline",
    "add": "plus",
    "close": "close",
    "check": "check",
    "menu": "menu",
    "home": "home-outline",
    "explore": "compass-outline",
    "star": "star",
    "share": "share-variant-outline",
    "more-vert": "dots-vertical",
    "filter-list": "filter-variant",
    "delete": "trash-can-outline",
    "edit": "pencil-outline",
    "visibility": "eye-outline",
    "visibility-off": "eye-off-outline",
    "lock": "lock-outline",
    "mail": "email-outline",
    "email": "email-outline",
    "phone": "phone-outline",
    "credit-card": "credit-card-outline",
    "local-shipping": "truck-delivery-outline",
    "location-on": "map-marker-outline",
    "tune": "tune-variant",
    "category": "shape-outline",
    "chat": "chat-outline",
    "help": "help-circle-outline",
  };
  return map[norm] || norm;
}

/**
 * Generates a 512x512 PNG Blob for the app launcher icon & splash screen
 */
async function generateAppIconPngBlob(
  logoDataUrlOrUri: string | undefined,
  appTitle: string,
  primaryHex: string,
  surfaceHex: string
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new Blob([]);

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, primaryHex);
  grad.addColorStop(1, surfaceHex || "#18181B");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  if (logoDataUrlOrUri && logoDataUrlOrUri.trim().length > 0) {
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new window.Image();
        image.crossOrigin = "anonymous";
        image.onload = () => resolve(image);
        image.onerror = (e) => reject(e);
        image.src = logoDataUrlOrUri;
      });
      ctx.drawImage(img, 64, 64, 384, 384);
      return new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob || new Blob([])), "image/png");
      });
    } catch {
      // Fallback monogram
    }
  }

  // Draw monogram badge
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  ctx.beginPath();
  ctx.arc(256, 256, 180, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 10;
  ctx.stroke();

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 200px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const letter = (appTitle.trim()[0] || "A").toUpperCase();
  ctx.fillText(letter, 256, 266);

  return new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => resolve(blob || new Blob([])), "image/png");
  });
}

/**
 * Builds the complete Expo Router project zip and initiates browser download
 */
export async function exportM3EExpoRouterZip(options: ExportM3EExpoZipOptions): Promise<void> {
  const {
    frames,
    groups,
    palette,
    appName = "Material 3 Mobile App",
    packageName = "com.m3e.mobileapp",
    appLogoUri,
    versionName = "1.0.0",
  } = options;

  const cleanAppName = appName.trim() || "Material 3 Mobile App";
  const cleanPackageName =
    packageName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9._]/g, "") || "com.m3e.mobileapp";
  const appSlug =
    cleanAppName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "m3e-mobile-app";

  const zip = new JSZip();

  // 1. Generate & bundle App Icons
  try {
    const iconBlob = await generateAppIconPngBlob(
      appLogoUri,
      cleanAppName,
      palette.primary,
      palette.surface
    );
    zip.file("assets/icon.png", iconBlob);
    zip.file("assets/adaptive-icon.png", iconBlob);
    zip.file("assets/splash-icon.png", iconBlob);
  } catch (e) {
    console.warn("Icon generator fallback:", e);
  }

  // 2. Root app.json (Expo Router configuration)
  const appJson = {
    expo: {
      name: cleanAppName,
      slug: appSlug,
      version: versionName,
      orientation: "portrait",
      icon: "./assets/icon.png",
      scheme: appSlug,
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      splash: {
        image: "./assets/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: palette.surface,
      },
      ios: {
        supportsTablet: true,
        bundleIdentifier: cleanPackageName,
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: palette.surface,
        },
        package: cleanPackageName,
      },
      web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/icon.png",
      },
      plugins: ["expo-router"],
    },
  };
  zip.file("app.json", JSON.stringify(appJson, null, 2));

  // 3. Root package.json
  const packageJson = {
    name: appSlug,
    main: "expo-router/entry",
    version: versionName,
    scripts: {
      start: "expo start",
      android: "expo run:android",
      ios: "expo run:ios",
      web: "expo start --web",
      lint: "expo lint",
    },
    dependencies: {
      "@expo/vector-icons": "^14.0.2",
      "@react-native-async-storage/async-storage": "1.23.1",
      expo: "~52.0.0",
      "expo-constants": "~17.0.0",
      "expo-font": "~13.0.0",
      "expo-linking": "~7.0.0",
      "expo-router": "~4.0.0",
      "expo-splash-screen": "~0.29.0",
      "expo-status-bar": "~2.0.0",
      "lucide-react-native": "^0.475.0",
      react: "18.3.1",
      "react-dom": "18.3.1",
      "react-native": "0.76.6",
      "react-native-gesture-handler": "~2.20.0",
      "react-native-paper": "^5.12.5",
      "react-native-reanimated": "~3.16.1",
      "react-native-safe-area-context": "4.12.0",
      "react-native-screens": "~4.4.0",
      "react-native-svg": "15.8.0",
      "react-native-web": "~0.19.13",
    },
    devDependencies: {
      "@babel/core": "^7.25.2",
      "@types/react": "~18.3.12",
      typescript: "^5.3.3",
    },
  };
  zip.file("package.json", JSON.stringify(packageJson, null, 2));

  // 4. Root tsconfig.json
  const tsConfig = {
    extends: "expo/tsconfig.base",
    compilerOptions: {
      strict: true,
      paths: {
        "@/*": ["./*"],
      },
    },
    include: ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"],
  };
  zip.file("tsconfig.json", JSON.stringify(tsConfig, null, 2));

  // 5. babel.config.js
  const babelConfig = `module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};`;
  zip.file("babel.config.js", babelConfig);

  // 6. Theme Tokens (src/theme/m3Theme.ts)
  const themeTs = `import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const appColors = {
  primary: '${palette.primary}',
  onPrimary: '${palette.onPrimary}',
  primaryContainer: '${palette.primaryContainer}',
  onPrimaryContainer: '${palette.onPrimaryContainer}',
  secondary: '${palette.secondary || palette.primary}',
  secondaryContainer: '${palette.secondaryContainer}',
  onSecondaryContainer: '${palette.onSecondaryContainer}',
  tertiaryContainer: '${palette.tertiaryContainer}',
  onTertiaryContainer: '${palette.onTertiaryContainer}',
  surface: '${palette.surface}',
  onSurface: '${palette.onSurface}',
  surfaceVariant: '${palette.surfaceContainerHigh}',
  onSurfaceVariant: '${palette.onSurfaceVariant}',
  outline: '${palette.outline}',
  outlineVariant: '${palette.outlineVariant}',
  background: '${palette.surface}',
  error: '${palette.error || "#BA1A1A"}',
};

export const appTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...appColors,
  },
};

export const appDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '${palette.inversePrimary || palette.primary}',
    surface: '${palette.inverseSurface || "#1F1F24"}',
    background: '${palette.inverseSurface || "#141417"}',
  },
};
`;
  zip.file("src/theme/m3Theme.ts", themeTs);

  // 7. Backend Integration Helper (src/services/api.ts)
  const apiTs = `/**
 * Backend API Client & Integration Helper
 * 
 * You can link your real REST API, GraphQL, Supabase, or Express endpoints here!
 * Every screen in this app uses this client so you can connect backend data seamlessly.
 */

export const API_BASE_URL = 'https://api.yourdomain.com/v1';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : \`\${API_BASE_URL}\${endpoint.startsWith('/') ? '' : '/'}\${endpoint}\`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (authToken) {
    headers['Authorization'] = \`Bearer \${authToken}\`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (!res.ok) {
      throw new Error(\`API Request failed with status \${res.status}: \${res.statusText}\`);
    }

    const data = await res.json();
    return data as T;
  } catch (error) {
    console.warn(\`[API Error] \${endpoint}:\`, error);
    throw error;
  }
}
`;
  zip.file("src/services/api.ts", apiTs);

  // 8. Root Layout (app/_layout.tsx)
  const rootLayoutTsx = `import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { appTheme } from '@/src/theme/m3Theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={appTheme}>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: appTheme.colors.background },
            animation: 'slide_from_right',
          }}
        />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
`;
  zip.file("app/_layout.tsx", rootLayoutTsx);

  // Fallback if no frames were drawn on canvas
  const effectiveFrames: Frame[] =
    frames.length > 0
      ? frames
      : [
          {
            id: "home-frame",
            name: "Home",
            x: 0,
            y: 0,
            w: 412,
            h: 892,
          },
        ];

  // Helper map: frameId -> screen slug
  const frameSlugMap = new Map<string, string>();
  effectiveFrames.forEach((f, idx) => {
    frameSlugMap.set(f.id, toScreenSlug(f.name, idx));
  });

  const firstScreenSlug = toScreenSlug(effectiveFrames[0].name, 0);

  // 9. Root Entry (app/index.tsx)
  const indexTsx = `import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/screens/${firstScreenSlug}" />;
}
`;
  zip.file("app/index.tsx", indexTsx);

  // 10. Generate Each Screen Component (app/screens/[slug].tsx)
  effectiveFrames.forEach((frame, frameIdx) => {
    const slug = frameSlugMap.get(frame.id) || `screen-${frameIdx + 1}`;
    const compName = toComponentName(frame.name, frameIdx);

    // Collect all groups positioned in this frame
    const frameGroups = groupsInFrame(groups, frame, effectiveFrames, {});
    // Extract all items in this frame
    const frameItems: Item[] = [];
    frameGroups.forEach((g) => {
      g.items.forEach((it) => {
        frameItems.push(it);
      });
    });

    const screenCode = generateScreenSourceCode({
      frame,
      frameItems,
      frameIdx,
      compName,
      slug,
      frameSlugMap,
      palette,
      appName: cleanAppName,
    });

    zip.file(`app/screens/${slug}.tsx`, screenCode);
  });

  // 11. Comprehensive Documentation (README.md) in English & Bengali
  const readmeMd = `# ${cleanAppName} - Expo Router Mobile App

> **Exported from Dynamic Software - Customize App (M3E Canvas)**  
> **Package Name:** \`${cleanPackageName}\`  
> **Framework:** Expo ~52 / Expo Router ~4 / React Native Paper (Material 3)

---

## 🇧🇩 বাংলায় নির্দেশনা (How to Run in Bangla)

এই প্রজেক্টটি **Expo Router** এবং **Material 3 Expressive Design System** দিয়ে স্বয়ংক্রিয়ভাবে তৈরি করা হয়েছে। আপনার ডিজাইন করা সকল স্ক্রিন, বাটন, ইনপুট, কার্ড ও অ্যাকশন নেভিগেশন এতে সম্পূর্ণ কাজ করবে।

### ১. ইনস্টলেশন এবং রান করা:
\`\`\`bash
# ১. ডিপেনডেন্সি ইনস্টল করুন
npm install

# ২. Expo ডেভেলপমেন্ট সার্ভার চালু করুন
npx expo start
\`\`\`

- **Android এ দেখতে:** আপনার মোবাইলে **Expo Go** অ্যাপ ডাউনলোড করুন এবং টার্মিনালের QR Code স্ক্যান করুন। অথবা \`a\` চেপে Android Emulator এ চালান।
- **Web এ দেখতে:** টার্মিনালে \`w\` চাপুন।

### ২. ব্যাকএন্ড (Backend) কানেক্ট করার নিয়ম:
প্রতিটি স্ক্রিনের (\`app/screens/*.tsx\`) শীর্ষে ব্যাকএন্ড API কানেকশনের জন্য \`useEffect\` এবং \`apiRequest()\` তৈরি করা আছে।
- \`src/services/api.ts\` ফাইলে আপনার সার্ভারের API Base URL সেট করুন (e.g. \`https://api.yourdomain.com/v1\`)।
- যেকোনো স্ক্রিনে ব্যাকএন্ড ডেটা লোড বা সাবমিট করতে \`apiRequest('/products')\` বা \`apiRequest('/orders', { method: 'POST', body: ... })\` ব্যবহার করুন।

### ৩. সরাসরি APK ফাইল তৈরি করা (Generate APK):
\`\`\`bash
# EAS CLI ইনস্টল করুন (যদি না থাকে)
npm install -g eas-cli

# Expo অ্যাকাউন্টে লগইন করুন
eas login

# Android APK বিল্ড করুন
eas build -p android --profile preview
\`\`\`

---

## 🌐 English Instructions

### 1. Quick Start
\`\`\`bash
npm install
npx expo start
\`\`\`

### 2. Project Architecture
- \`app/_layout.tsx\`: Root navigation stack, SafeArea, and Material 3 Paper Theme.
- \`app/index.tsx\`: App entry point redirecting to the initial screen.
- \`app/screens/*.tsx\`: Fully functional screens matching your canvas layouts with dynamic navigation routing.
- \`src/theme/m3Theme.ts\`: Material 3 color tokens exported directly from your design palette.
- \`src/services/api.ts\`: Ready-to-use HTTP client for connecting backend APIs to your screens.
`;
  zip.file("README.md", readmeMd);

  // 12. Trigger browser download of the complete .ZIP file
  const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });

  const downloadUrl = URL.createObjectURL(zipBlob);
  const anchor = document.createElement("a");
  anchor.href = downloadUrl;
  anchor.download = `${appSlug}-expo-router-project.zip`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(downloadUrl);
}

/**
 * Generates clean, robust TypeScript/React Native code for an individual screen
 */
function generateScreenSourceCode(opts: {
  frame: Frame;
  frameItems: Item[];
  frameIdx: number;
  compName: string;
  slug: string;
  frameSlugMap: Map<string, string>;
  palette: Palette;
  appName: string;
}): string {
  const { frame, frameItems, frameIdx, compName, slug, frameSlugMap, palette } = opts;

  // Separate topAppBar, bottomNav and body items
  const topBarItem = frameItems.find((it) => it.kind === "topAppBar");
  const bottomNavItem = frameItems.find((it) => it.kind === "bottomNav" || it.kind === "tabs");
  const bodyItems = frameItems.filter(
    (it) => it.kind !== "topAppBar" && it.kind !== "bottomNav" && it.kind !== "tabs"
  );

  // Generate interactive state hooks for form controls
  const stateHooks: string[] = [];
  const bodyJsxParts: string[] = [];

  // Check if we need search state
  const hasSearch = frameItems.some((it) => it.kind === "searchBar");
  if (hasSearch) {
    stateHooks.push(`const [searchQuery, setSearchQuery] = useState('');`);
  }

  // Iterate body items and generate corresponding React Native Paper components
  bodyItems.forEach((it, idx) => {
    const varName = `field_${idx}`;

    // Target navigation helper
    const resolveAction = (targetId?: string): string => {
      if (!targetId) return "() => {}";
      if (targetId === "back") return "() => router.back()";
      const targetSlug = frameSlugMap.get(targetId);
      if (targetSlug) return `() => router.push('/screens/${targetSlug}')`;
      return "() => {}";
    };

    switch (it.kind) {
      case "button":
      case "splitButton": {
        const mode =
          it.variant === "filled"
            ? "contained"
            : it.variant === "tonal"
            ? "contained-tonal"
            : it.variant === "elevated"
            ? "elevated"
            : it.variant === "outlined"
            ? "outlined"
            : "text";
        const iconProp = it.icon ? ` icon="${mapIconName(it.icon)}"` : "";
        const navPress = resolveAction(it.action?.to);
        bodyJsxParts.push(`        <Button
          mode="${mode}"${iconProp}
          style={styles.actionButton}
          contentStyle={styles.buttonContent}
          onPress={${navPress}}
        >
          ${it.label || "Action"}
        </Button>`);
        break;
      }

      case "iconButton": {
        const navPress = resolveAction(it.action?.to);
        bodyJsxParts.push(`        <IconButton
          icon="${mapIconName(it.icon || "star")}"
          mode="${it.variant === "filled" ? "contained" : "outlined"}"
          size={24}
          onPress={${navPress}}
        />`);
        break;
      }

      case "chip": {
        stateHooks.push(`const [chip_${idx}, setChip_${idx}] = useState(${it.checked ? true : false});`);
        const navPress = it.action?.to ? resolveAction(it.action.to) : `() => setChip_${idx}(!chip_${idx})`;
        bodyJsxParts.push(`        <Chip
          icon="${mapIconName(it.icon || "tag")}"
          selected={chip_${idx}}
          onPress={${navPress}}
          style={styles.chip}
        >
          ${it.label || "Tag"}
        </Chip>`);
        break;
      }

      case "card": {
        const navPress = resolveAction(it.action?.to);
        const cardImg = it.src || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80";
        bodyJsxParts.push(`        <Card style={styles.card} onPress={${navPress}}>
          ${!it.noImage ? `<Card.Cover source={{ uri: '${cardImg}' }} style={styles.cardCover} />` : ""}
          <Card.Title
            title="${it.label || "Card Title"}"
            subtitle="${it.supporting || "Supporting caption details"}"
            ${it.icon ? `left={(props) => <Avatar.Icon {...props} icon="${mapIconName(it.icon)}" />}` : ""}
          />
          <Card.Actions>
            <Button onPress={${navPress}}>Details</Button>
          </Card.Actions>
        </Card>`);
        break;
      }

      case "listItem": {
        const navPress = resolveAction(it.action?.to);
        if (it.switch) {
          stateHooks.push(`const [switch_${idx}, setSwitch_${idx}] = useState(${it.checked ? true : false});`);
          bodyJsxParts.push(`        <List.Item
          title="${it.label || "List Item"}"
          description="${it.supporting || ""}"
          left={(props) => <List.Icon {...props} icon="${mapIconName(it.icon || "format-list-bulleted")}" />}
          right={() => <Switch value={switch_${idx}} onValueChange={setSwitch_${idx}} />}
          style={styles.listItem}
        />`);
        } else {
          bodyJsxParts.push(`        <List.Item
          title="${it.label || "List Item"}"
          description="${it.supporting || ""}"
          left={(props) => <List.Icon {...props} icon="${mapIconName(it.icon || "format-list-bulleted")}" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={${navPress}}
          style={styles.listItem}
        />`);
        }
        break;
      }

      case "textField": {
        stateHooks.push(`const [${varName}, set_${varName}] = useState('');`);
        bodyJsxParts.push(`        <TextInput
          label="${it.label || "Input Label"}"
          placeholder="${it.supporting || ""}"
          value={${varName}}
          onChangeText={set_${varName}}
          mode="${it.variant === "filled" ? "flat" : "outlined"}"
          style={styles.textField}
        />`);
        break;
      }

      case "searchBar": {
        bodyJsxParts.push(`        <Searchbar
          placeholder="${it.label || "Search items..."}"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchBar}
        />`);
        break;
      }

      case "switch": {
        stateHooks.push(`const [${varName}, set_${varName}] = useState(${it.checked ? true : false});`);
        bodyJsxParts.push(`        <View style={styles.switchRow}>
          <Text variant="bodyLarge" style={styles.switchLabel}>${it.label || "Switch Option"}</Text>
          <Switch value={${varName}} onValueChange={set_${varName}} />
        </View>`);
        break;
      }

      case "checkbox": {
        stateHooks.push(`const [${varName}, set_${varName}] = useState(${it.checked ? true : false});`);
        bodyJsxParts.push(`        <Checkbox.Item
          label="${it.label || "Checkbox Item"}"
          status={${varName} ? 'checked' : 'unchecked'}
          onPress={() => set_${varName}(!${varName})}
          style={styles.checkboxItem}
        />`);
        break;
      }

      case "fab":
      case "extendedFab": {
        const navPress = resolveAction(it.action?.to);
        bodyJsxParts.push(`        <FAB
          icon="${mapIconName(it.icon || "plus")}"
          ${it.label ? `label="${it.label}"` : ""}
          style={styles.fab}
          onPress={${navPress}}
        />`);
        break;
      }

      case "divider": {
        bodyJsxParts.push(`        <Divider style={styles.divider} />`);
        break;
      }

      case "linearProgress": {
        bodyJsxParts.push(`        <ProgressBar progress={${(it.value || 60) / 100}} color="${palette.primary}" style={styles.progressBar} />`);
        break;
      }

      case "loadingIndicator":
      case "circularProgress": {
        bodyJsxParts.push(`        <View style={styles.centerBox}>
          <ActivityIndicator animating={true} color="${palette.primary}" size="large" />
        </View>`);
        break;
      }

      case "image":
      case "camera": {
        const imgSrc = it.src || "https://picsum.photos/600/320";
        bodyJsxParts.push(`        <Image source={{ uri: '${imgSrc}' }} style={styles.imageBanner} resizeMode="cover" />`);
        break;
      }

      case "text": {
        bodyJsxParts.push(`        <Text variant="${it.bold ? "titleLarge" : "bodyMedium"}" style={styles.textBlock}>
          ${it.label || "Descriptive content text"}
        </Text>`);
        break;
      }

      default: {
        bodyJsxParts.push(`        <View style={styles.genericBox}>
          <Text variant="titleSmall">${it.label || it.kind}</Text>
          ${it.supporting ? `<Text variant="bodySmall" style={{ color: '${palette.onSurfaceVariant}' }}>${it.supporting}</Text>` : ""}
        </View>`);
        break;
      }
    }
  });

  // Top AppBar JSX
  let topBarJsx = "";
  if (topBarItem) {
    const navAction = topBarItem.action?.to
      ? `onPress={() => router.push('/screens/${frameSlugMap.get(topBarItem.action.to) || ""}')}`
      : `onPress={() => router.back()}`;
    topBarJsx = `      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        ${frameIdx > 0 || topBarItem.action ? `<Appbar.BackAction ${navAction} />` : ""}
        <Appbar.Content title="${topBarItem.label || frame.name}" />
        ${topBarItem.icon2 ? `<Appbar.Action icon="${mapIconName(topBarItem.icon2)}" onPress={() => {}} />` : ""}
      </Appbar.Header>`;
  } else {
    topBarJsx = `      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        ${frameIdx > 0 ? `<Appbar.BackAction onPress={() => router.back()} />` : ""}
        <Appbar.Content title="${frame.name || "Screen"}" />
      </Appbar.Header>`;
  }

  // Bottom Navigation Bar JSX
  let bottomBarJsx = "";
  if (bottomNavItem && bottomNavItem.tabs && bottomNavItem.tabs.length > 0) {
    const tabButtons = bottomNavItem.tabs
      .map((tab, tIdx) => {
        const destAction = bottomNavItem.actions?.[`tab:${tIdx}`]?.to;
        const destSlug = destAction ? frameSlugMap.get(destAction) : null;
        const onPressStr = destSlug ? `router.push('/screens/${destSlug}')` : `() => {}`;
        return `          <TouchableOpacity
            key="${tIdx}"
            style={styles.navTab}
            onPress={${destSlug ? `() => ${onPressStr}` : "() => {}"}}
          >
            <IconButton icon="${mapIconName(tab.icon || "circle")}" size={22} />
            <Text variant="labelSmall">${tab.label || `Tab ${tIdx + 1}`}</Text>
          </TouchableOpacity>`;
      })
      .join("\n");

    bottomBarJsx = `      <Surface style={styles.bottomBarContainer} elevation={2}>
        <View style={styles.bottomBarRow}>
${tabButtons}
        </View>
      </Surface>`;
  }

  return `import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import {
  Appbar,
  Button,
  IconButton,
  Card,
  Avatar,
  Text,
  TextInput,
  Searchbar,
  Chip,
  Switch,
  Checkbox,
  FAB,
  Divider,
  ProgressBar,
  ActivityIndicator,
  List,
  Surface,
  useTheme,
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiRequest } from '@/src/services/api';

/**
 * Screen: ${frame.name} (${slug})
 * Generated with full Expo Router & Material 3 components
 */
export default function ${compName}() {
  const router = useRouter();
  const theme = useTheme();

  // --------------------------------------------------------------------------
  // 🔗 BACKEND DATA INTEGRATION
  // You can connect your REST / GraphQL API endpoints here:
  // --------------------------------------------------------------------------
  const [loading, setLoading] = useState(false);
  const [screenData, setScreenData] = useState<any>(null);

  useEffect(() => {
    async function loadScreenData() {
      try {
        setLoading(true);
        // Example: const res = await apiRequest('/api/${slug}');
        // setScreenData(res);
      } catch (err) {
        console.warn('Backend load notice:', err);
      } finally {
        setLoading(false);
      }
    }
    loadScreenData();
  }, []);

  // Form & Component States
  ${stateHooks.join("\n  ")}

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
${topBarJsx}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
${bodyJsxParts.length > 0 ? bodyJsxParts.join("\n\n") : `        <View style={styles.placeholderBox}>
          <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
            Screen: ${frame.name}
          </Text>
        </View>`}
      </ScrollView>

${bottomBarJsx}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '${palette.surface}',
  },
  scrollContent: {
    padding: 16,
    gap: 14,
    paddingBottom: 80,
  },
  actionButton: {
    borderRadius: 20,
    marginVertical: 4,
  },
  buttonContent: {
    height: 48,
  },
  card: {
    borderRadius: 16,
    marginVertical: 6,
    backgroundColor: '${palette.surfaceContainerLow || palette.surface}',
  },
  cardCover: {
    height: 180,
  },
  listItem: {
    borderRadius: 12,
    backgroundColor: '${palette.surfaceContainerLow || palette.surface}',
    marginVertical: 3,
  },
  textField: {
    marginVertical: 4,
  },
  searchBar: {
    borderRadius: 24,
    backgroundColor: '${palette.surfaceContainerHigh || "#F0F0F0"}',
    marginVertical: 6,
  },
  chip: {
    marginRight: 6,
    marginBottom: 6,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  switchLabel: {
    fontWeight: '500',
  },
  checkboxItem: {
    paddingVertical: 2,
  },
  fab: {
    alignSelf: 'flex-end',
    marginVertical: 8,
  },
  divider: {
    marginVertical: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginVertical: 8,
  },
  centerBox: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBanner: {
    width: '100%',
    height: 190,
    borderRadius: 16,
    marginVertical: 6,
  },
  textBlock: {
    marginVertical: 4,
  },
  genericBox: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '${palette.surfaceContainerLow || palette.surface}',
    marginVertical: 4,
  },
  placeholderBox: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '${palette.surfaceContainer || palette.surface}',
    borderTopWidth: 1,
    borderTopColor: '${palette.outlineVariant}',
  },
  bottomBarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 6,
  },
  navTab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
`;
}
