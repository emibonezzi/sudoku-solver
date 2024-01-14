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

  checkRegionPlacement(puzzleString, row, column, value) {
    let rowsRegions = [["A", "B", "C"], ["D", "E", "F"], ["G", "H", "I"]];
    let colsRegions = [["1","2","3"], ["4","5","6"], ["7","8","9"]];
    let colsRegionsCounter = 0;
    let rowsRegionsCounter = 0;

    for (let i = 0; i < puzzleString.length; i++) {
      if (i % 27 === 0 && i != 0) {
        rowsRegionsCounter++;
      }
      if (i % 3 === 0 && i != 0) {
        colsRegionsCounter++;
      }
      if (i % 9 === 0 && i != 0) {
        colsRegionsCounter = 0;
      }
      if (colsRegions[colsRegionsCounter].includes(column) && rowsRegions[rowsRegionsCounter].includes(row)) {
        if (value === puzzleString[i]) {
          return false;
        }
      }
    }

    return true;
  }

  solve(puzzleString) {}
}

let solver = new SudokuSolver();
let result = solver.checkRegionPlacement(
  "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
  "D",
  "1",
  "6"
);
console.log(result);

module.exports = SudokuSolver;
