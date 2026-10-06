import { useAppTheme } from '@/context/ThemeContext';

export function useTheme() {
  const themeContext = useAppTheme();
  return {
    ...themeContext,
    theme: themeContext.theme,
    colors: themeContext.colors,
    colorScheme: themeContext.theme,
  };
}

export default useTheme;
