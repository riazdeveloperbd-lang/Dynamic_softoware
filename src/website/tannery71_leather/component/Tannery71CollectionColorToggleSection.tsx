import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Palette,
  Flame,
  Eye,
  X,
  Package,
  Truck,
  Award,
  Check,
  AlertCircle,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface Tannery71CollectionColorToggleSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

export type LeatherColorKey = 'tan' | 'dark_brown' | 'jet_black';

interface LeatherColorVariant {
  key: LeatherColorKey;
  labelBn: string;
  labelEn: string;
  hex: string;
  ringHex: string;
  imageUrl: string;
  finishNote: string;
}

interface LeatherProduct {
  id: string;
  sku: string;
  nameBn: string;
  nameEn: string;
  category: 'Wallets & Cardholders' | 'Executive Belts' | 'Bags & Sleeves' | 'Formal Footwear';
  priceBdt: number;
  regularPriceBdt: number;
  hideSpec: string;
  dimensions: string;
  rating: string;
  reviewCount: string;
  highlights: string[];
  detailedSpecs: { label: string; value: string }[];
  inTheBox: string[];
  colorVariants: Record<LeatherColorKey, LeatherColorVariant>;
}

const TANNERY71_PRODUCTS: LeatherProduct[] = [
  {
    id: 't71_bifold_wallet',
    sku: 'T71-WAL-NBB01',
    nameBn: 'দ্য নবাব আরএফআইডি (RFID) ফুল-গ্রেইন বাই-ফোল্ড ও লং ওয়ালেট',
    nameEn: 'The Nabab Full-Grain Vegetable-Tanned Wallet (RFID Protected)',
    category: 'Wallets & Cardholders',
    priceBdt: 1490,
    regularPriceBdt: 2100,
    hideSpec: '1.8mm Top Full-Grain Cowhide · Hand-Burnished Beeswax Edges',
    dimensions: '11.5 cm × 9.2 cm · 8 Card Slots + 2 Hidden Cash Compartments + Coin Pocket',
    rating: '4.97 ★',
    reviewCount: '৪,১২০+ এক্সিকিউটিভ রিভিউ',
    highlights: [
      'আল্ট্রা-স্লিম প্রোফাইল—পকেটে রাখলে উঁচু হয়ে থাকে না এবং কার্ড ভেঙে যায় না',
      'আন্তর্জাতিক RFID Blocking শিল্ড থাকায় আপনার ডেবিট/ক্রেডিট কার্ড সম্পূর্ণ নিরাপদ',
      'কাস্টম নাম বা ইনিশিয়াল খোদাই (Engraving) করার জন্য আদর্শ সিগনেচার ওয়ালেট',
    ],
    detailedSpecs: [
      { label: 'Leather Grade & Origin', value: '100% Export-Grade Savar/Hazaribagh Full-Grain Vegetable-Tanned Cowhide' },
      { label: 'Thickness & Edge Finish', value: '1.8mm Split-Free Hide · Hand-Rubbed Natural Beeswax Edge Burnishing' },
      { label: 'Stitching Thread', value: '0.8mm German Ritza Tiger Waxed Polyester Thread (Tear-Proof)' },
      { label: 'RFID Security Layer', value: '13.56 MHz Military-Grade RFID/NFC Blocking Lining' },
      { label: 'Storage Capacity', value: '8 Cards + 2 Full-Length BDT/USD Note Compartments + 1 Thumb-Slide ID Slot' },
      { label: 'Fire & Water Test', value: 'Passes 10-Second Flame Test & Natural Pore Patina Aging Guarantee' },
      { label: 'Official Warranty', value: '5-Year Written Leather Peel/Crack Replacement Guarantee' },
    ],
    inTheBox: [
      '১টি The Nabab Full-Grain Leather RFID Wallet',
      '১টি রাজকীয় ম্যাগনেটিক হার্ড-বোর্ড সিগনেচার গিফট বক্স (উপহারের জন্য প্রস্তুত)',
      '১টি ১০০% কটন ডাস্ট পাউচ (Breathable Storage Bag)',
      '১টি ফায়ার-টেস্ট স্যাম্পল চামড়ার টুকরো + ৫ বছরের অফিশিয়াল ওয়ারেন্টি কার্ড',
    ],
    colorVariants: {
      tan: {
        key: 'tan',
        labelBn: 'ব্রিটিশ স্যাডল ট্যান (Saddle Tan)',
        labelEn: 'British Saddle Tan',
        hex: '#B45309',
        ringHex: '#F59E0B',
        imageUrl:
          'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
        finishNote: 'হাতের ছোঁয়ায় ৬ মাসে রাজকীয় ভিন্টেজ প্যাটিনা তৈরি হয়',
      },
      dark_brown: {
        key: 'dark_brown',
        labelBn: 'ডার্ক এসপ্রেসো ব্রাউন (Dark Brown)',
        labelEn: 'Espresso Dark Brown',
        hex: '#4A2511',
        ringHex: '#92400E',
        imageUrl:
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
        finishNote: 'কর্পোরেট ও প্রতিদিন ব্যবহারের সবচেয়ে জনপ্রিয় ক্লাসিক শেড',
      },
      jet_black: {
        key: 'jet_black',
        labelBn: 'ম্যাট জেট ব্ল্যাক (Jet Black)',
        labelEn: 'Executive Jet Black',
        hex: '#18181B',
        ringHex: '#52525B',
        imageUrl:
          'https://images.unsplash.com/photo-1606503825008-909a67e63c3d?auto=format&fit=crop&w=800&q=80',
        finishNote: 'ফরমাল স্যুট ও বোর্ডরুম মিটিংয়ের জন্য আভিজাত্যপূর্ণ ব্ল্যাক ফিনিশ',
      },
    },
  },
  {
    id: 't71_executive_belt',
    sku: 'T71-BLT-EX40',
    nameBn: 'সলিড ব্রাস বাকল ৪.০ মিমি সিঙ্গেল-লেয়ার এক্সিকিউটিভ ফরমাল বেল্ট',
    nameEn: 'Single-Piece Full-Grain Bullhide Executive Belt (Solid Brass Buckle)',
    category: 'Executive Belts',
    priceBdt: 1350,
    regularPriceBdt: 1890,
    hideSpec: '3.8mm – 4.0mm Unsplit Single-Piece Full-Grain Strap (কোনো জোড়া বা পেস্টিং নেই)',
    dimensions: 'Width: 35mm (1.38") · Waist Sizes: 30" to 46" (বাড়তি অংশ ঘরে বসেই ছোট করা যায়)',
    rating: '4.96 ★',
    reviewCount: '৩,২৯০+ এক্সিকিউটিভ রিভিউ',
    highlights: [
      'দুই স্তরের কাগজ বা রেক্সিন আঠা দিয়ে জোড়া লাগানো নয়—পুরোটা এক ফালি নিরেট খাঁটি চামড়া',
      'মরিচা-রোধী অ্যান্টিক ব্রাস ও গানমেটাল বাকল, যা ১০ বছরেও রঙ হারায় না',
      'ফরমাল ট্রাউজার এবং সেমি-ফরমাল চিনো—উভয়ের সাথেই সমান মানানসই',
    ],
    detailedSpecs: [
      { label: 'Strap Construction', value: '4.0mm Single-Layer Unsplit Bullhide (Zero Cardboard/Glue Bonding)' },
      { label: 'Buckle Material', value: 'Heavy-Duty Rustproof Solid Brass / Brushed Gunmetal Alloy' },
      { label: 'Strap Width & Sizing', value: '35mm Standard Formal Width · Fits 30"–46" Waist (Screw-Detachable Sizing)' },
      { label: 'Tensile Strength', value: 'Tested for 120kg Pull Load · Crack-Free Bending for 10+ Years' },
      { label: 'Official Warranty', value: '5-Year Leather Strap & Buckle Replacement Warranty' },
    ],
    inTheBox: [
      '১টি Single-Piece Full-Grain Executive Leather Belt',
      '১টি মেটাল স্ক্রু-পিন ও অতিরিক্ত পাঞ্চ-হোল গাইড (সাইজ অ্যাডজাস্ট করার জন্য)',
      '১টি রাউন্ড কাঠের/হার্ড-বোর্ড সিগনেচার গিফট বক্স ও কটন পাউচ',
      '৫ বছরের লিখিত গ্যারান্টি ও লেদার কেয়ার গাইড কার্ড',
    ],
    colorVariants: {
      tan: {
        key: 'tan',
        labelBn: 'ব্রিটিশ স্যাডল ট্যান (Saddle Tan)',
        labelEn: 'Cognac Tan',
        hex: '#B45309',
        ringHex: '#F59E0B',
        imageUrl:
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
        finishNote: 'ট্যান লোফার বা অক্সফোর্ড জুতার সাথে পারফেক্ট ম্যাচিং',
      },
      dark_brown: {
        key: 'dark_brown',
        labelBn: 'ডার্ক এসপ্রেসো ব্রাউন (Dark Brown)',
        labelEn: 'Mahogany Brown',
        hex: '#4A2511',
        ringHex: '#92400E',
        imageUrl:
          'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80',
        finishNote: 'নেভি ব্লু, চারকোল ও বেইজ প্যান্টের সাথে সেরা কম্বিনেশন',
      },
      jet_black: {
        key: 'jet_black',
        labelBn: 'ম্যাট জেট ব্ল্যাক (Jet Black)',
        labelEn: 'Obsidian Black',
        hex: '#18181B',
        ringHex: '#52525B',
        imageUrl:
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
        finishNote: 'অফিশিয়াল ব্ল্যাক ফরমাল সুজের সাথে অপরিহার্য',
      },
    },
  },
  {
    id: 't71_messenger_bag',
    sku: 'T71-BAG-HR15',
    nameBn: 'হেরিটেজ ১৫.৬" ল্যাপটপ স্লিভ ও এক্সিকিউটিভ অফিস মেসেঞ্জার ব্যাগ',
    nameEn: 'Heritage 15.6" Padded Laptop Messenger Briefcase & Sleeve',
    category: 'Bags & Sleeves',
    priceBdt: 4890,
    regularPriceBdt: 6500,
    hideSpec: '2.0mm Oil-Pull-Up Full-Grain Leather + YKK Solid Brass Zippers',
    dimensions: '40 cm × 30 cm × 9 cm · Fits up to 16" MacBook Pro / ThinkPad + Legal Files',
    rating: '4.98 ★',
    reviewCount: '১,৭৪০+ এক্সিকিউটিভ রিভিউ',
    highlights: [
      'উন্নত জাপানি YKK মেটাল জিপার এবং ভেলভেট কুশনড ল্যাপটপ কম্পার্টমেন্ট',
      'ডিটাচেবল প্যাডেড লেদার শোল্ডার স্ট্র্যাপ এবং ট্রলি-স্লিভ হোল্ডার যুক্ত',
      'ব্যাংকার, আইনজীবী, কর্পোরেট ডিরেক্টর ও বিশ্ববিদ্যালয়ের শিক্ষকদের প্রথম পছন্দ',
    ],
    detailedSpecs: [
      { label: 'Outer Leather Material', value: '2.0mm Oil-Pull-Up Full-Grain Cowhide (Self-Healing Scratch Texture)' },
      { label: 'Laptop Compartment', value: '360° High-Density Foam Padded Sleeve (Fits 13" to 16" Laptops)' },
      { label: 'Hardware & Zippers', value: 'Original Japanese YKK #8 Antique Brass Metal Zippers & D-Rings' },
      { label: 'Interior Organization', value: '2 Main Compartments + 4 Card/Pen Holders + Zippered Passport Pocket + Trolley Strap' },
      { label: 'Official Warranty', value: '5-Year Leather & Zipper Hardware Warranty' },
    ],
    inTheBox: [
      '১টি Heritage 15.6" Full-Grain Leather Executive Messenger Bag',
      '১টি ডিটাচেবল প্যাডেড লেদার শোল্ডার স্ট্র্যাপ',
      '১টি ফ্রি ৩০ মিলি ন্যাচারাল বিসওয়াক্স লেদার কন্ডিশনার বাম (Beeswax Balm)',
      '১টি প্রিমিয়াম নন-ওভেন ডাস্ট কভার ব্যাগ ও ৫ বছরের ওয়ারেন্টি কার্ড',
    ],
    colorVariants: {
      tan: {
        key: 'tan',
        labelBn: 'ব্রিটিশ স্যাডল ট্যান (Saddle Tan)',
        labelEn: 'Vintage Saddle Tan',
        hex: '#B45309',
        ringHex: '#F59E0B',
        imageUrl:
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
        finishNote: 'ক্লাসিক ইউরোপীয় ভিন্টেজ ব্রিফকেস লুক',
      },
      dark_brown: {
        key: 'dark_brown',
        labelBn: 'ডার্ক এসপ্রেসো ব্রাউন (Dark Brown)',
        labelEn: 'Rich Bourbon Brown',
        hex: '#4A2511',
        ringHex: '#92400E',
        imageUrl:
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
        finishNote: 'অয়েল পুল-আপ টেক্সচার যা স্ক্র্যাচ পড়লে আঙুল দিয়ে ঘষলেই মিলিয়ে যায়',
      },
      jet_black: {
        key: 'jet_black',
        labelBn: 'ম্যাট জেট ব্ল্যাক (Jet Black)',
        labelEn: 'Stealth Executive Black',
        hex: '#18181B',
        ringHex: '#52525B',
        imageUrl:
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
        finishNote: 'স্লিক মডার্ন কর্পোরেট মিনিমালিস্ট ফিনিশ',
      },
    },
  },
  {
    id: 't71_formal_loafers',
    sku: 'T71-SHOE-GD42',
    nameBn: 'হ্যান্ড-স্টিচড গুডইয়ার ওয়েল্টেড পেনি লোফার (Full-Grain Calfskin)',
    nameEn: 'Handcrafted Full-Grain Calfskin Executive Penny Loafers',
    category: 'Formal Footwear',
    priceBdt: 3490,
    regularPriceBdt: 4600,
    hideSpec: 'Supple Full-Grain Calfskin Upper + Breathable Sheep-Leather Lining + Anti-Slip Sole',
    dimensions: 'EU Sizes: 39, 40, 41, 42, 43, 44 · Free Shoe Horn & Cedar Dust Bag',
    rating: '4.95 ★',
    reviewCount: '২,১৮০+ এক্সিকিউটিভ রিভিউ',
    highlights: [
      'ভেতরে শতভাগ প্রাকৃতিক চামড়ার লাইনিং থাকায় সারাদিন পরলেও পা ঘামে না বা দুর্গন্ধ হয় না',
      'অর্থোপেডিক মেমোরি-ফোম ইনসোল দীর্ঘ সময় হাঁটা বা দাঁড়িয়ে থাকার ক্লান্তি দূর করে',
      'ফ্রি সাইজ এক্সচেঞ্জ সুবিধা—সাইজ ছোট-বড় হলে ডেলিভারি ম্যানের মাধ্যমেই পরিবর্তনযোগ্য',
    ],
    detailedSpecs: [
      { label: 'Upper Leather', value: '1.6mm Hand-Burnished Full-Grain Calfskin Leather' },
      { label: 'Inner Lining & Insole', value: 'Sweat-Absorbing Natural Sheep Leather + Orthopedic Memory Foam Arch Support' },
      { label: 'Outsole Construction', value: 'Hand-Stitched Goodyear Welt Style + High-Grip TPR & Leather Hybrid Sole' },
      { label: 'Available Sizes', value: 'EU 39 (UK 5), 40 (UK 6), 41 (UK 7), 42 (UK 8), 43 (UK 9), 44 (UK 10)' },
      { label: 'Size Exchange Policy', value: '100% Free Instant Doorstep Size Exchange if fit is tight or loose' },
    ],
    inTheBox: [
      '১ জোড়া Handcrafted Full-Grain Calfskin Executive Loafers',
      '১টি প্রিমিয়াম মেটাল শু-হর্ন (Shoe Horn) ও শু-শাইন স্পঞ্জ',
      '২টি আলাদা ব্রিদেবল শু-ডাস্ট ব্যাগ ও সিগনেচার শু বক্স',
      'ফ্রি সাইজ এক্সচেঞ্জ ভাউচার ও ৫ বছরের চামড়ার ওয়ারেন্টি কার্ড',
    ],
    colorVariants: {
      tan: {
        key: 'tan',
        labelBn: 'ব্রিটিশ স্যাডল ট্যান (Saddle Tan)',
        labelEn: 'Burnished Cognac Tan',
        hex: '#B45309',
        ringHex: '#F59E0B',
        imageUrl:
          'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
        finishNote: 'হাতে পালিশ করা ডুয়াল-টোন বার্নিশড টো ফিনিশ',
      },
      dark_brown: {
        key: 'dark_brown',
        labelBn: 'ডার্ক এসপ্রেসো ব্রাউন (Dark Brown)',
        labelEn: 'Dark Roast Espresso',
        hex: '#4A2511',
        ringHex: '#92400E',
        imageUrl:
          'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
        finishNote: 'ফরমাল স্যুট ও পাঞ্জাবি—উভয়ের সাথেই রাজকীয় মানানসই',
      },
      jet_black: {
        key: 'jet_black',
        labelBn: 'ম্যাট জেট ব্ল্যাক (Jet Black)',
        labelEn: 'Classic Tuxedo Black',
        hex: '#18181B',
        ringHex: '#52525B',
        imageUrl:
          'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
        finishNote: 'বোর্ডরুম ও গালার জন্য টাইমলেস ব্ল্যাক কাফস্কিন',
      },
    },
  },
];

