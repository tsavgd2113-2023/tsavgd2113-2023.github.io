////////////////////////////////////////////
/*ADDING OBJECTS TO THE CANVAS TO BE DRAWN*/
////////////////////////////////////////////

var canvas = document.getElementById("gameSpace");
var ctx = canvas.getContext("2d");
var invisible = "rgba(0,0,0,0)";

var level1Audio = new GameAudio("/assets/music/Level1.mp3");
level1Audio.loop = true;

var level2Audio = new GameAudio("/assets/music/Level2.mp3");
level2Audio.loop = true;

var level3Audio = new GameAudio("/assets/music/Level3.mp3");
level3Audio.loop = true;


// Initial game setup
function setup() {
  paused = false;
  console.log("In setup");
  player = new ImageComponent(80, 120, "pDown001", (canvas.width / 2) - 30, (canvas.height / 2) - 30);
  peng = new Component(60, 60, "rgba(255,255,255,0)", (canvas.width / 2) - 30, (canvas.height / 2) - 30);
  antiPlayer = new Component(60, 60, invisible, canvas.width / 2, canvas.height / 2);

  pUpAnim = new AnimationController(player, ["pUp000", "pUp001", "pUp002"], 0.15);
  pDownAnim = new AnimationController(player, ["pDown000", "pDown001", "pDown002"], 0.15);
  pLeftAnim = new AnimationController(player, ["pLeft000", "pLeft001"], 0.15);
  pRightAnim = new AnimationController(player, ["pRight000", "pRight001"], 0.15);

  pUpAnimSkate = new AnimationController(player, ["pUp000", "pUp002"], 0.5);
  pDownAnimSkate = new AnimationController(player, ["pDown000", "pDown002"], 0.5);
  pLeftAnimSkate = new AnimationController(player, ["pLeft000", "pLeft001"], 0.5);
  pRightAnimSkate = new AnimationController(player, ["pRight000", "pRight001"], 0.5);

  lastUpdate = performance.now();
  frameRate(); /* Recursive function, will call itself every frame.
                  Similar to void Update() in Unity. */
}
