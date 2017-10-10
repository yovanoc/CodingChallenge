class Star {
  constructor () {
    this.x = random(-width, width)
    this.y = random(-height, height)
    this.z = random(width)
    this.pz = this.z
  }

  update (speed) {
    this.z = this.z - speed

    if (this.z < 1) {
      this.x = random(-width, width)
      this.y = random(-height, height)
      this.z = random(width)
      this.pz = this.z;
    }
  }

  show () {
    fill(255)
    noStroke()

    var sx = map(this.x / this.z, 0, 1, 0, width)
    var sy = map(this.y / this.z, 0, 1, 0, height)

    var r = map(this.z, 0, width, 16, 0)
    // ellipse(sx, sy, r, r)

    var px = map(this.x / this.pz, 0, 1, 0, width)
    var py = map(this.y / this.pz, 0, 1, 0, height)

    this.pz = this.z

    var colorR = random(255)
    var colorG = random(255)
    var colorB = random(255)
    stroke(colorR, colorG, colorB)
    line(px, py, sx, sy)
  }
}

var stars = new Array(1000)

function setup () {
  createCanvas(window.innerWidth, window.innerHeight)
  for (var i = 0; i < stars.length; i++) {
    stars[i] = new Star
  }
}

function draw () {
  background(0)
  translate(width / 2, height / 2)
  for (var i = 0; i < stars.length; i++) {
    stars[i].update(map(mouseX, 0, width, 0, 50))
    stars[i].show()
  }
}
