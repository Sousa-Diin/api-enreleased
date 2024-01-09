
function cadastrarUsuario() {
  var nome = document.getElementById('nome').value;
  var sobrenome = document.getElementById('sobrenome').value;
  var email = document.getElementById('email').value;
  var login = document.getElementById('login').value;
  var senha = document.getElementById('senha').value;
  var confirmarSenha = document.getElementById('confirmeSenha').value;

  /*if (nome === "" || sobrenome === "" || email === "" || senha === "" || login === "" || confirmarSenha === "") {
      alert("Por favor, preencha todos os campos do formulário.");
      return;
  }*/

  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem. Tente novamente.');
    return;
  }
  //let currentPass = hashFunction(login, senha);
  var usuario = {
    nome: nome,
    sobrenome: sobrenome,
    email: email,
    login: login,
    senha: senha
  };

  var listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  listaUsuarios.push(usuario);

  localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));

  alert('✅SUCESSO !!\n\nUsuario cadasttrado com sucesso!!.');

  // Limpar os campos após o cadastro
  document.getElementById('nome').value = '';
  document.getElementById('sobrenome').value = '';
  document.getElementById('email').value = '';
  document.getElementById('login').value = '';
  document.getElementById('senha').value = '';
  document.getElementById('confirmeSenha').value = '';

}

const handleSubmit = () => {
  document
    .getElemenById('btn-save')
    .addEventListener('click', cadastrarUsuario);
}

handleSubmit();
/*
function hashFunction(param1, param2) {
    // Concatenando os parâmetros em uma string
    const inputString = param1.toString() + param2.toString();

    let hash = 0;

    // Calculando um valor hash simples para a string concatenada
    for (let i = 0; i < inputString.length; i++) {
        const char = inputString.charCodeAt(i);
        hash = (hash << 5) - hash + char;
    }

    return hash;
}

// Exemplo de uso
//const resultadoHash = hashFunction(login, senha);
//console.log(resultadoHash);
*/