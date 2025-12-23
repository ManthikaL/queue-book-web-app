"use client"

import { useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem storageKey="queuebook-theme" {...props}>
      {children}
    </NextThemesProvider>
  )
}

export { useTheme } from "next-themes"
