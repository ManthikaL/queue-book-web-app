"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PublicNavbar } from "@/components/public-navbar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockBookings } from "@/lib/mock-data"
import { Clock, Phone, Trash2, Calendar, RefreshCw } from "lucide-react"

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  confirmed: "bg-green-500/10 text-green-600 dark:text-green-400",
  completed: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  cancelled: "bg-red-500/10 text-red-600 dark:text-red-400",
}

type FilterTab = "all" | "upcoming" | "past" | "cancelled"

export default function MyBookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState(mockBookings)
  const [activeTab, setActiveTab] = useState<FilterTab>("upcoming")

  const handleCancel = (id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b)))
  }

  const isRescheduleDisabled = (status: string) => {
    return status === "cancelled" || status === "completed"
  }

  const filteredBookings = () => {
    switch (activeTab) {
      case "upcoming":
        return bookings.filter((b) => b.status === "pending" || b.status === "confirmed")
      case "past":
        return bookings.filter((b) => b.status === "completed")
      case "cancelled":
        return bookings.filter((b) => b.status === "cancelled")
      default:
        return bookings
    }
  }

  const BookingCard = ({ booking }: { booking: (typeof bookings)[0] }) => (
    <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-foreground">{booking.serviceName}</h3>
            {booking.rescheduledFrom && (
              <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400">Rescheduled</Badge>
            )}
          </div>
          <p className="text-sm text-foreground/60">Booking #{booking.token}</p>
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

      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:opacity-90"
          disabled={isRescheduleDisabled(booking.status)}
          onClick={() => router.push(`/my-bookings/${booking.id}/reschedule`)}
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Reschedule
        </Button>

        {booking.status === "pending" || booking.status === "confirmed" ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCancel(booking.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Cancel
          </Button>
        ) : null}
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
        <p className="text-foreground/60 mb-8">Track and manage your service bookings</p>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {(["all", "upcoming", "past", "cancelled"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-card/50 text-foreground/70 hover:bg-card border border-border/50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings().length > 0 ? (
          <div className="space-y-4">
            {filteredBookings().map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-8 text-center">
            <Calendar className="w-12 h-12 mx-auto text-foreground/30 mb-4" />
            <p className="text-foreground/60 mb-4">No bookings in this category</p>
            <Link href="/services">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600">Browse Services</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  )
}
