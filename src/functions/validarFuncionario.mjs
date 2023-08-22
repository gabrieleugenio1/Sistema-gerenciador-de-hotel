'use strict';
import validateCPF from './validarCPF.mjs';

export default (funcionario, tipo, matriculaOriginal) => {
  let nome = funcionario.nome;
  let email = funcionario.email;
  let cpf = funcionario.cpf;
  let funcao = funcionario.funcao;

  /** INICIO DAS VALIDAÇÕES **/      
  let erros = [];     

  let regex = {
  nome: /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  senha: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  };

  if(nome) {
    nome = nome.trim(); // Limpa espaços no inicio e no final do nome.        
    nome = nome.replace(/[^a-zA-Z\s]/g, ''); // Remove caracteres não textuais.        
    nome = nome.toLowerCase(); // Padroniza o nome em minúsculo.
  };

  if(email) {
    email = email.trim(); // Limpa espaços em branco no inicio e final do e-mail.
    email = email.toLowerCase(); // Padroniza o e-mail em minúsculo.
  };

  cpf = cpf.trim(); // Limpa espaços em branco no inicio e final do cpf.}
  cpf = cpf.replace(/[^\d]/g, '');  // Remove caracteres não numéricos. 
  if (!validateCPF(cpf) || !cpf || cpf == undefined || cpf == null) {
    erros.push({ error: "CPF inválido!" });
  };    
  
  if(!nome || nome == undefined || nome == null ) {
   erros.push({error: "Nome inválido! Não pode ser vazio e deve ser completo."});
  };  

  if (!email || email == undefined || nome == null || !regex.email.test(email)) {
   erros.push({ error: "E-mail inválido!" });
  };     

  /* FINAL DAS VALIDAÇÕES */ 

  return erros;   
};
