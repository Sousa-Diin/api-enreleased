
const idQuantidadeDeAlertas = getLocalStorage("repeation") ?? {};

//////////////////////*CLASSE ALERTA*\\\\\\\\\\\\\\\\\\\\\\\\\

class Alerta {
  constructor() {
    this.id = null;
    this.quant = 1;
    this.audit = false;
    this.arrayAlerts = [];
    //this.arrayAudit = [];
  }

  search(id) {
    alert(`Buscando ID - ${id}`);
  }

  delete(id) {
    const clearAlerta = this.arrayAlerts.find((a) => a.id === id);
    alert(`Deletando ID - ${id}\n Alerta encontrado: ${clearAlerta.licensePlate}
    `);
  }

  save() {
    let myalert = this.readData();
    if (this.checkField(myalert)) {
      this.addAlert(myalert);
    }
  }

  saveLocalStorage(nivel) {
    getTot();
    let myalert = this.readData(nivel);

    if (localStorage.myArray) {
      this.arrayAlerts = JSON.parse(localStorage.getItem("myArray"));
      //this.id = localStorage.getItem('myArray').id;
      console.log('Atualiza "ID": ', this.id);
    }

    if (this.checkField(myalert)) {
      let newItem = myalert;
      this.addAlert(newItem);
    }
    localStorage.myArray = JSON.stringify(this.arrayAlerts);
    return myalert;
  }

  clear() {
    alert("Limpando os Dados");
  }

  edit() {
    alert("Editando os Dados");
    //let siderBar = document.getElementById('siderBar');
  }

  addAlert(myalert) {
    this.arrayAlerts.push(myalert);
    myalert.id = this.arrayAlerts.length; //id
    if (this.arrayAlerts.length > 1) {
      this.equals(myalert);
    }
    let listYawn = this.arrayAlerts.filter(function (yawn) {
      return yawn.type === "BOCEJO";
    });

    salvarLocalStorage("yawn", listYawn);
    salvarLocalStorage("totAlert", this.arrayAlerts.length);

    //console.log(`Objeto: ${JSON.stringify(myalert)}`);
    //console.log('Array: ', this.arrayAlerts);
  }

  equals(obj1) {
    let count = 0; // very important

    const arrayObjAux = getLocalStorage("myArray").filter((obj2) => {
      return obj2.type === obj1.type;
    });

    const arrayPlateAux = arrayObjAux.filter((obj) => {
      console.log("Teste de iguadade");
      count++;
      return obj.licensePlate === obj1.licensePlate;
    });

    salvarLocalStorage("currentCount", arrayPlateAux.length + 1);
    //return arrayPlateAux.length > 1 ? true: false;
  }

  readData(nivel) {
    var currentDate = new Date();
    var hour = currentDate.getHours();
    var minutes = currentDate.getMinutes();

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    var alt = document.getElementById("autocomplete-alerta").value;
    const filial = document.getElementById("autocomplete-filial").value;
    const plate = takeOutSpace(document.getElementById("placa").value);

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var warning = {}; // recebe obj vazio in start

    warning.id = this.id;
    warning.type = document.getElementById("autocomplete-alerta").value;
    warning.licensePlate = plate;
    warning.nivel = nivel;
    warning.operation = alt === 'Incident' ? findsOperation(plate.toUpperCase()) : filial; //update 21/11/2023
    warning.quant = this.quant;
    warning.myHour = `${hour}:${minutes}`;
    warning.audit = this.audit;
    warning.date = `${year}-${month}-${day}`;

    warning.type = warning.type.toUpperCase();
    warning.licensePlate = warning.licensePlate.toUpperCase();
    warning.operation = warning.operation.toUpperCase();

    /*var rp = this.countDuplicatesByKeys('type', 'licensePlate');
    alert(`Repetição: ${JSON.stringify(rp,null,2)}`);*/
    console.log("Data to Obj: ", warning);

    return warning;
  }

  checkField(myalert) {
    let myMsg = "";

    if (myalert.type === "") {
      myMsg += "- Informe o tipo do alerta.\n";
    }
    if (myalert.licensePlate === "") {
      myMsg += "- Informe a placa do veículo.\n";
    }
    if (myalert.operation === "") {
      myMsg += "- Informe o nome da filial.\n";
    }

    if (myMsg != "") {
      alert(myMsg);
      return false;
    }

    return true;
  }

  menu() {
    alert("Abrindo menu..");
  }

  countDuplicatesByKeys(key1) {
    let array = getLocalStorage("yawn");
    const counts = {};

    for (const item in array) {
      // deu erro dia 08/10/23 troquei of para in
      const key = item[key1];

      /*const keyValue2 = item[key2];
      const keyPair = `${keyValue1}-${keyValue2}`;*/

      //let count = (counts[arrumaQuant.id] || 0) + 1;
      //counts[key] = count;

      counts[key] = (counts[key] || 0) + 1;
    }
    salvarLocalStorage("countsYawn", counts);
    return counts;
  }

  showAudit() {
    if (localStorage.audit) {
      this.arrayAudit = JSON.parse(localStorage.getItem("audit"));
    }

    localStorage.audit = JSON.stringify(this.arrayAudit, null, 3);
    document.getElementById("myAudit").innerHTML = this.arrayAudit;
  }
}

function incrementarQuantidadeAlerta(idAlerta) {
  idQuantidadeDeAlertas[idAlerta]++;
  salvarLocalStorage("repeation", idQuantidadeDeAlertas);
}

var objAlerta = new Alerta();

//objAlerta.showAudit();

let placa = "XXXXX",
  filial = "----";

let myPlaca = `${placa}`,
  myFilial = `${filial}`,
  myQtdBocejo = `${qtd_bocejo}`;

