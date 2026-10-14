"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  FAB_MENU_CLOSE,
  FAB_MENU_GAP,
  FAB_MENU_ITEM_H,
  H,
  Item,
  Kind,
  MEASURED,
  NAV_BAR_H,
  Palette,
  Radii,
  R_INNER,
  SPLIT_GAP,
  SPLIT_MAIN_SLOT,
  SPLIT_MENU_ITEM_H,
  SPLIT_MENU_PAD,
  SPLIT_MENU_SHEET_GAP,
  SPLIT_MENU_SLOT,
  STATUS_BAR_H,
  baseRadii,
  buttonHeightOf,
  chipHeightOf,
  chipMetrics,
  extendedFabHeight,
  extendedFabMetrics,
  fabOpen,
  isMeasured,
  menuOpen,
  buttonMetrics,
  CARD_MEDIA_GAP,
  CARD_PADDING,
  CARD_TEXT_GAP,
  cardContentAlignOf,
  cardTextAlignOf,
  cardFillOf,
  cardImagePosOf,
  cardImageSizeOf,
  cardBodyColorOf,
  cardScrimOf,
  cardTextColorOf,
  dateLayoutOf,
  onToken,
  resolveColor,
  scaleR,
  menuRises,
  sizeOf,
  splitMetrics,
  variantShadow,
  variantStyle,
  SETTLE_MS,
  progressThickness,
  RAIL_TOP,
  RAIL_W,
  RAIL_ITEM_H,
  RAIL_GAP,
  isWideRail,
  railMetrics,
  isScrollableTabs,
  tabScrollOffset,
  SCROLL_TAB_W,
  RIPPLE_KINDS,
  TOP_BAR_SIZES,
  topBarHeightOf,
  topBarFontOf,
} from "../lib/tokens";
import { CircularProgress, LinearProgress, LoadingIndicator } from "./Loading";
import { CarouselBody, DatePickerBody, TimePickerBody } from "./Pickers";
import { t, useLang } from "../lib/i18n";
import { useTheme } from "../lib/theme";
import { railSelectedLabelColor } from "../lib/color";

/** weight of a heading or label: heavier under the emphasized type setting */
const useWeight = () => {
  const emphasized = useTheme().emphasized;
  return (normal: number, strong: number) => (emphasized ? strong : normal);
};

export function Icon({
  name,
  size = 24,
  color,
  fill,
  weight,
}: {
  name: string;
  size?: number;
  color?: string;
  fill?: boolean;
  weight?: number;
}) {
  return (
    <span
      className="msr"
      /* the ligature is a picture, not words: a screen reader should not spell out its name */
      aria-hidden
      data-fill={fill ? "1" : "0"}
      style={{
        fontSize: size,
        color,
        fontVariationSettings: weight
          ? `"FILL" ${fill ? 1 : 0}, "wght" ${weight}, "GRAD" 0, "opsz" 24`
          : undefined,
      }}
    >
      {name}
    </span>
  );
}

/** One touch of a part: where it landed, how far the circle has to travel to cover the shape it
 *  landed in, and which shape that was -- a split button's two halves light up one at a time. */
export type Ripple = {
  id: number;
  part: string | null;
  /** the finger or pointer that made it, so lifting one finger leaves another's light alone */
  pointer?: number;
  x: number;
  y: number;
  d: number;
  /** the size it starts at, as a part of the whole: a light handed from one drawing of a part to
   *  another carries on from where the first one had got to rather than starting over */
  from?: number;
  /** how long it has left to finish growing, in seconds */
  dur?: number;
};

/** how long a ripple takes to cover what it was started in */
export const RIPPLE_GROW = 0.42;

/** how far out of the point touched a circle must grow to cover the whole of an element */
export function rippleSize(r: { width: number; height: number }, x: number, y: number): number {
  return 2 * Math.max(Math.hypot(x, y), Math.hypot(r.width - x, y), Math.hypot(x, r.height - y), Math.hypot(r.width - x, r.height - y));
}

/** The circles themselves: they spread out of the point touched at the colour of whatever is
 *  written on the part -- white over a filled button -- and fade once the finger is off it.
 *  M3's pressed state layer is a tenth of that colour; the ripple arrives a shade stronger and
 *  settles onto it. The caller gives them something to be clipped by. */
export function Ripples({ list, color }: { list: Ripple[]; color: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <AnimatePresence>
      {list.map((r) => (
        <motion.span
          key={r.id}
          aria-hidden
          initial={{ opacity: 0.16, scale: r.from ?? 0 }}
          animate={{ opacity: 0.12, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={reducedMotion ? { duration: 0 } : { scale: { duration: r.dur ?? RIPPLE_GROW, ease: MENU_EASE }, opacity: { duration: 0.3, ease: MENU_EASE } }}
          style={{
            position: "absolute",
            left: r.x - r.d / 2,
            top: r.y - r.d / 2,
            width: r.d,
            height: r.d,
            borderRadius: "50%",
            background: color,
            pointerEvents: "none",
          }}
        />
      ))}
    </AnimatePresence>
  );
}

/** what a part being pressed is lighting up, for the shapes drawn deep inside it to read */
const RippleCtx = createContext<{ list: Ripple[]; color: string } | null>(null);

/** the light of a press, inside one shape of a part: the shape clips it and keeps its corners */
function RippleShape({ part }: { part: string | null }) {
  const ctx = useContext(RippleCtx);
  if (!ctx) return null;
  return (
    <span aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "inherit", pointerEvents: "none" }}>
      <Ripples list={ctx.list.filter((r) => r.part === part)} color={ctx.color} />
    </span>
  );
}

/** the touches a part is holding, and where each of them landed */
function useRipples(on: boolean) {
  const [list, setList] = useState<Ripple[]>([]);
  const next = useRef(0);
  /* the light stays for as long as the finger is down, wherever it travels: a part being dragged
   * across the canvas keeps it, and it fades once the finger is lifted rather than at the edge
   * of the part. The release is watched on the window, because that is where a drag ends. */
  const waiting = useRef<(() => void) | null>(null);
  const end = () => {
    waiting.current?.();
    setList((rs) => (rs.length ? [] : rs));
  };
  const add = (e: React.PointerEvent) => {
    if (!on) return;
    /* only the main button of a mouse is a press: a right or a middle click opens nothing here */
    if (e.pointerType === "mouse" && e.button !== 0) return;
    /* a part made of more than one shape says which one was touched */
    const seg = (e.target as HTMLElement | null)?.closest?.("[data-part-shape]") as HTMLElement | null;
    const el = seg ?? (e.currentTarget as HTMLElement);
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    setList((rs) => [...rs, { id: ++next.current, part: seg?.dataset.partShape ?? null, x, y, d: rippleSize(r, x, y) }]);
    waiting.current?.();
    const done = () => {
      waiting.current = null;
      window.removeEventListener("pointerup", done);
      window.removeEventListener("pointercancel", done);
      setList((rs) => (rs.length ? [] : rs));
    };
    waiting.current = done;
    window.addEventListener("pointerup", done);
    window.addEventListener("pointercancel", done);
  };
  /* a part taken off the canvas mid-press leaves no listener behind */
  useEffect(() => () => waiting.current?.(), []);
  return { list, add, end };
}

const ellipsis = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
} as const;

const NO_BOX: Kind[] = [
  "circularProgress",
  "linearProgress",
  "loadingIndicator",
  "switch",
  "checkbox",
  "radio",
  "slider",
  "text",
  "divider",
  "splitButton",
  "fabMenu",
  "carousel",
  "avatar",
  "badge",
  "rating",
  "audioPlayer",
  "videoPlayer",
  "qrCode",
  "tag",
  "stepper",
  "priceTag",
  "couponCode",
  "colorSwatch",
  "creditCard",
  "deliveryEstimate",
  "orderStatus",
  "sizeSelector",
  "countdownTimer",
  "reviewSummary",
  "addressCard",
  "paymentMethodSelector",
  "balanceCard",
  "transactionItem",
  "statMetricCard",
  "miniChart",
  "expenseProgress",
  "storyBubble",
  "chatBubble",
  "userProfileHeader",
  "notificationItem",
  "socialLoginGroup",
  "passwordStrength",
  "biometricPrompt",
  "filterChips",
  "signaturePad",
  "floatingActionDock",
  "segmentedTabs",
  "banner",
  "tooltip",
  "skeleton",
  "emptyState",
  "toast",
  "segmentedButton",
  "timeline",
  "accordion",
  "faqAccordion",
  "otpInput",
  "fileUpload",
  "lineChart",
  "barChart",
  "areaChart",
  "donutChart",
  "pieChart",
  "candlestickChart",
  "radarChart",
  "gaugeChart",
  "funnelChart",
  "heatMapGrid",
  "scatterPlot",
  "progressRingGroup",
  "cryptoTicker",
  "loanCalculator",
  "billReminderCard",
  "cardStackCarousel",
  "priceBreakdown",
  "freeShippingBar",
  "productComparisonTable",
  "loyaltyPointsBadge",
  "commentThread",
  "pollCard",
  "audioWaveMessage",
  "userBadgeGroup",
  "liveStreamBadge",
  "podcastEpisodeTile",
  "waveformPlayer",
  "verificationBadge",
  "colorPalettePicker",
  "starRatingInput",
  "stickyBottomBar",
  "notificationBannerSticky",
  "segmentedSplitView",
  "aiPromptInput",
  "aiMessageBubble",
  "aiSuggestionsRow",
  "codeSnippetBlock",
  "boardingPassCard",
  "foodDeliveryTracker",
  "restaurantMenuRow",
  "hotelBookingCard",
  "rideVehicleSelector",
  "heartRateMonitorCard",
  "sleepTrackerCard",
  "waterIntakeTracker",
  "medicationReminderTile",
  "stepCounterCard",
  "kanbanCard",
  "taskChecklistRow",
  "calendarEventCard",
  "fileAttachmentCard",
  "notesSnippetCard",
  "todoCard",
  "todoStatsCard",
  "todoCreateCard",
  "todoDetailCard",
  "todoEditCard",
  "todoListInteractive",
  "thermostatDial",
  "smartLightControl",
  "deviceStatusTile",
  "securityCameraFeed",
  "courseProgressCard",
  "quizQuestionCard",
  "flashcardViewer",
  "certificateBadgeCard",
  "leaderboardRow",
  "achievementBadge",
  "rewardStreakCard",
  "inventoryItemSlot",
  "audioPlaylistRow",
  "videoStoryThumbnail",
  "searchFilterHeader",
  "bottomSheetMenu",
];

/** Padding follows M3: icon+label is tighter than label alone. */
export function ButtonContent({ item }: { item: Item }) {
  const w = useWeight();
  const hasIcon = !!item.icon;
  const hasLabel = (item.label ?? "").trim().length > 0;
  /* padding, gap, icon and label all come from the M3 size the height lands on;
   * with no label the icon is centred instead, which makes the button a circle */
  const m = buttonMetrics(buttonHeightOf(item));
  const padX = hasLabel ? m.padX : Math.round((m.h - m.icon) / 2);
  return (
    <span
      className="m3-size-ease"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: item.size ? "100%" : undefined,
        boxSizing: "border-box",
        gap: hasIcon && hasLabel ? m.gap : 0,
        paddingLeft: padX,
        paddingRight: padX,
        height: m.h,
        fontSize: m.font,
        fontWeight: w(500, 700),
        letterSpacing: 0.1,
        whiteSpace: "nowrap",
      }}
    >
      {hasIcon && <Icon name={item.icon!} size={m.icon} fill={item.variant === "filled"} />}
      {hasLabel && <span>{item.label}</span>}
    </span>
  );
}

function ExtendedFabContent({ item }: { item: Item }) {
  const w = useWeight();
  const hasIcon = !!item.icon;
  const hasLabel = (item.label ?? "").trim().length > 0;
  /* the padding, the icon and the label are the ones the height it was given asks for */
  const m = extendedFabMetrics(extendedFabHeight(item));
  return (
    <span
      className="m3-size-ease"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: hasIcon && hasLabel ? m.gap : 0,
        paddingLeft: m.padX,
        paddingRight: m.padX,
        height: m.h,
        fontSize: m.font,
        fontWeight: w(500, 700),
        whiteSpace: "nowrap",
      }}
    >
      {hasIcon && <Icon name={item.icon!} size={m.icon} />}
      {hasLabel && <span>{item.label}</span>}
    </span>
  );
}

function ChipContent({ item, p }: { item: Item; p: Palette }) {
  const on = !!item.checked;
  const lead = on ? "check" : item.icon;
  /* the padding, the icon and the label are the ones the height it was given asks for */
  const m = chipMetrics(chipHeightOf(item));
  return (
    <span
      className="m3-size-ease"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: m.gap,
        paddingLeft: lead ? m.lead : m.padX,
        paddingRight: m.padX,
        height: m.h,
        fontSize: m.font,
        fontWeight: 500,
        whiteSpace: "nowrap",
        color: on ? p.onSecondaryContainer : undefined,
      }}
    >
      {lead && <Icon name={lead} size={m.icon} />}
      <span>{item.label}</span>
    </span>
  );
}

function SwitchContent({ item, p }: { item: Item; p: Palette }) {
  const hasLabel = (item.label ?? "").trim().length > 0;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 14, height: H - 8, whiteSpace: "nowrap", width: item.size ? "100%" : undefined, justifyContent: item.size ? "space-between" : undefined }}>
      {hasLabel && <span style={{ fontSize: 16, color: p.onSurface, overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>}
      <SwitchControl on={!!item.checked} p={p} />
    </span>
  );
}

/** the M3 switch track and handle, 52 × 32 */
function SwitchControl({ on, p }: { on: boolean; p: Palette }) {
  return (
    <span
        style={{
          position: "relative",
          width: 52,
          height: 32,
          borderRadius: 16,
          background: on ? p.primary : p.surfaceContainerHighest,
          border: on ? "2px solid transparent" : `2px solid ${p.outline}`,
          boxSizing: "border-box",
          flex: "0 0 auto",
          transition: "background 160ms",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: on ? 22 : 4,
            width: on ? 24 : 16,
            height: on ? 24 : 16,
            marginTop: on ? -12 : -8,
            borderRadius: 12,
            background: on ? p.onPrimary : p.outline,
            display: "grid",
            placeItems: "center",
            color: p.onPrimaryContainer,
            transition: "left 160ms, width 160ms, height 160ms",
          }}
        >
          {on && <Icon name="check" size={16} weight={600} />}
        </span>
      </span>
  );
}

function CheckboxContent({ item, p }: { item: Item; p: Palette }) {
  const on = !!item.checked;
  const hasLabel = (item.label ?? "").trim().length > 0;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 40, whiteSpace: "nowrap" }}>
      <span style={{ width: 40, height: 40, display: "grid", placeItems: "center", flex: "0 0 auto" }}>
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: 3,
            boxSizing: "border-box",
            border: on ? "none" : `2px solid ${p.onSurfaceVariant}`,
            background: on ? p.primary : "transparent",
            color: p.onPrimary,
            display: "grid",
            placeItems: "center",
          }}
        >
          {on && <Icon name="check" size={16} weight={700} />}
        </span>
      </span>
      {hasLabel && <span style={{ fontSize: 16, color: p.onSurface, paddingRight: 8 }}>{item.label}</span>}
    </span>
  );
}

function TextContent({ item, p }: { item: Item; p: Palette }) {
  const w = useWeight();
  const fs = item.font ?? (item.size && item.size <= 57 ? item.size : 16);
  const color = item.textColor ? onToken(item.textColor, p) : p.onSurface;
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: fs,
        lineHeight: 1.35,
        fontWeight: item.bold ? w(700, 800) : w(400, fs >= 22 ? 600 : 500),
        letterSpacing: fs >= 28 ? -0.25 : 0,
        color,
        whiteSpace: "normal",
        maxWidth: 364,
        textAlign: (item.textAlign as any) || undefined,
        padding: "0 2px",
      }}
    >
      {item.label || " "}
    </span>
  );
}

/** A split button: the labeled action and, after a hairline gap, the arrow that opens its menu.
 *  Both segments are read off the button scale the height lands on, and they keep their own
 *  corners, so the box around them stays plain. */
function SplitButtonContent({ item, p, open }: { item: Item; p: Palette; open?: boolean }) {
  const w = useWeight();
  const reducedMotion = useReducedMotion();
  const st = variantStyle(item.variant, p);
  const h = buttonHeightOf(item);
  const m = splitMetrics(h);
  const outer = scaleR(h / 2);
  const inner = scaleR(R_INNER);
  const hasLabel = (item.label ?? "").trim().length > 0;
  /* with no label the icon is centred instead, the way a button with none is */
  const padX = hasLabel ? m.padX : Math.round((m.h - m.icon) / 2);
  const shadow = variantShadow(item.variant);
  return (
    <span className="m3-size-ease" style={{ display: "inline-flex", alignItems: "center", gap: SPLIT_GAP, height: m.h }}>
      <span
        className="m3-size-ease"
        data-part-shape={SPLIT_MAIN_SLOT}
        style={{
          ...st,
          display: "inline-flex",
          alignItems: "center",
          gap: hasLabel && item.icon ? m.gap : 0,
          height: m.h,
          paddingLeft: padX,
          paddingRight: padX,
          borderTopLeftRadius: outer,
          borderBottomLeftRadius: outer,
          borderTopRightRadius: inner,
          borderBottomRightRadius: inner,
          fontSize: m.font,
          fontWeight: w(500, 700),
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          boxShadow: shadow,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {item.icon && <Icon name={item.icon} size={m.icon} fill={item.variant === "filled"} />}
        {hasLabel && <span>{item.label}</span>}
        <RippleShape part={SPLIT_MAIN_SLOT} />
      </span>
      <span
        className="m3-size-ease"
        data-part-shape={SPLIT_MENU_SLOT}
        style={{
          ...st,
          display: "inline-grid",
          placeItems: "center",
          position: "relative",
          overflow: "hidden",
          /* the segment is as wide as its arrow with its own padding, so it eases like the other one */
          height: m.h,
          paddingLeft: m.trailPadX,
          paddingRight: m.trailPadX,
          /* opening the menu rounds this segment right off, the way M3 does it; the segment with
             the words keeps the shape it had */
          borderTopLeftRadius: open ? outer : inner,
          borderBottomLeftRadius: open ? outer : inner,
          borderTopRightRadius: outer,
          borderBottomRightRadius: outer,
          boxSizing: "border-box",
          boxShadow: shadow,
        }}
      >
        {/* the arrow turns over while the menu it opened is showing */}
        <span style={{ display: "inline-flex", transform: open ? "rotate(180deg)" : "none", transition: reducedMotion ? "none" : "transform 200ms cubic-bezier(0.2, 0, 0, 1)" }}>
          <Icon name="keyboard_arrow_down" size={m.icon} />
        </span>
        <RippleShape part={SPLIT_MENU_SLOT} />
      </span>
    </span>
  );
}

/** Whether a menu is drawn open, on its way out, or not yet. The preview draws its screens
 *  inside an AnimatePresence that blocks animations on mount, so a menu is drawn shut for one
 *  frame and told to open on the next, where nothing blocks it. A menu that has never been open
 *  starts rolled up; one on its way out only gives way a little, because what carries it off is
 *  the fade. */
function useOpenPhase(shown: boolean): "shut" | "open" | "closing" {
  const [phase, setPhase] = useState<"shut" | "open" | "closing">("shut");
  useEffect(() => {
    if (!shown) {
      setPhase((was) => (was === "shut" ? "shut" : "closing"));
      return;
    }
    const id = requestAnimationFrame(() => setPhase("open"));
    return () => cancelAnimationFrame(id);
  }, [shown]);
  return phase;
}

/** A split button with its menu open: the button where the author put it, and the sheet of
 *  entries beside it -- below the button where the screen has room, above it where it does not.
 *  The sheet grows out of the edge nearest the button, so the two read as one gesture. */
function SplitMenuContent({ item, p, shown = true }: { item: Item; p: Palette; shown?: boolean }) {
  const w = useWeight();
  const reducedMotion = useReducedMotion();
  const up = menuRises(item);
  const tabs = item.tabs ?? [];
  const phase = useOpenPhase(shown);
  const open = phase === "open";
  const sheet = (
    <motion.div
      initial={false}
      animate={{ opacity: open ? 1 : 0, scaleY: open ? 1 : 0.7 }}
      transition={reducedMotion ? { duration: 0 } : { duration: open ? MENU_ROLL : MENU_SHUT, ease: MENU_EASE }}
      style={{
        /* it unrolls out of the edge the button is on */
        transformOrigin: up ? "50% 100%" : "50% 0%",
        background: p.surfaceContainer,
        color: p.onSurface,
        borderRadius: scaleR(12),
        padding: `${SPLIT_MENU_PAD}px 0`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.10)",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {tabs.map((tab, i) => (
        <motion.div
          key={i}
          initial={false}
          /* the entry nearest the button is read first, so it is the first to arrive */
          animate={{ opacity: open ? 1 : 0 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : open
                ? { duration: 0.12, delay: (up ? tabs.length - 1 - i : i) * MENU_STAGGER }
                : { duration: 0.06 }
          }
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            height: SPLIT_MENU_ITEM_H,
            padding: "0 12px",
            fontSize: 14,
            fontWeight: w(500, 700),
            whiteSpace: "nowrap",
            boxSizing: "border-box",
          }}
        >
          {tab.icon && <Icon name={tab.icon} size={24} />}
          <span style={ellipsis}>{tab.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: up ? "flex-end" : "flex-start",
        gap: SPLIT_MENU_SHEET_GAP,
        height: "100%",
      }}
    >
      {up && sheet}
      {/* the button keeps its own width whatever the sheet under it comes to */}
      <span style={{ alignSelf: "flex-start" }}>
        <SplitButtonContent item={item} p={p} open={open} />
      </span>
      {!up && sheet}
    </div>
  );
}

function RadioContent({ item, p }: { item: Item; p: Palette }) {
  const on = !!item.checked;
  const hasLabel = (item.label ?? "").trim().length > 0;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 40, whiteSpace: "nowrap" }}>
      <span style={{ width: 40, height: 40, display: "grid", placeItems: "center", flex: "0 0 auto" }}>
        <span
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            boxSizing: "border-box",
            border: `2px solid ${on ? p.primary : p.onSurfaceVariant}`,
            display: "grid",
            placeItems: "center",
          }}
        >
          {on && <span style={{ width: 10, height: 10, borderRadius: 5, background: p.primary }} />}
        </span>
      </span>
      {hasLabel && <span style={{ fontSize: 16, color: p.onSurface, paddingRight: 8 }}>{item.label}</span>}
    </span>
  );
}

/** Content for kinds that size to their text; rendered again offscreen to measure. */
export function MeasuredContent({ item, p }: { item: Item; p: Palette }) {
  if (menuOpen(item)) return item.kind === "splitButton" ? <SplitMenuContent item={item} p={p} /> : <FabMenuContent item={item} p={p} />;
  switch (item.kind) {
    case "button":
      return <ButtonContent item={item} />;
    case "extendedFab":
      return <ExtendedFabContent item={item} />;
    case "chip":
      return <ChipContent item={item} p={p} />;
    case "switch":
      return <SwitchContent item={item} p={p} />;
    case "checkbox":
      return <CheckboxContent item={item} p={p} />;
    case "text":
      return <TextContent item={item} p={p} />;
    case "splitButton":
      return <SplitButtonContent item={item} p={p} />;
    case "radio":
      return <RadioContent item={item} p={p} />;
    case "fabMenu":
      return <FabMenuContent item={item} p={p} />;
    default:
      return null;
  }
}

/** how long one entry takes to unroll, and how far apart the entries start */
const MENU_ROLL = 0.28;
const MENU_STAGGER = 0.045;
/** how long the button takes to reach the M size. A FAB taller than that reaches up into the row
 *  the nearest entry stands in, so the two are never on screen together: opening, the entries wait
 *  for the button to come down to size; shutting, the button waits for the entries to go. */
