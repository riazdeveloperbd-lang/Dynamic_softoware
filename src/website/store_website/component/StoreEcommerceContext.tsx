import React, { createContext, useContext, useState, useMemo } from 'react';

export type StoreCategorySlug =
  | 'all'
  | 'offer_zone'
  | 'best_seller'
  | 'oil'
  | 'ghee'
  | 'dates'
  | 'honey'
  | 'organic_spices'
  | 'nuts_seeds'
  | 'tea_coffee'
  | 'functional_food';

export type StorePageId =
  | 'home'
  | 'category'
  | 'product_detail'
  | 'offer_zone'
  | 'best_seller'
  | 'cart'
  | 'checkout'
  | 'track_order'
  | 'about_contact';

export interface StoreProductItem {
  id: string;
  name: string;
  banglaSub?: string;
  category: StoreCategorySlug;
  categoryLabel: string;
  price: number;
  regularPrice?: number;
  weight: string;
  weightOptions: string[];
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  isBestSeller?: boolean;
  isOfferZone?: boolean;
  badge?: string;
  sku: string;
  image: string;
  gallery: string[];
  shortDescription: string;
  highlights: string[];
  nutritionFacts: { label: string; value: string }[];
}

export interface StoreCartItem {
  product: StoreProductItem;
  selectedWeight: string;
  quantity: number;
}

export interface StoreOrderRecord {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  deliveryZone: 'inside_dhaka' | 'outside_dhaka';
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
  notes?: string;
  items: StoreCartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: 'Confirmed' | 'Packing at Warehouse' | 'In Transit' | 'Delivered';
  createdAt: string;
}

export interface StoreCategoryRecord {
  slug: StoreCategorySlug;
  label: string;
  bangla: string;
  count: number;
  image: string;
}

export interface StoreCouponRecord {
  code: string;
  type: 'flat' | 'percent';
  value: number;
  minOrder: number;
  active: boolean;
  usageCount: number;
  description: string;
}

export interface StoreSystemSettings {
  storeName: string;
  banglaName: string;
  tagline: string;
  hotline: string;
  whatsapp: string;
  supportEmail: string;
  headOfficeAddress: string;
  promoBannerText: string;
  insideDhakaFee: number;
  outsideDhakaFee: number;
  freeShippingThreshold: number;
  enableCod: boolean;
  enableBkash: boolean;
  enableNagad: boolean;
  enableCard: boolean;
  autoAssignCourier: 'Steadfast' | 'Pathao' | 'RedX' | 'Bazar Express';
}

export type StoreAdminPageId =
  | 'overview'
  | 'dashboard'
  | 'home_2'
  | 'home_3'
  | 'home_boxed'
  | 'home_menu_icon_hover'
  | 'home_menu_icon_default'
  | 'add_product'
  | 'product_list'
  | 'product_detail'
  | 'product_detail_2'
  | 'product_detail_3'
  | 'products'
  | 'category_list'
  | 'new_category'
  | 'categories'
  | 'attributes'
  | 'add_attributes'
  | 'order_list'
  | 'order_detail'
  | 'order_tracking'
  | 'orders'
  | 'customers'
  | 'all_users'
  | 'add_user'
  | 'login'
  | 'sign_up'
  | 'roles'
  | 'create_role'
  | 'gallery'
  | 'report'
  | 'countries'
  | 'states'
  | 'cities'
  | 'location'
  | 'coupons_offers'
  | 'system_settings'
  | 'list_page'
  | 'new_page'
  | 'edit_page'
  | 'components_page'
  | 'faq_page'
  | 'help_center'
  | 'privacy_policy';

export interface StoreAttributeRecord {
  id: string;
  category: string;
  value: string;
}

export const STORE_CATEGORIES: StoreCategoryRecord[] = [
  {
    slug: 'offer_zone',
    label: 'OFFER ZONE',
    bangla: 'অফার জোন',
    count: 9,
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'best_seller',
    label: 'Best Seller',
    bangla: 'বেস্টেলার',
    count: 10,
    image:
      'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'oil',
    label: 'Mustard & Organic Oil',
    bangla: 'খাঁটি সরিষার তেল',
    count: 6,
    image:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'ghee',
    label: 'Ghee (ঘি)',
    bangla: 'গাওয়া ঘি',
    count: 4,
    image:
      'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'dates',
    label: 'Dates (খেজুর)',
    bangla: 'প্রিমিয়াম খেজুর',
    count: 8,
    image:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'honey',
    label: 'Pure Honey (মধু)',
    bangla: 'সুন্দরবন ও লিচু মধু',
    count: 11,
    image:
      'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'organic_spices',
    label: 'Masala & Spices',
    bangla: 'খাঁটি মশলা',
    count: 7,
    image:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'nuts_seeds',
    label: 'Nuts & Seeds',
    bangla: 'বাদাম ও সিডস',
    count: 9,
    image:
      'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'tea_coffee',
    label: 'Tea / Coffee',
    bangla: 'চা ও কফি',
    count: 5,
    image:
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'functional_food',
    label: 'Functional Superfood',
    bangla: 'হেলদি ফুড',
    count: 6,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
  },
];

