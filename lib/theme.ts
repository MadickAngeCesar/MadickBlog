export const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  accent: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  dark: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
};

export type Theme = 'light' | 'dark' | 'system';

export const getThemeColor = (isDark: boolean) => ({
  background: isDark ? colors.dark[900] : colors.dark[50],
  text: {
    primary: isDark ? colors.dark[50] : colors.dark[900],
    secondary: isDark ? colors.dark[300] : colors.dark[600],
    accent: isDark ? colors.primary[300] : colors.primary[600],
  },
  border: isDark ? colors.dark[700] : colors.dark[200],
  primary: {
    bg: isDark ? colors.primary[900] : colors.primary[600],
    hover: isDark ? colors.primary[800] : colors.primary[700],
    text: colors.dark[50],
  },
  accent: {
    bg: isDark ? colors.accent[900] : colors.accent[600],
    hover: isDark ? colors.accent[800] : colors.accent[700],
    text: colors.dark[50],
  },
  card: {
    bg: isDark ? colors.dark[800] : colors.dark[50],
    hover: isDark ? colors.dark[700] : colors.dark[100],
  },
});
