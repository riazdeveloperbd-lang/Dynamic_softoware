import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface OffersVarient1Props {
  variant?: BookStoreVariantId;
  onBack: () => void;
}

export const OffersVarient1: React.FC<OffersVarient1Props> = ({
  variant = 'varient_1',
  onBack,
}) => {
  const { palette, activeFont, coupons } = useBookStoreDesignSystem();
  const scopeStyle = getBookStoreThemeScopeStyle(palette, activeFont);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, code: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1600);
  };

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
      {/* Top Bar (9.7 Offers.png) */}
      <div className="flex items-center justify-between py-2.5 mb-2">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center -ml-1.5"
          style={{ color: palette.textPrimary }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-[18px] font-bold tracking-tight" style={{ fontFamily: activeFont.headingFont }}>
          Order History
        </h1>
        <div className="w-9" />
      </div>

      <p className="text-[15px] font-bold mb-4" style={{ color: palette.textSecondary }}>
        You Have {coupons.length} Copons to use
      </p>

      {/* 2-Column Perforated Ticket Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {coupons.map((c) => {
          const isCopied = copiedId === c.id;
          return (
            <div
              key={c.id}
              style={{ backgroundColor: c.bgColor }}
              className="rounded-2xl p-4 flex flex-col items-center justify-between h-40 relative overflow-hidden text-white shadow-sm"
            >
              {/* Left & Right Ticket Cutouts */}
              <span
                className="w-5 h-5 rounded-full absolute -left-2.5 top-1/2 -translate-y-1/2"
                style={{ backgroundColor: palette.background }}
              />
              <span
                className="w-5 h-5 rounded-full absolute -right-2.5 top-1/2 -translate-y-1/2"
                style={{ backgroundColor: palette.background }}
              />

              <div className="text-[26px] font-extrabold leading-tight text-center whitespace-pre-line mt-1">
                {c.discountText}
              </div>

              <button
                onClick={() => handleCopy(c.id, c.code)}
                className="px-5 py-1.5 rounded-full bg-white text-[12px] font-bold flex items-center gap-1 shadow-sm"
                style={{ color: c.textColor }}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied
                  </>
                ) : (
                  'Copy'
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OffersVarient1;
