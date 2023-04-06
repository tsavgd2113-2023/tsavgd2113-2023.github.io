////////////////////
/*Library Commands*/
////////////////////


window.addEventListener("blur", function() {
  if (gameStarted && !paused && !debug) {
    togglePause();
  }
});

window.addEventListener("load", function() {
  document.getElementById("loadingDisplay").style.display = "none";
  document.getElementById("startBtn").style.display = "inline-block";
});

document.getElementById("startBtn").addEventListener("click", function() {
  document.getElementById("startMenu").style.display = "none";
  document.getElementById("preloadMenu").style.display = "block";

  var txt = `Welcome to Springfield Heights mall! You have been entered in a puzzle contest to compete for a grand prize of $100,000.

In order to win the prize, you will compete in three minigames, each increasing in difficulty. Each minigame will test a different area of your physical and mental strength.

The first minigame is "the maze". In this minigame, you will be trapped in a toy store, and you will have 100 seconds to find the key and return to the door in order to escape to the next minigame. Good luck! And remember to bring a flashlight...`;
  var i = 0;

  typeWriter();
  
  function typeWriter() {
    if (i < txt.length) {
      document.getElementById("typewriter").innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, 30);
    }
  }

  setTimeout(function() {
    document.getElementById("continueBtn").style.display = "inline-block";
  }, 21000);
});

document.getElementById("continueBtn").addEventListener("click", function() {
  document.getElementById("preloadMenu").style.display = "none";
  gameSpace.style.display = "inline-block";
  startGame();
});

document.getElementById("restartBtn").addEventListener("click", function() {
  paused = false;
  document.getElementById("restartMenu").style.display = "none";
  switchLevel(LevelManager.currentLevel);
});

document.getElementById("nextBtn").addEventListener("click", function() {
  paused = false;
  document.getElementById("successMenu").style.display = "none";
  switchLevel(LevelManager.currentLevel + 1);
});

// DEBUG LEVEL BUTTONS
document.getElementById("l1Btn").addEventListener("click", function(e) {
  switchLevel(1);
  e.target.blur();
});

document.getElementById("l2Btn").addEventListener("click", function(e) {
  switchLevel(2);
  e.target.blur();
});

document.getElementById("l3Btn").addEventListener("click", function(e) {
  switchLevel(3);
  e.target.blur();
});


window.addEventListener("keydown", function(e) {
  gameSpace.keys = (gameSpace.keys || []);
  gameSpace.keys[e.code] = true;
});

window.addEventListener("keyup", function(e) {
  gameSpace.keys[e.code] = false;
  if (e.code == "Escape" && gameStarted) {
    togglePause();
  }

  if (e.code == "KeyQ" && !gameStarted) {
    quickStart();
  }

  if (new RegExp("[1-9]", "g").test(e.key)) {
    const index = parseInt(e.key) - 1;
    if (index <= Object.keys(inventory).length - 1) {
      selectItem(index);
    }
  }

  if (e.code == "Enter") {
    for (var item of Object.keys(inventory)) {
      if (inventory[item].selected && inventory[item].behavior == "toggle") {
        inventory[item].active = !inventory[item].active;
      }
    }
  }
});

function quickStart() {
  document.getElementById("startMenu").style.display = "none";
  document.getElementById("preloadMenu").style.display = "none";
  gameSpace.style.display = "inline-block";
  startGame();
}

function startGame() {
  console.log("In startGame");
  gameStarted = true;
  setup();
  LevelManager.levels.level1();

  if (debug) {
    document.getElementById("devMenu").style.display = "block";
  }
}

function spawnShirt() {
  shirtNumber = Math.floor(getRandomNumber(1, 5));
  level3Shirt.push(new ImageComponent(85, 100, "shirt" + shirtNumber, 594, 628));
}

function flashlight() { //Start Flashlight
  let size = 50; //for Flashlight *Dont Delete*
  //x = 990 y = 560 for centered
  //arc(x, y, radius, startAngle, endAngle, counterclockwise)
  //inventory["flashlight"].active = (true / false) toggles flashlight
  if (inventory["flashlight"] && inventory["flashlight"].active) {
    size = 500;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width, 0, Math.PI * 2, true);
    ctx.arc(canvas.width / 2, canvas.height / 2, 600, 0, Math.PI * 2, false);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 700, 0, Math.PI * 2, true);
    // ctx.arc(canvas.width / 2, canvas.height / 2, 0, 0, Math.PI * 2, false);
    var grd = ctx.createRadialGradient((canvas.width / 2), (canvas.height / 2), 600, (canvas.width / 2), (canvas.height / 2), 300);
    grd.addColorStop(0, "rgba(0,0,0,1)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fill();
  }
  else if (inventory["flashlight"] && !debug) {
    GUIRenderer.drawRect(canvas.width, canvas.height, "rgba(0,0,0,1)", 0, 0);
  }

} //end Flashlight

