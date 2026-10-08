import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ShoppingBag,
  Eye,
  X,
  QrCode,
  Droplets,
  Sun,
  Clock,
  Check,
  Award,
  Truck,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface SeoulGlowCatalogQuizSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

export interface KBeautyProductItem {
  id: string;
  brand: 'COSRX' | 'Beauty of Joseon' | 'Anua' | 'AXIS-Y' | 'SKIN1004' | 'Round Lab';
  title: string;
  bnSubtitle: string;
  volume: string;
  topLeftBadge: 'Made in Korea 🇰🇷' | 'Viral on TikTok';
  skinTypeFilter: 'all' | 'oily_acne' | 'dry_glow' | 'sensitive' | 'dark_spots';
  skinTypeTag: string;
  keyIngredients: string;
  priceBdt: number;
  oldPriceBdt: number;
  rating: string;
  reviewsCount: string;
  batchCode: string;
  phValue: string;
  textureNotes: string;
  image: string;
  gallery: string[];
  clinicalBenefitsBn: string[];
  howToUseSteps: { step: string; detailBn: string }[];
  authenticityMarkers: string[];
}

const KBEAUTY_CATALOG_PRODUCTS: KBeautyProductItem[] = [
  {
    id: 'kb_cosrx_snail_96',
    brand: 'COSRX',
    title: 'COSRX Advanced Snail 96 Mucin Power Essence - 100ml',
    bnSubtitle: 'ড্যামেজড ব্যারিয়ার রিপেয়ার, ব্রণের গর্ত ও গ্লাস-স্কিন হাইড্রেশন এসেন্স',
    volume: '100ml / 3.38 fl.oz.',
    topLeftBadge: 'Viral on TikTok',
    skinTypeFilter: 'dry_glow',
    skinTypeTag: 'Best for: All Skin Types, Dullness & Dehydration',
    keyIngredients: '96.3% Snail Secretion Filtrate, Sodium Hyaluronate, Panthenol, Allantoin',
    priceBdt: 1650,
    oldPriceBdt: 2100,
    rating: '4.98',
    reviewsCount: '4,820+',
    batchCode: 'COSRX-KR-88294',
    phValue: 'pH 6.5 ± 0.5',
    textureNotes: 'Lightweight, stretchy mucin essence that absorbs in 15 seconds with zero stickiness',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1608248597359-0e6d526a6c58?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85',
    ],
    clinicalBenefitsBn: [
      '৯৬.৩% পিওর স্নেইল মিউসিন ত্বকের কোষ পুনর্গঠন করে এবং ব্রণের গর্ত ও দাগ হালকা করে।',
      '১,০০০ পিপিএম সোডিয়াম হায়ালুরোনেট ত্বকের গভীর স্তরে দীর্ঘস্থায়ী আর্দ্রতা লক করে কাঁচের মতো গ্লো দেয়।',
      '১০০% সুগন্ধি, অ্যালকোহল ও প্যারাবেন মুক্ত—তাই সেনসিটিভ ত্বকেও কোনো র‍্যাশ বা জ্বালাপোড়া করে না।',
    ],
    howToUseSteps: [
      {
        step: 'Step 01 · Cleanse & Tone',
        detailBn: 'ফেসওয়াশ ও টোনার ব্যবহারের পর মুখ হালকা ভেজা (Damp) থাকা অবস্থায় নিন।',
      },
      {
        step: 'Step 02 · 2 Pumps Application',
        detailBn: 'হাতের তালুতে ২-৩ পাম্প এসেন্স নিয়ে ঘষে না লাগিয়ে আলতো করে ত্বকে ড্যাব (Pat) করে লাগান।',
      },
      {
        step: 'Step 03 · Seal with Moisturizer/SPF',
        detailBn: 'সকালে এর ওপরে কোরিয়ান সানস্ক্রিন এবং রাতে হালকা ময়েশ্চারাইজার ব্যবহার করুন।',
      },
    ],
    authenticityMarkers: [
      'বক্সের গায়ে অফিশিয়াল COSRX HiddenTag হলোগ্রাম স্টিকার স্ক্যান করলে কোরিয়ান সার্ভার ভেরিফিকেশন আসবে।',
      'আসল স্নেইল মিউসিন আঙুলের মাঝে নিলে লম্বা তারের মতো স্ট্রেচি (Stringy) হয়, পানির মতো পাতলা নয়।',
      'বোতলের নিচে লেজার খোদাই করা লট কোড #COSRX-KR-88294 এবং মেয়াদ স্পষ্টভাবে উল্লেখ থাকে।',
    ],
  },
  {
    id: 'kb_boj_relief_sun',
    brand: 'Beauty of Joseon',
    title: 'Beauty of Joseon Relief Sun : Rice + Probiotics SPF50+ PA++++ - 50ml',
    bnSubtitle: 'হোয়াইট কাস্ট ছাড়া হালকা ময়েশ্চারাইজিং কোরিয়ান অর্গানিক সানস্ক্রিন',
    volume: '50ml / 1.69 fl.oz.',
    topLeftBadge: 'Made in Korea 🇰🇷',
    skinTypeFilter: 'all',
    skinTypeTag: 'Best for: All Skin Types, Humid Climate & Zero White Cast',
    keyIngredients: '30% Rice Extract, Grain Fermented Probiotics, Niacinamide, Adenosine',
    priceBdt: 1550,
    oldPriceBdt: 1950,
    rating: '4.99',
    reviewsCount: '5,340+',
    batchCode: 'BOJ-SEOUL-44109',
    phValue: 'pH 6.8',
    textureNotes: 'Light Whipped Lotion texture — zero white cast, zero pilling under makeup, non-greasy',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85',
    ],
    clinicalBenefitsBn: [
      '৩০% কোরিয়ান রাইস এক্সট্র্যাক্ট ও প্রোবায়োটিকস রোদে পোড়া ভাব রোধ করার পাশাপাশি ত্বককে ভিটামিন বি, সি ও ই জোগায়।',
      'বাংলাদেশের গরমে ঘাম হলেও সাদাটে দাগ (White Cast) ফেলে না এবং চোখ জ্বালাপোড়া করে না।',
      'আলাদা ময়েশ্চারাইজার ছাড়াই ত্বকে ন্যাচারাল ডিউয়ি গ্লাস-স্কিন ফিনিশ দেয়।',
    ],
    howToUseSteps: [
      {
        step: 'Step 01 · 2-Finger Rule',
        detailBn: 'সকালের স্কিনকেয়ারের শেষ ধাপে দুই আঙুল পরিমাণ (প্রায় ১/৪ চা চামচ) সানস্ক্রিন নিন।',
      },
      {
        step: 'Step 02 · Apply 15 Mins Before Sun',
        detailBn: 'রোদে বের হওয়ার ১৫ মিনিট আগে মুখ, গলা ও কানে সমানভাবে লাগিয়ে নিন।',
      },
      {
        step: 'Step 03 · Reapply Outdoors',
        detailBn: 'টানা রোদে থাকলে প্রতি ৩ ঘণ্টা পর পর পুনরায় ব্যবহার করুন।',
      },
    ],
    authenticityMarkers: [
      'টিউবের পেছনে Kolmar Korea Co., Ltd. ম্যানুফ্যাকচারার স্ট্যাম্প ও KFDA ফাংশনাল কসমেটিক সিল রয়েছে।',
      'টিউবের মুখে অ্যালুমিনিয়াম ফয়েল সিল থাকে এবং ক্রিমের রঙ হালকা আইভরি-ক্রিম (ধবধবে সাদা পেস্ট নয়)।',
      'বক্সের QR কোড Beauty of Joseon অফিশিয়াল অ্যাপে ভেরিফাই করা যায়।',
    ],
  },
  {
    id: 'kb_anua_heartleaf_77',
    brand: 'Anua',
    title: 'Anua Heartleaf 77% Soothing Toner - 250ml',
    bnSubtitle: 'ব্রণ, র‍্যাশ, লালচে ভাব ও ওপেন পোরস শান্ত করার কোরিয়ার #১ টোনার',
    volume: '250ml / 8.45 fl.oz.',
    topLeftBadge: 'Viral on TikTok',
    skinTypeFilter: 'oily_acne',
    skinTypeTag: 'Best for: Oily, Acne-Prone, Redness & Sensitive Skin',
    keyIngredients: '77% Houttuynia Cordata (Heartleaf) Extract, Centella Asiatica, Panthenol',
    priceBdt: 1890,
    oldPriceBdt: 2350,
    rating: '4.97',
    reviewsCount: '3,910+',
    batchCode: 'ANUA-77-90312',
    phValue: 'pH 5.5–6.0',
    textureNotes: 'Refreshing watery toner that layers 3x without heaviness or pore clogging',
    image:
      'https://images.unsplash.com/photo-1608248597359-0e6d526a6c58?auto=format&fit=crop&w=800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1608248597359-0e6d526a6c58?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85',
    ],
    clinicalBenefitsBn: [
      '৭৭% হার্টলিফ (Houttuynia Cordata) নির্যাস ব্রণের ব্যাকটেরিয়া ও লালচে প্রদাহ তাৎক্ষণিক প্রশমিত করে।',
      'সাব-অ্যাসিডিক pH 5.5 ফর্মুলা ত্বকের প্রাকৃতিক অ্যাসিড ম্যান্টেল ও অয়েল-ওয়াটার ব্যালেন্স ঠিক রাখে।',
      'নন-কমেডোজেনিক টেস্টেড—পোরস ব্লক করে না এবং ওপেন পোরস ছোট দেখাতে সাহায্য করে।',
    ],
    howToUseSteps: [
      {
        step: 'Step 01 · Post-Cleansing Prep',
        detailBn: 'মুখ ধোয়ার পর কটন প্যাডে বা সরাসরি হাতে টোনার নিন।',
      },
      {
        step: 'Step 02 · DIY 5-Min Toner Mask',
        detailBn: 'অতিরিক্ত ব্রণ বা র‍্যাশের স্থানে কটন প্যাড ভিজিয়ে ৫ মিনিট রেখে দিলে লালচে ভাব দ্রুত কমে।',
      },
      {
        step: 'Step 03 · Follow with Serum',
        detailBn: 'টোনার শোষিত হলে স্নেইল মিউসিন বা নায়াসিনামাইড সিরাম লাগান।',
      },
    ],
    authenticityMarkers: [
      'বোতলের সামনের লেবেলে ফন্ট নিখুঁত ম্যাট ফিনিশের এবং পেছনে কোরিয়ান মেগাকস ফ্যাক্টরি লট কোড থাকে।',
      'ঝাঁকালে খুব সূক্ষ্ম প্রাকৃতিক বুদবুদ তৈরি হয় যা কয়েক সেকেন্ডে মিলিয়ে যায় (সাবানের ফেনার মতো থাকে না)।',
      'কোনো কৃত্রিম সুগন্ধি বা অ্যালকোহলের ঝাঁঝালো গন্ধ নেই।',
    ],
  },
  {
    id: 'kb_axisy_darkspot_serum',
    brand: 'AXIS-Y',
    title: 'AXIS-Y Dark Spot Correcting Glow Serum - 50ml',
    bnSubtitle: '৫% নায়াসিনামাইড ও স্কোয়ালেন যুক্ত মেছতা ও ব্রণের কালো দাগ দূর করার সিরাম',
    volume: '50ml / 1.69 fl.oz.',
    topLeftBadge: 'Viral on TikTok',
    skinTypeFilter: 'dark_spots',
    skinTypeTag: 'Best for: Dark Spots, Acne Scars, Hyperpigmentation & Uneven Tone',
    keyIngredients: '5% Niacinamide, Plant-Derived Squalane, Papaya, Sea Buckthorn, Rice Bran',
    priceBdt: 1590,
    oldPriceBdt: 2050,
    rating: '4.96',
    reviewsCount: '3,480+',
    batchCode: 'COSRX-KR-88294',
    phValue: 'pH 6.1',
    textureNotes: 'Silky gel-lotion serum that brightens dark spots while keeping skin barrier plump',
    image:
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85',
    ],
    clinicalBenefitsBn: [
      '৫% ক্লিনিক্যাল গ্রেড নায়াসিনামাইড ও রাইস ব্র্যান এক্সট্র্যাক্ট ব্রণের জেদি কালো দাগ ও মেছতা হালকা করে।',
      'উদ্ভিজ্জ স্কোয়ালেন (Squalane) ত্বককে ভেতর থেকে ময়েশ্চারাইজড রাখে এবং ফাইন লাইনস রোধ করে।',
      'সকাল ও রাত উভয় রুটিনে নিরাপদে ব্যবহারযোগ্য এবং সানস্ক্রিনের নিচে চমৎকার কাজ করে।',
    ],
    howToUseSteps: [
      {
        step: 'Step 01 · Spot or Full-Face',
        detailBn: 'টোনারের পর ১ পাম্প সিরাম পুরো মুখে অথবা কালো দাগের স্থানে লাগান।',
      },
      {
        step: 'Step 02 · Massage Gently',
        detailBn: 'আঙুলের ডগা দিয়ে হালকা ম্যাসাজ করুন যতক্ষণ না পুরোপুরি শোষিত হয়।',
      },
      {
        step: 'Step 03 · Mandatory Morning SPF',
        detailBn: 'দাগ দ্রুত দূর করতে দিনের বেলা অবশ্যই SPF50+ সানস্ক্রিন ব্যবহার করুন।',
      },
    ],
    authenticityMarkers: [
      'বক্সের গায়ে AXIS-Y অফিশিয়াল HiddenTag সিলভার স্টিকার থাকে যা স্ক্যান করলে আসল প্রমাণের সার্টিফিকেট দেখায়।',
      'পাম্প টিউবটি এয়ারলেস মেকানিজমে তৈরি এবং সিরামের হালকা ন্যাচারাল বোটানিক্যাল ঘ্রাণ থাকে।',
    ],
  },
  {
    id: 'kb_skin1004_centella',
    brand: 'SKIN1004',
    title: 'SKIN1004 Madagascar Centella Ampoule - 100ml',
    bnSubtitle: '১০০% মাদাগাস্কার সেন্টেলা এশিয়াটিকা নির্যাসে তৈরি সেনসিটিভ ও ব্রণ-প্রবণ ত্বকের অ্যাম্পুল',
    volume: '100ml / 3.38 fl.oz.',
    topLeftBadge: 'Made in Korea 🇰🇷',
    skinTypeFilter: 'sensitive',
    skinTypeTag: 'Best for: Sensitive Skin, Damaged Barrier, Fungal Acne & Redness',
    keyIngredients: '100% Centella Asiatica Extract from Madagascar (7x Asiaticoside)',
    priceBdt: 1690,
    oldPriceBdt: 2150,
    rating: '4.98',
    reviewsCount: '2,890+',
    batchCode: 'SKIN1004-2026-KR',
    phValue: 'pH 5.8',
    textureNotes: 'Golden-amber lightweight watery ampoule — zero oiliness, instant cooling relief',
    image:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1608248597359-0e6d526a6c58?auto=format&fit=crop&w=900&q=85',
    ],
    clinicalBenefitsBn: [
      'স্টেরয়েড বা লোকাল নাইট ক্রিম ব্যবহারে ক্ষতিগ্রস্ত পাতলা ত্বক (Damaged Skin Barrier) দ্রুত রিপেয়ার করে।',
      'তৈলাক্ত ও একনে-প্রবণ ত্বকের অতিরিক্ত তেল (Sebum) নিয়ন্ত্রণ করে এবং রোদে পোড়া জ্বালাপোড়া কমায়।',
      'মাত্র ১টি বিশুদ্ধ উপাদান (100% Centella Extract) থাকায় এলার্জি বা পোরস ব্লক হওয়ার কোনো ঝুঁকি নেই।',
    ],
    howToUseSteps: [
      {
        step: 'Step 01 · Dropper Dispense',
        detailBn: 'ড্রপার দিয়ে ২-৩ ফোঁটা অ্যাম্পুল সরাসরি গালে ও কপালে নিন।',
      },
      {
        step: 'Step 02 · Layer for Redness',
        detailBn: 'ত্বক বেশি লাল বা সেনসিটিভ হলে ২ লেয়ারে আলতো করে ড্যাব করে লাগান।',
      },
    ],
    authenticityMarkers: [
      'কাঁচের মতো স্বচ্ছ ভারী বোতল এবং বাঁকানো টিপের (Bent-tip) ড্রপার যা আসল SKIN1004-এর সিগনেচার।',
      'তরলের রঙ হালকা সোনালী-হলুদ এবং বক্সে অফিশিয়াল Craver Corp Seoul লট বারকোড থাকে।',
    ],
  },
  {
    id: 'kb_roundlab_dokdo_cleanser',
    brand: 'Round Lab',
    title: 'Round Lab 1025 Dokdo Cleanser - 150ml',
    bnSubtitle: 'উলুংডো দ্বীপের ডিপ সি ওয়াটার ও ৩ ধরনের হায়ালুরোনিক অ্যাসিড যুক্ত লো-পিএইচ ফেসওয়াশ',
    volume: '150ml / 5.07 fl.oz.',
    topLeftBadge: 'Made in Korea 🇰🇷',
    skinTypeFilter: 'all',
    skinTypeTag: 'Best for: All Skin Types, Daily Gentle Cleansing & Barrier Care',
    keyIngredients: 'Ulleungdo Deep Sea Water (74 Minerals), 3x Hyaluronic Acid, Panthenol, Ceramide NP',
    priceBdt: 1350,
    oldPriceBdt: 1750,
    rating: '4.97',
    reviewsCount: '2,150+',
    batchCode: 'BOJ-SEOUL-44109',
    phValue: 'pH 5.0–6.0',
    textureNotes: 'Rich micro-bubble whipped foam that cleanses sunscreen & dust without stripping moisture',
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1512290900672-1f04d6e0a153?auto=format&fit=crop&w=900&q=85',
    ],
    clinicalBenefitsBn: [
      'মুখ ধোয়ার পর ত্বক একদম টানটান বা শুষ্ক (Dry/Tight) করে না, বরং সিরামাইড ও প্যানথেনল ত্বক নরম রাখে।',
      'সূক্ষ্ম মাইক্রো-ফোম পোরসের গভীর থেকে ঢাকার ধুলোবালি, সানস্ক্রিন ও অতিরিক্ত তেল পরিষ্কার করে।',
      'দক্ষিণ কোরিয়ার Olive Young-এ টানা ৫ বছর নাম্বার ১ বেস্ট-সেলিং জেন্টল ক্লিনজার।',
    ],
    howToUseSteps: [
      {
        step: 'Step 01 · Pea-Sized Amount',
        detailBn: 'ভেজা হাতে সামান্য পরিমাণ ক্লিনজার নিয়ে পানি মিশিয়ে ঘন ফেনা তৈরি করুন।',
      },
      {
        step: 'Step 02 · 45-Second Massage',
        detailBn: 'টি-জোন (নাক ও কপাল) এবং গালে ৪৫ সেকেন্ড হালকা ম্যাসাজ করে কুসুম গরম বা স্বাভাবিক পানিতে ধুয়ে ফেলুন।',
      },
    ],
    authenticityMarkers: [
      'টিউবের পেছনে Seorin Company Ltd. (Korea) অফিশিয়াল ম্যানুফ্যাকচারার সিল ও খোদাই করা মেয়াদ থাকে।',
      'ক্রিমের টেক্সচার ঘন মাখনের মতো এবং সম্পূর্ণ সুগন্ধি-মুক্ত (Fragrance-Free)।',
    ],
  },
];

