"use client"
import { ThemeProvider as NextThemesProvider, ThemeProviderProps, useTheme as useNextTheme } from "next-themes"
import type { ReactNode } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps & { children: ReactNode }): JSX.Element {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export const useTheme = useNextTheme


