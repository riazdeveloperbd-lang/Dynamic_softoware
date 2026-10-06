import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomerLedgerEntry } from '@/types/ledger';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { AppModal } from './AppModal';

interface RiyalSettleModalProps {
  entry: CustomerLedgerEntry | null;
  visible: boolean;
  onClose: () => void;
}

export function RiyalSettleModal({ entry, visible, onClose }: RiyalSettleModalProps) {
  const { settleRiyal, customers } = useLedger();
  const { colors, isDark } = useAppTheme();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!entry) return null;

  const customer = customers.find((c) => c.id === entry.customerId);
  const due = Math.max(0, entry.expected - entry.received);

  const handleSubmit = async () => {
    const num = Number(amount);
    if (!num || num <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (num > due + 0.001) {
      setError(`Amount cannot exceed the due amount (${due} SAR)`);
      return;
    }

    setIsSubmitting(true);
    try {
      await settleRiyal(entry.id, num);
      setAmount('');
      setError('');
      onClose();
    } catch (e) {
      setError('Could not settle payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppModal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.sheet, { backgroundColor: colors.cardElevated }]}>
          <View
            style={[
              styles.handle,
              { backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' },
            ]}
          />

          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.title, { color: colors.text }]}>Receive Riyal</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Customer</Text>
              <Text
                style={[
                  styles.readOnlyText,
                  {
                    color: colors.text,
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}>
                {customer?.name || 'Customer'} • {customer?.mobile || ''}
              </Text>
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Outstanding Due Amount
              </Text>
              <View
                style={[
                  styles.dueHighlight,
                  {
                    backgroundColor: colors.crimsonGlow,
                    borderColor: colors.crimson,
                  },
                ]}>
                <Text style={[styles.dueHighlightText, { color: colors.crimson }]}>{due} SAR</Text>
              </View>
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Riyal Received Now (SAR) *
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                placeholder={`Max ${due}`}
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            {error ? (
              <Text style={[styles.errText, { color: colors.crimson }]}>{error}</Text>
            ) : null}

            <TouchableOpacity
              style={[styles.confirmBtn, { backgroundColor: colors.emerald }]}
              onPress={handleSubmit}
              disabled={isSubmitting}
              activeOpacity={0.8}>
              <Ionicons name="cash-outline" size={20} color="#ffffff" />
              <Text style={styles.confirmBtnText}>
                {isSubmitting ? 'Recording...' : 'Confirm Received Riyal'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingBottom: Spacing.xl,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  closeBtn: {
    padding: 4,
  },
  body: {
    padding: Spacing.lg,
    gap: 14,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  readOnlyText: {
    fontSize: 14,
    padding: 12,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  dueHighlight: {
    padding: 12,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  dueHighlightText: {
    fontSize: 22,
    fontWeight: '900',
  },
  input: {
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  errText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  confirmBtn: {
    paddingVertical: 14,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  confirmBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});
