import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

interface HistoryViewProps {
  onBack: () => void;
}

interface TimelineItem {
  id: string;
  type: 'order' | 'delivery' | 'payment';
  date: string;
  title: string;
  amount: number;
  sub: string;
  extra?: string;
}

export function HistoryView({ onBack }: HistoryViewProps) {
  const { orders, payments } = useLedger();
  const { colors, isDark } = useAppTheme();

  const items: TimelineItem[] = [];

  // Add orders
  orders.forEach((o) => {
    items.push({
      id: `ord_${o.id}`,
      type: 'order',
      date: o.createdAt,
      title: `Order TR-${String(o.serial).padStart(4, '0')}`,
      amount: o.amount,
      sub: `${o.customerName} • Recipient: ${o.recipientNumber}`,
      extra: o.status === 'delivered' ? 'Delivered' : 'New',
    });

    if (o.status === 'delivered' && o.deliveredAt) {
      items.push({
        id: `del_${o.id}`,
        type: 'delivery',
        date: o.deliveredAt,
        title: `Delivery TR-${String(o.serial).padStart(4, '0')}`,
        amount: o.amount,
        sub: `Delivered by ${o.deliveredBy || 'admin'}${o.deliveryLast4 ? ` • Last 4: ${o.deliveryLast4}` : ''}`,
        extra: 'Completed',
      });
    }
  });

  // Add payments
  payments.forEach((p) => {
    items.push({
      id: `pay_${p.id}`,
      type: 'payment',
      date: p.date,
      title: 'Settlement Payment',
      amount: p.amount,
      sub: `${p.method} • Added by ${p.addedBy}`,
      extra: p.description,
    });
  });

  // Sort newest first
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.backRow, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}
          onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.backTitle, { color: colors.text }]}>Full Timeline History</Text>
          <Text style={[styles.backSub, { color: colors.primaryLight }]}>{items.length} records combined</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {items.length === 0 ? (
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No records in history yet</Text>
          </View>
        ) : (
          items.map((it) => (
            <View
              key={it.id}
              style={[
                styles.itemCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}>
              <View style={styles.itemTop}>
                <View style={styles.titleRow}>
                  <View
                    style={[
                      styles.typeBadge,
                      it.type === 'order'
                        ? { backgroundColor: colors.primary }
                        : it.type === 'delivery'
                        ? { backgroundColor: colors.emerald }
                        : { backgroundColor: '#2563EB' },
                    ]}>
                    <Ionicons
                      name={
                        it.type === 'order'
                          ? 'document-text'
                          : it.type === 'delivery'
                          ? 'checkmark-circle'
                          : 'wallet'
                      }
                      size={12}
                      color="#fff"
                    />
                  </View>
                  <Text style={[styles.itemTitle, { color: colors.text }]}>{it.title}</Text>
                </View>

                <Text
                  style={[
                    styles.itemAmt,
                    {
                      color:
                        it.type === 'delivery'
                          ? colors.emerald
                          : it.type === 'payment'
                          ? colors.emerald
                          : colors.primaryLight,
                    },
                  ]}>
                  ৳{it.amount.toLocaleString()}
                </Text>
              </View>

              <Text style={[styles.itemSub, { color: colors.textSecondary }]}>{it.sub}</Text>
              <Text style={[styles.itemDate, { color: colors.textMuted }]}>
                {new Date(it.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
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
  listContent: {
    padding: Spacing.md,
    gap: 8,
  },
  itemCard: {
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    gap: 4,
  },
  itemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 14.5,
    fontWeight: '800',
  },
  itemAmt: {
    fontSize: 16,
    fontWeight: '900',
  },
  itemSub: {
    fontSize: 12,
    marginTop: 2,
  },
  itemDate: {
    fontSize: 11,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 13,
  },
});
