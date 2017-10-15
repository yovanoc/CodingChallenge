class Matrix {
  // Make a matrix full of zeros
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = new Array(rows);
    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = new Array(cols);
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  // This fills the matrix with random values (gaussian distribution)
  randomize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // this.matrix[i][j] = randomGaussian();
        // this.matrix[i][j] = random(-1, 1);
        this.matrix[i][j] = getRandom(-1, 1)
      }
    }
  }

  // Take the matrix and make it a 1 dimensional array
  toArray() {
    // Add all the values to the array
    const arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.matrix[i][j]);
      }
    }
    return arr;
  }

  // This transposes a matrix
  // rows X cols --> cols X rows
  transpose() {
    const result = new Matrix(this.cols, this.rows);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.matrix[i][j] = this.matrix[j][i];
      }
    }
    return result;
  }

  // This makes a copy of the matrix
  copy() {
    const result = new Matrix(this.rows, this.cols);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.matrix[i][j] = this.matrix[i][j];
      }
    }
    return result;
  }

  // This adds another matrix or a single value
  add(other) {
    // Are we trying to add a Matrix?
    if (other instanceof Matrix) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.matrix[i][j] += other.matrix[i][j];
        }
      }
      // Or just a single scalar value?
    } else {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.matrix[i][j] += other;
        }
      }
    }
  }

  // This multiplies another matrix or a single value
  // This is different than the dot() function!
  multiply(other) {
    // Are we trying to multiply a Matrix?
    if (other instanceof Matrix) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= other.matrix[i][j];
        }
      }
      // Or just a single scalar value?
    } else {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= other;
        }
      }
    }
  }

  // These are some static functions to operate on a matrix

  // This is the trickiest one
  // Takes a function and applies it to all values in the matrix
  static map(m, fn) {
    const result = new Matrix(m.rows, m.cols);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.matrix[i][j] = fn(m.matrix[i][j]);
      }
    }
    return result;
  }

  // Subtracts one matrix from another
  static subtract(a, b) {
    const result = new Matrix(a.rows, a.cols);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.matrix[i][j] = a.matrix[i][j] - b.matrix[i][j];
      }
    }
    return result;
  }

  // Multiplies two matrices together
  static dot(a, b) {
    // Won't work if columns of A don't equal columns of B
    if (a.cols != b.rows) {
      console.log("Incompatible matrix sizes!");
      return;
    }
    // Make a new matrix
    const result = new Matrix(a.rows, b.cols);
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < b.cols; j++) {
        // Sum all the rows of A times columns of B
        let sum = 0;
        for (let k = 0; k < a.cols; k++) {
          sum += a.matrix[i][k] * b.matrix[k][j];
        }
        // New value
        result.matrix[i][j] = sum;
      }
    }
    return result;
  }

  // Turn a 1 dimensional array into a matrix
  static fromArray(array) {
    const m = new Matrix(array.length, 1);
    for (let i = 0; i < array.length; i++) {
      m.matrix[i][0] = array[i];
    }
    return m;
  }
}
