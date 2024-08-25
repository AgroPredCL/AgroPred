import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"
import { Cuartel } from "./Cuartel.js"

export const Uso_Riego = sequelize.define('uso_riego',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE
    },
    tipo: {
        type: DataTypes.STRING(30)
    },
    observacion: {
        type: DataTypes.STRING(400)
    },
    cuartelID: {
        type: DataTypes.STRING(5)
    }

})