"use client"

import { useState } from "react"
import Link from "next/link"
import { PublicNavbar } from "@/components/public-navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { mockServices } from "@/lib/mock-data"
import { Search, Star } from "lucide-react"

const CATEGORIES = ["Clinic", "Salon", "Repairs", "Tuition", "Vehicle Service"]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const popularServices = mockServices.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative border-b border-border bg-gradient-to-b from-background via-background to-muted/30 py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4 leading-tight">
              Book Services{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Instantly
              </span>
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Find and book local services with ease. From salons to clinics, repairs to tuition – all in one place.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                type="text"
                placeholder="Search services/businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-base backdrop-blur-sm bg-card/50 border border-border/50"
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full bg-card border border-border hover:border-blue-500/50 transition-colors text-sm font-medium text-foreground/80 hover:text-foreground"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 px-8">
                Explore Services
              </Button>
            </Link>
            <Button variant="outline" className="px-8 bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-foreground mb-4">Popular Services</h2>
          <p className="text-foreground/60 mb-12">Most booked services this week</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularServices.map((service) => (
              <Link key={service.id} href={`/services/${service.id}/book`} className="group">
                <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border border-border/50 backdrop-blur-sm bg-card/50">
                  <div className="h-48 bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg text-foreground">{service.name}</h3>
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                        {service.category}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/60 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{service.rating}</span>
                      </div>
                      <span className="font-bold text-blue-600 dark:text-blue-400">${service.price}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose QueueBook?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Easy Booking", desc: "Browse and book services in just 3 steps" },
              { title: "Real-time Updates", desc: "Get instant confirmation and notifications" },
              { title: "Best Prices", desc: "Find competitive rates and special offers" },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm text-center"
              >
                <h3 className="font-bold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/60 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
