
// "MISSION LUNA" a game by prima2230

var bgimg,astroimg,rockimg,rockflyimg,astronaut,rocket,asteroid,astrofly,astroflyimg,astgroup;
var satelite,satgroup,bull,bulletgrp,flag,ice1,ice2,ice3,ice4,ice5,dome,domeimg;
var gameState = "Stage1";
let img;
let positions=[];
var score = 0;
var bullets = 22;
var icescore = 0;

function preload(){
  bgimg = loadImage("background.jpg");
  astroimg = loadImage("astronaut.png");
  rockimg = loadImage("rocket.static.png");
  rockflyimg = loadImage("rocket.flying.png");
  ast1 = loadImage("asteroid1.png");
  ast2 = loadImage("asteroid2.png");
  ast3 = loadImage("asteroid3.png");
  earth = loadImage("earth.png");
  astroflyimg = loadImage("astro.sit.png");
  sat1 = loadImage("sat1.png");
  sat2 = loadImage("sat2.png");
  sat3 = loadImage("sat3.png");
  bulletimg = loadImage("bull.png");
  flagimg = loadImage("flag.png");
  iceimg = loadImage("ice.png");
  domeimg = loadImage("dome.png");
  img = loadImage('earth.png'); // image texture from http://planetpixelemporium.com/

  launch = loadSound('launch.mp3');
  crash = loadSound('crash.mp3');
  hit = loadSound('bullet.mp3');
  back = loadSound('bg.mp3');
  win = loadSound('win.mp3');
  over = loadSound('uhoh.mp3');
  collect = loadSound('collect.mp3');
}

function setup() {
  createCanvas(1200,600);

  astronaut = createSprite(50,500,50,50);
  astronaut.addImage(astroimg);
  astronaut.scale = 0.15;

  rocket = createSprite(600,400,50,50);
  rocket.addImage("standing",rockimg);
  rocket.addImage("flying",rockflyimg);
  rocket.setCollider("rectangle",0,0,50,100);
  rocket.scale = 2;

  astrofly = createSprite(10,300,50,50);
  astrofly.addImage(astroflyimg);
  astrofly.setCollider("rectangle",10,10,10,10);
  astrofly.scale = 0.2;
  astrofly.velocityX = 1;
  astrofly.visible = false;
  
  flag = createSprite(1610,90,20,20);
  flag.addImage("flagimg",flagimg);
  flag.scale = 0.3;
  flag.visible = false;

  ice1 = createSprite(1800,random(200,500),20,20);
  ice1.addImage("iceimg",iceimg);
  ice1.scale = 1;
  ice1.visible = false;
  ice1.setCollider("rectangle",0,0,50,05);
  
  ice2 = createSprite(2500,random(200,500),20,20);
  ice2.addImage("iceimg",iceimg);
  ice2.scale = 1;
  ice2.visible = false;
  ice2.setCollider("rectangle",0,0,50,50);
  
  ice3 = createSprite(3200,random(200,500),20,20);
  ice3.addImage("iceimg",iceimg);
  ice3.scale = 1;
  ice3.visible = false;
  ice3.setCollider("rectangle",0,0,50,50);
  
  ice4 = createSprite(3600,random(200,500),20,20);
  ice4.addImage("iceimg",iceimg);
  ice4.scale = 1;
  ice4.visible = false;
  ice4.setCollider("rectangle",0,0,50,50);
  
  ice5 = createSprite(4000,random(200,500),20,20);
  ice5.addImage("iceimg",iceimg);
  ice5.scale = 1;
  ice5.visible = false;
  ice5.setCollider("rectangle",0,0,50,50);

  dome = createSprite(740,115,30,30);
  dome.addImage("domeimg",domeimg);
  dome.scale = 0.65;
  dome.visible = false;
  dome.setCollider("rectangle",0,0,50,50);
  
  astgroup = createGroup();
  satgroup = createGroup();
  bulletgrp = createGroup();

  for (let i=0; i<100; i++){
    positions.push([random(-250,230), random(-250,230),random(-8,12) ])
  }
}

