import { Router } from "express";

import { getUsos_Fertilizantes,createUso_Fertilizante,deleteUso_Fertilizante,updateUso_Fertilizante,getUso_FertilizanteById } from "../controllers/usos_fertilizantes.controller.js";


const router = Router();

router.get('/usos_fertilizantes',getUsos_Fertilizantes);

router.post('/uso_fertilizante',createUso_Fertilizante);

router.delete('/uso_fertilizante/:id',deleteUso_Fertilizante);

router.put('/uso_fertilizante/:id',updateUso_Fertilizante);

router.get('/uso_fertilizante/:id',getUso_FertilizanteById);

export default router;