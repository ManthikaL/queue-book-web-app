"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockServices } from "@/lib/mock-data"
import { Edit2, Trash2, Plus, Search, X } from "lucide-react"

function ServicesContent() {
  const [services, setServices] = useState(mockServices)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    duration: 0,
  })

  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAdd = () => {
    if (!formData.name) return
    const newService = {
      id: Date.now().toString(),
      ...formData,
      rating: 4.5,
      image: "/placeholder.svg",
    }
    setServices([...services, newService])
    setFormData({ name: "", category: "", description: "", price: 0, duration: 0 })
    setShowAddModal(false)
  }

  const handleDelete = (id: string) => {
    setServices(services.filter((s) => s.id !== id))
  }

  const handleEdit = (service: (typeof mockServices)[0]) => {
    setEditingId(service.id)
    setFormData({
      name: service.name,
      category: service.category,
      description: service.description,
      price: service.price,
      duration: service.duration,
    })
    setShowAddModal(true)
  }

  const handleUpdate = () => {
    if (!editingId) return
    setServices(services.map((s) => (s.id === editingId ? { ...s, ...formData } : s)))
    setEditingId(null)
    setFormData({ name: "", category: "", description: "", price: 0, duration: 0 })
    setShowAddModal(false)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services</h1>
          <p className="text-foreground/60 mt-2">Manage your service offerings</p>
        </div>
        <Button
          onClick={() => {
            setEditingId(null)
            setFormData({ name: "", category: "", description: "", price: 0, duration: 0 })
            setShowAddModal(true)
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 gap-2"
        >
          <Plus className="w-4 h-4" /> Add Service
        </Button>
      </div>

      {/* Search */}
      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-4 mb-6">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-foreground/40" />
          <Input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 bg-transparent placeholder:text-foreground/40"
          />
        </div>
      </Card>

      {/* Services Table */}
      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Service</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground hidden sm:table-cell">Category</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground hidden lg:table-cell">Duration</th>
                <th className="text-right px-6 py-4 font-semibold text-foreground">Price</th>
                <th className="text-right px-6 py-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-foreground">{service.name}</p>
                      <p className="text-xs text-foreground/60 hidden sm:block">{service.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400">{service.category}</Badge>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell text-foreground">{service.duration} min</td>
                  <td className="px-6 py-4 text-right font-semibold text-blue-600 dark:text-blue-400">
                    ${service.price}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(service)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(service.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">{editingId ? "Edit Service" : "Add Service"}</h2>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingId(null)
                }}
                className="p-1 hover:bg-muted rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Service Name</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="backdrop-blur-sm bg-card/50"
                  placeholder="e.g., Hair Cut"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="">Select Category</option>
                  <option value="Clinic">Clinic</option>
                  <option value="Salon">Salon</option>
                  <option value="Repairs">Repairs</option>
                  <option value="Tuition">Tuition</option>
                  <option value="Vehicle Service">Vehicle Service</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 backdrop-blur-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  rows={3}
                  placeholder="Service description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Price ($)</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="backdrop-blur-sm bg-card/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Duration (min)</label>
                  <Input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                    className="backdrop-blur-sm bg-card/50"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddModal(false)
                  setEditingId(null)
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={editingId ? handleUpdate : handleAdd}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600"
              >
                {editingId ? "Update" : "Add"} Service
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default function AdminServicesPage() {
  return <ServicesContent />
}
