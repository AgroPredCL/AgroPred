import { ProductoTag } from '../models/Producto_Tags.js';
import { Tag } from '../models/Tags.js';
import { Producto } from '../models/Producto.js';

// Obtener todas las relaciones entre productos y tags
export const getProductoTags = async (req, res) => {
    try {
        const productoTags = await ProductoTag.findAll();
        res.json(productoTags);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Crear una nueva relación entre producto y tag
export const createProductoTag = async (req, res) => {
    try {
        const { producto_ID, tag_id } = req.body;
        const newProductoTag = await ProductoTag.create({ producto_ID, tag_id });
        res.status(201).json(newProductoTag);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const getTagsOfProducts = async (req, res) => {
    const { producto_ID } = req.params;

    try {
        const tags = await ProductoTag.findAll({
            where: { producto_ID },
            include: [{
                model: Tag, // Asegúrate de que has importado el modelo Tag
                as: 'tag', // Asumiendo que tienes un alias para la relación
            }]
        });

        if (!tags.length) {
            return res.status(404).json({ message: "No tags found for this product." });
        }

        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener los productos con un tag
export const getProductsWithTag = async (req, res) => {
    const { tag_nombre } = req.params; // Assume tag_nombre comes from the route params

    try {
        const productos = await ProductoTag.findAll({
            where: { tag_id: (await Tag.findOne({ where: { tag_nombre } })).tag_id }, // Find tag_id first
            include: [{
                model: Producto, // Ensure the Product model is imported correctly
                as: 'producto', // Assuming you have defined an alias for the relationship
            }]
        });

        if (!productos.length) {
            return res.status(404).json({ message: "No products found with this tag." });
        }

        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Eliminar una relación entre producto y tag
// Eliminar una relación entre producto y tag
export const deleteProductoTag = async (req, res) => {
    const { producto_ID, tag_nombre } = req.body; // Obtener producto_ID y tag_nombre del body

    try {
        // Busca la relación en la base de datos
        const productoTag = await ProductoTag.findOne({
            where: {
                producto_ID: producto_ID,  // Uso de producto_ID del body
                tag_nombre: tag_nombre      // Uso de tag_nombre del body
            }
        });

        if (!productoTag) {
            return res.status(404).json({ message: 'Relationship not found' });
        }

        // Elimina la relación
        await productoTag.destroy();
        res.json({ message: 'Relationship deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};
