import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Plus,
  Minus,
  ShoppingBag,
  SlidersHorizontal,
  CheckCircle2,
  X,
  ArrowRight,
  Trash2,
  LayoutGrid,
  List,
  Truck,
  Flame,
  Clock,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface KhabarDirectTabbedMenuSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

export type MenuCategoryId =
  | 'all'
  | 'trending'
  | 'burgers_wraps'
  | 'rice_platters'
  | 'coffee_drinks'
  | 'bakery_desserts';

export interface MenuVariantOption {
  id: string;
  label: string;
  bnLabel: string;
  extraPrice: number;
}

export interface MenuAddonOption {
  id: string;
  label: string;
  bnLabel: string;
  price: number;
}

export interface MenuDishItem {
  id: string;
  category: Exclude<MenuCategoryId, 'all'>;
  isTrending?: boolean;
  name: string;
  bnName: string;
  ingredients: string;
  dietaryTags: string[];
  prepTime: string;
  calories: string;
  directPrice: number;
  appPrice: number;
  image: string;
  variantGroupTitle: string;
  variants: MenuVariantOption[];
  addons: MenuAddonOption[];
}

export interface CartOrderLine {
  cartLineId: string;
  dishId: string;
  name: string;
  bnName: string;
  unitPrice: number;
  appUnitPrice: number;
  qty: number;
  selectedVariant: string;
  addons: string[];
  notes: string;
  image: string;
}

const MENU_CATEGORIES: { id: MenuCategoryId; label: string; count: number }[] = [
  { id: 'trending', label: '🔥 Trending', count: 6 },
  { id: 'burgers_wraps', label: '🍔 Burgers & Wraps', count: 4 },
  { id: 'rice_platters', label: '🍱 Rice Platters', count: 3 },
  { id: 'coffee_drinks', label: '☕ Coffee & Drinks', count: 3 },
  { id: 'bakery_desserts', label: '🍰 Bakery & Desserts', count: 3 },
  { id: 'all', label: 'All Menu (13)', count: 13 },
];

const DEFAULT_ADDONS: MenuAddonOption[] = [
  {
    id: 'extra-cheese',
    label: 'Extra Aged Cheddar Cheese',
    bnLabel: 'এক্সট্রা চেডার চিজ',
    price: 40,
  },
  {
    id: 'beef-bacon',
    label: 'Smoked Halal Beef Bacon Strip',
    bnLabel: 'স্মোকড হালাল বিফ বেকন',
    price: 70,
  },
  {
    id: 'jalapeno-dip',
    label: 'House Naga & Jalapeño Dip',
    bnLabel: 'নাগা ও হালাপিনো ডিপ',
    price: 30,
  },
  {
    id: 'caramel-onion',
    label: 'Caramelized Onion & Garlic Jam',
    bnLabel: 'ক্যারামেলাইজড অনিয়ন জ্যাম',
    price: 35,
  },
];

