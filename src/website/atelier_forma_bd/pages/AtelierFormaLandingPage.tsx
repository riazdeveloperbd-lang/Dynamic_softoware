import React from 'react';
import { AtelierFormaNavbar } from '../component/AtelierFormaNavbar';
import { AtelierFormaHeroMasonrySection } from '../component/AtelierFormaHeroMasonrySection';
import { AtelierFormaBeforeAfterServicesSection } from '../component/AtelierFormaBeforeAfterServicesSection';
import { AtelierFormaCostEstimatorIntakeSection } from '../component/AtelierFormaCostEstimatorIntakeSection';
import { AtelierFormaMaterialityTestimonialsFooterSection } from '../component/AtelierFormaMaterialityTestimonialsFooterSection';
import { WebsiteSectionVariantId } from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface AtelierFormaLandingPageProps {
  variant?: WebsiteSectionVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const AtelierFormaLandingPage: React.FC<AtelierFormaLandingPageProps> = ({
  variant = 'varient_1',
  primaryColor = '#B8860B',
  isDark = false,
}) => {
  return (
    <div
      className={`min-h-screen w-full ${
        isDark ? 'bg-[#121212] text-[#F9F9F9]' : 'bg-[#F9F9F9] text-[#121212]'
      }`}
    >
      <AtelierFormaNavbar
        title="ATELIER FORMA"
        subtitle="Architectural Design, Bespoke Interiors & 4K/VR Spatial Visualization · Dhaka & Chattogram"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />

      <AtelierFormaHeroMasonrySection
        title="Architectural Clarity. Sculpted Living Spaces."
        subtitle="Full-service architectural design, interior transformation, and 3D spatial visualization for residential apartments, luxury duplexes, and commercial spaces."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />

      <AtelierFormaBeforeAfterServicesSection
        title="From Raw Brick & 3D Wireframes to Tactile Reality."
        subtitle="Drag the interactive split-screen slider to compare raw civil site conditions and 3ds Max clay geometry against our photorealistic 4K Corona renders and handed-over interiors."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />

      <AtelierFormaCostEstimatorIntakeSection
        title="Project Cost & Scope Estimator."
        subtitle="Configure your space typology, square footage, execution scope, and material tier for an instant 2026 Dhaka/Chattogram budget & timeline projection."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />

      <AtelierFormaMaterialityTestimonialsFooterSection
        title="Quiet Proportion, Tropical Light & Honest Materiality."
        subtitle="Led by Principal Architect Ar. Zafar Mahmood (IAB), our studio pairs architectural rigor with an in-house 18,000 sq. ft. CNC joinery and stone atelier."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};
