
var canvas, ctx, w, h, grd, grdFrenchFlag; 
var rectanglex = 0
var speed = 1;
var colors = ['red', 'blue', 'green'];
var currentcolor =0;
window.onload = init;



function init() {
   canvas = document.querySelector("#mycanvas");
ctx= canvas.getContext('2d');
//setInterval(movingrectangle,100);
//setTimeout(movingrectangle,100);
requestAnimationFrame(movingrectangle);
setInterval(changecolor, 1000);
}


function drawlines () {
// Vertical lines
for (var x = 0.5; x < 500; x += 10) { 
  ctx.moveTo(x, 0);  
  ctx.lineTo(x, 375);
}
// Horizontal lines
for (var y = 0.5; y < 375; y += 10) {
  ctx.moveTo(0, y);  
  ctx.lineTo(500, y);
}
// Draw in blue
    ctx.strokeStyle = "#0000FF";
// Before the execution of the next line nothing as been drawn yet !
  ctx.stroke(); 
}

function drawtwo () {
// first part of the path
ctx.moveTo(20,20);
ctx.lineTo(100, 100);
ctx.lineTo(100,0);
// indicate stroke color + draw the path
ctx.strokeStyle = "#0000FF";
ctx.stroke();
// start a new path, empty the current buffer
ctx.beginPath();
// second part of the path, moveTo(...) is used to "jump" to another place
ctx.moveTo(120,20);
ctx.lineTo(200, 100);
ctx.lineTo(200,0);
// Close the path, try commenting this line
ctx.closePath();
// indicate stroke color + draw the path
ctx.strokeStyle = "#0000FF";
ctx.strokeStyle = "rgb(0, 0, 255)";
ctx.stroke();
// indicate stroke color + draw the path
ctx.fillStyle = "pink";
ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
ctx.fill();
}

function thousandrects() {
w = canvas.width;
  h = canvas.height;
  
  console.time("time to draw");
  
  for(var i=0; i < 1000; i++) {
    var x = Math.random() * w;
    var y = Math.random() * h;
    var width = Math.random() * w;
    var height = Math.random() * h;
    
    ctx.strokeRect(x, y, width, height); 
  }
  console.timeEnd("time to draw");
}

function thousandrectsbuffer() {
w = canvas.width;
  h = canvas.height;
  
  console.time("time to draw");
  
  for(var i=0; i < 1000; i++) {
var x = Math.random() * w;
var y = Math.random() * h;
var width = Math.random() * w;
var height = Math.random() * h;
ctx.rect(x, y, width, height); // store a rectangle in path/buffer
}
ctx.stroke(); // draws the whole buffer (the 1000 rectangles) at once
  console.timeEnd("time to draw");
}

function buffer() {
// start a new buffer / path
ctx.beginPath();
// all these orders are in a buffer/path
ctx.moveTo(10, 10);
ctx.lineTo(100, 100);
ctx.lineTo(150, 70);
// Draw the buffer
ctx.stroke();
}

function text() {
ctx.font = "italic bold 60pt Calibri";
ctx.lineWidth = 3;
ctx.strokeStyle = "blue";
ctx.fillStyle = "red";
ctx.textBaseline = "top";
ctx.textAlign = "start";
// Draw text with constrained width
ctx.fillText("Sk Hello", 10, 100,400);
ctx.strokeText("Sk Hello",10, 100,400); 
var textMetrics = ctx.measureText("Sk Hello");
var width = textMetrics.width;
// Draw some text that displays the width of the previous drawn text
ctx.font = "20pt Arial";
ctx.fillText("Width of previous text: " + width + "pixels", 10, 200);
// Draw the baseline of the given width
ctx.moveTo(10, 100);
ctx.lineTo(width+10, 100);
ctx.stroke();
}



function simple(x,y,angle,color) {
ctx.save();
// change ctx properties
ctx.translate(x,y)
ctx.rotate (angle)
ctx.fillStyle = color;
ctx.fillRect(0,0,100,100);
ctx.restore();
}

function tworectangles(x,y) {

ctx.lineWidth=2;
ctx.fillStyle = 'blue';
ctx.fillRect(0,0, 100,100);
ctx.fillRect(x+150,y, 100,100);
ctx.fillRect(x+300,y, 100,100);
ctx.strokeStyle = 'red';
ctx.strokeRect(150,0, 100,100);
ctx.clearRect(170,50,20,20);
ctx.font = 'italic 20pt Calibri';
ctx.fillText("Test",500,20);
   }

