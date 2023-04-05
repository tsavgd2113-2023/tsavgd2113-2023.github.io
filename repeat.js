///////////////////
/*REPEAT COMMANDS*/
///////////////////

//Update Every Frame
function frameRate() {
  var now = performance.now();
  dt = (now - lastUpdate) / 1000;
  lastUpdate = now;
  requestAnimationFrame(frameRate);

  if (!paused) {
    ctx.clearRect(0, 0, 1920, 1080);

    player.setImage("pDown001");

    ////////////////////
    /*VISUAL HIERARCHY*/
    ////////////////////

    /* Whatever is printed
    first is on the bottom */
    print(images);
    print(level1Key);
    print(level1Door);
    print(pond);
    print(washingMachine);
    print(level3Shirt);


    //Walls (player stops when touched)
    print(walls);
    print(frontImages);
    playerWallCollision();

    ////////////////////////
    /*FUNCTIONAL HEIRARCHY*/
    ////////////////////////    

    // game items
    flashlight();

    // LEVEL 1 ENEMIES (DISABLED)
    // for (var i = 0; i < enemy1.length; i++) {
    //   var currentAngle = Math.atan(((enemy1[i].y + (enemy1[i].height / 2)) - (player.y + (player.height / 2))) / ((enemy1[i].x + (enemy1[i].width / 2)) - (player.x + (player.width / 2))));

    //   if (enemy1[i].x + (enemy1[i].width / 2) < player.x + (player.width / 2)) {
    //     enemy1SpeedX[i] = 3 * Math.cos(currentAngle) * dt;
    //     enemy1SpeedY[i] = 3 * Math.sin(currentAngle) * dt;
    //     enemy1[i].speedX = enemy1SpeedX[i];
    //     enemy1[i].speedY = enemy1SpeedY[i];
    //   } else {
    //     enemy1SpeedX[i] = -3 * Math.cos(currentAngle) * dt;
    //     enemy1SpeedY[i] = -3 * Math.sin(currentAngle) * dt;
    //     enemy1[i].speedX = enemy1SpeedX[i];
    //     enemy1[i].speedY = enemy1SpeedY[i];
    //   }

    //   enemy1[i].update();
    //   enemy1[i].newPos();
    // }

    // LEVEL 2 ENEMIES
    for (var i = 0; i < enemy2.length; i++) {
      if (distance(player, enemy2[i]) < 300 && inventory["fish"]) {
        GUIRenderer.drawRect(250, 30, "rgba(0,0,0,0.5)", 920, 430);
        GUIRenderer.drawText("Press F to feed the penguin", "rgb(255,255,255)", "20px Arial", 920, 450);
        if (gameSpace.keys["KeyF"]) {
          removeItem("fish");
          enemy2.splice(i, 1);

          if (enemy2.length == 0) {
            completeLevel();
          }
          
          continue;
        }
      } else {
        if (enemy2ProjectileTimer[i] <= 0) {
          var newProjectile = new ImageComponent(45, 90, "pengProjectile", enemy2[i].x + (enemy2[i].width - 15), enemy2[i].y + 65);
          var angle = Math.atan2((player.y + (player.height / 2)) - (newProjectile.y + (newProjectile.height / 2)), (player.x + (player.width / 2)) - (newProjectile.x + (newProjectile.width / 2)));
          newProjectile.rotate(angle + (Math.PI / 2));
          enemy2Projectile.push(newProjectile);
          enemy2ProjectileAngles.push(angle);
          enemy2ProjectileTimer[i] = getRandomNumber(2, 5);
        } else {
          enemy2ProjectileTimer[i] -= dt;
        }
      }

      enemy2[i].update();
      enemy2[i].newPos();
    }

    // LEVEL 2 ENEMY PROJECTILES
    enemy2ProjectileLoop:
    for (var i = 0; i < enemy2Projectile.length; i++) {
      for (var j = 0; j < walls.length; j++) { //projectile collision
        if (collisionCheck(enemy2Projectile[i], walls[j])) {
          enemy2Projectile.splice(i, 1);
          enemy2ProjectileAngles.splice(i, 1);
          break enemy2ProjectileLoop;
        }
      }

      if (collisionCheck(enemy2Projectile[i], player)) {
        const angle = Math.atan2(player.x - enemy2Projectile[i].x, player.y - enemy2Projectile[i].y);
        player.speedX = 400 * dt * Math.cos(enemy2ProjectileAngles[i]);
        antiPlayer.speedX = -400 * dt * Math.cos(enemy2ProjectileAngles[i]);
        player.speedY = 400 * dt * Math.sin(enemy2ProjectileAngles[i]);
        antiPlayer.speedY = -400 * dt * Math.sin(enemy2ProjectileAngles[i]);

        level2Lives--;

        if (level2Lives == 0) {
          failLevel();
        }
        
        enemy2Projectile.splice(i, 1);
        enemy2ProjectileAngles.splice(i, 1);
        continue;
      }

      enemy2Projectile[i].speedX = 200 * Math.cos(enemy2ProjectileAngles[i]) * dt;
      enemy2Projectile[i].speedY = 200 * Math.sin(enemy2ProjectileAngles[i]) * dt;

      enemy2Projectile[i].update();
      enemy2Projectile[i].newPos();
    }

    // LEVEL 1 KEY
    for (var i = 0; i < level1Key.length; i++) {
      if (distance(player, level1Key[i]) < 100) {
        GUIRenderer.drawRect(250, 30, "rgba(0,0,0,0.5)", 920, 430);
        GUIRenderer.drawText("Press F to collect the key", "rgb(255,255,255)", "20px Arial", 920, 450);

        if (gameSpace.keys["KeyF"]) {
          level1Key.splice(i, 1);
          addItem("key");
          continue;
        }
      }
    }

    // LEVEL 1 DOOR
    for (var i = 0; i < level1Door.length; i++) {
      if (distance(player, level1Door[i]) < 300) {
        if (gameSpace.keys["KeyF"]) {
          if (inventory["key"]) {
            completeLevel();
          } else {
            GUIRenderer.drawRect(250, 30, "rgba(0,0,0,0.5)", 920, 430);
            GUIRenderer.drawText("Key not collected!", "rgb(255,0,0)", "20px Arial", 920, 450);
          }
        } else {
          GUIRenderer.drawRect(250, 30, "rgba(0,0,0,0.5)", 920, 430);
          GUIRenderer.drawText("Press F to unlock the door", "rgb(255,255,255)", "20px Arial", 920, 450);
        }
      }
    }

    // LEVEL 3 WASHING MACHINE
    for (var i = 0; i < washingMachine.length; i++) {
      var machineIndex = i+1;

      if (distance(player, washingMachine[i]) < 200) {
        if (inventory["shirt"]) {
          GUIRenderer.drawRect(400, 30, "rgba(0,0,0,0.5)", 920, 430);
          GUIRenderer.drawText("Press F to place shirt in machine " + machineIndex, "rgb(255,255,255)", "20px Arial", 920, 450);

          if (gameSpace.keys["KeyF"]) {
            if (machineIndex == shirtNumber) {
              level3Points += 1;
            } else {
              level3Points -= 1;
            }
            
            removeItem("shirt");
            spawnShirt();
          }
        }
      }
    }

    // LEVEL 3 SHIRT
    for (var i = 0; i < level3Shirt.length; i++) {
      if (distance(player, level3Shirt[i]) < 200) {
        GUIRenderer.drawRect(250, 30, "rgba(0,0,0,0.5)", 920, 430);
        GUIRenderer.drawText("Press F to collect shirt", "rgb(255,255,255)", "20px Arial", 920, 450);

        if (gameSpace.keys["KeyF"]) {
          addItem("shirt");
          level3Shirt.splice(i, 1);
          continue;
        }
      }
    }

    // LEVEL 1 SPECIFIC LOGIC
    if (LevelManager.currentLevel == 1) {
      level1Timer -= dt;
      GUIRenderer.drawRect(250, 70, "rgba(0,0,0,0.5)", 0, 0);
      GUIRenderer.drawText(`Time left: ${Math.round(level1Timer)}`, "white", "40px Arial", 10, 50);

      if (level1Timer <= 0) {
        //failed level 1
        failLevel();
      }

      if (inventory["flashlight"] && !inventory["flashlight"].active) {
        GUIRenderer.drawText("Turn on your flashlight! (enter)", "rgb(255,0,0)", "40px 'Press Start 2P'", 200, 900);
      } else {
        if (inventory["key"]) {
          GUIRenderer.drawText("Return to the door!", "rgb(255,0,0)", "40px 'Press Start 2P'", 200, 900);
        } else {
          GUIRenderer.drawText("Find the key!", "rgb(255,0,0)", "40px 'Press Start 2P'", 200, 900);
        }
      }

      // if (distance(player, level1Key[0]) < 100) {
      //   GUIRenderer.drawRect(180, 30, "rgba(0,0,0,0.5)", 920, 430);
      //   GUIRenderer.drawText("Press F to collect key", "rgb(255,255,255)", "20px Arial", 920, 450);

      //   if (gameSpace.keys["KeyF"]) {
      //     console.log("h");
      //   }
      // }
    }

    // LEVEL 2 SPECIFIC LOGIC
    if (LevelManager.currentLevel == 2) {
      GUIRenderer.drawRect(250, 70, "rgba(0,0,0,0.5)", 0, 0);
      GUIRenderer.drawText(`Lives: ${level2Lives}`, "white", "40px Arial", 10, 50);
      
      if (distance(player, pond[0]) < 100) {
        if (!inventory["fish"]) {
          GUIRenderer.drawRect(180, 30, "rgba(0,0,0,0.5)", 920, 430);
          GUIRenderer.drawText("Hold F to collect fish", "rgb(255,255,255)", "20px Arial", 920, 450);

          GUIRenderer.drawRect(200, 20, "rgba(0,0,0,0.5)", 920, 400);
          GUIRenderer.drawRect(collectFishProgress, 20, "rgba(0,255,0)", 920, 400);

          if (gameSpace.keys["KeyF"]) {
            collectFishProgress += 100 * dt;
          }

          if (collectFishProgress >= 200) {
            collectFishProgress = 0;
            fishImageId = "fish" + Math.floor(getRandomNumber(1, 4));
            addItem("fish");
          }
        }
      }

      if (inventory["fish"]) {
        GUIRenderer.drawText("Go feed the penguin!", "rgb(255,0,0)", "40px 'Press Start 2P'", 200, 900);
      }
    }

    // LEVEL 3 SPECIFIC LOGIC
    if (LevelManager.currentLevel == 3) {
      level3Timer -= dt;
      GUIRenderer.drawRect(250, 70, "rgba(0,0,0,0.5)", 0, 0);
      GUIRenderer.drawText(`Time left: ${Math.round(level3Timer)}`, "white", "40px Arial", 10, 50);

      GUIRenderer.drawRect(250, 70, "rgba(0,0,0,0.5)", 0, 70);
      GUIRenderer.drawText(`Points: ${Math.round(level3Points)}`, "white", "40px Arial", 10, 120);

      if (level3Timer <= 0 && level3Points >= 10) {
        completeLevel();
      } else if (level3Timer <= 0) {
        failLevel();
      }
    }

    // printing out the player
    player.update();
    player.newPos();

    antiPlayer.update();
    antiPlayer.newPos();

    // GUIRenderer.drawRect(canvas.width, canvas.height, "black", 0, 0);
    // GUIRenderer.drawCircle(600, "rgba(255, 255, 255, 1)", (canvas.width / 2) - 300, (canvas.height / 2) - 300);

    inventoryGUI();

    

    if (debug == true) {
      GUIRenderer.drawRect(350, 75, "rgba(0,0,0,0.5)", 0, 150);
      GUIRenderer.drawText(`X: ${Math.round(player.x)} Y: ${Math.round(player.y)}`, "white", "45px Arial", 25, 200);
    }

    GUIRenderer.drawText(`Level ${LevelManager.currentLevel}`, "white", "45px Arial", canvas.width - 200, 40);
  }
}