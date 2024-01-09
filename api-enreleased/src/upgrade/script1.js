// Carrega os dados do LocalStorage ou define dados iniciais
var myReceiveData = getLocalStorage("myArray") ?? {};

class Alerta {
  arrayAlerts = [];
  constructor(newData) {
    this.arrayAlerts = newData;
  }

  listTable(data) {
    //let trTable = document.getElementById('tbody');
    var resultados = data.filter(function (item) {
      return item;
    });
    drawTable(resultados);
  }

  search() {
    const elementSearching = document.getElementById("busca").value;
    alert(`Buscando ID - ${id} -- ${elementSearching}`);
  }

  audit(id) {
    const auditAlerta = this.arrayAlerts.find((a) => a.id === id);

    notie.confirm({
        text:"Faça uma revisão da Auditoria realizada\n\nApós confirmar a Auditoria não será mais possível Revisar a Tratativa.\n",
      submitCallback: () => {
        auditAlerta.audit = !auditAlerta.audit;
        salvarLocalStorage("myArray", this.arrayAlerts);
        notie.alert({
          type:1,
          text:"✅Sucesso!!\n\nRevisão inserida com sucesso!",
        });
        drawTable(this.arrayAlerts);
      }
    })
    
  }

  delete(id) {
    const clearAlerta = this.arrayAlerts.find((a) => a.id === id);
    //alert(`Deletando ID - ${id}\n Alerta encontrado: ${clearAlerta.type}`);
    this.removerDaTabela(clearAlerta.id);
  }

  receiveData() {
    alert(`Dados recebidos: ${JSON.stringify(this.arrayAlerts, null, 3)}`);
  }

  clearLocalstorage(key) {
    localStorage.removeItem(key);
    delete this.arrayAlerts;
    salvarLocalStorage('totAlert',0);
    reloadPage();
  }

  removerDaTabela(id) {
    let remanecente;
    if (confirm(`CONFIRMAÇÃO.\n\nVocê tem certeza que deseja excluir o alerta selecionado?\n\t\t\t\t\t\t\t\t\t\t ID - ${id} \t\t\t\t\t\t\t\t\t\t`)){
        remanecente = getLocalStorage("myArray").filter(function (item) {
          return item.id !== id;
        });

      this.arrayAlerts = remanecente;
      this.sort();
      salvarLocalStorage("myArray", remanecente);
      salvarLocalStorage('totAlert',remanecente.length);
      reloadPage();
      notie.alert({
        text: "✅Sucesso!!\n\nAlerta deletado com sucesso!",
        type:1,
      });
    }
  }


  checkField(updateObj) {
    const updateType = document.getElementById("newType").value;
    const updatePlate = document.getElementById("newPlate").value;
    const updateOperation = document.getElementById("newOperation").value;
    const updateDate = document.getElementById("newDate").value;
    const updateHour = document.getElementById("newHour").value;
    const updateAudit = document.getElementById("newAudit").value;

    let myMsg = "";

    if (updateType === "") {
      myMsg += "- Informe o tipo do alerta.\n";
    } else {
      updateObj.type = updateType.toUpperCase();
    }

    if (updatePlate === "") {
      myMsg += "- Informe a placa do veículo.\n";
    } else {
      updateObj.licensePlate = updatePlate.toUpperCase();
    }

    if (updateOperation === "") {
      myMsg += "- Informe o nome da filial.\n"; //
    } else {
      updateObj.operation = updateOperation.toUpperCase();
    }

    if (updateDate === "") {
      myMsg += "- Informe a nova data do alerta.\n";
    } else {
      updateObj.date = updateDate;
    }

    if (updateHour === "") {
      myMsg += "- Informe a nova hora do alerta.\n";
    } else {
      updateObj.myHour = updateHour;
    }

    if (updateAudit === "") {
      myMsg += "- Informe o status do alerta.\n";
    } else {
      //updateObj.audit = !updateObj.audit;
    }

    if (myMsg != "") {
      alert(myMsg);
    }

    if (
      confirm(
        "!!ATENÇÃO!!\n\nO alerta será salvo com os dados contidos nos campos caso não tenha nada a informação permanecera a mesma."
      )
    ) {
      console.log(`index[${this.arrayAlerts[updateObj.id - 1].id}]`);
      this.arrayAlerts[updateObj.id - 1] = updateObj;
      salvarLocalStorage("myArray", this.arrayAlerts);
      alert("✅Sucesso!!\n\nAlerta alterado[✔️].\n");
    }
    updateObj.preventDefault();
  }
  edit(id) {
    //alert('Editando os Dados =>', id);
    this.createModal(id);
    openModalProfile(id);
  }

