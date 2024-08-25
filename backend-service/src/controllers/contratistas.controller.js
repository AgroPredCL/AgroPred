import { Contratista } from "../models/Contratista.js";

export const getContratistas = async (req, res) => {
    try {
        const contratistas  = await Contratista.findAll();
        res.json(contratistas);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const createContratista= async (req, res) => {
    try {
        const {rut,full_name,num_telefono,email,nom_empresa,descripcion,cant_empleados,costo,categoria} = req.body;
        const newContratista= await Contratista.create({
            rut,
            full_name,
            num_telefono,
            email,
            nom_empresa,
            descripcion,
            cant_empleados,
            costo,
            categoria
        })
        res.json(newContratista);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const deleteContratista = async (req, res) => {
    try {
        const {rut} = req.params;
        const contratista = await Contratista.findOne({
            where: {
                rut
            }
        });
        await contratista.destroy();
        res.json({
            message: 'Contratista deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}


export const updateContratista = async (req, res) => {
    try {
        const {rut} = req.params;
        const {full_name,num_telefono,email,nom_empresa,descripcion,cant_empleados,costo,categoria} = req.body;
        const contratista = await Contratista.findOne({
            where: {
                rut
            }
        });
        await contratista.update({
            full_name,
            num_telefono,
            email, 
            nom_empresa,
            descripcion,
            cant_empleados,
            costo,
            categoria
        });
        res.json({
            message: 'Contratista updated'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const getContratistaByRut = async (req, res) => {
    try {
        const {rut} = req.params;
        const contratista = await Contratista.findOne({
            where: {
                rut
            }
        });
        res.json(contratista);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}