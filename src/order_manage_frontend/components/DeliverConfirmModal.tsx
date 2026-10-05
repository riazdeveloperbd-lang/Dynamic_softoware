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
import * as Clipboard from 'expo-clipboard';
import { Order } from '@/types/ledger';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

interface DeliverConfirmModalProps {
  order: Order | null;
  visible: boolean;
  onClose: () => void;
}

export function DeliverConfirmModal({ order, visible, onClose }: DeliverConfirmModalProps) {
  const { confirmDelivery } = useLedger();
  const { colors, isDark } = useAppTheme();

  const [last4, setLast4] = useState('');
  const [proof, setProof] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!order) return null;

  const handleCopyAccount = async () => {
    await Clipboard.setStringAsync(order.recipientNumber);
  };

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

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await confirmDelivery({
        orderId: order.id,
        last4: last4.trim() || undefined,
        proof,
        deliveryDescription: notes.trim() || undefined,
      });
      setLast4('');
      setProof(null);
      setNotes('');
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const orderNo = `TR-${String(order.serial).padStart(4, '0')}`;

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
            <Text style={[styles.title, { color: colors.text }]}>Confirm Delivery</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} contentContainerStyle={styles.scrollContent}>
            {/* Order Card Preview */}
            <View
              style={[
                styles.orderSummary,
                { backgroundColor: colors.card, borderColor: colors.borderPrimary },
              ]}>
              <View style={styles.orderSummaryTop}>
                <Text style={[styles.orderSummaryTitle, { color: colors.text }]}>{orderNo}</Text>
                <Text style={[styles.orderSummaryAmt, { color: colors.primary }]}>
                  ৳{order.amount.toLocaleString()}
                </Text>
              </View>
              <Text style={[styles.orderSummarySub, { color: colors.textSecondary }]}>
                {order.customerName} • {order.customerMobile}
              </Text>
              <View style={[styles.accountRow, { borderTopColor: colors.border }]}>
                <Text style={[styles.accountText, { color: colors.textSecondary }]}>
                  Account:{' '}
                  <Text style={{ color: colors.text, fontWeight: '700' }}>
                    {order.recipientNumber}
                  </Text>
                </Text>
                <TouchableOpacity
                  style={[
                    styles.copyBtn,
                    { backgroundColor: colors.cardElevated, borderColor: colors.border },
                  ]}
                  onPress={handleCopyAccount}>
                  <Ionicons name="copy-outline" size={13} color={colors.primary} />
                  <Text style={[styles.copyBtnText, { color: colors.primary }]}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Last 4 Digits */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Delivery — Last 4 Digits (Optional)
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
                placeholder="e.g. 4821"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                maxLength={4}
                value={last4}
                onChangeText={(val) => setLast4(val.replace(/\D/g, '').slice(0, 4))}
              />
            </View>

            {/* Proof Screenshot */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Screenshot Proof (Optional)
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
                  Choose Image from Gallery
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

            {/* Notes */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Delivery Description
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
                placeholder="Notes about this delivery"
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={3}
                value={notes}
                onChangeText={setNotes}
              />
            </View>

            <View
              style={[
                styles.noticeBox,
                {
                  backgroundColor: isDark
                    ? 'rgba(255,255,255,0.04)'
                    : 'rgba(0,0,0,0.03)',
                },
              ]}>
              <Text style={[styles.noticeText, { color: colors.textSecondary }]}>
                Confirming moves this order to Delivered and adds ৳{order.amount.toLocaleString()} to
                your Payables Due calculation.
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.confirmBtn, { backgroundColor: colors.emerald }]}
              onPress={handleConfirm}
              disabled={isSubmitting}
              activeOpacity={0.8}>
              <Ionicons name="checkmark-sharp" size={20} color="#ffffff" />
              <Text style={styles.confirmBtnText}>
                {isSubmitting ? 'Confirming...' : 'Yes, Mark Delivered'}
              </Text>
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
  orderSummary: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    gap: 4,
  },
  orderSummaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderSummaryTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  orderSummaryAmt: {
    fontSize: 17,
    fontWeight: '800',
  },
  orderSummarySub: {
    fontSize: 12.5,
  },
  accountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
  },
  accountText: {
    fontSize: 13,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.sm,
    borderWidth: 1,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: '700',
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
    minHeight: 64,
    textAlignVertical: 'top',
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
  noticeBox: {
    padding: 12,
    borderRadius: Radius.md,
    marginTop: 4,
  },
  noticeText: {
    fontSize: 12,
    lineHeight: 18,
  },
  confirmBtn: {
    paddingVertical: 14,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  confirmBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});
