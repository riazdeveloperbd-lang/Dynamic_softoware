import React from 'react';
import { Tannery71Navbar } from '../component/Tannery71Navbar';
import { Tannery71HeroAuthenticitySection } from '../component/Tannery71HeroAuthenticitySection';
import { Tannery71CollectionColorToggleSection } from '../component/Tannery71CollectionColorToggleSection';
import { Tannery71UnboxingEngravingCheckoutSection } from '../component/Tannery71UnboxingEngravingCheckoutSection';
import { Tannery71CorporateWarrantyFooterSection } from '../component/Tannery71CorporateWarrantyFooterSection';
import { WebsiteSectionVariantId } from '../../doctor_profile';

export interface Tannery71LeatherLandingPageProps {
  primaryColor?: string;
  isDark?: boolean;
  variant?: WebsiteSectionVariantId;
}

export const Tannery71LeatherLandingPage: React.FC<Tannery71LeatherLandingPageProps> = ({
  primaryColor = '#92400E',
  isDark = false,
  variant = 'varient_1',
}) => {
  return (
    <div className="min-h-screen w-full">
      <Tannery71Navbar
        title="Tannery 71 (ট্যানারি ৭১)"
        subtitle="১০০% এক্সপোর্ট-গ্রেড ফুল-গ্রেইন খাঁটি চামড়ার গ্যারান্টি — কৃত্রিম বা রেক্সিন প্রমাণ করতে পারলে দ্বিগুণ মূল্য ফেরত!"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <Tannery71HeroAuthenticitySection
        title="এক ফালি খাঁটি চামড়ার আভিজাত্য — যা সময়ের সাথে ক্ষয়ে যায় না, বরং আপনার ব্যক্তিত্বের সাক্ষী হয়ে থাকে!"
        subtitle="Tannery 71 বাংলাদেশের সেরা এক্সপোর্ট ট্যানারি থেকে বাছাইকৃত ১০০% Full-Grain Vegetable-Tanned চামড়া দিয়ে তৈরি করছে প্রিমিয়াম ওয়ালেট, এক্সিকিউটিভ বেল্ট, অফিস মেসেঞ্জার ব্যাগ ও হ্যান্ডক্রাফটেড লোফার।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <Tannery71CollectionColorToggleSection
        title="আমাদের সিগনেচার ফুল-গ্রেইন লেদার কালেকশন — রঙের সোয়াচে ক্লিক করে সরাসরি প্রিভিউ দেখুন"
        subtitle="পেজ রিলোড ছাড়াই প্রতিটি পণ্যের Saddle Tan, Espresso Dark Brown এবং Jet Black রঙের আসল চামড়ার টেক্সচার দেখুন।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <Tannery71UnboxingEngravingCheckoutSection
        title="আপনার পছন্দের প্যাক সিলেক্ট করুন ও চামড়ায় নিজের নাম খোদাই (Engraving) করুন"
        subtitle="প্রতিটি অর্ডারের সাথেই একদম ফ্রি পাচ্ছেন আমাদের সিগনেচার ম্যাট ব্ল্যাক রিজিড গিফট বক্স, ডাস্ট ব্যাগ ও ৫ বছরের ওয়ারেন্টি কার্ড।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <Tannery71CorporateWarrantyFooterSection
        title="৩৫,০০০+ কর্পোরেট এক্সিকিউটিভ, ব্যাংকার ও গিফট ক্রেতাদের আস্থার রিভিউ"
        subtitle="যাঁরা সস্তা সিন্থেটিক ছেড়ে আমাদের ফুল-গ্রেইন খাঁটি চামড়ার আভিজাত্য বেছে নিয়েছেন।"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};
