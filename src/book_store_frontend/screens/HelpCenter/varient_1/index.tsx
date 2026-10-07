import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, CheckCircle2 } from 'lucide-react';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface HelpCenterVarient1Props {
  variant?: BookStoreVariantId;
  onBack: () => void;
}

export const HelpCenterVarient1: React.FC<HelpCenterVarient1Props> = ({
  variant = 'varient_1',
  onBack,
}) => {
  const { palette, activeFont } = useBookStoreDesignSystem();
  const scopeStyle = getBookStoreThemeScopeStyle(palette, activeFont);
  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  const [selectedChannel, setSelectedChannel] = useState<'email' | 'phone' | null>('email');

  return (
    <div
      style={{
        ...scopeStyle,
        backgroundColor: palette.background,
        color: palette.textPrimary,
        fontFamily: activeFont.fontFamily,
      }}
      className="min-h-full flex flex-col"
    >
      {/* Top Solid Primary Header (9.5 Help Center.png) */}
      <div
        className="px-6 pt-4 pb-8 text-white"
        style={{ backgroundColor: palette.primary }}
      >
        <div className="flex items-center justify-between py-2 mb-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center -ml-1.5 text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[18px] font-bold tracking-tight" style={{ fontFamily: activeFont.headingFont }}>
            Help Center
          </h1>
          <div className="w-9" />
        </div>

        <h2 className="text-[22px] font-bold text-center mt-1">Help Center</h2>
        <p className="text-[13px] text-center opacity-80 mt-1">
          Tell us how we can help 👋
          <br />
          Chapter are standing by for service & support!
        </p>
      </div>

      {/* Contact Cards */}
      <div className="px-6 pt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3.5">
          <button
            onClick={() => setSelectedChannel('email')}
            className="p-4 rounded-2xl border text-left space-y-2 transition-all"
            style={{
              backgroundColor: palette.surface,
              borderColor: selectedChannel === 'email' ? palette.primary : palette.border,
            }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: palette.cardBackground, color: palette.primary }}
            >
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[14px] font-bold">Email</h3>
              <p className="text-[12px] mt-0.5" style={{ color: palette.textSecondary }}>
                Send to your email
              </p>
            </div>
          </button>

          <button
            onClick={() => setSelectedChannel('phone')}
            className="p-4 rounded-2xl border text-left space-y-2 transition-all"
            style={{
              backgroundColor: palette.surface,
              borderColor: selectedChannel === 'phone' ? palette.primary : palette.border,
            }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: palette.cardBackground, color: palette.primary }}
            >
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[14px] font-bold">Phone Number</h3>
              <p className="text-[12px] mt-0.5" style={{ color: palette.textSecondary }}>
                Send to your phone
              </p>
            </div>
          </button>
        </div>

        {selectedChannel && (
          <div
            className="p-4 rounded-2xl border flex items-center gap-3"
            style={{ borderColor: palette.border, backgroundColor: palette.primarySoft }}
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: palette.primary }} />
            <p className="text-[12px]" style={{ color: palette.textPrimary }}>
              {selectedChannel === 'email'
                ? 'Support ticket link sent to Johndoe@email.com'
                : 'Our book concierge will call (+1) 234 567 890 shortly.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpCenterVarient1;
