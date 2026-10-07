import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Package,
  RefreshCw,
  Search,
  SlidersHorizontal,
  TrendingUp,
  X,
} from 'lucide-react';
import {
  getAdminThemeScopeStyle,
  useAdminDesignSystem,
} from '../../../styles/adminDesignSystem';

export type AdminScreenVariantId =
  | 'varient_1'
  | 'varient_2'
  | 'varient_3'
  | 'varient_4'
  | 'varient_5'
  | 'varient_6'
  | 'varient_7'
  | 'varient_8';

export interface OverviewVarient1Props {
  variant?: AdminScreenVariantId;
  onNavigateToOrders?: () => void;
  onNavigateToCustomers?: () => void;
  onNavigateToInventory?: () => void;
  onTriggerToast?: (msg: string) => void;
}

type TimeRangeKey = 'Today' | '7D' | '30D' | 'YTD';

interface DayMetric {
  day: string;
  pct: number;
  revenue: string;
  orders: number;
  aov: string;
  conv: string;
  peakWindow: string;
  note: string;
}

const PERIOD_METRICS: Record<
  TimeRangeKey,
  {
    grossRev: string;
    grossDelta: string;
    grossSub: string;
    netMargin: string;
    marginPct: string;
    aov: string;
    aovDelta: string;
    conv: string;
    convDelta: string;
    avgDay: string;
    days: DayMetric[];
  }
