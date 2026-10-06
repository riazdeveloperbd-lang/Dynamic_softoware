import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Layers,
  SlidersHorizontal,
  FolderTree,
  LayoutGrid,
  Search,
  X,
  Eye,
  Check,
  CheckCircle2,
  ImagePlus,
  Trash2,
  Smartphone,
  Download,
  FolderGit2,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  TrendingUp,
  Star,
  MapPin,
  Clock,
  ShoppingBag,
  Wand2,
  Heart,
  Flame,
  Navigation,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Award,
} from 'lucide-react';
import StudioDashboardShell, { StudioTab } from './StudioDashboardShell';
import VisualNavigationLinkBuilder, {
  LinkableScreenItem,
  buildDefaultNavigationConnections,
} from './VisualNavigationLinkBuilder';
import {
  CustomProjectDefinition,
  CustomProjectScreenSpec,
  CustomScreenRoleType,
  ScreenNavigationConnection,
  updateCustomProject,
  deleteCustomProject,
} from '../utils/customProjectsStore';
import {
  analyzeProjectScreenRequirements,
  buildCompleteAppScreensSuite,
} from '../utils/fullAppScreenArchitect';

export interface CustomProjectAppProps {
  project: CustomProjectDefinition;
  onSwitchProject?: (projectId: string) => void;
  onProjectUpdated?: (project: CustomProjectDefinition) => void;
}

const COLOR_PRESETS = [
  { id: 'tangerine', name: 'Crave Tangerine', primary: '#EA580C', swatch: '#EA580C' },
  { id: 'emerald', name: 'Emerald Athlete', primary: '#10B981', swatch: '#10B981' },
  { id: 'indigo', name: 'Royal Indigo', primary: '#4338CA', swatch: '#4338CA' },
  { id: 'sapphire', name: 'Cyber Sapphire', primary: '#0284C7', swatch: '#0284C7' },
  { id: 'crimson', name: 'Crimson Luxe', primary: '#E11D48', swatch: '#E11D48' },
  { id: 'amber', name: 'Amber Gold', primary: '#D97706', swatch: '#D97706' },
  { id: 'obsidian', name: 'Atelier Obsidian', primary: '#18181B', swatch: '#18181B' },
];

const FONT_PRESETS = [
  { id: 'jakarta', name: 'Plus Jakarta Sans', category: 'Modern Geometric Sans' },
  { id: 'inter', name: 'Inter', category: 'Clean UI Sans' },
  { id: 'playfair', name: 'Playfair Display', category: 'Editorial Luxury Serif' },
  { id: 'dm', name: 'DM Sans', category: 'Minimalist Sans' },
  { id: 'space', name: 'Space Grotesk', category: 'Tech & Logistics Sans' },
  { id: 'outfit', name: 'Outfit', category: 'Contemporary Retail' },
];

const DEFAULT_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80',
];

