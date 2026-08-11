import { useState } from "react"

import type { 
  ServiceOrder,
  ServiceOrderStatus,
} from "../types/ServiceOrder"

import { createClient } from "../services/ClientService"
import { createDevice } from "../services/DeviceService"
import { createServiceOrder } from "../services/ServiceOrderService"

interface NewServiceFormProps {
  onAddService: (service: ServiceOrder) => void
}

function NewServiceForm({ onAddService }: NewServiceFormProps) {
  const [clientName, setClientName] = useState("")
  const [deviceModel, setDeviceModel] = useState("")
  const [defect, setDefect] = useState("")
  const [status, setStatus] = useState<ServiceOrderStatus>("open")

async function handleSubmit(
  event: React.FormEvent<HTMLFormElement>
) {
  event.preventDefault()

  if (
    clientName.trim() === "" ||
    deviceModel.trim() === "" ||
    defect.trim() === ""
  ) {
    alert("Preencha todos os campos.")
    return
  }

  try {
    const client = await createClient(
      clientName.trim()
    )

    const device = await createDevice(
      deviceModel.trim(),
      client.id
    )

    const newService = await createServiceOrder(
      client.id,
      device.id,
      defect.trim(),
      status
    )

    onAddService(newService)

    setClientName("")
    setDeviceModel("")
    setDefect("")
    setStatus("open")
  } catch (error) {
    console.error(
      "Erro ao cadastrar ordem de serviço:",
      error
    )

    alert("Não foi possível cadastrar a ordem de serviço.")
  }
}

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-slate-800">
        Nova Ordem de Serviço
      </h2>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Nome do cliente
        </label>
        <input
          type="text"
          value={clientName}
          onChange={(event) => setClientName(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: João Silva"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Modelo do aparelho
        </label>
        <input
          type="text"
          value={deviceModel}
          onChange={(event) => setDeviceModel(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: iPhone 11"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Defeito informado
        </label>
        <input
          type="text"
          value={defect}
          onChange={(event) => setDefect(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: Tela quebrada"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Status
        </label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as ServiceOrderStatus)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Aberto">Aberto</option>
          <option value="Finalizado">Finalizado</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition"
      >
        Salvar
      </button>
    </form>
  )
}

export default NewServiceForm