var enviar = false;
const alerta = {
  bocejo:
    "Evento de Bocejo, conforme segue foto abaixo. " +
    "Motorista bocejando diversas vezes, aparentando sonolência. \n\n" +
    "Favor verificar a condição do motorista, para seguir viagem.\n\n",
  FadigaN1:
    "Evento de Fadiga N1, conforme segue foto abaixo.\n\n" +
    "Favor comunicar, instruir e solicitar a parada do motorista por 30 minutos em um local seguro.\n\n",
  FadigaN2:
    "Evento de Fadiga N2, conforme segue foto abaixo.\n\n" +
    "Favor comunicar, instruir e solicitar a parada do motorista por 60 minutos em um local seguro.\n\n",
  atencao:
    "Evento de Atenção, conforme segue foto abaixo. " +
    "Motorista desviando a atenção durante a condução.\n\n " +
    "Favor comunicar, instruir e Tratar junto ao responsável.\n\n",
  ausencia:
    "Evento de Ausência, conforme segue foto abaixo. " +
    "Favor solicitar Reposicionamento da câmera.\n\n" +
    "Motorista desviando seu rosto do foco da câmera.\n\n",
  celular:
    "Evento de utilização de Celular, conforme segue foto abaixo.\n" +
    "Favor comunicar, instruir e tratar junto ao responsável.\n" +
    "De acordo com o artigo 252 do Código de Trânsito Brasileiro (CTB), é proibido usar o celular ao volante," +
    "mesmo com os fones de ouvido.",
  cameraCoberta:
    "Evento de Câmera Coberta, conforme segue foto abaixo.\n" +
    "Favor comunicar, instruir desobstrução da Câmera e Tratar junto ao responsável. ",
  cigarro:
    "Evento de Cigarro, conforme segue foto abaixo.\n" +
    "Motorista infringindo as normas da empresa.\n" +
    "Favor comunicar, instruir e tratar junto ao responsável.",
  gestoObceno:
    "Evento de Atenção, conforme segue foto abaixo.\n" +
    "Motorista fazendo gestos obscenos.\n\n" +
    "Favor comunicar, instruir e tratar junto ao responsável. ",
  palavraBC:
    "Evento de Atenção, conforme segue foto abaixo." +
    "Motorista citando palavras de baixo calão.\n\n" +
    "Favor comunicar, instruir e tratar junto ao responsável. ",
  semCinto:
    "Evento de Atenção, Conforme segue foto abaixo.\n\n" +
    "Motorista não está utilizando o cinto de segurança.\n\n" +
    "Favor comunicar, instruir a utilização do Cinto e tratar junto ao responsável.\n\n" +
    "Art. 167\n" +
    "Deixar o condutor de usar o cinto de segurança, conforme previsto no art. 65:\n" +
    "Infração – grave;\n" +
    "Penalidade – multa - R$ 195,23 e 5 pontos;\n" +
    "Medida administrativa - retenção do veículo até colocação do cinto pelo infrator.\n",
  undefined: "O tipo de alerta não existe. ",
};

/*
    Ajsute tecnico para usar no e-mail Outlook
*/

const email = {
  anglo: {
    group: '',
    assunto: "Alerta CCI Fadiga",
  },
  bracell: {
    group: '',
    assunto: "Alerta CCI Fadiga",
  },
  cenibra: {
    group: '',
    assunto: "Alerta CCI Fadiga",
  },
  cmpc: {
    group: '',
    assunto: "Alerta CCI Fadiga",
  },
  costaRica: {
    group: '',
    assunto: "Alerta CCI Fadiga",
  },
  furlan: {
    group: '',
    assunto: "Alerta CCI Fadiga",
  },
  aracruz: {
    group: '',
    assunto: "Alerta CCI Fadiga",
  },
  limeira: {
    group: '',
    assunto: "Alerta CCI Fadiga",
  },
  seteLagoas: {
    group: '',
    assunto: "Alerta CCI Fadiga",
  },
  mmi: {
    group: '',
    assunto: "Alerta CCI Fadiga",
  },
  tresLagoas: {
    group: '',
    assunto: "Alerta CCI Fadiga",
  },
  zilor: {
    group: '',
    assunto: "Alerta CCI Fadiga",
  },
};

const alrode = [
  "RT0824",
  "RT0826",
  "RT0831",
  "TT4047",
  "TT4048",
  "TT4049",
  "TT4050",
  "TT4051",
  "TT4052",
  "TT4053",
  "TT4054",
  "TT4055",
  "TT4056",
];
const bara = [
  "RT0823",
  "RT0825",
  "RT0827",
  "RT0830",
  "RT0832",
  "RT0833",
  "RT0619",
  "RT0129",
  "TT2619",
  "TT2838",
  "TT4057",
  "TT4076",
  "TT4079",
  "TT4077",
  "TT4080",
  "TT4082",
  "TT4084",
  "TT4085",
  "TT4086",
  "TT4087",
  "TT4088",
  "TT4089",
  "TT4090",
  "TT4091",
  "TT4092",
  "TT4093",
  "TT4094",
];
const rustemburg = [
  "RT0822",
  "RT0828",
  "RT0829",
  "RT0834",
  "TT4095",
  "TT4096",
  "TT4097",
  "TT4098",
  "TT4099",
  "TT4100",
  "TT4101",
  "TT4102",
  "TT4103",
  "TT4104",
  "TT4105",
  "TT4106",
];

