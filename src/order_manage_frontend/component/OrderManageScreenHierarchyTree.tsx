import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Eye,
  Check,
  Smartphone,
  Layers,
  FolderTree,
  Sparkles,
  Coins,
  Search as SearchIcon,
  Shield,
  CreditCard,
  Users,
  Calculator,
  FileText,
  Activity,
  Lock,
} from 'lucide-react';
import { AppTab } from '../components/BottomNav';
import { SubViewType } from '../components/OrderManageMobileApp';
import VisualNavigationLinkBuilder, {
  LinkableScreenItem,
  buildDefaultNavigationConnections,
} from '../../components/VisualNavigationLinkBuilder';
import { ScreenNavigationConnection } from '../../utils/customProjectsStore';

export type OrderManageVariant = 'v1' | 'v2' | 'v3';

export interface OrderManageScreenNode {
  id: string;
  name: string;
  type: 'tab' | 'view' | 'modal';
  tab: AppTab;
  subView: SubViewType;
  description: string;
  icon: React.ElementType;
  children?: OrderManageScreenNode[];
}

export const ORDER_MANAGE_HIERARCHY: OrderManageScreenNode[] = [
  {
    id: 'root_app',
    name: 'TR Connect Order Manage Root Application',
    type: 'tab',
    tab: 'dashboard',
    subView: null,
    description: 'Root Expo app shell with LedgerContext, ThemeContext & Security PIN.',
    icon: Coins,
    children: [
      {
        id: 'home_tab',
        name: 'Home Executive Dashboard',
        type: 'tab',
        tab: 'dashboard',
        subView: null,
        description: 'Net Position balance card, KPI metrics grid, pending emergency queue, fast action shortcuts.',
        icon: Coins,
        children: [
          {
            id: 'calculator_view',
            name: 'SAR / BDT Remittance Calculator',
            type: 'view',
            tab: 'dashboard',
            subView: 'calculator',
            description: 'Live SAR to BDT currency converter with spread margin.',
            icon: Calculator,
          },
          {
            id: 'activity_view',
            name: 'Audit Stream & Activity Log',
            type: 'view',
            tab: 'more',
            subView: 'activity',
            description: 'Real-time transaction audit history.',
            icon: Activity,
          },
        ],
      },
      {
        id: 'orders_tab',
        name: 'Orders & Fulfillment Hub',
        type: 'tab',
        tab: 'orders',
        subView: null,
        description: 'Filter orders by status (Pending, Delivered, Urgent, Agent, Personal).',
        icon: FileText,
        children: [
          {
            id: 'queue_view',
            name: 'Emergency Priority Dispatch Queue',
            type: 'view',
            tab: 'orders',
            subView: 'queue',
            description: 'Urgent priority dispatch board sorted by urgency.',
            icon: Sparkles,
          },
          {
            id: 'deliveries_view',
            name: 'Fulfillment & Delivery Archive',
            type: 'view',
            tab: 'orders',
            subView: 'deliveries',
            description: 'Delivered orders archive with proof receipts.',
            icon: FileText,
          },
        ],
      },
      {
        id: 'finance_tab',
        name: 'Finance & Riyal Treasury',
        type: 'tab',
        tab: 'finance',
        subView: null,
        description: 'Treasury balance, SAR Riyal ledger, payment disbursements, PnL analysis.',
        icon: CreditCard,
        children: [
          {
            id: 'riyal_view',
            name: 'SAR Riyal Settlement Ledger',
            type: 'view',
            tab: 'finance',
            subView: 'riyal',
            description: 'SAR Riyal expected vs received ledger entries and settlements.',
            icon: Coins,
          },
          {
            id: 'payments_view',
            name: 'Disbursements & Payment Outflows',
            type: 'view',
            tab: 'finance',
            subView: 'payments',
            description: 'Recorded disbursement vouchers with method tag and proof.',
            icon: CreditCard,
          },
          {
            id: 'profit_loss_view',
            name: 'Profit & Loss Analytical Breakdown',
            type: 'view',
            tab: 'finance',
            subView: 'profitLoss',
            description: 'Revenue, delivered remittance, payments paid out, and net margin.',
            icon: Sparkles,
          },
          {
            id: 'due_view',
            name: 'Outstanding Due Ledger',
            type: 'view',
            tab: 'finance',
            subView: 'due',
            description: 'Pending receivables tracking and settle actions.',
            icon: CreditCard,
          },
        ],
      },
      {
        id: 'customers_tab',
        name: 'Clients & Customer Directory',
        type: 'tab',
        tab: 'customers',
        subView: null,
        description: 'Customer contact cards, transaction history, outstanding receivables.',
        icon: Users,
        children: [
          {
            id: 'customer_detail_view',
            name: 'Customer 360 Profile Detail',
            type: 'view',
            tab: 'customers',
            subView: 'customerDetail',
            description: 'Comprehensive customer profile with past order history.',
            icon: Users,
          },
        ],
      },
      {
        id: 'more_tab',
        name: 'More & Management Settings',
        type: 'tab',
        tab: 'more',
        subView: null,
        description: 'Security PIN, reports exporter (PDF/JSON), reset data, exchange rate controls.',
        icon: Shield,
        children: [
          {
            id: 'history_view',
            name: 'Historical Archives',
            type: 'view',
            tab: 'more',
            subView: 'history',
            description: 'Historical archives of all completed orders.',
            icon: FileText,
          },
          {
            id: 'pin_lock_screen',
            name: '4-Digit Executive PIN Security Screen',
            type: 'modal',
            tab: 'dashboard',
            subView: null,
            description: 'Hardware-grade PIN lock screen protecting client transaction data.',
            icon: Lock,
          },
        ],
      },
    ],
  },
];

