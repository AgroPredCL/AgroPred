import { Router } from "express";

import { getUsos_Recursos,createUso_Recurso,deleteUso_Recurso,updateUso_Recurso,getUso_RecursoById } from "../controllers/usos_recursos.controller.js";


const router = Router();

router.get('/usos_recursos',getUsos_Recursos);

router.post('/uso_recurso',createUso_Recurso);

router.delete('/uso_recurso/:id',deleteUso_Recurso);

router.put('/uso_recurso/:id',updateUso_Recurso);

router.get('/uso_recurso/:id',getUso_RecursoById);

export default router;