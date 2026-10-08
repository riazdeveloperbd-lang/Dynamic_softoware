import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Wrench,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Car,
  Bike,
  Truck,
  Headphones,
  Droplets,
  Sun,
  Layers,
  Award,
  AlertCircle,
  ShoppingBag,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface AutoCareHeroCompatibilitySectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

type VehicleCategory = 'Car / SUV' | 'Motorcycle / Scooter';

interface FitmentDatabaseEntry {
  brand: string;
  models: {
    name: string;
    years: string[];
    headlightSocket: string;
    recommendedProducts: {
      id: string;
      name: string;
      bnName: string;
      fitmentNote: string;
      priceBdt: number;
      originalBdt: number;
      tag: string;
    }[];
  }[];
}

const VEHICLE_FITMENT_DB: Record<VehicleCategory, FitmentDatabaseEntry[]> = {
  'Motorcycle / Scooter': [
    {
      brand: 'Yamaha (ইয়ামাহা)',
      models: [
        {
          name: 'R15 V3 / V4 / M',
          years: ['2026', '2025', '2024', '2023', '2021-2022', '2018-2020'],
          headlightSocket: 'Bi-LED / H7 Auxiliary Mount',
          recommendedProducts: [
            {
              id: 'ceramic_spray',
              name: 'Graphene 9H Quick Ceramic Coating Spray (500ml)',
              bnName: 'গ্রাফিন ৯এইচ কুইক সিরামিক কোটিং স্প্রে',
              fitmentNote: '100% Safe for Yamaha Gloss, Matte & Metallic Fairings (১৫-১৮ বার ফুল বাইক কোটিং)',
              priceBdt: 950,
              originalBdt: 1450,
              tag: 'Fairing & Tank UV Shield',
            },
            {
              id: 'helmet_intercom',
              name: 'T-Com Pro IP67 Waterproof Helmet Bluetooth Intercom',
              bnName: 'ওয়াটারপ্রুফ হেলমেট ব্লুটুথ ইন্টারকম (IP67)',
              fitmentNote: 'Universal Clamp & 3M Mount — Fits MT, Studds, Bilmola, Axor & LS2 Full-Face Helmets',
              priceBdt: 2650,
              originalBdt: 3500,
              tag: '40hr Battery · Rider-to-Pillion',
            },
            {
              id: 'seat_cushion',
              name: '3D Air-Mesh & Gel Ergonomic Split-Seat Cushion',
              bnName: '৩ডি এয়ার-মেশ ও জেল সিট কুশন (স্পোর্টস ফিট)',
              fitmentNote: 'Custom Contour Size-M fits R15 V3/V4 Rider Seat with Anti-Slip Dual Straps',
              priceBdt: 890,
              originalBdt: 1300,
              tag: 'Highway & Traffic Back Relief',
            },
          ],
        },
        {
          name: 'FZ-S FI V2 / V3 / V4 Deluxe',
          years: ['2026', '2025', '2024', '2022-2023', '2017-2021'],
          headlightSocket: 'H4 Hi/Lo Plug & Play Socket',
          recommendedProducts: [
            {
              id: 'seat_cushion',
              name: '3D Air-Mesh & Gel Ergonomic Commuter Seat Cushion',
              bnName: '৩ডি এয়ার-মেশ ও জেল সিট কুশন (রাইড-শেয়ার এডিশন)',
              fitmentNote: 'Exact Fit for FZ-S V2/V3/V4 Wide Seat — Reduces Tailbone Pain on 8-Hour Rides',
              priceBdt: 890,
              originalBdt: 1300,
              tag: 'Pathao/Uber Pro Choice',
            },
            {
              id: 'led_headlight',
              name: '120W CANBUS Tri-Color LED Headlight Bulb (H4 Socket)',
              bnName: '১২০ ওয়াট ক্যানবাস এলইডি হেডলাইট আপগ্রেড (H4)',
              fitmentNote: 'Direct H4 Plug & Play for FZ-S — 6000K White + 3000K Fog Yellow (No Wire Cutting)',
              priceBdt: 1650,
              originalBdt: 2400,
              tag: 'Exact H4 Fitment Verified',
            },
            {
              id: 'ceramic_spray',
              name: 'Graphene 9H Quick Ceramic Coating Spray (500ml)',
              bnName: 'গ্রাফিন ৯এইচ কুইক সিরামিক কোটিং স্প্রে',
              fitmentNote: 'Protects Matte Black/Blue FZ-S Tank from Sun Fading & Monsoon Mud Marks',
              priceBdt: 950,
              originalBdt: 1450,
              tag: 'Instant 10-Min Mirror Shine',
            },
          ],
        },
      ],
    },
    {
      brand: 'Suzuki (সুজুকি)',
      models: [
        {
          name: 'Gixxer Monotone / SF / Fi ABS',
          years: ['2026', '2025', '2024', '2022-2023', '2018-2021'],
          headlightSocket: 'H4 Hi/Lo Socket',
          recommendedProducts: [
            {
              id: 'led_headlight',
              name: '120W CANBUS Tri-Color LED Headlight Upgrade (H4)',
              bnName: '১২০ ওয়াট এলইডি হেডলাইট আপগ্রেড (H4 প্লাগ-অ্যান্ড-প্লে)',
              fitmentNote: 'Direct H4 Plug & Play for Gixxer — 300% Brighter Highway Beam with Anti-Glare Cutoff',
              priceBdt: 1650,
              originalBdt: 2400,
              tag: 'Zero Battery Drain',
            },
            {
              id: 'helmet_intercom',
              name: 'T-Com Pro IP67 Waterproof Helmet Bluetooth Intercom',
              bnName: 'ওয়াটারপ্রুফ হেলমেট ব্লুটুথ ইন্টারকম (IP67)',
              fitmentNote: 'Clear Google Maps Voice & Call Answer with 1-Click Glove Button in Heavy Rain',
              priceBdt: 2650,
              originalBdt: 3500,
              tag: 'DSP Wind Noise Cancelling',
            },
            {
              id: 'seat_cushion',
              name: '3D Air-Mesh & Gel Ergonomic Seat Cushion',
              bnName: '৩ডি এয়ার-মেশ ও জেল সিট কুশন',
              fitmentNote: 'Keeps Seat 8°C Cooler in Dhaka Traffic Jam & Drains Rainwater Instantly',
              priceBdt: 890,
              originalBdt: 1300,
              tag: 'Cool-Flow Honeycomb Mesh',
            },
          ],
        },
      ],
    },
    {
      brand: 'Bajaj / Hero / TVS (কমিউটার ও রাইড-শেয়ার)',
      models: [
        {
          name: 'Pulsar 150 / N160 / Apache RTR 4V / Ignitor',
          years: ['2026', '2025', '2024', '2021-2023', '2016-2020'],
          headlightSocket: 'H4 Hi/Lo Standard Socket',
          recommendedProducts: [
            {
              id: 'seat_cushion',
              name: '3D Air-Mesh & Gel Ergonomic Commuter Seat Cushion',
              bnName: '৩ডি এয়ার-মেশ ও জেল সিট কুশন (রাইডার স্পেশাল)',
              fitmentNote: 'Full Coverage Size-L for Pulsar & Apache Seats — Eliminates Back Pain on Long Trips',
              priceBdt: 890,
              originalBdt: 1300,
              tag: '#1 Bestseller for Daily Riders',
            },
            {
              id: 'helmet_intercom',
              name: 'T-Com Pro IP67 Waterproof Helmet Bluetooth Intercom',
              bnName: 'ওয়াটারপ্রুফ হেলমেট ব্লুটুথ ইন্টারকম',
              fitmentNote: 'Never Miss a Pathao/Uber Ride Request or Navigation Turn in Dhaka Traffic',
              priceBdt: 2650,
              originalBdt: 3500,
              tag: 'IP67 Monsoon Proof',
            },
            {
              id: 'pressure_washer',
              name: '48V Cordless High-Pressure Car & Bike Washer Gun',
              bnName: '৪৮ ভোল্ট কর্ডলেস হাই-প্রেশার কার ও বাইক ওয়াশার',
              fitmentNote: 'Draws Water from Any Bucket — Wash Your Bike in 10 Mins at Home Garage',
              priceBdt: 3490,
              originalBdt: 4800,
              tag: 'Saves ৳800/Month Wash Cost',
            },
          ],
        },
      ],
    },
  ],
  'Car / SUV': [
    {
      brand: 'Toyota (টয়োটা)',
      models: [
        {
          name: 'Allion / Premio (A15 / F-Premio / G-Superior)',
          years: ['2023-2025', '2019-2022', '2015-2018', '2010-2014', '2006-2009'],
          headlightSocket: 'D4S / H11 / HB3 (9005) High Beam',
          recommendedProducts: [
            {
              id: 'ceramic_spray',
              name: 'Graphene 9H Quick Ceramic Coating Spray (500ml + 2 GSM Towels)',
              bnName: 'গ্রাফিন ৯এইচ কুইক সিরামিক কোটিং স্প্রে (৫০০ মিলি)',
              fitmentNote: 'Covers Full Sedan 5–6 Times — Deep Showroom Wet Gloss on Pearl White, Black & Silver',
              priceBdt: 950,
              originalBdt: 1450,
              tag: 'Hydrophobic Lotus Effect',
            },
            {
              id: 'pressure_washer',
              name: '48V Dual-Battery High-Pressure Car Washer Kit + Foam Cannon',
              bnName: '৪৮ ভোল্ট হাই-প্রেশার কার ওয়াশার কিট (ফোম ক্যানন সহ)',
              fitmentNote: '350 PSI Safe Paint Pressure — Works from 1 Bucket in Apartment Parking without Tap',
              priceBdt: 3490,
              originalBdt: 4800,
              tag: 'Complete DIY Wash Studio',
            },
            {
              id: 'led_headlight',
              name: '120W CANBUS LED Headlight Pair (H11 / HB3 9005 / D4S)',
              bnName: '১২০ ওয়াট ক্যানবাস এলইডি হেডলাইট পেয়ার (প্লাগ-অ্যান্ড-প্লে)',
              fitmentNote: '100% Error-Free CANBUS for Toyota Allion/Premio — Cuts Through Padma & Sylhet Highway Fog',
              priceBdt: 2850,
              originalBdt: 4200,
              tag: 'Exact Socket Adapter Included',
            },
          ],
        },
        {
          name: 'Corolla Axio / Fielder / Cross / Noah / X-Noah',
          years: ['2024-2026', '2019-2023', '2014-2018', '2008-2013'],
          headlightSocket: 'H4 / H11 / HIR2 (9012)',
          recommendedProducts: [
            {
              id: 'led_headlight',
              name: '120W CANBUS LED Headlight Pair (H4 / H11 / 9012)',
              bnName: '১২০ ওয়াট ক্যানবাস এলইডি হেডলাইট পেয়ার',
              fitmentNote: 'Replaces Dim Yellow Halogen on Axio & Fielder — Instant 6000K Crisp Cutoff Beam',
              priceBdt: 2850,
              originalBdt: 4200,
              tag: 'Plug & Play in 10 Mins',
            },
            {
              id: 'seat_cushion',
              name: 'Orthopedic Gel & Breathable Mesh Car Driver Seat Cushion',
              bnName: 'অর্থোপেডিক জেল ও এয়ার-মেশ কার ড্রাইভার সিট কুশন',
              fitmentNote: 'Fits Axio, Fielder & Noah Driver/Passenger Bucket Seats — Ideal for Uber & Family Trips',
              priceBdt: 1250,
              originalBdt: 1850,
              tag: 'Zero Sweat & Sciatica Relief',
            },
            {
              id: 'ceramic_spray',
              name: 'Graphene 9H Quick Ceramic Coating Spray (500ml)',
              bnName: 'গ্রাফিন ৯এইচ কুইক সিরামিক কোটিং স্প্রে',
              fitmentNote: 'Prevents Yellowing on White Paint & Repels Acid Rain + Bird Droppings for 45 Days',
              priceBdt: 950,
              originalBdt: 1450,
              tag: 'UV400 Paint Shield',
            },
          ],
        },
      ],
    },
    {
      brand: 'Honda / Mitsubishi / Nissan',
      models: [
        {
          name: 'Honda Civic / Grace / Vezel / Outlander / X-Trail',
          years: ['2023-2026', '2018-2022', '2014-2017'],
          headlightSocket: 'H11 Low Beam / 9005 High Beam',
          recommendedProducts: [
            {
              id: 'ceramic_spray',
              name: 'Graphene 9H Quick Ceramic Coating Spray (500ml)',
              bnName: 'গ্রাফিন ৯এইচ কুইক সিরামিক কোটিং স্প্রে',
              fitmentNote: 'Safe on Clear Coat, Chrome Trim, Alloy Wheels & Windshield Glass',
              priceBdt: 950,
              originalBdt: 1450,
              tag: 'Showroom Mirror Gloss',
            },
            {
              id: 'pressure_washer',
              name: '48V Cordless High-Pressure Washer + Snow Foam Bottle',
              bnName: '৪৮ ভোল্ট কর্ডলেস হাই-প্রেশার কার ওয়াশার',
              fitmentNote: '6-in-1 Nozzle Cleans SUV Wheel Arches, Underbody Mud & Roof Easily',
              priceBdt: 3490,
              originalBdt: 4800,
              tag: 'Heavy-Duty Copper Motor',
            },
            {
              id: 'led_headlight',
              name: '120W CANBUS LED Headlight Pair (H11 / 9005)',
              bnName: '১২০ ওয়াট ক্যানবাস এলইডি হেডলাইট পেয়ার',
              fitmentNote: 'Direct Fit for Grace, Vezel & X-Trail Projector/Reflector Housings',
              priceBdt: 2850,
              originalBdt: 4200,
              tag: '30,000 Hours Lifespan',
            },
          ],
        },
      ],
    },
  ],
};

