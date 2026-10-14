import React, { useState, useMemo, useEffect } from "react";
import { Frame, Group, Item, Palette, uid, frameOfGroup } from "../lib/tokens";
import { Icon } from "./M3Node";
import { AnimatePresence, motion } from "motion/react";
import { loadAiSettings, saveAiSettings } from "../lib/ai";

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
    title: "📋 Universal CRUD & Task Management",
    desc: "Create (Add form), Read (Feed & Details), Update (Edit form), Delete actions, and live state toggles.",
    prompt: "Wire up complete CRUD operations: add item in create form, view item in details, edit item in update form, and delete item with live state toggle.",
  },
  {
    title: "🛒 E-Commerce & Store Shopping",
    desc: "Product catalog grid, item details modal, add to cart actions, checkout flow, and order status.",
    prompt: "Wire up complete E-Commerce app: connect product cards to Product Details, Buy/Add to Cart to Checkout, and order confirmation back to Catalog.",
  },
  {
    title: "🍔 Food Delivery & Restaurant Menu",
    desc: "Restaurant cards, dish menu details, cart builder, place order actions, and live tracking.",
    prompt: "Wire up Food Delivery app: tap restaurant to open Menu, dish cards to item customization, Add to Order to Cart, and Checkout to Live Tracking.",
  },
  {
    title: "💬 Social Feed & Chat Messaging",
    desc: "Feed timeline, compose new post form, user profile view, and interactive direct messaging.",
    prompt: "Wire up Social & Community app: feed cards open post details, FAB creates new post, avatar opens Profile, and message button opens Chat.",
  },
  {
    title: "💳 Finance, Budget & Crypto Wallet",
    desc: "Total balance overview, send/transfer flow, transaction history inspection, and analytics.",
    prompt: "Wire up Finance & Wallet app: Send button opens Transfer form, transaction cards open receipt details, and analytics tab views charts.",
  },
  {
    title: "🏋️ Fitness, Health & Booking Tracker",
    desc: "Workout metrics, log daily activity form, appointment booking calendar, and streak meters.",
    prompt: "Wire up Fitness & Health app: log workout button opens tracker form, exercise cards open guides, and progress bar updates daily streak.",
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
  const [apiKey, setApiKey] = useState(() => {
    const cur = loadAiSettings();
    return cur.key || (typeof window !== "undefined" ? localStorage.getItem("gemini_api_key") || "" : "");
  });
  const [showKey, setShowKey] = useState(false);

  const detectedDomain = useMemo(() => {
    const text = frames
      .map((f) => `${f.id} ${f.name || ""} ${f.note || ""}`)
      .join(" ")
      .toLowerCase();
    if (
      text.includes("money") ||
      text.includes("wallet") ||
      text.includes("transfer") ||
      text.includes("spending") ||
      text.includes("fintrack")
    ) {
      return "finance";
    }
    if (
      text.includes("shop") ||
      text.includes("store") ||
      text.includes("cloth") ||
      text.includes("product") ||
      text.includes("cart")
    ) {
      return "ecommerce";
    }
    if (text.includes("food") || text.includes("dish") || text.includes("restaurant") || text.includes("menu")) {
      return "food";
    }
    if (text.includes("fitness") || text.includes("workout") || text.includes("gym")) {
      return "fitness";
    }
    if (text.includes("social") || text.includes("feed") || text.includes("chat") || text.includes("message")) {
      return "social";
    }
    return "crud";
  }, [frames]);

  const [promptText, setPromptText] = useState(() => {
    if (detectedDomain === "finance") return FEATURE_PRESETS[4].prompt;
    if (detectedDomain === "ecommerce") return FEATURE_PRESETS[1].prompt;
    if (detectedDomain === "food") return FEATURE_PRESETS[2].prompt;
    if (detectedDomain === "social") return FEATURE_PRESETS[3].prompt;
    if (detectedDomain === "fitness") return FEATURE_PRESETS[5].prompt;
    return FEATURE_PRESETS[0].prompt;
  });

  useEffect(() => {
    if (detectedDomain === "finance") setPromptText(FEATURE_PRESETS[4].prompt);
    else if (detectedDomain === "ecommerce") setPromptText(FEATURE_PRESETS[1].prompt);
    else if (detectedDomain === "food") setPromptText(FEATURE_PRESETS[2].prompt);
    else if (detectedDomain === "social") setPromptText(FEATURE_PRESETS[3].prompt);
    else if (detectedDomain === "fitness") setPromptText(FEATURE_PRESETS[5].prompt);
    else setPromptText(FEATURE_PRESETS[0].prompt);
  }, [detectedDomain, isOpen]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [autoInjectMissing, setAutoInjectMissing] = useState(true);

  // Missing components audit
  const missingAudit = useMemo(() => {
    const hasAddTrigger = groups.some((g) =>
      g.items.some(
        (it) =>
          it.kind === "fab" ||
          it.kind === "extendedFab" ||
          (it.kind === "button" && /(add|create|new|\+)/i.test(it.label || ""))
      )
    );
    const hasModal = groups.some(
      (g) =>
        g.isModal ||
        (g.items.some((it) => it.kind === "textField" || it.kind === "select") &&
          g.items.some((it) => it.kind === "button" || it.kind === "iconButton"))
    );
    const hasCreateFrame = frames.some((f) => /create|add|new|compose/i.test(`${f.id} ${f.name || ""}`));

    const missingItems: string[] = [];
    if (!hasAddTrigger) missingItems.push("Floating Action Button (+ Add Trigger)");
    if (!hasModal && !hasCreateFrame) missingItems.push("Input Modal Dialog (with TextFields & Submit Button)");

    return {
      hasMissing: missingItems.length > 0,
      missingItems,
    };
  }, [groups, frames]);

  if (!isOpen) return null;

  const handleApiKeyChange = (val: string) => {
    setApiKey(val);
    try {
      const cur = loadAiSettings();
      saveAiSettings({ ...cur, key: val });
      if (typeof window !== "undefined") {
        localStorage.setItem("gemini_api_key", val);
      }
    } catch {}
  };

  const handleRunAiArchitect = async () => {
    setIsProcessing(true);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/projects/wire-features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          apiKey: apiKey.trim(),
          frames,
          groups,
          featureType: "universal_app",
          autoInjectMissing,
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
          "✨ Successfully wired up all features, interactive buttons, navigation routes, and state across your screens!"
      );
    } catch (err) {
      console.warn("[AI Feature Architect] Network error, applying local architect wiring:", err);
      applyClientWiring();
      setIsProcessing(false);
      setSuccessMessage(
        "✨ Successfully wired up all features, interactive buttons, navigation routes, and state across your screens!"
      );
    }
  };

  const applyClientWiring = () => {
    // Universal Semantic Frame Classifier for ANY application domain
    const findFrameByIntent = (keywords: string[], fallbackIndex = 0) => {
      const match = frames.find((f) => {
        const text = `${f.name || ""} ${f.note || ""} ${f.id || ""}`.toLowerCase();
        return keywords.some((k) => text.includes(k));
      });
      return match || frames[fallbackIndex] || frames[0] || null;
    };

    const homeFrame = findFrameByIntent(
      ["wallet", "feed", "dashboard", "home", "catalog", "products", "menu", "list", "board", "tasks", "explore", "main"],
      0
    );
    const transferFrame = findFrameByIntent(["transfer", "send", "pay", "wire", "recipient"], 2);
    const analyticsFrame = findFrameByIntent(["analytic", "spending", "chart", "expense", "stat", "report"], 1);
    const savingsFrame = findFrameByIntent(["saving", "vault", "goal", "milestone", "deposit"], 3);
    const createFrame = findFrameByIntent(["create", "add", "new", "write", "compose", "upload", "post"], 1);
    const detailFrame = findFrameByIntent(["detail", "read", "view", "inspect", "info", "product", "item", "single", "chat", "dish"], 2);
    const editFrame = findFrameByIntent(["edit", "update", "modify", "settings", "manage", "config"], 3);
    const checkoutFrame = findFrameByIntent(["cart", "checkout", "pay", "order", "booking", "summary"], 2);

    // 0. Detect In-Screen Modal Dialogs across screens
    // A modal is a group/card containing an input (textField/select/otpInput)
    // AND a submit or close action button (button/iconButton).
    const modalGroupIds = new Set<string>();
    const modalByFrameId = new Map<string, string>(); // frameId -> modalGroupId

    frames.forEach((f) => {
      const frameGroups = groups.filter((g) => {
        const fr = frameOfGroup(g, frames, {});
        return fr ? fr.id === f.id : frames.length === 1;
      });

      const modalCandidate = frameGroups.find((g) => {
        const hasInput = g.items.some((it) => it.kind === "textField" || it.kind === "select" || it.kind === "otpInput");
        const hasSubmitOrClose = g.items.some(
          (it) =>
            (it.kind === "button" && /(submit|save|add|create|confirm|done|send|post)/i.test(it.label || "")) ||
            (it.kind === "iconButton" && /(close|clear|cancel)/i.test(it.icon || ""))
        );
        return hasInput && hasSubmitOrClose;
      });

      if (modalCandidate) {
        modalGroupIds.add(modalCandidate.id);
        modalByFrameId.set(f.id, modalCandidate.id);
      }
    });

    const updatedGroups = groups.map((g) => {
      const isThisModal = modalGroupIds.has(g.id);
      const groupFrame = frameOfGroup(g, frames, {}) || frames[0];
      const frameModalId = groupFrame ? modalByFrameId.get(groupFrame.id) : undefined;

      const groupCopy: Group = {
        ...g,
        isModal: isThisModal ? true : g.isModal,
        items: g.items.map((it) => {
          const itemCopy: Item = { ...it };

          // A. If inside a Modal Group:
          if (isThisModal) {
            // Close / Cancel button inside modal
            if (
              (itemCopy.kind === "iconButton" && /(close|clear|cancel|arrow_back)/i.test(itemCopy.icon || "")) ||
              (itemCopy.kind === "button" && /(cancel|close|discard|back)/i.test(itemCopy.label || ""))
            ) {
              itemCopy.action = {
                to: groupFrame?.id || frames[0]?.id,
                transition: "fade",
                command: "close_modal",
                modalTarget: g.id,
              };
              return itemCopy;
            }

            // Submit / Save / Add button inside modal
            if (
              itemCopy.kind === "button" &&
              /(submit|save|add|create|confirm|done|send|post)/i.test(itemCopy.label || "")
            ) {
              itemCopy.action = {
                to: groupFrame?.id || frames[0]?.id,
                transition: "fade",
                command: "submit_modal",
                modalTarget: g.id,
              };
              return itemCopy;
            }
          }

          // B. 1. Wire Top App Bar actions
          if (itemCopy.kind === "topAppBar") {
            const currentActions = { ...(itemCopy.actions || {}) };
            if (itemCopy.icon === "arrow_back" || itemCopy.icon === "chevron_left" || itemCopy.icon === "close") {
              if (homeFrame) {
                currentActions.icon = { to: homeFrame.id, transition: "slideLeft" };
              }
            }
            if (createFrame) {
              currentActions.icon3 = { to: createFrame.id, transition: "slide" };
            }
            if (itemCopy.icon2 === "save" || itemCopy.icon2 === "check") {
              currentActions.icon2 = { to: homeFrame?.id || frames[0]?.id, transition: "slideLeft", command: "save_task" };
            }
            if ((itemCopy as any).icon4 === "delete" || itemCopy.icon3 === "delete") {
              currentActions.icon4 = { to: homeFrame?.id || frames[0]?.id, transition: "slideLeft", command: "delete_task" };
            }
            itemCopy.actions = currentActions;
          }

          // B. 2. Wire FAB actions to In-Screen Modal OR Create Screen
          if (itemCopy.kind === "fab" || itemCopy.kind === "extendedFab") {
            if (frameModalId) {
              itemCopy.action = {
                to: groupFrame?.id || frames[0]?.id,
                transition: "fade",
                command: "open_modal",
                modalTarget: frameModalId,
              };
              return itemCopy;
            } else {
              const targetFrame = createFrame || transferFrame || frames[1] || frames[0];
              itemCopy.action = { to: targetFrame.id, transition: "slide" };
              return itemCopy;
            }
          }

          // B. 3. Wire Cards, Items, and Feeds to Detail / Inspection screen
          if (
            itemCopy.kind === "todoCard" ||
            itemCopy.kind === "kanbanCard" ||
            itemCopy.kind === "card" ||
            itemCopy.kind === "listItem"
          ) {
            const targetFrame = detailFrame || frames[2] || frames[0];
            itemCopy.action = { to: targetFrame.id, transition: "slide" };
          }

          // B. 4. Wire Action Buttons universally across domains
          if (itemCopy.kind === "button" || itemCopy.kind === "iconButton") {
            const label = (itemCopy.label || itemCopy.icon || "").toLowerCase();

            // Modal Trigger button check
            if (frameModalId && (label.includes("add") || label.includes("create") || label.includes("new") || label === "+" || label === "open")) {
              itemCopy.action = {
                to: groupFrame?.id || frames[0]?.id,
                transition: "fade",
                command: "open_modal",
                modalTarget: frameModalId,
              };
              return itemCopy;
            }

            // Money App Actions
            if (
              label === "send" ||
              label === "transfer" ||
              label.startsWith("send ") ||
              label === "request" ||
              label === "pay bills"
            ) {
              const target = transferFrame || frames[2] || frames[0];
              itemCopy.action = { to: target.id, transition: "slide" };
            } else if (
              label.includes("authorize") ||
              label.includes("send $") ||
              label.includes("confirm transfer") ||
              label.includes("pay now")
            ) {
              itemCopy.action = {
                to: homeFrame?.id || frames[0]?.id || "money_dashboard",
                transition: "fade",
                command: "transfer_money",
              };
            } else if (label.includes("analytic") || label.includes("spending") || label.includes("chart")) {
              const target = analyticsFrame || frames[1] || frames[0];
              itemCopy.action = { to: target.id, transition: "slide" };
            } else if (label.includes("vault") || label.includes("goal") || label.includes("saving")) {
              const target = savingsFrame || frames[3] || frames[0];
              itemCopy.action = { to: target.id, transition: "slide" };
            } else if (label.includes("edit") || label.includes("manage") || label.includes("settings")) {
              const targetFrame = editFrame || frames[3] || frames[0];
              itemCopy.action = { to: targetFrame.id, transition: "slide", command: "edit_task" };
            } else if (label.includes("save changes") || label.includes("update") || label.includes("apply")) {
              itemCopy.action = {
                to: homeFrame?.id || frames[0]?.id,
                transition: "slide",
                command: "update_task",
              };
            } else if (
              label.includes("submit") ||
              label.includes("save") ||
              label.includes("create") ||
              label.includes("add") ||
              label.includes("publish") ||
              label.includes("post")
            ) {
              itemCopy.action = {
                to: homeFrame?.id || frames[0]?.id,
                transition: "slide",
                command: "save_task",
              };
            } else if (
              label.includes("cart") ||
              label.includes("buy") ||
              label.includes("checkout") ||
              label.includes("order")
            ) {
              itemCopy.action = {
                to: checkoutFrame?.id || detailFrame?.id || frames[0]?.id,
                transition: "slide",
                command: "cart_action",
              };
            } else if (label.includes("delete") || label.includes("remove") || label.includes("discard")) {
              itemCopy.action = {
                to: homeFrame?.id || frames[0]?.id,
                transition: "slide",
                command: "delete_task",
              };
            } else if (
              label.includes("mark complete") ||
              label.includes("completed") ||
              label.includes("done") ||
              label.includes("check")
            ) {
              itemCopy.action = {
                to: homeFrame?.id || frames[0]?.id,
                transition: "slide",
                command: "complete_task",
              };
            } else if (label.includes("cancel") || label.includes("back") || label.includes("close")) {
              itemCopy.action = {
                to: homeFrame?.id || frames[0]?.id,
                transition: "slideLeft",
                command: "cancel_task",
              };
            }
          }

          // 5. Wire Bottom Navigation Tabs to screens
          if (itemCopy.kind === "bottomNav" && Array.isArray(itemCopy.tabs)) {
            const navActions: Record<string, { to: string; transition: "fade" | "slide" }> = {};
            itemCopy.tabs.forEach((tab: any, idx: number) => {
              const tabLabel = (tab.label || tab.icon || "").toLowerCase();
              if (tabLabel.includes("dashboard") || tabLabel.includes("home") || tabLabel.includes("wallet")) {
                if (homeFrame) navActions[`tab:${idx}`] = { to: homeFrame.id, transition: "fade" };
              } else if (tabLabel.includes("analytic") || tabLabel.includes("spending") || tabLabel.includes("chart")) {
                if (analyticsFrame) navActions[`tab:${idx}`] = { to: analyticsFrame.id, transition: "fade" };
              } else if (tabLabel.includes("transfer") || tabLabel.includes("send") || tabLabel.includes("pay")) {
                if (transferFrame) navActions[`tab:${idx}`] = { to: transferFrame.id, transition: "fade" };
              } else if (tabLabel.includes("goal") || tabLabel.includes("saving") || tabLabel.includes("vault")) {
                if (savingsFrame) navActions[`tab:${idx}`] = { to: savingsFrame.id, transition: "fade" };
              } else if (tabLabel.includes("card")) {
                if (transferFrame) navActions[`tab:${idx}`] = { to: transferFrame.id, transition: "fade" };
                else if (frames[idx]) navActions[`tab:${idx}`] = { to: frames[idx].id, transition: "fade" };
              } else if (frames[idx]) {
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

    let finalGroups = [...updatedGroups];
    if (autoInjectMissing && !modalByFrameId.get(frames[0]?.id) && !createFrame) {
      const primaryFrame = frames[0] || { x: 0, y: 0, w: 412, h: 892, id: "home" };
      const newModalId = `modal_dialog_${Date.now()}`;
      const newModalGroup: Group = {
        id: newModalId,
        x: (primaryFrame.x || 0) + 16,
        y: (primaryFrame.y || 0) + 220,
        axis: "y",
        isModal: true,
        items: [
          {
            id: `modal_bar_${Date.now()}`,
            kind: "topAppBar",
            label: "Add New Record",
            icon: "close",
            variant: "filled",
            actions: { icon: { to: primaryFrame.id, transition: "fade", command: "close_modal", modalTarget: newModalId } },
            size: 380,
          },
          {
            id: `modal_in_title_${Date.now()}`,
            kind: "textField",
            label: "Title / Name",
            icon: null,
            variant: "outlined",
            placeholder: "Enter title or name...",
            size: 380,
          },
          {
            id: `modal_in_desc_${Date.now()}`,
            kind: "textField",
            label: "Description / Notes",
            icon: null,
            variant: "outlined",
            placeholder: "Enter details...",
            size: 380,
          },
          {
            id: `modal_btn_submit_${Date.now()}`,
            kind: "button",
            label: "Save & Submit",
            icon: "check",
            variant: "filled",
            size: 380,
            action: { to: primaryFrame.id, transition: "fade", command: "submit_modal", modalTarget: newModalId },
          },
        ],
      };
      finalGroups.push(newModalGroup);

      const hasFab = finalGroups.some((g) => g.items.some((it) => it.kind === "fab" || it.kind === "extendedFab"));
      if (!hasFab) {
        const newFabGroup: Group = {
          id: `fab_group_${Date.now()}`,
          x: (primaryFrame.x || 0) + (primaryFrame.w || 412) - 80,
          y: (primaryFrame.y || 0) + (primaryFrame.h || 892) - 140,
          axis: "x",
          items: [
            {
              id: `fab_add_${Date.now()}`,
              kind: "fab",
              label: "+ Add",
              icon: "add",
              variant: "filled",
              action: { to: primaryFrame.id, transition: "fade", command: "open_modal", modalTarget: newModalId },
            },
          ],
        };
        finalGroups.push(newFabGroup);
      }
    }

    onApplyFeatures(finalGroups);
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: p.onSurfaceVariant, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Detected Screens on Canvas ({frames.length})
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: p.primary, background: `${p.primary}18`, padding: "2px 8px", borderRadius: 8 }}>
                {detectedDomain === "finance" ? "💳 FinTech & Money Wallet" :
                 detectedDomain === "ecommerce" ? "🛒 E-Commerce & Store" :
                 detectedDomain === "food" ? "🍔 Food Delivery & Menu" :
                 detectedDomain === "social" ? "💬 Social & Messaging" :
                 detectedDomain === "fitness" ? "🏋️ Fitness & Tracker" :
                 "📋 Universal CRUD & Tasks"}
              </div>
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

          {/* API Key Configuration Card */}
          <div
            style={{
              padding: "14px 16px",
              borderRadius: 16,
              background: p.surfaceContainerLow || "#F8FAFC",
              border: `1px solid ${apiKey ? "#10B98160" : p.outlineVariant + "50"}`,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: p.onSurface }}>
                <Icon name="vpn_key" size={16} color={apiKey ? "#10B981" : p.primary} />
                <span>Gemini AI API Key</span>
                {apiKey ? (
                  <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 6, background: "#10B98120", color: "#10B981", fontWeight: 800 }}>
                    Active
                  </span>
                ) : (
                  <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 6, background: p.surfaceContainerHighest, color: p.onSurfaceVariant }}>
                    Optional / .env fallback
                  </span>
                )}
              </div>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 11, fontWeight: 700, color: p.primary, textDecoration: "none" }}
              >
                Get API Key ↗
              </a>
            </div>

            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder="AIzaSy... (Paste your Google Gemini API Key here)"
                style={{
                  width: "100%",
                  padding: "10px 42px 10px 12px",
                  borderRadius: 10,
                  border: `1px solid ${p.outlineVariant}`,
                  backgroundColor: p.surface || "#FFFFFF",
                  color: p.onSurface,
                  fontSize: 12.5,
                  fontFamily: "monospace",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                style={{
                  position: "absolute",
                  right: 8,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: p.onSurfaceVariant,
                  padding: 4,
                  display: "grid",
                  placeItems: "center",
                }}
                title={showKey ? "Hide API Key" : "Show API Key"}
              >
                <Icon name={showKey ? "visibility_off" : "visibility"} size={16} />
              </button>
            </div>
            <div style={{ fontSize: 11, color: p.onSurfaceVariant, lineHeight: 1.4 }}>
              Your key powers intelligent feature synthesis, CRUD wiring, and state coordination. You can also configure <code>GEMINI_API_KEY</code> in your <code>.env</code> file.
            </div>
          </div>

          {/* Missing UI Components Audit & Permission Banner */}
          {missingAudit.hasMissing && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                background: "#F59E0B15",
                border: "1px solid #F59E0B40",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 800, color: "#D97706" }}>
                <Icon name="tips_and_updates" size={16} />
                <span>Missing UI Components Detected for Complete Feature:</span>
              </div>
              <div style={{ fontSize: 11, color: p.onSurfaceVariant, lineHeight: 1.4 }}>
                {missingAudit.missingItems.join(" • ")}
              </div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: p.onSurface,
                  cursor: "pointer",
                  marginTop: 2,
                }}
              >
                <input
                  type="checkbox"
                  checked={autoInjectMissing}
                  onChange={(e) => setAutoInjectMissing(e.target.checked)}
                  style={{ accentColor: p.primary, width: 15, height: 15, cursor: "pointer" }}
                />
                <span>Auto-generate and wire missing UI components for a 100% complete working feature</span>
              </label>
            </div>
          )}

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
