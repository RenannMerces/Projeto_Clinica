import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import { connectDB } from "./config/database"
import dotenv from "dotenv"

const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())

// conectar banco
connectDB()

// Rotas
app.use("/auth", authRoutes)

// Servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})