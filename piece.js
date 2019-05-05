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

    ctx.strokeStyle = COLOR.TEXT_COLOR;
    ctx.strokeRect(this.x, this.y, this.size, this.size);

    let gap = 2;
    ctx.fillStyle = COLOR.PIECE_COLOR;
    ctx.fillRect(this.x + gap, this.y + gap, this.size - 2 * gap, this.size - 2 * gap);

    ctx.fillStyle = 'white';
    ctx.font = FONT_SIZE + 'px Arial';
    let x = this.x + this.size/2 - ctx.measureText(this.id).width/2;
    let y = this.y + this.size/2 + FONT_SIZE/2;
    ctx.fillText(nepali(this.id), x, y);
  }
}
