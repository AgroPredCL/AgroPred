import { Router } from 'express';
import { getTags, createTag, deleteTag, getTagIdByName } from '../controllers/tags.controller.js';

const router = Router();

// Obtener todos los tags
router.get('/tags', getTags);

router.get('/tags/:tag_nombre', getTagIdByName);

// Crear un nuevo tag
router.post('/tags', createTag);

// Eliminar un tag
router.delete('/tags/:tag_nombre', deleteTag);

export default router;
