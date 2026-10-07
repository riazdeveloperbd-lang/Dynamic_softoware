import React from 'react';
import { TeacherNavbar } from '../component/TeacherNavbar';
import { TeacherHeroSection } from '../component/TeacherHeroSection';
import { TeacherAboutVideoCredentialsSection } from '../component/TeacherAboutVideoCredentialsSection';
import { TeacherServicesPricingSection } from '../component/TeacherServicesPricingSection';
import { TeacherReviewsFaqSection } from '../component/TeacherReviewsFaqSection';
import { TeacherBookingContactSection } from '../component/TeacherBookingContactSection';
import { TeacherFooter } from '../component/TeacherFooter';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface TeacherProfileLandingPageProps {
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const TeacherProfileLandingPage: React.FC<
  TeacherProfileLandingPageProps
> = ({
  variant = 'varient_1',
  primaryColor = '#2563EB',
  isDark = false,
}) => {
  return (
    <div className={isDark ? 'dark bg-[#0B0F19] text-white' : 'bg-[#F8FAFC] text-slate-900'}>
      <TeacherNavbar
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <TeacherHeroSection
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <TeacherAboutVideoCredentialsSection
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <TeacherServicesPricingSection
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <TeacherReviewsFaqSection
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <TeacherBookingContactSection
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <TeacherFooter
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};

export default TeacherProfileLandingPage;