> = {
  Today: {
    grossRev: '$ 7,420',
    grossDelta: '+18.4%',
    grossSub: 'vs yesterday',
    netMargin: '$ 2,890',
    marginPct: '38.9%',
    aov: '$ 148.00',
    aovDelta: '+6.2%',
    conv: '3.68%',
    convDelta: '+0.5%',
    avgDay: 'Avg $7.4k/day',
    days: [
      { day: 'Mon', pct: 42, revenue: '$4.1k', orders: 28, aov: '$146.40', conv: '3.10%', peakWindow: '12:00 – 15:00 EST', note: 'Morning newsletter drop drove desktop checkouts.' },
      { day: 'Tue', pct: 55, revenue: '$5.3k', orders: 36, aov: '$147.20', conv: '3.35%', peakWindow: '14:00 – 17:00 EST', note: 'Steady mid-week replenishment from loyal members.' },
      { day: 'Wed', pct: 48, revenue: '$4.8k', orders: 32, aov: '$150.00', conv: '3.22%', peakWindow: '15:00 – 18:00 EST', note: 'Organic search traffic surge on core essentials.' },
      { day: 'Thu', pct: 64, revenue: '$6.1k', orders: 41, aov: '$148.70', conv: '3.50%', peakWindow: '17:00 – 20:00 EST', note: 'Early weekend preview links sent to VIP tier.' },
      { day: 'Fri', pct: 72, revenue: '$6.9k', orders: 47, aov: '$146.80', conv: '3.62%', peakWindow: '18:00 – 21:00 EST', note: 'Payday cart conversions peaked on mobile app.' },
      { day: 'Sat', pct: 92, revenue: '$7.4k', orders: 50, aov: '$148.00', conv: '3.68%', peakWindow: '18:00 – 21:00 EST', note: 'Peak sales: Saturday between 18:00 – 21:00 EST.' },
      { day: 'Sun', pct: 68, revenue: '$6.4k', orders: 43, aov: '$148.80', conv: '3.45%', peakWindow: '19:00 – 22:00 EST', note: 'Evening lookbook browse & restock reservations.' },
    ],
  },
  '7D': {
    grossRev: '$ 48,290',
    grossDelta: '+14.2%',
    grossSub: 'vs 7d',
    netMargin: '$ 18,420',
    marginPct: '38.1%',
    aov: '$ 142.50',
    aovDelta: '+5.8%',
    conv: '3.42%',
    convDelta: '+0.4%',
    avgDay: 'Avg $6.9k/day',
    days: [
      { day: 'Mon', pct: 54, revenue: '$5.6k', orders: 39, aov: '$143.50', conv: '3.18%', peakWindow: '13:00 – 16:00 EST', note: 'Direct access traffic led Monday opening volume.' },
      { day: 'Tue', pct: 62, revenue: '$6.4k', orders: 45, aov: '$142.20', conv: '3.29%', peakWindow: '14:00 – 17:00 EST', note: 'Instagram story product tags lifted AOV by +4.2%.' },
      { day: 'Wed', pct: 50, revenue: '$5.2k', orders: 37, aov: '$140.50', conv: '3.15%', peakWindow: '12:00 – 15:00 EST', note: 'Mid-week steady baseline with low return rate.' },
      { day: 'Thu', pct: 68, revenue: '$7.1k', orders: 50, aov: '$142.00', conv: '3.44%', peakWindow: '17:00 – 20:00 EST', note: 'VIP SMS push triggered 18 instant express orders.' },
      { day: 'Fri', pct: 75, revenue: '$7.8k', orders: 55, aov: '$141.80', conv: '3.56%', peakWindow: '18:00 – 21:30 EST', note: 'Friday capsule release achieved 94% sell-through.' },
      { day: 'Sat', pct: 95, revenue: '$9.2k', orders: 64, aov: '$143.75', conv: '3.82%', peakWindow: '18:00 – 21:00 EST', note: 'Peak sales: Saturday between 18:00 – 21:00 EST.' },
      { day: 'Sun', pct: 60, revenue: '$6.9k', orders: 48, aov: '$143.70', conv: '3.38%', peakWindow: '19:00 – 22:00 EST', note: 'Sunday evening repeat buyer re-orders.' },
    ],
  },
  '30D': {
    grossRev: '$ 194,800',
    grossDelta: '+21.6%',
    grossSub: 'vs 30d',
    netMargin: '$ 74,210',
    marginPct: '38.1%',
    aov: '$ 139.80',
    aovDelta: '+4.9%',
    conv: '3.55%',
    convDelta: '+0.6%',
    avgDay: 'Avg $6.5k/day',
    days: [
      { day: 'Mon', pct: 58, revenue: '$24.2k', orders: 172, aov: '$140.70', conv: '3.35%', peakWindow: '13:00 – 16:00 EST', note: '30D Monday aggregate across 4 weekly cycles.' },
      { day: 'Tue', pct: 65, revenue: '$27.1k', orders: 194, aov: '$139.60', conv: '3.48%', peakWindow: '14:00 – 18:00 EST', note: 'Strong Tuesday retention from Klaviyo flows.' },
      { day: 'Wed', pct: 56, revenue: '$23.4k', orders: 168, aov: '$139.20', conv: '3.30%', peakWindow: '15:00 – 18:00 EST', note: 'Consistent organic discovery traffic.' },
      { day: 'Thu', pct: 72, revenue: '$29.8k', orders: 213, aov: '$139.90', conv: '3.60%', peakWindow: '17:00 – 20:00 EST', note: 'Pre-weekend drop previews.' },
      { day: 'Fri', pct: 80, revenue: '$33.1k', orders: 236, aov: '$140.25', conv: '3.72%', peakWindow: '18:00 – 21:00 EST', note: 'High mobile Apple Pay express checkouts.' },
      { day: 'Sat', pct: 98, revenue: '$38.4k', orders: 274, aov: '$140.15', conv: '3.95%', peakWindow: '18:00 – 21:00 EST', note: 'Peak sales: Saturday between 18:00 – 21:00 EST.' },
      { day: 'Sun', pct: 66, revenue: '$28.8k', orders: 205, aov: '$140.40', conv: '3.50%', peakWindow: '19:00 – 22:00 EST', note: 'Weekend closeout orders.' },
    ],
  },
  YTD: {
    grossRev: '$ 1,482,900',
    grossDelta: '+34.8%',
    grossSub: 'vs LY',
    netMargin: '$ 569,400',
    marginPct: '38.4%',
    aov: '$ 144.20',
    aovDelta: '+8.1%',
    conv: '3.61%',
    convDelta: '+0.9%',
    avgDay: 'Avg $7.1k/day',
    days: [
      { day: 'Mon', pct: 60, revenue: '$182k', orders: 1260, aov: '$144.40', conv: '3.40%', peakWindow: '13:00 – 16:00 EST', note: 'YTD Monday cumulative revenue.' },
      { day: 'Tue', pct: 66, revenue: '$201k', orders: 1395, aov: '$144.00', conv: '3.52%', peakWindow: '14:00 – 17:00 EST', note: 'YTD Tuesday cumulative revenue.' },
      { day: 'Wed', pct: 62, revenue: '$189k', orders: 1310, aov: '$144.20', conv: '3.45%', peakWindow: '14:00 – 17:00 EST', note: 'YTD Wednesday cumulative revenue.' },
      { day: 'Thu', pct: 74, revenue: '$224k', orders: 1550, aov: '$144.50', conv: '3.65%', peakWindow: '17:00 – 20:00 EST', note: 'YTD Thursday cumulative revenue.' },
      { day: 'Fri', pct: 84, revenue: '$256k', orders: 1775, aov: '$144.20', conv: '3.78%', peakWindow: '18:00 – 21:00 EST', note: 'YTD Friday cumulative revenue.' },
      { day: 'Sat', pct: 96, revenue: '$298k', orders: 2065, aov: '$144.30', conv: '3.98%', peakWindow: '18:00 – 21:00 EST', note: 'Peak sales: Saturday between 18:00 – 21:00 EST.' },
      { day: 'Sun', pct: 70, revenue: '$212k', orders: 1470, aov: '$144.20', conv: '3.58%', peakWindow: '19:00 – 22:00 EST', note: 'YTD Sunday cumulative revenue.' },
    ],
  },
};

