'use strict';
import { DataTypes, conn } from "../db/conn.mjs";
import Gerente from "./Gerente.mjs";

const Hospede = conn.define('hospedes', {
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
            min:8,
            max:8,   
        },
    },
    cpf:{
        type: DataTypes.STRING(11),
        unique: true,
        validate:{
            isNumeric: true,
            min:11,
            max:11
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