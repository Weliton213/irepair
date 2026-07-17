import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import { api } from "../services/api"
import type { Client, NewClient } from "../types/Clients"

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  async function loadClients() {
    try {
      setLoading(true)

      const response = await api.get<Client[]>("/clients")

      setClients(response.data)
    } catch (error) {
      console.error("Erro ao carregar clientes:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClients()
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newClient: NewClient = {
      name,
      phone,
      email,
    }

    try {
      await api.post("/clients", newClient)

      setName("")
      setPhone("")
      setEmail("")

      await loadClients()
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error)
    }
  }

  async function handleDelete(id: number) {
    try {
      await api.delete(`/clients/${id}`)

      await loadClients()
    } catch (error) {
      console.error("Erro ao remover cliente:", error)
    }
  }

  return (
    <section>
      <h2 className="text-3xl font-bold text-slate-800">
        Clients
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white rounded-xl shadow p-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-4 py-2"
        >
          Add Client
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {loading ? (
          <p>Carregando clientes...</p>
        ) : clients.length === 0 ? (
          <p>Nenhum cliente encontrado.</p>
        ) : (
          clients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">
                  {client.name}
                </h3>

                <p>{client.phone}</p>
                <p>{client.email}</p>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(client.id)}
                className="bg-red-600 text-white rounded-lg px-4 py-2"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default ClientsPage