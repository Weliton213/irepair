import { NavLink, Outlet } from "react-router-dom"

const MainLayout = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-blue-300 font-semibold"
      : "text-slate-300 hover:text-white"

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">
            iRepair
          </h1>

          <p className="mt-5">
            Sistema de gerenciamento de assistência técnica
          </p>

          <nav className="mt-5 flex flex-wrap gap-5">
            <NavLink to="/" className={linkClass}>
              Dashboard
            </NavLink>

            <NavLink to="/clients" className={linkClass}>
              Clients
            </NavLink>

            <NavLink
              to="/service-orders"
              className={linkClass}
            >
              Service Orders
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout