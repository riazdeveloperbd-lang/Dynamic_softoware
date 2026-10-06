// Expo shims for web environment

export const Haptics = {
  impactAsync: async () => {},
  notificationAsync: async () => {},
  selectionAsync: async () => {},
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
  NotificationFeedbackType: {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  },
};

export const impactAsync = Haptics.impactAsync;
export const notificationAsync = Haptics.notificationAsync;
export const selectionAsync = Haptics.selectionAsync;
export const ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle;
export const NotificationFeedbackType = Haptics.NotificationFeedbackType;

export const setStringAsync = async (text: string) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
};

export const getStringAsync = async () => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      return await navigator.clipboard.readText();
    } catch (e) {
      return '';
    }
  }
  return '';
};

export const Clipboard = {
  setStringAsync,
  getStringAsync,
};

export const ImagePicker = {
  launchImageLibraryAsync: async () => ({ canceled: true }),
  MediaTypeOptions: {
    Images: 'Images',
    Videos: 'Videos',
    All: 'All',
  },
};

export const WebBrowser = {
  WebBrowserPresentationStyle: { AUTOMATIC: 'automatic' },
  openBrowserAsync: async (url: string) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  },
};

export const Print = {
  printToFileAsync: async ({ html }: { html: string }) => {
    if (typeof window !== 'undefined') {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.print();
      }
    }
    return { uri: '' };
  },
};

export const printToFileAsync = Print.printToFileAsync;

export const Sharing = {
  isAvailableAsync: async () => true,
  shareAsync: async () => {},
};

export const isAvailableAsync = Sharing.isAvailableAsync;
export const shareAsync = Sharing.shareAsync;

export const SymbolView = () => null;

export default {
  Haptics,
  Clipboard,
  ImagePicker,
  WebBrowser,
  Print,
  Sharing,
  SymbolView,
};
