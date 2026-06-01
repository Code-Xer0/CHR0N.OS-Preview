import { createContext, useContext, useState, useLayoutEffect } from 'react';

const ThemeContext = createContext();
const CHRON_FAVICON = `${import.meta.env.BASE_URL}assets/chronos-icon.png`;

function applyDocumentTheme(theme) {
  const isLightMode = theme === 'light';
  localStorage.setItem('chron_theme', theme);
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.body.classList.toggle('theme-light', isLightMode);
  document.body.classList.toggle('theme-dark', !isLightMode);

  let favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }
  favicon.type = 'image/png';
  favicon.href = CHRON_FAVICON;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('theme');
    const saved = localStorage.getItem('chron_theme');
    const initial = requested === 'light' || requested === 'dark'
      ? requested
      : saved === 'light' || saved === 'dark'
        ? saved
        : window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

    applyDocumentTheme(initial);
    return initial;
  });

  const isLightMode = theme === 'light';

  useLayoutEffect(() => {
    applyDocumentTheme(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => current === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, isLightMode, toggleTheme, setTheme }}>
      <div className={`theme-shell theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
