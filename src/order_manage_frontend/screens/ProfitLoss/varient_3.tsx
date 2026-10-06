import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function ProfitLossVarient3({ onBack }: any) {
  const { totals } = useLedger();
  const { colors } = useAppTheme();
  const isProfit = totals.profitLoss >= 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View
        style={[
          styles.glassHeader,
          {
            backgroundColor: isProfit ? `${colors.emerald}15` : `${colors.crimson}15`,
            borderColor: isProfit ? `${colors.emerald}30` : `${colors.crimson}30`,
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
            <Text style={[styles.title, { color: colors.text }]}>Luxe PnL Statement</Text>
            <Text style={[styles.sub, { color: isProfit ? colors.emerald : colors.crimson }]}>
              {isProfit ? 'Profit Margin Verified ✓' : 'Deficit Alert'}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.hero, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.heroTitle, { color: colors.textSecondary }]}>Net Operating Margin</Text>
          <Text style={[styles.heroVal, { color: isProfit ? colors.emerald : colors.crimson }]}>
            ৳{Math.abs(totals.profitLoss).toLocaleString()}
          </Text>

          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                {
                  backgroundColor: isProfit ? colors.emerald : colors.crimson,
                  width: `${Math.min(100, Math.max(15, (totals.totalDeliveryAmt / (totals.totalOrderAmt || 1)) * 100))}%`,
                },
              ]}
            />
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
  sub: { fontSize: 11, fontWeight: '700', marginTop: 1 },
  content: { paddingHorizontal: 14, paddingBottom: 24 },
  hero: { padding: 20, borderRadius: 22, borderWidth: 1, alignItems: 'center', gap: 6 },
  heroTitle: { fontSize: 11, fontWeight: '700' },
  heroVal: { fontSize: 32, fontWeight: '900' },
  progressBarBg: { width: '100%', height: 8, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.1)', marginTop: 10, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
});
