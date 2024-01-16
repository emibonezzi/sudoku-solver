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
    let rowsRegions = [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ];
    let colsRegions = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ];
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
      if (
        colsRegions[colsRegionsCounter].includes(column) &&
        rowsRegions[rowsRegionsCounter].includes(row)
      ) {
        if (value === puzzleString[i]) {
          return false;
        }
      }
    }

    return true;
  }

  solve(puzzleString) {
    let guesses = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let puzzleArr = puzzleString.split("")

    while (puzzleArr.includes(".")) {
      let rowCounter = 0;
      let colCounter = 1;
      for (let i = 0; i < puzzleArr.length; i++) {
        if (i % 9 === 0 && i != 0) {
          rowCounter++;
        }

        if (colCounter > 9) {
          colCounter = 1;
        }

        if (puzzleArr[i] === ".") {
          let solutions = 0;
          console.log(rows[rowCounter], colCounter);
          for (let n = 0; n < guesses.length; n++) {
            console.log("guessing", guesses[n]);
            if (
              this.checkColPlacement(
                puzzleString,
                rows[rowCounter],
                colCounter,
                guesses[n]
              ) &&
              this.checkRowPlacement(
                puzzleString,
                rows[rowCounter],
                colCounter,
                guesses[n]
              ) &&
              this.checkRegionPlacement(
                puzzleString,
                rows[rowCounter],
                colCounter,
                guesses[n]
              )
            ) {
              console.log("here!")
              solutions++;

              if (solutions > 1) {
                puzzleArr[i] = ".";
              } else {
                puzzleArr[i] = guesses[n];
              }
            }
          }
        }

        colCounter++;
      }
    }

    return puzzleArr.join("");
  }
}

let solver = new SudokuSolver();
let result = solver.solve(
  "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
);
console.log(result);

module.exports = SudokuSolver;
