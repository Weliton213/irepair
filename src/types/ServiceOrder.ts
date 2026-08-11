export type ServiceOrderStatus =
  | "open"
  | "in_progress"
  | "done"

export interface ServiceOrder {
  id: number
  clientName: string
  deviceModel: string
  defect: string
  status: ServiceOrderStatus
  //reated_at: string
}

export interface NewServiceOrder {
  clientName: string
  deviceModel: string
  defect: string
  status: ServiceOrderStatus
}