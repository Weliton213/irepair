import type { Request, Response } from "express"
import { 
    registerUser,
    loginUser,
    getUserById,
 } from "../services/AuthService"


export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Nome, email e senha são obrigatórios.",
    })
  }

  const user = await registerUser(name, email, password)

  if (!user) {
    return res.status(409).json({
      message: "Já existe um usuário com esse email.",
    })
  }

  return res.status(201).json(user)
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: "Email e senha são obrigatórios.",
    })
  }

  const result = await loginUser(email, password)

  if (!result) {
    return res.status(401).json({
      message: "Email ou senha inválidos.",
    })
  }

  res.cookie("token", result.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 1000,
  })

  return res.status(200).json(result.user)
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  })

  return res.status(200).json({
    message: "Logout realizado com sucesso.",
  })
}

export async function me(req: Request, res: Response) {
  const userId = res.locals.userId

  const user = await getUserById(userId)

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado.",
    })
  }

  return res.status(200).json(user)
}