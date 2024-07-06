import {Predio} from '../models/Predio.js';

export const getPredios = async (req, res) => {
    try {
        const predios = await Predio.findAll();
        res.json(predios);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const createPredio = async (req, res) => {
    try {
        const {nombre, area} = req.body;
        const newPredio = await Predio.create({
            nombre,
            area
        })
        res.json(newPredio);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const deletePredio = async (req, res) => {
    try {
        const {nombre} = req.params;
        const predio = await Predio.findOne({
            where: {
                nombre
            }
        });
        await predio.destroy();
        res.json({
            message: 'Predio deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const updatePredio = async (req, res) => {
    try {
        const {nombre} = req.params;
        const {area} = req.body;
        const predio = await Predio.findOne({
            where: {
                nombre
            }
        });
        await predio.update({
            area
        });
        res.json({
            message: 'Predio updated'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const getPredioById = async (req, res) => {
    try {
        const {nombre} = req.params;
        const predio = await Predio.findOne({
            where: {
                nombre
            }
        });
        res.json(predio);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}