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

// Curated authentic fashion images matching Define Apparel Cloth Shop
const FASHION_IMGS = {
  hero:
    localClothImages["../../cloth_shop_frontend/assets/images/onboarding_streetwear_model_1791167538578.jpg"] ||
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80",
  navyTee:
    localClothImages["../../cloth_shop_frontend/assets/images/product_navy_slogan_tshirt_1791167551962.jpg"] ||
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80",
  tealPolo:
    localClothImages["../../cloth_shop_frontend/assets/images/product_teal_polo_shirt_1791167564380.jpg"] ||
    "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=80",
  blackTee:
    localClothImages["../../cloth_shop_frontend/assets/images/product_black_sleeveless_tshirt_1791167574621.jpg"] ||
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
  vneckTee:
    localClothImages["../../cloth_shop_frontend/assets/images/product_black_vneck_tshirt_1791167585813.jpg"] ||
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
  pinkThermal:
    localClothImages["../../cloth_shop_frontend/assets/images/product_pink_longsleeve_tshirt_1791167599439.jpg"] ||
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80",
};

/**
 * Builds the complete 27-screen Cloth Shop Application document for M3E Canvas.
 * Every screen is mathematically measured and positioned with ZERO overlapping,
 * accurate widths & heights, no squashed cards, and clean luxury fashion UI.
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

  // ==========================================================================
  // ROW 0: Primary Shopping Flow (y = 0)
  // ==========================================================================
  const f_home: Frame = {
    id: "cloth_home",
    name: "1. Discover (Homepage)",
    x: STRIDE_X * 0,
    y: STRIDE_Y * 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Discover feed with search bar, category filter pills, 2-column product grid with prices, and bottom navigation.",
  };

  const f_search: Frame = {
    id: "cloth_search",
    name: "2. Search & Catalog",
    x: STRIDE_X * 1,
    y: STRIDE_Y * 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Active search filter, recent searches, category tabs, and real clothing catalog results.",
  };

  const f_detail: Frame = {
    id: "cloth_product_detail",
    name: "3. Product Details",
    x: STRIDE_X * 2,
    y: STRIDE_Y * 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "High-res garment photo, pricing, size selector (S, M, L), review rating, and sticky Add to Bag CTA.",
  };

  const f_reviews: Frame = {
    id: "cloth_reviews",
    name: "4. Customer Reviews",
    x: STRIDE_X * 3,
    y: STRIDE_Y * 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Overall rating 4.8/5, verified customer review cards with star ratings and reviewer comments.",
  };

  const f_saved: Frame = {
    id: "cloth_saved",
    name: "5. Saved Items (Wishlist)",
    x: STRIDE_X * 4,
    y: STRIDE_Y * 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Favorite saved items with Move to Cart action and quick remove button.",
  };

  const f_cart: Frame = {
    id: "cloth_cart",
    name: "6. My Cart (Shopping Bag)",
    x: STRIDE_X * 5,
    y: STRIDE_Y * 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Cart items with quantities, coupon voucher input, price breakdown, and Proceed to Checkout button.",
  };

  const f_checkout: Frame = {
    id: "cloth_checkout",
    name: "7. Order Checkout",
    x: STRIDE_X * 6,
    y: STRIDE_Y * 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Delivery address card, payment method card, pricing summary, and Place Order button.",
  };

  // ==========================================================================
  // ROW 1: Account, Orders & Support (y = 1012)
  // ==========================================================================
  const f_account: Frame = {
    id: "cloth_account",
    name: "8. Account & Profile",
    x: STRIDE_X * 0,
    y: STRIDE_Y * 1,
    w: FRAME_W,
    h: FRAME_H,
    note: "User membership card, VIP status, menu list items for Orders, Address Book, Payment Methods, and Settings.",
  };

  const f_my_orders: Frame = {
    id: "cloth_my_orders",
    name: "9. My Orders",
    x: STRIDE_X * 1,
    y: STRIDE_Y * 1,
    w: FRAME_W,
    h: FRAME_H,
    note: "Active, delivered and cancelled orders list with status indicators and Track Order buttons.",
  };

  const f_track_order: Frame = {
    id: "cloth_track_order",
    name: "10. Track Order Live",
    x: STRIDE_X * 2,
    y: STRIDE_Y * 1,
    w: FRAME_W,
    h: FRAME_H,
    note: "Order delivery timeline stepper, package progress, courier details, and contact button.",
  };

  const f_my_details: Frame = {
    id: "cloth_my_details",
    name: "11. Personal Details",
    x: STRIDE_X * 3,
    y: STRIDE_Y * 1,
    w: FRAME_W,
    h: FRAME_H,
    note: "Customer profile fields (Full Name, Email, Phone, Birthday) with Save Changes button.",
  };

  const f_notifications: Frame = {
    id: "cloth_notifications",
    name: "12. Notifications",
    x: STRIDE_X * 4,
    y: STRIDE_Y * 1,
    w: FRAME_W,
    h: FRAME_H,
    note: "Order delivery updates, new seasonal collection drops, and flash sale alerts.",
  };

  const f_help_center: Frame = {
    id: "cloth_help_center",
    name: "13. Help Center",
    x: STRIDE_X * 5,
    y: STRIDE_Y * 1,
    w: FRAME_W,
    h: FRAME_H,
    note: "Support search, FAQ topic cards, return policy guide, and Contact Customer Service button.",
  };

  const f_customer_service: Frame = {
    id: "cloth_customer_service",
    name: "14. Customer Service",
    x: STRIDE_X * 6,
    y: STRIDE_Y * 1,
    w: FRAME_W,
    h: FRAME_H,
    note: "Live agent support chat interface with message bubbles and reply input field.",
  };

  // ==========================================================================
  // ROW 2: Payment, Shipping & Settings (y = 2024)
  // ==========================================================================
  const f_payment_method: Frame = {
    id: "cloth_payment_method",
    name: "15. Payment Methods",
    x: STRIDE_X * 0,
    y: STRIDE_Y * 2,
    w: FRAME_W,
    h: FRAME_H,
    note: "Saved Visa, Mastercard, Apple Pay, Cash on Delivery, and Add New Card action.",
  };

  const f_new_card: Frame = {
    id: "cloth_new_card",
    name: "16. Add New Card",
    x: STRIDE_X * 1,
    y: STRIDE_Y * 2,
    w: FRAME_W,
    h: FRAME_H,
    note: "Cardholder name, 16-digit card number, expiry date, and CVV fields with Save Card button.",
  };

  const f_address: Frame = {
    id: "cloth_address",
    name: "17. Delivery Addresses",
    x: STRIDE_X * 2,
    y: STRIDE_Y * 2,
    w: FRAME_W,
    h: FRAME_H,
    note: "Saved shipping addresses list with default selection badge and Add New Address action.",
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
    note: "Switches for Order Tracking Alerts, New Drops, Promotions, and SMS Text Messages.",
  };

  const f_faqs: Frame = {
    id: "cloth_faqs",
    name: "20. FAQs",
    x: STRIDE_X * 5,
    y: STRIDE_Y * 2,
    w: FRAME_W,
    h: FRAME_H,
    note: "Frequently asked questions accordion list on shipping speed, returns, and size guide.",
  };

  // ==========================================================================
  // ROW 3: Auth & Onboarding (y = 3036)
  // ==========================================================================
  const f_splash: Frame = {
    id: "cloth_splash",
    name: "21. Splash Screen",
    x: STRIDE_X * 0,
    y: STRIDE_Y * 3,
    w: FRAME_W,
    h: FRAME_H,
    note: "Define Apparel brand splash with logo crest and loading bar.",
  };

  const f_onboarding: Frame = {
    id: "cloth_onboarding",
    name: "22. Onboarding Screen",
    x: STRIDE_X * 1,
    y: STRIDE_Y * 3,
    w: FRAME_W,
    h: FRAME_H,
    note: "Streetwear model showcase photo, headline 'Define yourself in your unique way.', and Get Started CTA.",
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
    note: "Full name, email, password fields, terms agreement checkbox, and Create Account button.",
  };

  const f_forgot_pwd: Frame = {
    id: "cloth_forgot_password",
    name: "25. Forgot Password",
    x: STRIDE_X * 4,
    y: STRIDE_Y * 3,
    w: FRAME_W,
    h: FRAME_H,
    note: "Email input to request a 4-digit verification code with Send Code button.",
  };

  const f_verify_code: Frame = {
    id: "cloth_verification_code",
    name: "26. Verification Code",
    x: STRIDE_X * 5,
    y: STRIDE_Y * 3,
    w: FRAME_W,
    h: FRAME_H,
    note: "4-digit security code input boxes with Verify & Continue button and Resend Code timer.",
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

  frames.push(
    f_home, f_search, f_detail, f_reviews, f_saved, f_cart, f_checkout,
    f_account, f_my_orders, f_track_order, f_my_details, f_notifications, f_help_center, f_customer_service,
    f_payment_method, f_new_card, f_address, f_new_address, f_notification_settings, f_faqs,
    f_splash, f_onboarding, f_login, f_signup, f_forgot_pwd, f_verify_code, f_reset_pwd
  );

  // Bottom Navigation Generator
  const buildBottomNav = (frame: Frame, selectedIndex: number): Group => ({
    id: uid(),
    x: frame.x,
    y: frame.y + FRAME_H - 76,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "bottomNav",
        label: "",
        icon: null,
        variant: "filled",
        size: FRAME_W,
        size2: 76,
        tabs: [
          { icon: "home", label: "Home" },
          { icon: "search", label: "Search" },
          { icon: "favorite_border", label: "Saved" },
          { icon: "shopping_bag", label: "Cart" },
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
  // SCREEN 1: Discover (Homepage) - EXACT SAME AS SCREENSHOT 2
  // ==========================================================================
  // 1. Top Header: Discover + Search + Bell
  groups.push({
    id: uid(),
    x: f_home.x,
    y: f_home.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Discover",
        icon: null,
        icon2: "search",
        icon3: "notifications",
        font: 28,
        variant: "text",
        size: FRAME_W,
        size2: 64,
        actions: {
          icon2: { to: "cloth_search", transition: "fade" },
          icon3: { to: "cloth_notifications", transition: "slide" },
        },
      },
    ],
  });

  // 2. Search Bar
  groups.push({
    id: uid(),
    x: f_home.x + PHONE_MARGIN,
    y: f_home.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "searchBar",
        label: "Search for clothes...",
        icon: "search",
        icon2: "mic",
        icon3: "tune",
        variant: "tonal",
        size: 380,
        size2: 48,
        action: { to: "cloth_search", transition: "fade" },
      },
    ],
  });

  // 3. Category Pills Row
  groups.push({
    id: uid(),
    x: f_home.x + PHONE_MARGIN,
    y: f_home.y + 172,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "All", variant: "filled", size2: 36 },
      { id: uid(), kind: "chip", label: "Tshirts", variant: "tonal", size2: 36, action: { to: "cloth_search" } },
      { id: uid(), kind: "chip", label: "Jeans", variant: "tonal", size2: 36, action: { to: "cloth_search" } },
      { id: uid(), kind: "chip", label: "Shoes", variant: "tonal", size2: 36, action: { to: "cloth_search" } },
    ],
  });

  // 4. Product Grid Row 1 (Regular Fit Slogan & Regular Fit Polo)
  groups.push({
    id: uid(),
    x: f_home.x + PHONE_MARGIN,
    y: f_home.y + 220,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Slogan",
        supporting: "$1,190",
        icon2: "favorite_border",
        variant: "outlined",
        size: 184,
        size2: 270,
        imagePos: "top",
        imageSize: 185,
        src: FASHION_IMGS.navyTee,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Polo",
        supporting: "$1,100",
        badge: "-52%",
        icon2: "favorite_border",
        variant: "outlined",
        size: 184,
        size2: 270,
        imagePos: "top",
        imageSize: 185,
        src: FASHION_IMGS.tealPolo,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
    ],
  });

  // 5. Product Grid Row 2 (Regular Fit Black & Regular Fit V-Neck)
  groups.push({
    id: uid(),
    x: f_home.x + PHONE_MARGIN,
    y: f_home.y + 502,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Black",
        supporting: "$1,690",
        icon2: "favorite_border",
        variant: "outlined",
        size: 184,
        size2: 270,
        imagePos: "top",
        imageSize: 185,
        src: FASHION_IMGS.blackTee,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit V-Neck",
        supporting: "$1,290",
        icon2: "favorite_border",
        variant: "outlined",
        size: 184,
        size2: 270,
        imagePos: "top",
        imageSize: 185,
        src: FASHION_IMGS.vneckTee,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
    ],
  });

  groups.push(buildBottomNav(f_home, 0));

  // ==========================================================================
  // SCREEN 2: Visual Search & Catalog
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
        label: "Search & Catalog",
        icon: "arrow_back",
        icon2: "tune",
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_home", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_search.x + PHONE_MARGIN,
    y: f_search.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "searchBar",
        label: "T-Shirts & Streetwear",
        icon: "search",
        icon2: "close",
        variant: "tonal",
        size: 380,
        size2: 48,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_search.x + PHONE_MARGIN,
    y: f_search.y + 172,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "All Items", variant: "filled", size2: 36 },
      { id: uid(), kind: "chip", label: "Under $1,250", variant: "tonal", size2: 36 },
      { id: uid(), kind: "chip", label: "Top Rated 4.5+", variant: "tonal", size2: 36 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_search.x + PHONE_MARGIN,
    y: f_search.y + 220,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Pink Thermal Longsleeve",
        supporting: "$1,450",
        badge: "New Drop",
        icon2: "favorite_border",
        variant: "outlined",
        size: 184,
        size2: 270,
        imagePos: "top",
        imageSize: 185,
        src: FASHION_IMGS.pinkThermal,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Streetwear Model Jacket",
        supporting: "$2,100",
        icon2: "favorite_border",
        variant: "outlined",
        size: 184,
        size2: 270,
        imagePos: "top",
        imageSize: 185,
        src: FASHION_IMGS.hero,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_search.x + PHONE_MARGIN,
    y: f_search.y + 502,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Slogan",
        supporting: "$1,190",
        icon2: "favorite_border",
        variant: "outlined",
        size: 184,
        size2: 270,
        imagePos: "top",
        imageSize: 185,
        src: FASHION_IMGS.navyTee,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Polo",
        supporting: "$1,100",
        badge: "-52%",
        icon2: "favorite_border",
        variant: "outlined",
        size: 184,
        size2: 270,
        imagePos: "top",
        imageSize: 185,
        src: FASHION_IMGS.tealPolo,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
    ],
  });

  groups.push(buildBottomNav(f_search, 1));

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
        icon2: "share",
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_home", transition: "slideLeft" },
      },
    ],
  });

  // Hero Garment Image (380 x 360)
  groups.push({
    id: uid(),
    x: f_detail.x + PHONE_MARGIN,
    y: f_detail.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "",
        icon2: "favorite",
        icon2Fill: true,
        variant: "filled",
        size: 380,
        size2: 360,
        imagePos: "top",
        imageSize: 360,
        src: FASHION_IMGS.navyTee,
      },
    ],
  });

  // Title, Price & Review Rating
  groups.push({
    id: uid(),
    x: f_detail.x + PHONE_MARGIN,
    y: f_detail.y + 484,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "listItem",
        label: "Regular Fit Slogan T-Shirt",
        supporting: "$1,190.00 · ★ 4.8/5 (240 verified reviews)",
        icon: "verified",
        variant: "text",
        size: 380,
        action: { to: "cloth_reviews", transition: "slide" },
      },
    ],
  });

  // Size chips (S, M, L, XL)
  groups.push({
    id: uid(),
    x: f_detail.x + PHONE_MARGIN,
    y: f_detail.y + 566,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "Size S", variant: "tonal", size2: 36 },
      { id: uid(), kind: "chip", label: "Size M (Selected)", variant: "filled", size2: 36 },
      { id: uid(), kind: "chip", label: "Size L", variant: "tonal", size2: 36 },
      { id: uid(), kind: "chip", label: "Size XL", variant: "tonal", size2: 36 },
    ],
  });

  // Description Card
  groups.push({
    id: uid(),
    x: f_detail.x + PHONE_MARGIN,
    y: f_detail.y + 614,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "380GSM Combed Cotton · Boxy Oversized Fit",
        supporting: "Pre-shrunk architectural silhouette with reinforced rib collar. Model is 6'1\" wearing size M.",
        variant: "tonal",
        size: 380,
        size2: 90,
      },
    ],
  });

  // Dual Action Buttons: Add to Bag & Buy Now
  groups.push({
    id: uid(),
    x: f_detail.x + PHONE_MARGIN,
    y: f_detail.y + 716,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Add to Bag",
        icon: "shopping_bag",
        variant: "outlined",
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

  groups.push(buildBottomNav(f_detail, 0));

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
        label: "Customer Reviews (240)",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_product_detail", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reviews.x + PHONE_MARGIN,
    y: f_reviews.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "4.8 out of 5 Stars · Verified Purchases",
        supporting: "96% of buyers recommend this fit · 189 five-star reviews",
        icon: "star",
        variant: "tonal",
        size: 380,
        size2: 100,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reviews.x + PHONE_MARGIN,
    y: f_reviews.y + 224,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Marcus Vance · ★★★★★ (Verified Buyer)",
        supporting: "The heavyweight fabric drape is incredible. Exactly the high-end streetwear silhouette I wanted. Fits true to size.",
        icon: "person",
        variant: "outlined",
        size: 380,
        size2: 120,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reviews.x + PHONE_MARGIN,
    y: f_reviews.y + 356,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Sarah Chen · ★★★★★ (Verified Buyer)",
        supporting: "True to size, super fast 2-day delivery to New York. Love the subtle embroidery on the chest and thick collar.",
        icon: "person",
        variant: "outlined",
        size: 380,
        size2: 120,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reviews.x + PHONE_MARGIN,
    y: f_reviews.y + 488,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Liam Kowalski · ★★★★☆ (Verified Buyer)",
        supporting: "Color matches the studio pictures perfectly. Washed twice and held its shape with zero shrinking.",
        icon: "person",
        variant: "outlined",
        size: 380,
        size2: 120,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reviews.x + PHONE_MARGIN,
    y: f_reviews.y + 620,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Elena Rostova · ★★★★★ (Verified Buyer)",
        supporting: "Obsidian black is saturated and deep. Premium luxury feel that rivals designer brands at triple the price.",
        icon: "person",
        variant: "outlined",
        size: 380,
        size2: 120,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reviews.x + PHONE_MARGIN,
    y: f_reviews.y + 752,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Write a Verified Review",
        icon: "rate_review",
        variant: "filled",
        size: 380,
        size2: 52,
      },
    ],
  });

  groups.push(buildBottomNav(f_reviews, 0));

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
        icon2: "delete_outline",
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_home", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_saved.x + PHONE_MARGIN,
    y: f_saved.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Slogan · $1,190",
        supporting: "Navy Blue · Size M · In Stock · Free Shipping",
        icon: "favorite",
        variant: "outlined",
        size: 380,
        size2: 130,
        imagePos: "leading",
        imageSize: 110,
        src: FASHION_IMGS.navyTee,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_saved.x + PHONE_MARGIN,
    y: f_saved.y + 254,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Polo · $1,100",
        supporting: "Teal Green · Size L · -52% Sale Active",
        icon: "favorite",
        variant: "outlined",
        size: 380,
        size2: 130,
        imagePos: "leading",
        imageSize: 110,
        src: FASHION_IMGS.tealPolo,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_saved.x + PHONE_MARGIN,
    y: f_saved.y + 396,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Black · $1,690",
        supporting: "Sleeveless Edition · Size M · In Stock",
        icon: "favorite",
        variant: "outlined",
        size: 380,
        size2: 130,
        imagePos: "leading",
        imageSize: 110,
        src: FASHION_IMGS.blackTee,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_saved.x + PHONE_MARGIN,
    y: f_saved.y + 538,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit V-Neck · $1,290",
        supporting: "Sand Beige · Size L · Limited Edition Drop",
        icon: "favorite",
        variant: "outlined",
        size: 380,
        size2: 130,
        imagePos: "leading",
        imageSize: 110,
        src: FASHION_IMGS.vneckTee,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_saved.x + PHONE_MARGIN,
    y: f_saved.y + 680,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Move All 4 Items to Cart ($5,270.00)",
        icon: "shopping_bag",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_cart", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_saved.x + PHONE_MARGIN,
    y: f_saved.y + 746,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Clear All Saved Items",
        variant: "text",
        size: 380,
        size2: 44,
      },
    ],
  });

  groups.push(buildBottomNav(f_saved, 2));

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
        label: "Shopping Bag (3 Items)",
        icon: "arrow_back",
        icon2: "delete_sweep",
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_home", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_cart.x + PHONE_MARGIN,
    y: f_cart.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Slogan · $1,190",
        supporting: "Qty: 1 · Size: M · Color: Navy · $1,190.00",
        icon: "shopping_bag",
        variant: "outlined",
        size: 380,
        size2: 120,
        imagePos: "leading",
        imageSize: 100,
        src: FASHION_IMGS.navyTee,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_cart.x + PHONE_MARGIN,
    y: f_cart.y + 244,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Polo · $1,100",
        supporting: "Qty: 1 · Size: L · Color: Teal · -52% Applied",
        icon: "shopping_bag",
        variant: "outlined",
        size: 380,
        size2: 120,
        imagePos: "leading",
        imageSize: 100,
        src: FASHION_IMGS.tealPolo,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_cart.x + PHONE_MARGIN,
    y: f_cart.y + 376,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Black · $1,690",
        supporting: "Qty: 1 · Size: M · Sleeveless Edition",
        icon: "shopping_bag",
        variant: "outlined",
        size: 380,
        size2: 120,
        imagePos: "leading",
        imageSize: 100,
        src: FASHION_IMGS.blackTee,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_cart.x + PHONE_MARGIN,
    y: f_cart.y + 508,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Order Total: $4,060.00",
        supporting: "Subtotal: $3,980.00 · Standard Express: $80.00 · Taxes Included",
        icon: "receipt_long",
        variant: "tonal",
        size: 380,
        size2: 105,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_cart.x + PHONE_MARGIN,
    y: f_cart.y + 626,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Promo Code 'ATELIER' Applied (-$400)",
        supporting: "VIP member 10% voucher activated · Free worldwide delivery included",
        icon: "confirmation_number",
        variant: "tonal",
        size: 380,
        size2: 70,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_cart.x + PHONE_MARGIN,
    y: f_cart.y + 708,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Proceed to Checkout ($3,660.00)",
        icon: "lock",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_checkout", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_cart.x + PHONE_MARGIN,
    y: f_cart.y + 770,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Continue Shopping & Browse Drops",
        variant: "text",
        size: 380,
        size2: 36,
        action: { to: "cloth_home", transition: "slideLeft" },
      },
    ],
  });

  groups.push(buildBottomNav(f_cart, 3));

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
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_cart", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_checkout.x + PHONE_MARGIN,
    y: f_checkout.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Shipping Address (Home Default)",
        supporting: "Alexandre Moreau · +1 (555) 0192\n742 Evergreen Terrace, Apt 4B, New York, NY 10001",
        icon: "location_on",
        variant: "outlined",
        size: 380,
        size2: 120,
        action: { to: "cloth_address", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_checkout.x + PHONE_MARGIN,
    y: f_checkout.y + 244,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Payment Method: Visa •••• 4242",
        supporting: "Expires 12/28 · Cardholder: Alexandre Moreau · SSL Encrypted",
        icon: "credit_card",
        variant: "outlined",
        size: 380,
        size2: 110,
        action: { to: "cloth_payment_method", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_checkout.x + PHONE_MARGIN,
    y: f_checkout.y + 366,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Delivery Service: DHL Express ($80)",
        supporting: "Estimated Arrival: Thursday, Oct 14 · Signature Required",
        icon: "local_shipping",
        variant: "tonal",
        size: 380,
        size2: 100,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_checkout.x + PHONE_MARGIN,
    y: f_checkout.y + 478,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Total Due: $4,060.00 (3 items)",
        supporting: "Bag Subtotal: $3,980.00 · Shipping: $80.00 · Promo 'ATELIER' applied",
        icon: "receipt_long",
        variant: "tonal",
        size: 380,
        size2: 100,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_checkout.x + PHONE_MARGIN,
    y: f_checkout.y + 592,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Buyer Protection & 30-Day Guarantee",
        supporting: "SSL 256-Bit Encrypted · Free return insurance included with every order",
        icon: "verified_user",
        variant: "tonal",
        size: 380,
        size2: 70,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_checkout.x + PHONE_MARGIN,
    y: f_checkout.y + 674,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Confirm & Place Order ($4,060.00)",
        icon: "check_circle",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_track_order", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_checkout.x + PHONE_MARGIN,
    y: f_checkout.y + 738,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Return to Shopping Bag",
        variant: "text",
        size: 380,
        size2: 38,
        action: { to: "cloth_cart", transition: "slideLeft" },
      },
    ],
  });

  groups.push(buildBottomNav(f_checkout, 3));

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
        icon: null,
        icon2: "settings",
        variant: "text",
        size: FRAME_W,
        size2: 64,
        actions: { icon2: { to: "cloth_notification_settings" } },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_account.x + PHONE_MARGIN,
    y: f_account.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Alexandre Moreau",
        supporting: "alexandre.moreau@atelier.com · VIP Black Tier Member (2,840 pts)",
        icon: "account_circle",
        variant: "tonal",
        size: 380,
        size2: 100,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_account.x + PHONE_MARGIN,
    y: f_account.y + 224,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "3 Orders", variant: "tonal", size2: 36, action: { to: "cloth_my_orders" } },
      { id: uid(), kind: "chip", label: "4 Saved", variant: "tonal", size2: 36, action: { to: "cloth_saved" } },
      { id: uid(), kind: "chip", label: "$120 Credits", variant: "filled", size2: 36 },
      { id: uid(), kind: "chip", label: "VIP Black", variant: "tonal", size2: 36 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_account.x + PHONE_MARGIN,
    y: f_account.y + 272,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "listItem",
        label: "My Orders & History",
        supporting: "3 orders placed · 1 in transit",
        icon: "package_2",
        variant: "outlined",
        size: 380,
        action: { to: "cloth_my_orders", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Delivery Addresses",
        supporting: "2 saved shipping addresses (Home, Office)",
        icon: "home",
        variant: "outlined",
        size: 380,
        action: { to: "cloth_address", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Payment Methods",
        supporting: "Visa ending in •••• 4242, Apple Pay",
        icon: "credit_card",
        variant: "outlined",
        size: 380,
        action: { to: "cloth_payment_method", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Personal Profile Details",
        supporting: "Full Name, Email, Phone & Birthday",
        icon: "badge",
        variant: "outlined",
        size: 380,
        action: { to: "cloth_my_details", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Help Center & FAQs",
        supporting: "Returns, client concierge & size guides",
        icon: "help_outline",
        variant: "outlined",
        size: 380,
        action: { to: "cloth_help_center", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_account.x + PHONE_MARGIN,
    y: f_account.y + 680,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Sign Out of Account",
        icon: "logout",
        variant: "outlined",
        size: 380,
        size2: 50,
        action: { to: "cloth_login", transition: "fade" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_account.x + PHONE_MARGIN,
    y: f_account.y + 748,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Atelier VIP Black Member · Since MMXXIV",
        variant: "text",
        size: 380,
        size2: 36,
      },
    ],
  });

  groups.push(buildBottomNav(f_account, 4));

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
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_account", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_orders.x + PHONE_MARGIN,
    y: f_my_orders.y + 112,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "Active (1)", variant: "filled", size2: 36 },
      { id: uid(), kind: "chip", label: "Delivered (5)", variant: "tonal", size2: 36 },
      { id: uid(), kind: "chip", label: "Cancelled", variant: "tonal", size2: 36 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_orders.x + PHONE_MARGIN,
    y: f_my_orders.y + 160,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Order #AT-9842 · $1,190.00",
        supporting: "Status: In Transit (Arriving Today)\nItem: Regular Fit Slogan T-Shirt (M)\nCourier: DHL Express Michael S.",
        icon: "local_shipping",
        variant: "outlined",
        size: 380,
        size2: 135,
        action: { to: "cloth_track_order", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_orders.x + PHONE_MARGIN,
    y: f_my_orders.y + 308,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Order #AT-9610 · $2,200.00",
        supporting: "Delivered on Sep 28, 2026\nItems: Regular Fit Polo (L) & Pink Thermal (M)\nReceipt available",
        icon: "check_circle",
        variant: "outlined",
        size: 380,
        size2: 130,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_orders.x + PHONE_MARGIN,
    y: f_my_orders.y + 450,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Order #AT-9420 · $1,690.00",
        supporting: "Delivered on Aug 14, 2026\nItem: Regular Fit Black Tank (M)\nRated: ★★★★★",
        icon: "check_circle",
        variant: "outlined",
        size: 380,
        size2: 130,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_orders.x + PHONE_MARGIN,
    y: f_my_orders.y + 592,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Order #AT-9102 · $1,290.00",
        supporting: "Delivered on Jul 02, 2026\nItem: Regular Fit V-Neck (L)\nReceipt available",
        icon: "check_circle",
        variant: "outlined",
        size: 380,
        size2: 125,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_orders.x + PHONE_MARGIN,
    y: f_my_orders.y + 732,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Live Track Active Order #AT-9842",
        icon: "navigation",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_track_order", transition: "slide" },
      },
    ],
  });

  groups.push(buildBottomNav(f_my_orders, 4));

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
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_my_orders", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_track_order.x + PHONE_MARGIN,
    y: f_track_order.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Out for Delivery · Today by 4:30 PM",
        supporting: "Courier: DHL Express · Driver: Michael S. · Van #44 · Contact: +1 (555) 0812",
        icon: "local_shipping",
        variant: "tonal",
        size: 380,
        size2: 110,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_track_order.x + PHONE_MARGIN,
    y: f_track_order.y + 234,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "listItem",
        label: "1. Order Confirmed & Paid",
        supporting: "Oct 10, 10:30 AM · Verified via Stripe",
        icon: "check_circle",
        variant: "text",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "2. Package Dispatched from Hub",
        supporting: "Oct 10, 8:15 PM · Brooklyn Logistics Center",
        icon: "check_circle",
        variant: "text",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "3. Out for Delivery with Driver",
        supporting: "Today, 8:45 AM · Near your street",
        icon: "local_shipping",
        variant: "text",
        size: 380,
      },
      {
        id: uid(),
        kind: "listItem",
        label: "4. Handover to Customer",
        supporting: "Pending final delivery signature",
        icon: "schedule",
        variant: "text",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_track_order.x + PHONE_MARGIN,
    y: f_track_order.y + 504,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Delivering to: Alexandre Moreau",
        supporting: "742 Evergreen Terrace, Apt 4B, New York, NY 10001\nDelivery window: Today 4:00 PM - 5:30 PM",
        icon: "location_on",
        variant: "outlined",
        size: 380,
        size2: 95,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_track_order.x + PHONE_MARGIN,
    y: f_track_order.y + 614,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Call Courier",
        icon: "phone",
        variant: "filled",
        size: 184,
        size2: 52,
        action: { to: "cloth_customer_service", transition: "slide" },
      },
      {
        id: uid(),
        kind: "button",
        label: "Delivery Notes",
        icon: "edit_note",
        variant: "outlined",
        size: 184,
        size2: 52,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_track_order.x + PHONE_MARGIN,
    y: f_track_order.y + 680,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Live GPS Tracking Active · 100% Insured",
        supporting: "Signature required upon physical handover at doorstep",
        icon: "verified_user",
        variant: "tonal",
        size: 380,
        size2: 65,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_track_order.x + PHONE_MARGIN,
    y: f_track_order.y + 758,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "View Detailed Shipping Invoice",
        variant: "text",
        size: 380,
        size2: 40,
      },
    ],
  });

  groups.push(buildBottomNav(f_track_order, 4));

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
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_account", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_details.x + PHONE_MARGIN,
    y: f_my_details.y + 112,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "Full Name", supporting: "Alexandre Moreau", icon: "person", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Email Address", supporting: "alexandre.moreau@atelier.com", icon: "mail", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Phone Number", supporting: "+1 (555) 0192-384", icon: "phone", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Date of Birth", supporting: "14/05/1996", icon: "cake", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Preferred Size", supporting: "Size M (Boxy Cut)", icon: "straighten", variant: "outlined", size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_details.x + PHONE_MARGIN,
    y: f_my_details.y + 440,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "VIP Membership: Tier Black",
        supporting: "Active since 2024 · 2,840 pts available for drops",
        icon: "verified",
        variant: "tonal",
        size: 380,
        size2: 80,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_details.x + PHONE_MARGIN,
    y: f_my_details.y + 530,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "SMS & WhatsApp Drop Alerts",
        supporting: "Instant notifications when limited garments drop",
        icon: "sms",
        variant: "outlined",
        size: 380,
        size2: 80,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_details.x + PHONE_MARGIN,
    y: f_my_details.y + 620,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Two-Factor Security: Enabled",
        supporting: "Protected with biometric Touch ID / Face ID",
        icon: "security",
        variant: "tonal",
        size: 380,
        size2: 75,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_details.x + PHONE_MARGIN,
    y: f_my_details.y + 705,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Save Profile Changes & Preferences",
        icon: "check",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_account", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_details.x + PHONE_MARGIN,
    y: f_my_details.y + 768,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Download Account Data (.JSON)",
        variant: "text",
        size: 380,
        size2: 36,
      },
    ],
  });

  groups.push(buildBottomNav(f_my_details, 4));

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
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_home", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notifications.x + PHONE_MARGIN,
    y: f_notifications.y + 112,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "All (12)", variant: "filled", size2: 36 },
      { id: uid(), kind: "chip", label: "Orders (4)", variant: "tonal", size2: 36 },
      { id: uid(), kind: "chip", label: "Drops (5)", variant: "tonal", size2: 36 },
      { id: uid(), kind: "chip", label: "Security", variant: "tonal", size2: 36 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notifications.x + PHONE_MARGIN,
    y: f_notifications.y + 160,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Order #AT-9842 is Out for Delivery",
        supporting: "Courier Michael is on your street. Expected at 4:30 PM · 10m ago",
        icon: "local_shipping",
        variant: "outlined",
        size: 380,
        size2: 100,
        action: { to: "cloth_track_order", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notifications.x + PHONE_MARGIN,
    y: f_notifications.y + 270,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Weekend Flash Sale: 25% Off Hoodies",
        supporting: "Exclusive VIP access: Use code ATELIER25 at checkout · 2 hours ago",
        icon: "local_fire_department",
        variant: "tonal",
        size: 380,
        size2: 100,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notifications.x + PHONE_MARGIN,
    y: f_notifications.y + 380,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Back in Stock: Regular Fit Black",
        supporting: "Sleeveless tank restocked in sizes M and L · Yesterday",
        icon: "notifications",
        variant: "outlined",
        size: 380,
        size2: 100,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notifications.x + PHONE_MARGIN,
    y: f_notifications.y + 490,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "VIP Tier Upgraded to Black Member",
        supporting: "You have earned 2,840 loyalty points this season · 3 days ago",
        icon: "verified",
        variant: "outlined",
        size: 380,
        size2: 100,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notifications.x + PHONE_MARGIN,
    y: f_notifications.y + 600,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Security Alert: Login Verified",
        supporting: "Successful biometric login from New York, NY · 4 days ago",
        icon: "security",
        variant: "tonal",
        size: 380,
        size2: 85,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notifications.x + PHONE_MARGIN,
    y: f_notifications.y + 695,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Mark All 12 Notifications as Read",
        icon: "done_all",
        variant: "filled",
        size: 380,
        size2: 50,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notifications.x + PHONE_MARGIN,
    y: f_notifications.y + 755,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Manage Notification Preferences",
        variant: "text",
        size: 380,
        size2: 40,
        action: { to: "cloth_notification_settings", transition: "slide" },
      },
    ],
  });

  groups.push(buildBottomNav(f_notifications, 4));

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
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_account", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_help_center.x + PHONE_MARGIN,
    y: f_help_center.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "searchBar",
        label: "Search support articles, returns, sizing...",
        icon: "search",
        variant: "tonal",
        size: 380,
        size2: 48,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_help_center.x + PHONE_MARGIN,
    y: f_help_center.y + 170,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Shipping & Worldwide Delivery",
        supporting: "Delivery timeframes, express rates, tracking & customs fees",
        icon: "local_shipping",
        variant: "outlined",
        size: 380,
        size2: 95,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_help_center.x + PHONE_MARGIN,
    y: f_help_center.y + 275,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Returns & 30-Day Exchanges",
        supporting: "Print pre-paid return labels, exchange steps & refund policy",
        icon: "assignment_return",
        variant: "outlined",
        size: 380,
        size2: 95,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_help_center.x + PHONE_MARGIN,
    y: f_help_center.y + 380,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Size & Sizing Guides",
        supporting: "Chest, sleeve and body length measurements for all capsules",
        icon: "straighten",
        variant: "outlined",
        size: 380,
        size2: 95,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_help_center.x + PHONE_MARGIN,
    y: f_help_center.y + 485,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Payment Security & Billing Invoices",
        supporting: "Accepted cards, currencies, Apple Pay & PDF receipts",
        icon: "credit_card",
        variant: "outlined",
        size: 380,
        size2: 95,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_help_center.x + PHONE_MARGIN,
    y: f_help_center.y + 590,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "24/7 VIP Concierge Desk",
        supporting: "Direct priority line for Atelier Society members",
        icon: "verified_user",
        variant: "tonal",
        size: 380,
        size2: 80,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_help_center.x + PHONE_MARGIN,
    y: f_help_center.y + 680,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Contact Live Customer Service",
        icon: "support_agent",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_customer_service", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_help_center.x + PHONE_MARGIN,
    y: f_help_center.y + 744,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Email Support: concierge@atelier.com",
        variant: "text",
        size: 380,
        size2: 40,
      },
    ],
  });

  groups.push(buildBottomNav(f_help_center, 4));

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
        label: "Customer Service Desk",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_help_center", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_customer_service.x + PHONE_MARGIN,
    y: f_customer_service.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Atelier Concierge: Emma (10:30 AM)",
        supporting: "Hello Alexandre! Thank you for reaching out. How can I assist you with order #AT-9842 today?",
        icon: "support_agent",
        variant: "tonal",
        size: 380,
        size2: 100,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_customer_service.x + PHONE_MARGIN,
    y: f_customer_service.y + 222,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "You (10:32 AM)",
        supporting: "Hi Emma, can I request delivery after 5 PM today?",
        icon: "person",
        variant: "outlined",
        size: 380,
        size2: 85,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_customer_service.x + PHONE_MARGIN,
    y: f_customer_service.y + 317,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Emma (10:33 AM)",
        supporting: "Certainly! I have forwarded your delivery instruction to DHL courier Michael. Your package will arrive between 5:00 - 5:30 PM.",
        icon: "support_agent",
        variant: "tonal",
        size: 380,
        size2: 105,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_customer_service.x + PHONE_MARGIN,
    y: f_customer_service.y + 432,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Ticket #CS-4091 · Resolved",
        supporting: "Special delivery instruction confirmed with driver Michael",
        icon: "check_circle",
        variant: "outlined",
        size: 380,
        size2: 75,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_customer_service.x + PHONE_MARGIN,
    y: f_customer_service.y + 517,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "You (10:35 AM)",
        supporting: "Awesome, thank you for arranging the 5 PM delivery! Have a wonderful day.",
        icon: "person",
        variant: "outlined",
        size: 380,
        size2: 85,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_customer_service.x + PHONE_MARGIN,
    y: f_customer_service.y + 612,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Emma (10:36 AM)",
        supporting: "You are most welcome Alexandre! Enjoy your Atelier pieces.",
        icon: "support_agent",
        variant: "tonal",
        size: 380,
        size2: 80,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_customer_service.x + PHONE_MARGIN,
    y: f_customer_service.y + 702,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "textField",
        label: "Type your message...",
        icon: "chat",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_customer_service.x + PHONE_MARGIN,
    y: f_customer_service.y + 760,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Send Message",
        icon: "send",
        variant: "filled",
        size: 380,
        size2: 44,
      },
    ],
  });

  groups.push(buildBottomNav(f_customer_service, 4));

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
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_checkout", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_payment_method.x + PHONE_MARGIN,
    y: f_payment_method.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Visa ending in •••• 4242 (Default)",
        supporting: "Cardholder: Alexandre Moreau · Exp: 12/28\nPrimary payment method for 1-click checkout",
        icon: "credit_card",
        variant: "outlined",
        size: 380,
        size2: 105,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_payment_method.x + PHONE_MARGIN,
    y: f_payment_method.y + 227,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Mastercard ending in •••• 8812",
        supporting: "Cardholder: Alexandre Moreau · Exp: 08/27\nSecondary backup payment card",
        icon: "credit_card",
        variant: "outlined",
        size: 380,
        size2: 105,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_payment_method.x + PHONE_MARGIN,
    y: f_payment_method.y + 342,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Apple Pay & Google Pay",
        supporting: "Enabled on this device · Instant biometric authorization",
        icon: "phone_iphone",
        variant: "tonal",
        size: 380,
        size2: 85,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_payment_method.x + PHONE_MARGIN,
    y: f_payment_method.y + 437,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Cash on Delivery (COD)",
        supporting: "Pay cash directly upon parcel handover at doorstep",
        icon: "payments",
        variant: "outlined",
        size: 380,
        size2: 85,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_payment_method.x + PHONE_MARGIN,
    y: f_payment_method.y + 532,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "256-Bit SSL Bank-Grade Security",
        supporting: "Encrypted via PCI-DSS Level 1 payment infrastructure",
        icon: "shield",
        variant: "tonal",
        size: 380,
        size2: 80,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_payment_method.x + PHONE_MARGIN,
    y: f_payment_method.y + 622,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Add New Credit / Debit Card",
        icon: "add",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_new_card", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_payment_method.x + PHONE_MARGIN,
    y: f_payment_method.y + 686,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Manage Billing Currencies & Invoices",
        variant: "text",
        size: 380,
        size2: 40,
      },
    ],
  });

  groups.push(buildBottomNav(f_payment_method, 4));

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
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_payment_method", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_card.x + PHONE_MARGIN,
    y: f_new_card.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "••••  ••••  ••••  4242",
        supporting: "ALEXANDRE MOREAU · EXP 12/28\nVISA SIGNATURE · 256-BIT ENCRYPTED",
        icon: "credit_card",
        variant: "filled",
        size: 380,
        size2: 130,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_card.x + PHONE_MARGIN,
    y: f_new_card.y + 252,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "Cardholder Full Name", supporting: "Alexandre Moreau", icon: "person", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "16-Digit Card Number", supporting: "4000 1234 5678 9010", icon: "credit_card", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Expiration Date (MM/YY)", supporting: "12 / 28", icon: "calendar_today", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "CVV Security Code (3 Digits)", supporting: "782", icon: "lock", variant: "outlined", size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_card.x + PHONE_MARGIN,
    y: f_new_card.y + 510,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "switch",
        label: "Set as primary card for all orders",
        checked: true,
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_card.x + PHONE_MARGIN,
    y: f_new_card.y + 580,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Zero Fraud Liability Guarantee",
        supporting: "Verified by Visa 3D Secure 2.0 authentication protocol",
        icon: "shield",
        variant: "tonal",
        size: 380,
        size2: 75,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_card.x + PHONE_MARGIN,
    y: f_new_card.y + 665,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Save & Authorize Card ($0.00)",
        icon: "lock",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_payment_method", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_card.x + PHONE_MARGIN,
    y: f_new_card.y + 729,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Cancel and Return to Payment Methods",
        variant: "text",
        size: 380,
        size2: 40,
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
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_checkout", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_address.x + PHONE_MARGIN,
    y: f_address.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Home Address (Default Primary)",
        supporting: "Alexandre Moreau · +1 (555) 0192\n742 Evergreen Terrace, Apt 4B, New York, NY 10001",
        icon: "home",
        variant: "outlined",
        size: 380,
        size2: 115,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_address.x + PHONE_MARGIN,
    y: f_address.y + 237,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Design Studio Office",
        supporting: "Alexandre Moreau · +1 (555) 0192\n120 Mercer Street, Floor 3, SoHo, New York, NY 10012",
        icon: "business",
        variant: "outlined",
        size: 380,
        size2: 115,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_address.x + PHONE_MARGIN,
    y: f_address.y + 362,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Hamptons Retreat Residence",
        supporting: "Alexandre Moreau · +1 (555) 0192\n45 Ocean Dune Rd, East Hampton, NY 11937",
        icon: "villa",
        variant: "outlined",
        size: 380,
        size2: 115,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_address.x + PHONE_MARGIN,
    y: f_address.y + 487,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Free Worldwide Express Delivery",
        supporting: "DHL Express 2-3 day transit with signature on delivery",
        icon: "local_shipping",
        variant: "tonal",
        size: 380,
        size2: 80,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_address.x + PHONE_MARGIN,
    y: f_address.y + 577,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Add New Shipping Address",
        icon: "add",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_new_address", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_address.x + PHONE_MARGIN,
    y: f_address.y + 641,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Manage Special Courier Instructions",
        variant: "text",
        size: 380,
        size2: 40,
      },
    ],
  });

  groups.push(buildBottomNav(f_address, 4));

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
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_address", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_address.x + PHONE_MARGIN,
    y: f_new_address.y + 112,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "Home", variant: "filled", size2: 36 },
      { id: uid(), kind: "chip", label: "Office", variant: "tonal", size2: 36 },
      { id: uid(), kind: "chip", label: "Apartment", variant: "tonal", size2: 36 },
      { id: uid(), kind: "chip", label: "Other", variant: "tonal", size2: 36 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_address.x + PHONE_MARGIN,
    y: f_new_address.y + 160,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "Recipient Full Name", supporting: "Alexandre Moreau", icon: "person", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Phone Number", supporting: "+1 (555) 0192-384", icon: "phone", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Street Address", supporting: "742 Evergreen Terrace", icon: "home", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Apt / Suite / Unit", supporting: "Apt 4B", icon: "apartment", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "City & Zip Code", supporting: "New York, NY 10001", icon: "location_city", variant: "outlined", size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_address.x + PHONE_MARGIN,
    y: f_new_address.y + 490,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "switch",
        label: "Set as default shipping address",
        checked: true,
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_address.x + PHONE_MARGIN,
    y: f_new_address.y + 560,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Signature On Delivery Required",
        supporting: "For security, all luxury parcels require a signee upon drop-off",
        icon: "draw",
        variant: "tonal",
        size: 380,
        size2: 75,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_address.x + PHONE_MARGIN,
    y: f_new_address.y + 645,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Save Shipping Address",
        icon: "check",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_address", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_address.x + PHONE_MARGIN,
    y: f_new_address.y + 709,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Cancel and Return to Addresses",
        variant: "text",
        size: 380,
        size2: 40,
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
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_account", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notification_settings.x + PHONE_MARGIN,
    y: f_notification_settings.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Order & Dispatch Updates",
        supporting: "Real-time alerts regarding shipping progress & delivery status",
        icon: "local_shipping",
        variant: "tonal",
        size: 380,
        size2: 75,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notification_settings.x + PHONE_MARGIN,
    y: f_notification_settings.y + 197,
    axis: "y",
    items: [
      { id: uid(), kind: "switch", label: "Order Tracking Alerts (Push notifications)", checked: true, size: 380 },
      { id: uid(), kind: "switch", label: "Out for Delivery SMS (Live courier ETA)", checked: true, size: 380 },
      { id: uid(), kind: "switch", label: "Delivery Confirmation Photos", checked: true, size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notification_settings.x + PHONE_MARGIN,
    y: f_notification_settings.y + 390,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Seasonal Drops & Privileges",
        supporting: "VIP early access to runway collections & bespoke capsules",
        icon: "local_fire_department",
        variant: "tonal",
        size: 380,
        size2: 75,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notification_settings.x + PHONE_MARGIN,
    y: f_notification_settings.y + 475,
    axis: "y",
    items: [
      { id: uid(), kind: "switch", label: "VIP Seasonal Collection Drops", checked: true, size: 380 },
      { id: uid(), kind: "switch", label: "Wishlist Price Drops & Restocks", checked: true, size: 380 },
      { id: uid(), kind: "switch", label: "Weekly Fashion Editorial Lookbook", checked: false, size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notification_settings.x + PHONE_MARGIN,
    y: f_notification_settings.y + 670,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Save Notification Preferences",
        icon: "check",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_account", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notification_settings.x + PHONE_MARGIN,
    y: f_notification_settings.y + 734,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Reset All Notification Preferences",
        variant: "text",
        size: 380,
        size2: 40,
      },
    ],
  });

  groups.push(buildBottomNav(f_notification_settings, 4));

  // ==========================================================================
  // SCREEN 20: Frequently Asked Questions (FAQs)
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
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_help_center", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_faqs.x + PHONE_MARGIN,
    y: f_faqs.y + 112,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "All", variant: "filled", size2: 36 },
      { id: uid(), kind: "chip", label: "Shipping", variant: "tonal", size2: 36 },
      { id: uid(), kind: "chip", label: "Returns", variant: "tonal", size2: 36 },
      { id: uid(), kind: "chip", label: "Sizing", variant: "tonal", size2: 36 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_faqs.x + PHONE_MARGIN,
    y: f_faqs.y + 160,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "What is your 30-day return policy?",
        supporting: "30-day hassle-free returns on unworn items with tags. Prepaid DHL labels are included inside every box.",
        icon: "assignment_return",
        variant: "outlined",
        size: 380,
        size2: 95,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_faqs.x + PHONE_MARGIN,
    y: f_faqs.y + 265,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "How fast is worldwide DHL delivery?",
        supporting: "US orders arrive in 2-3 business days. Worldwide express delivery takes 3-5 days across 120+ countries.",
        icon: "local_shipping",
        variant: "outlined",
        size: 380,
        size2: 95,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_faqs.x + PHONE_MARGIN,
    y: f_faqs.y + 370,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "How does the boxy oversized fit work?",
        supporting: "Our tees and hoodies feature a deliberate drop-shoulder cut. Order true-to-size for oversized drape.",
        icon: "straighten",
        variant: "outlined",
        size: 380,
        size2: 95,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_faqs.x + PHONE_MARGIN,
    y: f_faqs.y + 475,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "How should I wash 380GSM cotton garments?",
        supporting: "Machine wash cold inside out, hang dry in shade. Avoid tumble dryers to preserve garment structure.",
        icon: "local_laundry_service",
        variant: "outlined",
        size: 380,
        size2: 95,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_faqs.x + PHONE_MARGIN,
    y: f_faqs.y + 580,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Which payment options are supported?",
        supporting: "Visa, Mastercard, Amex, Apple Pay, Google Pay, and Cash on Delivery in select metropolitan areas.",
        icon: "credit_card",
        variant: "outlined",
        size: 380,
        size2: 95,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_faqs.x + PHONE_MARGIN,
    y: f_faqs.y + 685,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Still Have Questions? Chat with Concierge",
        icon: "support_agent",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_customer_service", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_faqs.x + PHONE_MARGIN,
    y: f_faqs.y + 749,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Email Concierge: concierge@atelier.com",
        variant: "text",
        size: 380,
        size2: 36,
      },
    ],
  });

  groups.push(buildBottomNav(f_faqs, 4));

  // ==========================================================================
  // SCREEN 21: Splash Screen
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_splash.x,
    y: f_splash.y + 140,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "DEFINE ATELIER",
        icon: "diamond",
        variant: "text",
        size: FRAME_W,
        size2: 64,
        font: 28,
      },
      {
        id: uid(),
        kind: "card",
        label: "Haute Streetwear & Architectural Silhouettes",
        supporting: "Crafted from 380GSM combed cotton in limited seasonal batches.",
        icon: "checkroom",
        variant: "filled",
        size: 380,
        size2: 120,
      },
      {
        id: uid(),
        kind: "card",
        label: "PARIS · TOKYO · NEW YORK · MILANO",
        supporting: "Global boutique shipping across 120+ countries worldwide.",
        icon: "public",
        variant: "tonal",
        size: 380,
        size2: 90,
      },
      {
        id: uid(),
        kind: "card",
        label: "VIP Society Access · Fall/Winter '26",
        supporting: "Members receive priority drop reservations & private concierge.",
        icon: "verified",
        variant: "outlined",
        size: 380,
        size2: 90,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_splash.x + PHONE_MARGIN,
    y: f_splash.y + 640,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Enter Atelier Collection",
        icon: "arrow_forward",
        variant: "filled",
        size: 380,
        size2: 56,
        action: { to: "cloth_onboarding", transition: "fade" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_splash.x + PHONE_MARGIN,
    y: f_splash.y + 710,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "© 2026 Define Atelier Inc. All Rights Reserved.",
        variant: "text",
        size: 380,
        size2: 40,
      },
    ],
  });

  // ==========================================================================
  // SCREEN 22: Onboarding Screen
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_onboarding.x + PHONE_MARGIN,
    y: f_onboarding.y + 70,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "",
        variant: "filled",
        size: 380,
        size2: 400,
        imagePos: "top",
        imageSize: 400,
        src: FASHION_IMGS.hero,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_onboarding.x + PHONE_MARGIN,
    y: f_onboarding.y + 485,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Curated Luxury. Engineered Simplicity.",
        supporting: "Discover limited-edition seasonal drops crafted from premium 380GSM combed cotton with architectural silhouettes.",
        variant: "tonal",
        size: 380,
        size2: 110,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_onboarding.x + PHONE_MARGIN,
    y: f_onboarding.y + 610,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "● Drop 01", variant: "filled", size2: 32 },
      { id: uid(), kind: "chip", label: "○ Drop 02", variant: "tonal", size2: 32 },
      { id: uid(), kind: "chip", label: "○ Drop 03", variant: "tonal", size2: 32 },
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
        label: "Get Started (Create Account)",
        icon: "arrow_forward",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_signup", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_onboarding.x + PHONE_MARGIN,
    y: f_onboarding.y + 724,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Already have an account? Sign In",
        variant: "text",
        size: 380,
        size2: 42,
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
        label: "Sign In",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_onboarding", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_login.x + PHONE_MARGIN,
    y: f_login.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Welcome Back to Atelier",
        supporting: "Sign in with your email to access your saved wardrobe and VIP perks",
        icon: "lock",
        variant: "tonal",
        size: 380,
        size2: 85,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_login.x + PHONE_MARGIN,
    y: f_login.y + 207,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "Email Address", supporting: "alexandre.moreau@atelier.com", icon: "mail", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Password", supporting: "••••••••••••", icon: "lock", variant: "outlined", size: 380 },
      { id: uid(), kind: "switch", label: "Remember Me on this device", checked: true, size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_login.x + PHONE_MARGIN,
    y: f_login.y + 395,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Sign In to Account",
        icon: "login",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_home", transition: "fade" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_login.x + PHONE_MARGIN,
    y: f_login.y + 459,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Forgot your password? Reset",
        variant: "text",
        size: 380,
        size2: 40,
        action: { to: "cloth_forgot_password", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_login.x + PHONE_MARGIN,
    y: f_login.y + 510,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Continue with Apple",
        icon: "phone_iphone",
        variant: "outlined",
        size: 184,
        size2: 50,
      },
      {
        id: uid(),
        kind: "button",
        label: "Continue with Google",
        icon: "g_translate",
        variant: "outlined",
        size: 184,
        size2: 50,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_login.x + PHONE_MARGIN,
    y: f_login.y + 575,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Biometric Login Available",
        supporting: "Use Face ID / Touch ID for fast authentication",
        icon: "fingerprint",
        variant: "tonal",
        size: 380,
        size2: 70,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_login.x + PHONE_MARGIN,
    y: f_login.y + 655,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Don't have an account? Create Account",
        icon: "person_add",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_signup", transition: "slide" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 24: Create Account
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
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_login", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_signup.x + PHONE_MARGIN,
    y: f_signup.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Join Define Atelier VIP Society",
        supporting: "Receive $25 welcome credit on your first order and priority drop access",
        icon: "card_membership",
        variant: "tonal",
        size: 380,
        size2: 85,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_signup.x + PHONE_MARGIN,
    y: f_signup.y + 207,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "Full Name", supporting: "Alexandre Moreau", icon: "person", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Email Address", supporting: "alexandre.moreau@atelier.com", icon: "mail", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Phone Number", supporting: "+1 (555) 0192-384", icon: "phone", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Password (8+ characters)", supporting: "••••••••••••", icon: "lock", variant: "outlined", size: 380 },
      { id: uid(), kind: "checkbox", label: "I agree to Terms & Conditions and Privacy Policy", checked: true, size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_signup.x + PHONE_MARGIN,
    y: f_signup.y + 510,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Create VIP Account",
        icon: "check_circle",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_home", transition: "fade" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_signup.x + PHONE_MARGIN,
    y: f_signup.y + 574,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Apple Sign Up",
        icon: "phone_iphone",
        variant: "outlined",
        size: 184,
        size2: 48,
      },
      {
        id: uid(),
        kind: "button",
        label: "Google Sign Up",
        icon: "g_translate",
        variant: "outlined",
        size: 184,
        size2: 48,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_signup.x + PHONE_MARGIN,
    y: f_signup.y + 636,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Already have an account? Sign In",
        variant: "text",
        size: 380,
        size2: 44,
        action: { to: "cloth_login", transition: "slideLeft" },
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
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_login", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_forgot_pwd.x + PHONE_MARGIN,
    y: f_forgot_pwd.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Reset your account password",
        supporting: "Enter your registered email address below. We will send you a 4-digit verification code to reset your account credentials.",
        icon: "lock_reset",
        variant: "tonal",
        size: 380,
        size2: 100,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_forgot_pwd.x + PHONE_MARGIN,
    y: f_forgot_pwd.y + 224,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "textField",
        label: "Email Address",
        supporting: "alexandre.moreau@atelier.com",
        icon: "mail",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_forgot_pwd.x + PHONE_MARGIN,
    y: f_forgot_pwd.y + 292,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Send 4-Digit Verification Code",
        icon: "send",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_verification_code", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_forgot_pwd.x + PHONE_MARGIN,
    y: f_forgot_pwd.y + 360,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Security & Confidentiality Notice",
        supporting: "We never ask for your password or verification codes via phone call.",
        icon: "shield",
        variant: "tonal",
        size: 380,
        size2: 75,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_forgot_pwd.x + PHONE_MARGIN,
    y: f_forgot_pwd.y + 445,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Lost access to your email? Contact Concierge",
        icon: "support_agent",
        variant: "outlined",
        size: 380,
        size2: 48,
        action: { to: "cloth_customer_service", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_forgot_pwd.x + PHONE_MARGIN,
    y: f_forgot_pwd.y + 505,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Remember password? Back to Sign In",
        variant: "text",
        size: 380,
        size2: 44,
        action: { to: "cloth_login", transition: "slideLeft" },
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
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_forgot_password", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_verify_code.x + PHONE_MARGIN,
    y: f_verify_code.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Check your email inbox",
        supporting: "We sent a 4-digit security code to alexandre.moreau@atelier.com. Code expires in 10 minutes.",
        icon: "mark_email_read",
        variant: "tonal",
        size: 380,
        size2: 100,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_verify_code.x + PHONE_MARGIN,
    y: f_verify_code.y + 224,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "textField",
        label: "Enter 4-Digit Security Code",
        supporting: "4  8  2  1",
        icon: "pin",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_verify_code.x + PHONE_MARGIN,
    y: f_verify_code.y + 292,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Verify & Proceed to Reset",
        icon: "check_circle",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_reset_password", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_verify_code.x + PHONE_MARGIN,
    y: f_verify_code.y + 360,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Code Delivery Assistance",
        supporting: "If you don't see the code in 1 minute, check your spam or promotions folder.",
        icon: "info",
        variant: "tonal",
        size: 380,
        size2: 75,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_verify_code.x + PHONE_MARGIN,
    y: f_verify_code.y + 448,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Didn't receive code? Resend Code (0:45s)",
        variant: "text",
        size: 380,
        size2: 44,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_verify_code.x + PHONE_MARGIN,
    y: f_verify_code.y + 504,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Change email address and try again",
        variant: "text",
        size: 380,
        size2: 40,
        action: { to: "cloth_forgot_password", transition: "slideLeft" },
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
        variant: "text",
        size: FRAME_W,
        size2: 64,
        action: { to: "cloth_verification_code", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reset_pwd.x + PHONE_MARGIN,
    y: f_reset_pwd.y + 112,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Create a strong new password",
        supporting: "Must contain at least 8 characters with a mix of letters, numbers, and symbols.",
        icon: "security",
        variant: "tonal",
        size: 380,
        size2: 90,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reset_pwd.x + PHONE_MARGIN,
    y: f_reset_pwd.y + 214,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "New Password", supporting: "••••••••••••", icon: "lock", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Confirm New Password", supporting: "••••••••••••", icon: "lock_reset", variant: "outlined", size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reset_pwd.x + PHONE_MARGIN,
    y: f_reset_pwd.y + 350,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Password Requirements Checklist",
        supporting: "✓ 8+ Characters · ✓ Uppercase Letter · ✓ Number Included",
        icon: "checklist",
        variant: "tonal",
        size: 380,
        size2: 75,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reset_pwd.x + PHONE_MARGIN,
    y: f_reset_pwd.y + 438,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Update Password & Sign In",
        icon: "check_circle",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_login", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reset_pwd.x + PHONE_MARGIN,
    y: f_reset_pwd.y + 502,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Cancel and return to Sign In",
        variant: "text",
        size: 380,
        size2: 40,
        action: { to: "cloth_login", transition: "slideLeft" },
      },
    ],
  });

  return {
    title: "Define Atelier (Complete 27-Screen Cloth Shop App)",
    brief: "Production-ready 27-screen luxury streetwear and fashion e-commerce application matching Define Apparel Mobile App. Every screen is fully editable, layer-managed, reorderable, with interactive flow connections and complete Expo Router support.",
    frame: "phone",
    platform: "android",
    paletteKey: "cloth_shop",
    frames,
    groups,
  };
}
