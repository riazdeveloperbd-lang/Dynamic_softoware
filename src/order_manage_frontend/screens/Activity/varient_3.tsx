import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function ActivityVarient3({ onBack }: any) {
  const { activity } = useLedger();
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* V3 Glass Header */}
      <View
        style={[
          styles.glassHeader,
          {
            backgroundColor: `${colors.primary}15`,
            borderColor: `${colors.primary}30`,
          },
        ]}
      >
        <View style={styles.topRow}>
          {onBack && (
            <TouchableOpacity onPress={onBack}>
              <Ionicons name="arrow-back" size={20} color={colors.text} />
            </TouchableOpacity>
          )}
          <Text style={[styles.title, { color: colors.text }]}>Live Activity Stream</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activity.map((log: any, i: number) => (
          <View key={log.id} style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={[styles.dot, { backgroundColor: colors.primary }]} />
              {i < activity.length - 1 && (
                <View style={[styles.line, { backgroundColor: colors.border }]} />
              )}
            </View>

            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.desc, { color: colors.text }]}>{log.description}</Text>
              <Text style={[styles.time, { color: colors.textMuted }]}>
                {new Date(log.timestamp).toLocaleString()}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glassHeader: { padding: 16, margin: 14, borderRadius: 18, borderWidth: 1 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { fontSize: 16, fontWeight: '900' },
  content: { paddingHorizontal: 14, paddingBottom: 24, gap: 12 },
  timelineRow: { flexDirection: 'row', gap: 12 },
  timelineLeft: { alignItems: 'center', width: 16, paddingTop: 4 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  line: { width: 2, flex: 1, marginTop: 4 },
  card: { flex: 1, padding: 12, borderRadius: 14, borderWidth: 1, gap: 4 },
  desc: { fontSize: 12.5, fontWeight: '600' },
  time: { fontSize: 10.5 },
});