  createModal(id) {
    // Param: elemento montado encapsulado em uma str template

    let tempId = this.arrayAlerts.find((item) => item.id === id);
    console.log(`Editando alerta de ${tempId.type} ID - ${id}`);

    const containerMain = document.getElementById("container-table");
    const modal = document.createElement("section");
    const cabecalho = document.createElement("div");
    const tittle = document.createElement("h3");
    const button = document.createElement("button");
    const content = document.createElement("form");

    modal.classList.add("box");
    modal.classList.add("disable");
    modal.setAttribute("id", `close-profile${id}`);
    button.setAttribute("id", "btn");

    const divClasses = [
      tempId.nivel,
      "color-wht",
      "flex",
      "row",
      "jc-between",
      "h-auto",
    ];

    const btnClasses = [
      "border-none",
      "wpx-50",
      tempId.nivel,
      "relative",
      "h-full",
    ];

    const formClasses = ["p-2", "flex", "col", "h-full", "jc-between"];

    const getLevel = (color) => {
      if (color === "yellow") return "MÉDIO RISCO";
      else if (color === "blue" || color === "bg-slate-300")
        return "BAIXO RISCO";
      return "ALTO RISCO";
    };

    for (let divClass of divClasses) {
      cabecalho.classList.add(divClass);
    }

    for (let btnClass of btnClasses) {
      button.classList.add(btnClass);
    }

    for (let formClass of formClasses) {
      content.classList.add(formClass);
    }
    const elemetTemplate = ` <section class=" p-2 flex row wrap w-99  h-90   my-2 ">
                <div class="inputModal" id="idModal">
                  <label>ID</label>
                  <input type="text" class="disabled" placeholder="${id}" disabled>
                </div>
                 <div class="inputModal" id="alertModal">
                  <label>Alert</label>
                  <input id="newType" type="text" placeholder="${
                    tempId.type
                  }" required>
                </div>
                <div class="inputModal" id"plateModal">
                  <label>Vehicle plate</label>
                  <input id="newPlate" type="text" placeholder="${
                    tempId.licensePlate
                  }" required>
                </div>
                <div class="inputModal" id="operationModal">
                  <label>Operation</label>
                  <input id="newOperation" type="text" placeholder="${
                    tempId.operation
                  }" required>
                </div>
                
                <div class="inputModal" id="currentDateModal">
                  <label>Current Date</label>
                  <input type="text" name="disabled" placeholder="${
                    tempId.date
                  }" disabled>
                </div>
                <div class="inputModal" id="newDateModal">
                  <label>New Date</label>
                  <input id="newDate" type="date" placeholder="${
                    tempId.date
                  }" required>
                </div>
                <div class="inputModal" id="currentHourModal">
                  <label>Current Hour</label>
                  <input type="text" placeholder="${tempId.myHour}" disabled>
                </div>
                <div class="inputModal" id="newHourModal">
                  <label>New Hour</label>
                  <input id="newHour" type="time" placeholder="${
                    tempId.myHour
                  }" required>
                </div>
                <div class="inputModal" id="auditModal">
                  <label>Audited</label>
                  <input id="newAudit" type="text" class="${
                    tempId.audit ? "isColorAudit" : "notColorAudit"
                  }" placeholder="${tempId.audit}">
                </div>
                <div class="inputModal" id="levelModal" >
                  <label>Level</label>
                  <input type="text" class="color-${
                    tempId.nivel
                  }" placeholder="${getLevel(tempId.nivel)}" disabled>
                </div>
                <div class="inputModal" id="countlModal">
                  <label>Quanty</label>
                  <input  type="text"placeholder="${tempId.quant}" disabled>
                </div>
              </section>
             
              <aside class=" vh-11 w-full flex col-reverse">
                <div class="flex row  reverse w-full right-0 align-end">
                   <input id="btnModalSave" type="submit" onclick="saveModalUpdate(${
                     tempId.id
                   })"  value="Save">
                   <input id="btnModalCancel" onclick="closeModalProfile(${
                     tempId.id
                   })" type="button" value="Cancel">
                </div>               
              </aside>
              `;

    content.innerHTML = elemetTemplate;
    tittle.classList.add("p-2");
    tittle.textContent = "Editar alerta ";
    button.classList.add("color-wht");
    button.textContent = "X";
    button.setAttribute("onclick", "closeModalProfile(" + Number(id) + ")");

    //content.textContent = `ID: ${id}`;
    cabecalho.appendChild(tittle);
    cabecalho.appendChild(button);
    modal.appendChild(cabecalho);
    modal.appendChild(content);
    containerMain.appendChild(modal);
    return tempId;
  }

