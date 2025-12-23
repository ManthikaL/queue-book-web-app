"use client"

import { useState } from "react"
import Link from "next/link"
import { PublicNavbar } from "@/components/public-navbar"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { mockBusinesses } from "@/lib/mock-data"
import { Clock, MapPin, Phone, Mail, Star, ChevronRight } from "lucide-react"

export default function BusinessDetailPage({ params }: { params: { id: string } }) {
  const business = mockBusinesses.find((b) => b.id === params.id)
  const [activeTab, setActiveTab] = useState<"about" | "branches">("about")

  if (!business) {
    return (
      <>
        <PublicNavbar />
        <main className="min-h-screen bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-2xl font-bold mb-4">Business not found</h1>
            <Link href="/businesses" className="text-blue-500 hover:text-blue-600">
              Back to businesses
            </Link>
          </div>
        </main>
      </>
    )
  }

  const isOpen = Math.random() > 0.3 // Mock open/close status

  return (
    <>
      <PublicNavbar />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Businesses", href: "/businesses" }, { label: business.name }]} />

          {/* Cover and Header */}
          <div className="mb-8">
            <div className="relative h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl overflow-hidden mb-6">
              <img
                src={business.coverImage || "/placeholder.svg"}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-6 mb-6">
              <div className="w-24 h-24 rounded-xl bg-card border border-border overflow-hidden flex-shrink-0">
                <img
                  src={business.logo || "/placeholder.svg"}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">
                          {business.rating.toFixed(1)} ({business.reviewCount} reviews)
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isOpen
                            ? "bg-green-500/20 text-green-700 dark:text-green-400"
                            : "bg-red-500/20 text-red-700 dark:text-red-400"
                        }`}
                      >
                        {isOpen ? "Open now" : "Closed"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Address</span>
                </div>
                <p className="text-sm text-foreground/70">{business.address}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Phone</span>
                </div>
                <p className="text-sm text-foreground/70">{business.contactPhone}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <p className="text-sm text-foreground/70 truncate">{business.contactEmail}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Branches</span>
                </div>
                <p className="text-sm text-foreground/70">{business.branches.length} location(s)</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex border-b border-border">
              <button
                onClick={() => setActiveTab("about")}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === "about"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab("branches")}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === "branches"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                Branches ({business.branches.length})
              </button>
            </div>

            <div className="p-6">
              {activeTab === "about" && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">About</h2>
                  <p className="text-foreground/70 mb-6">{business.description}</p>
                </div>
              )}

              {activeTab === "branches" && (
                <div className="space-y-4">
                  {business.branches.map((branch) => (
                    <Link key={branch.id} href={`/businesses/${business.id}/branches/${branch.id}`}>
                      <div className="p-4 border border-border rounded-lg hover:bg-card/50 hover:border-blue-500/50 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{branch.name}</h3>
                            <div className="space-y-1 text-sm text-foreground/70">
                              <p className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> {branch.address}
                              </p>
                              <p className="flex items-center gap-2">
                                <Phone className="w-4 h-4" /> {branch.phone}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-foreground/50" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
