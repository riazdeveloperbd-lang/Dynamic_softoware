import JSZip from 'jszip';

export async function downloadOrderManageExpoZip(): Promise<void> {
  const zip = new JSZip();

  // Root app.json
  const appJson = {
    expo: {
      name: "TR Connect - Order Management",
      slug: "personal-shop-management-mobile",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "trconnect",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      splash: {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#060910"
      },
      ios: {
        supportsTablet: true
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/images/android-icon-foreground.png",
          backgroundColor: "#060910"
        },
        package: "com.trconnect.ordermanage"
      },
      web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png"
      },
      plugins: [
        "expo-router",
        [
          "expo-splash-screen",
          {
            image: "./assets/images/splash-icon.png",
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#060910"
          }
        ]
      ]
    }
  };

  // Root package.json
  const packageJson = {
    name: "tr-connect-order-management",
    main: "expo-router/entry",
    version: "1.0.0",
    scripts: {
      start: "expo start",
      resetProject: "node ./scripts/reset-project.js",
      android: "expo run:android",
      ios: "expo run:ios",
      web: "expo start --web",
      test: "jest --watchAll",
      lint: "expo lint"
    },
    dependencies: {
      "@expo/vector-icons": "^14.0.2",
      "@react-native-async-storage/async-storage": "1.23.1",
      "expo": "~52.0.0",
      "expo-clipboard": "~7.0.0",
      "expo-constants": "~17.0.0",
      "expo-font": "~13.0.0",
      "expo-haptics": "~14.0.0",
      "expo-image": "~2.0.0",
      "expo-image-picker": "~16.0.0",
      "expo-linking": "~7.0.0",
      "expo-print": "~14.0.0",
      "expo-router": "~4.0.0",
      "expo-sharing": "~13.0.0",
      "expo-splash-screen": "~0.29.0",
      "expo-status-bar": "~2.0.0",
      "expo-symbols": "~0.2.0",
      "expo-system-ui": "~4.0.0",
      "expo-web-browser": "~14.0.0",
      "react": "18.3.1",
      "react-dom": "18.3.1",
      "react-native": "0.76.6",
      "react-native-gesture-handler": "~2.20.0",
      "react-native-reanimated": "~3.16.1",
      "react-native-safe-area-context": "4.12.0",
      "react-native-screens": "~4.4.0",
      "react-native-web": "~0.19.13"
    },
    devDependencies: {
      "@babel/core": "^7.25.2",
      "@types/react": "~18.3.12",
      "typescript": "^5.3.3"
    }
  };

  // Root tsconfig.json
  const tsConfig = {
    extends: "expo/tsconfig.base",
    compilerOptions: {
      strict: true,
      paths: {
        "@/*": ["./*"]
      }
    },
    include: ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
  };

  zip.file("app.json", JSON.stringify(appJson, null, 2));
  zip.file("package.json", JSON.stringify(packageJson, null, 2));
  zip.file("tsconfig.json", JSON.stringify(tsConfig, null, 2));

  // app/_layout.tsx
  zip.file("app/_layout.tsx", `import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LedgerProvider } from '@/context/LedgerContext';
import { AppThemeProvider, useAppTheme } from '@/context/ThemeContext';

SplashScreen.preventAutoHideAsync().catch(() => {});

function InnerAppStack() {
  const { isDark, colors } = useAppTheme();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
          animation: 'slide_from_right',
        }}
      />
    </>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <LedgerProvider>
          <InnerAppStack />
        </LedgerProvider>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}`);

  // app/index.tsx
  zip.file("app/index.tsx", `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderManageMobileApp from '@/components/OrderManageMobileApp';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <OrderManageMobileApp />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060910',
  },
});`);

  // Generate zip blob
  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'order-manage-expo-v52-clean.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
