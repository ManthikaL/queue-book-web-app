"use client"

import Link from "next/link"
import { PublicNavbar } from "@/components/public-navbar"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { mockBusinesses, mockBranches } from "@/lib/mock-data"
import { Clock, MapPin, Phone, Star } from "lucide-react"

export default function BranchDetailPage({
  params,
}: {
  params: { id: string; branchId: string }
}) {
  const business = mockBusinesses.find((b) => b.id === params.id)
  const branch = mockBranches.find((b) => b.id === params.branchId)

  if (!business || !branch) {
    return (
      <>
        <PublicNavbar />
        <main className="min-h-screen bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-2xl font-bold mb-4">Branch not found</h1>
            <Link href="/businesses" className="text-blue-500 hover:text-blue-600">
              Back to businesses
            </Link>
          </div>
        </main>
      </>
    )
  }

  const days = Object.keys(branch.workingHours)
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" })
  const todayHours = branch.workingHours[today] || {}
  const isClosed = todayHours.closed

  return (
    <>
      <PublicNavbar />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: "Businesses", href: "/businesses" },
              { label: business.name, href: `/businesses/${business.id}` },
              { label: branch.name },
            ]}
          />

          {/* Branch Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-8 mb-6">
              <h1 className="text-3xl font-bold mb-2">{branch.name}</h1>
              <p className="text-foreground/70 mb-4">{business.name}</p>

              <div className="flex flex-col sm:flex-row gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span>{branch.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span>{branch.phone}</span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full font-medium inline-flex w-fit ${
                    isClosed
                      ? "bg-red-500/20 text-red-700 dark:text-red-400"
                      : "bg-green-500/20 text-green-700 dark:text-green-400"
                  }`}
                >
                  {isClosed ? "Closed" : `Open: ${todayHours.open} - ${todayHours.close}`}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Available Services</h2>
              {branch.services && branch.services.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {branch.services.map((service) => (
                    <div key={service.id} className="bg-card border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <span className="text-lg font-bold text-blue-500">${service.price}</span>
                      </div>
                      <p className="text-sm text-foreground/70 mb-3">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-foreground/60">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {service.duration} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {service.rating}
                          </span>
                        </div>
                        <Link href={`/services/${service.id}/book`}>
                          <button className="px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
                            Book Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-card border border-border rounded-lg">
                  <p className="text-foreground/60">No services available for this branch</p>
                </div>
              )}
            </div>

            {/* Working Hours */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Working Hours
              </h2>
              <div className="space-y-2">
                {days.map((day) => {
                  const hours = branch.workingHours[day]
                  const isTodayDay = day === today
                  return (
                    <div
                      key={day}
                      className={`flex justify-between py-2 px-3 rounded ${
                        isTodayDay ? "bg-blue-500/10 border border-blue-500/20" : ""
                      }`}
                    >
                      <span className={`font-medium ${isTodayDay ? "text-blue-600 dark:text-blue-400" : ""}`}>
                        {day}
                      </span>
                      <span className="text-foreground/70">
                        {hours.closed ? "Closed" : `${hours.open} - ${hours.close}`}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
