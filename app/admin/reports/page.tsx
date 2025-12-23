"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Download, Calendar, TrendingUp } from "lucide-react"

const REPORT_DATA = [
  { date: "Jan 1", bookings: 45, revenue: 1200 },
  { date: "Jan 2", bookings: 52, revenue: 1450 },
  { date: "Jan 3", bookings: 48, revenue: 1350 },
  { date: "Jan 4", bookings: 61, revenue: 1800 },
  { date: "Jan 5", bookings: 55, revenue: 1650 },
  { date: "Jan 6", bookings: 67, revenue: 2100 },
  { date: "Jan 7", bookings: 58, revenue: 1900 },
]

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState<"week" | "month" | "year">("week")

  const handleExportCSV = () => {
    console.log("Exporting CSV...")
  }

  const handleExportPDF = () => {
    console.log("Exporting PDF...")
  }

  const totalBookings = REPORT_DATA.reduce((sum, d) => sum + d.bookings, 0)
  const totalRevenue = REPORT_DATA.reduce((sum, d) => sum + d.revenue, 0)
  const avgBookings = Math.round(totalBookings / REPORT_DATA.length)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-foreground/60 mt-2">Business analytics and insights</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={dateRange === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setDateRange("week")}
            className={dateRange === "week" ? "bg-blue-500" : ""}
          >
            Week
          </Button>
          <Button
            variant={dateRange === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setDateRange("month")}
            className={dateRange === "month" ? "bg-blue-500" : ""}
          >
            Month
          </Button>
          <Button
            variant={dateRange === "year" ? "default" : "outline"}
            size="sm"
            onClick={() => setDateRange("year")}
            className={dateRange === "year" ? "bg-blue-500" : ""}
          >
            Year
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
          <p className="text-foreground/60 text-sm mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Total Bookings
          </p>
          <p className="text-3xl font-bold text-foreground mb-2">{totalBookings}</p>
          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400">+12% from last week</Badge>
        </Card>

        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
          <p className="text-foreground/60 text-sm mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Total Revenue
          </p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">${totalRevenue.toLocaleString()}</p>
          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400">+8% from last week</Badge>
        </Card>

        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
          <p className="text-foreground/60 text-sm mb-2">Average Bookings/Day</p>
          <p className="text-3xl font-bold text-foreground mb-2">{avgBookings}</p>
          <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400">Per day</Badge>
        </Card>
      </div>

      {/* Chart */}
      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6 mb-8">
        <h2 className="text-lg font-bold text-foreground mb-6">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={REPORT_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="date" stroke="var(--color-foreground)" opacity={0.6} />
            <YAxis stroke="var(--color-foreground)" opacity={0.6} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
                borderRadius: "8px",
              }}
              cursor={{ stroke: "rgba(59, 130, 246, 0.3)" }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: "#3B82F6", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Export Options */}
      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Export Data</h2>
        <p className="text-foreground/60 text-sm mb-6">Download your business reports in different formats</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleExportCSV}
            className="bg-green-500/20 text-green-600 hover:bg-green-500/30 dark:text-green-400 gap-2"
          >
            <Download className="w-4 h-4" /> Export as CSV
          </Button>
          <Button
            onClick={handleExportPDF}
            className="bg-red-500/20 text-red-600 hover:bg-red-500/30 dark:text-red-400 gap-2"
          >
            <Download className="w-4 h-4" /> Export as PDF
          </Button>
        </div>
      </Card>
    </div>
  )
}
