import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCircle2, Quote } from 'lucide-react';
import {
  EditableText,
  EditableImage,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface Doctor2ReviewsSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const DOCTOR2_PATIENT_REVIEWS = [
  {
    id: 'amy',
    name: 'Amy Watson',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    quote:
      'I feel better and more confident about my heart health. Highly recommended.',
  },
  {
    id: 'ruth',
    name: 'Ruth Leburn',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
    quote:
      'Dr. Mehta is a kind and patient listener. He explained everything in detail.',
  },
  {
    id: 'candie',
    name: 'Candie Rice',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    quote:
      "The best cardiologist I've ever meet. Professional, caring and truly committed to his patients.",
  },
];

export const Doctor2ReviewsSection: React.FC<Doctor2ReviewsSectionProps> = ({
  title = 'Patients Reviews',
  subtitle = 'Verified 5-star reviews from cardiology patients.',
  variant = 'varient_1',
  primaryColor = '#118C74',
  isDark = false,
}) => {
  const [activeDot, setActiveDot] = useState(1);

  /* VARIANT 2: Editorial Quote Cards with Highlight Banner */
  if (variant === 'varient_2' || variant === 'varient_5') {
    return (
      <section
        id="reviews"
        className={`py-14 px-4 sm:px-8 ${
          isDark ? 'bg-[#0E1729] text-white' : 'bg-[#F5FBF9] text-slate-900'
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <EditableText
              id="doc2_rev_heading_v2"
              as="h2"
              defaultText={title}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight block"
            />
            <EditableText
              id="doc2_rev_sub_v2"
              as="p"
              defaultText={subtitle}
              className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 block"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DOCTOR2_PATIENT_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className={`p-6 rounded-3xl border space-y-4 flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#152238] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-sm'
                }`}
              >
                <Quote size={22} style={{ color: primaryColor }} />
                <EditableText
                  id={`doc2_rev_quote_${rev.id}`}
                  as="p"
                  defaultText={rev.quote}
                  className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed block"
                />
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-white/10">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <EditableImage
                      id={`doc2_rev_avatar_${rev.id}`}
                      defaultSrc={rev.avatar}
                      alt={rev.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <EditableText
                        id={`doc2_rev_name_${rev.id}`}
                        defaultText={rev.name}
                        className="text-xs font-extrabold"
                      />
                      <CheckCircle2
                        size={13}
                        className="text-emerald-600 fill-emerald-100 flex-shrink-0"
                      />
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 3: Dark Executive Patient Testimonials */
  if (variant === 'varient_3' || variant === 'varient_6') {
    return (
      <section id="reviews" className="py-14 px-4 sm:px-8 bg-[#0B1528] text-white">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <EditableText
              id="doc2_rev_heading_v3"
              as="h2"
              defaultText={title}
              className="text-2xl sm:text-3xl font-extrabold block"
            />
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              ★ 4.9 Average (500+ Verified Reviews)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DOCTOR2_PATIENT_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border border-emerald-400">
                    <EditableImage
                      id={`doc2_rev_avatar_${rev.id}`}
                      defaultSrc={rev.avatar}
                      alt={rev.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <EditableText
                        id={`doc2_rev_name_${rev.id}`}
                        defaultText={rev.name}
                        className="text-xs font-extrabold text-white"
                      />
                      <CheckCircle2 size={13} className="text-emerald-400" />
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <EditableText
                  id={`doc2_rev_quote_${rev.id}`}
                  as="p"
                  defaultText={rev.quote}
                  className="text-xs text-slate-300 leading-relaxed block"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ========================================================================
   * VARIANT 1 (Exact Dribbble Screenshot Layout):
   * "Patients Reviews" + Left/Right Circular Arrow Buttons + 3 Review Cards
   * (Avatar, Name, Green Verified Checkmark, 5 Gold Stars, Quote) + 4 Dots
   * ======================================================================== */
  return (
    <section
      id="reviews"
      className={`py-12 px-4 sm:px-8 transition-colors ${
        isDark ? 'bg-[#0B1320] text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-7">
        <EditableText
          id="doc2_rev_heading"
          as="h2"
          defaultText={title}
          className="text-xl sm:text-2xl font-extrabold tracking-tight block"
        />

        <div className="relative flex items-center gap-3">
          {/* Left Carousel Arrow */}
          <button
            type="button"
            onClick={() => setActiveDot((d) => (d === 0 ? 3 : d - 1))}
            className="hidden md:flex w-9 h-9 rounded-full border border-slate-200 dark:border-white/15 items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white flex-shrink-0 cursor-pointer"
            aria-label="Previous Review"
          >
            <ChevronLeft size={16} />
          </button>

          {/* 3 Review Cards */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-5">
            {DOCTOR2_PATIENT_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className={`p-5 rounded-2xl border space-y-3.5 transition hover:shadow-md ${
                  isDark
                    ? 'bg-[#131F33] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <EditableImage
                      id={`doc2_rev_avatar_${rev.id}`}
                      defaultSrc={rev.avatar}
                      alt={rev.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <EditableText
                        id={`doc2_rev_name_${rev.id}`}
                        defaultText={rev.name}
                        className="text-xs sm:text-sm font-extrabold"
                      />
                      <CheckCircle2
                        size={13}
                        style={{ color: primaryColor }}
                        className="flex-shrink-0"
                      />
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>

                <EditableText
                  id={`doc2_rev_quote_${rev.id}`}
                  as="p"
                  defaultText={rev.quote}
                  className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed block"
                />
              </div>
            ))}
          </div>

          {/* Right Carousel Arrow */}
          <button
            type="button"
            onClick={() => setActiveDot((d) => (d + 1) % 4)}
            className="hidden md:flex w-9 h-9 rounded-full border border-slate-200 dark:border-white/15 items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white flex-shrink-0 cursor-pointer"
            aria-label="Next Review"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Bottom Pagination Dots matching screenshot */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {[0, 1, 2, 3].map((dot) => (
            <button
              key={dot}
              type="button"
              onClick={() => setActiveDot(dot)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeDot === dot ? 'w-4' : 'w-2 bg-slate-300 dark:bg-slate-700'
              }`}
              style={activeDot === dot ? { backgroundColor: primaryColor } : undefined}
              aria-label={`Slide ${dot + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctor2ReviewsSection;
