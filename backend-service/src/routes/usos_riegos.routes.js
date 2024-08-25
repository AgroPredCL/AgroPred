import { Router } from "express";

import { getUsos_Riegos,createUso_Riego,deleteUso_Riego,updateUso_Riego,getUso_RiegoById } from "../controllers/usos_riegos.controller.js";


const router = Router();

router.get('/usos_riegos',getUsos_Riegos);

router.post('/uso_riego',createUso_Riego);

router.delete('/uso_riego/:id',deleteUso_Riego);

router.put('/uso_riego/:id',updateUso_Riego);

router.get('/uso_riego/:id',getUso_RiegoById);

export default router;