import React from 'react';
import {
  Grid,
  Box,
  Wallet,
  Users,
  LayoutGrid,
  Plus,
  PlusCircle,
  Search,
  Check,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Flame,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  CreditCard,
  Building2,
  DollarSign,
  Coins,
  Send,
  Phone,
  MessageCircle,
  X,
  Lock,
  Unlock,
  Key,
  KeyRound,
  Download,
  Share2,
  FileText,
  FileSpreadsheet,
  Trash2,
  RotateCcw,
  RefreshCw,
  Sun,
  Moon,
  Shield,
  Eye,
  EyeOff,
  User,
  Settings,
  HelpCircle,
  Info,
  TrendingUp,
  TrendingDown,
  Camera,
  Upload,
  Calendar,
  Sparkles,
  Zap,
} from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

const ICON_MAP: Record<string, React.ElementType> = {
  // Navigation & Tabs
  'grid': Grid,
  'grid-outline': Grid,
  'cube': Box,
  'cube-outline': Box,
  'wallet': Wallet,
  'wallet-outline': Wallet,
  'people': Users,
  'people-outline': Users,
  'apps': LayoutGrid,
  'apps-outline': LayoutGrid,
  'person-outline': User,
  'person': User,

  // Common UI
  'add': Plus,
  'add-circle': PlusCircle,
  'add-circle-outline': PlusCircle,
  'close': X,
  'close-circle': X,
  'search': Search,
  'search-outline': Search,
  'checkmark': Check,
  'checkmark-circle': CheckCircle2,
  'checkmark-circle-outline': CheckCircle2,
  'checkmark-done': CheckCircle2,
  'time-outline': Clock,
  'time': Clock,
  'warning-outline': AlertTriangle,
  'warning': AlertTriangle,
  'flame': Flame,
  'flame-outline': Flame,
  'chevron-forward': ChevronRight,
  'chevron-back': ChevronLeft,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'arrow-back': ArrowLeft,
  'arrow-forward': ArrowRight,

  // Finance & Orders
  'card-outline': CreditCard,
  'cash-outline': Coins,
  'calculator-outline': Wallet,
  'receipt-outline': FileText,
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  'trending-up-outline': TrendingUp,
  'trending-down-outline': TrendingDown,
  'swap-horizontal-outline': RefreshCw,
  'flash-outline': Zap,
  'flash': Zap,

  // Communication
  'call-outline': Phone,
  'call': Phone,
  'logo-whatsapp': MessageCircle,
  'chatbubble-ellipses-outline': MessageCircle,
  'notifications-outline': Zap,
  'pulse-outline': Zap,

  // System & Tools
  'lock-closed-outline': Lock,
  'lock-open-outline': Unlock,
  'keypad-outline': KeyRound,
  'key-outline': Key,
  'download-outline': Download,
  'share-social-outline': Share2,
  'refresh-outline': RefreshCw,
  'trash-outline': Trash2,
  'color-palette-outline': Sparkles,
  'sunny-outline': Sun,
  'moon-outline': Moon,
  'shield-checkmark-outline': Shield,
  'shield-outline': Shield,
  'document-text-outline': FileText,
  'document-outline': FileText,
  'camera-outline': Camera,
  'cloud-upload-outline': Upload,
  'calendar-outline': Calendar,
  'information-circle-outline': Info,
  'help-circle-outline': HelpCircle,
  'log-out-outline': ArrowRight,
  'ellipsis-vertical': LayoutGrid,
};

function BaseIcon({ name, size = 20, color = '#ffffff', style }: IconProps) {
  const IconComponent = ICON_MAP[name] || Sparkles;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      <IconComponent size={size} color={color} />
    </span>
  );
}

export const Ionicons: any = Object.assign(BaseIcon, {
  glyphMap: {} as Record<string, string>,
});

export const FontAwesome5: any = Object.assign(BaseIcon, {
  glyphMap: {} as Record<string, string>,
});

export const MaterialCommunityIcons: any = Object.assign(BaseIcon, {
  glyphMap: {} as Record<string, string>,
});

export const Feather: any = Object.assign(BaseIcon, {
  glyphMap: {} as Record<string, string>,
});

export const MaterialIcons: any = Object.assign(BaseIcon, {
  glyphMap: {} as Record<string, string>,
});

export const AntDesign: any = Object.assign(BaseIcon, {
  glyphMap: {} as Record<string, string>,
});

export const Entypo: any = Object.assign(BaseIcon, {
  glyphMap: {} as Record<string, string>,
});

export default {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
  AntDesign,
  Entypo,
};
