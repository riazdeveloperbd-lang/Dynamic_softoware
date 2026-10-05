import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomerLedgerEntry } from '@/types/ledger';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

interface FinanceTabProps {
  onOpenMakePayment: () => void;
  onOpenSettleModal: (entry: CustomerLedgerEntry) => void;
}

export function FinanceTab({ onOpenMakePayment, onOpenSettleModal }: FinanceTabProps) {
  const { totals, orders, payments, customerLedger, customers } = useLedger();
  const { colors, isDark } = useAppTheme();

  const [activeSegment, setActiveSegment] = useState<'due' | 'payments' | 'riyal' | 'pnl'>('due');

  const deliveredOrders = orders.filter((o) => o.status === 'delivered');

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Segment Selector */}
      <View style={[styles.segmentBar, { borderBottomColor: colors.border }]}>
        {(
          [
            { id: 'due', label: 'Due Ledger' },
            { id: 'payments', label: 'Paid Records' },
            { id: 'riyal', label: 'Riyal (SAR)' },
            { id: 'pnl', label: 'Profit & Loss' },
          ] as const
        ).map((s) => {
          const isActive = activeSegment === s.id;
          return (
            <TouchableOpacity
              key={s.id}
              style={[
                styles.segBtn,
                {
                  backgroundColor: isActive ? colors.primary : colors.card,
                  borderColor: isActive ? colors.primaryLight : colors.border,
                },
              ]}
              onPress={() => setActiveSegment(s.id)}
              activeOpacity={0.75}>
              <Text
                style={[
                  styles.segBtnText,
                  { color: isActive ? '#ffffff' : colors.textSecondary },
                ]}>
                {s.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* SUB-VIEW 1: DUE LEDGER */}
        {activeSegment === 'due' && (
          <View style={styles.sectionContainer}>
            {/* Due Card */}
            <View
              style={[
                styles.mathCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}>
              <View style={styles.mathTop}>
                <Text style={[styles.mathLabel, { color: colors.textSecondary }]}>
                  Outstanding Payables Balance
                </Text>
                <Text
                  style={[
                    styles.mathHero,
                    { color: totals.totalDue > 0 ? colors.crimson : colors.emerald },
                  ]}>
                  ৳{totals.totalDue.toLocaleString()}
                </Text>
              </View>

              <View
                style={[
                  styles.formulaBox,
                  { backgroundColor: colors.cardElevated },
                ]}>
                <View style={styles.formulaItem}>
                  <Text style={[styles.formulaLabel, { color: colors.textMuted }]}>Delivered</Text>
                  <Text style={[styles.formulaVal, { color: colors.text }]}>
                    ৳{totals.totalDeliveryAmt.toLocaleString()}
                  </Text>
                </View>
                <Text style={[styles.formulaOp, { color: colors.textMuted }]}>−</Text>
                <View style={styles.formulaItem}>
                  <Text style={[styles.formulaLabel, { color: colors.textMuted }]}>Paid</Text>
                  <Text style={[styles.formulaVal, { color: colors.emerald }]}>
                    ৳{totals.totalPaid.toLocaleString()}
                  </Text>
                </View>
                <Text style={[styles.formulaOp, { color: colors.textMuted }]}>=</Text>
                <View style={styles.formulaItem}>
                  <Text style={[styles.formulaLabel, { color: colors.textMuted }]}>Due</Text>
                  <Text
                    style={[
                      styles.formulaVal,
                      { color: totals.totalDue > 0 ? colors.crimson : colors.emerald },
                    ]}>
                    ৳{totals.totalDue.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.primaryActionBtn, { backgroundColor: colors.primary }]}
              onPress={onOpenMakePayment}
              activeOpacity={0.85}>
              <Ionicons name="card-outline" size={18} color="#fff" />
              <Text style={styles.primaryActionBtnText}>Make Settlement Payment</Text>
            </TouchableOpacity>

            <Text style={[styles.subHeader, { color: colors.textSecondary }]}>
              Delivered Orders in Ledger ({deliveredOrders.length})
            </Text>

            {deliveredOrders.length === 0 ? (
              <View style={styles.empty}>
                <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                  No delivered orders yet
                </Text>
              </View>
            ) : (
              deliveredOrders.map((o) => (
                <View
                  key={o.id}
                  style={[
                    styles.dueItem,
                    { backgroundColor: colors.card, borderColor: colors.border },
                  ]}>
                  <View style={styles.dueItemTop}>
                    <Text style={[styles.dueItemSerial, { color: colors.text }]}>
                      TR-{String(o.serial).padStart(4, '0')}
                    </Text>
                    <Text style={[styles.dueItemAmt, { color: colors.emerald }]}>
                      ৳{o.amount.toLocaleString()}
                    </Text>
                  </View>
                  <Text style={[styles.dueItemSub, { color: colors.textSecondary }]}>
                    {o.customerName} • Account: {o.recipientNumber}
                  </Text>
                  <Text style={[styles.dueItemDate, { color: colors.textMuted }]}>
                    Delivered {new Date(o.deliveredAt || o.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              ))
            )}
          </View>
        )}

        {/* SUB-VIEW 2: PAYMENTS */}
        {activeSegment === 'payments' && (
          <View style={styles.sectionContainer}>
            <View
              style={[
                styles.summaryBar,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}>
              <Text style={[styles.summaryBarText, { color: colors.textSecondary }]}>
                Total Settlements Paid:{' '}
                <Text style={{ fontWeight: '800', color: colors.emerald }}>
                  ৳{totals.totalPaid.toLocaleString()}
                </Text>
              </Text>
              <TouchableOpacity
                style={[styles.smallActionBtn, { backgroundColor: colors.primary }]}
                onPress={onOpenMakePayment}>
                <Ionicons name="add" size={16} color="#fff" />
                <Text style={styles.smallActionBtnText}>Pay</Text>
              </TouchableOpacity>
            </View>

            {payments.length === 0 ? (
              <View style={styles.empty}>
                <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                  No payments recorded yet
                </Text>
              </View>
            ) : (
              payments.map((p) => (
                <View
                  key={p.id}
                  style={[
                    styles.paymentCard,
                    { backgroundColor: colors.card, borderColor: colors.border },
                  ]}>
                  <View style={styles.payTop}>
                    <View>
                      <Text style={[styles.payTitle, { color: colors.text }]}>{p.method}</Text>
                      <Text style={[styles.payDate, { color: colors.textMuted }]}>
                        {new Date(p.date).toLocaleDateString()} • by {p.addedBy}
                      </Text>
                    </View>
                    <Text style={[styles.payAmt, { color: colors.emerald }]}>
                      ৳{p.amount.toLocaleString()}
                    </Text>
                  </View>
                  {p.description ? (
                    <Text style={[styles.payDesc, { color: colors.textSecondary }]}>
                      {p.description}
                    </Text>
                  ) : null}
                  {p.proof && (
                    <View style={styles.proofBox}>
                      <Image source={{ uri: p.proof }} style={styles.proofImg} />
                    </View>
                  )}
                </View>
              ))
            )}
          </View>
        )}

        {/* SUB-VIEW 3: RIYAL (SAR) */}
        {activeSegment === 'riyal' && (
          <View style={styles.sectionContainer}>
            <View style={styles.riyalStatRow}>
              <View
                style={[
                  styles.riyalStatCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}>
                <Text style={[styles.riyalStatLabel, { color: colors.textMuted }]}>
                  Received (SAR)
                </Text>
                <Text style={[styles.riyalStatVal, { color: colors.emerald }]}>
                  {totals.riyalReceived.toLocaleString()}
                </Text>
              </View>
              <View
                style={[
                  styles.riyalStatCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}>
                <Text style={[styles.riyalStatLabel, { color: colors.textMuted }]}>Due (SAR)</Text>
                <Text
                  style={[
                    styles.riyalStatVal,
                    { color: totals.riyalDue > 0 ? colors.crimson : colors.emerald },
                  ]}>
                  {totals.riyalDue.toLocaleString()}
                </Text>
              </View>
            </View>

            <Text style={[styles.subHeader, { color: colors.textSecondary }]}>
              Customer Riyal Ledger Entries
            </Text>

            {customerLedger.length === 0 ? (
              <View style={styles.empty}>
                <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                  No customer Riyal ledger records
                </Text>
              </View>
            ) : (
              customerLedger.map((entry) => {
                const customer = customers.find((c) => c.id === entry.customerId);
                const due = Math.max(0, entry.expected - entry.received);
                return (
                  <View
                    key={entry.id}
                    style={[
                      styles.ledgerCard,
                      { backgroundColor: colors.card, borderColor: colors.border },
                    ]}>
                    <View style={styles.ledgerTop}>
                      <View>
                        <Text style={[styles.custName, { color: colors.text }]}>
                          {customer?.name || 'Customer'}
                        </Text>
                        <Text style={[styles.custPhone, { color: colors.textMuted }]}>
                          {customer?.mobile}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.dueTag,
                          {
                            backgroundColor: due > 0 ? colors.crimsonGlow : colors.emeraldGlow,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.dueTagText,
                            { color: due > 0 ? colors.crimson : colors.emerald },
                          ]}>
                          {due > 0 ? `${due} SAR Due` : 'Settled'}
                        </Text>
                      </View>
                    </View>

                    <Text style={[styles.ledgerDetail, { color: colors.textSecondary }]}>
                      Expected: {entry.expected} SAR • Collected: {entry.received} SAR
                    </Text>

                    {entry.description ? (
                      <Text style={[styles.ledgerNotes, { color: colors.textMuted }]}>
                        {entry.description}
                      </Text>
                    ) : null}

                    {due > 0 && (
                      <TouchableOpacity
                        style={[styles.settleBtn, { backgroundColor: colors.primary }]}
                        onPress={() => onOpenSettleModal(entry)}
                        activeOpacity={0.8}>
                        <Ionicons name="cash-outline" size={16} color="#fff" />
                        <Text style={styles.settleBtnText}>Receive SAR Payment</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })
            )}
          </View>
        )}

        {/* SUB-VIEW 4: PROFIT & LOSS */}
        {activeSegment === 'pnl' && (
          <View style={styles.sectionContainer}>
            <View
              style={[
                styles.pnlHero,
                {
                  backgroundColor: colors.card,
                  borderColor: totals.profitLoss >= 0 ? colors.emerald : colors.crimson,
                },
              ]}>
              <Text style={[styles.pnlHeroSub, { color: colors.textMuted }]}>
                {totals.profitLoss >= 0 ? 'NET ESTIMATED PROFIT' : 'NET DEFICIT / LOSS'}
              </Text>
              <Text
                style={[
                  styles.pnlHeroVal,
                  { color: totals.profitLoss >= 0 ? colors.emerald : colors.crimson },
                ]}>
                ৳{Math.abs(totals.profitLoss).toLocaleString()}
              </Text>
              <Text style={[styles.pnlHeroFoot, { color: colors.textSecondary }]}>
                SAR Value (৳{totals.riyalValue.toLocaleString()}) − Total Delivery Cost (৳
                {totals.totalDeliveryAmt.toLocaleString()})
              </Text>
            </View>

            <View style={styles.pnlGrid}>
              <View
                style={[
                  styles.pnlBox,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}>
                <Text style={[styles.pnlBoxLabel, { color: colors.textMuted }]}>
                  SAR Collected
                </Text>
                <Text style={[styles.pnlBoxVal, { color: colors.text }]}>
                  {totals.riyalReceived.toLocaleString()} SAR
                </Text>
              </View>
              <View
                style={[
                  styles.pnlBox,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}>
                <Text style={[styles.pnlBoxLabel, { color: colors.textMuted }]}>
                  Exchange Rate
                </Text>
                <Text style={[styles.pnlBoxVal, { color: colors.text }]}>
                  ৳{totals.exchangeRate} / SAR
                </Text>
              </View>
            </View>

            <View style={styles.pnlGrid}>
              <View
                style={[
                  styles.pnlBox,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}>
                <Text style={[styles.pnlBoxLabel, { color: colors.textMuted }]}>
                  BDT Realized Value
                </Text>
                <Text style={[styles.pnlBoxVal, { color: colors.primary }]}>
                  ৳{totals.riyalValue.toLocaleString()}
                </Text>
              </View>
              <View
                style={[
                  styles.pnlBox,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}>
                <Text style={[styles.pnlBoxLabel, { color: colors.textMuted }]}>
                  Delivery Payout
                </Text>
                <Text style={[styles.pnlBoxVal, { color: colors.text }]}>
                  ৳{totals.totalDeliveryAmt.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  segmentBar: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
    gap: 6,
    borderBottomWidth: 1,
  },
  segBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  segBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  content: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  sectionContainer: {
    gap: 12,
  },
  mathCard: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    gap: 12,
  },
  mathTop: {
    gap: 4,
  },
  mathLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  mathHero: {
    fontSize: 28,
    fontWeight: '900',
  },
  formulaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Radius.md,
    padding: 12,
  },
  formulaItem: {
    alignItems: 'center',
  },
  formulaLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  formulaVal: {
    fontSize: 14.5,
    fontWeight: '800',
    marginTop: 2,
  },
  formulaOp: {
    fontSize: 16,
    fontWeight: '900',
  },
  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: Radius.md,
    paddingVertical: 13,
  },
  primaryActionBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  subHeader: {
    fontSize: 12.5,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  dueItem: {
    borderRadius: Radius.md,
    padding: 12,
    borderWidth: 1,
    gap: 3,
  },
  dueItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueItemSerial: {
    fontSize: 14,
    fontWeight: '800',
  },
  dueItemAmt: {
    fontSize: 15,
    fontWeight: '800',
  },
  dueItemSub: {
    fontSize: 12,
  },
  dueItemDate: {
    fontSize: 10.5,
  },
  summaryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  summaryBarText: {
    fontSize: 13,
  },
  smallActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.sm,
  },
  smallActionBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  paymentCard: {
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    gap: 4,
  },
  payTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payTitle: {
    fontSize: 14.5,
    fontWeight: '800',
  },
  payDate: {
    fontSize: 11,
    marginTop: 2,
  },
  payAmt: {
    fontSize: 16,
    fontWeight: '800',
  },
  payDesc: {
    fontSize: 12,
    marginTop: 4,
  },
  proofBox: {
    marginTop: 6,
    borderRadius: Radius.sm,
    overflow: 'hidden',
  },
  proofImg: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  riyalStatRow: {
    flexDirection: 'row',
    gap: 10,
  },
  riyalStatCard: {
    flex: 1,
    borderRadius: Radius.md,
    padding: 12,
    borderWidth: 1,
  },
  riyalStatLabel: {
    fontSize: 10.5,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  riyalStatVal: {
    fontSize: 20,
    fontWeight: '900',
    marginTop: 4,
  },
  ledgerCard: {
    borderRadius: Radius.md,
    padding: 12,
    borderWidth: 1,
    gap: 4,
  },
  ledgerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  custName: {
    fontSize: 14,
    fontWeight: '800',
  },
  custPhone: {
    fontSize: 11.5,
  },
  dueTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  dueTagText: {
    fontSize: 10.5,
    fontWeight: '800',
  },
  ledgerDetail: {
    fontSize: 12,
    marginTop: 4,
  },
  ledgerNotes: {
    fontSize: 11,
  },
  settleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: Radius.sm,
    paddingVertical: 8,
    marginTop: 6,
  },
  settleBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  pnlHero: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    gap: 4,
  },
  pnlHeroSub: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  pnlHeroVal: {
    fontSize: 28,
    fontWeight: '900',
    marginVertical: 4,
  },
  pnlHeroFoot: {
    fontSize: 11.5,
  },
  pnlGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  pnlBox: {
    flex: 1,
    borderRadius: Radius.md,
    padding: 12,
    borderWidth: 1,
  },
  pnlBoxLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  pnlBoxVal: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 4,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 13,
  },
});
