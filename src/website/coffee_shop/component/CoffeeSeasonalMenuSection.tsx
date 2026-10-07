import React, { useState } from 'react';
import { Plus, Coffee } from 'lucide-react';
import {
  EditableText,
  EditableImage,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import velvetSeasonalLatte from '../../../assets/images/velvet_seasonal_latte_1791387884708.jpg';
import { useCoffeeShop } from './CoffeeShopContext';

export interface CoffeeSeasonalMenuSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

type MenuCategory =
  | 'Seasonal Drinks'
  | 'Espresso & Coffee'
  | 'House Bakery'
  | 'Cold Brews';

interface CafeMenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  price: number;
  description: string;
  dietary: string;
}

const CAFE_MENU_ITEMS: CafeMenuItem[] = [
  {
    id: 'm_cardamom_latte',
    category: 'Seasonal Drinks',
    name: 'Cardamom Oat Latte',
    price: 6.5,
    description:
      'Espresso infused with house-made cardamom spice syrup and steamed oat milk.',
    dietary: 'Vegan · Dairy-Free · Nut-Free',
  },
  {
    id: 'm_maple_cortado',
    category: 'Seasonal Drinks',
    name: 'Smoked Maple & Rosemary Cortado',
    price: 6.0,
    description:
      'Double ristretto of Velvet Signature Blend, Vermont smoked maple reduction, and velvety micro-foam.',
    dietary: 'Gluten-Free · Nut-Free',
  },
  {
    id: 'm_brown_butter_mocha',
    category: 'Seasonal Drinks',
    name: 'Toasted Tahini & Dark Cocoa Latte',
    price: 6.75,
    description:
      'Single-origin 70% Ecuadorian cacao whisked with organic sesame tahini, espresso, and oat milk.',
    dietary: 'Vegan · Nut-Free · Gluten-Free',
  },
  {
    id: 'm_pourover_yirg',
    category: 'Espresso & Coffee',
    name: 'Hand-Poured Chemex — Ethiopian Yirgacheffe',
    price: 6.25,
    description:
      'Brewed to order at 202°F. Delicate notes of white peach, jasmine blossom, and Meyer lemon.',
    dietary: 'Vegan · Gluten-Free · Nut-Free',
  },
  {
    id: 'm_velvet_flat_white',
    category: 'Espresso & Coffee',
    name: 'Velvet Signature Flat White',
    price: 5.25,
    description:
      'Double shot of our Brazil & Guatemala micro-lot topped with silky grass-fed or barista oat milk.',
    dietary: 'Gluten-Free · Vegan Option',
  },
  {
    id: 'm_espresso_flight',
    category: 'Espresso & Coffee',
    name: 'Roaster’s Espresso Tasting Flight',
    price: 7.5,
    description:
      'Side-by-side single-origin espresso pull paired with a cortado and sparkling mineral water.',
    dietary: 'Gluten-Free · Nut-Free',
  },
  {
    id: 'm_pistachio_croissant',
    category: 'House Bakery',
    name: 'Twice-Baked Sicilian Pistachio Croissant',
    price: 6.25,
    description:
      'Cultured butter laminated pastry filled with roasted Bronte pistachio frangipane and orange blossom glaze.',
    dietary: 'Vegetarian · Baked Fresh at 6 AM',
  },
  {
    id: 'm_cardamom_bun',
    category: 'House Bakery',
    name: 'Swedish Sourdough Cardamom Knot',
    price: 5.5,
    description:
      'Hand-twisted brioche dough layered with freshly mortar-crushed green cardamom pods and pearl sugar.',
    dietary: 'Nut-Free · Vegetarian',
  },
  {
    id: 'm_almond_fig_tart',
    category: 'House Bakery',
    name: 'Roasted Fig & Almond Polenta Galette',
    price: 5.75,
    description:
      'Stone-ground heirloom cornmeal crust with caramelized Mission figs and thyme.',
    dietary: 'Gluten-Free · Vegan',
  },
  {
    id: 'm_nitro_oat',
    category: 'Cold Brews',
    name: '20-Hour Kyoto Slow-Drip Cold Brew',
    price: 5.75,
    description:
      'Ice-steeped drop by drop in glass towers for a syrupy body with zero bitterness and dark chocolate finish.',
    dietary: 'Vegan · Gluten-Free · Nut-Free',
  },
  {
    id: 'm_orange_tonic',
    category: 'Cold Brews',
    name: 'Blood Orange & Botanical Espresso Tonic',
    price: 6.5,
    description:
      'Chilled Ethiopian espresso floated over artisanal cinchona tonic water and dehydrated blood orange.',
    dietary: 'Vegan · Gluten-Free · Nut-Free',
  },
  {
    id: 'm_salted_honey_foam',
    category: 'Cold Brews',
    name: 'Wildflower Honey & Sea Salt Cold Brew',
    price: 6.25,
    description:
      'Velvet Dark Roast cold brew topped with whipped Oregon wildflower honey and flaky sea salt foam.',
    dietary: 'Gluten-Free · Nut-Free',
  },
];

export const CoffeeSeasonalMenuSection: React.FC<
  CoffeeSeasonalMenuSectionProps
