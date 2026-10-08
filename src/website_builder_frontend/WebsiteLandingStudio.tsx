import React, { useState, useMemo } from 'react';
import {
  Boxes,
  Smartphone,
  Globe,
  Menu,
  X,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Palette,
  Type,
  Download,
  Monitor,
  Tablet,
  Check,
  ChevronRight,
  Sparkles,
  BookOpen,
  ShoppingBag,
  Shield,
  Layers,
  LayoutTemplate,
  Star,
  HelpCircle,
  Mail,
  CreditCard,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Code2,
  SlidersHorizontal,
  Stethoscope,
  FolderTree,
  FileCode2,
  GripVertical,
  Move,
  HeartPulse,
  GraduationCap,
  Coffee,
  Trees,
  Briefcase,
  Car,
  Wrench,
  Leaf,
  Droplets,
  Dumbbell,
  Baby,
  Cpu,
  UtensilsCrossed,
  Scale,
  Compass,
} from 'lucide-react';
import JSZip from 'jszip';
import {
  DoctorCanvaEditorProvider,
  DoctorCanvaDrawerInspector,
  DoctorNavbar,
  DoctorHeroSection,
  DoctorAboutSection,
  DoctorServicesSection,
  DoctorCareJourneySection,
  DoctorAppointmentSection,
  DoctorFooter,
} from '../website/doctor_profile';
import {
  Doctor2Navbar,
  Doctor2HeroSection,
  Doctor2SpecializationsSection,
  Doctor2AboutSection,
  Doctor2ReviewsSection,
  Doctor2LocationSection,
  Doctor2Footer,
} from '../website/doctor_profile_2';
import {
  StoreEcommerceProvider,
  StoreNavbar,
  StoreHeroSection,
  StoreCatalogSection,
  StorePagesRouterSection,
  StoreFooter,
} from '../website/store_website';
import {
  StoreAdminNavbar,
  StoreAdminHeroOverviewSection,
  StoreAdminPagesRouterSection,
  StoreAdminFooter,
} from '../website/store_admin_website';
import {
  TeacherNavbar,
  TeacherHeroSection,
  TeacherAboutVideoCredentialsSection,
  TeacherServicesPricingSection,
  TeacherReviewsFaqSection,
  TeacherBookingContactSection,
  TeacherFooter,
} from '../website/teacher_profile';
import {
  CoffeeShopProvider,
  CoffeeNavbar,
  CoffeeHeroSection,
  CoffeeSubscriptionSection,
  CoffeeSeasonalMenuSection,
  CoffeeLocationsWholesaleStorySection,
  CoffeeFooter,
} from '../website/coffee_shop';
import {
  NexusNavbar,
  NexusHeroSection,
  NexusRoiCaseStudiesSection,
  NexusSolutionsBookingSection,
  NexusTestimonialsFooterSection,
} from '../website/nexus_growth_lab';
import {
  VerdantNavbar,
  VerdantHeroSection,
  VerdantEstimatorPortfolioSection,
  VerdantPackagesCoverageBookingSection,
  VerdantFaqFooterSection,
} from '../website/verdant_spaces';
import {
  AuditPulseNavbar,
  AuditPulseHeroSection,
  AuditPulseEstimatorBreakdownSection,
  AuditPulseSecurityProcessBookingSection,
  AuditPulsePricingFooterSection,
} from '../website/audit_pulse';
import {
  FractionalCoreNavbar,
  FractionalCoreHeroSection,
  FractionalCoreCalculatorDirectorySection,
  FractionalCoreAdvisoryMatchFormSection,
  FractionalCoreProofSitemapFooterSection,
} from '../website/fractional_core';
import {
  PanjabiStoreNavbar,
  PanjabiStoreHeroSection,
  PanjabiStoreSizeGuideFabricSection,
  PanjabiStoreExpressCodSection,
  PanjabiStoreReviewsFooterSection,
} from '../website/panjabi_store';
import {
  OrganicFruitsNavbar,
  OrganicFruitsHeroHarvestSection,
  OrganicFruitsCatalogTrustSection,
  OrganicFruitsBulkCalculatorCodSection,
  OrganicFruitsReviewsFooterSection,
} from '../website/organic_fruits_sweets';
import {
  AutoCareNavbar,
  AutoCareHeroCompatibilitySection,
  AutoCareCatalogComparisonSection,
  AutoCareBundlesCodSection,
  AutoCareReviewsFooterSection,
} from '../website/auto_bike_care';
import {
  PurePataNavbar,
  PurePataHeroTraceabilitySection,
  PurePataCatalogSteepingSection,
  PurePataSubscriptionCodSection,
  PurePataReviewsFooterSection,
} from '../website/purepata_tea';
import {
  RoohNavbar,
  RoohHeroScentFinderSection,
  RoohCatalogComparisonSection,
  RoohDiscoveryKitCodSection,
  RoohReviewsFooterSection,
} from '../website/rooh_perfumery';
import {
  FitGhorNavbar,
  FitGhorHeroSpecsSection,
  FitGhorCatalogLeadMagnetSection,
  FitGhorBdCheckoutSection,
  FitGhorSuccessFooterSection,
} from '../website/fitghor_fitness';
import {
  SmartBabuNavbar,
  SmartBabuHeroAgeAudioSection,
  SmartBabuCatalogSafetySection,
  SmartBabuGiftBundlesCodSection,
  SmartBabuParentCommunityFooterSection,
} from '../website/smartbabu_toys';
import {
  Tannery71Navbar,
  Tannery71HeroAuthenticitySection,
  Tannery71CollectionColorToggleSection,
  Tannery71UnboxingEngravingCheckoutSection,
  Tannery71CorporateWarrantyFooterSection,
} from '../website/tannery71_leather';
import {
  GadgetGhorNavbar,
  GadgetGhorHeroWarrantySerialSection,
  GadgetGhorCatalogSpecMatrixSection,
  GadgetGhorUnboxingFlashCodSection,
  GadgetGhorReviewsWarrantyFooterSection,
} from '../website/gadgetghor_tech';
import {
  SeoulGlowNavbar,
  SeoulGlowHeroQuizAuthenticatorSection,
  SeoulGlowCatalogQuizSection,
  SeoulGlowBundleRoutineCodSection,
  SeoulGlowProofFaqFooterSection,
} from '../website/seoulglow_kbeauty';
import {
  InboxShieldNavbar,
  InboxShieldHeroRiskGraderSection,
  InboxShieldPainSliderSection,
  InboxShieldPricingCheckoutSection,
  InboxShieldFaqFooterSection,
} from '../website/inboxshield_b2b';
import {
  ShiftPantryNavbar,
  ShiftPantryHeroHowItWorksSection,
  ShiftPantryCalculatorSection,
  ShiftPantryCuratedBoxesCheckoutSection,
  ShiftPantryTestimonialsFooterSection,
} from '../website/shiftpantry_b2b';
import {
  CareSerialNavbar,
  CareSerialHeroDirectorySection,
  CareSerialChamberSchedulerSection,
  CareSerialPatientIntakeSmsSection,
  CareSerialTrustClinicFooterSection,
} from '../website/careserial_bd';
import {
  EduTectNavbar,
  EduTectHeroCredentialsSection,
  EduTectCurriculumDemoSection,
  EduTectSuccessProofSection,
  EduTectPricingEnrollmentFaqFooterSection,
} from '../website/edutect_bd';
import {
  EduTeactStudentNavbar,
  EduTeactStudentOverviewWorkspaceSection,
  EduTeactStudentCoursePlayerSection,
  EduTeactStudentExamsResourcesSection,
  EduTeactStudentCommunityCertificateFooterSection,
} from '../website/eduteact_student';
import {
  KhabarDirectNavbar,
  KhabarDirectHeroZoneSection,
  KhabarDirectTabbedMenuSection,
  KhabarDirectCheckoutMfsSection,
  KhabarDirectTrustHygieneFooterSection,
} from '../website/khabardirect_bd';
import {
  LexChambersNavbar,
  LexChambersHeroPracticeSection,
  LexChambersPrecedentsProcessSection,
  LexChambersIntakeSchedulerSection,
  LexChambersInsightsFaqFooterSection,
} from '../website/lexchambers_bd';
import {
  AtelierFormaNavbar,
  AtelierFormaHeroMasonrySection,
  AtelierFormaBeforeAfterServicesSection,
  AtelierFormaCostEstimatorIntakeSection,
  AtelierFormaMaterialityTestimonialsFooterSection,
} from '../website/atelier_forma_bd';
import {
  CraftVectorNavbar,
  CraftVectorHeroCaseStudiesSection,
  CraftVectorPlaygroundProcessSection,
  CraftVectorEngagementScopeIntakeSection,
  CraftVectorEndorsementsFaqFooterSection,
} from '../website/craftvector_uiux';

export type WebsiteTemplateId =
  | 'craftvector_uiux'
  | 'atelier_forma_bd'
  | 'lexchambers_bd'
  | 'khabardirect_bd'
  | 'eduteact_student'
  | 'edutect_bd'
  | 'careserial_bd'
  | 'shiftpantry_b2b'
  | 'inboxshield_b2b'
  | 'seoulglow_kbeauty'
  | 'gadgetghor_tech'
  | 'tannery71_leather'
  | 'smartbabu_toys'
  | 'fitghor_fitness'
  | 'rooh_perfumery'
  | 'purepata_tea'
  | 'auto_bike_care'
  | 'organic_fruits_sweets'
  | 'panjabi_store'
  | 'fractional_core'
  | 'audit_pulse'
  | 'verdant_spaces'
  | 'nexus_growth_lab'
  | 'coffee_shop'
  | 'teacher_profile'
  | 'doctor_profile'
  | 'doctor_profile_2'
  | 'store_website'
  | 'store_admin_website'
  | 'bazar_bookstore_web'
  | 'define_atelier_web'
  | 'cybershield_vpn_web'
  | 'saas_cloud_web';

export type WebsiteSectionType =
  | 'navbar'
  | 'hero'
  | 'doctor_about'
  | 'doctor_services'
  | 'doctor_care_journey'
  | 'doctor_appointment'
  | 'logos'
  | 'features'
  | 'catalog'
  | 'metrics'
  | 'testimonials'
  | 'pricing'
  | 'faq'
  | 'cta_newsletter'
  | 'footer';

export type WebsiteSectionVariantId =
  | 'varient_1'
  | 'varient_2'
  | 'varient_3'
  | 'varient_4'
  | 'varient_5'
  | 'varient_6';

export interface WebsiteSectionInstance {
  id: string;
  type: WebsiteSectionType;
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  visible: boolean;
}

export interface WebsiteLibraryItem {
  type: WebsiteSectionType;
  label: string;
  category: 'Header & Hero' | 'Content & Catalog' | 'Conversion & Social' | 'Footer & Support';
  description: string;
  defaultTitle: string;
  defaultSubtitle: string;
  variants: Record<WebsiteSectionVariantId, string>;
}

export const WEBSITE_SECTION_LIBRARY: WebsiteLibraryItem[] = [
  {
    type: 'navbar',
    label: 'Top Navigation Header',
    category: 'Header & Hero',
    description: 'Responsive sticky website navigation bar with brand identity, links, and primary CTA.',
    defaultTitle: 'Bazar Literary Press',
    defaultSubtitle: 'Curated Independent Bookstore & Rare Editions',
    variants: {
      varient_1: 'V1: Classic Editorial Navbar',
      varient_2: 'V2: Centered Brand Split Links',
      varient_3: 'V3: Brutalist Bordered Header',
      varient_4: 'V4: Floating Glass Capsule Bar',
      varient_5: 'V5: Minimal Left-Aligned Bar',
      varient_6: 'V6: Announcement Strip + Header',
    },
  },
  {
    type: 'hero',
    label: 'Hero Showcase Banner',
    category: 'Header & Hero',
    description: 'High-impact above-the-fold landing hero with headline, value proposition, CTAs, and visual showcase.',
    defaultTitle: 'Discover Stories That Shape How You See The World',
    defaultSubtitle:
      'Handpicked fiction, philosophy, and Collector Hardcovers delivered directly from independent presses to your reading table.',
    variants: {
      varient_1: 'V1: Asymmetric Split Editorial Hero',
      varient_2: 'V2: Centered Typographic Showcase',
      varient_3: 'V3: Brutalist Press Grid Hero',
      varient_4: 'V4: Bento Multi-Card Showcase',
      varient_5: 'V5: Full-Bleed Dark Cinema Hero',
      varient_6: 'V6: Interactive Book Preview Hero',
    },
  },
  {
    type: 'logos',
    label: 'Partner & Press Logos',
    category: 'Header & Hero',
    description: 'Trusted publishing houses, literary awards, and media mentions strip.',
    defaultTitle: 'Featured In & Publishing Partners',
    defaultSubtitle: 'Partnered with over 120 independent publishing houses worldwide',
    variants: {
      varient_1: 'V1: Clean Editorial Press Strip',
      varient_2: 'V2: Bordered Grid Logo Cells',
      varient_3: 'V3: Brutalist Monochrome Ticker',
      varient_4: 'V4: Split Quote + Partner Logos',
      varient_5: 'V5: Minimal Inline Typography',
      varient_6: 'V6: Elevated Card Logo Row',
    },
  },
  {
    type: 'features',
    label: 'Feature & Value Grid',
    category: 'Content & Catalog',
    description: 'Showcase core product capabilities, editorial curation pillars, or platform benefits.',
    defaultTitle: 'Crafted for Devoted Readers & Collectors',
    defaultSubtitle: 'Every edition is inspected, archival-wrapped, and paired with author notes.',
    variants: {
      varient_1: 'V1: 3-Column Editorial Feature Cards',
      varient_2: 'V2: Asymmetric Bento Feature Grid',
      varient_3: 'V3: Brutalist Numbered Ledger',
      varient_4: 'V4: Split Left-Header + Right Grid',
      varient_5: 'V5: Alternating Story Rows',
      varient_6: 'V6: Minimal Icon Spec Matrix',
    },
  },
  {
    type: 'catalog',
    label: 'Product / Book Showcase Grid',
    category: 'Content & Catalog',
    description: 'Interactive filterable product or book collection grid with live cart/preview actions.',
    defaultTitle: 'This Week’s Curated First Editions',
    defaultSubtitle: 'Explore bestsellers, signed hardcovers, and limited literary releases.',
    variants: {
      varient_1: 'V1: 4-Column Gallery Cards',
      varient_2: 'V2: Editorial Bento Spotlight',
      varient_3: 'V3: Brutalist Framed Catalog',
      varient_4: 'V4: Horizontal Collector Rows',
      varient_5: 'V5: Minimalist Cover Grid',
      varient_6: 'V6: Featured Hero Item + 3 Grid',
    },
  },
  {
    type: 'metrics',
    label: 'Impact Metrics & Stats',
    category: 'Content & Catalog',
    description: 'Key performance numbers, community milestones, and verified store ratings.',
    defaultTitle: 'A Global Community of Literary Enthusiasts',
    defaultSubtitle: 'Shipping archival-grade editions to 64 countries every week.',
    variants: {
      varient_1: 'V1: 4-Column Big Numeral Strip',
      varient_2: 'V2: Bento Metric Cards',
      varient_3: 'V3: Brutalist Divided Counter',
      varient_4: 'V4: Brand Accent Banner Stats',
      varient_5: 'V5: Split Story + Key Figures',
      varient_6: 'V6: Compact Inline KPI Row',
    },
  },
  {
    type: 'testimonials',
    label: 'Reader Reviews & Social Proof',
    category: 'Conversion & Social',
    description: 'Verified customer quotes, critic reviews, and community endorsements.',
    defaultTitle: 'Loved by Novelists, Critics & Daily Readers',
    defaultSubtitle: '4.96 average rating across 18,400+ verified book collectors.',
    variants: {
      varient_1: 'V1: 3-Column Editorial Quote Cards',
      varient_2: 'V2: Large Spotlight Critic Review',
      varient_3: 'V3: Brutalist Review Wall',
      varient_4: 'V4: Bento Mixed Review Grid',
      varient_5: 'V5: Minimalist Pull-Quotes',
      varient_6: 'V6: Two-Column Verified Cards',
    },
  },
  {
    type: 'pricing',
    label: 'Membership & Pricing Plans',
    category: 'Conversion & Social',
    description: 'Subscription tiers, Book Club memberships, or SaaS pricing comparison tables.',
    defaultTitle: 'Join the Bazar First-Edition Society',
    defaultSubtitle: 'Flexible monthly or annual reading memberships with free worldwide express delivery.',
    variants: {
      varient_1: 'V1: 3-Tier Membership Cards',
      varient_2: 'V2: Split Free vs VIP Club',
      varient_3: 'V3: Brutalist Pricing Ledger',
      varient_4: 'V4: Highlighted Center Pro Tier',
      varient_5: 'V5: Horizontal Tier Rows',
      varient_6: 'V6: Compact Feature Matrix',
    },
  },
  {
    type: 'faq',
    label: 'Frequently Asked Questions',
    category: 'Footer & Support',
    description: 'Interactive expandable accordion answering shipping, returns, and membership questions.',
    defaultTitle: 'Frequently Asked Questions',
    defaultSubtitle: 'Everything you need to know about archival shipping, signed copies, and memberships.',
    variants: {
      varient_1: 'V1: Centered Accordion List',
      varient_2: 'V2: Split Title + Right Accordion',
      varient_3: 'V3: 2-Column Q&A Grid',
      varient_4: 'V4: Brutalist Boxed FAQ',
      varient_5: 'V5: Minimalist Divided Rows',
      varient_6: 'V6: Card-Based Support Answers',
    },
  },
  {
    type: 'cta_newsletter',
    label: 'Call to Action & Newsletter',
    category: 'Conversion & Social',
    description: 'High-converting email capture banner and final call-to-action section.',
    defaultTitle: 'Receive Our Weekly Literary Dispatch',
    defaultSubtitle: 'Join 95,000+ readers receiving Sunday essays, author interviews, and early access drops.',
    variants: {
      varient_1: 'V1: Royal Accent Banner CTA',
      varient_2: 'V2: Split Editorial Newsletter Card',
      varient_3: 'V3: Brutalist Framed Dispatch Box',
      varient_4: 'V4: Minimalist Centered Input',
      varient_5: 'V5: Dark Contrast Full-Width CTA',
      varient_6: 'V6: Two-Column Perks + Signup',
    },
  },
  {
    type: 'doctor_about',
    label: 'Doctor About, Credentials & Core Values',
    category: 'Content & Catalog',
    description:
      'Dr. Sarah Mitchell personal approach biography, 4-column medical credentials (Education, Experience, Certifications, Publications), and Core Values grid.',
    defaultTitle: 'Dedicated to Your Health & Wellness',
    defaultSubtitle:
      'With over 15 years of experience in internal medicine, I am committed to providing comprehensive, compassionate care that addresses your unique health needs and goals.',
    variants: {
      varient_1: 'V1: Bio + 4 Credentials + Core Values',
      varient_2: 'V2: Editorial Medical Biography',
      varient_3: 'V3: Clinical Credentials Matrix',
      varient_4: 'V4: Bento Physician Highlights',
      varient_5: 'V5: Dark Navy Specialist Profile',
      varient_6: 'V6: Compact Credentials & Values',
    },
  },
  {
    type: 'doctor_services',
    label: 'Medical Services 8-Card Grid',
    category: 'Content & Catalog',
    description:
      'Comprehensive 8-card internal medicine services grid: Preventive Care, Chronic Disease, Acute Care, Diagnostics, Geriatrics, Medication, Telemedicine, Referrals.',
    defaultTitle: 'Medical Services',
    defaultSubtitle:
      'From preventive care to chronic disease management, I offer a full spectrum of internal medicine services to meet your healthcare needs at every stage of life.',
    variants: {
      varient_1: 'V1: 8-Card Comprehensive Care Grid',
      varient_2: 'V2: Bento Clinical Specialties',
      varient_3: 'V3: Framed Medical Service Cards',
      varient_4: 'V4: 4x2 Icon & Bullet Matrix',
      varient_5: 'V5: Dark Contrast Medical Grid',
      varient_6: 'V6: Compact Specialty Directory',
    },
  },
  {
    type: 'doctor_care_journey',
    label: 'Care Journey (01-04) & Insurance / Accessibility',
    category: 'Conversion & Social',
    description:
      'Navy-to-Teal 4-step Care Journey banner (Schedule, Consultation, Treatment Plan, Follow-Up) plus Insurance & Payment and Accessible Care cards.',
    defaultTitle: 'Your Care Journey',
    defaultSubtitle:
      'A streamlined process designed with your comfort and health in mind',
    variants: {
      varient_1: 'V1: Gradient 4-Step Banner + 2 Info Cards',
      varient_2: 'V2: Split Process & Insurance Grid',
      varient_3: 'V3: Numbered Clinical Steps',
      varient_4: 'V4: Bento Patient Logistics',
      varient_5: 'V5: Dark Navy Journey Strip',
      varient_6: 'V6: Minimalist Care Roadmap',
    },
  },
  {
    type: 'doctor_appointment',
    label: 'Schedule Appointment, Contact & 911 Alert',
    category: 'Conversion & Social',
    description:
      'Interactive Request an Appointment form, 4 Contact cards (Phone, Email, Location, Hours), Conveniently Located photo card, 911 Emergency alert, and New Patients CTA.',
    defaultTitle: 'Schedule an Appointment',
    defaultSubtitle:
      'Taking new patients and accepting most insurance plans. Book your appointment today and take the first step toward better health.',
    variants: {
      varient_1: 'V1: Form + 4 Contact Cards + Emergency + CTA',
      varient_2: 'V2: Centered Booking & Clinic Map',
      varient_3: 'V3: Split Intake Form & Hours',
      varient_4: 'V4: Bento Clinic Contact Hub',
      varient_5: 'V5: Dark Navy Patient Intake',
      varient_6: 'V6: Express Telehealth Booking',
    },
  },
  {
    type: 'footer',
    label: 'Multi-Column Website Footer',
    category: 'Footer & Support',
    description: 'Complete sitemap footer with brand bio, navigation columns, copyright, and links.',
    defaultTitle: 'Bazar Literary Press & Bookstore',
    defaultSubtitle: 'Curating timeless literature and independent voices since 2019.',
    variants: {
      varient_1: 'V1: 4-Column Classic Sitemap Footer',
      varient_2: 'V2: Big Wordmark Editorial Footer',
      varient_3: 'V3: Brutalist Grid Footer',
      varient_4: 'V4: Minimal Single-Row Footer',
      varient_5: 'V5: Dark Luxury Brand Footer',
      varient_6: 'V6: Split Newsletter + Links Footer',
    },
  },
];

