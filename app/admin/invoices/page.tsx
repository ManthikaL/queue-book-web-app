"use client"
import { Suspense, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ChevronRight } from "lucide-react"
import { mockInvoices } from "@/lib/mock-data"
import { InvoiceDrawer } from "@/components/invoice-drawer"
import type { Invoice } from "@/lib/mock-data"

const STATUS_COLORS: Record<string, string> = {
  paid: "bg-green-500/10 text-green-600 dark:text-green-400",
  unpaid: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  refunded: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
}

const TYPE_COLORS: Record<string, string> = {
  BOOKING: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  RESCHEDULE: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
}

function InvoicesContent() {
  const [invoices, setInvoices] = useState(mockInvoices)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "unpaid" | "refunded">("all")
  const [typeFilter, setTypeFilter] = useState<"all" | "BOOKING" | "RESCHEDULE">("all")

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.serviceName?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || inv.status === statusFilter
    const matchesType = typeFilter === "all" || inv.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleMarkRefunded = (invoiceId: string) => {
    setInvoices((prev) => prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: "refunded" as const } : inv)))
    setSelectedInvoice(null)
  }

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Invoices</h1>
          <p className="text-foreground/60">Manage and track all booking and reschedule invoices</p>
        </div>

        {/* Filters */}
        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <Input
                type="text"
                placeholder="Search by invoice ID, customer name, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/30 border-border/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                  className="w-full px-4 py-2 bg-muted/30 border border-border/50 rounded-lg text-foreground focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
                  className="w-full px-4 py-2 bg-muted/30 border border-border/50 rounded-lg text-foreground focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="BOOKING">Booking</option>
                  <option value="RESCHEDULE">Reschedule Fee</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Invoices Table */}
        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 overflow-hidden">
          {filteredInvoices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border/50 bg-muted/20">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Invoice ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Customer</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredInvoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => setSelectedInvoice(invoice)}
                    >
                      <td className="px-6 py-4 text-sm font-mono text-foreground">{invoice.id}</td>
                      <td className="px-6 py-4">
                        <Badge className={TYPE_COLORS[invoice.type]}>
                          {invoice.type === "BOOKING" ? "Booking" : "Reschedule Fee"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{invoice.customerName}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">${invoice.amount}</td>
                      <td className="px-6 py-4">
                        <Badge className={STATUS_COLORS[invoice.status]}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/60">{invoice.createdAt}</td>
                      <td className="px-6 py-4 text-right">
                        <ChevronRight className="w-4 h-4 text-foreground/40" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-foreground/60">No invoices found</p>
            </div>
          )}
        </Card>
      </div>

      {/* Invoice Drawer */}
      {selectedInvoice && (
        <InvoiceDrawer
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          onMarkRefunded={handleMarkRefunded}
        />
      )}
    </>
  )
}

export default function InvoicesPage() {
  return (
    <Suspense fallback={null}>
      <InvoicesContent />
    </Suspense>
  )
}
