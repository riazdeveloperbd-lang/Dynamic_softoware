import React, { useState } from 'react';
import {
  Leaf,
  CheckCircle2,
  Music,
  Instagram,
  Share2,
  ArrowRight,
  Play,
  Pause,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface CoffeeFooterProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const CoffeeFooter: React.FC<CoffeeFooterProps> = ({
  title = 'Velvet Bean Roasters',
  subtitle = 'Ethically sourced, small-batch micro-lot coffee beans roasted weekly in Portland, Oregon.',
  primaryColor = '#C86D51',
}) => {
  const [clubEmail, setClubEmail] = useState('');
  const [clubSubscribed, setClubSubscribed] = useState(false);
  const [clubError, setClubError] = useState<string | null>(null);
  const [isPlayingPlaylist, setIsPlayingPlaylist] = useState(false);
  const [activeFooterNotice, setActiveFooterNotice] = useState<string | null>(
    null
  );

  const scrollToSection = (href: string) => {
    if (typeof document !== 'undefined') {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleJoinVelvetClub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubEmail.includes('@') || !clubEmail.includes('.')) {
      setClubError('Please enter a valid email address to unlock your 10% code.');
      return;
    }
    setClubError(null);
    setClubSubscribed(true);
    setClubEmail('');
  };

  return (
    <footer className="bg-[#1B1212] text-[#FAF8F5] border-t border-[#3D2314]">
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-14">
        {/* Newsletter Capture Banner: "Join the Velvet Club" — 10% off first subscription order */}
        <div className="rounded-3xl p-8 sm:p-10 bg-[#261816] border border-[#3D2314] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <div
              className="text-xs font-mono font-semibold uppercase tracking-wider"
              style={{ color: primaryColor }}
            >
              Join the Velvet Club · Roastery Dispatch
            </div>
            <h3
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
              style={{
                fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                textWrap: 'balance',
              }}
            >
              <EditableText
                id="coffee_footer_club_heading"
                defaultText="Join the Velvet Club — Get 10% Off Your First Subscription Order"
              />
            </h3>
            <p className="text-xs sm:text-sm text-[#F7F3E9]/80 leading-relaxed max-w-xl">
              Receive early access to limited micro-lot drops, seasonal brewing guides, and Saturday cupping invitations.
            </p>
          </div>

          <div className="lg:col-span-5">
            {clubSubscribed ? (
              <div className="p-4 rounded-2xl bg-[#1B1212] border border-[#C86D51]/50 flex items-center gap-3 text-xs sm:text-sm">
                <CheckCircle2
                  size={20}
                  className="shrink-0"
                  style={{ color: primaryColor }}
                />
                <div>
                  <div className="font-semibold text-[#FAF8F5]">
                    Welcome to the Velvet Club!
                  </div>
                  <div className="text-xs text-[#F7F3E9]/80 mt-0.5">
                    Use code <strong className="font-mono">VELVET10</strong> at checkout for 10% off your first subscription box.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleJoinVelvetClub} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    value={clubEmail}
                    onChange={(e) => setClubEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-4 py-3.5 rounded-xl bg-[#1B1212] border border-[#3D2314] text-xs sm:text-sm text-[#FAF8F5] placeholder:text-[#F7F3E9]/50 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-[#FAF8F5] whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-95"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <span>Claim 10% Off</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
                {clubError && (
                  <p className="text-xs text-rose-300">{clubError}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Columns: Brand, Navigation Links & "Velvet Cafe Vibes" Spotify Curated Playlist */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3D2314]">
          {/* Col 1: Brand Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#FAF8F5]"
                style={{ backgroundColor: primaryColor }}
              >
                <Leaf size={15} />
              </span>
              <span
                className="text-xl font-semibold tracking-tight"
                style={{
                  fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                }}
              >
                <EditableText id="coffee_footer_brand" defaultText={title} />
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#F7F3E9]/75 max-w-sm leading-relaxed">
              <EditableText id="coffee_footer_sub" defaultText={subtitle} />
            </p>

            <div className="text-xs text-[#F7F3E9]/65 space-y-1 font-mono">
              <div>Roastery HQ: 418 NW 11th Ave, Portland, OR 97209</div>
              <div>Roasting Hours: Tue &amp; Fri · 6:00 AM – 6:00 PM PST</div>
            </div>
          </div>

          {/* Col 2: Quick Navigation Column */}
          <div className="md:col-span-3 space-y-3 text-xs sm:text-sm">
            <div className="font-mono text-xs uppercase tracking-wider text-[#F7F3E9]/60">
              Roastery &amp; Explore
            </div>
            <ul className="space-y-2.5 text-[#F7F3E9]/85">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('#coffee-subscriptions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop Subscriptions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('#coffee-menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Seasonal Cafe Menu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('#coffee-locations')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Locations &amp; Hours
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    setActiveFooterNotice(
                      'Velvet Bean Mobile Espresso Cart & Event Catering inquiries: catering@velvetbean.co'
                    )
                  }
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Event Catering
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('#coffee-wholesale')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  B2B Wholesale
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    setActiveFooterNotice(
                      'Shipping & Subscription FAQ: All subscriptions ship free on orders $40+ and can be paused or skipped anytime.'
                    )
                  }
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs &amp; Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Socials & Spotify "Velvet Cafe Vibes" Curated Playlist */}
          <div className="md:col-span-4 space-y-4">
            <div className="font-mono text-xs uppercase tracking-wider text-[#F7F3E9]/60">
              Socials &amp; Cafe Soundtrack
            </div>

            {/* Interactive Spotify Playlist Card */}
            <div className="p-4 rounded-2xl bg-[#261816] border border-[#3D2314] space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[#FAF8F5] shrink-0"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Music size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono uppercase text-[#F7F3E9]/65">
                      Spotify Curated Playlist
                    </div>
                    <div className="text-sm font-semibold truncate">
                      Velvet Cafe Vibes (Vol. IV)
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPlayingPlaylist((p) => !p)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#FAF8F5] shrink-0 cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                  aria-label="Preview Velvet Cafe Vibes Playlist"
                >
                  {isPlayingPlaylist ? <Pause size={14} /> : <Play size={14} />}
                </button>
              </div>

              <div className="text-xs text-[#F7F3E9]/75">
                {isPlayingPlaylist
                  ? '♪ Now Playing: Khruangbin & Leon Bridges — Texas Sun (Acoustic Pour-Over Mix)'
                  : '48 warm analog soul, bossa nova & acoustic morning tracks playing in our Portland cafes.'}
              </div>
            </div>

            {/* Social Links: Instagram, TikTok, Spotify */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {[
                { label: 'Instagram', handle: '@velvetbeanroasters', icon: Instagram },
                { label: 'TikTok', handle: '@velvetbeancoffee', icon: Share2 },
                { label: 'Spotify', handle: 'Velvet Cafe Vibes', icon: Music },
              ].map((soc) => {
                const Icon = soc.icon;
                return (
                  <button
                    key={soc.label}
                    type="button"
                    onClick={() =>
                      setActiveFooterNotice(
                        `${soc.label}: Follow ${soc.handle} for daily pour-over recipes and micro-lot harvest dispatches.`
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-[#261816] border border-[#3D2314] hover:border-[#C86D51] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Icon size={13} style={{ color: primaryColor }} />
                    <span>{soc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {activeFooterNotice && (
          <div className="p-3.5 rounded-xl bg-[#261816] border border-[#C86D51]/40 flex items-center justify-between gap-4 text-xs">
            <span>{activeFooterNotice}</span>
            <button
              type="button"
              onClick={() => setActiveFooterNotice(null)}
              className="font-semibold underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Copyright Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F7F3E9]/60">
          <span>
            © {new Date().getFullYear()} Velvet Bean Roasters LLC. All rights reserved.
          </span>
          <span>
            100% Direct Trade · Certified Compostable Packaging · Roasted in Portland, OR
          </span>
        </div>
      </div>
    </footer>
  );
};
