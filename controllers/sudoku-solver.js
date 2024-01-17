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
    let colCounter = 1;
    for (let i = 0; i < puzzleString.length; i++) {
      if (i % 9 === 0 && i != 0) {
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
          //console.log("INVALID REGION PLACEMENT!", value, puzzleString[i]);
          return false;
        }
      }
    }

    return true;
  }

  solve(puzzleString) {
    // CHECK IF PUZZLE STRING IS SOLVED OR NOT
    if (!puzzleString.includes(".")) {
      console.log("solved");
      let solution =
        "568913724342687519197254386685479231219538467734162895926345178473891652851726943";
      console.log(puzzleString);
      console.log(puzzleString === solution);
      return true;
    }

    // START GUESSING PROCESS

    let guesses = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let rowCounter = 0;
    let colCounter = 1;
    let puzzleArr = puzzleString.split("");
    let solutionsObj = {};
    let solutionStr = "";

    // FILL SQUARES WITH JUST ONE POSSIBLE SOLUTION
    for (let i = 0; i < puzzleArr.length; i++) {
      let row;
      let solutions = 0;

      if (i % 9 === 0 && i != 0) {
        colCounter = 1;
      }

      if (i % 9 === 0 && i != 0) {
        rowCounter++;
      }

      row = rows[rowCounter];

      //console.log("Checking", row, colCounter, "->", puzzleArr[i]);

      if (puzzleArr[i] === ".") {
        let solArr = [];
        for (let n = 0; n < guesses.length; n++) {
          //console.log("Testing", guesses[n], "for cell", row, colCounter);
          if (
            this.checkColPlacement(puzzleString, row, colCounter, guesses[n]) &&
            this.checkRowPlacement(puzzleString, row, colCounter, guesses[n]) &&
            this.checkRegionPlacement(
              puzzleString,
              row,
              colCounter.toString(),
              guesses[n]
            )
          ) {
            /* console.log(
              "Number",
              guesses[n],
              "is a valid guess for",
              row,
              colCounter
            ); */
            solutions++;
            solArr.push(guesses[n]);
          }
        }

        if (solArr.length === 1) {
          puzzleArr[i] = solArr[0];
        }

        solutionsObj[`${row}${colCounter}`] = {
          solutions: solArr,
          indexStr: i,
        };

        if (solArr.length > 1) {
          // console.log(solutions, "solutions available for", row, colCounter, solArr)
        }

        if (solArr.length === 0) {
          console.log("Puzzle unsolvable because", row, colCounter, "has no possible candidates.");
          return false;
        }
      }

      colCounter++;
    }

    // CREATE TEMP SOLUTION STRING
    solutionStr = puzzleArr.join("");
    console.log(solutionsObj);

    // CHECK IF THERE'S AT LEAST ONE CELL WITH JUST ONE POSSIBLE ENTRY
    let uniqueSolutions =
      Object.keys(solutionsObj).filter(
        (item) => solutionsObj[item].solutions.length === 1
      ).length > 0;

    if (uniqueSolutions) {
      console.log(
        "At least one cell with one unique solution ->",
        uniqueSolutions
      );

      // CALL THE FUNCTION INSIDE THE FUNCTION PASSING THE TEMP SOLUTION STRING
      this.solve(solutionStr);
    } else {
      console.log("This Sudoku doesn't have one unique solution.");
    }
  }
}

let solver = new SudokuSolver();
solver.solve(
  "..9.287..8.6..4..5..3.....46.........2.71345.........23.....5..9..4..8.7..125.3..",
  "A",
  "9",
  "8"
);

module.exports = SudokuSolver;
