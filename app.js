// app.js
// Lógica do aplicativo de controle financeiro em português.

const form = document.getElementById("form-transacao");
const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const data = document.getElementById("data");
const tipo = document.getElementById("tipo");
const listaTransacoes = document.querySelector("#lista ul");

function limparErros() {
    document.querySelectorAll(".erro").forEach((campo) => {
        campo.textContent = "";
    });
}

function mostrarErro(id, mensagem) {
    document.getElementById(id).textContent = mensagem;
}

function adicionarTransacaoNaLista(descricao, valor, data, tipo) {
    const item = document.createElement("li");
    const sinal = tipo === "receita" ? "+" : "-";
    item.textContent = `${descricao} ${sinal} R$ ${valor.toFixed(2)} (${data})`;
    listaTransacoes.appendChild(item);
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    limparErros();
    let formularioValido = true;

    if (descricao.value.trim() === "") {
        mostrarErro("erro-descricao", "A descrição é obrigatória.");
        formularioValido = false;
    }

    const valorNumerico = Number(valor.value);
    if (valor.value === "" || valorNumerico <= 0) {
        mostrarErro("erro-valor", "Digite um valor maior que zero.");
        formularioValido = false;
    }

    if (data.value === "") {
        mostrarErro("erro-data", "Selecione uma data.");
        formularioValido = false;
    }

    if (tipo.value === "") {
        mostrarErro("erro-tipo", "Selecione o tipo da transação.");
        formularioValido = false;
    }

    if (!formularioValido) {
        return;
    }

    adicionarTransacaoNaLista(descricao.value.trim(), valorNumerico, data.value, tipo.value);
    alert("Transação adicionada com sucesso!");
    form.reset();
});

[descricao, valor, data].forEach((campo) => {
    campo.addEventListener("input", () => limparErros());
});

tipo.addEventListener("change", () => limparErros());