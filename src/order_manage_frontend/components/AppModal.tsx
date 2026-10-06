import React from 'react';
import { View, StyleSheet, Modal, Platform } from 'react-native';

interface AppModalProps {
  visible: boolean;
  onRequestClose?: () => void;
  children: React.ReactNode;
  animationType?: 'none' | 'slide' | 'fade';
  transparent?: boolean;
}

/**
 * Responsive AppModal
 * - On Web / Simulator: Renders as an absolute overlay bounded strictly inside the mobile device frame.
 * - On Native Mobile: Uses standard React Native Modal.
 */
export function AppModal({
  visible,
  onRequestClose,
  children,
  animationType = 'slide',
  transparent = true,
}: AppModalProps) {
  if (!visible) return null;

  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        {children}
      </View>
    );
  }

  return (
    <Modal
      visible={visible}
      animationType={animationType}
      transparent={transparent}
      onRequestClose={onRequestClose}
    >
      {children}
    </Modal>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999,
    overflow: 'hidden',
  },
});

export default AppModal;
