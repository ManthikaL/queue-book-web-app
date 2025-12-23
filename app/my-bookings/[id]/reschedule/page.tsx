"use client"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { PublicNavbar } from "@/components/public-navbar"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card } from "@/components/ui/card"
import { mockBookings } from "@/lib/mock-data"
import { RescheduleWizard, type RescheduleStep1Data } from "@/components/reschedule-wizard"
import { RescheduleConfirmation } from "@/components/reschedule-confirmation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ReschedulePage() {
  const router = useRouter()
  const params = useParams()
  const bookingId = params.id as string

  const booking = mockBookings.find((b) => b.id === bookingId)
  const [step, setStep] = useState(1)
  const [rescheduleData, setRescheduleData] = useState<RescheduleStep1Data | null>(null)

  if (!booking) {
    return (
      <div className="min-h-screen bg-background">
        <PublicNavbar />
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          <p className="text-foreground/60">Booking not found</p>
          <Link href="/my-bookings">
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Back to My Bookings</button>
          </Link>
        </div>
      </div>
    )
  }

  // Calculate reschedule fee (mock logic: free if >24h, 300 if <24h)
  const hoursUntilBooking = Math.random() * 48 // Mock: between 0-48 hours
  const rescheduleeFee = hoursUntilBooking < 24 ? 300 : 0

  const handleStep1Continue = (data: RescheduleStep1Data) => {
    setRescheduleData(data)
    setStep(2)
  }

  const handleStep2Action = (paymentRequired: boolean) => {
    if (paymentRequired) {
      router.push(`/my-bookings/${bookingId}/reschedule/payment?fee=${rescheduleeFee}`)
    } else {
      router.push(`/my-bookings/${bookingId}/reschedule/success`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "My Bookings", href: "/my-bookings" }, { label: "Reschedule Appointment" }]} />

        <div className="mb-8">
          <Link href="/my-bookings" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Reschedule Appointment</h1>
          <p className="text-foreground/60 mt-2">Step {step} of 2</p>
        </div>

        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
          {step === 1 && <RescheduleWizard booking={booking} onContinue={handleStep1Continue} />}
          {step === 2 && rescheduleData && (
            <RescheduleConfirmation
              booking={booking}
              newDate={rescheduleData.newDate}
              newTime={rescheduleData.newTime}
              fee={rescheduleeFee}
              onConfirm={handleStep2Action}
              onBack={() => setStep(1)}
            />
          )}
        </Card>
      </div>
    </div>
  )
}
