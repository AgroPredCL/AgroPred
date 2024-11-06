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

// Obtener id de un tag por su nombre
export const getTagIdByName = async (req, res) => {
    const { tag_nombre } = req.params; // Get the tag name from the route parameters

    try {
        // Query the tag by its name
        const tag = await Tag.findOne({ where: { tag_nombre } });
        
        if (!tag) {
            return res.status(404).json({ message: "Tag not found." }); // Handle case where tag does not exist
        }
        
        res.status(200).json(tag); // Return the found tag
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while fetching the tag", data: { error: error.message } });
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

// Modificar tag a partir de su id
export const updateTag = async (req, res) => {
    try {
        const { tag_id } = req.params;
        const updateData = req.body;

        // Find the tag by its ID
        const tag = await Tag.findOne({ where: { tag_id } });

        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        // Filter out any fields with undefined values
        const filteredData = Object.fromEntries(
            Object.entries(updateData).filter(([key, value]) => value !== undefined)
        );

        // If there are no valid fields to update, return an error
        if (Object.keys(filteredData).length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        // Update only the provided fields
        await tag.update(filteredData);

        res.json({ message: 'Tag updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
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