function drawmonster (x,y) {
ctx.translate(100,100);
ctx.rotate(Math.PI/4);
ctx.scale(0.5, 0.5);
// head
   ctx.fillStyle='lightgreen';
   ctx.fillRect(0,0,200,200);
   // eyes
   ctx.fillStyle='red';
   ctx.fillRect(35,30,20,20);
   ctx.fillRect(140,30,20,20);
   // interior of eye
   ctx.fillStyle='yellow';
   ctx.fillRect(43,37,10,10);
   ctx.fillRect(143,37,10,10);
   // Nose
   ctx.fillStyle='black';
   ctx.fillRect(90,70,20,80);
   // Mouth
   ctx.fillStyle='purple';
   ctx.fillRect(60,165,80,20);
   // coordinate system at (0, 0)
   drawArrow(ctx, 0, 0, 100, 0, 10, 'red');
   drawArrow(ctx, 0, 0, 0, 100, 10, 'red');
}

function drawArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color){
  //variables to be used when creating the arrow
  var headlen = 10;
  var angle = Math.atan2(toy-fromy,tox-fromx);

  ctx.save();
  ctx.strokeStyle = color;

  //starting path of the arrow from the start square to the end square and drawing the stroke
  ctx.beginPath();
  ctx.moveTo(fromx, fromy);
  ctx.lineTo(tox, toy);
  ctx.lineWidth = arrowWidth;
  ctx.stroke();

  //starting a new path from the head of the arrow to one of the sides of the point
  ctx.beginPath();
  ctx.moveTo(tox, toy);
  ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

  //path from the side point of the arrow, to the other side point
  ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));

  //path from the side point back to the tip of the arrow, and then again to the opposite side point
  ctx.lineTo(tox, toy);
  ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

  //draws the paths created above
  ctx.stroke();
  ctx.restore();
}

function drawsimpleLine(x1, y1, x2, y2, color, width) {
    ctx.save();
    // set color and lineWidth; if these parameters
    // are not defined, do nothing (default values)
    if(color)
        ctx.strokeStyle = color;
    if(width)
        ctx.lineWidth = width;
    // start a new path
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
}

function arc() {
//ctx.arc(centerX, centerY, radius, startAngle, endAngle); // clockwise drawing
//ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
ctx.beginPath();
// we ommited the last parameter
ctx.arc(100, 75, 50, 0, Math.PI/2);
 
ctx.lineWidth = 10;
ctx.stroke();

}

function linearc() {
ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(200, 200);

ctx.arc(500, 100, 100, 0, 2*Math.PI);
ctx.stroke();
}

function roundtriangle() {
var roundedTriangle=function(ctx,x1,y1,x2,y2,x3,y3,radius,fill,stroke)
{
    ctx.beginPath();

    // start at the middle of the side between x1,y1 and x2,y2
    ctx.moveTo((x1+x2)/2,(y1+y2)/2);

    // go around the x2,y2 vertex 
    ctx.arcTo(x2,y2,x3,y3,radius);

    // go around the x3,y3 vertex 
    ctx.arcTo(x3,y3,x1,y1,radius);

    // go around the x1,y1 vertex 
    ctx.arcTo(x1,y1,x2,y2,radius);
  
    // and close the triangle with a line to the starting point
    ctx.lineTo((x1+x2)/2,(y1+y2)/2);

    if(fill){
      ctx.fill();
    }
    if(stroke){
      ctx.stroke();
    }
}  
  
var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');
  
ctx.strokeStyle='rgb(150,0,0)';
ctx.fillStyle='rgb(0,150,0)';
ctx.lineWidth=7;
roundedTriangle(ctx,200,15,300,150,15,100,20,true,true);
}

function quadtraticcurve(v,w,x,y) {
ctx.beginPath();

ctx.moveTo(100, 20);
ctx.quadraticCurveTo(v, w, x, y);

ctx.lineWidth = 5;
ctx.strokeStyle = "#0000ff";
ctx.stroke();
}

function drawCurvedArrow(startPointX, startPointY,
                         endPointX, endPointY,
                         quadPointX, quadPointY,
                         lineWidth,
                         arrowWidth,
                         color) {
    // BEST PRACTICE: the function changes color and lineWidth -> save context!
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
 
    // angle of the end tangeant, useful for drawing the arrow head
    var arrowAngle = Math.atan2(quadPointX - endPointX, quadPointY - endPointY) + Math.PI;
 
    // start a new path
    ctx.beginPath();
    // Body of the arrow
    ctx.moveTo(startPointX, startPointY);
    ctx.quadraticCurveTo(quadPointX, quadPointY, endPointX, endPointY);
    // Head of the arrow
    ctx.moveTo(endPointX - (arrowWidth * Math.sin(arrowAngle - Math.PI / 6)),
               endPointY - (arrowWidth * Math.cos(arrowAngle - Math.PI / 6)));
 
    ctx.lineTo(endPointX, endPointY);
 
    ctx.lineTo(endPointX - (arrowWidth * Math.sin(arrowAngle + Math.PI / 6)),
               endPointY - (arrowWidth * Math.cos(arrowAngle + Math.PI / 6)));
 
    ctx.stroke();
    ctx.closePath();
    // BEST PRACTICE -> restore the context as we saved it at the beginning
    // of the function
    ctx.restore();
}

