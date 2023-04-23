'use strict';
//Definindo os principais módulos
import { Router } from 'express';
import Autenticacao from '../middleware/autenticacao.mjs';
import ClienteController from '../controllers/ClienteController.mjs';
const router = Router();

router
      .get('/teste', ClienteController.acomodancao)
       
export default router;