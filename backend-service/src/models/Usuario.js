import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import { Rol_Usuario } from "./Rol_Usuario.js";
import { Rol } from "./Rol.js";

export const Usuario = sequelize.define('usuario', {
    full_name: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    rut: {
        type: DataTypes.STRING(15),
        allowNull: false,
        primaryKey: true
    },
    num_telefono: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(320),
        allowNull: false
    },
    estado : {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    nom_predio: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            isIn: [['agronomo', 'jefe de predio']], // Allowed values
        }
    }
    
});

/* 
// Definición de relaciones
Usuario.hasMany(Rol_Usuario, {
    foreignKey: 'rut',
    sourceKey: 'rut'   
});

Rol_Usuario.belongsTo(Usuario, {
    foreignKey: 'rut', 
    targetKey: 'rut'   
});
*/