"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Users, DollarSign, CheckCircle } from "lucide-react"

const BOOKINGS_DATA = [
  { date: "Mon", bookings: 45 },
  { date: "Tue", bookings: 52 },
  { date: "Wed", bookings: 48 },
  { date: "Thu", bookings: 61 },
  { date: "Fri", bookings: 55 },
  { date: "Sat", bookings: 67 },
  { date: "Sun", bookings: 38 },
]

const CATEGORY_DATA = [
  { category: "Salon", bookings: 120 },
  { category: "Clinic", bookings: 95 },
  { category: "Repairs", bookings: 78 },
  { category: "Tuition", bookings: 64 },
]

const STATUS_DATA = [
  { status: "Confirmed", value: 280, fill: "#10b981" },
  { status: "Pending", value: 45, fill: "#f59e0b" },
  { status: "Completed", value: 320, fill: "#3b82f6" },
  { status: "Cancelled", value: 32, fill: "#ef4444" },
]

const PEAK_HOURS_DATA = [
  { hour: "9am", Mon: 5, Tue: 6, Wed: 4, Thu: 7, Fri: 6, Sat: 8, Sun: 2 },
  { hour: "11am", Mon: 8, Tue: 9, Wed: 7, Thu: 10, Fri: 9, Sat: 12, Sun: 5 },
  { hour: "1pm", Mon: 12, Tue: 11, Wed: 10, Thu: 13, Fri: 12, Sat: 15, Sun: 8 },
  { hour: "3pm", Mon: 10, Tue: 12, Wed: 11, Thu: 12, Fri: 11, Sat: 14, Sun: 7 },
  { hour: "5pm", Mon: 6, Tue: 8, Wed: 9, Thu: 8, Fri: 10, Sat: 9, Sun: 4 },
]

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-foreground/60 mt-2">Business insights and performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-foreground/60 text-sm mb-1">Total Bookings</p>
              <p className="text-3xl font-bold text-foreground">677</p>
            </div>
            <Users className="w-8 h-8 text-blue-500/50" />
          </div>
          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400">+12% this week</Badge>
        </Card>

        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-foreground/60 text-sm mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-foreground">$18,560</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500/50" />
          </div>
          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400">+8% this week</Badge>
        </Card>

        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-foreground/60 text-sm mb-1">Avg Booking Value</p>
              <p className="text-3xl font-bold text-foreground">$27.40</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500/50" />
          </div>
          <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400">Per booking</Badge>
        </Card>

        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-foreground/60 text-sm mb-1">Completion Rate</p>
              <p className="text-3xl font-bold text-foreground">89%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500/50" />
          </div>
          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400">+4% this week</Badge>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Per Day */}
        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Bookings Per Day</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={BOOKINGS_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-foreground)" opacity={0.6} />
              <YAxis stroke="var(--color-foreground)" opacity={0.6} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Bookings by Category */}
        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Bookings by Service Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={CATEGORY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="category" stroke="var(--color-foreground)" opacity={0.6} />
              <YAxis stroke="var(--color-foreground)" opacity={0.6} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="bookings" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Breakdown */}
        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={STATUS_DATA}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, value }) => `${status} (${value})`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {STATUS_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Peak Hours Heatmap */}
        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Peak Hours Heatmap</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left px-2 py-2 text-foreground/60">Hour</th>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <th key={day} className="text-center px-2 py-2 text-foreground/60 text-xs">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PEAK_HOURS_DATA.map((row) => (
                  <tr key={row.hour} className="border-b border-border">
                    <td className="px-2 py-3 text-foreground font-medium">{row.hour}</td>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                      const value = row[day as keyof typeof row]
                      const intensity = typeof value === "number" ? Math.min(value / 15, 1) : 0
                      return (
                        <td
                          key={`${row.hour}-${day}`}
                          className="text-center px-2 py-3"
                          style={{
                            backgroundColor: `rgba(59, 130, 246, ${intensity * 0.6})`,
                          }}
                        >
                          <span className="text-foreground text-xs font-medium">{value}</span>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
