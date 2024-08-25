import { Router } from "express";

import { getUsos_Fertilizantes,createUso_Fertilizante,deleteUso_Fertilizante,updateUso_Fertilizante,getUso_FertilizanteById } from "../controllers/usos_fertilizantes.controller.js";


const router = Router();

router.get('/usos_Fertilizantes',getUsos_Fertilizantes);

router.post('/uso_Fertilizante',createUso_Fertilizante);

router.delete('/uso_Fertilizante/:id',deleteUso_Fertilizante);

router.put('/uso_Fertilizante/:id',updateUso_Fertilizante);

router.get('/uso_Fertilizante/:id',getUso_FertilizanteById);

export default router;