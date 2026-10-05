import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  EmptyState,
  ProductCard,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppSelector, useTheme } from '../../../hooks';
import { useGetProductsQuery } from '../../../store/api/dummyApi';

export const SavedItemsView: React.FC<{ forceEmpty?: boolean }> = ({
  forceEmpty = false,
}) => {
  const { data: products = [] } = useGetProductsQuery();
  const { colors } = useTheme();
  const savedIds = useAppSelector((state) => state.app.savedProductIds);

  const savedProducts = forceEmpty
    ? []
    : products.filter((p) => savedIds.includes(p.id));

  return (
    <ScreenWrapper preset="grid" showBottomTab activeTab="Saved">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Saved Items" showBorder={forceEmpty} />

        {savedProducts.length > 0 ? (
          <ScrollView
            contentContainerStyle={styles.gridContent}
            showsVerticalScrollIndicator={false}
          >
            {savedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{ ...product, price: 1190, discount: undefined }}
                showFilledHeart
              />
            ))}
          </ScrollView>
        ) : (
          <EmptyState
            icon={<Heart size={64} color={colors.textMuted} strokeWidth={1.8} />}
            title="No Saved Items!"
            subtitle={
              'You don’t have any saved items.\nGo to home and add some.'
            }
          />
        )}

        <BottomTabBar activeTab="Saved" />
      </View>
    </ScreenWrapper>
  );
};

export const SavedItemsVarient1: React.FC = () => (
  <SavedItemsView forceEmpty={false} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContent: {
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default SavedItemsVarient1;
