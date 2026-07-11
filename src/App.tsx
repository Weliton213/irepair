import { useState } from "react"
import Header from "./components/Header"
import ServiceCard from "./components/ServiceCard"
import NewServiceForm from "./components/NewServiceForm"
import type { ServiceOrder } from "./types/ServiceOrder"

function App() {
  const [services, setServices] = useState<ServiceOrder[]>([
    {
      id: 1,
      clientName: "João Silva",
      deviceModel: "iPhone 11",
      defect: "Tela quebrada",
      status: "Aberto",
    },
    {
      id: 2,
      clientName: "Maria Oliveira",
      deviceModel: "Samsung Galaxy A52",
      defect: "Bateria descarregando rápido",
      status: "Finalizado",
    },
  ])

  function handleAddService(newService: ServiceOrder) {
    setServices([...services, newService])
  }

  const totalServices = services.length

  const openServices = services.filter(
    (service) => service.status === "Aberto"
  ).length

  const finishedServices = services.filter(
    (service) => service.status === "Finalizado"
  ).length

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Header />

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl shadow p-5 border border-slate-200">
            <p className="text-sm text-slate-500">Total de OS</p>
            <strong className="text-3xl text-slate-800">
              {totalServices}
            </strong>
          </div>

          <div className="bg-green-100 rounded-2xl shadow p-5 border border-green-200">
            <p className="text-sm text-green-700">OS Abertas</p>
            <strong className="text-3xl text-green-800">
              {openServices}
            </strong>
          </div>

          <div className="bg-gray-200 rounded-2xl shadow p-5 border border-gray-300">
            <p className="text-sm text-gray-700">OS Finalizadas</p>
            <strong className="text-3xl text-gray-800">
              {finishedServices}
            </strong>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <NewServiceForm onAddService={handleAddService} />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">
              Ordens de Serviço
            </h2>

            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default App