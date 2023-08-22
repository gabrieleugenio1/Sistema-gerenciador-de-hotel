'use strict';
import Conn from "../db/Conn.mjs";
import { DataTypes } from "sequelize";
import Acomodacao from "./Acomodacao.mjs"

const Garagem = Conn.define('garagem', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    vaga:{
        type: DataTypes.STRING,
        required: true
    }
}, {freezeTableName: 'garagem'});

Acomodacao.hasOne(Garagem, {onDelete: 'RESTRICT'});
Garagem.belongsTo(Acomodacao);

export default Garagem;