'use strict';
export default (admin) => {
   let email = admin.email;
   let senha = admin.senha;
 
   /** INICIO DAS VALIDAÇÕES **/      
   let erros = [];     
 
   let regex = {
      email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      senha: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
   };
 
   if(email) {
     email = email.trim(); // Limpa espaços em branco no inicio e final do e-mail.
     email = email.toLowerCase(); // Padroniza o e-mail em minúsculo.
   };
 
   if (!email || email == undefined || !regex.email.test(email)) {
     erros.push({ error: "E-mail inválido!" });
   };     
 
   if(!senha || senha == undefined || senha == null || senha <= 6 || !regex.senha.test(senha) ) {
     erros.push({error: "Senha inválida! A senha deve ter no minimo 6 caracteres."});
   };
   /* FINAL DAS VALIDAÇÕES */ 
 
   return erros;   
 };
 