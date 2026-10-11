import {
  Doc,
  Frame,
  Group,
  PHONE_W,
  PHONE_H,
  PHONE_MARGIN,
  uid,
} from "./tokens";

// Eagerly resolve cloth shop product images if present
const localClothImages = import.meta.glob(
  "../../cloth_shop_frontend/assets/images/*.{jpg,jpeg,png,webp}",
  {
    import: "default",
    eager: true,
  }
) as Record<string, string>;

// Curated fallback fashion images from Unsplash if local path fails
const FASHION_IMGS = {
  hero:
    localClothImages["../../cloth_shop_frontend/assets/images/onboarding_streetwear_model_1791167538578.jpg"] ||
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80",
  blackTee:
    localClothImages["../../cloth_shop_frontend/assets/images/product_black_sleeveless_tshirt_1791167574621.jpg"] ||
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
  vneckTee:
    localClothImages["../../cloth_shop_frontend/assets/images/product_black_vneck_tshirt_1791167585813.jpg"] ||
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
  navyTee:
    localClothImages["../../cloth_shop_frontend/assets/images/product_navy_slogan_tshirt_1791167551962.jpg"] ||
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80",
  pinkThermal:
    localClothImages["../../cloth_shop_frontend/assets/images/product_pink_longsleeve_tshirt_1791167599439.jpg"] ||
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80",
  tealPolo:
    localClothImages["../../cloth_shop_frontend/assets/images/product_teal_polo_shirt_1791167564380.jpg"] ||
    "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=80",
  accessories:
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
  sneakers:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
};

/**
 * Builds the complete 27-screen Cloth Shop Application document for M3E Canvas.
 * Each screen is a fully editable, re-orderable, customizable Material 3 phone screen.
 */