> = ({
  title = 'Seasonal Cafe Menu & House Bakery',
  subtitle = 'Crafted daily with organic local dairy, house-made botanical syrups, and stone-milled pastries.',
  variant = 'varient_1',
  primaryColor = '#C86D51',
  isDark = false,
}) => {
  const { addToCart, searchQuery } = useCoffeeShop();
  const [activeTab, setActiveTab] = useState<MenuCategory>('Seasonal Drinks');

  const categories: MenuCategory[] = [
    'Seasonal Drinks',
    'Espresso & Coffee',
    'House Bakery',
    'Cold Brews',
  ];

  const filteredItems = CAFE_MENU_ITEMS.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.dietary.toLowerCase().includes(q)
      );
    }
    return item.category === activeTab;
  });

  return (
    <section
      id="coffee-menu"
      className={`py-20 px-6 border-t transition-colors ${
        isDark
          ? 'bg-[#1B1212] border-[#3D2314] text-[#FAF8F5]'
          : 'bg-[#FAF8F5] border-[#3D2314]/10 text-[#1B1212]'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header + Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium opacity-75">
              <Coffee size={14} style={{ color: primaryColor }} />
              <span style={{ color: primaryColor }} className="font-semibold">
                Seasonal Menu Showcase
              </span>
              <span aria-hidden="true">·</span>
              <span>Order Ahead for Instant Pickup</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
              style={{
                fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                textWrap: 'balance',
              }}
            >
              <EditableText id="coffee_menu_heading" defaultText={title} />
            </h2>

            <EditableText
              id="coffee_menu_sub"
              as="p"
              defaultText={subtitle}
              className="text-sm sm:text-base opacity-80 leading-relaxed block"
            />
          </div>

          {/* 4 Interactive Category Tabs */}
          <div
            className={`inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border self-start ${
              isDark
                ? 'bg-[#261816] border-[#3D2314]'
                : 'bg-[#F7F3E9] border-[#3D2314]/12'
            }`}
          >
            {categories.map((cat) => {
              const active = activeTab === cat && !searchQuery.trim();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition cursor-pointer ${
                    active
                      ? 'text-[#FAF8F5] shadow-xs'
                      : 'opacity-75 hover:opacity-100'
                  }`}
                  style={active ? { backgroundColor: primaryColor } : undefined}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Seasonal Spotlight + Menu Card Grid */}
        <div
          className={`grid grid-cols-1 ${
            variant === 'varient_2'
              ? 'lg:grid-cols-12 gap-8'
              : 'lg:grid-cols-12 gap-8'
          } items-start`}
        >
          {/* Left 4 Columns: Seasonal Barista Feature Photo Card */}
          <div className="lg:col-span-4">
            <div
              className={`rounded-3xl p-5 border space-y-4 ${
                isDark
                  ? 'bg-[#261816] border-[#3D2314]'
                  : 'bg-[#F7F3E9] border-[#3D2314]/12'
              }`}
            >
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#1B1212]">
                <EditableImage
                  id="coffee_seasonal_latte_img"
                  defaultSrc={velvetSeasonalLatte}
                  alt="Cardamom Oat Latte and House Pastry"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono uppercase opacity-70">
                  Autumn / Winter Barista Spotlight
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3
                    className="text-xl font-semibold"
                    style={{
                      fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                    }}
                  >
                    Cardamom Oat Latte
                  </h3>
                  <span
                    className="text-base font-mono font-semibold tabular-nums"
                    style={{ color: primaryColor }}
                  >
                    $6.50
                  </span>
                </div>
                <p className="text-xs opacity-80 leading-relaxed">
                   freshly ground green cardamom pods simmered with organic raw cane sugar, paired with our double-shot Velvet Signature espresso and velvety steamed oat milk.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  addToCart({
                    id: 'm_cardamom_latte',
                    name: 'Cardamom Oat Latte',
                    subtitle: 'Seasonal Drinks · Vegan · Nut-Free',
                    price: 6.5,
                  })
                }
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-[#FAF8F5] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              >
                <Plus size={14} />
                <span>Add Cardamom Oat Latte ($6.50)</span>
              </button>
            </div>
          </div>

          {/* Right 8 Columns: Menu Card Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-transform hover:-translate-y-0.5 ${
                  isDark
                    ? 'bg-[#261816] border-[#3D2314]'
                    : 'bg-[#F7F3E9] border-[#3D2314]/12'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <h4
                      className="text-base font-semibold leading-snug"
                      style={{
                        fontFamily:
                          "'Fraunces', 'Playfair Display', Georgia, serif",
                      }}
                    >
                      {item.name}
                    </h4>
                    <span
                      className="text-sm font-mono font-semibold tabular-nums shrink-0"
                      style={{ color: primaryColor }}
                    >
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-xs opacity-80 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Unboxed Dietary Metadata + Quick Order Button */}
                <div className="pt-3 border-t border-[#3D2314]/10 dark:border-[#3D2314] flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium opacity-70">
                    {item.dietary}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: item.id,
                        name: item.name,
                        subtitle: `${item.category} · ${item.dietary}`,
                        price: item.price,
                      })
                    }
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#FAF8F5] inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Plus size={12} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