  sort() {
    console.log("sort action");
    let count = 1;
    for (let tempItem of this.arrayAlerts) {
      tempItem.id = count++; //arruma id
    }
  }

  menu() {
    alert("Abrindo menu..");
  }

  link(link) {
    switch (link) {
      case "audit":
        window.location.pathname = "src/upgrade/v1.0.3.html";
        break;
      case "profile":
        window.location.pathname = "src/upgrade/aula01.html";
        break;
      case "settings":
        openModalProfile();
        break;
      case "logout":
        window.location.pathname = "src/index.html";
        break;
      case "logout":
        window.location.pathname = "../index.html";
        break;
      case "download":
        this.gerarJSONeDownload();
        break;
      default:
        window.location.pathname = "/";
        break;
    }
  }
}

function isLocalStorageSupported() {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
  } catch (e) {
    return false;
  }
}

function drawTable(array) {
  const trTable = document.getElementById("tbody");
  trTable.innerHTML = "";
  array.forEach(function (item) {
    var td_id = document.createElement("td");
    var td_nivel = document.createElement("td");
    var td_type = document.createElement("td");
    var td_plate = document.createElement("td");
    var td_filial = document.createElement("td");
    var td_date = document.createElement("td");
    var td_hour = document.createElement("td");
    var td_action = document.createElement("td");
    var tr = document.createElement("tr");
    var imgDel = document.createElement("img");
    var imgEdit = document.createElement("img");
    var inputAudit = document.createElement("input");
    const divNivel = document.createElement("div");

    imgEdit.src = "img/edit.png";
    imgEdit.setAttribute("onclick", "alerta.edit(" + Number(item.id) + ")");
    imgEdit.id = "img-edit";
    imgDel.src = "img/delete.png";
    imgDel.id = "img-del";
    imgDel.setAttribute("onclick", "alerta.delete(" + Number(item.id) + ")");
    inputAudit.setAttribute("onclick", "alerta.audit(" + Number(item.id) + ")");
    inputAudit.type = "checkbox";
    inputAudit.classList.add("h-25");
    inputAudit.classList.add("wpx-25");
    tr.id = `row-${item.id}`;
    tr.class = `row-${item.id}`;
    inputAudit.id = "check-audit";

    if (item.audit) {
      td_action.classList.add("green");
      inputAudit.disabled = true;
      inputAudit.checked = true;
    } else {
      inputAudit.disabled = false;
      inputAudit.checked = false;
    }

    td_action.classList.add("center");
    td_action.classList.add("wpx-5");

    divNivel.classList.add(item.nivel);
    //divNivel.classList.add('border-none');
    divNivel.classList.add("b-radius-50");
    divNivel.classList.add("nivel");
    divNivel.classList.add("ppx-10");
    divNivel.classList.add("crit-status");
    divNivel.classList.add("margin-auto");

    td_id.textContent = item.id;
    divNivel.textContent = item.quant;
    td_type.textContent = item.type;
    td_filial.textContent = item.operation;
    td_plate.textContent = item.licensePlate;
    td_date.textContent = item.date;
    td_hour.textContent = item.myHour;
    //td_nivel.textContent = "*";divNivel.classList.add('margin-auto');

    td_action.appendChild(imgEdit);
    td_action.appendChild(imgDel);
    td_action.appendChild(inputAudit);
    td_nivel.appendChild(divNivel);

    tr.appendChild(td_id);
    tr.appendChild(td_nivel);
    tr.appendChild(td_type);
    tr.appendChild(td_plate);
    tr.appendChild(td_filial);
    tr.appendChild(td_date);
    tr.appendChild(td_hour);
    tr.appendChild(td_action);

    trTable.appendChild(tr);
  });
}

function gerarJSONeDownload() {
  var dataAtual = new Date();
  var dia = dataAtual.getDate();
  var mes = dataAtual.getMonth() + 1;

  // Converter o JSON para CSV usando a biblioteca PapaParse
  var csv = Papa.unparse(myReceiveData);

  // Criar um novo Blob com o conteúdo CSV
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

  // Nome do arquivo Excel que será baixado
  var nomeArquivo = `dados_systrat${dia}-${mes}-Usuario:${getLocalStorage('userValid').name}.csv`;
  console.log(`Dowonload arqSysTrat: ${dia}-${mes}`);
  // Fazer o download do arquivo Excel usando a biblioteca FileSaver
  saveAs(blob, nomeArquivo);
}

