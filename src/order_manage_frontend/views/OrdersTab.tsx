import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { OrderCard } from '@/components/OrderCard';
import { Order } from '@/types/ledger';

interface OrdersTabProps {
  onMarkDelivered: (order: Order) => void;
  onOpenNewOrder: () => void;
}

export function OrdersTab({ onMarkDelivered, onOpenNewOrder }: OrdersTabProps) {
  const { orders, totals } = useLedger();
  const { colors, isDark } = useAppTheme();

  const [activeSegment, setActiveSegment] = useState<'queue' | 'all' | 'delivered' | 'urgent'>('queue');
  const [search, setSearch] = useState('');

  // Filtering
  const filtered = orders.filter((o) => {
    // Segment filter
    if (activeSegment === 'queue') {
      if (o.status !== 'new') return false;
    } else if (activeSegment === 'delivered') {
      if (o.status !== 'delivered') return false;
    } else if (activeSegment === 'urgent') {
      if (!o.emergency) return false;
    }

    // Search query
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const matchSerial = `tr-${String(o.serial).padStart(4, '0')}`.includes(q);
      const matchRecipient = o.recipientNumber.includes(q);
      const matchCust = o.customerName.toLowerCase().includes(q) || o.customerMobile.includes(q);
      return matchSerial || matchRecipient || matchCust;
    }
    return true;
  });

  // Sort queue by FIFO (emergency first, then oldest first)
  if (activeSegment === 'queue') {
    filtered.sort((a, b) => {
      if (a.emergency !== b.emergency) {
        return a.emergency ? -1 : 1;
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  } else {
    // Newest first
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  const segments: { id: 'queue' | 'all' | 'delivered' | 'urgent'; label: string; count: number }[] = [
    { id: 'queue', label: 'Queue', count: totals.newOrdersCount },
    { id: 'all', label: 'All', count: orders.length },
    { id: 'delivered', label: 'Delivered', count: totals.totalDeliveries },
    { id: 'urgent', label: 'Urgent', count: orders.filter((o) => o.emergency).length },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Top Search & Filter Bar */}
      <View style={styles.topBar}>
        <View
          style={[
            styles.searchBox,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <Ionicons name="search-outline" size={17} color={colors.textMuted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search account, customer, or TR-0001"
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          style={[styles.newBtn, { backgroundColor: colors.primary }]}
          onPress={onOpenNewOrder}
          activeOpacity={0.8}>
          <Ionicons name="add" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Segmented Control Bar */}
      <View style={styles.segmentsRow}>
        {segments.map((seg) => {
          const isActive = activeSegment === seg.id;
          return (
            <TouchableOpacity
              key={seg.id}
              style={[
                styles.segmentBtn,
                {
                  backgroundColor: isActive ? colors.primary : colors.card,
                  borderColor: isActive ? colors.primaryLight : colors.border,
                },
              ]}
              onPress={() => setActiveSegment(seg.id)}
              activeOpacity={0.75}>
              <Text
                style={[
                  styles.segmentText,
                  { color: isActive ? '#ffffff' : colors.textSecondary },
                ]}>
                {seg.label}
              </Text>
              <View
                style={[
                  styles.countBadge,
                  {
                    backgroundColor: isActive
                      ? 'rgba(255, 255, 255, 0.25)'
                      : colors.cardElevated,
                  },
                ]}>
                <Text
                  style={[
                    styles.countText,
                    { color: isActive ? '#fff' : colors.textSecondary },
                  ]}>
                  {seg.count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Orders List */}
      <ScrollView contentContainerStyle={styles.listContent}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="cube-outline" size={44} color={colors.textMuted} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No orders in this view</Text>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              {search ? 'Try adjusting your search query' : 'Create a new order to get started'}
            </Text>
          </View>
        ) : (
          filtered.map((order) => (
            <OrderCard key={order.id} order={order} onMarkDelivered={onMarkDelivered} />
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    gap: 8,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    paddingHorizontal: 12,
    borderWidth: 1,
    height: 42,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
  },
  newBtn: {
    width: 42,
    height: 42,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    gap: 6,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 7,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  segmentText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  countBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: Radius.full,
  },
  countText: {
    fontSize: 10,
    fontWeight: '800',
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: 4,
    paddingBottom: Spacing.xxl,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  emptyText: {
    fontSize: 12.5,
  },
});
