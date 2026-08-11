import type { Request, Response } from "express"

import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
} from "../services/ClientService"

export async function create(req: Request, res: Response) {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({
      message: "Nome do cliente é obrigatório.",
    })
  }

  const client = await createClient(name)

  return res.status(201).json(client)
}

export async function list(req: Request, res: Response) {
  const clients = await getAllClients()

  return res.status(200).json(clients)
}

export async function findById(req: Request, res: Response) {
  const id = Number(req.params.id)

  const client = await getClientById(id)

  if (!client) {
    return res.status(404).json({
      message: "Cliente não encontrado.",
    })
  }

  return res.status(200).json(client)
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id)
  const { name } = req.body

  if (!name) {
    return res.status(400).json({
      message: "Nome do cliente é obrigatório.",
    })
  }

  const client = await updateClient(id, name)

  if (!client) {
    return res.status(404).json({
      message: "Cliente não encontrado.",
    })
  }

  return res.status(200).json(client)
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id)

  const deleted = await deleteClient(id)

  if (!deleted) {
    return res.status(404).json({
      message: "Cliente não encontrado.",
    })
  }

  return res.status(204).send()
}