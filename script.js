const PIECE_COLOR = "#66BB6A";
const BACK_COLOR = "#C8E6C9";
const TEXT_COLOR = "#A5D6A7";
const FONT_SIZE = 20;

class Piece{
  constructor(x, y, size, id){
    this.x = x;
    this.y = y;
    this.size = size;
    this.id = id;
    this.visibility = true;
  }

  animate(direction, callback){
    this.destX = this.x;
    this.destY = this.y;
    this.prevX = this.x;
    this.prevY = this.y;
    switch(direction){
      case 'left':
        this.destX -= this.size;
        break;
      case 'right':
        this.destX += this.size;
        break;
      case 'up':
        this.destY -= this.size;
        break;
      case 'down':
        this.destY += this.size;
        break;
    }

    const speed = 1;
    const timer = setInterval(() => {
      this.x += (this.x > this.destX) ? -speed : speed;
      this.y += (this.y > this.destY) ? -speed : speed;
      if(this.x === this.destX && this.y === this.destY){
        this.x = this.prevX;
        this.y = this.prevY;
        clearInterval(timer);
        callback();
      }
    }, 1);
  }

  draw(ctx){
    if(!this.visibility || this.id === 0) return;

    ctx.strokeStyle = TEXT_COLOR;
    ctx.strokeRect(this.x, this.y, this.size, this.size);

    let gap = 2;
    ctx.fillStyle = PIECE_COLOR;
    ctx.fillRect(this.x + gap, this.y + gap, this.size - 2 * gap, this.size - 2 * gap);

    ctx.fillStyle = TEXT_COLOR;
    ctx.font = FONT_SIZE + 'px Arial';
    let x = this.x + this.size/2 - ctx.measureText(this.id).width/2;
    let y = this.y + this.size/2 + FONT_SIZE/2;
    ctx.fillText(this.id, x, y);

  }
}

class Board{
  size;
  gap;
  pieces = [];
  blankPiece;
  pieceSize;
  ctx;
  DIR = {};
  ids = [];

  constructor(size, pieceSize){
    this.size = size;
    this.pieceSize = pieceSize;
    this.setup();
  }

  setup(){
    this.DIR['1'] = 'left';
    this.DIR['-1'] = 'right';
    this.DIR[(this.size+ '')] = 'up';
    this.DIR[(-this.size+ '')] = 'down';
    this.setupView();
    this.generatePieces();
    canvas.onmousedown = (e) => {
      let piece = this.getPiece(this.getMousePos(e));
      if(piece) this.handleClick(piece);
    }
  }

  draw(){
    // clear
    this.ctx.fillStyle = BACK_COLOR;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // draw
    this.pieces.forEach((piece) => piece.draw(this.ctx));
    requestAnimationFrame(() => this.draw());
  }

  handleClick(piece){
    let diff = this.allowMove(piece, this.blankPiece);
    if(diff){
      let dir = this.DIR[diff];
      this.blankPiece.visibility = false;
      piece.animate(dir, () => {
        this.swap(piece);
        this.blankPiece.visibility = true;
      });
    }
  }

  swap(piece){
    let pieceIndex = this.pieces.indexOf(piece);
    let blankIndex = this.pieces.indexOf(this.blankPiece);
    [this.pieces[pieceIndex].x, this.pieces[blankIndex].x]  = [this.pieces[blankIndex].x, this.pieces[pieceIndex].x];
    [this.pieces[pieceIndex].y, this.pieces[blankIndex].y]  = [this.pieces[blankIndex].y, this.pieces[pieceIndex].y];
    [this.pieces[pieceIndex], this.pieces[blankIndex]]  = [this.pieces[blankIndex], this.pieces[pieceIndex]];
  }

  allowMove(piece1, piece2){
    let diff = this.pieces.indexOf(piece1) -  this.pieces.indexOf(piece2);
    let absDiff = Math.abs(diff);
    return((absDiff === 1 ||  absDiff === this.size) ? diff : false);
  }

  generatePieces(){
    this.ids = [];
    this.pieces = [];
    for (let i = 0; i < Math.pow(this.size, 2); i++) this.ids.push(i);
    let x = 0, y = 0;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let id = this.randomId();
        let piece = new Piece(x, y, this.pieceSize, id);
        if(id === 0) this.blankPiece = piece;
        this.pieces.push(piece);
        x += this.pieceSize;
        if(this.pieces.length % this.size === 0){ x = 0; y += this.pieceSize;}
      } 
    }
  }

  setupView(){
    var game = document.getElementById("game");
    var size = this.size * this.pieceSize; 
    game.innerHTML = `<canvas id='canvas'></canvas>`;
    document.getElementById("title").innerHTML = `${this.size} Puzzle`;
    let canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext('2d');
    canvas.setAttribute("width", size);
    canvas.setAttribute("height", size);
  }

  getMousePos(evt) {
    var rect = this.ctx.canvas.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  }

  getPiece(pos){
    for (let i = 0; i < this.pieces.length; i++) {
      const piece = this.pieces[i];
      let hor = pos.x > piece.x && pos.x < piece.x + piece.size;
      let ver = pos.y > piece.y && pos.y < piece.y + piece.size;
      if(hor && ver) return this.pieces[i];
      continue;
    }
    return false;
  }

  random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomId(){
    let randomIndex = this.random(0, this.ids.length-1);
    let randomId = this.ids[randomIndex];
    this.ids.splice(randomIndex, 1);
    return randomId;
  }
}

var SIZE = 3;
var PIECE_SIZE = 50;
var gameBoard = new Board(SIZE, PIECE_SIZE);
gameBoard.draw();

document.getElementById("n").onchange = function(){
  gameBoard.size = parseInt(document.getElementById("n").value);
  gameBoard.setup();
}