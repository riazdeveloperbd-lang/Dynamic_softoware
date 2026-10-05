declare module 'react-native' {
  export type StyleProp<T> = T | T[] | undefined | null | false | Record<string, any>;
  export type ViewStyle = Record<string, any>;
  export type TextStyle = Record<string, any>;
  export type ImageStyle = Record<string, any>;

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
    absoluteFillObject: Record<string, any>;
  };
}
