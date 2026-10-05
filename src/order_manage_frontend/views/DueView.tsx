import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

interface DueViewProps {
  onBack: () => void;
  onOpenMakePayment: () => void;
}

export function DueView({ onBack, onOpenMakePayment }: DueViewProps) {
  const { totals, orders } = useLedger();
  const { colors } = useAppTheme();

  const deliveredOrders = orders.filter((o) => o.status === 'delivered');

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.backRow, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}
          onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.backTitle, { color: colors.text }]}>Due to Pay (Payables)</Text>
          <Text style={[styles.backSub, { color: colors.crimson }]}>
            ৳{totals.totalDue.toLocaleString()} current balance
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Accounting Rule Breakdown Card */}
        <View style={[styles.ruleCard, { backgroundColor: colors.card, borderColor: colors.borderPrimary }]}>
          <View style={styles.ruleHeader}>
            <Ionicons name="calculator-outline" size={18} color={colors.primaryLight} />
            <Text style={[styles.ruleTitle, { color: colors.text }]}>How This Balance Is Calculated</Text>
          </View>
          <Text style={[styles.ruleDesc, { color: colors.textSecondary }]}>
            Per remittance ledger rules, placing an order does not yet create a payable. Only once
            the order is marked <Text style={{ color: colors.emerald, fontWeight: '700' }}>Delivered</Text>{' '}
            does it become owed:
          </Text>

          <View style={[styles.mathBox, { backgroundColor: colors.cardElevated }]}>
            <View style={styles.mathItem}>
              <Text style={[styles.mathLabel, { color: colors.textMuted }]}>Total Delivered</Text>
              <Text style={[styles.mathVal, { color: colors.text }]}>৳{totals.totalDeliveryAmt.toLocaleString()}</Text>
            </View>
            <Text style={[styles.mathOp, { color: colors.textMuted }]}>−</Text>
            <View style={styles.mathItem}>
              <Text style={[styles.mathLabel, { color: colors.textMuted }]}>Total Paid</Text>
              <Text style={[styles.mathVal, { color: colors.emerald }]}>
                ৳{totals.totalPaid.toLocaleString()}
              </Text>
            </View>
            <Text style={[styles.mathOp, { color: colors.textMuted }]}>=</Text>
            <View style={styles.mathItem}>
              <Text style={[styles.mathLabel, { color: colors.textMuted }]}>Current Due</Text>
              <Text style={[styles.mathVal, { color: colors.crimson }]}>
                ৳{totals.totalDue.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.payBtn, { backgroundColor: colors.primary }]}
          onPress={onOpenMakePayment}
          activeOpacity={0.85}>
          <Ionicons name="wallet-outline" size={18} color="#ffffff" />
          <Text style={styles.payBtnText}>Make Settlement Payment</Text>
        </TouchableOpacity>

        {/* Delivered Orders contributing to this due */}
        <Text style={[styles.sectionHeader, { color: colors.primaryLight }]}>
          Delivered Orders in Ledger ({deliveredOrders.length})
        </Text>

        {deliveredOrders.length === 0 ? (
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              No delivered orders yet — due starts once an order is marked delivered.
            </Text>
          </View>
        ) : (
          deliveredOrders.map((o) => (
            <View
              key={o.id}
              style={[styles.orderItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.itemTop}>
                <View>
                  <Text style={[styles.itemSerial, { color: colors.text }]}>
                    TR-{String(o.serial).padStart(4, '0')}
                  </Text>
                  <Text style={[styles.itemDate, { color: colors.textMuted }]}>
                    Delivered {new Date(o.deliveredAt || o.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={[styles.itemAmt, { color: colors.primaryLight }]}>
                  ৳{o.amount.toLocaleString()}
                </Text>
              </View>

              <Text style={[styles.itemCust, { color: colors.textSecondary }]}>
                {o.customerName} • {o.customerMobile}
              </Text>
              <Text style={[styles.itemNote, { color: colors.textMuted }]}>
                Included in the delivered payable balance • Recipient: {o.recipientNumber}
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
  content: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  ruleCard: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    gap: 8,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ruleTitle: {
    fontSize: 14.5,
    fontWeight: '800',
  },
  ruleDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  mathBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Radius.md,
    padding: 12,
    marginTop: 6,
  },
  mathItem: {
    alignItems: 'center',
  },
  mathLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  mathVal: {
    fontSize: 15,
    fontWeight: '900',
    marginTop: 2,
  },
  mathOp: {
    fontSize: 16,
    fontWeight: '900',
  },
  payBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: Radius.md,
    paddingVertical: 13,
    marginVertical: 14,
  },
  payBtnText: {
    color: '#ffffff',
    fontSize: 14.5,
    fontWeight: '800',
  },
  sectionHeader: {
    fontSize: 12.5,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  orderItem: {
    borderRadius: Radius.md,
    padding: 12,
    borderWidth: 1,
    marginBottom: 8,
    gap: 4,
  },
  itemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemSerial: {
    fontSize: 14,
    fontWeight: '800',
  },
  itemDate: {
    fontSize: 11,
  },
  itemAmt: {
    fontSize: 15,
    fontWeight: '800',
  },
  itemCust: {
    fontSize: 12,
    fontWeight: '600',
  },
  itemNote: {
    fontSize: 11,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 13,
    textAlign: 'center',
  },
});
