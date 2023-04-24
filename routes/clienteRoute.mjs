'use strict';
//Definindo os principais módulos
import { Router } from 'express';
import Autenticacao from '../middleware/autenticacao.mjs';
import ClienteController from '../controllers/ClienteController.mjs';
const router = Router();

router
      .post("/cadastrarAcomodacao", Autenticacao.verificaTokenAdmin, ClienteController.cadastrarAcomodacao)
      .post("/cadastrarHospede", Autenticacao.verificaTokenAdmin, ClienteController.cadastrarHospede)
      .post("/cadastrarHospedagem", Autenticacao.verificaTokenAdmin, ClienteController.cadastrarHospedagem)
      .post("/cadastrarDiaria", Autenticacao.verificaTokenAdmin, ClienteController.cadastrarDiaria)
      .post("/cadastrarGaragem", Autenticacao.verificaTokenAdmin, ClienteController.cadastrarGaragem)
export default router;