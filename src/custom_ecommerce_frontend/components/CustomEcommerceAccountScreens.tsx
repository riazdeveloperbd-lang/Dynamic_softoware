import React, { useState } from 'react';
import {
  Wallet,
  ChevronRight,
  Send,
  Phone,
  RefreshCw,
  Award,
  ShieldCheck,
  QrCode,
  Camera,
  CheckCircle2,
  MapPin,
  HelpCircle,
} from 'lucide-react';
import {
  CustomEcommerceScreenId,
  CustomEcommerceVariantId,
} from '../data/customEcommerceRegistry';

interface AccountPostPurchaseProps {
  screenId: CustomEcommerceScreenId;
  variant: CustomEcommerceVariantId;
  primaryColor: string;
  isDark: boolean;
  onNavigate: (target: CustomEcommerceScreenId) => void;
}

export const CustomEcommerceAccountScreens: React.FC<AccountPostPurchaseProps> = ({
  screenId,
  variant,
  primaryColor,
  isDark,
  onNavigate,
}) => {
  const [walletBalance, setWalletBalance] = useState(145.5);
  const [orderTab, setOrderTab] = useState<'active' | 'past'>('active');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'agent', text: 'Hi Alex! How can we help with Order #EC-94820 today?' },
    { sender: 'user', text: 'Can the rider call me when arriving at the gate?' },
    { sender: 'agent', text: 'Done! I have added a priority gate-call note for Rider Kamal.' },
  ]);
  const [chatInput, setChatInput] = useState('');

  // ============================================================================
  // 16. USER PROFILE & WALLET — 6 DISTINCT ACCOUNT HUBS
  // ============================================================================
  if (screenId === 'UserProfileWallet') {
    // V1: KEEP ORIGINAL
    if (variant === 'varient_1') {
      return (
        <div className="p-4 space-y-4 select-none">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-md"
              style={{ backgroundColor: primaryColor }}
            >
              AM
            </div>
            <div>
              <h1 className="text-base font-black">Alex Morgan (V1)</h1>
              <p className="text-xs opacity-65">+880 1711-892400 · Gold VIP</p>
            </div>
          </div>

          <div
            className="p-4 rounded-2xl text-white space-y-3 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #0F172A 100%)` }}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <Wallet size={14} /> NovaPay Wallet
              </span>
              <span>2,480 Pts</span>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-black">${walletBalance.toFixed(2)}</div>
              <button
                type="button"
                onClick={() => setWalletBalance((b) => b + 25)}
                className="px-3 py-1.5 rounded-xl bg-white text-neutral-900 text-xs font-extrabold cursor-pointer"
              >
                + Top Up $25
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { label: 'Active & Past Orders', target: 'OrderHistoryTracking' as const },
              { label: 'Saved Delivery Addresses', target: 'AddressBookLocation' as const },
              { label: '24/7 Help Center & Live Chat', target: 'HelpCenterSupport' as const },
            ].map((row) => (
              <div
                key={row.label}
                onClick={() => onNavigate(row.target)}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-3 flex items-center justify-between cursor-pointer"
              >
                <span className="text-xs font-extrabold">{row.label}</span>
                <ChevronRight size={15} />
              </div>
            ))}
          </div>
        </div>
      );
    }

    // V2: BENTO ANALYTICS & LOYALTY REWARD DASHBOARD
    if (variant === 'varient_2') {
      return (
        <div className="p-4 space-y-3 select-none">
          <div className="grid grid-cols-2 gap-2.5">
            <div
              className="p-3.5 rounded-3xl text-white space-y-1"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="text-[10px] uppercase opacity-80">Wallet Credit</div>
              <div className="text-xl font-black">${walletBalance}</div>
            </div>
            <div className="p-3.5 rounded-3xl border border-amber-500/30 bg-amber-500/10 space-y-1">
              <div className="text-[10px] uppercase font-bold text-amber-500">VIP Tier</div>
              <div className="text-sm font-black">2,480 Points</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            {['To Pay (0)', 'Shipped (1)', 'To Review (3)', 'Returns (0)'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onNavigate('OrderHistoryTracking')}
                className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-[10px] font-extrabold cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // V3: BRUTALIST MEMBER STATEMENT LEDGER
    if (variant === 'varient_3') {
      return (
        <div className="p-4 space-y-3 font-mono select-none">
          <div className="border-2 border-current p-2 bg-amber-300 text-black font-black text-xs">
            MEMBER_DOSSIER // #USR-8821
          </div>
          <div className="border-2 border-current p-3 bg-white dark:bg-neutral-900 space-y-1.5 text-xs">
            <div>NAME: ALEX_MORGAN</div>
            <div>WALLET_BAL: ${walletBalance.toFixed(2)}</div>
            <div>TOTAL_SAVED_YTD: $342.00</div>
          </div>
        </div>
      );
    }

    // V4: LUXURY BLACK CARD MEMBER LOUNGE + QR PASS
    if (variant === 'varient_4') {
      return (
        <div className="p-5 space-y-4 bg-[#090D16] text-white h-full select-none">
          <div className="p-4 rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-500/20 to-black space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-serif tracking-widest text-amber-300">BLACK CARD VIP</span>
              <QrCode size={18} className="text-amber-300" />
            </div>
            <div className="text-xl font-black">${walletBalance.toFixed(2)} Store Credit</div>
          </div>
        </div>
      );
    }

    // V5: ATELIER PERSONAL SIZING & STYLE PROFILE
    if (variant === 'varient_5') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <div className="border-l-4 pl-3" style={{ borderColor: primaryColor }}>
            <div className="text-[10px] font-mono uppercase opacity-60">FIT &amp; STYLE PASSPORT</div>
            <h2 className="text-base font-black">Alex&apos;s Saved Measurements</h2>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              ['Footwear', 'EU 42'],
              ['Apparel', 'Size M'],
              ['Watch Case', '40mm'],
            ].map(([k, v]) => (
              <div key={k} className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <div className="text-[10px] opacity-60">{k}</div>
                <div className="text-xs font-black">{v}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // V6: PRIVACY, BIOMETRIC & NOTIFICATION SWITCHBOARD
    return (
      <div className="p-4 space-y-3 select-none">
        <h1 className="text-sm font-black">Security &amp; Push Preferences</h1>
        {[
          'Biometric FaceID Checkout',
          'WhatsApp Dispatch Alerts',
          'Flash Sale Early Access Push',
        ].map((setting) => (
          <div
            key={setting}
            className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-bold"
          >
            <span>{setting}</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px]">ACTIVE</span>
          </div>
        ))}
      </div>
    );
  }

  // ============================================================================
  // 17. ORDER HISTORY & TRACKING — 6 DISTINCT LOGISTICS VIEWS
  // ============================================================================
  if (screenId === 'OrderHistoryTracking') {
    const timelineSteps = [
      { stage: 'Order Placed', time: '10:15 AM', done: true },
      { stage: 'Processing at Hub', time: '10:22 AM', done: true },
      { stage: 'Out for Delivery (Shipped)', time: '10:38 AM · Rider Kamal', done: true },
      { stage: 'Delivered at Doorstep', time: 'ETA 11:05 AM', done: false },
    ];

    // V1: KEEP ORIGINAL
    if (variant === 'varient_1') {
      return (
        <div className="p-4 space-y-4 select-none">
          <h1 className="text-base font-black">Order History &amp; Tracking (V1)</h1>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 space-y-3">
            {timelineSteps.map((step) => (
              <div key={step.stage} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ backgroundColor: step.done ? primaryColor : '#94A3B8' }}
                >
                  ✓
                </div>
                <div>
                  <div className="text-xs font-extrabold">{step.stage}</div>
                  <div className="text-[10px] opacity-65">{step.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // V2: BENTO LIVE GPS RADAR MAP + RIDER CALL CARD
    if (variant === 'varient_2') {
      return (
        <div className="p-4 space-y-3 select-none">
          <div className="h-36 rounded-3xl bg-slate-900 text-white flex flex-col items-center justify-center relative overflow-hidden">
            <MapPin size={26} className="text-emerald-400 animate-bounce" />
            <span className="text-xs font-black mt-1">Rider Kamal is 1.2 km away (8 mins)</span>
          </div>
          <div className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-extrabold">OTP Handover PIN: #4491</span>
            <Phone size={15} style={{ color: primaryColor }} />
          </div>
        </div>
      );
    }

    // V3: BRUTALIST LOGISTICS MANIFEST LOG
    if (variant === 'varient_3') {
      return (
        <div className="p-4 space-y-2.5 font-mono select-none">
          <div className="border-2 border-current p-2 bg-amber-300 text-black font-black text-xs">
            MANIFEST_LOG // #EC-94820
          </div>
          {timelineSteps.map((s) => (
            <div key={s.stage} className="border-2 border-current p-2.5 text-xs font-bold">
              [{s.time}] {s.stage.toUpperCase()}
            </div>
          ))}
        </div>
      );
    }

    // V4: PAST ORDERS REORDER SHELF
    if (variant === 'varient_4') {
      return (
        <div className="p-4 space-y-3 select-none">
          <h1 className="text-sm font-black">1-Tap Buy Again Archive</h1>
          {['#EC-94820 · $412', '#EC-89104 · $165'].map((o) => (
            <div
              key={o}
              className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between"
            >
              <span className="text-xs font-extrabold">{o}</span>
              <button
                type="button"
                onClick={() => onNavigate('ShoppingCart')}
                className="px-3 py-1 rounded-lg text-[10px] font-extrabold text-white"
                style={{ backgroundColor: primaryColor }}
              >
                Reorder
              </button>
            </div>
          ))}
        </div>
      );
    }

    // V5: DOORSTEP PHOTO PROOF OF DELIVERY VIEWER
    if (variant === 'varient_5') {
      return (
        <div className="p-4 space-y-3 select-none">
          <div className="text-xs font-black">Verified Doorstep Photo Proof</div>
          <div className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
              <Camera size={14} /> Left at Apartment 6B Reception
            </div>
            <div className="text-[11px] opacity-70">Signed by Security Guard · 11:02 AM</div>
          </div>
        </div>
      );
    }

    // V6: SELF-SERVICE 7-DAY RETURN & EXCHANGE PORTAL
    return (
      <div className="p-4 space-y-3 select-none">
        <h1 className="text-sm font-black">Instant Return / Size Exchange</h1>
        <div className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
          <div className="text-xs font-bold">Select Reason for Free Doorstep Pickup:</div>
          {['Exchange for Different Size', 'Instant bKash Wallet Refund'].map((r) => (
            <div key={r} className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold">
              • {r}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ============================================================================
  // 18. HELP CENTER / SUPPORT — 6 DISTINCT SUPPORT INTERFACES
  // ============================================================================
  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { sender: 'user', text: chatInput.trim() }]);
    setChatInput('');
  };

  // V1: KEEP ORIGINAL
  if (variant === 'varient_1') {
    return (
      <div className="h-full flex flex-col justify-between p-4 select-none space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-black">Help Center &amp; Live Chat (V1)</h1>
          <span
            className="px-2.5 py-1 rounded-xl text-[11px] font-extrabold text-white"
            style={{ backgroundColor: primaryColor }}
          >
            Call
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 flex-1 p-3 flex flex-col justify-between space-y-2 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar">
            {chatMessages.map((m, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-2xl text-xs max-w-[85%] ${
                  m.sender === 'user'
                    ? 'ml-auto text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800'
                }`}
                style={m.sender === 'user' ? { backgroundColor: primaryColor } : undefined}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type message to support..."
              className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-xs"
            />
            <button
              type="button"
              onClick={sendChat}
              className="p-2 rounded-xl text-white cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // V2: BENTO SELF-SERVICE TRIAGE GRID
  if (variant === 'varient_2') {
    return (
      <div className="p-4 space-y-3 select-none">
        <h1 className="text-base font-black">1-Tap Issue Resolver</h1>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            'Where is my order?',
            'Instant bKash Refund',
            'Change Delivery Pin',
            'Warranty Claim',
          ].map((topic) => (
            <div
              key={topic}
              className="p-3.5 rounded-3xl border border-neutral-200 dark:border-neutral-800 text-xs font-extrabold cursor-pointer"
            >
              {topic}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // V3: BRUTALIST SLA TICKET TRACKER
  if (variant === 'varient_3') {
    return (
      <div className="p-4 space-y-3 font-mono select-none">
        <div className="border-2 border-current p-2 bg-amber-300 text-black font-black text-xs">
          SUPPORT_SLA_CONSOLE // V3
        </div>
        <div className="border-2 border-current p-3 text-xs space-y-1">
          <div>TICKET #T-4019 // PRIORITY: HIGH</div>
          <div>RESPONSE_SLA: &lt; 90 SECONDS</div>
        </div>
      </div>
    );
  }

  // V4: WHATSAPP & VIP VOICE CONCIERGE BRIDGE
  if (variant === 'varient_4') {
    return (
      <div className="p-4 space-y-3.5 select-none">
        <div className="p-4 rounded-3xl bg-emerald-500 text-white space-y-2">
          <div className="text-sm font-black">WhatsApp Priority Desk</div>
          <div className="text-xs opacity-90">Connect with a dedicated human specialist in 15s.</div>
        </div>
      </div>
    );
  }

  // V5: ORDER-LINKED DISPUTE & PHOTO EVIDENCE UPLOADER
  if (variant === 'varient_5') {
    return (
      <div className="p-4 space-y-3 select-none">
        <div className="text-sm font-black">Attach Photo for Instant Replacement</div>
        <div className="p-6 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 text-center text-xs font-bold">
          📸 Tap to Upload Damaged Box Photo
        </div>
      </div>
    );
  }

  // V6: REQUEST 60-SECOND PHONE CALLBACK
  return (
    <div className="p-4 space-y-3.5 select-none">
      <h1 className="text-base font-black">Request 60-Sec Phone Callback</h1>
      <input
        type="text"
        defaultValue="+880 1711-892400"
        className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-bold bg-transparent"
      />
      <button
        type="button"
        className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
        style={{ backgroundColor: primaryColor }}
      >
        Call Me Now (Free) →
      </button>
    </div>
  );
};
