import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

interface JwtPayload {
  userId: number
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({
      message: "Não autenticado.",
    })
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload

    res.locals.userId = decoded.userId

    next()
  } catch {
    return res.status(401).json({
      message: "Token inválido ou expirado.",
    })
  }
}