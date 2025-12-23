"use client"

import { useState, useMemo, Suspense } from "react"
import Link from "next/link"
import { PublicNavbar } from "@/components/public-navbar"
import { mockBusinesses } from "@/lib/mock-data"
import { Search, MapPin, Star } from "lucide-react"

function BusinessesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(mockBusinesses.map((b) => b.category)))

  const filteredBusinesses = useMemo(() => {
    return mockBusinesses.filter((business) => {
      const matchesSearch =
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || business.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-balance">Browse Businesses</h1>
          <p className="text-foreground/60">Find and book services from local businesses</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8 backdrop-blur-sm">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-blue-500 text-white"
                  : "bg-background border border-border text-foreground hover:bg-card"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-background border border-border text-foreground hover:bg-card"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Businesses Grid */}
        {filteredBusinesses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/60 mb-4">No businesses found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory(null)
              }}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBusinesses.map((business) => (
              <Link key={business.id} href={`/businesses/${business.id}`}>
                <div className="h-full bg-card border border-border rounded-xl overflow-hidden hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  {/* Cover Image */}
                  <div className="relative h-40 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                    <img
                      src={business.coverImage || "/placeholder.svg"}
                      alt={business.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Logo and Content */}
                  <div className="p-4">
                    <div className="flex gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                        <img
                          src={business.logo || "/placeholder.svg"}
                          alt={business.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{business.name}</h3>
                        <p className="text-sm text-foreground/60">{business.category}</p>
                      </div>
                    </div>

                    <p className="text-sm text-foreground/70 mb-3 line-clamp-2">{business.description}</p>

                    {/* Rating and Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-sm">
                          {business.rating.toFixed(1)} ({business.reviewCount})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-foreground/60 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>1.2 km</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default function BusinessesPage() {
  return (
    <>
      <PublicNavbar />
      <Suspense fallback={null}>
        <BusinessesContent />
      </Suspense>
    </>
  )
}
