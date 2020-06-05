// Objekt iz funkcije
function Table(shema, keys, cover) {
  (this.shema = shema), (this.keys = keys), (this.cover = cover);
}

var tables = [
  new Table("ABCDEFG", "ACG, ACB, ACE", "A->D, AG->B, B->G, B->E, E->B, E->F"),
  //new Table("ABCDEFG", "ABD, CDE, EFG", "A->C, B->D"),
];

insertRow();
editRow();

// Botun za dekomponranje
var decomposeButton = document.getElementById("decompose-btn");
decomposeButton.addEventListener("click", decompose);

// Dekompozicija - niz
var ro = [];

// Funkcija za dekomponiranje
function decompose(e) {
  // Dohvaćanje cijelog input polja
  var shemaElement = document.getElementById("shema");
  var keysElement = document.getElementById("keys");
  var coverElement = document.getElementById("cover");
  var keyHere = false;

  // Provjera validnosti
  if (shemaElement.value === "") alert("Nedostaje Shema");
  else if (keysElement.value === "") alert("Nedostaju Ključevi");
  else if (coverElement.value === "") alert("Nedostaju FO");
  // Splitanje funkc. ovisnosti po zarezu i za svaku za map uklanjamo razmake
  coverElementValues = coverElement.value.split(",").map((e) => e.trim());

  // Dodavanje elemenata u dekompoziciju
  for (var i = 0; i < coverElementValues.length; ++i) {
    coverElementValues[i] = coverElementValues[i].replace("->", "");
    if (i === 0) {
      ro.push(coverElementValues[i]);
    } else {
      if (isHere(coverElementValues[i])) ro.push(coverElementValues[i]);
    }
  }
  // Splitanje ključeva po zarezu i za svaki map uklanjamo razmake
  keysElementValues = keysElement.value.split(",").map((e) => e.trim());
  for (var j = 0; j < keysElementValues.length; ++j) {
    if (!isHere(keysElementValues[j])) {
      keyHere = true;
      break;
    }
  }

  if (!keyHere) ro.push(keysElementValues[0]);

  // Dodavanje dekompozicije na stranicu
  showDecomp();

  // Novi Table objekt
  var newTableRow = new Table(
    shemaElement.value,
    keysElementValues,
    coverElementValues
  );
  // Pushanje objekta u niz tables
  tables.push(newTableRow);

  insertRow();
  editRow();

  // Postavljanje vrijednosti polja na prazni string
  /* shemaElement.value = "";
  keysElement.value = "";
  coverElement.value = ""; */

  // Postavljanje dekompozicije na prazni array
  ro = [];

  // Zaustavlja automatski refresh browsera
  e.preventDefault();
}

// Trazi da li je element vec u dekompoziciji
function isHere(coverElement) {
  for (var i = 0; i < ro.length; ++i) {
    var helperCounter = 0;
    for (var j = 0; j < coverElement.length; ++j) {
      if (ro[i].includes(coverElement[j])) helperCounter++;
    }
    if (helperCounter === coverElement.length) return false;
  }
  return true;
}
// Dodavanje dekompozicije na stranicu
function showDecomp() {
  var decompArea = document.querySelector(".decompose-current");
  decompArea.innerHTML = `
    <h5> Dekompozicija: ${ro}</h5>
  `;
}
// Brisanje dekompozicije sa stranice
function hideDecomp() {
  var decompArea = document.querySelector(".decompose-current");
  decompArea.innerHTML = ``;
}
// Brisanje svih tablica prije unosa novog reda
function clearTables() {
  var clearArea = document.getElementsByClassName("tables-container")[0];
  while (clearArea.hasChildNodes()) {
    clearArea.removeChild(clearArea.firstChild);
  }
}
// Dodavanje novog reda na stranicu
function insertRow() {
  clearTables();
  var tablesArea = document.getElementsByClassName("tables-container")[0];
  tables.map(createTableRow);
  function createTableRow(t, index) {
    var tableRow = document.createElement("div");
    tableRow.classList.add("table");
    var rowContent = `
    <h4>Table ${index}</h4>
    <button class="edit">Look</button>
    `;
    tableRow.innerHTML = rowContent;
    tablesArea.append(tableRow);
  }
}
// Postavljanje input polja na vrijednosti od kliknutog table rowa
function editRow() {
  var editButtons = document.querySelectorAll(".edit");
  for (var i = 0; i < editButtons.length; ++i) {
    var button = editButtons[i];
    button.addEventListener("click", editSelected);
  }

  function editSelected(event) {
    var buttonClicked = event.target;
    var selectedRow = buttonClicked.parentElement;
    var rowIndex = selectedRow.querySelector("h4").innerText.split(" ")[1];

    var shemaElement = document.getElementById("shema");
    var keysElement = document.getElementById("keys");
    var coverElement = document.getElementById("cover");

    shemaElement.value = tables[rowIndex]["shema"];
    keysElement.value = tables[rowIndex]["keys"];
    coverElement.value = tables[rowIndex]["cover"];

    hideDecomp();
  }
}
