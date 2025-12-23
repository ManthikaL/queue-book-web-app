import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="h-10 bg-muted/30 rounded-lg w-1/4" />
      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6 space-y-4">
        <div className="h-10 bg-muted/30 rounded-lg" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-muted/30 rounded-lg" />
          <div className="h-10 bg-muted/30 rounded-lg" />
        </div>
      </Card>
      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 divide-y divide-border/50">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="px-6 py-4 flex gap-4">
            <div className="h-8 bg-muted/30 rounded-lg flex-1" />
            <div className="h-8 bg-muted/30 rounded-lg flex-1" />
            <div className="h-8 bg-muted/30 rounded-lg flex-1" />
          </div>
        ))}
      </Card>
    </div>
  )
}
