import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { OrderCard } from '@/components/OrderCard';

interface DeliveriesViewProps {
  onBack: () => void;
}

export function DeliveriesView({ onBack }: DeliveriesViewProps) {
  const { orders, totals } = useLedger();
  const { colors } = useAppTheme();

  const deliveredOrders = orders
    .filter((o) => o.status === 'delivered')
    .sort(
      (a, b) =>
        new Date(b.deliveredAt || b.createdAt).getTime() -
        new Date(a.deliveredAt || a.createdAt).getTime()
    );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.backRow, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}
          onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.backTitle, { color: colors.text }]}>Total Deliveries</Text>
          <Text style={[styles.backSub, { color: colors.emerald }]}>
            ৳{totals.totalDeliveryAmt.toLocaleString()} completed
          </Text>
        </View>
      </View>

      <View style={[styles.summaryBox, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}>
        <Text style={[styles.summaryText, { color: colors.textSecondary }]}>
          <Text style={[styles.summaryBold, { color: colors.text }]}>{deliveredOrders.length}</Text> deliveries completed •{' '}
          <Text style={[styles.summaryBold, { color: colors.text }]}>৳{totals.totalDeliveryAmt.toLocaleString()}</Text> total
          delivered amount
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {deliveredOrders.length === 0 ? (
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No deliveries completed yet</Text>
          </View>
        ) : (
          deliveredOrders.map((o) => <OrderCard key={o.id} order={o} />)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  backTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  backSub: {
    fontSize: 12,
    fontWeight: '600',
  },
  summaryBox: {
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    padding: 10,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  summaryText: {
    fontSize: 12.5,
    textAlign: 'center',
  },
  summaryBold: {
    fontWeight: '800',
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: 4,
    paddingBottom: Spacing.xxl,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 13,
  },
});
