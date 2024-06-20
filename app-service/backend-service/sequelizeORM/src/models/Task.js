import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

export const Task = sequelize.define('task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})