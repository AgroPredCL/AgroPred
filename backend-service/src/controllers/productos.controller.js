import { Producto } from "../models/Producto.js";
import moment from 'moment';

export const getProductos = async (req, res) => {
    try {
        const productos  = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const createProducto= async (req, res) => {
    try {
        const {categoria,cantidad,descripcion,estado,nombre,ubicacion} = req.body;
        
        const newProducto= await Producto.create({
            categoria,
            cantidad,
            descripcion,
            estado,
            nombre,
            ubicacion
        })
        res.json(newProducto);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const deleteProducto = async (req, res) => {
    try {
        const {id} = req.params;
        const producto = await Producto.findOne({
            where: {
                id
            }
        });
        await producto.destroy();
        res.json({
            message: 'Producto deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; // Tomamos directamente el body con los campos a actualizar

        const producto = await Producto.findOne({ where: { id } });

        if (!producto) {
            return res.status(404).json({ message: 'Producto not found' });
        }

        // Filtrar el objeto para eliminar cualquier campo que tenga un valor indefinido
        const filteredData = Object.fromEntries(
            Object.entries(updateData).filter(([key, value]) => value !== undefined)
        );

        // Si no hay campos válidos para actualizar, enviar error
        if (Object.keys(filteredData).length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        // Actualizar solo los campos proporcionados
        await producto.update(filteredData);

        res.json({ message: 'Producto updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};



export const getProductosById = async (req, res) => {
    try {
        const {id} = req.params;
        const producto = await Producto.findOne({
            where: {
                id
            }
        });
        if (producto) {
            // Formatear la fecha de vuelta a DD-MM-YYYY para la respuesta
            const formattedProduct = {
                ...producto.toJSON(),
                vencimiento: moment(producto.vencimiento).format('DD-MM-YYYY')
            };

        res.json(formattedProduct);

    } else {
        res.status(404).json({
            message: 'Producto not found'
        });
    }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}