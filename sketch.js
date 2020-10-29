var PLAY = 1;
var END = 0;
var gameState = PLAY;

var canvas

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, cloud,obstacle;

var score = 0;

var gameOver, restart;



localStorage["HighestScore"] = 0;

function preload(){
  trex_running = loadAnimation("images/trex1.png", "images/trex3.png", "images/trex4.png");
  trex_collided = loadAnimation("images/trex_collided.png");

  groundImage = loadImage("images/ground2.png");

  cloudImage = loadImage("images/cloud.png");

  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");
}

function setup(){
  canvas = createCanvas(displayWidth,displayHeight);

  trex = createSprite(70,canvas.height-30,10,10);
  trex.addAnimation("running",trex_running);
  trex.scale = 0.9;
  
  ground = createSprite(canvas.width/2,canvas.height-20,canvas.width,10);
  ground.addImage(groundImage);

  gameOver = createSprite(width/2, height/2 - 100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(width/2, height/2 - 60);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(width/2, height-10, width, 10);
  invisibleGround.visible = false;
  
  trex.debug = true;
  trex.setCollider("circle",0,0,30);

  cloudsGroup = new Group();
  obstaclesGroup = new Group();


  score = 0;
  
}

function draw(){
  background("white");

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    ground.velocityX = -(6 + 3 * score / 100);
  }

  camera.position.y = trex.y;
  if (keyDown("space") && trex.y >= height - 270) {
    trex.velocityY = -12;
  }

  trex.velocityY = trex.velocityY + 0.8

  if (ground.x < displayWidth/2) {
    ground.x = ground.width / 2;
  }

  trex.collide(invisibleGround);
  

  if(frameCount%60 === 0){
    cloud = new Cloud();
    cloudsGroup.add(cloud.cloud);
  }

  if(frameCount%120 === 0){
    obstacle = new Obstacle();
    obstaclesGroup.add (obstacle.obs);
  }

  if(obstaclesGroup.isTouching(trex)) {
    gameState = END;
  }

  if (touches.length > 0) {
    touches = [];
  } else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    trex.changeAnimation("collided", trex_collided);

    if (mousePressedOver(restart)) {
      reset();
    }

    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  }

  drawSprites();
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  trex.changeAnimation("running", trex_running);

  if (localStorage["HighestScore"] < score) {
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);

  score = 0;

}