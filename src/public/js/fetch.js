const cep = document.querySelector("#cep");

async function buscarCEP(cep) {
    if (cep.length < 8) return;
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const jsonData = await response.json();
    return jsonData;
  };
   
cep.addEventListener("keyup", async ()=>{

    if(cep.value.length == 8 && !isNaN(cep.value)){
        await buscarCEP(cep.value).then(resultado => {
            console.log(resultado)
            if(!resultado?.erro) {
                //Ocultar texto de erro
                document.querySelector("#buscarCEP").style.display = "none";
                //Modificar campos
                document.querySelector("#logradouro").value = resultado.logradouro ;
                document.querySelector("#uf").value = resultado.uf;
                document.querySelector("#cidade").value = resultado.localidade;
                document.querySelector("#bairro").value = resultado.bairro;
            } else {
                document.querySelector("#buscarCEP").style.display = "block";
            };
        });
    }else{
        //Ocultar texto de erro
        document.querySelector("#buscarCEP").style.display = "none";
        document.querySelector("#logradouro").value = "" ;
        document.querySelector("#uf").value = "";
        document.querySelector("#cidade").value = "";
        document.querySelector("#bairro").value = "";
    };
});


/*Nova hospedagem*/
  
async function buscarCliente(tipo) {
    let numero;
    if (tipo == "cpf") {
        numero = document.querySelector("#numeroDocumentoCpfNovaHospedagem").value;
    } else if(tipo == "passaporte") {
        numero = document.querySelector("#numeroDocumentoPassaporteNovaHospedagem").value;
    } else {
        return console.log("Erro ao buscar cliente");
    };

    const response = await fetch(`/${tipo}/${numero}`);
    const jsonData = await response.json();

    if(!jsonData){
        document.getElementById("resultadoBuscaCliente").innerHTML= "Hóspede não encontrado";
        document.getElementById("submitNovaHospedagem").disabled = true;
        return;
    };
    if(jsonData.message == "404") { 
         document.getElementById("resultadoBuscaCliente").innerHTML= "Insirá um Nº de documento válido";
         document.getElementById("submitNovaHospedagem").disabled = true;
         return;
    }; 
    return jsonData;
};  

const cliente = document.querySelector("#buscarCliente");
const clienteCpf = document.querySelector("#numeroDocumentoCpfNovaHospedagem");

cliente.addEventListener("click", async () => {
    let resultado = await buscarCliente(document.querySelector("#tipoDocumentoNovaHospedagem").value)
    document.getElementById("resultadoBuscaCliente").innerHTML= resultado.nome_completo;
    document.getElementById("submitNovaHospedagem").disabled = false;
});

clienteCpf.addEventListener("keyup", async () => {
    if(clienteCpf.value.length == 11){
        let resultado = await buscarCliente(document.querySelector("#tipoDocumentoNovaHospedagem").value)
        document.getElementById("resultadoBuscaCliente").innerHTML= resultado.nome_completo;
        document.getElementById("submitNovaHospedagem").disabled = false;
    };
});