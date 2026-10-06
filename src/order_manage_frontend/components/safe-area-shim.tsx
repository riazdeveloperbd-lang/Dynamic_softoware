import React from 'react';
import { View } from 'react-native';

export const SafeAreaProvider: React.FC<{ children?: React.ReactNode; style?: any }> = ({ children, style }) => {
  return <View style={[{ flex: 1, width: '100%', height: '100%' }, style]}>{children}</View>;
};

export const SafeAreaView: React.FC<{ children?: React.ReactNode; style?: any }> = ({ children, style }) => {
  return <View style={[{ flex: 1, width: '100%', height: '100%' }, style]}>{children}</View>;
};

export const useSafeAreaInsets = () => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

export const SafeAreaConsumer: React.FC<{ children: (insets: any) => React.ReactNode }> = ({ children }) => {
  return <>{children({ top: 0, right: 0, bottom: 0, left: 0 })}</>;
};

export const initialWindowMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export default {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
  SafeAreaConsumer,
  initialWindowMetrics,
};
