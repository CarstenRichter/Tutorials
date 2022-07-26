var canvas, ctx;
// Try other values!
var numberOfSegments = 20;
// Length of each segment of the snake
var segLength = 10;

// Arrays of w,y positions of each coordinate system 
// one for each segment
// Trick to create arrays filled with zero values
var x = Array.apply(null, Array(numberOfSegments)).map(Number.prototype.valueOf,0);

var y = Array.apply(null, Array(numberOfSegments)).map(Number.prototype.valueOf,0);var mousePos;



function init() {
  canvas = document.getElementById("myCanvas");
   ctx = canvas.getContext('2d');
  
  
  canvas.addEventListener('mousemove', function (evt) {
    mousePos = getMousePos(canvas, evt);
  }, false);
  
  // starts animation
  requestAnimationFrame(animate);
}

function getMousePos(canvas, evt) {
   // necessary to take into account CSS boundaries
   var rect = canvas.getBoundingClientRect();
   return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
   };
}

function animate() {
 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // ADD A NICE BACKGROUND HERE?
  
  // draw the snake, only when the mouse entered at
  // least once the canvas surface
  if(mousePos !== undefined) {
     drawSnake(mousePos.x, mousePos.y);
  }
  
  // DRAW EXTRA THINGS HERE?

  requestAnimationFrame(animate);
}

function drawSnake(posX, posY) {
      // DRAW BETTER HEAD HERE?
      dragSegment(0, posX - 8, posY - 8);
  
      for(var i=x.length-1; i >=0; i--) {
         dragSegment(i+1, x[i], y[i]);
      }  
  
      // DRAW BETTER TAIL HERE ?
}

function dragSegment(i,  xin,  yin) {
   dx = xin - x[i];
   dy = yin - y[i];
  
   angle = Math.atan2(dy, dx);
  
   x[i] = xin - Math.cos(angle) * segLength;
   y[i] = yin - Math.sin(angle) * segLength;
  
  ctx.save();
  ctx.translate(x[i], y[i]);
  ctx.rotate(angle);
  
  var segColor;
  
  // Generate funny colors, CHANGE THIS IF YOU LIKE
  if (i % 3 == 1)
    segColor = "rgba(0, 0, 0, 255)";
  else if (i % 3 == 2)
    segColor = "rgba(255, 255, 0, 255)";
  else
    segColor = "rgba(255, 0, 0, 255)";

  drawLine(0, 0, segLength, 0, segColor, 10);
  
  ctx.restore();
}

function drawLine(x1, y1, x2, y2, color, width) {
  ctx.save();
  
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  
  ctx.restore();
}
