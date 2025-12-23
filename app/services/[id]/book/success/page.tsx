"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { PublicNavbar } from "@/components/public-navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, ArrowRight } from "lucide-react"

interface BookingData {
  bookingId: string
  bookingToken: string
  serviceName: string
  date: string
  time: string
  durationMins: number
  name: string
  phone: string
  notes: string
}

export default function BookingSuccessPage() {
  const params = useParams()
  const id = params.id as string
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = sessionStorage.getItem("lastBooking")
    if (stored) {
      setBookingData(JSON.parse(stored))
    }
  }, [])

  if (!mounted || !bookingData) {
    return (
      <div className="min-h-screen bg-background">
        <PublicNavbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-foreground/60 mb-4">Booking not found</p>
            <Link href="/services">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600">Back to Services</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const scheduledDate = new Date(bookingData.date)
  const formattedDateTime = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(scheduledDate)

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Booking Confirmed!</h1>
          <p className="text-lg text-foreground/60">Your appointment has been successfully booked.</p>
        </div>

        {/* Main Card */}
        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Updated Schedule</h2>

          {/* Info Cards Row */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
              <p className="text-sm font-semibold text-foreground/70 mb-2">Service</p>
              <p className="text-lg font-bold text-foreground">{bookingData.serviceName}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
              <p className="text-sm font-semibold text-foreground/70 mb-2">Booking Token</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400 font-mono">{bookingData.bookingToken}</p>
            </div>
          </div>

          {/* Appointment Highlight Panel */}
          <div className="p-6 bg-gradient-to-br from-green-100/20 to-emerald-100/10 dark:from-green-950/30 dark:to-emerald-950/20 rounded-lg border-2 border-green-500/30 dark:border-green-600/30 mb-8">
            <p className="text-sm font-semibold text-foreground/70 mb-3">New Appointment</p>
            <p className="text-2xl font-bold text-foreground mb-2">{formattedDateTime}</p>
            <p className="text-sm text-foreground/60">Duration: {bookingData.durationMins} minutes</p>
          </div>

          {/* Confirmation Note */}
          <div className="p-4 bg-blue-500/10 dark:bg-blue-950/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
            <p className="text-sm text-foreground/70">
              A confirmation email has been sent to your registered email address.
            </p>
          </div>

          {/* Booking Details Summary */}
          <div className="mt-8 pt-8 border-t border-border/50">
            <h3 className="text-sm font-semibold text-foreground/70 mb-4">Booking Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/60">Booked by:</span>
                <span className="font-semibold text-foreground">{bookingData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Phone:</span>
                <span className="font-semibold text-foreground">{bookingData.phone}</span>
              </div>
              {bookingData.notes && (
                <div className="flex justify-between">
                  <span className="text-foreground/60">Notes:</span>
                  <span className="font-semibold text-foreground">{bookingData.notes}</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/services" className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              Back to Services
            </Button>
          </Link>
          <Link href="/my-bookings" className="flex-1">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center gap-2">
              View My Bookings
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
