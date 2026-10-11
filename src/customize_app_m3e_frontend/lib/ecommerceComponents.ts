import {
  Doc,
  Frame,
  Group,
  Item,
  Kind,
  PHONE_H,
  PHONE_MARGIN,
  PHONE_W,
  Variant,
  makeItem,
  uid,
} from "./tokens";
import { buildClothShopFullAppDoc } from "./clothShopFullAppDoc";
export { buildClothShopFullAppDoc };

export type EcommerceCategoryKey =
  | "products"
  | "banners"
  | "navigation"
  | "search"
  | "cart"
  | "details"
  | "shipping"
  | "account";

export type EcommerceCategory = {
  key: EcommerceCategoryKey;
  label: string;
  icon: string;
  description: string;
};

export const ECOMMERCE_CATEGORIES: EcommerceCategory[] = [
  {
    key: "products",
    label: "Products & Grids",
    icon: "shopping_bag",
    description: "Product cards, 2-column grids, horizontal list tiles, and deals",
  },
  {
    key: "banners",
    label: "Banners & Promotions",
    icon: "local_offer",
    description: "Hero sales banners, flash deals countdown, vouchers, trust badges",
  },
  {
    key: "navigation",
    label: "Store Navigation",
    icon: "storefront",
    description: "E-Commerce headers, category stories, pill filters, shopping bottom bars",
  },
  {
    key: "search",
    label: "Search & Filters",
    icon: "search",
    description: "Store search bars, filter chips, sort options, price sliders",
  },
  {
    key: "cart",
    label: "Cart & Checkout",
    icon: "shopping_cart",
    description: "Cart item cards, order summaries, voucher inputs, checkout CTAs",
  },
  {
    key: "details",
    label: "Product Details",
    icon: "style",
    description: "Color swatches, size pickers, price savings headers, review summaries",
  },
  {
    key: "shipping",
    label: "Shipping & Payment",
    icon: "local_shipping",
    description: "Delivery address cards, payment method selectors, tracking steppers",
  },
  {
    key: "account",
    label: "Account & Loyalty",
    icon: "person",
    description: "VIP loyalty cards, order history cards, profile badges",
  },
];

export type EcommercePreset = {
  id: string;
  title: string;
  category: EcommerceCategoryKey;
  icon: string;
  badge?: string;
  desc: string;
  axis?: "x" | "y";
  buildItems: () => Item[];
};

