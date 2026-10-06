import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function MoreVarient2({
  onOpenCalculator,
  onOpenExport,
  onOpenActivity,
  onOpenProfile,
  onOpenReset,
}: any) {
  const { user } = useLedger();
  const { colors } = useAppTheme();

  const menuTiles = [
    { title: 'Profile & PIN', icon: 'person-circle-outline' as const, color: colors.primary, action: onOpenProfile },
    { title: 'FX Calculator', icon: 'calculator-outline' as const, color: colors.emerald, action: onOpenCalculator },
    { title: 'Export Reports', icon: 'download-outline' as const, color: colors.amber, action: onOpenExport },
    { title: 'Live Audit Log', icon: 'notifications-outline' as const, color: colors.primaryLight, action: onOpenActivity },
    { title: 'Reset Ledger', icon: 'refresh-outline' as const, color: colors.crimson, action: onOpenReset },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={styles.content}>
      <View style={[styles.header, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
        <Text style={[styles.sub, { color: colors.textSecondary }]}>Management Hub Grid V2</Text>
      </View>

      <View style={styles.grid}>
        {menuTiles.map((tile, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.tile, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={tile.action}
            activeOpacity={0.8}
          >
            <View style={[styles.iconBox, { backgroundColor: `${tile.color}20` }]}>
              <Ionicons name={tile.icon} size={22} color={tile.color} />
            </View>
            <Text style={[styles.tileTitle, { color: colors.text }]}>{tile.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 14, gap: 14 },
  header: { padding: 16, borderRadius: 18, borderWidth: 1, gap: 2 },
  name: { fontSize: 16, fontWeight: '900' },
  sub: { fontSize: 11, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tile: { width: '48%', padding: 16, borderRadius: 18, borderWidth: 1, alignItems: 'center', gap: 10 },
  iconBox: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  tileTitle: { fontSize: 12, fontWeight: '800', textAlign: 'center' },
});
