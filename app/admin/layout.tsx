"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Moon, Sun, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider"

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/business", label: "Business Profile", icon: "🏢" },
  { href: "/admin/branches", label: "Branches", icon: "📍" },
  { href: "/admin/services", label: "Services", icon: "🛠️" },
  { href: "/admin/schedule", label: "Schedule", icon: "📅" },
  { href: "/admin/queue", label: "Queue", icon: "📋" },
  { href: "/admin/reports", label: "Reports", icon: "📈" },
]

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { theme, toggleTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 border-r border-border bg-muted/30 backdrop-blur-sm transform transition-transform md:translate-x-0 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-border">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-foreground">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm">QB</span>
            </div>
            <span>QueueBook</span>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {ADMIN_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href}>
                <button
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                    isActive
                      ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-foreground/70 hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </button>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-muted/30">
          <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex-1" />

            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
