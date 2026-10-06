import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: [
        {
          find: 'expo-haptics',
          replacement: path.resolve(import.meta.dirname, 'src/order_manage_frontend/components/expo-shims.ts'),
        },
        {
          find: 'expo-clipboard',
          replacement: path.resolve(import.meta.dirname, 'src/order_manage_frontend/components/expo-shims.ts'),
        },
        {
          find: 'expo-image-picker',
          replacement: path.resolve(import.meta.dirname, 'src/order_manage_frontend/components/expo-shims.ts'),
        },
        {
          find: 'expo-web-browser',
          replacement: path.resolve(import.meta.dirname, 'src/order_manage_frontend/components/expo-shims.ts'),
        },
        {
          find: 'expo-print',
          replacement: path.resolve(import.meta.dirname, 'src/order_manage_frontend/components/expo-shims.ts'),
        },
        {
          find: 'expo-sharing',
          replacement: path.resolve(import.meta.dirname, 'src/order_manage_frontend/components/expo-shims.ts'),
        },
        {
          find: 'expo-symbols',
          replacement: path.resolve(import.meta.dirname, 'src/order_manage_frontend/components/expo-shims.ts'),
        },
        {
          find: 'react-native-safe-area-context',
          replacement: path.resolve(import.meta.dirname, 'src/order_manage_frontend/components/safe-area-shim.tsx'),
        },
        {
          find: '@expo/vector-icons',
          replacement: path.resolve(import.meta.dirname, 'src/order_manage_frontend/components/expo-vector-icons-shim.tsx'),
        },
        {
          find: /^@\/(.*)/,
          replacement: path.resolve(import.meta.dirname, 'src/order_manage_frontend/$1'),
        },
        {
          find: 'react-native',
          replacement: 'react-native-web',
        },
      ],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
