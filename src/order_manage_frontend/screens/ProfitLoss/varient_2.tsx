import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function ProfitLossVarient2({ onBack }: any) {
  const { totals } = useLedger();
  const { colors } = useAppTheme();
  const isProfit = totals.profitLoss >= 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.topRow}>
          {onBack && (
            <TouchableOpacity onPress={onBack}>
              <Ionicons name="arrow-back" size={20} color={colors.text} />
            </TouchableOpacity>
          )}
          <Text style={[styles.title, { color: colors.text }]}>PnL Matrix V2</Text>
          <View
            style={[
              styles.badge,
              { backgroundColor: isProfit ? `${colors.emerald}20` : `${colors.crimson}20` },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                { color: isProfit ? colors.emerald : colors.crimson },
              ]}
            >
              {isProfit ? '+ Net Profit' : '- Net Loss'}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Net Margin Hero */}
        <View style={[styles.heroCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.heroLabel, { color: colors.textSecondary }]}>Net Operational Position</Text>
          <Text style={[styles.heroVal, { color: isProfit ? colors.emerald : colors.crimson }]}>
            ৳{Math.abs(totals.profitLoss).toLocaleString()}
          </Text>
        </View>

        {/* Financial Breakdown Tiles */}
        <View style={styles.grid}>
          <View style={[styles.tile, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.tileLabel, { color: colors.textSecondary }]}>Total Remittance Orders</Text>
            <Text style={[styles.tileVal, { color: colors.primary }]}>৳{totals.totalOrderAmt.toLocaleString()}</Text>
          </View>

          <View style={[styles.tile, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.tileLabel, { color: colors.textSecondary }]}>Delivered Fulfillment</Text>
            <Text style={[styles.tileVal, { color: colors.emerald }]}>৳{totals.totalDeliveryAmt.toLocaleString()}</Text>
          </View>

          <View style={[styles.tile, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.tileLabel, { color: colors.textSecondary }]}>Disbursed Outflows</Text>
            <Text style={[styles.tileVal, { color: colors.crimson }]}>৳{totals.totalPaid.toLocaleString()}</Text>
          </View>

          <View style={[styles.tile, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.tileLabel, { color: colors.textSecondary }]}>Payables Due</Text>
            <Text style={[styles.tileVal, { color: colors.amber }]}>৳{totals.totalDue.toLocaleString()}</Text>
          </View>
        </View>
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
  badgeText: { fontSize: 11, fontWeight: '800' },
  content: { padding: 14, gap: 12 },
  heroCard: { padding: 18, borderRadius: 18, borderWidth: 1, alignItems: 'center', gap: 4 },
  heroLabel: { fontSize: 11, fontWeight: '700' },
  heroVal: { fontSize: 30, fontWeight: '900' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tile: { width: '48%', padding: 12, borderRadius: 14, borderWidth: 1, gap: 4 },
  tileLabel: { fontSize: 10, fontWeight: '700' },
  tileVal: { fontSize: 14, fontWeight: '800' },
});
