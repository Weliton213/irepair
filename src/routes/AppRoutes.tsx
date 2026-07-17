import { Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import DashboardPage from "../pages/DashboardPage"
import ClientsPage from "../pages/ClientsPage"
import ServiceOrdersPage from "../pages/ServiceOrdersPage"

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={<DashboardPage />}
        />

        <Route
          path="/clients"
          element={<ClientsPage />}
        />

        <Route
          path="/service-orders"
          element={<ServiceOrdersPage />}
        />
      </Route>
    </Routes>
  )
}

export default AppRoutes