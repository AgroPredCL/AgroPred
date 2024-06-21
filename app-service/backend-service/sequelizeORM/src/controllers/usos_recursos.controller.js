import { Uso_Recurso } from "../models/Uso_Recurso.js";

export const getUsos_Recursos = async (req, res) => {
    try {
        const usos_recursos  = await Uso_Recurso.findAll();
        res.json(usos_recursos);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const createUso_Recurso= async (req, res) => {
    try {
        const {fecha,tipo,observacion} = req.body;
        const newUso_recurso= await Uso_Recurso.create({
            fecha,
            tipo,
            observacion
            
        })
        res.json(newUso_recurso);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const deleteUso_Recurso = async (req, res) => {
    try {
        const {id} = req.params;
        const uso_recurso = await Uso_Recurso.findOne({
            where: {
                id
            }
        });
        await uso_recurso.destroy();
        res.json({
            message: 'Uso-recurso deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const updateUso_Recurso = async (req, res) => {
    try {
        const {id} = req.params;
        const {fecha,tipo,observacion} = req.body;
        const uso_recurso = await Uso_Recurso.findOne({
            where: {
                id
            }
        });
        await uso_recurso.update({
            fecha,
            tipo,
            observacion
        });
        res.json({
            message: 'Uso-recurso updated'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}


export const getUso_RecursoById = async (req, res) => {
    try {
        const {id} = req.params;
        const uso_recurso = await Uso_Recurso.findOne({
            where: {
                id
            }
        });
        res.json(uso_recurso);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}