const MENU_BUTTON_ROLL = 0.16;
/** shutting is not the unrolling backwards: the entries give way a little and fade, from the far
 *  end down, so the menu is gone long before a full reverse run would have finished */
const MENU_SHUT = 0.16;
/** the one frame the drawing is swapped on, held long enough for the box not to ease across it */
const MENU_SNAP_MS = 60;
const MENU_SHUT_FADE = 0.1;
const MENU_SHUT_STAGGER = 0.025;
const MENU_SHUT_SCALE = 0.72;
const MENU_BUTTON_SHUT = 0.16;
const MENU_EASE = [0.2, 0, 0, 1] as const;

/** how long the whole reverse run takes, in milliseconds */
export const menuShutMs = (it: Item) => {
  const entries = menuEntriesShut(it);
  return Math.round(Math.max(entries, menuButtonWait(it) + MENU_BUTTON_SHUT) * 1000);
};

/** how long every entry takes to fade away */
const menuEntriesShut = (it: Item) => MENU_SHUT_FADE + Math.max(0, (it.tabs?.length ?? 1) - 1) * MENU_SHUT_STAGGER;
/** a FAB that reaches above the close button takes its turn; one that does not never waits */
const overTall = (it: Item) => (it.size ?? FAB_MENU_CLOSE) > FAB_MENU_CLOSE;
/** what the button waits for before growing back: every entry gone */
const menuButtonWait = (it: Item) => (overTall(it) ? menuEntriesShut(it) : 0);
/** what the entries wait for before unrolling: the button down to the close size */
const menuEntriesWait = (it: Item) => (overTall(it) ? MENU_BUTTON_ROLL : 0);

/** Whether the menu is drawn at all, and whether it is drawn open. The two part ways while the
 *  menu shuts: the node keeps its open shape, transparent and as tall as the entries, until they
 *  have rolled back into the button, and only then becomes the FAB again. */
function useMenuPhase(item: Item) {
  const open = menuOpen(item);
  const [drawn, setDrawn] = useState(open);
  /* read by the effect without restarting it: only the menu opening or closing may do that */
  const drawnRef = useRef(open);
  /** the frame the drawing is swapped on: the box must not ease its height across the swap */
  const [snap, setSnap] = useState(false);
  const shutMs = menuShutMs(item);
  useEffect(() => {
    if (open) {
      drawnRef.current = true;
      setDrawn(true);
      return;
    }
    if (!drawnRef.current) return;
    const id = setTimeout(() => {
      drawnRef.current = false;
      setDrawn(false);
      setSnap(true);
    }, shutMs);
    return () => clearTimeout(id);
  }, [open, shutMs]);
  useEffect(() => {
    if (!snap) return;
    const id = setTimeout(() => setSnap(false), MENU_SNAP_MS);
    return () => clearTimeout(id);
  }, [snap]);
  return { drawn, open, snap };
}

/** A FAB with its menu open: the entries it offers, and the button itself showing the close
 *  icon under them. The button stays where the author put it and grows or shrinks into the M-size
 *  close button; the entries unroll out of its right edge, the one nearest the button first.
 *  Nothing here changes the drawing's size, so the editor can measure it while it moves, and the
 *  menu is exactly as wide as its widest entry. */
function FabMenuContent({ item, p, shown = true }: { item: Item; p: Palette; shown?: boolean }) {
  const w = useWeight();
  const reducedMotion = useReducedMotion();
  const tabs = item.tabs ?? [];
  const filled = item.variant === "filled";
  const itemStyle = filled
    ? { background: p.primaryContainer, color: p.onPrimaryContainer }
    : { background: p.secondaryContainer, color: p.onSecondaryContainer };
  const extended = item.kind === "extendedFab";
  /* the close button is the M size: a small or a large FAB eases into it rather than jumping */
  const grow = (item.size ?? FAB_MENU_CLOSE) / FAB_MENU_CLOSE;
  /* opening, the entry nearest the button leads; shutting, the run plays back from the far end */
  const wait = menuEntriesWait(item);
  const after = (i: number) => wait + (tabs.length - 1 - i) * MENU_STAGGER;
  const before = (i: number) => i * MENU_SHUT_STAGGER;
  const phase = useOpenPhase(shown);
  const open = phase === "open";
  const closing = phase === "closing";
  const roll = (i: number) =>
    reducedMotion
      ? { duration: 0 }
      : open
        ? { duration: MENU_ROLL, ease: MENU_EASE, delay: after(i) }
        : { duration: MENU_SHUT, ease: MENU_EASE, delay: before(i) };
  const fade = (i: number) =>
    reducedMotion
      ? { duration: 0 }
      : open
        ? { duration: 0.12, delay: after(i) + MENU_ROLL * 0.55 }
        : { duration: 0.06, delay: before(i) };
  /* an entry is not there at all until its own roll begins, so a menu waiting its turn shows no
     slivers stacked over the button; on the way out it is the fade that takes it */
  const show = (i: number) =>
    reducedMotion
      ? { duration: 0 }
      : open
        ? { duration: 0, delay: after(i) }
        : closing
          ? { duration: MENU_SHUT_FADE, ease: MENU_EASE, delay: before(i) }
          : { duration: 0 };
  return (
    /* the column hangs from the bottom: the button keeps its place while the box above it grows */
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end", gap: FAB_MENU_GAP, height: "100%" }}>
      {tabs.map((tab, i) => (
        <motion.span
          key={i}
          /* the entry arrives with its roll and leaves by fading, part way through a roll it
             never finishes */
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={show(i)}
          style={{
            position: "relative",
            color: itemStyle.color,
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            height: FAB_MENU_ITEM_H,
            padding: "0 24px 0 20px",
            fontSize: 16,
            fontWeight: w(500, 700),
            whiteSpace: "nowrap",
            maxWidth: "100%",
            boxSizing: "border-box",
            flex: "0 0 auto",
          }}
        >
          {/* the pill itself unrolls from its right edge, so the entry opens towards the text */}
          <motion.span
            aria-hidden
            initial={false}
            animate={{ scaleX: open ? 1 : closing ? MENU_SHUT_SCALE : 0.06 }}
            transition={roll(i)}
            style={{
              ...itemStyle,
              position: "absolute",
              inset: 0,
              transformOrigin: "100% 50%",
              borderRadius: scaleR(28),
              boxShadow: "0 1px 3px rgba(0,0,0,0.16)",
            }}
          />
          {/* the icon and the label arrive once there is a pill wide enough to hold them */}
          <motion.span
            initial={false}
            animate={{ opacity: open ? 1 : 0 }}
            transition={fade(i)}
            style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 12, minWidth: 0 }}
          >
            {tab.icon && <Icon name={tab.icon} size={22} />}
            <span style={ellipsis}>{tab.label}</span>
          </motion.span>
        </motion.span>
      ))}
      <motion.span
        /* scaled rather than resized: the button, its icon and its corners all land on the M size
           together, and the drawing the editor measures never changes width */
        initial={false}
        animate={extended ? undefined : { scale: open ? 1 : grow }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : open
              ? { duration: MENU_BUTTON_ROLL, ease: MENU_EASE }
              : { duration: MENU_BUTTON_SHUT, ease: MENU_EASE, delay: menuButtonWait(item) }
        }
        style={{
          /* the button the menu hangs off is the FAB itself, wearing the icon that shuts it */
          ...variantStyle(item.variant, p),
          transformOrigin: "100% 100%",
          width: extended ? undefined : FAB_MENU_CLOSE,
          height: extended ? extendedFabHeight(item) : FAB_MENU_CLOSE,
          padding: extended ? "0 20px" : undefined,
          gap: 12,
          fontSize: 16,
          fontWeight: w(500, 700),
          whiteSpace: "nowrap",
          borderRadius: scaleR(extended ? extendedFabMetrics(extendedFabHeight(item)).radius : Math.round(FAB_MENU_CLOSE * 0.28)),
          display: "grid",
          placeItems: "center",
          boxShadow: "0 3px 8px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.12)",
          flex: "0 0 auto",
        }}
      >
        {/* the cross and the button's own icon trade places, so the swap at either end is
            between two drawings that already match */}
        <span style={{ display: "grid", placeItems: "center", gridArea: "1 / 1" }}>
          <motion.span
            initial={false}
            animate={{ opacity: open ? 1 : 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.1, delay: open ? 0.04 : 0 }}
            style={{ gridArea: "1 / 1", display: "grid", placeItems: "center" }}
          >
            <Icon name="close" size={24} />
          </motion.span>
          {item.icon && (
            <motion.span
              initial={false}
              animate={{ opacity: open ? 0 : 1 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.1, delay: open ? 0 : menuButtonWait(item) + 0.04 }}
              style={{ gridArea: "1 / 1", display: "grid", placeItems: "center" }}
            >
              <Icon name={item.icon} size={24} />
            </motion.span>
          )}
        </span>
        {extended && (item.label ?? "").trim() && <span style={{ gridArea: "1 / 2" }}>{item.label}</span>}
      </motion.span>
    </div>
  );
}

function InteractiveTextField({ item, p }: { item: Item; p: Palette }) {
  const [val, setVal] = useState(item.value ?? "");
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    if (item.value !== undefined) setVal(item.value);
  }, [item.value]);

  const filled = item.variant === "filled";
  const hasLabel = (item.label ?? "").trim().length > 0;
  const hasSupporting = !!item.supporting?.trim();
  const isPwd =
    item.icon2 === "visibility_off" ||
    item.icon2 === "visibility" ||
    (item.label ?? "").toLowerCase().includes("password");

  return (
    <div style={{ position: "relative", height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 16px",
          height: "100%",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {item.icon && <Icon name={item.icon} size={24} color={p.onSurfaceVariant} />}
        <input
          type={isPwd ? (showPwd ? "text" : "password") : "text"}
          value={val}
          onChange={(e) => {
            const next = e.target.value;
            setVal(next);
            item.value = next;
            window.dispatchEvent(
              new CustomEvent("field-input-change", {
                detail: { id: item.id, label: item.label, value: next },
              })
            );
          }}
          placeholder={item.placeholder || (hasLabel ? "" : item.label)}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: 15,
            color: p.onSurface,
            fontFamily: "inherit",
            padding: filled && hasLabel ? "14px 0 0 0" : 0,
            cursor: "text",
            zIndex: 3,
          }}
        />
        {item.icon2 && (
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              if (isPwd) setShowPwd(!showPwd);
            }}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              color: p.onSurfaceVariant,
              zIndex: 3,
            }}
          >
            <Icon
              name={isPwd ? (showPwd ? "visibility" : "visibility_off") : item.icon2}
              size={22}
            />
          </button>
        )}
      </div>
      {hasLabel && (
        <span
          style={{
            position: "absolute",
            left: item.icon ? 52 : 16,
            top: filled ? 6 : -8,
            fontSize: 12,
            lineHeight: "16px",
            color: p.primary,
            background: filled ? "transparent" : (resolveColor(p.surface, p) || "#FFFFFF"),
            padding: filled ? 0 : "0 4px",
            marginLeft: filled ? 0 : -4,
            pointerEvents: "none",
            zIndex: 4,
          }}
        >
          {item.label}
        </span>
      )}
      {filled && (
        <span
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 2,
            background: p.primary,
            pointerEvents: "none",
          }}
        />
      )}
      {hasSupporting && (
        <span
          style={{
            position: "absolute",
            left: 16,
            top: "100%",
            marginTop: 4,
            fontSize: 12,
            color: p.onSurfaceVariant,
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {item.supporting}
        </span>
      )}
    </div>
  );
}

function InteractiveSearchBar({ item, p }: { item: Item; p: Palette }) {
  const [val, setVal] = useState(item.value ?? "");
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "0 12px",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        borderRadius: scaleR(12),
        background: p.surfaceContainerLow,
        border: `1px solid ${p.outline}`,
      }}
    >
      {item.icon && <Icon name={item.icon} size={20} color={p.onSurfaceVariant} />}
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={item.placeholder || item.label || "Search for clothes..."}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onKeyUp={(e) => e.stopPropagation()}
        style={{
          flex: 1,
          minWidth: 0,
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: 14,
          color: p.onSurface,
          fontFamily: "inherit",
          cursor: "text",
        }}
      />
      {item.icon2 && <Icon name={item.icon2} size={20} color={p.onSurfaceVariant} />}
      {item.icon3 && (
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: p.primary,
            color: p.onPrimary,
            display: "grid",
            placeItems: "center",
            flex: "0 0 auto",
          }}
        >
          <Icon name={item.icon3} size={18} color={p.onPrimary} />
        </div>
      )}
    </div>
  );
}

function InteractiveOtpDigit({
  item,
  ink,
  fontWeight,
}: {
  item: Item;
  ink: string;
  fontWeight: number;
}) {
  const [val, setVal] = useState(item.value ?? item.label);
  return (
    <input
      type="text"
      maxLength={1}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      onKeyUp={(e) => e.stopPropagation()}
      style={{
        width: "100%",
        textAlign: "center",
        border: "none",
        outline: "none",
        background: "transparent",
        fontSize: item.font || 24,
        fontWeight,
        color: ink,
        fontFamily: "inherit",
        cursor: "text",
      }}
    />
  );
}

function InteractiveQuantityStepper({
  initialCount = 1,
  palette,
  p: propP,
}: {
  initialCount?: number;
  palette?: Palette;
  p?: Palette;
}) {
  const p = (palette || propP)!;
  const [val, setVal] = useState(initialCount);
  useEffect(() => {
    if (typeof initialCount === "number") setVal(initialCount);
  }, [initialCount]);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: p.surfaceContainerHighest,
        padding: "3px 6px",
        borderRadius: 16,
        flex: "0 0 auto",
      }}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setVal((v) => Math.max(1, v - 1));
        }}
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          border: "none",
          background: p.surfaceContainerHigh,
          color: p.onSurface,
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
          padding: 0,
        }}
        title="Decrease quantity"
      >
        -
      </button>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: p.onSurface,
          minWidth: 16,
          textAlign: "center",
        }}
      >
        {val}
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setVal((v) => v + 1);
        }}
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          border: "none",
          background: p.primary,
          color: p.onPrimary,
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
          padding: 0,
        }}
        title="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

function InteractiveOtpBoxes({
  label = "5 8 2 9",
  palette: p,
}: {
  label?: string;
  palette: Palette;
}) {
  const raw = (label || "5 8 2 9").replace(/\s+/g, "");
  const defaultDigits = (raw.length >= 4 ? raw : "5829").slice(0, 6).split("");
  const [digits, setDigits] = useState<string[]>(defaultDigits);
  const [focusIdx, setFocusIdx] = useState<number>(2);

  useEffect(() => {
    const nextRaw = (label || "5 8 2 9").replace(/\s+/g, "");
    setDigits((nextRaw.length >= 4 ? nextRaw : "5829").slice(0, 6).split(""));
  }, [label]);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        boxSizing: "border-box",
      }}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {digits.map((digit, i) => {
        const isFocused = focusIdx === i;
        return (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={digit}
            onFocus={() => setFocusIdx(i)}
            onChange={(e) => {
              const val = e.target.value.slice(-1);
              const next = [...digits];
              next[i] = val;
              setDigits(next);
            }}
            style={{
              width: 38,
              height: 44,
              borderRadius: 10,
              border: `1.5px solid ${isFocused ? p.primary : p.outlineVariant}`,
              background: isFocused ? p.surfaceContainerHigh : p.surfaceContainerLow,
              textAlign: "center",
              fontSize: 18,
              fontWeight: 700,
              color: p.onSurface,
              outline: "none",
              fontFamily: "inherit",
              cursor: "text",
              boxShadow: isFocused ? `0 0 0 2px ${p.primary}30` : "none",
              transition: "all 140ms ease",
              padding: 0,
              boxSizing: "border-box",
            }}
          />
        );
      })}
    </div>
  );
}

function InteractiveListItemInput({
  placeholder,
  palette: p,
}: {
  placeholder: string;
  palette: Palette;
}) {
  const [text, setText] = useState("");
  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder={placeholder}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      onKeyUp={(e) => e.stopPropagation()}
      style={{
        border: `1px solid ${p.outlineVariant}`,
        background: p.surfaceContainerLowest,
        color: p.onSurface,
        fontSize: 12,
        padding: "4px 8px",
        borderRadius: 8,
        width: 100,
        outline: "none",
        flex: "0 0 auto",
      }}
    />
  );
}

