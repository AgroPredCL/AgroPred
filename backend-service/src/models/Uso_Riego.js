import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"
import { Cuartel } from "./Cuartel.js"

export const Uso_Riego = sequelize.define('uso_riego',{
    fecha: {
        type: DataTypes.DATE,
        primaryKey: true,
    },
    cuartelID: {
        type: DataTypes.STRING(15)
    },
    tiempo_riego:{
        type: DataTypes.FLOAT
    },
    litros_estimados:{
        type: DataTypes.FLOAT
    },
    observacion: {
        type: DataTypes.STRING(400)
    }
})