function draw() {
  background(bgimg);

  console.log(World.seconds);

  // STAGE 1
  if(gameState==="Stage1"){
    fill(255);
    stroke(50);
    strokeWeight(5);
    textSize(28);
    text("SCORE: "+score,4,25);
    text("Mission LUNA begins !",490,23);
    textSize(25);
    text("The Rocket's about to leave !! Press the Right Arrow to take off !!",300,80);

    if(World.seconds>4){
      fill(255,0,0);
      textSize(26)
      text("Your time has started !",30,200);
    }

    fill(140,200,200);
    textSize(25);
    text("You only have 2.5 MINUTES to complete this Mission",360,53);

    if(keyDown(RIGHT_ARROW)){
      astronaut.x += 10;
      text("You're about to face a massive Asteroid Attack ! Watch Out !",330,110);
    }
    if(astronaut.isTouching(rocket)){
      rocket.changeImage("flying",rockflyimg);
      astronaut.visible = false;
      rocket.velocityY = -7;
      launch.play();
    }
    if(rocket.y<0){
      rocket.destroy();
      bgimg = loadImage("space.jpg");
      score +=50;
      gameState ="Stage2";
      launch.stop();
      back.play();
    }
  }
  // STAGE 2 
  if(gameState==="Stage2"){
    image(img,50,height/2,200,200);
    
    camera.on();
    camera.position.x = astrofly.x;
    camera.position.y = height/2;

    astrofly.visible = true;
    spawnAsteroids();

    fill(255);
    stroke(0);
    strokeWeight(5);
    textSize(28);
    text("SCORE: "+score,astrofly.x-600,23); 
    
    if(World.seconds===20){
      fill(0,255,255);
      textSize(25);
      text("2 MINUTES LEFT",astrofly.x-70,50);
    }
    if(World.seconds===80){
      fill(0,255,255);
      stroke(0);
      textSize(25);
      text("1 MINUTE LEFT",astrofly.x-70,50);
      }
    if(World.seconds===110){
      fill(0,255,255);
      stroke(0);
      textSize(25);
      text("30 SECONDS LEFT",astrofly.x-70,50);
      }
    if(score < 450){
      fill(255,0,0); 
      textSize(24);
      text("Use UP & DOWN ARROW keys to Steer the Rocket. AVOID the ASTEROIDS",astrofly.x-350,22);
    }
    else{
      fill("red");
      text("TARGET SCORE: 800",astrofly.x-100,22);
    }

    if(keyDown(UP_ARROW)){
      astrofly.y = astrofly.y-10;
    }
    if(keyDown(DOWN_ARROW)){
      astrofly.y = astrofly.y+10;
    } 
    if(astrofly.y<0 || astrofly.y>600){
      crash.play();
      text("Stay in the Zone",width/2,height/2);
    }
    if(astrofly.isTouching(astgroup)){
      crash.play();
      score = score-20;
      textSize(30);
      text("OUCH !",astrofly.x-250,astrofly.y);
    }
    else{score = score+1};
     
    if(score>=800){
      gameState="Stage3";
    }
 
    // STAGE OVER
    if(World.seconds===140 || score<50){
      gameState = "over";
      over.play();
      back.stop();
    }
    if(gameState==="over"){
      bgimg = loadImage("gameover.jpg");
      astgroup.destroyEach();
    }
  }

  // STAGE 3
  if(gameState==="Stage3"){
  
    astgroup.destroyEach();
    bgimg = loadImage("space2.jpg");

    astrofly.velocityX = 0;
    astrofly.y = mouseY;

    fill(255);
    stroke(0);
    strokeWeight(5);
    textSize(28);
    text("SCORE: "+score,astrofly.x-600,49);
    text("BULLETS: "+bullets,astrofly.x-600,72);

    fill(175,130,160);
    textSize(24);
    text("MISSION:Destroy the Neighbouring Country's Spying Satellites.Move your CURSOR and press SPACE",astrofly.x-550,19);
    text("TARGET:1650.Limited Bullets",astrofly.x-170,41);
    
    spawnSat();
    
    if(keyWentDown("SPACE")){
      bullet();
      bullets = bullets-1;
    }

    for (var l = 0; l < satgroup.length; l++) {
      mysprite =  satgroup.get(l);
      if(mysprite.isTouching(bulletgrp)){
        for (var n = 0; n < bulletgrp.length; n++) {
          mybull =  bulletgrp.get(n);
          mysprite.destroy();
          mybull.destroy();
          score+=50;
          hit.play();
        }
      }
    } 
    
    if(World.seconds===20){
      fill(0,255,255);
      stroke(0);
      textSize(22);
      text("2 MINUTES LEFT",astrofly.x-80,65);
    }
    if(World.seconds===80){
      fill(0,255,255);
      stroke(0);
      textSize(22);
      text("1 MINUTE LEFT",astrofly.x-80,65);
    }
    if(World.seconds===110){
      fill(0,255,255);
      stroke(0);
      textSize(22);
      text("30 SECONDS LEFT",astrofly.x-80,65);
    }
    if(astrofly.isTouching(satgroup)){
      crash.play();
      score = score-20;
    }
    if(score >1600){
      gameState ="Stage4";
    }

    // STAGE OVER
    if(World.seconds===140 || score<700 || bullets<0){
      gameState = "over";
      over.play();
      back.stop();
    }
    if(gameState=="over"){
      bgimg=loadImage("gameover.jpg");
      satgroup.destroyEach();
      astrofly.velocityX = 1;
   }
  }

  // STAGE 4  
  if(gameState==="Stage4"){
    camera.on();
    camera.position.x = astronaut.x;
    camera.position.y = height/2;

    
    fill("red");
    stroke(0);
    strokeWeight(5);
    textSize(25);
    text("Find samples of ICE for research and take them back to the DOME",160,250);
    text("Use ARROW keys to EXPLORE (UP,DOWN,LEFT,RIGHT)",160,280);
    text("Start with the RIGHT ARROW KEY",160,310);

    fill(255);
    stroke(0);
    strokeWeight(5);
    textSize(28);
    text("SCORE: "+score,160,50);
    text("SAMPLES COLLECTED: "+icescore,160,80);
    satgroup.destroyEach();
    bulletgrp.destroyEach();
    bgimg = loadImage("moongrd.jpg");

    astrofly.visible = false;
    astronaut.visible = true;
    flag.visible = true;
    ice1.visible = true;
    ice2.visible = true;
    ice3.visible = true;
    ice4.visible = true;
    ice5.visible = true;
    dome.visible = true;
    
    if(keyDown(LEFT_ARROW)){
      text("<-You're going left",astronaut.x+45,astronaut.y);
      astronaut.x = astronaut.x-10;
    }
    if(keyDown(RIGHT_ARROW)){
      text("You're going right->",astronaut.x-270,astronaut.y);
      astronaut.x = astronaut.x+10;
    } 
    if(keyDown(UP_ARROW)){
      astronaut.y = astronaut.y-10;
    }
    if(keyDown(DOWN_ARROW)){
      astronaut.y = astronaut.y+10;
    }
    if(astronaut.isTouching(ice1)){
      collect.play();
      score+=50
      icescore+=1;
      ice1.destroy();
    }
    if(astronaut.isTouching(ice2)){
      collect.play();
      score+=50
      icescore+=1;
      ice2.destroy();
    }
    if(astronaut.isTouching(ice3)){
      collect.play();
      score+=50
      icescore+=1;
      ice3.destroy();
    }
    if(astronaut.isTouching(ice4)){
      collect.play();
      score+=50
      icescore+=1;
      ice4.destroy();
    }
    if(astronaut.isTouching(ice5)){
      collect.play();
      score+=50
      icescore+=1;
      ice5.destroy();
    }
    if(icescore===5){
      fill(255,255,0);
      textSize(30);
      text("<-Enough Samples Collected,Go Back To The DOME <-",3500,astronaut.y*0.5);
    }
    if(World.seconds===80){
      fill(0,255,255);
      stroke(0);
      textSize(22);
      text("1 MINUTE LEFT",astronaut.x-20,astronaut.y*0.2);
    }
    if(World.seconds===110){
      fill(0,255,255);
      stroke(0);
      textSize(22);
      text("30 SECONDS LEFT",astrofly.x-20,astronaut.y*0.2);
    }
    if(World.seconds===140){
      gameState = "over";
      back.stop();
      over.play();
    }
    if(icescore===5 && astronaut.isTouching(dome)){
      gameState = "Complete";
      back.stop();
      win.play();
    }
  }

  // STAGE OVER
  if(gameState=="over"){
    bgimg=loadImage("gameover.jpg");
    astronaut.destroy();
    dome.destroy();
    flag.destroy();
    ice1.destroy();
    ice2.destroy();
    ice3.destroy();
    ice4.destroy();
    ice5.destroy();
  }

  //Stage Complete
  if(gameState==="Complete"){
    dome.destroy();
    astronaut.destroy();
    bgimg=loadImage("done.jpg");

    fill(255);
    stroke("red");
    textSize(30);
    text("SCORE: "+score,650,500);
    text("SAMPLES COLLECTED: "+icescore,575,550);
    fill("red")
    stroke(255);
    text("WE OWE YOU A DEBT OF GRATITUTUDE !",470,50);
    text("Congratulations, the research operation was successful !",390,100);
  }
  drawSprites(); 
}

