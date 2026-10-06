import React, { useState } from 'react';
import {
  RefreshCw,
  Bell,
  ChevronDown,
  Warehouse,
  Printer,
  Truck,
  CheckCircle2,
  ScanBarcode,
  Wifi,
  Clock,
  SlidersHorizontal,
  AlertTriangle,
  PackageCheck,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const StoreSettingsVarient2: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#3730A3',
  isDark = false,
  onNavigate,
}) => {
  const [autoAssignBins, setAutoAssignBins] = useState(true);
  const [thermalAutoPrint, setThermalAutoPrint] = useState(true);
  const [expressCutOff, setExpressCutOff] = useState('16:30 EST');
  const [activeHub, setActiveHub] = useState('Austin Hub #04');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const bgMain = isDark ? 'bg-[#090D16] text-white' : 'bg-[#F8FAFC] text-[#0F172A]';
  const cardBg = isDark
    ? 'bg-[#121826] border-slate-800 text-white'
    : 'bg-white border-slate-200/70 text-[#0F172A]';
  const subBoxBg = isDark
    ? 'bg-[#1A2234] border-slate-800'
    : 'bg-[#EEF2FF]/65 border-indigo-100/70';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';
  const headerBg = isDark
    ? 'bg-[#0B0F19]/95 border-slate-800 text-white'
    : 'bg-white/95 border-slate-100 text-[#0F172A]';

  const renderToggle = (checked: boolean, onChange: () => void) => (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center flex-shrink-0 ${
        checked ? '' : isDark ? 'bg-slate-700' : 'bg-slate-300'
      }`}
      style={checked ? { backgroundColor: primaryColor } : undefined}
    >
      <div
        className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );

  return (
    <div className={`flex-1 pb-6 select-none ${bgMain}`}>
      {/* Header */}
      <div
        className={`px-4 py-3 flex items-center justify-between border-b sticky top-0 z-30 backdrop-blur-md ${headerBg}`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center flex-shrink-0 shadow-xs border border-slate-800">
            <Warehouse size={18} color={primaryColor} />
          </div>
          <div className="min-w-0">
            <div
              className="flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase"
              style={{ color: primaryColor }}
            >
              <span>V2 • WAREHOUSE &amp; ZONES</span>
              <ChevronDown size={11} strokeWidth={2.5} />
            </div>
            <h1 className="text-[16px] font-extrabold tracking-tight truncate">
              WMS Hub Configuration
            </h1>
          </div>
        </div>
        <button
          onClick={() => showToast('WMS Zones re-indexed')}
          className="p-2 rounded-full hover:bg-slate-500/10"
        >
          <RefreshCw size={17} />
        </button>
      </div>

      {toast && (
        <div
          className="mx-3.5 mt-2.5 px-3 py-2 rounded-xl text-white text-[11px] font-bold flex items-center justify-between shadow-lg"
          style={{ backgroundColor: primaryColor }}
        >
          <span>{toast}</span>
          <CheckCircle2 size={14} />
        </div>
      )}

      <div className="p-3.5 space-y-3.5">
        {/* Hub Switcher */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider">
              Active Fulfillment Hub
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 text-[10px] font-extrabold">
              99.4% SLA Pace
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {['Austin Hub #04', 'SoHo Flagship #01', 'Newark Port #02', 'LA Atelier #03'].map(
              (hub) => {
                const active = activeHub === hub;
                return (
                  <button
                    key={hub}
                    onClick={() => {
                      setActiveHub(hub);
                      showToast(`Switched to ${hub}`);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-extrabold transition ${
                      active ? 'text-white shadow-xs' : subBoxBg
                    }`}
                    style={
                      active
                        ? { backgroundColor: primaryColor, borderColor: primaryColor }
                        : undefined
                    }
                  >
                    {hub}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Thermal Printers & Barcode Hardware */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Printer size={16} style={{ color: primaryColor }} />
              <span className="text-sm font-extrabold">Zebra Thermal &amp; Scanner Nodes</span>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-600">
              <Wifi size={12} /> 4 Connected
            </span>
          </div>

          <div className={`p-3 rounded-xl border flex items-center justify-between ${subBoxBg}`}>
            <div className="flex items-center gap-2.5">
              <Printer size={16} style={{ color: primaryColor }} />
              <div>
                <div className="text-xs font-extrabold">Zebra ZT411 • Packing Bay 1</div>
                <div className={`text-[10px] ${mutedText}`}>IP: 192.168.10.42 • 4x6 Shipping</div>
              </div>
            </div>
            <button
              onClick={() => showToast('Test 4x6 label sent to Zebra ZT411')}
              className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Test Print
            </button>
          </div>

          <div className={`p-3 rounded-xl border flex items-center justify-between ${subBoxBg}`}>
            <div className="flex items-center gap-2.5">
              <ScanBarcode size={16} style={{ color: primaryColor }} />
              <div>
                <div className="text-xs font-extrabold">Honeywell RF Handhelds (x6)</div>
                <div className={`text-[10px] ${mutedText}`}>Bin A-01 to Bin F-40 • 2.4GHz</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 text-[10px] font-extrabold">
              Synced
            </span>
          </div>
        </div>

        {/* Dispatch SLA & Cut-off Rules */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-center gap-2">
            <Truck size={16} style={{ color: primaryColor }} />
            <span className="text-sm font-extrabold">Dispatch SLA &amp; Bin Automation</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold">Auto-Assign Nearest Bin Location</div>
              <div className={`text-[10px] ${mutedText}`}>Route pickers by shortest aisle path</div>
            </div>
            {renderToggle(autoAssignBins, () => setAutoAssignBins(!autoAssignBins))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold">Auto-Print Packing Slip on Scan</div>
              <div className={`text-[10px] ${mutedText}`}>Instant print when Stage 3 completes</div>
            </div>
            {renderToggle(thermalAutoPrint, () => setThermalAutoPrint(!thermalAutoPrint))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <Clock size={14} style={{ color: primaryColor }} />
              <span>Same-Day Carrier Cut-Off</span>
            </div>
            <button
              onClick={() => {
                const next = expressCutOff === '16:30 EST' ? '18:00 EST' : '16:30 EST';
                setExpressCutOff(next);
                showToast(`Carrier cut-off updated to ${next}`);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-extrabold ${subBoxBg}`}
              style={{ color: primaryColor }}
            >
              {expressCutOff}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSettingsVarient2;