export const AutoCareHeroCompatibilitySection: React.FC<
  AutoCareHeroCompatibilitySectionProps
> = ({
  title,
  subtitle,
  variant,
  primaryColor = '#E11D48',
  isDark = false,
}) => {
  const [vehicleCategory, setVehicleCategory] = useState<VehicleCategory>('Motorcycle / Scooter');
  const [selectedBrandIdx, setSelectedBrandIdx] = useState<number>(0);
  const [selectedModelIdx, setSelectedModelIdx] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [fitmentVerified, setFitmentVerified] = useState<boolean>(true);
  const [addedItemToast, setAddedItemToast] = useState<string | null>(null);

  const brands = VEHICLE_FITMENT_DB[vehicleCategory];
  const currentBrand = brands[selectedBrandIdx] || brands[0];
  const currentModel =
    currentBrand.models[selectedModelIdx] || currentBrand.models[0];

  const handleCategorySwitch = (cat: VehicleCategory) => {
    setVehicleCategory(cat);
    setSelectedBrandIdx(0);
    setSelectedModelIdx(0);
    setSelectedYear(VEHICLE_FITMENT_DB[cat][0].models[0].years[0]);
    setFitmentVerified(true);
  };

  const handleSelectItemForOrder = (productName: string, price: number) => {
    setAddedItemToast(
      `Selected "${productName}" (৳${price.toLocaleString()}) for ${currentBrand.brand.split(' ')[0]} ${currentModel.name}`
    );
    setTimeout(() => setAddedItemToast(null), 3200);
    const codSection = document.getElementById('auto-bundles-cod-section');
    if (codSection) {
      codSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isSplitShowcase = variant === 'varient_1';
  const isCenteredCommand = variant === 'varient_2';

  return (
    <div
      id="auto-hero-section"
      className={`w-full transition-colors ${
        isDark
          ? 'bg-[#090D16] text-slate-100'
          : 'bg-[#0F172A] text-white'
      }`}
    >
      {/* Floating Fitment Selection Toast */}
      {addedItemToast && (
        <div
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-xs font-extrabold text-white shadow-2xl flex items-center gap-2.5"
          style={{ backgroundColor: primaryColor }}
        >
          <CheckCircle2 size={16} />
          <span>{addedItemToast}</span>
        </div>
      )}

      {/* ================================================================= */}
      {/* 1. HERO SECTION: HIGH-ENERGY SHINE, SAFER RIDES & DIY UPGRADES    */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden border-b border-slate-800/80">
        {/* Subtle Tactical Radial Glow */}
        <div
          className="pointer-events-none absolute -top-36 right-1/4 w-[540px] h-[540px] rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${primaryColor}, transparent 70%)` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
          <div
            className={`grid grid-cols-1 ${
              isCenteredCommand
                ? 'max-w-4xl mx-auto text-center gap-10'
                : 'lg:grid-cols-12 gap-10 lg:gap-12 items-center'
            }`}
          >
            {/* Left / Main Copy Column */}
            <div
              className={
                isCenteredCommand ? 'space-y-6' : 'lg:col-span-7 space-y-6'
              }
            >
              {/* Clean Unboxed Metadata Kicker (Zero-Pill Discipline) */}
              <div
                className={`flex flex-wrap items-center gap-2 text-xs font-bold tracking-wide text-amber-400 ${
                  isCenteredCommand ? 'justify-center' : ''
                }`}
              >
                <span>DIY AUTO &amp; BIKE DETAILING STUDIO BD</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-300">১০০% ইমপোর্টেড গ্রেড</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-emerald-400">৪২,০০০+ রাইডার ও কার ওনারদের আস্থা</span>
              </div>

              {/* H1 Headline */}
              <h1
                className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-[1.15] text-white"
                style={{ textWrap: 'balance' }}
              >
                <EditableText
                  id="auto_hero_h1"
                  defaultText={
                    title ||
                    'মাত্র ১০ মিনিটে শোরুমের মতো নতুনের চমক — আপনার শখের গাড়ি ও বাইকের প্রিমিয়াম প্রটেকশন এবং স্মার্ট আপগ্রেড!'
                  }
                />
              </h1>

              {/* Persuasive Bilingual Subheadline */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                <EditableText
                  id="auto_hero_subtitle"
                  defaultText={
                    subtitle ||
                    'সার্ভিস সেন্টারের হাজার টাকা খরচ আর ঘণ্টার পর ঘণ্টা সিরিয়াল এখন অতীত! ঢাকার কড়া রোদ, বর্ষার কাদা ও ধুলাবালি থেকে আপনার গাড়ি বা বাইককে রাখুন ১০০% সুরক্ষিত। গ্রাফিন ৯এইচ সিরামিক কোটিং স্প্রে, ওয়াটারপ্রুফ হেলমেট ইন্টারকম, হাই-প্রেশার কার ওয়াশার এবং প্লাগ-অ্যান্ড-প্লে এলইডি হেডলাইট এখন সরাসরি আপনার হাতের মুঠোয়।'
                  }
                />
              </p>

              {/* Bullet Value Propositions */}
              <ul
                className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200 pt-1 ${
                  isCenteredCommand ? 'text-left max-w-2xl mx-auto' : ''
                }`}
              >
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-400 shrink-0 mt-0.5"
                  />
                  <span>
                    <strong className="text-white">১০ মিনিটে মিরর শাইন:</strong> ওয়াশের পর স্প্রে করে মুছে নিলেই ৪৫ দিনের হাইড্রোফোবিক সিরামিক প্রটেকশন।
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-400 shrink-0 mt-0.5"
                  />
                  <span>
                    <strong className="text-white">রাইড-শেয়ার ও ট্যুরিং কমফোর্ট:</strong> IP67 ওয়াটারপ্রুফ ইন্টারকম এবং ৩ডি এয়ার-মেশ জেল সিট কুশন।
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-400 shrink-0 mt-0.5"
                  />
                  <span>
                    <strong className="text-white">বালতি থেকেই হাই-প্রেশার ওয়াশ:</strong> ট্যাপের লাইন ছাড়াই এক বালতি পানিতে বাসায় বসে প্রফেশনাল ফোম ওয়াশ।
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-400 shrink-0 mt-0.5"
                  />
                  <span>
                    <strong className="text-white">১০০% প্লাগ-অ্যান্ড-প্লে ফিটমেন্ট:</strong> কোনো তার কাটা বা ব্যাটারির ক্ষতি ছাড়াই ১০ মিনিটে নিজেই ইনস্টল করুন।
                  </span>
                </li>
              </ul>

              {/* Distinct CTA Buttons */}
              <div
                className={`flex flex-wrap items-center gap-3.5 pt-3 ${
                  isCenteredCommand ? 'justify-center' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('auto-bundles-cod-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-white shadow-lg hover:opacity-95 transition flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: primaryColor }}
                >
                  <ShoppingBag size={16} />
                  <span>কম্বো প্যাক ও ডিসকাউন্ট দেখুন (৩০% ছাড়)</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('auto-compatibility-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-slate-100 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Wrench size={15} className="text-amber-400" />
                  <span>আপনার গাড়ি/বাইকের মডেল মিলিয়ে দেখুন</span>
                </button>
              </div>

              {/* Claim-to-Proof Adjacency Metrics */}
              <div className="pt-4 border-t border-slate-800/90 grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <div className="text-lg sm:text-xl font-black font-mono tabular-nums text-white">
                    ৳৮,৫০০+
                  </div>
                  <div className="text-[11px] text-slate-400">
                    বার্ষিক ওয়াশ ও পলিশ খরচ সাশ্রয়
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black font-mono tabular-nums text-emerald-400">
                    ৪.৯২ ★
                  </div>
                  <div className="text-[11px] text-slate-400">
                    ৪,৮০০+ ভেরিফাইড রিভিউ
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black font-mono tabular-nums text-amber-400">
                    ৭ দিন
                  </div>
                  <div className="text-[11px] text-slate-400">
                    ফিটমেন্ট ওয়ারেন্টি ও এক্সচেঞ্জ
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Garage Showcase Card */}
            {!isCenteredCommand && (
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-2xl">
                  {/* Top Header */}
                  <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
                    <span className="font-bold text-slate-200">
                      TorqueGear BD · 5-in-1 DIY Detailing &amp; Upgrade Ecosystem
                    </span>
                    <span className="font-mono tabular-nums text-emerald-400 font-bold">
                      In Stock · Dhaka Hub
                    </span>
                  </div>

                  {/* Hero Visual Image with Resilient Fallback */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                    <img
                      src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1000&q=85"
                      alt="Graphene Ceramic Coating Hydrophobic Water Beading on Car & Motorcycle"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4">
                      <div className="text-[11px] font-semibold text-amber-400">
                        HYDROPHOBIC 9H GRAPHENE COATING + DIY UPGRADE GEAR
                      </div>
                      <div className="text-sm sm:text-base font-extrabold text-white">
                        পানি, কাদা ও রোদে রঙ জ্বলে যাওয়া থেকে ১০০% সুরক্ষা
                      </div>
                    </div>
                  </div>

                  {/* 5 Quick Product Spec Rows */}
                  <div className="space-y-2 text-xs">
                    {[
                      {
                        name: '01. Graphene 9H Quick Ceramic Spray (500ml)',
                        spec: '45-Day Mirror Gloss · ৳950',
                      },
                      {
                        name: '02. T-Com Pro IP67 Helmet Bluetooth Intercom',
                        spec: '40hr Battery · Rainproof · ৳2,650',
                      },
                      {
                        name: '03. 48V Cordless High-Pressure Car/Bike Washer',
                        spec: '350 PSI Bucket Self-Priming · ৳3,490',
                      },
                      {
                        name: '04. 120W CANBUS LED Headlight Upgrade (H4/H11)',
                        spec: '300% Brighter · Plug & Play · ৳1,650',
                      },
                      {
                        name: '05. 3D Air-Mesh & Gel Ergonomic Seat Cushion',
                        spec: 'Zero Back Pain & Heat Relief · ৳890',
                      },
                    ].map((row) => (
                      <div
                        key={row.name}
                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-950/70 border border-slate-800/80"
                      >
                        <span className="font-semibold text-slate-200 truncate pr-2">
                          {row.name}
                        </span>
                        <span className="font-mono tabular-nums text-[11px] text-amber-400 font-bold shrink-0">
                          {row.spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. INTERACTIVE VEHICLE MODEL COMPATIBILITY CHECKER                */}
      {/* ================================================================= */}
      <section
        id="auto-compatibility-section"
        className={`py-14 lg:py-20 ${
          isDark ? 'bg-[#0D1322]' : 'bg-[#F8FAFC] text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400">
                01. INTERACTIVE VEHICLE MODEL COMPATIBILITY CHECKER
              </div>
              <h2
                className={`text-2xl sm:text-3xl font-black tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                <EditableText
                  id="auto_fitment_h2"
                  defaultText="আপনার গাড়ি বা বাইকের সাথে কি আমাদের গিয়ার ফিট হবে? মাত্র ১০ সেকেন্ডে মিলিয়ে দেখুন!"
                />
              </h2>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                ভুল সাইজের হেডলাইট বাল্ব বা সিট কুশন কিনে টাকা নষ্ট করবেন না। নিচের ড্রপডাউন থেকে আপনার বাহনের ধরন, ব্র্যান্ড এবং মডেল সিলেক্ট করুন—আমাদের ডাটাবেস সাথে সাথে ১০০% কম্প্যাটিবল প্রোডাক্ট ও সকেট সাইজ দেখিয়ে দেবে।
              </p>
            </div>

            {/* Fitment Guarantee Note */}
            <div
              className={`px-4 py-3 rounded-xl border text-xs flex items-center gap-2.5 self-start ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-200'
                  : 'bg-white border-slate-200 text-slate-700 shadow-xs'
              }`}
            >
              <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
              <div>
                <div className="font-bold">১০০% সঠিক ফিটমেন্ট গ্যারান্টি</div>
                <div className="text-[11px] opacity-75">
                  মডেল না মিললে ডেলিভারি ম্যানের কাছেই ফ্রি এক্সচেঞ্জ সুবিধা
                </div>
              </div>
            </div>
          </div>

          {/* Interactive 4-Step Dropdown Selector Box */}
          <div
            className={`rounded-2xl border p-6 lg:p-8 space-y-6 ${
              isDark
                ? 'bg-[#111827] border-slate-800'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            {/* Step Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. Vehicle Type */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold opacity-80">
                  ১. বাহনের ধরন (Vehicle Type)
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
                  {(['Motorcycle / Scooter', 'Car / SUV'] as VehicleCategory[]).map(
                    (cat) => {
                      const active = vehicleCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleCategorySwitch(cat)}
                          className={`py-2 px-2.5 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                            active
                              ? 'text-white shadow-xs'
                              : isDark
                              ? 'text-slate-300 hover:text-white'
                              : 'text-slate-700 hover:text-slate-900'
                          }`}
                          style={
                            active ? { backgroundColor: primaryColor } : undefined
                          }
                        >
                          {cat === 'Motorcycle / Scooter' ? (
                            <Bike size={14} />
                          ) : (
                            <Car size={14} />
                          )}
                          <span>
                            {cat === 'Motorcycle / Scooter' ? 'বাইক / স্কুটার' : 'কার / SUV'}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* 2. Brand / Make */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold opacity-80">
                  ২. ব্র্যান্ড নির্বাচন করুন (Select Brand)
                </label>
                <select
                  value={selectedBrandIdx}
                  onChange={(e) => {
                    const idx = Number(e.target.value);
                    setSelectedBrandIdx(idx);
                    setSelectedModelIdx(0);
                    setSelectedYear(brands[idx].models[0].years[0]);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  {brands.map((b, idx) => (
                    <option key={b.brand} value={idx}>
                      {b.brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Popular BD Model */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold opacity-80">
                  ৩. মডেল নির্বাচন করুন (Select Model)
                </label>
                <select
                  value={selectedModelIdx}
                  onChange={(e) => {
                    const idx = Number(e.target.value);
                    setSelectedModelIdx(idx);
                    setSelectedYear(currentBrand.models[idx].years[0]);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  {currentBrand.models.map((m, idx) => (
                    <option key={m.name} value={idx}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Model Year */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold opacity-80">
                  ৪. মডেল সাল (Manufacture Year)
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  {currentModel.years.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr} Edition
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Verified Fitment Output Banner */}
            {fitmentVerified && (
              <div
                className={`rounded-xl p-4 border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isDark
                    ? 'bg-emerald-950/30 border-emerald-800/70 text-emerald-200'
                    : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <CheckCircle2
                    size={22}
                    className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 sm:mt-0"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold">
                      ১০০% ফিটমেন্ট ভেরিফাইড: {currentBrand.brand} — {currentModel.name} ({selectedYear})
                    </div>
                    <div className="text-xs opacity-85 mt-0.5">
                      হেডলাইট সকেট স্ট্যান্ডার্ড:{' '}
                      <strong className="font-mono">{currentModel.headlightSocket}</strong> · প্লাগ-অ্যান্ড-প্লে ইনস্টলেশন (কোনো তার কাটতে হবে না)
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono font-bold shrink-0">
                  {currentModel.recommendedProducts.length}টি কম্প্যাটিবল গিয়ার পাওয়া গেছে
                </div>
              </div>
            )}

            {/* Recommended Fitment Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {currentModel.recommendedProducts.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-xl border p-5 flex flex-col justify-between space-y-4 transition-transform hover:-translate-y-0.5 ${
                    isDark
                      ? 'bg-slate-900/90 border-slate-800'
                      : 'bg-slate-50/70 border-slate-200/90'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-bold opacity-75">
                      <span>{item.tag}</span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        ✓ Direct Fit
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs font-semibold opacity-80">
                      {item.bnName}
                    </p>

                    <p
                      className={`text-xs leading-relaxed pt-1 ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {item.fitmentNote}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-lg font-black font-mono tabular-nums" style={{ color: primaryColor }}>
                        ৳{item.priceBdt.toLocaleString()}
                      </div>
                      <div className="text-[11px] line-through opacity-60 font-mono tabular-nums">
                        ৳{item.originalBdt.toLocaleString()}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectItemForOrder(item.name, item.priceBdt)}
                      className="px-4 py-2.5 rounded-lg text-xs font-extrabold text-white shadow-xs hover:opacity-95 transition cursor-pointer whitespace-nowrap"
                      style={{ backgroundColor: primaryColor }}
                    >
                      অর্ডার লিস্টে যোগ করুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
