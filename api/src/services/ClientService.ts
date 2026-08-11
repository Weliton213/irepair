import prisma from "../config/prismaClient"

export async function createClient(name: string) {
  return prisma.client.create({
    data: {
      name,
    },
  })
}

export async function getAllClients() {
  return prisma.client.findMany({
    orderBy: {
      id: "asc",
    },
  })
}

export async function getClientById(id: number) {
  return prisma.client.findUnique({
    where: {
      id,
    },
  })
}

export async function updateClient(
  id: number,
  name: string
) {
  const existingClient = await prisma.client.findUnique({
    where: {
      id,
    },
  })

  if (!existingClient) {
    return null
  }

  return prisma.client.update({
    where: {
      id,
    },
    data: {
      name,
    },
  })
}

export async function deleteClient(id: number) {
  const existingClient = await prisma.client.findUnique({
    where: {
      id,
    },
  })

  if (!existingClient) {
    return false
  }

  await prisma.client.delete({
    where: {
      id,
    },
  })

  return true
}