import { Enfermedad } from "../models/Enfermedad.js";

export const getEnfermedades = async (req, res) => {
    try {
        const enfermedades  = await Enfermedad.findAll();
        res.json(enfermedades);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const createEnfermedad = async (req, res) => {
    try {
        const {nombre,descripcion} = req.body;
        const newEnfermedad = await Enfermedad.create({
            nombre,
            descripcion
            
        })
        res.json(newEnfermedad);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const deleteEnfermedad = async (req, res) => {
    try {
        const {nombre} = req.params;
        const enfermedad = await Enfermedad.findOne({
            where: {
                nombre
            }
        });
        await enfermedad.destroy();
        res.json({
            message: 'Enfermedad deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const updateEnfermedad = async (req, res) => {
    try {
        const {nombre} = req.params;
        const {descripcion} = req.body;
        const enfermedad = await Enfermedad.findOne({
            where: {
                nombre
            }
        });
        await enfermedad.update({
            descripcion
        });
        res.json({
            message: 'Enfermedad updated'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}


export const getEnfermedadByNombre = async (req, res) => {
    try {
        const {nombre} = req.params;
        const enfermedad = await Enfermedad.findOne({
            where: {
                nombre
            }
        });
        res.json(enfermedad);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}