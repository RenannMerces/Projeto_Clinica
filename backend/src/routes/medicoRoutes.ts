import express from "express"
import { cadastrarMedico } from "../controllers/medicoController"
import { autenticar, autorizar } from "../middlewares/authMiddleware"

const router = express.Router()

// 🔒 Apenas secretário pode cadastrar médico
router.post(
  "/",
  autenticar,
  autorizar(["secretario"]),
  cadastrarMedico
)

export default router