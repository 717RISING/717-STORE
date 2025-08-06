"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';

interface ThemeContextType {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  resolvedTheme: string | undefined;
}

interface CustomThemeContextType {
  // Add any custom theme state or functions here if necessary
  // For now, we'll just re-export useNextTheme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// If you had custom context values, you'd create a custom hook like this:
/*
export function useCustomTheme() {
  const context = useContext(CustomThemeContext);
  if (context === undefined) {
    throw new Error('useCustomTheme must be used within a ThemeProvider');
  }
  return context;
}
*/
