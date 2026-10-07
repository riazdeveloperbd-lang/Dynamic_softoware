import React, { useState } from 'react';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Check,
  X,
  Phone,
  Delete,
  Sparkles,
} from 'lucide-react';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface SignUpVarient1Props {
  variant?: BookStoreVariantId;
  onBack?: () => void;
  onOpenSignIn?: () => void;
  onGoToSignIn?: () => void;
  onCompleteSignUp?: () => void;
  onTriggerToast?: (msg: string) => void;
}

type SignUpSubStep =
  | 'form'
  | 'verify_email'
  | 'phone_input'
  | 'verify_phone'
  | 'congrats';

export const SignUpVarient1: React.FC<SignUpVarient1Props> = ({
  onBack,
  onOpenSignIn,
  onCompleteSignUp,
  onTriggerToast,
}) => {
  const { palette, activeFont, isDark, colorPresetId } =
    useBookStoreDesignSystem();

  const [step, setStep] = useState<SignUpSubStep>('form');
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('Johndoey@email.com');
  const [password, setPassword] = useState('pass1');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('(+965) 123 435 7565');
  const [otpDigits, setOtpDigits] = useState<string[]>(['2', '8', '5', '']);

  const hasMin8 = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);

  const handleKeyPress = (digit: string) => {
    if (step === 'phone_input') {
      setPhone((prev) => (prev.length < 22 ? prev + digit : prev));
      return;
    }
    const emptyIdx = otpDigits.findIndex((d) => d === '');
    if (emptyIdx !== -1) {
      const next = [...otpDigits];
      next[emptyIdx] = digit;
      setOtpDigits(next);
    }
  };

  const handleBackspace = () => {
    if (step === 'phone_input') {
      setPhone((prev) => prev.slice(0, -1));
      return;
    }
    const lastFilled = [...otpDigits]
      .reverse()
      .findIndex((d) => d !== '');
    if (lastFilled !== -1) {
      const targetIdx = 3 - lastFilled;
      const next = [...otpDigits];
      next[targetIdx] = '';
      setOtpDigits(next);
    }
  };

  return (
    <div
      className="bookstore-theme-scope min-h-[640px] flex flex-col justify-between select-none"
      style={getBookStoreThemeScopeStyle(palette, activeFont)}
      data-bookstore-dark={isDark ? 'true' : 'false'}
      data-bookstore-preset={colorPresetId}
    >
      {/* Top Sub-Flow Switcher & Back Button */}
      <div className="px-5 pt-3">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              if (step === 'form') {
                onBack?.();
              } else if (step === 'verify_email') {
                setStep('form');
              } else if (step === 'phone_input') {
                setStep('verify_email');
              } else if (step === 'verify_phone') {
                setStep('phone_input');
              } else {
                setStep('verify_phone');
              }
            }}
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
            style={{ color: palette.textPrimary }}
          >
            <ArrowLeft size={20} />
          </button>

          {/* Quick Sub-Screen Stepper for 2.2 - 2.8 */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {(
              [
                ['form', 'Sign Up'],
                ['verify_email', 'Email OTP'],
                ['phone_input', 'Phone'],
                ['verify_phone', 'Phone OTP'],
                ['congrats', 'Success'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setStep(key)}
                className="px-2 py-1 rounded-md text-[10px] font-bold whitespace-nowrap cursor-pointer transition"
                style={{
                  backgroundColor:
                    step === key ? palette.primary : palette.surface,
                  color:
                    step === key ? palette.primaryText : palette.textSecondary,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 1: SIGN UP FORM WITH PASSWORD VALIDATION (2.2, 2.3, 2.4) */}
      {step === 'form' && (
        <div className="px-5 pb-6 pt-2 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h1
                className="text-[24px] font-extrabold tracking-tight"
                style={{ color: palette.textPrimary }}
              >
                Sign Up
              </h1>
              <p
                className="text-[13px] mt-1"
                style={{ color: palette.textSecondary }}
              >
                Create account and choose favorite menu
              </p>
            </div>

            <div className="space-y-1.5">
              <label
                className="text-[13px] font-bold block"
                style={{ color: palette.textPrimary }}
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full h-[46px] px-4 rounded-xl text-[14px] font-medium focus:outline-none"
                style={{
                  backgroundColor: palette.inputBackground,
                  color: palette.textPrimary,
                }}
              />
            </div>

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
                className="w-full h-[46px] px-4 rounded-xl text-[14px] font-medium focus:outline-none"
                style={{
                  backgroundColor: palette.inputBackground,
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
                className="w-full h-[46px] px-4 rounded-xl flex items-center justify-between border"
                style={{
                  backgroundColor: palette.inputBackground,
                  borderColor: palette.primary,
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

            {/* Password Checklist (Exact Image 2.4) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-2 text-[12px]">
                {hasMin8 ? (
                  <Check size={14} style={{ color: palette.primary }} />
                ) : (
                  <X size={14} className="text-red-500" />
                )}
                <span style={{ color: palette.textSecondary }}>
                  Minimum 8 characters
                </span>
              </div>
              <div className="flex items-center gap-2 text-[12px]">
                {hasNumber ? (
                  <Check size={14} style={{ color: palette.primary }} />
                ) : (
                  <X size={14} className="text-red-500" />
                )}
                <span style={{ color: palette.textSecondary }}>
                  Atleast 1 number (1-9)
                </span>
              </div>
              <div className="flex items-center gap-2 text-[12px]">
                {hasLetter ? (
                  <Check size={14} style={{ color: palette.primary }} />
                ) : (
                  <X size={14} className="text-red-500" />
                )}
                <span style={{ color: palette.textSecondary }}>
                  Atleast lowercase or uppercase letters
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setStep('verify_email');
                onTriggerToast?.('Verification code sent to ' + email);
              }}
              className="w-full h-[50px] rounded-full text-[15px] font-bold shadow-sm transition active:scale-98 cursor-pointer mt-2"
              style={{
                backgroundColor: palette.primary,
                color: palette.primaryText,
              }}
            >
              Register
            </button>

            <div className="text-center">
              <span
                className="text-[13px] font-medium"
                style={{ color: palette.textSecondary }}
              >
                Have an account?{' '}
              </span>
              <button
                type="button"
                onClick={onOpenSignIn}
                className="text-[13px] font-bold cursor-pointer hover:underline"
                style={{ color: palette.primary }}
              >
                Sign In
              </button>
            </div>
          </div>

          <div className="text-center pt-6">
            <p
              className="text-[12px]"
              style={{ color: palette.textSecondary }}
            >
              By clicking Register, you agree to our
            </p>
            <p
              className="text-[12px] font-bold mt-0.5"
              style={{ color: palette.primary }}
            >
              Terms, Data Policy.
            </p>
          </div>
        </div>
      )}

      {/* STEP 2 & 4: VERIFICATION EMAIL / PHONE WITH PURPLE NUMPAD (2.5 & 2.7) */}
      {(step === 'verify_email' || step === 'verify_phone') && (
        <div className="flex-1 flex flex-col justify-between pt-4">
          <div className="px-5 text-center space-y-3">
            <h1
              className="text-[23px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              {step === 'verify_email'
                ? 'Verification Email'
                : 'Verification Phone'}
            </h1>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: palette.textSecondary }}
            >
              Please enter the code we just sent to{' '}
              {step === 'verify_email' ? 'email' : 'phone number'}{' '}
              <span
                className="font-semibold block mt-0.5"
                style={{ color: palette.textPrimary }}
              >
                {step === 'verify_email'
                  ? 'Johndoe@gmail.com'
                  : '(+20) 123477092 299'}
              </span>
            </p>

            {/* 4 OTP Boxes */}
            <div className="flex items-center justify-center gap-3 py-3">
              {otpDigits.map((digit, i) => {
                const isFocused = i === 3 || digit === '';
                return (
                  <div
                    key={i}
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-[20px] font-extrabold border transition"
                    style={{
                      backgroundColor: palette.inputBackground,
                      borderColor: isFocused ? palette.primary : 'transparent',
                      color: palette.textPrimary,
                    }}
                  >
                    {digit || (
                      <span
                        className="w-0.5 h-6 animate-pulse"
                        style={{ backgroundColor: palette.primary }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-[12px]">
              <span style={{ color: palette.textSecondary }}>
                If you didn’t receive a code?{' '}
              </span>
              <button
                type="button"
                onClick={() => {
                  setOtpDigits(['2', '8', '5', '9']);
                  onTriggerToast?.('Resent verification code');
                }}
                className="font-bold cursor-pointer"
                style={{ color: palette.primary }}
              >
                Resend
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (step === 'verify_email') {
                  setStep('phone_input');
                } else {
                  setStep('congrats');
                }
              }}
              className="w-full h-[50px] rounded-full text-[15px] font-bold shadow-sm cursor-pointer mt-2"
              style={{
                backgroundColor: palette.primary,
                color: palette.primaryText,
              }}
            >
              Continue
            </button>
          </div>

          {/* Bottom Purple Numeric Keypad (Exact Image 2.5, 2.6, 2.7) */}
          <div
            className="mt-6 pt-5 pb-6 px-6 grid grid-cols-3 gap-y-5 text-center"
            style={{
              backgroundColor: palette.primary,
              color: palette.primaryText,
            }}
          >
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map(
              (num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeyPress(num)}
                  className="h-11 text-[20px] font-bold rounded-xl hover:bg-white/10 active:scale-95 transition cursor-pointer"
                >
                  {num}
                </button>
              )
            )}
            <button
              type="button"
              onClick={handleBackspace}
              className="h-11 flex items-center justify-center rounded-xl hover:bg-white/10 active:scale-95 transition cursor-pointer"
            >
              <Delete size={20} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: INPUT PHONE NUMBER (Exact Image 2.6) */}
      {step === 'phone_input' && (
        <div className="flex-1 flex flex-col justify-between pt-4">
          <div className="px-5 space-y-4">
            <div className="text-center">
              <h1
                className="text-[23px] font-extrabold"
                style={{ color: palette.textPrimary }}
              >
                Phone Number
              </h1>
              <p
                className="text-[13px] mt-1 leading-relaxed"
                style={{ color: palette.textSecondary }}
              >
                Please enter your phone number, so we can more easily deliver
                your order
              </p>
            </div>

            <div className="space-y-1.5 pt-2">
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] font-semibold focus:outline-none"
                  style={{ color: palette.textPrimary }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep('verify_phone')}
              className="w-full h-[50px] rounded-full text-[15px] font-bold shadow-sm cursor-pointer mt-4"
              style={{
                backgroundColor: palette.primary,
                color: palette.primaryText,
              }}
            >
              Continue
            </button>
          </div>

          {/* Bottom Purple Numeric Keypad */}
          <div
            className="mt-6 pt-5 pb-6 px-6 grid grid-cols-3 gap-y-5 text-center"
            style={{
              backgroundColor: palette.primary,
              color: palette.primaryText,
            }}
          >
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map(
              (num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeyPress(num)}
                  className="h-11 text-[20px] font-bold rounded-xl hover:bg-white/10 active:scale-95 transition cursor-pointer"
                >
                  {num}
                </button>
              )
            )}
            <button
              type="button"
              onClick={handleBackspace}
              className="h-11 flex items-center justify-center rounded-xl hover:bg-white/10 active:scale-95 transition cursor-pointer"
            >
              <Delete size={20} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: CONGRATULATION! (Exact Image 2.8) */}
      {step === 'congrats' && (
        <div className="flex-1 px-6 flex flex-col items-center justify-center text-center space-y-4">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center relative mb-2"
            style={{ backgroundColor: palette.primarySoft }}
          >
            <Sparkles size={48} style={{ color: palette.primary }} />
          </div>
          <h1
            className="text-[24px] font-extrabold"
            style={{ color: palette.textPrimary }}
          >
            Congratulation!
          </h1>
          <p
            className="text-[14px] leading-relaxed max-w-[260px]"
            style={{ color: palette.textSecondary }}
          >
            your account is complete, please enjoy the best menu from us.
          </p>
          <button
            type="button"
            onClick={() => {
              onTriggerToast?.('Account verified! Welcome to Bazar');
              onCompleteSignUp?.();
            }}
            className="w-full h-[50px] rounded-full text-[15px] font-bold shadow-sm cursor-pointer mt-4"
            style={{
              backgroundColor: palette.primary,
              color: palette.primaryText,
            }}
          >
            Get Started
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUpVarient1;
