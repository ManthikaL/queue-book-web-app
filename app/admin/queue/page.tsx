"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockBookings } from "@/lib/mock-data"
import { GripVertical, Phone, Users, CheckCircle, X } from "lucide-react"

export default function AdminQueuePage() {
  const [queue, setQueue] = useState(mockBookings.filter((b) => b.status === "confirmed"))
  const [currentToken, setCurrentToken] = useState<string | null>(null)

  const handleCallNext = () => {
    if (queue.length > 0) {
      setCurrentToken(queue[0].id)
    }
  }

  const handleMarkCompleted = (id: string) => {
    setQueue(queue.filter((b) => b.id !== id))
    if (currentToken === id) {
      setCurrentToken(null)
    }
  }

  const handleMarkNoShow = (id: string) => {
    setQueue(queue.filter((b) => b.id !== id))
    if (currentToken === id) {
      setCurrentToken(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Queue Management</h1>
        <p className="text-foreground/60 mt-2">View and manage customer queue</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Token */}
        <Card className="lg:col-span-1 border border-border/50 backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-6">
          <h2 className="text-lg font-bold text-foreground mb-6 text-center">Now Serving</h2>
          {currentToken ? (
            <div className="space-y-4">
              {queue
                .filter((b) => b.id === currentToken)
                .map((booking) => (
                  <div key={booking.id} className="text-center">
                    <div className="mb-4 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                      <p className="text-sm font-semibold opacity-80">Token #</p>
                      <p className="text-4xl font-bold">{queue.indexOf(booking) + 1}</p>
                    </div>
                    <p className="font-semibold text-foreground">{booking.customerName}</p>
                    <p className="text-sm text-foreground/60 mb-4">{booking.serviceName}</p>

                    <div className="space-y-2">
                      <Button
                        onClick={() => handleMarkCompleted(booking.id)}
                        className="w-full bg-green-500/20 text-green-600 hover:bg-green-500/30 dark:text-green-400"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" /> Completed
                      </Button>
                      <Button
                        onClick={() => handleMarkNoShow(booking.id)}
                        className="w-full bg-red-500/20 text-red-600 hover:bg-red-500/30 dark:text-red-400"
                      >
                        <X className="w-4 h-4 mr-2" /> No-show
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-foreground/60">No customers being served</p>
              <Button
                onClick={handleCallNext}
                className="w-full mt-4 bg-blue-500 text-white"
                disabled={queue.length === 0}
              >
                Call Next Customer
              </Button>
            </div>
          )}
        </Card>

        {/* Queue List */}
        <div className="lg:col-span-2">
          <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5" /> Waiting Queue
              </h2>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full font-semibold text-sm">
                {queue.length} waiting
              </span>
            </div>

            {queue.length > 0 ? (
              <div className="space-y-3">
                {queue.map((booking, idx) => (
                  <div
                    key={booking.id}
                    className={`p-4 bg-muted/30 rounded-lg border border-border/50 flex items-start gap-4 transition-all ${
                      currentToken === booking.id ? "ring-2 ring-blue-500 bg-blue-500/5" : ""
                    }`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <GripVertical className="w-5 h-5 text-foreground/40" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="font-bold text-lg text-foreground">#{idx + 1}</p>
                          <p className="text-sm font-semibold text-foreground">{booking.customerName}</p>
                        </div>
                        <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs">
                          {booking.serviceName}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-foreground/60 flex-wrap">
                        <Phone className="w-3 h-3" />
                        <span>{booking.customerPhone}</span>
                      </div>
                    </div>

                    {currentToken !== booking.id && (
                      <Button
                        onClick={handleCallNext}
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0 bg-transparent"
                        disabled={currentToken !== null}
                      >
                        Call
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground/60">Queue is empty</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
