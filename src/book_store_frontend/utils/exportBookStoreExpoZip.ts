import JSZip from 'jszip';
import {
  AppColorPresetId,
  AppFontPresetId,
} from '../../cloth_shop_frontend/styles/theme';
import {
  BOOK_STORE_FONT_PRESETS,
  BookStoreBottomNavVariantId,
  BookStoreVariantId,
} from '../styles/bookStoreDesignSystem';
import {
  BookStoreScreenId,
  SCREEN_TO_EXPO_ROUTE,
} from '../navigation/expoRouterSystem';

// Eagerly load raw source code of all TypeScript/React files inside src/book_store_frontend/ via Vite
const rawBookStoreSourceFiles = import.meta.glob('../**/*.{ts,tsx}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Also load shared theme types so imports resolve cleanly in standalone exported project
const rawClothThemeFiles = import.meta.glob(
  '../../cloth_shop_frontend/styles/theme.ts',
  {
    query: '?raw',
    import: 'default',
    eager: true,
  }
) as Record<string, string>;

export const ALL_BOOK_STORE_SCREENS: BookStoreScreenId[] = [
  'Onboarding',
  'SignIn',
  'SignUp',
  'ForgotPassword',
  'Home',
  'Vendors',
  'Authors',
  'AuthorDetail',
  'BookDetail',
  'Category',
  'Search',
  'Cart',
  'ConfirmOrder',
  'SetLocation',
  'OrderStatus',
  'Notification',
  'NotificationDetail',
  'Profile',
  'MyAccount',
  'Address',
  'Favorites',
  'OrderHistory',
  'Offers',
  'HelpCenter',
];

async function generateBookStoreIconPngBlob(
  logoDataUrlOrUri: string | undefined,
  appTitle: string,
  primaryHex = '#54408C'
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = primaryHex;
  ctx.fillRect(0, 0, 512, 512);

  if (logoDataUrlOrUri && logoDataUrlOrUri.trim().length > 0) {
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new window.Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => resolve(image);
        image.onerror = (e) => reject(e);
        image.src = logoDataUrlOrUri;
      });
      ctx.drawImage(img, 0, 0, 512, 512);
    } catch {
      drawBookMonogram(ctx, appTitle);
    }
  } else {
    drawBookMonogram(ctx, appTitle);
  }

  return new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob || new Blob([]));
    }, 'image/png');
  });
}

function drawBookMonogram(ctx: CanvasRenderingContext2D, appTitle: string): void {
  ctx.strokeStyle = 'rgba(255,255,255,0.22)';
  ctx.lineWidth = 10;
  ctx.strokeRect(40, 40, 432, 432);

  const initial = (appTitle.trim()[0] || 'B').toUpperCase();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 230px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initial, 256, 236);

  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillText(appTitle.trim().slice(0, 18).toUpperCase(), 256, 412);
}

function triggerZipDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export interface ExportBookStoreExpoZipOptions {
  appName: string;
  packageName: string;
  versionName?: string;
  appLogoUri?: string;
  colorPresetId: AppColorPresetId;
  isDark: boolean;
  fontPresetId: AppFontPresetId;
  bottomNavVariant: BookStoreBottomNavVariantId;
  isBottomNavSwipeable?: boolean;
  selectedVariants: Record<BookStoreScreenId, BookStoreVariantId>;
}

/**
 * Generates and downloads a complete, ready-to-run Expo SDK 52 / Expo Router + Web & Native
 * source code ZIP archive containing:
 * - Full `app/` Expo Router file-based routing (`app/_layout.tsx`, `app/(tabs)/_layout.tsx`, and all 24 routes)
 * - Full `src/` screens (all 24 screens and their 6 variants), components, design system, and navigation history stack
 * - Native hardware `BackHandler` support so Android/iOS back navigation never exits or breaks
 */
