import React from 'react';
import {
  TrendingUp,
  Package,
  ShoppingCart,
  AlertTriangle,
  Plus,
  ArrowRight,
  Flame,
  CheckCircle2,
  Truck,
  Sparkles,
  TicketPercent,
  Settings,
} from 'lucide-react';
import {
  EditableText,
  EditableButton,
  EditableImage,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import { useStoreEcommerce } from '../../store_website/component/StoreEcommerceContext';

export interface StoreAdminHeroOverviewSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const StoreAdminHeroOverviewSection: React.FC<
  StoreAdminHeroOverviewSectionProps
> = () => {
  return null;
};

export default StoreAdminHeroOverviewSection;
