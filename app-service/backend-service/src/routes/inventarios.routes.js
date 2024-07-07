import { Router } from "express";
import { getInventarios,createInventario,deleteInventario,updateInventario,getInventarioByCategoria } from "../controllers/inventarios.controller.js";

const router = Router();

router.get('/inventarios',getInventarios);

router.post('/inventario',createInventario);

router.delete('/inventario/:categoria',deleteInventario);

router.put('/inventario/:categoria',updateInventario);

router.get('/inventario/:categoria',getInventarioByCategoria);

export default router;