export interface WebsiteProjectPreset {
  id: WebsiteTemplateId;
  name: string;
  folderSlug: string;
  tagline: string;
  domain: string;
  primaryColor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  files: { path: string; kind: 'page' | 'component' | 'index' }[];
  sections: WebsiteSectionInstance[];
}

export const INITIAL_WEBSITE_PROJECTS: WebsiteProjectPreset[] = [
  {
    id: 'doctor_profile',
    name: 'Doctor Profile',
    folderSlug: 'doctor_profile',
    tagline: 'Dr. Sarah Mitchell — Board Certified Internal Medicine Landing Page',
    domain: 'drsarahmitchell.com',
    primaryColor: '#1D2B6B',
    icon: Stethoscope,
    files: [
      { path: 'src/website/doctor_profile/index.ts', kind: 'index' },
      {
        path: 'src/website/doctor_profile/pages/DoctorProfileLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/doctor_profile/component/DoctorCanvaEditorContext.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/doctor_profile/component/DoctorNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/doctor_profile/component/DoctorHeroSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/doctor_profile/component/DoctorAboutSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/doctor_profile/component/DoctorServicesSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/doctor_profile/component/DoctorCareJourneySection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/doctor_profile/component/DoctorAppointmentSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/doctor_profile/component/DoctorFooter.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'doc_nav_1',
        type: 'navbar',
        title: 'DR. SARAH MITCHELL',
        subtitle: 'Board Certified Internal Medicine Physician',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'doc_hero_1',
        type: 'hero',
        title: 'Dr. Sarah Mitchell',
        subtitle:
          'Compassionate healthcare focused on your wellness. Specializing in internal medicine with a holistic approach to patient care.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'doc_about_1',
        type: 'doctor_about',
        title: 'Dedicated to Your Health & Wellness',
        subtitle:
          'With over 15 years of experience in internal medicine, I am committed to providing comprehensive, compassionate care that addresses your unique health needs and goals.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'doc_services_1',
        type: 'doctor_services',
        title: 'Medical Services',
        subtitle:
          'From preventive care to chronic disease management, I offer a full spectrum of internal medicine services to meet your healthcare needs at every stage of life.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'doc_journey_1',
        type: 'doctor_care_journey',
        title: 'Your Care Journey',
        subtitle:
          'A streamlined process designed with your comfort and health in mind',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'doc_appointment_1',
        type: 'doctor_appointment',
        title: 'Schedule an Appointment',
        subtitle:
          'Taking new patients and accepting most insurance plans. Book your appointment today and take the first step toward better health.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'doc_footer_1',
        type: 'footer',
        title: 'Dr. Sarah Mitchell',
        subtitle: 'Medical License #MD-12345 · Board Certified Internal Medicine',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'doctor_profile_2',
    name: 'Doctor Profile 2',
    folderSlug: 'doctor_profile_2',
    tagline: 'Dr. Arjun Mehta — Interventional Cardiologist Landing Page',
    domain: 'drarjun.com',
    primaryColor: '#118C74',
    icon: HeartPulse,
    files: [
      { path: 'src/website/doctor_profile_2/index.ts', kind: 'index' },
      {
        path: 'src/website/doctor_profile_2/pages/DoctorProfile2LandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/doctor_profile_2/component/Doctor2Navbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/doctor_profile_2/component/Doctor2HeroSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/doctor_profile_2/component/Doctor2SpecializationsSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/doctor_profile_2/component/Doctor2AboutSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/doctor_profile_2/component/Doctor2ReviewsSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/doctor_profile_2/component/Doctor2LocationSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/doctor_profile_2/component/Doctor2Footer.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'doc2_nav_1',
        type: 'navbar',
        title: 'Dr. Arjun Mehta',
        subtitle: 'Cardiologist',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'doc2_hero_1',
        type: 'hero',
        title: 'Your Heart Health is My Priority',
        subtitle:
          'Providing personalized, evidence-based cardiology care to help you live a longer, healthier life.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'doc2_services_1',
        type: 'doctor_services',
        title: 'Specializations & Services',
        subtitle:
          'Advanced treatments for blocked arteries, preventive cardiology, heart failure management, and hypertension care.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'doc2_about_1',
        type: 'doctor_about',
        title: 'About Dr. Arjun Mehta',
        subtitle:
          'Dr. Arjun Mehta is a board-certified interventional cardiologist with over 15 years of experience in diagnosing and treating complex heart conditions. His patients-first philosophy focuses on personalized care, prevention, and long-term wellness.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'doc2_reviews_1',
        type: 'testimonials',
        title: 'Patients Reviews',
        subtitle: 'Verified 5-star reviews from cardiology patients.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'doc2_location_1',
        type: 'doctor_appointment',
        title: 'Location & Hours',
        subtitle:
          'HeartCare Clinic · 102 Ass Avenue, Suite 206, New York, NY 10003, USA',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'doc2_footer_1',
        type: 'footer',
        title: '© 2026 Dr. Arjun Mehta.',
        subtitle: 'All rights reserved.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'store_website',
    name: 'Store Website',
    folderSlug: 'store_website',
    tagline: 'Bazar — 100% Pure & Organic E-Commerce Store (All Pages)',
    domain: 'bazar.com',
    primaryColor: '#F37021',
    icon: ShoppingBag,
    files: [
      { path: 'src/website/store_website/index.ts', kind: 'index' },
      {
        path: 'src/website/store_website/pages/StoreWebsiteLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/store_website/component/StoreEcommerceContext.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/store_website/component/StoreNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/store_website/component/StoreHeroSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/store_website/component/StoreCatalogSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/store_website/component/StorePagesRouterSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/store_website/component/StoreFooter.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'store_nav_1',
        type: 'navbar',
        title: 'Bazar',
        subtitle: '100% Pure & Organic Food Store',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'store_hero_1',
        type: 'hero',
        title: 'প্রকৃতির খাঁটি স্বাদ এখন বাজার-এ — ১০০% অর্গানিক ও নিরাপদ খাবার',
        subtitle:
          'Sundarban Wild Khalisha Honey, Pabna Deshi Gawa Ghee, Cold Wood-Pressed Mustard Oil & Premium Saudi Dates delivered fresh to your doorstep.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'store_catalog_1',
        type: 'catalog',
        title: 'সকল প্রোডাক্ট (All Organic Products)',
        subtitle:
          '100% pure, chemical-free honey, gawa ghee, cold-pressed mustard oil, imported dates & superfoods.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'store_footer_1',
        type: 'footer',
        title: 'Bazar — বাজার',
        subtitle:
          'বাংলাদেশের সবচেয়ে বিশ্বস্ত ১০০% খাঁটি ও নিরাপদ অর্গানিক ফুড স্টোর।',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'store_admin_website',
    name: 'Store Admin Website',
    folderSlug: 'store_admin_website',
    tagline: 'Bazar Admin ERP — Manage Store Products, Orders, Categories, Coupons & System',
    domain: 'admin.bazar.com',
    primaryColor: '#F37021',
    icon: SlidersHorizontal,
    files: [
      { path: 'src/website/store_admin_website/index.ts', kind: 'index' },
      {
        path: 'src/website/store_admin_website/pages/StoreAdminWebsiteLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/store_admin_website/component/StoreAdminNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/store_admin_website/component/StoreAdminHeroOverviewSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/store_admin_website/component/StoreAdminPagesRouterSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/store_admin_website/component/StoreAdminFooter.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'store_admin_nav_1',
        type: 'navbar',
        title: 'Remos',
        subtitle: 'Bazar E-Commerce Admin Dashboard',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'store_admin_catalog_1',
        type: 'catalog',
        title: 'Remos E-Commerce Dashboard',
        subtitle:
          'Complete Dashboard, Ecommerce, Category, Attributes, Order, User, Roles, Gallery, Report & Settings.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'store_admin_footer_1',
        type: 'footer',
        title: 'Remos Admin',
        subtitle: 'Copyright © 2026 Remos. All rights reserved.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'teacher_profile',
    name: 'Teacher Profile (3D UI)',
    folderSlug: 'teacher_profile',
    tagline:
      'Prof. Julian Vance, Ph.D. — Math & Physics Tutor 3D Spatial Landing Page',
    domain: 'julianvance.edu',
    primaryColor: '#2563EB',
    icon: GraduationCap,
    files: [
      { path: 'src/website/teacher_profile/index.ts', kind: 'index' },
      {
        path: 'src/website/teacher_profile/pages/TeacherProfileLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/teacher_profile/component/TeacherNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/teacher_profile/component/TeacherHeroSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/teacher_profile/component/TeacherAboutVideoCredentialsSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/teacher_profile/component/TeacherServicesPricingSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/teacher_profile/component/TeacherReviewsFaqSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/teacher_profile/component/TeacherBookingContactSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/teacher_profile/component/TeacherFooter.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'teacher_nav_1',
        type: 'navbar',
        title: 'Prof. Julian Vance',
        subtitle: 'MIT Ph.D. · Math & Physics 3D Lightboard Tutor',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'teacher_hero_1',
        type: 'hero',
        title: 'Prof. Julian Vance, Ph.D.',
        subtitle:
          'Math & Physics Tutor specializing in AP Calculus BC, Multivariable Calculus, IB Physics HL, and Olympiad Problem Solving. Turning abstract equations into intuitive 3D geometric insight.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'teacher_about_1',
        type: 'doctor_about',
        title: 'Teaching Philosophy, 75-Second Welcome & Academic Credentials',
        subtitle:
          'Combining rigorous MIT research training with 12 years of one-on-one mentorship to transform how students experience mathematics and physics.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'teacher_pricing_1',
        type: 'pricing',
        title: 'Services & Transparent Tuition Rates',
        subtitle:
          'Flexible 1-on-1 tutoring, small-group problem-solving labs, and comprehensive monthly mentorship packages. Every plan begins with a complimentary 30-minute diagnostic session.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'teacher_reviews_1',
        type: 'testimonials',
        title: 'Verified Student & Parent Outcomes',
        subtitle:
          'Concrete score improvements across AP Calculus, IB Physics HL, SAT Math, and university engineering coursework.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'teacher_booking_1',
        type: 'doctor_appointment',
        title: 'Lock In a Calendar Slot or Send a Message',
        subtitle:
          'Reserve your complimentary 30-minute 3D Lightboard diagnostic session or ask a question about curriculum fit, exam timelines, and group lab availability.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'teacher_footer_1',
        type: 'footer',
        title: 'Prof. Julian Vance, Ph.D.',
        subtitle:
          'MIT Applied Mathematics Ph.D. · National Board Certified Educator (#MA-88412) · Cambridge 3D Lightboard Studio.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'coffee_shop',
    name: 'Coffee Shop',
    folderSlug: 'coffee_shop',
    tagline:
      'Velvet Bean Roasters — Artisanal Specialty Coffee Shop & Roastery',
    domain: 'velvetbeanroasters.com',
    primaryColor: '#C86D51',
    icon: Coffee,
    files: [
      { path: 'src/website/coffee_shop/index.ts', kind: 'index' },
      {
        path: 'src/website/coffee_shop/pages/CoffeeShopLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/coffee_shop/component/CoffeeShopContext.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/coffee_shop/component/CoffeeNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/coffee_shop/component/CoffeeHeroSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/coffee_shop/component/CoffeeSubscriptionSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/coffee_shop/component/CoffeeSeasonalMenuSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/coffee_shop/component/CoffeeLocationsWholesaleStorySection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/coffee_shop/component/CoffeeFooter.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'coffee_nav_1',
        type: 'navbar',
        title: 'Velvet Bean Roasters',
        subtitle: 'Specialty Coffee Shop & Small-Batch Roastery',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'coffee_hero_1',
        type: 'hero',
        title: 'Crafted with Care. Roasted to Perfection.',
        subtitle:
          'Ethically sourced, small-batch micro-lot coffee beans delivered straight from our roastery to your cup.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'coffee_sub_1',
        type: 'pricing',
        title: 'Freshly Roasted Coffee, Delivered on Your Schedule.',
        subtitle:
          'Customize your small-batch roast, grind precision, and delivery cadence. Save 15% on every subscription shipment.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'coffee_menu_1',
        type: 'catalog',
        title: 'Seasonal Cafe Menu & House Bakery',
        subtitle:
          'Crafted daily with organic local dairy, house-made botanical syrups, and stone-milled pastries.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'coffee_locations_1',
        type: 'doctor_appointment',
        title: 'Visit Our Cafes & Roastery Tasting Rooms',
        subtitle:
          'Explore our 3 Portland cafes with real-time seating availability, B2B wholesale inquiries, and our 100% direct trade story.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'coffee_footer_1',
        type: 'footer',
        title: 'Velvet Bean Roasters',
        subtitle:
          'Ethically sourced, small-batch micro-lot coffee beans roasted weekly in Portland, Oregon.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'nexus_growth_lab',
    name: 'Nexus Growth Lab',
    folderSlug: 'nexus_growth_lab',
    tagline:
      'B2B Digital Marketing & Revenue Engineering Agency Landing Page',
    domain: 'nexusgrowthlab.io',
    primaryColor: '#2563EB',
    icon: BarChart3,
    files: [
      { path: 'src/website/nexus_growth_lab/index.ts', kind: 'index' },
      {
        path: 'src/website/nexus_growth_lab/pages/NexusGrowthLabLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/nexus_growth_lab/component/NexusNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/nexus_growth_lab/component/NexusHeroSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/nexus_growth_lab/component/NexusRoiCaseStudiesSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/nexus_growth_lab/component/NexusSolutionsBookingSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/nexus_growth_lab/component/NexusTestimonialsFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'nexus_nav_1',
        type: 'navbar',
        title: 'Nexus Growth Lab',
        subtitle: 'Accepting Q4 Enterprise Clients · B2B Revenue Engineering',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'nexus_hero_1',
        type: 'hero',
        title: 'Predictable B2B Pipeline Growth. Powered by Data Science.',
        subtitle:
          'We engineer full-funnel demand generation engines that turn ad spend into qualified sales pipeline for B2B tech companies.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'nexus_roi_1',
        type: 'metrics',
        title: 'Calculate Your Revenue Growth Potential',
        subtitle:
          'Interactive B2B ROI Calculator & Verified Enterprise Case Studies with 6-month performance charts.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'nexus_solutions_1',
        type: 'pricing',
        title: 'Service Packages & Revenue Solutions Engine',
        subtitle:
          'Demand Generation Accelerator, ABM Enterprise, and Revenue Operations Infrastructure + 30-Minute Growth Audit Booking.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'nexus_footer_1',
        type: 'footer',
        title: 'Executive Proof from High-Growth B2B Revenue Leaders',
        subtitle:
          'Playable CMO/CRO video case studies, verified LinkedIn endorsements, and The Revenue Engine weekly newsletter.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'verdant_spaces',
    name: 'Verdant Spaces',
    folderSlug: 'verdant_spaces',
    tagline:
      'Biophilic Urban Architecture, Rooftop Sanctuaries & Sustainable Landscaping',
    domain: 'verdantspaces.arch',
    primaryColor: '#2C4A3E',
    icon: Trees,
    files: [
      { path: 'src/website/verdant_spaces/index.ts', kind: 'index' },
      {
        path: 'src/website/verdant_spaces/pages/VerdantSpacesLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/verdant_spaces/component/VerdantNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/verdant_spaces/component/VerdantHeroSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/verdant_spaces/component/VerdantEstimatorPortfolioSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/verdant_spaces/component/VerdantPackagesCoverageBookingSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/verdant_spaces/component/VerdantFaqFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'verdant_nav_1',
        type: 'navbar',
        title: 'Verdant Spaces',
        subtitle:
          'Biophilic Urban Architecture & Sustainable Landscape Engineering',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'verdant_hero_1',
        type: 'hero',
        title: 'Transform Urban Concrete into Living Sanctuaries.',
        subtitle:
          'Architectural landscape design engineered with 100% native plants, smart water management, and zero-emissions maintenance.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'verdant_estimator_1',
        type: 'metrics',
        title: 'Calculate Your Urban Transformation',
        subtitle:
          'Interactive Project Estimator Widget, Before/After Drag Comparison Gallery, and 4-Step Biophilic Engineering Timeline.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'verdant_packages_1',
        type: 'pricing',
        title: 'Service Packages & Seasonal Maintenance Plans',
        subtitle:
          'One-Time Design & Build vs. Seasonal Care Plans, Interactive Zip Code Coverage Map, and On-Site Architectural Audit Booking.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'verdant_footer_1',
        type: 'footer',
        title: 'Verdant Spaces',
        subtitle:
          'Architectural FAQ Accordion, Seasonal Urban Garden Care Guide Download, and LEED / NWF / 1% for the Planet Pledge.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'audit_pulse',
    name: 'AuditPulse',
    folderSlug: 'audit_pulse',
    tagline:
      'B2B SaaS License & Tool Waste Optimization Platform (Performance-Based FinTech)',
    domain: 'auditpulse.io',
    primaryColor: '#10B981',
    icon: Shield,
    files: [
      { path: 'src/website/audit_pulse/index.ts', kind: 'index' },
      {
        path: 'src/website/audit_pulse/pages/AuditPulseLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/audit_pulse/component/AuditPulseNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/audit_pulse/component/AuditPulseHeroSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/audit_pulse/component/AuditPulseEstimatorBreakdownSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/audit_pulse/component/AuditPulseSecurityProcessBookingSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/audit_pulse/component/AuditPulsePricingFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'auditpulse_nav_1',
        type: 'navbar',
        title: 'AuditPulse',
        subtitle:
          'SOC-2 Type II & GDPR Compliant Read-Only SaaS Spend Optimization',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'auditpulse_hero_1',
        type: 'hero',
        title: 'Stop Paying for Ghost SaaS Licenses & Unused Seats.',
        subtitle:
          'AuditPulse scans your Google Workspace, Microsoft 365, Slack, and Zoom stacks to uncover inactive seats and duplicate subscriptions in under 24 hours.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'auditpulse_estimator_1',
        type: 'metrics',
        title: 'How Much SaaS Spend Are You Wasting Each Year?',
        subtitle:
          'Interactive SaaS Waste Estimator ($1,440/Employee × 24% Waste Formula) and Tabbed Inactive Seat Breakdown.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'auditpulse_security_1',
        type: 'pricing',
        title: 'Enterprise-Grade Security & 3-Step Audit Walkthrough',
        subtitle:
          'SOC-2 Type II, Read-Only OAuth, Zero-Data Retention, Security Whitepaper Download, and 1-Click Calendar Slot Picker.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'auditpulse_footer_1',
        type: 'footer',
        title: 'Transparent Performance Pricing. Zero Retainers.',
        subtitle:
          '$0 Upfront, $0 Monthly Subscription, 15% Performance Fee only on verified 12-month savings.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'fractional_core',
    name: 'FractionalCore',
    folderSlug: 'fractional_core',
    tagline:
      'On-Demand Executive Network Matching Seed & Series-A Startups with Vetted Fractional CTOs, CFOs, CMOs & CPOs',
    domain: 'fractionalcore.vc',
    primaryColor: '#D97706',
    icon: Briefcase,
    files: [
      { path: 'src/website/fractional_core/index.ts', kind: 'index' },
      {
        path: 'src/website/fractional_core/pages/FractionalCoreLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/fractional_core/component/FractionalCoreNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/fractional_core/component/FractionalCoreHeroSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/fractional_core/component/FractionalCoreCalculatorDirectorySection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/fractional_core/component/FractionalCoreAdvisoryMatchFormSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/fractional_core/component/FractionalCoreProofSitemapFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'fractional_nav_1',
        type: 'navbar',
        title: 'FractionalCore',
        subtitle: 'Seed & Series-A Fractional Executive Network',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'fractional_hero_1',
        type: 'hero',
        title: 'Silicon Valley Executive Guidance. 1/4 the Full-Time Cost.',
        subtitle:
          'Access veteran CTOs, CFOs, and CMOs who have scaled companies from Series A to IPO. Get institutional strategic direction without sacrificing $250k+ salary or cap table equity.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'fractional_calc_dir_1',
        type: 'metrics',
        title: 'Stop Diluting Cap Tables for Early-Stage Hires',
        subtitle:
          'Interactive Full-Time vs. Fractional Cost Savings Calculator and Filterable Non-Confidential Executive Directory.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'fractional_match_1',
        type: 'pricing',
        title: 'Get Matched with a Vetted Executive in 48 Hours',
        subtitle:
          '3-Step Curated Advisory Match Model and 15-Minute Partner Intake Form with Embedded Cal.com Slot Picker.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'fractional_footer_1',
        type: 'footer',
        title: 'Trusted by General Partners & Series-A Founders',
        subtitle:
          'Seed & Series-A VC Endorsements, 30-Second Founder Video Testimonials, and Multi-Page Marketplace Architecture.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'panjabi_store',
    name: 'Panjabi Store (AURA আউরা)',
    folderSlug: 'panjabi_store',
    tagline:
      'BD D2C Micro-Collection Landing Page — Premium Cotton Kabli Panjabis & 220 GSM Drop-Shoulder Tees',
    domain: 'auraapparel.com.bd',
    primaryColor: '#0F5132',
    icon: ShoppingBag,
    files: [
      { path: 'src/website/panjabi_store/index.ts', kind: 'index' },
      {
        path: 'src/website/panjabi_store/pages/PanjabiStoreLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/panjabi_store/component/PanjabiStoreNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/panjabi_store/component/PanjabiStoreHeroSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/panjabi_store/component/PanjabiStoreSizeGuideFabricSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/panjabi_store/component/PanjabiStoreExpressCodSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/panjabi_store/component/PanjabiStoreReviewsFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'panjabi_nav_1',
        type: 'navbar',
        title: 'AURA Apparel (আউরা)',
        subtitle:
          'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি | ঢাকার ভিতরে ৳৭০, ঢাকার বাইরে ৳১৩০ | ৩ দিনে রিটার্ন গ্যারান্টি',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'panjabi_hero_1',
        type: 'hero',
        title: 'AURA Royal Kabli Collection 2026 — Executive Cotton Edition',
        subtitle:
          '১০০% কটন • কালার গ্যারান্টি • প্রিমিয়াম স্টিচিং — প্রিমিয়াম মার্সেরাইজড কটন ফেব্রিক এবং কাস্টম মেটাল স্ন্যাপ বাটন।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'panjabi_size_fabric_1',
        type: 'metrics',
        title: 'সঠিক মাপ নির্বাচন করুন — পারফেক্ট এক্সিকিউটিভ ফিট',
        subtitle:
          'Interactive Inch Size Chart, Find My Size (Height/Weight) Calculator, and 100% Combed Cotton QA Accordion.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'panjabi_cod_1',
        type: 'pricing',
        title: 'অর্ডার কনফার্ম করতে নিচের ফর্মটি পূরণ করুন',
        subtitle:
          '1-Click Express Cash on Delivery (COD) Form with 11-Digit BD Phone Validation and Steadfast/Pathao Courier JSON.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'panjabi_footer_1',
        type: 'footer',
        title: 'আমাদের সম্মানিত কাস্টমারদের বাস্তব ছবি ও মতামত',
        subtitle:
          '4-Pillar BD COD Trust Grid and Unfiltered Facebook Customer Photo Reviews.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'organic_fruits_sweets',
    name: 'Seasonal Organic Fruits & Pure Sweets (আম, খেজুরের গুড় ও ফল)',
    tagline:
      'Direct Orchard-Harvested Rajshahi Mangoes, Dinajpur Litchis, Jashore Date Molasses & Cow Milk Sweets with 100% Formalin-Free Guarantee',
    domain: 'orchardpurebd.com',
    folderSlug: 'organic_fruits_sweets',
    primaryColor: '#14532D',
    icon: Trees,
    files: [
      { path: 'src/website/organic_fruits_sweets/index.ts', kind: 'index' },
      {
        path: 'src/website/organic_fruits_sweets/pages/OrganicFruitsLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/organic_fruits_sweets/component/OrganicFruitsNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/organic_fruits_sweets/component/OrganicFruitsHeroHarvestSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/organic_fruits_sweets/component/OrganicFruitsCatalogTrustSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/organic_fruits_sweets/component/OrganicFruitsBulkCalculatorCodSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/organic_fruits_sweets/component/OrganicFruitsReviewsFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'organic_nav_1',
        type: 'navbar',
        title: 'Seasonal Organic Fruits & Pure Sweets',
        subtitle:
          'আম, খেজুরের গুড় ও কেমিক্যাল-মুক্ত ফল • Direct Orchard to Dhaka',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'organic_hero_1',
        type: 'hero',
        title:
          'গাছপাকা রাজশাহীর আম ও খাঁটি খেজুরের গুড় — সরাসরি বাগান থেকে আপনার পরিবারের টেবিলে',
        subtitle:
          'আপনার সন্তানের মুখে বিষমুক্ত ফল তুলে দিন। আমাদের নিজস্ব তত্ত্বাবধানে চাঁপাইনবাবগঞ্জের বাগান থেকে প্রতিদিন ভোরে পাড়া গাছপাকা হিমসাগর, দিনাজপুরের লিচু এবং যশোরের খাঁটি খেজুরের গুড় — কোনো মধ্যস্বত্বভোগী বা কেমিক্যাল ছাড়াই ২৪ ঘণ্টায় ঢাকায় হোম ডেলিভারি।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'organic_catalog_trust_1',
        type: 'metrics',
        title: 'আমাদের বাগান ও ঐতিহ্যবাহী পণ্যের তালিকা (Seasonal Organic Lineup)',
        subtitle:
          'চাঁপাইনবাবগঞ্জের হিমসাগর, ল্যাংড়া ও আম্রপালি আম, দিনাজপুরের লিচু, যশোরের খাঁটি খেজুরের গুড় এবং নাটোর-পাবনার ছানার মিষ্টি + ১০০% ফরমালিন-মুক্ত ল্যাব গ্যারান্টি।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'organic_bulk_cod_1',
        type: 'pricing',
        title:
          'ফ্যামিলি ও কর্পোরেট বাল্ক অর্ডার ক্যালকুলেটর এবং ১-ক্লিক ক্যাশ অন ডেলিভারি',
        subtitle:
          '২০ কেজি বা তার বেশি অর্ডার করলেই পাচ্ছেন ৮%–১৬% পর্যন্ত বাগান ছাড় এবং ঢাকা শহরে সম্পূর্ণ ফ্রি হোম ডেলিভারি।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'organic_footer_1',
        type: 'footer',
        title: 'আমাদের সম্মানিত গ্রাহকদের বাস্তব অভিজ্ঞতা ও রিভিউ',
        subtitle:
          'ধানমন্ডি, গুলশান, বনানী ও উত্তরার সচেতন পরিবার এবং কর্পোরেট ক্লায়েন্টদের যাচাইকৃত মতামত।',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'auto_bike_care',
    name: 'TorqueGear BD — কার ও বাইক কেয়ার (Auto & Bike Detailing Gear)',
    tagline:
      'DIY Ceramic Coating Sprays, IP67 Helmet Intercoms, 48V Cordless Pressure Washers, 120W LED Headlights & Gel Seat Cushions',
    domain: 'torquegearbd.com',
    folderSlug: 'auto_bike_care',
    primaryColor: '#E11D48',
    icon: Car,
    files: [
      { path: 'src/website/auto_bike_care/index.ts', kind: 'index' },
      {
        path: 'src/website/auto_bike_care/pages/AutoCareLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/auto_bike_care/component/AutoCareNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/auto_bike_care/component/AutoCareHeroCompatibilitySection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/auto_bike_care/component/AutoCareCatalogComparisonSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/auto_bike_care/component/AutoCareBundlesCodSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/auto_bike_care/component/AutoCareReviewsFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'auto_nav_1',
        type: 'navbar',
        title: 'TorqueGear BD (কার ও বাইক কেয়ার)',
        subtitle:
          'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি · ঢাকায় ২৪ ঘণ্টায় ডেলিভারি · ১০০% জেনুইন ইমপোর্টেড গিয়ার',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'auto_hero_1',
        type: 'hero',
        title:
          'মাত্র ১০ মিনিটে শোরুমের মতো নতুনের চমক — আপনার শখের গাড়ি ও বাইকের প্রিমিয়াম প্রটেকশন এবং স্মার্ট আপগ্রেড!',
        subtitle:
          'সার্ভিস সেন্টারের হাজার টাকা খরচ আর ঘণ্টার পর ঘণ্টা সিরিয়াল এখন অতীত! গ্রাফিন ৯এইচ সিরামিক কোটিং স্প্রে, ওয়াটারপ্রুফ হেলমেট ইন্টারকম, হাই-প্রেশার কার ওয়াশার এবং প্লাগ-অ্যান্ড-প্লে এলইডি হেডলাইট এখন সরাসরি আপনার হাতের মুঠোয়।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'auto_catalog_comp_1',
        type: 'metrics',
        title:
          'আমাদের ৫টি বেস্ট-সেলিং কার ও বাইক কেয়ার গিয়ার — নিজেই করুন শোরুম গ্রেড মেইনটেন্যান্স',
        subtitle:
          'Graphene 9H Ceramic Spray, IP67 Helmet Intercom, 48V Cordless Pressure Washer, 120W LED Headlight & 3D Gel Seat Cushion + Before/After Lab.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'auto_bundles_cod_1',
        type: 'pricing',
        title:
          'সিঙ্গেল আইটেমের চেয়ে কম্বো প্যাকে অর্ডার করুন — বাঁচান ৮০০ টাকা পর্যন্ত + ফ্রি ডেলিভারি!',
        subtitle:
          'বাইকার প্রো প্যাক ও হোম কার ওয়াশ স্টুডিও বান্ডেল + অগ্রিম ছাড়াই ১-ক্লিক ক্যাশ অন ডেলিভারি ফর্ম।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'auto_footer_1',
        type: 'footer',
        title:
          '৪২,০০০+ বাইকার, প্রাইভেট কার ওনার এবং রাইড-শেয়ার ড্রাইভারদের বাস্তব অভিজ্ঞতা',
        subtitle:
          'ঢাকা, চট্টগ্রাম ও সিলেটের প্রতিদিনের চালকদের যাচাইকৃত রিভিউ এবং টেকনিক্যাল ফিটমেন্ট প্রশ্নোত্তর।',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'purepata_tea',
    name: 'PurePata Botanicals (পিওরপাতা বোটানিক্যালস — অর্গানিক চা ও ভেষজ ব্লেন্ড)',
    tagline:
      'Garden-Direct Sreemangal Orthodox Black Tea, Panchagarh Organic Green Tea, Blue Butterfly Pea, Tulsi-Ginger & Masala Chai in Eco-Tins',
    domain: 'purepatabotanicals.com.bd',
    folderSlug: 'purepata_tea',
    primaryColor: '#1E4620',
    icon: Leaf,
    files: [
      { path: 'src/website/purepata_tea/index.ts', kind: 'index' },
      {
        path: 'src/website/purepata_tea/pages/PurePataLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/purepata_tea/component/PurePataNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/purepata_tea/component/PurePataHeroTraceabilitySection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/purepata_tea/component/PurePataCatalogSteepingSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/purepata_tea/component/PurePataSubscriptionCodSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/purepata_tea/component/PurePataReviewsFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'purepata_nav_1',
        type: 'navbar',
        title: 'PurePata Botanicals (পিওরপাতা বোটানিক্যালস)',
        subtitle:
          'শ্রীমঙ্গল ও পঞ্চগড়ের বাগান থেকে সরাসরি সংগৃহীত · ১০০% কেমিক্যাল-মুক্ত অর্গানিক গ্রিন টি ও ভেষজ চা',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'purepata_hero_1',
        type: 'hero',
        title:
          'শ্রীমঙ্গলের কুয়াশাভেজা বাগান থেকে সরাসরি আপনার পেয়ালায় — এক চুমুকেই বিশুদ্ধ প্রকৃতির সতেজতা ও সুস্থতা',
        subtitle:
          'টি-ব্যাগের কৃত্রিম ডাস্ট চা আর ব্লিচড পেপারের দিন শেষ। আমাদের নিজস্ব তত্ত্বাবধানে শ্রীমঙ্গল ও পঞ্চগড়ের বাগান থেকে সদ্য তোলা দুটি পাতা একটি কুঁড়ি (Whole-Leaf Orthodox Tea) এবং খাঁটি ভেষজ উপাদান—কোনো মধ্যস্বত্বভোগী ছাড়াই ৭২ ঘণ্টার মধ্যে ইকো-ফ্রেন্ডলি এয়ারটাইট টিনে পৌঁছে যাচ্ছে আপনার টেবিলে।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'purepata_catalog_steep_1',
        type: 'metrics',
        title:
          'আমাদের ৫টি সিগনেচার অর্গানিক চা ও ভেষজ ওয়েলনেস ব্লেন্ড — ফুড-গ্রেড ইকো টিনে সংরক্ষিত',
        subtitle:
          'Sreemangal Orthodox Black Tea, Panchagarh Organic Green Tea, Blue Butterfly Pea, Tulsi-Ginger & Masala Chai + Interactive Steeping Guide.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'purepata_sub_cod_1',
        type: 'pricing',
        title:
          'মাসিক টি-রিফিল সাবস্ক্রিপশন বক্স — ১৫% ফ্ল্যাট ডিসকাউন্ট এবং সারা বাংলাদেশে ফ্রি হোম ডেলিভারি',
        subtitle:
          'প্রথমবার অরিজিনাল ইকো টিন পাওয়ার পর প্রতি মাসে বাগানের সতেজ হারভেস্ট ব্যাচ কম্পোস্টেবল রিফিল পাউচে আপনার বাসায় পৌঁছে যাবে।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'purepata_footer_1',
        type: 'footer',
        title:
          'ঢাকা, চট্টগ্রাম ও সিলেটের সচেতন চা-প্রেমী, পুষ্টিবিদ ও কর্পোরেট এক্সিকিউটিভদের মতামত',
        subtitle:
          'যাঁরা প্রতিদিনের টি-ব্যাগ ছেড়ে আমাদের গার্ডেন-ডিরেক্ট হোল-লিফ ও ভেষজ চায়ের সতেজতায় ফিরেছেন।',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'rooh_perfumery',
    name: 'Rooh Perfumery (রুহ সুগন্ধি — হালাল আতর, উদ ও অ্যারাবিয়ান বাখুর)',
    tagline:
      '100% Alcohol-Free Prayer-Safe Attars, Aged Cambodian & Sylheti Oud, French Designer Clones, Bakhoor & Halal Pocket Sprays',
    domain: 'roohperfumery.com.bd',
    folderSlug: 'rooh_perfumery',
    primaryColor: '#D4AF37',
    icon: Droplets,
    files: [
      { path: 'src/website/rooh_perfumery/index.ts', kind: 'index' },
      {
        path: 'src/website/rooh_perfumery/pages/RoohPerfumeryLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/rooh_perfumery/component/RoohNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/rooh_perfumery/component/RoohHeroScentFinderSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/rooh_perfumery/component/RoohCatalogComparisonSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/rooh_perfumery/component/RoohDiscoveryKitCodSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/rooh_perfumery/component/RoohReviewsFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'rooh_nav_1',
        type: 'navbar',
        title: 'Rooh Perfumery (রুহ সুগন্ধি)',
        subtitle:
          '১০০% অ্যালকোহল-মুক্ত হালাল আতর, কম্বোডিয়ান উদ ও অ্যারাবিয়ান বাখুর · সারা বাংলাদেশে ক্যাশ অন ডেলিভারি',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'rooh_hero_1',
        type: 'hero',
        title:
          'এক ফোঁটাতেই ৪৮ ঘণ্টার রাজকীয় আভিজাত্য ও পবিত্র প্রশান্তি — ১০০% অ্যালকোহল-মুক্ত খাঁটি আতর ও উদ',
        subtitle:
          'অ্যালকোহলযুক্ত স্প্রে পারফিউমের কড়া কেমিক্যাল ও ১ ঘণ্টায় উবে যাওয়া গন্ধের দিন শেষ। সিলেটের আগরউড, সৌদি তাইফের গোলাপ এবং ফরাসি পারফিউম অয়েলের সংমিশ্রণে তৈরি রুহ সুগন্ধি আপনার জুম্মা, পাঁচ ওয়াক্ত নামাজ, অফিস ও ঈদের দাওয়াতে ছড়িয়ে দেবে দীর্ঘস্থায়ী রাজকীয় সুবাস।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'rooh_catalog_1',
        type: 'metrics',
        title:
          'আমাদের ৪টি সিগনেচার কালেকশন — Pure Attars, Designer Clones, Bakhoor ও Pocket Sprays',
        subtitle:
          'প্রতিটি সুগন্ধির Top, Heart এবং Base নোটের বিস্তারিত পিরামিড দেখে বেছে নিন আপনার ব্যক্তিত্বের সেরা ঘ্রাণ + অ্যালকোহল স্প্রে বনাম খাঁটি আতরের তুলনা।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'rooh_discovery_cod_1',
        type: 'pricing',
        title:
          'অনলাইনে ঘ্রাণ না শুঁকে অর্ডার করতে দ্বিধা হচ্ছে? অর্ডার করুন ৫টি আতরের ডিসকভারি বক্স — মাত্র ৳৯৯০!',
        subtitle:
          'ব্লাইন্ড-বাই রিস্ক ছাড়াই আমাদের সবচেয়ে জনপ্রিয় ৫টি আতর (মোট ১৫ মিলি) বাসায় বসে পরখ করুন এবং পরবর্তী ফুল-সাইজ অর্ডারে পান ৩০০ টাকা ডিসকাউন্ট ভাউচার।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'rooh_footer_1',
        type: 'footer',
        title:
          '৩৮,৫০০+ সুন্নাহ প্রেমী, কর্পোরেট প্রফেশনাল ও পারফিউম কালেক্টরদের বাস্তব অভিজ্ঞতা',
        subtitle:
          'যাঁরা সাধারণ অ্যালকোহল স্প্রে ছেড়ে রুহ পারফিউমারির ১০০% হালাল ও লং-লাস্টিং আতরে ফিরেছেন।',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'fitghor_fitness',
    name: 'FitGhor (ফিটঘর — হোম ফিটনেস, জিম গিয়ার ও স্মার্ট ওয়েলনেস ট্র্যাকার)',
    tagline:
      'Space-Saving Adjustable Dumbbells, 5-Tube Resistance Bands, 8mm Eco TPE Yoga Mats, Smart Body Fat Scales & Free 30-Day Home Workout PDF',
    domain: 'fitghor.com.bd',
    folderSlug: 'fitghor_fitness',
    primaryColor: '#FF4500',
    icon: Dumbbell,
    files: [
      { path: 'src/website/fitghor_fitness/index.ts', kind: 'index' },
      {
        path: 'src/website/fitghor_fitness/pages/FitGhorFitnessLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/fitghor_fitness/component/FitGhorNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/fitghor_fitness/component/FitGhorHeroSpecsSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/fitghor_fitness/component/FitGhorCatalogLeadMagnetSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/fitghor_fitness/component/FitGhorBdCheckoutSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/fitghor_fitness/component/FitGhorSuccessFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'fitghor_nav_1',
        type: 'navbar',
        title: 'FitGhor (ফিটঘর)',
        subtitle:
          'হোম ফিটনেস ও স্মার্ট ওয়েলনেস গিয়ার · সারা বাংলাদেশে ক্যাশ অন ডেলিভারি + ফ্রি ৩০ দিনের ওয়ার্কআউট গাইড PDF',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'fitghor_hero_1',
        type: 'hero',
        title:
          'ঢাকার জ্যাম আর দামি জিম মেম্বারশিপকে বিদায় — আপনার শোবার ঘরেই গড়ে তুলুন স্মার্ট হোম জিম, দিনে মাত্র ২০ মিনিটে!',
        subtitle:
          'অফিস শেষে ২ ঘণ্টা ট্রাফিক জ্যাম ঠেলে জিমে যাওয়ার দিন শেষ। জায়গা বাঁচানো অ্যাডজাস্টেবল ডাম্বেল, ১৫০ পাউন্ড রেজিস্ট্যান্স ব্যান্ড ও স্মার্ট বডি ফ্যাট স্কেলের সাহায্যে বাসায় বসেই শুরু করুন আপনার ফিটনেস ট্রান্সফরমেশন।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'fitghor_catalog_1',
        type: 'metrics',
        title:
          'আমাদের ৫টি বেস্ট-সেলিং হোম ফিটনেস ও ওয়েলনেস গিয়ার + ফ্রি ৩০ দিনের হোম ওয়ার্কআউট রুটিন ও দেশি ডায়েট চার্ট PDF',
        subtitle:
          'Strength, Wellness & Yoga এবং Smart Trackers ক্যাটাগরি থেকে বেছে নিন আপনার গিয়ার এবং ফ্রিতে ডাউনলোড করুন বিগিনার ওয়ার্কআউট গাইড।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'fitghor_checkout_1',
        type: 'pricing',
        title:
          'হোম জিম বান্ডেল ও ১-ক্লিক ক্যাশ অন ডেলিভারি চেকআউট — জেলা ও থানা ভিত্তিক ডেলিভারি এবং ফ্রি ডিজিটাল বোনাস!',
        subtitle:
          'অর্ডার কনফার্ম করলেই আপনার ইমেইল ও হোয়াটসঅ্যাপে তাৎক্ষণিক পৌঁছে যাবে ৩০ দিনের ফুল-বডি হোম ওয়ার্কআউট ই-বুক এবং এক্সক্লুসিভ ভিডিও ট্রেনিং পোর্টাল অ্যাক্সেস।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'fitghor_footer_1',
        type: 'footer',
        title:
          '২৪,০০০+ ব্যস্ত প্রফেশনাল, গৃহিণী ও হোম-ফিটনেস মেম্বারদের বাস্তব ট্রান্সফরমেশন ও রিভিউ',
        subtitle:
          'যাঁরা ট্রাফিক জ্যাম ও মাসিক জিম ফি ছেড়ে ফিটঘরের স্পেস-সেভিং গিয়ারে নিজেদের বাসায় ফিট রাখছেন।',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'smartbabu_toys',
    name: 'SmartBabu (স্মার্টবাবু — বাচ্চাদের লার্নিং খেলনা, টকিং বুক ও নিরাপদ বেবি কেয়ার)',
    tagline:
      '100% BPA-Free Educational Toys, Bangla/English/Arabic Talking Audio Books, Montessori Wooden Puzzles, Anti-Colic Bottles & Organic Baby Care',
    domain: 'smartbabu.com.bd',
    folderSlug: 'smartbabu_toys',
    primaryColor: '#0D9488',
    icon: Baby,
    files: [
      { path: 'src/website/smartbabu_toys/index.ts', kind: 'index' },
      {
        path: 'src/website/smartbabu_toys/pages/SmartBabuToysLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/smartbabu_toys/component/SmartBabuNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/smartbabu_toys/component/SmartBabuHeroAgeAudioSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/smartbabu_toys/component/SmartBabuCatalogSafetySection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/smartbabu_toys/component/SmartBabuGiftBundlesCodSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/smartbabu_toys/component/SmartBabuParentCommunityFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'smartbabu_nav_1',
        type: 'navbar',
        title: 'SmartBabu (স্মার্টবাবু)',
        subtitle:
          'মোবাইল স্ক্রিন ছাড়াই সোনামণির মেধা বিকাশ — ১০০% BPA-Free, ফুড-গ্রেড ও নন-টক্সিক লার্নিং খেলনা · সারা বাংলাদেশে ক্যাশ অন ডেলিভারি',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'smartbabu_hero_1',
        type: 'hero',
        title:
          'মোবাইল স্ক্রিনের নেশা নয় — সোনামণির শৈশব কাটুক নিরাপদ মন্টেসরি খেলনা ও কথা বলা বইয়ের আনন্দে!',
        subtitle:
          'ভাত খাওয়ানো বা কান্না থামানোর জন্য বাবুর হাতে মোবাইল তুলে দিচ্ছেন? অতিরিক্ত স্ক্রিন-টাইম শিশুর কথা বলা (Speech Development) ও চোখের মারাত্মক ক্ষতি করে। স্মার্টবাবু নিয়ে এসেছে ১০০% ফুড-গ্রেড, BPA-Free এবং নন-টক্সিক কাঠের মন্টেসরি পাজল, বাংলা-ইংরেজি-আরবি টকিং অডিও বুক এবং পেডিয়াট্রিশিয়ান অনুমোদিত বেবি কেয়ার এসেনশিয়ালস।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'smartbabu_catalog_1',
        type: 'metrics',
        title:
          'সোনামণির মেধা বিকাশ ও নিরাপদ যত্নের ৬টি সিগনেচার প্রোডাক্ট — ১০০% নন-টক্সিক গ্যারান্টি',
        subtitle:
          'প্রতিটি কার্ডে রয়েছে সেফটি ব্যাজ (100% BPA Free / Non-Toxic Paint) এবং বয়স অনুযায়ী (০–১২ মাস, ১–৩ বছর, ৩–৬ বছর) উপকারিতা।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'smartbabu_checkout_1',
        type: 'pricing',
        title:
          'সোনামণির জন্মদিন বা আকিকার সেরা উপহার — প্রিমিয়াম গিফট র‍্যাপিং ও ১-ক্লিক ক্যাশ অন ডেলিভারি!',
        subtitle:
          'অগ্রিম ১ টাকাও দিতে হবে না। ডেলিভারি ম্যানের সামনে বক্স খুলে প্রোডাক্টের কোয়ালিটি ও অডিও বুকের সাউন্ড চেক করে মূল্য পরিশোধ করুন।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'smartbabu_footer_1',
        type: 'footer',
        title:
          '৪২,০০০+ সচেতন বাংলাদেশি মা-বাবা ও প্যারেন্টিং কমিউনিটির বাস্তব অভিজ্ঞতা',
        subtitle:
          'যাঁরা মোবাইল কার্টুনের বদলে সোনামণির হাতে তুলে দিয়েছেন আমাদের নিরাপদ লার্নিং খেলনা ও বেবি কেয়ার প্রোডাক্ট।',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'tannery71_leather',
    name: 'Tannery 71 (ট্যানারি ৭১ — ১০০% ফুল-গ্রেইন খাঁটি লেদার ওয়ালেট, বেল্ট ও অফিস ব্যাগ)',
    tagline:
      '100% Full-Grain Export-Grade Cowhide Leather Wallets, RFID Cardholders, Reversible Formal Belts, Laptop Messenger Bags & Custom Name Engraving',
    domain: 'tannery71.com.bd',
    folderSlug: 'tannery71_leather',
    primaryColor: '#A0522D',
    icon: Briefcase,
    files: [
      { path: 'src/website/tannery71_leather/index.ts', kind: 'index' },
      {
        path: 'src/website/tannery71_leather/pages/Tannery71LeatherLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/tannery71_leather/component/Tannery71Navbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/tannery71_leather/component/Tannery71HeroAuthenticitySection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/tannery71_leather/component/Tannery71CollectionColorToggleSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/tannery71_leather/component/Tannery71UnboxingEngravingCheckoutSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/tannery71_leather/component/Tannery71CorporateWarrantyFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'tannery71_nav_1',
        type: 'navbar',
        title: 'Tannery 71 (ট্যানারি ৭১)',
        subtitle:
          '১০০% ফুল-গ্রেইন এক্সপোর্ট-গ্রেড চামড়ার আভিজাত্য · ৫ বছরের রিপ্লেসমেন্ট ওয়ারেন্টি · সারা বাংলাদেশে ক্যাশ অন ডেলিভারি',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'tannery71_hero_1',
        type: 'hero',
        title:
          'কয়েক মাসেই চামড়া ওঠা সস্তা রেক্সিনকে বিদায় — গ্রহণ করুন ১০০% ফুল-গ্রেইন খাঁটি লেদারের রাজকীয় আভিজাত্য!',
        subtitle:
          'বাজারের ৯০% দোকানেই আসল চামড়ার নাম করে বিক্রি হয় প্লাস্টিক কোটেড রেক্সিন বা বন্ডেড লেদার। ট্যানারি ৭১ সরাসরি বাংলাদেশের শীর্ষ এক্সপোর্ট ট্যানারি থেকে বাছাইকৃত ১০০% ফুল-গ্রেইন কাউহাইড চামড়ায় তৈরি করছে প্রিমিয়াম ওয়ালেট, বেল্ট, ল্যাপটপ ব্যাগ ও ফরমাল জুতা — সাথে থাকছে ৫ বছরের লিখিত রিপ্লেসমেন্ট গ্যারান্টি।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'tannery71_catalog_1',
        type: 'metrics',
        title:
          'আমাদের ৫টি সিগনেচার এক্সপোর্ট-গ্রেড লেদার কালেকশন — লাইভ কালার সুইচারসহ (Tan · Dark Brown · Jet Black)',
        subtitle:
          'রঙের সোয়াচে ক্লিক করে আপনার পছন্দের শেডটি তাৎক্ষণিক দেখুন — কোনো পেজ রিলোড ছাড়াই হাই-রেজোলিউশন প্রিভিউ।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'tannery71_checkout_1',
        type: 'pricing',
        title:
          'প্রিয়জন বা কর্পোরেট উপহারের সেরা আয়োজন — লাক্সারি গিফট বক্স আনবক্সিং ও কাস্টম নাম খোদাই (+৳২০০)!',
        subtitle:
          'অগ্রিম ১ টাকাও দিতে হবে না। ডেলিভারি ম্যানের সামনে বক্স খুলে চামড়ার ঘ্রাণ, সেলাই ও ফিনিশিং পরখ করে মূল্য পরিশোধ করুন।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'tannery71_footer_1',
        type: 'footer',
        title:
          'কর্পোরেট গিফটিং ও বিটুবি (B2B) বাল্ক অর্ডার + ৩১,০০০+ এক্সিকিউটিভ গ্রাহকের বাস্তব রিভিউ',
        subtitle:
          'যাঁরা সস্তা রেক্সিন ছেড়ে ট্যানারি ৭১-এর ১০০% ফুল-গ্রেইন লেদার ও ৫ বছরের ওয়ারেন্টিতে আস্থা রেখেছেন।',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'gadgetghor_tech',
    name: 'GadgetGhor BD (গ্যাজেটঘর — স্মার্ট টেক গ্যাজেট, TWS, AMOLED ওয়াচ ও 100W GaN চার্জার)',
    tagline:
      '100% Authentic Global Variant TWS Earbuds (38ms Gaming), Super AMOLED Smartwatches, 65W–100W GaN Chargers, 20,000mAh Power Banks & Mechanical Keyboards',
    domain: 'gadgetghor.com.bd',
    folderSlug: 'gadgetghor_tech',
    primaryColor: '#0284C7',
    icon: Cpu,
    files: [
      { path: 'src/website/gadgetghor_tech/index.ts', kind: 'index' },
      {
        path: 'src/website/gadgetghor_tech/pages/GadgetGhorTechLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/gadgetghor_tech/component/GadgetGhorNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/gadgetghor_tech/component/GadgetGhorHeroWarrantySerialSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/gadgetghor_tech/component/GadgetGhorCatalogSpecMatrixSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/gadgetghor_tech/component/GadgetGhorUnboxingFlashCodSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/gadgetghor_tech/component/GadgetGhorReviewsWarrantyFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'gadgetghor_nav_1',
        type: 'navbar',
        title: 'GadgetGhor BD (গ্যাজেটঘর)',
        subtitle:
          '১০০% অরিজিনাল গ্লোবাল ভ্যারিয়েন্ট · ৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট ও ৬/১২ মাসের অফিশিয়াল ওয়ারেন্টি গ্যারান্টি',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'gadgetghor_hero_1',
        type: 'hero',
        title:
          'নকল মাস্টার-কপি ও ওয়ারেন্টি ভোগান্তিকে বিদায় — আসল স্মার্ট গ্যাজেটে সুপারফাস্ট পারফরম্যান্স ও অফিশিয়াল ওয়ারেন্টি!',
        subtitle:
          'ফুটপাত বা নামহীন পেজের সস্তা ক্লোন কিনে কয়েক দিনেই চার্জ না থাকা বা এক পাশের ইয়ারবাড নষ্ট হওয়ার দিন শেষ! GadgetGhor BD দিচ্ছে ১০০% অরিজিনাল গ্লোবাল ভ্যারিয়েন্ট লো-লেটেন্সি TWS ইয়ারবাডস, Super AMOLED স্মার্টওয়াচ, 100W GaN ফাস্ট চার্জার ও মেকানিক্যাল কিবোর্ড — সাথে ৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট ও ১২ মাসের অফিশিয়াল ওয়ারেন্টি।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'gadgetghor_catalog_1',
        type: 'metrics',
        title:
          'আমাদের ৫টি বেস্ট-সেলিং স্মার্ট গ্যাজেট ও মোবাইল অ্যাক্সেসরিজ + ইন্টারেক্টিভ টেক স্পেক তুলনা (Spec Matrix)',
        subtitle:
          'প্রতিটি গ্যাজেটের ব্যাটারি ব্যাকআপ, ব্লুটুথ ভার্সন, ওয়াটার রেজিস্ট্যান্স ও গেমিং লেটেন্সি পাশাপাশি মিলিয়ে নিন।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'gadgetghor_checkout_1',
        type: 'pricing',
        title:
          'বাংলাদেশি টেক ইউটিউবারদের আনবক্সিং রিভিউ + ফ্ল্যাশ কম্বো ডিল ও ১-ক্লিক ক্যাশ অন ডেলিভারি!',
        subtitle:
          'ডেলিভারি ম্যানের সামনে বক্স খুলে, সিরিয়াল কোড মিলিয়ে এবং ফোনে কানেক্ট করে তারপর মূল্য পরিশোধ করুন।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'gadgetghor_footer_1',
        type: 'footer',
        title:
          '৬৫,০০০+ গেমার, প্রফেশনাল ও স্মার্টফোন ইউজারের বাস্তব অভিজ্ঞতা + অনলাইন ওয়ারেন্টি ক্লেইম পোর্টাল',
        subtitle:
          'যাঁরা সস্তা রেপ্লিকা ছেড়ে গ্যাজেটঘরের ১০০% অরিজিনাল গ্যাজেট ও ৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট ওয়ারেন্টিতে আস্থা রেখেছেন।',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'seoulglow_kbeauty',
    name: 'SeoulGlow BD (সিউল গ্লো — ১০০% অরিজিনাল কোরিয়ান স্কিনকেয়ার ও গ্লাস-স্কিন হাব)',
    tagline:
      '100% Authentic Imported Korean Skincare (COSRX, Beauty of Joseon, Anua, Skin1004, Axis-Y, Round Lab) · 10X Money-Back Guarantee & Batch Code Verifier',
    domain: 'seoulglow.com.bd',
    folderSlug: 'seoulglow_kbeauty',
    primaryColor: '#E07A5F',
    icon: Sparkles,
    files: [
      { path: 'src/website/seoulglow_kbeauty/index.ts', kind: 'index' },
      {
        path: 'src/website/seoulglow_kbeauty/pages/SeoulGlowKBeautyLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/seoulglow_kbeauty/component/SeoulGlowNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/seoulglow_kbeauty/component/SeoulGlowHeroQuizAuthenticatorSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/seoulglow_kbeauty/component/SeoulGlowCatalogQuizSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/seoulglow_kbeauty/component/SeoulGlowBundleRoutineCodSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/seoulglow_kbeauty/component/SeoulGlowProofFaqFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'seoulglow_nav_1',
        type: 'navbar',
        title: 'SeoulGlow BD (সিউল গ্লো)',
        subtitle:
          '✨ ১০০% অরিজিনাল কোরিয়ান স্কিনকেয়ার গ্যারান্টি | নকল প্রমাণ করতে পারলে ১০ গুণ টাকা ফেরত! | ঢাকায় ২৪ ঘণ্টায় এক্সপ্রেস ডেলিভারি',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'seoulglow_hero_1',
        type: 'hero',
        title:
          'কোরিয়ান গ্লাস-স্কিন এখন আর স্বপ্ন নয় — ১০০% অথেনটিক কে-বিউটি প্রোডাক্টে পান দাগহীন, উজ্জ্বল ও স্বাস্থ্যকর ত্বক!',
        subtitle:
          'লোকাল মার্কেটের ভেজাল ও রেপ্লিকা কসমেটিকস ব্যবহার করে ত্বকের বারোটা বাজাবেন না। আমরা সরাসরি দক্ষিণ কোরিয়ার অফিশিয়াল ডিস্ট্রিবিউটর থেকে আমদানি করি ১০০% আসল স্কিনকেয়ার।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'seoulglow_catalog_1',
        type: 'metrics',
        title:
          'আমাদের বেস্ট-সেলিং কোরিয়ান স্কিনকেয়ার কালেকশন (COSRX · Beauty of Joseon · Anua · Skin1004 · Axis-Y)',
        subtitle:
          'প্রতিটি প্রোডাক্টের সাথে থাকছে অফিশিয়াল কোরিয়ান ব্যাচ কোড ভেরিফিকেশন এবং নকল প্রমাণে ১০ গুণ টাকা ফেরতের লিখিত গ্যারান্টি। যেকোনো প্রোডাক্ট কার্ডে ক্লিক করে বিস্তারিত দেখুন।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'seoulglow_bundle_cod_1',
        type: 'pricing',
        title:
          'দ্য ৩-স্টেপ কোরিয়ান গ্লাস-স্কিন স্টার্টার কিট — আলাদা কিনলে ৳ ৪,৮০০ | কম্বো অফার মূল্য: ৳ ৩,৯৯০ + ফ্রি ডেলিভারি!',
        subtitle:
          'অগ্রিম ১ টাকাও দিতে হবে না। ডেলিভারি ম্যানের সামনে প্রোডাক্টের বারকোড ও ব্যাচ কোড স্ক্যান করে অরিজিনাল নিশ্চিত হয়ে মূল্য পরিশোধ করুন।',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'seoulglow_footer_1',
        type: 'footer',
        title:
          '৪৮,০০০+ বাংলাদেশি কে-বিউটি লাভারদের ৪ সপ্তাহের গ্লাস-স্কিন ট্রান্সফরমেশন ও ভেরিফাইড রিভিউ',
        subtitle:
          'যেকোনো কার্ডে ক্লিক করে গ্রাহকের ব্যবহৃত প্রোডাক্ট রুটিন এবং সপ্তাহভিত্তিক পরিবর্তন বিস্তারিত দেখুন।',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'inboxshield_b2b',
    name: 'InboxShield (B2B Email Infrastructure & Deliverability Studio)',
    tagline:
      'Done-For-You Cold Email Infrastructure, DNS Authentication (SPF, 2048-Bit DKIM, DMARC p=reject), Domain Warmup & 24/7 Spam Repair',
    domain: 'inboxshield.io',
    folderSlug: 'inboxshield_b2b',
    primaryColor: '#10B981',
    icon: Shield,
    files: [
      { path: 'src/website/inboxshield_b2b/index.ts', kind: 'index' },
      {
        path: 'src/website/inboxshield_b2b/pages/InboxShieldLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/inboxshield_b2b/component/InboxShieldNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/inboxshield_b2b/component/InboxShieldHeroRiskGraderSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/inboxshield_b2b/component/InboxShieldPainSliderSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/inboxshield_b2b/component/InboxShieldPricingCheckoutSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/inboxshield_b2b/component/InboxShieldFaqFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'inboxshield_nav_1',
        type: 'navbar',
        title: 'InboxShield',
        subtitle:
          'Done-For-You B2B Cold Email Infrastructure · 2048-Bit DKIM, Strict DMARC p=reject & Automated Inbox Warmup in 24 Hours',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'inboxshield_hero_1',
        type: 'hero',
        title: 'Stop Landing in Spam. Own Your Inbox Deliverability.',
        subtitle:
          'Done-for-you cold email infrastructure, DNS authentication (SPF, DKIM, DMARC), domain warmup, and proactive spam repair for B2B sales teams.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'inboxshield_pain_slider_1',
        type: 'metrics',
        title:
          'Why 65% of B2B Cold Emails Land in Spam — And How We Engineer 98% Primary Inbox Placement',
        subtitle:
          'Compare an unoptimized DIY outbound setup against the productized InboxShield infrastructure method, then drag the Before/After slider to inspect real open-rate and pipeline recovery telemetry.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'inboxshield_pricing_1',
        type: 'pricing',
        title:
          'Transparent, Productized Pricing. Built for B2B Outbound Scale.',
        subtitle:
          'Choose a one-time infrastructure buildout ($499) or continuous 24/7 deliverability protection ($199/mo) with instant Stripe/Paddle checkout and automated DNS onboarding.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'inboxshield_footer_1',
        type: 'footer',
        title:
          'Technical Questions from RevOps, Founders & Outbound Agencies',
        subtitle:
          'Everything you need to know about secondary domain isolation, 14-day warmup timelines, blacklist delisting, and zero-password DNS delegation.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'shiftpantry_b2b',
    name: 'ShiftPantry (Hybrid Office Snack, Coffee & Pantry Autopilot)',
    tagline:
      'Curated Healthy Snack Boxes, Artisanal Whole-Bean Coffee & Automated Pantry Subscriptions for Hybrid Offices',
    domain: 'shiftpantry.com',
    folderSlug: 'shiftpantry_b2b',
    primaryColor: '#1B4332',
    icon: Coffee,
    files: [
      { path: 'src/website/shiftpantry_b2b/index.ts', kind: 'index' },
      {
        path: 'src/website/shiftpantry_b2b/pages/ShiftPantryLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/shiftpantry_b2b/component/ShiftPantryNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/shiftpantry_b2b/component/ShiftPantryHeroHowItWorksSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/shiftpantry_b2b/component/ShiftPantryCalculatorSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/shiftpantry_b2b/component/ShiftPantryCuratedBoxesCheckoutSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/shiftpantry_b2b/component/ShiftPantryTestimonialsFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'shiftpantry_nav_1',
        type: 'navbar',
        title: 'ShiftPantry',
        subtitle:
          'Curated Healthy Snacks · Artisan Whole-Bean Coffee · Automated Restock',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'shiftpantry_hero_1',
        type: 'hero',
        title: 'The Hybrid Office Pantry, on Autopilot.',
        subtitle:
          'Curated healthy snack boxes, artisanal coffee, and pantry essentials delivered directly to your office. Zero manual runs, 100% automated.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'shiftpantry_calculator_1',
        type: 'metrics',
        title: 'Right-Size Your Pantry for Your Hybrid Schedule',
        subtitle:
          'Never overpay for empty Fridays again. Slide your team headcount and in-office anchor days to calculate your exact monthly crate and specialty coffee volume.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'shiftpantry_boxes_1',
        type: 'pricing',
        title: 'Curated Office Crates Built for Every Dietary Preference',
        subtitle:
          'Click any box below to view its complete SKU manifest, macro breakdown, and allergen partitioning protocol—or add directly to your office subscription.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'shiftpantry_footer_1',
        type: 'footer',
        title: '10+ Hours Saved Monthly. Happier Hybrid Teams on Tue–Thu.',
        subtitle:
          'Click any office story below to inspect their exact monthly spend, hybrid attendance lift, and before/after breakroom transformation.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'careserial_bd',
    name: 'CareSerial BD (Bangladesh Doctor, Dental & Diagnostic Booking Portal)',
    tagline:
      'Real-Time BMDC Specialist Chamber Serials, Multi-Chamber Slot Picker, bKash/Nagad Pre-Booking & Automated SMS Confirmation across Dhaka & Chattogram',
    domain: 'careserial.com.bd',
    folderSlug: 'careserial_bd',
    primaryColor: '#0D9488',
    icon: Stethoscope,
    files: [
      { path: 'src/website/careserial_bd/index.ts', kind: 'index' },
      {
        path: 'src/website/careserial_bd/pages/CareSerialLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/careserial_bd/component/CareSerialNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/careserial_bd/component/CareSerialHeroDirectorySection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/careserial_bd/component/CareSerialChamberSchedulerSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/careserial_bd/component/CareSerialPatientIntakeSmsSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/careserial_bd/component/CareSerialTrustClinicFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'careserial_nav_1',
        type: 'navbar',
        title: 'CareSerial BD',
        subtitle:
          'Specialist Chambers · Dental Clinics · Diagnostic Labs · Dhaka & Chattogram',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'careserial_hero_1',
        type: 'hero',
        title:
          'Skip the Waiting Room. Book Trusted Doctors & Diagnostics in Minutes.',
        subtitle:
          'Real-time appointment scheduling for top specialist doctors, dental clinics, and diagnostic tests across Dhaka & Chattogram.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'careserial_scheduler_1',
        type: 'metrics',
        title: 'Switch Practice Chambers & Lock Your Exact Serial Number',
        subtitle:
          'Select between Dhanmondi, Gulshan, and Chattogram chambers, browse the 14-day schedule strip, and reserve your time slot with a 5-minute real-time inventory lock.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'careserial_intake_1',
        type: 'pricing',
        title: 'Complete Patient Intake & Receive Instant SMS Serial Pass',
        subtitle:
          'Supports Bangla & English patient names, 11-digit BD mobile verification, Pay-at-Chamber or bKash/Nagad pre-booking, and real-time SMS chamber queue tracking.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'careserial_footer_1',
        type: 'footer',
        title:
          'Inside Our Partner Chambers, Sterile Dental Suites & Diagnostic Labs',
        subtitle:
          'Click any facility card below to inspect our Class-B dental autoclave protocols, 3.0T MRI diagnostic accuracy, and verified patient booking reviews.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'edutect_bd',
    name: 'EduTect (BD EduTech, IELTS, BCS & Skill Coaching Platform)',
    tagline:
      'High-Converting Bangladesh EduTech & Mentor Portfolio with Interactive Curriculum Video Player, Verified Band 8.0+ / BCS Proof Gallery & 2-Step bKash/Nagad Enrollment',
    domain: 'edutect.com.bd',
    folderSlug: 'edutect_bd',
    primaryColor: '#2563EB',
    icon: GraduationCap,
    files: [
      { path: 'src/website/edutect_bd/index.ts', kind: 'index' },
      {
        path: 'src/website/edutect_bd/pages/EduTectLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/edutect_bd/component/EduTectNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/edutect_bd/component/EduTectHeroCredentialsSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/edutect_bd/component/EduTectCurriculumDemoSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/edutect_bd/component/EduTectSuccessProofSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/edutect_bd/component/EduTectPricingEnrollmentFaqFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'edutect_nav_1',
        type: 'navbar',
        title: 'EduTect BD',
        subtitle:
          "Bangladesh's Top-Rated Exam & Skill Mentorship Portal • লাইভ ব্যাচ ও রেকর্ডেড মাস্টারক্লাস",
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'edutect_hero_1',
        type: 'hero',
        title:
          "Master IELTS, BCS & Tech Skills with Bangladesh's Top-Rated Mentor.",
        subtitle:
          'Join 15,000+ successful students. Comprehensive batch coaching, live classes, recorded modules, and exam-tested resources.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'edutect_curriculum_1',
        type: 'metrics',
        title: 'Structured Exam-Tested Syllabus & Free HD Demo Lessons',
        subtitle:
          'Expand any module below to inspect Bangla + English lesson topics, PDF lecture sheets, and click "Free Preview" to launch the interactive HD video player.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'edutect_proof_1',
        type: 'pricing',
        title:
          'Real IELTS Band 8.0+ Scorecards, BCS Cadres & Verified Batch Reviews',
        subtitle:
          'Filter by High Scorers, Video Feedback, or Official Scorecard Screenshots—and click any card to inspect the full verified TRF result sheet.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'edutect_footer_1',
        type: 'footer',
        title:
          'Choose Your Learning Track & Complete 2-Minute bKash/Nagad Enrollment',
        subtitle:
          'Click any tier card to inspect full batch deliverables, or complete the 2-step checkout below for instant SMS access to our private Telegram group and student portal.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'eduteact_student',
    name: 'EduTeact Student (BD EduTech Student Portal Dashboard & LMS)',
    tagline:
      'Low-Latency Bangladeshi Student Learning Portal with Collapsible Dark Slate Sidebar, Live Class Countdown, 360p/720p/1080p Video Player, Timed Mock Quiz Engine, Lecture Sheet Vault & QR-Verified Certificate',
    domain: 'portal.eduteact.com.bd',
    folderSlug: 'eduteact_student',
    primaryColor: '#4F46E5',
    icon: GraduationCap,
    files: [
      { path: 'src/website/eduteact_student/index.ts', kind: 'index' },
      {
        path: 'src/website/eduteact_student/pages/EduTeactStudentLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/eduteact_student/component/EduTeactStudentNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/eduteact_student/component/EduTeactStudentOverviewWorkspaceSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/eduteact_student/component/EduTeactStudentCoursePlayerSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/eduteact_student/component/EduTeactStudentExamsResourcesSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/eduteact_student/component/EduTeactStudentCommunityCertificateFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'eduteact_student_overview_1',
        type: 'hero',
        title: 'Welcome back, Tasnim Mahi 👋',
        subtitle:
          'আপনার আজকের লার্নিং টার্গেট: রাইটিং টাস্ক ২ লাইভ ক্লাসে অংশ নেওয়া এবং মক টেস্ট ০৭ সম্পন্ন করা।',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'khabardirect_bd',
    name: 'KhabarDirect BD (Direct Cloud Kitchen, Cafe & Bakery Ordering Platform)',
    tagline:
      'Commission-Free Direct Food Ordering Platform for Bangladesh (Banani, Dhanmondi, Uttara, Gulshan, Mirpur, Chattogram) with Real-Time Area & Fee Calculator, Tabbed Menu & Patty/Add-On Customizer, Slide-Over Cart, 1-Page MFS/COD Checkout & Live Order Tracker',
    domain: 'order.khabardirect.com.bd',
    folderSlug: 'khabardirect_bd',
    primaryColor: '#E11D48',
    icon: UtensilsCrossed,
    files: [
      { path: 'src/website/khabardirect_bd/index.ts', kind: 'index' },
      {
        path: 'src/website/khabardirect_bd/pages/KhabarDirectLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/khabardirect_bd/component/KhabarDirectNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/khabardirect_bd/component/KhabarDirectHeroZoneSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/khabardirect_bd/component/KhabarDirectTabbedMenuSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/khabardirect_bd/component/KhabarDirectCheckoutMfsSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/khabardirect_bd/component/KhabarDirectTrustHygieneFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'khabardirect_nav_1',
        type: 'navbar',
        title: 'KhabarDirect BD',
        subtitle:
          'Zero 28% aggregator markup · Direct thermal rider dispatch across Dhaka & Chattogram',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'khabardirect_hero_1',
        type: 'hero',
        title: 'Fresh Hot Meals, Direct to Your Door.',
        subtitle:
          'Order directly from Smokey Ember Kitchen & Artisan Bakery for exclusive menu combos, faster thermal-sealed delivery, and zero 28% third-party app markups.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'khabardirect_menu_1',
        type: 'metrics',
        title: 'Explore Our Direct Cloud Kitchen & Bakery Menu',
        subtitle:
          'Click any dish to customize patty sizes, spice levels, and add-ons with instant BDT pricing.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'khabardirect_checkout_1',
        type: 'pricing',
        title: 'Direct Order Checkout, MFS Gateway & Live Rider Tracking',
        subtitle:
          'Complete your order in under 30 seconds with +880 OTP auto-fill, exact-change Cash on Delivery, or instant bKash/Nagad merchant QR.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'khabardirect_footer_1',
        type: 'footer',
        title: 'Inside Our Certified Cloud Kitchens & 30–45 Min Delivery Promise',
        subtitle:
          'Every order is cooked fresh, sealed with a tamper-evident thermal strip, and delivered by our dedicated rider fleet.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'lexchambers_bd',
    name: 'LexChambers & Associates BD (Supreme Court, Corporate Law & Tax Advisory)',
    tagline:
      'High-Trust Legal Advocate, Corporate Law Firm & Tax Consultancy Portal with 6-Domain Statutory Practice Grid, Anonymized Case Precedents, Section 126 Privileged Document Intake, Chamber Slot Scheduler & Legal Insights Hub',
    domain: 'chambers.lexchambers.com.bd',
    folderSlug: 'lexchambers_bd',
    primaryColor: '#D97706',
    icon: Scale,
    files: [
      { path: 'src/website/lexchambers_bd/index.ts', kind: 'index' },
      {
        path: 'src/website/lexchambers_bd/pages/LexChambersLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/lexchambers_bd/component/LexChambersNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/lexchambers_bd/component/LexChambersHeroPracticeSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/lexchambers_bd/component/LexChambersPrecedentsProcessSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/lexchambers_bd/component/LexChambersIntakeSchedulerSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/lexchambers_bd/component/LexChambersInsightsFaqFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'lexchambers_nav_1',
        type: 'navbar',
        title: 'LexChambers & Associates',
        subtitle:
          'Supreme Court of Bangladesh (Appellate & High Court Divisions) · Corporate & Tax Chambers',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'lexchambers_hero_1',
        type: 'hero',
        title: 'Strategic Legal Representation. Uncompromising Integrity.',
        subtitle:
          'Providing high-stakes corporate legal counsel, Supreme Court & High Court advocacy, regulatory compliance, and NBR tax advisory services across Bangladesh and international jurisdictions.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'lexchambers_precedents_1',
        type: 'metrics',
        title: 'Notable Case Precedents, High Court Writs & Corporate Closings',
        subtitle:
          'Anonymized track record of constitutional writ petitions, cross-border M&A joint ventures, Taxes Appellate Tribunal victories, and BIAC/SIAC arbitrations.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'lexchambers_intake_1',
        type: 'pricing',
        title: 'Confidential Matter Evaluation & Chamber Consultation Booking',
        subtitle:
          'Submit your case brief and preliminary documents under Section 126 Evidence Act privilege, run an instant conflict check, and reserve a private chamber or encrypted video slot.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'lexchambers_footer_1',
        type: 'footer',
        title: 'Legal Insights, Finance Act Tax Briefs & Statutory Checklists',
        subtitle:
          'Download complimentary 2026 corporate tax checklists, RJSC incorporation guides, and 30-year Dhaka property title vetting SOPs prepared by our Partners.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'atelier_forma_bd',
    name: 'Atelier Forma BD (Architecture, Luxury Interiors & 3D Spatial Viz)',
    tagline:
      'Luxury Architectural & Interior Design Portfolio with Filterable Masonry Gallery, Case Study Lightbox, Interactive Before/After & 3D Clay-to-4K Render Slider, Sq.Ft. Cost Estimator & Tactile Materiality Board',
    domain: 'studio.atelierforma.com.bd',
    folderSlug: 'atelier_forma_bd',
    primaryColor: '#B8860B',
    icon: Compass,
    files: [
      { path: 'src/website/atelier_forma_bd/index.ts', kind: 'index' },
      {
        path: 'src/website/atelier_forma_bd/pages/AtelierFormaLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/atelier_forma_bd/component/AtelierFormaNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/atelier_forma_bd/component/AtelierFormaHeroMasonrySection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/atelier_forma_bd/component/AtelierFormaBeforeAfterServicesSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/atelier_forma_bd/component/AtelierFormaCostEstimatorIntakeSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/atelier_forma_bd/component/AtelierFormaMaterialityTestimonialsFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'atelier_forma_nav_1',
        type: 'navbar',
        title: 'ATELIER FORMA',
        subtitle:
          'Architectural Design, Bespoke Interiors & 4K/VR Spatial Visualization · Dhaka & Chattogram',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'atelier_forma_hero_1',
        type: 'hero',
        title: 'Architectural Clarity. Sculpted Living Spaces.',
        subtitle:
          'Full-service architectural design, interior transformation, and 3D spatial visualization for residential apartments, luxury duplexes, and commercial spaces.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'atelier_forma_slider_1',
        type: 'metrics',
        title: 'From Raw Brick & 3D Wireframes to Tactile Reality.',
        subtitle:
          'Drag the interactive split-screen slider to compare raw civil site conditions and 3ds Max clay geometry against our photorealistic 4K Corona renders and handed-over interiors.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'atelier_forma_estimator_1',
        type: 'pricing',
        title: 'Project Cost & Scope Estimator.',
        subtitle:
          'Configure your space typology, square footage, execution scope, and material tier for an instant 2026 Dhaka/Chattogram budget & timeline projection.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'atelier_forma_footer_1',
        type: 'footer',
        title: 'Quiet Proportion, Tropical Light & Honest Materiality.',
        subtitle:
          'Led by Principal Architect Ar. Zafar Mahmood (IAB), our studio pairs architectural rigor with an in-house 18,000 sq. ft. CNC joinery and stone atelier.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
  {
    id: 'craftvector_uiux',
    name: 'CraftVector UI/UX & Product Designer',
    tagline:
      'High-Craft UI/UX & Digital Product Designer Portfolio with Deep-Dive Case Studies, Interactive Figma Token & Command Palette Playground, 4-Step Engineering Handoff Workflow & Scope Calculator',
    domain: 'portfolio.craftvector.design',
    folderSlug: 'craftvector_uiux',
    primaryColor: '#6366F1',
    icon: Layers,
    files: [
      { path: 'src/website/craftvector_uiux/index.ts', kind: 'index' },
      {
        path: 'src/website/craftvector_uiux/pages/CraftVectorLandingPage.tsx',
        kind: 'page',
      },
      {
        path: 'src/website/craftvector_uiux/component/CraftVectorNavbar.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/craftvector_uiux/component/CraftVectorHeroCaseStudiesSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/craftvector_uiux/component/CraftVectorPlaygroundProcessSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/craftvector_uiux/component/CraftVectorEngagementScopeIntakeSection.tsx',
        kind: 'component',
      },
      {
        path: 'src/website/craftvector_uiux/component/CraftVectorEndorsementsFaqFooterSection.tsx',
        kind: 'component',
      },
    ],
    sections: [
      {
        id: 'craftvector_nav_1',
        type: 'navbar',
        title: 'CRAFTVECTOR // RAFIQ ARMAN',
        subtitle:
          'Staff UI/UX & Digital Product Designer · B2B SaaS, Fintech & Design Systems',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'craftvector_hero_1',
        type: 'hero',
        title: 'Designing Scalable Digital Products with Uncompromising Craft.',
        subtitle:
          'Senior UI/UX & Product Designer specializing in B2B SaaS platforms, complex design systems, and high-converting web/mobile applications from 0→1 to enterprise scale.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'craftvector_playground_1',
        type: 'metrics',
        title: 'Interactive Component Playground & Design System Sandbox.',
        subtitle:
          'Test live keyboard-first command palettes, W3C design token radius math, and stateful SaaS pricing primitives before inspecting the 4-step engineering handoff workflow.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'craftvector_engagement_1',
        type: 'pricing',
        title: 'Flexible Product Design & Systems Partnerships.',
        subtitle:
          'Whether you need a rapid 0→1 YC MVP sprint, an embedded monthly design systems partner, or a full-time Staff Product Designer—configure your scope below.',
        variant: 'varient_1',
        visible: true,
      },
      {
        id: 'craftvector_footer_1',
        type: 'footer',
        title: 'Trusted by Y Combinator Founders & Series B Engineering Leaders.',
        subtitle:
          'Verified outcomes across activation funnels, developer observability tools, and multi-brand Figma + React design systems.',
        variant: 'varient_1',
        visible: true,
      },
    ],
  },
];

const WEBSITE_COLOR_SWATCHES = [
  { id: 'craftvector_violet', name: 'CraftVector Electric Indigo', hex: '#6366F1' },
  { id: 'craftvector_royal', name: 'CraftVector Light Mode Indigo', hex: '#4F46E5' },
  { id: 'atelier_bronze', name: 'Atelier Forma Muted Bronze', hex: '#B8860B' },
  { id: 'atelier_charcoal', name: 'Atelier Architectural Charcoal', hex: '#121212' },
  { id: 'lexchambers_brass', name: 'LexChambers Prestige Gold/Brass', hex: '#D97706' },
  { id: 'lexchambers_navy', name: 'LexChambers Executive Navy', hex: '#0F172A' },
  { id: 'khabardirect_crimson', name: 'KhabarDirect Appetite Crimson', hex: '#E11D48' },
  { id: 'khabardirect_terracotta', name: 'KhabarDirect Flame Terracotta', hex: '#F97316' },
  { id: 'eduteact_royal', name: 'EduTeact Royal Indigo', hex: '#4F46E5' },
  { id: 'edutect_blue', name: 'EduTect Electric Blue', hex: '#2563EB' },
  { id: 'edutect_indigo', name: 'EduTect Royal Indigo', hex: '#1E1B4B' },
  { id: 'careserial_teal', name: 'CareSerial Medical Teal', hex: '#0D9488' },
  { id: 'shiftpantry_forest', name: 'ShiftPantry Forest Green', hex: '#1B4332' },
  { id: 'shiftpantry_amber', name: 'ShiftPantry Espresso Amber', hex: '#D97706' },
  { id: 'inboxshield_emerald', name: 'InboxShield Cyber Emerald', hex: '#10B981' },
  { id: 'seoulglow_coral', name: 'SeoulGlow Rose Coral', hex: '#E07A5F' },
  { id: 'seoulglow_cyan', name: 'Clinical Authenticity Cyan', hex: '#06B6D4' },
  { id: 'gadgetghor_cyan', name: 'GadgetGhor Cyber Blue', hex: '#0284C7' },
  { id: 'tannery_saddle', name: 'Tannery 71 Saddle Tan', hex: '#A0522D' },
  { id: 'smartbabu_teal', name: 'SmartBabu Montessori Teal', hex: '#0D9488' },
  { id: 'fitghor_volt', name: 'FitGhor Volt Orange', hex: '#FF4500' },
  { id: 'rooh_gold', name: 'Arabian Liquid Gold', hex: '#D4AF37' },
  { id: 'purepata_forest', name: 'Sreemangal Estate Green', hex: '#1E4620' },
  { id: 'torque_crimson', name: 'Torque Racing Crimson', hex: '#E11D48' },
  { id: 'orchard_emerald', name: 'Orchard Deep Green', hex: '#14532D' },
  { id: 'mango_amber', name: 'Mango Harvest Amber', hex: '#D97706' },
  { id: 'aura_emerald', name: 'AURA Royal Emerald', hex: '#0F5132' },
  { id: 'aura_coral', name: 'AURA Crimson Coral', hex: '#E05242' },
  { id: 'fractional_gold', name: 'FractionalCore Amber Gold', hex: '#D97706' },
  { id: 'audit_emerald', name: 'AuditPulse Emerald Mint', hex: '#10B981' },
  { id: 'verdant_sage', name: 'Deep Forest Sage', hex: '#2C4A3E' },
  { id: 'verdant_clay', name: 'Warm Terracotta Clay', hex: '#D37B58' },
  { id: 'velvet_terracotta', name: 'Velvet Terracotta', hex: '#C86D51' },
  { id: 'quantum_blue', name: 'Quantum Cobalt', hex: '#2563EB' },
  { id: 'bazar_orange', name: 'Bazar Orange', hex: '#F37021' },
  { id: 'cardio_emerald', name: 'Cardiology Emerald', hex: '#118C74' },
  { id: 'medical_navy', name: 'Medical Royal Navy', hex: '#1D2B6B' },
  { id: 'healing_teal', name: 'Clinical Mint Teal', hex: '#48B89F' },
  { id: 'plum', name: 'Bazar Royal Plum', hex: '#54408C' },
  { id: 'obsidian', name: 'Atelier Obsidian', hex: '#18181B' },
  { id: 'crimson', name: 'Press Crimson', hex: '#BE123C' },
];

const WEBSITE_FONT_OPTIONS = [
  { id: 'jakarta', name: 'Plus Jakarta Sans', stack: "'Plus Jakarta Sans', sans-serif" },
  { id: 'playfair', name: 'Playfair Display', stack: "'Playfair Display', Georgia, serif" },
  { id: 'inter', name: 'Inter', stack: "'Inter', sans-serif" },
  { id: 'fraunces', name: 'Fraunces Serif', stack: "'Fraunces', Georgia, serif" },
  { id: 'space', name: 'Space Grotesk', stack: "'Space Grotesk', sans-serif" },
];

const SAMPLE_BOOKS_CATALOG = [
  {
    id: 'w_b1',
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
    category: 'Literary Fiction',
    price: '$14.99',
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'w_b2',
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    category: 'Philosophy & Essays',
    price: '$20.99',
    rating: '4.8',
    image:
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'w_b3',
    title: 'The Art of War — Collector Edition',
    author: 'Sun Tzu',
    category: 'Classical Strategy',
    price: '$18.50',
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'w_b4',
    title: 'Bright Young Women',
    author: 'Jessica Knoll',
    category: 'Contemporary Thriller',
    price: '$24.00',
    rating: '4.7',
    image:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80',
  },
];

export interface WebsiteLandingStudioProps {
  onSwitchPlatformMode: (mode: 'mobile' | 'website') => void;
  isDarkGlobal?: boolean;
}

export const WebsiteLandingStudio: React.FC<WebsiteLandingStudioProps> = ({
  onSwitchPlatformMode,
}) => {
  const [projects, setProjects] = useState<WebsiteProjectPreset[]>(INITIAL_WEBSITE_PROJECTS);
  const [activeProjectId, setActiveProjectId] =
    useState<WebsiteTemplateId>('craftvector_uiux');
  const [selectedSectionId, setSelectedSectionId] =
    useState<string>('craftvector_nav_1');
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState<boolean>(false);
  const [isMobileLeftSidebarOpen, setIsMobileLeftSidebarOpen] = useState<boolean>(false);
  const [drawerTab, setDrawerTab] = useState<'add_section' | 'manage_sections' | 'theme'>('add_section');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [viewportWidth, setViewportWidth] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeFontId, setActiveFontId] = useState<string>('jakarta');
  const [catalogCategoryFilter, setCatalogCategoryFilter] = useState<string>('All');
  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);
  const [isExportingZip, setIsExportingZip] = useState<boolean>(false);
  const [isCanvasLoading, setIsCanvasLoading] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [draggedSectionId, setDraggedSectionId] = useState<string | null>(null);
  const [dragOverSectionId, setDragOverSectionId] = useState<string | null>(null);
  const [dragOverPosition, setDragOverPosition] = useState<'before' | 'after'>('before');
  const [armedDragSectionId, setArmedDragSectionId] = useState<string | null>(null);

  const triggerCanvasLoader = () => {
    setIsCanvasLoading(true);
    setTimeout(() => setIsCanvasLoading(false), 520);
  };

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeProjectId) || projects[0],
    [projects, activeProjectId]
  );

  const primaryColor = activeProject.primaryColor;
  const activeFont =
    WEBSITE_FONT_OPTIONS.find((f) => f.id === activeFontId) || WEBSITE_FONT_OPTIONS[0];

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2400);
  };

  const updateProjectSections = (
    updater: (prev: WebsiteSectionInstance[]) => WebsiteSectionInstance[]
  ) => {
    setProjects((prev) =>
      prev.map((proj) =>
        proj.id === activeProject.id
          ? { ...proj, sections: updater(proj.sections) }
          : proj
      )
    );
  };

  const updatePrimaryColor = (hex: string) => {
    setProjects((prev) =>
      prev.map((proj) =>
        proj.id === activeProject.id ? { ...proj, primaryColor: hex } : proj
      )
    );
  };

  const handleAddSection = (
    libItem: WebsiteLibraryItem,
    chosenVariant: WebsiteSectionVariantId = 'varient_1'
  ) => {
    const newSec: WebsiteSectionInstance = {
      id: `sec_${libItem.type}_${Date.now().toString(36)}`,
      type: libItem.type,
      title: libItem.defaultTitle,
      subtitle: libItem.defaultSubtitle,
      variant: chosenVariant,
      visible: true,
    };

    updateProjectSections((prev) => {
      // Insert before footer if footer exists, otherwise at end
      const footerIdx = prev.findIndex((s) => s.type === 'footer');
      if (footerIdx !== -1 && libItem.type !== 'footer') {
        const copy = [...prev];
        copy.splice(footerIdx, 0, newSec);
        return copy;
      }
      return [...prev, newSec];
    });

    setSelectedSectionId(newSec.id);
    triggerToast(`Added "${libItem.label}" (${chosenVariant.replace('varient_', 'V')}) to page`);
  };

  const handleChangeSectionVariant = (
    sectionId: string,
    variant: WebsiteSectionVariantId
  ) => {
    updateProjectSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, variant } : s))
    );
  };

  const handleToggleSectionVisibility = (sectionId: string) => {
    updateProjectSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, visible: !s.visible } : s))
    );
  };

  const handleMoveSection = (sectionId: string, dir: 'up' | 'down') => {
    updateProjectSections((prev) => {
      const idx = prev.findIndex((s) => s.id === sectionId);
      if (idx === -1) return prev;
      const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(idx, 1);
      copy.splice(targetIdx, 0, moved);
      return copy;
    });
  };

  const handleDropReorderSection = (
    sourceId: string,
    targetId: string,
    position: 'before' | 'after'
  ) => {
    if (!sourceId || !targetId || sourceId === targetId) return;
    let movedSectionLabel = '';
    updateProjectSections((prev) => {
      const fromIdx = prev.findIndex((s) => s.id === sourceId);
      const toIdx = prev.findIndex((s) => s.id === targetId);
      if (fromIdx === -1 || toIdx === -1) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(fromIdx, 1);
      movedSectionLabel = moved.type.replace('doctor_', '').replace(/_/g, ' ').toUpperCase();
      const updatedTargetIdx = copy.findIndex((s) => s.id === targetId);
      const insertIdx = position === 'after' ? updatedTargetIdx + 1 : updatedTargetIdx;
      copy.splice(insertIdx, 0, moved);
      return copy;
    });
    if (movedSectionLabel) {
      triggerToast(`Repositioned ${movedSectionLabel} section`);
    }
  };

  const handleDeleteSection = (sectionId: string) => {
    updateProjectSections((prev) => prev.filter((s) => s.id !== sectionId));
    triggerToast('Removed section from landing page');
  };

  const handleExportWebsiteZip = async () => {
    if (isExportingZip) return;
    setIsExportingZip(true);
    try {
      const zip = new JSZip();
      const slug = activeProject.folderSlug || activeProject.id;
      zip.file(
        'README.md',
        `# ${activeProject.name} — Responsive Website Landing Page\n\n- **Project Structure**:\n  - \`src/website/${slug}\`\n  - \`src/website/${slug}/pages\`\n  - \`src/website/${slug}/component\`\n- **Domain**: \`${activeProject.domain}\`\n- **Primary Brand Color**: \`${primaryColor}\`\n- **Typography**: \`${activeFont.name}\`\n- **Sections Count**: ${activeProject.sections.length}\n\n## Quick Start\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n`
      );
      zip.file(
        `src/website/${slug}/website-sections-config.json`,
        JSON.stringify(activeProject, null, 2)
      );
      activeProject.files.forEach((f) => {
        zip.file(
          f.path,
          `// ${f.path}\n// Generated by AppForge Web Studio for ${activeProject.name}\n`
        );
      });
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${slug}-website-source.zip`;
      a.click();
      URL.revokeObjectURL(url);
      triggerToast(`Exported src/website/${slug} .ZIP`);
    } finally {
      setIsExportingZip(false);
    }
  };

  const selectedSectionObj =
    activeProject.sections.find((s) => s.id === selectedSectionId) ||
    activeProject.sections[0];

  const availableVariantIds: WebsiteSectionVariantId[] =
    activeProject.id === 'inboxshield_b2b' ||
    activeProject.id === 'seoulglow_kbeauty' ||
    activeProject.id === 'gadgetghor_tech' ||
    activeProject.id === 'tannery71_leather' ||
    activeProject.id === 'smartbabu_toys' ||
    activeProject.id === 'fitghor_fitness' ||
    activeProject.id === 'rooh_perfumery' ||
    activeProject.id === 'purepata_tea' ||
    activeProject.id === 'auto_bike_care' ||
    activeProject.id === 'organic_fruits_sweets' ||
    activeProject.id === 'panjabi_store' ||
    activeProject.id === 'fractional_core' ||
    activeProject.id === 'audit_pulse' ||
    activeProject.id === 'verdant_spaces' ||
    activeProject.id === 'nexus_growth_lab' ||
    activeProject.id === 'coffee_shop' ||
    activeProject.id === 'teacher_profile' ||
    activeProject.id === 'doctor_profile_2' ||
    activeProject.id === 'store_website' ||
    activeProject.id === 'store_admin_website'
      ? ['varient_1', 'varient_2', 'varient_3']
      : ['varient_1', 'varient_2', 'varient_3', 'varient_4', 'varient_5', 'varient_6'];

  // Render an individual landing page section inside the full-width right canvas
  const renderWebsiteSection = (sec: WebsiteSectionInstance) => {
    if (!sec.visible) return null;
    const isSelected = selectedSectionId === sec.id;
    const isBrutalist = sec.variant === 'varient_3' && activeProject.id !== 'doctor_profile_2';
    const isBento = sec.variant === 'varient_2' || sec.variant === 'varient_4';
    const isDarkSection =
      (sec.variant === 'varient_5' && activeProject.id !== 'doctor_profile_2') ||
      (sec.variant === 'varient_3' && activeProject.id === 'doctor_profile_2') ||
      isDark;

    const sectionWrapperStyle: React.CSSProperties = {
      backgroundColor: isDarkSection ? '#0E0C16' : '#FFFFFF',
      color: isDarkSection ? '#F8FAFC' : '#111827',
      borderBottom: isBrutalist
        ? `2px solid ${isDarkSection ? '#334155' : '#111827'}`
        : `1px solid ${isDarkSection ? '#1E293B' : '#E5E7EB'}`,
    };

    const cardSurfaceStyle: React.CSSProperties = {
      backgroundColor: isDarkSection ? '#161422' : '#F9FAFB',
      borderColor: isBrutalist
        ? isDarkSection
          ? '#F8FAFC'
          : '#111827'
        : isDarkSection
        ? '#262338'
        : '#E5E7EB',
      borderWidth: isBrutalist ? '2px' : '1px',
      borderStyle: 'solid',
      borderRadius: isBrutalist ? '4px' : isBento ? '20px' : '14px',
      boxShadow: isBrutalist
        ? `4px 4px 0px ${primaryColor}`
        : '0 4px 20px -4px rgba(0,0,0,0.05)',
    };

    const isBeingDragged = draggedSectionId === sec.id;
    const isDropTarget = dragOverSectionId === sec.id && draggedSectionId !== sec.id;

    return (
      <div
        key={sec.id}
        draggable={armedDragSectionId === sec.id}
        onDragStart={(e) => {
          if (armedDragSectionId !== sec.id) {
            e.preventDefault();
            return;
          }
          setDraggedSectionId(sec.id);
          setSelectedSectionId(sec.id);
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', sec.id);
        }}
        onDragOver={(e) => {
          if (!draggedSectionId || draggedSectionId === sec.id) return;
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          const rect = e.currentTarget.getBoundingClientRect();
          const midpoint = rect.top + rect.height / 2;
          const pos: 'before' | 'after' = e.clientY < midpoint ? 'before' : 'after';
          if (dragOverSectionId !== sec.id) {
            setDragOverSectionId(sec.id);
          }
          if (dragOverPosition !== pos) {
            setDragOverPosition(pos);
          }
        }}
        onDrop={(e) => {
          e.preventDefault();
          const sourceId = draggedSectionId || e.dataTransfer.getData('text/plain');
          if (sourceId && sourceId !== sec.id) {
            handleDropReorderSection(sourceId, sec.id, dragOverPosition);
          }
          setDraggedSectionId(null);
          setDragOverSectionId(null);
          setArmedDragSectionId(null);
        }}
        onDragEnd={() => {
          setDraggedSectionId(null);
          setDragOverSectionId(null);
          setArmedDragSectionId(null);
        }}
        onClick={() => setSelectedSectionId(sec.id)}
        style={sectionWrapperStyle}
        className={`group relative transition-all cursor-pointer ${
          isSelected ? 'ring-2 ring-inset' : ''
        } ${isBeingDragged ? 'opacity-45 scale-[0.99] ring-2 ring-[#48B89F] border-dashed' : ''}`}
      >
        {/* Top Drop Insertion Indicator Line when dragging a section above this section */}
        {isDropTarget && dragOverPosition === 'before' && (
          <div className="pointer-events-none absolute top-0 inset-x-0 z-40 flex items-center justify-center">
            <div className="w-full h-1.5 bg-[#48B89F] shadow-[0_0_14px_#48B89F]" />
            <span className="absolute -top-3 px-3 py-0.5 rounded-full bg-[#1D2B6B] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-lg border border-[#48B89F]">
              Drop Section Above {sec.type.replace('doctor_', '').replace(/_/g, ' ')}
            </span>
          </div>
        )}

        {/* Bottom Drop Insertion Indicator Line when dragging a section below this section */}
        {isDropTarget && dragOverPosition === 'after' && (
          <div className="pointer-events-none absolute bottom-0 inset-x-0 z-40 flex items-center justify-center">
            <div className="w-full h-1.5 bg-[#48B89F] shadow-[0_0_14px_#48B89F]" />
            <span className="absolute -bottom-3 px-3 py-0.5 rounded-full bg-[#1D2B6B] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-lg border border-[#48B89F]">
              Drop Section Below {sec.type.replace('doctor_', '').replace(/_/g, ' ')}
            </span>
          </div>
        )}

        {/* Left Drag-and-Drop Builder Handle Pill on Hover / Active */}
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            setArmedDragSectionId(sec.id);
          }}
          onMouseUp={() => setArmedDragSectionId(null)}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedSectionId(sec.id);
          }}
          title="Drag handle to reposition this section up or down"
          className={`absolute top-2.5 left-2.5 sm:top-3 sm:left-4 z-30 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl border text-[10px] sm:text-[11px] font-extrabold shadow-lg cursor-grab active:cursor-grabbing select-none transition-all ${
            isSelected || isBeingDragged
              ? 'opacity-100'
              : 'opacity-0 group-hover:opacity-100'
          }`}
          style={{
            backgroundColor: primaryColor,
            borderColor: '#48B89F',
            color: '#FFFFFF',
          }}
        >
          <GripVertical size={12} className="text-[#48B89F]" />
          <Move size={11} className="text-white/80 hidden sm:inline" />
          <span className="tracking-wider uppercase text-[9px] sm:text-[10px]">
            <span className="hidden sm:inline">Drag Section · </span>
            {sec.type.replace('doctor_', '').replace(/_/g, ' ')}
          </span>
        </div>

        {/* Floating Quick Section Inspector Bar on Hover / Active */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-4 z-30 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg border text-[10px] sm:text-[11px] font-bold shadow-md transition-opacity ${
            isSelected
              ? 'opacity-100'
              : 'opacity-0 group-hover:opacity-100'
          }`}
          style={{
            backgroundColor: isDark ? '#18181B' : '#FFFFFF',
            borderColor: primaryColor,
            color: isDark ? '#F8FAFC' : '#111827',
          }}
        >
          <div
            onMouseDown={(e) => {
              e.stopPropagation();
              setArmedDragSectionId(sec.id);
            }}
            onMouseUp={() => setArmedDragSectionId(null)}
            title="Drag to reorder section"
            className="p-0.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-grab active:cursor-grabbing flex items-center"
            style={{ color: primaryColor }}
          >
            <GripVertical size={13} />
          </div>
          <span className="hidden sm:inline font-mono text-[10px]" style={{ color: primaryColor }}>
            {sec.type.toUpperCase()}
          </span>
          <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">|</span>
          <select
            value={sec.variant}
            onChange={(e) =>
              handleChangeSectionVariant(
                sec.id,
                e.target.value as WebsiteSectionVariantId
              )
            }
            className="bg-transparent text-[10px] sm:text-[11px] font-bold focus:outline-none cursor-pointer"
          >
            {availableVariantIds.map((v) => (
              <option key={v} value={v} className="text-neutral-900">
                {v.replace('varient_', 'Variant ')}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => handleMoveSection(sec.id, 'up')}
            className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
            title="Move Section Up"
          >
            <ArrowUp size={12} />
          </button>
          <button
            type="button"
            onClick={() => handleMoveSection(sec.id, 'down')}
            className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
            title="Move Section Down"
          >
            <ArrowDown size={12} />
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedSectionId(sec.id);
              setDrawerTab('manage_sections');
              setIsRightDrawerOpen(true);
            }}
            className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
            title="Edit in Right Drawer"
          >
            <SlidersHorizontal size={12} />
          </button>
        </div>

        {/* SECTION 1: NAVBAR */}
        {sec.type === 'navbar' &&
          (activeProject.id === 'craftvector_uiux' ? (
            <CraftVectorNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
              onToggleTheme={() => setIsDark((prev) => !prev)}
            />
          ) : activeProject.id === 'atelier_forma_bd' ? (
            <AtelierFormaNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'lexchambers_bd' ? (
            <LexChambersNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'khabardirect_bd' ? (
            <KhabarDirectNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'eduteact_student' ? (
            <EduTeactStudentNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'edutect_bd' ? (
            <EduTectNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'careserial_bd' ? (
            <CareSerialNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'shiftpantry_b2b' ? (
            <ShiftPantryNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'inboxshield_b2b' ? (
            <InboxShieldNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'seoulglow_kbeauty' ? (
            <SeoulGlowNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'gadgetghor_tech' ? (
            <GadgetGhorNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'tannery71_leather' ? (
            <Tannery71Navbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'smartbabu_toys' ? (
            <SmartBabuNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'fitghor_fitness' ? (
            <FitGhorNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'rooh_perfumery' ? (
            <RoohNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'purepata_tea' ? (
            <PurePataNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'auto_bike_care' ? (
            <AutoCareNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'organic_fruits_sweets' ? (
            <OrganicFruitsNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'panjabi_store' ? (
            <PanjabiStoreNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'fractional_core' ? (
            <FractionalCoreNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'audit_pulse' ? (
            <AuditPulseNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'verdant_spaces' ? (
            <VerdantNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'nexus_growth_lab' ? (
            <NexusNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'coffee_shop' ? (
            <CoffeeNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'teacher_profile' ? (
            <TeacherNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'store_admin_website' ? (
            <StoreAdminNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'store_website' ? (
            <StoreNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'doctor_profile_2' ? (
            <Doctor2Navbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'doctor_profile' ? (
            <DoctorNavbar
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : (
            <header className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-xs"
                  style={{ backgroundColor: primaryColor }}
                >
                  {sec.title.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <span className="text-base font-extrabold tracking-tight">
                    {sec.title}
                  </span>
                  {sec.variant === 'varient_6' && (
                    <span className="block text-[10px] opacity-65">{sec.subtitle}</span>
                  )}
                </div>
              </div>

              <nav className="hidden md:flex items-center gap-7 text-xs font-semibold opacity-80">
                <a href="#catalog" onClick={(e) => e.preventDefault()} className="hover:opacity-100">
                  Curated Catalog
                </a>
                <a href="#features" onClick={(e) => e.preventDefault()} className="hover:opacity-100">
                  Editorial Standards
                </a>
                <a href="#membership" onClick={(e) => e.preventDefault()} className="hover:opacity-100">
                  First-Edition Club
                </a>
                <a href="#reviews" onClick={(e) => e.preventDefault()} className="hover:opacity-100">
                  Reader Notes
                </a>
              </nav>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => triggerToast('Opened Member Sign In Modal')}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold opacity-85 hover:opacity-100 cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => triggerToast('Exploring Curated Collection')}
                  className="px-4 py-2 rounded-lg text-xs font-extrabold text-white shadow-xs transition hover:opacity-95 cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  Explore Store
                </button>
              </div>
            </header>
          ))}

        {/* SECTION 2: HERO */}
        {sec.type === 'hero' &&
          (activeProject.id === 'craftvector_uiux' ? (
            <CraftVectorHeroCaseStudiesSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'atelier_forma_bd' ? (
            <AtelierFormaHeroMasonrySection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'lexchambers_bd' ? (
            <LexChambersHeroPracticeSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'khabardirect_bd' ? (
            <KhabarDirectHeroZoneSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'eduteact_student' ? (
            <EduTeactStudentOverviewWorkspaceSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'edutect_bd' ? (
            <EduTectHeroCredentialsSection
              title={sec.title}
              subtitle={sec.subtitle}
              ctaText="Enroll in Next Batch"
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'careserial_bd' ? (
            <CareSerialHeroDirectorySection
              title={sec.title}
              subtitle={sec.subtitle}
              ctaText="Find Serial"
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'shiftpantry_b2b' ? (
            <ShiftPantryHeroHowItWorksSection
              title={sec.title}
              subtitle={sec.subtitle}
              ctaText="Calculate Your Office Plan"
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'inboxshield_b2b' ? (
            <InboxShieldHeroRiskGraderSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'seoulglow_kbeauty' ? (
            <SeoulGlowHeroQuizAuthenticatorSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'gadgetghor_tech' ? (
            <GadgetGhorHeroWarrantySerialSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'tannery71_leather' ? (
            <Tannery71HeroAuthenticitySection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'smartbabu_toys' ? (
            <SmartBabuHeroAgeAudioSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'fitghor_fitness' ? (
            <FitGhorHeroSpecsSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'rooh_perfumery' ? (
            <RoohHeroScentFinderSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'purepata_tea' ? (
            <PurePataHeroTraceabilitySection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'auto_bike_care' ? (
            <AutoCareHeroCompatibilitySection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'organic_fruits_sweets' ? (
            <OrganicFruitsHeroHarvestSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'panjabi_store' ? (
            <PanjabiStoreHeroSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'fractional_core' ? (
            <FractionalCoreHeroSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'audit_pulse' ? (
            <AuditPulseHeroSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'verdant_spaces' ? (
            <VerdantHeroSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'nexus_growth_lab' ? (
            <NexusHeroSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'coffee_shop' ? (
            <CoffeeHeroSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'teacher_profile' ? (
            <TeacherHeroSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
              onBookTrial={() =>
                triggerToast('Scrolling to 30-Min Free Trial Calendar Booking')
              }
              onViewSchedule={() =>
                triggerToast('Viewing Live Weekly Lightboard Availability')
              }
            />
          ) : activeProject.id === 'store_admin_website' ? (
            <StoreAdminHeroOverviewSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'store_website' ? (
            <StoreHeroSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'doctor_profile_2' ? (
            <Doctor2HeroSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
              onBookAppointment={() =>
                triggerToast('Booking Cardiology Consultation with Dr. Arjun Mehta')
              }
              onLearnMore={() =>
                triggerToast('Calling HeartCare Clinic: (212) 555-0193')
              }
            />
          ) : activeProject.id === 'doctor_profile' ? (
            <DoctorHeroSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
              onBookAppointment={() =>
                triggerToast('Scrolling to Schedule an Appointment Form')
              }
              onLearnMore={() =>
                triggerToast('Viewing About Dr. Sarah Mitchell & Credentials')
              }
            />
          ) : (
            <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
              <div
                className={`grid grid-cols-1 ${
                  sec.variant === 'varient_2'
                    ? 'text-center max-w-3xl mx-auto gap-10'
                    : 'lg:grid-cols-12 gap-12 items-center'
                }`}
              >
                <div
                  className={
                    sec.variant === 'varient_2' ? 'space-y-6' : 'lg:col-span-7 space-y-6'
                  }
                >
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase opacity-75">
                    <span style={{ color: primaryColor }}>2026 Editorial Collection</span>
                    <span>·</span>
                    <span>Archival Hardcovers &amp; Rare Press</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1]">
                    {sec.title}
                  </h1>

                  <p className="text-sm sm:text-base opacity-75 leading-relaxed max-w-2xl">
                    {sec.subtitle}
                  </p>

                  <div
                    className={`flex flex-wrap items-center gap-3.5 pt-2 ${
                      sec.variant === 'varient_2' ? 'justify-center' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => triggerToast('Browsing 2026 Curated Catalog')}
                      className="px-6 py-3.5 rounded-xl text-xs font-extrabold text-white flex items-center gap-2 shadow-md hover:opacity-95 transition cursor-pointer"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <span>Browse First Editions</span>
                      <ArrowRight size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerToast('Viewing Reader Society Perks')}
                      style={cardSurfaceStyle}
                      className="px-6 py-3.5 rounded-xl text-xs font-extrabold hover:opacity-90 transition cursor-pointer"
                    >
                      View Society Membership
                    </button>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-6 text-xs opacity-75">
                    <div>
                      <strong className="font-extrabold text-sm">45,000+</strong> Archival Titles
                    </div>
                    <span>·</span>
                    <div>
                      <strong className="font-extrabold text-sm">4.96 ★</strong> Collector Rating
                    </div>
                    <span>·</span>
                    <div>
                      <strong className="font-extrabold text-sm">Free</strong> Express Worldwide Courier
                    </div>
                  </div>
                </div>

                {sec.variant !== 'varient_2' && (
                  <div className="lg:col-span-5">
                    <div
                      style={cardSurfaceStyle}
                      className="p-5 space-y-4 relative overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-3.5">
                        {SAMPLE_BOOKS_CATALOG.slice(0, 2).map((book) => (
                          <div
                            key={book.id}
                            className="rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-2.5 space-y-2"
                          >
                            <img
                              src={book.image}
                              alt={book.title}
                              className="w-full h-44 object-cover rounded-lg"
                            />
                            <div className="text-xs font-extrabold truncate text-neutral-900 dark:text-white">
                              {book.title}
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-neutral-500 truncate">{book.author}</span>
                              <span className="font-extrabold" style={{ color: primaryColor }}>
                                {book.price}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="font-bold opacity-80">
                          Signed Collector Box · Dispatching Today
                        </span>
                        <span className="font-extrabold" style={{ color: primaryColor }}>
                          25% Member Discount
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}

        {/* DOCTOR / TEACHER PROFILE SECTION: ABOUT, CREDENTIALS & CORE VALUES */}
        {sec.type === 'doctor_about' &&
          (activeProject.id === 'teacher_profile' ? (
            <TeacherAboutVideoCredentialsSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'doctor_profile_2' ? (
            <Doctor2AboutSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : (
            <DoctorAboutSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ))}

        {/* DOCTOR PROFILE SECTION: MEDICAL SERVICES / SPECIALIZATIONS */}
        {sec.type === 'doctor_services' &&
          (activeProject.id === 'teacher_profile' ? (
            <TeacherServicesPricingSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'doctor_profile_2' ? (
            <Doctor2SpecializationsSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : (
            <DoctorServicesSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ))}

        {/* DOCTOR PROFILE SECTION: CARE JOURNEY (01-04) + INSURANCE & ACCESSIBILITY */}
        {sec.type === 'doctor_care_journey' && (
          <DoctorCareJourneySection
            title={sec.title}
            subtitle={sec.subtitle}
            variant={sec.variant}
            primaryColor={primaryColor}
            isDark={isDarkSection}
          />
        )}

        {/* DOCTOR / TEACHER / COFFEE SECTION: SCHEDULE APPOINTMENT / LOCATIONS & WHOLESALE */}
        {sec.type === 'doctor_appointment' &&
          (activeProject.id === 'coffee_shop' ? (
            <CoffeeLocationsWholesaleStorySection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'teacher_profile' ? (
            <TeacherBookingContactSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'doctor_profile_2' ? (
            <Doctor2LocationSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : (
            <DoctorAppointmentSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ))}

        {/* SECTION 3: PARTNER LOGOS */}
        {sec.type === 'logos' && (
          <section className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-xs font-bold uppercase tracking-wider opacity-60">
                {sec.title}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-black tracking-widest uppercase opacity-65">
                <span>PENGUIN CLASSICS</span>
                <span>·</span>
                <span>FOLIO SOCIETY</span>
                <span>·</span>
                <span>A24 PRESS</span>
                <span>·</span>
                <span>FITZCARRALDO</span>
                <span>·</span>
                <span>TASCHEN</span>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: CATALOG / PRODUCT SHOWCASE */}
        {sec.type === 'catalog' &&
          (activeProject.id === 'coffee_shop' ? (
            <CoffeeSeasonalMenuSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'store_admin_website' ? (
            <StoreAdminPagesRouterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'store_website' ? (
            <>
              <StoreCatalogSection
                title={sec.title}
                subtitle={sec.subtitle}
                variant={sec.variant}
                primaryColor={primaryColor}
                isDark={isDarkSection}
              />
              <StorePagesRouterSection
                variant={sec.variant}
                primaryColor={primaryColor}
                isDark={isDarkSection}
              />
            </>
          ) : (
            <section className="max-w-6xl mx-auto px-6 py-16 space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                    {sec.title}
                  </h2>
                  <p className="text-sm opacity-70 mt-1">{sec.subtitle}</p>
                </div>

                {/* Interactive Category Filter Bar */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 self-start">
                  {['All', 'Literary Fiction', 'Philosophy & Essays', 'Classical Strategy'].map(
                    (cat) => {
                      const active = catalogCategoryFilter === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCatalogCategoryFilter(cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                            active
                              ? 'text-white shadow-xs'
                              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                          }`}
                          style={active ? { backgroundColor: primaryColor } : undefined}
                        >
                          {cat}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  sec.variant === 'varient_4' ? 'lg:grid-cols-2' : 'lg:grid-cols-4'
                } gap-6`}
              >
                {SAMPLE_BOOKS_CATALOG.filter(
                  (b) => catalogCategoryFilter === 'All' || b.category === catalogCategoryFilter
                ).map((book) => (
                  <div
                    key={book.id}
                    style={cardSurfaceStyle}
                    className="p-4 flex flex-col justify-between space-y-4 transition-transform hover:-translate-y-0.5"
                  >
                    <div className="space-y-3">
                      <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] opacity-65">
                        <span>{book.category}</span>
                        <span>★ {book.rating}</span>
                      </div>
                      <h3 className="text-base font-extrabold leading-snug">{book.title}</h3>
                      <p className="text-xs opacity-70">By {book.author}</p>
                    </div>

                    <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                      <span className="text-base font-black" style={{ color: primaryColor }}>
                        {book.price}
                      </span>
                      <button
                        type="button"
                        onClick={() => triggerToast(`Added "${book.title}" to Bag`)}
                        className="px-3.5 py-2 rounded-lg text-xs font-extrabold text-white cursor-pointer transition hover:opacity-95"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

        {/* SECTION 5: FEATURES GRID */}
        {sec.type === 'features' && (
          <section className="max-w-6xl mx-auto px-6 py-16 space-y-10">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                {sec.title}
              </h2>
              <p className="text-sm opacity-70">{sec.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  num: '01.',
                  title: 'Archival Acid-Free Paper',
                  desc: 'Every hardcover is smyth-sewn on 120gsm Munken paper designed to endure for generations without yellowing.',
                },
                {
                  num: '02.',
                  title: 'Direct Author Royalties',
                  desc: 'Independent authors and translators receive 2x industry-standard royalties on every edition purchased.',
                },
                {
                  num: '03.',
                  title: 'Same-Day Weatherproof Dispatch',
                  desc: 'Hand-packed in custom corrugated book mailers with corner-impact protection and tracked express courier.',
                },
              ].map((feat) => (
                <div key={feat.num} style={cardSurfaceStyle} className="p-6 space-y-3">
                  <span
                    className="text-xs font-black tracking-wider"
                    style={{ color: primaryColor }}
                  >
                    {feat.num}
                  </span>
                  <h3 className="text-lg font-extrabold">{feat.title}</h3>
                  <p className="text-xs leading-relaxed opacity-75">{feat.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 6: METRICS */}
        {sec.type === 'metrics' &&
          (activeProject.id === 'craftvector_uiux' ? (
            <CraftVectorPlaygroundProcessSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'atelier_forma_bd' ? (
            <AtelierFormaBeforeAfterServicesSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'lexchambers_bd' ? (
            <LexChambersPrecedentsProcessSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'khabardirect_bd' ? (
            <KhabarDirectTabbedMenuSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'eduteact_student' ? (
            <EduTeactStudentCoursePlayerSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'edutect_bd' ? (
            <EduTectCurriculumDemoSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'careserial_bd' ? (
            <CareSerialChamberSchedulerSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'shiftpantry_b2b' ? (
            <ShiftPantryCalculatorSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'inboxshield_b2b' ? (
            <InboxShieldPainSliderSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'seoulglow_kbeauty' ? (
            <SeoulGlowCatalogQuizSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'gadgetghor_tech' ? (
            <GadgetGhorCatalogSpecMatrixSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'tannery71_leather' ? (
            <Tannery71CollectionColorToggleSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'smartbabu_toys' ? (
            <SmartBabuCatalogSafetySection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'fitghor_fitness' ? (
            <FitGhorCatalogLeadMagnetSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'rooh_perfumery' ? (
            <RoohCatalogComparisonSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'purepata_tea' ? (
            <PurePataCatalogSteepingSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'auto_bike_care' ? (
            <AutoCareCatalogComparisonSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'organic_fruits_sweets' ? (
            <OrganicFruitsCatalogTrustSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'panjabi_store' ? (
            <PanjabiStoreSizeGuideFabricSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'fractional_core' ? (
            <FractionalCoreCalculatorDirectorySection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'audit_pulse' ? (
            <AuditPulseEstimatorBreakdownSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'verdant_spaces' ? (
            <VerdantEstimatorPortfolioSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'nexus_growth_lab' ? (
            <NexusRoiCaseStudiesSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : (
            <section className="max-w-6xl mx-auto px-6 py-14">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: '45,200+', label: 'Curated Titles in Print' },
                  { value: '99.4%', label: 'Damage-Free Delivery Rate' },
                  { value: '120+', label: 'Independent Press Partners' },
                  { value: '64', label: 'Countries Shipped Daily' },
                ].map((m) => (
                  <div key={m.label} style={cardSurfaceStyle} className="p-6 text-center space-y-1">
                    <div
                      className="text-3xl font-black tracking-tight"
                      style={{ color: primaryColor }}
                    >
                      {m.value}
                    </div>
                    <div className="text-xs font-semibold opacity-70">{m.label}</div>
                  </div>
                ))}
              </div>
            </section>
          ))}

        {/* SECTION 7: TESTIMONIALS */}
        {sec.type === 'testimonials' &&
          (activeProject.id === 'teacher_profile' ? (
            <TeacherReviewsFaqSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'doctor_profile_2' ? (
            <Doctor2ReviewsSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : (
            <section className="max-w-6xl mx-auto px-6 py-16 space-y-10">
              <div className="max-w-2xl space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {sec.title}
                </h2>
                <p className="text-sm opacity-70">{sec.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    quote:
                      '“Bazar’s first-edition packaging is unmatched. Every hardcover arrives in museum-grade condition with thoughtful essay notes.”',
                    author: 'Elena Rostova',
                    role: 'Literary Critic · New York',
                  },
                  {
                    quote:
                      '“I discovered three translated novelists through the Bazar Society that became my favorite reads of the decade.”',
                    author: 'Marcus Vance',
                    role: 'Architect & Collector · London',
                  },
                  {
                    quote:
                      '“Fastest international book courier I have ever used, and their customer concierge genuinely knows literature.”',
                    author: 'Sora Takahashi',
                    role: 'Editorial Designer · Tokyo',
                  },
                ].map((rev) => (
                  <div
                    key={rev.author}
                    style={cardSurfaceStyle}
                    className="p-6 flex flex-col justify-between space-y-4"
                  >
                    <p className="text-xs sm:text-sm leading-relaxed italic opacity-85">
                      {rev.quote}
                    </p>
                    <div className="pt-3 border-t border-black/5 dark:border-white/10">
                      <div className="text-xs font-extrabold">{rev.author}</div>
                      <div className="text-[11px] opacity-65">{rev.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

        {/* SECTION 8: PRICING */}
        {sec.type === 'pricing' &&
          (activeProject.id === 'craftvector_uiux' ? (
            <CraftVectorEngagementScopeIntakeSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'atelier_forma_bd' ? (
            <AtelierFormaCostEstimatorIntakeSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'lexchambers_bd' ? (
            <LexChambersIntakeSchedulerSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'khabardirect_bd' ? (
            <KhabarDirectCheckoutMfsSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'eduteact_student' ? (
            <EduTeactStudentExamsResourcesSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'edutect_bd' ? (
            <EduTectSuccessProofSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'careserial_bd' ? (
            <CareSerialPatientIntakeSmsSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'shiftpantry_b2b' ? (
            <ShiftPantryCuratedBoxesCheckoutSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'inboxshield_b2b' ? (
            <InboxShieldPricingCheckoutSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'seoulglow_kbeauty' ? (
            <SeoulGlowBundleRoutineCodSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'gadgetghor_tech' ? (
            <GadgetGhorUnboxingFlashCodSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'tannery71_leather' ? (
            <Tannery71UnboxingEngravingCheckoutSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'smartbabu_toys' ? (
            <SmartBabuGiftBundlesCodSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'fitghor_fitness' ? (
            <FitGhorBdCheckoutSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'rooh_perfumery' ? (
            <RoohDiscoveryKitCodSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'purepata_tea' ? (
            <PurePataSubscriptionCodSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'auto_bike_care' ? (
            <AutoCareBundlesCodSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'organic_fruits_sweets' ? (
            <OrganicFruitsBulkCalculatorCodSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'panjabi_store' ? (
            <PanjabiStoreExpressCodSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'fractional_core' ? (
            <FractionalCoreAdvisoryMatchFormSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'audit_pulse' ? (
            <AuditPulseSecurityProcessBookingSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'verdant_spaces' ? (
            <VerdantPackagesCoverageBookingSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'nexus_growth_lab' ? (
            <NexusSolutionsBookingSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'coffee_shop' ? (
            <CoffeeSubscriptionSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'teacher_profile' ? (
            <TeacherServicesPricingSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
              onSelectPlan={(planName) =>
                triggerToast(`Selected "${planName}" — Locking in Calendar Slot`)
              }
            />
          ) : (
            <section className="max-w-6xl mx-auto px-6 py-16 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                {sec.title}
              </h2>
              <p className="text-sm opacity-70">{sec.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Reader Pass',
                  price: '$12',
                  period: '/month',
                  perks: [
                    '15% off all catalog titles',
                    'Free standard tracked delivery',
                    'Weekly Sunday Literary Dispatch',
                  ],
                  featured: false,
                },
                {
                  name: 'First-Edition Society',
                  price: '$29',
                  period: '/month',
                  perks: [
                    '1 signed hardcover delivered monthly',
                    '25% off all store & rare press titles',
                    'Priority express worldwide courier',
                    'Access to live author Q&A salons',
                  ],
                  featured: true,
                },
                {
                  name: 'Archival Patron',
                  price: '$79',
                  period: '/month',
                  perks: [
                    'Numbered slipcase collector editions',
                    'Personal literary concierge',
                    'Complimentary gift wrapping & bookplates',
                  ],
                  featured: false,
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  style={{
                    ...cardSurfaceStyle,
                    borderColor: plan.featured ? primaryColor : cardSurfaceStyle.borderColor,
                    borderWidth: plan.featured ? '2px' : cardSurfaceStyle.borderWidth,
                  }}
                  className="p-6 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold">{plan.name}</h3>
                      {plan.featured && (
                        <span
                          className="text-[11px] font-extrabold"
                          style={{ color: primaryColor }}
                        >
                          Most Popular
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black">{plan.price}</span>
                      <span className="text-xs opacity-65">{plan.period}</span>
                    </div>
                    <ul className="space-y-2.5 text-xs opacity-80">
                      {plan.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2">
                          <Check size={14} style={{ color: primaryColor }} />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => triggerToast(`Selected ${plan.name} Membership`)}
                    className="w-full py-3 rounded-xl text-xs font-extrabold transition cursor-pointer"
                    style={
                      plan.featured
                        ? { backgroundColor: primaryColor, color: '#FFFFFF' }
                        : {
                            backgroundColor: isDarkSection ? '#262338' : '#E5E7EB',
                            color: isDarkSection ? '#FFFFFF' : '#111827',
                          }
                    }
                  >
                    Choose {plan.name}
                  </button>
                </div>
              ))}
            </div>
          </section>
          ))}

        {/* SECTION 9: FAQ */}
        {sec.type === 'faq' && (
          <section className="max-w-4xl mx-auto px-6 py-16 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                {sec.title}
              </h2>
              <p className="text-sm opacity-70">{sec.subtitle}</p>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: 'How are rare and first-edition hardcovers packaged for international transit?',
                  a: 'Every book is wrapped in archival acid-free tissue, sealed in a moisture-barrier sleeve, and suspended inside a double-walled crush-proof book mailer.',
                },
                {
                  q: 'Can I pause or switch my First-Edition Society monthly book selection?',
                  a: 'Yes. On the 1st of each month you receive our editor’s preview and have 5 days to swap for any other title in our 45,000-book catalog or skip the month.',
                },
                {
                  q: 'Do you ship to PO Boxes and international addresses?',
                  a: 'We ship via DHL Express and FedEx Priority to 64 countries with full door-to-door tracking.',
                },
              ].map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={item.q}
                    style={cardSurfaceStyle}
                    className="p-4 transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between text-left text-sm font-extrabold cursor-pointer"
                    >
                      <span>{item.q}</span>
                      <ChevronRight
                        size={16}
                        className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <p className="text-xs leading-relaxed opacity-75 mt-3 pt-3 border-t border-black/5 dark:border-white/10">
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 10: CTA & NEWSLETTER */}
        {sec.type === 'cta_newsletter' && (
          <section className="max-w-6xl mx-auto px-6 py-16">
            <div
              className="rounded-3xl p-8 md:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="space-y-2 max-w-xl">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {sec.title}
                </h2>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  {sec.subtitle}
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newsletterEmail.trim()) return;
                  setNewsletterSubscribed(true);
                  setNewsletterEmail('');
                  triggerToast('Subscribed to Weekly Literary Dispatch!');
                }}
                className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your reader email..."
                  className="px-4 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder:text-white/65 text-xs font-semibold focus:outline-none min-w-[240px]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-white text-neutral-900 text-xs font-extrabold shadow-sm hover:opacity-95 transition cursor-pointer"
                >
                  {newsletterSubscribed ? 'Subscribed ✓' : 'Subscribe Now'}
                </button>
              </form>
            </div>
          </section>
        )}

        {/* SECTION 11: FOOTER */}
        {sec.type === 'footer' &&
          (activeProject.id === 'craftvector_uiux' ? (
            <CraftVectorEndorsementsFaqFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
              onToggleTheme={() => setIsDark((prev) => !prev)}
            />
          ) : activeProject.id === 'atelier_forma_bd' ? (
            <AtelierFormaMaterialityTestimonialsFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'lexchambers_bd' ? (
            <LexChambersInsightsFaqFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'khabardirect_bd' ? (
            <KhabarDirectTrustHygieneFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'eduteact_student' ? (
            <EduTeactStudentCommunityCertificateFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
              modeFilter="footer_only"
            />
          ) : activeProject.id === 'edutect_bd' ? (
            <EduTectPricingEnrollmentFaqFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'careserial_bd' ? (
            <CareSerialTrustClinicFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'shiftpantry_b2b' ? (
            <ShiftPantryTestimonialsFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'inboxshield_b2b' ? (
            <InboxShieldFaqFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'seoulglow_kbeauty' ? (
            <SeoulGlowProofFaqFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'gadgetghor_tech' ? (
            <GadgetGhorReviewsWarrantyFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'tannery71_leather' ? (
            <Tannery71CorporateWarrantyFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'smartbabu_toys' ? (
            <SmartBabuParentCommunityFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'fitghor_fitness' ? (
            <FitGhorSuccessFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'rooh_perfumery' ? (
            <RoohReviewsFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'purepata_tea' ? (
            <PurePataReviewsFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'auto_bike_care' ? (
            <AutoCareReviewsFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'organic_fruits_sweets' ? (
            <OrganicFruitsReviewsFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'panjabi_store' ? (
            <PanjabiStoreReviewsFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'fractional_core' ? (
            <FractionalCoreProofSitemapFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'audit_pulse' ? (
            <AuditPulsePricingFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'verdant_spaces' ? (
            <VerdantFaqFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'nexus_growth_lab' ? (
            <NexusTestimonialsFooterSection
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'coffee_shop' ? (
            <CoffeeFooter
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'teacher_profile' ? (
            <TeacherFooter
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'store_admin_website' ? (
            <StoreAdminFooter
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'store_website' ? (
            <StoreFooter
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'doctor_profile_2' ? (
            <Doctor2Footer
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : activeProject.id === 'doctor_profile' ? (
            <DoctorFooter
              title={sec.title}
              subtitle={sec.subtitle}
              variant={sec.variant}
              primaryColor={primaryColor}
              isDark={isDarkSection}
            />
          ) : (
            <footer className="max-w-6xl mx-auto px-6 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-black/10 dark:border-white/10">
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {sec.title.slice(0, 1).toUpperCase()}
                    </div>
                    <span className="text-base font-extrabold">{sec.title}</span>
                  </div>
                  <p className="text-xs opacity-65 max-w-sm leading-relaxed">
                    {sec.subtitle}
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="font-extrabold uppercase tracking-wider opacity-60">
                    Collections
                  </div>
                  <ul className="space-y-1.5 opacity-80">
                    <li>Signed First Editions</li>
                    <li>Literary Fiction</li>
                    <li>Philosophy &amp; Essays</li>
                    <li>Rare Press Archives</li>
                  </ul>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="font-extrabold uppercase tracking-wider opacity-60">
                    House &amp; Support
                  </div>
                  <ul className="space-y-1.5 opacity-80">
                    <li>Archival Packaging Standard</li>
                    <li>International Express Rates</li>
                    <li>Author Royalty Charter</li>
                    <li>Contact Literary Concierge</li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] opacity-60">
                <span>
                  © {new Date().getFullYear()} {activeProject.name}. All rights reserved.
                </span>
                <span>{activeProject.domain}</span>
              </div>
            </footer>
          ))}
      </div>
    );
  };

  return (
    <div
      className={`@container ${
        isDark ? 'dark bg-[#0d0f14] text-neutral-100' : 'bg-[#F8FAFC] text-neutral-900'
      } flex h-screen w-screen overflow-hidden font-sans antialiased`}
      style={{ fontFamily: activeFont.stack }}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl shadow-xl text-xs font-extrabold text-white flex items-center gap-2"
          style={{ backgroundColor: primaryColor }}
        >
          <CheckCircle2 size={15} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR: PLATFORM SWITCHER (MOBILE APP vs WEBSITE) + WEB PROJECTS */}
      {/* ========================================================================= */}
      {isMobileLeftSidebarOpen && (
        <div
          onClick={() => setIsMobileLeftSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-[1px] lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 lg:static lg:z-20 w-[265px] h-full flex flex-col flex-shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161c] transition-transform duration-300 ${
          isMobileLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black shadow-sm flex-shrink-0"
              style={{ backgroundColor: primaryColor }}
            >
              <Globe size={18} />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-100 truncate">
                AppForge Web Studio
              </h1>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                Landing Page Architect
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setDrawerTab('add_section');
              setIsRightDrawerOpen(true);
            }}
            title="Add Website Section"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-xs hover:opacity-95 transition flex-shrink-0 cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            <Plus size={15} />
          </button>
        </div>

        {/* PLATFORM MODE SWITCHER: MOBILE APP vs WEBSITE LANDING */}
        <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#101218]">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1.5 px-1">
            Workspace Platform Mode
          </div>
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-neutral-200/70 dark:bg-neutral-800">
            <button
              type="button"
              onClick={() => onSwitchPlatformMode('mobile')}
              className="py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition cursor-pointer"
            >
              <Smartphone size={13} />
              <span>Mobile App</span>
            </button>
            <button
              type="button"
              onClick={() => onSwitchPlatformMode('website')}
              className="py-2 px-2.5 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 text-white shadow-xs transition cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <Globe size={13} />
              <span>Website</span>
            </button>
          </div>
        </div>

        {/* Website Landing Projects List + Active Page Sections Outline */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5">
          {/* Website Templates */}
          <div className="space-y-2">
            <div className="px-1 flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                Website Projects ({projects.length})
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                Live
              </span>
            </div>

            {projects.map((proj) => {
              const IconComp = proj.icon;
              const isCurrent = proj.id === activeProject.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    triggerCanvasLoader();
                    setActiveProjectId(proj.id);
                    if (proj.sections[0]) {
                      setSelectedSectionId(proj.sections[0].id);
                    }
                  }}
                  className={`rounded-xl p-3 transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-2 bg-white dark:bg-[#181a22] shadow-xs'
                      : 'border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181a20] hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                  style={isCurrent ? { borderColor: primaryColor } : undefined}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: proj.primaryColor }}
                    >
                      <IconComp size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                        {proj.name}
                      </h3>
                      <p className="text-[10px] text-neutral-400 font-mono truncate">
                        src/website/{proj.folderSlug}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-[11px] text-neutral-500 flex items-center justify-between">
          <span>Website Builder Mode</span>
          <span className="font-mono text-[10px]">{viewportWidth.toUpperCase()}</span>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. FULL RIGHT SIDE: TOP BAR + FULL-WIDTH INTERACTIVE WEBSITE LANDING PAGE */}
      {/* ========================================================================= */}
      <DoctorCanvaEditorProvider
        viewportMode={viewportWidth}
        hideFloatingToolbar
        onElementSelect={() => setIsRightDrawerOpen(true)}
      >
        <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden bg-neutral-100/70 dark:bg-[#0B0D13] relative">
          {/* Top Website Studio Header Bar with Top-Right Menu Drawer Trigger */}
          <header className="min-h-16 px-3 sm:px-6 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#14161c]/95 backdrop-blur flex flex-wrap items-center justify-between gap-2 sm:gap-4 flex-shrink-0 z-20">
            {/* Left Mobile Sidebar Toggle + Breadcrumb & Live URL Pill */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setIsMobileLeftSidebarOpen((v) => !v)}
                className="lg:hidden p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 cursor-pointer"
                title="Toggle Studio Sidebar"
              >
                <Layers size={15} />
              </button>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-neutral-900 dark:text-white truncate">
                <Globe size={15} style={{ color: primaryColor }} className="flex-shrink-0" />
                <span className="truncate">{activeProject.name}</span>
              </div>
              <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">/</span>
              <span className="hidden xl:inline text-xs font-mono text-neutral-500 dark:text-neutral-400 truncate">
                https://{activeProject.domain}
              </span>
            </div>

            {/* Center Responsive Viewport Switcher (Desktop / Tablet / Mobile Web) - Visible on all screens */}
            <div className="flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              {(
                [
                  { id: 'desktop', label: 'Desktop', fullLabel: 'Desktop (100%)', icon: Monitor },
                  { id: 'tablet', label: 'Tablet', fullLabel: 'Tablet (768px)', icon: Tablet },
                  { id: 'mobile', label: 'Mobile', fullLabel: 'Mobile (430px)', icon: Smartphone },
                ] as const
              ).map((vp) => {
                const Icon = vp.icon;
                const active = viewportWidth === vp.id;
                return (
                  <button
                    key={vp.id}
                    type="button"
                    onClick={() => setViewportWidth(vp.id)}
                    className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition cursor-pointer ${
                      active
                        ? 'text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                    style={active ? { backgroundColor: primaryColor } : undefined}
                  >
                    <Icon size={13} />
                    <span className="hidden md:inline">{vp.fullLabel}</span>
                    <span className="md:hidden">{vp.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Actions + Top-Right Menu Icon for Right Drawer Modal */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsDark((d) => !d)}
                className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 transition cursor-pointer"
                title="Toggle Light / Dark Website Theme"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <button
                type="button"
                onClick={handleExportWebsiteZip}
                disabled={isExportingZip}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 transition cursor-pointer"
              >
                <Download size={14} />
                <span>{isExportingZip ? 'Exporting...' : 'Export Web .ZIP'}</span>
              </button>

              {/* TOP-RIGHT MENU ICON BUTTON TO OPEN RIGHT-SIDE DRAWER MODAL */}
              <button
                type="button"
                onClick={() => setIsRightDrawerOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-extrabold text-white shadow-sm hover:opacity-95 transition cursor-pointer"
                style={{ backgroundColor: primaryColor }}
                title="Open Website Sections & Screens Drawer"
              >
                <Menu size={16} />
                <span className="hidden sm:inline">Sections &amp; Options</span>
              </button>
            </div>
          </header>

          {/* Full Right-Side Live Website Viewport Canvas */}
          <main
            className={`flex-1 overflow-y-auto flex justify-center relative ${
              activeProject.id === 'eduteact_student' && viewportWidth === 'desktop'
                ? 'p-0'
                : 'p-2 sm:p-4 md:p-6'
            }`}
          >
            {isCanvasLoading && (
              <div className="absolute inset-0 z-40 bg-white dark:bg-[#0d0f14] flex items-center justify-center">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  className="animate-spin"
                  style={{ animationDuration: '1.15s' }}
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="24"
                    fill="none"
                    stroke="#7ED321"
                    strokeWidth="4.5"
                    strokeDasharray="26 11.7"
                  />
                </svg>
              </div>
            )}
            <StoreEcommerceProvider>
              <CoffeeShopProvider>
                <div
                  className={`@container w-full transition-all duration-300 overflow-x-hidden bg-white dark:bg-[#0E0C16] h-fit ${
                    viewportWidth === 'desktop'
                      ? activeProject.id === 'eduteact_student'
                        ? 'max-w-full rounded-none border-0 shadow-none'
                        : 'max-w-full rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800'
                      : viewportWidth === 'tablet'
                      ? 'max-w-[768px] rounded-3xl shadow-xl border border-neutral-200 dark:border-neutral-800 ring-4 ring-neutral-300/70 dark:ring-neutral-800'
                      : 'max-w-[390px] rounded-[36px] shadow-xl border border-neutral-200 dark:border-neutral-800 ring-8 ring-neutral-900 dark:ring-neutral-800'
                  }`}
                >
                  {activeProject.sections.map((sec) => renderWebsiteSection(sec))}
                </div>
              </CoffeeShopProvider>
            </StoreEcommerceProvider>
          </main>

          {/* ========================================================================= */}
          {/* 3. RIGHT-SIDE SLIDE-OVER DRAWER MODAL (OPENED BY TOP-RIGHT MENU ICON)     */}
          {/* ========================================================================= */}
          {isRightDrawerOpen && (
            <div className="fixed inset-0 z-50 flex justify-end">
              {/* Backdrop */}
              <div
                onClick={() => setIsRightDrawerOpen(false)}
                className="fixed inset-0 bg-black/45 backdrop-blur-[1px] transition-opacity"
              />

              {/* Right Drawer Panel */}
              <div className="relative z-10 w-full max-w-[430px] h-full bg-white dark:bg-[#14161c] border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col justify-between overflow-hidden">
                {/* Drawer Header */}
                <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <LayoutTemplate size={16} />
                    </div>
                    <div>
                      <h2 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                        Website Sections &amp; Studio Drawer
                      </h2>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        Canva live editor, add sections, switch variants, or customize theme
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsRightDrawerOpen(false)}
                    className="w-8 h-8 rounded-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Drawer Sub-Tabs */}
                <div className="px-4 pt-3 pb-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40">
                  <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-neutral-200/70 dark:bg-neutral-800">
                    {(
                      [
                        { id: 'add_section', label: '+ Add Section' },
                        { id: 'manage_sections', label: `Page Stack (${activeProject.sections.length})` },
                        { id: 'theme', label: 'Theme & Style' },
                      ] as const
                    ).map((t) => {
                      const active = drawerTab === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setDrawerTab(t.id)}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-extrabold transition cursor-pointer ${
                            active
                              ? 'text-white shadow-xs'
                              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                          }`}
                          style={active ? { backgroundColor: primaryColor } : undefined}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Drawer Body Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* CANVA LIVE EDITOR SELECT OPTION & MODAL CONTENT IN RIGHT DRAWER */}
                  <DoctorCanvaDrawerInspector primaryColor={primaryColor} />

                  {/* TAB 1: ADD WEBSITE SECTION OR SCREEN */}
                {drawerTab === 'add_section' && (
                  <div className="space-y-4">
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      Select any section template below to append it to{' '}
                      <strong className="text-neutral-900 dark:text-white">
                        {activeProject.name}
                      </strong>
                      :
                    </div>

                    {WEBSITE_SECTION_LIBRARY.map((lib) => (
                      <div
                        key={lib.type}
                        className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span
                              className="text-[10px] font-extrabold uppercase tracking-wider"
                              style={{ color: primaryColor }}
                            >
                              {lib.category}
                            </span>
                            <h3 className="text-xs font-extrabold text-neutral-900 dark:text-white mt-0.5">
                              {lib.label}
                            </h3>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                              {lib.description}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddSection(lib, 'varient_1')}
                            className="px-3 py-1.5 rounded-lg text-[11px] font-extrabold text-white flex items-center gap-1 flex-shrink-0 shadow-xs hover:opacity-95 cursor-pointer"
                            style={{ backgroundColor: primaryColor }}
                          >
                            <Plus size={12} />
                            <span>Add</span>
                          </button>
                        </div>

                        {/* Quick Variant Picker to Add Specific Layout Variant */}
                        <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-neutral-200/70 dark:border-neutral-800">
                          {availableVariantIds.map((vid) => (
                            <button
                              key={vid}
                              type="button"
                              onClick={() => handleAddSection(lib, vid)}
                              className="px-2 py-1.5 rounded-lg text-left text-[10px] font-semibold bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 truncate cursor-pointer"
                            >
                              + {lib.variants[vid]}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 2: MANAGE & EDIT ACTIVE SECTIONS */}
                {drawerTab === 'manage_sections' && (
                  <div className="space-y-4">
                    {selectedSectionObj && (
                      <div className="p-4 rounded-xl border-2 bg-neutral-50 dark:bg-neutral-900/70 space-y-3" style={{ borderColor: primaryColor }}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: primaryColor }}>
                            Editing Selected Section ({selectedSectionObj.type})
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteSection(selectedSectionObj.id)}
                            className="text-rose-500 hover:text-rose-600 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 size={12} />
                            <span>Remove</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                            Section Headline
                          </label>
                          <input
                            type="text"
                            value={selectedSectionObj.title}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateProjectSections((prev) =>
                                prev.map((s) =>
                                  s.id === selectedSectionObj.id ? { ...s, title: val } : s
                                )
                              );
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-semibold"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                            Section Subtitle
                          </label>
                          <textarea
                            rows={2}
                            value={selectedSectionObj.subtitle}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateProjectSections((prev) =>
                                prev.map((s) =>
                                  s.id === selectedSectionObj.id
                                    ? { ...s, subtitle: val }
                                    : s
                                )
                              );
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                            Layout Variant ({availableVariantIds.length} Designs)
                          </label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {availableVariantIds.map((vid) => {
                              const active = selectedSectionObj.variant === vid;
                              return (
                                <button
                                  key={vid}
                                  type="button"
                                  onClick={() =>
                                    handleChangeSectionVariant(selectedSectionObj.id, vid)
                                  }
                                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border cursor-pointer ${
                                    active
                                      ? 'text-white border-transparent'
                                      : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
                                  }`}
                                  style={active ? { backgroundColor: primaryColor } : undefined}
                                >
                                  {vid.replace('varient_', 'Variant ')}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-extrabold text-neutral-700 dark:text-neutral-300">
                          All Sections on Landing Page
                        </div>
                        <span className="text-[10px] font-semibold text-[#48B89F]">
                          Drag rows or canvas sections to reorder
                        </span>
                      </div>
                      {activeProject.sections.map((sec, idx) => (
                        <div
                          key={sec.id}
                          draggable
                          onDragStart={(e) => {
                            setDraggedSectionId(sec.id);
                            e.dataTransfer.effectAllowed = 'move';
                            e.dataTransfer.setData('text/plain', sec.id);
                          }}
                          onDragOver={(e) => {
                            if (!draggedSectionId || draggedSectionId === sec.id) return;
                            e.preventDefault();
                            const rect = e.currentTarget.getBoundingClientRect();
                            const pos: 'before' | 'after' =
                              e.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
                            setDragOverSectionId(sec.id);
                            setDragOverPosition(pos);
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            const sourceId =
                              draggedSectionId || e.dataTransfer.getData('text/plain');
                            if (sourceId && sourceId !== sec.id) {
                              handleDropReorderSection(sourceId, sec.id, dragOverPosition);
                            }
                            setDraggedSectionId(null);
                            setDragOverSectionId(null);
                          }}
                          onDragEnd={() => {
                            setDraggedSectionId(null);
                            setDragOverSectionId(null);
                          }}
                          onClick={() => setSelectedSectionId(sec.id)}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-2 cursor-grab active:cursor-grabbing transition ${
                            sec.id === selectedSectionId
                              ? 'bg-neutral-100 dark:bg-neutral-800 border-neutral-400'
                              : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'
                          } ${
                            dragOverSectionId === sec.id && draggedSectionId !== sec.id
                              ? dragOverPosition === 'before'
                                ? 'border-t-4 border-t-[#48B89F]'
                                : 'border-b-4 border-b-[#48B89F]'
                              : ''
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <GripVertical
                              size={14}
                              className="text-neutral-400 flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="text-xs font-bold truncate">
                                {idx + 1}. {sec.title}
                              </div>
                              <div className="text-[10px] text-neutral-500 font-mono">
                                {sec.type} · {sec.variant}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveSection(sec.id, 'up');
                              }}
                              className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
                            >
                              <ArrowUp size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveSection(sec.id, 'down');
                              }}
                              className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
                            >
                              <ArrowDown size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSection(sec.id);
                              }}
                              className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: WEBSITE THEME, COLORS & TYPOGRAPHY */}
                {drawerTab === 'theme' && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                        Appearance Mode
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setIsDark(false)}
                          className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer ${
                            !isDark
                              ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950'
                              : 'border-neutral-200 dark:border-neutral-800'
                          }`}
                        >
                          <Sun size={14} />
                          <span>Light Mode</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsDark(true)}
                          className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer ${
                            isDark
                              ? 'border-indigo-500 bg-indigo-950/50 text-white'
                              : 'border-neutral-200 dark:border-neutral-800'
                          }`}
                        >
                          <Moon size={14} />
                          <span>Dark Mode</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                        Brand Primary Color
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {WEBSITE_COLOR_SWATCHES.map((sw) => (
                          <button
                            key={sw.id}
                            type="button"
                            onClick={() => updatePrimaryColor(sw.hex)}
                            className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5 text-left cursor-pointer hover:border-neutral-400"
                          >
                            <span
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0"
                              style={{ backgroundColor: sw.hex }}
                            >
                              {primaryColor === sw.hex && <Check size={12} />}
                            </span>
                            <span className="text-xs font-bold truncate">{sw.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                        Website Typography
                      </label>
                      <div className="space-y-2">
                        {WEBSITE_FONT_OPTIONS.map((f) => (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setActiveFontId(f.id)}
                            style={{ fontFamily: f.stack }}
                            className={`w-full p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer ${
                              activeFontId === f.id
                                ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/40'
                                : 'border-neutral-200 dark:border-neutral-800'
                            }`}
                          >
                            <span className="text-xs font-bold">{f.name}</span>
                            {activeFontId === f.id && (
                              <Check size={14} style={{ color: primaryColor }} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setIsRightDrawerOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold cursor-pointer"
                >
                  Done
                </button>
                <button
                  type="button"
                  onClick={handleExportWebsiteZip}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-2 cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Download size={14} />
                  <span>Download Website Source (.ZIP)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </DoctorCanvaEditorProvider>
    </div>
  );
};

export default WebsiteLandingStudio;
