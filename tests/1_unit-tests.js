const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

suite("Unit Tests", () => {

  // Logic handles a valid puzzle string of 81 characters
  test("Logic handles a valid puzzle string of 81 characters", function (done) {
    assert.isTrue(
      solver.validate(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      ).status
    ); 
  });

  // Logic handles a puzzle string with invalid characters (not 1-9 or .)
  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function (done) {
    assert.isFalse(solver.validate("..F..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."));
    done();
  });

  // Logic handles a puzzle string that is not 81 characters in length
  test("Logic handles a puzzle string that is not 81 characters in length", function(done) {
    assert.isFalse(solver.validate("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.").status)
  })

  // Logic handles a valid row placement
  test("Logic handles a valid row placement", function(done) {
    assert.isTrue(solver.checkRowPlacement("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", "A", "1", "7"))
    done();
  })

  // Logic handles a invalid row placement
  test("Logic handles a valid row placement", function(done) {
    assert.isFalse(solver.checkRowPlacement("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", "A", "1", "9"))
    done();
  })

  // Logic handles a valid column placement
  test("Logic handles a valid column placement", function(done) {
    assert.isTrue(solver.checkColPlacement("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", "A", "1", "7"))
    done();
  })

  // Logic handles a invalid column placement
  test("Logic handles a invalid column placement", function(done) {
    assert.isFalse(solver.checkColPlacement("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", "A", "1", "5"))
    done();
  })

  // Logic handles a valid region (3x3 grid) placement
  test("Logic handles a valid region (3x3 grid) placement", function(done) {
    assert.isTrue(solver.checkRegionPlacement("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", "A", "1", "7"))
    done();
  })

  // Logic handles a invalid region (3x3 grid) placement
  test("Logic handles a invalid region (3x3 grid) placement", function(done) {
    assert.isFalse(solver.checkRegionPlacement("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", "A", "1", "9"))
    done();
  })

  // Valid puzzle strings pass the solver
  test("Valid puzzle strings pass the solver", function(done) {
    assert.isTrue(solver.solve("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."))
    done();
  })

  // Invalid puzzle strings fail the solver
  test("Invalid puzzle strings fail the solver", function(done) {
    assert.isFalse(solver.solve(".4.1..35.............2.5......4.89..26.....12.5.3....7..4...16.6....7....1..8..2."))
  })

  // Solver returns the expected solution for an incomplete puzzle
  test("Solver returns the expected solution for an incomplete puzzle", function(done) {
    assert.strictEqual(solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
    '135762984946381257728459613694517832812936745357824196473298561581673429269145378'))
    done();
  })
});
