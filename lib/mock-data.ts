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
