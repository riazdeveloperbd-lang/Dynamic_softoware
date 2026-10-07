import React, { useState } from 'react';
import {
  Package,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  X,
  Search,
  Flame,
  Star,
  Truck,
  ShoppingCart,
  FolderKanban,
  Users,
  TicketPercent,
  Settings,
  Printer,
  PhoneCall,
  MapPin,
  ShieldCheck,
  CreditCard,
  SlidersHorizontal,
  LayoutDashboard,
  Layers,
  Image as ImageIcon,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Upload,
  UploadCloud,
  TrendingUp,
  UserPlus,
  KeyRound,
  PanelLeftClose,
  PanelLeftOpen,
  ShoppingBag,
  Heart,
  ArrowLeftRight,
  ChevronLeft,
  HelpCircle,
  Share2,
  Check,
  User,
  Mail,
  FileText,
  Headphones,
  LogOut,
  Bell,
  MessageSquare,
  Maximize2,
  LayoutGrid,
  Download,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import {
  EditableText,
  EditableImage,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import {
  useStoreEcommerce,
  StoreProductItem,
  StoreCategorySlug,
  StoreOrderRecord,
  StoreAdminPageId,
} from '../../store_website/component/StoreEcommerceContext';

export interface StoreAdminPagesRouterSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const StoreAdminPagesRouterSection: React.FC<
  StoreAdminPagesRouterSectionProps
> = ({
  title = 'প্রোডাক্ট, অর্ডার ও স্টোর ডাটা কন্ট্রোল সেন্টার (Live Store Management)',
  subtitle = 'Every change you make here—adding products, editing prices, updating order status, or changing delivery fees—instantly updates the Bazar Store Website.',
  variant = 'varient_1',
  primaryColor = '#F37021',
  isDark = false,
}) => {
  const {
    activeAdminPage,
    setActiveAdminPage,
    selectedAdminOrder,
    setSelectedAdminOrder,
    attributes,
    addAttribute,
    deleteAttribute,
    products,
    categories,
    orders,
    coupons,
    storeSettings,
    updateStoreSettings,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    deleteCategory,
    updateOrderStatus,
    deleteOrder,
    addCoupon,
    toggleCouponActive,
    deleteCoupon,
    placeOrder,
  } = useStoreEcommerce();

  // Left Sidebar Collapse & Accordion State (Menu Icon Hover behavior)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authFirstName, setAuthFirstName] = useState('');
  const [authLastName, setAuthLastName] = useState('');
  const [authEmail, setAuthEmail] = useState('admin@bazar.com');
  const [authPassword, setAuthPassword] = useState('12345678');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('12345678');
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [showAuthConfirmPassword, setShowAuthConfirmPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [agreePrivacy, setAgreePrivacy] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHoverExpanded, setSidebarHoverExpanded] = useState(false);
  const [addProdGender, setAddProdGender] = useState('Male');
  const [addProdBrand, setAddProdBrand] = useState('Bazar Organic');
  const [addProdSize, setAddProdSize] = useState('EU - 44');
  const [addProdDate, setAddProdDate] = useState('2026-10-07');
  const [detailColor, setDetailColor] = useState('Orange');
  const [detailSize, setDetailSize] = useState('S');
  const [detailQty, setDetailQty] = useState(1);
  const [detailGalleryIdx, setDetailGalleryIdx] = useState(0);
  const [reportSellerRange, setReportSellerRange] = useState('Last 30 days');
  const [reportSaleRange, setReportSaleRange] = useState('Last 30 days');
  const [reportTransferPage, setReportTransferPage] = useState(2);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfExportNotice, setPdfExportNotice] = useState<string | null>(null);
  const [reportTransfers, setReportTransfers] = useState([
    { id: '11081197', name: 'Kathryn Murphy', date: 'Mar 20, 2023', total: '$2,700' },
    { id: '38766940', name: 'Floyd Miles', date: 'Mar 20, 2023', total: '$2,700' },
    { id: '43397744', name: 'Brooklyn Simmons', date: 'Mar 20, 2023', total: '$2,700' },
    { id: '66277431', name: 'Wade Warren', date: 'Mar 20, 2023', total: '$2,700' },
    { id: '58276066', name: 'Devon Lane', date: 'Mar 20, 2023', total: '$2,700' },
    { id: '93242854', name: 'Jenny Wilson', date: 'Mar 20, 2023', total: '$2,700' },
    { id: '11081198', name: 'Jane Cooper', date: 'Mar 20, 2023', total: '$2,700' },
    { id: '55700223', name: 'Albert Flores', date: 'Mar 20, 2023', total: '$2,700' },
  ]);

  const handleDownloadReportPdf = (
    sectionScope: 'full' | 'seller' | 'sales' | 'transfers' = 'full'
  ) => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const nowStr = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      // Top Executive Header Banner
      doc.setFillColor(20, 27, 38);
      doc.rect(0, 0, pageWidth, 34, 'F');

      doc.setFillColor(34, 117, 252);
      doc.roundedRect(14, 8, 12, 12, 2.5, 2.5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('B', 20, 16, { align: 'center' });

      doc.setFontSize(15);
      doc.text('Bazar Store Admin — Executive Analytics Report', 30, 14);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(180, 195, 215);
      doc.text(
        `Prepared by: Kristin Watson (Admin)  |  Generated: ${nowStr}`,
        30,
        20
      );
      doc.text(
        `Seller Range: ${reportSellerRange}  |  Sales Range: ${reportSaleRange}  |  Live Store Inventory: ${products.length} Products, ${orders.length} Orders`,
        30,
        26
      );

      let y = 42;

      // Section 1: Executive KPI Summary Cards
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('1. Executive KPI Summary', 14, y);
      y += 4;

      const kpiCards = [
        {
          label: 'Total Amount',
          value: '34,945',
          delta: '+1.56%',
          rgb: [59, 130, 246] as [number, number, number],
        },
        {
          label: 'Total Revenue',
          value: '$37,802',
          delta: '-1.56%',
          rgb: [249, 115, 22] as [number, number, number],
        },
        {
          label: 'Total Customer',
          value: '34,945',
          delta: '0.00%',
          rgb: [34, 197, 94] as [number, number, number],
        },
        {
          label: 'Sale / Purchase Return',
          value: '$84.86B',
          delta: '-1.02%',
          rgb: [244, 63, 94] as [number, number, number],
        },
      ];

      const cardW = (pageWidth - 28 - 9) / 4;
      kpiCards.forEach((card, idx) => {
        const x = 14 + idx * (cardW + 3);
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(x, y, cardW, 22, 2, 2, 'FD');

        doc.setFillColor(card.rgb[0], card.rgb[1], card.rgb[2]);
        doc.rect(x, y, 2, 22, 'F');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(100, 116, 139);
        doc.text(card.label, x + 5, y + 7);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.text(card.value, x + 5, y + 14.5);

        doc.setFontSize(7.5);
        doc.setTextColor(card.rgb[0], card.rgb[1], card.rgb[2]);
        doc.text(`Trend: ${card.delta}`, x + 5, y + 19.5);
      });

      y += 30;

      // Section 2: Monthly Seller Statistic & Total Sale Breakdown
      if (sectionScope === 'full' || sectionScope === 'seller' || sectionScope === 'sales') {
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(
          `2. Monthly Seller Statistic & Total Sale Breakdown (${reportSellerRange})`,
          14,
          y
        );
        y += 4;

        // Table Header
        doc.setFillColor(241, 245, 249);
        doc.rect(14, y, pageWidth - 28, 7.5, 'F');
        doc.setFontSize(8);
        doc.setTextColor(51, 65, 85);
        doc.text('Month', 18, y + 5.2);
        doc.text('Active Sellers', 48, y + 5.2);
        doc.text('Monthly Revenue', 85, y + 5.2);
        doc.text('Monthly Profit', 125, y + 5.2);
        doc.text('Performance Index', 162, y + 5.2);
        y += 7.5;

        const monthlyRows = [
          { m: 'Jan 2026', sellers: 57, rev: '$21,400', prof: '$15,200', pct: 42 },
          { m: 'Feb 2026', sellers: 78, rev: '$28,900', prof: '$20,100', pct: 58 },
          { m: 'Mar 2026', sellers: 61, rev: '$23,100', prof: '$16,400', pct: 45 },
          { m: 'Apr 2026', sellers: 75, rev: '$27,600', prof: '$19,800', pct: 56 },
          { m: 'May 2026', sellers: 35, rev: '$14,200', prof: '$9,800', pct: 26 },
          { m: 'Jun 2026', sellers: 70, rev: '$26,400', prof: '$18,900', pct: 52 },
          { m: 'Jul 2026', sellers: 88, rev: '$31,200', prof: '$22,600', pct: 66 },
          { m: 'Aug 2026', sellers: 110, rev: '$35,100', prof: '$25,900', pct: 82 },
          { m: 'Sep 2026', sellers: 82, rev: '$29,800', prof: '$21,300', pct: 61 },
          { m: 'Oct 2026', sellers: 134, rev: '$37,802', prof: '$28,305', pct: 100 },
          { m: 'Nov 2026', sellers: 44, rev: '$17,900', prof: '$12,400', pct: 33 },
        ];

        monthlyRows.forEach((row, idx) => {
          if (idx % 2 === 1) {
            doc.setFillColor(248, 250, 252);
            doc.rect(14, y, pageWidth - 28, 6.8, 'F');
          }
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(30, 41, 59);
          doc.text(row.m, 18, y + 4.8);

          doc.setFont('helvetica', 'normal');
          doc.text(`${row.sellers} Sellers`, 48, y + 4.8);
          doc.text(row.rev, 85, y + 4.8);
          doc.setTextColor(22, 163, 74);
          doc.text(row.prof, 125, y + 4.8);

          // Draw mini vector bar inside PDF
          doc.setFillColor(219, 234, 254);
          doc.roundedRect(162, y + 1.8, 28, 3.2, 1, 1, 'F');
          doc.setFillColor(37, 99, 235);
          doc.roundedRect(
            162,
            y + 1.8,
            Math.max(2, (28 * row.pct) / 100),
            3.2,
            1,
            1,
            'F'
          );

          y += 6.8;
        });

        y += 7;
      }

      // Section 3: Hourly Sale / Purchase Return Snapshot
      if (sectionScope === 'full') {
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(
          '3. Hourly Sale / Purchase Return Window (12:00 - 17:00)',
          14,
          y
        );
        y += 4;

        doc.setFillColor(255, 247, 237);
        doc.setDrawColor(254, 215, 170);
        doc.roundedRect(14, y, pageWidth - 28, 14, 2, 2, 'FD');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(124, 45, 18);
        doc.text(
          'Peak Return Window: 17:00 (Sale Return: $9,340 | Purchase Return: $4,280)   •   Lowest Window: 12:30 (Sale Return: $3,890 | Purchase Return: $1,620)',
          18,
          y + 6
        );
        doc.text(
          'Aggregate Return Volume: $84.86B (-1.02% vs prior period)   •   Active Quality Assurance Status: Verified',
          18,
          y + 11
        );
        y += 20;
      }

      // Section 4: Transfer History Table
      if (sectionScope === 'full' || sectionScope === 'transfers') {
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(
          `4. Transfer History Ledger (${reportTransfers.length} Records)`,
          14,
          y
        );
        y += 4;

        doc.setFillColor(241, 245, 249);
        doc.rect(14, y, pageWidth - 28, 7.5, 'F');
        doc.setFontSize(8);
        doc.setTextColor(51, 65, 85);
        doc.text('Transfer ID', 18, y + 5.2);
        doc.text('Recipient / Partner Name', 62, y + 5.2);
        doc.text('Transfer Date', 128, y + 5.2);
        doc.text('Total Amount', 168, y + 5.2);
        y += 7.5;

        reportTransfers.forEach((tr, idx) => {
          if (idx % 2 === 1) {
            doc.setFillColor(248, 250, 252);
            doc.rect(14, y, pageWidth - 28, 6.8, 'F');
          }
          doc.setFont('courier', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(37, 99, 235);
          doc.text(`#${tr.id}`, 18, y + 4.8);

          doc.setFont('helvetica', 'bold');
          doc.setTextColor(30, 41, 59);
          doc.text(tr.name, 62, y + 4.8);

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(100, 116, 139);
          doc.text(tr.date, 128, y + 4.8);

          doc.setFont('helvetica', 'bold');
          doc.setTextColor(15, 23, 42);
          doc.text(tr.total, 168, y + 4.8);
          y += 6.8;
        });
      }

      // Footer
      doc.setDrawColor(226, 232, 240);
      doc.line(14, 282, pageWidth - 14, 282);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text(
        'Confidential — Bazar Store Admin Dashboard Official Analytics PDF Export',
        14,
        287
      );
      doc.text('Page 1 of 1', pageWidth - 14, 287, { align: 'right' });

      const fileName =
        sectionScope === 'full'
          ? 'Bazar-Admin-Analytics-Report-2026.pdf'
          : `Bazar-Admin-${sectionScope}-Report-2026.pdf`;
      doc.save(fileName);

      setPdfExportNotice(`Downloaded ${fileName}`);
      setTimeout(() => {
        setPdfExportNotice(null);
      }, 4000);
    } finally {
      setIsGeneratingPdf(false);
    }
  };
  const [hoveredChartPoint, setHoveredChartPoint] = useState<{
    chartId: string;
    label: string;
    primaryLabel: string;
    primaryValue: string;
    secondaryLabel?: string;
    secondaryValue?: string;
  } | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    overview: true,
    products: true,
    category_list: true,
    attributes: false,
    order_list: true,
    all_users: false,
    roles: false,
  });

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Product Filter & Modal State
  const [prodSearch, setProdSearch] = useState('');
  const [prodCategoryFilter, setProdCategoryFilter] =
    useState<StoreCategorySlug>('all');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<StoreProductItem | null>(null);
  const [adminDetailProduct, setAdminDetailProduct] = useState<StoreProductItem>(
    products[0]
  );

  // Attribute Form State
  const [attrName, setAttrName] = useState('');
  const [attrValue, setAttrValue] = useState('');
  const [attrSearch, setAttrSearch] = useState('');

  // Admin Users & Roles State
  const [adminUsers, setAdminUsers] = useState([
    {
      id: 'usr_1',
      name: 'Kristin Watson',
      role: 'Super Admin',
      phone: '+880 1711-223344',
      email: 'kristin@bazar.com',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'usr_2',
      name: 'Tanvir Mahmud',
      role: 'Warehouse & Dispatch Lead',
      phone: '+880 1819-554433',
      email: 'tanvir@bazar.com',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'usr_3',
      name: 'Nusrat Jahan',
      role: 'Organic Quality Inspector',
      phone: '+880 1912-887766',
      email: 'nusrat@bazar.com',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'usr_4',
      name: 'Rafiqul Islam',
      role: 'Courier & COD Coordinator',
      phone: '+880 1611-998877',
      email: 'rafiq@bazar.com',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
  ]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserRole, setNewUserRole] = useState('Warehouse & Dispatch Lead');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserConfirmPassword, setNewUserConfirmPassword] = useState('');
  const [showUserPassword, setShowUserPassword] = useState(false);
  const [showUserConfirmPassword, setShowUserConfirmPassword] = useState(false);
  const [userPermissions, setUserPermissions] = useState<
    Record<string, 'allow' | 'deny'>
  >({
    'Add product': 'allow',
    'Update product': 'deny',
    'Delete product': 'allow',
    'Apply discount': 'deny',
    'Create coupon': 'deny',
  });

  const [roleMatrix, setRoleMatrix] = useState<
    Record<string, Record<string, boolean>>
  >({
    Roles: { All: false, Index: false, Create: false, Edit: false, Delete: false },
    Users: { All: false, Index: false, Create: false, Edit: false, Delete: false },
    Product: { All: false, Index: false, Create: false, Edit: false, Delete: false },
    Category: { All: false, Index: false, Create: false, Edit: false, Delete: false },
    Attributes: { All: false, Index: false, Create: false, Edit: false, Delete: false },
    Order: { All: false, Index: false, Create: false, Edit: false, Delete: false },
    Location: { All: false, Index: false, Create: false, Edit: false, Delete: false },
    Coupon: { All: false, Index: false, Create: false, Edit: false, Delete: false },
    Tax: { All: false, Index: false, Create: false, Edit: false, Delete: false },
    'Product review': { All: false, Index: false, Create: false, Edit: false, Delete: false },
    'Support ticket': { All: false, Index: false, Create: false, Edit: false, Delete: false },
    Report: { All: false, Index: false, Create: false, Edit: false, Delete: false },
  });

  const [adminRoles, setAdminRoles] = useState([
    {
      id: 'role_1',
      name: 'Super Admin',
      createdAt: 'March 15, 2025',
      permissions: 'Full ERP, Catalog, Orders, Finance & System Settings',
    },
    {
      id: 'role_2',
      name: 'Warehouse & Dispatch Lead',
      createdAt: 'April 02, 2025',
      permissions: 'Order Packing, Courier Assignment & Stock Count',
    },
    {
      id: 'role_3',
      name: 'Organic Quality Inspector',
      createdAt: 'May 19, 2025',
      permissions: 'Product Lab Certificates, Batch Purity & Categories',
    },
    {
      id: 'role_4',
      name: 'Customer Support Executive',
      createdAt: 'June 10, 2025',
      permissions: 'Phone POS Orders, Order Tracking & Coupons',
    },
  ]);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRolePerm, setNewRolePerm] = useState(
    'Order Packing, Courier Assignment & Stock Count'
  );

  const sidebarGroups: {
    id: string;
    sectionLabel: string;
    items: {
      id: StoreAdminPageId;
      label: string;
      bangla?: string;
      icon: React.ComponentType<{ size?: number; className?: string }>;
      children?: { id: StoreAdminPageId; label: string }[];
    }[];
  }[] = [
    {
      id: 'main_home',
      sectionLabel: 'MAIN HOME',
      items: [
        {
          id: 'overview',
          label: 'Dashboard',
          bangla: 'ড্যাশবোর্ড ওভারভিউ',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      id: 'all_page',
      sectionLabel: 'ALL PAGE',
      items: [
        {
          id: 'products',
          label: 'Ecommerce',
          bangla: 'ই-কমার্স প্রোডাক্ট',
          icon: ShoppingCart,
          children: [
            { id: 'add_product', label: 'Add Product' },
            { id: 'product_list', label: 'Product List' },
            { id: 'product_detail', label: 'Product Detail' },
            { id: 'products', label: 'Product Grid Cards' },
          ],
        },
        {
          id: 'category_list',
          label: 'Category',
          bangla: 'ক্যাটাগরি',
          icon: Layers,
          children: [
            { id: 'category_list', label: 'Category List' },
            { id: 'new_category', label: 'New Category' },
          ],
        },
        {
          id: 'attributes',
          label: 'Attributes',
          bangla: 'অ্যাট্রিবিউট ও ওজন',
          icon: SlidersHorizontal,
          children: [
            { id: 'attributes', label: 'Attributes' },
            { id: 'add_attributes', label: 'Add Attributes' },
          ],
        },
        {
          id: 'order_list',
          label: 'Order',
          bangla: 'অর্ডার ম্যানেজমেন্ট',
          icon: Package,
          children: [
            { id: 'order_list', label: 'Order List' },
            { id: 'order_detail', label: 'Order Detail' },
            { id: 'order_tracking', label: 'Order Tracking' },
          ],
        },
        {
          id: 'all_users',
          label: 'User',
          bangla: 'ইউজার ও কাস্টমার',
          icon: Users,
          children: [
            { id: 'all_users', label: 'All User' },
            { id: 'add_user', label: 'Add New User' },
            { id: 'login', label: 'Login' },
            { id: 'sign_up', label: 'Sign Up' },
          ],
        },
        {
          id: 'roles',
          label: 'Roles',
          bangla: 'রোল ও পারমিশন',
          icon: KeyRound,
          children: [
            { id: 'roles', label: 'All Roles' },
            { id: 'create_role', label: 'Create Role' },
          ],
        },
        {
          id: 'gallery',
          label: 'Gallery',
          bangla: 'মিডিয়া গ্যালারি',
          icon: ImageIcon,
        },
        {
          id: 'report',
          label: 'Report',
          bangla: 'সেলস রিপোর্ট',
          icon: BarChart3,
        },
        {
          id: 'coupons_offers',
          label: 'Coupons & Offers',
          bangla: 'কুপন ও অফার',
          icon: TicketPercent,
        },
      ],
    },
    {
      id: 'setting_group',
      sectionLabel: 'SETTING',
      items: [
        {
          id: 'system_settings',
          label: 'Setting',
          bangla: 'সিস্টেম সেটিংস',
          icon: Settings,
        },
      ],
    },
  ];

  // New / Edit Product Form Fields
  const [formName, setFormName] = useState('');
  const [formBanglaSub, setFormBanglaSub] = useState('');
  const [formCategory, setFormCategory] =
    useState<StoreCategorySlug>('honey');
  const [formPrice, setFormPrice] = useState<number>(1150);
  const [formRegularPrice, setFormRegularPrice] = useState<number>(1350);
  const [formWeight, setFormWeight] = useState('1 kg');
  const [formSku, setFormSku] = useState('BZ-NEW-101');
  const [formBadge, setFormBadge] = useState('NEW ARRIVAL');
  const [formImage, setFormImage] = useState(
    'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=700&q=85'
  );
  const [formShortDesc, setFormShortDesc] = useState(
    '100% pure, lab-tested organic food sourced directly from local farms.'
  );
  const [formInStock, setFormInStock] = useState(true);
  const [formIsOffer, setFormIsOffer] = useState(true);
  const [formIsBestSeller, setFormIsBestSeller] = useState(false);

  // Order Filter & Invoice Modal State
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('ALL');
  const [orderSearch, setOrderSearch] = useState('');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] =
    useState<StoreOrderRecord | null>(null);
  const [isManualOrderModalOpen, setIsManualOrderModalOpen] = useState(false);
  const [manualCustomerName, setManualCustomerName] = useState('');
  const [manualCustomerPhone, setManualCustomerPhone] = useState('');
  const [manualCustomerAddress, setManualCustomerAddress] = useState('');
  const [manualZone, setManualZone] = useState<'inside_dhaka' | 'outside_dhaka'>(
    'inside_dhaka'
  );

  // Category Form State
  const [newCatLabel, setNewCatLabel] = useState('');
  const [newCatBangla, setNewCatBangla] = useState('');
  const [newCatImage, setNewCatImage] = useState(
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'
  );

  // Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'flat' | 'percent'>('flat');
  const [newCouponValue, setNewCouponValue] = useState<number>(150);
  const [newCouponMinOrder, setNewCouponMinOrder] = useState<number>(1000);
  const [newCouponDesc, setNewCouponDesc] = useState(
    'Special discount on Bazar organic products'
  );

  const openAddProductModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormBanglaSub('১০০% খাঁটি ও অর্গানিক প্রাকৃতিক পণ্য');
    setFormCategory('honey');
    setFormPrice(1200);
    setFormRegularPrice(1400);
    setFormWeight('1 kg');
    setFormSku(`BZ-PRD-${Math.floor(100 + Math.random() * 899)}`);
    setFormBadge('SAVE ৳200');
    setFormImage(
      'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=700&q=85'
    );
    setFormShortDesc(
      '100% pure, chemical-free organic product sourced directly from trusted farms.'
    );
    setFormInStock(true);
    setFormIsOffer(true);
    setFormIsBestSeller(true);
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod: StoreProductItem) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormBanglaSub(prod.banglaSub || '');
    setFormCategory(prod.category);
    setFormPrice(prod.price);
    setFormRegularPrice(prod.regularPrice || prod.price);
    setFormWeight(prod.weight);
    setFormSku(prod.sku);
    setFormBadge(prod.badge || '');
    setFormImage(prod.image);
    setFormShortDesc(prod.shortDescription);
    setFormInStock(prod.inStock);
    setFormIsOffer(Boolean(prod.isOfferZone));
    setFormIsBestSeller(Boolean(prod.isBestSeller));
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;
    const catObj = categories.find((c) => c.slug === formCategory);
    const categoryLabel = catObj ? catObj.label : 'Organic Superfood';

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName,
        banglaSub: formBanglaSub,
        category: formCategory,
        categoryLabel,
        price: Number(formPrice),
        regularPrice: Number(formRegularPrice),
        weight: formWeight,
        sku: formSku,
        badge: formBadge,
        image: formImage,
        shortDescription: formShortDesc,
        inStock: formInStock,
        isOfferZone: formIsOffer,
        isBestSeller: formIsBestSeller,
      });
    } else {
      addProduct({
        name: formName,
        banglaSub: formBanglaSub,
        category: formCategory,
        categoryLabel,
        price: Number(formPrice),
        regularPrice: Number(formRegularPrice),
        weight: formWeight,
        weightOptions: ['500 gm', formWeight, '2 kg'],
        rating: 4.9,
        reviewsCount: 25,
        inStock: formInStock,
        isOfferZone: formIsOffer,
        isBestSeller: formIsBestSeller,
        badge: formBadge,
        sku: formSku,
        image: formImage,
        gallery: [formImage],
        shortDescription: formShortDesc,
        highlights: [
          '100% raw & lab-tested purity guarantee',
          'Directly sourced from verified organic farms',
          'Zero artificial preservatives or colors',
        ],
        nutritionFacts: [
          { label: 'Purity', value: '100% Natural' },
          { label: 'Pack Size', value: formWeight },
        ],
      });
    }
    setIsProductModalOpen(false);
  };

  const handleCreateManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCustomerName.trim() || !manualCustomerPhone.trim()) return;
    placeOrder({
      customerName: manualCustomerName,
      phone: manualCustomerPhone,
      address: manualCustomerAddress || 'Dhaka, Bangladesh',
      deliveryZone: manualZone,
      paymentMethod: 'cod',
      notes: 'Created via Admin Phone/WhatsApp POS',
    });
    setManualCustomerName('');
    setManualCustomerPhone('');
    setManualCustomerAddress('');
    setIsManualOrderModalOpen(false);
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatLabel.trim()) return;
    const slug = newCatLabel
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_') as StoreCategorySlug;
    addCategory({
      slug,
      label: newCatLabel,
      bangla: newCatBangla || 'অর্গানিক পণ্য',
      count: 5,
      image: newCatImage,
    });
    setNewCatLabel('');
    setNewCatBangla('');
  };

  const handleAddCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      type: newCouponType,
      value: Number(newCouponValue),
      minOrder: Number(newCouponMinOrder),
      active: true,
      usageCount: 0,
      description: newCouponDesc,
    });
    setNewCouponCode('');
  };

  const filteredAdminProducts = products.filter((prod) => {
    if (
      prodCategoryFilter !== 'all' &&
      prodCategoryFilter !== 'offer_zone' &&
      prodCategoryFilter !== 'best_seller' &&
      prod.category !== prodCategoryFilter
    ) {
      return false;
    }
    if (prodCategoryFilter === 'offer_zone' && !prod.isOfferZone) return false;
    if (prodCategoryFilter === 'best_seller' && !prod.isBestSeller) return false;
    if (prodSearch.trim()) {
      const q = prodSearch.toLowerCase();
      return (
        prod.name.toLowerCase().includes(q) ||
        prod.sku.toLowerCase().includes(q) ||
        prod.categoryLabel.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredOrders = orders.filter((ord) => {
    if (orderStatusFilter !== 'ALL' && ord.status !== orderStatusFilter) {
      return false;
    }
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        ord.orderId.toLowerCase().includes(q) ||
        ord.customerName.toLowerCase().includes(q) ||
        ord.phone.includes(q)
      );
    }
    return true;
  });

  // Render an Admin Product Management Card (Matches Bazar StoreCatalogSection Card Style)
  const renderAdminProductCard = (prod: StoreProductItem) => (
    <div
      key={prod.id}
      className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl ${
        isDark
          ? 'bg-[#171F2C] border-white/10'
          : variant === 'varient_2'
          ? 'bg-[#FFFBF7] border-orange-200/80'
          : 'bg-white border-slate-200/80 shadow-xs'
      }`}
    >
      <div>
        {/* Product Image Box */}
        <div
          onClick={() => {
            setAdminDetailProduct(prod);
            setActiveAdminPage('product_detail');
          }}
          className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
        >
          <EditableImage
            id={`admin_prod_img_${prod.id}`}
            defaultSrc={prod.image}
            alt={prod.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <span
            className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg text-[10px] font-black text-white shadow-sm"
            style={{
              backgroundColor: prod.inStock ? primaryColor : '#64748B',
            }}
          >
            {prod.inStock ? prod.badge || 'IN STOCK' : 'OUT OF STOCK'}
          </span>

          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => openEditProductModal(prod)}
              className="w-8 h-8 rounded-full bg-white/95 text-slate-800 hover:bg-white flex items-center justify-center shadow-md transition cursor-pointer"
              title="Edit Product Details"
            >
              <Edit3 size={14} />
            </button>
            <button
              type="button"
              onClick={() => deleteProduct(prod.id)}
              className="w-8 h-8 rounded-full bg-rose-600 text-white hover:bg-rose-700 flex items-center justify-center shadow-md transition cursor-pointer"
              title="Delete Product"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {prod.categoryLabel}
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              {prod.sku}
            </span>
          </div>

          <EditableText
            id={`admin_prod_name_${prod.id}`}
            as="h3"
            defaultText={prod.name}
            className="text-xs sm:text-sm font-extrabold leading-snug line-clamp-2 block"
          />

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-base sm:text-lg font-black"
                style={{ color: primaryColor }}
              >
                ৳{prod.price.toLocaleString()}
              </span>
              {prod.regularPrice && (
                <span className="text-xs line-through text-slate-400">
                  ৳{prod.regularPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-[10px] font-bold">
              {prod.weight}
            </span>
          </div>

          {/* Admin Quick Status Pills */}
          <div className="flex flex-wrap gap-1 pt-1">
            <button
              type="button"
              onClick={() =>
                updateProduct(prod.id, { isOfferZone: !prod.isOfferZone })
              }
              className={`px-2 py-0.5 rounded text-[10px] font-extrabold cursor-pointer ${
                prod.isOfferZone
                  ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/70 dark:text-orange-300'
                  : 'bg-slate-100 text-slate-400 dark:bg-white/5'
              }`}
            >
              {prod.isOfferZone ? '★ Offer Zone' : '+ Offer Zone'}
            </button>
            <button
              type="button"
              onClick={() =>
                updateProduct(prod.id, { isBestSeller: !prod.isBestSeller })
              }
              className={`px-2 py-0.5 rounded text-[10px] font-extrabold cursor-pointer ${
                prod.isBestSeller
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300'
                  : 'bg-slate-100 text-slate-400 dark:bg-white/5'
              }`}
            >
              {prod.isBestSeller ? '✓ Best Seller' : '+ Best Seller'}
            </button>
          </div>
        </div>
      </div>

      {/* Dual Action Buttons Matching Store Catalog Card */}
      <div className="p-3 pt-0 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => updateProduct(prod.id, { inStock: !prod.inStock })}
          className="py-2 px-2.5 rounded-xl border-2 text-[11px] font-extrabold flex items-center justify-center gap-1 transition hover:opacity-90 cursor-pointer"
          style={{
            borderColor: prod.inStock ? '#059669' : '#E11D48',
            color: prod.inStock ? '#059669' : '#E11D48',
          }}
        >
          <span>{prod.inStock ? '✓ In Stock' : 'Out of Stock'}</span>
        </button>
        <button
          type="button"
          onClick={() => openEditProductModal(prod)}
          className="py-2 px-2.5 rounded-xl text-[11px] font-extrabold text-white shadow-xs transition hover:opacity-95 cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          এডিট করুন (Edit)
        </button>
      </div>
    </div>
  );

  if (
    !isAdminAuthenticated ||
    activeAdminPage === 'login' ||
    activeAdminPage === 'sign_up' ||
    activeAdminPage === 'auth_login' ||
    activeAdminPage === 'auth_sign_up'
  ) {
    const isRegisterView =
      authMode === 'register' ||
      activeAdminPage === 'sign_up' ||
      activeAdminPage === 'auth_sign_up';

    return (
      <section
        className={`min-h-[calc(100vh-32px)] py-10 px-4 sm:px-6 flex items-center justify-center transition-colors ${
          isDark ? 'bg-[#0F141C] text-white' : 'bg-[#F2F7FB] text-slate-900'
        }`}
      >
        <div
          className={`w-full max-w-xl rounded-3xl p-8 sm:p-11 border shadow-xl space-y-7 ${
            isDark
              ? 'bg-[#171F2C] border-white/10 text-white'
              : 'bg-white border-slate-200/80 text-slate-900'
          }`}
        >
          {/* Brand Logo & Heading */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 pb-1">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-xs"
                style={{ backgroundColor: primaryColor }}
              >
                B
              </div>
              <div>
                <span className="text-xl font-black tracking-tight">Bazar</span>
                <span
                  className="ml-1.5 px-2 py-0.5 rounded text-[10px] font-black text-white uppercase"
                  style={{ backgroundColor: primaryColor }}
                >
                  ADMIN
                </span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isRegisterView ? 'Create your account' : 'Login to account'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {isRegisterView
                ? 'Enter your personal details to create account'
                : 'Enter your email & password to login'}
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsAdminAuthenticated(true);
              setActiveAdminPage('overview');
            }}
            className="space-y-5 text-xs"
          >
            {isRegisterView && (
              <div className="space-y-2">
                <label className="block text-sm font-black">
                  Your name <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={authFirstName}
                    onChange={(e) => setAuthFirstName(e.target.value)}
                    placeholder="First name"
                    className={`w-full px-4 py-3.5 rounded-2xl border text-xs font-medium focus:outline-none focus:border-blue-600 ${
                      isDark
                        ? 'bg-[#1D2636] border-white/10 text-white'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                  <input
                    type="text"
                    required
                    value={authLastName}
                    onChange={(e) => setAuthLastName(e.target.value)}
                    placeholder="Last name"
                    className={`w-full px-4 py-3.5 rounded-2xl border text-xs font-medium focus:outline-none focus:border-blue-600 ${
                      isDark
                        ? 'bg-[#1D2636] border-white/10 text-white'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-2">
              <label className="block text-sm font-black">
                Email address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3.5 rounded-2xl border text-xs font-medium focus:outline-none focus:border-blue-600 ${
                  isDark
                    ? 'bg-[#1D2636] border-white/10 text-white'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-black">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showAuthPassword ? 'text' : 'password'}
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full px-4 pr-11 py-3.5 rounded-2xl border text-xs font-medium focus:outline-none focus:border-blue-600 ${
                    isDark
                      ? 'bg-[#1D2636] border-white/10 text-white'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowAuthPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showAuthPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Register only) */}
            {isRegisterView && (
              <div className="space-y-2">
                <label className="block text-sm font-black">
                  Confirm password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showAuthConfirmPassword ? 'text' : 'password'}
                    required
                    value={authConfirmPassword}
                    onChange={(e) => setAuthConfirmPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full px-4 pr-11 py-3.5 rounded-2xl border text-xs font-medium focus:outline-none focus:border-blue-600 ${
                      isDark
                        ? 'bg-[#1D2636] border-white/10 text-white'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowAuthConfirmPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showAuthConfirmPassword ? (
                      <Eye size={16} />
                    ) : (
                      <EyeOff size={16} />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Keep me signed in / Privacy Policy row */}
            <div className="flex items-center justify-between gap-2 pt-1">
              {isRegisterView ? (
                <label className="inline-flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                  />
                  <span>Agree with Privacy Policy</span>
                </label>
              ) : (
                <>
                  <label className="inline-flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={keepSignedIn}
                      onChange={(e) => setKeepSignedIn(e.target.checked)}
                      className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                    />
                    <span>Keep me signed in</span>
                  </label>
                  <button
                    type="button"
                    className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </>
              )}
            </div>

            {/* Submit Button -> Opens Dashboard */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-extrabold shadow-md transition cursor-pointer"
            >
              {isRegisterView ? 'Register' : 'Login'}
            </button>
          </form>

          {/* Or continue with social login */}
          <div className="space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 dark:border-white/10 w-full" />
              <span
                className={`px-3 text-[11px] text-slate-400 whitespace-nowrap ${
                  isDark ? 'bg-[#171F2C]' : 'bg-white'
                }`}
              >
                Or continue with social account
              </span>
              <div className="border-t border-slate-200 dark:border-white/10 w-full" />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() => {
                  setIsAdminAuthenticated(true);
                  setActiveAdminPage('overview');
                }}
                className={`py-3 px-4 rounded-2xl border text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
                  isDark
                    ? 'border-white/15 hover:bg-white/5 text-white'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <span className="text-sm font-black text-rose-500">G</span>
                <span>Sign in with Google</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsAdminAuthenticated(true);
                  setActiveAdminPage('overview');
                }}
                className={`py-3 px-4 rounded-2xl border text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
                  isDark
                    ? 'border-white/15 hover:bg-white/5 text-white'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <span className="text-sm font-black text-blue-600">f</span>
                <span>Sign in with Facebook</span>
              </button>
            </div>
          </div>

          {/* Toggle between Login and Register */}
          <div className="text-center text-xs text-slate-500 pt-1">
            {isRegisterView ? (
              <span>
                You have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    if (
                      activeAdminPage === 'sign_up' ||
                      activeAdminPage === 'auth_sign_up'
                    ) {
                      setActiveAdminPage('login');
                    }
                  }}
                  className="font-extrabold text-blue-600 hover:underline cursor-pointer"
                >
                  Login Now
                </button>
              </span>
            ) : (
              <span>
                You don&apos;t have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    if (
                      activeAdminPage === 'login' ||
                      activeAdminPage === 'auth_login'
                    ) {
                      setActiveAdminPage('sign_up');
                    }
                  }}
                  className="font-extrabold text-blue-600 hover:underline cursor-pointer"
                >
                  Register Now
                </button>
              </span>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`py-8 px-4 sm:px-6 transition-colors ${
        isDark ? 'bg-[#0F141C] text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* =================================================================== */}
        {/* MODAL 1: ADD / EDIT PRODUCT MODAL                                   */}
        {/* =================================================================== */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => setIsProductModalOpen(false)}
              className="fixed inset-0 bg-black/55 backdrop-blur-xs"
            />
            <div
              className={`relative z-10 w-full max-w-2xl rounded-3xl p-6 shadow-2xl border max-h-[90vh] overflow-y-auto ${
                isDark
                  ? 'bg-[#151D2A] border-white/15 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-lg font-black">
                  {editingProduct
                    ? `Edit Product: ${editingProduct.name}`
                    : '+ নতুন প্রোডাক্ট যোগ করুন (Add New Organic Product)'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-1.5 rounded-full border border-slate-200 dark:border-white/15 cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 pt-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-extrabold mb-1">
                      Product Name (English &amp; Bangla) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Sundarban Litchi Flower Honey (লিচু ফুলের মধু)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-slate-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold mb-1">
                      Bangla Tagline / Subtitle
                    </label>
                    <input
                      type="text"
                      value={formBanglaSub}
                      onChange={(e) => setFormBanglaSub(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-slate-900 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-extrabold mb-1">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) =>
                        setFormCategory(e.target.value as StoreCategorySlug)
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-slate-900 font-bold"
                    >
                      {categories.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-extrabold mb-1">
                      Sale Price (৳) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-slate-900 font-black"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold mb-1">
                      Regular Price (৳)
                    </label>
                    <input
                      type="number"
                      value={formRegularPrice}
                      onChange={(e) => setFormRegularPrice(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-slate-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold mb-1">
                      Pack Weight
                    </label>
                    <input
                      type="text"
                      value={formWeight}
                      onChange={(e) => setFormWeight(e.target.value)}
                      placeholder="1 kg / 5 Liter"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-slate-900 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-extrabold mb-1">SKU Code</label>
                    <input
                      type="text"
                      value={formSku}
                      onChange={(e) => setFormSku(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-slate-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold mb-1">
                      Promo Badge Text
                    </label>
                    <input
                      type="text"
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value)}
                      placeholder="SAVE ৳200 / BEST SELLER"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold mb-1">
                      Product Image URL
                    </label>
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-slate-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-extrabold mb-1">
                    Purity &amp; Sourcing Description
                  </label>
                  <textarea
                    rows={2}
                    value={formShortDesc}
                    onChange={(e) => setFormShortDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-slate-900 font-medium"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <label className="inline-flex items-center gap-2 font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formInStock}
                      onChange={(e) => setFormInStock(e.target.checked)}
                    />
                    <span>In Stock (Available for Order)</span>
                  </label>
                  <label className="inline-flex items-center gap-2 font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsOffer}
                      onChange={(e) => setFormIsOffer(e.target.checked)}
                    />
                    <span>Include in OFFER ZONE</span>
                  </label>
                  <label className="inline-flex items-center gap-2 font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsBestSeller}
                      onChange={(e) => setFormIsBestSeller(e.target.checked)}
                    />
                    <span>Mark as Best Seller</span>
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-white font-extrabold shadow-md cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {editingProduct ? 'Save Product Changes' : '+ Publish Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* MODAL 2: ORDER INVOICE & PACKING SLIP MODAL                         */}
        {/* =================================================================== */}
        {selectedInvoiceOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => setSelectedInvoiceOrder(null)}
              className="fixed inset-0 bg-black/55 backdrop-blur-xs"
            />
            <div
              className={`relative z-10 w-full max-w-xl rounded-3xl p-6 shadow-2xl border space-y-4 ${
                isDark
                  ? 'bg-[#151D2A] border-white/15 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-white/10">
                <div>
                  <span
                    className="text-xs font-extrabold uppercase"
                    style={{ color: primaryColor }}
                  >
                    Bazar Official Courier Invoice
                  </span>
                  <h3 className="text-lg font-black">
                    Invoice #{selectedInvoiceOrder.orderId}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="p-1.5 rounded-full border border-slate-200 dark:border-white/15 cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-slate-400 font-bold">Billed &amp; Shipped To:</div>
                  <div className="font-extrabold text-sm mt-0.5">
                    {selectedInvoiceOrder.customerName}
                  </div>
                  <div>{selectedInvoiceOrder.phone}</div>
                  <div className="text-slate-500">{selectedInvoiceOrder.address}</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 font-bold">Dispatch Details:</div>
                  <div className="font-bold">Date: {selectedInvoiceOrder.createdAt}</div>
                  <div>
                    Payment:{' '}
                    <strong className="uppercase">
                      {selectedInvoiceOrder.paymentMethod}
                    </strong>
                  </div>
                  <div>
                    Courier:{' '}
                    <strong>{storeSettings.autoAssignCourier} Express</strong>
                  </div>
                </div>
              </div>

              <div className="border-t border-b py-3 border-slate-200 dark:border-white/10 space-y-2 text-xs">
                {selectedInvoiceOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between font-semibold"
                  >
                    <span>
                      {item.quantity}x {item.product.name} ({item.selectedWeight})
                    </span>
                    <span className="font-black">
                      ৳{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm font-black">
                <span>Total Collectible Amount:</span>
                <span className="text-xl" style={{ color: primaryColor }}>
                  ৳{selectedInvoiceOrder.total.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white flex items-center gap-1.5 cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Printer size={14} />
                  <span>Print Courier Label</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* MODAL 3: MANUAL POS / PHONE ORDER MODAL                             */}
        {/* =================================================================== */}
        {isManualOrderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => setIsManualOrderModalOpen(false)}
              className="fixed inset-0 bg-black/55 backdrop-blur-xs"
            />
            <div
              className={`relative z-10 w-full max-w-md rounded-3xl p-6 shadow-2xl border space-y-4 ${
                isDark
                  ? 'bg-[#151D2A] border-white/15 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black">
                  + Create Phone / WhatsApp POS Order
                </h3>
                <button
                  type="button"
                  onClick={() => setIsManualOrderModalOpen(false)}
                  className="p-1 rounded-lg border cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
              <form onSubmit={handleCreateManualOrder} className="space-y-3 text-xs">
                <div>
                  <label className="block font-extrabold mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={manualCustomerName}
                    onChange={(e) => setManualCustomerName(e.target.value)}
                    placeholder="e.g. Sabbir Rahman"
                    className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-extrabold mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={manualCustomerPhone}
                    onChange={(e) => setManualCustomerPhone(e.target.value)}
                    placeholder="017XX-XXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-extrabold mb-1">Delivery Address *</label>
                  <input
                    type="text"
                    required
                    value={manualCustomerAddress}
                    onChange={(e) => setManualCustomerAddress(e.target.value)}
                    placeholder="House, Road, Area, City"
                    className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-extrabold mb-1">Delivery Zone</label>
                  <select
                    value={manualZone}
                    onChange={(e) =>
                      setManualZone(
                        e.target.value as 'inside_dhaka' | 'outside_dhaka'
                      )
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 font-bold"
                  >
                    <option value="inside_dhaka">Inside Dhaka (৳60)</option>
                    <option value="outside_dhaka">Outside Dhaka (৳120)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-white font-extrabold shadow-md cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  Confirm &amp; Dispatch Order
                </button>
              </form>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* MAIN WORKSPACE: LEFT SIDEBAR + RIGHT ADMIN PAGE CONTENT             */}
        {/* =================================================================== */}
        <div className="flex flex-col lg:flex-row items-stretch lg:h-[calc(100vh-32px)] rounded-3xl border border-slate-200/90 dark:border-white/10 overflow-hidden shadow-sm">
          {/* LEFT SIDEBAR NAVIGATION (Menu Icon Hover Mode + Bazar Branding) */}
          <aside
            onMouseEnter={() => {
              if (sidebarCollapsed) setSidebarHoverExpanded(true);
            }}
            onMouseLeave={() => {
              setSidebarHoverExpanded(false);
            }}
            className={`w-full ${
              sidebarCollapsed && !sidebarHoverExpanded ? 'lg:w-20' : 'lg:w-64'
            } flex-shrink-0 border-r border-slate-200/80 dark:border-white/10 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden ${
              isDark
                ? 'bg-[#141B26] text-white'
                : 'bg-white text-slate-900'
            }`}
          >
            <div className="flex flex-col flex-1 min-h-0">
              {/* Brand Logo Header */}
              <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 dark:border-white/10 flex-shrink-0">
                {(!sidebarCollapsed || sidebarHoverExpanded) && (
                  <div
                    onClick={() => setActiveAdminPage('overview')}
                    className="flex items-center gap-2.5 cursor-pointer"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black shadow-xs"
                      style={{ backgroundColor: primaryColor }}
                    >
                      B
                    </div>
                    <div>
                      <span className="text-lg font-black tracking-tight">
                        Bazar
                      </span>
                      <span
                        className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-black text-white uppercase"
                        style={{ backgroundColor: primaryColor }}
                      >
                        ADMIN
                      </span>
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setSidebarCollapsed((v) => !v)}
                  className="p-1.5 rounded-xl border border-slate-200 dark:border-white/15 hover:bg-orange-50 dark:hover:bg-white/10 transition cursor-pointer"
                  title={
                    sidebarCollapsed
                      ? 'Pin Sidebar Open'
                      : 'Switch to Menu Icon Hover Mode'
                  }
                >
                  {sidebarCollapsed ? (
                    <PanelLeftOpen size={15} style={{ color: primaryColor }} />
                  ) : (
                    <PanelLeftClose size={15} style={{ color: primaryColor }} />
                  )}
                </button>
              </div>

              {/* Sidebar Groups */}
              <div className="p-3.5 space-y-5 flex-1 overflow-y-auto">
                {sidebarGroups.map((group) => {
                  const showFullMenu = !sidebarCollapsed || sidebarHoverExpanded;
                  return (
                    <div key={group.id} className="space-y-1.5">
                      {showFullMenu && (
                        <div className="px-2.5 text-[10px] font-black tracking-wider uppercase text-slate-400">
                          {group.sectionLabel}
                        </div>
                      )}
                      <div className="space-y-1">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          const hasChildren = Boolean(item.children?.length);
                          const isExpanded = expandedGroups[item.id];
                          const isDirectActive = activeAdminPage === item.id;
                          const isChildActive = Boolean(
                            item.children?.some((c) => c.id === activeAdminPage)
                          );
                          const highlighted = isDirectActive || isChildActive;

                          return (
                            <div key={item.id} className="space-y-1">
                              <button
                                type="button"
                                onClick={() => {
                                  if (hasChildren) {
                                    toggleGroup(item.id);
                                    setActiveAdminPage(item.children![0].id);
                                  } else {
                                    setActiveAdminPage(item.id);
                                  }
                                }}
                                className={`w-full px-3 py-2.5 rounded-xl text-xs font-extrabold flex items-center ${
                                  showFullMenu
                                    ? 'justify-between'
                                    : 'justify-center'
                                } gap-2 transition cursor-pointer ${
                                  highlighted
                                    ? 'text-white shadow-xs'
                                    : 'text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-white/5'
                                }`}
                                style={
                                  highlighted
                                    ? { backgroundColor: primaryColor }
                                    : undefined
                                }
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <Icon size={16} className="flex-shrink-0" />
                                  {showFullMenu && (
                                    <div className="text-left truncate">
                                      <div className="leading-tight truncate">
                                        {item.label}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {showFullMenu && hasChildren && (
                                  <span>
                                    {isExpanded ? (
                                      <ChevronDown size={14} />
                                    ) : (
                                      <ChevronRight size={14} />
                                    )}
                                  </span>
                                )}
                              </button>

                              {/* Submenu Items */}
                              {showFullMenu && hasChildren && isExpanded && (
                                <div className="pl-6 pr-1 py-1 space-y-1 border-l border-slate-200 dark:border-white/10 ml-4">
                                  {item.children!.map((sub) => {
                                    const subActive = activeAdminPage === sub.id;
                                    return (
                                      <button
                                        key={sub.id}
                                        type="button"
                                        onClick={() => setActiveAdminPage(sub.id)}
                                        className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-2 transition cursor-pointer ${
                                          subActive
                                            ? 'font-black bg-orange-50 dark:bg-white/10'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                        style={
                                          subActive
                                            ? { color: primaryColor }
                                            : undefined
                                        }
                                      >
                                        <span
                                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                          style={{
                                            backgroundColor: subActive
                                              ? primaryColor
                                              : '#CBD5E1',
                                          }}
                                        />
                                        <span className="truncate">{sub.label}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Help Card at Bottom (Matches Remos Screenshot) */}
            {!sidebarCollapsed && (
              <div className="p-4 m-3 rounded-2xl bg-[#FFF6EE] dark:bg-white/5 border border-orange-200/70 dark:border-white/10 space-y-2 text-center">
                <div className="text-xs font-black">Hi, how can we help?</div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Contact us if you have any assistance, we will contact you as soon as possible
                </p>
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('system_settings')}
                  className="w-full py-2 rounded-xl text-xs font-extrabold text-white shadow-xs cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  Contact
                </button>
              </div>
            )}
          </aside>

          {/* RIGHT MAIN PAGE VIEWPORT (Fixed Top Header + Independent Right-Side Y-Scroll Content) */}
          <div
            className={`flex-1 min-w-0 w-full h-full flex flex-col overflow-hidden ${
              isDark ? 'bg-[#0F141C]' : 'bg-[#F8FAFC]'
            }`}
          >
            {/* REMOS-STYLE TOP BAR: Search Here + Language + Notifications + Kristin Watson Admin Profile */}
            <div
              className={`px-6 py-3.5 border-b flex-shrink-0 flex flex-wrap items-center justify-between gap-4 ${
                isDark
                  ? 'bg-[#141B26] border-white/10'
                  : 'bg-white border-slate-200/80'
              }`}
            >
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={prodSearch}
                  onChange={(e) => setProdSearch(e.target.value)}
                  placeholder="Search here..."
                  className={`w-full pl-4 pr-10 py-2 rounded-xl border text-xs font-semibold focus:outline-none ${
                    isDark
                      ? 'bg-[#1D2636] border-white/10 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
                <Search
                  size={15}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* Notification Bell with Orange Badge 1 */}
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('order_list')}
                  className={`relative w-9 h-9 rounded-full flex items-center justify-center transition cursor-pointer ${
                    isDark
                      ? 'bg-[#1D2636] text-slate-200 hover:bg-white/10'
                      : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/70'
                  }`}
                  title="Notifications"
                >
                  <Bell size={16} />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#FF6B2C] text-white text-[9px] font-black flex items-center justify-center">
                    1
                  </span>
                </button>

                {/* Messages Icon with Blue Badge 1 */}
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('order_tracking')}
                  className={`relative w-9 h-9 rounded-full flex items-center justify-center transition cursor-pointer ${
                    isDark
                      ? 'bg-[#1D2636] text-slate-200 hover:bg-white/10'
                      : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/70'
                  }`}
                  title="Messages"
                >
                  <MessageSquare size={15} />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#2275FC] text-white text-[9px] font-black flex items-center justify-center">
                    1
                  </span>
                </button>

                {/* Fullscreen / Expand Icon */}
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('gallery')}
                  className={`hidden md:flex w-9 h-9 rounded-full items-center justify-center transition cursor-pointer ${
                    isDark
                      ? 'bg-[#1D2636] text-slate-200 hover:bg-white/10'
                      : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/70'
                  }`}
                  title="Gallery View"
                >
                  <Maximize2 size={15} />
                </button>

                {/* Apps Grid Icon */}
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('overview')}
                  className={`hidden md:flex w-9 h-9 rounded-full items-center justify-center transition cursor-pointer ${
                    isDark
                      ? 'bg-[#1D2636] text-slate-200 hover:bg-white/10'
                      : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/70'
                  }`}
                  title="Dashboard Overview"
                >
                  <LayoutGrid size={15} />
                </button>

                {/* Kristin Watson Profile + Remos Dropdown Menu */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
                    className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-100/70 dark:hover:bg-white/5 transition cursor-pointer"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
                      alt="Kristin Watson"
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-white/15"
                    />
                    <div className="hidden sm:block leading-tight text-left">
                      <div className="text-xs font-black">Kristin Watson</div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        Admin
                      </div>
                    </div>
                  </button>

                  {isProfileDropdownOpen && (
                    <>
                      <div
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="fixed inset-0 z-40"
                      />
                      <div
                        className={`absolute right-0 mt-3 w-52 rounded-2xl border shadow-xl py-3 px-2 z-50 transition-all ${
                          isDark
                            ? 'bg-[#151D2A] border-white/10 text-white'
                            : 'bg-white border-slate-100 text-slate-800 shadow-slate-200/80'
                        }`}
                      >
                        <div className="space-y-0.5">
                          {/* 1. Account */}
                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              setActiveAdminPage('add_user');
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl flex items-center gap-3 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition cursor-pointer"
                          >
                            <User size={16} className="text-slate-400" />
                            <span>Account</span>
                          </button>

                          {/* 2. Inbox + 27 Badge */}
                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              setActiveAdminPage('order_list');
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <Mail size={16} className="text-slate-400" />
                              <span>Inbox</span>
                            </div>
                            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-extrabold flex items-center justify-center">
                              27
                            </span>
                          </button>

                          {/* 3. Taskboard */}
                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              setActiveAdminPage('report');
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl flex items-center gap-3 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition cursor-pointer"
                          >
                            <FileText size={16} className="text-slate-400" />
                            <span>Taskboard</span>
                          </button>

                          {/* 4. Setting */}
                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              setActiveAdminPage('system_settings');
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl flex items-center gap-3 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition cursor-pointer"
                          >
                            <Settings size={16} className="text-slate-400" />
                            <span>Setting</span>
                          </button>

                          {/* 5. Support */}
                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              setActiveAdminPage('help_center');
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl flex items-center gap-3 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition cursor-pointer"
                          >
                            <Headphones size={16} className="text-slate-400" />
                            <span>Support</span>
                          </button>

                          {/* 6. Log out */}
                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              setIsAdminAuthenticated(false);
                              setAuthMode('login');
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl flex items-center gap-3 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 transition cursor-pointer"
                          >
                            <LogOut size={16} className="text-slate-400" />
                            <span>Log out</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Right Settings Gear Icon */}
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('system_settings')}
                  className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer"
                  title="Settings"
                >
                  <Settings size={18} className="animate-[spin_12s_linear_infinite]" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8 flex-1 overflow-y-auto">
        {/* =================================================================== */}
        {/* PAGE 1 & 2: PRODUCTS & INVENTORY MANAGEMENT ('products')            */}
        {/* =================================================================== */}
        {activeAdminPage === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-200/80 dark:border-white/10">
              <div>
                <EditableText
                  id="bazar_admin_prod_heading"
                  as="h2"
                  defaultText={
                    activeAdminPage === 'overview'
                      ? title
                      : 'প্রোডাক্ট ও স্টক ম্যানেজমেন্ট (Products & Inventory)'
                  }
                  className="text-xl sm:text-2xl font-black tracking-tight block"
                />
                <EditableText
                  id="bazar_admin_prod_sub"
                  as="p"
                  defaultText={subtitle}
                  className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    value={prodSearch}
                    onChange={(e) => setProdSearch(e.target.value)}
                    placeholder="Filter by name or SKU..."
                    className={`pl-3.5 pr-8 py-2 rounded-xl border text-xs font-semibold ${
                      isDark
                        ? 'bg-[#171F2C] border-white/15 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <button
                  type="button"
                  onClick={openAddProductModal}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-white shadow-sm flex items-center gap-1.5 cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Plus size={14} />
                  <span>+ Add New Product</span>
                </button>
              </div>
            </div>

            {/* Category Filter Pills (Same as StoreCatalogSection) */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setProdCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer ${
                  prodCategoryFilter === 'all'
                    ? 'text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300'
                }`}
                style={
                  prodCategoryFilter === 'all'
                    ? { backgroundColor: primaryColor }
                    : undefined
                }
              >
                All Products ({products.length})
              </button>
              {categories.slice(0, 7).map((cat) => {
                const active = prodCategoryFilter === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setProdCategoryFilter(cat.slug)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                      active
                        ? 'text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-orange-100/50'
                    }`}
                    style={active ? { backgroundColor: primaryColor } : undefined}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Product Management Cards Grid */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
                variant === 'varient_2' ? 'lg:grid-cols-4' : 'lg:grid-cols-5'
              } gap-4 sm:gap-5`}
            >
              {(activeAdminPage === 'overview'
                ? filteredAdminProducts.slice(0, 5)
                : filteredAdminProducts
              ).map((prod) => renderAdminProductCard(prod))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 3: ORDERS & COURIER DISPATCH MANAGEMENT ('orders')             */}
        {/* =================================================================== */}
        {activeAdminPage === 'orders' && (
          <div className="space-y-5 pt-4">
            <div
              className={`p-6 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-[#FFF6EE] border-orange-200/80'
              }`}
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                  <ShoppingCart size={22} style={{ color: primaryColor }} />
                  <span>অর্ডার ও কুরিয়ার ডিসপ্যাচ (Order &amp; Courier Management)</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Update live order status, assign courier riders, or print packing invoices
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search Order #BZ or Phone..."
                  className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-900 text-xs font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setIsManualOrderModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-white shadow-sm cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  + Create Phone Order
                </button>
              </div>
            </div>

            {/* Order Status Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                'ALL',
                'Confirmed',
                'Packing at Warehouse',
                'In Transit',
                'Delivered',
              ].map((st) => {
                const active = orderStatusFilter === st;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer ${
                      active
                        ? 'text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300'
                    }`}
                    style={active ? { backgroundColor: primaryColor } : undefined}
                  >
                    {st === 'ALL' ? `All Orders (${orders.length})` : st}
                  </button>
                );
              })}
            </div>

            {/* Order Management Cards */}
            <div className="space-y-3">
              {filteredOrders.map((ord) => (
                <div
                  key={ord.orderId}
                  className={`p-5 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition hover:shadow-md ${
                    isDark
                      ? 'bg-[#171F2C] border-white/10'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="text-sm font-black"
                        style={{ color: primaryColor }}
                      >
                        Order #{ord.orderId}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[11px] font-extrabold">
                        {ord.status}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-[10px] font-bold uppercase">
                        {ord.paymentMethod}
                      </span>
                      <span className="text-xs text-slate-400">{ord.createdAt}</span>
                    </div>

                    <div className="text-xs font-bold">
                      {ord.customerName} · <span className="text-emerald-600">{ord.phone}</span> ·{' '}
                      <span className="text-slate-500">{ord.address}</span>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      Items:{' '}
                      {ord.items
                        .map(
                          (i) =>
                            `${i.quantity}x ${i.product.name} (${i.selectedWeight})`
                        )
                        .join(', ')}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="text-right mr-2">
                      <div className="text-[10px] text-slate-400 font-bold">
                        Total Payable
                      </div>
                      <div
                        className="text-base font-black"
                        style={{ color: primaryColor }}
                      >
                        ৳{ord.total.toLocaleString()}
                      </div>
                    </div>

                    <select
                      value={ord.status}
                      onChange={(e) =>
                        updateOrderStatus(
                          ord.orderId,
                          e.target.value as StoreOrderRecord['status']
                        )
                      }
                      className={`px-3 py-2 rounded-xl border text-xs font-extrabold cursor-pointer ${
                        isDark
                          ? 'bg-slate-900 border-white/15 text-white'
                          : 'bg-[#FFF6EE] border-orange-200 text-slate-900'
                      }`}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Packing at Warehouse">
                        Packing at Warehouse
                      </option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => setSelectedInvoiceOrder(ord)}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/15 text-xs font-extrabold flex items-center gap-1.5 hover:border-orange-400 cursor-pointer"
                    >
                      <Printer size={13} />
                      <span>Invoice</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteOrder(ord.orderId)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                      title="Delete Order"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 4: CATEGORY MANAGEMENT ('categories')                          */}
        {/* =================================================================== */}
        {activeAdminPage === 'categories' && (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-3xl border ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-[#FFF6EE] border-orange-200/80'
              }`}
            >
              <h2 className="text-xl sm:text-2xl font-black mb-4">
                ক্যাটাগরি ম্যানেজমেন্ট (Manage Store Categories)
              </h2>
              <form
                onSubmit={handleAddCategorySubmit}
                className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs"
              >
                <input
                  type="text"
                  required
                  value={newCatLabel}
                  onChange={(e) => setNewCatLabel(e.target.value)}
                  placeholder="Category Name (e.g. Organic Ghee)"
                  className="px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 font-bold"
                />
                <input
                  type="text"
                  value={newCatBangla}
                  onChange={(e) => setNewCatBangla(e.target.value)}
                  placeholder="Bangla Subtitle (e.g. খাঁটি গাওয়া ঘি)"
                  className="px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 font-bold"
                />
                <input
                  type="text"
                  value={newCatImage}
                  onChange={(e) => setNewCatImage(e.target.value)}
                  placeholder="Image URL"
                  className="px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 font-mono"
                />
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl text-white font-extrabold shadow-sm cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  + Add Category
                </button>
              </form>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.slug}
                  className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between gap-3 ${
                    isDark
                      ? 'bg-[#171F2C] border-white/10'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-300">
                    <EditableImage
                      id={`admin_cat_img_${cat.slug}`}
                      defaultSrc={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold">{cat.label}</div>
                    <div className="text-[11px] text-slate-400">{cat.bangla}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteCategory(cat.slug)}
                    className="w-full py-1.5 rounded-lg border border-rose-200 text-rose-600 text-[11px] font-bold hover:bg-rose-50 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 5: CUSTOMERS & CRM DIRECTORY ('customers')                     */}
        {/* =================================================================== */}
        {activeAdminPage === 'customers' && (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-3xl border ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-[#FFF6EE] border-orange-200/80'
              }`}
            >
              <h2 className="text-xl sm:text-2xl font-black">
                কাস্টমার ডাটাবেস ও সিআরএম (Verified Bazar Customers)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Track repeat organic buyers, lifetime order value, and delivery preferences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map((ord) => (
                <div
                  key={ord.orderId}
                  className={`p-5 rounded-2xl border space-y-2.5 ${
                    isDark
                      ? 'bg-[#171F2C] border-white/10'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black">{ord.customerName}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-extrabold">
                      VIP Repeat Buyer
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <div>
                      <strong>Phone:</strong> {ord.phone}
                    </div>
                    <div>
                      <strong>Address:</strong> {ord.address}
                    </div>
                    <div>
                      <strong>Last Order:</strong> #{ord.orderId} ·{' '}
                      <strong style={{ color: primaryColor }}>
                        ৳{ord.total.toLocaleString()}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 6: COUPONS & FLASH OFFERS ('coupons_offers')                   */}
        {/* =================================================================== */}
        {activeAdminPage === 'coupons_offers' && (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-3xl border space-y-4 ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-[#FFF6EE] border-orange-200/80'
              }`}
            >
              <h2 className="text-xl sm:text-2xl font-black">
                ডিসকাউন্ট কুপন ও অফার জোন ইঞ্জিন (Promo Codes &amp; Campaigns)
              </h2>
              <form
                onSubmit={handleAddCouponSubmit}
                className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs"
              >
                <input
                  type="text"
                  required
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  placeholder="Code (e.g. EID250)"
                  className="px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 font-black uppercase"
                />
                <select
                  value={newCouponType}
                  onChange={(e) =>
                    setNewCouponType(e.target.value as 'flat' | 'percent')
                  }
                  className="px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 font-bold"
                >
                  <option value="flat">Flat Discount (৳)</option>
                  <option value="percent">Percentage (%)</option>
                </select>
                <input
                  type="number"
                  required
                  value={newCouponValue}
                  onChange={(e) => setNewCouponValue(Number(e.target.value))}
                  placeholder="Value (100)"
                  className="px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 font-bold"
                />
                <input
                  type="text"
                  value={newCouponDesc}
                  onChange={(e) => setNewCouponDesc(e.target.value)}
                  placeholder="Promo description"
                  className="px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 font-medium"
                />
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl text-white font-extrabold shadow-sm cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  + Create Coupon
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {coupons.map((cp) => (
                <div
                  key={cp.code}
                  className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 ${
                    isDark
                      ? 'bg-[#171F2C] border-white/10'
                      : 'bg-white border-orange-200/80 shadow-xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className="px-3 py-1 rounded-xl text-xs font-black text-white"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {cp.code}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          cp.active
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {cp.active ? 'ACTIVE' : 'PAUSED'}
                      </span>
                    </div>
                    <div className="text-base font-black">
                      {cp.type === 'flat'
                        ? `Flat ৳${cp.value} OFF`
                        : `${cp.value}% Discount`}
                    </div>
                    <p className="text-xs text-slate-500">{cp.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/10 text-xs">
                    <button
                      type="button"
                      onClick={() => toggleCouponActive(cp.code)}
                      className="font-extrabold hover:underline cursor-pointer"
                      style={{ color: primaryColor }}
                    >
                      {cp.active ? 'Pause Coupon' : 'Activate Coupon'}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCoupon(cp.code)}
                      className="text-rose-500 font-bold hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 7: STORE SYSTEM SETTINGS ('system_settings')                   */}
        {/* =================================================================== */}
        {activeAdminPage === 'system_settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div
              className={`lg:col-span-7 p-6 rounded-3xl border space-y-4 ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <h2 className="text-xl font-black flex items-center gap-2">
                <Settings size={20} style={{ color: primaryColor }} />
                <span>স্টোর সিস্টেম ও ডেলিভারি সেটিংস (Store &amp; Shipping Config)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-extrabold mb-1">
                    Store Brand Name
                  </label>
                  <input
                    type="text"
                    value={storeSettings.storeName}
                    onChange={(e) =>
                      updateStoreSettings({ storeName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-extrabold mb-1">
                    Hotline Number
                  </label>
                  <input
                    type="text"
                    value={storeSettings.hotline}
                    onChange={(e) =>
                      updateStoreSettings({ hotline: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-extrabold mb-1">
                    Inside Dhaka Delivery Fee (৳)
                  </label>
                  <input
                    type="number"
                    value={storeSettings.insideDhakaFee}
                    onChange={(e) =>
                      updateStoreSettings({
                        insideDhakaFee: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 font-black"
                  />
                </div>
                <div>
                  <label className="block font-extrabold mb-1">
                    Outside Dhaka Delivery Fee (৳)
                  </label>
                  <input
                    type="number"
                    value={storeSettings.outsideDhakaFee}
                    onChange={(e) =>
                      updateStoreSettings({
                        outsideDhakaFee: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 font-black"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-extrabold mb-1">
                  Top Announcement Promo Strip Text
                </label>
                <input
                  type="text"
                  value={storeSettings.promoBannerText}
                  onChange={(e) =>
                    updateStoreSettings({ promoBannerText: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 font-semibold"
                />
              </div>
            </div>

            <div
              className={`lg:col-span-5 p-6 rounded-3xl border space-y-4 h-fit ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-[#FFF9F4] border-orange-200/80'
              }`}
            >
              <h3 className="text-base font-black">
                Payment Gateways &amp; Courier Integration
              </h3>
              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-3 rounded-xl border bg-white dark:bg-slate-900 cursor-pointer">
                  <span className="font-extrabold">
                    Cash on Delivery (ক্যাশ অন ডেলিভারি)
                  </span>
                  <input
                    type="checkbox"
                    checked={storeSettings.enableCod}
                    onChange={(e) =>
                      updateStoreSettings({ enableCod: e.target.checked })
                    }
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl border bg-white dark:bg-slate-900 cursor-pointer">
                  <span className="font-extrabold">bKash Merchant Payment</span>
                  <input
                    type="checkbox"
                    checked={storeSettings.enableBkash}
                    onChange={(e) =>
                      updateStoreSettings({ enableBkash: e.target.checked })
                    }
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl border bg-white dark:bg-slate-900 cursor-pointer">
                  <span className="font-extrabold">Nagad Merchant Gateway</span>
                  <input
                    type="checkbox"
                    checked={storeSettings.enableNagad}
                    onChange={(e) =>
                      updateStoreSettings({ enableNagad: e.target.checked })
                    }
                  />
                </label>
                <div>
                  <label className="block font-extrabold mb-1">
                    Default Courier Partner
                  </label>
                  <select
                    value={storeSettings.autoAssignCourier}
                    onChange={(e) =>
                      updateStoreSettings({
                        autoAssignCourier: e.target
                          .value as typeof storeSettings.autoAssignCourier,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 font-bold"
                  >
                    <option value="Steadfast">Steadfast Courier</option>
                    <option value="Pathao">Pathao Courier</option>
                    <option value="RedX">RedX Logistics</option>
                    <option value="Bazar Express">Bazar Own Rider</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 8: ANALYTICS DASHBOARD ('overview' | 'dashboard')              */}
        {/* =================================================================== */}
        {(activeAdminPage === 'overview' ||
          activeAdminPage === 'dashboard' ||
          activeAdminPage === 'home_2' ||
          activeAdminPage === 'home_3' ||
          activeAdminPage === 'home_boxed' ||
          activeAdminPage === 'home_menu_icon_hover' ||
          activeAdminPage === 'home_menu_icon_default') && (
          <div className="space-y-6">
            {/* Dashboard Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black">
                  Dashboard Overview (বাজার স্টোর এডমিন ড্যাশবোর্ড)
                </h2>
                <p className="text-xs text-slate-400">
                  Real-time sales, revenue, visitor analytics, and order fulfillment
                </p>
              </div>
            </div>

            {/* 4 KPI Cards Row (With Mini Sparkline Wave SVG + Hexagonal Icon Badges Matching Remos) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: 'Total Sales',
                  value: '34,945',
                  growth: '1.56%',
                  up: true,
                  color: '#22C55E',
                  bgTint: 'rgba(34,197,94,0.12)',
                  path: 'M0,28 C15,24 25,10 40,18 C55,26 70,6 85,14 C100,22 110,4 120,8 L120,36 L0,36 Z',
                  line: 'M0,28 C15,24 25,10 40,18 C55,26 70,6 85,14 C100,22 110,4 120,8',
                },
                {
                  title: 'Total Income',
                  value: '$37,802',
                  growth: '1.56%',
                  up: false,
                  color: '#FF5200',
                  bgTint: 'rgba(255,82,0,0.12)',
                  path: 'M0,18 C15,8 30,26 45,14 C60,4 75,24 90,12 C105,6 112,20 120,14 L120,36 L0,36 Z',
                  line: 'M0,18 C15,8 30,26 45,14 C60,4 75,24 90,12 C105,6 112,20 120,14',
                },
                {
                  title: 'Orders Paid',
                  value: '34,945',
                  growth: '0.00%',
                  up: true,
                  color: '#CBD5E1',
                  bgTint: 'rgba(148,163,184,0.15)',
                  path: 'M0,26 C20,20 35,24 50,16 C65,8 80,18 95,10 C108,4 115,12 120,6 L120,36 L0,36 Z',
                  line: 'M0,26 C20,20 35,24 50,16 C65,8 80,18 95,10 C108,4 115,12 120,6',
                },
                {
                  title: 'Total Visitor',
                  value: '34,945',
                  growth: '1.56%',
                  up: true,
                  color: '#3B82F6',
                  bgTint: 'rgba(59,130,246,0.12)',
                  path: 'M0,24 C18,12 32,26 48,14 C64,4 78,20 94,8 C106,2 114,12 120,6 L120,36 L0,36 Z',
                  line: 'M0,24 C18,12 32,26 48,14 C64,4 78,20 94,8 C106,2 114,12 120,6',
                },
              ].map((stat, idx) => (
                <div
                  key={stat.title}
                  className={`p-5 rounded-3xl border space-y-4 ${
                    isDark
                      ? 'bg-[#171F2C] border-white/10'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center font-black"
                        style={{
                          backgroundColor: stat.bgTint,
                          color: idx === 2 ? '#64748B' : stat.color,
                        }}
                      >
                        <ShoppingBag size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-400">
                          {stat.title}
                        </div>
                        <div className="text-xl font-black">{stat.value}</div>
                      </div>
                    </div>
                    <div
                      className={`inline-flex items-center gap-0.5 text-xs font-black ${
                        stat.up ? 'text-emerald-600' : 'text-orange-600'
                      }`}
                    >
                      <TrendingUp size={13} />
                      <span>{stat.growth}</span>
                    </div>
                  </div>
                  {/* Smooth SVG Wave Sparkline */}
                  <div className="h-10 w-full overflow-hidden">
                    <svg
                      viewBox="0 0 120 36"
                      className="w-full h-full preserve-3d"
                      preserveAspectRatio="none"
                    >
                      <path d={stat.path} fill={stat.bgTint} />
                      <path
                        d={stat.line}
                        fill="none"
                        stroke={stat.color}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* ROW 2: Recent Order Smooth SVG Area Chart + Top Products + Top Countries By Sales */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Recent Order Smooth SVG Area Wave Chart (Exact Remos Screenshot Match + Hover Tooltip) */}
              <div
                className={`lg:col-span-5 p-6 rounded-3xl border flex flex-col justify-between space-y-4 relative ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black">Recent Order</h3>
                  {hoveredChartPoint?.chartId === 'dash_recent_order' ? (
                    <div className="px-3 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-bold flex items-center gap-2 shadow-md">
                      <span className="text-blue-400">{hoveredChartPoint.label}:</span>
                      <span>{hoveredChartPoint.primaryValue} Orders</span>
                      <span className="text-emerald-400">({hoveredChartPoint.secondaryValue})</span>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-slate-400">
                      Hover points for details
                    </span>
                  )}
                </div>
                <div className="relative h-52 w-full pt-2">
                  <svg
                    viewBox="0 0 400 170"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="remosOrderWave" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.32" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Horizontal Subtle Grid Lines */}
                    {[30, 65, 100, 135].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="400"
                        y2={y}
                        stroke={isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9'}
                        strokeWidth="1"
                      />
                    ))}
                    <path
                      d="M0,130 C35,105 65,92 95,112 C125,130 155,75 185,68 C215,60 245,98 275,72 C305,46 335,55 365,30 C382,18 392,26 400,20 L400,160 L0,160 Z"
                      fill="url(#remosOrderWave)"
                    />
                    <path
                      d="M0,130 C35,105 65,92 95,112 C125,130 155,75 185,68 C215,60 245,98 275,72 C305,46 335,55 365,30 C382,18 392,26 400,20"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {/* Interactive Hover Data Points */}
                    {[
                      { m: 'Jan', x: 12, y: 126, orders: '1,420', rev: '$12,450' },
                      { m: 'Feb', x: 48, y: 102, orders: '1,890', rev: '$16,200' },
                      { m: 'Mar', x: 84, y: 108, orders: '1,740', rev: '$15,100' },
                      { m: 'Apr', x: 120, y: 118, orders: '1,610', rev: '$14,300' },
                      { m: 'May', x: 156, y: 78, orders: '2,340', rev: '$21,800' },
                      { m: 'Jun', x: 192, y: 68, orders: '2,680', rev: '$24,900' },
                      { m: 'Jul', x: 228, y: 82, orders: '2,290', rev: '$20,400' },
                      { m: 'Aug', x: 264, y: 74, orders: '2,510', rev: '$23,150' },
                      { m: 'Sep', x: 300, y: 52, orders: '3,120', rev: '$28,900' },
                      { m: 'Oct', x: 336, y: 48, orders: '3,290', rev: '$31,400' },
                      { m: 'Nov', x: 368, y: 28, orders: '3,840', rev: '$35,200' },
                      { m: 'Dec', x: 394, y: 20, orders: '4,150', rev: '$37,802' },
                    ].map((pt) => (
                      <g
                        key={pt.m}
                        className="cursor-pointer"
                        onMouseEnter={() =>
                          setHoveredChartPoint({
                            chartId: 'dash_recent_order',
                            label: `${pt.m} 2026`,
                            primaryLabel: 'Orders',
                            primaryValue: pt.orders,
                            secondaryLabel: 'Revenue',
                            secondaryValue: pt.rev,
                          })
                        }
                        onMouseLeave={() => setHoveredChartPoint(null)}
                      >
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="12"
                          fill="transparent"
                        />
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={
                            hoveredChartPoint?.chartId === 'dash_recent_order' &&
                            hoveredChartPoint?.label === `${pt.m} 2026`
                              ? '6'
                              : '3.5'
                          }
                          fill="#ffffff"
                          stroke="#2563EB"
                          strokeWidth="2.5"
                        />
                      </g>
                    ))}
                  </svg>
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pt-1">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
                      (m) => (
                        <span key={m}>{m}</span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Top Products */}
              <div
                className={`lg:col-span-4 p-6 rounded-3xl border space-y-3 ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black">Top Products</h3>
                  <button
                    type="button"
                    onClick={() => setActiveAdminPage('product_list')}
                    className="text-xs font-bold text-slate-400 hover:underline cursor-pointer"
                  >
                    View all
                  </button>
                </div>
                <div className="space-y-3">
                  {products.slice(0, 5).map((p, idx) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-9 h-9 rounded-lg object-cover border flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-extrabold truncate">{p.name}</div>
                          <div className="text-[10px] text-slate-400">
                            Coupon: <span className="font-bold text-slate-600 dark:text-slate-300">Sflat</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="font-black block">
                          -{24 + idx * 3}%
                        </span>
                        <span className="text-[10px] text-slate-400">৳{p.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Countries By Sales */}
              <div
                className={`lg:col-span-3 p-6 rounded-3xl border space-y-3 ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black">Top Countries By Sales</h3>
                  <span className="text-xs text-slate-400">View all</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black">$37,802</span>
                  <span className="text-xs font-black text-emerald-600">
                    ▲ 1.56%
                  </span>
                  <span className="text-[10px] text-slate-400">since last weekend</span>
                </div>
                <div className="space-y-2.5 text-xs pt-1">
                  {[
                    { flag: '🇹🇷', code: 'TR', name: 'Turkey', up: true, val: '6,972' },
                    { flag: '🇧🇪', code: 'BE', name: 'Belgium', up: true, val: '6,972' },
                    { flag: '🇸🇪', code: 'SE', name: 'Sweden', up: false, val: '6,972' },
                    { flag: '🇻🇳', code: 'VN', name: 'Vietnamese', up: true, val: '6,972' },
                    { flag: '🇦🇺', code: 'AU', name: 'Australia', up: false, val: '6,972' },
                    { flag: '🇸🇦', code: 'SA', name: 'Saudi Arabia', up: false, val: '6,972' },
                  ].map((c) => (
                    <div
                      key={c.name}
                      className="flex items-center justify-between font-bold"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{c.flag}</span>
                        <span>{c.name}</span>
                      </div>
                      <span
                        className={`text-[11px] font-black ${
                          c.up ? 'text-emerald-600' : 'text-rose-500'
                        }`}
                      >
                        {c.up ? '📈' : '📉'}
                      </span>
                      <span className="text-slate-600 dark:text-slate-300 font-extrabold">
                        {c.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROW 3: Best Shop Sellers + Product Overview Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div
                className={`lg:col-span-5 p-6 rounded-3xl border space-y-3 ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black">Best Shop Sellers</h3>
                  <span className="text-xs text-slate-400">View all</span>
                </div>
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-white/10 text-[10px] uppercase text-slate-400 font-black">
                      <th className="py-2">Shop</th>
                      <th className="py-2">Categories</th>
                      <th className="py-2">Total</th>
                      <th className="py-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {[
                      {
                        seller: 'Robert',
                        purchases: '73 Purchases',
                        cat: 'Kitchen, Pets',
                        total: '$1,000',
                        avatar:
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                      },
                      {
                        seller: 'Calvin',
                        purchases: '66 Purchases',
                        cat: 'Health, Grocery',
                        total: '$4,000',
                        avatar:
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                      },
                      {
                        seller: 'Dwight',
                        purchases: '15,890 Purchases',
                        cat: 'Electronics',
                        total: '$2,700',
                        avatar:
                          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
                      },
                      {
                        seller: 'Cody',
                        purchases: '15 Purchases',
                        cat: 'Movies, Music',
                        total: '$2,100',
                        avatar:
                          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
                      },
                      {
                        seller: 'Bruce',
                        purchases: '127 Purchases',
                        cat: 'Sports, Fitness',
                        total: '$4,400',
                        avatar:
                          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
                      },
                      {
                        seller: 'Jorge',
                        purchases: '30 Purchases',
                        cat: 'Toys, Baby',
                        total: '$4,750',
                        avatar:
                          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
                      },
                    ].map((s) => (
                      <tr key={s.seller}>
                        <td className="py-2.5">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={s.avatar}
                              alt={s.seller}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-extrabold">{s.seller}</div>
                              <div className="text-[10px] text-slate-400">
                                {s.purchases}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 font-semibold text-slate-500">
                          {s.cat}
                        </td>
                        <td className="py-2.5 font-black">{s.total}</td>
                        <td className="py-2.5 text-right">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black">
                            100%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                className={`lg:col-span-7 p-6 rounded-3xl border space-y-3 overflow-x-auto ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black">Product Overview</h3>
                  <button
                    type="button"
                    onClick={() => setActiveAdminPage('product_list')}
                    className="text-xs font-bold text-slate-400 hover:underline cursor-pointer"
                  >
                    View all
                  </button>
                </div>
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-white/10 text-[10px] uppercase text-slate-400 font-black">
                      <th className="py-2">Name</th>
                      <th className="py-2">Product ID</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Quantity</th>
                      <th className="py-2">Sale</th>
                      <th className="py-2">Revenue</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {products.slice(0, 5).map((p, idx) => (
                      <tr key={p.id}>
                        <td className="py-2.5">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-8 h-8 rounded-lg object-cover border"
                            />
                            <span className="font-extrabold truncate max-w-[160px]">
                              {p.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 font-mono text-slate-400">
                          #{p.sku}
                        </td>
                        <td className="py-2.5 font-black">${(p.price / 10).toFixed(2)}</td>
                        <td className="py-2.5 font-semibold">{320 + idx * 95}</td>
                        <td className="py-2.5 font-semibold text-slate-500">On sale</td>
                        <td className="py-2.5 font-extrabold">
                          ${(p.price * 8.4).toFixed(2)}
                        </td>
                        <td className="py-2.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              p.inStock
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-orange-100 text-orange-700'
                            }`}
                          >
                            {p.inStock ? 'Available' : 'Not Available'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ROW 4: Orders Table + Earnings Bar Chart + New Comments (Matches Remos Lower Dashboard) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Orders Summary List */}
              <div
                className={`lg:col-span-5 p-6 rounded-3xl border space-y-3 overflow-x-auto ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black">Orders</h3>
                  <button
                    type="button"
                    onClick={() => setActiveAdminPage('order_list')}
                    className="text-xs font-bold text-slate-400 hover:underline cursor-pointer"
                  >
                    View all
                  </button>
                </div>
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-white/10 text-[10px] uppercase text-slate-400 font-black">
                      <th className="py-2">Product</th>
                      <th className="py-2">Customer</th>
                      <th className="py-2">Product ID</th>
                      <th className="py-2">Quantity</th>
                      <th className="py-2">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {products.slice(0, 5).map((p, idx) => (
                      <tr key={p.id}>
                        <td className="py-2.5">
                          <div className="flex items-center gap-2">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-8 h-8 rounded-lg object-cover border"
                            />
                            <span className="font-extrabold truncate max-w-[110px]">
                              {p.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 font-semibold text-slate-500">
                          {[
                            'agnolov@me.com',
                            'cody@bazar.com',
                            'robert@mail.com',
                            'kristin@bazar.com',
                            'tanvir@dhaka.bd',
                          ][idx % 5]}
                        </td>
                        <td className="py-2.5 font-mono text-slate-400">
                          #{p.sku}
                        </td>
                        <td className="py-2.5 font-bold">×{idx + 1}</td>
                        <td className="py-2.5 font-black">৳{p.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Earnings Grouped Bar Chart (Blue + Light Blue Bars + Hover Tooltip) */}
              <div
                className={`lg:col-span-4 p-6 rounded-3xl border flex flex-col justify-between space-y-4 ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black">Earnings</h3>
                  {hoveredChartPoint?.chartId === 'dash_earnings' ? (
                    <div className="px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[10px] font-bold flex items-center gap-1.5 shadow-md">
                      <span className="text-sky-300">{hoveredChartPoint.label}:</span>
                      <span>Rev {hoveredChartPoint.primaryValue}</span>
                      <span className="text-emerald-400">
                        · Profit {hoveredChartPoint.secondaryValue}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">Hover bar</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                      <span>Revenue</span>
                    </div>
                    <div className="text-lg font-black">
                      $37,802{' '}
                      <span className="text-[11px] font-black text-emerald-600">
                        ▲ 0.56%
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-300" />
                      <span>Profit</span>
                    </div>
                    <div className="text-lg font-black">
                      $28,305{' '}
                      <span className="text-[11px] font-black text-emerald-600">
                        ▲ 0.56%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-40 flex items-end justify-between gap-2 pt-3 border-b border-slate-100 dark:border-white/10">
                  {[
                    { m: 'Jan', rev: 65, prof: 45, revVal: '$24,570', profVal: '$17,010' },
                    { m: 'Feb', rev: 85, prof: 62, revVal: '$32,130', profVal: '$23,430' },
                    { m: 'Mar', rev: 52, prof: 38, revVal: '$19,650', profVal: '$14,360' },
                    { m: 'Apr', rev: 48, prof: 32, revVal: '$18,140', profVal: '$12,090' },
                    { m: 'May', rev: 92, prof: 70, revVal: '$34,770', profVal: '$26,460' },
                    { m: 'Jun', rev: 74, prof: 54, revVal: '$27,970', profVal: '$20,410' },
                    { m: 'Jul', rev: 68, prof: 49, revVal: '$25,700', profVal: '$18,520' },
                    { m: 'Aug', rev: 88, prof: 64, revVal: '$37,802', profVal: '$28,305' },
                  ].map((b) => (
                    <div
                      key={b.m}
                      onMouseEnter={() =>
                        setHoveredChartPoint({
                          chartId: 'dash_earnings',
                          label: b.m,
                          primaryLabel: 'Revenue',
                          primaryValue: b.revVal,
                          secondaryLabel: 'Profit',
                          secondaryValue: b.profVal,
                        })
                      }
                      onMouseLeave={() => setHoveredChartPoint(null)}
                      className="flex-1 flex flex-col items-center gap-1 h-full justify-end cursor-pointer group"
                    >
                      <div className="w-full flex items-end justify-center gap-0.5 h-full">
                        <div
                          className="w-2 rounded-t bg-blue-600 group-hover:bg-orange-500 transition-colors"
                          style={{ height: `${b.rev}%` }}
                        />
                        <div
                          className="w-2 rounded-t bg-sky-300 group-hover:bg-orange-300 transition-colors"
                          style={{ height: `${b.prof}%` }}
                        />
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">
                        {b.m}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* New Comments */}
              <div
                className={`lg:col-span-3 p-6 rounded-3xl border space-y-3 ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black">New Comments</h3>
                  <span className="text-xs text-slate-400">•••</span>
                </div>
                <div className="space-y-3 text-xs">
                  {[
                    {
                      name: 'Kathryn Murphy',
                      stars: 5,
                      comment:
                        'Pure Sundarban honey quality is unmatched! Fast delivery inside Dhaka.',
                      avatar:
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                    },
                    {
                      name: 'Leslie Alexander',
                      stars: 5,
                      comment:
                        'Deshi cow ghee aroma is 100% authentic. Highly recommended.',
                      avatar:
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                    },
                    {
                      name: 'Devon Lane',
                      stars: 4,
                      comment:
                        'Wood-pressed mustard oil packaging was very secure and leak-proof.',
                      avatar:
                        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
                    },
                  ].map((c) => (
                    <div
                      key={c.name}
                      className="flex items-start gap-2.5 pb-2.5 border-b border-slate-100 dark:border-white/5 last:border-none"
                    >
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="space-y-0.5">
                        <div className="font-extrabold">{c.name}</div>
                        <div className="text-amber-400 text-[10px]">★★★★★</div>
                        <p className="text-[11px] text-slate-400 line-clamp-2">
                          {c.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROW 5: Sale By Category Donut Chart + Customer Growth Multi-Line Chart + Promo Card (Matches Home 02 / Home 03 Screenshots) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sale By Category Donut Chart */}
              <div
                className={`lg:col-span-4 p-6 rounded-3xl border space-y-4 ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black">Sale By Category</h3>
                    <p className="text-[11px] text-slate-400">
                      Total Mar 20, 2026 · <strong>$37,802</strong>{' '}
                      <span className="text-emerald-600 font-bold">+0.56%</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center py-2">
                  <div className="relative w-40 h-40">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="5"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="5"
                        strokeDasharray="45 100"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#F37021"
                        strokeWidth="5"
                        strokeDasharray="28 100"
                        strokeDashoffset="-45"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#22C55E"
                        strokeWidth="5"
                        strokeDasharray="27 100"
                        strokeDashoffset="-73"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-bold text-slate-400">
                        Total
                      </span>
                      <span className="text-base font-black">$37,802</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-1" />
                    Honey (45%)
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5">
                    <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-1" />
                    Ghee (28%)
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1" />
                    Oils (27%)
                  </div>
                </div>
              </div>

              {/* Customer Growth & Website Visitors Dual Line Chart */}
              <div
                className={`lg:col-span-5 p-6 rounded-3xl border flex flex-col justify-between space-y-4 ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black">
                      Website Visitors &amp; Customer Growth
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Unique Visitors vs Page Views across 12 months
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-bold">
                    <span className="flex items-center gap-1 text-blue-600">
                      ● Visitors
                    </span>
                    <span className="flex items-center gap-1 text-orange-500">
                      ● Page Views
                    </span>
                  </div>
                </div>
                <div className="h-44 w-full">
                  <svg
                    viewBox="0 0 400 150"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    {[25, 60, 95, 130].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="400"
                        y2={y}
                        stroke={isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9'}
                        strokeWidth="1"
                      />
                    ))}
                    <path
                      d="M0,115 C40,85 80,105 120,65 C160,30 200,90 240,55 C280,25 320,70 360,35 L400,25"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0,130 C40,110 80,75 120,95 C160,115 200,50 240,80 C280,105 320,45 360,65 L400,45"
                      fill="none"
                      stroke="#F37021"
                      strokeWidth="2.5"
                      strokeDasharray="5 4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
                    (m) => (
                      <span key={m}>{m}</span>
                    )
                  )}
                </div>
              </div>

              {/* Remos Promotional Storefront Banner Card */}
              <div
                className="lg:col-span-3 p-6 rounded-3xl text-white flex flex-col justify-between relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #1E293B 0%, #0F172A 100%)',
                }}
              >
                <div className="space-y-2 z-10">
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase inline-block"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Bazar Store Pro
                  </span>
                  <h3 className="text-lg font-black leading-snug">
                     More traffic, more sales for Organic Bazar
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Launch seasonal Ramadan, Baishakh &amp; Winter Honey flash deals directly to Store Website.
                  </p>
                </div>
                <div className="pt-4 z-10 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveAdminPage('add_product')}
                    className="w-full py-2.5 rounded-xl text-xs font-extrabold text-white cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    + Add New Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveAdminPage('coupons_offers')}
                    className="w-full py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white cursor-pointer"
                  >
                    Manage Coupons
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 9: ADD PRODUCT PAGE ('add_product') — Exact Remos Layout       */}
        {/* =================================================================== */}
        {activeAdminPage === 'add_product' && (
          <div className="space-y-6">
            {/* Top Title & Breadcrumb */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-black">Add Attribute</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('overview')}
                  className="hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  Dashboard
                </button>
                <ChevronRight size={13} />
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('product_list')}
                  className="hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  Ecommerce
                </button>
                <ChevronRight size={13} />
                <span className="text-slate-400">Add product</span>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                handleSaveProduct(e);
                setActiveAdminPage('product_list');
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs"
            >
              {/* LEFT CARD: Product name, Category, Gender, Brand, Description */}
              <div
                className={`lg:col-span-6 p-7 rounded-3xl border space-y-6 ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <label className="block text-sm font-black">
                    Product name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Enter product name"
                    className={`w-full px-4 py-3.5 rounded-2xl border text-xs font-semibold focus:outline-none ${
                      isDark
                        ? 'bg-[#1D2636] border-white/10 text-white'
                        : 'bg-white border-slate-200/90 text-slate-800'
                    }`}
                  />
                  <p className="text-[11px] text-slate-400">
                    Do not exceed 20 characters when entering the product name.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-black">
                      Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) =>
                        setFormCategory(e.target.value as StoreCategorySlug)
                      }
                      className={`w-full px-4 py-3.5 rounded-2xl border text-xs font-semibold focus:outline-none ${
                        isDark
                          ? 'bg-[#1D2636] border-white/10 text-white'
                          : 'bg-white border-slate-200/90 text-slate-700'
                      }`}
                    >
                      <option value="all">Choose category</option>
                      {categories.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-black">
                      Gender <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={addProdGender}
                      onChange={(e) => setAddProdGender(e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-2xl border text-xs font-semibold focus:outline-none ${
                        isDark
                          ? 'bg-[#1D2636] border-white/10 text-white'
                          : 'bg-white border-slate-200/90 text-slate-700'
                      }`}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Unisex">Unisex / All</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-black">
                    Brand <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={addProdBrand}
                    onChange={(e) => setAddProdBrand(e.target.value)}
                    className={`w-full px-4 py-3.5 rounded-2xl border text-xs font-semibold focus:outline-none ${
                      isDark
                        ? 'bg-[#1D2636] border-white/10 text-white'
                        : 'bg-white border-slate-200/90 text-slate-700'
                    }`}
                  >
                    <option value="Choose category">Choose category</option>
                    <option value="Bazar Organic">Bazar Organic</option>
                    <option value="Sundarban Pure">Sundarban Pure</option>
                    <option value="Pabna Dairy">Pabna Dairy</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-black">
                    Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={6}
                    value={formShortDesc}
                    onChange={(e) => setFormShortDesc(e.target.value)}
                    placeholder="Description"
                    className={`w-full px-4 py-3.5 rounded-2xl border text-xs font-medium focus:outline-none ${
                      isDark
                        ? 'bg-[#1D2636] border-white/10 text-white'
                        : 'bg-white border-slate-200/90 text-slate-800'
                    }`}
                  />
                  <p className="text-[11px] text-slate-400">
                    Do not exceed 100 characters when entering the product name.
                  </p>
                </div>
              </div>

              {/* RIGHT CARD: Upload images (2 Previews + Dashed Upload Box), Add size, Product date, 3 Action Buttons */}
              <div
                className={`lg:col-span-6 p-7 rounded-3xl border space-y-6 flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="space-y-5">
                  <div className="space-y-3">
                    <label className="block text-sm font-black">
                      Upload images
                    </label>
                    <div className="grid grid-cols-3 gap-3.5">
                      {/* Image Preview 1 */}
                      <div className="aspect-square rounded-2xl border border-slate-200 dark:border-white/10 p-2 flex items-center justify-center bg-white dark:bg-slate-900 overflow-hidden">
                        <img
                          src={formImage || products[0]?.image}
                          alt="Preview 1"
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>

                      {/* Image Preview 2 with x5 Green Badge */}
                      <div className="aspect-square rounded-2xl border border-slate-200 dark:border-white/10 p-2 flex items-center justify-center bg-white dark:bg-slate-900 relative overflow-hidden">
                        <span className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-emerald-700 text-white text-[11px] font-black flex items-center justify-center shadow-xs">
                          x5
                        </span>
                        <img
                          src={products[1]?.image || formImage}
                          alt="Preview 2"
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>

                      {/* Dashed Upload Dropzone */}
                      <label className="aspect-square rounded-2xl border border-dashed border-blue-500 bg-blue-50/20 dark:bg-blue-950/20 p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50/50 transition">
                        <Upload size={26} className="text-blue-600 mb-2" />
                        <span className="text-[11px] text-slate-400 leading-snug">
                          Drop your images here or select{' '}
                          <span className="text-blue-600 font-bold">
                            click to browse
                          </span>
                        </span>
                        <input
                          type="text"
                          value={formImage}
                          onChange={(e) => setFormImage(e.target.value)}
                          placeholder="Paste image URL"
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      You need to add at least 4 images. Pay attention to the quality of the pictures you add, comply with the background color standards. Pictures must be in certain dimensions. Notice that the product shows all the details
                    </p>
                  </div>

                  {/* Add size + Product date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="space-y-3">
                      <label className="block text-sm font-black">Add size</label>
                      <select
                        value={addProdSize}
                        onChange={(e) => {
                          setAddProdSize(e.target.value);
                          setFormWeight(e.target.value);
                        }}
                        className={`w-full px-4 py-3.5 rounded-2xl border text-xs font-semibold focus:outline-none ${
                          isDark
                            ? 'bg-[#1D2636] border-white/10 text-white'
                            : 'bg-white border-slate-200/90 text-slate-800'
                        }`}
                      >
                        <option value="EU - 44">EU - 44</option>
                        <option value="500 gm">500 gm</option>
                        <option value="1 kg">1 kg</option>
                      </select>

                      {/* 6 Size Pills Grid (EU - 38.5 to EU - 43) */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          'EU - 38.5',
                          'EU - 39',
                          'EU - 40',
                          'EU - 41.5',
                          'EU - 42',
                          'EU - 43',
                        ].map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => {
                              setAddProdSize(sz);
                              setFormWeight(sz);
                            }}
                            className={`py-2.5 px-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                              addProdSize === sz
                                ? 'border-blue-600 bg-blue-50 text-blue-700 font-black'
                                : isDark
                                ? 'border-white/10 bg-[#1D2636] text-slate-200'
                                : 'border-slate-200/90 bg-white text-slate-700 hover:border-blue-400'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-black">
                        Product date
                      </label>
                      <input
                        type="date"
                        value={addProdDate}
                        onChange={(e) => setAddProdDate(e.target.value)}
                        className={`w-full px-4 py-3.5 rounded-2xl border text-xs font-semibold focus:outline-none ${
                          isDark
                            ? 'bg-[#1D2636] border-white/10 text-white'
                            : 'bg-white border-slate-200/90 text-slate-700'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom 3 Action Buttons: Add product (Solid Blue) | Save product (Outline Blue) | Schedule (Border Neutral) */}
                <div className="grid grid-cols-3 gap-3 pt-4">
                  <button
                    type="submit"
                    className="py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm transition cursor-pointer"
                  >
                    Add product
                  </button>
                  <button
                    type="submit"
                    className="py-3.5 px-4 rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-xs font-extrabold transition cursor-pointer"
                  >
                    Save product
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveAdminPage('product_list')}
                    className={`py-3.5 px-4 rounded-2xl border text-xs font-extrabold transition cursor-pointer ${
                      isDark
                        ? 'border-white/15 text-slate-200 hover:bg-white/5'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Schedule
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 10: PRODUCT LIST TABLE ('product_list')                        */}
        {/* =================================================================== */}
        {activeAdminPage === 'product_list' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black">
                  Product List (সকল প্রোডাক্ট তালিকা)
                </h2>
                <p className="text-xs text-slate-500">
                  Search by Product ID, price, stock status, or open detail view
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={prodSearch}
                  onChange={(e) => setProdSearch(e.target.value)}
                  placeholder="Search here..."
                  className="px-3.5 py-2 rounded-xl border text-xs font-semibold bg-white dark:bg-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('add_product')}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-white cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  + Add new
                </button>
              </div>
            </div>

            <div
              className={`rounded-3xl border overflow-x-auto ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 text-[11px] font-black uppercase text-slate-400">
                    <th className="p-4">Product</th>
                    <th className="p-4">Product ID</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Pack Weight</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {filteredAdminProducts.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-orange-50/40 dark:hover:bg-white/5 transition"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-11 h-11 rounded-xl object-cover border"
                          />
                          <div>
                            <div className="font-extrabold">{p.name}</div>
                            <div className="text-[11px] text-slate-400">
                              {p.categoryLabel}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono font-bold">#{p.sku}</td>
                      <td
                        className="p-4 font-black text-sm"
                        style={{ color: primaryColor }}
                      >
                        ৳{p.price.toLocaleString()}
                      </td>
                      <td className="p-4 font-bold">{p.weight}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                            p.inStock
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setAdminDetailProduct(p);
                              setActiveAdminPage('product_detail');
                            }}
                            className="p-2 rounded-lg border hover:border-orange-400 text-blue-600 cursor-pointer"
                            title="View Product Detail"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditProductModal(p)}
                            className="p-2 rounded-lg border hover:border-orange-400 text-emerald-600 cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteProduct(p.id)}
                            className="p-2 rounded-lg border hover:border-rose-400 text-rose-600 cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 11: PRODUCT DETAIL ('product_detail' | 'product_detail_2' | 'product_detail_3') */}
        {/* =================================================================== */}
        {(activeAdminPage === 'product_detail' ||
          activeAdminPage === 'product_detail_2' ||
          activeAdminPage === 'product_detail_3') &&
          adminDetailProduct && (
          <div className="space-y-6">
            {/* Top Title & Breadcrumb */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-black">Add Attribute</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('overview')}
                  className="hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  Dashboard
                </button>
                <ChevronRight size={13} />
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('product_list')}
                  className="hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  Ecommerce
                </button>
                <ChevronRight size={13} />
                <span className="text-slate-400">Product Detail</span>
              </div>
            </div>

            <div
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 p-7 rounded-3xl border ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              {/* LEFT COLUMN: Large Main Product Stage with Prev/Next Arrows + 5 Bottom Thumbnails */}
              <div className="lg:col-span-6 space-y-4">
                <div
                  className={`relative aspect-square rounded-2xl flex items-center justify-center p-8 overflow-hidden ${
                    isDark ? 'bg-[#1D2636]' : 'bg-[#F8FAFC]'
                  }`}
                >
                  {/* Left Arrow */}
                  <button
                    type="button"
                    onClick={() => {
                      const nextIdx =
                        (detailGalleryIdx - 1 + products.slice(0, 5).length) %
                        products.slice(0, 5).length;
                      setDetailGalleryIdx(nextIdx);
                      setAdminDetailProduct(products[nextIdx]);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white dark:bg-slate-800 shadow-xs flex items-center justify-center text-slate-400 hover:text-slate-900 cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <img
                    src={adminDetailProduct.image}
                    alt={adminDetailProduct.name}
                    className="max-h-full max-w-full object-contain rounded-2xl transition-all duration-300"
                  />

                  {/* Right Arrow */}
                  <button
                    type="button"
                    onClick={() => {
                      const nextIdx =
                        (detailGalleryIdx + 1) % products.slice(0, 5).length;
                      setDetailGalleryIdx(nextIdx);
                      setAdminDetailProduct(products[nextIdx]);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white dark:bg-slate-800 shadow-xs flex items-center justify-center text-slate-400 hover:text-slate-900 cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* 5 Bottom Thumbnail Cards */}
                <div className="grid grid-cols-5 gap-3">
                  {products.slice(0, 5).map((item, idx) => {
                    const isSelected = adminDetailProduct.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setDetailGalleryIdx(idx);
                          setAdminDetailProduct(item);
                        }}
                        className={`aspect-square p-2 rounded-2xl border flex items-center justify-center relative overflow-hidden transition cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-white dark:bg-slate-900 shadow-xs'
                            : 'border-slate-100 dark:border-white/10 bg-[#F8FAFC] dark:bg-slate-900/50 hover:border-blue-300'
                        }`}
                      >
                        {idx === 1 && (
                          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-emerald-700 text-white text-[9px] font-black">
                            x5
                          </span>
                        )}
                        {idx === 3 && (
                          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-emerald-700 text-white text-[9px] font-black">
                            x32
                          </span>
                        )}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT COLUMN: Product Title, Price, Color Swatches, Size Pills, Quantity, Blue CTA, PayPal Button, Info Links, Delivery & Return Cards, Safe Checkout */}
              <div className="lg:col-span-6 space-y-5 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                      {adminDetailProduct.name}
                    </h3>
                    <div className="text-lg font-black">
                      ${(adminDetailProduct.price / 40).toFixed(2)}{' '}
                      <span className="text-xs font-bold text-slate-400 ml-1">
                        (৳{adminDetailProduct.price.toLocaleString()})
                      </span>
                    </div>
                  </div>

                  {/* Color Selector */}
                  <div className="space-y-2">
                    <div className="text-xs text-slate-500">
                      Color:{' '}
                      <span className="font-black text-slate-900 dark:text-white">
                        {detailColor}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      {[
                        { name: 'Orange', hex: '#FF5200' },
                        { name: 'Blue', hex: '#2563EB' },
                        { name: 'Gold', hex: '#FACC15' },
                        { name: 'White', hex: '#F8FAFC' },
                      ].map((clr) => (
                        <button
                          key={clr.name}
                          type="button"
                          onClick={() => setDetailColor(clr.name)}
                          className={`w-7 h-7 rounded-full p-0.5 border flex items-center justify-center cursor-pointer ${
                            detailColor === clr.name
                              ? 'border-slate-900 dark:border-white scale-110'
                              : 'border-slate-200 dark:border-white/20'
                          }`}
                        >
                          <span
                            className="w-full h-full rounded-full block border border-black/5"
                            style={{ backgroundColor: clr.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="space-y-2">
                    <div className="text-xs text-slate-500">
                      Size:{' '}
                      <span className="font-black text-slate-900 dark:text-white">
                        {detailSize}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {['S', 'M', 'L', 'XL'].map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setDetailSize(sz)}
                          className={`w-9 h-9 rounded-xl border text-xs font-bold flex items-center justify-center transition cursor-pointer ${
                            detailSize === sz
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : isDark
                              ? 'border-white/10 text-slate-200'
                              : 'border-slate-200 text-slate-700 hover:border-blue-400'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="space-y-2">
                    <div className="text-xs text-slate-500">Quantity</div>
                    <div
                      className={`inline-flex items-center gap-6 px-4 py-2 rounded-full border text-xs font-black ${
                        isDark
                          ? 'border-white/15 bg-[#1D2636]'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setDetailQty((q) => Math.max(1, q - 1))}
                        className="text-slate-500 hover:text-slate-900 cursor-pointer"
                      >
                        −
                      </button>
                      <span>{detailQty}</span>
                      <button
                        type="button"
                        onClick={() => setDetailQty((q) => q + 1)}
                        className="text-slate-500 hover:text-slate-900 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Primary Add to Cart Bar + Wishlist & Compare Icons */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => openEditProductModal(adminDetailProduct)}
                        className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-xs transition cursor-pointer"
                      >
                        Add to cart - $
                        {((adminDetailProduct.price / 40) * detailQty).toFixed(2)}
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditProductModal(adminDetailProduct)}
                        className="w-11 h-11 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center hover:border-blue-500 cursor-pointer"
                        title="Save to Wishlist"
                      >
                        <Heart size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditProductModal(adminDetailProduct)}
                        className="w-11 h-11 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center hover:border-blue-500 cursor-pointer"
                        title="Compare Variant"
                      >
                        <ArrowLeftRight size={15} />
                      </button>
                    </div>

                    {/* Buy with PayPal Outline Button */}
                    <button
                      type="button"
                      className="w-full py-3 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <span className="underline">Buy with</span>
                      <span className="font-black italic text-blue-800 dark:text-blue-400 text-sm">
                        PayPal
                      </span>
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        className="text-[11px] text-slate-400 underline hover:text-slate-700 cursor-pointer"
                      >
                        More payment options
                      </button>
                    </div>
                  </div>

                  {/* 4 Quick Action Links Row */}
                  <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-bold">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 cursor-pointer hover:text-blue-600"
                    >
                      <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-rose-500 via-amber-400 to-blue-500 inline-block" />
                      <span>Compare color</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 cursor-pointer hover:text-blue-600"
                    >
                      <HelpCircle size={14} />
                      <span>Ask a question</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 cursor-pointer hover:text-blue-600"
                    >
                      <Truck size={14} />
                      <span>Delivery &amp; Return</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 cursor-pointer hover:text-blue-600"
                    >
                      <Share2 size={14} />
                      <span>Share</span>
                    </button>
                  </div>

                  {/* 2 Boxed Info Cards: Estimate Delivery Times & Return Within 30 Days */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div
                      className={`p-5 rounded-2xl border text-center space-y-2 ${
                        isDark
                          ? 'border-white/10 bg-[#1D2636]/50'
                          : 'border-slate-200/80 bg-white'
                      }`}
                    >
                      <Package size={20} className="mx-auto text-slate-700 dark:text-slate-200" />
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Estimate delivery times:{' '}
                        <strong className="text-slate-900 dark:text-white">
                          12-26 days
                        </strong>{' '}
                        (International),{' '}
                        <strong className="text-slate-900 dark:text-white">
                          3-6 days
                        </strong>{' '}
                        (United States).
                      </p>
                    </div>

                    <div
                      className={`p-5 rounded-2xl border text-center space-y-2 ${
                        isDark
                          ? 'border-white/10 bg-[#1D2636]/50'
                          : 'border-slate-200/80 bg-white'
                      }`}
                    >
                      <Truck size={20} className="mx-auto text-slate-700 dark:text-slate-200" />
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Return within{' '}
                        <strong className="text-slate-900 dark:text-white">
                          30 days
                        </strong>{' '}
                        of purchase. Duties &amp; taxes are non-refundable.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Guarantee Safe Checkout Footer Row */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/10 text-xs">
                  <div className="flex items-center gap-1.5 font-extrabold">
                    <ShieldCheck size={15} className="text-slate-700 dark:text-slate-200" />
                    <span>Guarantee Safe Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded border text-[10px] font-black text-blue-800 bg-slate-50">
                      VISA
                    </span>
                    <span className="px-2 py-0.5 rounded border text-[10px] font-black text-sky-700 bg-slate-50">
                      PayPal
                    </span>
                    <span className="px-2 py-0.5 rounded border text-[10px] font-black text-white bg-sky-500">
                      AMEX
                    </span>
                    <span className="px-2 py-0.5 rounded border text-[10px] font-black text-rose-600 bg-amber-50">
                      MasterCard
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 12: CATEGORY LIST & NEW CATEGORY ('category_list' | 'new_category') */}
        {/* =================================================================== */}
        {activeAdminPage === 'new_category' && (
          <div className="space-y-6">
            {/* Top Page Header & Breadcrumb (Exact Remos Screenshot: Category information) */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Category information
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('overview')}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  Dashboard
                </button>
                <ChevronRight size={13} className="text-slate-400" />
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('category_list')}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  Category
                </button>
                <ChevronRight size={13} className="text-slate-400" />
                <span className="text-slate-400">New category</span>
              </div>
            </div>

            {/* Horizontal Form Card (Exact Remos Layout) */}
            <form
              onSubmit={(e) => {
                handleAddCategorySubmit(e);
                setActiveAdminPage('category_list');
              }}
              className={`p-6 sm:p-8 rounded-2xl border space-y-6 ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              {/* Row 1: Product name * */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Product name <span className="text-rose-500">*</span>
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    required
                    value={newCatLabel}
                    onChange={(e) => setNewCatLabel(e.target.value)}
                    placeholder="Category name"
                    className={`w-full px-4 py-3 rounded-xl border text-xs font-medium outline-none focus:border-blue-500 transition ${
                      isDark
                        ? 'bg-slate-900 border-white/10 text-white'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              {/* Row 2: Upload images * */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-4">
                <label className="md:col-span-3 pt-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Upload images <span className="text-rose-500">*</span>
                </label>
                <div className="md:col-span-9 space-y-3">
                  <label
                    className={`min-h-[210px] rounded-2xl border border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition ${
                      isDark
                        ? 'border-blue-500/40 bg-slate-900/40 hover:bg-slate-900/70'
                        : 'border-blue-400 bg-white hover:bg-blue-50/20'
                    }`}
                  >
                    <UploadCloud size={38} className="text-blue-500 mb-3 stroke-[1.75]" />
                    <p className="text-xs text-slate-400">
                      Drop your images here or select{' '}
                      <span className="text-blue-600 font-semibold hover:underline">
                        click to browse
                      </span>
                    </p>
                    {newCatImage && (
                      <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-[11px] font-bold text-blue-600">
                        <img
                          src={newCatImage}
                          alt="Preview"
                          className="w-7 h-7 rounded object-cover"
                        />
                        <span>Image selected</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setNewCatImage(url);
                        }
                      }}
                    />
                  </label>

                  {/* Optional Direct Image URL Input for Quick Admin Testing */}
                  <input
                    type="text"
                    value={newCatImage}
                    onChange={(e) => setNewCatImage(e.target.value)}
                    placeholder="Or paste category image URL (optional)..."
                    className={`w-full px-3.5 py-2 rounded-xl border text-[11px] outline-none focus:border-blue-500 ${
                      isDark
                        ? 'bg-slate-900 border-white/10 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              {/* Row 3: Select category icon */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Select category icon
                </label>
                <div className="md:col-span-9">
                  <select
                    value={newCatBangla}
                    onChange={(e) => setNewCatBangla(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-xs font-medium outline-none focus:border-blue-500 cursor-pointer ${
                      isDark
                        ? 'bg-slate-900 border-white/10 text-slate-300'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <option value="">select icon</option>
                    <option value="খাঁটি মধু (Pure Honey)">🍯 Honey &amp; Nectar Icon</option>
                    <option value="ঘি ও তেল (Ghee & Oils)">🫙 Organic Oil &amp; Ghee Icon</option>
                    <option value="মশলা ও হার্বস (Spices)">🌶️ Spices &amp; Herbs Icon</option>
                    <option value="খেজুর ও বাদাম (Dates & Nuts)">🌰 Dates, Seeds &amp; Nuts Icon</option>
                    <option value="সুপারফুড ও চা (Superfoods)">🍵 Tea &amp; Wellness Icon</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Save Button aligned with inputs */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 pt-2">
                <div className="md:col-span-3" />
                <div className="md:col-span-9">
                  <button
                    type="submit"
                    className="px-14 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {activeAdminPage === 'category_list' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                All category
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('overview')}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  Dashboard
                </button>
                <ChevronRight size={13} className="text-slate-400" />
                <span>Category</span>
                <ChevronRight size={13} className="text-slate-400" />
                <span className="text-slate-400">All category</span>
              </div>
            </div>

            {/* Category Table Card */}
            <div
              className={`p-6 rounded-2xl border space-y-5 ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    value={prodSearch}
                    onChange={(e) => setProdSearch(e.target.value)}
                    placeholder="Search here..."
                    className={`w-full pl-4 pr-9 py-2.5 rounded-xl border text-xs outline-none focus:border-blue-500 ${
                      isDark
                        ? 'bg-slate-900 border-white/10 text-white'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                  <Search
                    size={15}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('new_category')}
                  className="px-5 py-2.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-xs font-bold transition cursor-pointer"
                >
                  + Add new
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr
                      className={`border-b text-[11px] font-extrabold text-slate-700 dark:text-slate-300 ${
                        isDark ? 'bg-slate-800/60 border-white/10' : 'bg-slate-50/80 border-slate-100'
                      }`}
                    >
                      <th className="p-4 rounded-l-xl">Category</th>
                      <th className="p-4">Icon</th>
                      <th className="p-4">Quantity</th>
                      <th className="p-4">Sale</th>
                      <th className="p-4">Start date</th>
                      <th className="p-4 text-right rounded-r-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {categories.map((c, idx) => (
                      <tr
                        key={c.slug}
                        className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={c.image}
                              alt={c.label}
                              className="w-11 h-11 rounded-xl object-cover border border-slate-100 dark:border-white/10"
                            />
                            <div>
                              <div className="font-bold text-slate-800 dark:text-white">
                                {c.label}
                              </div>
                              <div className="text-[11px] text-slate-400">{c.bangla}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-lg">
                          {['🍯', '🫙', '🌶️', '🌰', '🍵'][idx % 5]}
                        </td>
                        <td className="p-4 font-semibold text-slate-600 dark:text-slate-300">
                          {(c.count * 320).toLocaleString()}
                        </td>
                        <td className="p-4 font-semibold text-slate-600 dark:text-slate-300">
                          20
                        </td>
                        <td className="p-4 text-slate-500">20 Nov 2023</td>
                        <td className="p-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setActiveAdminPage('new_category')}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg cursor-pointer"
                              title="Edit"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteCategory(c.slug)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 13: ATTRIBUTES & ADD ATTRIBUTES ('attributes' | 'add_attributes') */}
        {/* =================================================================== */}
        {activeAdminPage === 'add_attributes' && (
          <div className="space-y-6">
            {/* Top Page Header & Breadcrumb (Exact Remos Screenshot: Add Attribute) */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Add Attribute
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('overview')}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  Dashboard
                </button>
                <ChevronRight size={13} className="text-slate-400" />
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('attributes')}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  Attributes
                </button>
                <ChevronRight size={13} className="text-slate-400" />
                <span className="text-slate-400">Add Attribute</span>
              </div>
            </div>

            {/* Horizontal Form Card (Exact Remos Screenshot) */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!attrName.trim() || !attrValue.trim()) return;
                addAttribute(attrName, attrValue);
                setAttrName('');
                setAttrValue('');
                setActiveAdminPage('attributes');
              }}
              className={`p-6 sm:p-8 rounded-2xl border space-y-6 ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              {/* Row 1: Attribute name */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Attribute name
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    required
                    value={attrName}
                    onChange={(e) => setAttrName(e.target.value)}
                    placeholder="Attribute name"
                    className={`w-full px-4 py-3 rounded-xl border text-xs font-medium outline-none focus:border-blue-500 transition ${
                      isDark
                        ? 'bg-slate-900 border-white/10 text-white'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              {/* Row 2: Attribute value */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Attribute value
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    required
                    value={attrValue}
                    onChange={(e) => setAttrValue(e.target.value)}
                    placeholder="Attribute value"
                    className={`w-full px-4 py-3 rounded-xl border text-xs font-medium outline-none focus:border-blue-500 transition ${
                      isDark
                        ? 'bg-slate-900 border-white/10 text-white'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              {/* Row 3: Save Button aligned with inputs */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 pt-1">
                <div className="md:col-span-3" />
                <div className="md:col-span-9">
                  <button
                    type="submit"
                    className="px-14 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {activeAdminPage === 'attributes' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                All Attributes
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('overview')}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  Dashboard
                </button>
                <ChevronRight size={13} className="text-slate-400" />
                <span>Attributes</span>
                <ChevronRight size={13} className="text-slate-400" />
                <span className="text-slate-400">All attributes</span>
              </div>
            </div>

            <div
              className={`p-6 rounded-2xl border space-y-5 ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    value={attrSearch}
                    onChange={(e) => setAttrSearch(e.target.value)}
                    placeholder="Search here..."
                    className={`w-full pl-4 pr-9 py-2.5 rounded-xl border text-xs outline-none focus:border-blue-500 ${
                      isDark
                        ? 'bg-slate-900 border-white/10 text-white'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                  <Search
                    size={15}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('add_attributes')}
                  className="px-5 py-2.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-xs font-bold transition cursor-pointer"
                >
                  + Add new
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr
                      className={`border-b text-[11px] font-extrabold text-slate-700 dark:text-slate-300 ${
                        isDark ? 'bg-slate-800/60 border-white/10' : 'bg-slate-50/80 border-slate-100'
                      }`}
                    >
                      <th className="p-4 rounded-l-xl">Category</th>
                      <th className="p-4">Value</th>
                      <th className="p-4 text-right rounded-r-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {attributes
                      .filter(
                        (a) =>
                          !attrSearch ||
                          a.category.toLowerCase().includes(attrSearch.toLowerCase()) ||
                          a.value.toLowerCase().includes(attrSearch.toLowerCase())
                      )
                      .map((attr) => (
                        <tr
                          key={attr.id}
                          className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition"
                        >
                          <td className="p-4 font-bold text-slate-800 dark:text-white">
                            {attr.category}
                          </td>
                          <td className="p-4 text-slate-600 dark:text-slate-300">
                            {attr.value}
                          </td>
                          <td className="p-4 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setAttrName(attr.category);
                                  setAttrValue(attr.value);
                                  setActiveAdminPage('add_attributes');
                                }}
                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg cursor-pointer"
                                title="Edit"
                              >
                                <Edit3 size={15} />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteAttribute(attr.id)}
                                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 14: ORDER LIST TABLE ('order_list')                            */}
        {/* =================================================================== */}
        {activeAdminPage === 'order_list' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black">
                  Order List (সকল অর্ডার তালিকা)
                </h2>
                <p className="text-xs text-slate-500">
                  Manage customer orders, update courier status, or open order tracking
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search Order #BZ..."
                  className="px-3.5 py-2 rounded-xl border text-xs font-semibold bg-white dark:bg-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setIsManualOrderModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-white cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  + Create POS Order
                </button>
              </div>
            </div>

            <div
              className={`rounded-3xl border overflow-x-auto ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 text-[11px] font-black uppercase text-slate-400">
                    <th className="p-4">Product &amp; Customer</th>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.orderId} className="hover:bg-orange-50/40 dark:hover:bg-white/5">
                      <td className="p-4">
                        <div className="font-extrabold">{ord.customerName}</div>
                        <div className="text-[11px] text-slate-400">
                          {ord.phone} · {ord.items.length} items
                        </div>
                      </td>
                      <td className="p-4 font-mono font-black">#{ord.orderId}</td>
                      <td
                        className="p-4 font-black text-sm"
                        style={{ color: primaryColor }}
                      >
                        ৳{ord.total.toLocaleString()}
                      </td>
                      <td className="p-4 uppercase font-bold">
                        {ord.paymentMethod}
                      </td>
                      <td className="p-4">
                        <select
                          value={ord.status}
                          onChange={(e) =>
                            updateOrderStatus(
                              ord.orderId,
                              e.target.value as StoreOrderRecord['status']
                            )
                          }
                          className="px-2.5 py-1.5 rounded-xl border text-[11px] font-extrabold bg-emerald-50 dark:bg-slate-900 text-emerald-700 cursor-pointer"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Packing at Warehouse">
                            Packing at Warehouse
                          </option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedAdminOrder(ord);
                              setActiveAdminPage('order_detail');
                            }}
                            className="p-2 rounded-lg border text-blue-600 hover:border-orange-400 cursor-pointer"
                            title="Order Detail"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedAdminOrder(ord);
                              setActiveAdminPage('order_tracking');
                            }}
                            className="p-2 rounded-lg border text-emerald-600 hover:border-orange-400 cursor-pointer"
                            title="Track Order"
                          >
                            <Truck size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteOrder(ord.orderId)}
                            className="p-2 rounded-lg border text-rose-600 hover:border-rose-400 cursor-pointer"
                            title="Delete Order"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 15: ORDER DETAIL ('order_detail') — Exact Remos Layout         */}
        {/* =================================================================== */}
        {activeAdminPage === 'order_detail' && (() => {
          const activeOrder = selectedAdminOrder || orders[0];
          const orderItems =
            activeOrder?.items && activeOrder.items.length >= 3
              ? activeOrder.items
              : [
                  {
                    product: products[0],
                    quantity: 1,
                    selectedWeight: products[0]?.weight || '1 kg',
                  },
                  {
                    product: products[1] || products[0],
                    quantity: 1,
                    selectedWeight: products[1]?.weight || '1 kg',
                  },
                  {
                    product: products[2] || products[0],
                    quantity: 1,
                    selectedWeight: products[2]?.weight || '500 gm',
                  },
                ];

          return (
            <div className="space-y-6">
              {/* Top Title & Breadcrumb */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-black">
                  Order #{activeOrder?.orderId || '123783'}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                  <button
                    type="button"
                    onClick={() => setActiveAdminPage('overview')}
                    className="hover:text-slate-700 dark:hover:text-white cursor-pointer"
                  >
                    Dashboard
                  </button>
                  <ChevronRight size={13} />
                  <button
                    type="button"
                    onClick={() => setActiveAdminPage('order_list')}
                    className="hover:text-slate-700 dark:hover:text-white cursor-pointer"
                  >
                    Order
                  </button>
                  <ChevronRight size={13} />
                  <button
                    type="button"
                    onClick={() => setActiveAdminPage('order_detail')}
                    className="hover:text-slate-700 dark:hover:text-white cursor-pointer"
                  >
                    Order detail
                  </button>
                  <ChevronRight size={13} />
                  <span className="text-slate-400">
                    Order #{activeOrder?.orderId || '123783'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* LEFT COLUMN (8 Cols): All item Card + Cart Totals Card */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Card 1: All item */}
                  <div
                    className={`p-6 rounded-3xl border space-y-4 ${
                      isDark
                        ? 'bg-[#171F2C] border-white/10'
                        : 'bg-white border-slate-200/80 shadow-xs'
                    }`}
                  >
                    <div
                      className={`px-4 py-3 rounded-xl flex items-center justify-between text-xs font-extrabold ${
                        isDark ? 'bg-[#1D2636]' : 'bg-[#F8FAFC]'
                      }`}
                    >
                      <span>All item</span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 font-extrabold cursor-pointer"
                      >
                        <span>Sort</span>
                        <ChevronDown size={14} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {orderItems.map((it, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setAdminDetailProduct(it.product);
                            setActiveAdminPage('product_detail');
                          }}
                          className={`p-3.5 rounded-2xl grid grid-cols-1 sm:grid-cols-12 items-center gap-4 transition cursor-pointer ${
                            idx % 2 === 0
                              ? isDark
                                ? 'bg-[#1D2636]/70'
                                : 'bg-[#F8FAFC]'
                              : isDark
                              ? 'bg-transparent'
                              : 'bg-white'
                          }`}
                        >
                          <div className="sm:col-span-6 flex items-center gap-3.5">
                            <img
                              src={it.product.image}
                              alt={it.product.name}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200/80 dark:border-white/10 bg-white p-0.5 flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="text-[11px] text-slate-400">
                                Product name
                              </div>
                              <div className="text-xs font-extrabold truncate">
                                {it.product.name || 'Kristin Watson'}
                              </div>
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <div className="text-[11px] text-slate-400">
                              Quantity
                            </div>
                            <div className="text-xs font-extrabold">
                              {it.quantity}
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <div className="text-[11px] text-slate-400">
                              Price
                            </div>
                            <div className="text-xs font-extrabold">
                              $50.47{' '}
                              <span className="text-[10px] font-semibold text-slate-400">
                                (৳{(it.product.price * it.quantity).toLocaleString()})
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card 2: Cart Totals */}
                  <div
                    className={`p-6 rounded-3xl border space-y-3 ${
                      isDark
                        ? 'bg-[#171F2C] border-white/10'
                        : 'bg-white border-slate-200/80 shadow-xs'
                    }`}
                  >
                    <div
                      className={`px-4 py-3 rounded-xl grid grid-cols-12 items-center text-xs font-extrabold ${
                        isDark ? 'bg-[#1D2636]' : 'bg-[#F8FAFC]'
                      }`}
                    >
                      <span className="col-span-7">Cart Totals</span>
                      <span className="col-span-5">Price</span>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-white/10 text-xs px-4">
                      <div className="py-3.5 grid grid-cols-12 items-center">
                        <span className="col-span-7 text-slate-500 font-medium">
                          Subtotal:
                        </span>
                        <span className="col-span-5 font-extrabold">
                          $70.13 (৳{((activeOrder?.total || 2450) - 60).toLocaleString()})
                        </span>
                      </div>

                      <div className="py-3.5 grid grid-cols-12 items-center">
                        <span className="col-span-7 text-slate-500 font-medium">
                          Shipping:
                        </span>
                        <span className="col-span-5 font-extrabold">
                          $10.00 (৳60)
                        </span>
                      </div>

                      <div className="py-3.5 grid grid-cols-12 items-center">
                        <span className="col-span-7 text-slate-500 font-medium">
                          Tax (GST):
                        </span>
                        <span className="col-span-5 font-extrabold">$5.00</span>
                      </div>

                      <div className="py-3.5 grid grid-cols-12 items-center">
                        <span className="col-span-7 font-extrabold text-slate-900 dark:text-white">
                          Total price:
                        </span>
                        <span className="col-span-5 font-black text-[#FF5200]">
                          $90.58 (৳{(activeOrder?.total || 2450).toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN (4 Cols): 4 Stacked Cards (Summary, Shipping Address, Payment Method, Expected Date Of Delivery) */}
                <div className="lg:col-span-4 space-y-5">
                  {/* Card 1: Summary */}
                  <div
                    className={`p-6 rounded-3xl border space-y-3 ${
                      isDark
                        ? 'bg-[#171F2C] border-white/10'
                        : 'bg-white border-slate-200/80 shadow-xs'
                    }`}
                  >
                    <h3 className="text-sm font-black">Summary</h3>
                    <div className="space-y-2.5 text-xs pt-1">
                      <div className="grid grid-cols-12 items-center">
                        <span className="col-span-5 text-slate-500">
                          Order ID
                        </span>
                        <span className="col-span-7 font-extrabold">
                          #{activeOrder?.orderId || '192847'}
                        </span>
                      </div>
                      <div className="grid grid-cols-12 items-center">
                        <span className="col-span-5 text-slate-500">Date</span>
                        <span className="col-span-7 font-extrabold">
                          20 Nov 2023
                        </span>
                      </div>
                      <div className="grid grid-cols-12 items-center">
                        <span className="col-span-5 text-slate-500">Total</span>
                        <span className="col-span-7 font-black text-[#FF5200]">
                          $948.5 (৳{(activeOrder?.total || 2450).toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Shipping Address */}
                  <div
                    className={`p-6 rounded-3xl border space-y-2.5 ${
                      isDark
                        ? 'bg-[#171F2C] border-white/10'
                        : 'bg-white border-slate-200/80 shadow-xs'
                    }`}
                  >
                    <h3 className="text-sm font-black">Shipping Address</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {activeOrder?.address ||
                        '3517 W. Gray St. Utica, Pennsylvania 57867'}
                    </p>
                  </div>

                  {/* Card 3: Payment Method */}
                  <div
                    className={`p-6 rounded-3xl border space-y-2.5 ${
                      isDark
                        ? 'bg-[#171F2C] border-white/10'
                        : 'bg-white border-slate-200/80 shadow-xs'
                    }`}
                  >
                    <h3 className="text-sm font-black">Payment Method</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net banking acceptance subject to device availability.
                    </p>
                  </div>

                  {/* Card 4: Expected Date Of Delivery + Outlined Blue Track order Button */}
                  <div
                    className={`p-6 rounded-3xl border space-y-3.5 ${
                      isDark
                        ? 'bg-[#171F2C] border-white/10'
                        : 'bg-white border-slate-200/80 shadow-xs'
                    }`}
                  >
                    <div className="space-y-1">
                      <h3 className="text-sm font-black">
                        Expected Date Of Delivery
                      </h3>
                      <div className="text-xs font-extrabold text-emerald-600">
                        20 Nov 2023
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveAdminPage('order_tracking')}
                      className="w-full py-3 px-4 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Truck size={15} />
                      <span>Track order</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* =================================================================== */}
        {/* PAGE 16: ORDER TRACKING ('order_tracking') — Exact Remos Layout     */}
        {/* =================================================================== */}
        {activeAdminPage === 'order_tracking' && (() => {
          const activeOrder = selectedAdminOrder || orders[0];
          const trackedProd =
            activeOrder?.items?.[0]?.product || products[0];

          return (
            <div className="space-y-6">
              {/* Top Title & Breadcrumb */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-black">Track Order</h2>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                  <button
                    type="button"
                    onClick={() => setActiveAdminPage('overview')}
                    className="hover:text-slate-700 dark:hover:text-white cursor-pointer"
                  >
                    Dashboard
                  </button>
                  <ChevronRight size={13} />
                  <button
                    type="button"
                    onClick={() => setActiveAdminPage('order_list')}
                    className="hover:text-slate-700 dark:hover:text-white cursor-pointer"
                  >
                    Order
                  </button>
                  <ChevronRight size={13} />
                  <span className="text-slate-400">Track Order</span>
                </div>
              </div>

              {/* CARD 1: Product Summary Card (Image Left + Metadata & View shop / View product Buttons Right) */}
              <div
                className={`p-7 rounded-3xl border flex flex-col md:flex-row items-center gap-8 ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="w-52 h-52 rounded-2xl flex items-center justify-center p-4 bg-[#F8FAFC] dark:bg-[#1D2636] flex-shrink-0">
                  <img
                    src={trackedProd?.image}
                    alt={trackedProd?.name}
                    className="max-w-full max-h-full object-contain rounded-xl"
                  />
                </div>

                <div className="flex-1 space-y-4 w-full">
                  <h3 className="text-lg sm:text-xl font-black">
                    {trackedProd?.name || 'Pouch Pocket Hoodie Orange'}
                  </h3>

                  <div className="space-y-2 text-xs max-w-sm">
                    <div className="grid grid-cols-12 items-center">
                      <span className="col-span-5 text-slate-400">
                        Order ID
                      </span>
                      <span className="col-span-7 font-extrabold">
                        #{activeOrder?.orderId || '192847'}
                      </span>
                    </div>
                    <div className="grid grid-cols-12 items-center">
                      <span className="col-span-5 text-slate-400">Brand:</span>
                      <span className="col-span-7 font-extrabold">
                        20 Nov 2023
                      </span>
                    </div>
                    <div className="grid grid-cols-12 items-center">
                      <span className="col-span-5 text-slate-400">
                        Order Placed:
                      </span>
                      <span className="col-span-7 font-extrabold">
                        20 Nov 2023
                      </span>
                    </div>
                    <div className="grid grid-cols-12 items-center">
                      <span className="col-span-5 text-slate-400">
                        Quantity:
                      </span>
                      <span className="col-span-7 font-extrabold">
                        {activeOrder?.items?.[0]?.quantity || 1}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveAdminPage('products')}
                      className="px-9 py-3 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-xs font-extrabold transition cursor-pointer"
                    >
                      View shop
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (trackedProd) setAdminDetailProduct(trackedProd);
                        setActiveAdminPage('product_detail');
                      }}
                      className="px-9 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-xs transition cursor-pointer"
                    >
                      View product
                    </button>
                  </div>
                </div>
              </div>

              {/* CARD 2: Detail Horizontal 4-Step Progress Stepper */}
              <div
                className={`p-7 rounded-3xl border space-y-6 ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="space-y-1">
                  <h3 className="text-sm font-black">Detail</h3>
                  <p className="text-xs text-slate-400">
                    Your items is on the way. Tracking information will be available within 24 hours.
                  </p>
                </div>

                {/* 4-Step Connected Horizontal Stepper */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-0 pt-2">
                  {[
                    {
                      title: 'Receiving orders',
                      sub: '05:43 AM',
                      done: true,
                    },
                    {
                      title: 'Order processing',
                      sub: '01:21 PM',
                      done: true,
                    },
                    {
                      title: 'Being delivered',
                      sub: 'Processing',
                      done: true,
                    },
                    {
                      title: 'Delivered',
                      sub:
                        activeOrder?.status === 'Delivered'
                          ? 'Completed'
                          : 'Pending',
                      done: activeOrder?.status === 'Delivered',
                    },
                  ].map((step, idx) => (
                    <div
                      key={step.title}
                      onClick={() => {
                        if (activeOrder) {
                          const statusMap: StoreOrderRecord['status'][] = [
                            'Confirmed',
                            'Packing at Warehouse',
                            'In Transit',
                            'Delivered',
                          ];
                          updateOrderStatus(activeOrder.orderId, statusMap[idx]);
                        }
                      }}
                      className="relative flex flex-col items-center text-center cursor-pointer group"
                    >
                      {/* Horizontal Connector Line */}
                      <div className="w-full flex items-center justify-center relative mb-3">
                        <div
                          className={`h-1 flex-1 ${
                            step.done
                              ? 'bg-blue-600'
                              : isDark
                              ? 'bg-white/10'
                              : 'bg-slate-100'
                          }`}
                        />
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition transform group-hover:scale-105 ${
                            step.done
                              ? 'bg-blue-600 text-white shadow-sm'
                              : isDark
                              ? 'bg-[#1D2636] text-slate-500'
                              : 'bg-slate-200/80 text-white'
                          }`}
                        >
                          <Check size={18} strokeWidth={2.5} />
                        </div>
                        <div
                          className={`h-1 flex-1 ${
                            idx === 3
                              ? step.done
                                ? 'bg-blue-600'
                                : isDark
                                ? 'bg-white/10'
                                : 'bg-slate-100'
                              : step.done
                              ? 'bg-blue-600'
                              : isDark
                              ? 'bg-white/10'
                              : 'bg-slate-100'
                          }`}
                        />
                      </div>

                      <div
                        className={`text-xs sm:text-sm font-black ${
                          step.done
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {step.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD 3: Tracking Log Table (Date, Time, Description, Location) */}
              <div
                className={`p-6 rounded-3xl border overflow-x-auto ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr
                      className={`text-[11px] font-black ${
                        isDark ? 'bg-[#1D2636]' : 'bg-[#F8FAFC]'
                      }`}
                    >
                      <th className="p-3.5 rounded-l-xl">Date</th>
                      <th className="p-3.5">Time</th>
                      <th className="p-3.5">Description</th>
                      <th className="p-3.5 rounded-r-xl">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/10 text-slate-600 dark:text-slate-300">
                    {[
                      {
                        date: '20 Nov 2023',
                        time: '2:30 PM',
                        desc: 'The sender is preparing the goods',
                        loc: '2715 Ash Dr. San Jose, South Dakota 83475',
                      },
                      {
                        date: '20 Nov 2023',
                        time: '01:00 PM',
                        desc: 'The order has arrived at the post office',
                        loc: '3517 W. Gray St. Utica, Pennsylvania 57867',
                      },
                      {
                        date: '21 Nov 2023',
                        time: '03:58 AM',
                        desc: 'The carrier is picking up the goods',
                        loc: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
                      },
                      {
                        date: '22 Nov 2023',
                        time: '06:26 PM',
                        desc: 'The order has been shipped',
                        loc: '4140 Parker Rd. Allentown, New Mexico 31134',
                      },
                      {
                        date: '22 Nov 2023',
                        time: '03:45 PM',
                        desc: 'Your order will be delivered to you in 30 minutes',
                        loc: '8502 Preston Rd. Inglewood, Maine 98380',
                      },
                      {
                        date: '23 Nov 2023',
                        time: '12:21 AM',
                        desc: 'The order has been delivered successfully',
                        loc: '3891 Ranchview Dr. Richardson, California 62639',
                      },
                    ].map((log, i) => (
                      <tr
                        key={i}
                        className="hover:bg-slate-50/70 dark:hover:bg-white/5 transition"
                      >
                        <td className="p-4 font-medium">{log.date}</td>
                        <td className="p-4 font-medium">{log.time}</td>
                        <td className="p-4 font-medium">{log.desc}</td>
                        <td className="p-4 font-medium">{log.loc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}

        {/* =================================================================== */}
        {/* PAGE 17: ALL USERS & ADD NEW USER ('all_users' | 'add_user')        */}
        {/* =================================================================== */}
        {activeAdminPage === 'add_user' && (
          <div className="space-y-6">
            {/* Top Title & Breadcrumb */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-black">Add New User</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('overview')}
                  className="hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  Dashboard
                </button>
                <ChevronRight size={13} />
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('all_users')}
                  className="hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  User
                </button>
                <ChevronRight size={13} />
                <span className="text-slate-400">Add New User</span>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newUserName.trim()) return;
                setAdminUsers((prev) => [
                  {
                    id: `usr_${Date.now()}`,
                    name: newUserName,
                    email: newUserEmail || 'staff@bazar.com',
                    phone: newUserPhone || '+880 1700-000000',
                    role: newUserRole,
                    avatar:
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                  },
                  ...prev,
                ]);
                setNewUserName('');
                setNewUserEmail('');
                setNewUserPassword('');
                setNewUserConfirmPassword('');
                setActiveAdminPage('all_users');
              }}
              className="space-y-6 text-xs"
            >
              {/* CARD 1: Account Section */}
              <div
                className={`p-7 rounded-3xl border grid grid-cols-1 lg:grid-cols-12 gap-8 ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="lg:col-span-4 space-y-1.5">
                  <h3 className="text-base font-black">Account</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Fill in the information below to add a new account
                  </p>
                </div>

                <div className="lg:col-span-8 space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black">Name</label>
                    <input
                      type="text"
                      required
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      placeholder="Username"
                      className={`w-full px-4 py-3.5 rounded-2xl border text-xs font-medium focus:outline-none ${
                        isDark
                          ? 'bg-[#1D2636] border-white/10 text-white'
                          : 'bg-white border-slate-200/90 text-slate-800'
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black">Email</label>
                    <input
                      type="email"
                      required
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      placeholder="Email"
                      className={`w-full px-4 py-3.5 rounded-2xl border text-xs font-medium focus:outline-none ${
                        isDark
                          ? 'bg-[#1D2636] border-white/10 text-white'
                          : 'bg-white border-slate-200/90 text-slate-800'
                      }`}
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black">Password</label>
                    <div className="relative">
                      <input
                        type={showUserPassword ? 'text' : 'password'}
                        value={newUserPassword}
                        onChange={(e) => setNewUserPassword(e.target.value)}
                        placeholder="Enter password"
                        className={`w-full px-4 pr-11 py-3.5 rounded-2xl border text-xs font-medium focus:outline-none ${
                          isDark
                            ? 'bg-[#1D2636] border-white/10 text-white'
                            : 'bg-white border-slate-200/90 text-slate-800'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowUserPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showUserPassword ? (
                          <Eye size={15} />
                        ) : (
                          <EyeOff size={15} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm password */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black">
                      Confirm password
                    </label>
                    <div className="relative">
                      <input
                        type={showUserConfirmPassword ? 'text' : 'password'}
                        value={newUserConfirmPassword}
                        onChange={(e) =>
                          setNewUserConfirmPassword(e.target.value)
                        }
                        placeholder="Confirm password"
                        className={`w-full px-4 pr-11 py-3.5 rounded-2xl border text-xs font-medium focus:outline-none ${
                          isDark
                            ? 'bg-[#1D2636] border-white/10 text-white'
                            : 'bg-white border-slate-200/90 text-slate-800'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowUserConfirmPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showUserConfirmPassword ? (
                          <Eye size={15} />
                        ) : (
                          <EyeOff size={15} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: Permission Section */}
              <div
                className={`p-7 rounded-3xl border grid grid-cols-1 lg:grid-cols-12 gap-8 ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="lg:col-span-4 space-y-1.5">
                  <h3 className="text-base font-black">Permission</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Items that the account is allowed to edit
                  </p>
                </div>

                <div className="lg:col-span-8 space-y-5">
                  {[
                    'Add product',
                    'Update product',
                    'Delete product',
                    'Apply discount',
                    'Create coupon',
                  ].map((permKey) => {
                    const currentVal = userPermissions[permKey] || 'allow';
                    return (
                      <div key={permKey} className="space-y-2">
                        <div className="text-xs font-black">{permKey}</div>
                        <div className="flex items-center gap-3">
                          {/* Allow Pill */}
                          <button
                            type="button"
                            onClick={() =>
                              setUserPermissions((prev) => ({
                                ...prev,
                                [permKey]: 'allow',
                              }))
                            }
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                              currentVal === 'allow'
                                ? 'bg-blue-600 text-white shadow-xs'
                                : isDark
                                ? 'bg-[#1D2636] text-slate-300 border border-white/10'
                                : 'bg-[#F4F6FA] text-slate-700'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                currentVal === 'allow'
                                  ? 'bg-white text-blue-600'
                                  : 'border border-slate-400 bg-white'
                              }`}
                            >
                              {currentVal === 'allow' && (
                                <Check size={10} strokeWidth={3} />
                              )}
                            </span>
                            <span>Allow</span>
                          </button>

                          {/* Deny Pill */}
                          <button
                            type="button"
                            onClick={() =>
                              setUserPermissions((prev) => ({
                                ...prev,
                                [permKey]: 'deny',
                              }))
                            }
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                              currentVal === 'deny'
                                ? 'bg-blue-600 text-white shadow-xs'
                                : isDark
                                ? 'bg-[#1D2636] text-slate-300 border border-white/10'
                                : 'bg-[#F4F6FA] text-slate-700'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                currentVal === 'deny'
                                  ? 'bg-white text-blue-600'
                                  : 'border border-slate-400 bg-white'
                              }`}
                            >
                              {currentVal === 'deny' && (
                                <Check size={10} strokeWidth={3} />
                              )}
                            </span>
                            <span>Deny</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Left Save Button */}
              <div>
                <button
                  type="submit"
                  className="px-14 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-xs transition cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {activeAdminPage === 'all_users' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-black">All User</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('overview')}
                  className="hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  Dashboard
                </button>
                <ChevronRight size={13} />
                <span>User</span>
                <ChevronRight size={13} />
                <span className="text-slate-400">All User</span>
              </div>
            </div>

            <div
              className={`p-6 rounded-3xl border space-y-5 ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    value={prodSearch}
                    onChange={(e) => setProdSearch(e.target.value)}
                    placeholder="Search here..."
                    className={`w-full pl-4 pr-9 py-2.5 rounded-xl border text-xs outline-none ${
                      isDark
                        ? 'bg-[#1D2636] border-white/10 text-white'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                  <Search
                    size={15}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('add_user')}
                  className="px-5 py-2.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-xs font-extrabold transition cursor-pointer"
                >
                  + Add new
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr
                      className={`text-[11px] font-black ${
                        isDark ? 'bg-[#1D2636]' : 'bg-[#F8FAFC]'
                      }`}
                    >
                      <th className="p-4 rounded-l-xl">User</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Email</th>
                      <th className="p-4 text-right rounded-r-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {adminUsers.map((u) => (
                      <tr
                        key={u.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={u.avatar}
                              alt={u.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-extrabold">{u.name}</div>
                              <div className="text-[11px] text-slate-400">
                                {u.role}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-bold">{u.phone}</td>
                        <td className="p-4 font-semibold">{u.email}</td>
                        <td className="p-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setActiveAdminPage('add_user')}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg cursor-pointer"
                              title="Edit User"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setAdminUsers((prev) =>
                                  prev.filter((item) => item.id !== u.id)
                                )
                              }
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                              title="Delete User"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 18: ROLES MANAGEMENT ('roles' | 'create_role')                 */}
        {/* =================================================================== */}
        {activeAdminPage === 'create_role' && (
          <div className="space-y-6">
            {/* Top Title & Breadcrumb */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-black">Create Role</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('overview')}
                  className="hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  Dashboard
                </button>
                <ChevronRight size={13} />
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('roles')}
                  className="hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  Roles
                </button>
                <ChevronRight size={13} />
                <span className="text-slate-400">Create role</span>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newRoleName.trim()) return;
                setAdminRoles((prev) => [
                  {
                    id: `role_${Date.now()}`,
                    name: newRoleName,
                    createdAt: '20 Nov 2023',
                    permissions: newRolePerm,
                  },
                  ...prev,
                ]);
                setNewRoleName('');
                setActiveAdminPage('roles');
              }}
              className="space-y-6 text-xs"
            >
              {/* Main Create Role Card */}
              <div
                className={`p-7 rounded-3xl border space-y-6 ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-black">Name</label>
                  <input
                    type="text"
                    required
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    placeholder="Username"
                    className={`w-full px-4 py-3.5 rounded-2xl border text-xs font-medium focus:outline-none ${
                      isDark
                        ? 'bg-[#1D2636] border-white/10 text-white'
                        : 'bg-white border-slate-200/90 text-slate-800'
                    }`}
                  />
                </div>

                {/* Permissions Header Strip */}
                <div
                  className={`px-4 py-3 rounded-xl text-xs font-black ${
                    isDark ? 'bg-[#1D2636]' : 'bg-[#F8FAFC]'
                  }`}
                >
                  Permissions
                </div>

                {/* 12 Permission Rows with All / Index / Create / Edit / Delete Checkboxes */}
                <div className="space-y-1.5">
                  {[
                    'Roles',
                    'Users',
                    'Product',
                    'Category',
                    'Attributes',
                    'Order',
                    'Location',
                    'Coupon',
                    'Tax',
                    'Product review',
                    'Support ticket',
                    'Report',
                  ].map((moduleName, idx) => {
                    const rowState = roleMatrix[moduleName] || {
                      All: false,
                      Index: false,
                      Create: false,
                      Edit: false,
                      Delete: false,
                    };

                    return (
                      <div
                        key={moduleName}
                        className={`px-4 py-3.5 rounded-xl grid grid-cols-2 sm:grid-cols-6 items-center gap-3 ${
                          idx % 2 === 0
                            ? isDark
                              ? 'bg-[#1D2636]/70'
                              : 'bg-[#F8FAFC]'
                            : 'bg-transparent'
                        }`}
                      >
                        <div className="col-span-2 sm:col-span-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                          {moduleName}
                        </div>

                        {(['All', 'Index', 'Create', 'Edit', 'Delete'] as const).map(
                          (action) => {
                            const isChecked = Boolean(rowState[action]);
                            return (
                              <label
                                key={action}
                                className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300 cursor-pointer select-none"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    setRoleMatrix((prev) => {
                                      const current = prev[moduleName] || {
                                        All: false,
                                        Index: false,
                                        Create: false,
                                        Edit: false,
                                        Delete: false,
                                      };
                                      if (action === 'All') {
                                        const nextAll = !current.All;
                                        return {
                                          ...prev,
                                          [moduleName]: {
                                            All: nextAll,
                                            Index: nextAll,
                                            Create: nextAll,
                                            Edit: nextAll,
                                            Delete: nextAll,
                                          },
                                        };
                                      }
                                      const updated = {
                                        ...current,
                                        [action]: !current[action],
                                      };
                                      updated.All =
                                        updated.Index &&
                                        updated.Create &&
                                        updated.Edit &&
                                        updated.Delete;
                                      return {
                                        ...prev,
                                        [moduleName]: updated,
                                      };
                                    });
                                  }}
                                  className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer"
                                />
                                <span>{action}</span>
                              </label>
                            );
                          }
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Left Save Button */}
              <div>
                <button
                  type="submit"
                  className="px-14 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-xs transition cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {activeAdminPage === 'roles' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-black">All Roles</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('overview')}
                  className="hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  Dashboard
                </button>
                <ChevronRight size={13} />
                <span>Roles</span>
                <ChevronRight size={13} />
                <span className="text-slate-400">All Roles</span>
              </div>
            </div>

            <div
              className={`p-6 rounded-3xl border space-y-5 ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    value={prodSearch}
                    onChange={(e) => setProdSearch(e.target.value)}
                    placeholder="Search here..."
                    className={`w-full pl-4 pr-9 py-2.5 rounded-xl border text-xs outline-none ${
                      isDark
                        ? 'bg-[#1D2636] border-white/10 text-white'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                  <Search
                    size={15}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setActiveAdminPage('create_role')}
                  className="px-5 py-2.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-xs font-extrabold transition cursor-pointer"
                >
                  + Create role
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr
                      className={`text-[11px] font-black ${
                        isDark ? 'bg-[#1D2636]' : 'bg-[#F8FAFC]'
                      }`}
                    >
                      <th className="p-4 rounded-l-xl">Role Name</th>
                      <th className="p-4">Permissions</th>
                      <th className="p-4">Created At</th>
                      <th className="p-4 text-right rounded-r-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {adminRoles.map((r) => (
                      <tr
                        key={r.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition"
                      >
                        <td className="p-4 font-extrabold">{r.name}</td>
                        <td className="p-4 text-slate-500">{r.permissions}</td>
                        <td className="p-4 font-semibold">{r.createdAt}</td>
                        <td className="p-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setActiveAdminPage('create_role')}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg cursor-pointer"
                              title="Edit Role"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setAdminRoles((prev) =>
                                  prev.filter((item) => item.id !== r.id)
                                )
                              }
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                              title="Delete Role"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 19: MEDIA GALLERY ('gallery')                                  */}
        {/* =================================================================== */}
        {activeAdminPage === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black">
                  All Gallery Media (প্রোডাক্ট ইমেজ ও মিডিয়া গ্যালারি)
                </h2>
                <p className="text-xs text-slate-500">
                  Manage product photos, banners, and organic certification assets
                </p>
              </div>
              <button
                type="button"
                onClick={openAddProductModal}
                className="px-4 py-2 rounded-xl text-xs font-extrabold text-white flex items-center gap-1.5 cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              >
                <Upload size={14} />
                <span>Upload Media</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className={`p-3 rounded-2xl border space-y-2 ${
                    isDark
                      ? 'bg-[#171F2C] border-white/10'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-slate-100">
                    <EditableImage
                      id={`gallery_asset_${p.id}`}
                      defaultSrc={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs font-extrabold truncate">{p.name}</div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {p.sku}.jpg · High-Res
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 20: SALES & REVENUE REPORT ('report') — Exact Remos Layout     */}
        {/* =================================================================== */}
        {activeAdminPage === 'report' && (
          <div className="space-y-6">
            {/* Report Header + Download Report as PDF + Breadcrumb */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black">Report</h2>
                {pdfExportNotice && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold border border-emerald-500/25">
                    <Check size={13} />
                    <span>{pdfExportNotice}</span>
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleDownloadReportPdf('full')}
                  disabled={isGeneratingPdf}
                  className="px-4 py-2.5 rounded-xl bg-[#2275FC] hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-extrabold shadow-xs flex items-center gap-2 transition cursor-pointer"
                >
                  <Download size={15} />
                  <span>
                    {isGeneratingPdf
                      ? 'Generating PDF...'
                      : 'Download Report as PDF'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className={`px-3.5 py-2.5 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
                    isDark
                      ? 'bg-[#171F2C] border-white/10 text-slate-200 hover:bg-white/5'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                  title="Print Report View"
                >
                  <Printer size={14} />
                  <span>Print</span>
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-bold pl-1">
                  <button
                    type="button"
                    onClick={() => setActiveAdminPage('overview')}
                    className="hover:text-slate-700 dark:hover:text-white cursor-pointer"
                  >
                    Dashboard
                  </button>
                  <ChevronRight size={13} />
                  <span className="text-slate-500">Report</span>
                </div>
              </div>
            </div>

            {/* ROW 1: 3 Top Summary Cards with Dense Vertical Multi-Bar Charts & Hover Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: 'rep_amount',
                  title: 'Total Amount',
                  val: '34,945',
                  growth: '1.56%',
                  up: true,
                  color: '#3B82F6',
                  lightColor: '#DBEAFE',
                  tint: 'rgba(59,130,246,0.12)',
                  bars: [
                    45, 72, 38, 64, 52, 85, 42, 76, 58, 92, 48, 68, 55, 82, 40,
                    74, 62, 88, 50, 70, 44, 78, 60, 84,
                  ],
                },
                {
                  id: 'rep_revenue',
                  title: 'Total Revenue',
                  val: '$37,802',
                  growth: '1.56%',
                  up: false,
                  color: '#F97316',
                  lightColor: '#FFEDD5',
                  tint: 'rgba(249,115,22,0.12)',
                  bars: [
                    55, 80, 48, 70, 60, 90, 45, 74, 66, 86, 52, 76, 58, 84, 46,
                    78, 64, 92, 54, 72, 48, 82, 62, 88,
                  ],
                },
                {
                  id: 'rep_customer',
                  title: 'Total Customer',
                  val: '34,945',
                  growth: '0.00%',
                  up: true,
                  color: '#22C55E',
                  lightColor: '#DCFCE7',
                  tint: 'rgba(34,197,94,0.12)',
                  bars: [
                    48, 68, 42, 75, 54, 82, 46, 70, 58, 88, 50, 72, 60, 86, 44,
                    76, 62, 90, 52, 74, 46, 80, 58, 84,
                  ],
                },
              ].map((card) => (
                <div
                  key={card.id}
                  className={`p-6 rounded-3xl border space-y-5 relative ${
                    isDark
                      ? 'bg-[#171F2C] border-white/10'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center font-black"
                        style={{
                          backgroundColor: card.tint,
                          color: card.color,
                        }}
                      >
                        <ShoppingBag size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-400">
                          {card.title}
                        </div>
                        <div className="text-2xl font-black">{card.val}</div>
                      </div>
                    </div>
                    <div
                      className={`inline-flex items-center gap-1 text-xs font-black ${
                        card.up ? 'text-emerald-600' : 'text-rose-500'
                      }`}
                    >
                      <TrendingUp size={14} />
                      <span>{card.growth}</span>
                    </div>
                  </div>

                  {/* Hover Tooltip Pill */}
                  {hoveredChartPoint?.chartId === card.id && (
                    <div className="absolute top-3 right-4 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold shadow-md z-10">
                      {hoveredChartPoint.label}: {hoveredChartPoint.primaryValue}
                    </div>
                  )}

                  {/* Dense Vertical Histogram Bars (Matches Remos Report Top Cards) */}
                  <div className="h-28 flex items-end justify-between gap-1 pt-4 border-t border-slate-100 dark:border-white/5">
                    {card.bars.map((h, i) => (
                      <div
                        key={i}
                        onMouseEnter={() =>
                          setHoveredChartPoint({
                            chartId: card.id,
                            label: `Day ${i + 1}`,
                            primaryLabel: card.title,
                            primaryValue:
                              card.id === 'rep_revenue'
                                ? `$${(h * 45).toLocaleString()}`
                                : `${(h * 38).toLocaleString()}`,
                          })
                        }
                        onMouseLeave={() => setHoveredChartPoint(null)}
                        className="flex-1 h-full flex flex-col justify-end items-center cursor-pointer group"
                      >
                        <div
                          className="w-full rounded-t transition-all group-hover:opacity-100"
                          style={{
                            height: `${h}%`,
                            background: `linear-gradient(to top, ${card.color} 55%, ${card.lightColor} 55%)`,
                            opacity: 0.78,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ROW 2: Seller statistic (Left) + Total sale (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Seller statistic Card */}
              <div
                className={`p-6 rounded-3xl border space-y-5 relative ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-black">Seller statistic</h3>
                  <div className="flex items-center gap-2">
                    <select
                      value={reportSellerRange}
                      onChange={(e) => setReportSellerRange(e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold bg-transparent cursor-pointer"
                    >
                      <option value="Last 30 days">Last 30 days</option>
                      <option value="Last 90 days">Last 90 days</option>
                      <option value="This Year">This Year</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => handleDownloadReportPdf('seller')}
                      className="p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 hover:text-blue-600 hover:border-blue-300 transition cursor-pointer"
                      title="Download Seller Statistic PDF"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>

                {/* Revenue & Profit Header Metrics */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        <span>Revenue</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xl font-black">$37,802</span>
                        <span className="text-xs font-black text-emerald-600">
                          ↗ 0.56%
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-200" />
                        <span>Profit</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xl font-black">$28,305</span>
                        <span className="text-xs font-black text-emerald-600">
                          ↗ 0.56%
                        </span>
                      </div>
                    </div>
                  </div>

                  {hoveredChartPoint?.chartId === 'rep_seller_stat' && (
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-md">
                      <span className="text-blue-300">{hoveredChartPoint.label}:</span>{' '}
                      Rev {hoveredChartPoint.primaryValue} · Profit{' '}
                      <span className="text-emerald-400">
                        {hoveredChartPoint.secondaryValue}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stacked Rounded Column Chart with Value Labels on Top (57, 78, 61, 75, 35, 70, 88, 110, 82, 134, 44) */}
                <div className="h-64 flex items-end justify-between gap-2.5 pt-8 border-b border-slate-100 dark:border-white/10">
                  {[
                    { m: 'Jan', total: 57, low: 34, rev: '$21,400', prof: '$15,200' },
                    { m: 'Feb', total: 78, low: 44, rev: '$28,900', prof: '$20,100' },
                    { m: 'Mar', total: 61, low: 32, rev: '$23,100', prof: '$16,400' },
                    { m: 'Apr', total: 75, low: 52, rev: '$27,600', prof: '$19,800' },
                    { m: 'May', total: 35, low: 18, rev: '$14,200', prof: '$9,800' },
                    { m: 'Jun', total: 70, low: 35, rev: '$26,400', prof: '$18,900' },
                    { m: 'Jul', total: 88, low: 36, rev: '$31,200', prof: '$22,600' },
                    { m: 'Aug', total: 110, low: 45, rev: '$35,100', prof: '$25,900' },
                    { m: 'Sep', total: 82, low: 34, rev: '$29,800', prof: '$21,300' },
                    { m: 'Oct', total: 134, low: 54, rev: '$37,802', prof: '$28,305' },
                    { m: 'Nov', total: 44, low: 18, rev: '$17,900', prof: '$12,400' },
                  ].map((col) => {
                    const heightPct = Math.round((col.total / 145) * 100);
                    const bottomShare = Math.round((col.low / col.total) * 100);
                    return (
                      <div
                        key={col.m}
                        onMouseEnter={() =>
                          setHoveredChartPoint({
                            chartId: 'rep_seller_stat',
                            label: `${col.m} (${col.total} Sellers)`,
                            primaryLabel: 'Revenue',
                            primaryValue: col.rev,
                            secondaryLabel: 'Profit',
                            secondaryValue: col.prof,
                          })
                        }
                        onMouseLeave={() => setHoveredChartPoint(null)}
                        className="flex-1 h-full flex flex-col items-center justify-end gap-1.5 cursor-pointer group"
                      >
                        <span className="text-[10px] font-black text-slate-700 dark:text-slate-200 group-hover:text-blue-600">
                          {col.total}
                        </span>
                        <div
                          className="w-full rounded-t-lg overflow-hidden flex flex-col justify-end transition-transform group-hover:scale-105"
                          style={{
                            height: `${heightPct}%`,
                            backgroundColor: '#DBEAFE',
                          }}
                        >
                          <div
                            className="w-full bg-blue-600 group-hover:bg-orange-500 transition-colors"
                            style={{ height: `${bottomShare}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 pt-1">
                          {col.m}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Total sale Card */}
              <div
                className={`p-6 rounded-3xl border space-y-5 relative ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-black">Total sale</h3>
                  <div className="flex items-center gap-2">
                    <select
                      value={reportSaleRange}
                      onChange={(e) => setReportSaleRange(e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold bg-transparent cursor-pointer"
                    >
                      <option value="Last 30 days">Last 30 days</option>
                      <option value="Last 90 days">Last 90 days</option>
                      <option value="This Year">This Year</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => handleDownloadReportPdf('sales')}
                      className="p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 hover:text-blue-600 hover:border-blue-300 transition cursor-pointer"
                      title="Download Total Sale PDF"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>

                {/* Revenue & Profit Header Metrics */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        <span>Revenue</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xl font-black">$37,802</span>
                        <span className="text-xs font-black text-emerald-600">
                          ↗ 0.56%
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-200" />
                        <span>Profit</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xl font-black">$28,305</span>
                        <span className="text-xs font-black text-emerald-600">
                          ↗ 0.56%
                        </span>
                      </div>
                    </div>
                  </div>

                  {hoveredChartPoint?.chartId === 'rep_total_sale' && (
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-md">
                      <span className="text-blue-300">{hoveredChartPoint.label}:</span>{' '}
                      Rev {hoveredChartPoint.primaryValue} · Profit{' '}
                      <span className="text-emerald-400">
                        {hoveredChartPoint.secondaryValue}
                      </span>
                    </div>
                  )}
                </div>

                {/* Thin Paired Side-by-Side Column Chart (Jan–Oct) */}
                <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-slate-100 dark:border-white/10">
                  {[
                    { m: 'Jan', profH: 42, revH: 68, rev: '$25,400', prof: '$16,800' },
                    { m: 'Feb', profH: 60, revH: 90, rev: '$34,200', prof: '$23,100' },
                    { m: 'Mar', profH: 22, revH: 38, rev: '$15,600', prof: '$9,400' },
                    { m: 'Apr', profH: 28, revH: 56, rev: '$21,800', prof: '$12,900' },
                    { m: 'May', profH: 82, revH: 98, rev: '$37,802', prof: '$28,305' },
                    { m: 'Jun', profH: 56, revH: 84, rev: '$31,500', prof: '$21,200' },
                    { m: 'Jul', profH: 14, revH: 25, rev: '$11,200', prof: '$6,800' },
                    { m: 'Aug', profH: 35, revH: 60, rev: '$22,900', prof: '$14,500' },
                    { m: 'Sep', profH: 82, revH: 82, rev: '$30,800', prof: '$24,900' },
                    { m: 'Oct', profH: 56, revH: 56, rev: '$21,400', prof: '$17,200' },
                  ].map((bar) => (
                    <div
                      key={bar.m}
                      onMouseEnter={() =>
                        setHoveredChartPoint({
                          chartId: 'rep_total_sale',
                          label: `${bar.m} 2026`,
                          primaryLabel: 'Revenue',
                          primaryValue: bar.rev,
                          secondaryLabel: 'Profit',
                          secondaryValue: bar.prof,
                        })
                      }
                      onMouseLeave={() => setHoveredChartPoint(null)}
                      className="flex-1 h-full flex flex-col items-center justify-end gap-1.5 cursor-pointer group"
                    >
                      <div className="w-full h-full flex items-end justify-center gap-1">
                        <div
                          className="w-2 rounded-t bg-blue-200 group-hover:bg-orange-300 transition-colors"
                          style={{ height: `${bar.profH}%` }}
                        />
                        <div
                          className="w-2 rounded-t bg-blue-600 group-hover:bg-orange-500 transition-colors"
                          style={{ height: `${bar.revH}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 pt-1">
                        {bar.m}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROW 3: Sale / Purchase return ($84.86B ↘ 1.02%) Multi-Line Wave + Bottom Volume Bars */}
            <div
              className={`p-6 rounded-3xl border space-y-5 relative ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black">Sale / Purchase return</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-black">$84.86B</span>
                    <span className="text-xs font-black text-rose-500">
                      ↘ 1.02%
                    </span>
                  </div>
                </div>
                {hoveredChartPoint?.chartId === 'rep_return_wave' ? (
                  <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-md">
                    <span className="text-orange-400">{hoveredChartPoint.label}:</span>{' '}
                    Sale Return {hoveredChartPoint.primaryValue} · Purchase Return{' '}
                    <span className="text-sky-300">
                      {hoveredChartPoint.secondaryValue}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-slate-400">
                    Hover timeline for hourly return values
                  </span>
                )}
              </div>

              {/* Upper Smooth Multi-Wave SVG Chart (12:00 to 17:00) */}
              <div className="space-y-2">
                <div className="h-36 w-full relative">
                  <svg
                    viewBox="0 0 800 130"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    {[20, 45, 70, 95, 120].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="800"
                        y2={y}
                        stroke={isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9'}
                        strokeWidth="1"
                      />
                    ))}
                    {/* Orange Top Wave */}
                    <path
                      d="M0,78 C70,90 130,52 200,72 C270,92 330,25 400,32 C470,40 530,58 600,48 C670,38 730,36 800,30"
                      fill="none"
                      stroke="#F97316"
                      strokeWidth="2"
                    />
                    {/* Rose Middle Wave */}
                    <path
                      d="M0,92 C70,98 130,72 200,88 C270,104 330,68 400,76 C470,84 530,62 600,82 C670,102 730,64 800,78"
                      fill="none"
                      stroke="#FB7185"
                      strokeWidth="1.8"
                    />
                    {/* Sky Blue Bottom Wave */}
                    <path
                      d="M0,102 C70,106 130,84 200,96 C270,108 330,78 400,86 C470,94 530,74 600,92 C670,110 730,76 800,88"
                      fill="none"
                      stroke="#38BDF8"
                      strokeWidth="1.8"
                    />
                  </svg>
                </div>

                {/* Interactive Time Labels Strip */}
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 px-1">
                  {[
                    { t: '12:00', s: '$4,120', p: '$1,840' },
                    { t: '12:30', s: '$3,890', p: '$1,620' },
                    { t: '13:00', s: '$5,420', p: '$2,310' },
                    { t: '13:30', s: '$4,760', p: '$1,950' },
                    { t: '14:00', s: '$6,980', p: '$3,120' },
                    { t: '14:30', s: '$8,450', p: '$3,890' },
                    { t: '15:00', s: '$7,620', p: '$3,410' },
                    { t: '15:30', s: '$7,190', p: '$2,980' },
                    { t: '16:00', s: '$8,120', p: '$3,640' },
                    { t: '16:30', s: '$8,890', p: '$4,050' },
                    { t: '17:00', s: '$9,340', p: '$4,280' },
                  ].map((slot) => (
                    <button
                      key={slot.t}
                      type="button"
                      onMouseEnter={() =>
                        setHoveredChartPoint({
                          chartId: 'rep_return_wave',
                          label: slot.t,
                          primaryLabel: 'Sale Return',
                          primaryValue: slot.s,
                          secondaryLabel: 'Purchase Return',
                          secondaryValue: slot.p,
                        })
                      }
                      onMouseLeave={() => setHoveredChartPoint(null)}
                      className="hover:text-orange-500 cursor-pointer"
                    >
                      {slot.t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lower Grey Volume Histogram Bars (Exact Match to Screenshot) */}
              <div className="h-28 flex items-end justify-between gap-1 pt-4 border-t border-slate-100 dark:border-white/10">
                {[
                  40, 28, 72, 48, 86, 62, 34, 68, 92, 54, 38, 76, 44, 88, 64,
                  32, 78, 96, 58, 42, 74, 52, 84, 60, 36, 70, 90, 50, 40, 82,
                  56, 76, 46, 88, 66, 38, 72, 94, 54, 48, 80, 62, 44, 74, 86,
                  58, 36, 68,
                ].map((h, i) => (
                  <div
                    key={i}
                    onMouseEnter={() =>
                      setHoveredChartPoint({
                        chartId: 'rep_return_wave',
                        label: `Slot #${i + 1}`,
                        primaryLabel: 'Sale Return',
                        primaryValue: `$${(h * 95).toLocaleString()}`,
                        secondaryLabel: 'Purchase Return',
                        secondaryValue: `$${(h * 42).toLocaleString()}`,
                      })
                    }
                    onMouseLeave={() => setHoveredChartPoint(null)}
                    className="flex-1 h-full flex items-end cursor-pointer group"
                  >
                    <div
                      className="w-full rounded-t bg-slate-200 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 4: Transfer History Table with Eye / Edit / Delete + Pagination */}
            <div
              className={`p-6 rounded-3xl border space-y-5 ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-black">Transfer History</h3>
                <button
                  type="button"
                  onClick={() => handleDownloadReportPdf('transfers')}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-extrabold text-slate-600 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download size={13} />
                  <span>Export Ledger PDF</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-white/5 text-[11px] font-black text-slate-600 dark:text-slate-300">
                      <th className="p-3.5 rounded-l-xl">Transfer Id</th>
                      <th className="p-3.5">Name</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Total</th>
                      <th className="p-3.5 rounded-r-xl text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {reportTransfers.map((tr) => (
                      <tr
                        key={tr.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition"
                      >
                        <td className="p-3.5 font-mono font-bold">{tr.id}</td>
                        <td className="p-3.5 font-semibold">{tr.name}</td>
                        <td className="p-3.5 text-slate-500 font-medium">
                          {tr.date}
                        </td>
                        <td className="p-3.5 font-bold">{tr.total}</td>
                        <td className="p-3.5 text-right">
                          <div className="inline-flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setActiveAdminPage('order_detail')}
                              className="text-blue-600 hover:scale-110 transition cursor-pointer"
                              title="View Transfer Details"
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveAdminPage('order_tracking')}
                              className="text-emerald-600 hover:scale-110 transition cursor-pointer"
                              title="Edit Transfer"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setReportTransfers((prev) =>
                                  prev.filter((item) => item.id !== tr.id)
                                )
                              }
                              className="text-orange-600 hover:scale-110 transition cursor-pointer"
                              title="Delete Transfer"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer Showing Text & Pagination (1, 2, 3) */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-white/10 text-xs text-slate-400">
                <span>
                  Showing 10 to 16 in {reportTransfers.length + 22} records
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setReportTransferPage((p) => Math.max(1, p - 1))
                    }
                    className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
                  >
                    ‹
                  </button>
                  {[1, 2, 3].map((pg) => (
                    <button
                      key={pg}
                      type="button"
                      onClick={() => setReportTransferPage(pg)}
                      className={`w-8 h-8 rounded-full text-xs font-black flex items-center justify-center cursor-pointer ${
                        reportTransferPage === pg
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {pg}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setReportTransferPage((p) => Math.min(3, p + 1))
                    }
                    className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 21: LOCATION ('location' | 'countries' | 'states' | 'cities')  */}
        {/* =================================================================== */}
        {(activeAdminPage === 'location' ||
          activeAdminPage === 'countries' ||
          activeAdminPage === 'states' ||
          activeAdminPage === 'cities') && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black">
                  {activeAdminPage === 'countries'
                    ? 'Countries — International Export & Shipping Zones'
                    : activeAdminPage === 'states'
                    ? 'States / Divisions — 8 Divisions of Bangladesh'
                    : activeAdminPage === 'cities'
                    ? 'Cities & Thana Delivery Zones'
                    : 'Warehouse Locations & Delivery Hubs'}
                </h2>
                <p className="text-xs text-slate-500">
                  Manage Countries, States/Divisions, and City Courier Delivery Zones
                </p>
              </div>
              <div className="flex items-center gap-2">
                {(
                  [
                    { id: 'countries', label: 'Countries' },
                    { id: 'states', label: 'States / Divisions' },
                    { id: 'cities', label: 'Cities' },
                  ] as { id: StoreAdminPageId; label: string }[]
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveAdminPage(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border cursor-pointer ${
                      activeAdminPage === tab.id
                        ? 'text-white border-transparent'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10'
                    }`}
                    style={
                      activeAdminPage === tab.id ? { backgroundColor: primaryColor } : {}
                    }
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  hub: 'Bangladesh (Primary Domestic Market)',
                  area: '64 Districts · Dhaka, Chattogram, Sylhet, Rajshahi, Khulna',
                  fee: `৳${storeSettings.insideDhakaFee} Inside Dhaka / ৳${storeSettings.outsideDhakaFee} Nationwide`,
                  sla: '24h–48h Steadfast & Pathao',
                },
                {
                  hub: 'Sundarban & Khulna Honey Collection Hub',
                  area: 'Satkhira Wild Apiary Sorting Station',
                  fee: `৳${storeSettings.outsideDhakaFee} Nationwide`,
                  sla: '48h Express Courier',
                },
                {
                  hub: 'Pabna & Sirajganj Dairy Ghee Hub',
                  area: 'Traditional Bilona Ghee Processing Unit',
                  fee: `৳${storeSettings.outsideDhakaFee} Nationwide`,
                  sla: '48h Cold-Chain Dispatch',
                },
              ].map((loc) => (
                <div
                  key={loc.hub}
                  className={`p-5 rounded-3xl border space-y-2 ${
                    isDark
                      ? 'bg-[#171F2C] border-white/10'
                      : 'bg-white border-orange-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={16} style={{ color: primaryColor }} />
                    <span className="text-sm font-black">{loc.hub}</span>
                  </div>
                  <div className="text-xs text-slate-500">{loc.area}</div>
                  <div className="pt-2 flex items-center justify-between text-xs font-extrabold">
                    <span style={{ color: primaryColor }}>{loc.fee}</span>
                    <span className="text-emerald-600">{loc.sla}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 22: AUTH PAGES ('auth_login' | 'auth_sign_up')                 */}
        {/* =================================================================== */}
        {(activeAdminPage === 'auth_login' ||
          activeAdminPage === 'auth_sign_up') && (
          <div className="max-w-md mx-auto py-6">
            <div
              className={`p-8 rounded-3xl border space-y-5 ${
                isDark
                  ? 'bg-[#171F2C] border-white/10'
                  : 'bg-white border-orange-200/80 shadow-lg'
              }`}
            >
              <div className="text-center space-y-1">
                <div
                  className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center text-white font-black text-lg"
                  style={{ backgroundColor: primaryColor }}
                >
                  B
                </div>
                <h2 className="text-xl font-black pt-2">
                  {activeAdminPage === 'auth_sign_up'
                    ? 'Create your Bazar Admin account'
                    : 'Login to Bazar Admin Console'}
                </h2>
                <p className="text-xs text-slate-500">
                  {activeAdminPage === 'auth_sign_up'
                    ? 'Enter your personal details to create staff account'
                    : 'Enter your email & password to login'}
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActiveAdminPage('overview');
                }}
                className="space-y-4 text-xs"
              >
                {activeAdminPage === 'auth_sign_up' && (
                  <div>
                    <label className="block font-extrabold mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      defaultValue="Kristin Watson"
                      className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 font-bold"
                    />
                  </div>
                )}
                <div>
                  <label className="block font-extrabold mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    defaultValue="admin@bazar.com.bd"
                    className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-extrabold mb-1.5">Password *</label>
                  <input
                    type="password"
                    required
                    defaultValue="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 font-bold"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-white font-extrabold shadow-md cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  {activeAdminPage === 'auth_sign_up' ? 'Register Account' : 'Sign In to Dashboard'}
                </button>
              </form>

              <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-white/10">
                {activeAdminPage === 'auth_sign_up' ? (
                  <button
                    type="button"
                    onClick={() => setActiveAdminPage('auth_login')}
                    className="font-extrabold cursor-pointer"
                    style={{ color: primaryColor }}
                  >
                    Already have an account? Login Now
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveAdminPage('auth_sign_up')}
                    className="font-extrabold cursor-pointer"
                    style={{ color: primaryColor }}
                  >
                    Don&apos;t have an account yet? Register Now
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* PAGE 23: CHART & COMPONENTS ('chart' | 'components')                */}
        {/* =================================================================== */}
        {(activeAdminPage === 'chart' || activeAdminPage === 'components') && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-black">
              {activeAdminPage === 'chart'
                ? 'ApexCharts & Financial Analytics Widgets'
                : 'Bazar Admin UI Design System Components'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`p-6 rounded-3xl border space-y-4 ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="text-sm font-black">
                  Monthly Organic Category Revenue Split
                </div>
                <div className="space-y-3">
                  {categories.slice(0, 6).map((cat, idx) => {
                    const pct = Math.max(25, 92 - idx * 12);
                    return (
                      <div key={cat.slug} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold">
                          <span>
                            {cat.label} ({cat.bangla})
                          </span>
                          <span style={{ color: primaryColor }}>{pct}%</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              backgroundColor:
                                idx % 2 === 0 ? primaryColor : '#16A34A',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className={`p-6 rounded-3xl border space-y-4 ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="text-sm font-black">
                  Bazar UI Badges, Buttons &amp; Status Chips
                </div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="px-3.5 py-2 rounded-xl text-xs font-extrabold text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Primary Bazar Button (#F37021)
                  </span>
                  <span className="px-3.5 py-2 rounded-xl text-xs font-extrabold text-white bg-emerald-600">
                    Verified Organic (#16A34A)
                  </span>
                  <span className="px-3.5 py-2 rounded-xl text-xs font-extrabold text-white bg-blue-600">
                    Courier Dispatched (#2563EB)
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  All components across Store Website and Store Admin Website share the unified Bazar design tokens, Bangla/English bilingual labels, and real-time context state.
                </p>
              </div>
            </div>
          </div>
        )}
            </div>

            {/* Bottom Admin Copyright Bar (Matches Remos Screenshot) */}
            <div
              className={`px-6 py-4 border-t text-center text-xs text-slate-400 ${
                isDark
                  ? 'bg-[#141B26] border-white/10'
                  : 'bg-white border-slate-200/80'
              }`}
            >
              Copyright © 2026{' '}
              <span className="font-extrabold" style={{ color: primaryColor }}>
                Bazar Admin
              </span>
              . Design with ❤️ All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreAdminPagesRouterSection;
