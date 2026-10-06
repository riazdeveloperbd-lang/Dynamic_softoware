import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { AppTab } from './BottomNav';

export type BottomNavVariantId = 'varient_1' | 'varient_2' | 'varient_3' | 'varient_4' | 'varient_5';

export const ORDER_MANAGE_BOTTOM_NAV_VARIANTS: {
  id: BottomNavVariantId;
  name: string;
  tagline: string;
}[] = [
  {
    id: 'varient_1',
    name: 'V1 • Executive Classic Bar',
    tagline: 'Clean Icon + Label Bar with Theme Glow',
  },
  {
    id: 'varient_2',
    name: 'V2 • Floating Capsule Dock',
    tagline: 'Elevated Island Dock with Active Pill',
  },
  {
    id: 'varient_3',
    name: 'V3 • Expanding Smart Badge',
    tagline: 'Horizontal Expanding Label Pill for Active Tab',
  },
  {
    id: 'varient_4',
    name: 'V4 • Center Quick Order FAB Notch',
    tagline: 'Curved Dock with Prominent Elevated Center Action',
  },
  {
    id: 'varient_5',
    name: 'V5 • Top Neon Accent Line',
    tagline: 'Minimalist Luxe Bar with Top Active Accent Line',
  },
];

interface OrderManageBottomNavVariantsProps {
  variantId?: BottomNavVariantId;
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onOpenNewOrder: () => void;
}

export function OrderManageBottomNavVariants({
  variantId = 'varient_1',
  currentTab,
  onSelectTab,
  onOpenNewOrder,
}: OrderManageBottomNavVariantsProps) {
  const { totals } = useLedger();
  const { colors, isDark } = useAppTheme();

  const navItems: {
    tab: AppTab;
    label: string;
    icon: string;
    activeIcon: string;
    badge?: number;
  }[] = [
    { tab: 'dashboard', label: 'Home', icon: 'grid-outline', activeIcon: 'grid' },
    { tab: 'orders', label: 'Orders', icon: 'cube-outline', activeIcon: 'cube', badge: totals.newOrdersCount },
    { tab: 'finance', label: 'Finance', icon: 'wallet-outline', activeIcon: 'wallet' },
    { tab: 'customers', label: 'Clients', icon: 'people-outline', activeIcon: 'people' },
    { tab: 'more', label: 'More', icon: 'apps-outline', activeIcon: 'apps' },
  ];

  // VARIANT 2: Floating Capsule Dock
  if (variantId === 'varient_2') {
    return (
      <View style={styles.v2Wrapper}>
        <View style={[styles.v2Container, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}>
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <TouchableOpacity
                key={item.tab}
                style={[
                  styles.v2NavItem,
                  isActive && { backgroundColor: `${colors.primary}20` },
                ]}
                onPress={() => onSelectTab(item.tab)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={(isActive ? item.activeIcon : item.icon) as any}
                  size={20}
                  color={isActive ? colors.primary : colors.textSecondary}
                />
                {isActive && (
                  <Text style={[styles.v2NavLabel, { color: colors.primary }]}>
                    {item.label}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  // VARIANT 3: Expanding Smart Badge
  if (variantId === 'varient_3') {
    return (
      <View style={[styles.v3Container, { backgroundColor: colors.bg, borderTopColor: colors.border }]}>
        {navItems.map((item) => {
          const isActive = currentTab === item.tab;
          return (
            <TouchableOpacity
              key={item.tab}
              style={[
                styles.v3NavItem,
                isActive && { backgroundColor: colors.primary, paddingHorizontal: 12 },
              ]}
              onPress={() => onSelectTab(item.tab)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={(isActive ? item.activeIcon : item.icon) as any}
                size={20}
                color={isActive ? '#ffffff' : colors.textSecondary}
              />
              {isActive && (
                <Text style={styles.v3NavLabel}>{item.label}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  // VARIANT 4: Center Quick Order FAB Notch
  if (variantId === 'varient_4') {
    return (
      <View style={[styles.v4Container, { backgroundColor: colors.bg, borderTopColor: colors.border }]}>
        {navItems.slice(0, 2).map((item) => {
          const isActive = currentTab === item.tab;
          return (
            <TouchableOpacity
              key={item.tab}
              style={styles.v1NavItem}
              onPress={() => onSelectTab(item.tab)}
            >
              <Ionicons
                name={(isActive ? item.activeIcon : item.icon) as any}
                size={21}
                color={isActive ? colors.primary : colors.textSecondary}
              />
              <Text style={[styles.v1NavLabel, { color: isActive ? colors.primary : colors.textSecondary }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Floating Center Action Button */}
        <TouchableOpacity
          style={[styles.v4Fab, { backgroundColor: colors.primary }]}
          onPress={onOpenNewOrder}
          activeOpacity={0.9}
        >
          <Ionicons name="add" size={26} color="#ffffff" />
        </TouchableOpacity>

        {navItems.slice(2, 5).map((item) => {
          const isActive = currentTab === item.tab;
          return (
            <TouchableOpacity
              key={item.tab}
              style={styles.v1NavItem}
              onPress={() => onSelectTab(item.tab)}
            >
              <Ionicons
                name={(isActive ? item.activeIcon : item.icon) as any}
                size={21}
                color={isActive ? colors.primary : colors.textSecondary}
              />
              <Text style={[styles.v1NavLabel, { color: isActive ? colors.primary : colors.textSecondary }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  // VARIANT 5: Top Neon Accent Line
  if (variantId === 'varient_5') {
    return (
      <View style={[styles.v5Container, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        {navItems.map((item) => {
          const isActive = currentTab === item.tab;
          return (
            <TouchableOpacity
              key={item.tab}
              style={styles.v5NavItem}
              onPress={() => onSelectTab(item.tab)}
              activeOpacity={0.8}
            >
              {isActive && <View style={[styles.v5AccentLine, { backgroundColor: colors.primary }]} />}
              <Ionicons
                name={(isActive ? item.activeIcon : item.icon) as any}
                size={21}
                color={isActive ? colors.primary : colors.textSecondary}
              />
              <Text style={[styles.v1NavLabel, { color: isActive ? colors.primary : colors.textSecondary, fontWeight: isActive ? '700' : '500' }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  // DEFAULT VARIANT 1: Executive Classic Bar
  return (
    <View style={[styles.v1Container, { backgroundColor: colors.bg, borderTopColor: colors.border }]}>
      {navItems.map((item) => {
        const isActive = currentTab === item.tab;
        return (
          <TouchableOpacity
            key={item.tab}
            style={styles.v1NavItem}
            onPress={() => onSelectTab(item.tab)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={(isActive ? item.activeIcon : item.icon) as any}
              size={21}
              color={isActive ? colors.primary : colors.textSecondary}
            />
            <Text style={[styles.v1NavLabel, { color: isActive ? colors.primary : colors.textSecondary, fontWeight: isActive ? '700' : '500' }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  v1Container: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  v1NavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  v1NavLabel: {
    fontSize: 10,
    marginTop: 3,
  },
  v2Wrapper: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  v2Container: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
  },
  v2NavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  v2NavLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  v3Container: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
  },
  v3NavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
  },
  v3NavLabel: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  v4Container: {
    flexDirection: 'row',
    height: 64,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  v4Fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    top: -14,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  v5Container: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  v5NavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    position: 'relative',
  },
  v5AccentLine: {
    position: 'absolute',
    top: -1,
    width: 28,
    height: 3,
    borderRadius: 2,
  },
});
