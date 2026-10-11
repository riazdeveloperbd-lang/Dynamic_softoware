import React from 'react';
import {
  Sparkles,
  Lock,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Grid,
  ShoppingBag,
  Heart,
  ShoppingCart,
  MapPin,
  CreditCard,
  CheckCircle2,
  User,
  Package,
  HelpCircle,
  Compass,
  KeyRound,
  LucideIcon,
} from 'lucide-react';

export type CustomEcommerceScreenId =
  | 'SplashScreen'
  | 'OnboardingWalkthrough'
  | 'SignUpLogin'
  | 'ForgotPasswordPin'
  | 'HomeDashboard'
  | 'GlobalSearchResults'
  | 'AdvancedFilterSheet'
  | 'CategoryNavigation'
  | 'ProductListingPage'
  | 'ProductDetailPage'
  | 'WishlistSaved'
  | 'ShoppingCart'
  | 'AddressBookLocation'
  | 'CheckoutPaymentGateway'
  | 'OrderSuccess'
  | 'UserProfileWallet'
  | 'OrderHistoryTracking'
  | 'HelpCenterSupport'
  // A. Clothing Shop (Apparel & Fashion)
  | 'ClothingSizeGuideModal'
  | 'ClothingLookbookShopTheLook'
  | 'ClothingVariantSelectorPdp'
  | 'ClothingReviewPhotoGallery'
  // B. Grocery Shop (FMCG & Daily Needs)
  | 'GroceryQuickAddListsPlp'
  | 'GroceryDeliverySlotPicker'
  | 'GroceryBuyAgainReorder'
  | 'GrocerySubstitutionSheet'
  // C. Gadget Shop (Electronics & Hardware)
  | 'GadgetComparisonMatrix'
  | 'GadgetEmiFinancingCalculator'
  | 'GadgetDetailedTechSpecsTab'
  | 'GadgetWarrantyServicePolicy';

export type CustomEcommerceVariantId =
  | 'varient_1'
  | 'varient_2'
  | 'varient_3'
  | 'varient_4'
  | 'varient_5'
  | 'varient_6';

export const ALL_CUSTOM_ECOMMERCE_VARIANT_IDS: CustomEcommerceVariantId[] = [
  'varient_1',
  'varient_2',
  'varient_3',
  'varient_4',
  'varient_5',
  'varient_6',
];

export type CustomEcommerceFlowGroup =
  | 'Onboarding & Authentication'
  | 'Discovery & Navigation'
  | 'Product Engagement'
  | 'Cart & Checkout Pipeline'
  | 'Account & Post-Purchase'
  | 'A. Clothing Shop (Apparel & Fashion)'
  | 'B. Grocery Shop (FMCG & Daily Needs)'
  | 'C. Gadget Shop (Electronics & Hardware)';

export interface CustomEcommerceScreenDefinition {
  id: CustomEcommerceScreenId;
  stepNumber: number;
  label: string;
  filePath: string;
  flowGroup: CustomEcommerceFlowGroup;
  description: string;
  keyElements: string[];
  variants: Record<CustomEcommerceVariantId, string>;
  icon: LucideIcon;
  hasBottomNav?: boolean;
  rootTab?: 'Home' | 'Category' | 'Wishlist' | 'Cart' | 'Profile';
}

export const CUSTOM_ECOMMERCE_COLOR_PRESETS = [
  { id: 'indigo_commerce', name: 'Royal Commerce Indigo', swatch: '#4F46E5', primaryText: '#FFFFFF', soft: '#EEF2FF' },
  { id: 'emerald_mart', name: 'Fresh Mart Emerald', swatch: '#059669', primaryText: '#FFFFFF', soft: '#ECFDF5' },
  { id: 'crimson_flash', name: 'Flash Sale Crimson', swatch: '#E11D48', primaryText: '#FFFFFF', soft: '#FFF1F2' },
  { id: 'amber_gold', name: 'Luxe Bazaar Amber', swatch: '#D97706', primaryText: '#FFFFFF', soft: '#FFFBEB' },
  { id: 'obsidian_mono', name: 'Editorial Obsidian', swatch: '#18181B', primaryText: '#FFFFFF', soft: '#F4F4F5' },
  { id: 'teal_modern', name: 'Modern Retail Teal', swatch: '#0D9488', primaryText: '#FFFFFF', soft: '#F0FDFA' },
];

export const CUSTOM_ECOMMERCE_FONT_PRESETS = [
  { id: 'jakarta', name: 'Plus Jakarta Sans', fontFamily: "'Plus Jakarta Sans', sans-serif" },
  { id: 'inter', name: 'Inter Display', fontFamily: "'Inter', sans-serif" },
  { id: 'space', name: 'Space Grotesk', fontFamily: "'Space Grotesk', sans-serif" },
];

export const CUSTOM_ECOMMERCE_PRODUCTS = [
  {
    id: 'prod_1',
    title: 'Sony WH-1000XM5 Wireless ANC Headphones',
    brand: 'Sony Official',
    category: 'Audio & Tech',
    price: 298,
    originalPrice: 399,
    rating: 4.9,
    reviewsCount: 1420,
    badge: 'Flash -25%',
    stockStatus: 'In Stock (14 left)',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod_2',
    title: 'Minimalist Chrono Leather Watch — 40mm',
    brand: 'Nordic Time',
    category: 'Watches & Luxe',
    price: 165,
    originalPrice: 220,
    rating: 4.8,
    reviewsCount: 648,
    badge: 'Best Seller',
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod_3',
    title: 'AeroKnit Pro Running Sneakers',
    brand: 'Velocity Athletics',
    category: 'Footwear',
    price: 129,
    originalPrice: 160,
    rating: 4.7,
    reviewsCount: 892,
    badge: 'Daily Deal',
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod_4',
    title: 'Botanical Vitamin C Glow Serum 50ml',
    brand: 'Lumière Lab',
    category: 'Skincare',
    price: 44,
    originalPrice: 58,
    rating: 4.9,
    reviewsCount: 2150,
    badge: 'Top Rated',
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod_5',
    title: 'Artisan Matte Espresso Maker Pro',
    brand: 'Barista Craft',
    category: 'Home & Kitchen',
    price: 249,
    originalPrice: 310,
    rating: 4.8,
    reviewsCount: 412,
    badge: 'Bundle Save',
    stockStatus: 'Only 3 Left',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod_6',
    title: 'Structured Italian Pebbled Tote Bag',
    brand: 'Maison Vela',
    category: 'Bags & Carry',
    price: 189,
    originalPrice: 240,
    rating: 4.9,
    reviewsCount: 530,
    badge: 'New Arrival',
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
  },
];

