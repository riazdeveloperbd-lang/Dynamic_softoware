import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { StatCard } from '@/components/StatCard';

interface DashboardViewProps {
  onNavigate: (screen: string, params?: any) => void;
  onOpenNewOrder: () => void;
  onOpenPayment: () => void;
  onOpenExport: () => void;
}

export function DashboardView({
  onNavigate,
  onOpenNewOrder,
  onOpenPayment,
  onOpenExport,
}: DashboardViewProps) {
  const { totals } = useLedger();
  const { colors } = useAppTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.content}>
      {/* Account Overview Title */}
      <View style={styles.sectionTitleRow}>
        <View style={[styles.dot, { backgroundColor: colors.primaryLight }]} />
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Account Overview • All Time</Text>
      </View>

      {/* Row 1: Delivery & Orders */}
      <View style={styles.gridRow}>
        <StatCard
          label="Total Delivery"
          value={`৳${totals.totalDeliveryAmt.toLocaleString()}`}
          foot={`${totals.totalDeliveries} deliveries • tap for details ›`}
          iconName="checkmark-circle-outline"
          accent="brass"
          onPress={() => onNavigate('deliveries')}
        />
        <StatCard
          label="Total Order"
          value={`৳${totals.totalOrderAmt.toLocaleString()}`}
          foot={`${totals.totalOrders} orders • tap for details ›`}
          iconName="document-text-outline"
          accent="green"
          onPress={() => onNavigate('orders')}
        />
      </View>

      {/* Row 2: New Orders & All Records */}
      <View style={styles.gridRow}>
        <StatCard
          label="New Order Amount"
          value={`৳${totals.newOrderAmt.toLocaleString()}`}
          foot={`${totals.newOrdersCount} waiting${totals.todayNewOrders ? ` • ${totals.todayNewOrders} today` : ''}`}
          iconName="time-outline"
          accent="red"
          valueColor={colors.crimson}
          onPress={() => onNavigate('queue')}
        />
        <StatCard
          label="All Records"
          value={String(totals.allRecordsCount)}
          foot="orders, deliveries & payments ›"
          iconName="layers-outline"
          accent="brass"
          onPress={() => onNavigate('history')}
        />
      </View>

      {/* New Order Queue Banner Tile */}
      <TouchableOpacity
        style={[styles.queueTile, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => onNavigate('queue')}
        activeOpacity={0.8}>
        <View style={styles.queueLeft}>
          <View style={[styles.queueIconBox, { backgroundColor: colors.primaryGlow }]}>
            <Ionicons name="cube-outline" size={20} color={colors.primaryLight} />
          </View>
          <View>
            <Text style={[styles.queueTitle, { color: colors.text }]}>New Order Queue</Text>
            <Text style={[styles.queueSub, { color: colors.textMuted }]}>
              Wait to Delivery • FIFO with emergency priority
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.queueCount,
            { backgroundColor: colors.crimson },
            totals.newOrdersCount === 0 && { backgroundColor: colors.cardElevated },
          ]}>
          <Text style={styles.queueCountText}>{totals.newOrdersCount}</Text>
        </View>
      </TouchableOpacity>

      {/* Add New Order Hero CTA */}
      <TouchableOpacity
        style={[styles.addTile, { backgroundColor: colors.primary }]}
        onPress={onOpenNewOrder}
        activeOpacity={0.85}>
        <View>
          <Text style={styles.addTitle}>Add New Order</Text>
          <Text style={styles.addSub}>Create a new delivery order + customer ledger</Text>
        </View>
        <View style={styles.addPlus}>
          <Ionicons name="add" size={24} color="#ffffff" />
        </View>
      </TouchableOpacity>

      {/* Payment Ledger Section */}
      <View style={[styles.sectionTitleRow, { marginTop: 18 }]}>
        <View style={[styles.dot, { backgroundColor: colors.primaryLight }]} />
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Payment Ledger</Text>
      </View>

      <View style={styles.gridRow}>
        <StatCard
          label="Due to Pay"
          value={`৳${totals.totalDue.toLocaleString()}`}
          foot="Delivered total − Paid total ›"
          iconName="alert-circle-outline"
          accent="red"
          valueColor={totals.totalDue > 0 ? colors.crimson : colors.emerald}
          onPress={() => onNavigate('due')}
        />
        <StatCard
          label="Total Paid"
          value={`৳${totals.totalPaid.toLocaleString()}`}
          foot="settlement payments ›"
          iconName="wallet-outline"
          accent="green"
          valueColor={colors.emerald}
          onPress={() => onNavigate('payments')}
        />
      </View>

      {/* Make Payment Button */}
      <TouchableOpacity
        style={[styles.brassBtn, { backgroundColor: colors.primary }]}
        onPress={onOpenPayment}
        activeOpacity={0.85}>
        <Ionicons name="card-outline" size={18} color="#ffffff" />
        <Text style={styles.brassBtnText}>Make Payment</Text>
      </TouchableOpacity>

      {/* Riyal Ledger Section */}
      <View style={[styles.sectionTitleRow, { marginTop: 22 }]}>
        <View style={[styles.dot, { backgroundColor: colors.primaryLight }]} />
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Riyal Ledger</Text>
      </View>

      <View style={styles.gridRow}>
        <StatCard
          label="Riyal Received"
          value={`${totals.riyalReceived.toLocaleString()} SAR`}
          foot="customer ledger payments ›"
          iconName="cash-outline"
          accent="green"
          valueColor={colors.emerald}
          onPress={() => onNavigate('riyal')}
        />
        <StatCard
          label="Riyal Due"
          value={`${totals.riyalDue.toLocaleString()} SAR`}
          foot="outstanding customer balance ›"
          iconName="time-outline"
          accent="red"
          valueColor={totals.riyalDue > 0 ? colors.crimson : colors.emerald}
          onPress={() => onNavigate('riyal')}
        />
      </View>

      {/* Finance Snapshot Section */}
      <View style={[styles.sectionTitleRow, { marginTop: 22 }]}>
        <View style={[styles.dot, { backgroundColor: colors.primaryLight }]} />
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Finance Snapshot</Text>
      </View>

      <View
        style={[
          styles.financeHero,
          { backgroundColor: colors.cardElevated, borderColor: colors.borderPrimary },
        ]}>
        <Text style={[styles.financeLabel, { color: colors.textSecondary }]}>
          Riyal Received × {totals.exchangeRate} BDT Rate
        </Text>
        <Text style={[styles.financeMain, { color: colors.primaryLight }]}>
          ৳{totals.riyalValue.toLocaleString()}
        </Text>
        <Text style={[styles.financeFoot, { color: colors.textMuted }]}>
          {totals.riyalReceived.toLocaleString()} SAR converted to Bangladesh Taka
        </Text>
      </View>

      <View style={styles.gridRow}>
        <View
          style={[
            styles.profitCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderLeftColor: totals.profitLoss >= 0 ? colors.emerald : colors.crimson,
            },
          ]}>
          <Text style={[styles.profitLabel, { color: colors.textSecondary }]}>
            {totals.profitLoss >= 0 ? '✓ Net Profit' : '⚠ Net Loss'}
          </Text>
          <Text
            style={[
              styles.profitValue,
              { color: totals.profitLoss >= 0 ? colors.emerald : colors.crimson },
            ]}>
            ৳{Math.abs(totals.profitLoss).toLocaleString()}
          </Text>
          <Text style={[styles.profitFoot, { color: colors.textMuted }]}>Converted SAR − Total Delivered</Text>
        </View>

        <View
          style={[
            styles.rateCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <Text style={[styles.profitLabel, { color: colors.textSecondary }]}>Exchange Rate</Text>
          <Text style={[styles.rateValue, { color: colors.text }]}>{totals.exchangeRate}</Text>
          <Text style={[styles.profitFoot, { color: colors.textMuted }]}>1 SAR = ৳{totals.exchangeRate} BDT</Text>
        </View>
      </View>

      {/* Finance Action Buttons */}
      <TouchableOpacity
        style={[styles.outlineBtn, { borderColor: colors.primary }]}
        onPress={() => onNavigate('calculator')}
        activeOpacity={0.8}>
        <Ionicons name="calculator-outline" size={18} color={colors.primaryLight} />
        <Text style={[styles.outlineBtnText, { color: colors.primaryLight }]}>Riyal → Taka Calculator</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.ghostBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => onNavigate('profit-loss')}
        activeOpacity={0.8}>
        <Ionicons name="trending-up-outline" size={18} color={colors.textSecondary} />
        <Text style={[styles.ghostBtnText, { color: colors.text }]}>Detailed Profit & Loss Statement</Text>
      </TouchableOpacity>

      {/* Records & Tools Quick Links */}
      <View style={[styles.sectionTitleRow, { marginTop: 22 }]}>
        <View style={[styles.dot, { backgroundColor: colors.primaryLight }]} />
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Records & Tools</Text>
      </View>

      <TouchableOpacity
        style={[styles.ghostBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => onNavigate('customers')}
        activeOpacity={0.8}>
        <Ionicons name="people-outline" size={18} color={colors.textSecondary} />
        <Text style={[styles.ghostBtnText, { color: colors.text }]}>Customer Ledger & Profiles</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.ghostBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => onNavigate('history')}
        activeOpacity={0.8}>
        <Ionicons name="layers-outline" size={18} color={colors.textSecondary} />
        <Text style={[styles.ghostBtnText, { color: colors.text }]}>View Full Timeline History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.ghostBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={onOpenExport}
        activeOpacity={0.8}>
        <Ionicons name="download-outline" size={18} color={colors.textSecondary} />
        <Text style={[styles.ghostBtnText, { color: colors.text }]}>Export Reports (PDF / Excel)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  queueTile: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginBottom: 10,
  },
  queueLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  queueIconBox: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  queueTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  queueSub: {
    fontSize: 11,
    marginTop: 2,
  },
  queueCount: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.md,
    minWidth: 44,
    alignItems: 'center',
  },
  queueCountText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  addTile: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#ffffff',
  },
  addSub: {
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
    fontWeight: '600',
  },
  addPlus: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brassBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: Radius.md,
    marginBottom: 6,
  },
  brassBtnText: {
    color: '#ffffff',
    fontSize: 14.5,
    fontWeight: '800',
  },
  financeHero: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    marginBottom: 10,
  },
  financeLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  financeMain: {
    fontSize: 26,
    fontWeight: '900',
    marginTop: 4,
  },
  financeFoot: {
    fontSize: 11,
    marginTop: 4,
  },
  profitCard: {
    flex: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderLeftWidth: 4,
    justifyContent: 'space-between',
    minHeight: 90,
  },
  rateCard: {
    flex: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    justifyContent: 'space-between',
    minHeight: 90,
  },
  profitLabel: {
    fontSize: 10.5,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  profitValue: {
    fontSize: 20,
    fontWeight: '900',
    marginTop: 4,
  },
  rateValue: {
    fontSize: 20,
    fontWeight: '900',
    marginTop: 4,
  },
  profitFoot: {
    fontSize: 10,
    marginTop: 4,
  },
  outlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
    marginTop: 4,
    marginBottom: 8,
  },
  outlineBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  ghostBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginBottom: 8,
  },
  ghostBtnText: {
    fontSize: 13.5,
    fontWeight: '600',
  },
});