function chooseEmail(op) {
  //var destinatario = {};
  switch (op) {
    case "Anglo":
      document.getElementById(
        "fdest"
      ).innerHTML = `${email.anglo.assunto} - ${op}`;
      break;
    case "Aracruz":
      document.getElementById(
        "fdest"
      ).innerHTML = `${email.aracruz.assunto} - ${op}`;
      break;
    case "Bracell":
      document.getElementById("fdest").innerHTML = `${
        email.bracell.assunto
      } - ${op.toUpperCase()}`;
      break;
    case "Cenibra":
      document.getElementById("fdest").innerHTML = `${
        email.cenibra.assunto
      } - ${op.toUpperCase()}`;
      break;
    case "Cmpc":
      document.getElementById("fdest").innerHTML = `${
        email.cmpc.assunto
      } - ${op.toUpperCase()}`;
      break;
    case "Costa Rica":
      document.getElementById(
        "fdest"
      ).innerHTML = `${email.costaRica.assunto} - ${op}`;
      break;
    case "Furlan":
      document.getElementById(
        "fdest"
      ).innerHTML = `${email.furlan.assunto} - ${op}`;
      break;
    case "Limeira":
      document.getElementById(
        "fdest"
      ).innerHTML = `${email.limeira.assunto} - ${op}`;
      break;
    case "MMI":
      document.getElementById("fdest").innerHTML = `${
        email.mmi.assunto
      } - ${op.toUpperCase()}`;
      break;
    case "Sete Lagoas":
      document.getElementById(
        "fdest"
      ).innerHTML = `${email.seteLagoas.assunto} - ${op}`;
      break;
    case "Três Lagoas":
      document.getElementById(
        "fdest"
      ).innerHTML = `${email.tresLagoas.assunto} - ${op}`;
      break;
    case "Rodoviário":
      document.getElementById("fdest").innerHTML = "sem email";
      break;
    case "Zilor":
      document.getElementById(
        "fdest"
      ).innerHTML = `${email.zilor.assunto} - ${op}`;
      break;
    case "África":
      document.getElementById("fdest").innerHTML = "WHATSAPP";
      break;
  }
}

function limparCampos() { // upadate at 06/01/2024
  let apagar = notie.confirm({ 
    text:"Tem certeza que deseja apagar todos os campos preechidos?",
    submitText: "Sim", // optional, default = 'Yes'
    cancelText: "Não", 
    submitCallback: function () {
      tempclear();
      notie.alert({ type: 2, text: 'Campos apagados com sucesso.', time: 2 })
    }
    
  });
}

function tempclear() {
  document.getElementById("autocomplete-alerta").value = "";
  document.getElementById("placa").value = "";
  document.getElementById("autocomplete-filial").value = "";
    //document.getElementById("qtd_bocejo").value = "";
  document.getElementById("fassunto").innerHTML = "";
  document.getElementById("fdest").innerHTML = "";
  document.getElementById("message-goawake").innerHTML = "";
  document.getElementById("message-email").innerHTML = "";
  /* document.getElementById("message-goawake").innerHTML = "Observações";
  document.getElementById("message-email").innerHTML = "Display message"; */
}

