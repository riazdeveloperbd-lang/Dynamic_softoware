"use client";

import { useMemo, useState } from "react";
import {
  CATEGORIES,
  KIND_ORDER,
  KIND_SPEC,
  PALETTE_HIDDEN,
  Category,
  Doc,
  Kind,
  Palette,
} from "../lib/tokens";
import {
  ECOMMERCE_CATEGORIES,
  ECOMMERCE_PRESETS,
  EcommerceCategoryKey,
  EcommercePreset,
  buildEcommerceAppDoc,
  buildMoneyManagementAppDoc,
} from "../lib/ecommerceComponents";
import { Icon } from "./M3Node";
import { KIND_TEXT, t, useLang } from "../lib/i18n";
import { Field, Section, Tile } from "./ui";

const CATEGORY_TEXT = {
  ja: { actions: "操作", navigation: "ナビゲーション", containment: "コンテナ", inputs: "入力", content: "コンテンツ", progress: "進捗" },
  zh: { actions: "操作", navigation: "导航", containment: "容器", inputs: "输入", content: "内容", progress: "进度" },
  ko: { actions: "동작", navigation: "내비게이션", containment: "컨테이너", inputs: "입력", content: "콘텐츠", progress: "진행 상태" },
} satisfies Record<string, Record<Category, string>>;

export type PaletteTabMode = "current" | "ecommerce";

