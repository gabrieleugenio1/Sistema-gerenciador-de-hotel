const alerta = () =>{
    const alert = document.querySelector(".alert");
    alert.addEventListener("click", ()=> alert.style.display = "none");
}

const novaHospedagem = document.querySelector("#novaHospedagem");
const gerenciarHospedagem = document.querySelector("#gerenciarHospedagem");
const cadastrarHospede = document.querySelector("#cadastrarHospede");
const gerenciarHospede = document.querySelector("#gerenciarHospede");
const gerenciarAcomodacoes = document.querySelector("#gerenciarAcomodacoes");
const configurarDiarias = document.querySelector("#configurarDiarias");
const gerenciarGaragem = document.querySelector("#gerenciarGaragem");

function handleButtonClick(event, classe) {
    if (event.type === "touchstart") event.preventDefault();
    event.stopPropagation();
    document.querySelector(`.${classe}`).classList.toggle("disable");
  }

novaHospedagem.addEventListener("click", (event) => handleButtonClick(event,"nova_hospedagem"));

gerenciarHospedagem.addEventListener("click", (event) => handleButtonClick(event,"gerenciar_hospedagem"));

cadastrarHospede.addEventListener("click", (event) => handleButtonClick(event,"cadastrar_hospede"));

gerenciarHospede.addEventListener("click", (event) => handleButtonClick(event,"gerenciar_hospede"));

gerenciarAcomodacoes.addEventListener("click", (event) => handleButtonClick(event,"gerenciar_acomodacao"));

configurarDiarias.addEventListener("click", (event) => handleButtonClick(event,"configurar_diaria"));

gerenciarGaragem.addEventListener("click", (event) => handleButtonClick(event,"gerenciamento_garagem"));
