import { Router } from "express";
import { getInventarios,createInventario,deleteInventario } from "../controllers/inventarios.controller.js";

const router = Router();

router.get('/inventarios',getInventarios);

router.post('/inventario',createInventario);

router.delete('/inventario/:categoria',deleteInventario);

export default router;