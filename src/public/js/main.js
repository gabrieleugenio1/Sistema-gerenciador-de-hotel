const alerta = () =>{
    const alert = document.querySelector(".alert");
    alert.addEventListener("click", ()=> alert.style.display = "none");
}

const buttons = [
    novaHospedagem,
    gerenciarHospedagem,
    cadastrarHospede,
    gerenciarHospede,
    gerenciarAcomodacoes,
    configurarDiarias,
    gerenciarGaragem
];

const sections = [
    document.querySelector(".nova_hospedagem"),
    document.querySelector(".gerenciar_hospedagem"),
    document.querySelector(".cadastrar_hospede"),
    document.querySelector(".gerenciar_hospede"),
    document.querySelector(".gerenciar_acomodacao"),
    document.querySelector(".configurar_diaria"),
    document.querySelector(".gerenciamento_garagem")
];

function handleButtonClick(index) {
    sections.forEach((section, i) => {
        if (i === index) {
            section.classList.toggle("disable", !section.classList.contains("disable"));
        } else {
            section.classList.add("disable");
        }
    });
}

buttons.forEach((button, index) => {
    button.addEventListener("click", () => handleButtonClick(index));
});

/*Tempo do alerta*/
const tempo = setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
}, 6000);

document.querySelector(".alert").addEventListener("onload", tempo);