function spawnAsteroids(){
  if(frameCount%5===0){
    var asteroid = createSprite(random(camera.position.x*2.5,camera.position.x*4),random(-10,700),20,20);
    asteroid.velocityX = random(-2,-5);
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1:
        asteroid.addImage("asteroid1",ast1);
        break;
      case 2:
      asteroid.addImage("asteroid2",ast2);
        break;
      case 3:
      asteroid.addImage("asteroid3",ast3);
        break;
      default:
        break;
      }
    astgroup.add(asteroid);
    asteroid.scale = 0.2;
    }
  }

  function spawnSat(){
    if(frameCount%55===0){
      var satelite = createSprite(random(1600, 1700),random(0,610),20,20);
      satelite.velocityX = random(-1,-5);
      var rand = Math.round(random(1,3));
      switch(rand){
        case 1:
          satelite.addImage("sat1",sat1);
          break;
        case 2:
          satelite.addImage("sat2",sat2);
          break;
        case 3:
        satelite.addImage("sat3",sat3);
          break;
        default:
          break;
      }
      satgroup.add(satelite);
      satelite.scale = 0.4;
    }
  }

  function bullet(){
    bull = createSprite(astrofly.x,astrofly.y,20,10);
    bull.addImage("bulletimg",bulletimg);
    bull.scale = 0.15;
    bull.velocityX = 10;
    bulletgrp.add(bull);
  }