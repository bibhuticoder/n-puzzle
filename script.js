var COLOR = COLORS.lime;
const FONT_SIZE = 20;
const PIECE_SIZE = 50;

var N = 3;
var gameBoard = new Board(N, PIECE_SIZE);
gameBoard.draw();

function newGame(){
  gameBoard.size = parseInt(document.getElementById("n").value);
  gameBoard.setup();
}

// slider
document.getElementById("n").onchange = function(){
  newGame();
}

// New game Button
document.getElementById("newGame").onclick = function(){
  newGame();
}

// colors
let colorsPalatte = document.getElementById('colors-palatte');
for(let key in COLORS){
  let c = COLORS[key];
  let color = `<div class="color" style="background-color: ${c.PIECE_COLOR}" color="${key}"></div>`
  colorsPalatte.innerHTML += color;
}
Array.from(document.getElementsByClassName('color')).forEach(function(element) {
  element.addEventListener('click', () => COLOR = COLORS[element.getAttribute('color')]);
});

