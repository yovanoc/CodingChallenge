var s;
var scl = 20;
var food;

function setup () {
  createCanvas(800, 800)
  s = new Snake();
  frameRate(10);
  pickLocation();
}

function draw () {
  background(51);
  s.death();
  s.update();
  s.show();
  if (s.eat(food)) {
    pickLocation();
  }
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

function keyPressed () {
  switch (keyCode) {
    case UP_ARROW:
      s.dir(0, -1);
      break;
    case DOWN_ARROW:
      s.dir(0, 1);
      break;
    case LEFT_ARROW:
      s.dir(-1, 0);
      break;
    case RIGHT_ARROW:
      s.dir(1, 0);
      break;
    default:
      //
  }
}

function pickLocation () {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function Snake () {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.dir = function (x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.eat = function (food) {
    var d = dist(this.x, this.y, food.x, food.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  this.death = function () {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total = 0;
        this.tail = [];
      }
    }
  }

  this.update = function () {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  this.show = function () {
    fill(255)
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  }
}
