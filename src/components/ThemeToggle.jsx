import React from 'react';
import { Moon, Sun } from 'lucide-react';

/**
 * Light/dark theme toggle for the Curiosity Passport. Persists the choice to
 * localStorage under `curiosity-passport-theme` and flips the `data-theme`
 * attribute on <html>, which the [data-theme="dark"] token block in
 * index.css keys off of.
 */
export function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
