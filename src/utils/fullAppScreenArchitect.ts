import { CustomProjectScreenSpec } from './customProjectsStore';

export interface ProjectArchitectureAnalysis {
  domainKey:
    | 'fitness'
    | 'food'
    | 'vpn'
    | 'realestate'
    | 'fintech'
    | 'logistics'
    | 'education'
    | 'social'
    | 'travel'
    | 'ride'
    | 'ai'
    | 'ecommerce'
    | 'custom';
  domainTitle: string;
  primaryColor: string;
  totalScreens: number;
  totalVariants: number;
  modules: Array<{
    id: string;
    name: string;
    screenCount: number;
    description: string;
  }>;
}

interface DomainProfile {
  domainKey: ProjectArchitectureAnalysis['domainKey'];
  domainTitle: string;
  primaryColor: string;
  taglineSuffix: string;
  modules?: ProjectArchitectureAnalysis['modules'];
  screenTitles?: string[];
  photos: {
    splash: string;
    onboarding: string;
    auth: string;
    discover: string;
    search: string;
    catalog: string;
    deals: string;
    detail: string;
    reviews: string;
    wishlist: string;
    notifications: string;
    checkout: string;
    payment: string;
    receipt: string;
    tracker: string;
    analytics: string;
    support: string;
    profile: string;
    settings: string;
    items: string[];
  };
  terms: {
    heroTitle: string;
    heroSub: string;
    heroBadge: string;
    searchPlaceholder: string;
    pills: string[];
    metricLabel: string;
    metricValue: string;
    metricDelta: string;
    catalogTitle: string;
    catalogSub: string;
    detailTitle: string;
    detailSub: string;
    detailPrice: string;
    checkoutTitle: string;
    checkoutSub: string;
    checkoutTotal: string;
    trackerTitle: string;
    trackerSub: string;
    trackerMetric: string;
    trackerSteps: string[];
    profileTier: string;
    profilePerks: string;
    sampleItems: Array<{
      title: string;
      subtitle: string;
      badge: string;
      value: string;
      rating: string;
      meta: string;
      actionLabel: string;
    }>;
  };
}

