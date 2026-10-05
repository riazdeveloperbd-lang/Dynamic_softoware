import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage, IMAGES, Product } from '../../assets';
import { AppColorPresetId, AppFontPresetId } from '../../styles/theme';

export type ScreenName =
  | 'Splash'
  | 'Onboarding'
  | 'SignUp'
  | 'Login'
  | 'ForgotPassword'
  | 'VerificationCode'
  | 'ResetPassword'
  | 'Homepage'
  | 'Search'
  | 'SavedItems'
  | 'ProductDetails'
  | 'Reviews'
  | 'MyCart'
  | 'Checkout'
  | 'Address'
  | 'NewAddress'
  | 'PaymentMethod'
  | 'NewCard'
  | 'Account'
  | 'MyOrders'
  | 'TrackOrder'
  | 'MyDetails'
  | 'Notifications'
  | 'NotificationSettings'
  | 'FAQs'
  | 'HelpCenter'
  | 'CustomerService';

export type ScreenVariant =
  | 'varient_1'
  | 'varient_2'
  | 'varient_3'
  | 'varient_4'
  | 'varient_5'
  | 'varient_6';

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  size: 'S' | 'M' | 'L';
  price: number;
  quantity: number;
  image: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  dob: string;
  gender: string;
  phone: string;
}

export interface FilterState {
  sortBy: 'Relevance' | 'Price: Low - High' | 'Price: High - Low';
  priceRange: [number, number];
  size: 'All' | 'S' | 'M' | 'L';
}

interface AppState {
  currentScreen: ScreenName;
  currentVariant: ScreenVariant;
  history: { screen: ScreenName; variant: ScreenVariant }[];
  selectedProductId: string;
  savedProductIds: string[];
  cart: CartItem[];
  recentSearches: string[];
  selectedAddressId: string;
  selectedCardId: string;
  paymentType: 'Card' | 'Cash' | 'ApplePay';
  promoCode: string;
  userProfile: UserProfile;
  filters: FilterState;
  notificationSettings: {
    general: boolean;
    sound: boolean;
    vibrate: boolean;
    specialOffers: boolean;
    promoDiscounts: boolean;
    payments: boolean;
    cashback: boolean;
    appUpdates: boolean;
    newService: boolean;
    newTips: boolean;
  };
  chatMessages: ChatMessage[];
  inspectorOpen: boolean;
  themeMode: 'light' | 'dark';
  colorPreset: AppColorPresetId;
  fontPreset: AppFontPresetId;
  bottomNavVariant: ScreenVariant;
  forceSkeleton: boolean;
  appBranding: {
    appName: string;
    packageName: string;
    appLogoUri: string;
  };
}

