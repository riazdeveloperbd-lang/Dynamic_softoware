import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  Check,
  Palette,
  Sun,
  Moon,
  Type,
  Layers,
  AppWindow,
  Download,
  CheckCircle2,
  Eye,
  Compass,
  ShoppingCart,
  User,
  Bell,
  Lock,
  Heart,
  MapPin,
  Percent,
  FileText,
  HelpCircle,
  Store,
  Users,
  CheckSquare,
  LayoutGrid,
  FolderTree,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import JSZip from 'jszip';
import { motion } from 'framer-motion';
import { StudioDashboardShell, StudioTab } from '../components/StudioDashboardShell';
import VisualNavigationLinkBuilder, {
  LinkableScreenItem,
  buildDefaultNavigationConnections,
} from '../components/VisualNavigationLinkBuilder';
import { ScreenNavigationConnection } from '../utils/customProjectsStore';
import {
  AppColorPresetId,
  AppFontPresetId,
} from '../cloth_shop_frontend/styles/theme';
import {
  ALL_BOOK_STORE_VARIANT_IDS,
  BOOK_STORE_BOTTOM_NAV_VARIANTS,
  BOOK_STORE_COLOR_PRESETS,
  BOOK_STORE_FONT_PRESETS,
  BookItem,
  AuthorItem,
  BookStoreBottomNavVariantId,
  BookStoreDesignSystemContext,
  BookStoreVariantId,
  CartItemEntry,
  INITIAL_AUTHORS,
  INITIAL_BOOKS,
  INITIAL_COUPONS,
  INITIAL_ORDER_HISTORY,
  INITIAL_VENDORS,
  resolveBookStoreColorPalette,
} from './styles/bookStoreDesignSystem';
import {
  BookStoreBottomNavBar,
  BookStoreRootTabId,
} from './components/BookStoreBottomNavBar';
import {
  BookStoreRouterProvider,
  SCREEN_TO_EXPO_ROUTE,
  useBookStoreRouter,
} from './navigation/expoRouterSystem';
import { downloadBookStoreExpoZip } from './utils/exportBookStoreExpoZip';

// All 24 Book Store Screens
import { OnboardingVarient1 } from './screens/Onboarding/varient_1';
import { SignInVarient1 } from './screens/SignIn/varient_1';
import { SignUpVarient1 } from './screens/SignUp/varient_1';
import { ForgotPasswordVarient1 } from './screens/ForgotPassword/varient_1';
import { HomeVarient1 } from './screens/Home/varient_1';
import { VendorsVarient1 } from './screens/Vendors/varient_1';
import { AuthorsVarient1 } from './screens/Authors/varient_1';
import { AuthorDetailVarient1 } from './screens/AuthorDetail/varient_1';
import { BookDetailVarient1 } from './screens/BookDetail/varient_1';
import { CategoryVarient1 } from './screens/Category/varient_1';
import { SearchVarient1 } from './screens/Search/varient_1';
import { CartVarient1 } from './screens/Cart/varient_1';
import { ConfirmOrderVarient1 } from './screens/ConfirmOrder/varient_1';
import { SetLocationVarient1 } from './screens/SetLocation/varient_1';
import { OrderStatusVarient1 } from './screens/OrderStatus/varient_1';
import { NotificationVarient1 } from './screens/Notification/varient_1';
import { NotificationDetailVarient1 } from './screens/NotificationDetail/varient_1';
import { ProfileVarient1 } from './screens/Profile/varient_1';
import { MyAccountVarient1 } from './screens/MyAccount/varient_1';
import { AddressVarient1 } from './screens/Address/varient_1';
import { FavoritesVarient1 } from './screens/Favorites/varient_1';
import { OrderHistoryVarient1 } from './screens/OrderHistory/varient_1';
import { OffersVarient1 } from './screens/Offers/varient_1';
import { HelpCenterVarient1 } from './screens/HelpCenter/varient_1';

export type BookStoreScreenId =
  | 'Onboarding'
  | 'SignIn'
  | 'SignUp'
  | 'ForgotPassword'
  | 'Home'
  | 'Vendors'
  | 'Authors'
  | 'AuthorDetail'
  | 'BookDetail'
  | 'Category'
  | 'Search'
  | 'Cart'
  | 'ConfirmOrder'
  | 'SetLocation'
  | 'OrderStatus'
  | 'Notification'
  | 'NotificationDetail'
  | 'Profile'
  | 'MyAccount'
  | 'Address'
  | 'Favorites'
  | 'OrderHistory'
  | 'Offers'
  | 'HelpCenter';

export interface BookStoreScreenMeta {
  id: BookStoreScreenId;
  label: string;
  filePath: string;
  flowGroup:
    | 'Onboarding & Auth'
    | 'Discovery & Catalog'
    | 'Cart & Checkout'
    | 'Notifications & Tracking'
    | 'Profile & Settings';
  description: string;
  variants: Record<BookStoreVariantId, string>;
  icon: React.ComponentType<{ className?: string }>;
  hasBottomNav: boolean;
  rootTab?: BookStoreRootTabId;
}

