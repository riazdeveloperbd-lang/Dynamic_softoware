import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Order } from '@/types/ledger';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { OrderCard } from '@/components/OrderCard';

interface OrdersViewProps {
  onBack: () => void;
  onOpenDeliverModal: (order: Order) => void;
}

export function OrdersView({ onBack, onOpenDeliverModal }: OrdersViewProps) {
  const { orders, totals } = useLedger();
  const { colors } = useAppTheme();
  const [filter, setFilter] = useState<'all' | 'new' | 'delivered' | 'urgent'>('all');

  const filteredOrders = orders.filter((o) => {
    if (filter === 'new') return o.status === 'new';
    if (filter === 'delivered') return o.status === 'delivered';
    if (filter === 'urgent') return o.emergency;
    return true;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Back Header */}
      <View style={[styles.backRow, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}
          onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.backTitle, { color: colors.text }]}>Total Orders</Text>
          <Text style={[styles.backSub, { color: colors.primaryLight }]}>
            ৳{totals.totalOrderAmt.toLocaleString()} total
          </Text>
        </View>
      </View>

      {/* Summary Banner */}
      <View style={[styles.summaryBox, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}>
        <Text style={[styles.summaryText, { color: colors.textSecondary }]}>
          <Text style={[styles.summaryBold, { color: colors.text }]}>{orders.length}</Text> orders total •{' '}
          <Text style={[styles.summaryBold, { color: colors.text }]}>৳{totals.totalOrderAmt.toLocaleString()}</Text> total value
        </Text>
      </View>

      {/* Filter Chips */}
      <View style={styles.filterRow}>
        {(['all', 'new', 'delivered', 'urgent'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterChip,
              { backgroundColor: colors.card, borderColor: colors.border },
              filter === f && { backgroundColor: colors.primary, borderColor: colors.primaryLight },
            ]}
            onPress={() => setFilter(f)}>
            <Text
              style={[
                styles.filterText,
                { color: colors.textSecondary },
                filter === f && { color: '#ffffff' },
              ]}>
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders List */}
      <ScrollView contentContainerStyle={styles.listContent}>
        {filteredOrders.length === 0 ? (
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              No orders match the selected filter
            </Text>
          </View>
        ) : (
          filteredOrders.map((o) => (
            <OrderCard key={o.id} order={o} onMarkDelivered={onOpenDeliverModal} />
          ))
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
    marginTop: Spacing.sm,
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
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 11,
    fontWeight: '700',
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
