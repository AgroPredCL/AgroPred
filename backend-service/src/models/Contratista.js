import { DATE, DataTypes } from "sequelize"
import  sequelize from "../database/database.js"

export const Contratista = sequelize.define('contratista',{
    rut: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    nom_predio : {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    fecha_contrato: {
        type: DataTypes.DATEONLY
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
    email_empresa : {
        type: DataTypes.STRING(320)
    },
    estado : {
        type: DataTypes.BOOLEAN 
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
    },
    num_telefono_empresa: {
        type: DataTypes.INTEGER
    }
    
    
    
    
})