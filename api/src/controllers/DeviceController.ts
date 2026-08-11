import type { Request, Response } from "express"

import {
  createDevice,
  getAllDevices,
  getDeviceById,
  updateDevice,
  deleteDevice,
} from "../services/DeviceService"

export async function create(req: Request, res: Response) {
  const { model, clientId } = req.body

  if (!model || !clientId) {
    return res.status(400).json({
      message: "Modelo e cliente são obrigatórios.",
    })
  }

  const device = await createDevice(
    model,
    Number(clientId)
  )

  if (!device) {
    return res.status(404).json({
      message: "Cliente não encontrado.",
    })
  }

  return res.status(201).json(device)
}

export async function list(req: Request, res: Response) {
  const devices = await getAllDevices()

  return res.status(200).json(devices)
}

export async function findById(req: Request, res: Response) {
  const id = Number(req.params.id)

  const device = await getDeviceById(id)

  if (!device) {
    return res.status(404).json({
      message: "Dispositivo não encontrado.",
    })
  }

  return res.status(200).json(device)
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id)
  const { model, clientId } = req.body

  if (!model || !clientId) {
    return res.status(400).json({
      message: "Modelo e cliente são obrigatórios.",
    })
  }

  const device = await updateDevice(
    id,
    model,
    Number(clientId)
  )

  if (!device) {
    return res.status(404).json({
      message: "Dispositivo ou cliente não encontrado.",
    })
  }

  return res.status(200).json(device)
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id)

  const deleted = await deleteDevice(id)

  if (!deleted) {
    return res.status(404).json({
      message: "Dispositivo não encontrado.",
    })
  }

  return res.status(204).send()
}