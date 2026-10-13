import React, { useState, useEffect, useRef } from "react";
import { ColorToken, onToken, Palette, resolveColor } from "../lib/tokens";
import { Segmented } from "./ui";
import { Icon } from "./M3Node";
import { COLOR_TOKEN_TEXT, t, useLang } from "../lib/i18n";

const SCREEN_FILLS: ColorToken[] = [
  "surface",
  "surfaceContainerLow",
  "surfaceContainerHigh",
  "primaryContainer",
  "secondaryContainer",
];

const DEFAULT_SAVED_COLORS = [
  "#6750A4", // M3 Purple
  "#3574F0", // Blue
  "#059669", // Emerald Green
  "#DC2626", // Red
  "#D97706", // Amber
  "#9333EA", // Violet
  "#0891B2", // Cyan
  "#111827", // Charcoal Dark
  "#F43F5E", // Rose
  "#F3F4F6", // Off-white
];

const STORAGE_SAVED_COLORS_KEY = "m3e:custom_saved_colors";

export function getSavedColors(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_SAVED_COLORS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    // fallback
  }
  return DEFAULT_SAVED_COLORS;
}

export function saveColorToStorage(color: string): string[] {
  const norm = color.toUpperCase();
  const current = getSavedColors();
  const next = current.includes(norm) ? current : [norm, ...current];
  try {
    localStorage.setItem(STORAGE_SAVED_COLORS_KEY, JSON.stringify(next));
  } catch (e) {}
  return next;
}

export function removeColorFromStorage(color: string): string[] {
  const norm = color.toUpperCase();
  const current = getSavedColors();
  const next = current.filter((c) => c !== norm);
  try {
    localStorage.setItem(STORAGE_SAVED_COLORS_KEY, JSON.stringify(next));
  } catch (e) {}
  return next;
}

