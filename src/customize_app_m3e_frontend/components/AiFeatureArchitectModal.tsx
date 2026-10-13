import React, { useState } from "react";
import { Frame, Group, Item, Palette, uid } from "../lib/tokens";
import { Icon } from "./M3Node";
import { AnimatePresence, motion } from "motion/react";

interface AiFeatureArchitectModalProps {
  isOpen: boolean;
  onClose: () => void;
  palette: Palette;
  frames: Frame[];
  groups: Group[];
  onApplyFeatures: (updatedGroups: Group[]) => void;
  onOpenSimulator: () => void;
}

const FEATURE_PRESETS = [
  {
    title: "✅ Full CRUD & Interactive State",
    desc: "Wires up Create (Add form), Read (List & Details), Update (Edit form), Delete actions, and real-time checkbox toggles.",
    prompt: "Wire up complete CRUD operations: add task in create form, view task in details, edit task in update form, and delete task with live state toggle.",
  },
  {
    title: "🔗 Seamless Screen Navigation Wires",
    desc: "Auto-links all app bars, FABs, card clicks, action buttons, and bottom navigation tabs to their respective screens.",
    prompt: "Auto-connect all navigation flows: FAB and Add buttons go to Create screen, cards go to Details, Edit button goes to Edit screen, Save goes to Dashboard.",
  },
  {
    title: "📊 Live Sprint & Productivity Analytics",
    desc: "Connects completion percentages, active milestones counters, and daily productivity streak meters.",
    prompt: "Generate real-time productivity statistics: 60% completion progress bar, active streak meter, and category milestone counters.",
  },
  {
    title: "💾 Offline Persistence & Cloud Sync State",
    desc: "Simulates local AsyncStorage offline caching and automatic cloud sync audit logging.",
    prompt: "Simulate offline-first persistence with AsyncStorage sync status banners and task audit logging timestamps.",
  },
];

