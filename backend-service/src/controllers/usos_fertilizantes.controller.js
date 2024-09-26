import { Uso_Fertilizante } from "../models/Uso_Fertilizante.js";

export const getUsos_Fertilizantes = async (req, res) => {
    try {
        const usos_fertilizantes  = await Uso_Fertilizante.findAll();
        res.json(usos_fertilizantes);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const createUso_Fertilizante= async (req, res) => {
    try {
        const {fecha,tipo,observacion,cuartelID} = req.body;
        const newUso_Fertilizante= await Uso_Fertilizante.create({
            fecha,
            tipo,
            observacion,
            cuartelID
            
        })
        res.json(newUso_Fertilizante);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const deleteUso_Fertilizante = async (req, res) => {
    try {
        const {id} = req.params;
        const Uso_Fertilizante = await Uso_Fertilizante.findOne({
            where: {
                id
            }
        });
        await Uso_Fertilizante.destroy();
        res.json({
            message: 'Uso-fertilizante deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const updateUso_Fertilizante = async (req, res) => {
    try {
        const {id} = req.params;
        const {fecha,tipo,observacion,cuartelID} = req.body;
        const Uso_Fertilizante = await Uso_Fertilizante.findOne({
            where: {
                id
            }
        });
        await Uso_Fertilizante.update({
            fecha,
            tipo,
            observacion,
            cuartelID
        });
        res.json({
            message: 'Uso-fertilizante updated'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}


export const getUso_FertilizanteById = async (req, res) => {
    try {
        const {id} = req.params;
        const Uso_Fertilizante = await Uso_Fertilizante.findOne({
            where: {
                id
            }
        });
        res.json(Uso_Fertilizante);
    } catch (error) {
        res.status(500).json({ 
            message: 'Something went wrong',
            data: {error}
        });
    }
}