import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

interface CalculatorViewProps {
  onBack: () => void;
}

export function CalculatorView({ onBack }: CalculatorViewProps) {
  const { settings, updateExchangeRate } = useLedger();
  const { colors, isDark } = useAppTheme();

  const [sarInput, setSarInput] = useState('');
  const [rateInput, setRateInput] = useState(String(settings.exchangeRate));

  const sar = Number(sarInput) || 0;
  const rate = Number(rateInput) || 32;
  const bdt = sar * rate;

  const handleRateChange = (val: string) => {
    setRateInput(val);
    const n = Number(val);
    if (Number.isFinite(n) && n > 0) {
      updateExchangeRate(n);
    }
  };

  const quickSar = [100, 500, 1000, 2000, 5000];

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.backRow, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { backgroundColor: colors.cardElevated, borderColor: colors.border },
          ]}
          onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.backTitle, { color: colors.text }]}>Riyal → Taka Calculator</Text>
          <Text style={[styles.backSub, { color: colors.primaryLight }]}>Live currency conversion</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.borderPrimary },
          ]}>
          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Saudi Riyal (SAR)</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.cardElevated,
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              placeholder="0"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={sarInput}
              onChangeText={setSarInput}
            />
          </View>

          <View style={styles.quickRow}>
            {quickSar.map((val) => (
              <TouchableOpacity
                key={val}
                style={[
                  styles.quickChip,
                  { backgroundColor: colors.cardElevated, borderColor: colors.border },
                ]}
                onPress={() => setSarInput(String(val))}>
                <Text style={[styles.quickChipText, { color: colors.primaryLight }]}>
                  {val} SAR
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.field, { marginTop: 14 }]}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Exchange Rate (1 SAR = ৳ BDT)
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.cardElevated,
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              placeholder="32"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={rateInput}
              onChangeText={handleRateChange}
            />
          </View>

          {/* Converted Output Hero */}
          <View
            style={[
              styles.heroBox,
              { backgroundColor: colors.cardElevated, borderColor: colors.borderPrimary },
            ]}>
            <Text style={[styles.heroLabel, { color: colors.textSecondary }]}>
              Converted Bangladesh Taka
            </Text>
            <Text style={[styles.heroMain, { color: colors.primary }]}>৳{bdt.toLocaleString()}</Text>
            <Text style={[styles.heroFoot, { color: colors.textMuted }]}>
              {sar.toLocaleString()} SAR × {rate} BDT per Riyal
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  backTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  backSub: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: Spacing.md,
  },
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    gap: 8,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  input: {
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 18,
    fontWeight: '700',
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2,
  },
  quickChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.sm,
    borderWidth: 1,
  },
  quickChipText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  heroBox: {
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    marginTop: 14,
  },
  heroLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  heroMain: {
    fontSize: 28,
    fontWeight: '900',
    marginVertical: 4,
  },
  heroFoot: {
    fontSize: 11.5,
  },
});
