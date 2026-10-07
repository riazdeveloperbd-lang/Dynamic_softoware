import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface SignInVarient1Props {
  variant?: BookStoreVariantId;
  onBack?: () => void;
  onLoginSuccess?: () => void;
  onSignInSuccess?: () => void;
  onOpenSignUp?: () => void;
  onGoToSignUp?: () => void;
  onOpenForgotPassword?: () => void;
  onGoToForgotPassword?: () => void;
  onTriggerToast?: (msg: string) => void;
}

export const SignInVarient1: React.FC<SignInVarient1Props> = ({
  variant = 'varient_1',
  onBack,
  onLoginSuccess,
  onSignInSuccess,
  onOpenSignUp,
  onGoToSignUp,
  onOpenForgotPassword,
  onGoToForgotPassword,
  onTriggerToast,
}) => {
  const { palette, activeFont, isDark, colorPresetId } =
    useBookStoreDesignSystem();
  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  const [email, setEmail] = useState('example@email.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="bookstore-theme-scope min-h-[640px] px-5 pt-3 pb-6 space-y-5 select-none"
      style={getBookStoreThemeScopeStyle(palette, activeFont)}
      data-bookstore-dark={isDark ? 'true' : 'false'}
      data-bookstore-preset={colorPresetId}
    >
      {/* Top Back Arrow */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition hover:opacity-80"
          style={{ color: palette.textPrimary }}
        >
          <ArrowLeft size={20} />
        </button>

        <button
          type="button"
          onClick={() => {
            if (email) {
              setEmail('');
              setPassword('');
            } else {
              setEmail('example@email.com');
              setPassword('password123');
            }
          }}
          className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border cursor-pointer"
          style={{
            backgroundColor: palette.surface,
            borderColor: palette.border,
            color: palette.textSecondary,
          }}
        >
          {email ? 'Empty State' : 'Filled State'}
        </button>
      </div>

      {/* Heading */}
      <div>
        <h1
          className="text-[24px] font-extrabold tracking-tight flex items-center gap-2"
          style={{ color: palette.textPrimary }}
        >
          <span>Welcome Back</span>
          <span>👋</span>
        </h1>
        <p
          className="text-[14px] mt-1"
          style={{ color: palette.textSecondary }}
        >
          Sign to your account
        </p>
      </div>

      {/* Form Inputs */}
      <div className="space-y-4 pt-1">
        <div className="space-y-1.5">
          <label
            className="text-[13px] font-bold block"
            style={{ color: palette.textPrimary }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full h-[48px] px-4 rounded-xl text-[14px] font-medium focus:outline-none border transition"
            style={{
              backgroundColor: palette.inputBackground,
              borderColor: email ? palette.border : 'transparent',
              color: palette.textPrimary,
            }}
          />
        </div>

        <div className="space-y-1.5">
          <label
            className="text-[13px] font-bold block"
            style={{ color: palette.textPrimary }}
          >
            Password
          </label>
          <div
            className="w-full h-[48px] px-4 rounded-xl flex items-center justify-between border transition"
            style={{
              backgroundColor: palette.inputBackground,
              borderColor: password ? palette.border : 'transparent',
            }}
          >
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="flex-1 bg-transparent text-[14px] font-medium focus:outline-none"
              style={{ color: palette.textPrimary }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer ml-2"
              style={{ color: palette.textMuted }}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={onOpenForgotPassword}
            className="text-[13px] font-bold cursor-pointer hover:underline"
            style={{ color: palette.primary }}
          >
            Forgot Password?
          </button>
        </div>

        {/* Login CTA Pill Button */}
        <button
          type="button"
          onClick={() => {
            onTriggerToast?.('Signed in as ' + (email || 'John Doe'));
            onLoginSuccess?.();
          }}
          className="w-full h-[50px] rounded-full text-[15px] font-bold shadow-sm transition active:scale-98 cursor-pointer mt-1"
          style={{
            backgroundColor: palette.primary,
            color: palette.primaryText,
          }}
        >
          Login
        </button>

        {/* Sign Up Link */}
        <div className="text-center pt-1">
          <span
            className="text-[14px] font-medium"
            style={{ color: palette.textSecondary }}
          >
            Don’t have an account?{' '}
          </span>
          <button
            type="button"
            onClick={onOpenSignUp}
            className="text-[14px] font-bold cursor-pointer hover:underline"
            style={{ color: palette.primary }}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Divider Or with */}
      <div className="flex items-center gap-3 py-2">
        <div
          className="flex-1 h-[1px]"
          style={{ backgroundColor: palette.border }}
        />
        <span
          className="text-[12px] font-medium"
          style={{ color: palette.textMuted }}
        >
          Or with
        </span>
        <div
          className="flex-1 h-[1px]"
          style={{ backgroundColor: palette.border }}
        />
      </div>

      {/* Social Buttons */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => {
            onTriggerToast?.('Signed in with Google');
            onLoginSuccess?.();
          }}
          className="w-full h-[48px] rounded-full border flex items-center justify-center gap-3 text-[14px] font-semibold transition hover:opacity-90 cursor-pointer"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.border,
            color: palette.textPrimary,
          }}
        >
          <span className="font-extrabold text-[15px] text-blue-500">G</span>
          <span>Sign in with Google</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onTriggerToast?.('Signed in with Apple');
            onLoginSuccess?.();
          }}
          className="w-full h-[48px] rounded-full border flex items-center justify-center gap-3 text-[14px] font-semibold transition hover:opacity-90 cursor-pointer"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.border,
            color: palette.textPrimary,
          }}
        >
          <span className="text-[16px]"></span>
          <span>Sign in with Apple</span>
        </button>
      </div>
    </div>
  );
};

export default SignInVarient1;
