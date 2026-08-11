import api from "./api"

interface Client {
  id: number
  name: string
  createdAt: string
}

export async function createClient(
  name: string
): Promise<Client> {
  const response = await api.post<Client>(
    "/clients",
    {
      name,
    }
  )

  return response.data
}