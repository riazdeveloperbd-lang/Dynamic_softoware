import React from 'react';
import { DoctorCanvaEditorProvider } from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import { StoreEcommerceProvider } from '../component/StoreEcommerceContext';
import StoreNavbar from '../component/StoreNavbar';
import StoreHeroSection from '../component/StoreHeroSection';
import StoreCatalogSection from '../component/StoreCatalogSection';
import StorePagesRouterSection from '../component/StorePagesRouterSection';
import StoreFooter from '../component/StoreFooter';

export interface StoreWebsiteLandingPageProps {
  isDark?: boolean;
  primaryColor?: string;
  variant?: DoctorVariantId;
}

export const StoreWebsiteLandingPage: React.FC<StoreWebsiteLandingPageProps> = ({
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
          <StoreNavbar variant={variant} primaryColor={primaryColor} isDark={isDark} />
          <StoreHeroSection variant={variant} primaryColor={primaryColor} isDark={isDark} />
          <StoreCatalogSection variant={variant} primaryColor={primaryColor} isDark={isDark} />
          <StorePagesRouterSection variant={variant} primaryColor={primaryColor} isDark={isDark} />
          <StoreFooter variant={variant} primaryColor={primaryColor} isDark={isDark} />
        </div>
      </StoreEcommerceProvider>
    </DoctorCanvaEditorProvider>
  );
};

export default StoreWebsiteLandingPage;
