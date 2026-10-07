import React from 'react';
import { DoctorCanvaEditorProvider } from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import { StoreEcommerceProvider } from '../../store_website/component/StoreEcommerceContext';
import StoreAdminNavbar from '../component/StoreAdminNavbar';
import StoreAdminHeroOverviewSection from '../component/StoreAdminHeroOverviewSection';
import StoreAdminPagesRouterSection from '../component/StoreAdminPagesRouterSection';
import StoreAdminFooter from '../component/StoreAdminFooter';

export interface StoreAdminWebsiteLandingPageProps {
  isDark?: boolean;
  primaryColor?: string;
  variant?: DoctorVariantId;
}

export const StoreAdminWebsiteLandingPage: React.FC<
  StoreAdminWebsiteLandingPageProps
> = ({
  isDark = false,
  primaryColor = '#F37021',
  variant = 'varient_1',
}) => {
  return (
    <DoctorCanvaEditorProvider>
      <StoreEcommerceProvider>
        <div
          className={`@container w-full overflow-x-hidden ${
            isDark ? 'dark bg-[#0F141C] text-white' : 'bg-white text-slate-900'
          }`}
        >
          <StoreAdminNavbar
            variant={variant}
            primaryColor={primaryColor}
            isDark={isDark}
          />
          <StoreAdminHeroOverviewSection
            variant={variant}
            primaryColor={primaryColor}
            isDark={isDark}
          />
          <StoreAdminPagesRouterSection
            variant={variant}
            primaryColor={primaryColor}
            isDark={isDark}
          />
          <StoreAdminFooter
            variant={variant}
            primaryColor={primaryColor}
            isDark={isDark}
          />
        </div>
      </StoreEcommerceProvider>
    </DoctorCanvaEditorProvider>
  );
};

export default StoreAdminWebsiteLandingPage;
