import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FullWebsitePreloaderProps {
  visible: boolean;
  isDark?: boolean;
  accentColor?: string;
}

/**
 * Full-screen website preloader matching the clean white/dark screen with
 * the centered 4-segment rotating green circular ring animation.
 */
export const FullWebsitePreloader: React.FC<FullWebsitePreloaderProps> = ({
  visible,
  isDark = false,
  accentColor = '#7ED321',
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="full-website-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center select-none pointer-events-auto"
          style={{
            backgroundColor: isDark ? '#0d0f14' : '#FFFFFF',
          }}
        >
          {/* Centered 4-Arc Segmented Rotating Ring */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <motion.svg
              viewBox="0 0 64 64"
              className="w-16 h-16"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1.15,
                ease: 'linear',
              }}
            >
              <circle
                cx="32"
                cy="32"
                r="24"
                fill="none"
                stroke={accentColor}
                strokeWidth="4.5"
                strokeLinecap="butt"
                strokeDasharray="26 11.7"
              />
            </motion.svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullWebsitePreloader;
