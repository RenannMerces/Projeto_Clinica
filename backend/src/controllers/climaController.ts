import { Request, Response } from "express";
import axios from "axios";

export const buscarClima = async (req: Request, res: Response) => {
  try {
    const { data } = req.query;

    // ✅ validação da data
    if (!data || typeof data !== "string") {
      return res.status(400).json({ msg: "Data é obrigatória e deve ser válida" });
    }

    const cidade = "Santo Antonio de Jesus,BR";
    const apiKey = process.env.OPENWEATHER_KEY;

    // ✅ valida API KEY
    if (!apiKey) {
      console.error("API KEY não definida no .env");
      return res.status(500).json({ msg: "Erro interno: API key não configurada" });
    }

    console.log("🔎 Buscando clima para:", data);

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: cidade,
          appid: apiKey,
          units: "metric",
          lang: "pt_br"
        }
      }
    );

    // ✅ garante que list existe
    if (!response.data?.list) {
      return res.status(500).json({ msg: "Erro ao processar dados da API" });
    }

    const previsoesDoDia = response.data.list.filter((d: any) =>
      d.dt_txt.startsWith(data)
    );

    if (!previsoesDoDia.length) {
      console.warn("⚠️ Sem previsão para o dia:", data);
      return res.json(null);
    }

    // ✅ pega horário mais próximo de 12h
    const previsao = previsoesDoDia.reduce((prev: any, curr: any) => {
      const horaAtual = new Date(curr.dt_txt).getHours();
      const horaPrev = new Date(prev.dt_txt).getHours();

      return Math.abs(horaAtual - 12) < Math.abs(horaPrev - 12)
        ? curr
        : prev;
    });

    const weather = previsao.weather?.[0];

    if (!weather) {
      return res.status(500).json({ msg: "Erro ao extrair clima" });
    }

    const resultado = {
      descricao: weather.description,
      icon: weather.icon,
      temperatura: Math.round(previsao.main.temp),
      chuva:
        weather.main === "Rain" ||
        weather.main === "Drizzle" ||
        weather.description.toLowerCase().includes("chuva")
    };

    console.log("🌤 Clima encontrado:", resultado);

    return res.json(resultado);

  } catch (error: any) {
    console.error(
      "❌ Erro ao buscar clima:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      msg: "Erro ao buscar clima",
      erro: error.response?.data || error.message
    });
  }
};