function apagarTodosDadosDisplay() {
  const btnLimparCampos = document.getElementById("limparCampos");
  btnLimparCampos.addEventListener("click", limparCampos);
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
function carregarDados() {
  let alertas;

  if (isLocalStorageSupported()) {
    const dadosJSON = localStorage.getItem("myArray");
    if (dadosJSON !== null) {
      alertas = JSON.parse(dadosJSON);
    } else {
      alertas = []; //OBJ VAZIO
    }
  } else {
    alertas = []; //OBJ VAZIO
  }

  return alertas;
}

/*Tratativa: Motorista bocejando diversas vezes, aparentando sonolência. 
Favor verificar a condição do motorista, para seguir viagem*/

function getTot() {
  showTotOfAlertList();
  return (document.getElementById("qtd_bocejo").value = Number(
    getLocalStorage("totAlert")
  ));
}

var dados = getLocalStorage("myArray");

const toCompare = (compareted) => {
  const objYawn = getLocalStorage("myArray").filter(function (props) {
    return props.type === "Bocejo";
  });

  const objYawn2 = objYawn.filter((obj) => {
    return obj.licensePlate === compareted;
  });

  console.log("Teste toCampare: ", objYawn2);
};

function msg() {
  getTot();
  localStorage.currentCount = 0;
  var displayMessage = {};

  var alt = document.getElementById("autocomplete-alerta").value;
  auxAlt = alt; //removeSpecialCharSimple(alt);
  placa =  takeOutSpace(document.getElementById("placa").value);
  filial = document.getElementById("autocomplete-filial").value;
  //document.getElementById("qtd_bocejo").value = 1;

  let nivel = "bg-slate-300";
  var auxEmail = filial;
  alt = alt.toUpperCase();
  placa = placa.toUpperCase();
  filial = filial.toUpperCase();

  let system_de_fadiga = filial === "MMI" ? "SIGHRA" : "GOAWAKE";
  
  if (auxAlt === "Bocejo") {
    var rp = objAlerta.countDuplicatesByKeys("licensePlate");
    let count = Number(getLocalStorage("currentCount")); // Contador de bocejos Obs: Verificar erro variavél não esta sendo atualizado nessa estagio
    const message_email_body = '-> Sempre enviar após a 3º ocorrência dentro do turno com o Comunicado de Alerta;\n\n-> Em casos não procedentes - Invalidar o Alerta.';
    if(count >= 3 || filial === 'CMPC'){
      chooseEmail(auxEmail);

      document.getElementById(
        "fassunto"
      ).innerHTML = `ALERTA ${system_de_fadiga} - BOCEJO / ${placa} - ${filial}`;
      document.getElementById("message-email").innerHTML = `${getSaudacao()}${
        alerta.bocejo
      }`;
      checkYawn();

      displayMessage.message = `${getSaudacao()}${alerta.bocejo}`;
      displayMessage.subject = `ALERTA ${system_de_fadiga} - BOCEJO / ${placa} - ${filial}`;
      //.comments = phrase;
      
    }else{
      document.getElementById("message-email").innerHTML = message_email_body;
      document.getElementById("message-goawake").innerHTML =
        "Reportado para a operação. Motorista Bocejando. ";

      displayMessage.message = message_email_body;
      document.getElementById(
        "fassunto"
      ).innerHTML = '';
      document.getElementById(
        "fdest"
      ).innerHTML = '';
      //displayMessage.comments = "Reportado para a operação. Motorista Bocejando. ";
    }
    
    enviar = true;
    nivel = "blue";
  } else if (auxAlt === "Incident") {
    document.getElementById(
      "message-email"
    ).innerHTML = `Observação copiar corpo do e-mail e enviar para oeração junto com PDF & Video`;
    document.getElementById("message-goawake").innerHTML = "Empty";
    document.getElementById("fassunto").innerHTML = `Vazio`;
    let operation = findsOperation(placa); //24/10/2023 add new function
    document.getElementById("fdest").innerHTML = operation;
    displayMessage.message = "Empty";
    displayMessage.subject = operation;
    displayMessage.comments =
      "Observação copiar corpo do e-mail e enviar para oeração junto com PDF & Video";

    enviar = true;
    nivel = "red";
    // objAlerta.showAudit(); 25/08/2023
  } else if (auxAlt === "Sonolência N1") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.FadigaN1
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado para a operação. Motorista apresentando sonolência. Realizar a parada de 30 minutos. Em local seguro.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - FADIGA N1 / ${placa} - ${filial}`;
    /*document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
    displayMessage.message = `${getSaudacao()}${alerta.FadigaN1}`;
    displayMessage.subject = `ALERTA ${system_de_fadiga} - FADIGA N1 / ${placa} - ${filial}`;
    displayMessage.comments =
      "Reportado para Reportado para a operação. Motorista apresentando sonolência. Realizar a parada de 30 minutos. Em local seguro.";
    chooseEmail(auxEmail);
    /* alert("Lembrar de extrair o PDF"); */
    notie.alert({ type: 'info', text: 'Lembrar de extrair o PDF' });
    enviar = true;
    nivel = "red";
    // objAlerta.showAudit(); 25/08/2023
  } else if (auxAlt === "Sonolência N2") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.FadigaN2
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado para a operação. Motorista apresentando sonolência. Realizar a parada de 60 minutos. Em local seguro.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - FADIGA N2 / ${placa} - ${filial}`;
    /* document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
    displayMessage.message = `${getSaudacao()}${alerta.FadigaN2}`;
    displayMessage.subject = `ALERTA ${system_de_fadiga} - FADIGA N2 / ${placa} - ${filial}`;
    displayMessage.comments =
      "Reportado para a operação. Motorista apresentando sonolência. Realizar a parada de 60 minutos. Em local seguro.";
    chooseEmail(auxEmail);
    enviar = true;
    nivel = "red";
    //objAlerta.showAudit(); 25/08/2023
  } else if (auxAlt === "Atenção") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.atencao
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado. Motorista desviando a atenção durante a condução.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - ATENÇÃO / ${placa} - ${filial}`;
    /*document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
    displayMessage.message = `${getSaudacao()}${alerta.atencao}`;
    displayMessage.subject = `ALERTA ${system_de_fadiga} - ATENÇÃO / ${placa} - ${filial}`;
    displayMessage.comments =
      "Reportado. Motorista desviando a atenção durante a condução.";
    chooseEmail(auxEmail);
    enviar = true;
    nivel = "yellow";
  } else if (auxAlt === "Ausência") {
    const monitoring = ` Monitorado. Câmera deslocada.\n
      Reportado para a operação. Câmera deslocada/desajustada.\n
      Reportado para a operação. Câmera coberta, sem visualização de imagens.\n
      Monitorado. Câmera desajustada.
      Reportado para a operação. Câmera desajustada.
      Reportado para a operação. Motorista desviando seu rosto do foco da câmera.
      Reportado para a operação. Motorista fora da cabine. `;
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.ausencia
    }`;
    document.getElementById("message-goawake").innerHTML = monitoring;
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - AUSÊNCIA / ${placa} - ${filial}`;
    displayMessage.message = `${getSaudacao()}${alerta.ausencia}`;
    displayMessage.subject = `ALERTA ${system_de_fadiga} - AUSÊNCIA / ${placa} - ${filial}`;
    displayMessage.comments = monitoring;
    chooseEmail(auxEmail);
    enviar = true;
    nivel = "blue";
    if (enviar) {
      //alert("Condição válida.");
    }
  } else if (auxAlt === "Celular") {
    const reported =
      "Reportado para a operação. Motorista utilizando celular durante sua condução. Infringindo as normas da Empresa.";
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.celular
    }`;
    document.getElementById("message-goawake").innerHTML = reported;
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - CELULAR / ${placa} - ${filial}`;
    displayMessage.message = `${getSaudacao()}${alerta.celular}`;
    displayMessage.subject = `ALERTA ${system_de_fadiga} - CELULAR / ${placa} - ${filial}`;
    displayMessage.comments = reported;
    chooseEmail(auxEmail);
    enviar = true;
    nivel = "yellow";
  } else if (auxAlt === "Câmera Coberta") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.cameraCoberta
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado para a operação. Câmera coberta, sem visualização de imagens.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - CÂMERA COBERTA / ${placa} - ${filial}`;
    displayMessage.message = `${getSaudacao()}${alerta.cameraCoberta}`;
    displayMessage.subject = `ALERTA ${system_de_fadiga} - CÂMERA COBERTA / ${placa} - ${filial}`;
    displayMessage.comments =
      "Reportado para a operação. Câmera coberta, sem visualização de imagens.";
    /*document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
    chooseEmail(auxEmail);
    enviar = true;
  } else if (auxAlt === "Cigarro") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.cigarro
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado para a operação. Motorista fumando durante sua condução. Infringindo as normas da Empresa.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - CIGARRO / ${placa} - ${filial}`;
    /*document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
    displayMessage.message = `${getSaudacao()}${alerta.cigarro}`;
    displayMessage.subject = `ALERTA ${system_de_fadiga} - CIGARRO / ${placa} - ${filial}`;
    displayMessage.comments =
      "Reportado para a operação. Motorista fumando durante sua condução. Infringindo as normas da Empresa.";
    chooseEmail(auxEmail);
    enviar = true;
    nivel = "yellow";
  } else if (auxAlt === "Gesto Obceno") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.gestoObceno
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado para a operação. Motorista fazendo gestos obscenos.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - GESTO OBCENO / ${placa} - ${filial}`;
    displayMessage.message = `${getSaudacao()}${alerta.gestoObceno}`;
    displayMessage.subject = `ALERTA ${system_de_fadiga} - GESTO OBCENO / ${placa} - ${filial}`;
    displayMessage.comments =
      "Reportado para a operação. Motorista fazendo gestos obscenos.";
    chooseEmail(auxEmail);
    enviar = true;
    nivel = "yellow";
  } else if (auxAlt === "Palavra de Baixo Calão") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.palavraBC
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado para a operação. Motorista citando palavras de baixo calão.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - ATENÇÃO / ${placa} - ${filial}`;
    /*document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
    displayMessage.message = `${getSaudacao()}${alerta.palavraBC}`;
    displayMessage.subject = `ALERTA ${system_de_fadiga} - ATENÇÃO / ${placa} - ${filial}`;
    displayMessage.comments =
      "Reportado para a operação. Motorista citando palavras de baixo calão.";
    chooseEmail(auxEmail);
    enviar = true;
    nivel = "yellow";
  } else if (auxAlt === "Sem Cinto") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.semCinto
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado para a operação. Motorista não está utilizando o cinto de segurança.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - ATENÇÃO / ${placa} - ${filial}`;
    //document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;
    displayMessage.message = `${getSaudacao()}${alerta.semCinto}`;
    displayMessage.subject = `ALERTA ${system_de_fadiga} - ATENÇÃO / ${placa} - ${filial}`;
    displayMessage.comments =
      "Reportado para a operação. Motorista não está utilizando o cinto de segurança.";
    chooseEmail(auxEmail);
    enviar = true;
    nivel = "blue";
  } else if (alerta == "" || placa == "" || filial == "") {
    alert("Entre com dados validos");
    enviar = false;
  } else {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.undefined
    }`;
    document.getElementById("message-goawake").innerHTML =
      "alerta undefined, sem messagem.";
    enviar = false;
  }
  if (enviar) {
    localStorage.setItem("started", JSON.stringify({ started: true }));
    //createDado(dados, alt, placa, filial, qtd_bocejo, hr);
    objAlerta.saveLocalStorage(nivel);
    /* alert("✅SUCESSO !!\n\nTratativa Concluída com sucesso!!."); */
    notie.alert({
      type:1,
      text: "✅SUCESSO !!\n\nTratativa Concluída com sucesso!!.",
      time: 5,
      position: "top"
    });;
    salvarLocalStorage("display", displayMessage);
    getTot();
    checkYawn();
  }

  // Limpa os campos da tratativas
  document.getElementById("autocomplete-alerta").value = "";
  document.getElementById("placa").value = "";
  document.getElementById("autocomplete-filial").value = "";
  console.log("Data to var: ", dados);
}