function light() {
  if (debug) {
    delete inventory["flashlight"]
  }
}

function togglePause() {
  console.log("pause toggled");
  if (!paused) {
    paused = true;
    showPauseMenu();
    GameAudio.pauseAll();
  } else {
    paused = false;
    hidePauseMenu();
    GameAudio.resumeAll();
  }
}

function showPauseMenu() {
  document.getElementById("pause-menu").style.display = "block";
}

function hidePauseMenu() {
  document.getElementById("pause-menu").style.display = "none";
}

/**
 * Moves the player's coordinates to a given location.
 * @param {number} x - X-coordinate
 * @param {number} y - Y-coordinate
 */
function movePlayer(x, y) {
  player.x = x;
  player.y = y;
  antiPlayer.x = -x + canvas.width - (player.width / 2);
  antiPlayer.y = -y + canvas.height - (player.height / 2);
}

/** Handles player movement & collision. Should be run every frame. */
function playerWallCollision() {
  playerIsMoving = false;
  var skateMechanics = LevelManager.currentLevel == 2;
  var checkBottom = [];
  var checkTop = [];
  var checkLeft = [];
  var checkRight = [];

  var allWalls = walls.concat(enemy2, washingMachine);
  direction = "none";

  for (var i = 0; i < allWalls.length; i++) {
    checkRight.push(rightCol(player, allWalls[i]));
    checkLeft.push(leftCol(player, allWalls[i]));
    checkBottom.push(topCol(player, allWalls[i]));
    checkTop.push(bottomCol(player, allWalls[i]));
  }

  if (!skateMechanics) {
    player.speedX = 0;
    player.speedY = 0;
    antiPlayer.speedX = 0;
    antiPlayer.speedY = 0;
  }

  if (skateMechanics) {
    if (!playerIsMoving) {
      if (checkLeft.some(collisionTest) == true || checkRight.some(collisionTest) == true) {
        player.speedX = 0;
        antiPlayer.speedX = 0;
      }

      if (checkTop.some(collisionTest) == true || checkBottom.some(collisionTest) == true) {
        player.speedY = 0;
        antiPlayer.speedY = 0;
      }

      if (Math.abs(player.speedX) < (25 * dt)) {
        player.speedX = 0;
        antiPlayer.speedX = 0;
      }

      if (Math.abs(player.speedY) < (25 * dt)) {
        player.speedY = 0;
        antiPlayer.speedY = 0;
      }

      if (player.speedX > 0) {
        player.speedX -= 5 * dt;
        antiPlayer.speedX += 5 * dt;
      } else if (player.speedX < 0) {
        player.speedX += 5 * dt;
        antiPlayer.speedX -= 5 * dt;
      }

      if (player.speedY > 0) {
        player.speedY -= 5 * dt;
        antiPlayer.speedY += 5 * dt;
      } else if (player.speedY < 0) {
        player.speedY += 5 * dt;
        antiPlayer.speedY -= 5 * dt;
      }
    }
  }

  if (gameSpace.keys && (gameSpace.keys["ArrowLeft"] || gameSpace.keys["KeyA"])) {
    if (checkRight.some(collisionTest) == false) {
      direction = "left";

      if (skateMechanics) {
        if (player.speedX > (-400 * dt)) {
          player.speedX -= 25 * dt;
          antiPlayer.speedX += 25 * dt;
        }
        pLeftAnimSkate.start();
      } else {
        player.speedX = -400 * dt;
        antiPlayer.speedX = 400 * dt;
        pLeftAnim.start();
      }

      playerIsMoving = true;
    } else {
      player.speedX = 0;
      antiPlayer.speedX = 0;
    }
  }

  if (gameSpace.keys && (gameSpace.keys["ArrowRight"] || gameSpace.keys["KeyD"])) {
    if (checkLeft.some(collisionTest) == false) {
      direction = "right";

      if (skateMechanics) {
        if (player.speedX < (400 * dt)) {
          player.speedX += 25 * dt;
          antiPlayer.speedX -= 25 * dt;
        }
        pRightAnimSkate.start();
      } else {
        player.speedX = 400 * dt;
        antiPlayer.speedX = -400 * dt;
        pRightAnim.start();
      }

      playerIsMoving = true;
    } else {
      player.speedX = 0;
      antiPlayer.speedX = 0;
    }
  }

  if (gameSpace.keys && (gameSpace.keys["ArrowUp"] || gameSpace.keys["KeyW"])) {
    if (checkBottom.some(collisionTest) == false) {
      direction = "up";

      if (skateMechanics) {
        if (player.speedY > (-400 * dt)) {
          player.speedY -= 25 * dt;
          antiPlayer.speedY += 25 * dt;
        }
        //pUpAnimSkate.start();
      } else {
        player.speedY = -400 * dt;
        antiPlayer.speedY = 400 * dt;
        //pUpAnim.start();
      }

      playerIsMoving = true;
    } else {
      player.speedY = 0;
      antiPlayer.speedY = 0;
    }
  }

  if (gameSpace.keys && (gameSpace.keys["ArrowDown"] || gameSpace.keys["KeyS"])) {
    if (checkTop.some(collisionTest) == false) {
      direction = "down";

      if (skateMechanics) {
        if (player.speedY < (400 * dt)) {
          player.speedY += 25 * dt;
          antiPlayer.speedY -= 25 * dt;
        }
        pDownAnimSkate.start();
      } else {
        player.speedY = 400 * dt;
        antiPlayer.speedY = -400 * dt;
        pDownAnim.start();
      }

      playerIsMoving = true;
    } else {
      player.speedY = 0;
      antiPlayer.speedY = 0;
    }
  }
}