const CHANNELS = [
  {
    id: 'direct',
    label: 'Direct & App',
    pct: 48,
    amount: '$ 23.1k',
    visitors: '14,280 sessions',
    convRate: '4.12%',
  },
  {
    id: 'social',
    label: 'Social Commerce',
    pct: 29,
    amount: '$ 14.0k',
    visitors: '11,940 sessions',
    convRate: '3.18%',
  },
  {
    id: 'search',
    label: 'Search & Organic',
    pct: 15,
    amount: '$ 7.2k',
    visitors: '5,390 sessions',
    convRate: '2.95%',
  },
  {
    id: 'email',
    label: 'Email VIP Lists',
    pct: 8,
    amount: '$ 3.8k',
    visitors: '2,180 sessions',
    convRate: '5.84%',
  },
];

const INITIAL_LIVE_STREAM = [
  {
    id: 'tx_1',
    name: 'Regular Fit Slogan',
    customer: 'Marcus Chen • #8942',
    detail: 'Size M • Express Air',
    amount: '$ 1,190',
    time: '2m ago',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'tx_2',
    name: 'Regular Fit Polo',
    customer: 'Elena Rostova • #8939',
    detail: 'Size L • Apple Pay',
    amount: '$ 1,100',
    time: '8m ago',
    image:
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'tx_3',
    name: 'Regular Fit Black',
    customer: 'Tetsuo Lin • #8936',
    detail: 'Size M • Curbside',
    amount: '$ 1,690',
    time: '14m ago',
    image:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=240&q=80',
  },
];

