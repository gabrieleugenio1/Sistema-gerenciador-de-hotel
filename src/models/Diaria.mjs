'use strict';
import Conn from "../db/Conn.mjs";
import { DataTypes } from "sequelize";

const Diaria = Conn.define('diaria', {
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