interface OrderManageScreenHierarchyTreeProps {
  currentTab: AppTab;
  currentSubView: SubViewType;
  variantsMap: Record<string, OrderManageVariant>;
  onSelectNode: (tab: AppTab, subView: SubViewType, nodeId?: string) => void;
  onSetVariant: (nodeId: string, variant: OrderManageVariant) => void;
  accentColor?: string;
}

export const OrderManageScreenHierarchyTree: React.FC<OrderManageScreenHierarchyTreeProps> = ({
  currentTab,
  currentSubView,
  variantsMap,
  onSelectNode,
  onSetVariant,
  accentColor = '#10b981',
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    root_app: true,
    home_tab: true,
    orders_tab: true,
    finance_tab: true,
    customers_tab: true,
    more_tab: true,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [hierarchyMode, setHierarchyMode] = useState<'link_builder' | 'tree'>('link_builder');

  const flattenedNodes: OrderManageScreenNode[] = [];
  const collectNodes = (nodes: OrderManageScreenNode[]) => {
    nodes.forEach((n) => {
      flattenedNodes.push(n);
      if (n.children) collectNodes(n.children);
    });
  };
  collectNodes(ORDER_MANAGE_HIERARCHY);

  const linkableScreens: LinkableScreenItem[] = flattenedNodes.map((n) => {
    const activeVar = variantsMap[n.id] || 'v1';
    return {
      id: n.id,
      label: n.name,
      moduleGroup: n.type === 'tab' ? 'Primary Bottom Tabs' : 'Sub-Views & Security Flows',
      roleBadge: n.type.toUpperCase(),
      filePath: `src/screens/${n.id}/${activeVar}/index.tsx`,
      activeVariant: activeVar,
      variants: [
        { id: 'v1', label: 'V1 Classic', shortLabel: 'V1' },
        { id: 'v2', label: 'V2 Bento', shortLabel: 'V2' },
        { id: 'v3', label: 'V3 Glass', shortLabel: 'V3' },
      ],
    };
  });

  const [orderNavConnections, setOrderNavConnections] = useState<ScreenNavigationConnection[]>(
    () => buildDefaultNavigationConnections(linkableScreens, false)
  );

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderNode = (node: OrderManageScreenNode, level = 0) => {
    const isExpanded = expandedNodes[node.id] ?? false;
    const hasChildren = Boolean(node.children && node.children.length > 0);
    const isCurrentActive =
      node.type !== 'modal' &&
      currentTab === node.tab &&
      currentSubView === node.subView;

    const currentVariant = variantsMap[node.id] || 'v1';
    const Icon = node.icon;

    if (
      searchQuery.trim() &&
      !node.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !node.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      if (!node.children?.some((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return null;
      }
    }

    return (
      <div key={node.id} className="select-none my-1">
        {/* Node Line Item */}
        <div
          onClick={() => onSelectNode(node.tab, node.subView, node.id)}
          className={`group flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
            isCurrentActive
              ? 'border-2 shadow-md bg-[#1a1d26]'
              : 'border-neutral-800 bg-[#12141a] hover:border-neutral-700 hover:bg-[#161822]'
          }`}
          style={{
            marginLeft: `${level * 18}px`,
            borderColor: isCurrentActive ? accentColor : undefined,
          }}
        >
          {/* Left info & Expand Toggle */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {hasChildren ? (
              <button
                onClick={(e) => toggleExpand(node.id, e)}
                className="p-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition flex-shrink-0"
              >
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
            ) : (
              <div className="w-5 flex-shrink-0" />
            )}

            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-sm"
              style={{
                backgroundColor: isCurrentActive ? accentColor : '#222530',
              }}
            >
              <Icon size={14} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white truncate">{node.name}</span>
                {isCurrentActive && (
                  <span
                    className="px-1.5 py-0.2 text-[9px] font-bold rounded text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    Active Preview
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 truncate">{node.description}</p>
            </div>
          </div>

          {/* Right Action: Variant Selector Pills */}
          <div className="flex items-center gap-1 flex-shrink-0 ml-3" onClick={(e) => e.stopPropagation()}>
            {(['v1', 'v2', 'v3'] as OrderManageVariant[]).map((v) => {
              const isSelected = currentVariant === v;
              return (
                <button
                  key={v}
                  onClick={() => onSetVariant(node.id, v)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition ${
                    isSelected
                      ? 'text-white shadow-sm'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                  style={
                    isSelected
                      ? { backgroundColor: accentColor }
                      : undefined
                  }
                >
                  {v.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Children Render */}
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {/* Search & Filter Header */}
      <div className="flex items-center justify-between gap-3 p-3 bg-[#12141a] rounded-xl border border-neutral-800">
        <div className="flex items-center gap-2 flex-1 bg-[#1a1d26] px-3 py-1.5 rounded-lg border border-neutral-800">
          <SearchIcon size={14} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Search Order Manage screen hierarchy tree..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
          />
        </div>
        <div className="flex items-center gap-2 text-[11px] text-neutral-400">
          <button
            type="button"
            onClick={() => setHierarchyMode('link_builder')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
              hierarchyMode === 'link_builder'
                ? 'text-white'
                : 'bg-[#1a1d26] text-neutral-400 hover:text-white'
            }`}
            style={
              hierarchyMode === 'link_builder' ? { backgroundColor: accentColor } : undefined
            }
          >
            Visual Link Builder
          </button>
          <button
            type="button"
            onClick={() => setHierarchyMode('tree')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
              hierarchyMode === 'tree'
                ? 'text-white'
                : 'bg-[#1a1d26] text-neutral-400 hover:text-white'
            }`}
            style={hierarchyMode === 'tree' ? { backgroundColor: accentColor } : undefined}
          >
            Tree Hierarchy
          </button>
        </div>
      </div>

      {/* Visual Link Builder or Tree Nodes List */}
      {hierarchyMode === 'link_builder' ? (
        <VisualNavigationLinkBuilder
          projectName="TR Connect Order Manage"
          screens={linkableScreens}
          currentScreenId={
            flattenedNodes.find(
              (n) => n.tab === currentTab && n.subView === currentSubView
            )?.id || 'home_tab'
          }
          primaryColor={accentColor}
          isSingleVariantMode={false}
          connections={orderNavConnections}
          onConnectionsChange={setOrderNavConnections}
          onSelectScreenVariant={(screenId, variantId) => {
            onSetVariant(screenId, (variantId as OrderManageVariant) || 'v1');
            const matched = flattenedNodes.find((n) => n.id === screenId);
            if (matched) {
              onSelectNode(matched.tab, matched.subView, matched.id);
            }
          }}
        />
      ) : (
        <div className="p-3 bg-[#0d0f14] rounded-2xl border border-neutral-800 space-y-1">
          {ORDER_MANAGE_HIERARCHY.map((rootNode) => renderNode(rootNode, 0))}
        </div>
      )}
    </div>
  );
};

export default OrderManageScreenHierarchyTree;
