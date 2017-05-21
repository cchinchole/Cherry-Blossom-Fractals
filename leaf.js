function leaf(point)
{
  this.po = createVector(0, -1);  //Use this variable to obstruct the vector from its parents endpoint.
  //                                To avoid problems with it trying to connect to the limb when it falls.
  this.point = point;
  this.fall = false;
  this.currentTime = millis();
  this.randomFall = random(1, 6);
  this.randomSize = random(4.5, 6.5);

  this.draw = function()
  { //This will make the leaves fall randomly, we divide the fall by the number so that
    //leaves with a longer delay will not fall quickly in the fall function.
    if(millis() - this.currentTime >= Math.ceil(10000/this.randomFall) && this.fall == false)
    {
      //Add the vector to offset from the limb.
      this.point = p5.Vector.add(this.po, this.point);
      this.fall = true;
      this.currentTime = millis();
    }
    //Make sure we stay ontop of the grass.
    if(this.fall && this.point.y <= height-15)
    {
      //Causes the 'wind' to go to the right and fall according to the random fall time.
      this.point.y += this.randomFall;
      this.point.x += random(-4, 15);
    }
    //Make the outside white and fill with pink. Make its size based off random with atleast 2.5.
    stroke(255, 255, 255);
    fill(255, 100, 255);
    ellipse(this.point.x, this.point.y, this.randomSize, this.randomSize);
  }

}
