"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const CHART_DATA = [
  { day: "Mon", bookings: 12, completed: 10 },
  { day: "Tue", bookings: 19, completed: 15 },
  { day: "Wed", bookings: 15, completed: 14 },
  { day: "Thu", bookings: 25, completed: 20 },
  { day: "Fri", bookings: 22, completed: 18 },
  { day: "Sat", bookings: 29, completed: 25 },
  { day: "Sun", bookings: 14, completed: 12 },
]

const KPI_CARDS = [
  { label: "Today's Bookings", value: "12", icon: "📅", trend: "+15%" },
  { label: "Pending", value: "3", icon: "⏳", trend: "-2%" },
  { label: "Completed", value: "9", icon: "✅", trend: "+8%" },
  { label: "No-shows", value: "0", icon: "❌", trend: "-" },
]

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-foreground/60 mt-2">Welcome back! Here's your business overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {KPI_CARDS.map((kpi) => (
          <Card key={kpi.label} className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <div className="flex items-start justify-between mb-4">
              <span className="text-2xl">{kpi.icon}</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  kpi.trend.startsWith("+")
                    ? "bg-green-500/10 text-green-600 dark:text-green-400"
                    : kpi.trend === "-"
                      ? "bg-gray-500/10 text-gray-600 dark:text-gray-400"
                      : "bg-red-500/10 text-red-600 dark:text-red-400"
                }`}
              >
                {kpi.trend}
              </span>
            </div>
            <p className="text-foreground/60 text-sm mb-1">{kpi.label}</p>
            <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6 mb-8">
        <h2 className="text-lg font-bold text-foreground mb-6">Weekly Bookings</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={CHART_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="day" stroke="var(--color-foreground)" opacity={0.6} />
            <YAxis stroke="var(--color-foreground)" opacity={0.6} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
                borderRadius: "8px",
              }}
              cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
            />
            <Bar dataKey="bookings" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="completed" fill="#10B981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Recent Bookings</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-semibold text-foreground">Hair Cut & Styling</p>
                  <p className="text-xs text-foreground/60">John Doe • 2:00 PM</p>
                </div>
                <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium rounded">
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Booking Rate</span>
                <span className="text-sm font-bold text-foreground">87%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[87%] bg-gradient-to-r from-blue-500 to-purple-600" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Service Completion</span>
                <span className="text-sm font-bold text-foreground">94%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[94%] bg-gradient-to-r from-green-500 to-emerald-600" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
