import React from 'react';
import { SmartBabuNavbar } from '../component/SmartBabuNavbar';
import { SmartBabuHeroAgeAudioSection } from '../component/SmartBabuHeroAgeAudioSection';
import { SmartBabuCatalogSafetySection } from '../component/SmartBabuCatalogSafetySection';
import { SmartBabuGiftBundlesCodSection } from '../component/SmartBabuGiftBundlesCodSection';
import { SmartBabuParentCommunityFooterSection } from '../component/SmartBabuParentCommunityFooterSection';
import { WebsiteSectionVariantId } from '../../doctor_profile';

export interface SmartBabuToysLandingPageProps {
  primaryColor?: string;
  isDark?: boolean;
  variant?: WebsiteSectionVariantId;
}

export const SmartBabuToysLandingPage: React.FC<SmartBabuToysLandingPageProps> = ({
  primaryColor = '#0D9488',
  isDark = false,
  variant = 'varient_1',
}) => {
  return (
    <div className="min-h-screen w-full">
      <SmartBabuNavbar
        title="SmartBabu (স্মার্টবাবু)"
        subtitle="মোবাইল স্ক্রিন ছাড়াই সোনামণির মেধা বিকাশ — ১০০% BPA-Free, ফুড-গ্রেড ও নন-টক্সিক লার্নিং খেলনা"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <SmartBabuHeroAgeAudioSection
        title="মোবাইল স্ক্রিনের নেশা নয় — সোনামণির শৈশব কাটুক নিরাপদ মন্টেসরি খেলনা ও কথা বলা বইয়ের আনন্দে!"
        subtitle="ভাত খাওয়ানো বা কান্না থামানোর জন্য বাবুর হাতে মোবাইল তুলে দিচ্ছেন? স্মার্টবাবু নিয়ে এসেছে ১০০% ফুড-গ্রেড, BPA-Free মন্টেসরি পাজল ও বাংলা-ইংরেজি-আরবি টকিং অডিও বুক।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <SmartBabuCatalogSafetySection
        title="সোনামণির মেধা বিকাশ ও নিরাপদ যত্নের ৬টি সিগনেচার প্রোডাক্ট — ১০০% নন-টক্সিক গ্যারান্টি"
        subtitle="প্রতিটি কার্ডে রয়েছে সেফটি ব্যাজ (100% BPA Free / Non-Toxic Paint) এবং বয়স অনুযায়ী উপকারিতা।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <SmartBabuGiftBundlesCodSection
        title="সোনামণির জন্মদিন বা আকিকার সেরা উপহার — প্রিমিয়াম গিফট র‍্যাপিং ও ১-ক্লিক ক্যাশ অন ডেলিভারি!"
        subtitle="অগ্রিম ১ টাকাও দিতে হবে না। ডেলিভারি ম্যানের সামনে বক্স খুলে প্রোডাক্টের কোয়ালিটি ও অডিও বুকের সাউন্ড চেক করে মূল্য পরিশোধ করুন।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <SmartBabuParentCommunityFooterSection
        title="৪২,০০০+ সচেতন বাংলাদেশি মা-বাবা ও প্যারেন্টিং কমিউনিটির বাস্তব অভিজ্ঞতা"
        subtitle="যাঁরা মোবাইল কার্টুনের বদলে সোনামণির হাতে তুলে দিয়েছেন আমাদের নিরাপদ লার্নিং খেলনা ও বেবি কেয়ার প্রোডাক্ট।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};
