import { DataTypes, conn } from "../db/conn.mjs";

const Diaria = conn.define('diaria', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    valor:{
        type: DataTypes.DECIMAL(8,2),
        required: true
    },
    qnt_dias:{
        type: DataTypes.INTEGER,
        required: true
    }
},{freezeTableName: 'diaria'});

export default Diaria;