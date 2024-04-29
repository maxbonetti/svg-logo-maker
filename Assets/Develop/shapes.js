var rc = reuqire('random-color');
var shapes = reuqire('shapes');
 
var ShapeEventEmitter = shapes.ShapeEventEmitter;
var Circle = shapes.Circle;
 
var canvas  =  document.getElementById('c');
var ctx = canvas.getContext('2d');
 
var myShape = new Circle([200,200],50);
 
var myShapeEmitter = new ShapeEventEmitter(myShape,canvas);
 
myShape.stroke(ctx);
 
myShapeEmitter.on("click",function(){
  ctx.fillStyle = rc(); //get a random color
  myShape.fill(ctx);
});

module.exports {
    Circle,
    shapes,
};