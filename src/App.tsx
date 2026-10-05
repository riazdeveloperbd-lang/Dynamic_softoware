import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import {
  CheckCircle2,
  ChevronDown,
  Copy,
  Download,
  ImagePlus,
  Layers,
  Moon,
  Package,
  Palette,
  QrCode,
  RefreshCw,
  Search,
  Smartphone,
  Sparkles,
  Sun,
  Trash2,
  Type,
  X,
} from 'lucide-react';
import { store } from './store';
import {
  useAppDispatch,
  useAppNavigation,
  useAppSelector,
  useTheme,
} from './hooks';
import {
  ScreenName,
  ScreenVariant,
  setColorPresetAction,
  setFontPresetAction,
  setForceSkeleton,
  setThemeModeAction as setReduxThemeMode,
  toggleForceSkeleton,
  toggleThemeMode,
  updateAppBranding,
} from './store/slices/appSlice';
import {
  APP_FONT_PRESETS,
  AppColorPresetId,
  AppFontPresetId,
  getTheme,
  ThemeContext,
  ThemeMode,
} from './styles/theme';
import QRCode from 'qrcode';
import {
  buildAndroidApkArtifact,
  downloadExpoProjectZip,
  triggerBlobDownload,
} from './utils/exportExpoZip';

// Screen Variant Imports
import SplashVarient1 from './screens/Splash/varient_1';
import SplashVarient2 from './screens/Splash/varient_2';
import SplashVarient3 from './screens/Splash/varient_3';

import OnboardingVarient1 from './screens/Onboarding/varient_1';
import OnboardingVarient2 from './screens/Onboarding/varient_2';
import OnboardingVarient3 from './screens/Onboarding/varient_3';

import SignUpVarient1 from './screens/SignUp/varient_1';
import SignUpVarient2 from './screens/SignUp/varient_2';
import SignUpVarient3 from './screens/SignUp/varient_3';

import LoginVarient1 from './screens/Login/varient_1';
import LoginVarient2 from './screens/Login/varient_2';
import LoginVarient3 from './screens/Login/varient_3';

import ForgotPasswordVarient1 from './screens/ForgotPassword/varient_1';
import ForgotPasswordVarient2 from './screens/ForgotPassword/varient_2';
import ForgotPasswordVarient3 from './screens/ForgotPassword/varient_3';

import VerificationCodeVarient1 from './screens/VerificationCode/varient_1';
import VerificationCodeVarient2 from './screens/VerificationCode/varient_2';
import VerificationCodeVarient3 from './screens/VerificationCode/varient_3';

import ResetPasswordVarient1 from './screens/ResetPassword/varient_1';
import ResetPasswordVarient2 from './screens/ResetPassword/varient_2';
import ResetPasswordVarient3 from './screens/ResetPassword/varient_3';

import HomepageVarient1 from './screens/Homepage/varient_1';
import HomepageVarient2 from './screens/Homepage/varient_2';
import HomepageVarient3 from './screens/Homepage/varient_3';
import HomepageVarient4 from './screens/Homepage/varient_4';
import HomepageVarient5 from './screens/Homepage/varient_5';
import HomepageVarient6 from './screens/Homepage/varient_6';

import SearchVarient1 from './screens/Search/varient_1';
import SearchVarient2 from './screens/Search/varient_2';
import SearchVarient3 from './screens/Search/varient_3';

import SavedItemsVarient1 from './screens/SavedItems/varient_1';
import SavedItemsVarient2 from './screens/SavedItems/varient_2';
import SavedItemsVarient3 from './screens/SavedItems/varient_3';

import ProductDetailsVarient1 from './screens/ProductDetails/varient_1';
import ProductDetailsVarient2 from './screens/ProductDetails/varient_2';
import ProductDetailsVarient3 from './screens/ProductDetails/varient_3';
import ProductDetailsVarient4 from './screens/ProductDetails/varient_4';
import ProductDetailsVarient5 from './screens/ProductDetails/varient_5';
import ProductDetailsVarient6 from './screens/ProductDetails/varient_6';

import ReviewsVarient1 from './screens/Reviews/varient_1';
import ReviewsVarient2 from './screens/Reviews/varient_2';
import ReviewsVarient3 from './screens/Reviews/varient_3';

import MyCartVarient1 from './screens/MyCart/varient_1';
import MyCartVarient2 from './screens/MyCart/varient_2';
import MyCartVarient3 from './screens/MyCart/varient_3';

import CheckoutVarient1 from './screens/Checkout/varient_1';
import CheckoutVarient2 from './screens/Checkout/varient_2';
import CheckoutVarient3 from './screens/Checkout/varient_3';

import AddressVarient1 from './screens/Address/varient_1';
import AddressVarient2 from './screens/Address/varient_2';
import AddressVarient3 from './screens/Address/varient_3';

import NewAddressVarient1 from './screens/NewAddress/varient_1';
import NewAddressVarient2 from './screens/NewAddress/varient_2';
import NewAddressVarient3 from './screens/NewAddress/varient_3';

import PaymentMethodVarient1 from './screens/PaymentMethod/varient_1';
import PaymentMethodVarient2 from './screens/PaymentMethod/varient_2';
import PaymentMethodVarient3 from './screens/PaymentMethod/varient_3';

import NewCardVarient1 from './screens/NewCard/varient_1';
import NewCardVarient2 from './screens/NewCard/varient_2';
import NewCardVarient3 from './screens/NewCard/varient_3';

import AccountVarient1 from './screens/Account/varient_1';
import AccountVarient2 from './screens/Account/varient_2';
import AccountVarient3 from './screens/Account/varient_3';
import AccountVarient4 from './screens/Account/varient_4';
import AccountVarient5 from './screens/Account/varient_5';
import AccountVarient6 from './screens/Account/varient_6';

import MyOrdersVarient1 from './screens/MyOrders/varient_1';
import MyOrdersVarient2 from './screens/MyOrders/varient_2';
import MyOrdersVarient3 from './screens/MyOrders/varient_3';
import MyOrdersVarient4 from './screens/MyOrders/varient_4';

import TrackOrderVarient1 from './screens/TrackOrder/varient_1';
import TrackOrderVarient2 from './screens/TrackOrder/varient_2';
import TrackOrderVarient3 from './screens/TrackOrder/varient_3';

import MyDetailsVarient1 from './screens/MyDetails/varient_1';
import MyDetailsVarient2 from './screens/MyDetails/varient_2';
import MyDetailsVarient3 from './screens/MyDetails/varient_3';

import NotificationsVarient1 from './screens/Notifications/varient_1';
import NotificationsVarient2 from './screens/Notifications/varient_2';
import NotificationsVarient3 from './screens/Notifications/varient_3';

import NotificationSettingsVarient1 from './screens/NotificationSettings/varient_1';
import NotificationSettingsVarient2 from './screens/NotificationSettings/varient_2';
import NotificationSettingsVarient3 from './screens/NotificationSettings/varient_3';

import FAQsVarient1 from './screens/FAQs/varient_1';
import FAQsVarient2 from './screens/FAQs/varient_2';
import FAQsVarient3 from './screens/FAQs/varient_3';

import HelpCenterVarient1 from './screens/HelpCenter/varient_1';
import HelpCenterVarient2 from './screens/HelpCenter/varient_2';
import HelpCenterVarient3 from './screens/HelpCenter/varient_3';

import CustomerServiceVarient1 from './screens/CustomerService/varient_1';
import CustomerServiceVarient2 from './screens/CustomerService/varient_2';
import CustomerServiceVarient3 from './screens/CustomerService/varient_3';

interface ScreenGroupConfig {
  group: string;
  items: {
    label: string;
    screen: ScreenName;
    variants: { id: ScreenVariant; name: string }[];
  }[];
}

const makeSixVariants = (
  names: [string, string, string, string, string, string]
): { id: ScreenVariant; name: string }[] => [
  { id: 'varient_1', name: `V1: ${names[0]}` },
  { id: 'varient_2', name: `V2: ${names[1]}` },
  { id: 'varient_3', name: `V3: ${names[2]}` },
  { id: 'varient_4', name: `V4: ${names[3]}` },
  { id: 'varient_5', name: `V5: ${names[4]}` },
  { id: 'varient_6', name: `V6: ${names[5]}` },
];

