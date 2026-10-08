import React from 'react';
import { LexChambersNavbar } from '../component/LexChambersNavbar';
import { LexChambersHeroPracticeSection } from '../component/LexChambersHeroPracticeSection';
import { LexChambersPrecedentsProcessSection } from '../component/LexChambersPrecedentsProcessSection';
import { LexChambersIntakeSchedulerSection } from '../component/LexChambersIntakeSchedulerSection';
import { LexChambersInsightsFaqFooterSection } from '../component/LexChambersInsightsFaqFooterSection';
import { WebsiteSectionVariantId } from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface LexChambersLandingPageProps {
  primaryColor?: string;
  isDark?: boolean;
  variant?: WebsiteSectionVariantId;
}

export const LexChambersLandingPage: React.FC<LexChambersLandingPageProps> = ({
  primaryColor = '#D97706',
  isDark = false,
  variant = 'varient_1',
}) => {
  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-[#090E1A] text-white' : 'bg-[#F8FAFC] text-[#1E2937]'}`}>
      <LexChambersNavbar
        title="LexChambers & Associates"
        subtitle="Supreme Court of Bangladesh (Appellate & High Court Divisions) · Corporate & Tax Chambers"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />

      <LexChambersHeroPracticeSection
        title="Strategic Legal Representation. Uncompromising Integrity."
        subtitle="Providing high-stakes corporate legal counsel, Supreme Court & High Court advocacy, regulatory compliance, and NBR tax advisory services across Bangladesh and international jurisdictions."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />

      <LexChambersPrecedentsProcessSection
        title="Notable Case Precedents, High Court Writs & Corporate Closings"
        subtitle="Anonymized track record of constitutional writ petitions, cross-border M&A joint ventures, Taxes Appellate Tribunal victories, and BIAC/SIAC arbitrations."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />

      <LexChambersIntakeSchedulerSection
        title="Confidential Matter Evaluation & Chamber Consultation Booking"
        subtitle="Submit your case brief and preliminary documents under Section 126 Evidence Act privilege, run an instant conflict check, and reserve a private chamber or encrypted video slot."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />

      <LexChambersInsightsFaqFooterSection
        title="Legal Insights, Finance Act Tax Briefs & Statutory Checklists"
        subtitle="Download complimentary 2026 corporate tax checklists, RJSC incorporation guides, and 30-year Dhaka property title vetting SOPs prepared by our Partners."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};
