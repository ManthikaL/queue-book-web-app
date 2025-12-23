"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockBookings } from "@/lib/mock-data"
import { Clock, Calendar, CheckCircle, Clock3, AlertCircle } from "lucide-react"

const STATUS_CONFIG: Record<string, { icon: React.ReactNode; color: string }> = {
  pending: { icon: <Clock3 className="w-4 h-4" />, color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
  confirmed: { icon: <CheckCircle className="w-4 h-4" />, color: "bg-green-500/10 text-green-600 dark:text-green-400" },
  completed: { icon: <CheckCircle className="w-4 h-4" />, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  cancelled: { icon: <AlertCircle className="w-4 h-4" />, color: "bg-red-500/10 text-red-600 dark:text-red-400" },
}

export default function AdminSchedulePage() {
  const [viewMode, setViewMode] = useState<"day" | "week">("day")
  const [bookings, setBookings] = useState(mockBookings)
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null)

  const handleStatusUpdate = (id: string, newStatus: "confirmed" | "completed" | "cancelled") => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b)))
  }

  const todayBookings = bookings.filter((b) => b.date === new Date().toISOString().split("T")[0])
  const sortedBookings = [...todayBookings].sort((a, b) => a.time.localeCompare(b.time))

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schedule</h1>
          <p className="text-foreground/60 mt-2">Manage bookings and appointments</p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
          <Button
            variant={viewMode === "day" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("day")}
            className={viewMode === "day" ? "bg-blue-500" : ""}
          >
            <Calendar className="w-4 h-4 mr-2" /> Day
          </Button>
          <Button variant={viewMode === "week" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("week")}>
            Week
          </Button>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="space-y-4">
        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" /> Today's Appointments
          </h2>

          {sortedBookings.length > 0 ? (
            <div className="space-y-3">
              {sortedBookings.map((booking) => {
                const config = STATUS_CONFIG[booking.status]
                return (
                  <div
                    key={booking.id}
                    className={`p-4 bg-muted/30 rounded-lg border border-border/50 cursor-pointer transition-all hover:shadow-md ${
                      selectedBooking === booking.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedBooking(selectedBooking === booking.id ? null : booking.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-lg text-foreground min-w-[80px]">{booking.time}</span>
                          <h3 className="font-semibold text-foreground">{booking.serviceName}</h3>
                          <Badge className={config.color}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/60">
                          {booking.customerName} • {booking.customerPhone}
                        </p>
                        {booking.notes && (
                          <p className="text-sm text-foreground/60 mt-1 italic">Note: {booking.notes}</p>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-foreground/60">{booking.estimatedDuration} min</p>
                        <p className="text-sm font-bold text-blue-600 dark:text-blue-400">${booking.price}</p>
                      </div>
                    </div>

                    {/* Expanded Actions */}
                    {selectedBooking === booking.id &&
                      booking.status !== "completed" &&
                      booking.status !== "cancelled" && (
                        <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
                          {booking.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleStatusUpdate(booking.id, "confirmed")
                              }}
                              className="bg-green-500/20 text-green-600 hover:bg-green-500/30 dark:text-green-400"
                            >
                              Confirm
                            </Button>
                          )}
                          {booking.status === "confirmed" && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleStatusUpdate(booking.id, "completed")
                              }}
                              className="bg-blue-500/20 text-blue-600 hover:bg-blue-500/30 dark:text-blue-400"
                            >
                              Mark Completed
                            </Button>
                          )}
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleStatusUpdate(booking.id, "cancelled")
                            }}
                            className="bg-red-500/20 text-red-600 hover:bg-red-500/30 dark:text-red-400"
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-foreground/60 text-center py-8">No appointments scheduled for today</p>
          )}
        </Card>
      </div>
    </div>
  )
}
