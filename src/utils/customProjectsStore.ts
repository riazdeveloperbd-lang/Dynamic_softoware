export interface CustomProjectScreenItem {
  title: string;
  subtitle: string;
  badge: string;
  value: string;
  imageUrl?: string;
  rating?: string;
  meta?: string;
  actionLabel?: string;
}

export type CustomScreenRoleType =
  | 'splash'
  | 'onboarding'
  | 'auth'
  | 'discover'
  | 'search'
  | 'catalog'
  | 'detail'
  | 'wishlist'
  | 'notifications'
  | 'checkout'
  | 'payment'
  | 'tracker'
  | 'analytics'
  | 'support'
  | 'profile';

export interface CustomProjectScreenSpec {
  id: string;
  label: string;
  category: string;
  moduleGroup?: string;
  description: string;
  v1Name: string;
  v2Name: string;
  v3Name?: string;
  screenType?: CustomScreenRoleType;
  heroBannerTitle?: string;
  heroBannerSubtitle?: string;
  heroBannerBadge?: string;
  heroBannerImage?: string;
  searchPlaceholder?: string;
  filterPills?: string[];
  heroMetricLabel: string;
  heroMetricValue: string;
  heroMetricDelta: string;
  referenceImageUri?: string;
  items: CustomProjectScreenItem[];
}

export type AIModelProviderType =
  | 'gemini_2_5_pro'
  | 'chatgpt_4o'
  | 'claude_3_7_sonnet'
  | 'deepseek_r1';

export interface ScreenNavigationConnection {
  id: string;
  sourceScreenId: string;
  sourceVariant: string;
  targetScreenId: string;
  targetVariant: string;
  triggerLabel: string;
  transitionType?: 'push' | 'modal' | 'replace' | 'tab';
}

export interface CustomProjectDefinition {
  id: string;
  name: string;
  packageName: string;
  details: string;
  category: string;
  variantMode: 'single' | 'two_variants';
  aiModelProvider?: AIModelProviderType;
  selectedModules?: string[];
  navigationConnections?: ScreenNavigationConnection[];
  primaryColor: string;
  appLogoUri?: string;
  designImages?: string[];
  createdAt: number;
  screens: CustomProjectScreenSpec[];
}

const STORAGE_KEY = 'appforge_custom_projects_v2';

export function loadCustomProjects(): CustomProjectDefinition[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomProjects(projects: CustomProjectDefinition[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event('custom-projects-updated'));
  } catch {
    // ignore storage quota errors
  }
}

export function addCustomProject(project: CustomProjectDefinition): CustomProjectDefinition[] {
  const existing = loadCustomProjects();
  const updated = [project, ...existing.filter((p) => p.id !== project.id)];
  saveCustomProjects(updated);
  return updated;
}

export function updateCustomProject(project: CustomProjectDefinition): CustomProjectDefinition[] {
  const existing = loadCustomProjects();
  const updated = existing.map((p) => (p.id === project.id ? project : p));
  saveCustomProjects(updated);
  return updated;
}

export function deleteCustomProject(projectId: string): CustomProjectDefinition[] {
  const existing = loadCustomProjects();
  const updated = existing.filter((p) => p.id !== projectId);
  saveCustomProjects(updated);
  return updated;
}
