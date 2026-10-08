import React from 'react';
import { OrganicFruitsNavbar } from '../component/OrganicFruitsNavbar';
import { OrganicFruitsHeroHarvestSection } from '../component/OrganicFruitsHeroHarvestSection';
import { OrganicFruitsCatalogTrustSection } from '../component/OrganicFruitsCatalogTrustSection';
import { OrganicFruitsBulkCalculatorCodSection } from '../component/OrganicFruitsBulkCalculatorCodSection';
import { OrganicFruitsReviewsFooterSection } from '../component/OrganicFruitsReviewsFooterSection';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface OrganicFruitsLandingPageProps {
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const OrganicFruitsLandingPage: React.FC<OrganicFruitsLandingPageProps> = ({
  variant = 'varient_1',
  primaryColor = '#14532D',
  isDark = false,
}) => {
  return (
    <div className="min-h-screen w-full antialiased">
      <OrganicFruitsNavbar
        title="Seasonal Organic Fruits & Pure Sweets"
        subtitle="আম, খেজুরের গুড় ও কেমিক্যাল-মুক্ত ফল • Direct Orchard to Dhaka"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />

      <OrganicFruitsHeroHarvestSection
        title="গাছপাকা রাজশাহীর আম ও খাঁটি খেজুরের গুড় — সরাসরি বাগান থেকে আপনার পরিবারের টেবিলে"
        subtitle="১০০% ফরমালিন, কার্বাইড ও ইথেফন মুক্ত গ্যারান্টি। চাঁপাইনবাবগঞ্জের বাগান থেকে প্রতিদিন ভোরে পাড়া হিমসাগর, দিনাজপুরের লিচু এবং যশোরের খাঁটি খেজুরের গুড়।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />

      <OrganicFruitsCatalogTrustSection
        title="আমাদের বাগান ও ঐতিহ্যবাহী পণ্যের তালিকা (Seasonal Organic Lineup)"
        subtitle="চাঁপাইনবাবগঞ্জের হিমসাগর, ল্যাংড়া ও আম্রপালি আম, দিনাজপুরের লিচু, যশোরের খাঁটি খেজুরের গুড় এবং নাটোর-পাবনার ছানার মিষ্টি।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />

      <OrganicFruitsBulkCalculatorCodSection
        title="ফ্যামিলি ও কর্পোরেট বাল্ক অর্ডার ক্যালকুলেটর এবং ১-ক্লিক ক্যাশ অন ডেলিভারি"
        subtitle="২০ কেজি বা তার বেশি অর্ডার করলেই পাচ্ছেন ৮%–১৬% পর্যন্ত বাগান ছাড় এবং ঢাকা শহরে সম্পূর্ণ ফ্রি হোম ডেলিভারি।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />

      <OrganicFruitsReviewsFooterSection
        title="আমাদের সম্মানিত গ্রাহকদের বাস্তব অভিজ্ঞতা ও রিভিউ"
        subtitle="ধানমন্ডি, গুলশান, বনানী ও উত্তরার সচেতন পরিবার এবং কর্পোরেট ক্লায়েন্টদের যাচাইকৃত মতামত।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};
