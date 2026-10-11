import React, { useState, useRef } from 'react';
import {
  Plus,
  Layers,
  Palette,
  Type,
  Sparkles,
  Play,
  Undo2,
  Redo2,
  Maximize2,
  Home,
  Search,
  Heart,
  Settings,
  Star,
  Share2,
  Edit3,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  ArrowLeft,
  MoreVertical,
  Image as ImageIcon,
  MapPin,
  Camera,
  Check,
  X,
  Copy,
  Trash2,
  Lock,
  Unlock,
  ExternalLink,
  Smartphone,
  Monitor,
  Sliders,
  Globe,
  Wand2,
  Download,
  Boxes,
  Folder,
  Send,
  Calendar,
  Clock,
  RefreshCw,
  Menu,
  Info,
  MousePointer2,
  Hand,
  Tag,
  Compass,
  Square,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  BarChart3,
  Loader2,
  Smile,
  Zap,
  Ruler,
  Grid,
  Link2,
  Upload,
  AlignLeft,
} from 'lucide-react';
import { CustomProjectDefinition, loadCustomProjects } from '../utils/customProjectsStore';

export interface CustomizeAppM3ECanvasProps {
  onSwitchProject?: (projectId: string) => void;
}

export type M3EPartCategory =
  | 'actions'
  | 'navigation'
  | 'containment'
  | 'inputs'
  | 'content'
  | 'progress';

export type M3EPartType =
  // Actions
  | 'button'
  | 'icon_button'
  | 'fab'
  | 'split_button'
  | 'chip'
  // Navigation
  | 'top_app_bar'
  | 'navigation_bar'
  | 'navigation_rail'
  | 'tabs'
  | 'toolbar'
  | 'search_bar'
  // Containment
  | 'card'
  | 'carousel'
  | 'list_item'
  | 'box'
  | 'bottom_sheet'
  | 'dialog'
  | 'snackbar'
  // Inputs
  | 'text_field'
  | 'dropdown'
  | 'switch'
  | 'checkbox'
  | 'radio_button'
  | 'slider'
  | 'date_picker'
  | 'time_picker'
  // Content
  | 'text'
  | 'image'
  | 'map'
  | 'camera'
  | 'chart'
  | 'icon'
  | 'divider'
  // Progress
  | 'loading'
  | 'progress';

export interface M3ENavItem {
  id: string;
  label: string;
  icon: 'home' | 'search' | 'saved' | 'settings' | 'star';
  targetScreenId?: string;
}

export interface M3ECarouselItem {
  id: string;
  label: string;
  imageUrl?: string;
}

export type M3EBoxSurfaceTone =
  | 'surface_low'
  | 'surface_mid'
  | 'surface_high'
  | 'surface_highest'
  | 'outline_dim'
  | 'primary_tint'
  | 'secondary_tint'
  | 'tertiary_blue'
  | 'primary_solid'
  | 'inverse_dark';

export interface M3ECanvasPart {
  id: string;
  type: M3EPartType;
  label: string;
  subtitle?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  widthMode: 'auto' | 'hug' | 'standard' | 'full';
  sizePreset: 'XS' | 'S' | 'M' | 'L' | 'XL';
  styleVariant: 'filled' | 'tonal' | 'elevated' | 'outlined' | 'text';
  boxTone?: M3EBoxSurfaceTone;
  customRadius?: number;
  showLeadingIcon?: boolean;
  iconName?: 'plus' | 'star' | 'share' | 'heart' | 'send' | 'edit' | 'search' | 'check';
  cardLayout?: 'stacked' | 'horizontal' | 'overlay' | 'minimal';
  carouselLayout?: 'hero' | 'center' | 'multi' | 'uncontained';
  carouselCount?: number;
  activeCarouselIndex?: number;
  carouselItems?: M3ECarouselItem[];
  imageUrl?: string;
  sliderValue?: number;
  checked?: boolean;
  locked?: boolean;
  fabExtended?: boolean;
  activeSubIndex?: number;
  dropdownOpen?: boolean;
  navItems?: M3ENavItem[];
  tabItems?: string[];
  listRows?: Array<{ id: string; title: string; subtitle: string; icon: string }>;
  // Trigger / Prototype Action
  triggerAction?: 'none' | 'navigate' | 'back' | 'open_link';
  triggerTargetScreenId?: string;
  triggerDescription?: string;
  triggerUrl?: string;
}

export interface M3EScreen {
  id: string;
  name: string;
  deviceMode?: 'phone' | 'desktop';
  scrollMultiplier: '1x' | '1.5x' | '2x' | '3x';
  scrollHeightPx: number;
  backgroundStyle: 'surface' | 'tinted' | 'pure';
  parts: M3ECanvasPart[];
}

export type M3EPaletteId = 'green' | 'purple' | 'blue' | 'coral' | 'amber' | 'teal' | 'mono';

export interface M3EPaletteTheme {
  id: M3EPaletteId;
  name: string;
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondaryContainer: string;
  surface: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  onSurface: string;
  onSurfaceVariant: string;
  outline: string;
  darkPrimary: string;
  darkPrimaryContainer: string;
  darkSurface: string;
  darkSurfaceContainer: string;
  darkOnSurface: string;
}

const M3E_PALETTES: Record<M3EPaletteId, M3EPaletteTheme> = {
  green: {
    id: 'green',
    name: 'Green',
    primary: '#23643B',
    onPrimary: '#FFFFFF',
    primaryContainer: '#B4F6C6',
    onPrimaryContainer: '#00210C',
    secondaryContainer: '#D6E8D6',
    surface: '#F4F6F1',
    surfaceContainer: '#E9ECE6',
    surfaceContainerHigh: '#E2E6DF',
    onSurface: '#181D18',
    onSurfaceVariant: '#414941',
    outline: '#C1C9BF',
    darkPrimary: '#8ED89C',
    darkPrimaryContainer: '#005323',
    darkSurface: '#101510',
    darkSurfaceContainer: '#1C211C',
    darkOnSurface: '#E0E4DC',
  },
  purple: {
    id: 'purple',
    name: 'Purple',
    primary: '#58359E',
    onPrimary: '#FFFFFF',
    primaryContainer: '#EADDFF',
    onPrimaryContainer: '#21005D',
    secondaryContainer: '#E8DEF8',
    surface: '#FEF7FF',
    surfaceContainer: '#F3EDF7',
    surfaceContainerHigh: '#ECE6F0',
    onSurface: '#1D1B20',
    onSurfaceVariant: '#49454F',
    outline: '#CAC4D0',
    darkPrimary: '#D0BCFF',
    darkPrimaryContainer: '#4F378B',
    darkSurface: '#141218',
    darkSurfaceContainer: '#211F26',
    darkOnSurface: '#E6E0E9',
  },
  blue: {
    id: 'blue',
    name: 'Blue',
    primary: '#1B5E91',
    onPrimary: '#FFFFFF',
    primaryContainer: '#D4E3FF',
    onPrimaryContainer: '#001C38',
    secondaryContainer: '#D7E3F7',
    surface: '#F8F9FF',
    surfaceContainer: '#ECEEF4',
    surfaceContainerHigh: '#E6E8EE',
    onSurface: '#191C20',
    onSurfaceVariant: '#43474E',
    outline: '#C3C7CF',
    darkPrimary: '#A5C8FF',
    darkPrimaryContainer: '#004777',
    darkSurface: '#111318',
    darkSurfaceContainer: '#1D2024',
    darkOnSurface: '#E2E2E9',
  },
  coral: {
    id: 'coral',
    name: 'Coral',
    primary: '#8F4938',
    onPrimary: '#FFFFFF',
    primaryContainer: '#FFDBD2',
    onPrimaryContainer: '#3A0A01',
    secondaryContainer: '#F5DDD8',
    surface: '#FFF8F6',
    surfaceContainer: '#FCEAE6',
    surfaceContainerHigh: '#F6E4E0',
    onSurface: '#231917',
    onSurfaceVariant: '#534340',
    outline: '#D8C2BC',
    darkPrimary: '#FFB4A2',
    darkPrimaryContainer: '#723323',
    darkSurface: '#1A110F',
    darkSurfaceContainer: '#271D1B',
    darkOnSurface: '#F1DFDB',
  },
  amber: {
    id: 'amber',
    name: 'Amber',
    primary: '#785900',
    onPrimary: '#FFFFFF',
    primaryContainer: '#FFDF9E',
    onPrimaryContainer: '#261A00',
    secondaryContainer: '#F4E0BB',
    surface: '#FFF8F2',
    surfaceContainer: '#F7ECDF',
    surfaceContainerHigh: '#F1E6D9',
    onSurface: '#1F1B13',
    onSurfaceVariant: '#4E4639',
    outline: '#D1C5B4',
    darkPrimary: '#FABD00',
    darkPrimaryContainer: '#5B4300',
    darkSurface: '#17130B',
    darkSurfaceContainer: '#231F17',
    darkOnSurface: '#EBE1D4',
  },
  teal: {
    id: 'teal',
    name: 'Teal',
    primary: '#006874',
    onPrimary: '#FFFFFF',
    primaryContainer: '#97F0FF',
    onPrimaryContainer: '#001F24',
    secondaryContainer: '#CDE7EC',
    surface: '#F5FAFB',
    surfaceContainer: '#E9EFF0',
    surfaceContainerHigh: '#E3E9EA',
    onSurface: '#171D1E',
    onSurfaceVariant: '#3F484A',
    outline: '#BFC8CA',
    darkPrimary: '#4FD8EB',
    darkPrimaryContainer: '#004F58',
    darkSurface: '#0E1415',
    darkSurfaceContainer: '#1B2122',
    darkOnSurface: '#DEE3E5',
  },
  mono: {
    id: 'mono',
    name: 'Mono',
    primary: '#2B2B2D',
    onPrimary: '#FFFFFF',
    primaryContainer: '#E2E2E5',
    onPrimaryContainer: '#1A1C1E',
    secondaryContainer: '#E4E2E6',
    surface: '#FAF9FC',
    surfaceContainer: '#EFEDF0',
    surfaceContainerHigh: '#E9E7EA',
    onSurface: '#1B1B1D',
    onSurfaceVariant: '#46464A',
    outline: '#C7C6CA',
    darkPrimary: '#C8C6CA',
    darkPrimaryContainer: '#3F3F42',
    darkSurface: '#131315',
    darkSurfaceContainer: '#1F1F21',
    darkOnSurface: '#E4E2E6',
  },
};

const BOX_TONE_SWATCHES: Array<{ id: M3EBoxSurfaceTone; bg: string; fg: string; border?: string }> = [
  { id: 'surface_low', bg: '#F2F4EF', fg: '#181D18', border: '#D5DBD2' },
  { id: 'surface_mid', bg: '#EAECE7', fg: '#181D18', border: '#D5DBD2' },
  { id: 'surface_high', bg: '#E3E6E0', fg: '#181D18', border: '#D5DBD2' },
  { id: 'surface_highest', bg: '#DCE0D9', fg: '#181D18', border: '#D5DBD2' },
  { id: 'outline_dim', bg: '#CFD5CC', fg: '#181D18', border: '#C1C9BF' },
  { id: 'primary_tint', bg: '#AEF2C2', fg: '#00210C' },
  { id: 'secondary_tint', bg: '#D2E5D2', fg: '#181D18' },
  { id: 'tertiary_blue', bg: '#C6E7FF', fg: '#001E2E' },
  { id: 'primary_solid', bg: '#23643B', fg: '#FFFFFF' },
  { id: 'inverse_dark', bg: '#2B302B', fg: '#F1F4EF' },
];

interface CatalogItemDef {
  type: M3EPartType;
  category: M3EPartCategory;
  label: string;
}

const M3E_CATALOG: CatalogItemDef[] = [
  // Actions
  { type: 'button', category: 'actions', label: 'Button' },
  { type: 'icon_button', category: 'actions', label: 'Icon Button' },
  { type: 'fab', category: 'actions', label: 'FAB' },
  { type: 'split_button', category: 'actions', label: 'Split Button' },
  { type: 'chip', category: 'actions', label: 'Chip' },
  // Navigation
  { type: 'top_app_bar', category: 'navigation', label: 'Top App Bar' },
  { type: 'navigation_bar', category: 'navigation', label: 'Navigation Bar' },
  { type: 'navigation_rail', category: 'navigation', label: 'Navigation Rail' },
  { type: 'toolbar', category: 'navigation', label: 'Toolbar' },
  { type: 'tabs', category: 'navigation', label: 'Tabs' },
  { type: 'search_bar', category: 'navigation', label: 'Search Bar' },
  // Containment
  { type: 'card', category: 'containment', label: 'Card' },
  { type: 'list_item', category: 'containment', label: 'List Item' },
  { type: 'box', category: 'containment', label: 'Box' },
  { type: 'bottom_sheet', category: 'containment', label: 'Bottom sheet' },
  { type: 'dialog', category: 'containment', label: 'Dialog' },
  { type: 'snackbar', category: 'containment', label: 'Snackbar' },
  { type: 'carousel', category: 'containment', label: 'Carousel' },
  // Inputs
  { type: 'text_field', category: 'inputs', label: 'Text Field' },
  { type: 'dropdown', category: 'inputs', label: 'Dropdown' },
  { type: 'switch', category: 'inputs', label: 'Switch' },
  { type: 'checkbox', category: 'inputs', label: 'Checkbox' },
  { type: 'radio_button', category: 'inputs', label: 'Radio Button' },
  { type: 'slider', category: 'inputs', label: 'Slider' },
  { type: 'date_picker', category: 'inputs', label: 'Date Picker' },
  { type: 'time_picker', category: 'inputs', label: 'Time Picker' },
  // Content
  { type: 'text', category: 'content', label: 'Text' },
  { type: 'image', category: 'content', label: 'Image' },
  { type: 'map', category: 'content', label: 'Map' },
  { type: 'camera', category: 'content', label: 'Camera' },
  { type: 'chart', category: 'content', label: 'Chart' },
  { type: 'icon', category: 'content', label: 'Icon' },
  { type: 'divider', category: 'content', label: 'Divider' },
  // Progress
  { type: 'loading', category: 'progress', label: 'Loading' },
  { type: 'progress', category: 'progress', label: 'Progress' },
];

// ALL 3 INITIAL SCREENS MATCHING SCREENSHOTS 1-4 ("Home", "Screen 2", "Screen 3")
const INITIAL_SCREENS: M3EScreen[] = [
  {
    id: 'screen_home',
    name: 'Home',
    deviceMode: 'phone',
    scrollMultiplier: '1x',
    scrollHeightPx: 892,
    backgroundStyle: 'surface',
    parts: [
      {
        id: 'part_home_topbar',
        type: 'top_app_bar',
        label: 'Title',
        x: 0,
        y: 12,
        width: 380,
        height: 52,
        widthMode: 'full',
        sizePreset: 'M',
        styleVariant: 'tonal',
      },
      {
        id: 'part_home_btn_fav',
        type: 'button',
        label: 'Favorite',
        showLeadingIcon: true,
        iconName: 'star',
        x: 16,
        y: 72,
        width: 112,
        height: 44,
        widthMode: 'hug',
        sizePreset: 'M',
        styleVariant: 'filled',
        triggerAction: 'navigate',
        triggerTargetScreenId: 'screen_2',
      },
      {
        id: 'part_home_btn_share',
        type: 'button',
        label: 'Share',
        showLeadingIcon: true,
        iconName: 'share',
        x: 132,
        y: 72,
        width: 104,
        height: 44,
        widthMode: 'hug',
        sizePreset: 'M',
        styleVariant: 'tonal',
      },
      {
        id: 'part_home_list',
        type: 'list_item',
        label: 'Inbox List',
        x: 16,
        y: 132,
        width: 348,
        height: 196,
        widthMode: 'full',
        sizePreset: 'M',
        styleVariant: 'tonal',
        listRows: [
          { id: 'r1', title: 'Inbox', subtitle: 'Supporting text', icon: 'folder' },
          { id: 'r2', title: 'Starred', subtitle: 'Supporting text', icon: 'star' },
          { id: 'r3', title: 'Archive', subtitle: 'Supporting text', icon: 'box' },
        ],
      },
      {
        id: 'part_home_card',
        type: 'card',
        label: 'Card headline',
        subtitle: 'Supporting text goes here.',
        x: 4,
        y: 344,
        width: 356,
        height: 274,
        widthMode: 'full',
        sizePreset: 'M',
        styleVariant: 'tonal',
        cardLayout: 'stacked',
      },
      {
        id: 'part_home_fab',
        type: 'fab',
        label: 'Edit',
        x: 312,
        y: 628,
        width: 48,
        height: 48,
        widthMode: 'hug',
        sizePreset: 'M',
        styleVariant: 'tonal',
      },
      {
        id: 'part_home_bottomnav',
        type: 'navigation_bar',
        label: 'Navigation Bar',
        x: 0,
        y: 704,
        width: 380,
        height: 72,
        widthMode: 'full',
        sizePreset: 'M',
        styleVariant: 'tonal',
        activeSubIndex: 0,
        navItems: [
          { id: 'hn1', label: 'Home', icon: 'home', targetScreenId: 'screen_home' },
          { id: 'hn2', label: 'Search', icon: 'search', targetScreenId: 'screen_2' },
          { id: 'hn3', label: 'Saved', icon: 'saved', targetScreenId: 'screen_3' },
          { id: 'hn4', label: 'Settings', icon: 'settings' },
        ],
      },
    ],
  },
  {
    id: 'screen_2',
    name: 'Screen 2',
    deviceMode: 'phone',
    scrollMultiplier: '1x',
    scrollHeightPx: 892,
    backgroundStyle: 'surface',
    parts: [
      {
        id: 'part_s2_topbar',
        type: 'top_app_bar',
        label: 'Title',
        x: 0,
        y: 12,
        width: 380,
        height: 52,
        widthMode: 'full',
        sizePreset: 'M',
        styleVariant: 'tonal',
      },
      {
        id: 'part_s2_tabs',
        type: 'tabs',
        label: 'Feed Tabs',
        x: 0,
        y: 68,
        width: 380,
        height: 44,
        widthMode: 'full',
        sizePreset: 'M',
        styleVariant: 'tonal',
        activeSubIndex: 0,
        tabItems: ['For you', 'Following', 'Trending'],
      },
      {
        id: 'part_s2_btn',
        type: 'button',
        label: 'Button',
        showLeadingIcon: true,
        iconName: 'plus',
        x: 12,
        y: 124,
        width: 356,
        height: 48,
        widthMode: 'full',
        sizePreset: 'M',
        styleVariant: 'filled',
        triggerAction: 'navigate',
        triggerTargetScreenId: 'screen_3',
        triggerDescription: 'Open Screen 3',
      },
      {
        id: 'part_s2_iconbtn',
        type: 'icon_button',
        label: 'Heart',
        x: 74,
        y: 186,
        width: 46,
        height: 46,
        widthMode: 'hug',
        sizePreset: 'M',
        styleVariant: 'tonal',
        checked: false,
      },
      {
        id: 'part_s2_splitbtn',
        type: 'split_button',
        label: 'Send',
        x: 146,
        y: 174,
        width: 146,
        height: 46,
        widthMode: 'hug',
        sizePreset: 'M',
        styleVariant: 'filled',
      },
      {
        id: 'part_s2_map',
        type: 'map',
        label: 'Map View',
        x: 24,
        y: 238,
        width: 344,
        height: 224,
        widthMode: 'full',
        sizePreset: 'M',
        styleVariant: 'tonal',
      },
      {
        id: 'part_s2_card',
        type: 'card',
        label: 'Card headline',
        subtitle: 'Supporting text goes here.',
        x: 16,
        y: 474,
        width: 348,
        height: 158,
        widthMode: 'full',
        sizePreset: 'M',
        styleVariant: 'tonal',
        cardLayout: 'stacked',
        imageUrl:
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'part_s2_slider',
        type: 'slider',
        label: 'Slider',
        x: 16,
        y: 652,
        width: 348,
        height: 44,
        widthMode: 'full',
        sizePreset: 'M',
        styleVariant: 'filled',
        sliderValue: 40,
      },
    ],
  },
  {
    id: 'screen_3',
    name: 'Screen 3',
    deviceMode: 'phone',
    scrollMultiplier: '1x',
    scrollHeightPx: 892,
    backgroundStyle: 'surface',
    parts: [
      {
        id: 'part_s3_switch',
        type: 'switch',
        label: 'Notifications',
        x: 12,
        y: 118,
        width: 156,
        height: 40,
        widthMode: 'hug',
        sizePreset: 'M',
        styleVariant: 'filled',
        checked: true,
      },
      {
        id: 'part_s3_slider',
        type: 'slider',
        label: 'Slider',
        x: 12,
        y: 156,
        width: 356,
        height: 36,
        widthMode: 'full',
        sizePreset: 'M',
        styleVariant: 'filled',
        sliderValue: 38,
      },
      {
        id: 'part_s3_radio',
        type: 'radio_button',
        label: 'Option',
        x: 16,
        y: 192,
        width: 132,
        height: 34,
        widthMode: 'hug',
        sizePreset: 'M',
        styleVariant: 'tonal',
        checked: true,
      },
      {
        id: 'part_s3_carousel',
        type: 'carousel',
        label: 'Featured',
        x: 16,
        y: 230,
        width: 356,
        height: 168,
        widthMode: 'full',
        sizePreset: 'M',
        styleVariant: 'tonal',
        carouselLayout: 'uncontained',
        carouselCount: 4,
        activeCarouselIndex: 0,
        carouselItems: [
          { id: 'c1', label: 'Slide 1' },
          { id: 'c2', label: 'Slide 2' },
          { id: 'c3', label: 'Slide 3' },
          { id: 'c4', label: 'Slide 4' },
        ],
      },
      {
        id: 'part_s3_divider',
        type: 'divider',
        label: 'Divider',
        x: 8,
        y: 416,
        width: 364,
        height: 16,
        widthMode: 'full',
        sizePreset: 'M',
        styleVariant: 'tonal',
      },
      {
        id: 'part_s3_map',
        type: 'map',
        label: 'Map',
        x: 24,
        y: 444,
        width: 344,
        height: 224,
        widthMode: 'full',
        sizePreset: 'M',
        styleVariant: 'tonal',
      },
      {
        id: 'part_s3_loading',
        type: 'loading',
        label: 'Loading',
        x: 162,
        y: 682,
        width: 56,
        height: 56,
        widthMode: 'hug',
        sizePreset: 'M',
        styleVariant: 'filled',
      },
      {
        id: 'part_s3_progress',
        type: 'progress',
        label: 'Progress',
        x: 16,
        y: 742,
        width: 348,
        height: 20,
        widthMode: 'full',
        sizePreset: 'M',
        styleVariant: 'filled',
        sliderValue: 55,
      },
    ],
  },
];

