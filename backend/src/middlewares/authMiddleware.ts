import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface JwtPayload {
  id: string
  tipo: string
}

// Middleware para validar token JWT
export const autenticar = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1] // Bearer <token>

  if (!token) return res.status(401).json({ msg: "Token não fornecido" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "segredo") as JwtPayload
    // Armazenar dados do usuário no req para uso posterior
    req.usuario = decoded
    next()
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido" })
  }
}

// Middleware para autorizar tipos específicos de usuário
export const autorizar = (tiposPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) return res.status(401).json({ msg: "Usuário não autenticado" })
    if (!tiposPermitidos.includes(req.usuario.tipo)) {
      return res.status(403).json({ msg: "Acesso negado" })
    }
    next()
  }
}