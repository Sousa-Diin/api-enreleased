function setNameLogin(name) {
  const loginName = document.getElementById("login-name");
  localStorage.setItem('currentOperator', JSON.stringify(name));
  loginName.innerHTML = JSON.parse(localStorage.getItem('currentOperator'));
  console.log(`Bem vindo ${name}`);
}

const messageError = (error) => {
  const cathError = document.getElementById("message-error");
  cathError.style.color = '#222';
  cathError.style.marginTop = '50';
  setNameLogin('undefined');
  cathError.innerHTML = error;
}

function getName() {
  var name = prompt("Olá operador qual seu nome por gentileza?");
  return  name === "" ? 'undefined' : name;
}

// Função Recursiva
function viewName(name) {
  console.log('Name: ', name);
  if (name !== 'undefined') {
    alert(`Olá ${name}!`);
    setNameLogin(name);
    window.location.pathname = "src/index.html";
  }else if(name === null){ 
    messageError('Por favor digite seu nome');
    return;
  } else {
    name = getName();
    viewName(name);
  }
}

viewName('undefined');