export const BOOK_STORE_SCREENS_REGISTRY: BookStoreScreenMeta[] = [
  {
    id: 'Onboarding',
    label: 'Onboarding & Splash',
    filePath: 'src/book_store_frontend/screens/Onboarding',
    flowGroup: 'Onboarding & Auth',
    description: 'Bazar Splash screen + 3-step illustrated literary onboarding carousel',
    variants: {
      varient_1: 'V1: Bazar Splash & Carousel',
      varient_2: 'V2: Bento Split Story',
      varient_3: 'V3: Brutalist Press Intro',
      varient_4: 'V4: Solid Royal Hero',
      varient_5: 'V5: Atelier Left-Rail',
      varient_6: 'V6: Compact Story Deck',
    },
    icon: Sparkles,
    hasBottomNav: false,
  },
  {
    id: 'SignIn',
    label: 'Sign In',
    filePath: 'src/book_store_frontend/screens/SignIn',
    flowGroup: 'Onboarding & Auth',
    description: 'Welcome Back login with email, password visibility toggle & social auth',
    variants: {
      varient_1: 'V1: Bazar Editorial Login',
      varient_2: 'V2: Bento Split Auth Card',
      varient_3: 'V3: Brutalist Press Auth',
      varient_4: 'V4: Solid Brand Header',
      varient_5: 'V5: Atelier Framed Login',
      varient_6: 'V6: Compact Social Login',
    },
    icon: Lock,
    hasBottomNav: false,
  },
  {
    id: 'SignUp',
    label: 'Sign Up & OTP Flow',
    filePath: 'src/book_store_frontend/screens/SignUp',
    flowGroup: 'Onboarding & Auth',
    description: 'Full 5-step registration: Form + password rules, Email OTP, Phone input, Phone OTP & Success',
    variants: {
      varient_1: 'V1: 5-Step Registration',
      varient_2: 'V2: Bento OTP Keypad',
      varient_3: 'V3: Brutalist Member Signup',
      varient_4: 'V4: Solid Brand Onboarding',
      varient_5: 'V5: Atelier Step Wizard',
      varient_6: 'V6: Compact Fast Signup',
    },
    icon: CheckSquare,
    hasBottomNav: false,
  },
  {
    id: 'ForgotPassword',
    label: 'Forgot Password Flow',
    filePath: 'src/book_store_frontend/screens/ForgotPassword',
    flowGroup: 'Onboarding & Auth',
    description: '6-step recovery: Email/Phone selector, Reset input, OTP verification, New Password & Success',
    variants: {
      varient_1: 'V1: 6-Step Recovery',
      varient_2: 'V2: Bento Channel Picker',
      varient_3: 'V3: Brutalist Security Reset',
      varient_4: 'V4: Solid Brand Recovery',
      varient_5: 'V5: Atelier Left-Rail Reset',
      varient_6: 'V6: Compact Reset Wizard',
    },
    icon: HelpCircle,
    hasBottomNav: false,
  },
  {
    id: 'Home',
    label: 'Home Discovery',
    filePath: 'src/book_store_frontend/screens/Home',
    flowGroup: 'Discovery & Catalog',
    description: 'Special Offer 25% hero, Top of Week carousel, Best Vendors & Authors rails',
    variants: {
      varient_1: 'V1: Bazar Literary Home',
      varient_2: 'V2: Bento 2-Col Book Grid',
      varient_3: 'V3: Brutalist Press Edition',
      varient_4: 'V4: Solid Brand Luxe Hero',
      varient_5: 'V5: Atelier Left-Rail Showcase',
      varient_6: 'V6: Compact Curated Deck',
    },
    icon: BookOpen,
    hasBottomNav: true,
    rootTab: 'Home',
  },
  {
    id: 'Vendors',
    label: 'Vendors Directory',
    filePath: 'src/book_store_frontend/screens/Vendors',
    flowGroup: 'Discovery & Catalog',
    description: 'Our Vendors partner grid with category filter tabs & star ratings',
    variants: {
      varient_1: 'V1: 3-Col Vendors Grid',
      varient_2: 'V2: 2-Col Bento Publishers',
      varient_3: 'V3: Brutalist Publisher Ledger',
      varient_4: 'V4: Horizontal Vendor Rows',
      varient_5: 'V5: Atelier Left-Rail Partners',
      varient_6: 'V6: Compact Dashed Tiles',
    },
    icon: Store,
    hasBottomNav: false,
  },
  {
    id: 'Authors',
    label: 'Authors Directory',
    filePath: 'src/book_store_frontend/screens/Authors',
    flowGroup: 'Discovery & Catalog',
    description: 'Check the Authors list with role filter tabs (Novelist, Poets, Playwrights) & bios',
    variants: {
      varient_1: 'V1: Literary Authors List',
      varient_2: 'V2: 2-Col Bento Portraits',
      varient_3: 'V3: Brutalist Writer Index',
      varient_4: 'V4: Elevated Author Cards',
      varient_5: 'V5: Atelier Left-Rail Bios',
      varient_6: 'V6: Compact Portrait Grid',
    },
    icon: Users,
    hasBottomNav: false,
  },
  {
    id: 'AuthorDetail',
    label: 'Author Inner Page',
    filePath: 'src/book_store_frontend/screens/AuthorDetail',
    flowGroup: 'Discovery & Catalog',
    description: 'Author profile header, 5-star rating, About biography & 2-column Products grid',
    variants: {
      varient_1: 'V1: Centered Bio & Books',
      varient_2: 'V2: Bento Author Spotlight',
      varient_3: 'V3: Brutalist Author Monograph',
      varient_4: 'V4: Elevated Profile Sheet',
      varient_5: 'V5: Atelier Left-Rail Bio',
      varient_6: 'V6: Compact Bibliography',
    },
    icon: User,
    hasBottomNav: false,
  },
  {
    id: 'BookDetail',
    label: 'Product Details Screen',
    filePath: 'src/book_store_frontend/screens/BookDetail',
    flowGroup: 'Discovery & Catalog',
    description: 'Selected book details screen with cover, vendor logo, review stars, quantity stepper & Add to Cart',
    variants: {
      varient_1: 'V1: Bazar Book Detail Sheet',
      varient_2: 'V2: Split Side-by-Side Hero',
      varient_3: 'V3: Brutalist Book Edition',
      varient_4: 'V4: Tinted Stage Showcase',
      varient_5: 'V5: Atelier Left-Rail Detail',
      varient_6: 'V6: Compact Curated Spec',
    },
    icon: Eye,
    hasBottomNav: true,
    rootTab: 'Home',
  },
  {
    id: 'Category',
    label: 'Category Catalog',
    filePath: 'src/book_store_frontend/screens/Category',
    flowGroup: 'Discovery & Catalog',
    description: 'Book catalog with genre filter tabs (All, Novels, Self Love, Science, Romantic) & instant product details',
    variants: {
      varient_1: 'V1: Classic 2-Col Catalog',
      varient_2: 'V2: Bento Framed Cards',
      varient_3: 'V3: Brutalist Hardcover Grid',
      varient_4: 'V4: Horizontal Editorial List',
      varient_5: 'V5: Atelier Magazine Rows',
      varient_6: 'V6: Compact Rating Grid',
    },
    icon: Compass,
    hasBottomNav: true,
    rootTab: 'Category',
  },
  {
    id: 'Search',
    label: 'Search Books',
    filePath: 'src/book_store_frontend/screens/Search',
    flowGroup: 'Discovery & Catalog',
    description: 'Live book title/author search bar with Recent Searches history & instant product details',
    variants: {
      varient_1: 'V1: Recent & Live Filter',
      varient_2: 'V2: Bento Search Results',
      varient_3: 'V3: Brutalist Index Search',
      varient_4: 'V4: Elevated Search Cards',
      varient_5: 'V5: Atelier Left-Rail Search',
      varient_6: 'V6: Compact Quick Finder',
    },
    icon: Search,
    hasBottomNav: false,
  },
  {
    id: 'Cart',
    label: 'My Cart',
    filePath: 'src/book_store_frontend/screens/Cart',
    flowGroup: 'Cart & Checkout',
    description: 'Shopping cart with quantity controls, subtotal/shipping summary & Empty Cart state',
    variants: {
      varient_1: 'V1: Bazar Cart & Empty State',
      varient_2: 'V2: Bento Tinted Bag Cards',
      varient_3: 'V3: Brutalist Order Ledger',
      varient_4: 'V4: Elevated Bag Summary',
      varient_5: 'V5: Atelier Left-Rail Bag',
      varient_6: 'V6: Compact Checkout Bag',
    },
    icon: ShoppingCart,
    hasBottomNav: true,
    rootTab: 'Cart',
  },
  {
    id: 'ConfirmOrder',
    label: 'Confirm Order & Sheets',
    filePath: 'src/book_store_frontend/screens/ConfirmOrder',
    flowGroup: 'Cart & Checkout',
    description: 'Checkout screen with Address card, Payment Details modal, Delivery Date/Time & KNET/Visa sheet',
    variants: {
      varient_1: 'V1: Checkout + 3 Bottom Sheets',
      varient_2: 'V2: Bento Checkout Blocks',
      varient_3: 'V3: Brutalist Invoice Checkout',
      varient_4: 'V4: Elevated Checkout Suite',
      varient_5: 'V5: Atelier Left-Rail Order',
      varient_6: 'V6: Compact Express Checkout',
    },
    icon: CheckCircle2,
    hasBottomNav: false,
  },
  {
    id: 'SetLocation',
    label: 'Set Location & Address',
    filePath: 'src/book_store_frontend/screens/SetLocation',
    flowGroup: 'Cart & Checkout',
    description: 'Interactive Dumbo NYC map pin + Save Address As tags + 8-field address form',
    variants: {
      varient_1: 'V1: Map Pin & Full Form',
      varient_2: 'V2: Bento Map & Tags',
      varient_3: 'V3: Brutalist Geo Locator',
      varient_4: 'V4: Elevated Map Card',
      varient_5: 'V5: Atelier Address Rail',
      varient_6: 'V6: Compact Pin Selector',
    },
    icon: MapPin,
    hasBottomNav: false,
  },
  {
    id: 'OrderStatus',
    label: 'Order Status & Rating',
    filePath: 'src/book_store_frontend/screens/OrderStatus',
    flowGroup: 'Notifications & Tracking',
    description: 'Order #2930541 Waiting Shipper box, Live Shipment summary & Order Received 5-star feedback',
    variants: {
      varient_1: 'V1: Waiting, Tracking & Rate',
      varient_2: 'V2: Bento Delivery Tracker',
      varient_3: 'V3: Brutalist Dispatch Slip',
      varient_4: 'V4: Elevated Status Card',
      varient_5: 'V5: Atelier Left-Rail Status',
      varient_6: 'V6: Compact Courier Receipt',
    },
    icon: Sparkles,
    hasBottomNav: false,
  },
  {
    id: 'Notification',
    label: 'Notifications Center',
    filePath: 'src/book_store_frontend/screens/Notification',
    flowGroup: 'Notifications & Tracking',
    description: 'Delivery vs News & Promo tabs with Current/October order updates & Empty Notification state',
    variants: {
      varient_1: 'V1: Delivery, Promo & Empty',
      varient_2: 'V2: Bento Activity Feed',
      varient_3: 'V3: Brutalist Dispatch Log',
      varient_4: 'V4: Elevated Alert Cards',
      varient_5: 'V5: Atelier Left-Rail Feed',
      varient_6: 'V6: Compact Alert Inbox',
    },
    icon: Bell,
    hasBottomNav: false,
  },
  {
    id: 'NotificationDetail',
    label: 'Promo Detail Article',
    filePath: 'src/book_store_frontend/screens/NotificationDetail',
    flowGroup: 'Notifications & Tracking',
    description: '50% Discount promotion banner and full editorial article view',
    variants: {
      varient_1: 'V1: 50% Discount Article',
      varient_2: 'V2: Bento Promo Story',
      varient_3: 'V3: Brutalist Press Release',
      varient_4: 'V4: Elevated Promo Feature',
      varient_5: 'V5: Atelier Editorial Note',
      varient_6: 'V6: Compact Promo Bulletin',
    },
    icon: Percent,
    hasBottomNav: false,
  },
  {
    id: 'Profile',
    label: 'User Profile & Logout',
    filePath: 'src/book_store_frontend/screens/Profile',
    flowGroup: 'Profile & Settings',
    description: 'John Doe profile header, 6 account navigation rows & Logout confirmation bottom sheet',
    variants: {
      varient_1: 'V1: Profile List & Logout Sheet',
      varient_2: 'V2: 2-Col Bento Profile Hub',
      varient_3: 'V3: Brutalist Member Dossier',
      varient_4: 'V4: Elevated Account Cards',
      varient_5: 'V5: Atelier Left-Rail Menu',
      varient_6: 'V6: Compact 2-Col Settings',
    },
    icon: User,
    hasBottomNav: true,
    rootTab: 'Profile',
  },
  {
    id: 'MyAccount',
    label: 'My Account Editor',
    filePath: 'src/book_store_frontend/screens/MyAccount',
    flowGroup: 'Profile & Settings',
    description: 'Avatar Change Picture header + Name, Email, Phone Number & Password editor',
    variants: {
      varient_1: 'V1: Personal Account Form',
      varient_2: 'V2: Bento Profile Editor',
      varient_3: 'V3: Brutalist Identity Form',
      varient_4: 'V4: Elevated Account Sheet',
      varient_5: 'V5: Atelier Left-Rail Inputs',
      varient_6: 'V6: Compact Member Settings',
    },
    icon: User,
    hasBottomNav: false,
  },
  {
    id: 'Address',
    label: 'Saved Address',
    filePath: 'src/book_store_frontend/screens/Address',
    flowGroup: 'Profile & Settings',
    description: 'Manage saved delivery address on map and detailed street/building fields',
    variants: {
      varient_1: 'V1: Saved Location Manager',
      varient_2: 'V2: Bento Address Book',
      varient_3: 'V3: Brutalist Street Registry',
      varient_4: 'V4: Elevated Map Editor',
      varient_5: 'V5: Atelier Location Rail',
      varient_6: 'V6: Compact Address Card',
    },
    icon: MapPin,
    hasBottomNav: false,
  },
  {
    id: 'Favorites',
    label: 'Your Favorites',
    filePath: 'src/book_store_frontend/screens/Favorites',
    flowGroup: 'Profile & Settings',
    description: 'Saved favorite books list with cover thumbnail, price & interactive heart toggle',
    variants: {
      varient_1: 'V1: Wishlist Book List',
      varient_2: 'V2: Bento Wishlist Cards',
      varient_3: 'V3: Brutalist Saved Archive',
      varient_4: 'V4: Elevated Favorite Rows',
      varient_5: 'V5: Atelier Left-Rail Saved',
      varient_6: 'V6: Compact Dashed Wishlist',
    },
    icon: Heart,
    hasBottomNav: false,
  },
  {
    id: 'OrderHistory',
    label: 'Order History',
    filePath: 'src/book_store_frontend/screens/OrderHistory',
    flowGroup: 'Profile & Settings',
    description: 'October 2021 order history list with Delivered, On the way & Cancelled badges',
    variants: {
      varient_1: 'V1: Chronological Order Ledger',
      varient_2: 'V2: Bento Past Orders',
      varient_3: 'V3: Brutalist Archive Log',
      varient_4: 'V4: Elevated Receipt Cards',
      varient_5: 'V5: Atelier Left-Rail History',
      varient_6: 'V6: Compact Order Timeline',
    },
    icon: FileText,
    hasBottomNav: false,
  },
  {
    id: 'Offers',
    label: 'Offers & Coupons',
    filePath: 'src/book_store_frontend/screens/Offers',
    flowGroup: 'Profile & Settings',
    description: 'You Have 6 Coupons to use 2-column perforated discount tickets with one-tap Copy',
    variants: {
      varient_1: 'V1: 6 Perforated Tickets',
      varient_2: 'V2: Bento Voucher Grid',
      varient_3: 'V3: Brutalist Promo Stamps',
      varient_4: 'V4: Elevated Coupon Deck',
      varient_5: 'V5: Atelier Voucher Rail',
      varient_6: 'V6: Compact Promo Codes',
    },
    icon: Percent,
    hasBottomNav: false,
  },
  {
    id: 'HelpCenter',
    label: 'Help Center',
    filePath: 'src/book_store_frontend/screens/HelpCenter',
    flowGroup: 'Profile & Settings',
    description: 'Solid primary Help Center header with Email and Phone Number support cards',
    variants: {
      varient_1: 'V1: Chapter Support Concierge',
      varient_2: 'V2: Bento Help Desk',
      varient_3: 'V3: Brutalist Support Hotline',
      varient_4: 'V4: Elevated Concierge Cards',
      varient_5: 'V5: Atelier Support Rail',
      varient_6: 'V6: Compact Contact Tiles',
    },
    icon: HelpCircle,
    hasBottomNav: false,
  },
];

