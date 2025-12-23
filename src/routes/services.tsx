"use client"

import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { PublicNavbar } from "@/components/public-navbar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { mockServices } from "@/lib/mock-data"
import { Star, Filter, X } from "lucide-react"

const CATEGORIES = ["All", "Clinic", "Salon", "Repairs", "Tuition", "Vehicle Service"]
const PRICE_RANGES = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 - $50", min: 25, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "Over $100", min: 100, max: 1000 },
]

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState<(typeof PRICE_RANGES)[number] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  let filteredServices = mockServices

  if (selectedCategory !== "All") {
    filteredServices = filteredServices.filter((s) => s.category === selectedCategory)
  }

  if (selectedPriceRange) {
    filteredServices = filteredServices.filter(
      (s) => s.price >= selectedPriceRange.min && s.price <= selectedPriceRange.max,
    )
  }

  if (searchQuery) {
    filteredServices = filteredServices.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <div className="flex">
        {/* Sidebar Filters */}
        <aside
          className={`fixed md:static inset-y-0 left-0 w-64 border-r border-border bg-muted/30 backdrop-blur-sm p-6 transform transition-transform md:translate-x-0 ${
            showFilters ? "translate-x-0" : "-translate-x-full"
          } z-40 md:z-auto`}
        >
          <div className="flex items-center justify-between mb-6 md:hidden">
            <h2 className="font-bold text-lg">Filters</h2>
            <button onClick={() => setShowFilters(false)} className="p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Category
            </h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === cat
                      ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-foreground/70 hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Price Range</h3>
            <div className="space-y-2">
              {PRICE_RANGES.map((range) => (
                <button
                  key={range.label}
                  onClick={() => setSelectedPriceRange(selectedPriceRange === range ? null : range)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                    selectedPriceRange === range
                      ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-foreground/70 hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="border-b border-border bg-muted/30 backdrop-blur-sm p-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-foreground">Browse Services</h1>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-card/80 transition-colors"
                >
                  <Filter className="w-4 h-4" /> Filters
                </button>
              </div>

              {/* Search */}
              <Input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md backdrop-blur-sm bg-card/50"
              />
            </div>
          </div>

          {/* Services Grid */}
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <Link key={service.id} to={`/services/${service.id}/book`} className="group">
                      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border border-border/50 backdrop-blur-sm bg-card/50">
                        <div className="h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden relative">
                          <img
                            src={service.image || "/placeholder.svg"}
                            alt={service.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-lg text-foreground">{service.name}</h3>
                            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full whitespace-nowrap ml-2">
                              {service.category}
                            </span>
                          </div>
                          <p className="text-sm text-foreground/60 mb-4 line-clamp-2">{service.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{service.rating}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-foreground/60">{service.duration} min</p>
                              <p className="font-bold text-blue-600 dark:text-blue-400">${service.price}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-foreground/60 text-lg">No services found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
