import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Plus, ShieldCheck, Wifi } from 'lucide-react';
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

export const PaymentMethodVarient2: React.FC = () => {
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
        <AppHeader title="3D Card Carousel" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Horizontal Full-Size Bank Cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselRow}
          >
            {cards.map((card, i) => {
              const isSelected = card.id === selectedId;
              const bg = i === 0 ? '#18181B' : '#1E3A5F';
              return (
                <TouchableOpacity
                  key={card.id}
                  activeOpacity={0.9}
                  onPress={() => dispatch(setSelectedCard(card.id))}
                  style={[
                    styles.bankCard,
                    {
                      backgroundColor: bg,
                      borderWidth: isSelected ? 2.5 : 0,
                      borderColor: colors.warning,
                    },
                  ]}
                >
                  <View style={styles.cardTopRow}>
                    <Text style={styles.cardBrandText}>{card.brand}</Text>
                    <Wifi size={18} color="rgba(255,255,255,0.8)" />
                  </View>

                  <Text style={styles.cardNumText}>
                    ••••  ••••  ••••  {card.last4}
                  </Text>

                  <View style={styles.cardBottomRow}>
                    <View>
                      <Text style={styles.cardSmallLabel}>CARD HOLDER</Text>
                      <Text style={styles.cardValText}>CODY FISHER</Text>
                    </View>
                    <View>
                      <Text style={styles.cardSmallLabel}>EXPIRES</Text>
                      <Text style={styles.cardValText}>07/28</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View
            style={[
              styles.securityStrip,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <ShieldCheck size={18} color={colors.success} />
            <Text
              style={[styles.securityText, { color: colors.textPrimary }]}
            >
              Tokenized PCI-DSS Level 1 Card Vault Active
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigateTo('NewCard', 'varient_2')}
            style={[
              styles.addCardBox,
              {
                borderColor: colors.border,
                backgroundColor: colors.cardBackground,
              },
            ]}
          >
            <Plus size={20} color={colors.textPrimary} />
            <Text
              style={[styles.addCardLabel, { color: colors.textPrimary }]}
            >
              Link New Platinum or Virtual Card
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <View
          style={[styles.bottomBar, { backgroundColor: colors.background }]}
        >
          <PrimaryButton title="Use Selected Card" onPress={goBack} />
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
    paddingBottom: 24,
    gap: 18,
  },
  carouselRow: {
    paddingHorizontal: 24,
    gap: 14,
  },
  bankCard: {
    width: 300,
    height: 184,
    borderRadius: 22,
    padding: 22,
    justifyContent: 'space-between',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBrandText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  cardNumText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardSmallLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 1,
  },
  cardValText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  securityStrip: {
    marginHorizontal: 24,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  securityText: {
    fontSize: 13,
    fontWeight: '700',
  },
  addCardBox: {
    marginHorizontal: 24,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addCardLabel: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  bottomBar: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
});

export default PaymentMethodVarient2;
