///////////////////////
/*CONSTRUCTOR CLASSES*/
///////////////////////

/** Represents an audio object. Works similarly to window.Audio. */
class GameAudio extends window.Audio {
  static instances = [];
  static pausedTracks = [];

  /** 
   * Create an audio object and add it to instances
   * @param {string} src - Link to audio source
   */
  constructor(src) {
    const audio = super(src);
    this.controls = false;
    this.constructor.instances.push(audio);
  }

  /** Pauses all audio objects */
  static pauseAll() {
    this.instances.forEach(instance => {
      if (instance.paused == false) {
        instance.pause();
        this.pausedTracks.push(instance);
      }
    })
  }

  /** Resumes all audio objects */
  static resumeAll() {
    this.pausedTracks.forEach((instance, i) => {
      instance.play();
      this.pausedTracks.splice(i, 1);
    })
  }

  /** Stops all audio objects */
  static stopAll() {
    this.instances.forEach((instance, i) => {
      instance.pause();
      instance.currentTime = 0;
      this.instances.slice(i, 1);
    })
  }
}

// The difference between this class and BaseComponent is that this will always render objects to stay in the same spot in the canvas. Methods in this class should be used only for GUI components, while component methods should be use for making interactable objects in the game.

/** Draws UI elements to the screen */
class GUIRenderer {
  /** 
   * Draws text to a point on the screen
   * @param {string} text - The text to write
   * @param {string} color - The text color
   * @param {string} font - The font and size
   * @param {number} x - X-coordinate on screen
   * @param {number} y - Y-coordinate on screen
   */
  static drawText(text, color, font, x, y) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
  }

  /** 
   * Draws a rectangle to a point on the screen
   * @param {number} width - The width of the rect
   * @param {number} height - The height of the rect
   * @param {string} color - The color of the rect
   * @param {number} x - X-coordinate on screen
   * @param {number} y - Y-coordinate on screen
   */
  static drawRect(width, height, color, x, y) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  /** 
   * Strokes (outlines) a rectangle to a point on the screen
   * @param {number} width - The width of the rect
   * @param {number} height - The height of the rect
   * @param {string} color - The color of the rect
   * @param {number} x - X-coordinate on screen
   * @param {number} y - Y-coordinate on screen
   * @param {number} lineWidth - Line width
   */
  static strokeRect(width, height, color, x, y, lineWidth) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(x, y, width, height);
  }

  /** 
   * Draws an image to a point on the screen
   * @param {number} width - The width of the image
   * @param {number} height - The height of the image
   * @param {string} imageId - The ID of the image in the DOM
   * @param {number} x - X-coordinate on screen
   * @param {number} y - Y-coordinate on screen
   */
  static drawImage(width, height, imageId, x, y) {
    const image = document.getElementById(imageId);
    ctx.drawImage(image, x, y, width, height);
  }

  /** 
   * Draws a circle to a point on the screen
   * @param {number} diameter - The diameter of the circle
   * @param {string} color - The color of the circle
   * @param {number} x - X-coordinate on screen
   * @param {number} y - Y-coordinate on screen
   */
  static drawCircle(diameter, color, x, y) {
    ctx.beginPath();
    ctx.arc(x + (diameter / 2), y + (diameter / 2), diameter / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
  }
}

/** Represents an interactable object within the game. */
class BaseComponent {
  constructor(width, height, x, y, angle = 0) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.originalWidth = width;
    this.originalHeight = height;
    this.originalX = x;
    this.originalY = y;
    this.speedX = 0;
    this.speedY = 0;
    this.rotation = 0;
    this.angle = angle;
  }

  /** Updates object transforms for camera's perspective. */
  update() {
    ctx.translate(antiPlayer.x - (canvas.width / 2), antiPlayer.y - (canvas.height / 2));
    ctx.translate(this.x + (this.width / 2), this.y + (this.height / 2));
    ctx.rotate(this.angle);
    ctx.translate(-(this.x + (this.width / 2)), -(this.y + (this.height / 2)));
  }

  /**
   * Rotates the object by angle.
   * @param {number} angle
   */
  rotate(angle) {
    this.angle = angle;
  }

  /** Updates speedX and speedY. */
  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

/**
 * A regular rectangular object.
 * @extends BaseComponent
 */
class Component extends BaseComponent {
  /**
   * @param {number} width - The width of the rectangle
   * @param {number} height - The height of the rectangle
   * @param {string} color - The color of the rectangle
   * @param {number} x - X-coordinate
   * @param {number} y - Y-coordinate
   */
  constructor(width, height, color, x, y, angle) {
    super(width, height, x, y, angle);
    this.color = color;
  }

  update() {
    ctx.save();
    super.update();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}

/**
 * A image object.
 * @extends BaseComponent
 */
class ImageComponent extends BaseComponent {
  /**
   * @param {number} width - The width of the rectangle
   * @param {number} height - The height of the rectangle
   * @param {string} imageId - The ID of the image in the DOM
   * @param {number} x - X-coordinate
   * @param {number} y - Y-coordinate
   */
  constructor(width, height, imageId, x, y, angle) {
    super(width, height, x, y, angle);
    this.image = document.getElementById(imageId);
    this.alpha = 1;
  }

  update() {
    ctx.save();
    super.update();
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  playerUpdate() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  setImage(imageId) {
    this.image = document.getElementById(imageId);
  }
}

class WordComponent extends BaseComponent {
  constructor(text, color, font, x, y) {
    super(0, 0, x, y);
    this.font = font;
    this.color = color;
    this.text = text;
  }

  update() {
    ctx.save();
    super.update();
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}

/**
 * A circular component.
 * @extends BaseComponent
 */
class CircleComponent extends BaseComponent {
  /**
   * @param {number} width - The diameter of the circle
   * @param {string} color - The color of the circle
   * @param {number} x - X-coordinate
   * @param {number} y - Y-coordinate
   */
  constructor(diameter, color, x, y) {
    super(0, 0, x, y);
    this.diameter = diameter;
    this.color = color;
  }

  update() {
    ctx.save();
    super.update();
    ctx.beginPath();
    ctx.arc(this.x + (this.diameter / 2), this.y + (this.diameter / 2), this.diameter / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

class AnimationController {
  static #activeAnim = false;

  static setActiveAnim(value) {
    this.#activeAnim = value;
  }

  static getActiveAnim() {
    return this.#activeAnim;
  }

  constructor(component, pictures, interval) {
    this.component = component;
    this.pictures = [...pictures];
    this.interval = interval;
    this.timer = 0;
    this.animInterval;
    this.ogImage = component.image;
    this.currentFrame = 0;
  }

  start() {
    this.timer += (dt);

    this.component.setImage(this.pictures[this.currentFrame]);

    if ((this.currentFrame < this.pictures.length) && this.timer >= this.interval) {
      this.timer = 0;
      this.currentFrame++;
      //console.log(this.currentFrame);
    }

    if (this.currentFrame == this.pictures.length) {
      this.currentFrame = 0;
      this.constructor.setActiveAnim(false);
    }
  }
}