function getUser(op) {
  const user = {
    name: "Wildes Sousa",
    avatar: "",
    lunchTime: "21:00",
  };
  localStorage.setItem("user", JSON.stringify(user));
  var myUser = JSON.parse(localStorage.getItem("user"));

  switch (op) {
    case "name":
      return myUser.name;
    case "avatar":
      return myUser.avatar;
    case "break":
      return myUser.lunchTime;
    default:
      return null;
  }
}

const alerta = new Alerta(myReceiveData);

const upDateAudit = () => {
  if (item.audit) {
    td_action.classList.add("green");
    inputAudit.disabled = true;
    inputAudit.checked = true;
  } else {
    inputAudit.disabled = false;
    inputAudit.checked = false;
  }
};

/*function user(op) {
  document.getElementById("login-name").innerHTML = getUser(op);
}*/

function salvarLocalStorage(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

function getLocalStorage(chave) {
  return JSON.parse(localStorage.getItem(chave));
}

function clear(obj) {
  const dataAtual = new Date();
  let aux_day = dataAtual.getDate();
  let aux_hour = dataAtual.getHours();

  let limpar = confirm("Deseja continuar com esta ação?");
  let passwd = prompt("Password:\n");

  if (limpar && passwd === `${aux_hour}545187${aux_day}`) {
    obj.clearLocalstorage("myArray");
    obj.clearLocalstorage("yawn");
    obj.clearLocalstorage("score");
    obj.clearLocalstorage("display");
    localStorage.setItem("currentCount", 1);
    alert(`✅Sucesso!!\n\nDados apagados com sucesso! Atualize a tabela.`);
  } else {
    alert(`❓Erro..\n\nInsira a senha corretamente.`);
    return;
  }
}

function reloadPage() {
  document.getElementById("tbody").innerHTML = "";
  alerta.listTable(getLocalStorage("myArray"));
}

function openModal() {
  //createModal(id);
  document.getElementById("modal").classList.remove("disable");

  document.getElementById("modal").classList.add("active");
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");

  document.getElementById("modal").classList.add("disable");
}

function openModalProfile(id) {
  document.getElementById(`close-profile${id}`).classList.remove("disable");

  document.getElementById(`close-profile${id}`).classList.add("active");
}

function closeModalProfile(id) {
  document.getElementById(`close-profile${id}`).classList.remove("active");

  document.getElementById(`close-profile${id}`).classList.add("disable");

  document.getElementById(`close-profile${id}`).remove();
}

const saveModalUpdate = (idUpdate) => {
  //alert("!!MANUTENÇÂO!!\n\nEsta função ainda está em construção...\n");
  const itemForUpdate = getLocalStorage("myArray").find(
    (item) => item.id === idUpdate
  );
  console.log(idUpdate, ":", itemForUpdate);
  alerta.checkField(itemForUpdate);
};

function displayAllGroupAlerts() {
  const currentData = getLocalStorage("myArray");
  document.getElementById("tbody").innerHTML = "";
  const group = document.querySelector('input[name="alerta"]:checked').value;
  const filterForGroup = currentData.filter(function (item) {
    return item.type === group.toUpperCase();
  });
  drawTable(filterForGroup);
}

function showListElements() {
  let elementSearching = document.getElementById("busca").value;
  
  let xxx = takeOutSpace(elementSearching).toUpperCase();
  elementSearching = elementSearching.toUpperCase();
  const radioSelected = document.querySelector(
    'input[name="alerta"]:checked'
  ).value;

  let listSearching;
  document.getElementById("tbody").innerHTML = "";
  document.getElementById("busca").value = "";

  if (radioSelected === "atenção") {
    listSearching = searchSametype(radioSelected);
  } else if (radioSelected === "ausência") {
    listSearching = searchSametype(radioSelected);
  } else if (radioSelected === "bocejo") {
    listSearching = searchSametype(radioSelected);
  } else if (radioSelected === "celular") {
    listSearching = searchSametype(radioSelected);
  } else if (radioSelected === "cigarro") {
    listSearching = searchSametype(radioSelected);
  } else if (radioSelected === "sonolência n1") {
    listSearching = searchSametype(radioSelected);
  }else if (radioSelected === "camera coberta") {
    listSearching = searchSametype(radioSelected);
  }

  if (elementSearching !== ''){
    listSearching  = searchExpecificAlert(xxx);
  }else{
    const divWarning = document.getElementById("tbody");
    if (divWarning.innerHTML === ' ') {
      const warning = document.createElement("td");
      warning.textContent = "NOT FOUND";
      warning.style.backgroundColor = "rgba(148, 163, 184, .2)";
      warning.style.position = "absolute";
      warning.classList.add("center");
      warning.classList.add("color-indigo-700");
      warning.style.width = "99.5%";
      warning.style.height = "35px";
      divWarning.appendChild(warning);
      return;
    }
  }
  //console.log(listSearching);
  drawTable(listSearching);
}

const searchSametype = (type) => {
  let listSearching = getLocalStorage("myArray").filter(function (props) {
    return props.type === type;
  });
  return listSearching;
}
const searchExpecificAlert = (plate) => {
  let listSearching = getLocalStorage("myArray").filter(function (props) {
    return props.licensePlate === plate;
  });
  return listSearching;
}

const takeOutSpace = (str) => { //retira espaços em branco
  //let auxElementSearched = Array.from(str);
  let strDefault = str.replace(/\s/g, '');
  console.log(strDefault);
  return strDefault;
}

function enableAction(obj) {
  document.getElementById("search").addEventListener("click", showListElements);

  document
    .getElementById("clearTable")
    .addEventListener("click", () => clear(obj));

  document.getElementById("updateTable").addEventListener("click", reloadPage);

  document.getElementById("tbody").addEventListener("onchange", reloadPage); //unavailable

  document
    .getElementById("campo-alerta")
    .addEventListener("click", displayAllGroupAlerts);
  
  document
    .getElementById("sort-alert")
    .addEventListener("click", displayAlertsSorted);

  document
    .getElementById("back-form")
    .addEventListener("click", () => window.location.pathname = "src/index.html");

  document
    .getElementById("search")
    .addEventListener("onmouseenter", function () {
      document.getElementById("campo-alerta").classList.add("bg-indigo-200"); //unavailable
    });

  /*document
    .getElementById("btnModalCancel")
    .addEventListener("click", closeModal);*/
}
const showUserName = () => {
  const userValid = getLocalStorage("userValid");
  console.log(`Bem Vindo: ${userValid.name}!`);
  document.getElementById("login-name").innerHTML = `Olá ${userValid.name}!`;
}

const displayAlertsSorted = () => {
    const currentData = getLocalStorage("myArray");
   // document.getElementById("tbody").innerHTML = "";
  
    let drawn = document.querySelector('input[name="sort"]:checked').value;
    
    var filterForSort;
    let title = `Ordenação por ${drawn}`;
    //alert(drawn);
  
    if (drawn === "Placa") {
      filterForSort = currentData.filter( item => {
        return item.licensePlate;
      });
      filterForSort.sort(function(a,b) {
          if(a.licensePlate < b.licensePlate) return -1;
          if(a.licensePlate > b.licensePlate) return 1;
          return 0;
      });
    } else if (drawn === "Filial") {
      filterForSort = currentData.filter(function (item) {
        return item.operation;
      });
      filterForSort.sort(function(a,b) {
          if(a.operation < b.operation) return -1;
          if(a.operation > b.operation) return 1;
          return 0;
      });
    } else if (drawn === "Tipo Alerta") {
      filterForSort = currentData.filter(function (item) {
        return item.type;
      });
      filterForSort.sort(function(a,b) {
          if(a.type < b.type) return -1;
          if(a.type > b.type) return 1;
          return 0;
      });
    } else if (drawn === "Horário") {
      filterForSort = currentData.filter(function (item) {  
        return  (item.myHour);
      });
      filterForSort.sort(function(a,b) {
          if(a.myHour > b.myHour) return -1;
          if(a.myHour < b.myHour) return 1;
          return 0;
      });
    }else {
      filterForSort = item;
    }
    drawTable(filterForSort);
    document.getElementById('title-sort').innerHTML = title;
    //return filterForSort;
}

function compare(a,b) {
  if (a.nome < b.nome)
     return -1;
  if (a.nome > b.nome)
    return 1;
  return 0;
}

function start(run) {
  if (run) {
    //alert('Start');
    alerta.listTable(myReceiveData);
    enableAction(alerta);
    showUserName();
    //displayAlertsSorted();
    //drawTable(myReceiveData);
    console.log("2 => access allowed");
    //reloadPage();
  } else {
    document.getElementById("title-display").innerText = "acess denield";
    document.getElementById("main").classList.add("start");
    const denield = document.getElementById("acess-denield");
    const container = document.createElement("div");
    container.innerHMTL = `<h2 class="flex jc-center p-2 color-wht h-20">ACESS DENIELD</h2>`;
    denield.appendChild(container);
    console.log("acess denield");
  }
}

start(getLocalStorage("login").login);
