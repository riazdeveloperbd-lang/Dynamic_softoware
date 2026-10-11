import {
  Frame,
  Group,
  Item,
  PHONE_H,
  PHONE_MARGIN,
  PHONE_W,
  uid,
} from "./tokens";

export type AddScreenTemplateId =
  | "blank_screen"
  | "empty_activity"
  | "featured_store_activity"
  | "navigation_ui_activity"
  | "basic_views_activity"
  | "empty_views_activity"
  | "responsive_views_activity"
  | "flatlist_catalog_activity"
  | "checkout_form_activity"
  | "bottom_navigation_activity"
  | "navigation_drawer_activity"
  | "tabbed_views_activity"
  | "fullscreen_hero_activity"
  | "scrolling_collapsing_activity"
  | "master_detail_flow_activity"
  | "login_auth_activity"
  | "settings_preferences_activity"
  | "google_maps_store_activity"
  | "product_showcase_pdp_activity"
  | "video_story_reel_activity"
  | "bento_analytics_dashboard_activity"
  | "onboarding_carousel_activity"
  | "shopping_cart_bag_activity"
  | "wishlist_saved_grid_activity"
  | "flash_sale_countdown_activity"
  | "order_tracking_timeline_activity"
  | "wallet_loyalty_card_activity"
  | "chat_concierge_support_activity"
  | "review_ratings_gallery_activity"
  | "category_mega_menu_activity"
  | "qr_scanner_ar_tryon_activity";

export type AddScreenTemplateMeta = {
  id: AddScreenTemplateId;
  title: string;
  subtitle: string;
  badge?: string;
  hasBottomNav: boolean;
};

export const ADD_SCREEN_LAYOUT_TEMPLATES: AddScreenTemplateMeta[] = [
  {
    id: "blank_screen",
    title: "Blank Screen (No Activity)",
    subtitle: "Pure empty canvas — drag & drop any component or element anywhere",
    hasBottomNav: false,
  },
  {
    id: "empty_activity",
    title: "Empty Activity",
    subtitle: "Top app bar header + hero showcase block & primary action button",
    hasBottomNav: false,
  },
  {
    id: "featured_store_activity",
    title: "Featured Grid Activity",
    subtitle: "Search bar + 2-column Featured Grid layout with inline price tags",
    badge: "Preview",
    hasBottomNav: true,
  },
  {
    id: "navigation_ui_activity",
    title: "Navigation UI Activity",
    subtitle: "Top app bar + segmented tabs + Featured Grid + bottom navigation bar",
    hasBottomNav: true,
  },
  {
    id: "basic_views_activity",
    title: "Basic Views Activity (FAB)",
    subtitle: "App bar + scrollable product cards + floating action button (+)",
    hasBottomNav: false,
  },
  {
    id: "empty_views_activity",
    title: "Empty Views Activity",
    subtitle: "Clean top navigation header with ready-to-style content container",
    hasBottomNav: false,
  },
  {
    id: "responsive_views_activity",
    title: "Responsive Views Activity",
    subtitle: "Split profile/category header + 2×2 bento grid + floating action (+)",
    hasBottomNav: true,
  },
  {
    id: "flatlist_catalog_activity",
    title: "FlatList Catalog Activity",
    subtitle: "Search bar + dynamic <FlatList /> with image cards & filter dropdown",
    hasBottomNav: true,
  },
  {
    id: "checkout_form_activity",
    title: "Interactive Form & FAQ Activity",
    subtitle: "Customer form input block + expandable FAQ accordion + submit CTA",
    hasBottomNav: false,
  },
  {
    id: "bottom_navigation_activity",
    title: "Bottom Navigation Views Activity",
    subtitle: "Multi-tab bottom navigation bar + promo banner + 2-column Featured Grid",
    badge: "Popular",
    hasBottomNav: true,
  },
  {
    id: "navigation_drawer_activity",
    title: "Navigation Drawer Views Activity",
    subtitle: "Slide-out hamburger drawer header + category pills + FlatList without image",
    hasBottomNav: false,
  },
  {
    id: "tabbed_views_activity",
    title: "Tabbed Views Activity (ViewPager)",
    subtitle: "Top scrollable tab strip + segmented switcher + Featured Grid cards",
    hasBottomNav: true,
  },
  {
    id: "fullscreen_hero_activity",
    title: "Fullscreen Lookbook Activity",
    subtitle: "Edge-to-edge full-bleed cover image card + overlay glass CTA & video reel",
    badge: "Editorial",
    hasBottomNav: false,
  },
  {
    id: "scrolling_collapsing_activity",
    title: "Scrolling Collapsing Toolbar Activity",
    subtitle: "Large collapsing parallax banner + rich text story + product list",
    hasBottomNav: false,
  },
  {
    id: "master_detail_flow_activity",
    title: "Primary / Detail Flow Activity",
    subtitle: "Split master list + inline detail card preview & specification document",
    hasBottomNav: true,
  },
  {
    id: "login_auth_activity",
    title: "Login & OTP Authentication Activity",
    subtitle: "Sign-in credentials form + biometric/e-signature verification + CTA button",
    hasBottomNav: false,
  },
  {
    id: "settings_preferences_activity",
    title: "Settings & Preferences Activity",
    subtitle: "Grouped preference dropdowns + bullet toggles + account link rows",
    hasBottomNav: true,
  },
  {
    id: "google_maps_store_activity",
    title: "Store Locator & Delivery Map Activity",
    subtitle: "Interactive full map header + express delivery stores + branch FlatList",
    badge: "Maps",
    hasBottomNav: false,
  },
  {
    id: "product_showcase_pdp_activity",
    title: "Product Detail Showcase Activity",
    subtitle: "Hero product gallery + badge pills + SKU accordion + sticky Cart CTA",
    hasBottomNav: false,
  },
  {
    id: "video_story_reel_activity",
    title: "Live Video & Shoppable Feed Activity",
    subtitle: "Lookbook video player + 2-column of shoppable Featured Grid + promo banner",
    badge: "Live",
    hasBottomNav: true,
  },
  {
    id: "bento_analytics_dashboard_activity",
    title: "Bento KPI & Order Dashboard Activity",
    subtitle: "3-column Bento metrics + active status cards without image + PDF invoice",
    hasBottomNav: true,
  },
  {
    id: "onboarding_carousel_activity",
    title: "Onboarding Story Walkthrough Activity",
    subtitle: "Full-bleed story card + step progress bar + fast forward key CTA",
    badge: "01",
    hasBottomNav: false,
  },
  {
    id: "shopping_cart_bag_activity",
    title: "Shopping Cart & Bag Summary Activity",
    subtitle: "Horizontal split card items + promo coupon banner + Checkout CTA sticky bar",
    badge: "Bag (3)",
    hasBottomNav: false,
  },
  {
    id: "wishlist_saved_grid_activity",
    title: "Wishlist & Saved Collections Activity",
    subtitle: "Segmented collection tabs + 2-column Featured Grid with inline price tags",
    hasBottomNav: true,
  },
  {
    id: "flash_sale_countdown_activity",
    title: "Flash Deals & Drop Countdown Activity",
    subtitle: "Urgent promo countdown banner + 2-column Featured Grid + FlatList cards",
    badge: "Hot",
    hasBottomNav: true,
  },
  {
    id: "order_tracking_timeline_activity",
    title: "Live Order Tracking & Courier Activity",
    subtitle: "Courier status metrics + step-by-step milestone list + receipt PDF document",
    hasBottomNav: false,
  },
  {
    id: "wallet_loyalty_card_activity",
    title: "VIP Wallet & Loyalty Pass Activity",
    subtitle: "Black card cover pass + Bento reward balance + transaction FlatList",
    badge: "VIP",
    hasBottomNav: true,
  },
  {
    id: "chat_concierge_support_activity",
    title: "Concierge Support & Help Center Activity",
    subtitle: "Search knowledge base + collapsible FAQ accordion + message form block",
    hasBottomNav: false,
  },
  {
    id: "review_ratings_gallery_activity",
    title: "Customer Reviews & Photo Grid Activity",
    subtitle: "Verified rating Bento metrics + customer photo Featured Grid + review cards",
    hasBottomNav: false,
  },
  {
    id: "category_mega_menu_activity",
    title: "Category Directory & Filter Activity",
    subtitle: "Search bar + category pills + dropdown sorter + custom <FlatList /> builder",
    hasBottomNav: true,
  },
  {
    id: "qr_scanner_ar_tryon_activity",
    title: "AR Virtual Try-On & QR Scanner Activity",
    subtitle: "Camera viewfinder video block + horizontal product card + Quick Add button",
    badge: "AR / 3D",
    hasBottomNav: false,
  },
];

// Curated high quality imagery for authentic e-commerce rendering
const IMAGES = {
  bomber: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80",
  sneakers: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80",
  sweater: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop&q=80",
  dress: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80",
  boots: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=80",
  backpack: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80",
  watch: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format&fit=crop&q=80",
  headphones: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
  leatherBag: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=80",
  wallet: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=80",
  hoodie: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80",
  earbuds: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80",
  lookbookHero: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
  storeBanner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80",
  model1: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
  sunglasses: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80",
  denim: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500&auto=format&fit=crop&q=80",
  handbag: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80",
};