const initialState: AppState = {
  currentScreen: 'Homepage',
  currentVariant: 'varient_1',
  history: [],
  selectedProductId: 'prod-1',
  savedProductIds: ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5', 'prod-6'],
  cart: [
    {
      id: 'cart-1',
      productId: 'prod-1',
      title: 'Regular Fit Slogan',
      size: 'L',
      price: 1190,
      quantity: 2,
      image: IMAGES.navySloganTshirt,
    },
    {
      id: 'cart-2',
      productId: 'prod-2',
      title: 'Regular Fit Polo',
      size: 'M',
      price: 1100,
      quantity: 1,
      image: IMAGES.tealPoloShirt,
    },
    {
      id: 'cart-3',
      productId: 'prod-3',
      title: 'Regular Fit Black',
      size: 'L',
      price: 1290,
      quantity: 1,
      image: IMAGES.blackSleevelessTshirt,
    },
  ],
  recentSearches: [
    'Jeans',
    'Casual clothes',
    'Hoodie',
    'Nike shoes black',
    'V-neck tshirt',
    'Winter clothes',
  ],
  selectedAddressId: 'addr-1',
  selectedCardId: 'card-1',
  paymentType: 'Card',
  promoCode: '',
  userProfile: {
    fullName: 'Cody Fisher',
    email: 'cody.fisher45@example.com',
    dob: '12/07/1990',
    gender: 'Male',
    phone: '+1 234 453 231 506',
  },
  filters: {
    sortBy: 'Relevance',
    priceRange: [0, 2000],
    size: 'All',
  },
  notificationSettings: {
    general: true,
    sound: true,
    vibrate: false,
    specialOffers: true,
    promoDiscounts: false,
    payments: false,
    cashback: true,
    appUpdates: false,
    newService: true,
    newTips: false,
  },
  chatMessages: [
    {
      id: 'msg-1',
      sender: 'agent',
      text: 'Hello, good morning.',
    },
    {
      id: 'msg-2',
      sender: 'agent',
      text: 'I am a Customer Service, is there anything I can help you with?',
      time: '10:41 pm',
    },
    {
      id: 'msg-3',
      sender: 'user',
      text: "Hi, I'm having problems with my order & payment.",
    },
    {
      id: 'msg-4',
      sender: 'user',
      text: 'Can you help me?',
      time: '10:50 pm',
    },
    {
      id: 'msg-5',
      sender: 'agent',
      text: 'Of course...',
    },
    {
      id: 'msg-6',
      sender: 'agent',
      text: 'Can you tell me the problem you are having? so I can help solve it',
      time: '10:51 pm',
    },
  ],
  inspectorOpen: true,
  themeMode: 'light',
  colorPreset: 'obsidian',
  fontPreset: 'jakarta',
  bottomNavVariant: 'varient_1',
  forceSkeleton: false,
  appBranding: {
    appName: 'Define Atelier',
    packageName: 'com.defineatelier.app',
    appLogoUri: '',
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    navigate: (
      state,
      action: PayloadAction<{ screen: ScreenName; variant?: ScreenVariant; productId?: string }>
    ) => {
      state.history.push({ screen: state.currentScreen, variant: state.currentVariant });
      state.currentScreen = action.payload.screen;
      state.currentVariant = action.payload.variant || 'varient_1';
      if (action.payload.productId) {
        state.selectedProductId = action.payload.productId;
      }
    },
    setVariant: (state, action: PayloadAction<ScreenVariant>) => {
      state.currentVariant = action.payload;
    },
    goBack: (state) => {
      const prev = state.history.pop();
      if (prev) {
        state.currentScreen = prev.screen;
        state.currentVariant = prev.variant;
      } else {
        state.currentScreen = 'Homepage';
        state.currentVariant = 'varient_1';
      }
    },
    toggleSavedProduct: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.savedProductIds.includes(id)) {
        state.savedProductIds = state.savedProductIds.filter((item) => item !== id);
      } else {
        state.savedProductIds.push(id);
      }
    },
    addToCart: (
      state,
      action: PayloadAction<
        | { product: Product; size: 'S' | 'M' | 'L' }
        | {
            productId: string;
            title: string;
            size: 'S' | 'M' | 'L';
            price: number;
            image: string;
          }
      >
    ) => {
      const payload = action.payload as any;
      if (!payload) return;
      const prodId: string | undefined =
        payload.product?.id || payload.productId;
      const title: string =
        payload.product?.title || payload.title || 'Atelier Garment';
      const price: number = payload.product?.price ?? payload.price ?? 0;
      const image: string = payload.product?.image || payload.image || '';
      const size: 'S' | 'M' | 'L' = payload.size || 'M';
      if (!prodId) return;

      const existing = state.cart.find(
        (item) => item.productId === prodId && item.size === size
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({
          id: `cart-${Date.now()}`,
          productId: prodId,
          title,
          size,
          price,
          quantity: 1,
          image,
        });
      }
    },
    updateCartQuantity: (
      state,
      action: PayloadAction<{ id: string; delta: number }>
    ) => {
      const item = state.cart.find((c) => c.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + action.payload.delta);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((c) => c.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    removeRecentSearch: (state, action: PayloadAction<string>) => {
      state.recentSearches = state.recentSearches.filter((s) => s !== action.payload);
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const term = action.payload.trim();
      if (term && !state.recentSearches.includes(term)) {
        state.recentSearches.unshift(term);
      }
    },
    setSelectedAddress: (state, action: PayloadAction<string>) => {
      state.selectedAddressId = action.payload;
    },
    setSelectedCard: (state, action: PayloadAction<string>) => {
      state.selectedCardId = action.payload;
    },
    setPaymentType: (state, action: PayloadAction<'Card' | 'Cash' | 'ApplePay'>) => {
      state.paymentType = action.payload;
    },
    setPromoCode: (state, action: PayloadAction<string>) => {
      state.promoCode = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.userProfile = { ...state.userProfile, ...action.payload };
    },
    updateFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        sortBy: 'Relevance',
        priceRange: [0, 2000],
        size: 'All',
      };
    },
    toggleNotificationSetting: (
      state,
      action: PayloadAction<keyof AppState['notificationSettings']>
    ) => {
      const key = action.payload;
      state.notificationSettings[key] = !state.notificationSettings[key];
    },
    sendChatMessage: (state, action: PayloadAction<string>) => {
      const text = action.payload.trim();
      if (!text) return;
      state.chatMessages.push({
        id: `msg-${Date.now()}`,
        sender: 'user',
        text,
        time: 'Just now',
      });
    },
    toggleInspector: (state) => {
      state.inspectorOpen = !state.inspectorOpen;
    },
    toggleThemeMode: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
    setThemeModeAction: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.themeMode = action.payload;
    },
    setColorPresetAction: (state, action: PayloadAction<AppColorPresetId>) => {
      state.colorPreset = action.payload;
    },
    setFontPresetAction: (state, action: PayloadAction<AppFontPresetId>) => {
      state.fontPreset = action.payload;
    },
    setBottomNavVariantAction: (
      state,
      action: PayloadAction<ScreenVariant>
    ) => {
      state.bottomNavVariant = action.payload;
    },
    toggleForceSkeleton: (state) => {
      state.forceSkeleton = !state.forceSkeleton;
    },
    setForceSkeleton: (state, action: PayloadAction<boolean>) => {
      state.forceSkeleton = action.payload;
    },
    updateAppBranding: (
      state,
      action: PayloadAction<{
        appName?: string;
        packageName?: string;
        appLogoUri?: string;
      }>
    ) => {
      state.appBranding = {
        ...state.appBranding,
        ...action.payload,
      };
    },
  },
});

export const {
  navigate,
  setVariant,
  goBack,
  toggleSavedProduct,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  removeRecentSearch,
  clearRecentSearches,
  addRecentSearch,
  setSelectedAddress,
  setSelectedCard,
  setPaymentType,
  setPromoCode,
  updateUserProfile,
  updateFilters,
  resetFilters,
  toggleNotificationSetting,
  sendChatMessage,
  toggleInspector,
  toggleThemeMode,
  setThemeModeAction,
  setColorPresetAction,
  setFontPresetAction,
  setBottomNavVariantAction,
  toggleForceSkeleton,
  setForceSkeleton,
  updateAppBranding,
} = appSlice.actions;

export default appSlice.reducer;
