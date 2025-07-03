document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const mensagemErro = document.getElementById("mensagemErro");
    mensagemErro.innerHTML = ""; // Limpa mensagens de erro anteriores

    // Limpa classes de erro e acessibilidade antes de validar
    ["nome", "email", "senha", "confirmarSenha", "dataNascimento"].forEach(function(id) {
        document.getElementById(id).classList.remove("erro-campo");
        document.getElementById(id).setAttribute("aria-invalid", "false");
    });

    let mensagens = [];

    if (nome.length < 3) {
        mensagens.push("O nome deve ter pelo menos 3 caracteres.");
        document.getElementById("nome").classList.add("erro-campo");
        document.getElementById("nome").setAttribute("aria-invalid", "true");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mensagens.push("O email deve ser válido.");
        document.getElementById("email").classList.add("erro-campo");
        document.getElementById("email").setAttribute("aria-invalid", "true");
    }

    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    if (nascimento >= hoje || isNaN(nascimento)) {
        mensagens.push("Data de nascimento inválida.");
        document.getElementById("dataNascimento").classList.add("erro-campo");
        document.getElementById("dataNascimento").setAttribute("aria-invalid", "true");
    } else {
        // Validação de idade mínima
        const idadeMinima = 18;
        const anoAtual = hoje.getFullYear();
        const anoNascimento = nascimento.getFullYear();
        let idade = anoAtual - anoNascimento;

        // Ajusta caso o aniversário ainda não tenha ocorrido este ano
        const mesAtual = hoje.getMonth();
        const mesNascimento = nascimento.getMonth();
        const diaAtual = hoje.getDate();
        const diaNascimento = nascimento.getDate();

        if (
            mesAtual < mesNascimento ||
            (mesAtual === mesNascimento && diaAtual < diaNascimento)
        ) {
            idade--;
        }

        if (idade < idadeMinima) {
            mensagens.push("Você deve ter pelo menos 18 anos para se cadastrar.");
            document.getElementById("dataNascimento").classList.add("erro-campo");
            document.getElementById("dataNascimento").setAttribute("aria-invalid", "true");
        }
    }
        
    const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!senhaForteRegex.test(senha)) { 
        mensagens.push("A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial.");
        document.getElementById("senha").classList.add("erro-campo");
        document.getElementById("senha").setAttribute("aria-invalid", "true");
    }

    if (senha !== confirmarSenha) {
        mensagemErro.textContent = "As senhas não coincidem.";
        document.getElementById("senha").classList.add("erro-campo");
        document.getElementById("confirmarSenha").classList.add("erro-campo");
        document.getElementById("senha").setAttribute("aria-invalid", "true");
        document.getElementById("confirmarSenha").setAttribute("aria-invalid", "true");
        document.getElementById("senha").value = ""; // Limpa o campo senha
        document.getElementById("confirmarSenha").value = ""; // Limpa o campo confirmar senha
        return;
    }

    if (mensagens.length > 0) {
        mensagemErro.innerHTML = mensagens.join("<br>");
        return; 
    }

    mostrarMensagemSucesso('Cadastro realizado com sucesso!');
});

document.getElementById("mostrarSenha").addEventListener("change", function() {
    const tipo = this.checked ? "text" : "password";
    document.getElementById("senha").type = tipo;
    document.getElementById("confirmarSenha").type = tipo;
});

// script.js
function mostrarMensagemSucesso(msg) {
    const div = document.getElementById('mensagemSucesso');
    div.innerHTML = `<svg style="vertical-align:middle;margin-right:8px;" width="24" height="24" fill="#36d1c4" viewBox="0 0 24 24"><path d="M20.285 6.709l-11.285 11.285-5.285-5.285 1.414-1.414 3.871 3.871 9.871-9.871z"/></svg>${msg}`;
    div.classList.add('mostrar');
    setTimeout(() => {
        div.classList.remove('mostrar');
        div.textContent = '';
        document.getElementById('formCadastro').reset();
    }, 3000);
}

