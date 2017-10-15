var cols, rows
var w = 20
var cells = []
var current
var stack = []

function setup () {
  createCanvas(800, 800)
  cols = floor(width / w)
  rows = floor(height / w)
  // frameRate(5)

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      cells.push(new Cell(i, j))
    }
  }

  current = cells[0]
}

function draw () {
  background(51)
  for (var i = 0; i < cells.length; i++) {
    cells[i].show()
  }
  current.visited = true
  current.highlight()
  var next = current.checkNeighbors()
  if (next) {
    next.visited = true
    stack.push(current)
    removeWalls(current, next)
    current = next
  } else if (stack.length > 0) {
    current = stack.pop()
  }
}

function removeWalls (a, b) {
  var x = a.x - b.x
  if (x === 1) {
    a.walls[3] = false
    b.walls[1] = false
  } else if (x === -1) {
    a.walls[1] = false
    b.walls[3] = false
  }
  var y = a.y - b.y
  if (y === 1) {
    a.walls[0] = false
    b.walls[2] = false
  } else if (y === -1) {
    a.walls[2] = false
    b.walls[0] = false
  }
}

function index(x, y) {
  if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) {
    return -1
  }
  return x + y * cols
}

function Cell (x, y) {
  this.x = x
  this.y = y
  this.walls = [true, true, true, true]
  this.visited = false

  this.checkNeighbors = function () {
    var neighbors = []

    var top = cells[index(this.x, this.y - 1)]
    var right = cells[index(this.x + 1, this.y)]
    var bottom = cells[index(this.x, this.y + 1)]
    var left = cells[index(this.x - 1, this.y)]

    if (top && !top.visited) {
      neighbors.push(top)
    }
    if (right && !right.visited) {
      neighbors.push(right)
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom)
    }
    if (left && !left.visited) {
      neighbors.push(left)
    }

    if (neighbors.length > 0) {
      var r = floor(random(neighbors.length))
      return neighbors[r]
    } else {
      return undefined
    }
  }

  this.highlight = function () {
    var x = this.x * w
    var y = this.y * w
    noStroke()
    fill(0, 0, 255, 100)
    rect(x, y, w, w)
  }

  this.show = function () {
    var x = this.x * w
    var y = this.y * w
    stroke(255)
    if (this.walls[0]) {
      line(x, y, x + w, y)
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w)
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w)
    }
    if (this.walls[3]) {
      line(x, y + w, x, y)
    }

    if (this.visited) {
      noStroke()
      fill(255, 0, 255, 100)
      rect(x, y, w, w)
    }
  }
}
