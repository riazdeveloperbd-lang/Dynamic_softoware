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
import { Customer } from '@/types/ledger';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

interface CustomersViewProps {
  onBack: () => void;
  onSelectCustomer: (customer: Customer) => void;
}

export function CustomersView({ onBack, onSelectCustomer }: CustomersViewProps) {
  const { customers, orders } = useLedger();
  const { colors } = useAppTheme();
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search)
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.backRow, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}
          onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.backTitle, { color: colors.text }]}>Customer Profiles & Ledger</Text>
          <Text style={[styles.backSub, { color: colors.primaryLight }]}>
            {customers.length} registered customers
          </Text>
        </View>
      </View>

      <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Ionicons name="search-outline" size={18} color={colors.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search by customer name or phone"
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search ? (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No customers found</Text>
          </View>
        ) : (
          filtered.map((c) => {
            const custOrders = orders.filter((o) => o.customerId === c.id);
            const expected = custOrders.reduce((acc, o) => acc + (o.riyal?.expected || 0), 0);
            const received = custOrders.reduce((acc, o) => acc + (o.riyal?.received || 0), 0);
            const due = Math.max(0, expected - received);

            return (
              <TouchableOpacity
                key={c.id}
                style={[styles.customerCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => onSelectCustomer(c)}
                activeOpacity={0.75}>
                <View style={styles.cardTop}>
                  <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                    <Text style={styles.avatarText}>{(c.name || 'C').charAt(0).toUpperCase()}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.custName, { color: colors.text }]}>{c.name}</Text>
                    <Text style={[styles.custMobile, { color: colors.textSecondary }]}>{c.mobile}</Text>
                  </View>
                  <View style={[styles.orderBadge, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}>
                    <Text style={[styles.orderBadgeText, { color: colors.primaryLight }]}>
                      {custOrders.length} orders
                    </Text>
                  </View>
                </View>

                <View style={[styles.ledgerRow, { borderTopColor: colors.border }]}>
                  <Text style={[styles.ledgerText, { color: colors.textSecondary }]}>
                    Riyal Received: <Text style={{ color: colors.emerald }}>{received} SAR</Text>
                  </Text>
                  <Text style={[styles.ledgerText, { color: colors.textSecondary }]}>
                    Due:{' '}
                    <Text style={{ color: due > 0 ? colors.crimson : colors.emerald }}>
                      {due} SAR
                    </Text>
                  </Text>
                </View>

                <View style={styles.tapRow}>
                  <Text style={[styles.tapText, { color: colors.primaryLight }]}>
                    Tap to view complete order history & ledger
                  </Text>
                  <Ionicons name="chevron-forward" size={14} color={colors.primaryLight} />
                </View>
              </TouchableOpacity>
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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    paddingHorizontal: 12,
    marginHorizontal: Spacing.md,
    marginVertical: 10,
    borderWidth: 1,
    height: 46,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: 4,
    paddingBottom: Spacing.xxl,
  },
  customerCard: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    marginBottom: 10,
    gap: 8,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  custName: {
    fontSize: 15,
    fontWeight: '800',
  },
  custMobile: {
    fontSize: 12,
    marginTop: 2,
  },
  orderBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
    borderWidth: 1,
  },
  orderBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  ledgerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 8,
  },
  ledgerText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 2,
  },
  tapText: {
    fontSize: 11,
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
