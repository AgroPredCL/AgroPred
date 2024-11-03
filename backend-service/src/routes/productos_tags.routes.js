import { Router } from 'express';
import {getProductoTags, createProductoTag, deleteProductoTag, getTagsOfProducts, getProductsWithTag } from '../controllers/producto_tags.controller.js';

const router = Router();

// Obtener todas las relaciones entre productos y tags
router.get('/producto-tags', getProductoTags);

// Crear una nueva relación entre un producto y un tag
router.post('/producto-tags', createProductoTag);

// Obtener las tags de un producto
router.get('/producto-tags/:producto_ID', getTagsOfProducts);

// Obtener los productos con un tag
router.get('/producto-tags/tags/:tag_nombre', getProductsWithTag);

// Eliminar una relación entre un producto y un tag
router.delete('/producto-tags', deleteProductoTag);

export default router;
