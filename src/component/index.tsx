import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {
  ArrowLeft,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  Heart,
  Home,
  Mic,
  Moon,
  Phone,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Sun,
  User,
  X,
  AlertCircle,
} from 'lucide-react';
import { Product } from '../assets';
import {
  useAppDispatch,
  useAppNavigation,
  useAppSelector,
  useScreenSkeleton,
  useTheme,
} from '../hooks';
import { ScreenName, toggleSavedProduct } from '../store/slices/appSlice';

/**
 * Animated Shimmer Block for React Native Skeleton Loading
 */
export const SkeletonBox: React.FC<{
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: ViewStyle;
}> = ({ width = '100%', height = 16, borderRadius = 8, style }) => {
  const { colors } = useTheme();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
    }, 550);
    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={[
        {
          width: width as any,
          height: height as any,
          borderRadius,
          backgroundColor: pulse ? colors.skeletonHighlight : colors.skeletonBase,
        },
        style,
      ]}
    />
  );
};

/**
 * Reusable Screen-Specific Skeleton Layouts for every screen type
 */
export type SkeletonPreset =
  | 'grid'
  | 'detail'
  | 'form'
  | 'list'
  | 'cart'
  | 'orders'
  | 'map'
  | 'chat'
  | 'reviews'
  | 'hero';

export const ScreenSkeleton: React.FC<{
  preset?: SkeletonPreset;
  showHeader?: boolean;
  showBottomTab?: boolean;
  activeTab?: 'Home' | 'Search' | 'Saved' | 'Cart' | 'Account';
}> = ({
  preset = 'list',
  showHeader = true,
  showBottomTab = false,
  activeTab = 'Home',
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.skeletonScreenWrap, { backgroundColor: colors.background }]}>
      <StatusBar />
      {showHeader && (
        <View style={styles.skeletonHeaderRow}>
          <SkeletonBox width={36} height={36} borderRadius={18} />
          <SkeletonBox width={130} height={22} borderRadius={6} />
          <SkeletonBox width={36} height={36} borderRadius={18} />
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.skeletonScroll}
        showsVerticalScrollIndicator={false}
      >
        {preset === 'grid' && (
          <View style={{ gap: 16 }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <SkeletonBox width="80%" height={50} borderRadius={10} />
              <SkeletonBox width="17%" height={50} borderRadius={10} />
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <SkeletonBox width={68} height={36} borderRadius={10} />
              <SkeletonBox width={88} height={36} borderRadius={10} />
              <SkeletonBox width={76} height={36} borderRadius={10} />
              <SkeletonBox width={76} height={36} borderRadius={10} />
            </View>
            <View style={styles.skeletonGridWrap}>
              {[1, 2, 3, 4].map((n) => (
                <View key={n} style={{ width: '47.5%', gap: 8, marginBottom: 14 }}>
                  <SkeletonBox width="100%" height={174} borderRadius={10} />
                  <SkeletonBox width="80%" height={16} borderRadius={5} />
                  <SkeletonBox width="45%" height={13} borderRadius={5} />
                </View>
              ))}
            </View>
          </View>
        )}

        {preset === 'detail' && (
          <View style={{ gap: 16 }}>
            <SkeletonBox width="100%" height={350} borderRadius={12} />
            <SkeletonBox width="65%" height={26} borderRadius={6} />
            <SkeletonBox width="40%" height={18} borderRadius={5} />
            <SkeletonBox width="100%" height={64} borderRadius={8} />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <SkeletonBox width={50} height={48} borderRadius={10} />
              <SkeletonBox width={50} height={48} borderRadius={10} />
              <SkeletonBox width={50} height={48} borderRadius={10} />
            </View>
            <SkeletonBox width="100%" height={54} borderRadius={10} style={{ marginTop: 12 }} />
          </View>
        )}

        {preset === 'form' && (
          <View style={{ gap: 18 }}>
            <SkeletonBox width="70%" height={32} borderRadius={8} />
            <SkeletonBox width="55%" height={16} borderRadius={5} />
            {[1, 2, 3].map((i) => (
              <View key={i} style={{ gap: 8 }}>
                <SkeletonBox width={100} height={15} borderRadius={4} />
                <SkeletonBox width="100%" height={52} borderRadius={10} />
              </View>
            ))}
            <SkeletonBox width="100%" height={54} borderRadius={10} style={{ marginTop: 16 }} />
            <SkeletonBox width="100%" height={54} borderRadius={10} />
          </View>
        )}

        {preset === 'cart' && (
          <View style={{ gap: 14 }}>
            {[1, 2, 3].map((i) => (
              <View
                key={i}
                style={[
                  styles.skeletonCardRow,
                  { borderColor: colors.border, backgroundColor: colors.cardBackground },
                ]}
              >
                <SkeletonBox width={80} height={80} borderRadius={8} />
                <View style={{ flex: 1, gap: 10 }}>
                  <SkeletonBox width="75%" height={16} borderRadius={5} />
                  <SkeletonBox width="35%" height={13} borderRadius={4} />
                  <SkeletonBox width="50%" height={18} borderRadius={5} />
                </View>
              </View>
            ))}
            <View style={{ gap: 10, marginTop: 10 }}>
              <SkeletonBox width="100%" height={18} borderRadius={5} />
              <SkeletonBox width="100%" height={18} borderRadius={5} />
              <SkeletonBox width="100%" height={24} borderRadius={6} />
            </View>
            <SkeletonBox width="100%" height={54} borderRadius={10} style={{ marginTop: 12 }} />
          </View>
        )}

        {preset === 'orders' && (
          <View style={{ gap: 14 }}>
            <SkeletonBox width="100%" height={48} borderRadius={10} />
            {[1, 2, 3, 4].map((i) => (
              <View
                key={i}
                style={[
                  styles.skeletonCardRow,
                  { borderColor: colors.border, backgroundColor: colors.cardBackground },
                ]}
              >
                <SkeletonBox width={80} height={80} borderRadius={8} />
                <View style={{ flex: 1, gap: 10 }}>
                  <SkeletonBox width="70%" height={16} borderRadius={5} />
                  <SkeletonBox width="40%" height={13} borderRadius={4} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <SkeletonBox width={65} height={18} borderRadius={5} />
                    <SkeletonBox width={88} height={30} borderRadius={8} />
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {preset === 'map' && (
          <View style={{ gap: 16 }}>
            <SkeletonBox width="100%" height={280} borderRadius={16} />
            <SkeletonBox width="45%" height={22} borderRadius={6} />
            {[1, 2, 3].map((i) => (
              <View key={i} style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                <SkeletonBox width={22} height={22} borderRadius={11} />
                <View style={{ flex: 1, gap: 6 }}>
                  <SkeletonBox width="40%" height={15} borderRadius={4} />
                  <SkeletonBox width="85%" height={13} borderRadius={4} />
                </View>
              </View>
            ))}
            <SkeletonBox width="100%" height={54} borderRadius={10} />
          </View>
        )}

        {preset === 'chat' && (
          <View style={{ gap: 14 }}>
            <SkeletonBox width={70} height={24} borderRadius={8} style={{ alignSelf: 'center' }} />
            <SkeletonBox width="68%" height={48} borderRadius={12} />
            <SkeletonBox width="74%" height={58} borderRadius={12} />
            <SkeletonBox
              width="70%"
              height={54}
              borderRadius={12}
              style={{ alignSelf: 'flex-end' }}
            />
            <SkeletonBox
              width="52%"
              height={44}
              borderRadius={12}
              style={{ alignSelf: 'flex-end' }}
            />
            <SkeletonBox width="72%" height={58} borderRadius={12} />
          </View>
        )}

        {preset === 'reviews' && (
          <View style={{ gap: 16 }}>
            <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
              <SkeletonBox width={90} height={64} borderRadius={10} />
              <View style={{ flex: 1, gap: 8 }}>
                <SkeletonBox width="75%" height={20} borderRadius={5} />
                <SkeletonBox width="45%" height={15} borderRadius={4} />
              </View>
            </View>
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonBox key={i} width="100%" height={10} borderRadius={5} />
            ))}
            {[1, 2, 3].map((i) => (
              <View key={i} style={{ gap: 8, paddingVertical: 8 }}>
                <SkeletonBox width={100} height={15} borderRadius={4} />
                <SkeletonBox width="100%" height={40} borderRadius={6} />
                <SkeletonBox width={130} height={13} borderRadius={4} />
              </View>
            ))}
          </View>
        )}

        {preset === 'hero' && (
          <View style={{ gap: 20, paddingTop: 12 }}>
            <SkeletonBox width="85%" height={48} borderRadius={10} />
            <SkeletonBox width="70%" height={48} borderRadius={10} />
            <SkeletonBox width="100%" height={420} borderRadius={16} />
            <SkeletonBox width="100%" height={54} borderRadius={10} />
          </View>
        )}

        {preset === 'list' && (
          <View style={{ gap: 14 }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <View
                key={i}
                style={[
                  styles.skeletonListRow,
                  { borderColor: colors.border, backgroundColor: colors.cardBackground },
                ]}
              >
                <SkeletonBox width={36} height={36} borderRadius={10} />
                <View style={{ flex: 1, gap: 6 }}>
                  <SkeletonBox width="65%" height={16} borderRadius={5} />
                  <SkeletonBox width="40%" height={12} borderRadius={4} />
                </View>
                <SkeletonBox width={20} height={20} borderRadius={10} />
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {showBottomTab ? <BottomTabBar activeTab={activeTab} /> : <HomeIndicator />}
    </View>
  );
};

/**
 * Wrapper that automatically shows a Loading Skeleton when switching screens/variants
 * or when Skeleton Preview mode is enabled in the theme bar.
 */
export const ScreenWrapper: React.FC<{
  preset?: SkeletonPreset;
  showHeader?: boolean;
  showBottomTab?: boolean;
  activeTab?: 'Home' | 'Search' | 'Saved' | 'Cart' | 'Account';
  children: React.ReactNode;
}> = ({
  preset = 'list',
  showHeader = true,
  showBottomTab = false,
  activeTab = 'Home',
  children,
}) => {
  const isLoading = useScreenSkeleton();
  if (isLoading) {
    return (
      <ScreenSkeleton
        preset={preset}
        showHeader={showHeader}
        showBottomTab={showBottomTab}
        activeTab={activeTab}
      />
    );
  }
  return <>{children}</>;
};

/**
 * Reusable React Native / Expo StatusBar Component (9:41 + Signal + Wi-Fi + Battery)
 */
export const StatusBar: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const { isDark, colors } = useTheme();
  const useLightText = dark !== undefined ? dark : isDark;
  const textColor = useLightText ? '#FFFFFF' : colors.textPrimary;
  const borderColor = useLightText
    ? 'rgba(255,255,255,0.4)'
    : 'rgba(26,26,26,0.4)';

  return (
    <View style={styles.statusBarContainer}>
      <Text style={[styles.statusBarTime, { color: textColor }]}>9:41</Text>
      <View style={styles.statusBarRight}>
        <View style={styles.signalBars}>
          <View style={[styles.bar, { height: 5, backgroundColor: textColor }]} />
          <View style={[styles.bar, { height: 7, backgroundColor: textColor }]} />
          <View style={[styles.bar, { height: 9, backgroundColor: textColor }]} />
          <View style={[styles.bar, { height: 11, backgroundColor: textColor }]} />
        </View>
        <svg width={16} height={12} viewBox="0 0 16 12" fill={textColor}>
          <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-3.6-1.8a5.2 5.2 0 017.2 0l1.1-1.1a6.8 6.8 0 00-9.4 0l1.1 1.1zm-2.5-2.5a8.8 8.8 0 0112.2 0l1.1-1.1a10.4 10.4 0 00-14.4 0l1.1 1.1z" />
        </svg>
        <View style={styles.batteryWrap}>
          <View style={[styles.batteryBody, { borderColor }]}>
            <View style={[styles.batteryFill, { backgroundColor: textColor }]} />
          </View>
          <View style={[styles.batteryTip, { backgroundColor: textColor }]} />
        </View>
      </View>
    </View>
  );
};

/**
 * Reusable React Native AppHeader Component (Theme-aware)
 */
interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: 'bell' | 'phone' | 'none';
  onRightPress?: () => void;
  showBorder?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack = true,
  onBack,
  rightAction = 'bell',
  onRightPress,
  showBorder = true,
}) => {
  const { goBack, navigateTo } = useAppNavigation();
  const { colors } = useTheme();

  return (
    <View style={[styles.headerWrapper, { backgroundColor: colors.background }]}>
      <View style={styles.headerRow}>
        {showBack ? (
          <TouchableOpacity
            onPress={onBack || goBack}
            style={styles.headerIconButton}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color={colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerIconPlaceholder} />
        )}

        <Text
          style={[styles.headerTitle, { color: colors.textPrimary }]}
          numberOfLines={1}
        >
          {title}
        </Text>

        {rightAction === 'bell' ? (
          <TouchableOpacity
            onPress={
              onRightPress || (() => navigateTo('Notifications', 'varient_1'))
            }
            style={styles.headerIconButton}
            activeOpacity={0.7}
          >
            <Bell size={24} color={colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>
        ) : rightAction === 'phone' ? (
          <TouchableOpacity
            onPress={onRightPress}
            style={styles.headerIconButton}
            activeOpacity={0.7}
          >
            <Phone size={21} color={colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerIconPlaceholder} />
        )}
      </View>
      {showBorder && (
        <View
          style={[styles.headerDivider, { backgroundColor: colors.divider }]}
        />
      )}
    </View>
  );
};

/**
 * Reusable React Native PrimaryButton Component (Theme-aware)
 */
interface PrimaryButtonProps {
  title: string;
  onPress?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'danger' | 'outline';
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  onClick,
  disabled = false,
  variant = 'primary',
  icon,
  rightIcon,
  style,
}) => {
  const { colors, isDark } = useTheme();
  const handlePress = onPress || onClick;

  const backgroundColor = disabled
    ? isDark
      ? '#3F3F46'
      : '#CCCCCC'
    : variant === 'danger'
    ? colors.danger
    : variant === 'outline'
    ? colors.cardBackground
    : colors.primary;

  const textColor = disabled
    ? '#FFFFFF'
    : variant === 'outline'
    ? colors.textPrimary
    : variant === 'danger'
    ? '#FFFFFF'
    : colors.primaryText;

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : handlePress}
      disabled={disabled}
      activeOpacity={0.85}
      style={[
        styles.btnBase,
        {
          backgroundColor,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {icon}
      <Text style={[styles.btnText, { color: textColor }]}>{title}</Text>
      {rightIcon}
    </TouchableOpacity>
  );
};

/**
 * Reusable React Native FormInput Component with Validation States & Theme Support
 */
interface FormInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText?: (val: string) => void;
  onChange?: (val: string) => void;
  type?: 'text' | 'email' | 'password';
  status?: 'default' | 'error' | 'success';
  errorMessage?: string;
  rightIcon?: React.ReactNode;
  editable?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onChange,
  type = 'text',
  status = 'default',
  errorMessage,
  rightIcon,
  editable = true,
}) => {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const handleChange = onChangeText || onChange || (() => {});

  const borderColor =
    status === 'error'
      ? colors.danger
      : status === 'success'
      ? colors.success
      : colors.border;

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputBox,
          { borderColor, backgroundColor: colors.cardBackground },
        ]}
      >
        <TextInput
          value={value}
          editable={editable}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={isPassword && !showPassword}
          style={[styles.textInput, { color: colors.textPrimary }]}
          autoCapitalize="none"
        />
        <View style={styles.inputRightIcons}>
          {status === 'error' && !isPassword && (
            <AlertCircle size={20} color={colors.danger} strokeWidth={2} />
          )}
          {status === 'success' && !isPassword && (
            <CheckCircle2 size={20} color={colors.success} strokeWidth={2} />
          )}
          {isPassword && status === 'success' ? (
            <CheckCircle2 size={20} color={colors.success} strokeWidth={2} />
          ) : isPassword ? (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
            >
              {showPassword ? (
                <Eye size={20} color={colors.textPrimary} />
              ) : (
                <EyeOff size={20} color={colors.textMuted} />
              )}
            </TouchableOpacity>
          ) : null}
          {rightIcon}
        </View>
      </View>
      {status === 'error' && errorMessage ? (
        <Text style={[styles.errorText, { color: colors.danger }]}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
};

/**
 * Reusable React Native SearchBar Component (Theme-aware)
 */
interface SearchBarProps {
  value: string;
  onChangeText?: (val: string) => void;
  onChange?: (val: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
  onFocus?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onChange,
  placeholder = 'Search for clothes...',
  onFilterPress,
  onFocus,
}) => {
  const { colors } = useTheme();
  const handleChange = onChangeText || onChange || (() => {});

  return (
    <View style={styles.searchBarRow}>
      <View
        style={[
          styles.searchInputWrap,
          {
            borderColor: colors.border,
            backgroundColor: colors.cardBackground,
          },
        ]}
      >
        <Search size={20} color={colors.textMuted} />
        <TextInput
          value={value}
          onChangeText={handleChange}
          onFocus={onFocus}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          style={[styles.searchTextInput, { color: colors.textPrimary }]}
        />
        <Mic size={20} color={colors.textMuted} />
      </View>
      {onFilterPress && (
        <TouchableOpacity
          onPress={onFilterPress}
          activeOpacity={0.85}
          style={[styles.filterTriggerBtn, { backgroundColor: colors.primary }]}
        >
          <SlidersHorizontal size={20} color={colors.primaryText} />
        </TouchableOpacity>
      )}
    </View>
  );
};

/**
 * Reusable React Native ProductCard Component (Theme-aware)
 */
interface ProductCardProps {
  product: Product;
  showFilledHeart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showFilledHeart = false,
}) => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const savedIds = useAppSelector((state) => state.app.savedProductIds);
  const isSaved = showFilledHeart || savedIds.includes(product.id);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigateTo('ProductDetails', 'varient_1', product.id)}
      style={styles.productCard}
    >
      <View
        style={[
          styles.productImageContainer,
          { backgroundColor: colors.productTile },
        ]}
      >
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={(e: any) => {
            e?.stopPropagation?.();
            dispatch(toggleSavedProduct(product.id));
          }}
          activeOpacity={0.8}
          style={[styles.heartBadge, { backgroundColor: colors.surfaceElevated }]}
        >
          <Heart
            size={18}
            color={isSaved ? colors.danger : colors.textPrimary}
            fill={isSaved ? colors.danger : 'none'}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={[styles.productTitle, { color: colors.textPrimary }]}
        numberOfLines={1}
      >
        {product.title}
      </Text>
      <View style={styles.productPriceRow}>
        <Text style={[styles.productPrice, { color: colors.textSecondary }]}>
          $ {product.price.toLocaleString()}
        </Text>
        {product.discount ? (
          <Text style={[styles.productDiscount, { color: colors.danger }]}>
            {product.discount}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

/**
 * Reusable React Native EmptyState Component (Theme-aware)
 */
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  subtitle,
}) => {
  const { colors } = useTheme();
  return (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateIcon}>{icon}</View>
      <Text style={[styles.emptyStateTitle, { color: colors.textPrimary }]}>
        {title}
      </Text>
      <Text style={[styles.emptyStateSubtitle, { color: colors.textSecondary }]}>
        {subtitle}
      </Text>
    </View>
  );
};

