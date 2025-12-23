export interface Service {
  id: string
  name: string
  category: string
  description: string
  price: number
  duration: number
  rating: number
  image: string
  branchId?: string
}

export interface Booking {
  id: string
  token: string
  serviceId: string
  serviceName: string
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  time: string
  scheduledAt: Date
  notes: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  estimatedDuration: number
  price: number
  staffId?: string
  rescheduledFrom?: Date
  lastUpdated: Date
}

export interface WorkingHours {
  [key: string]: { open: string; close: string; closed?: boolean }
}

export interface Branch {
  id: string
  businessId: string
  name: string
  address: string
  phone: string
  workingHours: WorkingHours
  active: boolean
  services?: Service[]
}

export interface Business {
  id: string
  name: string
  description: string
  category: string
  logo: string
  coverImage: string
  rating: number
  reviewCount: number
  contactEmail: string
  contactPhone: string
  address: string
  branches: Branch[]
}

export interface StaffMember {
  id: string
  branchId: string
  name: string
  role: string
  skills: string[] // serviceIds they can provide
  avatar: string
  phone: string
  email: string
  workingHours: WorkingHours
  active: boolean
  rating: number
}

export interface StaffAvailability {
  staffId: string
  date: string
  slots: {
    time: string
    available: boolean
  }[]
}

export interface Invoice {
  id: string
  type: "BOOKING" | "RESCHEDULE"
  bookingId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  amount: number
  status: "paid" | "unpaid" | "refunded"
  createdAt: string
  dueAt: string
  lineItems: {
    description: string
    amount: number
  }[]
  serviceName?: string
  serviceDate?: string
  newServiceDate?: string
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
    branchId: "b1",
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
    branchId: "b3",
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
    branchId: "b2",
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
    branchId: "b4",
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
    branchId: "b2",
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
    branchId: "b3",
  },
  {
    id: "7",
    name: "Color & Highlights",
    category: "Salon",
    description: "Professional hair coloring and highlights",
    price: 55,
    duration: 90,
    rating: 4.9,
    image: "/professional-hair-salon-haircut.jpg",
    branchId: "b1",
  },
  {
    id: "8",
    name: "English Language Tutoring",
    category: "Tuition",
    description: "Comprehensive English language and conversation lessons",
    price: 35,
    duration: 60,
    rating: 4.7,
    image: "/math-tuition-education-classroom.jpg",
    branchId: "b4",
  },
]

export const mockBranches: Branch[] = [
  {
    id: "b1",
    businessId: "bus1",
    name: "Downtown Salon",
    address: "123 Main St, New York, NY 10001",
    phone: "+1-555-0101",
    workingHours: {
      Monday: { open: "09:00", close: "18:00" },
      Tuesday: { open: "09:00", close: "18:00" },
      Wednesday: { open: "09:00", close: "18:00" },
      Thursday: { open: "09:00", close: "20:00" },
      Friday: { open: "09:00", close: "20:00" },
      Saturday: { open: "10:00", close: "18:00" },
      Sunday: { closed: true, open: "", close: "" },
    },
    active: true,
    services: [mockServices[0], mockServices[6]],
  },
  {
    id: "b2",
    businessId: "bus2",
    name: "Tech Service Center - Midtown",
    address: "456 Tech Ave, New York, NY 10002",
    phone: "+1-555-0202",
    workingHours: {
      Monday: { open: "08:00", close: "19:00" },
      Tuesday: { open: "08:00", close: "19:00" },
      Wednesday: { open: "08:00", close: "19:00" },
      Thursday: { open: "08:00", close: "19:00" },
      Friday: { open: "08:00", close: "19:00" },
      Saturday: { open: "10:00", close: "17:00" },
      Sunday: { open: "11:00", close: "17:00" },
    },
    active: true,
    services: [mockServices[2], mockServices[4]],
  },
  {
    id: "b3",
    businessId: "bus3",
    name: "City Health Clinic",
    address: "789 Health St, New York, NY 10003",
    phone: "+1-555-0303",
    workingHours: {
      Monday: { open: "08:00", close: "18:00" },
      Tuesday: { open: "08:00", close: "18:00" },
      Wednesday: { open: "08:00", close: "18:00" },
      Thursday: { open: "08:00", close: "18:00" },
      Friday: { open: "08:00", close: "18:00" },
      Saturday: { open: "09:00", close: "14:00" },
      Sunday: { closed: true, open: "", close: "" },
    },
    active: true,
    services: [mockServices[1], mockServices[5]],
  },
  {
    id: "b4",
    businessId: "bus4",
    name: "Excellence Tutoring - East Side",
    address: "321 Education Ln, New York, NY 10004",
    phone: "+1-555-0404",
    workingHours: {
      Monday: { open: "14:00", close: "20:00" },
      Tuesday: { open: "14:00", close: "20:00" },
      Wednesday: { open: "14:00", close: "20:00" },
      Thursday: { open: "14:00", close: "20:00" },
      Friday: { open: "14:00", close: "18:00" },
      Saturday: { open: "10:00", close: "16:00" },
      Sunday: { open: "10:00", close: "16:00" },
    },
    active: true,
    services: [mockServices[3], mockServices[7]],
  },
]

