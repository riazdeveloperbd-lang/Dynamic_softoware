import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { OrderCard } from '@/components/OrderCard';
import { Order } from '@/types/ledger';

interface HomeTabProps {
  onOpenNewOrder: () => void;
  onOpenMakePayment: () => void;
  onOpenReceiveRiyal: () => void;
  onOpenCalculator: () => void;
  onNavigateToTab: (tab: 'orders' | 'finance' | 'customers' | 'more') => void;
  onMarkDelivered: (order: Order) => void;
}

export function HomeTab({
  onOpenNewOrder,
  onOpenMakePayment,
  onOpenReceiveRiyal,
  onOpenCalculator,
  onNavigateToTab,
  onMarkDelivered,
}: HomeTabProps) {
  const { totals, orders } = useLedger();
  const { colors, isDark } = useAppTheme();

  const isProfit = totals.profitLoss >= 0;
  const pendingOrders = orders.filter((o) => o.status === 'new');
  const recentOrders = orders.slice(0, 3);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.content}>
      {/* Portfolio / Executive Balance Card */}
      <View
        style={[
          styles.balanceCard,
          {
            backgroundColor: colors.card,
            borderColor: isDark ? colors.borderPrimary : colors.borderLight,
          },
        ]}>
        <View style={styles.balanceTop}>
          <Text style={[styles.balanceLabel, { color: colors.textSecondary }]}>
            Executive Remittance Net Position
          </Text>
          <View
            style={[
              styles.pnlBadge,
              { backgroundColor: isProfit ? colors.emeraldGlow : colors.crimsonGlow },
            ]}>
            <Ionicons
              name={isProfit ? 'trending-up' : 'trending-down'}
              size={14}
              color={isProfit ? colors.emerald : colors.crimson}
            />
            <Text
              style={[
                styles.pnlBadgeText,
                { color: isProfit ? colors.emerald : colors.crimson },
              ]}>
              {isProfit ? '+ PROFIT' : '- LOSS'}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.balanceAmount,
            { color: isProfit ? colors.emerald : colors.crimson },
          ]}>
          ৳{Math.abs(totals.profitLoss).toLocaleString()}
        </Text>

        <View style={[styles.balanceDetails, { borderTopColor: colors.border }]}>
          <View style={styles.detailCol}>
            <Text style={[styles.detailLabel, { color: colors.textMuted }]}>Riyal Converted</Text>
            <Text style={[styles.detailVal, { color: colors.text }]}>
              ৳{totals.riyalValue.toLocaleString()}
            </Text>
          </View>
          <View style={[styles.detailDivider, { backgroundColor: colors.border }]} />
          <View style={styles.detailCol}>
            <Text style={[styles.detailLabel, { color: colors.textMuted }]}>Total Delivered</Text>
            <Text style={[styles.detailVal, { color: colors.text }]}>
              ৳{totals.totalDeliveryAmt.toLocaleString()}
            </Text>
          </View>
          <View style={[styles.detailDivider, { backgroundColor: colors.border }]} />
          <View style={styles.detailCol}>
            <Text style={[styles.detailLabel, { color: colors.textMuted }]}>SAR Rate</Text>
            <Text style={[styles.detailVal, { color: colors.text }]}>৳{totals.exchangeRate}</Text>
          </View>
        </View>
      </View>

      {/* Quick Action Matrix */}
      <View
        style={[
          styles.actionRow,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}>
        <TouchableOpacity style={styles.actionBtn} onPress={onOpenNewOrder} activeOpacity={0.8}>
          <View style={[styles.actionIconBox, { backgroundColor: colors.primary }]}>
            <Ionicons name="add" size={20} color="#fff" />
          </View>
          <Text style={[styles.actionText, { color: colors.text }]}>New Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={onOpenMakePayment} activeOpacity={0.8}>
          <View style={[styles.actionIconBox, { backgroundColor: colors.emerald }]}>
            <Ionicons name="arrow-up" size={18} color="#fff" />
          </View>
          <Text style={[styles.actionText, { color: colors.text }]}>Pay Due</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={onOpenReceiveRiyal} activeOpacity={0.8}>
          <View style={[styles.actionIconBox, { backgroundColor: colors.amber }]}>
            <Ionicons name="arrow-down" size={18} color="#fff" />
          </View>
          <Text style={[styles.actionText, { color: colors.text }]}>Receive SAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={onOpenCalculator} activeOpacity={0.8}>
          <View style={[styles.actionIconBox, { backgroundColor: colors.cardElevated }]}>
            <Ionicons name="calculator-outline" size={18} color={colors.primary} />
          </View>
          <Text style={[styles.actionText, { color: colors.text }]}>Calculator</Text>
        </TouchableOpacity>
      </View>

      {/* Key Metric Tiles Grid */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Performance Overview</Text>
        <TouchableOpacity onPress={() => onNavigateToTab('orders')}>
          <Text style={[styles.sectionLink, { color: colors.primary }]}>View All ›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.metricsGrid}>
        <TouchableOpacity
          style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => onNavigateToTab('orders')}
          activeOpacity={0.8}>
          <View style={styles.metricTop}>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Total Delivered</Text>
            <Ionicons name="checkmark-done-circle" size={16} color={colors.emerald} />
          </View>
          <Text style={[styles.metricVal, { color: colors.emerald }]}>
            ৳{totals.totalDeliveryAmt.toLocaleString()}
          </Text>
          <Text style={[styles.metricSub, { color: colors.textMuted }]}>
            {totals.totalDeliveries} delivered orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => onNavigateToTab('finance')}
          activeOpacity={0.8}>
          <View style={styles.metricTop}>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Payables Due</Text>
            <Ionicons
              name="alert-circle"
              size={16}
              color={totals.totalDue > 0 ? colors.crimson : colors.emerald}
            />
          </View>
          <Text
            style={[
              styles.metricVal,
              { color: totals.totalDue > 0 ? colors.crimson : colors.emerald },
            ]}>
            ৳{totals.totalDue.toLocaleString()}
          </Text>
          <Text style={[styles.metricSub, { color: colors.textMuted }]}>Delivered minus Paid</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => onNavigateToTab('finance')}
          activeOpacity={0.8}>
          <View style={styles.metricTop}>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>SAR Collected</Text>
            <Ionicons name="cash" size={16} color={colors.amber} />
          </View>
          <Text style={[styles.metricVal, { color: colors.amber }]}>
            {totals.riyalReceived.toLocaleString()} SAR
          </Text>
          <Text style={[styles.metricSub, { color: colors.textMuted }]}>Riyal customer ledger</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => onNavigateToTab('orders')}
          activeOpacity={0.8}>
          <View style={styles.metricTop}>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Pending Queue</Text>
            <Ionicons name="time" size={16} color={colors.primary} />
          </View>
          <Text style={[styles.metricVal, { color: colors.primary }]}>
            {totals.newOrdersCount} Orders
          </Text>
          <Text style={[styles.metricSub, { color: colors.textMuted }]}>
            ৳{totals.newOrderAmt.toLocaleString()} in queue
          </Text>
        </TouchableOpacity>
      </View>

      {/* FIFO Queue Urgent Banner */}
      {pendingOrders.length > 0 && (
        <TouchableOpacity
          style={[
            styles.queueBanner,
            { backgroundColor: colors.cardElevated, borderColor: colors.borderPrimary },
          ]}
          onPress={() => onNavigateToTab('orders')}
          activeOpacity={0.85}>
          <View style={styles.queueBannerLeft}>
            <View style={[styles.urgentPulse, { backgroundColor: colors.primary }]}>
              <Ionicons name="flash" size={16} color="#fff" />
            </View>
            <View>
              <Text style={[styles.queueBannerTitle, { color: colors.text }]}>
                {pendingOrders.length} Order{pendingOrders.length > 1 ? 's' : ''} Awaiting Delivery
              </Text>
              <Text style={[styles.queueBannerSub, { color: colors.textSecondary }]}>
                FIFO with emergency priority • Tap to inspect queue
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.primary} />
        </TouchableOpacity>
      )}

      {/* Recent Activity / Orders */}
      <View style={[styles.sectionHeader, { marginTop: 14 }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Orders</Text>
        <TouchableOpacity onPress={() => onNavigateToTab('orders')}>
          <Text style={[styles.sectionLink, { color: colors.primary }]}>See All ›</Text>
        </TouchableOpacity>
      </View>

      {recentOrders.map((o) => (
        <OrderCard key={o.id} order={o} onMarkDelivered={onMarkDelivered} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  balanceCard: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  balanceTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  pnlBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  pnlBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '900',
    marginVertical: 8,
    letterSpacing: 0.3,
  },
  balanceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 10,
    marginTop: 4,
  },
  detailCol: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  detailVal: {
    fontSize: 13.5,
    fontWeight: '800',
    marginTop: 2,
  },
  detailDivider: {
    width: 1,
    height: 24,
    marginHorizontal: 8,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  actionBtn: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  actionIconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  sectionLink: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  metricCard: {
    width: '48.5%',
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    gap: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  metricTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  metricVal: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },
  metricSub: {
    fontSize: 10,
    marginTop: 2,
  },
  queueBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    marginBottom: 14,
  },
  queueBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  urgentPulse: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  queueBannerTitle: {
    fontSize: 13.5,
    fontWeight: '800',
  },
  queueBannerSub: {
    fontSize: 11,
    marginTop: 1,
  },
});
