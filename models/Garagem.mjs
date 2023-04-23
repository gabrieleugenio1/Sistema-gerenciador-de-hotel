import { DataTypes, conn } from "../db/conn.mjs";
import Acomodacao from "./Acomodacao.mjs"

const Garagem = conn.define('garagem', {
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