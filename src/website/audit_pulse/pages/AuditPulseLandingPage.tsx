import React from 'react';
import { AuditPulseNavbar } from '../component/AuditPulseNavbar';
import { AuditPulseHeroSection } from '../component/AuditPulseHeroSection';
import { AuditPulseEstimatorBreakdownSection } from '../component/AuditPulseEstimatorBreakdownSection';
import { AuditPulseSecurityProcessBookingSection } from '../component/AuditPulseSecurityProcessBookingSection';
import { AuditPulsePricingFooterSection } from '../component/AuditPulsePricingFooterSection';

export const AuditPulseLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0E17] text-[#F9FAFB]">
      <AuditPulseNavbar
        title="AuditPulse"
        subtitle="B2B SaaS License & Tool Waste Optimization Platform"
        variant="varient_1"
        primaryColor="#10B981"
        isDark={true}
      />
      <AuditPulseHeroSection
        title="Stop Paying for Ghost SaaS Licenses & Unused Seats."
        subtitle="AuditPulse scans your Google Workspace, Microsoft 365, Slack, and Zoom stacks to uncover inactive seats and duplicate subscriptions in under 24 hours."
        variant="varient_1"
        primaryColor="#10B981"
        isDark={true}
      />
      <AuditPulseEstimatorBreakdownSection
        title="How Much SaaS Spend Are You Wasting Each Year?"
        subtitle="Interactive SaaS Waste Estimator & Granular Seat Breakdown"
        variant="varient_1"
        primaryColor="#10B981"
        isDark={true}
      />
      <AuditPulseSecurityProcessBookingSection
        primaryColor="#10B981"
        isDark={true}
      />
      <AuditPulsePricingFooterSection
        title="Transparent Performance Pricing. Zero Retainers."
        subtitle="If we find zero waste, you pay $0 and get a free clean bill of health report."
        variant="varient_1"
        primaryColor="#10B981"
        isDark={true}
      />
    </div>
  );
};
