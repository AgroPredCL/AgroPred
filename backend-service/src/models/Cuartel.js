import { DataTypes } from "sequelize"
import  sequelize  from "../database/database.js"
import { Uso_Fertilizante } from "./Uso_Fertilizante.js"
import { Estado } from "./Estado.js"
import { Uso_Riego } from "./Uso_Riego.js"

export const Cuartel = sequelize.define('cuartel',{
    // INFORMACION DEL CUARTEL MISMO
    nombre_Cuartel: {
        type: DataTypes.STRING(20), 
        primaryKey: true,
        allowNull: false
    },
    nom_predio :{ 
        type: DataTypes.STRING(45),
        allowNull: false
    },
    area: {
        type: DataTypes.FLOAT,
        allowNull: false
    }, 
    cant_paltos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    caudal_emisor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    coeficiente_uniformidad: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    eficiencia_riego: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    factor_area_sombreada: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    marco_plantacion: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    numero_emisores_planta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    piedras_perfil_suelo: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    porcentaje_suelo_emisores: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    profundidad_raices:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    retencion_agua_suelo: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    tipo_planta: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    umbral_riego: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
    

})


Cuartel.hasMany(Uso_Fertilizante,{
    foreignKey: 'cuartel_ID',
    sourceKey: 'nombre_Cuartel'
})

Uso_Fertilizante.belongsTo(Cuartel,{
    foreignKey: 'cuartel_ID',
    targetId: 'nombre_Cuartel'
})

//------------------------------------

Cuartel.hasMany(Uso_Riego,{
    foreignKey: 'cuartel_ID',
    sourceKey: 'nombre_Cuartel'
})

Uso_Riego.belongsTo(Cuartel,{
    foreignKey: 'cuartel_ID',
    targetId: 'nombre_Cuartel'
})

//------------------------------------

Cuartel.hasMany(Estado,{
    foreignKey: 'cuartel_ID',
    sourceKey: 'nombre_Cuartel'
})

Estado.belongsTo(Cuartel,{
    foreignKey: 'cuartel_ID',
    targetId: 'nombre_Cuartel'
})

//------------------------------------