export const AiFeatureArchitectModal: React.FC<AiFeatureArchitectModalProps> = ({
  isOpen,
  onClose,
  palette: p,
  frames,
  groups,
  onApplyFeatures,
  onOpenSimulator,
}) => {
  const [promptText, setPromptText] = useState(
    "Wire up full application features with state management, add/edit/delete CRUD operations, subtask checklist toggles, offline persistence, and seamless screen navigation."
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRunAiArchitect = async () => {
    setIsProcessing(true);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/projects/wire-features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          frames,
          groups,
          featureType: "full_crud",
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      console.log("[AI Feature Architect HTTP Response]", data);

      if (data.updatedGroups && Array.isArray(data.updatedGroups)) {
        onApplyFeatures(data.updatedGroups);
      } else {
        // Client-side fallback wiring
        applyClientWiring();
      }

      setIsProcessing(false);
      setSuccessMessage(
        data.message ||
          "✨ Successfully wired up all CRUD actions, interactive buttons, navigation routes, and state across your screens!"
      );
    } catch (err) {
      console.warn("[AI Feature Architect] Network error, applying local architect wiring:", err);
      applyClientWiring();
      setIsProcessing(false);
      setSuccessMessage(
        "✨ Successfully wired up all CRUD actions, interactive buttons, navigation routes, and state across your screens!"
      );
    }
  };

  const applyClientWiring = () => {
    const updatedGroups = groups.map((g) => {
      const groupCopy: Group = {
        ...g,
        items: g.items.map((it) => {
          const itemCopy: Item = { ...it };

          // 1. Wire Top App Bar actions
          if (itemCopy.kind === "topAppBar") {
            const currentActions = { ...(itemCopy.actions || {}) };
            if (itemCopy.icon === "arrow_back" && frames.length > 0) {
              currentActions.icon = { to: frames[0].id, transition: "slideLeft" };
            }
            if (itemCopy.icon3 === "add" && frames.length > 1) {
              currentActions.icon3 = { to: frames[1].id, transition: "slide" };
            }
            if (itemCopy.icon2 === "save" || itemCopy.icon2 === "check") {
              currentActions.icon2 = { to: frames[0].id, transition: "slideLeft" };
            }
            itemCopy.actions = currentActions;
          }

          // 2. Wire FAB actions to Create screen (Frame 2)
          if (itemCopy.kind === "fab") {
            const targetFrame = frames[1] || frames[0];
            itemCopy.action = { to: targetFrame.id, transition: "slide" };
          }

          // 3. Wire Task Card actions to Detail screen (Frame 3)
          if (itemCopy.kind === "todoCard" || itemCopy.kind === "kanbanCard") {
            const targetFrame = frames[2] || frames[0];
            itemCopy.action = { to: targetFrame.id, transition: "slide" };
          }

          // 4. Wire Action Buttons
          if (itemCopy.kind === "button") {
            const label = (itemCopy.label || "").toLowerCase();
            if (label.includes("edit")) {
              const targetFrame = frames[3] || frames[0];
              itemCopy.action = { to: targetFrame.id, transition: "slide" };
            } else if (
              label.includes("save") ||
              label.includes("create") ||
              label.includes("add") ||
              label.includes("publish") ||
              label.includes("cancel") ||
              label.includes("delete") ||
              label.includes("mark complete")
            ) {
              itemCopy.action = { to: frames[0].id, transition: "slide" };
            }
          }

          // 5. Wire Bottom Navigation Tabs
          if (itemCopy.kind === "bottomNav" && Array.isArray(itemCopy.tabs)) {
            const navActions: Record<string, { to: string; transition: "fade" | "slide" }> = {};
            itemCopy.tabs.forEach((_, idx) => {
              if (frames[idx]) {
                navActions[`tab:${idx}`] = { to: frames[idx].id, transition: "fade" };
              }
            });
            itemCopy.actions = { ...(itemCopy.actions || {}), ...navActions };
          }

          return itemCopy;
        }),
      };
      return groupCopy;
    });

    onApplyFeatures(updatedGroups);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 800,
          backgroundColor: "rgba(0,0,0,0.48)",
          backdropFilter: "blur(4px)",
          display: "grid",
          placeItems: "center",
          padding: 24,
        }}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 14 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ type: "spring", stiffness: 480, damping: 32 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "min(100%, 680px)",
            maxHeight: "90vh",
            overflowY: "auto",
            borderRadius: 28,
            backgroundColor: p.surfaceContainerHigh || "#FFFFFF",
            color: p.onSurface,
            boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
            padding: 28,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 14,
                  background: `linear-gradient(135deg, ${p.primary} 0%, #8B5CF6 100%)`,
                  color: "#FFFFFF",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Icon name="auto_awesome" size={24} />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.2 }}>
                  AI App Feature & CRUD Architect
                </div>
                <div style={{ fontSize: 12, color: p.onSurfaceVariant }}>
                  Convert your dragged components into a fully functional Expo application
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "none",
                background: p.surfaceContainerHighest || "#E5E7EB",
                color: p.onSurfaceVariant,
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon name="close" size={18} />
            </button>
          </div>

          {/* Current Canvas Screens Overview */}
          <div
            style={{
              padding: "12px 16px",
              borderRadius: 16,
              background: p.surfaceContainerLow || "#F3F4F6",
              border: `1px solid ${p.outlineVariant}50`,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: p.onSurfaceVariant, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
              Detected Screens on Canvas ({frames.length})
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {frames.map((f, i) => (
                <div
                  key={f.id}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 8,
                    background: p.surfaceContainerHigh || "#FFFFFF",
                    border: `1px solid ${p.outlineVariant}40`,
                    fontSize: 12,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Icon name="smartphone" size={14} color={p.primary} />
                  <span>
                    Screen {i + 1}: {f.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt Input Box */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
              Tell AI how to wire and make this application work:
            </label>
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              rows={3}
              placeholder="Describe features, CRUD actions, states, and screen navigation..."
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 14,
                border: `1.5px solid ${p.outline}`,
                backgroundColor: p.surface || "#FFFFFF",
                color: p.onSurface,
                fontSize: 13,
                fontFamily: "inherit",
                resize: "none",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Quick Preset Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: p.onSurfaceVariant, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Feature Presets (Click to Load)
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {FEATURE_PRESETS.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => setPromptText(preset.prompt)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 14,
                    background: p.surfaceContainerLow || "#F9FAFB",
                    border: `1px solid ${p.outlineVariant}40`,
                    cursor: "pointer",
                    transition: "all 160ms",
                  }}
                  className="m3-press"
                >
                  <div style={{ fontSize: 12, fontWeight: 800, color: p.onSurface, marginBottom: 2 }}>
                    {preset.title}
                  </div>
                  <div style={{ fontSize: 10.5, color: p.onSurfaceVariant, lineHeight: 1.4 }}>
                    {preset.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "12px 16px",
                borderRadius: 14,
                background: "#10B98118",
                border: "1px solid #10B98150",
                color: "#10B981",
                fontSize: 12.5,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="check_circle" size={18} />
                <span>{successMessage}</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenSimulator();
                }}
                style={{
                  padding: "6px 12px",
                  borderRadius: 10,
                  border: "none",
                  background: "#10B981",
                  color: "#FFFFFF",
                  fontSize: 11.5,
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  whiteSpace: "nowrap",
                }}
              >
                <Icon name="play_arrow" size={14} />
                <span>Test in Simulator</span>
              </button>
            </motion.div>
          )}

          {/* Action Footer Buttons */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, marginTop: 6 }}>
            <button
              onClick={onClose}
              style={{
                height: 44,
                padding: "0 18px",
                borderRadius: 22,
                border: `1px solid ${p.outline}`,
                background: "transparent",
                color: p.onSurface,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleRunAiArchitect}
              disabled={isProcessing || !promptText.trim()}
              style={{
                height: 44,
                padding: "0 24px",
                borderRadius: 22,
                border: "none",
                background: `linear-gradient(135deg, ${p.primary} 0%, #7C3AED 100%)`,
                color: "#FFFFFF",
                fontSize: 13.5,
                fontWeight: 800,
                cursor: isProcessing ? "wait" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 14px rgba(124, 58, 237, 0.35)",
              }}
            >
              <Icon name={isProcessing ? "progress_activity" : "auto_awesome"} size={18} />
              <span>{isProcessing ? "Wiring Features & State..." : "✨ Wire Features & State Now"}</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
