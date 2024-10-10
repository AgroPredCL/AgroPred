import { Router } from "express";
import {poblar_BaseDatos} from '../controllers/poblamiento.controller.js';


const router = Router();

router.post('/populate', poblar_BaseDatos);

export default router;