const SCREEN_DIRECTORY: ScreenGroupConfig[] = [
  {
    group: 'Onboarding & Auth',
    items: [
      {
        label: 'Splash',
        screen: 'Splash',
        variants: makeSixVariants([
          'Classic Monogram',
          'Editorial Atelier',
          'Lookbook Glass',
          'Minimal Crest',
          'Runway Edition',
          'Studio Capsule',
        ]),
      },
      {
        label: 'Onboarding',
        screen: 'Onboarding',
        variants: makeSixVariants([
          'Define Yourself',
          'Story Carousel',
          'Bento Mosaic',
          'Curated Tour',
          'VIP Perks Intro',
          'Lookbook Preview',
        ]),
      },
      {
        label: 'SignUp',
        screen: 'SignUp',
        variants: makeSixVariants([
          'Classic Form',
          'VIP Split Hero',
          'Style Wizard',
          'Express Member',
          'Invite Code Access',
          'Social First',
        ]),
      },
      {
        label: 'Login',
        screen: 'Login',
        variants: makeSixVariants([
          'Standard Login',
          'Executive Card',
          'Biometric & Passkey',
          'Quick PIN Access',
          'VIP Concierge Sign-In',
          'One-Tap Social',
        ]),
      },
      {
        label: 'ForgotPassword',
        screen: 'ForgotPassword',
        variants: makeSixVariants([
          'Email Recovery',
          'SMS / Email Channel',
          'Security Vault',
          'Backup Key Reset',
          'Trusted Device',
          'Concierge Help',
        ]),
      },
      {
        label: 'VerificationCode',
        screen: 'VerificationCode',
        variants: makeSixVariants([
          '4-Digit OTP',
          'Custom Dialpad',
          'Security Shield',
          'Auto-Read SMS',
          'Hardware Key',
          'Biometric Confirm',
        ]),
      },
      {
        label: 'ResetPassword',
        screen: 'ResetPassword',
        variants: makeSixVariants([
          'Standard Reset',
          'Strength Meter',
          'Vault Confirmed',
          'Passkey Upgrade',
          '2FA Sync',
          'Session Lock',
        ]),
      },
    ],
  },
  {
    group: 'Discover & Catalog',
    items: [
      {
        label: 'Homepage',
        screen: 'Homepage',
        variants: makeSixVariants([
          'Classic 2-Col Grid',
          'Editorial Lookbook',
          'Bento Flash Drops',
          'Runway Magazine',
          'AI Outfit Builder',
          'Archive Matrix',
        ]),
      },
      {
        label: 'Search',
        screen: 'Search',
        variants: makeSixVariants([
          'Recent & Live',
          'Visual Categories',
          'Filter & Sort Hub',
          'Trending Tags',
          'Barcode & Visual',
          'Curated Fabrics',
        ]),
      },
      {
        label: 'SavedItems',
        screen: 'SavedItems',
        variants: makeSixVariants([
          'Wishlist Grid',
          'Editorial Bag Cards',
          'Moodboard Folders',
          'Price Drop Alerts',
          'Back-in-Stock',
          'Shareable Closet',
        ]),
      },
      {
        label: 'ProductDetails',
        screen: 'ProductDetails',
        variants: makeSixVariants([
          'Classic Showcase',
          'Full-Bleed Sheet',
          'Atelier Dossier',
          'Atelier Comparison',
          'Size Predictor',
          'Boutique Pickup',
        ]),
      },
      {
        label: 'Reviews',
        screen: 'Reviews',
        variants: makeSixVariants([
          'Rating Bars',
          'Photo & Fit Feed',
          'Quality Scorecard',
          'Verified Buyers',
          'Stylist Notes',
          'Size Fit Breakdown',
        ]),
      },
    ],
  },
  {
    group: 'Cart, Checkout & Payment',
    items: [
      {
        label: 'MyCart',
        screen: 'MyCart',
        variants: makeSixVariants([
          'Classic Cart',
          'Free Shipping Meter',
          'Bundle & Upsell Bag',
          'Express Drawer',
          'Gift Wrap Studio',
          'Reserve & Hold',
        ]),
      },
      {
        label: 'Checkout',
        screen: 'Checkout',
        variants: makeSixVariants([
          'Single-Page Summary',
          'Stepper & Speed',
          'Express & Klarna 4x',
          'One-Tap Apple Pay',
          'Split Gift Order',
          'Boutique Pickup',
        ]),
      },
      {
        label: 'Address',
        screen: 'Address',
        variants: makeSixVariants([
          'Radio List',
          'Map Preview Cards',
          'Courier Drop Rules',
          'Global Boutiques',
          'Locker Pickup',
          'Office Concierge',
        ]),
      },
      {
        label: 'NewAddress',
        screen: 'NewAddress',
        variants: makeSixVariants([
          'Map Pin Sheet',
          'Structured Form',
          'GPS Radar Search',
          'Postal Code Lookup',
          'Gate Code & Notes',
          'Verified Pin',
        ]),
      },
      {
        label: 'PaymentMethod',
        screen: 'PaymentMethod',
        variants: makeSixVariants([
          'Saved Card Rows',
          '3D Card Stack',
          'Digital Wallets Hub',
          'Klarna & BNPL',
          'Studio Gift Credit',
          'Corporate Billing',
        ]),
      },
      {
        label: 'NewCard',
        screen: 'NewCard',
        variants: makeSixVariants([
          'iOS Keypad Form',
          'Live 3D Card Builder',
          'NFC & Camera Scan',
          'Virtual Card Sync',
          'Apple Wallet Link',
          'Instant Verify',
        ]),
      },
    ],
  },
  {
    group: 'Account, Orders & Support',
    items: [
      {
        label: 'Account',
        screen: 'Account',
        variants: makeSixVariants([
          'Classic + Color Studio',
          'VIP Bento + Colors',
          'Concierge + Colors',
          'Brand Theme & Rewards',
          'Segmented Control Hub',
          'Digital Boutique Pass',
        ]),
      },
      {
        label: 'MyOrders',
        screen: 'MyOrders',
        variants: makeSixVariants([
          'Tabbed Orders',
          'Live Milestone Cards',
          'Buy Again & Invoices',
          'Review Modal',
          'Return & Exchange',
          'Digital Archive',
        ]),
      },
      {
        label: 'TrackOrder',
        screen: 'TrackOrder',
        variants: makeSixVariants([
          'Map & Bottom Sheet',
          'Boarding Pass QR',
          'Split Proof Card',
          'Live Courier Radar',
          'SMS Timeline',
          'Safe Drop Photo',
        ]),
      },
      {
        label: 'MyDetails',
        screen: 'MyDetails',
        variants: makeSixVariants([
          'Standard Form',
          'Avatar & Fit Matrix',
          'Membership & Privacy',
          'Style DNA Profile',
          'Tailoring Specs',
          'VIP Preferences',
        ]),
      },
      {
        label: 'Notifications',
        screen: 'Notifications',
        variants: makeSixVariants([
          'Grouped Timeline',
          'Categorized Inbox',
          'Rich Promo Feed',
          'Order Pings',
          'Restock Alerts',
          'VIP Invites',
        ]),
      },
      {
        label: 'NotificationSettings',
        screen: 'NotificationSettings',
        variants: makeSixVariants([
          'Toggle List',
          'Push/Email/SMS Matrix',
          'Quiet Hours & Presets',
          'Drop Alert Rules',
          'Courier SMS Sync',
          'Privacy Digest',
        ]),
      },
      {
        label: 'FAQs',
        screen: 'FAQs',
        variants: makeSixVariants([
          'Search & Accordion',
          'Topic Grid Cards',
          'Instant Answers',
          'Sizing & Care Guide',
          'Shipping & Customs',
          'Returns Policy',
        ]),
      },
      {
        label: 'HelpCenter',
        screen: 'HelpCenter',
        variants: makeSixVariants([
          'Channel List',
          'Concierge Desk',
          'Self-Service Portal',
          'Boutique Directory',
          'Return QR Generator',
          'VIP Callback Hub',
        ]),
      },
      {
        label: 'CustomerService',
        screen: 'CustomerService',
        variants: makeSixVariants([
          'Classic Live Chat',
          'Order Context Chat',
          'Callback & Video',
          'Stylist Lookbook Chat',
          'Size Swap Bot',
          'Priority Escalation',
        ]),
      },
    ],
  },
];

/**
 * Consistent ThemeProvider wrapping the entire Expo application
 * Dynamically applies both Light/Dark mode and the selected App Color Preset
 */
