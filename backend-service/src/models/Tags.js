import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import { ProductoTag } from "./Producto_Tags.js"; // Importar el modelo ProductoTag

export const Tag = sequelize.define('tag', {
    tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tag_nombre: {  // Cambié 'tag' a 'tag_nombre' para que coincida con Producto_Tags.js
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    }
});

// Definición de relación uno a muchos
Tag.hasMany(ProductoTag, {
    foreignKey: 'tag_id',  // Cambié 'tag' a 'tag_nombre' para que coincida con Producto_Tags.js
    sourceKey: 'tag_id' // Cambié 'tag' a 'tag_nombre'
});

// Relación inversa
ProductoTag.belongsTo(Tag, {
    foreignKey: 'tag_id',  // Cambié 'tag' a 'tag_nombre' para que coincida con Producto_Tags.js
    targetKey: 'tag_id' // Cambié 'targetId' a 'targetKey' y 'tag' a 'tag_nombre'
});
