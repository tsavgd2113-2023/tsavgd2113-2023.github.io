var dt;

var gameStarted = false;
var direction;
var player;
var peng;
var antiPlayer;
var playerIsMoving = false;
var playerAnimation = [];
var walls = [];
var images = [];
var frontImages = [];

var levelMsg = document.getElementById("levelDescription");
var nextBtn = document.getElementById("nextBtn");

// Level 1
var level1Timer = 100;
var level1Key = [];
var level1Door = [];

// Toy store enemies
var enemy1 = [];
var enemy1SpeedX = [];
var enemy1SpeedY = [];

// Level 2
var level2Lives = 3;

// Turret penguin things
var enemy2 = [];
var enemy2Projectile = [];
var enemy2ProjectileAngles = [];
var enemy2ProjectileTimer = [];

// Fish collectable (level2)
var pond = [];
var collectFishProgress = 0;

// Level 3
var washingMachine = [];
var level3Shirt = [];
var level3Timer = 45;
var level3Points = 0;
var shirtNumber = 0;

// Advanced game controlls for debugging
var debug = false;

// Player animation controllers defined in script.js!
var pUpAnim;
var pDownAnim;
var pLeftAnim;
var pRightAnim;

var pUpAnimSkate;
var pDownAnimSkate;
var pLeftAnimSkate;
var pRightAnimSkate;

const LevelManager = {
  levels: {},
  currentLevel: 1
};

let fishImageId = "fish1";

// INVENTORY
const gameItems = {
  flashlight: {
    name: "Flashlight",
    imageID: "flashlight",
    behavior: "toggle",
  },
  key: {
    name: "Key",
    imageID: "key",
  },
  fish: {
    name: "Fish",
    imageID: fishImageId
  },
  shirt: {
    name: "Shirt",
    imageID: "shirtGeneric"
  }
}

var lastUpdate;

let inventory = {};