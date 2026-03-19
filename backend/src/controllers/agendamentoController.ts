import { Request, Response } from "express";
import Agendamento from "../models/Agendamento";
import mongoose from "mongoose";

// Criar agendamento
export const criarAgendamento = async (req: Request, res: Response) => {
  try {
    const pacienteId = req.usuario?.id;

    if (!pacienteId) {
      return res.status(401).json({ msg: "Não autenticado" });
    }

    const { medicoId, especialidade, data, horario, nomePaciente, cpfPaciente } = req.body;

    // 🔒 Validação básica
    if (!medicoId || !especialidade || !data || !horario) {
      return res.status(400).json({ msg: "Dados incompletos" });
    }

    // 🔒 Validação de ObjectId
    if (!mongoose.Types.ObjectId.isValid(medicoId)) {
      return res.status(400).json({ msg: "Médico inválido" });
    }

    // 🚫 Não permitir data passada
    const hoje = new Date();
    const dataSelecionada = new Date(data + "T00:00:00");

    if (dataSelecionada < new Date(hoje.toDateString())) {
      return res.status(400).json({ msg: "Não é possível agendar no passado" });
    }

    const agendamento = new Agendamento({
      pacienteId,
      medicoId,
      especialidade,
      data,
      horario,
      nomePaciente,
      cpfPaciente,
      status: "pendente",
    });

    await agendamento.save();

    res.status(201).json({
      msg: "Agendamento realizado",
      agendamento,
    });

  } catch (error: any) {

    // 🔥 erro de duplicidade (index)
    if (error.code === 11000) {
      return res.status(400).json({ msg: "Horário já agendado" });
    }

    console.error(error);
    res.status(500).json({ msg: "Erro ao criar agendamento" });
  }
};

// Listar agendamentos filtrando por médico e data
export const listarAgendamentos = async (req: Request, res: Response) => {
  try {
    const { medico, data } = req.query;

    const filtro: any = {};

    if (medico) filtro.medicoId = medico;
    if (data) filtro.data = data;

    const agendamentos = await Agendamento.find(filtro)
      .populate("pacienteId", "nome cpf")
      .populate("medicoId", "nome especialidade");

    res.status(200).json(agendamentos);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao listar agendamentos" });
  }
};

// Listar agendamentos do paciente logado
export const listarAgendamentosPaciente = async (req: Request, res: Response) => {
  try {
    const pacienteId = req.usuario?.id;

    if (!pacienteId) {
      return res.status(401).json({ msg: "Não autenticado" });
    }

    const agendamentos = await Agendamento.find({ pacienteId })
      .populate("medicoId", "nome especialidade");

    res.status(200).json(agendamentos);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao listar agendamentos" });
  }
};

// Cancelar agendamento
export const cancelarAgendamento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario?.id;
    const tipo = req.usuario?.tipo;

    if (!usuarioId) {
      return res.status(401).json({ msg: "Não autenticado" });
    }

    let filtro: any = { _id: id };

    // 🔒 paciente só cancela o próprio
    if (tipo === "paciente") {
      filtro.pacienteId = usuarioId;
    }

    const agendamento = await Agendamento.findOneAndDelete(filtro);

    if (!agendamento) {
      return res.status(404).json({ msg: "Agendamento não encontrado" });
    }

    res.status(200).json({ msg: "Agendamento cancelado" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao cancelar agendamento" });
  }
};

export const atualizarStatusAgendamento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const statusValidos = ["pendente", "confirmado", "finalizado"];

    if (!statusValidos.includes(status)) {
      return res.status(400).json({ msg: "Status inválido" });
    }

    const agendamento = await Agendamento.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!agendamento) {
      return res.status(404).json({ msg: "Agendamento não encontrado" });
    }

    res.status(200).json({
      msg: "Status atualizado",
      agendamento
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao atualizar status" });
  }
};