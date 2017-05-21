function grass(pos)
{
  this.pos = pos;
  this.oldX = this.pos.x;
  this.length = random(8, 15); // Random blade length.
  this.sway = random(9, 11); //   Random sway length with the wind blowing to the right.


  this.draw = function()
  {
    //Set to a darker green and a medium stroke.
    stroke(15, 112, 4);
    strokeWeight(4);

    //Same basic blow function as the branch.
    if(this.pos.x <= this.oldX+this.sway && this.pulse == 0)
      this.pos.x+=constantRate;
    else if(this.pos.x >= this.oldX){
      this.pulse = 1;
      this.pos.x-=constantRate;
      if(this.pos.x <= this.oldX)
        this.pulse = 0;
    }
    line(this.oldX, this.pos.y, this.pos.x, (this.pos.y-this.length));
  }
}
