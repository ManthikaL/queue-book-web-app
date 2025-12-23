"use client"

import React from "react"

import { Link } from "@tanstack/react-router"
import { PublicNavbar } from "@/components/public-navbar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockBookings } from "@/lib/mock-data"
import { Clock, Phone, Trash2 } from "lucide-react"

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  confirmed: "bg-green-500/10 text-green-600 dark:text-green-400",
  completed: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  cancelled: "bg-red-500/10 text-red-600 dark:text-red-400",
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = React.useState(mockBookings)

  const handleCancel = (id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b)))
  }

  const upcomingBookings = bookings.filter((b) => b.status !== "cancelled" && b.status !== "completed")
  const pastBookings = bookings.filter((b) => b.status === "completed" || b.status === "cancelled")

  const BookingCard = ({ booking }: { booking: (typeof bookings)[0] }) => (
    <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">{booking.serviceName}</h3>
          <p className="text-sm text-foreground/60">{booking.customerName}</p>
        </div>
        <Badge className={STATUS_COLORS[booking.status]}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 p-4 bg-muted/30 rounded-lg">
        <div>
          <p className="text-xs text-foreground/60 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Date & Time
          </p>
          <p className="text-sm font-semibold text-foreground">{booking.date}</p>
          <p className="text-sm font-semibold text-foreground">{booking.time}</p>
        </div>
        <div>
          <p className="text-xs text-foreground/60 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Duration
          </p>
          <p className="text-sm font-semibold text-foreground">{booking.estimatedDuration} min</p>
        </div>
        <div>
          <p className="text-xs text-foreground/60 flex items-center gap-1">
            <Phone className="w-3 h-3" /> Contact
          </p>
          <p className="text-sm font-semibold text-foreground">{booking.customerPhone}</p>
        </div>
        <div>
          <p className="text-xs text-foreground/60">Price</p>
          <p className="text-sm font-bold text-blue-600 dark:text-blue-400">${booking.price}</p>
        </div>
      </div>

      {booking.notes && (
        <div className="mb-4 p-3 bg-muted/30 rounded-lg">
          <p className="text-xs text-foreground/60 mb-1">Notes</p>
          <p className="text-sm text-foreground">{booking.notes}</p>
        </div>
      )}

      <div className="flex gap-3">
        {booking.status === "pending" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCancel(booking.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Cancel Booking
          </Button>
        )}
        <Button variant="outline" size="sm">
          Reschedule
        </Button>
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
        <p className="text-foreground/60 mb-8">Track and manage your service bookings</p>

        {/* Upcoming Bookings */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Upcoming Bookings</h2>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-8 text-center">
              <p className="text-foreground/60 mb-4">No upcoming bookings</p>
              <Link to="/services">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600">Browse Services</Button>
              </Link>
            </Card>
          )}
        </div>

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Past Bookings</h2>
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
