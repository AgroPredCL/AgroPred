import { Rol } from "../models/Rol.js";


export const getRoles =  async (req, res) => {
    try {
    const roles = await Rol.findAll();
    res.json(roles);
    } catch (error) {
    res.status(500).json({
        message: 'Something went wrong',
        data: {}
    });
    }
}

export const createRol= async (req, res) => {
    try {
        const {rol_user} = req.body;
        const newRol = await Rol.create({
            rol_user
        })
        res.json(newRol);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const deleteRol = async (req, res) => {
    try {
        const {rol_user} = req.params;
        const rol = await Rol.findOne({
            where: {
                rol_user
            }
        });
        await rol.destroy();
        res.json({
            message: 'Usuario deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}
