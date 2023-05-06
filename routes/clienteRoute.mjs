'use strict';
//Definindo os principais módulos
import { Router } from 'express';
import Autenticacao from '../middleware/autenticacao.mjs';
import ClienteController from '../controllers/ClienteController.mjs';
const router = Router();

router
      .get("/:tipo/:numeroDocumento", Autenticacao.verificaTokenAdmin, ClienteController.buscarCliente)
      .get("/buscarHospedagem:id", Autenticacao.verificaTokenAdmin, ClienteController.buscarHospedagem)
      .post("/cadastrarHospedagem", Autenticacao.verificaTokenAdmin, ClienteController.cadastrarHospedagem)
      .post("/cadastrarAcomodacao", Autenticacao.verificaTokenAdmin, ClienteController.cadastrarAcomodacao)
      .post("/cadastrarHospede", Autenticacao.verificaTokenAdmin, ClienteController.cadastrarHospede)
      .post("/cadastrarDiaria", Autenticacao.verificaTokenAdmin, ClienteController.cadastrarDiaria)
      .post("/cadastrarGaragem", Autenticacao.verificaTokenAdmin, ClienteController.cadastrarGaragem)
      
export default router;