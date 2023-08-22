'use strict';
import Conn from "../db/Conn.mjs";
import { DataTypes } from "sequelize";
import Gerente from "./Gerente.mjs";

const Hospede = Conn.define('hospedes', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nome_completo:{
        type: DataTypes.STRING,
        required: true
    },
    rg:{
        type: DataTypes.STRING,
        unique: true,
        validate:{
            isNumeric: true, 
        },
    },
    cpf:{
        type: DataTypes.STRING(11),
        unique: true,
        validate:{
            isNumeric: true,
        },
    },
    passaport:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    data_nascimento:{
        type: DataTypes.DATEONLY,
        required: true
    },
    nacionalidade:{
        type: DataTypes.STRING,
        required: true
    },
    sexo:{
        type: DataTypes.STRING(1),
        required: true
    },
    telefone:{
        type: DataTypes.STRING,
        required: true
    }
}, {freezeTableName: 'hospedes'});

Gerente.hasOne(Hospede);
Hospede.belongsTo(Gerente);

export default Hospede;