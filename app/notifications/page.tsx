"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/empty-state"
import { mockNotifications } from "@/lib/mock-data"
import { Bell, CheckCircle, Clock, Gift, XCircle, ArrowRight } from "lucide-react"
import { PublicNavbar } from "@/components/public-navbar"

const iconMap: Record<string, React.ReactNode> = {
  CheckCircle: <CheckCircle className="w-5 h-5 text-green-500" />,
  Clock: <Clock className="w-5 h-5 text-blue-500" />,
  Gift: <Gift className="w-5 h-5 text-purple-500" />,
  XCircle: <XCircle className="w-5 h-5 text-red-500" />,
}

const typeLabels: Record<string, string> = {
  booking_confirmed: "Booking Confirmed",
  reminder: "Reminder",
  cancellation: "Cancellation",
  promotion: "Promotion",
}

const typeBadgeColor: Record<string, string> = {
  booking_confirmed: "bg-green-500/10 text-green-600 dark:text-green-400",
  reminder: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  cancellation: "bg-red-500/10 text-red-600 dark:text-red-400",
  promotion: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all")
  const [notifications, setNotifications] = useState(mockNotifications)

  const filteredNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    )
  }

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      {/* Header (same style as Browse Services) */}
      <div className="border-b border-border bg-muted/30 backdrop-blur-sm p-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="text-foreground/60 mt-2">
              Stay updated with your bookings and offers
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-blue-500" : ""}
            >
              All
            </Button>

            <Button
              variant={filter === "unread" ? "default" : "outline"}
              onClick={() => setFilter("unread")}
              className={filter === "unread" ? "bg-blue-500" : ""}
            >
              Unread
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-red-500">{unreadCount}</Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {filteredNotifications.length === 0 ? (
            <EmptyState
              icon={Bell}
              title="No notifications"
              description="You're all caught up! Check back soon for updates."
              action={{ label: "Browse Services", href: "/services" }}
            />
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  onClick={() => handleMarkAsRead(notification.id)}
                  className={`cursor-pointer transition-all border border-border/50 backdrop-blur-sm p-4 hover:shadow-md ${
                    !notification.read
                      ? "bg-blue-500/5 border-blue-500/40"
                      : "bg-card/50"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="pt-1 shrink-0">
                      {iconMap[notification.icon] || (
                        <Bell className="w-5 h-5" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {notification.title}
                        </h3>
                        <Badge className={typeBadgeColor[notification.type]}>
                          {typeLabels[notification.type]}
                        </Badge>
                      </div>

                      <p className="text-sm text-foreground/70 mb-2">
                        {notification.message}
                      </p>

                      <p className="text-xs text-foreground/50">
                        {formatTime(notification.timestamp)}
                      </p>
                    </div>

                    {!notification.read && (
                      <span className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Preferences Card */}
          <div className="mt-12">
            <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
              <h2 className="text-lg font-bold text-foreground mb-2">
                Manage Your Preferences
              </h2>
              <p className="text-sm text-foreground/60 mb-4">
                Customize which notifications you receive without feeling overwhelmed.
              </p>
              <Link href="/settings/notifications">
                <Button className="bg-blue-500 hover:bg-blue-600 gap-2">
                  Go to Settings <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
