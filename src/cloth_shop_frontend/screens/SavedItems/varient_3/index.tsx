import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { FolderHeart, Plus, Sparkles } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';
import { useGetProductsQuery } from '../../../store/api/dummyApi';

export const SavedItemsVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const { data: products = [] } = useGetProductsQuery();
  const [activeBoard, setActiveBoard] = useState('All Boards');

  const boards = ['All Boards', 'Summer Capsule', 'Gym Rotation', 'Archive'];

  const boardGroups = [
    {
      title: 'Monochrome Streetwear',
      subtitle: '4 Curated Pieces • $4,620 Est.',
      items: products.slice(0, 3),
    },
    {
      title: 'Weekend Smart Casual',
      subtitle: '3 Curated Pieces • $3,190 Est.',
      items: products.slice(2, 5),
    },
  ];

  return (
    <ScreenWrapper preset="grid" showBottomTab activeTab="Saved">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Style Moodboards" showBorder={false} />

        {/* Board Filter Tabs */}
        <View style={styles.tabsWrap}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScroll}
          >
            {boards.map((b) => {
              const active = activeBoard === b;
              return (
                <TouchableOpacity
                  key={b}
                  onPress={() => setActiveBoard(b)}
                  style={[
                    styles.boardPill,
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
                      styles.boardPillText,
                      {
                        color: active
                          ? colors.primaryText
                          : colors.textPrimary,
                      },
                    ]}
                  >
                    {b}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {boardGroups.map((board) => (
            <View
              key={board.title}
              style={[
                styles.boardCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              {/* 3-Photo Collage Preview */}
              <View style={styles.collageRow}>
                {board.items[0] && (
                  <TouchableOpacity
                    onPress={() =>
                      navigateTo(
                        'ProductDetails',
                        'varient_2',
                        board.items[0].id
                      )
                    }
                    style={[
                      styles.collageMain,
                      { backgroundColor: colors.productTile },
                    ]}
                  >
                    <Image
                      source={{ uri: board.items[0].image }}
                      style={styles.fullImg}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                )}
                <View style={styles.collageSideCol}>
                  {board.items.slice(1, 3).map((sub) => (
                    <TouchableOpacity
                      key={sub.id}
                      onPress={() =>
                        navigateTo('ProductDetails', 'varient_2', sub.id)
                      }
                      style={[
                        styles.collageSmall,
                        { backgroundColor: colors.productTile },
                      ]}
                    >
                      <Image
                        source={{ uri: sub.image }}
                        style={styles.fullImg}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.boardFooter}>
                <View style={styles.boardTextCol}>
                  <View style={styles.boardTitleRow}>
                    <FolderHeart size={16} color={colors.textPrimary} />
                    <Text
                      style={[
                        styles.boardTitle,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {board.title}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.boardSubtitle,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {board.subtitle}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => navigateTo('SavedItems', 'varient_1')}
                  style={[
                    styles.openBoardBtn,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  <Sparkles size={14} color={colors.textPrimary} />
                  <Text
                    style={[
                      styles.openBoardText,
                      { color: colors.textPrimary },
                    ]}
                  >
                    Open
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Create New Collection Button */}
          <TouchableOpacity
            onPress={() => navigateTo('Homepage', 'varient_1')}
            style={[
              styles.newBoardBtn,
              {
                borderColor: colors.border,
                backgroundColor: colors.surface,
              },
            ]}
          >
            <Plus size={18} color={colors.textPrimary} />
            <Text style={[styles.newBoardText, { color: colors.textPrimary }]}>
              Create New Outfit Moodboard
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomTabBar activeTab="Saved" />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsWrap: {
    marginBottom: 12,
  },
  tabsScroll: {
    paddingHorizontal: 24,
    gap: 8,
  },
  boardPill: {
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardPillText: {
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 16,
  },
  boardCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 12,
    gap: 12,
  },
  collageRow: {
    height: 170,
    flexDirection: 'row',
    gap: 8,
  },
  collageMain: {
    flex: 1.4,
    borderRadius: 14,
    overflow: 'hidden',
  },
  collageSideCol: {
    flex: 1,
    gap: 8,
  },
  collageSmall: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  fullImg: {
    width: '100%',
    height: '100%',
  },
  boardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  boardTextCol: {
    gap: 2,
  },
  boardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  boardTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  boardSubtitle: {
    fontSize: 12.5,
  },
  openBoardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    height: 34,
    borderRadius: 10,
  },
  openBoardText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  newBoardBtn: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  newBoardText: {
    fontSize: 14,
    fontWeight: '700',
  },
});

export default SavedItemsVarient3;
