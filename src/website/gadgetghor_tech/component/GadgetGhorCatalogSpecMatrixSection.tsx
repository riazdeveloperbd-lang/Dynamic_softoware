import React, { useState, useEffect } from 'react';
import {
  Cpu,
  CheckCircle2,
  ShoppingBag,
  ShieldCheck,
  Zap,
  Headphones,
  Watch,
  BatteryCharging,
  Gamepad2,
  SlidersHorizontal,
  Sparkles,
  X,
  Package,
  Truck,
  Star,
  Eye,
  Award,
  RefreshCw,
  Check,
  PhoneCall,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface GadgetGhorCatalogSpecMatrixSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface ProductDetailedSpecRow {
  label: string;
  value: string;
}

interface GadgetProductItem {
  id: string;
  sku: string;
  category: 'tws' | 'watch' | 'power' | 'gaming';
  categoryLabel: string;
  name: string;
  bnName: string;
  price: number;
  oldPrice: number;
  warrantyBadge: string;
  highlightTag: string;
  rating: string;
  reviewCount: string;
  stockStatus: string;
  image: string;
  gallery: string[];
  colorVariants: { name: string; hex: string }[];
  shortDescription: string;
  specs: {
    batteryLife: string;
    connectivity: string;
    driverOrPower: string;
    waterResistance: string;
    latencyOrRefresh: string;
  };
  detailedSpecs: ProductDetailedSpecRow[];
  inTheBox: string[];
  bullets: string[];
  reviewerQuote: {
    reviewer: string;
    verdict: string;
  };
}

const GADGETGHOR_PRODUCTS: GadgetProductItem[] = [
  {
    id: 'gg_prod_tws',
    sku: 'GG-TWS-SP2026',
    category: 'tws',
    categoryLabel: 'Audio & TWS',
    name: 'SonicPulse Pro ANC + 38ms Gaming TWS',
    bnName: 'সনিকপালস প্রো এএনসি ও গেমিং ইয়ারবাডস',
    price: 1890,
    oldPrice: 2490,
    warrantyBadge: '6 Months Official Warranty',
    highlightTag: 'BESTSELLER · 38ms Low Latency',
    rating: '4.96 ★',
    reviewCount: '৩,৪২০+ ভেরিফাইড রিভিউ',
    stockStatus: 'In Stock · Ready for Same-Day Dhaka Dispatch',
    image:
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=900&q=85',
    ],
    colorVariants: [
      { name: 'Stealth Matte Black (ম্যাট ব্ল্যাক)', hex: '#0F172A' },
      { name: 'Cyber Gunmetal Grey (গানমেটাল গ্রে)', hex: '#475569' },
      { name: 'Arctic Pearl White (পার্ল হোয়াইট)', hex: '#E2E8F0' },
    ],
    shortDescription:
      'গেমিং এবং কোলাহলপূর্ণ রাস্তায় কথা বলার জন্য বাংলাদেশের সবচেয়ে জনপ্রিয় বাজেট ANC ইয়ারবাডস। এতে রয়েছে আসল Bluetooth 5.4 ডুয়াল-হোস্ট চিপসেট, 32dB অ্যাক্টিভ নয়েজ ক্যান্সেলেশন এবং পাবজি/ফ্রি-ফায়ার গেমারদের জন্য ডেডিকেটেড 38ms বিস্ট গেমিং মোড।',
    specs: {
      batteryLife: '45 Hours Total (8H Single Charge)',
      connectivity: 'Bluetooth 5.4 Dual-Host',
      driverOrPower: '13mm Titanium Dynamic Driver',
      waterResistance: 'IPX5 Sweat & Splash Proof',
      latencyOrRefresh: '38ms Beast Gaming Mode + 4-Mic ENC',
    },
    detailedSpecs: [
      { label: 'Bluetooth Chipset & Version', value: 'Action V5.4 Dual-Channel Low-Power SoC' },
      { label: 'Active Noise Cancellation', value: 'Up to 32dB Hybrid ANC + Transparency Mode' },
      { label: 'Microphone System', value: 'Quad-Mic (4 Mics) with AI Environmental Noise Cancellation (ENC)' },
      { label: 'Audio Driver Unit', value: '13mm Composite Titanium Diaphragm Dynamic Driver (AAC / SBC)' },
      { label: 'Gaming Latency', value: '38ms Ultra-Low Latency Sync (Triple-Tap Right Bud to Activate)' },
      { label: 'Battery Capacity & Playtime', value: '50mAh (Each Bud) + 480mAh Case · 8 Hours Single / 45 Hours Total' },
      { label: 'Fast Charging Speed', value: 'USB Type-C Flash Charge (10 Mins Charge = 180 Mins Playtime)' },
      { label: 'Water & Sweat Resistance', value: 'IPX5 Certified (Gym Sweat & Light Rain Safe)' },
      { label: 'Device Compatibility', value: 'Android, iPhone (iOS), Windows Laptop, MacBook & Gaming Handhelds' },
    ],
    inTheBox: [
      '১ জোড়া SonicPulse Pro ANC TWS Earbuds + Mag-Safe স্টাইল চার্জিং কেস',
      '৩ সাইজের অ্যান্টি-স্লিপ সিলিকন ইয়ার-টিপস (Small, Medium, Large)',
      'অরিজিনাল ব্রেইডেড USB Type-C ফাস্ট চার্জিং ক্যাবল',
      'সিলভার হলোগ্রামযুক্ত ৭ দিনের রিপ্লেসমেন্ট ও ৬ মাসের অফিশিয়াল ওয়ারেন্টি স্মার্ট কার্ড',
    ],
    bullets: [
      '32dB Active Noise Cancellation (ANC) + 4-Mic AI ENC কলিং',
      '১০ মিনিট Type-C ফাস্ট চার্জে ১৮০ মিনিট একটানা প্লেব্যাক',
      'পাবজি ও ফ্রি-ফায়ার গেমারদের জন্য ডেডিকেটেড ৩৮ মিলিসেকেন্ড গেমিং মোড',
    ],
    reviewerQuote: {
      reviewer: 'TechTalks Dhaka (420K Subs)',
      verdict:
        '“৳২,০০০ বাজেটের নিচে এর চেয়ে ক্লিয়ার মাইক এবং সত্যিকারের ৩৮ মিলিসেকেন্ড গেমিং রেসপন্স আমরা অন্য কোনো TWS-এ পাইনি।”',
    },
  },
  {
    id: 'gg_prod_watch',
    sku: 'GG-WATCH-AF204',
    category: 'watch',
    categoryLabel: 'Smartwatches',
    name: 'ApexFit Ultra 2.04" Super AMOLED Calling Watch',
    bnName: 'অ্যাপেক্সফিট আল্ট্রা সুপার অ্যামোলেড স্মার্টওয়াচ',
    price: 2990,
    oldPrice: 3890,
    warrantyBadge: '12 Months Official Warranty',
    highlightTag: 'SUPER AMOLED · Always-On Display',
    rating: '4.95 ★',
    reviewCount: '২,৮৯০+ ভেরিফাইড রিভিউ',
    stockStatus: 'In Stock · Free Extra Chain Strap Included',
    image:
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=85',
    ],
    colorVariants: [
      { name: 'Titanium Black + Black Mesh Chain', hex: '#1E293B' },
      { name: 'Starlight Silver + Orange Ocean Band', hex: '#94A3B8' },
      { name: 'Espresso Gold + Brown Leather Strap', hex: '#92400E' },
    ],
    shortDescription:
      'সস্তা LCD ডিসপ্লের ঘোলাটে ঘড়িকে বিদায় দিন! ApexFit Ultra-তে রয়েছে ২.০৪ ইঞ্চির আসল 60Hz Super AMOLED প্যানেল যা কড়া দুপুরের রোদেও ১০০০ নিটস ব্রাইটনেসে ঝকঝকে দেখায়। জিঙ্ক-অ্যালয় মেটাল বডি ও সরাসরি হাত থেকে ব্লুটুথ কলিং সুবিধা।',
    specs: {
      batteryLife: '10 Days Typical (30 Days Standby)',
      connectivity: 'Bluetooth 5.3 Single-Chip Calling',
      driverOrPower: '2.04" 60Hz AMOLED (1000 Nits)',
      waterResistance: 'IP68 Swimming & Monsoon Proof',
      latencyOrRefresh: '60Hz Smooth UI + SpO2/HR Sensor',
    },
    detailedSpecs: [
      { label: 'Display Panel & Resolution', value: '2.04" Retina Super AMOLED (410 × 502 Pixels, 368 PPI)' },
      { label: 'Refresh Rate & Brightness', value: 'True 60Hz Smooth Scroll · 1000 Nits Peak Outdoor Brightness + AOD' },
      { label: 'Body Chassis & Glass', value: 'CNC Zinc-Alloy Unibody Frame + 2.5D Toughened Anti-Scratch Glass' },
      { label: 'Bluetooth Calling & Audio', value: 'Single-Chip BT 5.3 with Hi-Fi Waterproof Speaker & Noise-Reduced Mic' },
      { label: 'Health & Biometric Sensors', value: '24/7 Heart Rate, Real Red-Light SpO2 Blood Oxygen, Sleep & Stress Monitor' },
      { label: 'Sports & Bangla Notification', value: '110+ Sports Modes · Supports Clear Bangla & English SMS/WhatsApp/Messenger Alerts' },
      { label: 'Waterproof Rating', value: 'IP68 Certified (1.5m Submersion for 30 Mins · Wudu & Rain Safe)' },
      { label: 'Battery & Magnetic Charging', value: '380mAh Pure Cobalt Battery · 10 Days Normal Use / 5 Days with AOD' },
    ],
    inTheBox: [
      '১টি ApexFit Ultra 2.04" Super AMOLED Smartwatch (Metal Body)',
      '২টি ফ্রি স্ট্র্যাপ: ১টি প্রিমিয়াম সিলিকন স্পোর্টস স্ট্র্যাপ + ১টি ম্যাগনেটিক স্টেইনলেস চেইন',
      '১টি ম্যাগনেটিক পোগো-পিন ফাস্ট চার্জিং ক্যাবল + ফ্রি থ্রি-ডি স্ক্রিন প্রটেক্টর',
      '৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট ও ১২ মাসের অফিশিয়াল ওয়ারেন্টি কার্ড',
    ],
    bullets: [
      'কড়া রোদেও পরিষ্কার দেখার জন্য ১০০০ নিটস ব্রাইটনেস ও Always-On Display',
      'হাত থেকেই সরাসরি পরিষ্কার ভয়েস কল রিসিভ ও ডায়াল করার সুবিধা',
      'বক্সের সাথে ফ্রি ২টি স্ট্র্যাপ (সিলিকন স্পোর্টস + ম্যাগনেটিক মেটাল চেইন)',
    ],
    reviewerQuote: {
      reviewer: 'Gadget Insider BD (615K Subs)',
      verdict:
        '“বাংলা ফন্ট নোটিফিকেশন, ৬০ হার্টজ সুপার অ্যামোলেড ডিসপ্লে এবং পানির নিচে টেস্ট—সব মিলিয়ে ৩ হাজার টাকায় এটি অপ্রতিদ্বন্দ্বী।”',
    },
  },
  {
    id: 'gg_prod_gan',
    sku: 'GG-GAN-BV65W',
    category: 'power',
    categoryLabel: 'Power & Chargers',
    name: 'BizliVolt 65W 3-Port GaN Pro Fast Charger',
    bnName: 'বিজলিভোল্ট ৬৫ ওয়াট ৩-পোর্ট GaN ফাস্ট চার্জার',
    price: 1650,
    oldPrice: 2200,
    warrantyBadge: '12 Months Official Warranty',
    highlightTag: 'GaN III CHIP · Laptop + Phone',
    rating: '4.97 ★',
    reviewCount: '১,৯৫০+ ভেরিফাইড রিভিউ',
    stockStatus: 'In Stock · Includes Free 100W E-Marker Type-C Cable',
    image:
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=85',
    ],
    colorVariants: [
      { name: 'Carbon Matte Black (কার্বন ব্ল্যাক)', hex: '#0F172A' },
      { name: 'Glacier White (গ্লেসিয়ার হোয়াইট)', hex: '#F8FAFC' },
    ],
    shortDescription:
      'ল্যাপটপ, আইফোন ও অ্যান্ড্রয়েডের জন্য আলাদা ৩টি ভারী চার্জার বহন করার দিন শেষ! ৩য় প্রজন্মের Gallium Nitride (GaN III) চিপসেট প্রযুক্তির এই হাতের তালুর সমান চার্জারটি একই সাথে আপনার MacBook/Laptop এবং স্মার্টফোন সুপারফাস্ট চার্জ করবে কোনো ওভারহিটিং ছাড়াই।',
    specs: {
      batteryLife: 'Continuous AC 100-240V Surge Safe',
      connectivity: '2x Type-C (PD 3.0) + 1x USB-A (QC 4+)',
      driverOrPower: '65W Max GaN III Gallium Nitride',
      waterResistance: 'Fire-Retardant PC V0 Thermal Shell',
      latencyOrRefresh: '0–65% Charge in 28 Mins (iPhone/Samsung/Mac)',
    },
    detailedSpecs: [
      { label: 'Semiconductor Technology', value: '3rd-Gen Navitas GaN III (Gallium Nitride) + Smart Thermal IC' },
      { label: 'USB-C1 / C2 Single Output', value: 'Up to 65W Max PD 3.0 / PPS (20V⎓3.25A · Supports Samsung 45W SFC 2.0)' },
      { label: 'USB-A Port Output', value: 'Up to 30W QC 4.0+ / VOOC / SuperCharge' },
      { label: 'Multi-Port Simultaneous Mode', value: '45W (Laptop Type-C1) + 20W (iPhone/Android Type-C2)' },
      { label: 'Supported Fast Protocols', value: 'PD 3.0, PPS, QC 4+, Samsung Super Fast 45W/25W, Apple 27W/20W, Huawei SCP' },
      { label: 'Voltage & Surge Protection', value: 'AC 100-240V Wide BD Grid Support · 8-Layer Short-Circuit & Over-Voltage Shield' },
      { label: 'Included Cable Spec', value: '1.2m Braided 100W (5A) E-Marker Chip Type-C to Type-C Cable' },
    ],
    inTheBox: [
      '১টি BizliVolt 65W 3-Port GaN III Fast Charger Adapter',
      '১টি ফ্রি ১০০ ওয়াট (5A E-Marker) নাইলন ব্রেইডেড Type-C to Type-C ক্যাবল',
      '৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট ও ১২ মাসের অফিশিয়াল চিপসেট ওয়ারেন্টি কার্ড',
    ],
    bullets: [
      'একটি চার্জারেই ম্যাকবুক/ল্যাপটপ, আইফোন ও অ্যান্ড্রয়েড সুপার-ফাস্ট চার্জ',
      'বাংলাদেশের ভোল্টেজ ওঠানামা থেকে ফোন বাঁচাতে মাল্টি-লেয়ার ওভারহিট প্রোটেকশন',
      'ফ্রি ১০০ ওয়াট ব্রেইডেড Type-C to Type-C ক্যাবল বক্সের ভেতরেই যুক্ত',
    ],
    reviewerQuote: {
      reviewer: 'PC & Gear Lab Bangladesh (290K Subs)',
      verdict:
        '“আমরা ইউএসবি ওয়াট-মিটারে টানা ২ ঘণ্টা ৬৪.৮ ওয়াট লোড টেস্ট করেছি—তাপমাত্রা ৪২ ডিগ্রির নিচে ছিল এবং স্যামসাং ৪৫ ওয়াট সুপার ফাস্ট চার্জিং ২.০ ট্রিগার করেছে।”',
    },
  },
  {
    id: 'gg_prod_powerbank',
    sku: 'GG-PB-VV20K',
    category: 'power',
    categoryLabel: 'Power & Chargers',
    name: 'VoltVault 20,000mAh 22.5W + PD20W Power Bank',
    bnName: 'ভোল্টভল্ট ২০,০০০ এমএএইচ ফাস্ট পাওয়ার ব্যাংক',
    price: 1950,
    oldPrice: 2550,
    warrantyBadge: '12 Months Official Warranty',
    highlightTag: 'LED DIGITAL DISPLAY · Built-in Cable',
    rating: '4.93 ★',
    reviewCount: '২,১১০+ ভেরিফাইড রিভিউ',
    stockStatus: 'In Stock · Built-in Type-C & iPhone Lightning Cables',
    image:
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=85',
    ],
    colorVariants: [
      { name: 'Cyber Transparent Black (ট্রান্সপারেন্ট ব্ল্যাক)', hex: '#0F172A' },
      { name: 'Deep Navy Blue (নেভি ব্লু)', hex: '#1E3A8A' },
    ],
    shortDescription:
      'ভ্রমণ বা লোডশেডিংয়ে আলাদা ক্যাবল খুঁজে হয়রান হতে হবে না! VoltVault 20,000mAh পাওয়ার ব্যাংকের সাথেই যুক্ত রয়েছে মজবুত বিল্ট-ইন Type-C এবং iPhone Lightning ফাস্ট চার্জিং ক্যাবল। আসল গ্রেড-এ লিথিয়াম পলিমার ব্যাটারি যা আপনার ফোনের ব্যাটারি হেলথ ১০০% অক্ষুণ্ণ রাখে।',
    specs: {
      batteryLife: '20,000mAh Grade-A Li-Polymer (4.5x Phone Charges)',
      connectivity: 'Built-in Type-C & Lightning Cables + USB Port',
      driverOrPower: '22.5W SuperCharge + 20W PD Two-Way',
      waterResistance: 'Airline Approved Safe Cabin Carry',
      latencyOrRefresh: 'Smart LED Percentage & Fast-Charge Indicator',
    },
    detailedSpecs: [
      { label: 'True Battery Capacity', value: '20,000mAh / 74Wh Grade-A High-Density Lithium-Polymer Cell' },
      { label: 'Built-in Cables', value: 'Integrated Heavy-Duty Type-C (22.5W) + iPhone Lightning (20W PD) Lanyard Cables' },
      { label: 'External Ports', value: '1× Bidirectional Type-C PD Port + 1× USB-A 22.5W QC Output Port' },
      { label: 'Digital Display', value: 'Precision 1%–100% Smart LED Screen with Green "FAST" PD Icon' },
      { label: 'Recharging Speed', value: '18W PD Fast Input (Full 0–100% Recharge in 4.5 Hours via Type-C)' },
      { label: 'Flight & Safety Standard', value: 'UN38.3 Airline Cabin Approved · NTC Temperature Control Sensor' },
    ],
    inTheBox: [
      '১টি VoltVault 20,000mAh Power Bank (বিল্ট-ইন Type-C ও Lightning ক্যাবলসহ)',
      '১টি অতিরিক্ত USB-A to Type-C রিচার্জিং ক্যাবল',
      '৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট ও ১২ মাসের অফিশিয়াল ব্যাটারি ওয়ারেন্টি কার্ড',
    ],
    bullets: [
      'আলাদা ক্যাবল বহনের ঝামেলা নেই—সাথেই বিল্ট-ইন Type-C ও iPhone ক্যাবল',
      'লোডশেডিং বা লম্বা ভ্রমণে আপনার স্মার্টফোন ৪ থেকে ৫ বার ফুল চার্জ করুন',
      'আসল ২০,০০০mAh লিথিয়াম-পলিমার সেল—ফোনের ব্যাটারি হেলথ ১০০% নিরাপদ রাখে',
    ],
    reviewerQuote: {
      reviewer: 'TechTalks Dhaka (420K Subs)',
      verdict:
        '“ডিসচার্জ টেস্টে আমরা iPhone 15 Pro পূর্ণ ৪ বার এবং Samsung A54 প্রায় ৩.৮ বার চার্জ করতে পেরেছি—বিল্ট-ইন ক্যাবলটি ভীষণ মজবুত।”',
    },
  },
  {
    id: 'gg_prod_keyboard',
    sku: 'GG-KB-KM75',
    category: 'gaming',
    categoryLabel: 'Gaming & Keyboards',
    name: 'KhelnaMech K75 Wireless Tri-Mode Mechanical Keyboard',
    bnName: 'ট্রাই-মোড হট-সোয়াপেবল মেকানিক্যাল গেমিং কিবোর্ড',
    price: 3490,
    oldPrice: 4400,
    warrantyBadge: '12 Months Official Warranty',
    highlightTag: 'GASKET MOUNT · Hot-Swappable',
    rating: '4.98 ★',
    reviewCount: '১,৪৮০+ ভেরিফাইড রিভিউ',
    stockStatus: 'In Stock · Free Switch/Keycap Puller & 4 Extra Switches',
    image:
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85',
    ],
    colorVariants: [
      { name: 'Cyber Retro Grey + Mint Accent', hex: '#475569' },
      { name: 'Midnight Navy + Yellow Accent', hex: '#1E293B' },
    ],
    shortDescription:
      'গেমার, প্রোগ্রামার ও ফ্রিল্যান্সারদের স্বপ্নের কাস্টম মেকানিক্যাল কিবোর্ড! ৭৫% কমপ্যাক্ট লেআউট, ৫-লেয়ার সাউন্ড ড্যাম্পেনিং ফোম, গ্যাসকেট মাউন্ট স্ট্রাকচার এবং ফ্যাক্টরি প্রি-লুবড লিনিয়ার সুইচ—যা প্রতিবার টাইপ করার সময় দেয় প্রিমিয়াম ক্রিমি ও থকি (Thocky) সাউন্ড।',
    specs: {
      batteryLife: '4000mAh Rechargeable (Up to 180 Hours)',
      connectivity: '2.4GHz Wireless + BT 5.1 + Wired USB-C',
      driverOrPower: 'Pre-Lubed Linear Switches + PBT Keycaps',
      waterResistance: 'Dustproof Switch Stem + Sound Dampening Foam',
      latencyOrRefresh: '1000Hz Polling Rate (1ms Response) + CNC Knob',
    },
    detailedSpecs: [
      { label: 'Layout & Mounting Style', value: '75% Compact (81 Keys + CNC Aluminum Multimedia Rotary Knob) · Leaf-Spring Gasket Mount' },
      { label: 'Tri-Mode Connectivity', value: '2.4GHz Low-Latency USB Dongle + Bluetooth 5.1 (3 Devices) + Detachable Coiled-Style Type-C' },
      { label: 'Hot-Swappable PCB', value: 'Full-Key 3-Pin & 5-Pin South-Facing Hot-Swap Sockets (No Soldering Needed)' },
      { label: 'Switches & Stabilizers', value: 'Factory Pre-Lubed Cream Linear Switches (45g Actuation) + Tuned Plate Stabilizers' },
      { label: 'Acoustic Foam Layers', value: '5-Layer Sound Pack: IXPE Switch Pad + PORON Plate Foam + Silicone Case Dampener' },
      { label: 'Keycaps & RGB Lighting', value: 'Double-Shot PBT Cherry Profile Keycaps + 16.8M South-Facing ARGB (Music Rhythm Mode)' },
      { label: 'Battery & OS Support', value: '4000mAh Li-ion Battery · Physical Windows / macOS Toggle Switch' },
    ],
    inTheBox: [
      '১টি KhelnaMech K75 Tri-Mode Gasket Mechanical Keyboard',
      '১টি 2.4GHz ওয়্যারলেস ডঙ্গল + ১টি ব্রেইডেড Type-C ক্যাবল + ডাস্ট কভার',
      '১টি 2-in-1 Switch & Keycap Puller + ৪টি অতিরিক্ত প্রি-লুবড সুইচ',
      '৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট ও ১২ মাসের অফিশিয়াল পিসিবি ওয়ারেন্টি কার্ড',
    ],
    bullets: [
      'প্রিমিয়াম থকি (Thocky) সাউন্ড প্রোফাইল ও কাস্টমাইজেবল ১৬.৮ মিলিয়ন RGB ব্যাকলিট',
      'ভলিউম কন্ট্রোলের জন্য মেটাল CNC রোটারি নব এবং ফুল কি হট-সোয়াপ পিসিবি',
      'কোডিং, ফ্রিল্যান্সিং ও ই-স্পোর্টস গেমিংয়ের জন্য আরামদায়ক গ্যাসকেট মাউন্ট ডিজাইন',
    ],
    reviewerQuote: {
      reviewer: 'PC & Gear Lab Bangladesh (290K Subs)',
      verdict:
        '“আনবক্স করেই কোনো মডিফিকেশন ছাড়া এমন ক্রিমি থকি সাউন্ড ও অ্যালুমিনিয়াম নব সাধারণত ৭-৮ হাজার টাকার কিবোর্ডে দেখা যায়!”',
    },
  },
];

