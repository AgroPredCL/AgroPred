import { Cuartel } from "../models/Cuartel.js";

export const getCuarteles =  async (req, res) => {
    try {
    const cuarteles = await Cuartel.findAll();
    res.json(cuarteles);
    } catch (error) {
    res.status(500).json({
        message: 'Something went wrong',
        data: {error}
    });
    }
}


export const createCuartel= async (req, res) => {
    try {
        const {id,area,descripcion,cant_paltos,nom_predio} = req.body;
        const newCuartel = await Cuartel.create({
            id,
            area,
            descripcion,
            cant_paltos,
            nom_predio
        })
        res.json(newCuartel);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error} 
        });
    }
}

export const deleteCuartel = async (req, res) => {
    try {
        const {id} = req.params;
        const cuartel= await Cuartel.findOne({
            where: {
                id
            }
        });
        await cuartel.destroy();
        res.json({
            message: 'Cuartel deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}


export const updateCuartel = async (req, res) => {
    try {
        const {id} = req.params;
        const {area,descripcion,cant_paltos,nom_predio} = req.body;
        const cuartel = await Cuartel.findOne({
            where: {
                id
            }
        });
        await cuartel.update({
            area,
            descripcion,
            cant_paltos,
            nom_predio
        });
        res.json({
            message: 'Cuartel updated'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const getCuartelById = async (req, res) => {
    try {
        const {id} = req.params;
        const cuartel = await Cuartel.findOne({
            where: {
                id
            }
        });
        res.json(cuartel);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}