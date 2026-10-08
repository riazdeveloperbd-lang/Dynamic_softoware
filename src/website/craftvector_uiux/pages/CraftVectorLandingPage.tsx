import React, { useState } from 'react';
import { CraftVectorNavbar } from '../component/CraftVectorNavbar';
import { CraftVectorHeroCaseStudiesSection } from '../component/CraftVectorHeroCaseStudiesSection';
import { CraftVectorPlaygroundProcessSection } from '../component/CraftVectorPlaygroundProcessSection';
import { CraftVectorEngagementScopeIntakeSection } from '../component/CraftVectorEngagementScopeIntakeSection';
import { CraftVectorEndorsementsFaqFooterSection } from '../component/CraftVectorEndorsementsFaqFooterSection';

export interface CraftVectorLandingPageProps {
  primaryColor?: string;
  defaultDark?: boolean;
}

export const CraftVectorLandingPage: React.FC<CraftVectorLandingPageProps> = ({
  primaryColor = '#6366F1',
  defaultDark = true,
}) => {
  const [isDark, setIsDark] = useState<boolean>(defaultDark);

  const activePrimary = primaryColor || (isDark ? '#6366F1' : '#4F46E5');

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? 'bg-[#09090B] text-[#FAFAFA]' : 'bg-white text-[#09090B]'
      }`}
    >
      <CraftVectorNavbar
        title="CRAFTVECTOR // RAFIQ ARMAN"
        subtitle="Staff UI/UX & Digital Product Designer · B2B SaaS, Fintech & Design Systems"
        variant="varient_1"
        primaryColor={activePrimary}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      <CraftVectorHeroCaseStudiesSection
        title="Designing Scalable Digital Products with Uncompromising Craft."
        subtitle="Senior UI/UX & Product Designer specializing in B2B SaaS platforms, complex design systems, and high-converting web/mobile applications from 0→1 to enterprise scale."
        variant="varient_1"
        primaryColor={activePrimary}
        isDark={isDark}
      />

      <CraftVectorPlaygroundProcessSection
        title="Interactive Component Playground & Design System Sandbox."
        subtitle="Test live keyboard-first command palettes, W3C design token radius math, and stateful SaaS pricing primitives before inspecting the 4-step engineering handoff workflow."
        variant="varient_1"
        primaryColor={activePrimary}
        isDark={isDark}
      />

      <CraftVectorEngagementScopeIntakeSection
        title="Flexible Product Design & Systems Partnerships."
        subtitle="Whether you need a rapid 0→1 YC MVP sprint, an embedded monthly design systems partner, or a full-time Staff Product Designer—configure your scope below."
        variant="varient_1"
        primaryColor={activePrimary}
        isDark={isDark}
      />

      <CraftVectorEndorsementsFaqFooterSection
        title="Trusted by Y Combinator Founders & Series B Engineering Leaders."
        subtitle="Verified outcomes across activation funnels, developer observability tools, and multi-brand Figma + React design systems."
        variant="varient_1"
        primaryColor={activePrimary}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />
    </div>
  );
};
