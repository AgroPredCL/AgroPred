import { Recomendacion } from "../models/Recomendacion.js";

export const getRecomendaciones = async (req, res) => {
    try {
        const recomendaciones = await Recomendacion.findAll();
        res.json(rescomendaciones);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}


export const createRecomendacion = async (req, res) => {
    try {
        const {nombre,recomendacion_json,EstadoID} = req.body;
        const newRecomendacion = await Recomendacion.create({
            nombre,
            recomendacion_json,
            EstadoID
        })
        res.json(newRecomendacion);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}


export const deleteRecomendacion = async (req, res) => {
    try {
        const {nombre} = req.params;
        const recomendacion = await Recomendacion.findOne({
            where: {
                nombre
            }
        });
        await recomendacion.destroy();
        res.json({
            message: 'Recomendacion deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}


export const updateRecomendacion = async (req, res) => {
    try {
        const {nombre} = req.params;
        const {recomendacion_json,EstadoID} = req.body;
        const recomendacion = await Recomendacion.findOne({
            where: {
                nombre
            }
        });
        await recomendacion.update({
            recomendacion_json,
            EstadoID
        });
        res.json({
            message: 'Recomendacion updated'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}


export const getRecomendacionByNombre = async (req, res) => {
    try {
        const {nombre} = req.params;
        const recomendacion = await Recomendacion.findOne({
            where: {
                nombre
            }
        });
        res.json(recomendacion);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}