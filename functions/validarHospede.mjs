'use strict';
import validateCPF from './validarCPF.mjs';
import nameTitle from './nameTitle.mjs';

export default (hospede) => {
  let {nome, cpf, rg, passaporte, dataNascimento, nacionalidade, sexo, telefone} = hospede;
  let {logradouro, numero, uf, cep, cidade, bairro} = hospede;
  
  /** INICIO DAS VALIDAÇÕES **/      
  let erros = [];     
  /*Validação Hospede*/
  if(nome) {
    nome = nome.trim(); // Limpa espaços no inicio e no final do nome.        
    nome = nome.replace(/[^a-zA-Z\s]/g, ''); // Remove caracteres não textuais.        
    nome = nome.toLowerCase(); // Padroniza o nome em minúsculo.
    nome = nameTitle(nome);
  };

  if(dataNascimento) {
    if(dataNascimento.split('-').length != 3 || dataNascimento == undefined || dataNascimento == null) erros.push({ error: "Insira uma data de nascimento válida!" })
  } else {
    erros.push({ error: "Insira uma data de nascimento válida!" }); 
  };

  if(!cpf && !passaporte) {
    erros.push({ error: "Insira um CPF ou passaporte!" });
  };

  if(cpf) {
    cpf = cpf.trim(); // Limpa espaços em branco no inicio e final do cpf.}
    cpf = cpf.replace(/[^\d]/g, '');  // Remove caracteres não numéricos. 
    if (!validateCPF(cpf) || !cpf || cpf == undefined || cpf == null) erros.push({ error: "CPF inválido!" });   
    if (!rg || rg == undefined || rg == null || isNaN(rg) || rg.length != 8) erros.push({ error: "RG inválido!" });
  } else {
    passaporte = "Não possui";
  };

  if(!passaporte){
    passaporte = "Não possui";
  };

  if(!nome || nome == undefined || nome == null ) {
   erros.push({error: "Nome inválido! Não pode ser vazio e deve ser completo."});
  };  

  if (!nacionalidade || nacionalidade == undefined || nacionalidade == null) {
   erros.push({ error: "Nacionalidade inválida!" });
  };   

  if((!sexo || sexo == undefined || sexo == null) || (sexo != "M" && sexo != "F")) {
    erros.push({ error: "Sexo inválido!\n" });
  };

  if(!telefone || telefone == undefined || telefone == null || telefone.length <= 10) {
    erros.push({ error: "Telefone inválido!" });      
  };

  /*Validação Endereço Hospede*/
    bairro

  if (!logradouro || logradouro == undefined || logradouro == null) {
    erros.push({ error: "Logradouro inválido!" });
  };  

  if (!numero || numero == undefined || numero == null || isNaN(numero)) {
    erros.push({ error: "Número inválido!" });
  }; 

  if (!cep || cep == undefined || cep == null || isNaN(cep)) {
    erros.push({ error: "CEP inválido!" });
  }; 

  if (!uf || uf == undefined || uf == null) {
    erros.push({ error: "UF inválido!" });
  };  

  if (!cidade || cidade == undefined || cidade == null) {
    erros.push({ error: "Cidade inválida!" });
  };  

  if (!bairro || bairro == undefined || bairro == null) {
    erros.push({ error: "Bairro inválido!" });
  };  

  /* FINAL DAS VALIDAÇÕES */ 
  if(erros.length > 0) return erros; 
  return {nome, cpf, rg, passaporte, dataNascimento, nacionalidade, sexo, telefone, logradouro, numero, uf, cep, cidade, bairro};
};
