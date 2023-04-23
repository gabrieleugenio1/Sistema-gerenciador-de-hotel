'use strict';
//Ativar .env
import dotenv from "dotenv";
dotenv.config();
import "dotenv/config.js";

//Importar express
import express from "express";

 //Ativar configurações
import configExpress from "./configs/express.mjs";

//Conexão com o banco
import {conn} from "./db/conn.mjs";

//Configuração inicial
const app = express();
const port = process.env.PORT || 3000;
configExpress(express, app);

//Porta em execução
conn.sync({ force:false }).then(()=> {
    app.listen(port, console.log(`Servidor executando na porta ${port}`));
});