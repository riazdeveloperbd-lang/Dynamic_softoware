import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function FinanceVarient3({ onOpenMakePayment, onOpenSettleModal }: any) {
  const { totals } = useLedger();
  const { colors } = useAppTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={styles.content}>
      <View style={[styles.v3Glow, { backgroundColor: `${colors.primary}18`, borderColor: `${colors.primary}35` }]}>
        <Ionicons name="wallet" size={28} color={colors.primary} />
        <Text style={[styles.v3Val, { color: '#ffffff' }]}>৳{totals.totalOrderAmt.toLocaleString()}</Text>
        <Text style={styles.v3Label}>Total Remittance Inflows</Text>
      </View>

      <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={onOpenMakePayment}>
        <Ionicons name="add-circle" size={18} color="#ffffff" />
        <Text style={styles.btnText}>New Payment Outflow</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 14 },
  v3Glow: { padding: 20, borderRadius: 24, borderWidth: 1, alignItems: 'center', gap: 6 },
  v3Val: { fontSize: 24, fontWeight: '900' },
  v3Label: { fontSize: 11, color: '#9ca3af', fontWeight: '600' },
  btn: { height: 46, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnText: { color: '#ffffff', fontSize: 13, fontWeight: '800' },
});
