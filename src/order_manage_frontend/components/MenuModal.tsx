import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

interface MenuModalProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export function MenuModal({ visible, onClose, onNavigate }: MenuModalProps) {
  const { logout } = useLedger();
  const { colors, isDark } = useAppTheme();

  const handleNav = (screen: string) => {
    onClose();
    setTimeout(() => {
      onNavigate(screen);
    }, 150);
  };

  const menuItems = [
    { title: 'Dashboard', icon: 'home-outline' as const, screen: 'dashboard' },
    { title: 'Order History', icon: 'document-text-outline' as const, screen: 'orders' },
    { title: 'Delivery History', icon: 'checkmark-circle-outline' as const, screen: 'deliveries' },
    { title: 'New Orders Queue', icon: 'time-outline' as const, screen: 'queue' },
    { title: 'Customer Riyal Ledger', icon: 'cash-outline' as const, screen: 'riyal' },
    { title: 'Payment History', icon: 'wallet-outline' as const, screen: 'payments' },
    { title: 'Due Ledger (Payables)', icon: 'alert-circle-outline' as const, screen: 'due' },
    { title: 'Customer Directory', icon: 'people-outline' as const, screen: 'customers' },
    { title: 'Full Timeline History', icon: 'layers-outline' as const, screen: 'history' },
    { title: 'Activity Audit Log', icon: 'notifications-outline' as const, screen: 'activity' },
    { title: 'Riyal → Taka Calculator', icon: 'calculator-outline' as const, screen: 'calculator' },
    { title: 'Profit & Loss Statement', icon: 'trending-up-outline' as const, screen: 'profit-loss' },
    { title: 'Export Reports (PDF / Excel)', icon: 'download-outline' as const, screen: 'export' },
    { title: 'Profile & PIN Settings', icon: 'settings-outline' as const, screen: 'profile' },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.sheet, { backgroundColor: colors.cardElevated }]}>
          <View
            style={[
              styles.handle,
              { backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' },
            ]}
          />

          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.title, { color: colors.text }]}>TR Connect Menu</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollList} contentContainerStyle={styles.scrollContent}>
            {menuItems.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.menuRow, { borderBottomColor: colors.border }]}
                onPress={() => handleNav(item.screen)}
                activeOpacity={0.7}>
                <View style={[styles.iconWrap, { backgroundColor: colors.primaryGlow }]}>
                  <Ionicons name={item.icon} size={20} color={colors.primary} />
                </View>
                <Text style={[styles.menuTitle, { color: colors.text }]}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[
                styles.menuRow,
                styles.dangerRow,
                { borderBottomColor: colors.crimsonGlow },
              ]}
              onPress={() => handleNav('reset')}
              activeOpacity={0.7}>
              <View style={[styles.iconWrap, { backgroundColor: colors.crimsonGlow }]}>
                <Ionicons name="warning-outline" size={20} color={colors.crimson} />
              </View>
              <Text style={[styles.menuTitle, { color: colors.crimson }]}>Reset All Data</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.crimson} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuRow, styles.logoutRow]}
              onPress={() => {
                onClose();
                logout();
              }}
              activeOpacity={0.7}>
              <View
                style={[
                  styles.iconWrap,
                  {
                    backgroundColor: isDark
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(0,0,0,0.04)',
                  },
                ]}>
                <Ionicons name="log-out-outline" size={20} color={colors.textSecondary} />
              </View>
              <Text style={[styles.menuTitle, { color: colors.textSecondary }]}>Log Out</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    maxHeight: '90%',
    paddingBottom: Spacing.xl,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  closeBtn: {
    padding: 4,
  },
  scrollList: {
    maxHeight: 520,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    gap: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '600',
  },
  dangerRow: {
    borderBottomWidth: 1,
  },
  logoutRow: {
    marginTop: 8,
    borderBottomWidth: 0,
  },
});
