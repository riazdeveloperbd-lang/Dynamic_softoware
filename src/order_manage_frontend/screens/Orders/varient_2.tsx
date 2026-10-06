import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { OrderCard } from '@/components/OrderCard';

export default function OrdersVarient2({ onOpenNewOrder, onMarkDelivered }: any) {
  const { orders } = useLedger();
  const { colors } = useAppTheme();
  const [search, setSearch] = useState('');

  const filtered = orders.filter(
    (o) =>
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.serial.toString().includes(search)
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={styles.content}>
      <View style={[styles.v2Bar, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Ionicons name="search" size={16} color={colors.textSecondary} />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Filter by Serial or Customer..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]} onPress={onOpenNewOrder}>
          <Ionicons name="add" size={16} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {filtered.map((order: any) => (
          <OrderCard key={order.id} order={order} onMarkDelivered={() => onMarkDelivered(order)} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 14, gap: 12 },
  v2Bar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, height: 44, borderRadius: 14, borderWidth: 1, gap: 8 },
  input: { flex: 1, fontSize: 12 },
  addBtn: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  list: { gap: 10 },
});