export function ColorPickerBar({
  value,
  onChange,
  p,
  label = "Style",
}: {
  value: ColorToken | string | undefined;
  onChange: (color: ColorToken | string | undefined) => void;
  p: Palette;
  label?: string;
}) {
  const lang = useLang();
  const activeValue = value ?? "surface";
  const [savedColors, setSavedColors] = useState<string[]>(getSavedColors);
  const [savedAlert, setSavedAlert] = useState(false);

  // Derive current hex color for picker input
  const currentHex = (() => {
    if (typeof activeValue === "string" && activeValue.startsWith("#")) {
      return activeValue;
    }
    const resolved = resolveColor(activeValue, p);
    if (resolved.startsWith("#")) return resolved;
    return "#6750A4";
  })();

  const [hexInput, setHexInput] = useState(currentHex);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHexInput(currentHex);
  }, [currentHex]);

  const handlePickColor = (hex: string) => {
    const formatted = hex.toUpperCase();
    setHexInput(formatted);
    onChange(formatted);
  };

  const handleSaveCurrentColor = () => {
    const next = saveColorToStorage(currentHex);
    setSavedColors(next);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 1600);
  };

  const handleDeleteSavedColor = (e: React.MouseEvent, col: string) => {
    e.stopPropagation();
    const next = removeColorFromStorage(col);
    setSavedColors(next);
  };

  const isPresetToken = SCREEN_FILLS.includes(activeValue as ColorToken);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* 1. M3 Preset Tokens Segmented Bar */}
      <Segmented<ColorToken>
        options={SCREEN_FILLS.map((tk) => ({
          key: tk,
          title: lang === "en" ? tk : COLOR_TOKEN_TEXT[lang]?.[tk] || tk,
          node: tk === activeValue ? <Icon name="check" size={20} /> : <span />,
          style: {
            background: p[tk],
            color: onToken(tk, p),
            border: `1px solid ${p.outlineVariant}`,
            minWidth: 0,
            padding: 0,
          },
        }))}
        value={isPresetToken ? (activeValue as ColorToken) : ("" as ColorToken)}
        onChange={(bg) => onChange(bg === "surface" ? undefined : bg)}
        p={p}
        height={40}
        label={t("screenLook", lang) || label}
        tight
      />

      {/* 2. Custom Color Picker & Save Color Tool */}
      <div
        style={{
          padding: "10px 12px",
          borderRadius: 12,
          background: p.surfaceContainerLow,
          border: `1px solid ${p.outlineVariant}`,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
            {/* Color Preview & Native Color Picker trigger */}
            <div
              onClick={() => colorInputRef.current?.click()}
              title="Click to open Color Picker"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: currentHex,
                border: "2px solid #FFFFFF",
                boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
                flex: "0 0 32px",
                position: "relative",
              }}
            >
              <input
                ref={colorInputRef}
                type="color"
                value={currentHex.length === 7 ? currentHex : "#6750A4"}
                onChange={(e) => handlePickColor(e.target.value)}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
              />
              <Icon
                name="colorize"
                size={16}
                color={onToken(currentHex, p)}
                style={{ pointerEvents: "none", opacity: 0.85 }}
              />
            </div>

            {/* Editable Hex Code Input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: p.surface,
                border: `1px solid ${p.outlineVariant}`,
                borderRadius: 8,
                padding: "0 8px",
                height: 32,
                flex: 1,
                minWidth: 0,
              }}
            >
              <span style={{ fontSize: 13, color: p.onSurfaceVariant, fontWeight: 600, marginRight: 2 }}>#</span>
              <input
                type="text"
                value={hexInput.replace("#", "")}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
                  setHexInput(`#${cleaned}`);
                  if (cleaned.length === 6 || cleaned.length === 3) {
                    onChange(`#${cleaned}`.toUpperCase());
                  }
                }}
                onKeyDown={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                placeholder="HEX"
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "monospace",
                  color: p.onSurface,
                  width: "100%",
                  textTransform: "uppercase",
                }}
              />
            </div>
          </div>

          {/* Save Color Button */}
          <button
            type="button"
            onClick={handleSaveCurrentColor}
            title="Save this color to your palette"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "0 10px",
              height: 32,
              borderRadius: 8,
              background: savedAlert ? "#059669" : p.primary,
              color: p.onPrimary,
              border: "none",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 160ms ease",
              flex: "0 0 auto",
            }}
          >
            <Icon name={savedAlert ? "check" : "bookmark"} size={16} color={p.onPrimary} />
            <span>{savedAlert ? "Saved!" : "Save"}</span>
          </button>
        </div>

        {/* 3. Saved Colors Swatches Row */}
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: p.onSurfaceVariant,
              marginBottom: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Saved Colors</span>
            <span style={{ fontSize: 10, opacity: 0.7 }}>{savedColors.length} colors</span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              maxHeight: 110,
              overflowY: "auto",
              padding: "2px 0",
            }}
          >
            {savedColors.map((color) => {
              const isSelected = activeValue.toUpperCase() === color.toUpperCase();
              return (
                <div
                  key={color}
                  onClick={() => onChange(color)}
                  title={`${color} (Click to apply)`}
                  style={{
                    position: "relative",
                    width: 26,
                    height: 26,
                    borderRadius: 6,
                    background: color,
                    border: isSelected ? `2px solid ${p.primary}` : `1px solid ${p.outlineVariant}`,
                    boxShadow: isSelected ? `0 0 0 2px ${p.primaryContainer}` : "none",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    transition: "transform 120ms ease, box-shadow 120ms ease",
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget.querySelector(".del-btn") as HTMLElement;
                    if (btn) btn.style.display = "flex";
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget.querySelector(".del-btn") as HTMLElement;
                    if (btn) btn.style.display = "none";
                  }}
                >
                  {isSelected && (
                    <Icon name="check" size={16} color={onToken(color, p)} />
                  )}
                  {/* Delete button on hover */}
                  <div
                    className="del-btn"
                    onClick={(e) => handleDeleteSavedColor(e, color)}
                    title={`Delete ${color}`}
                    style={{
                      display: "none",
                      position: "absolute",
                      top: -5,
                      right: -5,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: "#111827",
                      color: "#FFFFFF",
                      fontSize: 10,
                      fontWeight: 700,
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    }}
                  >
                    ×
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
