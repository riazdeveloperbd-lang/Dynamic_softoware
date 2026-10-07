import React from 'react';
import { Leaf, ShieldCheck, PhoneCall, Mail, MapPin } from 'lucide-react';
import { EditableText } from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import { useStoreEcommerce } from '../../store_website/component/StoreEcommerceContext';

export interface StoreAdminFooterProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const StoreAdminFooter: React.FC<StoreAdminFooterProps> = () => {
  return null;
};

export default StoreAdminFooter;
