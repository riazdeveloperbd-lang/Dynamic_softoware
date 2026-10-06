import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function PinPadVarient3() {
  const { loginWithPin } = useLedger();
  const { colors } = useAppTheme();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleKey = (num: number) => {
    if (pin.length >= 4) return;
    const next = pin + num;
    setPin(next);
    if (next.length === 4) {
      setTimeout(() => {
        const res = loginWithPin(next);
        if (!res.success) {
          setError(res.error || 'Access Denied');
          setPin('');
        }
      }, 150);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* V3 Glass Header */}
      <View
        style={[
          styles.glassCard,
          {
            backgroundColor: `${colors.primary}12`,
            borderColor: `${colors.primary}35`,
          },
        ]}
      >
        <Ionicons name="key" size={32} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>Luxe Focus Passcode</Text>
        <Text style={[styles.sub, { color: colors.textSecondary }]}>Enter master PIN code (1234)</Text>

        <View style={styles.pinBar}>
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              style={[
                styles.pinBox,
                {
                  backgroundColor: colors.card,
                  borderColor: i < pin.length ? colors.primary : colors.border,
                },
              ]}
            >
              <Text style={[styles.pinChar, { color: colors.text }]}>
                {i < pin.length ? '●' : ''}
              </Text>
            </View>
          ))}
        </View>

        {error ? <Text style={[styles.error, { color: colors.crimson }]}>{error}</Text> : null}
      </View>

      {/* Grid */}
      <View style={styles.pad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <TouchableOpacity
            key={n}
            style={[styles.numBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => handleKey(n)}
          >
            <Text style={[styles.numText, { color: colors.text }]}>{n}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.numBtn, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}
          onPress={() => setPin('')}
        >
          <Text style={[styles.btnLabel, { color: colors.crimson }]}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.numBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => handleKey(0)}
        >
          <Text style={[styles.numText, { color: colors.text }]}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.numBtn, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}
          onPress={() => setPin(pin.slice(0, -1))}
        >
          <Ionicons name="backspace" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', gap: 24 },
  glassCard: { padding: 24, borderRadius: 28, borderWidth: 1, alignItems: 'center', gap: 8 },
  title: { fontSize: 20, fontWeight: '900' },
  sub: { fontSize: 12 },
  pinBar: { flexDirection: 'row', gap: 12, marginTop: 12 },
  pinBox: { width: 44, height: 52, borderRadius: 12, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  pinChar: { fontSize: 18, fontWeight: '900' },
  error: { fontSize: 12, fontWeight: '700', marginTop: 4 },
  pad: { flexDirection: 'row', flexWrap: 'wrap', width: 280, alignSelf: 'center', gap: 12, justifyContent: 'center' },
  numBtn: { width: 76, height: 56, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  numText: { fontSize: 20, fontWeight: '800' },
  btnLabel: { fontSize: 11, fontWeight: '800' },
});
