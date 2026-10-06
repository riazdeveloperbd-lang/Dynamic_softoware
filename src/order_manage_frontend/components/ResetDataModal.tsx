import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { AppModal } from './AppModal';

interface ResetDataModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ResetDataModal({ visible, onClose }: ResetDataModalProps) {
  const { resetAllData } = useLedger();
  const { colors, isDark } = useAppTheme();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [resetWord, setResetWord] = useState('');
  const [error, setError] = useState('');

  const handleReset = () => {
    if (resetWord.trim().toUpperCase() !== 'RESET') {
      setError('Type RESET exactly to confirm');
      return;
    }

    const result = resetAllData(email, username, pin);
    if (!result.success) {
      setError(result.error || 'Reset failed');
      return;
    }

    setEmail('');
    setUsername('');
    setPin('');
    setResetWord('');
    setError('');
    onClose();
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
            <Text style={[styles.title, { color: colors.crimson }]}>Reset All Data</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} contentContainerStyle={styles.scrollContent}>
            <View
              style={[
                styles.warningBox,
                {
                  backgroundColor: colors.crimsonGlow,
                  borderColor: colors.crimson,
                },
              ]}>
              <View style={styles.warningHeader}>
                <Ionicons name="warning-outline" size={20} color={colors.crimson} />
                <Text style={[styles.warningTitle, { color: colors.crimson }]}>Danger Zone</Text>
              </View>
              <Text style={[styles.warningText, { color: colors.textSecondary }]}>
                This permanently clears all orders, deliveries, payments, customer directory, Riyal
                ledger, and activity logs. Your admin profile remains protected.
              </Text>
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Profile Email (e.g. admin@trconnect.org) *
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
                placeholder="admin@trconnect.org"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Username (trconnect.org) *
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
                placeholder="trconnect.org"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Current PIN *</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                placeholder="4-digit PIN"
                placeholderTextColor={colors.textMuted}
                secureTextEntry
                keyboardType="numeric"
                maxLength={4}
                value={pin}
                onChangeText={setPin}
              />
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Type RESET to confirm *
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
                placeholder="RESET"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="characters"
                value={resetWord}
                onChangeText={setResetWord}
              />
            </View>

            {error ? (
              <Text style={[styles.errText, { color: colors.crimson }]}>{error}</Text>
            ) : null}

            <TouchableOpacity
              style={[styles.resetBtn, { backgroundColor: colors.crimson }]}
              onPress={handleReset}
              activeOpacity={0.8}>
              <Ionicons name="trash-outline" size={18} color="#fff" />
              <Text style={styles.resetBtnText}>Confirm Full Data Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={[styles.cancelBtnText, { color: colors.textSecondary }]}>
                Cancel & Go Back
              </Text>
            </TouchableOpacity>
          </ScrollView>
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
    maxHeight: '90%',
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
    paddingHorizontal: Spacing.lg,
  },
  scrollContent: {
    paddingVertical: Spacing.md,
    gap: 12,
  },
  warningBox: {
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: 6,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  warningText: {
    fontSize: 12,
    lineHeight: 18,
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
    fontSize: 14.5,
  },
  errText: {
    fontSize: 12.5,
    fontWeight: '700',
    textAlign: 'center',
  },
  resetBtn: {
    paddingVertical: 14,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  resetBtnText: {
    color: '#fff',
    fontSize: 14.5,
    fontWeight: '800',
  },
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  cancelBtnText: {
    fontSize: 13,
  },
});
