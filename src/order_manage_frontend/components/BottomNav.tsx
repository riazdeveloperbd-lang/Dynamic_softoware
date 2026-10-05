import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

export type AppTab = 'dashboard' | 'orders' | 'finance' | 'customers' | 'more';

interface BottomNavProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onOpenNewOrder: () => void;
}

export function BottomNav({ currentTab, onSelectTab }: BottomNavProps) {
  const { totals } = useLedger();
  const { colors, isDark } = useAppTheme();

  const navItems: {
    tab: AppTab;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    activeIcon: keyof typeof Ionicons.glyphMap;
    badge?: number;
  }[] = [
    {
      tab: 'dashboard',
      label: 'Home',
      icon: 'grid-outline',
      activeIcon: 'grid',
    },
    {
      tab: 'orders',
      label: 'Orders',
      icon: 'cube-outline',
      activeIcon: 'cube',
      badge: totals.newOrdersCount,
    },
    {
      tab: 'finance',
      label: 'Finance',
      icon: 'wallet-outline',
      activeIcon: 'wallet',
    },
    {
      tab: 'customers',
      label: 'Clients',
      icon: 'people-outline',
      activeIcon: 'people',
    },
    {
      tab: 'more',
      label: 'More',
      icon: 'apps-outline',
      activeIcon: 'apps',
    },
  ];

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: colors.bg,
          borderTopColor: colors.border,
        },
      ]}>
      <View style={styles.container}>
        {navItems.map((item) => {
          const isActive = currentTab === item.tab;
          return (
            <TouchableOpacity
              key={item.tab}
              style={styles.tabBtn}
              onPress={() => onSelectTab(item.tab)}
              activeOpacity={0.7}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={isActive ? item.activeIcon : item.icon}
                  size={21}
                  color={isActive ? colors.primary : colors.textMuted}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <View style={[styles.badge, { backgroundColor: colors.crimson }]}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  { color: isActive ? colors.primary : colors.textMuted },
                  isActive && styles.tabLabelActive,
                ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 18 : 8,
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 52,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  iconContainer: {
    position: 'relative',
    width: 28,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '800',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  tabLabelActive: {
    fontWeight: '800',
  },
});
