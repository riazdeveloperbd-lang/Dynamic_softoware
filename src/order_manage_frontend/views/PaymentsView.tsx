import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

interface PaymentsViewProps {
  onBack: () => void;
  onOpenMakePayment: () => void;
}

export function PaymentsView({ onBack, onOpenMakePayment }: PaymentsViewProps) {
  const { payments, totals } = useLedger();
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.backRow, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}
          onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.backTitle, { color: colors.text }]}>Payment History</Text>
          <Text style={[styles.backSub, { color: colors.emerald }]}>
            ৳{totals.totalPaid.toLocaleString()} total paid
          </Text>
        </View>
      </View>

      <View style={[styles.summaryBox, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}>
        <Text style={[styles.summaryText, { color: colors.textSecondary }]}>
          <Text style={[styles.summaryBold, { color: colors.text }]}>{payments.length}</Text> settlement payments recorded •{' '}
          <Text style={[styles.summaryBold, { color: colors.text }]}>৳{totals.totalPaid.toLocaleString()}</Text> total paid
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {payments.length === 0 ? (
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No payments recorded yet</Text>
          </View>
        ) : (
          payments.map((p) => (
            <View
              key={p.id}
              style={[styles.paymentCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.cardTop}>
                <View>
                  <Text style={[styles.payTitle, { color: colors.text }]}>Settlement Payment</Text>
                  <Text style={[styles.payDate, { color: colors.textMuted }]}>
                    {new Date(p.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
                <Text style={[styles.payAmt, { color: colors.emerald }]}>৳{p.amount.toLocaleString()}</Text>
              </View>

              <View style={[styles.metaRow, { borderTopColor: colors.border }]}>
                <View
                  style={[
                    styles.methodTag,
                    { backgroundColor: colors.cardElevated, borderColor: colors.border },
                  ]}>
                  <Text style={[styles.methodText, { color: colors.primaryLight }]}>{p.method}</Text>
                </View>
                <Text style={[styles.addedBy, { color: colors.textMuted }]}>Added by {p.addedBy}</Text>
              </View>

              {p.description ? (
                <Text style={[styles.descText, { color: colors.textSecondary }]}>{p.description}</Text>
              ) : null}

              {p.proof && (
                <View style={[styles.proofContainer, { borderColor: colors.border }]}>
                  <Image source={{ uri: p.proof }} style={styles.proofImage} />
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.bg, borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: colors.primary }]}
          onPress={onOpenMakePayment}
          activeOpacity={0.85}>
          <Ionicons name="add-circle-outline" size={20} color="#ffffff" />
          <Text style={styles.addBtnText}>Make New Payment</Text>
        </TouchableOpacity>
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
  summaryBox: {
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    padding: 10,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  summaryText: {
    fontSize: 12.5,
    textAlign: 'center',
  },
  summaryBold: {
    fontWeight: '800',
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: 4,
    paddingBottom: 90,
  },
  paymentCard: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    marginBottom: 10,
    gap: 6,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  payTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  payDate: {
    fontSize: 11,
    marginTop: 2,
  },
  payAmt: {
    fontSize: 18,
    fontWeight: '900',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 6,
  },
  methodTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.sm,
    borderWidth: 1,
  },
  methodText: {
    fontSize: 11,
    fontWeight: '700',
  },
  addedBy: {
    fontSize: 11,
  },
  descText: {
    fontSize: 12,
    marginTop: 2,
  },
  proofContainer: {
    marginTop: 8,
    borderRadius: Radius.md,
    overflow: 'hidden',
    borderWidth: 1,
  },
  proofImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: Radius.md,
  },
  addBtnText: {
    color: '#ffffff',
    fontSize: 14.5,
    fontWeight: '800',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 13,
  },
});
