import React from 'react';
import { AutoCareNavbar } from '../component/AutoCareNavbar';
import { AutoCareHeroCompatibilitySection } from '../component/AutoCareHeroCompatibilitySection';
import { AutoCareCatalogComparisonSection } from '../component/AutoCareCatalogComparisonSection';
import { AutoCareBundlesCodSection } from '../component/AutoCareBundlesCodSection';
import { AutoCareReviewsFooterSection } from '../component/AutoCareReviewsFooterSection';
import { WebsiteSectionVariantId } from '../../doctor_profile';

export interface AutoCareLandingPageProps {
  primaryColor?: string;
  isDark?: boolean;
  variant?: WebsiteSectionVariantId;
}

export const AutoCareLandingPage: React.FC<AutoCareLandingPageProps> = ({
  primaryColor = '#E11D48',
  isDark = false,
  variant = 'varient_1',
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <AutoCareNavbar
        title="TorqueGear BD (কার ও বাইক কেয়ার)"
        subtitle="সারা বাংলাদেশে ক্যাশ অন ডেলিভারি · ঢাকায় ২৪ ঘণ্টায় ডেলিভারি · ১০০% জেনুইন ডিআইওয়াই গিয়ার"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <AutoCareHeroCompatibilitySection
        title="মাত্র ১০ মিনিটে শোরুমের মতো নতুনের চমক — আপনার শখের গাড়ি ও বাইকের প্রিমিয়াম প্রটেকশন এবং স্মার্ট আপগ্রেড!"
        subtitle="সার্ভিস সেন্টারের হাজার টাকা খরচ আর ঘণ্টার পর ঘণ্টা সিরিয়াল এখন অতীত! গ্রাফিন ৯এইচ সিরামিক কোটিং স্প্রে, ওয়াটারপ্রুফ হেলমেট ইন্টারকম, হাই-প্রেশার কার ওয়াশার এবং প্লাগ-অ্যান্ড-প্লে এলইডি হেডলাইট এখন সরাসরি আপনার হাতের মুঠোয়।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <AutoCareCatalogComparisonSection
        title="আমাদের ৫টি বেস্ট-সেলিং কার ও বাইক কেয়ার গিয়ার — নিজেই করুন শোরুম গ্রেড মেইনটেন্যান্স"
        subtitle="প্রতিটি প্রোডাক্ট বাংলাদেশের আবহাওয়া, ধুলাবালি ও রাস্তার কন্ডিশন মাথায় রেখে বাছাইকৃত + বিফোর অ্যান্ড আফটার কম্পারিজন ল্যাব।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <AutoCareBundlesCodSection
        title="সিঙ্গেল আইটেমের চেয়ে কম্বো প্যাকে অর্ডার করুন — বাঁচান ৮০০ টাকা পর্যন্ত + ফ্রি ডেলিভারি!"
        subtitle="বাইকার প্রো প্যাক ও হোম কার ওয়াশ স্টুডিও বান্ডেল + অগ্রিম ছাড়াই ১-ক্লিক ক্যাশ অন ডেলিভারি ফর্ম।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <AutoCareReviewsFooterSection
        title="৪২,০০০+ বাইকার, প্রাইভেট কার ওনার এবং রাইড-শেয়ার ড্রাইভারদের বাস্তব অভিজ্ঞতা"
        subtitle="ঢাকা, চট্টগ্রাম ও সিলেটের প্রতিদিনের চালকদের যাচাইকৃত রিভিউ এবং টেকনিক্যাল ফিটমেন্ট প্রশ্নোত্তর।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};
