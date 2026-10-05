import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Building2, Clock, Home, KeyRound, PackageCheck } from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const AddressVarient3: React.FC = () => {
  const { navigateTo, goBack } = useAppNavigation();
  const { colors } = useTheme();
  const [dropMethod, setDropMethod] = useState<'concierge' | 'door' | 'locker'>(
    'concierge'
  );

  return (
    <ScreenWrapper preset="list">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Courier Drop Preferences" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Active Address Header Card */}
          <View
            style={[
              styles.activeDestCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.destTop}>
              <View style={styles.destTitleRow}>
                <Home size={18} color={colors.textPrimary} />
                <Text
                  style={[styles.destTitle, { color: colors.textPrimary }]}
                >
                  Home Residence (Default)
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigateTo('NewAddress', 'varient_3')}
              >
                <Text style={[styles.changeBtn, { color: colors.textPrimary }]}>
                  New +
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.destFull, { color: colors.textSecondary }]}>
              925 S Chugach St #APT 10, Palmer, Alaska 99645
            </Text>

            <View style={styles.metaBadges}>
              <View
                style={[
                  styles.metaPill,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <KeyRound size={12} color={colors.textPrimary} />
                <Text
                  style={[styles.metaPillText, { color: colors.textPrimary }]}
                >
                  Gate Code: #4820
                </Text>
              </View>
              <View
                style={[
                  styles.metaPill,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Clock size={12} color={colors.textPrimary} />
                <Text
                  style={[styles.metaPillText, { color: colors.textPrimary }]}
                >
                  9AM – 8PM Window
                </Text>
              </View>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Drop-Off Handover Instructions
          </Text>

          <View style={styles.optionsStack}>
            {[
              {
                id: 'concierge' as const,
                title: 'Leave with Building Concierge',
                desc: 'Hand package to front desk security staff upon arrival.',
                icon: Building2,
              },
              {
                id: 'door' as const,
                title: 'Contactless Front Door Drop',
                desc: 'Place parcel at apartment door & send photo proof.',
                icon: PackageCheck,
              },
              {
                id: 'locker' as const,
                title: 'Smart Parcel Locker Hub',
                desc: 'Deposit in Basement Locker Bay B with SMS PIN.',
                icon: KeyRound,
              },
            ].map((opt) => {
              const Icon = opt.icon;
              const active = dropMethod === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => setDropMethod(opt.id)}
                  style={[
                    styles.optCard,
                    {
                      borderColor: active ? colors.primary : colors.border,
                      backgroundColor: active
                        ? colors.surface
                        : colors.cardBackground,
                    },
                  ]}
                >
                  <Icon size={22} color={colors.textPrimary} />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[styles.optTitle, { color: colors.textPrimary }]}
                    >
                      {opt.title}
                    </Text>
                    <Text
                      style={[
                        styles.optDesc,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {opt.desc}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View
          style={[styles.bottomBar, { backgroundColor: colors.background }]}
        >
          <PrimaryButton title="Save Courier Instructions" onPress={goBack} />
          <HomeIndicator />
        </View>
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
  activeDestCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  destTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  destTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  destTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  changeBtn: {
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  destFull: {
    fontSize: 13.5,
    lineHeight: 19,
  },
  metaBadges: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  metaPillText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  optionsStack: {
    gap: 10,
  },
  optCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  optTitle: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  optDesc: {
    fontSize: 12.5,
    marginTop: 2,
    lineHeight: 18,
  },
  bottomBar: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
});

export default AddressVarient3;
