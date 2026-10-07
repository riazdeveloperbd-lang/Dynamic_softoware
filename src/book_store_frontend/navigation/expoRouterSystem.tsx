import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  BookItem,
  AuthorItem,
  BookStoreVariantId,
} from '../styles/bookStoreDesignSystem';

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

export type BookStoreRoutePath =
  | '/onboarding'
  | '/sign-in'
  | '/sign-up'
  | '/forgot-password'
  | '/(tabs)/home'
  | '/(tabs)/category'
  | '/(tabs)/cart'
  | '/(tabs)/profile'
  | '/vendors'
  | '/authors'
  | '/author-detail'
  | '/book-detail'
  | '/search'
  | '/confirm-order'
  | '/set-location'
  | '/order-status'
  | '/notifications'
  | '/notification-detail'
  | '/my-account'
  | '/address'
  | '/favorites'
  | '/order-history'
  | '/offers'
  | '/help-center';

export const SCREEN_TO_EXPO_ROUTE: Record<BookStoreScreenId, BookStoreRoutePath> = {
  Onboarding: '/onboarding',
  SignIn: '/sign-in',
  SignUp: '/sign-up',
  ForgotPassword: '/forgot-password',
  Home: '/(tabs)/home',
  Category: '/(tabs)/category',
  Cart: '/(tabs)/cart',
  Profile: '/(tabs)/profile',
  Vendors: '/vendors',
  Authors: '/authors',
  AuthorDetail: '/author-detail',
  BookDetail: '/book-detail',
  Search: '/search',
  ConfirmOrder: '/confirm-order',
  SetLocation: '/set-location',
  OrderStatus: '/order-status',
  Notification: '/notifications',
  NotificationDetail: '/notification-detail',
  MyAccount: '/my-account',
  Address: '/address',
  Favorites: '/favorites',
  OrderHistory: '/order-history',
  Offers: '/offers',
  HelpCenter: '/help-center',
};

export const EXPO_ROUTE_TO_SCREEN: Record<string, BookStoreScreenId> = Object.entries(
  SCREEN_TO_EXPO_ROUTE
).reduce((acc, [screenId, routePath]) => {
  acc[routePath] = screenId as BookStoreScreenId;
  // Also allow without /(tabs) prefix
  acc[routePath.replace('/(tabs)', '')] = screenId as BookStoreScreenId;
  acc[screenId] = screenId as BookStoreScreenId;
  return acc;
}, {} as Record<string, BookStoreScreenId>);

export interface BookStoreRouteParams {
  bookId?: string;
  authorId?: string;
  variant?: BookStoreVariantId;
  fromScreen?: BookStoreScreenId;
  [key: string]: string | undefined;
}

export interface BookStoreRouteEntry {
  screen: BookStoreScreenId;
  pathname: BookStoreRoutePath;
  params: BookStoreRouteParams;
  timestamp: number;
}

export interface BookStoreRouterAPI {
  pathname: BookStoreRoutePath;
  currentScreen: BookStoreScreenId;
  params: BookStoreRouteParams;
  history: BookStoreRouteEntry[];
  push: (
    routeOrScreen: BookStoreRoutePath | BookStoreScreenId | string,
    params?: BookStoreRouteParams
  ) => void;
  replace: (
    routeOrScreen: BookStoreRoutePath | BookStoreScreenId | string,
    params?: BookStoreRouteParams
  ) => void;
  back: () => boolean;
  canGoBack: () => boolean;
  dismissAll: () => void;
  navigate: (
    screen: BookStoreScreenId,
    params?: BookStoreRouteParams
  ) => void;
}

const BookStoreRouterContext = createContext<BookStoreRouterAPI | null>(null);

export interface BookStoreRouterProviderProps {
  activeScreen: BookStoreScreenId;
  onChangeScreen: (screen: BookStoreScreenId) => void;
  onSelectBookById?: (bookId: string) => void;
  onSelectAuthorById?: (authorId: string) => void;
  selectedBook?: BookItem;
  selectedAuthor?: AuthorItem;
  children: React.ReactNode;
}

/**
 * Default fallback parent screen when history stack is empty and user presses Back
 */
export const DEFAULT_PARENT_SCREEN: Record<BookStoreScreenId, BookStoreScreenId> = {
  Onboarding: 'Onboarding',
  SignIn: 'Onboarding',
  SignUp: 'SignIn',
  ForgotPassword: 'SignIn',
  Home: 'Home',
  Category: 'Home',
  Cart: 'Home',
  Profile: 'Home',
  Vendors: 'Home',
  Authors: 'Home',
  AuthorDetail: 'Authors',
  BookDetail: 'Home',
  Search: 'Home',
  ConfirmOrder: 'Cart',
  SetLocation: 'ConfirmOrder',
  OrderStatus: 'Home',
  Notification: 'Home',
  NotificationDetail: 'Notification',
  MyAccount: 'Profile',
  Address: 'Profile',
  Favorites: 'Profile',
  OrderHistory: 'Profile',
  Offers: 'Profile',
  HelpCenter: 'Profile',
};

