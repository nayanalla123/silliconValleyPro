var ground , groundImg ,ivground ;
var ninja,runningNinjaImg;
var zombieImg;
var zombieGroup;
var bg; 
var cloudImg;
var cloudsGroup;
var goldCoinsImg;
var coinGroup;
var score=0;
var PLAY=1;
var END=0;
var life=3;
var gameState=PLAY;
var restart,restartImg;
var gameover,gameoverImg;

localStorage["HighestScore"]=0;

function preload(){
groundImg=loadImage("ground.png")
runningNinjaImg=loadAnimation("ninja1.png","ninja2.png","ninja3.png","ninja4.png")
zombieImg=loadAnimation("zombie.png","zombie1.png","zombie2.png","zombie4.png","zombie5.png","zombie6.png")
bg=loadImage("bg1.jpg")
cloudImg=loadImage("cloud.png")
goldCoinsImg=loadImage("goldCoin.png")
restartImg=loadImage("restart.png")
gameoverImg=loadImage("gameOver.png")


}

function setup(){
createCanvas(windowWidth,windowHeight);
ground=createSprite(width/2,height-30,width,20)
ground.addImage("ground",groundImg); 

ivground=createSprite(width/2,height-25,width,20)
ivground.visible=false


ninja=createSprite(50,height-100,50,50);
ninja.addAnimation("runningNinja",runningNinjaImg)
ninja.scale = 1.5;

restart = createSprite(width/2,height/2-100) 
 restart.addImage("restart",restartImg)
 restart.scale = 0.4
 restart.visible = false

 gameover = createSprite(width/2,height/2-100) 
 gameover.addImage("khelkhalas",gameoverImg)
 gameover.scale = 0.4
 gameover.visible = false

coinGroup=new Group();
zombieGroup=new Group ();
cloudsGroup=new Group ();




}

function draw(){
background(bg);
fill("white");
textSize(30);
text("score:"+score,150,50);
text("life:"+life,300,50);




if(gameState===PLAY){
    ground.velocityX=-(score+3)*2
    restart.visible=false
    if(ground.x<500){
    ground.x=ground.width/2
    }

    if(keyDown("SPACE")&& ninja.y>400){

    ninja.velocityY=-15

}
ninja.velocityY=ninja.velocityY+0.8

if(coinGroup.isTouching(ninja)){
    score=score+1
    coinGroup[0].destroy();
    }
    if(zombieGroup.isTouching(ninja)){
        life=life-1
       zombieGroup[0].destroy();
        gameState=END
        
        }
    spawnClouds()
    spawnZombies()
    spawnCoins()
    

}
else if(gameState===END){
    ground.velocityX=0
    restart.visible=true;

    zombieGroup.setVelocityXEach(0)
    zombieGroup.setLifetimeEach(-1)

    coinGroup.setVelocityXEach(0)
    coinGroup.setLifetimeEach(-1)

    cloudsGroup.setVelocityXEach(0)
    cloudsGroup.setLifetimeEach(-1)

    if (mousePressedOver(restart)&&life>0){
reset()
    }
if (life===0){
gameover.visible=true;
restart.visible=false;
}
}





ninja.collide(ivground)
drawSprites();
}
 function spawnZombies(){
     if(frameCount%250===0){
         var zombie =createSprite(width+50,height-110,50,50)
         zombie.addAnimation("runZombie",zombieImg)
         zombie.velocityX=-(score+3)*2
         zombieGroup.add(zombie);

     }
 }

 function spawnClouds(){
    if(frameCount%100===0){
        var cloud =createSprite(1250,random(50,150),50,50)
        cloud.addImage("cloudy",cloudImg)
        cloud.velocityX=-3
        cloud.scale=1.5
        cloudsGroup.add(cloud)

    }
}

function spawnCoins(){
    if(frameCount%150===0){
        var coin =createSprite(1250,random(300,400),20,20)
        coin.addImage("coiny",goldCoinsImg)
        coin.velocityX=-3
        coin.scale=0.1
        coinGroup.add(coin)

    }
}


function reset(){ 
    gameState = PLAY 
    cloudsGroup.destroyEach() 
    zombieGroup.destroyEach()
     coinGroup.destroyEach()
     restart.visible = false
      if(localStorage["HighestScore"]<score){ 
          localStorage["HighestScore"]=score 
        } 
        score = 0 
    }