export function detectDomainProfile(
  projectName: string,
  category: string,
  projectDetails: string
): DomainProfile {
  const combined = `${projectName} ${category} ${projectDetails}`.toLowerCase();

  if (
    combined.includes('fitness') ||
    combined.includes('gym') ||
    combined.includes('workout') ||
    combined.includes('health') ||
    combined.includes('pulse') ||
    combined.includes('yoga') ||
    combined.includes('athlete')
  ) {
    return {
      domainKey: 'fitness',
      domainTitle: 'Biometric Fitness, Gym & Nutrition Suite',
      primaryColor: '#10B981',
      taglineSuffix: 'Biometric Workout Coach, HIIT Studio & Macro Nutrition Suite',
      modules: [
        {
          id: 'Onboarding & Auth',
          name: '1. Athlete Onboarding & Biometrics (4 Screens)',
          screenCount: 4,
          description: 'Splash Launch, Fitness Goal & Macro Tour, Biometric Sign In, Passkey & Apple Watch Pairing',
        },
        {
          id: 'Discovery & Catalog',
          name: '2. Workout Hub & Exercise Vault (4 Screens)',
          screenCount: 4,
          description: 'Daily Readiness Hub, Muscle Group & Coach Search, 4K Exercise Library, 30-Day Challenges',
        },
        {
          id: 'Detail & Social',
          name: '3. Form AI, Leaderboard & Alerts (4 Screens)',
          screenCount: 4,
          description: '3D Exercise Biomechanics & Rep Tempo, Athlete Leaderboard, Saved Workouts, Recovery Alerts',
        },
        {
          id: 'Cart & Payment',
          name: '4. Macro Meal Plan & Pro Membership (3 Screens)',
          screenCount: 3,
          description: 'Macro Meal & Supplement Builder, Apple Pay Pro Membership, Gym QR Check-In Pass',
        },
        {
          id: 'Tracking & Support',
          name: '5. Live Heart Rate HUD & AI Coach (3 Screens)',
          screenCount: 3,
          description: 'Zone 4 Heart Rate & Rest Timer HUD, VO2 Max & Strength PR Analytics, 1-on-1 Trainer Chat',
        },
        {
          id: 'Profile & Settings',
          name: '6. Athlete Pass & Wearable Sync (2 Screens)',
          screenCount: 2,
          description: 'Pro Athlete Trophy Vault, Whoop 4.0 / Apple Watch Ultra / Garmin HealthKit Settings',
        },
      ],
      screenTitles: [
        '01. Athlete Splash & HealthKit Sync',
        '02. Fitness Goals & Body Macro Tour',
        '03. Athlete Sign In & Watch Pairing',
        '04. Create Athlete Profile & BMR Calc',
        '05. Daily Readiness & Workout Hub',
        '06. Muscle Group & Coach Filter',
        '07. 4K Exercise & Hypertrophy Vault',
        '08. 30-Day Shred & Challenge Programs',
        '09. Drill Biomechanics & Set Configurator',
        '10. Community PR Leaderboard & Form Reviews',
        '11. Saved Workout Splits & Routines',
        '12. Recovery, Streak & Hydration Alerts',
        '13. Macro Meal Plan & Supplement Stack',
        '14. Pro Athlete Membership & Apple Pay',
        '15. Gym Studio QR Access Pass',
        '16. Live Zone 4 Heart Rate & Rest Timer',
        '17. VO2 Max, Volume & PR Analytics',
        '18. 1-on-1 Performance Coach Chat',
        '19. Athlete Trophy & Streak Profile',
        '20. Wearable Sensors & HealthKit Settings',
      ],
      photos: {
        splash: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
        onboarding: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
        auth: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80',
        discover: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
        search: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80',
        catalog: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80',
        deals: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=900&q=80',
        detail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80',
        reviews: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
        wishlist: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
        notifications: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
        checkout: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
        payment: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
        receipt: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=900&q=80',
        tracker: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
        analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        support: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
        profile: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80',
        settings: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
        items: [
          'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        ],
      },
      terms: {
        heroTitle: '45-Min Shred & Hypertrophy',
        heroSub: 'Coach Marcus V. • 620 kcal Burn • Apple Watch Ultra Synced',
        heroBadge: 'RECOVERY 92% • READY',
        searchPlaceholder: 'Search HIIT, hypertrophy, mobility, coaches...',
        pills: ['🔥 HIIT Burn', '🏋️ Strength', '🧘 Mobility', '⚡ Core 15m', '🥩 Macros'],
        metricLabel: 'ACTIVE CALORIES BURNED',
        metricValue: '1,420 kcal',
        metricDelta: '92% Readiness • 14d Streak',
        catalogTitle: 'Barbell & Dumbbell Hypertrophy Vault',
        catalogSub: '240+ 4K Biomechanics Drills with Real-Time Form AI',
        detailTitle: 'Upper Body Power & Push Hypertrophy',
        detailSub: '4 Sets × 10 Reps • 3-1-1 Eccentric Tempo • Chest, Anterior Delts & Triceps',
        detailPrice: '620 kcal',
        checkoutTitle: '195g Protein Macro & Supplement Stack',
        checkoutSub: 'Grass-Fed Whey Isolate + Creatine Monohydrate + Meal Prep',
        checkoutTotal: '$64.80',
        trackerTitle: 'Zone 4 Peak Effort • 164 BPM Live',
        trackerSub: 'Set 3 of 4 Complete • 00:42 Rest Timer Counting Down',
        trackerMetric: '164 BPM',
        trackerSteps: ['1. Warmup ✓', '2. Compound ✓', '3. Peak Set ✓', '4. Cooldown'],
        profileTier: 'Pro Athlete Pass • 14-Day Streak',
        profilePerks: '1,145 lbs 3-Lift Total • 11.4% Body Fat • Whoop 4.0 & Apple Watch Synced',
        sampleItems: [
          {
            title: 'Upper Body Power & Push Hypertrophy',
            subtitle: '4 Sets x 10 Reps • Incline Press, Weighted Dips & Cable Flyes',
            badge: '45 MIN • PRO',
            value: '620 kcal',
            rating: '4.9 (3.1k)',
            meta: 'Chest & Triceps',
            actionLabel: 'Start Session',
          },
          {
            title: 'Barbell Romanian Deadlift (RDL)',
            subtitle: '4 Sets x 8 Reps • 225 lbs Target • Hamstrings & Glutes',
            badge: 'COMPOUND',
            value: '225 lbs',
            rating: 'PR +15 lbs',
            meta: '98% Form Score',
            actionLabel: '+ Log Set',
          },
          {
            title: 'Tabata Metabolic Conditioning',
            subtitle: 'High-intensity 40s work / 20s rest intervals • Zero equipment',
            badge: '25 MIN • HIIT',
            value: '410 kcal',
            rating: '4.9 (1.9k)',
            meta: 'Full Body Burn',
            actionLabel: 'Start Session',
          },
          {
            title: 'Grass-Fed Hydrolyzed Whey + Creatine',
            subtitle: 'Double Rich Chocolate • 28g Protein • 5g Creapure®',
            badge: 'POST-WORKOUT',
            value: '$49.90',
            rating: '5.0 (840)',
            meta: 'Zero Sugar',
            actionLabel: '+ Add Stack',
          },
        ],
      },
    };
  }

  if (
    combined.includes('food') ||
    combined.includes('delivery') ||
    combined.includes('restaurant') ||
    combined.includes('bite') ||
    combined.includes('crave') ||
    combined.includes('burger') ||
    combined.includes('kitchen')
  ) {
    return {
      domainKey: 'food',
      domainTitle: 'Gourmet Food Delivery & Cloud Kitchen Platform',
      primaryColor: '#EA580C',
      taglineSuffix: '15-Min Express Gourmet Delivery, Photo Menus & Live Courier Radar',
      modules: [
        {
          id: 'Onboarding & Auth',
          name: '1. Foodie Onboarding & Delivery Address (4 Screens)',
          screenCount: 4,
          description: 'Brand Launch, 15-Min Delivery Tour, One-Tap Sign In, GPS Address & OTP Verification',
        },
        {
          id: 'Discovery & Catalog',
          name: '2. Crave Feed & Restaurant Menus (4 Screens)',
          screenCount: 4,
          description: 'Discover Eats Feed, Cuisine & Dietary Filter, Restaurant Photo Menu, 50% Off Flash Deals',
        },
        {
          id: 'Detail & Social',
          name: '3. Dish Customizer, Reviews & Alerts (4 Screens)',
          screenCount: 4,
          description: 'Dish Add-Ons & Spice Builder, Diner Photo Reviews, Favorite Kitchens, Courier Push Alerts',
        },
        {
          id: 'Cart & Payment',
          name: '4. Thermal Bag, Tip & Apple Pay (3 Screens)',
          screenCount: 3,
          description: 'Thermal Bag & Promo Code, Courier Tip & 1-Tap Apple Pay, Kitchen Order Ticket & ETA',
        },
        {
          id: 'Tracking & Support',
          name: '5. Live Courier GPS Radar & Help (3 Screens)',
          screenCount: 3,
          description: 'Live Vespa Courier GPS Map, Past Orders & 1-Tap Reorder, Priority Kitchen Support Chat',
        },
        {
          id: 'Profile & Settings',
          name: '6. Gold Pass & Dietary Preferences (2 Screens)',
          screenCount: 2,
          description: '$0 Delivery Fee Gold Pass Vault, Saved Addresses, Allergies & Cut-lery Settings',
        },
      ],
      screenTitles: [
        '01. Crave Splash & Kitchen Locator',
        '02. 15-Min Hot Delivery Walkthrough',
        '03. Foodie Sign In & Social Login',
        '04. Delivery Address & SMS OTP Verify',
        '05. Discover Eats & Local Kitchens Hub',
        '06. Cuisine, Calorie & Dietary Filter',
        '07. Smash & Sear Restaurant Photo Menu',
        '08. 2-for-1 Happy Hour & Flash Combos',
        '09. Dish Customizer, Toppings & Spice',
        '10. Verified Diner Photo Reviews',
        '11. Saved Restaurants & Go-To Meals',
        '12. Kitchen Prep & Courier Push Alerts',
        '13. Thermal Priority Bag & Promo Code',
        '14. Courier Tip & 1-Tap Apple Pay',
        '15. Kitchen Ticket & Live ETA Pass',
        '16. Live Vespa Courier GPS Radar Map',
        '17. Past Orders & 1-Tap Instant Reorder',
        '18. Missing Item & Concierge Live Chat',
        '19. Gold Pass ($0 Delivery) & Perks',
        '20. Saved Addresses & Allergy Settings',
      ],
      photos: {
        splash: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
        onboarding: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
        auth: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
        discover: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
        search: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
        catalog: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
        deals: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
        detail: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
        reviews: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80',
        wishlist: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80',
        notifications: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80',
        checkout: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
        payment: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
        receipt: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
        tracker: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80',
        analytics: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
        support: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
        profile: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
        settings: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
        items: [
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        ],
      },
      terms: {
        heroTitle: '50% OFF Wagyu Smash & Ramen',
        heroSub: 'Zero Delivery Fee on First 3 Orders • Code: CRAVE50',
        heroBadge: 'FLASH DEAL • 14 MINS',
        searchPlaceholder: 'Craving burgers, sushi, ramen, wood-fired pizza...',
        pills: ['🔥 Flash Deals', '🍔 Burgers', '🍜 Ramen', '🍣 Sushi', '🍕 Pizza'],
        metricLabel: 'AVG EXPRESS ETA',
        metricValue: '16 Mins',
        metricDelta: '99.4% Hot & Sealed',
        catalogTitle: 'Smash & Sear Flagship Kitchen',
        catalogSub: '100% Grass-Fed Wagyu • Open until 2:00 AM • 4.9 ★ (2.4k+)',
        detailTitle: 'Double Truffle Wagyu Smash Burger',
        detailSub: '2x Seared Wagyu Patties, Aged Gruyère, Black Truffle Aioli, Toasted Brioche',
        detailPrice: '$16.50',
        checkoutTitle: 'Thermal-Sealed Priority Bag (3 Items)',
        checkoutSub: 'CRAVE50 Promo Applied + $0 Gold Pass Delivery Fee',
        checkoutTotal: '$34.80',
        trackerTitle: 'Arriving in 7 Mins (8:24 PM)',
        trackerSub: 'Courier Carlos M. is 0.4 mi away on Broadway • Electric Vespa',
        trackerMetric: '7 Mins',
        trackerSteps: ['1. Confirmed ✓', '2. Prepped ✓', '3. Picked Up ✓', '4. Arriving'],
        profileTier: 'Gold Pass Member • $0 Delivery Fees',
        profilePerks: '4,850 Crave Points ($25 Credit Ready) • Saved Addresses & 1-Tap Reorder',
        sampleItems: [
          {
            title: 'Double Truffle Wagyu Smash',
            subtitle: '2x seared Wagyu patties, aged Gruyère, black truffle aioli, brioche',
            badge: 'CHEF SPECIAL',
            value: '$16.50',
            rating: '4.9 (2.4k)',
            meta: '15-20 min • Free Fee',
            actionLabel: '+ Add $16.50',
          },
          {
            title: 'Kurobuta Black Garlic Tonkotsu Ramen',
            subtitle: '24-hour pork bone broth, charred chashu, ajitama egg, artisanal noodles',
            badge: '18-24 MIN',
            value: '$18.90',
            rating: '4.9 (1.8k)',
            meta: 'Top Rated • Hot',
            actionLabel: '+ Add $18.90',
          },
          {
            title: 'Napoli 900° Wood-Fired Burrata Pizza',
            subtitle: 'San Marzano DOP tomatoes, fresh creamy burrata, basil & hot honey',
            badge: '20% OFF',
            value: '$21.00',
            rating: '4.8 (960)',
            meta: 'Wood-Fired',
            actionLabel: '+ Add $21.00',
          },
          {
            title: 'Omakase Bluefin Toro & Uni Box',
            subtitle: '8pc chef-selected nigiri + crispy nori handroll with freshly grated wasabi',
            badge: 'MICHELIN GUIDE',
            value: '$38.00',
            rating: '5.0 (620)',
            meta: 'Chilled Box',
            actionLabel: '+ Add $38.00',
          },
        ],
      },
    };
  }

  if (
    combined.includes('vpn') ||
    combined.includes('cyber') ||
    combined.includes('security') ||
    combined.includes('shield') ||
    combined.includes('proxy')
  ) {
    return {
      domainKey: 'vpn',
      domainTitle: 'Zero-Trust WireGuard VPN & Cyber Defense Suite',
      primaryColor: '#0284C7',
      taglineSuffix: 'WireGuard v3 Encrypted Tunnel, 104 Global RAM-Only Core Nodes & Kill Switch',
      modules: [
        {
          id: 'Onboarding & Auth',
          name: '1. Zero-Logs Enclave & Passkey Auth (4 Screens)',
          screenCount: 4,
          description: 'Encrypted Boot Check, Zero-Knowledge Architecture Tour, Passkey Login, Anonymous Key Token',
        },
        {
          id: 'Discovery & Catalog',
          name: '2. Quick Connect Shield & 104 Server Hubs (4 Screens)',
          screenCount: 4,
          description: '1-Tap Shield Quick Connect, Ping & Country Filter, 104 RAM-Only Server Nodes, Dedicated IP Vault',
        },
        {
          id: 'Detail & Social',
          name: '3. Node Telemetry, Audits & Threat Alerts (4 Screens)',
          screenCount: 4,
          description: 'Zurich Bunker Node Inspector, Cure53 Security Audits, Pinned Multi-Hop Routes, Breach Scanner',
        },
        {
          id: 'Cart & Payment',
          name: '4. Stealth Plan & Crypto / Apple Pay (3 Screens)',
          screenCount: 3,
          description: '10-Device Plan Configurator, Anonymous Crypto & Apple Pay, Encrypted License Activation',
        },
        {
          id: 'Tracking & Support',
          name: '5. Live Packet Throughput & NOC Desk (3 Screens)',
          screenCount: 3,
          description: 'Live 10Gbps WireGuard Throughput & Ping Graph, Tracker Blocker Logs, 24/7 SecOps Engineer Chat',
        },
        {
          id: 'Profile & Settings',
          name: '6. Hardware Fleet & Kill-Switch Rules (2 Screens)',
          screenCount: 2,
          description: '10-Device Hardware Slot Manager, System Kill-Switch, Split-Tunneling & DNS Leak Protection',
        },
      ],
      screenTitles: [
        '01. Encrypted Enclave Boot & Integrity',
        '02. Zero-Logs & Multi-Hop Security Tour',
        '03. Hardware Passkey & Anonymous Sign In',
        '04. Generate 256-Bit Account Recovery Key',
        '05. 1-Tap Shield Connect & Virtual IP HUD',
        '06. Server Ping, Load & Jurisdiction Filter',
        '07. 104 Global RAM-Only Core Server Nodes',
        '08. Dedicated Static IP & Streaming Hubs',
        '09. Swiss Secure Core Node & Protocol Spec',
        '10. Cure53 Audit Reports & Speed Benchmarks',
        '11. Pinned Multi-Hop & Low-Ping Favorites',
        '12. Dark Web Breach & DNS Leak Alerts',
        '13. 10-Device Stealth Plan & Add-On Builder',
        '14. Anonymous Crypto, Cash & Apple Pay',
        '15. Encrypted License Key & WireGuard QR',
        '16. Live Throughput, Ping & Packet Radar',
        '17. 30-Day Blocked Trackers & Malware Log',
        '18. 24/7 SecOps Network Engineer Chat',
        '19. Active Hardware Fleet (4/10 Devices)',
        '20. Kill-Switch, Split-Tunnel & WireGuard',
      ],
      photos: {
        splash: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80',
        onboarding: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
        auth: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80',
        discover: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80',
        search: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
        catalog: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
        deals: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
        detail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
        reviews: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80',
        wishlist: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=900&q=80',
        notifications: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
        checkout: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80',
        payment: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
        receipt: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
        tracker: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
        analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        support: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
        profile: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
        settings: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
        items: [
          'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
        ],
      },
      terms: {
        heroTitle: 'Military-Grade 256-Bit Tunnel Active',
        heroSub: 'Zurich #04 Multi-Hop • ChaCha20-Poly1305 • Zero DNS Leaks',
        heroBadge: 'SHIELD ARMED • 14 MS',
        searchPlaceholder: 'Search 104 global RAM-only server locations...',
        pills: ['⚡ Fastest Node', '🛡 Multi-Hop', '🎬 Streaming', '🔒 P2P Core', '🕵️ Stealth'],
        metricLabel: 'MASKED VIRTUAL IP',
        metricValue: '185.220.101.5',
        metricDelta: 'Zurich #04 • 14ms Ping',
        catalogTitle: '104 Global RAM-Only Core Server Hubs',
        catalogSub: '10 Gbps Bare-Metal Uplinks across 65 Privacy Jurisdictions',
        detailTitle: 'CH Switzerland • Zurich Secure Core #04',
        detailSub: 'Underground Bunker Routing • WireGuard v3 • 0% Disk Persistence',
        detailPrice: '14 ms',
        checkoutTitle: 'CyberShield Ultimate Pro (10 Devices)',
        checkoutSub: '2-Year Stealth Plan + Dedicated Residential IP Add-On',
        checkoutTotal: '$59.00/yr',
        trackerTitle: 'Live Encrypted Throughput: 84.6 Mbps',
        trackerSub: '0.0% Packet Loss • 1.2ms Jitter • 1,715 Trackers Blocked Today',
        trackerMetric: '84.6 Mbps',
        trackerSteps: ['1. Handshake ✓', '2. Key Exchange ✓', '3. DNS Guard ✓', '4. Multi-Hop Live'],
        profileTier: 'Ultimate Pro • 4 / 10 Hardware Slots Active',
        profilePerks: 'Independent Zero-Logs Audit Certified by Cure53 • Passkey Auth',
        sampleItems: [
          {
            title: 'CH Switzerland • Zurich #04',
            subtitle: 'WireGuard v3 • RAM-Only • Multi-Hop Secure Core',
            badge: '14 MS PING',
            value: '22% Load',
            rating: '99.99% Up',
            meta: 'Privacy Haven',
            actionLabel: 'Connect',
          },
          {
            title: 'DE Germany • Frankfurt #12',
            subtitle: '10 Gbps Fiber Core • Low-Jitter Gaming & P2P Node',
            badge: '12 MS PING',
            value: '28% Load',
            rating: '10 Gbps',
            meta: 'EU Central',
            actionLabel: 'Connect',
          },
          {
            title: 'US United States • New York #08',
            subtitle: '4K Streaming Optimized • Zero Throttling Backbone',
            badge: '64 MS PING',
            value: '39% Load',
            rating: 'Streaming',
            meta: 'Americas',
            actionLabel: 'Connect',
          },
          {
            title: 'JP Japan • Tokyo Shibuya #03',
            subtitle: 'Asia-Pacific High-Speed Optical Uplink • IPv6 Shield',
            badge: '98 MS PING',
            value: '35% Load',
            rating: 'Low Jitter',
            meta: 'Asia Core',
            actionLabel: 'Connect',
          },
        ],
      },
    };
  }

  if (
    combined.includes('estate') ||
    combined.includes('prop') ||
    combined.includes('villa') ||
    combined.includes('house') ||
    combined.includes('apartment') ||
    combined.includes('hotel') ||
    combined.includes('travel')
  ) {
    return {
      domainKey: 'realestate',
      domainTitle: 'Luxury Real Estate, 3D Tours & Escrow Platform',
      primaryColor: '#2563EB',
      taglineSuffix: 'Architectural Listings, 3D Matterport Tours, Jumbo Mortgage & Escrow Tracker',
      modules: [
        {
          id: 'Onboarding & Auth',
          name: '1. Buyer Onboarding & Pre-Approval Auth (4 Screens)',
          screenCount: 4,
          description: 'Architectural Splash, 3D Tour & Escrow Walkthrough, Investor Sign In, Proof-of-Funds Verify',
        },
        {
          id: 'Discovery & Catalog',
          name: '2. MLS Map Search & Luxury Listings (4 Screens)',
          screenCount: 4,
          description: 'Featured Penthouses & Villas, School District & SqFt Filter, 3D Matterport Catalog, Off-Market Drops',
        },
        {
          id: 'Detail & Social',
          name: '3. Residence Floorplan, Comps & Alerts (4 Screens)',
          screenCount: 4,
          description: 'Residence 3D Floorplan & HOA Specs, Neighborhood Comps, Saved Shortlist, Price-Drop Alerts',
        },
        {
          id: 'Cart & Payment',
          name: '4. Digital Offer, Mortgage & Earnest Wire (3 Screens)',
          screenCount: 3,
          description: 'Jumbo Mortgage & Offer Structuring, Earnest Money Escrow Wire, Signed Purchase Agreement',
        },
        {
          id: 'Tracking & Support',
          name: '5. Live Escrow Closing Tracker & Broker (3 Screens)',
          screenCount: 3,
          description: '4-Stage Inspection/Appraisal/Closing Tracker, Portfolio Equity Analytics, Senior Broker Chat',
        },
        {
          id: 'Profile & Settings',
          name: '6. Investor Vault & DocuSign Settings (2 Screens)',
          screenCount: 2,
          description: 'Pre-Approval Letter & Equity Portfolio, DocuSign Enclave & MLS Alert Preferences',
        },
      ],
      screenTitles: [
        '01. Architectural Splash & Market Pulse',
        '02. 3D Matterport & Digital Closing Tour',
        '03. Buyer & Private Investor Sign In',
        '04. Pre-Approval & Identity Verification',
        '05. Featured Penthouses & Waterfront Hub',
        '06. Map Polygon, School & Price/SqFt Filter',
        '07. Verified MLS & 3D Tour Residence Catalog',
        '08. Pocket Listings & Off-Market Price Drops',
        '09. Residence Floorplan, HOA & Tax Breakdown',
        '10. Neighborhood Sold Comps & School Ratings',
        '11. Saved Properties & Comparison Board',
        '12. New Listing & Price-Cut Push Alerts',
        '13. Digital Offer & Jumbo Mortgage Calculator',
        '14. Earnest Money Wire & Plastiq Escrow',
        '15. Counter-signed Offer & Tour Pass',
        '16. Live Escrow, Inspection & Deed Tracker',
        '17. Property Appreciation & Cap-Rate Analytics',
        '18. Dedicated Listing Broker Live Chat',
        '19. Investor Portfolio & Pre-Approval Vault',
        '20. DocuSign Keys & MLS Notification Rules',
      ],
      photos: {
        splash: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
        onboarding: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
        auth: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
        discover: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
        search: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
        catalog: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
        deals: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80',
        detail: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80',
        reviews: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
        wishlist: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
        notifications: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80',
        checkout: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80',
        payment: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
        receipt: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
        tracker: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80',
        analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        support: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
        profile: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
        settings: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
        items: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80',
        ],
      },
      terms: {
        heroTitle: 'SoHo Cast-Iron Sky Penthouse',
        heroSub: '4 Bed • 4.5 Bath • 4,200 Sq.Ft • Private Heated Rooftop Pool',
        heroBadge: 'EXCLUSIVE MLS • $6.85M',
        searchPlaceholder: 'Search neighborhood, school district, price, sqft...',
        pills: ['🏙 Penthouses', '🌊 Waterfront', '🏡 Modern Villas', '📐 3D Tours', '📈 High Yield'],
        metricLabel: 'AVG MARKET VALUATION',
        metricValue: '$1,640 / sf',
        metricDelta: '+6.8% YoY Appreciation',
        catalogTitle: 'Verified Luxury Residences & 3D Floorplans',
        catalogSub: '142 Off-Market & MLS Properties with Matterport 3D Walkthroughs',
        detailTitle: 'Tribeca Glass Loft Residence #8A',
        detailSub: '3 Bed • 3.5 Bath • 3,150 Sq.Ft • Direct Keyed Elevator & Chef Kitchen',
        detailPrice: '$4,450,000',
        checkoutTitle: 'Digital Offer & Jumbo Mortgage Structuring',
        checkoutSub: '20% Down Payment • 5.85% Private Bank Jumbo Fixed • Escrow Wire',
        checkoutTotal: '$21,480/mo',
        trackerTitle: 'Escrow & Closing Scheduled: Oct 24',
        trackerSub: 'Structural Inspection & Appraisal Passed with Zero Contingencies',
        trackerMetric: '9 Days Left',
        trackerSteps: ['1. Offer Signed ✓', '2. Inspection ✓', '3. Appraisal ✓', '4. Deed Closing'],
        profileTier: 'Private Wealth Investor • $12.4M Equity',
        profilePerks: 'JPMorgan Pre-Approval ($7.5M Limit) • DocuSign Vault & Saved Alerts',
        sampleItems: [
          {
            title: 'Tribeca Glass Loft Residence #8A',
            subtitle: '3 Bed • 3.5 Bath • 3,150 Sq.Ft • Direct Elevator Key',
            badge: '3D MATTERPORT',
            value: '$4,450,000',
            rating: '99% Match',
            meta: 'HOA $1,850/mo',
            actionLabel: 'Book Tour',
          },
          {
            title: 'Biscayne Bay Modern Waterfront Villa',
            subtitle: '5 Bed • 6 Bath • 6,400 Sq.Ft • 80ft Private Yacht Dock',
            badge: 'WATERFRONT',
            value: '$8,900,000',
            rating: '5.0 ★ Agent',
            meta: 'Turnkey Furnished',
            actionLabel: 'Book Tour',
          },
          {
            title: 'Chelsea Architectural Townhouse',
            subtitle: '4 Floors • Private Landscaped Garden • Gaggenau Kitchen',
            badge: 'NEW LISTING',
            value: '$6,200,000',
            rating: '97% Match',
            meta: '22ft Wide',
            actionLabel: 'Book Tour',
          },
          {
            title: 'Aspen Mountain Ski-In Glass Chalet',
            subtitle: '6 Bed • Heated Driveway • Wine Cellar & Wellness Spa',
            badge: 'LUXURY RETREAT',
            value: '$11,500,000',
            rating: '6.8% Yield',
            meta: 'Helipad Access',
            actionLabel: 'Book Tour',
          },
        ],
      },
    };
  }

  if (
    combined.includes('fin') ||
    combined.includes('crypto') ||
    combined.includes('wallet') ||
    combined.includes('bank') ||
    combined.includes('pay') ||
    combined.includes('trade')
  ) {
    return {
      domainKey: 'fintech',
      domainTitle: 'Neobank, Multi-Chain Crypto & Wealth Suite',
      primaryColor: '#4F46E5',
      taglineSuffix: 'Multi-Currency Treasury, Instant Zero-Fee Transfers & Institutional Yield',
      modules: [
        {
          id: 'Onboarding & Auth',
          name: '1. Hardware Enclave & KYC Verification (4 Screens)',
          screenCount: 4,
          description: 'Vault Splash, 5.25% Treasury & Metal Card Tour, Biometric Passkey Login, 60-Sec KYC & 2FA',
        },
        {
          id: 'Discovery & Catalog',
          name: '2. Net Worth Hub & Institutional Markets (4 Screens)',
          screenCount: 4,
          description: 'Net Liquidity Dashboard, Asset & Ticker Screener, Equities/T-Bills/Crypto Catalog, High-APY Vaults',
        },
        {
          id: 'Detail & Social',
          name: '3. Order Book, Analyst Ratings & Alerts (4 Screens)',
          screenCount: 4,
          description: 'Live Candlestick & Yield Calculator, Institutional Analyst Consensus, Watchlist, Price & Wire Alerts',
        },
        {
          id: 'Cart & Payment',
          name: '4. Instant Trade, FX Wire & Metal Cards (3 Screens)',
          screenCount: 3,
          description: 'Zero-Spread Trade & Swap Ticket, FedNow / SWIFT Wire & Apple Pay, Blockchain/Clearing Receipt',
        },
        {
          id: 'Tracking & Support',
          name: '5. Live Settlement Radar & Tax P&L (3 Screens)',
          screenCount: 3,
          description: 'Real-Time SWIFT/On-Chain Settlement Tracker, Tax-Loss Harvesting & P&L, Private Wealth Advisor Chat',
        },
        {
          id: 'Profile & Settings',
          name: '6. Obsidian Metal Card & Cold Custody (2 Screens)',
          screenCount: 2,
          description: '3% Cashback Titanium Card Controls, YubiKey / Multi-Sig Spend Limits & Tax Exports',
        },
      ],
      screenTitles: [
        '01. Enclave Vault Launch & Biometric Check',
        '02. 5.25% APY Treasury & Wealth Tour',
        '03. Hardware Passkey & FaceID Vault Login',
        '04. Instant KYC Passport & 2FA Setup',
        '05. Net Liquidity & Multi-Asset Treasury Hub',
        '06. Equities, ETF & Crypto Pair Screener',
        '07. Institutional Markets & T-Bill Vaults',
        '08. 5.25% APY Treasury & Staking Boosts',
        '09. Live Chart, Order Book & Yield Projections',
        '10. Wall St. Analyst Ratings & On-Chain Audit',
        '11. Custom Ticker Watchlist & Price Triggers',
        '12. Margin, Dividend & Wire Push Alerts',
        '13. Instant Trade, Swap & Wire Order Ticket',
        '14. FedNow Instant Bank, SWIFT & Virtual Card',
        '15. Cryptographic Settlement & Trade Receipt',
        '16. Live Clearing & Block Confirmation Radar',
        '17. Realized P&L, Dividend & Tax-Loss Report',
        '18. Dedicated Private Wealth Advisor Chat',
        '19. Obsidian Metal Card & Limit Controls',
        '20. Multi-Sig Cold Custody & Security Rules',
      ],
      photos: {
        splash: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
        onboarding: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        auth: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80',
        discover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
        search: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=900&q=80',
        catalog: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=900&q=80',
        deals: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80',
        detail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        reviews: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
        wishlist: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
        notifications: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        checkout: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
        payment: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
        receipt: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
        tracker: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        support: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
        profile: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
        settings: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80',
        items: [
          'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
        ],
      },
      terms: {
        heroTitle: 'Net Liquidity: $148,920.45',
        heroSub: '5.25% APY Treasury Vault + Multi-Chain Hardware Custody',
        heroBadge: 'FDIC INSURED • +18.4%',
        searchPlaceholder: 'Search stocks, ETFs, crypto pairs, wire recipients...',
        pills: ['📈 Top Movers', '💵 5.25% Treasury', '🪙 Crypto L1', '💳 Virtual Cards', '🌍 FX Wire'],
        metricLabel: 'TOTAL PORTFOLIO VALUE',
        metricValue: '$148,920.45',
        metricDelta: '+$4,210.80 (+2.91%) Today',
        catalogTitle: 'Institutional Markets & Yield Vaults',
        catalogSub: 'Zero-commission equities, U.S. T-Bills, and audited staking pools',
        detailTitle: 'U.S. Treasury 5.25% Liquid Yield Vault',
        detailSub: 'Daily Compounding • State Tax Exempt • Instant Same-Day Liquidity',
        detailPrice: '5.25% APY',
        checkoutTitle: 'Instant Multi-Asset Swap & Wire Execution',
        checkoutSub: 'Zero FX Spread • Hardware Enclave Signed Transaction',
        checkoutTotal: '$12,500.00',
        trackerTitle: 'Settlement Finalized in 1.4 Seconds',
        trackerSub: 'FedNow / SWIFT gpi Real-Time Clearing • Block #19482910 Verified',
        trackerMetric: '1.4 Sec',
        trackerSteps: ['1. Enclave Sign ✓', '2. AML Check ✓', '3. Liquidity Pool ✓', '4. Settled'],
        profileTier: 'Obsidian Metal Card • 3% Unlimited Cashback',
        profilePerks: 'Hardware YubiKey + Biometric Enclave • $250k Wire Limit Active',
        sampleItems: [
          {
            title: 'U.S. Treasury Bill 5.25% APY Vault',
            subtitle: 'Backed 100% by short-duration U.S. Government T-Bills',
            badge: 'RISK-FREE YIELD',
            value: '5.25% APY',
            rating: 'AAA Rated',
            meta: 'Instant Withdraw',
            actionLabel: 'Allocate',
          },
          {
            title: 'S&P 500 Direct Indexing Core (VOO)',
            subtitle: 'Automated daily tax-loss harvesting & fractional reinvestment',
            badge: 'CORE EQUITY',
            value: '$518.40',
            rating: '+24.2% YoY',
            meta: '0.03% Expense',
            actionLabel: 'Buy / Trade',
          },
          {
            title: 'Bitcoin (BTC) Cold Custody Vault',
            subtitle: 'Multi-sig 2-of-3 institutional MPC key shard protection',
            badge: 'LAYER 1',
            value: '$89,420',
            rating: '+6.4% 24h',
            meta: 'Zero Custody Fee',
            actionLabel: 'Trade BTC',
          },
          {
            title: 'Disposable Virtual Titanium Card',
            subtitle: 'Single-use CVV & merchant-locked spend limits for online security',
            badge: 'VIRTUAL VISA',
            value: '3% Cashback',
            rating: 'Apple Pay',
            meta: 'Instant Freeze',
            actionLabel: 'Manage Card',
          },
        ],
      },
    };
  }

  if (
    combined.includes('health') ||
    combined.includes('medical') ||
    combined.includes('doctor') ||
    combined.includes('clinic') ||
    combined.includes('hospital') ||
    combined.includes('pharma') ||
    combined.includes('patient') ||
    combined.includes('telehealth')
  ) {
    return {
      domainKey: 'custom',
      domainTitle: 'Telehealth, Patient Vitals & Digital Clinic Suite',
      primaryColor: '#0D9488',
      taglineSuffix: '24/7 HD Doctor Telehealth, Live Vitals Telemetry, Rx Pharmacy & Lab Portal',
      modules: [
        {
          id: 'Onboarding & Auth',
          name: '1. HIPAA Enclave & Patient Intake (4 Screens)',
          screenCount: 4,
          description: 'HIPAA Medical Launch, Telehealth & Vitals Tour, Biometric Patient Login, Insurance Card & ID Scan',
        },
        {
          id: 'Discovery & Catalog',
          name: '2. Symptom Triage & Specialist Directory (4 Screens)',
          screenCount: 4,
          description: 'Patient Vitals & Triage Hub, Specialty & Insurance Filter, Board-Certified Doctors, Same-Day Urgent Slots',
        },
        {
          id: 'Detail & Social',
          name: '3. Doctor Dossier, Patient Reviews & Rx Alerts (4 Screens)',
          screenCount: 4,
          description: 'MD Credentials & Video Slot Picker, Verified Patient Outcomes, Care Team Shortlist, Medication Pill Reminders',
        },
        {
          id: 'Cart & Payment',
          name: '4. Consultation Booking, Co-Pay & e-Prescription (3 Screens)',
          screenCount: 3,
          description: 'Telehealth Appointment & Lab Summary, HSA/FSA & Insurance Co-Pay, Digital e-Prescription & QR Pharmacy Pass',
        },
        {
          id: 'Tracking & Support',
          name: '5. Live ECG/Vitals Monitor, Lab Results & Nurse Chat (3 Screens)',
          screenCount: 3,
          description: 'Live Video Consult & Wearable ECG Stream, Blood Panel & Biomarker Trends, 24/7 Triage Nurse Chat',
        },
        {
          id: 'Profile & Settings',
          name: '6. Family Medical Vault & Apple Health Sync (2 Screens)',
          screenCount: 2,
          description: 'Electronic Health Record (EHR) & Immunization Pass, Apple Health / Dexcom CGM & HIPAA Privacy Controls',
        },
      ],
      screenTitles: [
        '01. HIPAA Medical Vault & Biometric Boot',
        '02. 24/7 Telehealth & Lab Care Walkthrough',
        '03. Patient Portal FaceID & Passkey Sign In',
        '04. Insurance Card OCR & Medical History Intake',
        '05. Patient Health Hub & Daily Vitals Triage',
        '06. Medical Specialty, Symptom & In-Network Filter',
        '07. Board-Certified Doctors & Clinic Directory',
        '08. Same-Day Urgent Care & Lab Test Packages',
        '09. Physician Profile, Credentials & Slot Picker',
        '10. Verified Patient Outcomes & Clinic Ratings',
        '11. Saved Care Team & Preferred Pharmacies',
        '12. Medication Dosage & Refill Push Reminders',
        '13. Telehealth Visit & Rx Pharmacy Summary',
        '14. HSA / FSA Card, Insurance Co-Pay & Apple Pay',
        '15. e-Prescription Barcode & Visit Confirmation',
        '16. Live HD Video Consult & Wearable Vitals Stream',
        '17. Blood Biomarker Trends & Lab Results Archive',
        '18. 24/7 On-Call Triage Nurse & Pharmacist Chat',
        '19. Family EHR Medical ID & Immunization Vault',
        '20. Apple HealthKit, CGM Sensor & HIPAA Settings',
      ],
      photos: {
        splash: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
        onboarding: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=80',
        auth: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=900&q=80',
        discover: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
        search: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
        catalog: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
        deals: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
        detail: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
        reviews: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
        wishlist: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=80',
        notifications: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
        checkout: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=80',
        payment: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
        receipt: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=900&q=80',
        tracker: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
        analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        support: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
        profile: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
        settings: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
        items: [
          'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
        ],
      },
      terms: {
        heroTitle: 'On-Demand HD Video Consult in 4 Mins',
        heroSub: 'Board-Certified Physicians • Instant e-Prescription & Lab Dispatch',
        heroBadge: 'HIPAA VERIFIED • 24/7 MD',
        searchPlaceholder: 'Search doctors, symptoms, lab panels, prescriptions...',
        pills: ['🩺 Urgent Care', '🫀 Cardiology', '🧬 Full Blood Panel', '💊 Rx Refill', '🧠 Mental Health'],
        metricLabel: 'PATIENT VITALS SCORE',
        metricValue: '98/100 Optimal',
        metricDelta: 'BP 118/76 • Resting HR 62 BPM',
        catalogTitle: 'In-Network Specialists & Diagnostic Labs',
        catalogSub: 'Zero-wait video consultations and at-home phlebotomy panels',
        detailTitle: 'Dr. Clara Vance, MD • Stanford Cardiology',
        detailSub: '16 Yrs Experience • Johns Hopkins Residency • Video & In-Clinic Slots',
        detailPrice: '$25 Co-Pay',
        checkoutTitle: 'Telehealth Consultation & Rx Dispatch',
        checkoutSub: 'Aetna PPO In-Network Applied + Walgreens Express Rx Sync',
        checkoutTotal: '$25.00',
        trackerTitle: 'Dr. Vance is Ready in Virtual Exam Room #4',
        trackerSub: 'Apple Watch ECG & SpO2 Telemetry Connected • Encrypted WebRTC',
        trackerMetric: 'Live Now',
        trackerSteps: ['1. Intake ✓', '2. Vitals Sync ✓', '3. MD Consult ✓', '4. e-Rx Sent'],
        profileTier: 'Premier Care Family Pass • Insurance Active',
        profilePerks: '$0 Urgent Care Video Visits • Automatic Lab Biomarker Tracking',
        sampleItems: [
          {
            title: 'Dr. Clara Vance, MD • Preventative Cardiology',
            subtitle: 'Next video slot in 10 mins • Accepts BlueCross, Aetna & United',
            badge: 'AVAILABLE NOW',
            value: '$25 Co-Pay',
            rating: '4.99 (1.8k)',
            meta: 'Stanford MD',
            actionLabel: 'Book Video Slot',
          },
          {
            title: 'Comprehensive 85-Biomarker Longevity Blood Panel',
            subtitle: 'At-home nurse draw • ApoB, HbA1c, Hormone, Thyroid & Vitamin D',
            badge: 'AT-HOME LAB',
            value: '$149.00',
            rating: '4.95 (940)',
            meta: 'Results in 24h',
            actionLabel: 'Schedule Lab',
          },
          {
            title: '24/7 Express Prescription Refill & Courier',
            subtitle: 'Same-day pharmacy dispatch or instant transfer to local CVS/Walgreens',
            badge: 'SAME-DAY RX',
            value: '$0 Delivery',
            rating: '5.0 (2.2k)',
            meta: 'HSA/FSA Eligible',
            actionLabel: 'Refill Rx',
          },
          {
            title: 'Continuous Glucose & HRV Metabolic Coaching',
            subtitle: 'Real-time Dexcom / Apple Health integration with clinical dietitian',
            badge: 'METABOLIC PRO',
            value: '$45 / mo',
            rating: '4.9 (610)',
            meta: 'CGM Sensor Incl.',
            actionLabel: 'Enroll Now',
          },
        ],
      },
    };
  }

  if (
    combined.includes('logistic') ||
    combined.includes('supply') ||
    combined.includes('fleet') ||
    combined.includes('cargo') ||
    combined.includes('shipping') ||
    combined.includes('courier') ||
    combined.includes('warehouse') ||
    combined.includes('order') ||
    combined.includes('pos') ||
    combined.includes('inventory')
  ) {
    return {
      domainKey: 'logistics',
      domainTitle: 'Global Fleet Dispatch, Warehouse WMS & Supply Chain Suite',
      primaryColor: '#D97706',
      taglineSuffix: 'Live Fleet GPS Telemetry, Barcode Inventory WMS & Cold-Chain Dispatch',
      modules: [
        {
          id: 'Onboarding & Auth',
          name: '1. Dispatcher Enclave & Scanner Pairing (4 Screens)',
          screenCount: 4,
          description: 'Fleet Command Boot, WMS & Route Optimization Tour, Operator Badge Sign In, Zebra/RFID Scanner Pairing',
        },
        {
          id: 'Discovery & Catalog',
          name: '2. Dispatch Control Tower & SKU Warehouse (4 Screens)',
          screenCount: 4,
          description: 'Live Fleet & Shipment Hub, Waybill & Container Search, Multi-Depot SKU Inventory, Priority Freight Lanes',
        },
        {
          id: 'Detail & Social',
          name: '3. Bill of Lading, Customs Audit & Delay Alerts (4 Screens)',
          screenCount: 4,
          description: 'Container Manifest & Cold-Chain Temp Spec, Carrier SLA Ratings, Pinned Freight Lanes, Geofence & Customs Alerts',
        },
        {
          id: 'Cart & Payment',
          name: '4. Freight Dispatch Order, Fuel Settlement & POD (3 Screens)',
          screenCount: 3,
          description: 'Multi-Pallet Load Manifest Builder, Commercial Letter of Credit & Fleet Card, Digital Proof of Delivery (e-POD)',
        },
        {
          id: 'Tracking & Support',
          name: '5. Live Satellite AIS/GPS Radar & Fleet Desk (3 Screens)',
          screenCount: 3,
          description: 'Real-Time Truck/Vessel GPS & Cold-Chain Telemetry, On-Time SLA & Fuel Analytics, 24/7 Dispatch Radio Chat',
        },
        {
          id: 'Profile & Settings',
          name: '6. Fleet Operator Credentials & ELD Rules (2 Screens)',
          screenCount: 2,
          description: 'Commercial Driver & Warehouse Clearance Pass, ELD Hours-of-Service, RFID & Webhook ERP Settings',
        },
      ],
      screenTitles: [
        '01. Logistics Control Tower Boot & RFID Sync',
        '02. AI Route Optimization & WMS Walkthrough',
        '03. Operator Badge & Biometric Terminal Login',
        '04. Warehouse Depot & Barcode Scanner Pairing',
        '05. Global Dispatch Control Tower & KPI Hub',
        '06. Waybill, Container & SKU Barcode Search',
        '07. Multi-Warehouse Stock & Pallet Directory',
        '08. Priority Air/Ocean/Ground Freight Lanes',
        '09. Container Manifest & Cold-Chain Sensor Spec',
        '10. Carrier SLA Benchmarks & Customs Logs',
        '11. Bookmarked Freight Routes &Vendors',
        '12. Port Congestion, Temp & Geofence Alerts',
        '13. Dispatch Load Builder & Pallet Allocation',
        '14. Commercial Freight Settlement & Fleet Card',
        '15. Electronic Proof of Delivery (e-POD) & QR',
        '16. Live GPS Truck & Vessel Telemetry Radar',
        '17. Fleet Fuel Efficiency & On-Time SLA Charts',
        '18. 24/7 Dispatch Control & Driver Comms Desk',
        '19. Dispatcher Clearance & Depot Credentials',
        '20. ELD Compliance, Webhook & Scanner Settings',
      ],
      photos: {
        splash: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
        onboarding: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80',
        auth: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80',
        discover: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
        search: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80',
        catalog: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
        deals: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80',
        detail: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80',
        reviews: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80',
        wishlist: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
        notifications: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80',
        checkout: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80',
        payment: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
        receipt: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
        tracker: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80',
        analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        support: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
        profile: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80',
        settings: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80',
        items: [
          'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80',
        ],
      },
      terms: {
        heroTitle: '142 Active Shipments • 99.4% On-Time SLA',
        heroSub: 'Real-Time GPS Fleet Telemetry, Cold-Chain IoT & Automated Customs',
        heroBadge: 'CONTROL TOWER LIVE',
        searchPlaceholder: 'Scan barcode, waybill #AWB, container ID, or depot...',
        pills: ['🚛 In Transit (84)', '❄️ Cold-Chain', '✈️ Air Priority', '⚓ Ocean Container', '📦 Warehouse'],
        metricLabel: 'ON-TIME FLEET SLA',
        metricValue: '99.4% On-Schedule',
        metricDelta: '-14% Fuel Burn via AI Routing',
        catalogTitle: 'Active Freight Manifests & Depot Inventory',
        catalogSub: 'Real-time RFID pallet counts, container telemetry, and dock assignments',
        detailTitle: 'Waybill #FX-9048 • Cold-Chain Medical Freight',
        detailSub: '40ft Reefer Container • Maintained at -18.4°C • Rotterdam → Newark',
        detailPrice: '$4,280.00',
        checkoutTitle: 'Freight Dispatch & Customs Clearance Manifest',
        checkoutSub: 'Automated Harmonized Tariff Code + Lloyds Cargo Insurance Included',
        checkoutTotal: '$4,280.00',
        trackerTitle: 'Convoy #18 Crossing Interstate I-95 Corridor',
        trackerSub: '54 Miles to Newark Hub • Reefer Temp -18.4°C Stable • Driver: R. Vance',
        trackerMetric: 'ETA 48m',
        trackerSteps: ['1. Gate Out ✓', '2. Customs Cleared ✓', '3. Linehaul ✓', '4. Dock Unload'],
        profileTier: 'Chief Logistics Officer • Level 5 Clearance',
        profilePerks: '12 Regional Depots Connected • SAP & NetSuite ERP Real-Time Sync',
        sampleItems: [
          {
            title: 'Waybill #FX-9048 • Reefer Container (40ft)',
            subtitle: 'IoT Temp -18.4°C • 24 Euro Pallets • Priority Customs Cleared',
            badge: 'IN TRANSIT',
            value: 'ETA 48 Mins',
            rating: '99.9% SLA',
            meta: 'Dock #14 Assigned',
            actionLabel: 'Track GPS',
          },
          {
            title: 'SKU #WH-4410 • Industrial Lithium Battery Packs',
            subtitle: 'Zone B-12 Rack 04 • 1,420 Units In Stock • Auto-Reorder Active',
            badge: 'WAREHOUSE A',
            value: '1,420 Units',
            rating: 'RFID Verified',
            meta: 'Hazmat Class 9',
            actionLabel: 'Allocate Stock',
          },
          {
            title: 'Air Charter Cargo #AC-772 • Frankfurt → JFK',
            subtitle: 'Boeing 777F Main Deck • 18,400 kg Payload • Express Customs',
            badge: 'AIR PRIORITY',
            value: '$8,950.00',
            rating: 'On Time',
            meta: 'Flight LH-8412',
            actionLabel: 'Inspect AWB',
          },
          {
            title: 'Last-Mile EV Van Fleet #EV-209 (14 Stops)',
            subtitle: '92% Battery Charge • 11 of 14 Deliveries Completed with e-POD',
            badge: 'LAST MILE',
            value: '3 Stops Left',
            rating: '5.0 ★ Driver',
            meta: 'Zero Emissions',
            actionLabel: 'Live Route',
          },
        ],
      },
    };
  }

  if (
    combined.includes('educat') ||
    combined.includes('learn') ||
    combined.includes('course') ||
    combined.includes('school') ||
    combined.includes('study') ||
    combined.includes('academy') ||
    combined.includes('tutor')
  ) {
    return {
      domainKey: 'education',
      domainTitle: 'AI EdTech, Interactive Courses & Live Mentorship Platform',
      primaryColor: '#7C3AED',
      taglineSuffix: '4K Interactive Masterclasses, AI Socratic Tutor, Code Labs & Accredited Certificates',
      modules: [
        {
          id: 'Onboarding & Auth',
          name: '1. Learner Onboarding & Skill Assessment (4 Screens)',
          screenCount: 4,
          description: 'Academy Launch, Career Path & Skill Diagnostic, Student SSO Sign In, Daily Study Streak Goal Setup',
        },
        {
          id: 'Discovery & Catalog',
          name: '2. Learning Path Hub & Course Catalog (4 Screens)',
          screenCount: 4,
          description: 'Active Learning Dashboard, Topic & Skill Level Filter, Accredited Course Catalog, Bootcamps & Scholarships',
        },
        {
          id: 'Detail & Social',
          name: '3. Syllabus, Student Cohort & Study Alerts (4 Screens)',
          screenCount: 4,
          description: 'Interactive Syllabus & Video Preview, Alumni Career Outcomes, Bookmarked Lessons, Live Class Reminders',
        },
        {
          id: 'Cart & Payment',
          name: '4. Pro Tuition Enrollment & Certificate Pass (3 Screens)',
          screenCount: 3,
          description: 'Bootcamp & Annual Pass Summary, Student Tuition & Employer Reimbursement, Accredited Blockchain Diploma',
        },
        {
          id: 'Tracking & Support',
          name: '5. Live Video Classroom, Quiz Analytics & AI Tutor (3 Screens)',
          screenCount: 3,
          description: '4K Interactive Video Player & Code Sandbox, Skill Mastery & XP Radar, 24/7 AI Socratic Tutor & Mentor Chat',
        },
        {
          id: 'Profile & Settings',
          name: '6.Verified Credential Portfolio & Offline Downloads (2 Screens)',
          screenCount: 2,
          description: 'LinkedIn-Verified Certificate Vault & Streak Badges, Offline Video Download & Playback Speed Settings',
        },
      ],
      screenTitles: [
        '01. Academy Splash & Skill Graph Sync',
        '02. Personalized Career Track Diagnostic',
        '03. Student SSO, GitHub & Passkey Sign In',
        '04. Study Goal & Daily Streak Calibration',
        '05. Active Course Hub & Daily Lesson Queue',
        '06. Skill Topic, Difficulty & Mentor Filter',
        '07. Accredited Masterclass & Bootcamp Catalog',
        '08. Career Track Bundles & Scholarship Grants',
        '09. Course Syllabus, Projects & Video Preview',
        '10. Verified Alumni Reviews & Hiring Outcomes',
        '11. Saved Flashcards, Notes & Bookmarked Labs',
        '12. Live Cohort Workshop & Streak Reminders',
        '13. Pro Academy Membership & Bootcamp Enrollment',
        '14. Tuition Apple Pay & Employer Stipend Billing',
        '15. Accredited Certificate & Cohort Welcome Pass',
        '16. Interactive 4K Lecture Player & Live Quiz Lab',
        '17. Skill Mastery Radar, XP & Exam Analytics',
        '18. 24/7 AI Socratic Tutor & 1-on-1 Mentor Chat',
        '19. Verified Credentials, Portfolio & Badges',
        '20. Offline Lesson Storage & Captions Settings',
      ],
      photos: {
        splash: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
        onboarding: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
        auth: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
        discover: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
        search: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
        catalog: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=900&q=80',
        deals: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80',
        detail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
        reviews: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
        wishlist: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80',
        notifications: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
        checkout: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=900&q=80',
        payment: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
        receipt: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
        tracker: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
        analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        support: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
        profile: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
        settings: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
        items: [
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
        ],
      },
      terms: {
        heroTitle: 'Applied AI Systems & Full-Stack Engineering',
        heroSub: 'Module 4 of 8 • 82% Completed • Live Mentor Office Hours at 6:00 PM',
        heroBadge: '21-DAY STUDY STREAK 🔥',
        searchPlaceholder: 'Search courses, hands-on labs, mentors, certificates...',
        pills: ['🤖 AI Engineering', '💻 System Design', '🎨 Product UI/UX', '📊 Data Science', '🏆 Certificates'],
        metricLabel: 'SKILL MASTERY SCORE',
        metricValue: '940 XP • Top 3%',
        metricDelta: '18 Hands-On Labs Passed',
        catalogTitle: 'Accredited Career Tracks & Interactive Labs',
        catalogSub: 'Learn by building real production projects with instant AI code review',
        detailTitle: 'Distributed Systems & LLM Architecture Masterclass',
        detailSub: '42 HD Video Lessons • 12 Cloud Sandbox Labs • Verified Capstone Certificate',
        detailPrice: '$29 / mo',
        checkoutTitle: 'Pro Academy All-Access & Certificate Track',
        checkoutSub: 'Includes Unlimited Cloud Labs, 1-on-1 Mentor Reviews & Accredited Diploma',
        checkoutTotal: '$199.00 / yr',
        trackerTitle: 'Lesson 14: Transformer Attention Lab Running',
        trackerSub: 'All 8 Unit Tests Passing in Cloud GPU Sandbox • 12 Mins Remaining',
        trackerMetric: '82% Done',
        trackerSteps: ['1. Video Lecture ✓', '2. Code Lab ✓', '3. AI Review ✓', '4. Quiz Pass'],
        profileTier: 'Fellowship Scholar • 21-Day Streak',
        profilePerks: '4 Verified Industry Certificates • GitHub & LinkedIn Credential Sync',
        sampleItems: [
          {
            title: 'LLM Agents & Production RAG Architecture',
            subtitle: '14 Interactive Labs • Vector Databases, Tool Calling & Eval Pipelines',
            badge: 'BESTSELLER',
            value: '18 Hours',
            rating: '4.98 (4.2k)',
            meta: 'Certificate Incl.',
            actionLabel: 'Resume Lab',
          },
          {
            title: 'Staff-Level Distributed Systems & Rust',
            subtitle: ' Consensus protocols, Raft, high-throughput RPC & memory safety',
            badge: 'ADVANCED',
            value: '24 Hours',
            rating: '4.95 (1.9k)',
            meta: '12 Coding Labs',
            actionLabel: 'Start Module',
          },
          {
            title: 'Design Systems & Micro-Interactions Studio',
            subtitle: 'Master token architecture, spring physics, and accessible mobile UI',
            badge: 'UI/UX TRACK',
            value: '12 Hours',
            rating: '4.92 (1.5k)',
            meta: 'Figma + Code',
            actionLabel: 'Open Studio',
          },
          {
            title: '1-on-1 Mock Technical Interview with Staff Engineer',
            subtitle: '45-min live coding & architecture session with detailed rubric feedback',
            badge: 'LIVE MENTOR',
            value: 'Included',
            rating: '5.0 (890)',
            meta: 'FAANG Mentors',
            actionLabel: 'Book Session',
          },
        ],
      },
    };
  }

  if (
    combined.includes('ride') ||
    combined.includes('taxi') ||
    combined.includes('ev') ||
    combined.includes('car') ||
    combined.includes('mobility') ||
    combined.includes('transit') ||
    combined.includes('travel') ||
    combined.includes('hotel') ||
    combined.includes('flight') ||
    combined.includes('booking')
  ) {
    return {
      domainKey: 'ride',
      domainTitle: 'Autonomous EV Ride-Hailing, Flight & Luxury Travel Suite',
      primaryColor: '#0284C7',
      taglineSuffix: 'Instant EV Chauffeur Dispatch, Live Telemetry Map, Split Fare & Travel Concierge',
      modules: [
        {
          id: 'Onboarding & Auth',
          name: '1. Rider Passkey & Safety Verification (4 Screens)',
          screenCount: 4,
          description: 'Mobility Launch, Autonomous EV & Lounge Tour, Biometric Rider Login, Emergency Contact & PIN Setup',
        },
        {
          id: 'Discovery & Catalog',
          name: '2. Live Map Pickup & Fleet Tier Selector (4 Screens)',
          screenCount: 4,
          description: 'Interactive GPS Pickup & Destination Map, Multi-Stop Route Planner, EV Fleet Class Selector, Airport & Hourly Packages',
        },
        {
          id: 'Detail & Social',
          name: '3. Cabin Controls, Chauffeur Ratings & Flight Alerts (4 Screens)',
          screenCount: 4,
          description: 'Cabin Temp/Audio Pre-Set & Vehicle Spec, 5-Star Chauffeur Dossier, Saved Places (Home/Work/Airport), Flight Gate & Surge Alerts',
        },
        {
          id: 'Cart & Payment',
          name: '4. Upfront Fare Lock, Split-Pay & Boarding Pass (3 Screens)',
          screenCount: 3,
          description: 'Upfront Fare Breakdown & Corporate Expense Tag, Instant Split-Fare & Apple Pay, Digital Boarding QR & Trip Pin',
        },
        {
          id: 'Tracking & Support',
          name: '5. Live Chauffeur Radar, Trip History & Safety SOS (3 Screens)',
          screenCount: 3,
          description: 'Live 3D Vehicle Approach & Telemetry HUD, Monthly Mileage & Expense Receipts, 24/7 Safety Response & Lost Item Chat',
        },
        {
          id: 'Profile & Settings',
          name: '6. Executive Miles Pass & Ride Preferences (2 Screens)',
          screenCount: 2,
          description: ' VIP Airport Lounge & Miles Vault, Quiet Ride Mode, Corporate Concur Sync & Safety PIN Settings',
        },
      ],
      screenTitles: [
        '01. Mobility Radar Boot & GPS Lock',
        '02. Autonomous EV & Chauffeur Walkthrough',
        '03. Rider FaceID & Passkey Sign In',
        '04. Rider Safety PIN & Trusted Contacts',
        '05. Live GPS Pickup & Destination Command Map',
        '06. Multi-Stop Route & Airport Flight Sync',
        '07. Vehicle Class Selector (EV Luxe / SUV / Autonomous)',
        '08. Hourly Chauffeur & Airport Transfer Bundles',
        '09. Cabin Climate, Quiet Mode & Vehicle Dossier',
        '10. Chauffeur Safety Record & Rider Reviews',
        '11. Saved Destinations, Lounges & Favorite Routes',
        '12. Flight Delay, Pickup ETA & Price Drop Alerts',
        '13. Upfront Fare Lock & Corporate Expense Summary',
        '14. 1-Tap Apple Pay, Split Fare & Travel Wallet',
        '15. 4-Digit Pickup PIN & Digital Boarding Pass',
        '16. Live 3D Vehicle Approach & Route Telemetry',
        '17. Past Trips, Tax Invoices & CO2 Saved Report',
        '18. 24/7 Live Safety Guardian & Concierge Desk',
        '19. Executive Platinum Miles & Lounge Pass',
        '20. Default Cabin Temp, Concur & Safety Settings',
      ],
      photos: {
        splash: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
        onboarding: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
        auth: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
        discover: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80',
        search: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
        catalog: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
        deals: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
        detail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
        reviews: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
        wishlist: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
        notifications: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80',
        checkout: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
        payment: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
        receipt: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
        tracker: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80',
        analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        support: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
        profile: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
        settings: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
        items: [
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80',
        ],
      },
      terms: {
        heroTitle: 'Lucid Air Sapphire EV • 2 Mins Away',
        heroSub: 'Destination: JFK Terminal 4 VIP Departure Drop-off • Fare Locked',
        heroBadge: 'PICKUP PIN: 4829',
        searchPlaceholder: 'Where to? Enter destination, airport terminal, or hotel...',
        pills: ['⚡ EV Executive', '🚙 Black SUV', '🤖 Autonomous Pod', '✈️ Airport Priority', '⏱ Hourly Charter'],
        metricLabel: 'CHAUFFEUR PICKUP ETA',
        metricValue: '2 Mins Away',
        metricDelta: 'Cabin Pre-Cooled to 68°F',
        catalogTitle: 'Select Your Electric & Executive Fleet Class',
        catalogSub: 'Zero-surge upfront pricing with flight-tracked airport guarantee',
        detailTitle: 'Lucid Air Executive Sedan • Quiet Ride',
        detailSub: '4 Passengers • 3 Large Suitcases • Bowers & Wilkins Spatial Cabin Audio',
        detailPrice: '$42.50',
        checkoutTitle: 'Upfront Guaranteed Fare & Split-Pay',
        checkoutSub: 'Corporate Expense Tag Attached + 3x Airline Miles Earned',
        checkoutTotal: '$42.50',
        trackerTitle: 'Chauffeur David K. Approaching on 5th Ave',
        trackerSub: 'Plate #EV-8841NY • Silver Lucid Air • Cabin Set to Quiet Mode & 68°F',
        trackerMetric: '2 Mins',
        trackerSteps: ['1. Dispatched ✓', '2. Arriving ✓', '3. In Transit ✓', '4. Drop-off'],
        profileTier: 'Executive Platinum Rider • 48,200 Miles',
        profilePerks: 'Complimentary Airport Priority Pickup • Top 1% Rated Chauffeurs Only',
        sampleItems: [
          {
            title: 'Executive EV Sedan (Lucid Air / Mercedes EQS)',
            subtitle: 'Pickup in 2 mins • Cabin climate control & quiet preference',
            badge: 'FASTEST PICKUP',
            value: '$42.50',
            rating: '4.99 ★ Chauffeur',
            meta: '4 Seats • 3 Bags',
            actionLabel: 'Book EV Sedan',
          },
          {
            title: 'Cadillac Escalade IQ Black SUV',
            subtitle: 'Pickup in 4 mins • Executive captain chairs & extra luggage bay',
            badge: 'VIP GROUP',
            value: '$64.00',
            rating: '4.98 ★ Chauffeur',
            meta: '6 Seats • 6 Bags',
            actionLabel: 'Book Black SUV',
          },
          {
            title: 'Autonomous Waymo / Zoox Private Pod',
            subtitle: 'Pickup in 5 mins • 100% private driverlessLiDAR safety enclave',
            badge: 'DRIVERLESS AI',
            value: '$28.90',
            rating: 'Zero Emissions',
            meta: '4 Seats • Private',
            actionLabel: 'Summon Pod',
          },
          {
            title: 'JFK / LaGuardia Flight-Tracked Meet & Greet',
            subtitle: 'Chauffeur waits inside terminal arrivals with luggage assistance',
            badge: 'AIRPORT VIP',
            value: '$85.00',
            rating: '60m Free Wait',
            meta: 'Flight Synced',
            actionLabel: 'Reserve Transfer',
          },
        ],
      },
    };
  }

  // Only use E-Commerce / Cloth Shop when the user actually selects E-Commerce / Fashion / Retail!
  const isEcommerce =
    combined.includes('cloth') ||
    combined.includes('shop') ||
    combined.includes('commerce') ||
    combined.includes('fashion') ||
    combined.includes('retail') ||
    combined.includes('store') ||
    combined.includes('boutique');

  if (!isEcommerce) {
    // Dynamic Bespoke Category Synthesizer for ANY Custom Category (Social, Music, AI Studio, Gaming, Smart Home, Pet Care, Event, etc.)
    const cleanCat = (category || 'Custom Mobile').trim();
    const cleanProj = (projectName || cleanCat).trim();
    return {
      domainKey: 'custom',
      domainTitle: `${cleanProj} — ${cleanCat} Architecture`,
      primaryColor: '#6366F1',
      taglineSuffix: `Bespoke ${cleanCat} Workspace, Real-Time Interactive Tools & Live Telemetry`,
      modules: [
        {
          id: 'Onboarding & Auth',
          name: `1. ${cleanProj} Launch & Identity Setup (4 Screens)`,
          screenCount: 4,
          description: `${cleanProj} Splash Boot, Interactive ${cleanCat} Feature Tour, Passkey Sign In, Workspace & Profile Calibration`,
        },
        {
          id: 'Discovery & Catalog',
          name: `2. ${cleanCat} Command Hub & Directory (4 Screens)`,
          screenCount: 4,
          description: `${cleanProj} Primary Command Hub, Smart ${cleanCat} Search & Filter, Full ${cleanCat} Library, Featured Workflows`,
        },
        {
          id: 'Detail & Social',
          name: `3. ${cleanCat} Inspector, Community & Alerts (4 Screens)`,
          screenCount: 4,
          description: `Interactive ${cleanCat} Configurator & Workspace, Community Ratings & Activity, Saved Bookmarks, Live Push Triggers`,
        },
        {
          id: 'Cart & Payment',
          name: `4. ${cleanCat} Action Queue, Pro Plan & Pass (3 Screens)`,
          screenCount: 3,
          description: `${cleanProj} Session / Action Builder, Pro Subscription & Apple Pay Vault, Verified Execution Pass & QR`,
        },
        {
          id: 'Tracking & Support',
          name: `5. Live ${cleanCat} Telemetry, Insights & Concierge (3 Screens)`,
          screenCount: 3,
          description: `Real-Time ${cleanCat} Execution Monitor, 30-Day Performance & Usage Charts, 24/7 Specialist Support Chat`,
        },
        {
          id: 'Profile & Settings',
          name: `6. ${cleanProj} Creator Profile & System Config (2 Screens)`,
          screenCount: 2,
          description: `${cleanProj} Member Credentials & Achievements, API / Device Sync, Biometrics & Privacy Settings`,
        },
      ],
      screenTitles: [
        `01. ${cleanProj} Brand Launch & Engine Check`,
        `02. ${cleanCat} Interactive Workflow Walkthrough`,
        `03. ${cleanProj} Biometric Passkey & SSO Login`,
        `04. ${cleanCat} Workspace & Preferences Setup`,
        `05. ${cleanProj} Primary ${cleanCat} Hub`,
        `06. ${cleanCat} Multi-Facet Search & Filter Lab`,
        `07. ${cleanProj} Verified ${cleanCat} Directory`,
        `08. Featured ${cleanCat} Templates & Accelerators`,
        `09. Interactive ${cleanCat} Studio & Configurator`,
        `10. ${cleanCat} Community Showcase & Reviews`,
        `11. Saved ${cleanCat} Projects & Collections`,
        `12. Real-Time ${cleanProj} Activity & Push Alerts`,
        `13. ${cleanCat} Session Queue & Plan Configurator`,
        `14. ${cleanProj} Pro Billing, Apple Pay & Credits`,
        `15. Execution Confirmation & Digital Access Pass`,
        `16. Live ${cleanCat} Telemetry & Progress Monitor`,
        `17. ${cleanProj} 30-Day Analytics & Performance Log`,
        `18. 24/7 ${cleanCat} Specialist & AI Support Desk`,
        `19. ${cleanProj} Pro Member Profile & Badges`,
        `20. ${cleanCat} Integrations, Security & App Settings`,
      ],
      photos: {
        splash: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
        onboarding: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        auth: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80',
        discover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
        search: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        catalog: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
        deals: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
        detail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
        reviews: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
        wishlist: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        notifications: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80',
        checkout: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
        payment: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
        receipt: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
        tracker: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        support: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
        profile: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
        settings: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80',
        items: [
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
        ],
      },
      terms: {
        heroTitle: `${cleanProj} • Live ${cleanCat} Studio`,
        heroSub: projectDetails || `Next-Generation ${cleanCat} Platform with Real-Time Automation`,
        heroBadge: `${cleanCat.toUpperCase()} PRO`,
        searchPlaceholder: `Search ${cleanProj} ${cleanCat.toLowerCase()} workflows, tools, items...`,
        pills: [`⚡ Active ${cleanCat}`, '🔥 Featured', '⭐ Top Rated', '📊 Telemetry', '⚙️ Automation'],
        metricLabel: `${cleanCat.toUpperCase()} EFFICIENCY`,
        metricValue: '99.4% Active',
        metricDelta: '+32.4% Productivity Gain',
        catalogTitle: `${cleanProj} ${cleanCat} Workspace Directory`,
        catalogSub: `Explore tailored ${cleanCat.toLowerCase()} modules, presets, and live actions`,
        detailTitle: `${cleanProj} Flagship ${cleanCat} Module`,
        detailSub: projectDetails || `Configured for real-time ${cleanCat.toLowerCase()} execution and cloud sync`,
        detailPrice: 'Pro Tier',
        checkoutTitle: `${cleanProj} Action & Plan Activation`,
        checkoutSub: `Instant ${cleanCat} deployment with zero latency and priority cloud compute`,
        checkoutTotal: '$29.00',
        trackerTitle: `Live ${cleanCat} Pipeline Running (Stage 3/4)`,
        trackerSub: `${cleanProj} real-time telemetry engine is processing your active workflow`,
        trackerMetric: '98% Synced',
        trackerSteps: ['1. Initialized ✓', '2. Validated ✓', '3. Executing ✓', '4. Completed'],
        profileTier: `${cleanProj} Executive Pass • Unlimited Access`,
        profilePerks: `Full ${cleanCat} API & Cloud Sync • Priority Specialist Concierge`,
        sampleItems: [
          {
            title: `${cleanProj} Core ${cleanCat} Engine`,
            subtitle: projectDetails.slice(0, 85) || `High-performance ${cleanCat.toLowerCase()} automation and real-time control`,
            badge: 'PRIMARY FLOW',
            value: 'Active',
            rating: '4.99 ★',
            meta: cleanCat,
            actionLabel: 'Launch Flow',
          },
          {
            title: `${cleanCat} Smart Analytics & Telemetry Hub`,
            subtitle: `Live performance tracking, anomaly detection, and exportable reports for ${cleanProj}`,
            badge: 'REAL-TIME',
            value: '99.8% SLA',
            rating: '4.95 ★',
            meta: 'Live Stream',
            actionLabel: 'Open HUD',
          },
          {
            title: `${cleanProj} Collaborative Studio & Presets`,
            subtitle: `Customize parameters, invite team members, and deploy ${cleanCat.toLowerCase()} templates`,
            badge: 'STUDIO PRO',
            value: '24 Presets',
            rating: '4.92 ★',
            meta: 'Cloud Synced',
            actionLabel: 'Configure',
          },
          {
            title: `${cleanCat} Automated Triggers & Push Rules`,
            subtitle: `Instant webhook and mobile push notifications when key ${cleanCat.toLowerCase()} events occur`,
            badge: 'AUTOMATION',
            value: '12 Rules',
            rating: '5.0 ★',
            meta: 'Zero Latency',
            actionLabel: 'Manage Rules',
          },
        ],
      },
    };
  }
  const dynamicModules: ProjectArchitectureAnalysis['modules'] = [
    {
      id: 'Onboarding & Auth',
      name: `1. ${projectName || category} Onboarding & Auth (4 Screens)`,
      screenCount: 4,
      description: `Brand Splash, Interactive ${category} Tour, Biometric Sign In, Account & 6-Digit OTP Verification`,
    },
    {
      id: 'Discovery & Catalog',
      name: `2. ${category} Discovery & Catalog (4 Screens)`,
      screenCount: 4,
      description: `Main ${projectName || category} Hub, Smart Search & Facet Filter, Full Directory Catalog, VIP Flash Offers`,
    },
    {
      id: 'Detail & Social',
      name: `3. Detail Configurator, Reviews & Alerts (4 Screens)`,
      screenCount: 4,
      description: `Interactive ${category} Detail & Customizer, Verified Community Reviews, Saved Wishlist, Push Alerts`,
    },
    {
      id: 'Cart & Payment',
      name: `4. Booking / Cart, Checkout & Payment (3 Screens)`,
      screenCount: 3,
      description: `Order / Booking Summary, Apple Pay & Titanium Card Vault, Verified Digital Receipt & QR Pass`,
    },
    {
      id: 'Tracking & Support',
      name: `5. Live Status Radar, Analytics & Chat (3 Screens)`,
      screenCount: 3,
      description: `Real-Time GPS / Status Telemetry Tracker, 30-Day Activity Analytics, 24/7 Live Concierge Support`,
    },
    {
      id: 'Profile & Settings',
      name: `6. VIP Member Profile & Security (2 Screens)`,
      screenCount: 2,
      description: `VIP Loyalty & Rewards Pass, Biometric Enclave, Connected Devices & App Settings`,
    },
  ];

  return {
    domainKey:
      combined.includes('cloth') ||
      combined.includes('shop') ||
      combined.includes('commerce') ||
      combined.includes('fashion')
        ? 'ecommerce'
        : 'custom',
    domainTitle: `${projectName ? `${projectName} • ` : ''}${category || 'Luxury Retail & Mobile Commerce'} Suite`,
    primaryColor: '#4338CA',
    taglineSuffix: `Complete ${category || 'Mobile'} Ecosystem with AI Discovery, Catalog, Checkout & Live Tracking`,
    modules: dynamicModules,
    photos: {
      splash: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80',
      onboarding: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      auth: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
      discover: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80',
      search: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      catalog: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
      deals: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      detail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      reviews: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
      wishlist: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      notifications: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80',
      checkout: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
      payment: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
      receipt: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
      tracker: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80',
      analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
      support: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
      profile: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      settings: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      items: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
      ],
    },
    terms: {
      heroTitle: `${projectName || 'Atelier'} Autumn/Winter Capsule`,
      heroSub: `Curated ${category || 'Luxury'} Collection • Express Same-Day Dispatch`,
      heroBadge: 'NEW SEASON • 30% OFF',
      searchPlaceholder: `Search ${projectName || 'catalog'}, collections, categories...`,
      pills: ['🔥 Trending', '✨ New Arrivals', '👑 Editorial', '⚡ Flash Sale', '⭐ Top Rated'],
      metricLabel: 'LIVE MEMBER RATING',
      metricValue: '4.96 ★',
      metricDelta: '18.4k+ Verified Reviews',
      catalogTitle: `${projectName || 'Flagship'} Complete Collection`,
      catalogSub: 'Filter by size, material, rating, and instant availability',
      detailTitle: 'Italian Cashmere Structured Trench Coat',
      detailSub: '100% Loro Piana Virgin Wool & Cashmere Blend • Hand-Finished Lapels',
      detailPrice: '$289.00',
      checkoutTitle: 'Priority Express Shopping Bag (3 Items)',
      checkoutSub: 'Complimentary Gift Packaging + VIP Free Express Courier',
      checkoutTotal: '$468.00',
      trackerTitle: 'Out for Express Courier Delivery',
      trackerSub: 'Package #AF-9042 is 1.2 miles away • Signature Required',
      trackerMetric: '18 Mins',
      trackerSteps: ['1. Order Placed ✓', '2. Quality Check ✓', '3. Dispatched ✓', '4. Delivering'],
      profileTier: 'Atelier Platinum VIP • 6,420 Points',
      profilePerks: ' Early Capsule Access • Free Tailoring & Instant Returns',
      sampleItems: [
        {
          title: 'Italian Cashmere Structured Trench',
          subtitle: 'Double-breasted tailored silhouette • Water-repellent finish',
          badge: 'BEST SELLER',
          value: '$289.00',
          rating: '4.9 (1.4k)',
          meta: 'Sizes XS–XL',
          actionLabel: '+ Add to Bag',
        },
        {
          title: 'Artisan Full-Grain Leather Weekender',
          subtitle: 'Vegetable-tanned Tuscan calfskin with brushed brass hardware',
          badge: 'LIMITED EDITION',
          value: '$245.00',
          rating: '5.0 (820)',
          meta: 'Handcrafted',
          actionLabel: '+ Add to Bag',
        },
        {
          title: 'Minimalist Monochrome Chrono Watch',
          subtitle: 'Sapphire crystal glass • Swiss automatic movement • 5ATM',
          badge: 'NEW DROP',
          value: '$195.00',
          rating: '4.9 (640)',
          meta: '2-Yr Warranty',
          actionLabel: '+ Add to Bag',
        },
        {
          title: 'Merino Wool Ribbed Knit Crewneck',
          subtitle: 'Ultra-fine 18.5 micron Australian merino wool • Breathable warmth',
          badge: 'ESSENTIAL',
          value: '$118.00',
          rating: '4.8 (2.1k)',
          meta: '6 Colorways',
          actionLabel: '+ Add to Bag',
        },
      ],
    },
  };
}

