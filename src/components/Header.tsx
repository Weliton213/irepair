import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

function Header() {
const { logout } = useAuth()
const navigate = useNavigate()

async function handleLogout() {
  await logout()
  navigate("/login")
}

  return (
    <header className="bg-slate-900 text-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          iRepair
        </h1>

        <p className="mt-3 text-slate-300 text-lg">
          Dashboard de acompanhamento de Ordens de Serviço
        </p>
      </div>

      <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Sair
      </button>
    <div/>
  </header>
  )
}

export default Header