/**
 * Reusable React Native BottomTabBar Component (Theme-aware)
 */
interface BottomTabBarProps {
  activeTab: 'Home' | 'Search' | 'Saved' | 'Cart' | 'Account';
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab }) => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();

  const tabs: {
    id: 'Home' | 'Search' | 'Saved' | 'Cart' | 'Account';
    label: string;
    screen: ScreenName;
    icon: React.FC<{ size?: number; color?: string; strokeWidth?: number }>;
  }[] = [
    { id: 'Home', label: 'Home', screen: 'Homepage', icon: Home },
    { id: 'Search', label: 'Search', screen: 'Search', icon: Search },
    { id: 'Saved', label: 'Saved', screen: 'SavedItems', icon: Heart },
    { id: 'Cart', label: 'Cart', screen: 'MyCart', icon: ShoppingCart },
    { id: 'Account', label: 'Account', screen: 'Account', icon: User },
  ];

  return (
    <View
      style={[
        styles.bottomTabContainer,
        {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
      ]}
    >
      <View style={styles.bottomTabRow}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => navigateTo(tab.screen, 'varient_1')}
              activeOpacity={0.7}
              style={styles.tabItem}
            >
              <Icon
                size={22}
                color={isActive ? colors.primary : colors.textMuted}
                strokeWidth={isActive ? 2.3 : 1.8}
              />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isActive ? colors.primary : colors.textMuted,
                    fontWeight: isActive ? '700' : '500',
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <HomeIndicator />
    </View>
  );
};

