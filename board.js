class Board{
  size;
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
    this.setupDirectin();
    this.setupView();
    this.generatePieces();
    canvas.onmousedown = (e) => {
      let piece = this.getPiece(getMousePos(this.ctx.canvas, e));
      if(piece) this.handleClick(piece);
    }
  }

  draw(){
    // clear
    this.ctx.fillStyle = COLOR.BACK_COLOR;
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
        swap(this.pieces, piece, this.blankPiece);
        this.blankPiece.visibility = true;
      });
    }
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

  setupDirectin(){
    this.DIR['1'] = 'left';
    this.DIR['-1'] = 'right';
    this.DIR[(this.size+ '')] = 'up';
    this.DIR[(-this.size+ '')] = 'down';
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

  randomId(){
    let randomIndex = random(0, this.ids.length-1);
    let randomId = this.ids[randomIndex];
    this.ids.splice(randomIndex, 1);
    return randomId;
  }
}