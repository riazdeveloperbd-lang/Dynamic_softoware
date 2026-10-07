import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface MyAccountVarient1Props {
  variant?: BookStoreVariantId;
  onBack: () => void;
}

export const MyAccountVarient1: React.FC<MyAccountVarient1Props> = ({
  variant = 'varient_1',
  onBack,
}) => {
  const { palette, activeFont, userProfile, setUserProfile } = useBookStoreDesignSystem();
  const scopeStyle = getBookStoreThemeScopeStyle(palette, activeFont);

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [password, setPassword] = useState(userProfile.password);
  const [showPass, setShowPass] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setUserProfile((prev) => ({
      ...prev,
      name,
      email,
      phone,
      password,
    }));
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 1800);
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
      {/* Top Bar (9.1 My Account.png) */}
      <div className="flex items-center justify-between py-2.5 mb-2">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center -ml-1.5"
          style={{ color: palette.textPrimary }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-[18px] font-bold tracking-tight" style={{ fontFamily: activeFont.headingFont }}>
          My Account
        </h1>
        <div className="w-9" />
      </div>

      {/* Avatar Change Picture */}
      <div className="flex flex-col items-center my-4">
        <img
          src={userProfile.avatar}
          alt={name}
          className="w-24 h-24 rounded-full object-cover shadow-sm"
        />
        <button
          className="text-[14px] font-bold mt-3"
          style={{ color: palette.primary }}
        >
          Change Picture
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 flex-1">
        <div>
          <label className="block text-[13px] font-bold mb-1.5">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-[14px] outline-none border"
            style={{
              backgroundColor: palette.inputBackground,
              borderColor: palette.border,
              color: palette.textPrimary,
            }}
          />
        </div>

        <div>
          <label className="block text-[13px] font-bold mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-[14px] outline-none border"
            style={{
              backgroundColor: palette.inputBackground,
              borderColor: palette.border,
              color: palette.textPrimary,
            }}
          />
        </div>

        <div>
          <label className="block text-[13px] font-bold mb-1.5">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-[14px] outline-none border"
            style={{
              backgroundColor: palette.inputBackground,
              borderColor: palette.border,
              color: palette.textPrimary,
            }}
          />
        </div>

        <div>
          <label className="block text-[13px] font-bold mb-1.5">Password</label>
          <div
            className="flex items-center px-4 py-3 rounded-xl border"
            style={{
              backgroundColor: palette.inputBackground,
              borderColor: palette.border,
            }}
          >
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent text-[14px] outline-none"
              style={{ color: palette.textPrimary }}
            />
            <button onClick={() => setShowPass(!showPass)} style={{ color: palette.textMuted }}>
              {showPass ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-3.5 rounded-full text-[15px] font-bold mt-6 transition-transform active:scale-[0.99]"
        style={{ backgroundColor: palette.primary, color: palette.primaryText }}
      >
        {savedNotice ? 'Changes Saved ✓' : 'Save Changes'}
      </button>
    </div>
  );
};

export default MyAccountVarient1;