/**
 * Reusable iOS HomeIndicator Bar (Theme-aware)
 */
export const HomeIndicator: React.FC<{ light?: boolean }> = ({ light }) => {
  const { isDark, colors } = useTheme();
  const useLight = light !== undefined ? light : isDark;
  return (
    <View style={styles.homeIndicatorWrap}>
      <View
        style={[
          styles.homeIndicatorPill,
          { backgroundColor: useLight ? '#FFFFFF' : colors.textPrimary },
        ]}
      />
    </View>
  );
};

/**
 * Reusable React Native StatusModal Overlay (Theme-aware)
 */
interface StatusModalProps {
  type: 'success' | 'danger';
  title: string;
  message: string;
  primaryButtonText: string;
  onPrimaryPress: () => void;
  secondaryButtonText?: string;
  onSecondaryPress?: () => void;
}

export const StatusModal: React.FC<StatusModalProps> = ({
  type,
  title,
  message,
  primaryButtonText,
  onPrimaryPress,
  secondaryButtonText,
  onSecondaryPress,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
      <View
        style={[
          styles.modalCard,
          { backgroundColor: colors.surfaceElevated },
        ]}
      >
        {type === 'success' ? (
          <View
            style={[
              styles.modalSuccessBadge,
              {
                backgroundColor: colors.successBg,
                borderColor: colors.success,
              },
            ]}
          >
            <Check size={32} color={colors.success} strokeWidth={3} />
          </View>
        ) : (
          <View
            style={[
              styles.modalDangerBadge,
              {
                backgroundColor: colors.dangerBg,
                borderColor: colors.danger,
              },
            ]}
          >
            <Text
              style={[styles.modalDangerExclamation, { color: colors.danger }]}
            >
              !
            </Text>
          </View>
        )}

        <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
          {title}
        </Text>
        <Text style={[styles.modalMessage, { color: colors.textSecondary }]}>
          {message}
        </Text>

        <View style={styles.modalButtonStack}>
          <PrimaryButton
            title={primaryButtonText}
            variant={type === 'danger' ? 'danger' : 'primary'}
            onPress={onPrimaryPress}
          />
          {secondaryButtonText && onSecondaryPress && (
            <PrimaryButton
              title={secondaryButtonText}
              variant="outline"
              onPress={onSecondaryPress}
            />
          )}
        </View>
      </View>
    </View>
  );
};

