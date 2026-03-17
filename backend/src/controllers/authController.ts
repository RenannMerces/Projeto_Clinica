import { Request, Response } from "express"
import Usuario from "../models/Usuario"
import bcrypt from "bcryptjs"

export const register = async (req:Request,res:Response) => {

  try{

    const {nome,email,senha,tipo,cpf,endereco} = req.body

    const usuarioExiste = await Usuario.findOne({email})

    if(usuarioExiste){
      return res.status(400).json({msg:"Email já cadastrado"})
    }

    const senhaHash = await bcrypt.hash(senha,10)

    const usuario = new Usuario({

      nome,
      email,
      senha:senhaHash,
      tipo,
      cpf,
      endereco

    })

    await usuario.save()

    res.status(201).json({msg:"Usuário criado"})

  }catch(error){

    res.status(500).json({erro:error})

  }

}