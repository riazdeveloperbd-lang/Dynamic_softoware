import React, { useState, useMemo } from "react";
import {
  Action,
  ActionTrigger,
  ActionType,
  OverlayPosition,
  Frame,
  Item,
  Palette,
  Transition,
  isPhoneFrame,
} from "../lib/tokens";
import { Icon } from "./M3Node";
import { Search, X, Trash2, Sparkles, Layers, Sliders, ArrowRight } from "lucide-react";

export interface InteractionPopoverProps {
  item: Item;
  sourceFrame?: Frame | null;
  allFrames: Frame[];
  action?: Action;
  position?: { x: number; y: number };
  slot?: string;
  palette: Palette;
  onSaveAction: (action: Action | undefined) => void;
  onClose: () => void;
}

const TRIGGER_OPTIONS: { id: ActionTrigger; label: string; icon: string; desc: string }[] = [
  { id: "tap", label: "On tap", icon: "touch_app", desc: "Triggers when user taps/clicks" },
  { id: "hover", label: "While hovering", icon: "mouse", desc: "Triggers on mouse cursor hover" },
  { id: "drag", label: "On swipe / drag", icon: "swipe", desc: "Triggers on swipe gesture" },
  { id: "delay", label: "After delay", icon: "timer", desc: "Triggers automatically after timer" },
];

const ACTION_TYPE_OPTIONS: { id: ActionType; label: string; icon: string; desc: string }[] = [
  { id: "navigate", label: "Navigate to", icon: "arrow_forward", desc: "Transitions to target page" },
  { id: "overlay", label: "Open overlay (Modal / Sheet)", icon: "layers", desc: "Opens screen as modal or bottom sheet over current" },
  { id: "close_overlay", label: "Close overlay", icon: "close", desc: "Closes active modal or overlay" },
  { id: "back", label: "Back", icon: "arrow_back", desc: "Returns to previous screen in stack" },
  { id: "link", label: "Open external link", icon: "open_in_new", desc: "Opens URL in browser" },
  { id: "toggle", label: "Toggle component state", icon: "swap_horiz", desc: "Toggles checked or active state" },
];

const OVERLAY_POSITIONS: { id: OverlayPosition; label: string; icon: string }[] = [
  { id: "bottom", label: "Bottom Sheet", icon: "vertical_align_bottom" },
  { id: "center", label: "Centered Modal", icon: "center_focus_strong" },
  { id: "top", label: "Top Banner", icon: "vertical_align_top" },
  { id: "fullscreen", label: "Full Screen Overlap", icon: "fullscreen" },
];

const ANIMATION_OPTIONS: { id: Transition; label: string }[] = [
  { id: "slide", label: "Slide In Right" },
  { id: "slideLeft", label: "Slide In Left" },
  { id: "slideUp", label: "Slide Up" },
  { id: "slideDown", label: "Slide Down" },
  { id: "fade", label: "Dissolve / Fade" },
  { id: "expand", label: "Smart Animate / Expand" },
  { id: "none", label: "Instant" },
];

