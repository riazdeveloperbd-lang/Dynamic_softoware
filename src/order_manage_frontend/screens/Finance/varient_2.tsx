import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function FinanceVarient2({ onOpenMakePayment, onOpenSettleModal }: any) {
  const { totals, payments, customerLedger } = useLedger();
  const { colors } = useAppTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={styles.content}>
      <View style={[styles.v2Card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Compact Financial Matrix</Text>
        <View style={styles.grid}>
          <View style={styles.item}>
            <Text style={styles.label}>Treasury PnL</Text>
            <Text style={[styles.val, { color: colors.primary }]}>৳{totals.profitLoss.toLocaleString()}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Total Outflow</Text>
            <Text style={[styles.val, { color: colors.crimson }]}>৳{totals.totalPaid.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={onOpenMakePayment}>
        <Ionicons name="card" size={16} color="#ffffff" />
        <Text style={styles.btnText}>Disburse Payment Outflow</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 14, gap: 12 },
  v2Card: { padding: 14, borderRadius: 16, borderWidth: 1, gap: 10 },
  title: { fontSize: 13, fontWeight: '800' },
  grid: { flexDirection: 'row', gap: 10 },
  item: { flex: 1 },
  label: { fontSize: 10, color: '#9ca3af' },
  val: { fontSize: 14, fontWeight: '800', marginTop: 2 },
  btn: { height: 42, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnText: { color: '#ffffff', fontSize: 12, fontWeight: '800' },
});
