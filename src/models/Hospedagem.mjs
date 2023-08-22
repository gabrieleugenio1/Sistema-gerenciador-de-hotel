'use strict';
import Conn from "../db/Conn.mjs";
import { DataTypes } from "sequelize";
import Hospede from "./Hospede.mjs";
import Acomodacao from "./Acomodacao.mjs";
import Gerente from "./Gerente.mjs";

const Hospedagem = Conn.define('hospedagem', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    valor:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    entrada:{
        type: DataTypes.DATE,
        allowNull: false
    },
    previsao_saida:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    diaria:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    saida:{
        type: DataTypes.DATE,
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true,
    },
    placa:{
        type: DataTypes.STRING(14),
    },
}, {freezeTableName: 'hospedagem'});


Acomodacao.hasOne(Hospedagem);
Hospedagem.belongsTo(Acomodacao);

Hospede.hasOne(Hospedagem);
Hospedagem.belongsTo(Hospede);

Gerente.hasOne(Hospedagem);
Hospedagem.belongsTo(Gerente);


export default Hospedagem;