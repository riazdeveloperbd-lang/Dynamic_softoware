import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
}

export function PaymentModal({ visible, onClose }: PaymentModalProps) {
  const { addPayment, totals } = useLedger();
  const { colors, isDark } = useAppTheme();

  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [description, setDescription] = useState('');
  const [proof, setProof] = useState<string | null>(null);
  const [error, setError] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProof(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0) {
      setError('Please enter a valid payment amount');
      return;
    }
    if (!method.trim()) {
      setError('Please specify the payment method / bank');
      return;
    }

    try {
      await addPayment({
        amount: Number(amount),
        method: method.trim(),
        description: description.trim(),
        proof,
      });
      setAmount('');
      setMethod('');
      setDescription('');
      setProof(null);
      setError('');
      onClose();
    } catch (e) {
      setError('Could not record payment');
    }
  };

  const quickMethods = ['bKash Pool', 'Nagad Pool', 'City Bank Ltd', 'Dutch-Bangla Bank', 'Brac Bank'];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.sheet, { backgroundColor: colors.cardElevated }]}>
          <View
            style={[
              styles.handle,
              { backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' },
            ]}
          />

          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.title, { color: colors.text }]}>Make Payment</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} contentContainerStyle={styles.scrollContent}>
            {/* Current Due Reminder */}
            <View
              style={[
                styles.dueBox,
                { backgroundColor: colors.card, borderColor: colors.crimson },
              ]}>
              <Text style={[styles.dueLabel, { color: colors.textMuted }]}>
                Current Outstanding Due
              </Text>
              <Text style={[styles.dueValue, { color: colors.crimson }]}>
                ৳{totals.totalDue.toLocaleString()}
              </Text>
              <Text style={[styles.dueFoot, { color: colors.textSecondary }]}>
                Total Delivered (৳{totals.totalDeliveryAmt.toLocaleString()}) − Total Paid (৳
                {totals.totalPaid.toLocaleString()})
              </Text>
            </View>

            {/* Amount */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Payment Amount (৳ BDT) *
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
                placeholder="0"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            {/* Method */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Payment Method / Channel *
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
                placeholder="e.g. City Bank Ltd, bKash Pool"
                placeholderTextColor={colors.textMuted}
                value={method}
                onChangeText={setMethod}
              />
              <View style={styles.quickMethodsRow}>
                {quickMethods.map((m) => (
                  <TouchableOpacity
                    key={m}
                    style={[
                      styles.quickMethodChip,
                      { backgroundColor: colors.card, borderColor: colors.border },
                    ]}
                    onPress={() => setMethod(m)}>
                    <Text style={[styles.quickMethodText, { color: colors.primaryLight }]}>
                      {m}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Description */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Payment Description (Optional)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                placeholder="Reference number, recipient notes, or slip details"
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={2}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            {/* Payment Proof */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Payment Receipt / Slip Proof (Optional)
              </Text>
              <TouchableOpacity
                style={[
                  styles.uploadBtn,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.borderPrimary,
                  },
                ]}
                onPress={pickImage}>
                <Ionicons name="camera-outline" size={20} color={colors.primary} />
                <Text style={[styles.uploadBtnText, { color: colors.primaryLight }]}>
                  Upload Receipt Screenshot
                </Text>
              </TouchableOpacity>
              {proof && (
                <View style={[styles.imagePreviewContainer, { borderColor: colors.border }]}>
                  <Image source={{ uri: proof }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={[styles.removeImageBtn, { backgroundColor: colors.crimson }]}
                    onPress={() => setProof(null)}>
                    <Ionicons name="trash-outline" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {error ? (
              <Text style={[styles.errText, { color: colors.crimson }]}>{error}</Text>
            ) : null}

            <TouchableOpacity
              style={[styles.submitBtn, { backgroundColor: colors.primary }]}
              onPress={handleSubmit}
              activeOpacity={0.8}>
              <Ionicons name="wallet-outline" size={20} color="#ffffff" />
              <Text style={styles.submitBtnText}>Confirm Payment Record</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
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
    gap: 14,
  },
  dueBox: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    gap: 2,
  },
  dueLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  dueValue: {
    fontSize: 22,
    fontWeight: '900',
  },
  dueFoot: {
    fontSize: 11,
    marginTop: 4,
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
  textArea: {
    minHeight: 56,
    textAlignVertical: 'top',
  },
  quickMethodsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  quickMethodChip: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: Radius.sm,
    borderWidth: 1,
  },
  quickMethodText: {
    fontSize: 11,
    fontWeight: '600',
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: Radius.md,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  uploadBtnText: {
    fontWeight: '600',
    fontSize: 13.5,
  },
  imagePreviewContainer: {
    marginTop: 8,
    position: 'relative',
    borderRadius: Radius.md,
    overflow: 'hidden',
    borderWidth: 1,
  },
  previewImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  removeImageBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errText: {
    fontSize: 12.5,
    fontWeight: '700',
    textAlign: 'center',
  },
  submitBtn: {
    paddingVertical: 14,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});
