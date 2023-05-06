'use strict';
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import Admin from "../models/Admin.mjs";
import validarAdmin from "../functions/validarAdmin.mjs";
import Autenticacao from "../middleware/autenticacao.mjs";
import * as model from "../models/indexModels.mjs";
import moment from "moment/moment.js";
import { fn, col, Op } from "sequelize";

export default class PrincipalController {

    static async index (req, res) {
        const qtdAdmin = await Admin.count({});
        return res.status(200).render("index", { title: "HotelHUB", qtdAdmin: qtdAdmin, mensagem: req.flash("mensagem"), erros: req.flash("erros"), erroToken: req.flash("errosToken") });     
    };

    static async cadastroAdmin(req, res) {
        const {email, senha } = req.body;
        const salt = genSaltSync(10);
        const senhaCriptografada = hashSync(senha, salt);
        const validacao = validarAdmin(req.body);       
        if(validacao) {
            req.flash("mensagem", "Conta criada com sucesso.");
            const qtdAdmin = await Admin.count();
            if(qtdAdmin > 0 ){
                req.flash("erros", {error:"Já existe uma conta.."});
                return res.status(200).redirect("/");
            }
            await Admin.create({email: email, senha: senhaCriptografada}).then(()=>{
            return res.status(201).redirect("/");
        });
        } else {
            req.flash("mensagem", "Email ou senha inválido.");
            return res.status(401).redirect("/");
        };
    };

    static async loginAdmin(req, res) {
        res.clearCookie('token');
        let erros = [];
        const{email, senha} = req.body;
        await Admin.findOne({ where: { email: email} }).then(admin => {
            {
              if (admin != undefined) {
                if (compareSync(senha, admin.senha)) {
                    const token = Autenticacao.gerarToken(admin, "Admin");
                    res.cookie("token", token, {
                      httpOnly: true,
                    });
                    console.log('Você está logado com e-mail e senha\n', token); 
                    return res.status(200).redirect("/admin/home");
                } else {
                    erros.push({ error:"Email ou senha inválido."});
                    req.flash("erros", erros);
                    return res.status(401).redirect("/");
                };
              } else {
                    erros.push({ error:"Email ou senha inválido."});
                    req.flash("erros", erros);
                    return res.status(401).redirect("/");
                };
            };
        });
    };

    static async home (req, res) {
        moment.locale("pt-br"); 
        const garagens = await model.Garagem.findAll({raw:true, include:[model.Acomodacao]});
        const diarias = await model.Diaria.findAll({raw: true});
        const hospedes = await model.Hospede.findAll({raw:true});
        const acomodacoes = await model.Acomodacao.findAll({raw:true});
        const hospedagens =  await model.Hospedagem.findAll({
            raw:true,
            attributes:[
                "id",
                "valor",
                "status",
                [fn('date_format', col('hospedagem.createdAt'), '%d/%m/%Y, %H:%ih'), 'entrada'],
                [fn('date_format', col('previsao_saida'), '%d/%m/%Y'), 'previsao_saida'],
            ],
            include:[model.Acomodacao, {model: model.Hospede, attributes:["nome_completo"]}],
        });
        hospedes.map((hospede) => {
            if(hospede.cpf) {
                const parteA = hospede.cpf.substring(0,3);
                const parteB = hospede.cpf.substring(3,6);
                const parteC = hospede.cpf.substring(6,9);
                const parteD = hospede.cpf.substring(9,11);
                hospede.cpf = parteA + "." + parteB + "." + parteC + "-" + parteD;
            }; 
            hospede.cliente = moment(hospede.createdAt).format('L');
        });
        const acomodacoesTestada = await model.Acomodacao.findAll({raw:true, include:[model.Hospedagem], where:{"$Hospedagem.id$":null}});
        moment.locale("en-ca"); 
        return res.status(200).render("./admin/home", {title: "HotelHUB", diarias: diarias, hospedes:hospedes, hospedagens: hospedagens, acomodacoes: acomodacoes, acomodacoesTestadas: acomodacoesTestada, garagens:garagens, dataHoje:moment().format('L'), mensagem:req.flash("mensagem"), erros: req.flash("erros")});
    };

    static async logout (req, res) {
        res.clearCookie('token');
        req.flash("mensagem", "Desconectado com sucesso!");
        return res.status(200).redirect("/")
    }

};