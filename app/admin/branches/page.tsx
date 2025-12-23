"use client"

import type React from "react"

import { useState } from "react"
import { mockBranches } from "@/lib/mock-data"
import { Plus, Edit, Trash2, MapPin, Phone, Clock, ToggleRight, ToggleLeft } from "lucide-react"

interface Branch {
  id: string
  businessId: string
  name: string
  address: string
  phone: string
  workingHours: { [key: string]: { open: string; close: string; closed?: boolean } }
  active: boolean
}

interface FormState {
  name: string
  address: string
  phone: string
  openTime: string
  closeTime: string
  active: boolean
}

export default function AdminBranchesPage() {
  const [branches, setBranches] = useState<Branch[]>(mockBranches)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormState>({
    name: "",
    address: "",
    phone: "",
    openTime: "09:00",
    closeTime: "18:00",
    active: true,
  })
  const [search, setSearch] = useState("")

  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.toLowerCase().includes(search.toLowerCase()) ||
      branch.address.toLowerCase().includes(search.toLowerCase()),
  )

  const openModal = (branch?: Branch) => {
    if (branch) {
      setEditingId(branch.id)
      setFormData({
        name: branch.name,
        address: branch.address,
        phone: branch.phone,
        openTime: Object.values(branch.workingHours)[0]?.open || "09:00",
        closeTime: Object.values(branch.workingHours)[0]?.close || "18:00",
        active: branch.active,
      })
    } else {
      setEditingId(null)
      setFormData({
        name: "",
        address: "",
        phone: "",
        openTime: "09:00",
        closeTime: "18:00",
        active: true,
      })
    }
    setShowModal(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      setBranches(branches.map((branch) => (branch.id === editingId ? { ...branch, ...formData } : branch)))
    } else {
      const newBranch: Branch = {
        id: `b${Date.now()}`,
        businessId: "bus1",
        ...formData,
        workingHours: {
          Monday: { open: formData.openTime, close: formData.closeTime },
          Tuesday: { open: formData.openTime, close: formData.closeTime },
          Wednesday: { open: formData.openTime, close: formData.closeTime },
          Thursday: { open: formData.openTime, close: formData.closeTime },
          Friday: { open: formData.openTime, close: formData.closeTime },
          Saturday: { open: formData.openTime, close: formData.closeTime },
          Sunday: { closed: true, open: "", close: "" },
        },
      }
      setBranches([...branches, newBranch])
    }

    setShowModal(false)
  }

  const toggleActive = (id: string) => {
    setBranches(branches.map((branch) => (branch.id === id ? { ...branch, active: !branch.active } : branch)))
  }

  const deleteBranch = (id: string) => {
    if (confirm("Are you sure you want to delete this branch?")) {
      setBranches(branches.filter((branch) => branch.id !== id))
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Branches</h1>
          <p className="text-foreground/60">Manage your business locations</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Branch
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search branches..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Branches Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {filteredBranches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/60 mb-4">No branches found</p>
            <button onClick={() => openModal()} className="text-blue-500 hover:text-blue-600 font-medium">
              Create your first branch
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold">Name</th>
                  <th className="text-left px-6 py-4 font-semibold">Address</th>
                  <th className="text-left px-6 py-4 font-semibold">Phone</th>
                  <th className="text-left px-6 py-4 font-semibold">Hours</th>
                  <th className="text-center px-6 py-4 font-semibold">Status</th>
                  <th className="text-right px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches.map((branch) => (
                  <tr key={branch.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium">{branch.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <MapPin className="w-4 h-4" />
                        {branch.address}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-foreground/60" />
                        {branch.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <Clock className="w-4 h-4" />
                        {Object.values(branch.workingHours)[0]?.open || "N/A"} -
                        {Object.values(branch.workingHours)[0]?.close || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleActive(branch.id)}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                      >
                        {branch.active ? (
                          <>
                            <ToggleRight className="w-4 h-4 text-green-500" />
                            <span className="text-green-600 dark:text-green-400">Active</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-4 h-4 text-foreground/40" />
                            <span className="text-foreground/40">Inactive</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(branch)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-blue-500" />
                        </button>
                        <button
                          onClick={() => deleteBranch(branch.id)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">{editingId ? "Edit Branch" : "Add New Branch"}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Branch Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Open Time</label>
                  <input
                    type="time"
                    value={formData.openTime}
                    onChange={(e) => setFormData({ ...formData, openTime: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Close Time</label>
                  <input
                    type="time"
                    value={formData.closeTime}
                    onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <label htmlFor="active" className="text-sm font-medium">
                  Active
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  {editingId ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
