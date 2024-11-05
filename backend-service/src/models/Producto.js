import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import { Tag } from "./Tags.js";
import { ProductoTag } from "./Producto_Tags.js";

export const Producto = sequelize.define('producto', {
    producto_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoria: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    cantidad : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion : {
        type: DataTypes.STRING(100)
    },
    estado : {
        type: DataTypes.STRING(100)
    },
    nombre: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING(40)
    }
});

// Definición de relaciones
Producto.hasMany(ProductoTag, {
    foreignKey: 'producto_ID',
    sourceKey: 'producto_ID'   
});

ProductoTag.belongsTo(Producto, {
    foreignKey: 'producto_ID', 
    targetKey: 'producto_ID'   
});
