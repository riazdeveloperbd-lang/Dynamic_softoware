import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Truck,
  Flame,
  Plus,
  ArrowRight,
  PhoneCall,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import {
  EditableText,
  EditableImage,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface KhabarDirectHeroZoneSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

export interface DeliveryZoneOption {
  id: string;
  name: string;
  bnName: string;
  city: 'Dhaka' | 'Chattogram' | 'Extended';
  eligible: boolean;
  eta: string;
  fee: number;
  freeDeliveryMin: number;
  tierLabel: string;
  kitchenHub: string;
  courierPartner: string;
}

export const BD_DELIVERY_ZONES: DeliveryZoneOption[] = [
  {
    id: 'banani',
    name: 'Banani (Road 1–27 & Chairman Bari)',
    bnName: 'বনানী (রোড ১–২৭)',
    city: 'Dhaka',
    eligible: true,
    eta: '25–35 minutes',
    fee: 60,
    freeDeliveryMin: 1500,
    tierLabel: 'Banani Express Hub: ৳60',
    kitchenHub: 'Banani Road 11 Cloud Hub (1.2 km)',
    courierPartner: 'In-House Thermal Fleet + Pathao Drive API',
  },
  {
    id: 'gulshan-1',
    name: 'Gulshan 1 & Niketan',
    bnName: 'গুলশান ১ ও নিকেতন',
    city: 'Dhaka',
    eligible: true,
    eta: '30–40 minutes',
    fee: 60,
    freeDeliveryMin: 1500,
    tierLabel: 'Gulshan Priority Zone: ৳60',
    kitchenHub: 'Banani Road 11 Cloud Hub (2.1 km)',
    courierPartner: 'In-House Thermal Fleet',
  },
  {
    id: 'gulshan-2',
    name: 'Gulshan 2 & Baridhara Diplomatic Zone',
    bnName: 'গুলশান ২ ও বারিধারা',
    city: 'Dhaka',
    eligible: true,
    eta: '30–40 minutes',
    fee: 65,
    freeDeliveryMin: 1500,
    tierLabel: 'Gulshan 2 Zone: ৳65',
    kitchenHub: 'Banani Road 11 Cloud Hub (2.6 km)',
    courierPartner: 'In-House Thermal Fleet',
  },
  {
    id: 'dhanmondi',
    name: 'Dhanmondi (Road 1–32 & Satmasjid Road)',
    bnName: 'ধানমন্ডি ও সাতমসজিদ রোড',
    city: 'Dhaka',
    eligible: true,
    eta: '35–45 minutes',
    fee: 90,
    freeDeliveryMin: 1500,
    tierLabel: 'Dhanmondi (Extended Zone): ৳90',
    kitchenHub: 'Dhanmondi 27 Kitchen Hub (1.8 km)',
    courierPartner: 'Pathao Drive Instant Rider API',
  },
  {
    id: 'uttara',
    name: 'Uttara (Sectors 1, 3, 4, 7, 11 & 13)',
    bnName: 'উত্তরা (সেক্টর ১–১৩)',
    city: 'Dhaka',
    eligible: true,
    eta: '35–45 minutes',
    fee: 70,
    freeDeliveryMin: 1500,
    tierLabel: 'Uttara Sector Hub: ৳70',
    kitchenHub: 'Uttara Sector 7 Cloud Kitchen (1.9 km)',
    courierPartner: 'In-House Thermal Fleet + Steadfast Express',
  },
  {
    id: 'mirpur',
    name: 'Mirpur 10, 11, 12 & DOHS',
    bnName: 'মিরপুর ১০, ১১, ১২ ও ডিওএইচএস',
    city: 'Dhaka',
    eligible: true,
    eta: '40–50 minutes',
    fee: 80,
    freeDeliveryMin: 1500,
    tierLabel: 'Mirpur Zone: ৳80',
    kitchenHub: 'Mirpur 11 Kitchen Hub (2.4 km)',
    courierPartner: 'Pathao Drive + Paperfly Local',
  },
  {
    id: 'bashundhara',
    name: 'Bashundhara R/A (Blocks A–I)',
    bnName: 'বসুন্ধরা আবাসিক এলাকা',
    city: 'Dhaka',
    eligible: true,
    eta: '30–40 minutes',
    fee: 65,
    freeDeliveryMin: 1500,
    tierLabel: 'Bashundhara Gate Hub: ৳65',
    kitchenHub: 'Bashundhara Apollo Gate Hub (1.5 km)',
    courierPartner: 'In-House Thermal Fleet',
  },
  {
    id: 'badda-lalmatia',
    name: 'Badda, Lalmatia, Khilgaon & Bailey Road',
    bnName: 'বাড্ডা, লালমাটিয়া, খিলগাঁও ও বেইলি রোড',
    city: 'Dhaka',
    eligible: true,
    eta: '35–45 minutes',
    fee: 85,
    freeDeliveryMin: 1500,
    tierLabel: 'Central Dhaka Zone: ৳85',
    kitchenHub: 'Dhanmondi / Banani Split Dispatch',
    courierPartner: 'Pathao Drive Instant API',
  },
  {
    id: 'ctg-gec',
    name: 'Chattogram — GEC Circle, Khulshi & Nasirabad',
    bnName: 'চট্টগ্রাম — জিইসি মোড় ও খুলশী',
    city: 'Chattogram',
    eligible: true,
    eta: '30–40 minutes',
    fee: 60,
    freeDeliveryMin: 1500,
    tierLabel: 'Chattogram GEC Hub: ৳60',
    kitchenHub: 'GEC Circle Cloud Kitchen (1.4 km)',
    courierPartner: 'In-House Chattogram Rider Fleet',
  },
  {
    id: 'ctg-agrabad',
    name: 'Chattogram — Agrabad Commercial Area & Halishahar',
    bnName: 'চট্টগ্রাম — আগ্রাবাদ ও হালিশহর',
    city: 'Chattogram',
    eligible: true,
    eta: '35–45 minutes',
    fee: 75,
    freeDeliveryMin: 1500,
    tierLabel: 'Chattogram Agrabad Zone: ৳75',
    kitchenHub: 'GEC Circle Cloud Kitchen (3.8 km)',
    courierPartner: 'Steadfast Express Rider API',
  },
  {
    id: 'savar-outside',
    name: 'Savar / Gazipur / Keraniganj (Outside Direct Zone)',
    bnName: 'সাভার / গাজীপুর / কেরানীগঞ্জ (ডিরেক্ট জোনের বাইরে)',
    city: 'Extended',
    eligible: false,
    eta: 'Special Dispatch Only',
    fee: 180,
    freeDeliveryMin: 3500,
    tierLabel: 'Outside Standard Radius',
    kitchenHub: 'Requires Custom Chiller Van / Hotline Dispatch',
    courierPartner: 'Dedicated Hotline Catering Fleet',
  },
];

interface FeaturedCombo {
  id: string;
  name: string;
  bnTitle: string;
  desc: string;
  directPrice: number;
  appPrice: number;
  savings: number;
  serves: string;
  prepTime: string;
  tag: string;
  image: string;
}

const FEATURED_COMBOS: FeaturedCombo[] = [
  {
    id: 'combo-smokey-feast',
    name: 'Double Smokey BBQ Burger & Peri-Peri Wings Feast',
    bnTitle: 'ডাবল স্মোকি বারবিকিউ বার্গার ও পেরি-পেরি উইংস কম্বো',
    desc: '2x Double Chargrilled Australian Beef Smash Burgers, 6pc Flame-Grilled Peri-Peri Wings, Loaded Truffle Fries & 2x Artisanal Iced Lemonades.',
    directPrice: 1190,
    appPrice: 1450,
    savings: 260,
    serves: 'Serves 2–3',
    prepTime: '30 mins',
    tag: 'Most Ordered Direct Combo',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'combo-sultan-platter',
    name: 'Old Dhaka Shahi Mutton Kacchi & Beef Seekh Family Box',
    bnTitle: 'শাহী মাটন কাচ্চি ও বিফ শিক কাবাব ফ্যামিলি প্লাটার',
    desc: 'Aromatic Chinigura Mutton Kacchi (3 generous portions), 4pc Charcoal Beef Seekh Kebab, Shahi Borhani (750ml), Jali Kebab & Pistachio Firni.',
    directPrice: 1580,
    appPrice: 1890,
    savings: 310,
    serves: 'Serves 3–4',
    prepTime: '35 mins',
    tag: 'Free Delivery Unlocked',
    image:
      'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'combo-bakery-coffee',
    name: 'Artisan Croissant, Spanish Latte & Basque Cheesecake Box',
    bnTitle: 'আর্টিসান ক্রোয়াসোঁ, স্প্যানিশ ল্যাটে ও চিজকেক বক্স',
    desc: '2x French Butter Almond Croissants, 1x Smoked Beef & Brie Sourdough Melt, 2x Iced Spanish Lattes (100% Arabica) & Burnt Basque Cheesecake slice.',
    directPrice: 980,
    appPrice: 1180,
    savings: 200,
    serves: 'Serves 2',
    prepTime: '25 mins',
    tag: 'Bakery & Cafe Favorite',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
  },
];

export const KhabarDirectHeroZoneSection: React.FC<KhabarDirectHeroZoneSectionProps> = ({
  title,
  subtitle,
  primaryColor,
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('banani');
  const [isLocatingGps, setIsLocatingGps] = useState<boolean>(false);
  const [gpsStatusMessage, setGpsStatusMessage] = useState<string | null>(null);
  const [addedComboId, setAddedComboId] = useState<string | null>(null);

  const crimsonPrimary = primaryColor || '#E11D48';
  const deepCharcoal = '#18181B';
  const emeraldAccent = '#10B981';

  const currentZone =
    BD_DELIVERY_ZONES.find((z) => z.id === selectedZoneId) || BD_DELIVERY_ZONES[0];

  const handleSelectZone = (zoneId: string) => {
    setSelectedZoneId(zoneId);
    setGpsStatusMessage(null);
    const found = BD_DELIVERY_ZONES.find((z) => z.id === zoneId);
    if (found && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('khabardirect-zone-updated', {
          detail: found,
        })
      );
    }
  };

  const handleUseCurrentLocation = () => {
    setIsLocatingGps(true);
    setGpsStatusMessage(null);
    setTimeout(() => {
      setIsLocatingGps(false);
      const detected = BD_DELIVERY_ZONES[0]; // Banani Road 11
      setSelectedZoneId(detected.id);
      setGpsStatusMessage('GPS Locked: Near Road 11, Banani, Dhaka (1.2 km from Cloud Kitchen)');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('khabardirect-zone-updated', {
            detail: detected,
          })
        );
      }
    }, 550);
  };

  const handleAddComboToOrder = (combo: FeaturedCombo) => {
    setAddedComboId(combo.id);
    setTimeout(() => setAddedComboId(null), 1600);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('khabardirect-add-item', {
          detail: {
            id: combo.id,
            name: combo.name,
            bnName: combo.bnTitle,
            price: combo.directPrice,
            appPrice: combo.appPrice,
            qty: 1,
            selectedVariant: combo.serves,
            addons: ['Direct Combo Bundle'],
            notes: '',
            image: combo.image,
          },
        })
      );
    }
  };

  const scrollToMenu = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('khabardirect-menu-workspace');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section id="khabardirect-hero" className="w-full">
      {/* 1. DYNAMIC DARK CHARCOAL HERO + REAL-TIME DELIVERY ZONE CHECKER */}
      <div
        className="w-full text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 border-b border-zinc-800"
        style={{ backgroundColor: deepCharcoal }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 7 Columns: Appetizing Headline, Zero-Markup Callout & Delivery Zone Calculator */}
          <div className="lg:col-span-7 space-y-6">
            {/* Value Callout Line (Unboxed clean editorial metadata) */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium tracking-wide">
              <span style={{ color: emeraldAccent }} className="font-semibold">
                Save up to ৳150 vs. delivery apps on every order
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-300">
                100% Halal Cloud Kitchen
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">
                30–45 Mins Thermal Dispatch
              </span>
            </div>

            <EditableText
              as="h1"
              defaultValue={title || 'Fresh Hot Meals, Direct to Your Door.'}
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1] max-w-2xl"
            />

            <EditableText
              as="p"
              defaultValue={
                subtitle ||
                'Order directly from Smokey Ember Kitchen & Artisan Bakery for exclusive menu combos, faster thermal-sealed delivery, and zero 28% third-party app markups.'
              }
              className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl"
            />

            {/* INTERACTIVE FEATURE: REAL-TIME DELIVERY AREA & FEE CALCULATOR WIDGET */}
            <div
              id="khabardirect-zone-calculator"
              className="p-5 sm:p-6 rounded-2xl bg-zinc-900/95 border border-zinc-800 space-y-4 shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <MapPin size={16} style={{ color: crimsonPrimary }} />
                  <h2 className="text-sm font-semibold text-white">
                    Check Delivery Eligibility, Fee &amp; Live Rider ETA
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={isLocatingGps}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
                >
                  <Navigation size={13} className={isLocatingGps ? 'animate-spin' : ''} />
                  <span>
                    {isLocatingGps ? 'Detecting GPS...' : 'Use My Current Location'}
                  </span>
                </button>
              </div>

              {gpsStatusMessage && (
                <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>{gpsStatusMessage}</span>
                </div>
              )}

              {/* Area Dropdown + Primary CTA */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8">
                  <label htmlFor="bd-delivery-zone-select" className="sr-only">
                    Select Delivery Area
                  </label>
                  <select
                    id="bd-delivery-zone-select"
                    value={selectedZoneId}
                    onChange={(e) => handleSelectZone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-rose-500 cursor-pointer"
                  >
                    {BD_DELIVERY_ZONES.map((zone) => (
                      <option key={zone.id} value={zone.id} className="bg-zinc-900 text-white">
                        {zone.city}: {zone.name} — {zone.eligible ? `৳${zone.fee} (${zone.eta})` : 'Outside Direct Zone'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-4">
                  <button
                    type="button"
                    onClick={scrollToMenu}
                    className="w-full h-full py-3 px-4 rounded-xl text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition cursor-pointer"
                    style={{ backgroundColor: crimsonPrimary }}
                  >
                    <span>Order Menu Now</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              {/* DYNAMIC AREA STATUS OUTPUT */}
              {currentZone.eligible ? (
                <div className="pt-3 border-t border-zinc-800/90 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-400">
                      <CheckCircle2 size={16} className="shrink-0" />
                      <span>
                        Great news! We deliver directly to {currentZone.name.split(' (')[0]}.
                      </span>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-zinc-300">
                      ETA: <strong className="text-white">{currentZone.eta}</strong>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 tabular-nums">
                    <span>
                      Delivery Fee: <strong className="text-white">৳{currentZone.fee}</strong>
                    </span>
                    <span>·</span>
                    <span className="text-emerald-400 font-medium">
                      Free Delivery on orders above ৳{currentZone.freeDeliveryMin.toLocaleString()}
                    </span>
                    <span>·</span>
                    <span>Hub: {currentZone.kitchenHub}</span>
                  </div>

                  <div className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                    <Truck size={12} className="text-zinc-400" />
                    <span>
                      Logistics Dispatch Ready: {currentZone.courierPartner} (Live GPS Tracking)
                    </span>
                  </div>
                </div>
              ) : (
                <div className="pt-3 border-t border-zinc-800/90 space-y-2">
                  <div className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-amber-400">
                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                    <span>
                      Sorry! We currently don&apos;t deliver directly to {currentZone.name.split(' (')[0]}. Contact our hotline for special rider dispatch.
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                    <span>
                      Bulk / Catering Chiller Van available for orders above ৳3,500.
                    </span>
                    <a
                      href="tel:+8801711984320"
                      className="inline-flex items-center gap-1.5 text-white font-semibold hover:underline"
                    >
                      <PhoneCall size={12} className="text-emerald-400" />
                      <span>Call Dispatch: +880 1711-984320</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right 5 Columns: Mouth-Watering Dish Spotlight & Price Comparison vs Food Apps */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <EditableImage
                  defaultSrc="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=85"
                  alt="Smokey Chargrilled Double Beef Burger & Sides"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-xs font-medium text-emerald-400">
                      Chef’s Signature · Prepared Fresh to Order
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Smokey BBQ Double Brisket Burger
                    </h3>
                    <p className="text-xs text-zinc-300">
                      স্মোকি বারবিকিউ ডাবল বিফ বার্গার · Brioche Bun &amp; Aged Cheddar
                    </p>
                  </div>
                  <div className="text-right tabular-nums shrink-0">
                    <div className="text-xs text-zinc-400 line-through">App: ৳620</div>
                    <div className="text-xl font-bold text-white">৳480</div>
                  </div>
                </div>
              </div>

              {/* Direct vs Third-Party App Comparison Strip */}
              <div className="p-5 space-y-3 bg-zinc-900">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">
                    Why order on <strong className="text-white">KhabarDirect BD</strong> instead of aggregator apps?
                  </span>
                  <span className="font-semibold text-emerald-400 tabular-nums">
                    You Save ৳140
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-center tabular-nums">
                  <div className="p-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800">
                    <div className="text-[11px] text-zinc-400">Menu Price</div>
                    <div className="text-xs font-semibold text-white mt-0.5">
                      100% Kitchen Rate
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800">
                    <div className="text-[11px] text-zinc-400">Platform Fee</div>
                    <div className="text-xs font-semibold text-emerald-400 mt-0.5">
                      ৳0 (Zero Markup)
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800">
                    <div className="text-[11px] text-zinc-400">Thermal Seal</div>
                    <div className="text-xs font-semibold text-white mt-0.5">
                      72°C Hot Box
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FEATURED COMBOS & PROMOTIONAL BANNERS (#FAFAFA SOFT CREAM CANVAS) */}
      <div
        id="khabardirect-combos"
        className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-[#FAFAFA] border-b border-zinc-200/80"
      >
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-rose-600">
                Exclusive Direct-Only Platters · ডিরেক্ট কম্বো ডিল
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
                Featured Combos &amp; Chef Specials
              </h2>
              <p className="text-sm text-zinc-600">
                Curated family boxes and office lunch platters unavailable on third-party delivery apps.
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToMenu}
              className="text-xs font-semibold text-zinc-900 hover:underline underline-offset-4 inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>Explore All 24 Menu Items</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_COMBOS.map((combo) => {
              const isAdded = addedComboId === combo.id;
              return (
                <div
                  key={combo.id}
                  className="rounded-2xl bg-white border border-zinc-200/90 overflow-hidden flex flex-col justify-between transition-shadow hover:shadow-md"
                >
                  <div>
                    <div className="relative h-52 w-full overflow-hidden bg-zinc-100">
                      <img
                        src={combo.image}
                        alt={combo.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-3 flex items-end justify-between text-white text-xs tabular-nums">
                        <span className="font-medium">{combo.tag}</span>
                        <span className="text-emerald-300 font-semibold">
                          Save ৳{combo.savings} vs. Apps
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-zinc-500 tabular-nums">
                        <span>{combo.serves}</span>
                        <span>·</span>
                        <span>Prep: {combo.prepTime}</span>
                        <span>·</span>
                        <span className="text-emerald-700 font-medium">100% Halal</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
                        {combo.name}
                      </h3>
                      <p className="text-xs font-medium text-zinc-500">
                        {combo.bnTitle}
                      </p>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {combo.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-zinc-100 flex items-center justify-between gap-3 tabular-nums">
                    <div>
                      <div className="text-[11px] text-zinc-400 line-through">
                        Aggregator App: ৳{combo.appPrice.toLocaleString()}
                      </div>
                      <div className="text-lg font-bold text-zinc-900">
                        ৳{combo.directPrice.toLocaleString()}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddComboToOrder(combo)}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white inline-flex items-center gap-1.5 transition hover:opacity-95 cursor-pointer"
                      style={{
                        backgroundColor: isAdded ? emeraldAccent : crimsonPrimary,
                      }}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle2 size={14} />
                          <span>Added to Order</span>
                        </>
                      ) : (
                        <>
                          <Plus size={14} />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
