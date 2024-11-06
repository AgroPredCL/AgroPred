import { Router } from 'express';
import { getTags, createTag, deleteTag, getTagIdByName, updateTag } from '../controllers/tags.controller.js';

const router = Router();

// Obtener todos los tags
router.get('/tags', getTags);

router.get('/tags/:tag_nombre', getTagIdByName);

router.put('/tags/:tag_id',updateTag);

// Crear un nuevo tag
router.post('/tags', createTag);

// Eliminar un tag
router.delete('/tags/:tag_nombre', deleteTag);

export default router;
