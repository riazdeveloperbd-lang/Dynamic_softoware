import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Compass, MapPin, Navigation, Sparkles } from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  SearchBar,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';
import { useAddAddressMutation } from '../../../store/api/dummyApi';

export const NewAddressVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const [addAddress] = useAddAddressMutation();
  const [search, setSearch] = useState('925 S Chugach');

  const suggestions = [
    {
      title: '925 S Chugach St #APT 10',
      region: 'Palmer, Alaska 99645, United States',
      distance: '0.2 mi',
    },
    {
      title: '928 S Chugach Way Suite B',
      region: 'Palmer, Alaska 99645, United States',
      distance: '0.5 mi',
    },
    {
      title: '1890 N Chugach Estates Blvd',
      region: 'Anchorage, Alaska 99501, United States',
      distance: '1.8 mi',
    },
  ];

  return (
    <ScreenWrapper preset="map">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="GPS Radar Locator" showBorder={false} />

        <View style={styles.searchWrap}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search street, building or postal code..."
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Current GPS Radar Card */}
          <View
            style={[
              styles.radarCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.radarPulseOuter,
                { borderColor: colors.border },
              ]}
            >
              <View
                style={[
                  styles.radarPulseInner,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Compass size={24} color={colors.primaryText} />
              </View>
            </View>
            <Text style={[styles.radarTitle, { color: colors.textPrimary }]}>
              High-Precision GPS Locked
            </Text>
            <Text
              style={[styles.radarCoords, { color: colors.textSecondary }]}
            >
              61.5997° N, 149.1128° W • Accuracy ±3m
            </Text>
          </View>

          <View style={styles.suggestHeader}>
            <Sparkles size={15} color={colors.warning} />
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Instant Verified Matches
            </Text>
          </View>

          <View style={styles.suggestList}>
            {suggestions.map((s) => (
              <TouchableOpacity
                key={s.title}
                onPress={() => {
                  addAddress({
                    nickname: 'GPS Pin',
                    fullAddress: `${s.title}, ${s.region}`,
                    isDefault: true,
                  });
                  navigateTo('Address', 'varient_2');
                }}
                style={[
                  styles.suggestRow,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <MapPin size={20} color={colors.textPrimary} />
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.suggestTitle,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {s.title}
                  </Text>
                  <Text
                    style={[
                      styles.suggestSub,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {s.region}
                  </Text>
                </View>
                <View
                  style={[
                    styles.distBadge,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  <Navigation size={10} color={colors.textPrimary} />
                  <Text
                    style={[styles.distText, { color: colors.textPrimary }]}
                  >
                    {s.distance}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <PrimaryButton
            title="Use Current GPS Coordinates"
            onPress={() => navigateTo('Address', 'varient_1')}
            style={{ marginTop: 18 }}
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
  searchWrap: {
    paddingHorizontal: 24,
    marginBottom: 14,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 14,
  },
  radarCard: {
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 22,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  radarPulseOuter: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  radarPulseInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  radarCoords: {
    fontSize: 12.5,
    marginTop: 2,
  },
  suggestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  suggestList: {
    gap: 10,
  },
  suggestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  suggestTitle: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  suggestSub: {
    fontSize: 12,
    marginTop: 2,
  },
  distBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  distText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

export default NewAddressVarient3;
