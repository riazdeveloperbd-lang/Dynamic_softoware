import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FolderKanban,
  Users,
  TicketPercent,
  Settings,
  Bell,
  Plus,
  Search,
  CheckCircle2,
  Leaf,
  Menu,
  X,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import {
  useStoreEcommerce,
  StoreAdminPageId,
} from '../../store_website/component/StoreEcommerceContext';

export interface StoreAdminNavbarProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const StoreAdminNavbar: React.FC<StoreAdminNavbarProps> = () => {
  return null;
};

export default StoreAdminNavbar;
