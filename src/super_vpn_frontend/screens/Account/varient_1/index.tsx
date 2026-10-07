import React from 'react';
import {
  Moon,
  Globe,
  Bell,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import {
  getVpnThemeScopeStyle,
  useVpnDesignSystem,
} from '../../../styles/vpnDesignSystem';

export interface AccountVarient1Props {
  variant?: 'varient_1' | 'varient_2' | 'varient_3' | 'varient_4' | 'varient_5';
  onTriggerToast?: (msg: string) => void;
}

export const AccountVarient1: React.FC<AccountVarient1Props> = ({
  variant = 'varient_1',
  onTriggerToast,
}) => {
  const {
    palette,
    activeFont,
    isDark,
    toggleTheme,
    colorPresetId,
  } = useVpnDesignSystem();

  const preferenceItems = [
    {
      id: 'theme',
      title: 'Theme Mode',
      subtitle: isDark ? 'Cyber Obsidian (Dark)' : 'Daylight Shield (Light)',
      icon: Moon,
      isToggle: true,
    },
    {
      id: 'language',
      title: 'Language',
      subtitle: 'English (US)',
      icon: Globe,
      onClick: () => onTriggerToast?.('Language: English (US)'),
    },
    {
      id: 'alerts',
      title: 'Alert Preferences',
      subtitle: 'Critical Threat Intercepts Only',
      icon: Bell,
      onClick: () =>
        onTriggerToast?.('Alert Preferences: Critical Threat Intercepts Only'),
    },
    {
      id: 'audit',
      title: 'Zero-Logs Independent Audit',
      subtitle: 'Certified Nov 2024 by Cure53',
      icon: ShieldCheck,
      isAudit: true,
      onClick: () =>
        onTriggerToast?.('Opened Cure53 Zero-Logs Cryptographic Audit Report'),
    },
  ];

  return (
    <div
      className="vpn-theme-scope px-4 pt-2 pb-6 space-y-4 select-none"
      style={getVpnThemeScopeStyle(palette, activeFont)}
      data-vpn-dark={isDark ? 'true' : 'false'}
      data-vpn-preset={colorPresetId}
    >
      {/* PREFERENCES & SECURITY (ONLY SECTION IN ACCOUNT SCREEN, 5 VARIANTS) */}
      <div className="space-y-2.5">
        <div
          className="text-[14px] font-extrabold px-0.5"
          style={{ color: palette.textPrimary }}
        >
          Preferences &amp; Security
        </div>

        {variant === 'varient_2' ? (
          /* V2: 2x2 Bento Preferences & Security Grid */
          <div className="grid grid-cols-2 gap-3">
            {preferenceItems.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.isToggle) {
                      toggleTheme();
                    } else {
                      item.onClick?.();
                    }
                  }}
                  className="rounded-2xl border p-4 flex flex-col justify-between gap-3 cursor-pointer transition"
                  style={{
                    backgroundColor: palette.cardBackground,
                    borderColor: item.isAudit ? palette.primary : palette.border,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: palette.primarySoft,
                        color: item.isAudit ? '#10B981' : palette.primary,
                      }}
                    >
                      <IconComp size={17} />
                    </div>
                    {item.isToggle ? (
                      <div
                        className="w-10 h-5 rounded-full p-0.5 transition-colors"
                        style={{
                          backgroundColor: isDark
                            ? palette.primary
                            : palette.surface,
                        }}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            isDark ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    ) : item.isAudit ? (
                      <ExternalLink
                        size={14}
                        style={{ color: palette.textSecondary }}
                      />
                    ) : (
                      <ChevronRight
                        size={15}
                        style={{ color: palette.textSecondary }}
                      />
                    )}
                  </div>
                  <div>
                    <div
                      className="text-[13px] font-extrabold leading-snug"
                      style={{ color: palette.textPrimary }}
                    >
                      {item.title}
                    </div>
                    <div
                      className={`text-[11px] mt-0.5 ${
                        item.isAudit ? 'text-emerald-400 font-semibold' : ''
                      }`}
                      style={
                        !item.isAudit
                          ? { color: palette.textSecondary }
                          : undefined
                      }
                    >
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_3' ? (
          /* V3: Brutalist Hard-Shadow Preference Cards */
          <div className="space-y-3">
            {preferenceItems.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.isToggle) {
                      toggleTheme();
                    } else {
                      item.onClick?.();
                    }
                  }}
                  className="rounded-xl border-2 p-3.5 flex items-center justify-between gap-3 cursor-pointer transition"
                  style={{
                    backgroundColor: palette.cardBackground,
                    borderColor: palette.primary,
                    boxShadow: `3px 3px 0px ${palette.primary}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <IconComp
                      size={17}
                      style={{
                        color: item.isAudit ? '#10B981' : palette.primary,
                      }}
                    />
                    <div>
                      <div
                        className="text-[13px] font-black uppercase tracking-wide"
                        style={{ color: palette.textPrimary }}
                      >
                        {item.title}
                      </div>
                      <div
                        className={`text-[11px] font-mono ${
                          item.isAudit ? 'text-emerald-400 font-bold' : ''
                        }`}
                        style={
                          !item.isAudit
                            ? { color: palette.textSecondary }
                            : undefined
                        }
                      >
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  {item.isToggle ? (
                    <span
                      className="px-2.5 py-1 rounded text-[10px] font-extrabold uppercase"
                      style={{
                        backgroundColor: palette.primary,
                        color: palette.primaryText,
                      }}
                    >
                      {isDark ? 'DARK' : 'LIGHT'}
                    </span>
                  ) : item.isAudit ? (
                    <ExternalLink size={15} style={{ color: palette.primary }} />
                  ) : (
                    <ChevronRight size={15} style={{ color: palette.primary }} />
                  )}
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_4' ? (
          /* V4: Accent Left-Rail Separated Cards */
          <div className="space-y-2.5">
            {preferenceItems.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.isToggle) {
                      toggleTheme();
                    } else {
                      item.onClick?.();
                    }
                  }}
                  className="rounded-2xl border border-l-4 p-3.5 flex items-center justify-between gap-3 cursor-pointer transition"
                  style={{
                    backgroundColor: palette.cardBackground,
                    borderColor: palette.border,
                    borderLeftColor: item.isAudit ? '#10B981' : palette.primary,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: palette.surface,
                        color: item.isAudit ? '#10B981' : palette.primary,
                      }}
                    >
                      <IconComp size={16} />
                    </div>
                    <div>
                      <div
                        className="text-[13px] font-extrabold"
                        style={{ color: palette.textPrimary }}
                      >
                        {item.title}
                      </div>
                      <div
                        className={`text-[11px] ${
                          item.isAudit ? 'text-emerald-400 font-semibold' : ''
                        }`}
                        style={
                          !item.isAudit
                            ? { color: palette.textSecondary }
                            : undefined
                        }
                      >
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  {item.isToggle ? (
                    <button
                      type="button"
                      className="w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer"
                      style={{
                        backgroundColor: isDark
                          ? palette.primary
                          : palette.surface,
                      }}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          isDark ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  ) : item.isAudit ? (
                    <ExternalLink
                      size={15}
                      style={{ color: palette.textSecondary }}
                    />
                  ) : (
                    <ChevronRight
                      size={15}
                      style={{ color: palette.textSecondary }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_5' ? (
          /* V5: Soft Tinted Capsule Rows */
          <div
            className="rounded-3xl border p-3 space-y-2"
            style={{
              backgroundColor: palette.cardBackground,
              borderColor: palette.border,
            }}
          >
            {preferenceItems.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.isToggle) {
                      toggleTheme();
                    } else {
                      item.onClick?.();
                    }
                  }}
                  className="rounded-2xl p-3 flex items-center justify-between gap-3 cursor-pointer transition"
                  style={{
                    backgroundColor: palette.surface,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: palette.primarySoft,
                        color: item.isAudit ? '#10B981' : palette.primary,
                      }}
                    >
                      <IconComp size={15} />
                    </div>
                    <div>
                      <div
                        className="text-[13px] font-extrabold"
                        style={{ color: palette.textPrimary }}
                      >
                        {item.title}
                      </div>
                      <div
                        className={`text-[11px] ${
                          item.isAudit ? 'text-emerald-400 font-semibold' : ''
                        }`}
                        style={
                          !item.isAudit
                            ? { color: palette.textSecondary }
                            : undefined
                        }
                      >
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  {item.isToggle ? (
                    <button
                      type="button"
                      className="w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer"
                      style={{
                        backgroundColor: isDark
                          ? palette.primary
                          : palette.cardBackground,
                      }}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          isDark ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  ) : item.isAudit ? (
                    <ExternalLink
                      size={15}
                      style={{ color: palette.textSecondary }}
                    />
                  ) : (
                    <ChevronRight
                      size={15}
                      style={{ color: palette.textSecondary }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* V1 (Default): Classic Divided Preferences & Security Ledger */
          <div
            className="rounded-2xl border divide-y overflow-hidden"
            style={{
              backgroundColor: palette.cardBackground,
              borderColor: palette.border,
            }}
          >
            {/* Theme Mode */}
            <div
              className="p-3.5 flex items-center justify-between"
              style={{ borderColor: palette.border }}
            >
              <div className="flex items-center gap-3">
                <Moon size={16} style={{ color: palette.textSecondary }} />
                <div>
                  <div
                    className="text-[13px] font-extrabold"
                    style={{ color: palette.textPrimary }}
                  >
                    Theme Mode
                  </div>
                  <div
                    className="text-[11px]"
                    style={{ color: palette.textSecondary }}
                  >
                    {isDark ? 'Cyber Obsidian (Dark)' : 'Daylight Shield (Light)'}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer"
                style={{
                  backgroundColor: isDark ? palette.primary : palette.surface,
                }}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    isDark ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Language */}
            <div
              onClick={() => onTriggerToast?.('Language: English (US)')}
              className="p-3.5 flex items-center justify-between cursor-pointer"
              style={{ borderColor: palette.border }}
            >
              <div className="flex items-center gap-3">
                <Globe size={16} style={{ color: palette.textSecondary }} />
                <div>
                  <div
                    className="text-[13px] font-extrabold"
                    style={{ color: palette.textPrimary }}
                  >
                    Language
                  </div>
                  <div
                    className="text-[11px]"
                    style={{ color: palette.textSecondary }}
                  >
                    English (US)
                  </div>
                </div>
              </div>
              <ChevronRight size={15} style={{ color: palette.textSecondary }} />
            </div>

            {/* Alert Preferences */}
            <div
              onClick={() =>
                onTriggerToast?.('Alert Preferences: Critical Threat Intercepts Only')
              }
              className="p-3.5 flex items-center justify-between cursor-pointer"
              style={{ borderColor: palette.border }}
            >
              <div className="flex items-center gap-3">
                <Bell size={16} style={{ color: palette.textSecondary }} />
                <div>
                  <div
                    className="text-[13px] font-extrabold"
                    style={{ color: palette.textPrimary }}
                  >
                    Alert Preferences
                  </div>
                  <div
                    className="text-[11px]"
                    style={{ color: palette.textSecondary }}
                  >
                    Critical Threat Intercepts Only
                  </div>
                </div>
              </div>
              <ChevronRight size={15} style={{ color: palette.textSecondary }} />
            </div>

            {/* Zero-Logs Independent Audit */}
            <div
              onClick={() =>
                onTriggerToast?.('Opened Cure53 Zero-Logs Cryptographic Audit Report')
              }
              className="p-3.5 flex items-center justify-between cursor-pointer"
              style={{ borderColor: palette.border }}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck size={16} className="text-emerald-400" />
                <div>
                  <div
                    className="text-[13px] font-extrabold"
                    style={{ color: palette.textPrimary }}
                  >
                    Zero-Logs Independent Audit
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-400">
                    Certified Nov 2024 by Cure53
                  </div>
                </div>
              </div>
              <ExternalLink size={15} style={{ color: palette.textSecondary }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountVarient1;
