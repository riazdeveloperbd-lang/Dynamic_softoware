import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react';
import {
  FormInput,
  IOSKeyboard,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
  StatusModal,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const ResetPasswordView: React.FC<{ showSuccessModal?: boolean }> = ({
  showSuccessModal = false,
}) => {
  const { goBack, navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const [pass1, setPass1] = useState('***********');
  const [pass2, setPass2] = useState('***********');
  const [modalVisible, setModalVisible] = useState(showSuccessModal);

  useEffect(() => {
    setModalVisible(showSuccessModal);
  }, [showSuccessModal]);

  return (
    <ScreenWrapper preset="form" showHeader={false}>
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <View style={styles.body}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <ArrowLeft size={24} color={colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>

          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Reset Password
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Set the new password for your account so you can login and access
            all the features.
          </Text>

          <View style={styles.formStack}>
            <FormInput
              label="Password"
              value={pass1}
              onChangeText={setPass1}
              type="password"
            />
            <FormInput
              label="Password"
              value={pass2}
              onChangeText={setPass2}
              type="password"
            />
          </View>

          <View style={styles.spacer} />

          <PrimaryButton
            title="Continue"
            onPress={() => setModalVisible(true)}
            style={{ marginBottom: 18 }}
          />
        </View>

        <IOSKeyboard />

        {modalVisible && (
          <StatusModal
            type="success"
            title="Password Changed!"
            message="Your can now use your new password to login to your account."
            primaryButtonText="Login"
            onPrimaryPress={() => {
              setModalVisible(false);
              navigateTo('Login', 'varient_1');
            }}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export const ResetPasswordVarient1: React.FC = () => (
  <ResetPasswordView showSuccessModal={false} />
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
    paddingTop: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginLeft: -6,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
  formStack: {
    marginTop: 22,
    gap: 16,
  },
  spacer: {
    flex: 1,
  },
});

export default ResetPasswordVarient1;
