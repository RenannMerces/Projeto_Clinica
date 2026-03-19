import express from "express"
import { cadastrarMedico } from "../controllers/medicoController"
import { autenticar, autorizar } from "../middlewares/authMiddleware"
import { listarMedicos } from "../controllers/medicoController"
import { removerMedico } from "../controllers/medicoController"
import { listarEspecialidades } from "../controllers/medicoController"

const router = express.Router()

// Apenas secretário pode cadastrar médico
router.post(
  "/",
  autenticar,
  autorizar(["secretario"]),
  cadastrarMedico
)

router.get(
  "/",
  autenticar,
  listarMedicos
)

router.get(
  "/especialidades",
  autenticar,
  listarEspecialidades
)

router.delete(
  "/:id",
  autenticar,
  autorizar(["secretario"]),
  removerMedico
)

export default router