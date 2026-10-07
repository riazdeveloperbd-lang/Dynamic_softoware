import React from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface NotificationDetailVarient1Props {
  variant?: BookStoreVariantId;
  onBack: () => void;
}

export const NotificationDetailVarient1: React.FC<NotificationDetailVarient1Props> = ({
  variant = 'varient_1',
  onBack,
}) => {
  const { palette, activeFont, books } = useBookStoreDesignSystem();
  const scopeStyle = getBookStoreThemeScopeStyle(palette, activeFont);
  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  return (
    <div
      style={{
        ...scopeStyle,
        backgroundColor: palette.background,
        color: palette.textPrimary,
        fontFamily: activeFont.fontFamily,
      }}
      className="min-h-full flex flex-col px-6 pt-3 pb-8"
    >
      {/* Top Bar (8.2 Detail News & Promo.png) */}
      <div className="flex items-center justify-between py-2.5 mb-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center -ml-1.5"
          style={{ color: palette.textPrimary }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-[18px] font-bold tracking-tight" style={{ fontFamily: activeFont.headingFont }}>
          Promotion
        </h1>
        <div className="w-9" />
      </div>

      {/* Promo Hero Banner */}
      <div
        className="rounded-2xl p-4 flex items-center justify-between mb-6"
        style={{ backgroundColor: palette.primarySoft }}
      >
        <div className="space-y-1.5">
          <h3 className="text-[17px] font-bold" style={{ color: palette.textPrimary }}>
            50% Discount
            <br />
            On All Desert
          </h3>
          <p className="text-[12px]" style={{ color: palette.primary }}>
            Grab it now!
          </p>
          <span
            className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold mt-1"
            style={{ backgroundColor: palette.primary, color: palette.primaryText }}
          >
            Order Now
          </span>
        </div>
        <div className="w-24 h-28 rounded-xl overflow-hidden shadow-md flex-shrink-0">
          <img
            src={books[0]?.coverImage}
            alt="Promo Book"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Editorial Body Copy */}
      <h2 className="text-[17px] font-bold mb-1">
        Today 50% discount on all Books in Novel category with online orders worldwide.
      </h2>
      <p className="text-[12px] mb-4" style={{ color: palette.textSecondary }}>
        Excuse me... Who could ever resist a discount feast? 👀
      </p>
      <p className="text-[13px] leading-relaxed mb-4" style={{ color: palette.textSecondary }}>
        Hear me out. Today, October 21, 2021, Chapter has a 50% discount for any product. What are you waiting for, let's order now before it runs out.
      </p>
      <p className="text-[13px] leading-relaxed mb-4" style={{ color: palette.textSecondary }}>
        All of the products are discounted, just order through the chapter app to enjoy this discount. From the best to the best we have prepared for you, may you always be happy when ordering at chapter. Please choose the best book you want.
      </p>
      <p className="text-[13px] leading-relaxed" style={{ color: palette.textSecondary }}>
        So, what's your call? Let's roll, order your comfort book now 😉
      </p>
    </div>
  );
};

export default NotificationDetailVarient1;
