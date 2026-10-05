import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Camera, Ruler, ShieldCheck } from 'lucide-react';
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

export const MyDetailsVarient2: React.FC = () => {
  const dispatch = useAppDispatch();
  const { goBack } = useAppNavigation();
  const { colors } = useTheme();
  const profile = useAppSelector((s) => s.app.userProfile);
  const [fitSize, setFitSize] = useState<'S' | 'M' | 'L'>('M');

  return (
    <ScreenWrapper preset="form" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Identity & Fit Passport" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar Banner Card */}
          <View
            style={[
              styles.avatarCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.avatarCircleWrap}>
              <View
                style={[
                  styles.avatarCircle,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text
                  style={[styles.avatarText, { color: colors.primaryText }]}
                >
                  CF
                </Text>
              </View>
              <View
                style={[
                  styles.camBadge,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Camera size={13} color={colors.textPrimary} />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.verifiedRow}>
                <Text style={[styles.nameTitle, { color: colors.textPrimary }]}>
                  {profile.fullName}
                </Text>
                <ShieldCheck size={16} color={colors.success} />
              </View>
              <Text
                style={[styles.memberId, { color: colors.textSecondary }]}
              >
                Studio Member #DF-88412
              </Text>
            </View>
          </View>

          {/* Saved Apparel Fit Matrix */}
          <View
            style={[
              styles.fitBox,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.fitHeader}>
              <Ruler size={16} color={colors.textPrimary} />
              <Text style={[styles.fitTitle, { color: colors.textPrimary }]}>
                Default Apparel Fit Preference
              </Text>
            </View>
            <View style={styles.fitPillsRow}>
              {(['S', 'M', 'L'] as const).map((sz) => {
                const active = fitSize === sz;
                return (
                  <TouchableOpacity
                    key={sz}
                    onPress={() => setFitSize(sz)}
                    style={[
                      styles.fitChip,
                      active
                        ? { backgroundColor: colors.primary }
                        : {
                            backgroundColor: colors.surface,
                            borderColor: colors.border,
                            borderWidth: 1,
                          },
                    ]}
                  >
                    <Text
                      style={[
                        styles.fitChipText,
                        {
                          color: active
                            ? colors.primaryText
                            : colors.textPrimary,
                        },
                      ]}
                    >
                      Size {sz} Standard
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.formStack}>
            <FormInput
              label="Legal Full Name"
              value={profile.fullName}
              onChangeText={(v) => dispatch(updateUserProfile({ fullName: v }))}
            />
            <FormInput
              label="Verified Email"
              value={profile.email}
              onChangeText={(v) => dispatch(updateUserProfile({ email: v }))}
            />
            <FormInput
              label="Mobile Contact"
              value={profile.phone}
              onChangeText={(v) => dispatch(updateUserProfile({ phone: v }))}
            />
          </View>

          <PrimaryButton
            title="Update Studio Profile"
            onPress={goBack}
            style={{ marginTop: 22 }}
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
    gap: 14,
  },
  avatarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
  avatarCircleWrap: {
    position: 'relative',
  },
  avatarCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '800',
  },
  camBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nameTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  memberId: {
    fontSize: 12.5,
    marginTop: 2,
  },
  fitBox: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 10,
  },
  fitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fitTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  fitPillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  fitChip: {
    flex: 1,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fitChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  formStack: {
    gap: 12,
  },
});

export default MyDetailsVarient2;
