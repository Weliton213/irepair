import api from "./api"

interface Device {
  id: number
  model: string
  clientId: number
  createdAt: string
}

export async function createDevice(
  model: string,
  clientId: number
): Promise<Device> {
  const response = await api.post<Device>(
    "/devices",
    {
      model,
      clientId,
    }
  )

  return response.data
}