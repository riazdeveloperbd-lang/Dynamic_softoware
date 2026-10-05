import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';

interface StatCardProps {
  label: string;
  value: string;
  foot: string;
  iconName: keyof typeof Ionicons.glyphMap;
  accent?: 'brass' | 'green' | 'red';
  onPress?: () => void;
  valueColor?: string;
}

export function StatCard({
  label,
  value,
  foot,
  iconName,
  accent = 'brass',
  onPress,
  valueColor,
}: StatCardProps) {
  const { colors } = useAppTheme();

  const accentBorderColor =
    accent === 'green' ? colors.emerald : accent === 'red' ? colors.crimson : colors.primary;

  const defaultValColor =
    valueColor || (accent === 'green' ? colors.emerald : accent === 'red' ? colors.crimson : colors.text);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderBottomColor: accentBorderColor,
        },
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.75 : 1}
      disabled={!onPress}>
      <View style={styles.labelRow}>
        <Ionicons name={iconName} size={14} color={accentBorderColor} />
        <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      </View>
      <Text style={[styles.value, { color: defaultValColor }]}>{value}</Text>
      <Text style={[styles.foot, { color: colors.textMuted }]}>{foot}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderBottomWidth: 3.5,
    minHeight: 110,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  label: {
    fontSize: 10.5,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: '700',
  },
  value: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.3,
    lineHeight: 28,
  },
  foot: {
    fontSize: 10.5,
    marginTop: 6,
  },
});
