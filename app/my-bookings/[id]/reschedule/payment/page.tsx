"use client"
import { Suspense } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { PublicNavbar } from "@/components/public-navbar"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Loader } from "lucide-react"

function PaymentContent() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const bookingId = params.id as string
  const fee = Number.parseInt(searchParams.get("fee") || "0", 10)

  const [loading, setLoading] = require("react").useState(false)
  const [promoCode, setPromoCode] = require("react").useState("")
  const [promoApplied, setPromoApplied] = require("react").useState(false)
  const [discount, setDiscount] = require("react").useState(0)

  const handlePromoApply = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(Math.floor(fee * 0.1))
      setPromoApplied(true)
    }
  }

  const handlePayNow = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    router.push(`/my-bookings/${bookingId}/reschedule/success`)
  }

  const handlePayLater = () => {
    router.push(`/my-bookings/${bookingId}/reschedule/success?paymentMethod=later`)
  }

  const finalAmount = fee - discount

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "My Bookings", href: "/my-bookings" },
          { label: "Reschedule", href: `/my-bookings/${bookingId}/reschedule` },
          { label: "Payment" },
        ]}
      />

      <h1 className="text-3xl font-bold text-foreground mb-2">Payment</h1>
      <p className="text-foreground/60 mb-8">Complete your reschedule fee payment</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Card Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="4532 1234 5678 9010"
                  className="w-full px-4 py-2 bg-muted/30 border border-border/50 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Exp. Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 bg-muted/30 border border-border/50 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-2 bg-muted/30 border border-border/50 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Promo Code */}
          <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Promo Code</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter promo code (try 'SAVE10')"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
                className="flex-1 px-4 py-2 bg-muted/30 border border-border/50 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-blue-500 disabled:opacity-50"
              />
              <Button
                onClick={handlePromoApply}
                disabled={!promoCode || promoApplied}
                variant="outline"
                className="bg-transparent"
              >
                {promoApplied ? "Applied" : "Apply"}
              </Button>
            </div>
            {promoApplied && discount > 0 && (
              <p className="text-sm text-green-600 mt-2">Discount applied: -${discount}</p>
            )}
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6 sticky top-8">
            <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Reschedule Fee</span>
                <span className="text-foreground">${fee}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount (SAVE10)</span>
                  <span>-${discount}</span>
                </div>
              )}
              <div className="border-t border-border/50 pt-3 flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${finalAmount}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handlePayNow}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" /> Pay Now
                  </>
                )}
              </Button>

              <Button onClick={handlePayLater} variant="outline" className="w-full bg-transparent">
                Pay Later
              </Button>
            </div>

            <p className="text-xs text-foreground/60 text-center mt-4">
              Your payment information is secure and encrypted.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function ReschedulePaymentPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <Suspense fallback={null}>
        <PaymentContent />
      </Suspense>
    </div>
  )
}
