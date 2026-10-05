import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MapPin, Plus } from 'lucide-react';
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

export const AddressVarient1: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateTo, goBack } = useAppNavigation();
  const { colors } = useTheme();
  const { data: addresses = [] } = useGetAddressesQuery();
  const selectedId = useAppSelector((s) => s.app.selectedAddressId);

  return (
    <ScreenWrapper preset="list">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Address" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Saved Address
          </Text>

          <View style={styles.cardsStack}>
            {addresses.map((addr) => {
              const isSelected = addr.id === selectedId;
              return (
                <TouchableOpacity
                  key={addr.id}
                  onPress={() => dispatch(setSelectedAddress(addr.id))}
                  activeOpacity={0.8}
                  style={[
                    styles.addrCard,
                    {
                      borderColor: colors.border,
                      backgroundColor: colors.cardBackground,
                    },
                  ]}
                >
                  <MapPin size={22} color={colors.textSecondary} />
                  <View style={styles.addrInfo}>
                    <View style={styles.nicknameRow}>
                      <Text
                        style={[
                          styles.nicknameText,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {addr.nickname}
                      </Text>
                      {addr.isDefault && (
                        <View
                          style={[
                            styles.defaultTag,
                            { backgroundColor: colors.surface },
                          ]}
                        >
                          <Text
                            style={[
                              styles.defaultTagText,
                              { color: colors.textPrimary },
                            ]}
                          >
                            Default
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.fullAddrText,
                        { color: colors.textSecondary },
                      ]}
                      numberOfLines={1}
                    >
                      {addr.fullAddress}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.radioOuter,
                      {
                        borderColor: isSelected
                          ? colors.primary
                          : colors.border,
                      },
                    ]}
                  >
                    {isSelected && (
                      <View
                        style={[
                          styles.radioInner,
                          { backgroundColor: colors.primary },
                        ]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={() => navigateTo('NewAddress', 'varient_1')}
            activeOpacity={0.8}
            style={[
              styles.addNewBtn,
              {
                borderColor: colors.border,
                backgroundColor: colors.cardBackground,
              },
            ]}
          >
            <Plus size={20} color={colors.textPrimary} />
            <Text style={[styles.addNewText, { color: colors.textPrimary }]}>
              Add New Address
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <View
          style={[styles.bottomBar, { backgroundColor: colors.background }]}
        >
          <PrimaryButton title="Apply" onPress={goBack} />
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
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
  },
  cardsStack: {
    gap: 12,
  },
  addrCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  addrInfo: {
    flex: 1,
  },
  nicknameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  nicknameText: {
    fontSize: 15,
    fontWeight: '700',
  },
  defaultTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  defaultTagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  fullAddrText: {
    fontSize: 13.5,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
  },
  addNewBtn: {
    height: 54,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
  },
  addNewText: {
    fontSize: 15,
    fontWeight: '600',
  },
  bottomBar: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
});

export default AddressVarient1;
