import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Users,
  Calendar,
  Coffee,
  Package,
  Apple,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Sliders,
  DollarSign,
  TrendingDown,
  ShieldCheck,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface ShiftPantryCalculatorSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

type CategoryPreference = 'snacks_only' | 'snacks_coffee' | 'full_pantry';

export const ShiftPantryCalculatorSection: React.FC<
  ShiftPantryCalculatorSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [headcount, setHeadcount] = useState<number>(45);
  const [daysInOffice, setDaysInOffice] = useState<number>(3);
  const [categoryPref, setCategoryPref] =
    useState<CategoryPreference>('snacks_coffee');
  const [includeColdBrewAddOn, setIncludeColdBrewAddOn] =
    useState<boolean>(false);
  const [customPlanLockedBanner, setCustomPlanLockedBanner] =
    useState<boolean>(false);

  const forestGreen = primaryColor || '#1B4332';
  const warmAmber = '#D97706';
  const isBrutalist = variant === 'varient_3';

  // Live calculation engine
  const planRecommendation = useMemo(() => {
    const monthlyEmployeeDays = headcount * daysInOffice * 4;

    // Total monthly snack servings (approx 1.35 servings per employee in-office day)
    const monthlySnackServings = Math.round(monthlyEmployeeDays * 1.35);

    // Base cost per employee in-office day depending on category
    const baseRatePerDay =
      categoryPref === 'snacks_only'
        ? 1.75
        : categoryPref === 'snacks_coffee'
        ? 2.25
        : 2.85;

    // Volume tier discount for larger offices
    const volumeDiscountFactor =
      headcount >= 150 ? 0.86 : headcount >= 75 ? 0.92 : 1.0;

    const coldBrewMonthly = includeColdBrewAddOn
      ? Math.round(headcount * 6.5)
      : 0;

    const rawMonthlyTotal =
      monthlyEmployeeDays * baseRatePerDay * volumeDiscountFactor +
      coldBrewMonthly;

    const estimatedMonthlyCost = Math.round(rawMonthlyTotal / 10) * 10;
    const costPerEmployeePerDay = (
      estimatedMonthlyCost / Math.max(1, monthlyEmployeeDays)
    ).toFixed(2);

    // Coffee bag math (1 bag = 12oz / ~22 cups)
    const coffeeBagsCount =
      categoryPref === 'snacks_only'
        ? 0
        : Math.max(2, Math.ceil((monthlyEmployeeDays * 0.85) / 24));

    // Recommended crate configuration label
    const crateTierName =
      headcount <= 25
        ? '1x Brain Fuel 150-Count Box'
        : headcount <= 65
        ? '2x Brain Fuel Pro Crates (300 Snacks)'
        : headcount <= 130
        ? '4x Hybrid Floor Crates (650 Snacks)'
        : 'Enterprise Multi-Floor Autopilot Plan';

    const coffeeTierLabel =
      categoryPref === 'snacks_only'
        ? 'No Coffee Included (Snacks Only)'
        : `${coffeeBagsCount} Bags Artisan Whole-Bean Espresso (${
            coffeeBagsCount * 22
          }+ Cups)`;

    const produceExtrasLabel =
      categoryPref === 'full_pantry'
        ? 'Organic Fruit Basket + Barista Oat/Almond Milk & Compostable Cups'
        : includeColdBrewAddOn
        ? 'Includes 24-Can Nitro Cold Brew & Barista Oat Milk Pack'
        : 'Includes Shelf-Ready Display Caddies & Allergen Labels';

    // Estimated savings vs ad-hoc Instacart/Costco runs
    const retailInstacartComparison = Math.round(estimatedMonthlyCost * 1.28);
    const monthlySavings = retailInstacartComparison - estimatedMonthlyCost;

    return {
      monthlyEmployeeDays,
      monthlySnackServings,
      estimatedMonthlyCost,
      costPerEmployeePerDay,
      coffeeBagsCount,
      crateTierName,
      coffeeTierLabel,
      produceExtrasLabel,
      monthlySavings,
      volumeDiscountPct: Math.round((1 - volumeDiscountFactor) * 100),
    };
  }, [headcount, daysInOffice, categoryPref, includeColdBrewAddOn]);

  const handleLockInPlan = () => {
    // Dispatch custom event so the Curated Boxes / Checkout section can sync with the calculator
    window.dispatchEvent(
      new CustomEvent('shiftpantry:apply-calculator-plan', {
        detail: {
          headcount,
          daysInOffice,
          categoryPref,
          estimatedMonthlyCost: planRecommendation.estimatedMonthlyCost,
          crateTierName: planRecommendation.crateTierName,
          coffeeBagsCount: planRecommendation.coffeeBagsCount,
        },
      })
    );
    setCustomPlanLockedBanner(true);
    const checkoutEl = document.getElementById('shiftpantry-boxes');
    if (checkoutEl) {
      checkoutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="shiftpantry-calculator"
      className={`py-16 sm:py-24 scroll-mt-20 border-t transition-colors ${
        isDark
          ? 'bg-[#161F1B] text-stone-100 border-stone-800'
          : 'bg-[#F6F2E9] text-[#1F2937] border-[#E5E0D8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white"
            style={{ backgroundColor: forestGreen }}
          >
            <Calculator size={13} className="text-amber-300" />
            INTERACTIVE OFFICE SNACK & COFFEE VOLUME CALCULATOR
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            <EditableText
              id="shiftpantry_calc_title"
              defaultText={
                title || 'Right-Size Your Pantry for Your Hybrid Schedule'
              }
            />
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
            <EditableText
              id="shiftpantry_calc_subtitle"
              defaultText={
                subtitle ||
                'Never overpay for empty Fridays again. Slide your team headcount and in-office anchor days to calculate your exact monthly crate and specialty coffee volume.'
              }
            />
          </p>
        </div>

        {/* Main Split Calculator Card */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 overflow-hidden border shadow-xl ${
            isBrutalist
              ? 'rounded-none border-2 border-[#1F2937] shadow-[6px_6px_0px_#1B4332]'
              : 'rounded-3xl border-[#D8D0C2] dark:border-stone-800'
          } ${isDark ? 'bg-stone-900' : 'bg-white'}`}
        >
          {/* Left 7 Cols: Interactive Sliders & Toggles */}
          <div className="lg:col-span-7 p-6 sm:p-9 space-y-7">
            {/* Input 1: Team Headcount Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="shiftpantry-headcount-slider"
                  className="flex items-center gap-2 text-sm sm:text-base font-black"
                >
                  <Users size={18} style={{ color: forestGreen }} />
                  <span>1. Total Office Team Headcount</span>
                </label>
                <div className="flex items-center gap-2">
                  {planRecommendation.volumeDiscountPct > 0 && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-100 text-emerald-900">
                      {planRecommendation.volumeDiscountPct}% Volume Discount
                    </span>
                  )}
                  <span
                    className="px-3.5 py-1 rounded-xl text-sm sm:text-base font-black text-white"
                    style={{ backgroundColor: forestGreen }}
                  >
                    {headcount} Employees
                  </span>
                </div>
              </div>

              <input
                id="shiftpantry-headcount-slider"
                type="range"
                min={10}
                max={250}
                step={5}
                value={headcount}
                onChange={(e) => setHeadcount(Number(e.target.value))}
                className="w-full h-2.5 rounded-lg appearance-none cursor-pointer bg-stone-200 dark:bg-stone-700 accent-[#1B4332]"
              />

              <div className="flex justify-between text-[11px] font-bold text-stone-400">
                <span>10 Staff (Startup)</span>
                <span>50 Staff (Growth)</span>
                <span>125 Staff (Mid-Market)</span>
                <span>250+ Staff (Enterprise)</span>
              </div>
            </div>

            {/* Input 2: Average Days in Office per Week */}
            <div className="space-y-3 pt-2 border-t border-stone-200/80 dark:border-stone-800">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-sm sm:text-base font-black">
                  <Calendar size={18} style={{ color: warmAmber }} />
                  <span>2. Average Days in Office per Week (Hybrid Policy)</span>
                </span>
                <span
                  className="px-3 py-1 rounded-xl text-xs font-extrabold text-white"
                  style={{ backgroundColor: warmAmber }}
                >
                  {daysInOffice} {daysInOffice === 1 ? 'Day' : 'Days'} / Week
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((dayCount) => {
                  const isSelected = daysInOffice === dayCount;
                  const subTag =
                    dayCount === 1
                      ? ' Anchor Day'
                      : dayCount === 2
                      ? 'Tue / Thu'
                      : dayCount === 3
                      ? 'Tue–Thu Peak'
                      : dayCount === 4
                      ? 'Mon–Thu'
                      : 'Full Onsite';
                  return (
                    <button
                      key={dayCount}
                      type="button"
                      onClick={() => setDaysInOffice(dayCount)}
                      className={`p-3 rounded-2xl border text-center transition cursor-pointer ${
                        isSelected
                          ? 'border-2 text-white shadow-sm'
                          : isDark
                          ? 'border-stone-800 bg-stone-950 text-stone-300 hover:border-stone-700'
                          : 'border-[#E5E0D8] bg-[#FDFBF7] text-[#1F2937] hover:border-[#1B4332]'
                      }`}
                      style={
                        isSelected
                          ? {
                              backgroundColor: forestGreen,
                              borderColor: forestGreen,
                            }
                          : undefined
                      }
                    >
                      <span className="text-base sm:text-lg font-black block">
                        {dayCount}d
                      </span>
                      <span
                        className={`text-[10px] font-bold block mt-0.5 ${
                          isSelected ? 'text-amber-300' : 'text-stone-500'
                        }`}
                      >
                        {subTag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input 3: Category Preference */}
            <div className="space-y-3 pt-2 border-t border-stone-200/80 dark:border-stone-800">
              <span className="flex items-center gap-2 text-sm sm:text-base font-black">
                <Sliders size={18} style={{ color: forestGreen }} />
                <span>3. Select Breakroom Program Scope</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'snacks_only' as CategoryPreference,
                    title: 'Snacks Only',
                    subtitle: 'Protein bars, nuts, jerky & clean treats',
                    rate: '$1.75 / day',
                    icon: Package,
                  },
                  {
                    id: 'snacks_coffee' as CategoryPreference,
                    title: 'Snacks + Specialty Coffee',
                    subtitle: 'Adds freshly roasted whole-bean & espresso',
                    rate: '$2.25 / day · Most Popular',
                    icon: Coffee,
                  },
                  {
                    id: 'full_pantry' as CategoryPreference,
                    title: 'Full Pantry Experience',
                    subtitle: 'Adds organic fruit, oat milk & cold brew',
                    rate: '$2.85 / day · All-Inclusive',
                    icon: Apple,
                  },
                ].map((opt) => {
                  const Icon = opt.icon;
                  const active = categoryPref === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCategoryPref(opt.id)}
                      className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                        active
                          ? 'border-2 bg-[#1B4332]/5 dark:bg-emerald-950/40'
                          : isDark
                          ? 'border-stone-800 bg-stone-950/60 hover:border-stone-700'
                          : 'border-[#E5E0D8] bg-[#FDFBF7] hover:border-[#1B4332]/40'
                      }`}
                      style={
                        active ? { borderColor: forestGreen } : undefined
                      }
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                            style={{
                              backgroundColor: active ? forestGreen : warmAmber,
                            }}
                          >
                            <Icon size={16} />
                          </div>
                          {active && (
                            <span
                              className="px-2 py-0.5 rounded-full text-[10px] font-black text-white"
                              style={{ backgroundColor: forestGreen }}
                            >
                              SELECTED
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-black">
                          {opt.title}
                        </p>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                          {opt.subtitle}
                        </p>
                      </div>
                      <p
                        className="text-[11px] font-extrabold mt-3 pt-2 border-t border-stone-200/70 dark:border-stone-800"
                        style={{ color: active ? forestGreen : warmAmber }}
                      >
                        {opt.rate}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Add-on Checkbox */}
            <div className="pt-1 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#FDFBF7] dark:bg-stone-950 border border-[#E5E0D8] dark:border-stone-800">
              <label className="flex items-center gap-2.5 text-xs sm:text-sm font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeColdBrewAddOn}
                  onChange={(e) => setIncludeColdBrewAddOn(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#1B4332]"
                />
                <span>
                  Add Afternoon Energy Boost (Nitro Cold Brew Cans + Barista Oat Milk Case)
                </span>
              </label>
              <span className="text-xs font-extrabold" style={{ color: warmAmber }}>
                +$6.50 / employee / mo
              </span>
            </div>
          </div>

          {/* Right 5 Cols: Real-Time Output Blueprint Card */}
          <div
            className="lg:col-span-5 p-6 sm:p-9 text-white flex flex-col justify-between"
            style={{ backgroundColor: forestGreen }}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-4">
                <div>
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider text-white mb-1"
                    style={{ backgroundColor: warmAmber }}
                  >
                    REAL-TIME RECOMMENDATION
                  </span>
                  <h3 className="text-lg sm:text-xl font-black">
                    Custom Hybrid Pantry Blueprint
                  </h3>
                </div>
                <Sparkles size={22} className="text-amber-300 shrink-0" />
              </div>

              {/* Primary Monthly Investment Readout */}
              <div className="p-5 rounded-2xl bg-black/25 border border-white/15 space-y-3">
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase font-bold tracking-wider text-emerald-200">
                      Estimated Monthly Total
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl sm:text-4xl font-black text-white">
                        ${planRecommendation.estimatedMonthlyCost.toLocaleString()}
                      </span>
                      <span className="text-xs text-emerald-200 font-semibold">
                        / month (All-In Delivery)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black bg-amber-400 text-stone-950">
                      <DollarSign size={12} />
                      {planRecommendation.costPerEmployeePerDay} / staff / day
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-emerald-100">
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <TrendingDown size={14} className="text-amber-300" />
                    Savings vs. Instacart / Costco Runs:
                  </span>
                  <strong className="text-amber-300 font-black">
                    Save ${planRecommendation.monthlySavings}/mo
                  </strong>
                </div>
              </div>

              {/* Recommended Monthly Box & Coffee Breakdown */}
              <div className="space-y-3">
                <p className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                  Recommended Monthly Volume ({planRecommendation.monthlyEmployeeDays} Staff-Days):
                </p>

                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 flex items-start gap-3">
                  <Package size={18} className="text-amber-300 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-black text-white">
                      {planRecommendation.crateTierName}
                    </p>
                    <p className="text-emerald-100 mt-0.5">
                      ~{planRecommendation.monthlySnackServings} single-serve healthy snacks (Nut-Free, Vegan, Keto & GF partitioned)
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 flex items-start gap-3">
                  <Coffee size={18} className="text-amber-300 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-black text-white">
                      {planRecommendation.coffeeTierLabel}
                    </p>
                    <p className="text-emerald-100 mt-0.5">
                      Small-batch direct-trade beans roasted 48h prior to delivery
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-amber-300 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-black text-white">
                      Hospitality Extras & Cadence
                    </p>
                    <p className="text-emerald-100 mt-0.5">
                      {planRecommendation.produceExtrasLabel}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lock In CTA */}
            <div className="pt-6 space-y-3">
              <button
                type="button"
                onClick={handleLockInPlan}
                className="w-full py-4 px-6 rounded-2xl text-sm sm:text-base font-black text-stone-950 shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: '#F59E0B' }}
              >
                <span>Lock In This Custom Plan</span>
                <ArrowRight size={18} />
              </button>

              {customPlanLockedBanner && (
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-400/40 text-center text-xs font-bold text-emerald-200">
                  ✓ Custom plan synced! Review or customize your boxes below.
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[11px] text-emerald-100">
                <ShieldCheck size={14} className="text-amber-300" />
                <span>No long-term lock-in · Net-30 Invoice or Corporate Card</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