export const BookStoreRouterProvider: React.FC<BookStoreRouterProviderProps> = ({
  activeScreen,
  onChangeScreen,
  onSelectBookById,
  onSelectAuthorById,
  selectedBook,
  selectedAuthor,
  children,
}) => {
  const [history, setHistory] = useState<BookStoreRouteEntry[]>(() => [
    {
      screen: activeScreen,
      pathname: SCREEN_TO_EXPO_ROUTE[activeScreen] || '/(tabs)/home',
      params: {},
      timestamp: Date.now(),
    },
  ]);

  // Keep router history synchronized when user clicks screens in the Studio Sidebar or Grid
  useEffect(() => {
    setHistory((prev) => {
      const top = prev[prev.length - 1];
      if (top && top.screen === activeScreen) {
        return prev;
      }
      return [
        ...prev,
        {
          screen: activeScreen,
          pathname: SCREEN_TO_EXPO_ROUTE[activeScreen] || '/(tabs)/home',
          params: {
            bookId: selectedBook?.id,
            authorId: selectedAuthor?.id,
          },
          timestamp: Date.now(),
        },
      ];
    });
  }, [activeScreen, selectedBook?.id, selectedAuthor?.id]);

  const resolveScreen = useCallback(
    (routeOrScreen: string): BookStoreScreenId => {
      return EXPO_ROUTE_TO_SCREEN[routeOrScreen] || 'Home';
    },
    []
  );

  const push = useCallback(
    (
      routeOrScreen: BookStoreRoutePath | BookStoreScreenId | string,
      params: BookStoreRouteParams = {}
    ) => {
      const targetScreen = resolveScreen(routeOrScreen);
      if (params.bookId && onSelectBookById) {
        onSelectBookById(params.bookId);
      }
      if (params.authorId && onSelectAuthorById) {
        onSelectAuthorById(params.authorId);
      }
      setHistory((prev) => [
        ...prev,
        {
          screen: targetScreen,
          pathname: SCREEN_TO_EXPO_ROUTE[targetScreen],
          params,
          timestamp: Date.now(),
        },
      ]);
      onChangeScreen(targetScreen);
    },
    [resolveScreen, onChangeScreen, onSelectBookById, onSelectAuthorById]
  );

  const replace = useCallback(
    (
      routeOrScreen: BookStoreRoutePath | BookStoreScreenId | string,
      params: BookStoreRouteParams = {}
    ) => {
      const targetScreen = resolveScreen(routeOrScreen);
      if (params.bookId && onSelectBookById) {
        onSelectBookById(params.bookId);
      }
      if (params.authorId && onSelectAuthorById) {
        onSelectAuthorById(params.authorId);
      }
      setHistory((prev) => [
        ...prev.slice(0, Math.max(0, prev.length - 1)),
        {
          screen: targetScreen,
          pathname: SCREEN_TO_EXPO_ROUTE[targetScreen],
          params,
          timestamp: Date.now(),
        },
      ]);
      onChangeScreen(targetScreen);
    },
    [resolveScreen, onChangeScreen, onSelectBookById, onSelectAuthorById]
  );

  const canGoBack = useCallback(() => {
    return history.length > 1 || activeScreen !== 'Home';
  }, [history.length, activeScreen]);

  const back = useCallback((): boolean => {
    if (history.length > 1) {
      const nextStack = history.slice(0, history.length - 1);
      const prevEntry = nextStack[nextStack.length - 1];
      setHistory(nextStack);
      if (prevEntry.params?.bookId && onSelectBookById) {
        onSelectBookById(prevEntry.params.bookId);
      }
      if (prevEntry.params?.authorId && onSelectAuthorById) {
        onSelectAuthorById(prevEntry.params.authorId);
      }
      onChangeScreen(prevEntry.screen);
      return true;
    }

    const fallbackParent = DEFAULT_PARENT_SCREEN[activeScreen] || 'Home';
    if (fallbackParent !== activeScreen) {
      setHistory([
        {
          screen: fallbackParent,
          pathname: SCREEN_TO_EXPO_ROUTE[fallbackParent],
          params: {},
          timestamp: Date.now(),
        },
      ]);
      onChangeScreen(fallbackParent);
      return true;
    }

    return false;
  }, [history, activeScreen, onChangeScreen, onSelectBookById, onSelectAuthorById]);

  const dismissAll = useCallback(() => {
    setHistory([
      {
        screen: 'Home',
        pathname: '/(tabs)/home',
        params: {},
        timestamp: Date.now(),
      },
    ]);
    onChangeScreen('Home');
  }, [onChangeScreen]);

  // Support Android hardware BackHandler / Escape key inside web simulator
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
      if (e.key === 'Backspace' && e.altKey) {
        e.preventDefault();
        back();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [back]);

  const topEntry = history[history.length - 1] || {
    screen: activeScreen,
    pathname: SCREEN_TO_EXPO_ROUTE[activeScreen] || '/(tabs)/home',
    params: {},
    timestamp: Date.now(),
  };

  const value = useMemo<BookStoreRouterAPI>(
    () => ({
      pathname: topEntry.pathname,
      currentScreen: activeScreen,
      params: topEntry.params,
      history,
      push,
      replace,
      back,
      canGoBack,
      dismissAll,
      navigate: (screen, params) => push(screen, params),
    }),
    [topEntry, activeScreen, history, push, replace, back, canGoBack, dismissAll]
  );

  return (
    <BookStoreRouterContext.Provider value={value}>
      {children}
    </BookStoreRouterContext.Provider>
  );
};

/**
 * Expo Router compatible `useBookStoreRouter()` / `useRouter()` hook
 */
export function useBookStoreRouter(): BookStoreRouterAPI {
  const ctx = useContext(BookStoreRouterContext);
  if (!ctx) {
    throw new Error(
      'useBookStoreRouter must be used within a BookStoreRouterProvider'
    );
  }
  return ctx;
}

export function useLocalSearchParams(): BookStoreRouteParams {
  const ctx = useContext(BookStoreRouterContext);
  return ctx?.params || {};
}

export function usePathname(): BookStoreRoutePath {
  const ctx = useContext(BookStoreRouterContext);
  return ctx?.pathname || '/(tabs)/home';
}
