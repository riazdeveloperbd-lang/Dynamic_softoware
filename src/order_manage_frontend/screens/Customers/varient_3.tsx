import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { CustomerDetailView } from '@/views/CustomerDetailView';

export default function CustomersVarient3() {
  const { customers, orders } = useLedger();
  const { colors } = useAppTheme();
  const [selectedCust, setSelectedCust] = useState<any>(null);

  if (selectedCust) {
    return <CustomerDetailView customer={selectedCust} onBack={() => setSelectedCust(null)} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View
        style={[
          styles.glassHeader,
          {
            backgroundColor: `${colors.primary}15`,
            borderColor: `${colors.primary}30`,
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>VIP Portfolio Directory</Text>
        <Text style={[styles.sub, { color: colors.primary }]}>{customers.length} Verified Clients</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {customers.map((c: any) => {
          const custOrders = orders.filter((o) => o.customerId === c.id);
          const totalVolume = custOrders.reduce((acc, o) => acc + (o.amount || 0), 0);

          return (
            <TouchableOpacity
              key={c.id}
              style={[styles.portfolioCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => setSelectedCust(c)}
              activeOpacity={0.8}
            >
              <View style={styles.top}>
                <View style={[styles.glowRing, { borderColor: colors.primary }]}>
                  <Text style={[styles.avatarTxt, { color: colors.primary }]}>
                    {(c.name || 'C').charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.mid}>
                  <Text style={[styles.name, { color: colors.text }]}>{c.name}</Text>
                  <Text style={[styles.mobile, { color: colors.textSecondary }]}>{c.mobile}</Text>
                </View>
              </View>

              <View style={[styles.bottom, { borderTopColor: colors.border }]}>
                <Text style={[styles.volLabel, { color: colors.textSecondary }]}>Volume</Text>
                <Text style={[styles.volVal, { color: colors.emerald }]}>৳{totalVolume.toLocaleString()}</Text>
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
  glassHeader: { padding: 16, margin: 14, borderRadius: 18, borderWidth: 1 },
  title: { fontSize: 16, fontWeight: '900' },
  sub: { fontSize: 11, fontWeight: '700', marginTop: 1 },
  content: { paddingHorizontal: 14, paddingBottom: 24, gap: 12 },
  portfolioCard: { padding: 14, borderRadius: 18, borderWidth: 1, gap: 10 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  glowRing: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { fontSize: 18, fontWeight: '900' },
  mid: { flex: 1 },
  name: { fontSize: 14, fontWeight: '800' },
  mobile: { fontSize: 11.5 },
  bottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTopWidth: 1 },
  volLabel: { fontSize: 11, fontWeight: '700' },
  volVal: { fontSize: 13, fontWeight: '900' },
});
