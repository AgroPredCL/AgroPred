import { DataTypes } from "sequelize"
import  sequelize  from "../database/database.js"

export const Producto = sequelize.define('producto',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING(25),
        allowNull: false
    },
    descripcion : {
        type: DataTypes.STRING(100)
    },
    cantidad : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING(40)
    },
    estado : {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
            isIn: [['Sin stock', 'En espera de reposición', 'Disponible']], // Allowed values
        }
    },
    categoria : {
        type: DataTypes.STRING(30),
        allowNull: false
    },
}) 