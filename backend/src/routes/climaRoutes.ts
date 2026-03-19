import express from "express";
import { buscarClima } from "../controllers/climaController";

const router = express.Router();

router.get("/", buscarClima);

export default router;