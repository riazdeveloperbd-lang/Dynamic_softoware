import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { OrderCard } from '@/components/OrderCard';

export default function DeliveriesVarient3({ onBack }: any) {
  const { orders, totals } = useLedger();
  const { colors } = useAppTheme();

  const delivered = orders.filter((o) => o.status === 'delivered');

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View
        style={[
          styles.glassHeader,
          {
            backgroundColor: `${colors.emerald}15`,
            borderColor: `${colors.emerald}30`,
          },
        ]}
      >
        <View style={styles.topRow}>
          {onBack && (
            <TouchableOpacity onPress={onBack}>
              <Ionicons name="arrow-back" size={20} color={colors.text} />
            </TouchableOpacity>
          )}
          <View>
            <Text style={[styles.title, { color: colors.text }]}>Fulfilled Stream</Text>
            <Text style={[styles.sub, { color: colors.emerald }]}>
              {delivered.length} Completed • ৳{totals.totalDeliveryAmt.toLocaleString()}
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
  glassHeader: { padding: 16, margin: 14, borderRadius: 18, borderWidth: 1 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { fontSize: 16, fontWeight: '900' },
  sub: { fontSize: 11, fontWeight: '700', marginTop: 1 },
  content: { paddingHorizontal: 14, paddingBottom: 24, gap: 10 },
});