const checkYawn = () => {
  let alt = document.getElementById("autocomplete-alerta").value;
  let placa = document.getElementById("placa").value;
  let filial = document.getElementById("autocomplete-filial").value;
  
  let system_de_fadiga = filial === "MMI" ? "SIGHRA" : "GOAWAKE";
  let auxCount = Number(getLocalStorage("currentCount"));
  let count = auxCount === 0 
    ? 1 
    : auxCount;
  const reported = `Reportado para a operação. Motorista bocejando, apresentando sinais de sonolência. ${count}º ocorrência monitorada.`;
  const _message_comment_ = `Monitorado. Motorista bocejando,apresentando sinais de sonolência. ${count}º ocorrência monitorada.`;

  const auxDisplay = getLocalStorage('display') ?? {};//update 05/12/2023 error na func. principal
  
  if (alt === "Bocejo") {
    if(count >= 3 || filial === 'CMPC'){
      //alert('3 vezes');
      chooseEmail(filial);
      document.getElementById(
        "fassunto"
      ).innerHTML = `ALERTA ${system_de_fadiga} - BOCEJO / ${placa.toUpperCase()} - ${filial.toUpperCase()}`;
      document.getElementById("message-email").innerHTML = `${getSaudacao()}${
        alerta.bocejo
      }`;
      document.getElementById("message-goawake").innerHTML = reported;

      auxDisplay.message = `${getSaudacao()}${alerta.bocejo}`;
      auxDisplay.subject = `ALERTA ${system_de_fadiga} - BOCEJO / ${placa.toUpperCase()} - ${filial.toUpperCase()}`;
      auxDisplay.comments = reported;
    }else{
      document.getElementById("message-goawake").innerHTML = _message_comment_;
      
      auxDisplay.comments = _message_comment_;
      auxDisplay.message = '-> Sempre enviar após a 3º ocorrência dentro do turno com o Comunicado de Alerta;\n\n-> Em casos não procedentes - Invalidar o Alerta.';
      //auxDisplay.subject = '';
    }
    salvarLocalStorage('display', auxDisplay);
  }
  else if (alt === "Sonolência N1") {
    alert(`Warning of fatigue. ${count}º ocorrência monitorada.`);
    /* notie.alert({
      type:2,
      text:`Warning of fatigue. ${count}º ocorrência monitorada.`,
      position: 'bottom',
      time: 1,
    }); */
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.FadigaN1
    }`;
    document.getElementById("message-goawake").innerHTML =
      `Reportado para a operação. Motorista apresentando sonolência. Realizar a parada de 30 minutos. Em local seguro. ${count}º ocorrência monitorada.`;
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - FADIGA N1 /  ${placa.toUpperCase()} - ${filial.toUpperCase()}`;
    /*document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
      auxDisplay.message = `${getSaudacao()}${alerta.FadigaN1}`;
      auxDisplay.subject = `ALERTA ${system_de_fadiga} - FADIGA N1 /  ${placa.toUpperCase()} - ${filial.toUpperCase()}`;
      auxDisplay.comments =
     `Reportado para a operação. Motorista apresentando sonolência. Realizar a parada de 30 minutos. Em local seguro. ${count}º ocorrência monitorada.`;
  }
  else if (alt === "Sonolência N2") {
    alert(`Warning of fatigue. ${count}º ocorrência monitorada.`);
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.FadigaN2
    }`;
    document.getElementById("message-goawake").innerHTML =
      `Reportado para a operação. Motorista apresentando sonolência. Realizar a parada de 60 minutos. Em local seguro. ${count}º ocorrência monitorada.`;
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - FADIGA N2 /  ${placa.toUpperCase()} - ${filial.toUpperCase()}`;
    /*document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
      auxDisplay.message = `${getSaudacao()}${alerta.FadigaN2}`;
      auxDisplay.subject = `ALERTA ${system_de_fadiga} - FADIGA N2 /  ${placa.toUpperCase()} - ${filial.toUpperCase()}`;
      auxDisplay.comments =
     `Reportado para a operação. Motorista apresentando sonolência. Realizar a parada de 60 minutos. Em local seguro. ${count}º ocorrência monitorada.`;
  }
  salvarLocalStorage('display', auxDisplay);
  return count;
};

function exibirHorarioAtual() {
  var dataAtual = new Date();
  var hora = dataAtual.getHours();
  var minutos = dataAtual.getMinutes();
  var segundos = dataAtual.getSeconds();

  var myUser = JSON.parse(localStorage.getItem("user"));

  // Formatação do horário com zero à esquerda se necessário
  if (hora < 10) {
    hora = "0" + hora;
  }
  if (minutos < 10) {
    minutos = "0" + minutos;
  }
  if (segundos < 10) {
    segundos = "0" + segundos;
  }

  if (myUser !== null) {// verifica se o usuário está logado
    if(getLocalStorage('userValid').name === 'Wildes Sousa'){
      if (
        (hora == myUser.lunchTime.hour) &
        (minutos == myUser.lunchTime.minute)
      ) {
        playAlarmClock();
        notie.alert({
          text:"Este é um lembrete de,\n \tHora de JANTA!\n\nAVISO: após 1mim o controle da página retornará pra você.",
          type:2,
          time:2,
          position: 'top',
        });
        console.log("Teste", myUser.lunchTime);
      }
    }
    
  }
  let started = getLocalStorage("started").start;
  if (getLocalStorage("login") && started === false) {
    //hora = 2; //Teste 07/12/2023
    let condition = 12;
    let operationEnd =  Number(hora)  < condition // lógica das horas trabalhadas de cada turno.
      ? Number(hora) + condition
      : Number(hora) - condition;
    //(hora == 18) & (minutos <= 15)
    
    document.getElementById("message-email").innerHTML =
      `${getSaudacao()} ${getLocalStorage('userValid').name}, operando ate as ${(operationEnd)}:${minutos}hr.`;
  }
  setAlarmClock(hora, minutos);

  var horarioAtual = hora + ":" + minutos + ":" + segundos;
  //document.getElementById("data").textContent = horarioAtual;
}

// Chamar a função para exibir o horário atual a cada segundo

function getSaudacao() {
  const data = new Date();

  const horaDoDia = data.getHours();
  let minute = data.getMinutes();
  let saudacao = "";

  if (horaDoDia >= 6 && horaDoDia < 12) {
    console.log("Bom dia!!");
    saudacao = "Prezados(as), Bom dia!\n\n";
  } else if (horaDoDia >= 12 && horaDoDia < 18) {
    console.log("Boa tarde!!");
    saudacao = "Prezados(as), Boa tarde!\n\n";
  } else if (horaDoDia >= 18 && horaDoDia < 24) {
    console.log("Boa Noite!!", horaDoDia);
    saudacao = "Prezados(as), Boa noite!\n\n";
    paterPonto(horaDoDia, minute);
  } else {
    console.log("Boa Madrugada!!", horaDoDia);
    saudacao = "Prezados(as), Bom dia!\n\n";
  }

  return saudacao;
}

getSaudacao();

function paterPonto() {
  var dataAtual = new Date();
  var hora = dataAtual.getHours();
  var minutos = dataAtual.getMinutes();

  //console.log(`${hora} : ${minutos}`);

  if (hora == 20 && minutos == 58) {
    alert("Olá Operador este é um lembrete para bater o ponto!");
    console.log("Bater ponto");
    // return true;
  } else if ((hora == 0) & (minutos == 0)) {
    notie.alert({
      text:"Olá Operador este é um lembrete para fazer uma pausa (break for eat)!",
      type: "warning",
      time: 0,
    });
  }
  //return false;
}

function verificarRepeticao(relatorio, placa) {
  var qtd = 0;
  var resultados = relatorio.filter(function (item) {
    return item;
  });

  resultados.forEach(function (item) {
    if (item.placa === placa) {
      qtd += 1;
      console.log(`repetição [${item.placa}]: `, qtd);
    }
  });

  return qtd;
}

function copyToClickBoard(dado) {
  var content = document.getElementById(dado).innerHTML;

  navigator.clipboard
    .writeText(content)
    .then(() => {
      console.log("Text copied to clipboard...");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });

  //content.style.backgroundColor = 'blue';
  //content.style.color = '#fff';
}

function handleAutoComplete(id, op) {
  // Adiciona um evento de input no campo de entrada com autocomplete
  document.getElementById(id).addEventListener("input", function () {
    var inputVal = this.value;
    var options = document.getElementById(op);

    // Verifica se a entrada corresponde a alguma opção
    for (var i = 0; i < options.length; i++) {
      var optionVal = options[i].value;
      if ((i < 4) & (optionVal.toLowerCase() === inputVal.toLowerCase())) {
        this.value = optionVal;
        console.log(`Valor selecionado: ${this.value}`);
      }
    }
    //e.prevent.default();
  });
}

function fecharPagina() {
  // Fecha a página atual
  window.location.pathname = "index.html";
}

function myLink(link) {
  switch (link) {
    case "audit":
      if (getLocalStorage("login").login === true) {
        window.location.pathname = "src/upgrade/v1.0.3.html";
      } else {
        window.location.pathname = "src/pages/record.html";
      }
      break;
    case "profile":
      //createModal();
      window.location.pathname = "src/createUser/bd.html";
      break;
    case "settings":
      notie.alert({
        text:"Sorry, this command is not yet available",
        type: 2,
      });;
      
      if(confirm("Acesso restrito. Deseja continuar?")){
        let alright = prompt("Digite a senha para continuar:");
        if(alright === null){
          return;
        }else if (alright === ""){
          alert("Você não digitou nada. Tente novamente.");
        }else{
          if(alright === "@Wildes"){
            window.location.pathname = "src/info.html";
          }else{
            alert("Senha incorreta. Tente novamente.");
          }
        }
      }      
      break;
    case "record":
      //window.location.pathname = "src/pages/record.html";
      openBox();
      break;
    case "logout":
      
      notie.confirm({
        text: 'Dejesa sair do Painel?',
        submitCallback: () => {
          logout();
          //this.location.href = 'https://google.com'
          window.location.pathname = "../index.html";
        }
      })
      break;
    case "download":
      gerarJSONeDownload();
      break;
    default:
      window.location.pathname = "/";
      break;
  }
}

function logout() {
  localStorage.setItem("login", JSON.stringify({ login: false }));
  //localStorage.removeItem('myArray');
  localStorage.removeItem("yawn");
  localStorage.removeItem("score");
  localStorage.removeItem("display");
  localStorage.removeItem("started");
  localStorage.removeItem("currentOperator");
  localStorage.removeItem("userValid");
  localStorage.removeItem("user");
  //window.location.pathname = "../index.html";
}

function gerarJSONeDownload() {
  var dataAtual = new Date();
  var dia = dataAtual.getDate();
  var mes = dataAtual.getMonth() + 1;

  // Converter o JSON para CSV usando a biblioteca PapaParse
  var relatorio = false;
  var csv = "";
  if (csv === "" && !relatorio) {
    alert(
      "Acess denield.\n\nSorry, to be continue with this action please, to do your log in."
    );
  } else {
    csv = Papa.unparse(relatorio);

    // Criar um novo Blob com o conteúdo CSV
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    // Nome do arquivo Excel que será baixado
    var nomeArquivo = `dados_systrat${dia}-${mes}.csv`;
    console.log(`Dowonload arqSysTrat: ${dia}-${mes}`);
    // Fazer o download do arquivo Excel usando a biblioteca FileSaver
    saveAs(blob, nomeArquivo);
  }
}

function show() {
  var themes = document.getElementById("div-themes");
  themes.style.display = "visibility";
} 

const showUserName = () => {
  const userValid = getLocalStorage("userValid");
  console.log(`Bem Vindo: ${userValid.name}!`);
  document.getElementById("login-name").innerHTML = `Olá ${userValid.name}!`;
}

function getUser(op) {
  const user = {
    name: "Wildes Sousa",
    avatar: "",
    lunchTime: {
      hour: 20,
      minute: 58,
    },
  };

  localStorage.setItem("user", JSON.stringify(user, null, 2));
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

function user(op) { 
  const userName = getUser(op);
  console.log('User: ',userName);
}

function openBox() {
  const clockItem = { isOpen: true };
  salvarLocalStorage("clock", clockItem);
  document.getElementById("clock").classList.remove("disable");
  document.getElementById("clock").classList.add("active");
  inicializarButtons();
}

function closeBox() {
  document.getElementById("clock").classList.remove("active");
  document.getElementById("clock").classList.add("disable");
  salvarLocalStorage("clock", { isOpen: false });
}

function inicializarButtons() {
  document.getElementById("close-clock").addEventListener("click", closeBox);

  document
    .getElementById("salvarBatida")
    .addEventListener("click", capturarBatidaDoPonto);
}

function salvarLocalStorage(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

function getLocalStorage(chave) {
  return JSON.parse(localStorage.getItem(chave));
}

function incrementarQuantidadeProduto(idAlerta) {
  idsQuanidadeAlertas[idAlerta]++;
}

const playAlarmClock = () => {
  document.getElementById("alarm-clock").play();
};

const pauseAlarmClock = () => {
  document.getElementById("alarm-clock").pause();
};

const setAlarmClock = (hora, minutos) => {
  if (localStorage.lunchTime) {
    let run = false;
    if (`${hora}:${minutos}` == getLocalStorage("lunchTime").hour && !run) {
      playAlarmClock();
      let x = confirm(
        `⚠️\nEste é um Alarme programado para as ${hora}:${minutos}`
      );
      notie.force({
        type: 3,
        text: `⚠️\nEste é um Alarme programado para as ${hora}:${minutos}`,
        buttonText: 'OK',
      })
      console.log("letra: ", x);
    }
    pauseAlarmClock();

    console.log(`Despertador programado para às ${hora}:${minutos}`);
  }
};

function capturarBatidaDoPonto() {
  let dadContainerClock = document.getElementById("container-registrarBatida");
  const inputGetNameAlarm = document.createElement("input");
  let meuPonto = document.getElementById("capturarBatida").value;
  salvarLocalStorage("lunchTime", { hour: meuPonto });
  console.log(`Captura do ponto: ${meuPonto}`);

  inputGetNameAlarm.classList.add("_w-30");

  dadContainerClock.appendChild(inputGetNameAlarm);

  renderizarNoScreen("showClock", "lunchTime");
}

function renderizarNoScreen(display, chave) {
  const buscado = getLocalStorage(chave);
  if (buscado !== null) {
    document.getElementById(display).innerHTML = buscado.hour;
  }
}

function createModal() {
  // Param: elemento montado encapsulado em uma str template
  /*const containerMain = document.getElementById("box");
  const modal = document.createElement("section");
  const cabecalho = document.createElement("div");
  const tittle = document.createElement("h3");
  const button = document.createElement("button");
  const content = document.createElement("form");*/
  // containerMain.appendChild(modal);
}

