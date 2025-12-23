"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    // Handle admin login
    console.log({ email, password })
    // Redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border border-border/50 backdrop-blur-sm bg-card/50 p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">QB</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">QueueBook Admin</h1>
          <p className="text-foreground/60 text-sm">Manage your service business</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
            <Input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="backdrop-blur-sm bg-card/50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="backdrop-blur-sm bg-card/50"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="rounded" />
            <label htmlFor="remember" className="text-sm text-foreground/70">
              Remember me
            </label>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
          >
            Sign In
          </Button>
        </div>

        <p className="text-center text-sm text-foreground/60 mt-6">Demo credentials: admin@queuebook.com / password</p>
      </Card>
    </div>
  )
}
