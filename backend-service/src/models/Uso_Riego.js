import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"
import { Cuartel } from "./Cuartel.js"

export const Uso_Riego = sequelize.define('uso_riego', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.DATEONLY, 
    },
    hora: {
        type: DataTypes.TIME, 
    },
    cuartelID: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    tiempo_riego: {
        type: DataTypes.FLOAT
    },
    tipo_riego: {
        type: DataTypes.STRING(50)
    },
    litros_estimados: {
        type: DataTypes.FLOAT
    },
    observacion: {
        type: DataTypes.STRING(400)
    }
});