const displayRevision = () => {
  document.getElementById("message-email").innerHTML =
    getLocalStorage("display").message ?? "";
  document.getElementById("message-goawake").innerHTML =
    getLocalStorage("display").comments;
  document.getElementById("fassunto").innerHTML =
    getLocalStorage("display").subject ?? "without email";
};

const getYawn = () => {
  const tamList = getLocalStorage("yawn").length;
  document.getElementById("yawn").innerHTML = tamList;
};

const getTotEachAlert = (otherType) => {
  //Return the total of alerts of a specific type
  const getObj = getLocalStorage("myArray");
  
  return getObj === null 
    ? 0 
    : getObj.filter(function (props) {
        return props.type === otherType && props.audit === false;
      }).length;
}


const showTotOfAlertList = () => {
  
  document
    .getElementById("yawn")
    .innerHTML = getTotEachAlert("BOCEJO");
  document
    .getElementById("n1-n2")
    .innerHTML = getTotEachAlert("SONOLÊNCIA N1") + getTotEachAlert("SONOLÊNCIA N2") || '<p class="aux-count2">✅</p>';
  
  document
    .getElementById("others")
    .innerHTML = getTotEachAlert("AUSÊNCIA") + getTotEachAlert("ATENÇÃO");
};

const takeOutSpace = (str) => { //retira espaços em branco
  //let auxElementSearched = Array.from(str);
  let strDefault = str.replace(/\s/g, '');
  console.log(strDefault);
  return strDefault;
}

