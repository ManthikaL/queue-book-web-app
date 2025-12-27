"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PublicNavbar } from "@/components/public-navbar"
import { mockNotificationPreferences } from "@/lib/mock-data"
import { Save, Bell, Clock, XCircle, Gift } from "lucide-react"

export default function NotificationSettingsPage() {
  const [preferences, setPreferences] = useState(mockNotificationPreferences)
  const [saved, setSaved] = useState(false)

  const handleToggle = (key: keyof typeof preferences) => {
    if (key === "userId") return
    setPreferences({
      ...preferences,
      [key]: !preferences[key],
    })
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const notificationTypes = [
    {
      key: "bookingConfirmed",
      title: "Booking Confirmations",
      description: "Receive confirmation when your booking is confirmed",
      icon: Bell,
    },
    {
      key: "reminder",
      title: "Appointment Reminders",
      description: "Get reminders before your scheduled appointments",
      icon: Clock,
    },
    {
      key: "cancellation",
      title: "Cancellation Notices",
      description: "Be notified if an appointment is cancelled",
      icon: XCircle,
    },
    {
      key: "promotions",
      title: "Promotional Offers",
      description: "Receive exclusive deals and special offers",
      icon: Gift,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      {/* Header – same style as Browse Services & Notifications */}
      <div className="border-b border-border bg-muted/30 backdrop-blur-sm p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground">
            Notification Settings
          </h1>
          <p className="text-foreground/60 mt-2">
            Manage how you receive notifications
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4 mb-8">
            {notificationTypes.map((type) => {
              const Icon = type.icon
              const isEnabled =
                preferences[type.key as keyof typeof preferences]

              return (
                <Card
                  key={type.key}
                  className="border border-border/50 backdrop-blur-sm bg-card/50 p-6 transition-all hover:border-blue-500/50 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-blue-500" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {type.title}
                        </h3>
                        <p className="text-sm text-foreground/60">
                          {type.description}
                        </p>
                      </div>
                    </div>

                    {/* Toggle */}
                    <button
                      onClick={() =>
                        handleToggle(type.key as keyof typeof preferences)
                      }
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors shrink-0 ${
                        isEnabled ? "bg-blue-500" : "bg-muted"
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 rounded-full bg-white transform transition-transform ${
                          isEnabled ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Save Section */}
          <div className="flex items-center gap-4">
            <Button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 gap-2"
            >
              <Save className="w-4 h-4" />
              Save Preferences
            </Button>

            {saved && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Preferences saved
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
