import { Rol_Usuario } from "../models/Rol_Usuario.js";

export const getRol_Usuarios = async (req, res) => {
    try {
        const rol_usuarios = await Rol_Usuario.findAll();
        res.json(rol_usuarios);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const createRol_Usuario = async (req, res) => {
    try {
        const {email,rol_user} = req.body;
        const newRol_usuario = await Rol_Usuario.create({
            email,
            rol_user
        })
        res.json(newRol_usuario);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const deleteRol_Usuario = async (req, res) => {
    try {
        const {email,rol_user} = req.params;
        const rol_usuario = await Rol_Usuario.findOne({
            where: {
                email,
                rol_user
            }
        });
        await rol_usuario.destroy();
        res.json({
            message: 'Rol_Usuario deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}


//---------------------DUDAS CON ESTA FUCION---------------------------
export const updateRol_Usuario_rol = async (req, res) => {
    try {
        const {email} = req.params;
        const {rol_user} = req.body;
        const rol_usuario = await Rol_Usuario.findOne({
            where: {
                email
            }
        });
        await rol_usuario.update({
            rol_user
        });
        res.json({
            message: 'Rol_Usuario updated'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const getRol_UsuarioByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        const rol_usuario = await Rol_Usuario.findOne({
            where: {
                email
            }
        });
        res.json(rol_usuario);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}