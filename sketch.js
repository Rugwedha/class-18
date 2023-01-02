var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.4 
  doorsGroup=createGroup()
  climbersGroup = createGroup()
  invisibleBlockGroup = createGroup()
}

function draw() {
  background(200);
  if(gameState=="play"){
    if(keyDown("right")){
      ghost.x = ghost.x +2
    }
    
    if(keyDown("left")){
      ghost.x = ghost.x -2
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10
    }
    
    ghost.velocityY = ghost.velocityY +0.8
    
    
      if(tower.y > 400){
          tower.y = 300
        }
        spawnobtecels()
        if(ghost.isTouching(invisibleBlockGroup)|| ghost.y>600){
           gameState="end"
           ghost.destroy();
        }
  }
  
  drawSprites();
  if(gameState=="end"){
    textSize(25)
    fill("red")
    text("GAMEOVER",230,250);
    ground.destroy()
  }
}

function spawnobtecels() {
 if(frameCount%200==0){
  var door = createSprite(200,-50);
  door.addImage("doorimage",doorImg)
  var climber = createSprite(200,10);
  climber.addImage("climber",climberImg);
  var invisibleBlock = createSprite(200,15);
  invisibleBlock.width = climber.width
  invisibleBlock.height = 2
  door.x=Math.round(random(120,500));
  door.velocityY = 1;
  climber.x=door.x
  climber.velocityY = 1;
  invisibleBlock.x = door.x
  invisibleBlock.velocityY = 1
  door.lifetime = 800
  climber.lifetime = 800
  invisibleBlock.lifetime = 800
  door.depth = ghost.depth
  ghost.depth +=1
  doorsGroup.add(door)
  climbersGroup.add(climber)
  invisibleBlockGroup.add(invisibleBlock)
 }
}
