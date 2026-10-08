import React from 'react';
import { PanjabiStoreNavbar } from '../component/PanjabiStoreNavbar';
import { PanjabiStoreHeroSection } from '../component/PanjabiStoreHeroSection';
import { PanjabiStoreSizeGuideFabricSection } from '../component/PanjabiStoreSizeGuideFabricSection';
import { PanjabiStoreExpressCodSection } from '../component/PanjabiStoreExpressCodSection';
import { PanjabiStoreReviewsFooterSection } from '../component/PanjabiStoreReviewsFooterSection';

export const PanjabiStoreLandingPage: React.FC = () => {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: '#FAF8F5',
        color: '#1F2937',
        fontFamily: "'Plus Jakarta Sans', 'Hind Siliguri', sans-serif",
      }}
    >
      <PanjabiStoreNavbar
        title="AURA Apparel (আউরা)"
        subtitle="Premium Cotton Kabli Panjabi & Drop-Shoulder Micro-Collection"
        variant="varient_1"
        primaryColor="#0F5132"
        isDark={false}
      />

      <PanjabiStoreHeroSection
        title="AURA Royal Kabli Collection 2026 — Executive Cotton Edition"
        subtitle="প্রিমিয়াম মার্সেরাইজড কটন ফেব্রিক, কাস্টম মেটাল স্ন্যাপ বাটন এবং আরামদায়ক এক্সিকিউটিভ ফিট — গরমে ও উৎসবে শতভাগ স্বাচ্ছন্দ্য।"
        variant="varient_1"
        primaryColor="#0F5132"
        isDark={false}
      />

      <PanjabiStoreSizeGuideFabricSection
        title="সঠিক মাপ নির্বাচন করুন — পারফেক্ট এক্সিকিউটিভ ফিট"
        subtitle="ইঞ্চিতে সম্পূর্ণ সাইজ চার্ট দেখুন অথবা আপনার উচ্চতা ও ওজন দিয়ে ১০ সেকেন্ডে সঠিক সাইজ বের করুন।"
        variant="varient_1"
        primaryColor="#0F5132"
        isDark={false}
      />

      <PanjabiStoreExpressCodSection
        title="অর্ডার কনফার্ম করতে নিচের ফর্মটি পূরণ করুন"
        subtitle="কোনো অ্যাকাউন্ট বা লগইন করার প্রয়োজন নেই — মাত্র ৩০ সেকেন্ডে আপনার নাম, ঠিকানা ও মোবাইল নম্বর দিয়ে অর্ডার সম্পন্ন করুন।"
        variant="varient_1"
        primaryColor="#0F5132"
        isDark={false}
      />

      <PanjabiStoreReviewsFooterSection
        title="আমাদের সম্মানিত কাস্টমারদের বাস্তব ছবি ও মতামত"
        subtitle="ফেসবুক পেজ ও ক্যাশ অন ডেলিভারিতে প্রোডাক্ট হাতে পাওয়ার পর কাস্টমারদের আনফিল্টার্ড রিভিউ।"
        variant="varient_1"
        primaryColor="#0F5132"
        isDark={false}
      />
    </div>
  );
};
