import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Plus } from 'lucide-react';
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
import { useGetCardsQuery } from '../../../store/api/dummyApi';
import { setSelectedCard } from '../../../store/slices/appSlice';

export const PaymentMethodVarient1: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateTo, goBack } = useAppNavigation();
  const { colors } = useTheme();
  const { data: cards = [] } = useGetCardsQuery();
  const selectedId = useAppSelector((s) => s.app.selectedCardId);

  return (
    <ScreenWrapper preset="list">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Payment Method" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Saved Cards
          </Text>

          <View style={styles.cardsStack}>
            {cards.map((card) => {
              const isSelected = card.id === selectedId;
              return (
                <TouchableOpacity
                  key={card.id}
                  onPress={() => dispatch(setSelectedCard(card.id))}
                  activeOpacity={0.8}
                  style={[
                    styles.cardRow,
                    {
                      borderColor: colors.border,
                      backgroundColor: colors.cardBackground,
                    },
                  ]}
                >
                  <View style={styles.brandBadge}>
                    {card.brand === 'VISA' ? (
                      <Text
                        style={[styles.visaText, { color: colors.textPrimary }]}
                      >
                        VISA
                      </Text>
                    ) : (
                      <View style={styles.mcCircles}>
                        <View
                          style={[
                            styles.mcLeft,
                            { backgroundColor: colors.textPrimary },
                          ]}
                        />
                        <View
                          style={[
                            styles.mcRight,
                            { backgroundColor: colors.textSecondary },
                          ]}
                        />
                      </View>
                    )}
                  </View>

                  <View style={styles.cardMetaRow}>
                    <Text
                      style={[
                        styles.maskedNumber,
                        { color: colors.textPrimary },
                      ]}
                    >
                      **** **** **** {card.last4}
                    </Text>
                    {card.isDefault && (
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
            onPress={() => navigateTo('NewCard', 'varient_1')}
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
              Add New Card
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
  cardRow: {
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandBadge: {
    width: 48,
    justifyContent: 'center',
  },
  visaText: {
    fontSize: 16,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  mcCircles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mcLeft: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  mcRight: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: -6,
  },
  cardMetaRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  maskedNumber: {
    fontSize: 15,
    fontWeight: '600',
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

export default PaymentMethodVarient1;
