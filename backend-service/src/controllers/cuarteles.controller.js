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
        const {id,area,marco_plantacion,cant_paltos,tipo_planta,tipo_suelo,sistema_riego,caudal_sist_riego,cant_emis_riego_planta,nom_predio} = req.body;
        const newCuartel = await Cuartel.create({
            id,
            area,
            marco_plantacion,
            cant_paltos,
            tipo_planta,
            tipo_suelo,
            sistema_riego,
            caudal_sist_riego,
            cant_emis_riego_planta,
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
        const { id } = req.params;
        const {
            area,
            marco_plantacion,
            cant_paltos,
            tipo_planta,
            tipo_suelo,
            sistema_riego,
            caudal_sist_riego,
            cant_emis_riego_planta,
            nom_predio
        } = req.body;

        // Buscar el cuartel por ID
        const cuartel = await Cuartel.findOne({
            where: { id }
        });

        if (!cuartel) {
            return res.status(404).json({ message: 'Cuartel not found' });
        }

        // Crear un objeto con los atributos actualizables
        const updateData = {};

        if (area !== undefined) updateData.area = area;
        if (marco_plantacion !== undefined) updateData.marco_plantacion = marco_plantacion;
        if (cant_paltos !== undefined) updateData.cant_paltos = cant_paltos;
        if (tipo_planta !== undefined) updateData.tipo_planta = tipo_planta;
        if (tipo_suelo !== undefined) updateData.tipo_suelo = tipo_suelo;
        if (sistema_riego !== undefined) updateData.sistema_riego = sistema_riego;
        if (caudal_sist_riego !== undefined) updateData.caudal_sist_riego = caudal_sist_riego;
        if (cant_emis_riego_planta !== undefined) updateData.cant_emis_riego_planta = cant_emis_riego_planta;
        if (nom_predio !== undefined) updateData.nom_predio = nom_predio;

        // Actualizar solo los campos proporcionados
        await cuartel.update(updateData);

        res.json({ message: 'Cuartel updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};

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