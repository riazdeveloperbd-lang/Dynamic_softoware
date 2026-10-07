import React from 'react';
import { NexusNavbar } from '../component/NexusNavbar';
import { NexusHeroSection } from '../component/NexusHeroSection';
import { NexusRoiCaseStudiesSection } from '../component/NexusRoiCaseStudiesSection';
import { NexusSolutionsBookingSection } from '../component/NexusSolutionsBookingSection';
import { NexusTestimonialsFooterSection } from '../component/NexusTestimonialsFooterSection';

export interface NexusGrowthLabLandingPageProps {
  primaryColor?: string;
  isDark?: boolean;
}

export const NexusGrowthLabLandingPage: React.FC<
  NexusGrowthLabLandingPageProps
> = ({ primaryColor = '#2563EB', isDark = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-[#F9FAFB]">
      <NexusNavbar primaryColor={primaryColor} isDark={isDark} />
      <main className="flex-1">
        <NexusHeroSection primaryColor={primaryColor} isDark={isDark} />
        <NexusRoiCaseStudiesSection
          primaryColor={primaryColor}
          isDark={isDark}
        />
        <NexusSolutionsBookingSection
          primaryColor={primaryColor}
          isDark={isDark}
        />
      </main>
      <NexusTestimonialsFooterSection
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};

export default NexusGrowthLabLandingPage;
