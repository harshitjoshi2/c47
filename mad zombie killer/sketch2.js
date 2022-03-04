var bgImg,bg;
var zombie1,zombie2,zombie3;
var hero,heroImg;
var zombie1Img,zombie2Img,zombie3Img;
var heroRun,heroShoot;
var zombie1Group;
var zombie2Group;

var life=5;
var score=0;

var bullet,bulletImg,bulletGroup;
var gameState="play";

function preload(){
bgImg = loadImage("zombies images/background.jpg");
heroImg = loadImage("hero shooting/hero2.png");
zombie1Img=loadImage("zombies images/zombie1.png");
zombie2Img=loadImage("zombies images/zombie2.png");
zombie3Img=loadImage("zombies images/cerif zombie.png");
heroRun=loadAnimation("hero running/run1.png","hero running/run2.png","hero running/run3.png","hero running/run4.png","hero running/run5.png","hero running/run6.png");
heroShoot=loadAnimation("hero shooting/hero1.png","hero shooting/hero2.png","hero shooting/hero3.png","hero shooting/hero4.png","hero shooting/hero5.png")
bulletImg=loadImage("hero shooting/bullet.png");
}

function setup(){
createCanvas(windowWidth-100,windowHeight-100);

hero=createSprite(200,500,50,100);
hero.addImage("hero",heroImg);
hero.addAnimation("run",heroRun);
hero.addAnimation("shoot",heroShoot);
zombie1Group=new Group();
zombie2Group=new Group();
bulletGroup=new Group();
    

}

function draw(){
background(bgImg);

textSize(40)
text("life: "+life,50,50);

text("Score: "+score,width-250,50);

if(gameState==="play"){
  if(keyDown("RIGHT_ARROW")){
    hero.x+=5;
    hero.changeAnimation("run");
    hero.scale=2.5;
  }
  
  if(keyDown("LEFT_ARROW")){
    hero.x-=5;
    hero.changeAnimation("run");
    hero.scale=2.5;
  }
  if(hero.x<0){
    hero.x=10;
  }
  
  if(hero.x>windowWidth-100){
    hero.x=windowWidth-150;
  }
  
  if(hero.isTouching(zombie1Group)){
   zombie1Group.destroyEach();
   life=life-1;
  }
  
  if(hero.isTouching(zombie2Group)){
    zombie2Group.destroyEach();
    life=life-1;
   }

   if(keyDown("space")){
     createBullet();
   }

   if(bulletGroup.isTouching(zombie1Group)){
   bulletGroup.destroyEach();
   zombie1Group.destroyEach();
   score+=50;
   }

   if(bulletGroup.isTouching(zombie2Group)){
    bulletGroup.destroyEach();
    zombie2Group.destroyEach();
    score+=70;
    }

    if(zombie2Group.y>=600){
      score-=30;
    }
   
 if(score>=300&&score<=310){
text("Good Job !",width/2,height/2);
 }
 if(score>=500&&score<=510){
  text("Doing Great !",width/2,height/2);
   }

   if(score>=1000&&score<=1010){
    text("excellent !",width/2,height/2);
     }
if(score>=1500){
  gameState="win";
}




   spawnZombie1();
spawnZombie2();

if(life<1){
  gameState="end";
}
}
else if(gameState==="end"){
  textSize(70);
 fill("red");
  text("Game Over",400,height/2);

  hero.destroy();
  zombie1Group.destroyEach();
  zombie2Group.destroyEach();
}

else if(gameState==="win"){
  hero.destroy();
  zombie1Group.destroyEach();
  zombie2Group.destroyEach();
  textSize(100);
  fill("blue")
  text("you survived",400,height/2);

}

drawSprites();
}


function spawnZombie1(){
  if(frameCount%550===0){
    zombie1=createSprite(width-50,500,50,100);
    zombie1.addImage(zombie1Img);
    zombie1.velocityX=-2;
    zombie1Group.add(zombie1);
  }

}

function spawnZombie2(){
  if(frameCount%250===0){
    zombie2=createSprite(100,-100,50,100);
    zombie2.x=Math.round(random(100,width-50));
    zombie2.addImage(zombie2Img);
   
    zombie2.setCollider("circle",0,0,20);
    zombie2.debug=true;
    zombie2.velocityY=2;
    zombie2Group.add(zombie2);
  }
}

function createBullet(){
  bullet=createSprite(hero.x+100,hero.y-50,50,50);
  bullet.scale=0.25;
  bullet.addImage(bulletImg);
  bullet.velocityX=4;
  bulletGroup.add(bullet);
}