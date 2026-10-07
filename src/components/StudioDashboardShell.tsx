import React, { useState, useEffect } from 'react';
import {
  Boxes,
  ShoppingBag,
  Coins,
  ShieldCheck,
  ChevronRight,
  Utensils,
  Dumbbell,
  Building2,
  Plus,
  LayoutGrid,
  Palette,
  AppWindow,
  Download,
  Sun,
  Moon,
  Zap,
  Smartphone,
  RotateCcw,
  X,
  Sparkles,
  Check,
  CheckCircle2,
  Layers,
  Trash2,
  Shield,
  Wand2,
  Lock,
  Globe,
  Edit3,
  Crop,
  BookOpen,
} from 'lucide-react';
import {
  CustomProjectDefinition,
  AIModelProviderType,
  loadCustomProjects,
  addCustomProject,
  deleteCustomProject,
} from '../utils/customProjectsStore';
import {
  analyzeProjectScreenRequirements,
  buildCompleteAppScreensSuite,
} from '../utils/fullAppScreenArchitect';
import DesignImageCropperModal from './DesignImageCropperModal';

export type StudioTab = 'screens' | 'theme' | 'branding' | 'export';

export interface StudioColorSwatch {
  id: string;
  name: string;
  swatch: string;
}

export interface StudioDashboardShellProps {
  activeProjectId: string;
  projectName: string;
  activeScreenLabel: string;
  activeVariantLabel: string;
  activeStudioTab: StudioTab;
  onSelectStudioTab: (tab: StudioTab) => void;
  onSwitchProject?: (projectId: string) => void;

  // Theme & Colors
  isDark: boolean;
  onToggleTheme: () => void;
  primaryColor: string;
  primaryTextColor?: string;

  // Optional Top Header Actions
  isSkeletonActive?: boolean;
  onToggleSkeleton?: () => void;
  onExportZip?: () => void;
  isZipping?: boolean;
  extraTopActions?: React.ReactNode;

  // Right Simulator Controls
  variantOptions: { id: string; label: string }[];
  currentVariantId: string;
  onChangeVariant: (variantId: string) => void;
  onReloadSimulator?: () => void;
  extraSimulatorHeaderControls?: React.ReactNode;

  // Bottom Swatches in Right Sidebar
  colorSwatches?: StudioColorSwatch[];
  activeColorId?: string;
  onSelectColorSwatch?: (id: string) => void;
  activeFontName?: string;

  // Content Slots (ONLY THESE CHANGE PER PROJECT)
  middleContent: React.ReactNode;
  mobileContent: React.ReactNode;
}

const ALL_FLOW_MODULE_IDS = [
  'Onboarding & Auth',
  'Discovery & Catalog',
  'Detail & Social',
  'Cart & Payment',
  'Tracking & Support',
  'Profile & Settings',
];

const DEFAULT_CATEGORIES = [
  'VPN & Cybersecurity',
  'E-Commerce & Retail',
  'FinTech & Crypto Wallet',
  'Food Delivery & POS',
  'Health, Fitness & Gym',
  'Real Estate & PropTech',
  'Logistics & Courier',
  'AI Assistant & Productivity',
  'Social & Community',
  'Education & EdTech',
  'Travel & Booking',
  'Ride-Hailing & EV',
];