export function analyzeProjectScreenRequirements(
  projectName: string,
  category: string,
  projectDetails: string,
  selectedModuleIds?: string[]
): ProjectArchitectureAnalysis {
  const profile = detectDomainProfile(projectName, category, projectDetails);
  const allModules: ProjectArchitectureAnalysis['modules'] = profile.modules || [
    {
      id: 'Onboarding & Auth',
      name: '1. Onboarding & Auth (4 Screens)',
      screenCount: 4,
      description: 'Splash Launch, 3-Step Onboarding Walkthrough, Sign In, Sign Up & OTP Verification',
    },
    {
      id: 'Discovery & Catalog',
      name: '2. Discovery & Catalog (4 Screens)',
      screenCount: 4,
      description: 'Home Discovery Hub, Smart Search & Filters, Full Category Catalog & Flash Deals',
    },
    {
      id: 'Detail & Social',
      name: '3. Detail, Reviews & Alerts (4 Screens)',
      screenCount: 4,
      description: 'Interactive Item/Service Detail, Verified Reviews, Saved Wishlist & Notifications Center',
    },
    {
      id: 'Cart & Payment',
      name: '4. Cart, Checkout & Payment (3 Screens)',
      screenCount: 3,
      description: 'Smart Shopping/Booking Bag, Payment Methods & Apple Pay, Order Confirmation Receipt',
    },
    {
      id: 'Tracking & Support',
      name: '5. Live Tracking, Analytics & Chat (3 Screens)',
      screenCount: 3,
      description: 'Live GPS/Telemetry Tracker, Performance Analytics & History, 24/7 Concierge Chat',
    },
    {
      id: 'Profile & Settings',
      name: '6. VIP Profile & System Settings (2 Screens)',
      screenCount: 2,
      description: 'VIP Member Loyalty Pass, Connected Devices, Privacy & Biometric App Settings',
    },
  ];

  const activeModules =
    Array.isArray(selectedModuleIds) && selectedModuleIds.length > 0
      ? allModules.filter((m) => selectedModuleIds.includes(m.id))
      : allModules;

  const totalScreens = activeModules.reduce((acc, m) => acc + m.screenCount, 0);

  return {
    domainKey: profile.domainKey,
    domainTitle: profile.domainTitle,
    primaryColor: profile.primaryColor,
    totalScreens,
    totalVariants: totalScreens * 3,
    modules: allModules,
  };
}

