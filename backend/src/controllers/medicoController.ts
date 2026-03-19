import { Request, Response } from "express"
import Medico from "../models/Medico"

export const cadastrarMedico = async (req: Request, res: Response) => {
  try {

    const medico = new Medico(req.body)

    await medico.save()

    res.status(201).json({
      msg: "Médico cadastrado com sucesso",
      medico
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Erro ao cadastrar médico" })
  }
}

export const listarMedicos = async (req: Request, res: Response) => {
  try {

    const medicos = await Medico.find()

    res.status(200).json(medicos)

  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Erro ao buscar médicos" })
  }
}

export const removerMedico = async (req: Request, res: Response) => {
  try {

    const { id } = req.params

    const medico = await Medico.findByIdAndDelete(id)

    if (!medico) {
      return res.status(404).json({ msg: "Médico não encontrado" })
    }

    res.status(200).json({ msg: "Médico removido com sucesso" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Erro ao remover médico" })
  }
}

export const listarEspecialidades = async (req: Request, res: Response) => {
  try {
    const especialidades = await Medico.distinct("especialidade");
    res.status(200).json(especialidades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao buscar especialidades" });
  }
};