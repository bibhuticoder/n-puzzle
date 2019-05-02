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
  pieceSize;

  constructor(size, pieceSize){
    this.size = size;
    this.pieces = [];
    this.setup();
    this.pieceSize = pieceSize;
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
    let board = $("#board");
    board.css('width', this.pieceSize * this.size + 'px');
    board.css('height', this.pieceSize * this.size + 'px')
    board.html("");
    var x = 0, y = 0;
    this.pieces.forEach((p, i) => {
      var pieceHtml = `
        <div 
          class="piece" 
          index="${i}" 
          data="${p.data}" 
          style="
            left: ${x}px; 
            top: ${y}px; 
            height: ${this.pieceSize}px; 
            width: ${this.pieceSize}px; 
            background-image: url('./image.png');
            background-position:${x}px ${y}px;
            line-height: ${this.pieceSize}px">
              ${p.data}
        </div>
      `;
      $("#board").append(pieceHtml);
      x += this.pieceSize;
      if(x % (this.pieceSize * this.size) === 0){x = 0; y += this.pieceSize;}
    });
    $('.piece').click(function(){gameBoard.move(parseInt($(this).attr('index')));});
  }

  move(pieceIndex){
    var diff = this.blankIndex -  pieceIndex;
    if( Math.abs(diff) === 1 ||  Math.abs(diff) === this.size){
      this.swap(pieceIndex);
      
      // animate
      let clickedPiece =  $(".piece[index='"+pieceIndex+"']");
      let blankPiece =  $(".piece[index='"+this.blankIndex+"']");
      let temp = {top: clickedPiece.css('top'), left: clickedPiece.css('left')};
      clickedPiece.css({top: blankPiece.css('top') + 'px', left: blankPiece.css('left')+'px'});
      blankPiece.css({top: temp.top + 'px', left: temp.left + 'px'});
      setTimeout(() => {
        this.draw();
      }, 100);
      
    }
  }

  swap(pieceIndex){
    let temp = new Piece(JSON.parse(JSON.stringify(this.pieces[pieceIndex])));
    this.pieces[pieceIndex] = new Piece(JSON.parse(JSON.stringify(this.pieces[this.blankIndex])));
    this.pieces[this.blankIndex] = temp;
    this.blankIndex = pieceIndex;
  }
}

var gameBoard = new Board(3, 50);
gameBoard.draw();
