export interface Service {
  id: string
  name: string
  category: string
  description: string
  price: number
  duration: number
  rating: number
  image: string
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface Booking {
  id: string
  serviceId: string
  serviceName: string
  customerName: string
  customerPhone: string
  date: string
  time: string
  notes: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  estimatedDuration: number
  price: number
}

export interface KPIData {
  totalBookings: number
  pending: number
  completed: number
  noShows: number
}