export interface BookStoreAppProps {
  onSwitchProject?: (projectId: string) => void;
}

export const BookStoreApp: React.FC<BookStoreAppProps> = ({ onSwitchProject }) => {
  // Studio state
  const [activeStudioTab, setActiveStudioTab] = useState<StudioTab>('screens');
  const [screensViewMode, setScreensViewMode] = useState<'grid' | 'hierarchy'>('grid');
  const [activeScreen, setActiveScreen] = useState<BookStoreScreenId>('Home');
  const [navigationStack, setNavigationStack] = useState<BookStoreScreenId[]>(['Home']);
  const previousScreen: BookStoreScreenId =
    navigationStack.length > 1
      ? navigationStack[navigationStack.length - 2]
      : 'Home';
  const [screenSearch, setScreenSearch] = useState('');
  const [selectedFlowFilter, setSelectedFlowFilter] = useState<string>('ALL');
  const [simulatorKey, setSimulatorKey] = useState(0);

  // Per-screen 6-variant selection state (varient_1 .. varient_6)
  const [selectedVariants, setSelectedVariants] = useState<
    Record<BookStoreScreenId, BookStoreVariantId>
  >(() => {
    const initial = {} as Record<BookStoreScreenId, BookStoreVariantId>;
    BOOK_STORE_SCREENS_REGISTRY.forEach((s) => {
      initial[s.id] = 'varient_1';
    });
    return initial;
  });

  // Design System state
  const [isDark, setIsDark] = useState<boolean>(false);
  const [colorPresetId, setColorPresetId] = useState<AppColorPresetId>('royal_violet');
  const [fontPresetId, setFontPresetId] = useState<AppFontPresetId>('jakarta');
  const [bottomNavVariant, setBottomNavVariant] =
    useState<BookStoreBottomNavVariantId>('varient_1');
  const [isBottomNavSwipeable, setIsBottomNavSwipeable] = useState<boolean>(true);
  const [swipeDirection, setSwipeDirection] = useState<number>(0);
  const swipeTouchStartRef = React.useRef<{ x: number; y: number } | null>(null);

  // App Branding state
  const [appName, setAppName] = useState('Bazar Book Store');
  const [packageName, setPackageName] = useState('com.bazar.bookstore');
  const [versionName, setVersionName] = useState('1.0.0');
  const [isZipping, setIsZipping] = useState(false);

  // Interactive Book Store Domain State
  const [books] = useState<BookItem[]>(INITIAL_BOOKS);
  const [vendors] = useState(INITIAL_VENDORS);
  const [authors] = useState<AuthorItem[]>(INITIAL_AUTHORS);
  const [selectedBook, setSelectedBook] = useState<BookItem>(INITIAL_BOOKS[0]);
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorItem>(INITIAL_AUTHORS[1]);
  const [favoriteBookIds, setFavoriteBookIds] = useState<string[]>([
    'carrie_fisher',
    'the_waiting',
    'bright_young',
    'kite_runner',
  ]);
  const [cartItems, setCartItems] = useState<CartItemEntry[]>([
    { book: INITIAL_BOOKS[4], quantity: 1 },
    { book: INITIAL_BOOKS[3], quantity: 1 },
    { book: INITIAL_BOOKS[5], quantity: 1 },
  ]);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'Johndoe@email.com',
    phone: '(+1) 234 567 890',
    password: 'password123',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  });
  const [deliveryAddress, setDeliveryAddress] = useState({
    streetTitle: 'Utama Street No.20',
    fullAddress: 'Dumbo Street No.20, Dumbo, New York 10001, United States',
    tag: 'Home' as 'Home' | 'Offices',
    governorate: 'New York',
    city: 'Brooklyn',
    block: 'Block 4',
    building: 'Utama Street',
    floor: '3rd Floor',
    flat: 'Flat 3B',
    avenue: 'Dumbo Street No.20',
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    'KNET' | 'Credit Card'
  >('KNET');
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState('Today 12 Jan');
  const [selectedDeliveryTime, setSelectedDeliveryTime] =
    useState('Between 10PM : 11PM');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'The Good Sister',
    'Carries Fisher',
  ]);

  const palette = useMemo(
    () => resolveBookStoreColorPalette(colorPresetId, isDark),
    [colorPresetId, isDark]
  );

  const activeFont = useMemo(
    () =>
      BOOK_STORE_FONT_PRESETS.find((f) => f.id === fontPresetId) ||
      BOOK_STORE_FONT_PRESETS[0],
    [fontPresetId]
  );

  const activeScreenVariant: BookStoreVariantId =
    selectedVariants[activeScreen] || 'varient_1';

  const handleVariantChange = (
    screenId: BookStoreScreenId,
    variantId: BookStoreVariantId
  ) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [screenId]: variantId,
    }));
  };

  const applyVariantToAllScreens = (variantId: BookStoreVariantId) => {
    const next = {} as Record<BookStoreScreenId, BookStoreVariantId>;
    BOOK_STORE_SCREENS_REGISTRY.forEach((s) => {
      next[s.id] = variantId;
    });
    setSelectedVariants(next);
  };

  const navigateToScreen = (
    targetScreen: BookStoreScreenId,
    replace = false
  ) => {
    setNavigationStack((prev) => {
      if (replace) {
        return [...prev.slice(0, Math.max(0, prev.length - 1)), targetScreen];
      }
      if (prev[prev.length - 1] === targetScreen) return prev;
      return [...prev, targetScreen];
    });
    setActiveScreen(targetScreen);
  };

  const navigateBack = (fallbackScreen: BookStoreScreenId = 'Home') => {
    setNavigationStack((prev) => {
      if (prev.length > 1) {
        const nextStack = prev.slice(0, prev.length - 1);
        const prevScreen = nextStack[nextStack.length - 1];
        setActiveScreen(prevScreen);
        return nextStack;
      }
      setActiveScreen(fallbackScreen);
      return [fallbackScreen];
    });
  };

  const openBookProductDetail = (book: BookItem, _fromScreen: BookStoreScreenId) => {
    setSelectedBook(book);
    navigateToScreen('BookDetail');
  };

  const toggleFavoriteBook = (bookId: string) => {
    setFavoriteBookIds((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const addToCart = (book: BookItem, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.book.id === book.id);
      if (existing) {
        return prev.map((i) =>
          i.book.id === book.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { book, quantity: qty }];
    });
  };

  const updateCartQty = (bookId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.book.id === bookId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);
  const restoreDemoCart = () =>
    setCartItems([
      { book: INITIAL_BOOKS[4], quantity: 1 },
      { book: INITIAL_BOOKS[3], quantity: 1 },
      { book: INITIAL_BOOKS[5], quantity: 1 },
    ]);

  const addRecentSearch = (q: string) => {
    const clean = q.trim();
    if (!clean) return;
    setRecentSearches((prev) => [clean, ...prev.filter((item) => item !== clean)].slice(0, 6));
  };

  const currentScreenMeta = useMemo(
    () =>
      BOOK_STORE_SCREENS_REGISTRY.find((s) => s.id === activeScreen) ||
      BOOK_STORE_SCREENS_REGISTRY[4],
    [activeScreen]
  );

  const totalCartBadgeCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const ROOT_TAB_ORDER: BookStoreRootTabId[] = [
    'Home',
    'Category',
    'Cart',
    'Profile',
  ];

  const handleRootTabSelect = (tab: BookStoreRootTabId) => {
    const currentIdx = ROOT_TAB_ORDER.indexOf(
      (currentScreenMeta.rootTab || 'Home') as BookStoreRootTabId
    );
    const nextIdx = ROOT_TAB_ORDER.indexOf(tab);
    setSwipeDirection(nextIdx >= currentIdx ? 1 : -1);
    if (tab === 'Home') navigateToScreen('Home');
    if (tab === 'Category') navigateToScreen('Category');
    if (tab === 'Cart') navigateToScreen('Cart');
    if (tab === 'Profile') navigateToScreen('Profile');
  };

  const handleSwipeBottomTab = (dir: 'prev' | 'next') => {
    if (!isBottomNavSwipeable || !currentScreenMeta.hasBottomNav) return;
    const currentTab = (currentScreenMeta.rootTab || 'Home') as BookStoreRootTabId;
    const idx = ROOT_TAB_ORDER.indexOf(currentTab);
    if (idx === -1) return;
    if (dir === 'next' && idx < ROOT_TAB_ORDER.length - 1) {
      setSwipeDirection(1);
      handleRootTabSelect(ROOT_TAB_ORDER[idx + 1]);
    } else if (dir === 'prev' && idx > 0) {
      setSwipeDirection(-1);
      handleRootTabSelect(ROOT_TAB_ORDER[idx - 1]);
    }
  };

  const linkableScreens: LinkableScreenItem[] = useMemo(
    () =>
      BOOK_STORE_SCREENS_REGISTRY.map((scr) => ({
        id: scr.id,
        label: scr.label,
        moduleGroup: scr.flowGroup,
        roleBadge: '6 VARIANTS',
        filePath: `${scr.filePath}/${selectedVariants[scr.id]}/index.tsx`,
        activeVariant: selectedVariants[scr.id],
        variants: ALL_BOOK_STORE_VARIANT_IDS.map((vid, idx) => ({
          id: vid,
          label: scr.variants[vid],
          shortLabel: `V${idx + 1}`,
        })),
      })),
    [selectedVariants]
  );

  const [navConnections, setNavConnections] = useState<
    ScreenNavigationConnection[]
  >(() => buildDefaultNavigationConnections(linkableScreens, false));

  const handleExportBookStoreZip = async () => {
    if (isZipping) return;
    setIsZipping(true);
    try {
      await downloadBookStoreExpoZip({
        appName,
        packageName,
        versionName,
        colorPresetId,
        isDark,
        fontPresetId,
        bottomNavVariant,
        isBottomNavSwipeable,
        selectedVariants,
      });
    } finally {
      setIsZipping(false);
    }
  };

  const flowGroups = [
    'ALL',
    'Onboarding & Auth',
    'Discovery & Catalog',
    'Cart & Checkout',
    'Notifications & Tracking',
    'Profile & Settings',
  ];

  const groupedDirectories = useMemo(() => {
    return flowGroups
      .filter((g) => g !== 'ALL')
      .map((groupName) => {
        const items = BOOK_STORE_SCREENS_REGISTRY.filter((scr) => {
          const matchesGroup =
            selectedFlowFilter === 'ALL'
              ? scr.flowGroup === groupName
              : scr.flowGroup === selectedFlowFilter && scr.flowGroup === groupName;
          const matchesSearch =
            !screenSearch.trim() ||
            scr.label.toLowerCase().includes(screenSearch.toLowerCase()) ||
            scr.description.toLowerCase().includes(screenSearch.toLowerCase()) ||
            Object.values(scr.variants).some((v) =>
              v.toLowerCase().includes(screenSearch.toLowerCase())
            );
          return matchesGroup && matchesSearch;
        });
        return {
          group: groupName,
          items,
        };
      })
      .filter((g) => g.items.length > 0);
  }, [selectedFlowFilter, screenSearch]);

  // Render active mobile screen inside simulator with full Expo Router history stack
  const renderActiveBookStoreScreen = () => {
    switch (activeScreen) {
      case 'Onboarding':
        return (
          <OnboardingVarient1
            variant={activeScreenVariant}
            onGetStarted={() => navigateToScreen('SignUp')}
            onSignIn={() => navigateToScreen('SignIn')}
            onOpenSignIn={() => navigateToScreen('SignIn')}
          />
        );
      case 'SignIn':
        return (
          <SignInVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('Onboarding')}
            onSignInSuccess={() => navigateToScreen('Home', true)}
            onLoginSuccess={() => navigateToScreen('Home', true)}
            onGoToSignUp={() => navigateToScreen('SignUp')}
            onOpenSignUp={() => navigateToScreen('SignUp')}
            onGoToForgotPassword={() => navigateToScreen('ForgotPassword')}
            onOpenForgotPassword={() => navigateToScreen('ForgotPassword')}
          />
        );
      case 'SignUp':
        return (
          <SignUpVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('SignIn')}
            onGoToSignIn={() => navigateToScreen('SignIn')}
            onOpenSignIn={() => navigateToScreen('SignIn')}
            onCompleteSignUp={() => navigateToScreen('Home', true)}
          />
        );
      case 'ForgotPassword':
        return (
          <ForgotPasswordVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('SignIn')}
            onLoginSuccess={() => navigateToScreen('SignIn', true)}
            onOpenSignIn={() => navigateToScreen('SignIn', true)}
          />
        );
      case 'Home':
        return (
          <HomeVarient1
            variant={activeScreenVariant}
            onOpenSearch={() => navigateToScreen('Search')}
            onOpenNotifications={() => navigateToScreen('Notification')}
            onSelectBook={(book) => openBookProductDetail(book, 'Home')}
            onOpenBookDetail={(book) => openBookProductDetail(book, 'Home')}
            onOpenCategory={() => navigateToScreen('Category')}
            onSeeAllVendors={() => navigateToScreen('Vendors')}
            onOpenVendors={() => navigateToScreen('Vendors')}
            onSeeAllAuthors={() => navigateToScreen('Authors')}
            onOpenAuthors={() => navigateToScreen('Authors')}
            onSelectAuthor={(author) => {
              setSelectedAuthor(author);
              navigateToScreen('AuthorDetail');
            }}
            onOpenAuthorDetail={(author) => {
              setSelectedAuthor(author);
              navigateToScreen('AuthorDetail');
            }}
          />
        );
      case 'Vendors':
        return (
          <VendorsVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('Home')}
            onOpenSearch={() => navigateToScreen('Search')}
          />
        );
      case 'Authors':
        return (
          <AuthorsVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('Home')}
            onOpenSearch={() => navigateToScreen('Search')}
            onSelectAuthor={(author) => {
              setSelectedAuthor(author);
              navigateToScreen('AuthorDetail');
            }}
          />
        );
      case 'AuthorDetail':
        return (
          <AuthorDetailVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('Authors')}
            onSelectBook={(book) => openBookProductDetail(book, 'AuthorDetail')}
            onOpenBookDetail={(book) => openBookProductDetail(book, 'AuthorDetail')}
          />
        );
      case 'BookDetail':
        return (
          <BookDetailVarient1
            variant={activeScreenVariant}
            onClose={() => navigateBack('Home')}
            onContinueShopping={() => navigateBack('Home')}
            onGoToCart={() => navigateToScreen('Cart')}
            onViewCart={() => navigateToScreen('Cart')}
          />
        );
      case 'Category':
        return (
          <CategoryVarient1
            variant={activeScreenVariant}
            onOpenSearch={() => navigateToScreen('Search')}
            onOpenNotifications={() => navigateToScreen('Notification')}
            onSelectBook={(book) => openBookProductDetail(book, 'Category')}
            onOpenBookDetail={(book) => openBookProductDetail(book, 'Category')}
          />
        );
      case 'Search':
        return (
          <SearchVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('Home')}
            onSelectBook={(book) => openBookProductDetail(book, 'Search')}
            onOpenBookDetail={(book) => openBookProductDetail(book, 'Search')}
          />
        );
      case 'Cart':
        return (
          <CartVarient1
            variant={activeScreenVariant}
            onGoToConfirmOrder={() => navigateToScreen('ConfirmOrder')}
            onGoToNotifications={() => navigateToScreen('Notification')}
            onGoToCategory={() => navigateToScreen('Category')}
          />
        );
      case 'ConfirmOrder':
        return (
          <ConfirmOrderVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('Cart')}
            onGoToSetLocation={() => navigateToScreen('SetLocation')}
            onOrderPlaced={() => navigateToScreen('OrderStatus')}
            onGoToNotifications={() => navigateToScreen('Notification')}
          />
        );
      case 'SetLocation':
        return (
          <SetLocationVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('ConfirmOrder')}
            onGoToNotifications={() => navigateToScreen('Notification')}
          />
        );
      case 'OrderStatus':
        return (
          <OrderStatusVarient1
            variant={activeScreenVariant}
            onBackToHome={() => {
              setNavigationStack(['Home']);
              setActiveScreen('Home');
            }}
            onGoToOrderHistory={() => navigateToScreen('OrderHistory')}
          />
        );
      case 'Notification':
        return (
          <NotificationVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('Home')}
            onOpenPromoDetail={() => navigateToScreen('NotificationDetail')}
          />
        );
      case 'NotificationDetail':
        return (
          <NotificationDetailVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('Notification')}
          />
        );
      case 'Profile':
        return (
          <ProfileVarient1
            variant={activeScreenVariant}
            onGoToMyAccount={() => navigateToScreen('MyAccount')}
            onGoToAddress={() => navigateToScreen('Address')}
            onGoToOffers={() => navigateToScreen('Offers')}
            onGoToFavorites={() => navigateToScreen('Favorites')}
            onGoToOrderHistory={() => navigateToScreen('OrderHistory')}
            onGoToHelpCenter={() => navigateToScreen('HelpCenter')}
            onLogout={() => navigateToScreen('SignIn', true)}
          />
        );
      case 'MyAccount':
        return (
          <MyAccountVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('Profile')}
          />
        );
      case 'Address':
        return (
          <AddressVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('Profile')}
            onGoToNotifications={() => navigateToScreen('Notification')}
          />
        );
      case 'Favorites':
        return (
          <FavoritesVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('Profile')}
            onSelectBook={(book) => openBookProductDetail(book, 'Favorites')}
          />
        );
      case 'OrderHistory':
        return (
          <OrderHistoryVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('Profile')}
          />
        );
      case 'Offers':
        return (
          <OffersVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('Profile')}
          />
        );
      case 'HelpCenter':
        return (
          <HelpCenterVarient1
            variant={activeScreenVariant}
            onBack={() => navigateBack('Profile')}
          />
        );
      default:
        return null;
    }
  };

  // Middle Studio Content (1:1 Cloth Shop Pattern with 6 Variants per screen)
  const renderMiddleWorkspace = () => {
    if (activeStudioTab === 'screens') {
      return (
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Top Switcher (Grid Directory vs Screen Hierarchy) + Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <button
                type="button"
                onClick={() => setScreensViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  screensViewMode === 'grid'
                    ? 'shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
                style={
                  screensViewMode === 'grid'
                    ? {
                        backgroundColor: palette.primary,
                        color: palette.primaryText,
                      }
                    : undefined
                }
              >
                <LayoutGrid size={13} />
                <span>Grid Directory ({BOOK_STORE_SCREENS_REGISTRY.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setScreensViewMode('hierarchy')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  screensViewMode === 'hierarchy'
                    ? 'shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
                style={
                  screensViewMode === 'hierarchy'
                    ? {
                        backgroundColor: palette.primary,
                        color: palette.primaryText,
                      }
                    : undefined
                }
              >
                <FolderTree size={13} />
                <span>Screen Hierarchy</span>
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="text"
                value={screenSearch}
                onChange={(e) => setScreenSearch(e.target.value)}
                placeholder="Filter 24 screens or 144 variants..."
                className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-900 dark:text-white focus:outline-none"
                style={{
                  borderColor: screenSearch ? palette.primary : undefined,
                }}
              />
              {screenSearch && (
                <button
                  type="button"
                  onClick={() => setScreenSearch('')}
                  className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-600"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {screensViewMode === 'hierarchy' ? (
            <VisualNavigationLinkBuilder
              projectName={appName}
              screens={linkableScreens}
              currentScreenId={activeScreen}
              primaryColor={palette.primary}
              isSingleVariantMode={false}
              connections={navConnections}
              onConnectionsChange={setNavConnections}
              onSelectScreenVariant={(screenId, variantId) => {
                navigateToScreen(screenId as BookStoreScreenId);
                if (
                  ALL_BOOK_STORE_VARIANT_IDS.includes(
                    variantId as BookStoreVariantId
                  )
                ) {
                  handleVariantChange(
                    screenId as BookStoreScreenId,
                    variantId as BookStoreVariantId
                  );
                }
              }}
            />
          ) : (
            <div className="space-y-6">
              {/* Flow Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {flowGroups.map((group) => {
                  const active = selectedFlowFilter === group;
                  return (
                    <button
                      key={group}
                      onClick={() => setSelectedFlowFilter(group)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                        active
                          ? 'shadow-sm'
                          : 'bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                      style={
                        active
                          ? {
                              backgroundColor: palette.primary,
                              color: palette.primaryText,
                            }
                          : undefined
                      }
                    >
                      {group === 'ALL'
                        ? `All Screens (${BOOK_STORE_SCREENS_REGISTRY.length})`
                        : group}
                    </button>
                  );
                })}
              </div>

              {/* Batch Set All Screens for Export (All V1 - All V6) */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={15} className="text-neutral-500" />
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    Batch Set All Screens for Export (6 Variants):
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
                      type="button"
                      onClick={() => applyVariantToAllScreens(vid)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Screen Cards Grid Grouped by Flow Category (6 Variants per Screen) */}
              <div className="space-y-6">
                {groupedDirectories.map((group) => (
                  <div key={group.group} className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      {group.group} ({group.items.length})
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {group.items.map((scr) => {
                        const isCurrentActive = activeScreen === scr.id;
                        const selectedExportVariant =
                          selectedVariants[scr.id] || 'varient_1';

                        return (
                          <div
                            key={scr.id}
                            className={`rounded-xl border p-4 bg-white dark:bg-neutral-900 transition-all ${
                              isCurrentActive
                                ? 'shadow-md ring-2 ring-black/5 dark:ring-white/5'
                                : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm'
                            }`}
                            style={
                              isCurrentActive
                                ? {
                                    borderColor: palette.primary,
                                  }
                                : undefined
                            }
                          >
                            <div className="flex items-start justify-between gap-2 mb-2.5">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                                    {scr.label}
                                  </h4>
                                  {isCurrentActive && (
                                    <span
                                      className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                                      style={{
                                        backgroundColor: palette.primary,
                                        color: palette.primaryText,
                                      }}
                                    >
                                      Active on Phone
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] font-mono text-neutral-400">
                                  {scr.filePath}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => navigateToScreen(scr.id)}
                                className="px-2.5 py-1 rounded-lg text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center gap-1 transition cursor-pointer"
                              >
                                <Eye size={12} />
                                <span>Preview</span>
                              </button>
                            </div>

                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 line-clamp-2">
                              {scr.description}
                            </p>

                            {/* 6 Variant Selector Buttons in 2-Column Grid */}
                            <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                              {ALL_BOOK_STORE_VARIANT_IDS.map((vKey) => {
                                const isVariantSelected =
                                  isCurrentActive && activeScreenVariant === vKey;
                                const isZipSelected =
                                  selectedExportVariant === vKey;

                                return (
                                  <button
                                    key={vKey}
                                    type="button"
                                    onClick={() => {
                                      handleVariantChange(scr.id, vKey);
                                      navigateToScreen(scr.id);
                                    }}
                                    className={`px-2.5 py-2 rounded-lg text-left text-xs font-semibold flex items-center justify-between gap-1 transition cursor-pointer ${
                                      isVariantSelected
                                        ? 'shadow-sm'
                                        : isZipSelected
                                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border'
                                        : 'bg-neutral-50/60 dark:bg-neutral-950/40 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                    }`}
                                    style={
                                      isVariantSelected
                                        ? {
                                            backgroundColor: palette.primary,
                                            color: palette.primaryText,
                                          }
                                        : isZipSelected
                                        ? {
                                            borderColor: palette.primary,
                                          }
                                        : undefined
                                    }
                                  >
                                    <span className="truncate">
                                      {scr.variants[vKey]}
                                    </span>
                                    {isVariantSelected && (
                                      <Check size={12} className="flex-shrink-0" />
                                    )}
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
      );
    }

    if (activeStudioTab === 'theme') {
      return (
        <div className="max-w-5xl mx-auto space-y-6 text-neutral-900 dark:text-neutral-100">
          <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <h1 className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Book Store Design System & Theme Studio
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Customize brand color palettes, Light/Dark mode, literary typography, and 10 bottom navigation bar variants.
            </p>
          </div>

          {/* 1. Theme Appearance Mode (Light / Dark) */}
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161c] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isDark ? (
                  <Moon className="w-4 h-4 text-indigo-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
                <h2 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                  Appearance Mode
                </h2>
              </div>
              <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
                {isDark ? 'Dark Editorial Mode' : 'Light Paper Mode'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsDark(false)}
                className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  !isDark
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 shadow-xs'
                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                Light Mode (Bazar Default)
              </button>
              <button
                onClick={() => setIsDark(true)}
                className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  isDark
                    ? 'border-indigo-500 bg-indigo-950/60 text-white shadow-xs'
                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Moon className="w-4 h-4 text-indigo-400" />
                Dark Night Reading Mode
              </button>
            </div>
          </div>

          {/* 2. Color Presets (Literary Palettes) */}
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161c] space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" style={{ color: palette.primary }} />
              <h2 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                Color Theme Presets ({BOOK_STORE_COLOR_PRESETS.length} Palettes)
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BOOK_STORE_COLOR_PRESETS.map((preset) => {
                const selected = colorPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setColorPresetId(preset.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                      selected
                        ? 'ring-2 border-transparent bg-neutral-50 dark:bg-neutral-900'
                        : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                    style={
                      selected ? { boxShadow: `0 0 0 2px ${preset.swatch}` } : undefined
                    }
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-sm"
                      style={{ backgroundColor: preset.swatch }}
                    >
                      {selected && <Check className="w-3.5 h-3.5" />}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate text-neutral-900 dark:text-neutral-100">
                        {preset.name}
                      </div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase">
                        {preset.swatch}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Font Family Presets */}
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161c] space-y-3">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4" style={{ color: palette.primary }} />
              <h2 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                Typography & Editorial Font Pairings
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {BOOK_STORE_FONT_PRESETS.map((font) => {
                const selected = fontPresetId === font.id;
                return (
                  <button
                    key={font.id}
                    onClick={() => setFontPresetId(font.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selected
                        ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/40'
                        : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                    style={{ fontFamily: font.fontFamily }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                        {font.name}
                      </span>
                      {selected && (
                        <Check className="w-4 h-4" style={{ color: palette.primary }} />
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                      The quick brown fox jumps over the lazy dog
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Bottom Navigation Bar Switcher (10 Variants) */}
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161c] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4" style={{ color: palette.primary }} />
                <h2 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                  Bottom Navigation Bar Styles (10 Variants)
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* Radio Buttons: Bottom Navigate Screen Swappable or Not */}
                <div
                  role="radiogroup"
                  aria-label="Bottom Navigate Screen Swappable"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/70"
                >
                  <span className="text-[11px] font-bold text-neutral-600 dark:text-neutral-300">
                    Screen Swappable:
                  </span>
                  <label
                    onClick={() => setIsBottomNavSwipeable(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-neutral-100 cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      name="bottomNavSwipeable"
                      checked={isBottomNavSwipeable}
                      onChange={() => setIsBottomNavSwipeable(true)}
                      className="w-3.5 h-3.5 cursor-pointer"
                      style={{ accentColor: palette.primary }}
                    />
                    <span>Swappable</span>
                  </label>
                  <label
                    onClick={() => setIsBottomNavSwipeable(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-neutral-100 cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      name="bottomNavSwipeable"
                      checked={!isBottomNavSwipeable}
                      onChange={() => setIsBottomNavSwipeable(false)}
                      className="w-3.5 h-3.5 cursor-pointer"
                      style={{ accentColor: palette.primary }}
                    />
                    <span>Not Swappable</span>
                  </label>
                </div>

                <span className="text-xs font-bold" style={{ color: palette.primary }}>
                  Active: {bottomNavVariant}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {BOOK_STORE_BOTTOM_NAV_VARIANTS.map((navVar) => {
                const selected = bottomNavVariant === navVar.id;
                return (
                  <button
                    key={navVar.id}
                    onClick={() => {
                      setBottomNavVariant(navVar.id);
                      if (!currentScreenMeta.hasBottomNav) {
                        setActiveScreen('Home');
                      }
                    }}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selected
                        ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/40'
                        : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                        {navVar.name}
                      </div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {navVar.tagline}
                      </div>
                    </div>
                    {selected && (
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: palette.primary }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    if (activeStudioTab === 'branding') {
      return (
        <div className="max-w-5xl mx-auto space-y-6 text-neutral-900 dark:text-neutral-100">
          <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <h1 className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Book Store App Branding & Identity
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Configure application display name, package identifier, and store metadata.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161c] space-y-4 max-w-xl">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: palette.primary }}
              >
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
                  {appName}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{packageName}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold mb-1 text-neutral-800 dark:text-neutral-200">
                  App Display Name
                </label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-neutral-800 dark:text-neutral-200">
                  Package Identifier
                </label>
                <input
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-neutral-800 dark:text-neutral-200">
                  Release Version
                </label>
                <input
                  type="text"
                  value={versionName}
                  onChange={(e) => setVersionName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs font-semibold"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-5xl mx-auto space-y-6 text-neutral-900 dark:text-neutral-100">
        <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <h1 className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Export Book Store Source &amp; Expo Router Bundle
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Download the complete runnable source code with Expo Router (`app/_layout.tsx`, `app/(tabs)/_layout.tsx`, 24 typed route screens, 144 variants, and hardware BackHandler stack).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161c] space-y-4">
            <div className="flex items-center gap-3">
              <AppWindow className="w-6 h-6" style={{ color: palette.primary }} />
              <div>
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                  {appName} ({packageName})
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  24 Screens · 144 Variants · Expo Router v4 + Vite Web Ready
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-[11px]">
              <div className="font-extrabold text-neutral-800 dark:text-neutral-200 flex items-center justify-between">
                <span>Included in Source .ZIP Archive:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">expo-router ~4.0.0</span>
              </div>
              <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 font-mono text-[10px]">
                <li>• app/_layout.tsx (Stack + Android BackHandler protection)</li>
                <li>• app/(tabs)/_layout.tsx (Home, Category, Cart, Profile tabs)</li>
                <li>• app/*.tsx (All 24 file-based Expo Router endpoints)</li>
                <li>• src/book_store_frontend/navigation/expoRouterSystem.tsx</li>
                <li>• src/book_store_frontend/screens/** (All 24 screens &amp; 144 variants)</li>
                <li>• package.json, app.json, tsconfig.json &amp; vite.config.ts</li>
              </ul>
            </div>

            <button
              onClick={handleExportBookStoreZip}
              disabled={isZipping}
              className="w-full py-3 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-2 shadow-sm cursor-pointer transition hover:opacity-95"
              style={{ backgroundColor: palette.primary }}
            >
              <Download className="w-4 h-4" />
              {isZipping
                ? 'Packaging Complete Source & Expo Router...'
                : 'Download Complete Expo Router Source (.ZIP)'}
            </button>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161c] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                Active Expo Router Stack &amp; Route Map
              </h3>
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold"
                style={{
                  backgroundColor: palette.primarySoft,
                  color: palette.primary,
                }}
              >
                {SCREEN_TO_EXPO_ROUTE[activeScreen]}
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Live navigation stack history ({navigationStack.length} {navigationStack.length === 1 ? 'entry' : 'entries'}):{' '}
              <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">
                {navigationStack.join(' → ')}
              </span>
            </p>
            <div className="max-h-48 overflow-y-auto pr-1 grid grid-cols-2 gap-1.5 text-[11px] font-mono">
              {BOOK_STORE_SCREENS_REGISTRY.map((s) => (
                <div
                  key={s.id}
                  onClick={() => navigateToScreen(s.id)}
                  className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-between cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
                >
                  <span className="truncate text-neutral-800 dark:text-neutral-200 font-sans font-semibold">
                    {s.label}
                  </span>
                  <span className="text-[10px] text-neutral-400 ml-1">
                    {SCREEN_TO_EXPO_ROUTE[s.id]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <BookStoreDesignSystemContext.Provider
      value={{
        isDark,
        toggleTheme: () => setIsDark((d) => !d),
        colorPresetId,
        setColorPresetId,
        palette,
        fontPresetId,
        setFontPresetId,
        activeFont,
        bottomNavVariant,
        setBottomNavVariant,
        isBottomNavSwipeable,
        setIsBottomNavSwipeable,
        books,
        vendors,
        authors,
        selectedBook,
        setSelectedBook,
        selectedAuthor,
        setSelectedAuthor,
        favoriteBookIds,
        toggleFavoriteBook,
        cartItems,
        addToCart,
        updateCartQty,
        clearCart,
        restoreDemoCart,
        userProfile,
        setUserProfile,
        deliveryAddress,
        setDeliveryAddress,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        selectedDeliveryDate,
        setSelectedDeliveryDate,
        selectedDeliveryTime,
        setSelectedDeliveryTime,
        orders: INITIAL_ORDER_HISTORY,
        coupons: INITIAL_COUPONS,
        recentSearches,
        addRecentSearch,
      }}
    >
      <BookStoreRouterProvider
        activeScreen={activeScreen}
        onChangeScreen={(scr) => navigateToScreen(scr)}
        selectedBook={selectedBook}
        selectedAuthor={selectedAuthor}
        onSelectBookById={(bookId) => {
          const found = books.find((b) => b.id === bookId);
          if (found) setSelectedBook(found);
        }}
        onSelectAuthorById={(authorId) => {
          const found = authors.find((a) => a.id === authorId);
          if (found) setSelectedAuthor(found);
        }}
      >
      <StudioDashboardShell
        activeProjectId="book_store"
        projectName={appName}
        activeScreenLabel={currentScreenMeta.label}
        activeVariantLabel={activeScreenVariant}
        activeStudioTab={activeStudioTab}
        onSelectStudioTab={setActiveStudioTab}
        onSwitchProject={onSwitchProject}
        isDark={isDark}
        onToggleTheme={() => setIsDark((d) => !d)}
        primaryColor={palette.primary}
        primaryTextColor={palette.primaryText}
        onExportZip={handleExportBookStoreZip}
        isZipping={isZipping}
        variantOptions={ALL_BOOK_STORE_VARIANT_IDS.map((vid) => ({
          id: vid,
          label: currentScreenMeta.variants[vid],
        }))}
        currentVariantId={activeScreenVariant}
        onChangeVariant={(vid) =>
          handleVariantChange(activeScreen, vid as BookStoreVariantId)
        }
        onReloadSimulator={() => setSimulatorKey((k) => k + 1)}
        colorSwatches={BOOK_STORE_COLOR_PRESETS.map((c) => ({
          id: c.id,
          name: c.name,
          swatch: c.swatch,
        }))}
        activeColorId={colorPresetId}
        onSelectColorSwatch={(id) => setColorPresetId(id as AppColorPresetId)}
        activeFontName={activeFont.name}
        middleContent={renderMiddleWorkspace()}
        mobileContent={
          <div
            key={simulatorKey}
            data-bookstore-variant={activeScreenVariant}
            className="h-full w-full relative flex flex-col justify-between overflow-hidden transform-gpu"
            style={{
              backgroundColor: palette.background,
              color: palette.textPrimary,
              fontFamily: activeFont.fontFamily,
              transform: 'translateZ(0)',
            }}
          >
            {/* Variant Layout Mode Indicator Strip */}
            {activeScreenVariant !== 'varient_1' && (
              <div
                className="px-4 py-1 text-[10px] font-extrabold uppercase tracking-wider flex items-center justify-between border-b flex-shrink-0"
                style={{
                  backgroundColor: palette.primarySoft,
                  borderColor: palette.primaryBorder,
                  color: palette.primary,
                }}
              >
                <span>{currentScreenMeta.variants[activeScreenVariant]}</span>
                <span className="font-mono opacity-75">{activeScreenVariant}</span>
              </div>
            )}

            <div
              className="flex-1 overflow-y-auto no-scrollbar"
              onPointerDown={(e) => {
                if (!isBottomNavSwipeable || !currentScreenMeta.hasBottomNav) return;
                swipeTouchStartRef.current = { x: e.clientX, y: e.clientY };
              }}
              onPointerUp={(e) => {
                if (
                  !isBottomNavSwipeable ||
                  !currentScreenMeta.hasBottomNav ||
                  !swipeTouchStartRef.current
                ) {
                  return;
                }
                const dx = e.clientX - swipeTouchStartRef.current.x;
                const dy = e.clientY - swipeTouchStartRef.current.y;
                swipeTouchStartRef.current = null;
                if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.35) {
                  if (dx < 0) {
                    handleSwipeBottomTab('next');
                  } else {
                    handleSwipeBottomTab('prev');
                  }
                }
              }}
            >
              {isBottomNavSwipeable && currentScreenMeta.hasBottomNav ? (
                <motion.div
                  key={`${activeScreen}-${activeScreenVariant}`}
                  initial={{ opacity: 0.92, x: swipeDirection >= 0 ? 18 : -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="min-h-full"
                >
                  {renderActiveBookStoreScreen()}
                </motion.div>
              ) : (
                renderActiveBookStoreScreen()
              )}
            </div>

            {currentScreenMeta.hasBottomNav && (
              <BookStoreBottomNavBar
                activeTab={currentScreenMeta.rootTab || 'Home'}
                onSelectTab={handleRootTabSelect}
                cartBadgeCount={totalCartBadgeCount}
                variant={bottomNavVariant}
              />
            )}
          </div>
        }
      />
      </BookStoreRouterProvider>
    </BookStoreDesignSystemContext.Provider>
  );
};

export default BookStoreApp;
