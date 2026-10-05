import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Customer } from '@/types/ledger';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { OrderCard } from '@/components/OrderCard';

interface CustomerDetailViewProps {
  customer: Customer;
  onBack: () => void;
}

export function CustomerDetailView({ customer, onBack }: CustomerDetailViewProps) {
  const { orders } = useLedger();
  const { colors, isDark } = useAppTheme();

  const custOrders = orders.filter((o) => o.customerId === customer.id);
  const totalAmt = custOrders.reduce((acc, o) => acc + o.amount, 0);
  const expected = custOrders.reduce((acc, o) => acc + (o.riyal?.expected || 0), 0);
  const received = custOrders.reduce((acc, o) => acc + (o.riyal?.received || 0), 0);
  const due = Math.max(0, expected - received);

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.backRow, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { backgroundColor: colors.cardElevated, borderColor: colors.border },
          ]}
          onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={[styles.backTitle, { color: colors.text }]}>{customer.name}</Text>
          <Text style={[styles.backSub, { color: colors.primaryLight }]}>{customer.mobile}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Customer Stats Card */}
        <View
          style={[
            styles.profileCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <View style={styles.profileTop}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>{(customer.name || 'C').charAt(0).toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.profileName, { color: colors.text }]}>{customer.name}</Text>
              <Text style={[styles.profilePhone, { color: colors.textSecondary }]}>{customer.mobile}</Text>
            </View>
          </View>

          <View style={[styles.statsGrid, { borderTopColor: colors.border }]}>
            <View style={[styles.statBox, { backgroundColor: colors.cardElevated }]}>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Total Orders</Text>
              <Text style={[styles.statVal, { color: colors.text }]}>{custOrders.length}</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: colors.cardElevated }]}>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Total Amount</Text>
              <Text style={[styles.statVal, { color: colors.primary }]}>
                ৳{totalAmt.toLocaleString()}
              </Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: colors.cardElevated }]}>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>SAR Received</Text>
              <Text style={[styles.statVal, { color: colors.emerald }]}>{received}</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: colors.cardElevated }]}>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>SAR Due</Text>
              <Text style={[styles.statVal, { color: due > 0 ? colors.crimson : colors.emerald }]}>
                {due}
              </Text>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionHeader, { color: colors.primaryLight }]}>
          Customer Orders History ({custOrders.length})
        </Text>

        {custOrders.length === 0 ? (
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              No orders registered for this customer yet
            </Text>
          </View>
        ) : (
          custOrders.map((o) => <OrderCard key={o.id} order={o} />)
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
  profileCard: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    gap: 12,
    marginBottom: 16,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '800',
  },
  profilePhone: {
    fontSize: 12.5,
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  statBox: {
    flex: 1,
    minWidth: '45%',
    padding: 10,
    borderRadius: Radius.md,
  },
  statLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  statVal: {
    fontSize: 16,
    fontWeight: '900',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 12.5,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 13,
  },
});