export const CustomProjectApp: React.FC<CustomProjectAppProps> = ({
  project,
  onSwitchProject,
  onProjectUpdated,
}) => {
  const [activeStudioTab, setActiveStudioTab] = useState<StudioTab>('screens');
  const [screensViewMode, setScreensViewMode] = useState<'grid' | 'hierarchy'>('grid');
  const [screenSearchQuery, setScreenSearchQuery] = useState('');
  const [activeModuleFilter, setActiveModuleFilter] = useState<string>('All');

  // If project has fewer than 15 screens, synthesize the full 20-screen suite immediately
  const fullGeneratedFallback = buildCompleteAppScreensSuite(
    project.name,
    project.category,
    project.details,
    project.designImages || [],
    project.selectedModules
  );

  const screens: CustomProjectScreenSpec[] =
    project.screens && project.screens.length > 0
      ? project.screens
      : fullGeneratedFallback.screens;

  const projectAnalysis = analyzeProjectScreenRequirements(
    project.name,
    project.category,
    project.details
  );

  const [currentScreenId, setCurrentScreenId] = useState<string>(
    screens[4]?.id || screens[0]?.id || 'HomeDiscoveryHub'
  );

  // Track variant per screen ('v1', 'v2', 'v3')
  const [variantsMap, setVariantsMap] = useState<Record<string, 'v1' | 'v2' | 'v3'>>(() => {
    const map: Record<string, 'v1' | 'v2' | 'v3'> = {};
    screens.forEach((s) => (map[s.id] = 'v1'));
    return map;
  });

  useEffect(() => {
    if (screens.length > 0 && !screens.some((s) => s.id === currentScreenId)) {
      const homeScr = screens.find((s) => s.screenType === 'discover') || screens[0];
      setCurrentScreenId(homeScr.id);
    }
  }, [project.id, screens, currentScreenId]);

  const isFoodProject =
    project.category.toLowerCase().includes('food') ||
    project.name.toLowerCase().includes('food') ||
    project.name.toLowerCase().includes('bite') ||
    project.name.toLowerCase().includes('delivery');

  const isFitnessProject =
    project.category.toLowerCase().includes('fitness') ||
    project.category.toLowerCase().includes('gym') ||
    project.name.toLowerCase().includes('fitness') ||
    project.name.toLowerCase().includes('gym') ||
    project.name.toLowerCase().includes('pulse');

  const [selectedColorPreset, setSelectedColorPreset] = useState(() =>
    isFitnessProject ? 'emerald' : isFoodProject ? 'tangerine' : 'indigo'
  );
  const [selectedFontPreset, setSelectedFontPreset] = useState('jakarta');
  const [isDark, setIsDark] = useState(false);
  const [isSkeletonActive, setIsSkeletonActive] = useState(false);

  // Shared Interactive Features State (Same features across V1, V2, and V3!)
  const [activeFilterPill, setActiveFilterPill] = useState<number>(0);
  const [simSearchInput, setSimSearchInput] = useState('');
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [authEmailInput, setAuthEmailInput] = useState('alex.rivera@appforge.io');
  const [authOtpDigits, setAuthOtpDigits] = useState(['4', '8', '2', '9', '1', '6']);
  const [selectedDetailOption, setSelectedDetailOption] = useState<number>(0);
  const [chatMessageInput, setChatMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string }>>([
    {
      sender: 'agent',
      text: 'Hi Alex! Welcome to 24/7 VIP Concierge. How can I help with your account or active session today?',
    },
  ]);

  // Cart / Checkout Screen interactive state
  const [itemQuantities, setItemQuantities] = useState<Record<number, number>>({
    0: 1,
    1: 1,
    2: 1,
  });
  const [promoCodeInput, setPromoCodeInput] = useState('VIP50');
  const [promoApplied, setPromoApplied] = useState(true);
  const [selectedTipPct, setSelectedTipPct] = useState<number>(15);

  // Tracker Screen interactive state
  const [activeTrackStage, setActiveTrackStage] = useState<number>(2);
  const [liveTelemetryTick, setLiveTelemetryTick] = useState<number>(0);

  // Profile Screen interactive state
  const [profileToggles, setProfileToggles] = useState({
    pushAlerts: true,
    biometricLock: true,
    autoSync: true,
    vipPriority: true,
  });

  // AI Upgrade / Regenerate Modal State
  const [aiUpgradeModalOpen, setAiUpgradeModalOpen] = useState(false);
  const [aiUpgradePrompt, setAiUpgradePrompt] = useState(project.details || '');
  const [isRegeneratingAi, setIsRegeneratingAi] = useState(false);

  // AI Architecture & Layout Optimizer State
  const [aiOptimizerModalOpen, setAiOptimizerModalOpen] = useState(false);
  const [isAnalyzingOptimization, setIsAnalyzingOptimization] = useState(false);
  const [aiOptimizationReport, setAiOptimizationReport] = useState<any | null>(null);
  const [appliedOptimizationIds, setAppliedOptimizationIds] = useState<string[]>([]);
  const [suggestedScreenAdded, setSuggestedScreenAdded] = useState(false);

  // Screen & Item Image Editor Modal State
  const [editingScreenSpec, setEditingScreenSpec] = useState<CustomProjectScreenSpec | null>(null);

  const [appBranding, setAppBranding] = useState({
    appName: project.name,
    packageName: project.packageName,
    appLogoUri: project.appLogoUri || '',
  });

  useEffect(() => {
    setAppBranding({
      appName: project.name,
      packageName: project.packageName,
      appLogoUri: project.appLogoUri || '',
    });
    setAiUpgradePrompt(project.details || '');
  }, [project.id, project.name, project.packageName, project.appLogoUri, project.details]);

  // Persist fallback screens into localStorage only if project had 0 screens
  useEffect(() => {
    if (!project.screens || project.screens.length === 0) {
      const upgradedProject: CustomProjectDefinition = {
        ...project,
        primaryColor: fullGeneratedFallback.primaryColor || project.primaryColor,
        screens: fullGeneratedFallback.screens,
      };
      updateCustomProject(upgradedProject);
      if (onProjectUpdated) onProjectUpdated(upgradedProject);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id]);

  const [apkBuildState, setApkBuildState] = useState<'idle' | 'building' | 'ready'>('idle');
  const [apkProgressPct, setApkProgressPct] = useState(0);
  const [apkDownloadUrl, setApkDownloadUrl] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [simToast, setSimToast] = useState<string | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleDeleteCurrentProject = () => {
    deleteCustomProject(project.id);
    setConfirmDeleteOpen(false);
    if (onSwitchProject) {
      onSwitchProject('cloth_shop_admin');
    }
  };

  const triggerSimToast = (msg: string) => {
    setSimToast(msg);
    setTimeout(() => setSimToast(null), 2200);
  };

  const handleToggleVariantMode = () => {
    const nextMode = project.variantMode === 'single' ? 'two_variants' : 'single';
    const updated: CustomProjectDefinition = {
      ...project,
      variantMode: nextMode,
    };
    updateCustomProject(updated);
    if (onProjectUpdated) onProjectUpdated(updated);
    triggerSimToast(
      nextMode === 'two_variants'
        ? 'Multi-Variant Mode (V1, V2, V3) Unlocked!'
        : 'Switched to Single Variant Mode'
    );
  };

  const handleRegenerateWithAi = async (customPrompt?: string, silent?: boolean) => {
    if (!silent) setIsRegeneratingAi(true);
    const targetDetails = (customPrompt ?? aiUpgradePrompt).trim() || project.details;
    const localSuite = buildCompleteAppScreensSuite(
      appBranding.appName,
      project.category,
      targetDetails,
      project.designImages || []
    );

    try {
      const res = await fetch('/api/projects/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: appBranding.appName,
          projectDetails: targetDetails,
          variantMode: project.variantMode,
          aiModelProvider: project.aiModelProvider || 'gemini_2_5_pro',
          category: project.category,
          designImages: project.designImages || [],
        }),
      });
      const data = await res.json();
      const apiScreens: CustomProjectScreenSpec[] =
        Array.isArray(data?.spec?.screens) && data.spec.screens.length > 0
          ? data.spec.screens
          : localSuite.screens;

      const updatedProject: CustomProjectDefinition = {
        ...project,
        details: targetDetails,
        variantMode: project.variantMode,
        primaryColor: data?.spec?.primaryColor || localSuite.primaryColor || project.primaryColor,
        screens: apiScreens,
      };
      updateCustomProject(updatedProject);
      if (onProjectUpdated) onProjectUpdated(updatedProject);
      const homeScr = apiScreens.find((s) => s.screenType === 'discover') || apiScreens[0];
      if (homeScr) setCurrentScreenId(homeScr.id);
      if (!silent) {
        setAiUpgradeModalOpen(false);
        triggerSimToast(
          project.variantMode === 'single'
            ? `✨ AI Generated All ${apiScreens.length} Required Screens (Single Layout)!`
            : `✨ AI Generated All ${apiScreens.length} Required Screens (${apiScreens.length * 3} Variants)!`
        );
      }
    } catch {
      const updatedProject: CustomProjectDefinition = {
        ...project,
        details: targetDetails,
        variantMode: project.variantMode,
        primaryColor: localSuite.primaryColor,
        screens: localSuite.screens,
      };
      updateCustomProject(updatedProject);
      if (onProjectUpdated) onProjectUpdated(updatedProject);
      if (!silent) {
        setAiUpgradeModalOpen(false);
        triggerSimToast(
          `✨ AI Generated All ${localSuite.screens.length} Screens (${localSuite.screens.length * 3} Variants)!`
        );
      }
    } finally {
      if (!silent) setIsRegeneratingAi(false);
    }
  };

  const handleAddNewCustomScreen = () => {
    const nextNum = screens.length + 1;
    const newScr: CustomProjectScreenSpec = {
      id: `CustomScreen_${Date.now().toString(36)}`,
      label: `${String(nextNum).padStart(2, '0')}. Custom Feature Screen`,
      category: `${project.category.toUpperCase()} • MODULE`,
      moduleGroup: 'Discovery & Catalog',
      description: `Custom interactive screen for ${appBranding.appName} with V1, V2, and V3 layouts.`,
      v1Name: 'V1: Classic Editorial Stack',
      v2Name: 'V2: 2-Col Bento Matrix',
      v3Name: 'V3: Immersive Glass HUD',
      screenType: 'catalog',
      heroBannerTitle: `${appBranding.appName} Custom Feature`,
      heroBannerSubtitle: 'Click Edit Screen to customize photos, cards, and layout role',
      heroBannerBadge: 'NEW SCREEN',
      heroBannerImage: DEFAULT_FALLBACK_IMAGES[nextNum % DEFAULT_FALLBACK_IMAGES.length],
      filterPills: ['🔥 All Items', '⚡ Featured', '⭐ Top Rated'],
      heroMetricLabel: 'LIVE STATUS',
      heroMetricValue: '100% Active',
      heroMetricDelta: '3 Variants Ready',
      items: screens[0]?.items || [],
    };
    const nextScreens = [...screens, newScr];
    const updated: CustomProjectDefinition = {
      ...project,
      screens: nextScreens,
    };
    updateCustomProject(updated);
    if (onProjectUpdated) onProjectUpdated(updated);
    setCurrentScreenId(newScr.id);
    setEditingScreenSpec(newScr);
  };

  const handleSaveEditedScreenSpec = (nextScreen: CustomProjectScreenSpec) => {
    const nextScreens = screens.map((s) => (s.id === nextScreen.id ? nextScreen : s));
    const updated: CustomProjectDefinition = {
      ...project,
      screens: nextScreens,
    };
    updateCustomProject(updated);
    if (onProjectUpdated) onProjectUpdated(updated);
    setEditingScreenSpec(null);
    triggerSimToast(`Saved ${nextScreen.label} images & items!`);
  };

  const handleTriggerAiLayoutOptimization = async () => {
    setAiOptimizerModalOpen(true);
    setIsAnalyzingOptimization(true);
    setSuggestedScreenAdded(false);

    try {
      const res = await fetch('/api/projects/optimize-layouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: appBranding.appName,
          category: project.category,
          projectDetails: project.details,
          activeScreenId: activeScreenObj.id,
          activeScreenType: resolvedScreenType,
          aiModelProvider: project.aiModelProvider || 'gemini_2_5_pro',
          screens: screens.map((s) => ({
            id: s.id,
            label: s.label,
            screenType: s.screenType || 'discover',
            moduleGroup: s.moduleGroup || project.category,
            v1Name: s.v1Name,
            v2Name: s.v2Name,
            v3Name: s.v3Name,
            heroBannerTitle: s.heroBannerTitle,
            heroBannerSubtitle: s.heroBannerSubtitle,
            filterPills: s.filterPills,
            heroMetricLabel: s.heroMetricLabel,
            heroMetricValue: s.heroMetricValue,
          })),
        }),
      });
      const text = await res.text();
      if (res.ok && text && !text.trim().startsWith('<')) {
        const parsed = JSON.parse(text);
        if (parsed?.optimization) {
          setAiOptimizationReport(parsed.optimization);
          setIsAnalyzingOptimization(false);
          return;
        }
      }
    } catch {
      // Fall through to client-side domain heuristic if offline
    }

    // Client-side domain & screenType fallback
    const focusList = [
      activeScreenObj,
      ...screens.filter((s) => s.id !== activeScreenObj.id).slice(0, 5),
    ];
    const localRecs = focusList.map((s, idx) => {
      const sType = String(s.screenType || 'discover').toLowerCase();
      const recVar: 'v1' | 'v2' | 'v3' = ['tracker', 'analytics', 'payment', 'auth'].includes(sType)
        ? 'v3'
        : ['catalog', 'search', 'discover', 'wishlist'].includes(sType)
        ? 'v2'
        : 'v1';
      const cleanTitle = s.label.replace(/^\d+\.\s*/, '');
      return {
        screenId: s.id,
        screenLabel: s.label,
        screenType: sType,
        recommendedVariant: recVar,
        layoutPatternName:
          recVar === 'v3'
            ? 'V3 Dark Glass Real-Time Telemetry HUD'
            : recVar === 'v2'
            ? 'V2 High-Density 2-Column Bento Matrix'
            : 'V1 Above-the-Fold Conversion Stack',
        uxRationale: `For ${project.category}, this "${sType.toUpperCase()}" screen achieves higher mobile engagement using ${
          recVar === 'v3'
            ? 'an immersive Glass HUD with live telemetry metrics pinned above the fold'
            : recVar === 'v2'
            ? 'a 2-column Bento grid that doubles visible cards per viewport'
            : 'a focused editorial hero stack with sticky primary CTA'
        }.`,
        expectedConversionLift: idx === 0 ? '+32% Task Completion' : '+26% UX Engagement',
        improvedHeroTitle: `${appBranding.appName} • ${cleanTitle} Pro`,
        improvedHeroSubtitle: `Optimized ${project.category} workflow with 1-tap actions & live status`,
        improvedHeroBadge: `AI OPTIMIZED • ${sType.toUpperCase()}`,
        improvedFilterPills: [
          `⚡ Priority ${project.category.split(' ')[0]}`,
          '🔥 Top Rated',
          '✨ AI Curated',
          '📊 Live Telemetry',
        ],
        improvedMetricLabel: `${sType.toUpperCase()} PERFORMANCE`,
        improvedMetricValue: '99.4% Optimal',
        improvedMetricDelta: '+28.4% Faster Flow',
        improvedV1Name: `V1: ${cleanTitle} Conversion Stack`,
        improvedV2Name: `V2: ${cleanTitle} 2-Col Bento Matrix`,
        improvedV3Name: `V3: ${cleanTitle} Live Glass HUD`,
      };
    });

    setAiOptimizationReport({
      overallScore: 94,
      architectureVerdict: `Analyzed ${screens.length} screens in "${appBranding.appName}" (${project.category}). Optimizing active screen "${activeScreenObj.label}" (${resolvedScreenType.toUpperCase()}) and core flow layouts improves thumb-zone reachability and conversion speed.`,
      categoryBestPractices: [
        `Pin live ${project.category} KPI telemetry in the top 25% viewport above the scroll fold`,
        `Use 2-Column Bento grids (V2) for ${project.category} discovery/catalog and Glass HUD (V3) for tracking & analytics`,
        `Provide 4 domain-specific quick-filter pills below the hero banner for 1-handed navigation`,
      ],
      recommendations: localRecs,
      suggestedNewScreen: {
        id: `AiSmartHub_${Date.now().toString(36).slice(-4)}`,
        label: `${String(screens.length + 1).padStart(2, '0')}. ${appBranding.appName} Smart Automation Hub`,
        moduleGroup: activeScreenObj.moduleGroup || project.category,
        screenType: 'analytics',
        description: `Dedicated ${project.category} automation rules, predictive insights, and live diagnostics screen.`,
        heroBannerTitle: `${appBranding.appName} • Smart ${project.category} Hub`,
        heroBannerSubtitle: `Automated triggers, predictive insights & 1-tap controls for ${appBranding.appName}`,
        heroBannerBadge: 'AI ARCHITECT RECOMMENDED',
        filterPills: ['⚡ Auto-Rules', '📈 Live Insights', '🔔 Smart Alerts', '🛡 Diagnostics'],
        heroMetricLabel: 'AUTOMATION EFFICIENCY',
        heroMetricValue: '98.9% Active',
        heroMetricDelta: '+34% Time Saved',
      },
    });
    setIsAnalyzingOptimization(false);
  };

  const handleApplySingleScreenOptimization = (rec: any) => {
    const nextScreens = screens.map((s) => {
      if (s.id !== rec.screenId) return s;
      return {
        ...s,
        heroBannerTitle: rec.improvedHeroTitle || s.heroBannerTitle,
        heroBannerSubtitle: rec.improvedHeroSubtitle || s.heroBannerSubtitle,
        heroBannerBadge: rec.improvedHeroBadge || s.heroBannerBadge,
        filterPills:
          Array.isArray(rec.improvedFilterPills) && rec.improvedFilterPills.length > 0
            ? rec.improvedFilterPills
            : s.filterPills,
        heroMetricLabel: rec.improvedMetricLabel || s.heroMetricLabel,
        heroMetricValue: rec.improvedMetricValue || s.heroMetricValue,
        heroMetricDelta: rec.improvedMetricDelta || s.heroMetricDelta,
        v1Name: rec.improvedV1Name || s.v1Name,
        v2Name: rec.improvedV2Name || s.v2Name,
        v3Name: rec.improvedV3Name || s.v3Name,
      };
    });

    const targetVar: 'v1' | 'v2' | 'v3' =
      !isSingleVariantMode && ['v1', 'v2', 'v3'].includes(rec.recommendedVariant)
        ? rec.recommendedVariant
        : 'v1';

    setVariantsMap((prev) => ({
      ...prev,
      [rec.screenId]: targetVar,
    }));
    setCurrentScreenId(rec.screenId);
    setAppliedOptimizationIds((prev) =>
      prev.includes(rec.screenId) ? prev : [...prev, rec.screenId]
    );

    const updated: CustomProjectDefinition = {
      ...project,
      screens: nextScreens,
    };
    updateCustomProject(updated);
    if (onProjectUpdated) onProjectUpdated(updated);
    triggerSimToast(
      `✨ Applied AI Layout (${targetVar.toUpperCase()}) to ${rec.screenLabel}!`
    );
  };

  const handleApplyAllScreenOptimizations = () => {
    if (!aiOptimizationReport || !Array.isArray(aiOptimizationReport.recommendations)) return;
    const recMap = new Map<string, any>();
    aiOptimizationReport.recommendations.forEach((r: any) => {
      if (r?.screenId) recMap.set(r.screenId, r);
    });

    const nextScreens = screens.map((s) => {
      const rec = recMap.get(s.id);
      if (!rec) return s;
      return {
        ...s,
        heroBannerTitle: rec.improvedHeroTitle || s.heroBannerTitle,
        heroBannerSubtitle: rec.improvedHeroSubtitle || s.heroBannerSubtitle,
        heroBannerBadge: rec.improvedHeroBadge || s.heroBannerBadge,
        filterPills:
          Array.isArray(rec.improvedFilterPills) && rec.improvedFilterPills.length > 0
            ? rec.improvedFilterPills
            : s.filterPills,
        heroMetricLabel: rec.improvedMetricLabel || s.heroMetricLabel,
        heroMetricValue: rec.improvedMetricValue || s.heroMetricValue,
        heroMetricDelta: rec.improvedMetricDelta || s.heroMetricDelta,
        v1Name: rec.improvedV1Name || s.v1Name,
        v2Name: rec.improvedV2Name || s.v2Name,
        v3Name: rec.improvedV3Name || s.v3Name,
      };
    });

    if (!isSingleVariantMode) {
      const nextVarMap = { ...variantsMap };
      aiOptimizationReport.recommendations.forEach((r: any) => {
        if (r?.screenId && ['v1', 'v2', 'v3'].includes(r.recommendedVariant)) {
          nextVarMap[r.screenId] = r.recommendedVariant;
        }
      });
      setVariantsMap(nextVarMap);
    }

    setAppliedOptimizationIds(
      aiOptimizationReport.recommendations.map((r: any) => r.screenId)
    );

    const updated: CustomProjectDefinition = {
      ...project,
      screens: nextScreens,
    };
    updateCustomProject(updated);
    if (onProjectUpdated) onProjectUpdated(updated);
    triggerSimToast(
      `✨ Applied all ${aiOptimizationReport.recommendations.length} AI Layout Optimizations!`
    );
  };

  const handleAddAiSuggestedScreen = () => {
    const sug = aiOptimizationReport?.suggestedNewScreen;
    if (!sug || suggestedScreenAdded) return;
    const nextNum = screens.length + 1;
    const cleanTitle = String(sug.label || 'AI Smart Screen').replace(/^\d+\.\s*/, '');
    const newScreen: CustomProjectScreenSpec = {
      id: sug.id || `AiOptimizedScreen_${Date.now().toString(36)}`,
      label: `${String(nextNum).padStart(2, '0')}. ${cleanTitle}`,
      category: `${project.category.toUpperCase()} • AI RECOMMENDED`,
      moduleGroup: sug.moduleGroup || activeScreenObj.moduleGroup || project.category,
      description:
        sug.description ||
        `AI-recommended ${project.category} screen for ${appBranding.appName}.`,
      v1Name: `V1: ${cleanTitle} Conversion Stack`,
      v2Name: `V2: ${cleanTitle} 2-Col Bento Matrix`,
      v3Name: `V3: ${cleanTitle} Live Glass HUD`,
      screenType: (sug.screenType as CustomScreenRoleType) || 'analytics',
      heroBannerTitle: sug.heroBannerTitle || `${appBranding.appName} • ${cleanTitle}`,
      heroBannerSubtitle: sug.heroBannerSubtitle || project.details,
      heroBannerBadge: sug.heroBannerBadge || 'AI RECOMMENDED',
      heroBannerImage:
        activeScreenObj.heroBannerImage ||
        DEFAULT_FALLBACK_IMAGES[nextNum % DEFAULT_FALLBACK_IMAGES.length],
      filterPills:
        Array.isArray(sug.filterPills) && sug.filterPills.length > 0
          ? sug.filterPills
          : ['⚡ Smart Rules', '📈 Live Insights', '🔥 Priority', '🛡 Verified'],
      heroMetricLabel: sug.heroMetricLabel || 'OPTIMIZATION SCORE',
      heroMetricValue: sug.heroMetricValue || '99.2% Active',
      heroMetricDelta: sug.heroMetricDelta || '+34% Efficiency Lift',
      items: activeScreenObj.items || screens[0]?.items || [],
    };

    const nextScreens = [...screens, newScreen];
    const updated: CustomProjectDefinition = {
      ...project,
      screens: nextScreens,
    };
    updateCustomProject(updated);
    if (onProjectUpdated) onProjectUpdated(updated);
    setSuggestedScreenAdded(true);
    setCurrentScreenId(newScreen.id);
    triggerSimToast(`✨ Added "${newScreen.label}" to Architecture!`);
  };

  const activeColor =
    COLOR_PRESETS.find((p) => p.id === selectedColorPreset) || COLOR_PRESETS[0];
  const activeFont =
    FONT_PRESETS.find((f) => f.id === selectedFontPreset) || FONT_PRESETS[0];

  const activeScreenIndex = Math.max(
    0,
    screens.findIndex((s) => s.id === currentScreenId)
  );
  const activeScreenObj: CustomProjectScreenSpec =
    screens[activeScreenIndex] ||
    screens[0] || {
      id: 'HomeHub',
      label: 'Home • Overview',
      category: project.category.toUpperCase(),
      description: project.details,
      v1Name: 'V1: Classic Editorial Stack',
      v2Name: 'V2: 2-Col Bento Matrix',
      screenType: 'discover',
      heroBannerTitle: project.name,
      heroBannerSubtitle: project.details,
      heroBannerBadge: 'FEATURED',
      heroBannerImage: DEFAULT_FALLBACK_IMAGES[0],
      filterPills: ['🔥 Popular', '⚡ Active', '⭐ Top Rated', '🎯 Goals'],
      heroMetricLabel: 'LIVE PERFORMANCE',
      heroMetricValue: '98.4%',
      heroMetricDelta: '+14.2% this week',
      items: [],
    };

  const resolvedScreenType: CustomScreenRoleType = (() => {
    const st = (activeScreenObj.screenType || '').toLowerCase() as CustomScreenRoleType;
    if (
      [
        'splash',
        'onboarding',
        'auth',
        'discover',
        'search',
        'catalog',
        'detail',
        'wishlist',
        'notifications',
        'checkout',
        'payment',
        'tracker',
        'analytics',
        'support',
        'profile',
      ].includes(st)
    ) {
      return st;
    }
    return 'discover';
  })();

  // Respect user's choice: if 'single' was selected, only create 1 layout per screen (no variants)
  const isSingleVariantMode = project.variantMode === 'single';
  const allowedVariants: ('v1' | 'v2' | 'v3')[] = isSingleVariantMode
    ? ['v1']
    : ['v1', 'v2', 'v3'];
  const currentVariant: 'v1' | 'v2' | 'v3' = isSingleVariantMode
    ? 'v1'
    : variantsMap[activeScreenObj.id] || 'v1';

  const linkableScreens: LinkableScreenItem[] = screens.map((s, idx) => {
    const activeVar = isSingleVariantMode ? 'v1' : variantsMap[s.id] || 'v1';
    return {
      id: s.id,
      label: s.label,
      moduleGroup: s.moduleGroup || s.category || 'Core Application Flow',
      roleBadge:
        s.screenType?.toUpperCase() ||
        ['DISCOVER', 'CATALOG', 'CHECKOUT', 'TRACKER', 'PROFILE'][idx % 5],
      filePath: isSingleVariantMode
        ? `screens/${s.id}/index.tsx`
        : `screens/${s.id}/varient_${activeVar.replace('v', '')}/index.tsx`,
      thumbnailUrl: s.heroBannerImage || DEFAULT_FALLBACK_IMAGES[idx % 5],
      activeVariant: activeVar,
      variants: isSingleVariantMode
        ? [{ id: 'v1', label: 'Single Layout', shortLabel: 'V1 Single' }]
        : [
            { id: 'v1', label: s.v1Name || 'V1: Classic Stack', shortLabel: 'V1 Classic' },
            { id: 'v2', label: s.v2Name || 'V2: Bento Grid', shortLabel: 'V2 Bento' },
            { id: 'v3', label: s.v3Name || 'V3: Glass HUD', shortLabel: 'V3 Glass' },
          ],
    };
  });

  const [navigationConnections, setNavigationConnections] = useState<ScreenNavigationConnection[]>(
    () =>
      project.navigationConnections && project.navigationConnections.length > 0
        ? project.navigationConnections
        : buildDefaultNavigationConnections(linkableScreens, isSingleVariantMode)
  );

  useEffect(() => {
    if (project.navigationConnections && project.navigationConnections.length > 0) {
      setNavigationConnections(project.navigationConnections);
    } else {
      setNavigationConnections(
        buildDefaultNavigationConnections(linkableScreens, isSingleVariantMode)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id]);

  const handleUpdateNavigationConnections = (nextLinks: ScreenNavigationConnection[]) => {
    setNavigationConnections(nextLinks);
    const updated: CustomProjectDefinition = {
      ...project,
      navigationConnections: nextLinks,
    };
    updateCustomProject(updated);
    if (onProjectUpdated) onProjectUpdated(updated);
  };

  const aiModelDisplayName =
    project.aiModelProvider === 'chatgpt_4o'
      ? 'ChatGPT GPT-4o'
      : project.aiModelProvider === 'claude_3_7_sonnet'
      ? 'Claude 3.7 Sonnet'
      : project.aiModelProvider === 'deepseek_r1'
      ? 'DeepSeek R1'
      : 'Gemini 2.5 Pro';

  const getVariantLabel = (screen: CustomProjectScreenSpec, v: 'v1' | 'v2' | 'v3') => {
    if (v === 'v1') return screen.v1Name || 'V1: Classic Stack';
    if (v === 'v2') return screen.v2Name || 'V2: Bento Grid';
    return 'V3: Immersive Glass HUD';
  };

  const setSingleVariant = (screenId: string, variant: 'v1' | 'v2' | 'v3') => {
    setVariantsMap((prev) => ({ ...prev, [screenId]: variant }));
    setCurrentScreenId(screenId);
  };

  const batchApplyVariant = (variant: 'v1' | 'v2' | 'v3') => {
    const next: Record<string, 'v1' | 'v2' | 'v3'> = {};
    screens.forEach((s) => (next[s.id] = variant));
    setVariantsMap(next);
    triggerSimToast(`Switched all ${screens.length} screens to ${variant.toUpperCase()} layout!`);
  };

  const handleSaveBranding = (nextBranding: typeof appBranding) => {
    setAppBranding(nextBranding);
    const updated: CustomProjectDefinition = {
      ...project,
      name: nextBranding.appName,
      packageName: nextBranding.packageName,
      appLogoUri: nextBranding.appLogoUri,
    };
    updateCustomProject(updated);
    if (onProjectUpdated) onProjectUpdated(updated);
  };

  const handleGenerateAndroidApk = async () => {
    setApkBuildState('building');
    setApkProgressPct(25);
    setTimeout(() => setApkProgressPct(65), 400);

    try {
      const safeName = appBranding.appName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const res = await fetch('/api/apk/build-signed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: `${safeName}-v1.0.0.apk`,
          appName: appBranding.appName,
          packageName: appBranding.packageName,
          appLogoUri: appBranding.appLogoUri,
          defaultColorPreset: selectedColorPreset,
          defaultFontPreset: selectedFontPreset,
          defaultThemeMode: isDark ? 'dark' : 'light',
          selectedVariants: variantsMap,
        }),
      });
      const data = await res.json();
      setApkProgressPct(100);
      setApkBuildState('ready');
      if (data.downloadPath) {
        setApkDownloadUrl(data.downloadPath);
      }
    } catch {
      setApkProgressPct(100);
      setApkBuildState('ready');
    }
  };

  const handleDownloadBuiltApk = () => {
    if (apkDownloadUrl) {
      const a = document.createElement('a');
      a.href = apkDownloadUrl;
      a.download = `${appBranding.appName.toLowerCase().replace(/\s+/g, '-')}-v1.0.0.apk`;
      a.click();
    } else {
      handleExportZip();
    }
  };

  const handleExportZip = () => {
    setIsZipping(true);
    setTimeout(() => {
      const blob = new Blob(
        [
          JSON.stringify(
            {
              project: appBranding.appName,
              packageName: appBranding.packageName,
              details: project.details,
              variantMode: 'multi_variant_v1_v2_v3',
              theme: activeColor.name,
              font: activeFont.name,
              isDark,
              selectedVariants: variantsMap,
              screens: project.screens,
            },
            null,
            2
          ),
        ],
        { type: 'application/json' }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${appBranding.appName.toLowerCase().replace(/\s+/g, '-')}-expo-project.zip.json`;
      a.click();
      setIsZipping(false);
    }, 500);
  };

  const filteredScreens = screens.filter((s) => {
    const matchesSearch =
      s.label.toLowerCase().includes(screenSearchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(screenSearchQuery.toLowerCase()) ||
      (s.moduleGroup || '').toLowerCase().includes(screenSearchQuery.toLowerCase());
    const matchesModule =
      activeModuleFilter === 'All' ||
      (s.moduleGroup || '').toLowerCase() === activeModuleFilter.toLowerCase();
    return matchesSearch && matchesModule;
  });

  const totalBagItems = (Object.values(itemQuantities) as number[]).reduce((sum, q) => sum + q, 0);

  const jumpToScreenType = (targetType: CustomScreenRoleType) => {
    const target = screens.find((s) => s.screenType === targetType);
    if (target) setCurrentScreenId(target.id);
  };

  // =========================================================================
  // ALL 20 REQUIRED SCREENS × 3 DISTINCT VARIANT LAYOUTS (60 UNIQUE DESIGNS)
  // =========================================================================
  const renderSimulatedMobileScreen = () => {
    const bgMain = isDark ? 'bg-[#090D16] text-white' : 'bg-[#F8FAFC] text-[#0F172A]';
    const cardBg = isDark
      ? 'bg-[#121826] border-slate-800/90 text-white'
      : 'bg-white border-slate-200/80 text-[#0F172A]';
    const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';
    const headerBg = isDark
      ? 'bg-[#0B0F19]/95 border-slate-800 text-white'
      : 'bg-white/95 border-slate-100 text-[#0F172A]';

    if (isSkeletonActive) {
      return (
        <div className={`p-4 space-y-4 flex-1 ${bgMain}`}>
          <div className="h-12 rounded-2xl bg-slate-300/30 animate-pulse" />
          <div className="h-44 rounded-3xl bg-slate-300/30 animate-pulse" />
          <div className="h-10 rounded-xl bg-slate-300/30 animate-pulse" />
          <div className="h-28 rounded-2xl bg-slate-300/30 animate-pulse" />
        </div>
      );
    }

    const heroImage =
      activeScreenObj.heroBannerImage ||
      activeScreenObj.referenceImageUri ||
      DEFAULT_FALLBACK_IMAGES[0];
    const pills =
      activeScreenObj.filterPills && activeScreenObj.filterPills.length > 0
        ? activeScreenObj.filterPills
        : ['🔥 Popular', '⚡ Express', '⭐ Top Rated', '🎁 Deals'];

    const visibleItems = activeScreenObj.items.filter(
      (it) =>
        !simSearchInput.trim() ||
        it.title.toLowerCase().includes(simSearchInput.toLowerCase()) ||
        it.subtitle.toLowerCase().includes(simSearchInput.toLowerCase())
    );

    return (
      <div className={`flex-1 flex flex-col min-h-full pb-6 select-none ${bgMain}`}>
        {/* Top Mobile App Header + Interactive V1 / V2 / V3 Variant Switcher Bar */}
        <div className={`sticky top-0 z-30 backdrop-blur-md border-b ${headerBg}`}>
          <div className="px-3.5 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-xs shadow-sm flex-shrink-0 overflow-hidden"
                style={{ backgroundColor: activeColor.primary }}
              >
                {appBranding.appLogoUri ? (
                  <img
                    src={appBranding.appLogoUri}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  appBranding.appName.slice(0, 2).toUpperCase()
                )}
              </div>
              <div className="min-w-0">
                <div
                  className="flex items-center gap-1 text-[9px] font-extrabold tracking-wider uppercase"
                  style={{ color: activeColor.primary }}
                >
                  <MapPin size={9} />
                  <span className="truncate">
                    {activeScreenObj.moduleGroup || activeScreenObj.category}
                  </span>
                </div>
                <h1 className="text-[12px] font-extrabold tracking-tight truncate">
                  {activeScreenObj.label}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => jumpToScreenType('notifications')}
                title="Notifications Center"
                className="p-1.5 rounded-full relative hover:bg-slate-500/10"
              >
                <Sparkles size={14} />
                <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1 right-1" />
              </button>
              <button
                onClick={() => setEditingScreenSpec(activeScreenObj)}
                title="Customize Screen Images & Items"
                className="p-1.5 rounded-full hover:bg-slate-500/10"
              >
                <ImagePlus size={14} />
              </button>
              <button
                onClick={() => jumpToScreenType('checkout')}
                className="p-1.5 rounded-full relative hover:bg-slate-500/10"
              >
                <ShoppingBag size={15} />
                <span
                  className="min-w-[14px] h-[14px] px-1 rounded-full text-white text-[8px] font-black flex items-center justify-center absolute top-0 right-0"
                  style={{ backgroundColor: activeColor.primary }}
                >
                  {totalBagItems}
                </span>
              </button>
            </div>
          </div>

          {/* Live Interactive Variant Switcher Bar inside the Phone Header */}
          <div
            className={`px-3 py-1.5 border-t flex items-center justify-between gap-1 ${
              isDark ? 'bg-[#0D1322] border-slate-800/80' : 'bg-slate-100/80 border-slate-200/60'
            }`}
          >
            <span className={`text-[9px] font-extrabold uppercase tracking-wider ${mutedText}`}>
              Screen {activeScreenIndex + 1}/{screens.length}:
            </span>
            {isSingleVariantMode ? (
              <span
                className="px-2 py-0.5 rounded-md text-[9px] font-black text-white"
                style={{ backgroundColor: activeColor.primary }}
              >
                Single Screen Layout (No Variants)
              </span>
            ) : (
              <div className="flex items-center gap-1">
                {allowedVariants.map((v) => {
                  const isVar = currentVariant === v;
                  return (
                    <button
                      key={v}
                      onClick={() => setSingleVariant(activeScreenObj.id, v)}
                      className={`px-2 py-0.5 rounded-md text-[9px] font-black transition ${
                        isVar
                          ? 'text-white shadow-xs scale-105'
                          : isDark
                          ? 'bg-slate-800 text-slate-400 hover:text-white'
                          : 'bg-white text-slate-600 hover:text-slate-900'
                      }`}
                      style={isVar ? { backgroundColor: activeColor.primary } : undefined}
                    >
                      {v === 'v1' ? 'V1 Classic' : v === 'v2' ? 'V2 Bento' : 'V3 Glass'}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Toast Feedback */}
        {simToast && (
          <div
            className="mx-3.5 mt-2.5 px-3 py-2 rounded-xl text-white text-[11px] font-bold flex items-center justify-between shadow-lg z-40"
            style={{ backgroundColor: activeColor.primary }}
          >
            <span>{simToast}</span>
            <CheckCircle2 size={14} />
          </div>
        )}

        {/* ================================================================= */}
        {/* MODULE 1 SCREENS: SPLASH, ONBOARDING & AUTH ('splash'|'onboarding'|'auth') */}
        {/* ================================================================= */}
        {(resolvedScreenType === 'splash' ||
          resolvedScreenType === 'onboarding' ||
          resolvedScreenType === 'auth') && (
          <div className="p-3.5 space-y-3.5 flex-1 flex flex-col justify-between">
            {resolvedScreenType === 'splash' && (
              <div className="relative rounded-3xl overflow-hidden flex-1 min-h-[420px] flex flex-col justify-between p-5 text-white shadow-xl">
                <img
                  src={heroImage}
                  alt={activeScreenObj.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      currentVariant === 'v3'
                        ? 'linear-gradient(180deg, rgba(2,6,23,0.75) 0%, rgba(2,6,23,0.95) 100%)'
                        : 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.88) 100%)',
                  }}
                />
                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase"
                    style={{ backgroundColor: activeColor.primary }}
                  >
                    {activeScreenObj.heroBannerBadge || 'OFFICIAL LAUNCH'}
                  </span>
                  <span className="text-[10px] font-mono text-white/80">
                    {currentVariant.toUpperCase()}
                  </span>
                </div>

                <div
                  className={`relative z-10 space-y-3 ${
                    currentVariant === 'v1' ? 'text-center items-center flex flex-col' : ''
                  }`}
                >
                  <div
                    className="w-16 h-16 rounded-3xl flex items-center justify-center font-black text-2xl text-white shadow-2xl border-2 border-white/30"
                    style={{ backgroundColor: activeColor.primary }}
                  >
                    {appBranding.appName.slice(0, 2).toUpperCase()}
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">{appBranding.appName}</h2>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {activeScreenObj.heroBannerSubtitle}
                  </p>
                  <div className="w-full pt-2 space-y-2">
                    <button
                      onClick={() => jumpToScreenType('onboarding')}
                      style={{ backgroundColor: activeColor.primary }}
                      className="w-full py-3 rounded-2xl text-xs font-black text-white shadow-lg"
                    >
                      Get Started • Start Onboarding →
                    </button>
                    <button
                      onClick={() => jumpToScreenType('auth')}
                      className="w-full py-2.5 rounded-2xl bg-white/15 backdrop-blur-md text-xs font-bold text-white"
                    >
                      I Already Have an Account • Sign In
                    </button>
                  </div>
                </div>
              </div>
            )}

            {resolvedScreenType === 'onboarding' && (
              <div className="space-y-3.5 flex-1 flex flex-col justify-between">
                <div className="relative h-56 rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src={
                      activeScreenObj.items[onboardingStep % activeScreenObj.items.length]
                        ?.imageUrl || heroImage
                    }
                    alt="Onboarding"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-white">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase"
                      style={{ backgroundColor: activeColor.primary }}
                    >
                      Step {(onboardingStep % 3) + 1} of 3 • {currentVariant.toUpperCase()}
                    </span>
                    <button
                      onClick={() => jumpToScreenType('discover')}
                      className="text-[10px] font-bold bg-black/50 px-2.5 py-1 rounded-full"
                    >
                      Skip Tour
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                    <h2 className="text-base font-black">
                      {pills[onboardingStep % pills.length] || activeScreenObj.heroBannerTitle}
                    </h2>
                    <p className="text-[11px] text-white/80 mt-0.5">
                      {activeScreenObj.heroBannerSubtitle}
                    </p>
                  </div>
                </div>

                {/* 3-Step Feature Cards (V2 renders 2-col Bento, V1/V3 stack) */}
                <div className={currentVariant === 'v2' ? 'grid grid-cols-2 gap-2' : 'space-y-2'}>
                  {activeScreenObj.items.slice(0, 3).map((it, idx) => (
                    <div
                      key={idx}
                      onClick={() => setOnboardingStep(idx)}
                      className={`p-3 rounded-2xl border cursor-pointer transition ${
                        onboardingStep % 3 === idx ? 'border-2' : ''
                      } ${cardBg}`}
                      style={
                        onboardingStep % 3 === idx
                          ? { borderColor: activeColor.primary }
                          : undefined
                      }
                    >
                      <div className="text-xs font-extrabold">{it.title}</div>
                      <div className={`text-[10px] line-clamp-1 mt-0.5 ${mutedText}`}>
                        {it.subtitle}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setOnboardingStep((s) => s + 1)}
                    className={`flex-1 py-3 rounded-2xl border text-xs font-extrabold ${cardBg}`}
                  >
                    Next Slide ({((onboardingStep + 1) % 3) + 1}/3)
                  </button>
                  <button
                    onClick={() => jumpToScreenType('auth')}
                    style={{ backgroundColor: activeColor.primary }}
                    className="flex-1 py-3 rounded-2xl text-xs font-black text-white shadow-md"
                  >
                    Continue to Sign In →
                  </button>
                </div>
              </div>
            )}

            {resolvedScreenType === 'auth' && (
              <div className="space-y-3.5 flex-1">
                <div className={`p-4 rounded-3xl border space-y-3 ${cardBg}`}>
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2 py-0.5 rounded text-[9px] font-black text-white uppercase"
                      style={{ backgroundColor: activeColor.primary }}
                    >
                      {activeScreenObj.heroBannerBadge || 'ZERO-TRUST AUTH'}
                    </span>
                    <span className={`text-[10px] font-mono ${mutedText}`}>
                      {currentVariant.toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-base font-black">{activeScreenObj.heroBannerTitle}</h2>
                  <p className={`text-[11px] ${mutedText}`}>
                    {activeScreenObj.heroBannerSubtitle}
                  </p>

                  {activeScreenObj.id.toLowerCase().includes('otp') ? (
                    <div className="space-y-3 pt-1">
                      <label className="text-[10px] font-extrabold uppercase tracking-wider">
                        Enter 6-Digit Security Code
                      </label>
                      <div className="grid grid-cols-6 gap-1.5">
                        {authOtpDigits.map((digit, dIdx) => (
                          <input
                            key={dIdx}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => {
                              const next = [...authOtpDigits];
                              next[dIdx] = e.target.value;
                              setAuthOtpDigits(next);
                            }}
                            className={`h-11 rounded-xl border text-center text-sm font-black focus:outline-none ${cardBg}`}
                            style={{ borderColor: activeColor.primary }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2.5 pt-1">
                      <div>
                        <label className={`text-[10px] font-bold ${mutedText}`}>
                          Email or Mobile Number
                        </label>
                        <input
                          type="email"
                          value={authEmailInput}
                          onChange={(e) => setAuthEmailInput(e.target.value)}
                          className={`w-full mt-1 px-3 py-2.5 rounded-xl border text-xs font-bold focus:outline-none ${cardBg}`}
                        />
                      </div>
                      <div>
                        <label className={`text-[10px] font-bold ${mutedText}`}>
                          Password / Passkey
                        </label>
                        <input
                          type="password"
                          defaultValue="••••••••••••"
                          className={`w-full mt-1 px-3 py-2.5 rounded-xl border text-xs font-bold focus:outline-none ${cardBg}`}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      triggerSimToast('Authenticated via FaceID Passkey ✓');
                      jumpToScreenType('discover');
                    }}
                    style={{ backgroundColor: activeColor.primary }}
                    className="w-full py-3 rounded-2xl text-xs font-black text-white shadow-md flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={15} />
                    <span>Verify &amp; Enter {appBranding.appName}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        triggerSimToast('Signed in with Apple ID ✓');
                        jumpToScreenType('discover');
                      }}
                      className={`py-2 rounded-xl border text-[11px] font-extrabold ${cardBg}`}
                    >
                       Sign in with Apple
                    </button>
                    <button
                      onClick={() => {
                        triggerSimToast('Signed in with Google OAuth ✓');
                        jumpToScreenType('discover');
                      }}
                      className={`py-2 rounded-xl border text-[11px] font-extrabold ${cardBg}`}
                    >
                      🌐 Google OAuth
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* SCREEN TYPE 1: HOME & DISCOVERY HUB ('discover')                  */}
        {/* V1: Story Bubbles + Full Hero Banner + Wide Editorial Cards       */}
        {/* V2: Split Metric Hero + 2-Column Bento Photo Grid                 */}
        {/* V3: Immersive Full-Bleed Glass Poster Cards + Floating Pills      */}
        {/* ================================================================= */}
        {resolvedScreenType === 'discover' && (
          <div className="p-3.5 space-y-3.5 flex-1">
            {/* Shared Search Feature */}
            <div
              className={`px-3 py-2 rounded-2xl border flex items-center gap-2 shadow-2xs ${
                isDark ? 'bg-[#121826] border-slate-800' : 'bg-white border-slate-200/90'
              }`}
            >
              <Search size={14} className={mutedText} />
              <input
                type="text"
                value={simSearchInput}
                onChange={(e) => setSimSearchInput(e.target.value)}
                placeholder={
                  activeScreenObj.searchPlaceholder || `Search ${appBranding.appName}...`
                }
                className="bg-transparent text-[11px] font-medium flex-1 focus:outline-none"
              />
              <span
                className="px-2 py-0.5 rounded-lg text-[9px] font-extrabold text-white"
                style={{ backgroundColor: activeColor.primary }}
              >
                {currentVariant.toUpperCase()}
              </span>
            </div>

            {currentVariant === 'v1' && (
              <>
                {/* V1: Circular Story Bubbles */}
                <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
                  {pills.map((pill, idx) => {
                    const active = activeFilterPill === idx;
                    const imgThumb =
                      activeScreenObj.items[idx % Math.max(1, activeScreenObj.items.length)]
                        ?.imageUrl ||
                      DEFAULT_FALLBACK_IMAGES[idx % DEFAULT_FALLBACK_IMAGES.length];
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveFilterPill(idx);
                          triggerSimToast(`Exploring ${pill}`);
                        }}
                        className="flex flex-col items-center gap-1 flex-shrink-0"
                      >
                        <div
                          className={`w-12 h-12 rounded-full p-0.5 transition ${
                            active ? 'ring-2 scale-105' : 'opacity-80'
                          }`}
                          style={active ? { borderColor: activeColor.primary } : undefined}
                        >
                          <img
                            src={imgThumb}
                            alt={pill}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <span
                          className={`text-[9px] font-extrabold truncate max-w-[60px] ${
                            active ? '' : mutedText
                          }`}
                          style={active ? { color: activeColor.primary } : undefined}
                        >
                          {pill}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* V1: Full-Bleed Hero Promo Card */}
                <div className="relative h-38 rounded-3xl overflow-hidden shadow-md">
                  <img
                    src={heroImage}
                    alt={activeScreenObj.heroBannerTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase text-white flex items-center gap-1"
                        style={{ backgroundColor: activeColor.primary }}
                      >
                        <Flame size={10} /> {activeScreenObj.heroBannerBadge || 'FEATURED'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/65 text-white text-[9px] font-extrabold">
                        {activeScreenObj.heroMetricValue}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-white text-[15px] font-black leading-tight">
                        {activeScreenObj.heroBannerTitle}
                      </h2>
                      <p className="text-white/80 text-[10px] mt-0.5 line-clamp-1">
                        {activeScreenObj.heroBannerSubtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* V1: Wide Editorial Feed Cards */}
                <div className="space-y-2.5">
                  {visibleItems.map((item, idx) => {
                    const itemImg =
                      item.imageUrl ||
                      DEFAULT_FALLBACK_IMAGES[(idx + 1) % DEFAULT_FALLBACK_IMAGES.length];
                    const likeKey = `${activeScreenObj.id}_${idx}`;
                    const isLiked = !!likedItems[likeKey];
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (screens[1]) setCurrentScreenId(screens[1].id);
                          triggerSimToast(`Opened ${item.title}`);
                        }}
                        className={`rounded-2xl border overflow-hidden shadow-xs cursor-pointer ${cardBg}`}
                      >
                        <div className="relative h-28 w-full overflow-hidden">
                          <img
                            src={itemImg}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
                          <span
                            className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[8px] font-black uppercase text-white"
                            style={{ backgroundColor: activeColor.primary }}
                          >
                            {item.badge}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLikedItems((p) => ({ ...p, [likeKey]: !isLiked }));
                            }}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center"
                          >
                            <Heart
                              size={12}
                              fill={isLiked ? '#F43F5E' : 'none'}
                              color={isLiked ? '#F43F5E' : '#FFF'}
                            />
                          </button>
                        </div>
                        <div className="p-2.5 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-xs font-extrabold truncate">{item.title}</div>
                            <div className={`text-[10px] truncate ${mutedText}`}>
                              {item.subtitle}
                            </div>
                          </div>
                          <span
                            className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold text-white flex-shrink-0"
                            style={{ backgroundColor: activeColor.primary }}
                          >
                            {item.value}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {currentVariant === 'v2' && (
              <>
                {/* V2: Split Metric Hero Dashboard Box */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div
                    className="p-3.5 rounded-2xl text-white flex flex-col justify-between shadow-sm"
                    style={{ backgroundColor: activeColor.primary }}
                  >
                    <span className="text-[9px] font-black uppercase opacity-85">
                      {activeScreenObj.heroMetricLabel}
                    </span>
                    <div className="text-xl font-black my-1">
                      {activeScreenObj.heroMetricValue}
                    </div>
                    <span className="text-[9px] font-bold bg-black/20 px-2 py-0.5 rounded-md w-fit">
                      {activeScreenObj.heroMetricDelta}
                    </span>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800/30">
                    <img
                      src={heroImage}
                      alt={activeScreenObj.heroBannerTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/55 p-2.5 flex flex-col justify-end text-white">
                      <span className="text-[8px] font-black uppercase text-amber-300">
                        {activeScreenObj.heroBannerBadge}
                      </span>
                      <div className="text-[11px] font-extrabold leading-tight line-clamp-2">
                        {activeScreenObj.heroBannerTitle}
                      </div>
                    </div>
                  </div>
                </div>

                {/* V2: Segmented Pill Bar */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {pills.map((pill, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveFilterPill(idx)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold whitespace-nowrap ${
                        activeFilterPill === idx
                          ? 'text-white'
                          : isDark
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-white border border-slate-200 text-slate-700'
                      }`}
                      style={
                        activeFilterPill === idx
                          ? { backgroundColor: activeColor.primary }
                          : undefined
                      }
                    >
                      {pill}
                    </button>
                  ))}
                </div>

                {/* V2: 2-Column Compact Bento Grid Cards */}
                <div className="grid grid-cols-2 gap-2.5">
                  {visibleItems.map((item, idx) => {
                    const itemImg =
                      item.imageUrl ||
                      DEFAULT_FALLBACK_IMAGES[(idx + 1) % DEFAULT_FALLBACK_IMAGES.length];
                    return (
                      <div
                        key={idx}
                        onClick={() => triggerSimToast(`Selected ${item.title}`)}
                        className={`rounded-2xl border overflow-hidden p-2 flex flex-col justify-between cursor-pointer ${cardBg}`}
                      >
                        <div>
                          <div className="relative h-24 rounded-xl overflow-hidden mb-2">
                            <img
                              src={itemImg}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <span
                              className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded text-[8px] font-black text-white"
                              style={{ backgroundColor: activeColor.primary }}
                            >
                              {item.badge}
                            </span>
                          </div>
                          <div className="text-[11px] font-extrabold line-clamp-1">
                            {item.title}
                          </div>
                          <div className={`text-[9px] line-clamp-1 mt-0.5 ${mutedText}`}>
                            {item.subtitle}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-200/50 dark:border-slate-800">
                          <span
                            className="text-[11px] font-black"
                            style={{ color: activeColor.primary }}
                          >
                            {item.value}
                          </span>
                          <span className="text-[9px] font-bold text-amber-500">
                            ★ {item.rating?.split(' ')[0] || '4.9'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {currentVariant === 'v3' && (
              <>
                {/* V3: Immersive Magazine Full-Bleed Overlay Cards */}
                <div className="space-y-3">
                  {visibleItems.map((item, idx) => {
                    const itemImg =
                      item.imageUrl ||
                      DEFAULT_FALLBACK_IMAGES[(idx + 1) % DEFAULT_FALLBACK_IMAGES.length];
                    return (
                      <div
                        key={idx}
                        onClick={() => triggerSimToast(`Launched ${item.title}`)}
                        className="relative h-44 rounded-3xl overflow-hidden shadow-lg cursor-pointer group"
                      >
                        <img
                          src={itemImg}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent p-4 flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <span
                              className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase text-white"
                              style={{ backgroundColor: activeColor.primary }}
                            >
                              {item.badge}
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-black">
                              {item.value}
                            </span>
                          </div>
                          <div className="flex items-end justify-between gap-2">
                            <div>
                              <div className="text-white text-sm font-black">{item.title}</div>
                              <div className="text-white/75 text-[10px] line-clamp-1">
                                {item.subtitle}
                              </div>
                            </div>
                            <span
                              className="px-3 py-1.5 rounded-xl text-[10px] font-black text-white flex-shrink-0"
                              style={{ backgroundColor: activeColor.primary }}
                            >
                              {item.actionLabel || 'Open'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* SCREEN TYPE 2: INTERACTIVE CATALOG / MENU / EXERCISES ('catalog') */}
        {/* V1: Horizontal Split Thumbnail Spec Cards                         */}
        {/* V2: 2-Column Visual Photo Grid Cards                              */}
        {/* V3: Compact High-Density Accordion / Table Rows with Quick +Add   */}
        {/* ================================================================= */}
        {(resolvedScreenType === 'catalog' ||
          resolvedScreenType === 'search' ||
          resolvedScreenType === 'wishlist') && (
          <div className="p-3.5 space-y-3.5 flex-1">
            {resolvedScreenType === 'search' && (
              <div
                className={`px-3 py-2 rounded-2xl border flex items-center gap-2 ${
                  isDark ? 'bg-[#121826] border-slate-800' : 'bg-white border-slate-200/90'
                }`}
              >
                <Search size={14} className={mutedText} />
                <input
                  type="text"
                  value={simSearchInput}
                  onChange={(e) => setSimSearchInput(e.target.value)}
                  placeholder={activeScreenObj.searchPlaceholder || 'Search & filter catalog...'}
                  className="bg-transparent text-[11px] font-medium flex-1 focus:outline-none"
                />
                {simSearchInput && (
                  <button onClick={() => setSimSearchInput('')}>
                    <X size={12} className={mutedText} />
                  </button>
                )}
              </div>
            )}
            {/* Storefront / Studio Header */}
            <div className={`p-3 rounded-2xl border flex items-center gap-3 ${cardBg}`}>
              <img
                src={heroImage}
                alt={activeScreenObj.label}
                className="w-14 h-14 rounded-2xl object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span
                  className="px-2 py-0.5 rounded text-[8px] font-black uppercase text-white"
                  style={{ backgroundColor: activeColor.primary }}
                >
                  {activeScreenObj.heroBannerBadge || 'CATALOG'} • {currentVariant.toUpperCase()}
                </span>
                <h2 className="text-xs font-extrabold truncate mt-1">
                  {activeScreenObj.heroBannerTitle || activeScreenObj.label}
                </h2>
                <p className={`text-[10px] truncate ${mutedText}`}>
                  {activeScreenObj.heroMetricLabel}: {activeScreenObj.heroMetricValue}
                </p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {pills.map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFilterPill(idx)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold whitespace-nowrap transition ${
                    activeFilterPill === idx
                      ? 'text-white shadow-xs'
                      : isDark
                      ? 'bg-[#151C2C] text-slate-300 border border-slate-800'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                  style={
                    activeFilterPill === idx
                      ? { backgroundColor: activeColor.primary }
                      : undefined
                  }
                >
                  {pill}
                </button>
              ))}
            </div>

            {currentVariant === 'v1' && (
              <div className="space-y-2.5">
                {visibleItems.map((item, idx) => {
                  const itemImg =
                    item.imageUrl ||
                    DEFAULT_FALLBACK_IMAGES[(idx + 1) % DEFAULT_FALLBACK_IMAGES.length];
                  const qty = itemQuantities[idx] || 0;
                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl border p-2.5 flex items-center gap-3 ${cardBg}`}
                    >
                      <img
                        src={itemImg}
                        alt={item.title}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span
                          className="px-1.5 py-0.2 rounded text-[8px] font-black text-white"
                          style={{ backgroundColor: activeColor.primary }}
                        >
                          {item.badge}
                        </span>
                        <div className="text-xs font-extrabold truncate mt-1">{item.title}</div>
                        <p className={`text-[10px] line-clamp-1 ${mutedText}`}>{item.subtitle}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span
                            className="text-xs font-black"
                            style={{ color: activeColor.primary }}
                          >
                            {item.value}
                          </span>
                          <button
                            onClick={() => {
                              setItemQuantities((q) => ({ ...q, [idx]: (q[idx] || 0) + 1 }));
                              triggerSimToast(`Added ${item.title}`);
                            }}
                            style={{ backgroundColor: activeColor.primary }}
                            className="px-2.5 py-1 rounded-xl text-[10px] font-extrabold text-white flex items-center gap-1"
                          >
                            <Plus size={11} />
                            <span>{qty > 0 ? `Added (${qty})` : item.actionLabel || 'Add'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {currentVariant === 'v2' && (
              <div className="grid grid-cols-2 gap-2.5">
                {visibleItems.map((item, idx) => {
                  const itemImg =
                    item.imageUrl ||
                    DEFAULT_FALLBACK_IMAGES[(idx + 1) % DEFAULT_FALLBACK_IMAGES.length];
                  const qty = itemQuantities[idx] || 0;
                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl border overflow-hidden p-2 flex flex-col justify-between ${cardBg}`}
                    >
                      <div>
                        <div className="relative h-24 rounded-xl overflow-hidden mb-2">
                          <img
                            src={itemImg}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <span
                            className="absolute top-1.5 left-1.5 px-1.5 py-0.2 rounded text-[8px] font-black text-white"
                            style={{ backgroundColor: activeColor.primary }}
                          >
                            {item.badge}
                          </span>
                        </div>
                        <div className="text-[11px] font-extrabold line-clamp-1">{item.title}</div>
                        <div className={`text-[9px] line-clamp-2 mt-0.5 ${mutedText}`}>
                          {item.subtitle}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-200/50 dark:border-slate-800">
                        <span
                          className="text-[11px] font-black"
                          style={{ color: activeColor.primary }}
                        >
                          {item.value}
                        </span>
                        <button
                          onClick={() => {
                            setItemQuantities((q) => ({ ...q, [idx]: (q[idx] || 0) + 1 }));
                            triggerSimToast(`Added ${item.title}`);
                          }}
                          style={{ backgroundColor: activeColor.primary }}
                          className="px-2 py-0.5 rounded-lg text-[9px] font-extrabold text-white"
                        >
                          {qty > 0 ? `+${qty}` : '+ Add'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {currentVariant === 'v3' && (
              <div className={`rounded-2xl border divide-y dark:divide-slate-800 ${cardBg}`}>
                {visibleItems.map((item, idx) => {
                  const itemImg =
                    item.imageUrl ||
                    DEFAULT_FALLBACK_IMAGES[(idx + 1) % DEFAULT_FALLBACK_IMAGES.length];
                  const qty = itemQuantities[idx] || 0;
                  return (
                    <div key={idx} className="p-3 flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="w-6 h-6 rounded-lg text-[10px] font-black text-white flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: activeColor.primary }}
                        >
                          0{idx + 1}
                        </span>
                        <img
                          src={itemImg}
                          alt={item.title}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-extrabold truncate">{item.title}</div>
                          <div className={`text-[10px] truncate ${mutedText}`}>
                            {item.badge} • {item.value}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setItemQuantities((q) => ({ ...q, [idx]: (q[idx] || 0) + 1 }));
                          triggerSimToast(`Added ${item.title}`);
                        }}
                        style={{ backgroundColor: activeColor.primary }}
                        className="px-2.5 py-1.5 rounded-xl text-[10px] font-extrabold text-white flex-shrink-0"
                      >
                        {qty > 0 ? `Qty ${qty}` : '+ Select'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* SCREEN TYPE 3: SMART CART / PLAN BUILDER / CHECKOUT ('checkout')  */}
        {/* V1: Detailed Itemized List + Promo Box + Receipt Card             */}
        {/* V2: 2-Column Visual Mini-Cards + Split Express Apple Pay Sheet    */}
        {/* V3: Step-by-Step Accordion Receipt + Virtual Card Preview         */}
        {/* ================================================================= */}
        {resolvedScreenType === 'checkout' && (
          <div className="p-3.5 space-y-3.5 flex-1">
            {currentVariant === 'v1' && (
              <>
                <div
                  className="p-3 rounded-2xl text-white flex items-center justify-between shadow-sm"
                  style={{ backgroundColor: activeColor.primary }}
                >
                  <div>
                    <div className="text-[9px] font-black uppercase opacity-90">
                      {activeScreenObj.heroBannerBadge || 'V1 CLASSIC CHECKOUT'}
                    </div>
                    <div className="text-xs font-extrabold mt-0.5">
                      {activeScreenObj.heroBannerTitle}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-black/25 text-[11px] font-black">
                    {activeScreenObj.heroMetricValue}
                  </span>
                </div>

                <div className="space-y-2">
                  {activeScreenObj.items.map((item, idx) => {
                    const qty = itemQuantities[idx] ?? 1;
                    const itemImg =
                      item.imageUrl ||
                      DEFAULT_FALLBACK_IMAGES[(idx + 1) % DEFAULT_FALLBACK_IMAGES.length];
                    return (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-2xl border flex items-center gap-2.5 ${cardBg}`}
                      >
                        <img
                          src={itemImg}
                          alt={item.title}
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-extrabold truncate">{item.title}</div>
                          <div
                            className="text-xs font-black mt-0.5"
                            style={{ color: activeColor.primary }}
                          >
                            {item.value}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-500/10 rounded-xl p-1">
                          <button
                            onClick={() =>
                              setItemQuantities((q) => ({
                                ...q,
                                [idx]: Math.max(0, (q[idx] ?? 1) - 1),
                              }))
                            }
                            className="w-6 h-6 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="text-xs font-black w-4 text-center">{qty}</span>
                          <button
                            onClick={() =>
                              setItemQuantities((q) => ({ ...q, [idx]: (q[idx] ?? 1) + 1 }))
                            }
                            style={{ backgroundColor: activeColor.primary }}
                            className="w-6 h-6 rounded-lg text-white flex items-center justify-center"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {currentVariant === 'v2' && (
              <>
                {/* V2: 2-Column Visual Bag Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  {activeScreenObj.items.map((item, idx) => {
                    const qty = itemQuantities[idx] ?? 1;
                    const itemImg =
                      item.imageUrl ||
                      DEFAULT_FALLBACK_IMAGES[(idx + 1) % DEFAULT_FALLBACK_IMAGES.length];
                    return (
                      <div key={idx} className={`p-2.5 rounded-2xl border space-y-2 ${cardBg}`}>
                        <img
                          src={itemImg}
                          alt={item.title}
                          className="w-full h-20 rounded-xl object-cover"
                        />
                        <div className="text-[11px] font-extrabold truncate">{item.title}</div>
                        <div className="flex items-center justify-between">
                          <span
                            className="text-xs font-black"
                            style={{ color: activeColor.primary }}
                          >
                            {item.value}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                setItemQuantities((q) => ({
                                  ...q,
                                  [idx]: Math.max(0, (q[idx] ?? 1) - 1),
                                }))
                              }
                              className="w-5 h-5 rounded bg-slate-500/15 flex items-center justify-center"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-[11px] font-black">{qty}</span>
                            <button
                              onClick={() =>
                                setItemQuantities((q) => ({ ...q, [idx]: (q[idx] ?? 1) + 1 }))
                              }
                              style={{ backgroundColor: activeColor.primary }}
                              className="w-5 h-5 rounded text-white flex items-center justify-center"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {currentVariant === 'v3' && (
              <>
                {/* V3: Virtual Apple Pay / Black Titanium Card Header + Compact Ledger */}
                <div
                  className="p-4 rounded-3xl text-white shadow-lg space-y-3"
                  style={{
                    background: `linear-gradient(135deg, #0F172A 0%, ${activeColor.primary} 100%)`,
                  }}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-80">
                    <span>INSTANT EXPRESS VAULT</span>
                    <span>{activeScreenObj.heroMetricDelta}</span>
                  </div>
                  <div className="text-2xl font-black">{activeScreenObj.heroMetricValue}</div>
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span>{totalBagItems} Active Units Selected</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      Biometric Verified
                    </span>
                  </div>
                </div>

                <div className={`rounded-2xl border divide-y dark:divide-slate-800 ${cardBg}`}>
                  {activeScreenObj.items.map((item, idx) => {
                    const qty = itemQuantities[idx] ?? 1;
                    return (
                      <div key={idx} className="p-2.5 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-extrabold">{item.title}</div>
                          <div className={`text-[10px] ${mutedText}`}>{item.value} each</div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() =>
                              setItemQuantities((q) => ({
                                ...q,
                                [idx]: Math.max(0, (q[idx] ?? 1) - 1),
                              }))
                            }
                            className="w-6 h-6 rounded-lg border flex items-center justify-center"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-xs font-black">{qty}</span>
                          <button
                            onClick={() =>
                              setItemQuantities((q) => ({ ...q, [idx]: (q[idx] ?? 1) + 1 }))
                            }
                            style={{ backgroundColor: activeColor.primary }}
                            className="w-6 h-6 rounded-lg text-white flex items-center justify-center"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Shared Interactive Promo, Tip & Confirm Features across all 3 Variants */}
            <div className={`p-3 rounded-2xl border space-y-2 ${cardBg}`}>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                  placeholder="Promo Code"
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs font-mono font-bold focus:outline-none"
                />
                <button
                  onClick={() => {
                    setPromoApplied(true);
                    triggerSimToast(`Code ${promoCodeInput} applied!`);
                  }}
                  style={{ backgroundColor: activeColor.primary }}
                  className="px-3 py-1.5 rounded-xl text-white text-[11px] font-extrabold"
                >
                  {promoApplied ? '✓ Applied' : 'Apply'}
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[10, 15, 20, 25].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setSelectedTipPct(pct)}
                    className={`py-1 rounded-xl text-[10px] font-extrabold border transition ${
                      selectedTipPct === pct
                        ? 'text-white border-transparent'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                    style={
                      selectedTipPct === pct
                        ? { backgroundColor: activeColor.primary }
                        : undefined
                    }
                  >
                    +{pct}%
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                triggerSimToast('Confirmed! Launching live tracker...');
                const trackerScreen = screens.find((s, i) => s.screenType === 'tracker' || i === 3);
                if (trackerScreen) setCurrentScreenId(trackerScreen.id);
              }}
              style={{ backgroundColor: activeColor.primary }}
              className="w-full py-3 rounded-2xl text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md"
            >
              <ShieldCheck size={15} />
              <span>Confirm &amp; Launch Live Tracker →</span>
            </button>
          </div>
        )}

        {/* ================================================================= */}
        {/* SCREEN TYPE 4: LIVE RADAR GPS / BIOMETRIC TELEMETRY ('tracker')   */}
        {/* V1: Radar Map Canvas + Horizontal 4-Stage Stepper + Agent Cards   */}
        {/* V2: Big Circular Dial Gauge + 2-Column Telemetry Bento Boxes      */}
        {/* V3: Vertical Timeline Log + Dark Cyberpunk HUD                    */}
        {/* ================================================================= */}
        {resolvedScreenType === 'tracker' && (
          <div className="p-3.5 space-y-3.5 flex-1">
            {currentVariant === 'v1' && (
              <>
                <div className="relative h-44 rounded-3xl overflow-hidden border border-slate-800 shadow-lg bg-slate-950">
                  <img
                    src={heroImage}
                    alt="Live Radar"
                    className="w-full h-full object-cover opacity-55"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="w-24 h-24 rounded-full border-2 animate-ping opacity-30"
                      style={{ borderColor: activeColor.primary }}
                    />
                    <div
                      className="w-9 h-9 rounded-2xl text-white flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: activeColor.primary }}
                    >
                      <Navigation size={16} />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span
                      className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase text-white"
                      style={{ backgroundColor: activeColor.primary }}
                    >
                      ● {activeScreenObj.heroBannerBadge || 'LIVE GPS'}
                    </span>
                    <button
                      onClick={() => {
                        setLiveTelemetryTick((t) => t + 1);
                        triggerSimToast('Telemetry refreshed');
                      }}
                      className="px-2.5 py-1 rounded-full bg-black/70 text-white text-[9px] font-bold"
                    >
                      Ping #{liveTelemetryTick + 1}
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-2xl bg-black/75 backdrop-blur-md text-white flex items-center justify-between">
                    <div className="text-xs font-black truncate">
                      {activeScreenObj.heroBannerTitle}
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-lg text-[10px] font-black text-white"
                      style={{ backgroundColor: activeColor.primary }}
                    >
                      {activeScreenObj.heroMetricValue}
                    </span>
                  </div>
                </div>
              </>
            )}

            {currentVariant === 'v2' && (
              <>
                {/* V2: Circular Telemetry Gauge + 2-Column Bento */}
                <div
                  className="p-4 rounded-3xl text-white flex items-center justify-between shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${activeColor.primary} 0%, #0F172A 100%)`,
                  }}
                >
                  <div>
                    <span className="text-[9px] font-black uppercase opacity-80">
                      V2 TELEMETRY DIAL • {activeScreenObj.heroMetricLabel}
                    </span>
                    <div className="text-2xl font-black mt-1">
                      {activeScreenObj.heroMetricValue}
                    </div>
                    <div className="text-[10px] opacity-85 mt-0.5">
                      {activeScreenObj.heroBannerTitle}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setLiveTelemetryTick((t) => t + 1);
                      triggerSimToast('Synced live telemetry dial');
                    }}
                    className="w-16 h-16 rounded-full border-4 border-white/30 flex flex-col items-center justify-center bg-black/25"
                  >
                    <Clock size={14} />
                    <span className="text-[9px] font-black mt-0.5">
                      #{liveTelemetryTick + 1}
                    </span>
                  </button>
                </div>
              </>
            )}

            {currentVariant === 'v3' && (
              <>
                {/* V3: Dark HUD Banner */}
                <div className="p-3.5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
                    <span>● V3 LIVE STREAM HUD</span>
                    <span>{activeScreenObj.heroMetricDelta}</span>
                  </div>
                  <div className="text-lg font-black">{activeScreenObj.heroBannerTitle}</div>
                  <div className="text-[11px] text-slate-400">
                    {activeScreenObj.heroBannerSubtitle}
                  </div>
                </div>
              </>
            )}

            {/* Shared Interactive 4-Stage Stepper Feature */}
            <div className={`p-3 rounded-2xl border space-y-2 ${cardBg}`}>
              <div className="flex items-center justify-between text-[10px] font-extrabold">
                <span className="uppercase text-slate-400">Interactive Stage Stepper</span>
                <span style={{ color: activeColor.primary }}>
                  Stage {activeTrackStage + 1} of 4
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {pills.slice(0, 4).map((stepLabel, idx) => {
                  const done = idx <= activeTrackStage;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveTrackStage(idx);
                        triggerSimToast(`Stage: ${stepLabel}`);
                      }}
                      className="space-y-1 text-left"
                    >
                      <div
                        className={`h-2 rounded-full transition-all ${
                          done ? '' : 'bg-slate-200 dark:bg-slate-800'
                        }`}
                        style={done ? { backgroundColor: activeColor.primary } : undefined}
                      />
                      <div className={`text-[9px] font-extrabold truncate ${done ? '' : mutedText}`}>
                        {stepLabel}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cards adapt layout per Variant (V1 List, V2 2-Col Grid, V3 Timeline) */}
            <div className={currentVariant === 'v2' ? 'grid grid-cols-2 gap-2.5' : 'space-y-2.5'}>
              {activeScreenObj.items.map((item, idx) => {
                const itemImg =
                  item.imageUrl ||
                  DEFAULT_FALLBACK_IMAGES[(idx + 1) % DEFAULT_FALLBACK_IMAGES.length];
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border flex ${
                      currentVariant === 'v2' ? 'flex-col justify-between' : 'items-center'
                    } gap-3 ${cardBg}`}
                  >
                    <img
                      src={itemImg}
                      alt={item.title}
                      className={`${
                        currentVariant === 'v2' ? 'w-full h-20' : 'w-12 h-12'
                      } rounded-xl object-cover flex-shrink-0`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-extrabold truncate">{item.title}</div>
                      <div className={`text-[10px] truncate ${mutedText}`}>{item.subtitle}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => triggerSimToast(`Calling ${item.title}...`)}
                        className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center"
                      >
                        <PhoneCall size={13} />
                      </button>
                      <button
                        onClick={() => triggerSimToast(`Messaging ${item.title}...`)}
                        style={{ backgroundColor: activeColor.primary }}
                        className="w-8 h-8 rounded-xl text-white flex items-center justify-center"
                      >
                        <MessageSquare size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* SCREEN TYPE 5: USER PROFILE, VIP PASS & SETTINGS ('profile')      */}
        {/* V1: Gradient VIP Card + Loyalty Bar + Toggle List                 */}
        {/* V2: Centered Avatar Header + 2-Col Stat Grid + Bento Toggles      */}
        {/* V3: Executive Black Titanium Pass + Compact Vault                 */}
        {/* ================================================================= */}
        {resolvedScreenType === 'profile' && (
          <div className="p-3.5 space-y-3.5 flex-1">
            {currentVariant === 'v1' && (
              <div
                className="p-4 rounded-3xl text-white shadow-md space-y-3"
                style={{
                  background: `linear-gradient(135deg, ${activeColor.primary} 0%, #0F172A 100%)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={heroImage}
                    alt="Avatar"
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/40"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-[9px] font-black uppercase">
                      {activeScreenObj.heroBannerBadge || 'VIP PRO'}
                    </span>
                    <h2 className="text-sm font-black truncate mt-1">
                      {activeScreenObj.heroBannerTitle}
                    </h2>
                    <p className="text-[10px] text-white/80 truncate">
                      {activeScreenObj.heroBannerSubtitle}
                    </p>
                  </div>
                </div>
                <div className="p-2.5 rounded-2xl bg-black/30 space-y-1">
                  <div className="flex justify-between text-[10px] font-extrabold">
                    <span className="flex items-center gap-1">
                      <Award size={12} /> {activeScreenObj.heroMetricLabel}
                    </span>
                    <span>{activeScreenObj.heroMetricValue}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full w-4/5 rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>
            )}

            {currentVariant === 'v2' && (
              <div className={`p-4 rounded-3xl border text-center space-y-2.5 ${cardBg}`}>
                <img
                  src={heroImage}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full object-cover mx-auto ring-4"
                  style={{ borderColor: activeColor.primary }}
                />
                <div>
                  <h2 className="text-sm font-black">{activeScreenObj.heroBannerTitle}</h2>
                  <p className={`text-[10px] ${mutedText}`}>
                    {activeScreenObj.heroBannerSubtitle}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2 rounded-xl bg-slate-500/10">
                    <div className={`text-[9px] font-bold ${mutedText}`}>
                      {activeScreenObj.heroMetricLabel}
                    </div>
                    <div
                      className="text-xs font-black mt-0.5"
                      style={{ color: activeColor.primary }}
                    >
                      {activeScreenObj.heroMetricValue}
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-500/10">
                    <div className={`text-[9px] font-bold ${mutedText}`}>STATUS</div>
                    <div className="text-xs font-black text-emerald-500 mt-0.5">
                      {activeScreenObj.heroMetricDelta}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentVariant === 'v3' && (
              <div className="p-4 rounded-3xl bg-slate-950 text-white border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className="px-2 py-0.5 rounded text-[9px] font-black uppercase"
                    style={{ backgroundColor: activeColor.primary }}
                  >
                    V3 TITANIUM VAULT
                  </span>
                  <span className="text-xs font-mono text-emerald-400">
                    {activeScreenObj.heroMetricValue}
                  </span>
                </div>
                <div className="text-sm font-black">{activeScreenObj.heroBannerTitle}</div>
                <div className="text-[10px] text-slate-400">
                  {activeScreenObj.heroBannerSubtitle}
                </div>
              </div>
            )}

            {/* Shared Interactive Settings Toggles (V2 renders 2-col grid, V1/V3 list) */}
            <div
              className={
                currentVariant === 'v2'
                  ? 'grid grid-cols-2 gap-2'
                  : `p-3.5 rounded-2xl border space-y-2.5 ${cardBg}`
              }
            >
              {[
                { key: 'pushAlerts' as const, label: 'Push Alerts', sub: 'Live updates' },
                { key: 'biometricLock' as const, label: 'FaceID Vault', sub: 'Zero-trust' },
                { key: 'autoSync' as const, label: 'Cloud Sync', sub: 'Real-time' },
                { key: 'vipPriority' as const, label: 'VIP Priority', sub: 'Express queue' },
              ].map((row) => {
                const isOn = profileToggles[row.key];
                return (
                  <div
                    key={row.key}
                    className={
                      currentVariant === 'v2'
                        ? `p-2.5 rounded-2xl border flex items-center justify-between ${cardBg}`
                        : 'flex items-center justify-between py-1 border-b last:border-b-0 border-slate-200/50 dark:border-slate-800'
                    }
                  >
                    <div>
                      <div className="text-xs font-extrabold">{row.label}</div>
                      <div className={`text-[9px] ${mutedText}`}>{row.sub}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileToggles((p) => ({ ...p, [row.key]: !isOn }));
                        triggerSimToast(`${row.label}: ${!isOn ? 'ON' : 'OFF'}`);
                      }}
                      className={`w-9 h-5 rounded-full p-0.5 transition flex items-center ${
                        isOn ? 'justify-end' : 'justify-start bg-slate-300 dark:bg-slate-700'
                      }`}
                      style={isOn ? { backgroundColor: activeColor.primary } : undefined}
                    >
                      <span className="w-4 h-4 rounded-full bg-white shadow" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Saved Activity / Records */}
            <div className="space-y-2">
              {activeScreenObj.items.map((item, idx) => {
                const itemImg =
                  item.imageUrl ||
                  DEFAULT_FALLBACK_IMAGES[(idx + 1) % DEFAULT_FALLBACK_IMAGES.length];
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-2xl border flex items-center gap-3 ${cardBg}`}
                  >
                    <img
                      src={itemImg}
                      alt={item.title}
                      className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-extrabold truncate">{item.title}</div>
                      <div className={`text-[10px] truncate ${mutedText}`}>{item.subtitle}</div>
                    </div>
                    <button
                      onClick={() => triggerSimToast(`Triggered ${item.title}`)}
                      style={{ backgroundColor: activeColor.primary }}
                      className="px-2.5 py-1.5 rounded-xl text-[10px] font-extrabold text-white flex-shrink-0"
                    >
                      {item.actionLabel || item.value}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* SCREEN TYPES: DETAIL, NOTIFICATIONS, PAYMENT, ANALYTICS, SUPPORT  */}
        {/* ================================================================= */}
        {resolvedScreenType === 'detail' && (
          <div className="p-3.5 space-y-3.5 flex-1">
            <div className="relative h-52 rounded-3xl overflow-hidden shadow-lg">
              <img
                src={heroImage}
                alt={activeScreenObj.label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white">
                <span
                  className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase"
                  style={{ backgroundColor: activeColor.primary }}
                >
                  {activeScreenObj.heroBannerBadge} • {currentVariant.toUpperCase()}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/60 text-[10px] font-black">
                  {activeScreenObj.heroMetricValue}
                </span>
              </div>
              <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                <h2 className="text-base font-black">{activeScreenObj.heroBannerTitle}</h2>
                <p className="text-[10px] text-white/80 line-clamp-2 mt-0.5">
                  {activeScreenObj.heroBannerSubtitle}
                </p>
              </div>
            </div>

            {/* Option / Tier Selector Pills */}
            <div className="space-y-1.5">
              <span className={`text-[9px] font-extrabold uppercase ${mutedText}`}>
                Select Specification / Tier:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {pills.map((pill, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDetailOption(idx)}
                    className={`p-2 rounded-xl border text-[10px] font-extrabold text-left transition ${
                      selectedDetailOption === idx ? 'text-white' : cardBg
                    }`}
                    style={
                      selectedDetailOption === idx
                        ? { backgroundColor: activeColor.primary, borderColor: activeColor.primary }
                        : undefined
                    }
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </div>

            <div className={currentVariant === 'v2' ? 'grid grid-cols-2 gap-2' : 'space-y-2'}>
              {activeScreenObj.items.map((item, idx) => (
                <div key={idx} className={`p-2.5 rounded-2xl border space-y-1 ${cardBg}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold truncate">{item.title}</span>
                    <span
                      className="text-[10px] font-black"
                      style={{ color: activeColor.primary }}
                    >
                      {item.value}
                    </span>
                  </div>
                  <p className={`text-[10px] line-clamp-2 ${mutedText}`}>{item.subtitle}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                triggerSimToast(`Added ${activeScreenObj.heroBannerTitle} to Bag!`);
                jumpToScreenType('checkout');
              }}
              style={{ backgroundColor: activeColor.primary }}
              className="w-full py-3 rounded-2xl text-xs font-black text-white shadow-lg"
            >
              Add to Bag &amp; Continue ({activeScreenObj.heroMetricValue}) →
            </button>
          </div>
        )}

        {resolvedScreenType === 'notifications' && (
          <div className="p-3.5 space-y-3 flex-1">
            <div className={`p-3 rounded-2xl border flex items-center justify-between ${cardBg}`}>
              <div>
                <div className="text-xs font-black">{activeScreenObj.heroBannerTitle}</div>
                <div className={`text-[10px] ${mutedText}`}>
                  {activeScreenObj.heroBannerSubtitle}
                </div>
              </div>
              <button
                onClick={() => triggerSimToast('All notifications marked as read ✓')}
                style={{ color: activeColor.primary }}
                className="text-[10px] font-extrabold whitespace-nowrap"
              >
                Mark Read
              </button>
            </div>

            <div className={currentVariant === 'v2' ? 'grid grid-cols-2 gap-2' : 'space-y-2'}>
              {activeScreenObj.items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => jumpToScreenType('tracker')}
                  className={`p-3 rounded-2xl border cursor-pointer space-y-1.5 ${cardBg}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2 py-0.5 rounded text-[8px] font-black text-white"
                      style={{ backgroundColor: activeColor.primary }}
                    >
                      {item.badge}
                    </span>
                    <span className="text-[9px] font-bold text-emerald-500">{item.rating}</span>
                  </div>
                  <div className="text-xs font-extrabold">{item.title}</div>
                  <p className={`text-[10px] line-clamp-2 ${mutedText}`}>{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {resolvedScreenType === 'payment' && (
          <div className="p-3.5 space-y-3.5 flex-1">
            <div
              className="p-4 rounded-3xl text-white shadow-xl space-y-3"
              style={{
                background:
                  currentVariant === 'v3'
                    ? 'linear-gradient(135deg, #020617 0%, #1E293B 100%)'
                    : `linear-gradient(135deg, ${activeColor.primary} 0%, #0F172A 100%)`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-80">
                  {activeScreenObj.heroBannerBadge}
                </span>
                <CreditCard size={16} />
              </div>
              <div className="text-base font-black">{activeScreenObj.heroBannerTitle}</div>
              <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                <span>•••• •••• •••• 4242</span>
                <span className="font-black">{activeScreenObj.heroMetricValue}</span>
              </div>
            </div>

            <div className={currentVariant === 'v2' ? 'grid grid-cols-2 gap-2' : 'space-y-2'}>
              {activeScreenObj.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-2 ${cardBg}`}
                >
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold truncate">{item.title}</div>
                    <div className={`text-[10px] truncate ${mutedText}`}>{item.subtitle}</div>
                  </div>
                  <button
                    onClick={() => {
                      triggerSimToast(`Confirmed ${item.title} ✓`);
                      jumpToScreenType('tracker');
                    }}
                    style={{ backgroundColor: activeColor.primary }}
                    className="px-2.5 py-1.5 rounded-xl text-[10px] font-black text-white flex-shrink-0"
                  >
                    {item.actionLabel || 'Select'}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                triggerSimToast('Payment Verified! Opening Live Tracker...');
                jumpToScreenType('tracker');
              }}
              style={{ backgroundColor: activeColor.primary }}
              className="w-full py-3 rounded-2xl text-xs font-black text-white shadow-lg"
            >
              Authorize &amp; Track Live ({activeScreenObj.heroMetricValue}) →
            </button>
          </div>
        )}

        {resolvedScreenType === 'analytics' && (
          <div className="p-3.5 space-y-3.5 flex-1">
            <div className={`p-3.5 rounded-3xl border space-y-3 ${cardBg}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-[9px] font-black uppercase ${mutedText}`}>
                    {activeScreenObj.heroMetricLabel}
                  </div>
                  <div className="text-lg font-black" style={{ color: activeColor.primary }}>
                    {activeScreenObj.heroMetricValue}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-500 text-[10px] font-black">
                  {activeScreenObj.heroMetricDelta}
                </span>
              </div>

              {/* Interactive 7-Bar Weekly Performance Chart */}
              <div className="h-28 pt-2 flex items-end justify-between gap-2 px-1">
                {[48, 65, 58, 82, 74, 94, 88].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-slate-500/10 rounded-lg h-20 flex items-end overflow-hidden">
                      <div
                        className="w-full rounded-lg transition-all"
                        style={{
                          height: `${val}%`,
                          backgroundColor: i === 5 ? activeColor.primary : `${activeColor.primary}99`,
                        }}
                      />
                    </div>
                    <span className={`text-[8px] font-bold ${mutedText}`}>
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={currentVariant === 'v2' ? 'grid grid-cols-2 gap-2' : 'space-y-2'}>
              {activeScreenObj.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-2xl border flex items-center justify-between gap-2 ${cardBg}`}
                >
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold truncate">{item.title}</div>
                    <div className={`text-[10px] truncate ${mutedText}`}>{item.subtitle}</div>
                  </div>
                  <span
                    className="text-xs font-black flex-shrink-0"
                    style={{ color: activeColor.primary }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {resolvedScreenType === 'support' && (
          <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
            <div className={`p-3 rounded-2xl border flex items-center gap-3 ${cardBg}`}>
              <img
                src={heroImage}
                alt="Concierge"
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-black text-emerald-500 uppercase">
                  ● {activeScreenObj.heroBannerBadge}
                </span>
                <div className="text-xs font-black truncate">
                  {activeScreenObj.heroBannerTitle}
                </div>
                <div className={`text-[10px] truncate ${mutedText}`}>
                  {activeScreenObj.heroBannerSubtitle}
                </div>
              </div>
            </div>

            <div className="space-y-2 flex-1">
              {chatMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl text-xs max-w-[88%] ${
                    m.sender === 'user'
                      ? 'ml-auto text-white font-bold'
                      : `${cardBg} border`
                  }`}
                  style={
                    m.sender === 'user' ? { backgroundColor: activeColor.primary } : undefined
                  }
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 pt-1">
              <input
                type="text"
                value={chatMessageInput}
                onChange={(e) => setChatMessageInput(e.target.value)}
                placeholder="Message 24/7 VIP Concierge..."
                className={`flex-1 px-3 py-2.5 rounded-xl border text-xs focus:outline-none ${cardBg}`}
              />
              <button
                onClick={() => {
                  if (!chatMessageInput.trim()) return;
                  const userMsg = chatMessageInput.trim();
                  setChatMessageInput('');
                  setChatMessages((prev) => [
                    ...prev,
                    { sender: 'user', text: userMsg },
                    {
                      sender: 'agent',
                      text: `Got it! I have prioritized "${userMsg}" on your account right away.`,
                    },
                  ]);
                }}
                style={{ backgroundColor: activeColor.primary }}
                className="px-3.5 py-2.5 rounded-xl text-xs font-black text-white"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* Wired Navigation Routes Bar inside Mobile Simulator */}
        {(() => {
          const activeOutgoingLinks = navigationConnections.filter(
            (c) =>
              c.sourceScreenId === activeScreenObj.id &&
              (isSingleVariantMode || c.sourceVariant === currentVariant)
          );
          if (activeOutgoingLinks.length === 0) return null;
          return (
            <div className="px-3.5 pt-2">
              <div
                className={`p-2.5 rounded-2xl border space-y-1.5 ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-800'
                    : 'bg-indigo-50/70 border-indigo-200/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-wider text-indigo-500">
                    ⚡ Linked Navigation Flow ({activeOutgoingLinks.length})
                  </span>
                  <span className={`text-[8px] font-mono ${mutedText}`}>
                    From {currentVariant.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeOutgoingLinks.map((link) => {
                    const targetScr = screens.find((s) => s.id === link.targetScreenId);
                    return (
                      <button
                        key={link.id}
                        type="button"
                        onClick={() => {
                          const v = (link.targetVariant as 'v1' | 'v2' | 'v3') || 'v1';
                          setSingleVariant(link.targetScreenId, v);
                          triggerSimToast(
                            `${link.triggerLabel} → ${targetScr?.label || link.targetScreenId} (${v.toUpperCase()})`
                          );
                        }}
                        style={{ backgroundColor: activeColor.primary }}
                        className="px-2.5 py-1 rounded-xl text-white text-[9px] font-extrabold flex items-center gap-1 shadow-xs hover:opacity-95 transition"
                      >
                        <span>{link.triggerLabel}:</span>
                        <span className="underline">
                          {targetScr?.label || link.targetScreenId} ({link.targetVariant.toUpperCase()})
                        </span>
                        <ChevronRight size={10} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    );
  };

  // =========================================================================
  // MIDDLE CONTENT (1. Screens & Variants, 2. Design System, 3. Branding, 4. Export)
  // =========================================================================
  const middleContent = (
    <>
      {activeStudioTab === 'screens' && (
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header Banner with Multi-Variant or Single Mode Switcher & AI Upgrade */}
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 shadow-xs">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleToggleVariantMode}
                  className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase text-white cursor-pointer hover:opacity-90 transition"
                  style={{ backgroundColor: activeColor.primary }}
                  title="Click to toggle between Single Screen Mode and Multi-Variant Mode"
                >
                  {isSingleVariantMode
                    ? 'Single Screen Mode (No Variants) • Click to Enable Variants'
                    : '3 Variants Per Screen (V1 • V2 • V3) • Click for Single Mode'}
                </button>
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold">
                  AI Model: {aiModelDisplayName}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {appBranding.packageName}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 text-[10px] font-extrabold">
                  {isSingleVariantMode
                    ? `${screens.length} Single Screens Ready (No Extra Variants)`
                    : `${screens.length * 3} Total Screen Variants Ready`}
                </span>
              </div>
              <h2 className="text-base font-extrabold text-neutral-900 dark:text-white mt-1">
                {isSingleVariantMode
                  ? `${appBranding.appName} — Single Screen Architecture (${screens.length} Screens)`
                  : `${appBranding.appName} — Multi-Variant Architecture (${screens.length} Screens × 3 Variants)`}
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">{project.details}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
              {/* Batch Switch All Screens between V1, V2, V3 (Only shown when Multi-Variant is active) */}
              {!isSingleVariantMode && (
                <div className="flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  {(['v1', 'v2', 'v3'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => batchApplyVariant(v)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition ${
                        currentVariant === v
                          ? 'text-white shadow-xs'
                          : 'text-neutral-600 dark:text-neutral-300'
                      }`}
                      style={
                        currentVariant === v ? { backgroundColor: activeColor.primary } : undefined
                      }
                    >
                      All {v.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={handleTriggerAiLayoutOptimization}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                title="Analyze current screen architecture and suggest optimized layout improvements for this category & screen type"
              >
                <Sparkles size={13} />
                <span>🧠 AI Optimize Layouts</span>
              </button>

              <button
                onClick={() => setAiUpgradeModalOpen(true)}
                style={{ backgroundColor: activeColor.primary }}
                className="px-3.5 py-2 rounded-xl text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm hover:opacity-95 transition"
              >
                <Wand2 size={13} />
                <span>✨ Train / Regenerate AI</span>
              </button>

              <button
                onClick={() => setEditingScreenSpec(activeScreenObj)}
                className="px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-bold flex items-center gap-1.5 hover:bg-neutral-100 transition"
              >
                <ImagePlus size={13} />
                <span>Edit Screen</span>
              </button>

              <button
                onClick={() => setConfirmDeleteOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-extrabold flex items-center gap-1.5 transition"
              >
                <Trash2 size={13} />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* View Switcher & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => setScreensViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  screensViewMode === 'grid'
                    ? 'shadow-sm text-white'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
                style={
                  screensViewMode === 'grid'
                    ? { backgroundColor: activeColor.primary }
                    : undefined
                }
              >
                <LayoutGrid size={13} />
                <span>Visual Screen Cards ({filteredScreens.length})</span>
              </button>
              <button
                onClick={() => setScreensViewMode('hierarchy')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  screensViewMode === 'hierarchy'
                    ? 'shadow-sm text-white'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
                style={
                  screensViewMode === 'hierarchy'
                    ? { backgroundColor: activeColor.primary }
                    : undefined
                }
              >
                <FolderTree size={13} />
                <span>Screen Hierarchy (V1 / V2 / V3)</span>
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="text"
                value={screenSearchQuery}
                onChange={(e) => setScreenSearchQuery(e.target.value)}
                placeholder="Filter 20 screens..."
                className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
              {screenSearchQuery && (
                <button
                  onClick={() => setScreenSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-neutral-400"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Category Flow Group Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'All', label: `All ${appBranding.appName} Screens (${screens.length})` },
              ...Array.from(
                new Set(screens.map((s) => s.moduleGroup || s.category || 'Core Flow'))
              ).map((groupName, gIdx) => ({
                id: groupName,
                label: `${gIdx + 1}. ${groupName} (${
                  screens.filter((s) => (s.moduleGroup || s.category || 'Core Flow') === groupName)
                    .length
                })`,
              })),
            ].map((mod) => {
              const active = activeModuleFilter === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleFilter(mod.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition border ${
                    active
                      ? 'text-white border-transparent shadow-xs'
                      : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100'
                  }`}
                  style={active ? { backgroundColor: activeColor.primary } : undefined}
                >
                  {mod.label}
                </button>
              );
            })}
          </div>

          {screensViewMode === 'hierarchy' ? (
            <VisualNavigationLinkBuilder
              projectName={appBranding.appName}
              screens={linkableScreens.filter((ls) =>
                filteredScreens.some((fs) => fs.id === ls.id)
              )}
              currentScreenId={currentScreenId}
              primaryColor={activeColor.primary}
              isSingleVariantMode={isSingleVariantMode}
              connections={navigationConnections}
              onConnectionsChange={handleUpdateNavigationConnections}
              onSelectScreenVariant={(screenId, variantId) => {
                const v = (variantId as 'v1' | 'v2' | 'v3') || 'v1';
                setSingleVariant(screenId, v);
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredScreens.map((item, sIdx) => {
                const isSelected = currentScreenId === item.id;
                const activeVar = variantsMap[item.id] || 'v1';
                const bannerImg =
                  item.heroBannerImage ||
                  item.referenceImageUri ||
                  DEFAULT_FALLBACK_IMAGES[sIdx % DEFAULT_FALLBACK_IMAGES.length];
                const roleLabel =
                  item.screenType?.toUpperCase() ||
                  ['DISCOVER', 'CATALOG', 'CHECKOUT', 'TRACKER', 'PROFILE'][sIdx % 5];

                return (
                  <div
                    key={item.id}
                    onClick={() => setCurrentScreenId(item.id)}
                    className={`rounded-2xl overflow-hidden transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white dark:bg-neutral-900 border-2 shadow-lg'
                        : 'bg-white dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300'
                    }`}
                    style={isSelected ? { borderColor: activeColor.primary } : undefined}
                  >
                    <div>
                      <div className="relative h-32 w-full overflow-hidden bg-neutral-900">
                        <img
                          src={bannerImg}
                          alt={item.label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[9px] font-extrabold uppercase">
                            {roleLabel} • {activeVar.toUpperCase()}
                          </span>
                          <span
                            className="px-2 py-0.5 rounded-lg text-[10px] font-bold text-white flex items-center gap-1 shadow"
                            style={{
                              backgroundColor: isSelected ? activeColor.primary : '#334155',
                            }}
                          >
                            <Eye size={10} />
                            <span>{isSelected ? 'Live on Phone' : 'Preview'}</span>
                          </span>
                        </div>
                        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-end justify-between text-white">
                          <h3 className="text-sm font-extrabold drop-shadow">{item.label}</h3>
                          <span className="text-[10px] font-black bg-white/20 backdrop-blur-md px-2 py-0.5 rounded">
                            {item.heroMetricValue}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5">
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-3">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-neutral-400">
                            {isSingleVariantMode
                              ? `screens/${item.id}/index.tsx`
                              : `screens/${item.id}/varient_${activeVar.replace('v', '')}`}
                          </span>
                          <span className="text-[10px] font-extrabold text-emerald-600">
                            {isSingleVariantMode ? 'Single Screen (No Variants)' : '3 Variants Ready'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Variant Buttons on Card (or Single Layout Action if Single Mode) */}
                    <div className="px-3.5 pb-3.5 pt-2.5 border-t border-neutral-100 dark:border-neutral-800">
                      {isSingleVariantMode ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentScreenId(item.id);
                          }}
                          className="w-full py-1.5 px-3 rounded-lg text-[10px] font-extrabold text-white transition shadow-xs"
                          style={{ backgroundColor: activeColor.primary }}
                        >
                          Single Layout Active • Preview on Phone
                        </button>
                      ) : (
                        <div className="grid grid-cols-3 gap-1.5">
                          {allowedVariants.map((v) => {
                            const isVarActive = activeVar === v;
                            return (
                              <button
                                key={v}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSingleVariant(item.id, v);
                                }}
                                className={`py-1.5 px-2 rounded-lg text-[10px] font-extrabold truncate transition ${
                                  isVarActive
                                    ? 'text-white shadow-xs'
                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                                }`}
                                style={
                                  isVarActive ? { backgroundColor: activeColor.primary } : undefined
                                }
                              >
                                {v === 'v1' ? 'V1 Classic' : v === 'v2' ? 'V2 Bento' : 'V3 Glass'}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. DESIGN SYSTEM TAB */}
      {activeStudioTab === 'theme' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                Color Theme Presets
              </h3>
              <p className="text-xs text-neutral-500">
                Instantly update all screens in {appBranding.appName}.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {COLOR_PRESETS.map((preset) => {
                const active = selectedColorPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedColorPreset(preset.id)}
                    className={`p-3 rounded-xl border text-left transition flex items-center gap-3 ${
                      active
                        ? 'border-2 bg-neutral-50 dark:bg-neutral-800'
                        : 'border-neutral-200 dark:border-neutral-800'
                    }`}
                    style={active ? { borderColor: activeColor.primary } : undefined}
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: preset.swatch }}
                    >
                      {active && <Check size={14} color="#FFF" />}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{preset.name}</div>
                      <div className="text-[10px] font-mono text-neutral-400">{preset.swatch}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                Typography &amp; Font Pairing
              </h3>
              <p className="text-xs text-neutral-500">Select global font family for your app.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {FONT_PRESETS.map((font) => {
                const active = selectedFontPreset === font.id;
                return (
                  <button
                    key={font.id}
                    onClick={() => setSelectedFontPreset(font.id)}
                    className={`p-3.5 rounded-xl border text-left transition ${
                      active
                        ? 'border-2 bg-neutral-50 dark:bg-neutral-800'
                        : 'border-neutral-200 dark:border-neutral-800'
                    }`}
                    style={active ? { borderColor: activeColor.primary } : undefined}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{font.name}</span>
                      {active && <CheckCircle2 size={14} style={{ color: activeColor.primary }} />}
                    </div>
                    <div className="text-[10px] text-neutral-500">{font.category}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. APP BRANDING TAB */}
      {activeStudioTab === 'branding' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-5">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                White-Label App Branding &amp; Identity
              </h3>
              <p className="text-xs text-neutral-500">
                Changes automatically sync with the left project sidebar and APK compiler.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold">Application Display Name</label>
                <input
                  type="text"
                  value={appBranding.appName}
                  onChange={(e) =>
                    handleSaveBranding({ ...appBranding, appName: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold">Android / iOS Bundle Identifier</label>
                <input
                  type="text"
                  value={appBranding.packageName}
                  onChange={(e) =>
                    handleSaveBranding({ ...appBranding, packageName: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold">App Icon &amp; Launcher Logo</label>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-md overflow-hidden"
                  style={{ backgroundColor: activeColor.primary }}
                >
                  {appBranding.appLogoUri ? (
                    <img
                      src={appBranding.appLogoUri}
                      alt="Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    appBranding.appName.slice(0, 2).toUpperCase()
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold flex items-center gap-1.5">
                    <ImagePlus size={14} />
                    <span>Upload Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () =>
                            handleSaveBranding({
                              ...appBranding,
                              appLogoUri: reader.result as string,
                            });
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  {appBranding.appLogoUri && (
                    <button
                      onClick={() => handleSaveBranding({ ...appBranding, appLogoUri: '' })}
                      className="p-2 rounded-xl border border-rose-200 text-rose-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. BUILD APK & ZIP TAB */}
      {activeStudioTab === 'export' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: activeColor.primary }}
                >
                  <Smartphone size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    One-Click Android APK Builder
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Compile {appBranding.appName} ({appBranding.packageName}) into a signed Android
                    APK.
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                V1+V2+V3 Signed APK
              </span>
            </div>

            {apkBuildState === 'idle' && (
              <button
                onClick={handleGenerateAndroidApk}
                className="w-full py-3 rounded-xl text-xs font-bold text-white shadow flex items-center justify-center gap-2"
                style={{ backgroundColor: activeColor.primary }}
              >
                <Smartphone size={15} />
                <span>Build Installable Android .APK</span>
              </button>
            )}

            {apkBuildState === 'building' && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Compiling Android Release APK...</span>
                  <span>{apkProgressPct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${apkProgressPct}%`,
                      backgroundColor: activeColor.primary,
                    }}
                  />
                </div>
              </div>
            )}

            {apkBuildState === 'ready' && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {appBranding.appName.toLowerCase().replace(/\s+/g, '-')}-v1.0.0.apk Ready!
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Signed universal APK • {screens.length} Screens bundled
                  </div>
                </div>
                <button
                  onClick={handleDownloadBuiltApk}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
                  style={{ backgroundColor: activeColor.primary }}
                >
                  <Download size={14} />
                  <span>Download APK</span>
                </button>
              </div>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: activeColor.primary }}
              >
                <FolderGit2 size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Full Expo Project Source Code (.ZIP)
                </h3>
                <p className="text-xs text-neutral-500">
                  Export complete React Native Expo source bundle for {appBranding.appName}.
                </p>
              </div>
            </div>

            <button
              onClick={handleExportZip}
              disabled={isZipping}
              className="w-full py-3 rounded-xl text-xs font-bold text-white shadow flex items-center justify-center gap-2"
              style={{ backgroundColor: activeColor.primary }}
            >
              <Download size={16} />
              <span>
                {isZipping ? 'Creating Project ZIP...' : 'Download Full Expo Project .ZIP'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: AI PROMPT TRAINER & MULTI-LAYOUT REGENERATOR                       */}
      {/* ========================================================================= */}
      {aiUpgradeModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => !isRegeneratingAi && setAiUpgradeModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#141720] border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="px-6 py-4 text-white flex items-center justify-between"
              style={{ backgroundColor: activeColor.primary }}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles size={18} />
                <h3 className="text-sm font-extrabold">
                  ✨ Train AI &amp; Regenerate {appBranding.appName} Screens
                </h3>
              </div>
              <button
                onClick={() => setAiUpgradeModalOpen(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20"
              >
                <X size={15} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Train Gemini AI on your exact app requirements. It will generate 5 distinct screens,
                each with 3 complete layout variants (<strong>V1 Classic Stack</strong>,{' '}
                <strong>V2 Bento Grid</strong>, and <strong>V3 Glass HUD</strong>).
              </p>

              <div className="flex flex-wrap gap-1.5">
                {[
                  '🏋️ Biometric Gym & Hypertrophy Coach with Macro Nutrition & Heart Rate Zone Tracker',
                  '🍔 Gourmet Burger & Ramen Delivery with Live Courier Radar & Express Cart',
                  '🛡 Stealth WireGuard VPN with 104 Global Server Nodes & Live Throughput Wave',
                  '🏡 Luxury Real Estate Penthouse 3D Tours, Mortgage Calculator & Escrow Tracker',
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAiUpgradePrompt(preset)}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-[11px] font-bold text-neutral-700 dark:text-neutral-200 transition text-left"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <textarea
                rows={4}
                value={aiUpgradePrompt}
                onChange={(e) => setAiUpgradePrompt(e.target.value)}
                placeholder="Describe your app's screens, features, items, and workflow..."
                className="w-full p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium focus:outline-none"
              />

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setAiUpgradeModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isRegeneratingAi}
                  onClick={() => handleRegenerateWithAi(aiUpgradePrompt, false)}
                  style={{ backgroundColor: activeColor.primary }}
                  className="px-5 py-2 rounded-xl text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md"
                >
                  <Wand2 size={14} className={isRegeneratingAi ? 'animate-spin' : ''} />
                  <span>
                    {isRegeneratingAi
                      ? 'Building Multi-Variant Screens...'
                      : 'Generate Screens & Variants Now'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT SCREEN HERO BANNER & ITEM IMAGES / PRICES                     */}
      {/* ========================================================================= */}
      {editingScreenSpec && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setEditingScreenSpec(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#141720] border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="px-6 py-4 text-white flex items-center justify-between"
              style={{ backgroundColor: activeColor.primary }}
            >
              <div className="flex items-center gap-2">
                <ImagePlus size={18} />
                <h3 className="text-sm font-extrabold">
                  Customize Screen Layout &amp; Photos — {editingScreenSpec.label}
                </h3>
              </div>
              <button
                onClick={() => setEditingScreenSpec(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20"
              >
                <X size={15} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">
                    Screen Layout Archetype &amp; Hero Banner
                  </span>
                  <select
                    value={editingScreenSpec.screenType || 'discover'}
                    onChange={(e) =>
                      setEditingScreenSpec({
                        ...editingScreenSpec,
                        screenType: e.target.value as CustomProjectScreenSpec['screenType'],
                      })
                    }
                    className="px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-xs font-bold"
                  >
                    <option value="splash">1. Splash &amp; Brand Launch</option>
                    <option value="onboarding">2. Feature Onboarding Carousel</option>
                    <option value="auth">3. Sign In / Sign Up / OTP Auth</option>
                    <option value="discover">4. Home &amp; Discovery Hub</option>
                    <option value="search">5. Search &amp; Filter Lab</option>
                    <option value="catalog">6. Catalog / Menu / Studio Grid</option>
                    <option value="detail">7. Item / Product Detail Showcase</option>
                    <option value="wishlist">8. Saved Favorites &amp; Wishlist</option>
                    <option value="notifications">9. Notifications &amp; Activity Center</option>
                    <option value="checkout">10. Interactive Cart / Plan Checkout</option>
                    <option value="payment">11. Payment Methods &amp; Digital Wallet</option>
                    <option value="tracker">12. Live GPS Radar / Telemetry Tracker</option>
                    <option value="analytics">13. Analytics, Insights &amp; Reports</option>
                    <option value="support">14. 24/7 VIP Concierge Chat &amp; Support</option>
                    <option value="profile">15. VIP Profile, Loyalty &amp; Settings</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold">Hero Headline</label>
                    <input
                      type="text"
                      value={editingScreenSpec.heroBannerTitle || ''}
                      onChange={(e) =>
                        setEditingScreenSpec({
                          ...editingScreenSpec,
                          heroBannerTitle: e.target.value,
                        })
                      }
                      className="w-full mt-1 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold">Hero Image URL (or Upload)</label>
                    <div className="flex items-center gap-1.5 mt-1">
                      <input
                        type="text"
                        value={editingScreenSpec.heroBannerImage || ''}
                        onChange={(e) =>
                          setEditingScreenSpec({
                            ...editingScreenSpec,
                            heroBannerImage: e.target.value,
                          })
                        }
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-mono"
                      />
                      <label
                        className="cursor-pointer px-3 py-2 rounded-xl text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: activeColor.primary }}
                      >
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) {
                              const r = new FileReader();
                              r.onload = () =>
                                setEditingScreenSpec({
                                  ...editingScreenSpec,
                                  heroBannerImage: r.result as string,
                                });
                              r.readAsDataURL(f);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">
                    Screen Cards &amp; Item Photography ({editingScreenSpec.items.length})
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingScreenSpec({
                        ...editingScreenSpec,
                        items: [
                          ...editingScreenSpec.items,
                          {
                            title: 'New Featured Item',
                            subtitle: 'High-impact interactive card',
                            badge: 'NEW',
                            value: '$19.00',
                            imageUrl: DEFAULT_FALLBACK_IMAGES[1],
                            rating: '4.9 ★',
                            actionLabel: '+ Add',
                          },
                        ],
                      })
                    }
                    className="text-xs font-extrabold flex items-center gap-1"
                    style={{ color: activeColor.primary }}
                  >
                    <Plus size={13} />
                    <span>Add Item Card</span>
                  </button>
                </div>

                {editingScreenSpec.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-start gap-3"
                  >
                    <img
                      src={
                        it.imageUrl ||
                        DEFAULT_FALLBACK_IMAGES[idx % DEFAULT_FALLBACK_IMAGES.length]
                      }
                      alt={it.title}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-neutral-200"
                    />
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={it.title}
                        onChange={(e) => {
                          const next = [...editingScreenSpec.items];
                          next[idx] = { ...it, title: e.target.value };
                          setEditingScreenSpec({ ...editingScreenSpec, items: next });
                        }}
                        placeholder="Item title"
                        className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={it.value}
                        onChange={(e) => {
                          const next = [...editingScreenSpec.items];
                          next[idx] = { ...it, value: e.target.value };
                          setEditingScreenSpec({ ...editingScreenSpec, items: next });
                        }}
                        placeholder="Price / Value"
                        className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold"
                      />
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={it.imageUrl || ''}
                          onChange={(e) => {
                            const next = [...editingScreenSpec.items];
                            next[idx] = { ...it, imageUrl: e.target.value };
                            setEditingScreenSpec({ ...editingScreenSpec, items: next });
                          }}
                          placeholder="Image URL"
                          className="flex-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-[10px] font-mono"
                        />
                        <label className="cursor-pointer px-2 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-[10px] font-bold">
                          Img
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  const next = [...editingScreenSpec.items];
                                  next[idx] = { ...it, imageUrl: reader.result as string };
                                  setEditingScreenSpec({ ...editingScreenSpec, items: next });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingScreenSpec(null)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveEditedScreenSpec(editingScreenSpec)}
                  style={{ backgroundColor: activeColor.primary }}
                  className="px-5 py-2 rounded-xl text-white text-xs font-extrabold shadow-md"
                >
                  Save Screen Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: AI SCREEN ARCHITECTURE & LAYOUT OPTIMIZER                          */}
      {/* ========================================================================= */}
      {aiOptimizerModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => !isAnalyzingOptimization && setAiOptimizerModalOpen(false)}
        >
          <div
            className="w-full max-w-4xl rounded-3xl bg-white dark:bg-[#141720] border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-2xl flex flex-col max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="px-6 py-4 text-white flex items-center justify-between flex-shrink-0"
              style={{ backgroundColor: activeColor.primary }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={18} className={isAnalyzingOptimization ? 'animate-spin' : ''} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold truncate">
                      AI Screen Architecture &amp; Layout Optimizer — {appBranding.appName}
                    </h3>
                    <span className="px-2 py-0.5 rounded-md bg-white/20 text-[10px] font-black uppercase">
                      {project.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/25 text-[10px] font-black uppercase">
                      Active: {resolvedScreenType}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/80 truncate">
                    Analyzes your {screens.length}-screen hierarchy, category patterns, and active{' '}
                    {activeScreenObj.label} screen to suggest high-converting layout improvements
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  disabled={isAnalyzingOptimization}
                  onClick={handleTriggerAiLayoutOptimization}
                  className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-[11px] font-extrabold transition"
                >
                  {isAnalyzingOptimization ? 'Analyzing...' : '↻ Re-Analyze'}
                </button>
                <button
                  type="button"
                  onClick={() => setAiOptimizerModalOpen(false)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              {isAnalyzingOptimization ? (
                <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg animate-pulse"
                    style={{ backgroundColor: activeColor.primary }}
                  >
                    <Sparkles size={26} className="animate-spin" />
                  </div>
                  <div className="text-sm font-extrabold text-neutral-900 dark:text-white">
                    {aiModelDisplayName} Auditing {appBranding.appName} Screen Architecture...
                  </div>
                  <p className="text-xs text-neutral-500 max-w-md">
                    Evaluating thumb-zone reachability, information density, KPI hierarchy, and
                    optimal V1/V2/V3 layout variants for <strong>{project.category}</strong> &bull;{' '}
                    <strong>{activeScreenObj.label}</strong> ({resolvedScreenType.toUpperCase()}).
                  </p>
                </div>
              ) : aiOptimizationReport ? (
                <>
                  {/* Top Architecture Audit Summary Card */}
                  <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div
                        className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white font-black flex-shrink-0 shadow-md"
                        style={{ backgroundColor: activeColor.primary }}
                      >
                        <span className="text-lg leading-none">
                          {aiOptimizationReport.overallScore || 94}
                        </span>
                        <span className="text-[8px] uppercase tracking-wider opacity-85 mt-0.5">
                          UX Score
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-extrabold text-neutral-900 dark:text-white">
                            {aiModelDisplayName} Architectural Verdict
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold">
                            {aiOptimizationReport.recommendations?.length || 0} Screen Optimizations
                            Ready
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                          {aiOptimizationReport.architectureVerdict}
                        </p>
                        {Array.isArray(aiOptimizationReport.categoryBestPractices) && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {aiOptimizationReport.categoryBestPractices.map(
                              (tip: string, tIdx: number) => (
                                <span
                                  key={tIdx}
                                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-[10px] font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1"
                                >
                                  <CheckCircle2 size={11} className="text-emerald-500 flex-shrink-0" />
                                  <span>{tip}</span>
                                </span>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleApplyAllScreenOptimizations}
                      style={{ backgroundColor: activeColor.primary }}
                      className="px-4 py-2.5 rounded-xl text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:opacity-95 transition flex-shrink-0 cursor-pointer"
                    >
                      <Sparkles size={14} />
                      <span>⚡ Apply All Optimizations</span>
                    </button>
                  </div>

                  {/* Per-Screen Layout Optimization Cards */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-500">
                        Recommended Screen-by-Screen Layout Improvements (
                        {aiOptimizationReport.recommendations?.length || 0})
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        Click &ldquo;Apply Optimization&rdquo; to update screen copy, pills, metrics &amp; active variant
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {(aiOptimizationReport.recommendations || []).map((rec: any, rIdx: number) => {
                        const isApplied = appliedOptimizationIds.includes(rec.screenId);
                        const isCurrentActive = rec.screenId === activeScreenObj.id;
                        return (
                          <div
                            key={`${rec.screenId}-${rIdx}`}
                            className={`p-4 rounded-2xl border transition flex flex-col justify-between gap-3 ${
                              isCurrentActive
                                ? 'bg-indigo-50/30 dark:bg-indigo-950/20 border-indigo-400/60 dark:border-indigo-700'
                                : 'bg-neutral-50/70 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800'
                            }`}
                          >
                            <div className="space-y-2.5">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="text-xs font-extrabold text-neutral-900 dark:text-white">
                                      {rec.screenLabel}
                                    </span>
                                    {isCurrentActive && (
                                      <span className="px-1.5 py-0.5 rounded bg-indigo-600 text-white text-[9px] font-black uppercase">
                                        Active Screen
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                    <span className="px-2 py-0.5 rounded-md bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[9px] font-extrabold uppercase">
                                      Role: {rec.screenType}
                                    </span>
                                    <span
                                      className="px-2 py-0.5 rounded-md text-white text-[9px] font-extrabold uppercase"
                                      style={{ backgroundColor: activeColor.primary }}
                                    >
                                      Recommended: {String(rec.recommendedVariant || 'v2').toUpperCase()} •{' '}
                                      {rec.layoutPatternName}
                                    </span>
                                  </div>
                                </div>

                                <span className="px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold flex-shrink-0">
                                  {rec.expectedConversionLift}
                                </span>
                              </div>

                              <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                {rec.uxRationale}
                              </p>

                              {/* Optimized Layout Specs Preview */}
                              <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-950/70 border border-neutral-200/70 dark:border-neutral-800 space-y-1.5">
                                <div className="flex items-center justify-between text-[10px]">
                                  <span className="font-bold text-neutral-400 uppercase">
                                    Optimized Hero Banner
                                  </span>
                                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
                                    {rec.improvedHeroBadge}
                                  </span>
                                </div>
                                <div className="text-xs font-extrabold text-neutral-900 dark:text-white">
                                  {rec.improvedHeroTitle}
                                </div>
                                <div className="text-[11px] text-neutral-500">
                                  {rec.improvedHeroSubtitle}
                                </div>

                                <div className="flex flex-wrap gap-1 pt-1">
                                  {(rec.improvedFilterPills || []).slice(0, 4).map(
                                    (pill: string, pIdx: number) => (
                                      <span
                                        key={pIdx}
                                        className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[9px] font-bold text-neutral-700 dark:text-neutral-300"
                                      >
                                        {pill}
                                      </span>
                                    )
                                  )}
                                </div>

                                <div className="pt-1 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800/80 text-[10px]">
                                  <span className="font-bold text-neutral-500">
                                    {rec.improvedMetricLabel}:{' '}
                                    <strong className="text-neutral-900 dark:text-white">
                                      {rec.improvedMetricValue}
                                    </strong>
                                  </span>
                                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                                    {rec.improvedMetricDelta}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setCurrentScreenId(rec.screenId);
                                  triggerSimToast(`Previewing ${rec.screenLabel} on simulator`);
                                }}
                                className="px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[11px] font-bold text-neutral-700 dark:text-neutral-200 flex items-center gap-1 hover:bg-neutral-100 transition cursor-pointer"
                              >
                                <Eye size={12} />
                                <span>Focus Screen</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleApplySingleScreenOptimization(rec)}
                                style={
                                  isApplied
                                    ? undefined
                                    : { backgroundColor: activeColor.primary }
                                }
                                className={`px-3.5 py-1.5 rounded-xl text-[11px] font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
                                  isApplied
                                    ? 'bg-emerald-600 text-white'
                                    : 'text-white shadow-xs hover:opacity-95'
                                }`}
                              >
                                {isApplied ? (
                                  <>
                                    <Check size={12} />
                                    <span>Optimization Applied ✓</span>
                                  </>
                                ) : (
                                  <>
                                    <Sparkles size={12} />
                                    <span>
                                      Apply {String(rec.recommendedVariant || 'v2').toUpperCase()} Layout
                                    </span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* AI Suggested Missing Architecture Screen for Category */}
                  {aiOptimizationReport.suggestedNewScreen && (
                    <div className="p-4 rounded-2xl border-2 border-dashed border-emerald-500/40 bg-emerald-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-black uppercase">
                            AI Architecture Gap Detected
                          </span>
                          <span className="text-xs font-extrabold text-neutral-900 dark:text-white">
                            {aiOptimizationReport.suggestedNewScreen.label}
                          </span>
                          <span className="text-[10px] font-bold text-neutral-400">
                            ({aiOptimizationReport.suggestedNewScreen.screenType?.toUpperCase()})
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300">
                          {aiOptimizationReport.suggestedNewScreen.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={suggestedScreenAdded}
                        onClick={handleAddAiSuggestedScreen}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 flex-shrink-0 transition cursor-pointer ${
                          suggestedScreenAdded
                            ? 'bg-emerald-600/20 text-emerald-500 cursor-default'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                        }`}
                      >
                        {suggestedScreenAdded ? (
                          <>
                            <Check size={14} />
                            <span>Added to Architecture ✓</span>
                          </>
                        ) : (
                          <>
                            <Plus size={14} />
                            <span>Add Screen to Architecture</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal inside CustomProjectApp */}
      {confirmDeleteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setConfirmDeleteOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white dark:bg-[#141720] border border-neutral-200 dark:border-neutral-800 p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-600 flex items-center justify-center flex-shrink-0">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                  Delete {appBranding.appName}?
                </h3>
                <p className="text-xs text-neutral-500">
                  This custom project will be permanently removed from your workspace.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteOpen(false)}
                className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteCurrentProject}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold flex items-center gap-1.5"
              >
                <Trash2 size={14} />
                <span>Yes, Delete Project</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // =========================================================================
  // MOBILE SIMULATOR CONTENT WITH 20-SCREEN STRIP + 5-TAB BOTTOM NAVIGATION BAR
  // =========================================================================
  const rawBottomCandidates = [
    screens.find((s) => s.screenType === 'discover') || screens[0],
    screens.find((s) => s.screenType === 'catalog') || screens[1],
    screens.find((s) => s.screenType === 'checkout') || screens[2],
    screens.find((s) => s.screenType === 'tracker') || screens[3],
    screens.find((s) => s.screenType === 'profile') || screens[4],
    ...screens.slice(0, 5),
  ].filter(Boolean) as CustomProjectScreenSpec[];

  const primaryBottomScreens: CustomProjectScreenSpec[] = [];
  const seenBottomIds = new Set<string>();
  for (const cand of rawBottomCandidates) {
    if (cand && !seenBottomIds.has(cand.id) && primaryBottomScreens.length < 5) {
      seenBottomIds.add(cand.id);
      primaryBottomScreens.push(cand);
    }
  }

  const mobileContent = (
    <div className="flex-1 w-full h-full flex flex-col overflow-hidden">
      {/* Quick 20-Screen Horizontal Jump Strip inside Simulator */}
      <div
        className={`px-2 py-1.5 border-b flex items-center gap-1 overflow-x-auto no-scrollbar flex-shrink-0 ${
          isDark ? 'bg-[#0B0F19] border-slate-800/80' : 'bg-slate-50 border-slate-200/80'
        }`}
      >
        {screens.map((scr, idx) => {
          const active = activeScreenObj.id === scr.id;
          return (
            <button
              key={`strip-${scr.id}-${idx}`}
              onClick={() => setCurrentScreenId(scr.id)}
              className={`px-2 py-0.5 rounded-lg text-[9px] font-extrabold whitespace-nowrap transition flex-shrink-0 ${
                active
                  ? 'text-white shadow-xs'
                  : isDark
                  ? 'bg-slate-800/80 text-slate-400 hover:text-white'
                  : 'bg-white text-slate-600 border border-slate-200/70'
              }`}
              style={active ? { backgroundColor: activeColor.primary } : undefined}
            >
              {idx + 1}. {scr.label.replace(/^\d+\.\s*/, '')}
            </button>
          );
        })}
      </div>

      <div className="flex-1 w-full h-full flex flex-col overflow-y-auto no-scrollbar">
        {renderSimulatedMobileScreen()}
      </div>

      {/* Bottom Navigation Bar across the 5 Core App Tabs */}
      <div
        className={`h-16 border-t flex items-center justify-around px-1.5 flex-shrink-0 z-40 ${
          isDark ? 'bg-[#0B0F19] border-slate-800' : 'bg-white border-slate-200/80'
        }`}
      >
        {primaryBottomScreens.map((scr, idx) => {
          const isCurrent = activeScreenObj.id === scr.id;
          const icons = [LayoutDashboard, Layers, ShoppingBag, Navigation, SlidersHorizontal];
          const IconComp = icons[idx % icons.length];
          const shortTabName = scr.label
            .replace(/^\d+\.\s*/, '')
            .split('•')[0]
            .trim()
            .split(' ')[0];
          return (
            <button
              key={`bottom-tab-${scr.id}-${idx}`}
              onClick={() => setCurrentScreenId(scr.id)}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${
                isCurrent
                  ? ''
                  : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              style={isCurrent ? { color: activeColor.primary } : undefined}
            >
              <IconComp size={18} strokeWidth={isCurrent ? 2.5 : 2} />
              <span className="text-[9px] font-extrabold truncate max-w-[60px]">
                {shortTabName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const variantOptions = isSingleVariantMode
    ? [{ id: 'v1', label: 'Single Layout (No Variants)' }]
    : [
        { id: 'v1', label: getVariantLabel(activeScreenObj, 'v1') },
        { id: 'v2', label: getVariantLabel(activeScreenObj, 'v2') },
        { id: 'v3', label: getVariantLabel(activeScreenObj, 'v3') },
      ];

  return (
    <StudioDashboardShell
      activeProjectId={project.id}
      projectName={appBranding.appName}
      activeScreenLabel={activeScreenObj.label}
      activeVariantLabel={currentVariant.toUpperCase()}
      activeStudioTab={activeStudioTab}
      onSelectStudioTab={setActiveStudioTab}
      onSwitchProject={onSwitchProject}
      isDark={isDark}
      onToggleTheme={() => setIsDark(!isDark)}
      primaryColor={activeColor.primary}
      primaryTextColor="#FFFFFF"
      isSkeletonActive={isSkeletonActive}
      onToggleSkeleton={() => setIsSkeletonActive(!isSkeletonActive)}
      onExportZip={handleExportZip}
      isZipping={isZipping}
      extraTopActions={
        <button
          onClick={handleTriggerAiLayoutOptimization}
          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
          title="AI Analyze Screen Architecture & Optimize Layouts"
        >
          <Sparkles size={13} />
          <span>AI Optimize Layout</span>
        </button>
      }
      variantOptions={variantOptions}
      currentVariantId={currentVariant}
      onChangeVariant={(v) => setSingleVariant(activeScreenObj.id, v as 'v1' | 'v2' | 'v3')}
      onReloadSimulator={() => setSingleVariant(activeScreenObj.id, currentVariant)}
      colorSwatches={COLOR_PRESETS.map((p) => ({ id: p.id, name: p.name, swatch: p.swatch }))}
      activeColorId={selectedColorPreset}
      onSelectColorSwatch={setSelectedColorPreset}
      activeFontName={activeFont.name}
      middleContent={middleContent}
      mobileContent={mobileContent}
    />
  );
};

export default CustomProjectApp;
