import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  FolderTree,
  GitBranch,
  Link2,
  Trash2,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Eye,
  Plus,
  Zap,
  Layers,
  Smartphone,
  Code2,
  X,
} from 'lucide-react';
import { ScreenNavigationConnection } from '../utils/customProjectsStore';

export interface LinkableScreenVariantOption {
  id: string;
  label: string;
  shortLabel: string;
}

export interface LinkableScreenItem {
  id: string;
  label: string;
  moduleGroup: string;
  roleBadge?: string;
  filePath?: string;
  thumbnailUrl?: string;
  activeVariant: string;
  variants: LinkableScreenVariantOption[];
}

export interface VisualNavigationLinkBuilderProps {
  projectName: string;
  screens: LinkableScreenItem[];
  currentScreenId: string;
  primaryColor: string;
  isSingleVariantMode?: boolean;
  connections: ScreenNavigationConnection[];
  onConnectionsChange: (nextConnections: ScreenNavigationConnection[]) => void;
  onSelectScreenVariant: (screenId: string, variantId: string) => void;
}

interface PortCoordinates {
  x: number;
  y: number;
}

const TRIGGER_PRESETS = [
  'On Tap Primary CTA',
  'On Card Press',
  'On Form Submit',
  'On Header Action',
  'On Tab Select',
  'On Swipe / Gesture',
  'On Auth Verified',
  'On Payment Success',
];

const TRANSITION_TYPES: Array<{
  id: 'push' | 'modal' | 'replace' | 'tab';
  label: string;
  badgeColor: string;
}> = [
  { id: 'push', label: 'Stack Push', badgeColor: '#4F46E5' },
  { id: 'modal', label: 'Modal Sheet', badgeColor: '#D97706' },
  { id: 'replace', label: 'Replace Root', badgeColor: '#059669' },
  { id: 'tab', label: 'Tab Switch', badgeColor: '#0284C7' },
];

export function buildDefaultNavigationConnections(
  screens: LinkableScreenItem[],
  isSingleVariantMode?: boolean
): ScreenNavigationConnection[] {
  if (screens.length < 2) return [];
  const defaults: ScreenNavigationConnection[] = [];

  for (let i = 0; i < Math.min(screens.length - 1, 14); i++) {
    const src = screens[i];
    const tgt = screens[i + 1];
    const srcVar = isSingleVariantMode
      ? src.variants[0]?.id || 'v1'
      : src.activeVariant || src.variants[0]?.id || 'v1';
    const tgtVar = isSingleVariantMode
      ? tgt.variants[0]?.id || 'v1'
      : tgt.activeVariant || tgt.variants[0]?.id || 'v1';

    let triggerLabel = 'On Tap Continue';
    let transitionType: 'push' | 'modal' | 'replace' | 'tab' = 'push';

    if (i === 0) {
      triggerLabel = 'On Launch Timer / Get Started';
      transitionType = 'replace';
    } else if (i === 1) {
      triggerLabel = 'On Complete Walkthrough';
      transitionType = 'push';
    } else if (i === 2) {
      triggerLabel = 'On OTP / Auth Verified';
      transitionType = 'replace';
    } else if (src.moduleGroup.toLowerCase().includes('discovery')) {
      triggerLabel = 'On Tap Item Card';
      transitionType = 'push';
    } else if (src.moduleGroup.toLowerCase().includes('checkout')) {
      triggerLabel = 'On Authorize Payment';
      transitionType = 'modal';
    }

    defaults.push({
      id: `link_${src.id}_${srcVar}__${tgt.id}_${tgtVar}`,
      sourceScreenId: src.id,
      sourceVariant: srcVar,
      targetScreenId: tgt.id,
      targetVariant: tgtVar,
      triggerLabel,
      transitionType,
    });
  }

  return defaults;
}

