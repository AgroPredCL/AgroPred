import { Usuario } from "../models/Usuario.js";

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
}

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
    try {
        const { rut, email, nom_predio, full_name, num_telefono, password, estado, rol } = req.body;
        const newUsuario = await Usuario.create({
            rut, // Agregar rut como parte de los datos del usuario
            email,
            nom_predio,
            full_name,
            num_telefono,
            password,
            estado,
            rol
        });
        res.json(newUsuario);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
}

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
    try {
        const { rut } = req.params; // Cambiar de email a rut
        const usuario = await Usuario.findOne({
            where: {
                rut // Buscar por rut
            }
        });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario not found' });
        }
        await usuario.destroy();
        res.json({
            message: 'Usuario deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
}

// Actualizar un usuario
export const updateUsuario = async (req, res) => {
    try {
        const { rut } = req.params; // Cambiar de email a rut
        const updateData = req.body;

        const usuario = await Usuario.findOne({ where: { rut } }); // Buscar por rut

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario not found' });
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
        await usuario.update(filteredData);

        res.json({ message: 'Usuario updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};

// Obtener un usuario por rut
export const getUsuarioByRut = async (req, res) => {
    try {
        const { rut } = req.params; // Cambiar de email a rut
        const usuario = await Usuario.findOne({
            where: {
                rut // Buscar por rut
            }
        });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario not found' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
}
