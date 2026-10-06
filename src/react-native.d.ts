declare module 'react-native' {
  export type StyleProp<T> = T | T[] | undefined | null | false | Record<string, any>;
  export type ViewStyle = Record<string, any>;
  export type TextStyle = Record<string, any>;
  export type ImageStyle = Record<string, any>;
  export type TextProps = Record<string, any>;
  export type ViewProps = Record<string, any>;
  export type LayoutChangeEvent = {
    nativeEvent: {
      layout: {
        x: number;
        y: number;
        width: number;
        height: number;
      };
    };
  };

  export const View: any;
  export const Text: any;
  export const Image: any;
  export const TextInput: any;
  export const TouchableOpacity: any;
  export const Pressable: any;
  export const ScrollView: any;
  export const FlatList: any;
  export const SafeAreaView: any;
  export const ActivityIndicator: any;
  export const Switch: any;
  export const Modal: any;
  export const KeyboardAvoidingView: any;
  export const StatusBar: any;
  export const Alert: any;
  export const Animated: any;
  export const PanResponder: {
    create: (config: any) => any;
  };
  export const useColorScheme: () => 'light' | 'dark' | 'unspecified' | null;
  export const Dimensions: {
    get: (dim: 'window' | 'screen') => { width: number; height: number; scale: number; fontScale: number };
  };
  export const Platform: {
    OS: 'ios' | 'android' | 'web';
    select: <T>(specifics: { ios?: T; android?: T; web?: T; default?: T }) => T;
  };
  export const StyleSheet: {
    create: <T extends Record<string, any>>(styles: T) => T;
    flatten: (style?: any) => any;
    hairlineWidth: number;
    absoluteFill: Record<string, any>;
    absoluteFillObject: Record<string, any>;
  };
}

declare module 'react-native-safe-area-context' {
  export const SafeAreaProvider: any;
  export const SafeAreaView: any;
  export const useSafeAreaInsets: () => { top: number; right: number; bottom: number; left: number };
}

declare module 'expo-status-bar' {
  export const StatusBar: any;
}

declare module 'expo-splash-screen' {
  export const hideAsync: () => Promise<boolean>;
  export const preventAutoHideAsync: () => Promise<boolean>;
}

declare module 'expo-router' {
  export type Href = string | Record<string, any>;
  export const Stack: any;
  export const Tabs: any;
  export const useRouter: () => any;
  export const useLocalSearchParams: () => any;
  export const Redirect: any;
  export const Link: any;
}

declare module 'expo-router/unstable-native-tabs' {
  export const NativeTabs: any;
}

declare module 'expo-router/ui' {
  export type TabTriggerSlotProps = any;
  export type TabListProps = any;
  export const Tabs: any;
  export const TabList: any;
  export const TabTrigger: any;
  export const TabSlot: any;
}

declare module 'expo-symbols' {
  export const SymbolView: any;
}

declare module 'expo-haptics' {
  export const impactAsync: (style?: any) => Promise<void>;
  export const notificationAsync: (type?: any) => Promise<void>;
  export const selectionAsync: () => Promise<void>;
  export const ImpactFeedbackStyle: {
    Light: string;
    Medium: string;
    Heavy: string;
  };
  export const NotificationFeedbackType: {
    Success: string;
    Warning: string;
    Error: string;
  };
}

declare module 'expo-clipboard' {
  export const setStringAsync: (text: string) => Promise<boolean>;
  export const getStringAsync: () => Promise<string>;
}

declare module 'expo-image-picker' {
  export const launchImageLibraryAsync: (options?: any) => Promise<{ canceled: boolean; assets?: Array<{ uri: string }> }>;
  export const MediaTypeOptions: {
    Images: string;
    Videos: string;
    All: string;
  };
}

declare module 'expo-print' {
  export const printToFileAsync: (options: { html: string }) => Promise<{ uri: string }>;
}

declare module 'expo-sharing' {
  export const isAvailableAsync: () => Promise<boolean>;
  export const shareAsync: (uri: string, options?: any) => Promise<void>;
}

declare module 'expo-image' {
  export const Image: any;
}

declare module 'expo-web-browser' {
  export const WebBrowserPresentationStyle: any;
  export const openBrowserAsync: (url: string, options?: any) => Promise<any>;
}

declare module 'react-native-reanimated' {
  const Animated: any;
  export default Animated;
  export const Keyframe: any;
  export const FadeIn: any;
  export const useSharedValue: (initial: any) => { value: any };
  export const useAnimatedStyle: (cb: () => any) => any;
  export const withTiming: (toValue: any, config?: any, cb?: (finished?: any) => void) => any;
  export const withSpring: (toValue: any, config?: any) => any;
  export const withSequence: (...animations: any[]) => any;
  export const Easing: any;
}

declare module 'react-native-worklets' {
  export const runOnJS: <T extends (...args: any[]) => any>(fn: T) => T;
  export const scheduleOnRN: (cb: () => void) => void;
}