export const GadgetGhorCatalogSpecMatrixSection: React.FC<
  GadgetGhorCatalogSpecMatrixSectionProps
> = ({ title, subtitle, primaryColor, isDark }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [compareAudioMode, setCompareAudioMode] = useState<'tws_vs_clone' | 'all_products'>(
    'all_products'
  );

  // Active Product Modal State
  const [activeModalProduct, setActiveModalProduct] = useState<GadgetProductItem | null>(
    null
  );
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);
  const [modalTab, setModalTab] = useState<'specs' | 'box' | 'warranty' | 'quick_cod'>(
    'specs'
  );
  const [modalQty, setModalQty] = useState<number>(1);

  // Quick In-Modal COD Order State
  const [quickName, setQuickName] = useState<string>('');
  const [quickPhone, setQuickPhone] = useState<string>('');
  const [quickZone, setQuickZone] = useState<'dhaka' | 'outside'>('dhaka');
  const [quickAddress, setQuickAddress] = useState<string>('');
  const [quickPhoneError, setQuickPhoneError] = useState<string | null>(null);
  const [quickOrderSuccess, setQuickOrderSuccess] = useState<boolean>(false);

  const openProductModal = (prod: GadgetProductItem, initialTab: 'specs' | 'quick_cod' = 'specs') => {
    setActiveModalProduct(prod);
    setActiveImageIdx(0);
    setSelectedColorIdx(0);
    setModalTab(initialTab);
    setModalQty(1);
    setQuickOrderSuccess(false);
    setQuickPhoneError(null);
  };

  const closeProductModal = () => {
    setActiveModalProduct(null);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalProduct) {
        closeProductModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProduct]);

  const filteredProducts =
    selectedCategory === 'all'
      ? GADGETGHOR_PRODUCTS
      : GADGETGHOR_PRODUCTS.filter((p) => p.category === selectedCategory);

  const scrollToCheckout = () => {
    closeProductModal();
    const el = document.getElementById('gadgetghor-checkout');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickModalOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = quickPhone.replace(/[\s-]/g, '');
    const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(cleanPhone)) {
      setQuickPhoneError('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (01XXXXXXXXX)');
      return;
    }
    setQuickPhoneError(null);
    setQuickOrderSuccess(true);
  };

  return (
    <section
      id="gadgetghor-catalog"
      className={`py-16 sm:py-20 ${
        isDark ? 'bg-[#0B1120] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* PART A: PRODUCT CATALOG WITH CATEGORY FILTER */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <Sparkles size={13} />
                <EditableText
                  id="gadgetghor_catalog_eyebrow"
                  defaultText="TOP-SELLING SMART GADGETS · ১০০% অরিজিনাল ইমপোর্ট"
                />
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-[1.3]">
                <EditableText
                  id="gadgetghor_catalog_h2"
                  defaultText={
                    title ||
                    'আমাদের ৫টি বেস্ট-সেলিং স্মার্ট গ্যাজেট ও মোবাইল অ্যাক্সেসরিজ — অফিশিয়াল ওয়ারেন্টিসহ'
                  }
                />
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <EditableText
                  id="gadgetghor_catalog_sub"
                  defaultText={
                    subtitle ||
                    'যেকোনো গ্যাজেট কার্ডে ক্লিক করে সম্পূর্ণ টেকনিক্যাল স্পেক, বক্সের ভেতরের আইটেম ও অফিশিয়াল ওয়ারেন্টি বিস্তারিত দেখুন।'
                  }
                />
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              {[
                { id: 'all', label: 'All Gear (5)', icon: Sparkles },
                { id: 'tws', label: 'Audio & TWS', icon: Headphones },
                { id: 'watch', label: 'Smartwatches', icon: Watch },
                { id: 'power', label: 'GaN & Power', icon: BatteryCharging },
                { id: 'gaming', label: 'Keyboards', icon: Gamepad2 },
              ].map((cat) => {
                const Icon = cat.icon;
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                      active
                        ? 'text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    style={active ? { backgroundColor: primaryColor } : undefined}
                  >
                    <Icon size={13} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Cards Grid — Clicking ANY card opens the Full Product Details Modal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                role="button"
                tabIndex={0}
                onClick={() => openProductModal(prod, 'specs')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProductModal(prod, 'specs');
                  }
                }}
                className={`group rounded-3xl border overflow-hidden flex flex-col justify-between transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer text-left ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/60'
                    : 'bg-white border-slate-200/90 shadow-sm hover:border-cyan-500/60'
                }`}
              >
                <div>
                  {/* Image Header with Hover "View Full Details" Overlay */}
                  <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition" />

                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span
                        className="px-2.5 py-1 rounded-lg text-[10px] font-black text-white shadow-sm"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {prod.highlightTag}
                      </span>
                    </div>

                    {/* Hover Quick-View Pill */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black bg-slate-950/85 text-white border border-white/15 shadow-md group-hover:bg-cyan-600 transition">
                        <Eye size={12} />
                        <span>বিস্তারিত দেখুন</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-400/30 backdrop-blur-xs">
                        {prod.rating} ({prod.reviewCount})
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-slate-950/90 text-emerald-300 border border-emerald-500/30">
                        <ShieldCheck size={12} />
                        {prod.warrantyBadge}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3.5">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                          {prod.categoryLabel}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          SKU: {prod.sku}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black leading-snug mt-0.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition">
                        {prod.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {prod.bnName}
                      </p>
                    </div>

                    {/* Quick Tech Spec Chips */}
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 font-bold truncate">
                        🔋 {prod.specs.batteryLife.split('(')[0]}
                      </div>
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 font-bold truncate">
                        📡 {prod.specs.connectivity.split(' ')[0]}{' '}
                        {prod.specs.connectivity.split(' ')[1]}
                      </div>
                    </div>

                    {/* Bullet points */}
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {prod.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2
                            size={14}
                            className="shrink-0 mt-0.5 text-emerald-500"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Price + Full Details / COD Buttons */}
                <div className="p-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-xs line-through text-slate-400 block">
                      ৳{prod.oldPrice.toLocaleString()}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className="text-xl font-black"
                        style={{ color: primaryColor }}
                      >
                        ৳{prod.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                        (Save ৳{prod.oldPrice - prod.price})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProductModal(prod, 'specs');
                      }}
                      className={`px-3 py-2.5 rounded-xl text-xs font-extrabold border flex items-center gap-1 transition cursor-pointer ${
                        isDark
                          ? 'border-slate-700 bg-slate-800 text-slate-200 hover:border-cyan-400'
                          : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Eye size={13} />
                      <span>Full Specs</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProductModal(prod, 'quick_cod');
                      }}
                      className="px-3.5 py-2.5 rounded-xl text-xs font-black text-white flex items-center gap-1.5 shadow-sm hover:opacity-95 transition cursor-pointer"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <ShoppingBag size={13} />
                      <span>অর্ডার করুন</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART B: MANDATORY INTERACTIVE AUDIO / SPEC COMPARISON TABLE */}
        <div
          id="gadgetghor-spec-matrix"
          className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
            isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200 shadow-lg'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                <SlidersHorizontal size={14} />
                <EditableText
                  id="gadgetghor_matrix_eyebrow"
                  defaultText="INTERACTIVE TECH SPEC COMPARISON MATRIX"
                />
              </div>
              <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-[1.3]">
                <EditableText
                  id="gadgetghor_matrix_h2"
                  defaultText="কেনার আগে টেকনিক্যাল স্পেক তুলনা করুন (Battery, Bluetooth, Driver, IPX & Latency)"
                />
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <EditableText
                  id="gadgetghor_matrix_sub"
                  defaultText="অন্ধভাবে অর্ডার না করে প্রতিটি গ্যাজেটের ব্যাটারি ব্যাকআপ, ব্লুটুথ ভার্সন, ওয়াটার রেজিস্ট্যান্স ও গেমিং লেটেন্সি পাশাপাশি মিলিয়ে নিন।"
                />
              </p>
            </div>

            {/* Matrix Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 self-start">
              <button
                type="button"
                onClick={() => setCompareAudioMode('all_products')}
                className={`px-3.5 py-2 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                  compareAudioMode === 'all_products'
                    ? 'text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
                style={
                  compareAudioMode === 'all_products'
                    ? { backgroundColor: primaryColor }
                    : undefined
                }
              >
                All 5 Gadgets Spec Matrix
              </button>
              <button
                type="button"
                onClick={() => setCompareAudioMode('tws_vs_clone')}
                className={`px-3.5 py-2 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                  compareAudioMode === 'tws_vs_clone'
                    ? 'text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
                style={
                  compareAudioMode === 'tws_vs_clone'
                    ? { backgroundColor: primaryColor }
                    : undefined
                }
              >
                Original GadgetGhor vs. Cheap Market Clone
              </button>
            </div>
          </div>

          {compareAudioMode === 'all_products' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[780px]">
                <thead>
                  <tr
                    className={`border-b text-[11px] font-black uppercase tracking-wider ${
                      isDark
                        ? 'border-slate-800 bg-slate-950/70 text-cyan-300'
                        : 'border-slate-200 bg-slate-100 text-slate-700'
                    }`}
                  >
                    <th className="py-3.5 px-4 rounded-tl-xl">Gadget Model (Click for Details)</th>
                    <th className="py-3.5 px-4">Battery / Power Output</th>
                    <th className="py-3.5 px-4">Bluetooth / Connectivity</th>
                    <th className="py-3.5 px-4">Driver / Display / Chip</th>
                    <th className="py-3.5 px-4">IPX / Protection Rating</th>
                    <th className="py-3.5 px-4">Latency / Speed</th>
                    <th className="py-3.5 px-4 rounded-tr-xl">Official Warranty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                  {GADGETGHOR_PRODUCTS.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => openProductModal(item, 'specs')}
                      className="hover:bg-cyan-500/5 transition cursor-pointer"
                    >
                      <td className="py-3.5 px-4 font-black">
                        <div className="underline decoration-dotted underline-offset-4 hover:text-cyan-500">
                          {item.name}
                        </div>
                        <span
                          className="text-[11px] font-extrabold"
                          style={{ color: primaryColor }}
                        >
                          ৳{item.price.toLocaleString()} · View Full Specs →
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold">
                        {item.specs.batteryLife}
                      </td>
                      <td className="py-3.5 px-4 font-semibold">
                        {item.specs.connectivity}
                      </td>
                      <td className="py-3.5 px-4 font-semibold">
                        {item.specs.driverOrPower}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-bold">
                          {item.specs.waterResistance}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                        {item.specs.latencyOrRefresh}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold text-[11px]">
                          <ShieldCheck size={12} />
                          7-Day Replace + {item.warrantyBadge.split(' ')[0]}M
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[680px]">
                <thead>
                  <tr
                    className={`border-b text-xs font-black uppercase tracking-wider ${
                      isDark
                        ? 'border-slate-800 bg-slate-950 text-slate-300'
                        : 'border-slate-200 bg-slate-100 text-slate-700'
                    }`}
                  >
                    <th className="py-3.5 px-4">Spec Parameter</th>
                    <th className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400">
                      ✅ GadgetGhor 100% Original Stock
                    </th>
                    <th className="py-3.5 px-4 text-rose-500">
                      ❌ Cheap Market Clone / Master-Copy
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                  {[
                    {
                      param: 'Battery Cell & Real Backup',
                      good: 'Grade-A Cobalt Cell · True 45H TWS / 10-Day Watch Backup',
                      bad: 'Recycled B-Grade Cell · Dies within 45 mins after 2 weeks',
                    },
                    {
                      param: 'Bluetooth Chip & Gaming Latency',
                      good: 'Real Bluetooth 5.4 · 38ms Ultra-Low Latency Gaming Sync',
                      bad: 'Fake BT 5.0 Sticker · 300ms+ Audio Lag in PUBG/FreeFire',
                    },
                    {
                      param: 'Microphone & Calling (ENC)',
                      good: '4-Mic AI Environmental Noise Cancellation (Clear in Rickshaw/Traffic)',
                      bad: 'Muffled single mic · Unusable outdoors or in fan noise',
                    },
                    {
                      param: 'Charger Safety & IC Chip',
                      good: 'Certified GaN III Chip · Protects iPhone/Android Battery Health',
                      bad: 'No surge IC · Overheats and damages phone motherboard',
                    },
                    {
                      param: 'Replacement & Warranty Support',
                      good: '7-Day Instant Box Replacement + 6/12 Month Official Portal Claim',
                      bad: 'No warranty · Seller blocks your number after delivery',
                    },
                  ].map((row) => (
                    <tr key={row.param}>
                      <td className="py-3.5 px-4 font-black">{row.param}</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/5">
                        {row.good}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/5">
                        {row.bad}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
       * BIG PRODUCT FULL DETAILS MODAL (Opens when any product card is clicked)
       * ========================================================================= */}
      {activeModalProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
          onClick={closeProductModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-5xl rounded-3xl border overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col ${
              isDark
                ? 'bg-[#0B1120] border-slate-800 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Top Modal Sticky Header Bar */}
            <div
              className={`px-5 sm:px-7 py-4 border-b flex items-center justify-between gap-4 shrink-0 ${
                isDark
                  ? 'bg-slate-900/95 border-slate-800'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  {activeModalProduct.categoryLabel}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck size={13} />
                  7-Day Instant Replacement + {activeModalProduct.warrantyBadge}
                </span>
                <span className="hidden sm:inline text-xs font-mono text-slate-400">
                  SKU: {activeModalProduct.sku}
                </span>
              </div>

              <button
                type="button"
                onClick={closeProductModal}
                aria-label="Close Product Details Modal"
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-rose-500'
                    : 'border-slate-200 bg-white text-slate-600 hover:text-slate-950 hover:border-rose-500'
                }`}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Content Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 5 Cols: Gallery + Color Variant Selector + Reviewer Quote */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Main Image Preview */}
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                    <img
                      src={
                        activeModalProduct.gallery[activeImageIdx] ||
                        activeModalProduct.image
                      }
                      alt={activeModalProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-3 py-1 rounded-lg text-[10px] font-black text-white shadow-md"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {activeModalProduct.highlightTag}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-white">
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 size={13} /> 100% Authentic Global Stock
                      </span>
                      <span className="font-extrabold text-amber-300">
                        {activeModalProduct.rating}
                      </span>
                    </div>
                  </div>

                  {/* Gallery Thumbnails */}
                  {activeModalProduct.gallery.length > 1 && (
                    <div className="flex items-center gap-2.5">
                      {activeModalProduct.gallery.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIdx(idx)}
                          className={`relative w-20 aspect-[4/3] rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                            activeImageIdx === idx
                              ? 'border-cyan-500 ring-2 ring-cyan-500/30'
                              : 'border-slate-300 dark:border-slate-700 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`${activeModalProduct.name} angle ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Color / Edition Variant Selector */}
                  <div
                    className={`p-4 rounded-2xl border space-y-2.5 ${
                      isDark
                        ? 'bg-slate-900/70 border-slate-800'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="text-xs font-extrabold flex items-center justify-between">
                      <span>কালার / ভ্যারিয়েন্ট সিলেক্ট করুন:</span>
                      <span
                        className="font-black"
                        style={{ color: primaryColor }}
                      >
                        {activeModalProduct.colorVariants[selectedColorIdx]?.name}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeModalProduct.colorVariants.map((c, idx) => {
                        const isSelected = selectedColorIdx === idx;
                        return (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => setSelectedColorIdx(idx)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                              isSelected
                                ? 'border-cyan-500 bg-cyan-500/10 font-black'
                                : isDark
                                ? 'border-slate-700 bg-slate-800 text-slate-300'
                                : 'border-slate-200 bg-white text-slate-700'
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-slate-400 shrink-0"
                              style={{ backgroundColor: c.hex }}
                            />
                            <span>{c.name.split('(')[0].trim()}</span>
                            {isSelected && <Check size={12} className="text-cyan-500" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bangladeshi Tech Reviewer Verdict Box */}
                  <div
                    className={`p-4 rounded-2xl border space-y-1.5 ${
                      isDark
                        ? 'bg-slate-900/90 border-cyan-500/30'
                        : 'bg-cyan-50/70 border-cyan-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      <Award size={14} />
                      <span>BD Tech Reviewer Verdict · {activeModalProduct.reviewerQuote.reviewer}</span>
                    </div>
                    <p className="text-xs italic leading-relaxed text-slate-700 dark:text-slate-300">
                      {activeModalProduct.reviewerQuote.verdict}
                    </p>
                  </div>
                </div>

                {/* Right 7 Cols: Title, Pricing, Detail Tabs & Instant COD Order */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>{activeModalProduct.stockStatus}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                      {activeModalProduct.name}
                    </h2>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                      {activeModalProduct.bnName}
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 pt-1">
                      {activeModalProduct.shortDescription}
                    </p>
                  </div>

                  {/* Price & Quantity Bar */}
                  <div
                    className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
                      isDark
                        ? 'bg-slate-900 border-slate-800'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs line-through text-slate-400">
                          রেগুলার প্রাইস: ৳{activeModalProduct.oldPrice.toLocaleString()}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                          সাশ্রয় ৳{(activeModalProduct.oldPrice - activeModalProduct.price).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span
                          className="text-2xl sm:text-3xl font-black"
                          style={{ color: primaryColor }}
                        >
                          ৳{(activeModalProduct.price * modalQty).toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          (অগ্রিম ১ টাকাও লাগবে না · Open-Box COD)
                        </span>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold">পরিমাণ (Qty):</span>
                      <div className="flex items-center rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                          className="px-3 py-1.5 text-sm font-black hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3.5 py-1.5 text-xs font-mono font-black">
                          {modalQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setModalQty((q) => Math.min(10, q + 1))}
                          className="px-3 py-1.5 text-sm font-black hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Detail Navigation Tabs inside Modal */}
                  <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    {[
                      {
                        id: 'specs',
                        label: 'সম্পূর্ণ স্পেসিফিকেশন (Full Specs)',
                        icon: Cpu,
                      },
                      {
                        id: 'box',
                        label: 'বক্সে যা থাকছে (In The Box)',
                        icon: Package,
                      },
                      {
                        id: 'warranty',
                        label: 'ওয়ারেন্টি ও ডেলিভারি',
                        icon: ShieldCheck,
                      },
                      {
                        id: 'quick_cod',
                        label: '⚡ ১-ক্লিক অর্ডার ফর্ম (COD)',
                        icon: ShoppingBag,
                      },
                    ].map((t) => {
                      const Icon = t.icon;
                      const active = modalTab === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() =>
                            setModalTab(
                              t.id as 'specs' | 'box' | 'warranty' | 'quick_cod'
                            )
                          }
                          className={`flex-1 min-w-[140px] flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                            active
                              ? 'text-white shadow-sm'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800'
                          }`}
                          style={active ? { backgroundColor: primaryColor } : undefined}
                        >
                          <Icon size={13} />
                          <span>{t.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* TAB 1: FULL TECHNICAL SPECIFICATIONS TABLE */}
                  {modalTab === 'specs' && (
                    <div className="space-y-4">
                      <div
                        className={`rounded-2xl border overflow-hidden ${
                          isDark ? 'border-slate-800' : 'border-slate-200'
                        }`}
                      >
                        <table className="w-full text-left border-collapse text-xs">
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {activeModalProduct.detailedSpecs.map((row, idx) => (
                              <tr
                                key={row.label}
                                className={
                                  idx % 2 === 0
                                    ? isDark
                                      ? 'bg-slate-900/50'
                                      : 'bg-slate-50/80'
                                    : ''
                                }
                              >
                                <td className="py-3 px-4 font-extrabold text-slate-500 dark:text-slate-400 w-2/5">
                                  {row.label}
                                </td>
                                <td className="py-3 px-4 font-bold">
                                  {row.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: WHAT'S IN THE SEALED BOX */}
                  {modalTab === 'box' && (
                    <div
                      className={`p-5 rounded-2xl border space-y-3 ${
                        isDark
                          ? 'bg-slate-900/60 border-slate-800'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <h4 className="text-sm font-black flex items-center gap-2">
                        <Package size={16} style={{ color: primaryColor }} />
                        <span>অরিজিনাল সিলড বক্সের ভেতরে যা যা পাচ্ছেন:</span>
                      </h4>
                      <ul className="space-y-2.5 text-xs">
                        {activeModalProduct.inTheBox.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 font-bold"
                          >
                            <CheckCircle2
                              size={15}
                              className="shrink-0 mt-0.5 text-emerald-500"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* TAB 3: 7-DAY REPLACEMENT & OFFICIAL WARRANTY INFO */}
                  {modalTab === 'warranty' && (
                    <div
                      className={`p-5 rounded-2xl border space-y-3.5 text-xs ${
                        isDark
                          ? 'bg-slate-900/60 border-slate-800'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <RefreshCw
                          size={18}
                          className="shrink-0 mt-0.5 text-emerald-500"
                        />
                        <div>
                          <div className="font-black text-sm">
                            ৭ দিনের ইনস্ট্যান্ট বক্স-টু-বক্স রিপ্লেসমেন্ট গ্যারান্টি
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                            ডেলিভারি পাওয়ার ৭ দিনের মধ্যে যেকোনো ম্যানুফ্যাকচারিং সমস্যা থাকলে আমরা প্রোডাক্ট মেরামত করি না—সরাসরি নতুন সিলড বক্স রিপ্লেস করে দিই।
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <ShieldCheck
                          size={18}
                          className="shrink-0 mt-0.5 text-cyan-500"
                        />
                        <div>
                          <div className="font-black text-sm">
                            {activeModalProduct.warrantyBadge} (ডিজিটাল সিরিয়াল কার্ডসহ)
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                            বক্সের সিলভার হলোগ্রাম কোড ও আপনার মোবাইল নাম্বার দিয়ে আমাদের ওয়েবসাইট থেকেই ঘরে বসে ফ্রি পিক-অ্যান্ড-ড্রপ ওয়ারেন্টি সুবিধা পাবেন।
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Truck
                          size={18}
                          className="shrink-0 mt-0.5 text-amber-500"
                        />
                        <div>
                          <div className="font-black text-sm">
                            ডেলিভারি ম্যানের সামনে আনবক্সিং ও চেক করার সুবিধা (Open-Box COD)
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                            ঢাকা সিটিতে Same-Day (৳৬০) এবং ঢাকার বাইরে ২৪–৪৮ ঘণ্টায় (৳১২০) Steadfast / Pathao কুরিয়ারে ডেলিভারি।
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: INSTANT IN-MODAL 1-CLICK CASH ON DELIVERY FORM */}
                  {modalTab === 'quick_cod' && (
                    <div
                      className={`p-5 rounded-2xl border ${
                        isDark
                          ? 'bg-slate-900 border-cyan-500/40'
                          : 'bg-slate-50 border-cyan-500/40'
                      }`}
                    >
                      {quickOrderSuccess ? (
                        <div className="py-4 text-center space-y-3">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                            <CheckCircle2 size={28} />
                          </div>
                          <h4 className="text-base font-black">
                            অভিনন্দন {quickName}! আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            প্রোডাক্ট:{' '}
                            <strong>
                              {activeModalProduct.name} ({modalQty}টি) —{' '}
                              {activeModalProduct.colorVariants[selectedColorIdx]?.name}
                            </strong>
                            । আমাদের প্রতিনিধি দ্রুত আপনার <strong>{quickPhone}</strong> নাম্বারে কল করে ডিসপ্যাচ কনফার্ম করবেন।
                          </p>
                        </div>
                      ) : (
                        <form
                          onSubmit={handleQuickModalOrderSubmit}
                          className="space-y-3"
                        >
                          <div className="flex items-center justify-between text-xs font-black">
                            <span>
                              ⚡ সরাসরি ক্যাশ অন ডেলিভারি অর্ডার ({activeModalProduct.name})
                            </span>
                            <span className="text-emerald-500">৳0 Advance</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              required
                              value={quickName}
                              onChange={(e) => setQuickName(e.target.value)}
                              placeholder="আপনার নাম *"
                              className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold ${
                                isDark
                                  ? 'bg-slate-950 border-slate-700 text-white'
                                  : 'bg-white border-slate-300 text-slate-900'
                              }`}
                            />
                            <input
                              type="tel"
                              required
                              value={quickPhone}
                              onChange={(e) => setQuickPhone(e.target.value)}
                              placeholder="মোবাইল নাম্বার (017XXXXXXXX) *"
                              className={`px-3.5 py-2.5 rounded-xl border text-xs font-mono font-bold ${
                                isDark
                                  ? 'bg-slate-950 border-slate-700 text-white'
                                  : 'bg-white border-slate-300 text-slate-900'
                              }`}
                            />
                          </div>

                          {quickPhoneError && (
                            <p className="text-[11px] text-rose-500 font-bold flex items-center gap-1">
                              <AlertCircle size={12} /> {quickPhoneError}
                            </p>
                          )}

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <button
                              type="button"
                              onClick={() => setQuickZone('dhaka')}
                              className={`p-2 rounded-xl border font-extrabold cursor-pointer ${
                                quickZone === 'dhaka'
                                  ? 'border-cyan-500 bg-cyan-500/10'
                                  : 'border-slate-300 dark:border-slate-700'
                              }`}
                            >
                              ঢাকা সিটি Same-Day (৳৬০)
                            </button>
                            <button
                              type="button"
                              onClick={() => setQuickZone('outside')}
                              className={`p-2 rounded-xl border font-extrabold cursor-pointer ${
                                quickZone === 'outside'
                                  ? 'border-cyan-500 bg-cyan-500/10'
                                  : 'border-slate-300 dark:border-slate-700'
                              }`}
                            >
                              ঢাকার বাইরে ২৪-৪৮ ঘণ্টা (৳১২০)
                            </button>
                          </div>

                          <input
                            type="text"
                            required
                            value={quickAddress}
                            onChange={(e) => setQuickAddress(e.target.value)}
                            placeholder="সম্পূর্ণ ঠিকানা (বাসা, রোড, এলাকা ও জেলা) *"
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold ${
                              isDark
                                ? 'bg-slate-950 border-slate-700 text-white'
                                : 'bg-white border-slate-300 text-slate-900'
                            }`}
                          />

                          <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl text-xs font-black text-white flex items-center justify-center gap-2 shadow-md cursor-pointer"
                            style={{ backgroundColor: primaryColor }}
                          >
                            <ShoppingBag size={15} />
                            <span>
                              অর্ডার কনফার্ম করুন — মোট ৳
                              {(
                                activeModalProduct.price * modalQty +
                                (quickZone === 'dhaka' ? 60 : 120)
                              ).toLocaleString()}{' '}
                              (COD)
                            </span>
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                  {/* Bottom Modal Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
                    {modalTab !== 'quick_cod' ? (
                      <button
                        type="button"
                        onClick={() => setModalTab('quick_cod')}
                        className="flex-1 py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-black text-white flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition cursor-pointer"
                        style={{
                          background: `linear-gradient(135deg, ${primaryColor}, #0891B2)`,
                        }}
                      >
                        <ShoppingBag size={16} />
                        <span>
                          এই প্রোডাক্টটি অর্ডার করুন — ৳
                          {(activeModalProduct.price * modalQty).toLocaleString()} (COD)
                        </span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={scrollToCheckout}
                        className="flex-1 py-3 px-4 rounded-xl text-xs font-extrabold border border-slate-300 dark:border-slate-700 hover:border-cyan-400 transition cursor-pointer"
                      >
                        ফ্ল্যাশ কম্বো ডিলে আরও ৳৯৯০ সাশ্রয় করতে এখানে ক্লিক করুন →
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={closeProductModal}
                      className={`px-4 py-3.5 rounded-2xl text-xs font-extrabold border transition cursor-pointer ${
                        isDark
                          ? 'border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800'
                          : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      বন্ধ করুন (Close)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
