import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { CreditCard, Wifi } from 'lucide-react';
import {
  AppHeader,
  FormInput,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';
import { useAddCardMutation } from '../../../store/api/dummyApi';

export const NewCardVarient2: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors, isDark } = useTheme();
  const [addCard] = useAddCardMutation();

  const [holder, setHolder] = useState('CODY FISHER');
  const [number, setNumber] = useState('4532  8910  2241  2512');
  const [expiry, setExpiry] = useState('07/28');
  const [cvc, setCvc] = useState('842');

  return (
    <ScreenWrapper preset="form">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Interactive 3D Card Builder" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Live Interactive Embossed Card Preview */}
          <View
            style={[
              styles.liveCard,
              { backgroundColor: isDark ? '#242429' : '#18181B' },
            ]}
          >
            <View style={styles.liveCardTop}>
              <View style={styles.chipGold} />
              <View style={styles.brandRow}>
                <Wifi size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.brandText}>VISA SIGNATURE</Text>
              </View>
            </View>

            <Text style={styles.liveDigits}>
              {number || '••••  ••••  ••••  ••••'}
            </Text>

            <View style={styles.liveCardBottom}>
              <View>
                <Text style={styles.liveLabel}>CARDHOLDER NAME</Text>
                <Text style={styles.liveValue}>{holder || 'YOUR NAME'}</Text>
              </View>
              <View>
                <Text style={styles.liveLabel}>VALID THRU</Text>
                <Text style={styles.liveValue}>{expiry || 'MM/YY'}</Text>
              </View>
              <View>
                <Text style={styles.liveLabel}>CVC</Text>
                <Text style={styles.liveValue}>{cvc || '•••'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.formStack}>
            <FormInput
              label="Cardholder Full Name"
              value={holder}
              onChangeText={setHolder}
              status="success"
            />
            <FormInput
              label="16-Digit Card Number"
              value={number}
              onChangeText={setNumber}
              rightIcon={<CreditCard size={18} color={colors.textMuted} />}
              status="success"
            />

            <View style={styles.twoCol}>
              <View style={{ flex: 1 }}>
                <FormInput
                  label="Expiry Date"
                  value={expiry}
                  onChangeText={setExpiry}
                />
              </View>
              <View style={{ flex: 1 }}>
                <FormInput
                  label="Security CVC"
                  value={cvc}
                  onChangeText={setCvc}
                />
              </View>
            </View>
          </View>

          <PrimaryButton
            title="Save to Encrypted Card Vault"
            onPress={() => {
              addCard({ number, expiry, cvc });
              navigateTo('PaymentMethod', 'varient_2');
            }}
            style={{ marginTop: 22 }}
          />
        </ScrollView>

        <HomeIndicator />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  liveCard: {
    height: 192,
    borderRadius: 22,
    padding: 22,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  liveCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chipGold: {
    width: 42,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#E5B84B',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  liveDigits: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 1.8,
  },
  liveCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  liveLabel: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  liveValue: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
    marginTop: 2,
  },
  formStack: {
    gap: 14,
  },
  twoCol: {
    flexDirection: 'row',
    gap: 12,
  },
});

export default NewCardVarient2;