/*
function openModal(){ 
 
  createModal();
  document.getElementById('box')
    .classList.remove('disable');

  document.getElementById('box')
    .classList.add('active');
}

function closeModal(){
  document.getElementById('box')
    .classList.remove('active');
  
  document.getElementById('box')
    .classList.add('disable');

  document.getElementById('box')
    .remove();
}

function enableAction(){ 
  document
    .getElementById("profile")
    .addEventListener("click", openModal);
  
}
*/
const start = (begin) => {
  if (begin) {
    //checkYawn();
    //getUrlApi('https://apidata.soluttec.repl.co/');
    showTotOfAlertList();
    getTot();
    user("name");
    showUserName();
    apagarTodosDadosDisplay();
    setInterval(exibirHorarioAtual, 1000);
    renderizarNoScreen("showClock", "lunchTime");
    console.log("access allowed");
  } else {
    document.getElementById("title-display").innerText = "acess denield";
    document.getElementById("main").classList.add("start");
    const denield = document.getElementById("acess-denield");
    const container = document.createElement("div");
    container.innerHMTL = `<div class="flex jc-center p-2 color-wht h-20">ACESS DENIELD</div>`;
    denield.appendChild(container);
    console.log("acess denield");
  }
};

const queryAnyArray = (array, searched) => {
  for (let index = 0; index < array.length; index++) {
    console.log(searched, "=>", array[index]);
    if (array[index] === searched) {
      return true;
    }
  }
  return false;
};

const findsOperation = (cod) => {
  if (queryAnyArray(alrode, cod)) {
    return "ALRODE";
  } else if (queryAnyArray(bara, cod)) {
    return "BARAGWANTH";
  } else if (queryAnyArray(rustemburg, cod)) {
    return "RUSTENBURG";
  } else {
    return "NULLO";
  }
};

const getUrlApi = (url) => {
  let res;
  fetch('https://apidata.soluttec.repl.co/',{
    method: 'GET',
    mode:'no-cors',
    headers: { 
         'Content-Type': 'application/json'
       }
     })
  .then(response => response.json())
  .then(data => {
    // Here's a list of repos!
    try{
      console.log(data);
      document.querySelector('h1').innerHTML = `${JSON.stringify(data)}`;
      
    }catch(err){
      console.error(err);
    }
    });
}

/*fetch('https://apidata.soluttec.repl.co/pots', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1
  }),
  headers: {
    "Content-type": "application/json"
  }
})
.then(response => response.json())
.then(json => console.log(json))
*/
start(getLocalStorage("login").login);