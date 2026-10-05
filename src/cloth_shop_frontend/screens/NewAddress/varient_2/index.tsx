import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Briefcase, Building, Home } from 'lucide-react';
import {
  AppHeader,
  FormInput,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';
import { useAddAddressMutation } from '../../../store/api/dummyApi';

export const NewAddressVarient2: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const [addAddress] = useAddAddressMutation();

  const [labelType, setLabelType] = useState<'Home' | 'Office' | 'Studio'>(
    'Home'
  );
  const [street, setStreet] = useState('925 S Chugach St #APT 10');
  const [city, setCity] = useState('Palmer, Alaska');
  const [zip, setZip] = useState('99645');
  const [gateCode, setGateCode] = useState('#4820');

  return (
    <ScreenWrapper preset="form">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Structured Address Form" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Destination Category
          </Text>

          <View style={styles.typeRow}>
            {[
              { id: 'Home' as const, icon: Home },
              { id: 'Office' as const, icon: Briefcase },
              { id: 'Studio' as const, icon: Building },
            ].map((t) => {
              const Icon = t.icon;
              const active = labelType === t.id;
              return (
                <TouchableOpacity
                  key={t.id}
                  onPress={() => setLabelType(t.id)}
                  style={[
                    styles.typePill,
                    active
                      ? { backgroundColor: colors.primary }
                      : {
                          backgroundColor: colors.surface,
                          borderColor: colors.border,
                          borderWidth: 1,
                        },
                  ]}
                >
                  <Icon
                    size={16}
                    color={active ? colors.primaryText : colors.textPrimary}
                  />
                  <Text
                    style={[
                      styles.typePillText,
                      {
                        color: active
                          ? colors.primaryText
                          : colors.textPrimary,
                      },
                    ]}
                  >
                    {t.id}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.formStack}>
            <FormInput
              label="Street Address & Apartment"
              value={street}
              onChangeText={setStreet}
              status="success"
            />
            <FormInput
              label="City & State"
              value={city}
              onChangeText={setCity}
              status="success"
            />

            <View style={styles.twoCol}>
              <View style={{ flex: 1 }}>
                <FormInput
                  label="Postal / ZIP"
                  value={zip}
                  onChangeText={setZip}
                />
              </View>
              <View style={{ flex: 1 }}>
                <FormInput
                  label="Buzzer / Gate Code"
                  value={gateCode}
                  onChangeText={setGateCode}
                />
              </View>
            </View>
          </View>

          <PrimaryButton
            title="Save Verified Address"
            onPress={() => {
              addAddress({
                nickname: labelType,
                fullAddress: `${street}, ${city} ${zip}`,
                isDefault: true,
              });
              navigateTo('Address', 'varient_1');
            }}
            style={{ marginTop: 24 }}
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
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  typePill: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  typePillText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  formStack: {
    gap: 14,
  },
  twoCol: {
    flexDirection: 'row',
    gap: 12,
  },
});

export default NewAddressVarient2;