export function PartsPalette({
  palette: p,
  favorites,
  onToggleFavorite,
  onPartPointerDown,
  onPartActivate,
  onPresetPointerDown,
  onPresetActivate,
  onLoadTemplateDoc,
}: {
  palette: Palette;
  favorites: Kind[];
  onToggleFavorite: (k: Kind) => void;
  onPartPointerDown: (e: React.PointerEvent, kind: Kind) => void;
  /** a tile chosen with the keyboard or a screen reader adds its part without a drag */
  onPartActivate: (kind: Kind) => void;
  /** Pointer down handler to initiate drag of an e-commerce preset */
  onPresetPointerDown?: (e: React.PointerEvent, preset: EcommercePreset) => void;
  /** Click handler to add an e-commerce preset onto active frame or canvas */
  onPresetActivate?: (preset: EcommercePreset) => void;
  /** Quick load full 4-screen application template */
  onLoadTemplateDoc?: (doc: Doc) => void;
}) {
  const lang = useLang();
  const [tabMode, setTabMode] = useState<PaletteTabMode>("ecommerce");
  const [q, setQ] = useState("");
  const [presetFavorites, setPresetFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("m3e:preset_favs") || "[]");
    } catch {
      return [];
    }
  });

  const togglePresetFav = (presetId: string) => {
    setPresetFavorites((prev) => {
      const next = prev.includes(presetId)
        ? prev.filter((id) => id !== presetId)
        : [...prev, presetId];
      try {
        localStorage.setItem("m3e:preset_favs", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const labelOf = (k: Kind) =>
    lang === "en"
      ? KIND_SPEC[k].label
      : KIND_TEXT[lang][k]?.noun ?? KIND_SPEC[k].label;

  // Filter for standard kinds
  const filteredKinds = useMemo(() => {
    const s = q.trim().toLowerCase();
    const listed = KIND_ORDER.filter((k) => !PALETTE_HIDDEN.includes(k));
    if (!s) return listed;
    return listed.filter((k) => {
      const sp = KIND_SPEC[k];
      return (
        labelOf(k).toLowerCase().includes(s) ||
        sp.label.toLowerCase().includes(s) ||
        sp.noun.toLowerCase().includes(s) ||
        k.toLowerCase().includes(s)
      );
    });
  }, [q, lang]);

  // Filter for e-commerce presets
  const filteredPresets = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ECOMMERCE_PRESETS;
    return ECOMMERCE_PRESETS.filter((p) => {
      return (
        p.title.toLowerCase().includes(s) ||
        p.desc.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s) ||
        (p.badge && p.badge.toLowerCase().includes(s))
      );
    });
  }, [q]);

  const tile = (k: Kind) => {
    const s = KIND_SPEC[k];
    return (
      <Tile
        key={k}
        icon={s.paletteIcon}
        label={labelOf(k)}
        p={p}
        onPointerDown={(e) => onPartPointerDown(e, k)}
        onClick={() => onPartActivate(k)}
        starred={favorites.includes(k)}
        onStar={() => onToggleFavorite(k)}
      />
    );
  };

  const presetTile = (preset: EcommercePreset) => {
    const isFav = presetFavorites.includes(preset.id);
    return (
      <div
        key={preset.id}
        className="m3-press"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          borderRadius: 14,
          padding: "10px 10px 8px",
          background: p.surfaceContainerLow,
          border: `1px solid ${p.outlineVariant}50`,
          cursor: "pointer",
          transition: "transform 140ms ease, box-shadow 140ms ease, background 140ms ease",
          boxSizing: "border-box",
        }}
        onPointerDown={(e) => onPresetPointerDown?.(e, preset)}
        onClick={() => onPresetActivate?.(preset)}
        title={`${preset.title}: ${preset.desc}`}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: p.primaryContainer,
              color: p.onPrimaryContainer,
              display: "grid",
              placeItems: "center",
            }}
          >
            <Icon name={preset.icon} size={20} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {preset.badge && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: 8,
                  background: p.secondaryContainer,
                  color: p.onSecondaryContainer,
                  letterSpacing: 0.3,
                  textTransform: "uppercase",
                }}
              >
                {preset.badge}
              </span>
            )}
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                togglePresetFav(preset.id);
              }}
              style={{
                width: 24,
                height: 24,
                border: "none",
                background: "transparent",
                color: isFav ? p.primary : p.outline,
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
                padding: 0,
              }}
              title={isFav ? "Remove favorite" : "Add to favorites"}
            >
              <Icon name="star" size={16} fill={isFav} />
            </button>
          </div>
        </div>

        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: p.onSurface,
            lineHeight: 1.3,
            marginBottom: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {preset.title}
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 400,
            color: p.onSurfaceVariant,
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {preset.desc}
        </span>
      </div>
    );
  };

  const grid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(78px, 1fr))",
    gap: 6,
  };

  const presetGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: 8,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
      {/* Mode Switcher Tabs: Current All vs Component List */}
      <div style={{ padding: "10px 12px 6px", display: "flex", gap: 4 }}>
        <button
          type="button"
          onClick={() => setTabMode("current")}
          className="m3-press"
          style={{
            flex: 1,
            height: 36,
            borderRadius: 18,
            border: "none",
            background: tabMode === "current" ? p.primary : p.surfaceContainerHigh,
            color: tabMode === "current" ? p.onPrimary : p.onSurfaceVariant,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            transition: "background 140ms ease, color 140ms ease",
          }}
        >
          <Icon name="widgets" size={17} />
          <span>Current All</span>
        </button>

        <button
          type="button"
          onClick={() => setTabMode("ecommerce")}
          className="m3-press"
          style={{
            flex: 1.2,
            height: 36,
            borderRadius: 18,
            border: "none",
            background: tabMode === "ecommerce" ? p.primary : p.surfaceContainerHigh,
            color: tabMode === "ecommerce" ? p.onPrimary : p.onSurfaceVariant,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            transition: "background 140ms ease, color 140ms ease",
          }}
        >
          <Icon name="shopping_bag" size={17} />
          <span>Component List</span>
        </button>
      </div>

      {/* Quick Full-App Template Launchers */}
      <div
        style={{
          padding: "4px 12px 8px",
          display: "flex",
          gap: 6,
          overflowX: "auto",
        }}
        className="no-scrollbar"
      >
        <button
          type="button"
          onClick={() => onLoadTemplateDoc?.(buildMoneyManagementAppDoc())}
          className="m3-press"
          style={{
            flex: "0 0 auto",
            height: 30,
            padding: "0 10px",
            borderRadius: 15,
            border: `1px solid ${p.outlineVariant}`,
            background: p.surfaceContainerLow,
            color: p.primary,
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            whiteSpace: "nowrap",
          }}
          title="Load complete 4-screen Personal Money Management App (Dashboard, Analytics, Transfer, Goals)"
        >
          <Icon name="account_balance_wallet" size={15} />
          <span>💰 Money App</span>
        </button>

        <button
          type="button"
          onClick={() => onLoadTemplateDoc?.(buildEcommerceAppDoc())}
          className="m3-press"
          style={{
            flex: "0 0 auto",
            height: 30,
            padding: "0 10px",
            borderRadius: 15,
            border: `1px solid ${p.outlineVariant}`,
            background: p.surfaceContainerLow,
            color: p.primary,
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            whiteSpace: "nowrap",
          }}
          title="Load complete 4-screen Professional E-Commerce App (Marketplace, Catalog, Details, Cart)"
        >
          <Icon name="storefront" size={15} />
          <span>🛍️ E-Commerce App</span>
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ padding: "0 12px 8px" }}>
        <Field
          value={q}
          onChange={setQ}
          placeholder={tabMode === "current" ? t("search", lang) : "Search e-commerce components..."}
          p={p}
          icon="search"
          height={38}
        />
      </div>

      {/* Main Palette Scroll Area */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "0 8px 16px" }}>
        {tabMode === "current" ? (
          /* ================= STANDARD M3 ALL COMPONENTS ================= */
          <>
            {!q && favorites.length > 0 && (
              <Section id="fav" icon="star" title={t("favorites", lang)} p={p}>
                <div style={grid}>{favorites.filter((k) => KIND_SPEC[k] && !PALETTE_HIDDEN.includes(k)).map(tile)}</div>
              </Section>
            )}
            {q ? (
              <div style={{ ...grid, padding: "4px 4px 12px" }}>
                {filteredKinds.map(tile)}
                {filteredKinds.length === 0 && (
                  <div
                    role="status"
                    style={{
                      gridColumn: "1 / -1",
                      color: p.outline,
                      fontSize: 13,
                      padding: 16,
                      textAlign: "center",
                      display: "grid",
                      placeItems: "center",
                      gap: 6,
                    }}
                  >
                    <Icon name="search_off" size={28} />
                    <span>{t("noMatch", lang)}</span>
                  </div>
                )}
              </div>
            ) : (
              CATEGORIES.map((c) => (
                <Section key={c.key} id={`cat:${c.key}`} icon={c.icon} title={lang === "en" ? c.label : CATEGORY_TEXT[lang][c.key]} p={p}>
                  <div style={grid}>
                    {KIND_ORDER.filter((k) => KIND_SPEC[k].category === c.key && !PALETTE_HIDDEN.includes(k)).map(tile)}
                  </div>
                </Section>
              ))
            )}
          </>
        ) : (
          /* ================= PROFESSIONAL E-COMMERCE COMPONENT LIST ================= */
          <>
            {/* Quick Helper Banner */}
            {!q && (
              <div
                style={{
                  margin: "4px 4px 10px",
                  padding: "10px 12px",
                  borderRadius: 14,
                  background: p.secondaryContainer,
                  color: p.onSecondaryContainer,
                  fontSize: 12,
                  lineHeight: 1.45,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                }}
              >
                <Icon name="auto_awesome" size={18} />
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>Professional E-Commerce Library</div>
                  <div style={{ fontSize: 11, opacity: 0.9 }}>
                    Click or drag any component to drop it onto your selected screen with real prices, photos & styling.
                  </div>
                </div>
              </div>
            )}

            {/* Favorite E-Commerce Presets */}
            {!q && presetFavorites.length > 0 && (
              <Section id="preset_favs" icon="star" title="Favorite Components" p={p}>
                <div style={presetGrid}>
                  {ECOMMERCE_PRESETS.filter((pr) => presetFavorites.includes(pr.id)).map(presetTile)}
                </div>
              </Section>
            )}

            {q ? (
              <div style={{ ...presetGrid, padding: "4px 4px 12px" }}>
                {filteredPresets.map(presetTile)}
                {filteredPresets.length === 0 && (
                  <div
                    role="status"
                    style={{
                      gridColumn: "1 / -1",
                      color: p.outline,
                      fontSize: 13,
                      padding: 20,
                      textAlign: "center",
                      display: "grid",
                      placeItems: "center",
                      gap: 8,
                    }}
                  >
                    <Icon name="search_off" size={28} />
                    <span>No e-commerce components matching "{q}"</span>
                  </div>
                )}
              </div>
            ) : (
              ECOMMERCE_CATEGORIES.map((cat) => {
                const presetsInCat = ECOMMERCE_PRESETS.filter((pr) => pr.category === cat.key);
                if (presetsInCat.length === 0) return null;
                return (
                  <Section
                    key={cat.key}
                    id={`ecom_cat:${cat.key}`}
                    icon={cat.icon}
                    title={`${cat.label} (${presetsInCat.length})`}
                    p={p}
                  >
                    <div style={presetGrid}>{presetsInCat.map(presetTile)}</div>
                  </Section>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
}