export const ECOMMERCE_PRESETS: EcommercePreset[] = [
  // 1. PRODUCTS & GRIDS
  {
    id: "ecom_product_card_featured",
    title: "Product Card (Featured)",
    category: "products",
    icon: "crop_portrait",
    badge: "Card",
    desc: "Elevated card with product image, headline, price and rating",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Nike Air Max Pulse 2026",
        supporting: "$159.00 · ★ 4.9 (842 reviews) · In Stock",
        icon: "shopping_bag",
        variant: "elevated",
        size: 380,
        imagePos: "top",
        imageSize: 180,
        src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
        note: "Featured product card with high-res photo, pricing and reviews",
      },
    ],
  },
  {
    id: "ecom_product_card_discount",
    title: "Product Card (Sale / 30% OFF)",
    category: "products",
    icon: "percent",
    badge: "Sale",
    desc: "Special discount card with strikethrough price and savings tag",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Ultra Pro Smartwatch Series X",
        supporting: "$199.00 · Was $299.00 (-33% OFF) · Free Delivery",
        icon: "watch",
        variant: "filled",
        fill: "surfaceContainerHigh",
        size: 380,
        imagePos: "top",
        imageSize: 170,
        src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
        note: "Flash discount product showcase with promotional price reduction",
      },
    ],
  },
  {
    id: "ecom_product_grid_pair",
    title: "2-Column Product Grid",
    category: "products",
    icon: "grid_view",
    badge: "Grid",
    axis: "x",
    desc: "Side-by-side product cards for marketplace feeds",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Sony ANC Earbuds",
        supporting: "$89.00 · ★ 4.8",
        icon: "headphones",
        variant: "elevated",
        size: 184,
        imagePos: "top",
        imageSize: 110,
        src: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: uid(),
        kind: "card",
        label: "Fast MagSafe Hub",
        supporting: "$49.00 · ★ 4.7",
        icon: "bolt",
        variant: "elevated",
        size: 184,
        imagePos: "top",
        imageSize: 110,
        src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "ecom_product_horizontal_tile",
    title: "Horizontal Product Tile",
    category: "products",
    icon: "view_stream",
    badge: "Tile",
    desc: "Compact horizontal row with thumbnail, price, and add-to-cart",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Minimalist Leather Backpack",
        supporting: "$120.00 · In Stock (3 colors) · Ships today",
        icon: "backpack",
        variant: "outlined",
        size: 380,
        imagePos: "leading",
        imageSize: 90,
        src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "ecom_flash_deal_card",
    title: "Flash Deal Countdown Card",
    category: "products",
    icon: "timer",
    badge: "Deal",
    desc: "Urgency deal banner with live countdown timer and discount",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "⚡ FLASH SALE · Ends in 02 : 14 : 35",
        supporting: "Up to 60% OFF top audio, wearables & sneakers · Limited Stock",
        icon: "local_fire_department",
        variant: "tonal",
        fill: "secondaryContainer",
        size: 380,
      },
    ],
  },

  // 2. BANNERS & PROMOTIONS
  {
    id: "ecom_hero_sales_banner",
    title: "Hero Promotional Sales Banner",
    category: "banners",
    icon: "campaign",
    badge: "Banner",
    desc: "Full-width promotional banner with campaign headline and CTA",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "New Autumn Season Collection 2026",
        supporting: "Discover urban streetwear & sustainable essentials with extra 20% off",
        icon: "auto_awesome",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
        imagePos: "top",
        imageSize: 130,
        src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "ecom_coupon_voucher_card",
    title: "Discount Coupon / Promo Voucher",
    category: "banners",
    icon: "confirmation_number",
    badge: "Voucher",
    desc: "Coupon tile with voucher code 'BONGO25' and validity terms",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "GET $25 OFF · CODE: BONGO25",
        supporting: "Valid on all apparel & shoes above $100 · 3 days remaining",
        icon: "loyalty",
        variant: "outlined",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_trust_badges_strip",
    title: "Trust Badges & Free Delivery Strip",
    category: "banners",
    icon: "verified_user",
    badge: "Trust",
    axis: "x",
    desc: "Consumer trust assurances: Free Shipping, Returns, Safe Pay",
    buildItems: () => [
      {
        id: uid(),
        kind: "chip",
        label: "Free Delivery $50+",
        icon: "local_shipping",
        variant: "tonal",
      },
      {
        id: uid(),
        kind: "chip",
        label: "30-Day Returns",
        icon: "restart_alt",
        variant: "tonal",
      },
      {
        id: uid(),
        kind: "chip",
        label: "100% Secure",
        icon: "lock",
        variant: "tonal",
      },
    ],
  },

  // 3. STORE NAVIGATION & HEADERS
  {
    id: "ecom_top_app_bar",
    title: "E-Commerce Top App Bar",
    category: "navigation",
    icon: "web_asset",
    badge: "Header",
    desc: "Store header with brand title, search launcher, and shopping bag",
    buildItems: () => [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Apex Commerce Store",
        icon: "menu",
        icon2: "shopping_bag",
        variant: "filled",
        size: PHONE_W,
        note: "Header with main menu drawer, store brand and active cart counter",
      },
    ],
  },
  {
    id: "ecom_category_bubbles",
    title: "Category Story Bubbles",
    category: "navigation",
    icon: "view_carousel",
    badge: "Stories",
    desc: "Circular category carousel: Fashion, Tech, Shoes, Beauty, Deals",
    buildItems: () => [
      {
        id: uid(),
        kind: "carousel",
        label: "Categories",
        icon: "grid_view",
        variant: "filled",
        size: 380,
        count: 5,
        tabs: [
          { icon: "checkroom", label: "Fashion", src: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&auto=format&fit=crop&q=80" },
          { icon: "devices", label: "Tech", src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80" },
          { icon: "roller_skating", label: "Footwear", src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80" },
          { icon: "spa", label: "Beauty", src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&auto=format&fit=crop&q=80" },
          { icon: "local_fire_department", label: "Deals", src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&auto=format&fit=crop&q=80" },
        ],
      },
    ],
  },
  {
    id: "ecom_category_pill_tabs",
    title: "Category Pill Tabs Row",
    category: "navigation",
    icon: "tab",
    badge: "Tabs",
    desc: "Top category tabs: All, Trending, Apparel, Shoes, Gadgets, Sale",
    buildItems: () => [
      {
        id: uid(),
        kind: "tabs",
        label: "Catalog Tabs",
        icon: null,
        variant: "filled",
        size: 380,
        tabs: [
          { icon: "all_inclusive", label: "All Items" },
          { icon: "trending_up", label: "Trending" },
          { icon: "checkroom", label: "Apparel" },
          { icon: "headphones", label: "Electronics" },
          { icon: "local_offer", label: "Flash Sale" },
        ],
      },
    ],
  },
  {
    id: "ecom_bottom_navigation",
    title: "E-Commerce Bottom Navigation",
    category: "navigation",
    icon: "dock",
    badge: "Navbar",
    desc: "Full shopping bottom bar: Home, Catalog, Wishlist, Cart (3), Account",
    buildItems: () => [
      {
        id: uid(),
        kind: "bottomNav",
        label: "",
        icon: null,
        variant: "filled",
        size: PHONE_W,
        tabs: [
          { icon: "home", label: "Home" },
          { icon: "grid_view", label: "Catalog" },
          { icon: "favorite", label: "Wishlist" },
          { icon: "shopping_cart", label: "Cart (3)" },
          { icon: "person", label: "Profile" },
        ],
        selected: 0,
      },
    ],
  },

  // 4. SEARCH & FILTERS
  {
    id: "ecom_search_bar",
    title: "Store Search & Filter Bar",
    category: "search",
    icon: "search",
    badge: "Search",
    desc: "Search input with barcode scan and filter preferences button",
    buildItems: () => [
      {
        id: uid(),
        kind: "searchBar",
        label: "Search 50,000+ products, brands...",
        icon: "search",
        icon2: "tune",
        variant: "tonal",
        size: 380,
        note: "Store search with instant keyword autocomplete and filter modal",
      },
    ],
  },
  {
    id: "ecom_filter_chips_row",
    title: "Filter & Sort Chips Row",
    category: "search",
    icon: "filter_alt",
    badge: "Filters",
    axis: "x",
    desc: "Filter quick chips: Price < $100, ★ 4.5+, Free Delivery, In Stock",
    buildItems: () => [
      {
        id: uid(),
        kind: "chip",
        label: "Sort: Popular",
        icon: "swap_vert",
        variant: "tonal",
        checked: true,
      },
      {
        id: uid(),
        kind: "chip",
        label: "Under $100",
        icon: "attach_money",
        variant: "outlined",
      },
      {
        id: uid(),
        kind: "chip",
        label: "★ 4.5+ Rating",
        icon: "star",
        variant: "outlined",
      },
      {
        id: uid(),
        kind: "chip",
        label: "In Stock Only",
        icon: "check_circle",
        variant: "outlined",
      },
    ],
  },
  {
    id: "ecom_price_slider",
    title: "Price Range Filter Slider",
    category: "search",
    icon: "linear_scale",
    badge: "Slider",
    desc: "Price budget adjuster from $0 to $500",
    buildItems: () => [
      {
        id: uid(),
        kind: "slider",
        label: "Price Filter: $20 – $240",
        icon: "tune",
        variant: "filled",
        size: 380,
        value: 48,
      },
    ],
  },

  // 5. CART & CHECKOUT
  {
    id: "ecom_cart_item_tile",
    title: "Cart Item Row with Quantity",
    category: "cart",
    icon: "production_quantity_limits",
    badge: "Cart",
    desc: "Cart item with item image, variant size/color, price and quantity",
    buildItems: () => [
      {
        id: uid(),
        kind: "listItem",
        label: "Classic Oversized Denim Jacket",
        supporting: "$79.00 · Size M · Indigo Blue · Qty: 2 ($158.00)",
        icon: "checkroom",
        icon2: "delete",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_order_summary_card",
    title: "Order Summary & Price Breakdown",
    category: "cart",
    icon: "receipt_long",
    badge: "Summary",
    desc: "Subtotal, Estimated Tax, Free Delivery, Voucher, and Grand Total",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Order Summary (3 items)",
        supporting: "Subtotal: $237.00\nTax: $18.96 · Shipping: FREE\nCoupon 'BONGO25': -$25.00\nTotal Due: $230.96",
        icon: "receipt_long",
        variant: "elevated",
        size: 380,
        fill: "surfaceContainerHigh",
      },
    ],
  },
  {
    id: "ecom_promo_code_input",
    title: "Promo Code / Gift Voucher Field",
    category: "cart",
    icon: "tag",
    badge: "Input",
    desc: "Text field for entering promo coupon codes with apply action",
    buildItems: () => [
      {
        id: uid(),
        kind: "textField",
        label: "Promo or Gift Voucher Code",
        supporting: "Enter code (e.g. BONGO20 for 20% off)",
        icon: "confirmation_number",
        variant: "outlined",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_floating_checkout_bar",
    title: "Floating Checkout CTA Button",
    category: "cart",
    icon: "shopping_cart_checkout",
    badge: "Checkout",
    desc: "High-contrast action button: Proceed to Checkout with order total",
    buildItems: () => [
      {
        id: uid(),
        kind: "button",
        label: "Proceed to Checkout · $230.96",
        icon: "shopping_bag_checkout",
        variant: "filled",
        size: 380,
        size2: 56,
        note: "Triggers secure payment and checkout gateway",
      },
    ],
  },

  // 6. PRODUCT DETAILS & OPTIONS
  {
    id: "ecom_color_swatches",
    title: "Color Swatch Selector Row",
    category: "details",
    icon: "palette",
    badge: "Color",
    axis: "x",
    desc: "Color variation swatches: Midnight, Royal Navy, Sunset Coral, Emerald",
    buildItems: () => [
      { id: uid(), kind: "chip", label: "Midnight Black", icon: "dark_mode", variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "Navy Blue", icon: "water_drop", variant: "outlined" },
      { id: uid(), kind: "chip", label: "Sunset Coral", icon: "flare", variant: "outlined" },
      { id: uid(), kind: "chip", label: "Emerald Green", icon: "eco", variant: "outlined" },
    ],
  },
  {
    id: "ecom_size_selector",
    title: "Size Selector Chips",
    category: "details",
    icon: "straighten",
    badge: "Sizes",
    axis: "x",
    desc: "Garment / footwear size options: S, M, L, XL, XXL",
    buildItems: () => [
      { id: uid(), kind: "chip", label: "US 8 / S", icon: null, variant: "outlined" },
      { id: uid(), kind: "chip", label: "US 9 / M", icon: null, variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "US 10 / L", icon: null, variant: "outlined" },
      { id: uid(), kind: "chip", label: "US 11 / XL", icon: null, variant: "outlined" },
      { id: uid(), kind: "chip", label: "US 12 / XXL", icon: null, variant: "outlined" },
    ],
  },
  {
    id: "ecom_quantity_counter",
    title: "Quantity Stepper (- 1 +)",
    category: "details",
    icon: "add_circle_outline",
    badge: "Stepper",
    axis: "x",
    desc: "Interactive item quantity adjustment buttons",
    buildItems: () => [
      { id: uid(), kind: "button", label: "-", icon: null, variant: "tonal", size: 52 },
      { id: uid(), kind: "button", label: "Qty: 1", icon: null, variant: "outlined", size: 100 },
      { id: uid(), kind: "button", label: "+", icon: null, variant: "tonal", size: 52 },
    ],
  },
  {
    id: "ecom_dual_cta_buttons",
    title: "Add to Cart & Buy Now Dual CTAs",
    category: "details",
    icon: "shopping_bag",
    badge: "Dual CTA",
    axis: "x",
    desc: "Pair of primary action buttons: Tonal Add to Cart + Filled Buy Now",
    buildItems: () => [
      {
        id: uid(),
        kind: "button",
        label: "Add to Cart",
        icon: "add_shopping_cart",
        variant: "tonal",
        size: 184,
        size2: 52,
      },
      {
        id: uid(),
        kind: "button",
        label: "Buy Now",
        icon: "bolt",
        variant: "filled",
        size: 184,
        size2: 52,
      },
    ],
  },
  {
    id: "ecom_reviews_summary_card",
    title: "Customer Reviews & Rating Summary",
    category: "details",
    icon: "star",
    badge: "Reviews",
    desc: "Rating breakdown: 4.9 ★ (1,420 Reviews) with verified buyer quote",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "4.9 ★★★★★ (1,420 Verified Reviews)",
        supporting: "“Incredible build quality and fast 2-day delivery. Fits true to size!” — Marcus V., Verified Buyer",
        icon: "verified",
        variant: "tonal",
        size: 380,
      },
    ],
  },

  // 7. SHIPPING & PAYMENT
  {
    id: "ecom_shipping_address_card",
    title: "Shipping Delivery Address Card",
    category: "shipping",
    icon: "home_pin",
    badge: "Address",
    desc: "Saved delivery destination with customer contact and edit trigger",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Deliver to Home (Default)",
        supporting: "Alex Johnson · +1 (555) 789-2045\n742 Evergreen Terrace, Springfield, OR 97477",
        icon: "location_on",
        variant: "elevated",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_payment_method_selector",
    title: "Payment Method Selector",
    category: "shipping",
    icon: "credit_card",
    badge: "Payment",
    desc: "Payment choice card: Apple Pay, Visa, PayPal, Cash on Delivery",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Apple Pay (•••• 4920)",
        supporting: "Instant biometric checkout · Also supports Visa, MC, PayPal, COD",
        icon: "contactless",
        variant: "outlined",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_delivery_tracking_stepper",
    title: "Order Delivery Tracking Stepper",
    category: "shipping",
    icon: "local_shipping",
    badge: "Tracking",
    desc: "Live order milestones: Confirmed -> Dispatched -> Out for Delivery",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Package In Transit · Arriving Today by 5 PM",
        supporting: "1. Order Confirmed ✓\n2. Dispatched from Warehouse ✓\n3. Out for Delivery with Courier 🚚\n4. Delivered",
        icon: "local_shipping",
        variant: "tonal",
        size: 380,
      },
    ],
  },

  // 8. ACCOUNT & LOYALTY
  {
    id: "ecom_vip_loyalty_card",
    title: "VIP Loyalty Points & Tier Card",
    category: "account",
    icon: "workspace_premium",
    badge: "Loyalty",
    desc: "Member rewards card: Gold VIP tier, points balance, and perks",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Alex Morgan · Gold VIP Member",
        supporting: "2,450 Reward Points ($24.50 store credit) · Free Express Shipping",
        icon: "military_tech",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_order_history_card",
    title: "Recent Order History Card",
    category: "account",
    icon: "history",
    badge: "Orders",
    desc: "Previous order summary with date, status, item count, and reorder",
    buildItems: () => [
      {
        id: uid(),
        kind: "listItem",
        label: "Order #APX-98241 · Delivered Oct 8",
        supporting: "$159.00 · Nike Air Max Pulse (1 item) · Track / Reorder",
        icon: "package_2",
        icon2: "chevron_right",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },
];

/* =========================================================================
 * REAL PROFESSIONAL APP TEMPLATES
 * 1. Personal Money Management App (Complete 4 screens)
 * 2. Professional E-Commerce App (Complete 4 screens)
 * ========================================================================= */

export function buildMoneyManagementAppDoc(): Doc {
  const FRAME_W = PHONE_W;
  const FRAME_H = PHONE_H;
  const GAP_X = 80;

  // Screen 1: Dashboard (Wallet & Balance)
  const f1: Frame = {
    id: "money_dashboard",
    name: "Wallet Dashboard",
    x: 0,
    y: 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Personal finance overview with net total balance, quick transactions, and recent spending history",
  };

  // Screen 2: Analytics (Spending & Monthly Budget)
  const f2: Frame = {
    id: "money_analytics",
    name: "Spending Analytics",
    x: FRAME_W + GAP_X,
    y: 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Monthly budget tracking and detailed category expense breakdown with charts",
  };

  // Screen 3: Transfer & Payment
  const f3: Frame = {
    id: "money_transfer",
    name: "Transfer Funds",
    x: (FRAME_W + GAP_X) * 2,
    y: 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Instant money transfer to contacts and bill payments with category tagging",
  };

  // Screen 4: Savings Goals & Cards
  const f4: Frame = {
    id: "money_goals",
    name: "Savings & Vaults",
    x: (FRAME_W + GAP_X) * 3,
    y: 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Target savings vaults, financial goals progress, and connected payment cards",
  };

  const frames = [f1, f2, f3, f4];
  const groups: Group[] = [];

  // ==================== SCREEN 1 GROUPS (Wallet Dashboard) ====================
  // Top App Bar
  groups.push({
    id: uid(),
    x: f1.x,
    y: f1.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "FinTrack Wallet",
        icon: "account_balance_wallet",
        icon2: "notifications",
        variant: "filled",
        size: FRAME_W,
      },
    ],
  });

  // Net Balance Hero Card
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Total Net Balance · $34,580.00",
        supporting: "Monthly Income: +$5,420.00 · Expenses: -$2,180.00 (+18.4% saved this month)",
        icon: "trending_up",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
      },
    ],
  });

  // Quick Action Buttons
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 200,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Send",
        icon: "arrow_upward",
        variant: "filled",
        size: 88,
        action: { to: "money_transfer", transition: "slide" },
      },
      {
        id: uid(),
        kind: "button",
        label: "Request",
        icon: "arrow_downward",
        variant: "tonal",
        size: 92,
      },
      {
        id: uid(),
        kind: "button",
        label: "Pay Bills",
        icon: "credit_card",
        variant: "tonal",
        size: 96,
      },
      {
        id: uid(),
        kind: "button",
        label: "Analytics",
        icon: "bar_chart",
        variant: "outlined",
        size: 92,
        action: { to: "money_analytics", transition: "slide" },
      },
    ],
  });

  // Section Header: Recent Transactions
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 276,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "chip",
        label: "Recent Transactions (This Week)",
        icon: "receipt_long",
        variant: "tonal",
      },
    ],
  });

  // Transaction List Items
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 328,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "listItem",
        label: "Whole Foods Market",
        supporting: "-$84.50 · Groceries & Food · Today 2:15 PM",
        icon: "shopping_cart",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Tech Enterprise Salary",
        supporting: "+$5,200.00 · Direct Deposit Income · Yesterday",
        icon: "account_balance",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Electric Power Utility",
        supporting: "-$125.40 · Household Bills · Oct 9",
        icon: "bolt",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Netflix 4K Ultra Plan",
        supporting: "-$19.99 · Digital Entertainment · Oct 8",
        icon: "movie",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Uber Rides & Transit",
        supporting: "-$32.40 · Transport & Gas · Oct 7",
        icon: "directions_car",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  });

  // Screen 1 Bottom Navigation
  groups.push({
    id: uid(),
    x: f1.x,
    y: f1.y + FRAME_H - 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "bottomNav",
        label: "",
        icon: null,
        variant: "filled",
        size: FRAME_W,
        tabs: [
          { icon: "dashboard", label: "Dashboard" },
          { icon: "pie_chart", label: "Analytics" },
          { icon: "swap_horiz", label: "Transfer" },
          { icon: "savings", label: "Goals" },
          { icon: "credit_card", label: "Cards" },
        ],
        selected: 0,
        actions: {
          "tab:1": { to: "money_analytics", transition: "fade" },
          "tab:2": { to: "money_transfer", transition: "fade" },
          "tab:3": { to: "money_goals", transition: "fade" },
        },
      },
    ],
  });

  // ==================== SCREEN 2 GROUPS (Spending Analytics) ====================
  // Top App Bar
  groups.push({
    id: uid(),
    x: f2.x,
    y: f2.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Spending & Budget",
        icon: "arrow_back",
        icon2: "filter_list",
        variant: "filled",
        size: FRAME_W,
        action: { to: "money_dashboard", transition: "slideLeft" },
      },
    ],
  });

  // Monthly Budget Progress Card
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "October 2026 Monthly Budget",
        supporting: "Spent $2,180.00 of $4,000.00 Limit (54.5% used · $1,820 remaining)",
        icon: "savings",
        variant: "elevated",
        size: 380,
      },
    ],
  });

  // Budget Linear Progress Indicator
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 196,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "linearProgress",
        label: "Budget Used",
        icon: null,
        variant: "filled",
        size: 380,
        value: 55,
      },
    ],
  });

  // Category Filter Chips
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 226,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "Monthly", icon: "calendar_month", variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "Weekly", icon: "view_week", variant: "outlined" },
      { id: uid(), kind: "chip", label: "Yearly", icon: "calendar_today", variant: "outlined" },
    ],
  });

  // Spending Category Breakdown
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 286,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "listItem",
        label: "Housing & Utilities · $980.00 (45%)",
        supporting: "Rent, electric, water & fiber internet",
        icon: "home",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Food & Groceries · $520.00 (24%)",
        supporting: "Supermarkets, farmers market, coffee shops",
        icon: "restaurant",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Transportation & Gas · $280.00 (13%)",
        supporting: "Gasoline, highway tolls, train pass, Uber",
        icon: "directions_car",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Shopping & Lifestyle · $220.00 (10%)",
        supporting: "Clothing, gadgets, personal care",
        icon: "shopping_bag",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Entertainment & Subs · $180.00 (8%)",
        supporting: "Streaming media, cinema, gym membership",
        icon: "sports_esports",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  });

  // Screen 2 Bottom Navigation
  groups.push({
    id: uid(),
    x: f2.x,
    y: f2.y + FRAME_H - 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "bottomNav",
        label: "",
        icon: null,
        variant: "filled",
        size: FRAME_W,
        tabs: [
          { icon: "dashboard", label: "Dashboard" },
          { icon: "pie_chart", label: "Analytics" },
          { icon: "swap_horiz", label: "Transfer" },
          { icon: "savings", label: "Goals" },
          { icon: "credit_card", label: "Cards" },
        ],
        selected: 1,
        actions: {
          "tab:0": { to: "money_dashboard", transition: "fade" },
          "tab:2": { to: "money_transfer", transition: "fade" },
          "tab:3": { to: "money_goals", transition: "fade" },
        },
      },
    ],
  });

  // ==================== SCREEN 3 GROUPS (Transfer Funds) ====================
  // Top App Bar
  groups.push({
    id: uid(),
    x: f3.x,
    y: f3.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Send & Transfer Money",
        icon: "arrow_back",
        icon2: "qr_code_scanner",
        variant: "filled",
        size: FRAME_W,
        action: { to: "money_dashboard", transition: "slideLeft" },
      },
    ],
  });

  // Transfer Amount Big Input
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Transfer Amount: $250.00",
        supporting: "Available Checking Balance: $14,240.00 (No transfer fees)",
        icon: "payments",
        variant: "filled",
        fill: "secondaryContainer",
        size: 380,
      },
    ],
  });

  // Recipient Input Field
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 196,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "textField",
        label: "Recipient Name, @tag, or Phone",
        supporting: "e.g. Sarah Miller (@sarahm) or +1 555-0192",
        icon: "person",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  // From Account Dropdown
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 288,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "select",
        label: "Funding Source: Primary Checking (•••• 7821)",
        supporting: "Instant transfer supported via Real-Time Rail",
        icon: "account_balance",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  // Category Tag Chips
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 380,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "Dinner / Split", icon: "restaurant", variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "Rent & Bills", icon: "home", variant: "outlined" },
      { id: uid(), kind: "chip", label: "Gift", icon: "card_giftcard", variant: "outlined" },
      { id: uid(), kind: "chip", label: "Other", icon: "more_horiz", variant: "outlined" },
    ],
  });

  // Confirm Transfer Button
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 450,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Authorize & Send $250.00 Now",
        icon: "send",
        variant: "filled",
        size: 380,
        size2: 56,
        action: { to: "money_dashboard", transition: "fade" },
      },
    ],
  });

  // Screen 3 Bottom Navigation
  groups.push({
    id: uid(),
    x: f3.x,
    y: f3.y + FRAME_H - 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "bottomNav",
        label: "",
        icon: null,
        variant: "filled",
        size: FRAME_W,
        tabs: [
          { icon: "dashboard", label: "Dashboard" },
          { icon: "pie_chart", label: "Analytics" },
          { icon: "swap_horiz", label: "Transfer" },
          { icon: "savings", label: "Goals" },
          { icon: "credit_card", label: "Cards" },
        ],
        selected: 2,
        actions: {
          "tab:0": { to: "money_dashboard", transition: "fade" },
          "tab:1": { to: "money_analytics", transition: "fade" },
          "tab:3": { to: "money_goals", transition: "fade" },
        },
      },
    ],
  });

  // ==================== SCREEN 4 GROUPS (Savings Goals & Vaults) ====================
  // Top App Bar
  groups.push({
    id: uid(),
    x: f4.x,
    y: f4.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Savings Vaults & Goals",
        icon: "arrow_back",
        icon2: "add_circle",
        variant: "filled",
        size: FRAME_W,
        action: { to: "money_dashboard", transition: "slideLeft" },
      },
    ],
  });

  // Vault 1: Emergency Fund
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 80,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "🛡️ Emergency Safety Vault",
        supporting: "$8,500.00 saved of $10,000.00 Goal (85% completed · Auto-deposits $250/mo)",
        icon: "security",
        variant: "elevated",
        size: 380,
      },
      {
        id: uid(),
        kind: "linearProgress",
        label: "85%",
        icon: null,
        variant: "filled",
        size: 380,
        value: 85,
      },
    ],
  });

  // Vault 2: New Car Fund
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 220,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "🚗 Tesla Model Y Savings Goal",
        supporting: "$15,200.00 saved of $30,000.00 Goal (50.6% completed · Target Dec 2026)",
        icon: "electric_car",
        variant: "elevated",
        size: 380,
      },
      {
        id: uid(),
        kind: "linearProgress",
        label: "51%",
        icon: null,
        variant: "filled",
        size: 380,
        value: 51,
      },
    ],
  });

  // Vault 3: Vacation Travel
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 360,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "🌴 Summer Vacation in Bali",
        supporting: "$2,400.00 saved of $3,000.00 Goal (80% completed · Flights booked)",
        icon: "flight_takeoff",
        variant: "elevated",
        size: 380,
      },
      {
        id: uid(),
        kind: "linearProgress",
        label: "80%",
        icon: null,
        variant: "filled",
        size: 380,
        value: 80,
      },
    ],
  });

  // Create New Goal Button
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 510,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "+ Create New Savings Goal Vault",
        icon: "add",
        variant: "filled",
        size: 380,
        size2: 52,
      },
    ],
  });

  // Screen 4 Bottom Navigation
  groups.push({
    id: uid(),
    x: f4.x,
    y: f4.y + FRAME_H - 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "bottomNav",
        label: "",
        icon: null,
        variant: "filled",
        size: FRAME_W,
        tabs: [
          { icon: "dashboard", label: "Dashboard" },
          { icon: "pie_chart", label: "Analytics" },
          { icon: "swap_horiz", label: "Transfer" },
          { icon: "savings", label: "Goals" },
          { icon: "credit_card", label: "Cards" },
        ],
        selected: 3,
        actions: {
          "tab:0": { to: "money_dashboard", transition: "fade" },
          "tab:1": { to: "money_analytics", transition: "fade" },
          "tab:2": { to: "money_transfer", transition: "fade" },
        },
      },
    ],
  });

  return {
    title: "Personal Money Management App",
    brief: "Comprehensive personal money management app featuring net balance overview, spending analytics, fast fund transfers, and savings goal vaults.",
    frame: "phone",
    platform: "android",
    paletteKey: "teal",
    frames,
    groups,
  };
}

