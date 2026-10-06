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
  AppWindow,
  ArrowRight,
  Boxes,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FolderGit2,
  FolderTree,
  ImagePlus,
  Info,
  Layers,
  LayoutGrid,
  Maximize2,
  Moon,
  Package,
  Palette,
  Plus,
  QrCode,
  RefreshCw,
  RotateCcw,
  Search,
  Shield,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Sun,
  Trash2,
  Type,
  Undo2,
  Redo2,
  History,
  Utensils,
  Dumbbell,
  Building2,
  Coins,
  X,
  Zap,
} from 'lucide-react';
import ScreenHierarchyTree from './component/ScreenHierarchyTree';
import StudioDashboardShell from '../components/StudioDashboardShell';
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
  setBottomNavVariantAction,
  setColorPresetAction,
  setFontPresetAction,
  setForceSkeleton,
  setThemeModeAction as setReduxThemeMode,
  toggleForceSkeleton,
  toggleThemeMode,
  updateAppBranding,
} from './store/slices/appSlice';
import { BOTTOM_NAV_VARIANTS } from './component';
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
          'Classic Atelier Profile',
          'VIP Bento Studio',
          'Concierge & Orders',
          'Brand Studio & Rewards',
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
 * Consistent ThemeProvider wrapping the entire application
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

