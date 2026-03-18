import { Request, Response } from "express"
import Usuario from "../models/Usuario"

export const listarPacientes = async (req: Request, res: Response) => {
  try {

    // 🔥 Buscar apenas pacientes
    const pacientes = await Usuario.find({ tipo: "paciente" })
      .select("-senha") // 🔒 nunca retornar senha
      .sort({ createdAt: -1 }) // opcional: mais recentes primeiro

    // 🔥 Se não houver pacientes
    if (!pacientes.length) {
      return res.status(200).json([])
    }

    res.status(200).json(pacientes)

  } catch (error) {
    console.error("Erro ao listar pacientes:", error)
    res.status(500).json({ msg: "Erro ao buscar pacientes" })
  }
}

export const deletarPaciente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const paciente = await Usuario.findById(id)

    if (!paciente) {
      return res.status(404).json({ msg: "Paciente não encontrado" })
    }

    await paciente.deleteOne()

    res.status(200).json({ msg: "Paciente excluído com sucesso" })

  } catch (error) {
    console.error("Erro ao deletar paciente:", error)
    res.status(500).json({ msg: "Erro ao excluir paciente" })
  }
}