export const OverviewVarient1: React.FC<OverviewVarient1Props> = ({
  variant = 'varient_1',
  onNavigateToOrders,
  onNavigateToCustomers,
  onNavigateToInventory,
  onTriggerToast,
}) => {
  const { palette, activeFont, isDark, colorPresetId } = useAdminDesignSystem();
  const [selectedRange, setSelectedRange] = useState<TimeRangeKey>('7D');
  const [activeDayIdx, setActiveDayIdx] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [taxModalOpen, setTaxModalOpen] = useState(false);
  const [liveStream, setLiveStream] = useState(INITIAL_LIVE_STREAM);

  const metrics = PERIOD_METRICS[selectedRange];
  const activeDay = metrics.days[activeDayIdx] || metrics.days[5];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const bonusTx = {
        id: `tx_${Date.now()}`,
        name: 'Regular Fit V-Neck',
        customer: 'Sarah Jenkins • #8943',
        detail: 'Size S • DHL Priority',
        amount: '$ 1,290',
        time: 'Just now',
        image:
          'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=240&q=80',
      };
      setLiveStream((prev) => [bonusTx, ...prev.slice(0, 2)]);
    }, 350);
    onTriggerToast?.('Refreshed store analytics & live orders');
  };

  return (
    <div
      className="admin-theme-scope px-5 pt-2 pb-6 space-y-4 bg-white text-[#1A1A1A] relative"
      style={getAdminThemeScopeStyle(palette, activeFont)}
      data-admin-dark={isDark ? 'true' : 'false'}
      data-admin-preset={colorPresetId}
    >
      {/* 1. CLOTH SHOP SEARCH BAR + SQUARE FILTER BUTTON (Exact Discover Pattern) */}
      <div className="flex items-center gap-2.5">
        <div className="flex-1 h-[48px] rounded-[10px] border border-[#E6E6E6] bg-white px-3.5 flex items-center gap-2.5">
          <Search size={18} className="text-[#999999] flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search metrics, orders, SKUs..."
            className="w-full text-[14px] text-[#1A1A1A] placeholder-[#999999] bg-transparent focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[#999999] cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          className="w-[48px] h-[48px] rounded-[10px] bg-[#1A1A1A] text-white flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-95 transition"
          title="Refresh Telemetry"
        >
          <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* 2. CLOTH SHOP CATEGORY / TIME-RANGE PILLS (Segmented in V2, Pill Row in V1/V3) */}
      {variant === 'varient_2' ? (
        <div className="p-1 rounded-[10px] bg-[#F7F7F7] border border-[#E6E6E6] grid grid-cols-4 gap-1">
          {(['Today', '7D', '30D', 'YTD'] as TimeRangeKey[]).map((range) => {
            const active = selectedRange === range;
            return (
              <button
                key={range}
                type="button"
                onClick={() => {
                  setSelectedRange(range);
                  onTriggerToast?.(`Switched analytics window to ${range}`);
                }}
                className={`h-[34px] rounded-[8px] text-[12px] transition cursor-pointer ${
                  active
                    ? 'bg-[#1A1A1A] text-white font-semibold shadow-2xs'
                    : 'text-[#808080] font-medium hover:text-[#1A1A1A]'
                }`}
              >
                {range}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {(['Today', '7D', '30D', 'YTD'] as TimeRangeKey[]).map((range) => {
            const active = selectedRange === range;
            return (
              <button
                key={range}
                type="button"
                onClick={() => {
                  setSelectedRange(range);
                  onTriggerToast?.(`Switched analytics window to ${range}`);
                }}
                className={`h-[36px] px-4 rounded-[10px] text-[13px] transition cursor-pointer flex-shrink-0 ${
                  active
                    ? 'bg-[#1A1A1A] text-white font-semibold'
                    : 'bg-white border border-[#E6E6E6] text-[#1A1A1A] font-medium hover:bg-[#F7F7F7]'
                }`}
              >
                {range === '7D' ? 'Last 7 Days' : range}
              </button>
            );
          })}
        </div>
      )}

      {/* 3. URGENT DISPATCH CARD (V1: Horizontal Cart Card | V2: Split Banner | V3: Dark Executive Card) */}
      {variant === 'varient_3' ? (
        <div
          onClick={() => {
            onTriggerToast?.('Opening 14 pending priority dispatch orders');
            onNavigateToOrders?.();
          }}
          className="p-4 rounded-[12px] bg-[#1A1A1A] text-white space-y-3 cursor-pointer hover:opacity-95 transition"
        >
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-[6px] bg-white/15 text-white text-[11px] font-bold">
              Priority Queue • 14 Orders
            </span>
            <span className="text-[12px] font-semibold opacity-80">
              $ 18,420 Value
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[18px] font-bold">
                Express Dispatch Ready
              </div>
              <div className="text-[12px] opacity-75 mt-0.5">
                DHL &amp; FedEx labels staged at Bay #4
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-[8px] bg-white text-[#1A1A1A] text-[12px] font-bold flex items-center gap-1">
              <span>Pack</span>
              <ArrowRight size={13} />
            </span>
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            onTriggerToast?.('Opening 14 pending priority dispatch orders');
            onNavigateToOrders?.();
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onNavigateToOrders?.();
          }}
          className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white flex items-center gap-[14px] cursor-pointer hover:border-[#1A1A1A] transition"
        >
          <div className="w-[64px] h-[64px] rounded-[8px] bg-[#F2F2F2] flex items-center justify-center flex-shrink-0 text-[#1A1A1A]">
            <Package size={24} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                  14 Orders Pending
                </div>
                <div className="text-[13px] text-[#808080] mt-0.5">
                  Priority Dispatch Queue
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-[6px] bg-[#FDE8E8] text-[#ED1010] text-[11px] font-bold flex-shrink-0">
                Urgent
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[14px] font-bold text-[#1A1A1A]">
                $ 18,420 Value
              </span>
              <span className="px-3 py-1 rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-semibold flex items-center gap-1">
                <span>Pack Orders</span>
                <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. KPI METRICS (8 Distinct Variant Layouts) */}
      {variant === 'varient_2' ? (
        <div className="rounded-[12px] border border-[#E6E6E6] bg-white divide-y divide-[#E6E6E6]">
          {[
            {
              label: 'Gross Revenue',
              val: metrics.grossRev,
              delta: metrics.grossDelta,
              sub: metrics.grossSub,
            },
            {
              label: 'Net Margin',
              val: metrics.netMargin,
              delta: metrics.marginPct,
              sub: 'margin',
            },
            {
              label: 'Average Order Value',
              val: metrics.aov,
              delta: metrics.aovDelta,
              sub: 'growth',
            },
            {
              label: 'Store Conversion',
              val: metrics.conv,
              delta: metrics.convDelta,
              sub: 'funnel',
            },
          ].map((k) => (
            <div
              key={k.label}
              onClick={() => onTriggerToast?.(`${k.label}: ${k.val}`)}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-[#F7F7F7] transition"
            >
              <div>
                <div className="text-[14px] font-bold text-[#1A1A1A]">
                  {k.label}
                </div>
                <div className="text-[12px] text-[#808080]">
                  {k.delta} {k.sub}
                </div>
              </div>
              <span className="text-[17px] font-bold text-[#1A1A1A]">
                {k.val}
              </span>
            </div>
          ))}
        </div>
      ) : variant === 'varient_3' ? (
        <div className="space-y-3">
          <div
            onClick={() => onTriggerToast?.(`Gross Revenue: ${metrics.grossRev}`)}
            className="p-4 rounded-[12px] border border-[#E6E6E6] bg-white flex items-center justify-between cursor-pointer"
          >
            <div>
              <div className="text-[12px] text-[#808080]">Gross Revenue</div>
              <div className="text-[24px] font-bold text-[#1A1A1A] tracking-tight mt-0.5">
                {metrics.grossRev}
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-[8px] bg-[#E7F7E7] text-[#0C9409] text-[12px] font-bold">
              {metrics.grossDelta} {metrics.grossSub}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: 'Net Margin', val: metrics.netMargin, sub: metrics.marginPct },
              { label: 'Avg Order', val: metrics.aov, sub: metrics.aovDelta },
              { label: 'Conversion', val: metrics.conv, sub: metrics.convDelta },
            ].map((m) => (
              <div
                key={m.label}
                onClick={() => onTriggerToast?.(`${m.label}: ${m.val}`)}
                className="p-3 rounded-[12px] border border-[#E6E6E6] bg-white space-y-1 cursor-pointer"
              >
                <div className="text-[11px] text-[#808080] truncate">{m.label}</div>
                <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                  {m.val}
                </div>
                <div className="text-[11px] font-semibold text-[#0C9409]">
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : variant === 'varient_4' ? (
        /* V4: Bento Mosaic (1 Tall Left Card + 3 Stacked Right Cards) */
        <div className="grid grid-cols-12 gap-3">
          <div
            onClick={() => onTriggerToast?.(`Gross Revenue: ${metrics.grossRev}`)}
            className="col-span-6 p-4 rounded-[12px] bg-[#1A1A1A] text-white flex flex-col justify-between cursor-pointer"
          >
            <div>
              <span className="px-2 py-0.5 rounded-[6px] bg-white/15 text-[10px] font-bold">
                Bento Primary
              </span>
              <div className="text-[12px] opacity-75 mt-2">Gross Revenue</div>
              <div className="text-[22px] font-bold mt-0.5">{metrics.grossRev}</div>
            </div>
            <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[11px]">
              <span>{metrics.grossDelta}</span>
              <span className="opacity-75">{metrics.grossSub}</span>
            </div>
          </div>
          <div className="col-span-6 space-y-2">
            {[
              { label: 'Net Margin', val: metrics.netMargin, sub: metrics.marginPct },
              { label: 'Avg Order', val: metrics.aov, sub: metrics.aovDelta },
              { label: 'Conversion', val: metrics.conv, sub: metrics.convDelta },
            ].map((m) => (
              <div
                key={m.label}
                onClick={() => onTriggerToast?.(`${m.label}: ${m.val}`)}
                className="p-2.5 rounded-[10px] border border-[#E6E6E6] bg-white flex items-center justify-between cursor-pointer"
              >
                <span className="text-[11px] text-[#808080]">{m.label}</span>
                <span className="text-[13px] font-bold text-[#1A1A1A]">{m.val}</span>
              </div>
            ))}
          </div>
        </div>
      ) : variant === 'varient_5' ? (
        /* V5: 4-Column Compact Metric Strip + Progress Bar */
        <div className="p-3.5 rounded-[12px] border border-[#E6E6E6] bg-white space-y-3">
          <div className="grid grid-cols-4 gap-2 text-center divide-x divide-[#E6E6E6]">
            {[
              { label: 'Revenue', val: metrics.grossRev },
              { label: 'Margin', val: metrics.netMargin },
              { label: 'AOV', val: metrics.aov },
              { label: 'Conv', val: metrics.conv },
            ].map((m) => (
              <div key={m.label} className="px-1">
                <div className="text-[10px] text-[#808080] truncate">{m.label}</div>
                <div className="text-[13px] font-bold text-[#1A1A1A] truncate mt-0.5">
                  {m.val}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#F2F2F2] overflow-hidden">
            <div className="h-full bg-[#1A1A1A] w-[78%]" />
          </div>
        </div>
      ) : variant === 'varient_6' ? (
        /* V6: Lookbook Editorial Banner Card + 2-Col Split */
        <div className="space-y-3">
          <div className="p-4 rounded-[12px] border-2 border-[#1A1A1A] bg-white flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#808080]">
                Atelier Revenue Index
              </div>
              <div className="text-[22px] font-bold text-[#1A1A1A] mt-0.5">
                {metrics.grossRev}
              </div>
              <div className="text-[12px] text-[#0C9409] font-semibold mt-0.5">
                {metrics.grossDelta} {metrics.grossSub}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-[#808080]">Net Margin</div>
              <div className="text-[18px] font-bold text-[#1A1A1A]">
                {metrics.netMargin}
              </div>
              <div className="text-[11px] text-[#808080]">{metrics.marginPct}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-[10px] bg-[#F7F7F7] flex items-center justify-between">
              <span className="text-[12px] text-[#808080]">AOV</span>
              <span className="text-[14px] font-bold text-[#1A1A1A]">{metrics.aov}</span>
            </div>
            <div className="p-3 rounded-[10px] bg-[#F7F7F7] flex items-center justify-between">
              <span className="text-[12px] text-[#808080]">Conv.</span>
              <span className="text-[14px] font-bold text-[#1A1A1A]">{metrics.conv}</span>
            </div>
          </div>
        </div>
      ) : variant === 'varient_7' ? (
        /* V7: Soft Surface Pill Cards (2x2 with Badge Header) */
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: 'Gross Rev', val: metrics.grossRev, tag: metrics.grossDelta },
            { label: 'Net Margin', val: metrics.netMargin, tag: metrics.marginPct },
            { label: 'Avg Order', val: metrics.aov, tag: metrics.aovDelta },
            { label: 'Conversion', val: metrics.conv, tag: metrics.convDelta },
          ].map((k) => (
            <div
              key={k.label}
              onClick={() => onTriggerToast?.(`${k.label}: ${k.val}`)}
              className="p-3 rounded-[12px] bg-[#F7F7F7] border border-[#E6E6E6] flex flex-col justify-between gap-2 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#808080]">{k.label}</span>
                <span className="px-2 py-0.5 rounded-[6px] bg-white text-[10px] font-bold text-[#0C9409]">
                  {k.tag}
                </span>
              </div>
              <div className="text-[18px] font-bold text-[#1A1A1A]">{k.val}</div>
            </div>
          ))}
        </div>
      ) : variant === 'varient_8' ? (
        /* V8: Studio Capsule Numbered Stack */
        <div className="space-y-2">
          {[
            { idx: '01', label: 'Gross Revenue', val: metrics.grossRev, tag: metrics.grossDelta },
            { idx: '02', label: 'Net Margin', val: metrics.netMargin, tag: metrics.marginPct },
            { idx: '03', label: 'Avg Order Value', val: metrics.aov, tag: metrics.aovDelta },
            { idx: '04', label: 'Store Conversion', val: metrics.conv, tag: metrics.convDelta },
          ].map((k) => (
            <div
              key={k.idx}
              onClick={() => onTriggerToast?.(`${k.label}: ${k.val}`)}
              className="p-3 rounded-[10px] border border-[#E6E6E6] bg-white flex items-center justify-between cursor-pointer hover:border-[#1A1A1A] transition"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-[6px] bg-[#1A1A1A] text-white text-[10px] font-bold flex items-center justify-center">
                  {k.idx}
                </span>
                <span className="text-[13px] font-bold text-[#1A1A1A]">{k.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[#0C9409]">{k.tag}</span>
                <span className="text-[15px] font-bold text-[#1A1A1A]">{k.val}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => onTriggerToast?.(`Gross Revenue: ${metrics.grossRev}`)}
            className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white space-y-1.5 cursor-pointer hover:border-[#1A1A1A] transition"
          >
            <div className="text-[13px] text-[#808080]">Gross Revenue</div>
            <div className="text-[19px] font-bold text-[#1A1A1A] tracking-tight">
              {metrics.grossRev}
            </div>
            <div className="flex items-center gap-1.5 text-[12px]">
              <span className="font-bold text-[#0C9409]">{metrics.grossDelta}</span>
              <span className="text-[#808080]">{metrics.grossSub}</span>
            </div>
          </div>

          <div
            onClick={() => onTriggerToast?.(`Net Margin: ${metrics.netMargin}`)}
            className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white space-y-1.5 cursor-pointer hover:border-[#1A1A1A] transition"
          >
            <div className="text-[13px] text-[#808080]">Net Margin</div>
            <div className="text-[19px] font-bold text-[#1A1A1A] tracking-tight">
              {metrics.netMargin}
            </div>
            <div className="flex items-center gap-1.5 text-[12px]">
              <span className="font-bold text-[#1A1A1A]">{metrics.marginPct}</span>
              <span className="text-[#808080]">margin</span>
            </div>
          </div>

          <div
            onClick={() => onTriggerToast?.(`Average Order Value: ${metrics.aov}`)}
            className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white space-y-1.5 cursor-pointer hover:border-[#1A1A1A] transition"
          >
            <div className="text-[13px] text-[#808080]">Avg Order Value</div>
            <div className="text-[19px] font-bold text-[#1A1A1A] tracking-tight">
              {metrics.aov}
            </div>
            <div className="flex items-center gap-1.5 text-[12px]">
              <span className="font-bold text-[#0C9409]">{metrics.aovDelta}</span>
              <span className="text-[#808080]">growth</span>
            </div>
          </div>

          <div
            onClick={() => onTriggerToast?.(`Store Conversion: ${metrics.conv}`)}
            className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white space-y-1.5 cursor-pointer hover:border-[#1A1A1A] transition"
          >
            <div className="text-[13px] text-[#808080]">Conversion</div>
            <div className="text-[19px] font-bold text-[#1A1A1A] tracking-tight">
              {metrics.conv}
            </div>
            <div className="flex items-center gap-1.5 text-[12px]">
              <span className="font-bold text-[#0C9409]">{metrics.convDelta}</span>
              <span className="text-[#808080]">funnel</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. DAILY TRAJECTORY CARD (Clean 12px Bordered Card) */}
      <div className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[15px] font-bold text-[#1A1A1A]">
              Daily Trajectory
            </div>
            <div className="text-[12px] text-[#808080]">{metrics.avgDay}</div>
          </div>
          <span className="px-2.5 py-1 rounded-[8px] bg-[#F7F7F7] text-[12px] font-bold text-[#1A1A1A]">
            {activeDay.day}: {activeDay.revenue}
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 items-end h-28 pt-2">
          {metrics.days.map((item, idx) => {
            const isSelected = activeDayIdx === idx;
            return (
              <button
                key={item.day}
                type="button"
                onClick={() => setActiveDayIdx(idx)}
                className="flex flex-col items-center justify-end h-full gap-1.5 cursor-pointer"
              >
                <div className="w-full flex-1 flex items-end justify-center">
                  <div
                    className={`w-full rounded-[6px] transition-all ${
                      isSelected ? 'bg-[#1A1A1A]' : 'bg-[#F2F2F2] hover:bg-[#E6E6E6]'
                    }`}
                    style={{ height: `${item.pct}%` }}
                  />
                </div>
                <span
                  className={`text-[11px] ${
                    isSelected
                      ? 'font-bold text-[#1A1A1A]'
                      : 'font-medium text-[#808080]'
                  }`}
                >
                  {item.day}
                </span>
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-[#E6E6E6] flex items-center justify-between text-[12px] text-[#808080]">
          <span>Peak: {activeDay.peakWindow}</span>
          <span className="font-semibold text-[#1A1A1A]">
            {activeDay.orders} orders • {activeDay.conv}
          </span>
        </div>
      </div>

      {/* 6. LIVE CHECKOUT STREAM (V1: Horizontal Cart Cards | V2: Compact Row List | V3: 2-Column Product Tiles) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-[#1A1A1A]">
            Live Checkout Stream
          </h3>
          <button
            type="button"
            onClick={onNavigateToOrders}
            className="text-[13px] font-semibold text-[#808080] hover:text-[#1A1A1A] cursor-pointer"
          >
            View All
          </button>
        </div>

        {variant === 'varient_3' ? (
          <div className="grid grid-cols-2 gap-3">
            {liveStream.map((tx) => (
              <div
                key={tx.id}
                onClick={onNavigateToOrders}
                className="p-2.5 rounded-[12px] border border-[#E6E6E6] bg-white space-y-2 cursor-pointer hover:border-[#1A1A1A] transition"
              >
                <div className="relative h-[120px] rounded-[8px] bg-[#F2F2F2] overflow-hidden">
                  <img
                    src={tx.image}
                    alt={tx.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-[6px] bg-white text-[10px] font-bold text-[#1A1A1A]">
                    {tx.time}
                  </span>
                </div>
                <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                  {tx.name}
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-bold text-[#1A1A1A]">{tx.amount}</span>
                  <span className="text-[#808080] truncate">{tx.customer.split('•')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_2' ? (
          <div className="rounded-[12px] border border-[#E6E6E6] bg-white divide-y divide-[#E6E6E6]">
            {liveStream.map((tx) => (
              <div
                key={tx.id}
                onClick={onNavigateToOrders}
                className="p-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#F7F7F7] transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={tx.image}
                    alt={tx.name}
                    className="w-12 h-12 rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                      {tx.name}
                    </div>
                    <div className="text-[12px] text-[#808080] truncate">
                      {tx.customer} • {tx.detail}
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[14px] font-bold text-[#1A1A1A]">
                    {tx.amount}
                  </div>
                  <div className="text-[11px] text-[#808080]">{tx.time}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {liveStream.map((tx) => (
              <div
                key={tx.id}
                onClick={onNavigateToOrders}
                className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white flex items-center gap-[14px] cursor-pointer hover:border-[#1A1A1A] transition"
              >
                <img
                  src={tx.image}
                  alt={tx.name}
                  className="w-[70px] h-[70px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                        {tx.name}
                      </div>
                      <div className="text-[13px] text-[#808080] mt-0.5">
                        {tx.customer}
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-[#808080]">
                      {tx.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-[15px] font-bold text-[#1A1A1A]">
                      {tx.amount}
                    </span>
                    <span className="px-2.5 py-1 rounded-[6px] bg-[#F7F7F7] text-[11px] font-semibold text-[#1A1A1A]">
                      {tx.detail}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 7. ATTRIBUTION SUMMARY LEDGER ROWS (Cloth Shop MyCart Summary Pattern) */}
      <div className="pt-2 space-y-2.5">
        <div className="text-[15px] font-bold text-[#1A1A1A]">
          Channel Attribution Summary
        </div>
        {CHANNELS.map((ch) => (
          <div key={ch.id} className="flex items-center justify-between text-[14px]">
            <span className="text-[#808080]">
              {ch.label} ({ch.pct}%)
            </span>
            <span className="font-semibold text-[#1A1A1A]">{ch.amount}</span>
          </div>
        ))}
        <div className="h-[1px] bg-[#E6E6E6] my-1" />
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-medium text-[#1A1A1A]">
            Total Gross Volume
          </span>
          <span className="text-[17px] font-bold text-[#1A1A1A]">
            {metrics.grossRev}
          </span>
        </div>
      </div>

      {/* 8. CLOTH SHOP PRIMARY CTA BUTTON (Exact 52px height, 10px radius, ArrowRight) */}
      <button
        type="button"
        onClick={() => {
          setTaxModalOpen((prev) => !prev);
          onTriggerToast?.('Generated Q3 Revenue & Tax Ledger PDF');
        }}
        className="w-full h-[52px] rounded-[10px] bg-[#1A1A1A] text-white text-[15px] font-semibold flex items-center justify-center gap-2.5 cursor-pointer hover:opacity-95 transition"
      >
        <span>Export Revenue &amp; Tax Report</span>
        <ArrowRight size={18} />
      </button>

      {taxModalOpen && (
        <div className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white space-y-2 text-[13px]">
          <div className="flex items-center justify-between font-bold text-[#1A1A1A]">
            <span>Q3 Tax &amp; Payout Statement Ready</span>
            <CheckCircle2 size={16} className="text-[#0C9409]" />
          </div>
          <p className="text-[#808080]">
            Includes 342 settled orders, Stripe &amp; Apple Pay reconciliations.
          </p>
        </div>
      )}
    </div>
  );
};

export default OverviewVarient1;
