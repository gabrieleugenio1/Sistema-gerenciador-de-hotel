import { DataTypes, conn } from "../db/conn.mjs";

const Acomodacao = conn.define('acomodacao', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    tipo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    numero:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    andar:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {freezeTableName: 'acomodacao'});

export default Acomodacao;