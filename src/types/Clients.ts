export interface Client {
  id: number
  name: string
  phone: string
  email: string
  created_at: string
}

export interface NewClient {
  name: string
  phone: string
  email: string
}