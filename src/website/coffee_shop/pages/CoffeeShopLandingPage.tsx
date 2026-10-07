import React from 'react';
import { CoffeeShopProvider } from '../component/CoffeeShopContext';
import { CoffeeNavbar } from '../component/CoffeeNavbar';
import { CoffeeHeroSection } from '../component/CoffeeHeroSection';
import { CoffeeSubscriptionSection } from '../component/CoffeeSubscriptionSection';
import { CoffeeSeasonalMenuSection } from '../component/CoffeeSeasonalMenuSection';
import { CoffeeLocationsWholesaleStorySection } from '../component/CoffeeLocationsWholesaleStorySection';
import { CoffeeFooter } from '../component/CoffeeFooter';

export interface CoffeeShopLandingPageProps {
  primaryColor?: string;
  isDark?: boolean;
}

export const CoffeeShopLandingPage: React.FC<CoffeeShopLandingPageProps> = ({
  primaryColor = '#C86D51',
  isDark = false,
}) => {
  return (
    <CoffeeShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1B1212]">
        <CoffeeNavbar primaryColor={primaryColor} isDark={isDark} />
        <main className="flex-1">
          <CoffeeHeroSection primaryColor={primaryColor} isDark={isDark} />
          <CoffeeSubscriptionSection
            primaryColor={primaryColor}
            isDark={isDark}
          />
          <CoffeeSeasonalMenuSection
            primaryColor={primaryColor}
            isDark={isDark}
          />
          <CoffeeLocationsWholesaleStorySection
            primaryColor={primaryColor}
            isDark={isDark}
          />
        </main>
        <CoffeeFooter primaryColor={primaryColor} isDark={isDark} />
      </div>
    </CoffeeShopProvider>
  );
};

export default CoffeeShopLandingPage;
