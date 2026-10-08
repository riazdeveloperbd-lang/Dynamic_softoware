import React, { useState, useEffect } from 'react';
import {
  UtensilsCrossed,
  MapPin,
  Clock,
  ShoppingBag,
  PhoneCall,
  ChevronDown,
  CheckCircle2,
  Flame,
  ShieldCheck,
  Truck,
  Search,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface KhabarDirectNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface KitchenBrand {
  id: string;
  name: string;
  bnName: string;
  specialty: string;
  prepTime: string;
  rating: string;
}

const KITCHEN_BRANDS: KitchenBrand[] = [
  {
    id: 'smokey-ember',
    name: 'Smokey Ember Kitchen & Grill',
    bnName: 'স্মোকি এম্বার ক্লাউড কিচেন',
    specialty: 'Chargrilled Burgers, Rice Bowls & Peri-Peri',
    prepTime: '30–40 min',
    rating: '4.9 ★ (2.4k Direct Orders)',
  },
  {
    id: 'crumb-crust',
    name: 'Crumb & Crust Artisan Bakery',
    bnName: 'ক্রাম্ব অ্যান্ড ক্রাস্ট বেকারি ও ক্যাফে',
    specialty: 'Sourdough, Croissants, Specialty Coffee & Cakes',
    prepTime: '25–35 min',
    rating: '4.9 ★ (1.8k Direct Orders)',
  },
  {
    id: 'sultan-hearth',
    name: 'Sultan’s Hearth Platter House',
    bnName: 'সুলতানস হার্থ বিরিয়ানি ও কাবাব',
    specialty: 'Old Dhaka Kacchi, Beef Tehari & Charcoal Kebabs',
    prepTime: '35–45 min',
    rating: '4.8 ★ (3.1k Direct Orders)',
  },
];

export const KhabarDirectNavbar: React.FC<KhabarDirectNavbarProps> = ({
  title,
  subtitle,
  primaryColor,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<KitchenBrand>(KITCHEN_BRANDS[0]);
  const [isBrandOpen, setIsBrandOpen] = useState<boolean>(false);
  const [activeZoneName, setActiveZoneName] = useState<string>('Banani (Road 1–27)');
  const [activeZoneFee, setActiveZoneFee] = useState<number>(60);
  const [activeZoneEta, setActiveZoneEta] = useState<string>('30–40 mins');
  const [cartCount, setCartCount] = useState<number>(2);
  const [cartSubtotal, setCartSubtotal] = useState<number>(920);

  const crimsonPrimary = primaryColor || '#E11D48';
  const deepCharcoal = '#18181B';
  const emeraldAccent = '#10B981';

  useEffect(() => {
    const handleZoneChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        setActiveZoneName(detail.name || 'Banani');
        setActiveZoneFee(typeof detail.fee === 'number' ? detail.fee : 60);
        setActiveZoneEta(detail.eta || '35–45 mins');
      }
    };

    const handleCartChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        setCartCount(typeof detail.count === 'number' ? detail.count : 0);
        setCartSubtotal(typeof detail.subtotal === 'number' ? detail.subtotal : 0);
      }
    };

    window.addEventListener('khabardirect-zone-updated', handleZoneChange);
    window.addEventListener('khabardirect-cart-updated', handleCartChange);
    return () => {
      window.removeEventListener('khabardirect-zone-updated', handleZoneChange);
      window.removeEventListener('khabardirect-cart-updated', handleCartChange);
    };
  }, []);

  const scrollToSection = (id: string) => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const openCartDrawer = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('khabardirect-open-cart'));
    }
  };

  return (
    <header className="w-full sticky top-0 z-40 shadow-sm">
      {/* Top Direct-Order Savings & Commission-Free Strip */}
      <div
        className="w-full py-2 px-4 sm:px-6 text-white text-xs border-b border-white/10"
        style={{ backgroundColor: deepCharcoal }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex items-center gap-1.5 font-semibold"
              style={{ color: emeraldAccent }}
            >
              <CheckCircle2 size={13} />
              <span>Save up to ৳150 vs. delivery apps on every order!</span>
            </span>
            <span className="hidden md:inline text-zinc-600">·</span>
            <EditableText
              as="span"
              defaultValue={
                subtitle ||
                'Zero 28% aggregator markup · Direct thermal rider dispatch across Dhaka & Chattogram'
              }
              className="hidden md:inline text-zinc-300 font-normal truncate"
            />
          </div>

          <div className="flex items-center gap-4 text-xs text-zinc-300 tabular-nums">
            <button
              type="button"
              onClick={() => scrollToSection('khabardirect-zone-calculator')}
              className="inline-flex items-center gap-1.5 hover:text-white transition cursor-pointer"
            >
              <MapPin size={13} style={{ color: crimsonPrimary }} />
              <span>Zone: {activeZoneName}</span>
              <span className="text-zinc-500">·</span>
              <span style={{ color: emeraldAccent }}>Fee ৳{activeZoneFee}</span>
            </button>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <a
              href="#khabardirect-hygiene-footer"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('khabardirect-hygiene-footer');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 text-zinc-200 hover:text-white font-medium"
            >
              <PhoneCall size={12} className="text-emerald-400" />
              <span>Hotline: +880 1711-984320</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Direct-Ordering Navigation Header */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-zinc-200 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Brand Identity + Cloud Kitchen Concept Switcher */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => scrollToSection('khabardirect-hero')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105"
                style={{ backgroundColor: crimsonPrimary }}
              >
                <UtensilsCrossed size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <EditableText
                    as="span"
                    defaultValue={title || 'KhabarDirect BD'}
                    className="text-base sm:text-lg font-bold tracking-tight text-zinc-900"
                  />
                  <span className="text-xs font-medium text-emerald-700">
                    · Direct Kitchen
                  </span>
                </div>
                <p className="text-xs text-zinc-500 hidden sm:block">
                  {selectedBrand.bnName} · {selectedBrand.prepTime}
                </p>
              </div>
            </button>

            {/* Kitchen Concept Dropdown */}
            <div className="relative hidden lg:block">
              <button
                type="button"
                onClick={() => setIsBrandOpen(!isBrandOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 transition cursor-pointer text-left"
              >
                <div>
                  <div className="text-[11px] text-zinc-500 leading-none">
                    Kitchen Outlet
                  </div>
                  <div className="text-xs font-semibold text-zinc-900 truncate max-w-[190px] mt-0.5">
                    {selectedBrand.name}
                  </div>
                </div>
                <ChevronDown
                  size={14}
                  className={`text-zinc-500 transition-transform ${
                    isBrandOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isBrandOpen && (
                <div className="absolute left-0 mt-2 w-80 rounded-2xl bg-white border border-zinc-200 shadow-xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                    <span>Select Direct Kitchen Concept</span>
                    <span className="font-medium text-emerald-600">0% App Markup</span>
                  </div>
                  <div className="py-1 space-y-1">
                    {KITCHEN_BRANDS.map((brand) => {
                      const isSelected = brand.id === selectedBrand.id;
                      return (
                        <button
                          key={brand.id}
                          type="button"
                          onClick={() => {
                            setSelectedBrand(brand);
                            setIsBrandOpen(false);
                          }}
                          className={`w-full p-2.5 rounded-xl text-left transition flex items-start justify-between gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-rose-50/80 border border-rose-200'
                              : 'hover:bg-zinc-50 border border-transparent'
                          }`}
                        >
                          <div className="space-y-0.5 min-w-0">
                            <div className="text-xs font-semibold text-zinc-900 truncate">
                              {brand.name}
                            </div>
                            <div className="text-[11px] text-zinc-500 truncate">
                              {brand.specialty}
                            </div>
                            <div className="text-[11px] text-zinc-500 tabular-nums">
                              {brand.prepTime} · {brand.rating}
                            </div>
                          </div>
                          {isSelected && (
                            <span
                              className="text-[11px] font-semibold shrink-0"
                              style={{ color: crimsonPrimary }}
                            >
                              Active
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center: Clean Typographic Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold text-zinc-700">
            <button
              type="button"
              onClick={() => scrollToSection('khabardirect-combos')}
              className="hover:text-zinc-950 hover:underline underline-offset-4 cursor-pointer"
            >
              Featured Combos
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('khabardirect-menu-workspace')}
              className="hover:text-zinc-950 hover:underline underline-offset-4 cursor-pointer"
            >
              Full Menu &amp; Customizer
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('khabardirect-zone-calculator')}
              className="hover:text-zinc-950 hover:underline underline-offset-4 cursor-pointer"
            >
              Delivery Fee &amp; ETA Checker
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('khabardirect-direct-checkout')}
              className="hover:text-zinc-950 hover:underline underline-offset-4 cursor-pointer"
            >
              1-Page MFS / COD Checkout
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('khabardirect-live-tracker')}
              className="hover:text-zinc-950 hover:underline underline-offset-4 cursor-pointer"
            >
              Live Order Tracker
            </button>
          </nav>

          {/* Right: Quick Search Jump, ETA Status & Real-Time Cart Trigger */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => scrollToSection('khabardirect-menu-workspace')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 text-xs font-medium transition cursor-pointer"
            >
              <Search size={14} className="text-zinc-500" />
              <span>Search Menu...</span>
            </button>

            <div className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium tabular-nums">
              <Clock size={13} className="text-emerald-600" />
              <span>{activeZoneEta}</span>
            </div>

            <button
              type="button"
              onClick={openCartDrawer}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-sm hover:opacity-95 transition cursor-pointer tabular-nums"
              style={{ backgroundColor: crimsonPrimary }}
            >
              <ShoppingBag size={15} />
              <span>{cartCount} Items</span>
              <span className="opacity-60">|</span>
              <span>৳{cartSubtotal.toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
