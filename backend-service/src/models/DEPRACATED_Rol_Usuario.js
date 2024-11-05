import { DataTypes } from "sequelize"
import sequelize  from "../database/database.js"


export const Rol_Usuario = sequelize.define('rol_usuario',{
    rut:{
        type: DataTypes.STRING(15),
        primaryKey: true,
        allowNull: false
    },
    rol_user:{
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
    },
})
 
