/*Tipo documento de Novo hospede*/
const documentoHospede = document.querySelector("#tipoDocumentoNovoHospede");
documentoHospede.addEventListener("change", tipoDocumentoNovoHospede);

function tipoDocumentoNovoHospede() {
    if(documentoHospede.value == "cpf") {
      document.querySelectorAll(".numeroDocumentoCpfNovoHospede").forEach(cpf => cpf.style.display="block");
      document.querySelectorAll(".rgNovoHospede").forEach(rg => rg.style.display="block");
      document.querySelectorAll(".numeroDocumentoPassaporteNovoHospede").forEach(passport => passport.style.display="none");

      //Resetando o valor
      document.querySelector("#numeroDocumentoPassaporteNovoHospede").value = "";
    }else {
      document.querySelectorAll(".numeroDocumentoPassaporteNovoHospede").forEach(passport => passport.style.display="block");
      document.querySelectorAll(".numeroDocumentoCpfNovoHospede").forEach(cpf => cpf.style.display="none");
      document.querySelectorAll(".rgNovoHospede").forEach(rg => rg.style.display="none");

      //Resetando os valores
      document.querySelector("#numeroDocumentoCpfNovoHospede").value = "";
      document.querySelector("#rg").value = "";

    }; 
};



/*Tipo documento de Nova hospedagem*/

const documentoHospedagem = document.querySelector("#tipoDocumentoNovaHospedagem");
documentoHospedagem.addEventListener("change", tipoDocumentoNovaHospedagem);

function tipoDocumentoNovaHospedagem() {
    if(documentoHospedagem.value == "cpf") {
    document.querySelectorAll(".numeroDocumentoCpfNovaHospedagem").forEach(cpf => cpf.style.display="block");
    document.querySelectorAll(".numeroDocumentoPassaporteNovaHospedagem").forEach(passport => passport.style.display="none");
    //Resetando os valores
    document.querySelector("#numeroDocumentoPassaporteNovaHospedagem").value = "";
    } else {
    document.querySelectorAll(".numeroDocumentoPassaporteNovaHospedagem").forEach(passport => passport.style.display="block");   
    document.querySelectorAll(".numeroDocumentoCpfNovaHospedagem").forEach(cpf => cpf.style.display="none");
    //Resetando os valores
    document.querySelector("#numeroDocumentoCpfNovaHospedagem").value = "";
    }; 
}; 
    
    