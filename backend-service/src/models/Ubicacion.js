import { DataTypes } from "sequelize"
import  sequelize  from "../database/database.js"
import { Predio } from "./Predio.js"

export const Ubicacion = sequelize.define('ubicacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom_predio: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    calle: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    codigo_Postal: {
        type: DataTypes.INTEGER,
    },
    comuna: {
        type: DataTypes.STRING(45),
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    region : {
        type: DataTypes.STRING(45),
    }
    
    
    
    
})
 