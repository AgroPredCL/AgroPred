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
        const {rut,categoria,cant_empleados,costo,descripcion,email,full_name,nom_empresa,num_telefono} = req.body;
        const newContratista= await Contratista.create({
            rut,
            categoria,
            cant_empleados,
            costo,
            descripcion,
            email,
            full_name,
            nom_empresa,
            num_telefono
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
        const {rut } = req.params;
        const updateData = req.body; // Tomamos directamente el body con los campos a actualizar

        const contratista = await Contratista.findOne({ where: { rut } });

        if (!contratista) {
            return res.status(404).json({ message: 'Contratista not found' });
        }

        // Filtrar el objeto para eliminar cualquier campo que tenga un valor indefinido
        const filteredData = Object.fromEntries(
            Object.entries(updateData).filter(([key, value]) => value !== undefined)
        );

        // Si no hay campos válidos para actualizar, enviar error
        if (Object.keys(filteredData).length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        // Actualizar solo los campos proporcionados
        await contratista.update(filteredData);

        res.json({ message: 'Contratista updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};


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