export const STORE_PRODUCTS: StoreProductItem[] = [
  {
    id: 'gb_prod_1',
    name: 'Sundarban Natural Khalisha Honey (সুন্দরবনের খলিশা ফুলের মধু)',
    banglaSub: '১০০% প্রাকৃতিক সুন্দরবনের চাক ভাঙা খলিশা মধু',
    category: 'honey',
    categoryLabel: 'Pure Honey (মধু)',
    price: 1150,
    regularPrice: 1350,
    weight: '1 kg',
    weightOptions: ['500 gm', '1 kg', '2 kg'],
    rating: 4.9,
    reviewsCount: 412,
    inStock: true,
    isBestSeller: true,
    isOfferZone: true,
    badge: 'SAVE ৳200',
    sku: 'GB-HNY-001',
    image:
      'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=700&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=700&q=85',
      'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=700&q=80',
    ],
    shortDescription:
      'Raw, unheated, and lab-tested wild Khalisha flower honey harvested directly by traditional Mouals from deep Sundarban mangrove forests.',
    highlights: [
      '100% raw & unpasteurized Sundarban wild honey',
      'Rich in natural enzymes, antioxidants & immunity boosters',
      'Zero added sugar, corn syrup, or artificial preservatives',
      'BSTI & BCSIR lab purity verified batch',
    ],
    nutritionFacts: [
      { label: 'Energy', value: '304 kcal / 100g' },
      { label: 'Natural Sugars', value: '82.1 g' },
      { label: 'Moisture', value: '< 18%' },
      { label: 'Origin', value: 'Satkhira Range, Sundarbans' },
    ],
  },
  {
    id: 'gb_prod_2',
    name: 'Pabna Pure Deshi Gawa Ghee (পাবনার খাঁটি গাওয়া ঘি)',
    banglaSub: 'খাঁটি দুধের ননি থেকে তৈরি সুগন্ধি দানাদার গাওয়া ঘি',
    category: 'ghee',
    categoryLabel: 'Ghee (ঘি)',
    price: 1480,
    regularPrice: 1650,
    weight: '1 kg',
    weightOptions: ['400 gm', '1 kg', '2 kg'],
    rating: 4.95,
    reviewsCount: 628,
    inStock: true,
    isBestSeller: true,
    isOfferZone: true,
    badge: 'BEST SELLER',
    sku: 'GB-GHE-002',
    image:
      'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=700&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=700&q=85',
    ],
    shortDescription:
      'Traditional slow-churned bilona Gawa Ghee crafted from grass-fed cow milk in Pabna & Sirajganj bathans with rich granular texture and authentic aroma.',
    highlights: [
      'Made from 100% pure grass-fed cow milk butter (Noni)',
      'Traditional clay-pot slow simmering for authentic aroma',
      'Rich in Vitamins A, D, E, K and healthy CLA fatty acids',
      'No dalda, palm oil, or artificial ghee essence',
    ],
    nutritionFacts: [
      { label: 'Milk Fat', value: '99.5%' },
      { label: 'Vitamin A', value: '840 mcg' },
      { label: 'Shelf Life', value: '12 Months' },
      { label: 'Origin', value: 'Bhangura, Pabna' },
    ],
  },
  {
    id: 'gb_prod_3',
    name: 'Wood-Pressed Cold Mustard Oil (তেঁতুল কাঠের ঘানি ভাঙা সরিষার তেল)',
    banglaSub: 'প্রথম চাপের ১০০% খাঁটি দেশি মাঘী সরিষার তেল',
    category: 'oil',
    categoryLabel: 'Mustard & Organic Oil',
    price: 1350,
    regularPrice: 1500,
    weight: '5 Liter',
    weightOptions: ['1 Liter', '2 Liter', '5 Liter'],
    rating: 4.92,
    reviewsCount: 890,
    inStock: true,
    isBestSeller: true,
    isOfferZone: true,
    badge: 'HOT DEAL',
    sku: 'GB-OIL-003',
    image:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=85',
    ],
    shortDescription:
      'Cold wood-pressed (Tetul Kather Ghani) first-press Deshi Maghi mustard oil with natural pungency, heart-healthy Omega-3s, and zero chemical refining.',
    highlights: [
      'Cold-pressed in traditional Tamarind wood ghani below 40°C',
      '100% local Deshi red & yellow mustard seeds',
      'Zero argemone oil, künstlich essence, or hexane extraction',
      'Ideal for traditional Bengali cooking, bhorta & hair care',
    ],
    nutritionFacts: [
      { label: 'MUFA', value: '60 g / 100ml' },
      { label: 'Omega-3 PUFA', value: '21 g / 100ml' },
      { label: 'Process', value: 'Cold Wood-Pressed' },
      { label: 'Packaging', value: 'Food-Grade HDPE Jar' },
    ],
  },
  {
    id: 'gb_prod_4',
    name: 'Saudi Madinah Ajwa Dates VIP (সৌদি মদিনার আজওয়া খেজুর)',
    banglaSub: 'প্রিমিয়াম বড় সাইজের মদিনার অরিজিনাল আজওয়া খেজুর',
    category: 'dates',
    categoryLabel: 'Dates (খেজুর)',
    price: 1650,
    regularPrice: 1900,
    weight: '1 kg',
    weightOptions: ['500 gm', '1 kg', '3 kg Box'],
    rating: 4.96,
    reviewsCount: 345,
    inStock: true,
    isBestSeller: true,
    isOfferZone: true,
    badge: 'SAVE ৳250',
    sku: 'GB-DAT-004',
    image:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=85',
    ],
    shortDescription:
      'Hand-selected Grade-A Jumbo Ajwa dates imported directly from Al-Madinah farms in Saudi Arabia. Soft, luscious, and packed with heart-protective nutrients.',
    highlights: [
      'Direct cold-chain import from Al-Madinah Al-Munawwarah',
      'Soft, fleshy texture with fine white natural lines',
      'High in dietary fiber, potassium, magnesium & iron',
      'Hygienically packed in food-grade reusable box',
    ],
    nutritionFacts: [
      { label: 'Grade', value: 'VIP Jumbo A+' },
      { label: 'Fiber', value: '8.0 g / 100g' },
      { label: 'Potassium', value: '656 mg / 100g' },
      { label: 'Origin', value: 'Madinah, Saudi Arabia' },
    ],
  },
  {
    id: 'gb_prod_5',
    name: 'Honey Nuts Mix — Royal Immunity Jar (হানি নাটস মিক্স)',
    banglaSub: 'কাজু, কাঠবাদাম, পেস্তা, আখরোট ও প্রাকৃতিক মধুর পুষ্টিকর মিশ্রণ',
    category: 'nuts_seeds',
    categoryLabel: 'Nuts & Seeds',
    price: 1290,
    regularPrice: 1490,
    weight: '800 gm',
    weightOptions: ['500 gm', '800 gm', '1.5 kg'],
    rating: 4.88,
    reviewsCount: 519,
    inStock: true,
    isBestSeller: true,
    isOfferZone: true,
    badge: 'POPULAR',
    sku: 'GB-NUT-005',
    image:
      'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=700&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=700&q=85',
    ],
    shortDescription:
      'A powerhouse jar loaded with roasted cashews, California almonds, Iranian pistachios, walnuts, raisins, figs, and raw Sundarban honey.',
    highlights: [
      '12+ premium imported dry fruits, nuts & super-seeds',
      'Immersed in 100% pure natural flower honey',
      'Daily natural energy booster for professionals & athletes',
      'Sealed glass jar preserving crunch and freshness',
    ],
    nutritionFacts: [
      { label: 'Protein', value: '14.5 g / 100g' },
      { label: 'Healthy Fats', value: '28 g / 100g' },
      { label: 'Net Weight', value: '800 gm' },
      { label: 'Preservatives', value: '0% Artificial' },
    ],
  },
  {
    id: 'gb_prod_6',
    name: 'Black Seed Flower Honey (কালোজিরা ফুলের খাঁটি মধু)',
    banglaSub: 'কালোজিরা ফুলের প্রাকৃতিক ও ওষুধি গুণসম্পন্ন মধু',
    category: 'honey',
    categoryLabel: 'Pure Honey (মধু)',
    price: 980,
    regularPrice: 1150,
    weight: '1 kg',
    weightOptions: ['500 gm', '1 kg', '2 kg'],
    rating: 4.89,
    reviewsCount: 274,
    inStock: true,
    isBestSeller: false,
    isOfferZone: true,
    badge: 'SAVE ৳170',
    sku: 'GB-HNY-006',
    image:
      'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=700&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=700&q=85',
    ],
    shortDescription:
      'Collected from vast Nigella Sativa (Kalojira) blossom fields in Faridpur & Shariatpur. Dark amber hue with distinctive herbal warmth.',
    highlights: [
      'Single-origin Kalojira blossom nectar',
      'Supports respiratory wellness and seasonal immunity',
      'Unheated & micro-strained to keep natural bee pollen intact',
      'Direct farm-to-jar traceability',
    ],
    nutritionFacts: [
      { label: 'Harvest Season', value: 'February - March' },
      { label: 'Color', value: 'Dark Amber' },
      { label: 'Purity', value: '100% Raw' },
      { label: 'Origin', value: 'Faridpur, Bangladesh' },
    ],
  },
  {
    id: 'gb_prod_7',
    name: 'Palestinian Medjool Dates Large (ফিলিস্তিনি মেজুল খেজুর)',
    banglaSub: 'কিং অব ডেটস — রাজকীয় স্বাদের বড় মেজুল খেজুর',
    category: 'dates',
    categoryLabel: 'Dates (খেজুর)',
    price: 1590,
    regularPrice: 1800,
    weight: '1 kg',
    weightOptions: ['500 gm', '1 kg', '2 kg'],
    rating: 4.94,
    reviewsCount: 198,
    inStock: true,
    isBestSeller: true,
    isOfferZone: false,
    badge: 'PREMIUM',
    sku: 'GB-DAT-007',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=85',
    ],
    shortDescription:
      'Known as the King of Dates, Medjool dates offer a caramel-like sweetness, jumbo size, and melt-in-the-mouth softness.',
    highlights: [
      'Super Jumbo Grade-A selection',
      'Rich caramel flavor with thin skin & small pit',
      'Excellent pre-workout & Ramadan Iftar energy source',
      'Zero glucose glazing or chemical shine',
    ],
    nutritionFacts: [
      { label: 'Size', value: 'Super Jumbo' },
      { label: 'Moisture', value: '20% - 24%' },
      { label: 'Sugar', value: '100% Natural Fructose' },
      { label: 'Storage', value: 'Keep Cool & Dry' },
    ],
  },
  {
    id: 'gb_prod_8',
    name: 'Organic Chia Seeds & Flax Superfood Combo (চিয়া সিড কম্বো)',
    banglaSub: 'ওজন নিয়ন্ত্রণ ও হার্টের সুরক্ষায় প্রিমিয়াম চিয়া সিড',
    category: 'functional_food',
    categoryLabel: 'Functional Superfood',
    price: 750,
    regularPrice: 920,
    weight: '500 gm',
    weightOptions: ['250 gm', '500 gm', '1 kg'],
    rating: 4.87,
    reviewsCount: 310,
    inStock: true,
    isBestSeller: false,
    isOfferZone: true,
    badge: 'COMBO OFFER',
    sku: 'GB-SUP-008',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85',
    ],
    shortDescription:
      'Triple-cleaned organic black & white Chia Seeds rich in plant-based Omega-3, dietary fiber, calcium, and complete protein.',
    highlights: [
      '99.9% purity machine-cleaned & dust-free seeds',
      '5x more calcium than milk per gram',
      'Supports digestion, satiety, and metabolic health',
      'Resealable moisture-lock standing pouch',
    ],
    nutritionFacts: [
      { label: 'Omega-3', value: '17.8 g / 100g' },
      { label: 'Dietary Fiber', value: '34.4 g / 100g' },
      { label: 'Protein', value: '16.5 g / 100g' },
      { label: 'Certification', value: 'USDA Organic Source' },
    ],
  },
  {
    id: 'gb_prod_9',
    name: 'Sylhet Special Gold Leaf Tea & Pink Salt Combo (সিলেটের চা পাতা)',
    banglaSub: 'শ্রীমঙ্গলের বাগানের বাছাইকৃত কড়া লিকারের চা পাতা',
    category: 'tea_coffee',
    categoryLabel: 'Tea / Coffee',
    price: 520,
    regularPrice: 620,
    weight: '1 kg',
    weightOptions: ['500 gm', '1 kg'],
    rating: 4.85,
    reviewsCount: 164,
    inStock: true,
    isBestSeller: false,
    isOfferZone: true,
    badge: 'SAVE ৳100',
    sku: 'GB-TEA-009',
    image:
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=85',
    ],
    shortDescription:
      'Export-grade CTC BOP & Broken Orange Pekoe tea blend sourced directly from Srimangal tea estates in Sylhet.',
    highlights: [
      'Rich golden-amber liquor with brisk malty aroma',
      'Zero artificial dye or synthetic flavorings',
      'Vacuum-sealed freshness pack',
      'Great for both milk tea (Dudh Cha) and raw lemon tea',
    ],
    nutritionFacts: [
      { label: 'Grade', value: 'Export BOP /GBOP' },
      { label: 'Estate', value: 'Srimangal, Sylhet' },
      { label: 'Antioxidants', value: 'High Catechins' },
      { label: 'Caffeine', value: 'Natural Medium' },
    ],
  },
  {
    id: 'gb_prod_10',
    name: 'Stone-Ground Organic Turmeric, Chili & CorianderCombo (মশলা কম্বো)',
    banglaSub: 'কেমিক্যাল ও রঙমুক্ত ঢেঁকি ও স্টোন-গ্রাইন্ড খাঁটি মশলা',
    category: 'organic_spices',
    categoryLabel: 'Masala & Spices',
    price: 890,
    regularPrice: 1050,
    weight: '1.5 kg (3x500g)',
    weightOptions: ['600 gm Set', '1.5 kg (3x500g)'],
    rating: 4.91,
    reviewsCount: 230,
    inStock: true,
    isBestSeller: true,
    isOfferZone: true,
    badge: 'COMBO DEAL',
    sku: 'GB-SPC-010',
    image:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=85',
    ],
    shortDescription:
      'Sun-dried whole Bogura chili, Pahari high-curcumin turmeric, and aromatic coriander slow-ground to preserve essential oils.',
    highlights: [
      '100% pure whole spices washed, sun-dried & slow-ground',
      'High curcumin content (>4.5%) in Pahari Halud',
      'No brick dust, rice husk, or textile coloring',
      'Family combo pack of Turmeric, Red Chili & Coriander',
    ],
    nutritionFacts: [
      { label: 'Curcumin', value: '4.8% Natural' },
      { label: 'Additives', value: '0% None' },
      { label: 'Grind Method', value: 'Low-RPM Cold Mill' },
      { label: 'Origin', value: 'Bogura & Khagrachari' },
    ],
  },
];

