var angle = 0

function setup() {
  createCanvas(640, 360)
  colorMode(HSB, 1)
  pixelDensity(1)
}

function draw() {
  // var ca = map(mouseX, 0, width, -1, 1);//-0.70176;
  // var cb = map(mouseY, 0, height, -1, 1);//-0.3842;

  var ca = cos(angle * 3.213);//sin(angle);
  var cb = sin(angle);

  angle += 0.02;

  background(255);

  // Establish a range of values on the complex plane
  // A different range will allow us to "zoom" in or out on the fractal

  // It all starts with the width, try higher or lower values
  //var w = abs(sin(angle))*5;
  var w = 5;
  var h = (w * height) / width;

  // Start at negative half the width and height
  var xmin = -w/2;
  var ymin = -h/2;

  // Make sure we can write to the pixels[] array.
  // Only need to do this once since we don't do any other drawing.
  loadPixels();

  // Maximum number of iterations for each povar on the complex plane
  var maxiterations = 100;

  // x goes from xmin to xmax
  var xmax = xmin + w;
  // y goes from ymin to ymax
  var ymax = ymin + h;

  // Calculate amount we increment x,y for each pixel
  var dx = (xmax - xmin) / (width);
  var dy = (ymax - ymin) / (height);

  // Start y
  var y = ymin;
  for (var j = 0; j < height; j++) {
    // Start x
    var x = xmin;
    for (var i = 0; i < width; i++) {

      // Now we test, as we iterate z = z^2 + cm does z tend towards infinity?
      var a = x;
      var b = y;
      var n = 0;
      while (n < maxiterations) {
        var aa = a * a;
        var bb = b * b;
        // Infinity in our finite world is simple, let's just consider it 16
        if (aa + bb > 4.0) {
          break;  // Bail
        }
        var twoab = 2.0 * a * b;
        a = aa - bb + ca;
        b = twoab + cb;
        n++;
      }

      // We color each pixel based on how long it takes to get to infinity
      // If we never got there, let's pick the color black
      var pix = i + j * width
      if (n == maxiterations) {
        // pixels[pix + 0] = 0
        // pixels[pix + 1] = 0
        // pixels[pix + 2] = 0
        // pixels[pix + 3] = 255
        set(i, j, color(0));
      } else {
        // Gosh, we could make fancy colors here if we wanted
        var hu = sqrt(floor(n) / maxiterations);
        // pixels[pix + 0] = hu * 255
        // pixels[pix + 1] = 255
        // pixels[pix + 2] = 150
        // pixels[pix + 3] = 255
        set(i, j, color(hu, 255, 150));
      }
      x += dx;
    }
    y += dy;
  }
  updatePixels();
  // console.log(frameRate());
}
