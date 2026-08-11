import prisma from "../config/prismaClient"
import { ServiceOrderStatus } from "../../generated/prisma/client"

export async function createServiceOrder(
  clientId: number,
  deviceId: number,
  issue: string,
  status: ServiceOrderStatus
) {
  const client = await prisma.client.findUnique({
    where: {
      id: clientId,
    },
  })

  if (!client) {
    return null
  }

  const device = await prisma.device.findUnique({
    where: {
      id: deviceId,
    },
  })

  if (!device || device.clientId !== clientId) {
    return null
  }

  return prisma.serviceOrder.create({
    data: {
      clientId,
      deviceId,
      issue,
      status,
    },
    include: {
      client: true,
      device: true,
    },
  })
}

export async function getAllServiceOrders() {
  return prisma.serviceOrder.findMany({
    include: {
      client: true,
      device: true,
    },
    orderBy: {
      id: "asc",
    },
  })
}

export async function getServiceOrderById(id: number) {
  return prisma.serviceOrder.findUnique({
    where: {
      id,
    },
    include: {
      client: true,
      device: true,
    },
  })
}

export async function updateServiceOrder(
  id: number,
  clientId: number,
  deviceId: number,
  issue: string,
  status: ServiceOrderStatus
) {
  const existingOrder = await prisma.serviceOrder.findUnique({
    where: {
      id,
    },
  })

  if (!existingOrder) {
    return null
  }

  const client = await prisma.client.findUnique({
    where: {
      id: clientId,
    },
  })

  if (!client) {
    return null
  }

  const device = await prisma.device.findUnique({
    where: {
      id: deviceId,
    },
  })

  if (!device || device.clientId !== clientId) {
    return null
  }

  return prisma.serviceOrder.update({
    where: {
      id,
    },
    data: {
      clientId,
      deviceId,
      issue,
      status,
    },
    include: {
      client: true,
      device: true,
    },
  })
}

export async function deleteServiceOrder(id: number) {
  const existingOrder = await prisma.serviceOrder.findUnique({
    where: {
      id,
    },
  })

  if (!existingOrder) {
    return false
  }

  await prisma.serviceOrder.delete({
    where: {
      id,
    },
  })

  return true
}