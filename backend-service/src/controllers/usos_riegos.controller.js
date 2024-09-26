import { Uso_Riego } from "../models/Uso_Riego.js";

export const getUsos_Riegos = async (req, res) => {
    try {
        const Uso_Riegos  = await Uso_Riego.findAll();
        res.json(Uso_Riegos);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const createUso_Riego= async (req, res) => {
    try {
        const {fecha,tipo,observacion,cuartelID} = req.body;
        const newUso_Riego= await Uso_Riego.create({
            fecha,
            tipo,
            observacion,
            cuartelID
            
        })
        res.json(newUso_Riego);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const deleteUso_Riego = async (req, res) => {
    try {
        const {id} = req.params;
        const Uso_Riego = await Uso_Riego.findOne({
            where: {
                id
            }
        });
        await Uso_Riego.destroy();
        res.json({
            message: 'Uso-riego deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const updateUso_Riego = async (req, res) => {
    try {
        const {id} = req.params;
        const {fecha,tipo,observacion,cuartelID} = req.body;
        const Uso_Riego = await Uso_Riego.findOne({
            where: {
                id
            }
        });
        await Uso_Riego.update({
            fecha,
            tipo,
            observacion,
            cuartelID
        });
        res.json({
            message: 'Uso-riego updated'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}


export const getUso_RiegoById = async (req, res) => {
    try {
        const {id} = req.params;
        const Uso_Riego = await Uso_Riego.findOne({
            where: {
                id
            }
        });
        res.json(Uso_Riego);
    } catch (error) {
        res.status(500).json({ 
            message: 'Something went wrong',
            data: {error}
        });
    }
}