/**
 * Reusable React Native Simulated iOS Keyboard (Theme-aware)
 */
export const IOSKeyboard: React.FC<{ onKeyPress?: (key: string) => void }> = ({
  onKeyPress,
}) => {
  const { colors } = useTheme();
  const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  return (
    <View
      style={[
        styles.keyboardContainer,
        { backgroundColor: colors.keyboardBg },
      ]}
    >
      <View style={styles.kbRow}>
        {row1.map((k) => (
          <TouchableOpacity
            key={k}
            onPress={() => onKeyPress?.(k)}
            style={[styles.kbKey, { backgroundColor: colors.keyboardKey }]}
            activeOpacity={0.6}
          >
            <Text style={[styles.kbKeyText, { color: colors.textPrimary }]}>
              {k}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.kbRow, { paddingHorizontal: 16 }]}>
        {row2.map((k) => (
          <TouchableOpacity
            key={k}
            onPress={() => onKeyPress?.(k)}
            style={[styles.kbKey, { backgroundColor: colors.keyboardKey }]}
            activeOpacity={0.6}
          >
            <Text style={[styles.kbKeyText, { color: colors.textPrimary }]}>
              {k}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.kbRow}>
        <TouchableOpacity
          style={[styles.kbSpecialKey, { backgroundColor: colors.keyboardKey }]}
          activeOpacity={0.6}
        >
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill={colors.textPrimary}
          >
            <path d="M12 3l8 8h-5v8H9v-8H4l8-8z" />
          </svg>
        </TouchableOpacity>
        <View style={styles.kbRowInner}>
          {row3.map((k) => (
            <TouchableOpacity
              key={k}
              onPress={() => onKeyPress?.(k)}
              style={[styles.kbKey, { backgroundColor: colors.keyboardKey }]}
              activeOpacity={0.6}
            >
              <Text style={[styles.kbKeyText, { color: colors.textPrimary }]}>
                {k}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => onKeyPress?.('BACKSPACE')}
          style={[
            styles.kbSpecialKey,
            { backgroundColor: colors.keyboardSpecialKey },
          ]}
          activeOpacity={0.6}
        >
          <X size={16} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
      <View style={styles.kbRow}>
        <TouchableOpacity
          style={[
            styles.kbActionKey,
            { backgroundColor: colors.keyboardSpecialKey },
          ]}
          activeOpacity={0.6}
        >
          <Text style={[styles.kbActionText, { color: colors.textPrimary }]}>
            123
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onKeyPress?.(' ')}
          style={[styles.kbSpaceKey, { backgroundColor: colors.keyboardKey }]}
          activeOpacity={0.6}
        >
          <Text style={[styles.kbSpaceText, { color: colors.textPrimary }]}>
            space
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.kbActionKey,
            { backgroundColor: colors.keyboardSpecialKey },
          ]}
          activeOpacity={0.6}
        >
          <Text style={[styles.kbActionText, { color: colors.textPrimary }]}>
            return
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.kbFooter}>
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.textSecondary}
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 15a5 5 0 007 0M9 10h.01M15 10h.01" strokeLinecap="round" />
        </svg>
        <Mic size={22} color={colors.textSecondary} />
      </View>
      <HomeIndicator />
    </View>
  );
};

