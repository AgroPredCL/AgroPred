import { Router } from "express";

import { getUsos_Riegos,createUso_Riego,deleteUso_Riego,updateUso_Riego,getUso_RiegoById } from "../controllers/usos_riegos.controller.js";


const router = Router();

router.get('/usos_Riegos',getUsos_Riegos);

router.post('/uso_Riego',createUso_Riego);

router.delete('/uso_Riego/:id',deleteUso_Riego);

router.put('/uso_Riego/:id',updateUso_Riego);

router.get('/uso_Riego/:id',getUso_RiegoById);

export default router;