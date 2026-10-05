import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Check, ChevronDown, X } from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
  StatusModal,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';
import { useAddAddressMutation } from '../../../store/api/dummyApi';

export interface NewAddressViewProps {
  initialMode?: 'empty' | 'filled' | 'success';
}

export const NewAddressView: React.FC<NewAddressViewProps> = ({
  initialMode = 'empty',
}) => {
  const { goBack, navigateTo } = useAppNavigation();
  const { colors, isDark } = useTheme();
  const [addAddress] = useAddAddressMutation();

  const [nickname, setNickname] = useState(
    initialMode === 'empty' ? '' : 'Home'
  );
  const [fullAddress, setFullAddress] = useState(
    initialMode === 'empty' ? '' : '925 S Chugach St #APT 10, Alaska 996...'
  );
  const [isDefault, setIsDefault] = useState(initialMode !== 'empty');
  const [showSuccess, setShowSuccess] = useState(initialMode === 'success');

  useEffect(() => {
    if (initialMode === 'empty') {
      setNickname('');
      setFullAddress('');
      setIsDefault(false);
      setShowSuccess(false);
    } else if (initialMode === 'filled') {
      setNickname('Home');
      setFullAddress('925 S Chugach St #APT 10, Alaska 996...');
      setIsDefault(true);
      setShowSuccess(false);
    } else {
      setNickname('Home');
      setFullAddress('925 S Chugach St #APT 10, Alaska 996...');
      setIsDefault(true);
      setShowSuccess(true);
    }
  }, [initialMode]);

  const canSubmit = nickname.trim().length > 0 && fullAddress.trim().length > 0;

  return (
    <ScreenWrapper preset="map">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="New Address" showBorder={false} />

        {/* Architectural Vector Map Canvas */}
        <View style={styles.mapContainer}>
          <svg width="390" height="340" viewBox="0 0 390 340" fill="none">
            <rect
              width="390"
              height="340"
              fill={isDark ? '#1A1A1E' : '#F5F5F5'}
            />
            <rect
              x="28"
              y="88"
              width="24"
              height="30"
              fill={isDark ? '#27272C' : '#E8E8E8'}
            />
            <rect
              x="128"
              y="72"
              width="44"
              height="60"
              fill={isDark ? '#27272C' : '#E8E8E8'}
            />
            <rect
              x="168"
              y="96"
              width="54"
              height="38"
              fill={isDark ? '#27272C' : '#E8E8E8'}
            />
            <rect
              x="262"
              y="74"
              width="38"
              height="58"
              fill={isDark ? '#27272C' : '#E8E8E8'}
            />
            <rect
              x="94"
              y="210"
              width="128"
              height="44"
              fill={isDark ? '#27272C' : '#E8E8E8'}
            />
            <rect
              x="254"
              y="182"
              width="52"
              height="82"
              fill={isDark ? '#27272C' : '#E8E8E8'}
            />
            <path
              d="M0 165 H390"
              stroke={isDark ? '#2E2E34' : '#FFFFFF'}
              strokeWidth="14"
            />
            <path
              d="M58 165 V340"
              stroke={isDark ? '#2E2E34' : '#FFFFFF'}
              strokeWidth="12"
            />
            <path
              d="M345 0 V340"
              stroke={isDark ? '#2E2E34' : '#FFFFFF'}
              strokeWidth="12"
            />
          </svg>
          <Text
            style={[
              styles.roadLabel,
              { top: 159, left: 196, color: colors.textSecondary },
            ]}
          >
            Campbell Pl
          </Text>

          <View style={styles.centerPinWrap}>
            <svg width="46" height="56" viewBox="0 0 46 56" fill="none">
              <path
                d="M23 0C10.3 0 0 10.3 0 23C0 38.5 23 56 23 56C23 56 46 38.5 46 23C46 10.3 35.7 0 23 0ZM23 31C18.6 31 15 27.4 15 23C15 18.6 18.6 15 23 15C27.4 15 31 18.6 31 23C31 27.4 27.4 31 23 31Z"
                fill={colors.primary}
              />
            </svg>
          </View>
        </View>

        {/* Bottom Address Sheet */}
        <View
          style={[
            styles.sheetContainer,
            { backgroundColor: colors.surfaceElevated },
          ]}
        >
          <View
            style={[styles.sheetGrabber, { backgroundColor: colors.border }]}
          />
          <View style={styles.sheetHeaderRow}>
            <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>
              Address
            </Text>
            <TouchableOpacity onPress={goBack}>
              <X size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <View
            style={[styles.divider, { backgroundColor: colors.divider }]}
          />

          <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>
            Address Nickname
          </Text>
          <TouchableOpacity
            onPress={() =>
              setNickname((prev) =>
                prev === 'Home'
                  ? 'Office'
                  : prev === 'Office'
                  ? 'Apartment'
                  : 'Home'
              )
            }
            style={[
              styles.dropdownBox,
              {
                borderColor: colors.border,
                backgroundColor: colors.cardBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.dropdownValue,
                {
                  color: nickname ? colors.textPrimary : colors.textMuted,
                },
              ]}
            >
              {nickname || 'Choose one'}
            </Text>
            <ChevronDown size={20} color={colors.textPrimary} />
          </TouchableOpacity>

          <Text
            style={[
              styles.fieldLabel,
              { marginTop: 14, color: colors.textPrimary },
            ]}
          >
            Full Address
          </Text>
          <View
            style={[
              styles.inputBox,
              {
                borderColor: colors.border,
                backgroundColor: colors.cardBackground,
              },
            ]}
          >
            <TextInput
              value={fullAddress}
              onChangeText={setFullAddress}
              placeholder="Enter your full address..."
              placeholderTextColor={colors.textMuted}
              style={[styles.textInput, { color: colors.textPrimary }]}
            />
          </View>

          <TouchableOpacity
            onPress={() => setIsDefault(!isDefault)}
            style={styles.checkboxRow}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.checkbox,
                isDefault
                  ? { backgroundColor: colors.primary }
                  : {
                      borderWidth: 1.5,
                      borderColor: colors.border,
                      backgroundColor: colors.cardBackground,
                    },
              ]}
            >
              {isDefault && (
                <Check size={14} color={colors.primaryText} strokeWidth={3} />
              )}
            </View>
            <Text
              style={[styles.checkboxLabel, { color: colors.textSecondary }]}
            >
              Make this as a default address
            </Text>
          </TouchableOpacity>

          <PrimaryButton
            title="Add"
            disabled={!canSubmit}
            onPress={() => {
              addAddress({ nickname, fullAddress, isDefault });
              setShowSuccess(true);
            }}
            style={{ marginTop: 18 }}
          />

          <HomeIndicator />
        </View>

        {showSuccess && (
          <StatusModal
            type="success"
            title="Congratulations!"
            message="Your new address has been added."
            primaryButtonText="Thanks"
            onPrimaryPress={() => {
              setShowSuccess(false);
              navigateTo('Address', 'varient_1');
            }}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export const NewAddressVarient1: React.FC = () => (
  <NewAddressView initialMode="empty" />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mapContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  roadLabel: {
    position: 'absolute',
    fontSize: 12,
  },
  centerPinWrap: {
    position: 'absolute',
    top: 72,
  },
  sheetContainer: {
    flex: 1,
    marginTop: -22,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  sheetGrabber: {
    width: 64,
    height: 5,
    borderRadius: 99,
    alignSelf: 'center',
    marginBottom: 12,
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  dropdownBox: {
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownValue: {
    fontSize: 15,
  },
  inputBox: {
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 15,
    height: '100%',
    outlineStyle: 'none',
  } as any,
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxLabel: {
    fontSize: 14.5,
  },
});

export default NewAddressVarient1;
