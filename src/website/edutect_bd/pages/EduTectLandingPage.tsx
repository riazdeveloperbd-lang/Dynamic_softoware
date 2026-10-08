import React from 'react';
import { EduTectNavbar } from '../component/EduTectNavbar';
import { EduTectHeroCredentialsSection } from '../component/EduTectHeroCredentialsSection';
import { EduTectCurriculumDemoSection } from '../component/EduTectCurriculumDemoSection';
import { EduTectSuccessProofSection } from '../component/EduTectSuccessProofSection';
import { EduTectPricingEnrollmentFaqFooterSection } from '../component/EduTectPricingEnrollmentFaqFooterSection';
import { WebsiteSectionVariantId } from '../../doctor_profile';

export interface EduTectLandingPageProps {
  primaryColor?: string;
  isDark?: boolean;
  variant?: WebsiteSectionVariantId;
}

export const EduTectLandingPage: React.FC<EduTectLandingPageProps> = ({
  primaryColor = '#2563EB',
  isDark = false,
  variant = 'varient_1',
}) => {
  return (
    <div
      className={`min-h-screen ${
        isDark ? 'bg-[#0F0E26] text-slate-100' : 'bg-white text-[#1E1B4B]'
      }`}
    >
      <EduTectNavbar
        title="EduTect BD"
        subtitle="Bangladesh's Top-Rated Exam & Skill Mentorship Portal"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <EduTectHeroCredentialsSection
        title="Master IELTS, BCS & Tech Skills with Bangladesh's Top-Rated Mentor."
        subtitle="Join 15,000+ successful students. Comprehensive batch coaching, live classes, recorded modules, and exam-tested resources."
        ctaText="Enroll in Next Batch"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <EduTectCurriculumDemoSection
        title="Structured Exam-Tested Syllabus & Free HD Demo Lessons"
        subtitle="Expand any module below to inspect Bangla + English lesson topics, PDF lecture sheets, and click 'Free Preview' to launch the interactive HD video player."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <EduTectSuccessProofSection
        title="Real IELTS Band 8.0+ Scorecards, BCS Cadres & Verified Batch Reviews"
        subtitle="Filter by High Scorers, Video Feedback, or Official Scorecard Screenshots—and click any card to inspect the full verified TRF result sheet."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <EduTectPricingEnrollmentFaqFooterSection
        title="Choose Your Learning Track & Complete 2-Minute bKash/Nagad Enrollment"
        subtitle="Click any tier card to inspect full batch deliverables, or complete the 2-step checkout below for instant SMS access to our private Telegram group and student portal."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};
