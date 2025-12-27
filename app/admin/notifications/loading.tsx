import { Card } from "@/components/ui/card"

export default function AdminNotificationsLoading() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="h-10 w-64 rounded-lg bg-muted animate-pulse mb-2" />
          <div className="h-5 w-80 rounded-lg bg-muted animate-pulse" />
        </div>
        <div className="h-10 w-40 rounded-lg bg-muted animate-pulse" />
      </div>

      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6 mb-8">
        <div className="h-10 rounded-lg bg-muted animate-pulse" />
      </Card>

      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 overflow-hidden">
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
            {Array.from({ length: 4 }).map((_, i) => (
              <tr key={i} className="border-b border-border">
                <td className="px-6 py-4">
                  <div className="h-5 w-40 rounded-lg bg-muted animate-pulse" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 w-32 rounded-lg bg-muted animate-pulse" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 w-20 rounded-lg bg-muted animate-pulse" />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <div className="h-8 w-8 rounded-lg bg-muted animate-pulse" />
                    <div className="h-8 w-8 rounded-lg bg-muted animate-pulse" />
                    <div className="h-8 w-8 rounded-lg bg-muted animate-pulse" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
