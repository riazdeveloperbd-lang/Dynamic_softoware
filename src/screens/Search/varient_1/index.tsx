import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ArrowUpRight, Search, XCircle } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  EmptyState,
  ScreenWrapper,
  SearchBar,
  StatusBar,
} from '../../../component';
import {
  useAppDispatch,
  useAppNavigation,
  useAppSelector,
  useTheme,
} from '../../../hooks';
import { useGetProductsQuery } from '../../../store/api/dummyApi';
import {
  clearRecentSearches,
  removeRecentSearch,
} from '../../../store/slices/appSlice';

export interface SearchViewProps {
  initialMode?: 'recent' | 'active' | 'empty';
}

export const SearchView: React.FC<SearchViewProps> = ({
  initialMode = 'recent',
}) => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const recentSearches = useAppSelector((state) => state.app.recentSearches);

  const [query, setQuery] = useState(
    initialMode === 'active'
      ? 'Regul'
      : initialMode === 'empty'
      ? 'daasdc'
      : ''
  );

  useEffect(() => {
    if (initialMode === 'active') setQuery('Regul');
    else if (initialMode === 'empty') setQuery('daasdc');
    else setQuery('');
  }, [initialMode]);

  const { data: results = [] } = useGetProductsQuery({
    search: query.trim() || undefined,
  });

  const isTyping = query.trim().length > 0;

  return (
    <ScreenWrapper preset="list" showBottomTab activeTab="Search">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Search" showBorder={false} />

        <View style={styles.searchWrap}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder="Search for clothes..."
          />
        </View>

        <ScrollView
          style={styles.body}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {!isTyping ? (
            <View style={styles.recentSection}>
              <View style={styles.recentHeaderRow}>
                <Text
                  style={[styles.recentTitle, { color: colors.textPrimary }]}
                >
                  Recent Searches
                </Text>
                <TouchableOpacity
                  onPress={() => dispatch(clearRecentSearches())}
                >
                  <Text
                    style={[
                      styles.clearAllText,
                      { color: colors.textPrimary },
                    ]}
                  >
                    Clear all
                  </Text>
                </TouchableOpacity>
              </View>

              {recentSearches.map((item) => (
                <View
                  key={item}
                  style={[
                    styles.recentItemRow,
                    { borderBottomColor: colors.divider },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => setQuery(item)}
                    style={{ flex: 1 }}
                  >
                    <Text
                      style={[
                        styles.recentItemText,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => dispatch(removeRecentSearch(item))}
                  >
                    <XCircle size={20} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : results.length > 0 ? (
            <View style={styles.resultsList}>
              {results.slice(0, 4).map((product) => (
                <TouchableOpacity
                  key={product.id}
                  onPress={() =>
                    navigateTo('ProductDetails', 'varient_1', product.id)
                  }
                  style={[
                    styles.resultRow,
                    { borderBottomColor: colors.divider },
                  ]}
                >
                  <Image
                    source={{ uri: product.image }}
                    style={[
                      styles.resultThumb,
                      { backgroundColor: colors.productTile },
                    ]}
                    resizeMode="cover"
                  />
                  <View style={styles.resultMeta}>
                    <Text
                      style={[
                        styles.resultTitle,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {product.title}
                    </Text>
                    <View style={styles.resultPriceRow}>
                      <Text
                        style={[
                          styles.resultPrice,
                          { color: colors.textSecondary },
                        ]}
                      >
                        $ {product.price.toLocaleString()}
                      </Text>
                      {product.discount ? (
                        <Text
                          style={[
                            styles.resultDiscount,
                            { color: colors.danger },
                          ]}
                        >
                          {product.discount}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                  <ArrowUpRight size={22} color={colors.textPrimary} />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <EmptyState
              icon={
                <Search size={64} color={colors.textMuted} strokeWidth={1.8} />
              }
              title="No Results Found!"
              subtitle="Try a similar word or something more general."
            />
          )}
        </ScrollView>

        <BottomTabBar activeTab="Search" />
      </View>
    </ScreenWrapper>
  );
};

export const SearchVarient1: React.FC = () => (
  <SearchView initialMode="recent" />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchWrap: {
    paddingHorizontal: 24,
    marginBottom: 14,
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
  },
  recentSection: {
    paddingTop: 4,
  },
  recentHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  clearAllText: {
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  recentItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  recentItemText: {
    fontSize: 15,
  },
  resultsList: {
    paddingTop: 4,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 14,
  },
  resultThumb: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  resultMeta: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3,
  },
  resultPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  resultPrice: {
    fontSize: 13,
  },
  resultDiscount: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default SearchVarient1;