function Body({ item, p, tabScroll, menuShown }: { item: Item; p: Palette; tabScroll?: number; menuShown?: boolean }) {
  const lang = useLang();
  const w = useWeight();
  const hasLabel = (item.label ?? "").trim().length > 0;
  const hasSupporting = !!item.supporting?.trim();

  if (menuOpen(item)) return item.kind === "splitButton" ? <SplitMenuContent item={item} p={p} shown={menuShown} /> : <FabMenuContent item={item} p={p} shown={menuShown} />;
  if (MEASURED.includes(item.kind)) return <MeasuredContent item={item} p={p} />;

  switch (item.kind) {
    case "bottomSheet":
      return (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 16 }}>
          <div
            style={{
              width: 32,
              height: 4,
              borderRadius: 2,
              background: onToken(item.fill ?? "surfaceContainerLow", p),
              opacity: 0.4,
            }}
          />
        </div>
      );

    case "iconButton":
      /* the icon is the one the M3 size the circle lands on asks for */
      return (
        <div style={{ display: "grid", placeItems: "center", height: "100%" }}>
          {item.icon && <Icon name={item.icon} size={buttonMetrics(buttonHeightOf(item)).icon} fill={item.variant === "filled"} />}
        </div>
      );

    case "fab": {
      const s = item.size ?? 56;
      return (
        <div style={{ display: "grid", placeItems: "center", height: "100%" }}>
          {item.icon && <Icon name={item.icon} size={Math.round(s * 0.42)} />}
        </div>
      );
    }

    case "topAppBar": {
      /* the small bar keeps its title between the icons; the medium and large ones let it down
         onto a line of its own at the foot, the way M3's flexible bars do */
      const barH = topBarHeightOf(item);
      const tall = barH > TOP_BAR_SIZES[0].h;
      const font = item.font || (tall ? 28 : (item.icon ? 20 : 26));
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            /* the inset the bar has, if any (see sizeOf) */
            padding: `${sizeOf(item, {}).h - barH}px 0 0`,
            height: "100%",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 12px", height: 64, flex: "0 0 auto" }}>
            {item.icon ? (
              <div style={{ width: 44, height: 44, display: "grid", placeItems: "center", flex: "0 0 auto" }}>
                <Icon name={item.icon} size={24} color={p.onSurface} />
              </div>
            ) : null}
            <div className="m3-size-ease" style={{ flex: 1, minWidth: 0, fontSize: font, fontWeight: 700, color: p.onSurface, letterSpacing: -0.5, ...ellipsis }}>
              {item.label}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "0 0 auto" }}>
              {item.icon2 && (
                <div style={{ width: 40, height: 40, display: "grid", placeItems: "center", borderRadius: "50%", background: p.surfaceContainerLow, color: p.onSurface }}>
                  <Icon name={item.icon2} size={22} color={p.onSurface} />
                </div>
              )}
              {item.icon3 && (
                <div style={{ width: 40, height: 40, display: "grid", placeItems: "center", borderRadius: "50%", background: p.surfaceContainerLow, color: p.onSurface, position: "relative" }}>
                  <Icon name={item.icon3} size={22} color={p.onSurface} />
                  <span style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: "50%", background: "#EF4444" }} />
                </div>
              )}
            </div>
          </div>
          {tall && item.supporting && (
            <div className="m3-size-ease" style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "flex-end", padding: "0 16px 16px", fontSize: 13, color: p.onSurfaceVariant, ...ellipsis }}>
              {item.supporting}
            </div>
          )}
        </div>
      );
    }

    case "searchBar":
      return <InteractiveSearchBar item={item} p={p} />;

    case "card": {
      const pos = cardImagePosOf(item);
      const hasImage = !item.noImage;
      const padding = CARD_PADDING;
      const align = cardContentAlignOf(item);
      const justifyContent = { start: "flex-start", center: "center", end: "flex-end" }[align] as React.CSSProperties["justifyContent"];
      const across = cardTextAlignOf(item);
      const alignItems = { start: "flex-start", center: "center", end: "flex-end" }[across] as React.CSSProperties["alignItems"];
      const textAlign = { start: "start", center: "center", end: "end" }[across] as React.CSSProperties["textAlign"];
      const ink = cardTextColorOf(item, p);
      const body = cardBodyColorOf(item, p);
      const isBareIcon = !item.src && item.icon && (item.iconFill === "none" || pos === "leading");
      const picture = item.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.src} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : (
        item.icon && <Icon name={item.icon} size={isBareIcon ? 24 : 34} />
      );
      const media = (style: React.CSSProperties) => (
        <div
          style={{
            borderRadius: scaleR(12),
            background: isBareIcon ? "transparent" : p.primaryContainer,
            color: isBareIcon ? p.onSurface : p.onPrimaryContainer,
            display: "grid",
            placeItems: "center",
            flex: "0 0 auto",
            overflow: "hidden",
            position: "relative",
            ...style,
          }}
        >
          {picture}
          {item.badge && (pos === "top" && item.src) && (
            <span
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                background: "#EF4444",
                color: "#FFFFFF",
                fontSize: 11,
                fontWeight: 700,
                padding: "2px 6px",
                borderRadius: 6,
                zIndex: 2,
              }}
            >
              {item.badge}
            </span>
          )}
          {item.icon2 && (pos === "top" && item.src) && (
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.92)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                display: "grid",
                placeItems: "center",
                color: "#EF4444",
                zIndex: 2,
              }}
            >
              <Icon name={item.icon2} size={16} color="#EF4444" fill={item.icon2Fill} />
            </div>
          )}
        </div>
      );
      const text = (
        /* the column may shrink under a large picture: what does not fit is clipped, never pushed out of the card */
        <div style={{ flex: 1, minWidth: 0, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column", gap: CARD_TEXT_GAP, justifyContent, alignItems, textAlign }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, width: "100%" }}>
            {hasLabel && (
              (!item.src && !item.supporting && (item.contentAlign === "center" || item.textAlign === "center") && item.label.length <= 2) ? (
                <InteractiveOtpDigit item={item} ink={ink} fontWeight={w(600, 700)} />
              ) : (
                <div style={{ fontSize: item.font || 14, fontWeight: w(600, 700), color: ink, maxWidth: "100%", ...ellipsis }}>
                  {item.label}
                </div>
              )
            )}
            {item.badge && (pos !== "top" || !item.src) && (
              <span
                style={{
                  flex: "0 0 auto",
                  background: item.badge.startsWith("-") ? "#EF4444" : (item.badge === "Default" ? "#111827" : "#F3F4F6"),
                  color: item.badge === "Default" || item.badge.startsWith("-") ? "#FFFFFF" : "#111827",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: 6,
                  lineHeight: "13px",
                }}
              >
                {item.badge}
              </span>
            )}
          </div>
          {hasSupporting && (
            <div style={{ fontSize: 13, lineHeight: 1.4, color: body.color, opacity: body.opacity, overflow: "hidden" }}>
              {item.supporting}
            </div>
          )}
        </div>
      );
      const trailingIcon = item.icon2 && (pos !== "top" || !item.src) ? (
        <div
          style={{
            flex: "0 0 auto",
            display: "grid",
            placeItems: "center",
            alignSelf: "center",
            color: item.icon2Fill ? "#EF4444" : (item.textColor ? p[item.textColor] : p.onSurfaceVariant),
            paddingLeft: 6,
          }}
        >
          <Icon name={item.icon2} size={20} fill={item.icon2Fill} />
        </div>
      ) : null;
      if (hasImage && pos === "background") {
        /* Full-bleed media behind the text. A photo, or a chosen text color that the placeholder's
         * container may not carry, gets a scrim on the text's side: dark under light text, light under dark. */
        const scrim = item.src || item.textColor ? cardScrimOf(ink, align) : undefined;
        return (
          <div style={{ position: "relative", height: "100%", boxSizing: "border-box" }}>
            <div style={{ position: "absolute", inset: 0, background: p.primaryContainer, color: p.onPrimaryContainer, display: "grid", placeItems: "center" }}>
              {picture}
            </div>
            {scrim && <div style={{ position: "absolute", inset: 0, background: scrim }} />}
            <div style={{ position: "relative", height: "100%", boxSizing: "border-box", padding, display: "flex", flexDirection: "column" }}>{text}</div>
          </div>
        );
      }
      /* top / bottom: the image band above or under the text; leading / trailing: a full-height column beside it */
      const side = hasImage && (pos === "leading" || pos === "trailing");
      const after = pos === "trailing" || pos === "bottom";
      return (
        <div
          style={{
            padding,
            height: "100%",
            display: "flex",
            flexDirection: side ? "row" : "column",
            alignItems: side ? "center" : undefined,
            gap: CARD_MEDIA_GAP,
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {hasImage && !after && media(side ? { width: cardImageSizeOf(item), alignSelf: "stretch" } : { height: cardImageSizeOf(item) })}
          {text}
          {trailingIcon}
          {hasImage && after && media(side ? { width: cardImageSizeOf(item), alignSelf: "stretch" } : { height: cardImageSizeOf(item) })}
        </div>
      );
    }

    case "listItem": {
      const iconBg = item.iconFill === "none" ? null : (item.iconFill ?? "primaryContainer");
      const isRed = item.textColor === "error" || item.label === "Logout";
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 14px", height: "100%", width: "100%", boxSizing: "border-box" }}>
          {item.src ? (
            <img
              src={item.src}
              alt=""
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                objectFit: "cover",
                flex: "0 0 auto",
              }}
            />
          ) : item.icon ? (
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                background: iconBg ? p[iconBg] : "transparent",
                color: isRed ? "#EF4444" : (iconBg ? onToken(iconBg, p) : onToken(item.fill ?? "surfaceContainerLow", p)),
                display: "grid",
                placeItems: "center",
                flex: "0 0 auto",
              }}
            >
              <Icon name={item.icon} size={22} color={isRed ? "#EF4444" : undefined} />
            </div>
          ) : null}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {hasLabel && (
                <div style={{ fontSize: 15, fontWeight: w(500, 600), color: isRed ? "#EF4444" : p.onSurface, ...ellipsis }}>
                  {item.label}
                </div>
              )}
              {item.badge && (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 6px",
                    borderRadius: 6,
                    background: item.badge.startsWith("-") || item.badge.includes("OFF") ? "#EF4444" : p.secondaryContainer,
                    color: item.badge.startsWith("-") || item.badge.includes("OFF") ? "#FFFFFF" : p.onSecondaryContainer,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>
            {hasSupporting && (
              <div style={{ fontSize: 12, color: p.onSurfaceVariant, ...ellipsis }}>{item.supporting}</div>
            )}
          </div>
          {item.placeholder && (
            <InteractiveListItemInput placeholder={item.placeholder} palette={p} />
          )}
          {item.count !== undefined && (
            <InteractiveQuantityStepper initialCount={item.count} palette={p} />
          )}
          {item.switch ? <SwitchControl on={!!item.checked} p={p} /> : item.icon2 && <Icon name={item.icon2} size={22} color={isRed ? "#EF4444" : p.onSurfaceVariant} />}
        </div>
      );
    }

    case "dialog":
      return (
        <div
          style={{
            padding: 24,
            height: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {item.icon && (
            <div style={{ textAlign: "center", color: p.primary }}>
              <Icon name={item.icon} size={24} />
            </div>
          )}
          {hasLabel && (
            <div
              style={{
                fontSize: 24,
                fontWeight: w(400, 600),
                color: p.onSurface,
                textAlign: item.icon ? "center" : "left",
                ...ellipsis,
              }}
            >
              {item.label}
            </div>
          )}
          {hasSupporting && (
            <div style={{ fontSize: 14, lineHeight: 1.5, color: p.onSurfaceVariant, flex: 1, overflow: "hidden" }}>
              {item.supporting}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            {[t("cancel", lang), t("ok", lang)].map((t) => (
              <span
                key={t}
                style={{
                  padding: "0 12px",
                  height: 40,
                  display: "inline-flex",
                  alignItems: "center",
                  color: p.primary,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      );

    case "snackbar":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px 0 16px", height: "100%" }}>
          <div style={{ flex: 1, minWidth: 0, fontSize: 14, color: p.inverseOnSurface, ...ellipsis }}>
            {item.label}
          </div>
          {hasSupporting && (
            <span
              style={{
                padding: "0 12px",
                height: 36,
                display: "inline-flex",
                alignItems: "center",
                color: p.inversePrimary,
                fontSize: 14,
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {item.supporting}
            </span>
          )}
        </div>
      );

    case "textField":
      return <InteractiveTextField item={item} p={p} />;

    case "select": {
      /* a closed dropdown: the chosen option is the value and the label floats; with
       * nothing chosen the label sits in the field */
      const filled = item.variant === "filled";
      const value = item.selected === undefined ? undefined : item.tabs?.[item.selected]?.label;
      return (
        <div style={{ position: "relative", height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 12px 0 16px", height: "100%" }}>
            {item.icon && <Icon name={item.icon} size={24} color={p.onSurfaceVariant} />}
            <span style={{ flex: 1, minWidth: 0, fontSize: 16, color: value ? p.onSurface : p.onSurfaceVariant, paddingTop: value && filled ? 16 : 0, ...ellipsis }}>
              {value ?? item.label}
            </span>
            <Icon name="arrow_drop_down" size={24} color={p.onSurfaceVariant} />
          </div>
          {value && hasLabel && (
            <span
              style={{
                position: "absolute",
                left: item.icon ? 52 : 16,
                top: filled ? 8 : -8,
                fontSize: 12,
                lineHeight: "16px",
                color: p.onSurfaceVariant,
                background: filled ? "transparent" : p.surface,
                padding: filled ? 0 : "0 4px",
                marginLeft: filled ? 0 : -4,
              }}
            >
              {item.label}
            </span>
          )}
          {filled && <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 1, background: p.onSurfaceVariant }} />}
          {hasSupporting && (
            <span style={{ position: "absolute", left: 16, top: "100%", marginTop: 4, fontSize: 12, color: p.onSurfaceVariant, whiteSpace: "nowrap" }}>
              {item.supporting}
            </span>
          )}
        </div>
      );
    }

    case "slider": {
      const v = Math.min(100, Math.max(0, item.value ?? 40)) / 100;
      const w = item.size ?? 280;
      const handleX = 2 + (w - 4) * v;
      return (
        <div style={{ position: "relative", height: "100%" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              width: Math.max(0, handleX - 8),
              top: 14,
              height: 16,
              borderRadius: "8px 2px 2px 8px",
              background: p.primary,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: handleX + 8,
              right: 0,
              top: 14,
              height: 16,
              borderRadius: "2px 8px 8px 2px",
              background: p.secondaryContainer,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 6,
              top: 20,
              width: 4,
              height: 4,
              borderRadius: 2,
              background: p.onSecondaryContainer,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: handleX - 2,
              top: 0,
              width: 4,
              height: 44,
              borderRadius: 2,
              background: p.primary,
            }}
          />
        </div>
      );
    }

    case "image":
      if (item.src) {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt=""
            draggable={false}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        );
      }
      return (
        <div style={{ display: "grid", placeItems: "center", height: "100%", color: p.outline }}>
          {item.icon && <Icon name={item.icon} size={Math.min(48, Math.round((item.size ?? 200) * 0.3))} />}
        </div>
      );

    case "camera":
      /* a viewfinder: the live feed is dark, with focus brackets and a shutter row. The body
         paints the dark ground itself, on a layer of its own, so a box resized in a hurry never
         shows the screen through it while the clipped box behind it catches up. */
      return (
        <div style={{ position: "relative", height: "100%", color: p.inverseOnSurface, background: p.inverseSurface, transform: "translateZ(0)" }}>
          {(["left", "right"] as const).map((side) =>
            (["top", "bottom"] as const).map((edge) => (
              <div
                key={`${side}-${edge}`}
                style={{
                  position: "absolute",
                  [side]: 24,
                  [edge]: 24,
                  width: 28,
                  height: 28,
                  opacity: 0.7,
                  [`border${side === "left" ? "Left" : "Right"}`]: `3px solid ${p.inverseOnSurface}`,
                  [`border${edge === "top" ? "Top" : "Bottom"}`]: `3px solid ${p.inverseOnSurface}`,
                  [`border${edge === "top" ? "Top" : "Bottom"}${side === "left" ? "Left" : "Right"}Radius`]: 6,
                }}
              />
            )),
          )}
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", opacity: 0.5 }}>
            {item.icon && <Icon name={item.icon} size={40} />}
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 20, display: "grid", placeItems: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 32, border: `4px solid ${p.inverseOnSurface}`, display: "grid", placeItems: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 24, background: p.inverseOnSurface }} />
            </div>
          </div>
        </div>
      );

    case "map":
      /* a stylised city: blocks on a light ground, two main roads and a river, one pin. Painted
         on its own layer, like the camera, so a quick resize never leaves it see-through. */
      return (
        <div style={{ position: "relative", height: "100%", overflow: "hidden", background: p.surfaceContainerLow, transform: "translateZ(0)" }}>
          <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }} aria-hidden>
            <rect width="400" height="300" fill={p.surfaceContainerLow} />
            <path d="M-20 210 C 80 170, 140 260, 240 220 S 380 150, 430 190 L 430 240 C 380 200, 300 260, 240 250 S 120 230, -20 250 Z" fill={p.primaryContainer} opacity={0.6} />
            {[
              [20, 20, 90, 60], [130, 20, 110, 60], [260, 20, 120, 60],
              [20, 100, 90, 70], [130, 100, 60, 70], [210, 100, 170, 70],
              [20, 190, 60, 40], [300, 200, 80, 30],
            ].map(([x, y, w, h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx={6} fill={p.surfaceContainerHighest} />
            ))}
            <path d="M0 90 H400 M110 0 V300 M250 0 V300" stroke={p.surface} strokeWidth={10} fill="none" />
            <path d="M0 90 H400 M110 0 V300 M250 0 V300" stroke={p.outlineVariant} strokeWidth={1} fill="none" opacity={0.6} />
            <g transform="translate(200 150)">
              <path d="M0 24 C -14 6, -20 -2, -20 -12 A 20 20 0 0 1 20 -12 C 20 -2, 14 6, 0 24 Z" fill={p.primary} />
              <circle cx="0" cy="-12" r="7" fill={p.onPrimary} />
            </g>
          </svg>
        </div>
      );

    case "divider":
      return (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <div style={{ width: "100%", height: 1, background: p.outlineVariant }} />
        </div>
      );

    case "carousel":
      /* the same measure a scrolling tab row is drawn at: how far the row has been carried */
      return <CarouselBody item={item} p={p} scroll={tabScroll} />;
    case "datePicker":
      return <DatePickerBody item={item} p={p} />;
    case "timePicker":
      return <TimePickerBody item={item} p={p} />;

    case "navRail": {
      const tabs = item.tabs ?? [];
      const wide = isWideRail(item);
      const expanded = !!item.railExpanded;
      const rail = railMetrics(item);
      if (wide) return (
        <div style={{ position: "relative", height: "100%" }}>
          <div className="m3-rail-geometry" style={{ position: "absolute", left: rail.headerLeft, top: RAIL_TOP, width: 48, height: 48, display: "grid", placeItems: "center", color: p.onSurfaceVariant }}>
            <Icon name={expanded ? "menu_open" : "menu"} size={24} />
          </div>
          {tabs.map((tab, i) => {
            const on = i === Math.min(item.selected ?? 0, Math.max(0, tabs.length - 1));
            return <div key={i} className="m3-rail-geometry" style={{ position: "absolute", left: rail.inset, top: rail.top + i * (rail.itemHeight + rail.gap), width: rail.width - rail.inset * 2, height: rail.itemHeight }}>
              <div className="m3-rail-geometry" style={{ position: "absolute", left: expanded ? 0 : 8, top: 0, width: expanded ? rail.width - rail.inset * 2 : 56, height: expanded ? 56 : 32, borderRadius: expanded ? 28 : 16, background: on ? p.secondaryContainer : "transparent" }} />
              <div className="m3-rail-geometry" style={{ position: "absolute", left: 0, top: 0, width: 24, height: 24, transform: `translate(${expanded ? 16 : 24}px, ${expanded ? 16 : 4}px)`, color: on ? p.onSecondaryContainer : p.onSurfaceVariant }}>
                {tab.icon && <Icon name={tab.icon} size={24} fill={on} />}
              </div>
              {(tab.label ?? "").trim() && <span className="m3-rail-geometry" style={{ position: "absolute", left: expanded ? 48 : 0, top: expanded ? 18 : 36, width: expanded ? rail.width - 88 : 72, textAlign: expanded ? "left" : "center", fontSize: expanded ? 14 : 12, lineHeight: "20px", fontWeight: on ? w(600, 700) : w(400, 500), color: on ? railSelectedLabelColor(p, expanded) : p.onSurfaceVariant, ...ellipsis }}>{tab.label}</span>}
            </div>;
          })}
        </div>
      );
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: RAIL_GAP,
            height: "100%",
            padding: `${RAIL_TOP}px 0`,
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          {tabs.map((t, i) => {
            const on = i === Math.min(item.selected ?? 0, Math.max(0, tabs.length - 1));
            const withLabel = (t.label ?? "").trim().length > 0;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  width: RAIL_W - 12,
                  height: RAIL_ITEM_H,
                  flex: "0 0 auto",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 32,
                    borderRadius: scaleR(16),
                    display: "grid",
                    placeItems: "center",
                    background: on ? p.secondaryContainer : "transparent",
                    color: on ? p.onSecondaryContainer : p.onSurfaceVariant,
                    transition: "background 160ms, color 160ms",
                  }}
                >
                  {t.icon && <Icon name={t.icon} size={22} fill={on} />}
                </div>
                {withLabel && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: on ? w(600, 700) : w(400, 500),
                      color: on ? p.onSurface : p.onSurfaceVariant,
                      maxWidth: "100%",
                      ...ellipsis,
                    }}
                  >
                    {t.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    case "bottomNav": {
      const tabs = item.tabs ?? [];
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            height: "100%",
            padding: `0 4px ${NAV_BAR_H}px`,
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          {tabs.map((t, i) => {
            const on = i === Math.min(item.selected ?? 0, Math.max(0, tabs.length - 1));
            const withLabel = (t.label ?? "").trim().length > 0;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 32,
                    borderRadius: scaleR(16),
                    display: "grid",
                    placeItems: "center",
                    background: on ? p.secondaryContainer : "transparent",
                    color: on ? p.onSecondaryContainer : p.onSurfaceVariant,
                    transition: "background 160ms, color 160ms",
                  }}
                >
                  {t.icon && <Icon name={t.icon} size={22} fill={on} />}
                </div>
                {withLabel && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: on ? w(600, 700) : w(400, 500),
                      color: on ? p.onSurface : p.onSurfaceVariant,
                      maxWidth: "100%",
                      ...ellipsis,
                    }}
                  >
                    {t.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    case "circularProgress":
      return (
        <CircularProgress
          size={item.size ?? 48}
          color={p.primary}
          trackColor={p.secondaryContainer}
          wavy={item.wavy}
          trackThickness={progressThickness(item)}
          value={item.value === undefined ? undefined : item.value / 100}
        />
      );

    case "linearProgress":
      return (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <LinearProgress
            width={item.size ?? 320}
            color={p.primary}
            trackColor={p.secondaryContainer}
            wavy={item.wavy}
            trackThickness={progressThickness(item)}
            value={item.value === undefined ? undefined : item.value / 100}
          />
        </div>
      );

    case "fabMenu":
      return <FabMenuContent item={item} p={p} />;

    case "toolbar": {
      const tabs = item.tabs ?? [];
      const vibrant = item.variant === "filled";
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 8px", height: "100%", boxSizing: "border-box" }}>
          {tabs.map((tab, i) => (
            <span
              key={i}
              style={{
                width: 48,
                height: 48,
                borderRadius: scaleR(24),
                display: "grid",
                placeItems: "center",
                color: vibrant ? p.onPrimaryContainer : p.onSurfaceVariant,
                flex: "0 0 auto",
              }}
            >
              {tab.icon && <Icon name={tab.icon} size={24} />}
            </span>
          ))}
        </div>
      );
    }

    case "tabs": {
      const tabs = item.tabs ?? [];
      const scroll = isScrollableTabs(item);
      const offset = tabScroll ?? tabScrollOffset(item, sizeOf(item, {}).w);
      return (
        <div style={{ display: "flex", alignItems: "stretch", height: "100%", position: "relative", overflow: "hidden" }}>
          {tabs.map((tab, i) => {
            const on = i === Math.min(item.selected ?? 0, Math.max(0, tabs.length - 1));
            return (
              <div
                key={i}
                style={{
                  flex: scroll ? "none" : 1,
                  width: scroll ? SCROLL_TAB_W : undefined,
                  marginLeft: scroll && i === 0 ? -offset : undefined,
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  position: "relative",
                  padding: "0 8px",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: w(500, 700),
                    color: on ? p.primary : p.onSurfaceVariant,
                    padding: "0 4px 14px",
                    maxWidth: "100%",
                    ...ellipsis,
                  }}
                >
                  {tab.label}
                </span>
                {on && (
                  <span
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: 0,
                      transform: "translateX(-50%)",
                      width: `calc(100% - 24px)`,
                      height: 3,
                      borderTopLeftRadius: 3,
                      borderTopRightRadius: 3,
                      background: p.primary,
                    }}
                  />
                )}
              </div>
            );
          })}
          <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 1, background: p.outlineVariant }} />
        </div>
      );
    }

    case "loadingIndicator": {
      const s = item.size ?? 48;
      return (
        <LoadingIndicator
          size={s}
          color={item.contained ? p.onPrimaryContainer : p.primary}
          contained={item.contained}
          containerColor={p.primaryContainer}
        />
      );
    }

    case "avatar": {
      const s = item.size ?? 48;
      const initials = (item.label || "JD").slice(0, 2).toUpperCase();
      const hasImg = item.icon2 && (item.icon2.startsWith("http") || item.icon2.startsWith("/"));
      return (
        <div
          style={{
            width: s,
            height: s,
            borderRadius: "50%",
            background: item.fill ? resolveColor(item.fill, p, "primaryContainer") : p.primaryContainer,
            color: p.onPrimaryContainer,
            display: "grid",
            placeItems: "center",
            position: "relative",
            fontSize: Math.round(s * 0.38),
            fontWeight: 700,
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
          }}
        >
          {hasImg ? (
            <img src={item.icon2} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : item.icon ? (
            <Icon name={item.icon} size={Math.round(s * 0.5)} color={p.onPrimaryContainer} />
          ) : (
            <span>{initials}</span>
          )}
          <span
            style={{
              position: "absolute",
              bottom: Math.max(1, Math.round(s * 0.05)),
              right: Math.max(1, Math.round(s * 0.05)),
              width: Math.max(8, Math.round(s * 0.22)),
              height: Math.max(8, Math.round(s * 0.22)),
              borderRadius: "50%",
              background: "#10B981",
              border: `2px solid ${p.surface}`,
            }}
          />
        </div>
      );
    }

    case "badge": {
      const isCount = (item.label || "").length > 0;
      return (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isCount ? "3px 8px" : "4px 4px",
            minWidth: 20,
            height: 24,
            borderRadius: 12,
            background: item.variant === "outlined" ? "transparent" : (p.error || "#BA1A1A"),
            color: item.variant === "outlined" ? p.error : (p.onError || "#FFFFFF"),
            border: item.variant === "outlined" ? `1.5px solid ${p.error}` : "none",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.3,
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            boxSizing: "border-box",
          }}
        >
          {item.icon && <Icon name={item.icon} size={14} style={{ marginRight: 2 }} />}
          <span>{item.label || "NEW"}</span>
        </div>
      );
    }

    case "rating": {
      const score = typeof item.value === "number" ? item.value : 4.8;
      const count = Math.round(score);
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 8px",
            background: p.surfaceContainerLow,
            borderRadius: 10,
            border: `1px solid ${p.outlineVariant}50`,
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  color: star <= count ? "#F59E0B" : p.outlineVariant,
                  fontSize: 16,
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ★
              </span>
            ))}
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: p.onSurface, marginLeft: 3 }}>
            {item.label || `${score.toFixed(1)} (120)`}
          </span>
        </div>
      );
    }

    case "audioPlayer": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "6px 14px 6px 8px",
            background: p.surfaceContainerLow,
            borderRadius: 22,
            border: `1px solid ${p.outlineVariant}60`,
            width: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: p.primary,
              color: p.onPrimary,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Icon name={item.icon || "play_arrow"} size={20} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, height: 20 }}>
            {[30, 65, 45, 90, 75, 40, 85, 100, 60, 45, 80, 55, 30, 70, 50].map((h, i) => (
              <span
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background: i < 7 ? p.primary : p.outlineVariant,
                  borderRadius: 2,
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: p.onSurfaceVariant, flexShrink: 0 }}>
            {item.supporting || "0:24 / 1:15"}
          </span>
        </div>
      );
    }

    case "videoPlayer": {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            minHeight: 140,
            borderRadius: 16,
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            color: "#ffffff",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 12,
            boxSizing: "border-box",
            boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 2 }}>
            <span style={{ fontSize: 12, fontWeight: 700, textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>
              {item.label || "Product Preview"}
            </span>
            <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 6, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
              {item.supporting || "HD 1080p"}
            </span>
          </div>
          <div style={{ alignSelf: "center", width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.4)", display: "grid", placeItems: "center", cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,0.3)" }}>
            <Icon name="play_arrow" size={28} color="#ffffff" fill />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, zIndex: 2 }}>
            <div style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.3)", position: "relative" }}>
              <div style={{ width: "35%", height: "100%", background: p.primary, borderRadius: 2 }} />
            </div>
            <span style={{ fontSize: 10, opacity: 0.9 }}>02:40</span>
          </div>
        </div>
      );
    }

    case "qrCode": {
      const s = item.size ?? 120;
      return (
        <div
          style={{
            width: s,
            height: s,
            borderRadius: 16,
            background: "#ffffff",
            padding: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            boxSizing: "border-box",
            border: `1px solid ${p.outlineVariant}60`,
          }}
        >
          <div style={{ width: "100%", height: "100%", position: "relative", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 2 }}>
            {[1,1,1,0,1,1, 1,0,1,1,0,1, 1,1,1,0,1,0, 0,1,0,1,1,1, 1,0,1,0,0,1, 1,1,1,1,1,1].map((val, idx) => (
              <div key={idx} style={{ background: val ? "#1e293b" : "transparent", borderRadius: 1.5 }} />
            ))}
          </div>
          <div style={{ position: "absolute", width: 24, height: 24, borderRadius: 6, background: p.primary, color: p.onPrimary, display: "grid", placeItems: "center" }}>
            <Icon name="qr_code_scanner" size={14} />
          </div>
        </div>
      );
    }

    case "tag": {
      return (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 10px",
            borderRadius: 16,
            background: item.variant === "filled" ? p.secondaryContainer : p.surfaceContainerLow,
            color: item.variant === "filled" ? p.onSecondaryContainer : p.onSurface,
            border: item.variant === "outlined" ? `1px solid ${p.outline}` : `1px solid ${p.outlineVariant}50`,
            fontSize: 12,
            fontWeight: 600,
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Icon name={item.icon || "tag"} size={14} />
          <span>{item.label || "#Fashion"}</span>
          <Icon name="close" size={14} style={{ opacity: 0.6, cursor: "pointer", marginLeft: 2 }} />
        </div>
      );
    }

    case "stepper": {
      return (
        <div style={{ display: "inline-flex" }} onClick={(e) => e.stopPropagation()}>
          <InteractiveQuantityStepper initialCount={typeof item.value === "number" ? item.value : 1} palette={p} />
        </div>
      );
    }

    case "priceTag": {
      return (
        <div
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: 6,
            padding: "6px 12px",
            borderRadius: 10,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}60`,
            boxSizing: "border-box",
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 800, color: p.primary }}>
            {item.label || "$89.00"}
          </span>
          {item.supporting && (
            <span style={{ fontSize: 12, fontWeight: 500, color: p.onSurfaceVariant, textDecoration: "line-through", opacity: 0.7 }}>
              {item.supporting}
            </span>
          )}
          <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 4, background: p.errorContainer || "#FFDAD6", color: p.onErrorContainer || "#93000A" }}>
            SAVE 25%
          </span>
        </div>
      );
    }

    case "couponCode": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            borderRadius: 12,
            background: p.surfaceContainerLow,
            border: `1.5px dashed ${p.primary}`,
            boxSizing: "border-box",
            width: "100%",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: p.primaryContainer, color: p.onPrimaryContainer, display: "grid", placeItems: "center" }}>
              <Icon name={item.icon || "percent"} size={18} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, color: p.onSurface, fontFamily: "monospace" }}>
                {item.label || "SAVE20"}
              </div>
              <div style={{ fontSize: 11, color: p.onSurfaceVariant }}>
                {item.supporting || "20% Discount applied"}
              </div>
            </div>
          </div>
          <button
            type="button"
            style={{
              padding: "4px 10px",
              borderRadius: 8,
              background: p.primary,
              color: p.onPrimary,
              border: "none",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            APPLY
          </button>
        </div>
      );
    }

    case "colorSwatch": {
      const colors = ["#2563EB", "#10B981", "#F59E0B", "#EF4444", "#18181B"];
      return (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 20,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {colors.map((c, i) => (
            <div
              key={i}
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: c,
                border: i === 0 ? `2px solid ${p.surface}` : "none",
                outline: i === 0 ? `2px solid ${p.primary}` : "none",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            />
          ))}
        </div>
      );
    }

    case "creditCard": {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            minHeight: 150,
            borderRadius: 16,
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)",
            color: "#ffffff",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxSizing: "border-box",
            boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
            position: "relative",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ width: 36, height: 26, borderRadius: 5, background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)", border: "1px solid #fef3c7" }} />
            <Icon name="contactless" size={24} color="rgba(255,255,255,0.8)" />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2.5, fontFamily: "monospace", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
              •••• •••• •••• 4242
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: 9, opacity: 0.7, textTransform: "uppercase" }}>Card Holder</div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>{item.label || "ALEX MORGAN"}</div>
            </div>
            <div>
              <div style={{ fontSize: 9, opacity: 0.7, textTransform: "uppercase" }}>Expires</div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>{item.supporting || "08/28"}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 900, fontStyle: "italic", letterSpacing: 1 }}>VISA</div>
          </div>
        </div>
      );
    }

    case "deliveryEstimate": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 12px",
            borderRadius: 12,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}60`,
            boxSizing: "border-box",
            width: "100%",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ width: 36, height: 36, borderRadius: 10, background: p.primaryContainer, color: p.onPrimaryContainer, display: "grid", placeItems: "center" }}>
            <Icon name={item.icon || "local_shipping"} size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
              {item.label || "Express Shipping"}
            </div>
            <div style={{ fontSize: 11, color: p.onSurfaceVariant }}>
              {item.supporting || "Arrives in 2-3 Days • Free"}
            </div>
          </div>
        </div>
      );
    }

    case "orderStatus": {
      return (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: 17,
            background: p.secondaryContainer,
            color: p.onSecondaryContainer,
            fontSize: 12,
            fontWeight: 700,
            boxSizing: "border-box",
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
          <Icon name={item.icon || "schedule"} size={16} />
          <span>{item.label || "In Transit"}</span>
        </div>
      );
    }

    case "banner": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 12,
            background: p.surfaceContainerLow,
            borderLeft: `4px solid ${p.primary}`,
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            boxSizing: "border-box",
            width: "100%",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ color: p.primary, display: "grid", placeItems: "center" }}>
            <Icon name={item.icon || "campaign"} size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
              {item.label || "Special Offer"}
            </div>
            <div style={{ fontSize: 11, color: p.onSurfaceVariant, marginTop: 1 }}>
              {item.supporting || "Get 30% off on your first order!"}
            </div>
          </div>
          <Icon name="close" size={16} style={{ color: p.onSurfaceVariant, cursor: "pointer", opacity: 0.7 }} />
        </div>
      );
    }

    case "tooltip": {
      return (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: 8,
            background: p.inverseSurface || "#313033",
            color: p.inverseOnSurface || "#F4EFF4",
            fontSize: 12,
            fontWeight: 600,
            boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
            position: "relative",
          }}
        >
          <Icon name={item.icon || "info"} size={16} />
          <span>{item.label || "Tap to view details"}</span>
        </div>
      );
    }

    case "skeleton": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: 10,
            borderRadius: 12,
            background: p.surfaceContainerLow,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: p.surfaceContainerHighest, flexShrink: 0 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ width: "70%", height: 12, borderRadius: 6, background: p.surfaceContainerHighest }} />
            <div style={{ width: "45%", height: 10, borderRadius: 5, background: p.surfaceContainerHighest, opacity: 0.7 }} />
          </div>
        </div>
      );
    }

    case "emptyState": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px dashed ${p.outlineVariant}`,
            textAlign: "center",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: p.primaryContainer, color: p.onPrimaryContainer, display: "grid", placeItems: "center", marginBottom: 8 }}>
            <Icon name={item.icon || "shopping_bag"} size={24} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface, marginBottom: 2 }}>
            {item.label || "No items yet"}
          </div>
          <div style={{ fontSize: 11, color: p.onSurfaceVariant }}>
            {item.supporting || "Your cart is currently empty"}
          </div>
        </div>
      );
    }

    case "toast": {
      return (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 20,
            background: p.inverseSurface || "#313033",
            color: p.inverseOnSurface || "#F4EFF4",
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          }}
        >
          <Icon name={item.icon || "check_circle"} size={18} color="#10B981" />
          <span>{item.label || "Added to Cart!"}</span>
        </div>
      );
    }

    case "segmentedButton": {
      const segments = item.tabs?.length ? item.tabs : [
        { label: "Day", icon: "today" },
        { label: "Week", icon: "view_week" },
        { label: "Month", icon: "calendar_month" },
      ];
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: 20,
            border: `1px solid ${p.outline}`,
            overflow: "hidden",
            width: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {segments.map((seg, i) => {
            const active = i === 0;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "8px 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  fontSize: 12,
                  fontWeight: active ? 700 : 500,
                  background: active ? p.secondaryContainer : "transparent",
                  color: active ? p.onSecondaryContainer : p.onSurface,
                  borderRight: i < segments.length - 1 ? `1px solid ${p.outlineVariant}` : "none",
                  cursor: "pointer",
                }}
              >
                {active && <Icon name="check" size={14} />}
                <span>{seg.label}</span>
              </div>
            );
          })}
        </div>
      );
    }

    case "timeline": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 10,
            borderRadius: 10,
            background: p.surfaceContainerLow,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {["Placed", "Shipped", "Delivered"].map((step, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 4, flex: idx < 2 ? 1 : "none" }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: idx <= 1 ? p.primary : p.outlineVariant, color: p.onPrimary, display: "grid", placeItems: "center", fontSize: 10, fontWeight: 700 }}>
                  {idx <= 1 ? "✓" : ""}
                </div>
                <span style={{ fontSize: 11, fontWeight: idx === 1 ? 700 : 500, color: idx <= 1 ? p.onSurface : p.onSurfaceVariant }}>
                  {step}
                </span>
                {idx < 2 && <div style={{ flex: 1, height: 2, background: idx === 0 ? p.primary : p.outlineVariant, margin: "0 6px" }} />}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: p.onSurfaceVariant }}>
            {item.supporting || "Estimated arrival: Oct 16 - In Transit"}
          </div>
        </div>
      );
    }

    case "accordion": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 12,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}60`,
            padding: "10px 14px",
            width: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
              {item.label || "Product Details & Care"}
            </span>
            <Icon name="expand_more" size={20} color={p.onSurfaceVariant} />
          </div>
          {item.supporting && (
            <div style={{ fontSize: 11, color: p.onSurfaceVariant, marginTop: 4 }}>
              {item.supporting}
            </div>
          )}
        </div>
      );
    }

    case "otpInput": {
      return (
        <InteractiveOtpBoxes label={item.label} palette={p} />
      );
    }

    case "fileUpload": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 14,
            borderRadius: 14,
            border: `1.5px dashed ${p.primary}`,
            background: p.surfaceContainerLow,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            cursor: "pointer",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: p.primaryContainer, color: p.onPrimaryContainer, display: "grid", placeItems: "center", marginBottom: 6 }}>
            <Icon name={item.icon || "cloud_upload"} size={20} />
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: p.onSurface }}>
            {item.label || "Upload Screenshot"}
          </div>
          <div style={{ fontSize: 10, color: p.onSurfaceVariant, marginTop: 2 }}>
            {item.supporting || "PNG, JPG up to 10MB"}
          </div>
        </div>
      );
    }

    case "sizeSelector": {
      const sizes = item.tabs?.length ? item.tabs.map((t) => t.label) : ["XS", "S", "M", "L", "XL"];
      const activeSize = item.label || "M";
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 6,
            padding: "4px 6px",
            borderRadius: 12,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {sizes.map((sz, idx) => {
            const active = sz === activeSize;
            return (
              <div
                key={idx}
                style={{
                  flex: 1,
                  height: 34,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: active ? 700 : 500,
                  background: active ? p.primary : "transparent",
                  color: active ? p.onPrimary : p.onSurface,
                  border: active ? "none" : `1px solid ${p.outlineVariant}60`,
                  boxShadow: active ? `0 2px 6px ${p.primary}40` : "none",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {sz}
              </div>
            );
          })}
        </div>
      );
    }

    case "countdownTimer": {
      const parts = (item.supporting || "02:45:18").split(":");
      const [hh, mm, ss] = [parts[0] || "02", parts[1] || "45", parts[2] || "18"];
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            borderRadius: 14,
            background: `linear-gradient(135deg, ${p.primaryContainer} 0%, ${p.surfaceContainerHigh} 100%)`,
            border: `1px solid ${p.primary}30`,
            width: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 16 }}>🔥</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: p.onPrimaryContainer, letterSpacing: 0.2 }}>
                {item.label || "Flash Sale Ends In"}
              </div>
              <div style={{ fontSize: 9, color: p.onSurfaceVariant, opacity: 0.8 }}>Limited quantity available</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            {[
              { val: hh, label: "H" },
              { val: mm, label: "M" },
              { val: ss, label: "S" },
            ].map((slot, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 24,
                    height: 28,
                    padding: "0 4px",
                    borderRadius: 6,
                    background: p.inverseSurface,
                    color: p.inverseOnSurface,
                    fontSize: 12,
                    fontWeight: 800,
                    fontFamily: "monospace",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }}
                >
                  {slot.val}
                </div>
                {i < 2 && <span style={{ fontSize: 11, fontWeight: 800, color: p.onSurfaceVariant }}>:</span>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "reviewSummary": {
      const score = item.label || "4.8";
      const totalText = item.supporting || "Based on 1,420 reviews";
      const bars = [
        { star: "5", pct: "82%" },
        { star: "4", pct: "12%" },
        { star: "3", pct: "4%" },
        { star: "2", pct: "1%" },
        { star: "1", pct: "1%" },
      ];
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "10px 14px",
            borderRadius: 14,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}60`,
            width: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 64 }}>
            <div style={{ fontSize: 28, fontWeight: 900, lineHeight: 1, color: p.onSurface }}>
              {score}
            </div>
            <div style={{ display: "flex", gap: 1, margin: "4px 0 2px", color: "#F59E0B" }}>
              {"★★★★★".split("").map((s, i) => (
                <span key={i} style={{ fontSize: 11 }}>{s}</span>
              ))}
            </div>
            <div style={{ fontSize: 9, color: p.onSurfaceVariant, textAlign: "center", whiteSpace: "nowrap" }}>
              {totalText}
            </div>
          </div>
          <div style={{ width: 1, height: 48, background: p.outlineVariant, opacity: 0.5 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            {bars.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9, color: p.onSurfaceVariant }}>
                <span style={{ width: 8, fontWeight: 700 }}>{b.star}</span>
                <div style={{ flex: 1, height: 4, borderRadius: 2, background: p.surfaceContainerHighest, overflow: "hidden" }}>
                  <div style={{ width: b.pct, height: "100%", background: i === 0 ? p.primary : "#F59E0B", borderRadius: 2 }} />
                </div>
                <span style={{ width: 22, textAlign: "right", fontSize: 9 }}>{b.pct}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "addressCard": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 14,
            background: p.surfaceContainerLow,
            border: `1.5px solid ${p.primary}`,
            boxShadow: `0 2px 8px ${p.primary}15`,
            width: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              border: `2px solid ${p.primary}`,
              display: "grid",
              placeItems: "center",
              marginTop: 2,
              flexShrink: 0,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.primary }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
                {item.label || "Home"}
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  padding: "1px 6px",
                  borderRadius: 6,
                  background: p.primaryContainer,
                  color: p.onPrimaryContainer,
                  letterSpacing: 0.4,
                }}
              >
                DEFAULT
              </span>
            </div>
            <div style={{ fontSize: 11, color: p.onSurfaceVariant, lineHeight: 1.35, overflow: "hidden", textOverflow: "ellipsis" }}>
              {item.supporting || "742 Evergreen Terrace, Springfield, OR 97477"}
            </div>
          </div>
          <button
            type="button"
            style={{
              border: "none",
              background: "transparent",
              color: p.onSurfaceVariant,
              cursor: "pointer",
              padding: 2,
              display: "grid",
              placeItems: "center",
            }}
          >
            <Icon name="edit" size={16} />
          </button>
        </div>
      );
    }

    case "paymentMethodSelector": {
      const methods = item.tabs?.length ? item.tabs : [
        { label: "Apple Pay", icon: "payments" },
        { label: "Visa •• 4242", icon: "credit_card" },
        { label: "PayPal", icon: "account_balance" },
      ];
      const activeIdx = 0;
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            width: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {methods.map((m, i) => {
            const active = i === activeIdx;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: "8px 6px",
                  borderRadius: 12,
                  background: active ? p.secondaryContainer : p.surfaceContainerLow,
                  border: active ? `1.5px solid ${p.primary}` : `1px solid ${p.outlineVariant}60`,
                  color: active ? p.onSecondaryContainer : p.onSurface,
                  fontSize: 11,
                  fontWeight: active ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Icon name={m.icon || "credit_card"} size={16} color={active ? p.primary : p.onSurfaceVariant} />
                <span>{m.label}</span>
              </div>
            );
          })}
        </div>
      );
    }

    case "balanceCard": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "14px 16px",
            borderRadius: 18,
            background: `linear-gradient(135deg, ${p.primary} 0%, #1E1B4B 100%)`,
            color: "#FFFFFF",
            boxShadow: `0 8px 24px rgba(0,0,0,0.25)`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              position: "absolute",
              right: -20,
              top: -20,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              pointerEvents: "none",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.85 }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.3 }}>
                {item.supporting || "Total Available Balance"}
              </span>
              <Icon name={item.icon || "visibility"} size={14} color="#FFFFFF" />
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                padding: "2px 7px",
                borderRadius: 10,
                background: "rgba(16, 185, 129, 0.25)",
                color: "#34D399",
                display: "inline-flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <span>+12.4%</span>
              <span>↑</span>
            </div>
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: -0.5, margin: "4px 0" }}>
            {item.label || "$12,485.50"}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                window.dispatchEvent(new CustomEvent("money-send-clicked"));
              }}
              style={{
                flex: 1,
                padding: "6px 10px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(4px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <Icon name="arrow_upward" size={13} color="#FFFFFF" />
              <span>Send</span>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                window.dispatchEvent(new CustomEvent("money-add-clicked"));
              }}
              style={{
                flex: 1,
                padding: "6px 10px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(4px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <Icon name="add" size={13} color="#FFFFFF" />
              <span>Add Money</span>
            </div>
          </div>
        </div>
      );
    }

    case "transactionItem": {
      const isPositive = (item.label || "").startsWith("+");
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 12px",
            borderRadius: 12,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}40`,
            width: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: p.secondaryContainer,
              color: p.onSecondaryContainer,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <Icon name={item.icon || "local_cafe"} size={20} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {item.label || "Coffee House"}
            </div>
            <div style={{ fontSize: 10, color: p.onSurfaceVariant, marginTop: 2 }}>
              {item.supporting || "Today, 10:45 AM • Dining"}
            </div>
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: isPositive ? "#10B981" : p.onSurface,
              textAlign: "right",
            }}
          >
            {isPositive ? item.label : "-$4.50"}
          </div>
        </div>
      );
    }

    case "statMetricCard": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "12px 14px",
            borderRadius: 14,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            boxShadow: `0 2px 6px rgba(0,0,0,0.04)`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: p.onSurfaceVariant }}>
              {item.supporting || "Monthly Revenue"}
            </span>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 8,
                background: p.primaryContainer,
                color: p.onPrimaryContainer,
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon name={item.icon || "insights"} size={14} />
            </div>
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: p.onSurface, margin: "4px 0" }}>
            {item.label || "$48.6K"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 6px",
                borderRadius: 6,
                background: "rgba(16, 185, 129, 0.15)",
                color: "#10B981",
              }}
            >
              +18.2% ↑
            </span>
            <span style={{ fontSize: 9, color: p.onSurfaceVariant }}>vs last month</span>
          </div>
        </div>
      );
    }

    case "miniChart": {
      const bars = [42, 65, 38, 85, 52, 94, 76];
      const days = ["M", "T", "W", "T", "F", "S", "S"];
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "10px 14px",
            borderRadius: 14,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: p.onSurface }}>
              {item.label || "Weekly Performance"}
            </span>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#10B981" }}>
              {item.supporting || "+24%"}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 6, height: 42 }}>
            {bars.map((h, i) => {
              const active = i === 5;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, height: "100%" }}>
                  <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                    <div
                      style={{
                        width: "100%",
                        height: `${h}%`,
                        borderRadius: "3px 3px 0 0",
                        background: active ? p.primary : `${p.primary}40`,
                        transition: "height 0.3s ease",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 8, fontWeight: active ? 800 : 500, color: active ? p.primary : p.onSurfaceVariant }}>
                    {days[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case "expenseProgress": {
      const pct = 72;
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 6,
            padding: "10px 14px",
            borderRadius: 14,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name={item.icon || "pie_chart"} size={16} color={p.primary} />
              <span style={{ fontSize: 12, fontWeight: 700, color: p.onSurface }}>
                {item.label || "$720 of $1,000"}
              </span>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: p.primary }}>
              {pct}% spent
            </span>
          </div>
          <div style={{ width: "100%", height: 6, borderRadius: 3, background: p.surfaceContainerHighest, overflow: "hidden" }}>
            <div
              style={{
                width: `${pct}%`,
                height: "100%",
                borderRadius: 3,
                background: `linear-gradient(90deg, ${p.primary} 0%, #EC4899 100%)`,
              }}
            />
          </div>
          <div style={{ fontSize: 9, color: p.onSurfaceVariant }}>
            {item.supporting || "$280 left for this cycle"}
          </div>
        </div>
      );
    }

    case "storyBubble": {
      const avatarSrc = item.icon2 || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150";
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            width: "100%",
            boxSizing: "border-box",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.stopPropagation();
            window.dispatchEvent(
              new CustomEvent("money-contact-selected", {
                detail: { label: item.label, icon2: avatarSrc },
              })
            );
          }}
        >
          <div
            style={{
              padding: 2.5,
              borderRadius: "50%",
              background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <div
              style={{
                padding: 2,
                borderRadius: "50%",
                background: p.surface,
                display: "grid",
                placeItems: "center",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundImage: `url(${avatarSrc})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
          </div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: p.onSurface,
              maxWidth: 68,
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.label || "Alex R."}
          </span>
        </div>
      );
    }

    case "chatBubble": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            width: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              maxWidth: "88%",
              padding: "10px 14px",
              borderRadius: "16px 16px 4px 16px",
              background: p.primary,
              color: p.onPrimary,
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4 }}>
              {item.label || "Hey! Did you check out the new design?"}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3, marginTop: 4, opacity: 0.8 }}>
              <span style={{ fontSize: 9 }}>{item.supporting || "10:42 AM"}</span>
              <span style={{ fontSize: 10, fontWeight: 900 }}>✓✓</span>
            </div>
          </div>
        </div>
      );
    }

    case "userProfileHeader": {
      const avatarSrc = item.icon2 || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150";
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ position: "relative", width: 48, height: 48, flexShrink: 0 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundImage: `url(${avatarSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#10B981",
                border: `2px solid ${p.surface}`,
              }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: p.onSurface, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.label || "Sophia Chen"}
              </span>
              <Icon name="verified" size={15} color="#3B82F6" />
            </div>
            <div style={{ fontSize: 10, color: p.onSurfaceVariant, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {item.supporting || "Senior Product Designer • 12.4k followers"}
            </div>
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              background: p.primary,
              color: p.onPrimary,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: `0 2px 6px ${p.primary}30`,
              flexShrink: 0,
            }}
          >
            Follow
          </div>
        </div>
      );
    }

    case "notificationItem": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 14,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: p.primaryContainer,
              color: p.onPrimaryContainer,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <Icon name={item.icon || "notifications"} size={20} />
            <div
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: p.primary,
              }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: p.onSurface, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {item.label || "New follower alert"}
            </div>
            <div style={{ fontSize: 10, color: p.onSurfaceVariant, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {item.supporting || "Emma Watson started following you • 5m ago"}
            </div>
          </div>
        </div>
      );
    }

    case "socialLoginGroup": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            width: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", width: "100%", gap: 8 }}>
            <div style={{ flex: 1, height: 1, background: p.outlineVariant }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: p.onSurfaceVariant, textTransform: "uppercase", letterSpacing: 0.5 }}>
              {item.label || "Or continue with"}
            </span>
            <div style={{ flex: 1, height: 1, background: p.outlineVariant }} />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { name: "Google", icon: "🌐", bg: p.surfaceContainerHigh },
              { name: "Apple", icon: "", bg: p.surfaceContainerHigh },
              { name: "Facebook", icon: "f", bg: p.surfaceContainerHigh },
            ].map((btn, i) => (
              <div
                key={i}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: btn.bg,
                  border: `1px solid ${p.outlineVariant}80`,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 15,
                  fontWeight: 800,
                  color: p.onSurface,
                  cursor: "pointer",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                }}
              >
                {btn.icon}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "passwordStrength": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            padding: "8px 12px",
            borderRadius: 10,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}40`,
            width: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="lock" size={14} color="#10B981" />
              <span style={{ fontSize: 11, fontWeight: 700, color: p.onSurface }}>
                {item.label || "Strong Password"}
              </span>
            </div>
            <span style={{ fontSize: 9, fontWeight: 800, color: "#10B981" }}>92/100</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["#10B981", "#10B981", "#10B981", "#10B981"].map((color, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: color }} />
            ))}
          </div>
          <div style={{ fontSize: 9, color: p.onSurfaceVariant }}>
            {item.supporting || "Includes uppercase, numbers & symbols"}
          </div>
        </div>
      );
    }

    case "biometricPrompt": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px",
            borderRadius: 14,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}60`,
            width: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${p.primaryContainer} 0%, ${p.secondaryContainer} 100%)`,
                color: p.primary,
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon name={item.icon || "fingerprint"} size={22} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: p.onSurface }}>
                {item.label || "Face ID / Touch ID"}
              </div>
              <div style={{ fontSize: 9, color: p.onSurfaceVariant, marginTop: 1 }}>
                {item.supporting || "Touch sensor to confirm"}
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "5px 12px",
              borderRadius: 16,
              background: p.primary,
              color: p.onPrimary,
              fontSize: 10,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Authenticate
          </div>
        </div>
      );
    }

    case "filterChips": {
      const chips = [
        { label: "Filter (2)", icon: "tune", active: true },
        { label: "On Sale ✕", active: true },
        { label: "4★ & Up", active: false },
        { label: "Express", active: false },
      ];
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            overflowX: "auto",
            width: "100%",
            padding: "2px 0",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {chips.map((c, i) => (
            <div
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "6px 12px",
                borderRadius: 20,
                background: c.active ? p.secondaryContainer : p.surfaceContainerLow,
                color: c.active ? p.onSecondaryContainer : p.onSurface,
                border: c.active ? `1px solid ${p.primary}60` : `1px solid ${p.outlineVariant}60`,
                fontSize: 11,
                fontWeight: c.active ? 700 : 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {c.icon && <Icon name={c.icon} size={14} color={c.active ? p.primary : p.onSurfaceVariant} />}
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      );
    }

    case "signaturePad": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 10,
            borderRadius: 12,
            background: p.surfaceContainerLow,
            border: `1.5px dashed ${p.outlineVariant}`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: p.onSurface }}>
              <Icon name="history_edu" size={15} color={p.primary} />
              <span>{item.label || "Sign Here"}</span>
            </div>
            <span style={{ fontSize: 9, color: p.primary, fontWeight: 700, cursor: "pointer" }}>Clear</span>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "4px 0" }}>
            <svg viewBox="0 0 160 40" style={{ width: "70%", height: 32, stroke: p.primary, fill: "none", strokeWidth: 2, strokeLinecap: "round" }}>
              <path d="M 10 28 Q 30 5, 45 20 T 80 18 T 115 15 Q 130 5, 145 28" />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, borderTop: `1px solid ${p.outlineVariant}60`, paddingTop: 4 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: p.outline }}>✕</span>
            <span style={{ fontSize: 9, color: p.onSurfaceVariant }}>{item.supporting || "Touch or draw signature"}</span>
          </div>
        </div>
      );
    }

    case "floatingActionDock": {
      const actions = [
        { icon: "home", label: "Home", active: true },
        { icon: "search", label: "Search" },
        { icon: "shopping_bag", label: "Cart", badge: "3" },
        { icon: "person", label: "Profile" },
      ];
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "6px 14px",
            borderRadius: 28,
            background: p.surfaceContainerHigh,
            boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
            border: `1px solid ${p.outlineVariant}60`,
            backdropFilter: "blur(12px)",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {actions.map((act, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                width: 38,
                height: 38,
                borderRadius: 20,
                background: act.active ? p.primary : "transparent",
                color: act.active ? p.onPrimary : p.onSurfaceVariant,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <Icon name={act.icon} size={20} />
              {act.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#EF4444",
                    color: "#FFFFFF",
                    fontSize: 8,
                    fontWeight: 800,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {act.badge}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    case "segmentedTabs": {
      const tabs = item.tabs?.length ? item.tabs.map((t) => t.label) : ["Overview", "Details", "Reviews"];
      const activeTab = item.label || tabs[0];
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: 4,
            borderRadius: 24,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {tabs.map((tab, i) => {
            const active = tab === activeTab;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "7px 10px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: active ? 700 : 500,
                  textAlign: "center",
                  background: active ? p.primary : "transparent",
                  color: active ? p.onPrimary : p.onSurface,
                  boxShadow: active ? `0 2px 6px ${p.primary}30` : "none",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {tab}
              </div>
            );
          })}
        </div>
      );
    }

    case "faqAccordion": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "10px 14px",
            borderRadius: 14,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  background: p.primaryContainer,
                  color: p.onPrimaryContainer,
                  fontSize: 11,
                  fontWeight: 900,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                Q
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: p.onSurface }}>
                {item.label || "How do returns work?"}
              </span>
            </div>
            <Icon name="expand_less" size={18} color={p.primary} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 6,
              padding: "6px 10px",
              borderRadius: 8,
              background: p.surfaceContainerHigh,
              fontSize: 10.5,
              color: p.onSurfaceVariant,
              lineHeight: 1.4,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                background: p.secondaryContainer,
                color: p.onSecondaryContainer,
                fontSize: 9,
                fontWeight: 900,
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              A
            </div>
            <span>{item.supporting || "We offer 30-day hassle-free returns. Simply initiate from your orders tab."}</span>
          </div>
        </div>
      );
    }

    case "lineChart": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
                {item.label || "Monthly Performance"}
              </div>
              <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
                {item.supporting || "+34.5% vs last month"}
              </div>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "3px 8px",
                borderRadius: 12,
                background: "#10B98120",
                color: "#10B981",
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              <Icon name="trending_up" size={13} color="#10B981" />
              <span>+34.5%</span>
            </div>
          </div>
          <div style={{ flex: 1, minHeight: 60, position: "relative" }}>
            <svg viewBox="0 0 280 80" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={p.primary} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={p.primary} stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="20" x2="280" y2="20" stroke={`${p.outlineVariant}30`} strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="280" y2="50" stroke={`${p.outlineVariant}30`} strokeDasharray="3 3" />
              <path
                d="M 0 65 Q 40 45, 70 50 T 140 25 T 210 35 T 280 10 L 280 80 L 0 80 Z"
                fill="url(#lineGrad)"
              />
              <path
                d="M 0 65 Q 40 45, 70 50 T 140 25 T 210 35 T 280 10"
                fill="none"
                stroke={p.primary}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="210" cy="35" r="3.5" fill={p.primary} stroke={p.surface} strokeWidth="2" />
              <circle cx="280" cy="10" r="4" fill={p.primary} stroke={p.surface} strokeWidth="2" />
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: p.onSurfaceVariant, opacity: 0.8 }}>
            <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
          </div>
        </div>
      );
    }

    case "barChart": {
      const bars = [
        { label: "Jan", v1: 45, v2: 60 },
        { label: "Feb", v1: 70, v2: 85 },
        { label: "Mar", v1: 55, v2: 50 },
        { label: "Apr", v1: 90, v2: 110 },
        { label: "May", v1: 65, v2: 95 },
        { label: "Jun", v1: 80, v2: 105 },
      ];
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
                {item.label || "Revenue by Category"}
              </div>
              <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
                {item.supporting || "This week vs Last week"}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: p.primary }} />
                <span style={{ color: p.onSurfaceVariant }}>Online</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: p.tertiary }} />
                <span style={{ color: p.onSurfaceVariant }}>Store</span>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, minHeight: 70, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 6, paddingTop: 10 }}>
            {bars.map((b, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, width: "100%", justifyContent: "center", height: "80%" }}>
                  <div style={{ width: 6, height: `${(b.v1 / 120) * 100}%`, borderRadius: "3px 3px 0 0", background: p.primary }} />
                  <div style={{ width: 6, height: `${(b.v2 / 120) * 100}%`, borderRadius: "3px 3px 0 0", background: p.tertiary }} />
                </div>
                <span style={{ fontSize: 9, color: p.onSurfaceVariant }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "areaChart": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
                {item.label || "Traffic Volume"}
              </div>
              <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
                {item.supporting || "Total visits: 128.4K"}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: p.primary }}>128.4K</div>
              <div style={{ fontSize: 9, color: "#10B981", fontWeight: 700 }}>+18.2% ↑</div>
            </div>
          </div>
          <div style={{ flex: 1, minHeight: 65, position: "relative" }}>
            <svg viewBox="0 0 280 75" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={p.tertiary} stopOpacity="0.45" />
                  <stop offset="100%" stopColor={p.tertiary} stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 55 C 40 60, 60 30, 100 35 C 140 40, 180 15, 220 20 C 250 24, 265 10, 280 8 L 280 75 L 0 75 Z"
                fill="url(#areaGrad)"
              />
              <path
                d="M 0 55 C 40 60, 60 30, 100 35 C 140 40, 180 15, 220 20 C 250 24, 265 10, 280 8"
                fill="none"
                stroke={p.tertiary}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="280" cy="8" r="4" fill={p.tertiary} stroke={p.surface} strokeWidth="2" />
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: p.onSurfaceVariant }}>
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      );
    }

    case "donutChart": {
      const radius = 38;
      const circumference = 2 * Math.PI * radius;
      const offset1 = circumference * (1 - 0.68);
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ position: "relative", width: 90, height: 90, flexShrink: 0 }}>
            <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="45" cy="45" r={radius} stroke={`${p.outlineVariant}30`} strokeWidth="9" fill="none" />
              <circle
                cx="45"
                cy="45"
                r={radius}
                stroke={p.primary}
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={offset1}
                strokeLinecap="round"
                fill="none"
              />
              <circle
                cx="45"
                cy="45"
                r={radius}
                stroke={p.tertiary}
                strokeWidth="9"
                strokeDasharray={`${circumference * 0.2} ${circumference}`}
                strokeDashoffset={-circumference * 0.7}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 800, color: p.onSurface, lineHeight: 1 }}>68%</span>
              <span style={{ fontSize: 9, color: p.onSurfaceVariant, marginTop: 2 }}>Done</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
              {item.label || "Task Breakdown"}
            </div>
            <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
              {item.supporting || "Completed 68%"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4, fontSize: 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.primary }} />
                  <span style={{ color: p.onSurfaceVariant }}>Finished</span>
                </span>
                <span style={{ fontWeight: 700, color: p.onSurface }}>68%</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.tertiary }} />
                  <span style={{ color: p.onSurfaceVariant }}>Ongoing</span>
                </span>
                <span style={{ fontWeight: 700, color: p.onSurface }}>20%</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "pieChart": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ position: "relative", width: 84, height: 84, flexShrink: 0 }}>
            <svg width="84" height="84" viewBox="-1 -1 2 2" style={{ transform: "rotate(-90deg)" }}>
              <path d="M 0 0 L 1 0 A 1 1 0 0 1 -0.95 0.31 Z" fill={p.primary} />
              <path d="M 0 0 L -0.95 0.31 A 1 1 0 0 1 0.59 -0.81 Z" fill={p.tertiary} />
              <path d="M 0 0 L 0.59 -0.81 A 1 1 0 0 1 1 0 Z" fill="#F59E0B" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
              {item.label || "Portfolio Allocation"}
            </div>
            <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
              {item.supporting || "Equities 55% • Bonds 30%"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 4, fontSize: 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.primary }} />
                  <span style={{ color: p.onSurfaceVariant }}>Equities</span>
                </span>
                <span style={{ fontWeight: 700, color: p.onSurface }}>55%</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.tertiary }} />
                  <span style={{ color: p.onSurfaceVariant }}>Bonds</span>
                </span>
                <span style={{ fontWeight: 700, color: p.onSurface }}>30%</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B" }} />
                  <span style={{ color: p.onSurfaceVariant }}>Cash</span>
                </span>
                <span style={{ fontWeight: 700, color: p.onSurface }}>15%</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "candlestickChart": {
      const candles = [
        { open: 40, close: 25, high: 20, low: 48, bull: true },
        { open: 25, close: 38, high: 18, low: 42, bull: false },
        { open: 38, close: 30, high: 26, low: 44, bull: true },
        { open: 30, close: 18, high: 12, low: 35, bull: true },
        { open: 18, close: 26, high: 14, low: 32, bull: false },
        { open: 26, close: 14, high: 10, low: 30, bull: true },
        { open: 14, close: 12, high: 8, low: 20, bull: true },
      ];
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
                {item.label || "BTC/USDT Trading"}
              </div>
              <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
                {item.supporting || "$64,280.00 • +3.8%"}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#10B981" }}>$64,280.00</span>
              <span style={{ fontSize: 9, color: "#10B981", display: "block", fontWeight: 700 }}>+3.8% ▲</span>
            </div>
          </div>
          <div style={{ flex: 1, minHeight: 60, position: "relative" }}>
            <svg viewBox="0 0 280 60" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
              <line x1="0" y1="20" x2="280" y2="20" stroke={`${p.outlineVariant}25`} strokeDasharray="2 2" />
              <line x1="0" y1="40" x2="280" y2="40" stroke={`${p.outlineVariant}25`} strokeDasharray="2 2" />
              {candles.map((c, i) => {
                const x = 20 + i * 38;
                const col = c.bull ? "#10B981" : "#EF4444";
                const yTop = Math.min(c.open, c.close);
                const hBody = Math.max(Math.abs(c.close - c.open), 3);
                return (
                  <g key={i}>
                    <line x1={x + 5} y1={c.high} x2={x + 5} y2={c.low} stroke={col} strokeWidth="1.5" />
                    <rect x={x} y={yTop} width="10" height={hBody} rx="1.5" fill={col} />
                  </g>
                );
              })}
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: p.onSurfaceVariant, opacity: 0.8 }}>
            <span>09:00</span><span>11:00</span><span>13:00</span><span>15:00</span><span>17:00</span><span>19:00</span>
          </div>
        </div>
      );
    }

    case "radarChart": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ position: "relative", width: 90, height: 90, flexShrink: 0 }}>
            <svg width="90" height="90" viewBox="0 0 100 100">
              <polygon points="50,10 88,38 73,85 27,85 12,38" fill="none" stroke={`${p.outlineVariant}40`} strokeWidth="1" />
              <polygon points="50,30 69,44 61,67 39,67 31,44" fill="none" stroke={`${p.outlineVariant}30`} strokeWidth="1" />
              <line x1="50" y1="50" x2="50" y2="10" stroke={`${p.outlineVariant}25`} strokeWidth="1" />
              <line x1="50" y1="50" x2="88" y2="38" stroke={`${p.outlineVariant}25`} strokeWidth="1" />
              <line x1="50" y1="50" x2="73" y2="85" stroke={`${p.outlineVariant}25`} strokeWidth="1" />
              <line x1="50" y1="50" x2="27" y2="85" stroke={`${p.outlineVariant}25`} strokeWidth="1" />
              <line x1="50" y1="50" x2="12" y2="38" stroke={`${p.outlineVariant}25`} strokeWidth="1" />
              <polygon points="50,16 82,42 66,78 35,74 20,40" fill={p.primary} fillOpacity="0.35" stroke={p.primary} strokeWidth="2" />
              <circle cx="50" cy="16" r="2.5" fill={p.primary} />
              <circle cx="82" cy="42" r="2.5" fill={p.primary} />
              <circle cx="66" cy="78" r="2.5" fill={p.primary} />
              <circle cx="35" cy="74" r="2.5" fill={p.primary} />
              <circle cx="20" cy="40" r="2.5" fill={p.primary} />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
              {item.label || "Attribute Assessment"}
            </div>
            <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
              {item.supporting || "Overall score: 92/100"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: p.primary }}>92</span>
              <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 8, background: p.primaryContainer, color: p.onPrimaryContainer, fontWeight: 700 }}>
                Top Tier A+
              </span>
            </div>
          </div>
        </div>
      );
    }

    case "gaugeChart": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ position: "relative", width: 90, height: 60, flexShrink: 0, overflow: "hidden" }}>
            <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: "rotate(-180deg)" }}>
              <circle cx="45" cy="45" r="35" stroke={`${p.outlineVariant}30`} strokeWidth="8" fill="none" strokeDasharray="110 220" />
              <circle
                cx="45"
                cy="45"
                r="35"
                stroke={p.primary}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${110 * 0.78} 220`}
                strokeLinecap="round"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                bottom: 2,
                left: 0,
                right: 0,
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 800, color: p.onSurface }}>78%</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
              {item.label || "Target Achievement"}
            </div>
            <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
              {item.supporting || "Score: 78% on track"}
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
              <span style={{ fontSize: 10, fontWeight: 600, color: "#10B981" }}>Ahead of schedule</span>
            </div>
          </div>
        </div>
      );
    }

    case "funnelChart": {
      const stages = [
        { label: "Visits", count: "100K", pct: 100, color: p.primary },
        { label: "Clicks", count: "42K", pct: 68, color: p.secondary },
        { label: "Carts", count: "18K", pct: 45, color: p.tertiary },
        { label: "Orders", count: "6.2K", pct: 28, color: "#10B981" },
      ];
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
                {item.label || "Sales Funnel"}
              </div>
              <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
                {item.supporting || "Overall conversion: 14.8%"}
              </div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#10B981", background: "#10B98120", padding: "2px 8px", borderRadius: 8 }}>
              14.8% CR
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 4 }}>
            {stages.map((st, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10 }}>
                <span style={{ width: 44, color: p.onSurfaceVariant, fontSize: 10 }}>{st.label}</span>
                <div style={{ flex: 1, background: `${p.outlineVariant}30`, height: 14, borderRadius: 7, overflow: "hidden" }}>
                  <div style={{ width: `${st.pct}%`, height: "100%", background: st.color, borderRadius: 7 }} />
                </div>
                <span style={{ width: 34, textAlign: "right", fontWeight: 700, color: p.onSurface }}>{st.count}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "heatMapGrid": {
      const cells = [
        [0, 1, 2, 0, 1, 3, 2, 1, 0, 2, 3, 2],
        [1, 2, 0, 1, 2, 2, 3, 1, 2, 3, 1, 3],
        [0, 0, 1, 3, 2, 1, 0, 2, 1, 2, 3, 1],
        [2, 3, 1, 2, 0, 3, 2, 1, 3, 1, 2, 2],
        [1, 1, 2, 0, 3, 2, 1, 0, 2, 3, 1, 0],
        [3, 2, 1, 3, 1, 2, 3, 2, 1, 2, 0, 2],
        [1, 0, 2, 1, 2, 0, 1, 3, 2, 1, 3, 1],
      ];
      const levelColors = [
        `${p.outlineVariant}25`,
        `${p.primary}50`,
        `${p.primary}90`,
        p.primary,
      ];
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
                {item.label || "Contribution Activity"}
              </div>
              <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
                {item.supporting || "432 actions this year"}
              </div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: p.primary }}>432 total</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 4 }}>
            {cells.map((row, rIdx) => (
              <div key={rIdx} style={{ display: "flex", gap: 3, justifyContent: "space-between" }}>
                {row.map((lvl, cIdx) => (
                  <div
                    key={cIdx}
                    style={{
                      flex: 1,
                      aspectRatio: "1",
                      borderRadius: 2.5,
                      background: levelColors[lvl],
                      maxWidth: 16,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, fontSize: 9, color: p.onSurfaceVariant, marginTop: 2 }}>
            <span>Less</span>
            {levelColors.map((c, i) => (
              <span key={i} style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
            ))}
            <span>More</span>
          </div>
        </div>
      );
    }

    case "scatterPlot": {
      const points = [
        { x: 30, y: 55, r: 4, c: p.primary },
        { x: 50, y: 40, r: 5, c: p.secondary },
        { x: 75, y: 30, r: 6, c: p.primary },
        { x: 110, y: 35, r: 4, c: p.tertiary },
        { x: 140, y: 22, r: 7, c: p.primary },
        { x: 180, y: 18, r: 5, c: p.primary },
        { x: 210, y: 15, r: 6, c: "#10B981" },
        { x: 245, y: 10, r: 8, c: p.primary },
      ];
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
                {item.label || "Correlation Matrix"}
              </div>
              <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
                {item.supporting || "Price vs Satisfaction"}
              </div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: p.primary, background: p.primaryContainer, padding: "2px 8px", borderRadius: 8 }}>
              R² = 0.94
            </span>
          </div>
          <div style={{ flex: 1, minHeight: 65, position: "relative" }}>
            <svg viewBox="0 0 280 70" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
              <line x1="15" y1="5" x2="15" y2="65" stroke={`${p.outlineVariant}40`} strokeWidth="1" />
              <line x1="15" y1="65" x2="275" y2="65" stroke={`${p.outlineVariant}40`} strokeWidth="1" />
              <line x1="15" y1="35" x2="275" y2="35" stroke={`${p.outlineVariant}20`} strokeDasharray="3 3" />
              <line x1="25" y1="60" x2="260" y2="12" stroke={p.tertiary} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              {points.map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r={pt.r} fill={pt.c} fillOpacity="0.8" stroke={p.surface} strokeWidth="1.5" />
              ))}
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: p.onSurfaceVariant }}>
            <span>Low Price</span>
            <span>High Satisfaction</span>
          </div>
        </div>
      );
    }

    case "progressRingGroup": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ position: "relative", width: 84, height: 84, flexShrink: 0 }}>
            <svg width="84" height="84" viewBox="0 0 84 84" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="42" cy="42" r="34" stroke="#EF444430" strokeWidth="6" fill="none" />
              <circle cx="42" cy="42" r="34" stroke="#EF4444" strokeWidth="6" fill="none" strokeDasharray={2 * Math.PI * 34} strokeDashoffset={2 * Math.PI * 34 * 0.25} strokeLinecap="round" />
              <circle cx="42" cy="42" r="25" stroke="#10B98130" strokeWidth="6" fill="none" />
              <circle cx="42" cy="42" r="25" stroke="#10B981" strokeWidth="6" fill="none" strokeDasharray={2 * Math.PI * 25} strokeDashoffset={2 * Math.PI * 25 * 0.4} strokeLinecap="round" />
              <circle cx="42" cy="42" r="16" stroke="#06B6D430" strokeWidth="6" fill="none" />
              <circle cx="42" cy="42" r="16" stroke="#06B6D4" strokeWidth="6" fill="none" strokeDasharray={2 * Math.PI * 16} strokeDashoffset={2 * Math.PI * 16 * 0.15} strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
              {item.label || "Daily Activity"}
            </div>
            <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
              {item.supporting || "Move • Exercise • Stand"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 2, fontSize: 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: "#EF4444", fontWeight: 700 }}>● Move</span>
                <span style={{ color: p.onSurface, fontWeight: 700 }}>520 / 600 kcal</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: "#10B981", fontWeight: 700 }}>● Exercise</span>
                <span style={{ color: p.onSurface, fontWeight: 700 }}>38 / 45 min</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: "#06B6D4", fontWeight: 700 }}>● Stand</span>
                <span style={{ color: p.onSurface, fontWeight: 700 }}>11 / 12 hrs</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "cryptoTicker": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
                display: "grid",
                placeItems: "center",
                color: "#FFFFFF",
                fontWeight: 900,
                fontSize: 16,
              }}
            >
              ₿
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
                {item.label || "Bitcoin (BTC)"}
              </div>
              <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
                {item.supporting || "$64,280.00 • +5.4%"}
              </div>
            </div>
          </div>
          <div style={{ width: 60, height: 28 }}>
            <svg viewBox="0 0 60 28" style={{ width: "100%", height: "100%" }}>
              <path d="M 0 20 Q 15 25, 30 14 T 60 4" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: p.onSurface }}>$64,280.00</div>
            <div style={{ fontSize: 10, color: "#10B981", fontWeight: 700 }}>+5.4% ▲</div>
          </div>
        </div>
      );
    }

    case "loanCalculator": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: p.onSurfaceVariant }}>
              {item.label || "Estimated Payment"}
            </div>
            <Icon name="calculate" size={18} color={p.primary} />
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: p.primary }}>$485</span>
            <span style={{ fontSize: 12, color: p.onSurfaceVariant }}>/ month</span>
          </div>
          <div style={{ width: "100%", height: 6, borderRadius: 3, background: `${p.outlineVariant}40`, overflow: "hidden" }}>
            <div style={{ width: "65%", height: "100%", background: p.primary, borderRadius: 3 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: p.onSurfaceVariant, marginTop: 2 }}>
            <span>$25,000 Total</span>
            <span>3.2% APR</span>
            <span>60 Mos</span>
          </div>
        </div>
      );
    }

    case "billReminderCard": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: p.tertiaryContainer,
                color: p.onTertiaryContainer,
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon name="receipt_long" size={20} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: p.onSurface }}>
                {item.label || "Cloud Services Due"}
              </div>
              <div style={{ fontSize: 10, color: "#EF4444", fontWeight: 600 }}>
                {item.supporting || "Due Oct 24 • $89.50"}
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              background: p.primary,
              color: p.onPrimary,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: `0 2px 8px ${p.primary}30`,
            }}
          >
            Pay Now
          </div>
        </div>
      );
    }

    case "cardStackCarousel": {
      return (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            minHeight: 90,
            boxSizing: "border-box",
            perspective: 600,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 12,
              right: 12,
              height: 75,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${p.tertiary}, ${p.secondary})`,
              opacity: 0.6,
              transform: "translateY(0) scale(0.92)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 0,
              right: 0,
              height: 80,
              borderRadius: 14,
              background: "linear-gradient(135deg, #1E1B4B, #312E81)",
              color: "#FFFFFF",
              padding: "10px 14px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>PLATINUM</span>
              <Icon name="contactless" size={16} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 13, fontFamily: "monospace", letterSpacing: 2 }}>•••• 8821</span>
              <span style={{ fontSize: 9, opacity: 0.8 }}>09/27</span>
            </div>
          </div>
        </div>
      );
    }

    case "priceBreakdown": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: p.onSurface, marginBottom: 2 }}>
            {item.label || "Order Summary"}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: p.onSurfaceVariant }}>
            <span>Subtotal</span><span>$120.00</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#10B981" }}>
            <span>Discount (SAVE20)</span><span>-$20.00</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: p.onSurfaceVariant }}>
            <span>Estimated Tax & Delivery</span><span>+$9.60</span>
          </div>
          <div style={{ height: 1, background: `${p.outlineVariant}40`, margin: "4px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 800, color: p.onSurface }}>
            <span>Total Amount</span>
            <span style={{ color: p.primary }}>$109.60</span>
          </div>
        </div>
      );
    }

    case "freeShippingBar": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            padding: "10px 14px",
            borderRadius: 14,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="local_shipping" size={16} color={p.primary} />
              <span style={{ fontSize: 11, fontWeight: 700, color: p.onSurface }}>
                {item.label || "Add $15.00 for FREE Shipping!"}
              </span>
            </div>
            <span style={{ fontSize: 10, fontWeight: 800, color: p.primary }}>75%</span>
          </div>
          <div style={{ width: "100%", height: 6, borderRadius: 3, background: `${p.outlineVariant}30`, overflow: "hidden" }}>
            <div style={{ width: "75%", height: "100%", background: `linear-gradient(90deg, ${p.primary}, #10B981)`, borderRadius: 3 }} />
          </div>
        </div>
      );
    }

    case "productComparisonTable": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${p.outlineVariant}30`, paddingBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: p.onSurface }}>Feature</span>
            <div style={{ display: "flex", gap: 24, fontSize: 11, fontWeight: 700 }}>
              <span style={{ color: p.onSurfaceVariant }}>Basic</span>
              <span style={{ color: p.primary }}>Pro ⭐</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: p.onSurfaceVariant }}>
            <span>Cloud Sync</span>
            <div style={{ display: "flex", gap: 36 }}><span style={{ color: "#10B981" }}>✓</span><span style={{ color: "#10B981" }}>✓</span></div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: p.onSurfaceVariant }}>
            <span>Unlimited Exports</span>
            <div style={{ display: "flex", gap: 36 }}><span style={{ opacity: 0.4 }}>—</span><span style={{ color: "#10B981" }}>✓</span></div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: p.onSurfaceVariant }}>
            <span>24/7 Priority Support</span>
            <div style={{ display: "flex", gap: 36 }}><span style={{ opacity: 0.4 }}>—</span><span style={{ color: "#10B981" }}>✓</span></div>
          </div>
        </div>
      );
    }

    case "loyaltyPointsBadge": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "12px 14px",
            borderRadius: 16,
            background: `linear-gradient(135deg, ${p.surfaceContainerLow}, ${p.surfaceContainerHigh})`,
            border: `1px solid ${p.outlineVariant}60`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
                color: "#FFFFFF",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon name="workspace_premium" size={22} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: p.onSurface }}>
                {item.label || "Gold Member"}
              </div>
              <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
                {item.supporting || "2,450 pts • 550 to Platinum"}
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "4px 10px",
              borderRadius: 12,
              background: "#F59E0B20",
              color: "#D97706",
              fontSize: 11,
              fontWeight: 800,
            }}
          >
            2,450 P
          </div>
        </div>
      );
    }

    case "commentThread": {
      const avatarSrc = item.icon2 || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100";
      return (
        <div
          style={{
            display: "flex",
            gap: 10,
            padding: "10px 14px",
            borderRadius: 14,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundImage: `url(${avatarSrc})`,
              backgroundSize: "cover",
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: p.onSurface }}>
                {item.label || "Emma Watson"}
              </span>
              <span style={{ fontSize: 9, color: p.onSurfaceVariant }}>2h ago</span>
            </div>
            <div style={{ fontSize: 11, color: p.onSurfaceVariant, marginTop: 2, lineHeight: 1.35 }}>
              {item.supporting || "The UI design looks stunning! Love this new update."}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4, fontSize: 10, color: p.onSurfaceVariant }}>
              <span style={{ display: "flex", alignItems: "center", gap: 3, cursor: "pointer" }}>
                <Icon name="favorite" size={13} color="#EF4444" /> 42
              </span>
              <span style={{ cursor: "pointer", fontWeight: 600 }}>Reply</span>
            </div>
          </div>
        </div>
      );
    }

    case "pollCard": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: p.onSurface }}>
            {item.label || "Favorite Color Scheme?"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ position: "relative", height: 28, borderRadius: 8, background: `${p.outlineVariant}30`, overflow: "hidden", display: "flex", alignItems: "center", padding: "0 10px", justifyContent: "space-between", fontSize: 11 }}>
              <div style={{ position: "absolute", inset: 0, width: "54%", background: `${p.primary}35`, borderRadius: 8 }} />
              <span style={{ position: "relative", fontWeight: 600, color: p.onSurface }}>Midnight Neon</span>
              <span style={{ position: "relative", fontWeight: 800, color: p.primary }}>54%</span>
            </div>
            <div style={{ position: "relative", height: 28, borderRadius: 8, background: `${p.outlineVariant}30`, overflow: "hidden", display: "flex", alignItems: "center", padding: "0 10px", justifyContent: "space-between", fontSize: 11 }}>
              <div style={{ position: "absolute", inset: 0, width: "46%", background: `${p.tertiary}35`, borderRadius: 8 }} />
              <span style={{ position: "relative", fontWeight: 600, color: p.onSurface }}>Forest Emerald</span>
              <span style={{ position: "relative", fontWeight: 800, color: p.tertiary }}>46%</span>
            </div>
          </div>
          <div style={{ fontSize: 9, color: p.onSurfaceVariant, textAlign: "right" }}>1,248 votes • Final results</div>
        </div>
      );
    }

    case "audioWaveMessage": {
      const bars = [8, 14, 22, 12, 18, 24, 16, 20, 10, 15, 22, 14, 8, 18, 12, 6];
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 12px",
            borderRadius: 20,
            background: p.primary,
            color: p.onPrimary,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: p.onPrimary,
              color: p.primary,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Icon name="play_arrow" size={18} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 3, flex: 1, height: 24 }}>
            {bars.map((h, i) => (
              <span
                key={i}
                style={{
                  flex: 1,
                  height: h,
                  borderRadius: 2,
                  background: i < 8 ? p.onPrimary : `${p.onPrimary}50`,
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, flexShrink: 0 }}>0:38</span>
        </div>
      );
    }

    case "userBadgeGroup": {
      const avatars = [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
      ];
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 12px",
            borderRadius: 14,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {avatars.map((url, i) => (
              <div
                key={i}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  backgroundImage: `url(${url})`,
                  backgroundSize: "cover",
                  border: `2px solid ${p.surface}`,
                  marginLeft: i === 0 ? 0 : -8,
                  zIndex: 3 - i,
                }}
              />
            ))}
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: p.secondaryContainer,
                color: p.onSecondaryContainer,
                fontSize: 9,
                fontWeight: 800,
                display: "grid",
                placeItems: "center",
                border: `2px solid ${p.surface}`,
                marginLeft: -8,
                zIndex: 0,
              }}
            >
              +18
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: p.onSurface, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {item.label || "Active Attendees"}
            </div>
            <div style={{ fontSize: 9, color: p.onSurfaceVariant }}>
              {item.supporting || "+18 others joined"}
            </div>
          </div>
        </div>
      );
    }

    case "liveStreamBadge": {
      return (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 20,
            background: "#EF444420",
            border: "1px solid #EF444460",
            color: "#EF4444",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444", boxShadow: "0 0 8px #EF4444" }} />
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5 }}>LIVE</span>
          <span style={{ width: 1, height: 10, background: "#EF444440" }} />
          <span style={{ fontSize: 10, fontWeight: 600, color: p.onSurface }}>
            {item.supporting || "1.4k watching"}
          </span>
        </div>
      );
    }

    case "podcastEpisodeTile": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${p.primary}, ${p.tertiary})`,
              display: "grid",
              placeItems: "center",
              color: "#FFFFFF",
              flexShrink: 0,
            }}
          >
            <Icon name="podcasts" size={24} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: p.onSurface, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {item.label || "EP.42 Design Trends 2026"}
            </div>
            <div style={{ fontSize: 10, color: p.onSurfaceVariant, marginTop: 2 }}>
              {item.supporting || "34 mins • Design Studio"}
            </div>
          </div>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: p.primaryContainer,
              color: p.onPrimaryContainer,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Icon name="play_arrow" size={18} />
          </div>
        </div>
      );
    }

    case "waveformPlayer": {
      const bars = [6, 12, 18, 26, 14, 20, 28, 16, 22, 12, 18, 24, 16, 10, 20, 14, 8];
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: p.onSurface }}>
                {item.label || "Neon City - Synthwave"}
              </div>
              <div style={{ fontSize: 9, color: p.onSurfaceVariant }}>
                {item.supporting || "02:14 / 04:30"}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="skip_previous" size={18} color={p.onSurfaceVariant} />
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: p.primary, color: p.onPrimary, display: "grid", placeItems: "center", cursor: "pointer" }}>
                <Icon name="play_arrow" size={18} />
              </div>
              <Icon name="skip_next" size={18} color={p.onSurfaceVariant} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 3, height: 26 }}>
            {bars.map((h, i) => (
              <span
                key={i}
                style={{
                  flex: 1,
                  height: h,
                  borderRadius: 2,
                  background: i < 9 ? p.primary : `${p.outlineVariant}50`,
                }}
              />
            ))}
          </div>
        </div>
      );
    }

    case "verificationBadge": {
      return (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            borderRadius: 12,
            background: "#10B98115",
            border: "1px solid #10B98140",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#10B981", color: "#FFFFFF", display: "grid", placeItems: "center" }}>
            <Icon name="verified" size={14} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#10B981" }}>
              {item.label || "Identity Verified"}
            </div>
            <div style={{ fontSize: 9, color: p.onSurfaceVariant }}>
              {item.supporting || "2FA authentication active"}
            </div>
          </div>
        </div>
      );
    }

    case "colorPalettePicker": {
      const swatches = ["#6366F1", "#EC4899", "#F59E0B", "#10B981", "#3B82F6"];
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 14,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {swatches.map((col, i) => (
              <span
                key={i}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: col,
                  border: i === 0 ? `2px solid ${p.onSurface}` : "2px solid transparent",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
          <div
            style={{
              padding: "4px 8px",
              borderRadius: 8,
              background: p.surfaceContainerHigh,
              fontSize: 10,
              fontFamily: "monospace",
              color: p.onSurface,
              fontWeight: 700,
            }}
          >
            #6366F1
          </div>
        </div>
      );
    }

    case "starRatingInput": {
      return (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            borderRadius: 12,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Icon key={s} name="star" size={20} color="#F59E0B" style={{ cursor: "pointer" }} />
            ))}
          </div>
          <span style={{ fontSize: 12, fontWeight: 800, color: p.onSurface }}>
            {item.label || "5.0 Excellent"}
          </span>
        </div>
      );
    }

    case "stickyBottomBar": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "12px 16px",
            borderRadius: 16,
            background: p.surfaceContainerHigh,
            border: `1px solid ${p.outlineVariant}60`,
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>Total Price</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: p.primary }}>
              {item.label || "$109.60"}
            </div>
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 20px",
              borderRadius: 24,
              background: p.primary,
              color: p.onPrimary,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: `0 4px 12px ${p.primary}40`,
            }}
          >
            <span>{item.supporting || "Proceed to Checkout"}</span>
            <Icon name="arrow_forward" size={16} />
          </div>
        </div>
      );
    }

    case "notificationBannerSticky": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            padding: "10px 14px",
            borderRadius: 14,
            background: p.primaryContainer,
            color: p.onPrimaryContainer,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
            <Icon name="campaign" size={20} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.label || "System Updated"}
              </div>
              <div style={{ fontSize: 9.5, opacity: 0.85, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.supporting || "New features are now live"}
              </div>
            </div>
          </div>
          <Icon name="close" size={16} style={{ cursor: "pointer", opacity: 0.7 }} />
        </div>
      );
    }

    case "segmentedSplitView": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "10px 12px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", borderRadius: 10, background: p.surfaceContainerHigh, padding: 3, gap: 4 }}>
            <div style={{ flex: 1, textAlign: "center", fontSize: 10, fontWeight: 700, padding: "4px 8px", borderRadius: 8, background: p.primary, color: p.onPrimary }}>
              Option A
            </div>
            <div style={{ flex: 1, textAlign: "center", fontSize: 10, fontWeight: 500, padding: "4px 8px", borderRadius: 8, color: p.onSurfaceVariant }}>
              Option B
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flex: 1 }}>
            <div style={{ flex: 1, borderRadius: 10, background: p.surfaceContainerHigh, padding: 8, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 4 }}>
              <Icon name="check_circle" size={18} color="#10B981" />
              <span style={{ fontSize: 10, fontWeight: 700, color: p.onSurface }}>Active View</span>
            </div>
            <div style={{ flex: 1, borderRadius: 10, background: `${p.outlineVariant}20`, padding: 8, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 4, opacity: 0.7 }}>
              <Icon name="tune" size={18} color={p.onSurfaceVariant} />
              <span style={{ fontSize: 10, color: p.onSurfaceVariant }}>Preview</span>
            </div>
          </div>
        </div>
      );
    }

    /* =========================================================================
       AI & Assistants (ai)
       ========================================================================= */
    case "aiPromptInput": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 12px",
            borderRadius: 24,
            background: p.surfaceContainerHigh,
            border: `1.5px solid ${p.outlineVariant}60`,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 8px",
              borderRadius: 12,
              background: p.primaryContainer,
              color: p.onPrimaryContainer,
              fontSize: 11,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            <Icon name="auto_awesome" size={14} color={p.onPrimaryContainer} />
            <span>GPT-4o</span>
          </div>
          <div
            style={{
              flex: 1,
              fontSize: 12.5,
              color: p.onSurfaceVariant,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.label || "Ask AI anything, write or summarize..."}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                color: p.onSurfaceVariant,
                cursor: "pointer",
              }}
            >
              <Icon name="mic" size={18} color={p.onSurfaceVariant} />
            </div>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: p.primary,
                display: "grid",
                placeItems: "center",
                color: p.onPrimary,
                cursor: "pointer",
                boxShadow: `0 2px 8px ${p.primary}40`,
              }}
            >
              <Icon name="arrow_upward" size={16} color={p.onPrimary} />
            </div>
          </div>
        </div>
      );
    }

    case "aiMessageBubble": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "12px 14px",
            borderRadius: 18,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 8,
                  background: `linear-gradient(135deg, ${p.primary}, ${p.tertiaryContainer || "#8B5CF6"})`,
                  display: "grid",
                  placeItems: "center",
                  color: "#FFFFFF",
                }}
              >
                <Icon name="smart_toy" size={15} color="#FFFFFF" />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: p.onSurface }}>
                {item.label || "AI Assistant"}
              </span>
              <span style={{ fontSize: 10, color: p.onSurfaceVariant, opacity: 0.8 }}>Just now</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 10,
                color: p.primary,
                background: p.surfaceContainerHigh,
                padding: "2px 6px",
                borderRadius: 6,
                fontWeight: 600,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
              Ready
            </div>
          </div>
          <div
            style={{
              fontSize: 12,
              lineHeight: 1.55,
              color: p.onSurface,
              whiteSpace: "pre-line",
              overflow: "hidden",
            }}
          >
            {item.supporting || "I have analyzed your specifications. The component hierarchy is optimized for high-performance rendering across all modern mobile and desktop viewport profiles."}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4, borderTop: `1px solid ${p.outlineVariant}30` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, color: p.onSurfaceVariant }}>
              <Icon name="content_copy" size={15} color={p.onSurfaceVariant} />
              <Icon name="thumb_up" size={15} color={p.onSurfaceVariant} />
              <Icon name="thumb_down" size={15} color={p.onSurfaceVariant} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: p.primary, fontSize: 10.5, fontWeight: 600 }}>
              <Icon name="refresh" size={14} color={p.primary} />
              <span>Regenerate</span>
            </div>
          </div>
        </div>
      );
    }

    case "aiSuggestionsRow": {
      const suggestions = ["✨ Summarize layout", "💡 Suggest features", "⚡ Optimize speed", "🎨 Match theme"];
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 8px",
            overflowX: "auto",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {suggestions.map((s, idx) => (
            <div
              key={idx}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 12px",
                borderRadius: 16,
                background: idx === 0 ? p.primaryContainer : p.surfaceContainerHigh,
                color: idx === 0 ? p.onPrimaryContainer : p.onSurface,
                border: `1px solid ${p.outlineVariant}50`,
                fontSize: 11,
                fontWeight: 600,
                whiteSpace: "nowrap",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                flexShrink: 0,
              }}
            >
              <span>{idx === 0 && item.label ? item.label : s}</span>
            </div>
          ))}
        </div>
      );
    }

    case "codeSnippetBlock": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 14,
            background: "#1E1E2E",
            color: "#CDD6F4",
            border: "1px solid rgba(255,255,255,0.1)",
            overflow: "hidden",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            fontFamily: "monospace",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "7px 12px",
              background: "#181825",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#F38BA8" }} />
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#F9E2AF" }} />
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#A6E3A1" }} />
              <span style={{ fontSize: 10, color: "#A6ADC8", marginLeft: 6, fontWeight: 700 }}>
                {item.label || "app.config.ts"}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#89B4FA", cursor: "pointer" }}>
              <Icon name="content_copy" size={13} color="#89B4FA" />
              <span>Copy</span>
            </div>
          </div>
          <div style={{ padding: "10px 12px", fontSize: 11, lineHeight: 1.6, overflow: "hidden" }}>
            <div><span style={{ color: "#F38BA8" }}>import</span> <span style={{ color: "#89B4FA" }}>{"{ createApp }"}</span> <span style={{ color: "#F38BA8" }}>from</span> <span style={{ color: "#A6E3A1" }}>"antigravity"</span>;</div>
            <div><span style={{ color: "#CBA6F7" }}>const</span> app = <span style={{ color: "#89B4FA" }}>createApp</span>({"{"} strict: <span style={{ color: "#FAB387" }}>true</span> {"}"});</div>
            <div><span style={{ color: "#6C7086" }}>// {item.supporting || "Ready for cross-platform deployment"}</span></div>
            <div>app.<span style={{ color: "#89B4FA" }}>listen</span>(<span style={{ color: "#FAB387" }}>5173</span>);</div>
          </div>
        </div>
      );
    }

    /* =========================================================================
       Travel & Booking (travel)
       ========================================================================= */
    case "boardingPassCard": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 18,
            background: p.surfaceContainerHigh,
            border: `1px solid ${p.outlineVariant}60`,
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 14px",
              background: p.primary,
              color: p.onPrimary,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="flight_takeoff" size={18} color={p.onPrimary} />
              <span style={{ fontSize: 12, fontWeight: 800 }}>AeroSky Airways</span>
            </div>
            <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 8, background: "rgba(255,255,255,0.2)", fontWeight: 700 }}>
              FLIGHT AS-942
            </span>
          </div>
          <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900, color: p.primary }}>JFK</div>
                <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>New York · 08:30</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <Icon name="flight" size={20} color={p.primary} />
                <span style={{ fontSize: 9, color: p.onSurfaceVariant }}>14h 25m Direct</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: p.primary }}>NRT</div>
                <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>Tokyo · 14:55</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: `1px dashed ${p.outlineVariant}60`, fontSize: 11 }}>
              <div>
                <div style={{ fontSize: 9, color: p.onSurfaceVariant }}>PASSENGER</div>
                <div style={{ fontWeight: 700, color: p.onSurface }}>{item.label || "Alex Morgan"}</div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: p.onSurfaceVariant }}>GATE</div>
                <div style={{ fontWeight: 700, color: p.primary }}>B22</div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: p.onSurfaceVariant }}>SEAT</div>
                <div style={{ fontWeight: 700, color: p.primary }}>14A</div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: p.onSurfaceVariant }}>CLASS</div>
                <div style={{ fontWeight: 700, color: p.onSurface }}>Business</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "foodDeliveryTracker": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "12px 14px",
            borderRadius: 18,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#F59E0B20", display: "grid", placeItems: "center" }}>
                <Icon name="two_wheeler" size={20} color="#F59E0B" />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: p.onSurface }}>
                  {item.label || "Order on the way"}
                </div>
                <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
                  {item.supporting || "Estimated arrival: 18 mins"}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 900, color: p.primary, padding: "4px 8px", borderRadius: 8, background: p.primaryContainer }}>
              18 MIN
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  background: step <= 3 ? p.primary : `${p.outlineVariant}40`,
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: p.secondaryContainer, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 11, color: p.onSecondaryContainer }}>
                DR
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: p.onSurface }}>David R. (Honda PCX)</div>
                <div style={{ fontSize: 9.5, color: "#10B981" }}>★ 4.9 · 1,420 Deliveries</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: p.surfaceContainerHigh, display: "grid", placeItems: "center", cursor: "pointer" }}>
                <Icon name="phone" size={15} color={p.primary} />
              </div>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: p.surfaceContainerHigh, display: "grid", placeItems: "center", cursor: "pointer" }}>
                <Icon name="chat" size={15} color={p.primary} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "restaurantMenuRow": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                background: "linear-gradient(135deg, #F97316, #EA580C)",
                display: "grid",
                placeItems: "center",
                color: "#FFFFFF",
                flexShrink: 0,
              }}
            >
              <Icon name="restaurant" size={26} color="#FFFFFF" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: p.onSurface, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.label || "Truffle Mushroom Risotto"}
              </div>
              <div style={{ fontSize: 10, color: p.onSurfaceVariant, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", margin: "2px 0" }}>
                {item.supporting || "Wild mushrooms, shaved truffles, aged parmesan"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9.5 }}>
                <span style={{ color: "#F59E0B", fontWeight: 700 }}>480 kcal</span>
                <span style={{ color: p.outlineVariant }}>•</span>
                <span style={{ color: "#10B981", fontWeight: 600 }}>Vegetarian</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: p.primary }}>$22.50</span>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "4px 10px",
                borderRadius: 14,
                background: p.primary,
                color: p.onPrimary,
                fontSize: 10,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <Icon name="add" size={12} color={p.onPrimary} />
              <span>Add</span>
            </div>
          </div>
        </div>
      );
    }

    case "hotelBookingCard": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 18,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            overflow: "hidden",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              height: 70,
              background: `linear-gradient(135deg, ${p.primary}80, #3B82F6)`,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              padding: "8px 12px",
              color: "#FFFFFF",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, background: "rgba(0,0,0,0.4)", padding: "3px 8px", borderRadius: 12 }}>
              ★ 4.9 (320 Reviews)
            </span>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(0,0,0,0.3)", display: "grid", placeItems: "center" }}>
              <Icon name="favorite" size={16} color="#FFFFFF" />
            </div>
          </div>
          <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: p.onSurface }}>
                {item.label || "Grand Palace Resort & Spa"}
              </div>
            </div>
            <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
              {item.supporting || "Kyoto, Japan · 0.4 km from city center"}
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
              {["Free WiFi", "Infinity Pool", "Spa"].map((tag) => (
                <span key={tag} style={{ fontSize: 9, padding: "2px 6px", borderRadius: 6, background: p.surfaceContainerHigh, color: p.onSurfaceVariant }}>
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 6, borderTop: `1px solid ${p.outlineVariant}30` }}>
              <div>
                <span style={{ fontSize: 14, fontWeight: 900, color: p.primary }}>$185</span>
                <span style={{ fontSize: 9.5, color: p.onSurfaceVariant }}> / night</span>
              </div>
              <div style={{ padding: "6px 12px", borderRadius: 12, background: p.primary, color: p.onPrimary, fontSize: 10.5, fontWeight: 700 }}>
                Reserve
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "rideVehicleSelector": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1.5px solid ${p.primary}`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: p.primaryContainer, display: "grid", placeItems: "center" }}>
              <Icon name="directions_car" size={24} color={p.onPrimaryContainer} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12.5, fontWeight: 800, color: p.onSurface }}>
                  {item.label || "Comfort Electric"}
                </span>
                <span style={{ fontSize: 9.5, padding: "1px 5px", borderRadius: 4, background: "#10B98120", color: "#10B981", fontWeight: 700 }}>
                  EV
                </span>
              </div>
              <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
                {item.supporting || "3 mins away · Top rated driver · 4 seats"}
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: p.primary }}>$24.50</div>
            <div style={{ fontSize: 9.5, color: p.onSurfaceVariant, textDecoration: "line-through" }}>$28.00</div>
          </div>
        </div>
      );
    }

    /* =========================================================================
       Health & Fitness (health)
       ========================================================================= */
    case "heartRateMonitorCard": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "12px 14px",
            borderRadius: 18,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="favorite" size={20} color="#EF4444" fill={true} />
              <span style={{ fontSize: 12, fontWeight: 800, color: p.onSurface }}>
                {item.label || "Heart Rate"}
              </span>
            </div>
            <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "#EF444420", color: "#EF4444", fontWeight: 700 }}>
              LIVE ECG
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: p.onSurface }}>74</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#EF4444" }}>BPM</span>
            <span style={{ fontSize: 10, color: p.onSurfaceVariant, marginLeft: "auto" }}>Resting Avg: 68-76</span>
          </div>
          <div style={{ height: 36, width: "100%" }}>
            <svg viewBox="0 0 240 40" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              <path
                d="M 0 20 L 40 20 L 50 18 L 60 22 L 70 20 L 80 20 L 90 8 L 98 34 L 106 14 L 114 24 L 122 20 L 160 20 L 170 18 L 180 22 L 190 20 L 200 8 L 208 34 L 216 14 L 224 24 L 232 20 L 240 20"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      );
    }

    case "sleepTrackerCard": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "12px 14px",
            borderRadius: 18,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="bedtime" size={18} color="#6366F1" />
              <span style={{ fontSize: 12, fontWeight: 800, color: p.onSurface }}>
                {item.label || "Sleep Analysis"}
              </span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#6366F1" }}>Score 88/100</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: p.onSurface }}>7h 45m</span>
            <span style={{ fontSize: 10, color: "#10B981", fontWeight: 700 }}>+42m vs usual</span>
          </div>
          <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", gap: 2 }}>
            <div style={{ flex: 3, background: "#312E81" }} title="Deep" />
            <div style={{ flex: 4, background: "#6366F1" }} title="Light" />
            <div style={{ flex: 2, background: "#A5B4FC" }} title="REM" />
            <div style={{ flex: 1, background: "#F43F5E" }} title="Awake" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9.5, color: p.onSurfaceVariant }}>
            <span>Deep 2h 15m</span>
            <span>Light 3h 20m</span>
            <span>REM 1h 45m</span>
            <span>Awake 25m</span>
          </div>
        </div>
      );
    }

    case "waterIntakeTracker": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "12px 14px",
            borderRadius: 18,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "#0EA5E920", display: "grid", placeItems: "center" }}>
              <Icon name="water_drop" size={22} color="#0EA5E9" fill={true} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 900, color: p.onSurface }}>
                  {item.label || "1,750"}
                </span>
                <span style={{ fontSize: 10, color: p.onSurfaceVariant }}>/ 2,500 mL</span>
              </div>
              <div style={{ fontSize: 9.5, color: "#0EA5E9", fontWeight: 700, margin: "2px 0 4px" }}>
                70% Daily Goal Reached
              </div>
              <div style={{ width: "100%", height: 6, borderRadius: 3, background: `${p.outlineVariant}30`, overflow: "hidden" }}>
                <div style={{ width: "70%", height: "100%", background: "#0EA5E9", borderRadius: 3 }} />
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "6px 12px",
              borderRadius: 12,
              background: "#0EA5E9",
              color: "#FFFFFF",
              fontSize: 11,
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(14,165,233,0.3)",
              flexShrink: 0,
            }}
          >
            +250 mL
          </div>
        </div>
      );
    }

    case "medicationReminderTile": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: p.primaryContainer, display: "grid", placeItems: "center" }}>
              <Icon name="medication" size={20} color={p.onPrimaryContainer} />
            </div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: p.onSurface }}>
                {item.label || "Vitamin D3 + Omega-3"}
              </div>
              <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
                {item.supporting || "Take 1 capsule with food · 09:00 AM"}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 12px",
              borderRadius: 12,
              background: "#10B98120",
              color: "#10B981",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Icon name="check" size={14} color="#10B981" />
            <span>Taken</span>
          </div>
        </div>
      );
    }

    case "stepCounterCard": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
            padding: "12px 16px",
            borderRadius: 18,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="directions_walk" size={18} color="#10B981" />
              <span style={{ fontSize: 11, fontWeight: 700, color: p.onSurfaceVariant }}>DAILY STEPS</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: p.onSurface }}>
              {item.label || "8,420"}
              <span style={{ fontSize: 11, fontWeight: 600, color: p.onSurfaceVariant, marginLeft: 4 }}>/ 10,000</span>
            </div>
            <div style={{ display: "flex", gap: 10, fontSize: 10, color: p.onSurfaceVariant }}>
              <span>📍 6.4 km</span>
              <span>🔥 420 kcal</span>
              <span>⏱ 52 min</span>
            </div>
          </div>
          <div style={{ position: "relative", width: 48, height: 48, flexShrink: 0, display: "grid", placeItems: "center" }}>
            <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={`${p.outlineVariant}40`}
                strokeWidth="3.8"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10B981"
                strokeDasharray="84, 100"
                strokeWidth="3.8"
                strokeLinecap="round"
              />
            </svg>
            <span style={{ position: "absolute", fontSize: 10, fontWeight: 900, color: "#10B981" }}>84%</span>
          </div>
        </div>
      );
    }

    /* =========================================================================
       Productivity & Tasks (productivity)
       ========================================================================= */
    case "kanbanCard": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9.5, padding: "2px 8px", borderRadius: 8, background: "#EF444420", color: "#EF4444", fontWeight: 800 }}>
              HIGH PRIORITY
            </span>
            <Icon name="more_horiz" size={16} color={p.onSurfaceVariant} />
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: p.onSurface }}>
            {item.label || "Design Authentication System"}
          </div>
          <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
            {item.supporting || "Implement OAuth 2.0 flows with biometric passkey authentication."}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 6, borderTop: `1px solid ${p.outlineVariant}30` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: p.onSurfaceVariant }}>
              <Icon name="check_circle_outline" size={14} color={p.onSurfaceVariant} />
              <span>4 / 6 tasks</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 10, color: p.onSurfaceVariant }}>Oct 28</span>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: p.primary, color: p.onPrimary, display: "grid", placeItems: "center", fontSize: 9.5, fontWeight: 800 }}>
                AM
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "taskChecklistRow": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 14,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 6,
                background: p.primary,
                color: p.onPrimary,
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                cursor: "pointer",
              }}
            >
              <Icon name="check" size={14} color={p.onPrimary} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: p.onSurface, textDecoration: "line-through", opacity: 0.85, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.label || "Prepare weekly sprint review"}
              </div>
              <div style={{ fontSize: 9.5, color: p.onSurfaceVariant }}>
                {item.supporting || "Design System Sync · Due Today 17:00"}
              </div>
            </div>
          </div>
          <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 6, background: p.surfaceContainerHigh, color: p.onSurfaceVariant, flexShrink: 0 }}>
            Sprint 4
          </span>
        </div>
      );
    }

    case "calendarEventCard": {
      return (
        <div
          style={{
            display: "flex",
            gap: 12,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            borderLeft: `4px solid ${p.primary}`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: p.primary }}>14:00 - 15:30 (45 mins)</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: p.onSurface, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {item.label || "Product Strategy & Architecture Sync"}
            </div>
            <div style={{ fontSize: 10, color: p.onSurfaceVariant, marginTop: 2 }}>
              {item.supporting || "Google Meet · 6 attendees"}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 12px",
              borderRadius: 12,
              background: p.primary,
              color: p.onPrimary,
              fontSize: 10.5,
              fontWeight: 700,
              cursor: "pointer",
              alignSelf: "center",
              flexShrink: 0,
            }}
          >
            <Icon name="videocam" size={14} color={p.onPrimary} />
            <span>Join</span>
          </div>
        </div>
      );
    }

    case "fileAttachmentCard": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "#EF444420",
                color: "#EF4444",
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
                fontSize: 11,
                flexShrink: 0,
              }}
            >
              PDF
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: p.onSurface, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.label || "Q4_Financial_Report_v2.pdf"}
              </div>
              <div style={{ fontSize: 9.5, color: p.onSurfaceVariant }}>
                {item.supporting || "4.8 MB · Uploaded 2h ago"}
              </div>
            </div>
          </div>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: p.surfaceContainerHigh, display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0 }}>
            <Icon name="download" size={16} color={p.primary} />
          </div>
        </div>
      );
    }

    case "notesSnippetCard": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            padding: "12px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9.5, padding: "2px 8px", borderRadius: 8, background: "#F59E0B20", color: "#F59E0B", fontWeight: 800 }}>
              IDEAS
            </span>
            <span style={{ fontSize: 9.5, color: p.onSurfaceVariant }}>Edited 10m ago</span>
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: p.onSurface }}>
            {item.label || "Mobile App Redesign Notes"}
          </div>
          <div style={{ fontSize: 10.5, lineHeight: 1.5, color: p.onSurfaceVariant, overflow: "hidden" }}>
            {item.supporting || "1. Support rich industry presets\n2. Integrate dynamic analytics & real-time controls\n3. Zero latency touch previews"}
          </div>
        </div>
      );
    }

    case "todoCard": {
      const isCompleted = item.badge === "Completed";
      const priorityColor =
        item.badge === "Urgent"
          ? "#EF4444"
          : item.badge === "High"
          ? "#F59E0B"
          : item.badge === "Completed"
          ? "#10B981"
          : p.primary;
      const imageUrl =
        item.icon2 ||
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80";

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 18,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() => {
            window.dispatchEvent(
              new CustomEvent("todo-card-selected", {
                detail: { id: item.id, label: item.label, item },
              })
            );
          }}
        >
          {/* Cover image banner with scrim */}
          <div
            style={{
              height: 58,
              width: "100%",
              position: "relative",
              overflow: "hidden",
              background: "#18181B",
            }}
          >
            <img
              src={imageUrl}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: isCompleted ? 0.6 : 0.88,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 80%)",
              }}
            />
            {/* Top Badges */}
            <div
              style={{
                position: "absolute",
                top: 6,
                left: 8,
                right: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "2px 6px",
                  borderRadius: 6,
                  background: `${priorityColor}25`,
                  color: priorityColor,
                  backdropFilter: "blur(4px)",
                  border: `1px solid ${priorityColor}40`,
                }}
              >
                {item.badge || "Task"}
              </span>
              <div
                style={{
                  fontSize: 9,
                  color: "#FFFFFF",
                  padding: "2px 6px",
                  borderRadius: 6,
                  background: "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(4px)",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Icon name="calendar_today" size={10} color="#FFFFFF" />
                <span>Oct 15</span>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div
            style={{
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            {/* Checkbox toggle */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                window.dispatchEvent(
                  new CustomEvent("todo-card-toggle", {
                    detail: { id: item.id, label: item.label, isCompleted: !isCompleted },
                  })
                );
              }}
              style={{
                width: 22,
                height: 22,
                borderRadius: 7,
                background: isCompleted ? "#10B981" : `${p.outlineVariant}30`,
                color: "#FFFFFF",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                cursor: "pointer",
                border: isCompleted ? "none" : `1.5px solid ${p.outlineVariant}`,
              }}
            >
              {isCompleted ? <Icon name="check" size={15} color="#FFFFFF" /> : null}
            </div>

            {/* Title & Description */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: p.onSurface,
                  textDecoration: isCompleted ? "line-through" : "none",
                  opacity: isCompleted ? 0.6 : 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.label || "Design Atelier UI System"}
              </div>
              <div
                style={{
                  fontSize: 9.5,
                  color: p.onSurfaceVariant,
                  marginTop: 2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.supporting || "Export SVG icons and vector badge components"}
              </div>
            </div>

            {/* Quick CRUD Action Icons */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  window.dispatchEvent(
                    new CustomEvent("todo-card-edit", {
                      detail: { id: item.id, label: item.label },
                    })
                  );
                }}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: p.surfaceContainerHigh,
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
                title="Edit Task"
              >
                <Icon name="edit" size={13} color={p.onSurfaceVariant} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "todoStatsCard": {
      const match = item.supporting?.match(/(\d+)%/);
      const percent = typeof item.value === "number" ? item.value : (match ? parseInt(match[1], 10) : 60);

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderRadius: 18,
            background: `linear-gradient(135deg, ${p.primaryContainer} 0%, ${p.surfaceContainerHigh} 100%)`,
            border: `1px solid ${p.outlineVariant}50`,
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="task_alt" size={16} color={p.primary} />
              <span style={{ fontSize: 13, fontWeight: 800, color: p.onSurface }}>
                {item.label || "Daily Sprint Progress"}
              </span>
            </div>
            <div style={{ fontSize: 10, color: p.onSurfaceVariant }}>
              {item.supporting || `${percent}% Completed • 3 Active Milestones`}
            </div>
            {/* Progress track */}
            <div
              style={{
                width: "90%",
                height: 6,
                borderRadius: 3,
                background: `${p.outlineVariant}40`,
                overflow: "hidden",
                marginTop: 4,
              }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${p.primary} 0%, #10B981 100%)`,
                  borderRadius: 3,
                  transition: "width 300ms ease",
                }}
              />
            </div>
          </div>
          {/* Circular Percentage Pill */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: p.primary,
              color: p.onPrimary,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 900, lineHeight: 1 }}>{percent}%</span>
            <span style={{ fontSize: 8, opacity: 0.85, fontWeight: 700 }}>DONE</span>
          </div>
        </div>
      );
    }

    case "todoCreateCard": {
      const coverImg =
        item.icon2 ||
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80";

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "10px 12px",
            borderRadius: 18,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="photo_camera" size={15} color={p.primary} />
              <span style={{ fontSize: 11, fontWeight: 800, color: p.onSurface, letterSpacing: 0.2 }}>
                COVER IMAGE & PRESETS
              </span>
            </div>
            <span
              onClick={(e) => {
                e.stopPropagation();
                window.dispatchEvent(new CustomEvent("todo-cover-upload"));
              }}
              style={{
                fontSize: 9.5,
                padding: "2px 8px",
                borderRadius: 6,
                background: p.primaryContainer,
                color: p.onPrimaryContainer,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Upload Photo 📸
            </span>
          </div>

          {/* Active Cover Preview Banner */}
          <div
            style={{
              height: 54,
              borderRadius: 10,
              overflow: "hidden",
              position: "relative",
              border: `1px solid ${p.outlineVariant}40`,
            }}
          >
            <img src={coverImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 70%)",
                display: "flex",
                alignItems: "flex-end",
                padding: "4px 8px",
              }}
            >
              <span style={{ fontSize: 9, color: "#FFFFFF", fontWeight: 700 }}>
                Selected Task Cover Preview
              </span>
            </div>
          </div>

          {/* Preset Selector Thumbnails */}
          <div style={{ display: "flex", gap: 6 }}>
            {[
              "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=160",
              "https://images.unsplash.com/photo-1497366216548-37526070297c?w=160",
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=160",
              "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=160",
            ].map((url, idx) => (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  window.dispatchEvent(new CustomEvent("todo-cover-picked", { detail: { url } }));
                }}
                style={{
                  flex: 1,
                  height: 30,
                  borderRadius: 6,
                  overflow: "hidden",
                  border: url === coverImg ? `2px solid ${p.primary}` : `1px solid ${p.outlineVariant}30`,
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {url === coverImg && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.25)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Icon name="check" size={12} color="#FFFFFF" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "todoDetailCard": {
      const heroImg =
        item.icon2 ||
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80";

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 20,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Hero Banner with Priority & Due Date Badges */}
          <div style={{ height: 116, position: "relative", overflow: "hidden", background: "#18181B" }}>
            <img src={heroImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: 12,
                right: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  padding: "3px 8px",
                  borderRadius: 6,
                  background: item.badge?.includes("Completed") ? "#10B981" : "#EF4444",
                  color: "#FFFFFF",
                  letterSpacing: 0.3,
                }}
              >
                {item.badge || "URGENT PRIORITY"}
              </span>
              <span style={{ fontSize: 9.5, color: "#FFFFFF", opacity: 0.9 }}>Due Oct 15</span>
            </div>
          </div>

          {/* Details Content */}
          <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 900, color: p.onSurface, lineHeight: 1.25 }}>
              {item.label || "Design Atelier Spring Lookbook & UI System"}
            </div>
            <div style={{ fontSize: 10, color: p.onSurfaceVariant, lineHeight: 1.45 }}>
              {item.supporting ||
                "Finalize mobile typography scales, dark mode tokens, and 2-column editorial card grids for the new seasonal apparel launch."}
            </div>
          </div>
        </div>
      );
    }

    case "todoEditCard": {
      const coverImg =
        item.icon2 ||
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80";

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "10px 12px",
            borderRadius: 18,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="edit" size={15} color={p.primary} />
              <span style={{ fontSize: 11, fontWeight: 800, color: p.onSurface, letterSpacing: 0.2 }}>
                EDIT COVER IMAGE
              </span>
            </div>
            <span
              onClick={(e) => {
                e.stopPropagation();
                window.dispatchEvent(new CustomEvent("todo-cover-upload"));
              }}
              style={{
                fontSize: 9.5,
                padding: "2px 8px",
                borderRadius: 6,
                background: p.secondaryContainer,
                color: p.onSecondaryContainer,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Replace Photo 📸
            </span>
          </div>

          {/* Current Cover Preview Banner */}
          <div
            style={{
              height: 54,
              borderRadius: 10,
              overflow: "hidden",
              position: "relative",
              border: `1px solid ${p.outlineVariant}40`,
            }}
          >
            <img src={coverImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 70%)",
                display: "flex",
                alignItems: "flex-end",
                padding: "4px 8px",
              }}
            >
              <span style={{ fontSize: 9, color: "#FFFFFF", fontWeight: 700 }}>
                Current Active Cover Photo
              </span>
            </div>
          </div>

          {/* Preset Selector Thumbnails */}
          <div style={{ display: "flex", gap: 6 }}>
            {[
              "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=160",
              "https://images.unsplash.com/photo-1497366216548-37526070297c?w=160",
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=160",
              "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=160",
            ].map((url, idx) => (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  window.dispatchEvent(new CustomEvent("todo-cover-picked", { detail: { url } }));
                }}
                style={{
                  flex: 1,
                  height: 30,
                  borderRadius: 6,
                  overflow: "hidden",
                  border: url === coverImg ? `2px solid ${p.primary}` : `1px solid ${p.outlineVariant}30`,
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {url === coverImg && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.25)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Icon name="check" size={12} color="#FFFFFF" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "todoListInteractive": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "14px",
            borderRadius: 20,
            background: p.surfaceContainerLow,
            border: `1.5px solid ${p.primary}40`,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="checklist" size={18} color={p.primary} />
              <span style={{ fontSize: 13, fontWeight: 900, color: p.onSurface }}>
                {item.label || "Interactive Task Suite (CRUD)"}
              </span>
            </div>
            <span style={{ fontSize: 9.5, padding: "2px 7px", borderRadius: 6, background: p.primaryContainer, color: p.onPrimaryContainer, fontWeight: 700 }}>
              LIVE
            </span>
          </div>

          {/* Quick List Preview */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, overflowY: "auto" }}>
            {[
              {
                title: "Launch Spring Lookbook UI",
                img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=200",
                done: false,
                badge: "Urgent",
              },
              {
                title: "Morning 5K Trail Run & Log",
                img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=200",
                done: true,
                badge: "Health",
              },
              {
                title: "Architect Serverless CRUD Engine",
                img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200",
                done: false,
                badge: "Study",
              },
            ].map((t, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 8px",
                  borderRadius: 10,
                  background: p.surfaceContainerHigh,
                  border: `1px solid ${p.outlineVariant}25`,
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    background: t.done ? "#10B981" : "transparent",
                    border: t.done ? "none" : `1.5px solid ${p.outlineVariant}`,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {t.done && <Icon name="check" size={12} color="#FFFFFF" />}
                </div>
                <img src={t.img} alt="" style={{ width: 28, height: 28, borderRadius: 6, objectFit: "cover" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: p.onSurface, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textDecoration: t.done ? "line-through" : "none", opacity: t.done ? 0.6 : 1 }}>
                    {t.title}
                  </div>
                </div>
                <span style={{ fontSize: 8.5, padding: "2px 5px", borderRadius: 4, background: `${p.primary}20`, color: p.primary, fontWeight: 700 }}>
                  {t.badge}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Footer Action */}
          <div
            style={{
              padding: "7px 12px",
              borderRadius: 10,
              background: p.primary,
              color: p.onPrimary,
              fontSize: 10.5,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              cursor: "pointer",
            }}
          >
            <Icon name="add" size={14} color={p.onPrimary} />
            <span>Write New Task with Image</span>
          </div>
        </div>
      );
    }

    /* =========================================================================
       Smart Home & IoT (smarthome)
       ========================================================================= */
    case "thermostatDial": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px",
            borderRadius: 20,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: p.onSurfaceVariant }}>THERMOSTAT</span>
            <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 6, background: "#0EA5E920", color: "#0EA5E9", fontWeight: 700 }}>
              COOLING
            </span>
          </div>
          <div style={{ position: "relative", width: 90, height: 90, display: "grid", placeItems: "center" }}>
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-135deg)" }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke={`${p.outlineVariant}40`} strokeWidth="8" strokeDasharray="188 62" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#0EA5E9" strokeWidth="8" strokeDasharray="130 120" strokeLinecap="round" />
            </svg>
            <div style={{ position: "absolute", textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: p.onSurface }}>
                {item.label || "72°"}
              </div>
              <div style={{ fontSize: 8.5, color: p.onSurfaceVariant }}>TARGET 70°</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, color: p.onSurfaceVariant }}>
            <Icon name="ac_unit" size={18} color="#0EA5E9" />
            <Icon name="local_fire_department" size={18} color={p.onSurfaceVariant} />
            <Icon name="eco" size={18} color="#10B981" />
          </div>
        </div>
      );
    }

    case "smartLightControl": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "12px 14px",
            borderRadius: 18,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "#F59E0B20", display: "grid", placeItems: "center" }}>
                <Icon name="lightbulb" size={18} color="#F59E0B" fill={true} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: p.onSurface }}>
                  {item.label || "Living Room Lamp"}
                </div>
                <div style={{ fontSize: 9.5, color: p.onSurfaceVariant }}>Warm White · 85%</div>
              </div>
            </div>
            <div style={{ width: 36, height: 20, borderRadius: 10, background: p.primary, padding: 2, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#FFFFFF" }} />
            </div>
          </div>
          <div style={{ width: "100%", height: 8, borderRadius: 4, background: `${p.outlineVariant}30`, overflow: "hidden" }}>
            <div style={{ width: "85%", height: "100%", background: "#F59E0B", borderRadius: 4 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 2 }}>
            <span style={{ fontSize: 9.5, color: p.onSurfaceVariant }}>Presets:</span>
            <div style={{ display: "flex", gap: 6 }}>
              {["#FDE68A", "#FED7AA", "#DDD6FE", "#BAE6FD", "#BBF7D0"].map((c, i) => (
                <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: c, border: i === 0 ? `2px solid ${p.primary}` : "none", cursor: "pointer" }} />
              ))}
            </div>
          </div>
        </div>
      );
    }

    case "deviceStatusTile": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: p.primaryContainer, display: "grid", placeItems: "center" }}>
              <Icon name="cleaning_services" size={20} color={p.onPrimaryContainer} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: p.onSurface }}>
                {item.label || "RoboVac Pro X8"}
              </div>
              <div style={{ fontSize: 9.5, color: "#10B981", fontWeight: 700 }}>
                ● Cleaning · Battery 82%
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "5px 10px",
              borderRadius: 10,
              background: p.surfaceContainerHigh,
              color: p.onSurface,
              fontSize: 10.5,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Dock
          </div>
        </div>
      );
    }

    case "securityCameraFeed": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "10px 12px",
            borderRadius: 18,
            background: "#0F172A",
            color: "#FFFFFF",
            border: `1px solid ${p.outlineVariant}40`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444" }} />
              <span style={{ fontSize: 10, fontWeight: 800, color: "#EF4444" }}>LIVE 1080P</span>
            </div>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontFamily: "monospace" }}>18:42:09</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "14px 0" }}>
            <Icon name="videocam" size={32} color="rgba(255,255,255,0.3)" />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11, fontWeight: 700 }}>{item.label || "Front Door Cam"}</span>
            <span style={{ fontSize: 9.5, padding: "2px 6px", borderRadius: 6, background: "rgba(255,255,255,0.15)" }}>
              Motion Detected
            </span>
          </div>
        </div>
      );
    }

    /* =========================================================================
       Education & Learning (education)
       ========================================================================= */
    case "courseProgressCard": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "12px 14px",
            borderRadius: 18,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${p.primary}, #8B5CF6)`, display: "grid", placeItems: "center", color: "#FFFFFF", flexShrink: 0 }}>
              <Icon name="school" size={24} color="#FFFFFF" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: p.onSurface, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.label || "Fullstack React & TypeScript"}
              </div>
              <div style={{ fontSize: 9.5, color: p.onSurfaceVariant, margin: "2px 0 4px" }}>
                Chapter 4: State Management · 12/18 Lessons
              </div>
              <div style={{ width: "100%", height: 5, borderRadius: 3, background: `${p.outlineVariant}30`, overflow: "hidden" }}>
                <div style={{ width: "67%", height: "100%", background: p.primary, borderRadius: 3 }} />
              </div>
            </div>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: p.primary, color: p.onPrimary, display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0 }}>
            <Icon name="play_arrow" size={20} color={p.onPrimary} />
          </div>
        </div>
      );
    }

    case "quizQuestionCard": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "12px 14px",
            borderRadius: 18,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: p.primary }}>QUESTION 4 OF 10</span>
            <span style={{ fontSize: 9.5, padding: "2px 6px", borderRadius: 6, background: p.surfaceContainerHigh, color: p.onSurfaceVariant }}>
              +100 XP
            </span>
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: p.onSurface }}>
            {item.label || "Which lifecycle hook runs after render in React?"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {["A. useEffect", "B. useState", "C. useMemo", "D. useCallback"].map((opt, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 10px",
                  borderRadius: 10,
                  background: i === 0 ? p.primaryContainer : p.surfaceContainerHigh,
                  color: i === 0 ? p.onPrimaryContainer : p.onSurface,
                  border: i === 0 ? `1.5px solid ${p.primary}` : `1px solid ${p.outlineVariant}40`,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "flashcardViewer": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px",
            borderRadius: 18,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <span style={{ fontSize: 10, color: p.onSurfaceVariant }}>CARD 14 / 50</span>
            <Icon name="flip" size={16} color={p.primary} />
          </div>
          <div style={{ textAlign: "center", margin: "8px 0" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: p.onSurface }}>
              {item.label || "継続は力なり"}
            </div>
            <div style={{ fontSize: 11, color: p.onSurfaceVariant, marginTop: 4 }}>
              {item.supporting || "Keizoku wa chikara nari (Continuity is strength)"}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, width: "100%" }}>
            {["Hard", "Good", "Easy"].map((b, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "6px 0",
                  borderRadius: 10,
                  fontSize: 10.5,
                  fontWeight: 700,
                  background: i === 1 ? p.primary : p.surfaceContainerHigh,
                  color: i === 1 ? p.onPrimary : p.onSurface,
                  cursor: "pointer",
                }}
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "certificateBadgeCard": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 14px",
            borderRadius: 18,
            background: `linear-gradient(135deg, ${p.surfaceContainerLow}, ${p.surfaceContainerHigh})`,
            border: "1.5px solid #F59E0B",
            boxShadow: "0 4px 16px rgba(245,158,11,0.15)",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#F59E0B20", display: "grid", placeItems: "center", color: "#F59E0B", flexShrink: 0 }}>
            <Icon name="verified" size={26} color="#F59E0B" fill={true} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: "#F59E0B", letterSpacing: 0.5 }}>
              VERIFIED CERTIFICATE
            </div>
            <div style={{ fontSize: 13, fontWeight: 900, color: p.onSurface, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {item.label || "UI/UX Masterclass Specialist"}
            </div>
            <div style={{ fontSize: 9.5, color: p.onSurfaceVariant }}>
              Issued to Alex Morgan · ID: CERT-8942-X
            </div>
          </div>
        </div>
      );
    }

    /* =========================================================================
       Gaming & Rewards (gaming)
       ========================================================================= */
    case "leaderboardRow": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#F59E0B", color: "#FFFFFF", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 900 }}>
              #1
            </div>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: p.primary, color: p.onPrimary, display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800 }}>
              CN
            </div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: p.onSurface }}>
                {item.label || "CyberNinja_99"}
              </div>
              <div style={{ fontSize: 9.5, color: p.onSurfaceVariant }}>
                Grandmaster Tier
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: p.primary }}>
              {item.supporting || "14,850 XP"}
            </div>
            <div style={{ fontSize: 9.5, color: "#10B981", fontWeight: 700 }}>▲ +2 ranks</div>
          </div>
        </div>
      );
    }

    case "achievementBadge": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ width: 42, height: 42, borderRadius: 14, background: "linear-gradient(135deg, #F59E0B, #D97706)", display: "grid", placeItems: "center", color: "#FFFFFF", flexShrink: 0 }}>
            <Icon name="emoji_events" size={24} color="#FFFFFF" fill={true} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: p.onSurface }}>
              {item.label || "Master Craftsman"}
            </div>
            <div style={{ fontSize: 10, color: p.onSurfaceVariant, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {item.supporting || "Created over 50 custom application layouts"}
            </div>
            <span style={{ fontSize: 9, fontWeight: 800, color: "#10B981" }}>UNLOCKED · +500 PTS</span>
          </div>
        </div>
      );
    }

    case "rewardStreakCard": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "12px 14px",
            borderRadius: 18,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "#EF444420", display: "grid", placeItems: "center", color: "#EF4444" }}>
              <Icon name="local_fire_department" size={22} color="#EF4444" fill={true} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 900, color: p.onSurface }}>
                {item.label || "14 Days Streak!"}
              </div>
              <div style={{ fontSize: 9.5, color: p.onSurfaceVariant }}>
                {item.supporting || "Keep going to unlock the Mystery Chest"}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3, 4, 5].map((d) => (
              <div
                key={d}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: d <= 4 ? "#EF4444" : `${p.outlineVariant}40`,
                }}
              />
            ))}
          </div>
        </div>
      );
    }

    case "inventoryItemSlot": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            padding: "10px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: "2px solid #8B5CF6",
            boxShadow: "0 0 12px rgba(139,92,246,0.2)",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#8B5CF620", display: "grid", placeItems: "center" }}>
              <Icon name="shield" size={22} color="#8B5CF6" fill={true} />
            </div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: p.onSurface }}>
                {item.label || "Mythic Aegis Shield"}
              </div>
              <div style={{ fontSize: 9.5, color: "#8B5CF6", fontWeight: 700 }}>
                Lvl 85 · +320 DEF · Legendary
              </div>
            </div>
          </div>
          <span style={{ fontSize: 10, padding: "4px 8px", borderRadius: 8, background: "#8B5CF6", color: "#FFFFFF", fontWeight: 700 }}>
            Equipped
          </span>
        </div>
      );
    }

    /* =========================================================================
       Media & Streaming (media)
       ========================================================================= */
    case "audioPlaylistRow": {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 16,
            background: p.surfaceContainerLow,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${p.primary}, #EC4899)`, display: "grid", placeItems: "center", color: "#FFFFFF", flexShrink: 0 }}>
              <Icon name="music_note" size={20} color="#FFFFFF" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: p.onSurface, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.label || "Midnight City Horizon"}
              </div>
              <div style={{ fontSize: 9.5, color: p.onSurfaceVariant, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.supporting || "Synthwave Collective · 3:42"}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <Icon name="favorite_border" size={16} color={p.onSurfaceVariant} />
            <Icon name="play_arrow" size={20} color={p.primary} />
          </div>
        </div>
      );
    }

    case "videoStoryThumbnail": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "10px 12px",
            borderRadius: 18,
            background: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%), linear-gradient(135deg, ${p.primary}, #F43F5E)`,
            color: "#FFFFFF",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 9.5, padding: "2px 6px", borderRadius: 6, background: "rgba(0,0,0,0.4)", fontWeight: 700 }}>
              REEL
            </span>
            <Icon name="play_circle" size={20} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>
              {item.label || "@creativestudio"}
            </div>
            <div style={{ display: "flex", gap: 8, fontSize: 9.5, opacity: 0.9, marginTop: 2 }}>
              <span>👁 48.2K</span>
              <span>❤️ 3.4K</span>
            </div>
          </div>
        </div>
      );
    }

    /* =========================================================================
       Navigation & Headers (navigation)
       ========================================================================= */
    case "searchFilterHeader": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "10px 14px",
            borderRadius: 18,
            background: p.surfaceContainerHigh,
            border: `1px solid ${p.outlineVariant}50`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: 14,
              background: p.surfaceContainerLow,
              border: `1px solid ${p.outlineVariant}40`,
            }}
          >
            <Icon name="search" size={18} color={p.onSurfaceVariant} />
            <span style={{ fontSize: 12, color: p.onSurfaceVariant, flex: 1 }}>
              {item.label || "Search anything..."}
            </span>
            <Icon name="tune" size={16} color={p.primary} />
          </div>
          <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
            {["All", "Popular", "Near You", "Rating 4.5+"].map((tag, idx) => (
              <span
                key={tag}
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: 8,
                  background: idx === 0 ? p.primary : p.surfaceContainerLow,
                  color: idx === 0 ? p.onPrimary : p.onSurface,
                  whiteSpace: "nowrap",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      );
    }

    case "bottomSheetMenu": {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "8px 14px 12px",
            borderRadius: "20px 20px 0 0",
            background: p.surfaceContainerHigh,
            border: `1px solid ${p.outlineVariant}60`,
            borderBottom: "none",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.12)",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ width: 36, height: 4, borderRadius: 2, background: `${p.outlineVariant}80`, margin: "0 auto" }} />
          <div style={{ fontSize: 12, fontWeight: 800, color: p.onSurface, textAlign: "center" }}>
            {item.label || "Action Sheet"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { icon: "share", label: "Share to Friends" },
              { icon: "bookmark_border", label: "Save to Bookmark" },
              { icon: "report_problem", label: "Report Issue" },
            ].map((act, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "6px 8px",
                  borderRadius: 10,
                  background: p.surfaceContainerLow,
                  fontSize: 11,
                  fontWeight: 600,
                  color: p.onSurface,
                  cursor: "pointer",
                }}
              >
                <Icon name={act.icon} size={16} color={p.onSurfaceVariant} />
                <span>{act.label}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
  return null;
}

