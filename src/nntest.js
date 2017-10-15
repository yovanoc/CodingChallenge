var nn
var myPerceptron
var network

const trainSetXOR = [];
trainSetXOR.push([[0, 0], [0]]);
trainSetXOR.push([[1, 0], [1]]);
trainSetXOR.push([[0, 1], [1]]);
trainSetXOR.push([[1, 1], [0]]);

function setup() {
  createCanvas(800, 600)

  nn = new NeuralNetwork(2, 4, 1);
  network = new NeuralNetwork2([2, 4, 1]);
  myPerceptron = new synaptic.Architect.Perceptron(2, 4, 1);
  var myTrainer = new synaptic.Trainer(myPerceptron);
  console.log(myTrainer.XOR());

  for (var i = 0; i < 2000; i++)
  {
  	for (var j = 0; j < 4; j++) {
      nn.train(trainSetXOR[j][0], trainSetXOR[j][1]);

      const outputs = network.activate(trainSetXOR[j][0]);
      network.train(trainSetXOR[j][1]);
  	}
  }

  var results1 = []
  var results2 = []
  var results3 = []
  for (var i = 1; i <= width; i++) {
    for (var j = 1; j <= height; j++) {
      results1.push(nn.query([i / width, j / height]));
      results2.push(network.activate([i / width, j / height]));
      results3.push(myPerceptron.activate([i / width, j / height]));
    }
  }

  var avgError1 = 0
  var avgError2 = 0

  for (var i = 0; i < 480000; i++) {
    avgError1 += abs(results3[i] - results1[i])
    avgError2 += abs(results3[i] - results2[i])
  }

  console.log("avg my = " + avgError1 / 480000 * 100 + "%");
  console.log("avg my2 = " + avgError2 / 480000 * 100 + "%");
}

function mouseClicked() {
  console.log('Clicked at (' + mouseX + ', ' + mouseY + ')');
  console.log('INPUTS (' + mouseX / width + ', ' + mouseY / height + ')');

  var resultMy1 = nn.query([mouseX / width, mouseY / height]);
  var resultMy2 = network.activate([mouseX / width, mouseY / height]);
  var resultMy3 = myPerceptron.activate([mouseX / width, mouseY / height]);

  console.log('OUTPUT MY (' + resultMy1 + ')');
  console.log('OUTPUT MY2 (' + resultMy2 + ')');
  console.log('OUTPUT SYN (' + resultMy3 + ')');

  console.log("avg my = " + abs(resultMy3 - resultMy1));
  console.log("avg my2 = " + abs(resultMy3 - resultMy2));
}

function draw() {
  background(51)
}