interface StoreEcommerceContextValue {
  activePage: StorePageId;
  setActivePage: (page: StorePageId) => void;
  activeAdminPage: StoreAdminPageId;
  setActiveAdminPage: (page: StoreAdminPageId) => void;
  selectedAdminOrder: StoreOrderRecord;
  setSelectedAdminOrder: (ord: StoreOrderRecord) => void;
  attributes: StoreAttributeRecord[];
  addAttribute: (category: string, value: string) => void;
  deleteAttribute: (id: string) => void;
  products: StoreProductItem[];
  categories: StoreCategoryRecord[];
  coupons: StoreCouponRecord[];
  storeSettings: StoreSystemSettings;
  updateStoreSettings: (patch: Partial<StoreSystemSettings>) => void;
  addProduct: (newProd: Omit<StoreProductItem, 'id'>) => void;
  updateProduct: (id: string, patch: Partial<StoreProductItem>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (cat: StoreCategoryRecord) => void;
  updateCategory: (slug: StoreCategorySlug, patch: Partial<StoreCategoryRecord>) => void;
  deleteCategory: (slug: StoreCategorySlug) => void;
  updateOrderStatus: (
    orderId: string,
    status: StoreOrderRecord['status']
  ) => void;
  deleteOrder: (orderId: string) => void;
  addCoupon: (coupon: StoreCouponRecord) => void;
  toggleCouponActive: (code: string) => void;
  deleteCoupon: (code: string) => void;
  selectedCategory: StoreCategorySlug;
  setSelectedCategory: (cat: StoreCategorySlug) => void;
  selectedProduct: StoreProductItem;
  setSelectedProduct: (prod: StoreProductItem) => void;
  openProductDetail: (prod: StoreProductItem) => void;
  openCategoryPage: (cat: StoreCategorySlug) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  priceCeiling: number;
  setPriceCeiling: (val: number) => void;
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'rating';
  setSortBy: (s: 'featured' | 'price_asc' | 'price_desc' | 'rating') => void;
  cart: StoreCartItem[];
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  addToCart: (product: StoreProductItem, weight?: string, qty?: number, openDrawer?: boolean) => void;
  buyNowDirect: (product: StoreProductItem, weight?: string, qty?: number) => void;
  updateCartQty: (productId: string, weight: string, delta: number) => void;
  removeFromCart: (productId: string, weight: string) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  quickViewProduct: StoreProductItem | null;
  setQuickViewProduct: (prod: StoreProductItem | null) => void;
  couponCode: string;
  setCouponCode: (c: string) => void;
  appliedDiscount: number;
  applyCoupon: (code: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
  orders: StoreOrderRecord[];
  placeOrder: (orderInput: {
    customerName: string;
    phone: string;
    address: string;
    deliveryZone: 'inside_dhaka' | 'outside_dhaka';
    paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
    notes?: string;
  }) => StoreOrderRecord;
  lastPlacedOrder: StoreOrderRecord | null;
  storeToast: string | null;
  showStoreToast: (msg: string) => void;
}

const StoreEcommerceContext = createContext<StoreEcommerceContextValue | null>(null);

export const useStoreEcommerce = (): StoreEcommerceContextValue => {
  const ctx = useContext(StoreEcommerceContext);
  if (!ctx) {
    throw new Error('useStoreEcommerce must be used inside StoreEcommerceProvider');
  }
  return ctx;
};

export const StoreEcommerceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activePage, setActivePage] = useState<StorePageId>('home');
  const [activeAdminPage, setActiveAdminPage] = useState<StoreAdminPageId>('overview');
  const [products, setProducts] = useState<StoreProductItem[]>(STORE_PRODUCTS);
  const [categories, setCategories] = useState<StoreCategoryRecord[]>(STORE_CATEGORIES);
  const [attributes, setAttributes] = useState<StoreAttributeRecord[]>([
    { id: 'attr_1', category: 'Color', value: 'Golden Amber, Dark Brown, Natural Yellow' },
    { id: 'attr_2', category: 'Size', value: 'S, M, L, XL' },
    { id: 'attr_3', category: 'Material', value: 'Glass Jar, Food-Grade HDPE, Vacuum Pouch' },
    { id: 'attr_4', category: 'Style', value: 'Raw Unheated, Cold-Pressed, Slow Bilona' },
    { id: 'attr_5', category: 'Purity Grade', value: '100% Organic, Wild Harvested, Grade-A VIP' },
    { id: 'attr_6', category: 'Weight', value: '250gm, 500gm, 1kg, 2kg, over 5kg' },
    { id: 'attr_7', category: 'Packaging', value: 'Glass jar, food-grade box, foil pouch, tin cans' },
    { id: 'attr_8', category: 'Kind of food', value: 'Wild Honey, Gawa Ghee, Mustard Oil, Imported Dates' },
    { id: 'attr_9', category: 'Source', value: 'Sundarbans, Pabna Bathans, Madinah Farms, Sylhet' },
    { id: 'attr_10', category: 'Combo', value: 'Honey Nuts Combo, Superfood Chia Combo, Spice Set' },
  ]);
  const [coupons, setCoupons] = useState<StoreCouponRecord[]>([
    {
      code: 'BAZAR100',
      type: 'flat',
      value: 100,
      minOrder: 800,
      active: true,
      usageCount: 142,
      description: 'Flat ৳100 discount on organic superfood orders above ৳800',
    },
    {
      code: 'ORGANIC10',
      type: 'percent',
      value: 10,
      minOrder: 1000,
      active: true,
      usageCount: 89,
      description: '10% discount on Honey, Gawa Ghee & Mustard Oil combos',
    },
    {
      code: 'FESTIVAL200',
      type: 'flat',
      value: 200,
      minOrder: 2000,
      active: true,
      usageCount: 54,
      description: '৳200 festival discount on family pack orders over ৳2,000',
    },
  ]);
  const [storeSettings, setStoreSettings] = useState<StoreSystemSettings>({
    storeName: 'Bazar',
    banglaName: 'বাজার',
    tagline: '100% Pure & Organic Food Store',
    hotline: '09642-922922',
    whatsapp: '+8801321208940',
    supportEmail: 'support@bazar.com',
    headOfficeAddress: 'Banasree, Rampura, Dhaka-1219',
    promoBannerText:
      'আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন: +8801321208940',
    insideDhakaFee: 60,
    outsideDhakaFee: 120,
    freeShippingThreshold: 3000,
    enableCod: true,
    enableBkash: true,
    enableNagad: true,
    enableCard: true,
    autoAssignCourier: 'Steadfast',
  });
  const [selectedCategory, setSelectedCategory] = useState<StoreCategorySlug>('all');
  const [selectedProduct, setSelectedProduct] = useState<StoreProductItem>(STORE_PRODUCTS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceCeiling, setPriceCeiling] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating'>('featured');
  const [cart, setCart] = useState<StoreCartItem[]>([
    {
      product: STORE_PRODUCTS[0],
      selectedWeight: STORE_PRODUCTS[0].weight,
      quantity: 1,
    },
    {
      product: STORE_PRODUCTS[1],
      selectedWeight: STORE_PRODUCTS[1].weight,
      quantity: 1,
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['gb_prod_1', 'gb_prod_4']);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<StoreProductItem | null>(null);
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [orders, setOrders] = useState<StoreOrderRecord[]>([
    {
      orderId: 'BZ-88421',
      customerName: 'Tanvir Ahmed',
      phone: '01711-223344',
      address: 'House 14, Road 7, Dhanmondi, Dhaka',
      deliveryZone: 'inside_dhaka',
      paymentMethod: 'cod',
      items: [
        {
          product: STORE_PRODUCTS[0],
          selectedWeight: '1 kg',
          quantity: 1,
        },
        {
          product: STORE_PRODUCTS[2],
          selectedWeight: '5 Liter',
          quantity: 1,
        },
      ],
      subtotal: 2500,
      shippingFee: 60,
      discount: 100,
      total: 2460,
      status: 'In Transit',
      createdAt: '2026-10-06 04:15 PM',
    },
    {
      orderId: 'BZ-88419',
      customerName: 'Nusrat Jahan',
      phone: '01819-556677',
      address: 'Flat 4B, Nasirabad Housing Society, Chattogram',
      deliveryZone: 'outside_dhaka',
      paymentMethod: 'bkash',
      items: [
        {
          product: STORE_PRODUCTS[1],
          selectedWeight: '1 kg',
          quantity: 1,
        },
        {
          product: STORE_PRODUCTS[3],
          selectedWeight: '1 kg',
          quantity: 1,
        },
      ],
      subtotal: 3130,
      shippingFee: 120,
      discount: 0,
      total: 3250,
      status: 'Packing at Warehouse',
      createdAt: '2026-10-06 02:40 PM',
    },
    {
      orderId: 'BZ-88395',
      customerName: 'Mahmudul Hasan',
      phone: '01912-998877',
      address: 'Sector 7, Road 18, Uttara, Dhaka',
      deliveryZone: 'inside_dhaka',
      paymentMethod: 'cod',
      items: [
        {
          product: STORE_PRODUCTS[4],
          selectedWeight: '800 gm',
          quantity: 2,
        },
      ],
      subtotal: 2580,
      shippingFee: 60,
      discount: 100,
      total: 2540,
      status: 'Delivered',
      createdAt: '2026-10-05 11:20 AM',
    },
    {
      orderId: 'BZ-88430',
      customerName: 'Farhana Yeasmin',
      phone: '01675-443322',
      address: 'Block C, Banasree, Rampura, Dhaka',
      deliveryZone: 'inside_dhaka',
      paymentMethod: 'nagad',
      items: [
        {
          product: STORE_PRODUCTS[5],
          selectedWeight: '1 kg',
          quantity: 1,
        },
      ],
      subtotal: 980,
      shippingFee: 60,
      discount: 0,
      total: 1040,
      status: 'Confirmed',
      createdAt: '2026-10-07 09:10 AM',
    },
  ]);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<StoreOrderRecord | null>(null);
  const [selectedAdminOrder, setSelectedAdminOrder] = useState<StoreOrderRecord>(
    orders[0]
  );
  const [storeToast, setStoreToast] = useState<string | null>(null);

  const showStoreToast = (msg: string) => {
    setStoreToast(msg);
    setTimeout(() => {
      setStoreToast((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const addAttribute = (category: string, value: string) => {
    setAttributes((prev) => [
      { id: `attr_${Date.now()}`, category, value },
      ...prev,
    ]);
    showStoreToast(`Added attribute "${category}"`);
  };

  const deleteAttribute = (id: string) => {
    setAttributes((prev) => prev.filter((a) => a.id !== id));
    showStoreToast('Attribute deleted');
  };

  const updateStoreSettings = (patch: Partial<StoreSystemSettings>) => {
    setStoreSettings((prev) => ({ ...prev, ...patch }));
    showStoreToast('Updated Bazar Store System Settings');
  };

  const addProduct = (newProd: Omit<StoreProductItem, 'id'>) => {
    const created: StoreProductItem = {
      ...newProd,
      id: `bz_prod_${Date.now()}`,
    };
    setProducts((prev) => [created, ...prev]);
    showStoreToast(`Added new product: ${created.name}`);
  };

  const updateProduct = (id: string, patch: Partial<StoreProductItem>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
    showStoreToast('Product updated in live catalog');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showStoreToast('Product removed from catalog');
  };

  const addCategory = (cat: StoreCategoryRecord) => {
    setCategories((prev) => [...prev, cat]);
    showStoreToast(`Category "${cat.label}" added`);
  };

  const updateCategory = (
    slug: StoreCategorySlug,
    patch: Partial<StoreCategoryRecord>
  ) => {
    setCategories((prev) =>
      prev.map((c) => (c.slug === slug ? { ...c, ...patch } : c))
    );
    showStoreToast('Category updated');
  };

  const deleteCategory = (slug: StoreCategorySlug) => {
    setCategories((prev) => prev.filter((c) => c.slug !== slug));
    showStoreToast('Category removed');
  };

  const updateOrderStatus = (
    orderId: string,
    status: StoreOrderRecord['status']
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status } : o))
    );
    showStoreToast(`Order #${orderId} status updated to ${status}`);
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
    showStoreToast(`Order #${orderId} deleted`);
  };

  const addCoupon = (coupon: StoreCouponRecord) => {
    setCoupons((prev) => [coupon, ...prev]);
    showStoreToast(`Promo code ${coupon.code} created`);
  };

  const toggleCouponActive = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
    showStoreToast(`Updated status for coupon ${code}`);
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showStoreToast(`Deleted coupon ${code}`);
  };

  const openProductDetail = (prod: StoreProductItem) => {
    setSelectedProduct(prod);
    setActivePage('product_detail');
  };

  const openCategoryPage = (cat: StoreCategorySlug) => {
    setSelectedCategory(cat);
    if (cat === 'offer_zone') {
      setActivePage('offer_zone');
    } else if (cat === 'best_seller') {
      setActivePage('best_seller');
    } else {
      setActivePage('category');
    }
  };

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      showStoreToast(exists ? 'Removed from Wishlist' : 'Saved to Wishlist ♥');
      return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const addToCart = (
    product: StoreProductItem,
    weight = product.weight,
    qty = 1,
    openDrawer = true
  ) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedWeight === weight
      );
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
        return copy;
      }
      return [...prev, { product, selectedWeight: weight, quantity: qty }];
    });
    showStoreToast(`Added "${product.name.slice(0, 28)}..." to Cart`);
    if (openDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const buyNowDirect = (
    product: StoreProductItem,
    weight = product.weight,
    qty = 1
  ) => {
    addToCart(product, weight, qty, false);
    setIsCartDrawerOpen(false);
    setActivePage('checkout');
  };

  const updateCartQty = (productId: string, weight: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedWeight === weight) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as StoreCartItem[]
    );
  };

  const removeFromCart = (productId: string, weight: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedWeight === weight)
      )
    );
    showStoreToast('Removed item from shopping cart');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedDiscount(0);
  };

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (
      clean === 'BAZAR100' ||
      clean === 'GHORER100' ||
      clean === 'SAVE100' ||
      clean === 'ORGANIC10'
    ) {
      const disc = clean === 'ORGANIC10' ? Math.round(cartSubtotal * 0.1) : 100;
      setAppliedDiscount(disc);
      showStoreToast(`Coupon ${clean} applied! You saved ৳${disc}`);
      return true;
    }
    showStoreToast('Try coupon code: BAZAR100 or ORGANIC10');
    return false;
  };

  const placeOrder = (orderInput: {
    customerName: string;
    phone: string;
    address: string;
    deliveryZone: 'inside_dhaka' | 'outside_dhaka';
    paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
    notes?: string;
  }): StoreOrderRecord => {
    const shippingFee = orderInput.deliveryZone === 'inside_dhaka' ? 60 : 120;
    const total = Math.max(0, cartSubtotal + shippingFee - appliedDiscount);
    const newOrder: StoreOrderRecord = {
      orderId: `BZ-${Math.floor(10000 + Math.random() * 89999)}`,
      customerName: orderInput.customerName,
      phone: orderInput.phone,
      address: orderInput.address,
      deliveryZone: orderInput.deliveryZone,
      paymentMethod: orderInput.paymentMethod,
      notes: orderInput.notes,
      items: [...cart],
      subtotal: cartSubtotal,
      shippingFee,
      discount: appliedDiscount,
      total,
      status: 'Confirmed',
      createdAt: new Date().toLocaleString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    setCart([]);
    setAppliedDiscount(0);
    showStoreToast(`Order ${newOrder.orderId} Confirmed!`);
    return newOrder;
  };

  return (
    <StoreEcommerceContext.Provider
      value={{
        activePage,
        setActivePage,
        activeAdminPage,
        setActiveAdminPage,
        selectedAdminOrder,
        setSelectedAdminOrder,
        attributes,
        addAttribute,
        deleteAttribute,
        products,
        categories,
        coupons,
        storeSettings,
        updateStoreSettings,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        updateOrderStatus,
        deleteOrder,
        addCoupon,
        toggleCouponActive,
        deleteCoupon,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
        openProductDetail,
        openCategoryPage,
        searchQuery,
        setSearchQuery,
        priceCeiling,
        setPriceCeiling,
        sortBy,
        setSortBy,
        cart,
        wishlistIds,
        toggleWishlist,
        addToCart,
        buyNowDirect,
        updateCartQty,
        removeFromCart,
        clearCart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        quickViewProduct,
        setQuickViewProduct,
        couponCode,
        setCouponCode,
        appliedDiscount,
        applyCoupon,
        cartCount,
        cartSubtotal,
        orders,
        placeOrder,
        lastPlacedOrder,
        storeToast,
        showStoreToast,
      }}
    >
      {children}
    </StoreEcommerceContext.Provider>
  );
};
