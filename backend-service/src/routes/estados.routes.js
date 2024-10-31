import { Router } from "express";
import { getEstados,createEstado,deleteEstado,updateEstado, getEstadoById } from "../controllers/estados.controller.js";


const router = Router()

router.get('/estados',getEstados);

router.post('/estado',createEstado);

router.delete('/estado/:id/:cuartel_ID',deleteEstado);

router.put('/estado/:id/:cuartel_ID',updateEstado);

router.get('/estado/:id/:cuartel_ID',getEstadoById);


export default router;