export function buildClothShopFullAppDoc(): Doc {
  const FRAME_W = PHONE_W; // 412
  const FRAME_H = PHONE_H; // 892
  const GAP_X = 90;
  const GAP_Y = 120;
  const STRIDE_X = FRAME_W + GAP_X; // 502
  const STRIDE_Y = FRAME_H + GAP_Y; // 1012

  const frames: Frame[] = [];
  const groups: Group[] = [];

  // --------------------------------------------------------------------------
  // ROW 0: Primary Shopping Experience (y = 0)
  // --------------------------------------------------------------------------
  const f_home: Frame = {
    id: "cloth_home",
    name: "1. Homepage (Feed)",
    x: STRIDE_X * 0,
    y: STRIDE_Y * 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Discover drops, seasonal streetwear sales banner, category tabs, and 2-column product grid.",
  };

  const f_search: Frame = {
    id: "cloth_search",
    name: "2. Search & Filter",
    x: STRIDE_X * 1,
    y: STRIDE_Y * 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Keyword search, price range filter chips, size sorting, and live catalog results.",
  };

  const f_detail: Frame = {
    id: "cloth_product_detail",
    name: "3. Product Details",
    x: STRIDE_X * 2,
    y: STRIDE_Y * 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Clothing showcase photo, sizing guide chips (S, M, L, XL), reviews score, and sticky Add to Bag CTA.",
  };

  const f_reviews: Frame = {
    id: "cloth_reviews",
    name: "4. Customer Reviews",
    x: STRIDE_X * 3,
    y: STRIDE_Y * 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Verified customer reviews, rating score, 5-star breakdown, and review author cards.",
  };

  const f_saved: Frame = {
    id: "cloth_saved",
    name: "5. Saved Items (Wishlist)",
    x: STRIDE_X * 4,
    y: STRIDE_Y * 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Saved favorite clothing items with Move to Bag and Remove actions.",
  };

  const f_cart: Frame = {
    id: "cloth_cart",
    name: "6. My Cart (Shopping Bag)",
    x: STRIDE_X * 5,
    y: STRIDE_Y * 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Cart item list with quantities, coupon voucher discount, pricing breakdown, and Checkout button.",
  };

  const f_checkout: Frame = {
    id: "cloth_checkout",
    name: "7. Order Checkout",
    x: STRIDE_X * 6,
    y: STRIDE_Y * 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Delivery address card, payment card selection, shipping speed options, and Place Order button.",
  };

  // --------------------------------------------------------------------------
  // ROW 1: Account, Orders & Support (y = 1012)
  // --------------------------------------------------------------------------
  const f_account: Frame = {
    id: "cloth_account",
    name: "8. Account & Profile",
    x: STRIDE_X * 0,
    y: STRIDE_Y * 1,
    w: FRAME_W,
    h: FRAME_H,
    note: "User membership card, VIP status, navigation menu for Orders, Addresses, Payments, and Help.",
  };

  const f_my_orders: Frame = {
    id: "cloth_my_orders",
    name: "9. My Orders",
    x: STRIDE_X * 1,
    y: STRIDE_Y * 1,
    w: FRAME_W,
    h: FRAME_H,
    note: "Active, delivered and returned orders list with status indicators and Track Order buttons.",
  };

  const f_track_order: Frame = {
    id: "cloth_track_order",
    name: "10. Track Order Live",
    x: STRIDE_X * 2,
    y: STRIDE_Y * 1,
    w: FRAME_W,
    h: FRAME_H,
    note: "Live order delivery timeline, package tracking steps, courier info, and contact button.",
  };

  const f_my_details: Frame = {
    id: "cloth_my_details",
    name: "11. Personal Details",
    x: STRIDE_X * 3,
    y: STRIDE_Y * 1,
    w: FRAME_W,
    h: FRAME_H,
    note: "Customer profile fields (name, email, phone, birthday) with Save Changes action.",
  };

  const f_notifications: Frame = {
    id: "cloth_notifications",
    name: "12. Notifications",
    x: STRIDE_X * 4,
    y: STRIDE_Y * 1,
    w: FRAME_W,
    h: FRAME_H,
    note: "Order delivery updates, new collection drops, and seasonal promotional alerts.",
  };

  const f_help_center: Frame = {
    id: "cloth_help_center",
    name: "13. Help Center",
    x: STRIDE_X * 5,
    y: STRIDE_Y * 1,
    w: FRAME_W,
    h: FRAME_H,
    note: "Support topics, help search, return policy guide, FAQs, and live contact buttons.",
  };

  const f_customer_service: Frame = {
    id: "cloth_customer_service",
    name: "14. Customer Service",
    x: STRIDE_X * 6,
    y: STRIDE_Y * 1,
    w: FRAME_W,
    h: FRAME_H,
    note: "Live agent chat desk, support ticket messaging form, and response status indicator.",
  };

  // --------------------------------------------------------------------------
  // ROW 2: Payment, Shipping & Settings (y = 2024)
  // --------------------------------------------------------------------------
  const f_payment_method: Frame = {
    id: "cloth_payment_method",
    name: "15. Payment Methods",
    x: STRIDE_X * 0,
    y: STRIDE_Y * 2,
    w: FRAME_W,
    h: FRAME_H,
    note: "Saved credit cards, Apple Pay, Google Pay, Cash on Delivery, and Add New Card button.",
  };

  const f_new_card: Frame = {
    id: "cloth_new_card",
    name: "16. Add New Card",
    x: STRIDE_X * 1,
    y: STRIDE_Y * 2,
    w: FRAME_W,
    h: FRAME_H,
    note: "Cardholder name, 16-digit number, expiry date, and CVV fields with security badge.",
  };

  const f_address: Frame = {
    id: "cloth_address",
    name: "17. Delivery Addresses",
    x: STRIDE_X * 2,
    y: STRIDE_Y * 2,
    w: FRAME_W,
    h: FRAME_H,
    note: "Saved shipping addresses list with default selection and Add New Address action.",
  };

  const f_new_address: Frame = {
    id: "cloth_new_address",
    name: "18. Add New Address",
    x: STRIDE_X * 3,
    y: STRIDE_Y * 2,
    w: FRAME_W,
    h: FRAME_H,
    note: "Street address, apartment, city, zip code, phone number, and default address switch.",
  };

  const f_notification_settings: Frame = {
    id: "cloth_notification_settings",
    name: "19. Notification Settings",
    x: STRIDE_X * 4,
    y: STRIDE_Y * 2,
    w: FRAME_W,
    h: FRAME_H,
    note: "Toggles for Order Updates, Flash Sales, New Drops, and SMS text notifications.",
  };

  const f_faqs: Frame = {
    id: "cloth_faqs",
    name: "20. FAQs",
    x: STRIDE_X * 5,
    y: STRIDE_Y * 2,
    w: FRAME_W,
    h: FRAME_H,
    note: "Frequently asked questions regarding delivery, returns, exchanges, and sizing.",
  };

  // --------------------------------------------------------------------------
  // ROW 3: Authentication & Onboarding (y = 3036)
  // --------------------------------------------------------------------------
  const f_splash: Frame = {
    id: "cloth_splash",
    name: "21. Splash Screen",
    x: STRIDE_X * 0,
    y: STRIDE_Y * 3,
    w: FRAME_W,
    h: FRAME_H,
    note: "Define Atelier luxury streetwear brand splash with logo crest and loading bar.",
  };

  const f_onboarding: Frame = {
    id: "cloth_onboarding",
    name: "22. Onboarding Screen",
    x: STRIDE_X * 1,
    y: STRIDE_Y * 3,
    w: FRAME_W,
    h: FRAME_H,
    note: "Streetwear model showcase image, brand introduction, and Get Started CTA.",
  };

  const f_login: Frame = {
    id: "cloth_login",
    name: "23. Sign In",
    x: STRIDE_X * 2,
    y: STRIDE_Y * 3,
    w: FRAME_W,
    h: FRAME_H,
    note: "Email and password inputs, Remember Me switch, Forgot Password link, and Sign In button.",
  };

  const f_signup: Frame = {
    id: "cloth_signup",
    name: "24. Create Account",
    x: STRIDE_X * 3,
    y: STRIDE_Y * 3,
    w: FRAME_W,
    h: FRAME_H,
    note: "Name, email, password fields, terms agreement checkbox, and Create Account button.",
  };

  const f_forgot_pwd: Frame = {
    id: "cloth_forgot_password",
    name: "25. Forgot Password",
    x: STRIDE_X * 4,
    y: STRIDE_Y * 3,
    w: FRAME_W,
    h: FRAME_H,
    note: "Email input to request a 4-digit verification reset code.",
  };

  const f_verify_code: Frame = {
    id: "cloth_verification_code",
    name: "26. Verification Code",
    x: STRIDE_X * 5,
    y: STRIDE_Y * 3,
    w: FRAME_W,
    h: FRAME_H,
    note: "4-digit security code input with Verify and Resend Code timer.",
  };

  const f_reset_pwd: Frame = {
    id: "cloth_reset_password",
    name: "27. Reset Password",
    x: STRIDE_X * 6,
    y: STRIDE_Y * 3,
    w: FRAME_W,
    h: FRAME_H,
    note: "New password and confirmation fields with Update Password action.",
  };

  // Push all 27 frames
  frames.push(
    f_home, f_search, f_detail, f_reviews, f_saved, f_cart, f_checkout,
    f_account, f_my_orders, f_track_order, f_my_details, f_notifications, f_help_center, f_customer_service,
    f_payment_method, f_new_card, f_address, f_new_address, f_notification_settings, f_faqs,
    f_splash, f_onboarding, f_login, f_signup, f_forgot_pwd, f_verify_code, f_reset_pwd
  );

  // Helper for Bottom Navigation on core shopping screens
  const buildBottomNavGroup = (frame: Frame, selectedIndex: number): Group => ({
    id: uid(),
    x: frame.x,
    y: frame.y + FRAME_H - 80,
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
          { icon: "search", label: "Catalog" },
          { icon: "favorite", label: "Saved" },
          { icon: "shopping_bag", label: "Cart (3)" },
          { icon: "person", label: "Account" },
        ],
        selected: selectedIndex,
        actions: {
          "tab:0": { to: "cloth_home", transition: "fade" },
          "tab:1": { to: "cloth_search", transition: "fade" },
          "tab:2": { to: "cloth_saved", transition: "fade" },
          "tab:3": { to: "cloth_cart", transition: "fade" },
          "tab:4": { to: "cloth_account", transition: "fade" },
        },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 1: Homepage (Feed)
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_home.x,
    y: f_home.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Define Atelier",
        icon: "menu",
        icon2: "shopping_bag",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_account", transition: "slide" },
        actions: { icon2: { to: "cloth_cart", transition: "slide" } },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_home.x + PHONE_MARGIN,
    y: f_home.y + 76,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "searchBar",
        label: "Search collections, hoodies, tees...",
        icon: "search",
        icon2: "tune",
        variant: "tonal",
        size: 380,
        action: { to: "cloth_search", transition: "fade" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_home.x + PHONE_MARGIN,
    y: f_home.y + 148,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "New Drop: Obsidian Essentials · 30% OFF",
        supporting: "Architectural cuts in heavyweight 380GSM cotton. Limited availability.",
        icon: "local_fire_department",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
        imagePos: "top",
        imageSize: 110,
        src: FASHION_IMGS.hero,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_home.x + PHONE_MARGIN,
    y: f_home.y + 276,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "All Drops", icon: "check", variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "T-Shirts", icon: "checkroom", variant: "outlined", action: { to: "cloth_search" } },
      { id: uid(), kind: "chip", label: "Hoodies", icon: "styler", variant: "outlined", action: { to: "cloth_search" } },
      { id: uid(), kind: "chip", label: "Outerwear", icon: "layers", variant: "outlined" },
    ],
  });

  groups.push({
    id: uid(),
    x: f_home.x + PHONE_MARGIN,
    y: f_home.y + 332,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Navy Slogan Tee · $85.00",
        supporting: "380GSM Cotton · Oversized Drop",
        icon: "shopping_bag",
        variant: "elevated",
        size: 184,
        imagePos: "top",
        imageSize: 130,
        src: FASHION_IMGS.navyTee,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Black V-Neck Shirt · $72.00",
        supporting: "Premium Stretch · Fitted Fit",
        icon: "shopping_bag",
        variant: "elevated",
        size: 184,
        imagePos: "top",
        imageSize: 130,
        src: FASHION_IMGS.vneckTee,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_home.x + PHONE_MARGIN,
    y: f_home.y + 560,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Teal Polo Shirt · $94.00",
        supporting: "Pique Cotton · Minimal Collar",
        icon: "shopping_bag",
        variant: "elevated",
        size: 184,
        imagePos: "top",
        imageSize: 130,
        src: FASHION_IMGS.tealPolo,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Pink Long-Sleeve · $110.00",
        supporting: "Thermal Waffle · Ribbed Cuffs",
        icon: "shopping_bag",
        variant: "elevated",
        size: 184,
        imagePos: "top",
        imageSize: 130,
        src: FASHION_IMGS.pinkThermal,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
    ],
  });

  groups.push(buildBottomNavGroup(f_home, 0));

  // ==========================================================================
  // SCREEN 2: Search & Filter
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_search.x,
    y: f_search.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Catalog & Search",
        icon: "arrow_back",
        icon2: "filter_list",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_home", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_search.x + PHONE_MARGIN,
    y: f_search.y + 76,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "searchBar",
        label: "Filter by size, fit, fabric...",
        icon: "search",
        icon2: "tune",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_search.x + PHONE_MARGIN,
    y: f_search.y + 148,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "Under $80", icon: "attach_money", variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "$80 - $120", icon: "payments", variant: "outlined" },
      { id: uid(), kind: "chip", label: "Size M", icon: "check", variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "Heavyweight", icon: "layers", variant: "outlined" },
    ],
  });

  groups.push({
    id: uid(),
    x: f_search.x + PHONE_MARGIN,
    y: f_search.y + 208,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Obsidian Heavyweight Street Tee · $89.00",
        supporting: "380GSM Cotton · 4.9 ★ (342 Reviews)",
        icon: "checkroom",
        variant: "elevated",
        size: 380,
        imagePos: "leading",
        imageSize: 84,
        src: FASHION_IMGS.blackTee,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Navy Slogan Oversized Tee · $85.00",
        supporting: "Dropped Shoulder · 4.8 ★ (180 Reviews)",
        icon: "checkroom",
        variant: "elevated",
        size: 380,
        imagePos: "leading",
        imageSize: 84,
        src: FASHION_IMGS.navyTee,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Minimalist Leather Backpack · $120.00",
        supporting: "Full Grain Saddle Leather · 4.9 ★",
        icon: "backpack",
        variant: "elevated",
        size: 380,
        imagePos: "leading",
        imageSize: 84,
        src: FASHION_IMGS.accessories,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
    ],
  });

  groups.push(buildBottomNavGroup(f_search, 1));

  // ==========================================================================
  // SCREEN 3: Product Details
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_detail.x,
    y: f_detail.y,
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
        action: { to: "cloth_home", transition: "slideLeft" },
        actions: { icon2: { to: "cloth_saved", transition: "fade" } },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_detail.x + PHONE_MARGIN,
    y: f_detail.y + 76,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Obsidian Heavyweight Street Tee · $89.00",
        supporting: "Was $120.00 · Architectural streetwear silhouette cut from Japanese custom milled 380GSM cotton.",
        icon: "verified",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
        imagePos: "top",
        imageSize: 180,
        src: FASHION_IMGS.blackTee,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_detail.x + PHONE_MARGIN,
    y: f_detail.y + 360,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "Jet Black", icon: "circle", variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "Forest Teal", icon: "circle", variant: "outlined" },
      { id: uid(), kind: "chip", label: "Dusty Rose", icon: "circle", variant: "outlined" },
    ],
  });

  groups.push({
    id: uid(),
    x: f_detail.x + PHONE_MARGIN,
    y: f_detail.y + 416,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "Size S", icon: null, variant: "outlined" },
      { id: uid(), kind: "chip", label: "Size M", icon: "check", variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "Size L", icon: null, variant: "outlined" },
      { id: uid(), kind: "chip", label: "Size XL", icon: null, variant: "outlined" },
    ],
  });

  groups.push({
    id: uid(),
    x: f_detail.x + PHONE_MARGIN,
    y: f_detail.y + 476,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "4.9 ★★★★★ (342 Verified Reviews)",
        supporting: "“Fits true to size, unbelievable comfort and premium breathable materials.” — Sarah K.",
        icon: "reviews",
        variant: "tonal",
        size: 380,
        action: { to: "cloth_reviews", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_detail.x + PHONE_MARGIN,
    y: f_detail.y + 580,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Add to Bag",
        icon: "add_shopping_cart",
        variant: "tonal",
        size: 184,
        size2: 52,
        action: { to: "cloth_cart", transition: "slide" },
      },
      {
        id: uid(),
        kind: "button",
        label: "Buy Now",
        icon: "bolt",
        variant: "filled",
        size: 184,
        size2: 52,
        action: { to: "cloth_checkout", transition: "slide" },
      },
    ],
  });

  groups.push(buildBottomNavGroup(f_detail, 0));

  // ==========================================================================
  // SCREEN 4: Customer Reviews
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_reviews.x,
    y: f_reviews.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Customer Reviews (342)",
        icon: "arrow_back",
        icon2: "rate_review",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_product_detail", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reviews.x + PHONE_MARGIN,
    y: f_reviews.y + 76,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Overall Rating: 4.9 out of 5",
        supporting: "Based on 342 verified purchases worldwide · 96% of buyers recommend this product",
        icon: "star",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reviews.x + PHONE_MARGIN,
    y: f_reviews.y + 196,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "listItem",
        label: "Marcus R. ★★★★★ (Verified Buyer)",
        supporting: "The fabric weight is unlike any fast-fashion tee. Thick collar doesn’t sag after washing.",
        icon: "person",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Elena D. ★★★★★ (Verified Buyer)",
        supporting: "Perfect boxy fit. Sized down for a slightly cleaner silhouette. Definitely buying more colors.",
        icon: "person",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Liam K. ★★★★★ (Verified Buyer)",
        supporting: "Color matches the photos 100%. Shipped in 2 days to New York.",
        icon: "person",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  });

  // ==========================================================================
  // SCREEN 5: Saved Items (Wishlist)
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_saved.x,
    y: f_saved.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Saved Items (4)",
        icon: "arrow_back",
        icon2: "delete_sweep",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_home", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_saved.x + PHONE_MARGIN,
    y: f_saved.y + 76,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Navy Slogan Oversized Tee · $85.00",
        supporting: "In Stock · Size M · Free Shipping Eligible",
        icon: "shopping_bag",
        variant: "elevated",
        size: 380,
        imagePos: "leading",
        imageSize: 76,
        src: FASHION_IMGS.navyTee,
        action: { to: "cloth_cart", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Teal Minimal Polo Shirt · $94.00",
        supporting: "In Stock · Size L · Pique Knit",
        icon: "shopping_bag",
        variant: "elevated",
        size: 380,
        imagePos: "leading",
        imageSize: 76,
        src: FASHION_IMGS.tealPolo,
        action: { to: "cloth_cart", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Urban Air Max Pulse 2026 · $159.00",
        supporting: "Low Stock (2 Left) · Size US 9",
        icon: "shopping_bag",
        variant: "elevated",
        size: 380,
        imagePos: "leading",
        imageSize: 76,
        src: FASHION_IMGS.sneakers,
        action: { to: "cloth_cart", transition: "slide" },
      },
    ],
  });

  groups.push(buildBottomNavGroup(f_saved, 2));

  // ==========================================================================
  // SCREEN 6: My Cart (Shopping Bag)
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_cart.x,
    y: f_cart.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "My Cart (3 Items)",
        icon: "arrow_back",
        icon2: "delete_outline",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_home", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_cart.x + PHONE_MARGIN,
    y: f_cart.y + 76,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Obsidian Street Tee · $89.00",
        supporting: "Color: Jet Black · Size: M · Qty: 1",
        icon: "shopping_bag",
        variant: "elevated",
        size: 380,
        imagePos: "leading",
        imageSize: 70,
        src: FASHION_IMGS.blackTee,
      },
      {
        id: uid(),
        kind: "card",
        label: "Black Fitted V-Neck · $72.00",
        supporting: "Color: Pure Black · Size: L · Qty: 1",
        icon: "shopping_bag",
        variant: "elevated",
        size: 380,
        imagePos: "leading",
        imageSize: 70,
        src: FASHION_IMGS.vneckTee,
      },
      {
        id: uid(),
        kind: "card",
        label: "Minimalist Leather Backpack · $120.00",
        supporting: "Color: Saddle Brown · Qty: 1",
        icon: "backpack",
        variant: "elevated",
        size: 380,
        imagePos: "leading",
        imageSize: 70,
        src: FASHION_IMGS.accessories,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_cart.x + PHONE_MARGIN,
    y: f_cart.y + 360,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "textField",
        label: "Coupon Code Applied: ATELIER20 (-$20.00)",
        supporting: "Special discount code applied to your order",
        icon: "check_circle",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_cart.x + PHONE_MARGIN,
    y: f_cart.y + 450,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Order Pricing Breakdown",
        supporting: "Bag Subtotal: $281.00\nVoucher Discount: -$20.00\nStandard Shipping: FREE\nEstimated Tax: $18.00\nTotal Due: $279.00",
        icon: "receipt",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_cart.x + PHONE_MARGIN,
    y: f_cart.y + 600,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Proceed to Checkout · $279.00",
        icon: "shopping_bag_checkout",
        variant: "filled",
        size: 380,
        size2: 56,
        action: { to: "cloth_checkout", transition: "slide" },
      },
    ],
  });

  groups.push(buildBottomNavGroup(f_cart, 3));

  // ==========================================================================
  // SCREEN 7: Order Checkout
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_checkout.x,
    y: f_checkout.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Order Checkout",
        icon: "arrow_back",
        icon2: "lock",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_cart", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_checkout.x + PHONE_MARGIN,
    y: f_checkout.y + 76,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Shipping Address: Alex Mercer",
        supporting: "742 Evergreen Terrace, Apt 4B, New York, NY 10001\nPhone: +1 555-0192",
        icon: "location_on",
        variant: "elevated",
        size: 380,
        action: { to: "cloth_address", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Payment Method: Visa ending in •••• 4242",
        supporting: "Exp: 08/29 · Primary Card (Default)",
        icon: "credit_card",
        variant: "elevated",
        size: 380,
        action: { to: "cloth_payment_method", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_checkout.x + PHONE_MARGIN,
    y: f_checkout.y + 280,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "Standard (Free, 3-5 Days)", icon: "local_shipping", variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "Express ($12, Next Day)", icon: "bolt", variant: "outlined" },
    ],
  });

  groups.push({
    id: uid(),
    x: f_checkout.x + PHONE_MARGIN,
    y: f_checkout.y + 350,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Order Summary: 3 Items",
        supporting: "Subtotal: $261.00\nShipping: $0.00\nTax: $18.00\nTotal Charge: $279.00",
        icon: "receipt_long",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_checkout.x + PHONE_MARGIN,
    y: f_checkout.y + 510,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Place Order Now · $279.00",
        icon: "lock",
        variant: "filled",
        size: 380,
        size2: 56,
        action: { to: "cloth_track_order", transition: "slide" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 8: Account & Profile
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_account.x,
    y: f_account.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "My Account",
        icon: "person",
        icon2: "settings",
        variant: "filled",
        size: FRAME_W,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_account.x + PHONE_MARGIN,
    y: f_account.y + 76,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Alex Mercer",
        supporting: "alex.mercer@atelier.com · VIP Black Member · 420 Tier Points",
        icon: "account_circle",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_account.x + PHONE_MARGIN,
    y: f_account.y + 196,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "listItem",
        label: "My Orders & History",
        supporting: "View active order status and past invoices",
        icon: "inventory_2",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
        action: { to: "cloth_my_orders", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Saved Shipping Addresses",
        supporting: "2 Saved addresses (Home, Work)",
        icon: "location_on",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
        action: { to: "cloth_address", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Payment Methods & Cards",
        supporting: "Manage saved Visa, Mastercard, Apple Pay",
        icon: "credit_card",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
        action: { to: "cloth_payment_method", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Personal Profile Details",
        supporting: "Update name, email, phone number",
        icon: "badge",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
        action: { to: "cloth_my_details", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Notification Settings",
        supporting: "Push alerts, drop notifications, promo emails",
        icon: "notifications",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
        action: { to: "cloth_notification_settings", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Help Center & Support",
        supporting: "FAQs, returns guide, contact support",
        icon: "help",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
        action: { to: "cloth_help_center", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_account.x + PHONE_MARGIN,
    y: f_account.y + 610,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Sign Out of Account",
        icon: "logout",
        variant: "outlined",
        size: 380,
        action: { to: "cloth_login", transition: "fade" },
      },
    ],
  });

  groups.push(buildBottomNavGroup(f_account, 4));

  // ==========================================================================
  // SCREEN 9: My Orders
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_my_orders.x,
    y: f_my_orders.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "My Orders",
        icon: "arrow_back",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_account", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_orders.x + PHONE_MARGIN,
    y: f_my_orders.y + 76,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "Active (1)", icon: "local_shipping", variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "Delivered (6)", icon: "check_circle", variant: "outlined" },
      { id: uid(), kind: "chip", label: "Cancelled", icon: "cancel", variant: "outlined" },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_orders.x + PHONE_MARGIN,
    y: f_my_orders.y + 136,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Order #AT-9842 · $185.00",
        supporting: "Status: In Transit (Est. Arrival: Tomorrow)\n2 Items: Obsidian Street Tee, Black V-Neck",
        icon: "local_shipping",
        variant: "elevated",
        size: 380,
        action: { to: "cloth_track_order", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Order #AT-9610 · $72.00",
        supporting: "Delivered on Oct 5 · Paid with Visa •••• 4242\n1 Item: Black Fitted V-Neck Shirt",
        icon: "inventory",
        variant: "elevated",
        size: 380,
      },
      {
        id: uid(),
        kind: "card",
        label: "Order #AT-9420 · $159.00",
        supporting: "Delivered on Sep 18 · Paid with Apple Pay\n1 Item: Urban Air Max Pulse 2026",
        icon: "inventory",
        variant: "elevated",
        size: 380,
      },
    ],
  });

  groups.push(buildBottomNavGroup(f_my_orders, 4));

  // ==========================================================================
  // SCREEN 10: Track Order Live
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_track_order.x,
    y: f_track_order.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Track Order #AT-9842",
        icon: "arrow_back",
        icon2: "support_agent",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_my_orders", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_track_order.x + PHONE_MARGIN,
    y: f_track_order.y + 76,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Estimated Delivery: Tomorrow by 4 PM",
        supporting: "Carrier: Atelier Express Priority · Tracking #AT-EXP-90214",
        icon: "schedule",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_track_order.x + PHONE_MARGIN,
    y: f_track_order.y + 196,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "listItem",
        label: "1. Order Confirmed & Paid",
        supporting: "Oct 10, 10:30 AM · Payment Verified",
        icon: "check_circle",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "2. Package Dispatched from Hub",
        supporting: "Oct 10, 3:15 PM · Brooklyn Logistics Center",
        icon: "check_circle",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "3. Out for Delivery with Driver",
        supporting: "Today, 8:45 AM · Courier Michael S. (Van #4)",
        icon: "local_shipping",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "4. Package Delivered to Door",
        supporting: "Pending final delivery handover",
        icon: "radio_button_unchecked",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  });

  // ==========================================================================
  // SCREEN 11: Personal Details
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_my_details.x,
    y: f_my_details.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Personal Profile",
        icon: "arrow_back",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_account", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_details.x + PHONE_MARGIN,
    y: f_my_details.y + 76,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "First Name", supporting: "Alex", icon: "person", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Last Name", supporting: "Mercer", icon: "badge", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Email Address", supporting: "alex.mercer@atelier.com", icon: "mail", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Phone Number", supporting: "+1 (555) 019-2831", icon: "phone", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Birthday (DD/MM/YYYY)", supporting: "14/05/1996", icon: "cake", variant: "outlined", size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_details.x + PHONE_MARGIN,
    y: f_my_details.y + 480,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Save Changes",
        icon: "check",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_account", transition: "slideLeft" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 12: Notifications
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_notifications.x,
    y: f_notifications.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Notifications",
        icon: "arrow_back",
        icon2: "tune",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_account", transition: "slideLeft" },
        actions: { icon2: { to: "cloth_notification_settings", transition: "slide" } },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notifications.x + PHONE_MARGIN,
    y: f_notifications.y + 76,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "listItem",
        label: "Order #AT-9842 is Out for Delivery",
        supporting: "Courier Michael is on the way. Tap to track · 10m ago",
        icon: "local_shipping",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
        action: { to: "cloth_track_order", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Weekend Flash Sale: 25% Off Hoodies",
        supporting: "Use code ATELIER25 at checkout · 2 hours ago",
        icon: "local_fire_department",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
        action: { to: "cloth_search", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Back in Stock: Minimalist Backpack",
        supporting: "Saddle brown leather backpack is back in stock · Yesterday",
        icon: "notifications",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 13: Help Center
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_help_center.x,
    y: f_help_center.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Help Center",
        icon: "arrow_back",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_account", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_help_center.x + PHONE_MARGIN,
    y: f_help_center.y + 76,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "searchBar",
        label: "Search support articles, returns, sizing...",
        icon: "search",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_help_center.x + PHONE_MARGIN,
    y: f_help_center.y + 148,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "listItem",
        label: "Shipping & Worldwide Delivery",
        supporting: "Delivery timeframes, express shipping & customs fees",
        icon: "local_shipping",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
        action: { to: "cloth_faqs", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Returns & 30-Day Exchanges",
        supporting: "Free return labels, exchange steps & refund policy",
        icon: "published_with_changes",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
        action: { to: "cloth_faqs", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Size & Architectural Fit Guides",
        supporting: "Chest, sleeve and body length measurements",
        icon: "straighten",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
        action: { to: "cloth_faqs", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_help_center.x + PHONE_MARGIN,
    y: f_help_center.y + 400,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Contact Live Customer Service",
        icon: "chat",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_customer_service", transition: "slide" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 14: Customer Service
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_customer_service.x,
    y: f_customer_service.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Customer Support Desk",
        icon: "arrow_back",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_help_center", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_customer_service.x + PHONE_MARGIN,
    y: f_customer_service.y + 76,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Live Chat Support · Online Now",
        supporting: "Atelier customer specialists are active. Average wait time under 2 minutes.",
        icon: "support_agent",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_customer_service.x + PHONE_MARGIN,
    y: f_customer_service.y + 196,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "textField",
        label: "Describe your inquiry or order issue",
        supporting: "e.g. Need to change delivery address for #AT-9842",
        icon: "edit_note",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_customer_service.x + PHONE_MARGIN,
    y: f_customer_service.y + 300,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Start Live Chat Session",
        icon: "send",
        variant: "filled",
        size: 380,
        size2: 52,
      },
    ],
  });

  // ==========================================================================
  // SCREEN 15: Payment Methods
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_payment_method.x,
    y: f_payment_method.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Payment Methods",
        icon: "arrow_back",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_checkout", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_payment_method.x + PHONE_MARGIN,
    y: f_payment_method.y + 76,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "listItem",
        label: "Visa •••• 4242 (Default Card)",
        supporting: "Expires 08/29 · Primary Billing",
        icon: "credit_card",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Mastercard •••• 8910",
        supporting: "Expires 12/28 · Secondary",
        icon: "credit_card",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Apple Pay / Google Wallet",
        supporting: "Instant One-Tap Checkout Enabled",
        icon: "account_balance_wallet",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_payment_method.x + PHONE_MARGIN,
    y: f_payment_method.y + 300,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Add New Payment Card",
        icon: "add_card",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_new_card", transition: "slide" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 16: Add New Card
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_new_card.x,
    y: f_new_card.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Add New Card",
        icon: "arrow_back",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_payment_method", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_card.x + PHONE_MARGIN,
    y: f_new_card.y + 76,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "Cardholder Name", supporting: "e.g. Alex Mercer", icon: "person", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "16-Digit Card Number", supporting: "4000 1234 5678 9010", icon: "credit_card", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Expiry Date (MM/YY)", supporting: "08/29", icon: "calendar_today", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "CVV / Security Code", supporting: "3 digits on back", icon: "lock", variant: "outlined", size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_card.x + PHONE_MARGIN,
    y: f_new_card.y + 400,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Save Card Securely",
        icon: "lock",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_payment_method", transition: "slideLeft" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 17: Delivery Addresses
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_address.x,
    y: f_address.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Delivery Addresses",
        icon: "arrow_back",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_checkout", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_address.x + PHONE_MARGIN,
    y: f_address.y + 76,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Home Address (Primary Default)",
        supporting: "742 Evergreen Terrace, Apt 4B\nNew York, NY 10001 · Phone: +1 555-0192",
        icon: "home",
        variant: "elevated",
        size: 380,
      },
      {
        id: uid(),
        kind: "card",
        label: "Office Address",
        supporting: "100 Silicon Blvd, Suite 800\nSan Francisco, CA 94107",
        icon: "work",
        variant: "elevated",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_address.x + PHONE_MARGIN,
    y: f_address.y + 300,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Add New Address",
        icon: "add_location_alt",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_new_address", transition: "slide" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 18: Add New Address
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_new_address.x,
    y: f_new_address.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Add New Address",
        icon: "arrow_back",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_address", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_address.x + PHONE_MARGIN,
    y: f_new_address.y + 76,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "Address Label (e.g. Home, Office)", supporting: "Home", icon: "label", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Street Address", supporting: "742 Evergreen Terrace", icon: "home", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Apt / Suite / Floor (Optional)", supporting: "Apt 4B", icon: "meeting_room", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "City & State", supporting: "New York, NY", icon: "location_city", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Postal Zip Code", supporting: "10001", icon: "markunread_mailbox", variant: "outlined", size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_address.x + PHONE_MARGIN,
    y: f_new_address.y + 470,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Save Delivery Address",
        icon: "check",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_address", transition: "slideLeft" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 19: Notification Settings
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_notification_settings.x,
    y: f_notification_settings.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Notification Settings",
        icon: "arrow_back",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_notifications", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notification_settings.x + PHONE_MARGIN,
    y: f_notification_settings.y + 76,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "listItem",
        label: "Order Tracking Alerts",
        supporting: "Receive real-time delivery status push alerts",
        icon: "local_shipping",
        switch: true,
        checked: true,
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "New Drops & Collections",
        supporting: "Get notified when seasonal collections release",
        icon: "checkroom",
        switch: true,
        checked: true,
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Promotions & Discounts",
        supporting: "Exclusive member flash sales and discount codes",
        icon: "local_fire_department",
        switch: true,
        checked: false,
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "SMS Text Messages",
        supporting: "Delivery confirmation texts to your mobile phone",
        icon: "sms",
        switch: true,
        checked: true,
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  });

  // ==========================================================================
  // SCREEN 20: FAQs
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_faqs.x,
    y: f_faqs.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Frequently Asked Questions",
        icon: "arrow_back",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_help_center", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_faqs.x + PHONE_MARGIN,
    y: f_faqs.y + 76,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "listItem",
        label: "What is your return & exchange policy?",
        supporting: "We offer 30-day hassle-free returns on all unwashed items with tags attached.",
        icon: "quiz",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "How long does standard delivery take?",
        supporting: "Standard shipping takes 3-5 business days. Express shipping delivers in 24-48 hours.",
        icon: "quiz",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "How do I choose the correct clothing size?",
        supporting: "Our tees feature a relaxed boxy fit. Sizing true to size gives the intended streetwear drape.",
        icon: "quiz",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Do you ship worldwide?",
        supporting: "Yes! We ship to over 85 countries worldwide with prepaid duties and tracking.",
        icon: "quiz",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  });

  // ==========================================================================
  // SCREEN 21: Splash Screen
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_splash.x + PHONE_MARGIN,
    y: f_splash.y + 240,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Define Atelier",
        supporting: "Luxury Streetwear & Essentials · Milled in Japan, Crafted Globally.",
        icon: "checkroom",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_splash.x + PHONE_MARGIN,
    y: f_splash.y + 400,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "linearProgress",
        label: "Loading Collection...",
        icon: null,
        variant: "filled",
        size: 380,
        value: 80,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_splash.x + PHONE_MARGIN,
    y: f_splash.y + 480,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Enter Atelier",
        icon: "arrow_forward",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_onboarding", transition: "fade" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 22: Onboarding Screen
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_onboarding.x + PHONE_MARGIN,
    y: f_onboarding.y + 60,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Elevated Streetwear Essentials",
        supporting: "Explore curated drops engineered with heavyweight cotton and timeless architectural proportions.",
        icon: "star",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
        imagePos: "top",
        imageSize: 340,
        src: FASHION_IMGS.hero,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_onboarding.x + PHONE_MARGIN,
    y: f_onboarding.y + 530,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "01", icon: null, variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "02", icon: null, variant: "outlined" },
      { id: uid(), kind: "chip", label: "03", icon: null, variant: "outlined" },
    ],
  });

  groups.push({
    id: uid(),
    x: f_onboarding.x + PHONE_MARGIN,
    y: f_onboarding.y + 590,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Get Started Now",
        icon: "arrow_forward",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_home", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_onboarding.x + PHONE_MARGIN,
    y: f_onboarding.y + 660,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Already have an account? Sign In",
        icon: "login",
        variant: "outlined",
        size: 380,
        size2: 48,
        action: { to: "cloth_login", transition: "slide" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 23: Sign In
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_login.x,
    y: f_login.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Welcome Back",
        icon: "arrow_back",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_onboarding", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_login.x + PHONE_MARGIN,
    y: f_login.y + 76,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "Email Address", supporting: "alex.mercer@atelier.com", icon: "mail", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Password", supporting: "••••••••••••", icon: "lock", variant: "outlined", size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_login.x + PHONE_MARGIN,
    y: f_login.y + 240,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "switch",
        label: "Remember login on this device",
        checked: true,
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_login.x + PHONE_MARGIN,
    y: f_login.y + 300,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Sign In to Account",
        icon: "login",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_home", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_login.x + PHONE_MARGIN,
    y: f_login.y + 368,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Forgot Password?",
        icon: "help_outline",
        variant: "text",
        size: 380,
        action: { to: "cloth_forgot_password", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_login.x + PHONE_MARGIN,
    y: f_login.y + 430,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "New customer? Create Account",
        icon: "person_add",
        variant: "outlined",
        size: 380,
        action: { to: "cloth_signup", transition: "slide" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 24: Create Account (Sign Up)
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_signup.x,
    y: f_signup.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Create Account",
        icon: "arrow_back",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_login", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_signup.x + PHONE_MARGIN,
    y: f_signup.y + 76,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "Full Name", supporting: "Alex Mercer", icon: "person", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Email Address", supporting: "alex.mercer@atelier.com", icon: "mail", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Create Password", supporting: "At least 8 characters", icon: "lock", variant: "outlined", size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_signup.x + PHONE_MARGIN,
    y: f_signup.y + 320,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "checkbox",
        label: "I agree to Terms & Conditions and Privacy Policy",
        checked: true,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_signup.x + PHONE_MARGIN,
    y: f_signup.y + 380,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Create Free Account",
        icon: "person_add",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_home", transition: "slide" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 25: Forgot Password
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_forgot_pwd.x,
    y: f_forgot_pwd.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Forgot Password",
        icon: "arrow_back",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_login", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_forgot_pwd.x + PHONE_MARGIN,
    y: f_forgot_pwd.y + 76,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Password Recovery",
        supporting: "Enter the email associated with your account. We will send you a 4-digit verification code.",
        icon: "lock_reset",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
      },
      {
        id: uid(),
        kind: "textField",
        label: "Registered Email Address",
        supporting: "alex.mercer@atelier.com",
        icon: "mail",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_forgot_pwd.x + PHONE_MARGIN,
    y: f_forgot_pwd.y + 260,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Send 4-Digit Code",
        icon: "send",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_verification_code", transition: "slide" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 26: Verification Code
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_verify_code.x,
    y: f_verify_code.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Verification Code",
        icon: "arrow_back",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_forgot_password", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_verify_code.x + PHONE_MARGIN,
    y: f_verify_code.y + 76,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Code Sent to alex.mercer@atelier.com",
        supporting: "Please check your inbox or spam folder for your 4-digit security code.",
        icon: "mark_email_read",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
      {
        id: uid(),
        kind: "textField",
        label: "Enter 4-Digit Code",
        supporting: "• • • • (e.g. 8421)",
        icon: "pin",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_verify_code.x + PHONE_MARGIN,
    y: f_verify_code.y + 260,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Verify & Continue",
        icon: "verified",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_reset_password", transition: "slide" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 27: Reset Password
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_reset_pwd.x,
    y: f_reset_pwd.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Set New Password",
        icon: "arrow_back",
        variant: "filled",
        size: FRAME_W,
        action: { to: "cloth_verification_code", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reset_pwd.x + PHONE_MARGIN,
    y: f_reset_pwd.y + 76,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "New Password", supporting: "At least 8 characters", icon: "lock", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Confirm New Password", supporting: "Re-type password", icon: "lock_reset", variant: "outlined", size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reset_pwd.x + PHONE_MARGIN,
    y: f_reset_pwd.y + 240,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Update Password & Sign In",
        icon: "check_circle",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_login", transition: "slide" },
      },
    ],
  });

  return {
    title: "Define Atelier (Complete 27-Screen Cloth Shop App)",
    brief: "Complete production-ready 27-screen luxury streetwear and fashion e-commerce application. Every screen is fully editable, layer-managed, reorderable, with interactive flow connections and complete Expo Router support.",
    frame: "phone",
    platform: "android",
    paletteKey: "obsidian",
    frames,
    groups,
  };
}
