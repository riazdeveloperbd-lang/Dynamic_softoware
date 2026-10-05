import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Order } from '@/types/ledger';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { OrderCard } from '@/components/OrderCard';

interface QueueViewProps {
  onBack: () => void;
  onOpenDeliverModal: (order: Order) => void;
}

export function QueueView({ onBack, onOpenDeliverModal }: QueueViewProps) {
  const { orders } = useLedger();
  const { colors } = useAppTheme();

  // FIFO: Emergency on top, then oldest first
  const queueOrders = orders
    .filter((o) => o.status === 'new')
    .sort((a, b) => {
      if (a.emergency !== b.emergency) {
        return a.emergency ? -1 : 1;
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.backRow, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}
          onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.backTitle, { color: colors.text }]}>New Order Queue</Text>
          <Text style={[styles.backSub, { color: colors.primaryLight }]}>
            {queueOrders.length} pending • Emergency priority FIFO
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.banner,
          {
            backgroundColor: colors.cardElevated,
            borderColor: colors.borderPrimary,
          },
        ]}>
        <Ionicons name="time-outline" size={18} color={colors.primaryLight} />
        <Text style={[styles.bannerText, { color: colors.textSecondary }]}>
          Wait to Delivery queue sorted by emergency priority, then arrival time.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {queueOrders.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="checkmark-done-circle-outline" size={48} color={colors.emerald} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>All Caught Up!</Text>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No pending deliveries in the queue right now.</Text>
          </View>
        ) : (
          queueOrders.map((o) => (
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
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    padding: 10,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  bannerText: {
    flex: 1,
    fontSize: 12,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: 4,
    paddingBottom: Spacing.xxl,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  emptyText: {
    fontSize: 13,
  },
});
