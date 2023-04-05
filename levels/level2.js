LevelManager.levels.level2 = function() {
  movePlayer(60, 60);

  level2Audio.play();

  levelMsg.innerText = `Well, your skill has clearly shown after defeating this minigame. Your last (and final) minigame will test your mind. You will be placed in a laundromat, and a t-shirt with a number on it will appear in front of you. Collect the t-shirt and place it in the corresponding washing machine. You may not see the number again after you collect the shirt, so make sure you remember what it is! You must have over ten points in order to finish the game and win your prize!`
  
  images.push(new ImageComponent(2760, 1500, "iceSkateBackdrop", 0, -1000));

  pond.push(new ImageComponent(200, 150, "fishingHole", 1280, -325));

  for (var i = 0; i < 7; i++) { //TOP and BOT wall
    walls.push(new ImageComponent(400, 250, "iceSkateWallUp", i * 400, -1000));
    walls.push(new ImageComponent(400, 250, "iceSkateWallUp", i * 400, 500));
  }
//Side walls
  walls.push(new ImageComponent(40, 1500, "iceSkateWallSide", 0, -1000));
  walls.push(new ImageComponent(40, 1500, "iceSkateWallSide", 2760, -1000));
  
  // top left enemy
  enemy2.push(new ImageComponent(180, 180, "pengFront", 150, -700));
  enemy2ProjectileTimer.push(getRandomNumber(2, 5));
  
  // bottom left enemy
  enemy2.push(new ImageComponent(180, 180, "pengBack", 150, 250));
  enemy2ProjectileTimer.push(getRandomNumber(2, 5));

  // top right enemy
  enemy2.push(new ImageComponent(180, 180, "pengFront", 2500, -700));
  enemy2ProjectileTimer.push(getRandomNumber(2, 5));
  
  // bottom right enemy
  enemy2.push(new ImageComponent(180, 180, "pengBack", 2500, 250));
  enemy2ProjectileTimer.push(getRandomNumber(2, 5));
}
