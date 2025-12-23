import type React from "react"
import { AlertCircle } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({
  title,
  description,
  icon = <AlertCircle className="w-12 h-12" />,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-foreground/50">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-foreground/60 max-w-md mb-6">{description}</p>
      {action && (
        <a
          href={action.href}
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          {action.label}
        </a>
      )}
    </div>
  )
}
