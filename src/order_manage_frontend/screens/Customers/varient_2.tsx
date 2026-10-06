import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { CustomerDetailView } from '@/views/CustomerDetailView';

export default function CustomersVarient2() {
  const { customers, orders } = useLedger();
  const { colors } = useAppTheme();
  const [search, setSearch] = useState('');
  const [selectedCust, setSelectedCust] = useState<any>(null);

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
      <View style={[styles.header, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color={colors.textSecondary} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Search Client Name or Phone..."
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {filtered.map((c: any) => {
          const custOrders = orders.filter((o) => o.customerId === c.id);
          const expected = custOrders.reduce((acc, o) => acc + (o.riyal?.expected || 0), 0);
          const received = custOrders.reduce((acc, o) => acc + (o.riyal?.received || 0), 0);
          const due = Math.max(0, expected - received);

          return (
            <TouchableOpacity
              key={c.id}
              style={[styles.rowCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => setSelectedCust(c)}
              activeOpacity={0.8}
            >
              <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                <Text style={styles.avatarText}>{(c.name || 'C').charAt(0).toUpperCase()}</Text>
              </View>

              <View style={styles.info}>
                <Text style={[styles.name, { color: colors.text }]}>{c.name}</Text>
                <Text style={[styles.phone, { color: colors.textSecondary }]}>{c.mobile}</Text>
              </View>

              <View style={styles.right}>
                {due > 0 ? (
                  <View style={[styles.dueBadge, { backgroundColor: colors.crimsonGlow }]}>
                    <Text style={[styles.dueText, { color: colors.crimson }]}>{due} SAR Due</Text>
                  </View>
                ) : (
                  <View style={[styles.settledBadge, { backgroundColor: colors.emeraldGlow }]}>
                    <Text style={[styles.settledText, { color: colors.emerald }]}>Settled</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 12, borderBottomWidth: 1 },
  searchBar: { flexDirection: 'row', alignItems: 'center', height: 40, paddingHorizontal: 12, borderRadius: 12, gap: 8 },
  input: { flex: 1, fontSize: 12 },
  content: { padding: 14, gap: 10 },
  rowCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 14, borderWidth: 1, gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#ffffff', fontSize: 16, fontWeight: '900' },
  info: { flex: 1 },
  name: { fontSize: 13, fontWeight: '800' },
  phone: { fontSize: 11 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dueBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  dueText: { fontSize: 10, fontWeight: '800' },
  settledBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  settledText: { fontSize: 10, fontWeight: '800' },
});
