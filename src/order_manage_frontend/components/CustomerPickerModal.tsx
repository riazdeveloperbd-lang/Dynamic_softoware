import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Customer } from '@/types/ledger';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { AppModal } from './AppModal';

interface CustomerPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (customer: Customer) => void;
}

export function CustomerPickerModal({ visible, onClose, onSelect }: CustomerPickerModalProps) {
  const { customers, addCustomer } = useLedger();
  const { colors, isDark } = useAppTheme();
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [error, setError] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search)
  );

  const handleSaveCustomer = async () => {
    if (!newName.trim()) {
      setError('Please enter the customer full name');
      return;
    }
    if (!newMobile.trim() || newMobile.trim().length < 11) {
      setError('Please enter a valid 11-digit mobile number');
      return;
    }
    setError('');
    const newCust = await addCustomer(newName.trim(), newMobile.trim());
    setIsAdding(false);
    setNewName('');
    setNewMobile('');
    onSelect(newCust);
    onClose();
  };

  return (
    <AppModal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
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
            <Text style={[styles.title, { color: colors.text }]}>
              {isAdding ? 'Add New Customer' : 'Select Customer'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {isAdding ? (
            <View style={styles.addForm}>
              <View style={styles.field}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>Full Name *</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                  ]}
                  placeholder="e.g. Rafiqul Islam"
                  placeholderTextColor={colors.textMuted}
                  value={newName}
                  onChangeText={setNewName}
                />
              </View>

              <View style={styles.field}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Mobile Number *
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
                  placeholder="e.g. 01812345678"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="phone-pad"
                  value={newMobile}
                  onChangeText={setNewMobile}
                />
              </View>

              {error ? (
                <Text style={[styles.errText, { color: colors.crimson }]}>{error}</Text>
              ) : null}

              <TouchableOpacity
                style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
                onPress={handleSaveCustomer}>
                <Text style={styles.primaryBtnText}>Save & Select Customer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setIsAdding(false);
                  setError('');
                }}>
                <Text style={[styles.cancelBtnText, { color: colors.textSecondary }]}>
                  Back to Customer List
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.listContainer}>
              <View
                style={[
                  styles.searchBox,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Ionicons name="search-outline" size={18} color={colors.textMuted} />
                <TextInput
                  style={[styles.searchInput, { color: colors.text }]}
                  placeholder="Search by name or mobile number"
                  placeholderTextColor={colors.textMuted}
                  value={search}
                  onChangeText={setSearch}
                />
                {search ? (
                  <TouchableOpacity onPress={() => setSearch('')}>
                    <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                  </TouchableOpacity>
                ) : null}
              </View>

              <TouchableOpacity
                style={[
                  styles.addTrigger,
                  {
                    backgroundColor: colors.primaryGlow,
                    borderColor: colors.borderPrimary,
                  },
                ]}
                onPress={() => setIsAdding(true)}
                activeOpacity={0.8}>
                <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
                <Text style={[styles.addTriggerText, { color: colors.primaryLight }]}>
                  Add New Customer ID
                </Text>
              </TouchableOpacity>

              <FlatList
                data={filtered}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item }: { item: any }) => (
                  <TouchableOpacity
                    style={[styles.customerRow, { borderBottomColor: colors.border }]}
                    onPress={() => {
                      onSelect(item);
                      onClose();
                    }}>
                    <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                      <Text style={styles.avatarText}>
                        {(item.name || 'C').charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.custInfo}>
                      <Text style={[styles.custName, { color: colors.text }]}>{item.name}</Text>
                      <Text style={[styles.custMobile, { color: colors.textSecondary }]}>
                        {item.mobile}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <View style={styles.empty}>
                    <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                      No customers match "{search}"
                    </Text>
                  </View>
                }
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
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
    maxHeight: '85%',
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
  listContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    maxHeight: 460,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    paddingHorizontal: 12,
    borderWidth: 1,
    height: 46,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  addTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: Radius.md,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  addTriggerText: {
    fontWeight: '700',
    fontSize: 14,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 15,
  },
  custInfo: {
    flex: 1,
  },
  custName: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  custMobile: {
    fontSize: 12,
    marginTop: 2,
  },
  addForm: {
    padding: Spacing.lg,
    gap: 14,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  input: {
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14.5,
  },
  errText: {
    fontSize: 12,
    fontWeight: '600',
  },
  primaryBtn: {
    paddingVertical: 14,
    borderRadius: Radius.md,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  cancelBtnText: {
    fontSize: 13,
  },
  empty: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
  },
});
