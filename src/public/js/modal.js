// Função para carregar a janela modal
async function abrirModal(carregarModal, id) {
    //console.log("Carregar a janela modal: " + carregarModal);

    /*Modificar tabela*/
    await buscarHospedagem(id);

    // Receber o seletor da janela modal que será aberta
    let modal = document.getElementById(carregarModal);
    
    // Apresentar a janela modal
    modal.style.display = 'block';

    // Ocultar barra de rolagem
    document.body.style.overflow = 'hidden';
};

// Função para fechar a janela modal
function fecharModal(fecharModal){
    //console.log("Fechar a janela modal: " + fecharModal);

    // Receber o seletor da janela modal que será fechada
    let modal = document.getElementById(fecharModal);

    // Ocultar a janela modal
    modal.style.display = 'none';

    // Apresentar barra de rolagem
    document.body.style.overflow = 'auto';
};
  
async function buscarHospedagem(id) {
    const responseBuscarHospedagem = await fetch(`/buscarHospedagem${id}`);
    const buscarHospedagem = await responseBuscarHospedagem.json();
    console.log(buscarHospedagem)
    if(!buscarHospedagem){
        return;
    };
    if(buscarHospedagem.message == "404") { 
         return;
    }; 

    document.getElementById("modal-table-nome").innerText = buscarHospedagem["hospede.nome_completo"];
    document.getElementById("modal-table-checkin").innerText = buscarHospedagem.entrada;
    document.getElementById("modal-table-previsaosaida").innerText = buscarHospedagem.previsao_saida;
    document.getElementById("modal-table-checkout").innerText = buscarHospedagem.saida ? buscarHospedagem.saida : "";
    document.getElementById("modal-table-status").innerText = buscarHospedagem.status == 1 ? "Ativa" : "Finalizada";
    document.getElementById("modal-table-placa").innerText = "Modificar"
    document.getElementById("modal-table-acomodacao").innerText = buscarHospedagem["acomodacao.tipo"].charAt(0).toUpperCase() + buscarHospedagem["acomodacao.tipo"].slice(1);
    document.getElementById("modal-table-nAcomodacao").innerText = buscarHospedagem["acomodacao.numero"];
    document.getElementById("modal-table-aAcomodacao").innerText = buscarHospedagem["acomodacao.andar"];
    document.getElementById("modal-table-valor").innerText = "R$" + buscarHospedagem.valor;
    document.getElementById("modal-table-saldoDevedor").innerText = "R$" + buscarHospedagem.valor;
    document.getElementById("modal-table-diarias").innerText = buscarHospedagem.diaria
    document.getElementById("modal-table-checkout-diaria").innerText = buscarHospedagem.diaria

    return buscarHospedagem;
};  
