import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import { api } from "../services/api"
import type { Client } from "../types/Clients"
import type {
  NewServiceOrder,
  ServiceOrder,
  ServiceOrderStatus,
} from "../types/ServiceOrder"

const ServiceOrdersPage = () => {
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  const [clientId, setClientId] = useState("")
  const [device, setDevice] = useState("")
  const [issue, setIssue] = useState("")
  const [status, setStatus] = useState<ServiceOrderStatus>("open")

  async function loadData() {
    try {
      setLoading(true)

      const [serviceOrdersResponse, clientsResponse] = await Promise.all([
        api.get<ServiceOrder[]>("/service-orders"),
        api.get<Client[]>("/clients"),
      ])

      setServiceOrders(serviceOrdersResponse.data)
      setClients(clientsResponse.data)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newServiceOrder: NewServiceOrder = {
      clientId: Number(clientId),
      device,
      issue,
      status,
    }

    try {
      await api.post("/service-orders", newServiceOrder)

      setClientId("")
      setDevice("")
      setIssue("")
      setStatus("open")

      await loadData()
    } catch (error) {
      console.error("Erro ao cadastrar ordem de serviço:", error)
    }
  }

  async function handleDelete(id: number) {
    try {
      await api.delete(`/service-orders/${id}`)
      await loadData()
    } catch (error) {
      console.error("Erro ao remover ordem de serviço:", error)
    }
  }

  return (
    <section>
      <h2 className="text-3xl font-bold text-slate-800">
        Service Orders
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white rounded-xl shadow p-6 space-y-4"
      >
        <select
          value={clientId}
          onChange={(event) => setClientId(event.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        >
          <option value="">Select a client</option>

          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Device"
          value={device}
          onChange={(event) => setDevice(event.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <input
          type="text"
          placeholder="Issue"
          value={issue}
          onChange={(event) => setIssue(event.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as ServiceOrderStatus)
          }
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-4 py-2"
        >
          Add Service Order
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {loading ? (
          <p>Carregando ordens de serviço...</p>
        ) : serviceOrders.length === 0 ? (
          <p>Nenhuma ordem de serviço encontrada.</p>
        ) : (
          serviceOrders.map((serviceOrder) => {
            const client = clients.find(
              (client) => client.id === serviceOrder.client_id
            )

            return (
              <div
                key={serviceOrder.id}
                className="bg-white rounded-xl shadow p-5 flex justify-between gap-4"
              >
                <div>
                  <h3 className="font-bold text-lg">
                    {serviceOrder.device}
                  </h3>

                  <p>
                    Client: {client?.name ?? "Cliente não encontrado"}
                  </p>

                  <p>
                    Issue: {serviceOrder.issue}
                  </p>

                  <p>
                    Status: {serviceOrder.status}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(serviceOrder.id)}
                  className="bg-red-600 text-white rounded-lg px-4 py-2"
                >
                  Delete
                </button>
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}

export default ServiceOrdersPage