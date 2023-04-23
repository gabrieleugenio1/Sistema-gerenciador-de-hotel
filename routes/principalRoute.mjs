'use strict';
//Definindo os principais módulos
import { Router } from 'express';
import PrincipalController from '../controllers/PrincipalController.mjs';
import Autenticacao from '../middleware/autenticacao.mjs';
const router = Router();

router
      .get('/', Autenticacao.verificaToken, PrincipalController.index)
      .get('/logout', Autenticacao.verificaTokenAdmin, PrincipalController.logout)
      .get('/admin/home', Autenticacao.verificaTokenAdmin, PrincipalController.home)
      .post('/cadastroAdmin', Autenticacao.verificaToken, PrincipalController.cadastroAdmin)
      .post('/loginAdmin', Autenticacao.verificaToken, PrincipalController.loginAdmin)
       
export default router;