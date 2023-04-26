'use strict';
import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken;
const secret = process.env.SECRET_JWT;

export default class Autenticacao {

    static gerarToken(admin){
        const payload = {adminId: admin.id};
        const options = {expiresIn: '12h'};
        return sign(payload, secret, options);
    };

    static verificaTokenAdmin(req, res, next){
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message: "Faça login para acessar o contéudo!"});
        };

        verify(token, secret, (err, decoded) => {
            if(err){
                return res.status(401).redirect("/");
            };
            console.log(decoded);
            req.userId = decoded.userId;
            req.tipoConta = decoded.tipoConta;
            if(req.originalUrl == "/" || req.originalUrl == "/cadastroAdmin" || req.originalUrl == "/loginAdmin") {
                return res.status(200).redirect("/admin/home");
            } else {
                next();
            };
        });
    };
    static verificaToken(req, res, next){
        const token = req.cookies.token;
        
        verify(token, secret, (err, decoded) => {
            if(!err){
                if(req.originalUrl == "/" || req.originalUrl == "/cadastroAdmin" || req.originalUrl == "/loginAdmin") {
                    return res.status(200).redirect("/admin/home");
                };
            };
            
            res.clearCookie('token');
            req.flash("errosToken", {error: "Faça login novamente"});
            return next();
        });
    };
};