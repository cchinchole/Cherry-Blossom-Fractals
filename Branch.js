function Branch(a, b, w)
{
  this.pointA = a;
  this.pointB = b;
  this.isGrown = false;
  this.count = currentRound;  //Tells us the hiarchy of the tree we are at.
  this.flair = random(3, 6); //Better name would by sway...
  this.oldX = this.pointB.x;
  this.pulse = 0;
  this.weight = w;   //strokeWeight

  this.blow = function()
  {


      //Checks if our point is less than are generated blown posistion.
      if(this.pointB.x <= this.oldX+this.flair && this.pulse == 0)
      {
      //Adds our constant from sketch.js to the x.
        this.pointB.x+=constantRate;
      }
      //Checks if our point is more than are generated blown posistion.
      else if(this.pointB.x >= this.oldX)
      {
      //Subtract our constast from sketch.js from the x.
        this.pulse = 1;
        this.pointB.x-=constantRate;
      //After we are all done then reset back to pulse 0 and restart the cycle.
        if(this.pointB.x <= this.oldX)
          this.pulse = 0;
      }

    //This code will do the blow the tree one direction then blow it to the other direction.
    //It is not good for realistic wind.

    /*

    if(this.pointB.x >= this.oldX-this.flair && this.pulse == 0)
    {
      this.pointB.x-=constantRate;
    }
    else if(this.pointB.x <= this.oldX)
    {
      this.pulse = 1;
      this.pointB.x+=constantRate;
      if(this.pointB.x >= this.oldX)
      this.pulse = 2;
    }
    else if(this.pointB.x >= this.oldX && this.pulse == 2)
    {
      this.pointB.x += constantRate;
      if(this.pointB.x >= this.oldX+this.flair)
      {
        this.pointB.x = this.oldX+this.flair;
        this.pulse = 3;
      }
    }
    else if(this.pointB.x <= this.oldX+this.flair &&this.pulse == 3)
    {
      this.pointB.x -= constantRate;
      if(this.pointB.x <= this.oldX)
      {
        this.pointB.x = this.oldX;
        this.pulse = 0;
      }
    }
    else {
      console.log(this.pulse);
      this.pointB.x += constantRate;
    }*/
  }

  this.draw = function()
  {
    //Sets the stroke for each limb and sets it to a brown color then draws.
    strokeWeight(this.weight);
    stroke(140, 20, 20, 150);
    noFill();
    line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
  }

  this.grow = function(weight)
  {
    var br = [];
    this.isGrown = true;
    //We get the line from the ending to the beginning points.
    var directionOffset = p5.Vector.sub(this.pointB, this.pointA);
    //Multiply it to shrink the size a bit.
    directionOffset.mult(0.7);
    //Copy from the first vector to this one.
    var directionOffset2 = directionOffset.copy();
    //Rotate it to the right and create a new limb.
    directionOffset.rotate(PI/this.flair);
    br[1] = new Branch(this.pointB, p5.Vector.add(this.pointB, directionOffset), weight);
    //Rotate it to the left and create a new limb.
    directionOffset2.rotate(-PI/this.flair);
    br[0] = new Branch(this.pointB, p5.Vector.add(this.pointB, directionOffset2), weight);
    //Then return the array with the two limbs.
    return br;
  }

}
