// Função para carregar a janela modal
function abrirModal(carregarModal, id) {
    //console.log("Carregar a janela modal: " + carregarModal);

    // Receber o seletor da janela modal que será aberta
    let modal = document.getElementById(carregarModal);

    // Apresentar a janela modal
    modal.style.display = 'block';
    console.log(modal)
    // Ocultar barra de rolagem
    document.body.style.overflow = 'hidden';
}

// Função para fechar a janela modal
function fecharModal(fecharModal){
    //console.log("Fechar a janela modal: " + fecharModal);

    // Receber o seletor da janela modal que será fechada
    let modal = document.getElementById(fecharModal);

    // Ocultar a janela modal
    modal.style.display = 'none';

    // Apresentar barra de rolagem
    document.body.style.overflow = 'auto';
}






  
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