"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockStaff, mockServices, mockBookings } from "@/lib/mock-data"
import { ChevronLeft, Mail, Phone, Calendar } from "lucide-react"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function StaffProfilePage() {
  const params = useParams()
  const id = params.id as string
  const staff = mockStaff.find((s) => s.id === id)

  if (!staff) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-96">
          <p className="text-foreground/60">Staff member not found</p>
        </div>
      </div>
    )
  }

  const assignedBookings = mockBookings.filter((b) => b.staffId === staff.id)
  const skillNames = staff.skills.map((id) => mockServices.find((s) => s.id === id)?.name).filter(Boolean)

  return (
    <div className="space-y-6">
      <Link href="/admin/staff" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:opacity-80">
        <ChevronLeft className="w-4 h-4" />
        Back to Staff
      </Link>

      {/* Staff Header */}
      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-8">
        <div className="flex items-start gap-6">
          <img
            src={staff.avatar || "/placeholder.svg"}
            alt={staff.name}
            className="w-24 h-24 rounded-full border-2 border-blue-500"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">{staff.name}</h1>
              <Badge
                variant={staff.active ? "default" : "secondary"}
                className="bg-green-500/20 text-green-700 dark:text-green-400"
              >
                {staff.active ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-lg text-foreground/70 mb-4">{staff.role}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-foreground/60" />
                <p className="text-sm text-foreground/70">{staff.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-foreground/60" />
                <p className="text-sm text-foreground/70">{staff.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">{staff.rating}</span>
                <span className="text-yellow-500">★</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Skills Section */}
      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Services/Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skillNames.length > 0 ? (
            skillNames.map((skill) => (
              <Badge key={skill} className="bg-blue-500/20 text-blue-700 dark:text-blue-400">
                {skill}
              </Badge>
            ))
          ) : (
            <p className="text-foreground/60">No services assigned</p>
          )}
        </div>
      </Card>

      {/* Weekly Schedule */}
      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Weekly Schedule
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DAYS.map((day) => {
            const hours = staff.workingHours[day]
            const isClosed = hours?.closed || false
            return (
              <div key={day} className="p-4 bg-muted/30 rounded-lg border border-border/30">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">{day}</p>
                  {isClosed ? (
                    <Badge variant="secondary" className="bg-red-500/20 text-red-700 dark:text-red-400">
                      Closed
                    </Badge>
                  ) : (
                    <p className="text-sm text-foreground/70">
                      {hours?.open} - {hours?.close}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Assigned Bookings */}
      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Assigned Bookings</h3>
        {assignedBookings.length > 0 ? (
          <div className="space-y-3">
            {assignedBookings.map((booking) => (
              <div key={booking.id} className="p-4 bg-muted/30 rounded-lg border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-foreground">{booking.serviceName}</p>
                  <Badge
                    variant={
                      booking.status === "confirmed"
                        ? "default"
                        : booking.status === "completed"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-foreground/70">
                  <span>
                    {booking.customerName} • {booking.date} at {booking.time}
                  </span>
                  <span>${booking.price}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-foreground/60">No assigned bookings</p>
        )}
      </Card>
    </div>
  )
}