/**
 * Reusable React Native Social Auth Buttons (Theme-aware)
 */
export const SocialAuthButtons: React.FC<{
  mode: 'Sign Up' | 'Login';
  onPress: () => void;
}> = ({ mode, onPress }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.socialContainer}>
      <View style={styles.orDividerRow}>
        <View style={[styles.orLine, { backgroundColor: colors.divider }]} />
        <Text style={[styles.orText, { color: colors.textSecondary }]}>Or</Text>
        <View style={[styles.orLine, { backgroundColor: colors.divider }]} />
      </View>

      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          styles.googleBtn,
          {
            borderColor: colors.border,
            backgroundColor: colors.cardBackground,
          },
        ]}
      >
        <svg width={20} height={20} viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
          />
        </svg>
        <Text style={[styles.googleBtnText, { color: colors.textPrimary }]}>
          {mode} with Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={styles.fbBtn}
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="#FFFFFF">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        <Text style={styles.fbBtnText}>{mode} with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

/**
 * Reusable Full-Application Color Palette Selector Card for Account Screens
 */
export const AppColorSelectorCard: React.FC<{ compact?: boolean }> = ({
  compact = false,
}) => {
  const {
    colors,
    colorPreset,
    presets,
    setColorPreset,
    fontPreset,
    fontPresets,
    setFontPreset,
    isDark,
    toggleTheme,
  } = useTheme();

  const activePresetObj =
    presets.find((p) => p.id === colorPreset) || presets[0];
  const activeFontObj =
    fontPresets.find((f) => f.id === fontPreset) || fontPresets[0];
  const [fontMenuOpen, setFontMenuOpen] = useState(false);

  return (
    <View
      style={[
        styles.colorSelectorCard,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          marginHorizontal: compact ? 0 : 24,
        },
      ]}
    >
      <View style={styles.colorSelectorHeader}>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.colorSelectorTitle, { color: colors.textPrimary }]}
          >
            App Color Theme
          </Text>
          <Text
            style={[
              styles.colorSelectorSubtitle,
              { color: colors.textSecondary },
            ]}
          >
            {activePresetObj.name} • {activePresetObj.tagline}
          </Text>
        </View>
        {colorPreset !== 'obsidian' && (
          <TouchableOpacity
            onPress={() => setColorPreset('obsidian')}
            style={[
              styles.resetColorBtn,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[styles.resetColorText, { color: colors.textPrimary }]}
            >
              Reset Default
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Swatches Row */}
      <View style={styles.swatchesWrap}>
        {presets.map((preset) => {
          const isSelected = preset.id === colorPreset;
          return (
            <TouchableOpacity
              key={preset.id}
              onPress={() => setColorPreset(preset.id)}
              activeOpacity={0.8}
              style={[
                styles.swatchItem,
                {
                  borderColor: isSelected ? colors.primary : colors.border,
                  backgroundColor: isSelected
                    ? colors.surface
                    : colors.cardBackground,
                },
              ]}
            >
              <View
                style={[
                  styles.swatchCircle,
                  { backgroundColor: preset.swatch },
                ]}
              >
                {isSelected && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
              </View>
              <Text
                style={[
                  styles.swatchName,
                  {
                    color: isSelected ? colors.primary : colors.textPrimary,
                    fontWeight: isSelected ? '700' : '500',
                  },
                ]}
                numberOfLines={1}
              >
                {preset.name.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Live Preview Pill Bar */}
      <View
        style={[
          styles.colorPreviewBar,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={styles.colorPreviewLeft}>
          <View
            style={[styles.liveDot, { backgroundColor: colors.primary }]}
          />
          <Text
            style={[styles.colorPreviewText, { color: colors.textPrimary }]}
          >
            Applied across all 23 screens ({isDark ? 'Dark' : 'Light'})
          </Text>
        </View>
        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.modeMiniBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.modeMiniBtnText, { color: colors.primaryText }]}>
            {isDark ? 'Switch Light' : 'Switch Dark'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Full-App Font Family Dropdown Selector */}
      <View
        style={[
          styles.fontSectionDivider,
          { borderTopColor: colors.divider },
        ]}
      >
        <View style={styles.colorSelectorHeader}>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.colorSelectorTitle, { color: colors.textPrimary }]}
            >
              App Font Family ({fontPresets.length} Premium Fonts)
            </Text>
            <Text
              style={[
                styles.colorSelectorSubtitle,
                { color: colors.textSecondary },
              ]}
            >
              {activeFontObj.name} • {activeFontObj.category}
            </Text>
          </View>
          {fontPreset !== 'jakarta' && (
            <TouchableOpacity
              onPress={() => setFontPreset('jakarta')}
              style={[
                styles.resetColorBtn,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[styles.resetColorText, { color: colors.textPrimary }]}
              >
                Reset
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Cross-Platform Expandable Font Dropdown Trigger */}
        <TouchableOpacity
          onPress={() => setFontMenuOpen((prev) => !prev)}
          activeOpacity={0.85}
          style={[
            styles.fontDropdownSelectBox,
            {
              backgroundColor: colors.surface,
              borderColor: fontMenuOpen ? colors.primary : colors.border,
            },
          ]}
        >
          <View style={styles.fontDropdownLeftRow}>
            <View
              style={[
                styles.fontSampleBadge,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text
                style={{
                  color: colors.primaryText,
                  fontSize: 13,
                  fontWeight: '800',
                  fontFamily: activeFontObj.fontFamily,
                }}
              >
                Aa
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 13.5,
                  fontWeight: '700',
                  color: colors.textPrimary,
                  fontFamily: activeFontObj.fontFamily,
                }}
                numberOfLines={1}
              >
                {activeFontObj.name}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color: colors.textSecondary,
                }}
                numberOfLines={1}
              >
                {activeFontObj.category}
              </Text>
            </View>
          </View>
          <View style={styles.fontDropdownRightRow}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: colors.primary,
              }}
            >
              {fontMenuOpen ? 'Close' : 'Change Font'}
            </Text>
            <ChevronDown size={16} color={colors.textPrimary} />
          </View>
        </TouchableOpacity>

        {fontMenuOpen && (
          <View
            style={[
              styles.fontDropdownMenuWrap,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <ScrollView
              style={{ maxHeight: 220 }}
              nestedScrollEnabled
              showsVerticalScrollIndicator={true}
            >
              {fontPresets.map((fp, idx) => {
                const isSelected = fp.id === fontPreset;
                return (
                  <TouchableOpacity
                    key={fp.id}
                    onPress={() => {
                      setFontPreset(fp.id);
                      setFontMenuOpen(false);
                    }}
                    activeOpacity={0.8}
                    style={[
                      styles.fontDropdownOptionRow,
                      {
                        backgroundColor: isSelected
                          ? colors.primary
                          : 'transparent',
                        borderBottomColor: colors.divider,
                      },
                    ]}
                  >
                    <View style={styles.fontDropdownLeftRow}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '800',
                          width: 24,
                          color: isSelected
                            ? colors.primaryText
                            : colors.textPrimary,
                          fontFamily: fp.fontFamily,
                        }}
                      >
                        Aa
                      </Text>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: '700',
                            color: isSelected
                              ? colors.primaryText
                              : colors.textPrimary,
                            fontFamily: fp.fontFamily,
                          }}
                        >
                          {idx + 1}. {fp.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10.5,
                            color: isSelected
                              ? colors.primaryText
                              : colors.textSecondary,
                            opacity: isSelected ? 0.85 : 1,
                          }}
                        >
                          {fp.category}
                        </Text>
                      </View>
                    </View>
                    {isSelected && (
                      <Check size={15} color={colors.primaryText} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonScreenWrap: {
    flex: 1,
  },
  skeletonHeaderRow: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skeletonScroll: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
    flexGrow: 1,
  },
  skeletonGridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skeletonCardRow: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 14,
    alignItems: 'center',
  },
  skeletonListRow: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 14,
    alignItems: 'center',
  },
  statusBarContainer: {
    width: '100%',
    height: 44,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBarTime: {
    fontSize: 15,
    fontWeight: '600',
  },
  statusBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 12,
  },
  bar: {
    width: 3,
    borderRadius: 1,
  },
  batteryWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryBody: {
    width: 22,
    height: 11,
    borderRadius: 3,
    borderWidth: 1,
    padding: 1.5,
  },
  batteryFill: {
    flex: 1,
    borderRadius: 1.5,
  },
  batteryTip: {
    width: 1.5,
    height: 4,
    marginLeft: 1,
    opacity: 0.5,
  },
  headerWrapper: {
    paddingHorizontal: 24,
    paddingTop: 6,
    paddingBottom: 12,
  },
  headerRow: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: -8,
  },
  headerIconPlaceholder: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerDivider: {
    height: 1,
    marginTop: 8,
  },
  btnBase: {
    width: '100%',
    height: 54,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  inputContainer: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputBox: {
    width: '100%',
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    height: '100%',
    outlineStyle: 'none',
  } as any,
  inputRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 8,
  },
  eyeBtn: {
    padding: 4,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 5,
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  searchInputWrap: {
    flex: 1,
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchTextInput: {
    flex: 1,
    fontSize: 15,
    height: '100%',
    outlineStyle: 'none',
  } as any,
  filterTriggerBtn: {
    width: 52,
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCard: {
    width: '47.5%',
    marginBottom: 18,
  },
  productImageContainer: {
    width: '100%',
    height: 174,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  heartBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  productPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '500',
  },
  productDiscount: {
    fontSize: 12,
    fontWeight: '700',
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    paddingVertical: 60,
  },
  emptyStateIcon: {
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomTabContainer: {
    width: '100%',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  bottomTabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    flex: 1,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  homeIndicatorWrap: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 6,
  },
  homeIndicatorPill: {
    width: 134,
    height: 5,
    borderRadius: 999,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    zIndex: 60,
  },
  modalCard: {
    width: '100%',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  modalSuccessBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalDangerBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalDangerExclamation: {
    fontSize: 34,
    fontWeight: '700',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
  },
  modalButtonStack: {
    width: '100%',
    gap: 12,
  },
  keyboardContainer: {
    width: '100%',
    paddingTop: 8,
    paddingHorizontal: 6,
  },
  kbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    marginBottom: 9,
  },
  kbRowInner: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
  },
  kbKey: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kbKeyText: {
    fontSize: 17,
  },
  kbSpecialKey: {
    width: 40,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kbActionKey: {
    width: 84,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kbActionText: {
    fontSize: 15,
    fontWeight: '500',
  },
  kbSpaceKey: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kbSpaceText: {
    fontSize: 15,
  },
  kbFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 2,
  },
  socialContainer: {
    width: '100%',
    gap: 14,
  },
  orDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 6,
  },
  orLine: {
    flex: 1,
    height: 1,
  },
  orText: {
    fontSize: 14,
  },
  googleBtn: {
    width: '100%',
    height: 54,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  googleBtnText: {
    fontSize: 15,
    fontWeight: '600',
  },
  fbBtn: {
    width: '100%',
    height: 54,
    borderRadius: 10,
    backgroundColor: '#1877F2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  fbBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  colorSelectorCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginTop: 14,
    marginBottom: 14,
  },
  colorSelectorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  colorSelectorTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  colorSelectorSubtitle: {
    fontSize: 11.5,
    marginTop: 2,
  },
  resetColorBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  resetColorText: {
    fontSize: 11,
    fontWeight: '700',
  },
  swatchesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  swatchItem: {
    width: '22.8%',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 5,
  },
  swatchCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatchName: {
    fontSize: 10.5,
  },
  colorPreviewBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  colorPreviewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  colorPreviewText: {
    fontSize: 11,
    fontWeight: '600',
  },
  modeMiniBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  modeMiniBtnText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  fontSectionDivider: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
  },
  fontDropdownSelectBox: {
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  fontDropdownLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  fontSampleBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontDropdownRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  fontDropdownMenuWrap: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  fontDropdownOptionRow: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
});
