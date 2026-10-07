import React from 'react';
import { FractionalCoreNavbar } from '../component/FractionalCoreNavbar';
import { FractionalCoreHeroSection } from '../component/FractionalCoreHeroSection';
import { FractionalCoreCalculatorDirectorySection } from '../component/FractionalCoreCalculatorDirectorySection';
import { FractionalCoreAdvisoryMatchFormSection } from '../component/FractionalCoreAdvisoryMatchFormSection';
import { FractionalCoreProofSitemapFooterSection } from '../component/FractionalCoreProofSitemapFooterSection';

export const FractionalCoreLandingPage: React.FC = () => {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: '#0A0F1D',
        color: '#F8FAFC',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      }}
    >
      <FractionalCoreNavbar
        title="FractionalCore"
        subtitle="Seed & Series-A Fractional Executive Network"
        variant="varient_1"
        primaryColor="#D97706"
        isDark={true}
      />

      <FractionalCoreHeroSection
        title="Silicon Valley Executive Guidance. 1/4 the Full-Time Cost."
        subtitle="Access veteran CTOs, CFOs, and CMOs who have scaled companies from Series A to IPO. Get institutional strategic direction without sacrificing $250k+ salary or cap table equity."
        variant="varient_1"
        primaryColor="#D97706"
        isDark={true}
      />

      <FractionalCoreCalculatorDirectorySection
        title="Stop Diluting Cap Tables for Early-Stage Hires"
        subtitle="Interactive Full-Time vs. Fractional Cost Savings Calculator and Filterable Non-Confidential Executive Directory."
        variant="varient_1"
        primaryColor="#D97706"
        isDark={true}
      />

      <FractionalCoreAdvisoryMatchFormSection
        title="Get Matched with a Vetted Executive in 48 Hours"
        subtitle="3-Step Curated Advisory Match Model and 15-Minute Partner Intake Form with Embedded Cal.com Slot Picker."
        variant="varient_1"
        primaryColor="#D97706"
        isDark={true}
      />

      <FractionalCoreProofSitemapFooterSection
        title="Trusted by General Partners & Series-A Founders"
        subtitle="Seed & Series-A VC Endorsements, 30-Second Founder Video Testimonials, and Multi-Page Marketplace Architecture."
        variant="varient_1"
        primaryColor="#D97706"
        isDark={true}
      />
    </div>
  );
};
