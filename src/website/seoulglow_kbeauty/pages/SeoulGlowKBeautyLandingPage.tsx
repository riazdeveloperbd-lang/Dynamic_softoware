import React from 'react';
import { SeoulGlowNavbar } from '../component/SeoulGlowNavbar';
import { SeoulGlowHeroQuizAuthenticatorSection } from '../component/SeoulGlowHeroQuizAuthenticatorSection';
import { SeoulGlowCatalogQuizSection } from '../component/SeoulGlowCatalogQuizSection';
import { SeoulGlowBundleRoutineCodSection } from '../component/SeoulGlowBundleRoutineCodSection';
import { SeoulGlowProofFaqFooterSection } from '../component/SeoulGlowProofFaqFooterSection';
import { WebsiteSectionVariantId } from '../../doctor_profile';

export interface SeoulGlowKBeautyLandingPageProps {
  primaryColor?: string;
  isDark?: boolean;
  variant?: WebsiteSectionVariantId;
}

export const SeoulGlowKBeautyLandingPage: React.FC<
  SeoulGlowKBeautyLandingPageProps
> = ({ primaryColor = '#E07A5F', isDark = false, variant = 'varient_1' }) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <SeoulGlowNavbar
        title="SeoulGlow BD (সিউল গ্লো)"
        subtitle="✨ ১০০% অরিজিনাল কোরিয়ান স্কিনকেয়ার গ্যারান্টি | নকল প্রমাণ করতে পারলে ১০ গুণ টাকা ফেরত! | ঢাকায় ২৪ ঘণ্টায় এক্সপ্রেস ডেলিভারি"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <SeoulGlowHeroQuizAuthenticatorSection
        title="কোরিয়ান গ্লাস-স্কিন এখন আর স্বপ্ন নয় — ১০০% অথেনটিক কে-বিউটি প্রোডাক্টে পান দাগহীন, উজ্জ্বল ও স্বাস্থ্যকর ত্বক!"
        subtitle="লোকাল মার্কেটের ভেজাল ও রেপ্লিকা কসমেটিকস ব্যবহার করে ত্বকের বারোটা বাজাবেন না। আমরা সরাসরি দক্ষিণ কোরিয়ার অফিশিয়াল ডিস্ট্রিবিউটর থেকে আমদানি করি ১০০% আসল স্কিনকেয়ার।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <SeoulGlowCatalogQuizSection
        title="আমাদের বেস্ট-সেলিং কোরিয়ান স্কিনকেয়ার কালেকশন (COSRX · Beauty of Joseon · Anua · Skin1004 · Axis-Y)"
        subtitle="প্রতিটি প্রোডাক্টের সাথে থাকছে অফিশিয়াল কোরিয়ান ব্যাচ কোড ভেরিফিকেশন এবং নকল প্রমাণে ১০ গুণ টাকা ফেরতের লিখিত গ্যারান্টি। যেকোনো প্রোডাক্ট কার্ডে ক্লিক করে উপাদান, ব্যবহারের নিয়ম ও আসল-নকল চেনার পূর্ণাঙ্গ তথ্য দেখুন।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <SeoulGlowBundleRoutineCodSection
        title="দ্য ৩-স্টেপ কোরিয়ান গ্লাস-স্কিন স্টার্টার কিট — আলাদা কিনলে ৳ ৪,৮০০ | কম্বো অফার মূল্য: ৳ ৩,৯৯০ + ফ্রি ডেলিভারি!"
        subtitle="ক্লিনজার + ট্রিটমেন্ট সিরাম + নো-হোয়াইট-কাস্ট সানস্ক্রিন কম্বো অর্ডারে সাশ্রয় করুন ৳৮১০ এবং পান ফ্রি কোরিয়ান শিট মাস্ক ও ক্যাশ অন ডেলিভারি।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <SeoulGlowProofFaqFooterSection
        title="৪৮,০০০+ বাংলাদেশি কে-বিউটি লাভারদের ৪ সপ্তাহের গ্লাস-স্কিন ট্রান্সফরমেশন ও ভেরিফাইড রিভিউ"
        subtitle="যেকোনো কার্ডে ক্লিক করে গ্রাহকের ব্যবহৃত প্রোডাক্ট রুটিন এবং সপ্তাহভিত্তিক পরিবর্তন বিস্তারিত দেখুন।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};