export const mockBusinesses: Business[] = [
  {
    id: "bus1",
    name: "Premium Hair Studio",
    description: "Award-winning salon offering professional hair care services with experienced stylists",
    category: "Salon",
    logo: "/professional-hair-salon-haircut.jpg",
    coverImage: "/professional-hair-salon-haircut.jpg",
    rating: 4.8,
    reviewCount: 245,
    contactEmail: "info@premiumhair.com",
    contactPhone: "+1-555-0100",
    address: "123 Main St, New York, NY 10001",
    branches: [mockBranches[0]],
  },
  {
    id: "bus2",
    name: "Tech Service Pro",
    description: "Comprehensive tech repair and maintenance services with certified technicians",
    category: "Repairs & Service",
    logo: "/auto-repair-car-service-mechanic.jpg",
    coverImage: "/auto-repair-car-service-mechanic.jpg",
    rating: 4.7,
    reviewCount: 189,
    contactEmail: "support@techservicepro.com",
    contactPhone: "+1-555-0200",
    address: "456 Tech Ave, New York, NY 10002",
    branches: [mockBranches[1]],
  },
  {
    id: "bus3",
    name: "City Health Clinic",
    description: "Full-service health clinic providing medical consultations, checkups, and dental care",
    category: "Medical",
    logo: "/medical-doctor-health-checkup.jpg",
    coverImage: "/medical-doctor-health-checkup.jpg",
    rating: 4.9,
    reviewCount: 412,
    contactEmail: "appointments@cityhealthclinic.com",
    contactPhone: "+1-555-0300",
    address: "789 Health St, New York, NY 10003",
    branches: [mockBranches[2]],
  },
  {
    id: "bus4",
    name: "Excellence Tutoring Center",
    description: "Premium education services offering personalized tutoring in various subjects for all ages",
    category: "Education",
    logo: "/math-tuition-education-classroom.jpg",
    coverImage: "/math-tuition-education-classroom.jpg",
    rating: 4.6,
    reviewCount: 156,
    contactEmail: "enroll@excellencetutoring.com",
    contactPhone: "+1-555-0400",
    address: "321 Education Ln, New York, NY 10004",
    branches: [mockBranches[3]],
  },
]

