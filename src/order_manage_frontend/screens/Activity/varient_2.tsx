import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function ActivityVarient2({ onBack }: any) {
  const { activity } = useLedger();
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* V2 Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.topRow}>
          {onBack && (
            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
              <Ionicons name="arrow-back" size={20} color={colors.text} />
            </TouchableOpacity>
          )}
          <Text style={[styles.title, { color: colors.text }]}>Audit Log Matrix V2</Text>
          <View style={[styles.badge, { backgroundColor: `${colors.primary}20` }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>{activity.length} Logs</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activity.map((log: any) => (
          <View
            key={log.id}
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.row}>
              <View style={[styles.typePill, { backgroundColor: colors.primaryGlow }]}>
                <Text style={[styles.typeText, { color: colors.primary }]}>{log.type.toUpperCase()}</Text>
              </View>
              <Text style={[styles.time, { color: colors.textSecondary }]}>
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
            <Text style={[styles.desc, { color: colors.text }]}>{log.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 14, borderBottomWidth: 1 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  backBtn: { padding: 4 },
  title: { fontSize: 15, fontWeight: '800' },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeText: { fontSize: 10, fontWeight: '700' },
  content: { padding: 14, gap: 10 },
  card: { padding: 12, borderRadius: 14, borderWidth: 1, gap: 6 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  typePill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  typeText: { fontSize: 10, fontWeight: '800' },
  time: { fontSize: 11 },
  desc: { fontSize: 12.5, fontWeight: '600' },
});
