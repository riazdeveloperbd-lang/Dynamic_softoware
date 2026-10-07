import React from 'react';
import { VerdantNavbar } from '../component/VerdantNavbar';
import { VerdantHeroSection } from '../component/VerdantHeroSection';
import { VerdantEstimatorPortfolioSection } from '../component/VerdantEstimatorPortfolioSection';
import { VerdantPackagesCoverageBookingSection } from '../component/VerdantPackagesCoverageBookingSection';
import { VerdantFaqFooterSection } from '../component/VerdantFaqFooterSection';

export const VerdantSpacesLandingPage: React.FC = () => {
  const primaryColor = '#2C4A3E';

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1F2421] antialiased selection:bg-[#2C4A3E] selection:text-[#F4F1EA]">
      <VerdantNavbar
        title="Verdant Spaces"
        subtitle="Biophilic Urban Architecture & Sustainable Landscape Engineering"
        variant="varient_1"
        primaryColor={primaryColor}
      />
      <VerdantHeroSection
        title="Transform Urban Concrete into Living Sanctuaries."
        subtitle="Architectural landscape design engineered with 100% native plants, smart water management, and zero-emissions maintenance."
        variant="varient_1"
        primaryColor={primaryColor}
      />
      <VerdantEstimatorPortfolioSection
        title="Calculate Your Urban Transformation"
        subtitle="Configure your space type, square footage, and sustainable add-on systems for an instant turnkey estimate and water-savings projection."
        variant="varient_1"
        primaryColor={primaryColor}
      />
      <VerdantPackagesCoverageBookingSection
        title="Service Packages & Seasonal Maintenance Plans"
        subtitle="Turnkey architectural installations, interactive Tri-State zip code coverage checker, and on-site consultation scheduling."
        variant="varient_1"
        primaryColor={primaryColor}
      />
      <VerdantFaqFooterSection
        title="Verdant Spaces"
        subtitle="Biophilic urban architecture and sustainable landscape engineering studio."
        variant="varient_1"
        primaryColor={primaryColor}
      />
    </div>
  );
};

export default VerdantSpacesLandingPage;
