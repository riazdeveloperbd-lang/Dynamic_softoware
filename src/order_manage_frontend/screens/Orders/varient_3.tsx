import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { OrderCard } from '@/components/OrderCard';

export default function OrdersVarient3({ onOpenNewOrder, onMarkDelivered }: any) {
  const { orders } = useLedger();
  const { colors } = useAppTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={styles.content}>
      <View style={[styles.v3Header, { backgroundColor: `${colors.primary}15`, borderColor: `${colors.primary}30` }]}>
        <View style={styles.v3Row}>
          <Text style={[styles.v3Title, { color: colors.text }]}>Orders & Fulfillment</Text>
          <TouchableOpacity style={[styles.v3Add, { backgroundColor: colors.primary }]} onPress={onOpenNewOrder}>
            <Ionicons name="add" size={18} color="#ffffff" />
            <Text style={styles.v3AddText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.list}>
        {orders.map((order: any) => (
          <OrderCard key={order.id} order={order} onMarkDelivered={() => onMarkDelivered(order)} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 14 },
  v3Header: { padding: 16, borderRadius: 20, borderWidth: 1 },
  v3Row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  v3Title: { fontSize: 16, fontWeight: '900' },
  v3Add: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, gap: 4 },
  v3AddText: { color: '#ffffff', fontSize: 11, fontWeight: '800' },
  list: { gap: 10 },
});
