'use strict';
//Importações
import * as path from "path";
import routes from "../routes/index.mjs";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import session from "express-session";

function configExpress(express, app) {

  //Configurando express
  app.set("view engine", "ejs");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //Configurando caminhos
  app.set("views", path.join("src",'views'));
  app.use(express.static(path.join("src", "public")));
  
  //Utilização do flash e dos cookies
  app.use(flash());
  app.use(cookieParser());

  //Session para flash messages
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
