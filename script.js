const root = document.querySelector(":root");
const table = document.querySelector("table");
const serverButton = document.querySelector("#server-button");
const gameButtonA = document.querySelector("#game-buttonA");
const gameButtonB = document.querySelector("#game-buttonB");
const clearButton = document.querySelector("#clear-button");
const info = document.querySelector("#info");
const infoServiceBreak = document.querySelector("#info-servicebreak");

let FIRST_SERVER = 0;
updateStatus();

serverButton.onclick = toggleFirstServer;

gameButtonA.onclick = function() { playGame(0); };
gameButtonB.onclick = function() { playGame(1); };

clearButton.onclick = () => {
  deleteLastRow();
  updateStatus();
}

function toggleFirstServer() {
  clearAllRows();
  FIRST_SERVER = FIRST_SERVER === 1 ? 0 : 1;
  updateStatus();

  let col0Colour = getComputedStyle(root).getPropertyValue('--col0-colour');
  let col1Colour = getComputedStyle(root).getPropertyValue('--col1-colour');
  root.style.setProperty('--col0-colour', col1Colour);
  root.style.setProperty('--col1-colour', col0Colour);
}

function playGame( winner ) {
  score0 = getScore(0);
  score1 = getScore(1);

  let row = table.insertRow(-1);
  let cell0 = row.insertCell(0);
  let cell1 = row.insertCell(1);
  cell0.innerText = winner === 0 ? score0 + 1 : score0;
  cell1.innerText = winner === 1 ? score1 + 1 : score1;

  row.cells[ winner ].classList.add("bold");

  if (winner !== getLastServerID()) {
    row.cells[winner].classList.add("servebreak");
  }

  updateStatus();
}

function clearAllRows() {
  while (table.rows.length > 1) {
    table.deleteRow(-1);
  }
}

function deleteLastRow() {
  if (table.rows.length > 1) {
    table.deleteRow(-1);
  }
}

function getScore(player) {
  if (table.rows.length === 1) {
    return 0;
  }
  return parseInt( table.rows[ table.rows.length - 1 ].cells[ player ].innerText );
}

function getNumGamesPlayed() {
  return table.rows.length - 1;
}

function getFirstServerName() {
  return table.rows[0].cells[ FIRST_SERVER ].innerText;
}

function getFirstReceiverName() {
  return table.rows[0].cells[ Math.abs(FIRST_SERVER - 1) ].innerText;
}

function getNextServerName() {
  console.log( getNumGamesPlayed() );
  return getNumGamesPlayed() % 2 === 0 ? getFirstServerName() : getFirstReceiverName();
}

function getLastServerID() {
  return getNumGamesPlayed() % 2 === 1 ? FIRST_SERVER : Math.abs(FIRST_SERVER - 1);
}

function updateStatus() {
  info.innerText = //"First serve: " + getFirstServerName() +
                   //"\nGames played: " + numGamesPlayed +
                   //"\nLast serve: " + getLastServerName() +
                   "NOW SERVING: " + getNextServerName();
}