export const CustomizeAppM3ECanvas: React.FC<CustomizeAppM3ECanvasProps> = ({
  onSwitchProject,
}) => {
  const [showAppForgeDrawer, setShowAppForgeDrawer] = useState<boolean>(false);
  const [customProjects] = useState<CustomProjectDefinition[]>(() => loadCustomProjects());

  // M3E Left Rail Active Tab
  const [leftRailTab, setLeftRailTab] = useState<
    'add' | 'layers' | 'color' | 'shape' | 'type' | 'motion' | 'ai'
  >('add');
  const [leftDrawerCollapsed, setLeftDrawerCollapsed] = useState<boolean>(false);
  const [rightDrawerCollapsed, setRightDrawerCollapsed] = useState<boolean>(false);

  // Parts Search & Collapsible Category State
  const [partsSearchQuery, setPartsSearchQuery] = useState<string>('');
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [collapsedInspectorSections, setCollapsedInspectorSections] = useState<
    Record<string, boolean>
  >({});

  // Canvas Pointer vs Hand Pan Mode & Pan Offset
  const [canvasToolMode, setCanvasToolMode] = useState<'select' | 'hand'>('select');
  const [canvasPan, setCanvasPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [panDragState, setPanDragState] = useState<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  // Theme & M3 Expressive tokens
  const [brightness, setBrightness] = useState<'light' | 'dark'>('light');
  const [contrast, setContrast] = useState<'standard' | 'medium' | 'high'>('standard');
  const [paletteId, setPaletteId] = useState<M3EPaletteId>('green');
  const [dynamicColorEnabled, setDynamicColorEnabled] = useState<boolean>(false);
  const [cornerRoundness, setCornerRoundness] = useState<'square' | 'rounded' | 'full'>('rounded');
  const [typeface, setTypeface] = useState<'roboto' | 'roboto_flex' | 'roboto_serif' | 'system'>(
    'roboto_flex'
  );
  const [emphasizedType, setEmphasizedType] = useState<boolean>(false);
  const [motionScheme, setMotionScheme] = useState<'standard' | 'expressive'>('expressive');
  const [uiLang, setUiLang] = useState<'en' | 'zh' | 'ko'>('en');

  // AI Settings State
  const [aiProvider, setAiProvider] = useState<'gemini' | 'openai' | 'claude' | 'custom'>('custom');
  const [aiModelId, setAiModelId] = useState<string>('deepseek-v3.2-flash');
  const [aiBaseUrl, setAiBaseUrl] = useState<string>('https://api.deepseek.com/v1');

  // Screens & History State
  const [screens, setScreens] = useState<M3EScreen[]>(INITIAL_SCREENS);
  const [historyPast, setHistoryPast] = useState<M3EScreen[][]>([]);
  const [historyFuture, setHistoryFuture] = useState<M3EScreen[][]>([]);

  const [selectedScreenId, setSelectedScreenId] = useState<string>('screen_2');
  const [selectedPartId, setSelectedPartId] = useState<string | null>('part_s2_btn');
  const [rightInspectorTab, setRightInspectorTab] = useState<'design' | 'trigger'>('design');
  const [partMoreMenuOpen, setPartMoreMenuOpen] = useState<boolean>(false);
  const [screenMoreMenuId, setScreenMoreMenuId] = useState<string | null>(null);

  // Action feedback toast when user interacts with Action elements on canvas
  const [actionFeedbackToast, setActionFeedbackToast] = useState<string | null>(null);

  // Floating Canvas Showcase Widgets Toggle
  const [showFloatingWidgets, setShowFloatingWidgets] = useState<boolean>(true);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(11);

  // Canvas Zoom & Tidy State
  const [canvasZoom, setCanvasZoom] = useState<number>(79);
  const [tidyHistorySnapshot, setTidyHistorySnapshot] = useState<M3EScreen[] | null>(null);

  // Interactive Preview Play Mode
  const [isPlayPreviewMode, setIsPlayPreviewMode] = useState<boolean>(false);
  const [playActiveScreenId, setPlayActiveScreenId] = useState<string>('screen_home');

  // Modals: Ask AI Modal & Prompt Export Drawer
  const [isAskAiModalOpen, setIsAskAiModalOpen] = useState<boolean>(false);
  const [askAiPromptText, setAskAiPromptText] = useState<string>('');
  const [isAiDrafting, setIsAiDrafting] = useState<boolean>(false);
  const [copiedInstructionToast, setCopiedInstructionToast] = useState<boolean>(false);

  const [isPromptExportOpen, setIsPromptExportOpen] = useState<boolean>(false);
  const [promptExportTarget, setPromptExportTarget] = useState<'android' | 'web'>('android');
  const [copiedPromptFlag, setCopiedPromptFlag] = useState<boolean>(false);

  // Dragging & Interactive Edge Resizing State inside Phone Screen
  const [draggingPartState, setDraggingPartState] = useState<{
    screenId: string;
    partId: string;
    startMouseX: number;
    startMouseY: number;
    origX: number;
    origY: number;
  } | null>(null);

  const [resizingPartState, setResizingPartState] = useState<{
    screenId: string;
    partId: string;
    edge: 'left' | 'right' | 'top' | 'bottom';
    startMouseX: number;
    startMouseY: number;
    origX: number;
    origY: number;
    origW: number;
    origH: number;
  } | null>(null);

  const [snapGuideX, setSnapGuideX] = useState<number | null>(null);
  const [snapGuideY, setSnapGuideY] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activePalette = M3E_PALETTES[paletteId] || M3E_PALETTES.green;
  const isDarkTheme = brightness === 'dark';

  const themeColors = {
    primary: isDarkTheme ? activePalette.darkPrimary : activePalette.primary,
    onPrimary: isDarkTheme ? '#1D1B20' : activePalette.onPrimary,
    primaryContainer: isDarkTheme
      ? activePalette.darkPrimaryContainer
      : activePalette.primaryContainer,
    onPrimaryContainer: isDarkTheme ? '#EADDFF' : activePalette.onPrimaryContainer,
    secondaryContainer: isDarkTheme ? '#332D41' : activePalette.secondaryContainer,
    surface: isDarkTheme ? activePalette.darkSurface : activePalette.surface,
    surfaceContainer: isDarkTheme
      ? activePalette.darkSurfaceContainer
      : activePalette.surfaceContainer,
    surfaceContainerHigh: isDarkTheme ? '#2B2930' : activePalette.surfaceContainerHigh,
    onSurface: isDarkTheme ? activePalette.darkOnSurface : activePalette.onSurface,
    onSurfaceVariant: isDarkTheme ? '#CAC4D0' : activePalette.onSurfaceVariant,
    outline: activePalette.outline,
  };

  const triggerToast = (msg: string) => {
    setActionFeedbackToast(msg);
    setTimeout(() => {
      setActionFeedbackToast((prev) => (prev === msg ? null : prev));
    }, 1800);
  };

  const commitScreensChange = (updater: (prev: M3EScreen[]) => M3EScreen[]) => {
    setScreens((prev) => {
      setHistoryPast((h) => [...h.slice(-18), prev]);
      setHistoryFuture([]);
      return updater(prev);
    });
  };

  const handleUndo = () => {
    if (historyPast.length === 0) return;
    const previous = historyPast[historyPast.length - 1];
    setHistoryPast((h) => h.slice(0, -1));
    setHistoryFuture((f) => [screens, ...f]);
    setScreens(previous);
  };

  const handleRedo = () => {
    if (historyFuture.length === 0) return;
    const next = historyFuture[0];
    setHistoryFuture((f) => f.slice(1));
    setHistoryPast((h) => [...h, screens]);
    setScreens(next);
  };

  const selectedScreen =
    screens.find((s) => s.id === selectedScreenId) || screens[0];

  const selectedPart =
    selectedScreen?.parts.find((p) => p.id === selectedPartId) || null;

  const updateSelectedScreen = (patch: Partial<M3EScreen>) => {
    if (!selectedScreen) return;
    commitScreensChange((prev) =>
      prev.map((s) => (s.id === selectedScreen.id ? { ...s, ...patch } : s))
    );
  };

  const updatePartById = (
    scrId: string,
    partId: string,
    patch: Partial<M3ECanvasPart>
  ) => {
    commitScreensChange((prev) =>
      prev.map((s) => {
        if (s.id !== scrId) return s;
        return {
          ...s,
          parts: s.parts.map((p) => (p.id === partId ? { ...p, ...patch } : p)),
        };
      })
    );
  };

  const updateSelectedPart = (patch: Partial<M3ECanvasPart>) => {
    if (!selectedScreen || !selectedPart) return;
    updatePartById(selectedScreen.id, selectedPart.id, patch);
  };

  const createDefaultPart = (type: M3EPartType, dropX?: number, dropY?: number): M3ECanvasPart => {
    const id = `part_${type}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 5)}`;
    const baseY = dropY !== undefined ? Math.max(8, Math.min(700, dropY - 24)) : 120;
    const baseX = dropX !== undefined ? Math.max(8, Math.min(260, dropX - 60)) : 16;

    switch (type) {
      case 'button':
        return {
          id,
          type,
          label: 'Button',
          showLeadingIcon: true,
          iconName: 'plus',
          x: baseX,
          y: baseY,
          width: 148,
          height: 48,
          widthMode: 'auto',
          sizePreset: 'M',
          styleVariant: 'filled',
        };
      case 'icon_button':
        return {
          id,
          type,
          label: 'Heart',
          iconName: 'heart',
          x: baseX,
          y: baseY,
          width: 48,
          height: 48,
          widthMode: 'auto',
          sizePreset: 'M',
          styleVariant: 'tonal',
          checked: false,
        };
      case 'fab':
        return {
          id,
          type,
          label: 'Action',
          iconName: 'edit',
          x: 304,
          y: 632,
          width: 56,
          height: 56,
          widthMode: 'auto',
          sizePreset: 'M',
          styleVariant: 'tonal',
          fabExtended: false,
        };
      case 'split_button':
        return {
          id,
          type,
          label: 'Send',
          iconName: 'send',
          x: baseX,
          y: baseY,
          width: 146,
          height: 46,
          widthMode: 'auto',
          sizePreset: 'M',
          styleVariant: 'filled',
          dropdownOpen: false,
        };
      case 'chip':
        return {
          id,
          type,
          label: 'Filter chip',
          x: baseX,
          y: baseY,
          width: 120,
          height: 36,
          widthMode: 'auto',
          sizePreset: 'M',
          styleVariant: 'tonal',
          checked: true,
        };
      case 'top_app_bar':
        return {
          id,
          type,
          label: 'Title',
          x: 0,
          y: 8,
          width: 380,
          height: 56,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
        };
      case 'navigation_bar':
        return {
          id,
          type,
          label: 'Navigation Bar',
          x: 0,
          y: 704,
          width: 380,
          height: 72,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
          activeSubIndex: 0,
          navItems: [
            { id: 'n1', label: 'Home', icon: 'home', targetScreenId: screens[0]?.id },
            { id: 'n2', label: 'Search', icon: 'search' },
            { id: 'n3', label: 'Saved', icon: 'saved' },
            { id: 'n4', label: 'Settings', icon: 'settings' },
          ],
        };
      case 'navigation_rail':
        return {
          id,
          type,
          label: 'Navigation Rail',
          x: 8,
          y: 72,
          width: 72,
          height: 290,
          widthMode: 'hug',
          sizePreset: 'M',
          styleVariant: 'tonal',
          activeSubIndex: 0,
          navItems: [
            { id: 'nr1', label: 'Home', icon: 'home' },
            { id: 'nr2', label: 'Search', icon: 'search' },
            { id: 'nr3', label: 'Saved', icon: 'saved' },
            { id: 'nr4', label: 'Settings', icon: 'settings' },
          ],
        };
      case 'toolbar':
        return {
          id,
          type,
          label: 'Floating Toolbar',
          x: 66,
          y: baseY,
          width: 248,
          height: 52,
          widthMode: 'standard',
          sizePreset: 'M',
          styleVariant: 'tonal',
        };
      case 'tabs':
        return {
          id,
          type,
          label: 'Tabs',
          x: 0,
          y: baseY,
          width: 380,
          height: 44,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
          activeSubIndex: 0,
          tabItems: ['For you', 'Following', 'Trending'],
        };
      case 'search_bar':
        return {
          id,
          type,
          label: 'Search',
          x: 16,
          y: baseY,
          width: 348,
          height: 48,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
        };
      case 'card':
        return {
          id,
          type,
          label: 'Card headline',
          subtitle: 'Supporting text goes here.',
          x: 16,
          y: baseY,
          width: 348,
          height: 220,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
          cardLayout: 'stacked',
        };
      case 'carousel':
        return {
          id,
          type,
          label: 'Featured',
          subtitle: 'Explore Expressive moments',
          x: 16,
          y: baseY,
          width: 356,
          height: 180,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
          carouselLayout: 'uncontained',
          carouselCount: 4,
          activeCarouselIndex: 0,
          carouselItems: [
            { id: 'c1', label: 'Slide 1' },
            { id: 'c2', label: 'Slide 2' },
            { id: 'c3', label: 'Slide 3' },
            { id: 'c4', label: 'Slide 4' },
          ],
        };
      case 'list_item':
        return {
          id,
          type,
          label: 'List Items',
          x: 16,
          y: baseY,
          width: 348,
          height: 184,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
          listRows: [
            { id: 'l1', title: 'Inbox', subtitle: 'Supporting text', icon: 'folder' },
            { id: 'l2', title: 'Starred', subtitle: 'Supporting text', icon: 'star' },
            { id: 'l3', title: 'Archive', subtitle: 'Supporting text', icon: 'box' },
          ],
        };
      case 'box':
        return {
          id,
          type,
          label: '',
          x: 8,
          y: baseY,
          width: 364,
          height: 180,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'filled',
          boxTone: 'inverse_dark',
          customRadius: 28,
        };
      case 'bottom_sheet':
        return {
          id,
          type,
          label: 'Share with friends',
          subtitle: 'Choose an app or contact below',
          x: 0,
          y: 540,
          width: 380,
          height: 240,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
        };
      case 'dialog':
        return {
          id,
          type,
          label: 'Confirm',
          subtitle: 'Do you want to continue?',
          x: 32,
          y: Math.max(80, Math.min(480, baseY)),
          width: 316,
          height: 188,
          widthMode: 'standard',
          sizePreset: 'M',
          styleVariant: 'tonal',
        };
      case 'snackbar':
        return {
          id,
          type,
          label: 'Saved',
          subtitle: 'Undo',
          x: 16,
          y: Math.max(40, Math.min(700, baseY)),
          width: 348,
          height: 48,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'filled',
        };
      case 'text_field':
        return {
          id,
          type,
          label: 'Label',
          subtitle: 'Input text',
          x: 16,
          y: baseY,
          width: 348,
          height: 56,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'outlined',
        };
      case 'dropdown':
        return {
          id,
          type,
          label: 'Select option',
          subtitle: 'Material 3 Expressive',
          x: 16,
          y: baseY,
          width: 348,
          height: 54,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
        };
      case 'switch':
        return {
          id,
          type,
          label: 'Notifications',
          x: 16,
          y: baseY,
          width: 172,
          height: 40,
          widthMode: 'hug',
          sizePreset: 'M',
          styleVariant: 'filled',
          checked: true,
        };
      case 'checkbox':
        return {
          id,
          type,
          label: 'Accept terms',
          x: 16,
          y: baseY,
          width: 160,
          height: 38,
          widthMode: 'hug',
          sizePreset: 'M',
          styleVariant: 'filled',
          checked: true,
        };
      case 'radio_button':
        return {
          id,
          type,
          label: 'Option',
          x: 16,
          y: baseY,
          width: 140,
          height: 38,
          widthMode: 'hug',
          sizePreset: 'M',
          styleVariant: 'tonal',
          checked: true,
        };
      case 'slider':
        return {
          id,
          type,
          label: 'Slider',
          x: 16,
          y: baseY,
          width: 348,
          height: 40,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'filled',
          sliderValue: 45,
        };
      case 'date_picker':
        return {
          id,
          type,
          label: 'Sun, Oct 11',
          subtitle: 'October 2026',
          x: 22,
          y: Math.max(24, Math.min(390, baseY)),
          width: 336,
          height: 356,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
        };
      case 'time_picker':
        return {
          id,
          type,
          label: '09:41',
          subtitle: 'Select time',
          x: 34,
          y: Math.max(40, Math.min(440, baseY)),
          width: 312,
          height: 276,
          widthMode: 'standard',
          sizePreset: 'M',
          styleVariant: 'tonal',
        };
      case 'text':
        return {
          id,
          type,
          label: 'Headline text',
          subtitle: 'Supporting body text with Material 3 Expressive typography.',
          x: 16,
          y: baseY,
          width: 348,
          height: 64,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
        };
      case 'image':
        return {
          id,
          type,
          label: 'Image',
          x: 16,
          y: baseY,
          width: 348,
          height: 158,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
        };
      case 'map':
        return {
          id,
          type,
          label: 'Map View',
          x: 16,
          y: baseY,
          width: 348,
          height: 210,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
        };
      case 'camera':
        return {
          id,
          type,
          label: 'Camera Viewfinder',
          x: 16,
          y: baseY,
          width: 348,
          height: 228,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
        };
      case 'chart':
        return {
          id,
          type,
          label: 'Weekly Activity',
          subtitle: '+24% vs last week',
          x: 16,
          y: baseY,
          width: 348,
          height: 168,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
        };
      case 'icon':
        return {
          id,
          type,
          label: 'Expressive Icon',
          x: baseX,
          y: baseY,
          width: 56,
          height: 56,
          widthMode: 'hug',
          sizePreset: 'M',
          styleVariant: 'tonal',
        };
      case 'divider':
        return {
          id,
          type,
          label: 'Divider',
          x: 16,
          y: baseY,
          width: 348,
          height: 18,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
        };
      case 'loading':
        return {
          id,
          type,
          label: 'Loading',
          x: dropX !== undefined ? baseX : 162,
          y: baseY,
          width: 56,
          height: 56,
          widthMode: 'hug',
          sizePreset: 'M',
          styleVariant: 'filled',
        };
      case 'progress':
        return {
          id,
          type,
          label: 'Progress',
          x: 16,
          y: baseY,
          width: 348,
          height: 22,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'filled',
          sliderValue: 60,
        };
    }
  };

  const handleAddPartToScreen = (
    targetScrId: string,
    partType: M3EPartType,
    dropX?: number,
    dropY?: number
  ) => {
    const scr = screens.find((s) => s.id === targetScrId) || screens[0];
    let autoY = dropY;
    if (autoY === undefined && scr) {
      const nonBottomParts = scr.parts.filter(
        (p) => !(p.type === 'navigation_bar' && p.y > 600)
      );
      if (nonBottomParts.length === 0) {
        autoY = 40;
      } else {
        const lowestBottom = Math.max(...nonBottomParts.map((p) => p.y + p.height));
        autoY = Math.min(680, lowestBottom + 14);
      }
    }
    const newPart = createDefaultPart(partType, dropX, autoY);
    commitScreensChange((prev) =>
      prev.map((s) =>
        s.id === targetScrId ? { ...s, parts: [...s.parts, newPart] } : s
      )
    );
    setSelectedScreenId(targetScrId);
    setSelectedPartId(newPart.id);
    setRightInspectorTab('design');
  };

  const handleAddNewScreen = () => {
    const nextNum = screens.length + 1;
    const newScr: M3EScreen = {
      id: `screen_${Date.now().toString(36)}`,
      name: `Screen ${nextNum}`,
      deviceMode: 'phone',
      scrollMultiplier: '1x',
      scrollHeightPx: 892,
      backgroundStyle: 'surface',
      parts: [
        {
          id: `part_top_${Date.now().toString(36)}`,
          type: 'top_app_bar',
          label: `Screen ${nextNum}`,
          x: 0,
          y: 12,
          width: 380,
          height: 52,
          widthMode: 'full',
          sizePreset: 'M',
          styleVariant: 'tonal',
        },
      ],
    };
    commitScreensChange((prev) => [...prev, newScr]);
    setSelectedScreenId(newScr.id);
    setSelectedPartId(null);
    triggerToast(`Added ${newScr.name}`);
  };

  const handleDuplicateScreen = (scrId: string) => {
    const orig = screens.find((s) => s.id === scrId);
    if (!orig) return;
    const copyScr: M3EScreen = {
      ...orig,
      id: `screen_dup_${Date.now().toString(36)}`,
      name: `${orig.name} Copy`,
      parts: orig.parts.map((p) => ({
        ...p,
        id: `part_${p.type}_${Math.random().toString(36).slice(2, 8)}`,
      })),
    };
    commitScreensChange((prev) => {
      const idx = prev.findIndex((s) => s.id === scrId);
      const next = [...prev];
      next.splice(idx + 1, 0, copyScr);
      return next;
    });
    setSelectedScreenId(copyScr.id);
    setScreenMoreMenuId(null);
    triggerToast(`Duplicated ${orig.name}`);
  };

  const handleRemoveScreen = (scrId: string) => {
    if (screens.length <= 1) {
      triggerToast('Cannot delete the last remaining screen');
      return;
    }
    const target = screens.find((s) => s.id === scrId);
    const remaining = screens.filter((s) => s.id !== scrId);
    commitScreensChange(() => remaining);
    if (selectedScreenId === scrId) {
      setSelectedScreenId(remaining[0].id);
      setSelectedPartId(null);
    }
    setScreenMoreMenuId(null);
    if (target) triggerToast(`Removed ${target.name}`);
  };

  const handleTidySelectedScreen = () => {
    if (!selectedScreen) return;
    if (tidyHistorySnapshot) {
      setScreens(tidyHistorySnapshot);
      setTidyHistorySnapshot(null);
      return;
    }
    setTidyHistorySnapshot(screens);
    commitScreensChange((prev) =>
      prev.map((scr) => {
        if (scr.id !== selectedScreen.id) return scr;
        const sorted = [...scr.parts].sort((a, b) => a.y - b.y);
        let cursorY = 14;
        const tidied = sorted.map((p) => {
          if (p.type === 'navigation_bar' && p.y > 600) {
            return { ...p, x: p.width >= 370 ? 0 : 12, y: 704 };
          }
          if (p.type === 'fab') {
            return { ...p, x: 304, y: 632 };
          }
          const nextX = p.width >= 370 ? 0 : p.width >= 320 ? 16 : p.x;
          const updated = { ...p, x: nextX, y: cursorY };
          cursorY += p.height + 12;
          return updated;
        });
        return { ...scr, parts: tidied };
      })
    );
  };

  const handleAlignSelectedPart = (posIndex: number) => {
    if (!selectedPart) return;
    const col = posIndex % 3;
    const row = Math.floor(posIndex / 3);
    const x =
      col === 0
        ? 16
        : col === 1
        ? Math.max(0, Math.round((380 - selectedPart.width) / 2))
        : Math.max(0, 380 - selectedPart.width - 16);
    const y =
      row === 0
        ? 16
        : row === 1
        ? Math.round((780 - selectedPart.height) / 2)
        : 704 - selectedPart.height;
    updateSelectedPart({ x, y });
  };

  const handleDuplicateSelectedPart = () => {
    if (!selectedScreen || !selectedPart) return;
    const dup: M3ECanvasPart = {
      ...selectedPart,
      id: `part_dup_${Date.now().toString(36)}`,
      y: Math.min(700, selectedPart.y + 28),
      x: Math.min(300, selectedPart.x + 12),
    };
    commitScreensChange((prev) =>
      prev.map((s) =>
        s.id === selectedScreen.id ? { ...s, parts: [...s.parts, dup] } : s
      )
    );
    setSelectedPartId(dup.id);
    setPartMoreMenuOpen(false);
  };

  const handleDeleteSelectedPart = () => {
    if (!selectedScreen || !selectedPart) return;
    commitScreensChange((prev) =>
      prev.map((s) =>
        s.id === selectedScreen.id
          ? { ...s, parts: s.parts.filter((p) => p.id !== selectedPart.id) }
          : s
      )
    );
    setSelectedPartId(null);
    setPartMoreMenuOpen(false);
  };

  const handleDraftWithAi = () => {
    const prompt = askAiPromptText.trim() || 'Home page, personal dashboard';
    setIsAiDrafting(true);
    setTimeout(() => {
      commitScreensChange((prev) =>
        prev.map((s, idx) => {
          if (idx === 0) {
            return {
              ...s,
              name: prompt.slice(0, 22) || 'Personal Dashboard',
            };
          }
          return s;
        })
      );
      setIsAiDrafting(false);
      setIsAskAiModalOpen(false);
    }, 850);
  };

  const generateM3EPromptSpecText = () => {
    return `Please implement this app in the Material 3 Expressive design language, ${brightness} mode only.
Target a portrait phone screen (412×892dp), ${
      promptExportTarget === 'android'
        ? 'using Jetpack Compose Material 3 Expressive.'
        : 'as a web app that runs in the browser.'
    }
The layout below is a rough sketch that conveys intent, not a finished spec. Do not reproduce it as a static picture; build the complete, working UI and flows a real product is normally expected to be.

## Colors
The theme is ${activePalette.name}. Set these on the root and reference every color through its role:
- primary: ${themeColors.primary} / onPrimary: ${themeColors.onPrimary}
- primaryContainer: ${themeColors.primaryContainer} / onPrimaryContainer: ${themeColors.onPrimaryContainer}
- secondaryContainer: ${themeColors.secondaryContainer}
- surface: ${themeColors.surface} / surfaceContainer: ${themeColors.surfaceContainer}
- surfaceContainerHigh: ${themeColors.surfaceContainerHigh}
- onSurface: ${themeColors.onSurface} / onSurfaceVariant: ${themeColors.onSurfaceVariant}
- outline: ${themeColors.outline}

## Shape & Motion
- Corner roundness: ${cornerRoundness}
- Typeface: ${typeface} ${emphasizedType ? '(Emphasized)' : ''}
- Motion scheme: ${motionScheme} spring physics

## Screens (${screens.length})
${screens
  .map(
    (s, idx) =>
      `### ${idx + 1}. ${s.name} (Height: ${s.scrollHeightPx}dp)\n` +
      s.parts
        .map(
          (p) =>
            `- [${p.type}] "${p.label}" at (${p.x}dp, ${p.y}dp), size ${p.width}×${p.height}dp, style=${p.styleVariant}${
              p.triggerAction && p.triggerAction !== 'none'
                ? ` -> Trigger: ${p.triggerAction} (${
                    screens.find((ts) => ts.id === p.triggerTargetScreenId)?.name || ''
                  })`
                : ''
            }`
        )
        .join('\n')
  )
  .join('\n\n')}`;
  };

  const radiusValue = (base: number, customOverride?: number) => {
    if (customOverride !== undefined) return customOverride;
    if (cornerRoundness === 'square') return 0;
    if (cornerRoundness === 'full') return 999;
    return base;
  };

  const toggleInspectorSection = (secKey: string) => {
    setCollapsedInspectorSections((prev) => ({
      ...prev,
      [secKey]: !prev[secKey],
    }));
  };

  // Render an authentic Material 3 Expressive visual preview for EVERY single M3EPartType
  // AND make all Action/Input/Navigation elements genuinely interactive!
  const renderM3EPartNode = (scr: M3EScreen, part: M3ECanvasPart, inPlayMode: boolean) => {
    const isSelected =
      !inPlayMode && selectedScreenId === scr.id && selectedPartId === part.id;

    // 5-Style calculation (Filled, Tonal, Elevated, Outlined, Text)
    const st = part.styleVariant || 'filled';
    const bg =
      st === 'filled'
        ? themeColors.primary
        : st === 'tonal'
        ? themeColors.secondaryContainer
        : st === 'elevated'
        ? themeColors.surfaceContainerHigh
        : 'transparent';
    const fg =
      st === 'filled'
        ? themeColors.onPrimary
        : st === 'tonal'
        ? themeColors.onSurface
        : themeColors.primary;
    const borderCss =
      st === 'outlined' ? `1.5px solid ${themeColors.outline}` : 'none';

    const executePartTriggerIfSet = () => {
      if (part.triggerAction === 'navigate' && part.triggerTargetScreenId) {
        const dest = screens.find((s) => s.id === part.triggerTargetScreenId);
        if (inPlayMode) {
          setPlayActiveScreenId(part.triggerTargetScreenId);
        } else {
          setSelectedScreenId(part.triggerTargetScreenId);
          setSelectedPartId(null);
          if (dest) triggerToast(`Navigated → ${dest.name}`);
        }
        return true;
      }
      if (part.triggerAction === 'back') {
        if (inPlayMode) {
          setPlayActiveScreenId(screens[0]?.id || 'screen_home');
        } else {
          setSelectedScreenId(screens[0]?.id || 'screen_home');
          triggerToast('Navigated ← Back');
        }
        return true;
      }
      return false;
    };

    const renderLeadingIcon = () => {
      if (part.showLeadingIcon === false) return null;
      const ico = part.iconName;
      if (ico === 'star' || part.label.toLowerCase().includes('fav')) {
        return <Star size={14} className="fill-current" />;
      }
      if (ico === 'share' || part.label.toLowerCase().includes('share')) {
        return <Share2 size={14} />;
      }
      if (ico === 'heart') {
        return <Heart size={14} className={part.checked ? 'fill-current' : ''} />;
      }
      if (ico === 'send') {
        return <Send size={14} className="fill-current" />;
      }
      if (ico === 'edit') {
        return <Edit3 size={14} />;
      }
      if (ico === 'check') {
        return <Check size={14} strokeWidth={2.5} />;
      }
      return <Plus size={15} strokeWidth={2.5} />;
    };

    const renderInner = () => {
      switch (part.type) {
        // ======================= ACTIONS =======================
        case 'button':
          return (
            <div
              onDoubleClick={(e) => {
                e.stopPropagation();
                if (!executePartTriggerIfSet()) {
                  triggerToast(`Clicked "${part.label}"`);
                }
              }}
              style={{
                backgroundColor: bg,
                color: fg,
                borderRadius: `${radiusValue(part.checked ? 14 : 999, part.customRadius)}px`,
                border: borderCss,
              }}
              className={`w-full h-full px-4 flex items-center justify-center gap-2 font-semibold text-xs select-none transition-all active:scale-95 ${
                st === 'elevated' ? 'shadow-md' : 'shadow-2xs'
              }`}
            >
              {renderLeadingIcon()}
              <span className="truncate">
                {uiLang === 'zh' && part.label === 'Button'
                  ? '按钮'
                  : uiLang === 'ko' && part.label === 'Button'
                  ? '버튼'
                  : part.label}
              </span>
            </div>
          );

        case 'icon_button': {
          const isToggled = !!part.checked;
          return (
            <div
              onClick={(e) => {
                if (inPlayMode || isSelected) {
                  e.stopPropagation();
                  updatePartById(scr.id, part.id, { checked: !isToggled });
                }
              }}
              style={{
                backgroundColor: isToggled
                  ? themeColors.primary
                  : st === 'filled'
                  ? themeColors.primary
                  : st === 'outlined'
                  ? 'transparent'
                  : '#DCE8DC',
                color:
                  isToggled || st === 'filled'
                    ? themeColors.onPrimary
                    : themeColors.onSurface,
                borderRadius: `${radiusValue(isToggled ? 999 : 14, part.customRadius)}px`,
                border: borderCss,
              }}
              className="w-full h-full flex items-center justify-center transition-all active:scale-90"
            >
              <Heart size={18} className={isToggled ? 'fill-current' : ''} />
            </div>
          );
        }

        case 'fab':
          return (
            <div
              onDoubleClick={(e) => {
                e.stopPropagation();
                updatePartById(scr.id, part.id, {
                  fabExtended: !part.fabExtended,
                  width: !part.fabExtended ? 128 : 56,
                });
              }}
              style={{
                backgroundColor:
                  st === 'filled' ? themeColors.primary : themeColors.secondaryContainer,
                color:
                  st === 'filled' ? themeColors.onPrimary : themeColors.onSurface,
                borderRadius: `${radiusValue(16, part.customRadius)}px`,
              }}
              className="w-full h-full px-3 flex items-center justify-center gap-2 shadow-sm font-semibold text-xs transition-all active:scale-95"
              title="Double-click to toggle Extended FAB"
            >
              <Edit3 size={17} />
              {(part.fabExtended || part.width > 80) && (
                <span className="truncate">{part.label}</span>
              )}
            </div>
          );

        case 'split_button':
          return (
            <div className="w-full h-full flex items-center gap-[3px] select-none relative">
              <div
                onClick={(e) => {
                  if (inPlayMode) {
                    e.stopPropagation();
                    triggerToast(`${part.label} sent!`);
                  }
                }}
                style={{
                  backgroundColor: bg,
                  color: fg,
                  borderTopLeftRadius: `${radiusValue(999)}px`,
                  borderBottomLeftRadius: `${radiusValue(999)}px`,
                  borderTopRightRadius: `${radiusValue(6)}px`,
                  borderBottomRightRadius: `${radiusValue(6)}px`,
                }}
                className="flex-1 h-full px-3.5 flex items-center justify-center gap-2 text-xs font-semibold active:scale-95 transition"
              >
                <Send size={13} className="fill-current" />
                <span className="truncate">{part.label}</span>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  updatePartById(scr.id, part.id, {
                    dropdownOpen: !part.dropdownOpen,
                  });
                }}
                style={{
                  backgroundColor: bg,
                  color: fg,
                  borderTopRightRadius: `${radiusValue(999)}px`,
                  borderBottomRightRadius: `${radiusValue(999)}px`,
                  borderTopLeftRadius: `${radiusValue(6)}px`,
                  borderBottomLeftRadius: `${radiusValue(6)}px`,
                }}
                className="w-9 h-full flex items-center justify-center active:scale-95 transition cursor-pointer"
                title="Click to toggle Split Button Menu"
              >
                <ChevronDown
                  size={15}
                  className={`transition-transform ${
                    part.dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>

              {part.dropdownOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 top-full mt-1.5 w-36 rounded-2xl bg-white border border-neutral-200 shadow-xl py-1.5 z-40 text-[11px] font-semibold text-neutral-800"
                >
                  {['Send now', 'Schedule send', 'Save draft'].map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        updatePartById(scr.id, part.id, {
                          label: opt.split(' ')[0],
                          dropdownOpen: false,
                        });
                        triggerToast(opt);
                      }}
                      className="px-3 py-1.5 hover:bg-neutral-100 cursor-pointer"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );

        case 'chip':
          return (
            <div
              onClick={(e) => {
                if (inPlayMode || isSelected) {
                  e.stopPropagation();
                  updatePartById(scr.id, part.id, { checked: !part.checked });
                }
              }}
              style={{
                backgroundColor: part.checked
                  ? themeColors.secondaryContainer
                  : 'transparent',
                color: themeColors.onSurface,
                borderColor: themeColors.outline,
                borderRadius: `${radiusValue(10, part.customRadius)}px`,
              }}
              className="w-full h-full px-3 border flex items-center justify-center gap-1.5 text-xs font-medium transition-all active:scale-95"
            >
              {part.checked ? (
                <Check size={13} style={{ color: themeColors.primary }} strokeWidth={2.5} />
              ) : (
                <Tag size={12} style={{ color: themeColors.primary }} />
              )}
              <span className="truncate">{part.label}</span>
            </div>
          );

        // ======================= NAVIGATION =======================
        case 'top_app_bar':
          return (
            <div
              style={{ color: themeColors.onSurface }}
              className="w-full h-full px-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Menu size={18} />
                <span
                  className={`text-[17px] ${
                    emphasizedType ? 'font-black' : 'font-normal'
                  }`}
                >
                  {uiLang === 'zh' && part.label === 'Title'
                    ? '标题'
                    : uiLang === 'ko' && part.label === 'Title'
                    ? '제목'
                    : part.label}
                </span>
              </div>
              <MoreVertical size={17} />
            </div>
          );

        case 'navigation_bar': {
          const navs = part.navItems || [
            { id: '1', label: 'Home', icon: 'home' },
            { id: '2', label: 'Search', icon: 'search' },
            { id: '3', label: 'Saved', icon: 'saved' },
            { id: '4', label: 'Settings', icon: 'settings' },
          ];
          const activeIdx = part.activeSubIndex ?? 0;
          return (
            <div
              style={{
                backgroundColor: themeColors.surfaceContainer,
                borderRadius: `${radiusValue(part.width < 370 ? 999 : 20, part.customRadius)}px`,
              }}
              className="w-full h-full px-2 flex items-center justify-around shadow-2xs"
            >
              {navs.map((item, idx) => {
                const active = idx === activeIdx;
                const NavIcon =
                  item.icon === 'search'
                    ? Search
                    : item.icon === 'saved'
                    ? Heart
                    : item.icon === 'settings'
                    ? Settings
                    : Home;
                return (
                  <div
                    key={item.id}
                    onClick={(e) => {
                      if (inPlayMode || isSelected) {
                        e.stopPropagation();
                        updatePartById(scr.id, part.id, { activeSubIndex: idx });
                        if (inPlayMode && item.targetScreenId) {
                          setPlayActiveScreenId(item.targetScreenId);
                        }
                      }
                    }}
                    className="flex flex-col items-center justify-center gap-0.5 cursor-pointer flex-1"
                  >
                    <div
                      style={{
                        backgroundColor: active
                          ? themeColors.secondaryContainer
                          : 'transparent',
                        color: active ? themeColors.primary : themeColors.onSurfaceVariant,
                      }}
                      className="px-4 py-1 rounded-full flex items-center justify-center transition"
                    >
                      <NavIcon size={15} />
                    </div>
                    <span
                      style={{
                        color: active ? themeColors.onSurface : themeColors.onSurfaceVariant,
                      }}
                      className="text-[10px] font-medium"
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        }

        case 'navigation_rail': {
          const navs = part.navItems || [
            { id: '1', label: 'Home', icon: 'home' },
            { id: '2', label: 'Search', icon: 'search' },
            { id: '3', label: 'Saved', icon: 'saved' },
            { id: '4', label: 'Settings', icon: 'settings' },
          ];
          const activeIdx = part.activeSubIndex ?? 0;
          return (
            <div
              style={{
                backgroundColor: themeColors.surfaceContainer,
                borderRadius: `${radiusValue(20, part.customRadius)}px`,
              }}
              className="w-full h-full py-3 px-1.5 flex flex-col items-center justify-between shadow-2xs"
            >
              <div
                style={{
                  backgroundColor: themeColors.primaryContainer,
                  color: themeColors.primary,
                }}
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
              >
                <Plus size={16} />
              </div>
              <div className="flex flex-col items-center gap-3">
                {navs.slice(0, 3).map((item, idx) => {
                  const active = idx === activeIdx;
                  const NavIcon =
                    item.icon === 'search'
                      ? Search
                      : item.icon === 'saved'
                      ? Heart
                      : Home;
                  return (
                    <div
                      key={item.id}
                      onClick={(e) => {
                        if (inPlayMode || isSelected) {
                          e.stopPropagation();
                          updatePartById(scr.id, part.id, { activeSubIndex: idx });
                        }
                      }}
                      className="flex flex-col items-center gap-0.5 cursor-pointer"
                    >
                      <div
                        style={{
                          backgroundColor: active ? themeColors.secondaryContainer : 'transparent',
                          color: active ? themeColors.primary : themeColors.onSurfaceVariant,
                        }}
                        className="w-11 h-7 rounded-full flex items-center justify-center"
                      >
                        <NavIcon size={14} />
                      </div>
                      <span className="text-[9px] font-medium">{item.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="w-6 h-1 rounded-full bg-black/10" />
            </div>
          );
        }

        case 'toolbar':
          return (
            <div
              style={{
                backgroundColor: themeColors.surfaceContainerHigh,
                color: themeColors.onSurface,
                borderRadius: `${radiusValue(999, part.customRadius)}px`,
              }}
              className="w-full h-full px-3 flex items-center justify-between shadow-md"
            >
              <div className="flex items-center gap-3 pl-2">
                <Edit3 size={15} />
                <ImageIcon size={15} />
                <Share2 size={15} />
                <MoreVertical size={15} />
              </div>
              <div
                style={{
                  backgroundColor: themeColors.primary,
                  color: themeColors.onPrimary,
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center"
              >
                <Plus size={16} />
              </div>
            </div>
          );

        case 'tabs': {
          const items = part.tabItems || ['For you', 'Following', 'Trending'];
          const activeIdx = part.activeSubIndex ?? 0;
          return (
            <div
              style={{ borderColor: themeColors.outline }}
              className="w-full h-full px-4 border-b flex items-center gap-6 overflow-x-auto no-scrollbar"
            >
              {items.map((t, idx) => {
                const active = idx === activeIdx;
                return (
                  <div
                    key={idx}
                    onClick={(e) => {
                      if (inPlayMode || isSelected) {
                        e.stopPropagation();
                        updatePartById(scr.id, part.id, { activeSubIndex: idx });
                      }
                    }}
                    className="h-full flex items-center relative text-xs font-medium whitespace-nowrap cursor-pointer"
                    style={{
                      color: active ? themeColors.primary : themeColors.onSurfaceVariant,
                    }}
                  >
                    <span>{t}</span>
                    {active && (
                      <span
                        style={{ backgroundColor: themeColors.primary }}
                        className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          );
        }

        case 'search_bar':
          return (
            <div
              style={{
                backgroundColor: themeColors.surfaceContainerHigh,
                color: themeColors.onSurfaceVariant,
                borderRadius: `${radiusValue(999, part.customRadius)}px`,
              }}
              className="w-full h-full px-4 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <Search size={15} />
                <span>{part.label || 'Search'}</span>
              </div>
              <div className="w-6 h-6 rounded-full flex items-center justify-center">
                <Sliders size={13} />
              </div>
            </div>
          );

        // ======================= CONTAINMENT =======================
        case 'card': {
          const cLayout = part.cardLayout || 'stacked';
          const showMedia = cLayout !== 'minimal';
          return (
            <div
              style={{
                backgroundColor:
                  st === 'filled'
                    ? themeColors.surfaceContainerHigh
                    : st === 'tonal'
                    ? '#E2E6DF'
                    : themeColors.surface,
                borderColor: themeColors.outline,
                borderRadius: `${radiusValue(18, part.customRadius)}px`,
                color: themeColors.onSurface,
              }}
              className={`w-full h-full overflow-hidden flex p-3 gap-3 ${
                cLayout === 'horizontal'
                  ? 'flex-row items-center'
                  : 'flex-col justify-start'
              } ${st === 'outlined' ? 'border' : ''}`}
            >
              {showMedia && (
                <div
                  style={{
                    backgroundColor: themeColors.primaryContainer,
                    borderRadius: `${radiusValue(12)}px`,
                  }}
                  className={`${
                    cLayout === 'horizontal'
                      ? 'w-2/5 h-full'
                      : 'w-full h-[52%] min-h-[72px]'
                  } relative overflow-hidden flex items-center justify-center flex-shrink-0`}
                >
                  {part.imageUrl ? (
                    <img
                      src={part.imageUrl}
                      alt={part.label}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon size={22} style={{ color: themeColors.onPrimaryContainer }} />
                  )}
                </div>
              )}
              <div className="px-1">
                <div className="text-xs font-bold">{part.label}</div>
                <div
                  style={{ color: themeColors.onSurfaceVariant }}
                  className="text-[11px] mt-0.5"
                >
                  {part.subtitle || 'Supporting text goes here.'}
                </div>
              </div>
            </div>
          );
        }

        case 'carousel': {
          const count = part.carouselCount || 4;
          const activeIdx = part.activeCarouselIndex ?? 0;
          const cItems = part.carouselItems || [];
          const activeSlide = cItems[activeIdx];
          const layout = part.carouselLayout || 'uncontained';

          return (
            <div className="w-full h-full flex items-center gap-2 overflow-hidden select-none">
              {layout === 'center' && (
                <div
                  style={{
                    backgroundColor: '#DAE0D8',
                    borderRadius: `${radiusValue(16, part.customRadius)}px`,
                  }}
                  className="w-9 h-full flex-shrink-0"
                />
              )}
              <div
                onClick={(e) => {
                  if (inPlayMode || isSelected) {
                    e.stopPropagation();
                    updatePartById(scr.id, part.id, {
                      activeCarouselIndex: (activeIdx + 1) % count,
                    });
                  }
                }}
                style={{
                  backgroundColor: themeColors.primaryContainer,
                  borderRadius: `${radiusValue(16, part.customRadius)}px`,
                }}
                className="flex-1 h-full relative overflow-hidden p-3 flex flex-col justify-end cursor-pointer"
                title="Click to cycle carousel cards"
              >
                {activeSlide?.imageUrl ? (
                  <img
                    src={activeSlide.imageUrl}
                    alt={activeSlide.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon
                    size={22}
                    style={{ color: themeColors.onPrimaryContainer }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                )}
                {activeSlide?.label && activeSlide.label !== `Slide ${activeIdx + 1}` && (
                  <span
                    style={{ color: themeColors.onPrimaryContainer }}
                    className="text-xs font-bold relative z-10 bg-white/70 px-2 py-0.5 rounded-md w-fit"
                  >
                    {activeSlide.label}
                  </span>
                )}
              </div>

              {layout === 'multi' && (
                <div
                  style={{
                    backgroundColor: '#CFE8D5',
                    borderRadius: `${radiusValue(16, part.customRadius)}px`,
                  }}
                  className="w-20 h-full flex items-center justify-center flex-shrink-0"
                >
                  <ImageIcon size={16} style={{ color: themeColors.primary }} />
                </div>
              )}

              <div
                style={{
                  backgroundColor: '#DAE0D8',
                  borderRadius: `${radiusValue(16, part.customRadius)}px`,
                }}
                className="w-10 h-full flex-shrink-0"
              />
            </div>
          );
        }

        case 'list_item': {
          const rows = part.listRows || [
            { id: '1', title: 'Inbox', subtitle: 'Supporting text', icon: 'folder' },
            { id: '2', title: 'Starred', subtitle: 'Supporting text', icon: 'star' },
            { id: '3', title: 'Archive', subtitle: 'Supporting text', icon: 'box' },
          ];
          return (
            <div className="w-full h-full flex flex-col justify-between gap-1.5">
              {rows.map((r) => (
                <div
                  key={r.id}
                  style={{
                    backgroundColor: themeColors.surfaceContainer,
                    borderRadius: `${radiusValue(16, part.customRadius)}px`,
                    color: themeColors.onSurface,
                  }}
                  className="flex-1 px-3.5 py-2 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        backgroundColor: themeColors.primaryContainer,
                        color: themeColors.primary,
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      {r.icon === 'star' ? (
                        <Star size={14} className="fill-current" />
                      ) : r.icon === 'box' ? (
                        <Boxes size={14} />
                      ) : (
                        <Folder size={14} />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">{r.title}</div>
                      <div
                        style={{ color: themeColors.onSurfaceVariant }}
                        className="text-[10px]"
                      >
                        {r.subtitle}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={14} style={{ color: themeColors.onSurfaceVariant }} />
                </div>
              ))}
            </div>
          );
        }

        case 'box': {
          const toneObj =
            BOX_TONE_SWATCHES.find((t) => t.id === (part.boxTone || 'inverse_dark')) ||
            BOX_TONE_SWATCHES[9];
          return (
            <div
              style={{
                backgroundColor: toneObj.bg,
                color: toneObj.fg,
                borderColor: toneObj.border || 'transparent',
                borderRadius: `${part.customRadius ?? radiusValue(28)}px`,
              }}
              className="w-full h-full border p-3 flex items-center justify-center transition-colors"
            >
              {part.label && (
                <span className="text-xs font-medium opacity-80">{part.label}</span>
              )}
            </div>
          );
        }

        case 'bottom_sheet':
          return (
            <div
              style={{
                backgroundColor: themeColors.surfaceContainer,
                borderTopLeftRadius: `${radiusValue(28, part.customRadius)}px`,
                borderTopRightRadius: `${radiusValue(28, part.customRadius)}px`,
                color: themeColors.onSurface,
              }}
              className="w-full h-full p-4 shadow-xl border-t border-black/5 flex flex-col justify-between"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-9 h-1 rounded-full bg-neutral-400/60" />
                <div className="w-full text-left">
                  <div className="text-sm font-bold">{part.label}</div>
                  <div
                    style={{ color: themeColors.onSurfaceVariant }}
                    className="text-xs mt-0.5"
                  >
                    {part.subtitle || 'Supporting sheet content'}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 pt-2">
                {['Share', 'Link', 'Save', 'More'].map((act) => (
                  <div key={act} className="flex flex-col items-center gap-1">
                    <div
                      style={{
                        backgroundColor: themeColors.primaryContainer,
                        color: themeColors.primary,
                      }}
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                    >
                      <Share2 size={14} />
                    </div>
                    <span className="text-[10px] font-medium">{act}</span>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'dialog':
          return (
            <div
              style={{
                backgroundColor: themeColors.surfaceContainer,
                borderRadius: `${radiusValue(24, part.customRadius)}px`,
                color: themeColors.onSurface,
              }}
              className="w-full h-full p-5 shadow-lg border border-black/5 flex flex-col justify-between"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <Info size={20} style={{ color: themeColors.primary }} />
                <div className="text-lg font-semibold leading-tight">
                  {part.label || 'Confirm'}
                </div>
                <div
                  style={{ color: themeColors.onSurfaceVariant }}
                  className="text-xs w-full text-left pt-1"
                >
                  {part.subtitle || 'Do you want to continue?'}
                </div>
              </div>
              <div
                style={{ color: themeColors.primary }}
                className="flex items-center justify-end gap-5 text-xs font-bold pt-2"
              >
                <span>Cancel</span>
                <span>OK</span>
              </div>
            </div>
          );

        case 'snackbar':
          return (
            <div
              style={{
                backgroundColor: '#2D322E',
                color: '#F1F4F0',
                borderRadius: `${radiusValue(10, part.customRadius)}px`,
              }}
              className="w-full h-full px-4 flex items-center justify-between shadow-lg text-xs"
            >
              <span className="font-medium">{part.label || 'Saved'}</span>
              <span
                style={{ color: '#8ED89C' }}
                className="font-bold cursor-pointer"
              >
                {part.subtitle || 'Undo'}
              </span>
            </div>
          );

        // ======================= INPUTS =======================
        case 'text_field':
          return (
            <div
              style={{
                backgroundColor:
                  st === 'filled' ? themeColors.surfaceContainerHigh : 'transparent',
                borderColor: themeColors.outline,
                borderRadius: `${radiusValue(12, part.customRadius)}px`,
                color: themeColors.onSurface,
              }}
              className="w-full h-full px-3.5 py-1.5 border-[1.5px] flex items-center justify-between relative"
            >
              <div className="flex flex-col justify-center">
                <span
                  style={{ color: themeColors.primary }}
                  className="text-[10px] font-semibold leading-none"
                >
                  {part.label || 'Label'}
                </span>
                <span className="text-xs font-medium mt-1">
                  {part.subtitle || 'Input text'}
                </span>
              </div>
              <X size={14} style={{ color: themeColors.onSurfaceVariant }} />
            </div>
          );

        case 'dropdown':
          return (
            <div
              style={{
                backgroundColor: themeColors.surfaceContainerHigh,
                borderColor: themeColors.outline,
                borderRadius: `${radiusValue(12, part.customRadius)}px`,
                color: themeColors.onSurface,
              }}
              className="w-full h-full px-3.5 border flex items-center justify-between text-xs font-medium"
            >
              <div>
                <div
                  style={{ color: themeColors.onSurfaceVariant }}
                  className="text-[9px]"
                >
                  {part.label || 'Category'}
                </div>
                <div className="font-semibold">
                  {part.subtitle || 'Select option'}
                </div>
              </div>
              <ChevronDown size={15} style={{ color: themeColors.onSurfaceVariant }} />
            </div>
          );

        case 'switch': {
          const isOn = part.checked ?? true;
          return (
            <div
              style={{ color: themeColors.onSurface }}
              className="w-full h-full flex items-center justify-between gap-3 px-1 select-none"
            >
              <span className="text-xs font-medium truncate">
                {part.label || 'Notifications'}
              </span>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  updatePartById(scr.id, part.id, { checked: !isOn });
                }}
                style={{
                  backgroundColor: isOn
                    ? themeColors.primary
                    : themeColors.surfaceContainerHigh,
                  borderColor: isOn ? themeColors.primary : themeColors.outline,
                }}
                className="w-12 h-7 rounded-full p-0.5 border flex items-center transition-all flex-shrink-0 cursor-pointer"
              >
                <div
                  style={{
                    backgroundColor: isOn ? '#FFFFFF' : themeColors.onSurfaceVariant,
                    color: themeColors.primary,
                  }}
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform ${
                    isOn ? 'translate-x-5' : 'translate-x-0'
                  }`}
                >
                  {isOn && <Check size={12} strokeWidth={3} />}
                </div>
              </div>
            </div>
          );
        }

        case 'checkbox': {
          const isOn = part.checked ?? true;
          return (
            <div
              onClick={(e) => {
                if (inPlayMode || isSelected) {
                  e.stopPropagation();
                  updatePartById(scr.id, part.id, { checked: !isOn });
                }
              }}
              style={{ color: themeColors.onSurface }}
              className="w-full h-full flex items-center gap-2.5 px-1 select-none"
            >
              <div
                style={{
                  backgroundColor: isOn ? themeColors.primary : 'transparent',
                  borderColor: isOn ? themeColors.primary : themeColors.onSurfaceVariant,
                  color: themeColors.onPrimary,
                }}
                className="w-5 h-5 rounded-[5px] border-2 flex items-center justify-center flex-shrink-0"
              >
                {isOn && <Check size={13} strokeWidth={3} />}
              </div>
              <span className="text-xs font-medium truncate">
                {part.label || 'Checkbox'}
              </span>
            </div>
          );
        }

        case 'radio_button': {
          const isOn = part.checked ?? true;
          return (
            <div
              onClick={(e) => {
                if (inPlayMode || isSelected) {
                  e.stopPropagation();
                  updatePartById(scr.id, part.id, { checked: !isOn });
                }
              }}
              style={{ color: themeColors.onSurface }}
              className="w-full h-full flex items-center gap-2.5 px-1 select-none"
            >
              <div
                style={{
                  borderColor: isOn ? themeColors.primary : themeColors.onSurfaceVariant,
                }}
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
              >
                {isOn && (
                  <div
                    style={{ backgroundColor: themeColors.primary }}
                    className="w-2.5 h-2.5 rounded-full"
                  />
                )}
              </div>
              <span className="text-xs font-medium truncate">
                {part.label || 'Option'}
              </span>
            </div>
          );
        }

        case 'slider': {
          const val = part.sliderValue ?? 40;
          return (
            <div
              onClick={(e) => {
                if (inPlayMode || isSelected) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = Math.max(
                    5,
                    Math.min(95, Math.round(((e.clientX - rect.left) / rect.width) * 100))
                  );
                  updatePartById(scr.id, part.id, { sliderValue: pct });
                }
              }}
              className="w-full h-full px-1 flex items-center cursor-pointer"
            >
              <div className="w-full h-5 flex items-center gap-1.5">
                <div
                  style={{
                    width: `${val}%`,
                    backgroundColor: themeColors.primary,
                  }}
                  className="h-3 rounded-l-full rounded-r-xs transition-all"
                />
                <div
                  style={{ backgroundColor: themeColors.primary }}
                  className="w-[3px] h-7 rounded-full flex-shrink-0"
                />
                <div
                  style={{
                    flex: 1,
                    backgroundColor: '#CDE4D2',
                  }}
                  className="h-3 rounded-r-full rounded-l-xs relative flex items-center justify-end pr-1.5"
                >
                  <span
                    style={{ backgroundColor: themeColors.primary }}
                    className="w-1 h-1 rounded-full"
                  />
                </div>
              </div>
            </div>
          );
        }

        case 'date_picker':
          return (
            <div
              style={{
                backgroundColor: themeColors.surfaceContainer,
                borderRadius: `${radiusValue(24, part.customRadius)}px`,
                color: themeColors.onSurface,
              }}
              className="w-full h-full p-4 shadow-md border border-black/5 flex flex-col justify-between select-none overflow-hidden"
            >
              <div>
                <div
                  style={{ color: themeColors.onSurfaceVariant }}
                  className="text-[10px] font-medium"
                >
                  Select date
                </div>
                <div className="text-xl font-semibold mt-0.5">
                  {part.label || 'Sun, Oct 11'}
                </div>
                <div className="flex items-center justify-between text-[11px] font-semibold mt-2">
                  <span className="flex items-center gap-1">
                    {part.subtitle || 'October 2026'} <ChevronDown size={12} />
                  </span>
                  <div className="flex items-center gap-3">
                    <ChevronLeft size={13} />
                    <ChevronRight size={13} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-y-1 text-center text-[10px] my-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <span key={i} className="font-bold opacity-60">
                    {d}
                  </span>
                ))}
                <span />
                <span />
                <span />
                <span />
                {Array.from({ length: 31 }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const isToday = dayNum === 11;
                  return (
                    <span
                      key={dayNum}
                      style={
                        isToday
                          ? {
                              backgroundColor: themeColors.primary,
                              color: themeColors.onPrimary,
                            }
                          : undefined
                      }
                      className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center font-medium ${
                        isToday ? 'font-bold' : ''
                      }`}
                    >
                      {dayNum}
                    </span>
                  );
                })}
              </div>

              <div
                style={{ color: themeColors.primary }}
                className="flex items-center justify-end gap-5 text-xs font-bold"
              >
                <span>Cancel</span>
                <span>OK</span>
              </div>
            </div>
          );

        case 'time_picker':
          return (
            <div
              style={{
                backgroundColor: themeColors.surfaceContainer,
                borderRadius: `${radiusValue(24, part.customRadius)}px`,
                color: themeColors.onSurface,
              }}
              className="w-full h-full p-4 shadow-md border border-black/5 flex flex-col justify-between items-center select-none"
            >
              <div
                style={{ color: themeColors.onSurfaceVariant }}
                className="w-full text-left text-[10px] font-medium"
              >
                {part.subtitle || 'Select time'}
              </div>
              <div className="flex items-center gap-2">
                <div
                  style={{
                    backgroundColor: themeColors.primaryContainer,
                    color: themeColors.onPrimaryContainer,
                  }}
                  className="px-3.5 py-2 rounded-xl text-2xl font-bold"
                >
                  09
                </div>
                <span className="text-2xl font-bold">:</span>
                <div
                  style={{
                    backgroundColor: themeColors.surfaceContainerHigh,
                    color: themeColors.onSurface,
                  }}
                  className="px-3.5 py-2 rounded-xl text-2xl font-bold"
                >
                  41
                </div>
              </div>
              <div
                style={{ backgroundColor: themeColors.surfaceContainerHigh }}
                className="w-24 h-24 rounded-full relative flex items-center justify-center"
              >
                <span className="absolute top-1 text-[9px] font-semibold">12</span>
                <span className="absolute right-1.5 text-[9px] font-semibold">3</span>
                <span className="absolute bottom-1 text-[9px] font-semibold">6</span>
                <span
                  style={{
                    backgroundColor: themeColors.primary,
                    color: themeColors.onPrimary,
                  }}
                  className="absolute left-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                >
                  9
                </span>
                <div
                  style={{ backgroundColor: themeColors.primary }}
                  className="w-8 h-0.5 -translate-x-3 rounded-full"
                />
              </div>
              <div
                style={{ color: themeColors.primary }}
                className="w-full flex items-center justify-end gap-4 text-xs font-bold"
              >
                <span>Cancel</span>
                <span>OK</span>
              </div>
            </div>
          );

        // ======================= CONTENT =======================
        case 'text':
          return (
            <div
              style={{ color: themeColors.onSurface }}
              className="w-full h-full px-1 flex flex-col justify-center"
            >
              <div
                className={`text-base leading-tight ${
                  emphasizedType ? 'font-black' : 'font-bold'
                }`}
              >
                {part.label || 'Headline text'}
              </div>
              <div
                style={{ color: themeColors.onSurfaceVariant }}
                className="text-xs mt-1 line-clamp-2"
              >
                {part.subtitle || 'Supporting body text with Material 3 Expressive typography.'}
              </div>
            </div>
          );

        case 'image':
          return (
            <div className="w-full h-full flex items-center gap-2 overflow-hidden">
              <div
                style={{
                  backgroundColor: themeColors.primaryContainer,
                  borderRadius: `${radiusValue(14, part.customRadius)}px`,
                }}
                className="flex-1 h-full relative overflow-hidden flex items-center justify-center"
              >
                {part.imageUrl ? (
                  <img
                    src={part.imageUrl}
                    alt={part.label}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={24} style={{ color: themeColors.onPrimaryContainer }} />
                )}
              </div>
              <div
                style={{
                  backgroundColor: '#DAE0D8',
                  borderRadius: `${radiusValue(14, part.customRadius)}px`,
                }}
                className="w-8 h-full"
              />
            </div>
          );

        case 'map':
          return (
            <div
              style={{
                backgroundColor: themeColors.surfaceContainer,
                borderRadius: `${radiusValue(16, part.customRadius)}px`,
              }}
              className="w-full h-full relative overflow-hidden flex items-center justify-center border border-black/5"
            >
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2.5 p-3">
                <div className="bg-black/[0.06] rounded-md" />
                <div className="bg-black/[0.06] rounded-md" />
                <div className="bg-black/[0.06] rounded-md" />
                <div className="bg-black/[0.06] rounded-md" />
                <div className="bg-black/[0.06] rounded-md" />
                <div className="bg-black/[0.06] rounded-md" />
                <div className="bg-black/[0.06] rounded-md" />
                <div className="bg-black/[0.06] rounded-md" />
                <div className="bg-black/[0.06] rounded-md" />
              </div>
              <svg
                viewBox="0 0 348 220"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <path
                  d="M0,175 Q90,195 180,165 T348,150 L348,200 Q260,180 180,195 T0,205 Z"
                  fill={themeColors.primaryContainer}
                  opacity="0.85"
                />
              </svg>
              <div
                style={{
                  backgroundColor: themeColors.primary,
                  color: themeColors.onPrimary,
                }}
                className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md"
              >
                <MapPin size={18} />
              </div>
            </div>
          );

        case 'camera':
          return (
            <div
              style={{
                backgroundColor: '#BAE6FD',
                borderRadius: `${radiusValue(26, part.customRadius)}px`,
              }}
              className="w-full h-full relative overflow-hidden flex flex-col justify-between p-3.5"
            >
              <div className="w-8 h-1 rounded-full bg-sky-700/50 mx-auto" />
              <div className="flex-1 flex items-center justify-center relative">
                <div className="w-10 h-10 rounded-full bg-amber-200/90 absolute top-3 right-8" />
                <Camera size={24} className="text-sky-900/70 relative z-10" />
              </div>
              <div className="flex items-center justify-center gap-5">
                <div className="w-7 h-7 rounded-full bg-white/60" />
                <div className="w-11 h-11 rounded-full border-4 border-white bg-white/90 shadow" />
                <div className="w-7 h-7 rounded-full bg-white/60" />
              </div>
            </div>
          );

        case 'chart':
          return (
            <div
              style={{
                backgroundColor: themeColors.surfaceContainer,
                borderRadius: `${radiusValue(20, part.customRadius)}px`,
                color: themeColors.onSurface,
              }}
              className="w-full h-full p-3.5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold">{part.label || 'Weekly Activity'}</div>
                  <div
                    style={{ color: themeColors.onSurfaceVariant }}
                    className="text-[10px]"
                  >
                    {part.subtitle || '+24% vs last week'}
                  </div>
                </div>
                <BarChart3 size={16} style={{ color: themeColors.primary }} />
              </div>
              <div className="flex-1 flex items-end justify-between gap-2 pt-3 px-1">
                {[38, 62, 48, 86, 55, 95, 72].map((h, i) => (
                  <div key={i} className="flex-1 h-full flex flex-col justify-end items-center gap-1">
                    <div
                      style={{
                        height: `${h}%`,
                        backgroundColor:
                          i === 5 ? themeColors.primary : themeColors.primaryContainer,
                      }}
                      className="w-full rounded-t-lg transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>
          );

        case 'icon':
          return (
            <div
              style={{
                backgroundColor: themeColors.primaryContainer,
                color: themeColors.primary,
                borderRadius: `${radiusValue(18, part.customRadius)}px`,
              }}
              className="w-full h-full flex items-center justify-center"
            >
              <Smile size={24} />
            </div>
          );

        case 'divider':
          return (
            <div className="w-full h-full flex items-center">
              <div
                style={{ backgroundColor: themeColors.outline }}
                className="w-full h-[1.5px] rounded-full"
              />
            </div>
          );

        // ======================= PROGRESS =======================
        case 'loading':
          return (
            <div className="w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 64 64" className="w-10 h-10">
                <path
                  d="M32 4 L58 23 L48 55 L16 55 L6 23 Z"
                  fill={themeColors.primary}
                  stroke={themeColors.primary}
                  strokeWidth="6"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          );

        case 'progress': {
          const val = part.sliderValue ?? 55;
          return (
            <div className="w-full h-full flex items-center gap-1.5 px-1">
              <div
                style={{
                  width: `${val}%`,
                  backgroundColor: themeColors.primary,
                }}
                className="h-1.5 rounded-full"
              />
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#CDE4D2',
                }}
                className="h-1.5 rounded-full"
              />
            </div>
          );
        }
      }
    };

    const startEdgeResize = (
      e: React.MouseEvent,
      edge: 'left' | 'right' | 'top' | 'bottom'
    ) => {
      e.stopPropagation();
      if (part.locked) return;
      setResizingPartState({
        screenId: scr.id,
        partId: part.id,
        edge,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        origX: part.x,
        origY: part.y,
        origW: part.width,
        origH: part.height,
      });
    };

    return (
      <div
        key={part.id}
        onMouseDown={(e) => {
          if (inPlayMode || canvasToolMode === 'hand') return;
          e.stopPropagation();
          setSelectedScreenId(scr.id);
          setSelectedPartId(part.id);
          if (part.locked) return;
          setDraggingPartState({
            screenId: scr.id,
            partId: part.id,
            startMouseX: e.clientX,
            startMouseY: e.clientY,
            origX: part.x,
            origY: part.y,
          });
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (inPlayMode) {
            executePartTriggerIfSet();
          } else {
            setSelectedScreenId(scr.id);
            setSelectedPartId(part.id);
          }
        }}
        style={{
          left: `${part.x}px`,
          top: `${part.y}px`,
          width: `${part.width}px`,
          height: `${part.height}px`,
        }}
        className={`absolute transition-shadow ${
          inPlayMode
            ? 'cursor-pointer'
            : part.locked
            ? 'cursor-not-allowed'
            : canvasToolMode === 'hand'
            ? 'cursor-grab'
            : 'cursor-grab active:cursor-grabbing'
        } ${
          isSelected
            ? 'ring-[1.5px] ring-[#23643B] rounded-[18px] z-30'
            : !inPlayMode
            ? 'hover:ring-1 hover:ring-[#23643B]/45 z-10'
            : ''
        }`}
      >
        {renderInner()}

        {/* Authentic M3E Pill-Shaped Interactive Resize Handles on all 4 edges (Exact match to Screenshots 2, 3, 4!) */}
        {isSelected && !part.locked && (
          <>
            {/* Left Vertical Pill Handle */}
            <div
              onMouseDown={(e) => startEdgeResize(e, 'left')}
              style={{
                borderColor: '#FFFFFF',
                backgroundColor: themeColors.primary,
              }}
              className="absolute -left-[4px] top-1/2 -translate-y-1/2 w-[5px] h-5 rounded-full border cursor-ew-resize z-40 shadow-xs"
              title="Drag to resize width"
            />
            {/* Right Vertical Pill Handle */}
            <div
              onMouseDown={(e) => startEdgeResize(e, 'right')}
              style={{
                borderColor: '#FFFFFF',
                backgroundColor: themeColors.primary,
              }}
              className="absolute -right-[4px] top-1/2 -translate-y-1/2 w-[5px] h-5 rounded-full border cursor-ew-resize z-40 shadow-xs"
              title="Drag to resize width"
            />
            {/* Top Horizontal Pill Handle */}
            <div
              onMouseDown={(e) => startEdgeResize(e, 'top')}
              style={{
                borderColor: '#FFFFFF',
                backgroundColor: themeColors.primary,
              }}
              className="absolute left-1/2 -top-[4px] -translate-x-1/2 w-5 h-[5px] rounded-full border cursor-ns-resize z-40 shadow-xs"
              title="Drag to resize height"
            />
            {/* Bottom Horizontal Pill Handle */}
            <div
              onMouseDown={(e) => startEdgeResize(e, 'bottom')}
              style={{
                borderColor: '#FFFFFF',
                backgroundColor: themeColors.primary,
              }}
              className="absolute left-1/2 -bottom-[4px] -translate-x-1/2 w-5 h-[5px] rounded-full border cursor-ns-resize z-40 shadow-xs"
              title="Drag to resize height"
            />
          </>
        )}
      </div>
    );
  };

  // Render authentic M3E miniature tile icon inside the Left "Parts" Catalog
  const renderCatalogMiniGraphic = (type: M3EPartType) => {
    const p = themeColors.primary;
    const pc = themeColors.primaryContainer;

    switch (type) {
      case 'button':
        return (
          <div
            style={{ borderColor: p, color: p }}
            className="w-7 h-4 rounded-md border-[1.8px] flex items-center justify-center text-[9px] font-black"
          >
            +•
          </div>
        );
      case 'icon_button':
        return (
          <div
            style={{ borderColor: p }}
            className="w-5 h-5 rounded-full border-[1.8px] flex items-center justify-center"
          >
            <div style={{ backgroundColor: p }} className="w-2 h-2 rounded-full" />
          </div>
        );
      case 'fab':
        return (
          <div
            style={{ borderColor: p, color: p }}
            className="w-5 h-5 rounded-full border-[1.8px] flex items-center justify-center font-bold text-xs"
          >
            +
          </div>
        );
      case 'split_button':
        return (
          <div className="flex items-center gap-0.5">
            <div
              style={{ borderColor: p }}
              className="w-3.5 h-4 rounded-l-md border-[1.8px]"
            />
            <div
              style={{ borderColor: p }}
              className="w-2.5 h-4 rounded-r-md border-[1.8px]"
            />
          </div>
        );
      case 'chip':
        return <Tag size={16} style={{ color: p }} />;
      case 'top_app_bar':
        return (
          <div
            style={{ borderColor: p }}
            className="w-6 h-5 rounded border-[1.8px] overflow-hidden flex flex-col"
          >
            <div style={{ backgroundColor: p }} className="h-1.5 w-full" />
          </div>
        );
      case 'navigation_bar':
        return (
          <div
            style={{ borderColor: p }}
            className="w-6 h-5 rounded border-[1.8px] overflow-hidden flex flex-col justify-end"
          >
            <div style={{ backgroundColor: p }} className="h-1.5 w-full" />
          </div>
        );
      case 'navigation_rail':
        return (
          <div
            style={{ borderColor: p }}
            className="w-6 h-5 rounded border-[1.8px] overflow-hidden flex"
          >
            <div style={{ backgroundColor: p }} className="w-2 h-full" />
          </div>
        );
      case 'toolbar':
        return (
          <div
            style={{ borderColor: p }}
            className="w-6 h-5 rounded border-[1.8px] p-0.5 flex flex-col justify-end"
          >
            <div style={{ backgroundColor: p }} className="h-1 w-full rounded-full" />
          </div>
        );
      case 'tabs':
        return (
          <div
            style={{ borderColor: p }}
            className="w-6 h-5 rounded border-[1.8px] flex flex-col"
          >
            <div className="flex h-1.5 border-b" style={{ borderColor: p }}>
              <div style={{ backgroundColor: p }} className="w-1/2 h-full" />
            </div>
          </div>
        );
      case 'search_bar':
        return <Search size={16} style={{ color: p }} />;
      case 'card':
        return (
          <div
            style={{ borderColor: p }}
            className="w-6 h-5 rounded border-[1.8px] p-0.5 flex flex-col justify-between"
          >
            <div style={{ backgroundColor: p }} className="h-1.5 w-full rounded-xs" />
            <div style={{ backgroundColor: pc }} className="h-1 w-2/3 rounded-xs" />
          </div>
        );
      case 'list_item':
        return (
          <div className="flex flex-col gap-1 w-6">
            {[1, 2, 3].map((r) => (
              <div key={r} className="flex items-center gap-1">
                <span style={{ backgroundColor: p }} className="w-1 h-1 rounded-full" />
                <span style={{ backgroundColor: p }} className="flex-1 h-[2px] rounded" />
              </div>
            ))}
          </div>
        );
      case 'box':
        return <Square size={16} style={{ color: p }} />;
      case 'bottom_sheet':
        return (
          <div
            style={{ borderColor: p }}
            className="w-6 h-5 rounded border-[1.8px] flex flex-col justify-end p-0.5"
          >
            <div style={{ borderColor: p }} className="h-2 w-full border-t-[1.8px]" />
          </div>
        );
      case 'dialog':
        return (
          <div
            style={{ borderColor: p }}
            className="w-6 h-5 rounded border-[1.8px] flex items-center justify-center"
          >
            <div style={{ backgroundColor: pc }} className="w-3 h-2 rounded-xs" />
          </div>
        );
      case 'snackbar':
        return (
          <div
            style={{ borderColor: p }}
            className="w-6 h-4 rounded border-[1.8px] flex items-center justify-end px-1"
          >
            <div style={{ backgroundColor: p }} className="w-1.5 h-1 rounded-full" />
          </div>
        );
      case 'carousel':
        return (
          <div className="flex items-center gap-0.5">
            <div style={{ borderColor: p }} className="w-4 h-5 rounded border-[1.8px]" />
            <div style={{ borderColor: p }} className="w-2 h-5 rounded border-[1.8px]" />
          </div>
        );
      case 'text_field':
        return (
          <div
            style={{ borderColor: p, color: p }}
            className="w-7 h-4 rounded border-[1.8px] px-1 flex items-center text-[9px] font-bold"
          >
            TT
          </div>
        );
      case 'dropdown':
        return (
          <div
            style={{ borderColor: p }}
            className="w-5 h-5 rounded-full border-[1.8px] flex items-center justify-center"
          >
            <ChevronDown size={11} style={{ color: p }} />
          </div>
        );
      case 'switch':
        return (
          <div
            style={{ borderColor: p }}
            className="w-7 h-4 rounded-full border-[1.8px] px-0.5 flex items-center justify-end"
          >
            <div style={{ backgroundColor: p }} className="w-2.5 h-2.5 rounded-full" />
          </div>
        );
      case 'checkbox':
        return (
          <div
            style={{ borderColor: p, color: p }}
            className="w-4 h-4 rounded-xs border-[1.8px] flex items-center justify-center"
          >
            <Check size={11} strokeWidth={3} />
          </div>
        );
      case 'radio_button':
        return (
          <div
            style={{ borderColor: p }}
            className="w-4 h-4 rounded-full border-[1.8px] flex items-center justify-center"
          >
            <div style={{ backgroundColor: p }} className="w-2 h-2 rounded-full" />
          </div>
        );
      case 'slider':
        return (
          <div className="w-7 flex items-center gap-0.5">
            <div style={{ backgroundColor: p }} className="h-1.5 w-3.5 rounded-l-full" />
            <div style={{ backgroundColor: p }} className="w-0.5 h-3.5 rounded-full" />
            <div style={{ backgroundColor: pc }} className="h-1.5 flex-1 rounded-r-full" />
          </div>
        );
      case 'date_picker':
        return <Calendar size={16} style={{ color: p }} />;
      case 'time_picker':
        return <Clock size={16} style={{ color: p }} />;
      case 'text':
        return <Type size={16} style={{ color: p }} />;
      case 'image':
        return <ImageIcon size={16} style={{ color: p }} />;
      case 'map':
        return <MapPin size={16} style={{ color: p }} />;
      case 'camera':
        return <Camera size={16} style={{ color: p }} />;
      case 'chart':
        return <BarChart3 size={16} style={{ color: p }} />;
      case 'icon':
        return <Smile size={16} style={{ color: p }} />;
      case 'divider':
        return <div style={{ backgroundColor: p }} className="w-6 h-[2px] rounded-full" />;
      case 'loading':
        return <Loader2 size={16} style={{ color: p }} />;
      case 'progress':
        return (
          <div className="w-7 h-1.5 rounded-full overflow-hidden flex bg-black/10">
            <div style={{ backgroundColor: p }} className="w-2/3 h-full rounded-full" />
          </div>
        );
    }
  };

  // Global Mouse Move / Up for smooth part dragging, edge resizing, and canvas panning
  const handleWorkspaceMouseMove = (e: React.MouseEvent) => {
    const scale = canvasZoom / 100;

    // 1. Canvas Panning
    if (panDragState) {
      const dx = e.clientX - panDragState.startX;
      const dy = e.clientY - panDragState.startY;
      setCanvasPan({
        x: panDragState.origX + dx,
        y: panDragState.origY + dy,
      });
      return;
    }

    // 2. Interactive Edge Resizing
    if (resizingPartState) {
      const dx = Math.round((e.clientX - resizingPartState.startMouseX) / scale);
      const dy = Math.round((e.clientY - resizingPartState.startMouseY) / scale);

      let nextX = resizingPartState.origX;
      let nextY = resizingPartState.origY;
      let nextW = resizingPartState.origW;
      let nextH = resizingPartState.origH;

      if (resizingPartState.edge === 'right') {
        nextW = Math.max(36, Math.min(380 - nextX, resizingPartState.origW + dx));
      } else if (resizingPartState.edge === 'left') {
        const maxDelta = resizingPartState.origW - 36;
        const clampedDx = Math.max(-resizingPartState.origX, Math.min(maxDelta, dx));
        nextX = resizingPartState.origX + clampedDx;
        nextW = resizingPartState.origW - clampedDx;
      } else if (resizingPartState.edge === 'bottom') {
        nextH = Math.max(20, Math.min(776 - nextY, resizingPartState.origH + dy));
      } else if (resizingPartState.edge === 'top') {
        const maxDelta = resizingPartState.origH - 20;
        const clampedDy = Math.max(-resizingPartState.origY, Math.min(maxDelta, dy));
        nextY = resizingPartState.origY + clampedDy;
        nextH = resizingPartState.origH - clampedDy;
      }

      setScreens((prev) =>
        prev.map((s) => {
          if (s.id !== resizingPartState.screenId) return s;
          return {
            ...s,
            parts: s.parts.map((p) =>
              p.id === resizingPartState.partId
                ? { ...p, x: nextX, y: nextY, width: nextW, height: nextH }
                : p
            ),
          };
        })
      );
      return;
    }

    // 3. Part Dragging
    if (!draggingPartState) return;
    const dx = (e.clientX - draggingPartState.startMouseX) / scale;
    const dy = (e.clientY - draggingPartState.startMouseY) / scale;

    let nextX = Math.round(draggingPartState.origX + dx);
    let nextY = Math.round(draggingPartState.origY + dy);

    nextX = Math.max(0, Math.min(340, nextX));
    nextY = Math.max(0, Math.min(736, nextY));

    let gX: number | null = null;
    let gY: number | null = null;
    if (Math.abs(nextX - 16) < 6) {
      nextX = 16;
      gX = 16;
    } else if (Math.abs(nextX + (selectedPart?.width || 0) / 2 - 190) < 6) {
      nextX = Math.round(190 - (selectedPart?.width || 0) / 2);
      gX = 190;
    }

    if (Math.abs(nextY - 72) < 5) {
      nextY = 72;
      gY = 72;
    }

    setSnapGuideX(gX);
    setSnapGuideY(gY);

    setScreens((prev) =>
      prev.map((s) => {
        if (s.id !== draggingPartState.screenId) return s;
        return {
          ...s,
          parts: s.parts.map((p) =>
            p.id === draggingPartState.partId ? { ...p, x: nextX, y: nextY } : p
          ),
        };
      })
    );
  };

  const handleWorkspaceMouseUp = () => {
    if (panDragState) setPanDragState(null);
    if (resizingPartState) setResizingPartState(null);
    if (draggingPartState) {
      setDraggingPartState(null);
      setSnapGuideX(null);
      setSnapGuideY(null);
    }
  };

  // Interactive Full-Screen Play Mode
  if (isPlayPreviewMode) {
    const activePlayScr =
      screens.find((s) => s.id === playActiveScreenId) || screens[0];

    return (
      <div className="fixed inset-0 z-50 bg-[#EFF2ED] flex items-center justify-center select-none font-sans">
        <div
          style={{
            backgroundColor: themeColors.surface,
            color: themeColors.onSurface,
          }}
          className="w-[392px] h-[796px] rounded-[46px] border-[6px] border-[#1D1B20] shadow-2xl relative overflow-hidden"
        >
          {activePlayScr.parts.map((part) => renderM3EPartNode(activePlayScr, part, true))}
        </div>

        <div className="fixed bottom-5 right-5 w-44 rounded-2xl bg-white border border-neutral-200 shadow-xl p-2 space-y-1">
          <button
            type="button"
            onClick={() => setPlayActiveScreenId(screens[0]?.id || 'screen_home')}
            className="w-full px-3 py-1.5 rounded-xl hover:bg-neutral-100 text-xs font-medium text-neutral-600 flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back</span>
          </button>

          <div className="py-1 border-y border-neutral-100 space-y-1">
            {screens.map((s) => {
              const active = s.id === activePlayScr.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setPlayActiveScreenId(s.id)}
                  style={
                    active
                      ? {
                          backgroundColor: themeColors.primaryContainer,
                          color: themeColors.onPrimaryContainer,
                        }
                      : undefined
                  }
                  className="w-full px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Smartphone size={13} />
                  <span className="truncate">{s.name}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsPlayPreviewMode(false)}
            className="w-full px-3 py-1.5 rounded-xl hover:bg-neutral-100 text-xs font-medium text-neutral-700 flex items-center gap-2 cursor-pointer"
          >
            <X size={13} />
            <span>Close</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseMove={handleWorkspaceMouseMove}
      onMouseUp={handleWorkspaceMouseUp}
      className="h-screen w-screen overflow-hidden flex bg-[#EFF2ED] text-[#181D18] select-none relative"
      style={{
        fontFamily:
          typeface === 'roboto_serif'
            ? 'Georgia, serif'
            : typeface === 'roboto'
            ? 'Roboto, sans-serif'
            : '"Plus Jakarta Sans", Inter, sans-serif',
      }}
    >
      {/* Hidden File Input for Card / Carousel Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file || !selectedPart) return;
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              if (selectedPart.type === 'carousel') {
                const idx = selectedPart.activeCarouselIndex ?? 0;
                const items = [...(selectedPart.carouselItems || [])];
                if (items[idx]) {
                  items[idx] = { ...items[idx], imageUrl: reader.result };
                  updateSelectedPart({ carouselItems: items });
                }
              } else {
                updateSelectedPart({ imageUrl: reader.result });
              }
            }
          };
          reader.readAsDataURL(file);
        }}
      />

      {/* Action Feedback Toast */}
      {actionFeedbackToast && (
        <div
          style={{ backgroundColor: '#1E231E', color: '#F1F4F0' }}
          className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2 pointer-events-none"
        >
          <span
            style={{ backgroundColor: themeColors.primaryContainer }}
            className="w-2 h-2 rounded-full"
          />
          <span>{actionFeedbackToast}</span>
        </div>
      )}

      {/* ===================================================================== */}
      {/* OPTIONAL SLIDE-OUT MOBILE DASHBOARD PROJECT SWITCHER DRAWER           */}
      {/* ===================================================================== */}
      {showAppForgeDrawer && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex"
          onClick={() => setShowAppForgeDrawer(false)}
        >
          <div
            className="w-72 h-full bg-white border-r border-neutral-200 p-4 flex flex-col justify-between shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-3 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <div
                    style={{ backgroundColor: themeColors.primary }}
                    className="w-8 h-8 rounded-xl text-white flex items-center justify-center font-black"
                  >
                    <Boxes size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-black">Mobile Dashboard</div>
                    <div className="text-[10px] text-neutral-400">Switch App Workspace</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAppForgeDrawer(false)}
                  className="p-1 rounded-lg hover:bg-neutral-100 cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {[
                { id: 'customize_app', label: 'Customize App (M3E Canvas)', active: true },
                { id: 'custom_ecommerce', label: 'Custom E-commerce (30 Screens)' },
                { id: 'food_grocery_delivery', label: 'FreshPulse Food & Grocery' },
                { id: 'book_store', label: 'Book Store (24 Screens)' },
                { id: 'super_vpn', label: 'Super VPN' },
                { id: 'cloth_shop', label: 'Cloth Shop App' },
                { id: 'admin_app', label: 'Admin App' },
                { id: 'order_manage', label: 'Order manage App' },
                { id: 'cloth_shop_admin', label: 'Cloth Shop Admin' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setShowAppForgeDrawer(false);
                    if (item.id !== 'customize_app' && onSwitchProject) {
                      onSwitchProject(item.id);
                    }
                  }}
                  style={
                    item.active
                      ? {
                          backgroundColor: themeColors.primaryContainer,
                          color: themeColors.onPrimaryContainer,
                        }
                      : undefined
                  }
                  className="w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between hover:bg-neutral-100 transition cursor-pointer"
                >
                  <span className="truncate">{item.label}</span>
                  <ChevronRight size={13} />
                </button>
              ))}

              {customProjects.map((cp) => (
                <button
                  key={cp.id}
                  type="button"
                  onClick={() => {
                    setShowAppForgeDrawer(false);
                    if (onSwitchProject) onSwitchProject(cp.id);
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between hover:bg-neutral-100 transition cursor-pointer"
                >
                  <span className="truncate">{cp.name}</span>
                  <ChevronRight size={13} />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-100 text-[11px] text-neutral-400 flex items-center justify-between">
              <span>M3E Expressive Canvas</span>
              <a
                href="https://lnkiai.github.io/m3e-canvas/"
                target="_blank"
                rel="noreferrer"
                className="font-bold flex items-center gap-1"
                style={{ color: themeColors.primary }}
              >
                <span>Live Ref</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 1. FAR-LEFT ICON RAIL                                                 */}
      {/* ===================================================================== */}
      <div className="w-12 h-full bg-[#F8FAF6] border-r border-neutral-200/80 flex flex-col items-center justify-between py-3 z-20 flex-shrink-0">
        <div className="flex flex-col items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowAppForgeDrawer(true)}
            title="Switch Mobile Dashboard Project"
            style={{ backgroundColor: themeColors.primary, color: '#FFFFFF' }}
            className="w-7 h-7 rounded-full flex items-center justify-center mb-2 shadow-2xs cursor-pointer"
          >
            <Layers size={14} />
          </button>

          <button
            type="button"
            onClick={() => {
              setLeftRailTab('add');
              setLeftDrawerCollapsed(false);
            }}
            style={
              leftRailTab === 'add' && !leftDrawerCollapsed
                ? {
                    backgroundColor: themeColors.primaryContainer,
                    color: themeColors.onPrimaryContainer,
                  }
                : undefined
            }
            className="w-9 h-9 rounded-xl flex items-center justify-center transition cursor-pointer text-neutral-700 hover:bg-neutral-200/60"
            title="Parts (+)"
          >
            <div
              style={{ backgroundColor: themeColors.primary, color: '#FFFFFF' }}
              className="w-4 h-4 rounded-xs flex items-center justify-center"
            >
              <Plus size={12} strokeWidth={3} />
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setLeftRailTab('layers');
              setLeftDrawerCollapsed(false);
            }}
            style={
              leftRailTab === 'layers' && !leftDrawerCollapsed
                ? {
                    backgroundColor: themeColors.primaryContainer,
                    color: themeColors.onPrimaryContainer,
                  }
                : undefined
            }
            className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-600 hover:bg-neutral-200/60 cursor-pointer"
            title="Layers & Screens"
          >
            <Layers size={17} />
          </button>

          <div className="w-5 h-px bg-neutral-200 my-0.5" />

          <button
            type="button"
            onClick={() => {
              setLeftRailTab('color');
              setLeftDrawerCollapsed(false);
            }}
            style={
              leftRailTab === 'color' && !leftDrawerCollapsed
                ? {
                    backgroundColor: themeColors.primaryContainer,
                    color: themeColors.onPrimaryContainer,
                  }
                : undefined
            }
            className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-600 hover:bg-neutral-200/60 cursor-pointer"
            title="Color Theme & Palettes"
          >
            <Palette size={17} />
          </button>

          <button
            type="button"
            onClick={() => {
              setLeftRailTab('shape');
              setLeftDrawerCollapsed(false);
            }}
            style={
              leftRailTab === 'shape' && !leftDrawerCollapsed
                ? {
                    backgroundColor: themeColors.primaryContainer,
                    color: themeColors.onPrimaryContainer,
                  }
                : undefined
            }
            className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-600 hover:bg-neutral-200/60 cursor-pointer"
            title="Corner Roundness"
          >
            <Maximize2 size={16} />
          </button>

          <button
            type="button"
            onClick={() => {
              setLeftRailTab('type');
              setLeftDrawerCollapsed(false);
            }}
            style={
              leftRailTab === 'type' && !leftDrawerCollapsed
                ? {
                    backgroundColor: themeColors.primaryContainer,
                    color: themeColors.onPrimaryContainer,
                  }
                : undefined
            }
            className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-600 hover:bg-neutral-200/60 cursor-pointer"
            title="Typeface"
          >
            <Type size={17} />
          </button>

          <button
            type="button"
            onClick={() => {
              setLeftRailTab('motion');
              setLeftDrawerCollapsed(false);
            }}
            style={
              leftRailTab === 'motion' && !leftDrawerCollapsed
                ? {
                    backgroundColor: themeColors.primaryContainer,
                    color: themeColors.onPrimaryContainer,
                  }
                : undefined
            }
            className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-600 hover:bg-neutral-200/60 cursor-pointer"
            title="Motion Scheme"
          >
            <RefreshCw size={16} />
          </button>

          <div className="w-5 h-px bg-neutral-200 my-0.5" />

          <button
            type="button"
            onClick={() => {
              setLeftRailTab('ai');
              setLeftDrawerCollapsed(false);
            }}
            style={
              leftRailTab === 'ai' && !leftDrawerCollapsed
                ? {
                    backgroundColor: themeColors.primaryContainer,
                    color: themeColors.onPrimaryContainer,
                  }
                : undefined
            }
            className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-600 hover:bg-neutral-200/60 cursor-pointer"
            title="AI Settings"
          >
            <Sparkles size={17} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setUiLang((prev) => (prev === 'en' ? 'zh' : prev === 'zh' ? 'ko' : 'en'))
            }
            className="w-8 h-8 rounded-xl hover:bg-neutral-200/60 text-neutral-600 flex items-center justify-center text-[11px] font-bold cursor-pointer"
            title="Switch Language"
          >
            文A
          </button>
          <a
            href="https://github.com/lnkiai/m3e-canvas"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-xl hover:bg-neutral-200/60 text-neutral-600 flex items-center justify-center cursor-pointer"
            title="m3e-canvas GitHub"
          >
            <Globe size={15} />
          </a>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. LEFT "PARTS" / "LAYERS" DRAWER PANEL                               */}
      {/* ===================================================================== */}
      {!leftDrawerCollapsed ? (
        <div className="w-[242px] h-full bg-[#F8FAF6] border-r border-neutral-200/80 flex flex-col z-10 flex-shrink-0">
          {leftRailTab === 'add' && (
            <>
              <div className="p-3 pb-2 space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-neutral-800">Parts</span>
                  <button
                    type="button"
                    onClick={() => setLeftDrawerCollapsed(true)}
                    className="p-1 rounded-lg hover:bg-neutral-200/60 text-neutral-500 cursor-pointer"
                    title="Collapse Left Panel (Full Screen Canvas)"
                  >
                    <PanelLeftClose size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#ECEFE9] text-neutral-600">
                  <Search size={13} className="text-neutral-500" />
                  <input
                    type="text"
                    value={partsSearchQuery}
                    onChange={(e) => setPartsSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="w-full bg-transparent text-xs focus:outline-none placeholder:text-neutral-500"
                  />
                  {partsSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setPartsSearchQuery('')}
                      className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-3 pb-6 space-y-4">
                {(
                  [
                    ['actions', 'Actions', Hand],
                    ['navigation', 'Navigation', Compass],
                    ['containment', 'Containment', Square],
                    ['inputs', 'Inputs', Sliders],
                    ['content', 'Content', ImageIcon],
                    ['progress', 'Progress', Loader2],
                  ] as const
                ).map(([catId, catTitle, CatIcon]) => {
                  const items = M3E_CATALOG.filter(
                    (i) =>
                      i.category === catId &&
                      (!partsSearchQuery.trim() ||
                        i.label.toLowerCase().includes(partsSearchQuery.toLowerCase()))
                  );
                  if (items.length === 0) return null;
                  const isCollapsed = !!collapsedCategories[catId];

                  return (
                    <div key={catId} className="space-y-2">
                      <button
                        type="button"
                        onClick={() =>
                          setCollapsedCategories((prev) => ({
                            ...prev,
                            [catId]: !prev[catId],
                          }))
                        }
                        className="w-full flex items-center justify-between text-[11px] font-bold text-neutral-700 px-1 py-0.5 cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <CatIcon size={12} className="text-neutral-600" />
                          <span>{catTitle}</span>
                        </span>
                        {isCollapsed ? (
                          <ChevronDown size={12} className="text-neutral-400" />
                        ) : (
                          <ChevronUp size={12} className="text-neutral-400" />
                        )}
                      </button>

                      {!isCollapsed && (
                        <div className="grid grid-cols-2 gap-2">
                          {items.map((item) => (
                            <div
                              key={item.type}
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData('application/x-m3e-part', item.type);
                              }}
                              onClick={() =>
                                handleAddPartToScreen(selectedScreen.id, item.type)
                              }
                              className="h-[68px] rounded-2xl bg-[#F0F3EE] hover:bg-[#E4EAE1] border border-transparent hover:border-neutral-300 flex flex-col items-center justify-center gap-1.5 p-2 cursor-grab active:cursor-grabbing transition"
                            >
                              <div className="h-6 flex items-center justify-center">
                                {renderCatalogMiniGraphic(item.type)}
                              </div>
                              <span className="text-[11px] font-medium text-neutral-800 text-center leading-tight">
                                {item.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {leftRailTab === 'layers' && (
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-neutral-700">Screens & Layers</span>
                <button
                  type="button"
                  onClick={handleAddNewScreen}
                  style={{
                    backgroundColor: themeColors.primaryContainer,
                    color: themeColors.onPrimaryContainer,
                  }}
                  className="px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={12} />
                  <span>Add Screen</span>
                </button>
              </div>

              {screens.map((scr) => {
                const isCurrScr = scr.id === selectedScreenId;
                return (
                  <div key={scr.id} className="space-y-1">
                    <div
                      onClick={() => {
                        setSelectedScreenId(scr.id);
                        setSelectedPartId(null);
                      }}
                      style={
                        isCurrScr && !selectedPartId
                          ? {
                              backgroundColor: themeColors.primaryContainer,
                              color: themeColors.onPrimaryContainer,
                            }
                          : undefined
                      }
                      className="px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between cursor-pointer hover:bg-neutral-200/50 group"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Smartphone size={13} />
                        <span className="truncate">{scr.name}</span>
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicateScreen(scr.id);
                          }}
                          className="p-1 rounded hover:bg-black/10 opacity-60 hover:opacity-100 cursor-pointer"
                          title="Duplicate Screen"
                        >
                          <Copy size={11} />
                        </button>
                        {screens.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveScreen(scr.id);
                            }}
                            className="p-1 rounded hover:bg-rose-100 text-rose-600 opacity-60 hover:opacity-100 cursor-pointer"
                            title="Remove Screen"
                          >
                            <Trash2 size={11} />
                          </button>
                        )}
                      </div>
                    </div>

                    {isCurrScr && (
                      <div className="pl-3 space-y-1">
                        {scr.parts.map((p) => {
                          const isThisPart = p.id === selectedPartId;
                          return (
                            <div
                              key={p.id}
                              onClick={() => {
                                setSelectedScreenId(scr.id);
                                setSelectedPartId(p.id);
                              }}
                              style={
                                isThisPart
                                  ? {
                                      backgroundColor: themeColors.primaryContainer,
                                      color: themeColors.onPrimaryContainer,
                                    }
                                  : undefined
                              }
                              className="px-3 py-1.5 rounded-xl text-xs font-medium flex items-center justify-between cursor-pointer hover:bg-neutral-200/50"
                            >
                              <span className="truncate capitalize">
                                {p.type.replace(/_/g, ' ')}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  commitScreensChange((prev) =>
                                    prev.map((s) =>
                                      s.id === scr.id
                                        ? {
                                            ...s,
                                            parts: s.parts.filter((it) => it.id !== p.id),
                                          }
                                        : s
                                    )
                                  );
                                }}
                                className="opacity-50 hover:opacity-100 text-neutral-500 cursor-pointer"
                              >
                                <X size={12} />
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

          {leftRailTab === 'color' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-700">Brightness</span>
                <select
                  value={brightness}
                  onChange={(e) => setBrightness(e.target.value as 'light' | 'dark')}
                  className="px-2.5 py-1 rounded-lg bg-neutral-200/70 text-xs font-semibold"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-700">Contrast</span>
                <select
                  value={contrast}
                  onChange={(e) =>
                    setContrast(e.target.value as 'standard' | 'medium' | 'high')
                  }
                  className="px-2.5 py-1 rounded-lg bg-neutral-200/70 text-xs font-semibold"
                >
                  <option value="standard">Standard</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="pt-2 border-t border-neutral-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-600">
                  <span>Palettes</span>
                  <span className="text-[11px] text-neutral-400">Custom</span>
                </div>

                {(Object.values(M3E_PALETTES) as M3EPaletteTheme[]).map((pal) => {
                  const active = pal.id === paletteId;
                  return (
                    <button
                      key={pal.id}
                      type="button"
                      onClick={() => setPaletteId(pal.id)}
                      style={
                        active
                          ? {
                              backgroundColor: pal.primaryContainer,
                              borderColor: pal.primary,
                            }
                          : undefined
                      }
                      className={`w-full px-3 py-2 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        active ? 'font-bold' : 'border-transparent hover:bg-neutral-200/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full overflow-hidden grid grid-cols-2 border border-black/10">
                          <span style={{ backgroundColor: pal.primary }} className="row-span-2" />
                          <span style={{ backgroundColor: pal.primaryContainer }} />
                          <span style={{ backgroundColor: pal.secondaryContainer }} />
                        </div>
                        <span className="text-xs">{pal.name}</span>
                      </div>
                      {active && <Check size={14} style={{ color: pal.primary }} />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-neutral-200 space-y-1.5">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-semibold">Dynamic color</span>
                  <input
                    type="checkbox"
                    checked={dynamicColorEnabled}
                    onChange={(e) => setDynamicColorEnabled(e.target.checked)}
                    className="accent-emerald-700"
                  />
                </label>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Allow the phone&apos;s wallpaper colors and theme as the palette.
                </p>
              </div>
            </div>
          )}

          {leftRailTab === 'shape' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="text-xs font-bold text-neutral-600">Corner roundness</div>
              {(
                [
                  ['square', 'Square', 'rounded-none'],
                  ['rounded', 'Rounded', 'rounded-xl'],
                  ['full', 'Full', 'rounded-full'],
                ] as const
              ).map(([id, label, previewCls]) => {
                const active = cornerRoundness === id;
                return (
                  <div
                    key={id}
                    onClick={() => setCornerRoundness(id)}
                    style={
                      active
                        ? {
                            backgroundColor: themeColors.primaryContainer,
                            borderColor: themeColors.primary,
                          }
                        : undefined
                    }
                    className="p-3 rounded-2xl border border-neutral-200 cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>{label}</span>
                      {active && <Check size={14} />}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        style={{ backgroundColor: themeColors.primary }}
                        className={`w-12 h-5 ${previewCls}`}
                      />
                      <span
                        style={{ borderColor: themeColors.outline }}
                        className={`flex-1 h-5 border ${previewCls}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {leftRailTab === 'type' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              <div className="text-xs font-bold text-neutral-600">Typeface</div>
              {(
                [
                  ['roboto', 'Roboto'],
                  ['roboto_flex', 'Roboto Flex'],
                  ['roboto_serif', 'Roboto Serif'],
                  ['system', 'System'],
                ] as const
              ).map(([id, label]) => {
                const active = typeface === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTypeface(id)}
                    style={
                      active
                        ? {
                            backgroundColor: themeColors.primaryContainer,
                            color: themeColors.onPrimaryContainer,
                          }
                        : undefined
                    }
                    className="w-full p-2.5 rounded-xl flex items-center justify-between text-xs font-semibold hover:bg-neutral-200/50 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-white border border-neutral-200 flex items-center justify-center font-bold">
                        Aa
                      </span>
                      <span>{label}</span>
                    </div>
                    {active && <Check size={14} />}
                  </button>
                );
              })}

              <div className="pt-3 border-t border-neutral-200 space-y-1.5">
                <label className="flex items-center justify-between text-xs font-semibold cursor-pointer">
                  <span>Emphasized</span>
                  <input
                    type="checkbox"
                    checked={emphasizedType}
                    onChange={(e) => setEmphasizedType(e.target.checked)}
                    className="accent-emerald-700"
                  />
                </label>
              </div>
            </div>
          )}

          {leftRailTab === 'motion' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-xs font-bold text-neutral-600">Motion scheme</div>
              <div className="grid grid-cols-2 gap-2">
                {(['standard', 'expressive'] as const).map((m) => {
                  const active = motionScheme === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMotionScheme(m)}
                      style={
                        active
                          ? {
                              backgroundColor: themeColors.primaryContainer,
                              borderColor: themeColors.primary,
                            }
                          : undefined
                      }
                      className="p-3 rounded-2xl border border-neutral-200 flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <svg viewBox="0 0 60 28" className="w-12 h-6">
                        <path
                          d={
                            m === 'expressive'
                              ? 'M4,24 C18,-4 32,30 56,6'
                              : 'M4,24 C20,22 36,8 56,6'
                          }
                          fill="none"
                          stroke={themeColors.primary}
                          strokeWidth="2.5"
                        />
                      </svg>
                      <span className="text-xs font-bold capitalize">{m}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {leftRailTab === 'ai' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="text-xs font-bold text-neutral-600">AI settings</div>
              <div className="grid grid-cols-4 gap-1.5">
                {(['gemini', 'openai', 'claude', 'custom'] as const).map((prov) => (
                  <button
                    key={prov}
                    type="button"
                    onClick={() => setAiProvider(prov)}
                    style={
                      aiProvider === prov
                        ? {
                            backgroundColor: themeColors.primary,
                            color: themeColors.onPrimary,
                          }
                        : undefined
                    }
                    className="h-9 rounded-xl bg-neutral-200/70 text-[10px] font-bold uppercase flex items-center justify-center cursor-pointer"
                  >
                    {prov.slice(0, 3)}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-[11px] text-neutral-500 mb-1">Model ID</label>
                <input
                  type="text"
                  value={aiModelId}
                  onChange={(e) => setAiModelId(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-neutral-200/70 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] text-neutral-500 mb-1">Base URL</label>
                <input
                  type="text"
                  value={aiBaseUrl}
                  onChange={(e) => setAiBaseUrl(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-neutral-200/70 text-xs font-mono"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Floating Expand Left Panel Button when in Full-Screen Canvas Mode */
        <button
          type="button"
          onClick={() => setLeftDrawerCollapsed(false)}
          className="fixed top-3 left-15 z-30 w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-700 hover:bg-neutral-100 cursor-pointer"
          title="Expand Left Parts Panel"
        >
          <PanelLeftOpen size={15} />
        </button>
      )}

      {/* ===================================================================== */}
      {/* 3. FULL-SCREEN INFINITE CANVAS STAGE                                  */}
      {/* ===================================================================== */}
      <div
        onMouseDown={(e) => {
          if (canvasToolMode === 'hand' || e.button === 1) {
            setPanDragState({
              startX: e.clientX,
              startY: e.clientY,
              origX: canvasPan.x,
              origY: canvasPan.y,
            });
          }
        }}
        className={`flex-1 h-full relative overflow-auto flex flex-col ${
          canvasToolMode === 'hand'
            ? panDragState
              ? 'cursor-grabbing'
              : 'cursor-grab'
            : ''
        }`}
      >
        {/* Top Floating 3-Group Toolbar Pill */}
        <div className="sticky top-3 z-30 mx-auto flex items-center gap-2">
          {/* Group 1: Pointer | Hand */}
          <div className="flex items-center gap-0.5 p-1 rounded-full bg-white/95 backdrop-blur border border-neutral-200/90 shadow-xs">
            <button
              type="button"
              onClick={() => setCanvasToolMode('select')}
              style={
                canvasToolMode === 'select'
                  ? { backgroundColor: themeColors.primary, color: '#FFFFFF' }
                  : undefined
              }
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-700 cursor-pointer transition"
              title="Select & Resize Tool"
            >
              <MousePointer2 size={14} />
            </button>
            <button
              type="button"
              onClick={() => setCanvasToolMode('hand')}
              style={
                canvasToolMode === 'hand'
                  ? { backgroundColor: themeColors.primary, color: '#FFFFFF' }
                  : undefined
              }
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-700 cursor-pointer transition"
              title="Hand Pan Canvas Tool"
            >
              <Hand size={14} />
            </button>
          </div>

          {/* Group 2: Add Screen | Play Preview */}
          <div className="flex items-center gap-0.5 p-1 rounded-full bg-white/95 backdrop-blur border border-neutral-200/90 shadow-xs">
            <button
              type="button"
              onClick={handleAddNewScreen}
              className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-700 cursor-pointer"
              title="Add New Screen (+)"
            >
              <Plus size={15} />
            </button>
            <button
              type="button"
              onClick={() => {
                setPlayActiveScreenId(selectedScreenId);
                setIsPlayPreviewMode(true);
              }}
              className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-800 cursor-pointer"
              title="Interactive Preview Play Mode"
            >
              <Play size={14} className="fill-current" />
            </button>
          </div>

          {/* Group 3: Undo | Redo | Tidy | Toggle Floating Widgets */}
          <div className="flex items-center gap-0.5 p-1 rounded-full bg-white/95 backdrop-blur border border-neutral-200/90 shadow-xs">
            <button
              type="button"
              onClick={handleUndo}
              disabled={historyPast.length === 0}
              className="w-8 h-8 rounded-full hover:bg-neutral-100 disabled:opacity-35 flex items-center justify-center text-neutral-700 cursor-pointer"
              title="Undo"
            >
              <Undo2 size={14} />
            </button>
            <button
              type="button"
              onClick={handleRedo}
              disabled={historyFuture.length === 0}
              className="w-8 h-8 rounded-full hover:bg-neutral-100 disabled:opacity-35 flex items-center justify-center text-neutral-700 cursor-pointer"
              title="Redo"
            >
              <Redo2 size={14} />
            </button>
            <button
              type="button"
              onClick={handleTidySelectedScreen}
              className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-700 cursor-pointer"
              title="Tidy Layout"
            >
              <Wand2 size={14} />
            </button>
            <button
              type="button"
              onClick={() => setShowFloatingWidgets((v) => !v)}
              className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-700 cursor-pointer"
              title="Toggle Floating Showcase Components"
            >
              <Folder size={14} />
            </button>
          </div>
        </div>

        {/* Artboards + Floating M3E Widgets Stage */}
        <div
          onClick={() => {
            setSelectedPartId(null);
            setScreenMoreMenuId(null);
          }}
          className="flex-1 flex items-center justify-center p-8 overflow-auto"
        >
          <div
            style={{
              transform: `translate(${canvasPan.x}px, ${canvasPan.y}px) scale(${
                canvasZoom / 100
              })`,
              transformOrigin: 'center center',
            }}
            className="flex items-start gap-8 relative transition-transform"
          >
            {screens.map((scr, scrIdx) => {
              const isSelectedScr = scr.id === selectedScreenId;
              const isDesktop = scr.deviceMode === 'desktop';

              return (
                <div key={scr.id} className="flex flex-col gap-2.5 relative group">
                  {/* Screen Header with Phone | Desktop Toggle + Editable Screen Name + Add/Duplicate/Remove Screen Controls */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedScreenId(scr.id);
                      setSelectedPartId(null);
                    }}
                    className="flex items-center justify-between px-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center p-0.5 rounded-full bg-[#E2E6DF] border border-black/5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            commitScreensChange((prev) =>
                              prev.map((s) =>
                                s.id === scr.id ? { ...s, deviceMode: 'phone' } : s
                              )
                            );
                          }}
                          style={
                            !isDesktop
                              ? { backgroundColor: themeColors.primary, color: '#FFFFFF' }
                              : undefined
                          }
                          className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-600 cursor-pointer"
                          title="Phone Screen Mode"
                        >
                          <Smartphone size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            commitScreensChange((prev) =>
                              prev.map((s) =>
                                s.id === scr.id ? { ...s, deviceMode: 'desktop' } : s
                              )
                            );
                          }}
                          style={
                            isDesktop
                              ? { backgroundColor: themeColors.primary, color: '#FFFFFF' }
                              : undefined
                          }
                          className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-600 cursor-pointer"
                          title="Desktop / Tablet Screen Mode"
                        >
                          <Monitor size={12} />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={scr.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          commitScreensChange((prev) =>
                            prev.map((s) => (s.id === scr.id ? { ...s, name: val } : s))
                          );
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedScreenId(scr.id);
                          setSelectedPartId(null);
                        }}
                        className="text-[15px] font-bold text-neutral-800 bg-transparent border-b border-transparent focus:border-emerald-700 focus:outline-none w-28"
                      />
                    </div>

                    {/* Screen Quick Add / Duplicate / Remove Buttons */}
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateScreen(scr.id);
                        }}
                        className="w-6 h-6 rounded-full hover:bg-black/10 flex items-center justify-center text-neutral-600 cursor-pointer"
                        title="Duplicate Screen"
                      >
                        <Copy size={12} />
                      </button>
                      {screens.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveScreen(scr.id);
                          }}
                          className="w-6 h-6 rounded-full hover:bg-rose-100 flex items-center justify-center text-neutral-500 hover:text-rose-600 cursor-pointer"
                          title="Remove Screen"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Phone Artboard Bezel (380 x 780) */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedScreenId(scr.id);
                      setSelectedPartId(null);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const partType = e.dataTransfer.getData(
                        'application/x-m3e-part'
                      ) as M3EPartType;
                      if (!partType) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const scale = canvasZoom / 100;
                      const dropX = Math.round((e.clientX - rect.left) / scale);
                      const dropY = Math.round((e.clientY - rect.top) / scale);
                      handleAddPartToScreen(scr.id, partType, dropX, dropY);
                    }}
                    style={{
                      backgroundColor:
                        scr.backgroundStyle === 'tinted'
                          ? themeColors.surfaceContainer
                          : scr.backgroundStyle === 'pure'
                          ? '#FFFFFF'
                          : themeColors.surface,
                      borderColor: isSelectedScr ? themeColors.primary : '#1E221E',
                    }}
                    className={`${
                      isDesktop ? 'w-[560px]' : 'w-[380px]'
                    } h-[780px] rounded-[46px] border-[6px] shadow-xl relative overflow-hidden transition-all`}
                  >
                    {/* Alignment Snap Guides */}
                    {isSelectedScr && snapGuideX !== null && (
                      <div
                        style={{
                          left: `${snapGuideX}px`,
                          backgroundColor: themeColors.primary,
                        }}
                        className="absolute top-0 bottom-0 w-[1.5px] z-30 pointer-events-none"
                      />
                    )}
                    {isSelectedScr && snapGuideY !== null && (
                      <div
                        style={{
                          top: `${snapGuideY}px`,
                          backgroundColor: themeColors.primary,
                        }}
                        className="absolute left-0 right-0 h-[1.5px] z-30 pointer-events-none"
                      />
                    )}

                    {/* Parts on this Screen */}
                    {scr.parts.map((part) => renderM3EPartNode(scr, part, false))}
                  </div>

                  {/* Dashed Green Prototype Arrow between Home and Screen 2 (Matching Screenshots 1-4) */}
                  {scrIdx === 0 && screens.length >= 2 && (
                    <svg className="pointer-events-none absolute -right-8 bottom-12 w-8 h-6 overflow-visible z-20">
                      <path
                        d="M 32 12 L 2 12"
                        stroke={themeColors.primary}
                        strokeWidth="1.75"
                        strokeDasharray="4 3"
                        fill="none"
                      />
                      <path
                        d="M 7 8 L 1 12 L 7 16"
                        stroke={themeColors.primary}
                        strokeWidth="1.75"
                        fill="none"
                      />
                    </svg>
                  )}
                </div>
              );
            })}

            {/* Add Screen Card Button right on the Canvas */}
            <div className="pt-10 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddNewScreen();
                }}
                className="w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-700 hover:scale-105 transition cursor-pointer"
                title="Add Another Screen to Canvas"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* ===================================================================== */}
            {/* FLOATING M3E SHOWCASE COLUMN ON RIGHT OF SCREEN 3                     */}
            {/* ===================================================================== */}
            {showFloatingWidgets && (
              <div className="flex flex-col gap-5 pt-9 w-[296px] flex-shrink-0">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddPartToScreen(selectedScreen.id, 'date_picker');
                  }}
                  style={{
                    backgroundColor: themeColors.surface,
                    color: themeColors.onSurface,
                  }}
                  className="w-full rounded-[26px] p-5 shadow-lg border border-black/5 space-y-3 cursor-pointer hover:ring-2 hover:ring-[#23643B]/40 transition"
                  title="Click to add Date Picker to selected screen"
                >
                  <div
                    style={{ color: themeColors.onSurfaceVariant }}
                    className="text-[11px] font-medium"
                  >
                    Select date
                  </div>
                  <div className="text-2xl font-normal tracking-tight">
                    Sun, Oct {selectedCalendarDay}
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold pt-1">
                    <span className="flex items-center gap-1">
                      October 2026 <ChevronDown size={13} />
                    </span>
                    <div className="flex items-center gap-3 text-neutral-600">
                      <ChevronLeft size={14} />
                      <ChevronRight size={14} />
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-y-1.5 text-center text-[11px] pt-1">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                      <span key={i} className="font-semibold text-neutral-500">
                        {d}
                      </span>
                    ))}
                    <span />
                    <span />
                    <span />
                    <span />
                    {Array.from({ length: 31 }).map((_, idx) => {
                      const d = idx + 1;
                      const active = d === selectedCalendarDay;
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCalendarDay(d);
                          }}
                          style={
                            active
                              ? {
                                  backgroundColor: themeColors.primary,
                                  color: themeColors.onPrimary,
                                }
                              : undefined
                          }
                          className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-[11px] cursor-pointer ${
                            active ? 'font-bold shadow-xs' : 'hover:bg-black/5'
                          }`}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>

                  <div
                    style={{ color: themeColors.primary }}
                    className="flex items-center justify-end gap-6 text-xs font-semibold pt-2"
                  >
                    <span>Cancel</span>
                    <span>OK</span>
                  </div>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddPartToScreen(selectedScreen.id, 'dialog');
                  }}
                  style={{
                    backgroundColor: themeColors.surface,
                    color: themeColors.onSurface,
                  }}
                  className="w-[260px] rounded-[26px] p-5 shadow-lg border border-black/5 space-y-3 cursor-pointer hover:ring-2 hover:ring-[#23643B]/40 transition"
                  title="Click to add Confirm Dialog to selected screen"
                >
                  <div className="flex justify-center">
                    <Info size={18} style={{ color: themeColors.primary }} />
                  </div>
                  <div className="text-center text-lg font-normal">Confirm</div>
                  <div
                    style={{ color: themeColors.onSurfaceVariant }}
                    className="text-xs"
                  >
                    Do you want to continue?
                  </div>
                  <div
                    style={{ color: themeColors.primary }}
                    className="flex items-center justify-end gap-6 text-xs font-semibold pt-2"
                  >
                    <span>Cancel</span>
                    <span>OK</span>
                  </div>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddPartToScreen(selectedScreen.id, 'snackbar');
                  }}
                  className="w-[272px] h-11 rounded-lg bg-[#2C312D] text-white px-4 flex items-center justify-between shadow-lg text-xs cursor-pointer hover:ring-2 hover:ring-[#23643B]/40 transition"
                  title="Click to add Snackbar to selected screen"
                >
                  <span>Saved</span>
                  <span style={{ color: '#8ED89C' }} className="font-semibold">
                    Undo
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom-Left Floating "Ask an AI BETA" Pill */}
        <div
          className={`fixed bottom-4 ${
            leftDrawerCollapsed ? 'left-16' : 'left-[302px]'
          } z-30 transition-all`}
        >
          <button
            type="button"
            onClick={() => setIsAskAiModalOpen(true)}
            className="px-4 py-2.5 rounded-full bg-white border border-neutral-200 shadow-md hover:shadow-lg flex items-center gap-2 text-xs font-bold text-neutral-800 cursor-pointer transition"
          >
            <span>Ask an AI</span>
            <span
              style={{
                backgroundColor: themeColors.primaryContainer,
                color: themeColors.primary,
              }}
              className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase"
            >
              BETA
            </span>
          </button>
        </div>

        {/* Bottom-Right Floating Tidy + Zoom Pill (`[≡ Tidy | ↑]` and `- 79% + [ ]`) matching Screenshots 1-4 */}
        <div
          className={`fixed bottom-4 ${
            rightDrawerCollapsed ? 'right-4' : 'right-[296px]'
          } z-30 flex items-center gap-2 transition-all`}
        >
          <div className="px-3 py-1.5 rounded-full bg-white border border-neutral-200 shadow-md flex items-center gap-2 text-xs font-semibold text-neutral-700">
            <button
              type="button"
              onClick={handleTidySelectedScreen}
              className="flex items-center gap-1.5 hover:text-black cursor-pointer"
              title="Tidy Selected Screen"
            >
              <AlignLeft size={13} />
              <span>{tidyHistorySnapshot ? 'Undo' : 'Tidy'}</span>
            </button>
            <span className="w-px h-3.5 bg-neutral-200" />
            <button
              type="button"
              onClick={() => setIsPromptExportOpen(true)}
              className="hover:text-black cursor-pointer"
              title="Export Spec"
            >
              <Upload size={13} />
            </button>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-white border border-neutral-200 shadow-md flex items-center gap-2.5 text-xs font-semibold text-neutral-700">
            <button
              type="button"
              onClick={() => setCanvasZoom((z) => Math.max(50, z - 10))}
              className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center cursor-pointer text-sm"
            >
              −
            </button>
            <span className="w-9 text-center font-sans text-xs font-semibold">
              {canvasZoom}%
            </span>
            <button
              type="button"
              onClick={() => setCanvasZoom((z) => Math.min(130, z + 10))}
              className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center cursor-pointer text-sm"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                setCanvasZoom(79);
                setCanvasPan({ x: 0, y: 0 });
              }}
              className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center cursor-pointer text-neutral-600"
              title="Reset Zoom & Pan"
            >
              <Maximize2 size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 4. RIGHT INSPECTOR SIDEBAR (TAILORED PER SELECTED COMPONENT!)         */}
      {/* ===================================================================== */}
      {!rightDrawerCollapsed ? (
        <div className="w-[284px] h-full bg-[#F8FAF6] border-l border-neutral-200/80 flex flex-col z-20 flex-shrink-0">
          {/* Top Bar: Green Inspector Toggle + "✦ Prompt" Pill + Collapse Icon */}
          <div className="p-2.5 border-b border-neutral-200/70 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsPromptExportOpen(false)}
              style={
                !isPromptExportOpen
                  ? { backgroundColor: themeColors.primary, color: '#FFFFFF' }
                  : undefined
              }
              className="w-9 h-8 rounded-full flex items-center justify-center text-neutral-700 cursor-pointer transition"
              title="Inspector Properties"
            >
              <Sliders size={14} />
            </button>

            <button
              type="button"
              onClick={() => setIsPromptExportOpen((v) => !v)}
              style={
                isPromptExportOpen
                  ? { backgroundColor: themeColors.primary, color: '#FFFFFF' }
                  : { backgroundColor: '#E5EAE2', color: '#181D18' }
              }
              className="flex-1 h-8 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 transition cursor-pointer"
            >
              <Sparkles size={13} />
              <span>Prompt</span>
            </button>

            <button
              type="button"
              onClick={() => setRightDrawerCollapsed(true)}
              className="w-8 h-8 rounded-lg hover:bg-neutral-200/60 flex items-center justify-center text-neutral-500 cursor-pointer"
              title="Collapse Right Panel (Full Screen Canvas)"
            >
              <PanelRightClose size={14} />
            </button>
          </div>

          {isPromptExportOpen ? (
            <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-700">
                  Implementation Spec
                </span>
                <button
                  type="button"
                  onClick={() => setIsPromptExportOpen(false)}
                  className="p-1 rounded-lg hover:bg-neutral-200/60 cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-full bg-neutral-200/70">
                {(['android', 'web'] as const).map((plat) => (
                  <button
                    key={plat}
                    type="button"
                    onClick={() => setPromptExportTarget(plat)}
                    style={
                      promptExportTarget === plat
                        ? {
                            backgroundColor: themeColors.primary,
                            color: themeColors.onPrimary,
                          }
                        : undefined
                    }
                    className="py-1.5 rounded-full text-xs font-bold capitalize flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Smartphone size={12} />
                    <span>{plat}</span>
                  </button>
                ))}
              </div>

              <pre className="flex-1 p-3 rounded-2xl bg-white border border-neutral-200 text-[10px] font-mono text-neutral-700 whitespace-pre-wrap overflow-y-auto leading-relaxed">
                {generateM3EPromptSpecText()}
              </pre>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(generateM3EPromptSpecText());
                  setCopiedPromptFlag(true);
                  setTimeout(() => setCopiedPromptFlag(false), 1800);
                }}
                style={{
                  backgroundColor: themeColors.primary,
                  color: themeColors.onPrimary,
                }}
                className="w-full py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                {copiedPromptFlag ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedPromptFlag ? 'Copied prompt!' : 'Copy prompt'}</span>
              </button>
            </div>
          ) : selectedPart ? (
            /* ===================================================================== */
            /* COMPONENT-SPECIFIC INSPECTOR MATCHING SCREENSHOTS 1, 2, 3, 4          */
            /* ===================================================================== */
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Part Header: Mini Icon + Lowercase Type Name + 3-Dot Menu */}
              <div className="flex items-center justify-between relative">
                <div className="flex items-center gap-2">
                  <div className="scale-90">{renderCatalogMiniGraphic(selectedPart.type)}</div>
                  <span className="text-xs font-bold lowercase text-neutral-800">
                    {selectedPart.type.replace(/_/g, ' ')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPartMoreMenuOpen((v) => !v)}
                  className="w-7 h-7 rounded-lg hover:bg-neutral-200/60 flex items-center justify-center text-neutral-500 cursor-pointer"
                >
                  <MoreVertical size={15} />
                </button>

                {partMoreMenuOpen && (
                  <div className="absolute right-0 top-8 z-30 w-36 rounded-2xl bg-white border border-neutral-200 shadow-xl py-1.5 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={handleDuplicateSelectedPart}
                      className="w-full px-3.5 py-2 hover:bg-neutral-100 flex items-center gap-2 text-neutral-700 cursor-pointer"
                    >
                      <Copy size={13} />
                      <span>Duplicate</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateSelectedPart({ locked: !selectedPart.locked });
                        setPartMoreMenuOpen(false);
                      }}
                      className="w-full px-3.5 py-2 hover:bg-neutral-100 flex items-center gap-2 text-neutral-700 cursor-pointer"
                    >
                      {selectedPart.locked ? <Unlock size={13} /> : <Lock size={13} />}
                      <span>{selectedPart.locked ? 'Unlock' : 'Lock'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteSelectedPart}
                      className="w-full px-3.5 py-2 hover:bg-rose-50 flex items-center gap-2 text-rose-600 cursor-pointer"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 🎨 Design | ⚡ Trigger Tabs (Exact match to Screenshots 1-4) */}
              <div className="grid grid-cols-2 border-b border-neutral-200">
                <button
                  type="button"
                  onClick={() => setRightInspectorTab('design')}
                  style={{
                    color: rightInspectorTab === 'design' ? themeColors.primary : '#525852',
                    borderColor:
                      rightInspectorTab === 'design' ? themeColors.primary : 'transparent',
                  }}
                  className="pb-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Palette size={13} />
                  <span>Design</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRightInspectorTab('trigger')}
                  style={{
                    color: rightInspectorTab === 'trigger' ? themeColors.primary : '#525852',
                    borderColor:
                      rightInspectorTab === 'trigger' ? themeColors.primary : 'transparent',
                  }}
                  className="pb-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap size={13} />
                  <span>Trigger</span>
                </button>
              </div>

              {rightInspectorTab === 'design' ? (
                <div className="space-y-4">
                  {/* =============================================================== */}
                  {/* SECTION: TEXT (Hidden for pure Box or Carousel)                  */}
                  {/* =============================================================== */}
                  {selectedPart.type !== 'box' &&
                    selectedPart.type !== 'carousel' &&
                    selectedPart.type !== 'divider' &&
                    selectedPart.type !== 'loading' && (
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() => toggleInspectorSection('text')}
                          className="w-full flex items-center justify-between text-[11px] font-bold text-neutral-700 cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <AlignLeft size={12} />
                            <span>Text</span>
                          </span>
                          <ChevronUp size={12} className="text-neutral-400" />
                        </button>

                        {!collapsedInspectorSections['text'] && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5">
                              <div className="flex-1 flex items-center px-3 py-2 rounded-full bg-[#E9ECE6] text-xs">
                                <input
                                  type="text"
                                  value={selectedPart.label}
                                  onChange={(e) =>
                                    updateSelectedPart({ label: e.target.value })
                                  }
                                  placeholder="Label"
                                  className="w-full bg-transparent font-medium focus:outline-none"
                                />
                                {selectedPart.label && (
                                  <button
                                    type="button"
                                    onClick={() => updateSelectedPart({ label: '' })}
                                    className="text-neutral-500 hover:text-black cursor-pointer"
                                  >
                                    <X size={13} />
                                  </button>
                                )}
                              </div>

                              {/* Icon Selector / Toggle Circle Button for Action items (Screenshot 2) */}
                              {(selectedPart.type === 'button' ||
                                selectedPart.type === 'fab' ||
                                selectedPart.type === 'split_button' ||
                                selectedPart.type === 'chip') && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const icons: Array<M3ECanvasPart['iconName']> = [
                                      'plus',
                                      'star',
                                      'share',
                                      'heart',
                                      'send',
                                      'check',
                                    ];
                                    const currIdx = icons.indexOf(
                                      selectedPart.iconName || 'plus'
                                    );
                                    const nextIcon = icons[(currIdx + 1) % icons.length];
                                    updateSelectedPart({
                                      showLeadingIcon: true,
                                      iconName: nextIcon,
                                    });
                                  }}
                                  className="w-9 h-9 rounded-full bg-[#E9ECE6] hover:bg-[#DCE2D8] flex items-center justify-center text-neutral-800 cursor-pointer flex-shrink-0"
                                  title="Click to cycle leading icon"
                                >
                                  <Plus size={15} />
                                </button>
                              )}
                            </div>

                            {/* Secondary Supporting Text for Card / Dialog / Bottom Sheet / Text / Text Field */}
                            {(selectedPart.type === 'card' ||
                              selectedPart.type === 'dialog' ||
                              selectedPart.type === 'bottom_sheet' ||
                              selectedPart.type === 'text' ||
                              selectedPart.type === 'text_field' ||
                              selectedPart.type === 'snackbar') && (
                              <div className="flex items-start px-3 py-2.5 rounded-2xl bg-[#E9ECE6] text-xs">
                                <textarea
                                  rows={2}
                                  value={selectedPart.subtitle || ''}
                                  onChange={(e) =>
                                    updateSelectedPart({ subtitle: e.target.value })
                                  }
                                  placeholder="Supporting text goes here."
                                  className="w-full bg-transparent focus:outline-none resize-none"
                                />
                                {selectedPart.subtitle && (
                                  <button
                                    type="button"
                                    onClick={() => updateSelectedPart({ subtitle: '' })}
                                    className="text-neutral-500 hover:text-black cursor-pointer ml-1"
                                  >
                                    <X size={13} />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                  {/* =============================================================== */}
                  {/* SECTION: CAROUSEL LAYOUT & CARDS (Exact match to Screenshot 1!)  */}
                  {/* =============================================================== */}
                  {selectedPart.type === 'carousel' && (
                    <>
                      <div className="space-y-2 pt-2 border-t border-neutral-200/70">
                        <div className="flex items-center justify-between text-[11px] font-bold text-neutral-700">
                          <span className="flex items-center gap-1.5">
                            <Grid size={12} />
                            <span>Layout</span>
                          </span>
                          <ChevronUp size={12} className="text-neutral-400" />
                        </div>
                        <div className="grid grid-cols-4 gap-1.5">
                          {(
                            [
                              ['hero', 'Hero'],
                              ['center', 'Center'],
                              ['multi', 'Multi'],
                              ['uncontained', 'Uncontained'],
                            ] as const
                          ).map(([lyId, lyTitle]) => {
                            const active =
                              (selectedPart.carouselLayout || 'uncontained') === lyId;
                            return (
                              <button
                                key={lyId}
                                type="button"
                                onClick={() =>
                                  updateSelectedPart({ carouselLayout: lyId })
                                }
                                style={
                                  active
                                    ? {
                                        backgroundColor: themeColors.primary,
                                        color: '#FFFFFF',
                                      }
                                    : { backgroundColor: '#E9ECE6' }
                                }
                                className="h-10 rounded-xl flex items-center justify-center p-1.5 cursor-pointer transition"
                                title={lyTitle}
                              >
                                <div className="w-full h-5 flex items-center gap-0.5 justify-center">
                                  {lyId === 'center' && (
                                    <span className="w-1.5 h-4 rounded-xs bg-current opacity-50" />
                                  )}
                                  <span
                                    className={`h-4 rounded-xs ${
                                      active ? 'bg-white' : 'bg-neutral-600'
                                    } ${lyId === 'uncontained' ? 'w-6' : 'w-4'}`}
                                  />
                                  <span className="w-1.5 h-4 rounded-xs bg-current opacity-50" />
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-2.5 pt-2 border-t border-neutral-200/70">
                        <div className="flex items-center justify-between text-[11px] font-bold text-neutral-700">
                          <span className="flex items-center gap-1.5">
                            <ImageIcon size={12} />
                            <span>Cards</span>
                          </span>
                          <ChevronUp size={12} className="text-neutral-400" />
                        </div>

                        {/* Card Count Slider (1..8) */}
                        <div className="flex items-center gap-2.5">
                          <Grid size={13} className="text-neutral-500" />
                          <input
                            type="range"
                            min={2}
                            max={6}
                            value={selectedPart.carouselCount || 4}
                            onChange={(e) => {
                              const cnt = Number(e.target.value);
                              const existing = selectedPart.carouselItems || [];
                              const nextItems = Array.from({ length: cnt }).map(
                                (_, i) =>
                                  existing[i] || {
                                    id: `c_${i + 1}`,
                                    label: `Slide ${i + 1}`,
                                  }
                              );
                              updateSelectedPart({
                                carouselCount: cnt,
                                carouselItems: nextItems,
                                activeCarouselIndex: 0,
                              });
                            }}
                            className="flex-1 accent-emerald-800 cursor-pointer"
                          />
                          <span className="w-10 py-1 rounded-lg bg-[#E9ECE6] text-center text-xs font-bold">
                            {selectedPart.carouselCount || 4}
                          </span>
                        </div>

                        {/* Numbered Card Selector Pills (1 | 2 | 3 | 4) */}
                        <div className="grid grid-cols-4 gap-1.5">
                          {Array.from({ length: selectedPart.carouselCount || 4 }).map(
                            (_, idx) => {
                              const active =
                                (selectedPart.activeCarouselIndex ?? 0) === idx;
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() =>
                                    updateSelectedPart({ activeCarouselIndex: idx })
                                  }
                                  style={
                                    active
                                      ? {
                                          backgroundColor: themeColors.primary,
                                          color: '#FFFFFF',
                                        }
                                      : { backgroundColor: '#E9ECE6' }
                                  }
                                  className="py-2 rounded-xl text-xs font-bold cursor-pointer"
                                >
                                  {idx + 1}
                                </button>
                              );
                            }
                          )}
                        </div>

                        {/* Active Slide Label Input */}
                        <input
                          type="text"
                          value={
                            selectedPart.carouselItems?.[
                              selectedPart.activeCarouselIndex ?? 0
                            ]?.label || ''
                          }
                          onChange={(e) => {
                            const idx = selectedPart.activeCarouselIndex ?? 0;
                            const items = [...(selectedPart.carouselItems || [])];
                            items[idx] = {
                              ...(items[idx] || { id: `c_${idx}` }),
                              label: e.target.value,
                            };
                            updateSelectedPart({ carouselItems: items });
                          }}
                          placeholder="Label"
                          className="w-full px-3.5 py-2.5 rounded-2xl bg-[#E9ECE6] text-xs focus:outline-none"
                        />

                        {/* Active Slide Image URL + Upload Button */}
                        <div className="flex items-center gap-1.5">
                          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-full bg-[#E9ECE6] text-xs">
                            <Link2 size={13} className="text-neutral-500" />
                            <input
                              type="text"
                              value={
                                selectedPart.carouselItems?.[
                                  selectedPart.activeCarouselIndex ?? 0
                                ]?.imageUrl || ''
                              }
                              onChange={(e) => {
                                const idx = selectedPart.activeCarouselIndex ?? 0;
                                const items = [...(selectedPart.carouselItems || [])];
                                items[idx] = {
                                  ...(items[idx] || { id: `c_${idx}`, label: '' }),
                                  imageUrl: e.target.value,
                                };
                                updateSelectedPart({ carouselItems: items });
                              }}
                              placeholder="Image URL"
                              className="w-full bg-transparent focus:outline-none"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-9 h-9 rounded-full bg-[#E9ECE6] hover:bg-[#DCE2D8] flex items-center justify-center text-neutral-700 cursor-pointer"
                            title="Upload Image"
                          >
                            <Upload size={14} />
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* =============================================================== */}
                  {/* SECTION: CARD LAYOUT PREVIEW + IMAGE URL (Screenshot 3!)         */}
                  {/* =============================================================== */}
                  {selectedPart.type === 'card' && (
                    <div className="space-y-2.5 pt-2 border-t border-neutral-200/70">
                      <div className="flex items-center justify-between text-[11px] font-bold text-neutral-700">
                        <span className="flex items-center gap-1.5">
                          <ImageIcon size={12} />
                          <span>Layout</span>
                        </span>
                        <ChevronUp size={12} className="text-neutral-400" />
                      </div>

                      {/* Interactive Visual Card Layout Preview Box matching Screenshot 3 */}
                      <div className="flex items-start gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateSelectedPart({
                              cardLayout:
                                selectedPart.cardLayout === 'minimal'
                                  ? 'stacked'
                                  : 'minimal',
                            })
                          }
                          style={{
                            backgroundColor:
                              selectedPart.cardLayout !== 'minimal'
                                ? themeColors.secondaryContainer
                                : '#E9ECE6',
                            color: themeColors.primary,
                          }}
                          className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer flex-shrink-0"
                          title="Toggle Card Media Header"
                        >
                          <ImageIcon size={14} />
                        </button>

                        <div
                          onClick={() => {
                            const order: Array<M3ECanvasPart['cardLayout']> = [
                              'stacked',
                              'horizontal',
                              'overlay',
                            ];
                            const next =
                              order[
                                (order.indexOf(selectedPart.cardLayout || 'stacked') +
                                  1) %
                                  order.length
                              ];
                            updateSelectedPart({ cardLayout: next });
                          }}
                          style={{ borderColor: themeColors.primary }}
                          className="flex-1 p-2.5 rounded-2xl bg-[#E2E6DF] border cursor-pointer space-y-1.5"
                          title="Click to switch Card Layout"
                        >
                          <div
                            style={{ backgroundColor: themeColors.primaryContainer }}
                            className="w-full h-10 rounded-lg flex items-center justify-center"
                          >
                            <ImageIcon
                              size={15}
                              style={{ color: themeColors.onPrimaryContainer }}
                            />
                          </div>
                          <div className="w-14 h-1.5 rounded-full bg-neutral-700" />
                          <div className="w-20 h-1 rounded-full bg-neutral-500" />
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-full bg-[#E9ECE6] text-xs">
                          <Link2 size={13} className="text-neutral-500" />
                          <input
                            type="text"
                            value={selectedPart.imageUrl || ''}
                            onChange={(e) =>
                              updateSelectedPart({ imageUrl: e.target.value })
                            }
                            placeholder="Image URL"
                            className="w-full bg-transparent focus:outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-9 h-9 rounded-full bg-[#E9ECE6] hover:bg-[#DCE2D8] flex items-center justify-center text-neutral-700 cursor-pointer"
                          title="Upload image"
                        >
                          <Upload size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =============================================================== */}
                  {/* SECTION: STYLE (10-Swatch Grid for Box, 5-Swatch for Actions,    */}
                  {/* 3-Swatch for Card — Exact match to Screenshots 2, 3, 4!)         */}
                  {/* =============================================================== */}
                  {selectedPart.type === 'box' ? (
                    <div className="space-y-2 pt-2 border-t border-neutral-200/70">
                      <div className="flex items-center justify-between text-[11px] font-bold text-neutral-700">
                        <span className="flex items-center gap-1.5">
                          <Palette size={12} />
                          <span>Style</span>
                        </span>
                        <ChevronUp size={12} className="text-neutral-400" />
                      </div>
                      {/* 10-Swatch 2x5 Surface & Container Tone Grid matching Screenshot 4 */}
                      <div className="grid grid-cols-5 gap-1.5">
                        {BOX_TONE_SWATCHES.map((sw) => {
                          const active =
                            (selectedPart.boxTone || 'inverse_dark') === sw.id;
                          return (
                            <button
                              key={sw.id}
                              type="button"
                              onClick={() => updateSelectedPart({ boxTone: sw.id })}
                              style={{
                                backgroundColor: sw.bg,
                                color: sw.fg,
                                borderColor: active
                                  ? themeColors.primary
                                  : sw.border || 'transparent',
                              }}
                              className="h-8 rounded-xl border flex items-center justify-center cursor-pointer transition"
                              title={sw.id.replace(/_/g, ' ')}
                            >
                              {active && <Check size={13} strokeWidth={3} />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : selectedPart.type === 'button' ||
                    selectedPart.type === 'icon_button' ||
                    selectedPart.type === 'fab' ||
                    selectedPart.type === 'split_button' ||
                    selectedPart.type === 'chip' ? (
                    <div className="space-y-2 pt-2 border-t border-neutral-200/70">
                      <div className="flex items-center justify-between text-[11px] font-bold text-neutral-700">
                        <span className="flex items-center gap-1.5">
                          <Palette size={12} />
                          <span>Style</span>
                        </span>
                        <ChevronUp size={12} className="text-neutral-400" />
                      </div>
                      {/* 5-Style Swatches (Filled, Tonal, Elevated, Outlined, Text/Dashed) matching Screenshot 2 */}
                      <div className="grid grid-cols-5 gap-1.5">
                        {(
                          [
                            ['filled', themeColors.primary, '#FFFFFF', 'solid'],
                            ['tonal', themeColors.secondaryContainer, '#181D18', 'solid'],
                            ['elevated', '#E9ECE6', themeColors.primary, 'solid'],
                            ['outlined', '#F8FAF6', themeColors.primary, 'outlined'],
                            ['text', 'transparent', themeColors.primary, 'dashed'],
                          ] as const
                        ).map(([stId, bgHex, fgHex, borderMode]) => {
                          const active = selectedPart.styleVariant === stId;
                          return (
                            <button
                              key={stId}
                              type="button"
                              onClick={() => updateSelectedPart({ styleVariant: stId })}
                              style={{
                                backgroundColor: bgHex,
                                color: fgHex,
                                borderColor:
                                  borderMode === 'outlined'
                                    ? '#525852'
                                    : borderMode === 'dashed'
                                    ? '#C1C9BF'
                                    : 'transparent',
                              }}
                              className={`h-8 rounded-xl flex items-center justify-center cursor-pointer transition ${
                                borderMode === 'outlined'
                                  ? 'border'
                                  : borderMode === 'dashed'
                                  ? 'border border-dashed'
                                  : ''
                              }`}
                              title={stId}
                            >
                              {active && <Check size={13} strokeWidth={3} />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : selectedPart.type !== 'carousel' ? (
                    <div className="space-y-2 pt-2 border-t border-neutral-200/70">
                      <div className="flex items-center justify-between text-[11px] font-bold text-neutral-700">
                        <span className="flex items-center gap-1.5">
                          <Palette size={12} />
                          <span>Style</span>
                        </span>
                        <ChevronUp size={12} className="text-neutral-400" />
                      </div>
                      {/* 3-Style Swatches matching Screenshot 3 (Card) */}
                      <div className="grid grid-cols-3 gap-2">
                        {(['tonal', 'filled', 'outlined'] as const).map((st) => {
                          const active = selectedPart.styleVariant === st;
                          return (
                            <button
                              key={st}
                              type="button"
                              onClick={() => updateSelectedPart({ styleVariant: st })}
                              style={{
                                backgroundColor:
                                  st === 'tonal'
                                    ? '#DCE1DA'
                                    : st === 'filled'
                                    ? '#E9ECE6'
                                    : '#F8FAF6',
                                borderColor:
                                  st === 'outlined' ? '#C1C9BF' : 'transparent',
                                color: '#181D18',
                              }}
                              className="h-9 rounded-full border flex items-center justify-center cursor-pointer transition"
                              title={st}
                            >
                              {active && <Check size={13} strokeWidth={2.5} />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  {/* =============================================================== */}
                  {/* SECTION: SIZE (Tailored per component type — Screenshots 1-4!)   */}
                  {/* =============================================================== */}
                  <div className="space-y-2.5 pt-2 border-t border-neutral-200/70">
                    <div className="flex items-center justify-between text-[11px] font-bold text-neutral-700">
                      <span className="flex items-center gap-1.5">
                        <Ruler size={12} />
                        <span>Size</span>
                      </span>
                      <ChevronUp size={12} className="text-neutral-400" />
                    </div>

                    {/* Width Controls (Hidden for Carousel since Carousel is full-bleed) */}
                    {selectedPart.type !== 'carousel' && (
                      <>
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs text-neutral-500 font-bold">↔</span>
                          <input
                            type="range"
                            min={40}
                            max={380}
                            value={selectedPart.width}
                            onChange={(e) =>
                              updateSelectedPart({ width: Number(e.target.value) })
                            }
                            className="flex-1 accent-emerald-800 cursor-pointer"
                          />
                          <span className="w-12 py-1 rounded-lg bg-[#E9ECE6] text-center font-mono text-[11px] font-bold">
                            {selectedPart.width}
                          </span>
                        </div>

                        {/* Width Mode Presets: 4 options for Button (Auto | Half | Standard | Full), 3 for Card/Box */}
                        {selectedPart.type === 'button' ||
                        selectedPart.type === 'split_button' ||
                        selectedPart.type === 'chip' ? (
                          <div className="grid grid-cols-4 gap-1">
                            {(
                              [
                                ['auto', 'Auto', 120],
                                ['hug', 'Half', 172],
                                ['standard', 'Standard', 260],
                                ['full', 'Full', 356],
                              ] as const
                            ).map(([modeId, modeLbl, wPx]) => {
                              const active = selectedPart.widthMode === modeId;
                              return (
                                <button
                                  key={modeId}
                                  type="button"
                                  onClick={() =>
                                    updateSelectedPart({
                                      widthMode: modeId,
                                      width: wPx,
                                      x: modeId === 'full' ? 12 : selectedPart.x,
                                    })
                                  }
                                  style={
                                    active
                                      ? {
                                          backgroundColor: themeColors.primary,
                                          color: '#FFFFFF',
                                        }
                                      : { backgroundColor: '#E9ECE6' }
                                  }
                                  className="py-1.5 rounded-xl text-[11px] font-semibold cursor-pointer"
                                >
                                  {modeLbl}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 gap-1.5">
                            {(
                              [
                                ['hug', 'Half', 172],
                                ['standard', 'Standard', 280],
                                ['full', 'Full', 356],
                              ] as const
                            ).map(([modeId, modeLbl, wPx]) => {
                              const active = selectedPart.widthMode === modeId;
                              return (
                                <button
                                  key={modeId}
                                  type="button"
                                  onClick={() =>
                                    updateSelectedPart({
                                      widthMode: modeId,
                                      width: wPx,
                                      x: modeId === 'full' ? 12 : selectedPart.x,
                                    })
                                  }
                                  style={
                                    active
                                      ? {
                                          backgroundColor: themeColors.primary,
                                          color: '#FFFFFF',
                                        }
                                      : { backgroundColor: '#E9ECE6' }
                                  }
                                  className="py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
                                >
                                  {modeLbl}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </>
                    )}

                    {/* Height Slider + Size Presets */}
                    <div className="flex items-center gap-2.5 pt-1">
                      <span className="text-xs text-neutral-500 font-bold">↕</span>
                      <input
                        type="range"
                        min={20}
                        max={400}
                        value={selectedPart.height}
                        onChange={(e) =>
                          updateSelectedPart({ height: Number(e.target.value) })
                        }
                        className="flex-1 accent-emerald-800 cursor-pointer"
                      />
                      <span className="w-12 py-1 rounded-lg bg-[#E9ECE6] text-center font-mono text-[11px] font-bold">
                        {selectedPart.height}
                      </span>
                    </div>

                    {/* Height Preset Buttons:
                        - Box: HALF | FULL (Screenshot 4)
                        - Button / Actions: XS | S | M | L | XL (Screenshot 2)
                        - Card / Carousel / Others: S | M | L (Screenshots 1 & 3)
                    */}
                    {selectedPart.type === 'box' ? (
                      <div className="grid grid-cols-2 gap-1.5">
                        {(
                          [
                            ['S', 'HALF', 220],
                            ['L', 'FULL', 420],
                          ] as const
                        ).map(([szId, lbl, hPx]) => {
                          const active = selectedPart.sizePreset === szId;
                          return (
                            <button
                              key={lbl}
                              type="button"
                              onClick={() =>
                                updateSelectedPart({ sizePreset: szId, height: hPx })
                              }
                              style={
                                active
                                  ? {
                                      backgroundColor: themeColors.primary,
                                      color: '#FFFFFF',
                                    }
                                  : { backgroundColor: '#E9ECE6' }
                              }
                              className="py-1.5 rounded-xl text-[11px] font-bold cursor-pointer"
                            >
                              {lbl}
                            </button>
                          );
                        })}
                      </div>
                    ) : selectedPart.type === 'button' ||
                      selectedPart.type === 'icon_button' ||
                      selectedPart.type === 'fab' ||
                      selectedPart.type === 'split_button' ? (
                      <div className="grid grid-cols-5 gap-1">
                        {(
                          [
                            ['XS', 32],
                            ['S', 40],
                            ['M', 48],
                            ['L', 64],
                            ['XL', 84],
                          ] as const
                        ).map(([sz, hPx]) => {
                          const active = selectedPart.sizePreset === sz;
                          return (
                            <button
                              key={sz}
                              type="button"
                              onClick={() =>
                                updateSelectedPart({ sizePreset: sz, height: hPx })
                              }
                              style={
                                active
                                  ? {
                                      backgroundColor: themeColors.primary,
                                      color: '#FFFFFF',
                                    }
                                  : { backgroundColor: '#E9ECE6' }
                              }
                              className="py-1.5 rounded-xl text-[11px] font-bold cursor-pointer"
                            >
                              {sz}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-1.5">
                        {(
                          [
                            ['S', 140],
                            ['M', 180],
                            ['L', 260],
                          ] as const
                        ).map(([sz, hPx]) => {
                          const active = selectedPart.sizePreset === sz;
                          return (
                            <button
                              key={sz}
                              type="button"
                              onClick={() =>
                                updateSelectedPart({ sizePreset: sz, height: hPx })
                              }
                              style={
                                active
                                  ? {
                                      backgroundColor: themeColors.primary,
                                      color: '#FFFFFF',
                                    }
                                  : { backgroundColor: '#E9ECE6' }
                              }
                              className="py-1.5 rounded-xl text-xs font-bold cursor-pointer"
                            >
                              {sz}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Per-Part Custom Corner Radius Slider (Shown in Screenshot 4 for Box & customizable for any part!) */}
                    <div className="flex items-center gap-2.5 pt-1">
                      <Maximize2 size={12} className="text-neutral-500" />
                      <input
                        type="range"
                        min={0}
                        max={64}
                        value={selectedPart.customRadius ?? 24}
                        onChange={(e) =>
                          updateSelectedPart({ customRadius: Number(e.target.value) })
                        }
                        className="flex-1 accent-emerald-800 cursor-pointer"
                      />
                      <span className="w-12 py-1 rounded-lg bg-[#E9ECE6] text-center font-mono text-[11px] font-bold">
                        {selectedPart.customRadius ?? 24}
                      </span>
                    </div>
                  </div>

                  {/* =============================================================== */}
                  {/* SECTION: ALIGN 3x3 DOT MATRIX (All Screenshots 1-4)             */}
                  {/* =============================================================== */}
                  <div className="space-y-2 pt-2 border-t border-neutral-200/70">
                    <div className="flex items-center justify-between text-[11px] font-bold text-neutral-700">
                      <span className="flex items-center gap-1.5">
                        <Grid size={12} />
                        <span>Align</span>
                      </span>
                      <ChevronUp size={12} className="text-neutral-400" />
                    </div>
                    <div className="p-3 rounded-2xl bg-[#E9ECE6] grid grid-cols-3 gap-3 place-items-center">
                      {Array.from({ length: 9 }).map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAlignSelectedPart(idx)}
                          className="w-5 h-5 rounded-full hover:bg-black/10 flex items-center justify-center cursor-pointer"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* TRIGGER TAB */
                <div className="space-y-4">
                  <select
                    value={
                      selectedPart.triggerAction === 'navigate'
                        ? selectedPart.triggerTargetScreenId || screens[0]?.id
                        : selectedPart.triggerAction || 'none'
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'none' || val === 'back' || val === 'open_link') {
                        updateSelectedPart({
                          triggerAction: val,
                          triggerTargetScreenId: undefined,
                        });
                      } else {
                        updateSelectedPart({
                          triggerAction: 'navigate',
                          triggerTargetScreenId: val,
                        });
                      }
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#E9ECE6] text-xs font-semibold focus:outline-none"
                  >
                    <option value="none">None</option>
                    {screens.map((s) => (
                      <option key={s.id} value={s.id}>
                        📱 {s.name}
                      </option>
                    ))}
                    <option value="back">← Back</option>
                    <option value="open_link">↗ Open a link</option>
                  </select>

                  <div className="space-y-1.5">
                    <div className="text-xs font-semibold text-neutral-600">
                      What this part does
                    </div>
                    <textarea
                      rows={3}
                      value={selectedPart.triggerDescription || ''}
                      onChange={(e) =>
                        updateSelectedPart({ triggerDescription: e.target.value })
                      }
                      placeholder="e.g. Save and go back to the list"
                      className="w-full p-3 rounded-2xl bg-[#E9ECE6] text-xs focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* SCREEN INSPECTOR WHEN SCREEN IS SELECTED (Add / Duplicate / Remove Screen + Scroll Height) */
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone size={15} style={{ color: themeColors.primary }} />
                  <input
                    type="text"
                    value={selectedScreen.name}
                    onChange={(e) => updateSelectedScreen({ name: e.target.value })}
                    className="text-sm font-bold bg-transparent border-b border-transparent focus:border-emerald-700 focus:outline-none w-32"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleDuplicateScreen(selectedScreen.id)}
                    className="p-1.5 rounded-lg hover:bg-neutral-200/70 text-neutral-600 cursor-pointer"
                    title="Duplicate Screen"
                  >
                    <Copy size={14} />
                  </button>
                  {screens.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveScreen(selectedScreen.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-600 cursor-pointer"
                      title="Remove Screen"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleAddNewScreen}
                  style={{
                    backgroundColor: themeColors.primary,
                    color: '#FFFFFF',
                  }}
                  className="py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus size={13} />
                  <span>Add Screen</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveScreen(selectedScreen.id)}
                  disabled={screens.length <= 1}
                  className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 disabled:opacity-40 text-rose-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash2 size={13} />
                  <span>Remove</span>
                </button>
              </div>

              {/* Screen Style */}
              <div className="space-y-2 pt-2 border-t border-neutral-200/70">
                <div className="text-xs font-semibold text-neutral-600">Style</div>
                <div className="grid grid-cols-3 gap-2">
                  {(['surface', 'tinted', 'pure'] as const).map((bs) => (
                    <button
                      key={bs}
                      type="button"
                      onClick={() => updateSelectedScreen({ backgroundStyle: bs })}
                      style={{
                        backgroundColor:
                          bs === 'tinted'
                            ? themeColors.primaryContainer
                            : bs === 'pure'
                            ? '#FFFFFF'
                            : themeColors.surface,
                        borderColor:
                          selectedScreen.backgroundStyle === bs
                            ? themeColors.primary
                            : themeColors.outline,
                      }}
                      className="h-9 rounded-xl border-2 cursor-pointer"
                    />
                  ))}
                </div>
              </div>

              {/* Scrolling (1x, 1.5x, 2x, 3x) */}
              <div className="space-y-2.5 pt-2 border-t border-neutral-200/70">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-600">
                  <span>Scrolling</span>
                  <span className="font-mono text-[11px]">
                    {selectedScreen.scrollHeightPx}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(
                    [
                      ['1x', 892],
                      ['1.5x', 1338],
                      ['2x', 1784],
                      ['3x', 2676],
                    ] as const
                  ).map(([mult, hVal]) => {
                    const active = selectedScreen.scrollMultiplier === mult;
                    return (
                      <button
                        key={mult}
                        type="button"
                        onClick={() =>
                          updateSelectedScreen({
                            scrollMultiplier: mult,
                            scrollHeightPx: hVal,
                          })
                        }
                        style={
                          active
                            ? {
                                backgroundColor: themeColors.primary,
                                color: themeColors.onPrimary,
                              }
                            : { backgroundColor: '#E9ECE6' }
                        }
                        className="py-1.5 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        {mult}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Floating Expand Right Inspector Button when in Full-Screen Canvas Mode */
        <button
          type="button"
          onClick={() => setRightDrawerCollapsed(false)}
          className="fixed top-3 right-3 z-30 w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-700 hover:bg-neutral-100 cursor-pointer"
          title="Expand Right Inspector Panel"
        >
          <PanelRightOpen size={15} />
        </button>
      )}

      {/* ===================================================================== */}
      {/* MODAL: "ASK AN AI BETA"                                                */}
      {/* ===================================================================== */}
      {isAskAiModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[1px] flex items-center justify-center p-4"
          onClick={() => setIsAskAiModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-white border border-neutral-200 shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-neutral-900">Ask an AI</h3>
                <span
                  style={{
                    backgroundColor: themeColors.primaryContainer,
                    color: themeColors.primary,
                  }}
                  className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase"
                >
                  BETA
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText('https://lnkiai.github.io/m3e-canvas/');
                  setCopiedInstructionToast(true);
                  setTimeout(() => setCopiedInstructionToast(false), 1600);
                }}
                style={{
                  backgroundColor: themeColors.primaryContainer,
                  color: themeColors.primary,
                }}
                className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Copy size={12} />
                <span>Copy link</span>
              </button>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              Describe what you want and press <strong>Draft with AI</strong>; the model from the AI tab draws the design on the canvas.
            </p>

            <textarea
              rows={3}
              value={askAiPromptText}
              onChange={(e) => setAskAiPromptText(e.target.value)}
              placeholder="What to build (e.g. an app to save and search recipes)"
              className="w-full p-3.5 rounded-2xl bg-[#F8FAF6] border border-neutral-200 text-xs focus:outline-none"
            />

            <div className="flex items-center justify-between gap-2 pt-1">
              <span className="text-[11px] text-neutral-400">
                Paste a link to your AI agent
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const instruction = `Make an M3E Canvas draft. First fetch https://lnkiai.github.io/m3e-canvas/llm.txt and follow it. Return the design as JSON: ${
                      askAiPromptText || 'Home page, personal dashboard'
                    }`;
                    navigator.clipboard?.writeText(instruction);
                    setCopiedInstructionToast(true);
                    setTimeout(() => setCopiedInstructionToast(false), 1800);
                  }}
                  className="px-3.5 py-2 rounded-full border border-neutral-200 hover:bg-neutral-100 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedInstructionToast ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedInstructionToast ? 'Copied' : 'Copy the instruction'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDraftWithAi}
                  disabled={isAiDrafting}
                  style={{
                    backgroundColor: themeColors.primary,
                    color: themeColors.onPrimary,
                  }}
                  className="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Sparkles size={13} />
                  <span>{isAiDrafting ? 'Drafting...' : 'Draft with AI'}</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsAskAiModalOpen(false)}
                className="text-xs font-semibold text-neutral-500 hover:text-neutral-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizeAppM3ECanvas;