function collisionTest(collision) {
  collision == true;
  return collision;
}

/** General collision checker (moving until stopped). */
function collisionCheck(obj1, obj2) {
  if (obj1.x + obj1.width >= obj2.x && obj1.x + obj1.width <= (obj2.x + obj2.width) && ((obj2.y <= (obj1.y + (obj1.height))) && (obj2.y + obj2.height >= (obj1.y)))) {
    return true;
  } else if (obj1.x <= obj2.x + obj2.width && obj1.x >= obj2.x && ((obj2.y <= (obj1.y + (obj1.height))) && (obj2.y + obj2.height >= (obj1.y)))) {
    return true;
  } else if (obj1.y + obj1.height <= (obj2.y + obj2.height) && obj1.y + obj1.height >= obj2.y && ((obj2.x <= (obj1.x + (obj1.width))) && (obj2.x + obj2.width >= (obj1.x)))) {
    return true;
  } else if (obj1.y <= obj2.y + obj2.height && obj1.y >= obj2.y && ((obj2.x <= (obj1.x + (obj1.width))) && (obj2.x + obj2.width >= (obj1.x)))) {
    return true;
  } else {
    return false;
  }
}

//player collision checker (stopped until moving) 
function leftCol(obj1, obj2) {
  return (obj1.x + obj1.width >= obj2.x - 10 && obj1.x + obj1.width <= (obj2.x + obj2.width) && ((obj2.y <= (obj1.y + (obj1.height))) && (obj2.y + obj2.height >= (obj1.y))));
}
function rightCol(obj1, obj2) {
  return (obj1.x <= obj2.x + obj2.width + 10 && obj1.x >= obj2.x && ((obj2.y <= (obj1.y + (obj1.height))) && (obj2.y + obj2.height >= (obj1.y))));
}
function bottomCol(obj1, obj2) {
  return (obj1.y + obj1.height <= obj2.y + obj2.height && obj1.y + obj1.height >= obj2.y - 10 && ((obj2.x <= (obj1.x + (obj1.width))) && (obj2.x + obj2.width >= (obj1.x))));
}
function topCol(obj1, obj2) {
  return (obj1.y <= obj2.y + obj2.height + 10 && obj1.y >= obj2.y && ((obj2.x <= (obj1.x + (obj1.width))) && (obj2.x + obj2.width >= (obj1.x))));
}

/**
 * Returns a positive number of the distance between center of two objects.
 * @param {BaseComponent} obj1 - Object 1 Component
 * @param {BaseComponent} obj2 - Object 2 Component
 */
function distance(obj1, obj2) {
  var obj1x = obj1.x + obj1.width / 2;
  var obj1y = obj1.y + obj1.height / 2;
  var obj2x = obj2.x + obj2.width / 2;
  var obj2y = obj2.y + obj2.height / 2;
  var distance = Math.sqrt(Math.pow((obj1x - obj2x), 2) + Math.pow((obj1y - obj2y), 2));
  return distance;
}

