import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const StaffManagementVarient3: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#4338CA',
  isDark = false,
}) => {
  const screenBg = isDark ? 'bg-[#090D16] text-white' : 'bg-[#F8FAFC] text-[#0F172A]';
  const cardSurface = isDark
    ? 'bg-[#121826] border-slate-800 text-white'
    : 'bg-white border-slate-200/80 text-[#0F172A]';

  return (
    <div className={`space-y-3 p-4 min-h-full ${screenBg}`}>
      <div>
        <span
          className="text-[10px] font-extrabold uppercase tracking-wider"
          style={{ color: primaryColor }}
        >
          STAFF &amp; ROLES • V3: ACCESS MATRIX
        </span>
        <h2 className="text-lg font-extrabold">RBAC Security Permissions</h2>
      </div>
      <div className={`rounded-2xl border divide-y divide-slate-200/40 ${cardSurface}`}>
        {[
          { role: 'Executive Director', perms: 'Full Treasury + PO + Refunds' },
          { role: 'Warehouse Lead', perms: 'Batch Print + Carrier Assign' },
          { role: 'POS Cashier', perms: 'Scanner + Register Checkout' },
        ].map((r, i) => (
          <div key={i} className="p-3.5 space-y-1">
            <div className="text-xs font-extrabold">{r.role}</div>
            <div className="text-[10px] font-semibold" style={{ color: primaryColor }}>
              {r.perms}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffManagementVarient3;
