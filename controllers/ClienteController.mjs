'use strict';
import * as model from "../models/indexModels.mjs";
import validarHospede from "../functions/validarHospede.mjs";
import { Op } from "sequelize";

export default class ClientesController {
    
    static async buscarCliente (req, res) {
        const {tipo, numeroDocumento} = req.params;
        let hospede;
        if(tipo == "cpf"){
            hospede = await model.Hospede.findOne({
                raw:true,
                where: {        
                       cpf: numeroDocumento,                 
                },
            });
        } else {
            hospede = await model.Hospede.findOne({
                raw:true,
                where: {
                    passaport: numeroDocumento     
                },
            });
        };
        return res.status(200).json(hospede);
    };

    static async cadastrarHospedagem (req, res) {
        const {cpf, passaporte, acomodacao, valorHospedagem, dataSaida} = req.body;
    };

    static async cadastrarHospede (req, res) {
        const validacaoHospede = validarHospede(req.body)
        console.log(validacaoHospede)
        if(validacaoHospede[0] && ("error" in validacaoHospede[0])) {
            req.flash("erros", validacaoHospede);
            return res.status(400).redirect("/admin/home");
        };
       
         const Hospede = await model.Hospede.findOne({  
            where: {
            [Op.or]: [
              { cpf: validacaoHospede.cpf },
              { rg: validacaoHospede.rg  },
              { passaport: validacaoHospede.passaporte }
            ]
          }});
          console.log(Hospede)
        if(Hospede){
            req.flash("erros", {error: "Hospede já cadastrado"});
            return res.status(400).redirect("/admin/home");
        };

        await model.Hospede.create({nome_completo:validacaoHospede.nome,
            rg:validacaoHospede.rg,
            cpf:validacaoHospede.cpf,
            passaport:validacaoHospede.passaporte,
            data_nascimento: validacaoHospede.dataNascimento,
            nacionalidade: validacaoHospede.nacionalidade,
            sexo: validacaoHospede.sexo,
            telefone: validacaoHospede.telefone}).then(async(usuario) => {
                await model.Enderecos.create({logradouro:validacaoHospede.logradouro,
                    numero:validacaoHospede.numero,
                    bairro:validacaoHospede.cidade,
                    cidade:validacaoHospede.cidade, 
                    uf:validacaoHospede.uf, 
                    cep:validacaoHospede.cep, 
                    id_cliente:usuario.id});
                req.flash("mensagem","Novo hospede criado!");
                res.status(200).redirect("/admin/home");
            }).catch(err => console.log(err)); 
    };


    static async cadastrarAcomodacao (req, res) {
        
    };

    static async cadastrarDiaria (req, res) {
        const {valor, dias} = req.body;
        if(isNaN(valor) || isNaN(dias)) {
            req.flash('erros', {error: 'Valor ou dia incorreto'});
            return res.status(400).redirect('/admin/home');
        };

        await model.Diaria.create({valor: valor, qnt_dias: dias}).then(()=>{
            req.flash('mensagem', 'Criado com sucesso!');
            return res.status(201).redirect('/admin/home');
        });
    };

    static async cadastrarGaragem (req, res) {

    };
    
};