/**
 * Builds Material 3 Groups & Items for any chosen screen layout template.
 * Perfectly spaced with exact heights (size2) and Y coordinates so no elements overlap,
 * filling the entire screen (PHONE_H = 892) and faithfully reproducing the layout
 * demonstrated in the template chooser.
 */
export function buildScreenGroupsForTemplate(
  templateId: AddScreenTemplateId,
  frameX: number,
  frameY: number
): Group[] {
  const groups: any[] = [];
  const W = PHONE_W; // 412
  const H = PHONE_H; // 892
  const M = PHONE_MARGIN; // 16
  const CONTENT_W = W - M * 2; // 380
  const HALF_W = 184; // (380 - 12) / 2 = 184

  const makeBottomNav = (selectedTab = 0, tabs: any[] = [
    { icon: "home", label: "Home" },
    { icon: "grid_view", label: "Catalog" },
    { icon: "favorite", label: "Wishlist" },
    { icon: "shopping_cart", label: "Cart" },
    { icon: "person", label: "Profile" },
  ]): any => ({
    id: uid(),
    x: frameX,
    y: frameY + H - 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "bottomNav",
        label: "",
        icon: null,
        variant: "filled",
        size: W,
        tabs,
        selected: selectedTab,
      },
    ],
  });

  switch (templateId) {
    case "blank_screen":
      return [];

    // =========================================================================
    // 2. EMPTY ACTIVITY (Top App Bar + Centered Hero Showcase + Primary Action)
    // =========================================================================
    case "empty_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Empty Activity", icon: "arrow_back", icon2: "more_vert", size: W, variant: "filled",
          },
        ],
      });
      // Centered Hero showcase card at Y: 120 (H: 360)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 120,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "filled",
            fill: "primaryContainer",
            size: CONTENT_W,
            size2: 360,
            imagePos: "top",
            imageSize: 180,
            src: IMAGES.lookbookHero,
            label: "Activity Ready for Custom Design",
            supporting: "This layout container is initialized. Drag components from the left palette, adjust styles, or trigger AI to design this screen.",
          },
        ],
      });
      // Primary Action Button at Y: 500 (H: 56)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 500,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "button",
            variant: "filled",
            size: CONTENT_W,
            size2: 56,
            icon: "rocket_launch",
            label: "Get Started · Primary Action",
          },
        ],
      });
      // Secondary Guide Card at Y: 576 (H: 120)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 576,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "outlined",
            size: CONTENT_W,
            size2: 120,
            icon: "auto_awesome",
            label: "Component Library Available",
            supporting: "Browse 30+ e-commerce cards, promotional banners, product grids, and checkout flows from the left library panel.",
          },
        ],
      });
      // Helper Link at Y: 716
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 716,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "listItem", size: CONTENT_W, icon: "help_outline", label: "Need layout inspiration?", supporting: "Tap Prompt panel to generate AI variations", variant: "text",
          },
        ],
      });
      break;
    }

    // =========================================================================
    // 3. FEATURED GRID ACTIVITY (Search Bar + 2-Col Grid + Banner + Spotlight + Bottom Nav)
    // =========================================================================
    case "featured_store_activity": {
      // 1. Search Bar at Y: 16 (H: 56)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 16,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "searchBar",
            label: "Search 5,000+ fashion styles...",
            icon: "search",
            icon2: "tune",
            size: CONTENT_W,
          },
        ],
      });
      // 2. 2-Column Product Grid Row 1 at Y: 84 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 84,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.bomber,
            label: "Urban Bomber",
            supporting: "$129.00 · ★ 4.9",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.sneakers,
            label: "Retro Sneaker",
            supporting: "$98.00 · ★ 4.8",
          },
        ],
      });
      // 3. 2-Column Product Grid Row 2 at Y: 306 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 306,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.boots,
            label: "Chelsea Boot",
            supporting: "$180.00 · ★ 4.9",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.backpack,
            label: "Leather Bag",
            supporting: "$120.00 · ★ 4.7",
          },
        ],
      });
      // 4. Promo Banner at Y: 528 (H: 110)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 528,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "filled",
            fill: "tertiaryContainer",
            size: CONTENT_W,
            size2: 110,
            imagePos: "leading",
            imageSize: 96,
            src: IMAGES.storeBanner,
            label: "Weekend Flash Deals · 25% OFF",
            supporting: "Use coupon code FLASH25 at checkout on selected luxury wear",
          },
        ],
      });
      // 5. Spotlight Card at Y: 650 (H: 140)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 650,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "outlined",
            size: CONTENT_W,
            size2: 140,
            imagePos: "leading",
            imageSize: 110,
            src: IMAGES.hoodie,
            label: "Nordic Wool Knit Sweater",
            supporting: "$85.00 · 100% Merino Wool · Handcrafted in Norway · Free Express Shipping",
          },
        ],
      });
      groups.push(makeBottomNav(1));
      break;
    }

    // =========================================================================
    // 4. NAVIGATION UI ACTIVITY (App Bar + Tabs + Hero + 2-Col Grid + Bottom Nav)
    // =========================================================================
    case "navigation_ui_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Navigation UI", icon: "arrow_back", icon2: "notifications", size: W, variant: "filled",
          },
        ],
      });
      // Tabs at Y: 76 (H: 48)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "tabs",
            label: "",
            icon: null,
            variant: "filled",
            size: CONTENT_W,
            tabs: [
              { label: "Trending" },
              { label: "New Drops" },
              { label: "Best Offers" },
            ],
            selected: 0,
          },
        ],
      });
      // Hero Card at Y: 136 (H: 180)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 136,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "filled",
            fill: "primaryContainer",
            size: CONTENT_W,
            size2: 180,
            imagePos: "leading",
            imageSize: 140,
            src: IMAGES.storeBanner,
            label: "Autumn Lookbook 2026",
            supporting: "Curated streetwear and luxury outerwear designed for the modern metropolitan wardrobe.",
          },
        ],
      });
      // 2-Col Grid Row 1 at Y: 328 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 328,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.watch,
            label: "Heritage Watch",
            supporting: "$249.00 · ★ 4.9",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.sunglasses,
            label: "Aviator Shades",
            supporting: "$89.00 · ★ 4.8",
          },
        ],
      });
      // 2-Col Grid Row 2 at Y: 550 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 550,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.denim,
            label: "Selvedge Denim",
            supporting: "$140.00 · ★ 4.9",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.handbag,
            label: "Milano Handbag",
            supporting: "$220.00 · ★ 4.8",
          },
        ],
      });
      groups.push(makeBottomNav(0));
      break;
    }

    // =========================================================================
    // 5. BASIC VIEWS ACTIVITY (FAB) (App Bar + Chips + 6 Product Cards + FAB)
    // =========================================================================
    case "basic_views_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Basic Views Activity", icon: "arrow_back", icon2: "search", size: W, variant: "filled",
          },
        ],
      });
      // Filter Chips at Y: 76
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          { id: uid(), kind: "chip", label: "All Items", variant: "outlined", icon: null, checked: true },
          { id: uid(), kind: "chip", label: "Apparel", variant: "outlined", icon: null },
          { id: uid(), kind: "chip", label: "Footwear", variant: "outlined", icon: null },
          { id: uid(), kind: "chip", label: "Accessories", variant: "outlined", icon: null },
        ],
      });
      // 6 Product Cards filling the screen down to Y: 800
      const listData = [
        { src: IMAGES.bomber, label: "Urban Leather Bomber", sub: "$129.00 · Genuine Lambskin · ★ 4.9" },
        { src: IMAGES.sneakers, label: "Retro Runner Sneakers", sub: "$98.00 · Breathable Mesh · ★ 4.8" },
        { src: IMAGES.boots, label: "Italian Chelsea Boots", sub: "$180.00 · Calfskin Leather · ★ 4.9" },
        { src: IMAGES.leatherBag, label: "Milano Saddle Bag", sub: "$280.00 · Hand-stitched · ★ 5.0" },
        { src: IMAGES.watch, label: "Swiss Chronograph Watch", sub: "$350.00 · Sapphire Glass · ★ 4.9" },
        { src: IMAGES.sunglasses, label: "Titanium Aviator Shades", sub: "$120.00 · Polarized UV400 · ★ 4.7" },
      ];
      listData.forEach((item, idx) => {
        groups.push({
          id: uid(),
          x: frameX + M,
          y: frameY + 128 + idx * 112,
          axis: "x",
          items: [
            {
              id: uid(),
              kind: "card", icon: null,
              variant: "outlined",
              size: CONTENT_W,
              size2: 100,
              imagePos: "leading",
              imageSize: 84,
              src: item.src,
              label: item.label,
              supporting: item.sub,
            },
          ],
        });
      });
      // Floating Action Button (+)
      groups.push({
        id: uid(),
        x: frameX + W - 76,
        y: frameY + 780,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "fab",
            icon: "add",
            label: "",
            variant: "filled",
          },
        ],
      });
      break;
    }

    // =========================================================================
    // 6. EMPTY VIEWS ACTIVITY (Clean Top Bar + Ready-to-Style Container)
    // =========================================================================
    case "empty_views_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Empty Views Activity", icon: "arrow_back", icon2: "more_vert", size: W, variant: "filled",
          },
        ],
      });
      // Container Card at Y: 160 (H: 340)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 160,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "outlined",
            size: CONTENT_W,
            size2: 340,
            icon: "folder_open",
            label: "Ready-to-Style Content Container",
            supporting: "This clean layout view provides an unobstructed canvas for creating custom product catalogs, dashboards, or article views.\n\nDrop components from the left panel to populate this view with cards, lists, tabs, or forms.",
          },
        ],
      });
      // Action Button at Y: 520 (H: 56)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 520,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "button",
            variant: "filled",
            size: CONTENT_W,
            size2: 56,
            icon: "add_box",
            label: "Add Initial Component",
          },
        ],
      });
      // Design Tip Card at Y: 596 (H: 120)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 596,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "filled",
            fill: "surfaceContainerLow",
            size: CONTENT_W,
            size2: 120,
            icon: "lightbulb",
            label: "Design Tip",
            supporting: "Switch between 2-column, 3-column, or horizontal list modes using the M3 layout tools in the right inspector.",
          },
        ],
      });
      break;
    }

    // =========================================================================
    // 7. RESPONSIVE VIEWS ACTIVITY (Header + Tabs + 2-Col Grid + Banner + FAB + Nav)
    // =========================================================================
    case "responsive_views_activity": {
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 16,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "filled",
            fill: "primaryContainer",
            size: CONTENT_W,
            size2: 110,
            imagePos: "leading",
            imageSize: 96,
            src: IMAGES.model1,
            label: "Aesthetic Studio Collection",
            supporting: "Responsive multi-column showcase engineered for adaptive layouts.",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 138,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "tabs",
            label: "",
            icon: null,
            variant: "filled",
            size: CONTENT_W,
            tabs: [{ label: "Grid View" }, { label: "List View" }, { label: "Featured" }],
            selected: 0,
          },
        ],
      });
      // 2-Col Grid Row 1 at Y: 198 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 198,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.bomber,
            label: "Studio Bomber",
            supporting: "$129.00 · ★ 4.9",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.boots,
            label: "Chelsea Boots",
            supporting: "$180.00 · ★ 4.9",
          },
        ],
      });
      // 2-Col Grid Row 2 at Y: 420 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 420,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.leatherBag,
            label: "Milano Bag",
            supporting: "$280.00 · ★ 5.0",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.watch,
            label: "Swiss Watch",
            supporting: "$350.00 · ★ 4.9",
          },
        ],
      });
      // Spotlight Card at Y: 642 (H: 100)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 642,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "outlined",
            size: CONTENT_W,
            size2: 100,
            imagePos: "leading",
            imageSize: 84,
            src: IMAGES.storeBanner,
            label: "Special Studio Discount",
            supporting: "Save 30% on seasonal lookbook accessories this week only",
          },
        ],
      });
      // Floating Action Button (+)
      groups.push({
        id: uid(),
        x: frameX + W - 76,
        y: frameY + 724,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "fab",
            icon: "add",
            label: "",
            variant: "filled",
          },
        ],
      });
      groups.push(makeBottomNav(1));
      break;
    }

    // =========================================================================
    // 8. FLATLIST CATALOG ACTIVITY (Search + Chips + 2-Col Grid 6 Cards + Nav)
    // =========================================================================
    case "flatlist_catalog_activity": {
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 16,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "searchBar", label: "Filter products catalog...", icon: "search", icon2: "tune", size: CONTENT_W, variant: "filled",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 80,
        axis: "x",
        items: [
          { id: uid(), kind: "chip", label: "All Items", variant: "outlined", icon: null, checked: true },
          { id: uid(), kind: "chip", label: "Apparel", variant: "outlined", icon: null },
          { id: uid(), kind: "chip", label: "Footwear", variant: "outlined", icon: null },
          { id: uid(), kind: "chip", label: "Accessories", variant: "outlined", icon: null },
        ],
      });
      // Row 1 at Y: 132 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 132,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.bomber,
            label: "Classic Linen Shirt",
            supporting: "$59.00 · Emerald Style",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.boots,
            label: "Chelsea Boots",
            supporting: "$180.00 · Indigo Edition",
          },
        ],
      });
      // Row 2 at Y: 354 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 354,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.watch,
            label: "Chronograph Watch",
            supporting: "$240.00 · Amber Gold",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.leatherBag,
            label: "Milano Saddle Bag",
            supporting: "$280.00 · Rose Collection",
          },
        ],
      });
      // Row 3 at Y: 576 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 576,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.sneakers,
            label: "Retro Sneaker",
            supporting: "$98.00 · White Edition",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.hoodie,
            label: "Merino Wool Knit",
            supporting: "$110.00 · Heather Grey",
          },
        ],
      });
      groups.push(makeBottomNav(1));
      break;
    }

    // =========================================================================
    // 9. CHECKOUT FORM ACTIVITY (App Bar + Hero + 3 Fields + 3 FAQ Cards + CTA)
    // =========================================================================
    case "checkout_form_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Support & FAQ Form", icon: "arrow_back", icon2: "help_outline", size: W, variant: "filled",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "filled",
            fill: "inverseSurface",
            size: CONTENT_W,
            size2: 120,
            icon: "contact_support",
            label: "How can our concierge assist you?",
            supporting: "Fill out the inquiry form below or review our verified answers to frequent order inquiries.",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 208,
        axis: "x",
        items: [{ id: uid(), kind: "textField", size: CONTENT_W, label: "Full Name", supporting: "Enter your legal name" }],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 284,
        axis: "x",
        items: [{ id: uid(), kind: "textField", size: CONTENT_W, label: "Email Address", supporting: "order-support@example.com" }],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 360,
        axis: "x",
        items: [{ id: uid(), kind: "textField", size: CONTENT_W, label: "Order Reference ID", supporting: "Optional (e.g. #APX-98241)" }],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 436,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "outlined",
            size: CONTENT_W,
            size2: 90,
            icon: "local_shipping",
            label: "When will my package ship?",
            supporting: "Orders placed before 2 PM EST ship same day via priority express.",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 538,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "outlined",
            size: CONTENT_W,
            size2: 90,
            icon: "replay",
            label: "30-Day Hassle-Free Returns",
            supporting: "Return any unworn apparel in original condition for full refund.",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 640,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "outlined",
            size: CONTENT_W,
            size2: 90,
            icon: "verified_user",
            label: "Authenticity & Warranty",
            supporting: "All designer merchandise comes with verifiable certificate of authenticity.",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 742,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "button",
            variant: "filled",
            size: CONTENT_W,
            size2: 56,
            icon: "send",
            label: "Submit Inquiry to Concierge Team",
          },
        ],
      });
      break;
    }

    // =========================================================================
    // 10. BOTTOM NAVIGATION ACTIVITY (Banner + 2-Col Grid 4 Cards + Tile + Promo + Nav)
    // =========================================================================
    case "bottom_navigation_activity": {
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 16,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "filled",
            fill: "primaryContainer",
            size: CONTENT_W,
            size2: 130,
            imagePos: "leading",
            imageSize: 110,
            src: IMAGES.storeBanner,
            label: "Weekend Flash Deals · Extra 25% OFF",
            supporting: "Use coupon code FLASH25 at checkout on selected luxury wear",
          },
        ],
      });
      // 2-Col Grid Row 1 at Y: 158 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 158,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.headphones,
            label: "Studio Headphones",
            supporting: "$199.00 · ANC Hi-Fi",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.watch,
            label: "Chronograph Watch",
            supporting: "$240.00 · Swiss Made",
          },
        ],
      });
      // 2-Col Grid Row 2 at Y: 380 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 380,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.sneakers,
            label: "Retro Sneakers",
            supporting: "$98.00 · Low Top",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.leatherBag,
            label: "Saddle Bag",
            supporting: "$280.00 · Genuine Leather",
          },
        ],
      });
      // Tile at Y: 602 (H: 100)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 602,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "outlined",
            size: CONTENT_W,
            size2: 100,
            imagePos: "leading",
            imageSize: 84,
            src: IMAGES.sunglasses,
            label: "Designer Eyewear Collection",
            supporting: "Polarized UV400 titanium frames handcrafted in Japan",
          },
        ],
      });
      // Extra Promo Bar at Y: 714 (H: 84)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 714,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "tonal",
            size: CONTENT_W,
            size2: 84,
            icon: "local_offer",
            label: "Member Exclusive · Double Points",
            supporting: "Earn 2x loyalty credits on every order this weekend",
          },
        ],
      });
      groups.push(makeBottomNav(0));
      break;
    }

    // =========================================================================
    // 11. NAVIGATION DRAWER ACTIVITY (Profile Header + 5 Nav Items + Banner + Grid)
    // =========================================================================
    case "navigation_drawer_activity": {
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 16,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "filled",
            fill: "primaryContainer",
            size: CONTENT_W,
            size2: 120,
            imagePos: "leading",
            imageSize: 96,
            src: IMAGES.model1,
            label: "Alexander Wright",
            supporting: "VIP Member · 2,450 Points · Milan, Italy\nalexander@example.com",
          },
        ],
      });
      const drawerNav = [
        { icon: "storefront", label: "Shop All Collections", sub: "5,400+ seasonal designs" },
        { icon: "local_fire_department", label: "Flash Sales & Urgency Drops", sub: "Up to 60% OFF ends tonight" },
        { icon: "favorite", label: "My Saved Wishlist", sub: "8 items saved" },
        { icon: "receipt_long", label: "Order History & Invoices", sub: "3 orders in progress" },
        { icon: "loyalty", label: "VIP Rewards & Loyalty Pass", sub: "Platinum Tier Benefits" },
      ];
      drawerNav.forEach((nav, idx) => {
        groups.push({
          id: uid(),
          x: frameX + M,
          y: frameY + 148 + idx * 64,
          axis: "x",
          items: [
            {
              id: uid(),
              kind: "listItem", size: CONTENT_W, icon: nav.icon, label: nav.label, supporting: nav.sub, variant: "text",
              icon2: "chevron_right",
            },
          ],
        });
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 472,
        axis: "x",
        items: [{ id: uid(), kind: "divider", size: CONTENT_W }],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 484,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "outlined",
            size: CONTENT_W,
            size2: 120,
            src: IMAGES.storeBanner,
            imagePos: "leading",
            imageSize: 96,
            label: "Autumn Lookbook 2026",
            supporting: "Discover new arrivals inspired by Italian street fashion",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 616,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 170,
            imagePos: "top",
            imageSize: 100,
            src: IMAGES.boots,
            label: "Chelsea Boots",
            supporting: "$180.00",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 170,
            imagePos: "top",
            imageSize: 100,
            src: IMAGES.leatherBag,
            label: "Leather Bag",
            supporting: "$280.00",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 798,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "button",
            variant: "outlined",
            size: CONTENT_W,
            size2: 52,
            icon: "logout",
            label: "Sign Out of Account",
          },
        ],
      });
      break;
    }

    // =========================================================================
    // 12. TABBED VIEWS ACTIVITY (App Bar + Tabs + 2-Col Grid 6 Cards + Bottom Nav)
    // =========================================================================
    case "tabbed_views_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Seasonal Catalog", icon: "arrow_back", icon2: "search", size: W, variant: "filled",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "tabs",
            label: "",
            icon: null,
            variant: "filled",
            size: CONTENT_W,
            tabs: [{ label: "Trending" }, { label: "Bestsellers" }, { label: "Discounts" }],
            selected: 0,
          },
        ],
      });
      // Row 1 at Y: 136 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 136,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.sneakers,
            label: "Retro Sneakers",
            supporting: "$98.00 · ★ 4.8",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.bomber,
            label: "Urban Bomber",
            supporting: "$129.00 · ★ 4.9",
          },
        ],
      });
      // Row 2 at Y: 358 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 358,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.boots,
            label: "Chelsea Boots",
            supporting: "$180.00 · ★ 4.9",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.watch,
            label: "Swiss Chrono",
            supporting: "$240.00 · ★ 4.9",
          },
        ],
      });
      // Row 3 at Y: 580 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 580,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.leatherBag,
            label: "Milano Saddle",
            supporting: "$280.00 · ★ 5.0",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.hoodie,
            label: "Wool Knit",
            supporting: "$110.00 · ★ 4.8",
          },
        ],
      });
      groups.push(makeBottomNav(1));
      break;
    }

    // =========================================================================
    // 13. FULLSCREEN LOOKBOOK ACTIVITY (Cover Hero + 2-Col Grid + Primary CTA)
    // =========================================================================
    case "fullscreen_hero_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Autumn / Winter 2026 Lookbook", icon: "arrow_back", icon2: "share", size: W, variant: "filled",
          },
        ],
      });
      // Full-bleed Lookbook Hero Card at Y: 76 (H: 440)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "filled",
            fill: "inverseSurface",
            size: CONTENT_W,
            size2: 440,
            imagePos: "top",
            imageSize: 320,
            src: IMAGES.model1,
            icon: "play_circle",
            label: "The Milan Runway Edition",
            supporting: "Immerse yourself in hand-crafted wool trenchcoats, Italian leather boots, and sustainable silk accents. Directed by Matteo Rossi.",
          },
        ],
      });
      // 2-Col Grid at Y: 528 (H: 190)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 528,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 190,
            imagePos: "top",
            imageSize: 110,
            src: IMAGES.boots,
            label: "Runway Boot",
            supporting: "$210.00 · Limited",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 190,
            imagePos: "top",
            imageSize: 110,
            src: IMAGES.leatherBag,
            label: "Saddle Bag",
            supporting: "$280.00 · Calfskin",
          },
        ],
      });
      // Primary Button at Y: 730 (H: 56)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 730,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "button",
            variant: "filled",
            size: CONTENT_W,
            size2: 56,
            icon: "shopping_bag",
            label: "Shop The Runway Lookbook Collection",
          },
        ],
      });
      // Editorial Notice at Y: 798
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 798,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "listItem", size: CONTENT_W, icon: "verified", label: "Runway Exclusive · Milan Fashion Week 2026", supporting: "Limited production run of 500 numbered pieces worldwide", variant: "text",
          },
        ],
      });
      break;
    }

    // =========================================================================
    // 14. SCROLLING COLLAPSING TOOLBAR ACTIVITY (Parallax Banner + Star FAB + Story + 4 Cards)
    // =========================================================================
    case "scrolling_collapsing_activity": {
      // 1. Hero Parallax Banner Card at Y: 0 (H: 220)
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "filled",
            fill: "primaryContainer",
            size: W,
            size2: 220,
            imagePos: "top",
            imageSize: 150,
            src: IMAGES.storeBanner,
            label: "Artisan Leather Crafts",
            supporting: "Masterfully hand-stitched heritage goods made in Milan since 1984.",
          },
        ],
      });
      // Floating Star FAB overlapping banner at Y: 192
      groups.push({
        id: uid(),
        x: frameX + W - 76,
        y: frameY + 192,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "fab",
            icon: "star",
            label: "",
            variant: "filled",
          },
        ],
      });
      // 2. Brand Story Card at Y: 256 (H: 110)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 256,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "outlined",
            size: CONTENT_W,
            size2: 110,
            icon: "history_edu",
            label: "Brand Heritage Story",
            supporting: "Every leather accessory undergoes 48 meticulous production steps to ensure durability that lasts a lifetime.",
          },
        ],
      });
      // 3. Product Card 1 at Y: 378 (H: 110)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 378,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: CONTENT_W,
            size2: 110,
            imagePos: "leading",
            imageSize: 96,
            src: IMAGES.leatherBag,
            label: "Milano Saddle Bag",
            supporting: "$280.00 · Genuine Full-Grain Leather · Hand-stitched",
          },
        ],
      });
      // 4. Product Card 2 at Y: 500 (H: 110)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 500,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: CONTENT_W,
            size2: 110,
            imagePos: "leading",
            imageSize: 96,
            src: IMAGES.wallet,
            label: "Bifold Minimalist Wallet",
            supporting: "$75.00 · Vegetable Tanned Calfskin · RFID Protected",
          },
        ],
      });
      // 5. Product Card 3 at Y: 622 (H: 110)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 622,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: CONTENT_W,
            size2: 110,
            imagePos: "leading",
            imageSize: 96,
            src: IMAGES.watch,
            label: "Heritage Chronometer Watch",
            supporting: "$350.00 · Sapphire Glass · Automatic Swiss Movement",
          },
        ],
      });
      // 6. Product Card 4 at Y: 744 (H: 110)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 744,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: CONTENT_W,
            size2: 110,
            imagePos: "leading",
            imageSize: 96,
            src: IMAGES.boots,
            label: "Chelsea Leather Boots",
            supporting: "$180.00 · Goodyear Welted · Vibram Sole",
          },
        ],
      });
      break;
    }

    // =========================================================================
    // 15. PRIMARY / DETAIL FLOW ACTIVITY (App Bar + 3 Master Items + Detail + CTA + Nav)
    // =========================================================================
    case "master_detail_flow_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Product Catalog (Split Flow)", icon: "arrow_back", icon2: "tune", size: W, variant: "filled",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: CONTENT_W,
            size2: 100,
            imagePos: "leading",
            imageSize: 84,
            src: IMAGES.leatherBag,
            label: "Milano Saddle Bag (Selected)",
            supporting: "$280.00 · Luxury Tan Leather",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 188,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "outlined",
            size: CONTENT_W,
            size2: 100,
            imagePos: "leading",
            imageSize: 84,
            src: IMAGES.boots,
            label: "Chelsea Boots",
            supporting: "$180.00 · Italian Calfskin",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 300,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "outlined",
            size: CONTENT_W,
            size2: 100,
            imagePos: "leading",
            imageSize: 84,
            src: IMAGES.watch,
            label: "Minimalist Chronometer",
            supporting: "$350.00 · Sapphire Crystal",
          },
        ],
      });
      // Detail Preview Card at Y: 412 (H: 240)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 412,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "filled",
            fill: "primaryContainer",
            size: CONTENT_W,
            size2: 240,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.leatherBag,
            label: "Detailed Specifications",
            supporting: "Material: Full-grain Tuscan leather. Hardware: Solid brushed brass. Internal compartment: Padded laptop sleeve (fits 14\"). Warranty: Lifetime guarantee.",
          },
        ],
      });
      // Action Button at Y: 664 (H: 52)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 664,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "button",
            variant: "filled",
            size: CONTENT_W,
            size2: 52,
            icon: "shopping_bag",
            label: "Order Milano Saddle Bag · $280.00",
          },
        ],
      });
      groups.push(makeBottomNav(1));
      break;
    }

    // =========================================================================
    // 16. LOGIN & OTP AUTHENTICATION ACTIVITY
    // =========================================================================
    case "login_auth_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Member Sign In", icon: "arrow_back", icon2: "help_outline", size: W, variant: "filled",
          },
        ],
      });
      // Auth Hero Card at Y: 88 (H: 140)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 88,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "filled",
            fill: "secondaryContainer",
            size: CONTENT_W,
            size2: 140,
            icon: "lock_person",
            label: "Welcome Back to Apex Store",
            supporting: "Sign in with your registered account credentials or biometrics to access your saved orders & loyalty tier.",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 240,
        axis: "x",
        items: [{ id: uid(), kind: "textField", size: CONTENT_W, label: "Email or Phone Number", supporting: "alexander@example.com" }],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 324,
        axis: "x",
        items: [{ id: uid(), kind: "textField", size: CONTENT_W, label: "Account Password", supporting: "••••••••••••" }],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 408,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "outlined",
            size: CONTENT_W,
            size2: 90,
            icon: "fingerprint",
            label: "Fast Biometric Login Enabled",
            supporting: "Tap to sign in instantly with Touch ID or Face ID recognition",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 510,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "button",
            variant: "filled",
            size: CONTENT_W,
            size2: 56,
            icon: "login",
            label: "Sign In to My Account",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 578,
        axis: "x",
        items: [
          { id: uid(), kind: "button", variant: "outlined", size: HALF_W, size2: 48, label: "Google" },
          { id: uid(), kind: "button", variant: "outlined", size: HALF_W, size2: 48, label: "Apple" },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 638,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "tonal",
            size: CONTENT_W,
            size2: 80,
            icon: "verified_user",
            label: "256-Bit SSL Encrypted Session",
            supporting: "Your personal data and payments are strictly protected",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 730,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "listItem", size: CONTENT_W, icon: "help", label: "Forgot Password or Need Help?", supporting: "Reset credentials via SMS OTP or contact concierge", variant: "text",
          },
        ],
      });
      break;
    }

    // =========================================================================
    // 17. SETTINGS & PREFERENCES ACTIVITY (App Bar + 4 Switches + Preferences + Nav)
    // =========================================================================
    case "settings_preferences_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Settings & Preferences", icon: "arrow_back", icon2: "search", size: W, variant: "filled",
          },
        ],
      });
      const switches = [
        { icon: "notifications_active", label: "Order & Shipping Alerts", sub: "Push notifications on package milestones", checked: true },
        { icon: "local_offer", label: "Promotions & Flash Deals", sub: "Get notified when items in your wishlist go on sale", checked: true },
        { icon: "fingerprint", label: "Biometric Sign-In", sub: "Use Face ID or fingerprint to authorize payments", checked: true },
        { icon: "dark_mode", label: "Dark Theme Mode", sub: "Optimize interface contrast for low-light environments", checked: false },
      ];
      switches.forEach((sw, idx) => {
        groups.push({
          id: uid(),
          x: frameX + M,
          y: frameY + 76 + idx * 64,
          axis: "x",
          items: [
            {
              id: uid(),
              kind: "listItem", size: CONTENT_W, icon: sw.icon, label: sw.label, supporting: sw.sub, variant: "text",
              switch: true,
              checked: sw.checked,
            },
          ],
        });
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 332,
        axis: "x",
        items: [{ id: uid(), kind: "divider", size: CONTENT_W }],
      });
      const links = [
        { icon: "currency_exchange", label: "Display Currency", sub: "USD ($) · United States Dollar" },
        { icon: "language", label: "Application Language", sub: "English (US)" },
        { icon: "credit_card", label: "Default Payment Method", sub: "Apple Pay · Visa ending in 4242" },
        { icon: "pin_drop", label: "Saved Shipping Addresses", sub: "2 verified delivery locations" },
      ];
      links.forEach((lk, idx) => {
        groups.push({
          id: uid(),
          x: frameX + M,
          y: frameY + 344 + idx * 64,
          axis: "x",
          items: [
            {
              id: uid(),
              kind: "listItem", size: CONTENT_W, icon: lk.icon, label: lk.label, supporting: lk.sub, variant: "text",
              icon2: "chevron_right",
            },
          ],
        });
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 610,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "outlined",
            size: CONTENT_W,
            size2: 90,
            icon: "info",
            label: "Apex Mobile v4.8.2 (Build 2026)",
            supporting: "Up to date · Terms of Service & Privacy Policy",
          },
        ],
      });
      groups.push(makeBottomNav(4));
      break;
    }

    // =========================================================================
    // 18. STORE LOCATOR & DELIVERY MAP ACTIVITY (App Bar + Search + Native Map + Info)
    // =========================================================================
    case "google_maps_store_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Store Locator & Pickup", icon: "arrow_back", icon2: "my_location", size: W, variant: "filled",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "searchBar",
            label: "Search city, zip code or landmark...",
            icon: "search",
            icon2: "tune",
            size: CONTENT_W,
          },
        ],
      });
      // Native Map View at Y: 144 (H: 320)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 144,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "map",
            size: CONTENT_W,
            size2: 320,
          },
        ],
      });
      // Selected Store Info Card at Y: 476 (H: 140)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 476,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "filled",
            fill: "primaryContainer",
            size: CONTENT_W,
            size2: 140,
            icon: "storefront",
            label: "Apex Flagship Store — Soho NYC",
            supporting: "542 Broadway, New York, NY 10012\nOpen today: 10:00 AM – 9:00 PM\nIn-Store Pickup Available (Ready in 2 Hours)",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 628,
        axis: "x",
        items: [
          { id: uid(), kind: "button", variant: "filled", size: HALF_W, size2: 48, icon: "directions", label: "Get Directions" },
          { id: uid(), kind: "button", variant: "outlined", size: HALF_W, size2: 48, icon: "call", label: "Call Store" },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 688,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "listItem", size: CONTENT_W, icon: "store", label: "Apex Brooklyn Outlet", supporting: "182 Bedford Ave · 2.4 miles away · Open until 8 PM", variant: "text",
            icon2: "chevron_right",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 752,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "listItem", size: CONTENT_W, icon: "store", label: "Apex Hudson Yards", supporting: "20 Hudson Yards 3rd Fl · 3.1 miles away", variant: "text",
            icon2: "chevron_right",
          },
        ],
      });
      break;
    }

    // =========================================================================
    // 19. PRODUCT DETAIL SHOWCASE ACTIVITY (PDP) (Hero Card + Swatches + Sizes + CTA)
    // =========================================================================
    case "product_showcase_pdp_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Product Details", icon: "arrow_back", icon2: "favorite_border", size: W, variant: "filled",
          },
        ],
      });
      // Hero Product Photo Card at Y: 76 (H: 320)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "filled",
            size: CONTENT_W,
            size2: 320,
            imagePos: "top",
            imageSize: 240,
            src: IMAGES.sneakers,
            label: "Nike Air Max Pulse 2026",
            supporting: "$159.00 · ★ 4.9 (842 verified buyer reviews)",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 408,
        axis: "x",
        items: [
          { id: uid(), kind: "chip", label: "Midnight Black", variant: "outlined", icon: null, checked: true },
          { id: uid(), kind: "chip", label: "Pure Red", variant: "outlined", icon: null },
          { id: uid(), kind: "chip", label: "White Platinum", variant: "outlined", icon: null },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 460,
        axis: "x",
        items: [
          { id: uid(), kind: "chip", label: "US 8", variant: "outlined", icon: null },
          { id: uid(), kind: "chip", label: "US 9", variant: "outlined", icon: null },
          { id: uid(), kind: "chip", label: "US 10", variant: "outlined", icon: null, checked: true },
          { id: uid(), kind: "chip", label: "US 11", variant: "outlined", icon: null },
          { id: uid(), kind: "chip", label: "US 12", variant: "outlined", icon: null },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 512,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "outlined",
            size: CONTENT_W,
            size2: 130,
            icon: "description",
            label: "Description & Specifications",
            supporting: "Breathable engineered mesh upper with responsive point-loaded Air cushioning. Designed for all-day comfort, high impact workouts and daily street style.",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 654,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "listItem", size: CONTENT_W, icon: "local_shipping", label: "Free 2-Day Shipping & Free Returns", supporting: "Order within 4 hrs to receive by Tuesday", variant: "text",
          },
        ],
      });
      // Sticky Action Bar at Y: 728
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 728,
        axis: "x",
        items: [
          { id: uid(), kind: "button", variant: "outlined", size: 110, size2: 56, icon: "favorite", label: "Save" },
          { id: uid(), kind: "button", variant: "filled", size: 258, size2: 56, icon: "shopping_bag", label: "Add to Bag · $159.00" },
        ],
      });
      break;
    }

    // =========================================================================
    // 20. LIVE VIDEO & SHOPPABLE FEED ACTIVITY
    // =========================================================================
    case "video_story_reel_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Apex Live Runway Feed", icon: "arrow_back", icon2: "share", size: W, variant: "filled",
          },
        ],
      });
      // Live Video Stream Card at Y: 76 (H: 360)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "filled",
            fill: "inverseSurface",
            size: CONTENT_W,
            size2: 360,
            imagePos: "top",
            imageSize: 260,
            src: IMAGES.model1,
            icon: "play_circle",
            label: "🔴 LIVE: Milan Streetwear Showcase (1.4k watching)",
            supporting: "Host Sofia presents live try-on of new autumn jackets, sneakers, and accessories with exclusive live discounts.",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 448,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "listItem", size: CONTENT_W, icon: "local_fire_department", label: "Featured Items In This Stream", supporting: "Tap any item to purchase instantly during live broadcast", variant: "text",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 512,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.bomber,
            label: "Runway Bomber",
            supporting: "$129.00 · Buy Live",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.boots,
            label: "Chelsea Boots",
            supporting: "$180.00 · Buy Live",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 734,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "tonal",
            size: CONTENT_W,
            size2: 70,
            icon: "flash_on",
            label: "Live Exclusive Code: STREAM20",
            supporting: "Extra 20% off during this broadcast only",
          },
        ],
      });
      groups.push(makeBottomNav(1));
      break;
    }

    // =========================================================================
    // 21. BENTO KPI & ORDER DASHBOARD ACTIVITY
    // =========================================================================
    case "bento_analytics_dashboard_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Store Analytics & Orders", icon: "menu", icon2: "tune", size: W, variant: "filled",
          },
        ],
      });
      // 2-Col KPI Cards at Y: 76 (H: 140)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "filled",
            fill: "primaryContainer",
            size: HALF_W,
            size2: 140,
            icon: "shopping_cart",
            label: "$1,280.00 Spent",
            supporting: "14 Orders Completed\n+18% from last month",
          },
          {
            id: uid(),
            kind: "card",
            variant: "filled",
            fill: "secondaryContainer",
            size: HALF_W,
            size2: 140,
            icon: "loyalty",
            label: "3,450 Points",
            supporting: "VIP Gold Member\n$45 Reward credit ready",
          },
        ],
      });
      // Wide Delivery Card at Y: 228 (H: 140)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 228,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "filled",
            fill: "surfaceContainerHigh",
            size: CONTENT_W,
            size2: 140,
            icon: "local_shipping",
            label: "Active Delivery: #APX-98241",
            supporting: "Nike Air Max Pulse 2026 + 1 other item\nOut for delivery · Arriving today by 4:30 PM by FedEx Express",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 380,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "listItem", size: CONTENT_W, icon: "receipt_long", label: "Recent Purchase History", supporting: "View invoices and reorder items", variant: "text",
          },
        ],
      });
      const orderHistory = [
        { src: IMAGES.leatherBag, label: "Milano Saddle Bag", sub: "Delivered Oct 8 · $280.00 · Invoiced" },
        { src: IMAGES.watch, label: "Chronograph Watch", sub: "Delivered Sep 24 · $240.00 · Invoiced" },
        { src: IMAGES.boots, label: "Chelsea Boots", sub: "Delivered Sep 12 · $180.00 · Invoiced" },
      ];
      orderHistory.forEach((ord, idx) => {
        groups.push({
          id: uid(),
          x: frameX + M,
          y: frameY + 444 + idx * 108,
          axis: "x",
          items: [
            {
              id: uid(),
              kind: "card", icon: null,
              variant: "outlined",
              size: CONTENT_W,
              size2: 96,
              imagePos: "leading",
              imageSize: 84,
              src: ord.src,
              label: ord.label,
              supporting: ord.sub,
            },
          ],
        });
      });
      groups.push(makeBottomNav(4));
      break;
    }

    // =========================================================================
    // 22. ONBOARDING STORY WALKTHROUGH ACTIVITY
    // =========================================================================
    case "onboarding_carousel_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar",
            label: "Welcome to Apex",
                        icon2: "close",
            size: W,
          },
        ],
      });
      // Hero Story Card at Y: 76 (H: 440)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "filled",
            fill: "primaryContainer",
            size: CONTENT_W,
            size2: 440,
            imagePos: "top",
            imageSize: 280,
            src: IMAGES.storeBanner,
            label: "Curated Global Fashion Delivered",
            supporting: "Discover 10,000+ luxury apparel items, limited sneakers, handcrafted accessories, and vintage timepieces from top international designers.",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 528,
        axis: "x",
        items: [
          { id: uid(), kind: "chip", label: "● Step 1: Discover", variant: "outlined", icon: null, checked: true },
          { id: uid(), kind: "chip", label: "○ Step 2: Try-On", variant: "outlined", icon: null },
          { id: uid(), kind: "chip", label: "○ Step 3: Fast Express", variant: "outlined", icon: null },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 580,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "outlined",
            size: CONTENT_W,
            size2: 110,
            icon: "verified_user",
            label: "100% Authenticity & Free Returns",
            supporting: "Every designer product is verified by verified master authenticators before dispatch.",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 702,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "button",
            variant: "filled",
            size: CONTENT_W,
            size2: 56,
            icon: "arrow_forward",
            label: "Continue to Personalize Feed",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 770,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "button",
            variant: "outlined",
            size: CONTENT_W,
            size2: 48,
            label: "Skip Onboarding & Browse as Guest",
          },
        ],
      });
      break;
    }

    // =========================================================================
    // 23. SHOPPING CART & BAG SUMMARY ACTIVITY
    // =========================================================================
    case "shopping_cart_bag_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Shopping Bag (3 items)", icon: "arrow_back", icon2: "delete_outline", size: W, variant: "filled",
          },
        ],
      });
      const cartItems = [
        { src: IMAGES.sneakers, label: "Nike Air Max Pulse 2026", sub: "$159.00 · Size: US 10 · Black/Red · Qty: 1" },
        { src: IMAGES.leatherBag, label: "Milano Saddle Bag", sub: "$280.00 · Tan Leather · Qty: 1" },
        { src: IMAGES.watch, label: "Minimalist Chronometer", sub: "$199.00 · Swiss Movement · Qty: 1" },
      ];
      cartItems.forEach((it, idx) => {
        groups.push({
          id: uid(),
          x: frameX + M,
          y: frameY + 76 + idx * 122,
          axis: "x",
          items: [
            {
              id: uid(),
              kind: "card", icon: null,
              variant: "outlined",
              size: CONTENT_W,
              size2: 110,
              imagePos: "leading",
              imageSize: 96,
              src: it.src,
              label: it.label,
              supporting: it.sub,
            },
          ],
        });
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 442,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "textField",
            size: CONTENT_W,
            label: "Promo Code: APX-SPRING20",
            supporting: "Applied: $127.60 discount saved",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 526,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "filled",
            fill: "surfaceContainerHighest",
            size: CONTENT_W,
            size2: 160,
            label: "Order Summary",
            supporting: "Subtotal: $638.00\nDiscount (20% OFF): -$127.60\nEstimated Tax & Shipping: Free\nTotal Due: $510.40",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 698,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "button",
            variant: "filled",
            size: CONTENT_W,
            size2: 56,
            icon: "lock",
            label: "Proceed to Checkout · $510.40",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 766,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "listItem", size: CONTENT_W, icon: "verified_user", label: "Secure 256-Bit SSL Checkout", supporting: "Apple Pay · Google Pay · Visa · Mastercard · Klarna", variant: "text",
          },
        ],
      });
      break;
    }

    // =========================================================================
    // 24. WISHLIST & SAVED COLLECTIONS ACTIVITY
    // =========================================================================
    case "wishlist_saved_grid_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Saved Wishlist (6 items)", icon: "arrow_back", icon2: "share", size: W, variant: "filled",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "tabs",
            label: "",
            icon: null,
            variant: "filled",
            size: CONTENT_W,
            tabs: [{ label: "All Items (6)" }, { label: "Price Dropped" }, { label: "In Stock" }],
            selected: 0,
          },
        ],
      });
      // 2-Col Grid Row 1 at Y: 136 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 136,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.bomber,
            label: "Urban Leather Bomber",
            supporting: "♥ $129.00 · Price Dropped $30!",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.boots,
            label: "Italian Chelsea Boots",
            supporting: "♥ $180.00 · In Stock (Only 2 left)",
          },
        ],
      });
      // 2-Col Grid Row 2 at Y: 358 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 358,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.watch,
            label: "Swiss Chronograph",
            supporting: "♥ $240.00 · 15% Member Discount",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.leatherBag,
            label: "Milano Saddle Bag",
            supporting: "♥ $280.00 · Low Stock Alert",
          },
        ],
      });
      // 2-Col Grid Row 3 at Y: 580 (H: 150)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 580,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 150,
            imagePos: "top",
            imageSize: 90,
            src: IMAGES.sunglasses,
            label: "Aviator Sunglasses",
            supporting: "♥ $89.00",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 150,
            imagePos: "top",
            imageSize: 90,
            src: IMAGES.wallet,
            label: "Bifold Coin Wallet",
            supporting: "♥ $75.00",
          },
        ],
      });
      // Move All to Bag Button at Y: 742 (H: 56)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 742,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "button",
            variant: "filled",
            size: CONTENT_W,
            size2: 56,
            icon: "shopping_bag",
            label: "Move All In-Stock to Bag",
          },
        ],
      });
      groups.push(makeBottomNav(2));
      break;
    }

    // =========================================================================
    // 25. FLASH DEALS & DROP COUNTDOWN ACTIVITY
    // =========================================================================
    case "flash_sale_countdown_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Flash Sale & Urgency Drops", icon: "arrow_back", icon2: "notifications_active", size: W, variant: "filled",
          },
        ],
      });
      // Flash Countdown Banner at Y: 76 (H: 110)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "filled",
            fill: "primaryContainer",
            size: CONTENT_W,
            size2: 110,
            icon: "timer",
            label: "⚡ FLASH SALE · Ends in 02 : 14 : 35",
            supporting: "Up to 60% OFF top audio, wearables & sneakers · Limited Quantities Available",
          },
        ],
      });
      // 2-Col Grid Row 1 at Y: 198 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 198,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.sneakers,
            label: "Nike Air Max Pulse",
            supporting: "$99.00 (Was $159 -38%)",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.headphones,
            label: "Studio ANC HiFi",
            supporting: "$119.00 (Was $199 -40%)",
          },
        ],
      });
      // 2-Col Grid Row 2 at Y: 420 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 420,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.watch,
            label: "Swiss Chronograph",
            supporting: "$149.00 (Was $240 -38%)",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 210,
            imagePos: "top",
            imageSize: 130,
            src: IMAGES.backpack,
            label: "Canvas Backpack",
            supporting: "$59.00 (Was $120 -50%)",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 642,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "outlined",
            size: CONTENT_W,
            size2: 96,
            imagePos: "leading",
            imageSize: 84,
            src: IMAGES.sunglasses,
            label: "Polarized Titanium Shades",
            supporting: "$49.00 (Was $120.00 · -59% OFF) · Ships today",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 750,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "tonal",
            size: CONTENT_W,
            size2: 48,
            icon: "local_fire_department",
            label: "84 items claimed in the last 10 minutes!",
          },
        ],
      });
      groups.push(makeBottomNav(0));
      break;
    }

    // =========================================================================
    // 26. LIVE ORDER TRACKING & COURIER ACTIVITY
    // =========================================================================
    case "order_tracking_timeline_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Live Order Tracking #APX-98241", icon: "arrow_back", icon2: "share", size: W, variant: "filled",
          },
        ],
      });
      // Estimated Delivery Hero at Y: 76 (H: 120)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "filled",
            fill: "primaryContainer",
            size: CONTENT_W,
            size2: 120,
            icon: "local_shipping",
            label: "Estimated Arrival: Today by 4:30 PM",
            supporting: "Courier is 4 stops away in your neighborhood (Downtown Manhattan)",
          },
        ],
      });
      const steps = [
        { icon: "check_circle", label: "Step 1: Order Placed & Confirmed", sub: "Oct 11, 09:15 AM · Payment verified" },
        { icon: "inventory_2", label: "Step 2: Quality Inspection & Packed", sub: "Oct 11, 11:30 AM · Apex Milan Fulfillment" },
        { icon: "flight_takeoff", label: "Step 3: Priority Express Air Transit", sub: "Oct 11, 01:45 PM · Departed JFK International" },
        { icon: "directions_car", label: "Step 4: Out for Courier Delivery", sub: "Oct 11, 03:10 PM · On courier vehicle" },
      ];
      steps.forEach((st, idx) => {
        groups.push({
          id: uid(),
          x: frameX + M,
          y: frameY + 208 + idx * 64,
          axis: "x",
          items: [
            {
              id: uid(),
              kind: "listItem", size: CONTENT_W, icon: st.icon, label: st.label, supporting: st.sub, variant: "text",
            },
          ],
        });
      });
      // Courier Driver Profile Card at Y: 476 (H: 100)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 476,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "outlined",
            size: CONTENT_W,
            size2: 100,
            imagePos: "leading",
            imageSize: 84,
            src: IMAGES.model1,
            label: "Marcus Vance · Priority Courier",
            supporting: "FedEx Express Van #14 · 4.9 ★ (1,240 deliveries)",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 588,
        axis: "x",
        items: [
          { id: uid(), kind: "button", variant: "filled", size: HALF_W, size2: 48, icon: "call", label: "Call Driver" },
          { id: uid(), kind: "button", variant: "outlined", size: HALF_W, size2: 48, icon: "chat", label: "Delivery Notes" },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 648,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "filled",
            fill: "surfaceContainerLow",
            size: CONTENT_W,
            size2: 100,
            imagePos: "leading",
            imageSize: 84,
            src: IMAGES.sneakers,
            label: "Nike Air Max Pulse 2026",
            supporting: "1 item · Packed in tamper-evident security box",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 760,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "button",
            variant: "filled",
            size: CONTENT_W,
            size2: 52,
            icon: "map",
            label: "Open Live GPS Courier Map",
          },
        ],
      });
      break;
    }

    // =========================================================================
    // 27. VIP WALLET & LOYALTY PASS ACTIVITY
    // =========================================================================
    case "wallet_loyalty_card_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "VIP Loyalty & Wallet", icon: "arrow_back", icon2: "qr_code", size: W, variant: "filled",
          },
        ],
      });
      // Black Gold VIP Pass Card at Y: 76 (H: 210)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "filled",
            fill: "inverseSurface",
            size: CONTENT_W,
            size2: 210,
            icon: "stars",
            label: "APEX BLACK VIP MEMBER",
            supporting: "Cardholder: Alexander Wright\nMember ID: #APX-884029-VIP\nStatus: Platinum Tier (Top 1% Shopper)\nExpires: 12/2028 · 10% Lifetime Storewide Rebate",
          },
        ],
      });
      // Rewards Balance Box at Y: 298 (H: 110)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 298,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "filled",
            fill: "primaryContainer",
            size: CONTENT_W,
            size2: 110,
            icon: "account_balance_wallet",
            label: "3,450 Available Points ($34.50)",
            supporting: "You have 2 reward vouchers ready to redeem at checkout on any fashion order.",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 420,
        axis: "x",
        items: [
          { id: uid(), kind: "button", variant: "filled", size: HALF_W, size2: 48, icon: "redeem", label: "Redeem $25 Voucher" },
          { id: uid(), kind: "button", variant: "outlined", size: HALF_W, size2: 48, icon: "history", label: "Points History" },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 480,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "listItem", size: CONTENT_W, icon: "card_membership", label: "Your Platinum Tier Privileges", supporting: "Exclusive VIP concierge perks unlocked", variant: "text",
          },
        ],
      });
      const privileges = [
        { icon: "local_shipping", label: "Free Worldwide Express Delivery", sub: "No minimum spend required on all orders" },
        { icon: "verified", label: "24/7 Dedicated Concierge Stylist", sub: "Direct priority line to fashion advisers" },
        { icon: "event", label: "Early Access to Designer Drops", sub: "Shop new collections 48 hours before public launch" },
      ];
      privileges.forEach((pv, idx) => {
        groups.push({
          id: uid(),
          x: frameX + M,
          y: frameY + 544 + idx * 64,
          axis: "x",
          items: [
            {
              id: uid(),
              kind: "listItem", size: CONTENT_W, icon: pv.icon, label: pv.label, supporting: pv.sub, variant: "text",
            },
          ],
        });
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 748,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "button",
            variant: "filled",
            size: CONTENT_W,
            size2: 52,
            icon: "qr_code_scanner",
            label: "Show Member QR Pass In-Store",
          },
        ],
      });
      groups.push(makeBottomNav(4));
      break;
    }

    // =========================================================================
    // 28. CONCIERGE SUPPORT & HELP CENTER ACTIVITY
    // =========================================================================
    case "chat_concierge_support_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Apex Concierge Support", icon: "arrow_back", icon2: "more_vert", size: W, variant: "filled",
          },
        ],
      });
      // Concierge Profile Card at Y: 76 (H: 90)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "filled",
            fill: "primaryContainer",
            size: CONTENT_W,
            size2: 90,
            imagePos: "leading",
            imageSize: 76,
            src: IMAGES.model1,
            label: "Elena Rossi · Senior Stylist",
            supporting: "Active now · Typically replies in under 1 minute",
          },
        ],
      });
      // Chat Bubble 1 (Agent) at Y: 178 (H: 90)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 178,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "tonal",
            size: 320,
            size2: 90,
            icon: "support_agent",
            label: "Hello Alexander! How can I assist you today?",
            supporting: "10:24 AM · Sent",
          },
        ],
      });
      // Chat Bubble 2 (User) at Y: 280 (H: 90)
      groups.push({
        id: uid(),
        x: frameX + M + 60,
        y: frameY + 280,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "filled",
            fill: "primaryContainer",
            size: 320,
            size2: 90,
            icon: "person",
            label: "I need a matching belt for the Milano Saddle Bag.",
            supporting: "10:26 AM · Delivered",
          },
        ],
      });
      // Chat Bubble 3 (Recommendation) at Y: 382 (H: 120)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 382,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "outlined",
            size: CONTENT_W,
            size2: 120,
            imagePos: "leading",
            imageSize: 96,
            src: IMAGES.leatherBag,
            label: "Hand-Stitched Italian Calfskin Belt",
            supporting: "$95.00 · Exact color match with Milano tan leather. Would you like me to reserve one?",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 514,
        axis: "x",
        items: [
          { id: uid(), kind: "chip", label: "Yes, add to bag", variant: "outlined", checked: true },
          { id: uid(), kind: "chip", label: "Check sizing guide", variant: "outlined", icon: null },
          { id: uid(), kind: "chip", label: "Show alternative belts", variant: "outlined", icon: null },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 566,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "outlined",
            size: CONTENT_W,
            size2: 100,
            icon: "help_outline",
            label: "Frequently Asked Questions",
            supporting: "Learn about international duties, bespoke alterations & return labels.",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 680,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "textField",
            size: CONTENT_W,
            label: "Type your message to Elena...",
            supporting: "Supports image attachments & style links",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 764,
        axis: "x",
        items: [
          { id: uid(), kind: "button", variant: "filled", size: HALF_W, size2: 48, icon: "send", label: "Send Message" },
          { id: uid(), kind: "button", variant: "outlined", size: HALF_W, size2: 48, icon: "call", label: "Voice Call" },
        ],
      });
      break;
    }

    // =========================================================================
    // 29. CUSTOMER REVIEWS & PHOTO GRID ACTIVITY
    // =========================================================================
    case "review_ratings_gallery_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Customer Reviews & Photos", icon: "arrow_back", icon2: "filter_list", size: W, variant: "filled",
          },
        ],
      });
      // Rating Summary Hero at Y: 76 (H: 120)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "filled",
            fill: "primaryContainer",
            size: CONTENT_W,
            size2: 120,
            icon: "star",
            label: "4.9 out of 5.0 Rating",
            supporting: "Based on 1,840 verified buyer reviews\n98% of customers recommend Apex collections\n5 Stars (92%) · 4 Stars (6%) · 3 Stars (2%)",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 208,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "tabs",
            label: "",
            icon: null,
            variant: "filled",
            size: CONTENT_W,
            tabs: [{ icon: "star", label: "All Reviews (1,840)" }, { icon: "photo_camera", label: "With Photos (420)" }, { icon: "verified", label: "Verified Buyers" }],
            selected: 0,
          },
        ],
      });
      const reviews = [
        { src: IMAGES.bomber, label: "★★★★★ Matteo K. · Verified Buyer", sub: "The leather quality on the bomber jacket is unbelievable! Soft yet rugged, fits true to size. Delivery took only 2 days to NYC." },
        { src: IMAGES.sneakers, label: "★★★★★ Sarah L. · Verified Buyer", sub: "Most comfortable sneakers I have owned in years. Wore them for 12 hours in Paris with zero fatigue. Getting the red pair next!" },
        { src: IMAGES.leatherBag, label: "★★★★★ David P. · Verified Buyer", sub: "The Milano saddle bag exceeded all expectations. Brass hardware is heavy and durable. Truly luxury tier craftsmanship." },
      ];
      reviews.forEach((rv, idx) => {
        groups.push({
          id: uid(),
          x: frameX + M,
          y: frameY + 268 + idx * 142,
          axis: "x",
          items: [
            {
              id: uid(),
              kind: "card", icon: null,
              variant: "outlined",
              size: CONTENT_W,
              size2: 130,
              imagePos: "leading",
              imageSize: 96,
              src: rv.src,
              label: rv.label,
              supporting: rv.sub,
            },
          ],
        });
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 694,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "button",
            variant: "filled",
            size: CONTENT_W,
            size2: 56,
            icon: "rate_review",
            label: "Write a Verified Customer Review",
          },
        ],
      });
      groups.push(makeBottomNav(1));
      break;
    }

    // =========================================================================
    // 30. CATEGORY DIRECTORY & FILTER ACTIVITY
    // =========================================================================
    case "category_mega_menu_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "Shop Categories", icon: "arrow_back", icon2: "search", size: W, variant: "filled",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "searchBar",
            label: "Search departments, brands & collections...",
            icon: "search",
            icon2: "tune",
            size: CONTENT_W,
          },
        ],
      });
      // Row 1 at Y: 144 (H: 180)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 144,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 180,
            src: IMAGES.model1,
            imagePos: "top",
            imageSize: 110,
            label: "Women's Fashion",
            supporting: "1,240 styles · Dresses & Coats",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 180,
            src: IMAGES.hoodie,
            imagePos: "top",
            imageSize: 110,
            label: "Men's Fashion",
            supporting: "980 styles · Jackets & Knitwear",
          },
        ],
      });
      // Row 2 at Y: 336 (H: 180)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 336,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 180,
            src: IMAGES.leatherBag,
            imagePos: "top",
            imageSize: 110,
            label: "Luxury Leather",
            supporting: "340 styles · Bags & Belts",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 180,
            src: IMAGES.sneakers,
            imagePos: "top",
            imageSize: 110,
            label: "Designer Shoes",
            supporting: "560 styles · Sneakers & Boots",
          },
        ],
      });
      // Row 3 at Y: 528 (H: 180)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 528,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 180,
            src: IMAGES.watch,
            imagePos: "top",
            imageSize: 110,
            label: "Watches & Jewelry",
            supporting: "210 styles · Chronographs",
          },
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "elevated",
            size: HALF_W,
            size2: 180,
            src: IMAGES.sunglasses,
            imagePos: "top",
            imageSize: 110,
            label: "Eyewear & Shades",
            supporting: "190 styles · Titanium UV400",
          },
        ],
      });
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 720,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "tonal",
            size: CONTENT_W,
            size2: 80,
            icon: "percent",
            label: "Seasonal Clearance · Up to 50% OFF",
            supporting: "Browse final markdowns across all category departments",
          },
        ],
      });
      groups.push(makeBottomNav(1));
      break;
    }

    // =========================================================================
    // 31. AR VIRTUAL TRY-ON & QR SCANNER ACTIVITY (Native Camera + Detected Product + CTA)
    // =========================================================================
    case "qr_scanner_ar_tryon_activity": {
      groups.push({
        id: uid(),
        x: frameX,
        y: frameY,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "topAppBar", label: "3D AR Try-On & QR Scanner", icon: "arrow_back", icon2: "flash_on", size: W, variant: "filled",
          },
        ],
      });
      // Native Camera Viewfinder at Y: 76 (H: 380)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 76,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "camera",
            size: CONTENT_W,
            size2: 380,
          },
        ],
      });
      // Detected Product Card at Y: 468 (H: 120)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 468,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card", icon: null,
            variant: "filled",
            fill: "inverseSurface",
            size: CONTENT_W,
            size2: 120,
            imagePos: "leading",
            imageSize: 100,
            src: IMAGES.sneakers,
            label: "Detected: Nike Air Max Pulse 2026",
            supporting: "$159.00 · 3D Mesh Model Ready\nTap Launch to preview on your feet in live AR.",
          },
        ],
      });
      // AR Action Row at Y: 600 (H: 52)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 600,
        axis: "x",
        items: [
          { id: uid(), kind: "button", variant: "filled", size: HALF_W, size2: 52, icon: "view_in_ar", label: "Launch AR Model" },
          { id: uid(), kind: "button", variant: "tonal", size: HALF_W, size2: 52, icon: "shopping_bag", label: "Buy Now · $159" },
        ],
      });
      // Instructions Card at Y: 664 (H: 110)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 664,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "card",
            variant: "outlined",
            size: CONTENT_W,
            size2: 110,
            icon: "help_outline",
            label: "How 3D AR Try-On Works",
            supporting: "1. Point your smartphone camera at your feet\n2. Maintain good lighting\n3. Walk or rotate to view footwear realism from any angle",
          },
        ],
      });
      // Scan Barcode Button at Y: 786 (H: 52)
      groups.push({
        id: uid(),
        x: frameX + M,
        y: frameY + 786,
        axis: "x",
        items: [
          {
            id: uid(),
            kind: "button",
            variant: "filled",
            size: CONTENT_W,
            size2: 52,
            icon: "qr_code_scanner",
            label: "Scan Physical In-Store Barcode",
          },
        ],
      });
      break;
    }

    default:
      return [];
  }

  return groups as Group[];
}
