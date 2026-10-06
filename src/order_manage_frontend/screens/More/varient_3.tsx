import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function MoreVarient3({
  onOpenCalculator,
  onOpenExport,
  onOpenActivity,
  onOpenProfile,
  onOpenReset,
}: any) {
  const { user } = useLedger();
  const { colors, mode, setMode } = useAppTheme();

  const items = [
    { label: 'Edit Profile & Passcode', icon: 'person-outline' as const, action: onOpenProfile },
    { label: 'FX Calculator Studio', icon: 'calculator-outline' as const, action: onOpenCalculator },
    { label: 'Export PDF / Excel Reports', icon: 'document-text-outline' as const, action: onOpenExport },
    { label: 'Real-Time Audit Log', icon: 'time-outline' as const, action: onOpenActivity },
    { label: 'Reset All Data', icon: 'trash-outline' as const, action: onOpenReset, color: colors.crimson },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={styles.content}>
      <View
        style={[
          styles.glassHeader,
          {
            backgroundColor: `${colors.primary}15`,
            borderColor: `${colors.primary}30`,
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>Luxe Settings Hub</Text>
        <Text style={[styles.sub, { color: colors.primary }]}>@{user.username} • Administrator</Text>
      </View>

      {/* Theme Switcher Row */}
      <View style={[styles.themeRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.themeLabel, { color: colors.text }]}>Theme Mode</Text>
        <View style={styles.themeBtns}>
          {(['light', 'dark'] as const).map((m) => (
            <TouchableOpacity
              key={m}
              style={[
                styles.themeBtn,
                { backgroundColor: mode === m ? colors.primary : colors.cardElevated },
              ]}
              onPress={() => setMode(m)}
            >
              <Text
                style={[
                  styles.themeBtnText,
                  { color: mode === m ? '#ffffff' : colors.textSecondary },
                ]}
              >
                {m.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.list}>
        {items.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={item.action}
            activeOpacity={0.8}
          >
            <Ionicons name={item.icon} size={20} color={item.color || colors.primary} />
            <Text style={[styles.rowText, { color: item.color || colors.text }]}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 14, gap: 12 },
  glassHeader: { padding: 18, borderRadius: 20, borderWidth: 1, gap: 2 },
  title: { fontSize: 18, fontWeight: '900' },
  sub: { fontSize: 11, fontWeight: '700' },
  themeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 16, borderWidth: 1 },
  themeLabel: { fontSize: 13, fontWeight: '800' },
  themeBtns: { flexDirection: 'row', gap: 6 },
  themeBtn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  themeBtnText: { fontSize: 10, fontWeight: '800' },
  list: { gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 16, borderWidth: 1, gap: 12 },
  rowText: { flex: 1, fontSize: 13, fontWeight: '800' },
});
