'use strict';
//Ativar .env
import dotenv from "dotenv";
dotenv.config();
import "dotenv/config.js";

//Importar express
import express from "express";

 //Ativar configurações
import configExpress from "./src/configs/configs.mjs";

//Conexão com o banco
import Conn from "./src/db/Conn.mjs";

//Configuração inicial
const app = express();
const port = process.env.PORT || 3000;
configExpress(express, app);

//Porta em execução
Conn.sync({ force:false }).then(()=> {
    app.listen(port, console.log(`Servidor executando na porta ${port}`));
});