export const VisualNavigationLinkBuilder: React.FC<VisualNavigationLinkBuilderProps> = ({
  projectName,
  screens,
  currentScreenId,
  primaryColor,
  isSingleVariantMode = false,
  connections,
  onConnectionsChange,
  onSelectScreenVariant,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const outPortRefs = useRef<Record<string, HTMLElement | null>>({});
  const inPortRefs = useRef<Record<string, HTMLElement | null>>({});

  const [portPositions, setPortPositions] = useState<{
    out: Record<string, PortCoordinates>;
    in: Record<string, PortCoordinates>;
  }>({ out: {}, in: {} });

  // Active drag state when user drags from a variant node or clicks "Connect"
  const [draggingSource, setDraggingSource] = useState<{
    screenId: string;
    variantId: string;
    startX: number;
    startY: number;
    currX: number;
    currY: number;
  } | null>(null);

  const [hoveredTargetKey, setHoveredTargetKey] = useState<string | null>(null);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  const [activeTriggerPreset, setActiveTriggerPreset] = useState<string>('On Tap Primary CTA');
  const [activeTransitionType, setActiveTransitionType] = useState<
    'push' | 'modal' | 'replace' | 'tab'
  >('push');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [showRouteCodeModal, setShowRouteCodeModal] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'connected' | 'active_screen'>('all');

  const makePortKey = (screenId: string, variantId: string) => `${screenId}:::${variantId}`;

  // Group screens by moduleGroup for clean tree hierarchy visualization
  const groupedScreens = useMemo(() => {
    const groups: Record<string, LinkableScreenItem[]> = {};
    screens.forEach((s) => {
      const g = s.moduleGroup || 'Core Application Flow';
      if (!groups[g]) groups[g] = [];
      groups[g].push(s);
    });
    return Object.entries(groups);
  }, [screens]);

  // Measure port coordinates relative to the canvas container
  const recalculatePositions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();

    const nextOut: Record<string, PortCoordinates> = {};
    const nextIn: Record<string, PortCoordinates> = {};

    Object.entries(outPortRefs.current).forEach(([key, el]) => {
      if (el) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          nextOut[key] = {
            x: r.left - cRect.left + r.width / 2,
            y: r.top - cRect.top + r.height / 2,
          };
        }
      }
    });

    Object.entries(inPortRefs.current).forEach(([key, el]) => {
      if (el) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          nextIn[key] = {
            x: r.left - cRect.left + r.width / 2,
            y: r.top - cRect.top + r.height / 2,
          };
        }
      }
    });

    setPortPositions({ out: nextOut, in: nextIn });
  }, []);

  useEffect(() => {
    recalculatePositions();
    const timer = setTimeout(recalculatePositions, 120);
    window.addEventListener('resize', recalculatePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', recalculatePositions);
    };
  }, [recalculatePositions, screens, connections, collapsedGroups, isSingleVariantMode]);

  // Pointer move / up listeners while dragging a wire
  useEffect(() => {
    if (!draggingSource) return;

    const handlePointerMove = (e: PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();
      setDraggingSource((prev) =>
        prev
          ? {
              ...prev,
              currX: e.clientX - cRect.left,
              currY: e.clientY - cRect.top,
            }
          : null
      );
    };

    const handlePointerUp = () => {
      if (draggingSource && hoveredTargetKey) {
        const [targetScreenId, targetVariant] = hoveredTargetKey.split(':::');
        if (
          targetScreenId &&
          targetVariant &&
          !(
            draggingSource.screenId === targetScreenId &&
            draggingSource.variantId === targetVariant
          )
        ) {
          createOrUpdateConnection(
            draggingSource.screenId,
            draggingSource.variantId,
            targetScreenId,
            targetVariant
          );
        }
      }
      setDraggingSource(null);
      setHoveredTargetKey(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [draggingSource, hoveredTargetKey]);

  const createOrUpdateConnection = (
    sourceScreenId: string,
    sourceVariant: string,
    targetScreenId: string,
    targetVariant: string
  ) => {
    const id = `link_${sourceScreenId}_${sourceVariant}__${targetScreenId}_${targetVariant}`;
    const exists = connections.some((c) => c.id === id);
    if (exists) {
      setSelectedConnectionId(id);
      return;
    }
    const newConn: ScreenNavigationConnection = {
      id,
      sourceScreenId,
      sourceVariant,
      targetScreenId,
      targetVariant,
      triggerLabel: activeTriggerPreset,
      transitionType: activeTransitionType,
    };
    const updated = [...connections, newConn];
    onConnectionsChange(updated);
    setSelectedConnectionId(id);
  };

  const handleDeleteConnection = (connId: string) => {
    onConnectionsChange(connections.filter((c) => c.id !== connId));
    if (selectedConnectionId === connId) {
      setSelectedConnectionId(null);
    }
  };

  const handleUpdateConnectionMeta = (
    connId: string,
    patch: Partial<ScreenNavigationConnection>
  ) => {
    onConnectionsChange(
      connections.map((c) => (c.id === connId ? { ...c, ...patch } : c))
    );
  };

  const handleAutoWireFlow = () => {
    const defaults = buildDefaultNavigationConnections(screens, isSingleVariantMode);
    onConnectionsChange(defaults);
    setSelectedConnectionId(defaults[0]?.id || null);
  };

  const handleClearAllConnections = () => {
    onConnectionsChange([]);
    setSelectedConnectionId(null);
  };

  const startWireDrag = (
    e: React.PointerEvent,
    screenId: string,
    variantId: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const key = makePortKey(screenId, variantId);
    const portCoord = portPositions.out[key] || {
      x: e.clientX - cRect.left,
      y: e.clientY - cRect.top,
    };

    setDraggingSource({
      screenId,
      variantId,
      startX: portCoord.x,
      startY: portCoord.y,
      currX: e.clientX - cRect.left,
      currY: e.clientY - cRect.top,
    });
  };

  // HTML5 Drag & Drop fallback handlers so users can also native-drag variant chips
  const handleHtmlDragStart = (
    e: React.DragEvent,
    screenId: string,
    variantId: string
  ) => {
    e.dataTransfer.setData(
      'application/appforge-nav-node',
      JSON.stringify({ screenId, variantId })
    );
    e.dataTransfer.effectAllowed = 'link';
  };

  const handleHtmlDrop = (
    e: React.DragEvent,
    targetScreenId: string,
    targetVariantId: string
  ) => {
    e.preventDefault();
    setHoveredTargetKey(null);
    try {
      const raw = e.dataTransfer.getData('application/appforge-nav-node');
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (
        parsed.screenId &&
        parsed.variantId &&
        !(
          parsed.screenId === targetScreenId &&
          parsed.variantId === targetVariantId
        )
      ) {
        createOrUpdateConnection(
          parsed.screenId,
          parsed.variantId,
          targetScreenId,
          targetVariantId
        );
      }
    } catch {
      // ignore invalid drag payload
    }
  };

  // Compute cubic bezier path between two points
  const buildBezierPath = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const curvature = Math.max(Math.abs(dx) * 0.45, Math.abs(dy) * 0.35, 60);
    const cx1 = x1 + curvature;
    const cy1 = y1;
    const cx2 = x2 - curvature;
    const cy2 = y2;
    return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  };

  const visibleConnections = useMemo(() => {
    if (filterMode === 'active_screen') {
      return connections.filter(
        (c) =>
          c.sourceScreenId === currentScreenId ||
          c.targetScreenId === currentScreenId
      );
    }
    return connections;
  }, [connections, filterMode, currentScreenId]);

  const selectedConnection = useMemo(
    () => connections.find((c) => c.id === selectedConnectionId) || null,
    [connections, selectedConnectionId]
  );

  const getScreenLabel = (screenId: string) =>
    screens.find((s) => s.id === screenId)?.label || screenId;

  return (
    <div className="space-y-4">
      {/* Top Visual Link Builder Control Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm"
              style={{ backgroundColor: primaryColor }}
            >
              <GitBranch size={18} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                  Screen Hierarchy &amp; Visual Navigation Link Builder
                </h3>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-black text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  {connections.length} Active Flow Links
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Drag from any screen variant&apos;s{' '}
                <strong className="text-neutral-700 dark:text-neutral-200">
                  OUT port (●→)
                </strong>{' '}
                and drop onto another screen variant&apos;s{' '}
                <strong className="text-neutral-700 dark:text-neutral-200">
                  IN port (→●)
                </strong>{' '}
                to wire navigation routes for {projectName}.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleAutoWireFlow}
              style={{ backgroundColor: primaryColor }}
              className="px-3 py-1.5 rounded-xl text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xs hover:opacity-95 transition cursor-pointer"
            >
              <Sparkles size={13} />
              <span>Auto-Wire Default App Flow</span>
            </button>

            <button
              type="button"
              onClick={() => setShowRouteCodeModal(true)}
              className="px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-bold flex items-center gap-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition cursor-pointer"
            >
              <Code2 size={13} />
              <span>Export React Navigation Graph</span>
            </button>

            {connections.length > 0 && (
              <button
                type="button"
                onClick={handleClearAllConnections}
                className="px-2.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-bold flex items-center gap-1 transition cursor-pointer"
              >
                <Trash2 size={12} />
                <span>Clear Links</span>
              </button>
            )}
          </div>
        </div>

        {/* Default Trigger & Transition Preset Bar for New Drag-and-Drop Links */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-extrabold text-neutral-500 uppercase tracking-wider">
              New Link Trigger:
            </span>
            <select
              value={activeTriggerPreset}
              onChange={(e) => setActiveTriggerPreset(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 focus:outline-none"
            >
              {TRIGGER_PRESETS.map((preset) => (
                <option key={preset} value={preset}>
                  {preset}
                </option>
              ))}
            </select>

            <span className="text-[11px] font-extrabold text-neutral-500 uppercase tracking-wider ml-1">
              Transition:
            </span>
            <div className="flex items-center gap-1">
              {TRANSITION_TYPES.map((t) => {
                const active = activeTransitionType === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTransitionType(t.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition ${
                      active
                        ? 'text-white shadow-2xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                    }`}
                    style={active ? { backgroundColor: t.badgeColor } : undefined}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {(
              [
                ['all', `All Links (${connections.length})`],
                ['active_screen', 'Current Screen Links'],
              ] as const
            ).map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => setFilterMode(mode)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition ${
                  filterMode === mode
                    ? 'text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-800 dark:hover:text-white'
                }`}
                style={
                  filterMode === mode ? { backgroundColor: primaryColor } : undefined
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Link Inspector / Active Drag Status Banner */}
      {draggingSource && (
        <div
          className="p-3 rounded-xl text-white text-xs font-bold flex items-center justify-between shadow-md animate-pulse"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="flex items-center gap-2">
            <Link2 size={15} />
            <span>
              Dragging Navigation Wire from{' '}
              <strong>
                {getScreenLabel(draggingSource.screenId)} (
                {draggingSource.variantId.toUpperCase()})
              </strong>{' '}
              — Drop onto any target screen variant&apos;s IN port (→●)
            </span>
          </div>
          <button
            type="button"
            onClick={() => setDraggingSource(null)}
            className="px-2 py-0.5 rounded bg-black/20 text-[10px] font-black"
          >
            ESC / Cancel
          </button>
        </div>
      )}

      {selectedConnection && !draggingSource && (
        <div className="p-3.5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/30 border-2 border-indigo-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-black uppercase">
              Selected Link
            </span>
            <span className="text-xs font-extrabold text-neutral-900 dark:text-white">
              {getScreenLabel(selectedConnection.sourceScreenId)}{' '}
              <span className="font-mono text-indigo-600 dark:text-indigo-400">
                [{selectedConnection.sourceVariant.toUpperCase()}]
              </span>
            </span>
            <ArrowRight size={14} className="text-indigo-500" />
            <span className="text-xs font-extrabold text-neutral-900 dark:text-white">
              {getScreenLabel(selectedConnection.targetScreenId)}{' '}
              <span className="font-mono text-emerald-600 dark:text-emerald-400">
                [{selectedConnection.targetVariant.toUpperCase()}]
              </span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={selectedConnection.triggerLabel}
              onChange={(e) =>
                handleUpdateConnectionMeta(selectedConnection.id, {
                  triggerLabel: e.target.value,
                })
              }
              placeholder="Trigger action..."
              className="px-2.5 py-1 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-bold text-neutral-800 dark:text-white"
            />

            <select
              value={selectedConnection.transitionType || 'push'}
              onChange={(e) =>
                handleUpdateConnectionMeta(selectedConnection.id, {
                  transitionType: e.target.value as any,
                })
              }
              className="px-2 py-1 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-bold text-neutral-800 dark:text-white"
            >
              {TRANSITION_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() =>
                onSelectScreenVariant(
                  selectedConnection.targetScreenId,
                  selectedConnection.targetVariant
                )
              }
              style={{ backgroundColor: primaryColor }}
              className="px-2.5 py-1 rounded-lg text-white text-[11px] font-extrabold flex items-center gap-1 shadow-2xs cursor-pointer"
            >
              <Play size={11} />
              <span>Simulate Target</span>
            </button>

            <button
              type="button"
              onClick={() => handleDeleteConnection(selectedConnection.id)}
              className="p-1.5 rounded-lg bg-rose-500/15 text-rose-600 hover:bg-rose-600 hover:text-white transition cursor-pointer"
              title="Delete Navigation Link"
            >
              <Trash2 size={13} />
            </button>

            <button
              type="button"
              onClick={() => setSelectedConnectionId(null)}
              className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Interactive Tree + SVG Wire Overlay Canvas */}
      <div
        ref={containerRef}
        onScroll={recalculatePositions}
        className="relative p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs overflow-hidden"
      >
        {/* SVG Overlay for Curved Bezier Navigation Wires */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          style={{ minHeight: '100%' }}
        >
          <defs>
            <marker
              id="nav-arrow-default"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill={primaryColor} />
            </marker>
            <marker
              id="nav-arrow-selected"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
            </marker>
          </defs>

          {visibleConnections.map((conn) => {
            const outKey = makePortKey(conn.sourceScreenId, conn.sourceVariant);
            const inKey = makePortKey(conn.targetScreenId, conn.targetVariant);
            const start = portPositions.out[outKey];
            const end = portPositions.in[inKey];
            if (!start || !end) return null;

            const isSelected = selectedConnectionId === conn.id;
            const pathData = buildBezierPath(start.x, start.y, end.x, end.y);
            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;

            return (
              <g
                key={conn.id}
                className="pointer-events-auto cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedConnectionId(conn.id);
                }}
              >
                {/* Invisible wider hit stroke for easy clicking */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={14}
                />
                {/* Main visible bezier wire */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={isSelected ? '#10B981' : primaryColor}
                  strokeWidth={isSelected ? 3 : 2}
                  strokeDasharray={conn.transitionType === 'modal' ? '6 4' : undefined}
                  strokeOpacity={isSelected ? 0.95 : 0.55}
                  markerEnd={
                    isSelected
                      ? 'url(#nav-arrow-selected)'
                      : 'url(#nav-arrow-default)'
                  }
                />
                {/* Midpoint Interactive Pill Badge */}
                <g transform={`translate(${midX}, ${midY})`}>
                  <rect
                    x={-48}
                    y={-10}
                    width={96}
                    height={20}
                    rx={6}
                    fill={isSelected ? '#10B981' : '#0F172A'}
                    fillOpacity={0.9}
                  />
                  <text
                    x={0}
                    y={3}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize={8.5}
                    fontWeight="bold"
                  >
                    {conn.triggerLabel.slice(0, 16)}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Live Wire Currently Being Dragged by User */}
          {draggingSource && (
            <path
              d={buildBezierPath(
                draggingSource.startX,
                draggingSource.startY,
                draggingSource.currX,
                draggingSource.currY
              )}
              fill="none"
              stroke="#10B981"
              strokeWidth={3}
              strokeDasharray="5 3"
              markerEnd="url(#nav-arrow-selected)"
            />
          )}
        </svg>

        {/* Hierarchical Screen & Variant Tree Nodes */}
        <div className="relative z-10 space-y-5">
          {groupedScreens.map(([groupName, groupItems], gIdx) => {
            const isCollapsed = Boolean(collapsedGroups[groupName]);
            return (
              <div
                key={groupName}
                className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 overflow-hidden"
              >
                {/* Module Flow Branch Header */}
                <div
                  onClick={() =>
                    setCollapsedGroups((prev) => ({
                      ...prev,
                      [groupName]: !prev[groupName],
                    }))
                  }
                  className="px-4 py-2.5 bg-neutral-100/80 dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2">
                    {isCollapsed ? (
                      <ChevronRight size={15} className="text-neutral-500" />
                    ) : (
                      <ChevronDown size={15} className="text-neutral-500" />
                    )}
                    <FolderTree size={14} style={{ color: primaryColor }} />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                      Flow Branch {gIdx + 1}: {groupName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white dark:bg-neutral-800 text-[10px] font-bold text-neutral-500">
                      {groupItems.length} Screens
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400">
                    Drag variant OUT (●→) to any target variant IN (→●)
                  </span>
                </div>

                {/* Screen Nodes inside this Branch */}
                {!isCollapsed && (
                  <div className="p-3.5 space-y-2.5">
                    {groupItems.map((screen) => {
                      const isCurrentScreen = currentScreenId === screen.id;
                      const outgoingLinks = connections.filter(
                        (c) => c.sourceScreenId === screen.id
                      );
                      const incomingLinks = connections.filter(
                        (c) => c.targetScreenId === screen.id
                      );

                      return (
                        <div
                          key={screen.id}
                          className={`p-3 rounded-xl border transition-all ${
                            isCurrentScreen
                              ? 'bg-white dark:bg-neutral-900 border-2 shadow-sm'
                              : 'bg-white/90 dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                          }`}
                          style={
                            isCurrentScreen
                              ? { borderColor: primaryColor }
                              : undefined
                          }
                        >
                          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
                            {/* Left: Screen Identity & File Path */}
                            <div
                              onClick={() =>
                                onSelectScreenVariant(
                                  screen.id,
                                  screen.activeVariant
                                )
                              }
                              className="flex items-center gap-3 cursor-pointer min-w-0"
                            >
                              {screen.thumbnailUrl ? (
                                <img
                                  src={screen.thumbnailUrl}
                                  alt={screen.label}
                                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-neutral-200 dark:border-neutral-700"
                                />
                              ) : (
                                <div
                                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                                  style={{ backgroundColor: primaryColor }}
                                >
                                  <Smartphone size={16} />
                                </div>
                              )}

                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className="text-xs font-extrabold text-neutral-900 dark:text-white truncate">
                                    {screen.label}
                                  </span>
                                  {screen.roleBadge && (
                                    <span
                                      className="px-1.5 py-0.2 rounded text-[9px] font-black text-white uppercase"
                                      style={{ backgroundColor: primaryColor }}
                                    >
                                      {screen.roleBadge}
                                    </span>
                                  )}
                                  {isCurrentScreen && (
                                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[9px] font-black">
                                      Live on Phone
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-center gap-2 mt-0.5">
                                  <span className="text-[10px] font-mono text-neutral-400 truncate">
                                    {screen.filePath ||
                                      `screens/${screen.id}/${screen.activeVariant}/index.tsx`}
                                  </span>
                                  {(incomingLinks.length > 0 ||
                                    outgoingLinks.length > 0) && (
                                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                                      • {incomingLinks.length} in /{' '}
                                      {outgoingLinks.length} out
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Right: Interactive Variant Nodes with Drag-and-Drop IN & OUT Ports */}
                            <div className="flex flex-wrap items-center gap-2.5">
                              {screen.variants.map((v) => {
                                const portKey = makePortKey(screen.id, v.id);
                                const isActiveVar = screen.activeVariant === v.id;
                                const isDragHovered = hoveredTargetKey === portKey;
                                const isDragOrigin =
                                  draggingSource?.screenId === screen.id &&
                                  draggingSource?.variantId === v.id;

                                const hasOutLink = connections.some(
                                  (c) =>
                                    c.sourceScreenId === screen.id &&
                                    c.sourceVariant === v.id
                                );
                                const hasInLink = connections.some(
                                  (c) =>
                                    c.targetScreenId === screen.id &&
                                    c.targetVariant === v.id
                                );

                                return (
                                  <div
                                    key={v.id}
                                    draggable
                                    onDragStart={(e) =>
                                      handleHtmlDragStart(e, screen.id, v.id)
                                    }
                                    onDragOver={(e) => {
                                      e.preventDefault();
                                      setHoveredTargetKey(portKey);
                                    }}
                                    onDragLeave={() => {
                                      if (hoveredTargetKey === portKey) {
                                        setHoveredTargetKey(null);
                                      }
                                    }}
                                    onDrop={(e) =>
                                      handleHtmlDrop(e, screen.id, v.id)
                                    }
                                    onPointerEnter={() => {
                                      if (draggingSource) {
                                        setHoveredTargetKey(portKey);
                                      }
                                    }}
                                    onPointerLeave={() => {
                                      if (hoveredTargetKey === portKey) {
                                        setHoveredTargetKey(null);
                                      }
                                    }}
                                    className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition select-none ${
                                      isDragHovered
                                        ? 'ring-2 ring-emerald-500 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 scale-105'
                                        : isDragOrigin
                                        ? 'ring-2 ring-indigo-500 border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40'
                                        : isActiveVar
                                        ? 'border-2 bg-neutral-50 dark:bg-neutral-800/90 shadow-2xs'
                                        : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 opacity-85 hover:opacity-100'
                                    }`}
                                    style={
                                      isActiveVar && !isDragHovered
                                        ? { borderColor: primaryColor }
                                        : undefined
                                    }
                                  >
                                    {/* INCOMING TARGET PORT (Left Side of Variant Chip) */}
                                    <button
                                      type="button"
                                      ref={(el) => {
                                        inPortRefs.current[portKey] = el;
                                      }}
                                      title={`Drop target: Connect into ${screen.label} (${v.shortLabel})`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (
                                          draggingSource &&
                                          !(
                                            draggingSource.screenId ===
                                              screen.id &&
                                            draggingSource.variantId === v.id
                                          )
                                        ) {
                                          createOrUpdateConnection(
                                            draggingSource.screenId,
                                            draggingSource.variantId,
                                            screen.id,
                                            v.id
                                          );
                                          setDraggingSource(null);
                                          setHoveredTargetKey(null);
                                        }
                                      }}
                                      className={`w-4 h-4 rounded-full flex items-center justify-center transition border ${
                                        isDragHovered
                                          ? 'bg-emerald-500 border-emerald-300 text-white scale-125'
                                          : hasInLink
                                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                                          : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 text-neutral-400 hover:border-emerald-500'
                                      }`}
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                    </button>

                                    {/* Variant Select Button */}
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectScreenVariant(screen.id, v.id);
                                      }}
                                      className="text-left px-1 cursor-pointer"
                                    >
                                      <div className="flex items-center gap-1">
                                        <span
                                          className="text-[10px] font-extrabold"
                                          style={
                                            isActiveVar
                                              ? { color: primaryColor }
                                              : undefined
                                          }
                                        >
                                          {v.shortLabel}
                                        </span>
                                        {isActiveVar && (
                                          <CheckCircle2
                                            size={10}
                                            style={{ color: primaryColor }}
                                          />
                                        )}
                                      </div>
                                    </button>

                                    {/* OUTGOING SOURCE DRAG HANDLE (Right Side of Variant Chip) */}
                                    <button
                                      type="button"
                                      ref={(el) => {
                                        outPortRefs.current[portKey] = el;
                                      }}
                                      onPointerDown={(e) =>
                                        startWireDrag(e, screen.id, v.id)
                                      }
                                      title={`Drag from here to connect ${screen.label} (${v.shortLabel}) to another screen variant`}
                                      className={`w-5 h-5 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing transition border ${
                                        hasOutLink
                                          ? 'text-white border-transparent shadow-2xs'
                                          : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 text-neutral-500 hover:text-white hover:border-transparent'
                                      }`}
                                      style={
                                        hasOutLink
                                          ? { backgroundColor: primaryColor }
                                          : undefined
                                      }
                                    >
                                      <ArrowRight size={10} />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Outgoing Route Pills for this Screen */}
                          {outgoingLinks.length > 0 && (
                            <div className="mt-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap items-center gap-1.5">
                              <span className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-400">
                                Routes Out:
                              </span>
                              {outgoingLinks.map((link) => {
                                const isSel = selectedConnectionId === link.id;
                                return (
                                  <div
                                    key={link.id}
                                    onClick={() => setSelectedConnectionId(link.id)}
                                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 cursor-pointer border transition ${
                                      isSel
                                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                                        : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                                    }`}
                                  >
                                    <span className="font-mono text-[9px] opacity-75">
                                      [{link.sourceVariant.toUpperCase()}]
                                    </span>
                                    <span className="text-neutral-400">
                                      ({link.triggerLabel})
                                    </span>
                                    <ArrowRight size={10} />
                                    <span
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectScreenVariant(
                                          link.targetScreenId,
                                          link.targetVariant
                                        );
                                      }}
                                      className="font-extrabold underline decoration-dotted hover:opacity-80"
                                      style={{ color: primaryColor }}
                                    >
                                      {getScreenLabel(link.targetScreenId)} [
                                      {link.targetVariant.toUpperCase()}]
                                    </span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteConnection(link.id);
                                      }}
                                      className="ml-0.5 text-neutral-400 hover:text-rose-500"
                                      title="Remove route"
                                    >
                                      <X size={10} />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Navigation Flow Summary Table + Live Simulator Runner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={15} style={{ color: primaryColor }} />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
              Defined Navigation Flow Table ({connections.length} Routes)
            </h4>
          </div>
          <span className="text-[11px] text-neutral-400">
            Click any route to test transition in the Mobile Simulator
          </span>
        </div>

        {connections.length === 0 ? (
          <div className="p-6 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 text-center space-y-2">
            <p className="text-xs font-bold text-neutral-600 dark:text-neutral-300">
              No navigation links defined yet.
            </p>
            <p className="text-[11px] text-neutral-400">
              Drag from any variant&apos;s right arrow port (●→) to another variant&apos;s left port (→●), or click Auto-Wire Default App Flow.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {connections.map((conn, idx) => {
              const isSelected = selectedConnectionId === conn.id;
              return (
                <div
                  key={conn.id}
                  onClick={() => setSelectedConnectionId(conn.id)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition ${
                    isSelected
                      ? 'border-2 border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20'
                      : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white truncate">
                      <span className="text-[10px] font-mono text-neutral-400">
                        #{idx + 1}
                      </span>
                      <span className="truncate">
                        {getScreenLabel(conn.sourceScreenId)}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-neutral-200 dark:bg-neutral-800 text-[9px] font-mono">
                        {conn.sourceVariant.toUpperCase()}
                      </span>
                      <ArrowRight size={12} className="text-neutral-400 flex-shrink-0" />
                      <span
                        className="truncate font-extrabold"
                        style={{ color: primaryColor }}
                      >
                        {getScreenLabel(conn.targetScreenId)}
                      </span>
                      <span
                        className="px-1.5 py-0.2 rounded text-[9px] font-mono text-white"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {conn.targetVariant.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-neutral-500">
                        Trigger: <strong>{conn.triggerLabel}</strong>
                      </span>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        {conn.transitionType || 'push'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectScreenVariant(
                          conn.targetScreenId,
                          conn.targetVariant
                        );
                      }}
                      title="Fire Navigation Route in Phone Preview"
                      className="px-2 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-[10px] font-extrabold text-neutral-700 dark:text-neutral-200 flex items-center gap-1"
                    >
                      <Play size={10} />
                      <span>Test</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteConnection(conn.id);
                      }}
                      className="p-1 rounded-lg text-neutral-400 hover:text-rose-600"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Generated React Navigation TypeScript Code Modal */}
      {showRouteCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Code2 size={18} style={{ color: primaryColor }} />
                <div>
                  <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                    Generated React Navigation Graph ({projectName})
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    Auto-synthesized from your {connections.length} drag-and-drop variant connections
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowRouteCodeModal(false)}
                className="p-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 max-h-[65vh] overflow-y-auto bg-neutral-950 text-emerald-400 font-mono text-xs leading-relaxed">
              <pre className="whitespace-pre-wrap">
                {`// Auto-Generated Navigation Flow Router for ${projectName}
// Total Wired Variant Routes: ${connections.length}

export const APP_NAVIGATION_GRAPH = [
${connections
  .map(
    (c) => `  {
    from: { screen: "${c.sourceScreenId}", variant: "${c.sourceVariant}" },
    to: { screen: "${c.targetScreenId}", variant: "${c.targetVariant}" },
    trigger: "${c.triggerLabel}",
    presentation: "${c.transitionType || 'push'}",
  }`
  )
  .join(',\n')}
] as const;

export function navigateByFlowTrigger(
  currentScreen: string,
  currentVariant: string,
  triggerName?: string
) {
  const match = APP_NAVIGATION_GRAPH.find(
    (edge) =>
      edge.from.screen === currentScreen &&
      edge.from.variant === currentVariant &&
      (!triggerName || edge.trigger === triggerName)
  );
  return match ? match.to : null;
}`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualNavigationLinkBuilder;
