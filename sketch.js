var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var gameoverimg,restartimg,gameover,restart;

var cloudsGroup, cloudImage;
var platformsGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


var gamestate= 'Start';


var sound,soundDie,soundJump;
var meteoriteImg;

var leftButton, rightButton 

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("collapse.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  
  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
  
  meteoriteImg=loadImage("Images/asteroid2.png");

  bg=loadImage("Images/bgImg.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

leftButton=createButton("<-");
leftButton.position(windowWidth-100, 50);

rightButton=createButton("->");
rightButton.position(windowWidth-50, 50)  

  trex = createSprite(windowWidth-650,575,1,1);
  trex.visible=false;
  //trex.scale = 0.9;
  trex.setCollider("circle",8,0,40);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided); 

 ground = createSprite(0,615,1600,20);
 ground.x = ground.width/2;
 ground.visible=false;
  
 invisibleGround = createSprite(400,603,2000,3);
 invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  platformsGroup = new Group();
  
  
  
  score = 0;
  
  gameover=createSprite(600,300,10,10);
  gameover.addImage(gameoverimg);
  gameover.scale=0.4;
  
  restart=createSprite(600,280,10,10);
  restart.addImage(restartimg);
  restart.scale=0.4;
  
  restart.visible=false;
  gameover.visible=false;
  
  sound=loadSound("checkPoint.mp3");
  soundDie=loadSound("die.mp3");
  soundJump=loadSound("jump.mp3");
}

function draw(){
  background(bg);
//trex.debug=true;
strokeWeight(5);
stroke(0);
fill("red");
textSize(20);
text("Score: "+ score, windowWidth-50,50);
if(gamestate==='Start'){
  fill("orange");
  strokeWeight(5);
  stroke("red");
  textSize(17)
  text("Instructions :-", windowWidth/2-100,220);
  text("Press the buttons in the top right corner to move", windowWidth/2-100, 250);
  text("Avoid the meteorites!", windowWidth/2-100, 280);
  text("Press Space to play", windowWidth/2-100, 310)
  fill("orange");
  strokeWeight(7);
  stroke("blue");
  textSize(50);
  text("Extinction Event",windowWidth/2, 80);
  if(keyDown('space')){
    gamestate='Play';

  }

 

}

  if(gamestate==='Play'){
   /* if(keyDown("space")&&trex.y>=159){
    trex.velocityY = -13;
    //soundJump;
  }*/

  trex.visible=true;
  ground.visible=true;
  
  trex.velocityY = trex.velocityY + 0.8
  
  score = score + Math.round(getFrameRate()/60);
 
  
  

  leftButton.mousePressed(()=>{
    trex.x-=20; 
  });
    
   rightButton.mousePressed(()=>{
     trex.x+=20; 
   });
    
  /*if (ground.x < 0){
    //ground.x = ground.width/2;
  }*/
  
    
  
  //spawnClouds();
  spawnPlatforms();
  
   /* if(trex.isTouching(platformsGroup)){
     soundDie.play();
     gamestate=END;
    }*/
  }

  for (var i = 0; i < platformsGroup.length; i++){ 
    if (platformsGroup.get(i).isTouching(trex)) { platformsGroup.get(i).destroy(); 
   trex.changeAnimation('collided',trex_collided);
    gamestate='End';
    }
  }
    if(gamestate==='End'){
    restart.visible=true;
    gameover.visible=true;
    platformsGroup.setVelocityYEach(0);
    platformsGroup.setLifetimeEach(-1);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    trex.velocityY=0;
    trex.changeImage("collided", trex_collided);
    fill("red");
    strokeWeight(3);
    stroke("blue");
    textSize(30);
    text("Game over! Dino went extinct!", 500, 200);

  }
  
  if(mousePressedOver(restart)){
  reset();
  }
  
  //trex.collide(ground);
  trex.collide(invisibleGround);
  //trex.collide(platformsGroup);
  drawSprites();
}

function spawnClouds(){
  //write code here to spawn the clouds
  if (frameCount % 70 === 0) {
    var cloud = createSprite(Math.round(random(40,100)),10,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityY = 4;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnPlatforms() {
  if(frameCount%30===0){
    var platforms = createSprite(random(50, 1000),0, 1,1);
    platforms.setCollider('circle',0,150,300);
    //platforms.debug=true;
    platforms.addImage(meteoriteImg);
    platforms.velocityY=(6+3*score/100);
    platforms.scale=0.1; 
    platforms.lifetime = 200;
    platforms.y+=20;
    platformsGroup.add(platforms);
    console.log(platforms.velocityY);
  }
    //generate random obstacles
    /*var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }*/
    
    //assign scale and lifetime to the obstacle           
    //obstacle.scale = 0.5;
     
    //add each obstacle to the group
    
  
}

function reset(){
  gamestate='Start';
  
  //ground.velocityX=-4;
  
  gameover.visible=false;
  restart.visible=false;
  
  platformsGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  trex.y=590;
  
  score=0;
  
}



