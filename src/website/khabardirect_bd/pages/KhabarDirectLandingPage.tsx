import React from 'react';
import { KhabarDirectNavbar } from '../component/KhabarDirectNavbar';
import { KhabarDirectHeroZoneSection } from '../component/KhabarDirectHeroZoneSection';
import { KhabarDirectTabbedMenuSection } from '../component/KhabarDirectTabbedMenuSection';
import { KhabarDirectCheckoutMfsSection } from '../component/KhabarDirectCheckoutMfsSection';
import { KhabarDirectTrustHygieneFooterSection } from '../component/KhabarDirectTrustHygieneFooterSection';

export interface KhabarDirectLandingPageProps {
  primaryColor?: string;
  isDark?: boolean;
}

export const KhabarDirectLandingPage: React.FC<KhabarDirectLandingPageProps> = ({
  primaryColor = '#E11D48',
  isDark = false,
}) => {
  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] text-zinc-900 font-sans antialiased">
      <KhabarDirectNavbar
        title="KhabarDirect BD"
        subtitle="Zero 28% aggregator markup · Direct thermal rider dispatch across Dhaka & Chattogram"
        variant="varient_1"
        primaryColor={primaryColor}
        isDark={isDark}
      />

      <KhabarDirectHeroZoneSection
        title="Fresh Hot Meals, Direct to Your Door."
        subtitle="Order directly from Smokey Ember Kitchen & Artisan Bakery for exclusive menu combos, faster thermal-sealed delivery, and zero 28% third-party app markups."
        variant="varient_1"
        primaryColor={primaryColor}
        isDark={isDark}
      />

      <KhabarDirectTabbedMenuSection
        title="Explore Our Direct Cloud Kitchen & Bakery Menu"
        subtitle="Click any dish to customize patty sizes, spice levels, and add-ons with instant BDT pricing."
        variant="varient_1"
        primaryColor={primaryColor}
        isDark={isDark}
      />

      <KhabarDirectCheckoutMfsSection
        title="Direct Order Checkout, MFS Gateway & Live Rider Tracking"
        subtitle="Complete your order in under 30 seconds with +880 OTP auto-fill, exact-change Cash on Delivery, or instant bKash/Nagad merchant QR."
        variant="varient_1"
        primaryColor={primaryColor}
        isDark={isDark}
      />

      <KhabarDirectTrustHygieneFooterSection
        title="Inside Our Certified Cloud Kitchens & 30–45 Min Delivery Promise"
        subtitle="Every order is cooked fresh, sealed with a tamper-evident thermal strip, and delivered by our dedicated rider fleet."
        variant="varient_1"
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};
