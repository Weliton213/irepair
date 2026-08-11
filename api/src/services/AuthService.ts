import bcrypt from "bcrypt"
import prisma from "../config/prismaClient"
import jwt from "jsonwebtoken"

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    return null
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  })

  

  return user
}

export async function loginUser(
  email: string,
  password: string
) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return null
  }

  const passwordIsValid = await bcrypt.compare(
    password,
    user.passwordHash
  )

  if (!passwordIsValid) {
    return null
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  )

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
  }
}

export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  })

  return user
}