'use strict';
import Conn from "../db/Conn.mjs";
import { DataTypes } from "sequelize";

const Gerente = Conn.define('gerente', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    email:{
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_user:{
        type: DataTypes.INTEGER,
        required: true
    }
},
{
    freezeTableName: 'gerente'
}
);

export default Gerente;