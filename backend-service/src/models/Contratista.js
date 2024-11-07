import { DATE, DataTypes } from "sequelize"
import  sequelize from "../database/database.js"

export const Contratista = sequelize.define('contratista',{
    rut: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    // Nombre completo del contratista
    nombre: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    apellido_paterno: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    apellido_materno: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    num_telefono: {
        type: DataTypes.STRING(20)
    },
    email : {
        type: DataTypes.STRING(320),
        allowNull: false
    },
    nom_empresa: {
        type: DataTypes.STRING(45)
    },
    email_empresa : {
        type: DataTypes.STRING(320)
    },
    num_telefono_empresa: {
        type: DataTypes.STRING(20)
    },
    descripcion: {
        type: DataTypes.STRING(200)
    },
    cant_empleados : {
        type: DataTypes.INTEGER
    },
    fecha_contrato: {
        type: DataTypes.DATEONLY
    },
    costo  : {
        type: DataTypes.INTEGER
    },
    nom_predio : {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    estado : {
        type: DataTypes.BOOLEAN 
    },
    
    
    
    
})