import React from 'react';
import { GadgetGhorNavbar } from '../component/GadgetGhorNavbar';
import { GadgetGhorHeroWarrantySerialSection } from '../component/GadgetGhorHeroWarrantySerialSection';
import { GadgetGhorCatalogSpecMatrixSection } from '../component/GadgetGhorCatalogSpecMatrixSection';
import { GadgetGhorUnboxingFlashCodSection } from '../component/GadgetGhorUnboxingFlashCodSection';
import { GadgetGhorReviewsWarrantyFooterSection } from '../component/GadgetGhorReviewsWarrantyFooterSection';
import { WebsiteSectionVariantId } from '../../doctor_profile';

export interface GadgetGhorTechLandingPageProps {
  primaryColor?: string;
  isDark?: boolean;
  variant?: WebsiteSectionVariantId;
}

export const GadgetGhorTechLandingPage: React.FC<GadgetGhorTechLandingPageProps> = ({
  primaryColor = '#0284C7',
  isDark = false,
  variant = 'varient_1',
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <GadgetGhorNavbar
        title="GadgetGhor BD (গ্যাজেটঘর)"
        subtitle="১০০% অরিজিনাল গ্লোবাল ভ্যারিয়েন্ট · ৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট ও ৬/১২ মাসের অফিশিয়াল ওয়ারেন্টি"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <GadgetGhorHeroWarrantySerialSection
        title="নকল মাস্টার-কপি ও ওয়ারেন্টি ভোগান্তিকে বিদায় — আসল স্মার্ট গ্যাজেটে সুপারফাস্ট পারফরম্যান্স ও অফিশিয়াল ওয়ারেন্টি!"
        subtitle="ফুটপাত বা নামহীন পেজের সস্তা ক্লোন কিনে কয়েক দিনেই চার্জ না থাকা বা এক পাশের ইয়ারবাড নষ্ট হওয়ার দিন শেষ! GadgetGhor BD দিচ্ছে ১০০% অরিজিনাল গ্লোবাল ভ্যারিয়েন্ট লো-লেটেন্সি TWS ইয়ারবাডস, Super AMOLED স্মার্টওয়াচ, 100W GaN ফাস্ট চার্জার ও মেকানিক্যাল কিবোর্ড — সাথে ৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট ও ১২ মাসের অফিশিয়াল ওয়ারেন্টি।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <GadgetGhorCatalogSpecMatrixSection
        title="আমাদের ৫টি বেস্ট-সেলিং স্মার্ট গ্যাজেট ও মোবাইল অ্যাক্সেসরিজ — অফিশিয়াল ওয়ারেন্টিসহ"
        subtitle="প্রতিটি গ্যাজেটের সাথে পাচ্ছেন ৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট, ৬–১২ মাসের অফিশিয়াল ওয়ারেন্টি কার্ড এবং সারা বাংলাদেশে ক্যাশ অন ডেলিভারি।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <GadgetGhorUnboxingFlashCodSection
        title="ফ্ল্যাশ কম্বো ডিল ও ১-ক্লিক ক্যাশ অন ডেলিভারি — অগ্রিম ১ টাকাও দিতে হবে না!"
        subtitle="আপনার পছন্দের গ্যাজেট বা কম্বো প্যাকটি সিলেক্ট করুন। ডেলিভারি ম্যানের সামনে বক্স খুলে, সিরিয়াল কোড মিলিয়ে এবং ফোনে কানেক্ট করে তারপর মূল্য পরিশোধ করুন।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <GadgetGhorReviewsWarrantyFooterSection
        title="৬৫,০০০+ গেমার, প্রফেশনাল ও স্মার্টফোন ইউজারের বাস্তব অভিজ্ঞতা ও রিভিউ"
        subtitle="যাঁরা সস্তা রেপ্লিকা ছেড়ে গ্যাজেটঘরের ১০০% অরিজিনাল গ্যাজেট ও ৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট ওয়ারেন্টিতে আস্থা রেখেছেন।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};
