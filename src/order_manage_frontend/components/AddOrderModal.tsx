import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Customer, DeliveryMethod } from '@/types/ledger';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { CustomerPickerModal } from './CustomerPickerModal';
import { SlideToConfirm } from './SlideToConfirm';

interface AddOrderModalProps {
  visible: boolean;
  onClose: () => void;
}

const AVAILABLE_METHODS: { id: DeliveryMethod; label: string }[] = [
  { id: 'bkash', label: 'bKash' },
  { id: 'nagad', label: 'Nagad' },
  { id: 'rocket', label: 'Rocket' },
  { id: 'upay', label: 'Upay' },
  { id: 'bank', label: 'Bank' },
];

export function AddOrderModal({ visible, onClose }: AddOrderModalProps) {
  const { addOrder } = useLedger();
  const { colors, isDark } = useAppTheme();

  const [kind, setKind] = useState<'personal' | 'agent'>('personal');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [selectedMethods, setSelectedMethods] = useState<DeliveryMethod[]>(['bkash']);
  const [amount, setAmount] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [riyalReceived, setRiyalReceived] = useState('');
  const [riyalDue, setRiyalDue] = useState('');
  const [riyalDesc, setRiyalDesc] = useState('');
  const [description, setDescription] = useState('');
  const [emergency, setEmergency] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');

  const [pickerOpen, setPickerOpen] = useState(false);

  const toggleMethod = (method: DeliveryMethod) => {
    if (selectedMethods.includes(method)) {
      if (selectedMethods.length > 1) {
        setSelectedMethods(selectedMethods.filter((m) => m !== method));
      }
    } else {
      setSelectedMethods([...selectedMethods, method]);
    }
  };

  const handleDeliveryNumberChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    setDeliveryNumber(digits);
  };

  const isFormValid =
    deliveryNumber.length === 11 &&
    Number(amount) > 0 &&
    selectedCustomer !== null &&
    description.trim().length > 0 &&
    consent;

  const handleSubmit = async () => {
    if (!isFormValid) {
      if (deliveryNumber.length !== 11) {
        setError('Delivery number must be exactly 11 digits');
      } else if (!amount || Number(amount) <= 0) {
        setError('Please enter a valid delivery amount');
      } else if (!selectedCustomer) {
        setError('Please select or add a customer');
      } else if (!description.trim()) {
        setError('Please enter an order description');
      } else if (!consent) {
        setError('Please verify and check the confirmation box');
      }
      return;
    }

    try {
      await addOrder({
        kind,
        deliveryNumber,
        deliveryMethods: selectedMethods,
        amount: Number(amount),
        customerId: selectedCustomer.id,
        customerName: selectedCustomer.name,
        customerMobile: selectedCustomer.mobile,
        riyalReceived: Number(riyalReceived || 0),
        riyalDue: Number(riyalDue || 0),
        riyalDescription: riyalDesc.trim(),
        description: description.trim(),
        emergency,
      });

      // Reset
      setDeliveryNumber('');
      setAmount('');
      setSelectedCustomer(null);
      setRiyalReceived('');
      setRiyalDue('');
      setRiyalDesc('');
      setDescription('');
      setEmergency(false);
      setConsent(false);
      setError('');
      onClose();
    } catch (e) {
      setError('Failed to create order');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}>
        <View style={[styles.sheet, { backgroundColor: colors.cardElevated }]}>
          <View
            style={[
              styles.handle,
              { backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' },
            ]}
          />

          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.title, { color: colors.text }]}>Add New Order</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} contentContainerStyle={styles.scrollContent}>
            {/* Order Type Toggle */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Order Type</Text>
              <View style={styles.radioRow}>
                <TouchableOpacity
                  style={[
                    styles.radioChip,
                    {
                      backgroundColor: kind === 'personal' ? colors.primary : colors.card,
                      borderColor: kind === 'personal' ? colors.primaryLight : colors.border,
                    },
                  ]}
                  onPress={() => setKind('personal')}>
                  <Text
                    style={[
                      styles.radioChipText,
                      { color: kind === 'personal' ? '#ffffff' : colors.textSecondary },
                    ]}>
                    Personal
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.radioChip,
                    {
                      backgroundColor: kind === 'agent' ? colors.primary : colors.card,
                      borderColor: kind === 'agent' ? colors.primaryLight : colors.border,
                    },
                  ]}
                  onPress={() => setKind('agent')}>
                  <Text
                    style={[
                      styles.radioChipText,
                      { color: kind === 'agent' ? '#ffffff' : colors.textSecondary },
                    ]}>
                    Agent
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Delivery Number */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Delivery / Account Number (11 digits) *
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                  deliveryNumber.length > 0 &&
                    deliveryNumber.length !== 11 && {
                      borderColor: colors.crimson,
                      backgroundColor: colors.crimsonGlow,
                    },
                ]}
                placeholder="e.g. 01XXXXXXXXX"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                maxLength={11}
                value={deliveryNumber}
                onChangeText={handleDeliveryNumberChange}
              />
              <Text
                style={[
                  styles.hint,
                  { color: colors.textMuted },
                  deliveryNumber.length > 0 &&
                    deliveryNumber.length !== 11 && { color: colors.crimson },
                ]}>
                {deliveryNumber.length} / 11 digits
                {deliveryNumber.length === 11 ? ' — ✓ verified format' : ''}
              </Text>
            </View>

            {/* Delivery Methods Multi-Select */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Delivery Type (select one or more) *
              </Text>
              <View style={styles.chipRow}>
                {AVAILABLE_METHODS.map((m) => {
                  const isSelected = selectedMethods.includes(m.id);
                  return (
                    <TouchableOpacity
                      key={m.id}
                      style={[
                        styles.chip,
                        {
                          backgroundColor: isSelected ? colors.primary : colors.card,
                          borderColor: isSelected ? colors.primaryLight : colors.border,
                        },
                      ]}
                      onPress={() => toggleMethod(m.id)}>
                      <Text
                        style={[
                          styles.chipText,
                          { color: isSelected ? '#ffffff' : colors.textSecondary },
                        ]}>
                        {m.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Delivery Amount */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Delivery Amount (৳ BDT) *
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

            {/* Customer Selector */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Customer *</Text>
              {selectedCustomer ? (
                <View
                  style={[
                    styles.selectedCustomerBox,
                    { backgroundColor: colors.card, borderColor: colors.borderPrimary },
                  ]}>
                  <View style={[styles.custAvatar, { backgroundColor: colors.primary }]}>
                    <Text style={styles.custAvatarText}>
                      {(selectedCustomer.name || 'C').charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.selectedCustName, { color: colors.text }]}>
                      {selectedCustomer.name}
                    </Text>
                    <Text style={[styles.selectedCustMobile, { color: colors.textSecondary }]}>
                      {selectedCustomer.mobile}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => setPickerOpen(true)}>
                    <Text style={[styles.changeLink, { color: colors.primaryLight }]}>Change</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.selectCustomerBtn,
                    { backgroundColor: colors.card, borderColor: colors.border },
                  ]}
                  onPress={() => setPickerOpen(true)}>
                  <Text style={[styles.selectCustomerPlaceholder, { color: colors.textMuted }]}>
                    Select or add customer
                  </Text>
                  <Ionicons name="people-outline" size={18} color={colors.primary} />
                </TouchableOpacity>
              )}
            </View>

            {/* Riyal Received Section */}
            <View style={[styles.sectionDivider, { borderTopColor: colors.border }]}>
              <Text style={[styles.sectionDividerText, { color: colors.primaryLight }]}>
                Riyal Receive from Customer
              </Text>
            </View>

            <View style={styles.rowFields}>
              <View style={[styles.field, { flex: 1 }]}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>Cash SAR Received</Text>
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
                  value={riyalReceived}
                  onChangeText={setRiyalReceived}
                />
              </View>

              <View style={[styles.field, { flex: 1 }]}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>SAR Due</Text>
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
                  value={riyalDue}
                  onChangeText={setRiyalDue}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Notes on Cash Riyal Due
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
                placeholder="e.g. 500 SAR balance due next Sunday"
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={2}
                value={riyalDesc}
                onChangeText={setRiyalDesc}
              />
            </View>

            {/* Order Details & Emergency */}
            <View style={[styles.sectionDivider, { borderTopColor: colors.border }]}>
              <Text style={[styles.sectionDividerText, { color: colors.primaryLight }]}>
                Order Details
              </Text>
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Order Description *</Text>
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
                placeholder="Details about this order / transfer"
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            {/* Priority Toggle */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Priority</Text>
              <TouchableOpacity
                style={[
                  styles.emergencyChip,
                  {
                    backgroundColor: emergency ? colors.crimson : colors.card,
                    borderColor: emergency ? colors.crimson : colors.border,
                  },
                ]}
                onPress={() => setEmergency(!emergency)}>
                <Text
                  style={[
                    styles.emergencyText,
                    { color: emergency ? '#ffffff' : colors.crimson },
                  ]}>
                  🚨 Mark as Emergency / Urgent
                </Text>
              </TouchableOpacity>
            </View>

            {/* Verification Consent */}
            <TouchableOpacity
              style={[
                styles.consentRow,
                {
                  backgroundColor: isDark
                    ? 'rgba(255,255,255,0.04)'
                    : 'rgba(0,0,0,0.03)',
                },
              ]}
              onPress={() => setConsent(!consent)}
              activeOpacity={0.8}>
              <View
                style={[
                  styles.consentBox,
                  {
                    borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
                  },
                  consent && {
                    backgroundColor: colors.emerald,
                    borderColor: colors.emerald,
                  },
                ]}>
                {consent && <Ionicons name="checkmark" size={16} color="#fff" />}
              </View>
              <Text style={[styles.consentText, { color: colors.textSecondary }]}>
                I confirm that the 11-digit account number and transfer details are accurate.
              </Text>
            </TouchableOpacity>

            {error ? (
              <Text style={[styles.errorText, { color: colors.crimson }]}>{error}</Text>
            ) : null}

            {/* Slide to Confirm */}
            <SlideToConfirm
              disabled={!isFormValid}
              onConfirm={handleSubmit}
              text="Slide to confirm order"
            />
          </ScrollView>

          {/* Customer Picker Modal */}
          <CustomerPickerModal
            visible={pickerOpen}
            onClose={() => setPickerOpen(false)}
            onSelect={(c) => setSelectedCustomer(c)}
          />
        </View>
      </KeyboardAvoidingView>
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
    maxHeight: '92%',
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
  field: {
    gap: 6,
  },
  label: {
    fontSize: 12.5,
    fontWeight: '700',
    letterSpacing: 0.2,
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
  hint: {
    fontSize: 11,
  },
  radioRow: {
    flexDirection: 'row',
    gap: 10,
  },
  radioChip: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  radioChipText: {
    fontWeight: '700',
    fontSize: 14,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  selectedCustomerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    padding: 12,
    borderWidth: 1,
    gap: 12,
  },
  custAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  custAvatarText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 15,
  },
  selectedCustName: {
    fontSize: 14,
    fontWeight: '700',
  },
  selectedCustMobile: {
    fontSize: 12,
    marginTop: 2,
  },
  changeLink: {
    fontWeight: '700',
    fontSize: 12.5,
    textDecorationLine: 'underline',
  },
  selectCustomerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  selectCustomerPlaceholder: {
    fontSize: 14,
  },
  sectionDivider: {
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 4,
  },
  sectionDividerText: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  rowFields: {
    flexDirection: 'row',
    gap: 10,
  },
  emergencyChip: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  emergencyText: {
    fontWeight: '700',
    fontSize: 13.5,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
    borderRadius: Radius.md,
    marginTop: 4,
  },
  consentBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  consentText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  errorText: {
    fontSize: 12.5,
    fontWeight: '700',
    textAlign: 'center',
  },
});
