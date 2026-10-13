import React, { useState } from "react";
import { Plus, Search, X } from "lucide-react";
import {
  ADD_SCREEN_LAYOUT_TEMPLATES,
  AddScreenTemplateId,
  AddScreenTemplateMeta,
} from "../lib/screenTemplateBuilders";
import { GridSlot } from "../lib/screenGridUtils";

interface AddScreenLayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateScreen: (
    templateId: AddScreenTemplateId,
    screenName: string,
    targetPosition?: { x: number; y: number }
  ) => void;
  suggestedSlots?: GridSlot[];
  preselectedSlot?: GridSlot | { x: number; y: number; label?: string } | null;
}

export const AddScreenLayoutModal: React.FC<AddScreenLayoutModalProps> = ({
  isOpen,
  onClose,
  onCreateScreen,
  suggestedSlots,
  preselectedSlot,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<AddScreenTemplateId>("empty_activity");
  const [searchQuery, setSearchQuery] = useState("");
  const [columns, setColumns] = useState<2 | 3 | 4 | 5 | 6>(3);
  const [screenNameInput, setScreenNameInput] = useState("");
  const [selectedSlotKey, setSelectedSlotKey] = useState<string>("auto");

  React.useEffect(() => {
    if (preselectedSlot) {
      setSelectedSlotKey(`${preselectedSlot.x},${preselectedSlot.y}`);
    } else if (suggestedSlots && suggestedSlots.length > 0) {
      const def = suggestedSlots.find((s) => s.isDefault) || suggestedSlots[0];
      setSelectedSlotKey(`${def.x},${def.y}`);
    } else {
      setSelectedSlotKey("auto");
    }
  }, [isOpen, preselectedSlot, suggestedSlots]);

  if (!isOpen) return null;

  const filteredTemplates = ADD_SCREEN_LAYOUT_TEMPLATES.filter((tpl) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      tpl.title.toLowerCase().includes(q) ||
      tpl.subtitle.toLowerCase().includes(q) ||
      (tpl.badge && tpl.badge.toLowerCase().includes(q))
    );
  });

  const selectedTemplate =
    ADD_SCREEN_LAYOUT_TEMPLATES.find((t) => t.id === selectedTemplateId) ||
    ADD_SCREEN_LAYOUT_TEMPLATES[0];

  const handleCreate = (tplId?: AddScreenTemplateId) => {
    const idToUse = tplId || selectedTemplateId;
    const targetMeta =
      ADD_SCREEN_LAYOUT_TEMPLATES.find((t) => t.id === idToUse) || selectedTemplate;
    const finalName = screenNameInput.trim() || targetMeta.title;

    let targetPos: { x: number; y: number } | undefined = undefined;
    if (selectedSlotKey !== "auto") {
      const parts = selectedSlotKey.split(",");
      const x = Number(parts[0]);
      const y = Number(parts[1]);
      if (!Number.isNaN(x) && !Number.isNaN(y)) {
        targetPos = { x, y };
      }
    } else if (suggestedSlots && suggestedSlots.length > 0) {
      const def = suggestedSlots.find((s) => s.isDefault) || suggestedSlots[0];
      targetPos = { x: def.x, y: def.y };
    }

    onCreateScreen(idToUse, finalName, targetPos);
    onClose();
  };

  const renderPhoneThumbnail = (tpl: AddScreenTemplateMeta) => {
    switch (tpl.id) {
      case "blank_screen":
        return (
          <div className="w-24 h-36 rounded-2xl flex items-center justify-center">
            <div className="w-16 h-16 rounded-xl border-2 border-dashed border-neutral-500/80 flex items-center justify-center text-neutral-400">
              <Plus size={20} />
            </div>
          </div>
        );

      case "empty_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col border border-neutral-200">
            <div className="h-5 bg-[#00A651] px-2 flex items-center justify-between text-white text-[9px] font-black">
              <span>←</span>
              <span>⋮</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-2 gap-1.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00A651] via-[#1E88E5] to-[#1565C0] flex items-center justify-center shadow-sm">
                <div className="w-5 h-5 rounded bg-white/95 shadow-xs" />
              </div>
            </div>
          </div>
        );

      case "featured_store_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-visible flex flex-col items-center justify-center relative border border-neutral-200 p-2">
            {tpl.badge && (
              <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-[#E8DEF8] text-[#1D192B] text-[9px] font-extrabold shadow-xs">
                {tpl.badge}
              </span>
            )}
            <div className="w-full space-y-1.5">
              <div className="h-3 rounded bg-neutral-100 border border-neutral-200" />
              <div className="grid grid-cols-2 gap-1.5">
                <div className="h-14 rounded-lg bg-gradient-to-br from-indigo-500/20 to-blue-500/30 border border-indigo-400/40 flex flex-col justify-end p-1">
                  <span className="h-2 w-8 rounded bg-indigo-600 block" />
                </div>
                <div className="h-14 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/30 border border-emerald-400/40 flex flex-col justify-end p-1">
                  <span className="h-2 w-8 rounded bg-emerald-600 block" />
                </div>
              </div>
              <div className="h-4 rounded bg-indigo-600/15" />
            </div>
          </div>
        );

      case "navigation_ui_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col justify-between border border-neutral-200">
            <div className="h-5 bg-[#00A651] px-2 flex items-center justify-between text-white text-[9px] font-black">
              <span>←</span>
              <span>⋮</span>
            </div>
            <div className="flex-1 flex items-center justify-center p-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A651] via-[#1E88E5] to-[#1565C0] flex items-center justify-center shadow-sm">
                <div className="w-4 h-4 rounded bg-white/95" />
              </div>
            </div>
            <div className="h-5 bg-[#00A651] grid grid-cols-3">
              <div />
              <div className="bg-[#C6FF00]" />
              <div />
            </div>
          </div>
        );

      case "basic_views_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col justify-between relative border border-neutral-200">
            <div className="h-5 bg-[#00A651] px-2 flex items-center justify-between text-white text-[9px] font-black">
              <span>←</span>
              <span>⋮</span>
            </div>
            <div className="p-2 space-y-1.5 flex-1">
              <div className="h-3 w-3/4 rounded bg-neutral-100" />
              <div className="h-8 rounded bg-neutral-100" />
              <div className="h-8 rounded bg-neutral-100" />
            </div>
            <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-[#C6FF00] text-neutral-900 text-xs font-black flex items-center justify-center shadow-xs">
              +
            </div>
          </div>
        );

      case "empty_views_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col border border-neutral-200">
            <div className="h-5 bg-[#00A651] px-2 flex items-center justify-between text-white text-[9px] font-black">
              <span>←</span>
              <span>⋮</span>
            </div>
            <div className="flex-1 bg-white" />
          </div>
        );

      case "responsive_views_activity":
        return (
          <div className="w-32 h-24 rounded-2xl bg-white shadow-md overflow-hidden flex border border-neutral-200 relative">
            <div className="w-10 bg-[#A5D6A7]/40 border-r border-emerald-500/20 flex flex-col">
              <div className="h-10 bg-[#00A651] flex flex-col items-center justify-center gap-0.5 p-1">
                <div className="w-4 h-4 rounded-full bg-[#1B5E20]" />
                <div className="w-5 h-1 rounded bg-[#1B5E20]" />
              </div>
              <div className="p-1.5 space-y-1">
                <div className="h-1 rounded bg-[#00A651]" />
                <div className="h-1 rounded bg-[#00A651]" />
                <div className="h-1 rounded bg-[#00A651]" />
              </div>
            </div>
            <div className="flex-1 p-2 grid grid-cols-2 gap-1.5 relative">
              <div className="rounded bg-[#C8E6C9]" />
              <div className="rounded bg-[#C8E6C9]" />
              <div className="rounded bg-[#C8E6C9]" />
              <div className="rounded bg-[#C8E6C9]" />
              <div className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-[#C6FF00] text-neutral-900 text-[10px] font-black flex items-center justify-center shadow-xs">
                +
              </div>
            </div>
          </div>
        );

      case "flatlist_catalog_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col border border-neutral-200 p-2 gap-1.5">
            <div className="h-3.5 rounded bg-[#00A651]/15 flex items-center px-1.5">
              <span className="text-[7px] font-black text-[#00A651]">
                &lt;FlatList /&gt;
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1 flex-1">
              <div className="rounded bg-neutral-100 border border-neutral-200 p-1 flex flex-col justify-between">
                <div className="h-5 rounded bg-emerald-500/25" />
                <div className="h-1.5 rounded bg-neutral-300" />
              </div>
              <div className="rounded bg-neutral-100 border border-neutral-200 p-1 flex flex-col justify-between">
                <div className="h-5 rounded bg-indigo-500/25" />
                <div className="h-1.5 rounded bg-neutral-300" />
              </div>
              <div className="rounded bg-neutral-100 border border-neutral-200 p-1 flex flex-col justify-between">
                <div className="h-5 rounded bg-amber-500/25" />
                <div className="h-1.5 rounded bg-neutral-300" />
              </div>
              <div className="rounded bg-neutral-100 border border-neutral-200 p-1 flex flex-col justify-between">
                <div className="h-5 rounded bg-rose-500/25" />
                <div className="h-1.5 rounded bg-neutral-300" />
              </div>
            </div>
          </div>
        );

      case "checkout_form_activity":
        return (
          <div className="w-24 h-36 rounded-2xl border-2 border-dashed border-neutral-500 bg-[#25272B] flex flex-col items-center justify-center p-2.5 gap-1.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
              UI
            </div>
            <div className="w-full space-y-1">
              <div className="h-2 rounded bg-white/20" />
              <div className="h-2 rounded bg-white/15" />
              <div className="h-3 rounded bg-emerald-500/80 mt-1" />
            </div>
          </div>
        );

      case "bottom_navigation_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-visible flex flex-col justify-between relative border border-neutral-200">
            {tpl.badge && (
              <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[8px] font-extrabold shadow-xs z-10">
                {tpl.badge}
              </span>
            )}
            <div className="p-2 space-y-1.5 flex-1">
              <div className="h-6 rounded-lg bg-gradient-to-r from-[#00A651] to-emerald-600" />
              <div className="grid grid-cols-2 gap-1">
                <div className="h-12 rounded bg-neutral-100 border border-neutral-200" />
                <div className="h-12 rounded bg-neutral-100 border border-neutral-200" />
              </div>
            </div>
            <div className="h-5 bg-[#00A651] grid grid-cols-4 gap-1 px-1.5 items-center">
              <div className="h-2 rounded-full bg-[#C6FF00]" />
              <div className="h-2 rounded-full bg-white/50" />
              <div className="h-2 rounded-full bg-white/50" />
              <div className="h-2 rounded-full bg-white/50" />
            </div>
          </div>
        );

      case "navigation_drawer_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex border border-neutral-200">
            <div className="w-10 bg-[#E8F5E9] border-r border-emerald-500/20 flex flex-col">
              <div className="h-8 bg-[#00A651] p-1.5 flex flex-col justify-end">
                <div className="w-3.5 h-3.5 rounded-full bg-[#C6FF00]" />
              </div>
              <div className="p-1.5 space-y-1.5">
                <div className="h-1.5 rounded bg-[#00A651]" />
                <div className="h-1.5 rounded bg-emerald-600/40" />
                <div className="h-1.5 rounded bg-emerald-600/40" />
                <div className="h-1.5 rounded bg-emerald-600/40" />
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="h-5 bg-[#00A651]/85 px-1.5 flex items-center text-white text-[8px] font-black">
                ☰
              </div>
              <div className="p-1.5 space-y-1.5 flex-1">
                <div className="h-6 rounded bg-neutral-100" />
                <div className="h-6 rounded bg-neutral-100" />
                <div className="h-6 rounded bg-neutral-100" />
              </div>
            </div>
          </div>
        );

      case "tabbed_views_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col border border-neutral-200">
            <div className="h-5 bg-[#00A651] px-2 flex items-center justify-between text-white text-[9px] font-black">
              <span>←</span>
              <span>⋮</span>
            </div>
            <div className="h-4 bg-[#008943] grid grid-cols-3 items-end px-1">
              <div className="h-1 bg-[#C6FF00] rounded-t" />
              <div className="h-1 bg-white/30" />
              <div className="h-1 bg-white/30" />
            </div>
            <div className="p-2 grid grid-cols-2 gap-1.5 flex-1">
              <div className="rounded-lg bg-neutral-100 border border-neutral-200" />
              <div className="rounded-lg bg-neutral-100 border border-neutral-200" />
            </div>
          </div>
        );

      case "fullscreen_hero_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#00A651] shadow-md overflow-visible flex flex-col justify-between p-2.5 relative border border-white/20">
            {tpl.badge && (
              <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 text-[8px] font-extrabold shadow-xs">
                {tpl.badge}
              </span>
            )}
            <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white text-[9px]">
              ▶
            </div>
            <div className="space-y-1">
              <div className="h-2 w-12 rounded bg-white/90" />
              <div className="h-4 rounded-lg bg-[#C6FF00]" />
            </div>
          </div>
        );

      case "scrolling_collapsing_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col relative border border-neutral-200">
            <div className="h-12 bg-gradient-to-br from-[#00A651] to-emerald-700 p-2 flex flex-col justify-between text-white">
              <div className="flex justify-between text-[8px] font-black">
                <span>←</span>
                <span>⋮</span>
              </div>
              <div className="h-2 w-12 rounded bg-white/90" />
            </div>
            <div className="w-4 h-4 rounded-full bg-[#C6FF00] absolute top-10 right-2 flex items-center justify-center text-[9px] font-black text-neutral-900 shadow-xs">
              ★
            </div>
            <div className="p-2 space-y-1.5 flex-1 mt-1">
              <div className="h-2.5 rounded bg-neutral-200" />
              <div className="h-2.5 w-4/5 rounded bg-neutral-100" />
              <div className="h-8 rounded bg-neutral-100 border border-neutral-200" />
            </div>
          </div>
        );

      case "master_detail_flow_activity":
        return (
          <div className="w-32 h-24 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col border border-neutral-200">
            <div className="h-4 bg-[#00A651] px-2 flex items-center justify-between text-white text-[8px] font-black">
              <span>← Split Flow</span>
              <span>⋮</span>
            </div>
            <div className="flex-1 flex">
              <div className="w-11 border-r border-neutral-200 p-1 space-y-1 bg-neutral-50">
                <div className="h-3 rounded bg-[#00A651]/25" />
                <div className="h-3 rounded bg-neutral-200" />
                <div className="h-3 rounded bg-neutral-200" />
              </div>
              <div className="flex-1 p-1.5 flex flex-col justify-between">
                <div className="h-8 rounded bg-emerald-500/15 border border-emerald-500/30" />
                <div className="h-2.5 rounded bg-[#00A651]" />
              </div>
            </div>
          </div>
        );

      case "login_auth_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col border border-neutral-200">
            <div className="h-5 bg-[#00A651] px-2 flex items-center text-white text-[8px] font-black">
              <span>🔒 Auth</span>
            </div>
            <div className="p-2.5 flex-1 flex flex-col justify-center gap-1.5">
              <div className="w-7 h-7 rounded-full bg-emerald-500/15 text-[#00A651] mx-auto flex items-center justify-center text-[10px] font-black">
                🔑
              </div>
              <div className="h-3.5 rounded border border-neutral-300 bg-neutral-50" />
              <div className="h-3.5 rounded border border-neutral-300 bg-neutral-50" />
              <div className="h-4 rounded bg-[#00A651]" />
            </div>
          </div>
        );

      case "settings_preferences_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col border border-neutral-200">
            <div className="h-5 bg-[#00A651] px-2 flex items-center justify-between text-white text-[9px] font-black">
              <span>←</span>
              <span>⚙</span>
            </div>
            <div className="p-2 space-y-2 flex-1">
              {[1, 2, 3, 4].map((r) => (
                <div key={r} className="flex items-center justify-between">
                  <div className="h-2 w-11 rounded bg-neutral-200" />
                  <div
                    className={`w-4 h-2.5 rounded-full ${
                      r % 2 === 1 ? "bg-[#00A651]" : "bg-neutral-300"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "google_maps_store_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-[#E8F5E9] shadow-md overflow-visible flex flex-col justify-between relative border border-neutral-200">
            {tpl.badge && (
              <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-sky-500 text-white text-[8px] font-extrabold shadow-xs z-10">
                {tpl.badge}
              </span>
            )}
            <div className="h-5 bg-[#00A651] px-2 flex items-center justify-between text-white text-[9px] font-black rounded-t-2xl">
              <span>←</span>
              <span>⋮</span>
            </div>
            <div className="flex-1 flex items-center justify-center relative">
              <div className="w-6 h-6 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-md">
                📍
              </div>
            </div>
            <div className="m-1.5 p-1.5 rounded-lg bg-white shadow-xs space-y-1">
              <div className="h-2 w-12 rounded bg-neutral-800" />
              <div className="h-2 w-8 rounded bg-[#00A651]" />
            </div>
          </div>
        );

      case "product_showcase_pdp_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col border border-neutral-200">
            <div className="h-14 bg-gradient-to-br from-indigo-500/20 to-emerald-500/25 flex items-center justify-center text-xs">
              🛍️
            </div>
            <div className="p-2 space-y-1.5 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="h-2 w-10 rounded bg-neutral-800 block" />
                  <span className="h-2.5 w-6 rounded bg-emerald-500 block" />
                </div>
                <div className="h-2 w-14 rounded bg-neutral-200" />
              </div>
              <div className="h-4 rounded bg-[#00A651]" />
            </div>
          </div>
        );

      case "video_story_reel_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-visible flex flex-col border border-neutral-200 p-1.5 gap-1.5 relative">
            {tpl.badge && (
              <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[8px] font-extrabold shadow-xs z-10">
                {tpl.badge}
              </span>
            )}
            <div className="h-14 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-[10px]">
              ▶
            </div>
            <div className="grid grid-cols-2 gap-1 flex-1">
              <div className="rounded bg-neutral-100 border border-neutral-200" />
              <div className="rounded bg-neutral-100 border border-neutral-200" />
            </div>
          </div>
        );

      case "bento_analytics_dashboard_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col border border-neutral-200">
            <div className="h-5 bg-[#00A651] px-2 flex items-center justify-between text-white text-[9px] font-black">
              <span>KPI</span>
              <span>⋮</span>
            </div>
            <div className="p-1.5 grid grid-cols-2 gap-1 flex-1">
              <div className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 p-1">
                <div className="h-2 w-6 rounded bg-[#00A651]" />
              </div>
              <div className="rounded-lg bg-indigo-500/15 border border-indigo-500/30 p-1">
                <div className="h-2 w-6 rounded bg-indigo-600" />
              </div>
              <div className="col-span-2 rounded-lg bg-neutral-100 border border-neutral-200 p-1" />
            </div>
          </div>
        );

      case "onboarding_carousel_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-visible flex flex-col justify-between p-2 relative border border-neutral-200">
            {tpl.badge && (
              <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-indigo-500 text-white text-[8px] font-extrabold shadow-xs z-10">
                {tpl.badge}
              </span>
            )}
            <div className="h-16 rounded-xl bg-gradient-to-br from-[#00A651] to-teal-700 flex items-center justify-center text-white text-xs font-black">
              01
            </div>
            <div className="flex justify-center gap-1 my-1">
              <span className="w-3 h-1 rounded-full bg-[#00A651]" />
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
            </div>
            <div className="h-4 rounded-lg bg-[#00A651]" />
          </div>
        );

      case "shopping_cart_bag_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col justify-between border border-neutral-200">
            <div className="h-5 bg-[#00A651] px-2 flex items-center justify-between text-white text-[8px] font-black">
              <span>🛒 Bag (3)</span>
              <span>⋮</span>
            </div>
            <div className="p-1.5 space-y-1 flex-1">
              <div className="h-6 rounded bg-neutral-100 border border-neutral-200 flex items-center px-1 gap-1">
                <div className="w-3.5 h-3.5 rounded bg-emerald-500/30" />
                <div className="h-1.5 w-10 rounded bg-neutral-300" />
              </div>
              <div className="h-6 rounded bg-neutral-100 border border-neutral-200 flex items-center px-1 gap-1">
                <div className="w-3.5 h-3.5 rounded bg-indigo-500/30" />
                <div className="h-1.5 w-10 rounded bg-neutral-300" />
              </div>
            </div>
            <div className="p-1.5 border-t border-neutral-200">
              <div className="h-4 rounded bg-[#00A651]" />
            </div>
          </div>
        );

      case "wishlist_saved_grid_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col border border-neutral-200">
            <div className="h-5 bg-[#00A651] px-2 flex items-center justify-between text-white text-[8px] font-black">
              <span>♥ Saved</span>
              <span>⋮</span>
            </div>
            <div className="p-1.5 grid grid-cols-2 gap-1 flex-1">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="rounded bg-rose-500/10 border border-rose-500/25 p-1 flex flex-col justify-between"
                >
                  <span className="text-[7px] text-rose-500 self-end">♥</span>
                  <div className="h-1.5 rounded bg-rose-500/40" />
                </div>
              ))}
            </div>
          </div>
        );

      case "flash_sale_countdown_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-visible flex flex-col border border-neutral-200 p-1.5 gap-1.5 relative">
            {tpl.badge && (
              <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 text-[8px] font-extrabold shadow-xs z-10">
                {tpl.badge}
              </span>
            )}
            <div className="h-6 rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[7px] font-black flex items-center justify-center">
              ⚡ 02:14:59
            </div>
            <div className="grid grid-cols-2 gap-1 flex-1">
              <div className="rounded bg-amber-500/10 border border-amber-500/30" />
              <div className="rounded bg-amber-500/10 border border-amber-500/30" />
            </div>
          </div>
        );

      case "order_tracking_timeline_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col border border-neutral-200">
            <div className="h-5 bg-[#00A651] px-2 flex items-center justify-between text-white text-[8px] font-black">
              <span>📦 Track</span>
              <span>⋮</span>
            </div>
            <div className="p-2 space-y-2 flex-1 flex flex-col justify-center">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A651] flex-shrink-0" />
                  <div className="h-2 flex-1 rounded bg-neutral-200" />
                </div>
              ))}
            </div>
          </div>
        );

      case "wallet_loyalty_card_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-visible flex flex-col border border-neutral-200 p-2 gap-1.5 relative">
            {tpl.badge && (
              <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 text-[8px] font-extrabold shadow-xs z-10">
                {tpl.badge}
              </span>
            )}
            <div className="h-12 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-700 p-1.5 flex flex-col justify-between">
              <div className="w-3.5 h-2.5 rounded bg-amber-400" />
              <div className="h-1.5 w-12 rounded bg-white/80" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="h-4 rounded bg-neutral-100" />
              <div className="h-4 rounded bg-neutral-100" />
            </div>
          </div>
        );

      case "chat_concierge_support_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col justify-between border border-neutral-200">
            <div className="h-5 bg-[#00A651] px-2 flex items-center justify-between text-white text-[8px] font-black">
              <span>💬 Support</span>
              <span>⋮</span>
            </div>
            <div className="p-1.5 space-y-1.5 flex-1">
              <div className="h-4 w-3/4 rounded-lg bg-neutral-100" />
              <div className="h-4 w-3/4 ml-auto rounded-lg bg-[#00A651]/20" />
              <div className="h-4 w-2/3 rounded-lg bg-neutral-100" />
            </div>
            <div className="p-1 border-t border-neutral-200">
              <div className="h-3.5 rounded-full bg-neutral-100" />
            </div>
          </div>
        );

      case "review_ratings_gallery_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col border border-neutral-200 p-2 gap-1.5">
            <div className="h-5 rounded bg-amber-500/15 flex items-center justify-center text-[8px] font-black text-amber-600">
              ★★★★★ 4.9
            </div>
            <div className="grid grid-cols-2 gap-1 flex-1">
              <div className="rounded bg-neutral-100 border border-neutral-200" />
              <div className="rounded bg-neutral-100 border border-neutral-200" />
            </div>
            <div className="h-4 rounded bg-neutral-100" />
          </div>
        );

      case "category_mega_menu_activity":
        return (
          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col border border-neutral-200">
            <div className="h-5 bg-[#00A651] px-2 flex items-center justify-between text-white text-[8px] font-black">
              <span>☰ Categories</span>
            </div>
            <div className="p-1.5 space-y-1.5 flex-1">
              <div className="flex gap-1">
                <span className="h-2.5 flex-1 rounded-full bg-[#00A651]" />
                <span className="h-2.5 flex-1 rounded-full bg-neutral-200" />
              </div>
              <div className="grid grid-cols-2 gap-1 flex-1 h-16">
                <div className="rounded bg-emerald-500/15 border border-emerald-500/30" />
                <div className="rounded bg-indigo-500/15 border border-indigo-500/30" />
                <div className="rounded bg-amber-500/15 border border-amber-500/30" />
                <div className="rounded bg-rose-500/15 border border-rose-500/30" />
              </div>
            </div>
          </div>
        );

      case "qr_scanner_ar_tryon_activity":
      default:
        return (
          <div className="w-24 h-36 rounded-2xl bg-neutral-900 shadow-md overflow-visible flex flex-col items-center justify-between p-2.5 relative border border-white/20">
            {tpl.badge && (
              <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-[#C6FF00] text-neutral-950 text-[8px] font-extrabold shadow-xs z-10">
                {tpl.badge}
              </span>
            )}
            <div className="w-full flex justify-between text-[8px] text-white/70 font-mono">
              <span>AR</span>
              <span>✕</span>
            </div>
            <div className="w-12 h-12 rounded-xl border-2 border-dashed border-[#C6FF00] flex items-center justify-center text-[#C6FF00] text-[10px] font-black">
              [ + ]
            </div>
            <div className="w-full h-3.5 rounded-full bg-[#00A651]" />
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 select-none animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-[90vw] max-w-[90vw] h-[90vh] max-h-[90vh] rounded-3xl border border-white/15 bg-[#1E1F22] text-white shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#2B2D30] flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
              style={{ backgroundColor: "#00A651" }}
            >
              <Plus size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-black text-white">
                  Add New Screen — Choose Screen Layout Template
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold">
                  Blank Screen + 30 Screen Layouts ({ADD_SCREEN_LAYOUT_TEMPLATES.length} Total)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 text-[10px] font-mono font-bold">
                  {columns} Items / Row
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Select Blank Screen or any of the 30 pre-architected screen layouts below, then click Create Screen (or double-click any card).
              </p>
            </div>
          </div>

          {/* Controls: Search + Column Selector + Close */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search Input */}
            <div className="relative w-44 sm:w-52">
              <Search
                size={13}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search screen layouts..."
                className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-[#1E1F22] border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#3574F0]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Column Selector */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#1E1F22] border border-white/15">
              <span className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
                COLUMNS:
              </span>
              {([2, 3, 4, 5, 6] as const).map((cols) => {
                const isActive = columns === cols;
                return (
                  <button
                    key={cols}
                    type="button"
                    onClick={() => setColumns(cols)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition cursor-pointer ${
                      isActive
                        ? "bg-[#3574F0] text-white shadow-xs"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                    title={`Show ${cols} screen layout items per 1 row`}
                  >
                    {cols} Cols
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500 text-neutral-300 hover:text-white transition cursor-pointer"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Grid of Screen Layouts */}
        <div className="p-6 overflow-y-auto flex-1 min-h-0 bg-[#1E1F22]">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {filteredTemplates.map((tpl) => {
              const isSelected = selectedTemplateId === tpl.id;

              return (
                <div
                  key={tpl.id}
                  data-template-id={tpl.id}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  onDoubleClick={() => handleCreate(tpl.id)}
                  className={`group rounded-xl border transition-all flex flex-col justify-between cursor-pointer overflow-hidden ${
                    isSelected
                      ? "border-white/40 bg-[#2B2D30] ring-2 ring-[#3574F0]"
                      : "border-white/5 bg-[#1E1F22] hover:bg-[#25272B] hover:border-white/15"
                  }`}
                >
                  <div className="h-44 flex items-center justify-center p-3">
                    {renderPhoneThumbnail(tpl)}
                  </div>

                  <div
                    className={`px-2.5 py-2 text-center transition ${
                      isSelected ? "bg-[#393B40]" : "bg-transparent"
                    }`}
                  >
                    <div className="text-xs font-semibold text-neutral-100 truncate">
                      {tpl.title}
                    </div>
                    <div className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">
                      {tpl.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#2B2D30] flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3 flex-wrap flex-1 min-w-[240px]">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-neutral-300 whitespace-nowrap">
                Screen Name:
              </label>
              <input
                type="text"
                value={screenNameInput}
                onChange={(e) => setScreenNameInput(e.target.value)}
                placeholder={selectedTemplate.title}
                className="px-3 py-1.5 rounded-lg bg-[#1E1F22] border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#3574F0] w-56"
              />
            </div>

            {suggestedSlots && suggestedSlots.length > 0 && (
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-blue-400 whitespace-nowrap">
                  Place At:
                </label>
                <select
                  value={selectedSlotKey}
                  onChange={(e) => setSelectedSlotKey(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#1E1F22] border border-blue-500/40 text-xs text-blue-200 font-semibold focus:outline-none focus:border-[#3574F0]"
                >
                  {suggestedSlots.map((slot, idx) => (
                    <option key={idx} value={`${slot.x},${slot.y}`}>
                      ✨ {slot.label} {slot.isDefault ? "★ (Fill Gap)" : ""}
                    </option>
                  ))}
                  <option value="auto">➡️ Append to End</option>
                </select>
              </div>
            )}

            <span className="text-[11px] text-neutral-400">
              Selected:{" "}
              <strong className="text-white">{selectedTemplate.title}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-white/15 bg-transparent hover:bg-white/10 text-xs font-bold text-neutral-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleCreate(selectedTemplateId)}
              className="px-5 py-2 rounded-lg bg-[#3574F0] hover:bg-[#2E65D8] text-xs font-black text-white shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={14} />
              <span>Create Screen</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
