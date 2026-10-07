import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Zap,
  Tv,
  Star,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  getVpnThemeScopeStyle,
  useVpnDesignSystem,
} from '../../../styles/vpnDesignSystem';

export interface ServersVarient1Props {
  variant?: 'varient_1' | 'varient_2' | 'varient_3' | 'varient_4' | 'varient_5';
  onConnectServer?: () => void;
  onTriggerToast?: (msg: string) => void;
}

type ServerFilterTab = 'all' | 'recommended' | 'streaming';

export const ServersVarient1: React.FC<ServersVarient1Props> = ({
  variant = 'varient_1',
  onConnectServer,
  onTriggerToast,
}) => {
  const {
    palette,
    activeFont,
    isDark,
    colorPresetId,
    servers,
    selectedServer,
    setSelectedServer,
    setIsConnected,
    toggleFavoriteServer,
  } = useVpnDesignSystem();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ServerFilterTab>('all');
  const [expandedCountryId, setExpandedCountryId] =
    useState<string>('ch_zurich_04');
  const [sortByLatency, setSortByLatency] = useState(true);

  const optimalNode =
    servers.find((s) => s.id === 'de_frankfurt_12') || servers[0];

  const filteredServers = servers
    .filter((srv) => {
      const matchesTab =
        activeTab === 'all' ? true : srv.category === activeTab;
      const matchesSearch =
        srv.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.badge.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    })
    .sort((a, b) => (sortByLatency ? a.pingMs - b.pingMs : 0));

  return (
    <div
      className="vpn-theme-scope px-4 pt-2 pb-6 space-y-4 select-none"
      style={getVpnThemeScopeStyle(palette, activeFont)}
      data-vpn-dark={isDark ? 'true' : 'false'}
      data-vpn-preset={colorPresetId}
    >
      {/* 1. SEARCH BAR + FILTER BUTTON (Exact Image 2) */}
      <div className="flex items-center gap-2.5">
        <div
          className="flex-1 h-[44px] rounded-2xl border px-3.5 flex items-center gap-2.5"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.border,
          }}
        >
          <Search
            size={16}
            style={{ color: palette.textSecondary }}
            className="flex-shrink-0"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country, city or streaming..."
            className="w-full text-[13px] bg-transparent focus:outline-none"
            style={{ color: palette.textPrimary }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="cursor-pointer"
              style={{ color: palette.textSecondary }}
            >
              <X size={14} />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            setSortByLatency((prev) => !prev);
            onTriggerToast?.(
              `Sorted nodes by ${!sortByLatency ? 'Lowest Latency' : 'Default'}`
            );
          }}
          className="w-[44px] h-[44px] rounded-2xl border flex items-center justify-center flex-shrink-0 cursor-pointer"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.border,
            color: palette.textPrimary,
          }}
          title="Sort by Latency"
        >
          <SlidersHorizontal size={17} />
        </button>
      </div>

      {/* 2. FILTER PILLS (All Locations 114 | Recommended | Streaming - Exact Image 2) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className="h-[36px] px-3.5 rounded-full text-[12px] font-extrabold flex items-center gap-1.5 flex-shrink-0 cursor-pointer transition"
          style={{
            backgroundColor:
              activeTab === 'all' ? palette.primary : palette.cardBackground,
            color:
              activeTab === 'all' ? palette.primaryText : palette.textSecondary,
            border:
              activeTab === 'all' ? 'none' : `1px solid ${palette.border}`,
          }}
        >
          <span>All Locations</span>
          <span
            className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold"
            style={{
              backgroundColor:
                activeTab === 'all'
                  ? 'rgba(0,0,0,0.18)'
                  : palette.primarySoft,
              color:
                activeTab === 'all' ? palette.primaryText : palette.primary,
            }}
          >
            114
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('recommended')}
          className="h-[36px] px-3.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 flex-shrink-0 cursor-pointer transition"
          style={{
            backgroundColor:
              activeTab === 'recommended'
                ? palette.primary
                : palette.cardBackground,
            color:
              activeTab === 'recommended'
                ? palette.primaryText
                : palette.textSecondary,
            border:
              activeTab === 'recommended'
                ? 'none'
                : `1px solid ${palette.border}`,
          }}
        >
          <Zap size={13} className="text-emerald-400" />
          <span>Recommended</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('streaming')}
          className="h-[36px] px-3.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 flex-shrink-0 cursor-pointer transition"
          style={{
            backgroundColor:
              activeTab === 'streaming'
                ? palette.primary
                : palette.cardBackground,
            color:
              activeTab === 'streaming'
                ? palette.primaryText
                : palette.textSecondary,
            border:
              activeTab === 'streaming'
                ? 'none'
                : `1px solid ${palette.border}`,
          }}
        >
          <Tv size={13} className="text-amber-400" />
          <span>Streaming</span>
        </button>
      </div>

      {/* 3. OPTIMAL NODE DETECTED HERO CARD (Frankfurt, Germany - Exact Image 2) */}
      <div
        className="rounded-2xl border p-4 space-y-3"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.primaryBorder,
          backgroundImage: `linear-gradient(135deg, ${palette.primarySoft} 0%, transparent 70%)`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
              OPTIMAL NODE DETECTED
            </span>
          </div>
          <span
            className="px-2.5 py-0.5 rounded-md text-[10px] font-bold"
            style={{
              backgroundColor: palette.surface,
              color: palette.textPrimary,
            }}
          >
            Fastest Route
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border"
              style={{
                backgroundColor: palette.surface,
                borderColor: palette.border,
              }}
            >
              {optimalNode.flag}
            </div>
            <div className="min-w-0">
              <div
                className="text-[16px] font-extrabold truncate"
                style={{ color: palette.textPrimary }}
              >
                {optimalNode.city}, {optimalNode.country}
              </div>
              <div className="flex items-center gap-2 text-[11px] mt-0.5">
                <span className="font-extrabold text-emerald-400">
                  {optimalNode.pingMs} ms
                </span>
                <span style={{ color: palette.textMuted }}>•</span>
                <span style={{ color: palette.textSecondary }}>
                  {optimalNode.bandwidth}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedServer(optimalNode);
              setIsConnected(true);
              onTriggerToast?.(
                `Connected to Optimal Node: ${optimalNode.city} (${optimalNode.pingMs}ms)`
              );
              onConnectServer?.();
            }}
            className="h-9 px-4 rounded-xl text-[12px] font-extrabold flex-shrink-0 cursor-pointer shadow-md transition active:scale-95"
            style={{
              backgroundColor: palette.primary,
              color: palette.primaryText,
            }}
          >
            {selectedServer.id === optimalNode.id ? 'Connected' : 'Connect'}
          </button>
        </div>

        {/* Server Load Bar */}
        <div
          className="rounded-xl px-3 py-2 flex items-center justify-between gap-3 text-[11px]"
          style={{ backgroundColor: palette.surface }}
        >
          <span
            className="font-bold flex-shrink-0"
            style={{ color: palette.textSecondary }}
          >
            Server Load:
          </span>
          <div className="flex-1 h-1.5 rounded-full bg-black/30 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-400"
              style={{ width: `${optimalNode.loadPercent}%` }}
            />
          </div>
          <span className="font-extrabold text-emerald-400">
            {optimalNode.loadPercent}%
          </span>
          <span
            className="text-[10px] font-mono"
            style={{ color: palette.textMuted }}
          >
            {optimalNode.protocol}
          </span>
        </div>
      </div>

      {/* 4. GLOBAL CORE NODES ACCORDION LIST (Exact Image 2) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <span
            className="text-[11px] font-extrabold uppercase tracking-wider"
            style={{ color: palette.textSecondary }}
          >
            GLOBAL CORE NODES
          </span>
          <span
            className="text-[11px] font-semibold"
            style={{ color: palette.textSecondary }}
          >
            Sorted by Latency
          </span>
        </div>

        {variant === 'varient_2' ? (
          /* V2: 2-Column Server Node Bento Grid */
          <div className="grid grid-cols-2 gap-2.5">
            {filteredServers.map((srv) => {
              const isCurrent = selectedServer.id === srv.id;
              return (
                <div
                  key={srv.id}
                  onClick={() => {
                    setSelectedServer(srv);
                    setIsConnected(true);
                    onTriggerToast?.(`Switched tunnel to ${srv.city}`);
                    onConnectServer?.();
                  }}
                  className="rounded-2xl border p-3.5 space-y-2.5 cursor-pointer transition"
                  style={{
                    backgroundColor: palette.cardBackground,
                    borderColor: isCurrent ? palette.primary : palette.border,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{srv.flag}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-extrabold">
                      {srv.pingMs} ms
                    </span>
                  </div>
                  <div>
                    <div
                      className="text-[13px] font-extrabold truncate"
                      style={{ color: palette.textPrimary }}
                    >
                      {srv.country}
                    </div>
                    <div
                      className="text-[11px] truncate"
                      style={{ color: palette.textSecondary }}
                    >
                      {srv.city} {srv.nodeNumber} • {srv.loadPercent}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_3' ? (
          /* V3: High-Density Latency Telemetry Ledger */
          <div
            className="rounded-2xl border divide-y overflow-hidden"
            style={{
              backgroundColor: palette.cardBackground,
              borderColor: palette.border,
            }}
          >
            {filteredServers.map((srv) => {
              const isCurrent = selectedServer.id === srv.id;
              return (
                <div
                  key={srv.id}
                  onClick={() => {
                    setSelectedServer(srv);
                    setIsConnected(true);
                    onTriggerToast?.(`Switched tunnel to ${srv.city}`);
                    onConnectServer?.();
                  }}
                  className="p-3 flex items-center justify-between gap-2 cursor-pointer transition"
                  style={{
                    borderColor: palette.border,
                    backgroundColor: isCurrent
                      ? palette.primarySoft
                      : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl">{srv.flag}</span>
                    <div className="min-w-0">
                      <div
                        className="text-[13px] font-extrabold truncate"
                        style={{ color: palette.textPrimary }}
                      >
                        {srv.city}, {srv.country}
                      </div>
                      <div
                        className="text-[10px] font-mono"
                        style={{ color: palette.textSecondary }}
                      >
                        {srv.virtualIp} • {srv.asn}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[11px] font-mono font-extrabold text-emerald-400">
                      {srv.pingMs}ms
                    </span>
                    <span
                      className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold"
                      style={{
                        backgroundColor: isCurrent
                          ? palette.primary
                          : palette.surface,
                        color: isCurrent
                          ? palette.primaryText
                          : palette.textPrimary,
                      }}
                    >
                      {isCurrent ? 'Active' : 'Connect'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_4' ? (
          /* V4: Accent Left-Rail Server Cards */
          <div className="space-y-2.5">
            {filteredServers.map((srv) => {
              const isCurrent = selectedServer.id === srv.id;
              return (
                <div
                  key={srv.id}
                  onClick={() => {
                    setSelectedServer(srv);
                    setIsConnected(true);
                    onTriggerToast?.(`Switched tunnel to ${srv.city}`);
                    onConnectServer?.();
                  }}
                  className="rounded-2xl border border-l-4 p-3.5 flex items-center justify-between gap-3 cursor-pointer transition"
                  style={{
                    backgroundColor: palette.cardBackground,
                    borderColor: palette.border,
                    borderLeftColor: isCurrent
                      ? palette.primary
                      : '#10B981',
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl">{srv.flag}</span>
                    <div className="min-w-0">
                      <div
                        className="text-[14px] font-extrabold truncate"
                        style={{ color: palette.textPrimary }}
                      >
                        {srv.country} ({srv.city})
                      </div>
                      <div
                        className="text-[11px] truncate"
                        style={{ color: palette.textSecondary }}
                      >
                        {srv.datacenter}
                      </div>
                    </div>
                  </div>
                  <span
                    className="px-3 py-1.5 rounded-xl text-[11px] font-extrabold flex-shrink-0"
                    style={{
                      backgroundColor: palette.primarySoft,
                      color: palette.primary,
                    }}
                  >
                    {srv.pingMs} ms
                  </span>
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_5' ? (
          /* V5: Brutalist Hard-Shadow Server Tiles */
          <div className="space-y-3">
            {filteredServers.map((srv) => {
              const isCurrent = selectedServer.id === srv.id;
              return (
                <div
                  key={srv.id}
                  onClick={() => {
                    setSelectedServer(srv);
                    setIsConnected(true);
                    onTriggerToast?.(`Switched tunnel to ${srv.city}`);
                    onConnectServer?.();
                  }}
                  className="rounded-xl border-2 p-3.5 flex items-center justify-between gap-3 cursor-pointer transition"
                  style={{
                    backgroundColor: palette.cardBackground,
                    borderColor: isCurrent ? palette.primary : palette.border,
                    boxShadow: `3px 3px 0px ${
                      isCurrent ? palette.primary : palette.border
                    }`,
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl">{srv.flag}</span>
                    <div className="min-w-0">
                      <div
                        className="text-[13px] font-black uppercase tracking-wide truncate"
                        style={{ color: palette.textPrimary }}
                      >
                        {srv.country} // {srv.nodeNumber}
                      </div>
                      <div
                        className="text-[11px] font-mono"
                        style={{ color: palette.textSecondary }}
                      >
                        {srv.pingMs}MS • {srv.loadPercent}% LOAD • {srv.badge}
                      </div>
                    </div>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded text-[10px] font-extrabold uppercase"
                    style={{
                      backgroundColor: palette.primary,
                      color: palette.primaryText,
                    }}
                  >
                    {isCurrent ? 'LOCKED' : 'ROUTE'}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          /* V1 (Default): Accordion Country & City Sub-Nodes List */
          <div className="space-y-2.5">
            {filteredServers.map((srv) => {
            const isExpanded = expandedCountryId === srv.id;
            const isCurrent = selectedServer.id === srv.id;
            const pingColor =
              srv.pingMs < 40
                ? 'text-emerald-400'
                : srv.pingMs < 120
                ? 'text-amber-400'
                : 'text-rose-400';

            return (
              <div
                key={srv.id}
                className="rounded-2xl border overflow-hidden transition"
                style={{
                  backgroundColor: palette.cardBackground,
                  borderColor: isCurrent
                    ? palette.primaryBorder
                    : palette.border,
                }}
              >
                <div
                  onClick={() =>
                    setExpandedCountryId(isExpanded ? '' : srv.id)
                  }
                  className="p-3.5 flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl flex-shrink-0">{srv.flag}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[14px] font-extrabold truncate"
                          style={{ color: palette.textPrimary }}
                        >
                          {srv.country}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-md text-[10px] font-bold flex-shrink-0"
                          style={{
                            backgroundColor: palette.surface,
                            color:
                              srv.badge.includes('BBC') ||
                              srv.badge.includes('Netflix')
                                ? '#F59E0B'
                                : palette.textSecondary,
                          }}
                        >
                          {srv.badge}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className={`font-bold ${pingColor}`}>
                          {srv.pingMs} ms
                        </span>
                        <span style={{ color: palette.textMuted }}>•</span>
                        <span style={{ color: palette.textSecondary }}>
                          {srv.loadPercent}% Load
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteServer(srv.id);
                      }}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        size={16}
                        className={
                          srv.isFavorite
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-500'
                        }
                      />
                    </button>
                    {isExpanded ? (
                      <ChevronUp
                        size={16}
                        style={{ color: palette.textSecondary }}
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        style={{ color: palette.textSecondary }}
                      />
                    )}
                  </div>
                </div>

                {/* Expanded Sub-Nodes (Zurich #04, Geneva #02, etc.) */}
                {isExpanded && srv.subNodes && (
                  <div
                    className="px-3.5 pb-3 pt-1 border-t space-y-2"
                    style={{
                      borderColor: palette.border,
                      backgroundColor: palette.surface,
                    }}
                  >
                    {srv.subNodes.map((sub) => (
                      <div
                        key={sub.id}
                        className="py-1.5 flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                          <div className="min-w-0">
                            <div
                              className="text-[13px] font-bold truncate"
                              style={{ color: palette.textPrimary }}
                            >
                              {sub.title}
                            </div>
                            <div
                              className="text-[11px]"
                              style={{ color: palette.textSecondary }}
                            >
                              {sub.subtitle}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 flex-shrink-0">
                          <span className="text-[11px] font-bold text-emerald-400">
                            {sub.pingMs} ms
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedServer(srv);
                              setIsConnected(true);
                              onTriggerToast?.(`Switched tunnel to ${sub.title}`);
                              onConnectServer?.();
                            }}
                            className="h-7 px-3 rounded-lg text-[11px] font-extrabold cursor-pointer transition"
                            style={{
                              backgroundColor: palette.primarySoft,
                              color: palette.primary,
                            }}
                          >
                            Switch
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          </div>
        )}
      </div>

      {/* 5. BOTTOM STEALTH FOOTER PILL (Exact Image 2) */}
      <div
        className="rounded-2xl border p-3 flex items-center justify-between gap-2"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <ShieldCheck
            size={16}
            style={{ color: palette.primary }}
            className="flex-shrink-0"
          />
          <span
            className="text-[11px] font-bold truncate"
            style={{ color: palette.textPrimary }}
          >
            ChaCha20-Poly1305 • DNS Leak Protected
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-extrabold flex-shrink-0">
          STEALTH ON
        </span>
      </div>
    </div>
  );
};

export default ServersVarient1;