export const mockStaff: StaffMember[] = [
  {
    id: "staff1",
    branchId: "b1",
    name: "Sarah Mitchell",
    role: "Senior Stylist",
    skills: ["1", "7"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    phone: "+1-555-1001",
    email: "sarah@premiumhair.com",
    workingHours: {
      Monday: { open: "09:00", close: "18:00" },
      Tuesday: { open: "09:00", close: "18:00" },
      Wednesday: { open: "10:00", close: "18:00" },
      Thursday: { open: "09:00", close: "20:00" },
      Friday: { open: "09:00", close: "20:00" },
      Saturday: { open: "10:00", close: "18:00" },
      Sunday: { closed: true, open: "", close: "" },
    },
    active: true,
    rating: 4.9,
  },
  {
    id: "staff2",
    branchId: "b1",
    name: "Marcus Johnson",
    role: "Colorist",
    skills: ["7"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    phone: "+1-555-1002",
    email: "marcus@premiumhair.com",
    workingHours: {
      Monday: { open: "12:00", close: "18:00" },
      Tuesday: { open: "09:00", close: "18:00" },
      Wednesday: { open: "09:00", close: "18:00" },
      Thursday: { open: "09:00", close: "20:00" },
      Friday: { open: "09:00", close: "20:00" },
      Saturday: { open: "10:00", close: "18:00" },
      Sunday: { closed: true, open: "", close: "" },
    },
    active: true,
    rating: 4.8,
  },
  {
    id: "staff3",
    branchId: "b2",
    name: "James Chen",
    role: "Lead Technician",
    skills: ["2", "4"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    phone: "+1-555-2001",
    email: "james@techservicepro.com",
    workingHours: {
      Monday: { open: "08:00", close: "17:00" },
      Tuesday: { open: "08:00", close: "17:00" },
      Wednesday: { open: "08:00", close: "17:00" },
      Thursday: { open: "08:00", close: "17:00" },
      Friday: { open: "08:00", close: "17:00" },
      Saturday: { open: "10:00", close: "17:00" },
      Sunday: { open: "11:00", close: "17:00" },
    },
    active: true,
    rating: 4.9,
  },
  {
    id: "staff4",
    branchId: "b2",
    name: "Emily Rodriguez",
    role: "Repair Specialist",
    skills: ["2", "4"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    phone: "+1-555-2002",
    email: "emily@techservicepro.com",
    workingHours: {
      Monday: { open: "08:00", close: "19:00" },
      Tuesday: { open: "08:00", close: "19:00" },
      Wednesday: { closed: true, open: "", close: "" },
      Thursday: { open: "08:00", close: "19:00" },
      Friday: { open: "08:00", close: "19:00" },
      Saturday: { open: "10:00", close: "17:00" },
      Sunday: { closed: true, open: "", close: "" },
    },
    active: true,
    rating: 4.7,
  },
  {
    id: "staff5",
    branchId: "b3",
    name: "Dr. Michael Lee",
    role: "General Practitioner",
    skills: ["1"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    phone: "+1-555-3001",
    email: "michael@cityhealthclinic.com",
    workingHours: {
      Monday: { open: "09:00", close: "18:00" },
      Tuesday: { open: "09:00", close: "18:00" },
      Wednesday: { open: "09:00", close: "18:00" },
      Thursday: { open: "09:00", close: "18:00" },
      Friday: { open: "09:00", close: "18:00" },
      Saturday: { open: "10:00", close: "14:00" },
      Sunday: { closed: true, open: "", close: "" },
    },
    active: true,
    rating: 4.95,
  },
  {
    id: "staff6",
    branchId: "b3",
    name: "Dr. Jessica Wong",
    role: "Dentist",
    skills: ["5"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    phone: "+1-555-3002",
    email: "jessica@cityhealthclinic.com",
    workingHours: {
      Monday: { open: "08:00", close: "17:00" },
      Tuesday: { open: "09:00", close: "18:00" },
      Wednesday: { open: "09:00", close: "18:00" },
      Thursday: { open: "09:00", close: "18:00" },
      Friday: { open: "08:00", close: "17:00" },
      Saturday: { open: "09:00", close: "14:00" },
      Sunday: { closed: true, open: "", close: "" },
    },
    active: true,
    rating: 4.9,
  },
  {
    id: "staff7",
    branchId: "b4",
    name: "Alex Kumar",
    role: "Math Tutor",
    skills: ["3", "6"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    phone: "+1-555-4001",
    email: "alex@excellencetutoring.com",
    workingHours: {
      Monday: { open: "14:00", close: "20:00" },
      Tuesday: { open: "14:00", close: "20:00" },
      Wednesday: { open: "14:00", close: "20:00" },
      Thursday: { open: "14:00", close: "20:00" },
      Friday: { open: "14:00", close: "18:00" },
      Saturday: { open: "10:00", close: "16:00" },
      Sunday: { open: "10:00", close: "16:00" },
    },
    active: true,
    rating: 4.8,
  },
  {
    id: "staff8",
    branchId: "b4",
    name: "Priya Patel",
    role: "English Tutor",
    skills: ["7"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    phone: "+1-555-4002",
    email: "priya@excellencetutoring.com",
    workingHours: {
      Monday: { open: "15:00", close: "20:00" },
      Tuesday: { open: "14:00", close: "20:00" },
      Wednesday: { open: "14:00", close: "20:00" },
      Thursday: { open: "14:00", close: "20:00" },
      Friday: { open: "14:00", close: "18:00" },
      Saturday: { open: "10:00", close: "16:00" },
      Sunday: { open: "10:00", close: "16:00" },
    },
    active: true,
    rating: 4.9,
  },
]

export const mockBookings: Booking[] = [
  {
    id: "1",
    token: "BK-2025-001",
    serviceId: "1",
    serviceName: "Hair Cut & Styling",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+1-555-0123",
    date: "2025-01-25",
    time: "2:00 PM",
    scheduledAt: new Date("2025-01-25T14:00:00"),
    notes: "Please keep it short on the sides",
    status: "confirmed",
    estimatedDuration: 45,
    price: 25,
    staffId: "staff1",
    lastUpdated: new Date("2025-01-20"),
  },
  {
    id: "2",
    token: "BK-2025-002",
    serviceId: "2",
    serviceName: "General Checkup",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "+1-555-0456",
    date: "2025-01-26",
    time: "10:00 AM",
    scheduledAt: new Date("2025-01-26T10:00:00"),
    notes: "",
    status: "pending",
    estimatedDuration: 30,
    price: 50,
    lastUpdated: new Date("2025-01-22"),
  },
  {
    id: "3",
    token: "BK-2025-003",
    serviceId: "1",
    serviceName: "Hair Cut & Styling",
    customerName: "Alice Johnson",
    customerEmail: "alice@example.com",
    customerPhone: "+1-555-0789",
    date: "2025-01-20",
    time: "3:00 PM",
    scheduledAt: new Date("2025-01-20T15:00:00"),
    notes: "Fade on sides",
    status: "completed",
    estimatedDuration: 45,
    price: 25,
    staffId: "staff2",
    lastUpdated: new Date("2025-01-18"),
  },
  {
    id: "4",
    token: "BK-2025-004",
    serviceId: "3",
    serviceName: "Car Service",
    customerName: "Bob Wilson",
    customerEmail: "bob@example.com",
    customerPhone: "+1-555-1011",
    date: "2025-01-15",
    time: "9:00 AM",
    scheduledAt: new Date("2025-01-15T09:00:00"),
    notes: "Regular maintenance",
    status: "cancelled",
    estimatedDuration: 120,
    price: 120,
    staffId: "staff3",
    lastUpdated: new Date("2025-01-10"),
  },
]

export const mockInvoices: Invoice[] = [
  {
    id: "inv001",
    type: "BOOKING",
    bookingId: "1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+1-555-0123",
    amount: 25,
    status: "paid",
    createdAt: "2025-01-20",
    dueAt: "2025-01-25",
    lineItems: [{ description: "Hair Cut & Styling", amount: 25 }],
    serviceName: "Hair Cut & Styling",
    serviceDate: "2025-01-25 2:00 PM",
  },
  {
    id: "inv002",
    type: "RESCHEDULE",
    bookingId: "2",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "+1-555-0456",
    amount: 300,
    status: "unpaid",
    createdAt: "2025-01-22",
    dueAt: "2025-01-29",
    lineItems: [{ description: "Reschedule Fee (< 24h)", amount: 300 }],
    serviceName: "General Checkup",
    serviceDate: "2025-01-26 10:00 AM",
    newServiceDate: "2025-02-02 2:30 PM",
  },
]
