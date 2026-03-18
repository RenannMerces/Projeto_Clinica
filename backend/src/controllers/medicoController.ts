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