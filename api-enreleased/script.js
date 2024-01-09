/** fadiga@expressonepomuceno.com.br */
// Captura o formulário de login


var userAux = {
  name:'Wildes Sousa',
  login:'augustowildes@gmail.com',
  email:'augustowildes@gmail.com',
  passwd: '',
  permision: 0,
  company: 'EN - LAVRAS',
  role: 'ALL_SYSTEM_PANEL',
  status: 'Ativo',
};
var userFatigue = {
  name:'CCI Fadiga',
  login:'fadiga@expressonepomuceno.com.br',
  email:'fadiga@expressonepomuceno.com.br',
  passwd: '',
  permision: 4,
  company: 'EN - LAVRAS',
  role: 'SYSTEM_PANEL',
  status: 'Ativo',
};
const loginForm = document.getElementById("loginForm");

// Adiciona um evento de envio ao formulário
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Captura os valores dos campos de email e senha
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value; 
  let login = false;


      const userRegistered = JSON.parse(localStorage.getItem('usuarios'));
      var auth =  hashFunction(email, password);
      let userValid = {};
      userAux.passwd = auth;
      userAux.email = email;
      userFatigue.passwd = auth;
  
      if ( (email === 'augustowildes@gmail.com' || email === 'wildessouza@expressonepomuceno.com.br') && password === 'Eadmin17816#n' ||email === 'fadiga@expressonepomuceno.com.br' && password === '#@Fadiga4321') {
        if(email === 'augustowildes@gmail.com' || email === 'wildessouza@expressonepomuceno.com.br'){
          localStorage.setItem('userValid', JSON.stringify(userAux));
          login = true;
          console.log('operating support...');
        }else if(email === 'fadiga@expressonepomuceno.com.br'){
          localStorage.setItem('userValid', JSON.stringify(userFatigue));
          login = true;
          console.log('userFatigue in production...');
        }
        
        if(localStorage.getItem('usuarios')){
          let setList = JSON.parse(localStorage.getItem('usuarios'));
          setList.push(userAux);
          setList.push(userFatigue);
          localStorage.setItem('usuarios', JSON.stringify(setList));
        
        }else{
          let usuarios = [];
          usuarios.push(userAux);
          localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
        
      }
      if(userRegistered){
        userRegistered.forEach((user) => { 
         
          if(user.senha === auth && user.login === email){
            userValid = {
              name : user.nome,
              login : user.login,
              passwd : user.senha
            };
            login = true;
            console.log('Logado com sucesso!');
            console.log(userValid);
            localStorage.setItem('userValid', JSON.stringify(userValid));
          }
            
          
        });
      }else{
        // Limpa os campos de email e senha
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        //alert("Email ou senha inválidos!");
        clearField();    
        
      }
        //console.log('test value: ',userValid);
      AllowAcessForUser(login);

  
});

const AllowAcessForUser = (login) => {
  if (login ) {
    clearField();
    localStorage.setItem("login", JSON.stringify({ login: true }));
    localStorage.setItem("started", JSON.stringify({ start: false }));
    window.location.pathname = "src/index.html"; // Redireciona para outra página
    console.log('user authenticated');
  }else{
    console.log("Usuário inválido!");
    clearField();
    alert("Email ou senha inválidos!");
  } 
} 


function hashFunction(param1, param2) {
    // Concatenando os parâmetros em uma string
    const inputString = param1.toString() + param2.toString();

    let hash = 0;

    // Calculando um valor hash simples para a string concatenada
    for (let i = 0; i < inputString.length; i++) {
        const char = inputString.charCodeAt(i);
      hash = (hash + char) + (hash << 10);
    }

    return hash;
}

const clearField = () => {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
};
// Função para criar uma hash usando o email e senha
function createHash(email, password) {
  // Concatena o email e a senha
  const combinedString = email + password;

  // Converte a string combinada em um array de bytes
  const buffer = new TextEncoder().encode(combinedString);

  // Cria um objeto do tipo CryptoJS SHA-256
  const hashObj = crypto.subtle.digest("SHA-256", buffer);

  // Converte o resultado em uma string hexadecimal
  const hashPromise = hashObj.then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  });
  // Retorna uma promise que será resolvida com a hash hexadecimal
  return hashPromise;
}

// Função para enviar uma hash para a API e verificar a autenticidade do login
function verifyLoginWithHash(hash) {
  const apiUrl = "https://api-pgfp.soluttec.repl.co/api/add/"; // Substitua pela URL correta da API

  // Cria um objeto com os dados da hash
  const hashData = {
    hash: hash,
  };

  //Envia uma solicitação POST para a API com os dados da hash
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hashData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Verifica a resposta da API e a autenticidade do login
      if (data.authenticated) {
        console.log("Usuário autenticado com sucesso!");
        console.log("Sucesso: ", data);
        // Realize ações apropriadas para autenticar o usuário
      } else {
        console.log("Falha na autenticação do usuário.");
        console.log("Falha: ", data);
        // Realize ações apropriadas para tratar a autenticação falha
      }
    })
    .catch((error) => {
      console.error("Erro ao consumir a API:", error);
      // Realize ações apropriadas para tratar o erro de consumo da API
    });
}

function tema(sw) {
  var color1, color2, btn, tittle, colorInput;
  if (sw == 0) {
    color1 = "#222";
    color2 = "rgba(255, 255, 255, 0.05)";
    btn = "#28a745";
    tittle = "#fff";
    colorInput = "rgba(255, 255, 255, 0.1)";
  } else {
    color1 = "#f2f2f2";
    color2 = "#fff";
    btn = "#007bff";
    tittle = "#222";
    colorInput = "#f2f2f2";
  }
  document.getElementById("container").style.backgroundColor = color1;
  document.getElementById("login-box").style.backgroundColor = color2;
  document.getElementById("btn").style.backgroundColor = btn;
  document.getElementById("login-box").style.color = tittle;
  document.getElementById("login-tema-light").style.backgroundColor = tittle;
  document.getElementById("email").style.backgroundColor = colorInput;
  document.getElementById("password").style.backgroundColor = colorInput;
  document.getElementById("email").style.color = tittle;
  document.getElementById("password").style.color = tittle;
}
/*
function capturaTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', function() {
      if (this.checked) {
        return 1;
      }
    });
    return 0;
}
console.log(`Theme: ${capturaTheme()}`);

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('change', function() {
  if (this.checked) {
    body.classList.remove('light');
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
  }
});*/

function show(visible) {
  var themes = document.getElementById("div-themes");
  var aux = "hidden";
  if (visible) {
    /* div.classList.remove('list-item');
        themes.classList.add('light');*/
    aux = "visible";
  } else {
    aux = "hidden";
  }

  themes.style.visibility = aux;
}

function myLink(link) {
  switch (link) {
    case "audit":
      window.location.pathname = "src/upgrade/v1.0.3.html";
      break;
    case "profile":
      window.location.pathname = "src/upgrade/auth.html";
      break;
    case "settings":
      window.location.pathname = "../index.html";
      break;
    case "logout":
      window.location.pathname = "src/index.html";
      break;
    case "logout":
      /* window.location.pathname = "../index.html"; */
      window.location.href = "https://google.com"; 
      /* notie.confirm({
        text: 'Leave the page?',
        submitCallback: () => windown.location.href = 'https://google.com'
      }) */
      break;
    case "download":
      gerarJSONeDownload();
      break;
    default:
      window.location.pathname = "/";
      break;
  }
}
  