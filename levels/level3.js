LevelManager.levels.level3 = function() {
  movePlayer(594, 314);

  level3Audio.play();

  levelMsg.innerText = `Congratulations! You have proved yourself to be worthy of winning the Springfield Heights Mall competition for a prize of $100,000! Thank you for competing in our game.`
  nextBtn.style.display = "none";

  spawnShirt();
  
  // backdrop
  images.push(new ImageComponent(1600, 1000, "laundromatBackdrop", -200, -100));

  washingMachine.push(new ImageComponent(400, 250, "laundromatWallFront", -200, -100));
  frontImages.push(new WordComponent("1", "red", "50px Arial", 0, -50));

  washingMachine.push(new ImageComponent(400, 250, "laundromatWallFront", 200, -100));
  frontImages.push(new WordComponent("2", "red", "50px Arial", 400, -50));
  
  washingMachine.push(new ImageComponent(400, 250, "laundromatWallFront", 600, -100));
  frontImages.push(new WordComponent("3", "red", "50px Arial", 800, -50));
  
  washingMachine.push(new ImageComponent(400, 250, "laundromatWallFront", 1000, -100));
  frontImages.push(new WordComponent("4", "red", "50px Arial", 1200, -50));

  walls.push(new Component(1600,1, "rgba(90,150,20,1)", -200, -100));
  walls.push(new Component(1600,1, "rgba(90,150,20,1)", -200, 900));
  walls.push(new Component(1,1000, "rgba(90,150,20,1)", -200, -100));
  walls.push(new Component(1,1000, "rgba(90,150,20,1)", 1400, -100));
}