import { Uso_Fertilizante } from "../models/Uso_Fertilizante.js";
import moment from 'moment';


export const getUsos_Fertilizantes = async (req, res) => {
    try {
        const usos_fertilizantes  = await Uso_Fertilizante.findAll();
        // Formatear las fechas al formato DD-MM-YYYY
        const formattedUso = usos_fertilizantes.map(uso_fertilizante => {
            return {
                ...uso_fertilizante.toJSON(),
                fecha: moment(uso_fertilizante.fecha).format('DD-MM-YYYY')
            };
        });

        res.json(formattedUso);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const createUso_Fertilizante= async (req, res) => {
    try {
        const {cuartel_ID,fecha,hora,observacion,tipo} = req.body;

        const formattedFecha = moment(fecha, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const newUso_Fertilizante= await Uso_Fertilizante.create({
            cuartel_ID,
            fecha : formattedFecha ,
            hora,
            observacion,
            tipo
            
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
        const uso_fertilizante = await Uso_Fertilizante.findOne({
            where: {
                id
            }
        });
        await uso_fertilizante.destroy();
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
        const { id } = req.params;
        const updateData = req.body; // Tomamos directamente el body con los campos a actualizar

        const uso_Fertilizante = await Uso_Fertilizante.findOne({ where: { id } });

        if (!uso_Fertilizante) {
            return res.status(404).json({ message: 'Uso_Fertilizante not found' });
        }

        // Filtrar el objeto para eliminar cualquier campo que tenga un valor indefinido
        const filteredData = Object.fromEntries(
            Object.entries(updateData).filter(([key, value]) => value !== undefined)
        );

        if (filteredData.fecha) {
            filteredData.fecha = moment(filteredData.fecha, 'DD-MM-YYYY').format('YYYY-MM-DD');
        }

        // Si no hay campos válidos para actualizar, enviar error
        if (Object.keys(filteredData).length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        // Actualizar solo los campos proporcionados
        await uso_Fertilizante.update(filteredData);

        res.json({ message: 'Uso_Fertilizante updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};


export const getUso_FertilizanteById = async (req, res) => {
    try {
        const {id} = req.params;
        const uso_fertilizante = await Uso_Fertilizante.findOne({
            where: {
                id
            }
        });

        if (Uso_Fertilizante) {
            // Formatear la fecha de vuelta a DD-MM-YYYY para la respuesta
            const formattedUso = {
                ...uso_fertilizante.toJSON(),
                fecha: moment(uso_fertilizante.fecha).format('DD-MM-YYYY')
            };
        
        res.json(formattedUso);
    } else {
        res.status(404).json({
            message: 'uso fertilizante not found'
        });
    }
    } catch (error) {
        res.status(500).json({ 
            message: 'Something went wrong',
            data: {error}
        });
    }
}