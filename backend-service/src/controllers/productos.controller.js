import { Producto } from "../models/Producto.js";

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
        const {nombre,marca,cantidad,descripcion,costo,vencimiento,categoria} = req.body;
        const newProducto= await Producto.create({
            nombre,
            marca,
            cantidad,
            descripcion,
            costo,
            vencimiento,
            categoria
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
        const {id} = req.params;
        const {nombre,marca,cantidad,descripcion,costo,vencimiento,categoria} = req.body;
        const producto = await Producto.findOne({
            where: {
                id
            }
        });
        await producto.update({
            nombre,
            marca,
            cantidad,
            descripcion,
            costo,
            vencimiento,
            categoria
        });
        res.json({
            message: 'Producto updated'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}


export const getProductosById = async (req, res) => {
    try {
        const {id} = req.params;
        const producto = await Producto.findOne({
            where: {
                id
            }
        });
        res.json(producto);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}