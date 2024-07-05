import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"
import { Predio } from "./Predio.js"

export const Ubicacion = sequelize.define('ubicacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    region : {
        type: DataTypes.STRING(45),
    },
    comuna: {
        type: DataTypes.STRING(45),
    },
    calle: {
        type: DataTypes.STRING(45),
    },
    numero: {
        type: DataTypes.INTEGER,
    },
    codigoPostal: {
        type: DataTypes.INTEGER,
    },
    nom_predio: {
        type: DataTypes.STRING(45)
    }
})
 