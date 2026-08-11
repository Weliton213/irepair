import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../contexts/AuthContext"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setError("")

    try {
      await login(email, password)

      navigate("/")
    } catch {
      setError("Email ou senha inválidos.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <div>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full border p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="password">
            Senha
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full border p-2"
            required
          />
        </div>

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full border p-2"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}