/**
 * Loads the complete 27-screen Cloth Shop Application (Define Atelier).
 * Every screen is loaded onto the main canvas as a fully editable, re-orderable,
 * component-customizable Frame with full Expo Router .ZIP and APK export support.
 */
export function buildEcommerceAppDoc(): Doc {
  return buildClothShopFullAppDoc();
}

export function buildApexEcommerceAppDoc(): Doc {
  const FRAME_W = PHONE_W;
  const FRAME_H = PHONE_H;
  const GAP_X = 80;

  // Screen 1: Marketplace Home
  const f1: Frame = {
    id: "ecom_home",
    name: "Marketplace Home",
    x: 0,
    y: 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Discover trending items, mega discount hero banners, story categories, and 2-column flash deals",
  };

  // Screen 2: Catalog & Search
  const f2: Frame = {
    id: "ecom_catalog",
    name: "Search & Catalog",
    x: FRAME_W + GAP_X,
    y: 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Search with filter chips, category tabs, and full browsable catalog with ratings",
  };

  // Screen 3: Product Details
  const f3: Frame = {
    id: "ecom_detail",
    name: "Product Details",
    x: (FRAME_W + GAP_X) * 2,
    y: 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Product showcase, price savings, color and size selectors, verified reviews, and add to cart",
  };

  // Screen 4: Cart & Checkout
  const f4: Frame = {
    id: "ecom_cart",
    name: "Cart & Checkout",
    x: (FRAME_W + GAP_X) * 3,
    y: 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Shopping bag items, coupon discount code, order pricing summary, and checkout trigger",
  };

  const frames = [f1, f2, f3, f4];
  const groups: Group[] = [];

  // ==================== SCREEN 1 GROUPS (Marketplace Home) ====================
  // Top App Bar
  groups.push({
    id: uid(),
    x: f1.x,
    y: f1.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Apex Store",
        icon: "storefront",
        icon2: "shopping_bag",
        variant: "filled",
        size: FRAME_W,
        action: { to: "ecom_cart", transition: "slide" },
      },
    ],
  });

  // Search Bar
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 76,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "searchBar",
        label: "Search sneakers, apparel, tech...",
        icon: "search",
        icon2: "tune",
        variant: "tonal",
        size: 380,
        action: { to: "ecom_catalog", transition: "fade" },
      },
    ],
  });

  // Hero Promo Sales Banner
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 148,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Autumn Mega Sale · Up to 50% OFF",
        supporting: "Urban fashion & accessories with extra 20% off code 'FALL26'",
        icon: "local_fire_department",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
        imagePos: "top",
        imageSize: 110,
        src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80",
        action: { to: "ecom_catalog", transition: "slide" },
      },
    ],
  });

  // Category Bubbles Carousel
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 350,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "carousel",
        label: "Top Categories",
        icon: "category",
        variant: "filled",
        size: 380,
        count: 5,
        tabs: [
          { icon: "checkroom", label: "Fashion", src: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&auto=format&fit=crop&q=80" },
          { icon: "devices", label: "Tech", src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80" },
          { icon: "roller_skating", label: "Shoes", src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80" },
          { icon: "spa", label: "Beauty", src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&auto=format&fit=crop&q=80" },
          { icon: "local_offer", label: "Deals", src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&auto=format&fit=crop&q=80" },
        ],
      },
    ],
  });

  // Flash Sale Header
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 510,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "chip",
        label: "⚡ Flash Deals · Ends in 02 : 14 : 35",
        icon: "bolt",
        variant: "tonal",
        checked: true,
      },
    ],
  });

  // 2-Column Product Grid
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 560,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Nike Air Max Pulse",
        supporting: "$159.00 · ★ 4.9",
        icon: "shopping_bag",
        variant: "elevated",
        size: 184,
        imagePos: "top",
        imageSize: 110,
        src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80",
        action: { to: "ecom_detail", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Sony WH-1000XM5",
        supporting: "$279.00 · ★ 4.8",
        icon: "headphones",
        variant: "elevated",
        size: 184,
        imagePos: "top",
        imageSize: 110,
        src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
        action: { to: "ecom_detail", transition: "slide" },
      },
    ],
  });

  // Screen 1 Bottom Navigation
  groups.push({
    id: uid(),
    x: f1.x,
    y: f1.y + FRAME_H - 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "bottomNav",
        label: "",
        icon: null,
        variant: "filled",
        size: FRAME_W,
        tabs: [
          { icon: "home", label: "Home" },
          { icon: "grid_view", label: "Catalog" },
          { icon: "favorite", label: "Wishlist" },
          { icon: "shopping_cart", label: "Cart (3)" },
          { icon: "person", label: "Profile" },
        ],
        selected: 0,
        actions: {
          "tab:1": { to: "ecom_catalog", transition: "fade" },
          "tab:3": { to: "ecom_cart", transition: "fade" },
        },
      },
    ],
  });

  // ==================== SCREEN 2 GROUPS (Catalog & Search) ====================
  // Top App Bar
  groups.push({
    id: uid(),
    x: f2.x,
    y: f2.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Product Catalog",
        icon: "arrow_back",
        icon2: "tune",
        variant: "filled",
        size: FRAME_W,
        action: { to: "ecom_home", transition: "slideLeft" },
      },
    ],
  });

  // Filter Chips Row
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 76,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "All Items", icon: "widgets", variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "Under $100", icon: "sell", variant: "outlined" },
      { id: uid(), kind: "chip", label: "Top Rated ★ 4+", icon: "star", variant: "outlined" },
      { id: uid(), kind: "chip", label: "Free Shipping", icon: "local_shipping", variant: "outlined" },
    ],
  });

  // Product List Items
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 136,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Nike Air Max Pulse 2026",
        supporting: "$159.00 · Was $210.00 (-24%) · ★ 4.9 (840 reviews)",
        icon: "shopping_bag",
        variant: "elevated",
        size: 380,
        imagePos: "leading",
        imageSize: 90,
        src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80",
        action: { to: "ecom_detail", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Ultra Pro Smartwatch Series X",
        supporting: "$199.00 · Was $299.00 (-33%) · Free Delivery",
        icon: "watch",
        variant: "elevated",
        size: 380,
        imagePos: "leading",
        imageSize: 90,
        src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80",
        action: { to: "ecom_detail", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Minimalist Leather Backpack",
        supporting: "$120.00 · In Stock (3 colors) · Handcrafted",
        icon: "backpack",
        variant: "elevated",
        size: 380,
        imagePos: "leading",
        imageSize: 90,
        src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop&q=80",
        action: { to: "ecom_detail", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Sony WH-1000XM5 Wireless Headphones",
        supporting: "$279.00 · Premium Noise Cancelling · 30h battery",
        icon: "headphones",
        variant: "elevated",
        size: 380,
        imagePos: "leading",
        imageSize: 90,
        src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
        action: { to: "ecom_detail", transition: "slide" },
      },
    ],
  });

  // Screen 2 Bottom Navigation
  groups.push({
    id: uid(),
    x: f2.x,
    y: f2.y + FRAME_H - 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "bottomNav",
        label: "",
        icon: null,
        variant: "filled",
        size: FRAME_W,
        tabs: [
          { icon: "home", label: "Home" },
          { icon: "grid_view", label: "Catalog" },
          { icon: "favorite", label: "Wishlist" },
          { icon: "shopping_cart", label: "Cart (3)" },
          { icon: "person", label: "Profile" },
        ],
        selected: 1,
        actions: {
          "tab:0": { to: "ecom_home", transition: "fade" },
          "tab:3": { to: "ecom_cart", transition: "fade" },
        },
      },
    ],
  });

  // ==================== SCREEN 3 GROUPS (Product Details) ====================
  // Top App Bar
  groups.push({
    id: uid(),
    x: f3.x,
    y: f3.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Product Details",
        icon: "arrow_back",
        icon2: "favorite_border",
        variant: "filled",
        size: FRAME_W,
        action: { to: "ecom_home", transition: "slideLeft" },
      },
    ],
  });

  // Hero Product Showcase Image
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Nike Air Max Pulse 2026",
        supporting: "$159.00 (Was $210.00 · 24% OFF) · High-performance foam cushioning",
        icon: "shopping_bag",
        variant: "elevated",
        size: 380,
        imagePos: "top",
        imageSize: 180,
        src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
      },
    ],
  });

  // Color Swatches
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 360,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "Midnight Black", icon: "dark_mode", variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "Pure Red", icon: "palette", variant: "outlined" },
      { id: uid(), kind: "chip", label: "White Platinum", icon: "light_mode", variant: "outlined" },
    ],
  });

  // Size Selector Chips
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 416,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "US 8", icon: null, variant: "outlined" },
      { id: uid(), kind: "chip", label: "US 9", icon: null, variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "US 10", icon: null, variant: "outlined" },
      { id: uid(), kind: "chip", label: "US 11", icon: null, variant: "outlined" },
      { id: uid(), kind: "chip", label: "US 12", icon: null, variant: "outlined" },
    ],
  });

  // Reviews Summary Card
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 472,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "4.9 ★★★★★ (1,420 Reviews)",
        supporting: "“Fits true to size, unbelievable comfort and premium breathable materials.” — Sarah K.",
        icon: "verified",
        variant: "tonal",
        size: 380,
      },
    ],
  });

  // Dual Action Buttons: Add to Cart & Buy Now
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 574,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Add to Cart",
        icon: "add_shopping_cart",
        variant: "tonal",
        size: 184,
        size2: 52,
        action: { to: "ecom_cart", transition: "slide" },
      },
      {
        id: uid(),
        kind: "button",
        label: "Buy Now",
        icon: "bolt",
        variant: "filled",
        size: 184,
        size2: 52,
        action: { to: "ecom_cart", transition: "slide" },
      },
    ],
  });

  // Screen 3 Bottom Navigation
  groups.push({
    id: uid(),
    x: f3.x,
    y: f3.y + FRAME_H - 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "bottomNav",
        label: "",
        icon: null,
        variant: "filled",
        size: FRAME_W,
        tabs: [
          { icon: "home", label: "Home" },
          { icon: "grid_view", label: "Catalog" },
          { icon: "favorite", label: "Wishlist" },
          { icon: "shopping_cart", label: "Cart (3)" },
          { icon: "person", label: "Profile" },
        ],
        selected: 1,
        actions: {
          "tab:0": { to: "ecom_home", transition: "fade" },
          "tab:3": { to: "ecom_cart", transition: "fade" },
        },
      },
    ],
  });

  // ==================== SCREEN 4 GROUPS (Cart & Checkout) ====================
  // Top App Bar
  groups.push({
    id: uid(),
    x: f4.x,
    y: f4.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Shopping Bag (2 items)",
        icon: "arrow_back",
        icon2: "delete_outline",
        variant: "filled",
        size: FRAME_W,
        action: { to: "ecom_home", transition: "slideLeft" },
      },
    ],
  });

  // Cart Item 1
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Nike Air Max Pulse 2026",
        supporting: "$159.00 · Size US 9 · Black/Red · Qty: 1",
        icon: "shopping_bag",
        variant: "elevated",
        size: 380,
        imagePos: "leading",
        imageSize: 76,
        src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=80",
      },
    ],
  });

  // Cart Item 2
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 196,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Minimalist Leather Backpack",
        supporting: "$120.00 · Saddle Brown · Qty: 1",
        icon: "backpack",
        variant: "elevated",
        size: 380,
        imagePos: "leading",
        imageSize: 76,
        src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&auto=format&fit=crop&q=80",
      },
    ],
  });

  // Voucher Promo Code Field
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 312,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "textField",
        label: "Promo Code Applied: BONGO25 (-$25.00)",
        supporting: "Discount of $25.00 applied to this order",
        icon: "check_circle",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  // Order Summary Card
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 404,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Order Summary",
        supporting: "Items Subtotal: $279.00\nCoupon Discount: -$25.00\nStandard Express Delivery: FREE\nFinal Total: $254.00",
        icon: "receipt",
        variant: "filled",
        fill: "surfaceContainerHigh",
        size: 380,
      },
    ],
  });

  // Proceed to Checkout CTA
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 540,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Proceed to Checkout · $254.00",
        icon: "shopping_bag_checkout",
        variant: "filled",
        size: 380,
        size2: 56,
      },
    ],
  });

  // Screen 4 Bottom Navigation
  groups.push({
    id: uid(),
    x: f4.x,
    y: f4.y + FRAME_H - 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "bottomNav",
        label: "",
        icon: null,
        variant: "filled",
        size: FRAME_W,
        tabs: [
          { icon: "home", label: "Home" },
          { icon: "grid_view", label: "Catalog" },
          { icon: "favorite", label: "Wishlist" },
          { icon: "shopping_cart", label: "Cart (3)" },
          { icon: "person", label: "Profile" },
        ],
        selected: 3,
        actions: {
          "tab:0": { to: "ecom_home", transition: "fade" },
          "tab:1": { to: "ecom_catalog", transition: "fade" },
        },
      },
    ],
  });

  return {
    title: "Apex E-Commerce Shopping App",
    brief: "Real professional multi-screen e-commerce mobile application featuring product catalog, flash discounts, color and size pickers, and checkout summary.",
    frame: "phone",
    platform: "android",
    paletteKey: "coral",
    frames,
    groups,
  };
}
