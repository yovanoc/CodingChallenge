var len = 100
var startX = window.innerWidth - window.innerWidth / 6
var startY = window.innerHeight / 2

var angle = 60
var axiom = '-F--F--F'
var rules = [
  {
    in: 'F',
    out: 'F+F--F+F'
  }
]

var sentence = axiom

function generate () {
  var nextSentence = ''
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i)
    var found = false
    for (var j = 0; j < rules.length; j++) {
      if (current === rules[j].in) {
        nextSentence += rules[j].out
        found = true
        break
      }
      if (!found) {
        nextSentence += current
      }
    }
  }
  sentence = nextSentence
  turtle()
  len *= 0.5
}

function mouseClicked() {
  generate()
}

function turtle () {
  background(51)
  resetMatrix()
  translate(startX, startY)
  stroke(255, 100)
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i)
    switch (current) {
      case 'F':
        line(0, 0, 0, -len)
        translate(0, -len)
        break;
      case '+':
        rotate(angle)
        break;
      case '-':
        rotate(-angle)
        break;
      case '|':
        rotate(radians(180))
        break;
      case '[':
        push()
        break;
      case ']':
        pop()
        break;
      case '&':
        // Pivoter vers le bas d’un angle : 'angle'
        break;
      case '^':
        // Pivoter vers le haut d’un angle : 'angle'
        break;
      case '<':
        // PRoulez vers la gauche d’un angle : 'angle'
        break;
      case '>':
        // Roulez vers la droite d’un angle : 'angle'
        break;
      default:
        console.log(current)
    }
  }
}

function setup () {
  createCanvas(window.innerWidth, window.innerHeight)
  background(51)
  noLoop()
  angle = radians(angle)
  turtle()
}
