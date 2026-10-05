import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

interface MoreTabProps {
  onOpenCalculator: () => void;
  onOpenExport: () => void;
  onOpenActivity: () => void;
  onOpenProfile: () => void;
  onOpenReset: () => void;
}

export function MoreTab({
  onOpenCalculator,
  onOpenExport,
  onOpenActivity,
  onOpenProfile,
  onOpenReset,
}: MoreTabProps) {
  const { user, totals, logout } = useLedger();
  const { colors, mode, setMode } = useAppTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.content}>
      {/* Profile Card */}
      <View
        style={[
          styles.profileCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>{(user.name || 'T').charAt(0).toUpperCase()}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.profileName, { color: colors.text }]}>{user.name}</Text>
          <Text style={[styles.profileSub, { color: colors.textSecondary }]}>
            @{user.username} • Administrator
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.editBtn, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}
          onPress={onOpenProfile}>
          <Text style={[styles.editBtnText, { color: colors.primary }]}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Theme Appearance Selector */}
      <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>Appearance Theme</Text>
      <View
        style={[
          styles.themeSelectorGroup,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}>
        {(
          [
            { id: 'light', label: 'Light', icon: 'sunny-outline' },
            { id: 'dark', label: 'Dark', icon: 'moon-outline' },
            { id: 'system', label: 'Auto', icon: 'phone-portrait-outline' },
          ] as const
        ).map((item) => {
          const isSelected = mode === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.themeBtn,
                isSelected && { backgroundColor: colors.primary },
              ]}
              onPress={() => setMode(item.id)}
              activeOpacity={0.75}>
              <Ionicons
                name={item.icon}
                size={16}
                color={isSelected ? '#fff' : colors.textSecondary}
              />
              <Text
                style={[
                  styles.themeBtnText,
                  { color: isSelected ? '#fff' : colors.textSecondary },
                ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Business Utilities Section */}
      <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>Business Utilities</Text>

      <View
        style={[
          styles.menuGroup,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}>
        <TouchableOpacity
          style={[styles.menuItem, { borderBottomColor: colors.border }]}
          onPress={onOpenCalculator}
          activeOpacity={0.7}>
          <View style={[styles.iconBox, { backgroundColor: colors.primaryGlow }]}>
            <Ionicons name="calculator-outline" size={20} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.menuTitle, { color: colors.text }]}>
              Riyal → Taka Calculator
            </Text>
            <Text style={[styles.menuSub, { color: colors.textSecondary }]}>
              Live SAR to BDT rate converter (1 SAR = ৳{totals.exchangeRate})
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { borderBottomColor: colors.border }]}
          onPress={onOpenExport}
          activeOpacity={0.7}>
          <View style={[styles.iconBox, { backgroundColor: colors.emeraldGlow }]}>
            <Ionicons name="document-text-outline" size={20} color={colors.emerald} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.menuTitle, { color: colors.text }]}>
              Export Executive Reports
            </Text>
            <Text style={[styles.menuSub, { color: colors.textSecondary }]}>
              Generate PDF summary statement or copy CSV
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={onOpenActivity}
          activeOpacity={0.7}>
          <View style={[styles.iconBox, { backgroundColor: colors.cardElevated }]}>
            <Ionicons name="notifications-outline" size={20} color={colors.textSecondary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.menuTitle, { color: colors.text }]}>Activity Audit Log</Text>
            <Text style={[styles.menuSub, { color: colors.textSecondary }]}>
              Real-time system events and transaction logs
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Security Section */}
      <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>
        Security & Administration
      </Text>

      <View
        style={[
          styles.menuGroup,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}>
        <TouchableOpacity
          style={[styles.menuItem, { borderBottomColor: colors.border }]}
          onPress={onOpenProfile}
          activeOpacity={0.7}>
          <View style={[styles.iconBox, { backgroundColor: colors.primaryGlow }]}>
            <Ionicons name="key-outline" size={20} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.menuTitle, { color: colors.text }]}>
              Change 4-Digit Security PIN
            </Text>
            <Text style={[styles.menuSub, { color: colors.textSecondary }]}>
              Update your login and verification PIN
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={onOpenReset} activeOpacity={0.7}>
          <View style={[styles.iconBox, { backgroundColor: colors.crimsonGlow }]}>
            <Ionicons name="warning-outline" size={20} color={colors.crimson} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.menuTitle, { color: colors.crimson }]}>Reset All Data</Text>
            <Text style={[styles.menuSub, { color: colors.textSecondary }]}>
              Clear ledger data (requires email & PIN)
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.crimson} />
        </TouchableOpacity>
      </View>

      {/* Sign Out */}
      <TouchableOpacity
        style={[styles.logoutBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={logout}
        activeOpacity={0.8}>
        <Ionicons name="log-out-outline" size={18} color={colors.textSecondary} />
        <Text style={[styles.logoutText, { color: colors.textSecondary }]}>
          Sign Out from Session
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
    gap: 12,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
  },
  profileName: {
    fontSize: 15.5,
    fontWeight: '800',
  },
  profileSub: {
    fontSize: 12,
    marginTop: 2,
  },
  editBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 6,
  },
  themeSelectorGroup: {
    flexDirection: 'row',
    borderRadius: Radius.lg,
    padding: 4,
    borderWidth: 1,
    gap: 4,
  },
  themeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: Radius.md,
    gap: 6,
  },
  themeBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  menuGroup: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    gap: 12,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  menuSub: {
    fontSize: 11.5,
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginTop: 6,
  },
  logoutText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
});
