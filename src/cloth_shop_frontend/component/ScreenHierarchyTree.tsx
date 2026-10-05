import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Eye,
  Check,
  Smartphone,
  Layers,
  ArrowRight,
  FolderTree,
  Sparkles,
  ShoppingBag,
  Search as SearchIcon,
  Heart,
  User,
  Shield,
  CreditCard,
  MapPin,
  Bell,
  HelpCircle,
  Headphones,
  Package,
  RotateCcw,
  CheckCircle2,
  Lock,
  KeyRound,
  FileText,
  SlidersHorizontal,
  Compass,
} from 'lucide-react';
import { ScreenName, ScreenVariant } from '../store/slices/appSlice';
import { useTheme } from '../hooks';

export interface HierarchyTreeNode {
  id: string;
  screen: ScreenName;
  label: string;
  flowRole: string;
  triggerDescription: string;
  icon?: any;
  defaultExpanded?: boolean;
  children?: HierarchyTreeNode[];
}

export const APP_NAVIGATION_HIERARCHY: HierarchyTreeNode = {
  id: 'root-app',
  screen: 'Homepage',
  label: 'Define Atelier Root Application',
  flowRole: 'Root Shell',
  triggerDescription: 'Global Application Shell & Navigation State Provider',
  icon: Smartphone,
  defaultExpanded: true,
  children: [
    {
      id: 'flow-auth',
      screen: 'Splash',
      label: 'Onboarding & Auth Flow',
      flowRole: 'Onboarding Pipeline',
      triggerDescription: 'First Launch & Guest Session Onboarding',
      icon: Lock,
      defaultExpanded: true,
      children: [
        {
          id: 'screen-splash',
          screen: 'Splash',
          label: 'Splash Screen',
          flowRole: 'Entry Gateway',
          triggerDescription: 'Initial App Launch & Animated Brand Monogram',
          icon: Sparkles,
          defaultExpanded: true,
          children: [
            {
              id: 'screen-onboarding',
              screen: 'Onboarding',
              label: 'Onboarding Walkthrough',
              flowRole: 'Walkthrough',
              triggerDescription: 'On Splash Timer / Tap (Interactive Lookbook)',
              icon: Compass,
              defaultExpanded: true,
              children: [
                {
                  id: 'screen-signup',
                  screen: 'SignUp',
                  label: 'SignUp Screen',
                  flowRole: 'Registration',
                  triggerDescription: 'On Tap "Create Account" / "Quick Join"',
                  icon: User,
                  defaultExpanded: true,
                  children: [
                    {
                      id: 'screen-verify-signup',
                      screen: 'VerificationCode',
                      label: 'Verification Code',
                      flowRole: '2FA Security',
                      triggerDescription: 'On Form Submit (4-Digit SMS OTP)',
                      icon: KeyRound,
                      defaultExpanded: true,
                      children: [
                        {
                          id: 'screen-home-from-signup',
                          screen: 'Homepage',
                          label: 'Homepage (Welcome)',
                          flowRole: 'Store Entry',
                          triggerDescription: 'On OTP Verified & Profile Initialized',
                          icon: ShoppingBag,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'screen-login',
                  screen: 'Login',
                  label: 'Login Screen',
                  flowRole: 'Authentication',
                  triggerDescription: 'On Tap "Sign In" / Biometric Passkey',
                  icon: Lock,
                  defaultExpanded: true,
                  children: [
                    {
                      id: 'screen-forgot-pwd',
                      screen: 'ForgotPassword',
                      label: 'Forgot Password',
                      flowRole: 'Account Recovery',
                      triggerDescription: 'On Tap "Forgot Password?"',
                      icon: HelpCircle,
                      defaultExpanded: true,
                      children: [
                        {
                          id: 'screen-verify-pwd',
                          screen: 'VerificationCode',
                          label: 'Verification Code (2FA)',
                          flowRole: 'Recovery OTP',
                          triggerDescription: 'On SMS / Email Channel Selected',
                          icon: KeyRound,
                          defaultExpanded: true,
                          children: [
                            {
                              id: 'screen-reset-pwd',
                              screen: 'ResetPassword',
                              label: 'Reset Password',
                              flowRole: 'Credential Update',
                              triggerDescription: 'On Verification OTP Validated',
                              icon: Shield,
                              defaultExpanded: true,
                              children: [
                                {
                                  id: 'screen-login-return',
                                  screen: 'Login',
                                  label: 'Login (Re-authenticate)',
                                  flowRole: 'Auth Return',
                                  triggerDescription: 'On Password Successfully Reset',
                                  icon: Lock,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 'screen-home-from-login',
                      screen: 'Homepage',
                      label: 'Homepage (Storefront)',
                      flowRole: 'Authenticated Hub',
                      triggerDescription: 'On Credentials / Passkey Validated',
                      icon: ShoppingBag,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'flow-bottom-tabs',
      screen: 'Homepage',
      label: 'Main Store & Bottom Navigation Hub (5 Root Tabs)',
      flowRole: 'Tab Navigation Hub',
      triggerDescription: 'Primary Consumer Interface with 5 Bottom Tabs',
      icon: Layers,
      defaultExpanded: true,
      children: [
        {
          id: 'tab-home',
          screen: 'Homepage',
          label: 'Tab 1: Homepage (Storefront)',
          flowRole: 'Bottom Tab Root',
          triggerDescription: 'Bottom Tab "Home" · Hero Drops & Curated Outfits',
          icon: ShoppingBag,
          defaultExpanded: true,
          children: [
            {
              id: 'home-product-details',
              screen: 'ProductDetails',
              label: 'Product Details Showcase',
              flowRole: 'Product Dossier',
              triggerDescription: 'On Tap Any Product Tile / Flash Drop Card',
              icon: Sparkles,
              defaultExpanded: true,
              children: [
                {
                  id: 'pd-reviews',
                  screen: 'Reviews',
                  label: 'Product Reviews & Ratings',
                  flowRole: 'Customer Feedback',
                  triggerDescription: 'On Tap "View All Reviews" / Rating Breakdown',
                  icon: StarIcon,
                },
                {
                  id: 'pd-cart',
                  screen: 'MyCart',
                  label: 'My Cart / Bag Drawer',
                  flowRole: 'Bag Staging',
                  triggerDescription: 'On Tap "Add to Bag" / Quick Cart',
                  icon: ShoppingBag,
                },
              ],
            },
            {
              id: 'home-search',
              screen: 'Search',
              label: 'Search & Facet Filter',
              flowRole: 'Catalog Query',
              triggerDescription: 'On Tap Header Search Input',
              icon: SearchIcon,
            },
            {
              id: 'home-notifications',
              screen: 'Notifications',
              label: 'Notifications Inbox',
              flowRole: 'Alerts Timeline',
              triggerDescription: 'On Tap Bell Icon Header',
              icon: Bell,
            },
          ],
        },
        {
          id: 'tab-search',
          screen: 'Search',
          label: 'Tab 2: Visual Discovery (Search)',
          flowRole: 'Bottom Tab Root',
          triggerDescription: 'Bottom Tab "Search" · Visual Tags & Category Facets',
          icon: SearchIcon,
          defaultExpanded: true,
          children: [
            {
              id: 'search-product-details',
              screen: 'ProductDetails',
              label: 'Product Details (From Search)',
              flowRole: 'Result Dossier',
              triggerDescription: 'On Tap Search Result Item Card',
              icon: Sparkles,
            },
          ],
        },
        {
          id: 'tab-saved',
          screen: 'SavedItems',
          label: 'Tab 3: Wishlist & Closet (SavedItems)',
          flowRole: 'Bottom Tab Root',
          triggerDescription: 'Bottom Tab "Saved" · Curated Looks & Moodboards',
          icon: Heart,
          defaultExpanded: true,
          children: [
            {
              id: 'saved-product-details',
              screen: 'ProductDetails',
              label: 'Product Details (From Wishlist)',
              flowRole: 'Saved Item Dossier',
              triggerDescription: 'On Tap Wishlist Product Card',
              icon: Sparkles,
            },
          ],
        },
        {
          id: 'tab-cart',
          screen: 'MyCart',
          label: 'Tab 4: Shopping Bag (MyCart)',
          flowRole: 'Bottom Tab Root',
          triggerDescription: 'Bottom Tab "Cart" · Bag Summary & Promo Codes',
          icon: ShoppingBag,
          defaultExpanded: true,
          children: [
            {
              id: 'cart-checkout',
              screen: 'Checkout',
              label: 'Checkout Stepper & Summary',
              flowRole: 'Order Checkout',
              triggerDescription: 'On Tap "Proceed to Checkout"',
              icon: CreditCard,
              defaultExpanded: true,
              children: [
                {
                  id: 'checkout-address',
                  screen: 'Address',
                  label: 'Delivery Address Book',
                  flowRole: 'Shipping Selector',
                  triggerDescription: 'On Tap "Change Address"',
                  icon: MapPin,
                  defaultExpanded: true,
                  children: [
                    {
                      id: 'address-new',
                      screen: 'NewAddress',
                      label: 'New Address Form & GPS Pin',
                      flowRole: 'Address Creation',
                      triggerDescription: 'On Tap "Add New Address"',
                      icon: MapPin,
                    },
                  ],
                },
                {
                  id: 'checkout-payment',
                  screen: 'PaymentMethod',
                  label: 'Payment Method Selector',
                  flowRole: 'Payment Vault',
                  triggerDescription: 'On Tap "Change Payment Method"',
                  icon: CreditCard,
                  defaultExpanded: true,
                  children: [
                    {
                      id: 'payment-new',
                      screen: 'NewCard',
                      label: 'New Credit Card Builder',
                      flowRole: 'Card Tokenizer',
                      triggerDescription: 'On Tap "Add New Card"',
                      icon: CreditCard,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'tab-account',
          screen: 'Account',
          label: 'Tab 5: Account & Atelier Hub (Account)',
          flowRole: 'Bottom Tab Root',
          triggerDescription: 'Bottom Tab "Account" · Profile & VIP Perks',
          icon: User,
          defaultExpanded: true,
          children: [
            {
              id: 'account-orders',
              screen: 'MyOrders',
              label: 'My Orders & Order History',
              flowRole: 'Parcels & Returns',
              triggerDescription: 'On Tap "My Orders"',
              icon: Package,
              defaultExpanded: true,
              children: [
                {
                  id: 'orders-track',
                  screen: 'TrackOrder',
                  label: 'Track Order & Courier Map',
                  flowRole: 'Live Tracking',
                  triggerDescription: 'On Tap "Track Parcel"',
                  icon: MapPin,
                },
              ],
            },
            {
              id: 'account-details',
              screen: 'MyDetails',
              label: 'My Details & Fit Matrix',
              flowRole: 'Personal Specs',
              triggerDescription: 'On Tap "My Details / Profile"',
              icon: User,
            },
            {
              id: 'account-address',
              screen: 'Address',
              label: 'Address Book Hub',
              flowRole: 'Saved Locations',
              triggerDescription: 'On Tap "Address Book"',
              icon: MapPin,
            },
            {
              id: 'account-payment',
              screen: 'PaymentMethod',
              label: 'Payment Vault Hub',
              flowRole: 'Saved Cards',
              triggerDescription: 'On Tap "Payment Methods"',
              icon: CreditCard,
            },
            {
              id: 'account-notifications',
              screen: 'Notifications',
              label: 'Notifications Timeline',
              flowRole: 'Alerts & Restocks',
              triggerDescription: 'On Tap "Notifications"',
              icon: Bell,
              defaultExpanded: true,
              children: [
                {
                  id: 'notifications-settings',
                  screen: 'NotificationSettings',
                  label: 'Notification Settings',
                  flowRole: 'Push / SMS Rules',
                  triggerDescription: 'On Tap Settings Gear / Rules',
                  icon: SlidersHorizontal,
                },
              ],
            },
            {
              id: 'account-faqs',
              screen: 'FAQs',
              label: 'FAQs & Sizing Care Guides',
              flowRole: 'Knowledge Base',
              triggerDescription: 'On Tap "FAQs"',
              icon: FileText,
            },
            {
              id: 'account-help',
              screen: 'HelpCenter',
              label: 'Help Center & Support Desk',
              flowRole: 'Concierge Portal',
              triggerDescription: 'On Tap "Help Center"',
              icon: Headphones,
              defaultExpanded: true,
              children: [
                {
                  id: 'help-service',
                  screen: 'CustomerService',
                  label: 'Customer Service Live Chat',
                  flowRole: 'Live Chat Ticket',
                  triggerDescription: 'On Tap "Chat with Specialist"',
                  icon: Headphones,
                },
              ],
            },
            {
              id: 'account-service',
              screen: 'CustomerService',
              label: 'Customer Service Chat',
              flowRole: 'Instant Support',
              triggerDescription: 'On Tap "Contact Support"',
              icon: Headphones,
            },
          ],
        },
      ],
    },
  ],
};

function StarIcon(props: any) {
  return <Sparkles {...props} />;
}

// Helper to gather all node IDs in tree for Expand All
function getAllNodeIds(node: HierarchyTreeNode): string[] {
  let ids = [node.id];
  if (node.children) {
    node.children.forEach((c) => {
      ids = ids.concat(getAllNodeIds(c));
    });
  }
  return ids;
}

export interface ScreenHierarchyTreeProps {
  currentScreen: ScreenName;
  currentVariant: ScreenVariant;
  exportSelections: Record<ScreenName, ScreenVariant>;
  onSelectScreen: (screen: ScreenName, variant?: ScreenVariant) => void;
  onSetExportVariant: (screen: ScreenName, variant: ScreenVariant) => void;
  searchQuery?: string;
}

export const ScreenHierarchyTree: React.FC<ScreenHierarchyTreeProps> = ({
  currentScreen,
  currentVariant,
  exportSelections,
  onSelectScreen,
  onSetExportVariant,
  searchQuery = '',
}) => {
  const { colors } = useTheme();
  const allIds = useMemo(() => getAllNodeIds(APP_NAVIGATION_HIERARCHY), []);

  // Default expanded set
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    function collectDefault(node: HierarchyTreeNode) {
      if (node.defaultExpanded) {
        initial.add(node.id);
      }
      if (node.children) {
        node.children.forEach(collectDefault);
      }
    }
    collectDefault(APP_NAVIGATION_HIERARCHY);
    return initial;
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => setExpandedIds(new Set(allIds));
  const collapseAll = () => setExpandedIds(new Set(['root-app']));

  const renderNode = (
    node: HierarchyTreeNode,
    depth = 0,
    isLastChild = false
  ) => {
    const hasChildren = Boolean(node.children && node.children.length > 0);
    const isExpanded = expandedIds.has(node.id);
    const isCurrentActive = currentScreen === node.screen;
    const currentExportVariant = exportSelections[node.screen] || 'varient_1';
    const IconComp = node.icon || Smartphone;

    const matchesSearch =
      searchQuery.trim().length > 0 &&
      (node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.screen.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.flowRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.triggerDescription.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      <div key={node.id} className="relative select-none">
        {/* Node Row Card */}
        <div
          className={`group flex items-start gap-2.5 py-2 px-3 rounded-xl transition-all ${
            isCurrentActive
              ? 'shadow-md ring-2 ring-black/10 dark:ring-white/10'
              : matchesSearch
              ? 'bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-neutral-900 dark:text-neutral-100'
              : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200 shadow-sm'
          }`}
          style={{
            marginLeft: `${depth * 22}px`,
            ...(isCurrentActive
              ? {
                  backgroundColor: colors.primary,
                  color: colors.primaryText,
                  borderColor: colors.primary,
                }
              : {}),
          }}
        >
          {/* Expand / Collapse Button */}
          {hasChildren ? (
            <button
              onClick={() => toggleExpand(node.id)}
              className="p-1 rounded-md transition mt-0.5 opacity-80 hover:opacity-100"
              style={{
                color: isCurrentActive ? colors.primaryText : undefined,
              }}
            >
              {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
            </button>
          ) : (
            <div className="w-5 flex items-center justify-center mt-1 opacity-40">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            </div>
          )}

          {/* Node Icon */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{
              backgroundColor: isCurrentActive
                ? 'rgba(255,255,255,0.22)'
                : undefined,
              color: isCurrentActive ? colors.primaryText : undefined,
            }}
          >
            <IconComp size={16} />
          </div>

          {/* Node Meta Content */}
          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold truncate">
                {node.label}
              </span>

              {/* Flow Role Tag */}
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: isCurrentActive
                    ? 'rgba(255,255,255,0.25)'
                    : undefined,
                  color: isCurrentActive ? colors.primaryText : undefined,
                }}
              >
                {node.flowRole}
              </span>

              {/* Active on Phone Badge */}
              {isCurrentActive && (
                <span
                  className="text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs"
                  style={{
                    backgroundColor: colors.primaryText,
                    color: colors.primary,
                  }}
                >
                  Active in Preview
                </span>
              )}
            </div>

            {/* Navigation Trigger Description */}
            <div
              className="text-[11px] font-medium mt-0.5 flex items-center gap-1 truncate opacity-90"
            >
              <ArrowRight size={11} className="flex-shrink-0 opacity-70" />
              <span className="truncate">{node.triggerDescription}</span>
              <span className="opacity-50">·</span>
              <span className="font-mono text-[10px] opacity-80 truncate">
                src/screens/{node.screen}
              </span>
            </div>

            {/* Variant Switchers for this node */}
            <div className="flex items-center gap-1.5 mt-2 flex-wrap pt-1.5 border-t border-black/10 dark:border-white/10">
              <span
                className="text-[10px] font-bold uppercase tracking-wider opacity-75"
              >
                Variants:
              </span>
              {(['varient_1', 'varient_2', 'varient_3', 'varient_4', 'varient_5', 'varient_6'] as const).map(
                (vId, vIdx) => {
                  const isNodeActiveVariant = isCurrentActive && currentVariant === vId;
                  const isExportVariant = currentExportVariant === vId;

                  return (
                    <button
                      key={vId}
                      onClick={() => {
                        onSetExportVariant(node.screen, vId);
                        onSelectScreen(node.screen, vId);
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-bold transition"
                      style={{
                        ...(isNodeActiveVariant
                          ? {
                              backgroundColor: colors.primaryText,
                              color: colors.primary,
                              boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                            }
                          : isExportVariant
                          ? isCurrentActive
                            ? {
                                backgroundColor: 'rgba(255,255,255,0.3)',
                                color: colors.primaryText,
                              }
                            : {
                                backgroundColor: colors.surfaceElevated,
                                color: colors.textPrimary,
                                border: `1px solid ${colors.primary}`,
                              }
                          : isCurrentActive
                          ? {
                              backgroundColor: 'rgba(255,255,255,0.12)',
                              color: colors.primaryText,
                            }
                          : undefined),
                      }}
                      title={`Select Variant ${vIdx + 1} for ${node.screen}`}
                    >
                      V{vIdx + 1}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Quick Preview Action */}
          <button
            onClick={() => onSelectScreen(node.screen, currentExportVariant)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 flex-shrink-0 transition self-center"
            style={{
              ...(isCurrentActive
                ? {
                    backgroundColor: colors.primaryText,
                    color: colors.primary,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }
                : undefined),
            }}
          >
            <Eye size={13} />
            <span>{isCurrentActive ? 'Viewing' : 'Preview'}</span>
          </button>
        </div>

        {/* Children Sub-branches with Visual Connectors */}
        {hasChildren && isExpanded && (
          <div className="relative mt-1.5 space-y-1.5 pl-3 border-l-2 border-dashed border-neutral-200 dark:border-neutral-800 ml-4">
            {node.children!.map((child, idx) =>
              renderNode(child, 0, idx === node.children!.length - 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Tree Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
            <FolderTree size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
              App Navigation Tree & User Flow Hierarchy
            </h4>
            <p className="text-[11px] text-neutral-500">
              Interactive tree visualization of authentic screen-to-screen routing paths.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-200 transition"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-200 transition"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Navigation Tree Graph */}
      <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
        {renderNode(APP_NAVIGATION_HIERARCHY, 0, false)}
      </div>
    </div>
  );
};

export default ScreenHierarchyTree;
