import type { Request, Response } from "express"
import { ServiceOrderStatus } from "../../generated/prisma/client"

import {
  createServiceOrder,
  getAllServiceOrders,
  getServiceOrderById,
  updateServiceOrder,
  deleteServiceOrder,
} from "../services/ServiceOrderService"

function isValidStatus(status: string): status is ServiceOrderStatus {
  return Object.values(ServiceOrderStatus).includes(
    status as ServiceOrderStatus
  )
}

export async function create(req: Request, res: Response) {
  const { clientId, deviceId, issue, status } = req.body

  if (!clientId || !deviceId || !issue || !status) {
    return res.status(400).json({
      message: "Cliente, dispositivo, problema e status são obrigatórios.",
    })
  }

  if (!isValidStatus(status)) {
    return res.status(400).json({
      message: "Status inválido.",
    })
  }

  const serviceOrder = await createServiceOrder(
    Number(clientId),
    Number(deviceId),
    issue,
    status
  )

  if (!serviceOrder) {
    return res.status(404).json({
      message: "Cliente ou dispositivo inválido.",
    })
  }

  return res.status(201).json(serviceOrder)
}

export async function list(req: Request, res: Response) {
  const serviceOrders = await getAllServiceOrders()

  return res.status(200).json(serviceOrders)
}

export async function findById(req: Request, res: Response) {
  const id = Number(req.params.id)

  const serviceOrder = await getServiceOrderById(id)

  if (!serviceOrder) {
    return res.status(404).json({
      message: "Ordem de serviço não encontrada.",
    })
  }

  return res.status(200).json(serviceOrder)
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id)
  const { clientId, deviceId, issue, status } = req.body

  if (!clientId || !deviceId || !issue || !status) {
    return res.status(400).json({
      message: "Cliente, dispositivo, problema e status são obrigatórios.",
    })
  }

  if (!isValidStatus(status)) {
    return res.status(400).json({
      message: "Status inválido.",
    })
  }

  const serviceOrder = await updateServiceOrder(
    id,
    Number(clientId),
    Number(deviceId),
    issue,
    status
  )

  if (!serviceOrder) {
    return res.status(404).json({
      message: "Ordem, cliente ou dispositivo inválido.",
    })
  }

  return res.status(200).json(serviceOrder)
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id)

  const deleted = await deleteServiceOrder(id)

  if (!deleted) {
    return res.status(404).json({
      message: "Ordem de serviço não encontrada.",
    })
  }

  return res.status(204).send()
}