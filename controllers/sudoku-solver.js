class SudokuSolver {
  checkDuplicates(puzzleString) {
    let rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let cols = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let regions = [
      ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"],
      ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"],
      ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"],
      ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"],
      ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"],
      ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"],
      ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"],
      ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"],
      ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"],
    ];

    let map = {};
    let rowCounter = 0;
    let colCounter = 1;
    let colArr = [];
    let rowArr = [];
    let regArr = [];

    // CREATE MAP

    for (let i = 0; i < puzzleString.length; i++) {
      let row;

      if (i % 9 === 0 && i != 0) {
        colCounter = 1;
      }

      if (i % 9 === 0 && i != 0) {
        rowCounter++;
      }

      row = rows[rowCounter];

      map[`${row}${colCounter}`] = { value: puzzleString[i], indexStr: i };
      colCounter++;
    }

    // console.log("NOW CHECKING COLS FOR DUPLICATE...");

    // CHECK COL
    for (let col of cols) {
      colArr = [];
      for (let cell of Object.keys(map)) {
        if (col == cell[1]) {
          //// console.log(col, cell)
          //// console.log(map[cell].value);
          colArr.push(map[cell].value);
        }
      }

      // console.log(colArr.filter((item) => item != "."));
      let newArr = [...new Set(colArr)];
      // console.log(newArr.filter((item) => item != "."));
      if (
        newArr.filter((item) => item != ".").length !=
        colArr.filter((item) => item != ".").length
      ) {
        // console.log("Duplicates found in column");
        return false;
      }
    }

    // console.log("NOW CHECKING ROWS FOR DUPLICATE...");

    // CHECK ROWS
    for (let row of rows) {
      rowArr = [];
      for (let cell of Object.keys(map)) {
        if (row === cell[0]) {
          //// console.log(row, cell)
          //// console.log(map[cell].value);
          rowArr.push(map[cell].value);
        }
      }

      // console.log(rowArr.filter((item) => item != "."));
      let newArr = [...new Set(rowArr)];
      // console.log(newArr.filter((item) => item != "."));
      if (
        newArr.filter((item) => item != ".").length !=
        rowArr.filter((item) => item != ".").length
      ) {
        // console.log("Duplicates found in Rows");
        return false;
      }
    }

    // CHECK REGIONS

    // console.log("NOW CHECKING REGIONS FOR DUPLICATE...");

    for (let region of regions) {
      regArr = [];
      for (let cell of Object.keys(map)) {
        if (region.includes(cell)) {
          //// console.log(row, cell)
          //// console.log(map[cell].value);
          regArr.push(map[cell].value);
        }
      }

      // console.log(regArr);

      // console.log(regArr.filter((item) => item != "."));
      let newArr = [...new Set(regArr)];
      // console.log(newArr.filter((item) => item != "."));
      if (
        newArr.filter((item) => item != ".").length !=
        regArr.filter((item) => item != ".").length
      ) {
        // console.log("Duplicates found in Regions");
        return false;
      }
    }

    // console.log("Puzzle has no duplicates in Rows, Columns, Regions.");
    return true;
  }

  validate(puzzleString) {
    let sudokuRegex = /^[.1-9]+(?!\D+)[.1-9]+$/;
    let longEnough = puzzleString.length === 81;

    if (longEnough) {
      if (sudokuRegex.test(puzzleString)) {
        // CHECK DUPLICATES
        if (this.checkDuplicates(puzzleString)) {
          // CHECK IF SOLVABLE
          let solvable = this.solve(puzzleString);
          console.log(solvable);
          if (solvable) {
            return {
              status: true,
              message: "Valid puzzle",
              solution: solvable,
            };
          } else {
            return { status: false, message: "Puzzle cannot be solved" };
          }
        } else {
          return { status: false, message: "Puzzle cannot be solved" };
        }
      } else {
        return { status: false, message: "Invalid characters in puzzle" };
      }
    } else {
      return {
        status: false,
        message: "Expected puzzle to be 81 characters long",
      };
    }
  }

  getIndex(puzzleString, row, column, value) {
    let rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let map = {};
    let rowCounter = 0;
    let colCounter = 1;

    for (let i = 0; i < puzzleString.length; i++) {
      let row;

      if (i % 9 === 0 && i != 0) {
        colCounter = 1;
      }

      if (i % 9 === 0 && i != 0) {
        rowCounter++;
      }

      row = rows[rowCounter];

      map[`${row}${colCounter}`] = { value: puzzleString[i], indexStr: i };
      colCounter++;
    }
    console.log(map);
    console.log(map[`${row}${column}`].indexStr);

    return map[`${row}${column}`].indexStr;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let rowCounter = 0;

    if (!rows.includes(row)) {
      console.log("INVALID ROW");
      return false;
    }

    for (let i = 0; i < puzzleString.length; i++) {
      // every 9 characters
      if (i % 9 === 0 && i != 0) {
        rowCounter++;
      }

      if (row === rows[rowCounter]) {
        //console.log(puzzleString[i], "->", value);
        if (puzzleString[i] === value) {
          //console.log(puzzleString[i], "->", value, "✅");
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

      if (Number(column) === colCounter) {
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
      // let solution =
      ("568913724342687519197254386685479231219538467734162895926345178473891652851726943");
      console.log(puzzleString);
      // console.log(puzzleString === solution);
      return puzzleString;
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
          console.log(
            "Puzzle unsolvable because",
            row,
            colCounter,
            "has no possible candidates."
          );
          return false;
        }
      }

      colCounter++;
    }

    // CREATE TEMP SOLUTION STRING
    solutionStr = puzzleArr.join("");
    // console.log(solutionsObj);

    // CHECK IF THERE'S AT LEAST ONE CELL WITH JUST ONE POSSIBLE ENTRY
    let uniqueSolutions =
      Object.keys(solutionsObj).filter(
        (item) => solutionsObj[item].solutions.length === 1
      ).length > 0;

    if (uniqueSolutions) {
      /* console.log(
        "At least one cell with one unique solution ->",
        uniqueSolutions
      ); */

      // CALL THE FUNCTION INSIDE THE FUNCTION PASSING THE TEMP SOLUTION STRING
      return this.solve(solutionStr);
    } else {
      console.log("This Sudoku doesn't have one unique solution.");
      return false;
    }
  }
}

let solver = new SudokuSolver();
console.log(solver.solve(
  "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
));

module.exports = SudokuSolver;