const MENU_ITEMS: MenuDishItem[] = [
  {
    id: 'dish-smokey-bbq-burger',
    category: 'burgers_wraps',
    isTrending: true,
    name: 'Smokey BBQ Beef Brisket Burger',
    bnName: 'স্মোকি বারবিকিউ বিফ ব্রিসকেট বার্গার',
    ingredients:
      'Chargrilled 160g Australian grass-fed beef patty, hickory BBQ glaze, double cheddar, crispy onion rings & house brioche bun.',
    dietaryTags: ['Halal', "Chef's Special", 'Popular'],
    prepTime: '20–25 mins',
    calories: '680 kcal',
    directPrice: 390,
    appPrice: 510,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    variantGroupTitle: 'Select Patty Size (Required)',
    variants: [
      { id: 'single', label: 'Single Patty (160g)', bnLabel: 'সিঙ্গেল প্যাটি', extraPrice: 0 },
      { id: 'double', label: 'Double Patty (320g)', bnLabel: 'ডাবল প্যাটি', extraPrice: 120 },
    ],
    addons: DEFAULT_ADDONS,
  },
  {
    id: 'dish-naga-blast-chicken',
    category: 'burgers_wraps',
    isTrending: true,
    name: 'Crispy Naga Blast Chicken Burger',
    bnName: 'ক্রিস্পি নাগা ব্লাস্ট চিকেন বার্গার',
    ingredients:
      'Buttermilk fried chicken thigh glazed in Sylheti Ghost Pepper (Naga) aioli, pickled slaw, and melted Monterey Jack.',
    dietaryTags: ['Halal', 'Spicy', 'Trending'],
    prepTime: '20 mins',
    calories: '610 kcal',
    directPrice: 340,
    appPrice: 440,
    image:
      'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80',
    variantGroupTitle: 'Select Fillet Option (Required)',
    variants: [
      { id: 'single-fillet', label: 'Single Crispy Fillet', bnLabel: 'সিঙ্গেল ফিলেট', extraPrice: 0 },
      { id: 'double-fillet', label: 'Double Monster Fillet', bnLabel: 'ডাবল ফিলেট', extraPrice: 110 },
    ],
    addons: DEFAULT_ADDONS,
  },
  {
    id: 'dish-shawarma-wrap',
    category: 'burgers_wraps',
    isTrending: false,
    name: 'Charcoal Beef Steak & Toum Saj Wrap',
    bnName: 'চারকোল বিফ স্টেক ও গার্লিক শর্মা র‍্যাপ',
    ingredients:
      'Flame-seared ribeye strips, Lebanese whipped garlic toum, sumac onions, pomegranate molasses & toasted saj flatbread.',
    dietaryTags: ['Halal', "Chef's Special"],
    prepTime: '18 mins',
    calories: '540 kcal',
    directPrice: 320,
    appPrice: 410,
    image:
      'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    variantGroupTitle: 'Select Wrap Size (Required)',
    variants: [
      { id: 'regular-wrap', label: 'Regular Saj Roll (10 inch)', bnLabel: 'রেগুলার রোল', extraPrice: 0 },
      { id: 'jumbo-platter', label: 'Jumbo Cut Platter + Fries', bnLabel: 'জাম্বো প্লাটার', extraPrice: 100 },
    ],
    addons: DEFAULT_ADDONS,
  },
  {
    id: 'dish-falafel-vegan-wrap',
    category: 'burgers_wraps',
    isTrending: false,
    name: 'Mediterranean Herb Falafel & Hummus Wrap',
    bnName: 'মেডিটেরানিয়ান ফালাফেল ও হুমুস র‍্যাপ',
    ingredients:
      'Crispy chickpea & coriander falafel, roasted red pepper hummus, tahini drizzle, Kalamata olives & organic greens.',
    dietaryTags: ['Vegan', 'Halal'],
    prepTime: '15 mins',
    calories: '460 kcal',
    directPrice: 280,
    appPrice: 360,
    image:
      'https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=800&q=80',
    variantGroupTitle: 'Select Bread Base (Required)',
    variants: [
      { id: 'whole-wheat', label: 'Whole-Wheat Pita Wrap', bnLabel: 'হোল-হুইট পিটা', extraPrice: 0 },
      { id: 'sourdough-pocket', label: 'Artisan Sourdough Pocket', bnLabel: 'সাওয়ারডো পকেট', extraPrice: 50 },
    ],
    addons: [
      { id: 'extra-hummus', label: 'Extra Roasted Garlic Hummus', bnLabel: 'এক্সট্রা হুমুস', price: 45 },
      { id: 'jalapeno-dip', label: 'House Naga & Jalapeño Dip', bnLabel: 'নাগা ডিপ', price: 30 },
    ],
  },
  {
    id: 'dish-shahi-mutton-kacchi',
    category: 'rice_platters',
    isTrending: true,
    name: 'Old Dhaka Shahi Mutton Kacchi Platter',
    bnName: 'পুরান ঢাকার শাহী মাটন কাচ্চি প্লাটার',
    ingredients:
      'Slow-cooked tender mutton leg pieces layered with aged Chinigura aromatic rice, saffron, potato, Shahi Jali Kebab & Borhani.',
    dietaryTags: ['Halal', "Chef's Special", 'Popular'],
    prepTime: '30 mins',
    calories: '890 kcal',
    directPrice: 490,
    appPrice: 630,
    image:
      'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
    variantGroupTitle: 'Select Portion Size (Required)',
    variants: [
      { id: 'solo-platter', label: '1:1 Executive Box (2 Pc Mutton)', bnLabel: '১:১ বক্স', extraPrice: 0 },
      { id: 'couple-platter', label: '1:2 Couple Box (4 Pc Mutton + 2 Borhani)', bnLabel: '১:২ কাপল বক্স', extraPrice: 420 },
    ],
    addons: [
      { id: 'extra-borhani', label: 'Shahi Mint Borhani (250ml)', bnLabel: 'শাহী বোরহানি', price: 60 },
      { id: 'jali-kebab', label: 'Extra Beef Jali Kebab (2 pcs)', bnLabel: 'জালি কাবাব ২ পিস', price: 90 },
      { id: 'firni-cup', label: 'Saffron Pistachio Firni Cup', bnLabel: 'জাফরানি ফিরনি', price: 70 },
    ],
  },
  {
    id: 'dish-peri-peri-rice-bowl',
    category: 'rice_platters',
    isTrending: true,
    name: 'Flame-Grilled Peri-Peri Quarter Chicken & Rice Bowl',
    bnName: 'ফ্লেম-গ্রিলড পেরি-পেরি চিকেন ও হার্ব রাইস বোল',
    ingredients:
      '24-hour marinated charcoal-grilled quarter chicken, Mexican spiced butter rice, charred corn salsa & garlic herb sauce.',
    dietaryTags: ['Halal', 'Spicy'],
    prepTime: '25 mins',
    calories: '720 kcal',
    directPrice: 420,
    appPrice: 540,
    image:
      'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
    variantGroupTitle: 'Select Spice & Cut (Required)',
    variants: [
      { id: 'leg-quarter', label: 'Quarter Leg & Thigh (Lemon Herb / Hot)', bnLabel: 'লেগ কোয়ার্টার', extraPrice: 0 },
      { id: 'half-chicken', label: 'Half Grill Chicken Upgrade', bnLabel: 'হাফ চিকেন আপগ্রেড', extraPrice: 210 },
    ],
    addons: DEFAULT_ADDONS,
  },
  {
    id: 'dish-smoked-brisket-polao',
    category: 'rice_platters',
    isTrending: false,
    name: '12-Hour Smoked Beef Tehari & Chuijhal Box',
    bnName: 'স্মোকড বিফ তেহারি ও খুলনার চুইঝাল বক্স',
    ingredients:
      'Mustard-oil infused Old Dhaka beef tehari slow-braised with authentic Khulna Chuijhal bark, green chilies & pickled onion salad.',
    dietaryTags: ['Halal', 'Spicy', "Chef's Special"],
    prepTime: '25 mins',
    calories: '810 kcal',
    directPrice: 380,
    appPrice: 490,
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    variantGroupTitle: 'Select Portion (Required)',
    variants: [
      { id: 'full-plate', label: 'Full Plate (Generous 450g)', bnLabel: 'ফুল প্লেট', extraPrice: 0 },
      { id: 'extra-meat', label: 'Full Plate + Extra Chuijhal Beef', bnLabel: 'এক্সট্রা বিফসহ', extraPrice: 130 },
    ],
    addons: [
      { id: 'extra-borhani', label: 'Shahi Mint Borhani (250ml)', bnLabel: 'শাহী বোরহানি', price: 60 },
      { id: 'naga-pickle', label: 'Roasted Naga Olive Pickle', bnLabel: 'নাগা জলপাই আচার', price: 30 },
    ],
  },
  {
    id: 'dish-spanish-iced-latte',
    category: 'coffee_drinks',
    isTrending: true,
    name: 'Artisan Iced Spanish Condensed Milk Latte',
    bnName: 'আর্টিসান আইসড স্প্যানিশ ল্যাটে',
    ingredients:
      'Double ristretto shot pulled from 100% Brazilian & Ethiopian Arabica beans over velvety condensed milk and cold-filtered milk.',
    dietaryTags: ['Halal', "Chef's Special"],
    prepTime: '10 mins',
    calories: '240 kcal',
    directPrice: 260,
    appPrice: 340,
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    variantGroupTitle: 'Select Cup Size & Milk (Required)',
    variants: [
      { id: 'regular-12oz', label: 'Regular 12oz (Whole Milk)', bnLabel: 'রেগুলার ১২ আউন্স', extraPrice: 0 },
      { id: 'large-16oz', label: 'Large 16oz + Extra Espresso Shot', bnLabel: 'লার্জ ১৬ আউন্স', extraPrice: 70 },
    ],
    addons: [
      { id: 'oat-milk', label: 'Barista Oat Milk Upgrade', bnLabel: 'ওট মিল্ক আপগ্রেড', price: 65 },
      { id: 'caramel-drizzle', label: 'Salted Caramel Cream Foam', bnLabel: 'ক্যারামেল ফোম', price: 40 },
    ],
  },
  {
    id: 'dish-passionfruit-mojito',
    category: 'coffee_drinks',
    isTrending: false,
    name: 'Sreemangal Green Tea & Passionfruit Cooler',
    bnName: 'শ্রীমঙ্গল গ্রিন টি ও প্যাশনফ্রুট কুলার',
    ingredients:
      'Cold-brewed Sreemangal organic green tea shaken with fresh passionfruit pulp, kaffir lime leaves, mint & sparkling water.',
    dietaryTags: ['Vegan', 'Halal'],
    prepTime: '10 mins',
    calories: '130 kcal',
    directPrice: 210,
    appPrice: 280,
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    variantGroupTitle: 'Select Sweetness Level (Required)',
    variants: [
      { id: 'normal-sweet', label: '100% Balanced Sweetness', bnLabel: 'নরমাল সুইট', extraPrice: 0 },
      { id: 'less-sweet', label: '50% Less Sugar + Chia Seeds', bnLabel: 'লেস সুগার + চিয়া সিড', extraPrice: 20 },
    ],
    addons: [
      { id: 'boba-pearls', label: 'Popping Lychee Boba Pearls', bnLabel: 'লিচু বোবা পার্ল', price: 45 },
    ],
  },
  {
    id: 'dish-shahi-badam-borhani',
    category: 'coffee_drinks',
    isTrending: false,
    name: 'Old Dhaka Pistachio & Mint Shahi Borhani (500ml)',
    bnName: 'পেস্তা ও পুদিনা শাহী বোরহানি (৫০০ মিলি)',
    ingredients:
      'House-fermented Bogura doi blended with roasted cumin, black salt, fresh mint leaves, green chili hint & crushed pistachios.',
    dietaryTags: ['Halal', 'Popular'],
    prepTime: '5 mins',
    calories: '290 kcal',
    directPrice: 160,
    appPrice: 220,
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    variantGroupTitle: 'Select Bottle Size (Required)',
    variants: [
      { id: 'bottle-500ml', label: '500ml Chilled Glass Bottle', bnLabel: '৫০০ মিলি বোতল', extraPrice: 0 },
      { id: 'bottle-1000ml', label: '1 Liter Family Jug', bnLabel: '১ লিটার ফ্যামিলি বোতল', extraPrice: 130 },
    ],
    addons: [],
  },
  {
    id: 'dish-burnt-basque-cheesecake',
    category: 'bakery_desserts',
    isTrending: true,
    name: 'San Sebastian Burnt Basque Cheesecake + Belgian Ganache',
    bnName: 'বার্ন্ট বাস্ক চিজকেক ও বেলজিয়ান চকলেট গানাশ',
    ingredients:
      'Creamy caramelized Philadelphia cream cheese center baked at high heat, served with warm 54% Belgian dark chocolate pour-over.',
    dietaryTags: ['Halal', "Chef's Special", 'Popular'],
    prepTime: '15 mins',
    calories: '520 kcal',
    directPrice: 360,
    appPrice: 460,
    image:
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    variantGroupTitle: 'Select Topping Pour (Required)',
    variants: [
      { id: 'dark-chocolate', label: 'Warm Belgian Dark Chocolate Ganache', bnLabel: 'ডার্ক চকলেট গানাশ', extraPrice: 0 },
      { id: 'pistachio-praline', label: 'Iranian Pistachio Praline Cream', bnLabel: 'পেস্তা প্রালিন ক্রিম', extraPrice: 60 },
    ],
    addons: [
      { id: 'extra-ganache', label: 'Extra Chocolate Ganache Tub', bnLabel: 'এক্সট্রা চকলেট টাব', price: 50 },
    ],
  },
  {
    id: 'dish-almond-butter-croissant',
    category: 'bakery_desserts',
    isTrending: false,
    name: 'French Laminated Almond Frangipane Croissant',
    bnName: 'ফ্রেঞ্চ আমন্ড বাটার ক্রোয়াসোঁ',
    ingredients:
      '72-hour cold-fermented French Normandy butter pastry baked twice with roasted almond frangipane cream and flaked almonds.',
    dietaryTags: ['Halal', "Chef's Special"],
    prepTime: '12 mins',
    calories: '410 kcal',
    directPrice: 240,
    appPrice: 310,
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    variantGroupTitle: 'Select Serving Style (Required)',
    variants: [
      { id: 'warm-single', label: 'Warmed Single Croissant', bnLabel: 'সিঙ্গেল ক্রোয়াসোঁ', extraPrice: 0 },
      { id: 'box-of-2', label: 'Box of 2 Croissants (Save ৳40)', bnLabel: '২ পিস বক্স', extraPrice: 200 },
    ],
    addons: [
      { id: 'espresso-butter', label: 'Whipped Espresso Honey Butter', bnLabel: 'এসপ্রেসো হানি বাটার', price: 35 },
    ],
  },
  {
    id: 'dish-tres-leches-saffron',
    category: 'bakery_desserts',
    isTrending: false,
    name: 'Saffron & Pistachio Rasmalai Tres Leches Tub',
    bnName: 'জাফরানি পেস্তা রসমালাই ট্রেস লেচেস কেক',
    ingredients:
      'Featherlight vanilla sponge soaked in saffron-cardamom three-milk reduction, topped with whipped cream and Bogura rasmalai.',
    dietaryTags: ['Halal', 'Popular'],
    prepTime: '10 mins',
    calories: '480 kcal',
    directPrice: 310,
    appPrice: 395,
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    variantGroupTitle: 'Select Tub Size (Required)',
    variants: [
      { id: 'personal-tub', label: 'Personal Tub (250g)', bnLabel: 'পার্সোনাল টাব', extraPrice: 0 },
      { id: 'sharing-tub', label: 'Family Sharing Tin (550g)', bnLabel: 'ফ্যামিলি শেয়ারিং টিন', extraPrice: 270 },
    ],
    addons: [],
  },
];

