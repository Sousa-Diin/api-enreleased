function fecharPagina() {
  window.location.pathname = "src/index.html";
}

// Verifica se o LocalStorage é suportado pelo navegador
function isLocalStorageSupported() {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
  } catch (e) {
    return false;
  }
}
// Carrega os dados do LocalStorage ou define dados iniciais
function carregarDados(myKey) {
  var myData;

  if (isLocalStorageSupported()) {
    var dadosJSON = localStorage.getItem(myKey);
    if (dadosJSON) {
      myData = JSON.parse(dadosJSON, 3);
    }
  }
  return myData;
}

// Exibir os dados
function exibirDados(dados) {
  var display = document.getElementById("data-display");
  display.textContent = JSON.stringify(dados, null, 2);
}

// Elemento HTML para exibir os dados
var jsonList = document.getElementById("alerta-display");

var jsonAlerta = document.getElementById("div-alerta");
var jsonPlaca = document.getElementById("div-placa");
var jsonFilial = document.getElementById("div-filial");
var jsonQtdBocejo = document.getElementById("div-qtd-bocejo");
var jsonHorario = document.getElementById("div-horario");

var relatorio = carregarDados("myArray");

// Função para imprimir a lista de JSON em HTML
function imprimirListaJSON(relatorio) {
  cleanField("tag", "hide-data");
  document.getElementById("relatorios-data");
  var resultados = relatorio.filter(function (item) {
    return item;
  });

  resultados.forEach(function (item) {
    var trTable = document.getElementById("relatorios-data");
    var texto = `<div class="search-text"><p class="alerta">${item.type}</p> <p class="placa">${item.licensePlate}</p> <p class="filial">${item.operation}</p> <p class="qtd">${item.yawn}</p><p class="hr">${item.myHour}</p> </div>`;

    trTable.innerHTML += texto;
  });
}

// Chamar a função para imprimir a lista de JSON em HTML

imprimirListaJSON(relatorio);
exibirDados(relatorio);

// Consultar dados pela placa
function consultarPorPlaca(dados, placa) {
  var resultado = dados.filter(function (item) {
    return item.placa == placa;
  });

  return resultado;
}

// Consultar dados pela idade
function isPlaca(dados, placa) {
  var resultado = dados.some(function (item) {
    return item.placa == placa;
  });

  return resultado;
}

function buscarPorElemento(array, elemento) {
  return array.find(function (item) {
    return item.placa == elemento;
  });
  return null;
}

/***
    Container data
****/

function search() {
  var busc = document.getElementById("buscado").value;
  var element = document.getElementById("relatorios-data");

  //Limpa os campos
  cleanField("input", "buscado");
  //cleanField('tag','hide-data');
  cleanField("tag", "relatorios-data");

  if (busc !== "") {
    element.classList.toggle("mystyle");

    var resultados = relatorio.filter(function (item) {
      return item.placa === busc;
    });

    if (resultados.length > 0) {
      resultados.forEach(function (item) {
        var texto = `<div class="search-text"><p>${item.alerta}</p><p>${item.placa}</p><p>${item.filial}</p> <p>${item.qtd_bocejo}</p><p>${item.horario}</p></div>`;
        element.innerHTML += texto;
      });
    } else {
      element.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    }
  } else {
    alert("Entre com dados validos");
    console.log("Elemento não encontrado!");
    loadData("hide-data", "relatorios-data");
  }
}

function cleanField(field, id) {
  //Limpa campos ID
  if (field == "tag") {
    document.getElementById(id).innerHTML = "";
  } else if (field == "input") {
    document.getElementById(id).value = "";
  }
}

function loadData(fld1, fld2) {
  var compare = document.getElementById(fld2);
  if (
    compare.innerHTML === "" ||
    compare.innerHTML === "Nenhum resultado encontrado."
  ) {
    imprimirListaJSON(relatorio);
    cleanField("tag", fld1);
  } else {
    //createConfirmBox();
  }
}

function deleteData() {
  // Limpar os dados do localStorage
  localStorage.removeItem("oldData");
  cleanField("tag", "hide-data");
}

function createConfirmBox(phrase) {
  var x;
  var r = confirm(phrase);

  if (r == true) {
    x = "Ação execultada com sucesso!";
    deleteData();
  } else {
    x = "Ação cancelado com sucesso!";
  }
  //document.getElementById("hide-data").innerHTML = x;
}

// Fazer Download dos dados
function gerarJSONeDownload() {
  var dataAtual = new Date();
  var dia = dataAtual.getDate();
  var mes = dataAtual.getMonth() + 1;

  // Converter o JSON para CSV usando a biblioteca PapaParse
  var csv = Papa.unparse(relatorio);

  // Criar um novo Blob com o conteúdo CSV
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

  // Nome do arquivo Excel que será baixado
  var nomeArquivo = `dados_systrat${dia}-${mes}.csv`;
  console.log(`Dowonload arqSysTrat: ${dia}-${mes}`);
  // Fazer o download do arquivo Excel usando a biblioteca FileSaver
  saveAs(blob, nomeArquivo);
}