/** The colour whatever is written on a part is drawn in, and so the colour a ripple over it
 *  takes: white over a filled button, the text's own colour over a pale surface. A split button
 *  paints no box of its own, so its two segments answer for it. */
export function contentColor(item: Item, p: Palette): string {
  const c = item.kind === "splitButton" ? variantStyle(item.variant, p)?.color : boxStyle(item, p)?.color;
  return typeof c === "string" ? c : (p?.onSurface ?? "#1D1B20");
}

/** how the part's box is painted: the panel paints its style cells with the same answer */
export function boxStyle(item: Item, p: Palette): React.CSSProperties {
  if (NO_BOX.includes(item.kind) || menuOpen(item)) return { background: "transparent", border: "none" };
  switch (item.kind) {
    case "box":
    case "bottomSheet": {
      const t = item.fill ?? "surfaceContainerLow";
      return { background: resolveColor(t, p, "surfaceContainerLow"), color: onToken(t, p), border: "none" };
    }
    case "button":
    case "iconButton":
    case "fab":
    case "extendedFab":
      return variantStyle(item.variant, p);
    case "chip":
      if (item.checked) return { background: p.secondaryContainer, color: p.onSecondaryContainer, border: "none" };
      return item.variant === "outlined"
        ? { background: "transparent", color: p.onSurfaceVariant, border: `1px solid ${p.outlineVariant}` }
        : { background: p.surfaceContainerLow, color: p.onSurfaceVariant, border: "none" };
    case "card":
      return { background: resolveColor(cardFillOf(item), p, "surface"), border: item.variant === "outlined" ? `1px solid ${p.outlineVariant}` : "none" };
    case "textField":
    case "select":
      return item.variant === "filled"
        ? { background: p.surfaceContainerHighest, border: "none", color: p.onSurface }
        : { background: p.surface, border: `1px solid ${p.outline}`, color: p.onSurface };
    case "topAppBar":
    case "bottomNav":
    case "navRail":
      return { background: p.surfaceContainer, border: "none", color: p.onSurface };
    case "toolbar":
      return item.variant === "filled"
        ? { background: p.primaryContainer, border: "none", color: p.onPrimaryContainer }
        : { background: p.surfaceContainer, border: "none", color: p.onSurfaceVariant };
    case "tabs":
      return { background: p.surface, border: "none", color: p.onSurface };
    case "searchBar":
      return item.variant === "outlined"
        ? { background: p.surface, border: `1px solid ${p.outline}`, color: p.onSurface }
        : { background: p.surfaceContainerHigh, border: "none", color: p.onSurface };
    case "dialog":
      return { background: p.surfaceContainerHigh, border: "none", color: p.onSurface };
    case "datePicker":
      /* typed in, a date is a field on the screen rather than a surface over it */
      return dateLayoutOf(item) === "input"
        ? { background: "transparent", border: "none", color: p.onSurface }
        : { background: p.surfaceContainerHigh, border: "none", color: p.onSurface };
    case "timePicker":
      return { background: p.surfaceContainerHigh, border: "none", color: p.onSurface };
    case "snackbar":
      return { background: p.inverseSurface, border: "none", color: p.inverseOnSurface };
    case "image":
    case "map":
      return { background: p.surfaceContainerHighest, border: "none" };
    case "camera":
      return { background: p.inverseSurface, border: "none", color: p.inverseOnSurface };
    case "listItem": {
      const t = item.fill ?? "surfaceContainerLow";
      return { background: resolveColor(t, p, "surfaceContainerLow"), border: "none", color: onToken(t, p) };
    }
    default:
      return { background: p.surfaceContainerHigh, border: "none", color: p.onSurface };
  }
}

