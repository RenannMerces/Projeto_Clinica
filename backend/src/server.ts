import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import { connectDB } from "./config/database"
import dotenv from "dotenv"
import usuarioRoutes from "./routes/usuarioRoutes"
import medicoRoutes from "./routes/medicoRoutes"
import agendamentoRoutes from "./routes/agendamentoRoutes";
import climaRoutes from "./routes/climaRoutes";


const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())

// Rotas
app.use("/usuarios", usuarioRoutes)
app.use("/medicos", medicoRoutes)
app.use("/clima", climaRoutes);
app.use("/auth", authRoutes)
app.use("/agendamentos", agendamentoRoutes);

// conectar banco
connectDB()

// Rotas
app.use("/auth", authRoutes)

// Servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})