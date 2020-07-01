var trex, trex_running, trex_collided,cloud,cloudimg,obstacle,obstacleimg,obstacleimg1,obstacleimg,obstacleimg3,obstacleimg4,obstacleimg5,obstacleimg6,resetimg,overimg,reset,over,gamestate,obstaclegroup,cloudgroup,collided;
var ground, invisibleGround, groundImage,collided;
var score=0;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  cloudimg=loadImage("cloud.png");
  groundImage = loadImage("ground2.png")
  obstacleimg1=loadImage("obstacle1.png");
    obstacleimg2=loadImage("obstacle2.png");
    obstacleimg3=loadImage("obstacle3.png");
    obstacleimg4=loadImage("obstacle4.png");
    obstacleimg5=loadImage("obstacle5.png");
    obstacleimg6=loadImage("obstacle6.png");
  resetimg=loadImage("restart.png");
  overimg=loadImage("gameOver.png");
  obstaclegroup=new Group();
  cloudgroup=new Group();
}


function setup() {
  createCanvas(600, 200);
  gamestate="play";
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
   reset = createSprite(300,140);
  reset.addImage(resetimg);
  over = createSprite(300,100);
  over.addImage(overimg);
  reset.scale=0.5;
  over.scale=0.5;
}

function draw() {
  background("white");
 
  reset.visible=false;
    over.visible=false;
  if (gamestate==="play"){
    ground.velocityX = -(6+ 3*score/100);
  if(keyDown("space")&& trex.collide(invisibleGround)) {
    trex.velocityY = -11.5;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  score=score+Math.round(getFrameRate()/60);
  
  spawnClouds();
  spawnObstacles();
   if(obstaclegroup.isTouching(trex)){
      gamestate="end";
       }
}else if(gamestate==="end"){
  reset.visible=true;
      over.visible=true;
      ground.velocityX=0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
      trex.changeAnimation("collided",trex_collided);
  trex.velocityY=0;
  if(mousePressedOver(reset)) {
    gamestate="play";
    obstaclegroup.destroyEach();
    cloudgroup.destroyEach();
trex.changeAnimation("running",trex_running);
    over.visible=false;
    reset.visible=false;
    score = 0;
}
    
}
  text("Score:"+score,530,25);
  drawSprites();
}
function spawnClouds(){
  if(World.frameCount%60===0){
    cloud=createSprite(600,random(50,150),20,10);
    cloud.addImage(cloudimg);
    cloud.scale=0.5;
    cloud.velocityX=- (6+3*score/100);
    cloud.lifeTime=150;
    cloud.depth=trex.depth-1;
    cloudgroup.add(cloud);
  }
}
function spawnObstacles(){
  
  if(World.frameCount%60===0){
    obstacle=createSprite(600,165,10,20);
    rand=Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacleimg1);
              break;
      case 2:   obstacle.addImage(obstacleimg2);
              break;
      case 3:   obstacle.addImage(obstacleimg3);
              break;
      case 4:   obstacle.addImage(obstacleimg4);
              break;
      case 5:   obstacle.addImage(obstacleimg5);
              break;
      case 6:obstacle.addImage(obstacleimg6);
              break;
              default:break;
    }
    obstacle.scale=0.5;
    obstacle.velocityX=-(6+3*score/100);
    obstacle.lifeTime=150;
 obstaclegroup.add(obstacle);
  }
}

