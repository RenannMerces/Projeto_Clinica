import express from "express"
import { registrarUsuario } from "../controllers/authController"
import { loginUsuario } from "../controllers/authController"

const router = express.Router()

// POST /auth/register
router.post("/register", registrarUsuario)
router.post("/login", loginUsuario)

export default router