import * as jwt from "jsonwebtoken"
import { Request, Response } from "express"
import Usuario from "../models/Usuario"

export const registrarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, tipo, cpf, endereco } = req.body

    // Verificar se já existe usuário com esse email
    const usuarioExistente = await Usuario.findOne({ email })
    if (usuarioExistente) {
      return res.status(400).json({ msg: "Email já cadastrado" })
    }

    const usuario = new Usuario({
      nome,
      email,
      senha,
      tipo,
      cpf,
      endereco
    })

    await usuario.save()

    res.status(201).json({
      msg: "Paciente cadastrado com sucesso",
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo
      }
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Erro ao cadastrar usuário" })
  }
}

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body

    // 1️⃣ Validar campos
    if (!email || !senha) {
      return res.status(400).json({ msg: "Email e senha são obrigatórios" })
    }

    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
      return res.status(401).json({ msg: "Email ou senha inválidos" })
    }

    // 2️⃣ Verificar senha
    const senhaValida = await usuario.compararSenha(senha)
    if (!senhaValida) {
      return res.status(401).json({ msg: "Email ou senha inválidos" })
    }

    // 3️⃣ Gerar JWT
    const token = jwt.sign(
      { id: usuario._id, tipo: usuario.tipo },
      process.env.JWT_SECRET || "segredo",
      { expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] || "1d" }
    )

    // 4️⃣ Retornar dados do usuário + token
    res.status(200).json({
      msg: "Login realizado com sucesso",
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo
      }
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Erro ao fazer login" })
  }
}