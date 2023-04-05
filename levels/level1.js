LevelManager.levels.level1 = function() {
  // Player position when loaded into level.
  // Antiplayer should always be OPPOSITE of player.
  movePlayer(player.originalX, player.originalY);

  level1Audio.play();

  levelMsg.innerText = `Good job! I see you've already passed our first test. The next minigame is a bit more challenging. You will be placed on an ice skating rink, so your controls will be much harder to maneuver. Your task is to collect fish at the hole in the middle of the rink and feed them to the penguins. However, be warned! These penguins are angry and are more powerful than they seem... The minigame will end once you feed all four penguins. Good luck!`
  
  addItem("flashlight");
  selectItem(0);

  var offsetX = -1300;
  var offsetY = -1021;
  for (var i = 0; i < 34; i++) {
    for (var j = 0; j < 22; j++) {
      images.push(new ImageComponent(150, 150, "floorTileLevel1", i * 150 + offsetX, j * 150 + offsetY));
    }
  }

  level1Key.push(new ImageComponent(75, 50, "key", 2320, -650));

  //60x60 pixel player! Min size 90
  //? near player and the 3 pillars of creation
  walls.push(new ImageComponent(300, 300, "wallTop6", -400, 760));
  walls.push(new ImageComponent(300, 300, "wallTop6", -400, 460));
  walls.push(new ImageComponent(300, 300, "wallTop1", -100, 460));
  walls.push(new ImageComponent(300, 300, "wallTop2", 200, 460));
  walls.push(new ImageComponent(300, 300, "wallTop5", 200, 160));
  walls.push(new ImageComponent(300, 300, "toyShelf1", -100, 460));

  
  walls.push(new ImageComponent(300, 300, "wallTop5", -400, 160));

  walls.push(new ImageComponent(300, 300, "wallTop6", -400, 1060));
  walls.push(new ImageComponent(300, 300, "wallTop2", -400, 1360));

  walls.push(new ImageComponent(300, 300, "toyShelfTop", -400, 180));
  walls.push(new ImageComponent(300, 300, "toyShelfTop", -400, 1060));

  walls.push(new ImageComponent(300,300, "wallTop1", -100, 1960));
  walls.push(new ImageComponent(300,300, "wallTop6", -100, 1660));
  walls.push(new ImageComponent(300,300, "wallTop5", -100, 1360));
  walls.push(new ImageComponent(300, 300, "toyShelfTop", -100, 1660));
  
  walls.push(new ImageComponent(300,300, "wallTop5", 500, 1360));
  walls.push(new ImageComponent(300,600, "wallTop6", 500, 1660));
  walls.push(new ImageComponent(300, 300, "toyShelfTop", 500, 1510));
  walls.push(new ImageComponent(300,300, "wallTop5", 1500, 1410));
  walls.push(new ImageComponent(300,550, "wallTop6", 1500, 1710));
  walls.push(new ImageComponent(300, 300, "toyShelfTop", 1500, 1610));
  walls.push(new ImageComponent(300,300, "wallTop5", 2200, 1410));
  walls.push(new ImageComponent(300,550, "wallTop6", 2200, 1710));
  walls.push(new ImageComponent(300, 300, "toyShelfTop", 2200, 1510));
  walls.push(new ImageComponent(300, 300, "toyShelfTop", 2200, 1910));
  //The sideways t right of the spawn
  walls.push(new ImageComponent(300,300, "wallTop1", 1600, 970));
  walls.push(new ImageComponent(300,300, "wallTop1", 1900, 970));
  walls.push(new ImageComponent(300, 300, "toyShelf1", 1900, 970));
  walls.push(new ImageComponent(300,300, "wallTop2", 2200, 970));
  walls.push(new ImageComponent(300,300, "wallTop1", 2500, 970));
  walls.push(new ImageComponent(300,300, "wallTop2", 2800, 1570));
  walls.push(new ImageComponent(300, 300, "toyShelf1", 2800, 1570));
  walls.push(new ImageComponent(300,250, "wallTop6", 1600, 720));
  walls.push(new ImageComponent(300,300, "wallTop5", 1600, 420));
  walls.push(new ImageComponent(300,300, "wallTop5", 1900, 670));
  walls.push(new ImageComponent(300,300, "wallTop5", 2200, 670));
  walls.push(new ImageComponent(300,300, "wallTop5", 2500, 670));
  walls.push(new ImageComponent(300,1600, "wallTop6", 2800, -30));
  walls.push(new ImageComponent(300, 300, "toyShelfTop", 2800, 300));
  walls.push(new ImageComponent(300,300, "wallTop5", 2800, -330)); 
  //Top sideways 'P' containing the key
  //walls.push(new Component(1200,600, "rgba(90,150,20,1)", 1600, -330)); 
  walls.push(new ImageComponent(300,300, "wallTop1", 1600, -30));
  walls.push(new ImageComponent(300,300, "wallTop1", 1900, -30)); 
  walls.push(new ImageComponent(300,300, "wallTop1", 2200, -30));
  walls.push(new ImageComponent(300,300, "wallTop1", 2500, -30));
  walls.push(new ImageComponent(300,300, "toyShelf1", 1900, -30));
  walls.push(new ImageComponent(300,300, "toyShelf1", 2500, -30));
  walls.push(new ImageComponent(300,700, "wallTop6", 1600, -730));
  walls.push(new ImageComponent(300,700, "wallTop6", 1900, -730)); 
  walls.push(new ImageComponent(300,300, "wallTop5", 2200, -330));
  walls.push(new ImageComponent(300,300, "wallTop5", 2500, -330));

  walls.push(new ImageComponent(300,290, "wallTop1", 1000, -620)); 
  walls.push(new ImageComponent(300, 300, "toyShelf1", 1000, -620));
  walls.push(new ImageComponent(300,100, "wallTop6", 1000, -720)); 
  walls.push(new ImageComponent(300,100, "wallTop6", 1300, -720)); 
  
  walls.push(new ImageComponent(300,250, "wallTop1", 2500, -720)); 
  walls.push(new ImageComponent(300,250, "wallTop1", 2800, -720)); 
  walls.push(new ImageComponent(300,250, "wallTop1", 3100, -720)); 


  walls.push(new ImageComponent(300,302, "wallTop5", 1000, -1020)); 
  walls.push(new ImageComponent(300,302, "wallTop5", 1300, -1020)); 
  walls.push(new ImageComponent(300,302, "wallTop5", 1600, -1020));
  walls.push(new ImageComponent(300,302, "wallTop5", 1900, -1020)); 
  walls.push(new ImageComponent(300,302, "wallTop3", 2200, -1020)); 
  walls.push(new ImageComponent(300,302, "wallTop5", 2500, -1020)); 
  walls.push(new ImageComponent(300,302, "wallTop5", 2800, -1020)); 
  walls.push(new ImageComponent(300,302, "wallTop5", 3100, -1020)); 
  walls.push(new ImageComponent(300,302, "wallTop1", 3400, -1020)); 
  walls.push(new ImageComponent(300, 300, "toyShelf1", 3400, -1020));
  //one pillar and top left side 
  
  walls.push(new ImageComponent(300,300, "wallTop2", 350, -420));
  walls.push(new ImageComponent(300,300, "wallTop6", 350, -720));
  walls.push(new ImageComponent(300,300, "wallTop5", 350, -1020));
  walls.push(new ImageComponent(300, 300, "toyShelfTop", 350, -970));
  walls.push(new ImageComponent(300, 300, "toyShelfTop", 350, -620));

  // Door
  // walls.push(new ImageComponent(300,290, "wallTop2", 1300, -620)); 
  level1Door.push(new ImageComponent(300, 300, "door", 1300, -620));
  
  walls.push(new ImageComponent(300,300, "wallTop2", -700, -420));
  walls.push(new ImageComponent(300,300, "wallTop1", -400, -420));
  walls.push(new ImageComponent(300,300, "wallTop5", -700, -720));
  walls.push(new ImageComponent(300,300, "wallTop5", -400, -720));
  walls.push(new ImageComponent(300, 300, "toyShelf1", -400, -420));

  walls.push(new ImageComponent(300,300, "wallTop2", -1000, 170));
  walls.push(new ImageComponent(300,900, "wallTop6", -1000, -720));
  walls.push(new ImageComponent(300,300, "wallTop5", -1000, -1020));
  walls.push(new ImageComponent(300, 300, "toyShelfTop", -1000, -520));
  walls.push(new ImageComponent(300, 300, "toyShelf1", -1000, 170));

  
//boundaries
  walls.push(new Component(5000,10, "rgba(90,150,20,0)", -1300, -1021)); //ceiling
  walls.push(new Component(5000,10, "rgba(90,150,20,0)", -1300, 2261)); //floor
  walls.push(new Component(10,3280, "rgba(90,150,20,0)", -1300, -1021)); //left bound
  walls.push(new Component(10,3280, "rgba(90,150,20,0)", 3700, -1021)); //right bound
}