export const InteractionPopover: React.FC<InteractionPopoverProps> = ({
  item,
  sourceFrame,
  allFrames,
  action,
  position,
  slot,
  palette: p,
  onSaveAction,
  onClose,
}) => {
  const [trigger, setTrigger] = useState<ActionTrigger>(action?.trigger || "tap");
  const [actionType, setActionType] = useState<ActionType>(
    action?.actionType || (action?.to ? "navigate" : "navigate")
  );
  const [targetScreenId, setTargetScreenId] = useState<string>(
    action?.to && action.to !== "none" ? action.to : allFrames[0]?.id || ""
  );
  const [overlayPos, setOverlayPos] = useState<OverlayPosition>(
    action?.overlayPosition || "bottom"
  );
  const [closeOnOutside, setCloseOnOutside] = useState<boolean>(
    action?.closeOnOutsideClick !== false
  );
  const [dimBg, setDimBg] = useState<boolean>(action?.dimBackground !== false);
  const [animation, setAnimation] = useState<Transition>(action?.transition || "slide");
  const [externalUrl, setExternalUrl] = useState<string>(action?.url || "https://");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFrames = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allFrames;
    return allFrames.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.id.toLowerCase().includes(q) ||
        (f.note && f.note.toLowerCase().includes(q))
    );
  }, [allFrames, searchQuery]);

  const targetFrame = allFrames.find((f) => f.id === targetScreenId);

  const handleApply = () => {
    if (actionType === "close_overlay") {
      onSaveAction({
        to: "none",
        transition: "none",
        trigger,
        actionType: "close_overlay",
      });
      onClose();
      return;
    }

    if (actionType === "back") {
      onSaveAction({
        to: "back",
        transition: animation,
        trigger,
        actionType: "back",
      });
      onClose();
      return;
    }

    if (actionType === "link") {
      onSaveAction({
        to: "link",
        transition: "none",
        url: externalUrl,
        trigger,
        actionType: "link",
      });
      onClose();
      return;
    }

    if (actionType === "toggle") {
      onSaveAction({
        to: "toggle",
        transition: "none",
        trigger,
        actionType: "toggle",
      });
      onClose();
      return;
    }

    // Navigate or Overlay
    onSaveAction({
      to: targetScreenId,
      transition: animation,
      trigger,
      actionType,
      overlayPosition: actionType === "overlay" ? overlayPos : undefined,
      closeOnOutsideClick: actionType === "overlay" ? closeOnOutside : undefined,
      dimBackground: actionType === "overlay" ? dimBg : undefined,
    });
    onClose();
  };

  const handleRemove = () => {
    onSaveAction(undefined);
    onClose();
  };

  const popoverStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    width: 340,
    maxHeight: "88vh",
    backgroundColor: "#1E1F22",
    borderRadius: 16,
    border: "1px solid rgba(255, 255, 255, 0.16)",
    boxShadow: "0 24px 60px rgba(0, 0, 0, 0.65), 0 4px 12px rgba(0, 0, 0, 0.4)",
    display: "flex",
    flexDirection: "column",
    color: "#FFFFFF",
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontSize: 12,
    ...(position
      ? {
          left: Math.min(window.innerWidth - 360, Math.max(20, position.x)),
          top: Math.min(window.innerHeight - 560, Math.max(20, position.y)),
        }
      : {
          right: 320,
          top: 80,
        }),
  };

  return (
    <div style={popoverStyle} onClick={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()}>
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#2B2D30",
          borderRadius: "16px 16px 0 0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              backgroundColor: "#3574F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={14} color="#FFF" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>Interaction</div>
            <div style={{ fontSize: 10, color: "#9CA3AF" }}>
              {item.label || item.kind} {sourceFrame ? `on ${sourceFrame.name}` : ""}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {action && (
            <button
              type="button"
              onClick={handleRemove}
              title="Remove interaction"
              style={{
                background: "transparent",
                border: "none",
                color: "#EF4444",
                cursor: "pointer",
                padding: 4,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Trash2 size={15} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#9CA3AF",
              cursor: "pointer",
              padding: 4,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "16px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          flex: 1,
        }}
        className="no-scrollbar"
      >
        {/* Trigger Selector */}
        <div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#9CA3AF", marginBottom: 6 }}>
            TRIGGER
          </label>
          <select
            value={trigger}
            onChange={(e) => setTrigger(e.target.value as ActionTrigger)}
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: 8,
              backgroundColor: "#161719",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FFF",
              fontSize: 12,
              fontWeight: 600,
              outline: "none",
            }}
          >
            {TRIGGER_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label} — {opt.desc}
              </option>
            ))}
          </select>
        </div>

        {/* Action Type Selector */}
        <div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#9CA3AF", marginBottom: 6 }}>
            ACTION
          </label>
          <select
            value={actionType}
            onChange={(e) => setActionType(e.target.value as ActionType)}
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: 8,
              backgroundColor: "#161719",
              border: actionType === "overlay" ? "1px solid #3574F0" : "1px solid rgba(255, 255, 255, 0.15)",
              color: actionType === "overlay" ? "#60A5FA" : "#FFF",
              fontSize: 12,
              fontWeight: 700,
              outline: "none",
            }}
          >
            {ACTION_TYPE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          {actionType === "overlay" && (
            <div style={{ marginTop: 4, fontSize: 10, color: "#60A5FA" }}>
              ✨ Overlays this screen as a modal or bottom sheet on top of the current screen
            </div>
          )}
        </div>

        {/* Destination Screen Picker with Instant Search */}
        {(actionType === "navigate" || actionType === "overlay") && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF" }}>
                DESTINATION SCREEN / PAGE
              </label>
              {targetFrame && (
                <span style={{ fontSize: 10, color: "#60A5FA", fontWeight: 700 }}>
                  Selected: {targetFrame.name}
                </span>
              )}
            </div>

            {/* Search Input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 10px",
                borderRadius: 8,
                backgroundColor: "#161719",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                marginBottom: 6,
              }}
            >
              <Search size={14} color="#9CA3AF" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pages (e.g. Home, Cart, #8)..."
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#FFF",
                  fontSize: 11,
                  width: "100%",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{ background: "transparent", border: "none", color: "#9CA3AF", cursor: "pointer", padding: 0 }}
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Filtered Pages Listbox */}
            <div
              style={{
                maxHeight: 140,
                overflowY: "auto",
                borderRadius: 8,
                border: "1px solid rgba(255, 255, 255, 0.12)",
                backgroundColor: "#161719",
              }}
              className="no-scrollbar"
            >
              {filteredFrames.length === 0 ? (
                <div style={{ padding: "10px", textAlign: "center", color: "#9CA3AF", fontSize: 11 }}>
                  No screens match &quot;{searchQuery}&quot;
                </div>
              ) : (
                filteredFrames.map((f) => {
                  const isSel = f.id === targetScreenId;
                  return (
                    <div
                      key={f.id}
                      onClick={() => setTargetScreenId(f.id)}
                      style={{
                        padding: "7px 10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        backgroundColor: isSel ? "rgba(53, 116, 240, 0.25)" : "transparent",
                        color: isSel ? "#60A5FA" : "#E5E7EB",
                        borderLeft: isSel ? "3px solid #3574F0" : "3px solid transparent",
                        transition: "all 0.15s ease",
                      }}
                      className="hover:bg-white/5"
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Icon name={isPhoneFrame(f) ? "smartphone" : "desktop_windows"} size={16} />
                        <span style={{ fontWeight: isSel ? 700 : 500, fontSize: 11 }}>{f.name}</span>
                      </div>
                      {isSel && <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#3574F0" }} />}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Overlay Specific Options */}
        {actionType === "overlay" && (
          <div
            style={{
              padding: "12px",
              borderRadius: 10,
              backgroundColor: "rgba(53, 116, 240, 0.08)",
              border: "1px solid rgba(53, 116, 240, 0.25)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: "#60A5FA" }}>OVERLAY / MODAL PRESENTATION</div>

            {/* Position */}
            <div>
              <label style={{ display: "block", fontSize: 10, color: "#9CA3AF", marginBottom: 4 }}>
                OVERLAY POSITION
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {OVERLAY_POSITIONS.map((pos) => {
                  const on = overlayPos === pos.id;
                  return (
                    <button
                      key={pos.id}
                      type="button"
                      onClick={() => setOverlayPos(pos.id)}
                      style={{
                        padding: "6px 8px",
                        borderRadius: 6,
                        border: on ? "1px solid #3574F0" : "1px solid rgba(255, 255, 255, 0.1)",
                        backgroundColor: on ? "#3574F0" : "#1E1F22",
                        color: "#FFF",
                        fontSize: 10,
                        fontWeight: on ? 700 : 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        cursor: "pointer",
                      }}
                    >
                      <Icon name={pos.icon} size={14} />
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {pos.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Backdrop Checkboxes */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={closeOnOutside}
                  onChange={(e) => setCloseOnOutside(e.target.checked)}
                  style={{ accentColor: "#3574F0" }}
                />
                <span>Close when clicking outside (Backdrop tap)</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={dimBg}
                  onChange={(e) => setDimBg(e.target.checked)}
                  style={{ accentColor: "#3574F0" }}
                />
                <span>Dim background overlay (Dark backdrop)</span>
              </label>
            </div>
          </div>
        )}

        {/* External Link Input */}
        {actionType === "link" && (
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#9CA3AF", marginBottom: 6 }}>
              URL ADDRESS
            </label>
            <input
              type="url"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              placeholder="https://example.com"
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 8,
                backgroundColor: "#161719",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#FFF",
                fontSize: 12,
                outline: "none",
              }}
            />
          </div>
        )}

        {/* Animation / Transition Selector */}
        {(actionType === "navigate" || actionType === "overlay" || actionType === "back") && (
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#9CA3AF", marginBottom: 6 }}>
              ANIMATION / TRANSITION
            </label>
            <select
              value={animation}
              onChange={(e) => setAnimation(e.target.value as Transition)}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 8,
                backgroundColor: "#161719",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#FFF",
                fontSize: 12,
                outline: "none",
              }}
            >
              {ANIMATION_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 8,
          backgroundColor: "#2B2D30",
          borderRadius: "0 0 16px 16px",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: "6px 14px",
            borderRadius: 8,
            border: "1px solid rgba(255, 255, 255, 0.15)",
            backgroundColor: "transparent",
            color: "#D1D5DB",
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleApply}
          style={{
            padding: "6px 16px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#3574F0",
            color: "#FFF",
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(53, 116, 240, 0.35)",
          }}
        >
          Apply Interaction
        </button>
      </div>
    </div>
  );
};
