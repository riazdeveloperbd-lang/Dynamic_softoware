import React, { useState } from 'react';
import {
  Navigation,
  CheckSquare,
  Camera,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  MapPin,
  DollarSign,
  Package,
  ShieldCheck,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useFoodGroceryEcosystem } from '../context/FoodGroceryEcosystemContext';

export type DriverScreenId =
  | 'driver_offer_accept'
  | 'driver_store_pickup'
  | 'driver_dropoff_pod'
  | 'system_lifecycle_flow';

interface DriverHudScreensProps {
  screenId: DriverScreenId;
  onNavigate: (next: DriverScreenId) => void;
  primaryColor: string;
}

export const DriverHudScreens: React.FC<DriverHudScreensProps> = ({
  screenId,
  onNavigate,
  primaryColor,
}) => {
  const {
    kdsOrders,
    toggleDriverBagCheck,
    captureProofOfDelivery,
    setActiveOrderLifecycle,
    socketEvents,
    emitLifecycleEvent,
  } = useFoodGroceryEcosystem();

  const [offerAccepted, setOfferAccepted] = useState(false);
  const [photoPreviewReady, setPhotoPreviewReady] = useState(false);

  const currentJob = kdsOrders[0];
  const allBagsVerified = currentJob.items.every((it) => it.checkedByDriver);

  // =========================================================================
  // SCREEN C1: DELIVERY REQUEST / OFFER SCREEN (Slide-to-Accept + Payout)
  // =========================================================================
  if (screenId === 'driver_offer_accept') {
    return (
      <div className="h-full flex flex-col justify-between p-4 bg-[#070A12] text-white overflow-y-auto space-y-4">
        <div className="space-y-3.5">
          {/* High-Contrast Courier Status Bar */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              COURIER HUD · ONLINE
            </span>
            <span>32s Left to Accept</span>
          </div>

          {/* Giant Payout & Distance Callout Card */}
          <div className="p-5 rounded-3xl bg-slate-900 border-2 border-emerald-500/60 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                PRIORITY BATCHED OFFER · INCLUDES {currentJob.tipPercent}% TIP
              </span>
              <span className="text-xs font-mono text-slate-400">
                {currentJob.distanceMiles} mi total
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="text-4xl font-extrabold font-mono text-white">
                ${currentJob.payoutUsd.toFixed(2)}
              </div>
              <div className="text-xs font-mono text-emerald-400">
                Est. 16 mins ($55.60/hr rate)
              </div>
            </div>

            {/* Pickup & Dropoff Route Timeline */}
            <div className="pt-3 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold">
                  1
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">
                    PICKUP · 0.4 MI AWAY
                  </div>
                  <div className="font-bold">Smash &amp; Sear Craft Kitchen</div>
                  <div className="text-[11px] text-slate-400">
                    Order {currentJob.orderNumber} · {currentJob.items.length} Thermal Items
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold">
                  2
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">
                    DROP-OFF · OAK DISTRICT
                  </div>
                  <div className="font-bold">{currentJob.customerUnit}</div>
                  <div className="text-[11px] text-amber-400 font-mono">
                    Note: “{currentJob.dropoffNote}”
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* High-Contrast Slide/Tap to Accept Dispatch Button (>=52px Touch Target) */}
        <button
          type="button"
          onClick={() => {
            setOfferAccepted(true);
            emitLifecycleEvent(
              'COURIER_HUD',
              'DISPATCH_OFFER_ACCEPTED',
              `Courier Mateo Silva locked Order ${currentJob.orderNumber} ($${currentJob.payoutUsd})`,
              'Courier Mateo accepted your order and is heading to the store.'
            );
            onNavigate('driver_store_pickup');
          }}
          className="w-full min-h-[54px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-between px-5 shadow-xl cursor-pointer"
        >
          <span>SLIDE / TAP TO ACCEPT OFFER (${currentJob.payoutUsd.toFixed(2)})</span>
          <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  // =========================================================================
  // SCREEN C2: STORE PICKUP & BAG CHECKLIST (Confirm All Bags Before Leaving)
  // =========================================================================
  if (screenId === 'driver_store_pickup') {
    return (
      <div className="h-full flex flex-col justify-between p-4 bg-[#070A12] text-white overflow-y-auto space-y-4">
        <div className="space-y-3.5">
          {/* Store Arrival Banner */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-emerald-400">
                ARRIVED AT STORE GEOFENCE
              </div>
              <div className="text-base font-extrabold">
                Pickup Order {currentJob.orderNumber}
              </div>
              <div className="text-xs text-slate-400">
                Customer: {currentJob.customerName}
              </div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs">
              Shelf #B2
            </div>
          </div>

          {/* Interactive Bag & Item Verification Checklist (>=48px Touch Rows) */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold">Verify All Thermal Bags &amp; Modifiers</span>
              <span className="font-mono text-[11px] text-emerald-400">
                Tap each item to check
              </span>
            </div>

            <div className="space-y-2">
              {currentJob.items.map((it, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleDriverBagCheck(currentJob.id, idx)}
                  className={`w-full min-h-[52px] p-3 rounded-xl border text-left flex items-center justify-between gap-3 cursor-pointer transition ${
                    it.checkedByDriver
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold">
                      {it.qty}x {it.name}
                    </div>
                    <div className="text-[10px] font-mono text-amber-400">
                      {it.tags.join(' · ')}
                    </div>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold ${
                      it.checkedByDriver
                        ? 'bg-emerald-500 text-slate-950'
                        : 'border border-slate-700 text-slate-500'
                    }`}
                  >
                    ✓
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setActiveOrderLifecycle('driver_picked_up');
            emitLifecycleEvent(
              'COURIER_HUD',
              'BAGS_VERIFIED_OUT_FOR_DELIVERY',
              `All ${currentJob.items.length} items verified for ${currentJob.orderNumber} · Turn-by-turn nav active`,
              'Courier Mateo has picked up your order and is on the way!'
            );
            onNavigate('driver_dropoff_pod');
          }}
          className="w-full min-h-[52px] rounded-2xl text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xl cursor-pointer"
          style={{ backgroundColor: allBagsVerified ? '#10B981' : primaryColor }}
        >
          <span>
            {allBagsVerified
              ? 'Confirm Pickup & Launch Turn-by-Turn Route →'
              : 'Verify Remaining Bags & Start Route →'}
          </span>
        </button>
      </div>
    );
  }

  // =========================================================================
  // SCREEN C3: CUSTOMER DROP-OFF & PHOTO CAPTURE (Prompt 4 Spec)
  // =========================================================================
  if (screenId === 'driver_dropoff_pod') {
    return (
      <div className="h-full flex flex-col justify-between p-4 bg-[#070A12] text-white overflow-y-auto space-y-3.5">
        <div className="space-y-3">
          {/* High-Contrast Turn-by-Turn Map Header ("Turn right on Oak Street in 200m") */}
          <div className="p-3.5 rounded-2xl bg-emerald-600 text-white flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-black/25 flex items-center justify-center font-extrabold text-lg">
                ↱
              </div>
              <div>
                <div className="text-sm font-extrabold leading-tight">
                  Turn right on Oak Street in 200m
                </div>
                <div className="text-[11px] font-mono opacity-90">
                  Then arrive at {currentJob.customerUnit}
                </div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-black/25 px-2.5 py-1 rounded-lg">
              2 min
            </span>
          </div>

          {/* Highlighted Customer Drop-Off Instructions Callout Box */}
          <div className="p-3.5 rounded-2xl bg-amber-500/15 border-2 border-amber-500/60 space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
              CUSTOMER DROP-OFF INSTRUCTIONS · CONTACTLESS
            </div>
            <div className="text-xs font-bold text-white leading-snug">
              “Leave at front door, ring doorbell” — {currentJob.dropoffNote}
            </div>
          </div>

          {/* Integrated Camera Scanner for Proof-of-Delivery Photo */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold">Mandatory Proof-of-Delivery Photo</span>
              <span className="text-[10px] font-mono text-emerald-400">
                {photoPreviewReady || currentJob.proofOfDeliveryPhotoCaptured
                  ? 'Verified ✓'
                  : 'Required'}
              </span>
            </div>

            {photoPreviewReady || currentJob.proofOfDeliveryPhotoCaptured ? (
              <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 size={16} />
                  <span>Doorstep thermal bag photo captured &amp; geotagged.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPhotoPreviewReady(false)}
                  className="text-[10px] font-mono underline cursor-pointer"
                >
                  Retake
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPhotoPreviewReady(true)}
                className="w-full min-h-[56px] rounded-xl border-2 border-dashed border-slate-700 hover:border-emerald-500 bg-slate-950 flex items-center justify-center gap-2 text-xs font-bold text-slate-300 cursor-pointer"
              >
                <Camera size={18} className="text-emerald-400" />
                <span>Tap to Capture Doorstep Photo Proof</span>
              </button>
            )}
          </div>
        </div>

        {/* Wide Green "Slide to Complete Delivery" Button */}
        <button
          type="button"
          onClick={() => {
            captureProofOfDelivery(currentJob.id);
            onNavigate('system_lifecycle_flow');
          }}
          className="w-full min-h-[54px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-between px-5 shadow-xl cursor-pointer"
        >
          <span>SLIDE TO COMPLETE DELIVERY ✓</span>
          <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  // =========================================================================
  // SCREEN D1: REAL-TIME DELIVERY LIFECYCLE & SYSTEM DATA FLOW BUS
  // =========================================================================
  return (
    <div className="h-full flex flex-col justify-between p-4 bg-[#070A12] text-white overflow-y-auto space-y-4">
      <div className="space-y-3">
        <div>
          <div className="text-[10px] font-mono text-emerald-400">
            WEBSOCKET EVENT STREAM &amp; PUSH LIFECYCLE BUS
          </div>
          <h3 className="text-sm font-bold">
            Customer ↔ Vendor KDS ↔ Courier HUD Telemetry
          </h3>
        </div>

        {/* Interactive Trigger Strip to Fire Live Lifecycle Events */}
        <div className="grid grid-cols-2 gap-1.5">
          {[
            {
              label: 'Fire 2m Geofence Alert',
              actor: 'DISPATCH_ENGINE' as const,
              type: 'GEOFENCE_2MIN_ALERT',
              summary: 'Courier entered 400m store radius -> KDS hot-bag trigger',
              push: 'Courier is 2 mins away from Smash & Sear!',
            },
            {
              label: 'Simulate Prep Delay (+5m)',
              actor: 'VENDOR_KDS' as const,
              type: 'PROACTIVE_ETA_UPDATE',
              summary: 'KDS extended prep by +5m -> Customer ETA recalculated',
              push: 'Kitchen added 5 mins to ensure your order is piping hot.',
            },
          ].map((trig) => (
            <button
              key={trig.label}
              type="button"
              onClick={() =>
                emitLifecycleEvent(trig.actor, trig.type, trig.summary, trig.push)
              }
              className="min-h-[44px] p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 text-[10px] font-mono font-bold text-left cursor-pointer"
            >
              ⚡ {trig.label}
            </button>
          ))}
        </div>

        {/* Live Event Log */}
        <div className="space-y-2">
          {socketEvents.map((ev) => (
            <div
              key={ev.id}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-[11px] font-mono"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">{ev.actor}</span>
                <span className="text-slate-500">{ev.timestamp}</span>
              </div>
              <div className="font-bold text-white">{ev.eventType}</div>
              <div className="text-[10px] text-slate-400 font-sans">
                {ev.payloadSummary}
              </div>
              <div className="text-[10px] text-indigo-300 bg-indigo-950/50 px-2 py-1 rounded">
                🔔 Push: “{ev.pushNotificationText}”
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onNavigate('driver_offer_accept')}
        className="w-full min-h-[48px] rounded-xl text-white font-bold text-xs cursor-pointer"
        style={{ backgroundColor: primaryColor }}
      >
        Return to Courier HUD Offer Screen
      </button>
    </div>
  );
};
