"use client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Download, RefreshCw } from "lucide-react"
import type { Invoice } from "@/lib/mock-data"

interface InvoiceDrawerProps {
  invoice: Invoice
  onClose: () => void
  onMarkRefunded?: (invoiceId: string) => void
}

const STATUS_COLORS: Record<string, string> = {
  paid: "bg-green-500/10 text-green-600 dark:text-green-400",
  unpaid: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  refunded: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
}

export function InvoiceDrawer({ invoice, onClose, onMarkRefunded }: InvoiceDrawerProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Invoice Details</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Invoice Header */}
          <div className="space-y-2">
            <p className="text-sm text-foreground/60">Invoice ID</p>
            <p className="font-semibold text-foreground font-mono">{invoice.id}</p>
            <Badge className={STATUS_COLORS[invoice.status]}>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </Badge>
          </div>

          {/* Customer Info */}
          <Card className="border border-border/50 bg-muted/30 p-4">
            <p className="text-xs text-foreground/60 mb-2">Customer Information</p>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">{invoice.customerName}</p>
              <p className="text-sm text-foreground/60">{invoice.customerEmail}</p>
              <p className="text-sm text-foreground/60">{invoice.customerPhone}</p>
            </div>
          </Card>

          {/* Booking Info */}
          <Card className="border border-border/50 bg-muted/30 p-4">
            <p className="text-xs text-foreground/60 mb-2">Booking Information</p>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">{invoice.serviceName}</p>
              <p className="text-sm text-foreground/60">Original: {invoice.serviceDate}</p>
              {invoice.newServiceDate && (
                <p className="text-sm text-green-600">Rescheduled to: {invoice.newServiceDate}</p>
              )}
            </div>
          </Card>

          {/* Line Items */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Line Items</p>
            <div className="space-y-2">
              {invoice.lineItems.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-foreground/60">{item.description}</span>
                  <span className="font-semibold text-foreground">${item.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-border/50 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-foreground">Total Amount</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${invoice.amount}</span>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-foreground/60 mb-1">Created</p>
              <p className="font-semibold text-foreground">{invoice.createdAt}</p>
            </div>
            <div>
              <p className="text-foreground/60 mb-1">Due</p>
              <p className="font-semibold text-foreground">{invoice.dueAt}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border space-y-3">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </Button>

          {invoice.status === "unpaid" && (
            <Button onClick={() => onMarkRefunded?.(invoice.id)} variant="outline" className="w-full bg-transparent">
              <RefreshCw className="w-4 h-4 mr-2" /> Mark as Refunded
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