export const ExpoNavigator: React.FC<{ onSwitchProject?: (projectId: string) => void }> = ({
  onSwitchProject,
}) => {
  const dispatch = useAppDispatch();
  const {
    currentScreen,
    currentVariant,
    bottomNavVariant,
    setBottomNavVariant,
    navigateTo,
  } = useAppNavigation();
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

  // Studio Dashboard Tabs: 'screens' | 'theme' | 'branding' | 'export'
  const [activeStudioTab, setActiveStudioTab] = useState<
    'screens' | 'theme' | 'branding' | 'export'
  >('screens');
  const [screensViewMode, setScreensViewMode] = useState<'grid' | 'hierarchy'>('grid');
  const [selectedFlowGroup, setSelectedFlowGroup] = useState<string>('All');
  const [screenSearchQuery, setScreenSearchQuery] = useState<string>('');
  const [fontSearchQuery, setFontSearchQuery] = useState<string>('');
  const [addAppModalOpen, setAddAppModalOpen] = useState(false);
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
        // Fallback to origin
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

  interface VariantHistorySnapshot {
    screen: ScreenName;
    variant: ScreenVariant;
    exportSelections: Record<ScreenName, ScreenVariant>;
    actionLabel: string;
    timestamp: number;
  }

  const initialExportSelections = useMemo(() => {
    const initial = {} as Record<ScreenName, ScreenVariant>;
    SCREEN_DIRECTORY.forEach((g) =>
      g.items.forEach((it) => {
        initial[it.screen] = 'varient_1';
      })
    );
    return initial;
  }, []);

  const [exportSelections, setExportSelections] = useState<
    Record<ScreenName, ScreenVariant>
  >(initialExportSelections);

  // Undo / Redo History Stack
  const [historyStack, setHistoryStack] = useState<VariantHistorySnapshot[]>(() => [
    {
      screen: 'Homepage',
      variant: 'varient_1',
      exportSelections: { ...initialExportSelections },
      actionLabel: 'Initial Setup (Homepage V1)',
      timestamp: Date.now(),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const pushHistorySnapshot = (
    newScreen: ScreenName,
    newVariant: ScreenVariant,
    newExportSelections: Record<ScreenName, ScreenVariant>,
    actionLabel: string
  ) => {
    setHistoryStack((prev) => {
      const current = prev[historyIndex];
      if (
        current &&
        current.screen === newScreen &&
        current.variant === newVariant &&
        JSON.stringify(current.exportSelections) === JSON.stringify(newExportSelections)
      ) {
        return prev;
      }
      const sliced = prev.slice(0, historyIndex + 1);
      const newSnapshot: VariantHistorySnapshot = {
        screen: newScreen,
        variant: newVariant,
        exportSelections: { ...newExportSelections },
        actionLabel,
        timestamp: Date.now(),
      };
      return [...sliced, newSnapshot];
    });
    setHistoryIndex((prev) => prev + 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevSnapshot = historyStack[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setExportSelections(prevSnapshot.exportSelections);
      navigateTo(prevSnapshot.screen, prevSnapshot.variant);
    }
  };

  const handleRedo = () => {
    if (historyIndex < historyStack.length - 1) {
      const nextSnapshot = historyStack[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setExportSelections(nextSnapshot.exportSelections);
      navigateTo(nextSnapshot.screen, nextSnapshot.variant);
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < historyStack.length - 1;
  const prevActionLabel = canUndo ? historyStack[historyIndex]?.actionLabel : '';
  const nextActionLabel = canRedo ? historyStack[historyIndex + 1]?.actionLabel : '';

  // Global Keyboard Shortcuts for Undo/Redo (Ctrl+Z / Cmd+Z, Ctrl+Y / Cmd+Shift+Z)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        handleUndo();
      } else if (
        ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'z') ||
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y')
      ) {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, historyStack]);

  const applyVariantToAllScreens = (variant: ScreenVariant) => {
    const updated = {} as Record<ScreenName, ScreenVariant>;
    SCREEN_DIRECTORY.forEach((g) =>
      g.items.forEach((it) => {
        updated[it.screen] = variant;
      })
    );
    setExportSelections(updated);
    navigateTo(currentScreen, variant);
    pushHistorySnapshot(
      currentScreen,
      variant,
      updated,
      `Batch set all screens to ${variant.replace('varient_', 'V')}`
    );
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
        defaultBottomNavVariant: bottomNavVariant,
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
    setApkProgressPct(5);
    setApkStepLabel('Initializing Expo SDK build runner...');
    try {
      const artifact = await buildAndroidApkArtifact({
        selectedVariants: exportSelections,
        defaultColorPreset: colorPreset,
        defaultFontPreset: fontPreset,
        defaultBottomNavVariant: bottomNavVariant,
        defaultThemeMode: isDark ? 'dark' : 'light',
        appName: appBranding.appName,
        packageName: appBranding.packageName,
        appLogoUri: appBranding.appLogoUri,
        onProgress: (_stepIndex: number, stepLabel: string, percent: number) => {
          setApkProgressPct(percent);
          setApkStepLabel(stepLabel);
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

  // Screen Rendering Resolver
  const renderScreen = () => {
    const pickThreeVariant = (v1: React.ReactNode, v2: React.ReactNode, v3: React.ReactNode) => {
      if (currentVariant === 'varient_2') return v2;
      if (currentVariant === 'varient_3') return v3;
      return v1;
    };

    switch (currentScreen) {
      case 'Splash':
        return pickThreeVariant(<SplashVarient1 />, <SplashVarient2 />, <SplashVarient3 />);
      case 'Onboarding':
        return pickThreeVariant(<OnboardingVarient1 />, <OnboardingVarient2 />, <OnboardingVarient3 />);
      case 'SignUp':
        return pickThreeVariant(<SignUpVarient1 />, <SignUpVarient2 />, <SignUpVarient3 />);
      case 'Login':
        return pickThreeVariant(<LoginVarient1 />, <LoginVarient2 />, <LoginVarient3 />);
      case 'ForgotPassword':
        return pickThreeVariant(<ForgotPasswordVarient1 />, <ForgotPasswordVarient2 />, <ForgotPasswordVarient3 />);
      case 'VerificationCode':
        return pickThreeVariant(<VerificationCodeVarient1 />, <VerificationCodeVarient2 />, <VerificationCodeVarient3 />);
      case 'ResetPassword':
        return pickThreeVariant(<ResetPasswordVarient1 />, <ResetPasswordVarient2 />, <ResetPasswordVarient3 />);
      case 'Homepage':
        if (currentVariant === 'varient_2') return <HomepageVarient2 />;
        if (currentVariant === 'varient_3') return <HomepageVarient3 />;
        if (currentVariant === 'varient_4') return <HomepageVarient4 />;
        if (currentVariant === 'varient_5') return <HomepageVarient5 />;
        if (currentVariant === 'varient_6') return <HomepageVarient6 />;
        return <HomepageVarient1 />;
      case 'Search':
        return pickThreeVariant(<SearchVarient1 />, <SearchVarient2 />, <SearchVarient3 />);
      case 'SavedItems':
        return pickThreeVariant(<SavedItemsVarient1 />, <SavedItemsVarient2 />, <SavedItemsVarient3 />);
      case 'ProductDetails':
        if (currentVariant === 'varient_2') return <ProductDetailsVarient2 />;
        if (currentVariant === 'varient_3') return <ProductDetailsVarient3 />;
        if (currentVariant === 'varient_4') return <ProductDetailsVarient4 />;
        if (currentVariant === 'varient_5') return <ProductDetailsVarient5 />;
        if (currentVariant === 'varient_6') return <ProductDetailsVarient6 />;
        return <ProductDetailsVarient1 />;
      case 'Reviews':
        return pickThreeVariant(<ReviewsVarient1 />, <ReviewsVarient2 />, <ReviewsVarient3 />);
      case 'MyCart':
        return pickThreeVariant(<MyCartVarient1 />, <MyCartVarient2 />, <MyCartVarient3 />);
      case 'Checkout':
        return pickThreeVariant(<CheckoutVarient1 />, <CheckoutVarient2 />, <CheckoutVarient3 />);
      case 'Address':
        return pickThreeVariant(<AddressVarient1 />, <AddressVarient2 />, <AddressVarient3 />);
      case 'NewAddress':
        return pickThreeVariant(<NewAddressVarient1 />, <NewAddressVarient2 />, <NewAddressVarient3 />);
      case 'PaymentMethod':
        return pickThreeVariant(<PaymentMethodVarient1 />, <PaymentMethodVarient2 />, <PaymentMethodVarient3 />);
      case 'NewCard':
        return pickThreeVariant(<NewCardVarient1 />, <NewCardVarient2 />, <NewCardVarient3 />);
      case 'Account':
        if (currentVariant === 'varient_2') return <AccountVarient2 />;
        if (currentVariant === 'varient_3') return <AccountVarient3 />;
        if (currentVariant === 'varient_4') return <AccountVarient4 />;
        if (currentVariant === 'varient_5') return <AccountVarient5 />;
        if (currentVariant === 'varient_6') return <AccountVarient6 />;
        return <AccountVarient1 />;
      case 'MyOrders':
        if (currentVariant === 'varient_2' || currentVariant === 'varient_5') return <MyOrdersVarient2 />;
        if (currentVariant === 'varient_3' || currentVariant === 'varient_6') return <MyOrdersVarient3 />;
        if (currentVariant === 'varient_4') return <MyOrdersVarient4 />;
        return <MyOrdersVarient1 />;
      case 'TrackOrder':
        return pickThreeVariant(<TrackOrderVarient1 />, <TrackOrderVarient2 />, <TrackOrderVarient3 />);
      case 'MyDetails':
        return pickThreeVariant(<MyDetailsVarient1 />, <MyDetailsVarient2 />, <MyDetailsVarient3 />);
      case 'Notifications':
        return pickThreeVariant(<NotificationsVarient1 />, <NotificationsVarient2 />, <NotificationsVarient3 />);
      case 'NotificationSettings':
        return pickThreeVariant(<NotificationSettingsVarient1 />, <NotificationSettingsVarient2 />, <NotificationSettingsVarient3 />);
      case 'FAQs':
        return pickThreeVariant(<FAQsVarient1 />, <FAQsVarient2 />, <FAQsVarient3 />);
      case 'HelpCenter':
        return pickThreeVariant(<HelpCenterVarient1 />, <HelpCenterVarient2 />, <HelpCenterVarient3 />);
      case 'CustomerService':
        return pickThreeVariant(<CustomerServiceVarient1 />, <CustomerServiceVarient2 />, <CustomerServiceVarient3 />);
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

  // Filtered screens for Directory tab
  const filteredGroups = SCREEN_DIRECTORY.map((group) => {
    if (selectedFlowGroup !== 'All' && group.group !== selectedFlowGroup) {
      return null;
    }
    const filteredItems = group.items.filter((item) =>
      item.label.toLowerCase().includes(screenSearchQuery.toLowerCase()) ||
      item.screen.toLowerCase().includes(screenSearchQuery.toLowerCase())
    );
    return filteredItems.length > 0 ? { ...group, items: filteredItems } : null;
  }).filter(Boolean) as ScreenGroupConfig[];

  const currentVariantObj = makeSixVariants([
    'Default', 'Alternative 1', 'Alternative 2', 'Alternative 3', 'Alternative 4', 'Alternative 5'
  ]).find((v) => v.id === currentVariant);

  const middleContent = (
    <>
          {/* TAB 1: SCREENS & VARIANTS DIRECTORY */}
          {activeStudioTab === 'screens' && (
            <div className="max-w-5xl mx-auto space-y-6">
              {/* View Switcher Bar: Grid Cards vs Screen Hierarchy Tree */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <button
                      onClick={() => setScreensViewMode('grid')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        screensViewMode === 'grid'
                          ? 'shadow-sm'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                      style={
                        screensViewMode === 'grid'
                          ? {
                              backgroundColor: colors.primary,
                              color: colors.primaryText,
                            }
                          : undefined
                      }
                    >
                      <LayoutGrid size={13} />
                      <span>Grid Directory (23)</span>
                    </button>
                    <button
                      onClick={() => setScreensViewMode('hierarchy')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        screensViewMode === 'hierarchy'
                          ? 'shadow-sm'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                      style={
                        screensViewMode === 'hierarchy'
                          ? {
                              backgroundColor: colors.primary,
                              color: colors.primaryText,
                            }
                          : undefined
                      }
                    >
                      <FolderTree size={13} />
                      <span>Screen Hierarchy</span>
                    </button>
                  </div>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search size={14} className="absolute left-3 top-2.5 text-neutral-400" />
                  <input
                    type="text"
                    value={screenSearchQuery}
                    onChange={(e) => setScreenSearchQuery(e.target.value)}
                    placeholder="Filter screens or flows..."
                    className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-900 dark:text-white focus:outline-none"
                    style={{
                      borderColor: screenSearchQuery ? colors.primary : undefined,
                    }}
                  />
                  {screenSearchQuery && (
                    <button
                      onClick={() => setScreenSearchQuery('')}
                      className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-600"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* HIERARCHY TREE VIEW */}
              {screensViewMode === 'hierarchy' ? (
                <ScreenHierarchyTree
                  currentScreen={currentScreen}
                  currentVariant={currentVariant}
                  exportSelections={exportSelections}
                  onSelectScreen={(s, v) => {
                    if (v) {
                      setExportSelections((prev) => ({ ...prev, [s]: v }));
                    }
                    navigateTo(s, v || exportSelections[s] || 'varient_1');
                  }}
                  onSetExportVariant={(s, v) => {
                    setExportSelections((prev) => ({ ...prev, [s]: v }));
                  }}
                  searchQuery={screenSearchQuery}
                />
              ) : (
                /* GRID CARDS VIEW */
                <div className="space-y-6">
                  {/* Category Filter */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {[
                      'All',
                      'Onboarding & Auth',
                      'Discover & Catalog',
                      'Cart, Checkout & Payment',
                      'Account, Orders & Support',
                    ].map((flow) => {
                      const active = selectedFlowGroup === flow;
                      return (
                        <button
                          key={flow}
                          onClick={() => setSelectedFlowGroup(flow)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                            active
                              ? 'shadow-sm'
                              : 'bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                          }`}
                          style={
                            active
                              ? {
                                  backgroundColor: colors.primary,
                                  color: colors.primaryText,
                                }
                              : undefined
                          }
                        >
                          {flow === 'All' ? 'All Screens (23)' : flow}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Batch Variant Selectors */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal size={15} className="text-neutral-500" />
                      <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                        Batch Set All Screens for Export:
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
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
                        <button
                          key={vid}
                          onClick={() => applyVariantToAllScreens(vid)}
                          className="px-2.5 py-1 text-xs font-semibold rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Screen Cards Grid */}
                  <div className="space-y-6">
                    {filteredGroups.map((group) => (
                      <div key={group.group} className="space-y-3">
                        <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                          {group.group} ({group.items.length})
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                          {group.items.map((item) => {
                            const isCurrentActive = currentScreen === item.screen;
                            const selectedExportVariant = exportSelections[item.screen] || 'varient_1';

                            return (
                              <div
                                key={item.screen}
                                className={`rounded-xl border p-4 bg-white dark:bg-neutral-900 transition-all ${
                                  isCurrentActive
                                    ? 'shadow-md ring-2 ring-black/5 dark:ring-white/5'
                                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm'
                                }`}
                                style={
                                  isCurrentActive
                                    ? {
                                        borderColor: colors.primary,
                                      }
                                    : undefined
                                }
                              >
                                <div className="flex items-start justify-between gap-2 mb-3">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                                        {item.label}
                                      </h4>
                                      {isCurrentActive && (
                                        <span
                                          className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                                          style={{
                                            backgroundColor: colors.primary,
                                            color: colors.primaryText,
                                          }}
                                        >
                                          Active on Phone
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[11px] font-mono text-neutral-400">
                                      src/screens/{item.screen}
                                    </span>
                                  </div>

                                  <button
                                    onClick={() => navigateTo(item.screen, selectedExportVariant)}
                                    className="px-2.5 py-1 rounded-lg text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center gap-1 transition"
                                  >
                                    <Eye size={12} />
                                    <span>Preview</span>
                                  </button>
                                </div>

                                {/* 6 Variant Selector Buttons */}
                                <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                                  {item.variants.map((v) => {
                                    const isVariantSelected =
                                      isCurrentActive && currentVariant === v.id;
                                    const isZipSelected = selectedExportVariant === v.id;

                                    return (
                                      <button
                                        key={v.id}
                                        onClick={() => {
                                          setExportSelections((prev) => ({
                                            ...prev,
                                            [item.screen]: v.id,
                                          }));
                                          navigateTo(item.screen, v.id);
                                        }}
                                        className={`px-2.5 py-2 rounded-lg text-left text-xs font-semibold flex items-center justify-between gap-1 transition ${
                                          isVariantSelected
                                            ? 'shadow-sm'
                                            : isZipSelected
                                            ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border'
                                            : 'bg-neutral-50/60 dark:bg-neutral-950/40 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                        }`}
                                        style={
                                          isVariantSelected
                                            ? {
                                                backgroundColor: colors.primary,
                                                color: colors.primaryText,
                                              }
                                            : isZipSelected
                                            ? {
                                                borderColor: colors.primary,
                                              }
                                            : undefined
                                        }
                                      >
                                        <span className="truncate">{v.name}</span>
                                        {isVariantSelected && <Check size={12} className="flex-shrink-0" />}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DESIGN SYSTEM (Colors, Fonts, Navbars) */}
          {activeStudioTab === 'theme' && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Color Presets */}
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Brand Color Palette (7 Luxury Themes)
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Click any palette to dynamically restyle buttons, badges, navigation, and accents across all 23 screens.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {presets.map((preset) => {
                    const isSelected = colorPreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => setColorPreset(preset.id)}
                        className={`p-3.5 rounded-xl border-2 text-left flex items-center justify-between gap-3 transition ${
                          isSelected
                            ? 'bg-neutral-50 dark:bg-neutral-800/80 shadow-sm'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900'
                        }`}
                        style={
                          isSelected
                            ? {
                                borderColor: colors.primary,
                              }
                            : undefined
                        }
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg shadow-sm border border-black/10 flex-shrink-0"
                            style={{ backgroundColor: preset.swatch }}
                          />
                          <div>
                            <div className="text-xs font-bold text-neutral-900 dark:text-white">
                              {preset.name}
                            </div>
                            <div className="text-[10px] font-mono text-neutral-400">
                              {preset.swatch}
                            </div>
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 size={16} style={{ color: colors.primary }} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Typography Studio */}
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      Curated Typography ({fontPresets.length} Premium Fonts)
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Select font family to apply Google Fonts across all screens.
                    </p>
                  </div>
                  <span
                    className="text-xs font-mono font-bold px-2.5 py-1 rounded"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.primaryText,
                    }}
                  >
                    Active: {fontPresets.find((f) => f.id === fontPreset)?.name}
                  </span>
                </div>

                {/* Font Search Filter */}
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-2.5 text-neutral-400" />
                  <input
                    type="text"
                    value={fontSearchQuery}
                    onChange={(e) => setFontSearchQuery(e.target.value)}
                    placeholder="Search 22 curated fonts by name or style (Serif, Sans, Mono)..."
                    className="w-full pl-9 pr-3 py-2 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-900 dark:text-white focus:outline-none"
                    style={{
                      borderColor: fontSearchQuery ? colors.primary : undefined,
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
                  {fontPresets
                    .filter(
                      (fp) =>
                        fp.name.toLowerCase().includes(fontSearchQuery.toLowerCase()) ||
                        fp.category.toLowerCase().includes(fontSearchQuery.toLowerCase())
                    )
                    .map((fp) => {
                      const isSelected = fontPreset === fp.id;
                      return (
                        <button
                          key={fp.id}
                          onClick={() => setFontPreset(fp.id)}
                          className={`p-3 rounded-xl border text-left flex items-start justify-between gap-2 transition ${
                            isSelected
                              ? 'bg-neutral-50 dark:bg-neutral-800 shadow-sm'
                              : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900'
                          }`}
                          style={
                            isSelected
                              ? {
                                  borderColor: colors.primary,
                                }
                              : undefined
                          }
                        >
                          <div>
                            <div
                              className="text-lg font-bold text-neutral-900 dark:text-white leading-tight"
                              style={{ fontFamily: fp.fontFamily }}
                            >
                              Aa · {fp.name}
                            </div>
                            <div className="text-[10px] text-neutral-400 mt-1">
                              {fp.category}
                            </div>
                          </div>
                          {isSelected && <Check size={16} style={{ color: colors.primary }} className="flex-shrink-0 mt-0.5" />}
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Bottom Navigation UI Studio */}
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Bottom Navigation Bar Designs (6 Styles)
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Choose any bottom tab bar variant. V1 is classic default.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {BOTTOM_NAV_VARIANTS.map((nav) => {
                    const isSelected = bottomNavVariant === nav.id;
                    return (
                      <button
                        key={nav.id}
                        onClick={() => setBottomNavVariant(nav.id)}
                        className={`p-3.5 rounded-xl border-2 text-left flex items-start justify-between gap-2 transition ${
                          isSelected
                            ? 'bg-neutral-50 dark:bg-neutral-800 shadow-sm'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900'
                        }`}
                        style={
                          isSelected
                            ? {
                                borderColor: colors.primary,
                              }
                            : undefined
                        }
                      >
                        <div>
                          <div className="text-xs font-bold text-neutral-900 dark:text-white">
                            {nav.name}
                          </div>
                          <div className="text-[11px] text-neutral-500 mt-0.5">
                            {nav.tagline}
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 size={16} style={{ color: colors.primary }} className="flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: APP BRANDING & ASSETS */}
          {activeStudioTab === 'branding' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    App Branding & Launcher Config
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Updates your app logo, title, and package bundle ID across Android & iOS.
                  </p>
                </div>

                {/* Logo Uploader */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl border border-neutral-300 dark:border-neutral-700 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {appBranding.appLogoUri ? (
                      <img
                        src={appBranding.appLogoUri}
                        alt="Logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-black" style={{ color: colors.primaryText }}>
                        {(appBranding.appName.trim()[0] || 'D').toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileChange}
                      className="hidden"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm hover:opacity-95"
                        style={{
                          backgroundColor: colors.primary,
                          color: colors.primaryText,
                        }}
                      >
                        <ImagePlus size={14} />
                        <span>Upload Logo</span>
                      </button>
                      {appBranding.appLogoUri && (
                        <button
                          onClick={() => dispatch(updateAppBranding({ appLogoUri: '' }))}
                          className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={appBranding.appLogoUri.startsWith('data:') ? '' : appBranding.appLogoUri}
                      onChange={(e) => dispatch(updateAppBranding({ appLogoUri: e.target.value }))}
                      placeholder="Or enter logo image URL..."
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* App Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    App Title
                  </label>
                  <input
                    type="text"
                    value={appBranding.appName}
                    onChange={(e) => dispatch(updateAppBranding({ appName: e.target.value }))}
                    placeholder="e.g. Define Atelier"
                    className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  />
                </div>

                {/* Android Package Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    Android Package Name / iOS Bundle ID
                  </label>
                  <input
                    type="text"
                    value={appBranding.packageName}
                    onChange={(e) => dispatch(updateAppBranding({ packageName: e.target.value }))}
                    placeholder="e.g. com.defineatelier.app"
                    className="w-full px-3 py-2 text-xs font-mono font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EXPORT & BUILD APK */}
          {activeStudioTab === 'export' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* 1-Click APK Generator Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Smartphone size={20} color={colors.primaryText} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                        1-Click Android .APK Builder
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Compiles stand-alone installer APK with real-time progress.
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    {apkBuildState === 'ready' ? 'APK Ready' : apkBuildState === 'building' ? 'Compiling' : 'Ready to Build'}
                  </span>
                </div>

                {apkBuildState === 'idle' && (
                  <button
                    onClick={handleGenerateAndroidApk}
                    className="w-full py-3 rounded-xl text-xs font-bold shadow hover:opacity-95 transition flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.primaryText,
                    }}
                  >
                    <Smartphone size={16} />
                    <span>Generate Standalone Android .APK</span>
                  </button>
                )}

                {apkBuildState === 'building' && (
                  <div className="space-y-2 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                    <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${apkProgressPct}%`,
                          backgroundColor: colors.primary,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
                      <span>{apkStepLabel}</span>
                      <span>{apkProgressPct}%</span>
                    </div>
                  </div>
                )}

                {apkBuildState === 'ready' && apkReadyArtifact && (
                  <div className="space-y-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 size={18} style={{ color: colors.primary }} />
                        <div>
                          <div className="text-xs font-bold text-neutral-900 dark:text-white">
                            {apkReadyArtifact.filename}
                          </div>
                          <div className="text-[11px] text-neutral-500">
                            {apkReadyArtifact.sizeKb} KB · {appBranding.packageName}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleDownloadGeneratedApk}
                        className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm hover:opacity-95"
                        style={{
                          backgroundColor: colors.primary,
                          color: colors.primaryText,
                        }}
                      >
                        <Download size={14} />
                        <span>Download APK</span>
                      </button>
                    </div>

                    {/* QR Code for Mobile */}
                    {apkReadyArtifact.qrCodeDataUrl && (
                      <div className="flex items-center gap-4 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                        <img
                          src={apkReadyArtifact.qrCodeDataUrl}
                          alt="APK QR"
                          className="w-24 h-24 rounded-lg bg-white p-1 shadow-sm"
                        />
                        <div className="space-y-1.5 flex-1">
                          <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                            Direct Phone Download QR
                          </span>
                          <p className="text-[11px] text-neutral-500 leading-tight">
                            Scan with your phone camera to download {apkReadyArtifact.filename} straight to your device.
                          </p>
                          <button
                            onClick={() => {
                              navigator.clipboard?.writeText(apkReadyArtifact.mobileDownloadUrl);
                              setCopiedApkLink(true);
                              setTimeout(() => setCopiedApkLink(false), 2000);
                            }}
                            className="text-xs font-bold underline"
                            style={{ color: colors.primary }}
                          >
                            {copiedApkLink ? 'Copied Download URL!' : 'Copy Download Link'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Full Expo Source Code ZIP Download Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <FolderGit2 size={20} color={colors.primaryText} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      Full Expo Project Source Code (.ZIP)
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Export clean production React Native Expo repository with your selected screen variants.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleDownloadFullExpoZip}
                  disabled={isZipping}
                  className="w-full py-3 rounded-xl text-xs font-bold shadow hover:opacity-95 transition flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.primaryText,
                  }}
                >
                  <Download size={16} />
                  <span>{isZipping ? 'Creating Project ZIP...' : 'Download Full Expo Project .ZIP'}</span>
                </button>
              </div>

              {/* Live Preview QR Code */}
              {livePreviewQrUrl && (
                <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center gap-6">
                  <img
                    src={livePreviewQrUrl}
                    alt="Live QR"
                    className="w-28 h-28 rounded-xl bg-white p-1.5 shadow-sm flex-shrink-0"
                  />
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                      Scan for Instant Live Mobile Preview
                    </h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Scan with your phone's native camera on the same Wi-Fi network to test the app live in your mobile browser without installing anything.
                    </p>
                    <div className="text-[11px] font-mono text-neutral-400">
                      {livePreviewTargetUrl}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
    </>
  );

  return (
    <StudioDashboardShell
      activeProjectId="cloth_shop"
      projectName="Cloth Shop"
      activeScreenLabel={currentScreen}
      activeVariantLabel={currentVariant}
      activeStudioTab={activeStudioTab as any}
      onSelectStudioTab={(tab) => setActiveStudioTab(tab as any)}
      onSwitchProject={onSwitchProject}
      isDark={isDark}
      onToggleTheme={toggleTheme}
      primaryColor={colors.primary}
      primaryTextColor={colors.primaryText}
      isSkeletonActive={isLoadingSkeleton}
      onToggleSkeleton={toggleSkeletonPreview}
      onExportZip={handleDownloadFullExpoZip}
      isZipping={isZipping}
      variantOptions={[
        { id: 'varient_1', label: 'V1 (Default)' },
        { id: 'varient_2', label: 'V2 (Alt 2)' },
        { id: 'varient_3', label: 'V3 (Alt 3)' },
        { id: 'varient_4', label: 'V4 (Alt 4)' },
        { id: 'varient_5', label: 'V5 (Alt 5)' },
        { id: 'varient_6', label: 'V6 (Alt 6)' },
      ]}
      currentVariantId={currentVariant}
      onChangeVariant={(v) => navigateTo(currentScreen, v as ScreenVariant)}
      onReloadSimulator={() => navigateTo(currentScreen, currentVariant)}
      colorSwatches={presets.map((p) => ({ id: p.id, name: p.name, swatch: p.swatch }))}
      activeColorId={colorPreset}
      onSelectColorSwatch={(id) => setColorPreset(id as AppColorPresetId)}
      activeFontName={fontPresets.find((f) => f.id === fontPreset)?.name || 'Plus Jakarta Sans'}
      middleContent={middleContent}
      mobileContent={renderScreen()}
    />
  );
};

export default function ClothShopApp({ onSwitchProject }: { onSwitchProject?: (projectId: string) => void }) {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <ExpoNavigator onSwitchProject={onSwitchProject} />
      </AppThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  dashboardShell: {
    height: '100vh' as any,
    width: '100%',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  leftProjectsSidebar: {
    width: 250,
    height: '100%',
    borderRightWidth: 1,
    flexDirection: 'column',
    zIndex: 20,
  },
  rightPreviewSidebar: {
    width: 440,
    height: '100%',
    borderLeftWidth: 1,
    flexDirection: 'column',
    zIndex: 20,
  },
});