function shadowOf(item: Item): string {
  if (NO_BOX.includes(item.kind) || menuOpen(item)) return "none";
  switch (item.kind) {
    case "navRail":
      return item.railModal && item.railExpanded ? "0 2px 6px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.10)" : "none";
    case "button":
    case "iconButton":
    case "extendedFab":
      return variantShadow(item.variant);
    case "fab":
      return "0 3px 8px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.12)";
    case "card":
      return item.variant === "elevated" ? "0 1px 3px rgba(0,0,0,0.20), 0 2px 6px rgba(0,0,0,0.10)" : "none";
    case "dialog":
      return "0 8px 24px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.10)";
    case "timePicker":
      return "0 8px 24px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.10)";
    case "datePicker":
      return dateLayoutOf(item) === "input" ? "none" : "0 8px 24px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.10)";
    case "snackbar":
      return "0 3px 8px rgba(0,0,0,0.18)";
    case "toolbar":
      return "0 2px 6px rgba(0,0,0,0.14), 0 1px 2px rgba(0,0,0,0.10)";
    default:
      return "none";
  }
}

export type { Radii };

/** Corner radii are driven continuously by the magnet; a stiff spring keeps them on the pointer. */
const RADIUS_TWEEN = { type: "spring" as const, stiffness: 900, damping: 48, mass: 0.4 };

