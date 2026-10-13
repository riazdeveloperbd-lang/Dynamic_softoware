import {
  Doc,
  Frame,
  Group,
  Item,
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
 * Exactly mirrors the 27 screens of Define Apparel Cloth Shop in 5 columns × 6 rows:
 *
 * Row 0: #1 Splash | #2 Onboarding | #3 SignUp | #4 Login | #5 ForgotPassword
 * Row 1: #6 VerificationCode | #7 ResetPassword | #8 Homepage | #9 Search | #10 SavedItems
 * Row 2: #11 ProductDetails | #12 Reviews | #13 MyCart | #14 Checkout | #15 Address
 * Row 3: #16 NewAddress | #17 PaymentMethod | #18 NewCard | #19 Account | #20 MyOrders
 * Row 4: #21 TrackOrder | #22 MyDetails | #23 Notifications | #24 NotificationSettings | #25 FAQs
 * Row 5: #26 HelpCenter | #27 CustomerService
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

  function addGroup(frame: Frame, localX: number, localY: number, axis: "x" | "y", items: Item[]) {
    groups.push({
      id: uid(),
      x: frame.x + localX,
      y: frame.y + localY,
      axis,
      items,
    });
  }

  // ==========================================================================
  // FRAMES DEFINITION (5 Columns × 6 Rows)
  // ==========================================================================

  // Row 0
  const f_splash: Frame = { id: "cloth_splash", name: "#1 Splash", x: STRIDE_X * 0, y: STRIDE_Y * 0, w: FRAME_W, h: FRAME_H, note: "Launch splash screen with animated branding" };
  const f_onboarding: Frame = { id: "cloth_onboarding", name: "#2 Onboarding", x: STRIDE_X * 1, y: STRIDE_Y * 0, w: FRAME_W, h: FRAME_H, note: "Editorial streetwear hero onboarding" };
  const f_signup: Frame = { id: "cloth_signup", name: "#3 SignUp", x: STRIDE_X * 2, y: STRIDE_Y * 0, w: FRAME_W, h: FRAME_H, note: "User registration with password strength & social login" };
  const f_login: Frame = { id: "cloth_login", name: "#4 Login", x: STRIDE_X * 3, y: STRIDE_Y * 0, w: FRAME_W, h: FRAME_H, note: "User login with biometric Face ID" };
  const f_forgot: Frame = { id: "cloth_forgot_password", name: "#5 ForgotPassword", x: STRIDE_X * 4, y: STRIDE_Y * 0, w: FRAME_W, h: FRAME_H, note: "Password recovery flow" };

  // Row 1
  const f_verify: Frame = { id: "cloth_verification_code", name: "#6 VerificationCode", x: STRIDE_X * 0, y: STRIDE_Y * 1, w: FRAME_W, h: FRAME_H, note: "Interactive 4-digit OTP verification" };
  const f_reset: Frame = { id: "cloth_reset_password", name: "#7 ResetPassword", x: STRIDE_X * 1, y: STRIDE_Y * 1, w: FRAME_W, h: FRAME_H, note: "Reset password with strength meter" };
  const f_home: Frame = { id: "cloth_homepage", name: "#8 Homepage", x: STRIDE_X * 2, y: STRIDE_Y * 1, w: FRAME_W, h: FRAME_H, note: "Discover feed with stories, flash drop timer & products" };
  const f_search: Frame = { id: "cloth_search", name: "#9 Search", x: STRIDE_X * 3, y: STRIDE_Y * 1, w: FRAME_W, h: FRAME_H, note: "Search catalog with trending chips & history" };
  const f_saved: Frame = { id: "cloth_saved_items", name: "#10 SavedItems", x: STRIDE_X * 4, y: STRIDE_Y * 1, w: FRAME_W, h: FRAME_H, note: "Wishlist with quick move-to-bag" };

  // Row 2
  const f_detail: Frame = { id: "cloth_product_details", name: "#11 ProductDetails", x: STRIDE_X * 0, y: STRIDE_Y * 2, w: FRAME_W, h: FRAME_H, note: "Product details with swatches, size picker & shipping bar" };
  const f_reviews: Frame = { id: "cloth_reviews", name: "#12 Reviews", x: STRIDE_X * 1, y: STRIDE_Y * 2, w: FRAME_W, h: FRAME_H, note: "Customer reviews summary, star rating & verified feedback" };
  const f_cart: Frame = { id: "cloth_my_cart", name: "#13 MyCart", x: STRIDE_X * 2, y: STRIDE_Y * 2, w: FRAME_W, h: FRAME_H, note: "Shopping bag with quantity steppers, coupons & summary" };
  const f_checkout: Frame = { id: "cloth_checkout", name: "#14 Checkout", x: STRIDE_X * 3, y: STRIDE_Y * 2, w: FRAME_W, h: FRAME_H, note: "Order checkout with addressCard & paymentMethodSelector" };
  const f_address: Frame = { id: "cloth_address", name: "#15 Address", x: STRIDE_X * 4, y: STRIDE_Y * 2, w: FRAME_W, h: FRAME_H, note: "Address book with interactive address cards" };

  // Row 3
  const f_new_addr: Frame = { id: "cloth_new_address", name: "#16 NewAddress", x: STRIDE_X * 0, y: STRIDE_Y * 3, w: FRAME_W, h: FRAME_H, note: "New address with GPS pin calibration & tab categories" };
  const f_payment: Frame = { id: "cloth_payment_method", name: "#17 PaymentMethod", x: STRIDE_X * 1, y: STRIDE_Y * 3, w: FRAME_W, h: FRAME_H, note: "Payment method with luxury Titanium card preview" };
  const f_new_card: Frame = { id: "cloth_new_card", name: "#18 NewCard", x: STRIDE_X * 2, y: STRIDE_Y * 3, w: FRAME_W, h: FRAME_H, note: "Add card with live visual card preview & Face ID toggle" };
  const f_account: Frame = { id: "cloth_account", name: "#19 Account", x: STRIDE_X * 3, y: STRIDE_Y * 3, w: FRAME_W, h: FRAME_H, note: "Account profile with loyalty points badge & order shortcuts" };
  const f_orders: Frame = { id: "cloth_my_orders", name: "#20 MyOrders", x: STRIDE_X * 4, y: STRIDE_Y * 3, w: FRAME_W, h: FRAME_H, note: "Orders list with orderStatus pills & tracking" };

  // Row 4
  const f_track: Frame = { id: "cloth_track_order", name: "#21 TrackOrder", x: STRIDE_X * 0, y: STRIDE_Y * 4, w: FRAME_W, h: FRAME_H, note: "Live courier radar, delivery estimate & timeline milestones" };
  const f_my_details: Frame = { id: "cloth_my_details", name: "#22 MyDetails", x: STRIDE_X * 1, y: STRIDE_Y * 4, w: FRAME_W, h: FRAME_H, note: "Personal details with verification badge & avatar" };
  const f_notifs: Frame = { id: "cloth_notifications", name: "#23 Notifications", x: STRIDE_X * 2, y: STRIDE_Y * 4, w: FRAME_W, h: FRAME_H, note: "Notifications list with notificationItem components" };
  const f_notif_settings: Frame = { id: "cloth_notification_settings", name: "#24 NotificationSettings", x: STRIDE_X * 3, y: STRIDE_Y * 4, w: FRAME_W, h: FRAME_H, note: "Granular notification toggle switches" };
  const f_faqs: Frame = { id: "cloth_faqs", name: "#25 FAQs", x: STRIDE_X * 4, y: STRIDE_Y * 4, w: FRAME_W, h: FRAME_H, note: "Categorized FAQs with faqAccordion cards" };

  // Row 5
  const f_help: Frame = { id: "cloth_help_center", name: "#26 HelpCenter", x: STRIDE_X * 0, y: STRIDE_Y * 5, w: FRAME_W, h: FRAME_H, note: "24/7 Support channels & instant live chat" };
  const f_service: Frame = { id: "cloth_customer_service", name: "#27 CustomerService", x: STRIDE_X * 1, y: STRIDE_Y * 5, w: FRAME_W, h: FRAME_H, note: "Live chat with support agent using chatBubble components" };

  frames.push(
    f_splash, f_onboarding, f_signup, f_login, f_forgot,
    f_verify, f_reset, f_home, f_search, f_saved,
    f_detail, f_reviews, f_cart, f_checkout, f_address,
    f_new_addr, f_payment, f_new_card, f_account, f_orders,
    f_track, f_my_details, f_notifs, f_notif_settings, f_faqs,
    f_help, f_service
  );

  // Shared navigation tabs and actions for app bottom navigation
  const sharedNavTabs = [
    { icon: "home", label: "Home" },
    { icon: "search", label: "Search" },
    { icon: "favorite", label: "Saved" },
    { icon: "shopping_bag", label: "Cart" },
    { icon: "person", label: "Account" },
  ];
  const sharedNavActions = {
    "tab:0": { to: f_home.id, transition: "fade" as const },
    "tab:1": { to: f_search.id, transition: "fade" as const },
    "tab:2": { to: f_saved.id, transition: "fade" as const },
    "tab:3": { to: f_cart.id, transition: "fade" as const },
    "tab:4": { to: f_account.id, transition: "fade" as const },
  };

  // ==========================================================================
  // SCREEN 1: Splash
  // ==========================================================================
  addGroup(f_splash, 0, 0, "y", [
    { id: uid(), kind: "box", label: "", icon: null, variant: "filled", fill: "primary", size: 412, size2: 892, action: { to: f_onboarding.id, transition: "fade" } },
  ]);
  addGroup(f_splash, 156, 320, "y", [
    { id: uid(), kind: "card", label: "", icon: "diamond", variant: "filled", fill: "surface", size: 100, size2: 100, radiusTop: 28, radiusBottom: 28, contentAlign: "center", textAlign: "center", action: { to: f_onboarding.id, transition: "fade" } },
    { id: uid(), kind: "text", label: "DEFINE ATELIER", icon: null, variant: "filled", font: 22, bold: true, textColor: "inversePrimary", textAlign: "center", size: 22, action: { to: f_onboarding.id, transition: "fade" } },
    { id: uid(), kind: "text", label: "Haute Couture & Streetwear 2026", icon: null, variant: "filled", font: 12, textColor: "inversePrimary", textAlign: "center", size: 12, action: { to: f_onboarding.id, transition: "fade" } },
  ]);
  addGroup(f_splash, 116, 490, "x", [
    { id: uid(), kind: "verificationBadge", label: "Official Atelier App", supporting: "Verified Release v3.8", size: 180, action: { to: f_onboarding.id, transition: "fade" } },
  ]);
  addGroup(f_splash, 188, 560, "x", [
    { id: uid(), kind: "circularProgress", label: "", icon: null, variant: "filled", size: 36, action: { to: f_onboarding.id, transition: "fade" } },
  ]);

  // ==========================================================================
  // SCREEN 2: Onboarding
  // ==========================================================================
  addGroup(f_onboarding, 24, 48, "y", [
    { id: uid(), kind: "text", label: "Define Atelier", icon: null, variant: "filled", font: 32, bold: true, size: 32 },
    { id: uid(), kind: "card", label: "Autumn / Winter 2026", supporting: "Curated Archival Drop · Tokyo & Paris", icon: null, variant: "filled", src: FASHION_IMGS.hero, imagePos: "background", size: 364, size2: 520, radiusTop: 24, radiusBottom: 24 },
    { id: uid(), kind: "button", label: "Get Started  ➔", icon: null, icon2: "arrow_forward", variant: "filled", size: 364, size2: 54, action: { to: f_signup.id, transition: "slide" } },
    { id: uid(), kind: "text", label: "● ○ ○   Skip to Catalog", icon: null, variant: "filled", font: 13, textColor: "primary", textAlign: "center", size: 13, action: { to: f_home.id, transition: "fade" } },
  ]);

  // ==========================================================================
  // SCREEN 3: SignUp
  // ==========================================================================
  addGroup(f_signup, 24, 48, "y", [
    { id: uid(), kind: "text", label: "Create an Account", icon: null, variant: "filled", font: 26, bold: true, size: 26 },
    { id: uid(), kind: "text", label: "Join Atelier VIP Club for exclusive runway drops & 20% off.", icon: null, variant: "filled", font: 13, textColor: "onSurfaceVariant", size: 13 },
    { id: uid(), kind: "textField", label: "Full Name", placeholder: "e.g. Cody Fisher", icon: "person", variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "Email Address", placeholder: "cody.fisher45@example.com", icon: "email", variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "Password", placeholder: "••••••••••••", icon: "lock", icon2: "visibility_off", variant: "outlined", size: 364 },
    { id: uid(), kind: "passwordStrength", label: "Strong Password (92/100)", supporting: "Includes uppercase, numbers & special symbols", size: 364 },
    { id: uid(), kind: "checkbox", label: "I agree to Terms & Conditions and Privacy Policy", icon: null, variant: "filled", checked: true, size: 364 },
    { id: uid(), kind: "button", label: "Create Account  ➔", icon: null, variant: "filled", size: 364, size2: 50, action: { to: f_verify.id, transition: "slide" } },
    { id: uid(), kind: "socialLoginGroup", label: "Or sign up with", size: 364 },
    { id: uid(), kind: "text", label: "Already have an account? Login", icon: null, variant: "filled", font: 13, textColor: "primary", textAlign: "center", size: 13, action: { to: f_login.id, transition: "slide" } },
  ]);

  // ==========================================================================
  // SCREEN 4: Login
  // ==========================================================================
  addGroup(f_login, 24, 48, "y", [
    { id: uid(), kind: "text", label: "Welcome Back", icon: null, variant: "filled", font: 26, bold: true, size: 26 },
    { id: uid(), kind: "text", label: "Sign in to access your wishlist, shopping bag and orders.", icon: null, variant: "filled", font: 13, textColor: "onSurfaceVariant", size: 13 },
    { id: uid(), kind: "textField", label: "Email Address", placeholder: "cody.fisher45@example.com", icon: "email", variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "Password", placeholder: "••••••••••••", icon: "lock", icon2: "visibility_off", variant: "outlined", size: 364 },
    { id: uid(), kind: "text", label: "Forgot password? Reset here", icon: null, variant: "filled", font: 13, textColor: "primary", size: 13, action: { to: f_forgot.id, transition: "slide" } },
    { id: uid(), kind: "button", label: "Sign In", icon: "login", variant: "filled", size: 364, size2: 50, action: { to: f_home.id, transition: "slide" } },
    { id: uid(), kind: "socialLoginGroup", label: "Or continue with", size: 364 },
    { id: uid(), kind: "biometricPrompt", label: "Face ID / Biometric Login", supporting: "Touch sensor or look at camera for instant access", size: 364, action: { to: f_home.id, transition: "fade" } },
    { id: uid(), kind: "text", label: "Don't have an account? Sign Up", icon: null, variant: "filled", font: 13, textColor: "primary", textAlign: "center", size: 13, action: { to: f_signup.id, transition: "slide" } },
  ]);

  // ==========================================================================
  // SCREEN 5: ForgotPassword
  // ==========================================================================
  addGroup(f_forgot, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Password Recovery", icon: "arrow_back", variant: "filled", size: 412, actions: { icon: { to: f_login.id, transition: "slideLeft" } } },
  ]);
  addGroup(f_forgot, 24, 112, "y", [
    { id: uid(), kind: "text", label: "Forgot Password", icon: null, variant: "filled", font: 26, bold: true, size: 26 },
    { id: uid(), kind: "text", label: "Enter your registered email address. We will send a secure 4-digit code to verify your identity.", icon: null, variant: "filled", font: 14, textColor: "onSurfaceVariant", size: 14 },
    { id: uid(), kind: "textField", label: "Registered Email", placeholder: "cody.fisher45@example.com", icon: "mail", variant: "outlined", size: 364 },
    { id: uid(), kind: "button", label: "Send 4-Digit Code", icon: "send", variant: "filled", size: 364, size2: 50, action: { to: f_verify.id, transition: "slide" } },
  ]);

  // ==========================================================================
  // SCREEN 6: VerificationCode
  // ==========================================================================
  addGroup(f_verify, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Verify Identity", icon: "arrow_back", variant: "filled", size: 412, actions: { icon: { to: f_forgot.id, transition: "slideLeft" } } },
  ]);
  addGroup(f_verify, 24, 112, "y", [
    { id: uid(), kind: "text", label: "Enter 4-Digit Code", icon: null, variant: "filled", font: 26, bold: true, size: 26 },
    { id: uid(), kind: "text", label: "We sent an authorization code to cody.fisher45@example.com", icon: null, variant: "filled", font: 14, textColor: "onSurfaceVariant", size: 14 },
    { id: uid(), kind: "otpInput", label: "1420", size: 364 },
    { id: uid(), kind: "chip", label: "Resend Code in 00:48", icon: "timer", variant: "tonal", size: 190 },
    { id: uid(), kind: "button", label: "Verify & Continue", icon: "check_circle", variant: "filled", size: 364, size2: 50, action: { to: f_reset.id, transition: "slide" } },
  ]);

  // ==========================================================================
  // SCREEN 7: ResetPassword
  // ==========================================================================
  addGroup(f_reset, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "New Password", icon: "arrow_back", variant: "filled", size: 412, actions: { icon: { to: f_verify.id, transition: "slideLeft" } } },
  ]);
  addGroup(f_reset, 24, 112, "y", [
    { id: uid(), kind: "text", label: "Reset Password", icon: null, variant: "filled", font: 26, bold: true, size: 26 },
    { id: uid(), kind: "text", label: "Set your new secure password to access your account.", icon: null, variant: "filled", font: 14, textColor: "onSurfaceVariant", size: 14 },
    { id: uid(), kind: "textField", label: "New Password", placeholder: "••••••••••••", icon: "lock", icon2: "visibility_off", variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "Confirm Password", placeholder: "••••••••••••", icon: "lock_reset", icon2: "visibility_off", variant: "outlined", size: 364 },
    { id: uid(), kind: "passwordStrength", label: "Password Strength: Excellent", supporting: "Password meets all security recommendations", size: 364 },
    { id: uid(), kind: "button", label: "Confirm & Login", icon: "check", variant: "filled", size: 364, size2: 50, action: { to: f_login.id, transition: "slide" } },
  ]);

  // ==========================================================================
  // SCREEN 8: Homepage (Discover)
  // ==========================================================================
  addGroup(f_home, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Define Atelier", icon: "diamond", icon2: "search", icon3: "notifications", font: 24, bold: true, variant: "filled", size: 412, actions: { icon2: { to: f_search.id, transition: "fade" }, icon3: { to: f_notifs.id, transition: "slide" } } },
  ]);
  addGroup(f_home, 24, 104, "y", [
    { id: uid(), kind: "searchBar", label: "Search 50,000+ luxury clothes...", icon: "search", icon3: "tune", variant: "filled", size: 364, action: { to: f_search.id, transition: "fade" } },
  ]);
  // Lookbook story bubbles row
  addGroup(f_home, 20, 168, "x", [
    { id: uid(), kind: "storyBubble", label: "Lookbook", icon2: FASHION_IMGS.hero, size: 70 },
    { id: uid(), kind: "storyBubble", label: "Summer Drop", icon2: FASHION_IMGS.navyTee, size: 70 },
    { id: uid(), kind: "storyBubble", label: "Streetwear", icon2: FASHION_IMGS.tealPolo, size: 70 },
    { id: uid(), kind: "storyBubble", label: "Tokyo Run", icon2: FASHION_IMGS.blackTee, size: 70 },
    { id: uid(), kind: "storyBubble", label: "VIP Vault", icon2: FASHION_IMGS.pinkThermal, size: 70 },
  ]);
  // Countdown Flash Sale Banner
  addGroup(f_home, 24, 252, "y", [
    { id: uid(), kind: "countdownTimer", label: "Flash Drop: 40% Off Archival", supporting: "02:45:18", size: 364 },
  ]);
  // Filter chips row
  addGroup(f_home, 24, 314, "x", [
    { id: uid(), kind: "chip", label: "All Items", icon: "check", variant: "filled", checked: true, size: 94 },
    { id: uid(), kind: "chip", label: "T-Shirts", icon: null, variant: "outlined", size: 84 },
    { id: uid(), kind: "chip", label: "Polos", icon: null, variant: "outlined", size: 76 },
    { id: uid(), kind: "chip", label: "Jeans", icon: null, variant: "outlined", size: 74 },
  ]);
  // Product Grid Row 1
  addGroup(f_home, 20, 362, "x", [
    { id: uid(), kind: "card", label: "Regular Fit Slogan", supporting: "$1,190 · 100% Cotton", icon: null, icon2: "favorite_border", variant: "filled", src: FASHION_IMGS.navyTee, imagePos: "top", imageSize: 170, size: 184, size2: 248, action: { to: f_detail.id, transition: "slide" } },
    { id: uid(), kind: "card", label: "Regular Fit Polo", supporting: "$1,100 · Pique Knit", badge: "-52%", icon: null, icon2: "favorite_border", variant: "filled", src: FASHION_IMGS.tealPolo, imagePos: "top", imageSize: 170, size: 184, size2: 248, action: { to: f_detail.id, transition: "slide" } },
  ]);
  // Product Grid Row 2
  addGroup(f_home, 20, 618, "x", [
    { id: uid(), kind: "card", label: "Black Streetwear Tee", supporting: "$1,690 · Oversized", icon: null, icon2: "favorite_border", variant: "filled", src: FASHION_IMGS.blackTee, imagePos: "top", imageSize: 110, size: 184, size2: 174, action: { to: f_detail.id, transition: "slide" } },
    { id: uid(), kind: "card", label: "Vintage V-Neck", supporting: "$1,290 · Raw Hem", icon: null, icon2: "favorite_border", variant: "filled", src: FASHION_IMGS.vneckTee, imagePos: "top", imageSize: 110, size: 184, size2: 174, action: { to: f_detail.id, transition: "slide" } },
  ]);
  // Bottom Nav
  addGroup(f_home, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 0, tabs: sharedNavTabs, actions: sharedNavActions },
  ]);

  // ==========================================================================
  // SCREEN 9: Search
  // ==========================================================================
  addGroup(f_search, 24, 44, "y", [
    { id: uid(), kind: "searchBar", label: "Search brand, garment or color...", icon: "search", icon3: "tune", variant: "filled", size: 364 },
  ]);
  // Trending Tags
  addGroup(f_search, 24, 114, "x", [
    { id: uid(), kind: "chip", label: "🔥 Oversized Tee", icon: null, variant: "tonal", size: 120 },
    { id: uid(), kind: "chip", label: "Selvedge Denim", icon: null, variant: "outlined", size: 114 },
    { id: uid(), kind: "chip", label: "Polo Shirts", icon: null, variant: "outlined", size: 98 },
  ]);
  addGroup(f_search, 24, 164, "x", [
    { id: uid(), kind: "text", label: "Recent Searches", icon: null, variant: "filled", font: 16, bold: true, size: 16 },
    { id: uid(), kind: "text", label: "Clear All", icon: null, variant: "filled", font: 13, textColor: "primary", textAlign: "end", size: 13 },
  ]);
  addGroup(f_search, 12, 196, "y", [
    { id: uid(), kind: "listItem", label: "Navy Slogan Tee (Define)", supporting: "Searched 2 hours ago", icon: "history", icon2: "close", variant: "filled", size: 388, action: { to: f_detail.id, transition: "slide" } },
    { id: uid(), kind: "listItem", label: "Polo Shirt Regular Fit", supporting: "Searched yesterday", icon: "history", icon2: "close", variant: "filled", size: 388, action: { to: f_detail.id, transition: "slide" } },
    { id: uid(), kind: "listItem", label: "Selvedge Denim Jeans", supporting: "Searched 3 days ago", icon: "history", icon2: "close", variant: "filled", size: 388, action: { to: f_detail.id, transition: "slide" } },
    { id: uid(), kind: "listItem", label: "Black Streetwear Tee", supporting: "Searched last week", icon: "history", icon2: "close", variant: "filled", size: 388, action: { to: f_detail.id, transition: "slide" } },
  ]);
  // Popular discovery card
  addGroup(f_search, 24, 460, "y", [
    { id: uid(), kind: "banner", label: "Need Style Advice?", supporting: "Chat live with our Tokyo & Paris in-house stylists 24/7.", icon: "chat", size: 364, action: { to: f_service.id, transition: "slide" } },
  ]);
  addGroup(f_search, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 1, tabs: sharedNavTabs, actions: sharedNavActions },
  ]);

  // ==========================================================================
  // SCREEN 10: SavedItems (Wishlist)
  // ==========================================================================
  addGroup(f_saved, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Wishlist (4)", icon: "arrow_back", icon2: "shopping_bag", variant: "filled", size: 412, actions: { icon: { to: f_home.id, transition: "fade" }, icon2: { to: f_cart.id, transition: "fade" } } },
  ]);
  addGroup(f_saved, 24, 104, "x", [
    { id: uid(), kind: "chip", label: "4 Items Saved · 2 On Sale", icon: "favorite", variant: "tonal", size: 210 },
    { id: uid(), kind: "chip", label: "Move All to Cart", icon: "add_shopping_cart", variant: "outlined", size: 140, action: { to: f_cart.id, transition: "slide" } },
  ]);
  // Wishlist Grid Row 1
  addGroup(f_saved, 20, 156, "x", [
    { id: uid(), kind: "card", label: "Regular Fit Slogan", supporting: "$1,190 · In Stock", icon: null, icon2: "favorite", icon2Fill: true, variant: "filled", src: FASHION_IMGS.navyTee, imagePos: "top", imageSize: 175, size: 184, size2: 250, action: { to: f_detail.id, transition: "slide" } },
    { id: uid(), kind: "card", label: "Regular Fit Polo", supporting: "$1,100 · Save 52%", icon: null, icon2: "favorite", icon2Fill: true, variant: "filled", src: FASHION_IMGS.tealPolo, imagePos: "top", imageSize: 175, size: 184, size2: 250, action: { to: f_detail.id, transition: "slide" } },
  ]);
  // Wishlist Grid Row 2
  addGroup(f_saved, 20, 420, "x", [
    { id: uid(), kind: "card", label: "Black Streetwear Tee", supporting: "$1,690 · Only 2 left", icon: null, icon2: "favorite", icon2Fill: true, variant: "filled", src: FASHION_IMGS.blackTee, imagePos: "top", imageSize: 175, size: 184, size2: 250, action: { to: f_detail.id, transition: "slide" } },
    { id: uid(), kind: "card", label: "Regular Fit V-Neck", supporting: "$1,290 · Restocked", icon: null, icon2: "favorite", icon2Fill: true, variant: "filled", src: FASHION_IMGS.vneckTee, imagePos: "top", imageSize: 175, size: 184, size2: 250, action: { to: f_detail.id, transition: "slide" } },
  ]);
  addGroup(f_saved, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 2, tabs: sharedNavTabs, actions: sharedNavActions },
  ]);

  // ==========================================================================
  // SCREEN 11: ProductDetails
  // ==========================================================================
  addGroup(f_detail, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Product Details", icon: "arrow_back", icon2: "favorite_border", icon3: "share", variant: "filled", size: 412, actions: { icon: { to: f_home.id, transition: "fade" }, icon2: { to: f_saved.id, transition: "fade" } } },
  ]);
  addGroup(f_detail, 24, 96, "y", [
    { id: uid(), kind: "card", label: "", supporting: "", icon: null, icon2: "favorite", icon2Fill: true, variant: "filled", src: FASHION_IMGS.navyTee, imagePos: "background", radiusTop: 24, radiusBottom: 24, size: 364, size2: 280 },
  ]);
  addGroup(f_detail, 24, 386, "x", [
    { id: uid(), kind: "priceTag", label: "$1,190.00", supporting: "$2,490.00", size: 210 },
    { id: uid(), kind: "chip", label: "★ 4.8 (1,420)", icon: "star", variant: "tonal", size: 140, action: { to: f_reviews.id, transition: "slide" } },
  ]);
  addGroup(f_detail, 24, 436, "y", [
    { id: uid(), kind: "text", label: "Regular Fit Slogan Streetwear Tee", icon: null, variant: "filled", font: 20, bold: true, size: 20 },
    { id: uid(), kind: "text", label: "Heavyweight 280 GSM Japanese combed cotton with vintage wash and reinforced double-needle seams.", icon: null, variant: "filled", font: 12.5, textColor: "onSurfaceVariant", size: 13 },
  ]);
  addGroup(f_detail, 24, 520, "x", [
    { id: uid(), kind: "colorSwatch", label: "Colors", size: 180 },
    { id: uid(), kind: "chip", label: "Midnight Navy", icon: "palette", variant: "tonal", size: 160 },
  ]);
  addGroup(f_detail, 24, 568, "y", [
    { id: uid(), kind: "sizeSelector", label: "M", size: 364 },
    { id: uid(), kind: "freeShippingBar", label: "Add $10.00 for FREE Next-Day Air!", size: 364 },
    { id: uid(), kind: "deliveryEstimate", label: "Express Delivery (2-3 Days)", supporting: "Order before 3PM for same-day dispatch", size: 364 },
  ]);
  // Dual CTAs sticky bottom
  addGroup(f_detail, 24, 764, "x", [
    { id: uid(), kind: "button", label: "Add to Bag", icon: "shopping_bag", variant: "tonal", size: 174, size2: 52, action: { to: f_cart.id, transition: "slide" } },
    { id: uid(), kind: "button", label: "Buy Now", icon: "bolt", variant: "filled", size: 180, size2: 52, action: { to: f_checkout.id, transition: "slide" } },
  ]);

  // ==========================================================================
  // SCREEN 12: Reviews
  // ==========================================================================
  addGroup(f_reviews, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Customer Reviews", icon: "arrow_back", icon2: "rate_review", variant: "filled", size: 412, actions: { icon: { to: f_detail.id, transition: "slideLeft" } } },
  ]);
  addGroup(f_reviews, 24, 96, "y", [
    { id: uid(), kind: "reviewSummary", label: "4.8", supporting: "Based on 1,420 ratings", size: 364 },
  ]);
  addGroup(f_reviews, 24, 204, "x", [
    { id: uid(), kind: "chip", label: "All (1,420)", icon: "check", variant: "filled", checked: true, size: 110 },
    { id: uid(), kind: "chip", label: "With Photos (420)", icon: "photo_camera", variant: "outlined", size: 140 },
    { id: uid(), kind: "chip", label: "5 Stars (1,164)", icon: "star", variant: "outlined", size: 100 },
  ]);
  addGroup(f_reviews, 24, 252, "y", [
    { id: uid(), kind: "starRatingInput", label: "Rate: 5.0 Excellent Fit", size: 364 },
    { id: uid(), kind: "commentThread", label: "Wade Warren (Verified Buyer)", supporting: "Exceptional heavyweight cotton drape. True to size with crisp silhouette. Worth every penny!", icon2: FASHION_IMGS.blackTee, size: 364 },
    { id: uid(), kind: "commentThread", label: "Guy Hawkins (Verified Buyer)", supporting: "The seller dispatched in under 24 hours. The slogan print has zero cracking after 5 washes.", icon2: FASHION_IMGS.tealPolo, size: 364 },
    { id: uid(), kind: "commentThread", label: "Kristin Watson (Fashion Blogger)", supporting: "Obsessed with this colorway. Ordered another in Black! The shoulder drop is flawless.", icon2: FASHION_IMGS.hero, size: 364 },
    { id: uid(), kind: "button", label: "Write a Customer Review", icon: "rate_review", variant: "outlined", size: 364, size2: 48 },
  ]);

  // ==========================================================================
  // SCREEN 13: MyCart
  // ==========================================================================
  addGroup(f_cart, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "My Cart (3)", icon: "arrow_back", icon2: "delete_sweep", variant: "filled", size: 412, actions: { icon: { to: f_home.id, transition: "fade" } } },
  ]);
  addGroup(f_cart, 24, 96, "y", [
    { id: uid(), kind: "freeShippingBar", label: "🎉 You've unlocked FREE Express Shipping!", size: 364 },
    { id: uid(), kind: "card", label: "Regular Fit Slogan Tee", supporting: "Size M · Midnight Navy · $1,190.00", icon: null, icon2: "delete_outline", variant: "filled", src: FASHION_IMGS.navyTee, imagePos: "leading", imageSize: 84, size: 364, size2: 90 },
    { id: uid(), kind: "card", label: "Regular Fit Polo Shirt", supporting: "Size L · Teal Green · $1,100.00", icon: null, icon2: "delete_outline", variant: "filled", src: FASHION_IMGS.tealPolo, imagePos: "leading", imageSize: 84, size: 364, size2: 90 },
    { id: uid(), kind: "card", label: "Black Streetwear Tee", supporting: "Size L · Obsidian · $1,690.00", icon: null, icon2: "delete_outline", variant: "filled", src: FASHION_IMGS.blackTee, imagePos: "leading", imageSize: 84, size: 364, size2: 90 },
    { id: uid(), kind: "couponCode", label: "ATELIER20", supporting: "20% VIP Autumn Discount Applied (-$200.00)", icon: "percent", size: 364 },
    { id: uid(), kind: "priceBreakdown", label: "Order Summary (3 items)", size: 364 },
    { id: uid(), kind: "button", label: "Go to Checkout  ➔", icon: "shopping_cart_checkout", variant: "filled", size: 364, size2: 52, action: { to: f_checkout.id, transition: "slide" } },
  ]);
  addGroup(f_cart, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 3, tabs: sharedNavTabs, actions: sharedNavActions },
  ]);

  // ==========================================================================
  // SCREEN 14: Checkout
  // ==========================================================================
  addGroup(f_checkout, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Checkout", icon: "arrow_back", icon2: "lock", variant: "filled", size: 412, actions: { icon: { to: f_cart.id, transition: "slideLeft" } } },
  ]);
  addGroup(f_checkout, 24, 96, "y", [
    { id: uid(), kind: "text", label: "Delivery Address", icon: null, variant: "filled", font: 15, bold: true, size: 15 },
    { id: uid(), kind: "addressCard", label: "Home (Default)", supporting: "925 S Chugach St #APT 10, Palmer, Alaska 99645", size: 364, action: { to: f_address.id, transition: "slide" } },
  ]);
  addGroup(f_checkout, 24, 226, "x", [
    { id: uid(), kind: "chip", label: "🚚 Standard (FREE · 3 Days)", icon: "local_shipping", variant: "filled", checked: true, size: 210 },
    { id: uid(), kind: "chip", label: "⚡ Express ($15)", icon: "bolt", variant: "outlined", size: 140 },
  ]);
  addGroup(f_checkout, 24, 276, "y", [
    { id: uid(), kind: "text", label: "Payment Method", icon: null, variant: "filled", font: 15, bold: true, size: 15 },
    { id: uid(), kind: "paymentMethodSelector", label: "Payment", size: 364, action: { to: f_payment.id, transition: "slide" } },
    { id: uid(), kind: "priceBreakdown", label: "Final Breakdown", size: 364 },
    { id: uid(), kind: "verificationBadge", label: "256-Bit Encrypted Payment", supporting: "Verified by Visa & Apple Secure Enclave", size: 364 },
    { id: uid(), kind: "button", label: "Place Order Now  ➔", icon: "lock", variant: "filled", size: 364, size2: 54, action: { to: f_track.id, transition: "slide" } },
  ]);

  // ==========================================================================
  // SCREEN 15: Address
  // ==========================================================================
  addGroup(f_address, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Saved Addresses", icon: "arrow_back", icon2: "add_location", variant: "filled", size: 412, actions: { icon: { to: f_checkout.id, transition: "slideLeft" }, icon2: { to: f_new_addr.id, transition: "slide" } } },
  ]);
  addGroup(f_address, 24, 96, "y", [
    { id: uid(), kind: "addressCard", label: "Home (Default)", supporting: "925 S Chugach St #APT 10, Palmer, Alaska 99645", size: 364 },
    { id: uid(), kind: "addressCard", label: "Downtown Studio", supporting: "2438 6th Ave, Suite 402, Ketchikan, Alaska 99901", size: 364 },
    { id: uid(), kind: "addressCard", label: "Atelier Office", supporting: "2551 Vista Dr #B301, Juneau, Alaska 99801", size: 364 },
    { id: uid(), kind: "button", label: "+ Add New Address", icon: "add", variant: "outlined", size: 364, size2: 50, action: { to: f_new_addr.id, transition: "slide" } },
    { id: uid(), kind: "button", label: "Apply Selected Address", icon: "check", variant: "filled", size: 364, size2: 52, action: { to: f_checkout.id, transition: "slide" } },
  ]);

  // ==========================================================================
  // SCREEN 16: NewAddress
  // ==========================================================================
  addGroup(f_new_addr, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Add New Address", icon: "arrow_back", variant: "filled", size: 412, actions: { icon: { to: f_address.id, transition: "slideLeft" } } },
  ]);
  addGroup(f_new_addr, 24, 96, "y", [
    { id: uid(), kind: "card", label: "📍 Pin Calibrated GPS Location", supporting: "Campbell St, Alaska 99645 · Accuracy ±3m", icon: "my_location", variant: "filled", fill: "surfaceContainerHigh", size: 364, size2: 120 },
    { id: uid(), kind: "segmentedButton", label: "Type", size: 364 },
    { id: uid(), kind: "textField", label: "Recipient Name", placeholder: "Cody Fisher", icon: "person", variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "Street Address", placeholder: "925 S Chugach St #APT 10", icon: "home", variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "City & Zip Code", placeholder: "Palmer, Alaska 99645", icon: "location_city", variant: "outlined", size: 364 },
    { id: uid(), kind: "checkbox", label: "Set as default shipping address", icon: null, variant: "filled", checked: true, size: 364 },
    { id: uid(), kind: "button", label: "Save & Use Address", icon: "save", variant: "filled", size: 364, size2: 50, action: { to: f_address.id, transition: "slide" } },
  ]);

  // ==========================================================================
  // SCREEN 17: PaymentMethod
  // ==========================================================================
  addGroup(f_payment, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Payment Methods", icon: "arrow_back", icon2: "add_card", variant: "filled", size: 412, actions: { icon: { to: f_checkout.id, transition: "slideLeft" }, icon2: { to: f_new_card.id, transition: "slide" } } },
  ]);
  addGroup(f_payment, 24, 96, "y", [
    { id: uid(), kind: "creditCard", label: "CODY FISHER", supporting: "08/29", size: 364, size2: 180 },
    { id: uid(), kind: "paymentMethodSelector", label: "Active", size: 364 },
    { id: uid(), kind: "listItem", label: "Apple Pay (Instant Biometric)", supporting: "Default express checkout", icon: "payments", icon2: "radio_button_checked", variant: "filled", size: 364 },
    { id: uid(), kind: "listItem", label: "Visa Platinum (•••• 2512)", supporting: "Expires 08/29 · Linked to checking", icon: "credit_card", icon2: "radio_button_unchecked", variant: "filled", size: 364 },
    { id: uid(), kind: "listItem", label: "MasterCard Elite (•••• 3421)", supporting: "Expires 11/27", icon: "credit_card", icon2: "radio_button_unchecked", variant: "filled", size: 364 },
    { id: uid(), kind: "button", label: "+ Add Debit / Credit Card", icon: "add", variant: "outlined", size: 364, size2: 50, action: { to: f_new_card.id, transition: "slide" } },
    { id: uid(), kind: "button", label: "Confirm Payment Method", icon: "check", variant: "filled", size: 364, size2: 52, action: { to: f_checkout.id, transition: "slide" } },
  ]);

  // ==========================================================================
  // SCREEN 18: NewCard
  // ==========================================================================
  addGroup(f_new_card, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Add Debit / Credit Card", icon: "arrow_back", variant: "filled", size: 412, actions: { icon: { to: f_payment.id, transition: "slideLeft" } } },
  ]);
  addGroup(f_new_card, 24, 96, "y", [
    { id: uid(), kind: "creditCard", label: "CARDHOLDER NAME", supporting: "MM/YY", size: 364, size2: 180 },
    { id: uid(), kind: "textField", label: "Card Number", placeholder: "4532 •••• •••• 8921", icon: "credit_card", variant: "outlined", size: 364 },
  ]);
  addGroup(f_new_card, 24, 386, "x", [
    { id: uid(), kind: "textField", label: "Expiry Date", placeholder: "MM/YY", icon: "calendar_today", variant: "outlined", size: 174 },
    { id: uid(), kind: "textField", label: "Security Code", placeholder: "CVC", icon: "lock", variant: "outlined", size: 174 },
  ]);
  addGroup(f_new_card, 24, 464, "y", [
    { id: uid(), kind: "textField", label: "Cardholder Name", placeholder: "Cody Fisher", icon: "person", variant: "outlined", size: 364 },
    { id: uid(), kind: "switch", label: "Save card securely with Face ID", icon: null, variant: "filled", checked: true, size: 364 },
    { id: uid(), kind: "button", label: "Add & Verify Card", icon: "verified_user", variant: "filled", size: 364, size2: 52, action: { to: f_payment.id, transition: "slide" } },
  ]);

  // ==========================================================================
  // SCREEN 19: Account
  // ==========================================================================
  addGroup(f_account, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "My Account", icon: "diamond", icon2: "settings", variant: "filled", size: 412, actions: { icon2: { to: f_notif_settings.id, transition: "slide" } } },
  ]);
  addGroup(f_account, 24, 96, "y", [
    { id: uid(), kind: "userProfileHeader", label: "Cody Fisher", supporting: "cody.fisher45@example.com · Gold VIP", icon2: FASHION_IMGS.hero, size: 364, action: { to: f_my_details.id, transition: "slide" } },
    { id: uid(), kind: "loyaltyPointsBadge", label: "Atelier Gold VIP", supporting: "2,450 points ($24.50 reward value)", size: 364 },
  ]);
  // Order Quick Shortcuts
  addGroup(f_account, 24, 310, "x", [
    { id: uid(), kind: "chip", label: "📦 To Pay (1)", icon: null, variant: "tonal", size: 110, action: { to: f_orders.id, transition: "slide" } },
    { id: uid(), kind: "chip", label: "🚚 In Transit (1)", icon: null, variant: "filled", checked: true, size: 124, action: { to: f_orders.id, transition: "slide" } },
    { id: uid(), kind: "chip", label: "✓ Delivered (8)", icon: null, variant: "outlined", size: 114, action: { to: f_orders.id, transition: "slide" } },
  ]);
  addGroup(f_account, 12, 358, "y", [
    { id: uid(), kind: "listItem", label: "My Orders & Receipts", supporting: "Track live shipments and download VAT invoices", icon: "inventory_2", icon2: "chevron_right", variant: "filled", size: 388, action: { to: f_orders.id, transition: "slide" } },
    { id: uid(), kind: "listItem", label: "Personal Profile Details", supporting: "Name, email, phone and biometric setup", icon: "person", icon2: "chevron_right", variant: "filled", size: 388, action: { to: f_my_details.id, transition: "slide" } },
    { id: uid(), kind: "listItem", label: "Shipping Address Book", supporting: "3 saved delivery addresses", icon: "location_on", icon2: "chevron_right", variant: "filled", size: 388, action: { to: f_address.id, transition: "slide" } },
    { id: uid(), kind: "listItem", label: "Payment Cards & Wallets", supporting: "Visa, MasterCard and Apple Pay", icon: "credit_card", icon2: "chevron_right", variant: "filled", size: 388, action: { to: f_payment.id, transition: "slide" } },
    { id: uid(), kind: "listItem", label: "Notification Preferences", supporting: "Push alerts, drops and courier ETA", icon: "notifications", icon2: "chevron_right", variant: "filled", size: 388, action: { to: f_notifs.id, transition: "slide" } },
    { id: uid(), kind: "listItem", label: "Frequently Asked Questions", supporting: "Shipping, returns, size guide", icon: "help_outline", icon2: "chevron_right", variant: "filled", size: 388, action: { to: f_faqs.id, transition: "slide" } },
    { id: uid(), kind: "listItem", label: "24/7 Help & Support Concierge", supporting: "Live chat with support stylist", icon: "headset_mic", icon2: "chevron_right", variant: "filled", size: 388, action: { to: f_help.id, transition: "slide" } },
    { id: uid(), kind: "listItem", label: "Logout", supporting: "Sign out of Cody Fisher session", icon: "logout", textColor: "error", variant: "filled", size: 388, action: { to: f_login.id, transition: "fade" } },
  ]);
  addGroup(f_account, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 4, tabs: sharedNavTabs, actions: sharedNavActions },
  ]);

  // ==========================================================================
  // SCREEN 20: MyOrders
  // ==========================================================================
  addGroup(f_orders, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "My Orders", icon: "arrow_back", icon2: "search", variant: "filled", size: 412, actions: { icon: { to: f_account.id, transition: "slideLeft" } } },
  ]);
  addGroup(f_orders, 24, 96, "y", [
    { id: uid(), kind: "segmentedButton", label: "Orders Tabs", size: 364 },
    { id: uid(), kind: "orderStatus", label: "Order #AT-9042 • Out for Delivery (Live)", supporting: "Estimated arrival today at 4:30 PM", size: 364 },
    { id: uid(), kind: "card", label: "Regular Fit Slogan Streetwear Tee", supporting: "Size M · Navy Blue · $1,190.00", badge: "Live Radar", icon: null, src: FASHION_IMGS.navyTee, imagePos: "leading", imageSize: 84, variant: "filled", size: 364, size2: 104, action: { to: f_track.id, transition: "slide" } },
    { id: uid(), kind: "card", label: "Regular Fit Polo Shirt", supporting: "Size L · Teal Green · $1,100.00", badge: "Delivered", icon: null, src: FASHION_IMGS.tealPolo, imagePos: "leading", imageSize: 84, variant: "outlined", size: 364, size2: 104, action: { to: f_track.id, transition: "slide" } },
    { id: uid(), kind: "card", label: "Black Streetwear Sleeveless", supporting: "Size L · Obsidian · $1,690.00", badge: "Delivered", icon: null, src: FASHION_IMGS.blackTee, imagePos: "leading", imageSize: 84, variant: "outlined", size: 364, size2: 104, action: { to: f_track.id, transition: "slide" } },
    { id: uid(), kind: "button", label: "Track Live Courier ➔", icon: "local_shipping", variant: "filled", size: 364, size2: 50, action: { to: f_track.id, transition: "slide" } },
  ]);
  addGroup(f_orders, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 4, tabs: sharedNavTabs, actions: sharedNavActions },
  ]);

  // ==========================================================================
  // SCREEN 21: TrackOrder
  // ==========================================================================
  addGroup(f_track, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Live Order Tracking", icon: "arrow_back", icon2: "phone", variant: "filled", size: 412, actions: { icon: { to: f_orders.id, transition: "slideLeft" } } },
  ]);
  addGroup(f_track, 24, 96, "y", [
    { id: uid(), kind: "deliveryEstimate", label: "Courier arriving in 12 mins", supporting: "Driver: Alex Rodriguez (Toyota Prius Silver #AK-928)", size: 364 },
    { id: uid(), kind: "card", label: "📍 Live GPS Courier Radar", supporting: "Courier is 0.8 miles away on 2nd Ave & Chugach St", icon: "navigation", variant: "filled", fill: "surfaceContainerHigh", size: 364, size2: 140 },
    { id: uid(), kind: "timeline", label: "Order #AT-9042 Delivery Milestones", supporting: "1. Order Placed ✓  2. Packed ✓  3. In Transit (Active)  4. Delivered", size: 364 },
    { id: uid(), kind: "card", label: "Courier Driver: Alex Rodriguez", supporting: "★ 4.97 (1,240 deliveries) · Verified Courier", icon: "sports_motorsports", icon2: "call", variant: "outlined", size: 364, size2: 76 },
    { id: uid(), kind: "button", label: "Back to Home Feed", icon: "home", variant: "filled", size: 364, size2: 52, action: { to: f_home.id, transition: "fade" } },
  ]);

  // ==========================================================================
  // SCREEN 22: MyDetails
  // ==========================================================================
  addGroup(f_my_details, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Personal Details", icon: "arrow_back", icon2: "edit", variant: "filled", size: 412, actions: { icon: { to: f_account.id, transition: "slideLeft" } } },
  ]);
  addGroup(f_my_details, 24, 96, "y", [
    { id: uid(), kind: "userProfileHeader", label: "Cody Fisher", supporting: "Member since June 2023 · Gold VIP", icon2: FASHION_IMGS.hero, size: 364 },
    { id: uid(), kind: "verificationBadge", label: "Phone & Identity Verified", supporting: "2FA authentication active via SMS and Authenticator", size: 364 },
    { id: uid(), kind: "textField", label: "Full Name", placeholder: "Cody Fisher", icon: "person", variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "Email Address", placeholder: "cody.fisher45@example.com", icon: "email", variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "Phone Number", placeholder: "+1 (907) 555-0192", icon: "phone", variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "Date of Birth", placeholder: "12 / 01 / 1990", icon: "calendar_today", variant: "outlined", size: 364 },
    { id: uid(), kind: "button", label: "Save Profile Changes", icon: "save", variant: "filled", size: 364, size2: 50, action: { to: f_account.id, transition: "slide" } },
  ]);
  addGroup(f_my_details, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 4, tabs: sharedNavTabs, actions: sharedNavActions },
  ]);

  // ==========================================================================
  // SCREEN 23: Notifications
  // ==========================================================================
  addGroup(f_notifs, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Notifications", icon: "arrow_back", icon2: "settings", variant: "filled", size: 412, actions: { icon: { to: f_account.id, transition: "slideLeft" }, icon2: { to: f_notif_settings.id, transition: "slide" } } },
  ]);
  addGroup(f_notifs, 24, 96, "y", [
    { id: uid(), kind: "segmentedButton", label: "Filter Alerts", size: 364 },
    { id: uid(), kind: "notificationItem", label: "30% VIP Flash Drop!", supporting: "Exclusive 24-hour promotion on archival streetwear · 2h ago", icon: "local_offer", size: 364 },
    { id: uid(), kind: "notificationItem", label: "Order #AT-9042 is Out for Delivery", supporting: "Driver Alex Rodriguez is 12 mins away · 4h ago", icon: "local_shipping", size: 364, action: { to: f_track.id, transition: "slide" } },
    { id: uid(), kind: "notificationItem", label: "Cashback $15.00 Credited", supporting: "Earned from last purchase · Added to Atelier Wallet · Yesterday", icon: "account_balance_wallet", size: 364 },
    { id: uid(), kind: "notificationItem", label: "Visa •••• 2512 Connected", supporting: "Payment method linked successfully · 2 days ago", icon: "credit_card", size: 364 },
    { id: uid(), kind: "button", label: "Notification Settings", icon: "tune", variant: "outlined", size: 364, size2: 48, action: { to: f_notif_settings.id, transition: "slide" } },
  ]);
  addGroup(f_notifs, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 4, tabs: sharedNavTabs, actions: sharedNavActions },
  ]);

  // ==========================================================================
  // SCREEN 24: NotificationSettings
  // ==========================================================================
  addGroup(f_notif_settings, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Alert Preferences", icon: "arrow_back", variant: "filled", size: 412, actions: { icon: { to: f_notifs.id, transition: "slideLeft" } } },
  ]);
  addGroup(f_notif_settings, 24, 96, "y", [
    { id: uid(), kind: "switch", label: "Order Status & Live Tracking", icon: null, variant: "filled", checked: true, size: 364 },
    { id: uid(), kind: "switch", label: "Flash Sales & Early Runway Drops", icon: null, variant: "filled", checked: true, size: 364 },
    { id: uid(), kind: "switch", label: "Price Drops on Wishlist Items", icon: null, variant: "filled", checked: true, size: 364 },
    { id: uid(), kind: "switch", label: "Cashback & VIP Rewards", icon: null, variant: "filled", checked: true, size: 364 },
    { id: uid(), kind: "switch", label: "Push Notification Sounds", icon: null, variant: "filled", checked: true, size: 364 },
    { id: uid(), kind: "switch", label: "Haptic Vibration Alerts", icon: null, variant: "filled", checked: false, size: 364 },
    { id: uid(), kind: "switch", label: "Weekly Fashion Digest Newsletter", icon: null, variant: "filled", checked: false, size: 364 },
    { id: uid(), kind: "button", label: "Save Alert Preferences", icon: "check", variant: "filled", size: 364, size2: 50, action: { to: f_notifs.id, transition: "slide" } },
  ]);
  addGroup(f_notif_settings, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 4, tabs: sharedNavTabs, actions: sharedNavActions },
  ]);

  // ==========================================================================
  // SCREEN 25: FAQs
  // ==========================================================================
  addGroup(f_faqs, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Frequently Asked Questions", icon: "arrow_back", icon2: "search", variant: "filled", size: 412, actions: { icon: { to: f_account.id, transition: "slideLeft" } } },
  ]);
  addGroup(f_faqs, 24, 96, "y", [
    { id: uid(), kind: "searchBar", label: "Search questions, returns, sizes...", icon: "search", icon3: "mic", variant: "filled", size: 364 },
  ]);
  addGroup(f_faqs, 24, 166, "x", [
    { id: uid(), kind: "chip", label: "All FAQs", icon: "check", variant: "filled", checked: true, size: 98 },
    { id: uid(), kind: "chip", label: "Shipping", icon: null, variant: "outlined", size: 84 },
    { id: uid(), kind: "chip", label: "Returns", icon: null, variant: "outlined", size: 82 },
    { id: uid(), kind: "chip", label: "Payment", icon: null, variant: "outlined", size: 84 },
  ]);
  addGroup(f_faqs, 24, 218, "y", [
    { id: uid(), kind: "faqAccordion", label: "How do returns work?", supporting: "We offer 30-day hassle-free returns. Simply initiate from your orders tab for an instant prepaid courier label.", size: 364 },
    { id: uid(), kind: "faqAccordion", label: "How fast is express delivery?", supporting: "Orders placed before 3:00 PM EST qualify for guaranteed next-day priority courier dispatch.", size: 364 },
    { id: uid(), kind: "faqAccordion", label: "What payment methods are supported?", supporting: "We accept Visa, MasterCard, Apple Pay, PayPal, and Cash on Delivery in supported regions.", size: 364 },
    { id: uid(), kind: "faqAccordion", label: "Can I cancel or alter an order?", supporting: "You can modify your order or delivery address within 60 minutes of checkout directly via live chat.", size: 364 },
    { id: uid(), kind: "banner", label: "Still have questions?", supporting: "Our stylists are online 24/7 in live chat.", icon: "support_agent", size: 364, action: { to: f_service.id, transition: "slide" } },
  ]);
  addGroup(f_faqs, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 4, tabs: sharedNavTabs, actions: sharedNavActions },
  ]);

  // ==========================================================================
  // SCREEN 26: HelpCenter
  // ==========================================================================
  addGroup(f_help, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "24/7 Concierge Support", icon: "arrow_back", icon2: "headset_mic", variant: "filled", size: 412, actions: { icon: { to: f_account.id, transition: "slideLeft" } } },
  ]);
  addGroup(f_help, 24, 96, "y", [
    { id: uid(), kind: "banner", label: "Live Support Response Time: ~1 min", supporting: "Connect instantly with our dedicated fashion concierges.", icon: "bolt", size: 364, action: { to: f_service.id, transition: "slide" } },
    { id: uid(), kind: "listItem", label: "24/7 Live Chat Concierge", supporting: "Instant in-app chat with stylist (Average 45s wait)", icon: "chat", icon2: "chevron_right", variant: "filled", size: 388, action: { to: f_service.id, transition: "slide" } },
    { id: uid(), kind: "listItem", label: "WhatsApp Fashion Stylist", supporting: "+1 (800) 283-5437 · Direct messaging", icon: "forum", icon2: "chevron_right", variant: "filled", size: 388 },
    { id: uid(), kind: "listItem", label: "Toll-Free Phone Support", supporting: "Available 9 AM - 9 PM EST: 1-800-DEFINE", icon: "call", icon2: "chevron_right", variant: "filled", size: 388 },
    { id: uid(), kind: "listItem", label: "Email Support Ticket", supporting: "concierge@defineatelier.com · 2h reply SLA", icon: "email", icon2: "chevron_right", variant: "filled", size: 388 },
    { id: uid(), kind: "button", label: "Start Live Chat Now  ➔", icon: "headset_mic", variant: "filled", size: 364, size2: 52, action: { to: f_service.id, transition: "slide" } },
  ]);
  addGroup(f_help, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 4, tabs: sharedNavTabs, actions: sharedNavActions },
  ]);

  // ==========================================================================
  // SCREEN 27: CustomerService
  // ==========================================================================
  addGroup(f_service, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Stylist Concierge (Sarah)", icon: "arrow_back", icon2: "call", variant: "filled", size: 412, actions: { icon: { to: f_help.id, transition: "slideLeft" } } },
  ]);
  addGroup(f_service, 156, 96, "x", [
    { id: uid(), kind: "chip", label: "Today · Live Session", icon: "lock", variant: "tonal", size: 160 },
  ]);
  addGroup(f_service, 24, 148, "y", [
    { id: uid(), kind: "card", label: "Hello Cody! Welcome to Define Concierge.", supporting: "I'm Sarah, your personal stylist today. How can I assist you with order #AT-9042?", icon: "headset_mic", variant: "filled", fill: "surfaceContainerHigh", font: 13, size: 320, size2: 68 },
    { id: uid(), kind: "chatBubble", label: "Hi Sarah! Can you confirm if driver Alex can leave the package on the front porch?", supporting: "10:43 AM", size: 340 },
    { id: uid(), kind: "card", label: "Certainly! I've updated your driver notes.", supporting: "Courier instructions: 'Safe drop at covered front porch requested.' Courier notified!", icon: "check_circle", variant: "filled", fill: "surfaceContainerHigh", font: 13, size: 320, size2: 74 },
    { id: uid(), kind: "chatBubble", label: "Awesome, thank you so much for the prompt help!", supporting: "10:45 AM", size: 320 },
    { id: uid(), kind: "card", label: "You're very welcome, Cody!", supporting: "Enjoy your new pieces and have a wonderful day ahead. ⭐", icon: "favorite", variant: "filled", fill: "surfaceContainerHigh", font: 13, size: 280, size2: 56 },
  ]);
  // Live Message Input Dock
  addGroup(f_service, 24, 760, "x", [
    { id: uid(), kind: "textField", label: "Write message...", placeholder: "Type your question...", icon: "attach_file", variant: "outlined", size: 290 },
    { id: uid(), kind: "button", label: "", icon: "send", variant: "filled", size: 64, size2: 54 },
  ]);

  return {
    version: 3,
    frames,
    groups,
    flows: [],
  };
}
