import React from 'react';
import { EduTeactStudentNavbar } from '../component/EduTeactStudentNavbar';
import { EduTeactStudentOverviewWorkspaceSection } from '../component/EduTeactStudentOverviewWorkspaceSection';
import { EduTeactStudentCoursePlayerSection } from '../component/EduTeactStudentCoursePlayerSection';
import { EduTeactStudentExamsResourcesSection } from '../component/EduTeactStudentExamsResourcesSection';
import { EduTeactStudentCommunityCertificateFooterSection } from '../component/EduTeactStudentCommunityCertificateFooterSection';

export interface EduTeactStudentLandingPageProps {
  primaryColor?: string;
  isDark?: boolean;
}

export const EduTeactStudentLandingPage: React.FC<
  EduTeactStudentLandingPageProps
> = ({ primaryColor = '#4F46E5', isDark = false }) => {
  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      <EduTeactStudentOverviewWorkspaceSection
        title="Welcome back, Tasnim Mahi 👋"
        subtitle="আপনার আজকের লার্নিং টার্গেট: রাইটিং টাস্ক ২ লাইভ ক্লাসে অংশ নেওয়া এবং মক টেস্ট ০৭ সম্পন্ন করা।"
        variant="varient_1"
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};

export default EduTeactStudentLandingPage;
