'use strict';
import * as model from "../models/indexModels.mjs";
import validarHospede from "../functions/validarHospede.mjs";
import moment from "moment";
import { Op, fn } from "sequelize";

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
        let {cpf, passaporte, acomodacao, valorHospedagem, dataSaida} = req.body;
        /*Validação geral*/
        if(!valorHospedagem || valorHospedagem < 1 || isNaN(valorHospedagem)) {
            req.flash("erros", {error: "Valor incorreto."});
            return res.status(400).redirect("/admin/home");
        };

        if(!dataSaida || !moment(dataSaida)) {
            req.flash("erros", {error: "Previsão para saída incorreta."});
            return res.status(400).redirect("/admin/home");
        };
        
        if(cpf===undefined) cpf="Não possui";
        if(passaporte===undefined) passaporte="Não possui";

        /*Verificação para saber se existem os dados*/
        const hospedeResultado = await model.Hospede.findOne({raw:true, where:{
            [Op.or]: [
                { cpf: cpf },
                { passaport: passaporte }
            ],
        }});
        if(hospedeResultado) {
            const acomodacaoResultado = await model.Acomodacao.findOne({raw:true, where:{id: acomodacao}});
            if(acomodacaoResultado) {
                await model.Hospedagem.create({valor: valorHospedagem,entrada: fn('NOW'),previsao_saida: dataSaida, hospedeId:hospedeResultado.id, acomodacaoId: acomodacaoResultado.id}).then(hospedagem =>{
                    req.flash("mensagem", "Hospedagem criada com sucesso!");
                    res.status(201).redirect("/admin/home");
                }).catch(err => console.log(err));
            } else {
                req.flash("erros", {error: "Acomodação incorreta."});
                return res.status(400).redirect("/admin/home");
            };
        } else {
            req.flash("erros", {error: "CPF ou Passaporte incorreto."});
            return res.status(400).redirect("/admin/home");
        };

     };

    static async cadastrarHospede (req, res) {
        const validacaoHospede = validarHospede(req.body)

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
            ],
          }});

        if(Hospede){
            req.flash("erros", {error: "Hospede já cadastrado"});
            return res.status(400).redirect("/admin/home");
        };

        await model.Hospede.create({nome_completo:validacaoHospede.nome,
            rg:validacaoHospede.rg,
            cpf:validacaoHospede.cpf == "Não possui" ? null : validacaoHospede.cpf,
            passaport:validacaoHospede.passaporte == "Não possui" ? null : validacaoHospede.passaporte,
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
        const {acomodacao, andar, tipo} = req.body

        /*Verificar os dados recebidos*/
        if(!tipo || tipo.length < 1){
            req.flash("erros", {error: "Tipo inválido."});
            return res.status(400).redirect("/admin/home");
        };

        if((!acomodacao || acomodacao.length < 1 || isNaN(acomodacao)) || (!andar || andar.length < 1 || isNaN(andar))) {
            req.flash("erros", {error: "Numero da acomodação ou andar inválido."});
            return res.status(400).redirect("/admin/home");
        };

        await model.Acomodacao.create({tipo: tipo, numero: acomodacao, andar: andar}).then(() =>{
            req.flash("mensagem", "Acomodação criada com sucesso!");
            return res.status(200).redirect("/admin/home");
        });
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
        const { acomodacao,vaga } = req.body;

        const acomodacaoExiste = await model.Acomodacao.findOne({where:{id:acomodacao}});
        if(!acomodacaoExiste) {
            req.flash("erros", {error: "Acomodação inválida."});
            return res.status(400).redirect("/admin/home");
        };

        if(!vaga || vaga === undefined || vaga === null){
            req.flash("erros", {error: "Vaga inválida."});
            return res.status(400).redirect("/admin/home");
        };

        await model.Garagem.create({vaga: vaga, acomodacaoId:acomodacao}).then(()=>{
            req.flash("mensagem", "Garagem vinculada.");
            return res.status(201).redirect("/admin/home");           
        });
    };
};