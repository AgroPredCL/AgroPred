import { Router } from "express";

import { getCuarteles,createCuartel,deleteCuartel,updateCuartel,getCuartelById } from "../controllers/cuarteles.controller.js";


const router = Router();

router.get('/cuarteles',getCuarteles);

router.post('/cuartel',createCuartel);

router.delete('/cuartel/:id',deleteCuartel);

router.put('/cuartel/:id',updateCuartel);

router.get('/cuartel/:id',getCuartelById);

export default router;