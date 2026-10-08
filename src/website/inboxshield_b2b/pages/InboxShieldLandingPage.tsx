import React from 'react';
import { InboxShieldNavbar } from '../component/InboxShieldNavbar';
import { InboxShieldHeroRiskGraderSection } from '../component/InboxShieldHeroRiskGraderSection';
import { InboxShieldPainSliderSection } from '../component/InboxShieldPainSliderSection';
import { InboxShieldPricingCheckoutSection } from '../component/InboxShieldPricingCheckoutSection';
import { InboxShieldFaqFooterSection } from '../component/InboxShieldFaqFooterSection';
import { WebsiteSectionVariantId } from '../../doctor_profile';

export interface InboxShieldLandingPageProps {
  primaryColor?: string;
  isDark?: boolean;
  variant?: WebsiteSectionVariantId;
}

export const InboxShieldLandingPage: React.FC<InboxShieldLandingPageProps> = ({
  primaryColor = '#10B981',
  isDark = true,
  variant = 'varient_1',
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0F172A] text-[#F8FAFC]">
      <InboxShieldNavbar
        title="InboxShield"
        subtitle="B2B Email Infrastructure & Deliverability Studio · SPF · DKIM · DMARC · 24/7 Blacklist Defense"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <InboxShieldHeroRiskGraderSection
        title="Stop Landing in Spam. Own Your Inbox Deliverability."
        subtitle="Done-for-you cold email infrastructure, DNS authentication (SPF, DKIM, DMARC), domain warmup, and proactive spam repair for B2B sales teams."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <InboxShieldPainSliderSection
        title="Why 65% of B2B Cold Emails Land in Spam — And How We Engineer 98% Primary Inbox Placement"
        subtitle="Compare an unoptimized DIY outbound setup against the productized InboxShield infrastructure method, then drag the Before/After slider to inspect real open-rate and pipeline recovery telemetry."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <InboxShieldPricingCheckoutSection
        title="Transparent, Productized Pricing. Built for B2B Outbound Scale."
        subtitle="Choose a one-time infrastructure buildout ($499) or continuous 24/7 deliverability monitoring ($199/mo) with instant Stripe/Paddle checkout and zero-password DNS onboarding."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <InboxShieldFaqFooterSection
        title="Technical Questions from RevOps, Founders & Outbound Agencies"
        subtitle="Everything you need to know about secondary domain isolation, 14-day warmup timelines, blacklist delisting, and zero-password DNS delegation."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};
