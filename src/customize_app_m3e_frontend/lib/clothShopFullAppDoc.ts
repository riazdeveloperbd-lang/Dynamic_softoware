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
  accessories:
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
  sneakers:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
};

/**
 * Builds the complete 27-screen Cloth Shop Application document for M3E Canvas.
 * Matches pixel-perfect with Define Apparel Mobile App (Discover feed, product cards,
 * cart, checkout, profile, live tracking, auth).
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
  // ROW 0: Primary Shopping Experience (y = 0)
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
    name: "2. Visual Search & Catalog",
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
    note: "Overall rating 4.8/5, verified customer review cards with star ratings and reviewer photos.",
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
  // SCREEN 1: Homepage (Feed / Discover) - EXACT SAME UI AS SCREENSHOT 2
  // ==========================================================================
  // Top App Bar ("Discover", Search icon, Notifications bell with red dot badge)
  groups.push({
    id: uid(),
    x: f_home.x,
    y: f_home.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Discover",
        icon: null, // No left icon for clean bold left alignment
        icon2: "search",
        icon3: "notifications",
        font: 28,
        variant: "text",
        size: FRAME_W,
        size2: 60,
        actions: {
          icon2: { to: "cloth_search", transition: "fade" },
          icon3: { to: "cloth_notifications", transition: "slide" },
        },
      },
    ],
  });

  // Search Bar with microphone and tune filter button
  groups.push({
    id: uid(),
    x: f_home.x + PHONE_MARGIN,
    y: f_home.y + 74,
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

  // Category Pills: "All" (Active black pill), "Tshirts", "Jeans", "Shoes"
  groups.push({
    id: uid(),
    x: f_home.x + PHONE_MARGIN,
    y: f_home.y + 134,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "All", variant: "filled", size2: 36 },
      { id: uid(), kind: "chip", label: "Tshirts", variant: "tonal", size2: 36, action: { to: "cloth_search" } },
      { id: uid(), kind: "chip", label: "Jeans", variant: "tonal", size2: 36, action: { to: "cloth_search" } },
      { id: uid(), kind: "chip", label: "Shoes", variant: "tonal", size2: 36, action: { to: "cloth_search" } },
    ],
  });

  // 2-Column Product Grid Row 1 (Regular Fit Slogan & Regular Fit Polo with -52% discount)
  groups.push({
    id: uid(),
    x: f_home.x + PHONE_MARGIN,
    y: f_home.y + 186,
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
        size2: 260,
        imagePos: "top",
        imageSize: 175,
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
        size2: 260,
        imagePos: "top",
        imageSize: 175,
        src: FASHION_IMGS.tealPolo,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
    ],
  });

  // 2-Column Product Grid Row 2 (Regular Fit Black & Regular Fit V-Neck)
  groups.push({
    id: uid(),
    x: f_home.x + PHONE_MARGIN,
    y: f_home.y + 460,
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
        size2: 260,
        imagePos: "top",
        imageSize: 175,
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
        size2: 260,
        imagePos: "top",
        imageSize: 175,
        src: FASHION_IMGS.vneckTee,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
    ],
  });

  // Screen 1 Bottom Navigation (Home active)
  groups.push(buildBottomNavGroup(f_home, 0));

  // ==========================================================================
  // SCREEN 2: Search & Catalog
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_search.x,
    y: f_search.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Visual Search",
        icon: "arrow_back",
        icon2: "tune",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_home", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_search.x + PHONE_MARGIN,
    y: f_search.y + 74,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "searchBar",
        label: "T-Shirts & Polos",
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
    y: f_search.y + 134,
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
    y: f_search.y + 186,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Pink Longsleeve Thermal",
        supporting: "$1,450",
        badge: "New Drop",
        icon2: "favorite_border",
        variant: "outlined",
        size: 184,
        size2: 260,
        imagePos: "top",
        imageSize: 175,
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
        size2: 260,
        imagePos: "top",
        imageSize: 175,
        src: FASHION_IMGS.hero,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_search.x + PHONE_MARGIN,
    y: f_search.y + 460,
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
        size2: 260,
        imagePos: "top",
        imageSize: 175,
        src: FASHION_IMGS.navyTee,
        action: { to: "cloth_product_detail", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Polo",
        supporting: "$1,100",
        icon2: "favorite_border",
        variant: "outlined",
        size: 184,
        size2: 260,
        imagePos: "top",
        imageSize: 175,
        src: FASHION_IMGS.tealPolo,
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
    y: f_detail.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Details",
        icon: "arrow_back",
        icon2: "share",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_home", transition: "slideLeft" },
      },
    ],
  });

  // Hero Product Showcase Photo
  groups.push({
    id: uid(),
    x: f_detail.x + PHONE_MARGIN,
    y: f_detail.y + 74,
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
        size2: 320,
        imagePos: "top",
        imageSize: 320,
        src: FASHION_IMGS.navyTee,
      },
    ],
  });

  // Product Name, Price, and Star Reviews Row
  groups.push({
    id: uid(),
    x: f_detail.x + PHONE_MARGIN,
    y: f_detail.y + 406,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "listItem",
        label: "Regular Fit Slogan T-Shirt",
        supporting: "$1,190.00 · ★ 4.8/5 (240 reviews)",
        icon: "verified",
        variant: "text",
        size: 380,
        action: { to: "cloth_reviews", transition: "slide" },
      },
    ],
  });

  // Size chips
  groups.push({
    id: uid(),
    x: f_detail.x + PHONE_MARGIN,
    y: f_detail.y + 480,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "Size S", variant: "tonal", size2: 36 },
      { id: uid(), kind: "chip", label: "Size M (Selected)", variant: "filled", size2: 36 },
      { id: uid(), kind: "chip", label: "Size L", variant: "tonal", size2: 36 },
      { id: uid(), kind: "chip", label: "Size XL", variant: "tonal", size2: 36 },
    ],
  });

  // Garment Description Note
  groups.push({
    id: uid(),
    x: f_detail.x + PHONE_MARGIN,
    y: f_detail.y + 532,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Architectural Streetwear Capsule",
        supporting: "Custom luxury 380GSM combed cotton with rib-knit collar and dropped shoulders. Pre-shrunk finish.",
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
    y: f_detail.y + 636,
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

  groups.push(buildBottomNavGroup(f_detail, 0));

  // ==========================================================================
  // SCREEN 4: Customer Reviews
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_reviews.x,
    y: f_reviews.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Customer Reviews",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_product_detail", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reviews.x + PHONE_MARGIN,
    y: f_reviews.y + 74,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "4.8 out of 5 Stars",
        supporting: "Based on 240 verified customer purchases worldwide · 96% recommend this product",
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
    y: f_reviews.y + 188,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Marcus Vance · ★★★★★ (Verified Buyer)",
        supporting: "The heavyweight fabric drape is incredible. Exactly the high-end streetwear silhouette I wanted.",
        icon: "person",
        variant: "outlined",
        size: 380,
        size2: 100,
      },
      {
        id: uid(),
        kind: "card",
        label: "Sarah Chen · ★★★★★ (Verified Buyer)",
        supporting: "True to size, super fast 2-day delivery to New York. Love the subtle embroidery on the chest.",
        icon: "person",
        variant: "outlined",
        size: 380,
        size2: 100,
      },
      {
        id: uid(),
        kind: "card",
        label: "Liam Kowalski · ★★★★☆ (Verified Buyer)",
        supporting: "Color matches the studio pictures perfectly. Will definitely pick up the teal polo next.",
        icon: "person",
        variant: "outlined",
        size: 380,
        size2: 100,
      },
    ],
  });

  groups.push(buildBottomNavGroup(f_reviews, 0));

  // ==========================================================================
  // SCREEN 5: Saved Items (Wishlist)
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_saved.x,
    y: f_saved.y + 10,
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
        size2: 60,
        action: { to: "cloth_home", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_saved.x + PHONE_MARGIN,
    y: f_saved.y + 74,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Slogan · $1,190",
        supporting: "Navy Blue · Size M · In Stock",
        icon: "favorite",
        variant: "outlined",
        size: 380,
        size2: 110,
        imagePos: "leading",
        imageSize: 90,
        src: FASHION_IMGS.navyTee,
      },
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Polo · $1,100",
        supporting: "Teal Green · Size L · -52% Sale",
        icon: "favorite",
        variant: "outlined",
        size: 380,
        size2: 110,
        imagePos: "leading",
        imageSize: 90,
        src: FASHION_IMGS.tealPolo,
      },
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Black · $1,690",
        supporting: "Sleeveless Tank · Size M",
        icon: "favorite",
        variant: "outlined",
        size: 380,
        size2: 110,
        imagePos: "leading",
        imageSize: 90,
        src: FASHION_IMGS.blackTee,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_saved.x + PHONE_MARGIN,
    y: f_saved.y + 424,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Move All to Cart ($3,980.00)",
        icon: "shopping_bag",
        variant: "filled",
        size: 380,
        size2: 52,
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
    y: f_cart.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "My Cart (3 Items)",
        icon: "arrow_back",
        icon2: "delete_sweep",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_home", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_cart.x + PHONE_MARGIN,
    y: f_cart.y + 74,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Slogan · $1,190",
        supporting: "Qty: 1 · Size: M · In Stock",
        icon: "shopping_bag",
        variant: "outlined",
        size: 380,
        size2: 100,
        imagePos: "leading",
        imageSize: 80,
        src: FASHION_IMGS.navyTee,
      },
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Polo · $1,100",
        supporting: "Qty: 1 · Size: L · -52% Applied",
        icon: "shopping_bag",
        variant: "outlined",
        size: 380,
        size2: 100,
        imagePos: "leading",
        imageSize: 80,
        src: FASHION_IMGS.tealPolo,
      },
      {
        id: uid(),
        kind: "card",
        label: "Regular Fit Black · $1,690",
        supporting: "Qty: 1 · Size: M · In Stock",
        icon: "shopping_bag",
        variant: "outlined",
        size: 380,
        size2: 100,
        imagePos: "leading",
        imageSize: 80,
        src: FASHION_IMGS.blackTee,
      },
    ],
  });

  // Price Breakdown Summary Card
  groups.push({
    id: uid(),
    x: f_cart.x + PHONE_MARGIN,
    y: f_cart.y + 394,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Order Summary: $4,060.00",
        supporting: "Subtotal: $3,980.00 · Standard Shipping: $80.00 · Taxes Included",
        icon: "receipt_long",
        variant: "tonal",
        size: 380,
        size2: 96,
      },
    ],
  });

  // Proceed to Checkout CTA
  groups.push({
    id: uid(),
    x: f_cart.x + PHONE_MARGIN,
    y: f_cart.y + 504,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Proceed to Checkout ($4,060.00)",
        icon: "shopping_bag",
        variant: "filled",
        size: 380,
        size2: 52,
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
    y: f_checkout.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Checkout",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_cart", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_checkout.x + PHONE_MARGIN,
    y: f_checkout.y + 74,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Shipping Address (Home)",
        supporting: "Alexandre Moreau · 742 Evergreen Terrace, Apt 4B, New York, NY 10001 · +1 (555) 0192",
        icon: "location_on",
        variant: "outlined",
        size: 380,
        size2: 110,
        action: { to: "cloth_address", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Payment Method",
        supporting: "Visa ending in •••• 4242 · Exp 12/28 · Secure 256-bit SSL encrypted",
        icon: "credit_card",
        variant: "outlined",
        size: 380,
        size2: 100,
        action: { to: "cloth_payment_method", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Delivery Speed: DHL Express",
        supporting: "Guaranteed delivery by Oct 14, 2026 · Live GPS Tracking",
        icon: "local_shipping",
        variant: "tonal",
        size: 380,
        size2: 90,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_checkout.x + PHONE_MARGIN,
    y: f_checkout.y + 400,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Place Order ($4,060.00)",
        icon: "lock",
        variant: "filled",
        size: 380,
        size2: 54,
        action: { to: "cloth_track_order", transition: "slide" },
      },
    ],
  });

  groups.push(buildBottomNavGroup(f_checkout, 3));

  // ==========================================================================
  // SCREEN 8: Account & Profile
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_account.x,
    y: f_account.y + 10,
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
        size2: 60,
        actions: { icon2: { to: "cloth_notification_settings" } },
      },
    ],
  });

  // Profile Card
  groups.push({
    id: uid(),
    x: f_account.x + PHONE_MARGIN,
    y: f_account.y + 74,
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

  // Menu list
  groups.push({
    id: uid(),
    x: f_account.x + PHONE_MARGIN,
    y: f_account.y + 188,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "listItem",
        label: "My Orders (3)",
        supporting: "Track active shipments, view history & receipts",
        icon: "package_2",
        variant: "outlined",
        size: 380,
        action: { to: "cloth_my_orders", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "My Personal Details",
        supporting: "Edit name, email, phone number & sizes",
        icon: "badge",
        variant: "outlined",
        size: 380,
        action: { to: "cloth_my_details", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Delivery Addresses",
        supporting: "2 saved shipping addresses",
        icon: "home",
        variant: "outlined",
        size: 380,
        action: { to: "cloth_address", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Payment Methods",
        supporting: "Visa, Mastercard, Apple Pay connected",
        icon: "credit_card",
        variant: "outlined",
        size: 380,
        action: { to: "cloth_payment_method", transition: "slide" },
      },
      {
        id: uid(),
        kind: "listItem",
        label: "Help Center & FAQs",
        supporting: "24/7 client concierge, return guides & policy",
        icon: "help_outline",
        variant: "outlined",
        size: 380,
        action: { to: "cloth_help_center", transition: "slide" },
      },
    ],
  });

  // Sign out button
  groups.push({
    id: uid(),
    x: f_account.x + PHONE_MARGIN,
    y: f_account.y + 570,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Sign Out",
        icon: "logout",
        variant: "outlined",
        size: 380,
        size2: 48,
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
    y: f_my_orders.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "My Orders",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_account", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_orders.x + PHONE_MARGIN,
    y: f_my_orders.y + 74,
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
    y: f_my_orders.y + 126,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Order #AT-9842 · $1,190.00",
        supporting: "Status: In Transit (Out for Delivery today) · 1 item: Regular Fit Slogan (M)",
        icon: "local_shipping",
        variant: "outlined",
        size: 380,
        size2: 110,
        action: { to: "cloth_track_order", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Order #AT-9610 · $2,200.00",
        supporting: "Delivered on Sep 28 · Regular Fit Polo & Thermal · Receipt available",
        icon: "check_circle",
        variant: "outlined",
        size: 380,
        size2: 100,
      },
      {
        id: uid(),
        kind: "card",
        label: "Order #AT-9420 · $1,690.00",
        supporting: "Delivered on Aug 14 · Regular Fit Black (S) · 5-Star reviewed",
        icon: "check_circle",
        variant: "outlined",
        size: 380,
        size2: 100,
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
    y: f_track_order.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Track Order #AT-9842",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_my_orders", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_track_order.x + PHONE_MARGIN,
    y: f_track_order.y + 74,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Expected Today by 4:30 PM",
        supporting: "Courier: DHL Express · Driver: Michael S. · Van #44",
        icon: "local_shipping",
        variant: "tonal",
        size: 380,
        size2: 100,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_track_order.x + PHONE_MARGIN,
    y: f_track_order.y + 188,
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
    y: f_track_order.y + 490,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Contact Courier Driver",
        icon: "phone",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_customer_service", transition: "slide" },
      },
    ],
  });

  groups.push(buildBottomNavGroup(f_track_order, 4));

  // ==========================================================================
  // SCREEN 11: Personal Details
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_my_details.x,
    y: f_my_details.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Personal Profile",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_account", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_details.x + PHONE_MARGIN,
    y: f_my_details.y + 74,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "Full Name", supporting: "Alexandre Moreau", icon: "person", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Email Address", supporting: "alexandre.moreau@atelier.com", icon: "mail", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Phone Number", supporting: "+1 (555) 0192", icon: "phone", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Birthday", supporting: "14/05/1996", icon: "cake", variant: "outlined", size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_my_details.x + PHONE_MARGIN,
    y: f_my_details.y + 400,
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

  groups.push(buildBottomNavGroup(f_my_details, 4));

  // ==========================================================================
  // SCREEN 12: Notifications
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_notifications.x,
    y: f_notifications.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Notifications",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_home", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notifications.x + PHONE_MARGIN,
    y: f_notifications.y + 74,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Order #AT-9842 is Out for Delivery",
        supporting: "Courier Michael is on the way. Tap to track · 10m ago",
        icon: "local_shipping",
        variant: "outlined",
        size: 380,
        size2: 90,
        action: { to: "cloth_track_order", transition: "slide" },
      },
      {
        id: uid(),
        kind: "card",
        label: "Weekend Flash Sale: 25% Off Hoodies",
        supporting: "Use code ATELIER25 at checkout · 2 hours ago",
        icon: "local_fire_department",
        variant: "tonal",
        size: 380,
        size2: 90,
      },
      {
        id: uid(),
        kind: "card",
        label: "Back in Stock: Regular Fit Black",
        supporting: "Sleeveless edition restocked in sizes M and L · Yesterday",
        icon: "notifications",
        variant: "outlined",
        size: 380,
        size2: 90,
      },
    ],
  });

  groups.push(buildBottomNavGroup(f_notifications, 4));

  // ==========================================================================
  // SCREEN 13: Help Center
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_help_center.x,
    y: f_help_center.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Help Center",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_account", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_help_center.x + PHONE_MARGIN,
    y: f_help_center.y + 74,
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
    y: f_help_center.y + 134,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Shipping & Worldwide Delivery",
        supporting: "Delivery timeframes, express shipping & customs fees",
        icon: "local_shipping",
        variant: "outlined",
        size: 380,
        size2: 90,
      },
      {
        id: uid(),
        kind: "card",
        label: "Returns & 30-Day Exchanges",
        supporting: "Print return labels, exchange steps & refund policy",
        icon: "assignment_return",
        variant: "outlined",
        size: 380,
        size2: 90,
      },
      {
        id: uid(),
        kind: "card",
        label: "Size & Sizing Guides",
        supporting: "Chest, sleeve and body length measurements",
        icon: "straighten",
        variant: "outlined",
        size: 380,
        size2: 90,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_help_center.x + PHONE_MARGIN,
    y: f_help_center.y + 440,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Contact Live Customer Service",
        icon: "support_agent",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_customer_service", transition: "slide" },
      },
    ],
  });

  groups.push(buildBottomNavGroup(f_help_center, 4));

  // ==========================================================================
  // SCREEN 14: Customer Service
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_customer_service.x,
    y: f_customer_service.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Customer Support Desk",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_help_center", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_customer_service.x + PHONE_MARGIN,
    y: f_customer_service.y + 74,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Atelier Concierge: Emma",
        supporting: "Hello Alexandre! How can we assist you with order #AT-9842 today?",
        icon: "support_agent",
        variant: "tonal",
        size: 380,
        size2: 90,
      },
      {
        id: uid(),
        kind: "card",
        label: "You (10:32 AM)",
        supporting: "Can I request delivery after 5 PM?",
        icon: "person",
        variant: "outlined",
        size: 380,
        size2: 80,
      },
      {
        id: uid(),
        kind: "card",
        label: "Emma (10:33 AM)",
        supporting: "Certainly! I have updated your delivery notes for DHL courier Michael.",
        icon: "support_agent",
        variant: "tonal",
        size: 380,
        size2: 90,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_customer_service.x + PHONE_MARGIN,
    y: f_customer_service.y + 360,
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

  groups.push(buildBottomNavGroup(f_customer_service, 4));

  // ==========================================================================
  // SCREEN 15: Payment Methods
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_payment_method.x,
    y: f_payment_method.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Payment Methods",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_checkout", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_payment_method.x + PHONE_MARGIN,
    y: f_payment_method.y + 74,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Visa ending in •••• 4242 (Default)",
        supporting: "Exp: 12/28 · Cardholder: Alexandre Moreau",
        icon: "credit_card",
        variant: "outlined",
        size: 380,
        size2: 90,
      },
      {
        id: uid(),
        kind: "card",
        label: "Mastercard •••• 8812",
        supporting: "Exp: 08/27 · Apple Pay Connected",
        icon: "credit_card",
        variant: "outlined",
        size: 380,
        size2: 90,
      },
      {
        id: uid(),
        kind: "card",
        label: "Apple Pay & Google Pay",
        supporting: "Instant biometric checkout ready",
        icon: "phone_iphone",
        variant: "tonal",
        size: 380,
        size2: 80,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_payment_method.x + PHONE_MARGIN,
    y: f_payment_method.y + 360,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Add New Card",
        icon: "add",
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
    y: f_new_card.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Add New Card",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_payment_method", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_card.x + PHONE_MARGIN,
    y: f_new_card.y + 74,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "Cardholder Name", supporting: "Name on front of card", icon: "person", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "16-Digit Card Number", supporting: "4000 1234 5678 9010", icon: "credit_card", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Expiry Date (MM/YY)", supporting: "12/28", icon: "calendar_today", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "CVV Security Code", supporting: "3 digits on back", icon: "lock", variant: "outlined", size: 380 },
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
    y: f_address.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Delivery Addresses",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_checkout", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_address.x + PHONE_MARGIN,
    y: f_address.y + 74,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Home Address (Primary Default)",
        supporting: "742 Evergreen Terrace, Apt 4B, New York, NY 10001 · Phone: +1 555-0192",
        icon: "home",
        variant: "outlined",
        size: 380,
        size2: 100,
      },
      {
        id: uid(),
        kind: "card",
        label: "Office Address",
        supporting: "100 Silicon Blvd, Suite 400, San Francisco, CA 94107",
        icon: "business",
        variant: "outlined",
        size: 380,
        size2: 100,
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
        icon: "add",
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
    y: f_new_address.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Add New Address",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_address", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_new_address.x + PHONE_MARGIN,
    y: f_new_address.y + 74,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "Address Label (e.g. Home, Office)", icon: "label", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Street Address", icon: "home", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Apt / Suite / Floor (Optional)", icon: "apartment", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "City & State", icon: "location_city", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Postal Zip Code", icon: "markunread_mailbox", variant: "outlined", size: 380 },
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
    y: f_notification_settings.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Notification Settings",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_account", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_notification_settings.x + PHONE_MARGIN,
    y: f_notification_settings.y + 74,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "switch",
        label: "Order Tracking Alerts (Real-time delivery status push)",
        checked: true,
        size: 380,
      },
      {
        id: uid(),
        kind: "switch",
        label: "New Drops & Collections (Seasonal capsules)",
        checked: true,
        size: 380,
      },
      {
        id: uid(),
        kind: "switch",
        label: "Promotions & Discounts (Flash sales)",
        checked: false,
        size: 380,
      },
      {
        id: uid(),
        kind: "switch",
        label: "SMS Text Messages (Delivery confirmation texts)",
        checked: true,
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
    y: f_faqs.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Frequently Asked Questions",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_help_center", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_faqs.x + PHONE_MARGIN,
    y: f_faqs.y + 74,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "What is your return & exchange policy?",
        supporting: "We offer 30-day hassle-free returns on all unworn items with tags attached.",
        icon: "help_outline",
        variant: "outlined",
        size: 380,
        size2: 90,
      },
      {
        id: uid(),
        kind: "card",
        label: "How long does standard delivery take?",
        supporting: "Standard shipping takes 3-5 business days. Express takes 1-2 days.",
        icon: "schedule",
        variant: "outlined",
        size: 380,
        size2: 90,
      },
      {
        id: uid(),
        kind: "card",
        label: "How do I choose the correct clothing size?",
        supporting: "Our tees feature a relaxed boxy fit. Sizing true to size is recommended.",
        icon: "straighten",
        variant: "outlined",
        size: 380,
        size2: 90,
      },
    ],
  });

  // ==========================================================================
  // SCREEN 21: Splash Screen
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_splash.x,
    y: f_splash.y + 240,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "DEFINE ATELIER",
        icon: "checkroom",
        variant: "text",
        size: FRAME_W,
        size2: 64,
        font: 28,
      },
      {
        id: uid(),
        kind: "card",
        label: "Luxury Streetwear Capsule",
        supporting: "Designed in New York · Worldwide Edition 2026",
        variant: "tonal",
        size: 380,
        size2: 80,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_splash.x + PHONE_MARGIN,
    y: f_splash.y + 440,
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
  // SCREEN 22: Onboarding Screen - EXACT SAME AS SCREENSHOT
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_onboarding.x + PHONE_MARGIN,
    y: f_onboarding.y + 30,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Define yourself in your unique way.",
        supporting: "Explore the new seasonal collection of premium streetwear and minimalist essentials.",
        variant: "filled",
        size: 380,
        size2: 440,
        imagePos: "top",
        imageSize: 320,
        src: FASHION_IMGS.hero,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_onboarding.x + PHONE_MARGIN,
    y: f_onboarding.y + 510,
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
        action: { to: "cloth_signup", transition: "slide" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 23: Sign In
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_login.x,
    y: f_login.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Sign In",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_onboarding", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_login.x + PHONE_MARGIN,
    y: f_login.y + 74,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "Email Address", supporting: "name@example.com", icon: "mail", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Password", supporting: "••••••••••••", icon: "lock", variant: "outlined", size: 380 },
      { id: uid(), kind: "switch", label: "Remember Me on this device", checked: true, size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_login.x + PHONE_MARGIN,
    y: f_login.y + 310,
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
        action: { to: "cloth_home", transition: "fade" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_login.x + PHONE_MARGIN,
    y: f_login.y + 380,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Forgot Password?",
        variant: "text",
        size: 380,
        action: { to: "cloth_forgot_password", transition: "slide" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 24: Create Account
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_signup.x,
    y: f_signup.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Create Account",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_login", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_signup.x + PHONE_MARGIN,
    y: f_signup.y + 74,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "Full Name", supporting: "John Doe", icon: "person", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Email Address", supporting: "name@example.com", icon: "mail", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Password", supporting: "At least 8 characters", icon: "lock", variant: "outlined", size: 380 },
      { id: uid(), kind: "checkbox", label: "I agree to Terms & Conditions and Privacy Policy", checked: true, size: 380 },
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
        label: "Create Account",
        icon: "person_add",
        variant: "filled",
        size: 380,
        size2: 52,
        action: { to: "cloth_home", transition: "fade" },
      },
    ],
  });

  // ==========================================================================
  // SCREEN 25: Forgot Password
  // ==========================================================================
  groups.push({
    id: uid(),
    x: f_forgot_pwd.x,
    y: f_forgot_pwd.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Forgot Password",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_login", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_forgot_pwd.x + PHONE_MARGIN,
    y: f_forgot_pwd.y + 74,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Reset your password",
        supporting: "Enter your registered email address and we'll send a 4-digit verification code.",
        variant: "tonal",
        size: 380,
        size2: 80,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_forgot_pwd.x + PHONE_MARGIN,
    y: f_forgot_pwd.y + 168,
    axis: "x",
    items: [
      { id: uid(), kind: "textField", label: "Email Address", supporting: "name@example.com", icon: "mail", variant: "outlined", size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_forgot_pwd.x + PHONE_MARGIN,
    y: f_forgot_pwd.y + 248,
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
    y: f_verify_code.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Verification Code",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_forgot_password", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_verify_code.x + PHONE_MARGIN,
    y: f_verify_code.y + 74,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "Enter 4-Digit Code",
        supporting: "Code sent to alexandre.moreau@atelier.com. Resend in 0:45s",
        variant: "tonal",
        size: 380,
        size2: 80,
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_verify_code.x + PHONE_MARGIN,
    y: f_verify_code.y + 168,
    axis: "x",
    items: [
      { id: uid(), kind: "textField", label: "PIN Code (4-Digits)", supporting: "4 8 2 1", icon: "pin", variant: "outlined", size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_verify_code.x + PHONE_MARGIN,
    y: f_verify_code.y + 248,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Verify & Continue",
        icon: "check_circle",
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
    y: f_reset_pwd.y + 10,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Set New Password",
        icon: "arrow_back",
        variant: "text",
        size: FRAME_W,
        size2: 60,
        action: { to: "cloth_verification_code", transition: "slideLeft" },
      },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reset_pwd.x + PHONE_MARGIN,
    y: f_reset_pwd.y + 74,
    axis: "y",
    items: [
      { id: uid(), kind: "textField", label: "New Password", supporting: "At least 8 characters", icon: "lock", variant: "outlined", size: 380 },
      { id: uid(), kind: "textField", label: "Confirm New Password", supporting: "Re-type password", icon: "lock_reset", variant: "outlined", size: 380 },
    ],
  });

  groups.push({
    id: uid(),
    x: f_reset_pwd.x + PHONE_MARGIN,
    y: f_reset_pwd.y + 238,
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
    brief: "Production-ready 27-screen luxury streetwear and fashion e-commerce application matching Define Apparel Mobile App. Every screen is fully editable, layer-managed, reorderable, with interactive flow connections and complete Expo Router support.",
    frame: "phone",
    platform: "android",
    paletteKey: "cloth_shop",
    frames,
    groups,
  };
}
