import React from 'react';
import { FitGhorNavbar } from '../component/FitGhorNavbar';
import { FitGhorHeroSpecsSection } from '../component/FitGhorHeroSpecsSection';
import { FitGhorCatalogLeadMagnetSection } from '../component/FitGhorCatalogLeadMagnetSection';
import { FitGhorBdCheckoutSection } from '../component/FitGhorBdCheckoutSection';
import { FitGhorSuccessFooterSection } from '../component/FitGhorSuccessFooterSection';

export const FitGhorFitnessLandingPage: React.FC = () => {
  const primaryColor = '#F97316';

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#F8FAFC]">
      <FitGhorNavbar
        title="FitGhor (ফিটঘর — হোম জিম ও ওয়েলনেস)"
        subtitle="প্রতিটি অর্ডারের সাথে ৩০ দিনের At-Home Workout Plan PDF একদম ফ্রি · সারা বাংলাদেশে ক্যাশ অন ডেলিভারি"
        variant="varient_1"
        primaryColor={primaryColor}
        isDark={true}
      />

      <FitGhorHeroSpecsSection
        title="অফিস শেষে জ্যাম ঠেলে জিমে যাওয়ার দিন শেষ — নিজের বেডরুমেই গড়ে তুলুন কমপ্যাক্ট হোম জিম!"
        subtitle="ব্যস্ত প্রফেশনাল ও ফিটনেস প্রেমীদের জন্য FitGhor নিয়ে এসেছে ১৫০ পাউন্ড রেজিস্ট্যান্স ব্যান্ড, অ্যাডজাস্টেবল ডাম্বেল, ওয়েস্ট ট্রিমার, আকুপ্রেশার ইয়োগা ম্যাট এবং স্মার্ট বডি ফ্যাট স্কেল। মাত্র ৩০ মিনিটে ঘরে বসেই মেদ ঝরান ও মাসল বিল্ড করুন—সাথে পান ফ্রি ৩০ দিনের ওয়ার্কআউট গাইড PDF!"
        variant="varient_1"
        primaryColor={primaryColor}
        isDark={true}
      />

      <FitGhorCatalogLeadMagnetSection
        title="আমাদের ৫টি সিগনেচার হোম জিম ও ওয়েলনেস গিয়ার — যা আপনার বেডরুমকে রূপান্তর করবে প্রাইভেট ফিটনেস স্টুডিওতে"
        subtitle="প্রতিটি গিয়ার কমপ্যাক্ট, ফ্লোর-সেফ এবং বাংলাদেশের অ্যাপার্টমেন্টের জন্য বিশেষভাবে ডিজাইন করা। সাথে থাকছে ফ্রি ৩০ দিনের ওয়ার্কআউট রুটিন।"
        variant="varient_1"
        primaryColor={primaryColor}
        isDark={true}
      />

      <FitGhorBdCheckoutSection
        title="আপনার পছন্দের হোম জিম কম্বো বেছে নিন — অর্ডার কনফার্ম করলেই ফ্রি ওয়ার্কআউট প্ল্যান PDF তাৎক্ষণিক আনলক!"
        subtitle="অগ্রিম ১ টাকাও দিতে হবে না। আপনার জেলা (District) এবং থানা/উপজেলা (Thana/Upazila) সিলেক্ট করে অর্ডার সম্পন্ন করুন—পণ্য হাতে পেয়ে ডেলিভারি ম্যানকে টাকা পরিশোধ করুন।"
        variant="varient_1"
        primaryColor={primaryColor}
        isDark={true}
      />

      <FitGhorSuccessFooterSection
        title="২৪,৮০০+ বাংলাদেশী প্রফেশনাল ও হোম জিম মেম্বারদের রিয়েল ট্রান্সফরমেশন রিভিউ"
        subtitle="যাঁরা ব্যস্ত রুটিন ও ট্রাফিক জ্যামের অজুহাত ছেড়ে নিজের ঘরেই প্রতিদিন ৩০ মিনিট সময় দিয়ে নিজেদের ফিটনেস বদলে ফেলেছেন।"
        variant="varient_1"
        primaryColor={primaryColor}
        isDark={true}
      />
    </div>
  );
};