const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.app.themeMode);
  const colorPreset = useAppSelector((state) => state.app.colorPreset);
  const fontPreset = useAppSelector((state) => state.app.fontPreset);
  const forceSkeleton = useAppSelector((state) => state.app.forceSkeleton);

  useEffect(() => {
    const activeFont =
      APP_FONT_PRESETS.find((f) => f.id === fontPreset) || APP_FONT_PRESETS[0];
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty(
        '--app-font-family',
        activeFont.cssStack
      );
    }
  }, [fontPreset]);

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
        (preset: AppColorPresetId) => dispatch(setColorPresetAction(preset)),
        fontPreset,
        (font: AppFontPresetId) => dispatch(setFontPresetAction(font))
      ),
    [mode, colorPreset, fontPreset, forceSkeleton, dispatch]
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className="app-font-scope" style={{ width: '100%' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const ExpoNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentScreen, currentVariant, navigateTo } = useAppNavigation();
  const appBranding = useAppSelector((s) => s.app.appBranding);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    colors,
    isDark,
    toggleTheme,
    colorPreset,
    presets,
    setColorPreset,
    fontPreset,
    fontPresets,
    setFontPreset,
    isLoadingSkeleton,
    toggleSkeletonPreview,
  } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  const [dockFontDropdownOpen, setDockFontDropdownOpen] = useState(false);
  const [fontSearchQuery, setFontSearchQuery] = useState('');
  const [isZipping, setIsZipping] = useState(false);
  const [apkBuildState, setApkBuildState] = useState<
    'idle' | 'building' | 'ready'
  >('idle');
  const [apkProgressPct, setApkProgressPct] = useState(0);
  const [apkStepLabel, setApkStepLabel] = useState('');
  const [apkReadyArtifact, setApkReadyArtifact] = useState<{
    blob: Blob;
    filename: string;
    sizeKb: number;
    mobileDownloadUrl: string;
    qrCodeDataUrl: string;
  } | null>(null);
  const [copiedApkLink, setCopiedApkLink] = useState(false);
  const [livePreviewQrUrl, setLivePreviewQrUrl] = useState('');
  const [livePreviewTargetUrl, setLivePreviewTargetUrl] = useState('');
  const [copiedLiveUrl, setCopiedLiveUrl] = useState(false);
  const [isMobileStandalone] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      Boolean((window as any).__APK_STANDALONE__) ||
      new URLSearchParams(window.location.search).get('mobile') === '1'
    );
  });

  useEffect(() => {
    let cancelled = false;
    async function initLivePreviewQr() {
      let targetUrl =
        typeof window !== 'undefined'
          ? `${window.location.origin}/?mobile=1`
          : '';
      try {
        const res = await fetch('/api/network-info');
        if (res.ok) {
          const data = await res.json();
          if (
            typeof window !== 'undefined' &&
            /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/i.test(
              window.location.hostname
            ) &&
            data.lanIp &&
            data.lanIp !== 'localhost'
          ) {
            const portPart = window.location.port
              ? `:${window.location.port}`
              : `:${data.port || 3000}`;
            targetUrl = `${window.location.protocol}//${data.lanIp}${portPart}/?mobile=1`;
          } else if (data.mobilePreviewUrl && !targetUrl) {
            targetUrl = data.mobilePreviewUrl;
          }
        }
      } catch {
        // Fallback to window.location.origin
      }
      if (!targetUrl || cancelled) return;
      setLivePreviewTargetUrl(targetUrl);
      try {
        const qrData = await QRCode.toDataURL(targetUrl, {
          width: 240,
          margin: 1,
          color: { dark: '#111111', light: '#FFFFFF' },
        });
        if (!cancelled) {
          setLivePreviewQrUrl(qrData);
        }
      } catch {
        // Ignore QR generation error
      }
    }
    initLivePreviewQr();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const cfg = (window as any).__INITIAL_APK_CONFIG__;
    if (!cfg) return;
    if (cfg.appName || cfg.packageName || cfg.appLogoUri) {
      dispatch(
        updateAppBranding({
          appName: cfg.appName || 'Define Atelier',
          packageName: cfg.packageName || 'com.defineatelier.app',
          appLogoUri: cfg.appLogoUri || '',
        })
      );
    }
    if (cfg.defaultColorPreset) {
      dispatch(setColorPresetAction(cfg.defaultColorPreset));
    }
    if (cfg.defaultFontPreset) {
      dispatch(setFontPresetAction(cfg.defaultFontPreset));
    }
    if (cfg.defaultThemeMode) {
      dispatch(setReduxThemeMode(cfg.defaultThemeMode));
    }
    if (cfg.selectedVariants?.Homepage) {
      navigateTo('Homepage', cfg.selectedVariants.Homepage);
    }
  }, [dispatch]);
  const [exportSelections, setExportSelections] = useState<
    Record<ScreenName, ScreenVariant>
  >(() => {
    const initial = {} as Record<ScreenName, ScreenVariant>;
    SCREEN_DIRECTORY.forEach((g) =>
      g.items.forEach((it) => {
        initial[it.screen] = 'varient_1';
      })
    );
    return initial;
  });

  const applyVariantToAllScreens = (variant: ScreenVariant) => {
    const updated = {} as Record<ScreenName, ScreenVariant>;
    SCREEN_DIRECTORY.forEach((g) =>
      g.items.forEach((it) => {
        updated[it.screen] = variant;
      })
    );
    setExportSelections(updated);
    navigateTo(currentScreen, variant);
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        dispatch(updateAppBranding({ appLogoUri: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadFullExpoZip = async () => {
    if (isZipping) return;
    setIsZipping(true);
    try {
      await downloadExpoProjectZip({
        selectedVariants: exportSelections,
        defaultColorPreset: colorPreset,
        defaultFontPreset: fontPreset,
        defaultThemeMode: isDark ? 'dark' : 'light',
        appName: appBranding.appName,
        packageName: appBranding.packageName,
        appLogoUri: appBranding.appLogoUri,
      });
    } finally {
      setIsZipping(false);
    }
  };

  const handleGenerateAndroidApk = async () => {
    if (apkBuildState === 'building') return;
    setApkBuildState('building');
    setApkProgressPct(8);
    setApkStepLabel('Initializing Expo SDK 57 Android APK packager...');
    try {
      const artifact = await buildAndroidApkArtifact({
        selectedVariants: exportSelections,
        defaultColorPreset: colorPreset,
        defaultFontPreset: fontPreset,
        defaultThemeMode: isDark ? 'dark' : 'light',
        appName: appBranding.appName,
        packageName: appBranding.packageName,
        appLogoUri: appBranding.appLogoUri,
        onProgress: (_idx, label, pct) => {
          setApkStepLabel(label);
          setApkProgressPct(pct);
        },
      });
      setApkReadyArtifact(artifact);
      setApkBuildState('ready');
    } catch {
      setApkBuildState('idle');
    }
  };

  const handleDownloadGeneratedApk = () => {
    if (!apkReadyArtifact) return;
    triggerBlobDownload(apkReadyArtifact.blob, apkReadyArtifact.filename);
  };

  const currentScreenConfig = useMemo(() => {
    for (const group of SCREEN_DIRECTORY) {
      const found = group.items.find((item) => item.screen === currentScreen);
      if (found) return found;
    }
    return SCREEN_DIRECTORY[1].items[0];
  }, [currentScreen]);

  // Helper for screens that map varient_4..6 to distinct layouts
  const pickThreeVariant = (
    v1: React.ReactNode,
    v2: React.ReactNode,
    v3: React.ReactNode
  ) => {
    if (currentVariant === 'varient_2' || currentVariant === 'varient_5')
      return v2;
    if (currentVariant === 'varient_3' || currentVariant === 'varient_6')
      return v3;
    return v1;
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return pickThreeVariant(
          <SplashVarient1 />,
          <SplashVarient2 />,
          <SplashVarient3 />
        );
      case 'Onboarding':
        return pickThreeVariant(
          <OnboardingVarient1 />,
          <OnboardingVarient2 />,
          <OnboardingVarient3 />
        );
      case 'SignUp':
        return pickThreeVariant(
          <SignUpVarient1 />,
          <SignUpVarient2 />,
          <SignUpVarient3 />
        );
      case 'Login':
        return pickThreeVariant(
          <LoginVarient1 />,
          <LoginVarient2 />,
          <LoginVarient3 />
        );
      case 'ForgotPassword':
        return pickThreeVariant(
          <ForgotPasswordVarient1 />,
          <ForgotPasswordVarient2 />,
          <ForgotPasswordVarient3 />
        );
      case 'VerificationCode':
        return pickThreeVariant(
          <VerificationCodeVarient1 />,
          <VerificationCodeVarient2 />,
          <VerificationCodeVarient3 />
        );
      case 'ResetPassword':
        return pickThreeVariant(
          <ResetPasswordVarient1 />,
          <ResetPasswordVarient2 />,
          <ResetPasswordVarient3 />
        );
      case 'Homepage':
        if (currentVariant === 'varient_2') return <HomepageVarient2 />;
        if (currentVariant === 'varient_3') return <HomepageVarient3 />;
        if (currentVariant === 'varient_4') return <HomepageVarient4 />;
        if (currentVariant === 'varient_5') return <HomepageVarient5 />;
        if (currentVariant === 'varient_6') return <HomepageVarient6 />;
        return <HomepageVarient1 />;
      case 'Search':
        return pickThreeVariant(
          <SearchVarient1 />,
          <SearchVarient2 />,
          <SearchVarient3 />
        );
      case 'SavedItems':
        return pickThreeVariant(
          <SavedItemsVarient1 />,
          <SavedItemsVarient2 />,
          <SavedItemsVarient3 />
        );
      case 'ProductDetails':
        if (currentVariant === 'varient_2') return <ProductDetailsVarient2 />;
        if (currentVariant === 'varient_3') return <ProductDetailsVarient3 />;
        if (currentVariant === 'varient_4') return <ProductDetailsVarient4 />;
        if (currentVariant === 'varient_5') return <ProductDetailsVarient5 />;
        if (currentVariant === 'varient_6') return <ProductDetailsVarient6 />;
        return <ProductDetailsVarient1 />;
      case 'Reviews':
        return pickThreeVariant(
          <ReviewsVarient1 />,
          <ReviewsVarient2 />,
          <ReviewsVarient3 />
        );
      case 'MyCart':
        return pickThreeVariant(
          <MyCartVarient1 />,
          <MyCartVarient2 />,
          <MyCartVarient3 />
        );
      case 'Checkout':
        return pickThreeVariant(
          <CheckoutVarient1 />,
          <CheckoutVarient2 />,
          <CheckoutVarient3 />
        );
      case 'Address':
        return pickThreeVariant(
          <AddressVarient1 />,
          <AddressVarient2 />,
          <AddressVarient3 />
        );
      case 'NewAddress':
        return pickThreeVariant(
          <NewAddressVarient1 />,
          <NewAddressVarient2 />,
          <NewAddressVarient3 />
        );
      case 'PaymentMethod':
        return pickThreeVariant(
          <PaymentMethodVarient1 />,
          <PaymentMethodVarient2 />,
          <PaymentMethodVarient3 />
        );
      case 'NewCard':
        return pickThreeVariant(
          <NewCardVarient1 />,
          <NewCardVarient2 />,
          <NewCardVarient3 />
        );
      case 'Account':
        if (currentVariant === 'varient_2') return <AccountVarient2 />;
        if (currentVariant === 'varient_3') return <AccountVarient3 />;
        if (currentVariant === 'varient_4') return <AccountVarient4 />;
        if (currentVariant === 'varient_5') return <AccountVarient5 />;
        if (currentVariant === 'varient_6') return <AccountVarient6 />;
        return <AccountVarient1 />;
      case 'MyOrders':
        if (currentVariant === 'varient_2' || currentVariant === 'varient_5')
          return <MyOrdersVarient2 />;
        if (currentVariant === 'varient_3' || currentVariant === 'varient_6')
          return <MyOrdersVarient3 />;
        if (currentVariant === 'varient_4') return <MyOrdersVarient4 />;
        return <MyOrdersVarient1 />;
      case 'TrackOrder':
        return pickThreeVariant(
          <TrackOrderVarient1 />,
          <TrackOrderVarient2 />,
          <TrackOrderVarient3 />
        );
      case 'MyDetails':
        return pickThreeVariant(
          <MyDetailsVarient1 />,
          <MyDetailsVarient2 />,
          <MyDetailsVarient3 />
        );
      case 'Notifications':
        return pickThreeVariant(
          <NotificationsVarient1 />,
          <NotificationsVarient2 />,
          <NotificationsVarient3 />
        );
      case 'NotificationSettings':
        return pickThreeVariant(
          <NotificationSettingsVarient1 />,
          <NotificationSettingsVarient2 />,
          <NotificationSettingsVarient3 />
        );
      case 'FAQs':
        return pickThreeVariant(
          <FAQsVarient1 />,
          <FAQsVarient2 />,
          <FAQsVarient3 />
        );
      case 'HelpCenter':
        return pickThreeVariant(
          <HelpCenterVarient1 />,
          <HelpCenterVarient2 />,
          <HelpCenterVarient3 />
        );
      case 'CustomerService':
        return pickThreeVariant(
          <CustomerServiceVarient1 />,
          <CustomerServiceVarient2 />,
          <CustomerServiceVarient3 />
        );
      default:
        return <HomepageVarient1 />;
    }
  };

  if (isMobileStandalone) {
    return (
      <View
        style={{
          position: 'fixed' as any,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          flex: 1,
          backgroundColor: colors.background,
          overflow: 'hidden',
        }}
      >
        {renderScreen()}
      </View>
    );
  }

  return (
    <View
      style={[styles.workspace, { backgroundColor: colors.workspaceBg }]}
    >
      {/* Top Bar: 6 Layout Variants Switcher + Global App Color Dots */}
      <View
        style={[
          styles.topVariantBar,
          {
            backgroundColor: colors.surfaceElevated,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.topScreenLabel, { color: colors.textSecondary }]}>
          {currentScreen}:
        </Text>
        <View style={styles.topPillsRow}>
          {currentScreenConfig.variants.map((v) => {
            const active = currentVariant === v.id;
            return (
              <TouchableOpacity
                key={v.id}
                onPress={() => {
                  setExportSelections((prev) => ({
                    ...prev,
                    [currentScreen]: v.id,
                  }));
                  navigateTo(currentScreen, v.id);
                }}
                style={[
                  styles.topVariantPill,
                  active
                    ? { backgroundColor: colors.primary }
                    : { backgroundColor: colors.surface },
                ]}
              >
                <Text
                  style={[
                    styles.topVariantPillText,
                    {
                      color: active ? colors.primaryText : colors.textPrimary,
                    },
                  ]}
                >
                  {v.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Centered Expo iOS Simulator Device Frame (390x844) */}
      <View style={styles.deviceBezel}>
        <View
          style={[
            styles.deviceViewport,
            { backgroundColor: colors.background },
          ]}
        >
          {renderScreen()}
        </View>
      </View>

      {/* Floating Control Dock: App Color Swatches + Theme Mode + Skeleton + All Screens Drawer */}
      <View style={styles.floatingDock}>
        {/* Quick App Color Swatches */}
        <View
          style={[
            styles.dockColorBar,
            {
              backgroundColor: colors.surfaceElevated,
              borderColor: colors.border,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => navigateTo('Account', 'varient_1')}
            style={styles.dockColorLabelWrap}
          >
            <Palette size={15} color={colors.primary} />
          </TouchableOpacity>
          {presets.map((p) => {
            const selected = p.id === colorPreset;
            return (
              <TouchableOpacity
                key={p.id}
                onPress={() => setColorPreset(p.id)}
                style={[
                  styles.dockSwatch,
                  {
                    backgroundColor: p.swatch,
                    borderWidth: selected ? 2.5 : 0,
                    borderColor: colors.textPrimary,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Quick 22-Font Dropdown Selector in Bottom Dock */}
        <View style={styles.dockFontDropdownContainer}>
          {dockFontDropdownOpen && (
            <View
              style={[
                styles.dockFontMenuPopup,
                {
                  backgroundColor: colors.surfaceElevated,
                  borderColor: colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.dockFontMenuHeader,
                  { borderBottomColor: colors.divider },
                ]}
              >
                <Text
                  style={[
                    styles.dockFontMenuTitle,
                    { color: colors.textPrimary },
                  ]}
                >
                  Select App Font ({fontPresets.length} Premium Fonts)
                </Text>
                <TouchableOpacity
                  onPress={() => setDockFontDropdownOpen(false)}
                >
                  <X size={15} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
              <ScrollView
                style={styles.dockFontMenuScroll}
                showsVerticalScrollIndicator={true}
              >
                {fontPresets.map((fp, index) => {
                  const isSelected = fp.id === fontPreset;
                  return (
                    <TouchableOpacity
                      key={fp.id}
                      onPress={() => {
                        setFontPreset(fp.id);
                        setDockFontDropdownOpen(false);
                      }}
                      style={[
                        styles.dockFontMenuItem,
                        {
                          backgroundColor: isSelected
                            ? colors.primary
                            : 'transparent',
                          borderBottomColor: colors.divider,
                        },
                      ]}
                    >
                      <View style={styles.dockFontMenuLeft}>
                        <Text
                          style={[
                            styles.dockFontIndexBadge,
                            {
                              color: isSelected
                                ? colors.primaryText
                                : colors.textMuted,
                            },
                          ]}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </Text>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={[
                              styles.dockFontItemName,
                              {
                                color: isSelected
                                  ? colors.primaryText
                                  : colors.textPrimary,
                                fontFamily: fp.fontFamily,
                              },
                            ]}
                          >
                            {fp.name}
                          </Text>
                          <Text
                            style={[
                              styles.dockFontItemCategory,
                              {
                                color: isSelected
                                  ? colors.primaryText
                                  : colors.textSecondary,
                                opacity: isSelected ? 0.85 : 1,
                              },
                            ]}
                          >
                            {fp.category}
                          </Text>
                        </View>
                      </View>
                      {isSelected && (
                        <CheckCircle2 size={15} color={colors.primaryText} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}

          <TouchableOpacity
            onPress={() => setDockFontDropdownOpen((prev) => !prev)}
            activeOpacity={0.85}
            style={[
              styles.dockButton,
              {
                backgroundColor: dockFontDropdownOpen
                  ? colors.primary
                  : colors.surfaceElevated,
                borderColor: colors.border,
              },
            ]}
          >
            <Type
              size={15}
              color={
                dockFontDropdownOpen ? colors.primaryText : colors.primary
              }
            />
            <Text
              style={[
                styles.dockBtnText,
                {
                  color: dockFontDropdownOpen
                    ? colors.primaryText
                    : colors.textPrimary,
                  fontFamily:
                    fontPresets.find((f) => f.id === fontPreset)?.fontFamily ||
                    'Plus Jakarta Sans',
                },
              ]}
            >
              {fontPresets.find((f) => f.id === fontPreset)?.name ||
                'Plus Jakarta Sans'}
            </Text>
            <ChevronDown
              size={14}
              color={
                dockFontDropdownOpen
                  ? colors.primaryText
                  : colors.textSecondary
              }
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={toggleTheme}
          activeOpacity={0.85}
          style={[
            styles.dockButton,
            {
              backgroundColor: colors.surfaceElevated,
              borderColor: colors.border,
            },
          ]}
        >
          {isDark ? (
            <Sun size={16} color={colors.warning} />
          ) : (
            <Moon size={16} color={colors.textPrimary} />
          )}
          <Text style={[styles.dockBtnText, { color: colors.textPrimary }]}>
            {isDark ? 'Dark' : 'Light'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleSkeletonPreview}
          activeOpacity={0.85}
          style={[
            styles.dockButton,
            {
              backgroundColor: isLoadingSkeleton
                ? colors.primary
                : colors.surfaceElevated,
              borderColor: colors.border,
            },
          ]}
        >
          <Sparkles
            size={15}
            color={isLoadingSkeleton ? colors.primaryText : colors.textPrimary}
          />
          <Text
            style={[
              styles.dockBtnText,
              {
                color: isLoadingSkeleton
                  ? colors.primaryText
                  : colors.textPrimary,
              },
            ]}
          >
            Skeleton {isLoadingSkeleton ? 'ON' : 'OFF'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDownloadFullExpoZip}
          activeOpacity={0.85}
          style={[
            styles.dockButton,
            {
              backgroundColor: colors.surfaceElevated,
              borderColor: colors.primary,
            },
          ]}
        >
          <Download size={15} color={colors.primary} />
          <Text style={[styles.dockBtnText, { color: colors.primary }]}>
            {isZipping ? 'Zipping...' : 'Download Expo .ZIP'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setDrawerOpen(true)}
          activeOpacity={0.85}
          style={[
            styles.floatingSwitcherBtn,
            { backgroundColor: colors.primary },
          ]}
        >
          <Smartphone size={16} color={colors.primaryText} />
          <Text
            style={[
              styles.floatingSwitcherText,
              { color: colors.primaryText },
            ]}
          >
            23 Screens × 6 Variants
          </Text>
          <Layers size={15} color={colors.primaryText} />
        </TouchableOpacity>
      </View>

      {/* Slide-out Screen & Variant Explorer Drawer */}
      {drawerOpen && (
        <View
          style={[styles.drawerOverlay, { backgroundColor: colors.overlay }]}
        >
          <View
            style={[
              styles.drawerPanel,
              { backgroundColor: colors.surfaceElevated },
            ]}
          >
            <View
              style={[
                styles.drawerHeader,
                { borderBottomColor: colors.divider },
              ]}
            >
              <View>
                <Text
                  style={[styles.drawerTitle, { color: colors.textPrimary }]}
                >
                  Expo Screen Variants (V1–V6)
                </Text>
                <Text
                  style={[styles.drawerSub, { color: colors.textSecondary }]}
                >
                  23 Screens × 6 Variants + Global App Color Studio
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setDrawerOpen(false)}
                style={[styles.closeBtn, { backgroundColor: colors.surface }]}
              >
                <X size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={styles.drawerScroll}
              showsVerticalScrollIndicator={false}
            >
              {/* Direct Android .APK Generator & Downloader Card */}
              <View
                style={[
                  styles.apkBuilderCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.primary,
                  },
                ]}
              >
                <View style={styles.apkHeaderRow}>
                  <View style={styles.apkTitleWrap}>
                    <Package size={16} color={colors.primary} />
                    <Text
                      style={[
                        styles.exportTitle,
                        { color: colors.textPrimary },
                      ]}
                    >
                      Direct Android .APK Builder
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.apkStatusBadge,
                      {
                        backgroundColor:
                          apkBuildState === 'ready'
                            ? colors.success
                            : colors.cardBackground,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.apkStatusBadgeText,
                        {
                          color:
                            apkBuildState === 'ready'
                              ? '#FFFFFF'
                              : colors.textSecondary,
                        },
                      ]}
                    >
                      {apkBuildState === 'ready'
                        ? 'APK READY'
                        : apkBuildState === 'building'
                        ? `${apkProgressPct}%`
                        : 'SDK 57 APK'}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[styles.exportSub, { color: colors.textSecondary }]}
                >
                  Generates <Text style={{ fontWeight: '700', color: colors.textPrimary }}>{appBranding.appName}</Text> ({appBranding.packageName}) with your custom App Logo, Color Theme & 23 selected screen variants.
                </Text>

                {apkBuildState === 'idle' && (
                  <TouchableOpacity
                    onPress={handleGenerateAndroidApk}
                    style={[
                      styles.exportBtn,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <Smartphone size={15} color={colors.primaryText} />
                    <Text
                      style={[
                        styles.exportBtnText,
                        { color: colors.primaryText },
                      ]}
                    >
                      Generate Android .APK
                    </Text>
                  </TouchableOpacity>
                )}

                {apkBuildState === 'building' && (
                  <View style={styles.apkProgressBlock}>
                    <View
                      style={[
                        styles.apkProgressTrack,
                        { backgroundColor: colors.border },
                      ]}
                    >
                      <View
                        style={[
                          styles.apkProgressFill,
                          {
                            width: `${apkProgressPct}%` as any,
                            backgroundColor: colors.primary,
                          },
                        ]}
                      />
                    </View>
                    <Text
                      style={[
                        styles.apkStepText,
                        { color: colors.textPrimary },
                      ]}
                    >
                      Building ({apkProgressPct}%): {apkStepLabel}
                    </Text>
                  </View>
                )}

                {apkBuildState === 'ready' && apkReadyArtifact && (
                  <View style={styles.apkReadyBlock}>
                    <View
                      style={[
                        styles.apkReadyMetaRow,
                        {
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <CheckCircle2 size={16} color={colors.success} />
                      <View style={{ flex: 1 }}>
                        <Text
                          style={[
                            styles.apkFileNameText,
                            { color: colors.textPrimary },
                          ]}
                          numberOfLines={1}
                        >
                          {apkReadyArtifact.filename}
                        </Text>
                        <Text
                          style={[
                            styles.apkFileSubText,
                            { color: colors.textSecondary },
                          ]}
                        >
                          {apkReadyArtifact.sizeKb} KB • {appBranding.packageName}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={handleGenerateAndroidApk}
                        style={[
                          styles.rebuildIconBtn,
                          { backgroundColor: colors.surface },
                        ]}
                      >
                        <RefreshCw size={14} color={colors.textPrimary} />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={handleDownloadGeneratedApk}
                      style={[
                        styles.exportBtn,
                        { backgroundColor: colors.success },
                      ]}
                    >
                      <Download size={15} color="#FFFFFF" />
                      <Text
                        style={[styles.exportBtnText, { color: '#FFFFFF' }]}
                      >
                        Download {apkReadyArtifact.filename}
                      </Text>
                    </TouchableOpacity>

                    {/* Scannable QR Code for Direct Mobile APK Download */}
                    {apkReadyArtifact.qrCodeDataUrl ? (
                      <View
                        style={[
                          styles.qrScanCard,
                          {
                            backgroundColor: colors.cardBackground,
                            borderColor: colors.border,
                          },
                        ]}
                      >
                        <View style={styles.qrImageWrap}>
                          <Image
                            source={{ uri: apkReadyArtifact.qrCodeDataUrl }}
                            style={styles.qrImage}
                            resizeMode="contain"
                          />
                        </View>
                        <View style={styles.qrMetaCol}>
                          <View style={styles.qrTitleInline}>
                            <QrCode size={14} color={colors.primary} />
                            <Text
                              style={[
                                styles.qrTitleText,
                                { color: colors.textPrimary },
                              ]}
                            >
                              Scan to Download on Mobile
                            </Text>
                          </View>
                          <Text
                            style={[
                              styles.qrSubText,
                              { color: colors.textSecondary },
                            ]}
                          >
                            Point your phone camera at this QR code to automatically download{' '}
                            <Text
                              style={{
                                fontWeight: '700',
                                color: colors.textPrimary,
                              }}
                            >
                              {apkReadyArtifact.filename}
                            </Text>{' '}
                            directly to your mobile device.
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              navigator.clipboard?.writeText(
                                apkReadyArtifact.mobileDownloadUrl
                              );
                              setCopiedApkLink(true);
                              setTimeout(() => setCopiedApkLink(false), 2000);
                            }}
                            style={[
                              styles.copyUrlPill,
                              {
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                              },
                            ]}
                          >
                            <Copy size={12} color={colors.primary} />
                            <Text
                              style={[
                                styles.copyUrlText,
                                { color: colors.primary },
                              ]}
                              numberOfLines={1}
                            >
                              {copiedApkLink
                                ? 'Copied Mobile Download Link!'
                                : 'Copy Direct Mobile APK Link'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : null}
                  </View>
                )}
              </View>

              {/* Live Mobile Preview QR Code Card (Normal Phone Camera Scan - No Install Needed) */}
              {livePreviewQrUrl ? (
                <View
                  style={[
                    styles.exportCard,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View style={styles.apkHeaderRow}>
                    <View
                      style={[
                        styles.apkIconBadge,
                        { backgroundColor: colors.primary },
                      ]}
                    >
                      <QrCode size={16} color={colors.primaryText} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.exportTitle,
                          { color: colors.textPrimary },
                        ]}
                      >
                        Live Mobile Preview QR Code
                      </Text>
                      <Text
                        style={[
                          styles.apkMetaBadge,
                          { color: colors.textSecondary },
                        ]}
                      >
                        Scan with normal phone camera • Instant mobile preview
                      </Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.qrScanCard,
                      {
                        backgroundColor: colors.cardBackground,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <View style={styles.qrImageWrap}>
                      <Image
                        source={{ uri: livePreviewQrUrl }}
                        style={styles.qrImage}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.qrMetaCol}>
                      <View style={styles.qrTitleInline}>
                        <Smartphone size={14} color={colors.primary} />
                        <Text
                          style={[
                            styles.qrTitleText,
                            { color: colors.textPrimary },
                          ]}
                        >
                          Scan with Normal QR / Camera
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.qrSubText,
                          { color: colors.textSecondary },
                        ]}
                      >
                        Open your phone camera or normal QR scanner to test the full mobile app live in your mobile browser without installing.
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          navigator.clipboard?.writeText(livePreviewTargetUrl);
                          setCopiedLiveUrl(true);
                          setTimeout(() => setCopiedLiveUrl(false), 2000);
                        }}
                        style={[
                          styles.copyUrlPill,
                          {
                            backgroundColor: colors.surface,
                            borderColor: colors.border,
                          },
                        ]}
                      >
                        <Copy size={12} color={colors.primary} />
                        <Text
                          style={[
                            styles.copyUrlText,
                            { color: colors.primary },
                          ]}
                          numberOfLines={1}
                        >
                          {copiedLiveUrl
                            ? 'Copied Live Preview Link!'
                            : 'Copy Mobile Preview URL'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : null}

              {/* One-Click Export Selected Variants Full Expo ZIP Banner */}
              <View
                style={[
                  styles.exportCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.primary,
                  },
                ]}
              >
                <Text
                  style={[styles.exportTitle, { color: colors.textPrimary }]}
                >
                  Download Expo SDK 57 Full Source Code (.ZIP)
                </Text>
                <Text
                  style={[styles.exportSub, { color: colors.textSecondary }]}
                >
                  Includes Expo SDK ~57.0.26 package.json (React Native 0.86.3, React 19.2.3, expo-asset ~57.0.18), native android/ & ios/ project folders, core src/ architecture, and ONLY your selected variant for each of the 23 screens.
                </Text>

                {/* Quick Batch Variant Selector */}
                <View style={styles.batchPillsRow}>
                  {(
                    [
                      ['varient_1', 'All V1'],
                      ['varient_2', 'All V2'],
                      ['varient_3', 'All V3'],
                      ['varient_4', 'All V4'],
                      ['varient_5', 'All V5'],
                      ['varient_6', 'All V6'],
                    ] as const
                  ).map(([vid, label]) => (
                    <TouchableOpacity
                      key={vid}
                      onPress={() => applyVariantToAllScreens(vid)}
                      style={[
                        styles.batchPill,
                        {
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.batchPillText,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity
                  onPress={handleDownloadFullExpoZip}
                  style={[
                    styles.exportBtn,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Download size={15} color={colors.primaryText} />
                  <Text
                    style={[
                      styles.exportBtnText,
                      { color: colors.primaryText },
                    ]}
                  >
                    {isZipping
                      ? 'Building Full Expo .ZIP...'
                      : 'Download Full Expo Source Code (.zip)'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* App Branding Studio: Dynamic App Logo, App Title & Package Name */}
              <View
                style={[
                  styles.brandingCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.brandingHeaderRow}>
                  <View>
                    <Text
                      style={[
                        styles.brandingCardTitle,
                        { color: colors.textPrimary },
                      ]}
                    >
                      App Logo, Title & Package Name
                    </Text>
                    <Text
                      style={[
                        styles.brandingCardSub,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Applied to Splash, app.json, icon.png, Android & iOS
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigateTo('Splash', 'varient_1')}
                    style={[
                      styles.previewSplashPill,
                      { backgroundColor: colors.surface },
                    ]}
                  >
                    <Text
                      style={[
                        styles.previewSplashText,
                        { color: colors.primary },
                      ]}
                    >
                      Preview Splash
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* App Logo Picker + Live Launcher Preview */}
                <View style={styles.logoPickerRow}>
                  <View
                    style={[
                      styles.logoPreviewBox,
                      {
                        backgroundColor: '#18181B',
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    {appBranding.appLogoUri ? (
                      <Image
                        source={{ uri: appBranding.appLogoUri }}
                        style={styles.logoPreviewImg}
                        resizeMode="cover"
                      />
                    ) : (
                      <Text style={styles.logoMonogramText}>
                        {(appBranding.appName.trim()[0] || 'D').toUpperCase()}
                      </Text>
                    )}
                  </View>

                  <View style={styles.logoActionsCol}>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileChange}
                      style={{ display: 'none' }}
                    />
                    <View style={styles.logoBtnsInline}>
                      <TouchableOpacity
                        onPress={() => fileInputRef.current?.click()}
                        style={[
                          styles.uploadLogoBtn,
                          { backgroundColor: colors.primary },
                        ]}
                      >
                        <ImagePlus size={14} color={colors.primaryText} />
                        <Text
                          style={[
                            styles.uploadLogoBtnText,
                            { color: colors.primaryText },
                          ]}
                        >
                          Upload App Logo
                        </Text>
                      </TouchableOpacity>

                      {appBranding.appLogoUri ? (
                        <TouchableOpacity
                          onPress={() =>
                            dispatch(updateAppBranding({ appLogoUri: '' }))
                          }
                          style={[
                            styles.clearLogoBtn,
                            {
                              backgroundColor: colors.surface,
                              borderColor: colors.border,
                            },
                          ]}
                        >
                          <Trash2 size={14} color={colors.danger} />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                    <TextInput
                      value={
                        appBranding.appLogoUri.startsWith('data:')
                          ? ''
                          : appBranding.appLogoUri
                      }
                      onChangeText={(val) =>
                        dispatch(updateAppBranding({ appLogoUri: val }))
                      }
                      placeholder="Or paste Logo Image URL..."
                      placeholderTextColor={colors.textMuted}
                      style={[
                        styles.brandingInputSmall,
                        {
                          color: colors.textPrimary,
                          backgroundColor: colors.surface,
                          borderColor: colors.border,
                        },
                      ]}
                    />
                  </View>
                </View>

                {/* App Title Input */}
                <View style={styles.fieldGroup}>
                  <Text
                    style={[
                      styles.fieldLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    APP TITLE (HOME SCREEN & SPLASH NAME)
                  </Text>
                  <TextInput
                    value={appBranding.appName}
                    onChangeText={(val) =>
                      dispatch(updateAppBranding({ appName: val }))
                    }
                    placeholder="e.g. Define Atelier"
                    placeholderTextColor={colors.textMuted}
                    style={[
                      styles.brandingInput,
                      {
                        color: colors.textPrimary,
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      },
                    ]}
                  />
                </View>

                {/* Package Name / Bundle ID Input */}
                <View style={styles.fieldGroup}>
                  <Text
                    style={[
                      styles.fieldLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    ANDROID PACKAGE NAME / IOS BUNDLE ID
                  </Text>
                  <TextInput
                    value={appBranding.packageName}
                    onChangeText={(val) =>
                      dispatch(updateAppBranding({ packageName: val }))
                    }
                    autoCapitalize="none"
                    placeholder="e.g. com.defineatelier.app"
                    placeholderTextColor={colors.textMuted}
                    style={[
                      styles.brandingInput,
                      {
                        color: colors.textPrimary,
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      },
                    ]}
                  />
                </View>
              </View>

              {/* Full-Application Font Family Studio (22 Premium Fonts + Dropdown Select) */}
              <View
                style={[
                  styles.brandingCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.brandingHeaderRow}>
                  <View style={styles.apkTitleWrap}>
                    <Type size={16} color={colors.primary} />
                    <View>
                      <Text
                        style={[
                          styles.brandingCardTitle,
                          { color: colors.textPrimary },
                        ]}
                      >
                        Premium App Font ({fontPresets.length} Fonts)
                      </Text>
                      <Text
                        style={[
                          styles.brandingCardSub,
                          { color: colors.textSecondary },
                        ]}
                      >
                        Dropdown select to change font across all 23 screens
                      </Text>
                    </View>
                  </View>
                  {fontPreset !== 'jakarta' && (
                    <TouchableOpacity
                      onPress={() => setFontPreset('jakarta')}
                      style={[
                        styles.previewSplashPill,
                        { backgroundColor: colors.surface },
                      ]}
                    >
                      <Text
                        style={[
                          styles.previewSplashText,
                          { color: colors.primary },
                        ]}
                      >
                        Reset
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Native Select Dropdown + Custom Interactive Preview Dropdown */}
                <View style={styles.fieldGroup}>
                  <Text
                    style={[
                      styles.fieldLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    QUICK FONT DROPDOWN SELECT ({fontPresets.length} PREMIUM FONTS)
                  </Text>
                  <select
                    value={fontPreset}
                    onChange={(e) =>
                      setFontPreset(e.target.value as AppFontPresetId)
                    }
                    style={{
                      width: '100%',
                      height: 40,
                      borderRadius: 9,
                      border: `1.5px solid ${colors.primary}`,
                      backgroundColor: colors.surface,
                      color: colors.textPrimary,
                      paddingLeft: 10,
                      paddingRight: 10,
                      fontSize: 12.5,
                      fontWeight: 700,
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    {fontPresets.map((fp, idx) => (
                      <option
                        key={fp.id}
                        value={fp.id}
                        style={{
                          backgroundColor: colors.surface,
                          color: colors.textPrimary,
                          fontFamily: fp.fontFamily,
                        }}
                      >
                        {idx + 1}. {fp.name} — {fp.category}
                      </option>
                    ))}
                  </select>
                </View>

                {/* Custom Expandable Live Typography Preview Dropdown */}
                <TouchableOpacity
                  onPress={() => setFontDropdownOpen((prev) => !prev)}
                  activeOpacity={0.85}
                  style={[
                    styles.fontDropdownTrigger,
                    {
                      backgroundColor: colors.surface,
                      borderColor: fontDropdownOpen
                        ? colors.primary
                        : colors.border,
                    },
                  ]}
                >
                  <View style={styles.fontDropdownTriggerLeft}>
                    <View
                      style={[
                        styles.fontBadgeBox,
                        { backgroundColor: colors.primary },
                      ]}
                    >
                      <Text
                        style={[
                          styles.fontBadgeGlyph,
                          {
                            color: colors.primaryText,
                            fontFamily:
                              fontPresets.find((f) => f.id === fontPreset)
                                ?.fontFamily || 'Plus Jakarta Sans',
                          },
                        ]}
                      >
                        Aa
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.fontDropdownActiveName,
                          {
                            color: colors.textPrimary,
                            fontFamily:
                              fontPresets.find((f) => f.id === fontPreset)
                                ?.fontFamily || 'Plus Jakarta Sans',
                          },
                        ]}
                      >
                        {fontPresets.find((f) => f.id === fontPreset)?.name}
                      </Text>
                      <Text
                        style={[
                          styles.fontDropdownActiveSub,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {fontPresets.find((f) => f.id === fontPreset)?.category}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.fontDropdownTriggerRight}>
                    <Text
                      style={[
                        styles.fontCountPill,
                        {
                          color: colors.primary,
                          backgroundColor: colors.cardBackground,
                        },
                      ]}
                    >
                      {fontDropdownOpen ? 'Hide List' : `${fontPresets.length} Fonts`}
                    </Text>
                    <ChevronDown size={16} color={colors.textPrimary} />
                  </View>
                </TouchableOpacity>

                {fontDropdownOpen && (
                  <View
                    style={[
                      styles.fontDropdownListContainer,
                      {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.fontSearchRow,
                        {
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <Search size={13} color={colors.textMuted} />
                      <TextInput
                        value={fontSearchQuery}
                        onChangeText={setFontSearchQuery}
                        placeholder="Search 22 luxury & editorial fonts..."
                        placeholderTextColor={colors.textMuted}
                        style={[
                          styles.fontSearchInput,
                          { color: colors.textPrimary },
                        ]}
                      />
                      {fontSearchQuery.length > 0 && (
                        <TouchableOpacity
                          onPress={() => setFontSearchQuery('')}
                        >
                          <X size={13} color={colors.textMuted} />
                        </TouchableOpacity>
                      )}
                    </View>

                    <ScrollView
                      style={styles.fontDropdownScrollArea}
                      nestedScrollEnabled
                      showsVerticalScrollIndicator={true}
                    >
                      {fontPresets
                        .filter(
                          (fp) =>
                            fp.name
                              .toLowerCase()
                              .includes(fontSearchQuery.toLowerCase()) ||
                            fp.category
                              .toLowerCase()
                              .includes(fontSearchQuery.toLowerCase())
                        )
                        .map((fp, idx) => {
                          const isSelected = fp.id === fontPreset;
                          return (
                            <TouchableOpacity
                              key={fp.id}
                              onPress={() => {
                                setFontPreset(fp.id);
                                setFontDropdownOpen(false);
                              }}
                              activeOpacity={0.85}
                              style={[
                                styles.fontDropdownRowItem,
                                {
                                  backgroundColor: isSelected
                                    ? colors.primary
                                    : 'transparent',
                                  borderBottomColor: colors.divider,
                                },
                              ]}
                            >
                              <View style={styles.fontDropdownRowLeft}>
                                <Text
                                  style={[
                                    styles.fontDropdownRowSample,
                                    {
                                      color: isSelected
                                        ? colors.primaryText
                                        : colors.textPrimary,
                                      fontFamily: fp.fontFamily,
                                    },
                                  ]}
                                >
                                  Aa
                                </Text>
                                <View style={{ flex: 1 }}>
                                  <Text
                                    style={[
                                      styles.fontDropdownRowTitle,
                                      {
                                        color: isSelected
                                          ? colors.primaryText
                                          : colors.textPrimary,
                                        fontFamily: fp.fontFamily,
                                      },
                                    ]}
                                  >
                                    {idx + 1}. {fp.name}
                                  </Text>
                                  <Text
                                    style={[
                                      styles.fontDropdownRowCategory,
                                      {
                                        color: isSelected
                                          ? colors.primaryText
                                          : colors.textSecondary,
                                        opacity: isSelected ? 0.85 : 1,
                                      },
                                    ]}
                                  >
                                    {fp.category}
                                  </Text>
                                </View>
                              </View>
                              {isSelected && (
                                <CheckCircle2
                                  size={15}
                                  color={colors.primaryText}
                                />
                              )}
                            </TouchableOpacity>
                          );
                        })}
                    </ScrollView>
                  </View>
                )}
              </View>

              {SCREEN_DIRECTORY.map((section) => (
                <View key={section.group} style={styles.groupBlock}>
                  <Text
                    style={[styles.groupLabel, { color: colors.textSecondary }]}
                  >
                    {section.group}
                  </Text>
                  {section.items.map((item) => (
                    <View
                      key={item.screen}
                      style={[
                        styles.screenItemCard,
                        {
                          borderColor: colors.border,
                          backgroundColor: colors.cardBackground,
                        },
                      ]}
                    >
                      <View style={styles.screenTitleRow}>
                        <Text
                          style={[
                            styles.screenItemName,
                            { color: colors.textPrimary },
                          ]}
                        >
                          src/screens/{item.screen}
                        </Text>
                        <Text
                          style={[
                            styles.exportBadgeText,
                            { color: colors.primary },
                          ]}
                        >
                          ZIP: {exportSelections[item.screen] || 'varient_1'}
                        </Text>
                      </View>
                      <View style={styles.variantPillsWrap}>
                        {item.variants.map((v) => {
                          const isSelectedForExport =
                            exportSelections[item.screen] === v.id;
                          return (
                            <TouchableOpacity
                              key={v.id}
                              onPress={() => {
                                setExportSelections((prev) => ({
                                  ...prev,
                                  [item.screen]: v.id,
                                }));
                                navigateTo(item.screen, v.id);
                              }}
                              style={[
                                styles.variantChip,
                                isSelectedForExport
                                  ? { backgroundColor: colors.primary }
                                  : {
                                      backgroundColor: colors.surface,
                                      borderWidth: 1,
                                      borderColor: colors.border,
                                    },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.variantChipText,
                                  {
                                    color: isSelectedForExport
                                      ? colors.primaryText
                                      : colors.textPrimary,
                                  },
                                ]}
                              >
                                {v.name}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <ExpoNavigator />
      </AppThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  workspace: {
    minHeight: '100vh' as any,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    position: 'relative',
  },
  topVariantBar: {
    maxWidth: 960,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  topScreenLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  topPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  topVariantPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  topVariantPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  deviceBezel: {
    width: 406,
    height: 860,
    borderRadius: 50,
    backgroundColor: '#18181B',
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.28,
    shadowRadius: 32,
  },
  deviceViewport: {
    width: 390,
    height: 844,
    borderRadius: 42,
    overflow: 'hidden',
  },
  floatingDock: {
    position: 'fixed' as any,
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 80,
  },
  dockColorBar: {
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  dockColorLabelWrap: {
    marginRight: 2,
  },
  dockSwatch: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  dockFontDropdownContainer: {
    position: 'relative',
  },
  dockFontMenuPopup: {
    position: 'absolute' as any,
    bottom: 54,
    right: 0,
    width: 290,
    maxHeight: 370,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 20,
    overflow: 'hidden',
    zIndex: 120,
  },
  dockFontMenuHeader: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dockFontMenuTitle: {
    fontSize: 12,
    fontWeight: '800',
  },
  dockFontMenuScroll: {
    maxHeight: 320,
  },
  dockFontMenuItem: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  dockFontMenuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    flex: 1,
  },
  dockFontIndexBadge: {
    fontSize: 10,
    fontWeight: '700',
    width: 18,
  },
  dockFontItemName: {
    fontSize: 13,
    fontWeight: '700',
  },
  dockFontItemCategory: {
    fontSize: 10,
    marginTop: 1,
  },
  dockButton: {
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  dockBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  floatingSwitcherBtn: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  floatingSwitcherText: {
    fontSize: 13,
    fontWeight: '700',
  },
  drawerOverlay: {
    position: 'fixed' as any,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'flex-end',
    zIndex: 100,
  },
  drawerPanel: {
    width: 390,
    height: '100%',
    paddingTop: 20,
  },
  drawerHeader: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  drawerSub: {
    fontSize: 12,
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerScroll: {
    padding: 20,
    gap: 18,
  },
  apkBuilderCard: {
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 14,
    gap: 10,
  },
  apkHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  apkTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  apkStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  apkStatusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  apkProgressBlock: {
    gap: 6,
    marginTop: 4,
  },
  apkProgressTrack: {
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
  },
  apkProgressFill: {
    height: '100%',
    borderRadius: 999,
  },
  apkStepText: {
    fontSize: 11,
    fontWeight: '600',
  },
  apkReadyBlock: {
    gap: 8,
    marginTop: 2,
  },
  apkReadyMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 9,
    borderRadius: 9,
    borderWidth: 1,
  },
  apkFileNameText: {
    fontSize: 12,
    fontWeight: '700',
  },
  apkFileSubText: {
    fontSize: 10.5,
    marginTop: 1,
  },
  rebuildIconBtn: {
    width: 28,
    height: 28,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrScanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 4,
  },
  qrImageWrap: {
    width: 96,
    height: 96,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrImage: {
    width: 88,
    height: 88,
  },
  qrMetaCol: {
    flex: 1,
    gap: 4,
  },
  qrTitleInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  qrTitleText: {
    fontSize: 12,
    fontWeight: '800',
  },
  qrSubText: {
    fontSize: 10.5,
    lineHeight: 14.5,
  },
  copyUrlPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
    borderWidth: 1,
    marginTop: 2,
    alignSelf: 'flex-start',
  },
  copyUrlText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  exportCard: {
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 14,
    gap: 8,
  },
  exportTitle: {
    fontSize: 13.5,
    fontWeight: '800',
  },
  exportSub: {
    fontSize: 11.5,
    lineHeight: 16,
  },
  exportBtn: {
    height: 38,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  exportBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  batchPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2,
  },
  batchPill: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
  },
  batchPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  brandingCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  brandingHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandingCardTitle: {
    fontSize: 13.5,
    fontWeight: '800',
  },
  brandingCardSub: {
    fontSize: 11,
    marginTop: 2,
  },
  previewSplashPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  previewSplashText: {
    fontSize: 11,
    fontWeight: '700',
  },
  logoPickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoPreviewBox: {
    width: 60,
    height: 60,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoPreviewImg: {
    width: '100%',
    height: '100%',
  },
  logoMonogramText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  logoActionsCol: {
    flex: 1,
    gap: 6,
  },
  logoBtnsInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  uploadLogoBtn: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  uploadLogoBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  clearLogoBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandingInputSmall: {
    height: 30,
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: 9,
    fontSize: 11,
  },
  fieldGroup: {
    gap: 4,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  brandingInput: {
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 12.5,
    fontWeight: '600',
  },
  fontGridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  fontDropdownTrigger: {
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  fontDropdownTriggerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  fontBadgeBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontBadgeGlyph: {
    fontSize: 15,
    fontWeight: '800',
  },
  fontDropdownActiveName: {
    fontSize: 13,
    fontWeight: '700',
  },
  fontDropdownActiveSub: {
    fontSize: 10.5,
    marginTop: 1,
  },
  fontDropdownTriggerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fontCountPill: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
  },
  fontDropdownListContainer: {
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: 2,
  },
  fontSearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 10,
    height: 34,
    borderBottomWidth: 1,
  },
  fontSearchInput: {
    flex: 1,
    fontSize: 11.5,
    height: '100%',
  },
  fontDropdownScrollArea: {
    maxHeight: 240,
  },
  fontDropdownRowItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  fontDropdownRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  fontDropdownRowSample: {
    fontSize: 15,
    fontWeight: '800',
    width: 24,
    textAlign: 'center',
  },
  fontDropdownRowTitle: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  fontDropdownRowCategory: {
    fontSize: 10,
    marginTop: 1,
  },
  fontOptionCard: {
    width: '48.4%' as any,
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 2,
  },
  fontCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fontSampleGlyph: {
    fontSize: 16,
    fontWeight: '800',
  },
  fontOptionName: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  fontOptionCategory: {
    fontSize: 10,
    fontWeight: '500',
  },
  screenTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exportBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  groupBlock: {
    gap: 10,
  },
  groupLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  screenItemCard: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  screenItemName: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  variantPillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  variantChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  variantChipText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
});
