import React, { useState, useEffect } from 'react';
import {
  Package,
  Coffee,
  Leaf,
  CheckCircle2,
  ShoppingBag,
  Sparkles,
  Eye,
  X,
  Plus,
  Minus,
  Calendar,
  FileText,
  CreditCard,
  ShieldCheck,
  Truck,
  Building2,
  Check,
  Award,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface ShiftPantryCuratedBoxesCheckoutSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

type DietaryBadgeId = 'all' | 'nut_free' | 'vegan' | 'gluten_free' | 'keto';

type DeliveryFrequency = 'weekly' | 'biweekly' | 'monthly';

interface CuratedBoxProduct {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  monthlyPrice: number;
  servingsCount: string;
  idealTeamSize: string;
  image: string;
  dietaryBadges: DietaryBadgeId[];
  dietaryLabels: string[];
  shortItemsPreview: string[];
  fullDescription: string;
  whatsInsideBreakdown: {
    category: string;
    items: string[];
    count: string;
  }[];
  nutritionHighlights: {
    avgProtein: string;
    addedSugar: string;
    allergenProtocol: string;
    shelfLife: string;
  };
  roasterOrBrandPartners: string[];
}

const CURATED_BOX_PRODUCTS: CuratedBoxProduct[] = [
  {
    id: 'brain-fuel-150',
    name: 'The "Brain Fuel" 150-Count Box',
    tagline: 'High-protein bars, sprouted nuts, grass-fed jerky & clean dark chocolate',
    badge: 'BESTSELLER · 68% OF OFFICES',
    monthlyPrice: 349,
    servingsCount: '150 Single-Serve Snacks',
    idealTeamSize: 'Ideal for 20–45 Hybrid Staff',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=85',
    dietaryBadges: ['nut_free', 'vegan', 'gluten_free', 'keto'],
    dietaryLabels: [
      'Nut-Free Caddy Included',
      '40% Vegan',
      'Certified Gluten-Free',
      'Keto Friendly',
    ],
    shortItemsPreview: [
      '35x Cold-Pressed Protein & Collagen Bars (RX, Aloha, Mezcla)',
      '30x Sprouted Almonds, Pistachios & Schoolyard Keto Puffs',
      '25x Grass-Fed Biltong, Mushroom Jerky & Lupini Beans',
      '35x Organic Superfood Bites, Sea Salt Plantain & Veggie Crisps',
      '25x 70% Single-Origin Dark Chocolate Squares & Matcha Cookies',
    ],
    fullDescription:
      'Engineered with workplace nutritionists to eliminate the 2:30 PM blood-sugar crash. Arrives in 3 color-coded, counter-ready display caddies with dedicated sealed compartments for Nut-Free and Celiac-safe employees.',
    whatsInsideBreakdown: [
      {
        category: 'Savory & High-Protein Sustenance',
        count: '60 Servings',
        items: [
          'Chomps Grass-Fed Beef & Turkey Sticks',
          'Brami Italian Snacking Lupini Beans (Keto / Vegan)',
          'LesserEvil Organic Himalayan Pink Salt Popcorn',
          'Biena Roasted Chickpea Crisps (100% Nut-Free)',
        ],
      },
      {
        category: 'Clean Energy & Plant-Based Bars',
        count: '50 Servings',
        items: [
          'Aloha Organic Plant-Based Protein Bars',
          'Mezcla Japanese Matcha & Peruvian Cocoa Puffed Bars',
          '88 Acres Seed-Based Bars (Certified School-Safe Nut-Free)',
        ],
      },
      {
        category: 'Afternoon Guilt-Free Treats',
        count: '40 Servings',
        items: [
          'Hu Kitchen Simple Dark Chocolate Gems (Paleo / Vegan)',
          'Partake Superfood Crunchy Cookies (Top-9 Allergen Free)',
          'Solely Organic Whole Fruit Mango & Pineapple Gummies',
        ],
      },
    ],
    nutritionHighlights: {
      avgProtein: '9g – 14g Protein / serving',
      addedSugar: '< 4g Low-Glycemic',
      allergenProtocol: 'Color-Coded Sealed Nut-Free Tray',
      shelfLife: '6+ Months Freshness Guarantee',
    },
    roasterOrBrandPartners: [
      'Hu Kitchen',
      'Aloha Organic',
      '88 Acres (Nut-Free)',
      'LesserEvil',
      'Chomps',
      'Mezcla',
    ],
  },
  {
    id: 'afternoon-espresso-coldbrew',
    name: 'The "Afternoon Pick-Me-Up" Coffee & Cold Brew Crate',
    tagline: 'Direct-trade whole bean espresso, nitro cold brew cans & barista oat milk',
    badge: 'ROASTED 48H PRIOR TO DISPATCH',
    monthlyPrice: 289,
    servingsCount: '180+ Barista Cups + 24 Cold Brews',
    idealTeamSize: 'Ideal for 25–60 Coffee Lovers',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85',
    dietaryBadges: ['nut_free', 'vegan', 'gluten_free', 'keto'],
    dietaryLabels: [
      '100% Plant-Based / Vegan',
      'Zero Sugar Cold Brew',
      'Direct-Trade Certified',
      'Nut-Free & Gluten-Free',
    ],
    shortItemsPreview: [
      '6x 12oz Bags Small-Batch Whole Bean Espresso & Drip Roasts',
      '24x Cans Organic Nitro Cold Brew & Oat Milk Lattes',
      '6x Cartons Oatly / Califia Barista Edition Oat Milk',
      '40x Ceremonial Matcha & Artisanal Botanical Tea Sachets',
      'Includes Compostable Ripple-Wall Cups & Raw Cane/Monkfruit Sticks',
    ],
    fullDescription:
      'Turn your office kitchen into a specialty third-wave café—at 22% the cost of daily coffee shop runs. Beans are roasted to order every Thursday and delivered Monday morning at peak aromatic degassing.',
    whatsInsideBreakdown: [
      {
        category: 'Small-Batch Whole Bean Coffee (Or Ground to Spec)',
        count: '6 Bags (135+ Cups)',
        items: [
          '2x Colombia Huila Honey-Process (Caramel & Citrus Notes)',
          '2x Ethiopia Yirgacheffe Washed (Floral & Bergamot)',
          '2x ShiftPantry Signature Dark-Velvet Espresso Blend',
        ],
      },
      {
        category: 'Ready-to-Drink Cold Brew & Barista Milks',
        count: '24 Cans + 6 Cartons',
        items: [
          '12x Rise Brewing Co. Organic Original Black Nitro Cold Brew',
          '12x Minor Figures Organic Oat Mocha & Latte Cans',
          '6x 32oz Barista Edition Gluten-Free Oat Milk Cartons',
        ],
      },
      {
        category: 'Ceremonial Tea & Zero-Glycemic Sweeteners',
        count: '45 Servings',
        items: [
          'Organic Uji Ceremonial Matcha Single-Serve Packets',
          'Peppermint, Chamomile & Masala Chai Pyramid Sachets',
          'Lakanto Monkfruit & Organic Raw Turbinado Packets',
        ],
      },
    ],
    nutritionHighlights: {
      avgProtein: 'Clean L-Theanine + Caffeine Focus',
      addedSugar: '0g in Black Nitro & Whole Beans',
      allergenProtocol: '100% Dairy-Free & Nut-Free Default',
      shelfLife: 'Roasted Within 72 Hours of Delivery',
    },
    roasterOrBrandPartners: [
      'Counter Culture Partner Roasters',
      'Oatly Barista',
      'Minor Figures',
      'Rise Nitro Cold Brew',
      'Rishi Botanical Teas',
    ],
  },
  {
    id: 'wellness-hydration-pantry',
    name: 'The "Wellness & Hydration" Full Pantry Suite',
    tagline: 'Electrolyte mixers, organic seasonal fruit, kombucha & adaptogenic sparkling tonics',
    badge: 'HR & PEOPLE OPS FAVORITE',
    monthlyPrice: 319,
    servingsCount: '120 Wellness Items + 36 Beverages',
    idealTeamSize: 'Ideal for 25–55 Wellness-Focused Teams',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85',
    dietaryBadges: ['nut_free', 'vegan', 'gluten_free', 'keto'],
    dietaryLabels: [
      '100% Gluten-Free',
      'Certified Vegan Options',
      'Electrolyte & Nootropic',
      'Allergen-Safe Labels',
    ],
    shortItemsPreview: [
      '40x Hydration & Electrolyte Stick Packs (LMNT, Liquid I.V., Cure)',
      '24x Prebiotic Sparkling Sodas & Adaptogenic Brain Tonics (Olipop, Kin)',
      '35x Organic Freeze-Dried Fruit Crisps, Edamame & Seaweed Snacks',
      '20x Overnight Oats Cups & Chia Superfood Bowls',
      'Includes Countertop Acrylic Hydration & Tea Organizer Caddy',
    ],
    fullDescription:
      'Designed for high-output engineering, design, and legal teams who want functional hydration, gut-friendly prebiotic beverages, and clean brain-boosting nootropics without artificial sweeteners.',
    whatsInsideBreakdown: [
      {
        category: 'Functional Hydration & Sparkling Prebiotics',
        count: '64 Servings',
        items: [
          '40x Cure Organic Coconut Water Electrolyte Mixers & LMNT Citrus',
          '12x Olipop Vintage Cola & Crisp Apple Prebiotic Sodas',
          '12x Recess Mood Magnesium & L-Theanine Sparkling Waters',
        ],
      },
      {
        category: 'Clean Plant-Forward & Celiac-Safe Snacks',
        count: '60 Servings',
        items: [
          'Gimme Organic Avocado Oil Roasted Seaweed Thins',
          'The Only Bean Crunchy Dry-Roasted Edamame (14g Protein)',
          'Rind Skin-On Dried Kiwi, Persimmon & Orchard Fruit Chips',
        ],
      },
      {
        category: 'Morning Breakfast & Desk Recovery Fuel',
        count: '32 Servings',
        items: [
          'Mush Ready-to-Eat Vanilla Bean & Blueberry Overnight Oats',
          'Mamma Chia Organic Vitality Squeeze Pouches',
        ],
      },
    ],
    nutritionHighlights: {
      avgProtein: 'Up to 14g Plant Protein',
      addedSugar: 'Zero Artificial Sweeteners or Dyes',
      allergenProtocol: '100% Top-8 Allergen Safe Selection Available',
      shelfLife: 'Ambient + Fridge Ready Sorting Labels',
    },
    roasterOrBrandPartners: [
      'Olipop',
      'Recess',
      'Cure Hydration',
      'The Only Bean',
      'Rind Superfruit',
      'Gimme Organic',
    ],
  },
];

interface CartLineItem {
  productId: string;
  quantity: number;
}

export const ShiftPantryCuratedBoxesCheckoutSection: React.FC<
  ShiftPantryCuratedBoxesCheckoutSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [activeDietaryFilter, setActiveDietaryFilter] =
    useState<DietaryBadgeId>('all');
  const [selectedDetailProduct, setSelectedDetailProduct] =
    useState<CuratedBoxProduct | null>(null);

  // Slide-over B2B Cart & Subscription Builder State
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartLineItem[]>([
    { productId: 'brain-fuel-150', quantity: 1 },
    { productId: 'afternoon-espresso-coldbrew', quantity: 1 },
  ]);
  const [frequency, setFrequency] = useState<DeliveryFrequency>('biweekly');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'net30_invoice'>(
    'net30_invoice'
  );

  // Post-Checkout Onboarding Step State
  const [checkoutStep, setCheckoutStep] = useState<
    'cart_review' | 'post_checkout_onboarding' | 'completed'
  >('cart_review');
  const [companyName, setCompanyName] = useState<string>('Acme Hybrid Labs');
  const [workEmail, setWorkEmail] = useState<string>('ops@acmehybrid.io');
  const [allergenRestrictions, setAllergenRestrictions] = useState<string[]>([
    'Strict Nut-Free Tray Partition',
    'Gluten-Free Dedicated Caddy',
  ]);
  const [preferredDeliveryWindow, setPreferredDeliveryWindow] =
    useState<string>('1st & 3rd Monday at 8:00 AM');
  const [deliveryEntranceType, setDeliveryEntranceType] = useState<
    'front_desk' | 'loading_dock'
  >('front_desk');
  const [buildingNotes, setBuildingNotes] = useState<string>(
    'Check in with 4th Floor Reception; freight elevator no COI needed under 6 crates.'
  );

  const forestGreen = primaryColor || '#1B4332';
  const warmAmber = '#D97706';
  const isBrutalist = variant === 'varient_3';

  // Listen for custom calculator sync event
  useEffect(() => {
    const handleCalcSync = (e: Event) => {
      const customEvent = e as CustomEvent<{
        headcount: number;
        categoryPref: string;
      }>;
      if (!customEvent.detail) return;
      const { headcount, categoryPref } = customEvent.detail;
      const crateQty = Math.max(1, Math.round(headcount / 35));
      const updated: CartLineItem[] = [
        { productId: 'brain-fuel-150', quantity: crateQty },
      ];
      if (categoryPref !== 'snacks_only') {
        updated.push({
          productId: 'afternoon-espresso-coldbrew',
          quantity: Math.max(1, Math.round(crateQty * 0.8)),
        });
      }
      if (categoryPref === 'full_pantry') {
        updated.push({
          productId: 'wellness-hydration-pantry',
          quantity: 1,
        });
      }
      setCartItems(updated);
      setCheckoutStep('cart_review');
      setCartOpen(true);
    };

    window.addEventListener('shiftpantry:apply-calculator-plan', handleCalcSync);
    return () =>
      window.removeEventListener(
        'shiftpantry:apply-calculator-plan',
        handleCalcSync
      );
  }, []);

  const filteredBoxes = CURATED_BOX_PRODUCTS.filter((box) =>
    activeDietaryFilter === 'all'
      ? true
      : box.dietaryBadges.includes(activeDietaryFilter)
  );

  const updateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (!existing && delta > 0) {
        return [...prev, { productId, quantity: delta }];
      }
      return prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const addBoxAndOpenDrawer = (productId: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
    setCheckoutStep('cart_review');
    setCartOpen(true);
  };

  // Frequency multiplier & discount
  const cadenceMultiplier =
    frequency === 'weekly' ? 0.9 : frequency === 'biweekly' ? 0.95 : 1.0;
  const cadenceSavingsPct =
    frequency === 'weekly' ? 10 : frequency === 'biweekly' ? 5 : 0;

  const rawSubtotal = cartItems.reduce((acc, item) => {
    const prod = CURATED_BOX_PRODUCTS.find((p) => p.id === item.productId);
    return acc + (prod ? prod.monthlyPrice * item.quantity : 0);
  }, 0);

  const discountedTotal = Math.round(rawSubtotal * cadenceMultiplier);

  const toggleAllergenItem = (label: string) => {
    setAllergenRestrictions((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  return (
    <section
      id="shiftpantry-boxes"
      className={`py-16 sm:py-24 scroll-mt-20 border-t transition-colors ${
        isDark
          ? 'bg-[#121916] text-stone-100 border-stone-800'
          : 'bg-[#FDFBF7] text-[#1F2937] border-[#E5E0D8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ================= 4. CURATED BOXES & DIETARY INCLUSIVITY ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <span
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white"
              style={{ backgroundColor: forestGreen }}
            >
              <Package size={13} className="text-amber-300" />
              CURATED B2B BOXES & DIETARY INCLUSIVITY
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              <EditableText
                id="shiftpantry_boxes_title"
                defaultText={
                  title ||
                  'Curated Office Crates Built for Every Dietary Preference'
                }
              />
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
              <EditableText
                id="shiftpantry_boxes_subtitle"
                defaultText={
                  subtitle ||
                  'Click any box below to view its complete SKU manifest, macro breakdown, and allergen partitioning protocol—or add directly to your office subscription.'
                }
              />
            </p>
          </div>

          {/* Open Slide-Over Subscription Drawer Button */}
          <div id="shiftpantry-checkout" className="shrink-0">
            <button
              type="button"
              onClick={() => {
                setCheckoutStep('cart_review');
                setCartOpen(true);
              }}
              className={`inline-flex items-center gap-2.5 px-5 py-3.5 text-xs sm:text-sm font-black text-white shadow-md transition cursor-pointer ${
                isBrutalist
                  ? 'rounded-none border-2 border-[#1F2937] shadow-[4px_4px_0px_#D97706]'
                  : 'rounded-2xl'
              }`}
              style={{ backgroundColor: forestGreen }}
            >
              <ShoppingBag size={16} className="text-amber-300" />
              <span>Open Office Subscription Drawer</span>
              <span
                className="px-2 py-0.5 rounded-full text-[11px] font-black text-white"
                style={{ backgroundColor: warmAmber }}
              >
                {cartItems.reduce((sum, i) => sum + i.quantity, 0)} Crates · $
                {discountedTotal}/mo
              </span>
            </button>
          </div>
        </div>

        {/* Visual Dietary & Allergen Filter Bar */}
        <div
          id="shiftpantry-dietary"
          className={`p-4 sm:p-5 rounded-2xl border mb-10 flex flex-wrap items-center justify-between gap-4 ${
            isDark
              ? 'bg-stone-900 border-stone-800'
              : 'bg-white border-[#E5E0D8]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: forestGreen }}
            >
              <Leaf size={17} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-black">
                100% Allergen-Partitioned & Inclusive Pantry Guarantee
              </p>
              <p className="text-[11px] text-stone-500">
                Filter crates by mandatory dietary badges included inside every shipment:
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all' as DietaryBadgeId, label: 'All Curated Crates (3)' },
              { id: 'nut_free' as DietaryBadgeId, label: '🛡️ Nut-Free Safe' },
              { id: 'vegan' as DietaryBadgeId, label: '🌱 Vegan / Plant-Based' },
              {
                id: 'gluten_free' as DietaryBadgeId,
                label: '🌾 Certified Gluten-Free',
              },
              { id: 'keto' as DietaryBadgeId, label: '⚡ Keto & Low-Glycemic' },
            ].map((badge) => {
              const active = activeDietaryFilter === badge.id;
              return (
                <button
                  key={badge.id}
                  type="button"
                  onClick={() => setActiveDietaryFilter(badge.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                    active
                      ? 'text-white border-transparent shadow-xs'
                      : isDark
                      ? 'border-stone-800 bg-stone-950 text-stone-300 hover:border-stone-700'
                      : 'border-[#E5E0D8] bg-[#FDFBF7] text-[#1F2937] hover:border-[#1B4332]'
                  }`}
                  style={
                    active ? { backgroundColor: forestGreen } : undefined
                  }
                >
                  {badge.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Curated Box Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {filteredBoxes.map((box) => {
            const inCartQty =
              cartItems.find((i) => i.productId === box.id)?.quantity || 0;

            return (
              <div
                key={box.id}
                onClick={() => setSelectedDetailProduct(box)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedDetailProduct(box);
                  }
                }}
                className={`group cursor-pointer overflow-hidden border transition-all duration-200 flex flex-col justify-between ${
                  isBrutalist
                    ? 'rounded-none border-2 border-[#1F2937] shadow-[5px_5px_0px_#1B4332]'
                    : 'rounded-3xl border-[#DFD8CC] dark:border-stone-800 hover:shadow-2xl hover:-translate-y-1'
                } ${isDark ? 'bg-stone-900' : 'bg-white'}`}
              >
                <div>
                  {/* Box Visual Header */}
                  <div className="relative h-56 overflow-hidden bg-stone-100">
                    <img
                      src={box.image}
                      alt={box.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                      <span
                        className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-white shadow"
                        style={{ backgroundColor: forestGreen }}
                      >
                        {box.badge}
                      </span>
                      <span
                        className="px-2.5 py-1 rounded-lg text-[11px] font-black text-white shadow"
                        style={{ backgroundColor: warmAmber }}
                      >
                        ${box.monthlyPrice} / box
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs font-bold">
                      <span className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
                        {box.servingsCount}
                      </span>
                      <span className="text-amber-300 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
                        {box.idealTeamSize}
                      </span>
                    </div>
                  </div>

                  {/* Box Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-black text-[#1F2937] dark:text-white group-hover:text-[#1B4332] dark:group-hover:text-amber-400 transition-colors">
                        {box.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
                        {box.tagline}
                      </p>
                    </div>

                    {/* Dietary Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {box.dietaryLabels.map((lbl) => (
                        <span
                          key={lbl}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-[#F5F2EB] dark:bg-stone-800 text-[#1B4332] dark:text-emerald-300"
                        >
                          {lbl}
                        </span>
                      ))}
                    </div>

                    {/* Preview Manifest List */}
                    <div className="space-y-1.5 pt-2 border-t border-stone-100 dark:border-stone-800">
                      <p className="text-[11px] font-black uppercase tracking-wider text-stone-400">
                        What’s Inside Every Shipment:
                      </p>
                      <ul className="space-y-1.5">
                        {box.shortItemsPreview.slice(0, 4).map((line) => (
                          <li
                            key={line}
                            className="flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300"
                          >
                            <CheckCircle2
                              size={14}
                              className="shrink-0 mt-0.5"
                              style={{ color: forestGreen }}
                            />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div
                  className="p-6 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-2.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addBoxAndOpenDrawer(box.id)}
                      className="flex-1 py-3 px-4 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-1.5 shadow-sm transition hover:opacity-95 cursor-pointer"
                      style={{ backgroundColor: forestGreen }}
                    >
                      <ShoppingBag size={14} className="text-amber-300" />
                      <span>
                        {inCartQty > 0
                          ? `In Subscription (${inCartQty}) · Add +1`
                          : 'Subscribe Now'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedDetailProduct(box)}
                      className="py-3 px-3.5 rounded-xl text-xs font-extrabold border border-[#D6CFC2] dark:border-stone-700 hover:border-[#1B4332] flex items-center gap-1 cursor-pointer"
                    >
                      <Eye size={14} style={{ color: warmAmber }} />
                      <span>Full Manifest</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= BIG PRODUCT FULL DETAILS MODAL (ON CARD CLICK) ================= */}
      {selectedDetailProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedDetailProduct(null)}
        >
          <div
            className={`max-w-3xl w-full rounded-3xl overflow-hidden border shadow-2xl ${
              isDark
                ? 'bg-stone-900 border-stone-700 text-stone-100'
                : 'bg-[#FDFBF7] border-[#D6CFC2] text-[#1F2937]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="p-6 text-white flex items-start justify-between gap-4"
              style={{ backgroundColor: forestGreen }}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span
                    className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase"
                    style={{ backgroundColor: warmAmber }}
                  >
                    {selectedDetailProduct.badge}
                  </span>
                  <span className="text-xs font-bold text-emerald-200">
                    {selectedDetailProduct.servingsCount} ·{' '}
                    {selectedDetailProduct.idealTeamSize}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black">
                  {selectedDetailProduct.name}
                </h3>
                <p className="text-xs text-emerald-100 mt-1">
                  {selectedDetailProduct.tagline}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDetailProduct(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                <div className="md:col-span-5 h-52 rounded-2xl overflow-hidden">
                  <img
                    src={selectedDetailProduct.image}
                    alt={selectedDetailProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl sm:text-3xl font-black" style={{ color: forestGreen }}>
                      ${selectedDetailProduct.monthlyPrice}
                      <span className="text-xs font-bold text-stone-500">
                        {' '}
                        / crate (Save up to 10% on Weekly Cadence)
                      </span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {selectedDetailProduct.fullDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDetailProduct.dietaryLabels.map((lbl) => (
                      <span
                        key={lbl}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-950/10 dark:bg-stone-800 text-[#1B4332] dark:text-amber-300"
                      >
                        ✓ {lbl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nutrition & Allergen Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-[#E5E0D8] dark:border-stone-700">
                  <p className="text-[10px] font-bold uppercase text-stone-400">
                    Macro Profile
                  </p>
                  <p className="text-xs font-black mt-0.5">
                    {selectedDetailProduct.nutritionHighlights.avgProtein}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-[#E5E0D8] dark:border-stone-700">
                  <p className="text-[10px] font-bold uppercase text-stone-400">
                    Glycemic Load
                  </p>
                  <p className="text-xs font-black mt-0.5">
                    {selectedDetailProduct.nutritionHighlights.addedSugar}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-[#E5E0D8] dark:border-stone-700">
                  <p className="text-[10px] font-bold uppercase text-stone-400">
                    Allergen Safety
                  </p>
                  <p className="text-xs font-black mt-0.5">
                    {selectedDetailProduct.nutritionHighlights.allergenProtocol}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-[#E5E0D8] dark:border-stone-700">
                  <p className="text-[10px] font-bold uppercase text-stone-400">
                    Freshness SLA
                  </p>
                  <p className="text-xs font-black mt-0.5">
                    {selectedDetailProduct.nutritionHighlights.shelfLife}
                  </p>
                </div>
              </div>

              {/* Full Itemized Manifest */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#1B4332] dark:text-amber-400">
                  Complete Box SKU Manifest & Category Allocation
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {selectedDetailProduct.whatsInsideBreakdown.map((group) => (
                    <div
                      key={group.category}
                      className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-[#E5E0D8] dark:border-stone-700 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black">
                          {group.category}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-black text-white shrink-0"
                          style={{ backgroundColor: warmAmber }}
                        >
                          {group.count}
                        </span>
                      </div>
                      <ul className="space-y-1.5 pt-1">
                        {group.items.map((sku) => (
                          <li
                            key={sku}
                            className="flex items-start gap-1.5 text-[11px] text-stone-600 dark:text-stone-300"
                          >
                            <Check
                              size={13}
                              className="shrink-0 mt-0.5"
                              style={{ color: forestGreen }}
                            />
                            <span>{sku}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partner Brands Strip */}
              <div className="p-4 rounded-2xl bg-[#F5F2EB] dark:bg-stone-800/70 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-extrabold">
                  <Award size={16} style={{ color: warmAmber }} />
                  <span>Featured Artisanal & B-Corp Brands:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDetailProduct.roasterOrBrandPartners.map((partner) => (
                    <span
                      key={partner}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-stone-200 dark:border-stone-800">
                <div className="text-xs text-stone-500">
                  Includes free display caddies, Net-30 invoicing & 1-click SKU swap guarantee.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const id = selectedDetailProduct.id;
                    setSelectedDetailProduct(null);
                    addBoxAndOpenDrawer(id);
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs sm:text-sm font-black text-white flex items-center justify-center gap-2 cursor-pointer"
                  style={{ backgroundColor: forestGreen }}
                >
                  <ShoppingBag size={15} className="text-amber-300" />
                  <span>
                    Add to Office Subscription (${selectedDetailProduct.monthlyPrice})
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SLIDE-OVER B2B SUBSCRIPTION CART & POST-CHECKOUT ONBOARDING ================= */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end"
          onClick={() => setCartOpen(false)}
        >
          <div
            className={`w-full max-w-xl h-full overflow-y-auto shadow-2xl border-l flex flex-col justify-between ${
              isDark
                ? 'bg-stone-900 border-stone-800 text-stone-100'
                : 'bg-[#FDFBF7] border-[#D6CFC2] text-[#1F2937]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div
                className="p-6 text-white flex items-center justify-between gap-3 sticky top-0 z-10"
                style={{ backgroundColor: forestGreen }}
              >
                <div>
                  <span
                    className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider mb-1"
                    style={{ backgroundColor: warmAmber }}
                  >
                    {checkoutStep === 'cart_review'
                      ? 'STEP 1 OF 2 · B2B SUBSCRIPTION BUILDER'
                      : checkoutStep === 'post_checkout_onboarding'
                      ? 'STEP 2 OF 2 · OFFICE DELIVERY & ALLERGEN SETUP'
                      : 'AUTOPILOT SUBSCRIPTION ACTIVE'}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black">
                    {checkoutStep === 'cart_review'
                      ? 'Your Hybrid Office Pantry Plan'
                      : checkoutStep === 'post_checkout_onboarding'
                      ? 'Configure Dietary & Building Access'
                      : 'Welcome to ShiftPantry Autopilot!'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* STEP 1: CART REVIEW & CADENCE BUILDER */}
              {checkoutStep === 'cart_review' && (
                <div className="p-6 space-y-6">
                  {/* Delivery Cadence Selector */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-black uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      <Calendar size={14} style={{ color: warmAmber }} />
                      <span>1. Select Recurring Delivery Cadence</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        {
                          id: 'weekly' as DeliveryFrequency,
                          label: 'Weekly',
                          badge: 'Save 10%',
                        },
                        {
                          id: 'biweekly' as DeliveryFrequency,
                          label: 'Bi-Weekly',
                          badge: 'Save 5% · Popular',
                        },
                        {
                          id: 'monthly' as DeliveryFrequency,
                          label: 'Monthly',
                          badge: 'Standard',
                        },
                      ].map((freq) => {
                        const active = frequency === freq.id;
                        return (
                          <button
                            key={freq.id}
                            type="button"
                            onClick={() => setFrequency(freq.id)}
                            className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                              active
                                ? 'text-white border-transparent shadow-xs'
                                : isDark
                                ? 'border-stone-800 bg-stone-950 text-stone-300'
                                : 'border-[#E5E0D8] bg-white text-[#1F2937]'
                            }`}
                            style={
                              active
                                ? { backgroundColor: forestGreen }
                                : undefined
                            }
                          >
                            <span className="text-xs font-black block">
                              {freq.label}
                            </span>
                            <span
                              className={`text-[10px] font-bold block mt-0.5 ${
                                active ? 'text-amber-300' : 'text-stone-500'
                              }`}
                            >
                              {freq.badge}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected Boxes List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-stone-500">
                        2. Selected Office Crates
                      </span>
                      <span className="text-[11px] font-bold text-stone-500">
                        Modify quantities anytime
                      </span>
                    </div>

                    {CURATED_BOX_PRODUCTS.map((prod) => {
                      const line = cartItems.find(
                        (i) => i.productId === prod.id
                      );
                      const qty = line ? line.quantity : 0;

                      return (
                        <div
                          key={prod.id}
                          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                            qty > 0
                              ? isDark
                                ? 'bg-stone-800/90 border-emerald-700'
                                : 'bg-white border-[#1B4332]'
                              : isDark
                              ? 'bg-stone-950/50 border-stone-800 opacity-75'
                              : 'bg-stone-100/70 border-stone-200 opacity-80'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-14 h-14 rounded-xl object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-black truncate">
                                {prod.name}
                              </p>
                              <p className="text-[11px] text-stone-500">
                                ${prod.monthlyPrice}/box · {prod.servingsCount}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(prod.id, -1)}
                              className="w-7 h-7 rounded-lg border border-stone-300 dark:border-stone-700 flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-700 cursor-pointer"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-6 text-center text-xs font-black">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(prod.id, 1)}
                              className="w-7 h-7 rounded-lg text-white flex items-center justify-center cursor-pointer"
                              style={{ backgroundColor: forestGreen }}
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Corporate Billing Method Toggle: Corporate Card vs Net-30 Invoice */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-black uppercase tracking-wider text-stone-500">
                      3. B2B Billing & Procurement Method
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('net30_invoice')}
                        className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                          paymentMethod === 'net30_invoice'
                            ? 'border-2 bg-[#1B4332]/5 dark:bg-emerald-950/40'
                            : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950'
                        }`}
                        style={
                          paymentMethod === 'net30_invoice'
                            ? { borderColor: forestGreen }
                            : undefined
                        }
                      >
                        <div className="flex items-center justify-between mb-1">
                          <FileText size={16} style={{ color: forestGreen }} />
                          <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400">
                            PO / ACH / WIRE
                          </span>
                        </div>
                        <p className="text-xs font-black">
                          Request Net-30 Corporate Invoice
                        </p>
                        <p className="text-[10px] text-stone-500 mt-0.5">
                          Consolidated monthly PDF for Finance & AP
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                          paymentMethod === 'card'
                            ? 'border-2 bg-[#1B4332]/5 dark:bg-emerald-950/40'
                            : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950'
                        }`}
                        style={
                          paymentMethod === 'card'
                            ? { borderColor: forestGreen }
                            : undefined
                        }
                      >
                        <div className="flex items-center justify-between mb-1">
                          <CreditCard size={16} style={{ color: warmAmber }} />
                          <span className="text-[10px] font-black uppercase text-amber-600">
                            STRIPE B2B
                          </span>
                        </div>
                        <p className="text-xs font-black">
                          Pay via Corporate Card (Brex / Ramp / Amex)
                        </p>
                        <p className="text-[10px] text-stone-500 mt-0.5">
                          Auto-itemized IRS meal/perk tax receipt
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Company & Work Email Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-stone-500 block mb-1">
                        Company / Office Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-stone-500 block mb-1">
                        Work Email (For AP & Tracking)
                      </label>
                      <input
                        type="email"
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: POST-CHECKOUT ONBOARDING SCREEN (DIETARY & DELIVERY ACCESS) */}
              {checkoutStep === 'post_checkout_onboarding' && (
                <div className="p-6 space-y-6">
                  <div className="p-4 rounded-2xl bg-emerald-950/10 dark:bg-emerald-950/40 border border-emerald-800/30 flex items-start gap-3">
                    <Sparkles
                      size={18}
                      className="shrink-0 mt-0.5"
                      style={{ color: forestGreen }}
                    />
                    <div className="text-xs">
                      <p className="font-black">
                        {paymentMethod === 'net30_invoice'
                          ? `Net-30 Corporate Invoice Approved for ${companyName}`
                          : `Stripe Corporate Card Authorized for ${companyName}`}
                      </p>
                      <p className="text-stone-600 dark:text-stone-300 mt-0.5">
                        Complete your 60-second office logistics profile below so our fulfillment team packs and routes your first shipment accurately.
                      </p>
                    </div>
                  </div>

                  {/* 1. Dietary / Allergen Restrictions for the Office */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-black uppercase tracking-wider text-stone-500 block">
                      1. Mandatory Office Dietary & Allergen Restrictions
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Strict Nut-Free Tray Partition',
                        'Gluten-Free Dedicated Caddy',
                        '40%+ Plant-Based / Vegan Ratio',
                        'Keto / Zero-Added-Sugar Focus',
                        'Kosher & Halal Certified Only',
                        'Dairy-Free Barista Milks Only',
                      ].map((allergen) => {
                        const checked = allergenRestrictions.includes(allergen);
                        return (
                          <button
                            key={allergen}
                            type="button"
                            onClick={() => toggleAllergenItem(allergen)}
                            className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between cursor-pointer ${
                              checked
                                ? 'border-[#1B4332] bg-[#1B4332]/10 text-[#1B4332] dark:text-emerald-300'
                                : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950'
                            }`}
                          >
                            <span>{allergen}</span>
                            {checked && <CheckCircle2 size={14} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Preferred Delivery Days & Time Windows */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-stone-500 block">
                      2. Preferred Delivery Day & Morning Arrival Window
                    </label>
                    <select
                      value={preferredDeliveryWindow}
                      onChange={(e) =>
                        setPreferredDeliveryWindow(e.target.value)
                      }
                      className="w-full px-3.5 py-3 rounded-xl text-xs font-bold border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950"
                    >
                      <option value="1st & 3rd Monday at 8:00 AM">
                        1st & 3rd Monday at 8:00 AM (Before Weekly Kickoff)
                      </option>
                      <option value="Every Monday at 7:30 AM">
                        Every Monday at 7:30 AM (Early Bird Pantry Restock)
                      </option>
                      <option value="Every Tuesday at 8:30 AM (Hybrid Peak)">
                        Every Tuesday at 8:30 AM (Synced with Tue–Thu Hybrid Peak)
                      </option>
                      <option value="1st Monday of Month at 9:00 AM">
                        1st Monday of Month at 9:00 AM (Monthly Bulk Drop)
                      </option>
                    </select>
                  </div>

                  {/* 3. Office Delivery Entrance Notes (Loading Dock vs Front Desk) */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-black uppercase tracking-wider text-stone-500 block">
                      3. Building Access: Loading Dock vs. Front Desk Drop-Off
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDeliveryEntranceType('front_desk')}
                        className={`p-3 rounded-xl border text-left text-xs font-bold cursor-pointer ${
                          deliveryEntranceType === 'front_desk'
                            ? 'border-2 border-[#1B4332] bg-[#1B4332]/5'
                            : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-black">
                          <Building2 size={14} style={{ color: forestGreen }} />
                          <span>Front Desk / Breakroom</span>
                        </div>
                        <p className="text-[10px] text-stone-500 mt-0.5">
                          Courier brings shelf-ready trays directly upstairs
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryEntranceType('loading_dock')}
                        className={`p-3 rounded-xl border text-left text-xs font-bold cursor-pointer ${
                          deliveryEntranceType === 'loading_dock'
                            ? 'border-2 border-[#1B4332] bg-[#1B4332]/5'
                            : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-black">
                          <Truck size={14} style={{ color: warmAmber }} />
                          <span>Freight / Loading Dock</span>
                        </div>
                        <p className="text-[10px] text-stone-500 mt-0.5">
                          COI pre-filed with building security & dock master
                        </p>
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={buildingNotes}
                      onChange={(e) => setBuildingNotes(e.target.value)}
                      placeholder="Gate code, elevator instructions, or Facilities contact..."
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: COMPLETED CONFIRMATION */}
              {checkoutStep === 'completed' && (
                <div className="p-6 space-y-5">
                  <div
                    className="p-6 rounded-3xl text-white space-y-3"
                    style={{ backgroundColor: forestGreen }}
                  >
                    <div className="w-11 h-11 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black">
                      <CheckCircle2 size={24} />
                    </div>
                    <h4 className="text-xl font-black">
                      {companyName} Is Now on ShiftPantry Autopilot!
                    </h4>
                    <p className="text-xs text-emerald-100 leading-relaxed">
                      Your first curated shipment and roasted coffee order is scheduled for{' '}
                      <strong className="text-white">
                        {preferredDeliveryWindow}
                      </strong>
                      . Confirmation and Net-30 / Stripe documentation has been sent to{' '}
                      <strong className="text-amber-300">{workEmail}</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Billing Mode:</span>
                      <span className="font-black">
                        {paymentMethod === 'net30_invoice'
                          ? 'Net-30 Corporate Invoice'
                          : 'Stripe Corporate Card'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Arrival Window:</span>
                      <span className="font-black">
                        {preferredDeliveryWindow}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Drop-Off Protocol:</span>
                      <span className="font-black uppercase">
                        {deliveryEntranceType.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Allergen Flags:</span>
                      <span className="font-bold text-right">
                        {allergenRestrictions.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Drawer Footer */}
            <div className="p-6 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-bold">
                  Recurring {frequency.toUpperCase()} Total
                  {cadenceSavingsPct > 0
                    ? ` (Includes ${cadenceSavingsPct}% Cadence Discount)`
                    : ''}
                  :
                </span>
                <span className="text-xl font-black" style={{ color: forestGreen }}>
                  ${discountedTotal}
                </span>
              </div>

              {checkoutStep === 'cart_review' && (
                <button
                  type="button"
                  onClick={() => setCheckoutStep('post_checkout_onboarding')}
                  className="w-full py-4 px-5 rounded-2xl text-xs sm:text-sm font-black text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  style={{ backgroundColor: forestGreen }}
                >
                  <span>
                    {paymentMethod === 'net30_invoice'
                      ? 'Generate Net-30 Invoice & Configure Delivery →'
                      : 'Authorize Corporate Card & Configure Delivery →'}
                  </span>
                </button>
              )}

              {checkoutStep === 'post_checkout_onboarding' && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart_review')}
                    className="px-4 py-3.5 rounded-xl text-xs font-bold border border-stone-300 dark:border-stone-700 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('completed')}
                    className="flex-1 py-3.5 px-5 rounded-xl text-xs sm:text-sm font-black text-white cursor-pointer"
                    style={{ backgroundColor: forestGreen }}
                  >
                    Complete Office Autopilot Setup ✓
                  </button>
                </div>
              )}

              {checkoutStep === 'completed' && (
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutStep('cart_review');
                    setCartOpen(false);
                  }}
                  className="w-full py-3.5 px-5 rounded-xl text-xs font-black text-white cursor-pointer"
                  style={{ backgroundColor: forestGreen }}
                >
                  Done · Return to ShiftPantry
                </button>
              )}

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck size={14} style={{ color: warmAmber }} />
                <span>
                  Skip, pause for holidays, or swap unloved items in 1 click.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