export const StudioDashboardShell: React.FC<StudioDashboardShellProps> = ({
  activeProjectId,
  projectName,
  activeScreenLabel,
  activeVariantLabel,
  activeStudioTab,
  onSelectStudioTab,
  onSwitchProject,
  isDark,
  onToggleTheme,
  primaryColor,
  primaryTextColor = '#FFFFFF',
  isSkeletonActive = false,
  onToggleSkeleton,
  onExportZip,
  isZipping = false,
  extraTopActions,
  variantOptions,
  currentVariantId,
  onChangeVariant,
  onReloadSimulator,
  extraSimulatorHeaderControls,
  colorSwatches = [],
  activeColorId,
  onSelectColorSwatch,
  activeFontName = 'Plus Jakarta Sans',
  middleContent,
  mobileContent,
}) => {
  const [addAppModalOpen, setAddAppModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<CustomProjectDefinition | null>(null);
  const [customProjects, setCustomProjects] = useState<CustomProjectDefinition[]>(() =>
    loadCustomProjects()
  );

  // Create New Project Modal Form State
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [newProjName, setNewProjName] = useState('');
  const [newProjCategory, setNewProjCategory] = useState('VPN & Cybersecurity');
  const [isAddingCustomCategory, setIsAddingCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');

  const [newProjPackage, setNewProjPackage] = useState('com.appforge.app');
  const [isPackageManuallyEdited, setIsPackageManuallyEdited] = useState(false);

  const [newProjDetails, setNewProjDetails] = useState('');
  const [newProjVariantMode, setNewProjVariantMode] = useState<'two_variants' | 'single'>(
    'two_variants'
  );

  // Google Account & Multi-AI Model Permission state
  const [selectedAiModel, setSelectedAiModel] = useState<AIModelProviderType>('gemini_2_5_pro');
  const [selectedFlowModules, setSelectedFlowModules] = useState<string[]>(ALL_FLOW_MODULE_IDS);
  const [googlePermissionGranted, setGooglePermissionGranted] = useState(true);
  const [uploadedDesignImages, setUploadedDesignImages] = useState<
    Array<{ name: string; dataUrl: string; originalDataUrl?: string }>
  >([]);
  const [pendingCropQueue, setPendingCropQueue] = useState<
    Array<{ name: string; dataUrl: string }>
  >([]);
  const [editingCropIndex, setEditingCropIndex] = useState<number | null>(null);
  const [isAutofillingDetails, setIsAutofillingDetails] = useState(false);
  const [isGeneratingProject, setIsGeneratingProject] = useState(false);
  const [aiDynamicAnalysis, setAiDynamicAnalysis] = useState<any | null>(null);
  const [isFetchingAiArchitecture, setIsFetchingAiArchitecture] = useState(false);

  const safeParseJsonResponse = async (res: Response): Promise<any | null> => {
    try {
      const text = await res.text();
      if (!res.ok || !text || text.trim().startsWith('<')) {
        return null;
      }
      return JSON.parse(text);
    } catch {
      return null;
    }
  };

  const fetchLiveAiArchitecture = async (
    targetName = newProjName,
    targetCat = newProjCategory,
    targetDetails = newProjDetails
  ) => {
    if (!targetName.trim() || !targetDetails.trim()) return;
    setIsFetchingAiArchitecture(true);
    try {
      const res = await fetch('/api/projects/analyze-architecture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: targetName.trim(),
          category: targetCat,
          projectDetails: targetDetails.trim(),
          aiModelProvider: selectedAiModel,
        }),
      });
      const data = await safeParseJsonResponse(res);
      if (data?.analysis && Array.isArray(data.analysis.modules)) {
        setAiDynamicAnalysis(data.analysis);
        setSelectedFlowModules(data.analysis.modules.map((m: any) => m.id));
      } else {
        const localFallback = analyzeProjectScreenRequirements(
          targetName.trim(),
          targetCat,
          targetDetails.trim()
        );
        setAiDynamicAnalysis(localFallback);
        setSelectedFlowModules(localFallback.modules.map((m) => m.id));
      }
    } catch {
      const localFallback = analyzeProjectScreenRequirements(
        targetName.trim(),
        targetCat,
        targetDetails.trim()
      );
      setAiDynamicAnalysis(localFallback);
      setSelectedFlowModules(localFallback.modules.map((m) => m.id));
    } finally {
      setIsFetchingAiArchitecture(false);
    }
  };

  // Automatically sync root document dark class with isDark state
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDark);
      document.body.classList.toggle('dark', isDark);
    }
  }, [isDark]);

  // Automatically fetch bespoke AI screen architecture when Project Name, Category, or Details change
  useEffect(() => {
    if (!addAppModalOpen) return;
    if (!newProjName.trim() || !newProjDetails.trim()) {
      setAiDynamicAnalysis(null);
      return;
    }
    const timer = setTimeout(() => {
      fetchLiveAiArchitecture(newProjName, newProjCategory, newProjDetails);
    }, 650);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newProjName, newProjCategory, newProjDetails, selectedAiModel, addAppModalOpen]);

  useEffect(() => {
    const syncCustom = () => setCustomProjects(loadCustomProjects());
    window.addEventListener('custom-projects-updated', syncCustom);
    return () => window.removeEventListener('custom-projects-updated', syncCustom);
  }, []);

  const formatPackageSlug = (name: string) => {
    const clean = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '')
      .trim();
    return clean ? `com.appforge.${clean}` : 'com.appforge.app';
  };

  const handleProjectNameChange = (val: string) => {
    setNewProjName(val);
    if (!isPackageManuallyEdited) {
      setNewProjPackage(formatPackageSlug(val));
    }
  };

  const handleAddCustomCategory = () => {
    const trimmed = customCategoryInput.trim();
    if (!trimmed) return;
    if (!categories.includes(trimmed)) {
      setCategories((prev) => [trimmed, ...prev]);
    }
    setNewProjCategory(trimmed);
    setCustomCategoryInput('');
    setIsAddingCustomCategory(false);
  };

  const handleDesignFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/i)) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPendingCropQueue((prev) => [
            ...prev,
            { name: file.name, dataUrl: reader.result as string },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleGeminiAutofillDetails = async (overrideName?: string, overrideCat?: string) => {
    const targetName = (overrideName ?? newProjName).trim() || 'CyberShield VPN';
    const targetCat = overrideCat ?? newProjCategory;
    if (!newProjName.trim()) {
      handleProjectNameChange(targetName);
    }
    setIsAutofillingDetails(true);
    try {
      const compactImages = uploadedDesignImages
        .map((img) => img.dataUrl)
        .filter((u) => u.length < 1_000_000)
        .slice(0, 2);
      const res = await fetch('/api/projects/autofill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: targetName,
          category: targetCat,
          designImages: compactImages,
        }),
      });
      const data = await safeParseJsonResponse(res);
      if (data?.details) {
        setNewProjDetails(data.details);
      } else {
        setNewProjDetails(
          `${targetName} is a complete ${targetCat} mobile application featuring real-time dashboard analytics, core service controls, interactive catalog/server nodes, and biometric security settings.`
        );
      }
    } catch {
      setNewProjDetails(
        `${targetName} is a complete ${targetCat} mobile application featuring real-time dashboard analytics, core service controls, interactive catalog/server nodes, and biometric security settings.`
      );
    } finally {
      setIsAutofillingDetails(false);
    }
  };

  const openModalWithTemplate = (templateTitle?: string, templateCategory?: string) => {
    setIsPackageManuallyEdited(false);
    if (templateTitle) {
      setNewProjName(templateTitle);
      setNewProjPackage(formatPackageSlug(templateTitle));
      const cat = templateCategory || 'VPN & Cybersecurity';
      setNewProjCategory(cat);
      const isVpn =
        cat.toLowerCase().includes('vpn') || templateTitle.toLowerCase().includes('vpn');
      const isFood =
        cat.toLowerCase().includes('food') ||
        templateTitle.toLowerCase().includes('food') ||
        templateTitle.toLowerCase().includes('bite');
      setNewProjDetails(
        isVpn
          ? `${templateTitle} is a high-speed WireGuard & OpenVPN mobile client featuring a 1-tap encrypted tunnel connect screen, global multi-hop server location selector, real-time bandwidth & ping telemetry, split-tunneling app rules, and kill-switch security settings.`
          : isFood
          ? `${templateTitle} is a flagship gourmet food delivery application featuring 5 rich visual screens: Discover Eats Feed with flash deals & cuisine filter pills, Smash & Sear Restaurant Photo Menu, Smart Cart & 1-Tap Apple Pay Checkout, Live Courier GPS Radar Tracker, and VIP Gold Pass Rewards.`
          : `Complete mobile application for ${templateTitle} (${cat}) with real-time dashboard, interactive photo catalog, live status tracking, and settings.`
      );
    } else {
      setNewProjName('');
      setNewProjPackage('com.appforge.app');
      setNewProjDetails('');
    }
    setAddAppModalOpen(true);
  };

  const toggleFlowModule = (moduleId: string) => {
    setSelectedFlowModules((prev) => {
      if (prev.includes(moduleId)) {
        // Keep at least 1 flow selected so the project always has screens
        if (prev.length <= 1) return prev;
        return prev.filter((id) => id !== moduleId);
      }
      return [...prev, moduleId];
    });
  };

  const canCreateProject =
    newProjName.trim().length > 0 &&
    newProjPackage.trim().length > 0 &&
    newProjDetails.trim().length > 0 &&
    selectedFlowModules.length > 0 &&
    googlePermissionGranted &&
    !isGeneratingProject;

  const handleCreateNewProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canCreateProject) return;

    const cleanName = newProjName.trim();
    const cleanPkg = newProjPackage.trim() || formatPackageSlug(cleanName);
    const cleanDetails = newProjDetails.trim();

    setIsGeneratingProject(true);
    try {
      const designDataUrls = uploadedDesignImages.map((img) => img.dataUrl);
      const compactDesignUrls = designDataUrls.filter((u) => u.length < 1_000_000).slice(0, 2);

      let spec: any = null;
      try {
        const response = await fetch('/api/projects/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectName: cleanName,
            projectDetails: cleanDetails,
            variantMode: newProjVariantMode,
            aiModelProvider: selectedAiModel,
            selectedModules: selectedFlowModules,
            aiArchitectureModules: aiDynamicAnalysis?.modules || [],
            category: newProjCategory,
            designImages: compactDesignUrls,
          }),
        });
        const data = await safeParseJsonResponse(response);
        spec = data?.spec || null;
      } catch {
        spec = null;
      }

      const fallbackSuite = buildCompleteAppScreensSuite(
        cleanName,
        newProjCategory,
        cleanDetails,
        designDataUrls,
        selectedFlowModules,
        aiDynamicAnalysis?.modules || []
      );

      const rawScreens =
        Array.isArray(spec?.screens) && spec.screens.length > 0
          ? spec.screens
          : fallbackSuite.screens;

      const enrichedScreens = rawScreens.map((scr: any, idx: number) => ({
        ...scr,
        referenceImageUri:
          designDataUrls.length > 0
            ? designDataUrls[idx % designDataUrls.length]
            : scr.referenceImageUri,
      }));

      const createdProject: CustomProjectDefinition = {
        id: `custom_${Date.now().toString(36)}`,
        name: cleanName,
        packageName: cleanPkg,
        details: cleanDetails,
        category: newProjCategory,
        variantMode: newProjVariantMode,
        aiModelProvider: selectedAiModel,
        selectedModules: selectedFlowModules,
        primaryColor: spec?.primaryColor || fallbackSuite.primaryColor || '#4338CA',
        designImages: designDataUrls,
        createdAt: Date.now(),
        screens: enrichedScreens,
      };

      const updated = addCustomProject(createdProject);
      setCustomProjects(updated);
      setUploadedDesignImages([]);
      setAddAppModalOpen(false);
      if (onSwitchProject) {
        onSwitchProject(createdProject.id);
      }
    } finally {
      setIsGeneratingProject(false);
    }
  };

  const builtInProjectsList = [
    {
      id: 'book_store',
      title: 'Book Store',
      subtitle: '24 Screens · 144 Variants',
      icon: BookOpen,
    },
    {
      id: 'super_vpn',
      title: 'Super VPN',
      subtitle: '8 Screens · 40 Variants',
      icon: Shield,
    },
    {
      id: 'cloth_shop',
      title: 'Cloth Shop App',
      subtitle: '23 Screens · 138 Variants',
      icon: ShoppingBag,
    },
    {
      id: 'admin_app',
      title: 'Admin App',
      subtitle: '11 Screens · 88 Variants',
      icon: AppWindow,
    },
    {
      id: 'order_manage',
      title: 'Order manage App',
      subtitle: '18 Views & Tabs',
      icon: Coins,
    },
    {
      id: 'cloth_shop_admin',
      title: 'Cloth Shop Admin',
      subtitle: '12 Screens · 48 Variants',
      icon: ShieldCheck,
    },
  ];

  const totalProjectsCount = builtInProjectsList.length + customProjects.length;

  return (
    <div
      className={`${
        isDark ? 'dark bg-[#0d0f14] text-neutral-100' : 'bg-[#F8FAFC] text-neutral-900'
      } flex h-screen w-screen overflow-hidden font-sans antialiased`}
    >
      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR: REUSABLE MULTI-PROJECT WORKSPACE                         */}
      {/* ========================================================================= */}
      <div className="w-[255px] h-full flex flex-col flex-shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161c] z-20">
        {/* Workspace Brand Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black shadow-sm flex-shrink-0"
              style={{ backgroundColor: primaryColor, color: primaryTextColor }}
            >
              <Boxes size={18} />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-100 truncate">
                AppForge Studio
              </h1>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                Multi-App Expo Suite
              </p>
            </div>
          </div>

          <button
            onClick={() => openModalWithTemplate()}
            title="Create New Project"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-xs hover:opacity-95 transition flex-shrink-0"
            style={{ backgroundColor: primaryColor }}
          >
            <Plus size={15} />
          </button>
        </div>

        {/* Project List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <div className="px-2 flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
              Projects &amp; Apps ({totalProjectsCount})
            </span>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
              Ready
            </span>
          </div>

          {/* Built-in Core Projects */}
          {builtInProjectsList.map((proj) => {
            const IconComp = proj.icon;
            const isCurrent = activeProjectId === proj.id;

            return (
              <div
                key={proj.id}
                onClick={() => {
                  if (isCurrent) {
                    onSelectStudioTab('screens');
                  } else if (onSwitchProject) {
                    onSwitchProject(proj.id);
                  }
                }}
                className={`group relative rounded-xl p-3 transition-all cursor-pointer shadow-xs ${
                  isCurrent
                    ? 'border-2 bg-white dark:bg-[#181a22]'
                    : 'border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181a20] hover:border-neutral-400 dark:hover:border-neutral-700'
                }`}
                style={isCurrent ? { borderColor: primaryColor } : undefined}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0 ${
                      isCurrent
                        ? ''
                        : 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    }`}
                    style={
                      isCurrent
                        ? { backgroundColor: primaryColor, color: primaryTextColor }
                        : undefined
                    }
                  >
                    <IconComp size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                        {proj.title}
                      </h3>
                      {isCurrent ? (
                        <span className="flex h-2 w-2 relative flex-shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      ) : (
                        <ChevronRight
                          size={14}
                          className="text-neutral-400 group-hover:translate-x-0.5 transition flex-shrink-0"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                  <span
                    className={
                      isCurrent
                        ? 'font-semibold text-neutral-700 dark:text-neutral-300'
                        : 'font-medium text-neutral-600 dark:text-neutral-400'
                    }
                  >
                    {proj.subtitle}
                  </span>
                  {isCurrent ? (
                    <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      Active
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
                      Switch
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* User-Created Custom Projects */}
          {customProjects.map((cProj) => {
            const isCurrent = activeProjectId === cProj.id;
            const isSingleVariant = cProj.variantMode === 'single';
            const variantCountLabel = isSingleVariant
              ? `${cProj.screens.length} Screens · Single Layout`
              : `${cProj.screens.length} Screens · ${cProj.screens.length * 3} Variants`;

            return (
              <div
                key={cProj.id}
                onClick={() => {
                  if (isCurrent) {
                    onSelectStudioTab('screens');
                  } else if (onSwitchProject) {
                    onSwitchProject(cProj.id);
                  }
                }}
                className={`group relative rounded-xl p-3 transition-all cursor-pointer shadow-xs ${
                  isCurrent
                    ? 'border-2 bg-white dark:bg-[#181a22]'
                    : 'border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181a20] hover:border-neutral-400 dark:hover:border-neutral-700'
                }`}
                style={isCurrent ? { borderColor: primaryColor } : undefined}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-xs shadow-xs flex-shrink-0 overflow-hidden ${
                      isCurrent
                        ? ''
                        : 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'
                    }`}
                    style={
                      isCurrent
                        ? { backgroundColor: primaryColor, color: primaryTextColor }
                        : undefined
                    }
                  >
                    {cProj.appLogoUri ? (
                      <img
                        src={cProj.appLogoUri}
                        alt={cProj.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      cProj.name.slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                        {cProj.name}
                      </h3>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setProjectToDelete(cProj);
                        }}
                        title="Delete Project"
                        className="px-1.5 py-0.5 rounded-md bg-rose-500/10 hover:bg-rose-600 text-rose-600 hover:text-white text-[10px] font-bold flex items-center gap-1 transition flex-shrink-0"
                      >
                        <Trash2 size={11} />
                        <span>Delete</span>
                      </button>
                    </div>
                    <p className="text-[10px] text-neutral-400 truncate">{cProj.category}</p>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                  <span className="truncate">{variantCountLabel}</span>
                  {isCurrent ? (
                    <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      Active
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-1.5 py-0.5 rounded">
                      Switch
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Create New Project Primary Button + Quick Starters */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => openModalWithTemplate()}
              style={{ backgroundColor: primaryColor, color: primaryTextColor }}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-extrabold shadow-sm hover:opacity-95 flex items-center justify-center gap-1.5 transition"
            >
              <Plus size={15} />
              <span>Create New Project</span>
            </button>

            <div className="px-2 pt-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Quick Starter Templates
            </div>

            {[
              { title: 'StealthShield VPN', cat: 'VPN & Cybersecurity', icon: Shield },
              { title: 'Food Delivery App', cat: 'Food Delivery & POS', icon: Utensils },
              { title: 'Fitness & Gym Pro', cat: 'Health, Fitness & Gym', icon: Dumbbell },
              { title: 'Real Estate Hub', cat: 'Real Estate & PropTech', icon: Building2 },
            ].map((slot) => {
              const IconComponent = slot.icon;
              return (
                <div
                  key={slot.title}
                  onClick={() => openModalWithTemplate(slot.title, slot.cat)}
                  className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-2.5 flex items-center gap-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 flex items-center justify-center flex-shrink-0">
                    <IconComponent size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate">
                        {slot.title}
                      </span>
                      <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50">
                        + Use
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workspace Footer Info */}
        <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-[11px] text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Gemini AI Connected
            </span>
            <span className="font-mono text-[10px]">Expo SDK 52</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CENTER SECTION: REUSABLE TOP HEADER + DYNAMIC MIDDLE CONTENT           */}
      {/* ========================================================================= */}
      <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden bg-neutral-50/70 dark:bg-[#121214]">
        {/* Top Studio Bar with 4 Required Tabs & Global Actions */}
        <div className="h-16 px-6 border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-[#18181B]/90 backdrop-blur flex items-center justify-between gap-4 flex-shrink-0 z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 truncate min-w-0">
            <span>Projects</span>
            <ChevronRight size={14} className="flex-shrink-0" />
            <span className="text-neutral-900 dark:text-neutral-100 font-bold truncate">
              {projectName}
            </span>
            <ChevronRight size={14} className="flex-shrink-0" />
            <span className="font-mono text-neutral-600 dark:text-neutral-300 truncate">
              {activeScreenLabel} ({activeVariantLabel})
            </span>
          </div>

          {/* 4 Required Studio Navigation Tabs */}
          <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl border border-neutral-200 dark:border-neutral-700/60 flex-shrink-0">
            {[
              { id: 'screens' as const, label: 'Screens & Variants', icon: LayoutGrid },
              { id: 'theme' as const, label: 'Design System', icon: Palette },
              { id: 'branding' as const, label: 'App Branding', icon: AppWindow },
              { id: 'export' as const, label: 'Build APK & ZIP', icon: Download },
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeStudioTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectStudioTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: primaryColor,
                          color: primaryTextColor,
                        }
                      : undefined
                  }
                >
                  <IconComp size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Action Buttons (Light/Dark Mode, Skeleton, Export .ZIP) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {extraTopActions}

            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {onToggleSkeleton && (
              <button
                onClick={onToggleSkeleton}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition ${
                  isSkeletonActive
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                <Zap size={14} />
                <span>{isSkeletonActive ? 'Skeleton ON' : 'Skeleton'}</span>
              </button>
            )}

            {onExportZip && (
              <button
                onClick={onExportZip}
                disabled={isZipping}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:opacity-95 transition"
                style={{
                  backgroundColor: primaryColor,
                  color: primaryTextColor,
                }}
              >
                <Download size={14} />
                <span>{isZipping ? 'Building ZIP...' : 'Export .ZIP'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Middle Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">{middleContent}</div>
      </div>

      {/* ========================================================================= */}
      {/* 3. FAR RIGHT SIDEBAR: REUSABLE MOBILE SIMULATOR + SWATCHES                */}
      {/* ========================================================================= */}
      <div className="w-[440px] h-full flex flex-col flex-shrink-0 border-l border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161c] z-20">
        {/* Device Top Control Bar */}
        <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2 flex-shrink-0 bg-white dark:bg-neutral-900">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <Smartphone size={14} className="text-neutral-500" />
              <span className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                {activeScreenLabel}
              </span>
            </div>
          </div>

          {extraSimulatorHeaderControls}

          {/* Quick Variant Dropdown (Hidden if Single Variant Mode) */}
          {variantOptions.length > 1 ? (
            <select
              value={currentVariantId}
              onChange={(e) => onChangeVariant(e.target.value)}
              className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md text-[11px] font-bold text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
            >
              {variantOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold">
              Single Layout
            </span>
          )}

          {onReloadSimulator && (
            <button
              onClick={onReloadSimulator}
              className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
              title="Reload Screen"
            >
              <RotateCcw size={13} />
            </button>
          )}
        </div>

        {/* Mobile Viewport Stage */}
        <div className="flex-1 flex items-center justify-center p-3 overflow-hidden bg-neutral-100/50 dark:bg-[#0d0f14]">
          {/* Realistic iPhone 16 Pro Device Frame */}
          <div className="relative w-[378px] h-[760px] rounded-[50px] p-[6px] bg-[#1a1a1e] shadow-2xl ring-1 ring-white/10 flex flex-col items-center justify-center">
            <div
              className="w-[366px] h-[748px] rounded-[44px] overflow-hidden bg-white dark:bg-[#090D16] relative flex flex-col transform-gpu"
              style={{ transform: 'translateZ(0)' }}
            >
              {mobileContent}
            </div>
          </div>
        </div>

        {/* Device Bottom Quick Swatches */}
        <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-white dark:bg-neutral-900 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            {colorSwatches.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectColorSwatch && onSelectColorSwatch(p.id)}
                className={`w-5 h-5 rounded-full transition-transform ${
                  activeColorId === p.id
                    ? 'scale-125 ring-2 ring-neutral-900 dark:ring-white'
                    : 'opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: p.swatch }}
                title={p.name}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[140px]">
              {activeFontName}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: CONFIRM DELETE CUSTOM PROJECT                                      */}
      {/* ========================================================================= */}
      {projectToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setProjectToDelete(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white dark:bg-[#141720] border border-neutral-200 dark:border-neutral-800 p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-600 flex items-center justify-center flex-shrink-0">
                  <Trash2 size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                    Delete Custom Project?
                  </h3>
                  <p className="text-xs text-neutral-500">
                    This will remove <span className="font-bold text-neutral-800 dark:text-neutral-200">{projectToDelete.name}</span> from your sidebar.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700/80 text-xs space-y-1">
              <div className="font-bold text-neutral-900 dark:text-white">
                {projectToDelete.name}
              </div>
              <div className="font-mono text-[11px] text-neutral-500">
                {projectToDelete.packageName} • {projectToDelete.screens.length} Screens
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const targetId = projectToDelete.id;
                  const next = deleteCustomProject(targetId);
                  setCustomProjects(next);
                  setProjectToDelete(null);
                  if (activeProjectId === targetId && onSwitchProject) {
                    onSwitchProject('cloth_shop_admin');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-sm flex items-center gap-1.5 transition"
              >
                <Trash2 size={14} />
                <span>Yes, Delete Project</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CREATE NEW MOBILE APP PROJECT WIZARD (POLISHED & USER-FRIENDLY)    */}
      {/* ========================================================================= */}
      {addAppModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto"
          onClick={() => !isGeneratingProject && setAddAppModalOpen(false)}
        >
          <form
            onSubmit={handleCreateNewProjectSubmit}
            className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#141720] border border-neutral-200/90 dark:border-neutral-800 overflow-hidden shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Gradient Banner Header */}
            <div
              className="px-6 py-5 text-white flex items-center justify-between"
              style={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, #1E1B4B 100%)`,
              }}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-inner">
                  <Sparkles size={22} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold uppercase tracking-wider">
                      AppForge AI Architect
                    </span>
                    <span className="text-[11px] text-white/80 font-mono">Expo SDK 52</span>
                  </div>
                  <h3 className="text-base font-extrabold tracking-tight mt-0.5">
                    Create New Mobile App Project
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAddAppModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              {/* Quick 1-Click Starter Presets Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400">
                    Quick Fill Presets
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Click a preset or type your own below
                  </span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {[
                    {
                      label: '🛡 StealthShield VPN',
                      name: 'StealthShield VPN',
                      cat: 'VPN & Cybersecurity',
                    },
                    {
                      label: '🍔 QuickBite Delivery',
                      name: 'QuickBite Delivery',
                      cat: 'Food Delivery & POS',
                    },
                    {
                      label: '💳 NovaPay Wallet',
                      name: 'NovaPay Wallet',
                      cat: 'FinTech & Crypto Wallet',
                    },
                    {
                      label: '🏋️ PulseFit Gym Pro',
                      name: 'PulseFit Gym Pro',
                      cat: 'Health, Fitness & Gym',
                    },
                  ].map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setIsPackageManuallyEdited(false);
                        setNewProjName(preset.name);
                        setNewProjPackage(formatPackageSlug(preset.name));
                        setNewProjCategory(preset.cat);
                        handleGeminiAutofillDetails(preset.name, preset.cat);
                      }}
                      className="px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700/80 bg-neutral-50 dark:bg-neutral-800/80 hover:border-indigo-500 text-xs font-bold text-neutral-700 dark:text-neutral-200 whitespace-nowrap transition flex-shrink-0"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 1: Project Name & Industry Category (with + Custom Category option) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-neutral-800 dark:text-neutral-200 flex items-center justify-between">
                    <span>Project Name *</span>
                    {newProjName.trim() && (
                      <span className="text-[10px] font-bold text-emerald-600">✓ Valid</span>
                    )}
                  </label>
                  <input
                    type="text"
                    required
                    value={newProjName}
                    onChange={(e) => handleProjectNameChange(e.target.value)}
                    placeholder="e.g. StealthShield VPN"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/80 dark:bg-neutral-800/90 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                      Industry / Category *
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsAddingCustomCategory(!isAddingCustomCategory)}
                      className="text-[11px] font-extrabold flex items-center gap-1"
                      style={{ color: primaryColor }}
                    >
                      <Plus size={12} />
                      <span>{isAddingCustomCategory ? 'Select List' : 'Add Custom'}</span>
                    </button>
                  </div>

                  {isAddingCustomCategory ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={customCategoryInput}
                        onChange={(e) => setCustomCategoryInput(e.target.value)}
                        placeholder="Type custom category (e.g. Gaming VPN)..."
                        className="flex-1 px-3 py-2 rounded-xl border border-indigo-400 bg-white dark:bg-neutral-800 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomCategory}
                        style={{ backgroundColor: primaryColor }}
                        className="px-3 py-2 rounded-xl text-white text-xs font-extrabold"
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <select
                      value={newProjCategory}
                      onChange={(e) => setNewProjCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/80 dark:bg-neutral-800/90 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Row 2: Auto-Synced & Editable Android / iOS Package ID */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                    <span>Android / iOS Package ID *</span>
                    <span className="px-1.5 py-0.2 rounded bg-indigo-500/10 text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {isPackageManuallyEdited ? 'Custom Edited' : 'Auto-synced with Name'}
                    </span>
                  </label>
                  {isPackageManuallyEdited && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsPackageManuallyEdited(false);
                        setNewProjPackage(formatPackageSlug(newProjName));
                      }}
                      className="text-[10px] font-bold text-neutral-400 hover:text-neutral-600"
                    >
                      Reset to Auto
                    </button>
                  )}
                </div>
                <div className="relative flex items-center">
                  <Globe size={14} className="absolute left-3.5 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={newProjPackage}
                    onChange={(e) => {
                      setIsPackageManuallyEdited(true);
                      setNewProjPackage(e.target.value);
                    }}
                    placeholder="com.appforge.stealthshieldvpn"
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/80 dark:bg-neutral-800/90 text-xs font-mono font-bold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                  <Edit3 size={13} className="absolute right-3.5 text-neutral-400 pointer-events-none" />
                </div>
              </div>

              {/* Row 3: Upload UI Design Mockups (JPG, PNG, JPEG) for AI Vision To Build App */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                    <span>Upload UI Design / Mockup Images (JPG, PNG, JPEG)</span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[9px] font-extrabold uppercase">
                      AI Vision Ready
                    </span>
                  </label>
                  {uploadedDesignImages.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setUploadedDesignImages([])}
                      className="text-[10px] font-bold text-rose-500 hover:underline"
                    >
                      Clear All ({uploadedDesignImages.length})
                    </button>
                  )}
                </div>

                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleDesignFilesSelected(e.dataTransfer.files);
                  }}
                  className="cursor-pointer rounded-2xl border-2 border-dashed border-indigo-300 dark:border-indigo-800/70 bg-indigo-50/40 dark:bg-indigo-950/20 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/35 p-4 flex flex-col items-center justify-center text-center transition"
                >
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                    multiple
                    className="hidden"
                    onChange={(e) => handleDesignFilesSelected(e.target.files)}
                  />
                  <div className="flex items-center gap-2 text-xs font-extrabold" style={{ color: primaryColor }}>
                    <Plus size={15} />
                    <span>Click or Drag &amp; Drop UI Design Screenshots (.JPG, .PNG, .JPEG)</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Upload 1 to 6 Figma / mobile screen mockups (e.g., Obsidian Cyber Shield) — Gemini Vision will extract screens, colors &amp; components automatically
                  </p>
                </label>

                {uploadedDesignImages.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
                    {uploadedDesignImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 aspect-[9/16] bg-neutral-900"
                      >
                        <img
                          src={img.dataUrl}
                          alt={img.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-black/75 text-white text-[8px] font-bold">
                          Screen #{idx + 1}
                        </span>
                        <button
                          type="button"
                          title="Crop / Frame Screen"
                          onClick={() => setEditingCropIndex(idx)}
                          className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-indigo-600/90 text-white text-[8px] font-bold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition"
                        >
                          <Crop size={9} />
                          <span>Crop</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setUploadedDesignImages((prev) => prev.filter((_, i) => i !== idx))
                          }
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Row 4: Project Details + 1-Click Gemini AI Auto-Fill */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                    Project Details &amp; Screen Requirements *
                  </label>
                  <button
                    type="button"
                    disabled={isAutofillingDetails}
                    onClick={() => handleGeminiAutofillDetails()}
                    className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-[11px] font-extrabold flex items-center gap-1.5 transition"
                    style={{ color: primaryColor }}
                  >
                    <Wand2 size={12} className={isAutofillingDetails ? 'animate-spin' : ''} />
                    <span>
                      {isAutofillingDetails
                        ? 'Gemini Writing Specs...'
                        : '✨ Auto-Fill with Gemini AI'}
                    </span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  required
                  value={newProjDetails}
                  onChange={(e) => setNewProjDetails(e.target.value)}
                  placeholder="Click '✨ Auto-Fill with Gemini AI' or describe your app features, screens, and target workflow..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/80 dark:bg-neutral-800/90 text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none leading-relaxed"
                />
              </div>

              {/* Row 4: Screen Variant Architecture (Multi-Variant vs Single Screen — No Variants) */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                  Screen Variant Option (Choose Variant or Single) *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewProjVariantMode('two_variants')}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-start justify-between gap-2.5 ${
                      newProjVariantMode === 'two_variants'
                        ? 'border-2 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-800 opacity-75 hover:opacity-100'
                    }`}
                    style={
                      newProjVariantMode === 'two_variants'
                        ? { borderColor: primaryColor }
                        : undefined
                    }
                  >
                    <div className="flex items-start gap-2.5">
                      <Layers
                        size={17}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: primaryColor }}
                      />
                      <div>
                        <div className="text-xs font-extrabold text-neutral-900 dark:text-white">
                          Multiple Variants per Screen
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">
                          Generates V1 (Classic), V2 (Bento Grid) &amp; V3 (Glass)
                        </div>
                      </div>
                    </div>
                    {newProjVariantMode === 'two_variants' && (
                      <CheckCircle2 size={16} style={{ color: primaryColor }} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewProjVariantMode('single')}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-start justify-between gap-2.5 ${
                      newProjVariantMode === 'single'
                        ? 'border-2 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-800 opacity-75 hover:opacity-100'
                    }`}
                    style={
                      newProjVariantMode === 'single' ? { borderColor: primaryColor } : undefined
                    }
                  >
                    <div className="flex items-start gap-2.5">
                      <Smartphone
                        size={17}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: primaryColor }}
                      />
                      <div>
                        <div className="text-xs font-extrabold text-neutral-900 dark:text-white">
                          Single Screen Only (No Variants)
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">
                          Creates 1 clean layout per screen — no extra variants
                        </div>
                      </div>
                    </div>
                    {newProjVariantMode === 'single' && (
                      <CheckCircle2 size={16} style={{ color: primaryColor }} />
                    )}
                  </button>
                </div>
              </div>

              {/* Row 5: Multi-AI Model Engine Selector (Gemini, ChatGPT, Claude, DeepSeek) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                    Select AI Model Engine (Gemini, ChatGPT, Claude, DeepSeek) *
                  </label>
                  <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                    4 AI Models Ready
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    {
                      id: 'gemini_2_5_pro' as AIModelProviderType,
                      name: 'Google Gemini 2.5 Pro',
                      provider: 'Google AI Studio • Multimodal Vision',
                      badge: 'DEFAULT',
                      accent: '#4285F4',
                      iconText: 'G',
                    },
                    {
                      id: 'chatgpt_4o' as AIModelProviderType,
                      name: 'ChatGPT (OpenAI GPT-4o)',
                      provider: 'OpenAI Omni • UI & Product Flows',
                      badge: 'CHATGPT',
                      accent: '#10A37F',
                      iconText: 'AI',
                    },
                    {
                      id: 'claude_3_7_sonnet' as AIModelProviderType,
                      name: 'Claude 3.7 Sonnet',
                      provider: 'Anthropic • Clean Design & Code Architect',
                      badge: 'CLAUDE',
                      accent: '#D97757',
                      iconText: 'C',
                    },
                    {
                      id: 'deepseek_r1' as AIModelProviderType,
                      name: 'DeepSeek R1 Architect',
                      provider: 'DeepSeek • Full-Stack Logic & Reasoning',
                      badge: 'R1',
                      accent: '#6366F1',
                      iconText: 'DS',
                    },
                  ].map((model) => {
                    const isSelectedModel = selectedAiModel === model.id;
                    return (
                      <button
                        key={model.id}
                        type="button"
                        onClick={() => {
                          setSelectedAiModel(model.id);
                          setGooglePermissionGranted(true);
                        }}
                        className={`p-3 rounded-2xl border text-left transition flex items-center justify-between gap-2.5 ${
                          isSelectedModel
                            ? 'border-2 bg-indigo-50/40 dark:bg-indigo-950/25 shadow-xs'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                        }`}
                        style={isSelectedModel ? { borderColor: model.accent } : undefined}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0 shadow-xs"
                            style={{ backgroundColor: model.accent }}
                          >
                            {model.iconText}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-extrabold text-neutral-900 dark:text-white truncate">
                                {model.name}
                              </span>
                              <span
                                className="px-1.5 py-0.2 rounded text-[8px] font-black text-white uppercase"
                                style={{ backgroundColor: model.accent }}
                              >
                                {model.badge}
                              </span>
                            </div>
                            <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                              {model.provider}
                            </p>
                          </div>
                        </div>
                        {isSelectedModel && (
                          <CheckCircle2
                            size={16}
                            className="flex-shrink-0"
                            style={{ color: model.accent }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active AI Model Authorization Status Card */}
                <div
                  className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                    googlePermissionGranted
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-neutral-100 dark:bg-neutral-800/70 border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center flex-shrink-0 shadow-2xs font-black text-xs text-indigo-600">
                      <Sparkles size={17} style={{ color: primaryColor }} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-extrabold text-neutral-900 dark:text-white truncate">
                          {selectedAiModel === 'gemini_2_5_pro'
                            ? 'Google AI Studio & Gemini 2.5 Pro Permission'
                            : selectedAiModel === 'chatgpt_4o'
                            ? 'ChatGPT (OpenAI GPT-4o) Model Permission'
                            : selectedAiModel === 'claude_3_7_sonnet'
                            ? 'Anthropic Claude 3.7 Sonnet Permission'
                            : 'DeepSeek R1 Architect Permission'}
                        </span>
                        {googlePermissionGranted && (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-600 text-white text-[9px] font-extrabold uppercase">
                            Authorized
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                        {googlePermissionGranted
                          ? `riaz.developer.bd@gmail.com • ${
                              selectedAiModel === 'gemini_2_5_pro'
                                ? 'Gemini 2.5 Pro'
                                : selectedAiModel === 'chatgpt_4o'
                                ? 'ChatGPT GPT-4o'
                                : selectedAiModel === 'claude_3_7_sonnet'
                                ? 'Claude 3.7 Sonnet'
                                : 'DeepSeek R1'
                            } Engine Active`
                          : 'Authorize selected AI model to generate screens & enable project creation'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setGooglePermissionGranted(!googlePermissionGranted)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold flex-shrink-0 transition ${
                      googlePermissionGranted
                        ? 'bg-white dark:bg-neutral-900 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                        : 'bg-indigo-600 text-white shadow-xs'
                    }`}
                  >
                    {googlePermissionGranted ? 'Connected ✓' : 'Grant Permission'}
                  </button>
                </div>
              </div>

              {/* Row 6 (LAST SECTION): AI Screen Architecture & Flow Selector — Fetched after upper fields are filled */}
              {(() => {
                const isUpperDataReady =
                  newProjName.trim().length > 0 && newProjDetails.trim().length > 0;
                const modelLabel =
                  selectedAiModel === 'gemini_2_5_pro'
                    ? 'Gemini 2.5 Pro'
                    : selectedAiModel === 'chatgpt_4o'
                    ? 'ChatGPT GPT-4o'
                    : selectedAiModel === 'claude_3_7_sonnet'
                    ? 'Claude 3.7 Sonnet'
                    : 'DeepSeek R1';

                if (!isUpperDataReady) {
                  return (
                    <div className="p-4 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                          <Sparkles size={16} style={{ color: primaryColor }} />
                        </div>
                        <div>
                          <div className="text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                            AI Screen Architecture &amp; Flow Selector (Waiting for Project Info)
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-0.5">
                            Fill in <strong>Project Name</strong> and <strong>Project Details</strong> (or click <em>Auto-Fill with Gemini AI</em>) above so {modelLabel} can fetch your project&apos;s tailored screen flows.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleGeminiAutofillDetails()}
                        style={{ backgroundColor: primaryColor }}
                        className="px-3 py-1.5 rounded-xl text-[11px] font-extrabold text-white flex-shrink-0 shadow-xs hover:opacity-95 transition"
                      >
                        ✨ Auto-Fill &amp; Fetch Screens
                      </button>
                    </div>
                  );
                }

                const domainAnalysis = analyzeProjectScreenRequirements(
                  newProjName,
                  newProjCategory,
                  newProjDetails,
                  selectedFlowModules
                );
                const activeModulesList =
                  aiDynamicAnalysis && Array.isArray(aiDynamicAnalysis.modules)
                    ? aiDynamicAnalysis.modules
                    : domainAnalysis.modules;
                const selectedModulesCount = activeModulesList
                  .filter((m: any) => selectedFlowModules.includes(m.id))
                  .reduce((sum: number, m: any) => sum + (m.screenCount || 3), 0);
                const liveAnalysis = {
                  domainTitle: aiDynamicAnalysis?.domainTitle || domainAnalysis.domainTitle,
                  modules: activeModulesList,
                  totalScreens: selectedModulesCount,
                  totalVariants: selectedModulesCount * 3,
                };
                const isSingleMode = newProjVariantMode === 'single';
                const allSelected = selectedFlowModules.length === liveAnalysis.modules.length;
                return (
                  <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/25 border border-indigo-200/80 dark:border-indigo-800/60 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Sparkles
                          size={14}
                          className={isFetchingAiArchitecture ? 'animate-spin' : ''}
                          style={{ color: primaryColor }}
                        />
                        <span className="text-xs font-extrabold text-neutral-900 dark:text-white">
                          {isFetchingAiArchitecture
                            ? `${modelLabel} Analyzing "${newProjName}" (${newProjCategory}) Architecture...`
                            : `${modelLabel} Bespoke Screen Architecture: ${liveAnalysis.domainTitle}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            fetchLiveAiArchitecture(newProjName, newProjCategory, newProjDetails)
                          }
                          disabled={isFetchingAiArchitecture}
                          className="px-2 py-0.5 rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 hover:bg-neutral-100 transition"
                        >
                          {isFetchingAiArchitecture ? 'Fetching...' : '↻ Re-Analyze AI Screens'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedFlowModules(
                              allSelected
                                ? [liveAnalysis.modules[0]?.id || 'Onboarding & Auth']
                                : liveAnalysis.modules.map((m: any) => m.id)
                            )
                          }
                          className="px-2 py-0.5 rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-[10px] font-extrabold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 transition"
                        >
                          {allSelected ? 'Unselect Optional Flows' : 'Select All Flows'}
                        </button>
                        <span
                          className="px-2 py-0.5 rounded-md text-[10px] font-extrabold text-white"
                          style={{ backgroundColor: primaryColor }}
                        >
                          {isSingleMode
                            ? `${liveAnalysis.totalScreens} Selected Screens • Single Layout`
                            : `${liveAnalysis.totalScreens} Selected Screens • ${liveAnalysis.totalVariants} Variants (V1/V2/V3)`}
                        </span>
                      </div>
                    </div>

                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                      All flows are selected by default. Uncheck any flow (e.g., Onboarding, Auth, Payment, Tracking) if your project does not need those screens:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {liveAnalysis.modules.map((mod) => {
                        const isChecked = selectedFlowModules.includes(mod.id);
                        return (
                          <button
                            key={mod.id}
                            type="button"
                            onClick={() => toggleFlowModule(mod.id)}
                            className={`p-2.5 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer ${
                              isChecked
                                ? 'bg-white dark:bg-neutral-900 border-2 shadow-2xs'
                                : 'bg-white/50 dark:bg-neutral-900/40 border-neutral-200/70 dark:border-neutral-800 opacity-55 hover:opacity-85'
                            }`}
                            style={isChecked ? { borderColor: primaryColor } : undefined}
                          >
                            <div
                              className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center flex-shrink-0 border transition ${
                                isChecked
                                  ? 'text-white border-transparent'
                                  : 'border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800'
                              }`}
                              style={isChecked ? { backgroundColor: primaryColor } : undefined}
                            >
                              {isChecked && <Check size={11} strokeWidth={3} />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[10px] font-extrabold text-neutral-900 dark:text-white truncate">
                                {mod.name}
                              </div>
                              <div className="text-[9px] text-neutral-500 line-clamp-2 mt-0.5 leading-snug">
                                {mod.description}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Sticky Modal Footer */}
            <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900/90 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
              <div className="text-[11px] font-semibold text-neutral-500">
                {canCreateProject ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} /> All required fields ready
                  </span>
                ) : (
                  <span>Fill Project Name, Details &amp; Permission to enable</span>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  disabled={isGeneratingProject}
                  onClick={() => setAddAppModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!canCreateProject}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-md transition flex items-center gap-2 ${
                    canCreateProject
                      ? 'hover:opacity-95 cursor-pointer'
                      : 'opacity-40 cursor-not-allowed'
                  }`}
                  style={{ backgroundColor: primaryColor }}
                >
                  <Sparkles size={14} />
                  <span>
                    {isGeneratingProject
                      ? 'Generating App Screens...'
                      : 'Create Project & Add to Sidebar'}
                  </span>
                </button>
              </div>
            </div>
          </form>

          {/* Interactive Image Cropper Modal for New Uploads or Re-Cropping Existing Thumbnails */}
          {(pendingCropQueue.length > 0 || editingCropIndex !== null) && (
            <DesignImageCropperModal
              imageName={
                editingCropIndex !== null
                  ? uploadedDesignImages[editingCropIndex]?.name || 'Screen Mockup'
                  : pendingCropQueue[0].name
              }
              imageDataUrl={
                editingCropIndex !== null
                  ? uploadedDesignImages[editingCropIndex]?.originalDataUrl ||
                    uploadedDesignImages[editingCropIndex]?.dataUrl ||
                    ''
                  : pendingCropQueue[0].dataUrl
              }
              primaryColor={primaryColor}
              queueCount={
                editingCropIndex !== null ? 0 : Math.max(0, pendingCropQueue.length - 1)
              }
              onApplyCrop={(croppedUrl) => {
                if (editingCropIndex !== null) {
                  setUploadedDesignImages((prev) =>
                    prev.map((item, idx) =>
                      idx === editingCropIndex ? { ...item, dataUrl: croppedUrl } : item
                    )
                  );
                  setEditingCropIndex(null);
                } else {
                  const current = pendingCropQueue[0];
                  setUploadedDesignImages((prev) =>
                    [
                      ...prev,
                      {
                        name: current.name,
                        dataUrl: croppedUrl,
                        originalDataUrl: current.dataUrl,
                      },
                    ].slice(0, 6)
                  );
                  setPendingCropQueue((prev) => prev.slice(1));
                }
              }}
              onSkipCrop={(originalUrl) => {
                if (editingCropIndex !== null) {
                  setUploadedDesignImages((prev) =>
                    prev.map((item, idx) =>
                      idx === editingCropIndex ? { ...item, dataUrl: originalUrl } : item
                    )
                  );
                  setEditingCropIndex(null);
                } else {
                  const current = pendingCropQueue[0];
                  setUploadedDesignImages((prev) =>
                    [
                      ...prev,
                      {
                        name: current.name,
                        dataUrl: originalUrl,
                        originalDataUrl: current.dataUrl,
                      },
                    ].slice(0, 6)
                  );
                  setPendingCropQueue((prev) => prev.slice(1));
                }
              }}
              onCancel={() => {
                if (editingCropIndex !== null) {
                  setEditingCropIndex(null);
                } else {
                  setPendingCropQueue((prev) => prev.slice(1));
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default StudioDashboardShell;