export function buildCompleteAppScreensSuite(
  projectName: string,
  category: string,
  projectDetails: string,
  designImages: string[] = [],
  selectedModuleIds?: string[],
  aiArchitectureModules?: any[]
): {
  tagline: string;
  primaryColor: string;
  analysis: ProjectArchitectureAnalysis;
  screens: CustomProjectScreenSpec[];
} {
  const cleanName = (projectName || 'AppForge Pro').trim();
  const profile = detectDomainProfile(cleanName, category, projectDetails);
  const analysis = analyzeProjectScreenRequirements(
    cleanName,
    category,
    projectDetails,
    selectedModuleIds
  );
  const { photos, terms } = profile;

  const mapSampleItems = (suffixLabel?: string) =>
    terms.sampleItems.map((it, idx) => ({
      ...it,
      actionLabel: suffixLabel || it.actionLabel,
      imageUrl: photos.items[idx % photos.items.length],
    }));

  const rawScreens: CustomProjectScreenSpec[] = [
    // =========================================================================
    // MODULE 1: ONBOARDING & AUTHENTICATION (4 SCREENS)
    // =========================================================================
    {
      id: 'SplashLaunch',
      label: '01. Splash & Brand Launch',
      category: 'MODULE 1 • ONBOARDING & AUTH',
      moduleGroup: 'Onboarding & Auth',
      description: `Branded launch screen for ${cleanName} with animated emblem, biometric enclave check, and instant session bootstrap.`,
      v1Name: 'V1: Center Brand Emblem',
      v2Name: 'V2: Editorial Full-Bleed Launch',
      v3Name: 'V3: Cyber Glass HUD Launch',
      screenType: 'splash',
      heroBannerTitle: cleanName,
      heroBannerSubtitle: projectDetails || `${cleanName} • ${profile.taglineSuffix}`,
      heroBannerBadge: 'V2.4 PRODUCTION READY',
      heroBannerImage: photos.splash,
      filterPills: ['⚡ Instant Launch', '🔒 FaceID Ready', '☁️ Cloud Synced'],
      heroMetricLabel: 'APP INITIALIZATION',
      heroMetricValue: '0.18s Cold Boot',
      heroMetricDelta: 'TLS 1.3 Encrypted Session',
      items: mapSampleItems('Explore'),
    },
    {
      id: 'OnboardingWalkthrough',
      label: '02. Onboarding Walkthrough',
      category: '3-STEP INTERACTIVE TOUR',
      moduleGroup: 'Onboarding & Auth',
      description: `Interactive 3-slide value proposition tour introducing ${cleanName}'s core features, live tracking, and VIP perks.`,
      v1Name: 'V1: Story Carousel & Dots',
      v2Name: 'V2: Bento Feature Highlights',
      v3Name: 'V3: Immersive Glass Tour',
      screenType: 'onboarding',
      heroBannerTitle: `Welcome to ${cleanName}`,
      heroBannerSubtitle: terms.heroSub,
      heroBannerBadge: 'STEP 1 OF 3 • TOUR',
      heroBannerImage: photos.onboarding,
      filterPills: ['1. Discover', '2. Customize & Book', '3. Live Track'],
      heroMetricLabel: 'USER ONBOARDING COMPLETION',
      heroMetricValue: '96.8% Rate',
      heroMetricDelta: '1-Tap Skip or Continue',
      items: mapSampleItems('Next Step'),
    },
    {
      id: 'SignInBiometric',
      label: '03. Sign In & Biometric Auth',
      category: 'OAUTH 2.0 • PASSKEY & FACE ID',
      moduleGroup: 'Onboarding & Auth',
      description: `Secure login screen with Email/Password, Apple & Google 1-Tap OAuth, and hardware FaceID / TouchID passkey unlock.`,
      v1Name: 'V1: Classic Credentials & Social',
      v2Name: 'V2: Biometric Passkey Vault',
      v3Name: 'V3: Glass Zero-Trust Login',
      screenType: 'auth',
      heroBannerTitle: `Sign In to ${cleanName}`,
      heroBannerSubtitle: 'Use FaceID, Google OAuth, Apple ID, or your registered email',
      heroBannerBadge: 'BIOMETRIC READY',
      heroBannerImage: photos.auth,
      filterPills: ['🔑 Email Login', ' Apple Sign-In', '🌐 Google Auth', '🪪 FaceID Passkey'],
      heroMetricLabel: 'AUTH SECURITY LEVEL',
      heroMetricValue: 'FIDO2 Passkey',
      heroMetricDelta: 'Zero-Knowledge Token',
      items: mapSampleItems('Authenticate'),
    },
    {
      id: 'SignUpOtpVerify',
      label: '04. Create Account & OTP',
      category: 'INSTANT REGISTRATION • 6-DIGIT OTP',
      moduleGroup: 'Onboarding & Auth',
      description: `New member registration with profile setup, phone/email 6-digit OTP verification, and welcome reward activation.`,
      v1Name: 'V1: Step-by-Step Registration',
      v2Name: 'V2: 6-Digit OTP Verification',
      v3Name: 'V3: Glass Onboarding Card',
      screenType: 'auth',
      heroBannerTitle: `Join ${cleanName} VIP`,
      heroBannerSubtitle: 'Verify your 6-digit SMS / Email security code to unlock member perks',
      heroBannerBadge: 'WELCOME BONUS READY',
      heroBannerImage: photos.onboarding,
      filterPills: ['1. Account Info', '2. 6-Digit OTP', '3. Claim Welcome Gift'],
      heroMetricLabel: 'VERIFICATION SLA',
      heroMetricValue: 'Instant SMS',
      heroMetricDelta: 'Auto-Fill OTP Supported',
      items: mapSampleItems('Verify OTP'),
    },

    // =========================================================================
    // MODULE 2: CORE DISCOVERY & CATALOG (4 SCREENS)
    // =========================================================================
    {
      id: 'HomeDiscoveryHub',
      label: '05. Home • Discovery Hub',
      category: `${category.toUpperCase()} • MAIN DASHBOARD`,
      moduleGroup: 'Discovery & Catalog',
      description: `Primary home feed featuring ${terms.heroTitle}, live KPI summary, quick filter pills, and personalized recommendations.`,
      v1Name: 'V1: Editorial Hero & Feed',
      v2Name: 'V2: 2-Col Bento Dashboard',
      v3Name: 'V3: Dark Glass Command HUD',
      screenType: 'discover',
      heroBannerTitle: terms.heroTitle,
      heroBannerSubtitle: terms.heroSub,
      heroBannerBadge: terms.heroBadge,
      heroBannerImage: photos.discover,
      searchPlaceholder: terms.searchPlaceholder,
      filterPills: terms.pills,
      heroMetricLabel: terms.metricLabel,
      heroMetricValue: terms.metricValue,
      heroMetricDelta: terms.metricDelta,
      items: mapSampleItems(),
    },
    {
      id: 'SmartSearchFilter',
      label: '06. Smart Search & Filter Lab',
      category: 'AI INSTANT SEARCH • MULTI-FILTER',
      moduleGroup: 'Discovery & Catalog',
      description: `Advanced search experience with live query suggestions, price/tier range sliders, sort chips, and instant matching cards.`,
      v1Name: 'V1: Live Search & Filter Chips',
      v2Name: 'V2: Split Facet Matrix',
      v3Name: 'V3: Glass Voice & AI Search',
      screenType: 'search',
      heroBannerTitle: `Search & Filter ${cleanName}`,
      heroBannerSubtitle: 'Filter by rating, price tier, availability, and verified badges',
      heroBannerBadge: 'INSTANT INDEX • 4 MS',
      heroBannerImage: photos.search,
      searchPlaceholder: terms.searchPlaceholder,
      filterPills: ['⭐ 4.9+ Rated', '⚡ Available Now', '💎 Premium Tier', '🔥 Best Value'],
      heroMetricLabel: 'MATCHING RESULTS',
      heroMetricValue: '142 Matches',
      heroMetricDelta: 'Sorted by Relevance & Rating',
      items: mapSampleItems('Inspect'),
    },
    {
      id: 'CategoryStudioCatalog',
      label: '07. Category & Studio Catalog',
      category: 'FULL DIRECTORY • VERIFIED SPECS',
      moduleGroup: 'Discovery & Catalog',
      description: `${terms.catalogTitle} — ${terms.catalogSub}. Browse all categories with high-res photography and 1-tap actions.`,
      v1Name: 'V1: Horizontal Spec Cards',
      v2Name: 'V2: 2-Column Visual Catalog',
      v3Name: 'V3: Immersive Poster Grid',
      screenType: 'catalog',
      heroBannerTitle: terms.catalogTitle,
      heroBannerSubtitle: terms.catalogSub,
      heroBannerBadge: 'VERIFIED CATALOG',
      heroBannerImage: photos.catalog,
      searchPlaceholder: terms.searchPlaceholder,
      filterPills: terms.pills,
      heroMetricLabel: 'CATALOG ITEMS ACTIVE',
      heroMetricValue: '240+ Verified',
      heroMetricDelta: 'Updated Live Today',
      items: mapSampleItems(),
    },
    {
      id: 'FlashDealsBundles',
      label: '08. Flash Deals & VIP Bundles',
      category: 'LIMITED TIME • UP TO 50% OFF',
      moduleGroup: 'Discovery & Catalog',
      description: `Curated time-sensitive bundles, seasonal promotions, and exclusive member-only offers with countdown timers.`,
      v1Name: 'V1: Countdown Deal Stack',
      v2Name: 'V2: 2-Column Promo Grid',
      v3Name: 'V3: Glass Spotlight Offers',
      screenType: 'catalog',
      heroBannerTitle: 'Member Flash Event • Ends in 04:18:52',
      heroBannerSubtitle: 'Exclusive bundle pricing + double loyalty points on all selections',
      heroBannerBadge: 'FLASH SALE • 50% OFF',
      heroBannerImage: photos.deals,
      searchPlaceholder: 'Search flash deals & bundles...',
      filterPills: ['🔥 50% Off', '🎁 Bundles', '👑 VIP Exclusive', '⏳ Ending Soon'],
      heroMetricLabel: 'AVERAGE MEMBER SAVINGS',
      heroMetricValue: '38% Saved',
      heroMetricDelta: 'Promo Auto-Applied at Checkout',
      items: mapSampleItems('Claim Deal'),
    },

    // =========================================================================
    // MODULE 3: DETAIL, CUSTOMIZATION & SOCIAL (4 SCREENS)
    // =========================================================================
    {
      id: 'InteractiveItemDetail',
      label: '09. Item Detail & Customizer',
      category: '4K GALLERY • OPTION CONFIGURATOR',
      moduleGroup: 'Detail & Social',
      description: `Deep detail showcase for ${terms.detailTitle} with interactive tier/size/option selectors, spec matrix, and sticky action bar.`,
      v1Name: 'V1: Hero Showcase & Configurator',
      v2Name: 'V2: Bento Spec & Option Sheet',
      v3Name: 'V3: Full-Bleed Glass Detail',
      screenType: 'detail',
      heroBannerTitle: terms.detailTitle,
      heroBannerSubtitle: terms.detailSub,
      heroBannerBadge: 'TOP RATED • 4.98 ★',
      heroBannerImage: photos.detail,
      filterPills: ['Standard Tier', 'Pro / Large (+15%)', 'VIP ExecutiveBundle', 'Custom Spec'],
      heroMetricLabel: 'UNIT VALUE / RATE',
      heroMetricValue: terms.detailPrice,
      heroMetricDelta: 'In Stock • Instant Confirmation',
      items: mapSampleItems('+ Select Option'),
    },
    {
      id: 'VerifiedReviewsCommunity',
      label: '10. Verified Reviews & Ratings',
      category: '4.96 ★ AVERAGE • PHOTO REVIEWS',
      moduleGroup: 'Detail & Social',
      description: `Customer rating distribution, verified photo testimonials, helpfulness voting, and expert quality benchmarks.`,
      v1Name: 'V1: Rating Breakdown & Feed',
      v2Name: 'V2: 2-Column Photo Testimonials',
      v3Name: 'V3: Glass Community Pulse',
      screenType: 'detail',
      heroBannerTitle: '4.96 ★ from 14,820+ Verified Members',
      heroBannerSubtitle: '99.2% of members recommend this experience to friends',
      heroBannerBadge: '100% VERIFIED BUYERS',
      heroBannerImage: photos.reviews,
      filterPills: ['🌟 All (4.96★)', '📸 With Photos', '🔥 Most Helpful', '✅ Verified Pro'],
      heroMetricLabel: 'SATISFACTION SCORE',
      heroMetricValue: '99.2% Positive',
      heroMetricDelta: 'Audited Authentic Reviews',
      items: [
        {
          title: 'Elena Rostova • Verified VIP Member',
          subtitle: '“Hands down the most seamless experience. Quality and speed exceeded every expectation!”',
          badge: '5.0 ★ VERIFIED',
          value: '2h ago',
          imageUrl: photos.items[0],
          rating: 'Helpful (142)',
          meta: 'Photo Attached',
          actionLabel: 'Helpful 👍',
        },
        {
          title: 'Marcus Vance • Annual Pro Subscriber',
          subtitle: '“Switched from three competing apps to this one. The live tracking and attention to detail are unmatched.”',
          badge: '5.0 ★ VERIFIED',
          value: '1d ago',
          imageUrl: photos.items[1],
          rating: 'Helpful (98)',
          meta: 'Repeat Member',
          actionLabel: 'Helpful 👍',
        },
        {
          title: 'Sophia Chen • Executive Tier',
          subtitle: '“Customer concierge resolved my custom request in under 90 seconds. Worth every penny.”',
          badge: '4.9 ★ VERIFIED',
          value: '3d ago',
          imageUrl: photos.items[2],
          rating: 'Helpful (64)',
          meta: 'Verified Order',
          actionLabel: 'Helpful 👍',
        },
      ],
    },
    {
      id: 'SavedWishlistVault',
      label: '11. Saved Wishlist & Favorites',
      category: 'PERSONAL SHORTLIST • PRICE ALERTS',
      moduleGroup: 'Detail & Social',
      description: `Curated collection of bookmarked items, custom comparison boards, and 1-tap move-to-bag actions.`,
      v1Name: 'V1: Saved Shortlist Cards',
      v2Name: 'V2: 2-Column Moodboard Grid',
      v3Name: 'V3: Glass Favorites Vault',
      screenType: 'wishlist',
      heroBannerTitle: 'Your Saved Favorites & Shortlist',
      heroBannerSubtitle: '4 items bookmarked with instant availability & price-drop alerts active',
      heroBannerBadge: '4 SAVED ITEMS',
      heroBannerImage: photos.wishlist,
      filterPills: ['❤️ All Saved', '📉 Price Drops', '⚡ Ready Now', '📁 Collections'],
      heroMetricLabel: 'SHORTLIST VALUE',
      heroMetricValue: '4 Bookmarked',
      heroMetricDelta: '1-Tap Move All to Bag',
      items: mapSampleItems('Move to Bag'),
    },
    {
      id: 'NotificationsActivityCenter',
      label: '12. Notifications & Live Alerts',
      category: 'REAL-TIME PUSH • STATUS & PROMOS',
      moduleGroup: 'Detail & Social',
      description: `Centralized notification inbox with unread filter tabs for live status updates, security alerts, and VIP rewards.`,
      v1Name: 'V1: Timestamped Alert Feed',
      v2Name: 'V2: Categorized Bento Inbox',
      v3Name: 'V3: Glass Live Activity Stream',
      screenType: 'notifications',
      heroBannerTitle: '3 Unread Priority Notifications',
      heroBannerSubtitle: 'Real-time order updates, security login alerts, and flash reward drops',
      heroBannerBadge: 'LIVE PUSH ACTIVE',
      heroBannerImage: photos.notifications,
      filterPills: ['🔔 All Alerts (12)', '🚀 Live Status', '🎁 VIP Promos', '🔒 Security'],
      heroMetricLabel: 'UNREAD ALERTS',
      heroMetricValue: '3 Unread',
      heroMetricDelta: 'Push & SMS Channels Active',
      items: [
        {
          title: `Live Update: ${terms.trackerTitle}`,
          subtitle: terms.trackerSub,
          badge: 'JUST NOW',
          value: 'Track Live',
          imageUrl: photos.items[0],
          rating: 'Priority',
          meta: 'Push Alert',
          actionLabel: 'Open Tracker',
        },
        {
          title: 'VIP Reward Unlocked: $25.00 Bonus Credit',
          subtitle: 'Automatically added to your wallet for completing your 10th milestone',
          badge: '14M AGO',
          value: '$25 Credit',
          imageUrl: photos.items[1],
          rating: 'Reward',
          meta: 'Expires in 30d',
          actionLabel: 'Redeem',
        },
        {
          title: 'Security Check: New Passkey Verified on iPhone 16 Pro',
          subtitle: 'Hardware enclave signature authenticated via FaceID',
          badge: '2H AGO',
          value: 'Verified',
          imageUrl: photos.items[2],
          rating: 'Encrypted',
          meta: 'Zero-Trust',
          actionLabel: 'Inspect',
        },
      ],
    },

    // =========================================================================
    // MODULE 4: CART, CHECKOUT & PAYMENTS (3 SCREENS)
    // =========================================================================
    {
      id: 'SmartCartCheckout',
      label: '13. Smart Cart & Bag Summary',
      category: 'ITEMIZED BAG • PROMO & TIP',
      moduleGroup: 'Cart & Payment',
      description: `${terms.checkoutTitle} — Interactive quantity controls, promo code redemption, and transparent tax/fee breakdown.`,
      v1Name: 'V1: Itemized Bag & Promo Sheet',
      v2Name: 'V2: Compact Bento Summary',
      v3Name: 'V3: Express 1-Tap Checkout HUD',
      screenType: 'checkout',
      heroBannerTitle: terms.checkoutTitle,
      heroBannerSubtitle: terms.checkoutSub,
      heroBannerBadge: 'VIP SAVINGS APPLIED',
      heroBannerImage: photos.checkout,
      filterPills: ['⚡ Priority Express', '📅 Scheduled Slot', '🎁 Gift / Custom Note'],
      heroMetricLabel: 'TOTAL TO PAY (INCL. TAX)',
      heroMetricValue: terms.checkoutTotal,
      heroMetricDelta: 'Promo Code VIP50 Applied (-20%)',
      items: mapSampleItems('Edit Item'),
    },
    {
      id: 'PaymentMethodsWallet',
      label: '14. Payment Methods & Apple Pay',
      category: 'PCI-DSS LEVEL 1 • 1-TAP PAY',
      moduleGroup: 'Cart & Payment',
      description: `Manage Apple Pay, Google Pay, saved Titanium credit cards, loyalty credits, and billing addresses.`,
      v1Name: 'V1: Visual Card Vault & Apple Pay',
      v2Name: 'V2: 2-Column Payment Matrix',
      v3Name: 'V3: Dark Titanium Wallet HUD',
      screenType: 'payment',
      heroBannerTitle: 'Apple Pay & Titanium Card Vault',
      heroBannerSubtitle: '256-Bit Tokenized Checkout • Biometric FaceID Confirmation',
      heroBannerBadge: 'APPLE PAY DEFAULT',
      heroBannerImage: photos.payment,
      filterPills: [' Apple Pay', '💳 Visa •••• 4242', '🪙 Member Credit', '🏦 Instant Bank'],
      heroMetricLabel: 'AUTHORIZED AMOUNT',
      heroMetricValue: terms.checkoutTotal,
      heroMetricDelta: 'Zero Foreign Transaction Fee',
      items: [
        {
          title: 'Apple Pay • iPhone 16 Pro Enclave',
          subtitle: 'Instant FaceID Double-Click Authorization • Tokenized',
          badge: 'DEFAULT',
          value: '1-Tap Pay',
          imageUrl: photos.items[0],
          rating: 'Instant',
          meta: 'Zero Fee',
          actionLabel: 'Use Apple Pay',
        },
        {
          title: 'Chase Sapphire Reserve •••• 4242',
          subtitle: 'Expires 09/28 • 3x Points on All Purchases',
          badge: 'VERIFIED VISA',
          value: 'Primary Card',
          imageUrl: photos.items[1],
          rating: '3x Points',
          meta: 'Auto-Billing',
          actionLabel: 'Select Card',
        },
        {
          title: `${cleanName} Rewards Balance ($25.00)`,
          subtitle: 'Apply available loyalty credit directly toward this order',
          badge: 'CREDIT READY',
          value: '-$25.00',
          imageUrl: photos.items[2],
          rating: 'Available',
          meta: 'Instant Apply',
          actionLabel: 'Apply Credit',
        },
      ],
    },
    {
      id: 'OrderConfirmationReceipt',
      label: '15. Order Confirmation & Receipt',
      category: 'CONFIRMED #AF-8924 • DIGITAL RECEIPT',
      moduleGroup: 'Cart & Payment',
      description: `Verified transaction confirmation screen with QR pass/receipt, itemized invoice, and direct jump to live tracking.`,
      v1Name: 'V1: Verified Receipt & QR Pass',
      v2Name: 'V2: Bento Confirmation Summary',
      v3Name: 'V3: Glass Digital Invoice',
      screenType: 'payment',
      heroBannerTitle: 'Confirmed! Reference #AF-8924',
      heroBannerSubtitle: 'Digital receipt sent to your email • Live tracking is now active',
      heroBannerBadge: 'PAYMENT VERIFIED ✓',
      heroBannerImage: photos.receipt,
      filterPills: ['📍 Track Live Now', '📄 Download PDF', '📅 Add to Calendar'],
      heroMetricLabel: 'AMOUNT PAID',
      heroMetricValue: terms.checkoutTotal,
      heroMetricDelta: 'Auth Code #994812 • Visa 4242',
      items: mapSampleItems('Track Item'),
    },

    // =========================================================================
    // MODULE 5: LIVE TRACKING, ANALYTICS & SUPPORT (3 SCREENS)
    // =========================================================================
    {
      id: 'LiveRadarTelemetryTracker',
      label: '16. Live GPS / Telemetry Tracker',
      category: 'REAL-TIME RADAR • STAGE 3 OF 4',
      moduleGroup: 'Tracking & Support',
      description: `${terms.trackerTitle} — ${terms.trackerSub}. Interactive 4-stage milestone stepper and live telemetry HUD.`,
      v1Name: 'V1: Live Radar Map & Stepper',
      v2Name: 'V2: Circular Telemetry Gauge',
      v3Name: 'V3: Cyberpunk Live Stream HUD',
      screenType: 'tracker',
      heroBannerTitle: terms.trackerTitle,
      heroBannerSubtitle: terms.trackerSub,
      heroBannerBadge: `LIVE • ${terms.trackerMetric}`,
      heroBannerImage: photos.tracker,
      filterPills: terms.trackerSteps,
      heroMetricLabel: 'LIVE TELEMETRY STATUS',
      heroMetricValue: terms.trackerMetric,
      heroMetricDelta: 'Stage 3 of 4 • Real-Time Sync',
      items: mapSampleItems('Live Details'),
    },
    {
      id: 'ActivityHistoryAnalytics',
      label: '17. Activity History & Analytics',
      category: 'WEEKLY TRENDS • PAST RECORDS',
      moduleGroup: 'Tracking & Support',
      description: `Interactive performance charts, monthly spend/usage breakdown, past order/session archive, and 1-tap repeat actions.`,
      v1Name: 'V1: Interactive Trend Chart & Log',
      v2Name: 'V2: 2-Column KPI Bento Matrix',
      v3Name: 'V3: Glass Executive Analytics',
      screenType: 'analytics',
      heroBannerTitle: '30-Day Performance & Activity Insights',
      heroBannerSubtitle: '+24.8% activity growth vs. prior month • 18 completed sessions/orders',
      heroBannerBadge: 'ANALYTICS PRO',
      heroBannerImage: photos.analytics,
      filterPills: ['📊 7 Days', '📈 30 Days', '🗓 12 Months', '📥 Export CSV'],
      heroMetricLabel: '30-DAY ACTIVITY SCORE',
      heroMetricValue: '94.8 / 100',
      heroMetricDelta: 'Top 5% Power User Tier',
      items: mapSampleItems('Repeat / View'),
    },
    {
      id: 'ConciergeLiveSupport',
      label: '18. 24/7 Concierge & Help Chat',
      category: 'AVG RESPONSE 45S • LIVE AGENT',
      moduleGroup: 'Tracking & Support',
      description: `In-app priority support desk with live agent messaging, quick-action resolution chips, and instant refund/reschedule tools.`,
      v1Name: 'V1: Live Concierge Chat Thread',
      v2Name: 'V2: Self-Service Action Grid',
      v3Name: 'V3: Glass Priority Support Desk',
      screenType: 'support',
      heroBannerTitle: '24/7 Priority VIP Concierge',
      heroBannerSubtitle: 'Senior Specialist Maya L. is online • Average response time 42 seconds',
      heroBannerBadge: 'AGENT ONLINE ●',
      heroBannerImage: photos.support,
      filterPills: ['💬 Live Chat', '🔄 Modify / Refund', '📞 Voice Call', '❓ FAQ Help'],
      heroMetricLabel: 'CONCIERGE SLA',
      heroMetricValue: '< 45 Secs',
      heroMetricDelta: '99.8% First-Contact Resolution',
      items: [
        {
          title: 'Maya Lin • Senior VIP Concierge',
          subtitle: '“Hi Alex! I’m monitoring your active session #AF-8924. Let me know if you need any adjustments!”',
          badge: 'ONLINE NOW',
          value: 'Reply',
          imageUrl: photos.support,
          rating: '5.0 ★ Agent',
          meta: ' Priority Desk',
          actionLabel: 'Send Message',
        },
        {
          title: 'Instant Self-Service: Modify or Reschedule',
          subtitle: 'Update delivery instructions, time slot, or item specifications with zero fees',
          badge: 'INSTANT TOOL',
          value: '0 Fee',
          imageUrl: photos.items[0],
          rating: 'Automated',
          meta: '1-Tap Action',
          actionLabel: 'Modify Now',
        },
      ],
    },

    // =========================================================================
    // MODULE 6: PROFILE, VIP LOYALTY & SETTINGS (2 SCREENS)
    // =========================================================================
    {
      id: 'VipMemberProfile',
      label: '19. Profile • VIP Loyalty & Perks',
      category: 'VIP PLATINUM TIER • REWARDS VAULT',
      moduleGroup: 'Profile & Settings',
      description: `${terms.profileTier} — ${terms.profilePerks}. Manage member benefits, referrals, and saved history.`,
      v1Name: 'V1: VIP Pass & Loyalty Ledger',
      v2Name: 'V2: Centered Avatar & Bento Stats',
      v3Name: 'V3: Titanium Member Vault',
      screenType: 'profile',
      heroBannerTitle: terms.profileTier,
      heroBannerSubtitle: terms.profilePerks,
      heroBannerBadge: 'VIP ELITE MEMBER',
      heroBannerImage: photos.profile,
      filterPills: ['👑 VIP Perks', '🔄 Past Activity', '🎁 Refer & Earn $25', '🏆 Badges'],
      heroMetricLabel: 'LOYALTY POINTS BALANCE',
      heroMetricValue: '6,420 pts',
      heroMetricDelta: '$50 Reward Voucher Unlocked',
      items: mapSampleItems('Manage'),
    },
    {
      id: 'SystemSettingsSecurity',
      label: '20. App Settings & Security Vault',
      category: 'BIOMETRICS • PRIVACY & DEVICES',
      moduleGroup: 'Profile & Settings',
      description: `Configure push notifications, FaceID biometric lock, dark mode appearance, connected hardware devices, and privacy exports.`,
      v1Name: 'V1: Grouped Settings & Toggles',
      v2Name: 'V2: 2-Column Control Center',
      v3Name: 'V3: Cyber Security & Privacy Deck',
      screenType: 'profile',
      heroBannerTitle: 'Security, Privacy & Device Preferences',
      heroBannerSubtitle: 'FaceID Enclave Active • End-to-End Cloud Backup Synced 2m ago',
      heroBannerBadge: 'ZERO-TRUST SECURE',
      heroBannerImage: photos.settings,
      filterPills: ['🔒 FaceID & Passkeys', '🔔 Push Channels', '🌙 Appearance', '📱 Devices'],
      heroMetricLabel: 'SECURITY HEALTH SCORE',
      heroMetricValue: '100% Fortified',
      heroMetricDelta: '2FA + Biometric Lock Enabled',
      items: [
        {
          title: 'Biometric FaceID & Passkey Lock',
          subtitle: 'Require hardware biometric authentication before checkout or account edits',
          badge: 'ENABLED',
          value: 'Strict Mode',
          imageUrl: photos.settings,
          rating: 'Hardware Key',
          meta: 'iOS / Android',
          actionLabel: 'Configure',
        },
        {
          title: 'Connected Devices & Active Sessions (3)',
          subtitle: 'iPhone 16 Pro (Current) • Apple Watch Ultra 2 • MacBook Pro M3',
          badge: 'SYNCED',
          value: '3 Active',
          imageUrl: photos.items[2],
          rating: 'Live Sync',
          meta: 'Cloud Encrypted',
          actionLabel: 'Manage Devices',
        },
      ],
    },
  ];

  // If AI-analyzed custom flow modules with screen blueprints were provided, synthesize screens directly from them
  if (Array.isArray(aiArchitectureModules) && aiArchitectureModules.length > 0) {
    const activeAiMods =
      Array.isArray(selectedModuleIds) && selectedModuleIds.length > 0
        ? aiArchitectureModules.filter(
            (m: any) =>
              selectedModuleIds.includes(m.id) || selectedModuleIds.includes(m.name)
          )
        : aiArchitectureModules;

    const modsToUse = activeAiMods.length > 0 ? activeAiMods : aiArchitectureModules;
    const aiScreensFlat: CustomProjectScreenSpec[] = [];

    modsToUse.forEach((mod: any) => {
      const modScreens = Array.isArray(mod.screens) ? mod.screens : [];
      modScreens.forEach((s: any, sIdx: number) => {
        const globalIdx = aiScreensFlat.length;
        const template = rawScreens[globalIdx % rawScreens.length];
        const cleanLabel = String(s.label || `Screen ${globalIdx + 1}`).replace(
          /^\d+\.\s*/,
          ''
        );
        aiScreensFlat.push({
          ...template,
          id:
            String(s.id || cleanLabel.replace(/[^a-zA-Z0-9]/g, '')) +
            `_${globalIdx + 1}`,
          label: `${String(globalIdx + 1).padStart(2, '0')}. ${cleanLabel}`,
          category: `${String(mod.name || category).toUpperCase()}`,
          moduleGroup: String(mod.name || mod.id || category),
          description:
            s.description ||
            `${cleanLabel} workflow screen for ${cleanName} (${category}).`,
          v1Name: `V1: ${cleanLabel} Primary View`,
          v2Name: `V2: ${cleanLabel} Bento Grid`,
          v3Name: `V3: ${cleanLabel} Glass HUD`,
          screenType: (s.screenType as any) || template.screenType || 'discover',
          heroBannerTitle: `${cleanName} • ${cleanLabel}`,
          heroBannerSubtitle:
            s.description || projectDetails || terms.heroSub,
          heroBannerBadge: String(category).toUpperCase(),
          referenceImageUri:
            designImages.length > 0
              ? designImages[globalIdx % designImages.length]
              : undefined,
        });
      });
    });

    if (aiScreensFlat.length > 0) {
      return {
        tagline: projectDetails || `${cleanName} • ${profile.taglineSuffix}`,
        primaryColor: profile.primaryColor,
        analysis,
        screens: aiScreensFlat,
      };
    }
  }

  // Apply domain-specific screen titles if defined, then filter by user-selected module flows
  const titledScreens = rawScreens.map((scr, idx) => ({
    ...scr,
    label: profile.screenTitles?.[idx] || scr.label,
    referenceImageUri:
      designImages.length > 0 ? designImages[idx % designImages.length] : undefined,
  }));

  const filteredByModules =
    Array.isArray(selectedModuleIds) && selectedModuleIds.length > 0
      ? titledScreens.filter((scr) => selectedModuleIds.includes(scr.moduleGroup || ''))
      : titledScreens;

  const finalScreens = (filteredByModules.length > 0 ? filteredByModules : titledScreens).map(
    (scr, idx) => ({
      ...scr,
      label: `${String(idx + 1).padStart(2, '0')}. ${scr.label.replace(/^\d+\.\s*/, '')}`,
    })
  );

  return {
    tagline: projectDetails || `${cleanName} • ${profile.taglineSuffix}`,
    primaryColor: profile.primaryColor,
    analysis,
    screens: finalScreens,
  };
}
