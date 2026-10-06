import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function CalculatorVarient3({ onBack }: any) {
  const { settings } = useLedger();
  const { colors } = useAppTheme();
  const [sar, setSar] = useState('500');

  const sarVal = Number(sar) || 0;
  const rate = settings.exchangeRate;
  const bdtVal = sarVal * rate;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* V3 Glass Header */}
      <View
        style={[
          styles.glassHeader,
          {
            backgroundColor: `${colors.primary}15`,
            borderColor: `${colors.primary}30`,
          },
        ]}
      >
        <View style={styles.topRow}>
          {onBack && (
            <TouchableOpacity onPress={onBack}>
              <Ionicons name="arrow-back" size={20} color={colors.text} />
            </TouchableOpacity>
          )}
          <Text style={[styles.title, { color: colors.text }]}>Luxe FX Converter</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.heroCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.heroSub, { color: colors.textSecondary }]}>Live Official Rate</Text>
          <Text style={[styles.heroRate, { color: colors.primary }]}>1 SAR = ৳{rate.toFixed(2)} BDT</Text>

          <View style={[styles.inputBox, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={sar}
              onChangeText={setSar}
              keyboardType="numeric"
            />
            <Text style={[styles.unit, { color: colors.textSecondary }]}>SAR</Text>
          </View>

          <View style={styles.arrowBox}>
            <Ionicons name="swap-vertical" size={20} color={colors.primary} />
          </View>

          <View style={[styles.resultBox, { backgroundColor: `${colors.primary}15`, borderColor: `${colors.primary}30` }]}>
            <Text style={[styles.bdtVal, { color: colors.emerald }]}>৳{bdtVal.toLocaleString()}</Text>
            <Text style={[styles.bdtSub, { color: colors.textSecondary }]}>BDT Net Remittance</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glassHeader: { padding: 16, margin: 14, borderRadius: 18, borderWidth: 1 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { fontSize: 16, fontWeight: '900' },
  content: { paddingHorizontal: 14, paddingBottom: 24 },
  heroCard: { padding: 20, borderRadius: 24, borderWidth: 1, alignItems: 'center', gap: 10 },
  heroSub: { fontSize: 11, fontWeight: '700' },
  heroRate: { fontSize: 18, fontWeight: '900' },
  inputBox: { flexDirection: 'row', alignItems: 'center', height: 48, borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, width: '100%' },
  input: { flex: 1, fontSize: 20, fontWeight: '800' },
  unit: { fontSize: 12, fontWeight: '800' },
  arrowBox: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  resultBox: { width: '100%', padding: 16, borderRadius: 16, borderWidth: 1, alignItems: 'center', gap: 2 },
  bdtVal: { fontSize: 28, fontWeight: '900' },
  bdtSub: { fontSize: 11, fontWeight: '700' },
});
