import { DataTypes } from "sequelize"
import  sequelize  from "../database/database.js"
import { Cuartel } from "./Cuartel.js"

export const Uso_Riego = sequelize.define('uso_riego', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cuartel_ID: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME, 
        allowNull: false
    },
    
    litros_estimados: {
        type: DataTypes.FLOAT
    },
    observacion: {
        type: DataTypes.STRING(400)
    },
    tiempo_riego: {
        type: DataTypes.FLOAT
    },
    tipo_riego: {
        type: DataTypes.STRING(50),
        allowNull: false
    }

});