var tree = []
var count = 0
var leaves = []

function setup () {
  createCanvas(800, 800)
  var a = createVector(width / 2, height)
  var b = createVector(width / 2, height - 200)
  tree[0] = new Branch(a, b)
}

function mousePressed () {
  for (var i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchLeft())
      tree.push(tree[i].branchRight())
    }
    tree[i].finished = true
  }

  count++
  
  if (count === 5) {
    for (var i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        var leaf = tree[i].end.copy()
        leaves.push(leaf)
      }
    }
  }
}

function draw () {
  background(240)
  for (var i = 0; i < tree.length; i++) {
    tree[i].show()
    // tree[i].jitter()
  }
  for (var i = 0; i < leaves.length; i++) {
    fill(58, 95, 11, 100)
    noStroke()
    ellipse(leaves[i].x, leaves[i].y, 12, 12)
    leaves[i].y += random(2)
  }
}

function Branch (start, end) {
  this.start = start
  this.end = end
  this.finished = false

  this.jitter = function () {
    this.end.x += random(-1, 1)
    this.end.y += random(-1, 1)
  }

  this.show = function () {
    stroke(150, 75, 0)
    strokeWeight(2)
    line(this.start.x, this.start.y, this.end.x, this.end.y)
  }

  this.branchRight = function () {
    var dir = p5.Vector.sub(this.end, this.start)
    dir.rotate(PI / 6)
    dir.mult(0.7)
    return new Branch(this.end, p5.Vector.add(this.end, dir))
  }

  this.branchLeft = function () {
    var dir = p5.Vector.sub(this.end, this.start)
    dir.rotate(-PI / 6)
    dir.mult(0.7)
    return new Branch(this.end, p5.Vector.add(this.end, dir))
  }
}
