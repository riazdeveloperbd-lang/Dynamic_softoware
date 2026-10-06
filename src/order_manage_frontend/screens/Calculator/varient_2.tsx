import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function CalculatorVarient2({ onBack }: any) {
  const { settings } = useLedger();
  const { colors } = useAppTheme();
  const [sar, setSar] = useState('100');
  const [margin, setMargin] = useState('0');

  const sarVal = Number(sar) || 0;
  const marginVal = Number(margin) || 0;
  const rate = settings.exchangeRate * (1 + marginVal / 100);
  const bdtVal = sarVal * rate;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* V2 Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.topRow}>
          {onBack && (
            <TouchableOpacity onPress={onBack}>
              <Ionicons name="arrow-back" size={20} color={colors.text} />
            </TouchableOpacity>
          )}
          <Text style={[styles.title, { color: colors.text }]}>FX Matrix Converter V2</Text>
          <View style={[styles.rateBadge, { backgroundColor: `${colors.primary}20` }]}>
            <Text style={[styles.rateText, { color: colors.primary }]}>Rate: ৳{rate.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Input Card */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Enter SAR Amount</Text>
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            value={sar}
            onChangeText={setSar}
            keyboardType="numeric"
            placeholder="0 SAR"
            placeholderTextColor={colors.textSecondary}
          />

          {/* Quick Preset Chips */}
          <View style={styles.presetsRow}>
            {['100', '500', '1000', '5000'].map((preset) => (
              <TouchableOpacity
                key={preset}
                style={[
                  styles.presetChip,
                  {
                    backgroundColor: sar === preset ? colors.primary : colors.cardElevated,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setSar(preset)}
              >
                <Text
                  style={[
                    styles.presetText,
                    { color: sar === preset ? '#ffffff' : colors.text },
                  ]}
                >
                  {preset} SAR
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Spread Margin */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Spread Margin (%)</Text>
          <View style={styles.marginRow}>
            {['0', '0.5', '1.0', '1.5', '2.0'].map((m) => (
              <TouchableOpacity
                key={m}
                style={[
                  styles.marginChip,
                  {
                    backgroundColor: margin === m ? colors.emerald : colors.cardElevated,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setMargin(m)}
              >
                <Text style={{ color: margin === m ? '#ffffff' : colors.text, fontSize: 11, fontWeight: '700' }}>
                  +{m}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Result Card */}
        <View
          style={[
            styles.resultCard,
            { backgroundColor: `${colors.primary}18`, borderColor: `${colors.primary}40` },
          ]}
        >
          <Text style={[styles.resLabel, { color: colors.textSecondary }]}>Net BDT Payout</Text>
          <Text style={[styles.resVal, { color: colors.primary }]}>৳{bdtVal.toLocaleString('en-US', { maximumFractionDigits: 2 })}</Text>
          <Text style={[styles.resSub, { color: colors.textSecondary }]}>
            {sarVal} SAR × ৳{rate.toFixed(2)} per SAR
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 14, borderBottomWidth: 1 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  title: { fontSize: 15, fontWeight: '800' },
  rateBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  rateText: { fontSize: 11, fontWeight: '800' },
  content: { padding: 14, gap: 12 },
  card: { padding: 14, borderRadius: 16, borderWidth: 1, gap: 8 },
  label: { fontSize: 11, fontWeight: '700' },
  input: { height: 44, borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, fontSize: 18, fontWeight: '800' },
  presetsRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  presetChip: { flex: 1, height: 32, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  presetText: { fontSize: 11, fontWeight: '700' },
  marginRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  marginChip: { flex: 1, height: 32, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  resultCard: { padding: 18, borderRadius: 18, borderWidth: 1, alignItems: 'center', gap: 4 },
  resLabel: { fontSize: 11, fontWeight: '700' },
  resVal: { fontSize: 28, fontWeight: '900' },
  resSub: { fontSize: 11 },
});
