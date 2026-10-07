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

export type WebsiteTemplateId =
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
];

const WEBSITE_COLOR_SWATCHES = [
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
    useState<WebsiteTemplateId>('teacher_profile');
  const [selectedSectionId, setSelectedSectionId] =
    useState<string>('teacher_hero_1');
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState<boolean>(false);
  const [isMobileLeftSidebarOpen, setIsMobileLeftSidebarOpen] = useState<boolean>(false);
  const [drawerTab, setDrawerTab] = useState<'add_section' | 'manage_sections' | 'theme'>('add_section');
  const [isDark, setIsDark] = useState<boolean>(false);
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
          (activeProject.id === 'teacher_profile' ? (
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
          (activeProject.id === 'teacher_profile' ? (
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

        {/* DOCTOR / TEACHER PROFILE SECTION: SCHEDULE APPOINTMENT / LOCATION & HOURS */}
        {sec.type === 'doctor_appointment' &&
          (activeProject.id === 'teacher_profile' ? (
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
          (activeProject.id === 'store_admin_website' ? (
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
        {sec.type === 'metrics' && (
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
        )}

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
          (activeProject.id === 'teacher_profile' ? (
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
          (activeProject.id === 'teacher_profile' ? (
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
          <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 flex justify-center relative">
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
              <div
                className={`@container w-full transition-all duration-300 overflow-x-hidden shadow-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0E0C16] h-fit ${
                  viewportWidth === 'desktop'
                    ? 'max-w-full rounded-2xl'
                    : viewportWidth === 'tablet'
                    ? 'max-w-[768px] rounded-3xl ring-4 ring-neutral-300/70 dark:ring-neutral-800'
                    : 'max-w-[390px] rounded-[36px] ring-8 ring-neutral-900 dark:ring-neutral-800'
                }`}
              >
                {activeProject.sections.map((sec) => renderWebsiteSection(sec))}
              </div>
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
