import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  AlertCircle,
  Phone,
  MapPin,
  User,
  ShieldCheck,
  Code2,
  FileCheck2,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface PanjabiStoreExpressCodSectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

// Valid 11-digit Bangladeshi operator prefixes: 013, 014, 015, 016, 017, 018, 019
const BD_PHONE_REGEX = /^01[3-9]\d{8}$/;

export const PanjabiStoreExpressCodSection: React.FC<
  PanjabiStoreExpressCodSectionProps
> = ({ title, subtitle, variant }) => {
  const [customerName, setCustomerName] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [deliveryZone, setDeliveryZone] = useState<'inside_dhaka' | 'outside_dhaka'>(
    'inside_dhaka'
  );
  const [fullAddress, setFullAddress] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<'M' | 'L' | 'XL' | 'XXL'>('L');
  const [selectedColor, setSelectedColor] = useState<string>(
    'Deep Black (ডিপ ব্ল্যাক)'
  );
  const [selectedProductTitle, setSelectedProductTitle] = useState<string>(
    'AURA Royal Kabli Collection 2026 — Executive Cotton Edition'
  );
  const [unitPrice, setUnitPrice] = useState<number>(1990);
  const [quantity, setQuantity] = useState<number>(1);
  const [courierPartner, setCourierPartner] = useState<'steadfast' | 'pathao'>(
    'steadfast'
  );
  const [showCourierJson, setShowCourierJson] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [invoiceId, setInvoiceId] = useState<string>('AURA-2026-8492');

  // Sync with Hero or Size Guide selections
  useEffect(() => {
    const handleVariantSelect = (e: Event) => {
      const customEv = e as CustomEvent<{
        productTitle: string;
        colorName: string;
        size: 'M' | 'L' | 'XL' | 'XXL';
        unitPrice: number;
      }>;
      if (customEv.detail) {
        setSelectedProductTitle(customEv.detail.productTitle);
        setSelectedColor(customEv.detail.colorName);
        setSelectedSize(customEv.detail.size);
        setUnitPrice(customEv.detail.unitPrice);
        setOrderConfirmed(false);
      }
    };

    const handleSizeOnlySelect = (e: Event) => {
      const customEv = e as CustomEvent<{
        size: 'M' | 'L' | 'XL' | 'XXL';
      }>;
      if (customEv.detail?.size) {
        setSelectedSize(customEv.detail.size);
        setOrderConfirmed(false);
      }
    };

    window.addEventListener('aura:select-variant', handleVariantSelect);
    window.addEventListener('aura:select-size-only', handleSizeOnlySelect);
    return () => {
      window.removeEventListener('aura:select-variant', handleVariantSelect);
      window.removeEventListener('aura:select-size-only', handleSizeOnlySelect);
    };
  }, []);

  const deliveryCharge = deliveryZone === 'inside_dhaka' ? 70 : 130;
  const subtotalAmount = unitPrice * quantity;
  const totalCodPayable = subtotalAmount + deliveryCharge;

  const cleanPhoneDigits = mobileNumber.replace(/[\s-]/g, '');
  const isPhoneValid = BD_PHONE_REGEX.test(cleanPhoneDigits);

  // Pre-structured Courier API JSON Payload (Steadfast Courier / Pathao Courier API)
  const courierApiPayload = {
    courier_provider:
      courierPartner === 'steadfast'
        ? 'Steadfast Courier API v2'
        : 'Pathao Merchant Hermes API',
    invoice: invoiceId,
    recipient_name: customerName || 'Md. Tanvir Ahmed',
    recipient_phone: cleanPhoneDigits || '01711948200',
    recipient_address:
      fullAddress || 'House 14, Road 7, Dhanmondi, Dhaka-1209',
    delivery_area:
      deliveryZone === 'inside_dhaka'
        ? 'Inside Dhaka (৳70)'
        : 'Outside Dhaka (৳130)',
    cod_amount: totalCodPayable,
    item_description: `${selectedProductTitle} | Color: ${selectedColor} | Size: ${selectedSize} | Qty: ${quantity}`,
    note: 'Allow customer to inspect fabric & size in front of delivery man before paying.',
  };

  const handleConfirmCodOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(null);

    if (!BD_PHONE_REGEX.test(cleanPhoneDigits)) {
      setPhoneError(
        'অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (013, 014, 015, 016, 017, 018, 019 দিয়ে শুরু)।'
      );
      return;
    }

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setInvoiceId(`AURA-2026-${randomCode}`);
    setOrderConfirmed(true);
  };

  return (
    <section
      id="aura-cod-checkout"
      className="py-14 sm:py-20 border-b scroll-mt-20"
      style={{
        backgroundColor: variant === 'varient_3' ? '#111827' : '#FAF8F5',
        borderColor: variant === 'varient_3' ? '#1F2937' : '#E5E7EB',
        color: variant === 'varient_3' ? '#FFFDF9' : '#1F2937',
        fontFamily: "'Plus Jakarta Sans', 'Hind Siliguri', sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl border-2 p-6 sm:p-10 shadow-2xl"
          style={{
            backgroundColor: '#FFFDF9',
            borderColor: '#0F5132',
            color: '#1F2937',
          }}
        >
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2.5 pb-8 border-b border-[#E5E7EB]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F5132] text-white text-xs font-extrabold">
              <Truck size={14} />
              <span>১০০% ক্যাশ অন ডেলিভারি • ১ টাকাও অগ্রিম দিতে হবে না</span>
            </div>

            <EditableText
              id="aura_cod_form_header"
              defaultText={
                title || 'অর্ডার কনফার্ম করতে নিচের ফর্মটি পূরণ করুন'
              }
              as="h2"
              className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111827]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            />

            <EditableText
              id="aura_cod_form_subheader"
              defaultText={
                subtitle ||
                'কোনো অ্যাকাউন্ট বা লগইন করার প্রয়োজন নেই — মাত্র ৩০ সেকেন্ডে আপনার নাম, ঠিকানা ও মোবাইল নম্বর দিয়ে অর্ডার সম্পন্ন করুন।'
              }
              as="p"
              className="text-xs sm:text-sm text-neutral-600"
            />
          </div>

          {orderConfirmed ? (
            <div className="py-8 max-w-2xl mx-auto space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#0F5132] text-white flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 size={34} />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-[#0F5132]/15 text-[#0F5132] font-mono text-xs font-extrabold">
                  ORDER CONFIRMED • INVOICE #{invoiceId}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
                  ধন্যবাদ {customerName}! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  আমাদের প্রতিনিধি শীঘ্রই <strong>{cleanPhoneDigits}</strong> নম্বরে কল করে অর্ডারটি ভেরিফাই করবেন এবং{' '}
                  <strong>
                    {courierPartner === 'steadfast' ? 'Steadfast Courier' : 'Pathao Courier'}
                  </strong>{' '}
                  এর মাধ্যমে প্রোডাক্ট পাঠানো হবে।
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5E7EB] text-left text-xs sm:text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-500">পণ্য (Product):</span>
                  <span className="font-extrabold text-[#111827]">
                    {selectedProductTitle} ({quantity} pcs)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">কালার ও সাইজ (Color &amp; Size):</span>
                  <span className="font-extrabold text-[#0F5132]">
                    {selectedColor} — Size {selectedSize}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">ডেলিভারি এরিয়া:</span>
                  <span className="font-bold">
                    {deliveryZone === 'inside_dhaka'
                      ? 'ঢাকার ভেতরে (৳৭০)'
                      : 'ঢাকার বাইরে (৳১৩০)'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E5E7EB] text-base font-extrabold text-[#E05242]">
                  <span>ডেলিভারি ম্যানকে পরিশোধযোগ্য সর্বমোট টাকা:</span>
                  <span>৳{totalCodPayable.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOrderConfirmed(false)}
                className="px-6 py-3 rounded-xl bg-[#111827] text-white text-xs font-extrabold cursor-pointer"
              >
                নতুন আরেকটি অর্ডার করুন / তথ্য পরিবর্তন করুন
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleConfirmCodOrder}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start"
            >
              {/* LEFT COLUMN (7 cols): Customer Input Fields */}
              <div className="lg:col-span-7 space-y-5">
                {/* 1. আপনার নাম (Full Name) */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-extrabold text-[#111827]">
                    ১. আপনার নাম (Full Name) <span className="text-[#E05242]">*</span>
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="আপনার সম্পূর্ণ নাম লিখুন (যেমন: তানভীর আহমেদ)"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E7EB] text-sm font-semibold text-[#111827] focus:outline-none focus:border-[#0F5132]"
                    />
                  </div>
                </div>

                {/* 2. মোবাইল নম্বর (11-digit BD Mobile Number with Instant Validation) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs sm:text-sm font-extrabold text-[#111827]">
                      ২. মোবাইল নম্বর (১১ ডিজিট) <span className="text-[#E05242]">*</span>
                    </label>
                    {cleanPhoneDigits.length > 0 && (
                      <span
                        className={`text-[11px] font-mono font-bold ${
                          isPhoneValid ? 'text-[#0F5132]' : 'text-[#E05242]'
                        }`}
                      >
                        {isPhoneValid
                          ? '✓ সঠিক ১১ ডিজিট নম্বর'
                          : `${cleanPhoneDigits.length}/11 ডিজিট (017/018/019/013/014/016/015)`}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                      type="tel"
                      required
                      maxLength={14}
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                        if (phoneError) setPhoneError(null);
                      }}
                      placeholder="017XXXXXXXX (১১ ডিজিটের সচল নম্বর)"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E7EB] text-sm font-mono font-bold text-[#111827] focus:outline-none focus:border-[#0F5132]"
                    />
                  </div>
                  {phoneError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                      <AlertCircle size={15} className="shrink-0" />
                      <span>{phoneError}</span>
                    </div>
                  )}
                </div>

                {/* 3. ডেলিভারি এরিয়া (Delivery Location Radio Toggle Buttons) */}
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-extrabold text-[#111827]">
                    ৩. ডেলিভারি এরিয়া নির্বাচন করুন (Delivery Location){' '}
                    <span className="text-[#E05242]">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryZone('inside_dhaka')}
                      className={`p-4 rounded-2xl border-2 text-left transition flex items-center justify-between cursor-pointer ${
                        deliveryZone === 'inside_dhaka'
                          ? 'border-[#0F5132] bg-[#0F5132]/10 text-[#0F5132]'
                          : 'border-[#E5E7EB] bg-[#FAF8F5] text-[#1F2937]'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-extrabold">ঢাকার ভেতরে (Inside Dhaka)</div>
                        <div className="text-[11px] opacity-75">২৪-৪৮ ঘণ্টায় হোম ডেলিভারি</div>
                      </div>
                      <span className="text-base font-mono font-extrabold">৳৭০</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryZone('outside_dhaka')}
                      className={`p-4 rounded-2xl border-2 text-left transition flex items-center justify-between cursor-pointer ${
                        deliveryZone === 'outside_dhaka'
                          ? 'border-[#0F5132] bg-[#0F5132]/10 text-[#0F5132]'
                          : 'border-[#E5E7EB] bg-[#FAF8F5] text-[#1F2937]'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-extrabold">ঢাকার বাইরে (Outside Dhaka)</div>
                        <div className="text-[11px] opacity-75">সারা বাংলাদেশে হোম ডেলিভারি</div>
                      </div>
                      <span className="text-base font-mono font-extrabold">৳১৩০</span>
                    </button>
                  </div>
                </div>

                {/* 4. সম্পূর্ণ ঠিকানা (Full Delivery Address Textarea) */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-extrabold text-[#111827]">
                    ৪. সম্পূর্ণ ঠিকানা (Full Delivery Address){' '}
                    <span className="text-[#E05242]">*</span>
                  </label>
                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-3.5 top-3.5 text-neutral-400"
                    />
                    <textarea
                      rows={3}
                      required
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      placeholder="বাসা নং, রোড নং, এলাকা, থানা এবং জেলা লিখুন (House No, Road No, Thana, District)..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E5E7EB] text-sm font-semibold text-[#111827] focus:outline-none focus:border-[#0F5132]"
                    />
                  </div>
                </div>

                {/* 5. পছন্দের সাইজ ও কালার (Select Size & Color Radio Selector) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-extrabold text-[#111827]">
                      ৫. পছন্দের সাইজ (Select Size)
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['M', 'L', 'XL', 'XXL'] as const).map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`py-2.5 rounded-xl font-extrabold text-xs border transition cursor-pointer ${
                            selectedSize === sz
                              ? 'bg-[#0F5132] text-white border-[#0F5132]'
                              : 'bg-[#FAF8F5] text-[#111827] border-[#E5E7EB]'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-extrabold text-[#111827]">
                      কালার ও পরিমাণ (Color &amp; Qty)
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="flex-1 px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E7EB] text-xs font-extrabold text-[#111827]"
                      >
                        <option value="Deep Black (ডিপ ব্ল্যাক)">Deep Black (ডিপ ব্ল্যাক)</option>
                        <option value="Forest Green (ফরেস্ট গ্রিন)">Forest Green (ফরেস্ট গ্রিন)</option>
                        <option value="Ivory White (আইভরি হোয়াইট)">Ivory White (আইভরি হোয়াইট)</option>
                        <option value="Midnight Blue (মিডনাইট ব্লু)">Midnight Blue (মিডনাইট ব্লু)</option>
                      </select>

                      <div className="flex items-center border border-[#E5E7EB] rounded-xl bg-[#FAF8F5]">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="px-2.5 py-2 text-xs font-extrabold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-extrabold">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                          className="px-2.5 py-2 text-xs font-extrabold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (5 cols): Live Price Summary Box + Big Emerald Submit CTA + Courier Payload */}
              <div className="lg:col-span-5 space-y-5">
                <div
                  className="rounded-3xl p-6 space-y-5 border"
                  style={{
                    backgroundColor: '#111827',
                    borderColor: '#1F2937',
                    color: '#FFFDF9',
                  }}
                >
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <span className="text-sm font-extrabold">
                      অর্ডার সামারি (Live Price Summary)
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-[#0F5132] text-[#6EE7B7] font-mono text-[11px] font-bold">
                      COD READY
                    </span>
                  </div>

                  {/* Selected Product Breakdown */}
                  <div className="p-3.5 rounded-2xl bg-[#1F2937] border border-neutral-700 space-y-1">
                    <div className="text-xs font-extrabold text-white">
                      {selectedProductTitle}
                    </div>
                    <div className="text-[11px] text-neutral-300 flex items-center justify-between">
                      <span>
                        কালার: {selectedColor} | সাইজ: <strong>{selectedSize}</strong>
                      </span>
                      <span className="font-mono font-bold text-[#6EE7B7]">
                        × {quantity}টি
                      </span>
                    </div>
                  </div>

                  {/* Exact Formula Readout Box */}
                  <div className="space-y-3 text-sm pt-1">
                    <div className="flex items-center justify-between py-2 border-b border-neutral-800">
                      <span className="text-neutral-300">পণ্যের দাম (Product Price):</span>
                      <span className="font-mono font-bold text-white">
                        ৳{subtotalAmount.toLocaleString()} (৳১,৯৯০)
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-neutral-800">
                      <span className="text-neutral-300">
                        ডেলিভারি চার্জ ({deliveryZone === 'inside_dhaka' ? 'ঢাকার ভেতরে' : 'ঢাকার বাইরে'}):
                      </span>
                      <span className="font-mono font-bold text-[#FDE68A]">
                        ৳{deliveryCharge} {deliveryZone === 'inside_dhaka' ? '(৳৭০)' : '(৳১৩০)'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 text-lg sm:text-xl font-extrabold">
                      <span className="text-[#6EE7B7]">সর্বমোট টাকা (Total Payable):</span>
                      <span className="font-mono text-2xl text-white">
                        ৳{totalCodPayable.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Big Emerald Green Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 px-5 rounded-2xl text-sm sm:text-base font-extrabold text-white shadow-xl flex items-center justify-center gap-2.5 transition hover:opacity-95 cursor-pointer"
                    style={{ backgroundColor: '#0F5132' }}
                  >
                    <ShoppingBag size={18} />
                    <span>ক্যাশ অন ডেলিভারিতে অর্ডার কনফার্ম করুন</span>
                  </button>

                  <div className="text-[11px] text-center text-neutral-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#6EE7B7]" />
                    <span>ডেলিভারি ম্যানের সামনে প্রোডাক্ট খুলে দেখে টাকা পরিশোধ করবেন</span>
                  </div>
                </div>

                {/* Courier API Payload Inspector (Steadfast / Pathao Courier Integration) */}
                <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAF8F5] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-[#111827]">
                      <FileCheck2 size={15} className="text-[#0F5132]" />
                      <span>Courier Auto-Booking (Steadfast / Pathao)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowCourierJson(!showCourierJson)}
                      className="text-[11px] font-mono font-bold text-[#0F5132] underline flex items-center gap-1 cursor-pointer"
                    >
                      <Code2 size={12} />
                      <span>{showCourierJson ? 'Hide Payload' : 'View API JSON'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCourierPartner('steadfast')}
                      className={`py-2 px-3 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                        courierPartner === 'steadfast'
                          ? 'bg-[#0F5132] text-white border-[#0F5132]'
                          : 'bg-white text-[#1F2937] border-[#E5E7EB]'
                      }`}
                    >
                      Steadfast Courier
                    </button>
                    <button
                      type="button"
                      onClick={() => setCourierPartner('pathao')}
                      className={`py-2 px-3 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                        courierPartner === 'pathao'
                          ? 'bg-[#E05242] text-white border-[#E05242]'
                          : 'bg-white text-[#1F2937] border-[#E5E7EB]'
                      }`}
                    >
                      Pathao Courier API
                    </button>
                  </div>

                  {showCourierJson && (
                    <pre className="p-3 rounded-xl bg-[#111827] text-[#6EE7B7] font-mono text-[10px] overflow-x-auto leading-relaxed">
                      {JSON.stringify(courierApiPayload, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
