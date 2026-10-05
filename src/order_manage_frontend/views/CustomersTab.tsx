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
import { CustomerDetailView } from './CustomerDetailView';

export function CustomersTab() {
  const { customers, orders } = useLedger();
  const { colors, isDark } = useAppTheme();
  const [search, setSearch] = useState('');
  const [selectedCust, setSelectedCust] = useState<Customer | null>(null);

  if (selectedCust) {
    return <CustomerDetailView customer={selectedCust} onBack={() => setSelectedCust(null)} />;
  }

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search)
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View
        style={[
          styles.searchBar,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}>
        <Ionicons name="search-outline" size={17} color={colors.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search by client name or mobile"
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

      <ScrollView contentContainerStyle={styles.listContent}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={40} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No clients found</Text>
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
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                onPress={() => setSelectedCust(c)}
                activeOpacity={0.75}>
                <View style={styles.cardTop}>
                  <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                    <Text style={styles.avatarText}>{(c.name || 'C').charAt(0).toUpperCase()}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.name, { color: colors.text }]}>{c.name}</Text>
                    <Text style={[styles.phone, { color: colors.textSecondary }]}>{c.mobile}</Text>
                  </View>
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: colors.cardElevated, borderColor: colors.border },
                    ]}>
                    <Text style={[styles.badgeText, { color: colors.primaryLight }]}>
                      {custOrders.length} orders
                    </Text>
                  </View>
                </View>

                <View style={[styles.balanceRow, { borderTopColor: colors.border }]}>
                  <Text style={[styles.balText, { color: colors.textSecondary }]}>
                    SAR Received: <Text style={{ color: colors.emerald, fontWeight: '700' }}>{received}</Text>
                  </Text>
                  <Text style={[styles.balText, { color: colors.textSecondary }]}>
                    Due:{' '}
                    <Text
                      style={{
                        color: due > 0 ? colors.crimson : colors.emerald,
                        fontWeight: '700',
                      }}>
                      {due} SAR
                    </Text>
                  </Text>
                </View>

                <View style={styles.cardFoot}>
                  <Text style={[styles.footText, { color: colors.primaryLight }]}>
                    View client statement & order history
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    paddingHorizontal: 12,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: 6,
    borderWidth: 1,
    height: 42,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: 4,
    paddingBottom: Spacing.xxl,
  },
  card: {
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
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
  },
  phone: {
    fontSize: 12,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.sm,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 8,
  },
  balText: {
    fontSize: 12,
  },
  cardFoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 2,
  },
  footText: {
    fontSize: 11,
    fontWeight: '600',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 8,
  },
  emptyText: {
    fontSize: 13,
  },
});
