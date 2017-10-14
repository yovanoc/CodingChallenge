var nn
var myPerceptron

function setup() {
  createCanvas(800, 600)

  // Creating a Neural Network with # of inputs, hidden neurons, and outputs
  nn = new NeuralNetwork(2, 4, 1);
  // Training the Neural Network with inputs and known outputs
  for (var i = 0; i < 20000; i++)
  {
  	nn.train([0, 0], [0]);
  	nn.train([0, 1], [1]);
  	nn.train([1, 0], [1]);
  	nn.train([1, 1], [0]);
  }

  myPerceptron = new synaptic.Architect.Perceptron(2,4,1);
  var myTrainer = new synaptic.Trainer(myPerceptron);

  console.log(myTrainer.XOR()); // { error: 0.004998819355993572, iterations: 21871, time: 356 }
}

function mouseClicked() {
  console.log('Clicked at (' + mouseX + ', ' + mouseY + ')');
  console.log('INPUTS (' + mouseX / width + ', ' + mouseY / height + ')');
  console.log('OUTPUT MY (' + nn.query([mouseX / width, mouseY / height]) + ')');
  console.log('OUTPUT SYN (' + myPerceptron.activate([mouseX / width, mouseY / height]) + ')');
}

function draw() {
  background(51)
}
