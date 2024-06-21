import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

export const Enfermedad = sequelize.define('enfermedad',{
    nombre : {
        type:DataTypes.STRING(30),
        primaryKey: true
    },
    descripcion : {
        type: DataTypes.STRING(200)
    }
})