var tree
var min_dist = 15
var max_dist = 300

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL)
  tree = new Tree
}

function draw() {
  background(80)
  translate(-width / 2, -height / 2, -width / 2)
  orbitControl()
  normalMaterial()
  tree.show()
  tree.grow()
}

function Tree() {
  this.leaves = []
  this.branches = []

  for (var i = 0; i < 300; i++) {
    this.leaves.push(new Leaf)
  }

  var pos = createVector(width / 2, height / 2, width / 2)
  // var dir =  p5.Vector.random3D()
  var dir =  createVector(0, -1, 0)
  var root = new Branch(null, pos, dir)

  this.branches.push(root)

  var current = root

  var found = false
  while (!found) {
    for (var i = 0; i < this.leaves.length; i++) {
      var d = p5.Vector.dist(current.pos, this.leaves[i].pos)
      if (d < max_dist) {
        found = true
      }
    }

    if (!found) {
      current = current.next()
      this.branches.push(current)
    }
  }

  this.show = function() {
    for (var i = 0; i < this.leaves.length; i++) {
      this.leaves[i].show()
    }
    for (var i = 0; i < this.branches.length; i++) {
      this.branches[i].show(i, this.branches.length)
    }
  }

  this.grow = function() {
    for (var i = 0; i < this.leaves.length; i++) {
      var leaf = this.leaves[i]
      var closestBranch = null
      var record = 100000
      for (var j = 0; j < this.branches.length; j++) {
        var branch = this.branches[j]
        var d = p5.Vector.dist(leaf.pos, branch.pos)
        if (d < min_dist) {
          leaf.reached = true
          closestBranch = null
          break
        } else if (d > max_dist) {
          // TODO:
        } else if (closestBranch === null || d < record) {
          closestBranch = branch
          record = d
        }
      }

      if (closestBranch !== null) {
        var newDir = p5.Vector.sub(leaf.pos, closestBranch.pos)
        newDir.normalize()
        closestBranch.dir.add(newDir)
        closestBranch.count++
      }
    }

    for (var i = this.leaves.length - 1; i >= 0 ; i--) {
      if (this.leaves[i].reached) {
        this.leaves.splice(i, 1)
      }
    }

    for (var i = this.branches.length - 1; i >= 0 ; i--) {
      var branch = this.branches[i]
      if (branch.count > 0) {
        branch.dir.div(branch.count + 1)
        var rand = p5.Vector.random3D()
        rand.setMag(0.3)
        branch.dir.add(rand)
        branch.dir.normalize()
        this.branches.push(branch.next())
      }
      branch.reset()
    }
  }
}

function Branch(parent, pos, dir) {
  if (parent) {
    this.pos = p5.Vector.add(parent.pos, parent.dir)
    this.dir = parent.dir.copy()
  }

  if (pos) {
    this.pos = pos
  }

  if (dir) {
    this.dir = dir
  }

  this.parent = parent
  this.count = 0
  this.origDir = this.dir.copy()
  this.len = 5

  this.reset = function() {
    this.dir = this.origDir.copy()
    this.count = 0
  }

  this.next = function() {
    var nextDir = p5.Vector.mult(this.dir, this.len)
    var nextPos = p5.Vector.add(this.pos, nextDir)
    return new Branch(this, nextPos, this.dir.copy())
  }

  this.show = function(i, max) {
    if (this.parent !== null) {
      stroke(255)
      fill(255)
      var sw = map(i, 0, max, 10, 0)
      strokeWeight(sw)
      line(this.pos.x, this.pos.y, this.pos.z, this.parent.pos.x, this.parent.pos.y, this.parent.pos.z)
    }
  }
}

function Leaf() {
  this.pos = createVector(random(width), random(height), random(width))
  this.pos.y -= height / 4
  this.reached = false

  this.show = function() {
    fill(255)
    noStroke()
    push()
    translate(this.pos.x, this.pos.y, this.pos.z)
    ellipse(0, 0, 4, 4)
    pop()
  }
}
