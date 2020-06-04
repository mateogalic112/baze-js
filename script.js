// Objekt iz funkcije
function Table(shema, keys, cover) {
  (this.shema = shema), (this.keys = keys), (this.cover = cover);
}

const tables = [
  new Table("ABCDEF", "ABC, BCD, DEF", "A->B, B->C"),
  new Table("ABCDEFG", "ABD, CDE, EFG", "A->C, B->D"),
];

var decomposeButton = document.getElementById("decompose-btn");
decomposeButton.addEventListener("click", decompose);

var ro = [];

function decompose(e) {
  var shemaElement = document.getElementById("shema");
  var keysElement = document.getElementById("keys");
  var coverElement = document.getElementById("cover");
  var keyHere = false;
  // if(shemaElement.value === '') alert("Nedostaje Shema");
  //else if(keysElement.value === '') alert("Nedostaju Ključevi");
  //else if(coverElement.value === '') alert("Nedostaju FO");
  coverElementValues = coverElement.value.split(",").map(e => e.trim());
  for (var i = 0; i < coverElementValues.length; ++i) {
    coverElementValues[i] = coverElementValues[i].replace("->", "");
    if (i === 0) {
      ro.push(coverElementValues[i]);
    } else {
      if(isHere(coverElementValues[i])) ro.push(coverElementValues[i]);
    }
  }

  keysElementValues = keysElement.value.split(",").map(e => e.trim());
  for (var j = 0; j < keysElementValues.length; ++j) {
    if(!isHere(keysElementValues[j])) {
        console.log(isHere(keysElementValues[j]));
        keyHere = true;
        break;
    }
  } 

  if(!keyHere) ro.push(keysElementValues[0]); 

  console.log(ro);
  
  e.preventDefault();
}

function isHere(coverElement, ro) {
    
    for(var i = 0; i < ro.length; ++i) {
        var helperCounter = 0;
        for(var j = 0; j < coverElement.length; ++j) {
            if(ro[i].includes(coverElement[j])) helperCounter++;
        }
        if(helperCounter === coverElement.length) return false; 
    }
    return true;
}
