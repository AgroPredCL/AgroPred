import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"


export const Rol_Usuario = sequelize.define('rol_usuario',{
    email:{
        type: DataTypes.STRING(320),
        primaryKey: true
    },
    rol_user:{
        type: DataTypes.STRING(20),
        primaryKey: true
    },
})
 
