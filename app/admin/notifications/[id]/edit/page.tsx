"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockNotificationTemplates } from "@/lib/mock-data"
import { Save, Eye } from "lucide-react"
import { useParams } from "next/navigation"

const typeLabels: Record<string, string> = {
  booking_confirmed: "Booking Confirmation",
  reminder: "Appointment Reminder",
  cancellation: "Cancellation Notice",
  promotion: "Promotional Offer",
}

export default function EditNotificationTemplatePage() {
  const params = useParams()
  const templateId = params.id as string
  const template = mockNotificationTemplates.find((t) => t.id === templateId)

  const [subject, setSubject] = useState(template?.subject || "")
  const [body, setBody] = useState(template?.body || "")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!template) {
    return <div className="text-center text-foreground/60">Template not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Edit Template</h1>
        <p className="text-foreground/60 mt-2">
          {template.name} • <Badge className="ml-2">{typeLabels[template.type]}</Badge>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <label className="block text-sm font-semibold text-foreground mb-2">Subject Line</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Card>

          <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <label className="block text-sm font-semibold text-foreground mb-2">Message Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-foreground/60 text-xs mt-2">
              Use double curly braces for variables: {`{{variableName}}`}
            </p>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 gap-2">
              <Save className="w-4 h-4" /> Save Template
            </Button>

            {saved && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Template saved
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4" /> Variables
            </h3>
            <div className="space-y-2">
              {template.variables.map((variable) => (
                <code key={variable} className="block px-3 py-2 rounded bg-background/50 text-blue-500 text-sm">
                  {`{{${variable}}}`}
                </code>
              ))}
            </div>
          </Card>

          <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <h3 className="font-semibold text-foreground mb-4">Preview</h3>
            <div className="space-y-3">
              <div>
                <p className="text-foreground/60 text-xs uppercase mb-1">Subject</p>
                <p className="text-foreground text-sm">{subject || "Subject line preview"}</p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-foreground/60 text-xs uppercase mb-1">Body</p>
                <p className="text-foreground text-sm whitespace-pre-wrap">{body || "Message body preview"}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
