import type { ServiceOrder } from "../types/ServiceOrder"

interface ServiceCardProps {
  service: ServiceOrder
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const statusClass =
    service.status === "open"
      ? "bg-green-100 text-green-700"
      : service.status === "in_progress"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-slate-200 text-slate-700"

  return (
    <article className="bg-white rounded-xl shadow p-5 border border-slate-200">
      <div className="flex justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">
            {service.device}
          </h3>

          <p className="mt-2 text-slate-600">
            {service.issue}
          </p>
        </div>

        <span
          className={`h-fit rounded-full px-3 py-1 text-sm font-semibold ${statusClass}`}
        >
          {service.status}
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Criada em: {new Date(service.created_at).toLocaleString("pt-BR")}
      </p>
    </article>
  )
}

export default ServiceCard