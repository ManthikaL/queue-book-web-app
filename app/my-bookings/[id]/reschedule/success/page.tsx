"use client"
import { Suspense } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { PublicNavbar } from "@/components/public-navbar"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, FileText, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

function SuccessContent() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const bookingId = params.id as string
  const paymentMethod = searchParams.get("paymentMethod")

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "My Bookings", href: "/my-bookings" }, { label: "Reschedule Success" }]} />

      <div className="text-center mb-8">
        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Booking Rescheduled!</h1>
        <p className="text-foreground/60">Your appointment has been successfully rescheduled.</p>
      </div>

      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6 mb-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Updated Schedule</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-xs text-foreground/60 mb-1">Service</p>
              <p className="font-semibold text-foreground">Hair Cut & Styling</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-xs text-foreground/60 mb-1">Booking Token</p>
              <p className="font-semibold text-foreground font-mono">BK-2025-001</p>
            </div>
          </div>

          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-xs text-foreground/60 mb-1">New Appointment</p>
            <p className="text-lg font-bold text-green-600">January 28, 2025 at 4:00 PM</p>
            <p className="text-sm text-foreground/60 mt-1">Duration: 45 minutes</p>
          </div>

          <p className="text-sm text-foreground/60">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </Card>

      {paymentMethod === "later" && (
        <Card className="border border-orange-500/30 bg-orange-500/5 p-6 mb-6">
          <div className="flex gap-3">
            <FileText className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Invoice Created</p>
              <p className="text-sm text-foreground/60">
                An invoice has been created for the reschedule fee. You can view and download it below.
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/my-bookings">
          <Button variant="outline" className="w-full bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to My Bookings
          </Button>
        </Link>

        {paymentMethod === "later" && (
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <Download className="w-4 h-4 mr-2" /> Download Invoice
          </Button>
        )}
      </div>
    </div>
  )
}

export default function RescheduleSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <Suspense fallback={null}>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
