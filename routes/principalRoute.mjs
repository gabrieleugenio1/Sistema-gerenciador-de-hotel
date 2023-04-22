'use strict';
//Definindo os principais módulos
import { Router } from 'express';
import PrincipalController from '../controllers/PrincipalController.mjs';
const router = Router();

router
      .get('/', PrincipalController.index)
      .get('/admin/home', PrincipalController.home)
      .post('/cadastroAdmin', PrincipalController.cadastroAdmin)
      .post('/loginAdmin', PrincipalController.loginAdmin)
       
export default router;