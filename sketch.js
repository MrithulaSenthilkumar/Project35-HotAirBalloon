var balloon;
var backgroundImage;
var balloonImage1,balloonImage2;
var dataBase;
var balloonPosition;

function preload(){
  backgroundImage=loadImage("Hot Air Ballon-01.png");
  balloonImage1=loadAnimation("b1.png");
}

function setup() {
  createCanvas(800,400);
  
  balloon=createSprite(200,200,40,60);
  balloon.addAnimation("b1",balloonImage1);
  balloon.scale=0.5;

  dataBase=firebase.database();
  var balloonHeight=dataBase.ref("balloon/position");
  balloonHeight.on("value",readPosition);
}

function writePosition(x,y){
  balloon.x=balloon.x+x;
  balloon.y=balloon.y+y;
  dataBase.ref("balloon/position").set({
    x:balloon.x,
    y:balloon.y
  })
}

function readPosition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
  console.log(position);
}

function draw() {
  background(backgroundImage);  

  if(keyDown("left")){
    writePosition(-2,0);
    balloon.scale=0.9;
  }else if(keyDown("right")){
    writePosition(2,0);
    balloon.scale=0.4;
  }else if(keyDown("up")){
    writePosition(0,-2);
    balloon.scale=1;
  }else if(keyDown("down")){
    writePosition(0,2);
    balloon.scale=0.2;
  }

  textSize(25);
  textStyle("bold");
  text("Use the Arrow Keys to move the Hot Air Balloon",150,50);

  drawSprites();
}