import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

interface HeaderProps {
  onOpenProfile: () => void;
  onOpenActivity: () => void;
  onOpenNewOrder: () => void;
}

export function Header({ onOpenProfile, onOpenActivity, onOpenNewOrder }: HeaderProps) {
  const { user, activity } = useLedger();
  const { colors, isDark, toggleTheme } = useAppTheme();
  const unreadCount = activity.length;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.bg, borderBottomColor: colors.border },
      ]}>
      <View style={styles.left}>
        <View style={[styles.seal, { backgroundColor: colors.primary }]}>
          <Text style={styles.sealText}>TR</Text>
        </View>
        <View>
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: colors.text }]}>TR Connect</Text>
            <View style={[styles.liveDot, { backgroundColor: colors.emerald }]} />
          </View>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {user.name || user.username}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        {/* Quick Theme Toggle Button */}
        <TouchableOpacity
          style={[
            styles.iconBtn,
            { backgroundColor: colors.cardElevated, borderColor: colors.border },
          ]}
          onPress={toggleTheme}
          activeOpacity={0.7}
          accessibilityLabel={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}>
          <Ionicons
            name={isDark ? 'sunny-outline' : 'moon-outline'}
            size={18}
            color={isDark ? colors.amber : colors.primary}
          />
        </TouchableOpacity>

        {/* New Order Quick Button */}
        <TouchableOpacity
          style={[styles.newBtn, { backgroundColor: colors.primary }]}
          onPress={onOpenNewOrder}
          activeOpacity={0.8}>
          <Ionicons name="add" size={17} color="#fff" />
          <Text style={styles.newBtnText}>Order</Text>
        </TouchableOpacity>

        {/* Notifications Bell */}
        <TouchableOpacity
          style={[
            styles.iconBtn,
            { backgroundColor: colors.cardElevated, borderColor: colors.border },
          ]}
          onPress={onOpenActivity}
          activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={19} color={colors.text} />
          {unreadCount > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.crimson, borderColor: colors.bg }]}>
              <Text style={styles.badgeText}>{unreadCount > 99 ? '99+' : unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Profile Avatar */}
        <TouchableOpacity
          style={[
            styles.avatarBtn,
            { backgroundColor: colors.cardElevated, borderColor: colors.borderLight },
          ]}
          onPress={onOpenProfile}
          activeOpacity={0.7}>
          <Text style={[styles.avatarText, { color: colors.primaryLight }]}>
            {(user.name || 'T').charAt(0).toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  seal: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  sealText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  subtitle: {
    fontSize: 11.5,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  newBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: Radius.full,
  },
  newBtnText: {
    color: '#fff',
    fontSize: 12.5,
    fontWeight: '700',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '800',
  },
  avatarBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '800',
  },
});
