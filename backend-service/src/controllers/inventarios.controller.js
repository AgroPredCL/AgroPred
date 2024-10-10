import { Inventario } from "../models/Inventario.js";

export const getInventarios= async (req, res) => {
    try {
        const inventarios  = await Inventario.findAll();
        res.json(inventarios);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const createInventario= async (req, res) => {
    try {
        const {categoria,nom_predio} = req.body;
        const newInventario= await Inventario.create({
            categoria,
            nom_predio
        })
        res.json(newInventario);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const deleteInventario = async (req, res) => {
    try {
        const {categoria} = req.params;
        const inventario = await Inventario.findOne({
            where: {
                categoria
            }
        });
        await inventario.destroy();
        res.json({
            message: 'Inventario deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const updateInventario = async (req, res) => {
    try {
        const {categoria} = req.params;
        const {nom_predio} = req.body;
        const inventario = await Inventario.findOne({
            where: {
                categoria
            }
        });
        await inventario.update({
            nom_predio
        });
        res.json({
            message: 'Inventario updated'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}


export const getInventarioByCategoria = async (req, res) => {
    try {
        const {categoria} = req.params;
        const inventario = await Inventario.findOne({
            where: {
                categoria
            }
        });
        res.json(inventario);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}
