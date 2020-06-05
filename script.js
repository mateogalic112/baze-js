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

var decomposeButton = document.getElementById("decompose-btn");
decomposeButton.addEventListener("click", decompose);

var ro = [];

function decompose(e) {
  var shemaElement = document.getElementById("shema");
  var keysElement = document.getElementById("keys");
  var coverElement = document.getElementById("cover");
  var keyHere = false;

  if(shemaElement.value === '') alert("Nedostaje Shema");
  else if(keysElement.value === '') alert("Nedostaju Ključevi");
  else if(coverElement.value === '') alert("Nedostaju FO");
  coverElementValues = coverElement.value.split(",").map((e) => e.trim());
  
  for (var i = 0; i < coverElementValues.length; ++i) {
    coverElementValues[i] = coverElementValues[i].replace("->", "");
    if (i === 0) {
      ro.push(coverElementValues[i]);
    } else {
      if (isHere(coverElementValues[i])) ro.push(coverElementValues[i]);
    }
  }

  keysElementValues = keysElement.value.split(",").map((e) => e.trim());
  for (var j = 0; j < keysElementValues.length; ++j) {
    if (!isHere(keysElementValues[j])) {
      console.log(isHere(keysElementValues[j]));
      keyHere = true;
      break;
    }
  }

  if (!keyHere) ro.push(keysElementValues[0]);

  console.log(ro);
  showDecomp();

  var newTableRow = new Table(
    shemaElement.value,
    keysElementValues,
    coverElementValues
  );
  tables.push(newTableRow);

  console.log(newTableRow);
  console.log(tables.length);

  insertRow();
  editRow();

  shemaElement.value = "";
  keysElement.value = "";
  coverElement.value = "";

  ro = [];

  e.preventDefault();
}

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

function showDecomp() {
  var decompArea = document.querySelector(".decompose-current");
  decompArea.innerHTML = `
    <h5> Dekompozicija: ${ro}</h5>
  `;
}

function hideDecomp() {
  var decompArea = document.querySelector(".decompose-current");
  decompArea.innerHTML = ``;
}

function clearTables() {
  var clearArea = document.getElementsByClassName("tables-container")[0];
  while (clearArea.hasChildNodes()) {
    clearArea.removeChild(clearArea.firstChild);
  }
}

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

function editRow() {
  var editButtons = document.querySelectorAll(".edit");
  for (var i = 0; i < editButtons.length; ++i) {
    var button = editButtons[i];
    button.addEventListener("click", editSelected);
  }

  function editSelected(event) {
    var buttonClicked = event.target;
    var selectedRow = buttonClicked.parentElement.parentElement;
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
