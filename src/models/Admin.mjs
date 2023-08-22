'use strict';
import Conn from "../db/Conn.mjs";
import { DataTypes } from "sequelize";

const Admin = Conn.define("admin", {
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

export default Admin;