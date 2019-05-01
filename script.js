class Piece{
  constructor(data){
    this.x = data.x;
    this.y = data.y;
    this.data = data.data;
  }
}

class Board{
  size;
  pieces;
  blankIndex;

  constructor(size){
    this.size = size;
    this.pieces = [];
    this.setup();
  }

  setup(){
    let count = 0;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.pieces.push(new Piece({x: j, y: i, data: count++}));
      } 
    }
    this.blankIndex = 0;
  }

  draw(){
    $("#board").html("");
    this.pieces.forEach((p, i) => $("#board").append(`<div class="piece" index="${i}" data="${p.data}">${p.data}</div>`));
    $('.piece').click(function(){board.move(parseInt($(this).attr('index')));});
  }

  move(pieceIndex){
    var diff = Math.abs(pieceIndex - this.blankIndex);
    if(diff === 1 || diff === 3){
      this.swap(pieceIndex)
      this.draw();
    }
  }

  swap(pieceIndex){
    let temp = new Piece(JSON.parse(JSON.stringify(this.pieces[pieceIndex])));
    this.pieces[pieceIndex] = new Piece(JSON.parse(JSON.stringify(this.pieces[this.blankIndex])));
    this.pieces[this.blankIndex] = temp;
    this.blankIndex = pieceIndex;
  }
}

var board = new Board(3);
board.draw();
