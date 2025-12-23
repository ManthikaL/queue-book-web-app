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

export const mockServices: Service[] = [
  {
    id: "1",
    name: "Hair Cut & Styling",
    category: "Salon",
    description: "Professional hair cut and styling service",
    price: 25,
    duration: 45,
    rating: 4.8,
    image: "/professional-hair-salon-haircut.jpg",
  },
  {
    id: "2",
    name: "General Checkup",
    category: "Clinic",
    description: "Comprehensive health checkup with doctor consultation",
    price: 50,
    duration: 30,
    rating: 4.9,
    image: "/medical-doctor-health-checkup.jpg",
  },
  {
    id: "3",
    name: "Car Service",
    category: "Vehicle Service",
    description: "Complete car maintenance and service",
    price: 120,
    duration: 120,
    rating: 4.7,
    image: "/auto-repair-car-service-mechanic.jpg",
  },
  {
    id: "4",
    name: "Mathematics Tuition",
    category: "Tuition",
    description: "One-on-one math tutoring for all levels",
    price: 30,
    duration: 60,
    rating: 4.6,
    image: "/math-tuition-education-classroom.jpg",
  },
  {
    id: "5",
    name: "Phone Repair",
    category: "Repairs",
    description: "Fast and reliable phone repair service",
    price: 45,
    duration: 45,
    rating: 4.5,
    image: "/phone-repair-electronics-technician.jpg",
  },
  {
    id: "6",
    name: "Dental Cleaning",
    category: "Clinic",
    description: "Professional teeth cleaning and examination",
    price: 60,
    duration: 45,
    rating: 4.8,
    image: "/dental-cleaning-dentist-teeth.jpg",
  },
]

export const mockBookings: Booking[] = [
  {
    id: "1",
    serviceId: "1",
    serviceName: "Hair Cut & Styling",
    customerName: "John Doe",
    customerPhone: "+1-555-0123",
    date: "2025-01-25",
    time: "2:00 PM",
    notes: "Please keep it short on the sides",
    status: "confirmed",
    estimatedDuration: 45,
    price: 25,
  },
  {
    id: "2",
    serviceId: "2",
    serviceName: "General Checkup",
    customerName: "Jane Smith",
    customerPhone: "+1-555-0456",
    date: "2025-01-26",
    time: "10:00 AM",
    notes: "",
    status: "pending",
    estimatedDuration: 30,
    price: 50,
  },
]
