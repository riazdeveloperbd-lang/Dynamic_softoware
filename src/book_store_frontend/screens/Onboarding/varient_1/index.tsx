import React, { useState } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface OnboardingVarient1Props {
  variant?: BookStoreVariantId;
  onOpenSignIn?: () => void;
  onSignIn?: () => void;
  onGetStarted?: () => void;
  onTriggerToast?: (msg: string) => void;
}

export const OnboardingVarient1: React.FC<OnboardingVarient1Props> = ({
  variant = 'varient_1',
  onOpenSignIn,
  onSignIn,
  onGetStarted,
  onTriggerToast,
}) => {
  const { palette, activeFont, isDark, colorPresetId } =
    useBookStoreDesignSystem();
  const cardStyle = getBookStoreVariantCardStyle(variant, palette);
  const [stepIndex, setStepIndex] = useState<number>(1); // 0 = Splash, 1 = Slide 1, 2 = Slide 2, 3 = Slide 3

  const slides = [
    {
      title: 'Now reading books\nwill be easier',
      subtitle:
        'Discover new worlds, join a vibrant reading community. Start your reading adventure effortlessly with us.',
      buttonText: 'Continue',
      illustrationType: 'glasses',
    },
    {
      title: 'Your Bookish Soulmate\nAwaits',
      subtitle:
        'Let us be your guide to the perfect read. Discover books tailored to your tastes for a truly rewarding experience.',
      buttonText: 'Get Started',
      illustrationType: 'manual',
    },
    {
      title: 'Start Your Adventure',
      subtitle:
        "Ready to embark on a quest for inspiration and knowledge? Your adventure begins now. Let's go!",
      buttonText: 'Get Started',
      illustrationType: 'tree',
    },
  ];

  // Step 0: Bazar Splash Screen (Exact Image 1. Spash Screen.png)
  if (stepIndex === 0) {
    return (
      <div
        onClick={() => setStepIndex(1)}
        className="bookstore-theme-scope min-h-[640px] h-full w-full flex flex-col items-center justify-center relative overflow-hidden px-6 select-none cursor-pointer"
        style={{
          ...getBookStoreThemeScopeStyle(palette, activeFont),
          backgroundColor: palette.primary,
          color: palette.primaryText,
        }}
        data-bookstore-dark={isDark ? 'true' : 'false'}
        data-bookstore-preset={colorPresetId}
      >
        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md">
            <BookOpen size={22} style={{ color: palette.primary }} />
          </div>
          <span className="text-[34px] font-extrabold tracking-tight text-white">
            Bazar.
          </span>
        </div>
        <p className="text-xs text-white/75 mt-4 font-medium">
          Tap anywhere to continue to Onboarding
        </p>
      </div>
    );
  }

  const currentSlide = slides[stepIndex - 1] || slides[0];

  return (
    <div
      className="bookstore-theme-scope min-h-[640px] h-full w-full px-6 pt-3 pb-6 flex flex-col justify-between select-none"
      style={getBookStoreThemeScopeStyle(palette, activeFont)}
      data-bookstore-dark={isDark ? 'true' : 'false'}
      data-bookstore-preset={colorPresetId}
    >
      {/* Top Bar: Skip & Splash Preview Toggle */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            onGetStarted?.();
          }}
          className="text-[14px] font-semibold py-1.5 px-2 rounded-lg cursor-pointer transition hover:opacity-80"
          style={{ color: palette.primary }}
        >
          Skip
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setStepIndex(0)}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border cursor-pointer transition"
            style={{
              backgroundColor: palette.surface,
              borderColor: palette.border,
              color: palette.textSecondary,
            }}
          >
            Splash
          </button>
          {[1, 2, 3].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setStepIndex(idx)}
              className="w-6 h-6 rounded-lg text-[11px] font-bold flex items-center justify-center cursor-pointer transition"
              style={{
                backgroundColor:
                  stepIndex === idx ? palette.primary : palette.surface,
                color:
                  stepIndex === idx
                    ? palette.primaryText
                    : palette.textSecondary,
              }}
            >
              {idx}
            </button>
          ))}
        </div>
      </div>

      {/* Center Editorial Isometric Illustration */}
      <div className="my-auto py-4 flex flex-col items-center text-center">
        <div
          className="w-[248px] h-[248px] rounded-full flex items-center justify-center relative mb-6 overflow-hidden"
          style={{
            backgroundColor: palette.primarySoft,
          }}
        >
          {currentSlide.illustrationType === 'glasses' && (
            <svg
              viewBox="0 0 240 240"
              className="w-52 h-52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Isometric Open Book */}
              <path
                d="M36 168L120 198L204 168L120 138L36 168Z"
                fill={palette.primary}
                fillOpacity="0.22"
              />
              <path
                d="M44 160L120 188L196 160L120 132L44 160Z"
                fill="#FFFFFF"
                stroke={palette.primary}
                strokeWidth="3"
              />
              <line
                x1="120"
                y1="132"
                x2="120"
                y2="188"
                stroke={palette.primary}
                strokeWidth="2.5"
              />
              {/* Reading Glasses on Book */}
              <rect
                x="74"
                y="144"
                width="36"
                height="22"
                rx="6"
                stroke="#1E293B"
                strokeWidth="4"
                fill="#E2E8F0"
                fillOpacity="0.6"
              />
              <rect
                x="126"
                y="144"
                width="36"
                height="22"
                rx="6"
                stroke="#1E293B"
                strokeWidth="4"
                fill="#E2E8F0"
                fillOpacity="0.6"
              />
              <path
                d="M110 154H126"
                stroke="#1E293B"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Reader & Bookshelf */}
              <rect
                x="142"
                y="74"
                width="54"
                height="52"
                rx="6"
                fill="#334155"
              />
              <rect
                x="148"
                y="84"
                width="18"
                height="34"
                rx="2"
                fill={palette.primary}
              />
              <circle
                cx="96"
                cy="64"
                r="16"
                stroke={palette.primary}
                strokeWidth="2.5"
                fill="#FFFFFF"
              />
              <text
                x="96"
                y="70"
                textAnchor="middle"
                fill="#1E293B"
                fontSize="18"
                fontWeight="bold"
              >
                a
              </text>
            </svg>
          )}

          {currentSlide.illustrationType === 'manual' && (
            <svg
              viewBox="0 0 240 240"
              className="w-52 h-52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Tall Giant Hardcover Book */}
              <rect
                x="56"
                y="46"
                width="76"
                height="134"
                rx="8"
                fill={palette.primary}
              />
              <rect
                x="64"
                y="54"
                width="60"
                height="12"
                rx="4"
                fill="#FFFFFF"
                fillOpacity="0.85"
              />
              <text
                x="94"
                y="102"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="9"
                fontWeight="bold"
              >
                INSTRUCTION
              </text>
              <text
                x="94"
                y="114"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="9"
                fontWeight="bold"
              >
                MANUAL
              </text>
              {/* Reader Character */}
              <circle cx="156" cy="86" r="14" fill="#7C2D12" />
              <rect
                x="140"
                y="102"
                width="32"
                height="58"
                rx="8"
                fill={palette.primary}
              />
              <rect
                x="78"
                y="142"
                width="68"
                height="44"
                rx="6"
                fill="#F1F5F9"
                stroke={palette.primary}
                strokeWidth="2"
              />
            </svg>
          )}

          {currentSlide.illustrationType === 'tree' && (
            <svg
              viewBox="0 0 240 240"
              className="w-52 h-52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Lavender Tree Canopy */}
              <circle
                cx="92"
                cy="86"
                r="42"
                fill={palette.primary}
                fillOpacity="0.35"
              />
              <circle
                cx="128"
                cy="78"
                r="34"
                fill={palette.primary}
                fillOpacity="0.28"
              />
              <path
                d="M98 180V102"
                stroke="#311042"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Reader under Tree */}
              <circle cx="122" cy="134" r="12" fill="#FDBA74" />
              <rect
                x="106"
                y="148"
                width="34"
                height="34"
                rx="8"
                fill="#334155"
              />
              <rect
                x="126"
                y="146"
                width="20"
                height="24"
                rx="3"
                fill={palette.primary}
              />
            </svg>
          )}
        </div>

        {/* Title & Description */}
        <h1
          className="text-[23px] font-extrabold leading-snug tracking-tight whitespace-pre-line max-w-[280px]"
          style={{ color: palette.textPrimary }}
        >
          {currentSlide.title}
        </h1>
        <p
          className="text-[13px] leading-relaxed mt-3 max-w-[275px]"
          style={{ color: palette.textSecondary }}
        >
          {currentSlide.subtitle}
        </p>

        {/* 3 Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {[1, 2, 3].map((dotIdx) => {
            const active = stepIndex === dotIdx;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setStepIndex(dotIdx)}
                className="rounded-full transition-all cursor-pointer"
                style={{
                  width: active ? '8px' : '6px',
                  height: active ? '8px' : '6px',
                  backgroundColor: active ? palette.primary : palette.border,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Action Buttons (Continue / Get Started + Sign in) */}
      <div className="space-y-2.5 pt-2">
        <button
          type="button"
          onClick={() => {
            if (stepIndex < 3) {
              setStepIndex(stepIndex + 1);
            } else {
              onGetStarted?.();
              onTriggerToast?.('Welcome to Bazar Book Store!');
            }
          }}
          className="w-full h-[50px] rounded-xl text-[15px] font-bold shadow-sm transition active:scale-98 cursor-pointer"
          style={{
            backgroundColor: palette.primary,
            color: palette.primaryText,
          }}
        >
          {currentSlide.buttonText}
        </button>

        <button
          type="button"
          onClick={() => onOpenSignIn?.()}
          className="w-full h-[50px] rounded-xl text-[15px] font-bold transition active:scale-98 cursor-pointer"
          style={{
            backgroundColor: palette.primarySoft,
            color: palette.primary,
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default OnboardingVarient1;
