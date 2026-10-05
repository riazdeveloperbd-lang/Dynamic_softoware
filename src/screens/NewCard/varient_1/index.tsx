import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HelpCircle } from 'lucide-react';
import {
  AppHeader,
  FormInput,
  IOSKeyboard,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
  StatusModal,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';
import { useAddCardMutation } from '../../../store/api/dummyApi';

export interface NewCardViewProps {
  initialMode?: 'empty' | 'filled' | 'success';
}

export const NewCardView: React.FC<NewCardViewProps> = ({
  initialMode = 'empty',
}) => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const [addCard] = useAddCardMutation();

  const [cardNumber, setCardNumber] = useState(
    initialMode === 'empty' ? '' : '**** **** **** 2512'
  );
  const [expiry, setExpiry] = useState(initialMode === 'empty' ? '' : '07/23');
  const [cvc, setCvc] = useState(initialMode === 'empty' ? '' : '345');
  const [showSuccess, setShowSuccess] = useState(initialMode === 'success');

  useEffect(() => {
    if (initialMode === 'empty') {
      setCardNumber('');
      setExpiry('');
      setCvc('');
      setShowSuccess(false);
    } else if (initialMode === 'filled') {
      setCardNumber('**** **** **** 2512');
      setExpiry('07/23');
      setCvc('345');
      setShowSuccess(false);
    } else {
      setCardNumber('**** **** **** 2512');
      setExpiry('07/23');
      setCvc('345');
      setShowSuccess(true);
    }
  }, [initialMode]);

  const isFilled =
    cardNumber.trim().length > 0 &&
    expiry.trim().length > 0 &&
    cvc.trim().length > 0;

  return (
    <ScreenWrapper preset="form">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="New Card" />

        <View style={styles.body}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Add Debit or Credit Card
          </Text>

          <View style={styles.formStack}>
            <FormInput
              label="Card number"
              placeholder="Enter your card number"
              value={cardNumber}
              onChangeText={setCardNumber}
            />

            <View style={styles.twoColRow}>
              <View style={{ flex: 1 }}>
                <FormInput
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={expiry}
                  onChangeText={setExpiry}
                />
              </View>
              <View style={{ flex: 1 }}>
                <FormInput
                  label="Security Code"
                  placeholder="CVC"
                  value={cvc}
                  onChangeText={setCvc}
                  rightIcon={<HelpCircle size={18} color={colors.textMuted} />}
                />
              </View>
            </View>
          </View>

          <View style={styles.spacer} />

          <PrimaryButton
            title="Add Card"
            disabled={!isFilled}
            onPress={() => {
              addCard({ number: cardNumber, expiry, cvc });
              setShowSuccess(true);
            }}
            style={{ marginBottom: 18 }}
          />
        </View>

        <IOSKeyboard />

        {showSuccess && (
          <StatusModal
            type="success"
            title="Congratulations!"
            message="Your new card has been added."
            primaryButtonText="Thanks"
            onPrimaryPress={() => {
              setShowSuccess(false);
              navigateTo('PaymentMethod', 'varient_1');
            }}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export const NewCardVarient1: React.FC = () => (
  <NewCardView initialMode="empty" />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
  },
  formStack: {
    gap: 16,
  },
  twoColRow: {
    flexDirection: 'row',
    gap: 14,
  },
  spacer: {
    flex: 1,
  },
});

export default NewCardVarient1;
