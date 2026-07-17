import { useEffect, useState } from "react"
import type { ServiceOrder } from "../types/ServiceOrder"
import { api } from "../services/api"
import ServiceCard from "../components/ServiceCard"

const DashboardPage = () => {
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadServiceOrders() {
      try {
        setLoading(true)

        const response =
          await api.get<ServiceOrder[]>("/service-orders")

        setServiceOrders(response.data)
      } catch (error) {
        console.error(
          "Erro ao carregar ordens de serviço:",
          error,
        )
      } finally {
        setLoading(false)
      }
    }

    loadServiceOrders()
  }, [])

  if (loading) {
    return (
      <p className="text-slate-600">
        Carregando ordens de serviço...
      </p>
    )
  }

  return (
    <section>
      <h2 className="text-3xl font-bold text-slate-800">
        Dashboard
      </h2>

      <div className="mt-6">
        {serviceOrders.length === 0 ? (
          <p className="text-slate-600">
            Nenhuma ordem de serviço encontrada.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceOrders.map((serviceOrder) => (
                <ServiceCard
                    key={serviceOrder.id}
                    service={serviceOrder}
                />
        ))}
        </div>
        )}
      </div>
    </section>
  )
}

export default DashboardPage