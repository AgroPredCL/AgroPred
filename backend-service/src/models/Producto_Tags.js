import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const ProductoTag = sequelize.define('producto_tag',{
    producto_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
})