//small -> large ** someone check this please
function fullCompCollision(obj1, obj2) {
  return collisionCheck(obj1, obj2) || (obj1.x >= obj2.x && obj1.x + obj1.width <= obj2.y + obj2.width && obj1.y >= obj2.y && obj1.y + obj1.height <= obj2.y + obj2.height);
}

function checkVision(x1, y1, x2, y2, x3, y3, x4, y4) {
  var a_dx = x2 - x1;
  var a_dy = y2 - y1;
  var b_dx = x4 - x3;
  var b_dy = y4 - y3;
  var s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
  var t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
  return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
}

/** 
 * Handles looping through an object's array to update and alter their positions.
 * @param {BaseComponent[]} obj - Array of objects to print
 */
function print(obj) {
  for (var i = 0; i < obj.length; i++) {
    obj[i].update();
    obj[i].newPos();
  }
}

// from last year but we'll keep this for now
function inventoryGUI() {
  var spacing = 5;
  var boxWidth = 80;
  var boxHeight = 80;
  var boxX = (1920 / 2 - ((Object.keys(inventory).length * boxWidth) / 2) - boxWidth) - spacing;
  var boxY = canvas.height - 100;
  var totalWidth = 0;

  // center marker
  // GUIRenderer.drawRect(5, 80, "red", (canvas.width/2)-(5/2), 1000)

  Object.keys(inventory).forEach((item, i) => {

    boxX += boxWidth + spacing;

    GUIRenderer.drawRect(boxWidth, boxHeight, "rgba(0,0,0,0.5)", boxX, boxY);
    GUIRenderer.drawImage(boxWidth - 20, boxHeight - 20, inventory[item].imageID, boxX + 10, boxY + 10);
    GUIRenderer.drawText(i + 1, "rgb(255,255,255)", "20px Arial", boxX + 60, boxY + 25);
    GUIRenderer.drawText("x" + inventory[item].quantity, "rgb(255,255,255)", "20px Arial", boxX + 55, boxY + 70);

    if (inventory[item].selected) {
      GUIRenderer.strokeRect(boxWidth, boxHeight, "orange", boxX, boxY, 7);
    } else {
      GUIRenderer.strokeRect(boxWidth, boxHeight, "white", boxX, boxY, 5);
    }
  });
}

function addItem(id) {
  if (!inventory[id]) {
    inventory[id] = { ...gameItems[id], selected: false, quantity: 1, active: false, timer: 0 };
  }
  if (debug) {
    console.table(inventory);
  }
}

function removeItem(id) {
  if (inventory[id]) {
    delete inventory[id];
  }
}

function selectItem(index) {
  Object.keys(inventory).forEach((item, i) => {
    if (index == i) {
      inventory[item].selected = true;
    } else {
      inventory[item].selected = false;
    }
  })
}

function checkImage(imageSrc, good, bad) {
  var img = new Image();
  img.onload = good;
  img.onerror = bad;
  img.src = imageSrc;
}

/** Returns a random number. */
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// LEVELING SYSTEM

function failLevel() {
  document.getElementById("restartMenu").style.display = "block";
  paused = true;
}

function completeLevel() {
  document.getElementById("successMenu").style.display = "block";
  paused = true;
}

/** 
 * Switches level to level specified.
 * @param {number} level - Level to switch to
 */
function switchLevel(level) {
  const levelKey = Object.keys(LevelManager.levels)[level - 1];

  if (!levelKey) {
    return alert("Invalid level!");
  }

  player.speedX = 0;
  player.speedY = 0;
  antiPlayer.speedX = 0;
  antiPlayer.speedY = 0;

  GameAudio.stopAll();
  
  // reset
  enemy1 = [];
  enemy1SpeedX = [];
  enemy1SpeedY = [];
  enemy2 = [];
  enemy2Projectile = [];
  enemy2ProjectileAngles = [];
  enemy2ProjectileTimer = [];

  pond = [];

  walls = [];
  images = [];
  frontImages = [];
  inventory = {};
  level1Key = [];
  level1Door = [];

  level1Timer = 60;
  level2Lives = 3;

  washingMachine = [];
  level3Shirt = [];
  level3Timer = 45;
  level3Points = 0;
  shirtNumber = 0;
  
  collectFishProgress = 0;

  LevelManager.levels[levelKey]();
  LevelManager.currentLevel = level;
}