export const Tannery71CollectionColorToggleSection: React.FC<
  Tannery71CollectionColorToggleSectionProps
> = ({ title, subtitle, isDark = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  // Track selected color per product ID for seamless instant image swap
  const [productColors, setProductColors] = useState<Record<string, LeatherColorKey>>({
    t71_bifold_wallet: 'tan',
    t71_executive_belt: 'dark_brown',
    t71_messenger_bag: 'tan',
    t71_formal_loafers: 'dark_brown',
  });

  // Big Product Details Modal State
  const [activeModalProduct, setActiveModalProduct] = useState<LeatherProduct | null>(null);
  const [modalTab, setModalTab] = useState<'specs' | 'box' | 'engraving_cod'>('specs');
  const [modalEngraveText, setModalEngraveText] = useState<string>('');
  const [modalCustomerName, setModalCustomerName] = useState<string>('');
  const [modalCustomerPhone, setModalCustomerPhone] = useState<string>('');
  const [modalCustomerAddress, setModalCustomerAddress] = useState<string>('');
  const [modalPhoneError, setModalPhoneError] = useState<string | null>(null);
  const [modalOrderSubmitted, setModalOrderSubmitted] = useState<boolean>(false);

  const openModal = (prod: LeatherProduct, tab: 'specs' | 'engraving_cod' = 'specs') => {
    setActiveModalProduct(prod);
    setModalTab(tab);
    setModalOrderSubmitted(false);
    setModalPhoneError(null);
  };

  const closeModal = () => setActiveModalProduct(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalProduct) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProduct]);

  const handleSwatchClick = (productId: string, colorKey: LeatherColorKey) => {
    setProductColors((prev) => ({
      ...prev,
      [productId]: colorKey,
    }));
  };

  const filteredProducts = TANNERY71_PRODUCTS.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  const scrollToCheckout = () => {
    closeModal();
    const el = document.getElementById('tannery71-unboxing-engraving');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleModalOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = modalCustomerPhone.replace(/[\s-]/g, '');
    if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(clean)) {
      setModalPhoneError('সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (01XXXXXXXXX)');
      return;
    }
    setModalPhoneError(null);
    setModalOrderSubmitted(true);
  };

  return (
    <section
      id="tannery71-collection-swatches"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: isDark ? '#120D0A' : '#FFFFFF',
        borderColor: isDark ? '#29201B' : '#E7DFD3',
        color: isDark ? '#FAF6F0' : '#1C130E',
      }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header + Category Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-900/10 text-[#92400E] dark:text-amber-300">
              <Palette size={14} />
              <span>Seamless Color Variation Toggle (Tan · Dark Brown · Jet Black)</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{ color: isDark ? '#FAF6F0' : '#1C130E' }}
            >
              <EditableText
                id="tannery71_collection_h2"
                defaultText={
                  title ||
                  'আমাদের সিগনেচার ফুল-গ্রেইন লেদার কালেকশন — যেকোনো কার্ডে ক্লিক করে সম্পূর্ণ স্পেক ও বিস্তারিত দেখুন'
                }
              />
            </h2>
            <p
              className="text-xs sm:text-sm"
              style={{ color: isDark ? '#A89F91' : '#574C43' }}
            >
              <EditableText
                id="tannery71_collection_sub"
                defaultText={
                  subtitle ||
                  'পেজ রিলোড ছাড়াই প্রতিটি পণ্যের Saddle Tan, Espresso Dark Brown এবং Jet Black রঙের আসল চামড়ার টেক্সচার ও বিস্তারিত তথ্য দেখুন।'
                }
              />
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              'All',
              'Wallets & Cardholders',
              'Executive Belts',
              'Bags & Sleeves',
              'Formal Footwear',
            ].map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                    active
                      ? 'bg-[#78350F] text-amber-50 border-[#78350F] shadow-xs'
                      : isDark
                      ? 'bg-[#18120E] text-stone-300 border-[#2E231C]'
                      : 'bg-[#FAF6F0] text-stone-700 border-[#E5DDD0]'
                  }`}
                >
                  {cat === 'All' ? 'সব কালেকশন (All)' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2x2 Executive Product Grid — Click ANY card to open Big Product Details Modal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProducts.map((product) => {
            const activeColorKey = productColors[product.id] || 'tan';
            const activeVariant = product.colorVariants[activeColorKey];

            return (
              <div
                key={product.id}
                role="button"
                tabIndex={0}
                onClick={() => openModal(product, 'specs')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(product, 'specs');
                  }
                }}
                className="group rounded-3xl border overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer text-left"
                style={{
                  backgroundColor: isDark ? '#18120E' : '#FDFBF7',
                  borderColor: isDark ? '#2E231C' : '#E5DDD0',
                }}
              >
                <div>
                  {/* Dynamic Product Image that swaps immediately on swatch click */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
                    <img
                      src={activeVariant.imageUrl}
                      alt={`${product.nameBn} - ${activeVariant.labelEn}`}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#160F0B]/90 text-amber-300 border border-amber-500/30 backdrop-blur-xs">
                        {product.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-[#B45309] text-white flex items-center gap-1">
                        <Flame size={11} /> Fire-Test Passed
                      </span>
                    </div>

                    <div className="absolute top-3.5 right-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black bg-black/80 text-amber-200 border border-amber-500/30 group-hover:bg-[#92400E] group-hover:text-white transition">
                        <Eye size={12} /> বিস্তারিত দেখুন
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3.5 right-3.5 p-2.5 rounded-xl bg-black/75 backdrop-blur-md text-amber-50 flex items-center justify-between text-[11px]">
                      <span className="font-bold">
                        রঙ: <strong className="text-amber-300">{activeVariant.labelBn}</strong>
                      </span>
                      <span className="opacity-80 hidden sm:inline">{activeVariant.finishNote}</span>
                    </div>
                  </div>

                  {/* Interactive Color Variation Toggle Bar */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="px-6 py-3.5 border-b flex flex-wrap items-center justify-between gap-3"
                    style={{
                      backgroundColor: isDark ? '#120D0A' : '#F5EFE6',
                      borderColor: isDark ? '#2E231C' : '#E5DDD0',
                    }}
                  >
                    <span className="text-xs font-extrabold flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[#B45309]" />
                      <span>রঙ পরিবর্তন করুন (Click Swatch):</span>
                    </span>

                    <div className="flex items-center gap-2.5">
                      {(['tan', 'dark_brown', 'jet_black'] as LeatherColorKey[]).map((cKey) => {
                        const swatch = product.colorVariants[cKey];
                        const isSelected = activeColorKey === cKey;
                        return (
                          <button
                            key={cKey}
                            type="button"
                            onClick={() => handleSwatchClick(product.id, cKey)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1.5 border transition cursor-pointer ${
                              isSelected
                                ? 'bg-white dark:bg-[#29201B] border-[#B45309] shadow-xs scale-105'
                                : 'border-transparent opacity-75 hover:opacity-100'
                            }`}
                          >
                            <span
                              className="w-4 h-4 rounded-full border border-white/40 shadow-inner shrink-0"
                              style={{ backgroundColor: swatch.hex }}
                            />
                            <span>
                              {cKey === 'tan'
                                ? 'Tan'
                                : cKey === 'dark_brown'
                                ? 'Dark Brown'
                                : 'Jet Black'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Product Details Body */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3
                        className="text-lg font-black leading-snug group-hover:text-[#B45309] transition"
                        style={{ color: isDark ? '#FAF6F0' : '#1C130E' }}
                      >
                        {product.nameBn}
                      </h3>
                      <p className="text-xs font-semibold opacity-65 mt-0.5">{product.nameEn}</p>
                    </div>

                    <div
                      className="p-3 rounded-xl text-xs space-y-1 border"
                      style={{
                        backgroundColor: isDark ? '#120D0A' : '#FFFFFF',
                        borderColor: isDark ? '#2E231C' : '#E7DFD3',
                      }}
                    >
                      <div>
                        <strong className="text-[#B45309]">চামড়ার স্পেক:</strong> {product.hideSpec}
                      </div>
                      <div className="opacity-80">
                        <strong>মাপ ও ধারণক্ষমতা:</strong> {product.dimensions}
                      </div>
                    </div>

                    <ul className="space-y-1.5">
                      {product.highlights.map((pt) => (
                        <li
                          key={pt}
                          className="text-xs flex items-start gap-2 leading-snug"
                          style={{ color: isDark ? '#D6CBBF' : '#4A3B31' }}
                        >
                          <CheckCircle2
                            size={14}
                            className="text-[#B45309] shrink-0 mt-0.5"
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Price + Full Details / Order CTA */}
                <div className="p-6 pt-4 border-t border-stone-200/70 dark:border-stone-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-[#92400E] dark:text-amber-400">
                        ৳{product.priceBdt.toLocaleString('bn-BD')}
                      </span>
                      <span className="text-xs line-through opacity-50 ml-2">
                        ৳{product.regularPriceBdt.toLocaleString('bn-BD')}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400">
                      <ShieldCheck size={14} /> ৫ বছরের ওয়ারেন্টি + ফ্রি গিফট বক্স
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(product, 'specs');
                      }}
                      className="py-3 px-3 rounded-xl text-xs font-extrabold border border-[#B45309]/40 text-[#92400E] dark:text-amber-300 flex items-center justify-center gap-1.5 hover:bg-amber-500/10 transition cursor-pointer"
                    >
                      <Eye size={14} />
                      <span>বিস্তারিত স্পেক দেখুন</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(product, 'engraving_cod');
                      }}
                      className="py-3 px-3 rounded-xl text-xs font-black text-amber-50 shadow-md flex items-center justify-center gap-1.5 transition hover:opacity-95 cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #92400E 0%, #451A03 100%)',
                      }}
                    >
                      <ShoppingBag size={14} />
                      <span>অর্ডার করুন (COD)</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* BIG PRODUCT FULL DETAILS MODAL FOR TANNERY 71                       */}
      {/* =================================================================== */}
      {activeModalProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-3xl border overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col"
            style={{
              backgroundColor: isDark ? '#140E0B' : '#FDFBF7',
              borderColor: isDark ? '#2E231C' : '#E5DDD0',
              color: isDark ? '#FAF6F0' : '#1C130E',
            }}
          >
            {/* Modal Header */}
            <div
              className="px-5 sm:px-7 py-4 border-b flex items-center justify-between gap-4 shrink-0"
              style={{
                backgroundColor: isDark ? '#1C140F' : '#F5EFE6',
                borderColor: isDark ? '#2E231C' : '#E5DDD0',
              }}
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#92400E] text-white">
                  {activeModalProduct.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck size={14} /> 5-Year Leather Warranty · Fire-Test Passed
                </span>
                <span className="text-xs font-mono opacity-60">SKU: {activeModalProduct.sku}</span>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 rounded-xl border border-stone-400/30 hover:border-rose-500 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
              {(() => {
                const activeColorKey = productColors[activeModalProduct.id] || 'tan';
                const activeVar = activeModalProduct.colorVariants[activeColorKey];
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left 5 Cols: Image + Color Swatch Switcher */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 border border-amber-900/30">
                        <img
                          src={activeVar.imageUrl}
                          alt={activeModalProduct.nameBn}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-black/80 text-amber-100 text-xs flex items-center justify-between">
                          <span>রঙ: <strong>{activeVar.labelBn}</strong></span>
                          <span className="text-amber-300 font-bold">{activeModalProduct.rating}</span>
                        </div>
                      </div>

                      {/* Swatch Selector inside Modal */}
                      <div className="p-4 rounded-2xl border border-amber-900/20 space-y-2">
                        <div className="text-xs font-extrabold">লেদারের রঙ পরিবর্তন করুন:</div>
                        <div className="flex flex-wrap gap-2">
                          {(['tan', 'dark_brown', 'jet_black'] as LeatherColorKey[]).map((ck) => {
                            const sw = activeModalProduct.colorVariants[ck];
                            const sel = activeColorKey === ck;
                            return (
                              <button
                                key={ck}
                                type="button"
                                onClick={() => handleSwatchClick(activeModalProduct.id, ck)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-extrabold cursor-pointer ${
                                  sel
                                    ? 'border-[#B45309] bg-amber-500/15'
                                    : 'border-stone-300 dark:border-stone-700 opacity-75'
                                }`}
                              >
                                <span
                                  className="w-3.5 h-3.5 rounded-full"
                                  style={{ backgroundColor: sw.hex }}
                                />
                                <span>{sw.labelEn}</span>
                                {sel && <Check size={12} className="text-[#B45309]" />}
                              </button>
                            );
                          })}
                        </div>
                        <p className="text-[11px] opacity-75 pt-1">{activeVar.finishNote}</p>
                      </div>
                    </div>

                    {/* Right 7 Cols: Full Specs, In The Box & Direct COD Order */}
                    <div className="lg:col-span-7 space-y-5">
                      <div>
                        <h2 className="text-2xl font-black leading-snug">
                          {activeModalProduct.nameBn}
                        </h2>
                        <p className="text-xs font-semibold opacity-70 mt-0.5">
                          {activeModalProduct.nameEn} · ({activeModalProduct.reviewCount})
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl border border-amber-900/20 bg-amber-950/5 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <span className="text-xs line-through opacity-50 block">
                            রেগুলার মূল্য: ৳{activeModalProduct.regularPriceBdt.toLocaleString('bn-BD')}
                          </span>
                          <span className="text-2xl sm:text-3xl font-black text-[#92400E] dark:text-amber-400">
                            ৳{activeModalProduct.priceBdt.toLocaleString('bn-BD')}
                          </span>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                          ✓ ডেলিভারি ম্যানের সামনে চামড়া যাচাই করে পেমেন্ট (COD)
                        </span>
                      </div>

                      {/* Modal Tabs */}
                      <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-stone-200/70 dark:bg-stone-900">
                        {[
                          { id: 'specs', label: 'সম্পূর্ণ লেদার স্পেক (Full Specs)' },
                          { id: 'box', label: 'গিফট বক্সে যা থাকছে (In The Box)' },
                          { id: 'engraving_cod', label: '⚡ নাম খোদাই ও ১-ক্লিক অর্ডার' },
                        ].map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() =>
                              setModalTab(t.id as 'specs' | 'box' | 'engraving_cod')
                            }
                            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                              modalTab === t.id
                                ? 'bg-[#92400E] text-white shadow-xs'
                                : 'opacity-75 hover:opacity-100'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>

                      {modalTab === 'specs' && (
                        <div className="rounded-2xl border border-stone-300/70 dark:border-stone-800 overflow-hidden">
                          <table className="w-full text-left border-collapse text-xs">
                            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                              {activeModalProduct.detailedSpecs.map((row) => (
                                <tr key={row.label}>
                                  <td className="py-3 px-4 font-extrabold opacity-75 w-2/5">
                                    {row.label}
                                  </td>
                                  <td className="py-3 px-4 font-bold">{row.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {modalTab === 'box' && (
                        <ul className="space-y-2.5 text-xs">
                          {activeModalProduct.inTheBox.map((item, i) => (
                            <li
                              key={i}
                              className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-2.5 font-bold"
                            >
                              <Package size={15} className="text-[#B45309] shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {modalTab === 'engraving_cod' && (
                        <div className="p-5 rounded-2xl border border-[#B45309]/40 space-y-3">
                          {modalOrderSubmitted ? (
                            <div className="py-4 text-center space-y-2">
                              <CheckCircle2 size={32} className="text-emerald-500 mx-auto" />
                              <h4 className="text-base font-black">
                                অভিনন্দন {modalCustomerName}! আপনার অর্ডারটি কনফার্ম হয়েছে
                              </h4>
                              <p className="text-xs opacity-80">
                                প্রোডাক্ট: {activeModalProduct.nameBn} ({activeVar.labelBn})
                                {modalEngraveText ? ` · খোদাই নাম: "${modalEngraveText}"` : ''}।
                              </p>
                            </div>
                          ) : (
                            <form onSubmit={handleModalOrderSubmit} className="space-y-3">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                  type="text"
                                  required
                                  value={modalCustomerName}
                                  onChange={(e) => setModalCustomerName(e.target.value)}
                                  placeholder="আপনার নাম *"
                                  className="px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-bold"
                                />
                                <input
                                  type="tel"
                                  required
                                  value={modalCustomerPhone}
                                  onChange={(e) => setModalCustomerPhone(e.target.value)}
                                  placeholder="মোবাইল নাম্বার (017XXXXXXXX) *"
                                  className="px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-mono font-bold"
                                />
                              </div>
                              {modalPhoneError && (
                                <p className="text-[11px] text-rose-500 font-bold flex items-center gap-1">
                                  <AlertCircle size={12} /> {modalPhoneError}
                                </p>
                              )}
                              <input
                                type="text"
                                maxLength={15}
                                value={modalEngraveText}
                                onChange={(e) => setModalEngraveText(e.target.value)}
                                placeholder="চামড়ায় নাম খোদাই করতে চাইলে লিখুন (ঐচ্ছিক, যেমন: TANVIR) "
                                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-bold"
                              />
                              <input
                                type="text"
                                required
                                value={modalCustomerAddress}
                                onChange={(e) => setModalCustomerAddress(e.target.value)}
                                placeholder="সম্পূর্ণ ডেলিভারি ঠিকানা (বাসা, রোড, থানা ও জেলা) *"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-bold"
                              />
                              <button
                                type="submit"
                                className="w-full py-3.5 rounded-xl text-xs font-black text-white bg-[#92400E] hover:bg-[#78350F] cursor-pointer"
                              >
                                ক্যাশ অন ডেলিভারি অর্ডার কনফার্ম করুন — ৳{activeModalProduct.priceBdt.toLocaleString('bn-BD')}
                              </button>
                            </form>
                          )}
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between gap-3">
                        {modalTab !== 'engraving_cod' ? (
                          <button
                            type="button"
                            onClick={() => setModalTab('engraving_cod')}
                            className="flex-1 py-3.5 rounded-xl text-xs font-black text-white bg-[#92400E] hover:bg-[#78350F] flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <ShoppingBag size={15} />
                            <span>এই প্রোডাক্টটি অর্ডার করুন (নাম খোদাই অপশনসহ)</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={scrollToCheckout}
                            className="flex-1 py-3 rounded-xl text-xs font-bold border border-stone-300 dark:border-stone-700 cursor-pointer"
                          >
                            ফুল গিফট বক্স ও কর্পোরেট কম্বো দেখতে এখানে ক্লিক করুন →
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={closeModal}
                          className="px-4 py-3.5 rounded-xl text-xs font-extrabold border border-stone-300 dark:border-stone-700 cursor-pointer"
                        >
                          বন্ধ করুন
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

