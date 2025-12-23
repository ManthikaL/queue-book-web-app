"use client"

import { useState, Suspense } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockStaff, mockServices } from "@/lib/mock-data"
import type { StaffMember } from "@/lib/mock-data"
import { Search, Plus, Edit2, Trash2, X, Check, AlertCircle } from "lucide-react"
import StaffLoading from "./loading"

function StaffContent() {
  const [staff, setStaff] = useState<StaffMember[]>(mockStaff)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null)
  const [formData, setFormData] = useState<Partial<StaffMember>>({})

  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleOpenModal = (staffMember?: StaffMember) => {
    if (staffMember) {
      setEditingStaff(staffMember)
      setFormData(staffMember)
    } else {
      setEditingStaff(null)
      setFormData({
        name: "",
        role: "",
        email: "",
        phone: "",
        skills: [],
        active: true,
        workingHours: {},
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingStaff(null)
    setFormData({})
  }

  const handleSaveStaff = () => {
    if (!formData.name || !formData.role) {
      alert("Please fill in all required fields")
      return
    }

    if (editingStaff) {
      setStaff(staff.map((s) => (s.id === editingStaff.id ? { ...editingStaff, ...formData } : s)))
    } else {
      const newStaff: StaffMember = {
        id: `staff${Date.now()}`,
        branchId: "b1",
        name: formData.name!,
        role: formData.role!,
        email: formData.email!,
        phone: formData.phone!,
        skills: formData.skills || [],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
        active: formData.active !== false,
        rating: 4.5,
        workingHours: formData.workingHours || {},
      }
      setStaff([...staff, newStaff])
    }
    handleCloseModal()
  }

  const handleDeleteStaff = (id: string) => {
    if (confirm("Are you sure you want to delete this staff member?")) {
      setStaff(staff.filter((s) => s.id !== id))
    }
  }

  const handleToggleActive = (id: string) => {
    setStaff(staff.map((s) => (s.id === id ? { ...s, active: !s.active } : s)))
  }

  const getSkillNames = (skillIds: string[]) => {
    return skillIds
      .map((id) => mockServices.find((s) => s.id === id)?.name)
      .filter(Boolean)
      .join(", ")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
        <Button onClick={() => handleOpenModal()} className="bg-gradient-to-r from-blue-500 to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Search */}
      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-4">
        <div className="flex items-center gap-2 text-foreground/60">
          <Search className="w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by name or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-0 bg-transparent focus:outline-none focus:ring-0"
          />
        </div>
      </Card>

      {/* Staff Table */}
      {filteredStaff.length > 0 ? (
        <div className="overflow-x-auto">
          <Card className="border border-border/50 backdrop-blur-sm bg-card/50">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Skills</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((member) => (
                  <tr key={member.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          className="w-10 h-10 rounded-full border border-border"
                        />
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-xs text-foreground/60">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-foreground">{member.role}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-foreground/70">{getSkillNames(member.skills)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-foreground font-medium">{member.rating}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={member.active ? "default" : "secondary"}
                        className={member.active ? "bg-green-500/20 text-green-700 dark:text-green-400" : ""}
                      >
                        {member.active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleActive(member.id)}
                          className="hover:bg-blue-500/20"
                        >
                          {member.active ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-600" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenModal(member)}
                          className="hover:bg-blue-500/20"
                        >
                          <Edit2 className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteStaff(member.id)}
                          className="hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      ) : (
        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-12 text-center">
          <p className="text-foreground/60">No staff members found</p>
        </Card>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="border border-border/50 backdrop-blur-sm bg-card w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border/50 flex items-center justify-between sticky top-0 bg-card">
              <h3 className="text-xl font-bold text-foreground">
                {editingStaff ? "Edit Staff Member" : "Add Staff Member"}
              </h3>
              <button onClick={handleCloseModal} className="text-foreground/60 hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                <Input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="backdrop-blur-sm bg-card/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Role *</label>
                <Input
                  type="text"
                  value={formData.role || ""}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Senior Stylist"
                  className="backdrop-blur-sm bg-card/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="backdrop-blur-sm bg-card/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                <Input
                  type="tel"
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1-555-0000"
                  className="backdrop-blur-sm bg-card/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Services/Skills</label>
                <div className="grid grid-cols-2 gap-2">
                  {mockServices.map((service) => (
                    <label key={service.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.skills?.includes(service.id) || false}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              skills: [...(formData.skills || []), service.id],
                            })
                          } else {
                            setFormData({
                              ...formData,
                              skills: (formData.skills || []).filter((id) => id !== service.id),
                            })
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm text-foreground">{service.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active !== false}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="active" className="text-sm font-medium text-foreground cursor-pointer">
                  Active Staff Member
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-border/50 flex gap-3 sticky bottom-0 bg-card">
              <Button variant="outline" onClick={handleCloseModal} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleSaveStaff} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600">
                {editingStaff ? "Update" : "Add"} Staff
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default function StaffManagementPage() {
  return (
    <Suspense fallback={<StaffLoading />}>
      <StaffContent />
    </Suspense>
  )
}
