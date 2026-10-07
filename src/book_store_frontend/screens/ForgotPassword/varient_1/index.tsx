import React, { useState } from 'react';
import {
  ArrowLeft,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Delete,
  Sparkles,
} from 'lucide-react';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface ForgotPasswordVarient1Props {
  variant?: BookStoreVariantId;
  onBack?: () => void;
  onOpenSignIn?: () => void;
  onLoginSuccess?: () => void;
  onTriggerToast?: (msg: string) => void;
}

type ForgotStep =
  | 'choose_channel'
  | 'input_contact'
  | 'verify_otp'
  | 'new_password'
  | 'success';

export const ForgotPasswordVarient1: React.FC<ForgotPasswordVarient1Props> = ({
  onBack,
  onOpenSignIn,
  onTriggerToast,
}) => {
  const { palette, activeFont, isDark, colorPresetId } =
    useBookStoreDesignSystem();

  const [step, setStep] = useState<ForgotStep>('choose_channel');
  const [channel, setChannel] = useState<'email' | 'phone'>('email');
  const [emailVal, setEmailVal] = useState('example@email.com');
  const [phoneVal, setPhoneVal] = useState('(+965) 123 435 7565');
  const [otpDigits, setOtpDigits] = useState(['2', '8', '5', '']);
  const [newPass, setNewPass] = useState('password123');
  const [confirmPass, setConfirmPass] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);

  return (
    <div
      className="bookstore-theme-scope min-h-[640px] flex flex-col justify-between select-none"
      style={getBookStoreThemeScopeStyle(palette, activeFont)}
      data-bookstore-dark={isDark ? 'true' : 'false'}
      data-bookstore-preset={colorPresetId}
    >
      {/* Top Bar */}
      <div className="px-5 pt-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => {
            if (step === 'choose_channel') {
              onBack?.();
            } else if (step === 'input_contact') {
              setStep('choose_channel');
            } else if (step === 'verify_otp') {
              setStep('input_contact');
            } else if (step === 'new_password') {
              setStep('verify_otp');
            } else {
              setStep('new_password');
            }
          }}
          className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
          style={{ color: palette.textPrimary }}
        >
          <ArrowLeft size={20} />
        </button>

        {/* Sub-screen switcher for 3.0 - 3.6 */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {(
            [
              ['choose_channel', 'Channel'],
              ['input_contact', 'Reset Input'],
              ['verify_otp', 'OTP'],
              ['new_password', 'New Pass'],
              ['success', 'Done'],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setStep(k)}
              className="px-2 py-1 rounded-md text-[10px] font-bold whitespace-nowrap cursor-pointer"
              style={{
                backgroundColor:
                  step === k ? palette.primary : palette.surface,
                color:
                  step === k ? palette.primaryText : palette.textSecondary,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 3.0 FORGOT PASSWORD - SELECT CHANNEL (Email / Phone Cards) */}
      {step === 'choose_channel' && (
        <div className="flex-1 px-5 pt-3 pb-6 space-y-6">
          <div>
            <h1
              className="text-[24px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              Forgot Password
            </h1>
            <p
              className="text-[13px] mt-1.5 leading-relaxed"
              style={{ color: palette.textSecondary }}
            >
              Select which contact details should we use to reset your password
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <button
              type="button"
              onClick={() => setChannel('email')}
              className="p-4 rounded-2xl border text-left space-y-3 transition cursor-pointer"
              style={{
                backgroundColor: palette.surface,
                borderColor:
                  channel === 'email' ? palette.primary : 'transparent',
              }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: palette.cardBackground,
                  color:
                    channel === 'email' ? palette.primary : palette.textMuted,
                }}
              >
                <Mail size={20} />
              </div>
              <div>
                <div
                  className="text-[14px] font-bold"
                  style={{ color: palette.textPrimary }}
                >
                  Email
                </div>
                <div
                  className="text-[12px] mt-0.5"
                  style={{ color: palette.textSecondary }}
                >
                  Send to your email
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setChannel('phone')}
              className="p-4 rounded-2xl border text-left space-y-3 transition cursor-pointer"
              style={{
                backgroundColor: palette.surface,
                borderColor:
                  channel === 'phone' ? palette.primary : 'transparent',
              }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: palette.cardBackground,
                  color:
                    channel === 'phone' ? palette.primary : palette.textMuted,
                }}
              >
                <Phone size={20} />
              </div>
              <div>
                <div
                  className="text-[14px] font-bold"
                  style={{ color: palette.textPrimary }}
                >
                  Phone Number
                </div>
                <div
                  className="text-[12px] mt-0.5"
                  style={{ color: palette.textSecondary }}
                >
                  Send to your phone
                </div>
              </div>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setStep('input_contact')}
            className="w-full h-[50px] rounded-full text-[15px] font-bold shadow-sm cursor-pointer"
            style={{
              backgroundColor: palette.primary,
              color: palette.primaryText,
            }}
          >
            Continue
          </button>
        </div>
      )}

      {/* 3.1 & 3.2 RESET PASSWORD WITH EMAIL OR PHONE */}
      {step === 'input_contact' && (
        <div className="flex-1 px-5 pt-3 pb-6 space-y-5">
          <div>
            <h1
              className="text-[24px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              Reset Password
            </h1>
            <p
              className="text-[13px] mt-1.5 leading-relaxed"
              style={{ color: palette.textSecondary }}
            >
              {channel === 'email'
                ? 'Please enter your email, we will send verification code to your email.'
                : 'Please enter your phone number, we will send a verification code to your phone number.'}
            </p>
          </div>

          {channel === 'email' ? (
            <div className="space-y-1.5">
              <label
                className="text-[13px] font-bold block"
                style={{ color: palette.textPrimary }}
              >
                Email
              </label>
              <input
                type="email"
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
                className="w-full h-[48px] px-4 rounded-xl text-[14px] font-medium focus:outline-none"
                style={{
                  backgroundColor: palette.inputBackground,
                  color: palette.textPrimary,
                }}
              />
            </div>
          ) : (
            <div className="space-y-1.5">
              <label
                className="text-[13px] font-bold block"
                style={{ color: palette.textPrimary }}
              >
                Phone Number
              </label>
              <div
                className="h-[48px] px-4 rounded-xl flex items-center gap-3"
                style={{ backgroundColor: palette.inputBackground }}
              >
                <Phone size={17} style={{ color: palette.primary }} />
                <input
                  type="text"
                  value={phoneVal}
                  onChange={(e) => setPhoneVal(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] font-medium focus:outline-none"
                  style={{ color: palette.textPrimary }}
                />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setStep('verify_otp');
              onTriggerToast?.('Verification code sent');
            }}
            className="w-full h-[50px] rounded-full text-[15px] font-bold shadow-sm cursor-pointer"
            style={{
              backgroundColor: palette.primary,
              color: palette.primaryText,
            }}
          >
            Send
          </button>
        </div>
      )}

      {/* 3.3 & 3.4 VERIFICATION CODE */}
      {step === 'verify_otp' && (
        <div className="flex-1 flex flex-col justify-between pt-3">
          <div className="px-5 text-center space-y-3">
            <h1
              className="text-[23px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              Verification Code
            </h1>
            <p
              className="text-[13px]"
              style={{ color: palette.textSecondary }}
            >
              Please enter the code we just sent to{' '}
              {channel === 'email' ? 'email' : 'phone number'}{' '}
              <span
                className="font-semibold block mt-0.5"
                style={{ color: palette.textPrimary }}
              >
                {channel === 'email' ? emailVal : phoneVal}
              </span>
            </p>

            <div className="flex items-center justify-center gap-3 py-3">
              {otpDigits.map((d, idx) => (
                <div
                  key={idx}
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-[20px] font-extrabold border"
                  style={{
                    backgroundColor: palette.inputBackground,
                    borderColor: idx === 3 ? palette.primary : 'transparent',
                    color: palette.textPrimary,
                  }}
                >
                  {d || '|'}
                </div>
              ))}
            </div>

            <div className="text-[12px]">
              <span style={{ color: palette.textSecondary }}>
                If you didn’t receive a code?{' '}
              </span>
              <button
                type="button"
                onClick={() => setOtpDigits(['2', '8', '5', '4'])}
                className="font-bold cursor-pointer"
                style={{ color: palette.primary }}
              >
                Resend
              </button>
            </div>

            <button
              type="button"
              onClick={() => setStep('new_password')}
              className="w-full h-[50px] rounded-full text-[15px] font-bold shadow-sm cursor-pointer mt-2"
              style={{
                backgroundColor: palette.primary,
                color: palette.primaryText,
              }}
            >
              Continue
            </button>
          </div>

          <div
            className="mt-6 pt-5 pb-6 px-6 grid grid-cols-3 gap-y-5 text-center"
            style={{
              backgroundColor: palette.surface,
              color: palette.textPrimary,
            }}
          >
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map(
              (num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setOtpDigits(['2', '8', '5', num])}
                  className="h-10 text-[19px] font-bold rounded-xl cursor-pointer"
                >
                  {num}
                </button>
              )
            )}
            <button
              type="button"
              onClick={() => setOtpDigits(['2', '8', '5', ''])}
              className="h-10 flex items-center justify-center rounded-xl cursor-pointer"
            >
              <Delete size={19} />
            </button>
          </div>
        </div>
      )}

      {/* 3.5 NEW PASSWORD */}
      {step === 'new_password' && (
        <div className="flex-1 px-5 pt-3 pb-6 space-y-4">
          <div>
            <h1
              className="text-[24px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              New Password
            </h1>
            <p
              className="text-[13px] mt-1"
              style={{ color: palette.textSecondary }}
            >
              Create your new password, so you can login to your account.
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              className="text-[13px] font-bold block"
              style={{ color: palette.textPrimary }}
            >
              New Password
            </label>
            <div
              className="h-[48px] px-4 rounded-xl flex items-center justify-between border"
              style={{
                backgroundColor: palette.inputBackground,
                borderColor: palette.primary,
              }}
            >
              <input
                type={showNewPass ? 'text' : 'password'}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="flex-1 bg-transparent text-[14px] focus:outline-none"
                style={{ color: palette.textPrimary }}
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                style={{ color: palette.textMuted }}
              >
                {showNewPass ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              className="text-[13px] font-bold block"
              style={{ color: palette.textPrimary }}
            >
              Confirm Password
            </label>
            <div
              className="h-[48px] px-4 rounded-xl flex items-center justify-between"
              style={{ backgroundColor: palette.inputBackground }}
            >
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Your password"
                className="flex-1 bg-transparent text-[14px] focus:outline-none"
                style={{ color: palette.textPrimary }}
              />
              <EyeOff size={18} style={{ color: palette.textMuted }} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep('success')}
            className="w-full h-[50px] rounded-full text-[15px] font-bold shadow-sm cursor-pointer mt-2"
            style={{
              backgroundColor: palette.primary,
              color: palette.primaryText,
            }}
          >
            Send
          </button>
        </div>
      )}

      {/* 3.6 PASSWORD CHANGED! */}
      {step === 'success' && (
        <div className="flex-1 px-6 flex flex-col items-center justify-center text-center space-y-4">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center"
            style={{ backgroundColor: palette.primarySoft }}
          >
            <Sparkles size={46} style={{ color: palette.primary }} />
          </div>
          <h1
            className="text-[23px] font-extrabold"
            style={{ color: palette.textPrimary }}
          >
            Password Changed!
          </h1>
          <p
            className="text-[13px] leading-relaxed max-w-[260px]"
            style={{ color: palette.textSecondary }}
          >
            Password changed successfully, you can login again with a new
            password
          </p>
          <button
            type="button"
            onClick={onOpenSignIn}
            className="w-full h-[50px] rounded-full text-[15px] font-bold shadow-sm cursor-pointer mt-3"
            style={{
              backgroundColor: palette.primary,
              color: palette.primaryText,
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordVarient1;
