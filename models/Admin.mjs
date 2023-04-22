import { DataTypes, conn } from '../db/conn.mjs';

const Admin = conn.define("admin", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email:{
        type:DataTypes.STRING(100),
        allowNull:false,
        validate:{
            isEmail: true,
        },
    },
    senha:{
        type:DataTypes.STRING,
        allowNull:false
    },
}, { updatedAt: false });

Admin.sync({ force: false });

export default Admin;