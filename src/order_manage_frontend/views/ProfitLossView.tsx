import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

interface ProfitLossViewProps {
  onBack: () => void;
}

export function ProfitLossView({ onBack }: ProfitLossViewProps) {
  const { totals } = useLedger();
  const { colors, isDark } = useAppTheme();

  const isProfit = totals.profitLoss >= 0;

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
          <Text style={[styles.backTitle, { color: colors.text }]}>Profit & Loss Statement</Text>
          <Text style={[styles.backSub, { color: colors.primaryLight }]}>
            Executive remittance margin analysis
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Net Outcome Hero Card */}
        <View
          style={[
            styles.heroCard,
            {
              backgroundColor: colors.card,
              borderColor: isProfit ? colors.emerald : colors.crimson,
            },
          ]}>
          <Text style={[styles.heroSub, { color: colors.textMuted }]}>
            {isProfit ? 'NET PROFIT' : 'NET LOSS'}
          </Text>
          <Text
            style={[
              styles.heroMain,
              { color: isProfit ? colors.emerald : colors.crimson },
            ]}>
            ৳{Math.abs(totals.profitLoss).toLocaleString()}
          </Text>
          <Text style={[styles.heroFoot, { color: colors.textSecondary }]}>
            Calculated as: Converted Riyal Value (৳{totals.riyalValue.toLocaleString()}) − Total
            Delivered (৳{totals.totalDeliveryAmt.toLocaleString()})
          </Text>
        </View>

        {/* Breakdown Grid */}
        <View style={styles.grid}>
          <View
            style={[
              styles.box,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}>
            <Text style={[styles.boxLabel, { color: colors.textMuted }]}>Riyal Received</Text>
            <Text style={[styles.boxVal, { color: colors.text }]}>
              {totals.riyalReceived.toLocaleString()} SAR
            </Text>
            <Text style={[styles.boxSub, { color: colors.textSecondary }]}>
              Total customer intake
            </Text>
          </View>

          <View
            style={[
              styles.box,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}>
            <Text style={[styles.boxLabel, { color: colors.textMuted }]}>Exchange Rate</Text>
            <Text style={[styles.boxVal, { color: colors.text }]}>৳{totals.exchangeRate}</Text>
            <Text style={[styles.boxSub, { color: colors.textSecondary }]}>
              1 SAR = ৳{totals.exchangeRate} BDT
            </Text>
          </View>
        </View>

        <View style={styles.grid}>
          <View
            style={[
              styles.box,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}>
            <Text style={[styles.boxLabel, { color: colors.textMuted }]}>
              Converted Riyal Value
            </Text>
            <Text style={[styles.boxVal, { color: colors.primary }]}>
              ৳{totals.riyalValue.toLocaleString()}
            </Text>
            <Text style={[styles.boxSub, { color: colors.textSecondary }]}>
              SAR × Exchange Rate
            </Text>
          </View>

          <View
            style={[
              styles.box,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}>
            <Text style={[styles.boxLabel, { color: colors.textMuted }]}>Total Delivered</Text>
            <Text style={[styles.boxVal, { color: colors.text }]}>
              ৳{totals.totalDeliveryAmt.toLocaleString()}
            </Text>
            <Text style={[styles.boxSub, { color: colors.textSecondary }]}>
              Completed delivery costs
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.noteBox,
            { backgroundColor: colors.cardElevated, borderColor: colors.borderPrimary },
          ]}>
          <Ionicons name="information-circle-outline" size={18} color={colors.primary} />
          <Text style={[styles.noteText, { color: colors.textSecondary }]}>
            Net margin reflects realized deliveries only. Pending orders in the queue are not deducted
            from profit until physically delivered.
          </Text>
        </View>
      </ScrollView>
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
    gap: 12,
  },
  heroCard: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1.5,
    gap: 4,
  },
  heroSub: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  heroMain: {
    fontSize: 32,
    fontWeight: '900',
    marginVertical: 4,
  },
  heroFoot: {
    fontSize: 12,
    lineHeight: 18,
  },
  grid: {
    flexDirection: 'row',
    gap: 10,
  },
  box: {
    flex: 1,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    justifyContent: 'space-between',
    minHeight: 90,
  },
  boxLabel: {
    fontSize: 10.5,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  boxVal: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 4,
  },
  boxSub: {
    fontSize: 10.5,
    marginTop: 4,
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    marginTop: 6,
  },
  noteText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
});
