

var branches = [];
var leaves = [];
var grassblades = [];
var rounds = 9; // How many times to perform the recursion of the fractal.
var ww = 4; // Starting weight for trunk.
var amountOfBlades = 125; // How many grassblades
var countForLeaves = rounds-2; // What limbs do you want leaves to start spawning on.
var thicknessToDrop = 0.25; // The amount of weight to go down for each round of limbs.
var constantSway = 5; //Obsolete
var constantRate = 0.5; //Rate for the wind.
var currentRound = 0;   //hiarachy for the limbs / tree.

function setup()
{
  //Setup the canvas.
  createCanvas(1600, 500);

  //Create the trunks for the three trees.
  var a = createVector(width/6, height-17);
  var b = createVector((width/6)+random(0, 8), height-150);
  var c = createVector(width/2, height-17);
  var d = createVector((width/2)+random(0, 8), height-150);
  var e = createVector(width/1.2, height-17);
  var f = createVector((width/1.2)+random(0, 8), height-150);

  //Make the trunks the first 3 indexes of are tree.
  branches[0] = new Branch(a, b, ww);
  branches[1] = new Branch(c, d, ww);
  branches[2] = new Branch(e, f, ww);

  //Rounds for how many times to recurse through the function and develope the tree.
  for(currentRound = 0; currentRound < rounds; currentRound++)
  {
    //Lose some weight for each round to make the limbs smaller.
    ww-=thicknessToDrop;
    for(var j = branches.length-1; j >= 0; j--)
    {
      //Check if the tree has limbs to avoid overflowing the array with pointless limbs.
      if(!branches[j].isGrown)
      {
        //Add the two limbs for each branch.
        var arr = branches[j].grow(ww);
        branches.push(arr[0]);
        branches.push(arr[1]);
        //If the amount of rounds to wait for developing leaves has passes then start spawning the objects.
        if(currentRound > countForLeaves)
        {
          leaves[leaves.length] = new leaf(arr[0].pointB);
          leaves[leaves.length] = new leaf(arr[1].pointB);
        }
      }
    }
  }
  //Creates the grass blades.
  for(var i = 0; i< amountOfBlades; i++)
  {
    var x = random(0, width);
    var y = height;
    grassblades[i] = new grass(createVector(x, y));
  }
}

//Detect the key press and if key 'R' reload the page.
function keyPressed()
{
  if(keyCode == 82)
  {
    location.reload();
  }
}

//Main screen rendering function.
function draw()
{
  //Sets background to a blue.
  background(0, 91, 255);
  //Sets palette color to green and draws the main grass block at the bottom.
  stroke(100, 255, 91);
  for(var i = 15; i >= 0; i--)
    line(0, height-i, width, height-i);

  //Draws the glassblades.
  for(var i = 0; i < grassblades.length;i++)
    grassblades[i].draw();


  for(var i = 0; i < branches.length; i++)
  {
    //Performs the blow
    branches[i].blow();
    //If leafs contains the index 'I' then draw the leaf.
    if(leaves[i])
    {
      leaves[i].draw();
    }
    //Draws the branches.
    branches[i].draw();
  }
}
