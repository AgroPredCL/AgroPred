import { DATE, DataTypes } from "sequelize"
import  sequelize from "../database/database.js"

export const Contratista = sequelize.define('contratista',{
    rut: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    categoria:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    cant_empleados : {
        type: DataTypes.INTEGER
    },
    costo  : {
        type: DataTypes.INTEGER
    },
    descripcion: {
        type: DataTypes.STRING(200)
    },
    email : {
        type: DataTypes.STRING(320),
        allowNull: false
    },
    full_name : {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    nom_empresa: {
        type: DataTypes.STRING(45)
    },
    num_telefono: {
        type: DataTypes.INTEGER
    }
    
    
    
    
})