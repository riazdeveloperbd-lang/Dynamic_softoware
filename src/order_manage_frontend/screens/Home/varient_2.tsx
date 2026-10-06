import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { OrderCard } from '@/components/OrderCard';

export default function HomeVarient2({
  onOpenNewOrder,
  onOpenMakePayment,
  onOpenReceiveRiyal,
  onOpenCalculator,
  onNavigateToTab,
  onMarkDelivered,
}: any) {
  const { totals, orders } = useLedger();
  const { colors, isDark } = useAppTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={styles.content}>
      {/* V2 Compact High-Density Header Bar */}
      <View style={[styles.v2Header, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.v2HeaderTop}>
          <Text style={[styles.v2Title, { color: colors.text }]}>Fintech Treasury Matrix</Text>
          <View style={[styles.badge, { backgroundColor: `${colors.primary}20` }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>V2 • High Density</Text>
          </View>
        </View>

        {/* Dense KPI Grid */}
        <View style={styles.kpiRow}>
          <View style={[styles.kpiCell, { backgroundColor: colors.bg }]}>
            <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>Net Volume</Text>
            <Text style={[styles.kpiVal, { color: colors.primary }]}>
              ৳{totals.totalOrderAmt.toLocaleString()}
            </Text>
          </View>
          <View style={[styles.kpiCell, { backgroundColor: colors.bg }]}>
            <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>Delivered</Text>
            <Text style={[styles.kpiVal, { color: colors.emerald }]}>
              ৳{totals.totalDeliveryAmt.toLocaleString()}
            </Text>
          </View>
          <View style={[styles.kpiCell, { backgroundColor: colors.bg }]}>
            <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>Due Remittance</Text>
            <Text style={[styles.kpiVal, { color: colors.crimson }]}>
              ৳{totals.totalDue.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Action Chips */}
      <View style={styles.chipRow}>
        <TouchableOpacity
          style={[styles.actionChip, { backgroundColor: colors.primary }]}
          onPress={onOpenNewOrder}
        >
          <Ionicons name="add-circle" size={16} color="#ffffff" />
          <Text style={styles.actionChipText}>New Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionChip, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}
          onPress={onOpenReceiveRiyal}
        >
          <Ionicons name="cash" size={16} color={colors.primary} />
          <Text style={[styles.actionChipText, { color: colors.text }]}>Receive SAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionChip, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}
          onPress={onOpenCalculator}
        >
          <Ionicons name="calculator" size={16} color={colors.primary} />
          <Text style={[styles.actionChipText, { color: colors.text }]}>FX Calc</Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <View style={styles.section}>
        <Text style={[styles.secTitle, { color: colors.text }]}>Live Queue & Orders</Text>
        {orders.slice(0, 4).map((order: any) => (
          <OrderCard key={order.id} order={order} onMarkDelivered={() => onMarkDelivered(order)} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 14, gap: 12 },
  v2Header: { padding: 14, borderRadius: 16, borderWidth: 1, gap: 10 },
  v2HeaderTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  v2Title: { fontSize: 13, fontWeight: '800' },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeText: { fontSize: 10, fontWeight: '700' },
  kpiRow: { flexDirection: 'row', gap: 8 },
  kpiCell: { flex: 1, padding: 8, borderRadius: 10, alignItems: 'center' },
  kpiLabel: { fontSize: 9, fontWeight: '600' },
  kpiVal: { fontSize: 12, fontWeight: '800', marginTop: 2 },
  chipRow: { flexDirection: 'row', gap: 8 },
  actionChip: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 38, borderRadius: 12, gap: 6 },
  actionChipText: { color: '#ffffff', fontSize: 11, fontWeight: '700' },
  section: { gap: 8, marginTop: 4 },
  secTitle: { fontSize: 13, fontWeight: '800' },
});