const INITIAL_CART: CartOrderLine[] = [
  {
    cartLineId: 'init-1',
    dishId: 'dish-smokey-bbq-burger',
    name: 'Smokey BBQ Beef Brisket Burger',
    bnName: 'স্মোকি বারবিকিউ বিফ ব্রিসকেট বার্গার',
    unitPrice: 550,
    appUnitPrice: 670,
    qty: 1,
    selectedVariant: 'Double Patty (320g)',
    addons: ['Extra Aged Cheddar Cheese (+৳40)'],
    notes: 'Medium-well sear, extra BBQ glaze on the side',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
  },
  {
    cartLineId: 'init-2',
    dishId: 'dish-burnt-basque-cheesecake',
    name: 'San Sebastian Burnt Basque Cheesecake + Belgian Ganache',
    bnName: 'বার্ন্ট বাস্ক চিজকেক ও বেলজিয়ান চকলেট গানাশ',
    unitPrice: 360,
    appUnitPrice: 460,
    qty: 1,
    selectedVariant: 'Warm Belgian Dark Chocolate Ganache',
    addons: [],
    notes: '',
    image:
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
  },
];

export const KhabarDirectTabbedMenuSection: React.FC<KhabarDirectTabbedMenuSectionProps> = ({
  title,
  subtitle,
  primaryColor,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('trending');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Customization Modal State
  const [customizingDish, setCustomizingDish] = useState<MenuDishItem | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [modalQty, setModalQty] = useState<number>(1);

  // Cart & Slide-Over Drawer State
  const [cartItems, setCartItems] = useState<CartOrderLine[]>(INITIAL_CART);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [deliveryZoneName, setDeliveryZoneName] = useState<string>('Banani (Road 1–27)');
  const [deliveryZoneFee, setDeliveryZoneFee] = useState<number>(60);
  const [freeDeliveryMin, setFreeDeliveryMin] = useState<number>(1500);

  const crimsonPrimary = primaryColor || '#E11D48';
  const deepCharcoal = '#18181B';
  const emeraldAccent = '#10B981';

  // Sync cart changes to Navbar & Checkout section
  useEffect(() => {
    const totalCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.qty, 0);
    const appSubtotal = cartItems.reduce((acc, item) => acc + item.appUnitPrice * item.qty, 0);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('khabardirect-cart-updated', {
          detail: {
            count: totalCount,
            subtotal,
            appSubtotal,
            items: cartItems,
          },
        })
      );
    }
  }, [cartItems]);

  // Listen for external events (Combo added from Hero, Navbar cart open, Zone updated)
  useEffect(() => {
    const handleAddExternalItem = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail) return;
      const newLine: CartOrderLine = {
        cartLineId: `line-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        dishId: detail.id,
        name: detail.name,
        bnName: detail.bnName || detail.name,
        unitPrice: detail.price,
        appUnitPrice: detail.appPrice || Math.round(detail.price * 1.25),
        qty: detail.qty || 1,
        selectedVariant: detail.selectedVariant || 'Standard Portion',
        addons: detail.addons || [],
        notes: detail.notes || '',
        image: detail.image,
      };
      setCartItems((prev) => [...prev, newLine]);
      setIsCartDrawerOpen(true);
    };

    const handleOpenCart = () => setIsCartDrawerOpen(true);

    const handleZoneChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        setDeliveryZoneName(detail.name || 'Banani');
        setDeliveryZoneFee(typeof detail.fee === 'number' ? detail.fee : 60);
        setFreeDeliveryMin(detail.freeDeliveryMin || 1500);
      }
    };

    window.addEventListener('khabardirect-add-item', handleAddExternalItem);
    window.addEventListener('khabardirect-open-cart', handleOpenCart);
    window.addEventListener('khabardirect-zone-updated', handleZoneChange);
    return () => {
      window.removeEventListener('khabardirect-add-item', handleAddExternalItem);
      window.removeEventListener('khabardirect-open-cart', handleOpenCart);
      window.removeEventListener('khabardirect-zone-updated', handleZoneChange);
    };
  }, []);

  // Filtered Menu Items
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      // Category filter
      if (activeCategory === 'trending') {
        if (!dish.isTrending) return false;
      } else if (activeCategory !== 'all') {
        if (dish.category !== activeCategory) return false;
      }

      // Dietary filter
      if (dietaryFilter !== 'All' && !dish.dietaryTags.includes(dietaryFilter)) {
        return false;
      }

      // Fuzzy search by name, Bangla name, or ingredients
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = dish.name.toLowerCase().includes(q);
        const matchBn = dish.bnName.toLowerCase().includes(q);
        const matchIng = dish.ingredients.toLowerCase().includes(q);
        if (!matchName && !matchBn && !matchIng) return false;
      }

      return true;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  // Open Customization Modal for a Dish
  const openCustomizationModal = (dish: MenuDishItem) => {
    setCustomizingDish(dish);
    setSelectedVariantId(dish.variants[0]?.id || '');
    setSelectedAddonIds([]);
    setSpecialNotes('');
    setModalQty(1);
  };

  // Toggle Addon Checkbox
  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Calculate live customized price inside modal
  const modalUnitPrice = useMemo(() => {
    if (!customizingDish) return 0;
    const variantObj = customizingDish.variants.find((v) => v.id === selectedVariantId);
    const variantExtra = variantObj ? variantObj.extraPrice : 0;
    const addonsExtra = customizingDish.addons
      .filter((a) => selectedAddonIds.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
    return customizingDish.directPrice + variantExtra + addonsExtra;
  }, [customizingDish, selectedVariantId, selectedAddonIds]);

  const modalTotalPrice = modalUnitPrice * modalQty;

  const handleConfirmCustomizedAddToCart = () => {
    if (!customizingDish) return;
    const variantObj =
      customizingDish.variants.find((v) => v.id === selectedVariantId) ||
      customizingDish.variants[0];
    const chosenAddonLabels = customizingDish.addons
      .filter((a) => selectedAddonIds.includes(a.id))
      .map((a) => `${a.label} (+৳${a.price})`);

    const newLine: CartOrderLine = {
      cartLineId: `line-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      dishId: customizingDish.id,
      name: customizingDish.name,
      bnName: customizingDish.bnName,
      unitPrice: modalUnitPrice,
      appUnitPrice: Math.round(modalUnitPrice * 1.26),
      qty: modalQty,
      selectedVariant: variantObj ? variantObj.label : 'Standard',
      addons: chosenAddonLabels,
      notes: specialNotes.trim(),
      image: customizingDish.image,
    };

    setCartItems((prev) => [...prev, newLine]);
    setCustomizingDish(null);
  };

  const updateCartLineQty = (cartLineId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((line) =>
          line.cartLineId === cartLineId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    );
  };

  const removeCartLine = (cartLineId: string) => {
    setCartItems((prev) => prev.filter((line) => line.cartLineId !== cartLineId));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const appEquivalentTotal = cartItems.reduce(
    (sum, item) => sum + item.appUnitPrice * item.qty,
    0
  );
  const isFreeDeliveryUnlocked = cartSubtotal >= freeDeliveryMin;
  const effectiveDeliveryFee = cartSubtotal === 0 ? 0 : isFreeDeliveryUnlocked ? 0 : deliveryZoneFee;
  const grandTotal = cartSubtotal + effectiveDeliveryFee;
  const totalDirectSavings =
    Math.max(0, appEquivalentTotal - cartSubtotal) +
    (isFreeDeliveryUnlocked && cartSubtotal > 0 ? deliveryZoneFee : 0);

  const proceedToCheckoutSection = () => {
    setIsCartDrawerOpen(false);
    if (typeof window !== 'undefined') {
      const el = document.getElementById('khabardirect-direct-checkout');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section
      id="khabardirect-menu-workspace"
      className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-white border-b border-zinc-200 relative"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-emerald-700">
              Direct Kitchen Menu · 0% Aggregator Markup · কাস্টমাইজড অর্ডার মেনু
            </div>
            <EditableText
              as="h2"
              defaultValue={
                title || 'Explore Our Direct Cloud Kitchen & Bakery Menu'
              }
              className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900"
            />
            <EditableText
              as="p"
              defaultValue={
                subtitle ||
                'Click any dish to customize patty sizes, spice levels, and add-ons with instant BDT pricing.'
              }
              className="text-sm text-zinc-600 max-w-2xl"
            />
          </div>

          {/* Grid vs List View Switcher */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="flex items-center p-1 rounded-xl bg-zinc-100 border border-zinc-200">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-zinc-900 shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <LayoutGrid size={13} />
                <span>Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-zinc-900 shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <List size={13} />
                <span>Compact List</span>
              </button>
            </div>
          </div>
        </div>

        {/* STICKY TABBED CATEGORY NAVIGATION + FUZZY SEARCH + DIETARY FILTER */}
        <div className="sticky top-[62px] z-30 bg-white/95 backdrop-blur-md py-3 border-y border-zinc-200 space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Smooth Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
              {MENU_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      isActive
                        ? 'text-white shadow-xs'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80'
                    }`}
                    style={isActive ? { backgroundColor: crimsonPrimary } : undefined}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Instant Fuzzy Search Input */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search "Smokey", "Kacchi", "Latte"...'
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Dietary Filter Buttons */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-100 border border-zinc-200">
                {['All', "Chef's Special", 'Spicy', 'Vegan'].map((tag) => {
                  const active = dietaryFilter === tag;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setDietaryFilter(tag)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                        active
                          ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT CARDS (GRID OR LIST VIEW) */}
        {filteredDishes.length === 0 ? (
          <div className="p-12 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-3">
            <p className="text-sm font-semibold text-zinc-800">
              No dishes matched &ldquo;{searchQuery}&rdquo; in this category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setDietaryFilter('All');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white cursor-pointer"
              style={{ backgroundColor: crimsonPrimary }}
            >
              Reset Filters &amp; Show Full Menu
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'grid grid-cols-1 lg:grid-cols-2 gap-4'
            }
          >
            {filteredDishes.map((dish) => {
              const qtyInCart = cartItems
                .filter((c) => c.dishId === dish.id)
                .reduce((s, c) => s + c.qty, 0);

              if (viewMode === 'list') {
                return (
                  <div
                    key={dish.id}
                    onClick={() => openCustomizationModal(dish)}
                    className="p-4 rounded-2xl bg-[#FAFAFA] hover:bg-white border border-zinc-200/90 transition-shadow hover:shadow-md flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-24 h-24 rounded-xl object-cover shrink-0 bg-zinc-200"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                        <span>{dish.dietaryTags.join(' · ')}</span>
                        <span>·</span>
                        <span>{dish.prepTime}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-zinc-900 truncate">
                        {dish.name}
                      </h3>
                      <p className="text-xs text-zinc-500 truncate">{dish.bnName}</p>
                      <p className="text-xs text-zinc-600 line-clamp-1">{dish.ingredients}</p>
                      <div className="pt-1 flex items-center justify-between gap-2 tabular-nums">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-bold text-zinc-900">
                            ৳{dish.directPrice}
                          </span>
                          <span className="text-xs text-zinc-400 line-through">
                            ৳{dish.appPrice}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openCustomizationModal(dish);
                          }}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white inline-flex items-center gap-1 cursor-pointer"
                          style={{ backgroundColor: crimsonPrimary }}
                        >
                          <Plus size={13} />
                          <span>{qtyInCart > 0 ? `Add (${qtyInCart} in cart)` : 'Add / Customize'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={dish.id}
                  onClick={() => openCustomizationModal(dish)}
                  className="rounded-2xl bg-[#FAFAFA] hover:bg-white border border-zinc-200/90 overflow-hidden flex flex-col justify-between transition-shadow hover:shadow-md cursor-pointer group"
                >
                  <div>
                    <div className="relative h-52 w-full overflow-hidden bg-zinc-200">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 flex items-end justify-between text-xs text-white tabular-nums">
                        <span>{dish.prepTime} · {dish.calories}</span>
                        <span className="text-emerald-300 font-semibold">
                          Save ৳{dish.appPrice - dish.directPrice}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      {/* Clean Unboxed Metadata */}
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <span className="font-medium text-emerald-700">
                          {dish.dietaryTags[0]}
                        </span>
                        {dish.dietaryTags.slice(1).map((t) => (
                          <React.Fragment key={t}>
                            <span>·</span>
                            <span>{t}</span>
                          </React.Fragment>
                        ))}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
                        {dish.name}
                      </h3>
                      <p className="text-xs font-medium text-zinc-500">{dish.bnName}</p>
                      <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2">
                        {dish.ingredients}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-zinc-200/70 flex items-center justify-between gap-3 tabular-nums">
                    <div>
                      <div className="text-[11px] text-zinc-400 line-through">
                        App Price: ৳{dish.appPrice}
                      </div>
                      <div className="text-lg font-bold text-zinc-900">
                        ৳{dish.directPrice}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openCustomizationModal(dish);
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white inline-flex items-center gap-1.5 shadow-2xs hover:opacity-95 transition cursor-pointer"
                      style={{ backgroundColor: crimsonPrimary }}
                    >
                      <Plus size={14} />
                      <span>
                        {qtyInCart > 0 ? `Customize (${qtyInCart})` : '+ Add / Customize'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* PRODUCT ITEM CUSTOMIZATION MODAL (ADD-ONS, PATTY RADIO & SPECIAL NOTES)   */}
      {/* ========================================================================= */}
      {customizingDish && (
        <div
          onClick={() => setCustomizingDish(null)}
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between"
          >
            {/* Modal Header with Dish Preview */}
            <div className="relative h-48 w-full bg-zinc-900 shrink-0">
              <img
                src={customizingDish.image}
                alt={customizingDish.name}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <button
                type="button"
                onClick={() => setCustomizingDish(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer"
                aria-label="Close Customization Modal"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="text-xs text-emerald-400 font-medium">
                  {customizingDish.dietaryTags.join(' · ')} · {customizingDish.prepTime}
                </div>
                <h3 className="text-lg font-bold leading-snug">
                  {customizingDish.name}
                </h3>
                <p className="text-xs text-zinc-300">{customizingDish.bnName}</p>
              </div>
            </div>

            {/* Scrollable Customization Groups */}
            <div className="p-5 overflow-y-auto space-y-5 flex-1">
              <p className="text-xs text-zinc-600 leading-relaxed">
                {customizingDish.ingredients}
              </p>

              {/* 1. REQUIRED RADIO SELECTION (e.g., Single Patty vs Double Patty +৳120) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-zinc-900">
                    {customizingDish.variantGroupTitle}
                  </h4>
                  <span className="text-[11px] font-semibold text-rose-600">
                    Required · Select 1
                  </span>
                </div>

                <div className="space-y-2">
                  {customizingDish.variants.map((v) => {
                    const isChecked = selectedVariantId === v.id;
                    return (
                      <label
                        key={v.id}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${
                          isChecked
                            ? 'bg-rose-50/70 border-rose-300 font-semibold text-zinc-900'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100/70'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="dish-variant"
                            checked={isChecked}
                            onChange={() => setSelectedVariantId(v.id)}
                            className="accent-rose-600"
                          />
                          <div>
                            <div>{v.label}</div>
                            <div className="text-[11px] text-zinc-500 font-normal">
                              {v.bnLabel}
                            </div>
                          </div>
                        </div>
                        <span className="font-mono tabular-nums font-semibold">
                          {v.extraPrice === 0 ? 'Included' : `+৳${v.extraPrice}`}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 2. OPTIONAL ADD-ONS CHECKBOXES */}
              {customizingDish.addons.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-zinc-900">
                      Optional Add-Ons &amp; Extra Dips
                    </h4>
                    <span className="text-[11px] text-zinc-500">
                      Optional · Select Multiple
                    </span>
                  </div>

                  <div className="space-y-2">
                    {customizingDish.addons.map((addon) => {
                      const isChecked = selectedAddonIds.includes(addon.id);
                      return (
                        <label
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${
                            isChecked
                              ? 'bg-emerald-50/70 border-emerald-300 font-semibold text-zinc-900'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100/70'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleAddon(addon.id)}
                              className="accent-emerald-600 rounded"
                            />
                            <div>
                              <div>{addon.label}</div>
                              <div className="text-[11px] text-zinc-500 font-normal">
                                {addon.bnLabel}
                              </div>
                            </div>
                          </div>
                          <span className="font-mono tabular-nums font-semibold text-zinc-900">
                            +৳{addon.price}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. SPECIAL KITCHEN INSTRUCTIONS */}
              <div className="space-y-1.5">
                <label
                  htmlFor="special-kitchen-notes"
                  className="block text-xs font-bold text-zinc-900"
                >
                  Special Kitchen Instructions (Optional)
                </label>
                <textarea
                  id="special-kitchen-notes"
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder='e.g., "Make it extra spicy", "No mayo", "Cut burger in half"...'
                  className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-400"
                />
              </div>
            </div>

            {/* Modal Footer: Quantity Stepper + Dynamic Price Counter CTA */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-700 cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-7 text-center text-xs font-bold tabular-nums">
                  {modalQty}
                </span>
                <button
                  type="button"
                  onClick={() => setModalQty((q) => q + 1)}
                  className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-700 cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleConfirmCustomizedAddToCart}
                className="flex-1 py-3 px-5 rounded-xl text-white text-xs sm:text-sm font-semibold flex items-center justify-between shadow-md hover:opacity-95 transition cursor-pointer tabular-nums"
                style={{ backgroundColor: crimsonPrimary }}
              >
                <span>Add to Cart</span>
                <span className="font-bold">৳{modalTotalPrice.toLocaleString()}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* REAL-TIME CART SLIDE-OVER DRAWER                                          */}
      {/* ========================================================================= */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            onClick={() => setIsCartDrawerOpen(false)}
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
          />

          <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl border-l border-zinc-200 flex flex-col justify-between overflow-hidden">
            {/* Drawer Header */}
            <div
              className="p-5 text-white flex items-center justify-between"
              style={{ backgroundColor: deepCharcoal }}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} style={{ color: crimsonPrimary }} />
                <div>
                  <h3 className="text-sm font-bold">Your Direct Kitchen Order</h3>
                  <p className="text-[11px] text-zinc-400">
                    Zone: {deliveryZoneName} · Zero App Markup
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                aria-label="Close Cart Drawer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Free Delivery Progress Bar */}
            <div className="px-5 py-3 bg-emerald-50 border-b border-emerald-200/80 text-xs">
              {isFreeDeliveryUnlocked ? (
                <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span>
                    Unlocked FREE Delivery (Saved ৳{deliveryZoneFee} delivery fee!)
                  </span>
                </div>
              ) : (
                <div className="space-y-1.5 tabular-nums">
                  <div className="flex items-center justify-between text-emerald-900">
                    <span>
                      Add <strong>৳{(freeDeliveryMin - cartSubtotal).toLocaleString()}</strong> more for FREE Delivery
                    </span>
                    <span className="font-semibold">
                      {Math.min(100, Math.round((cartSubtotal / freeDeliveryMin) * 100))}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-emerald-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-600 transition-all duration-300"
                      style={{
                        width: `${Math.min(100, Math.round((cartSubtotal / freeDeliveryMin) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <p className="text-sm font-semibold text-zinc-700">
                    Your direct order bag is empty
                  </p>
                  <p className="text-xs text-zinc-500">
                    Add fresh burgers, kacchi platters, or bakery items to start saving.
                  </p>
                </div>
              ) : (
                cartItems.map((line) => (
                  <div
                    key={line.cartLineId}
                    className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <img
                        src={line.image}
                        alt={line.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 bg-zinc-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-zinc-900 truncate">
                          {line.name}
                        </h4>
                        <p className="text-[11px] text-zinc-600">
                          {line.selectedVariant}
                        </p>
                        {line.addons.length > 0 && (
                          <p className="text-[11px] text-emerald-700">
                            + {line.addons.join(', ')}
                          </p>
                        )}
                        {line.notes && (
                          <p className="text-[11px] italic text-zinc-500 mt-0.5">
                            Note: &ldquo;{line.notes}&rdquo;
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCartLine(line.cartLineId)}
                        className="text-zinc-400 hover:text-rose-600 p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="pt-2 border-t border-zinc-200/70 flex items-center justify-between tabular-nums">
                      <div className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-lg px-1.5 py-0.5">
                        <button
                          type="button"
                          onClick={() => updateCartLineQty(line.cartLineId, -1)}
                          className="p-1 text-zinc-600 hover:text-zinc-900 cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold px-1.5">{line.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateCartLineQty(line.cartLineId, 1)}
                          className="p-1 text-zinc-600 hover:text-zinc-900 cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-zinc-400 line-through mr-1.5">
                          ৳{(line.appUnitPrice * line.qty).toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-zinc-900">
                          ৳{(line.unitPrice * line.qty).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Summary & Direct Checkout Trigger */}
            <div className="p-5 bg-zinc-50 border-t border-zinc-200 space-y-3 tabular-nums">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Food Subtotal ({cartItemCount} items)</span>
                  <span className="font-semibold text-zinc-900">
                    ৳{cartSubtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Delivery Charge ({deliveryZoneName.split(' (')[0]})</span>
                  <span className="font-semibold text-zinc-900">
                    {effectiveDeliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE (৳0)</span>
                    ) : (
                      `৳${effectiveDeliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-emerald-700 font-medium">
                  <span>3rd-Party Aggregator Service Fee</span>
                  <span>৳0 (Zero Markup)</span>
                </div>
                <div className="pt-2 border-t border-zinc-200 flex items-center justify-between text-sm font-bold text-zinc-900">
                  <span>Total Payable</span>
                  <span className="text-base">৳{grandTotal.toLocaleString()}</span>
                </div>
                {totalDirectSavings > 0 && (
                  <div className="text-[11px] font-semibold text-emerald-700 text-right">
                    You save ৳{totalDirectSavings.toLocaleString()} vs. food delivery apps!
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={proceedToCheckoutSection}
                disabled={cartItems.length === 0}
                className="w-full py-3.5 px-5 rounded-xl text-white text-xs sm:text-sm font-semibold flex items-center justify-between shadow-md hover:opacity-95 transition cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: crimsonPrimary }}
              >
                <span>Proceed to 1-Page Checkout</span>
                <span className="inline-flex items-center gap-1 font-bold">
                  <span>৳{grandTotal.toLocaleString()}</span>
                  <ArrowRight size={15} />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MOBILE-FIRST FIXED BOTTOM BAR (SHOWS ITEM COUNT, LIVE TOTAL & CHECKOUT)   */}
      {/* ========================================================================= */}
      {cartItemCount > 0 && (
        <div className="sticky bottom-3 z-30 max-w-4xl mx-auto px-2 sm:px-4 pt-4 pointer-events-none">
          <div
            className="pointer-events-auto rounded-2xl p-3 sm:px-5 sm:py-3.5 text-white shadow-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3 tabular-nums"
            style={{ backgroundColor: deepCharcoal }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0"
                style={{ backgroundColor: crimsonPrimary }}
              >
                {cartItemCount}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">
                  {cartItemCount} {cartItemCount === 1 ? 'Item' : 'Items'} | ৳{grandTotal.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-400">
                  Saving ৳{totalDirectSavings.toLocaleString()} vs. delivery apps · {effectiveDeliveryFee === 0 ? 'Free Delivery' : `Delivery ৳${effectiveDeliveryFee}`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition cursor-pointer"
              >
                Edit Bag
              </button>
              <button
                type="button"
                onClick={proceedToCheckoutSection}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white inline-flex items-center gap-1.5 shadow-sm hover:opacity-95 transition cursor-pointer"
                style={{ backgroundColor: crimsonPrimary }}
              >
                <span>View Order / Checkout</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
