"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockNotificationTemplates } from "@/lib/mock-data"
import { Plus, Edit2, Trash2, Send } from "lucide-react"
import Link from "next/link"

const typeLabels: Record<string, string> = {
  booking_confirmed: "Booking Confirmation",
  reminder: "Appointment Reminder",
  cancellation: "Cancellation Notice",
  promotion: "Promotional Offer",
}

const typeBadgeColor: Record<string, string> = {
  booking_confirmed: "bg-green-500/10 text-green-600 dark:text-green-400",
  reminder: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  cancellation: "bg-red-500/10 text-red-600 dark:text-red-400",
  promotion: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
}

export default function AdminNotificationsPage() {
  const [templates] = useState(mockNotificationTemplates)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTemplates = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notification Templates</h1>
          <p className="text-foreground/60 mt-2">Create and manage notification templates</p>
        </div>

        <Link href="/admin/notifications/new">
          <Button className="bg-blue-500 hover:bg-blue-600 gap-2">
            <Plus className="w-4 h-4" /> New Template
          </Button>
        </Link>
      </div>

      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6 mb-8">
        <input
          type="text"
          placeholder="Search templates by name or type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Card>

      <div className="overflow-x-auto">
        <Card className="border border-border/50 backdrop-blur-sm bg-card/50">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Name</th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Type</th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">Variables</th>
                <th className="text-right px-6 py-3 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTemplates.map((template) => (
                <tr key={template.id} className="border-b border-border hover:bg-foreground/5">
                  <td className="px-6 py-4 text-foreground font-medium">{template.name}</td>
                  <td className="px-6 py-4">
                    <Badge className={typeBadgeColor[template.type]}>{typeLabels[template.type]}</Badge>
                  </td>
                  <td className="px-6 py-4 text-foreground/70 text-sm">{template.variables.length} variables</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/notifications/${template.id}/edit`}>
                        <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => console.log("Send test notification")}
                        className="text-green-500 hover:text-green-600"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {filteredTemplates.length === 0 && (
        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-12 text-center">
          <p className="text-foreground/60">No templates found matching your search</p>
        </Card>
      )}
    </div>
  )
}