function shapes() {
 // The gradient we create is also a global variable, we
   // will be able to reuse it for drawing different shapes
   // in different functions
  grdFrenchFlag = ctx.createLinearGradient(0, 0, 300, 200);
              
  // Try adding colors with first parameter between 0 and 1
  grdFrenchFlag.addColorStop(0, "blue"); 
  grdFrenchFlag.addColorStop(0.3, "white");
  grdFrenchFlag.addColorStop(1, "yellow"); 

  draw();
}

function draw() {
  ctx.fillStyle = grdFrenchFlag;
  ctx.fillRect(0, 0, 300, 200);
}

function draw2() {
ctx.fillStyle = grdFrenchFlag;
ctx.fillRect(0, 0, 50, 50);
ctx.fillRect(100, 0, 50, 50);
ctx.fillRect(200, 0, 50, 50);
ctx.fillRect(50, 50, 50, 50);
ctx.fillRect(150, 50, 50, 50);
ctx.fillRect(250, 50, 50, 50);
ctx.fillRect(0, 100, 50, 50);
ctx.fillRect(100, 100, 50, 50);
ctx.fillRect(200, 100, 50, 50);
ctx.fillRect(50, 150, 50, 50);
ctx.fillRect(150, 150, 50, 50);
ctx.fillRect(250, 150, 50, 50);
}

function shapesefficient() {
// The gradient we create is also a global variable, we
   // will be able to reuse it for drawing different shapes
   // in different functions
  grdFrenchFlag = ctx.createLinearGradient(0, 0, 300, 200);
              
  // Try adding colors with first parameter between 0 and 1
  grdFrenchFlag.addColorStop(0, "blue"); 
  grdFrenchFlag.addColorStop(0.5, "white");
  grdFrenchFlag.addColorStop(1, "red"); 

  drawCheckboard(10);
}

// n = number of cells per row/column
function drawCheckboard(n) {
  ctx.fillStyle = grdFrenchFlag;
  ctx.lineWidth=10;
  
  var l = canvas.width;
  var h = canvas.height;

  var cellWidth = l / n;
  var cellHeight = h / n;
  
  for(i = 0; i < n; i++) {
    for(j = i % 2; j < n; j+=2) {
      ctx.fillRect(cellWidth*i, cellHeight*j, cellWidth, cellHeight); 
    }  
  }
}


function radialgradient() {
grd = ctx.createRadialGradient(150, 100, 30, 150, 100, 100);
   grd.addColorStop(0, "red");
   grd.addColorStop(0.17, "orange");
   grd.addColorStop(0.33, "yellow");
   grd.addColorStop(0.5, "green");
   grd.addColorStop(0.666, "blue");
   grd.addColorStop(1, "violet");
  drawgrd();
}

function drawgrd() {
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 300, 200);
}

// add shadows before drawing the filled circle ctx.fill save>addshadow>fill>restore>stroke
function setShadow() {
   ctx.shadowColor = "Grey"; // color
   ctx.shadowBlur = 20;           // blur level
   ctx.shadowOffsetX = 15;        // horizontal offset
   ctx.shadowOffsetY = 15;        // vertical offset
}


function animate() {
//call mit setinterval(anmiate,1000)
ctx.clearRect(0,0, canvas.width, canvas.height);
ctx.lineWidth=2;
ctx.fillStyle = 'blue';
ctx.fillRect(10+Math.random()*10,0, 100,100);
   }

function movingrectangle() {
//call mit setInterval(anmiate,1000)
ctx.clearRect(0,0, canvas.width, canvas.height);
ctx.lineWidth=2;
//ctx.fillStyle = 'blue';
ctx.fillRect(rectanglex,0, 100,100);
rectanglex = rectanglex+speed;
if((rectanglex > 200) || (rectanglex <=0)) {speed = - speed}  
//setTimeout(movingrectangle,100);
requestAnimationFrame(movingrectangle);
}

function changecolor() {
ctx.fillStyle = colors[currentcolor%3];
currentcolor += 1;
}
