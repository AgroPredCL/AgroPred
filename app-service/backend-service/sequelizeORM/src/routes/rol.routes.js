import { Router } from "express";
import { getRoles,createRol,deleteRol } from "../controllers/roles.controller.js";


const router = Router()

router.get('/roles',getRoles);

router.post('/rol',createRol);

router.delete('/rol/:rol_user',deleteRol);

export default router;