export const SeoulGlowCatalogQuizSection: React.FC<SeoulGlowCatalogQuizSectionProps> = ({
  title,
  subtitle,
  variant,
  primaryColor,
  isDark,
}) => {
  const [selectedSkinFilter, setSelectedSkinFilter] = useState<string>('all');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('ALL');
  const [activeModalProduct, setActiveModalProduct] = useState<KBeautyProductItem | null>(null);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState<number>(0);
  const [activeModalTab, setActiveModalTab] = useState<'benefits' | 'routine' | 'auth' | 'cod'>('benefits');
  const [modalQty, setModalQty] = useState<number>(1);
  const [orderNotice, setOrderNotice] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const coralColor = primaryColor || '#E07A5F';
  const isBrutalist = variant === 'varient_3';

  const filteredProducts = KBEAUTY_CATALOG_PRODUCTS.filter((item) => {
    const matchSkin =
      selectedSkinFilter === 'all' ||
      item.skinTypeFilter === selectedSkinFilter ||
      item.skinTypeFilter === 'all';
    const matchBrand =
      selectedBrandFilter === 'ALL' || item.brand === selectedBrandFilter;
    return matchSkin && matchBrand;
  });

  const openProductModal = (product: KBeautyProductItem) => {
    setActiveModalProduct(product);
    setActiveGalleryIdx(0);
    setActiveModalTab('benefits');
    setModalQty(1);
  };

  const scrollToCheckoutWithProduct = (productTitle: string) => {
    setOrderNotice(`Selected "${productTitle}" — Proceeding to Cash on Delivery Form`);
    setTimeout(() => setOrderNotice(null), 3200);
    setActiveModalProduct(null);
    const el = document.getElementById('seoulglow-cod-checkout');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="seoulglow-catalog"
      className={`py-16 sm:py-20 transition-colors ${
        isDark ? 'bg-[#12141A] text-stone-100' : 'bg-[#FAFAFA] text-[#222222]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Toast Notice */}
        {orderNotice && (
          <div
            className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl text-white text-xs font-extrabold shadow-xl flex items-center gap-2"
            style={{ backgroundColor: coralColor }}
          >
            <CheckCircle2 size={16} />
            <span>{orderNotice}</span>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#06B6D4]">
              <Sparkles size={15} />
              <span>100% Authentic K-Beauty Bestsellers · সরাসরি সিউল থেকে আমদানিকৃত</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              <EditableText
                id="seoulglow_catalog_main_title"
                defaultText={
                  title ||
                  'আমাদের বেস্ট-সেলিং কোরিয়ান স্কিনকেয়ার কালেকশন (Bestselling K-Beauty Showcase)'
                }
              />
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-stone-400 leading-relaxed">
              <EditableText
                id="seoulglow_catalog_main_subtitle"
                defaultText={
                  subtitle ||
                  'প্রতিটি প্রোডাক্টের সাথে থাকছে অফিশিয়াল কোরিয়ান ব্যাচ কোড ভেরিফিকেশন এবং নকল প্রমাণে ১০ গুণ টাকা ফেরতের লিখিত গ্যারান্টি। যেকোনো প্রোডাক্ট কার্ডে ক্লিক করে উপাদান, ব্যবহারের নিয়ম ও আসল-নকল চেনার পূর্ণাঙ্গ তথ্য দেখুন।'
                }
              />
            </p>
          </div>

          {/* Korean Brand Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['ALL', 'COSRX', 'Beauty of Joseon', 'Anua', 'AXIS-Y', 'SKIN1004', 'Round Lab'].map(
              (brand) => {
                const active = selectedBrandFilter === brand;
                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setSelectedBrandFilter(brand)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                      active
                        ? 'text-white border-transparent shadow-xs'
                        : isDark
                        ? 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                        : 'bg-white border-[#E5E7EB] text-[#222222] hover:border-rose-300'
                    }`}
                    style={active ? { backgroundColor: coralColor } : undefined}
                  >
                    {brand === 'ALL' ? 'All Korean Brands 🇰🇷' : brand}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Skin Type Filter Bar */}
        <div
          className={`p-2 rounded-2xl border flex flex-wrap items-center justify-between gap-2 ${
            isDark
              ? 'bg-[#171A22] border-stone-800'
              : 'bg-white border-[#F3F4F6] shadow-xs'
          }`}
        >
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Skin Types · সব ত্বকের জন্য' },
              { id: 'oily_acne', label: 'Oily & Acne-Prone · তৈলাক্ত ও ব্রণ' },
              { id: 'dry_glow', label: 'Dry & Glass-Skin Glow · শুষ্ক ও গ্লো' },
              { id: 'dark_spots', label: 'Dark Spots & Melasma · মেছতা ও দাগ' },
              { id: 'sensitive', label: 'Sensitive & Damaged Barrier · সেনসিটিভ ত্বক' },
            ].map((tab) => {
              const active = selectedSkinFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedSkinFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                    active
                      ? 'bg-[#222222] text-white dark:bg-white dark:text-stone-950 shadow-xs'
                      : 'text-[#6B7280] hover:text-[#222222] dark:text-stone-400 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <span className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-[#06B6D4]">
            <Eye size={13} />
            Click any card to open Full Clinical &amp; Authenticity Modal
          </span>
        </div>

        {/* Product Grid — Click ANY Card to Open Big Product Full Details Modal */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            variant === 'varient_2' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
          } gap-6 sm:gap-7`}
        >
          {filteredProducts.map((product) => {
            const discountPct = Math.round(
              ((product.oldPriceBdt - product.priceBdt) / product.oldPriceBdt) * 100
            );
            return (
              <div
                key={product.id}
                onClick={(e) => {
                  e.stopPropagation();
                  openProductModal(product);
                }}
                className={`group rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isDark
                    ? 'bg-[#171A22] border-stone-800 hover:border-cyan-500/50'
                    : 'bg-white border-[#F3F4F6] hover:border-[#E07A5F]/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(224,122,95,0.12)]'
                } ${isBrutalist ? 'rounded-none border-2 border-[#222222]' : ''}`}
              >
                <div>
                  {/* Image Container with Top-Left & Top-Right Badges */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF5F5] dark:bg-stone-900">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                    {/* Top-Left Badge: Made in Korea 🇰🇷 or Viral on TikTok */}
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-xl bg-white/95 text-[#222222] text-[11px] font-extrabold shadow-xs">
                      {product.topLeftBadge}
                    </span>

                    {/* Top-Right Badge: 100% Authentic in Clinical Cyan (#06B6D4) */}
                    <span
                      className="absolute top-3.5 right-3.5 px-3 py-1 rounded-xl text-white text-[11px] font-extrabold shadow-xs flex items-center gap-1"
                      style={{ backgroundColor: '#06B6D4' }}
                    >
                      <ShieldCheck size={12} />
                      100% Authentic
                    </span>

                    {/* Bottom Overlay Bar with Brand, Rating & Quick View Hint */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                      <span className="font-extrabold tracking-wide uppercase bg-black/55 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                        {product.brand} · {product.phValue}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/65 font-bold backdrop-blur-xs">
                        <Eye size={12} className="text-cyan-300" />
                        <span>Full Details</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    {/* Unboxed Metadata: Rating & Batch Code */}
                    <div className="flex items-center justify-between text-[11px] text-[#6B7280] dark:text-stone-400 font-semibold">
                      <span>
                        ★ {product.rating} ({product.reviewsCount} BD Reviews)
                      </span>
                      <span className="font-mono text-[#06B6D4]">
                        Lot #{product.batchCode}
                      </span>
                    </div>

                    {/* Product Title + Volume */}
                    <div>
                      <h3 className="text-base sm:text-lg font-black leading-snug group-hover:text-[#E07A5F] transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-xs font-bold text-[#E07A5F] mt-1">
                        {product.bnSubtitle}
                      </p>
                    </div>

                    {/* Skin Type Tag */}
                    <div
                      className={`px-3 py-2 rounded-xl text-xs font-bold border ${
                        isDark
                          ? 'bg-stone-900/90 border-stone-800 text-stone-200'
                          : 'bg-[#D8E2DC]/35 border-[#D8E2DC] text-[#222222]'
                      }`}
                    >
                      {product.skinTypeTag}
                    </div>

                    {/* Key Ingredients */}
                    <div className="text-xs text-[#6B7280] dark:text-stone-300 leading-relaxed">
                      <strong className="text-[#222222] dark:text-white">
                        Key Ingredients:
                      </strong>{' '}
                      {product.keyIngredients}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Pricing & Action Button */}
                <div className="px-5 sm:px-6 py-4 border-t border-[#F3F4F6] dark:border-stone-800 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-xl sm:text-2xl font-black"
                        style={{ color: coralColor }}
                      >
                        ৳ {product.priceBdt.toLocaleString()}
                      </span>
                      <span className="text-xs line-through text-[#6B7280]">
                        ৳ {product.oldPriceBdt.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                      Save {discountPct}% · Cash on Delivery
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProductModal(product);
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                        isDark
                          ? 'border-stone-700 bg-stone-800 text-stone-200 hover:border-cyan-400'
                          : 'border-stone-200 bg-stone-50 text-[#222222] hover:bg-stone-100'
                      }`}
                      title="View Full Clinical Details"
                    >
                      <Eye size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToCheckoutWithProduct(product.title);
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-xs transition hover:opacity-95 flex items-center gap-1.5 cursor-pointer"
                      style={{ backgroundColor: coralColor }}
                    >
                      <ShoppingBag size={14} />
                      <span>অর্ডার করুন (Buy Now)</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* BIG PRODUCT FULL DETAILS MODAL (ON CARD CLICK)                        */}
      {/* ===================================================================== */}
      {activeModalProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto"
          onClick={(e) => {
            e.stopPropagation();
            setActiveModalProduct(null);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col ${
              isDark
                ? 'bg-[#151821] border-stone-800 text-stone-100'
                : 'bg-white border-stone-200 text-[#222222]'
            }`}
          >
            {/* Top Modal Bar */}
            <div className="px-5 sm:px-7 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4 shrink-0">
              <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold">
                <span
                  className="px-2.5 py-1 rounded-lg text-white"
                  style={{ backgroundColor: '#06B6D4' }}
                >
                  ✓ 100% Authentic Korean Import
                </span>
                <span className="text-[#6B7280] font-mono">
                  Batch #{activeModalProduct.batchCode}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  In Stock (Dhaka Cold-Storage Hub)
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-5 sm:p-7 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left 5 Cols: Multi-Angle Gallery & Quick Authenticity Specs */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#FFF5F5] dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
                  <img
                    src={
                      activeModalProduct.gallery[activeGalleryIdx] ||
                      activeModalProduct.image
                    }
                    alt={activeModalProduct.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-white/95 text-[#222222] text-xs font-extrabold shadow-xs">
                    {activeModalProduct.topLeftBadge}
                  </span>
                </div>

                {/* Gallery Thumbnails */}
                <div className="grid grid-cols-3 gap-2.5">
                  {activeModalProduct.gallery.map((imgUrl, idx) => (
                    <button
                      key={imgUrl + idx}
                      type="button"
                      onClick={() => setActiveGalleryIdx(idx)}
                      className={`rounded-xl overflow-hidden aspect-[4/3] border-2 transition cursor-pointer ${
                        activeGalleryIdx === idx
                          ? 'border-[#E07A5F] scale-[1.02]'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Clinical Lab Summary Box */}
                <div
                  className={`p-4 rounded-2xl border space-y-2 text-xs ${
                    isDark
                      ? 'bg-stone-900/90 border-stone-800'
                      : 'bg-[#FFF5F5] border-rose-100'
                  }`}
                >
                  <div className="font-extrabold text-[#222222] dark:text-white flex items-center justify-between">
                    <span>Formulation &amp; pH Profile</span>
                    <span className="text-[#06B6D4]">{activeModalProduct.phValue}</span>
                  </div>
                  <p className="text-[#6B7280] dark:text-stone-300 leading-relaxed">
                    <strong>Texture:</strong> {activeModalProduct.textureNotes}
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck size={14} />
                    <span>KFDA Approved · 10X Money-Back Authenticity Guarantee</span>
                  </div>
                </div>
              </div>

              {/* Right 7 Cols: Title, Price, 4 Interactive Tabs & COD Order Controls */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#6B7280]">
                    <span className="text-[#E07A5F] font-extrabold uppercase">
                      {activeModalProduct.brand} OFFICIAL KOREA
                    </span>
                    <span>·</span>
                    <span>Volume: {activeModalProduct.volume}</span>
                    <span>·</span>
                    <span>★ {activeModalProduct.rating} ({activeModalProduct.reviewsCount})</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black leading-snug">
                    {activeModalProduct.title}
                  </h2>

                  <p className="text-xs sm:text-sm font-bold text-[#E07A5F]">
                    {activeModalProduct.bnSubtitle}
                  </p>

                  {/* Skin Type & Key Ingredients Box */}
                  <div
                    className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                      isDark
                        ? 'bg-stone-900 border-stone-800'
                        : 'bg-[#FAFAFA] border-stone-200'
                    }`}
                  >
                    <div className="font-extrabold text-[#06B6D4]">
                      {activeModalProduct.skinTypeTag}
                    </div>
                    <div className="text-[#6B7280] dark:text-stone-300">
                      <strong className="text-[#222222] dark:text-white">
                        Active Ingredients:
                      </strong>{' '}
                      {activeModalProduct.keyIngredients}
                    </div>
                  </div>

                  {/* 4 Interactive Clinical & Authenticity Tabs */}
                  <div className="flex flex-wrap gap-1.5 border-b border-stone-200 dark:border-stone-800 pb-2">
                    {[
                      { id: 'benefits', label: 'Clinical Benefits (উপকারিতা)' },
                      { id: 'routine', label: 'How to Layer (ব্যবহার বিধি)' },
                      { id: 'auth', label: 'Fake vs Original Check (আসল চেনার উপায়)' },
                      { id: 'cod', label: 'Delivery & Guarantee (ডেলিভারি)' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() =>
                          setActiveModalTab(
                            t.id as 'benefits' | 'routine' | 'auth' | 'cod'
                          )
                        }
                        className={`px-3 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                          activeModalTab === t.id
                            ? 'bg-[#222222] text-white dark:bg-white dark:text-stone-950'
                            : 'text-[#6B7280] hover:text-[#222222] dark:text-stone-400'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="min-h-[150px] text-xs sm:text-sm space-y-2.5">
                    {activeModalTab === 'benefits' && (
                      <ul className="space-y-2.5">
                        {activeModalProduct.clinicalBenefitsBn.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2
                              size={16}
                              className="text-[#06B6D4] shrink-0 mt-0.5"
                            />
                            <span className="leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {activeModalTab === 'routine' && (
                      <div className="space-y-2.5">
                        {activeModalProduct.howToUseSteps.map((st, i) => (
                          <div
                            key={i}
                            className={`p-3 rounded-xl border ${
                              isDark
                                ? 'bg-stone-900 border-stone-800'
                                : 'bg-stone-50 border-stone-200'
                            }`}
                          >
                            <div className="text-xs font-black text-[#E07A5F]">
                              {st.step}
                            </div>
                            <div className="text-xs text-[#6B7280] dark:text-stone-300 mt-0.5">
                              {st.detailBn}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeModalTab === 'auth' && (
                      <div className="space-y-2.5">
                        <div className="text-xs font-extrabold text-[#06B6D4] flex items-center gap-1.5">
                          <QrCode size={15} />
                          <span>
                            How to Verify This Exact Bottle Upon Delivery:
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {activeModalProduct.authenticityMarkers.map((mk, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check
                                size={15}
                                className="text-emerald-600 shrink-0 mt-0.5"
                              />
                              <span className="text-xs leading-relaxed">{mk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeModalTab === 'cod' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 space-y-1">
                          <div className="font-extrabold flex items-center gap-1.5">
                            <Truck size={14} className="text-[#E07A5F]" />
                            <span>Express BD Courier</span>
                          </div>
                          <p className="text-[#6B7280] dark:text-stone-400">
                            ঢাকায় ২৪ ঘণ্টায় হোম ডেলিভারি (৳৬০) এবং ঢাকার বাইরে ৪৮ ঘণ্টায় (৳১২০)। গ্লাস-স্কিন কম্বো অর্ডারে ডেলিভারি সম্পূর্ণ ফ্রি!
                          </p>
                        </div>
                        <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 space-y-1">
                          <div className="font-extrabold flex items-center gap-1.5">
                            <Award size={14} className="text-[#06B6D4]" />
                            <span>Open-Box Barcode Check</span>
                          </div>
                          <p className="text-[#6B7280] dark:text-stone-400">
                            ডেলিভারি ম্যানের সামনে বক্সের বারকোড ও HiddenTag স্ক্যান করে ১০০% আসল নিশ্চিত হয়ে মূল্য পরিশোধ করুন।
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Price, Quantity & Direct COD Order Action */}
                <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] text-[#6B7280]">
                      Total Authentic Bottle Price ({modalQty}x):
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-2xl sm:text-3xl font-black"
                        style={{ color: coralColor }}
                      >
                        ৳ {(activeModalProduct.priceBdt * modalQty).toLocaleString()}
                      </span>
                      <span className="text-xs line-through text-[#6B7280]">
                        ৳ {(activeModalProduct.oldPriceBdt * modalQty).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                        className="px-3 py-2 text-sm font-black hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                      >
                        −
                      </button>
                      <span className="px-3 py-2 text-xs font-extrabold">
                        {modalQty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setModalQty((q) => q + 1)}
                        className="px-3 py-2 text-sm font-black hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        scrollToCheckoutWithProduct(
                          `${activeModalProduct.title} (x${modalQty})`
                        )
                      }
                      className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold text-white shadow-md flex items-center gap-2 transition hover:opacity-95 cursor-pointer"
                      style={{ backgroundColor: coralColor }}
                    >
                      <ShoppingBag size={16} />
                      <span>অর্ডার কনফার্ম করুন (Cash on Delivery)</span>
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
