import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

export const Recomendacion = sequelize.define('recomendacion',{
    nombre: {
        type: DataTypes.STRING(30),
        primaryKey: true
    },
    recomendacion_json: {
        type: DataTypes.JSON
    },
}) 