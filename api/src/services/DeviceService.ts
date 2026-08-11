import prisma from "../config/prismaClient"

export async function createDevice(
  model: string,
  clientId: number
) {
  const client = await prisma.client.findUnique({
    where: {
      id: clientId,
    },
  })

  if (!client) {
    return null
  }

  return prisma.device.create({
    data: {
      model,
      clientId,
    },
  })
}

export async function getAllDevices() {
  return prisma.device.findMany({
    include: {
      client: true,
    },
    orderBy: {
      id: "asc",
    },
  })
}

export async function getDeviceById(id: number) {
  return prisma.device.findUnique({
    where: {
      id,
    },
    include: {
      client: true,
    },
  })
}

export async function updateDevice(
  id: number,
  model: string,
  clientId: number
) {
  const existingDevice = await prisma.device.findUnique({
    where: {
      id,
    },
  })

  if (!existingDevice) {
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

  return prisma.device.update({
    where: {
      id,
    },
    data: {
      model,
      clientId,
    },
  })
}

export async function deleteDevice(id: number) {
  const existingDevice = await prisma.device.findUnique({
    where: {
      id,
    },
  })

  if (!existingDevice) {
    return false
  }

  await prisma.device.delete({
    where: {
      id,
    },
  })

  return true
}