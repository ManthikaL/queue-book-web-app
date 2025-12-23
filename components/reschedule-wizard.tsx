"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, User } from "lucide-react"
import { mockStaff } from "@/lib/mock-data"

interface RescheduleWizardProps {
  booking: {
    id: string
    serviceName: string
    date: string
    time: string
    price: number
    estimatedDuration: number
    serviceId: string
    staffId?: string
  }
  onContinue: (data: RescheduleStep1Data) => void
}

export interface RescheduleStep1Data {
  newDate: string
  newTime: string
  newStaffId?: string
}

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
]

export function RescheduleWizard({ booking, onContinue }: RescheduleWizardProps) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedStaff, setSelectedStaff] = useState(booking.staffId || "any")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleContinue = () => {
    const newErrors: Record<string, string> = {}

    if (!selectedDate) newErrors.date = "Please select a date"
    if (!selectedTime) newErrors.time = "Please select a time"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onContinue({
      newDate: selectedDate,
      newTime: selectedTime,
      newStaffId: selectedStaff !== "any" ? selectedStaff : undefined,
    })
  }

  // Generate next 14 days
  const generateDates = () => {
    const dates = []
    for (let i = 1; i <= 14; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push(date.toISOString().split("T")[0])
    }
    return dates
  }

  const availableStaff = mockStaff.filter((s) => s.skills.includes(booking.serviceId))

  return (
    <div className="space-y-6">
      {/* Current Booking Info */}
      <Card className="border border-blue-500/30 bg-blue-500/5 p-4">
        <p className="text-sm text-foreground/60 mb-2">Current Appointment</p>
        <div className="flex items-center gap-4">
          <div>
            <p className="font-semibold text-foreground">{booking.serviceName}</p>
            <p className="text-sm text-foreground/60">
              {booking.date} at {booking.time}
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            <Calendar className="w-4 h-4 inline mr-2" /> Select New Date
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
            {generateDates().map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`p-2 text-center rounded-lg text-sm font-medium transition-colors ${
                  selectedDate === date
                    ? "bg-blue-500 text-white"
                    : "bg-card/50 text-foreground hover:bg-card border border-border/50"
                }`}
              >
                {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </button>
            ))}
          </div>
          {errors.date && <p className="text-xs text-red-600 mt-2">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            <Clock className="w-4 h-4 inline mr-2" /> Select New Time
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-3 text-center rounded-lg text-sm font-medium transition-colors ${
                  selectedTime === time
                    ? "bg-purple-500 text-white"
                    : "bg-card/50 text-foreground hover:bg-card border border-border/50"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
          {errors.time && <p className="text-xs text-red-600 mt-2">{errors.time}</p>}
        </div>

        {availableStaff.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              <User className="w-4 h-4 inline mr-2" /> Choose Staff (Optional)
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedStaff("any")}
                className={`w-full p-3 text-left rounded-lg transition-colors ${
                  selectedStaff === "any"
                    ? "bg-blue-500/20 border border-blue-500 text-foreground"
                    : "bg-card/50 border border-border/50 text-foreground hover:bg-card"
                }`}
              >
                Any Staff Member
              </button>
              {availableStaff.map((staff) => (
                <button
                  key={staff.id}
                  onClick={() => setSelectedStaff(staff.id)}
                  className={`w-full p-3 text-left rounded-lg flex items-center gap-3 transition-colors ${
                    selectedStaff === staff.id
                      ? "bg-blue-500/20 border border-blue-500 text-foreground"
                      : "bg-card/50 border border-border/50 text-foreground hover:bg-card"
                  }`}
                >
                  <img src={staff.avatar || "/placeholder.svg"} alt={staff.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-medium text-sm">{staff.name}</p>
                    <p className="text-xs text-foreground/60">{staff.role}</p>
                  </div>
                  <Badge className="ml-auto bg-green-500/20 text-green-600 dark:text-green-400">Available</Badge>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={handleContinue}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white"
        disabled={!selectedDate || !selectedTime}
      >
        Continue to Review
      </Button>
    </div>
  )
}
