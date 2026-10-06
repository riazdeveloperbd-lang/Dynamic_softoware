import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { OrderCard } from '@/components/OrderCard';

export default function HomeVarient3({
  onOpenNewOrder,
  onOpenMakePayment,
  onOpenReceiveRiyal,
  onOpenCalculator,
  onNavigateToTab,
  onMarkDelivered,
}: any) {
  const { totals, orders } = useLedger();
  const { colors } = useAppTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={styles.content}>
      {/* V3 Glassmorphic Glow Card */}
      <View
        style={[
          styles.v3Banner,
          {
            backgroundColor: `${colors.primary}18`,
            borderColor: `${colors.primary}40`,
          },
        ]}
      >
        <View style={styles.v3BannerTop}>
          <View>
            <Text style={styles.v3Tag}>GLASSMORPHIC FINTECH V3</Text>
            <Text style={[styles.v3Val, { color: '#ffffff' }]}>
              ৳{totals.totalOrderAmt.toLocaleString()}
            </Text>
          </View>
          <View style={[styles.v3GlowCircle, { backgroundColor: colors.primary }]}>
            <Ionicons name="sparkles" size={20} color="#ffffff" />
          </View>
        </View>

        <View style={styles.v3MetricsGrid}>
          <View style={styles.v3MetricBox}>
            <Text style={styles.v3MetricLabel}>Collected SAR</Text>
            <Text style={[styles.v3MetricVal, { color: colors.emerald }]}>
              {totals.riyalReceived} SAR
            </Text>
          </View>
          <View style={styles.v3MetricBox}>
            <Text style={styles.v3MetricLabel}>Remittance Rate</Text>
            <Text style={[styles.v3MetricVal, { color: '#ffffff' }]}>
              {totals.exchangeRate} BDT
            </Text>
          </View>
        </View>
      </View>

      {/* Floating Action Cards Grid */}
      <View style={styles.grid}>
        <TouchableOpacity
          style={[styles.gridCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={onOpenNewOrder}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.primary }]}>
            <Ionicons name="add" size={20} color="#ffffff" />
          </View>
          <Text style={[styles.gridTitle, { color: colors.text }]}>Add Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.gridCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={onOpenReceiveRiyal}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.emerald }]}>
            <Ionicons name="cash" size={20} color="#ffffff" />
          </View>
          <Text style={[styles.gridTitle, { color: colors.text }]}>Settle Riyal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.gridCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={onOpenCalculator}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.crimson }]}>
            <Ionicons name="calculator" size={20} color="#ffffff" />
          </View>
          <Text style={[styles.gridTitle, { color: colors.text }]}>Calculator</Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <View style={styles.section}>
        <Text style={[styles.secTitle, { color: colors.text }]}>Active Orders Stream</Text>
        {orders.slice(0, 4).map((order: any) => (
          <OrderCard key={order.id} order={order} onMarkDelivered={() => onMarkDelivered(order)} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 14 },
  v3Banner: { padding: 18, borderRadius: 24, borderWidth: 1, gap: 14 },
  v3BannerTop: { flexDirection: 'row', alignItems: 'center', justify: 'space-between' },
  v3Tag: { fontSize: 10, fontWeight: '800', color: '#34d399', letterSpacing: 1 },
  v3Val: { fontSize: 24, fontWeight: '900', marginTop: 4 },
  v3GlowCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  v3MetricsGrid: { flexDirection: 'row', gap: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' },
  v3MetricBox: { flex: 1 },
  v3MetricLabel: { fontSize: 10, color: '#9ca3af', fontWeight: '600' },
  v3MetricVal: { fontSize: 14, fontWeight: '800', marginTop: 2 },
  grid: { flexDirection: 'row', gap: 10 },
  gridCard: { flex: 1, padding: 12, borderRadius: 18, borderWidth: 1, alignItems: 'center', gap: 8 },
  iconCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  gridTitle: { fontSize: 11, fontWeight: '700' },
  section: { gap: 10 },
  secTitle: { fontSize: 14, fontWeight: '800' },
});
