class Neuron {
  static activate(sum) {
    // return Math.tanh(sum);
    return Neuron.sigmoid(sum)
  }

  static activateAlternative(sum) {
    // return 1.0 - Math.tanh(sum) * Math.tanh(sum);
    return Neuron.dsigmoid(sum)
  }

  static activateStrict(sum) {
    return (sum > 0) ? 1 : -1;
  }

  constructor(inputNeurons = null, extraWeight = 0) {
    if (inputNeurons) {
      this.inputs = inputNeurons;
      this.weights = [];
      this.deltaWeights = [];

      this.extraWeight = extraWeight;

      for (let x = 0; x < this.inputs.length + extraWeight; x++) {
        this.weights.push(getRandom(-1, 1));
        this.deltaWeights.push(0);
      }
    }
  }


  computeOutput() {
    let sum = 0;
    for (let x = 0; x < this.inputs.length; x++) {
      sum += this.inputs[x].output * this.weights[x];
    }

    for (let x = this.inputs.length; x < this.weights.length; x++) {
      sum += this.weights[x];
    }

    this.output = Neuron.activate(sum);
  }

  computeOutputGradient(targetValue) {
    const delta = targetValue - this.output;
    this.gradient = delta * Neuron.activateAlternative(this.output);
  }

  computeHiddenGradients(outputs) {
    let dow = 0.0;

    for (const x in outputs) {
        const index = outputs[x].inputs.indexOf(this);

        dow += outputs[x].weights[index] * outputs[x].gradient;
    }

    this.gradient = dow * Neuron.activateAlternative(this.output);
  }

  train(learningRate = 0.3, alpha = 0.5) {
    for (let x = 0; x < this.weights.length; x++) {
      const oldDeltaWeight = this.deltaWeights[x];
      const newDeltaWeight =
      // Individual input, magnified by the gradient and train rate:
      learningRate
      * (x < this.inputs.length ? this.inputs[x].output : 1)
      * this.gradient
      // Also add momentum = a fraction of the previous delta weight
      + alpha
      * oldDeltaWeight;

      this.deltaWeights[x] = newDeltaWeight;
      this.weights[x] += newDeltaWeight;
    }
  }
}

Neuron.sigmoid = x => 1 / (1 + Math.pow(Math.E, -x))

Neuron.dsigmoid = x => x * (1 - x)

Neuron.tanh = x => Math.tanh(x)

Neuron.dtanh = x => 1 / (Math.pow(Math.cosh(x), 2))

class NeuralNetwork2 {
  constructor(neuronPerLayer, extraWeight = true) {
    this.layers = [];

    for (const neuronCount in neuronPerLayer) {
      const previousLayer = this.getOutputLayer();

      this.layers.push([]);

      for (let x = 0; x < neuronPerLayer[neuronCount]; x++) {
        this.getOutputLayer().push(new Neuron(previousLayer, extraWeight ? 1 : 0));
      }
    }
  }

  getInputLayer() {
    if (this.layers) {
      return this.layers[0];
    } else {
      return [];
    }
  }

  getOutputLayer() {
    if (this.layers) {
      return this.layers[this.layers.length - 1];
    } else {
      return [];
    }
  }

  getLayer(layerIndex) {
    return this.layers[layerIndex];
  }

  getLayerSize(layerIndex) {
    return this.getLayer(layerIndex).length;
  }

  getLayerCount() {
    return this.layers.length;
  }

  getNeuron(layerIndex, neuronIndex) {
    return this.layers[layerIndex][neuronIndex];
  }

  activate(inputs) {
    for (const x in this.getLayer(0)) {
        this.getNeuron(0, +x).output = inputs[x];
    }

    for (const x in this.layers) {
      if (x === "0") {
        continue;
      }

      for (const n of this.getLayer(+x)) {
        n.computeOutput();
      }
    }

    const output = [];

    for (const n of this.getOutputLayer()) {
      output.push(n.output);
    }

    return output;
  }

  train(targetOutput) {
    for (const x in this.getOutputLayer()) {
      this.getOutputLayer()[x].computeOutputGradient(targetOutput[x]);
    }

    for (let x = this.getLayerCount() - 2; x > 0; x--) {
      for (const n of this.getLayer(x)) {
        n.computeHiddenGradients(this.getLayer(x + 1));
      }
    }

    for (const x in this.layers) {
      if (x === "0") {
        continue;
      }

      for (const n of this.getLayer(+x)) {
        n.train();
      }
    }
  }
}