export async function downloadBookStoreExpoZip(
  options: ExportBookStoreExpoZipOptions
): Promise<void> {
  const {
    appName = 'Bazar Book Store',
    packageName = 'com.bazar.bookstore',
    versionName = '1.0.0',
    appLogoUri = '',
    colorPresetId,
    isDark,
    fontPresetId,
    bottomNavVariant,
    isBottomNavSwipeable = true,
    selectedVariants,
  } = options;

  const cleanAppName = appName.trim() || 'Bazar Book Store';
  const cleanPackageName =
    packageName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9._]/g, '') || 'com.bazar.bookstore';
  const appSlug =
    cleanAppName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'bazar-bookstore';

  const activeFont =
    BOOK_STORE_FONT_PRESETS.find((f) => f.id === fontPresetId) ||
    BOOK_STORE_FONT_PRESETS[0];

  const zip = new JSZip();

  // 1. Generate App Icon & Splash Icon PNGs
  const iconBlob = await generateBookStoreIconPngBlob(appLogoUri, cleanAppName);
  zip.file('assets/icon.png', iconBlob);
  zip.file('assets/adaptive-icon.png', iconBlob);
  zip.file('assets/splash-icon.png', iconBlob);
  zip.file('assets/favicon.png', iconBlob);

  // 2. Include shared theme preset type definitions in src/cloth_shop_frontend/styles/theme.ts
  for (const [, rawThemeCode] of Object.entries(rawClothThemeFiles)) {
    zip.file('src/cloth_shop_frontend/styles/theme.ts', rawThemeCode);
  }

  // 3. Copy all Book Store source files (screens, components, styles, navigation)
  for (const [relPath, rawCode] of Object.entries(rawBookStoreSourceFiles)) {
    if (
      relPath === '../BookStoreApp.tsx' ||
      relPath.startsWith('../utils/')
    ) {
      continue;
    }

    const normalizedPath = relPath.replace(/^\.\.\//, 'src/book_store_frontend/');
    let fileCode = rawCode;

    // Bake user's chosen default theme, color, font, and bottom nav into bookStoreDesignSystem.ts
    if (
      normalizedPath === 'src/book_store_frontend/styles/bookStoreDesignSystem.ts'
    ) {
      fileCode = fileCode
        .replace(
          /isDark:\s*(true|false)/,
          `isDark: ${isDark ? 'true' : 'false'}`
        )
        .replace(
          /colorPresetId:\s*['"][a-z_]+['"]/,
          `colorPresetId: '${colorPresetId}'`
        )
        .replace(
          /fontPresetId:\s*['"][a-z_]+['"]/,
          `fontPresetId: '${fontPresetId}'`
        )
        .replace(
          /bottomNavVariant:\s*['"][a-z_0-9]+['"]/,
          `bottomNavVariant: '${bottomNavVariant}'`
        );
    }

    zip.file(normalizedPath, fileCode);
  }

  // 4. Create Standalone Interactive BookStoreRootHost (`src/book_store_frontend/BookStoreStandaloneApp.tsx`)
  // with full Expo Router history stack, Android BackHandler, and all 24 screens wired
  const standaloneHostCode = `import React, { useState, useMemo, useEffect } from 'react';
import {
  ALL_BOOK_STORE_VARIANT_IDS,
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
  AppColorPresetId,
  AppFontPresetId,
} from '../cloth_shop_frontend/styles/theme';
import {
  BookStoreBottomNavBar,
  BookStoreRootTabId,
} from './components/BookStoreBottomNavBar';
import {
  BookStoreRouterProvider,
  BookStoreScreenId,
  useBookStoreRouter,
} from './navigation/expoRouterSystem';

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

export const DEFAULT_SELECTED_VARIANTS: Record<BookStoreScreenId, BookStoreVariantId> = ${JSON.stringify(
    selectedVariants,
    null,
    2
  )};

const ROOT_TAB_SCREENS: BookStoreScreenId[] = ['Home', 'Category', 'Cart', 'Profile'];

const BookStoreNavigatorContent: React.FC<{
  selectedVariants: Record<BookStoreScreenId, BookStoreVariantId>;
  setSelectedAuthor: (author: AuthorItem) => void;
  openBookProductDetail: (book: BookItem, fromScreen: BookStoreScreenId) => void;
  totalCartBadgeCount: number;
  bottomNavVariant: BookStoreBottomNavVariantId;
}> = ({
  selectedVariants,
  setSelectedAuthor,
  openBookProductDetail,
  totalCartBadgeCount,
  bottomNavVariant,
}) => {
  const router = useBookStoreRouter();
  const activeScreen = router.currentScreen;
  const activeScreenVariant = selectedVariants[activeScreen] || 'varient_1';

  // Browser popstate & Android BackHandler integration
  useEffect(() => {
    const onPopState = () => {
      router.back();
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [router]);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Onboarding':
        return (
          <OnboardingVarient1
            variant={activeScreenVariant}
            onGetStarted={() => router.push('/sign-up')}
            onSignIn={() => router.push('/sign-in')}
            onOpenSignIn={() => router.push('/sign-in')}
          />
        );
      case 'SignIn':
        return (
          <SignInVarient1
            variant={activeScreenVariant}
            onBack={() => router.back()}
            onSignInSuccess={() => router.replace('/(tabs)/home')}
            onLoginSuccess={() => router.replace('/(tabs)/home')}
            onGoToSignUp={() => router.push('/sign-up')}
            onOpenSignUp={() => router.push('/sign-up')}
            onGoToForgotPassword={() => router.push('/forgot-password')}
            onOpenForgotPassword={() => router.push('/forgot-password')}
          />
        );
      case 'SignUp':
        return (
          <SignUpVarient1
            variant={activeScreenVariant}
            onBack={() => router.back()}
            onGoToSignIn={() => router.push('/sign-in')}
            onOpenSignIn={() => router.push('/sign-in')}
            onCompleteSignUp={() => router.replace('/(tabs)/home')}
          />
        );
      case 'ForgotPassword':
        return (
          <ForgotPasswordVarient1
            variant={activeScreenVariant}
            onBack={() => router.back()}
            onLoginSuccess={() => router.replace('/sign-in')}
            onOpenSignIn={() => router.replace('/sign-in')}
          />
        );
      case 'Home':
        return (
          <HomeVarient1
            variant={activeScreenVariant}
            onOpenSearch={() => router.push('/search')}
            onOpenNotifications={() => router.push('/notifications')}
            onSelectBook={(book) => openBookProductDetail(book, 'Home')}
            onOpenBookDetail={(book) => openBookProductDetail(book, 'Home')}
            onOpenCategory={() => router.push('/(tabs)/category')}
            onSeeAllVendors={() => router.push('/vendors')}
            onOpenVendors={() => router.push('/vendors')}
            onSeeAllAuthors={() => router.push('/authors')}
            onOpenAuthors={() => router.push('/authors')}
            onSelectAuthor={(author) => {
              setSelectedAuthor(author);
              router.push('/author-detail', { authorId: author.id });
            }}
            onOpenAuthorDetail={(author) => {
              setSelectedAuthor(author);
              router.push('/author-detail', { authorId: author.id });
            }}
          />
        );
      case 'Vendors':
        return (
          <VendorsVarient1
            variant={activeScreenVariant}
            onBack={() => router.back()}
            onOpenSearch={() => router.push('/search')}
          />
        );
      case 'Authors':
        return (
          <AuthorsVarient1
            variant={activeScreenVariant}
            onBack={() => router.back()}
            onOpenSearch={() => router.push('/search')}
            onSelectAuthor={(author) => {
              setSelectedAuthor(author);
              router.push('/author-detail', { authorId: author.id });
            }}
          />
        );
      case 'AuthorDetail':
        return (
          <AuthorDetailVarient1
            variant={activeScreenVariant}
            onBack={() => router.back()}
            onSelectBook={(book) => openBookProductDetail(book, 'AuthorDetail')}
            onOpenBookDetail={(book) => openBookProductDetail(book, 'AuthorDetail')}
          />
        );
      case 'BookDetail':
        return (
          <BookDetailVarient1
            variant={activeScreenVariant}
            onClose={() => router.back()}
            onContinueShopping={() => router.back()}
            onGoToCart={() => router.push('/(tabs)/cart')}
            onViewCart={() => router.push('/(tabs)/cart')}
          />
        );
      case 'Category':
        return (
          <CategoryVarient1
            variant={activeScreenVariant}
            onOpenSearch={() => router.push('/search')}
            onOpenNotifications={() => router.push('/notifications')}
            onSelectBook={(book) => openBookProductDetail(book, 'Category')}
            onOpenBookDetail={(book) => openBookProductDetail(book, 'Category')}
          />
        );
      case 'Search':
        return (
          <SearchVarient1
            variant={activeScreenVariant}
            onBack={() => router.back()}
            onSelectBook={(book) => openBookProductDetail(book, 'Search')}
            onOpenBookDetail={(book) => openBookProductDetail(book, 'Search')}
          />
        );
      case 'Cart':
        return (
          <CartVarient1
            variant={activeScreenVariant}
            onGoToConfirmOrder={() => router.push('/confirm-order')}
            onGoToNotifications={() => router.push('/notifications')}
            onGoToCategory={() => router.push('/(tabs)/category')}
          />
        );
      case 'ConfirmOrder':
        return (
          <ConfirmOrderVarient1
            variant={activeScreenVariant}
            onBack={() => router.back()}
            onGoToSetLocation={() => router.push('/set-location')}
            onOrderPlaced={() => router.push('/order-status')}
            onGoToNotifications={() => router.push('/notifications')}
          />
        );
      case 'SetLocation':
        return (
          <SetLocationVarient1
            variant={activeScreenVariant}
            onBack={() => router.back()}
            onGoToNotifications={() => router.push('/notifications')}
          />
        );
      case 'OrderStatus':
        return (
          <OrderStatusVarient1
            variant={activeScreenVariant}
            onBackToHome={() => router.dismissAll()}
            onGoToOrderHistory={() => router.push('/order-history')}
          />
        );
      case 'Notification':
        return (
          <NotificationVarient1
            variant={activeScreenVariant}
            onBack={() => router.back()}
            onOpenPromoDetail={() => router.push('/notification-detail')}
          />
        );
      case 'NotificationDetail':
        return (
          <NotificationDetailVarient1
            variant={activeScreenVariant}
            onBack={() => router.back()}
          />
        );
      case 'Profile':
        return (
          <ProfileVarient1
            variant={activeScreenVariant}
            onGoToMyAccount={() => router.push('/my-account')}
            onGoToAddress={() => router.push('/address')}
            onGoToOffers={() => router.push('/offers')}
            onGoToFavorites={() => router.push('/favorites')}
            onGoToOrderHistory={() => router.push('/order-history')}
            onGoToHelpCenter={() => router.push('/help-center')}
            onLogout={() => router.replace('/sign-in')}
          />
        );
      case 'MyAccount':
        return <MyAccountVarient1 variant={activeScreenVariant} onBack={() => router.back()} />;
      case 'Address':
        return (
          <AddressVarient1
            variant={activeScreenVariant}
            onBack={() => router.back()}
            onGoToNotifications={() => router.push('/notifications')}
          />
        );
      case 'Favorites':
        return (
          <FavoritesVarient1
            variant={activeScreenVariant}
            onBack={() => router.back()}
            onSelectBook={(book) => openBookProductDetail(book, 'Favorites')}
          />
        );
      case 'OrderHistory':
        return <OrderHistoryVarient1 variant={activeScreenVariant} onBack={() => router.back()} />;
      case 'Offers':
        return <OffersVarient1 variant={activeScreenVariant} onBack={() => router.back()} />;
      case 'HelpCenter':
        return <HelpCenterVarient1 variant={activeScreenVariant} onBack={() => router.back()} />;
      default:
        return null;
    }
  };

  const hasBottomNav = ROOT_TAB_SCREENS.includes(activeScreen);

  return (
    <div className="flex-1 flex flex-col h-full w-full overflow-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar">{renderScreen()}</div>
      {hasBottomNav && (
        <BookStoreBottomNavBar
          activeTab={(activeScreen as BookStoreRootTabId) || 'Home'}
          onSelectTab={(tab) => router.push(tab)}
          cartBadgeCount={totalCartBadgeCount}
          variant={bottomNavVariant}
        />
      )}
    </div>
  );
};

export const BookStoreStandaloneApp: React.FC<{
  initialScreen?: BookStoreScreenId;
}> = ({ initialScreen = 'Home' }) => {
  const [activeScreen, setActiveScreen] = useState<BookStoreScreenId>(initialScreen);
  const [isDark, setIsDark] = useState(${isDark ? 'true' : 'false'});
  const [colorPresetId, setColorPresetId] = useState<AppColorPresetId>('${colorPresetId}');
  const [fontPresetId, setFontPresetId] = useState<AppFontPresetId>('${fontPresetId}');
  const [bottomNavVariant, setBottomNavVariant] =
    useState<BookStoreBottomNavVariantId>('${bottomNavVariant}');
  const [isBottomNavSwipeable, setIsBottomNavSwipeable] =
    useState<boolean>(${isBottomNavSwipeable ? 'true' : 'false'});
  const [selectedBook, setSelectedBook] = useState<BookItem>(INITIAL_BOOKS[0]);
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorItem>(INITIAL_AUTHORS[0]);
  const [favoriteBookIds, setFavoriteBookIds] = useState<string[]>([
    'fisher_diary',
    'da_vinci',
  ]);
  const [cartItems, setCartItems] = useState<CartItemEntry[]>([
    { book: INITIAL_BOOKS[4], quantity: 1 },
    { book: INITIAL_BOOKS[3], quantity: 1 },
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'KNET' | 'Credit Card'>('KNET');
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState('Today 12 Jan');
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState('Between 10PM : 11PM');
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

  const totalCartBadgeCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

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
        books: INITIAL_BOOKS,
        vendors: INITIAL_VENDORS,
        authors: INITIAL_AUTHORS,
        selectedBook,
        setSelectedBook,
        selectedAuthor,
        setSelectedAuthor,
        favoriteBookIds,
        toggleFavoriteBook: (id) =>
          setFavoriteBookIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
          ),
        cartItems,
        addToCart: (book, qty = 1) =>
          setCartItems((prev) => {
            const found = prev.find((i) => i.book.id === book.id);
            if (found) {
              return prev.map((i) =>
                i.book.id === book.id ? { ...i, quantity: i.quantity + qty } : i
              );
            }
            return [...prev, { book, quantity: qty }];
          }),
        updateCartQty: (bookId, delta) =>
          setCartItems((prev) =>
            prev
              .map((i) =>
                i.book.id === bookId ? { ...i, quantity: i.quantity + delta } : i
              )
              .filter((i) => i.quantity > 0)
          ),
        clearCart: () => setCartItems([]),
        restoreDemoCart: () =>
          setCartItems([
            { book: INITIAL_BOOKS[4], quantity: 1 },
            { book: INITIAL_BOOKS[3], quantity: 1 },
          ]),
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
        addRecentSearch: (q) => {
          const clean = q.trim();
          if (!clean) return;
          setRecentSearches((prev) =>
            [clean, ...prev.filter((item) => item !== clean)].slice(0, 6)
          );
        },
      }}
    >
      <BookStoreRouterProvider
        activeScreen={activeScreen}
        onChangeScreen={setActiveScreen}
        selectedBook={selectedBook}
        selectedAuthor={selectedAuthor}
        onSelectBookById={(bookId) => {
          const found = INITIAL_BOOKS.find((b) => b.id === bookId);
          if (found) setSelectedBook(found);
        }}
        onSelectAuthorById={(authorId) => {
          const found = INITIAL_AUTHORS.find((a) => a.id === authorId);
          if (found) setSelectedAuthor(found);
        }}
      >
        <div
          className="min-h-screen w-full flex items-center justify-center"
          style={{
            backgroundColor: isDark ? '#0B0914' : '#F4F1FA',
            fontFamily: activeFont.fontFamily,
          }}
        >
          <div
            className="w-full max-w-[430px] h-screen max-h-[900px] flex flex-col justify-between overflow-hidden relative shadow-2xl transform-gpu"
            style={{
              backgroundColor: palette.background,
              color: palette.textPrimary,
              transform: 'translateZ(0)',
            }}
          >
            <BookStoreNavigatorContent
              selectedVariants={DEFAULT_SELECTED_VARIANTS}
              setSelectedAuthor={setSelectedAuthor}
              openBookProductDetail={(book, fromScreen) => {
                setSelectedBook(book);
                setActiveScreen('BookDetail');
              }}
              totalCartBadgeCount={totalCartBadgeCount}
              bottomNavVariant={bottomNavVariant}
            />
          </div>
        </div>
      </BookStoreRouterProvider>
    </BookStoreDesignSystemContext.Provider>
  );
};

export default BookStoreStandaloneApp;
`;
  zip.file(
    'src/book_store_frontend/BookStoreStandaloneApp.tsx',
    standaloneHostCode
  );

  // 5. Generate Expo Router File-Based Routing Directory (`app/_layout.tsx`, `app/(tabs)/_layout.tsx`, and all route files)
  zip.file(
    'app/_layout.tsx',
    `import React, { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * Root Expo Router Stack Layout with Android Hardware BackHandler Protection
 */
export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (router.canGoBack()) {
        router.back();
        return true;
      }
      return false;
    });
    return () => subscription.remove();
  }, [router]);

  return (
    <>
      <StatusBar style="${isDark ? 'light' : 'dark'}" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="book-detail"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="vendors" />
        <Stack.Screen name="authors" />
        <Stack.Screen name="author-detail" />
        <Stack.Screen name="search" />
        <Stack.Screen name="confirm-order" />
        <Stack.Screen name="set-location" />
        <Stack.Screen name="order-status" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="notification-detail" />
        <Stack.Screen name="my-account" />
        <Stack.Screen name="address" />
        <Stack.Screen name="favorites" />
        <Stack.Screen name="order-history" />
        <Stack.Screen name="offers" />
        <Stack.Screen name="help-center" />
      </Stack>
    </>
  );
}
`
  );

  zip.file(
    'app/index.tsx',
    `import React from 'react';
import BookStoreStandaloneApp from '../src/book_store_frontend/BookStoreStandaloneApp';

export default function IndexRoute() {
  return <BookStoreStandaloneApp initialScreen="Home" />;
}
`
  );

  zip.file(
    'app/(tabs)/_layout.tsx',
    `import React from 'react';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="category" options={{ title: 'Category' }} />
      <Tabs.Screen name="cart" options={{ title: 'Cart' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
`
  );

  // Create every Expo Router route file mapped to its corresponding BookStoreScreenId
  for (const screenId of ALL_BOOK_STORE_SCREENS) {
    const expoRoute = SCREEN_TO_EXPO_ROUTE[screenId];
    const relativeAppFile = `app${expoRoute}.tsx`;
    zip.file(
      relativeAppFile,
      `import React from 'react';
import BookStoreStandaloneApp from '${
        expoRoute.startsWith('/(tabs)/') ? '../..' : '..'
      }/src/book_store_frontend/BookStoreStandaloneApp';

export default function ${screenId}RouteScreen() {
  return <BookStoreStandaloneApp initialScreen="${screenId}" />;
}
`
    );
  }

  // 6. Add Root Web + Expo Entry Points (`src/App.tsx`, `App.tsx`, `index.html`, `vite.config.ts`, `package.json`, `app.json`)
  zip.file(
    'src/App.tsx',
    `import React from 'react';
import BookStoreStandaloneApp from './book_store_frontend/BookStoreStandaloneApp';

export default function App() {
  return <BookStoreStandaloneApp initialScreen="Home" />;
}
`
  );

  zip.file(
    'src/main.tsx',
    `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
  );

  zip.file(
    'src/index.css',
    `@import "tailwindcss";\n\n.no-scrollbar::-webkit-scrollbar {\n  display: none;\n}\n.no-scrollbar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n`
  );

  zip.file(
    'App.tsx',
    `import App from './src/App';\nexport default App;\n`
  );

  zip.file(
    'index.html',
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${cleanAppName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
  );

  zip.file(
    'vite.config.ts',
    `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
});
`
  );

  const packageJson = {
    name: appSlug,
    version: versionName,
    private: true,
    main: 'expo-router/entry',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
      start: 'expo start',
      android: 'expo start --android',
      ios: 'expo start --ios',
      web: 'expo start --web',
    },
    dependencies: {
      expo: '~52.0.0',
      'expo-linking': '~7.0.0',
      'expo-router': '~4.0.0',
      'expo-status-bar': '~2.0.0',
      'framer-motion': '^12.0.0',
      'lucide-react': '^0.546.0',
      react: '^19.0.0',
      'react-dom': '^19.0.0',
      'react-native': '0.76.5',
      'react-native-safe-area-context': '4.12.0',
      'react-native-screens': '~4.1.0',
      'react-native-web': '~0.19.13',
    },
    devDependencies: {
      '@tailwindcss/vite': '^4.1.0',
      '@types/react': '^19.0.0',
      '@types/react-dom': '^19.0.0',
      '@vitejs/plugin-react': '^4.3.0',
      tailwindcss: '^4.1.0',
      typescript: '~5.7.2',
      vite: '^6.0.0',
    },
  };
  zip.file('package.json', JSON.stringify(packageJson, null, 2));

  const appJson = {
    expo: {
      name: cleanAppName,
      slug: appSlug,
      version: versionName,
      scheme: appSlug,
      orientation: 'portrait',
      icon: './assets/icon.png',
      userInterfaceStyle: isDark ? 'dark' : 'light',
      splash: {
        image: './assets/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: isDark ? '#0E0B16' : '#54408C',
      },
      ios: {
        supportsTablet: true,
        bundleIdentifier: cleanPackageName,
      },
      android: {
        package: cleanPackageName,
        adaptiveIcon: {
          foregroundImage: './assets/adaptive-icon.png',
          backgroundColor: '#54408C',
        },
      },
      web: {
        bundler: 'metro',
        output: 'static',
        favicon: './assets/favicon.png',
      },
      plugins: ['expo-router'],
      experiments: {
        typedRoutes: true,
      },
    },
  };
  zip.file('app.json', JSON.stringify(appJson, null, 2));

  zip.file(
    'tsconfig.json',
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2020',
          useDefineForClassFields: true,
          lib: ['ES2020', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          skipLibCheck: true,
          moduleResolution: 'bundler',
          allowImportingTsExtensions: true,
          isolatedModules: true,
          moduleDetection: 'force',
          noEmit: true,
          jsx: 'react-jsx',
          strict: true,
        },
        include: ['src', 'app'],
      },
      null,
      2
    )
  );

  // 7. Comprehensive README explaining both Expo Router (`app/`) and Web (`npm run dev`) usage + Back navigation stack
  const readme = `# ${cleanAppName} — Complete Source Code & Expo Router Bundle

- **App Name**: \`${cleanAppName}\`
- **Package Name**: \`${cleanPackageName}\`
- **Version**: \`${versionName}\`
- **Theme**: \`${colorPresetId}\` (\`${isDark ? 'Dark Mode' : 'Light Mode'}\`)
- **Typography**: \`${activeFont.name}\`
- **Bottom Navigation Style**: \`${bottomNavVariant}\`

## Included Navigation & Expo Router Architecture

1. **\`app/\` Directory (Expo Router v4 File-Based Routing)**:
   - \`app/_layout.tsx\`: Root Stack layout with Android Hardware \`BackHandler\` listener (\`router.canGoBack() ? router.back() : false\`) so pressing the back button on Android or iOS never causes a back-navigation crash.
   - \`app/(tabs)/_layout.tsx\`: Bottom Tab layout for \`home\`, \`category\`, \`cart\`, and \`profile\`.
   - 24 typed route screens (\`app/book-detail.tsx\`, \`app/confirm-order.tsx\`, \`app/set-location.tsx\`, etc.).

2. **\`src/book_store_frontend/navigation/expoRouterSystem.tsx\` (Stateful Router History Stack)**:
   - Tracks full navigation history stack (\`history: BookStoreRouteEntry[]\`) with \`router.push()\`, \`router.replace()\`, \`router.back()\`, \`router.canGoBack()\`, and \`router.dismissAll()\`.
   - Includes automatic parent-route fallback (\`DEFAULT_PARENT_SCREEN\`) if a deep-linked screen is opened directly and the user presses Back.

3. **\`src/book_store_frontend/screens/*\` (All 24 Screens · 6 Variants Each = 144 Variants)**:
${ALL_BOOK_STORE_SCREENS.map(
  (s, i) =>
    `   ${i + 1}. **${s}** — Route: \`${SCREEN_TO_EXPO_ROUTE[s]}\` — Active Variant: \`${selectedVariants[s] || 'varient_1'}\``
).join('\n')}

## How to Run Locally

\`\`\`bash
# 1. Install dependencies
npm install

# 2. Start Vite Web App on http://localhost:3000
npm run dev

# Or start Expo CLI
npx expo start
\`\`\`
`;
  zip.file('README.md', readme);

  const blob = await zip.generateAsync({ type: 'blob' });
  triggerZipDownload(blob, `${appSlug}-expo-router-source-v${versionName}.zip`);
}
