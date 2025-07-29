import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6366f1', // Indigo
    secondary: '#8b5cf6', // Violet
    tertiary: '#ec4899', // Pink
    surface: '#ffffff',
    background: '#f8fafc',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  roundness: 12,
}; 