import express from "express";
import {
  criarAgendamento,
  listarAgendamentos,
  listarAgendamentosPaciente,
  cancelarAgendamento,
  atualizarStatusAgendamento
} from "../controllers/agendamentoController";

import { autenticar, autorizar } from "../middlewares/authMiddleware";

const router = express.Router();

// 🔒 Apenas pacientes logados podem criar agendamento
router.post("/", autenticar, criarAgendamento);

// Listar todos agendamentos
router.get("/", autenticar, listarAgendamentos);

// Listar do paciente logado
router.get("/meus", autenticar, listarAgendamentosPaciente);

// Cancelar
router.delete("/:id", autenticar, cancelarAgendamento);

// 🔥 Atualizar status (secretário)
router.put(
  "/:id",
  autenticar,
  autorizar(["secretario"]),
  atualizarStatusAgendamento
);

export default router;