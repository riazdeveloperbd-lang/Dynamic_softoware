import React, { useState } from 'react';
import {
  ShieldCheck,
  Radar,
  Server,
  SlidersHorizontal,
  CreditCard,
  HelpCircle,
  Menu,
  X,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  Terminal,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface InboxShieldNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

export const InboxShieldNavbar: React.FC<InboxShieldNavbarProps> = ({
  title,
  variant,
  primaryColor,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavKey, setActiveNavKey] = useState<string>('grader');

  const emeraldColor = primaryColor || '#10B981';
  const isCentered = variant === 'varient_2';
  const isBrutalist = variant === 'varient_3';

  const scrollToSection = (id: string, key: string) => {
    setActiveNavKey(key);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    {
      key: 'grader',
      id: 'inboxshield-risk-grader',
      label: 'Domain Risk Grader',
      sub: 'Live DNS & Blacklist Check',
      icon: Radar,
    },
    {
      key: 'method',
      id: 'inboxshield-pain-solution',
      label: 'The InboxShield Method',
      sub: 'DIY vs. Managed Infra',
      icon: Server,
    },
    {
      key: 'slider',
      id: 'inboxshield-slider',
      label: 'Before / After Metrics',
      sub: '14.2% → 61.8% Open Rate',
      icon: SlidersHorizontal,
    },
    {
      key: 'pricing',
      id: 'inboxshield-pricing',
      label: 'Productized Packages',
      sub: 'Setup & 24/7 Monitoring',
      icon: CreditCard,
    },
    {
      key: 'faq',
      id: 'inboxshield-faq',
      label: 'Technical FAQs',
      sub: 'SPF · DKIM · DMARC · Warmup',
      icon: HelpCircle,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0F172A]/95 text-[#F8FAFC] border-b border-slate-800/90 backdrop-blur-xl">
      {/* Top Infrastructure Telemetry & Guarantee Strip */}
      <div className="w-full px-4 py-1.5 bg-[#090E1A] border-b border-slate-800/80 text-[11px] font-medium text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider text-slate-950 shrink-0"
              style={{ backgroundColor: emeraldColor }}
            >
              <CheckCircle2 size={11} />
              98.4% PRIMARY INBOX SLA
            </span>
            <EditableText
              id="inboxshield_top_announcement"
              defaultText="Done-For-You B2B Cold Email Infrastructure · 2048-Bit DKIM, Strict DMARC p=reject & Automated Inbox Warmup in 24 Hours"
              className="text-slate-300 truncate"
            />
          </div>

          <div className="hidden lg:flex items-center gap-4 text-[11px] text-slate-400 shrink-0">
            <span className="inline-flex items-center gap-1.5 font-mono text-emerald-400">
              <Terminal size={12} />
              <span>ESP Ready: Instantly · Smartlead · Lemlist · Apollo</span>
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              type="button"
              onClick={() => scrollToSection('inboxshield-risk-grader', 'grader')}
              className="text-slate-200 hover:text-emerald-400 font-semibold underline underline-offset-4 cursor-pointer"
            >
              Run Free DNS Diagnostic →
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-[72px] flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          className={`flex items-center gap-3 shrink-0 ${
            isCentered ? 'mx-auto lg:mx-0' : ''
          }`}
        >
          <div
            className={`w-10 h-10 flex items-center justify-center text-slate-950 font-black shadow-md shrink-0 ${
              isBrutalist
                ? 'rounded-none border-2 border-white shadow-[3px_3px_0px_#10B981]'
                : 'rounded-xl'
            }`}
            style={{ backgroundColor: emeraldColor }}
          >
            <ShieldCheck size={22} strokeWidth={2.4} />
          </div>

          <div className="leading-none">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <EditableText
                id="inboxshield_nav_brand_name"
                defaultText={title || 'InboxShield'}
                className="text-base sm:text-lg font-black tracking-tight text-[#F8FAFC]"
              />
              <span className="hidden sm:inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                DELIVERABILITY STUDIO
              </span>
            </div>
            <EditableText
              id="inboxshield_nav_brand_tagline"
              defaultText="B2B Outbound Infrastructure · SPF · DKIM · DMARC · Blacklist Defense"
              className="block text-[10px] sm:text-[11px] text-[#64748B] mt-1 whitespace-nowrap"
            />
          </div>
        </div>

        {/* Center Navigation Links (Clean Typography per Design Constitution) */}
        <nav
          aria-label="InboxShield Primary Navigation"
          className="hidden xl:flex items-center gap-7"
        >
          {navItems.map((item) => {
            const isActive = activeNavKey === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => scrollToSection(item.id, item.key)}
                className={`group relative py-1 text-left transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-emerald-400'
                    : 'text-[#F8FAFC] hover:text-emerald-400'
                }`}
              >
                <span className="text-xs font-bold block">{item.label}</span>
                <span className="text-[10px] text-[#64748B] block">
                  {item.sub}
                </span>
                <span
                  className={`absolute bottom-0 inset-x-0 h-0.5 rounded-full transition-transform origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                  style={{ backgroundColor: emeraldColor }}
                />
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('inboxshield-risk-grader', 'grader')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-700 bg-slate-900/90 text-[#F8FAFC] hover:border-emerald-500/60 transition cursor-pointer"
          >
            <Radar size={14} className="text-emerald-400" />
            <span>Check Domain Risk</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('inboxshield-pricing', 'pricing')}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-extrabold text-slate-950 shadow-sm transition hover:opacity-95 cursor-pointer ${
              isBrutalist
                ? 'rounded-none border-2 border-white shadow-[3px_3px_0px_#FFFFFF]'
                : 'rounded-xl'
            }`}
            style={{ backgroundColor: emeraldColor }}
          >
            <Lock size={13} />
            <span>View Packages</span>
            <ArrowUpRight size={14} />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle Menu"
            className="xl:hidden p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-200 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden px-4 pt-3 pb-5 bg-[#0F172A] border-t border-slate-800 space-y-3">
          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => scrollToSection(item.id, item.key)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold hover:bg-slate-800/70 text-[#F8FAFC] cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Icon size={14} className="text-emerald-400" />
                    <span>{item.label}</span>
                  </span>
                  <span className="text-[11px] text-[#64748B]">{item.sub}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => scrollToSection('inboxshield-risk-grader', 'grader')}
              className="py-2.5 px-3 rounded-xl text-xs font-bold border border-slate-700 bg-slate-900 text-white flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Radar size={14} className="text-emerald-400" />
              <span>Check Domain Risk</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('inboxshield-pricing', 'pricing')}
              className="py-2.5 px-3 rounded-xl text-xs font-extrabold text-slate-950 flex items-center justify-center gap-1.5 cursor-pointer"
              style={{ backgroundColor: emeraldColor }}
            >
              <span>View Packages</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
