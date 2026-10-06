import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const ActivityAuditVarient4: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#4338CA',
}) => {
  return (
    <div className="space-y-3 p-4 min-h-full bg-[#090D16] text-white font-mono">
      <div>
        <span
          className="text-[10px] font-extrabold uppercase tracking-wider"
          style={{ color: primaryColor }}
        >
          ACTIVITY AUDIT LOG • V4: TERMINAL LOG
        </span>
        <h2 className="text-lg font-extrabold font-sans">Raw Telemetry Console</h2>
      </div>
      <div className="p-3.5 rounded-2xl border border-slate-800 bg-[#121826] space-y-1.5 text-[10px] text-emerald-400">
        <div>[20:04:12] DISPATCH_SYNC #ORD-9842 -&gt; BAY_E4</div>
        <div>[19:58:03] AUTO_PO SKU-8841 QTY=50 STATUS=SENT</div>
        <div>[19:41:50] CARRIER_HOOK FEDEX #TRK-992144 OK</div>
      </div>
    </div>
  );
};

export default ActivityAuditVarient4;
