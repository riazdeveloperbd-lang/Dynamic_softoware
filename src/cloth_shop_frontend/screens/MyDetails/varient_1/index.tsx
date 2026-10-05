import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Calendar, ChevronDown } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  FormInput,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import {
  useAppDispatch,
  useAppNavigation,
  useAppSelector,
  useTheme,
} from '../../../hooks';
import { updateUserProfile } from '../../../store/slices/appSlice';

export const MyDetailsVarient1: React.FC = () => {
  const dispatch = useAppDispatch();
  const { goBack } = useAppNavigation();
  const { colors } = useTheme();
  const profile = useAppSelector((s) => s.app.userProfile);

  return (
    <ScreenWrapper preset="form" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="My Details" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formStack}>
            <FormInput
              label="Full Name"
              value={profile.fullName}
              onChangeText={(val) =>
                dispatch(updateUserProfile({ fullName: val }))
              }
            />

            <FormInput
              label="Email Address"
              value={profile.email}
              onChangeText={(val) =>
                dispatch(updateUserProfile({ email: val }))
              }
            />

            <FormInput
              label="Date of Birth"
              value={profile.dob}
              onChangeText={(val) => dispatch(updateUserProfile({ dob: val }))}
              rightIcon={<Calendar size={20} color={colors.textMuted} />}
            />

            <View>
              <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>
                Gender
              </Text>
              <TouchableOpacity
                onPress={() =>
                  dispatch(
                    updateUserProfile({
                      gender: profile.gender === 'Male' ? 'Female' : 'Male',
                    })
                  )
                }
                style={[
                  styles.selectBox,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.cardBackground,
                  },
                ]}
              >
                <Text
                  style={[styles.selectText, { color: colors.textPrimary }]}
                >
                  {profile.gender}
                </Text>
                <ChevronDown size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>
                Phone Number
              </Text>
              <View
                style={[
                  styles.phoneBox,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.cardBackground,
                  },
                ]}
              >
                <View style={styles.flagWrap}>
                  <Text style={{ fontSize: 20 }}>🇺🇸</Text>
                  <ChevronDown size={16} color={colors.textPrimary} />
                </View>
                <TextInput
                  value={profile.phone}
                  onChangeText={(val: string) =>
                    dispatch(updateUserProfile({ phone: val }))
                  }
                  style={[styles.phoneInput, { color: colors.textPrimary }]}
                />
              </View>
            </View>
          </View>

          <PrimaryButton
            title="Submit"
            onPress={goBack}
            style={{ marginTop: 48 }}
          />
        </ScrollView>

        <BottomTabBar activeTab="Account" />
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
  formStack: {
    gap: 16,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  selectBox: {
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 15,
  },
  phoneBox: {
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  flagWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
    height: '100%',
    outlineStyle: 'none',
  } as any,
});

export default MyDetailsVarient1;