export const CUSTOM_ECOMMERCE_SCREENS_REGISTRY: CustomEcommerceScreenDefinition[] = [
  // ============================================================================
  // 1. ONBOARDING & AUTHENTICATION (4 SCREENS)
  // ============================================================================
  {
    id: 'SplashScreen',
    stepNumber: 1,
    label: 'Splash Screen',
    filePath: 'src/custom_ecommerce_frontend/screens/SplashScreen',
    flowGroup: 'Onboarding & Authentication',
    description: 'App logo, brand emblem, version badge, and animated initial loading state.',
    keyElements: ['Brand Crest Logo', 'Animated Progress Bar', 'Security & Trust Tagline'],
    variants: {
      varient_1: 'V1: Minimal Brand Emblem & Pulse',
      varient_2: 'V2: Bento Split Showcase Loader',
      varient_3: 'V3: Brutalist Bold Typography',
      varient_4: 'V4: Luxury Dark Glass Crest',
      varient_5: 'V5: Editorial Atelier Frame',
      varient_6: 'V6: High-Conversion Flash Badge',
    },
    icon: Sparkles,
    hasBottomNav: false,
  },
  {
    id: 'OnboardingWalkthrough',
    stepNumber: 2,
    label: 'Onboarding / Walkthrough',
    filePath: 'src/custom_ecommerce_frontend/screens/OnboardingWalkthrough',
    flowGroup: 'Onboarding & Authentication',
    description: '3–4 swipeable screens highlighting key value props (fast delivery, secure payments, authentic brands).',
    keyElements: ['4 Swipeable Story Slides', 'Fast Delivery & Secure Pay Props', 'Skip / Next Stepper'],
    variants: {
      varient_1: 'V1: 4-Slide Value Prop Carousel',
      varient_2: 'V2: Bento Feature Grid Walkthrough',
      varient_3: 'V3: Brutalist Bold Poster Slides',
      varient_4: 'V4: Immersive Full-Bleed Story',
      varient_5: 'V5: Left-Rail Editorial Steps',
      varient_6: 'V6: Compact Trust & Perk Deck',
    },
    icon: Compass,
    hasBottomNav: false,
  },
  {
    id: 'SignUpLogin',
    stepNumber: 3,
    label: 'Sign Up / Login (OTP & Social)',
    filePath: 'src/custom_ecommerce_frontend/screens/SignUpLogin',
    flowGroup: 'Onboarding & Authentication',
    description: 'Phone number with 6-digit OTP verification for frictionless entry, Email/Password tab, and Social Login.',
    keyElements: ['Phone + Instant OTP Keypad', 'Email / Password Toggle', 'Apple, Google & Facebook Auth'],
    variants: {
      varient_1: 'V1: Phone OTP First + Social Entry',
      varient_2: 'V2: Bento Dual Tab (Phone / Email)',
      varient_3: 'V3: Brutalist Direct Auth Ledger',
      varient_4: 'V4: Glassmorphic VIP Member Login',
      varient_5: 'V5: Atelier Split Header Auth',
      varient_6: 'V6: One-Tap Frictionless Keypad',
    },
    icon: Lock,
    hasBottomNav: false,
  },
  {
    id: 'ForgotPasswordPin',
    stepNumber: 4,
    label: 'Forgot Password / Reset PIN',
    filePath: 'src/custom_ecommerce_frontend/screens/ForgotPasswordPin',
    flowGroup: 'Onboarding & Authentication',
    description: '4-digit / 6-digit OTP entry, security verification timer, and new password / PIN creation.',
    keyElements: ['SMS / Email OTP Verification', 'New Password & Strength Meter', '4-Digit Quick PIN Setup'],
    variants: {
      varient_1: 'V1: OTP Boxes + New Password Wizard',
      varient_2: 'V2: Bento Security Recovery Shield',
      varient_3: 'V3: Brutalist Vault PIN Reset',
      varient_4: 'V4: Step-by-Step Progress Card',
      varient_5: 'V5: Atelier Security Rail Reset',
      varient_6: 'V6: Compact Biometric + PIN Reset',
    },
    icon: KeyRound,
    hasBottomNav: false,
  },

  // ============================================================================
  // 2. DISCOVERY & NAVIGATION (4 SCREENS)
  // ============================================================================
  {
    id: 'HomeDashboard',
    stepNumber: 5,
    label: 'Home Dashboard',
    filePath: 'src/custom_ecommerce_frontend/screens/HomeDashboard',
    flowGroup: 'Discovery & Navigation',
    description: 'Dynamic layout featuring promotional banners, category grid, Flash Sales / Daily Deals timer, and recommended products.',
    keyElements: ['Hero Promo Carousel', 'Category Quick Grid', 'Flash Sale Countdown', 'Recommended Feed'],
    variants: {
      varient_1: 'V1: Dynamic Promo + Flash Deals Home',
      varient_2: 'V2: Bento Modular Discovery Grid',
      varient_3: 'V3: Brutalist Streetwear Drop Feed',
      varient_4: 'V4: Luxury Editorial Lookbook Home',
      varient_5: 'V5: SuperApp High-Density Mart',
      varient_6: 'V6: Curated Card Deck & Stories',
    },
    icon: ShoppingBag,
    hasBottomNav: true,
    rootTab: 'Home',
  },
  {
    id: 'GlobalSearchResults',
    stepNumber: 6,
    label: 'Global Search & Results',
    filePath: 'src/custom_ecommerce_frontend/screens/GlobalSearchResults',
    flowGroup: 'Discovery & Navigation',
    description: 'Search bar with predictive text suggestions, recent searches, trending tags, and live results grid.',
    keyElements: ['Predictive Autocomplete', 'Recent Search Pills', 'Voice / Camera Search', 'Live Results Grid'],
    variants: {
      varient_1: 'V1: Predictive Search + Results Grid',
      varient_2: 'V2: Bento Visual Tag & Brand Finder',
      varient_3: 'V3: Brutalist Command Index Search',
      varient_4: 'V4: Split Autocomplete + Thumbnail List',
      varient_5: 'V5: Editorial Curated Search Rail',
      varient_6: 'V6: Compact Instant Filter Bar',
    },
    icon: Search,
    hasBottomNav: false,
  },
  {
    id: 'AdvancedFilterSheet',
    stepNumber: 7,
    label: 'Advanced Filter & Sort Bottom Sheet',
    filePath: 'src/custom_ecommerce_frontend/screens/AdvancedFilterSheet',
    flowGroup: 'Discovery & Navigation',
    description: 'Interactive sliders for price range, checkboxes for brands, star ratings, and sorting toggles (Low to High, Popularity).',
    keyElements: ['Dual Price Range Slider', 'Brand Multi-Select Checkboxes', 'Sort By: Popularity / Price'],
    variants: {
      varient_1: 'V1: Interactive Bottom Sheet Overlay',
      varient_2: 'V2: Bento Tile Filter Matrix',
      varient_3: 'V3: Brutalist Technical Spec Filter',
      varient_4: 'V4: Split Left-Tab Filter Drawer',
      varient_5: 'V5: Pill-Driven Quick Refiner',
      varient_6: 'V6: Compact Accordion Sort & Filter',
    },
    icon: SlidersHorizontal,
    hasBottomNav: false,
  },
  {
    id: 'CategoryNavigation',
    stepNumber: 8,
    label: 'Category Navigation',
    filePath: 'src/custom_ecommerce_frontend/screens/CategoryNavigation',
    flowGroup: 'Discovery & Navigation',
    description: 'Dedicated tab and split sidebar listing parent departments and visual sub-categories with item counts.',
    keyElements: ['Left Parent Department Rail', 'Right Sub-Category Grid', 'Seasonal Collection Banners'],
    variants: {
      varient_1: 'V1: Split Sidebar + Sub-Category Grid',
      varient_2: 'V2: Bento Visual Department Cards',
      varient_3: 'V3: Brutalist Directory Accordion',
      varient_4: 'V4: Magazine Full-Width Category Rows',
      varient_5: 'V5: Circular Icon Hub + Brand Rails',
      varient_6: 'V6: Tabbed Mega-Menu Explorer',
    },
    icon: Grid,
    hasBottomNav: true,
    rootTab: 'Category',
  },

  // ============================================================================
  // 3. PRODUCT ENGAGEMENT (3 SCREENS)
  // ============================================================================
  {
    id: 'ProductListingPage',
    stepNumber: 9,
    label: 'Product Listing Page (PLP)',
    filePath: 'src/custom_ecommerce_frontend/screens/ProductListingPage',
    flowGroup: 'Product Engagement',
    description: 'Infinite scroll 2-column grid or list view of products with quick "+ Add to Cart" toggles and active filter chips.',
    keyElements: ['Grid / List View Switcher', 'Quick +Add to Cart Button', 'Discount & Rating Badges'],
    variants: {
      varient_1: 'V1: 2-Column Infinite Grid + Quick Add',
      varient_2: 'V2: Detailed Horizontal Product List',
      varient_3: 'V3: Brutalist Bordered Catalog Ledger',
      varient_4: 'V4: Bento Asymmetric Featured Feed',
      varient_5: 'V5: Editorial Large Portrait Lookbook',
      varient_6: 'V6: High-Density Wholesale Express List',
    },
    icon: ShoppingBag,
    hasBottomNav: true,
    rootTab: 'Category',
  },
  {
    id: 'ProductDetailPage',
    stepNumber: 10,
    label: 'Product Detail Page (PDP)',
    filePath: 'src/custom_ecommerce_frontend/screens/ProductDetailPage',
    flowGroup: 'Product Engagement',
    description: 'Image carousel, price, title, variant swatches, expandable descriptions, customer reviews with photo uploads, and sticky Add to Cart / Buy Now.',
    keyElements: ['Swipeable Gallery Carousel', 'Expandable Specs & Reviews + Photos', 'Sticky Add to Cart / Buy Now'],
    variants: {
      varient_1: 'V1: Hero Carousel + Reviews + Sticky CTA',
      varient_2: 'V2: Bento Spec & Photo Review Grid',
      varient_3: 'V3: Brutalist Technical Dossier PDP',
      varient_4: 'V4: Luxury Full-Bleed Floating Sheet',
      varient_5: 'V5: Split Side-by-Side Swatch Picker',
      varient_6: 'V6: Express Social Proof + Bundle PDP',
    },
    icon: Sparkles,
    hasBottomNav: false,
  },
  {
    id: 'WishlistSaved',
    stepNumber: 11,
    label: 'Wishlist / Saved Items',
    filePath: 'src/custom_ecommerce_frontend/screens/WishlistSaved',
    flowGroup: 'Product Engagement',
    description: 'Curated grid of favorited products for future purchase with price-drop alerts and 1-tap Move to Cart.',
    keyElements: ['Favorited Products Grid', 'Price Drop Alert Badge', '1-Tap Move All to Cart'],
    variants: {
      varient_1: 'V1: 2-Col Saved Grid + Move to Bag',
      varient_2: 'V2: Bento Moodboard Collections',
      varient_3: 'V3: Brutalist Saved Archive Table',
      varient_4: 'V4: Swipeable Card List + Stock Status',
      varient_5: 'V5: Atelier Curated Wardrobe Rail',
      varient_6: 'V6: Compact Price-Alert Watchlist',
    },
    icon: Heart,
    hasBottomNav: true,
    rootTab: 'Wishlist',
  },

  // ============================================================================
  // 4. CART & CHECKOUT PIPELINE (4 SCREENS)
  // ============================================================================
  {
    id: 'ShoppingCart',
    stepNumber: 12,
    label: 'Shopping Cart',
    filePath: 'src/custom_ecommerce_frontend/screens/ShoppingCart',
    flowGroup: 'Cart & Checkout Pipeline',
    description: 'Item list, quantity increment/decrement toggles, free-shipping progress bar, promo code input, subtotal, and total calculation.',
    keyElements: ['Qty +/- Steppers', 'Promo Code Input & Discount', 'Subtotal, Delivery & Grand Total'],
    variants: {
      varient_1: 'V1: Classic Bag + Promo Code + Breakdown',
      varient_2: 'V2: Bento Cart + Free Shipping Meter',
      varient_3: 'V3: Brutalist itemized Invoice Bag',
      varient_4: 'V4: Grouped Multi-Vendor Cart',
      varient_5: 'V5: Atelier Upsell & Gift Wrap Bag',
      varient_6: 'V6: Compact Slide-Up Express Bag',
    },
    icon: ShoppingCart,
    hasBottomNav: true,
    rootTab: 'Cart',
  },
  {
    id: 'AddressBookLocation',
    stepNumber: 13,
    label: 'Address Book / Location Selection',
    filePath: 'src/custom_ecommerce_frontend/screens/AddressBookLocation',
    flowGroup: 'Cart & Checkout Pipeline',
    description: 'Interactive GPS map pin-drop integration, saved Home/Office address cards, and manual delivery form.',
    keyElements: ['Interactive Map Pin-Drop', 'Saved Home / Office Tags', 'Building, Floor & Rider Note Form'],
    variants: {
      varient_1: 'V1: Live Map Pin-Drop + Address Form',
      varient_2: 'V2: Bento Saved Address Book Cards',
      varient_3: 'V3: Brutalist Geo-Coordinates Form',
      varient_4: 'V4: Split Map Preview + Zone Picker',
      varient_5: 'V5: Atelier Concierge Delivery Sheet',
      varient_6: 'V6: Quick 1-Tap Saved Location Switcher',
    },
    icon: MapPin,
    hasBottomNav: false,
  },
  {
    id: 'CheckoutPaymentGateway',
    stepNumber: 14,
    label: 'Checkout & Payment Gateway',
    filePath: 'src/custom_ecommerce_frontend/screens/CheckoutPaymentGateway',
    flowGroup: 'Cart & Checkout Pipeline',
    description: 'Selection screen for Cash on Delivery (COD), Mobile Financial Services (bKash, Nagad, Apple Pay), or Credit/Debit Cards.',
    keyElements: ['Cash on Delivery (COD) Toggle', 'MFS (bKash / Nagad / Wallets)', 'Credit / Debit Card Vault'],
    variants: {
      varient_1: 'V1: Multi-Method Gateway (COD / MFS / Card)',
      varient_2: 'V2: Bento Payment Tiles + Visual Card',
      varient_3: 'V3: Brutalist Encrypted Bank Terminal',
      varient_4: 'V4: Tabbed Wallet & Installment Checkout',
      varient_5: 'V5: Atelier 1-Page Summary & Pay',
      varient_6: 'V6: Express Biometric Pay Sheet',
    },
    icon: CreditCard,
    hasBottomNav: false,
  },
  {
    id: 'OrderSuccess',
    stepNumber: 15,
    label: 'Order Success & Confirmation',
    filePath: 'src/custom_ecommerce_frontend/screens/OrderSuccess',
    flowGroup: 'Cart & Checkout Pipeline',
    description: 'Celebratory confirmation animation, verified Order ID receipt, estimated delivery window, and "Track Order" button.',
    keyElements: ['Animated Checkmark Crest', 'Order ID #EC-94820 & Receipt', 'Primary "Track Order" CTA'],
    variants: {
      varient_1: 'V1: Animated Checkmark + Track Order CTA',
      varient_2: 'V2: Bento Digital Receipt & ETA Card',
      varient_3: 'V3: Brutalist Thermal Barcode Ticket',
      varient_4: 'V4: Luxury Gift Box Confirmation',
      varient_5: 'V5: Map Preview + Courier Assigned',
      varient_6: 'V6: Gamified Cashback & Reward Earned',
    },
    icon: CheckCircle2,
    hasBottomNav: false,
  },

  // ============================================================================
  // 5. ACCOUNT & POST-PURCHASE (3 SCREENS)
  // ============================================================================
  {
    id: 'UserProfileWallet',
    stepNumber: 16,
    label: 'User Profile & Wallet',
    filePath: 'src/custom_ecommerce_frontend/screens/UserProfileWallet',
    flowGroup: 'Account & Post-Purchase',
    description: 'Account details, store credit / wallet balance card, loyalty points tier, saved payment methods, and app settings.',
    keyElements: ['Member Avatar & VIP Tier', 'Store Wallet Balance & Top-Up', 'Account & Security Settings'],
    variants: {
      varient_1: 'V1: Profile Header + Wallet Card + Menu',
      varient_2: 'V2: Bento Dashboard (Wallet / Points / Vouchers)',
      varient_3: 'V3: Brutalist Member Ledger & Settings',
      varient_4: 'V4: Luxury Black Card VIP Hub',
      varient_5: 'V5: Atelier Left-Rail Account Studio',
      varient_6: 'V6: Compact Settings & Privacy Switchboard',
    },
    icon: User,
    hasBottomNav: true,
    rootTab: 'Profile',
  },
  {
    id: 'OrderHistoryTracking',
    stepNumber: 17,
    label: 'Order History & Live Tracking',
    filePath: 'src/custom_ecommerce_frontend/screens/OrderHistoryTracking',
    flowGroup: 'Account & Post-Purchase',
    description: 'Timeline view of active and past orders (Placed → Processing → Shipped → Delivered) with courier contact and reorder.',
    keyElements: ['4-Stage Step Timeline (Placed→Delivered)', 'Active vs Past Orders Tabs', '1-Tap Reorder & Invoice'],
    variants: {
      varient_1: 'V1: 4-Stage Stepper + Active/Past Orders',
      varient_2: 'V2: Bento Live Map + Milestone Cards',
      varient_3: 'V3: Brutalist Logistics Manifest Log',
      varient_4: 'V4: Expandable Order Cards + Reorder',
      varient_5: 'V5: Courier Rider Card + Proof Photo',
      varient_6: 'V6: Compact Timeline & Return Portal',
    },
    icon: Package,
    hasBottomNav: false,
  },
  {
    id: 'HelpCenterSupport',
    stepNumber: 18,
    label: 'Help Center / Live Support',
    filePath: 'src/custom_ecommerce_frontend/screens/HelpCenterSupport',
    flowGroup: 'Account & Post-Purchase',
    description: 'Searchable FAQ accordion, live chat support interface with order attachment, and direct ticket / phone contact form.',
    keyElements: ['Live Support Chat Interface', 'Searchable FAQ Accordion', 'Submit Ticket / Call Support'],
    variants: {
      varient_1: 'V1: Live Chat + FAQ Accordion + Contact',
      varient_2: 'V2: Bento Self-Service Triage Hub',
      varient_3: 'V3: Brutalist Ticket & SLA Console',
      varient_4: 'V4: Conversational Support Messenger',
      varient_5: 'V5: Order-Linked Issue Resolver',
      varient_6: 'V6: Compact Help Desk & Callback Form',
    },
    icon: HelpCircle,
    hasBottomNav: false,
  },

  // ============================================================================
  // A. CLOTHING SHOP (APPAREL & FASHION — 4 SPECIALIZED SCREENS)
  // ============================================================================
  {
    id: 'ClothingSizeGuideModal',
    stepNumber: 19,
    label: 'Size Guide & Fit Modal',
    filePath: 'src/custom_ecommerce_frontend/screens/clothing/SizeGuideModal',
    flowGroup: 'A. Clothing Shop (Apparel & Fashion)',
    description: 'Dynamic size charts (CM/Inch toggle) with body measurement instructions and AI fit predictor to reduce return rates.',
    keyElements: ['CM / Inch Dynamic Size Chart', 'Chest, Waist & Hip Diagram', 'Fit Predictor (Tight/Regular/Oversized)'],
    variants: {
      varient_1: 'V1: Interactive CM/Inch Size Table + How to Measure',
      varient_2: 'V2: Bento Body Height/Weight Fit Calculator',
      varient_3: 'V3: Brutalist Tailoring Spec Sheet & Blueprint',
      varient_4: 'V4: 3D Silhouette Overlay & Garment Drape Guide',
      varient_5: 'V5: Brand-to-Brand Size Converter (Nike/Zara/Uniqlo)',
      varient_6: 'V6: Compact Slide-Up Fit Slider & Return Guarantee',
    },
    icon: SlidersHorizontal,
    hasBottomNav: false,
  },
  {
    id: 'ClothingLookbookShopTheLook',
    stepNumber: 20,
    label: 'Lookbook / "Shop the Look"',
    filePath: 'src/custom_ecommerce_frontend/screens/clothing/LookbookShopTheLook',
    flowGroup: 'A. Clothing Shop (Apparel & Fashion)',
    description: 'Full-screen editorial feed of models wearing complete outfits, with interactive hotspot tags to buy individual items or the entire look.',
    keyElements: ['Full-Screen Editorial Model Feed', 'Interactive Outfit Hotspot Pins', '1-Tap Buy Entire Outfit Bundle'],
    variants: {
      varient_1: 'V1: Full-Bleed Model Runway + Interactive Hotspot Tags',
      varient_2: 'V2: Bento Split Outfit Breakdown + Bundle Discount',
      varient_3: 'V3: Brutalist Streetwear Lookbook Zine & SKU Tags',
      varient_4: 'V4: Swipeable Vertical Video Reel + Floating Item Drawer',
      varient_5: 'V5: Stylist Curated Capsule Wardrobe Combinator',
      varient_6: 'V6: Dual-Model Day-to-Night Outfit Switcher',
    },
    icon: Sparkles,
    hasBottomNav: true,
    rootTab: 'Home',
  },
  {
    id: 'ClothingVariantSelectorPdp',
    stepNumber: 21,
    label: 'Apparel Variant Selector (Color & Size Matrix)',
    filePath: 'src/custom_ecommerce_frontend/screens/clothing/VariantSelectorPdp',
    flowGroup: 'A. Clothing Shop (Apparel & Fashion)',
    description: 'Visual fabric/color swatches and size pill-buttons on PDP, automatically disabling out-of-stock combinations with restock alerts.',
    keyElements: ['Visual Fabric & Color Swatches', 'Auto-Disabled Out-of-Stock Combinations', 'Restock Push Alert Toggle'],
    variants: {
      varient_1: 'V1: Color Swatch Rings + Size Pills (Auto-Disable OOS)',
      varient_2: 'V2: Bento Fabric Texture Zoom + Live Stock Matrix',
      varient_3: 'V3: Brutalist SKU Inventory Grid (Color × Size)',
      varient_4: 'V4: Luxury Atelier Bespoke Monogram & Fit Selector',
      varient_5: 'V5: Multi-Pack Color Bundle Builder (Pick Any 3)',
      varient_6: 'V6: Waitlist & Instant Restock Notify Bottom Sheet',
    },
    icon: ShoppingBag,
    hasBottomNav: false,
  },
  {
    id: 'ClothingReviewPhotoGallery',
    stepNumber: 22,
    label: 'Customer Review Photo Gallery (Worn On-Body)',
    filePath: 'src/custom_ecommerce_frontend/screens/clothing/ReviewPhotoGallery',
    flowGroup: 'A. Clothing Shop (Apparel & Fashion)',
    description: 'Dedicated visual gallery of user-generated photos wearing the clothing, filterable by reviewer height, weight, and ordered size.',
    keyElements: ['Masonry Buyer Photo Grid', 'Filter by Reviewer Size / Height', 'Verified Fit Feedback Badges'],
    variants: {
      varient_1: 'V1: Masonry Worn-Photo Grid + Size/Height Filter',
      varient_2: 'V2: Bento Before/After Styling & Fit Cards',
      varient_3: 'V3: Brutalist Polaroid Street-Style Proof Wall',
      varient_4: 'V4: Full-Screen Story Lightbox with "Shop Reviewer Size"',
      varient_5: 'V5: Body-Type Match Filter (Similar to My Measurements)',
      varient_6: 'V6: Video Try-On Clips + Camera Upload Reward',
    },
    icon: Heart,
    hasBottomNav: false,
  },

  // ============================================================================
  // B. GROCERY SHOP (FMCG & DAILY NEEDS — 4 SPECIALIZED SCREENS)
  // ============================================================================
  {
    id: 'GroceryQuickAddListsPlp',
    stepNumber: 23,
    label: 'Grocery Quick-Add Grid (+ / - Steppers)',
    filePath: 'src/custom_ecommerce_frontend/screens/grocery/QuickAddListsPlp',
    flowGroup: 'B. Grocery Shop (FMCG & Daily Needs)',
    description: 'High-speed FMCG aisle layout featuring prominent + and - quantity buttons and weight selectors directly on the grid.',
    keyElements: ['Direct Grid + / - Quantity Steppers', '500g / 1kg Pack Weight Toggle', 'Sticky Live Basket Savings Bar'],
    variants: {
      varient_1: 'V1: 2-Col Fresh Produce Grid with Direct +/- Steppers',
      varient_2: 'V2: Bento Aisle Shelves + Multi-Weight Pack Selector',
      varient_3: 'V3: Brutalist High-Density Pantry Checklist',
      varient_4: 'V4: Recipe-to-Cart Ingredient Bundle Quick Adder',
      varient_5: 'V5: Flash Expiry & Farm-to-Table Harvest Feed',
      varient_6: 'V6: Express 1-Handed Horizontal Counter List',
    },
    icon: ShoppingCart,
    hasBottomNav: true,
    rootTab: 'Category',
  },
  {
    id: 'GroceryDeliverySlotPicker',
    stepNumber: 24,
    label: 'Fresh Delivery Slot Picker (Calendar & Time)',
    filePath: 'src/custom_ecommerce_frontend/screens/grocery/DeliverySlotPicker',
    flowGroup: 'B. Grocery Shop (FMCG & Daily Needs)',
    description: '7-day calendar strip and 1-hour / 15-minute express time-slot selection screen to schedule chilled van deliveries.',
    keyElements: ['15-Min Express vs Scheduled Calendar', 'Morning / Afternoon / Evening Windows', 'Green Eco-Van Discount Slots'],
    variants: {
      varient_1: 'V1: Day Strip + 2-Hour Chilled Van Time Slots',
      varient_2: 'V2: Bento 15-Min Turbo vs Eco-Saver Slot Matrix',
      varient_3: 'V3: Brutalist Cold-Chain Dispatch Schedule Table',
      varient_4: 'V4: Weekly Auto-Subscribe Milk & Bread Slot Planner',
      varient_5: 'V5: Live Hub Capacity & Dynamic Surge Fee Picker',
      varient_6: 'V6: Sunrise 6AM Doorstep Silent Drop Selector',
    },
    icon: MapPin,
    hasBottomNav: false,
  },
  {
    id: 'GroceryBuyAgainReorder',
    stepNumber: 25,
    label: '"Buy Again" / Staples Reorder Dashboard',
    filePath: 'src/custom_ecommerce_frontend/screens/grocery/BuyAgainReorder',
    flowGroup: 'B. Grocery Shop (FMCG & Daily Needs)',
    description: 'Dedicated dashboard showing previous weekly staple purchases and smart restock predictions for 1-tap full-basket reordering.',
    keyElements: ['1-Tap "Refill Entire Weekly Basket"', 'Purchase Frequency Predictions', 'Past Basket History Comparison'],
    variants: {
      varient_1: 'V1: Weekly Staples Shelf + 1-Tap Refill All CTA',
      varient_2: 'V2: Bento Smart Restock Predictor (Running Low Alerts)',
      varient_3: 'V3: Brutalist Household Consumption Ledger',
      varient_4: 'V4: Saved Family Lists (Monthly Pantry / Baby / Pet)',
      varient_5: 'V5: Price-Locked Auto-Refill Subscription Manager',
      varient_6: 'V6: Swipe-to-Add Past Order Receipt Cloner',
    },
    icon: Package,
    hasBottomNav: true,
    rootTab: 'Home',
  },
  {
    id: 'GrocerySubstitutionSheet',
    stepNumber: 26,
    label: 'Out-of-Stock Substitution Preferences',
    filePath: 'src/custom_ecommerce_frontend/screens/grocery/SubstitutionSheet',
    flowGroup: 'B. Grocery Shop (FMCG & Daily Needs)',
    description: 'Interactive bottom sheet allowing users to set item-by-item rules if an item is out of stock (Best Match, Specific Brand, Call Me, or Refund).',
    keyElements: ['Replace with Best Match Toggle', 'Approve Specific Backup Product', '"Call Me" or "Cancel & Refund" Rules'],
    variants: {
      varient_1: 'V1: 3-Rule Bottom Sheet (Best Match / Call Me / Cancel)',
      varient_2: 'V2: Bento Visual Backup Item Picker Carousel',
      varient_3: 'V3: Brutalist Strict Dietary & Brand Rule Enforcer',
      varient_4: 'V4: Live Picker Chat & Real-Time Swap Approval Card',
      varient_5: 'V5: Category-Level Default Fallback Rules',
      varient_6: 'V6: Price-Cap Protected Auto-Swap Guarantee',
    },
    icon: CheckCircle2,
    hasBottomNav: false,
  },

  // ============================================================================
  // C. GADGET SHOP (ELECTRONICS & HARDWARE — 4 SPECIALIZED SCREENS)
  // ============================================================================
  {
    id: 'GadgetComparisonMatrix',
    stepNumber: 27,
    label: 'Device Comparison Matrix (Side-by-Side Specs)',
    filePath: 'src/custom_ecommerce_frontend/screens/gadget/ComparisonMatrix',
    flowGroup: 'C. Gadget Shop (Electronics & Hardware)',
    description: 'Interactive side-by-side comparison table for 2–3 devices comparing Processor, RAM, Battery mAh, Display Hz, and Benchmark scores.',
    keyElements: ['2–3 Device Side-by-Side Sticky Header', 'Highlight Differences Only Toggle', 'CPU / Battery / Camera Score Bars'],
    variants: {
      varient_1: 'V1: Side-by-Side 2-Device Spec Table + Winner Badges',
      varient_2: 'V2: Bento Benchmark Radar & Battery Endurance Bars',
      varient_3: 'V3: Brutalist Hardware Engineering Datasheet Diff',
      varient_4: 'V4: 3-Device Sticky Column Scroll + Swap Device Modal',
      varient_5: 'V5: Use-Case Winner Advisor (Gaming vs Photography)',
      varient_6: 'V6: Price-to-Performance Value Ratio Matrix',
    },
    icon: Grid,
    hasBottomNav: false,
  },
  {
    id: 'GadgetEmiFinancingCalculator',
    stepNumber: 28,
    label: 'EMI & Bank Financing Calculator Modal',
    filePath: 'src/custom_ecommerce_frontend/screens/gadget/EmiFinancingCalculator',
    flowGroup: 'C. Gadget Shop (Electronics & Hardware)',
    description: 'Interactive financing calculator on PDP showing monthly breakdown costs across banks, credit cards, tenure (3–24 months), and 0% EMI plans.',
    keyElements: ['Bank & Credit Card Selector', '3 / 6 / 12 / 24 Month Tenure Slider', '0% Interest vs Processing Fee Breakdown'],
    variants: {
      varient_1: 'V1: Multi-Bank Credit Card EMI Table (3–24 Months)',
      varient_2: 'V2: Bento Down-Payment Slider + Monthly Cost Ring',
      varient_3: 'V3: Brutalist APR & Amortization Financial Ledger',
      varient_4: 'V4: Cardless MFS / BNPL Split-Pay Eligibility Checker',
      varient_5: 'V5: Trade-In Old Device + Remaining EMI Calculator',
      varient_6: 'V6: Instant Pre-Approved Bank Limit Matcher',
    },
    icon: CreditCard,
    hasBottomNav: false,
  },
  {
    id: 'GadgetDetailedTechSpecsTab',
    stepNumber: 29,
    label: 'Detailed Tech Specs Deep-Dive (Categorized)',
    filePath: 'src/custom_ecommerce_frontend/screens/gadget/DetailedTechSpecsTab',
    flowGroup: 'C. Gadget Shop (Electronics & Hardware)',
    description: 'Deeply nested technical specification viewer separating hardware into Display, Chipset, Camera Optics, Connectivity, and Box Contents.',
    keyElements: ['Categorized Spec Accordions (Display/CPU/Camera)', 'What’s in the Box Illustrated List', 'Search Inside Technical Specs'],
    variants: {
      varient_1: 'V1: Categorized Nested Spec List (Display / CPU / Camera)',
      varient_2: 'V2: Bento X-Ray Internal Architecture Callout Grid',
      varient_3: 'V3: Brutalist Raw Lab Telemetry & Geekbench Readout',
      varient_4: 'V4: Interactive Port & Button Hardware Diagram',
      varient_5: 'V5: "What’s in the Box" + Compatible Accessories Tree',
      varient_6: 'V6: Searchable Spec Filter + Download PDF Datasheet',
    },
    icon: Compass,
    hasBottomNav: false,
  },
  {
    id: 'GadgetWarrantyServicePolicy',
    stepNumber: 30,
    label: 'Official Warranty & Service Center Locator',
    filePath: 'src/custom_ecommerce_frontend/screens/gadget/WarrantyServicePolicy',
    flowGroup: 'C. Gadget Shop (Electronics & Hardware)',
    description: 'Dedicated trust portal detailing 7-day replacement windows, official brand warranty serial lookup, AppleCare/Protection plans, and local repair centers.',
    keyElements: ['IMEI / Serial Official Warranty Verifier', '1-Year Brand vs Extended AppleCare+ Plan', 'Authorized Service Center Map & Hours'],
    variants: {
      varient_1: 'V1: Official Warranty Badge + Return Policy + Repair Centers',
      varient_2: 'V2: Bento Extended Protection Plan (Liquid/Screen Damage)',
      varient_3: 'V3: Brutalist IMEI Serial Authenticator & SLA Contract',
      varient_4: 'V4: Interactive Authorized Service Center Map & Queue',
      varient_5: 'V5: Doorstep Courier Repair Pickup Booking Wizard',
      varient_6: 'V6: Digital Warranty Certificate Vault & Claim Tracker',
    },
    icon: ShieldCheck,
    hasBottomNav: false,
  },
];
