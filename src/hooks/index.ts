import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import {
  goBack,
  navigate,
  ScreenName,
  ScreenVariant,
  setVariant,
} from '../store/slices/appSlice';
import { useTheme } from '../styles/theme';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useTheme };

export function useAppNavigation() {
  const dispatch = useAppDispatch();
  const currentScreen = useAppSelector((state) => state.app.currentScreen);
  const currentVariant = useAppSelector((state) => state.app.currentVariant);

  return {
    currentScreen,
    currentVariant,
    navigateTo: (
      screen: ScreenName,
      variant: ScreenVariant = 'varient_1',
      productId?: string
    ) => dispatch(navigate({ screen, variant, productId })),
    switchVariant: (variant: ScreenVariant) => dispatch(setVariant(variant)),
    goBack: () => dispatch(goBack()),
  };
}

/**
 * Custom hook that manages per-screen loading skeleton state on mount/variant switch
 * or when global skeleton preview is toggled.
 */
export function useScreenSkeleton(durationMs = 380): boolean {
  const forceSkeleton = useAppSelector((state) => state.app.forceSkeleton);
  const currentScreen = useAppSelector((state) => state.app.currentScreen);
  const currentVariant = useAppSelector((state) => state.app.currentVariant);
  const [transientLoading, setTransientLoading] = useState(false);

  useEffect(() => {
    setTransientLoading(true);
    const timer = setTimeout(() => {
      setTransientLoading(false);
    }, durationMs);
    return () => clearTimeout(timer);
  }, [currentScreen, currentVariant, durationMs]);

  return forceSkeleton || transientLoading;
}
