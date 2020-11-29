var play = 1;
var end = 0;
var gameState = play;
var monkey,monkey_running,obstacle,obstacleImage;
var banana,bananaImage,ground1,obstacle,obstacleImage,bananaGroup,score,obstacleGroup,monkey_collided,survivalTime;

function preload(){
  monkey_running  = loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  obstacleImage = loadImage("obstacle.png");
  bananaImage = loadImage("banana.png");
  monkey_collided = loadAnimation("sprite_0.png")
}

function setup(){
  createCanvas(500,500);
  monkey = createSprite(0,270,20,20);
  monkey.addAnimation("MONKEY",monkey_running);
  monkey.x = 70;
  monkey.y = 270;
  monkey.scale = 0.1;
  
  monkey.addAnimation("collided",monkey_collided);
  
  ground = createSprite(250,305,500,10);
  
 
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  survivalTime = 0;
}

function draw(){
  background("turquoise");
  
  text("score = " + score,410,20);
  
  text("SURVIVAL TIME = " + survivalTime,230,50);
  
  
  if(gameState === play){
   
    if(keyDown("space") && monkey.y >=230){ 
    monkey.velocityY = -15;
  }
  monkey.velocityY = monkey.velocityY +0.8;
  monkey.collide(ground);
  
  survivalTime = Math.ceil(frameCount/frameRate())
    
  if(bananaGroup.collide(monkey)){
    
    score = score+1;
    bananaGroup.destroyEach();
   
    
    
  }
  
  
  
    
    bananas();
    
    obstacles();
    
  }
  
  if(obstacleGroup.collide(monkey)){
    
    gameState = end;
    
  }
  
   if(gameState === end){
     
     banana.velocityX = 0;
     
     obstacle.velocityX = 0;
     
     monkey.changeAnimation("collided",monkey_collided);
     
     text("GAME OVER",250,150);
   }
  
  
  
  drawSprites();
}


  function bananas(){
    
   if (frameCount % 150 === 0) {
    banana = createSprite(500,100,40,10);
    banana.y = Math.round(random(100,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    
     bananaGroup.add(banana);
     
   } 
    
  }

  function obstacles(){
    
   if (frameCount % 150 === 0) {
      
      obstacle = createSprite(500,270,10,10);
  obstacle.addImage("OBSTACLE",obstacleImage);
     obstacle.y = Math.round(random(270,270));
  obstacle.scale = 0.15;
  obstacle.velocityX = -3;
     
     obstacleGroup.add(obstacle);
     
   }
  }