import type { ServiceOrder } from "../types/ServiceOrder"

interface ServiceCardProps {
  service: ServiceOrder
}

function ServiceCard({ service }: ServiceCardProps) {
  const statusClass =
    service.status === "Aberto"
      ? "bg-green-100 text-green-700"
      : "bg-gray-200 text-gray-700"

  return (
    <article className="bg-white rounded-2xl shadow-md border border-slate-200 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            {service.clientName}
          </h2>

          <p className="text-slate-500 mt-1">
            {service.deviceModel}
          </p>
        </div>

        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClass}`}>
          {service.status}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-slate-700">
          Defeito informado
        </h3>

        <p className="text-slate-600 mt-1">
          {service.defect}
        </p>
      </div>
    </article>
  )
}

export default ServiceCard