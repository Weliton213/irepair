export interface ServiceOrder {
  id: number;
  clientName: string;
  deviceModel: string;
  defect: string;
  status: "Aberto" | "Finalizado";
}