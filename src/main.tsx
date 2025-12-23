import React from "react"
import ReactDOM from "react-dom/client"
import { RootRoute, Route, createRouter, RouterProvider } from "@tanstack/react-router"
import RootLayout from "./routes/__root"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Create a root route
const rootRoute = new RootRoute({
  component: RootLayout,
})

// Public routes
import IndexPage from "./routes/index"
import ServicesPage from "./routes/services"
import ServiceDetailPage from "./routes/services/$id.book"
import MyBookingsPage from "./routes/my-bookings"

// Admin routes
import AdminLoginPage from "./routes/admin/login"
import AdminLayout from "./routes/admin/__layout"
import AdminDashboard from "./routes/admin/index"
import AdminServicesPage from "./routes/admin/services"
import AdminSchedulePage from "./routes/admin/schedule"
import AdminQueuePage from "./routes/admin/queue"
import AdminReportsPage from "./routes/admin/reports"

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
})

const servicesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: ServicesPage,
})

const serviceDetailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/services/$id/book",
  component: ServiceDetailPage,
})

const myBookingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/my-bookings",
  component: MyBookingsPage,
})

const adminLoginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: AdminLoginPage,
})

const adminRoute = new RootRoute({
  component: AdminLayout,
})

const adminDashboardRoute = new Route({
  getParentRoute: () => adminRoute,
  path: "/admin",
  component: AdminDashboard,
})

const adminServicesRoute = new Route({
  getParentRoute: () => adminRoute,
  path: "/admin/services",
  component: AdminServicesPage,
})

const adminScheduleRoute = new Route({
  getParentRoute: () => adminRoute,
  path: "/admin/schedule",
  component: AdminSchedulePage,
})

const adminQueueRoute = new Route({
  getParentRoute: () => adminRoute,
  path: "/admin/queue",
  component: AdminQueuePage,
})

const adminReportsRoute = new Route({
  getParentRoute: () => adminRoute,
  path: "/admin/reports",
  component: AdminReportsPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  serviceDetailRoute,
  myBookingsRoute,
  adminLoginRoute,
  adminRoute.addChildren([
    adminDashboardRoute,
    adminServicesRoute,
    adminScheduleRoute,
    adminQueueRoute,
    adminReportsRoute,
  ]),
])

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
