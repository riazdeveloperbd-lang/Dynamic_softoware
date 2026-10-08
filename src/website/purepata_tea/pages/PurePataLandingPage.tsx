import React from 'react';
import { PurePataNavbar } from '../component/PurePataNavbar';
import { PurePataHeroTraceabilitySection } from '../component/PurePataHeroTraceabilitySection';
import { PurePataCatalogSteepingSection } from '../component/PurePataCatalogSteepingSection';
import { PurePataSubscriptionCodSection } from '../component/PurePataSubscriptionCodSection';
import { PurePataReviewsFooterSection } from '../component/PurePataReviewsFooterSection';
import { WebsiteSectionVariantId } from '../../doctor_profile';

export interface PurePataLandingPageProps {
  primaryColor?: string;
  isDark?: boolean;
  variant?: WebsiteSectionVariantId;
}

export const PurePataLandingPage: React.FC<PurePataLandingPageProps> = ({
  primaryColor = '#1E4620',
  isDark = false,
  variant = 'varient_1',
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <PurePataNavbar
        title="PurePata Botanicals (পিওরপাতা বোটানিক্যালস)"
        subtitle="শ্রীমঙ্গল ও পঞ্চগড়ের বাগান থেকে সরাসরি সংগৃহীত · ১০০% কেমিক্যাল-মুক্ত অর্গানিক গ্রিন টি ও ভেষজ চা"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <PurePataHeroTraceabilitySection
        title="শ্রীমঙ্গলের কুয়াশাভেজা বাগান থেকে সরাসরি আপনার পেয়ালায় — এক চুমুকেই বিশুদ্ধ প্রকৃতির সতেজতা ও সুস্থতা"
        subtitle="টি-ব্যাগের কৃত্রিম ডাস্ট চা আর ব্লিচড পেপারের দিন শেষ। আমাদের নিজস্ব তত্ত্বাবধানে শ্রীমঙ্গল ও পঞ্চগড়ের বাগান থেকে সদ্য তোলা দুটি পাতা একটি কুঁড়ি (Whole-Leaf Orthodox Tea) এবং খাঁটি ভেষজ উপাদান—কোনো মধ্যস্বত্বভোগী ছাড়াই ৭২ ঘণ্টার মধ্যে ইকো-ফ্রেন্ডলি এয়ারটাইট টিনে পৌঁছে যাচ্ছে আপনার টেবিলে।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <PurePataCatalogSteepingSection
        title="আমাদের ৫টি সিগনেচার অর্গানিক চা ও ভেষজ ওয়েলনেস ব্লেন্ড — ফুড-গ্রেড ইকো টিনে সংরক্ষিত"
        subtitle="প্রতিটি টিনে থাকছে ডাবল এয়ারটাইট লিড + সঠিক পানির তাপমাত্রা ও সময়ের ইন্টারঅ্যাক্টিভ ব্রিউইং গাইড।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <PurePataSubscriptionCodSection
        title="মাসিক টি-রিফিল সাবস্ক্রিপশন বক্স — ১৫% ফ্ল্যাট ডিসকাউন্ট এবং সারা বাংলাদেশে ফ্রি হোম ডেলিভারি"
        subtitle="প্রথমবার অরিজিনাল ইকো টিন পাওয়ার পর প্রতি মাসে বাগানের সতেজ হারভেস্ট ব্যাচ কম্পোস্টেবল রিফিল পাউচে আপনার বাসায় পৌঁছে যাবে।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <PurePataReviewsFooterSection
        title="ঢাকা, চট্টগ্রাম ও সিলেটের সচেতন চা-প্রেমী, পুষ্টিবিদ ও কর্পোরেট এক্সিকিউটিভদের মতামত"
        subtitle="যাঁরা প্রতিদিনের টি-ব্যাগ ছেড়ে আমাদের গার্ডেন-ডিরেক্ট হোল-লিফ ও ভেষজ চায়ের সতেজতায় ফিরেছেন।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};
