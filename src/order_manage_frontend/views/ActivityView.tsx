import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

interface ActivityViewProps {
  onBack: () => void;
}

export function ActivityView({ onBack }: ActivityViewProps) {
  const { activity, clearActivity } = useLedger();
  const { colors, isDark } = useAppTheme();

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
          <Text style={[styles.backTitle, { color: colors.text }]}>Recent Activity Log</Text>
          <Text style={[styles.backSub, { color: colors.primaryLight }]}>
            {activity.length} recorded events
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {activity.length === 0 ? (
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              No activity yet — events like new orders, deliveries, payments, and Riyal collections
              will appear here.
            </Text>
          </View>
        ) : (
          activity.map((act) => (
            <View
              key={act.id}
              style={[
                styles.actCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}>
              <View style={[styles.iconBox, { backgroundColor: colors.cardElevated }]}>
                <Ionicons
                  name={
                    act.icon === 'order'
                      ? 'document-text-outline'
                      : act.icon === 'delivery'
                      ? 'checkmark-circle-outline'
                      : act.icon === 'riyal'
                      ? 'cash-outline'
                      : 'wallet-outline'
                  }
                  size={18}
                  color={colors.primary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.actText, { color: colors.text }]}>{act.text}</Text>
                <Text style={[styles.actTime, { color: colors.textMuted }]}>
                  {new Date(act.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            </View>
          ))
        )}

        {activity.length > 0 && (
          <TouchableOpacity
            style={[
              styles.clearBtn,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={clearActivity}
            activeOpacity={0.8}>
            <Ionicons name="trash-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.clearBtnText, { color: colors.textSecondary }]}>
              Clear Activity Log
            </Text>
          </TouchableOpacity>
        )}
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
  listContent: {
    padding: Spacing.md,
    gap: 8,
  },
  actCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actText: {
    fontSize: 13.5,
    fontWeight: '600',
  },
  actTime: {
    fontSize: 11,
    marginTop: 2,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  clearBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
});
