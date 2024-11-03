import { Tag } from '../models/Tags.js'; // Asegúrate de importar el modelo Tag

// Obtener todos los tags
export const getTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.json(tags);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong while fetching tags',
            data: { error }
        });
    }
};

export const createTag = async (req, res) => {
    console.log(req.body);
    try {
        const { tag_nombre } = req.body;
        const newTag = await Tag.create({ tag_nombre });
        res.status(201).json(newTag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un tag
export const deleteTag = async (req, res) => {
    try {
        const { tag_nombre } = req.params;
        const tag = await Tag.findOne({ where: { tag_nombre } });

        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        await tag.destroy();
        res.json({ message: 'Tag deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong while deleting the tag',
            data: { error }
        });
    }
};
