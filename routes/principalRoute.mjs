'use strict';
//Definindo os principais módulos
import { Router } from 'express';
import PrincipalController from '../controllers/PrincipalController.mjs';
import Autenticacao from '../middleware/autenticacao.mjs';
const router = Router();

router
      .get('/', Autenticacao.verificaTokenAdmin, PrincipalController.index)
      .get('/admin/home',Autenticacao.verificaTokenAdmin ,PrincipalController.home)
      .post('/cadastroAdmin', Autenticacao.verificaTokenAdmin, PrincipalController.cadastroAdmin)
      .post('/loginAdmin', Autenticacao.verificaTokenAdmin, PrincipalController.loginAdmin)
       
export default router;