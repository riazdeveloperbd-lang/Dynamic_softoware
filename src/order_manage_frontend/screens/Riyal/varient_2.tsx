import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function RiyalVarient2({ onBack, onOpenSettleModal }: any) {
  const { customerLedger, totals } = useLedger();
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.topRow}>
          {onBack && (
            <TouchableOpacity onPress={onBack}>
              <Ionicons name="arrow-back" size={20} color={colors.text} />
            </TouchableOpacity>
          )}
          <Text style={[styles.title, { color: colors.text }]}>SAR Riyal Matrix V2</Text>
          <View style={[styles.badge, { backgroundColor: `${colors.amber}20` }]}>
            <Text style={[styles.badgeText, { color: colors.amber }]}>
              {totals.riyalReceived} SAR Collected
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {customerLedger.map((entry: any) => {
          const due = Math.max(0, entry.expected - entry.received);
          return (
            <View
              key={entry.id}
              style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.custName, { color: colors.text }]}>{entry.customerName}</Text>
                <TouchableOpacity
                  style={[styles.settleBtn, { backgroundColor: colors.amber }]}
                  onPress={() => onOpenSettleModal && onOpenSettleModal(entry)}
                >
                  <Text style={styles.settleBtnText}>Settle SAR</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <Text style={[styles.meta, { color: colors.textSecondary }]}>
                  Expected: {entry.expected} SAR
                </Text>
                <Text style={[styles.meta, { color: colors.emerald }]}>
                  Received: {entry.received} SAR
                </Text>
                {due > 0 && (
                  <Text style={[styles.meta, { color: colors.crimson, fontWeight: '800' }]}>
                    Due: {due} SAR
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 14, borderBottomWidth: 1 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  title: { fontSize: 15, fontWeight: '800' },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeText: { fontSize: 10, fontWeight: '700' },
  content: { padding: 14, gap: 10 },
  card: { padding: 12, borderRadius: 14, borderWidth: 1, gap: 8 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  custName: { fontSize: 13, fontWeight: '800' },
  settleBtn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  settleBtnText: { color: '#ffffff', fontSize: 11, fontWeight: '800' },
  row: { flexDirection: 'row', gap: 10 },
  meta: { fontSize: 11 },
});
