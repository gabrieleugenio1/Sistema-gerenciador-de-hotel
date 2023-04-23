import { DataTypes, conn } from "../db/conn.mjs";
import Hospede from "./Hospede.mjs"

const Endereco = conn.define('enderecos', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    endereco:{
        type: DataTypes.STRING,
        required: true
    },
    numero:{
        type: DataTypes.STRING,
        required: true
    },
    bairro:{
        type: DataTypes.STRING,
        required: true
    },
    cidade:{
        type: DataTypes.STRING,
        required: true
    },
    uf:{
        type: DataTypes.STRING(2),
        required: true
    },
    cep:{
        type: DataTypes.STRING(8),
        required: true
    }
},{freezeTableName: 'enderecos'});

Endereco.belongsTo(Hospede, {foreignKey:{
    name: 'id_cliente'
}});
Hospede.hasMany(Endereco, {foreignKey:{
    name: 'id_cliente'
}});

export default Endereco;
