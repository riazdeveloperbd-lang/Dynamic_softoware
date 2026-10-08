import React from 'react';
import { ShiftPantryNavbar } from '../component/ShiftPantryNavbar';
import { ShiftPantryHeroHowItWorksSection } from '../component/ShiftPantryHeroHowItWorksSection';
import { ShiftPantryCalculatorSection } from '../component/ShiftPantryCalculatorSection';
import { ShiftPantryCuratedBoxesCheckoutSection } from '../component/ShiftPantryCuratedBoxesCheckoutSection';
import { ShiftPantryTestimonialsFooterSection } from '../component/ShiftPantryTestimonialsFooterSection';
import { WebsiteSectionVariantId } from '../../doctor_profile';

export interface ShiftPantryLandingPageProps {
  primaryColor?: string;
  isDark?: boolean;
  variant?: WebsiteSectionVariantId;
}

export const ShiftPantryLandingPage: React.FC<ShiftPantryLandingPageProps> = ({
  primaryColor = '#1B4332',
  isDark = false,
  variant = 'varient_1',
}) => {
  return (
    <div
      className={`min-h-screen ${
        isDark ? 'bg-[#121916] text-stone-100' : 'bg-[#FDFBF7] text-[#1F2937]'
      }`}
    >
      <ShiftPantryNavbar
        title="ShiftPantry"
        subtitle="Hybrid Office Pantry on Autopilot"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <ShiftPantryHeroHowItWorksSection
        title="The Hybrid Office Pantry, on Autopilot."
        subtitle="Curated healthy snack boxes, artisanal coffee, and pantry essentials delivered directly to your office. Zero manual runs, 100% automated."
        ctaText="Calculate Your Office Plan"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <ShiftPantryCalculatorSection
        title="Right-Size Your Pantry for Your Hybrid Schedule"
        subtitle="Slide your team headcount and in-office anchor days to calculate your exact monthly crate and specialty coffee volume."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <ShiftPantryCuratedBoxesCheckoutSection
        title="Curated Office Crates Built for Every Dietary Preference"
        subtitle="Click any box below to view its complete SKU manifest, macro breakdown, and allergen partitioning protocol—or add directly to your office subscription."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <ShiftPantryTestimonialsFooterSection
        title="10+ Hours Saved Monthly. Happier Hybrid Teams on Tue–Thu."
        subtitle="Click any office story below to inspect their exact monthly spend, hybrid attendance lift, and before/after breakroom transformation."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};
