import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { OrderCard } from '@/components/OrderCard';

export default function DeliveriesVarient2({ onBack }: any) {
  const { orders, totals } = useLedger();
  const { colors } = useAppTheme();

  const delivered = orders.filter((o) => o.status === 'delivered');

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.topRow}>
          {onBack && (
            <TouchableOpacity onPress={onBack}>
              <Ionicons name="arrow-back" size={20} color={colors.text} />
            </TouchableOpacity>
          )}
          <Text style={[styles.title, { color: colors.text }]}>Delivery Archive V2</Text>
          <View style={[styles.badge, { backgroundColor: `${colors.emerald}20` }]}>
            <Text style={[styles.badgeText, { color: colors.emerald }]}>
              ৳{totals.totalDeliveryAmt.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {delivered.map((order: any) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 14, borderBottomWidth: 1 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  title: { fontSize: 15, fontWeight: '800' },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '800' },
  content: { padding: 14, gap: 10 },
});
