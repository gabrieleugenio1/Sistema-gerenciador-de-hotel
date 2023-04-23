'use strict';
import { DataTypes, conn } from "../db/conn.mjs";
import Hospede from "./Hospede.mjs";
import Acomodacao from "./Acomodacao.mjs";
import Gerente from "./Gerente.mjs";
import Diaria from "./Diaria.mjs";

const Hospedagem = conn.define('hospedagem', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    entrada:{
        type: DataTypes.DATE,
        allowNull: false
    },
    previsao_saida:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    saida:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {freezeTableName: 'hospedagem'});


Acomodacao.hasOne(Hospedagem);
Hospedagem.belongsTo(Acomodacao);

Hospede.hasOne(Hospedagem);
Hospedagem.belongsTo(Hospede);

Gerente.hasOne(Hospedagem);
Hospedagem.belongsTo(Gerente);

Diaria.hasOne(Hospedagem, {foreignKey: 'id_diaria', onDelete: 'RESTRICT'});
Hospedagem.belongsTo(Diaria, {foreignKey: 'id_diaria'});


export default Hospedagem;