'use strict';
//Conectando com o banco
import {conn}  from '../db/conn.mjs';
import routes from '../routes/index.mjs';
import flash from "connect-flash";
import cookieParser from 'cookie-parser';
import session from "express-session";


function configExpress(express, app) {

  //Configurando express
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(flash());
  app.use(cookieParser());
  conn.authenticate();

  //Session
   app.use(session({
    secret:process.env.SECRET_SESSION,
    resave:false,
    saveUninitialized:true    
  }));

  //Rotas
  routes(app);

  //Página não encontrada: 404
  app.get('*', function(req, res) {
    res.status(404).json({message:'404'});
  });
};

export default configExpress;
