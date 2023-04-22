'use strict';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import Admin from "../models/Admin.mjs";
import validarAdmin from "../functions/validarAdmin.mjs";

export default class PrincipalController {

    static async index (req, res) {
        const qtdAdmin = await Admin.count({});
        return res.status(200).render("index", { title: "HotelHUB", qtdAdmin: qtdAdmin, mensagem: req.flash("mensagem"), erros: req.flash("erros") });     
    };

    static async cadastroAdmin(req, res) {
        const {email, senha } = req.body;
        const salt = genSaltSync(10);
        const senhaCriptografada = hashSync(senha, salt);
        const validacao = validarAdmin(req.body);
        console.log(validacao, '\n' + email, senha + "\n"+ senhaCriptografada)
        if(validacao) {
            req.flash("mensagem", "Conta criada com sucesso.")
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
/*                     const token = Autenticacao.gerarToken(admin, "Admin");
                    res.cookie("token", token, {
                      httpOnly: true,
                    });
                    console.log('Você está logado com e-mail e senha\n', token); */
                    return res.status(200).redirect("/admin/home");
                } else {
                    erros.push({ error:"Email ou senha invalidos."});
                    req.flash("erros", erros);
                    return res.status(401).redirect("/");
                };
              } else {
                    erros.push({ error:"Email ou senha invalidos."});
                    req.flash("erros", erros);
                    return res.status(401).redirect("/");
                };
            };
        });
    };

    static async home (req, res) {
        return res.status(200).render("./admin/home", {title: "HotelHUB"});
    };


};