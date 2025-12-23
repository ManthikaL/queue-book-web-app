import { Outlet } from "@tanstack/react-router"
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  )
}
