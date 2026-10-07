import React from 'react';
import DoctorNavbar from '../component/DoctorNavbar';
import DoctorHeroSection from '../component/DoctorHeroSection';
import DoctorAboutSection from '../component/DoctorAboutSection';
import DoctorServicesSection from '../component/DoctorServicesSection';
import DoctorCareJourneySection from '../component/DoctorCareJourneySection';
import DoctorAppointmentSection from '../component/DoctorAppointmentSection';
import DoctorFooter from '../component/DoctorFooter';
import { DoctorCanvaEditorProvider } from '../component/DoctorCanvaEditorContext';

export interface DoctorProfileLandingPageProps {
  isDark?: boolean;
  primaryColor?: string;
  accentTeal?: string;
}

/**
 * Full Doctor Profile Landing Page (Dr. Sarah Mitchell - Board Certified Physician)
 * With Canva-Style Live Inline Text Editing, Link URL Attachment & Image Upload
 * Organized inside src/website/doctor_profile/pages/DoctorProfileLandingPage.tsx
 */
export const DoctorProfileLandingPage: React.FC<DoctorProfileLandingPageProps> = ({
  isDark = false,
  primaryColor = '#1D2B6B',
  accentTeal = '#48B89F',
}) => {
  const scrollToSection = (id: 'home' | 'about' | 'services' | 'contact') => {
    if (typeof document === 'undefined') return;
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <DoctorCanvaEditorProvider>
      <div className={`@container w-full overflow-x-hidden ${isDark ? 'dark bg-[#0F1523] text-white' : 'bg-white text-[#1D2B6B]'}`}>
        <DoctorNavbar
          primaryColor={primaryColor}
          isDark={isDark}
          onNavigateSection={scrollToSection}
        />
        <DoctorHeroSection
          primaryColor={primaryColor}
          accentTeal={accentTeal}
          isDark={isDark}
          onBookAppointment={() => scrollToSection('contact')}
          onLearnMore={() => scrollToSection('about')}
        />
        <DoctorAboutSection
          primaryColor={primaryColor}
          accentTeal={accentTeal}
          isDark={isDark}
        />
        <DoctorServicesSection
          primaryColor={primaryColor}
          accentTeal={accentTeal}
          isDark={isDark}
        />
        <DoctorCareJourneySection
          primaryColor={primaryColor}
          accentTeal={accentTeal}
          isDark={isDark}
        />
        <DoctorAppointmentSection
          primaryColor={primaryColor}
          accentTeal={accentTeal}
          isDark={isDark}
        />
        <DoctorFooter primaryColor={primaryColor} isDark={isDark} />
      </div>
    </DoctorCanvaEditorProvider>
  );
};

export default DoctorProfileLandingPage;
