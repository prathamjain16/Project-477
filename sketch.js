var track;
var runner;
var energyDrink, bomb, coin;
var invisibleGround_1,invisibleGround_2;
var Score;
function preload(){
  //pre-load images
  trackImg = loadImage("path.png");
  energyDrinkImg = loadImage("energyDrink.png");
  bombImg = loadImage("bomb.png");
  coinImg = loadImage("coin.png");
  runnerAnimation = loadAnimation("Runner-1.png","Runner-2.png");
  runner1 = loadAnimation("Runner-1.png","Runner-1.png");
}

function setup(){
  createCanvas(400,400);
  //create sprites here
  track = createSprite(200,200);
	track.addImage(trackImg);
  track.y = height/2;
	track.velocityY = 3;
  track.scale = 1;

	runner = createSprite(200,325,20,50);
	runner.addAnimation("running", runnerAnimation);
	runner.scale = 0.05;

  invisibleGround_1 = createSprite(65,0,10,1000);
  invisibleGround_1.visible = false;

  invisibleGround_2 = createSprite(340,0,10,1000);
  invisibleGround_2.visible = false;

  energyDrinkG=new Group();
  bombG=new Group();
  coinG=new Group();

  Score = 0;
}

function draw() {
  background(0);

  if (track.y > 500){
    track.y = height/2;
  }

  runner.collide(invisibleGround_1);
  runner.collide(invisibleGround_2);

  // runner.x=World.mouseX;

  if (keyDown("right")) {
    runner.x = runner.x+10;
  }

  if (keyDown("left")) {
    runner.x = runner.x-10;
  }

  spawnEnergyDrink();
  spawnBomb();
  spawnCoin();

  if (energyDrinkG.isTouching(runner)) {
      energyDrinkG.destroyEach();
      Score = Score+1;
  }
  else if (bombG.isTouching(runner)) {
      bombG.destroyEach();
      track.velocityY = 0;
      coinG.setVelocityYEach(0);
      energyDrinkG.setVelocityYEach(0);
      runner.visible = false;
      text("You've crashed the bomb and your score is:"+ Score,100,100);
  }
  else if (coinG.isTouching(runner)) {
      coinG.destroyEach();
      Score = Score+1;
  }
  fill(255,0,0);
  text("Score: "+ Score, 2,20);
  drawSprites();
}

function spawnEnergyDrink(){
  if (World.frameCount % 350 == 0) {
  var energyDrink = createSprite(Math.round(random(50, width-50),40, 10, 10));
  energyDrink.addImage(energyDrinkImg);
  energyDrink.scale=0.1;
  energyDrink.velocityY = 3;
  energyDrink.lifetime = 150;
  energyDrinkG.add(energyDrink);
  }
}

function spawnBomb(){
  if (World.frameCount % 250 == 0) {
  var bomb = createSprite(Math.round(random(50, width-50),40, 10, 10));
  bomb.addImage(bombImg);
  bomb.scale=0.1;
  bomb.velocityY = 3;
  bomb.lifetime = 150;
  bombG.add(bomb);
  }
}

function spawnCoin(){
  if (World.frameCount % 150 == 0) {
  var coin = createSprite(Math.round(random(50, width-70),40, 10, 10));
  coin.addImage(coinImg);
  coin.scale=0.5;
  coin.velocityY = 3;
  coin.lifetime = 150;
  coinG.add(coin);
  }
}