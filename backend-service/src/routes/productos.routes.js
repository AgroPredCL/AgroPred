import { Router } from "express";
import { getProductos,createProducto,updateProducto,deleteProducto,getProductosById } from "../controllers/productos.controller.js";

const router = Router();

router.get('/productos',getProductos);

router.post('/producto',createProducto);

router.delete('/producto/:id',deleteProducto);

router.put('/producto/:id',updateProducto);

router.get('/producto/:id',getProductosById);

export default router;