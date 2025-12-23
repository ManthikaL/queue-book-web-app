"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"

export function PublicNavbar() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">QB</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">QueueBook</span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-4">
            <Link
              href="/businesses"
              className="hidden sm:block text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Businesses
            </Link>
            <Link
              href="/services"
              className="hidden sm:block text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link
              href="/my-bookings"
              className="hidden sm:block text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              My Bookings
            </Link>

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2">
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>

            <Link href="/businesses">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90">Browse</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
