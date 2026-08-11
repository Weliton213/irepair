import api from "./api"

import type {
  ServiceOrder,
  ServiceOrderStatus,
} from "../types/ServiceOrder"

interface ApiServiceOrder {
  id: number
  issue: string
  status: "OPEN" | "IN_PROGRESS" | "DONE"

  client: {
    id: number
    name: string
  }

  device: {
    id: number
    model: string
  }
}

function convertStatus(
  status: ApiServiceOrder["status"]
): ServiceOrderStatus {
  switch (status) {
    case "OPEN":
      return "open"

    case "IN_PROGRESS":
      return "in_progress"

    case "DONE":
      return "done"
  }
}

function convertStatusToApi(
  status: ServiceOrderStatus
): ApiServiceOrder["status"] {
  switch (status) {
    case "open":
      return "OPEN"

    case "in_progress":
      return "IN_PROGRESS"

    case "done":
      return "DONE"
  }
}

export async function getServiceOrders(): Promise<ServiceOrder[]> {
  const response = await api.get<ApiServiceOrder[]>(
    "/service-orders"
  )

  return response.data.map((order) => ({
    id: order.id,
    clientName: order.client.name,
    deviceModel: order.device.model,
    defect: order.issue,
    status: convertStatus(order.status),
  }))
}

export async function createServiceOrder(
  clientId: number,
  deviceId: number,
  defect: string,
  status: ServiceOrderStatus
): Promise<ServiceOrder> {
  const response = await api.post<ApiServiceOrder>(
    "/service-orders",
    {
      clientId,
      deviceId,
      issue: defect,
      status: convertStatusToApi(status),
    }
  )

  const order = response.data

  return {
    id: order.id,
    clientName: order.client.name,
    deviceModel: order.device.model,
    defect: order.issue,
    status: convertStatus(order.status),
  }
}