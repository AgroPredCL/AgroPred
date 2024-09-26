import { DATE, DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

export const Contratista = sequelize.define('contratista',{
    rut: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    full_name : {
        type: DataTypes.STRING(60)
    },
    num_telefono: {
        type: DataTypes.INTEGER
    },
    email : {
        type: DataTypes.STRING(320)
    },
    nom_empresa: {
        type: DataTypes.STRING(45)
    },
    descripcion: {
        type: DataTypes.STRING(200)
    },
    cant_empleados : {
        type: DataTypes.INTEGER
    },
    costo  : {
        type: DataTypes.INTEGER
    },
    categoria:{
        type: DataTypes.STRING(30)
    }
})