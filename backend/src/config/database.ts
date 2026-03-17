import mongoose from "mongoose"

export const connectDB = async () => {

  try {

    await mongoose.connect("mongodb://127.0.0.1:27017/clinica")

    console.log("MongoDB conectado")

  } catch (error) {

    console.error("Erro ao conectar MongoDB:", error)
    process.exit(1)

  }

}