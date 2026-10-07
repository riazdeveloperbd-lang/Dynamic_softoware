import React, { useState } from 'react';
import { ArrowLeft, Bell, MapPin, Navigation } from 'lucide-react';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface SetLocationVarient1Props {
  variant?: BookStoreVariantId;
  onBack: () => void;
  onGoToNotifications: () => void;
}

export const SetLocationVarient1: React.FC<SetLocationVarient1Props> = ({
  variant = 'varient_1',
  onBack,
  onGoToNotifications,
}) => {
  const { palette, activeFont, deliveryAddress, setDeliveryAddress } =
    useBookStoreDesignSystem();
  const scopeStyle = getBookStoreThemeScopeStyle(palette, activeFont);

  const [step, setStep] = useState<'map' | 'form'>('map');
  const [formState, setFormState] = useState(deliveryAddress);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setDeliveryAddress({
      ...formState,
      streetTitle: `${formState.building || 'Utama Street'} No.20`,
      fullAddress: `${formState.avenue}, ${formState.block}, ${formState.city}, ${formState.governorate}`,
    });
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onBack();
    }, 600);
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
      {/* Top Bar */}
      <div className="flex items-center justify-between py-2.5 mb-2">
        <button
          onClick={() => (step === 'form' ? setStep('map') : onBack())}
          className="w-9 h-9 rounded-full flex items-center justify-center -ml-1.5"
          style={{ color: palette.textPrimary }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-[18px] font-bold tracking-tight" style={{ fontFamily: activeFont.headingFont }}>
          Location
        </h1>
        <button
          onClick={onGoToNotifications}
          className="w-9 h-9 rounded-full flex items-center justify-center relative"
          style={{ color: palette.textPrimary }}
        >
          <Bell className="w-5 h-5" />
          <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2 right-2" />
        </button>
      </div>

      {step === 'map' ? (
        /* 4.1 Home - Set Location.png */
        <div className="flex-1 flex flex-col">
          {/* Interactive Map Preview */}
          <div className="relative h-56 rounded-2xl overflow-hidden border mb-5" style={{ borderColor: palette.border }}>
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=900&q=80"
              alt="NYC Dumbo Map"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex flex-col items-center">
                <div
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md mb-1"
                  style={{ backgroundColor: palette.primary, color: '#FFFFFF' }}
                >
                  Dumbo, NY
                </div>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: palette.primary, color: '#FFFFFF' }}
                >
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Detail Address Card */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-[15px] font-bold">Detail Address</h3>
            <Navigation className="w-4 h-4" style={{ color: palette.primary }} />
          </div>

          <div className="flex items-start gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: palette.primarySoft, color: palette.primary }}
            >
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold">{formState.streetTitle}</h4>
              <p className="text-[12px] leading-relaxed mt-0.5" style={{ color: palette.textSecondary }}>
                {formState.fullAddress}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t mb-6" style={{ borderColor: palette.border }}>
            <h4 className="text-[14px] font-bold mb-3">Save Address As</h4>
            <div className="flex items-center gap-2.5">
              {(['Home', 'Offices'] as const).map((tag) => {
                const isSelected = formState.tag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setFormState((prev) => ({ ...prev, tag }))}
                    className="px-4 py-1.5 rounded-full text-[12px] font-bold border transition-all"
                    style={{
                      backgroundColor: isSelected ? palette.primarySoft : 'transparent',
                      borderColor: isSelected ? palette.primary : palette.border,
                      color: isSelected ? palette.primary : palette.textSecondary,
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-auto space-y-2.5">
            <button
              onClick={() => setStep('form')}
              className="w-full py-3 rounded-full text-[13px] font-bold border"
              style={{ borderColor: palette.border, color: palette.textPrimary }}
            >
              Edit Full Address Fields
            </button>
            <button
              onClick={handleSave}
              className="w-full py-3.5 rounded-full text-[15px] font-bold"
              style={{ backgroundColor: palette.primary, color: palette.primaryText }}
            >
              {savedNotice ? 'Location Confirmed ✓' : 'Confirmation'}
            </button>
          </div>
        </div>
      ) : (
        /* 4.2 Home - Set Location.png Form */
        <div className="flex-1 flex flex-col space-y-3.5">
          {[
            { key: 'phone', label: 'Phone', val: '(+1) 234 567 890' },
            { key: 'governorate', label: 'Governorate', val: formState.governorate },
            { key: 'city', label: 'City', val: formState.city },
            { key: 'block', label: 'Block', val: formState.block },
            { key: 'building', label: 'Building name/Plot number', val: formState.building },
            { key: 'floor', label: 'Floor', val: formState.floor },
            { key: 'flat', label: 'Flat', val: formState.flat },
            { key: 'avenue', label: 'Avenue', val: formState.avenue },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-[12px] font-bold mb-1">{field.label}</label>
              <input
                type="text"
                value={(formState as any)[field.key] ?? field.val}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
                placeholder={field.label}
                className="w-full px-4 py-2.5 rounded-xl text-[13px] outline-none border"
                style={{
                  backgroundColor: palette.inputBackground,
                  borderColor: palette.border,
                  color: palette.textPrimary,
                }}
              />
            </div>
          ))}

          <button
            onClick={handleSave}
            className="w-full py-3.5 rounded-full text-[15px] font-bold mt-4"
            style={{ backgroundColor: palette.primary, color: palette.primaryText }}
          >
            Confirmation
          </button>
        </div>
      )}
    </div>
  );
};

export default SetLocationVarient1;
