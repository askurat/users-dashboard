import React, { createContext, useState, useEffect } from 'react';
import { presetPalettes, presetDarkPalettes } from '@ant-design/colors';
import { setTwoToneColor } from '@ant-design/icons';
import { useMediaPredicate } from 'react-media-hook';
import themeSwitcher from 'theme-switcher';
import Users from '@/containers/users/Users';

export type ThemeContext = {
  theme?: 'default' | 'dark';
  toggleTheme?: () => void;
};

export const ThemeContext = createContext<ThemeContext>({
  theme: 'default',
  toggleTheme: () => {},
});

const { Provider: ThemeContextProvider } = ThemeContext;

const SITE_THEME_STORE_KEY = 'site-theme';

const timestamp = new Date().getTime();
const themeMap = {
  dark: `/dark.css?${timestamp}`,
};
const themeConfig = {
  themeMap,
};
const { switcher } = themeSwitcher(themeConfig);

export const App = () => {
  const preferredTheme = useMediaPredicate('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'default';
  const [theme, setTheme] = useState<ThemeContext['theme']>(
    typeof localStorage !== 'undefined'
      ? (localStorage.getItem(SITE_THEME_STORE_KEY) as ThemeContext['theme']) ||
          preferredTheme ||
          'default'
      : preferredTheme || 'default',
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    switcher({
      theme,
      useStorage: true,
    });

    const iconTwoToneThemeMap = {
      dark: presetDarkPalettes.green.primary,
      default: presetPalettes.green.primary,
    };
    setTwoToneColor(iconTwoToneThemeMap[theme] || iconTwoToneThemeMap.default);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'default' : 'dark');

  return (
    <ThemeContextProvider value={{ theme, toggleTheme }}>
      <Users />
    </ThemeContextProvider>
  );
};
