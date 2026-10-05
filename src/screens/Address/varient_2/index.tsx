import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { CheckCircle2, MapPin, Navigation, Plus } from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
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
import { useGetAddressesQuery } from '../../../store/api/dummyApi';
import { setSelectedAddress } from '../../../store/slices/appSlice';

export const AddressVarient2: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateTo, goBack } = useAppNavigation();
  const { colors, isDark } = useTheme();
  const { data: addresses = [] } = useGetAddressesQuery();
  const selectedId = useAppSelector((s) => s.app.selectedAddressId);

  return (
    <ScreenWrapper preset="map">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Map Address Hub" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {addresses.map((addr, idx) => {
            const selected = addr.id === selectedId;
            return (
              <TouchableOpacity
                key={addr.id}
                onPress={() => dispatch(setSelectedAddress(addr.id))}
                activeOpacity={0.85}
                style={[
                  styles.mapCard,
                  {
                    borderColor: selected ? colors.primary : colors.border,
                    backgroundColor: colors.cardBackground,
                  },
                ]}
              >
                {/* Mini Vector Map Banner */}
                <View style={styles.mapPreviewStrip}>
                  <svg
                    width="350"
                    height="78"
                    viewBox="0 0 350 78"
                    fill="none"
                  >
                    <rect
                      width="350"
                      height="78"
                      fill={isDark ? '#1F1F24' : '#F3F3F5'}
                    />
                    <path
                      d="M0 40 H350"
                      stroke={isDark ? '#2E2E36' : '#FFFFFF'}
                      strokeWidth="8"
                    />
                    <path
                      d="M110 0 V78"
                      stroke={isDark ? '#2E2E36' : '#FFFFFF'}
                      strokeWidth="6"
                    />
                    <path
                      d="M250 0 V78"
                      stroke={isDark ? '#2E2E36' : '#FFFFFF'}
                      strokeWidth="6"
                    />
                  </svg>
                  <View
                    style={[
                      styles.pinBadge,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <MapPin size={14} color={colors.primaryText} />
                  </View>
                  <View
                    style={[
                      styles.zoneChip,
                      { backgroundColor: colors.surfaceElevated },
                    ]}
                  >
                    <Navigation size={11} color={colors.textPrimary} />
                    <Text
                      style={[
                        styles.zoneChipText,
                        { color: colors.textPrimary },
                      ]}
                    >
                      ZONE 0{idx + 1} • EXPRESS
                    </Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.titleRow}>
                      <Text
                        style={[
                          styles.nickname,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {addr.nickname}
                      </Text>
                      {addr.isDefault && (
                        <Text
                          style={[
                            styles.defaultBadge,
                            { color: colors.success },
                          ]}
                        >
                          • Primary
                        </Text>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.fullAddr,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {addr.fullAddress}
                    </Text>
                  </View>

                  {selected && (
                    <CheckCircle2 size={22} color={colors.primary} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            onPress={() => navigateTo('NewAddress', 'varient_2')}
            style={[
              styles.addCardBtn,
              {
                borderColor: colors.border,
                backgroundColor: colors.surface,
              },
            ]}
          >
            <Plus size={18} color={colors.textPrimary} />
            <Text style={[styles.addCardText, { color: colors.textPrimary }]}>
              Pin New Delivery Destination
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <View
          style={[styles.bottomBar, { backgroundColor: colors.background }]}
        >
          <PrimaryButton title="Confirm Selected Location" onPress={goBack} />
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
    gap: 14,
  },
  mapCard: {
    borderRadius: 18,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  mapPreviewStrip: {
    height: 76,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinBadge: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoneChip: {
    position: 'absolute',
    top: 8,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  zoneChipText: {
    fontSize: 10,
    fontWeight: '800',
  },
  cardBody: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nickname: {
    fontSize: 15.5,
    fontWeight: '800',
  },
  defaultBadge: {
    fontSize: 12,
    fontWeight: '700',
  },
  fullAddr: {
    fontSize: 13,
    marginTop: 2,
  },
  addCardBtn: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addCardText: {
    fontSize: 14,
    fontWeight: '700',
  },
  bottomBar: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
});

export default AddressVarient2;
