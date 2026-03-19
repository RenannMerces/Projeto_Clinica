import express from "express"
import { listarPacientes } from "../controllers/usuarioController"
import { autenticar, autorizar } from "../middlewares/authMiddleware"
import { deletarPaciente } from "../controllers/usuarioController"

const router = express.Router()

// Apenas secretário pode acessar
router.get(
  "/pacientes",
  autenticar,
  autorizar(["secretario"]),
  listarPacientes
)

router.delete(
  "/pacientes/:id",
  autenticar,
  autorizar(["secretario"]),
  deletarPaciente
)

export default router