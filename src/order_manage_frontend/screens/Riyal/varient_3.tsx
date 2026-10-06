import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function RiyalVarient3({ onBack, onOpenSettleModal }: any) {
  const { customerLedger, totals } = useLedger();
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View
        style={[
          styles.glassHeader,
          {
            backgroundColor: `${colors.amber}15`,
            borderColor: `${colors.amber}30`,
          },
        ]}
      >
        <View style={styles.topRow}>
          {onBack && (
            <TouchableOpacity onPress={onBack}>
              <Ionicons name="arrow-back" size={20} color={colors.text} />
            </TouchableOpacity>
          )}
          <View>
            <Text style={[styles.title, { color: colors.text }]}>SAR Treasury Ledger</Text>
            <Text style={[styles.sub, { color: colors.amber }]}>
              {totals.riyalReceived} SAR Collected Total
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
              style={[styles.luxeCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={styles.cardTop}>
                <Text style={[styles.cust, { color: colors.text }]}>{entry.customerName}</Text>
                <Text style={[styles.dueText, { color: due > 0 ? colors.crimson : colors.emerald }]}>
                  {due > 0 ? `${due} SAR Due` : 'Settled ✓'}
                </Text>
              </View>

              <View style={styles.cardBottom}>
                <Text style={[styles.info, { color: colors.textSecondary }]}>
                  Exp: {entry.expected} SAR • Rec: {entry.received} SAR
                </Text>
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: colors.primary }]}
                  onPress={() => onOpenSettleModal && onOpenSettleModal(entry)}
                >
                  <Ionicons name="cash" size={14} color="#ffffff" />
                  <Text style={styles.actionText}>Settle</Text>
                </TouchableOpacity>
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
  glassHeader: { padding: 16, margin: 14, borderRadius: 18, borderWidth: 1 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { fontSize: 16, fontWeight: '900' },
  sub: { fontSize: 11, fontWeight: '700', marginTop: 1 },
  content: { paddingHorizontal: 14, paddingBottom: 24, gap: 10 },
  luxeCard: { padding: 14, borderRadius: 16, borderWidth: 1, gap: 8 },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cust: { fontSize: 14, fontWeight: '800' },
  dueText: { fontSize: 11, fontWeight: '800' },
  cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  info: { fontSize: 11.5 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, gap: 4 },
  actionText: { color: '#ffffff', fontSize: 11, fontWeight: '800' },
});
