import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomerLedgerEntry } from '@/types/ledger';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

interface RiyalViewProps {
  onBack: () => void;
  onOpenSettleModal: (entry: CustomerLedgerEntry) => void;
}

export function RiyalView({ onBack, onOpenSettleModal }: RiyalViewProps) {
  const { customerLedger, customers, orders, totals } = useLedger();
  const { colors, isDark } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.backRow, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}
          onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.backTitle, { color: colors.text }]}>Riyal Customer Ledger</Text>
          <Text style={[styles.backSub, { color: colors.primaryLight }]}>Saudi Riyal (SAR) balance tracking</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Quick Stats */}
        <View style={styles.statGrid}>
          <View style={[styles.statTile, { backgroundColor: colors.card, borderColor: colors.border, borderBottomColor: colors.emerald }]}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Received</Text>
            <Text style={[styles.statValue, { color: colors.emerald }]}>
              {totals.riyalReceived.toLocaleString()} SAR
            </Text>
            <Text style={[styles.statFoot, { color: colors.textMuted }]}>All customer SAR collections</Text>
          </View>

          <View style={[styles.statTile, { backgroundColor: colors.card, borderColor: colors.border, borderBottomColor: colors.crimson }]}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Due</Text>
            <Text style={[styles.statValue, { color: totals.riyalDue > 0 ? colors.crimson : colors.emerald }]}>
              {totals.riyalDue.toLocaleString()} SAR
            </Text>
            <Text style={[styles.statFoot, { color: colors.textMuted }]}>All outstanding customer SAR</Text>
          </View>
        </View>

        <View style={[styles.summaryBox, { backgroundColor: colors.cardElevated }]}>
          <Text style={[styles.summaryText, { color: colors.textSecondary }]}>
            <Text style={{ fontWeight: '700', color: colors.text }}>{customerLedger.length}</Text> customer ledger entries • Newest activity first
          </Text>
        </View>

        {customerLedger.length === 0 ? (
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No Riyal ledger records yet</Text>
          </View>
        ) : (
          customerLedger.map((entry) => {
            const customer = customers.find((c) => c.id === entry.customerId);
            const order = orders.find((o) => o.id === entry.orderId);
            const due = Math.max(0, entry.expected - entry.received);
            const orderNo = order ? `TR-${String(order.serial).padStart(4, '0')}` : 'No order';

            return (
              <View
                key={entry.id}
                style={[
                  styles.entryCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}>
                <View style={styles.entryTop}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.customerName, { color: colors.text }]}>{customer?.name || 'Customer'}</Text>
                    <Text style={[styles.customerSub, { color: colors.textMuted }]}>
                      {customer?.mobile || ''} • {orderNo}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.dueBadge,
                      { backgroundColor: due > 0 ? colors.crimsonGlow : colors.emeraldGlow },
                    ]}>
                    <Text
                      style={[
                        styles.dueBadgeText,
                        { color: due > 0 ? colors.crimson : colors.emerald },
                      ]}>
                      {due > 0 ? `${due} SAR Due` : 'Settled'}
                    </Text>
                  </View>
                </View>

                <View style={[styles.entryMeta, { borderTopColor: colors.border }]}>
                  <Text style={[styles.metaLine, { color: colors.textSecondary }]}>
                    Updated: {new Date(entry.updatedAt || entry.createdAt).toLocaleDateString()}
                  </Text>
                  <Text style={[styles.metaLine, { color: colors.textSecondary }]}>
                    Expected: {entry.expected} SAR • Received: {entry.received} SAR
                  </Text>
                </View>

                {entry.description ? (
                  <Text style={[styles.descText, { color: colors.textMuted }]}>{entry.description}</Text>
                ) : null}

                {due > 0 ? (
                  <TouchableOpacity
                    style={[styles.settleBtn, { backgroundColor: colors.emerald }]}
                    onPress={() => onOpenSettleModal(entry)}
                    activeOpacity={0.8}>
                    <Ionicons name="cash-outline" size={16} color="#ffffff" />
                    <Text style={styles.settleBtnText}>Receive Riyal Payment</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.settledNotice}>
                    <Ionicons name="checkmark-circle" size={14} color={colors.emerald} />
                    <Text style={[styles.settledText, { color: colors.emerald }]}>Payment fully settled</Text>
                  </View>
                )}
              </View>
            );
          })
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
  content: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xxl,
  },
  statGrid: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  statTile: {
    flex: 1,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderBottomWidth: 3,
  },
  statLabel: {
    fontSize: 10.5,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    marginTop: 4,
  },
  statFoot: {
    fontSize: 10,
    marginTop: 4,
  },
  summaryBox: {
    padding: 10,
    borderRadius: Radius.md,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 12,
  },
  entryCard: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    marginBottom: 10,
    gap: 6,
  },
  entryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  customerName: {
    fontSize: 15,
    fontWeight: '800',
  },
  customerSub: {
    fontSize: 12,
    marginTop: 2,
  },
  dueBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  dueBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  entryMeta: {
    borderTopWidth: 1,
    paddingTop: 6,
    gap: 2,
  },
  metaLine: {
    fontSize: 11.5,
  },
  descText: {
    fontSize: 12,
    marginTop: 2,
  },
  settleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: Radius.md,
    paddingVertical: 10,
    marginTop: 6,
  },
  settleBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
  settledNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  settledText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 13,
  },
});
