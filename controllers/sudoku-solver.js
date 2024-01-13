class SudokuSolver {
  validate(puzzleString) {
    let sudokuRegex = /^[.1-9]+(?!\D+)[.1-9]+$/;
    let longEnough = puzzleString.length === 81;

    if (longEnough && sudokuRegex.test(puzzleString)) {
      return true;
    } else {
      return false;
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let rowCounter = 0;
    for (let i = 0; i < puzzleString.length; i++) {
      // every 9 characters
      if (i % 9 === 0 && i != 0) {
        rowCounter++;
      }

      if (row === rows[rowCounter]) {
        if (puzzleString[i] === value) {
          return false;
        }
      }
    }

    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let colCounter = 0;
    for (let i = 0; i < puzzleString.length; i++) {
      if (colCounter > 9) {
        colCounter = 1;
      }
      if (column == colCounter) {
        if (value === puzzleString[i]) {
          return false;
        }
      }

      colCounter++;
    }

    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

let solver = new SudokuSolver();
let result = solver.checkColPlacement(
  "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
  "B",
  "2",
  "2"
);
console.log(result);

module.exports = SudokuSolver;
