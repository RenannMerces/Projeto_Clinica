import { Request } from "express"

declare module "express" {
  interface Request {
    usuario?: {
      id: string
      tipo: string
    }
  }
}