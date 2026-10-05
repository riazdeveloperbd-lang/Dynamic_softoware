import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Camera, CheckCircle2, Radio, ShieldCheck, Wifi } from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const NewCardVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();

  return (
    <ScreenWrapper preset="form">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="NFC Tap & Camera Scan" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Camera Viewfinder Frame */}
          <View
            style={[
              styles.scannerFrame,
              {
                backgroundColor: colors.surface,
                borderColor: colors.primary,
              },
            ]}
          >
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />

            <Camera size={36} color={colors.textPrimary} />
            <Text style={[styles.scanTitle, { color: colors.textPrimary }]}>
              Position Card Inside Frame
            </Text>
            <Text style={[styles.scanSub, { color: colors.textSecondary }]}>
              Optical OCR automatically extracts card number & expiry
            </Text>
          </View>

          {/* NFC Contactless Tap Card */}
          <TouchableOpacity
            onPress={() => navigateTo('PaymentMethod', 'varient_1')}
            style={[
              styles.nfcCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.nfcIconBox,
                { backgroundColor: colors.surface },
              ]}
            >
              <Wifi size={24} color={colors.textPrimary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.nfcTitle, { color: colors.textPrimary }]}>
                Tap Physical Card via NFC
              </Text>
              <Text style={[styles.nfcSub, { color: colors.textSecondary }]}>
                Hold your contactless Visa or Mastercard near top of phone
              </Text>
            </View>
            <Radio size={20} color={colors.success} />
          </TouchableOpacity>

          <View
            style={[
              styles.detectedCard,
              {
                backgroundColor: colors.successBg,
              },
            ]}
          >
            <CheckCircle2 size={18} color={colors.success} />
            <Text style={[styles.detectedText, { color: colors.success }]}>
              Detected: VISA Platinum •••• 2512 (Exp 07/28)
            </Text>
          </View>

          <View style={styles.securityNote}>
            <ShieldCheck size={16} color={colors.textSecondary} />
            <Text
              style={[styles.securityText, { color: colors.textSecondary }]}
            >
              Card images are processed on-device and never stored.
            </Text>
          </View>

          <PrimaryButton
            title="Confirm & Pair Detected Card"
            onPress={() => navigateTo('PaymentMethod', 'varient_2')}
            style={{ marginTop: 14 }}
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
    gap: 16,
  },
  scannerFrame: {
    height: 205,
    borderRadius: 22,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 14,
    left: 14,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#FFA928',
  },
  cornerTopRight: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#FFA928',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#FFA928',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#FFA928',
  },
  scanTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 10,
  },
  scanSub: {
    fontSize: 12.5,
    textAlign: 'center',
    marginTop: 4,
  },
  nfcCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  nfcIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nfcTitle: {
    fontSize: 14.5,
    fontWeight: '800',
  },
  nfcSub: {
    fontSize: 12,
    marginTop: 2,
  },
  detectedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
  },
  detectedText: {
    fontSize: 13,
    fontWeight: '700',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  securityText: {
    fontSize: 12,
  },
});

export default NewCardVarient3;
