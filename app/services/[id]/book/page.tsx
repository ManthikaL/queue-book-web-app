"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { PublicNavbar } from "@/components/public-navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockServices, mockStaff } from "@/lib/mock-data"
import { ChevronLeft, Check, Clock, User, AlertCircle } from "lucide-react"

type BookingStep = 1 | 2 | 3 | 4

const TIME_SLOTS = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"]

const UPCOMING_DATES = Array.from({ length: 7 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() + i)
  return date
})

const VALIDATION = {
  fullName: /^[A-Za-z\s]+$/,
  phone: /^\d+$/,
  maxNoteLength: 350,
}

interface ValidationErrors {
  name: string
  phone: string
  notes: string
}

export default function ServiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const service = mockServices.find((s) => s.id === id)
  const [step, setStep] = useState<BookingStep>(1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null)
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({ name: "", phone: "", notes: "" })

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <PublicNavbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-foreground/60">Service not found</p>
        </div>
      </div>
    )
  }

  const availableStaff = mockStaff.filter((s) => s.skills.includes(id) && s.active)

  const validateForm = () => {
    const newErrors: ValidationErrors = { name: "", phone: "", notes: "" }
    let isValid = true

    if (!customerName || !VALIDATION.fullName.test(customerName)) {
      newErrors.name = "Full name can contain only letters."
      isValid = false
    }

    if (!customerPhone || !VALIDATION.phone.test(customerPhone)) {
      newErrors.phone = "Phone number can contain only numbers."
      isValid = false
    }

    if (notes.length > VALIDATION.maxNoteLength) {
      newErrors.notes = "Notes cannot exceed 350 characters."
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const isStep1Valid = selectedDate && selectedTime
  const isStep2Valid = true
  const isStep3Valid =
    customerName &&
    customerPhone &&
    !errors.name &&
    !errors.phone &&
    notes.length <= VALIDATION.maxNoteLength &&
    VALIDATION.fullName.test(customerName) &&
    VALIDATION.phone.test(customerPhone)
  const canProceed = step === 1 ? isStep1Valid : step === 2 ? isStep2Valid : step === 3 ? isStep3Valid : true

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", weekday: "short" }).format(date)
  }

  const handleBooking = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    const bookingToken = `BK-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`
    const bookingData = {
      bookingId: `booking-${Date.now()}`,
      bookingToken,
      service: service.id,
      serviceName: service.name,
      date: selectedDate?.toISOString(),
      time: selectedTime,
      staffId: selectedStaff || "any",
      name: customerName,
      phone: customerPhone,
      notes,
      durationMins: service.duration,
    }

    sessionStorage.setItem("lastBooking", JSON.stringify(bookingData))

    setTimeout(() => {
      setIsSubmitting(false)
      router.push(`/services/${id}/book/success`)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/services" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:opacity-80">
            <ChevronLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Info Sticky */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 border border-border/50 backdrop-blur-sm bg-card/50 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-2">{service.name}</h2>
                <p className="text-sm text-foreground/60 mb-4">{service.description}</p>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60 text-sm">Duration</span>
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {service.duration} min
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60 text-sm">Price</span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">${service.price}</span>
                  </div>
                  <Badge className="w-full justify-center">{service.category}</Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            {/* Steps Indicator */}
            <div className="flex gap-4 mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex-1">
                  <div
                    className={`flex items-center justify-center h-10 rounded-full font-bold transition-all ${
                      step >= s
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-card border border-border text-foreground/60"
                    }`}
                  >
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  <p className="text-xs text-foreground/60 text-center mt-2">
                    {s === 1 ? "Date & Time" : s === 2 ? "Staff" : s === 3 ? "Details" : "Confirm"}
                  </p>
                </div>
              ))}
            </div>

            {/* Step 1: Date & Time Selection */}
            {step === 1 && (
              <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">Select Date & Time</h3>

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-foreground mb-3">Available Dates</label>
                  <div className="grid grid-cols-7 gap-2">
                    {UPCOMING_DATES.map((date) => (
                      <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 rounded-lg text-xs font-medium text-center transition-all ${
                          selectedDate?.toDateString() === date.toDateString()
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            : "bg-card border border-border hover:border-blue-500/50 text-foreground"
                        }`}
                      >
                        <div className="text-[10px] opacity-70">
                          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]}
                        </div>
                        <div>{date.getDate()}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Available Time Slots</label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((time, idx) => {
                      const isAvailable = idx % 2 === 0
                      return (
                        <button
                          key={time}
                          onClick={() => isAvailable && setSelectedTime(time)}
                          disabled={!isAvailable}
                          className={`p-3 rounded-lg font-medium text-sm transition-all ${
                            selectedTime === time
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                              : isAvailable
                                ? "bg-card border border-border hover:border-blue-500/50 text-foreground"
                                : "bg-muted border border-border text-foreground/40 cursor-not-allowed"
                          }`}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                  <p className="text-xs text-foreground/50 mt-3">Grayed out slots are unavailable</p>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <Button variant="outline">Cancel</Button>
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!canProceed}
                    className="bg-gradient-to-r from-blue-500 to-purple-600"
                  >
                    Continue
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 2: Staff Selection */}
            {step === 2 && (
              <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">Choose Staff (Optional)</h3>
                <p className="text-sm text-foreground/60 mb-6">Any available staff member by default</p>

                <div className="space-y-3 mb-8">
                  {/* Any Staff Option */}
                  <button
                    onClick={() => setSelectedStaff(null)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedStaff === null
                        ? "bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-blue-500"
                        : "bg-muted/30 border-border hover:border-blue-500/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Any Staff Member</p>
                        <p className="text-xs text-foreground/60">Let us assign the best available staff</p>
                      </div>
                    </div>
                  </button>

                  {/* Specific Staff Options */}
                  {availableStaff.map((staff) => (
                    <button
                      key={staff.id}
                      onClick={() => setSelectedStaff(staff.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedStaff === staff.id
                          ? "bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-blue-500"
                          : "bg-muted/30 border-border hover:border-blue-500/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={staff.avatar || "/placeholder.svg"}
                            alt={staff.name}
                            className="w-12 h-12 rounded-full border-2 border-border"
                          />
                          <div>
                            <p className="font-semibold text-foreground">{staff.name}</p>
                            <p className="text-xs text-foreground/60">{staff.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">{staff.rating}</span>
                          <span className="text-yellow-500">★</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between gap-3">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} className="bg-gradient-to-r from-blue-500 to-purple-600">
                    Continue
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 3: Customer Details */}
            {step === 3 && (
              <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">Enter Your Details</h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value)
                        if (e.target.value && !VALIDATION.fullName.test(e.target.value)) {
                          setErrors((prev) => ({ ...prev, name: "Full name can contain only letters." }))
                        } else {
                          setErrors((prev) => ({ ...prev, name: "" }))
                        }
                      }}
                      className={`backdrop-blur-sm bg-card/50 ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Phone Number *</label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value)
                        if (e.target.value && !VALIDATION.phone.test(e.target.value)) {
                          setErrors((prev) => ({ ...prev, phone: "Phone number can contain only numbers." }))
                        } else {
                          setErrors((prev) => ({ ...prev, phone: "" }))
                        }
                      }}
                      className={`backdrop-blur-sm bg-card/50 ${errors.phone ? "border-red-500" : ""}`}
                    />
                    {errors.phone && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Notes (Optional)
                      <span className="text-foreground/60 text-xs font-normal">
                        {" "}
                        {notes.length}/{VALIDATION.maxNoteLength}
                      </span>
                    </label>
                    <textarea
                      placeholder="Any special requests or notes for the service provider..."
                      value={notes}
                      onChange={(e) => {
                        if (e.target.value.length <= VALIDATION.maxNoteLength) {
                          setNotes(e.target.value)
                          setErrors((prev) => ({ ...prev, notes: "" }))
                        }
                      }}
                      maxLength={VALIDATION.maxNoteLength}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 backdrop-blur-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                <div className="flex justify-between gap-3 mt-8">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(4)}
                    disabled={!isStep3Valid}
                    className="bg-gradient-to-r from-blue-500 to-purple-600"
                  >
                    Review Booking
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && selectedDate && (
              <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">Confirm Your Booking</h3>

                <div className="space-y-4 mb-8 p-4 bg-card rounded-lg border border-border/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-foreground/60">Service</p>
                      <p className="font-semibold text-foreground">{service.name}</p>
                    </div>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">${service.price}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-foreground/60">Date</p>
                      <p className="font-semibold text-foreground">{formatDate(selectedDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Time</p>
                      <p className="font-semibold text-foreground">{selectedTime}</p>
                    </div>
                  </div>

                  {selectedStaff && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-foreground/60">Staff Member</p>
                      <p className="font-semibold text-foreground">
                        {mockStaff.find((s) => s.id === selectedStaff)?.name}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-foreground/60">Duration</p>
                    <p className="font-semibold text-foreground">{service.duration} minutes</p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-foreground/60">Booked By</p>
                    <p className="font-semibold text-foreground">{customerName}</p>
                    <p className="text-sm text-foreground/60">{customerPhone}</p>
                  </div>

                  {notes && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-foreground/60">Notes</p>
                      <p className="font-semibold text-foreground">{notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between gap-3">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    Edit Details
                  </Button>
                  <Button
                    onClick={handleBooking}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-green-500 to-emerald-600"
                  >
                    {isSubmitting ? "Confirming..." : "Confirm Booking"}
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
