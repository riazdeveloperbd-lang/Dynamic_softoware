import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function PinPadVarient2() {
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
          setError(res.error || 'Invalid Security PIN');
          setPin('');
        }
      }, 150);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* V2 Shield Header */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.iconBox, { backgroundColor: `${colors.primary}20` }]}>
          <Ionicons name="shield-checkmark" size={28} color={colors.primary} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>Executive PIN Lock V2</Text>
        <Text style={[styles.sub, { color: colors.textSecondary }]}>
          High-Density Biometric PIN Access • Default PIN: 1234
        </Text>

        {/* PIN Dots */}
        <View style={styles.dotsRow}>
          {[0, 1, 2, 3].map((idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                {
                  borderColor: colors.primary,
                  backgroundColor: idx < pin.length ? colors.primary : 'transparent',
                },
              ]}
            />
          ))}
        </View>

        {error ? <Text style={[styles.error, { color: colors.crimson }]}>{error}</Text> : null}
      </View>

      {/* Keypad Grid */}
      <View style={styles.keypad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <TouchableOpacity
            key={num}
            style={[styles.key, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => handleKey(num)}
            activeOpacity={0.7}
          >
            <Text style={[styles.keyText, { color: colors.text }]}>{num}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.key, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}
          onPress={() => setPin('')}
        >
          <Text style={[styles.keyAction, { color: colors.crimson }]}>CLR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.key, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => handleKey(0)}
        >
          <Text style={[styles.keyText, { color: colors.text }]}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.key, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}
          onPress={() => setPin(pin.slice(0, -1))}
        >
          <Ionicons name="backspace-outline" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', gap: 20 },
  card: { padding: 20, borderRadius: 24, borderWidth: 1, alignItems: 'center', gap: 10 },
  iconBox: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyControl: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '900' },
  sub: { fontSize: 11, textAlign: 'center' },
  dotsRow: { flexDirection: 'row', gap: 14, marginVertical: 10 },
  dot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2 },
  error: { fontSize: 12, fontWeight: '700' },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', width: 280, alignSelf: 'center', gap: 12, justifyContent: 'center' },
  key: { width: 76, height: 56, borderRadius: 16, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  keyText: { fontSize: 20, fontWeight: '800' },
  keyAction: { fontSize: 11, fontWeight: '900' },
});
