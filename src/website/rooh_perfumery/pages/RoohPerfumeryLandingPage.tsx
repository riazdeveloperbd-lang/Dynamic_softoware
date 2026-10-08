import React from 'react';
import { RoohNavbar } from '../component/RoohNavbar';
import { RoohHeroScentFinderSection } from '../component/RoohHeroScentFinderSection';
import { RoohCatalogComparisonSection } from '../component/RoohCatalogComparisonSection';
import { RoohDiscoveryKitCodSection } from '../component/RoohDiscoveryKitCodSection';
import { RoohReviewsFooterSection } from '../component/RoohReviewsFooterSection';

export const RoohPerfumeryLandingPage: React.FC = () => {
  const primaryColor = '#D4AF37';

  return (
    <div className="min-h-screen bg-[#0B0907] text-[#F9F6F0]">
      <RoohNavbar
        title="Rooh Perfumery (রুহ সুগন্ধি)"
        subtitle="১০০% অ্যালকোহল-মুক্ত হালাল আতর, কম্বোডিয়ান উদ ও অ্যারাবিয়ান বাখুর · সারা বাংলাদেশে ক্যাশ অন ডেলিভারি"
        variant="varient_1"
        primaryColor={primaryColor}
        isDark={true}
      />

      <RoohHeroScentFinderSection
        title="এক ফোঁটাতেই ৪৮ ঘণ্টার রাজকীয় আভিজাত্য ও পবিত্র প্রশান্তি — ১০০% অ্যালকোহল-মুক্ত খাঁটি আতর ও উদ"
        subtitle="অ্যালকোহলযুক্ত স্প্রে পারফিউমের কড়া কেমিক্যাল ও ১ ঘণ্টায় উবে যাওয়া গন্ধের দিন শেষ। সিলেটের আগরউড, সৌদি তাইফের গোলাপ এবং ফরাসি পারফিউম অয়েলের সংমিশ্রণে তৈরি রুহ সুগন্ধি আপনার জুম্মা, পাঁচ ওয়াক্ত নামাজ, অফিস ও ঈদের দাওয়াতে ছড়িয়ে দেবে দীর্ঘস্থায়ী রাজকীয় সুবাস।"
        variant="varient_1"
        primaryColor={primaryColor}
        isDark={true}
      />

      <RoohCatalogComparisonSection
        title="আমাদের ৪টি সিগনেচার কালেকশন — Pure Attars, Designer Clones, Bakhoor ও Pocket Sprays"
        subtitle="প্রতিটি সুগন্ধির Top, Heart এবং Base নোটের বিস্তারিত পিরামিড দেখে বেছে নিন আপনার ব্যক্তিত্বের সেরা ঘ্রাণ।"
        variant="varient_1"
        primaryColor={primaryColor}
        isDark={true}
      />

      <RoohDiscoveryKitCodSection
        title="অনলাইনে ঘ্রাণ না শুঁকে অর্ডার করতে দ্বিধা হচ্ছে? অর্ডার করুন ৫টি আতরের ডিসকভারি বক্স — মাত্র ৳৯৯০!"
        subtitle="ব্লাইন্ড-বাই রিস্ক ছাড়াই আমাদের সবচেয়ে জনপ্রিয় ৫টি আতর (মোট ১৫ মিলি) বাসায় বসে পরখ করুন এবং পরবর্তী ফুল-সাইজ অর্ডারে পান ৩০০ টাকা ডিসকাউন্ট ভাউচার।"
        variant="varient_1"
        primaryColor={primaryColor}
        isDark={true}
      />

      <RoohReviewsFooterSection
        title="৩৮,৫০০+ সুন্নাহ প্রেমী, কর্পোরেট প্রফেশনাল ও পারফিউম কালেক্টরদের বাস্তব অভিজ্ঞতা"
        subtitle="যাঁরা সাধারণ অ্যালকোহল স্প্রে ছেড়ে রুহ পারফিউমারির ১০০% হালাল ও লং-লাস্টিং আতরে ফিরেছেন।"
        variant="varient_1"
        primaryColor={primaryColor}
        isDark={true}
      />
    </div>
  );
};
