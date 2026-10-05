#!/usr/bin/env node
/**
 * Expo Selected-Variant Pruning & Setup Script
 *
 * Usage:
 *   node scripts/export-selected-variants.mjs
 *
 * What it does:
 * 1. Reads your chosen variant per screen from SELECTED_VARIANTS below.
 * 2. Deletes all other unselected varient_N folders inside src/screens/<Screen>/
 * 3. Rewrites src/App.tsx so it only imports the single chosen variant for each screen
 *    and renders full-screen on mobile (without the web simulator bezel).
 */

import fs from 'fs';
import path from 'path';

// Customize which variant ('varient_1' | 'varient_2' | 'varient_3' | 'varient_4' | 'varient_5' | 'varient_6')
// you want to keep for each screen in your standalone Expo app:
const SELECTED_VARIANTS = {
  Splash: 'varient_1',
  Onboarding: 'varient_1',
  SignUp: 'varient_1',
  Login: 'varient_1',
  ForgotPassword: 'varient_1',
  VerificationCode: 'varient_1',
  ResetPassword: 'varient_1',
  Homepage: 'varient_1',
  Search: 'varient_1',
  SavedItems: 'varient_1',
  ProductDetails: 'varient_1',
  Reviews: 'varient_1',
  MyCart: 'varient_1',
  Checkout: 'varient_1',
  Address: 'varient_1',
  NewAddress: 'varient_1',
  PaymentMethod: 'varient_1',
  NewCard: 'varient_1',
  Account: 'varient_1',
  MyOrders: 'varient_1',
  TrackOrder: 'varient_1',
  MyDetails: 'varient_1',
  Notifications: 'varient_1',
  NotificationSettings: 'varient_1',
  FAQs: 'varient_1',
  HelpCenter: 'varient_1',
  CustomerService: 'varient_1',
};

const rootDir = process.cwd();
const screensDir = path.join(rootDir, 'src', 'screens');

console.log('Pruning unselected screen variants...');

for (const [screenName, chosenVariant] of Object.entries(SELECTED_VARIANTS)) {
  const screenPath = path.join(screensDir, screenName);
  if (!fs.existsSync(screenPath)) continue;

  const entries = fs.readdirSync(screenPath, { withFileTypes: true });
  const targetExists = entries.some(
    (e) => e.isDirectory() && e.name === chosenVariant
  );
  const keepVariant = targetExists ? chosenVariant : 'varient_1';

  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.startsWith('varient_')) {
      if (entry.name !== keepVariant) {
        fs.rmSync(path.join(screenPath, entry.name), {
          recursive: true,
          force: true,
        });
        console.log(`  Removed src/screens/${screenName}/${entry.name}`);
      } else {
        console.log(`  Kept    src/screens/${screenName}/${entry.name}`);
      }
    }
  }
  SELECTED_VARIANTS[screenName] = keepVariant;
}

// Generate clean standalone Expo App.tsx with only the selected variants
const imports = Object.entries(SELECTED_VARIANTS)
  .map(
    ([screen, variant]) =>
      `import ${screen}Screen from './screens/${screen}/${variant}';`
  )
  .join('\n');

const switchCases = Object.keys(SELECTED_VARIANTS)
  .map((screen) => `      case '${screen}':\n        return <${screen}Screen />;`)
  .join('\n');

const cleanAppTsx = `import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import {
  useAppDispatch,
  useAppNavigation,
  useAppSelector,
  useTheme,
} from './hooks';
import {
  setColorPresetAction,
  setForceSkeleton,
  setThemeModeAction as setReduxThemeMode,
  toggleForceSkeleton,
  toggleThemeMode,
} from './store/slices/appSlice';
import {
  AppColorPresetId,
  getTheme,
  ThemeContext,
  ThemeMode,
} from './styles/theme';

${imports}

const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.app.themeMode);
  const colorPreset = useAppSelector((state) => state.app.colorPreset);
  const forceSkeleton = useAppSelector((state) => state.app.forceSkeleton);

  const themeValue = useMemo(
    () =>
      getTheme(
        mode,
        () => dispatch(toggleThemeMode()),
        (m: ThemeMode) => dispatch(setReduxThemeMode(m)),
        forceSkeleton,
        (durationMs = 1000) => {
          dispatch(setForceSkeleton(true));
          setTimeout(() => {
            dispatch(setForceSkeleton(false));
          }, durationMs);
        },
        () => dispatch(toggleForceSkeleton()),
        colorPreset,
        (preset: AppColorPresetId) => dispatch(setColorPresetAction(preset))
      ),
    [mode, colorPreset, forceSkeleton, dispatch]
  );

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

const RootNavigator: React.FC = () => {
  const { currentScreen } = useAppNavigation();
  const { colors } = useTheme();

  const renderScreen = () => {
    switch (currentScreen) {
${switchCases}
      default:
        return <HomepageScreen />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {renderScreen()}
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <RootNavigator />
      </AppThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
`;

fs.writeFileSync(path.join(rootDir, 'src', 'App.tsx'), cleanAppTsx, 'utf8');
console.log('\\nSuccessfully generated clean src/App.tsx with ONLY your selected variants!');
console.log('Next step: run "npx expo start" to launch on iOS, Android, or Expo Go.');
