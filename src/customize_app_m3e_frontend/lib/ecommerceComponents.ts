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
import { buildTodoListAppDoc } from "./todoListAppDoc";
export { buildClothShopFullAppDoc, buildTodoListAppDoc };

export type EcommerceCategoryKey =
  | "gallery"
  | "flatlists"
  | "products"
  | "banners"
  | "navigation"
  | "search"
  | "cart"
  | "details"
  | "shipping"
  | "account"
  | "forms"
  | "reviews"
  | "pricing"
  | "ai"
  | "travel"
  | "health"
  | "productivity"
  | "smarthome"
  | "education"
  | "gaming"
  | "todo";

export type EcommerceCategory = {
  key: EcommerceCategoryKey;
  label: string;
  icon: string;
  description: string;
};

export const ECOMMERCE_CATEGORIES: EcommerceCategory[] = [
  {
    key: "gallery",
    label: "Galleries & Media",
    icon: "photo_library",
    description: "Lookbooks, product swipe carousels, 4-photo grids, story video cards",
  },
  {
    key: "flatlists",
    label: "FlatLists & Steppers",
    icon: "format_list_numbered",
    description: "Interactive flatlists with quantity steppers (- / +), inputs & badges",
  },
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
  {
    key: "forms",
    label: "Interactive Forms & Inputs",
    icon: "edit_note",
    description: "Checkout inputs, custom engraving, gift messages, address forms",
  },
  {
    key: "reviews",
    label: "Reviews & Social Proof",
    icon: "star_rate",
    description: "Customer testimonials, star rating bars, buyer feedback cards, FAQs",
  },
  {
    key: "pricing",
    label: "Pricing & Bundles",
    icon: "payments",
    description: "Bulk wholesale pricing tiers, bundle & save cards, installment plans",
  },
  {
    key: "ai",
    label: "AI & Assistants",
    icon: "smart_toy",
    description: "AI prompt input bar, conversational assistant bubbles, prompt suggestion chips, code blocks",
  },
  {
    key: "travel",
    label: "Travel & Food Delivery",
    icon: "flight_takeoff",
    description: "Boarding pass cards, live rider food ETA tracker, menu dish cards, hotel booking previews, ride hail selectors",
  },
  {
    key: "health",
    label: "Health & Fitness",
    icon: "favorite",
    description: "ECG live heartbeat monitors, sleep stage cards, hydration meters, medication reminders, daily step counters",
  },
  {
    key: "productivity",
    label: "Productivity & Tasks",
    icon: "checklist",
    description: "Kanban priority cards, checklist todo items, meeting calendar event cards, file attachments, sticky notes",
  },
  {
    key: "smarthome",
    label: "Smart Home & IoT",
    icon: "home_iot_device",
    description: "Circular thermostat dials, ambient lighting brightness controls, appliance status cards, security camera feeds",
  },
  {
    key: "education",
    label: "Education & Learning",
    icon: "school",
    description: "Course chapter progress bars, interactive quiz questions, language flashcard viewers, verified diploma badges",
  },
  {
    key: "gaming",
    label: "Gaming & Rewards",
    icon: "sports_esports",
    description: "Ranked player leaderboard rows, achievement trophy badges, daily flame streak widgets, RPG equipment inventory slots",
  },
  {
    key: "todo",
    label: "Todo & Tasks (CRUD)",
    icon: "checklist",
    description: "Write, read, edit & delete tasks with image covers, checklists, and progress metrics",
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
  // 1. GALLERIES & MEDIA
  {
    id: "ecom_gallery_hero_carousel",
    title: "Product Hero Image Gallery (Swipe Carousel)",
    category: "gallery",
    icon: "view_carousel",
    badge: "Gallery",
    desc: "4-card swipeable product carousel: front view, side angle, fabric detail & on-model fit",
    buildItems: () => [
      {
        id: uid(),
        kind: "carousel",
        label: "Air Max Pulse 2026 Gallery",
        variant: "elevated",
        size: 380,
        size2: 240,
        layout: "uncontained",
        count: 4,
        tabs: [
          {
            label: "1/4 Front View",
            icon: "crop_portrait",
            src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
          },
          {
            label: "2/4 Side Profile",
            icon: "crop_portrait",
            src: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&auto=format&fit=crop&q=80",
          },
          {
            label: "3/4 Grip Sole",
            icon: "crop_portrait",
            src: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80",
          },
          {
            label: "4/4 On-Feet Fit",
            icon: "crop_portrait",
            src: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80",
          },
        ],
        note: "Swipeable product image carousel with high-res photography",
      },
    ],
  },
  {
    id: "ecom_gallery_lookbook_editorial",
    title: "Fashion Lookbook Gallery (Editorial Carousel)",
    category: "gallery",
    icon: "auto_stories",
    badge: "Lookbook",
    desc: "Multi-browse editorial lookbook cards with Tokyo, Paris & London streetwear sets",
    buildItems: () => [
      {
        id: uid(),
        kind: "carousel",
        label: "Atelier Autumn Lookbook",
        variant: "filled",
        size: 380,
        size2: 260,
        layout: "multi-browse",
        count: 3,
        tabs: [
          {
            label: "Set 01 · Tokyo Neon Street",
            icon: "style",
            src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
          },
          {
            label: "Set 02 · Paris Minimal Trench",
            icon: "style",
            src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80",
          },
          {
            label: "Set 03 · London Urban Denim",
            icon: "style",
            src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80",
          },
        ],
        note: "Editorial fashion lookbook multi-browse carousel",
      },
    ],
  },
  {
    id: "ecom_gallery_thumbnail_quad",
    title: "2-Column Multi-Angle Photo Grid",
    category: "gallery",
    icon: "grid_view",
    badge: "Quad Grid",
    axis: "x",
    desc: "Side-by-side product detail shots: front, angle, fabric close-up & packaging",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Front Profile",
        supporting: "Studio Light · 100% Cotton",
        variant: "outlined",
        size: 184,
        imagePos: "top",
        imageSize: 120,
        src: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: uid(),
        kind: "card",
        label: "Model Wearing",
        supporting: "Size M · 182cm Tall",
        variant: "outlined",
        size: 184,
        imagePos: "top",
        imageSize: 120,
        src: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "ecom_gallery_customer_ugc",
    title: "Customer UGC Real Photos Gallery",
    category: "gallery",
    icon: "photo_camera",
    badge: "UGC",
    desc: "Scrollable gallery of real customer snapshots with verified purchase tags",
    buildItems: () => [
      {
        id: uid(),
        kind: "carousel",
        label: "Customer Real Fits",
        variant: "tonal",
        size: 380,
        size2: 200,
        layout: "uncontained",
        count: 3,
        tabs: [
          {
            label: "Sarah K. · ★★★★★ True to size",
            icon: "verified",
            src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
          },
          {
            label: "Marcus L. · ★★★★★ Premium fabric",
            icon: "verified",
            src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
          },
          {
            label: "Elena R. · ★★★★★ Fast shipping",
            icon: "verified",
            src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80",
          },
        ],
      },
    ],
  },
  {
    id: "ecom_gallery_video_story_card",
    title: "Video Reel / Try-On Highlights Card",
    category: "gallery",
    icon: "smart_display",
    badge: "Video",
    desc: "Short video preview card with play button, 28.4k views, and try-on tag",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "▶ Watch 15s Try-On Video & Styling Guide",
        supporting: "28.4k views · Sizing advice from Atelier Stylist Sophie",
        icon: "play_circle",
        variant: "filled",
        fill: "secondaryContainer",
        size: 380,
        imagePos: "top",
        imageSize: 150,
        src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "ecom_gallery_360_viewer",
    title: "360° Interactive Product Showcase",
    category: "gallery",
    icon: "360",
    badge: "360°",
    desc: "360-degree turntable viewer with interactive rotation and zoom controls",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "🔄 360° Interactive Studio Turntable",
        supporting: "Swipe left or right to inspect full 360° view · HD Zoom enabled",
        icon: "rotate_right",
        variant: "elevated",
        size: 380,
        imagePos: "top",
        imageSize: 180,
        src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },

  // 2. FLATLISTS & STEPPERS
  {
    id: "ecom_flatlist_cart_stepper_input",
    title: "Cart Item FlatList (+/- Stepper & Note Input)",
    category: "flatlists",
    icon: "shopping_cart_checkout",
    badge: "Cart Qty",
    desc: "Interactive cart row with product photo, price, quantity counter, and note field",
    buildItems: () => [
      {
        id: uid(),
        kind: "listItem",
        label: "Nike Air Max Pulse",
        supporting: "$159.00 · Size 10 · Black/White",
        src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=80",
        count: 1,
        placeholder: "Gift note...",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_flatlist_inventory_counter",
    title: "Inventory Stock Counter FlatList",
    category: "flatlists",
    icon: "inventory_2",
    badge: "Stock",
    desc: "Warehouse SKU inventory manager with live count stepper and stock status badge",
    buildItems: () => [
      {
        id: uid(),
        kind: "listItem",
        label: "Heavyweight Boxy Tee (Jet Black)",
        supporting: "SKU-9941 · Shelf A4 · Restock threshold: 10",
        icon: "inventory",
        badge: "In Stock",
        count: 24,
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_flatlist_custom_order_spec",
    title: "Custom Order Specification FlatList (Input & Qty)",
    category: "flatlists",
    icon: "tune",
    badge: "Custom",
    desc: "Tailored apparel row with monogram text input and quantity stepper",
    buildItems: () => [
      {
        id: uid(),
        kind: "listItem",
        label: "Bespoke Oxford Cotton Shirt",
        supporting: "$120.00 · 100% Egyptian Cotton · Collar Size 16",
        src: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=200&auto=format&fit=crop&q=80",
        count: 2,
        placeholder: "Monogram (e.g. JD)",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_flatlist_discount_voucher",
    title: "Promo Voucher FlatList (Code Input & Apply)",
    category: "flatlists",
    icon: "loyalty",
    badge: "Coupon",
    desc: "Coupon voucher row with interactive promo code input and discount percentage badge",
    buildItems: () => [
      {
        id: uid(),
        kind: "listItem",
        label: "Extra 20% OFF Orders $100+",
        supporting: "Voucher active · Applies at checkout",
        icon: "confirmation_number",
        badge: "-20% OFF",
        placeholder: "PROMO CODE",
        icon2: "check_circle",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_flatlist_checklist_tasks",
    title: "Order Fulfillment Checklist FlatList",
    category: "flatlists",
    icon: "checklist",
    badge: "Checklist",
    desc: "Order packing checklist with toggle switch, item count, and barcode note",
    buildItems: () => [
      {
        id: uid(),
        kind: "listItem",
        label: "Pack Premium Gift Presentation Box",
        supporting: "Verified by Scanner · Ready for Courier",
        icon: "check_box",
        count: 3,
        switch: true,
        checked: true,
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_flatlist_review_feedback",
    title: "Customer Review FlatList (Rating Stepper & Input)",
    category: "flatlists",
    icon: "rate_review",
    badge: "Rating",
    desc: "Customer review row with 5-star count stepper and feedback input comment field",
    buildItems: () => [
      {
        id: uid(),
        kind: "listItem",
        label: "Fit, Sizing & Comfort Rating",
        supporting: "Score: 5 / 5 Stars · Verified Purchase",
        icon: "star",
        count: 5,
        placeholder: "Write comment...",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_flatlist_tip_donation",
    title: "Courier Gratuity FlatList (+/- Tip Counter)",
    category: "flatlists",
    icon: "volunteer_activism",
    badge: "Tip",
    desc: "Courier delivery tip row with interactive dollar counter and custom note field",
    buildItems: () => [
      {
        id: uid(),
        kind: "listItem",
        label: "Add Driver Tip ($)",
        supporting: "100% of tips go directly to your delivery driver",
        icon: "payments",
        count: 5,
        placeholder: "Thanks note...",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_flatlist_bulk_pricing_tier",
    title: "B2B Bulk Wholesale Tier FlatList (MOQ & Qty)",
    category: "flatlists",
    icon: "production_quantity_limits",
    badge: "B2B MOQ",
    desc: "Wholesale pricing tier row with minimum order quantity count (MOQ: 50) and unit discount",
    buildItems: () => [
      {
        id: uid(),
        kind: "listItem",
        label: "Wholesale Tier: 50+ Units",
        supporting: "$18.50 / unit (Regular: $29.00 · Save 36%)",
        icon: "corporate_fare",
        badge: "MOQ: 50",
        count: 50,
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },

  // 3. PRODUCTS & GRIDS
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

  // 9. INTERACTIVE FORMS & INPUTS
  {
    id: "ecom_form_address_complete",
    title: "Complete Delivery Address Form",
    category: "forms",
    icon: "home",
    badge: "Address",
    desc: "3-input address block: Street Address, Apt/Suite & City/Zip",
    buildItems: () => [
      {
        id: uid(),
        kind: "textField",
        label: "Street Address",
        placeholder: "742 Evergreen Terrace",
        icon: "location_on",
        variant: "outlined",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_form_credit_card_input",
    title: "Credit / Debit Card Checkout Input",
    category: "forms",
    icon: "credit_card",
    badge: "Card Input",
    desc: "16-digit card number input with security icon and bank badge",
    buildItems: () => [
      {
        id: uid(),
        kind: "textField",
        label: "Card Number",
        placeholder: "•••• •••• •••• 4242",
        icon: "credit_card",
        icon2: "lock",
        variant: "outlined",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_form_gift_message",
    title: "Personalized Gift Message & Ribbon Box",
    category: "forms",
    icon: "card_giftcard",
    badge: "Gift Note",
    desc: "Gift message form with greeting card note input and gift ribbon badge",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "🎁 Add Complimentary Gift Box & Card",
        supporting: "Includes signature satin ribbon packaging and printed message card",
        icon: "card_giftcard",
        badge: "Gift Wrap",
        variant: "tonal",
        fill: "secondaryContainer",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_form_phone_otp_verification",
    title: "Mobile Phone & SMS Verification Input",
    category: "forms",
    icon: "sms",
    badge: "Phone OTP",
    desc: "International dial phone input field with SMS code verification trigger",
    buildItems: () => [
      {
        id: uid(),
        kind: "textField",
        label: "Mobile Number",
        placeholder: "+1 (555) 019-2834",
        icon: "phone",
        icon2: "send",
        variant: "outlined",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_form_order_feedback",
    title: "Courier Drop-Off & Delivery Instructions",
    category: "forms",
    icon: "comment",
    badge: "Notes",
    desc: "Special delivery instructions input (Gate code, leave at porch, ring bell)",
    buildItems: () => [
      {
        id: uid(),
        kind: "textField",
        label: "Delivery Instructions",
        placeholder: "e.g. Gate code #4921, leave package by porch",
        icon: "edit_note",
        variant: "filled",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_form_subscribe_newsletter",
    title: "VIP Club 15% OFF Newsletter Signup",
    category: "forms",
    icon: "mark_email_read",
    badge: "15% OFF",
    desc: "Newsletter subscription card with email input and welcome discount",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Join Atelier VIP & Save 15%",
        supporting: "Be first to receive private drops, sales & runway invitations",
        icon: "auto_awesome",
        badge: "VIP Club",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
      },
    ],
  },

  // 10. REVIEWS & SOCIAL PROOF
  {
    id: "ecom_reviews_rating_breakdown",
    title: "Customer Rating 4.8 ★ Star Breakdown Card",
    category: "reviews",
    icon: "star_half",
    badge: "Ratings",
    desc: "4.8 out of 5 rating summary with 1,240 verified reviews badge",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "4.8 ★ Overall Customer Rating",
        supporting: "Based on 1,240 verified purchases · 96% recommend this item\n★★★★★  (88%)\n★★★★☆  (9%)\n★★★☆☆  (3%)",
        icon: "star",
        badge: "96% Recommend",
        variant: "tonal",
        fill: "surfaceContainerHigh",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_reviews_verified_buyer_card",
    title: "Verified Buyer Testimonial Card",
    category: "reviews",
    icon: "verified",
    badge: "Review",
    desc: "Detailed review card with customer avatar, 5 stars, and fit feedback",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Chloe D. · Verified Buyer ★★★★★",
        supporting: "“The quality of this fabric exceeded my expectations. Sizing is spot on and it looks even better in person!” · 42 found helpful",
        icon: "thumb_up",
        badge: "Verified Buyer",
        variant: "outlined",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_reviews_faq_accordion",
    title: "Store FAQ & Return Policy Tile",
    category: "reviews",
    icon: "help_outline",
    badge: "FAQ",
    desc: "Helpful store FAQs: Free 30-day returns, worldwide shipping & fit guarantee",
    buildItems: () => [
      {
        id: uid(),
        kind: "listItem",
        label: "Free 30-Day Returns & Exchanges",
        supporting: "Prepaid return label included in every box",
        icon: "assignment_return",
        icon2: "expand_more",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_reviews_trust_badges_strip",
    title: "3-in-1 Authenticity & Trust Badges Strip",
    category: "reviews",
    icon: "security",
    badge: "Trust",
    desc: "100% Authentic, 256-bit SSL encrypted checkout, and Money-Back Guarantee",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "🛡️ Atelier Buyer Protection & Security",
        supporting: "✓ 100% Guaranteed Authentic  ✓ SSL 256-Bit Encrypted  ✓ Money Back Guarantee",
        icon: "verified_user",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },

  // 11. PRICING & BUNDLES
  {
    id: "ecom_pricing_bulk_discount_table",
    title: "Tiered Volume Discount Table Card",
    category: "pricing",
    icon: "table_chart",
    badge: "Volume",
    desc: "Volume pricing: Buy 1 ($35), Buy 3 ($90 / save 15%), Buy 5 ($130 / save 25%)",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "🏷️ Multi-Buy Volume Discounts",
        supporting: "• Buy 1 item: $35.00 each (Regular)\n• Buy 3 items: $30.00 each (Save 15%)\n• Buy 5+ items: $26.00 each (Save 25% Best Value)",
        icon: "savings",
        badge: "Up to 25% OFF",
        variant: "tonal",
        fill: "secondaryContainer",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_pricing_installment_bnpl",
    title: "Buy Now Pay Later Installment Card (Klarna / Afterpay)",
    category: "pricing",
    icon: "payments",
    badge: "BNPL",
    desc: "4 interest-free installments of $39.75 with Klarna or Afterpay (No extra fee)",
    buildItems: () => [
      {
        id: uid(),
        kind: "listItem",
        label: "4 Interest-Free Payments of $39.75",
        supporting: "Pay every 2 weeks with Klarna or Afterpay · 0% APR",
        icon: "credit_score",
        badge: "0% APR",
        icon2: "chevron_right",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_pricing_subscription_save",
    title: "Subscribe & Save 15% Monthly Delivery Card",
    category: "pricing",
    icon: "autorenew",
    badge: "Save 15%",
    desc: "Recurring delivery option: One-time purchase vs Auto-ship every 30 days (-15% OFF)",
    buildItems: () => [
      {
        id: uid(),
        kind: "listItem",
        label: "Subscribe & Save 15% (Monthly)",
        supporting: "Auto-delivered every 30 days · Cancel or skip anytime",
        icon: "autorenew",
        badge: "-15% Auto",
        switch: true,
        checked: true,
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },

  // 12. MORE PRODUCTS, NAVIGATION, CART, DETAILS & SHIPPING
  {
    id: "ecom_product_card_wishlist",
    title: "Trending Product Card with Floating Heart",
    category: "products",
    icon: "favorite",
    badge: "Trending",
    desc: "Elevated product card with floating red heart wishlist action and best seller tag",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Classic Tailored Wool Trench Coat",
        supporting: "$280.00 · ★ 4.9 (512 reviews) · Sand Beige",
        icon: "shopping_bag",
        icon2: "favorite",
        icon2Fill: true,
        badge: "Best Seller",
        variant: "elevated",
        size: 380,
        imagePos: "top",
        imageSize: 180,
        src: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "ecom_product_bundle_save",
    title: "Bundle & Save 3-Piece Kit Card",
    category: "products",
    icon: "all_inclusive",
    badge: "Bundle",
    desc: "Coordinated streetwear bundle (Jacket + Cargo Pants + Cap) with combined savings",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Urban Explorer Complete 3-Piece Set",
        supporting: "Includes Parka + Cargo Pants + Beanie · $210 (Save $65)",
        icon: "checkroom",
        badge: "Save $65",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
        imagePos: "top",
        imageSize: 160,
        src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "ecom_product_grid_mini_triple",
    title: "Dense 3-Column Marketplace Mini-Grid",
    category: "products",
    icon: "view_compact",
    badge: "Mini Grid",
    axis: "x",
    desc: "Three compact product cards in a row for high-density flash sale catalogs",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Beanie",
        supporting: "$25.00",
        variant: "outlined",
        size: 122,
        imagePos: "top",
        imageSize: 90,
        src: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=300&auto=format&fit=crop&q=80",
      },
      {
        id: uid(),
        kind: "card",
        label: "Socks (3pk)",
        supporting: "$18.00",
        variant: "outlined",
        size: 122,
        imagePos: "top",
        imageSize: 90,
        src: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=300&auto=format&fit=crop&q=80",
      },
      {
        id: uid(),
        kind: "card",
        label: "Scarf",
        supporting: "$35.00",
        variant: "outlined",
        size: 122,
        imagePos: "top",
        imageSize: 90,
        src: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "ecom_product_horizontal_reorder",
    title: "Fast 1-Tap Reorder Product Tile",
    category: "products",
    icon: "repeat",
    badge: "Reorder",
    desc: "Horizontal product row with previous order date and instant 1-tap reorder action",
    buildItems: () => [
      {
        id: uid(),
        kind: "listItem",
        label: "Heavyweight Boxy Tee (Black)",
        supporting: "Ordered Sep 18 · $38.00 · Tap to reorder",
        src: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&auto=format&fit=crop&q=80",
        icon2: "replay",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_banner_free_shipping_ribbon",
    title: "Free Express Shipping Countdown Banner",
    category: "banners",
    icon: "local_shipping",
    badge: "Free Ship",
    desc: "Eye-catching banner with shipping guarantee and dispatch time",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "🚚 FREE Express Shipping on Orders Over $75",
        supporting: "Order within the next 2 hrs for guaranteed same-day dispatch",
        icon: "bolt",
        variant: "filled",
        fill: "secondaryContainer",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_banner_flash_sale_ticker",
    title: "Flash Sale 50% OFF Urgent Ticker Banner",
    category: "banners",
    icon: "local_fire_department",
    badge: "-50% OFF",
    desc: "High-urgency promotional ticker with flame icon and bold discount code",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "🔥 MID-SEASON SALE · UP TO 50% OFF",
        supporting: "Use code FLASH50 at checkout · Limited stock available",
        icon: "local_fire_department",
        badge: "Ends Tonight",
        variant: "tonal",
        fill: "primaryContainer",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_nav_story_bubbles",
    title: "Category Story Avatars Strip (Instagram Style)",
    category: "navigation",
    icon: "motion_photos_on",
    badge: "Stories",
    axis: "x",
    desc: "Circular category story avatar chips: New In, Trending, Footwear, Hoodies",
    buildItems: () => [
      {
        id: uid(),
        kind: "chip",
        label: "✨ New In",
        icon: "auto_awesome",
        variant: "elevated",
        size: 90,
      },
      {
        id: uid(),
        kind: "chip",
        label: "🔥 Sale",
        icon: "local_fire_department",
        variant: "filled",
        size: 90,
      },
      {
        id: uid(),
        kind: "chip",
        label: "👟 Shoes",
        icon: "steps",
        variant: "outlined",
        size: 90,
      },
      {
        id: uid(),
        kind: "chip",
        label: "🧥 Jackets",
        icon: "checkroom",
        variant: "outlined",
        size: 90,
      },
    ],
  },
  {
    id: "ecom_nav_sticky_header_cart",
    title: "Sticky Store Header with Cart Count Badge",
    category: "navigation",
    icon: "shopping_bag",
    badge: "Header",
    desc: "Top bar with store logo, search icon, and shopping bag with count '3'",
    buildItems: () => [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Atelier Apparel",
        icon: "menu",
        icon2: "shopping_bag",
        variant: "filled",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_nav_pill_tabs_segmented",
    title: "Segmented Category Pill Filter Tabs",
    category: "navigation",
    icon: "tab",
    badge: "Pills",
    desc: "Category tab switcher: All, Best Sellers, New Arrivals, Clearance",
    buildItems: () => [
      {
        id: uid(),
        kind: "tabs",
        label: "",
        icon: null,
        variant: "filled",
        size: 380,
        tabs: [
          { icon: "apps", label: "All" },
          { icon: "star", label: "Best Sellers" },
          { icon: "new_releases", label: "New Drops" },
          { icon: "percent", label: "Clearance" },
        ],
        selected: 0,
      },
    ],
  },
  {
    id: "ecom_nav_floating_cart_bar",
    title: "Floating Bottom Quick-Cart Checkout Bar",
    category: "navigation",
    icon: "shopping_basket",
    badge: "Floating",
    desc: "Sticky bottom floating bar showing 3 items ($189.00) and 'Proceed to Checkout →'",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "3 Items · $189.00 Total",
        supporting: "Tap to view cart and proceed to express checkout →",
        icon: "shopping_cart",
        badge: "3 Items",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_search_voice_camera_bar",
    title: "Smart Search Bar with Camera & Voice Input",
    category: "search",
    icon: "search",
    badge: "Voice/Cam",
    desc: "Search field with camera visual search icon and voice dictation trigger",
    buildItems: () => [
      {
        id: uid(),
        kind: "searchBar",
        label: "Search sneakers, apparel, brands...",
        icon: "search",
        icon2: "mic",
        icon3: "photo_camera",
        variant: "filled",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_search_multi_tag_filters",
    title: "Multi-Select Filter Chips Strip",
    category: "search",
    icon: "filter_list",
    badge: "Filter Chips",
    axis: "x",
    desc: "Quick category filter chips: Men, Women, Outerwear, Under $100",
    buildItems: () => [
      {
        id: uid(),
        kind: "chip",
        label: "Men's",
        icon: "check",
        checked: true,
        variant: "filled",
        size: 88,
      },
      {
        id: uid(),
        kind: "chip",
        label: "Under $100",
        icon: "attach_money",
        variant: "outlined",
        size: 104,
      },
      {
        id: uid(),
        kind: "chip",
        label: "In Stock",
        icon: "inventory_2",
        checked: true,
        variant: "filled",
        size: 92,
      },
      {
        id: uid(),
        kind: "chip",
        label: "★ 4.5+",
        icon: "star",
        variant: "outlined",
        size: 82,
      },
    ],
  },
  {
    id: "ecom_cart_order_summary_breakdown",
    title: "Itemized Order Cost Breakdown Card",
    category: "cart",
    icon: "receipt_long",
    badge: "Breakdown",
    desc: "Subtotal $189.00, Shipping $0, Tax $15.12, Discount -$20.00, Total $184.12",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Order Summary · Total: $184.12",
        supporting: "• Subtotal (3 items): $189.00\n• Express Shipping: FREE ($0.00)\n• Estimated Sales Tax: $15.12\n• Coupon 'AUTUMN26': -$20.00",
        icon: "receipt",
        badge: "Paid in Full",
        variant: "tonal",
        fill: "surfaceContainerHigh",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_cart_free_shipping_progress",
    title: "Free Shipping Progress Tracker Bar",
    category: "cart",
    icon: "local_shipping",
    badge: "Free Ship",
    desc: "Linear progress bar indicating '$11.00 away from FREE Express Shipping!'",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "🎉 You're only $11.00 away from FREE Shipping!",
        supporting: "Add one more accessory or socks to unlock free delivery",
        icon: "local_shipping",
        badge: "85% Reached",
        variant: "filled",
        fill: "secondaryContainer",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_cart_delivery_slot_picker",
    title: "Scheduled Delivery Slot (Date & Time Window)",
    category: "cart",
    icon: "calendar_today",
    badge: "Slot Window",
    desc: "Delivery time window selector: Tomorrow, 2:00 PM - 5:00 PM (Confirmed)",
    buildItems: () => [
      {
        id: uid(),
        kind: "listItem",
        label: "Tomorrow · 2:00 PM – 5:00 PM",
        supporting: "Guaranteed express delivery window · Courier tracking enabled",
        icon: "schedule",
        badge: "Selected",
        icon2: "check_circle",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_cart_order_success_card",
    title: "Order Placed Successfully Celebration Card",
    category: "cart",
    icon: "check_circle",
    badge: "Success",
    desc: "Celebration confirmation with Order #APX-4912, ETA Oct 16, and tracking button",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "✓ Order Placed! #APX-49128",
        supporting: "Thank you for your purchase! We've sent the confirmation to your email. Estimated arrival: Oct 16.",
        icon: "task_alt",
        badge: "Confirmed",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_detail_color_palette_swatches",
    title: "Circular Color Swatches Selector Row",
    category: "details",
    icon: "palette",
    badge: "Colors",
    axis: "x",
    desc: "5-color circle swatch chips: Onyx Black, Indigo, Olive, Wine Red & Chalk",
    buildItems: () => [
      {
        id: uid(),
        kind: "chip",
        label: "● Black",
        checked: true,
        variant: "filled",
        size: 78,
      },
      {
        id: uid(),
        kind: "chip",
        label: "● Navy",
        variant: "outlined",
        size: 74,
      },
      {
        id: uid(),
        kind: "chip",
        label: "● Olive",
        variant: "outlined",
        size: 74,
      },
      {
        id: uid(),
        kind: "chip",
        label: "● Crimson",
        variant: "outlined",
        size: 84,
      },
      {
        id: uid(),
        kind: "chip",
        label: "● Chalk",
        variant: "outlined",
        size: 74,
      },
    ],
  },
  {
    id: "ecom_detail_clothing_size_picker",
    title: "Clothing Size Button Row (XS to XXL)",
    category: "details",
    icon: "straighten",
    badge: "Sizes",
    axis: "x",
    desc: "Size selector row with XS, S, M, L, XL, XXL buttons and size guide link",
    buildItems: () => [
      {
        id: uid(),
        kind: "chip",
        label: "XS",
        variant: "outlined",
        size: 58,
      },
      {
        id: uid(),
        kind: "chip",
        label: "S",
        variant: "outlined",
        size: 58,
      },
      {
        id: uid(),
        kind: "chip",
        label: "M",
        checked: true,
        variant: "filled",
        size: 58,
      },
      {
        id: uid(),
        kind: "chip",
        label: "L",
        variant: "outlined",
        size: 58,
      },
      {
        id: uid(),
        kind: "chip",
        label: "XL",
        variant: "outlined",
        size: 58,
      },
      {
        id: uid(),
        kind: "chip",
        label: "XXL",
        variant: "outlined",
        size: 62,
      },
    ],
  },
  {
    id: "ecom_detail_specs_table",
    title: "Fabric Care & Specifications Card",
    category: "details",
    icon: "subject",
    badge: "Specs",
    desc: "Material: 100% Organic Pima Cotton · Fit: Relaxed Drop-Shoulder · Made in Portugal",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Fabric Composition & Garment Care",
        supporting: "• Material: 100% Organic Pima Cotton (240 GSM)\n• Fit: Relaxed Drop-Shoulder Silhouette\n• Care: Machine wash cold, hang dry\n• Origin: Crafted ethically in Porto, Portugal",
        icon: "verified",
        variant: "outlined",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_detail_frequently_bought_together",
    title: "Frequently Bought Together Cross-Sell Bundle",
    category: "details",
    icon: "add_shopping_cart",
    badge: "Bundle",
    desc: "Frequently bought together: Heavyweight Tee + Slim Raw Denim Jeans ($180 combo)",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Frequently Bought Together",
        supporting: "Tee ($38) + Raw Denim ($160) · Total: $178 (Save $20 when bought together)",
        icon: "shopping_basket",
        badge: "Save $20",
        variant: "filled",
        fill: "secondaryContainer",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_shipping_live_map_courier",
    title: "Live Courier Delivery Map Card",
    category: "shipping",
    icon: "near_me",
    badge: "Live ETA",
    desc: "Live delivery map card with courier vehicle icon, ETA '14 mins away', and call button",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "🚚 Courier Nearby · Arriving in 14 Mins",
        supporting: "Driver Dave is 3 stops away with your package · Live GPS Tracking",
        icon: "navigation",
        badge: "On the way",
        variant: "filled",
        fill: "primaryContainer",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_shipping_express_options",
    title: "Shipping Method Selector (Standard vs Express)",
    category: "shipping",
    icon: "speed",
    badge: "Options",
    desc: "Compare Standard (3-5 days $0), Express (1-2 days $9), and Same-Day Courier ($19)",
    buildItems: () => [
      {
        id: uid(),
        kind: "listItem",
        label: "Express Air Delivery (1-2 Days)",
        supporting: "$9.00 · Delivery by Wednesday 3 PM · Real-time SMS tracking",
        icon: "flight",
        badge: "Fastest",
        icon2: "radio_button_checked",
        variant: "filled",
        fill: "surfaceContainerLow",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_account_loyalty_tier_progress",
    title: "VIP Loyalty Tier Level Progression Bar",
    category: "account",
    icon: "military_tech",
    badge: "VIP Tier",
    desc: "Points progress: '750 / 1,000 points to Diamond VIP tier (Extra 20% discount)'",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "👑 Gold Tier Member · 750 / 1,000 Pts",
        supporting: "250 points needed to unlock Diamond VIP perks (Free 2-day shipping & 20% off drops)",
        icon: "workspace_premium",
        badge: "Gold VIP",
        variant: "filled",
        fill: "secondaryContainer",
        size: 380,
      },
    ],
  },
  {
    id: "ecom_account_saved_addresses_card",
    title: "Saved Delivery Address with Default Badge",
    category: "account",
    icon: "pin_drop",
    badge: "Default",
    desc: "Saved home address card with recipient name, street, phone number, and edit button",
    buildItems: () => [
      {
        id: uid(),
        kind: "card",
        label: "Home · Alex Morgan (Default)",
        supporting: "742 Evergreen Terrace, Apt 4B\nSpringfield, OR 97477 · +1 (555) 019-2834",
        icon: "home",
        icon2: "edit",
        badge: "Default",
        variant: "outlined",
        size: 380,
      },
    ],
  },

  // 14. AI & ASSISTANTS
  {
    id: "preset_ai_prompt_assistant",
    title: "AI Chat Assistant & Prompt Bar",
    category: "ai",
    icon: "smart_toy",
    badge: "AI 4.0",
    desc: "Complete AI conversation interface with GPT-4o prompt input and quick action suggestion pills",
    axis: "y",
    buildItems: () => [
      makeItem("aiPromptInput", 380),
      makeItem("aiSuggestionsRow", 380),
      makeItem("aiMessageBubble", 380),
    ],
  },
  {
    id: "preset_ai_code_generator",
    title: "AI Code Snippet & Review Block",
    category: "ai",
    icon: "code",
    badge: "Syntax",
    desc: "Developer code container with syntax highlighting tokens, copy button, and response notes",
    axis: "y",
    buildItems: () => [
      makeItem("codeSnippetBlock", 380),
    ],
  },

  // 15. TRAVEL & FOOD DELIVERY
  {
    id: "preset_travel_flight_boarding_pass",
    title: "Airline Boarding Pass & Route Card",
    category: "travel",
    icon: "flight_takeoff",
    badge: "Flight",
    desc: "AeroSky boarding pass with JFK to NRT route, seat 14A, gate B22, and passenger details",
    axis: "y",
    buildItems: () => [
      makeItem("boardingPassCard", 380),
    ],
  },
  {
    id: "preset_travel_food_delivery_tracker",
    title: "Real-time Food Delivery & Rider ETA",
    category: "travel",
    icon: "two_wheeler",
    badge: "Live ETA",
    desc: "Live food courier tracker with 18-min delivery progress bar, driver contact buttons",
    axis: "y",
    buildItems: () => [
      makeItem("foodDeliveryTracker", 380),
      makeItem("restaurantMenuRow", 380),
    ],
  },
  {
    id: "preset_travel_hotel_ride_booking",
    title: "Hotel Stay & Ride-Hailing Selector",
    category: "travel",
    icon: "hotel",
    badge: "Resort",
    desc: "Luxury hotel preview card with star reviews, amenities, plus on-demand EV ride selector",
    axis: "y",
    buildItems: () => [
      makeItem("hotelBookingCard", 380),
      makeItem("rideVehicleSelector", 380),
    ],
  },

  // 16. HEALTH & FITNESS
  {
    id: "preset_health_vitals_dashboard",
    title: "ECG Heart Rate & Sleep Cycle Tracker",
    category: "health",
    icon: "favorite",
    badge: "Vitals",
    desc: "Live 74 BPM ECG heart monitor wave alongside segmented Deep/REM sleep phase analytics",
    axis: "y",
    buildItems: () => [
      makeItem("heartRateMonitorCard", 380),
      makeItem("sleepTrackerCard", 380),
    ],
  },
  {
    id: "preset_health_hydration_steps",
    title: "Daily Hydration & Step Counter Ring",
    category: "health",
    icon: "water_drop",
    badge: "Fitness",
    desc: "2,500 mL water tracker with +250 mL button, daily 10,000 steps progress ring, medication reminder",
    axis: "y",
    buildItems: () => [
      makeItem("stepCounterCard", 380),
      makeItem("waterIntakeTracker", 380),
      makeItem("medicationReminderTile", 380),
    ],
  },

  // 17. PRODUCTIVITY & TASKS
  {
    id: "preset_productivity_kanban_calendar",
    title: "Kanban Task Card & Calendar Meeting",
    category: "productivity",
    icon: "checklist",
    badge: "Sprint",
    desc: "High priority kanban task card with subtasks count, and Google Meet calendar sync tile",
    axis: "y",
    buildItems: () => [
      makeItem("calendarEventCard", 380),
      makeItem("kanbanCard", 380),
      makeItem("taskChecklistRow", 380),
    ],
  },
  {
    id: "preset_productivity_notes_files",
    title: "Sticky Note Snippet & File Attachment",
    category: "productivity",
    icon: "description",
    badge: "Docs",
    desc: "Quick ideas sticky note card with formatted bullets and downloadable PDF attachment tile",
    axis: "y",
    buildItems: () => [
      makeItem("notesSnippetCard", 380),
      makeItem("fileAttachmentCard", 380),
    ],
  },

  // 18. SMART HOME & IOT
  {
    id: "preset_smarthome_climate_lighting",
    title: "Thermostat Dial & Room Light Dimmer",
    category: "smarthome",
    icon: "home_iot_device",
    badge: "IoT",
    desc: "Circular cooling thermostat temperature dial with ambient color bulb brightness slider",
    axis: "y",
    buildItems: () => [
      makeItem("thermostatDial", 380),
      makeItem("smartLightControl", 380),
      makeItem("deviceStatusTile", 380),
    ],
  },
  {
    id: "preset_smarthome_security_camera",
    title: "Live Security Camera & Motion Feed",
    category: "smarthome",
    icon: "videocam",
    badge: "1080p Live",
    desc: "Darkened live security camera feed with motion detection alert pill and timestamp",
    axis: "y",
    buildItems: () => [
      makeItem("securityCameraFeed", 380),
    ],
  },

  // 19. EDUCATION & LEARNING
  {
    id: "preset_education_course_progress",
    title: "Course Lesson Progress & Certificate",
    category: "education",
    icon: "school",
    badge: "Learn",
    desc: "TypeScript course progress card with play CTA and gold verified completion diploma badge",
    axis: "y",
    buildItems: () => [
      makeItem("courseProgressCard", 380),
      makeItem("certificateBadgeCard", 380),
    ],
  },
  {
    id: "preset_education_quiz_flashcard",
    title: "Interactive Quiz Card & Study Flashcard",
    category: "education",
    icon: "quiz",
    badge: "Quiz",
    desc: "Multiple choice React exam question with options, alongside two-sided vocabulary memorization card",
    axis: "y",
    buildItems: () => [
      makeItem("quizQuestionCard", 380),
      makeItem("flashcardViewer", 380),
    ],
  },

  // 20. GAMING & REWARDS
  {
    id: "preset_gaming_leaderboard_streak",
    title: "Ranked Leaderboard & Daily Fire Streak",
    category: "gaming",
    icon: "sports_esports",
    badge: "Ranked",
    desc: "#1 Grandmaster ranked leaderboard player row with 14-day consecutive login flame streak",
    axis: "y",
    buildItems: () => [
      makeItem("leaderboardRow", 380),
      makeItem("rewardStreakCard", 380),
      makeItem("achievementBadge", 380),
    ],
  },
  {
    id: "preset_gaming_inventory_item",
    title: "Legendary RPG Inventory Item Slot",
    category: "gaming",
    icon: "shield",
    badge: "Mythic",
    desc: "Glowing purple rarity inventory weapon slot with equip status and +320 DEF stat bonus",
    axis: "y",
    buildItems: () => [
      makeItem("inventoryItemSlot", 380),
    ],
  },
  {
    id: "preset_todo_task_card",
    title: "Todo Task Card (Image & CRUD)",
    category: "todo",
    icon: "checklist",
    badge: "CRUD",
    desc: "Interactive task card with image cover, status toggle, priority indicator, and edit trigger",
    axis: "y",
    buildItems: () => [
      makeItem("todoCard", 380),
    ],
  },
  {
    id: "preset_todo_stats_summary",
    title: "Todo Sprint Stats Summary",
    category: "todo",
    icon: "pie_chart",
    badge: "Metrics",
    desc: "Live task completion overview with progress percentage ring and active milestone meters",
    axis: "y",
    buildItems: () => [
      makeItem("todoStatsCard", 380),
    ],
  },
  {
    id: "preset_todo_create_form",
    title: "Create Task Form Card (Write)",
    category: "todo",
    icon: "add_task",
    badge: "Write",
    desc: "Visual task creation card with photo selector, title field, category chips, and priority pills",
    axis: "y",
    buildItems: () => [
      makeItem("todoCreateCard", 380),
    ],
  },
  {
    id: "preset_todo_detail_view",
    title: "Task Details Deep View (Read)",
    category: "todo",
    icon: "preview",
    badge: "Read",
    desc: "Hero cover image read view with subtask checklist, acceptance criteria, and action bar",
    axis: "y",
    buildItems: () => [
      makeItem("todoDetailCard", 380),
    ],
  },
  {
    id: "preset_todo_interactive_suite",
    title: "Interactive Todo Manager (CRUD)",
    category: "todo",
    icon: "task_alt",
    badge: "Suite",
    desc: "Self-contained interactive task manager with live write, read, edit & delete operations",
    axis: "y",
    buildItems: () => [
      makeItem("todoListInteractive", 380),
    ],
  },
];

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
    note: "Personal finance overview with net total balance, live crypto ticker, quick transfers, and recent transactions",
  };

  // Screen 2: Analytics (Spending & Monthly Budget)
  const f2: Frame = {
    id: "money_analytics",
    name: "Spending Analytics",
    x: FRAME_W + GAP_X,
    y: 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Interactive 6-month area chart, category donut breakdown, budget progress, and upcoming bills",
  };

  // Screen 3: Transfer & Payment
  const f3: Frame = {
    id: "money_transfer",
    name: "Transfer Funds",
    x: (FRAME_W + GAP_X) * 2,
    y: 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Luxury Titanium card selector, instant transfer amount, contact picker, and Face ID authorization",
  };

  // Screen 4: Savings Goals & Cards
  const f4: Frame = {
    id: "money_goals",
    name: "Savings & Vaults",
    x: (FRAME_W + GAP_X) * 3,
    y: 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Target savings vaults, milestone progress ring, and 42-day financial discipline streak",
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
        label: "FinTrack Wealth",
        icon: "account_balance_wallet",
        icon2: "notifications",
        icon3: "person",
        variant: "filled",
        size: FRAME_W,
        actions: {
          icon2: { to: "money_analytics", transition: "slide" },
        },
      },
    ],
  });

  // User Profile Header Welcome
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 72,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "userProfileHeader",
        label: "Alex Morgan",
        supporting: "Titanium Private Wealth · Portfolio $34,580",
        size: 380,
      },
    ],
  });

  // Net Balance Hero Card & Crypto Ticker
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 168,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "balanceCard",
        label: "$34,580.00",
        supporting: "+$5,420.00 Income • -$2,180.00 Spent (+18.4% saved)",
        variant: "filled",
        size: 380,
      },
      {
        id: uid(),
        kind: "cryptoTicker",
        label: "Bitcoin (BTC) $68,420 (+4.2%)",
        supporting: "Web3 Portfolio · ETH $3,580 · SOL $178 (+8.1%)",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  // Quick Action Buttons
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 360,
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
        icon: "query_stats",
        variant: "outlined",
        size: 92,
        action: { to: "money_analytics", transition: "slide" },
      },
    ],
  });

  // Mini Chart & Metric
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 420,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "miniChart",
        label: "7-Day Spending Velocity: -12.4%",
        supporting: "Average daily spend $78.40 vs $89.50 last week",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  // Section Header: Recent Transactions
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 510,
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

  // Transaction List
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 548,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "transactionItem",
        label: "+$5,200.00",
        supporting: "Tech Enterprise Salary • Direct Wire • Today 09:00",
        icon: "account_balance",
        variant: "filled",
        size: 380,
      },
      {
        id: uid(),
        kind: "transactionItem",
        label: "-$84.50",
        supporting: "Whole Foods Market • Fresh Groceries • 14:15",
        icon: "shopping_cart",
        variant: "filled",
        size: 380,
      },
      {
        id: uid(),
        kind: "transactionItem",
        label: "-$125.40",
        supporting: "Electric Power Utility • Monthly Energy • Yesterday",
        icon: "bolt",
        variant: "filled",
        size: 380,
      },
      {
        id: uid(),
        kind: "transactionItem",
        label: "-$29.98",
        supporting: "Netflix 4K + Spotify Duo • Entertainment Pass • Oct 8",
        icon: "movie",
        variant: "filled",
        size: 380,
      },
    ],
  });

  // Security Sticky Banner
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 740,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "notificationBannerSticky",
        label: "Security Shield Active",
        supporting: "Biometric Face ID required for transfers > $500",
        variant: "tonal",
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
        label: "Spending & Analytics",
        icon: "arrow_back",
        icon2: "filter_list",
        variant: "filled",
        size: FRAME_W,
        actions: {
          icon: { to: "money_dashboard", transition: "slideLeft" },
        },
      },
    ],
  });

  // Category Filter Chips
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 72,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "Monthly", icon: "calendar_month", variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "Weekly", icon: "view_week", variant: "outlined" },
      { id: uid(), kind: "chip", label: "Quarterly", icon: "event_repeat", variant: "outlined" },
      { id: uid(), kind: "chip", label: "Yearly", icon: "calendar_today", variant: "outlined" },
    ],
  });

  // 6-Month Area Chart
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 120,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "areaChart",
        label: "6-Month Cashflow Analytics",
        supporting: "May: $2.4k • Jun: $1.9k • Jul: $3.1k • Aug: $2.1k • Sep: $2.8k • Oct: $2.1k",
        variant: "filled",
        size: 380,
        size2: 140,
      },
    ],
  });

  // Donut Chart: Expense Breakdown
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 276,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "donutChart",
        label: "Category Expense Breakdown",
        supporting: "Housing 45% • Food 24% • Transport 13% • Leisure 18%",
        variant: "filled",
        size: 380,
        size2: 140,
      },
    ],
  });

  // Spending Progress Categories
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 430,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "expenseProgress",
        label: "Housing & Rent (45%) • $980.00 / $1,200",
        supporting: "Rent, utilities, fiber broadband",
        size: 380,
      },
      {
        id: uid(),
        kind: "expenseProgress",
        label: "Food & Groceries (24%) • $520.00 / $700",
        supporting: "Supermarkets, dining out, cafe treats",
        size: 380,
      },
      {
        id: uid(),
        kind: "billReminderCard",
        label: "Apartment Rent & Fiber Due",
        supporting: "Due in 3 days (Oct 16) • Auto-Debit Scheduled • $980.00",
        size: 380,
      },
      {
        id: uid(),
        kind: "loanCalculator",
        label: "Smart Wealth Compounding",
        supporting: "Est. $42,500.00 at 5.2% APY in 12 Months",
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
        actions: {
          icon: { to: "money_dashboard", transition: "slideLeft" },
        },
      },
    ],
  });

  // Ultra-Luxury Titanium Black Card
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 72,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "creditCard",
        label: "ALEX MORGAN",
        supporting: "08/29",
        icon: "credit_card",
        variant: "filled",
        size: 380,
        size2: 180,
      },
    ],
  });

  // Quick Contacts Row (Story Bubbles)
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 264,
    axis: "x",
    items: [
      { id: uid(), kind: "storyBubble", label: "Sarah M.", icon2: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", size: 68 },
      { id: uid(), kind: "storyBubble", label: "David K.", icon2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", size: 68 },
      { id: uid(), kind: "storyBubble", label: "Elena R.", icon2: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", size: 68 },
      { id: uid(), kind: "storyBubble", label: "Marcus C.", icon2: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", size: 68 },
      { id: uid(), kind: "storyBubble", label: "+ Add", icon2: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150", size: 68 },
    ],
  });

  // Recipient Input Field & Funding Source
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 350,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "textField",
        label: "Recipient Name, @cashtag, or Phone",
        placeholder: "e.g. Sarah Miller (@sarahm) or +1 555-0192",
        icon: "person",
        variant: "outlined",
        size: 380,
      },
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

  // Quick Amount Chips
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 490,
    axis: "x",
    items: [
      { id: uid(), kind: "chip", label: "$50", icon: "payments", variant: "outlined" },
      { id: uid(), kind: "chip", label: "$100", icon: "payments", variant: "outlined" },
      { id: uid(), kind: "chip", label: "$250", icon: "payments", variant: "tonal", checked: true },
      { id: uid(), kind: "chip", label: "$500", icon: "payments", variant: "outlined" },
    ],
  });

  // Biometric Security Authorization Prompt & Send CTA
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 540,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "biometricPrompt",
        label: "Biometric Face ID Authorization",
        supporting: "Glance at sensor or double click side button to authenticate",
        icon: "fingerprint",
        variant: "outlined",
        size: 380,
      },
      {
        id: uid(),
        kind: "button",
        label: "Authorize & Send $250.00 Now",
        icon: "send",
        variant: "filled",
        size: 380,
        size2: 54,
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
        actions: {
          icon: { to: "money_dashboard", transition: "slideLeft" },
        },
      },
    ],
  });

  // Wealth Goal Gauge
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 72,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "progressRingGroup",
        label: "Annual Milestone: 72% Achieved",
        supporting: "Saved $26,100 of $36,000 Annual Target Goal",
        variant: "filled",
        size: 380,
        size2: 120,
      },
    ],
  });

  // Vault Cards
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 204,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "card",
        label: "🛡️ Emergency Safety Vault",
        supporting: "$8,500.00 saved of $10,000.00 Goal (85% completed · Auto-deposit $250/mo)",
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
      {
        id: uid(),
        kind: "card",
        label: "🌴 Summer Vacation in Tokyo & Kyoto",
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
      {
        id: uid(),
        kind: "rewardStreakCard",
        label: "Financial Discipline: 42 Days!",
        supporting: "Zero unbudgeted impulse purchases recorded",
        size: 380,
      },
      {
        id: uid(),
        kind: "achievementTrophyCard",
        label: "Wealth Builder Level 4 Unlocked",
        supporting: "3+ fully funded target vaults maintained for 6 months",
        size: 380,
      },
      {
        id: uid(),
        kind: "button",
        label: "+ Create New Target Vault",
        icon: "add",
        variant: "filled",
        size: 380,
        size2: 48,
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
    title: "FinTrack Wealth Management App",
    brief: "Comprehensive personal money management app featuring net balance overview, live crypto portfolio, spending analytics, fast fund transfers, and savings goal vaults.",
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