export function M3Node({
  item,
  palette,
  radii,
  widths,
  pressed,
  dragging,
  selected,
  inRun = false,
  interactive = true,
  onPointerDown,
  tabScroll,
  instant,
  ripple,
  lit,
}: {
  item: Item;
  palette: Palette;
  radii?: Radii;
  widths: Record<string, number>;
  pressed?: boolean;
  dragging?: boolean;
  selected?: boolean;
  /** the part sits in a connected run (non-free group, or a hidden run inside a free group) */
  inRun?: boolean;
  /** the width is being dragged on the canvas: it must follow the pointer with no easing */
  instant?: boolean;
  interactive?: boolean;
  onPointerDown?: (e: React.PointerEvent) => void;
  /** how far a scrollable tab row is scrolled in the preview; the canvas uses the resting position */
  tabScroll?: number;
  /** a press lights the part up from inside, the way Android does. The preview lights its own
   *  parts through the hit areas it lays over them, so it leaves this off. */
  ripple?: boolean;
  /** a light the part is given rather than one it took itself: where the finger is on a part
   *  being carried across the canvas, and where it was on one that has just landed. It stays for
   *  as long as it is given, and goes out on its own once it is taken away. `at` is when the
   *  press began, so a light handed over mid-spread carries on rather than starting again. */
  lit?: { x: number; y: number; at?: number; grown?: boolean } | null;
}) {
  const reducedMotion = useReducedMotion();
  const instantRail = reducedMotion && item.kind === "navRail" && isWideRail(item);
  const radiusTransition = instantRail ? { duration: 0 } : RADIUS_TWEEN;
  /* a menu on its way out is still drawn open, so the part is measured and boxed as it looks */
  const menu = useMenuPhase(item);
  const drawn = menu.drawn && !menuOpen(item) ? ({ ...item, [fabOpen]: true } as Item) : item;
  const r = radii ?? baseRadii(item);
  const size = sizeOf(drawn, widths);
  const measured = isMeasured(drawn);
  const clips = !NO_BOX.includes(item.kind) && !menuOpen(drawn) && item.kind !== "textField" && item.kind !== "select";
  /* only the button family lights up from inside; everything else is left as it was drawn */
  const lights = !!ripple && RIPPLE_KINDS.includes(item.kind);
  const ripples = useRipples(lights);
  /* the light a part carries in from wherever it was dropped belongs to the same family: a bar
   * landing on a screen simply arrives, it does not light up */
  const carried = RIPPLE_KINDS.includes(item.kind) ? lit : null;
  /* a given light belongs to the shape it was given inside: on a split button, the half the
   * finger is on */
  const litPart =
    carried && item.kind === "splitButton" ? (carried.x > size.w - splitMetrics(buttonHeightOf(item)).trailW ? SPLIT_MENU_SLOT : SPLIT_MAIN_SLOT) : null;
  /* how far the light had already spread where it came from: read once, when it arrives, so the
   * circle picks up where the other drawing left off and keeps going at the same pace. It is read
   * off the clock only when a new light arrives, never on a render that merely repeats. */
  const litSpread = useMemo(() => {
    if (!carried) return null;
    const gone = carried.grown ? RIPPLE_GROW : carried.at ? Math.max(0, (performance.now() - carried.at) / 1000) : 0;
    return { from: Math.min(1, gone / RIPPLE_GROW), dur: Math.max(0, RIPPLE_GROW - gone) };
  }, [carried]);
  const shown: Ripple[] = carried
    ? [
        ...ripples.list,
        {
          id: 0,
          part: litPart,
          x: carried.x,
          y: carried.y,
          d: rippleSize({ width: size.w, height: size.h }, carried.x, carried.y),
          from: litSpread?.from,
          dur: litSpread?.dur,
        },
      ]
    : ripples.list;

  return (
    <motion.div
      data-node={item.id}
      data-kind={item.kind}
      data-wide-rail={item.kind === "navRail" && isWideRail(item) ? "true" : undefined}
      onPointerDown={(e) => {
        ripples.add(e);
        onPointerDown?.(e);
      }}
      onPointerCancel={ripples.end}
      initial={false}
      animate={{
        borderTopLeftRadius: r.tl,
        borderBottomLeftRadius: r.bl,
        borderTopRightRadius: r.tr,
        borderBottomRightRadius: r.br,
        scale: pressed ? 0.97 : 1,
      }}
      transition={{
        borderTopLeftRadius: radiusTransition,
        borderBottomLeftRadius: radiusTransition,
        borderTopRightRadius: radiusTransition,
        borderBottomRightRadius: radiusTransition,
        scale: instantRail ? { duration: 0 } : { type: "spring", stiffness: 700, damping: 30, mass: 0.5 },
      }}
      style={{
        ...boxStyle(drawn, palette),
        width: measured ? undefined : size.w,
        height: size.h,
        display: measured ? "inline-flex" : "block",
        alignItems: "center",
        overflow: clips ? "hidden" : "visible",
        /* the selection ring sticks out 5px (3px offset + 2px ring); in a run the next
           sibling sits 3px away and would overpaint that edge — lift the selected part.
           Runs never overlap, so the lift only beats the sibling that hides the ring.
           Lone parts in free groups may overlap by design: keep their layer order. */
        position: selected && inRun ? "relative" : undefined,
        zIndex: selected && inRun ? 1 : undefined,
        cursor: !interactive ? "default" : dragging ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "none",
        boxSizing: "border-box",
        boxShadow: shadowOf(drawn),
        outline: selected ? `2px solid ${palette.primary}` : "2px solid transparent",
        outlineOffset: 3,
        /* a part that changes size with its screen, or with the size the author picked,
           eases the way the screen does; a measured part has no width of its own to ease */
        transition:
          instant || menu.snap
            ? "outline-color 120ms"
            : `outline-color 120ms, height ${SETTLE_MS}ms cubic-bezier(0.2, 0, 0, 1)${measured ? "" : `, width ${SETTLE_MS}ms cubic-bezier(0.2, 0, 0, 1)`}`,
        flex: "0 0 auto",
      }}
    >
      <RippleCtx.Provider value={{ list: shown, color: contentColor(drawn, palette) }}>
        <Body item={drawn} p={palette} tabScroll={tabScroll} menuShown={menu.open} />
        {/* a part drawn as one shape is lit through its own box; one made of several -- a split
            button -- carries the light inside each of them instead */}
        {(lights || !!carried) && item.kind !== "splitButton" && <RippleShape part={null} />}
      </RippleCtx.Provider>
    </motion.div>
  );
}

/** Plain (non-animated) rendering of a part; used where frames must be deterministic. */
export function M3Static({
  item,
  palette,
  radii,
  style,
}: {
  item: Item;
  palette: Palette;
  radii?: Radii;
  style?: React.CSSProperties;
}) {
  const r = radii ?? baseRadii(item);
  const size = sizeOf(item, {});
  const measured = isMeasured(item);
  const clips = !NO_BOX.includes(item.kind) && !menuOpen(item) && item.kind !== "textField" && item.kind !== "select";
  return (
    <div
      style={{
        ...boxStyle(item, palette),
        width: measured ? undefined : size.w,
        height: size.h,
        display: measured ? "inline-flex" : "block",
        alignItems: "center",
        overflow: clips ? "hidden" : "visible",
        boxSizing: "border-box",
        boxShadow: shadowOf(item),
        borderTopLeftRadius: r.tl,
        borderTopRightRadius: r.tr,
        borderBottomLeftRadius: r.bl,
        borderBottomRightRadius: r.br,
        flex: "0 0 auto",
        ...style,
      }}
    >
      <Body item={item} p={palette} />
    </div>
  );
}
