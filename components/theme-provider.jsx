"use client"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-hemes"

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export { useTheme }
