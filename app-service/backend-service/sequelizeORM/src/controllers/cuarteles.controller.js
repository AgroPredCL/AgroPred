import { Cuartel } from "../models/Cuartel.js";

export const getCuarteles =  async (req, res) => {
    try {
    const cuarteles = await Cuartel.findAll();
    res.json(cuarteles);
    } catch (error) {
    res.status(500).json({
        message: 'Something went wrong',
        data: {}
    });
    }
}


export const createCuartel= async (req, res) => {
    try {
        const {area,descripcion,cant_paltas} = req.body;
        const newCuartel = await Cuartel.create({
            area,
            descripcion,
            cant_paltas
        })
        res.json(newCuartel);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
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
            data: {}
        });
    }
}


export const updateCuartel = async (req, res) => {
    try {
        const {id} = req.params;
        const {area,descripcion,cant_paltas} = req.body;
        const cuartel = await Cuartel.findOne({
            where: {
                id
            }
        });
        await cuartel.update({
            area,
            descripcion,
            cant_paltas
        });
        res.json({
            message: 'Cuartel updated'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
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
            data: {}
        });
    }
}