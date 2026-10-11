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
  const f_splash: Frame = { id: "cloth_splash", name: "#1 Splash", x: STRIDE_X * 0, y: STRIDE_Y * 0, w: FRAME_W, h: FRAME_H, note: "Launch splash" };
  const f_onboarding: Frame = { id: "cloth_onboarding", name: "#2 Onboarding", x: STRIDE_X * 1, y: STRIDE_Y * 0, w: FRAME_W, h: FRAME_H, note: "Hero onboarding" };
  const f_signup: Frame = { id: "cloth_signup", name: "#3 SignUp", x: STRIDE_X * 2, y: STRIDE_Y * 0, w: FRAME_W, h: FRAME_H, note: "Create account" };
  const f_login: Frame = { id: "cloth_login", name: "#4 Login", x: STRIDE_X * 3, y: STRIDE_Y * 0, w: FRAME_W, h: FRAME_H, note: "User login" };
  const f_forgot: Frame = { id: "cloth_forgot_password", name: "#5 ForgotPassword", x: STRIDE_X * 4, y: STRIDE_Y * 0, w: FRAME_W, h: FRAME_H, note: "Recover password" };

  // Row 1
  const f_verify: Frame = { id: "cloth_verification_code", name: "#6 VerificationCode", x: STRIDE_X * 0, y: STRIDE_Y * 1, w: FRAME_W, h: FRAME_H, note: "4-digit verification" };
  const f_reset: Frame = { id: "cloth_reset_password", name: "#7 ResetPassword", x: STRIDE_X * 1, y: STRIDE_Y * 1, w: FRAME_W, h: FRAME_H, note: "Reset password" };
  const f_home: Frame = { id: "cloth_homepage", name: "#8 Homepage", x: STRIDE_X * 2, y: STRIDE_Y * 1, w: FRAME_W, h: FRAME_H, note: "Discover feed" };
  const f_search: Frame = { id: "cloth_search", name: "#9 Search", x: STRIDE_X * 3, y: STRIDE_Y * 1, w: FRAME_W, h: FRAME_H, note: "Search catalog" };
  const f_saved: Frame = { id: "cloth_saved_items", name: "#10 SavedItems", x: STRIDE_X * 4, y: STRIDE_Y * 1, w: FRAME_W, h: FRAME_H, note: "Wishlist" };

  // Row 2
  const f_detail: Frame = { id: "cloth_product_details", name: "#11 ProductDetails", x: STRIDE_X * 0, y: STRIDE_Y * 2, w: FRAME_W, h: FRAME_H, note: "Product details" };
  const f_reviews: Frame = { id: "cloth_reviews", name: "#12 Reviews", x: STRIDE_X * 1, y: STRIDE_Y * 2, w: FRAME_W, h: FRAME_H, note: "Customer reviews" };
  const f_cart: Frame = { id: "cloth_my_cart", name: "#13 MyCart", x: STRIDE_X * 2, y: STRIDE_Y * 2, w: FRAME_W, h: FRAME_H, note: "Shopping bag" };
  const f_checkout: Frame = { id: "cloth_checkout", name: "#14 Checkout", x: STRIDE_X * 3, y: STRIDE_Y * 2, w: FRAME_W, h: FRAME_H, note: "Order checkout" };
  const f_address: Frame = { id: "cloth_address", name: "#15 Address", x: STRIDE_X * 4, y: STRIDE_Y * 2, w: FRAME_W, h: FRAME_H, note: "Saved addresses" };

  // Row 3
  const f_new_addr: Frame = { id: "cloth_new_address", name: "#16 NewAddress", x: STRIDE_X * 0, y: STRIDE_Y * 3, w: FRAME_W, h: FRAME_H, note: "New address" };
  const f_payment: Frame = { id: "cloth_payment_method", name: "#17 PaymentMethod", x: STRIDE_X * 1, y: STRIDE_Y * 3, w: FRAME_W, h: FRAME_H, note: "Payment method" };
  const f_new_card: Frame = { id: "cloth_new_card", name: "#18 NewCard", x: STRIDE_X * 2, y: STRIDE_Y * 3, w: FRAME_W, h: FRAME_H, note: "New card" };
  const f_account: Frame = { id: "cloth_account", name: "#19 Account", x: STRIDE_X * 3, y: STRIDE_Y * 3, w: FRAME_W, h: FRAME_H, note: "User account" };
  const f_orders: Frame = { id: "cloth_my_orders", name: "#20 MyOrders", x: STRIDE_X * 4, y: STRIDE_Y * 3, w: FRAME_W, h: FRAME_H, note: "Orders list" };

  // Row 4
  const f_track: Frame = { id: "cloth_track_order", name: "#21 TrackOrder", x: STRIDE_X * 0, y: STRIDE_Y * 4, w: FRAME_W, h: FRAME_H, note: "Track delivery" };
  const f_my_details: Frame = { id: "cloth_my_details", name: "#22 MyDetails", x: STRIDE_X * 1, y: STRIDE_Y * 4, w: FRAME_W, h: FRAME_H, note: "My details" };
  const f_notifs: Frame = { id: "cloth_notifications", name: "#23 Notifications", x: STRIDE_X * 2, y: STRIDE_Y * 4, w: FRAME_W, h: FRAME_H, note: "Notifications" };
  const f_notif_settings: Frame = { id: "cloth_notification_settings", name: "#24 NotificationSettings", x: STRIDE_X * 3, y: STRIDE_Y * 4, w: FRAME_W, h: FRAME_H, note: "Notification settings" };
  const f_faqs: Frame = { id: "cloth_faqs", name: "#25 FAQs", x: STRIDE_X * 4, y: STRIDE_Y * 4, w: FRAME_W, h: FRAME_H, note: "FAQs" };

  // Row 5
  const f_help: Frame = { id: "cloth_help_center", name: "#26 HelpCenter", x: STRIDE_X * 0, y: STRIDE_Y * 5, w: FRAME_W, h: FRAME_H, note: "Help center" };
  const f_service: Frame = { id: "cloth_customer_service", name: "#27 CustomerService", x: STRIDE_X * 1, y: STRIDE_Y * 5, w: FRAME_W, h: FRAME_H, note: "Live chat" };

  frames.push(
    f_splash, f_onboarding, f_signup, f_login, f_forgot,
    f_verify, f_reset, f_home, f_search, f_saved,
    f_detail, f_reviews, f_cart, f_checkout, f_address,
    f_new_addr, f_payment, f_new_card, f_account, f_orders,
    f_track, f_my_details, f_notifs, f_notif_settings, f_faqs,
    f_help, f_service
  );

  // ==========================================================================
  // SCREEN 1: Splash
  // ==========================================================================
  addGroup(f_splash, 0, 0, "y", [
    { id: uid(), kind: "box", label: "", icon: null, variant: "filled", fill: "primary", size: 412, size2: 892 },
  ]);
  addGroup(f_splash, 156, 340, "y", [
    { id: uid(), kind: "card", label: "", icon: "add", variant: "filled", fill: "surface", size: 100, size2: 100, radiusTop: 28, radiusBottom: 28, contentAlign: "center", textAlign: "center" },
    { id: uid(), kind: "text", label: "DEFINE ATELIER", icon: null, variant: "filled", font: 20, bold: true, textColor: "inversePrimary", textAlign: "center", size: 100 },
  ]);
  addGroup(f_splash, 188, 520, "x", [
    { id: uid(), kind: "circularProgress", label: "", icon: null, variant: "filled", size: 36 },
  ]);

  // ==========================================================================
  // SCREEN 2: Onboarding
  // ==========================================================================
  addGroup(f_onboarding, 24, 48, "y", [
    { id: uid(), kind: "text", label: "Define", icon: null, variant: "filled", font: 32, bold: true, size: 364 },
    { id: uid(), kind: "card", label: "", icon: null, variant: "filled", src: FASHION_IMGS.hero, imagePos: "background", size: 364, size2: 560, radiusTop: 24, radiusBottom: 24 },
    { id: uid(), kind: "button", label: "Get Started  ➔", icon: null, icon2: "arrow_forward", variant: "filled", size: 364, size2: 54 },
    { id: uid(), kind: "text", label: "● ○ ○", icon: null, variant: "filled", font: 14, textColor: "outline", textAlign: "center", size: 364 },
  ]);

  // ==========================================================================
  // SCREEN 3: SignUp
  // ==========================================================================
  addGroup(f_signup, 24, 48, "y", [
    { id: uid(), kind: "text", label: "Create an account", icon: null, variant: "filled", font: 26, bold: true, size: 364 },
    { id: uid(), kind: "text", label: "Let's create your account.", icon: null, variant: "filled", font: 14, textColor: "onSurfaceVariant", size: 364 },
    { id: uid(), kind: "textField", label: "Full Name", placeholder: "Enter your full name", icon: null, variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "Email", placeholder: "Enter your email address", icon: null, variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "Password", placeholder: "Enter your password", icon: null, icon2: "visibility_off", variant: "outlined", size: 364 },
    { id: uid(), kind: "text", label: "By signing up you agree to our Terms, Privacy Policy, and Cookie Use", icon: null, variant: "filled", font: 12, textColor: "onSurfaceVariant", size: 364 },
    { id: uid(), kind: "button", label: "Create an Account", icon: null, variant: "filled", size: 364, size2: 50 },
    { id: uid(), kind: "text", label: "───  Or  ───", icon: null, variant: "filled", textColor: "outline", textAlign: "center", size: 364 },
    { id: uid(), kind: "button", label: "Sign Up with Google", icon: "g_mobiledata", variant: "outlined", size: 364, size2: 50 },
  ]);

  // ==========================================================================
  // SCREEN 4: Login
  // ==========================================================================
  addGroup(f_login, 24, 56, "y", [
    { id: uid(), kind: "text", label: "Login to your account", icon: null, variant: "filled", font: 26, bold: true, size: 364 },
    { id: uid(), kind: "text", label: "It's great to see you again.", icon: null, variant: "filled", font: 14, textColor: "onSurfaceVariant", size: 364 },
    { id: uid(), kind: "textField", label: "Email", placeholder: "Enter your email address", icon: null, variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "Password", placeholder: "Enter your password", icon: null, icon2: "visibility_off", variant: "outlined", size: 364 },
    { id: uid(), kind: "text", label: "Forgot your password? Reset your password", icon: null, variant: "filled", font: 13, textColor: "primary", size: 364 },
    { id: uid(), kind: "button", label: "Login", icon: null, variant: "filled", size: 364, size2: 50 },
    { id: uid(), kind: "text", label: "───  Or  ───", icon: null, variant: "filled", textColor: "outline", textAlign: "center", size: 364 },
    { id: uid(), kind: "button", label: "Login with Google", icon: "g_mobiledata", variant: "outlined", size: 364, size2: 50 },
    { id: uid(), kind: "button", label: "Login with Facebook", icon: "facebook", variant: "filled", fill: "primary", size: 364, size2: 50 },
  ]);

  // ==========================================================================
  // SCREEN 5: ForgotPassword
  // ==========================================================================
  addGroup(f_forgot, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "", icon: "arrow_back", variant: "filled", size: 412 },
  ]);
  addGroup(f_forgot, 24, 112, "y", [
    { id: uid(), kind: "text", label: "Forgot password", icon: null, variant: "filled", font: 26, bold: true, size: 364 },
    { id: uid(), kind: "text", label: "Enter your email for the verification process. We will send 4 digits code to your email.", icon: null, variant: "filled", font: 14, textColor: "onSurfaceVariant", size: 364 },
    { id: uid(), kind: "textField", label: "Email", placeholder: "cody.fisher45@example.com", icon: null, variant: "outlined", size: 364 },
    { id: uid(), kind: "button", label: "Send Code", icon: null, variant: "filled", size: 364, size2: 50 },
  ]);

  // ==========================================================================
  // SCREEN 6: VerificationCode
  // ==========================================================================
  addGroup(f_verify, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "", icon: "arrow_back", variant: "filled", size: 412 },
  ]);
  addGroup(f_verify, 24, 112, "y", [
    { id: uid(), kind: "text", label: "Enter 4 Digit Code", icon: null, variant: "filled", font: 26, bold: true, size: 364 },
    { id: uid(), kind: "text", label: "Enter 4 digits code that you receive on your email (cody.fisher45@example.com)", icon: null, variant: "filled", font: 14, textColor: "onSurfaceVariant", size: 364 },
  ]);
  addGroup(f_verify, 24, 240, "x", [
    { id: uid(), kind: "card", label: "1", icon: null, variant: "outlined", font: 24, bold: true, size: 80, size2: 64, contentAlign: "center", textAlign: "center" },
    { id: uid(), kind: "card", label: "4", icon: null, variant: "outlined", font: 24, bold: true, size: 80, size2: 64, contentAlign: "center", textAlign: "center" },
    { id: uid(), kind: "card", label: "2", icon: null, variant: "outlined", font: 24, bold: true, size: 80, size2: 64, contentAlign: "center", textAlign: "center" },
    { id: uid(), kind: "card", label: "0", icon: null, variant: "outlined", font: 24, bold: true, size: 80, size2: 64, contentAlign: "center", textAlign: "center" },
  ]);
  addGroup(f_verify, 24, 330, "y", [
    { id: uid(), kind: "text", label: "Email not received? Resend code", icon: null, variant: "filled", font: 13, textColor: "onSurfaceVariant", textAlign: "center", size: 364 },
    { id: uid(), kind: "button", label: "Continue", icon: null, variant: "filled", size: 364, size2: 50 },
  ]);

  // ==========================================================================
  // SCREEN 7: ResetPassword
  // ==========================================================================
  addGroup(f_reset, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "", icon: "arrow_back", variant: "filled", size: 412 },
  ]);
  addGroup(f_reset, 24, 112, "y", [
    { id: uid(), kind: "text", label: "Reset Password", icon: null, variant: "filled", font: 26, bold: true, size: 364 },
    { id: uid(), kind: "text", label: "Set the new password for your account so you can login and access all the features.", icon: null, variant: "filled", font: 14, textColor: "onSurfaceVariant", size: 364 },
    { id: uid(), kind: "textField", label: "Password", placeholder: "••••••••••••", icon: null, icon2: "visibility_off", variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "Confirm Password", placeholder: "••••••••••••", icon: null, icon2: "visibility_off", variant: "outlined", size: 364 },
    { id: uid(), kind: "button", label: "Continue", icon: null, variant: "filled", size: 364, size2: 50 },
  ]);

  // ==========================================================================
  // SCREEN 8: Homepage (Discover)
  // ==========================================================================
  addGroup(f_home, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Discover", icon: null, icon2: "search", icon3: "notifications", font: 28, bold: true, variant: "filled", size: 412 },
  ]);
  addGroup(f_home, 24, 112, "y", [
    { id: uid(), kind: "searchBar", label: "Search for clothes...", icon: "search", icon3: "tune", variant: "filled", size: 364 },
  ]);
  addGroup(f_home, 24, 180, "x", [
    { id: uid(), kind: "chip", label: "All", icon: null, variant: "filled", checked: true, size: 76 },
    { id: uid(), kind: "chip", label: "T-Shirts", icon: null, variant: "outlined", size: 90 },
    { id: uid(), kind: "chip", label: "Jeans", icon: null, variant: "outlined", size: 84 },
    { id: uid(), kind: "chip", label: "Shoes", icon: null, variant: "outlined", size: 86 },
  ]);
  addGroup(f_home, 20, 232, "x", [
    { id: uid(), kind: "card", label: "Regular Fit Slogan", supporting: "$1,190", icon: null, icon2: "favorite_border", variant: "filled", src: FASHION_IMGS.navyTee, imagePos: "top", imageSize: 185, size: 184, size2: 270 },
    { id: uid(), kind: "card", label: "Regular Fit Polo", supporting: "$1,100", badge: "-52%", icon: null, icon2: "favorite_border", variant: "filled", src: FASHION_IMGS.tealPolo, imagePos: "top", imageSize: 185, size: 184, size2: 270 },
  ]);
  addGroup(f_home, 20, 516, "x", [
    { id: uid(), kind: "card", label: "Regular Fit Black", supporting: "$1,690", icon: null, icon2: "favorite_border", variant: "filled", src: FASHION_IMGS.blackTee, imagePos: "top", imageSize: 185, size: 184, size2: 270 },
    { id: uid(), kind: "card", label: "Regular Fit V-Neck", supporting: "$1,290", icon: null, icon2: "favorite_border", variant: "filled", src: FASHION_IMGS.vneckTee, imagePos: "top", imageSize: 185, size: 184, size2: 270 },
  ]);
  addGroup(f_home, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 0 },
  ]);

  // ==========================================================================
  // SCREEN 9: Search
  // ==========================================================================
  addGroup(f_search, 24, 44, "y", [
    { id: uid(), kind: "searchBar", label: "Search for clothes...", icon: "search", icon3: "tune", variant: "filled", size: 364 },
  ]);
  addGroup(f_search, 24, 116, "x", [
    { id: uid(), kind: "text", label: "Recent Searches", icon: null, variant: "filled", font: 16, bold: true, size: 260 },
    { id: uid(), kind: "text", label: "Clear all", icon: null, variant: "filled", font: 13, textColor: "onSurfaceVariant", textAlign: "end", size: 88 },
  ]);
  addGroup(f_search, 12, 154, "y", [
    { id: uid(), kind: "listItem", label: "Jeans", icon: "schedule", icon2: "close", variant: "filled", size: 388 },
    { id: uid(), kind: "listItem", label: "Casual clothes", icon: "schedule", icon2: "close", variant: "filled", size: 388 },
    { id: uid(), kind: "listItem", label: "Hoodie", icon: "schedule", icon2: "close", variant: "filled", size: 388 },
    { id: uid(), kind: "listItem", label: "Nike shoes black", icon: "schedule", icon2: "close", variant: "filled", size: 388 },
    { id: uid(), kind: "listItem", label: "V-neck tshirt", icon: "schedule", icon2: "close", variant: "filled", size: 388 },
    { id: uid(), kind: "listItem", label: "Winter clothes", icon: "schedule", icon2: "close", variant: "filled", size: 388 },
  ]);
  addGroup(f_search, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 1 },
  ]);

  // ==========================================================================
  // SCREEN 10: SavedItems (Wishlist)
  // ==========================================================================
  addGroup(f_saved, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Saved Items", icon: "arrow_back", icon2: "shopping_bag", variant: "filled", size: 412 },
  ]);
  addGroup(f_saved, 20, 112, "x", [
    { id: uid(), kind: "card", label: "Regular Fit Slogan", supporting: "$1,190", icon: null, icon2: "favorite", icon2Fill: true, variant: "filled", src: FASHION_IMGS.navyTee, imagePos: "top", imageSize: 185, size: 184, size2: 270 },
    { id: uid(), kind: "card", label: "Regular Fit Polo", supporting: "$1,100", icon: null, icon2: "favorite", icon2Fill: true, variant: "filled", src: FASHION_IMGS.tealPolo, imagePos: "top", imageSize: 185, size: 184, size2: 270 },
  ]);
  addGroup(f_saved, 20, 396, "x", [
    { id: uid(), kind: "card", label: "Regular Fit Black", supporting: "$1,690", icon: null, icon2: "favorite", icon2Fill: true, variant: "filled", src: FASHION_IMGS.blackTee, imagePos: "top", imageSize: 185, size: 184, size2: 270 },
    { id: uid(), kind: "card", label: "Regular Fit V-Neck", supporting: "$1,290", icon: null, icon2: "favorite", icon2Fill: true, variant: "filled", src: FASHION_IMGS.vneckTee, imagePos: "top", imageSize: 185, size: 184, size2: 270 },
  ]);
  addGroup(f_saved, 20, 680, "x", [
    { id: uid(), kind: "card", label: "Regular Fit Pink", supporting: "$1,341", icon: null, icon2: "favorite", icon2Fill: true, variant: "filled", src: FASHION_IMGS.pinkThermal, imagePos: "top", imageSize: 68, size: 184, size2: 116 },
    { id: uid(), kind: "card", label: "Selvedge Jeans", supporting: "$1,540", icon: null, icon2: "favorite", icon2Fill: true, variant: "filled", src: FASHION_IMGS.blackTee, imagePos: "top", imageSize: 68, size: 184, size2: 116 },
  ]);
  addGroup(f_saved, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 2 },
  ]);

  // ==========================================================================
  // SCREEN 11: ProductDetails
  // ==========================================================================
  addGroup(f_detail, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Details", icon: "arrow_back", icon2: "favorite_border", variant: "filled", size: 412 },
  ]);
  addGroup(f_detail, 24, 112, "y", [
    { id: uid(), kind: "card", label: "", icon: null, icon2: "favorite", icon2Fill: true, variant: "filled", src: FASHION_IMGS.navyTee, imagePos: "background", radiusTop: 24, radiusBottom: 24, size: 364, size2: 360 },
    { id: uid(), kind: "text", label: "Regular Fit Slogan", icon: null, variant: "filled", font: 22, bold: true, size: 364 },
    { id: uid(), kind: "text", label: "★ 4.0/5  (45 reviews)", icon: null, variant: "filled", font: 14, textColor: "primary", size: 364 },
    { id: uid(), kind: "text", label: "The name says it all, the right size slightly snugs the body leaving enough room for comfort in the sleeves and waist.", icon: null, variant: "filled", font: 13, textColor: "onSurfaceVariant", size: 364 },
    { id: uid(), kind: "text", label: "Choose size", icon: null, variant: "filled", font: 15, bold: true, size: 364 },
  ]);
  addGroup(f_detail, 24, 642, "x", [
    { id: uid(), kind: "chip", label: "S", icon: null, variant: "outlined", size: 52 },
    { id: uid(), kind: "chip", label: "M", icon: null, variant: "filled", checked: true, size: 52 },
    { id: uid(), kind: "chip", label: "L", icon: null, variant: "outlined", size: 52 },
    { id: uid(), kind: "chip", label: "XL", icon: null, variant: "outlined", size: 52 },
    { id: uid(), kind: "chip", label: "XXL", icon: null, variant: "outlined", size: 56 },
  ]);
  addGroup(f_detail, 24, 720, "x", [
    { id: uid(), kind: "text", label: "$1,190", icon: null, variant: "filled", font: 24, bold: true, size: 140 },
    { id: uid(), kind: "button", label: "Add to Bag", icon: "shopping_bag", variant: "filled", size: 208, size2: 52 },
  ]);

  // ==========================================================================
  // SCREEN 12: Reviews
  // ==========================================================================
  addGroup(f_reviews, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Reviews", icon: "arrow_back", icon2: "share", variant: "filled", size: 412 },
  ]);
  addGroup(f_reviews, 24, 112, "y", [
    { id: uid(), kind: "card", label: "4.0   ★★★★☆", supporting: "Based on 1,034 verified customer ratings", icon: null, variant: "filled", font: 28, bold: true, size: 364, size2: 78 },
    { id: uid(), kind: "linearProgress", label: "5 ★  78%", icon: null, variant: "filled", value: 78, size: 364 },
    { id: uid(), kind: "linearProgress", label: "4 ★  52%", icon: null, variant: "filled", value: 52, size: 364 },
    { id: uid(), kind: "linearProgress", label: "3 ★  24%", icon: null, variant: "filled", value: 24, size: 364 },
    { id: uid(), kind: "linearProgress", label: "2 ★  11%", icon: null, variant: "filled", value: 11, size: 364 },
    { id: uid(), kind: "linearProgress", label: "1 ★  4%", icon: null, variant: "filled", value: 4, size: 364 },
    { id: uid(), kind: "divider", label: "", icon: null, variant: "filled", size: 364 },
  ]);
  addGroup(f_reviews, 24, 304, "x", [
    { id: uid(), kind: "text", label: "45 Reviews", icon: null, variant: "filled", font: 16, bold: true, size: 200 },
    { id: uid(), kind: "chip", label: "Most Relevant ▾", icon: null, variant: "outlined", size: 128 },
  ]);
  addGroup(f_reviews, 24, 342, "y", [
    { id: uid(), kind: "card", label: "★★★★★   Wade Warren", supporting: '"The item is very good, my son likes it very much and plays every day." • 6 days ago', icon: null, variant: "outlined", font: 14, bold: true, size: 364, size2: 96 },
    { id: uid(), kind: "card", label: "★★★★☆   Guy Hawkins", supporting: '"The seller is very fast in sending packet, I just bought it and the item arrived in just 1 day!" • 1 week ago', icon: null, variant: "outlined", font: 14, bold: true, size: 364, size2: 96 },
    { id: uid(), kind: "card", label: "★★★★☆   Robert Fox", supporting: '"I just bought it and the stuff is really good! I highly recommend it!" • 2 weeks ago', icon: null, variant: "outlined", font: 14, bold: true, size: 364, size2: 96 },
    { id: uid(), kind: "card", label: "★★★★★   Kristin Watson", supporting: '"Exceptional quality heavyweight cotton. Fits true to size with crisp silhouette." • 3 weeks ago', icon: null, variant: "outlined", font: 14, bold: true, size: 364, size2: 96 },
    { id: uid(), kind: "button", label: "Write a Review", icon: "rate_review", variant: "filled", size: 364, size2: 48 },
  ]);

  // ==========================================================================
  // SCREEN 13: MyCart
  // ==========================================================================
  addGroup(f_cart, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "My Cart", icon: "arrow_back", icon2: "delete", variant: "filled", size: 412 },
  ]);
  addGroup(f_cart, 24, 112, "y", [
    { id: uid(), kind: "card", label: "Regular Fit Slogan", supporting: "Size M • $1,190   [- 2 +]", icon: null, icon2: "delete_outline", variant: "filled", src: FASHION_IMGS.navyTee, imagePos: "leading", imageSize: 80, size: 364, size2: 94 },
    { id: uid(), kind: "card", label: "Regular Fit Polo", supporting: "Size M • $1,100   [- 1 +]", icon: null, icon2: "delete_outline", variant: "filled", src: FASHION_IMGS.tealPolo, imagePos: "leading", imageSize: 80, size: 364, size2: 94 },
    { id: uid(), kind: "card", label: "Regular Fit Black", supporting: "Size L • $1,290   [- 1 +]", icon: null, icon2: "delete_outline", variant: "filled", src: FASHION_IMGS.blackTee, imagePos: "leading", imageSize: 80, size: 364, size2: 94 },
    { id: uid(), kind: "card", label: "Sub-total: $5,870   |   VAT: $0.00", supporting: "Shipping fee: $80 • Total: $5,950", icon: null, variant: "outlined", font: 15, bold: true, size: 364, size2: 118 },
    { id: uid(), kind: "button", label: "Go To Checkout  ➔", icon: null, icon2: "arrow_forward", variant: "filled", size: 364, size2: 52 },
  ]);
  addGroup(f_cart, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 3 },
  ]);

  // ==========================================================================
  // SCREEN 14: Checkout
  // ==========================================================================
  addGroup(f_checkout, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Checkout", icon: "arrow_back", icon2: "more_vert", variant: "filled", size: 412 },
  ]);
  addGroup(f_checkout, 24, 112, "x", [
    { id: uid(), kind: "text", label: "Delivery Address", icon: null, variant: "filled", font: 16, bold: true, size: 260 },
    { id: uid(), kind: "text", label: "Change", icon: null, variant: "filled", font: 13, textColor: "primary", textAlign: "end", size: 88 },
  ]);
  addGroup(f_checkout, 24, 140, "y", [
    { id: uid(), kind: "card", label: "Home", supporting: "925 S Chugach St #APT 10, Alaska 99645", icon: "location_on", imagePos: "leading", imageSize: 36, variant: "filled", size: 364, size2: 76 },
    { id: uid(), kind: "text", label: "Payment Method", icon: null, variant: "filled", font: 16, bold: true, size: 364 },
  ]);
  addGroup(f_checkout, 24, 254, "x", [
    { id: uid(), kind: "chip", label: "💳 Card", icon: null, variant: "filled", checked: true, size: 108 },
    { id: uid(), kind: "chip", label: "💵 Cash", icon: null, variant: "outlined", size: 108 },
    { id: uid(), kind: "chip", label: "📱 Apple Pay", icon: null, variant: "outlined", size: 108 },
  ]);
  addGroup(f_checkout, 24, 298, "y", [
    { id: uid(), kind: "card", label: "VISA   •••••••• 2512", supporting: "Expires 07/23", icon: "credit_card", imagePos: "leading", imageSize: 36, icon2: "radio_button_checked", variant: "outlined", size: 364, size2: 66 },
    { id: uid(), kind: "text", label: "Order Summary", icon: null, variant: "filled", font: 16, bold: true, size: 364 },
    { id: uid(), kind: "card", label: "Sub-total: $5,870   |   VAT: $0.00", supporting: "Shipping fee: $80 • Order Total: $5,950", icon: null, variant: "filled", font: 15, bold: true, size: 364, size2: 110 },
  ]);
  addGroup(f_checkout, 24, 526, "x", [
    { id: uid(), kind: "textField", label: "Promo Code", placeholder: "Enter promo code", icon: null, variant: "outlined", size: 268 },
    { id: uid(), kind: "button", label: "Add", icon: null, variant: "filled", size: 84, size2: 56 },
  ]);
  addGroup(f_checkout, 24, 600, "y", [
    { id: uid(), kind: "button", label: "Place Order", icon: null, variant: "filled", size: 364, size2: 52 },
  ]);

  // ==========================================================================
  // SCREEN 15: Address
  // ==========================================================================
  addGroup(f_address, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Address", icon: "arrow_back", icon2: "add", variant: "filled", size: 412 },
  ]);
  addGroup(f_address, 24, 112, "y", [
    { id: uid(), kind: "text", label: "Saved Address", icon: null, variant: "filled", font: 16, bold: true, size: 364 },
    { id: uid(), kind: "card", label: "Home", badge: "Default", supporting: "925 S Chugach St #APT 10, Alaska 99645", icon: "location_on", imagePos: "leading", imageSize: 36, icon2: "radio_button_checked", variant: "filled", size: 364, size2: 84 },
    { id: uid(), kind: "card", label: "Office", supporting: "2438 6th Ave, Ketchikan, Alaska 99901", icon: "location_on", imagePos: "leading", imageSize: 36, icon2: "radio_button_unchecked", variant: "outlined", size: 364, size2: 84 },
    { id: uid(), kind: "card", label: "Apartment", supporting: "2551 Vista Dr #B301, Juneau, Alaska 99801", icon: "location_on", imagePos: "leading", imageSize: 36, icon2: "radio_button_unchecked", variant: "outlined", size: 364, size2: 84 },
    { id: uid(), kind: "card", label: "Parent's House", supporting: "4821 Ridge Top Cir, Anchorage, Alaska 99508", icon: "location_on", imagePos: "leading", imageSize: 36, icon2: "radio_button_unchecked", variant: "outlined", size: 364, size2: 84 },
    { id: uid(), kind: "button", label: "+ Add New Address", icon: "add", variant: "outlined", size: 364, size2: 50 },
    { id: uid(), kind: "button", label: "Apply", icon: null, variant: "filled", size: 364, size2: 52 },
  ]);

  // ==========================================================================
  // SCREEN 16: NewAddress
  // ==========================================================================
  addGroup(f_new_addr, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "New Address", icon: "arrow_back", icon2: "help_outline", variant: "filled", size: 412 },
  ]);
  addGroup(f_new_addr, 24, 112, "y", [
    { id: uid(), kind: "card", label: "📍 Campbell St Pin", supporting: "Drag map or tap pin to calibrate GPS delivery location", icon: "map", imagePos: "leading", imageSize: 44, variant: "filled", size: 364, size2: 230 },
    { id: uid(), kind: "card", label: "Address Details", supporting: "Fill in delivery details below", icon: null, icon2: "close", variant: "outlined", font: 17, bold: true, size: 364, size2: 56 },
    { id: uid(), kind: "select", label: "Address Nickname", placeholder: "Home", icon: null, variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "Full Address", placeholder: "Enter your full address...", icon: null, variant: "outlined", size: 364 },
    { id: uid(), kind: "checkbox", label: "Make this as default address", icon: null, variant: "filled", checked: true, size: 364 },
    { id: uid(), kind: "button", label: "Apply", icon: null, variant: "filled", size: 364, size2: 50 },
  ]);

  // ==========================================================================
  // SCREEN 17: PaymentMethod
  // ==========================================================================
  addGroup(f_payment, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Payment Method", icon: "arrow_back", icon2: "help_outline", variant: "filled", size: 412 },
  ]);
  addGroup(f_payment, 24, 112, "y", [
    { id: uid(), kind: "text", label: "Saved Cards", icon: null, variant: "filled", font: 16, bold: true, size: 364 },
    { id: uid(), kind: "card", label: "VISA   •••• •••• •••• 2512", badge: "Default", supporting: "Expires 07/23", icon: "credit_card", imagePos: "leading", imageSize: 36, icon2: "radio_button_checked", variant: "filled", size: 364, size2: 80 },
    { id: uid(), kind: "card", label: "MasterCard   •••• •••• •••• 3421", supporting: "Expires 11/25", icon: "credit_card", imagePos: "leading", imageSize: 36, icon2: "radio_button_unchecked", variant: "outlined", size: 364, size2: 80 },
    { id: uid(), kind: "card", label: "VISA   •••• •••• •••• 2512", supporting: "Expires 09/26", icon: "credit_card", imagePos: "leading", imageSize: 36, icon2: "radio_button_unchecked", variant: "outlined", size: 364, size2: 80 },
    { id: uid(), kind: "button", label: "+ Add New Card", icon: "add", variant: "outlined", size: 364, size2: 50 },
    { id: uid(), kind: "button", label: "Apply", icon: null, variant: "filled", size: 364, size2: 52 },
  ]);

  // ==========================================================================
  // SCREEN 18: NewCard
  // ==========================================================================
  addGroup(f_new_card, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "New Card", icon: "arrow_back", icon2: "help_outline", variant: "filled", size: 412 },
  ]);
  addGroup(f_new_card, 24, 112, "y", [
    { id: uid(), kind: "text", label: "Add Debit or Credit Card", icon: null, variant: "filled", font: 17, bold: true, size: 364 },
    { id: uid(), kind: "textField", label: "Card number", placeholder: "Enter your card number", icon: null, variant: "outlined", size: 364 },
  ]);
  addGroup(f_new_card, 24, 244, "x", [
    { id: uid(), kind: "textField", label: "Expiry Date", placeholder: "MM/YY", icon: null, variant: "outlined", size: 174 },
    { id: uid(), kind: "textField", label: "Security Code", placeholder: "CVC", icon: null, icon2: "help_outline", variant: "outlined", size: 174 },
  ]);
  addGroup(f_new_card, 24, 350, "y", [
    { id: uid(), kind: "button", label: "Add Card", icon: null, variant: "filled", size: 364, size2: 52 },
  ]);

  // ==========================================================================
  // SCREEN 19: Account
  // ==========================================================================
  addGroup(f_account, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Account", icon: "arrow_back", icon2: "settings", variant: "filled", size: 412 },
  ]);
  addGroup(f_account, 12, 112, "y", [
    { id: uid(), kind: "listItem", label: "My Orders", icon: "inventory_2", icon2: "chevron_right", variant: "filled", size: 388 },
    { id: uid(), kind: "divider", label: "", icon: null, variant: "filled", size: 364 },
    { id: uid(), kind: "listItem", label: "My Details", icon: "person", icon2: "chevron_right", variant: "filled", size: 388 },
    { id: uid(), kind: "listItem", label: "Address Book", icon: "location_on", icon2: "chevron_right", variant: "filled", size: 388 },
    { id: uid(), kind: "listItem", label: "Payment Methods", icon: "credit_card", icon2: "chevron_right", variant: "filled", size: 388 },
    { id: uid(), kind: "listItem", label: "Notifications", icon: "notifications", icon2: "chevron_right", variant: "filled", size: 388 },
    { id: uid(), kind: "listItem", label: "Appearance (Light Mode)", icon: "light_mode", icon2: "chevron_right", variant: "filled", size: 388 },
    { id: uid(), kind: "divider", label: "", icon: null, variant: "filled", size: 364 },
    { id: uid(), kind: "listItem", label: "FAQs", icon: "help_outline", icon2: "chevron_right", variant: "filled", size: 388 },
    { id: uid(), kind: "listItem", label: "Help Center", icon: "headset_mic", icon2: "chevron_right", variant: "filled", size: 388 },
    { id: uid(), kind: "divider", label: "", icon: null, variant: "filled", size: 364 },
    { id: uid(), kind: "listItem", label: "Logout", icon: "logout", textColor: "error", variant: "filled", size: 388 },
  ]);
  addGroup(f_account, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 4 },
  ]);

  // ==========================================================================
  // SCREEN 20: MyOrders
  // ==========================================================================
  addGroup(f_orders, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "My Orders", icon: "arrow_back", icon2: "search", variant: "filled", size: 412 },
  ]);
  addGroup(f_orders, 24, 112, "x", [
    { id: uid(), kind: "chip", label: "Ongoing", icon: null, variant: "filled", checked: true, size: 174 },
    { id: uid(), kind: "chip", label: "Completed", icon: null, variant: "outlined", size: 174 },
  ]);
  addGroup(f_orders, 24, 174, "y", [
    { id: uid(), kind: "card", label: "Regular Fit Slogan", supporting: "Size M • $1,190", badge: "Track Order", icon: null, src: FASHION_IMGS.navyTee, imagePos: "leading", imageSize: 84, variant: "filled", size: 364, size2: 104 },
    { id: uid(), kind: "card", label: "Regular Fit Polo", supporting: "Size L • $1,100", badge: "Track Order", icon: null, src: FASHION_IMGS.tealPolo, imagePos: "leading", imageSize: 84, variant: "filled", size: 364, size2: 104 },
    { id: uid(), kind: "card", label: "Regular Fit Black", supporting: "Size L • $1,690", badge: "Track Order", icon: null, src: FASHION_IMGS.blackTee, imagePos: "leading", imageSize: 84, variant: "filled", size: 364, size2: 104 },
    { id: uid(), kind: "card", label: "Regular Fit V-Neck", supporting: "Size S • $1,290", badge: "Track Order", icon: null, src: FASHION_IMGS.vneckTee, imagePos: "leading", imageSize: 84, variant: "filled", size: 364, size2: 104 },
  ]);
  addGroup(f_orders, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 4 },
  ]);

  // ==========================================================================
  // SCREEN 21: TrackOrder
  // ==========================================================================
  addGroup(f_track, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Track Order", icon: "arrow_back", icon2: "more_vert", variant: "filled", size: 412 },
  ]);
  addGroup(f_track, 24, 112, "y", [
    { id: uid(), kind: "card", label: "🚛 Live Courier Radar", supporting: "Driver 12 min away on 2nd Ave", icon: "local_shipping", imagePos: "leading", imageSize: 44, variant: "filled", size: 364, size2: 240 },
    { id: uid(), kind: "card", label: "Order Status", supporting: "Order #AT-9042 • Live GPS", icon: null, icon2: "close", variant: "outlined", font: 16, bold: true, size: 364, size2: 54 },
  ]);
  addGroup(f_track, 12, 434, "y", [
    { id: uid(), kind: "listItem", label: "● Packing (Completed)", supporting: "2331 Jack Warner Rd, Dela Laurent, Alaska", icon: "inventory_2", variant: "filled", size: 388 },
    { id: uid(), kind: "listItem", label: "● Picked (Completed)", supporting: "247 Tongass Ave #111, Ketchikan, Alaska", icon: "check_circle", variant: "filled", size: 388 },
    { id: uid(), kind: "listItem", label: "● In Transit (Live Now)", supporting: "1015 E. 2nd Ave, Anchorage, Alaska", icon: "local_shipping", variant: "filled", size: 388 },
    { id: uid(), kind: "listItem", label: "○ Delivered (Estimated 4:30 PM)", supporting: "925 S Chugach St #APT 10, Alaska 99645", icon: "home", variant: "filled", size: 388 },
  ]);

  // ==========================================================================
  // SCREEN 22: MyDetails
  // ==========================================================================
  addGroup(f_my_details, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "My Details", icon: "arrow_back", icon2: "edit", variant: "filled", size: 412 },
  ]);
  addGroup(f_my_details, 24, 112, "y", [
    { id: uid(), kind: "textField", label: "Full Name", placeholder: "Cody Fisher", icon: null, variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "Email Address", placeholder: "cody.fisher45@example.com", icon: null, variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "Date of Birth", placeholder: "12/01/1990", icon: null, icon2: "calendar_today", variant: "outlined", size: 364 },
    { id: uid(), kind: "select", label: "Gender", placeholder: "Male", icon: null, variant: "outlined", size: 364 },
    { id: uid(), kind: "textField", label: "Phone Number", placeholder: "US +1 234 456 231 108", icon: null, variant: "outlined", size: 364 },
    { id: uid(), kind: "button", label: "Submit", icon: null, variant: "filled", size: 364, size2: 50 },
  ]);
  addGroup(f_my_details, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 4 },
  ]);

  // ==========================================================================
  // SCREEN 23: Notifications
  // ==========================================================================
  addGroup(f_notifs, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Notifications", icon: "arrow_back", icon2: "more_vert", variant: "filled", size: 412 },
  ]);
  addGroup(f_notifs, 24, 112, "y", [
    { id: uid(), kind: "text", label: "Today", icon: null, variant: "filled", font: 16, bold: true, size: 364 },
    { id: uid(), kind: "card", label: "30% Special Discount!", supporting: "Special promotion only valid today.", icon: "local_offer", imagePos: "leading", imageSize: 36, variant: "filled", size: 364, size2: 74 },
    { id: uid(), kind: "text", label: "Yesterday", icon: null, variant: "filled", font: 16, bold: true, size: 364 },
    { id: uid(), kind: "card", label: "Top Up E-wallet Successfully!", supporting: "You have top up your e-wallet.", icon: "account_balance_wallet", imagePos: "leading", imageSize: 36, variant: "outlined", size: 364, size2: 74 },
    { id: uid(), kind: "card", label: "New Service Available!", supporting: "Now you can track order in real-time.", icon: "location_on", imagePos: "leading", imageSize: 36, variant: "outlined", size: 364, size2: 74 },
    { id: uid(), kind: "text", label: "June 7, 2023", icon: null, variant: "filled", font: 16, bold: true, size: 364 },
    { id: uid(), kind: "card", label: "Credit Card Connected!", supporting: "Credit card has been linked.", icon: "credit_card", imagePos: "leading", imageSize: 36, variant: "outlined", size: 364, size2: 74 },
    { id: uid(), kind: "card", label: "Account Setup Successfully!", supporting: "Your account has been created.", icon: "person", imagePos: "leading", imageSize: 36, variant: "outlined", size: 364, size2: 74 },
  ]);
  addGroup(f_notifs, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 4 },
  ]);

  // ==========================================================================
  // SCREEN 24: NotificationSettings
  // ==========================================================================
  addGroup(f_notif_settings, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Notifications", icon: "arrow_back", icon2: "more_vert", variant: "filled", size: 412 },
  ]);
  addGroup(f_notif_settings, 24, 112, "y", [
    { id: uid(), kind: "switch", label: "General Notifications", icon: null, variant: "filled", checked: true, size: 364 },
    { id: uid(), kind: "switch", label: "Sound", icon: null, variant: "filled", checked: true, size: 364 },
    { id: uid(), kind: "switch", label: "Vibrate", icon: null, variant: "filled", checked: false, size: 364 },
    { id: uid(), kind: "switch", label: "Special Offers", icon: null, variant: "filled", checked: true, size: 364 },
    { id: uid(), kind: "switch", label: "Promo & Discounts", icon: null, variant: "filled", checked: false, size: 364 },
    { id: uid(), kind: "switch", label: "Payments", icon: null, variant: "filled", checked: true, size: 364 },
    { id: uid(), kind: "switch", label: "Cashback", icon: null, variant: "filled", checked: true, size: 364 },
    { id: uid(), kind: "switch", label: "App Updates", icon: null, variant: "filled", checked: false, size: 364 },
    { id: uid(), kind: "switch", label: "New Service Available", icon: null, variant: "filled", checked: true, size: 364 },
    { id: uid(), kind: "switch", label: "New Tips Available", icon: null, variant: "filled", checked: false, size: 364 },
  ]);
  addGroup(f_notif_settings, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 4 },
  ]);

  // ==========================================================================
  // SCREEN 25: FAQs
  // ==========================================================================
  addGroup(f_faqs, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "FAQs", icon: "arrow_back", icon2: "search", variant: "filled", size: 412 },
  ]);
  addGroup(f_faqs, 24, 112, "x", [
    { id: uid(), kind: "chip", label: "General", icon: null, variant: "filled", checked: true, size: 108 },
    { id: uid(), kind: "chip", label: "Account", icon: null, variant: "outlined", size: 108 },
    { id: uid(), kind: "chip", label: "Service", icon: null, variant: "outlined", size: 108 },
  ]);
  addGroup(f_faqs, 24, 168, "y", [
    { id: uid(), kind: "searchBar", label: "Search for questions...", icon: "search", icon3: "mic", variant: "filled", size: 364 },
    { id: uid(), kind: "card", label: "How do I make a purchase?", supporting: "When you find a product you want to purchase, tap on it to view the product details. Check the price, description, and available options (if applicable), and then tap the 'Add to Cart' button. Follow the on-screen instructions to complete the purchase, including providing shipping details and payment information.", icon: null, icon2: "expand_less", variant: "outlined", font: 15, bold: true, size: 364, size2: 172 },
    { id: uid(), kind: "card", label: "What payment methods are accepted?", supporting: "Major credit cards, Apple Pay, & Cash on delivery.", icon: null, icon2: "expand_more", variant: "outlined", font: 14, bold: true, size: 364, size2: 64 },
    { id: uid(), kind: "card", label: "How do I track my orders?", supporting: "Track live courier from Account > My Orders.", icon: null, icon2: "expand_more", variant: "outlined", font: 14, bold: true, size: 364, size2: 64 },
    { id: uid(), kind: "card", label: "Can I cancel or return an order?", supporting: "Eligible within 14 days of delivery in original state.", icon: null, icon2: "expand_more", variant: "outlined", font: 14, bold: true, size: 364, size2: 64 },
  ]);
  addGroup(f_faqs, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 4 },
  ]);

  // ==========================================================================
  // SCREEN 26: HelpCenter
  // ==========================================================================
  addGroup(f_help, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Help Center", icon: "arrow_back", icon2: "headset_mic", variant: "filled", size: 412 },
  ]);
  addGroup(f_help, 24, 112, "y", [
    { id: uid(), kind: "card", label: "Customer Service", icon: "headset_mic", imagePos: "leading", imageSize: 28, icon2: "chevron_right", variant: "outlined", size: 364, size2: 56 },
    { id: uid(), kind: "card", label: "Whatsapp", icon: "chat", imagePos: "leading", imageSize: 28, icon2: "chevron_right", variant: "outlined", size: 364, size2: 56 },
    { id: uid(), kind: "card", label: "Website", icon: "language", imagePos: "leading", imageSize: 28, icon2: "chevron_right", variant: "outlined", size: 364, size2: 56 },
    { id: uid(), kind: "card", label: "Facebook", icon: "public", imagePos: "leading", imageSize: 28, icon2: "chevron_right", variant: "outlined", size: 364, size2: 56 },
    { id: uid(), kind: "card", label: "Twitter", icon: "share", imagePos: "leading", imageSize: 28, icon2: "chevron_right", variant: "outlined", size: 364, size2: 56 },
    { id: uid(), kind: "card", label: "Instagram", icon: "photo_camera", imagePos: "leading", imageSize: 28, icon2: "chevron_right", variant: "outlined", size: 364, size2: 56 },
  ]);
  addGroup(f_help, 0, 806, "x", [
    { id: uid(), kind: "bottomNav", label: "", icon: null, variant: "filled", size: 412, selected: 4 },
  ]);

  // ==========================================================================
  // SCREEN 27: CustomerService
  // ==========================================================================
  addGroup(f_service, 0, 0, "x", [
    { id: uid(), kind: "topAppBar", label: "Customer Service", icon: "arrow_back", icon2: "call", variant: "filled", size: 412 },
  ]);
  addGroup(f_service, 166, 112, "x", [
    { id: uid(), kind: "chip", label: "Today", icon: null, variant: "filled", size: 80 },
  ]);
  addGroup(f_service, 24, 160, "y", [
    { id: uid(), kind: "card", label: "Hello, good morning.", supporting: "10:41 pm", icon: null, variant: "filled", font: 14, size: 280, size2: 52 },
    { id: uid(), kind: "card", label: "I am a Customer Service, is there anything I can help you with?", icon: null, variant: "filled", font: 13, size: 310, size2: 66 },
  ]);
  addGroup(f_service, 108, 300, "y", [
    { id: uid(), kind: "card", label: "Hi, I'm having problems with my order & payment.", supporting: "10:43 pm", icon: null, variant: "filled", fill: "primary", textColor: "onPrimary", font: 13, size: 280, size2: 66 },
  ]);
  addGroup(f_service, 198, 376, "y", [
    { id: uid(), kind: "card", label: "Can you help me?", supporting: "10:44 pm", icon: null, variant: "filled", fill: "primary", textColor: "onPrimary", font: 13, size: 190, size2: 52 },
  ]);
  addGroup(f_service, 24, 440, "y", [
    { id: uid(), kind: "card", label: "Of course...", icon: null, variant: "filled", font: 13, size: 140, size2: 44 },
    { id: uid(), kind: "card", label: "Can you tell me the problem you are having? so I can help solve it.", supporting: "10:51 pm", icon: null, variant: "filled", font: 13, size: 320, size2: 74 },
  ]);
  addGroup(f_service, 24, 720, "x", [
    { id: uid(), kind: "textField", label: "Message", placeholder: "Write your message...", icon: null, icon2: "image", variant: "outlined", size: 300 },
    { id: uid(), kind: "button", label: "", icon: "mic", variant: "filled", size: 54, size2: 56 },
  ]);

  return {
    version: 3,
    frames,
    groups,
    flows: [],
  };
}
