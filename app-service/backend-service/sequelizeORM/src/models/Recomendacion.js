import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"
import { Estado } from "./Estado.js"

export const Recomendacion = sequelize.define('recomendacion',{
    nombre: {
        type: DataTypes.STRING(30),
        primaryKey: true
    },
    recomendacion_json: {
        type: DataTypes.JSON
    },
    EstadoID:{
        type: DataTypes.STRING(5)
    }
}) 