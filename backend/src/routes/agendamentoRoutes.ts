import express from "express";
import {
  criarAgendamento,
  listarAgendamentos,
  listarAgendamentosPaciente,
  cancelarAgendamento,
} from "../controllers/agendamentoController";
import { autenticar } from "../middlewares/authMiddleware";

const router = express.Router();

// 🔒 Apenas pacientes logados podem criar agendamento
router.post("/", autenticar, criarAgendamento);

// Listar todos agendamentos (pode filtrar por médico e data)
router.get("/", autenticar, listarAgendamentos);

// Listar agendamentos do paciente logado
router.get("/meus", autenticar, listarAgendamentosPaciente);

// Cancelar agendamento
router.delete("/:id", autenticar, cancelarAgendamento);

export default router;