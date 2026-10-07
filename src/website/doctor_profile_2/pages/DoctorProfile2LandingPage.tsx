import React from 'react';
import Doctor2Navbar from '../component/Doctor2Navbar';
import Doctor2HeroSection from '../component/Doctor2HeroSection';
import Doctor2SpecializationsSection from '../component/Doctor2SpecializationsSection';
import Doctor2AboutSection from '../component/Doctor2AboutSection';
import Doctor2ReviewsSection from '../component/Doctor2ReviewsSection';
import Doctor2LocationSection from '../component/Doctor2LocationSection';
import Doctor2Footer from '../component/Doctor2Footer';
import { DoctorCanvaEditorProvider } from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface DoctorProfile2LandingPageProps {
  isDark?: boolean;
  primaryColor?: string;
  variant?: DoctorVariantId;
}

export const DoctorProfile2LandingPage: React.FC<DoctorProfile2LandingPageProps> = ({
  isDark = false,
  primaryColor = '#118C74',
  variant = 'varient_1',
}) => {
  return (
    <DoctorCanvaEditorProvider>
      <div className={`@container w-full overflow-x-hidden ${isDark ? 'dark bg-[#0B1320] text-white' : 'bg-white text-slate-900'}`}>
        <Doctor2Navbar variant={variant} primaryColor={primaryColor} isDark={isDark} />
        <Doctor2HeroSection variant={variant} primaryColor={primaryColor} isDark={isDark} />
        <Doctor2SpecializationsSection
          variant={variant}
          primaryColor={primaryColor}
          isDark={isDark}
        />
        <Doctor2AboutSection variant={variant} primaryColor={primaryColor} isDark={isDark} />
        <Doctor2ReviewsSection variant={variant} primaryColor={primaryColor} isDark={isDark} />
        <Doctor2LocationSection variant={variant} primaryColor={primaryColor} isDark={isDark} />
        <Doctor2Footer variant={variant} primaryColor={primaryColor} isDark={isDark} />
      </div>
    </DoctorCanvaEditorProvider>
  );
};

export default DoctorProfile2LandingPage;
