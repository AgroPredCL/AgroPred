import { Router } from "express";
import { getRecomendaciones,createRecomendacion,deleteRecomendacion,updateRecomendacion,getRecomendacionByNombre } from "../controllers/recomendaciones.controller.js";

const router = Router()

router.get('/recomendaciones',getRecomendaciones);

router.post('/recomendacion',createRecomendacion);

router.put('/recomendacion/:nombre',updateRecomendacion);

router.delete('/recomendacion/:nombre',deleteRecomendacion);

router.get('/recomendacion/:nombre',getRecomendacionByNombre);

export default router;