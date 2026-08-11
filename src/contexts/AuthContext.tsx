import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

import api from "../services/api"

interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

interface AuthContextData {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData | undefined>(
  undefined
)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const isAuthenticated = user !== null

  async function login(email: string, password: string) {
    const response = await api.post("/auth/login", {
      email,
      password,
    })

    setUser(response.data)
  }

  async function logout() {
    await api.post("/auth/logout")

    setUser(null)
  }

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get("/auth/me")

        setUser(response.data)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuth deve ser utilizado dentro de AuthProvider"
    )
  }

  return context
}