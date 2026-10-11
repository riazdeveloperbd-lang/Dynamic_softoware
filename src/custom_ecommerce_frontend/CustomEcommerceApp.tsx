import React, { useState, useMemo, useRef, useLayoutEffect, useEffect } from 'react';
import JSZip from 'jszip';
import {
  LayoutGrid,
  FolderTree,
  Search,
  SlidersHorizontal,
  GripVertical,
  Eye,
  EyeOff,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Download,
  Palette,
  AppWindow,
  Home,
  Grid,
  Heart,
  ShoppingCart,
  User,
  Layers,
  CheckCircle2,
  Move,
  Smartphone,
  Flame,
  Star,
  Award,
  Plus,
  ChevronRight,
  Settings,
  Trash2,
  Type,
  Image as ImageIcon,
  ChevronDown,
  List,
  Video,
  Link2,
  FileText,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  CreditCard,
  Tag,
} from 'lucide-react';
import StudioDashboardShell, { StudioTab } from '../components/StudioDashboardShell';
import VisualNavigationLinkBuilder, {
  LinkableScreenItem,
  buildDefaultNavigationConnections,
} from '../components/VisualNavigationLinkBuilder';
import { ScreenNavigationConnection } from '../utils/customProjectsStore';
import {
  ALL_CUSTOM_ECOMMERCE_VARIANT_IDS,
  CUSTOM_ECOMMERCE_COLOR_PRESETS,
  CUSTOM_ECOMMERCE_FONT_PRESETS,
  CUSTOM_ECOMMERCE_PRODUCTS,
  CUSTOM_ECOMMERCE_SCREENS_REGISTRY,
  CustomEcommerceFlowGroup,
  CustomEcommerceScreenDefinition,
  CustomEcommerceScreenId,
  CustomEcommerceVariantId,
} from './data/customEcommerceRegistry';
import { CustomEcommerceAuthScreens } from './components/CustomEcommerceAuthScreens';
import { CustomEcommerceDiscoveryScreens } from './components/CustomEcommerceDiscoveryScreens';
import { CustomEcommerceEngagementScreens } from './components/CustomEcommerceEngagementScreens';
import { CustomEcommerceCartCheckoutScreens } from './components/CustomEcommerceCartCheckoutScreens';
import { CustomEcommerceAccountScreens } from './components/CustomEcommerceAccountScreens';
import { CustomEcommerceClothingScreens } from './components/CustomEcommerceClothingScreens';
import { CustomEcommerceGroceryScreens } from './components/CustomEcommerceGroceryScreens';
import { CustomEcommerceGadgetScreens } from './components/CustomEcommerceGadgetScreens';
import {
  ReorderableScreenContent,
  ExistingSectionStyleOverride,
} from './components/ReorderableScreenContent';

export interface CustomEcommerceAppProps {
  onSwitchProject?: (projectId: string) => void;
}

export type DroppedItemShadowPreset = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';

const DROPPED_SHADOW_CSS_MAP: Record<DroppedItemShadowPreset, string> = {
  none: 'none',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 8px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 20px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.12)',
  xl: '0 20px 28px -5px rgba(0, 0, 0, 0.26), 0 8px 10px -6px rgba(0, 0, 0, 0.14)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.42)',
  inner: 'inset 0 2px 6px 0 rgba(0, 0, 0, 0.2)',
};

export interface DroppedLibraryItemStyle {
  // Dimensions
  width?: string; // '100%' | '90%' | '75%' | '50%' | 'auto' | '240px'
  height?: string; // 'auto' | '60px' | '100px' | '140px' | '200px'
  minHeight?: number;
  // Margin (All or Individual Top / Right / Bottom / Left)
  margin?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  // Padding (All or Individual Top / Right / Bottom / Left)
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  // Colors & Gradients
  accentColor?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  textColor?: string;
  // Borders & Radius
  borderRadius?: number;
  borderWidth?: number;
  borderStyle?: 'none' | 'solid' | 'dashed' | 'dotted';
  borderColor?: string;
  // Effects
  shadow?: DroppedItemShadowPreset;
  opacity?: number; // 10 - 100
  // Typography & Alignment
  fontSize?: 'sm' | 'md' | 'lg';
  fontSizePx?: number;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  letterSpacing?: number;
  lineHeight?: number;
  // Featured Grid / Media Options
  imageRatio?: '1:1' | '4:5' | '16:9' | '3:4' | 'mixed';
  priceTagPosition?: 'overlay-bottom-right' | 'overlay-top-left' | 'inline-footer';
}

export interface FlatListCustomItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  badge?: string;
  imageUrl?: string;
}

export type PrototypeTriggerType =
  | 'on_tap'
  | 'on_double_tap'
  | 'on_long_press'
  | 'on_drag'
  | 'on_hover'
  | 'after_delay';

export type PrototypeActionType =
  | 'navigate_to'
  | 'open_overlay'
  | 'swap_overlay'
  | 'close_overlay'
  | 'back'
  | 'scroll_to'
  | 'open_link';

export type PrototypeAnimationType =
  | 'instant'
  | 'dissolve'
  | 'smart_animate'
  | 'move_in'
  | 'move_out'
  | 'push'
  | 'slide_in'
  | 'slide_out';

export type PrototypeOverlayType = 'modal' | 'bottom_sheet' | 'drawer' | 'bottom_modal';

export interface PrototypeInteractionConfig {
  enabled?: boolean;
  trigger?: PrototypeTriggerType;
  action?: PrototypeActionType;
  destinationScreenId?: CustomEcommerceScreenId;
  destinationVariant?: CustomEcommerceVariantId;
  overlayType?: PrototypeOverlayType;
  overlayPosition?: 'center' | 'bottom' | 'left';
  animation?: PrototypeAnimationType;
  direction?: 'left' | 'right' | 'up' | 'down';
  easing?: 'ease_in_out' | 'ease_out' | 'linear' | 'spring';
  durationMs?: number;
  delayMs?: number;
  externalUrl?: string;
  triggerLabel?: string;
}

export interface DroppedLibraryItemData {
  title?: string;
  subtitle?: string;
  price?: string;
  badgeText?: string;
  buttonText?: string;
  imageUrl?: string;
  optionsCsv?: string;
  // Second column fields for 2-Column Featured Grid
  secondTitle?: string;
  secondSubtitle?: string;
  secondPrice?: string;
  secondBadgeText?: string;
  secondImageUrl?: string;
  // <FlatList /> Configuration (Item Count Input, Total Item Count, Columns, Rows, Render Card Mode: With Image / Without Image, & Custom Items)
  flatListItemCount?: number;
  flatListColumns?: 1 | 2 | 3 | 4;
  flatListRows?: number;
  flatListCardVariant?: 'with_image' | 'without_image' | 'horizontal_image' | 'compact_row';
  flatListShowSearchInput?: boolean;
  flatListQuickAddInputText?: string;
  flatListCustomItems?: FlatListCustomItem[];
  // Figma-style Prototype Interaction Config on Dropped Component/Element
  prototypeConfig?: PrototypeInteractionConfig;
}

export interface DroppedLibraryItemInstance {
  instanceId: string;
  itemId: string;
  category: 'component' | 'element';
  label: string;
  data: DroppedLibraryItemData;
  style: DroppedLibraryItemStyle;
}

export interface ScreenBottomNavItem {
  id: CustomEcommerceScreenId;
  label: string;
  iconKey: 'home' | 'grid' | 'heart' | 'cart' | 'user';
  badgeCount?: number;
}

export interface DraggableScreenComponentBlock {
  id: string;
  label: string;
  subtitle: string;
  badge: string;
}

const DEFAULT_SCREEN_COMPONENT_BLOCKS: DraggableScreenComponentBlock[] = [
  {
    id: 'hero_banner',
    label: 'Hero Banners & Promo Slider',
    subtitle: 'Full-width campaign visual, discount badge & CTA',
    badge: 'HERO',
  },
  {
    id: 'category_list',
    label: 'Category Lists & Icon Pills',
    subtitle: 'Swipeable 4-column department & sub-category grid',
    badge: 'CATEGORIES',
  },
  {
    id: 'flash_deals',
    label: 'Flash Sales & Countdown Bar',
    subtitle: 'Live countdown timer with urgent deal highlights',
    badge: 'FLASH SALE',
  },
  {
    id: 'featured_grid',
    label: 'Featured Grid',
    subtitle: '2-column layout with flexible image ratios & inline price tags',
    badge: 'FEATURED GRID',
  },
  {
    id: 'product_grid',
    label: 'Product Grids & Quick Add',
    subtitle: '2-column product cards with price & 1-tap Add to Cart',
    badge: 'PRODUCTS',
  },
  {
    id: 'brand_spotlight',
    label: 'Brand Mall & Trust Badges',
    subtitle: 'Official warranty strip & free express return banner',
    badge: 'TRUST',
  },
  {
    id: 'reviews_ugc',
    label: 'Customer Reviews & Lookbook',
    subtitle: 'Verified buyer ratings & real outfit photo strip',
    badge: 'REVIEWS',
  },
];

const FLOW_GROUPS: Array<'ALL' | CustomEcommerceFlowGroup> = [
  'ALL',
  'Onboarding & Authentication',
  'Discovery & Navigation',
  'Product Engagement',
  'Cart & Checkout Pipeline',
  'Account & Post-Purchase',
  'A. Clothing Shop (Apparel & Fashion)',
  'B. Grocery Shop (FMCG & Daily Needs)',
  'C. Gadget Shop (Electronics & Hardware)',
];

export const CustomEcommerceApp: React.FC<CustomEcommerceAppProps> = ({
  onSwitchProject,
}) => {
  // Ordered Screens State so the user can Drag & Drop Screens to build their custom mobile flow
  const [orderedScreens, setOrderedScreens] = useState<CustomEcommerceScreenDefinition[]>(
    () => CUSTOM_ECOMMERCE_SCREENS_REGISTRY
  );

  const [activeStudioTab, setActiveStudioTab] = useState<StudioTab>('screens');
  const [screensViewMode, setScreensViewMode] = useState<'grid' | 'drag_flow' | 'hierarchy'>('grid');
  const [selectedFlowFilter, setSelectedFlowFilter] = useState<'ALL' | CustomEcommerceFlowGroup>('ALL');
  const [screenSearch, setScreenSearch] = useState('');
  const [leftRailGlobalSearch, setLeftRailGlobalSearch] = useState('');

  // 90% Width Big Modal State for viewing all selected variant screens in Rows & Columns
  const [isMultiSimulatorModalOpen, setIsMultiSimulatorModalOpen] = useState<boolean>(false);
  const [modalGridColumns, setModalGridColumns] = useState<2 | 3 | 4 | 5>(4);
  const [modalDeviceSize, setModalDeviceSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [modalContainerWidth, setModalContainerWidth] = useState<number>(1120);
  const [showComponentsDrawerInModal, setShowComponentsDrawerInModal] = useState<boolean>(false);

  // Left Sidebar inside 90% Modal: 2 Tabs ("component" | "element") + Drag & Drop onto any Existing or New Screen
  const [modalLeftSidebarOpen, setModalLeftSidebarOpen] = useState<boolean>(true);
  const [modalLeftTab, setModalLeftTab] = useState<'component' | 'element'>('component');
  const [modalPaletteSearch, setModalPaletteSearch] = useState<string>('');
  const [draggedLibraryItemId, setDraggedLibraryItemId] = useState<string | null>(null);
  const [dropTargetScreenId, setDropTargetScreenId] = useState<CustomEcommerceScreenId | null>(null);
  const [screenDroppedItems, setScreenDroppedItems] = useState<
    Record<string, DroppedLibraryItemInstance[]>
  >({});

  // Component Library <FlatList /> Builder Preset Options (Configured in the Component Library before/when adding or dragging onto any screen)
  const [libraryFlatListConfig, setLibraryFlatListConfig] = useState<{
    title: string;
    itemCount: number;
    columns: 1 | 2 | 3 | 4;
    rows: number;
    cardVariant: 'with_image' | 'without_image' | 'horizontal_image' | 'compact_row';
    newItemTitleInput: string;
    newItemPriceInput: string;
    customItems: FlatListCustomItem[];
  }>(() => ({
    title: 'Featured Products',
    itemCount: 4,
    columns: 2,
    rows: 2,
    cardVariant: 'with_image',
    newItemTitleInput: '',
    newItemPriceInput: '',
    customItems: CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 6).map((p, idx) => ({
      id: `lib_fl_${idx + 1}`,
      title: p.title,
      subtitle: p.category,
      price: `$${p.price}`,
      badge: idx === 0 ? 'HOT' : idx === 1 ? 'NEW' : `★ ${p.rating}`,
      imageUrl: p.image,
    })),
  }));

  // Helper: Synchronize libraryFlatListConfig changes both to future FlatLists AND to the currently selected FlatList on the active screen (if one is selected)
  const updateLibraryFlatListAndActive = (
    updater: (prev: typeof libraryFlatListConfig) => typeof libraryFlatListConfig
  ) => {
    setLibraryFlatListConfig((prev) => {
      const next = updater(prev);
      // If a FlatList component is currently selected on the active screen (or the most recent FlatList on activeScreen), sync its live data immediately!
      setScreenDroppedItems((currMap) => {
        const list = currMap[activeScreen] || [];
        if (list.length === 0) return currMap;
        const selectedId =
          selectedInspectorTarget?.type === 'item' &&
          selectedInspectorTarget.screenId === activeScreen
            ? selectedInspectorTarget.instanceId
            : null;
        let targetIdx = selectedId
          ? list.findIndex(
              (it) =>
                it.instanceId === selectedId && it.itemId.startsWith('comp_flatlist_')
            )
          : -1;
        if (targetIdx === -1) {
          for (let i = list.length - 1; i >= 0; i--) {
            if (list[i].itemId.startsWith('comp_flatlist_')) {
              targetIdx = i;
              break;
            }
          }
        }
        if (targetIdx === -1) return currMap;
        const copy = [...list];
        copy[targetIdx] = {
          ...copy[targetIdx],
          data: {
            ...copy[targetIdx].data,
            title: next.title,
            flatListItemCount: next.itemCount,
            flatListColumns: next.columns,
            flatListRows: next.rows,
            flatListCardVariant: next.cardVariant,
            flatListCustomItems: next.customItems.map((c) => ({ ...c })),
          },
        };
        return { ...currMap, [activeScreen]: copy };
      });
      return next;
    });
  };

  // Reusable Component Library <FlatList /> Option Fields Panel (Rendered inside Component Library, NOT on the mobile screen!)
  const renderComponentLibraryFlatListConfigurator = (isDarkSidebar: boolean) => {
    const fl = libraryFlatListConfig;
    const ensureItemsPool = (targetLen: number, currentPool: FlatListCustomItem[]) => {
      return Array.from({ length: targetLen }, (_, idx) => {
        if (currentPool[idx]) return currentPool[idx];
        const prod =
          CUSTOM_ECOMMERCE_PRODUCTS[idx % CUSTOM_ECOMMERCE_PRODUCTS.length] ||
          CUSTOM_ECOMMERCE_PRODUCTS[0];
        return {
          id: `lib_fl_${Date.now()}_${idx}`,
          title: `${prod.title} #${idx + 1}`,
          subtitle: prod.category,
          price: `$${prod.price}`,
          badge: `ITEM #${idx + 1}`,
          imageUrl: prod.image,
        };
      });
    };

    return (
      <div
        className={`p-3 rounded-2xl border space-y-2.5 ${
          isDarkSidebar
            ? 'bg-[#12151C] border-indigo-500/35 text-white'
            : 'bg-neutral-50/90 dark:bg-neutral-950/70 border-indigo-500/30 text-neutral-900 dark:text-white'
        }`}
      >
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span
              className="px-2 py-0.5 rounded text-[9px] font-mono font-black text-white"
              style={{ backgroundColor: activeColorPreset.swatch }}
            >
              &lt;FlatList /&gt; Section Options
            </span>
            <span className="text-[11px] font-black">
              Total: {fl.itemCount} Items ({fl.columns} Cols × {fl.rows} Rows)
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleAddLibraryItemToScreen(activeScreen, 'comp_flatlist_builder')}
            className="px-2.5 py-1 rounded-lg text-[10px] font-black text-white cursor-pointer shadow-2xs"
            style={{ backgroundColor: activeColorPreset.swatch }}
          >
            + Insert &lt;FlatList /&gt; to Screen
          </button>
        </div>

        {/* Row 1: How Many Items Input Box + Total Count + Columns + Rows */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[9px] font-extrabold uppercase tracking-wider opacity-75 mb-1">
              How Many Items (Total)
            </label>
            <input
              type="number"
              min={1}
              max={24}
              value={fl.itemCount}
              onChange={(e) => {
                const nextCount = Math.max(1, Math.min(24, Number(e.target.value) || 1));
                updateLibraryFlatListAndActive((prev) => ({
                  ...prev,
                  itemCount: nextCount,
                  rows: Math.max(1, Math.ceil(nextCount / prev.columns)),
                  customItems: ensureItemsPool(nextCount, prev.customItems),
                }));
              }}
              className={`w-full px-2.5 py-1.5 rounded-xl border text-xs font-mono font-black focus:outline-none ${
                isDarkSidebar
                  ? 'bg-[#1E222D] border-white/10 text-emerald-300'
                  : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700'
              }`}
            />
          </div>

          <div>
            <label className="block text-[9px] font-extrabold uppercase tracking-wider opacity-75 mb-1">
              Columns (1–4)
            </label>
            <select
              value={fl.columns}
              onChange={(e) => {
                const nextCols = Number(e.target.value) as 1 | 2 | 3 | 4;
                updateLibraryFlatListAndActive((prev) => ({
                  ...prev,
                  columns: nextCols,
                  rows: Math.max(1, Math.ceil(prev.itemCount / nextCols)),
                }));
              }}
              className={`w-full px-2 py-1.5 rounded-xl border text-xs font-mono font-black focus:outline-none cursor-pointer ${
                isDarkSidebar
                  ? 'bg-[#1E222D] border-white/10 text-white'
                  : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700'
              }`}
            >
              <option value={1}>1 Column</option>
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
              <option value={4}>4 Columns</option>
            </select>
          </div>

          <div>
            <label className="block text-[9px] font-extrabold uppercase tracking-wider opacity-75 mb-1">
              Rows Count
            </label>
            <input
              type="number"
              min={1}
              max={12}
              value={fl.rows}
              onChange={(e) => {
                const nextRows = Math.max(1, Math.min(12, Number(e.target.value) || 1));
                updateLibraryFlatListAndActive((prev) => {
                  const nextTotal = prev.columns * nextRows;
                  return {
                    ...prev,
                    rows: nextRows,
                    itemCount: nextTotal,
                    customItems: ensureItemsPool(nextTotal, prev.customItems),
                  };
                });
              }}
              className={`w-full px-2.5 py-1.5 rounded-xl border text-xs font-mono font-black focus:outline-none ${
                isDarkSidebar
                  ? 'bg-[#1E222D] border-white/10 text-white'
                  : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700'
              }`}
            />
          </div>
        </div>

        {/* Row 2: Render Card Mode (With Image | Without Image | Horizontal Split | Compact List) */}
        <div>
          <label className="block text-[9px] font-extrabold uppercase tracking-wider opacity-75 mb-1">
            Render Card Style (With Image / Without Image)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
            {(
              [
                ['with_image', 'Card With Image'],
                ['without_image', 'Card Without Image'],
                ['horizontal_image', 'Split Image Card'],
                ['compact_row', 'List Row (No Img)'],
              ] as const
            ).map(([modeId, modeLabel]) => {
              const active = fl.cardVariant === modeId;
              return (
                <button
                  key={modeId}
                  type="button"
                  onClick={() =>
                    updateLibraryFlatListAndActive((prev) => ({
                      ...prev,
                      cardVariant: modeId,
                    }))
                  }
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-black border transition cursor-pointer truncate ${
                    active
                      ? 'text-white border-transparent'
                      : isDarkSidebar
                      ? 'bg-[#1E222D] text-neutral-300 border-white/10 hover:bg-white/10'
                      : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
                  }`}
                  style={active ? { backgroundColor: activeColorPreset.swatch } : undefined}
                >
                  {modeLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Add Item Input Box (Add new item to FlatList items list) */}
        <div className="flex items-center gap-1.5">
          <input
            type="text"
            value={fl.newItemTitleInput}
            onChange={(e) =>
              setLibraryFlatListConfig((prev) => ({
                ...prev,
                newItemTitleInput: e.target.value,
              }))
            }
            placeholder="Item title to add to FlatList..."
            className={`flex-1 px-2.5 py-1.5 rounded-xl border text-[11px] font-semibold focus:outline-none ${
              isDarkSidebar
                ? 'bg-[#1E222D] border-white/10 text-white placeholder-neutral-500'
                : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700'
            }`}
          />
          <input
            type="text"
            value={fl.newItemPriceInput}
            onChange={(e) =>
              setLibraryFlatListConfig((prev) => ({
                ...prev,
                newItemPriceInput: e.target.value,
              }))
            }
            placeholder="$129"
            className={`w-16 px-2 py-1.5 rounded-xl border text-[11px] font-mono font-bold focus:outline-none ${
              isDarkSidebar
                ? 'bg-[#1E222D] border-white/10 text-emerald-300 placeholder-neutral-500'
                : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700'
            }`}
          />
          <button
            type="button"
            onClick={() => {
              updateLibraryFlatListAndActive((prev) => {
                const currentArr = ensureItemsPool(prev.itemCount, prev.customItems);
                const nextIdx = currentArr.length + 1;
                const prod =
                  CUSTOM_ECOMMERCE_PRODUCTS[
                    nextIdx % CUSTOM_ECOMMERCE_PRODUCTS.length
                  ] || CUSTOM_ECOMMERCE_PRODUCTS[0];
                const added: FlatListCustomItem = {
                  id: `lib_fl_added_${Date.now()}`,
                  title: prev.newItemTitleInput.trim() || `${prod.title} #${nextIdx}`,
                  subtitle: prod.category,
                  price: prev.newItemPriceInput.trim() || `$${prod.price}`,
                  badge: 'NEW',
                  imageUrl: prod.image,
                };
                const updated = [...currentArr, added];
                return {
                  ...prev,
                  itemCount: updated.length,
                  rows: Math.max(1, Math.ceil(updated.length / prev.columns)),
                  customItems: updated,
                  newItemTitleInput: '',
                  newItemPriceInput: '',
                };
              });
            }}
            className="px-2.5 py-1.5 rounded-xl text-[10px] font-black text-white flex-shrink-0 cursor-pointer"
            style={{ backgroundColor: activeColorPreset.swatch }}
          >
            + Add Item
          </button>
        </div>
      </div>
    );
  };

  // Drag & Drop Reordering State for Dropped Components/Elements inside any screen
  const [draggedDroppedInstance, setDraggedDroppedInstance] = useState<{
    screenId: CustomEcommerceScreenId;
    instanceId: string;
  } | null>(null);
  const [dragOverDroppedInstanceId, setDragOverDroppedInstanceId] = useState<string | null>(null);

  // Selected Screen / Element / Component / Existing Screen Section / Bottom Nav Inspector State (for editing Data Information & Style: Background, Padding, Margin, Width, Height, Border Radius, Shadow)
  const [selectedInspectorTarget, setSelectedInspectorTarget] = useState<
    | {
        type: 'screen';
        screenId: CustomEcommerceScreenId;
      }
    | {
        type: 'item';
        screenId: CustomEcommerceScreenId;
        instanceId: string;
      }
    | {
        type: 'native_section';
        screenId: CustomEcommerceScreenId;
        sectionId: string;
      }
    | {
        type: 'bottom_nav';
        screenId: CustomEcommerceScreenId;
      }
    | null
  >({
    type: 'screen',
    screenId: 'HomeDashboard',
  });
  const [inspectorTab, setInspectorTab] = useState<'data' | 'style' | 'prototype'>('prototype');

  // Figma-style Prototype Mode & Screen/Section Interaction State inside Multi-Simulator Modal
  const [showPrototypeWiresInModal, setShowPrototypeWiresInModal] = useState<boolean>(true);
  const [connectingPrototypeFromScreenId, setConnectingPrototypeFromScreenId] =
    useState<CustomEcommerceScreenId | null>(null);
  const [screenPrototypeConfigs, setScreenPrototypeConfigs] = useState<
    Record<string, PrototypeInteractionConfig>
  >({
    SplashScreen: {
      enabled: true,
      trigger: 'on_tap',
      action: 'navigate_to',
      destinationScreenId: 'OnboardingWalkthrough',
      animation: 'smart_animate',
      direction: 'right',
      easing: 'ease_in_out',
      durationMs: 320,
      triggerLabel: 'On Tap Get Started',
    },
    OnboardingWalkthrough: {
      enabled: true,
      trigger: 'on_tap',
      action: 'navigate_to',
      destinationScreenId: 'SignUpLogin',
      animation: 'push',
      direction: 'right',
      easing: 'ease_out',
      durationMs: 300,
      triggerLabel: 'On Complete Walkthrough',
    },
    SignUpLogin: {
      enabled: true,
      trigger: 'on_tap',
      action: 'navigate_to',
      destinationScreenId: 'HomeDashboard',
      animation: 'smart_animate',
      direction: 'right',
      easing: 'spring',
      durationMs: 350,
      triggerLabel: 'On Auth Verified',
    },
    HomeDashboard: {
      enabled: true,
      trigger: 'on_tap',
      action: 'navigate_to',
      destinationScreenId: 'ProductDetailPage',
      animation: 'push',
      direction: 'right',
      easing: 'ease_out',
      durationMs: 300,
      triggerLabel: 'On Tap Featured Product',
    },
    ProductDetailPage: {
      enabled: true,
      trigger: 'on_tap',
      action: 'navigate_to',
      destinationScreenId: 'ShoppingCart',
      animation: 'move_in',
      direction: 'up',
      easing: 'spring',
      durationMs: 320,
      triggerLabel: 'On Tap Add to Bag',
    },
    ShoppingCart: {
      enabled: true,
      trigger: 'on_tap',
      action: 'navigate_to',
      destinationScreenId: 'CheckoutPaymentGateway',
      animation: 'push',
      direction: 'right',
      easing: 'ease_in_out',
      durationMs: 300,
      triggerLabel: 'On Tap Checkout CTA',
    },
  });
  const [nativeSectionPrototypeConfigs, setNativeSectionPrototypeConfigs] = useState<
    Record<string, PrototypeInteractionConfig>
  >({});
  // Active Live Prototype Overlay Preview (for Open Overlay: Modal / Bottom Sheet / Drawer / Bottom Modal inside Simulator)
  const [activePrototypeOverlayByScreen, setActivePrototypeOverlayByScreen] = useState<
    Record<
      string,
      {
        overlayType: PrototypeOverlayType;
        title: string;
        subtitle: string;
        destinationScreenId?: CustomEcommerceScreenId;
      } | null
    >
  >({});
  // Track Simulator Card DOM refs inside Multi-Simulator Modal for SVG Bezier Prototype Connectors
  const modalScreenCardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [prototypeLineTick, setPrototypeLineTick] = useState<number>(0);
  const [lastInsertedGapTargetByScreen, setLastInsertedGapTargetByScreen] = useState<
    Record<string, string | null>
  >({});
  const [nativeSectionStyleOverrides, setNativeSectionStyleOverrides] = useState<
    Record<string, ExistingSectionStyleOverride>
  >({});
  const [screenStyleOverrides, setScreenStyleOverrides] = useState<
    Record<string, ExistingSectionStyleOverride>
  >({});

  // Per-Screen Customizable & Drag-and-Drop Reorderable Bottom Navigation Tabs + Style
  const [screenCustomBottomNav, setScreenCustomBottomNav] = useState<
    Record<
      string,
      {
        visible: boolean;
        activeColor?: string;
        bgColor?: string;
        items: ScreenBottomNavItem[];
      }
    >
  >({});
  const [draggedBottomNavIdx, setDraggedBottomNavIdx] = useState<number | null>(null);

  // Refs to preserve scroll position when filtering the modal simulator grid & main simulator screen
  const modalGridScrollContainerRef = useRef<HTMLDivElement | null>(null);
  const modalGridSavedScrollTopRef = useRef<number>(0);
  const mainSimulatorScrollRef = useRef<HTMLDivElement | null>(null);
  const mainSimulatorSavedScrollTopRef = useRef<number>(0);

  // Measure modal grid container width dynamically so rows & columns and device screen sizes scale responsively
  useEffect(() => {
    if (!isMultiSimulatorModalOpen) return;
    const el = modalGridScrollContainerRef.current;
    if (!el) return;

    const updateWidth = () => {
      if (el.clientWidth > 0) {
        setModalContainerWidth(el.clientWidth);
      }
    };
    updateWidth();

    const observer = new ResizeObserver(() => {
      updateWidth();
    });
    observer.observe(el);
    window.addEventListener('resize', updateWidth);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, [isMultiSimulatorModalOpen]);

  // Main Simulator focused screen on the far right
  const [activeScreen, setActiveScreen] = useState<CustomEcommerceScreenId>('HomeDashboard');
  const [selectedVariants, setSelectedVariants] = useState<
    Record<CustomEcommerceScreenId, CustomEcommerceVariantId>
  >(() => {
    const initial = {} as Record<CustomEcommerceScreenId, CustomEcommerceVariantId>;
    CUSTOM_ECOMMERCE_SCREENS_REGISTRY.forEach((s) => {
      initial[s.id] = 'varient_1';
    });
    // Preset distinct individual variants for Onboarding (V3) & Sign Up / Login (V4)
    initial.SplashScreen = 'varient_3';
    initial.OnboardingWalkthrough = 'varient_3';
    initial.SignUpLogin = 'varient_4';
    initial.ForgotPasswordPin = 'varient_2';
    return initial;
  });

  // Drag & Drop Screen Component Blocks State (Hero Banners, Product Grids, Category Lists, etc.)
  const [componentBlocks, setComponentBlocks] = useState<DraggableScreenComponentBlock[]>(
    () => DEFAULT_SCREEN_COMPONENT_BLOCKS
  );
  const [hiddenComponentIds, setHiddenComponentIds] = useState<string[]>([]);
  const [draggedComponentId, setDraggedComponentId] = useState<string | null>(null);
  const [dragOverComponentId, setDragOverComponentId] = useState<string | null>(null);
  const [showCustomBlocksInAllScreens, setShowCustomBlocksInAllScreens] = useState<boolean>(false);

  // Drag & Drop State for Screen Cards
  const [draggedScreenId, setDraggedScreenId] = useState<CustomEcommerceScreenId | null>(null);
  const [dragOverScreenId, setDragOverScreenId] = useState<CustomEcommerceScreenId | null>(null);
  const [dragOverPosition, setDragOverPosition] = useState<'before' | 'after'>('before');
  const [dragFeedbackToast, setDragFeedbackToast] = useState<string | null>(null);

  // Theme & Branding State
  const [isDark, setIsDark] = useState<boolean>(false);
  const [colorPresetId, setColorPresetId] = useState<string>('indigo_commerce');
  const [fontPresetId, setFontPresetId] = useState<string>('jakarta');
  const [appName, setAppName] = useState<string>('Custom E-commerce');
  const [packageName, setPackageName] = useState<string>('com.appforge.customecommerce');
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [simulatorKey, setSimulatorKey] = useState<number>(0);

  // Interactive Screen Preview State
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod_1', 'prod_2', 'prod_4']);
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({
    prod_1: 1,
    prod_3: 1,
  });

  const activeColorPreset = useMemo(
    () =>
      CUSTOM_ECOMMERCE_COLOR_PRESETS.find((p) => p.id === colorPresetId) ||
      CUSTOM_ECOMMERCE_COLOR_PRESETS[0],
    [colorPresetId]
  );

  const activeFontPreset = useMemo(
    () =>
      CUSTOM_ECOMMERCE_FONT_PRESETS.find((f) => f.id === fontPresetId) ||
      CUSTOM_ECOMMERCE_FONT_PRESETS[0],
    [fontPresetId]
  );

  const currentScreenMeta = useMemo(
    () =>
      orderedScreens.find((s) => s.id === activeScreen) ||
      orderedScreens[0],
    [orderedScreens, activeScreen]
  );

  const activeScreenVariant: CustomEcommerceVariantId =
    selectedVariants[activeScreen] || 'varient_1';

  const componentOrderIds = useMemo(
    () => componentBlocks.map((b) => b.id),
    [componentBlocks]
  );

  // Filtered screens for Multi-Simulator Modal based on selectedFlowFilter, screenSearch, and real-time leftRailGlobalSearch
  const flowSimulatorScreens = useMemo(() => {
    const query = (leftRailGlobalSearch.trim() || screenSearch.trim()).toLowerCase();
    return orderedScreens.filter((scr) => {
      const matchesGroup =
        selectedFlowFilter === 'ALL' || scr.flowGroup === selectedFlowFilter;
      const matchesSearch =
        !query ||
        scr.label.toLowerCase().includes(query) ||
        scr.description.toLowerCase().includes(query) ||
        scr.flowGroup.toLowerCase().includes(query) ||
        scr.keyElements.some((k) => k.toLowerCase().includes(query)) ||
        Object.values(scr.variants).some((v) => v.toLowerCase().includes(query));
      return matchesGroup && matchesSearch;
    });
  }, [orderedScreens, selectedFlowFilter, screenSearch, leftRailGlobalSearch]);

  const matchedSimulatorIdsSet = useMemo(
    () => new Set(flowSimulatorScreens.map((s) => s.id)),
    [flowSimulatorScreens]
  );

  // Preserve scroll positions across real-time global search updates
  useLayoutEffect(() => {
    if (modalGridScrollContainerRef.current) {
      modalGridScrollContainerRef.current.scrollTop = modalGridSavedScrollTopRef.current;
    }
    if (mainSimulatorScrollRef.current) {
      mainSimulatorScrollRef.current.scrollTop = mainSimulatorSavedScrollTopRef.current;
    }
  }, [leftRailGlobalSearch]);

  const handleGlobalSimulatorSearchChange = (value: string) => {
    if (modalGridScrollContainerRef.current) {
      modalGridSavedScrollTopRef.current = modalGridScrollContainerRef.current.scrollTop;
    }
    if (mainSimulatorScrollRef.current) {
      mainSimulatorSavedScrollTopRef.current = mainSimulatorScrollRef.current.scrollTop;
    }
    setLeftRailGlobalSearch(value);
  };

  // Track custom blank screens count & optional custom added blocks per blank screen
  const [blankScreenCounter, setBlankScreenCounter] = useState<number>(1);
  const [blankScreenCustomWidgets, setBlankScreenCustomWidgets] = useState<
    Record<string, string[]>
  >({});

  // Add Screen Layout Template Picker Modal State (Blank Screen + 30 Different Screen Layouts)
  type AddScreenTemplateId =
    | 'blank_screen'
    | 'empty_activity'
    | 'featured_store_activity'
    | 'navigation_ui_activity'
    | 'basic_views_activity'
    | 'empty_views_activity'
    | 'responsive_views_activity'
    | 'flatlist_catalog_activity'
    | 'checkout_form_activity'
    | 'bottom_navigation_activity'
    | 'navigation_drawer_activity'
    | 'tabbed_views_activity'
    | 'fullscreen_hero_activity'
    | 'scrolling_collapsing_activity'
    | 'master_detail_flow_activity'
    | 'login_auth_activity'
    | 'settings_preferences_activity'
    | 'google_maps_store_activity'
    | 'product_showcase_pdp_activity'
    | 'video_story_reel_activity'
    | 'bento_analytics_dashboard_activity'
    | 'onboarding_carousel_activity'
    | 'shopping_cart_bag_activity'
    | 'wishlist_saved_grid_activity'
    | 'flash_sale_countdown_activity'
    | 'order_tracking_timeline_activity'
    | 'wallet_loyalty_card_activity'
    | 'chat_concierge_support_activity'
    | 'review_ratings_gallery_activity'
    | 'category_mega_menu_activity'
    | 'qr_scanner_ar_tryon_activity';

  const [isAddScreenTemplateModalOpen, setIsAddScreenTemplateModalOpen] =
    useState<boolean>(false);
  const [selectedAddScreenTemplateId, setSelectedAddScreenTemplateId] =
    useState<AddScreenTemplateId>('empty_activity');
  const [addScreenModalColumns, setAddScreenModalColumns] = useState<2 | 3 | 4 | 5 | 6>(3);
  const [addScreenModalSearch, setAddScreenModalSearch] = useState<string>('');
  const [customNewScreenNameInput, setCustomNewScreenNameInput] =
    useState<string>('');
  const [customScreenLayoutTypeById, setCustomScreenLayoutTypeById] = useState<
    Record<string, AddScreenTemplateId>
  >({});

  const ADD_SCREEN_LAYOUT_TEMPLATES: Array<{
    id: AddScreenTemplateId;
    title: string;
    subtitle: string;
    badge?: string;
    hasBottomNav: boolean;
    defaultItems: string[];
  }> = [
    {
      id: 'blank_screen',
      title: 'Blank Screen (No Activity)',
      subtitle: 'Pure empty canvas — drag & drop any component or element anywhere',
      hasBottomNav: false,
      defaultItems: [],
    },
    {
      id: 'empty_activity',
      title: 'Empty Activity',
      subtitle: 'Top app bar header + hero showcase block & primary action button',
      hasBottomNav: false,
      defaultItems: ['comp_heading_sub_desc', 'comp_card_with_image', 'elem_button'],
    },
    {
      id: 'featured_store_activity',
      title: 'Featured Grid Activity',
      subtitle: 'Search bar + 2-column Featured Grid layout with inline price tags',
      badge: 'Preview',
      hasBottomNav: true,
      defaultItems: ['comp_search_bar_icon', 'comp_featured_grid', 'comp_promo_banner_cta'],
    },
    {
      id: 'navigation_ui_activity',
      title: 'Navigation UI Activity',
      subtitle: 'Top app bar + segmented tabs + Featured Grid + bottom navigation bar',
      hasBottomNav: true,
      defaultItems: ['comp_Segmented_tabs', 'comp_featured_grid', 'comp_card_horizontal_split'],
    },
    {
      id: 'basic_views_activity',
      title: 'Basic Views Activity (FAB)',
      subtitle: 'App bar + scrollable product cards + floating action button (+)',
      hasBottomNav: false,
      defaultItems: ['comp_heading_sub_desc', 'comp_card_horizontal_split', 'comp_card_without_image'],
    },
    {
      id: 'empty_views_activity',
      title: 'Empty Views Activity',
      subtitle: 'Clean top navigation header with ready-to-style content container',
      hasBottomNav: false,
      defaultItems: ['comp_search_bar_icon', 'comp_card_bento_metrics'],
    },
    {
      id: 'responsive_views_activity',
      title: 'Responsive Views Activity',
      subtitle: 'Split profile/category header + 2×2 bento grid + floating action (+)',
      hasBottomNav: true,
      defaultItems: ['comp_card_bento_metrics', 'comp_featured_grid', 'comp_dropdown_select'],
    },
    {
      id: 'flatlist_catalog_activity',
      title: 'FlatList Catalog Activity',
      subtitle: 'Search bar + dynamic <FlatList /> with image cards & filter dropdown',
      hasBottomNav: true,
      defaultItems: ['comp_search_bar_icon', 'comp_dropdown_select', 'comp_flatlist_with_image'],
    },
    {
      id: 'checkout_form_activity',
      title: 'Interactive Form & FAQ Activity',
      subtitle: 'Customer form input block + expandable FAQ accordion + submit CTA',
      hasBottomNav: false,
      defaultItems: ['comp_heading_sub_desc', 'elem_form', 'comp_faq_accordion'],
    },
    {
      id: 'bottom_navigation_activity',
      title: 'Bottom Navigation Views Activity',
      subtitle: 'Multi-tab bottom navigation bar + promo banner + 2-column Featured Grid',
      badge: 'Popular',
      hasBottomNav: true,
      defaultItems: ['comp_promo_banner_cta', 'comp_featured_grid', 'comp_card_horizontal_split'],
    },
    {
      id: 'navigation_drawer_activity',
      title: 'Navigation Drawer Views Activity',
      subtitle: 'Slide-out hamburger drawer header + category pills + FlatList without image',
      hasBottomNav: false,
      defaultItems: ['elem_badge_pills', 'comp_flatlist_without_image', 'elem_link_row'],
    },
    {
      id: 'tabbed_views_activity',
      title: 'Tabbed Views Activity (ViewPager)',
      subtitle: 'Top scrollable tab strip + segmented switcher + Featured Grid cards',
      hasBottomNav: true,
      defaultItems: ['comp_Segmented_tabs', 'comp_featured_grid', 'comp_card_with_image'],
    },
    {
      id: 'fullscreen_hero_activity',
      title: 'Fullscreen Lookbook Activity',
      subtitle: 'Edge-to-edge full-bleed cover image card + overlay glass CTA & video reel',
      badge: 'Editorial',
      hasBottomNav: false,
      defaultItems: ['comp_card_overlay_glass', 'elem_video_player', 'elem_button'],
    },
    {
      id: 'scrolling_collapsing_activity',
      title: 'Scrolling Collapsing Toolbar Activity',
      subtitle: 'Large collapsing parallax banner + rich text story + product list',
      hasBottomNav: false,
      defaultItems: ['comp_card_overlay_glass', 'elem_rich_text', 'comp_flatlist_with_image'],
    },
    {
      id: 'master_detail_flow_activity',
      title: 'Primary / Detail Flow Activity',
      subtitle: 'Split master list + inline detail card preview & specification document',
      hasBottomNav: true,
      defaultItems: ['comp_card_horizontal_split', 'comp_card_with_image', 'elem_document_file'],
    },
    {
      id: 'login_auth_activity',
      title: 'Login & OTP Authentication Activity',
      subtitle: 'Sign-in credentials form + biometric/e-signature verification + CTA button',
      hasBottomNav: false,
      defaultItems: ['elem_heading', 'elem_form', 'elem_sign_document'],
    },
    {
      id: 'settings_preferences_activity',
      title: 'Settings & Preferences Activity',
      subtitle: 'Grouped preference dropdowns + bullet toggles + account link rows',
      hasBottomNav: true,
      defaultItems: ['comp_dropdown_select', 'elem_bullet_list', 'elem_link_row'],
    },
    {
      id: 'google_maps_store_activity',
      title: 'Store Locator & Delivery Map Activity',
      subtitle: 'Interactive hub pin header + express delivery metrics + branch FlatList',
      badge: 'Geo UI',
      hasBottomNav: true,
      defaultItems: ['comp_search_bar_icon', 'comp_card_bento_metrics', 'comp_flatlist_without_image'],
    },
    {
      id: 'product_showcase_pdp_activity',
      title: 'Product Detail Showcase Activity',
      subtitle: 'Hero product gallery + badge pills + FAQ accordion + Add to Cart CTA',
      hasBottomNav: false,
      defaultItems: ['comp_card_with_image', 'elem_badge_pills', 'comp_faq_accordion', 'elem_button'],
    },
    {
      id: 'video_story_reel_activity',
      title: 'Live Video & Shoppable Reel Activity',
      subtitle: 'Lookbook video player + 2-column shoppable Featured Grid + promo banner',
      badge: 'Live',
      hasBottomNav: true,
      defaultItems: ['elem_video_player', 'comp_featured_grid', 'comp_promo_banner_cta'],
    },
    {
      id: 'bento_analytics_dashboard_activity',
      title: 'Bento KPI & Order Dashboard Activity',
      subtitle: '2-column Bento metrics + order status cards without image + PDF invoice',
      hasBottomNav: true,
      defaultItems: ['comp_card_bento_metrics', 'comp_card_without_image', 'elem_document_file'],
    },
    {
      id: 'onboarding_carousel_activity',
      title: 'Onboarding Story Walkthrough Activity',
      subtitle: 'Full-bleed story card + benefit bullet list + Get Started primary CTA',
      badge: 'Flow',
      hasBottomNav: false,
      defaultItems: ['comp_card_overlay_glass', 'elem_bullet_list', 'elem_button'],
    },
    {
      id: 'shopping_cart_bag_activity',
      title: 'Shopping Cart & Bag Summary Activity',
      subtitle: 'Horizontal split cart items + promo coupon banner + Checkout CTA button',
      hasBottomNav: true,
      defaultItems: ['comp_card_horizontal_split', 'comp_promo_banner_cta', 'elem_button'],
    },
    {
      id: 'wishlist_saved_grid_activity',
      title: 'Wishlist & Saved Collections Activity',
      subtitle: 'Segmented collection tabs + 2-column Featured Grid with inline price tags',
      hasBottomNav: true,
      defaultItems: ['comp_Segmented_tabs', 'comp_featured_grid', 'comp_flatlist_with_image'],
    },
    {
      id: 'flash_sale_countdown_activity',
      title: 'Flash Deals & Drop Countdown Activity',
      subtitle: 'Urgent promo countdown banner + 2-column Featured Grid + FlatList cards',
      badge: 'Hot',
      hasBottomNav: true,
      defaultItems: ['comp_promo_banner_cta', 'comp_featured_grid', 'comp_flatlist_with_image'],
    },
    {
      id: 'order_tracking_timeline_activity',
      title: 'Live Order Tracking & Courier Activity',
      subtitle: 'Courier status metrics + step-by-step milestone list + receipt PDF document',
      hasBottomNav: false,
      defaultItems: ['comp_card_bento_metrics', 'elem_bullet_list', 'elem_document_file'],
    },
    {
      id: 'wallet_loyalty_card_activity',
      title: 'VIP Wallet & Loyalty Pass Activity',
      subtitle: 'Black card cover pass + Bento reward balance + transaction FlatList',
      badge: 'VIP',
      hasBottomNav: true,
      defaultItems: ['comp_card_overlay_glass', 'comp_card_bento_metrics', 'comp_flatlist_without_image'],
    },
    {
      id: 'chat_concierge_support_activity',
      title: 'Concierge Support & Help Center Activity',
      subtitle: 'Search knowledge base + collapsible FAQ accordion + message form block',
      hasBottomNav: false,
      defaultItems: ['comp_search_bar_icon', 'comp_faq_accordion', 'elem_form'],
    },
    {
      id: 'review_ratings_gallery_activity',
      title: 'Customer Reviews & Photo Grid Activity',
      subtitle: 'Verified rating Bento metrics + customer photo Featured Grid + review cards',
      hasBottomNav: false,
      defaultItems: ['comp_card_bento_metrics', 'comp_featured_grid', 'comp_card_without_image'],
    },
    {
      id: 'category_mega_menu_activity',
      title: 'Category Directory & Filter Activity',
      subtitle: 'Search bar + category pills + dropdown sorter + custom <FlatList /> builder',
      hasBottomNav: true,
      defaultItems: ['comp_search_bar_icon', 'elem_badge_pills', 'comp_dropdown_select', 'comp_flatlist_builder'],
    },
    {
      id: 'qr_scanner_ar_tryon_activity',
      title: 'AR Virtual Try-On & QR Scanner Activity',
      subtitle: 'Camera viewfinder video block + horizontal product card + Quick Add button',
      badge: 'AR / 3D',
      hasBottomNav: false,
      defaultItems: ['elem_video_player', 'comp_card_horizontal_split', 'elem_button'],
    },
  ];

  const handleOpenAddScreenModal = () => {
    setCustomNewScreenNameInput('');
    setIsAddScreenTemplateModalOpen(true);
  };

  const handleCreateScreenFromTemplate = (templateIdToUse?: AddScreenTemplateId) => {
    const chosenId = templateIdToUse || selectedAddScreenTemplateId;
    const templateMeta =
      ADD_SCREEN_LAYOUT_TEMPLATES.find((t) => t.id === chosenId) ||
      ADD_SCREEN_LAYOUT_TEMPLATES[0];

    const newNum = blankScreenCounter;
    const newId = `BlankScreen_${Date.now()}` as CustomEcommerceScreenId;
    const targetGroup: CustomEcommerceFlowGroup =
      selectedFlowFilter === 'ALL' ? 'Onboarding & Authentication' : selectedFlowFilter;

    const cleanCustomTitle = customNewScreenNameInput.trim();
    const finalLabel =
      cleanCustomTitle ||
      (chosenId === 'blank_screen'
        ? `Blank Screen #${newNum}`
        : `${templateMeta.title} #${newNum}`);

    const newBlankScreenDef: CustomEcommerceScreenDefinition = {
      id: newId,
      stepNumber: orderedScreens.length + 1,
      label: finalLabel,
      filePath: `src/custom_ecommerce_frontend/screens/CustomScreen${newNum}`,
      flowGroup: targetGroup,
      description: `${templateMeta.title}: ${templateMeta.subtitle}`,
      keyElements: [templateMeta.title, 'Custom Layout', 'Simulator Ready'],
      icon: Smartphone,
      hasBottomNav: templateMeta.hasBottomNav,
      variants: {
        varient_1: `V1: ${templateMeta.title}`,
        varient_2: 'V2: App Bar + Body Frame',
        varient_3: 'V3: 2-Col Grid Wireframe',
        varient_4: 'V4: Hero + CTA Canvas',
        varient_5: 'V5: Bottom Sheet Frame',
        varient_6: 'V6: Custom D&D Canvas',
      },
    };

    // Build pre-populated dropped components according to the selected screen layout template
    const initialDroppedInstances: DroppedLibraryItemInstance[] = templateMeta.defaultItems
      .map((itemId, idx) => {
        const found = ALL_LIBRARY_ITEMS.find((i) => i.id === itemId);
        if (!found) return null;
        return {
          instanceId: `${itemId}_${Date.now()}_${idx}_${Math.random().toString(36).slice(2, 6)}`,
          itemId: found.id,
          category: found.category,
          label: found.label,
          data: getDefaultDataForLibraryItem(found.id, found.label),
          style: {
            accentColor: activeColorPreset.swatch,
            borderRadius: 14,
            padding: 10,
            shadow: 'sm',
            fontSize: 'md',
            textAlign: 'left',
            imageRatio: found.id === 'comp_featured_grid' ? '4:5' : undefined,
            priceTagPosition:
              found.id === 'comp_featured_grid' ? 'overlay-bottom-right' : undefined,
          },
        } as DroppedLibraryItemInstance;
      })
      .filter((x): x is DroppedLibraryItemInstance => Boolean(x));

    setOrderedScreens((prev) => [newBlankScreenDef, ...prev]);
    setSelectedVariants((prev) => ({
      ...prev,
      [newId]: 'varient_1',
    }));
    setCustomScreenLayoutTypeById((prev) => ({
      ...prev,
      [newId]: chosenId,
    }));
    if (initialDroppedInstances.length > 0) {
      setScreenDroppedItems((prev) => ({
        ...prev,
        [newId]: initialDroppedInstances,
      }));
    }
    setScreenCustomBottomNav((prev) => ({
      ...prev,
      [newId]: {
        ...getDefaultBottomNavConfig(),
        visible: templateMeta.hasBottomNav,
      },
    }));
    setBlankScreenCounter((c) => c + 1);
    setActiveScreen(newId);
    setSelectedInspectorTarget({
      type: 'screen',
      screenId: newId,
    });
    setIsAddScreenTemplateModalOpen(false);
    triggerToast(`Created "${finalLabel}" (${templateMeta.title})`);

    setTimeout(() => {
      if (modalGridScrollContainerRef.current) {
        modalGridScrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 40);
  };

  const handleAddBlankScreenWithSimulator = () => {
    handleOpenAddScreenModal();
  };

  const handleToggleBlankScreenWidget = (screenId: string, widgetLabel: string) => {
    setBlankScreenCustomWidgets((prev) => {
      const current = prev[screenId] || [];
      const next = current.includes(widgetLabel)
        ? current.filter((w) => w !== widgetLabel)
        : [...current, widgetLabel];
      return { ...prev, [screenId]: next };
    });
  };

  const handleRemoveScreen = (screenId: CustomEcommerceScreenId) => {
    if (orderedScreens.length <= 1) {
      triggerToast('At least 1 screen must remain in the flow');
      return;
    }
    const target = orderedScreens.find((s) => s.id === screenId);
    const remaining = orderedScreens.filter((s) => s.id !== screenId);
    setOrderedScreens(remaining);
    if (activeScreen === screenId && remaining.length > 0) {
      setActiveScreen(remaining[0].id);
    }
    if (target) {
      triggerToast(`Removed "${target.label}"`);
    }
  };

  // ============================================================================
  // MODAL LEFT SIDEBAR CATALOG: TAB 1 (COMPONENT) & TAB 2 (ELEMENT)
  // ============================================================================
  const MODAL_COMPONENT_CATALOG = useMemo(
    () => [
      {
        id: 'comp_featured_grid',
        category: 'component' as const,
        label: 'Featured Grid',
        subtitle: '2-column layout with flexible image ratios & inline price tags',
        badge: 'FEATURED GRID',
        icon: LayoutGrid,
      },
      {
        id: 'comp_flatlist_with_image',
        category: 'component' as const,
        label: '<FlatList /> (With Image Cards)',
        subtitle: 'Dynamic FlatList · Item count input, Columns × Rows & Image Cards',
        badge: 'FLATLIST IMG',
        icon: LayoutGrid,
      },
      {
        id: 'comp_flatlist_without_image',
        category: 'component' as const,
        label: '<FlatList /> (Without Image Cards)',
        subtitle: 'Dynamic FlatList · Item count input, Columns × Rows & Text Cards',
        badge: 'FLATLIST TEXT',
        icon: List,
      },
      {
        id: 'comp_flatlist_builder',
        category: 'component' as const,
        label: '<FlatList /> (List of Items Builder)',
        subtitle: 'Add items via input box, set total count, columns, rows & card type',
        badge: 'FLATLIST PRO',
        icon: Layers,
      },
      {
        id: 'comp_modal_dialog',
        category: 'component' as const,
        label: 'Modal Dialog',
        subtitle: 'Centered overlay modal card with header, message body & 2 action buttons',
        badge: 'MODAL',
        icon: AppWindow,
      },
      {
        id: 'comp_bottom_sheet',
        category: 'component' as const,
        label: 'Bottom Sheet',
        subtitle: 'Draggable pull-handle bottom sheet with filter pills & primary CTA',
        badge: 'BOTTOM SHEET',
        icon: Layers,
      },
      {
        id: 'comp_navigation_drawer',
        category: 'component' as const,
        label: 'Side Drawer (Menu Drawer)',
        subtitle: 'Slide-out navigation drawer with user profile header & menu links',
        badge: 'DRAWER',
        icon: PanelLeftOpen,
      },
      {
        id: 'comp_bottom_modal',
        category: 'component' as const,
        label: 'Bottom Modal (Popup Card)',
        subtitle: 'Floating bottom popup modal with product preview, price & confirm CTA',
        badge: 'BOTTOM MODAL',
        icon: Smartphone,
      },
      {
        id: 'comp_action_sheet_picker',
        category: 'component' as const,
        label: 'Action Sheet (Option Menu)',
        subtitle: 'iOS/Android style bottom action menu list with cancel footer',
        badge: 'ACTION SHEET',
        icon: List,
      },
      {
        id: 'comp_toast_snackbar',
        category: 'component' as const,
        label: 'Toast / Snackbar Alert',
        subtitle: 'Floating notification bar with status icon, message & Undo button',
        badge: 'SNACKBAR',
        icon: Sparkles,
      },
      {
        id: 'comp_search_bar_icon',
        category: 'component' as const,
        label: 'Search Bar with Icon',
        subtitle: 'Search input + voice & filter icon button',
        badge: 'SEARCH',
        icon: Search,
      },
      {
        id: 'comp_card_with_image',
        category: 'component' as const,
        label: 'Card Design (With Image)',
        subtitle: 'Vertical product card with photo, badge & price',
        badge: 'CARD IMG',
        icon: ImageIcon,
      },
      {
        id: 'comp_card_horizontal_split',
        category: 'component' as const,
        label: 'Card Design (Horizontal Split)',
        subtitle: 'Left thumbnail + right title, rating & CTA',
        badge: 'SPLIT CARD',
        icon: LayoutGrid,
      },
      {
        id: 'comp_card_overlay_glass',
        category: 'component' as const,
        label: 'Card Design (Full-Bleed Image)',
        subtitle: 'Editorial cover image with floating glass price bar',
        badge: 'COVER CARD',
        icon: Sparkles,
      },
      {
        id: 'comp_card_without_image',
        category: 'component' as const,
        label: 'Card Design (Without Image)',
        subtitle: 'Clean typographic info card with status badge & CTA',
        badge: 'NO-IMG CARD',
        icon: CreditCard,
      },
      {
        id: 'comp_card_bento_metrics',
        category: 'component' as const,
        label: 'Card Design (2-Col Bento Text)',
        subtitle: 'Side-by-side KPI & feature cards without image',
        badge: 'BENTO CARD',
        icon: Grid,
      },
      {
        id: 'comp_heading_sub_desc',
        category: 'component' as const,
        label: 'Heading + Sub Description',
        subtitle: 'Section title, subtitle paragraph & "See All" link',
        badge: 'HEADING+SUB',
        icon: Type,
      },
      {
        id: 'comp_dropdown_select',
        category: 'component' as const,
        label: 'Dropdown Select Menu',
        subtitle: 'Interactive sort / category / size dropdown selector',
        badge: 'DROPDOWN',
        icon: ChevronDown,
      },
      {
        id: 'comp_promo_banner_cta',
        category: 'component' as const,
        label: 'Promo Banner + CTA Card',
        subtitle: 'Gradient discount banner with coupon code & button',
        badge: 'BANNER',
        icon: Flame,
      },
      {
        id: 'comp_faq_accordion',
        category: 'component' as const,
        label: 'Accordion / Expandable FAQ',
        subtitle: 'Collapsible Q&A rows with + / - icon',
        badge: 'ACCORDION',
        icon: List,
      },
      {
        id: 'comp_Segmented_tabs',
        category: 'component' as const,
        label: 'Segmented Tab Switcher',
        subtitle: '2-tab pill bar (Tab 1 / Tab 2) container',
        badge: 'TABS',
        icon: Layers,
      },
    ],
    []
  );

  const MODAL_ELEMENT_CATALOG = useMemo(
    () => [
      {
        id: 'elem_form',
        category: 'element' as const,
        label: 'Form',
        subtitle: 'Interactive form block with input fields & submit button',
        badge: 'FORM',
        icon: FileText,
      },
      {
        id: 'elem_heading',
        category: 'element' as const,
        label: 'Heading',
        subtitle: 'Bold H1 / H2 display title text element',
        badge: 'H',
        icon: Type,
      },
      {
        id: 'elem_sub_heading',
        category: 'element' as const,
        label: 'Sub Heading',
        subtitle: 'Secondary section subtitle / eyebrow label',
        badge: 'SUB',
        icon: Type,
      },
      {
        id: 'elem_rich_text',
        category: 'element' as const,
        label: 'Rich Text',
        subtitle: 'Formatted rich text article & callout box',
        badge: 'RICH',
        icon: FileText,
      },
      {
        id: 'elem_paragraph_text',
        category: 'element' as const,
        label: 'Text',
        subtitle: 'Clean body copy & paragraph text element',
        badge: 'Aa',
        icon: Type,
      },
      {
        id: 'elem_bullet_list',
        category: 'element' as const,
        label: 'List',
        subtitle: 'My List with thumbnail icon, Title 1..4 & Description',
        badge: 'LIST',
        icon: List,
      },
      {
        id: 'elem_card_element',
        category: 'element' as const,
        label: 'Card',
        subtitle: 'Featured media card with title, description & action',
        badge: 'CARD',
        icon: Grid,
      },
      {
        id: 'elem_sign_document',
        category: 'element' as const,
        label: 'Sign Document',
        subtitle: 'Digital e-signature pad & agreement confirmation',
        badge: 'SIGN',
        icon: CheckCircle2,
      },
      {
        id: 'elem_link_row',
        category: 'element' as const,
        label: 'Link',
        subtitle: 'Clickable navigation or external URL row',
        badge: 'LINK',
        icon: Link2,
      },
      {
        id: 'elem_document_file',
        category: 'element' as const,
        label: 'Document',
        subtitle: 'Downloadable PDF / catalog document preview card',
        badge: 'DOC',
        icon: FileText,
      },
      {
        id: 'elem_image',
        category: 'element' as const,
        label: 'Image',
        subtitle: 'Responsive rounded image frame with caption',
        badge: 'IMG',
        icon: ImageIcon,
      },
      {
        id: 'elem_video_player',
        category: 'element' as const,
        label: 'Video',
        subtitle: '16:9 video player box with play button',
        badge: 'NEW',
        icon: Video,
      },
      {
        id: 'elem_image_gallery',
        category: 'element' as const,
        label: 'Image Gallery',
        subtitle: 'Multi-photo grid gallery strip',
        badge: 'GALLERY',
        icon: ImageIcon,
      },
      {
        id: 'elem_button',
        category: 'element' as const,
        label: 'Button',
        subtitle: 'Full-width primary action button',
        badge: 'BTN',
        icon: CheckCircle2,
      },
      {
        id: 'elem_badge_pills',
        category: 'element' as const,
        label: 'Badge / Tag',
        subtitle: 'Row of colored status & promo badges',
        badge: 'TAG',
        icon: Tag,
      },
      {
        id: 'elem_divider_spacer',
        category: 'element' as const,
        label: 'Divider Line',
        subtitle: 'Clean horizontal section separator',
        badge: 'LINE',
        icon: SlidersHorizontal,
      },
    ],
    []
  );

  const ALL_LIBRARY_ITEMS = useMemo(
    () => [...MODAL_COMPONENT_CATALOG, ...MODAL_ELEMENT_CATALOG],
    [MODAL_COMPONENT_CATALOG, MODAL_ELEMENT_CATALOG]
  );

  const getDefaultDataForLibraryItem = (
    itemId: string,
    fallbackLabel: string
  ): DroppedLibraryItemData => {
    const sampleProd = CUSTOM_ECOMMERCE_PRODUCTS[0];
    const sampleProd2 = CUSTOM_ECOMMERCE_PRODUCTS[1] || sampleProd;
    switch (itemId) {
      case 'comp_search_bar_icon':
        return {
          title: 'Search products, brands, SKU...',
          buttonText: 'Filter',
        };
      case 'comp_card_with_image':
        return {
          title: sampleProd.title,
          subtitle: 'Premium studio edition with express delivery',
          price: `$${sampleProd.price}`,
          badgeText: 'WITH IMAGE',
          buttonText: '+ Add to Cart',
          imageUrl: sampleProd.image,
        };
      case 'comp_card_horizontal_split':
        return {
          title: sampleProd2.title,
          subtitle: 'Horizontal Split Card',
          price: `$${sampleProd2.price}`,
          badgeText: `★ ${sampleProd2.rating}`,
          imageUrl: sampleProd2.image,
        };
      case 'comp_card_overlay_glass':
        return {
          title: sampleProd.title,
          subtitle: 'Full-Bleed Image Card',
          price: `$${sampleProd.price}`,
          imageUrl: sampleProd.image,
        };
      case 'comp_card_without_image':
        return {
          title: 'Express VIP Member Protection',
          subtitle:
            'Zero-image typographic card layout with description, status badge, and direct action footer.',
          badgeText: 'Card Without Image',
          buttonText: 'Configure →',
        };
      case 'comp_featured_grid':
        return {
          title: sampleProd.title,
          subtitle: 'Curated Studio Pick',
          price: `$${sampleProd.price}`,
          badgeText: 'FEATURED',
          imageUrl: sampleProd.image,
          secondTitle: sampleProd2.title,
          secondSubtitle: 'Limited Edition Drop',
          secondPrice: `$${sampleProd2.price}`,
          secondBadgeText: 'NEW',
          secondImageUrl: sampleProd2.image,
          buttonText: '+ Quick Add',
        };
      case 'comp_flatlist_with_image':
        return {
          title: libraryFlatListConfig.title || 'Featured Collection',
          subtitle: 'Curated Picks',
          buttonText: '+ Add',
          flatListItemCount: libraryFlatListConfig.itemCount,
          flatListColumns: libraryFlatListConfig.columns,
          flatListRows: libraryFlatListConfig.rows,
          flatListCardVariant: 'with_image',
          flatListCustomItems: libraryFlatListConfig.customItems.map((it) => ({ ...it })),
        };
      case 'comp_flatlist_without_image':
        return {
          title: libraryFlatListConfig.title || 'Featured Collection',
          subtitle: 'Express Dispatch',
          buttonText: 'Select →',
          flatListItemCount: libraryFlatListConfig.itemCount,
          flatListColumns: libraryFlatListConfig.columns,
          flatListRows: libraryFlatListConfig.rows,
          flatListCardVariant: 'without_image',
          flatListCustomItems: libraryFlatListConfig.customItems.map((it) => ({ ...it })),
        };
      case 'comp_flatlist_builder':
        return {
          title: libraryFlatListConfig.title || 'Featured Collection',
          subtitle: 'Custom List',
          buttonText: '+ Add',
          flatListItemCount: libraryFlatListConfig.itemCount,
          flatListColumns: libraryFlatListConfig.columns,
          flatListRows: libraryFlatListConfig.rows,
          flatListCardVariant: libraryFlatListConfig.cardVariant,
          flatListCustomItems: libraryFlatListConfig.customItems.map((it) => ({ ...it })),
        };
      case 'comp_modal_dialog':
        return {
          title: 'Confirm Express Flash Order?',
          subtitle:
            'Your VIP discount (30% OFF) and priority 60-minute courier dispatch will be applied immediately.',
          badgeText: 'MODAL DIALOG',
          price: 'Cancel',
          buttonText: 'Confirm & Pay →',
        };
      case 'comp_bottom_sheet':
        return {
          title: 'Quick Filter & Sort Bottom Sheet',
          subtitle: 'Select delivery speed, size, and price range below',
          badgeText: 'BOTTOM SHEET',
          optionsCsv: 'Express 60m, Free Shipping, In Stock Only, Top Rated 4.8+',
          buttonText: 'Apply Filters (24 Items)',
        };
      case 'comp_navigation_drawer':
        return {
          title: 'Alex Morgan · VIP Member',
          subtitle: 'alex.morgan@novacart.io',
          badgeText: 'DRAWER MENU',
          optionsCsv: 'Home Storefront, Saved Wishlist, My Orders & Tracking, VIP Wallet & Rewards',
          buttonText: 'Sign Out',
        };
      case 'comp_bottom_modal':
        return {
          title: 'Added to Shopping Bag!',
          subtitle: sampleProd.title,
          price: `$${sampleProd.price}`,
          badgeText: 'BOTTOM MODAL',
          imageUrl: sampleProd.image,
          buttonText: 'Proceed to Checkout →',
        };
      case 'comp_action_sheet_picker':
        return {
          title: 'Choose Product Action',
          subtitle: 'Select an option for this item',
          optionsCsv: 'Share Product Link, Add to Private Wishlist, Compare Tech Specs, Report Issue',
          buttonText: 'Cancel',
        };
      case 'comp_toast_snackbar':
        return {
          title: 'Item saved to your Wishlist collection',
          badgeText: 'LIVE TOAST',
          buttonText: 'UNDO',
        };
      case 'comp_card_bento_metrics':
        return {
          title: '99.4%',
          subtitle: 'On-Time Dispatch',
          price: '24/7',
          badgeText: 'Live Concierge',
        };
      case 'comp_heading_sub_desc':
        return {
          title: 'Curated Collection Heading',
          subtitle: 'Sub-description explaining key value propositions and seasonal highlights.',
          buttonText: 'See All →',
        };
      case 'comp_dropdown_select':
        return {
          title: 'Dropdown Select Option',
          optionsCsv:
            'Price: High to Low, Price: Low to High, Sort by: Featured & Best Selling, Newest Arrivals First',
        };
      case 'comp_promo_banner_cta':
        return {
          title: 'Save 30% · Code VIP30',
          badgeText: 'PROMO COMPONENT',
          buttonText: 'Claim',
        };
      case 'comp_faq_accordion':
        return {
          title: 'What is included in express delivery?',
          subtitle: 'Every order includes real-time GPS courier tracking and doorstep inspection.',
        };
      case 'comp_Segmented_tabs':
        return {
          title: 'Tab 1 · Active',
          subtitle: 'Tab 2 · Details',
        };
      case 'elem_form':
        return {
          title: 'Form Element',
          subtitle: 'Full Name / Email',
          buttonText: 'Submit Form',
        };
      case 'elem_heading':
        return {
          title: 'Primary Display Heading Element',
        };
      case 'elem_sub_heading':
        return {
          title: 'Sub Heading · Section Eyebrow',
        };
      case 'elem_rich_text':
        return {
          title: 'Rich Text Content Block',
          subtitle:
            'Every plan includes core features to get started with bold formatting, bullet highlights, and priority support.',
        };
      case 'elem_paragraph_text':
        return {
          subtitle:
            'Enter your text here. Customize typography, spacing, and product storytelling inside any screen.',
        };
      case 'elem_bullet_list':
        return {
          title: 'My List',
          optionsCsv:
            'Title 1 | Description 1, Title 2 | Description 2, Title 3 | Description 3',
        };
      case 'elem_card_element':
        return {
          title: 'Featured Card Element',
          subtitle: 'Interactive card with thumbnail & action',
          imageUrl: sampleProd.image,
        };
      case 'elem_sign_document':
        return {
          title: 'Sign Document / E-Signature',
          subtitle: 'Alex Morgan — Verified Signature',
          badgeText: 'Sign Here ✍️',
        };
      case 'elem_document_file':
        return {
          title: 'Product_Specification.pdf',
          subtitle: 'Document · 1.8 MB PDF',
          buttonText: 'Open',
        };
      case 'elem_image':
      case 'elem_image_gallery':
        return {
          title: 'Featured Visual Asset',
          imageUrl: sampleProd.image,
        };
      case 'elem_button':
        return {
          buttonText: 'Primary Action Button →',
        };
      case 'elem_badge_pills':
        return {
          optionsCsv: 'NEW DROP, IN STOCK, TOP RATED',
        };
      case 'elem_video_player':
        return {
          title: 'Product Lookbook Video (0:45)',
        };
      case 'elem_link_row':
        return {
          title: 'View Size & Spec Documentation',
        };
      default:
        return {
          title: fallbackLabel,
          subtitle: 'Editable custom element content',
        };
    }
  };

  const handleAddLibraryItemToScreen = (
    targetScreenId: CustomEcommerceScreenId,
    itemId: string,
    insertBeforeSecId?: string | null
  ) => {
    const found = ALL_LIBRARY_ITEMS.find((i) => i.id === itemId);
    if (!found) return;
    const targetScreen = orderedScreens.find((s) => s.id === targetScreenId);
    const newInstance: DroppedLibraryItemInstance = {
      instanceId: `${itemId}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      itemId: found.id,
      category: found.category,
      label: found.label,
      data: getDefaultDataForLibraryItem(found.id, found.label),
      style: {
        accentColor: activeColorPreset.swatch,
        borderRadius: 14,
        padding: 10,
        shadow: 'sm',
        fontSize: 'md',
        textAlign: 'left',
        imageRatio: found.id === 'comp_featured_grid' ? '4:5' : undefined,
        priceTagPosition: found.id === 'comp_featured_grid' ? 'overlay-bottom-right' : undefined,
      },
    };
    if (insertBeforeSecId !== undefined) {
      setLastInsertedGapTargetByScreen((prev) => ({
        ...prev,
        [targetScreenId]: insertBeforeSecId,
      }));
    }
    setScreenDroppedItems((prev) => ({
      ...prev,
      [targetScreenId]: [...(prev[targetScreenId] || []), newInstance],
    }));
    setActiveScreen(targetScreenId);
    setSelectedInspectorTarget({
      type: 'item',
      screenId: targetScreenId,
      instanceId: newInstance.instanceId,
    });
    triggerToast(
      `Added "${found.label}" to "${targetScreen?.label || targetScreenId}" — Edit Padding, Radius & Shadow in Inspector`
    );
  };

  const handleUpdateNativeSectionStyle = (
    sectionId: string,
    patch: Partial<ExistingSectionStyleOverride>
  ) => {
    setNativeSectionStyleOverrides((prev) => ({
      ...prev,
      [sectionId]: { ...(prev[sectionId] || {}), ...patch },
    }));
  };

  const handleUpdateScreenStyle = (
    screenId: CustomEcommerceScreenId,
    patch: Partial<ExistingSectionStyleOverride>
  ) => {
    setScreenStyleOverrides((prev) => ({
      ...prev,
      [screenId]: { ...(prev[screenId] || {}), ...patch },
    }));
  };

  const handleUpdateDroppedItemData = (
    screenId: CustomEcommerceScreenId,
    instanceId: string,
    patch: Partial<DroppedLibraryItemData>
  ) => {
    setScreenDroppedItems((prev) => ({
      ...prev,
      [screenId]: (prev[screenId] || []).map((entry) =>
        entry.instanceId === instanceId
          ? { ...entry, data: { ...entry.data, ...patch } }
          : entry
      ),
    }));
  };

  const executePrototypeInteraction = (
    sourceScreenId: CustomEcommerceScreenId,
    proto: PrototypeInteractionConfig | undefined,
    sourceLabel?: string
  ) => {
    if (!proto || proto.enabled === false) return false;
    const act = proto.action || 'navigate_to';
    const destId =
      proto.destinationScreenId ||
      orderedScreens.find((s) => s.id !== sourceScreenId)?.id ||
      'HomeDashboard';
    const destMeta = orderedScreens.find((s) => s.id === destId);

    if (act === 'open_overlay' || act === 'swap_overlay') {
      const ovType: PrototypeOverlayType = proto.overlayType || 'bottom_sheet';
      setActivePrototypeOverlayByScreen((prev) => ({
        ...prev,
        [sourceScreenId]: {
          overlayType: ovType,
          title:
            destMeta?.label ||
            (ovType === 'modal'
              ? 'Prototype Modal Dialog'
              : ovType === 'drawer'
              ? 'Navigation Drawer Overlay'
              : ovType === 'bottom_modal'
              ? 'Bottom Modal Popup'
              : 'Interactive Bottom Sheet'),
          subtitle: `Triggered by ${sourceLabel || 'Selection'} (${(
            proto.trigger || 'on_tap'
          ).replace('_', ' ')}) · ${proto.animation || 'smart_animate'} (${
            proto.durationMs ?? 300
          }ms)`,
          destinationScreenId: destId,
        },
      }));
      triggerToast(
        `Prototype Action: Opened ${ovType.replace('_', ' ')} overlay on "${
          orderedScreens.find((s) => s.id === sourceScreenId)?.label || sourceScreenId
        }"`
      );
      return true;
    }

    if (act === 'close_overlay') {
      setActivePrototypeOverlayByScreen((prev) => ({
        ...prev,
        [sourceScreenId]: null,
      }));
      triggerToast('Prototype Action: Closed active overlay');
      return true;
    }

    if (act === 'back') {
      const currIdx = orderedScreens.findIndex((s) => s.id === sourceScreenId);
      const prevScr = currIdx > 0 ? orderedScreens[currIdx - 1] : orderedScreens[0];
      if (prevScr) {
        setActiveScreen(prevScr.id);
        setSelectedInspectorTarget({ type: 'screen', screenId: prevScr.id });
        const el = modalScreenCardRefs.current[prevScr.id];
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        triggerToast(`Prototype Back → "${prevScr.label}"`);
      }
      return true;
    }

    if (act === 'open_link') {
      triggerToast(`Prototype External Link → ${proto.externalUrl || 'https://novacart.store'}`);
      return true;
    }

    // Default: navigate_to or scroll_to
    if (proto.destinationVariant) {
      handleVariantChange(destId, proto.destinationVariant);
    }
    setActiveScreen(destId);
    setSelectedInspectorTarget({ type: 'screen', screenId: destId });
    const targetCardEl = modalScreenCardRefs.current[destId];
    if (targetCardEl) {
      targetCardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    triggerToast(
      `Prototype Navigate (${proto.animation || 'smart_animate'} ${proto.durationMs ?? 300}ms): "${
        orderedScreens.find((s) => s.id === sourceScreenId)?.label || sourceScreenId
      }" → "${destMeta?.label || destId}"`
    );
    return true;
  };

  const upsertScreenPrototypeConnection = (
    sourceId: CustomEcommerceScreenId,
    patch: Partial<PrototypeInteractionConfig>
  ) => {
    setScreenPrototypeConfigs((prev) => {
      const current = prev[sourceId] || {
        enabled: true,
        trigger: 'on_tap',
        action: 'navigate_to',
        destinationScreenId:
          orderedScreens.find((s) => s.id !== sourceId)?.id || 'HomeDashboard',
        animation: 'smart_animate',
        direction: 'right',
        easing: 'ease_in_out',
        durationMs: 300,
      };
      const updated: PrototypeInteractionConfig = {
        ...current,
        ...patch,
        enabled: patch.enabled !== undefined ? patch.enabled : true,
      };

      // Also sync with navigationConnections so VisualNavigationLinkBuilder stays in sync
      if (updated.destinationScreenId && updated.action === 'navigate_to') {
        const srcVar = selectedVariants[sourceId] || 'varient_1';
        const tgtVar =
          updated.destinationVariant ||
          selectedVariants[updated.destinationScreenId] ||
          'varient_1';
        const connId = `proto_${sourceId}__${updated.destinationScreenId}`;
        const transitionMap: Record<string, 'push' | 'modal' | 'replace' | 'tab'> = {
          push: 'push',
          move_in: 'modal',
          slide_in: 'modal',
          smart_animate: 'push',
          dissolve: 'replace',
          instant: 'tab',
        };
        setNavConnections((prevConns) => {
          const filtered = prevConns.filter((c) => c.sourceScreenId !== sourceId);
          return [
            ...filtered,
            {
              id: connId,
              sourceScreenId: sourceId,
              sourceVariant: srcVar,
              targetScreenId: updated.destinationScreenId!,
              targetVariant: tgtVar,
              triggerLabel:
                updated.triggerLabel ||
                `On ${(updated.trigger || 'on_tap').replace('_', ' ')} → ${
                  updated.animation || 'smart_animate'
                }`,
              transitionType: transitionMap[updated.animation || 'push'] || 'push',
            },
          ];
        });
      }

      return {
        ...prev,
        [sourceId]: updated,
      };
    });
    setTimeout(() => setPrototypeLineTick((t) => t + 1), 30);
  };

  const handleUpdateDroppedItemStyle = (
    screenId: CustomEcommerceScreenId,
    instanceId: string,
    patch: Partial<DroppedLibraryItemStyle>
  ) => {
    setScreenDroppedItems((prev) => ({
      ...prev,
      [screenId]: (prev[screenId] || []).map((entry) =>
        entry.instanceId === instanceId
          ? { ...entry, style: { ...entry.style, ...patch } }
          : entry
      ),
    }));
  };

  const handleDropReorderDroppedItemOnScreen = (
    screenId: CustomEcommerceScreenId,
    sourceInstanceId: string,
    targetInstanceId: string
  ) => {
    if (!sourceInstanceId || !targetInstanceId || sourceInstanceId === targetInstanceId) return;
    setScreenDroppedItems((prev) => {
      const list = [...(prev[screenId] || [])];
      const fromIdx = list.findIndex((i) => i.instanceId === sourceInstanceId);
      const toIdx = list.findIndex((i) => i.instanceId === targetInstanceId);
      if (fromIdx === -1 || toIdx === -1) return prev;
      const [moved] = list.splice(fromIdx, 1);
      list.splice(toIdx, 0, moved);
      triggerToast(`Reordered "${moved.label}" to position #${toIdx + 1}`);
      return { ...prev, [screenId]: list };
    });
  };

  const getDefaultBottomNavConfig = () => ({
    visible: true,
    activeColor: activeColorPreset.swatch,
    bgColor: isDark ? '#171717' : '#FFFFFF',
    items: [
      { id: 'HomeDashboard' as const, label: 'Home', iconKey: 'home' as const },
      { id: 'CategoryNavigation' as const, label: 'Categories', iconKey: 'grid' as const },
      { id: 'WishlistSaved' as const, label: 'Wishlist', iconKey: 'heart' as const },
      {
        id: 'ShoppingCart' as const,
        label: 'Cart',
        iconKey: 'cart' as const,
        badgeCount: Object.values(cartQuantities).reduce((a, b) => a + b, 0),
      },
      { id: 'UserProfileWallet' as const, label: 'Profile', iconKey: 'user' as const },
    ],
  });

  const getScreenBottomNavConfig = (screenId: CustomEcommerceScreenId) => {
    return screenCustomBottomNav[screenId] || getDefaultBottomNavConfig();
  };

  const updateScreenBottomNavConfig = (
    screenId: CustomEcommerceScreenId,
    updater: (
      current: ReturnType<typeof getDefaultBottomNavConfig>
    ) => ReturnType<typeof getDefaultBottomNavConfig>
  ) => {
    setScreenCustomBottomNav((prev) => {
      const current = prev[screenId] || getDefaultBottomNavConfig();
      return {
        ...prev,
        [screenId]: updater(current),
      };
    });
  };

  const handleRemoveDroppedItemFromScreen = (
    targetScreenId: CustomEcommerceScreenId,
    instanceId: string
  ) => {
    setScreenDroppedItems((prev) => ({
      ...prev,
      [targetScreenId]: (prev[targetScreenId] || []).filter(
        (entry) => entry.instanceId !== instanceId
      ),
    }));
    if (
      selectedInspectorTarget?.type === 'item' &&
      selectedInspectorTarget.instanceId === instanceId
    ) {
      setSelectedInspectorTarget(null);
    }
  };

  const handleMoveDroppedItemOnScreen = (
    targetScreenId: CustomEcommerceScreenId,
    instanceId: string,
    dir: 'up' | 'down'
  ) => {
    setScreenDroppedItems((prev) => {
      const list = [...(prev[targetScreenId] || [])];
      const idx = list.findIndex((entry) => entry.instanceId === instanceId);
      if (idx === -1) return prev;
      const nextIdx = dir === 'up' ? idx - 1 : idx + 1;
      if (nextIdx < 0 || nextIdx >= list.length) return prev;
      const [moved] = list.splice(idx, 1);
      list.splice(nextIdx, 0, moved);
      return { ...prev, [targetScreenId]: list };
    });
  };

  const triggerToast = (msg: string) => {
    setDragFeedbackToast(msg);
    setTimeout(() => setDragFeedbackToast(null), 2200);
  };

  // Reorder Screen Component Blocks (Hero Banners, Product Grids, Category Lists, etc.)
  const handleDropReorderComponentBlock = (sourceId: string, targetId: string) => {
    if (!sourceId || !targetId || sourceId === targetId) return;
    setComponentBlocks((prev) => {
      const fromIdx = prev.findIndex((b) => b.id === sourceId);
      const toIdx = prev.findIndex((b) => b.id === targetId);
      if (fromIdx === -1 || toIdx === -1) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, moved);
      triggerToast(`Reordered "${moved.label}" to position #${toIdx + 1}`);
      return copy;
    });
  };

  const handleMoveComponentBlock = (id: string, dir: 'up' | 'down') => {
    setComponentBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (idx === -1) return prev;
      const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(idx, 1);
      copy.splice(targetIdx, 0, moved);
      return copy;
    });
  };

  const handleToggleComponentVisibility = (id: string) => {
    setHiddenComponentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetComponentBlocks = () => {
    setComponentBlocks(DEFAULT_SCREEN_COMPONENT_BLOCKS);
    setHiddenComponentIds([]);
    triggerToast('Reset screen components to default order');
  };

  const handleVariantChange = (
    screenId: CustomEcommerceScreenId,
    variantId: CustomEcommerceVariantId
  ) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [screenId]: variantId,
    }));
  };

  const applyVariantToAllScreens = (variantId: CustomEcommerceVariantId) => {
    const next = {} as Record<CustomEcommerceScreenId, CustomEcommerceVariantId>;
    orderedScreens.forEach((s) => {
      next[s.id] = variantId;
    });
    setSelectedVariants(next);
    triggerToast(`Set all 30 screens to ${variantId.replace('varient_', 'Variant ')}`);
  };

  // Drag & Drop Reorder Handler for Screen Cards
  const handleDropReorderScreen = (
    sourceId: CustomEcommerceScreenId,
    targetId: CustomEcommerceScreenId,
    position: 'before' | 'after'
  ) => {
    if (!sourceId || !targetId || sourceId === targetId) return;
    setOrderedScreens((prev) => {
      const fromIdx = prev.findIndex((s) => s.id === sourceId);
      const toIdx = prev.findIndex((s) => s.id === targetId);
      if (fromIdx === -1 || toIdx === -1) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(fromIdx, 1);
      const updatedTargetIdx = copy.findIndex((s) => s.id === targetId);
      const insertIdx = position === 'after' ? updatedTargetIdx + 1 : updatedTargetIdx;
      copy.splice(insertIdx, 0, moved);
      triggerToast(`Moved "${moved.label}" ${position} target screen`);
      return copy;
    });
  };

  const handleMoveScreenStep = (screenId: CustomEcommerceScreenId, dir: 'up' | 'down') => {
    setOrderedScreens((prev) => {
      const idx = prev.findIndex((s) => s.id === screenId);
      if (idx === -1) return prev;
      const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(idx, 1);
      copy.splice(targetIdx, 0, moved);
      return copy;
    });
  };

  const handleResetScreenOrder = () => {
    setOrderedScreens(CUSTOM_ECOMMERCE_SCREENS_REGISTRY);
    triggerToast('Reset 30 screens to default E-commerce sequence');
  };

  const handleAddToCart = (productId: string) => {
    setCartQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCartQuantities((prev) => {
      const nextQty = Math.max(0, (prev[productId] || 1) + delta);
      const copy = { ...prev };
      if (nextQty === 0) {
        delete copy[productId];
      } else {
        copy[productId] = nextQty;
      }
      return copy;
    });
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const linkableScreens: LinkableScreenItem[] = useMemo(
    () =>
      orderedScreens.map((scr) => ({
        id: scr.id,
        label: scr.label,
        moduleGroup: scr.flowGroup,
        roleBadge: '6 VARIANTS',
        filePath: `${scr.filePath}/${selectedVariants[scr.id]}/index.tsx`,
        activeVariant: selectedVariants[scr.id],
        variants: ALL_CUSTOM_ECOMMERCE_VARIANT_IDS.map((vid, idx) => ({
          id: vid,
          label: scr.variants[vid],
          shortLabel: `V${idx + 1}`,
        })),
      })),
    [orderedScreens, selectedVariants]
  );

  const [navConnections, setNavConnections] = useState<ScreenNavigationConnection[]>(() =>
    buildDefaultNavigationConnections(linkableScreens, false)
  );

  const groupedDirectories = useMemo(() => {
    return FLOW_GROUPS.filter((g) => g !== 'ALL')
      .map((groupName) => {
        const items = orderedScreens.filter((scr) => {
          const matchesGroup =
            selectedFlowFilter === 'ALL'
              ? scr.flowGroup === groupName
              : scr.flowGroup === selectedFlowFilter && scr.flowGroup === groupName;
          const matchesSearch =
            !screenSearch.trim() ||
            scr.label.toLowerCase().includes(screenSearch.toLowerCase()) ||
            scr.description.toLowerCase().includes(screenSearch.toLowerCase()) ||
            Object.values(scr.variants).some((v) =>
              v.toLowerCase().includes(screenSearch.toLowerCase())
            );
          return matchesGroup && matchesSearch;
        });
        return {
          group: groupName,
          items,
        };
      })
      .filter((g) => g.items.length > 0);
  }, [orderedScreens, selectedFlowFilter, screenSearch]);

  const handleExportCustomEcommerceZip = async () => {
    if (isZipping) return;
    setIsZipping(true);
    try {
      const zip = new JSZip();
      zip.file(
        'README.md',
        `# ${appName} — Universal E-Commerce Screen Suite (30 Screens · 180 Variants)\n\n- **Package**: \`${packageName}\`\n- **Total Screens**: 30 Drag-and-Drop Screens\n- **Total Variants**: 180 Premium Layouts (6 Variants per Screen)\n`
      );
      orderedScreens.forEach((scr, idx) => {
        const chosenVar = selectedVariants[scr.id] || 'varient_1';
        zip.file(
          `${scr.filePath}/${chosenVar}/index.tsx`,
          `// Step ${idx + 1}: ${scr.label} (${scr.variants[chosenVar]})\n// Flow: ${scr.flowGroup}\n`
        );
      });
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `custom-ecommerce-30-screens.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsZipping(false);
    }
  };

  // Render Dynamic Reorderable E-Commerce Component Blocks Strip when pinned or on HomeDashboard
  const renderDynamicCustomComponentBlocksStrip = () => {
    const visibleBlocks = componentBlocks.filter((b) => !hiddenComponentIds.includes(b.id));
    if (visibleBlocks.length === 0) return null;

    const blockMap: Record<string, React.ReactNode> = {
      hero_banner: (
        <div
          key="hero_banner"
          className="p-3 rounded-2xl text-white flex items-center justify-between gap-2"
          style={{ background: `linear-gradient(135deg, ${activeColorPreset.swatch} 0%, #1E1B4B 100%)` }}
        >
          <div>
            <span className="px-1.5 py-0.5 rounded bg-white/20 text-[8px] font-black uppercase">
              HERO BANNER
            </span>
            <div className="text-xs font-black mt-0.5">45% OFF Season Drop</div>
          </div>
          <button
            type="button"
            onClick={() => setActiveScreen('ProductListingPage')}
            className="px-2.5 py-1 rounded-lg bg-white text-neutral-900 text-[9px] font-black cursor-pointer"
          >
            Shop Now
          </button>
        </div>
      ),
      category_list: (
        <div key="category_list" className="grid grid-cols-4 gap-1.5">
          {[
            { name: 'Audio', emoji: '🎧' },
            { name: 'Fashion', emoji: '👕' },
            { name: 'Grocery', emoji: '🥑' },
            { name: 'Gadgets', emoji: '⌚' },
          ].map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setActiveScreen('CategoryNavigation')}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col items-center gap-0.5 cursor-pointer"
            >
              <span className="text-sm">{c.emoji}</span>
              <span className="text-[9px] font-extrabold">{c.name}</span>
            </button>
          ))}
        </div>
      ),
      flash_deals: (
        <div
          key="flash_deals"
          className="p-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-between"
        >
          <span className="text-[10px] font-black flex items-center gap-1.5">
            <Flame size={13} className="text-amber-500" />
            <span>Flash Sale · 02:41:19</span>
          </span>
          <span className="px-1.5 py-0.5 rounded bg-amber-500 text-black text-[8px] font-black">
            LIVE
          </span>
        </div>
      ),
      featured_grid: (
        <div key="featured_grid" className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black tracking-tight">Featured Grid</span>
            <span className="text-[8px] font-mono uppercase text-neutral-400">2-Col · 4:5 Ratio</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 2).map((prod, idx) => (
              <div
                key={prod.id}
                onClick={() => setActiveScreen('ProductDetailPage')}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden cursor-pointer shadow-2xs"
              >
                <div
                  className={`relative w-full bg-neutral-100 dark:bg-neutral-800 ${
                    idx === 0 ? 'aspect-[4/5]' : 'aspect-square'
                  }`}
                >
                  <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                  <span
                    className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-full text-[9px] font-black text-white shadow-sm"
                    style={{ backgroundColor: activeColorPreset.swatch }}
                  >
                    ${prod.price}
                  </span>
                </div>
                <div className="p-2 flex items-center justify-between gap-1">
                  <div className="min-w-0">
                    <div className="text-[10px] font-extrabold truncate">{prod.title}</div>
                    <div className="text-[8px] text-neutral-400 truncate">{prod.category}</div>
                  </div>
                  <span
                    className="px-1.5 py-0.5 rounded text-[8px] font-black flex-shrink-0"
                    style={{
                      backgroundColor: `${activeColorPreset.swatch}18`,
                      color: activeColorPreset.swatch,
                    }}
                  >
                    ${prod.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      product_grid: (
        <div key="product_grid" className="grid grid-cols-2 gap-2">
          {CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 2).map((prod) => (
            <div
              key={prod.id}
              onClick={() => setActiveScreen('ProductDetailPage')}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-1 cursor-pointer"
            >
              <img src={prod.image} alt="" className="w-full h-16 object-cover rounded-lg" />
              <div className="text-[10px] font-extrabold truncate">{prod.title}</div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black" style={{ color: activeColorPreset.swatch }}>
                  ${prod.price}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(prod.id);
                  }}
                  className="w-5 h-5 rounded-md text-white flex items-center justify-center"
                  style={{ backgroundColor: activeColorPreset.swatch }}
                >
                  <Plus size={11} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ),
      brand_spotlight: (
        <div
          key="brand_spotlight"
          className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-between text-[9px] font-bold"
        >
          <span className="flex items-center gap-1">
            <Award size={12} style={{ color: activeColorPreset.swatch }} />
            <span>Official Brand Warranty · Free Returns</span>
          </span>
          <ChevronRight size={11} />
        </div>
      ),
      reviews_ugc: (
        <div
          key="reviews_ugc"
          className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-between text-[9px] font-bold"
        >
          <span className="flex items-center gap-1">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span>4.9/5 Verified Customer Photos (2.4k)</span>
          </span>
          <ChevronRight size={11} />
        </div>
      ),
    };

    return (
      <div className="px-3.5 pt-2.5 pb-1 space-y-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between text-[9px] font-mono uppercase opacity-60">
          <span>Custom Reordered Components</span>
          <span>{visibleBlocks.length} Active</span>
        </div>
        {visibleBlocks.map((b) => blockMap[b.id])}
      </div>
    );
  };

  // Render visual preview for any Component or Element dropped onto a screen
  const renderSingleDroppedLibraryItem = (
    targetScreenId: CustomEcommerceScreenId,
    item: DroppedLibraryItemInstance
  ) => {
    const sampleProd = CUSTOM_ECOMMERCE_PRODUCTS[0];
    const sampleProd2 = CUSTOM_ECOMMERCE_PRODUCTS[1] || CUSTOM_ECOMMERCE_PRODUCTS[0];
    const d = item.data || {};
    const st = item.style || {};
    const accent = st.accentColor || activeColorPreset.swatch;
    const radiusPx = st.borderRadius ?? 14;
    const padPx = st.padding ?? 10;
    const alignClass =
      st.textAlign === 'center'
        ? 'text-center'
        : st.textAlign === 'right'
        ? 'text-right'
        : 'text-left';
    const titleSizeClass =
      st.fontSize === 'lg'
        ? 'text-sm'
        : st.fontSize === 'sm'
        ? 'text-[10px]'
        : 'text-xs';

    const isSelectedForEdit =
      selectedInspectorTarget?.type === 'item' &&
      selectedInspectorTarget.screenId === targetScreenId &&
      selectedInspectorTarget.instanceId === item.instanceId;

    const isDragOverThisItem = dragOverDroppedInstanceId === item.instanceId;

    const shadowCss =
      st.shadow && DROPPED_SHADOW_CSS_MAP[st.shadow]
        ? DROPPED_SHADOW_CSS_MAP[st.shadow]
        : undefined;

    const customBoxStyle: React.CSSProperties = {
      width: st.width || undefined,
      height: st.height || undefined,
      minHeight: st.minHeight ? `${st.minHeight}px` : undefined,
      marginTop:
        st.marginTop !== undefined
          ? `${st.marginTop}px`
          : st.margin !== undefined
          ? `${st.margin}px`
          : undefined,
      marginRight:
        st.marginRight !== undefined
          ? `${st.marginRight}px`
          : st.margin !== undefined
          ? `${st.margin}px`
          : undefined,
      marginBottom:
        st.marginBottom !== undefined
          ? `${st.marginBottom}px`
          : st.margin !== undefined
          ? `${st.margin}px`
          : undefined,
      marginLeft:
        st.marginLeft !== undefined
          ? `${st.marginLeft}px`
          : st.margin !== undefined
          ? `${st.margin}px`
          : undefined,
      paddingTop:
        st.paddingTop !== undefined ? `${st.paddingTop}px` : `${padPx}px`,
      paddingRight:
        st.paddingRight !== undefined ? `${st.paddingRight}px` : `${padPx}px`,
      paddingBottom:
        st.paddingBottom !== undefined ? `${st.paddingBottom}px` : `${padPx}px`,
      paddingLeft:
        st.paddingLeft !== undefined ? `${st.paddingLeft}px` : `${padPx}px`,
      borderRadius: `${radiusPx}px`,
      borderWidth: st.borderWidth !== undefined ? `${st.borderWidth}px` : undefined,
      borderStyle:
        st.borderStyle || (st.borderWidth && st.borderWidth > 0 ? 'solid' : undefined),
      borderColor: st.borderColor || undefined,
      boxShadow: shadowCss,
      backgroundImage: st.backgroundGradient || undefined,
      backgroundColor: st.backgroundColor || undefined,
      color: st.textColor || undefined,
      opacity: st.opacity !== undefined ? st.opacity / 100 : undefined,
      fontSize: st.fontSizePx ? `${st.fontSizePx}px` : undefined,
      fontWeight: st.fontWeight || undefined,
      textAlign: st.textAlign || undefined,
      letterSpacing:
        st.letterSpacing !== undefined ? `${st.letterSpacing}px` : undefined,
      lineHeight: st.lineHeight !== undefined ? String(st.lineHeight) : undefined,
    };

    const renderVisualBody = () => {
      switch (item.itemId) {
        // ==================== COMPONENTS ====================
        case 'comp_search_bar_icon':
          return (
            <div
              style={customBoxStyle}
              className="flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-2xs"
            >
              <Search size={13} style={{ color: accent }} />
              <span className="text-[10px] font-semibold text-neutral-400 flex-1 text-left truncate">
                {d.title || 'Search products, brands, SKU...'}
              </span>
              <span
                className="px-2 py-0.5 rounded-lg text-[8px] font-black text-white"
                style={{ backgroundColor: accent }}
              >
                {d.buttonText || 'Filter'}
              </span>
            </div>
          );

        case 'comp_card_with_image':
          return (
            <div
              style={{
                ...customBoxStyle,
                padding: 0,
              }}
              className={`border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xs ${alignClass}`}
            >
              <div className="relative h-24 w-full bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={d.imageUrl || sampleProd.image}
                  alt={d.title || sampleProd.title}
                  className="w-full h-full object-cover"
                />
                <span
                  className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[8px] font-black text-white"
                  style={{ backgroundColor: accent }}
                >
                  {d.badgeText || 'WITH IMAGE'}
                </span>
              </div>
              <div
                style={{
                  paddingTop: st.paddingTop !== undefined ? `${st.paddingTop}px` : `${padPx}px`,
                  paddingRight: st.paddingRight !== undefined ? `${st.paddingRight}px` : `${padPx}px`,
                  paddingBottom: st.paddingBottom !== undefined ? `${st.paddingBottom}px` : `${padPx}px`,
                  paddingLeft: st.paddingLeft !== undefined ? `${st.paddingLeft}px` : `${padPx}px`,
                }}
                className="space-y-1"
              >
                <div className={`${titleSizeClass} font-black truncate`}>
                  {d.title || sampleProd.title}
                </div>
                <p className="text-[9px] text-neutral-500 dark:text-neutral-400 line-clamp-2">
                  {d.subtitle || 'Premium studio edition with express delivery'}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-black" style={{ color: accent }}>
                    {d.price || `$${sampleProd.price}`}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(sampleProd.id);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[9px] font-black text-white cursor-pointer"
                    style={{ backgroundColor: accent }}
                  >
                    {d.buttonText || '+ Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          );

        case 'comp_card_horizontal_split':
          return (
            <div
              style={customBoxStyle}
              className={`border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-2.5 shadow-2xs ${alignClass}`}
            >
              <img
                src={d.imageUrl || sampleProd2.image}
                alt={d.title || sampleProd2.title}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1 space-y-0.5">
                <span
                  className="text-[8px] font-black uppercase tracking-wider"
                  style={{ color: accent }}
                >
                  {d.subtitle || 'Horizontal Split Card'}
                </span>
                <div className={`${titleSizeClass} font-black truncate`}>
                  {d.title || sampleProd2.title}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-black" style={{ color: accent }}>
                    {d.price || `$${sampleProd2.price}`}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[9px] font-bold">
                    {d.badgeText || `★ ${sampleProd2.rating}`}
                  </span>
                </div>
              </div>
            </div>
          );

        case 'comp_card_overlay_glass':
          return (
            <div
              style={{
                ...customBoxStyle,
                padding: 0,
                height: st.height && st.height !== 'auto' ? st.height : '112px',
              }}
              className={`relative overflow-hidden border border-neutral-200 dark:border-neutral-800 ${alignClass}`}
            >
              <img
                src={d.imageUrl || sampleProd.image}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-2.5 flex flex-col justify-end text-white">
                <span className="text-[8px] font-mono uppercase tracking-widest opacity-80">
                  {d.subtitle || 'Full-Bleed Image Card'}
                </span>
                <div className="flex items-center justify-between">
                  <span className={`${titleSizeClass} font-black truncate`}>
                    {d.title || sampleProd.title}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-lg text-[9px] font-black"
                    style={{ backgroundColor: accent }}
                  >
                    {d.price || `$${sampleProd.price}`}
                  </span>
                </div>
              </div>
            </div>
          );

        case 'comp_card_without_image':
          return (
            <div
              style={customBoxStyle}
              className={`border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-1.5 shadow-2xs ${alignClass}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase"
                  style={{
                    backgroundColor: `${accent}20`,
                    color: accent,
                  }}
                >
                  {d.badgeText || 'Card Without Image'}
                </span>
                <span className="text-[9px] font-mono font-bold text-emerald-500">
                  ✓ Verified
                </span>
              </div>
              <div className={`${titleSizeClass} font-black`}>
                {d.title || 'Express VIP Member Protection'}
              </div>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                {d.subtitle ||
                  'Zero-image typographic card layout with description, status badge, and direct action footer.'}
              </p>
              <div className="pt-1 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 text-[9px] font-extrabold">
                <span>Instant Activation</span>
                <span style={{ color: accent }}>{d.buttonText || 'Configure →'}</span>
              </div>
            </div>
          );

        case 'comp_featured_grid': {
          const ratioMode = st.imageRatio || '4:5';
          const getAspectClassForCol = (colIdx: number) => {
            if (ratioMode === 'mixed') {
              return colIdx === 0 ? 'aspect-[4/5]' : 'aspect-square';
            }
            if (ratioMode === '1:1') return 'aspect-square';
            if (ratioMode === '16:9') return 'aspect-video';
            if (ratioMode === '3:4') return 'aspect-[3/4]';
            return 'aspect-[4/5]';
          };
          const priceMode = st.priceTagPosition || 'overlay-bottom-right';
          const cards = [
            {
              id: sampleProd.id,
              title: d.title || sampleProd.title,
              subtitle: d.subtitle || 'Curated Studio Pick',
              price: d.price || `$${sampleProd.price}`,
              badge: d.badgeText || 'FEATURED',
              image: d.imageUrl || sampleProd.image,
            },
            {
              id: sampleProd2.id,
              title: d.secondTitle || sampleProd2.title,
              subtitle: d.secondSubtitle || 'Limited Edition Drop',
              price: d.secondPrice || `$${sampleProd2.price}`,
              badge: d.secondBadgeText || 'NEW',
              image: d.secondImageUrl || sampleProd2.image,
            },
          ];

          return (
            <div
              style={customBoxStyle}
              className={`border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2 shadow-2xs ${alignClass}`}
            >
              <div className="flex items-center justify-between gap-1.5">
                <span className={`${titleSizeClass} font-black truncate`}>
                  {d.title || 'Featured Collection'}
                </span>
                <span
                  className="text-[9px] font-extrabold"
                  style={{ color: accent }}
                >
                  {d.subtitle || 'See All'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 items-start">
                {cards.map((card, cIdx) => (
                  <div
                    key={`${card.id}_${cIdx}`}
                    className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/50 overflow-hidden flex flex-col justify-between"
                    style={{ borderRadius: `${Math.max(8, radiusPx - 4)}px` }}
                  >
                    <div
                      className={`relative w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 ${getAspectClassForCol(
                        cIdx
                      )}`}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                      {card.badge && (
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md text-[7px] font-black uppercase tracking-wider bg-black/70 text-white backdrop-blur-xs">
                          {card.badge}
                        </span>
                      )}

                      {/* Inline / Overlay Price Tag Pill */}
                      {priceMode !== 'inline-footer' && (
                        <span
                          className={`absolute ${
                            priceMode === 'overlay-top-left'
                              ? 'top-1.5 right-1.5'
                              : 'bottom-1.5 right-1.5'
                          } px-2 py-0.5 rounded-full text-[9px] font-black text-white shadow-sm flex items-center gap-0.5`}
                          style={{ backgroundColor: accent }}
                        >
                          <Tag size={8} />
                          <span>{card.price}</span>
                        </span>
                      )}
                    </div>

                    <div className="p-2 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <div className={`${titleSizeClass} font-black truncate`}>{card.title}</div>
                        <span
                          className="px-1.5 py-0.5 rounded-md text-[9px] font-black flex-shrink-0 flex items-center gap-0.5"
                          style={{
                            backgroundColor: `${accent}18`,
                            color: accent,
                          }}
                        >
                          <Tag size={8} />
                          <span>{card.price}</span>
                        </span>
                      </div>
                      <div className="text-[8px] text-neutral-500 dark:text-neutral-400 truncate">
                        {card.subtitle}
                      </div>
                      {d.buttonText && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(card.id);
                          }}
                          className="w-full mt-1 py-1 rounded-lg text-[8px] font-black text-white cursor-pointer"
                          style={{ backgroundColor: accent }}
                        >
                          {d.buttonText}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        case 'comp_flatlist_with_image':
        case 'comp_flatlist_without_image':
        case 'comp_flatlist_builder': {
          const defaultCardMode =
            item.itemId === 'comp_flatlist_without_image' ? 'without_image' : 'with_image';
          const cardVariant = d.flatListCardVariant || defaultCardMode;
          const cols: 1 | 2 | 3 | 4 = d.flatListColumns || 2;
          const rows: number = Math.max(1, d.flatListRows || 2);
          const totalCount: number = Math.max(
            1,
            Math.min(24, d.flatListItemCount ?? cols * rows)
          );
          const ratioMode = st.imageRatio || '1:1';
          const flatAspectClass =
            ratioMode === '4:5'
              ? 'aspect-[4/5]'
              : ratioMode === '16:9'
              ? 'aspect-video'
              : ratioMode === '3:4'
              ? 'aspect-[3/4]'
              : 'aspect-square';

          const basePool: FlatListCustomItem[] =
            d.flatListCustomItems && d.flatListCustomItems.length > 0
              ? d.flatListCustomItems
              : CUSTOM_ECOMMERCE_PRODUCTS.map((p, idx) => ({
                  id: `pool_${idx}`,
                  title: p.title,
                  subtitle: p.category,
                  price: `$${p.price}`,
                  badge: `★ ${p.rating}`,
                  imageUrl: p.image,
                }));

          // Build exact `totalCount` items so changing the "How many items" input box immediately updates the rendered FlatList
          const renderedListItems: FlatListCustomItem[] = Array.from(
            { length: totalCount },
            (_, idx) => {
              const existing = basePool[idx];
              if (existing) return existing;
              const fallbackProd =
                CUSTOM_ECOMMERCE_PRODUCTS[idx % CUSTOM_ECOMMERCE_PRODUCTS.length] || sampleProd;
              return {
                id: `auto_${idx + 1}`,
                title: `${fallbackProd.title} #${idx + 1}`,
                subtitle: fallbackProd.category,
                price: `$${fallbackProd.price}`,
                badge: `ITEM #${idx + 1}`,
                imageUrl: fallbackProd.image,
              };
            }
          );

          const gridColsStyle: React.CSSProperties = {
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          };

          return (
            <div
              style={customBoxStyle}
              className={`border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2 shadow-2xs ${alignClass}`}
            >
              {/* Clean Mobile Section Header (Only shows component title & rendered cards on the mobile screen) */}
              {d.title && (
                <div className="flex items-center justify-between gap-1.5">
                  <span className={`${titleSizeClass} font-black truncate`}>{d.title}</span>
                  {d.subtitle && (
                    <span className="text-[9px] font-semibold text-neutral-400 truncate">
                      {d.subtitle}
                    </span>
                  )}
                </div>
              )}

              {/* FlatList Rendered Cards Grid (Columns × Rows) */}
              <div className="grid gap-2 items-stretch" style={gridColsStyle}>
                {renderedListItems.map((flItem, idx) => {
                  // 1. WITH IMAGE CARD
                  if (cardVariant === 'with_image') {
                    return (
                      <div
                        key={`${flItem.id}_${idx}`}
                        className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/60 overflow-hidden flex flex-col justify-between shadow-2xs"
                        style={{ borderRadius: `${Math.max(8, radiusPx - 4)}px` }}
                      >
                        <div
                          className={`relative w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 ${flatAspectClass}`}
                        >
                          <img
                            src={flItem.imageUrl || sampleProd.image}
                            alt={flItem.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-white text-[7px] font-black uppercase">
                            {flItem.badge || `#${idx + 1}`}
                          </span>
                          <span
                            className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-[8px] font-black text-white shadow-xs"
                            style={{ backgroundColor: accent }}
                          >
                            {flItem.price}
                          </span>
                        </div>
                        <div className="p-2 space-y-1">
                          <div className="text-[10px] font-black truncate">{flItem.title}</div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[8px] text-neutral-500 dark:text-neutral-400 truncate">
                              {flItem.subtitle}
                            </span>
                            <span
                              className="text-[8px] font-black px-1 py-0.2 rounded"
                              style={{
                                backgroundColor: `${accent}18`,
                                color: accent,
                              }}
                            >
                              {flItem.price}
                            </span>
                          </div>
                          {d.buttonText && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(sampleProd.id);
                              }}
                              className="w-full py-1 rounded-md text-[8px] font-black text-white cursor-pointer"
                              style={{ backgroundColor: accent }}
                            >
                              {d.buttonText}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  }

                  // 2. WITHOUT IMAGE CARD
                  if (cardVariant === 'without_image') {
                    return (
                      <div
                        key={`${flItem.id}_${idx}`}
                        className="p-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/60 flex flex-col justify-between gap-1.5 shadow-2xs"
                        style={{ borderRadius: `${Math.max(8, radiusPx - 4)}px` }}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className="px-1.5 py-0.5 rounded text-[7px] font-mono font-black uppercase"
                            style={{
                              backgroundColor: `${accent}20`,
                              color: accent,
                            }}
                          >
                            {flItem.badge || `ITEM #${idx + 1}`}
                          </span>
                          <span className="text-[9px] font-black" style={{ color: accent }}>
                            {flItem.price}
                          </span>
                        </div>
                        <div>
                          <div className="text-[10px] font-black leading-tight line-clamp-1">
                            {flItem.title}
                          </div>
                          <p className="text-[8px] text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-0.5">
                            {flItem.subtitle}
                          </p>
                        </div>
                        <div className="pt-1 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between text-[8px] font-extrabold">
                          <span className="text-neutral-400">No-Image Card</span>
                          <span style={{ color: accent }}>{d.buttonText || 'Details →'}</span>
                        </div>
                      </div>
                    );
                  }

                  // 3. HORIZONTAL SPLIT CARD (IMAGE + INFO)
                  if (cardVariant === 'horizontal_image') {
                    return (
                      <div
                        key={`${flItem.id}_${idx}`}
                        className="p-2 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/60 flex items-center gap-2 shadow-2xs"
                        style={{ borderRadius: `${Math.max(8, radiusPx - 4)}px` }}
                      >
                        <img
                          src={flItem.imageUrl || sampleProd.image}
                          alt={flItem.title}
                          className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-black truncate">{flItem.title}</div>
                          <div className="text-[8px] text-neutral-500 truncate">
                            {flItem.subtitle}
                          </div>
                          <div className="flex items-center justify-between mt-0.5">
                            <span className="text-[9px] font-black" style={{ color: accent }}>
                              {flItem.price}
                            </span>
                            <span className="text-[7px] font-mono px-1 py-0.2 rounded bg-neutral-200/70 dark:bg-neutral-800">
                              {flItem.badge || `#${idx + 1}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // 4. COMPACT LIST ROW CARD (WITHOUT IMAGE)
                  return (
                    <div
                      key={`${flItem.id}_${idx}`}
                      className="px-2.5 py-1.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/60 flex items-center justify-between gap-2"
                      style={{ borderRadius: `${Math.max(8, radiusPx - 4)}px` }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-5 h-5 rounded-md text-[8px] font-mono font-black text-white flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: accent }}
                        >
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <div className="text-[9px] font-black truncate">{flItem.title}</div>
                          <div className="text-[8px] text-neutral-400 truncate">
                            {flItem.subtitle}
                          </div>
                        </div>
                      </div>
                      <span className="text-[9px] font-black flex-shrink-0" style={{ color: accent }}>
                        {flItem.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        case 'comp_card_bento_metrics':
          return (
            <div className={`grid grid-cols-2 gap-2 ${alignClass}`}>
              <div
                style={customBoxStyle}
                className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
              >
                <div className="text-[8px] font-mono uppercase text-neutral-400">
                  Bento Card #1
                </div>
                <div className="text-sm font-black mt-0.5" style={{ color: accent }}>
                  {d.title || '99.4%'}
                </div>
                <div className="text-[9px] font-bold text-neutral-500">
                  {d.subtitle || 'On-Time Dispatch'}
                </div>
              </div>
              <div
                style={customBoxStyle}
                className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
              >
                <div className="text-[8px] font-mono uppercase text-neutral-400">
                  Bento Card #2
                </div>
                <div className="text-sm font-black mt-0.5">{d.price || '24/7'}</div>
                <div className="text-[9px] font-bold text-neutral-500">
                  {d.badgeText || 'Live Concierge'}
                </div>
              </div>
            </div>
          );

        case 'comp_heading_sub_desc':
          return (
            <div
              style={customBoxStyle}
              className={`border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-1 ${alignClass}`}
            >
              <div className="flex items-center justify-between">
                <h4 className={`${titleSizeClass} font-black`}>
                  {d.title || 'Curated Collection Heading'}
                </h4>
                <span className="text-[9px] font-extrabold" style={{ color: accent }}>
                  {d.buttonText || 'See All →'}
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                {d.subtitle ||
                  'Sub-description explaining key value propositions and seasonal highlights.'}
              </p>
            </div>
          );

        case 'comp_dropdown_select': {
          const options = (
            d.optionsCsv ||
            'Price: High to Low, Price: Low to High, Sort by: Featured & Best Selling, Newest Arrivals First'
          )
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
          return (
            <div
              style={customBoxStyle}
              className={`border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-1 ${alignClass}`}
            >
              <label
                className="block text-[9px] font-extrabold uppercase tracking-wider"
                style={{ color: st.textColor || '#94A3B8' }}
              >
                {d.title || 'Dropdown Select Option'}
              </label>
              <select
                onClick={(e) => e.stopPropagation()}
                className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-[10px] font-bold focus:outline-none"
              >
                {options.map((opt, idx) => (
                  <option key={idx}>{opt}</option>
                ))}
              </select>
            </div>
          );
        }

        case 'comp_promo_banner_cta':
          return (
            <div
              className={`text-white flex items-center justify-between gap-2 ${alignClass}`}
              style={{
                ...customBoxStyle,
                background:
                  st.backgroundGradient ||
                  st.backgroundColor ||
                  `linear-gradient(135deg, ${accent} 0%, #0F172A 100%)`,
                color: st.textColor || '#FFFFFF',
              }}
            >
              <div>
                <span className="px-1.5 py-0.5 rounded bg-white/20 text-[8px] font-black uppercase">
                  {d.badgeText || 'PROMO COMPONENT'}
                </span>
                <div className={`${titleSizeClass} font-black mt-0.5`}>
                  {d.title || 'Save 30% · Code VIP30'}
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-white text-neutral-900 text-[9px] font-black flex-shrink-0">
                {d.buttonText || 'Claim'}
              </span>
            </div>
          );

        case 'comp_faq_accordion':
          return (
            <div
              style={{
                ...customBoxStyle,
                padding: 0,
              }}
              className={`border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 divide-y divide-neutral-100 dark:divide-neutral-800 ${alignClass}`}
            >
              <div className="px-3 py-2 flex items-center justify-between text-[10px] font-extrabold">
                <span>{d.title || 'What is included in express delivery?'}</span>
                <span style={{ color: accent }}>−</span>
              </div>
              <div className="px-3 py-2 text-[9px] text-neutral-500 dark:text-neutral-400">
                {d.subtitle ||
                  'Every order includes real-time GPS courier tracking and doorstep inspection.'}
              </div>
            </div>
          );

        case 'comp_Segmented_tabs':
          return (
            <div
              style={customBoxStyle}
              className="p-1.5 bg-neutral-100 dark:bg-neutral-800 grid grid-cols-2 gap-1 text-center"
            >
              <div
                className="py-1.5 rounded-lg text-[10px] font-black text-white shadow-2xs"
                style={{ backgroundColor: accent }}
              >
                {d.title || 'Tab 1 · Active'}
              </div>
              <div className="py-1.5 rounded-lg text-[10px] font-bold text-neutral-500">
                {d.subtitle || 'Tab 2 · Details'}
              </div>
            </div>
          );

        case 'comp_modal_dialog':
          return (
            <div
              style={{
                ...customBoxStyle,
                padding: `${Math.max(10, padPx)}px`,
              }}
              className={`rounded-2xl bg-neutral-900/15 dark:bg-black/45 p-2.5 backdrop-blur-[1px] border border-neutral-300/70 dark:border-neutral-700 ${alignClass}`}
            >
              <div
                style={{ borderRadius: `${radiusPx}px` }}
                className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-xl space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="px-2 py-0.5 rounded-md text-[8px] font-mono font-black uppercase text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {d.badgeText || 'MODAL DIALOG'}
                  </span>
                  <span className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 flex items-center justify-center text-[10px] font-black">
                    ✕
                  </span>
                </div>
                <div>
                  <h4 className={`${titleSizeClass} font-black`}>
                    {d.title || 'Confirm Express Flash Order?'}
                  </h4>
                  <p className="text-[9px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                    {d.subtitle ||
                      'Your VIP discount (30% OFF) and priority 60-minute courier dispatch will be applied immediately.'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className="py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-[9px] font-bold text-neutral-700 dark:text-neutral-300 cursor-pointer"
                  >
                    {d.price || 'Cancel'}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className="py-1.5 rounded-lg text-[9px] font-black text-white shadow-xs cursor-pointer"
                    style={{ backgroundColor: accent }}
                  >
                    {d.buttonText || 'Confirm & Pay →'}
                  </button>
                </div>
              </div>
            </div>
          );

        case 'comp_bottom_sheet': {
          const sheetChips = (
            d.optionsCsv || 'Express 60m, Free Shipping, In Stock Only, Top Rated 4.8+'
          )
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
          return (
            <div
              style={{
                ...customBoxStyle,
                borderTopLeftRadius: `${Math.max(18, radiusPx)}px`,
                borderTopRightRadius: `${Math.max(18, radiusPx)}px`,
              }}
              className={`border-t-2 border-x border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg space-y-2.5 ${alignClass}`}
            >
              {/* Drag Handle Pill */}
              <div className="flex flex-col items-center pt-0.5">
                <div className="w-9 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className={`${titleSizeClass} font-black`}>
                    {d.title || 'Quick Filter & Sort Bottom Sheet'}
                  </div>
                  <div className="text-[9px] text-neutral-500 dark:text-neutral-400">
                    {d.subtitle || 'Select delivery speed, size, and price range below'}
                  </div>
                </div>
                <span
                  className="px-1.5 py-0.5 rounded text-[7px] font-mono font-black uppercase"
                  style={{ backgroundColor: `${accent}20`, color: accent }}
                >
                  {d.badgeText || 'SHEET'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sheetChips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded-lg text-[8px] font-extrabold border"
                    style={
                      idx === 0
                        ? {
                            backgroundColor: accent,
                            borderColor: accent,
                            color: '#FFFFFF',
                          }
                        : {
                            borderColor: 'rgba(148,163,184,0.35)',
                          }
                    }
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="w-full py-2 rounded-xl text-[10px] font-black text-white shadow-xs cursor-pointer"
                style={{ backgroundColor: accent }}
              >
                {d.buttonText || 'Apply Filters (24 Items)'}
              </button>
            </div>
          );
        }

        case 'comp_navigation_drawer': {
          const drawerLinks = (
            d.optionsCsv ||
            'Home Storefront, Saved Wishlist, My Orders & Tracking, VIP Wallet & Rewards'
          )
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
          return (
            <div
              style={customBoxStyle}
              className={`border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-950 overflow-hidden flex ${alignClass}`}
            >
              {/* Left Slide-Out Drawer Panel */}
              <div className="w-4/5 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 p-2.5 space-y-2.5 shadow-md">
                <div
                  className="p-2 rounded-xl text-white flex items-center gap-2"
                  style={{ backgroundColor: accent }}
                >
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-black text-[10px] flex-shrink-0">
                    AM
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-black truncate">
                      {d.title || 'Alex Morgan · VIP'}
                    </div>
                    <div className="text-[8px] opacity-85 truncate">
                      {d.subtitle || 'alex.morgan@novacart.io'}
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  {drawerLinks.map((lnk, idx) => (
                    <div
                      key={idx}
                      className={`px-2 py-1.5 rounded-lg text-[9px] font-bold flex items-center justify-between ${
                        idx === 0
                          ? 'bg-neutral-100 dark:bg-neutral-800 font-black'
                          : 'text-neutral-600 dark:text-neutral-400'
                      }`}
                      style={idx === 0 ? { color: accent } : undefined}
                    >
                      <span className="truncate">{lnk}</span>
                      <ChevronRight size={10} />
                    </div>
                  ))}
                </div>
                <div className="pt-1 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[8px] font-extrabold text-rose-500">
                  <span>{d.buttonText || 'Sign Out'}</span>
                  <span>→</span>
                </div>
              </div>
              {/* Dimmed Backdrop Preview Strip */}
              <div className="flex-1 bg-black/25 flex items-start justify-center pt-2">
                <span className="w-5 h-5 rounded-full bg-white/80 text-neutral-900 flex items-center justify-center text-[9px] font-black">
                  ✕
                </span>
              </div>
            </div>
          );
        }

        case 'comp_bottom_modal':
          return (
            <div
              style={{
                ...customBoxStyle,
                borderRadius: `${Math.max(16, radiusPx)}px`,
              }}
              className={`p-3 border-2 bg-white dark:bg-neutral-900 shadow-xl space-y-2.5 ${alignClass}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="px-2 py-0.5 rounded-full text-[8px] font-mono font-black uppercase text-white"
                  style={{ backgroundColor: accent }}
                >
                  {d.badgeText || 'BOTTOM MODAL'}
                </span>
                <span className="text-[9px] font-bold text-neutral-400">Swipe down to close</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/70 dark:border-neutral-700">
                <img
                  src={d.imageUrl || sampleProd.image}
                  alt={d.title || sampleProd.title}
                  className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-black truncate">
                    {d.title || 'Added to Shopping Bag!'}
                  </div>
                  <div className="text-[9px] text-neutral-500 truncate">
                    {d.subtitle || sampleProd.title}
                  </div>
                  <div className="text-[10px] font-black mt-0.5" style={{ color: accent }}>
                    {d.price || `$${sampleProd.price}`}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="w-full py-2 rounded-xl text-[10px] font-black text-white shadow-xs cursor-pointer"
                style={{ backgroundColor: accent }}
              >
                {d.buttonText || 'Proceed to Checkout →'}
              </button>
            </div>
          );

        case 'comp_action_sheet_picker': {
          const actions = (
            d.optionsCsv ||
            'Share Product Link, Add to Private Wishlist, Compare Tech Specs, Report Issue'
          )
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
          return (
            <div style={customBoxStyle} className={`space-y-1.5 ${alignClass}`}>
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 divide-y divide-neutral-100 dark:divide-neutral-800 overflow-hidden shadow-md">
                <div className="px-3 py-2 text-center">
                  <div className="text-[9px] font-extrabold text-neutral-400 uppercase tracking-wider">
                    {d.title || 'Choose Product Action'}
                  </div>
                </div>
                {actions.map((act, idx) => (
                  <div
                    key={idx}
                    className={`px-3 py-2 text-center text-[10px] font-extrabold ${
                      idx === actions.length - 1 ? 'text-rose-500' : ''
                    }`}
                    style={idx === 0 ? { color: accent } : undefined}
                  >
                    {act}
                  </div>
                ))}
              </div>
              <div className="py-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-center text-[10px] font-black shadow-xs">
                {d.buttonText || 'Cancel'}
              </div>
            </div>
          );
        }

        case 'comp_toast_snackbar':
          return (
            <div
              style={{
                ...customBoxStyle,
                backgroundColor: st.backgroundColor || '#0F172A',
                color: st.textColor || '#FFFFFF',
              }}
              className="px-3 py-2.5 rounded-xl shadow-lg flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: accent }}
                />
                <span className="text-[10px] font-bold truncate">
                  {d.title || 'Item saved to your Wishlist collection'}
                </span>
              </div>
              <span
                className="px-2 py-0.5 rounded text-[9px] font-black uppercase flex-shrink-0"
                style={{ backgroundColor: accent, color: '#FFFFFF' }}
              >
                {d.buttonText || 'UNDO'}
              </span>
            </div>
          );

        // ==================== ELEMENTS ====================
        case 'elem_form':
          return (
            <div
              style={customBoxStyle}
              className={`border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2 ${alignClass}`}
            >
              <div className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                {d.title || 'Form Element'}
              </div>
              <input
                type="text"
                readOnly
                placeholder={d.subtitle || 'Full Name / Email'}
                className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-[10px]"
              />
              <button
                type="button"
                className="w-full py-1.5 rounded-lg text-[10px] font-black text-white"
                style={{ backgroundColor: accent }}
              >
                {d.buttonText || 'Submit Form'}
              </button>
            </div>
          );

        case 'elem_heading':
          return (
            <div style={customBoxStyle} className={alignClass}>
              <div
                className={`${
                  st.fontSize === 'lg'
                    ? 'text-base'
                    : st.fontSize === 'sm'
                    ? 'text-xs'
                    : 'text-sm'
                } font-black tracking-tight`}
                style={{ color: st.textColor || undefined }}
              >
                {d.title || 'Primary Display Heading Element'}
              </div>
            </div>
          );

        case 'elem_sub_heading':
          return (
            <div style={customBoxStyle} className={alignClass}>
              <div
                className={`${titleSizeClass} font-extrabold uppercase tracking-wider`}
                style={{ color: st.textColor || accent }}
              >
                {d.title || 'Sub Heading · Section Eyebrow'}
              </div>
            </div>
          );

        case 'elem_rich_text':
          return (
            <div
              style={customBoxStyle}
              className={`border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-1 ${alignClass}`}
            >
              <div className={`${titleSizeClass} font-black`}>
                {d.title || 'Rich Text Content Block'}
              </div>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {d.subtitle ||
                  'Every plan includes core features to get started with bold formatting, bullet highlights, and priority support.'}
              </p>
            </div>
          );

        case 'elem_paragraph_text':
          return (
            <p
              style={customBoxStyle}
              className={`text-[10px] text-neutral-600 dark:text-neutral-300 leading-relaxed ${alignClass}`}
            >
              {d.subtitle ||
                d.title ||
                'Enter your text here. Customize typography, spacing, and product storytelling inside any screen.'}
            </p>
          );

        case 'elem_card_element':
          return (
            <div
              style={customBoxStyle}
              className={`border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-2.5 ${alignClass}`}
            >
              <img
                src={d.imageUrl || sampleProd.image}
                alt=""
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className={`${titleSizeClass} font-black truncate`}>
                  {d.title || 'Featured Card Element'}
                </div>
                <div className="text-[9px] text-neutral-500 truncate">
                  {d.subtitle || 'Interactive card with thumbnail & action'}
                </div>
              </div>
            </div>
          );

        case 'elem_sign_document':
          return (
            <div
              style={customBoxStyle}
              className={`border border-dashed border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 space-y-1.5 ${alignClass}`}
            >
              <div className="flex items-center justify-between text-[10px] font-black">
                <span>{d.title || 'Sign Document / E-Signature'}</span>
                <span style={{ color: accent }}>{d.badgeText || 'Sign Here ✍️'}</span>
              </div>
              <div className="h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-serif italic text-xs text-neutral-500">
                {d.subtitle || 'Alex Morgan — Verified Signature'}
              </div>
            </div>
          );

        case 'elem_document_file':
          return (
            <div
              style={customBoxStyle}
              className={`border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-between ${alignClass}`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: accent }}
                >
                  <FileText size={14} />
                </div>
                <div>
                  <div className="text-[10px] font-black">
                    {d.title || 'Product_Specification.pdf'}
                  </div>
                  <div className="text-[9px] text-neutral-400">
                    {d.subtitle || 'Document · 1.8 MB PDF'}
                  </div>
                </div>
              </div>
              <span
                className="px-2 py-0.5 rounded text-[9px] font-black text-white"
                style={{ backgroundColor: accent }}
              >
                {d.buttonText || 'Open'}
              </span>
            </div>
          );

        case 'elem_image':
          return (
            <div
              style={{
                ...customBoxStyle,
                padding: st.paddingTop !== undefined || st.padding ? customBoxStyle.paddingTop : 0,
              }}
              className="overflow-hidden border border-neutral-200 dark:border-neutral-800"
            >
              <img
                src={d.imageUrl || sampleProd.image}
                alt={d.title || 'Element preview'}
                style={{
                  height: st.height && st.height !== 'auto' ? st.height : '96px',
                }}
                className="w-full object-cover rounded-inherit"
              />
            </div>
          );

        case 'elem_image_gallery':
          return (
            <div style={customBoxStyle} className="grid grid-cols-3 gap-1.5">
              {CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 3).map((p, idx) => (
                <img
                  key={p.id}
                  src={idx === 0 && d.imageUrl ? d.imageUrl : p.image}
                  alt=""
                  className="w-full h-14 rounded-lg object-cover border border-neutral-200 dark:border-neutral-800"
                />
              ))}
            </div>
          );

        case 'elem_button':
          return (
            <button
              type="button"
              className={`w-full py-2 text-[10px] font-black text-white shadow-xs cursor-pointer ${alignClass}`}
              style={{
                ...customBoxStyle,
                background:
                  st.backgroundGradient || st.backgroundColor || accent,
                color: st.textColor || '#FFFFFF',
              }}
            >
              {d.buttonText || d.title || 'Button'}
            </button>
          );

        case 'elem_badge_pills': {
          const tags = (d.optionsCsv || 'NEW DROP, IN STOCK, TOP RATED')
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);
          return (
            <div style={customBoxStyle} className="flex items-center flex-wrap gap-1.5">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full text-[9px] font-black text-white"
                  style={{
                    backgroundColor: i === 0 ? accent : '#10B981',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          );
        }

        case 'elem_bullet_list': {
          const rows = (
            d.optionsCsv ||
            'Title 1 | Description 1, Title 2 | Description 2, Title 3 | Description 3'
          )
            .split(',')
            .map((r) => r.trim())
            .filter(Boolean);
          return (
            <div
              style={customBoxStyle}
              className={`bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1.5 ${alignClass}`}
            >
              <div className={`${titleSizeClass} font-black`}>{d.title || 'My List'}</div>
              {rows.map((rowStr, n) => {
                const [rowTitle, rowDesc] = rowStr.split('|').map((s) => s.trim());
                return (
                  <div
                    key={n}
                    className="flex items-center gap-2.5 py-1 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: accent }}
                    >
                      <ImageIcon size={13} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-extrabold">
                        {rowTitle || `Title ${n + 1}`}
                      </div>
                      <div className="text-[9px] text-neutral-400">
                        {rowDesc || `Description ${n + 1}`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }

        case 'elem_video_player':
          return (
            <div
              style={{ borderRadius: `${radiusPx}px` }}
              className="h-24 bg-neutral-900 text-white flex flex-col items-center justify-center gap-1 relative overflow-hidden"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: accent }}
              >
                ▶
              </div>
              <span className="text-[9px] font-bold opacity-80">
                {d.title || 'Product Lookbook Video (0:45)'}
              </span>
            </div>
          );

        case 'elem_link_row':
          return (
            <div
              style={customBoxStyle}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[10px] font-extrabold"
            >
              <span className="flex items-center gap-1.5">
                <Link2 size={11} style={{ color: accent }} />
                <span>{d.title || 'View Size & Spec Documentation'}</span>
              </span>
              <ChevronRight size={12} />
            </div>
          );

        default:
          return (
            <div className="py-1.5">
              <div className="border-t-2 border-dashed border-neutral-300 dark:border-neutral-700" />
            </div>
          );
      }
    };

    return (
      <div
        key={item.instanceId}
        draggable
        onDragStart={(e) => {
          e.stopPropagation();
          setDraggedDroppedInstance({
            screenId: targetScreenId,
            instanceId: item.instanceId,
          });
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('application/x-dropped-instance', item.instanceId);
        }}
        onDragOver={(e) => {
          if (
            draggedDroppedInstance &&
            draggedDroppedInstance.screenId === targetScreenId &&
            draggedDroppedInstance.instanceId !== item.instanceId
          ) {
            e.preventDefault();
            e.stopPropagation();
            setDragOverDroppedInstanceId(item.instanceId);
          }
        }}
        onDragLeave={() => {
          if (dragOverDroppedInstanceId === item.instanceId) {
            setDragOverDroppedInstanceId(null);
          }
        }}
        onDrop={(e) => {
          if (
            draggedDroppedInstance &&
            draggedDroppedInstance.screenId === targetScreenId &&
            draggedDroppedInstance.instanceId !== item.instanceId
          ) {
            e.preventDefault();
            e.stopPropagation();
            handleDropReorderDroppedItemOnScreen(
              targetScreenId,
              draggedDroppedInstance.instanceId,
              item.instanceId
            );
            setDraggedDroppedInstance(null);
            setDragOverDroppedInstanceId(null);
          }
        }}
        onDragEnd={() => {
          setDraggedDroppedInstance(null);
          setDragOverDroppedInstanceId(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setActiveScreen(targetScreenId);
          setSelectedInspectorTarget({
            type: 'item',
            screenId: targetScreenId,
            instanceId: item.instanceId,
          });
          if (item.data?.prototypeConfig?.enabled) {
            executePrototypeInteraction(
              targetScreenId,
              item.data.prototypeConfig,
              item.label
            );
          }
        }}
        className={`group relative rounded-xl transition cursor-grab active:cursor-grabbing ${
          isSelectedForEdit
            ? 'ring-2 ring-indigo-500'
            : isDragOverThisItem
            ? 'border-t-2 border-t-emerald-500 pt-1'
            : ''
        }`}
        title="Click to edit Data & Style · Drag up or down to change position"
      >
          {/* Subtle floating quick actions only on hover so the component/element renders like normal mobile content */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-1.5 top-1.5 z-20 flex items-center gap-0.5 px-1 py-0.5 rounded-md bg-black/75 text-white shadow-sm backdrop-blur-xs">
            {item.data?.prototypeConfig?.enabled && (
              <span
                className="px-1.5 py-0.5 rounded bg-blue-600 text-[8px] font-mono font-black text-white mr-0.5"
                title="Has Prototype Action"
              >
                ⚡ {(item.data.prototypeConfig.action || 'navigate_to').replace('_', ' ')}
              </span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveScreen(targetScreenId);
                setInspectorTab('prototype');
                setSelectedInspectorTarget({
                  type: 'item',
                  screenId: targetScreenId,
                  instanceId: item.instanceId,
                });
              }}
              className="px-1 py-0.5 rounded bg-blue-500/80 hover:bg-blue-500 text-[8px] font-black text-white cursor-pointer"
              title="Configure Figma Prototype Action for this component"
            >
              ⚡ Action
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleMoveDroppedItemOnScreen(targetScreenId, item.instanceId, 'up');
              }}
            className="p-0.5 rounded hover:bg-white/20 cursor-pointer"
            title="Move Up"
          >
            <ArrowUp size={9} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleMoveDroppedItemOnScreen(targetScreenId, item.instanceId, 'down');
            }}
            className="p-0.5 rounded hover:bg-white/20 cursor-pointer"
            title="Move Down"
          >
            <ArrowDown size={9} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveDroppedItemFromScreen(targetScreenId, item.instanceId);
            }}
            className="p-0.5 rounded text-rose-400 hover:bg-rose-500 hover:text-white cursor-pointer"
            title="Remove from screen"
          >
            <Trash2 size={9} />
          </button>
        </div>
        {renderVisualBody()}
      </div>
    );
  };

  // Render any specified screenId & variantId inside a mobile simulator frame
  const renderSimulatorScreenById = (
    targetScreenId: CustomEcommerceScreenId,
    targetVariant: CustomEcommerceVariantId
  ) => {
    const customDroppedOnThisScreen = screenDroppedItems[targetScreenId] || [];
    const scrStyle = screenStyleOverrides[targetScreenId];

    if (String(targetScreenId).startsWith('BlankScreen_')) {
      const pAll = scrStyle?.padding ?? 12;
      const layoutKind = customScreenLayoutTypeById[targetScreenId] || 'blank_screen';
      const screenMetaObj = orderedScreens.find((s) => s.id === targetScreenId);
      const showTopAppBarHeader =
        layoutKind === 'empty_activity' ||
        layoutKind === 'navigation_ui_activity' ||
        layoutKind === 'basic_views_activity' ||
        layoutKind === 'empty_views_activity' ||
        layoutKind === 'navigation_drawer_activity' ||
        layoutKind === 'tabbed_views_activity' ||
        layoutKind === 'scrolling_collapsing_activity' ||
        layoutKind === 'settings_preferences_activity' ||
        layoutKind === 'shopping_cart_bag_activity' ||
        layoutKind === 'order_tracking_timeline_activity' ||
        layoutKind === 'chat_concierge_support_activity';
      const showResponsiveSplitBanner =
        layoutKind === 'responsive_views_activity' ||
        layoutKind === 'master_detail_flow_activity' ||
        layoutKind === 'google_maps_store_activity' ||
        layoutKind === 'category_mega_menu_activity';
      const showFloatingActionBtn =
        layoutKind === 'basic_views_activity' ||
        layoutKind === 'responsive_views_activity' ||
        layoutKind === 'scrolling_collapsing_activity' ||
        layoutKind === 'chat_concierge_support_activity';

      const blankScreenInlineStyle: React.CSSProperties = {
        width: scrStyle?.width || '100%',
        height: scrStyle?.height || '100%',
        minHeight: scrStyle?.minHeight ? `${scrStyle.minHeight}px` : '480px',
        marginTop:
          scrStyle?.marginTop !== undefined
            ? `${scrStyle.marginTop}px`
            : scrStyle?.margin !== undefined
            ? `${scrStyle.margin}px`
            : undefined,
        marginRight:
          scrStyle?.marginRight !== undefined
            ? `${scrStyle.marginRight}px`
            : scrStyle?.margin !== undefined
            ? `${scrStyle.margin}px`
            : undefined,
        marginBottom:
          scrStyle?.marginBottom !== undefined
            ? `${scrStyle.marginBottom}px`
            : scrStyle?.margin !== undefined
            ? `${scrStyle.margin}px`
            : undefined,
        marginLeft:
          scrStyle?.marginLeft !== undefined
            ? `${scrStyle.marginLeft}px`
            : scrStyle?.margin !== undefined
            ? `${scrStyle.margin}px`
            : undefined,
        paddingTop:
          scrStyle?.paddingTop !== undefined ? `${scrStyle.paddingTop}px` : `${pAll}px`,
        paddingRight:
          scrStyle?.paddingRight !== undefined ? `${scrStyle.paddingRight}px` : `${pAll}px`,
        paddingBottom:
          scrStyle?.paddingBottom !== undefined ? `${scrStyle.paddingBottom}px` : `${pAll}px`,
        paddingLeft:
          scrStyle?.paddingLeft !== undefined ? `${scrStyle.paddingLeft}px` : `${pAll}px`,
        backgroundImage: scrStyle?.backgroundGradient || undefined,
        backgroundColor: scrStyle?.backgroundColor || undefined,
        borderRadius:
          scrStyle?.borderRadius !== undefined ? `${scrStyle.borderRadius}px` : undefined,
        borderWidth:
          scrStyle?.borderWidth !== undefined ? `${scrStyle.borderWidth}px` : undefined,
        borderStyle: scrStyle?.borderStyle || undefined,
        borderColor: scrStyle?.borderColor || undefined,
        boxShadow:
          scrStyle?.shadow && DROPPED_SHADOW_CSS_MAP[scrStyle.shadow]
            ? DROPPED_SHADOW_CSS_MAP[scrStyle.shadow]
            : undefined,
        opacity: scrStyle?.opacity !== undefined ? scrStyle.opacity / 100 : undefined,
        color: scrStyle?.textColor || undefined,
      };

      return (
        <div
          onClick={() => {
            setActiveScreen(targetScreenId);
            setInspectorTab('style');
            setSelectedInspectorTarget({
              type: 'screen',
              screenId: targetScreenId,
            });
          }}
          style={blankScreenInlineStyle}
          className="h-full flex flex-col select-none cursor-pointer relative"
        >
          {/* Optional Activity Top App Bar Header (for Activity-based screen templates) */}
          {showTopAppBarHeader && (
            <div
              className="mb-2.5 -mx-1 px-3 py-2 rounded-xl text-white flex items-center justify-between shadow-2xs"
              style={{ backgroundColor: '#00A651' }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-black">←</span>
                <span className="text-[11px] font-extrabold truncate">
                  {screenMetaObj?.label || 'Activity Screen'}
                </span>
              </div>
              <span className="text-xs font-black tracking-widest">⋮</span>
            </div>
          )}

          {/* Optional Responsive Split Header Banner */}
          {showResponsiveSplitBanner && (
            <div className="mb-2.5 p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#00A651] text-white flex items-center justify-center font-black text-xs flex-shrink-0">
                UI
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-black truncate">
                  {screenMetaObj?.label || 'Responsive Views Activity'}
                </div>
                <div className="text-[9px] text-neutral-500 dark:text-neutral-400">
                  Adaptive Split Drawer + Grid Layout
                </div>
              </div>
            </div>
          )}

          {/* Dropped Components & Elements on this Screen */}
          {customDroppedOnThisScreen.length > 0 && (
            <div className="space-y-2 flex-1">
              {customDroppedOnThisScreen.map((dropped) =>
                renderSingleDroppedLibraryItem(targetScreenId, dropped)
              )}
            </div>
          )}

          {/* Floating Action Button (+) for Basic Views / Responsive Views templates */}
          {showFloatingActionBtn && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleAddLibraryItemToScreen(targetScreenId, 'comp_card_with_image');
              }}
              className="sticky bottom-3 self-end mt-auto w-9 h-9 rounded-full bg-[#AEEA00] text-neutral-900 font-black text-base shadow-md flex items-center justify-center hover:scale-105 transition cursor-pointer"
              title="Quick Add Card Component"
            >
              +
            </button>
          )}
        </div>
      );
    }

    const innerScreen = (() => {
      if (
        targetScreenId === 'SplashScreen' ||
        targetScreenId === 'OnboardingWalkthrough' ||
        targetScreenId === 'SignUpLogin' ||
        targetScreenId === 'ForgotPasswordPin'
      ) {
        return (
          <CustomEcommerceAuthScreens
            screenId={targetScreenId}
            variant={targetVariant}
            primaryColor={activeColorPreset.swatch}
            isDark={isDark}
            onNavigate={setActiveScreen}
          />
        );
      }

      if (
        targetScreenId === 'HomeDashboard' ||
        targetScreenId === 'GlobalSearchResults' ||
        targetScreenId === 'AdvancedFilterSheet' ||
        targetScreenId === 'CategoryNavigation'
      ) {
        return (
          <CustomEcommerceDiscoveryScreens
            screenId={targetScreenId}
            variant={targetVariant}
            primaryColor={activeColorPreset.swatch}
            isDark={isDark}
            onNavigate={setActiveScreen}
            onAddToCart={handleAddToCart}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            componentOrder={componentOrderIds}
            hiddenComponentIds={hiddenComponentIds}
          />
        );
      }

      if (
        targetScreenId === 'ProductListingPage' ||
        targetScreenId === 'ProductDetailPage' ||
        targetScreenId === 'WishlistSaved'
      ) {
        return (
          <CustomEcommerceEngagementScreens
            screenId={targetScreenId}
            variant={targetVariant}
            primaryColor={activeColorPreset.swatch}
            isDark={isDark}
            onNavigate={setActiveScreen}
            onAddToCart={handleAddToCart}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        );
      }

      if (
        targetScreenId === 'ShoppingCart' ||
        targetScreenId === 'AddressBookLocation' ||
        targetScreenId === 'CheckoutPaymentGateway' ||
        targetScreenId === 'OrderSuccess'
      ) {
        return (
          <CustomEcommerceCartCheckoutScreens
            screenId={targetScreenId}
            variant={targetVariant}
            primaryColor={activeColorPreset.swatch}
            isDark={isDark}
            onNavigate={setActiveScreen}
            cartQuantities={cartQuantities}
            onUpdateCartQty={handleUpdateCartQty}
          />
        );
      }

      if (
        targetScreenId === 'ClothingSizeGuideModal' ||
        targetScreenId === 'ClothingLookbookShopTheLook' ||
        targetScreenId === 'ClothingVariantSelectorPdp' ||
        targetScreenId === 'ClothingReviewPhotoGallery'
      ) {
        return (
          <CustomEcommerceClothingScreens
            screenId={targetScreenId}
            variant={targetVariant}
            primaryColor={activeColorPreset.swatch}
            isDark={isDark}
            onNavigate={setActiveScreen}
            onAddToCart={handleAddToCart}
          />
        );
      }

      if (
        targetScreenId === 'GroceryQuickAddListsPlp' ||
        targetScreenId === 'GroceryDeliverySlotPicker' ||
        targetScreenId === 'GroceryBuyAgainReorder' ||
        targetScreenId === 'GrocerySubstitutionSheet'
      ) {
        return (
          <CustomEcommerceGroceryScreens
            screenId={targetScreenId}
            variant={targetVariant}
            primaryColor={activeColorPreset.swatch}
            isDark={isDark}
            onNavigate={setActiveScreen}
          />
        );
      }

      if (
        targetScreenId === 'GadgetComparisonMatrix' ||
        targetScreenId === 'GadgetEmiFinancingCalculator' ||
        targetScreenId === 'GadgetDetailedTechSpecsTab' ||
        targetScreenId === 'GadgetWarrantyServicePolicy'
      ) {
        return (
          <CustomEcommerceGadgetScreens
            screenId={targetScreenId}
            variant={targetVariant}
            primaryColor={activeColorPreset.swatch}
            isDark={isDark}
            onNavigate={setActiveScreen}
          />
        );
      }

      return (
        <CustomEcommerceAccountScreens
          screenId={targetScreenId}
          variant={targetVariant}
          primaryColor={activeColorPreset.swatch}
          isDark={isDark}
          onNavigate={setActiveScreen}
        />
      );
    })();

    const droppedItemsList = customDroppedOnThisScreen.map((dropped) => ({
      instanceId: dropped.instanceId,
      node: renderSingleDroppedLibraryItem(targetScreenId, dropped),
    }));

    return (
      <>
        {showCustomBlocksInAllScreens && targetScreenId !== 'HomeDashboard' &&
          renderDynamicCustomComponentBlocksStrip()}
        <ReorderableScreenContent
          screenKey={`${targetScreenId}_${targetVariant}`}
          screenStyleOverride={scrStyle}
          isScreenSelected={
            selectedInspectorTarget?.type === 'screen' &&
            selectedInspectorTarget.screenId === targetScreenId
          }
          onSelectScreenRoot={() => {
            setActiveScreen(targetScreenId);
            setInspectorTab('style');
            setSelectedInspectorTarget({
              type: 'screen',
              screenId: targetScreenId,
            });
          }}
          droppedItems={droppedItemsList}
          lastInsertedTargetSecId={lastInsertedGapTargetByScreen[targetScreenId] || null}
          onDropNewLibraryItemAtPosition={(libId, insertBeforeSecId) => {
            handleAddLibraryItemToScreen(targetScreenId, libId, insertBeforeSecId);
            setDraggedLibraryItemId(null);
            setDropTargetScreenId(null);
          }}
          sectionStyleOverrides={nativeSectionStyleOverrides}
          selectedNativeSectionId={
            selectedInspectorTarget?.type === 'native_section' &&
            selectedInspectorTarget.screenId === targetScreenId
              ? selectedInspectorTarget.sectionId
              : null
          }
          onSelectNativeSection={(secId) => {
            setActiveScreen(targetScreenId);
            setSelectedInspectorTarget({
              type: 'native_section',
              screenId: targetScreenId,
              sectionId: secId,
            });
            if (nativeSectionPrototypeConfigs[secId]?.enabled) {
              executePrototypeInteraction(
                targetScreenId,
                nativeSectionPrototypeConfigs[secId],
                secId
              );
            }
          }}
        >
          {innerScreen}
        </ReorderableScreenContent>
      </>
    );
  };

  // ============================================================================
  // 90% WIDTH BIG MODAL: ALL SELECTED VARIANT SCREENS IN ROWS & COLUMNS
  // ============================================================================
  const renderMultiSimulatorBigModal = () => {
    if (!isMultiSimulatorModalOpen) return null;

    const totalCartItems = Object.values(cartQuantities).reduce((a, b) => a + b, 0);

    // Device Screen Size Presets (Responsive Mobile Viewport Dimensions)
    const deviceDimensions =
      modalDeviceSize === 'sm'
        ? { width: 320, height: 568, label: 'Compact (320×568)' }
        : modalDeviceSize === 'lg'
        ? { width: 412, height: 732, label: 'Max (412×732)' }
        : { width: 360, height: 640, label: 'Standard (360×640)' };

    // Responsive effective column count based on container width & user selection
    const effectiveCols =
      modalContainerWidth < 520
        ? 1
        : modalContainerWidth < 740
        ? Math.min(2, modalGridColumns)
        : modalGridColumns;

    const gridGapPx = 16;
    const horizontalPaddingPx = 32;
    const availableGridWidth = Math.max(320, modalContainerWidth - horizontalPaddingPx);
    const singleColWidth =
      (availableGridWidth - (effectiveCols - 1) * gridGapPx) / effectiveCols;

    // Native outer device frame dimensions (inner screen + 12px bezel)
    const nativePhoneOuterWidth = deviceDimensions.width + 12;
    const nativePhoneOuterHeight = deviceDimensions.height + 12;

    // Responsive scale factor so the mobile device screen fits its Row & Column cell cleanly on any screen size
    const availablePhoneWidthInCard = Math.max(150, singleColWidth - 20);
    const phoneScale = Math.min(
      1,
      Math.max(0.38, availablePhoneWidthInCard / nativePhoneOuterWidth)
    );
    const scaledPhoneWidth = Math.round(nativePhoneOuterWidth * phoneScale);
    const scaledPhoneHeight = Math.round(nativePhoneOuterHeight * phoneScale);

    return (
      <div
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 select-none"
        onClick={() => setIsMultiSimulatorModalOpen(false)}
      >
        <div
          className="w-[92vw] max-w-[92vw] h-[92vh] max-h-[92vh] rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0f1117] shadow-2xl flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Modal Header Bar */}
          <div className="px-5 py-3.5 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-2xl flex items-center justify-center text-white shadow-xs"
                style={{ backgroundColor: activeColorPreset.swatch }}
              >
                <Smartphone size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-sm sm:text-base font-black text-neutral-900 dark:text-white">
                    All Selected Variant Screens — Row &amp; Column Matrix
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] font-extrabold">
                    {flowSimulatorScreens.length} Simulators · {effectiveCols} Columns × {Math.ceil(flowSimulatorScreens.length / effectiveCols)} Rows
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[10px] font-mono font-bold">
                    Scale {Math.round(phoneScale * 100)}%
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Responsive multi-row &amp; multi-column simulator matrix. Switch columns (2–5 Cols) or device screen size below.
                </p>
              </div>
            </div>

            {/* Right Controls in Modal Header: Sidebar Toggle + +Add Screen + Search + Device Screen Size + Grid Columns (2/3/4/5 Cols) + Components Drawer + Close */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Toggle Left Sidebar (1. Component | 2. Element) */}
              <button
                type="button"
                onClick={() => setModalLeftSidebarOpen((o) => !o)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
                  modalLeftSidebarOpen
                    ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    : 'border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                }`}
                title="Toggle Left Component & Element Drag-and-Drop Sidebar"
              >
                {modalLeftSidebarOpen ? (
                  <PanelLeftClose size={14} />
                ) : (
                  <PanelLeftOpen size={14} />
                )}
                <span>Components &amp; Elements</span>
              </button>

              {/* + ADD SCREEN BUTTON (CREATES NEW BLANK SCREEN WITH SIMULATOR) */}
              <button
                type="button"
                onClick={handleAddBlankScreenWithSimulator}
                className="px-3.5 py-1.5 rounded-xl text-xs font-black text-white shadow-sm hover:opacity-95 flex items-center gap-1.5 transition cursor-pointer"
                style={{
                  backgroundColor: activeColorPreset.swatch,
                  color: activeColorPreset.primaryText,
                }}
                title="Create a new blank screen with its own mobile simulator"
              >
                <Plus size={14} />
                <span>+ Add Screen</span>
              </button>

              {/* Real-Time Global Search inside Modal */}
              <div className="relative w-52 sm:w-60">
                <Search
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={leftRailGlobalSearch}
                  onChange={(e) => handleGlobalSimulatorSearchChange(e.target.value)}
                  placeholder="Filter screens or variants..."
                  className="w-full pl-8 pr-14 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-[10px] font-mono font-bold">
                    {flowSimulatorScreens.length}/{orderedScreens.length}
                  </span>
                  {leftRailGlobalSearch && (
                    <button
                      type="button"
                      onClick={() => handleGlobalSimulatorSearchChange('')}
                      className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Device Screen Size Switcher (Responsive Mobile Viewport Size) */}
              <div className="flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                {(
                  [
                    ['sm', 'SM 320px'],
                    ['md', 'MD 360px'],
                    ['lg', 'LG 412px'],
                  ] as const
                ).map(([sizeId, label]) => (
                  <button
                    key={sizeId}
                    type="button"
                    onClick={() => setModalDeviceSize(sizeId)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-extrabold transition cursor-pointer ${
                      modalDeviceSize === sizeId
                        ? 'text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                    style={
                      modalDeviceSize === sizeId
                        ? { backgroundColor: activeColorPreset.swatch }
                        : undefined
                    }
                    title="Change Mobile Device Screen Resolution"
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Row & Column Density Switcher (2 / 3 / 4 / 5 Columns) */}
              <div className="flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                {([2, 3, 4, 5] as const).map((cols) => (
                  <button
                    key={cols}
                    type="button"
                    onClick={() => setModalGridColumns(cols)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition cursor-pointer ${
                      modalGridColumns === cols
                        ? 'text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                    style={
                      modalGridColumns === cols
                        ? { backgroundColor: activeColorPreset.swatch }
                        : undefined
                    }
                  >
                    {cols} Cols
                  </button>
                ))}
              </div>

              {/* Toggle Figma Prototype Wires & Action Inspector */}
              <button
                type="button"
                onClick={() => {
                  setShowPrototypeWiresInModal((v) => !v);
                  setInspectorTab('prototype');
                  if (!selectedInspectorTarget) {
                    setSelectedInspectorTarget({
                      type: 'screen',
                      screenId: activeScreen,
                    });
                  }
                }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 transition cursor-pointer ${
                  showPrototypeWiresInModal || inspectorTab === 'prototype'
                    ? 'bg-[#0D99FF] text-white border-[#0D99FF] shadow-xs'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200'
                }`}
                title="Toggle Figma Prototype Interaction Mode, Flow Connectors & Selected Screen Action Inspector"
              >
                <Sparkles size={13} />
                <span>⚡ Prototype Actions ({Object.values(screenPrototypeConfigs).filter((c) => c?.enabled).length})</span>
              </button>

              {/* Toggle Drag & Drop Screen Components Bar */}
              <button
                type="button"
                onClick={() => setShowComponentsDrawerInModal((v) => !v)}
                className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
                  showComponentsDrawerInModal
                    ? 'text-white border-transparent'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100'
                }`}
                style={
                  showComponentsDrawerInModal
                    ? { backgroundColor: activeColorPreset.swatch }
                    : undefined
                }
              >
                <Layers size={13} />
                <span>D&amp;D Components</span>
              </button>

              {/* Close 90% Modal Button */}
              <button
                type="button"
                onClick={() => setIsMultiSimulatorModalOpen(false)}
                className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 hover:bg-rose-500 hover:text-white hover:border-rose-500 text-neutral-700 dark:text-neutral-200 transition cursor-pointer"
                title="Close Modal"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Sub-Bar: Flow Category Filters + Optional Drag & Drop Components Drawer */}
          <div className="px-6 py-2.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 space-y-2.5 flex-shrink-0">
            <div className="flex items-center justify-between gap-3 overflow-x-auto pb-0.5">
              <div className="flex items-center gap-1.5">
                {FLOW_GROUPS.map((group) => {
                  const active = selectedFlowFilter === group;
                  return (
                    <button
                      key={group}
                      type="button"
                      onClick={() => setSelectedFlowFilter(group)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                        active
                          ? 'shadow-xs'
                          : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                      style={
                        active
                          ? {
                              backgroundColor: activeColorPreset.swatch,
                              color: activeColorPreset.primaryText,
                            }
                          : undefined
                      }
                    >
                      {group === 'ALL' ? `All Flows (${orderedScreens.length})` : group}
                    </button>
                  );
                })}
              </div>

              {/* Batch Variant Switcher inside Modal */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {ALL_CUSTOM_ECOMMERCE_VARIANT_IDS.map((vid, vIdx) => (
                  <button
                    key={vid}
                    type="button"
                    onClick={() => applyVariantToAllScreens(vid)}
                    className="px-2 py-1 rounded-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 text-[10px] font-extrabold text-neutral-700 dark:text-neutral-300 cursor-pointer"
                  >
                    All V{vIdx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Expandable Drag-and-Drop Screen Components Bar */}
            {showComponentsDrawerInModal && (
              <div className="p-3 rounded-2xl border border-indigo-500/25 bg-indigo-500/5 space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <Move size={13} />
                    <span>Drag &amp; Drop Screen Components (Hero Banners, Category Lists, Product Grids, Flash Sales)</span>
                  </span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showCustomBlocksInAllScreens}
                        onChange={(e) => setShowCustomBlocksInAllScreens(e.target.checked)}
                        className="rounded accent-indigo-600 cursor-pointer"
                      />
                      <span>Overlay Custom Reordered Blocks on All Screens</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleResetComponentBlocks}
                      className="px-2 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw size={10} />
                      <span>Reset Components</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {componentBlocks.map((block, idx) => {
                    const isHidden = hiddenComponentIds.includes(block.id);
                    return (
                      <div
                        key={block.id}
                        draggable
                        onDragStart={(e) => {
                          setDraggedComponentId(block.id);
                          e.dataTransfer.effectAllowed = 'move';
                          e.dataTransfer.setData('text/plain', block.id);
                        }}
                        onDragOver={(e) => {
                          if (!draggedComponentId || draggedComponentId === block.id) return;
                          e.preventDefault();
                          setDragOverComponentId(block.id);
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const src =
                            draggedComponentId || e.dataTransfer.getData('text/plain');
                          if (src && src !== block.id) {
                            handleDropReorderComponentBlock(src, block.id);
                          }
                          setDraggedComponentId(null);
                          setDragOverComponentId(null);
                        }}
                        onDragEnd={() => {
                          setDraggedComponentId(null);
                          setDragOverComponentId(null);
                        }}
                        className={`p-2 rounded-xl border bg-white dark:bg-neutral-900 flex flex-col justify-between gap-1.5 cursor-grab active:cursor-grabbing ${
                          isHidden ? 'opacity-45' : 'border-neutral-200 dark:border-neutral-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="flex items-center gap-1 text-[10px] font-mono font-black">
                            <GripVertical size={11} className="text-neutral-400" />
                            <span>#{idx + 1}</span>
                          </span>
                          <span
                            className="px-1.5 py-0.5 rounded text-[8px] font-black text-white"
                            style={{ backgroundColor: activeColorPreset.swatch }}
                          >
                            {block.badge}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleToggleComponentVisibility(block.id)}
                            className="p-0.5 text-neutral-400 hover:text-neutral-800 dark:hover:text-white cursor-pointer"
                          >
                            {isHidden ? <EyeOff size={11} /> : <Eye size={11} />}
                          </button>
                        </div>
                        <div className="text-[11px] font-extrabold truncate">{block.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Modal Main Body: Left Sidebar (1. Component | 2. Element) + Right Scrollable Row & Column Simulator Grid */}
          <div className="flex-1 flex min-h-0 overflow-hidden">
            {/* LEFT SIDEBAR: 2 TABS (1. COMPONENT | 2. ELEMENT) LIKE JOTFORM APP ELEMENTS */}
            {modalLeftSidebarOpen && (
              <div className="w-72 sm:w-80 border-r border-neutral-200 dark:border-neutral-800 bg-[#181B23] text-white flex flex-col flex-shrink-0 select-none">
                {/* Sidebar Title Header */}
                <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-black tracking-wide uppercase flex items-center gap-1.5">
                      <Layers size={14} style={{ color: activeColorPreset.swatch }} />
                      <span>App Builder Library</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-0.5">
                      Drag &amp; drop onto any screen simulator →
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalLeftSidebarOpen(false)}
                    className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer"
                    title="Collapse Sidebar"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* 2 TABS: 1. COMPONENT | 2. ELEMENT */}
                <div className="grid grid-cols-2 border-b border-white/10 bg-[#12151C]">
                  <button
                    type="button"
                    onClick={() => setModalLeftTab('component')}
                    className={`py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition cursor-pointer ${
                      modalLeftTab === 'component'
                        ? 'text-white bg-[#1E222D]'
                        : 'border-transparent text-neutral-400 hover:text-white'
                    }`}
                    style={
                      modalLeftTab === 'component'
                        ? { borderColor: activeColorPreset.swatch }
                        : undefined
                    }
                  >
                    1. Component ({MODAL_COMPONENT_CATALOG.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalLeftTab('element')}
                    className={`py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition cursor-pointer ${
                      modalLeftTab === 'element'
                        ? 'text-white bg-[#1E222D]'
                        : 'border-transparent text-neutral-400 hover:text-white'
                    }`}
                    style={
                      modalLeftTab === 'element'
                        ? { borderColor: activeColorPreset.swatch }
                        : undefined
                    }
                  >
                    2. Element ({MODAL_ELEMENT_CATALOG.length})
                  </button>
                </div>

                {/* Target Screen Quick Selector + Search inside Left Sidebar */}
                <div className="p-3 border-b border-white/10 space-y-2 bg-[#14171F]">
                  <div className="flex items-center justify-between text-[10px] font-bold text-neutral-300">
                    <span>Click-to-Add Target:</span>
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-mono font-black text-white truncate max-w-[145px]"
                      style={{ backgroundColor: activeColorPreset.swatch }}
                    >
                      {currentScreenMeta?.label}
                    </span>
                  </div>
                  <div className="relative">
                    <Search
                      size={12}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                      type="text"
                      value={modalPaletteSearch}
                      onChange={(e) => setModalPaletteSearch(e.target.value)}
                      placeholder={
                        modalLeftTab === 'component'
                          ? 'Search components (card, search, dropdown)...'
                          : 'Search elements (heading, image, button)...'
                      }
                      className="w-full pl-7 pr-7 py-1.5 rounded-lg bg-[#1E222D] border border-white/10 text-[11px] text-white placeholder-neutral-500 focus:outline-none"
                    />
                    {modalPaletteSearch && (
                      <button
                        type="button"
                        onClick={() => setModalPaletteSearch('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                      >
                        <X size={11} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Draggable List of Components or Elements */}
                <div className="flex-1 overflow-y-auto divide-y divide-white/10">
                  {(modalLeftTab === 'component'
                    ? MODAL_COMPONENT_CATALOG
                    : MODAL_ELEMENT_CATALOG
                  )
                    .filter(
                      (item) =>
                        !modalPaletteSearch.trim() ||
                        item.label
                          .toLowerCase()
                          .includes(modalPaletteSearch.toLowerCase()) ||
                        item.subtitle
                          .toLowerCase()
                          .includes(modalPaletteSearch.toLowerCase())
                    )
                    .map((item) => {
                      const ItemIcon = item.icon;
                      const isFlatListCatalogItem = item.id.startsWith('comp_flatlist_');
                      return (
                        <div key={item.id} className="bg-[#181B23]">
                          <div
                            draggable
                            onDragStart={(e) => {
                              setDraggedLibraryItemId(item.id);
                              e.dataTransfer.effectAllowed = 'copyMove';
                              e.dataTransfer.setData(
                                'application/x-library-item',
                                item.id
                              );
                              e.dataTransfer.setData('text/plain', `LIB:${item.id}`);
                            }}
                            onDragEnd={() => {
                              setDraggedLibraryItemId(null);
                              setDropTargetScreenId(null);
                            }}
                            onClick={() =>
                              handleAddLibraryItemToScreen(activeScreen, item.id)
                            }
                            className="px-3.5 py-3 hover:bg-[#232836] transition flex items-center justify-between gap-2.5 cursor-grab active:cursor-grabbing group"
                            title={`Drag onto any screen simulator or click to add to "${currentScreenMeta?.label}"`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-[#252A3A] group-hover:bg-white/15 flex items-center justify-center flex-shrink-0 text-white shadow-2xs">
                                <ItemIcon size={15} />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-extrabold text-white truncate">
                                    {item.label}
                                  </span>
                                  <span
                                    className="px-1.5 py-0.2 rounded text-[8px] font-mono font-black text-white flex-shrink-0"
                                    style={{
                                      backgroundColor: activeColorPreset.swatch,
                                    }}
                                  >
                                    {item.badge}
                                  </span>
                                </div>
                                <p className="text-[10px] text-neutral-400 truncate mt-0.5">
                                  {item.subtitle}
                                </p>
                              </div>
                            </div>

                            <span
                              className="w-6 h-6 rounded-lg bg-white/10 group-hover:bg-white text-white group-hover:text-neutral-900 flex items-center justify-center flex-shrink-0 text-xs font-black transition"
                              title="Add to active screen"
                            >
                              +
                            </span>
                          </div>

                          {/* Render the dedicated <FlatList /> Required Option Fields directly inside the Component Library under the FlatList section */}
                          {isFlatListCatalogItem && item.id === 'comp_flatlist_builder' && (
                            <div className="px-2.5 pb-3 pt-1 bg-[#141720] border-t border-white/5">
                              {renderComponentLibraryFlatListConfigurator(true)}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>

                {/* Bottom Helper Footer in Sidebar */}
                <div className="p-3 border-t border-white/10 bg-[#12151C] text-[10px] text-neutral-400 flex items-center justify-between">
                  <span>Drag item onto any simulator card</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    D&amp;D Ready
                  </span>
                </div>
              </div>
            )}

            {/* Main Scrollable Row & Column Grid of Individual Mobile Simulators */}
            <div
              ref={modalGridScrollContainerRef}
              onScroll={(e) => {
                modalGridSavedScrollTopRef.current = e.currentTarget.scrollTop;
              }}
              className="flex-1 overflow-y-auto p-4 bg-neutral-100/70 dark:bg-[#090B10] relative"
            >
              {/* Active Linking Helper Banner when connecting a Prototype Node to Destination Screen */}
              {connectingPrototypeFromScreenId && (
                <div className="sticky top-2 z-30 mb-3 px-4 py-2.5 rounded-2xl bg-[#0D99FF] text-white shadow-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-black">
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                    <span>
                      Figma Prototype Linking: Click any destination screen below to connect from &ldquo;
                      {orderedScreens.find((s) => s.id === connectingPrototypeFromScreenId)?.label ||
                        connectingPrototypeFromScreenId}
                      &rdquo;
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConnectingPrototypeFromScreenId(null)}
                    className="px-2.5 py-1 rounded-lg bg-black/25 hover:bg-black/40 text-[11px] font-black cursor-pointer"
                  >
                    Cancel (ESC)
                  </button>
                </div>
              )}

              {flowSimulatorScreens.length === 0 ? (
                <div className="max-w-md mx-auto my-16 p-8 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-center space-y-3">
                  <p className="text-sm font-extrabold text-neutral-800 dark:text-neutral-200">
                    No screens match &ldquo;{leftRailGlobalSearch}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={() => handleGlobalSimulatorSearchChange('')}
                    className="px-4 py-2 rounded-xl text-xs font-black text-white cursor-pointer"
                    style={{ backgroundColor: activeColorPreset.swatch }}
                  >
                    Clear Filter
                  </button>
                </div>
              ) : (
                <div
                  className="grid gap-4 items-start relative"
                  style={{
                    gridTemplateColumns: `repeat(${effectiveCols}, minmax(0, 1fr))`,
                  }}
                >
                  {/* FIGMA PROTOTYPE SVG BEZIER FLOW CONNECTORS OVERLAY */}
                  {showPrototypeWiresInModal && prototypeLineTick >= 0 && (
                    <svg
                      className="pointer-events-none absolute inset-0 w-full h-full z-20 overflow-visible"
                      style={{ minHeight: '100%' }}
                    >
                      <defs>
                        <marker
                          id="figma-proto-arrow"
                          markerWidth="8"
                          markerHeight="8"
                          refX="6"
                          refY="4"
                          orient="auto"
                        >
                          <path d="M0,0 L8,4 L0,8 Z" fill="#0D99FF" />
                        </marker>
                        <marker
                          id="figma-proto-arrow-active"
                          markerWidth="9"
                          markerHeight="9"
                          refX="7"
                          refY="4.5"
                          orient="auto"
                        >
                          <path d="M0,0 L9,4.5 L0,9 Z" fill="#38BDF8" />
                        </marker>
                      </defs>
                      {orderedScreens.map((srcScr) => {
                        if (!matchedSimulatorIdsSet.has(srcScr.id)) return null;
                        const proto = screenPrototypeConfigs[srcScr.id];
                        if (!proto || !proto.enabled || !proto.destinationScreenId) return null;
                        if (
                          proto.action !== 'navigate_to' &&
                          proto.action !== 'open_overlay' &&
                          proto.action !== 'swap_overlay'
                        ) {
                          return null;
                        }
                        if (!matchedSimulatorIdsSet.has(proto.destinationScreenId)) return null;
                        const srcEl = modalScreenCardRefs.current[srcScr.id];
                        const dstEl = modalScreenCardRefs.current[proto.destinationScreenId];
                        if (!srcEl || !dstEl) return null;

                        const x1 = srcEl.offsetLeft + srcEl.offsetWidth - 8;
                        const y1 = srcEl.offsetTop + Math.min(180, srcEl.offsetHeight * 0.42);
                        const x2 = dstEl.offsetLeft + 8;
                        const y2 = dstEl.offsetTop + Math.min(180, dstEl.offsetHeight * 0.42);
                        const dx = Math.max(60, Math.abs(x2 - x1) * 0.45);
                        const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
                        const midX = (x1 + x2) / 2;
                        const midY = (y1 + y2) / 2 - 10;
                        const isSelectedEdge = activeScreen === srcScr.id;

                        return (
                          <g key={`proto_wire_${srcScr.id}_${proto.destinationScreenId}`}>
                            <path
                              d={pathD}
                              fill="none"
                              stroke={isSelectedEdge ? '#38BDF8' : '#0D99FF'}
                              strokeWidth={isSelectedEdge ? 3 : 2}
                              strokeDasharray={
                                proto.action === 'open_overlay' ? '6 4' : undefined
                              }
                              markerEnd={
                                isSelectedEdge
                                  ? 'url(#figma-proto-arrow-active)'
                                  : 'url(#figma-proto-arrow)'
                              }
                              opacity={isSelectedEdge ? 1 : 0.78}
                            />
                            <circle
                              cx={x1}
                              cy={y1}
                              r={4.5}
                              fill="#0D99FF"
                              stroke="#FFFFFF"
                              strokeWidth={1.5}
                            />
                            <rect
                              x={midX - 54}
                              y={midY - 10}
                              width={108}
                              height={18}
                              rx={9}
                              fill={isSelectedEdge ? '#0284C7' : '#0F172A'}
                              stroke="#0D99FF"
                              strokeWidth={1}
                            />
                            <text
                              x={midX}
                              y={midY + 2}
                              textAnchor="middle"
                              fill="#FFFFFF"
                              fontSize="8.5"
                              fontWeight="800"
                              fontFamily="monospace"
                            >
                              {(proto.trigger || 'on_tap').replace('on_', '')} ·{' '}
                              {(proto.animation || 'smart').replace('_', ' ')}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  )}

                  {orderedScreens.map((scr, idx) => {
                    const isVisibleInFilter = matchedSimulatorIdsSet.has(scr.id);
                    const chosenVariant = selectedVariants[scr.id] || 'varient_1';
                    const isFocusedOnMain = activeScreen === scr.id;
                    const droppedCount = (screenDroppedItems[scr.id] || []).length;
                    const isLibraryDropTarget = dropTargetScreenId === scr.id;
                    const scrProto = screenPrototypeConfigs[scr.id];
                    const scrProtoDestMeta = scrProto?.destinationScreenId
                      ? orderedScreens.find((s) => s.id === scrProto.destinationScreenId)
                      : null;
                    const isConnectingSource = connectingPrototypeFromScreenId === scr.id;
                    const isConnectingTargetCandidate =
                      Boolean(connectingPrototypeFromScreenId) &&
                      connectingPrototypeFromScreenId !== scr.id;

                    return (
                      <div
                        key={`${scr.id}-${simulatorKey}`}
                        ref={(el) => {
                          modalScreenCardRefs.current[scr.id] = el;
                        }}
                        draggable={!draggedLibraryItemId}
                        onDragStart={(e) => {
                          if (draggedLibraryItemId) return;
                          setDraggedScreenId(scr.id);
                          e.dataTransfer.effectAllowed = 'move';
                          e.dataTransfer.setData('text/plain', scr.id);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          if (draggedLibraryItemId) {
                            setDropTargetScreenId(scr.id);
                            return;
                          }
                          if (!draggedScreenId || draggedScreenId === scr.id) return;
                          setDragOverScreenId(scr.id);
                        }}
                        onDragLeave={() => {
                          if (dropTargetScreenId === scr.id) {
                            setDropTargetScreenId(null);
                          }
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const libItemId =
                            draggedLibraryItemId ||
                            e.dataTransfer.getData('application/x-library-item') ||
                            (e.dataTransfer.getData('text/plain').startsWith('LIB:')
                              ? e.dataTransfer.getData('text/plain').replace('LIB:', '')
                              : '');

                          if (libItemId) {
                            handleAddLibraryItemToScreen(scr.id, libItemId);
                            setDraggedLibraryItemId(null);
                            setDropTargetScreenId(null);
                            return;
                          }

                          const src = (draggedScreenId ||
                            e.dataTransfer.getData('text/plain')) as CustomEcommerceScreenId;
                          if (src && src !== scr.id) {
                            handleDropReorderScreen(src, scr.id, 'before');
                          }
                          setDraggedScreenId(null);
                          setDragOverScreenId(null);
                        }}
                        onDragEnd={() => {
                          setDraggedScreenId(null);
                          setDragOverScreenId(null);
                          setDraggedLibraryItemId(null);
                          setDropTargetScreenId(null);
                        }}
                        className={
                          isVisibleInFilter
                            ? `w-full min-w-0 rounded-2xl border bg-white dark:bg-neutral-900/90 p-2.5 shadow-sm flex flex-col items-center space-y-2 transition relative ${
                                isLibraryDropTarget
                                  ? 'ring-4 ring-emerald-500 border-emerald-500 bg-emerald-500/5'
                                  : isConnectingSource
                                  ? 'ring-4 ring-[#0D99FF] border-[#0D99FF]'
                                  : isConnectingTargetCandidate
                                  ? 'ring-2 ring-dashed ring-[#0D99FF]/70 hover:ring-4 hover:ring-[#0D99FF] cursor-crosshair'
                                  : 'border-neutral-200 dark:border-neutral-800'
                              }`
                            : 'hidden'
                        }
                      >
                        {/* FIGMA PROTOTYPE RIGHT-EDGE BLUE NODE HANDLE (+) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              connectingPrototypeFromScreenId &&
                              connectingPrototypeFromScreenId !== scr.id
                            ) {
                              upsertScreenPrototypeConnection(connectingPrototypeFromScreenId, {
                                enabled: true,
                                action: 'navigate_to',
                                destinationScreenId: scr.id,
                              });
                              setActiveScreen(connectingPrototypeFromScreenId);
                              setSelectedInspectorTarget({
                                type: 'screen',
                                screenId: connectingPrototypeFromScreenId,
                              });
                              setInspectorTab('prototype');
                              setConnectingPrototypeFromScreenId(null);
                              triggerToast(
                                `Connected Prototype Flow → "${scr.label}"`
                              );
                            } else {
                              setConnectingPrototypeFromScreenId((prev) =>
                                prev === scr.id ? null : scr.id
                              );
                              setActiveScreen(scr.id);
                              setSelectedInspectorTarget({
                                type: 'screen',
                                screenId: scr.id,
                              });
                              setInspectorTab('prototype');
                            }
                          }}
                          className={`absolute -right-2.5 top-[42%] z-30 w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-black transition transform hover:scale-125 cursor-pointer ${
                            isConnectingSource
                              ? 'bg-amber-500 ring-4 ring-amber-400/40'
                              : 'bg-[#0D99FF] hover:bg-[#0284C7]'
                          }`}
                          title={
                            connectingPrototypeFromScreenId
                              ? `Click to connect "${connectingPrototypeFromScreenId}" → "${scr.label}"`
                              : `Figma Prototype Node: Click to link "${scr.label}" to another screen or configure action`
                          }
                        >
                          {isConnectingTargetCandidate ? '→' : '+'}
                        </button>

                        {/* Top Header Card inside Grid Cell (Step # + Screen Title + V1..V6 Switcher) */}
                        <div
                          onClick={() => {
                            if (
                              connectingPrototypeFromScreenId &&
                              connectingPrototypeFromScreenId !== scr.id
                            ) {
                              upsertScreenPrototypeConnection(connectingPrototypeFromScreenId, {
                                enabled: true,
                                action: 'navigate_to',
                                destinationScreenId: scr.id,
                              });
                              setActiveScreen(connectingPrototypeFromScreenId);
                              setSelectedInspectorTarget({
                                type: 'screen',
                                screenId: connectingPrototypeFromScreenId,
                              });
                              setInspectorTab('prototype');
                              setConnectingPrototypeFromScreenId(null);
                              triggerToast(
                                `Linked Prototype Action → "${scr.label}"`
                              );
                              return;
                            }
                            setActiveScreen(scr.id);
                            setSelectedInspectorTarget({
                              type: 'screen',
                              screenId: scr.id,
                            });
                          }}
                          className={`w-full p-2 rounded-xl border bg-neutral-50/80 dark:bg-neutral-950/60 transition cursor-pointer ${
                            isFocusedOnMain
                              ? 'ring-2'
                              : 'border-neutral-200 dark:border-neutral-800'
                          }`}
                          style={
                            isFocusedOnMain
                              ? { borderColor: activeColorPreset.swatch }
                              : undefined
                          }
                          title="Click to select this Screen and customize its Background, Padding, Margin & Style"
                        >
                          <div className="flex items-center justify-between gap-1.5 mb-1.5">
                            <div className="flex items-center gap-1 min-w-0">
                              <div
                                className="p-0.5 rounded bg-white dark:bg-neutral-800 text-neutral-400 cursor-grab active:cursor-grabbing flex-shrink-0"
                                title="Drag to reorder screen"
                              >
                                <GripVertical size={11} />
                              </div>
                              <span
                                className="px-1.5 py-0.5 rounded text-[9px] font-mono font-black text-white flex-shrink-0"
                                style={{ backgroundColor: activeColorPreset.swatch }}
                              >
                                #{idx + 1}
                              </span>
                              <span className="text-[11px] font-black text-neutral-900 dark:text-white truncate">
                                {scr.label}
                              </span>
                              {droppedCount > 0 && (
                                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[8px] font-mono font-black flex-shrink-0">
                                  +{droppedCount}
                                </span>
                              )}
                            </div>

                          <div className="flex items-center gap-0.5 flex-shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveScreenStep(scr.id, 'up');
                              }}
                              className="p-0.5 rounded border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 cursor-pointer"
                              title="Move Earlier"
                            >
                              <ArrowUp size={9} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveScreenStep(scr.id, 'down');
                              }}
                              className="p-0.5 rounded border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 cursor-pointer"
                              title="Move Later"
                            >
                              <ArrowDown size={9} />
                            </button>
                            <span
                              className="px-1.5 py-0.5 rounded text-[9px] font-mono font-black text-white"
                              style={{ backgroundColor: activeColorPreset.swatch }}
                            >
                              {chosenVariant.replace('varient_', 'V')}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveScreen(scr.id);
                              }}
                              className="p-1 rounded border border-rose-500/25 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition cursor-pointer ml-0.5"
                              title={`Remove "${scr.label}" screen`}
                            >
                              <Trash2 size={10} />
                            </button>
                          </div>
                        </div>

                        {/* V1 - V6 Variant Selector Buttons for this Cell's Simulator */}
                        <div className="grid grid-cols-6 gap-1">
                          {ALL_CUSTOM_ECOMMERCE_VARIANT_IDS.map((vid, vIdx) => {
                            const isThisVar = chosenVariant === vid;
                            return (
                              <button
                                key={vid}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleVariantChange(scr.id, vid);
                                  setActiveScreen(scr.id);
                                  setInspectorTab('style');
                                  setSelectedInspectorTarget({
                                    type: 'screen',
                                    screenId: scr.id,
                                  });
                                }}
                                className={`py-0.5 rounded-md text-[9px] font-black transition cursor-pointer ${
                                  isThisVar
                                    ? 'text-white shadow-xs'
                                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                                }`}
                                style={
                                  isThisVar
                                    ? { backgroundColor: activeColorPreset.swatch }
                                    : undefined
                                }
                                title={scr.variants[vid]}
                              >
                                V{vIdx + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                        {/* FIGMA PROTOTYPE QUICK ACTION BAR UNDER HEADER (SHOWS SELECTED SCREEN ACTION & TEST PLAY BUTTON) */}
                        <div className="w-full px-2 py-1.5 rounded-xl bg-[#0D99FF]/10 border border-[#0D99FF]/30 flex items-center justify-between gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveScreen(scr.id);
                              setSelectedInspectorTarget({
                                type: 'screen',
                                screenId: scr.id,
                              });
                              setInspectorTab('prototype');
                            }}
                            className="flex items-center gap-1 min-w-0 flex-1 text-left cursor-pointer"
                            title="Click to configure Figma Prototype Trigger, Action, Destination Screen & Animation"
                          >
                            <span className="px-1.5 py-0.5 rounded bg-[#0D99FF] text-white text-[8px] font-mono font-black uppercase flex-shrink-0">
                              ⚡{' '}
                              {scrProto?.enabled
                                ? (scrProto.trigger || 'on_tap').replace('on_', '')
                                : 'Action'}
                            </span>
                            <span className="text-[10px] font-extrabold text-sky-700 dark:text-sky-300 truncate">
                              {scrProto?.enabled
                                ? scrProto.action === 'open_overlay'
                                  ? `Overlay: ${(scrProto.overlayType || 'bottom_sheet').replace('_', ' ')}`
                                  : scrProto.action === 'back'
                                  ? 'Navigate Back'
                                  : scrProto.action === 'close_overlay'
                                  ? 'Close Overlay'
                                  : `→ ${scrProtoDestMeta?.label || scrProto.destinationScreenId || 'Select Screen'}`
                                : '+ Add Prototype Action'}
                            </span>
                          </button>

                          {scrProto?.enabled && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                executePrototypeInteraction(scr.id, scrProto, scr.label);
                              }}
                              className="px-2 py-0.5 rounded-md bg-[#0D99FF] hover:bg-[#0284C7] text-white text-[9px] font-black flex items-center gap-0.5 flex-shrink-0 cursor-pointer shadow-2xs"
                              title="Run / Test this Screen's Prototype Action right now"
                            >
                              <span>▶ Run</span>
                            </button>
                          )}
                        </div>

                        {/* Responsively Scaled Mobile Simulator Frame in Row & Column Cell */}
                      <div
                        className="relative flex-shrink-0 overflow-hidden"
                        style={{
                          width: `${scaledPhoneWidth}px`,
                          height: `${scaledPhoneHeight}px`,
                        }}
                      >
                        <div
                          onClick={() => {
                            setActiveScreen(scr.id);
                            setInspectorTab('style');
                            setSelectedInspectorTarget({
                              type: 'screen',
                              screenId: scr.id,
                            });
                          }}
                          className="rounded-[44px] p-[6px] bg-[#1a1a1e] shadow-xl ring-1 ring-white/10 flex flex-col items-center justify-center cursor-pointer origin-top-left"
                          style={{
                            width: `${nativePhoneOuterWidth}px`,
                            height: `${nativePhoneOuterHeight}px`,
                            transform: `scale(${phoneScale})`,
                            transformOrigin: 'top left',
                          }}
                        >
                          <div
                            className={`w-full h-full rounded-[38px] overflow-hidden relative flex flex-col justify-between transform-gpu ${
                              isDark ? 'bg-[#090D16] text-white' : 'bg-[#F8FAFC] text-neutral-900'
                            }`}
                            style={{
                              width: `${deviceDimensions.width}px`,
                              height: `${deviceDimensions.height}px`,
                              transform: 'translateZ(0)',
                              fontFamily: activeFontPreset.fontFamily,
                            }}
                          >
                            {/* Scrollable Screen Body inside Individual Phone */}
                            <div className="flex-1 overflow-y-auto no-scrollbar">
                              {renderSimulatorScreenById(scr.id, chosenVariant)}
                            </div>

                            {/* LIVE FIGMA PROTOTYPE OVERLAY PREVIEW (WHEN ACTION = OPEN OVERLAY: MODAL / BOTTOM SHEET / DRAWER / BOTTOM MODAL) */}
                            {activePrototypeOverlayByScreen[scr.id] &&
                              (() => {
                                const liveOv = activePrototypeOverlayByScreen[scr.id]!;
                                return (
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActivePrototypeOverlayByScreen((prev) => ({
                                        ...prev,
                                        [scr.id]: null,
                                      }));
                                    }}
                                    className="absolute inset-0 z-30 bg-black/55 backdrop-blur-[1px] flex flex-col justify-end p-2.5 animate-fadeIn"
                                  >
                                    {liveOv.overlayType === 'modal' ? (
                                      <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="my-auto mx-2 p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-2xl space-y-2.5"
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className="px-2 py-0.5 rounded bg-[#0D99FF] text-white text-[8px] font-mono font-black uppercase">
                                            PROTOTYPE MODAL OVERLAY
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setActivePrototypeOverlayByScreen((prev) => ({
                                                ...prev,
                                                [scr.id]: null,
                                              }))
                                            }
                                            className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-black cursor-pointer"
                                          >
                                            ✕
                                          </button>
                                        </div>
                                        <div className="text-xs font-black">{liveOv.title}</div>
                                        <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                                          {liveOv.subtitle}
                                        </p>
                                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setActivePrototypeOverlayByScreen((prev) => ({
                                                ...prev,
                                                [scr.id]: null,
                                              }))
                                            }
                                            className="py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold cursor-pointer"
                                          >
                                            Close
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setActivePrototypeOverlayByScreen((prev) => ({
                                                ...prev,
                                                [scr.id]: null,
                                              }));
                                              if (liveOv.destinationScreenId) {
                                                setActiveScreen(liveOv.destinationScreenId);
                                              }
                                            }}
                                            className="py-1.5 rounded-xl bg-[#0D99FF] text-white text-[10px] font-black cursor-pointer"
                                          >
                                            Continue →
                                          </button>
                                        </div>
                                      </div>
                                    ) : liveOv.overlayType === 'drawer' ? (
                                      <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="mr-auto w-4/5 h-full rounded-r-2xl bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700 p-3.5 shadow-2xl flex flex-col justify-between"
                                      >
                                        <div className="space-y-2.5">
                                          <div className="flex items-center justify-between">
                                            <span className="px-2 py-0.5 rounded bg-[#0D99FF] text-white text-[8px] font-mono font-black uppercase">
                                              SIDE DRAWER OVERLAY
                                            </span>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                setActivePrototypeOverlayByScreen((prev) => ({
                                                  ...prev,
                                                  [scr.id]: null,
                                                }))
                                              }
                                              className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-black cursor-pointer"
                                            >
                                              ✕
                                            </button>
                                          </div>
                                          <div className="text-xs font-black">{liveOv.title}</div>
                                          <p className="text-[10px] text-neutral-500">
                                            {liveOv.subtitle}
                                          </p>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setActivePrototypeOverlayByScreen((prev) => ({
                                              ...prev,
                                              [scr.id]: null,
                                            }))
                                          }
                                          className="w-full py-2 rounded-xl bg-[#0D99FF] text-white text-[10px] font-black cursor-pointer"
                                        >
                                          Close Drawer
                                        </button>
                                      </div>
                                    ) : (
                                      <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full rounded-t-3xl rounded-b-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-3.5 shadow-2xl space-y-2.5"
                                      >
                                        <div className="w-10 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700 mx-auto" />
                                        <div className="flex items-center justify-between">
                                          <span className="px-2 py-0.5 rounded bg-[#0D99FF] text-white text-[8px] font-mono font-black uppercase">
                                            {liveOv.overlayType === 'bottom_modal'
                                              ? 'BOTTOM MODAL OVERLAY'
                                              : 'BOTTOM SHEET OVERLAY'}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setActivePrototypeOverlayByScreen((prev) => ({
                                                ...prev,
                                                [scr.id]: null,
                                              }))
                                            }
                                            className="text-[10px] font-bold text-neutral-400 hover:text-white cursor-pointer"
                                          >
                                            Dismiss ✕
                                          </button>
                                        </div>
                                        <div className="text-xs font-black">{liveOv.title}</div>
                                        <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                                          {liveOv.subtitle}
                                        </p>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setActivePrototypeOverlayByScreen((prev) => ({
                                              ...prev,
                                              [scr.id]: null,
                                            }))
                                          }
                                          className="w-full py-2 rounded-xl bg-[#0D99FF] text-white text-[10px] font-black cursor-pointer"
                                        >
                                          Done / Apply Action
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}

                             {/* Optional Bottom Navigation Bar for Root Screens (Drag-and-Drop Reorderable + Click to Edit Data & Style) */}
                            {scr.hasBottomNav &&
                              (() => {
                                const navCfg = getScreenBottomNavConfig(scr.id);
                                if (!navCfg.visible) return null;
                                const isBottomNavSelected =
                                  selectedInspectorTarget?.type === 'bottom_nav' &&
                                  selectedInspectorTarget.screenId === scr.id;

                                const iconMap = {
                                  home: Home,
                                  grid: Grid,
                                  heart: Heart,
                                  cart: ShoppingCart,
                                  user: User,
                                };

                                return (
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveScreen(scr.id);
                                      setSelectedInspectorTarget({
                                        type: 'bottom_nav',
                                        screenId: scr.id,
                                      });
                                    }}
                                    className={`h-12 px-2 border-t grid grid-cols-5 items-center flex-shrink-0 transition cursor-pointer ${
                                      isBottomNavSelected
                                        ? 'ring-2 ring-indigo-500 border-indigo-500'
                                        : 'border-neutral-200 dark:border-neutral-800'
                                    }`}
                                    style={{
                                      backgroundColor:
                                        navCfg.bgColor || (isDark ? '#171717' : '#FFFFFF'),
                                    }}
                                    title="Click to edit Bottom Navigation labels & style · Drag tabs to reorder"
                                  >
                                    {navCfg.items.map((tab, tabIdx) => {
                                      const Icon = iconMap[tab.iconKey] || Home;
                                      const active = scr.id === tab.id;
                                      const badgeVal =
                                        tab.iconKey === 'cart'
                                          ? tab.badgeCount ?? totalCartItems
                                          : tab.badgeCount;
                                      return (
                                        <div
                                          key={`${tab.id}-${tabIdx}`}
                                          draggable
                                          onDragStart={(e) => {
                                            e.stopPropagation();
                                            setDraggedBottomNavIdx(tabIdx);
                                            e.dataTransfer.effectAllowed = 'move';
                                          }}
                                          onDragOver={(e) => {
                                            if (
                                              draggedBottomNavIdx !== null &&
                                              draggedBottomNavIdx !== tabIdx
                                            ) {
                                              e.preventDefault();
                                              e.stopPropagation();
                                            }
                                          }}
                                          onDrop={(e) => {
                                            if (
                                              draggedBottomNavIdx !== null &&
                                              draggedBottomNavIdx !== tabIdx
                                            ) {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              updateScreenBottomNavConfig(scr.id, (curr) => {
                                                const copy = [...curr.items];
                                                const [moved] = copy.splice(
                                                  draggedBottomNavIdx,
                                                  1
                                                );
                                                copy.splice(tabIdx, 0, moved);
                                                return { ...curr, items: copy };
                                              });
                                              setDraggedBottomNavIdx(null);
                                              triggerToast('Reordered bottom navigation tab');
                                            }
                                          }}
                                          onDragEnd={() => setDraggedBottomNavIdx(null)}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveScreen(scr.id);
                                            setSelectedInspectorTarget({
                                              type: 'bottom_nav',
                                              screenId: scr.id,
                                            });
                                          }}
                                          className="flex flex-col items-center justify-center gap-0.5 relative cursor-grab active:cursor-grabbing"
                                          style={{
                                            color: active
                                              ? navCfg.activeColor || activeColorPreset.swatch
                                              : '#64748B',
                                          }}
                                        >
                                          <Icon size={14} />
                                          <span className="text-[8px] font-extrabold truncate max-w-[54px]">
                                            {tab.label}
                                          </span>
                                          {badgeVal ? (
                                            <span
                                              className="absolute top-0 right-2 w-3.5 h-3.5 rounded-full text-[8px] font-black text-white flex items-center justify-center"
                                              style={{
                                                backgroundColor:
                                                  navCfg.activeColor ||
                                                  activeColorPreset.swatch,
                                              }}
                                            >
                                              {badgeVal}
                                            </span>
                                          ) : null}
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT INSPECTOR PANEL INSIDE 90% MODAL */}
          {renderInspectorPanel()}
        </div>
      </div>
    </div>
  );
  };

  // Reusable Style & Data Inspector Panel (Renders in both 90% Modal and Main Workspace when any element/section is selected)
  const renderInspectorPanel = () => {
    if (!selectedInspectorTarget) return null;

    const SHADOW_OPTIONS: Array<{ id: DroppedItemShadowPreset; label: string }> = [
      { id: 'none', label: 'None' },
      { id: 'sm', label: 'Small' },
      { id: 'md', label: 'Medium' },
      { id: 'lg', label: 'Large' },
      { id: 'xl', label: 'XL Glow' },
      { id: '2xl', label: '2XL Deep' },
      { id: 'inner', label: 'Inset' },
    ];

    const WIDTH_PRESETS = ['100%', '90%', '75%', '50%', 'auto'];
    const HEIGHT_PRESETS = ['auto', '56px', '88px', '128px', '180px'];
    const GRADIENT_PRESETS = [
      { label: 'None', val: '' },
      {
        label: 'Indigo → Violet',
        val: 'linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)',
      },
      {
        label: 'Emerald → Teal',
        val: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
      },
      {
        label: 'Rose → Orange',
        val: 'linear-gradient(135deg, #F43F5E 0%, #FB923C 100%)',
      },
      {
        label: 'Dark Glass',
        val: 'linear-gradient(145deg, #0F172A 0%, #1E293B 100%)',
      },
      {
        label: 'Gold Luxe',
        val: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)',
      },
    ];

    // Unified Style Editor helper used for BOTH Dropped Components/Elements AND Native Screen Sections
    const renderComprehensiveStyleControls = (
      st: DroppedLibraryItemStyle & ExistingSectionStyleOverride,
      onPatchStyle: (
        patch: Partial<DroppedLibraryItemStyle & ExistingSectionStyleOverride>
      ) => void,
      onResetStyle: () => void,
      showAccentSwatch: boolean
    ) => {
      const mTop = st.marginTop ?? st.margin ?? 0;
      const mRight = st.marginRight ?? st.margin ?? 0;
      const mBottom = st.marginBottom ?? st.margin ?? 0;
      const mLeft = st.marginLeft ?? st.margin ?? 0;

      const pAll = st.padding ?? 12;
      const pTop = st.paddingTop ?? pAll;
      const pRight = st.paddingRight ?? pAll;
      const pBottom = st.paddingBottom ?? pAll;
      const pLeft = st.paddingLeft ?? pAll;

      return (
        <div className="space-y-3.5 text-xs">
          {/* 1. DIMENSIONS: WIDTH & HEIGHT */}
          <div className="p-3 rounded-2xl bg-[#12151C] border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black uppercase tracking-wider text-indigo-400">
                1. Dimensions (Width &amp; Height)
              </span>
              <button
                type="button"
                onClick={onResetStyle}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[9px] font-bold text-neutral-300 cursor-pointer"
              >
                Reset Styles
              </button>
            </div>

            {/* Width Presets + Custom Input */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-neutral-300">
                <span>Width</span>
                <input
                  type="text"
                  value={st.width ?? '100%'}
                  onChange={(e) => onPatchStyle({ width: e.target.value })}
                  placeholder="100% or 260px"
                  className="w-24 px-2 py-0.5 rounded bg-[#1E222D] border border-white/10 text-[10px] font-mono text-right text-indigo-300"
                />
              </div>
              <div className="grid grid-cols-5 gap-1">
                {WIDTH_PRESETS.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => onPatchStyle({ width: w })}
                    className={`py-1 rounded-lg text-[10px] font-black border cursor-pointer ${
                      (st.width || '100%') === w
                        ? 'bg-indigo-600 text-white border-indigo-400'
                        : 'bg-[#1E222D] text-neutral-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Height Presets + Custom Input */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-neutral-300">
                <span>Height</span>
                <input
                  type="text"
                  value={st.height ?? 'auto'}
                  onChange={(e) => onPatchStyle({ height: e.target.value })}
                  placeholder="auto or 120px"
                  className="w-24 px-2 py-0.5 rounded bg-[#1E222D] border border-white/10 text-[10px] font-mono text-right text-indigo-300"
                />
              </div>
              <div className="grid grid-cols-5 gap-1">
                {HEIGHT_PRESETS.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => onPatchStyle({ height: h })}
                    className={`py-1 rounded-lg text-[10px] font-black border cursor-pointer ${
                      (st.height || 'auto') === h
                        ? 'bg-indigo-600 text-white border-indigo-400'
                        : 'bg-[#1E222D] text-neutral-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            {/* Min Height Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-bold text-neutral-300 mb-0.5">
                <span>Min Height</span>
                <span className="font-mono text-indigo-400">{st.minHeight ?? 0}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={260}
                value={st.minHeight ?? 0}
                onChange={(e) => onPatchStyle({ minHeight: Number(e.target.value) })}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          {/* 2. MARGIN (TOP, RIGHT, BOTTOM, LEFT) */}
          <div className="p-3 rounded-2xl bg-[#12151C] border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black uppercase tracking-wider text-emerald-400">
                2. Margin (Top · Right · Bottom · Left)
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                {mTop}px {mRight}px {mBottom}px {mLeft}px
              </span>
            </div>

            {/* All-Side Margin Quick Slider */}
            <div>
              <div className="flex justify-between text-[10px] font-bold text-neutral-300 mb-0.5">
                <span>All Sides Margin</span>
                <span className="font-mono text-emerald-400">{st.margin ?? 0}px</span>
              </div>
              <input
                type="range"
                min={-16}
                max={40}
                value={st.margin ?? 0}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  onPatchStyle({
                    margin: v,
                    marginTop: v,
                    marginRight: v,
                    marginBottom: v,
                    marginLeft: v,
                  });
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* 4-Side Individual Margin Inputs (Top, Right, Bottom, Left) */}
            <div className="grid grid-cols-4 gap-1.5">
              {(
                [
                  ['Top', 'marginTop', mTop],
                  ['Right', 'marginRight', mRight],
                  ['Bottom', 'marginBottom', mBottom],
                  ['Left', 'marginLeft', mLeft],
                ] as const
              ).map(([label, key, val]) => (
                <div
                  key={key}
                  className="p-1.5 rounded-xl bg-[#1E222D] border border-white/10 flex flex-col items-center"
                >
                  <span className="text-[9px] font-bold text-neutral-400 uppercase">{label}</span>
                  <input
                    type="number"
                    min={-32}
                    max={64}
                    value={val}
                    onChange={(e) => onPatchStyle({ [key]: Number(e.target.value) })}
                    className="w-full text-center bg-transparent text-[11px] font-mono font-black text-white focus:outline-none mt-0.5"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 3. PADDING (TOP, RIGHT, BOTTOM, LEFT) */}
          <div className="p-3 rounded-2xl bg-[#12151C] border border-indigo-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black uppercase tracking-wider text-indigo-400">
                3. Padding (Top · Right · Bottom · Left)
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                {pTop}px {pRight}px {pBottom}px {pLeft}px
              </span>
            </div>

            {/* All-Side Padding Slider */}
            <div>
              <div className="flex justify-between text-[10px] font-bold text-neutral-300 mb-0.5">
                <span>All Sides Padding</span>
                <span className="font-mono text-indigo-400">{pAll}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={44}
                value={pAll}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  onPatchStyle({
                    padding: v,
                    paddingTop: v,
                    paddingRight: v,
                    paddingBottom: v,
                    paddingLeft: v,
                  });
                }}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* 4-Side Individual Padding Inputs (Top, Right, Bottom, Left) */}
            <div className="grid grid-cols-4 gap-1.5">
              {(
                [
                  ['Top', 'paddingTop', pTop],
                  ['Right', 'paddingRight', pRight],
                  ['Bottom', 'paddingBottom', pBottom],
                  ['Left', 'paddingLeft', pLeft],
                ] as const
              ).map(([label, key, val]) => (
                <div
                  key={key}
                  className="p-1.5 rounded-xl bg-[#1E222D] border border-white/10 flex flex-col items-center"
                >
                  <span className="text-[9px] font-bold text-neutral-400 uppercase">{label}</span>
                  <input
                    type="number"
                    min={0}
                    max={64}
                    value={val}
                    onChange={(e) => onPatchStyle({ [key]: Number(e.target.value) })}
                    className="w-full text-center bg-transparent text-[11px] font-mono font-black text-white focus:outline-none mt-0.5"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 4. BACKGROUND COLOR, CUSTOM COLOR PICKER & GRADIENTS */}
          <div className="p-3 rounded-2xl bg-[#12151C] border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black uppercase tracking-wider text-amber-400">
                4. Background &amp; Surface
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={st.backgroundColor && st.backgroundColor.startsWith('#') ? st.backgroundColor : '#1E293B'}
                  onChange={(e) =>
                    onPatchStyle({
                      backgroundColor: e.target.value,
                      backgroundGradient: '',
                    })
                  }
                  className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                  title="Pick any custom background color"
                />
                <span className="text-[10px] font-mono text-neutral-400">
                  {st.backgroundColor || 'Default'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { label: 'Default', val: '' },
                { label: 'White', val: '#FFFFFF' },
                { label: 'Slate Dark', val: '#0F172A' },
                { label: 'Pure Black', val: '#09090B' },
                { label: 'Indigo Tint', val: '#EEF2FF' },
                { label: 'Emerald Tint', val: '#ECFDF5' },
                { label: 'Amber Tint', val: '#FEF3C7' },
                { label: 'Rose Tint', val: '#FFE4E6' },
                { label: 'Neon Yellow', val: '#FACC15' },
              ].map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() =>
                    onPatchStyle({
                      backgroundColor: c.val || undefined,
                      backgroundGradient: '',
                    })
                  }
                  className={`px-2 py-1 rounded-lg border text-[10px] font-bold cursor-pointer ${
                    (st.backgroundColor || '') === c.val && !st.backgroundGradient
                      ? 'border-indigo-400 bg-indigo-600 text-white'
                      : 'border-white/15 bg-[#1E222D] hover:bg-white/15 text-neutral-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Gradient Presets */}
            <div className="space-y-1 pt-1">
              <span className="block text-[10px] font-bold text-neutral-400">
                Background Gradient Presets
              </span>
              <div className="grid grid-cols-3 gap-1">
                {GRADIENT_PRESETS.map((g) => (
                  <button
                    key={g.label}
                    type="button"
                    onClick={() => onPatchStyle({ backgroundGradient: g.val })}
                    className={`px-2 py-1 rounded-lg border text-[9px] font-black truncate cursor-pointer ${
                      (st.backgroundGradient || '') === g.val
                        ? 'border-white ring-1 ring-white text-white'
                        : 'border-white/15 text-white/90'
                    }`}
                    style={{
                      background: g.val || '#1E222D',
                    }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {showAccentSwatch && (
              <div className="space-y-1 pt-1 border-t border-white/10">
                <span className="block text-[10px] font-bold text-neutral-300">
                  Component Accent / CTA Color
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    '#4F46E5',
                    '#10B981',
                    '#F43F5E',
                    '#F59E0B',
                    '#06B6D4',
                    '#8B5CF6',
                    '#EC4899',
                    '#111827',
                  ].map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => onPatchStyle({ accentColor: hex })}
                      className={`w-5 h-5 rounded-full border cursor-pointer ${
                        st.accentColor === hex
                          ? 'ring-2 ring-white border-white'
                          : 'border-white/20'
                      }`}
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 5. BORDER, BORDER RADIUS & SHADOW */}
          <div className="p-3 rounded-2xl bg-[#12151C] border border-white/10 space-y-2.5">
            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-cyan-400 block">
              5. Border · Radius · Box Shadow · Opacity
            </span>

            {/* Border Radius */}
            <div>
              <div className="flex justify-between text-[10px] font-bold text-neutral-300 mb-0.5">
                <span>Border Radius</span>
                <span className="font-mono text-cyan-400">{st.borderRadius ?? 14}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                value={st.borderRadius ?? 14}
                onChange={(e) => onPatchStyle({ borderRadius: Number(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Border Width & Style */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-neutral-300 mb-0.5">
                  <span>Border Width</span>
                  <span className="font-mono text-cyan-400">{st.borderWidth ?? 1}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={8}
                  value={st.borderWidth ?? 1}
                  onChange={(e) => onPatchStyle({ borderWidth: Number(e.target.value) })}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <span className="block text-[10px] font-bold text-neutral-300 mb-0.5">
                  Border Style
                </span>
                <div className="grid grid-cols-4 gap-1">
                  {(['none', 'solid', 'dashed', 'dotted'] as const).map((bs) => (
                    <button
                      key={bs}
                      type="button"
                      onClick={() => onPatchStyle({ borderStyle: bs })}
                      className={`py-1 rounded text-[8px] font-black uppercase border cursor-pointer ${
                        (st.borderStyle || 'solid') === bs
                          ? 'bg-cyan-600 text-white border-cyan-400'
                          : 'bg-[#1E222D] text-neutral-400 border-white/10'
                      }`}
                    >
                      {bs.slice(0, 4)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Border Color Swatches */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-neutral-300">Border Color</span>
              <div className="flex items-center gap-1">
                {['#E2E8F0', '#1E293B', '#6366F1', '#10B981', '#F43F5E', '#F59E0B'].map(
                  (bHex) => (
                    <button
                      key={bHex}
                      type="button"
                      onClick={() => onPatchStyle({ borderColor: bHex })}
                      className={`w-4 h-4 rounded-full border cursor-pointer ${
                        st.borderColor === bHex ? 'ring-2 ring-white' : 'border-white/20'
                      }`}
                      style={{ backgroundColor: bHex }}
                    />
                  )
                )}
                <input
                  type="color"
                  value={st.borderColor && st.borderColor.startsWith('#') ? st.borderColor : '#6366F1'}
                  onChange={(e) => onPatchStyle({ borderColor: e.target.value })}
                  className="w-4 h-4 rounded cursor-pointer border-0 bg-transparent"
                />
              </div>
            </div>

            {/* Box Shadow */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-neutral-300">
                <span>Box Shadow</span>
                <span className="font-mono uppercase text-cyan-400">
                  {st.shadow || 'none'}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {SHADOW_OPTIONS.map((sh) => {
                  const active = (st.shadow || 'none') === sh.id;
                  return (
                    <button
                      key={sh.id}
                      type="button"
                      onClick={() => onPatchStyle({ shadow: sh.id })}
                      className={`py-1 px-1 rounded-lg text-[9px] font-black border transition cursor-pointer ${
                        active
                          ? 'bg-indigo-600 text-white border-indigo-400'
                          : 'bg-[#1E222D] text-neutral-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {sh.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Opacity Slider */}
            <div>
              <div className="flex justify-between text-[10px] font-bold text-neutral-300 mb-0.5">
                <span>Opacity</span>
                <span className="font-mono text-cyan-400">{st.opacity ?? 100}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                value={st.opacity ?? 100}
                onChange={(e) => onPatchStyle({ opacity: Number(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>

          {/* 6. TYPOGRAPHY & TEXT STYLE */}
          <div className="p-3 rounded-2xl bg-[#12151C] border border-white/10 space-y-2.5">
            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-pink-400 block">
              6. Typography · Text Color · Alignment
            </span>

            {/* Text Color + Custom Picker */}
            <div className="flex items-center justify-between gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold text-neutral-300">Text Color</span>
              <div className="flex items-center gap-1 flex-wrap">
                {[
                  { label: 'Auto', val: '' },
                  { label: 'Dark', val: '#0F172A' },
                  { label: 'White', val: '#FFFFFF' },
                  { label: 'Indigo', val: '#4F46E5' },
                  { label: 'Emerald', val: '#10B981' },
                  { label: 'Rose', val: '#F43F5E' },
                ].map((tc) => (
                  <button
                    key={tc.label}
                    type="button"
                    onClick={() => onPatchStyle({ textColor: tc.val || undefined })}
                    className={`px-1.5 py-0.5 rounded border text-[9px] font-bold cursor-pointer ${
                      (st.textColor || '') === tc.val
                        ? 'bg-pink-600 text-white border-pink-400'
                        : 'border-white/15 bg-[#1E222D] text-neutral-300'
                    }`}
                  >
                    {tc.label}
                  </button>
                ))}
                <input
                  type="color"
                  value={st.textColor && st.textColor.startsWith('#') ? st.textColor : '#FFFFFF'}
                  onChange={(e) => onPatchStyle({ textColor: e.target.value })}
                  className="w-4 h-4 rounded cursor-pointer border-0 bg-transparent"
                />
              </div>
            </div>

            {/* Font Size (px) & Font Weight */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-neutral-300 mb-0.5">
                  <span>Font Size</span>
                  <span className="font-mono text-pink-400">
                    {st.fontSizePx ? `${st.fontSizePx}px` : 'Auto'}
                  </span>
                </div>
                <input
                  type="range"
                  min={9}
                  max={28}
                  value={st.fontSizePx ?? 13}
                  onChange={(e) => onPatchStyle({ fontSizePx: Number(e.target.value) })}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              <div>
                <span className="block text-[10px] font-bold text-neutral-300 mb-0.5">
                  Font Weight
                </span>
                <div className="grid grid-cols-4 gap-1">
                  {(
                    [
                      ['400', 'Reg'],
                      ['600', 'Semi'],
                      ['700', 'Bold'],
                      ['900', 'Black'],
                    ] as const
                  ).map(([fw, lbl]) => (
                    <button
                      key={fw}
                      type="button"
                      onClick={() => onPatchStyle({ fontWeight: fw })}
                      className={`py-1 rounded text-[8px] font-black border cursor-pointer ${
                        st.fontWeight === fw
                          ? 'bg-pink-600 text-white border-pink-400'
                          : 'bg-[#1E222D] text-neutral-400 border-white/10'
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Text Alignment & Letter Spacing */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="block text-[10px] font-bold text-neutral-300 mb-0.5">
                  Text Align
                </span>
                <div className="grid grid-cols-3 gap-1 bg-[#1E222D] p-1 rounded-xl">
                  {(['left', 'center', 'right'] as const).map((al) => (
                    <button
                      key={al}
                      type="button"
                      onClick={() => onPatchStyle({ textAlign: al })}
                      className={`py-0.5 rounded-lg text-[9px] font-black uppercase cursor-pointer ${
                        (st.textAlign || 'left') === al
                          ? 'bg-pink-600 text-white'
                          : 'text-neutral-400'
                      }`}
                    >
                      {al}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-bold text-neutral-300 mb-0.5">
                  <span>Letter Spacing</span>
                  <span className="font-mono text-pink-400">{st.letterSpacing ?? 0}px</span>
                </div>
                <input
                  type="range"
                  min={-1}
                  max={6}
                  step={0.5}
                  value={st.letterSpacing ?? 0}
                  onChange={(e) => onPatchStyle({ letterSpacing: Number(e.target.value) })}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="w-80 sm:w-88 h-full border-l border-neutral-200 dark:border-neutral-800 bg-[#181B23] text-white flex flex-col flex-shrink-0 select-none z-20">
        {/* Inspector Header */}
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal size={13} style={{ color: activeColorPreset.swatch }} />
              <span>
                {selectedInspectorTarget.type === 'screen'
                  ? 'Selected Screen Inspector'
                  : selectedInspectorTarget.type === 'bottom_nav'
                  ? 'Bottom Nav Properties'
                  : selectedInspectorTarget.type === 'native_section'
                  ? 'Screen Section Inspector'
                  : 'Component & Element Inspector'}
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 truncate mt-0.5">
              Screen:{' '}
              {orderedScreens.find((s) => s.id === selectedInspectorTarget.screenId)?.label ||
                selectedInspectorTarget.screenId}
            </p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {selectedInspectorTarget.type !== 'screen' && (
              <button
                type="button"
                onClick={() => {
                  setInspectorTab('style');
                  setSelectedInspectorTarget({
                    type: 'screen',
                    screenId: selectedInspectorTarget.screenId,
                  });
                }}
                className="px-2 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/35 border border-indigo-400/30 text-[9px] font-black text-indigo-300 cursor-pointer"
                title="Switch to styling the whole selected Screen (Background, Padding, Margin, etc.)"
              >
                Screen Style
              </button>
            )}
            <button
              type="button"
              onClick={() => setSelectedInspectorTarget(null)}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer"
              title="Close Inspector"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* 3 Inspector Tabs: 1. DATA INFO | 2. STYLE () | 3. PROTOTYPE (FIGMA INTERACTION & ACTION) */}
        <div className="grid grid-cols-3 border-b border-white/10 bg-[#12151C]">
          <button
            type="button"
            onClick={() => setInspectorTab('data')}
            className={`py-2.5 text-[11px] font-black uppercase tracking-wider border-b-2 transition cursor-pointer ${
              inspectorTab === 'data'
                ? 'text-white bg-[#1E222D]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
            style={
              inspectorTab === 'data' ? { borderColor: activeColorPreset.swatch } : undefined
            }
          >
            1. Data
          </button>
          <button
            type="button"
            onClick={() => setInspectorTab('style')}
            className={`py-2.5 text-[11px] font-black uppercase tracking-wider border-b-2 transition cursor-pointer ${
              inspectorTab === 'style'
                ? 'text-white bg-[#1E222D]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
            style={
              inspectorTab === 'style' ? { borderColor: activeColorPreset.swatch } : undefined
            }
          >
            2. Style
          </button>
          <button
            type="button"
            onClick={() => setInspectorTab('prototype')}
            className={`py-2.5 text-[11px] font-black uppercase tracking-wider border-b-2 transition cursor-pointer flex items-center justify-center gap-1 ${
              inspectorTab === 'prototype'
                ? 'text-[#38BDF8] bg-[#1E222D] border-[#0D99FF]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <span>⚡ 3. Prototype</span>
          </button>
        </div>

        {/* Inspector Body */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
          {inspectorTab === 'prototype' ? (
            (() => {
              const targetScreenId = selectedInspectorTarget.screenId;
              const targetScrObj = orderedScreens.find((s) => s.id === targetScreenId);

              // Resolve current prototype config depending on whether a Screen, Dropped Item, or Native Section is selected
              const currentProto: PrototypeInteractionConfig =
                selectedInspectorTarget.type === 'item'
                  ? (() => {
                      const list = screenDroppedItems[targetScreenId] || [];
                      const found = list.find(
                        (i) => i.instanceId === selectedInspectorTarget.instanceId
                      );
                      return (
                        found?.data?.prototypeConfig || {
                          enabled: false,
                          trigger: 'on_tap',
                          action: 'navigate_to',
                          destinationScreenId:
                            orderedScreens.find((s) => s.id !== targetScreenId)?.id ||
                            'HomeDashboard',
                          animation: 'smart_animate',
                          direction: 'right',
                          easing: 'ease_in_out',
                          durationMs: 300,
                        }
                      );
                    })()
                  : selectedInspectorTarget.type === 'native_section'
                  ? nativeSectionPrototypeConfigs[selectedInspectorTarget.sectionId] || {
                      enabled: false,
                      trigger: 'on_tap',
                      action: 'navigate_to',
                      destinationScreenId:
                        orderedScreens.find((s) => s.id !== targetScreenId)?.id ||
                        'HomeDashboard',
                      animation: 'smart_animate',
                      direction: 'right',
                      easing: 'ease_in_out',
                      durationMs: 300,
                    }
                  : screenPrototypeConfigs[targetScreenId] || {
                      enabled: false,
                      trigger: 'on_tap',
                      action: 'navigate_to',
                      destinationScreenId:
                        orderedScreens.find((s) => s.id !== targetScreenId)?.id ||
                        'HomeDashboard',
                      animation: 'smart_animate',
                      direction: 'right',
                      easing: 'ease_in_out',
                      durationMs: 300,
                    };

              const updateCurrentProto = (patch: Partial<PrototypeInteractionConfig>) => {
                if (selectedInspectorTarget.type === 'item') {
                  const list = screenDroppedItems[targetScreenId] || [];
                  const found = list.find(
                    (i) => i.instanceId === selectedInspectorTarget.instanceId
                  );
                  const merged: PrototypeInteractionConfig = {
                    ...currentProto,
                    ...patch,
                    enabled: patch.enabled !== undefined ? patch.enabled : true,
                  };
                  handleUpdateDroppedItemData(
                    targetScreenId,
                    selectedInspectorTarget.instanceId,
                    {
                      prototypeConfig: merged,
                    }
                  );
                  if (merged.destinationScreenId && merged.action === 'navigate_to') {
                    upsertScreenPrototypeConnection(targetScreenId, {
                      ...merged,
                      triggerLabel: `${found?.label || 'Component'} (${(
                        merged.trigger || 'on_tap'
                      ).replace('_', ' ')})`,
                    });
                  }
                } else if (selectedInspectorTarget.type === 'native_section') {
                  const secId = selectedInspectorTarget.sectionId;
                  const merged: PrototypeInteractionConfig = {
                    ...currentProto,
                    ...patch,
                    enabled: patch.enabled !== undefined ? patch.enabled : true,
                  };
                  setNativeSectionPrototypeConfigs((prev) => ({
                    ...prev,
                    [secId]: merged,
                  }));
                } else {
                  upsertScreenPrototypeConnection(targetScreenId, patch);
                }
              };

              const selectedSubjectLabel =
                selectedInspectorTarget.type === 'item'
                  ? (() => {
                      const list = screenDroppedItems[targetScreenId] || [];
                      return (
                        list.find((i) => i.instanceId === selectedInspectorTarget.instanceId)
                          ?.label || 'Selected Component'
                      );
                    })()
                  : selectedInspectorTarget.type === 'native_section'
                  ? `Section: ${selectedInspectorTarget.sectionId}`
                  : selectedInspectorTarget.type === 'bottom_nav'
                  ? 'Bottom Navigation Bar'
                  : `Screen: ${targetScrObj?.label || targetScreenId}`;

              return (
                <div className="space-y-3.5 text-xs">
                  {/* Top Figma Prototype Banner */}
                  <div className="p-3 rounded-2xl bg-[#0D99FF]/15 border border-[#0D99FF]/40 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#38BDF8] flex items-center gap-1">
                        <span>⚡ FIGMA PROTOTYPE INTERACTION</span>
                      </span>
                      <label className="flex items-center gap-1.5 text-[10px] font-black cursor-pointer">
                        <input
                          type="checkbox"
                          checked={Boolean(currentProto.enabled)}
                          onChange={(e) =>
                            updateCurrentProto({ enabled: e.target.checked })
                          }
                          className="accent-[#0D99FF] cursor-pointer"
                        />
                        <span className={currentProto.enabled ? 'text-emerald-400' : 'text-neutral-400'}>
                          {currentProto.enabled ? 'Active' : 'Disabled'}
                        </span>
                      </label>
                    </div>
                    <div className="text-xs font-black text-white truncate">
                      {selectedSubjectLabel}
                    </div>
                    <p className="text-[10px] text-neutral-300 leading-relaxed">
                      Define what action happens when the user interacts with this selected screen or component in the simulator.
                    </p>
                  </div>

                  {/* 1. TRIGGER SELECTOR (On Tap, On Double Tap, On Long Press, On Drag, After Delay) */}
                  <div className="p-3 rounded-2xl bg-[#12151C] border border-white/10 space-y-2">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-sky-400 block">
                      1. Trigger (When to Take Action)
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(
                        [
                          ['on_tap', '👆 On Tap / Click'],
                          ['on_double_tap', '⚡ On Double Tap'],
                          ['on_long_press', '⏱ On Long Press'],
                          ['on_drag', '🖐 On Drag / Swipe'],
                          ['on_hover', '✨ While Hovering'],
                          ['after_delay', '⏳ After Delay'],
                        ] as const
                      ).map(([trigId, trigLabel]) => (
                        <button
                          key={trigId}
                          type="button"
                          onClick={() => updateCurrentProto({ trigger: trigId })}
                          className={`py-1.5 px-2.5 rounded-xl text-[10px] font-black border text-left transition cursor-pointer ${
                            (currentProto.trigger || 'on_tap') === trigId
                              ? 'bg-[#0D99FF] text-white border-[#38BDF8] shadow-xs'
                              : 'bg-[#1E222D] text-neutral-300 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {trigLabel}
                        </button>
                      ))}
                    </div>

                    {currentProto.trigger === 'after_delay' && (
                      <div className="pt-1">
                        <div className="flex justify-between text-[10px] font-bold text-neutral-300 mb-1">
                          <span>Delay Timer (ms)</span>
                          <span className="font-mono text-sky-400">
                            {currentProto.delayMs ?? 1200}ms
                          </span>
                        </div>
                        <input
                          type="range"
                          min={200}
                          max={5000}
                          step={100}
                          value={currentProto.delayMs ?? 1200}
                          onChange={(e) =>
                            updateCurrentProto({ delayMs: Number(e.target.value) })
                          }
                          className="w-full accent-[#0D99FF] cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                  {/* 2. ACTION TYPE SELECTOR (Navigate To, Open Overlay, Swap Overlay, Back, Scroll To, Open Link) */}
                  <div className="p-3 rounded-2xl bg-[#12151C] border border-white/10 space-y-2">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-emerald-400 block">
                      2. Action (What We Want to Take Action)
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(
                        [
                          ['navigate_to', '➡ Navigate To Screen'],
                          ['open_overlay', '🗔 Open Overlay'],
                          ['swap_overlay', '⇄ Swap Overlay'],
                          ['close_overlay', '✕ Close Overlay'],
                          ['back', '⬅ Navigate Back'],
                          ['scroll_to', '⬇ Scroll To Section'],
                          ['open_link', '🔗 Open External URL'],
                        ] as const
                      ).map(([actId, actLabel]) => (
                        <button
                          key={actId}
                          type="button"
                          onClick={() => updateCurrentProto({ action: actId })}
                          className={`py-1.5 px-2.5 rounded-xl text-[10px] font-black border text-left transition cursor-pointer ${
                            (currentProto.action || 'navigate_to') === actId
                              ? 'bg-emerald-600 text-white border-emerald-400 shadow-xs'
                              : 'bg-[#1E222D] text-neutral-300 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {actLabel}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. DESTINATION SCREEN OR OVERLAY CONFIG */}
                  {(currentProto.action === 'navigate_to' ||
                    currentProto.action === 'open_overlay' ||
                    currentProto.action === 'swap_overlay' ||
                    !currentProto.action) && (
                    <div className="p-3 rounded-2xl bg-[#12151C] border border-[#0D99FF]/35 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#38BDF8]">
                          3. Destination Screen
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setConnectingPrototypeFromScreenId((prev) =>
                              prev === targetScreenId ? null : targetScreenId
                            )
                          }
                          className={`px-2 py-0.5 rounded-lg text-[9px] font-black cursor-pointer ${
                            connectingPrototypeFromScreenId === targetScreenId
                              ? 'bg-amber-500 text-neutral-950'
                              : 'bg-[#0D99FF]/20 text-[#38BDF8] border border-[#0D99FF]/40 hover:bg-[#0D99FF]/30'
                          }`}
                        >
                          {connectingPrototypeFromScreenId === targetScreenId
                            ? 'Click Any Screen on Canvas...'
                            : '+ Pick Screen on Canvas'}
                        </button>
                      </div>

                      <select
                        value={
                          currentProto.destinationScreenId ||
                          orderedScreens.find((s) => s.id !== targetScreenId)?.id ||
                          'HomeDashboard'
                        }
                        onChange={(e) =>
                          updateCurrentProto({
                            destinationScreenId: e.target.value as CustomEcommerceScreenId,
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#1E222D] border border-white/15 text-xs font-bold text-white focus:outline-none"
                      >
                        {orderedScreens.map((s, idx) => (
                          <option key={s.id} value={s.id}>
                            #{idx + 1} · {s.label} ({s.flow})
                          </option>
                        ))}
                      </select>

                      {/* Target Variant Selector (Optional V1-V6 on Destination Screen) */}
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-300 mb-1">
                          Target Screen Variant (V1 – V6)
                        </label>
                        <div className="grid grid-cols-6 gap-1">
                          {ALL_CUSTOM_ECOMMERCE_VARIANT_IDS.map((vid, vIdx) => {
                            const activeVar =
                              (currentProto.destinationVariant || 'varient_1') === vid;
                            return (
                              <button
                                key={vid}
                                type="button"
                                onClick={() =>
                                  updateCurrentProto({ destinationVariant: vid })
                                }
                                className={`py-1 rounded-lg text-[9px] font-black border cursor-pointer ${
                                  activeVar
                                    ? 'bg-[#0D99FF] text-white border-[#38BDF8]'
                                    : 'bg-[#1E222D] text-neutral-400 border-white/10 hover:text-white'
                                }`}
                              >
                                V{vIdx + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Overlay Style Picker when Action = Open Overlay / Swap Overlay */}
                      {(currentProto.action === 'open_overlay' ||
                        currentProto.action === 'swap_overlay') && (
                        <div className="pt-1 border-t border-white/10 space-y-1.5">
                          <label className="block text-[10px] font-bold text-amber-300">
                            Overlay Presentation Mode (Modal / Sheet / Drawer)
                          </label>
                          <div className="grid grid-cols-2 gap-1.5">
                            {(
                              [
                                ['bottom_sheet', 'Bottom Sheet'],
                                ['modal', 'Centered Modal'],
                                ['drawer', 'Side Drawer'],
                                ['bottom_modal', 'Bottom Modal Card'],
                              ] as const
                            ).map(([ovId, ovLabel]) => (
                              <button
                                key={ovId}
                                type="button"
                                onClick={() => updateCurrentProto({ overlayType: ovId })}
                                className={`py-1.5 px-2 rounded-xl text-[10px] font-black border cursor-pointer ${
                                  (currentProto.overlayType || 'bottom_sheet') === ovId
                                    ? 'bg-amber-500 text-neutral-950 border-amber-300'
                                    : 'bg-[#1E222D] text-neutral-300 border-white/10'
                                }`}
                              >
                                {ovLabel}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {currentProto.action === 'open_link' && (
                    <div className="p-3 rounded-2xl bg-[#12151C] border border-white/10 space-y-1.5">
                      <label className="block text-[10px] font-bold text-neutral-300">
                        External URL to Open
                      </label>
                      <input
                        type="text"
                        value={currentProto.externalUrl ?? 'https://novacart.store/promo'}
                        onChange={(e) =>
                          updateCurrentProto({ externalUrl: e.target.value })
                        }
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 rounded-xl bg-[#1E222D] border border-white/10 text-xs font-mono text-white"
                      />
                    </div>
                  )}

                  {/* 4. ANIMATION, DIRECTION, EASING & DURATION */}
                  <div className="p-3 rounded-2xl bg-[#12151C] border border-white/10 space-y-2.5">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-purple-400 block">
                      4. Animation &amp; Transition Physics
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(
                        [
                          ['smart_animate', '✨ Smart Animate'],
                          ['push', '➡ Push Screen'],
                          ['move_in', '📥 Move In'],
                          ['slide_in', '🎞 Slide In'],
                          ['dissolve', '🌫 Dissolve'],
                          ['instant', '⚡ Instant'],
                        ] as const
                      ).map(([animId, animLabel]) => (
                        <button
                          key={animId}
                          type="button"
                          onClick={() => updateCurrentProto({ animation: animId })}
                          className={`py-1.5 px-2 rounded-xl text-[10px] font-black border text-left cursor-pointer ${
                            (currentProto.animation || 'smart_animate') === animId
                              ? 'bg-purple-600 text-white border-purple-400'
                              : 'bg-[#1E222D] text-neutral-300 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {animLabel}
                        </button>
                      ))}
                    </div>

                    {/* Direction arrows */}
                    <div>
                      <span className="block text-[10px] font-bold text-neutral-300 mb-1">
                        Transition Direction
                      </span>
                      <div className="grid grid-cols-4 gap-1">
                        {(
                          [
                            ['left', '← Left'],
                            ['right', '→ Right'],
                            ['up', '↑ Up'],
                            ['down', '↓ Down'],
                          ] as const
                        ).map(([dirId, dirLabel]) => (
                          <button
                            key={dirId}
                            type="button"
                            onClick={() => updateCurrentProto({ direction: dirId })}
                            className={`py-1 rounded-lg text-[10px] font-black border cursor-pointer ${
                              (currentProto.direction || 'right') === dirId
                                ? 'bg-purple-600 text-white border-purple-400'
                                : 'bg-[#1E222D] text-neutral-400 border-white/10'
                            }`}
                          >
                            {dirLabel}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Duration Slider */}
                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-neutral-300 mb-0.5">
                        <span>Animation Duration</span>
                        <span className="font-mono text-purple-400">
                          {currentProto.durationMs ?? 300}ms
                        </span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={1200}
                        step={20}
                        value={currentProto.durationMs ?? 300}
                        onChange={(e) =>
                          updateCurrentProto({ durationMs: Number(e.target.value) })
                        }
                        className="w-full accent-purple-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* TEST / RUN PROTOTYPE ACTION NOW BUTTON + REMOVE INTERACTION */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        executePrototypeInteraction(
                          targetScreenId,
                          { ...currentProto, enabled: true },
                          selectedSubjectLabel
                        )
                      }
                      className="w-full py-2.5 rounded-xl bg-[#0D99FF] hover:bg-[#0284C7] text-white text-xs font-black shadow-lg flex items-center justify-center gap-1.5 cursor-pointer transition"
                    >
                      <span>▶ Test / Run Prototype Action Now</span>
                    </button>

                    {currentProto.enabled && (
                      <button
                        type="button"
                        onClick={() => updateCurrentProto({ enabled: false })}
                        className="w-full py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-[10px] font-black cursor-pointer"
                      >
                        Remove Prototype Interaction
                      </button>
                    )}
                  </div>
                </div>
              );
            })()
          ) : selectedInspectorTarget.type === 'screen' ? (
            (() => {
              const scrId = selectedInspectorTarget.screenId;
              const scrObj = orderedScreens.find((s) => s.id === scrId);
              const scrStyle = screenStyleOverrides[scrId] || {};
              return inspectorTab === 'data' ? (
                <div className="space-y-3.5">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                    <div className="text-[10px] font-mono uppercase text-indigo-400">
                      SELECTED SCREEN
                    </div>
                    <div className="text-xs font-black truncate mt-0.5">
                      {scrObj?.label || scrId}
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1">
                      Edit this screen&apos;s title &amp; description, or switch to 2. Style () to customize the entire screen&apos;s Background, Padding, Margin, Border &amp; Shadow.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                      Screen Title
                    </label>
                    <input
                      type="text"
                      value={scrObj?.label ?? ''}
                      onChange={(e) => {
                        const nextTitle = e.target.value;
                        setOrderedScreens((prev) =>
                          prev.map((s) => (s.id === scrId ? { ...s, label: nextTitle } : s))
                        );
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#1E222D] border border-white/10 text-xs font-bold text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                      Screen Description
                    </label>
                    <textarea
                      rows={2}
                      value={scrObj?.description ?? ''}
                      onChange={(e) => {
                        const nextDesc = e.target.value;
                        setOrderedScreens((prev) =>
                          prev.map((s) =>
                            s.id === scrId ? { ...s, description: nextDesc } : s
                          )
                        );
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#1E222D] border border-white/10 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                    <div className="text-[10px] font-mono uppercase text-indigo-400">
                      SELECTED SCREEN STYLE (BACKGROUND · PADDING · MARGIN)
                    </div>
                    <div className="text-xs font-black truncate mt-0.5">
                      {scrObj?.label || scrId}
                    </div>
                  </div>
                  {renderComprehensiveStyleControls(
                    scrStyle,
                    (patch) => handleUpdateScreenStyle(scrId, patch),
                    () =>
                      setScreenStyleOverrides((prev) => {
                        const copy = { ...prev };
                        delete copy[scrId];
                        return copy;
                      }),
                    false
                  )}
                </div>
              );
            })()
          ) : selectedInspectorTarget.type === 'native_section' ? (
            (() => {
              const secId = selectedInspectorTarget.sectionId;
              const secStyle = nativeSectionStyleOverrides[secId] || {};
              return inspectorTab === 'data' ? (
                <div className="space-y-3.5">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[10px] font-mono uppercase text-emerald-400">
                      SELECTED SCREEN SECTION
                    </div>
                    <div className="text-xs font-black truncate mt-0.5">{secId}</div>
                    <p className="text-[10px] text-neutral-400 mt-1">
                      Override section text or switch to 2. Style () for Width, Height, Margin, Padding, Background, Border &amp; Shadow.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                      Section Text / Label Override
                    </label>
                    <input
                      type="text"
                      value={secStyle.textContentOverride ?? ''}
                      onChange={(e) =>
                        handleUpdateNativeSectionStyle(secId, {
                          textContentOverride: e.target.value,
                        })
                      }
                      placeholder="Type custom text for this section..."
                      className="w-full px-3 py-2 rounded-xl bg-[#1E222D] border border-white/10 text-xs font-bold text-white focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[10px] font-mono uppercase text-emerald-400">
                      SELECTED SCREEN SECTION
                    </div>
                    <div className="text-xs font-black truncate mt-0.5">{secId}</div>
                  </div>
                  {renderComprehensiveStyleControls(
                    secStyle,
                    (patch) => handleUpdateNativeSectionStyle(secId, patch),
                    () =>
                      setNativeSectionStyleOverrides((prev) => {
                        const copy = { ...prev };
                        delete copy[secId];
                        return copy;
                      }),
                    false
                  )}
                </div>
              );
            })()
          ) : selectedInspectorTarget.type === 'bottom_nav' ? (
            (() => {
              const scrId = selectedInspectorTarget.screenId;
              const navCfg = getScreenBottomNavConfig(scrId);
              return inspectorTab === 'data' ? (
                <div className="space-y-3">
                  <div className="text-[11px] font-bold text-neutral-300">
                    Bottom Navigation Tabs (Drag or Use Arrows to Reorder)
                  </div>
                  {navCfg.items.map((tab, tIdx) => (
                    <div
                      key={`${tab.id}-${tIdx}`}
                      className="p-2.5 rounded-xl bg-[#1E222D] border border-white/10 space-y-2"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                        <span>TAB #{tIdx + 1}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateScreenBottomNavConfig(scrId, (curr) => {
                                if (tIdx === 0) return curr;
                                const copy = [...curr.items];
                                const [m] = copy.splice(tIdx, 1);
                                copy.splice(tIdx - 1, 0, m);
                                return { ...curr, items: copy };
                              })
                            }
                            className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateScreenBottomNavConfig(scrId, (curr) => {
                                if (tIdx >= curr.items.length - 1) return curr;
                                const copy = [...curr.items];
                                const [m] = copy.splice(tIdx, 1);
                                copy.splice(tIdx + 1, 0, m);
                                return { ...curr, items: copy };
                              })
                            }
                            className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                          >
                            →
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={tab.label}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateScreenBottomNavConfig(scrId, (curr) => {
                            const copy = [...curr.items];
                            copy[tIdx] = { ...copy[tIdx], label: val };
                            return { ...curr, items: copy };
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#12151C] border border-white/10 text-xs font-bold text-white"
                        placeholder="Tab Label"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <label className="flex items-center justify-between text-xs font-bold cursor-pointer">
                    <span>Show Bottom Navigation Bar</span>
                    <input
                      type="checkbox"
                      checked={navCfg.visible}
                      onChange={(e) =>
                        updateScreenBottomNavConfig(scrId, (curr) => ({
                          ...curr,
                          visible: e.target.checked,
                        }))
                      }
                      className="accent-indigo-500"
                    />
                  </label>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-neutral-300">
                      Active Tab Icon &amp; Badge Color
                    </label>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {[
                        '#4F46E5',
                        '#10B981',
                        '#F43F5E',
                        '#F59E0B',
                        '#06B6D4',
                        '#8B5CF6',
                      ].map((hex) => (
                        <button
                          key={hex}
                          type="button"
                          onClick={() =>
                            updateScreenBottomNavConfig(scrId, (curr) => ({
                              ...curr,
                              activeColor: hex,
                            }))
                          }
                          className="w-6 h-6 rounded-full border border-white/20 cursor-pointer"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-neutral-300">
                      Bar Background Color
                    </label>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {['#FFFFFF', '#0F172A', '#18181B', '#1E1B4B', '#FEF3C7'].map((hex) => (
                        <button
                          key={hex}
                          type="button"
                          onClick={() =>
                            updateScreenBottomNavConfig(scrId, (curr) => ({
                              ...curr,
                              bgColor: hex,
                            }))
                          }
                          className="px-2.5 py-1 rounded-lg border border-white/20 text-[10px] font-mono font-bold cursor-pointer"
                          style={{
                            backgroundColor: hex,
                            color: hex === '#FFFFFF' || hex === '#FEF3C7' ? '#000' : '#FFF',
                          }}
                        >
                          {hex}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            (() => {
              const scrId = selectedInspectorTarget.screenId;
              const instId = selectedInspectorTarget.instanceId;
              const list = screenDroppedItems[scrId] || [];
              const currentItem = list.find((i) => i.instanceId === instId);
              if (!currentItem) {
                return (
                  <div className="text-xs text-neutral-400">
                    Select any dropped element or component inside a screen to edit its Data Information and Style.
                  </div>
                );
              }

              const d = currentItem.data || {};
              const st = currentItem.style || {};

              return inspectorTab === 'data' ? (
                <div className="space-y-3.5">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-indigo-400">
                        {currentItem.category}
                      </div>
                      <div className="text-xs font-black">{currentItem.label}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveDroppedItemOnScreen(scrId, instId, 'up')}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveDroppedItemOnScreen(scrId, instId, 'down')}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown size={12} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                      Title / Heading / Label Text
                    </label>
                    <input
                      type="text"
                      value={d.title ?? ''}
                      onChange={(e) =>
                        handleUpdateDroppedItemData(scrId, instId, {
                          title: e.target.value,
                        })
                      }
                      placeholder="Enter title or heading..."
                      className="w-full px-3 py-2 rounded-xl bg-[#1E222D] border border-white/10 text-xs font-bold text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                      Description / Sub-Text / Body Copy
                    </label>
                    <textarea
                      rows={2}
                      value={d.subtitle ?? ''}
                      onChange={(e) =>
                        handleUpdateDroppedItemData(scrId, instId, {
                          subtitle: e.target.value,
                        })
                      }
                      placeholder="Enter description or subtitle..."
                      className="w-full px-3 py-2 rounded-xl bg-[#1E222D] border border-white/10 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                        Price / Metric Value
                      </label>
                      <input
                        type="text"
                        value={d.price ?? ''}
                        onChange={(e) =>
                          handleUpdateDroppedItemData(scrId, instId, {
                            price: e.target.value,
                          })
                        }
                        placeholder="$149.00"
                        className="w-full px-2.5 py-1.5 rounded-xl bg-[#1E222D] border border-white/10 text-xs font-bold text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                        Badge / Tag Text
                      </label>
                      <input
                        type="text"
                        value={d.badgeText ?? ''}
                        onChange={(e) =>
                          handleUpdateDroppedItemData(scrId, instId, {
                            badgeText: e.target.value,
                          })
                        }
                        placeholder="PROMO / NEW"
                        className="w-full px-2.5 py-1.5 rounded-xl bg-[#1E222D] border border-white/10 text-xs font-bold text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                      Button / Action CTA Text
                    </label>
                    <input
                      type="text"
                      value={d.buttonText ?? ''}
                      onChange={(e) =>
                        handleUpdateDroppedItemData(scrId, instId, {
                          buttonText: e.target.value,
                        })
                      }
                      placeholder="Claim / + Add to Cart / Open"
                      className="w-full px-3 py-1.5 rounded-xl bg-[#1E222D] border border-white/10 text-xs font-bold text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                      Dropdown / List / Tag Items (Comma Separated)
                    </label>
                    <textarea
                      rows={2}
                      value={d.optionsCsv ?? ''}
                      onChange={(e) =>
                        handleUpdateDroppedItemData(scrId, instId, {
                          optionsCsv: e.target.value,
                        })
                      }
                      placeholder="Option 1, Option 2, Option 3"
                      className="w-full px-3 py-1.5 rounded-xl bg-[#1E222D] border border-white/10 text-[11px] font-mono text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                      Image URL (For Image / Card Components)
                    </label>
                    <input
                      type="text"
                      value={d.imageUrl ?? ''}
                      onChange={(e) =>
                        handleUpdateDroppedItemData(scrId, instId, {
                          imageUrl: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="w-full px-3 py-1.5 rounded-xl bg-[#1E222D] border border-white/10 text-[11px] font-mono text-white focus:outline-none"
                    />
                  </div>

                  {(currentItem.itemId === 'comp_flatlist_with_image' ||
                    currentItem.itemId === 'comp_flatlist_without_image' ||
                    currentItem.itemId === 'comp_flatlist_builder') &&
                    (() => {
                      const cols = d.flatListColumns || 2;
                      const rows = Math.max(1, d.flatListRows || 2);
                      const itemCount = Math.max(
                        1,
                        Math.min(24, d.flatListItemCount ?? cols * rows)
                      );
                      const cardMode =
                        d.flatListCardVariant ||
                        (currentItem.itemId === 'comp_flatlist_without_image'
                          ? 'without_image'
                          : 'with_image');
                      const customList: FlatListCustomItem[] =
                        d.flatListCustomItems && d.flatListCustomItems.length > 0
                          ? d.flatListCustomItems
                          : CUSTOM_ECOMMERCE_PRODUCTS.slice(0, itemCount).map((p, idx) => ({
                              id: `fl_item_${idx + 1}`,
                              title: p.title,
                              subtitle: p.category,
                              price: `$${p.price}`,
                              badge: `★ ${p.rating}`,
                              imageUrl: p.image,
                            }));

                      const ensureLength = (targetLen: number): FlatListCustomItem[] => {
                        return Array.from({ length: targetLen }, (_, idx) => {
                          if (customList[idx]) return customList[idx];
                          const prod =
                            CUSTOM_ECOMMERCE_PRODUCTS[
                              idx % CUSTOM_ECOMMERCE_PRODUCTS.length
                            ] || CUSTOM_ECOMMERCE_PRODUCTS[0];
                          return {
                            id: `fl_item_${Date.now()}_${idx}`,
                            title: `${prod.title} #${idx + 1}`,
                            subtitle: prod.category,
                            price: `$${prod.price}`,
                            badge: `ITEM #${idx + 1}`,
                            imageUrl: prod.image,
                          };
                        });
                      };

                      return (
                        <div className="p-3 rounded-2xl bg-[#12151C] border border-emerald-500/35 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-emerald-400">
                              &lt;FlatList /&gt; Configuration (Items · Cols · Rows · Cards)
                            </span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-black">
                              Total: {itemCount} Items
                            </span>
                          </div>

                          {/* 1. Render Card Mode: With Image vs Without Image vs Horizontal Split vs Row */}
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-300 mb-1">
                              FlatList Render Card Type (With Image / Without Image)
                            </label>
                            <div className="grid grid-cols-2 gap-1.5">
                              {(
                                [
                                  ['with_image', 'Card With Image'],
                                  ['without_image', 'Card Without Image'],
                                  ['horizontal_image', 'Horizontal Split (Img)'],
                                  ['compact_row', 'Compact List Row (No Img)'],
                                ] as const
                              ).map(([vId, vLabel]) => (
                                <button
                                  key={vId}
                                  type="button"
                                  onClick={() =>
                                    handleUpdateDroppedItemData(scrId, instId, {
                                      flatListCardVariant: vId,
                                    })
                                  }
                                  className={`py-1.5 px-2 rounded-xl text-[10px] font-black border cursor-pointer text-left truncate ${
                                    cardMode === vId
                                      ? 'bg-emerald-600 text-white border-emerald-400'
                                      : 'bg-[#1E222D] text-neutral-300 border-white/10 hover:bg-white/10'
                                  }`}
                                >
                                  {vLabel}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* 2. How Many Items Input Box + Columns + Rows */}
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="block text-[10px] font-bold text-neutral-300 mb-1">
                                Total Item Count
                              </label>
                              <input
                                type="number"
                                min={1}
                                max={24}
                                value={itemCount}
                                onChange={(e) => {
                                  const nextCount = Math.max(
                                    1,
                                    Math.min(24, Number(e.target.value) || 1)
                                  );
                                  const nextRows = Math.max(1, Math.ceil(nextCount / cols));
                                  handleUpdateDroppedItemData(scrId, instId, {
                                    flatListItemCount: nextCount,
                                    flatListRows: nextRows,
                                    flatListCustomItems: ensureLength(nextCount),
                                  });
                                }}
                                className="w-full px-2.5 py-1.5 rounded-xl bg-[#1E222D] border border-emerald-500/40 text-xs font-mono font-black text-emerald-300 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-neutral-300 mb-1">
                                Columns (1–4)
                              </label>
                              <select
                                value={cols}
                                onChange={(e) => {
                                  const nextCols = Number(e.target.value) as 1 | 2 | 3 | 4;
                                  const nextRows = Math.max(1, Math.ceil(itemCount / nextCols));
                                  handleUpdateDroppedItemData(scrId, instId, {
                                    flatListColumns: nextCols,
                                    flatListRows: nextRows,
                                  });
                                }}
                                className="w-full px-2.5 py-1.5 rounded-xl bg-[#1E222D] border border-white/10 text-xs font-mono font-black text-white focus:outline-none"
                              >
                                <option value={1}>1 Col</option>
                                <option value={2}>2 Cols</option>
                                <option value={3}>3 Cols</option>
                                <option value={4}>4 Cols</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-neutral-300 mb-1">
                                Rows Count
                              </label>
                              <input
                                type="number"
                                min={1}
                                max={12}
                                value={rows}
                                onChange={(e) => {
                                  const nextRows = Math.max(
                                    1,
                                    Math.min(12, Number(e.target.value) || 1)
                                  );
                                  const nextTotal = cols * nextRows;
                                  handleUpdateDroppedItemData(scrId, instId, {
                                    flatListRows: nextRows,
                                    flatListItemCount: nextTotal,
                                    flatListCustomItems: ensureLength(nextTotal),
                                  });
                                }}
                                className="w-full px-2.5 py-1.5 rounded-xl bg-[#1E222D] border border-white/10 text-xs font-mono font-black text-white focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Quick Column Preset Buttons */}
                          <div className="grid grid-cols-4 gap-1">
                            {([1, 2, 3, 4] as const).map((cNum) => (
                              <button
                                key={cNum}
                                type="button"
                                onClick={() => {
                                  const nextRows = Math.max(1, Math.ceil(itemCount / cNum));
                                  handleUpdateDroppedItemData(scrId, instId, {
                                    flatListColumns: cNum,
                                    flatListRows: nextRows,
                                  });
                                }}
                                className={`py-1 rounded-lg text-[10px] font-black border cursor-pointer ${
                                  cols === cNum
                                    ? 'bg-emerald-600 text-white border-emerald-400'
                                    : 'bg-[#1E222D] text-neutral-300 border-white/10 hover:bg-white/10'
                                }`}
                              >
                                {cNum} {cNum === 1 ? 'Column' : 'Columns'}
                              </button>
                            ))}
                          </div>

                          {/* Image Aspect Ratio when Card With Image is active */}
                          {(cardMode === 'with_image' || cardMode === 'horizontal_image') && (
                            <div>
                              <label className="block text-[10px] font-bold text-neutral-300 mb-1">
                                Card Image Ratio
                              </label>
                              <div className="grid grid-cols-4 gap-1">
                                {(['1:1', '4:5', '3:4', '16:9'] as const).map((ratio) => (
                                  <button
                                    key={ratio}
                                    type="button"
                                    onClick={() =>
                                      handleUpdateDroppedItemStyle(scrId, instId, {
                                        imageRatio: ratio,
                                      })
                                    }
                                    className={`py-1 rounded-lg text-[10px] font-black border cursor-pointer ${
                                      (st.imageRatio || '1:1') === ratio
                                        ? 'bg-indigo-600 text-white border-indigo-400'
                                        : 'bg-[#1E222D] text-neutral-300 border-white/10 hover:bg-white/10'
                                    }`}
                                  >
                                    {ratio}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Show/Hide Inline Quick-Add Input Box on the Simulator */}
                          <label className="flex items-center justify-between text-[11px] font-bold text-neutral-300 cursor-pointer pt-1">
                            <span>Show Inline &ldquo;+ Add Item&rdquo; Input on Simulator</span>
                            <input
                              type="checkbox"
                              checked={d.flatListShowSearchInput !== false}
                              onChange={(e) =>
                                handleUpdateDroppedItemData(scrId, instId, {
                                  flatListShowSearchInput: e.target.checked,
                                })
                              }
                              className="accent-emerald-500"
                            />
                          </label>

                          {/* Per-Item List Editor (Add, Remove, or Edit Each FlatList Card Item) */}
                          <div className="space-y-2 pt-2 border-t border-white/10">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-black uppercase text-neutral-300">
                                FlatList Items ({itemCount})
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const nextLen = Math.min(24, itemCount + 1);
                                  const updated = ensureLength(nextLen);
                                  handleUpdateDroppedItemData(scrId, instId, {
                                    flatListItemCount: nextLen,
                                    flatListRows: Math.max(1, Math.ceil(nextLen / cols)),
                                    flatListCustomItems: updated,
                                  });
                                }}
                                className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black cursor-pointer"
                              >
                                + Add New Item
                              </button>
                            </div>

                            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                              {ensureLength(itemCount).map((entry, idx) => (
                                <div
                                  key={`${entry.id}_${idx}`}
                                  className="p-2 rounded-xl bg-[#1E222D] border border-white/10 space-y-1.5"
                                >
                                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                                    <span>CARD ITEM #{idx + 1}</span>
                                    {itemCount > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const currentArr = ensureLength(itemCount);
                                          const filtered = currentArr.filter((_, i) => i !== idx);
                                          const nextCount = Math.max(1, filtered.length);
                                          handleUpdateDroppedItemData(scrId, instId, {
                                            flatListCustomItems: filtered,
                                            flatListItemCount: nextCount,
                                            flatListRows: Math.max(1, Math.ceil(nextCount / cols)),
                                          });
                                        }}
                                        className="text-rose-400 hover:text-rose-300 font-bold cursor-pointer"
                                      >
                                        Remove
                                      </button>
                                    )}
                                  </div>
                                  <div className="grid grid-cols-3 gap-1.5">
                                    <input
                                      type="text"
                                      value={entry.title}
                                      onChange={(e) => {
                                        const nextArr = ensureLength(itemCount);
                                        nextArr[idx] = { ...nextArr[idx], title: e.target.value };
                                        handleUpdateDroppedItemData(scrId, instId, {
                                          flatListCustomItems: nextArr,
                                        });
                                      }}
                                      placeholder="Item title"
                                      className="col-span-2 px-2 py-1 rounded-lg bg-[#12151C] border border-white/10 text-[11px] font-bold text-white"
                                    />
                                    <input
                                      type="text"
                                      value={entry.price}
                                      onChange={(e) => {
                                        const nextArr = ensureLength(itemCount);
                                        nextArr[idx] = { ...nextArr[idx], price: e.target.value };
                                        handleUpdateDroppedItemData(scrId, instId, {
                                          flatListCustomItems: nextArr,
                                        });
                                      }}
                                      placeholder="$99"
                                      className="px-2 py-1 rounded-lg bg-[#12151C] border border-white/10 text-[11px] font-mono font-bold text-emerald-300"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-1.5">
                                    <input
                                      type="text"
                                      value={entry.subtitle}
                                      onChange={(e) => {
                                        const nextArr = ensureLength(itemCount);
                                        nextArr[idx] = {
                                          ...nextArr[idx],
                                          subtitle: e.target.value,
                                        };
                                        handleUpdateDroppedItemData(scrId, instId, {
                                          flatListCustomItems: nextArr,
                                        });
                                      }}
                                      placeholder="Subtitle / category"
                                      className="px-2 py-1 rounded-lg bg-[#12151C] border border-white/10 text-[10px] text-neutral-300"
                                    />
                                    <input
                                      type="text"
                                      value={entry.imageUrl || ''}
                                      onChange={(e) => {
                                        const nextArr = ensureLength(itemCount);
                                        nextArr[idx] = {
                                          ...nextArr[idx],
                                          imageUrl: e.target.value,
                                        };
                                        handleUpdateDroppedItemData(scrId, instId, {
                                          flatListCustomItems: nextArr,
                                        });
                                      }}
                                      placeholder="Image URL (optional)"
                                      className="px-2 py-1 rounded-lg bg-[#12151C] border border-white/10 text-[10px] font-mono text-neutral-300"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                  {currentItem.itemId === 'comp_featured_grid' && (
                    <div className="p-3 rounded-2xl bg-[#12151C] border border-indigo-500/30 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-black uppercase tracking-wider text-indigo-400">
                          Featured Grid · 2nd Column Item &amp; Ratio
                        </span>
                      </div>

                      {/* Flexible Image Ratio Selector inside Data Info */}
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-300 mb-1">
                          Flexible Image Aspect Ratio
                        </label>
                        <div className="grid grid-cols-5 gap-1">
                          {(['1:1', '4:5', '3:4', '16:9', 'mixed'] as const).map((ratio) => (
                            <button
                              key={ratio}
                              type="button"
                              onClick={() =>
                                handleUpdateDroppedItemStyle(scrId, instId, {
                                  imageRatio: ratio,
                                })
                              }
                              className={`py-1 rounded-lg text-[10px] font-black border cursor-pointer uppercase ${
                                (st.imageRatio || '4:5') === ratio
                                  ? 'bg-indigo-600 text-white border-indigo-400'
                                  : 'bg-[#1E222D] text-neutral-300 border-white/10 hover:bg-white/10'
                              }`}
                            >
                              {ratio}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Inline Price Tag Placement */}
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-300 mb-1">
                          Inline Price Tag Style
                        </label>
                        <div className="grid grid-cols-3 gap-1">
                          {(
                            [
                              ['overlay-bottom-right', 'Bottom Tag'],
                              ['overlay-top-left', 'Top Tag'],
                              ['inline-footer', 'Inline Only'],
                            ] as const
                          ).map(([posId, posLabel]) => (
                            <button
                              key={posId}
                              type="button"
                              onClick={() =>
                                handleUpdateDroppedItemStyle(scrId, instId, {
                                  priceTagPosition: posId,
                                })
                              }
                              className={`py-1 rounded-lg text-[9px] font-black border cursor-pointer ${
                                (st.priceTagPosition || 'overlay-bottom-right') === posId
                                  ? 'bg-indigo-600 text-white border-indigo-400'
                                  : 'bg-[#1E222D] text-neutral-300 border-white/10 hover:bg-white/10'
                              }`}
                            >
                              {posLabel}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-neutral-300 mb-1">
                          Column 2 Title
                        </label>
                        <input
                          type="text"
                          value={d.secondTitle ?? ''}
                          onChange={(e) =>
                            handleUpdateDroppedItemData(scrId, instId, {
                              secondTitle: e.target.value,
                            })
                          }
                          placeholder="Second product title..."
                          className="w-full px-2.5 py-1.5 rounded-xl bg-[#1E222D] border border-white/10 text-xs font-bold text-white focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-300 mb-1">
                            Column 2 Inline Price
                          </label>
                          <input
                            type="text"
                            value={d.secondPrice ?? ''}
                            onChange={(e) =>
                              handleUpdateDroppedItemData(scrId, instId, {
                                secondPrice: e.target.value,
                              })
                            }
                            placeholder="$199.00"
                            className="w-full px-2.5 py-1.5 rounded-xl bg-[#1E222D] border border-white/10 text-xs font-bold text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-300 mb-1">
                            Column 2 Badge
                          </label>
                          <input
                            type="text"
                            value={d.secondBadgeText ?? ''}
                            onChange={(e) =>
                              handleUpdateDroppedItemData(scrId, instId, {
                                secondBadgeText: e.target.value,
                              })
                            }
                            placeholder="NEW"
                            className="w-full px-2.5 py-1.5 rounded-xl bg-[#1E222D] border border-white/10 text-xs font-bold text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-neutral-300 mb-1">
                          Column 2 Image URL
                        </label>
                        <input
                          type="text"
                          value={d.secondImageUrl ?? ''}
                          onChange={(e) =>
                            handleUpdateDroppedItemData(scrId, instId, {
                              secondImageUrl: e.target.value,
                            })
                          }
                          placeholder="https://..."
                          className="w-full px-2.5 py-1.5 rounded-xl bg-[#1E222D] border border-white/10 text-[11px] font-mono text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-indigo-400">
                        SELECTED {currentItem.category.toUpperCase()}
                      </div>
                      <div className="text-xs font-black">{currentItem.label}</div>
                    </div>
                  </div>
                  {currentItem.itemId === 'comp_featured_grid' && (
                    <div className="p-3 rounded-2xl bg-[#12151C] border border-indigo-500/30 space-y-2.5">
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider text-indigo-400 block">
                        Featured Grid · 2-Column Ratio &amp; Inline Price Tag
                      </span>
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-300 mb-1">
                          Flexible Image Ratio
                        </label>
                        <div className="grid grid-cols-5 gap-1">
                          {(['1:1', '4:5', '3:4', '16:9', 'mixed'] as const).map((ratio) => (
                            <button
                              key={ratio}
                              type="button"
                              onClick={() =>
                                handleUpdateDroppedItemStyle(scrId, instId, {
                                  imageRatio: ratio,
                                })
                              }
                              className={`py-1 rounded-lg text-[9px] font-black border cursor-pointer uppercase ${
                                (st.imageRatio || '4:5') === ratio
                                  ? 'bg-indigo-600 text-white border-indigo-400'
                                  : 'bg-[#1E222D] text-neutral-300 border-white/10 hover:bg-white/10'
                              }`}
                            >
                              {ratio}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-300 mb-1">
                          Inline Price Tag Mode
                        </label>
                        <div className="grid grid-cols-3 gap-1">
                          {(
                            [
                              ['overlay-bottom-right', 'Bottom Tag'],
                              ['overlay-top-left', 'Top Tag'],
                              ['inline-footer', 'Inline Only'],
                            ] as const
                          ).map(([posId, posLabel]) => (
                            <button
                              key={posId}
                              type="button"
                              onClick={() =>
                                handleUpdateDroppedItemStyle(scrId, instId, {
                                  priceTagPosition: posId,
                                })
                              }
                              className={`py-1 rounded-lg text-[9px] font-black border cursor-pointer ${
                                (st.priceTagPosition || 'overlay-bottom-right') === posId
                                  ? 'bg-indigo-600 text-white border-indigo-400'
                                  : 'bg-[#1E222D] text-neutral-300 border-white/10 hover:bg-white/10'
                              }`}
                            >
                              {posLabel}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {renderComprehensiveStyleControls(
                    st,
                    (patch) => handleUpdateDroppedItemStyle(scrId, instId, patch),
                    () =>
                      handleUpdateDroppedItemStyle(scrId, instId, {
                        width: '100%',
                        height: 'auto',
                        minHeight: 0,
                        margin: 0,
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                        padding: 10,
                        paddingTop: 10,
                        paddingRight: 10,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        borderRadius: 14,
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: undefined,
                        backgroundColor: undefined,
                        backgroundGradient: '',
                        textColor: undefined,
                        shadow: 'sm',
                        opacity: 100,
                        fontSizePx: undefined,
                        fontWeight: undefined,
                        letterSpacing: 0,
                      }),
                    true
                  )}
                </div>
              );
            })()
          )}
        </div>
      </div>
    );
  };

  // Render Reusable Draggable Screen Card with 6 Variant Buttons
  const renderDraggableScreenCard = (scr: CustomEcommerceScreenDefinition, orderIndex: number) => {
    const IconComp = scr.icon;
    const isCurrentActive = activeScreen === scr.id;
    const selectedExportVariant = selectedVariants[scr.id] || 'varient_1';
    const isBeingDragged = draggedScreenId === scr.id;
    const isDropTarget = dragOverScreenId === scr.id && draggedScreenId !== scr.id;

    return (
      <div
        key={scr.id}
        draggable
        onDragStart={(e) => {
          setDraggedScreenId(scr.id);
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', scr.id);
        }}
        onDragOver={(e) => {
          if (!draggedScreenId || draggedScreenId === scr.id) return;
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          const rect = e.currentTarget.getBoundingClientRect();
          const pos: 'before' | 'after' =
            e.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
          setDragOverScreenId(scr.id);
          setDragOverPosition(pos);
        }}
        onDrop={(e) => {
          e.preventDefault();
          const sourceId = (draggedScreenId ||
            e.dataTransfer.getData('text/plain')) as CustomEcommerceScreenId;
          if (sourceId && sourceId !== scr.id) {
            handleDropReorderScreen(sourceId, scr.id, dragOverPosition);
          }
          setDraggedScreenId(null);
          setDragOverScreenId(null);
        }}
        onDragEnd={() => {
          setDraggedScreenId(null);
          setDragOverScreenId(null);
        }}
        onClick={() => {
          setActiveScreen(scr.id);
          setInspectorTab('style');
          setSelectedInspectorTarget({
            type: 'screen',
            screenId: scr.id,
          });
        }}
        className={`relative rounded-2xl border p-4 bg-white dark:bg-neutral-900 transition-all cursor-grab active:cursor-grabbing ${
          isCurrentActive
            ? 'shadow-md ring-2 ring-black/5 dark:ring-white/5'
            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs'
        } ${isBeingDragged ? 'opacity-45 scale-[0.98]' : ''} ${
          isDropTarget
            ? dragOverPosition === 'before'
              ? 'border-t-4 border-t-emerald-500'
              : 'border-b-4 border-b-emerald-500'
            : ''
        }`}
        style={
          isCurrentActive
            ? {
                borderColor: activeColorPreset.swatch,
              }
            : undefined
        }
      >
        {/* Card Header with Drag Handle + Screen Title + Preview Button */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-start gap-2.5 min-w-0">
            <div
              className="mt-0.5 p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-grab active:cursor-grabbing flex-shrink-0"
              title="Drag to reorder screen in mobile app flow"
            >
              <GripVertical size={14} />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-mono font-extrabold text-neutral-500">
                  #{orderIndex + 1}
                </span>
                <IconComp size={14} style={{ color: activeColorPreset.swatch }} />
                <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white truncate">
                  {scr.label}
                </h4>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={{
                    backgroundColor: `${activeColorPreset.swatch}20`,
                    color: activeColorPreset.swatch,
                  }}
                >
                  {selectedExportVariant.replace('varient_', 'Simulator V')}
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 block truncate mt-0.5">
                {scr.filePath}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              type="button"
              onClick={() => handleMoveScreenStep(scr.id, 'up')}
              title="Move Screen Up"
              className="p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 cursor-pointer"
            >
              <ArrowUp size={12} />
            </button>
            <button
              type="button"
              onClick={() => handleMoveScreenStep(scr.id, 'down')}
              title="Move Screen Down"
              className="p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 cursor-pointer"
            >
              <ArrowDown size={12} />
            </button>
            <button
              type="button"
              onClick={() => setActiveScreen(scr.id)}
              className="px-2.5 py-1 rounded-lg text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center gap-1 transition cursor-pointer"
            >
              <Eye size={12} />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => handleRemoveScreen(scr.id)}
              title={`Remove "${scr.label}" screen`}
              className="p-1.5 rounded-lg border border-rose-500/25 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition cursor-pointer"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        {/* Description & Key Functional Badges */}
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2.5 line-clamp-2">
          {scr.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {scr.keyElements.map((el) => (
            <span
              key={el}
              className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800/90 text-[10px] font-semibold text-neutral-600 dark:text-neutral-300"
            >
              • {el}
            </span>
          ))}
        </div>

        {/* 6 Premium Variant Selector Buttons */}
        <div className="grid grid-cols-2 gap-1.5 pt-2.5 border-t border-neutral-100 dark:border-neutral-800">
          {ALL_CUSTOM_ECOMMERCE_VARIANT_IDS.map((vKey) => {
            const isSelectedOnThisScreen = selectedExportVariant === vKey;

            return (
              <button
                key={vKey}
                type="button"
                onClick={() => {
                  handleVariantChange(scr.id, vKey);
                  setActiveScreen(scr.id);
                }}
                className={`px-2.5 py-2 rounded-lg text-left text-xs font-semibold flex items-center justify-between gap-1 transition cursor-pointer ${
                  isSelectedOnThisScreen
                    ? 'shadow-xs'
                    : 'bg-neutral-50/70 dark:bg-neutral-950/40 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                style={
                  isSelectedOnThisScreen
                    ? {
                        backgroundColor: activeColorPreset.swatch,
                        color: activeColorPreset.primaryText,
                      }
                    : undefined
                }
              >
                <span className="truncate">{scr.variants[vKey]}</span>
                {isSelectedOnThisScreen && <Check size={12} className="flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Middle Studio Workspace Renderer
  const renderMiddleWorkspace = () => {
    if (activeStudioTab === 'screens') {
      return (
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Drag-and-Drop Screen Builder Banner */}
          <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
                style={{ backgroundColor: activeColorPreset.swatch }}
              >
                <Move size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-black text-neutral-900 dark:text-white">
                    Custom E-Commerce Drag &amp; Drop Screen Architect
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold">
                    30 Screens · 180 Variants
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Select V1–V6 on any screen card, or click the Settings button to open the 90% width Multi-Simulator Row &amp; Column Matrix.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {dragFeedbackToast && (
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>{dragFeedbackToast}</span>
                </span>
              )}
              <button
                type="button"
                onClick={handleOpenAddScreenModal}
                className="px-3.5 py-1.5 rounded-xl text-xs font-black text-white shadow-sm hover:opacity-95 flex items-center gap-1.5 transition cursor-pointer"
                style={{
                  backgroundColor: activeColorPreset.swatch,
                  color: activeColorPreset.primaryText,
                }}
              >
                <Plus size={14} />
                <span>+ Add Screen</span>
              </button>
              <button
                type="button"
                onClick={handleResetScreenOrder}
                className="px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Reset Order</span>
              </button>
            </div>
          </div>

          {/* Component Library Quick-Add & Drag Strip (Includes 'Featured Grid' 2-Column Component) */}
          <div className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Layers size={15} style={{ color: activeColorPreset.swatch }} />
                <span className="text-xs font-black text-neutral-900 dark:text-white">
                  Component Library — Drag &amp; Drop or Click to Add to &ldquo;{currentScreenMeta.label}&rdquo;
                </span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold">
                  {MODAL_COMPONENT_CATALOG.length} Components
                </span>
              </div>
              <span className="text-[11px] text-neutral-400">
                Drag into any simulator screen gap or click + to insert
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 max-h-64 overflow-y-auto pr-1">
              {MODAL_COMPONENT_CATALOG.map((comp) => {
                const CompIcon = comp.icon;
                return (
                  <div
                    key={comp.id}
                    draggable
                    onDragStart={(e) => {
                      setDraggedLibraryItemId(comp.id);
                      e.dataTransfer.effectAllowed = 'copyMove';
                      e.dataTransfer.setData('application/x-library-item', comp.id);
                      e.dataTransfer.setData('text/plain', `LIB:${comp.id}`);
                    }}
                    onDragEnd={() => {
                      setDraggedLibraryItemId(null);
                      setDropTargetScreenId(null);
                    }}
                    onClick={() => handleAddLibraryItemToScreen(activeScreen, comp.id)}
                    className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/60 hover:border-indigo-500/50 transition flex flex-col justify-between gap-1.5 cursor-grab active:cursor-grabbing group"
                    title={`Drag onto mobile simulator or click to add "${comp.label}"`}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span
                        className="px-1.5 py-0.5 rounded text-[8px] font-mono font-black text-white"
                        style={{ backgroundColor: activeColorPreset.swatch }}
                      >
                        {comp.badge}
                      </span>
                      <span className="w-5 h-5 rounded-md bg-neutral-200/80 dark:bg-neutral-800 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 flex items-center justify-center text-xs font-black transition">
                        +
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-neutral-900 dark:text-white flex items-center gap-1.5 truncate">
                        <CompIcon size={12} className="flex-shrink-0" style={{ color: activeColorPreset.swatch }} />
                        <span className="truncate">{comp.label}</span>
                      </div>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                        {comp.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dedicated <FlatList /> Section inside Component Library with all required option fields */}
            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
              {renderComponentLibraryFlatListConfigurator(false)}
            </div>
          </div>

          {/* Top Switcher (Categorized Grid vs Drag-and-Drop Sequence vs Visual Node Linker) + Settings Modal Trigger Button */}
          <div className="flex flex-col gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800/90 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => setScreensViewMode('grid')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    screensViewMode === 'grid'
                      ? 'shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                  style={
                    screensViewMode === 'grid'
                      ? {
                          backgroundColor: activeColorPreset.swatch,
                          color: activeColorPreset.primaryText,
                        }
                      : undefined
                  }
                >
                  <LayoutGrid size={13} />
                  <span>All 30 Screens ({orderedScreens.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setScreensViewMode('drag_flow')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    screensViewMode === 'drag_flow'
                      ? 'shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                  style={
                    screensViewMode === 'drag_flow'
                      ? {
                          backgroundColor: activeColorPreset.swatch,
                          color: activeColorPreset.primaryText,
                        }
                      : undefined
                  }
                >
                  <Move size={13} />
                  <span>Drag &amp; Drop App Sequence</span>
                </button>

                <button
                  type="button"
                  onClick={() => setScreensViewMode('hierarchy')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    screensViewMode === 'hierarchy'
                      ? 'shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                  style={
                    screensViewMode === 'hierarchy'
                      ? {
                          backgroundColor: activeColorPreset.swatch,
                          color: activeColorPreset.primaryText,
                        }
                      : undefined
                  }
                >
                  <FolderTree size={13} />
                  <span>Visual Flow Builder</span>
                </button>
              </div>

              {/* SETTINGS BUTTON IN THE EXACT SPOT MARKED BY USER'S RED BOX — OPENS 90% WIDTH ROW & COLUMN MODAL */}
              <button
                type="button"
                onClick={() => setIsMultiSimulatorModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-white shadow-sm hover:opacity-95 transition cursor-pointer"
                style={{
                  backgroundColor: activeColorPreset.swatch,
                  color: activeColorPreset.primaryText,
                }}
                title="Open 90% Width Modal with All Selected Variant Screens (Row & Column)"
              >
                <Settings size={14} />
                <span>All Selected Variants ({orderedScreens.length})</span>
              </button>
            </div>

            <div className="relative w-full">
              <Search size={14} className="absolute left-3.5 top-2.5 text-neutral-400" />
              <input
                type="text"
                value={screenSearch}
                onChange={(e) => setScreenSearch(e.target.value)}
                placeholder="Search 30 screens or 180 variants..."
                className="w-full pl-9 pr-8 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
              {screenSearch && (
                <button
                  type="button"
                  onClick={() => setScreenSearch('')}
                  className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {screensViewMode === 'hierarchy' ? (
            <VisualNavigationLinkBuilder
              projectName={appName}
              screens={linkableScreens}
              currentScreenId={activeScreen}
              primaryColor={activeColorPreset.swatch}
              isSingleVariantMode={false}
              connections={navConnections}
              onConnectionsChange={setNavConnections}
              onSelectScreenVariant={(screenId, variantId) => {
                setActiveScreen(screenId as CustomEcommerceScreenId);
                if (
                  ALL_CUSTOM_ECOMMERCE_VARIANT_IDS.includes(
                    variantId as CustomEcommerceVariantId
                  )
                ) {
                  handleVariantChange(
                    screenId as CustomEcommerceScreenId,
                    variantId as CustomEcommerceVariantId
                  );
                }
              }}
            />
          ) : screensViewMode === 'drag_flow' ? (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold flex items-center justify-between">
                <span>
                  Drag and drop any of the 30 screens below to customize the exact screen order of your E-Commerce mobile app.
                </span>
                <span className="font-mono text-[11px] font-bold">30 Steps Active</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {orderedScreens.map((scr, idx) => renderDraggableScreenCard(scr, idx))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Core User Journey Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {FLOW_GROUPS.map((group) => {
                  const active = selectedFlowFilter === group;
                  return (
                    <button
                      key={group}
                      type="button"
                      onClick={() => setSelectedFlowFilter(group)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                        active
                          ? 'shadow-xs'
                          : 'bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                      style={
                        active
                          ? {
                              backgroundColor: activeColorPreset.swatch,
                              color: activeColorPreset.primaryText,
                            }
                          : undefined
                      }
                    >
                      {group === 'ALL'
                        ? `All E-Commerce Screens (${orderedScreens.length})`
                        : group}
                    </button>
                  );
                })}
              </div>

              {/* Batch Set All 30 Screens Variant Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={15} className="text-neutral-500" />
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    Batch Switch All 30 Screens (6 Premium Layouts):
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {(
                    [
                      ['varient_1', 'All V1'],
                      ['varient_2', 'All V2 (Bento)'],
                      ['varient_3', 'All V3 (Brutalist)'],
                      ['varient_4', 'All V4 (Luxury)'],
                      ['varient_5', 'All V5 (Atelier)'],
                      ['varient_6', 'All V6 (Compact)'],
                    ] as const
                  ).map(([vid, label]) => (
                    <button
                      key={vid}
                      type="button"
                      onClick={() => applyVariantToAllScreens(vid)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categorized Draggable Screen Cards Grid */}
              <div className="space-y-6">
                {groupedDirectories.map((group) => (
                  <div key={group.group} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        {group.group} ({group.items.length} Screens · {group.items.length * 6} Variants)
                      </h3>
                      <span className="text-[11px] text-neutral-400">
                        Drag cards to reorder · Click V1–V6 to update variant
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {group.items.map((scr) => {
                        const globalIdx = orderedScreens.findIndex((o) => o.id === scr.id);
                        return renderDraggableScreenCard(scr, globalIdx);
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (activeStudioTab === 'theme') {
      return (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-4">
            <h2 className="text-base font-black flex items-center gap-2">
              <Palette size={18} style={{ color: activeColorPreset.swatch }} />
              <span>Custom E-Commerce Brand Palettes</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CUSTOM_ECOMMERCE_COLOR_PRESETS.map((c) => {
                const active = c.id === colorPresetId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setColorPresetId(c.id)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 cursor-pointer ${
                      active
                        ? 'border-2 bg-neutral-50 dark:bg-neutral-800'
                        : 'border-neutral-200 dark:border-neutral-800'
                    }`}
                    style={active ? { borderColor: c.swatch } : undefined}
                  >
                    <span
                      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white"
                      style={{ backgroundColor: c.swatch }}
                    >
                      {active && <Check size={14} />}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-extrabold truncate">{c.name}</div>
                      <div className="text-[10px] font-mono opacity-60">{c.swatch}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    if (activeStudioTab === 'branding') {
      return (
        <div className="max-w-xl mx-auto p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-4">
          <h2 className="text-base font-black flex items-center gap-2">
            <AppWindow size={18} style={{ color: activeColorPreset.swatch }} />
            <span>Custom E-Commerce Identity</span>
          </h2>
          <div>
            <label className="block text-xs font-bold mb-1">Suite Title</label>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Package ID</label>
            <input
              type="text"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-xs font-mono"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-xl mx-auto p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-4">
        <h2 className="text-base font-black">Export 30 Custom E-Commerce Screens (.ZIP)</h2>
        <p className="text-xs text-neutral-500">
          Downloads all 30 screens in your custom drag-and-drop sequence along with your selected variants.
        </p>
        <button
          type="button"
          onClick={handleExportCustomEcommerceZip}
          disabled={isZipping}
          className="w-full py-3 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-2 cursor-pointer"
          style={{ backgroundColor: activeColorPreset.swatch }}
        >
          <Download size={15} />
          <span>{isZipping ? 'Building ZIP...' : 'Download 30 Screens Bundle (.ZIP)'}</span>
        </button>
      </div>
    );
  };

  const totalCartItemsCount = Object.values(cartQuantities).reduce((a, b) => a + b, 0);

  return (
    <>
      <StudioDashboardShell
        activeProjectId="custom_ecommerce"
        projectName={appName}
        activeScreenLabel={currentScreenMeta.label}
        activeVariantLabel={activeScreenVariant}
        activeStudioTab={activeStudioTab}
        onSelectStudioTab={setActiveStudioTab}
        onSwitchProject={onSwitchProject}
        isDark={isDark}
        onToggleTheme={() => setIsDark((d) => !d)}
        primaryColor={activeColorPreset.swatch}
        primaryTextColor={activeColorPreset.primaryText}
        onExportZip={handleExportCustomEcommerceZip}
        isZipping={isZipping}
        variantOptions={ALL_CUSTOM_ECOMMERCE_VARIANT_IDS.map((vid) => ({
          id: vid,
          label: currentScreenMeta.variants[vid],
        }))}
        currentVariantId={activeScreenVariant}
        onChangeVariant={(vid) =>
          handleVariantChange(activeScreen, vid as CustomEcommerceVariantId)
        }
        onReloadSimulator={() => setSimulatorKey((k) => k + 1)}
        colorSwatches={CUSTOM_ECOMMERCE_COLOR_PRESETS.map((c) => ({
          id: c.id,
          name: c.name,
          swatch: c.swatch,
        }))}
        activeColorId={colorPresetId}
        onSelectColorSwatch={(id) => setColorPresetId(id)}
        activeFontName={activeFontPreset.name}
        middleContent={renderMiddleWorkspace()}
        mobileContent={
          <div
            key={simulatorKey}
            className={`mobileContent flex-1 h-full w-full flex flex-col justify-between overflow-hidden ${
              isDark ? 'bg-[#09090B] text-white' : 'bg-[#F8FAFC] text-neutral-900'
            }`}
            style={{ fontFamily: activeFontPreset.fontFamily }}
          >
            {/* Main Scrollable Screen Body */}
            <div
              ref={mainSimulatorScrollRef}
              onScroll={(e) => {
                mainSimulatorSavedScrollTopRef.current = e.currentTarget.scrollTop;
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setSelectedInspectorTarget({
                    type: 'screen',
                    screenId: activeScreen,
                  });
                }
              }}
              style={{
                background: screenStyleOverrides[activeScreen]?.backgroundGradient
                  ? screenStyleOverrides[activeScreen]?.backgroundGradient
                  : screenStyleOverrides[activeScreen]?.backgroundColor || undefined,
              }}
              className="flex-1 overflow-y-auto no-scrollbar"
            >
              {renderSimulatorScreenById(activeScreen, activeScreenVariant)}
            </div>

            {/* Optional Bottom Navigation Bar for Root Screens */}
            {currentScreenMeta.hasBottomNav && (
              <div className="h-14 px-3 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 grid grid-cols-5 items-center flex-shrink-0">
                {[
                  { id: 'HomeDashboard' as const, label: 'Home', icon: Home },
                  { id: 'CategoryNavigation' as const, label: 'Categories', icon: Grid },
                  { id: 'WishlistSaved' as const, label: 'Wishlist', icon: Heart },
                  { id: 'ShoppingCart' as const, label: 'Cart', icon: ShoppingCart, badge: totalCartItemsCount },
                  { id: 'UserProfileWallet' as const, label: 'Profile', icon: User },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = activeScreen === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveScreen(tab.id)}
                      className="flex flex-col items-center justify-center gap-0.5 relative cursor-pointer"
                      style={{ color: active ? activeColorPreset.swatch : '#64748B' }}
                    >
                      <Icon size={16} />
                      <span className="text-[9px] font-extrabold">{tab.label}</span>
                      {tab.badge ? (
                        <span
                          className="absolute top-0 right-3 w-4 h-4 rounded-full text-[9px] font-black text-white flex items-center justify-center"
                          style={{ backgroundColor: activeColorPreset.swatch }}
                        >
                          {tab.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        }
        simulatorRightInspectorContent={
          !isMultiSimulatorModalOpen ? renderInspectorPanel() : undefined
        }
      />

      {/* 90% Width Big Modal with All Selected Variant Screens in Rows & Columns */}
      {renderMultiSimulatorBigModal()}

      {/* Add Screen Layout / Activity Picker Modal — 90% Viewport Size (Blank Screen + 30 Different Screen Layouts) */}
      {isAddScreenTemplateModalOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 select-none"
          onClick={() => setIsAddScreenTemplateModalOpen(false)}
        >
          <div
            className="w-[90vw] max-w-[90vw] h-[90vh] max-h-[90vh] rounded-3xl border border-white/15 bg-[#1E1F22] text-white shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 bg-[#2B2D30] flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: '#00A651' }}
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
                      {addScreenModalColumns} Items / Row
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Select Blank Screen or any of the 30 pre-architected screen layouts below, then click Create Screen (or double-click any card).
                  </p>
                </div>
              </div>

              {/* Right Controls in Add Screen Modal Header: Search + Column Number Selector (Default 3 Items per 1 Row) + Close */}
              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Search Layouts Input */}
                <div className="relative w-44 sm:w-52">
                  <Search
                    size={13}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    value={addScreenModalSearch}
                    onChange={(e) => setAddScreenModalSearch(e.target.value)}
                    placeholder="Search screen layouts..."
                    className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-[#1E1F22] border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#3574F0]"
                  />
                  {addScreenModalSearch && (
                    <button
                      type="button"
                      onClick={() => setAddScreenModalSearch('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                {/* Column Number Selector for Visibility (Default: 3 Items per 1 Row) */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-[#1E1F22] border border-white/15">
                  <span className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
                    Columns:
                  </span>
                  {([2, 3, 4, 5, 6] as const).map((cols) => {
                    const isActiveCol = addScreenModalColumns === cols;
                    return (
                      <button
                        key={cols}
                        type="button"
                        onClick={() => setAddScreenModalColumns(cols)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition cursor-pointer ${
                          isActiveCol
                            ? 'bg-[#3574F0] text-white shadow-xs'
                            : 'text-neutral-400 hover:text-white hover:bg-white/5'
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
                  onClick={() => setIsAddScreenTemplateModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-rose-500 text-neutral-300 hover:text-white transition cursor-pointer"
                  title="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Grid of 31 Screen Layout Cards (1 Blank Screen + 30 Different Screen Layouts) — Default 3 Items per 1 Row */}
            <div className="p-6 overflow-y-auto flex-1 min-h-0 bg-[#1E1F22]">
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${addScreenModalColumns}, minmax(0, 1fr))`,
                }}
              >
                {ADD_SCREEN_LAYOUT_TEMPLATES.filter(
                  (tpl) =>
                    !addScreenModalSearch.trim() ||
                    tpl.title.toLowerCase().includes(addScreenModalSearch.toLowerCase()) ||
                    tpl.subtitle.toLowerCase().includes(addScreenModalSearch.toLowerCase())
                ).map((tpl) => {
                  const isSelected = selectedAddScreenTemplateId === tpl.id;

                  const renderPhoneThumbnail = () => {
                    switch (tpl.id) {
                      case 'blank_screen':
                        return (
                          <div className="w-24 h-36 rounded-2xl flex items-center justify-center">
                            <div className="w-16 h-16 rounded-xl border-2 border-dashed border-neutral-500/80 flex items-center justify-center text-neutral-400">
                              <Plus size={20} />
                            </div>
                          </div>
                        );

                      case 'empty_activity':
                        return (
                          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col border border-neutral-200">
                            <div className="h-5 bg-[#00A651] px-2 flex items-center justify-between text-white text-[9px] font-black">
                              <span>←</span>
                              <span>⋮</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-2 gap-1.5">
                              {/* 3D Isometric Cube Icon */}
                              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00A651] via-[#1E88E5] to-[#1565C0] flex items-center justify-center shadow-sm">
                                <div className="w-5 h-5 rounded bg-white/95 shadow-xs" />
                              </div>
                            </div>
                          </div>
                        );

                      case 'featured_store_activity':
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

                      case 'navigation_ui_activity':
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

                      case 'basic_views_activity':
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

                      case 'empty_views_activity':
                        return (
                          <div className="w-24 h-36 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col border border-neutral-200">
                            <div className="h-5 bg-[#00A651] px-2 flex items-center justify-between text-white text-[9px] font-black">
                              <span>←</span>
                              <span>⋮</span>
                            </div>
                            <div className="flex-1 bg-white" />
                          </div>
                        );

                      case 'responsive_views_activity':
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

                      case 'flatlist_catalog_activity':
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

                      case 'checkout_form_activity':
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

                      case 'bottom_navigation_activity':
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

                      case 'navigation_drawer_activity':
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

                      case 'tabbed_views_activity':
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

                      case 'fullscreen_hero_activity':
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

                      case 'scrolling_collapsing_activity':
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

                      case 'master_detail_flow_activity':
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

                      case 'login_auth_activity':
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

                      case 'settings_preferences_activity':
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
                                      r % 2 === 1 ? 'bg-[#00A651]' : 'bg-neutral-300'
                                    }`}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        );

                      case 'google_maps_store_activity':
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

                      case 'product_showcase_pdp_activity':
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

                      case 'video_story_reel_activity':
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

                      case 'bento_analytics_dashboard_activity':
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

                      case 'onboarding_carousel_activity':
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

                      case 'shopping_cart_bag_activity':
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

                      case 'wishlist_saved_grid_activity':
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

                      case 'flash_sale_countdown_activity':
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

                      case 'order_tracking_timeline_activity':
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

                      case 'wallet_loyalty_card_activity':
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

                      case 'chat_concierge_support_activity':
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

                      case 'review_ratings_gallery_activity':
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

                      case 'category_mega_menu_activity':
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

                      case 'qr_scanner_ar_tryon_activity':
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
                      key={tpl.id}
                      onClick={() => setSelectedAddScreenTemplateId(tpl.id)}
                      onDoubleClick={() => handleCreateScreenFromTemplate(tpl.id)}
                      className={`group rounded-xl border transition-all flex flex-col justify-between cursor-pointer overflow-hidden ${
                        isSelected
                          ? 'border-white/40 bg-[#2B2D30] ring-2 ring-[#3574F0]'
                          : 'border-white/5 bg-[#1E1F22] hover:bg-[#25272B] hover:border-white/15'
                      }`}
                    >
                      <div className="h-44 flex items-center justify-center p-3">
                        {renderPhoneThumbnail()}
                      </div>

                      <div
                        className={`px-2.5 py-2 text-center transition ${
                          isSelected ? 'bg-[#393B40]' : 'bg-transparent'
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

            {/* Modal Footer: Screen Name Input + Selected Template Info + Cancel / Create Screen Button */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#2B2D30] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-wrap flex-1 min-w-[240px]">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-neutral-300 whitespace-nowrap">
                    Screen Name:
                  </label>
                  <input
                    type="text"
                    value={customNewScreenNameInput}
                    onChange={(e) => setCustomNewScreenNameInput(e.target.value)}
                    placeholder={
                      ADD_SCREEN_LAYOUT_TEMPLATES.find(
                        (t) => t.id === selectedAddScreenTemplateId
                      )?.title || 'Custom Screen Name...'
                    }
                    className="px-3 py-1.5 rounded-lg bg-[#1E1F22] border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#3574F0] w-56"
                  />
                </div>
                <span className="text-[11px] text-neutral-400">
                  Selected:{' '}
                  <strong className="text-white">
                    {
                      ADD_SCREEN_LAYOUT_TEMPLATES.find(
                        (t) => t.id === selectedAddScreenTemplateId
                      )?.title
                    }
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddScreenTemplateModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-white/15 bg-transparent hover:bg-white/10 text-xs font-bold text-neutral-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleCreateScreenFromTemplate(selectedAddScreenTemplateId)}
                  className="px-5 py-2 rounded-lg bg-[#3574F0] hover:bg-[#2E65D8] text-xs font-black text-white shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Create Screen</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomEcommerceApp;
